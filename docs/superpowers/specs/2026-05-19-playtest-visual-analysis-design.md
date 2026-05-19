# Playtest Visual Analysis Upgrades — Design Spec
**Date:** 2026-05-19
**Status:** Approved

---

## Goal

Upgrade the Ledger of Ash playtest pipeline with three capabilities it currently lacks:
1. **Visual screenshot analysis** — send actual images (not just filenames) to Claude for polish, voice, and UI inspection
2. **HUD/G-state cross-reference** — catch mismatches between what the engine stores and what the player sees
3. **UI duplication detection** — catch duplicate DOM renders at runtime and at static-analysis time

No new files. All changes extend three existing files.

---

## Scope

| File | What changes |
|------|-------------|
| `tests/e2e/post-run-analysis.js` | Screenshot selection + image delivery + 2 new domains (hud_integrity, ui_duplication) |
| `tests/e2e/playtest-headed.spec.js` | `probeDuplicates()` helper + extended `probeHUD()` |
| `tests/content/validate-structure.js` | 2 new static checks (duplicate IDs, innerHTML accumulation) |

---

## Architecture

### Image Delivery (no API key required)

Primary path uses the `claude` CLI with `--input-format stream-json`. This reuses the existing Claude Code OAuth session — no `ANTHROPIC_API_KEY` needed. The stream-json format accepts newline-delimited Anthropic message objects, which support `image` content blocks with base64 data.

Fallback chain:
1. **CLI stream-json** — `claude -p --input-format stream-json < tmpfile.jsonl` (CC auth, images)
2. **Anthropic SDK** — `@anthropic-ai/sdk` with `ANTHROPIC_API_KEY` (images, if key present)
3. **CLI text** — existing `claude -p -` path (filenames only, always available)

### Screenshot Selection

`selectCuratedScreenshots(allShots)` returns ~20 screenshots per run:
- **Milestone shots**: filename contains any of `char_creation`, `levelup`, `stage_unlock`, `combat`, `camp`, `climax`, `death`, `first_result`
- **Periodic probes**: one shot per 50-pick interval, extracted from filename suffix `_p050`, `_p100`, etc.
- Result capped at 20 to stay within a single API call's context budget (~$0.02/run at Haiku rates)

### Domain Architecture

All 12 domains receive the curated image set when the CLI stream-json or SDK path is active. The 2 new domains are:

**Domain 11 — `hud_integrity`**
- Focus: G-state vs rendered HUD — does HP/XP/level/stage/location/gold/skills/heat/alignment match what the log says was stored at that pick?
- Log sources: `[hud-integrity ...]` and `[hud-mismatch ...]` log entries produced by the extended `probeHUD()`
- Image role: visual confirmation that the correct values are *visible* on screen (not just in the DOM)
- Mismatches emitted as `[P0]` findings

**Domain 12 — `ui_duplication`**
- Focus: singleton DOM elements appearing >1×, duplicate choice labels in the action panel, duplicate quest entries, duplicate `.narrative-text` / `.env-desc` content
- Log sources: `[DUPLICATE ...]` entries produced by `probeDuplicates()`
- Image role: visual confirmation of duplicated elements Claude can see in screenshots

---

## Component Specs

### 1. `post-run-analysis.js` additions

#### `selectCuratedScreenshots(allShots)`
```
Input:  string[] — all screenshot filenames, sorted by mtime ascending
Output: string[] — up to 20 filenames

Rules:
  milestone keywords: ['char_creation','first_result','combat','levelup',
                       'stage_unlock','camp','climax','death','success','failure']
  periodic: pick one filename per 50-pick band (p000–p049, p050–p099, …)
  milestones always included; periodic fills remainder up to 20
```

#### `buildStreamJsonInput(domain, ctx, imagePaths)`
```
Input:  domain object, ctx object, imagePaths string[] (full paths)
Output: string — newline-delimited JSON (one JSON object per line)

Format per Anthropic stream-json:
  Line 1: {"role":"user","content":[
             {type:"text", text: <systemPrompt>},
             {type:"image", source:{type:"base64", media_type:"image/png", data:<b64>}},
             … one image block per path …,
             {type:"text", text: <analysisPrompt>}
           ]}

Constraints:
  - Skip images > 2MB (log a warning, don't crash)
  - media_type inferred from filename extension (.png → image/png, .jpg → image/jpeg)
```

#### `analyzeWithImages(domain, ctx, imagePaths)`
```
Primary:  write buildStreamJsonInput() to tmpfile, run:
            claude -p --input-format stream-json < tmpfile
          timeout: 180s (images take longer than text)
Fallback: if exit code non-zero AND @anthropic-ai/sdk available AND ANTHROPIC_API_KEY set,
            call existing analyzeWithSDK() with image content blocks
Final:    if both fail, call existing analyzeWithCLI() (filenames only)
Cleanup:  always delete tmpfile in finally block
```

#### New domain 11 — `hud_integrity`
```js
{
  id: 'hud_integrity',
  label: 'HUD / G-State Cross-Reference',
  focus: 'Verify that HP, XP, level, gold, stage label, location, sp progress, '
       + 'skill values, faction heat rows, and alignment bars shown on screen '
       + 'match G-state values recorded in the log at the same pick number. '
       + 'Flag any [hud-integrity] VIOLATION or [hud-mismatch] log entries. '
       + 'Check screenshots for HUD fields that appear blank, wrong, or cut off.',
  logHeavy: true,
  imageHeavy: true,
}
```

#### New domain 12 — `ui_duplication`
```js
{
  id: 'ui_duplication',
  label: 'UI Duplication / Double-Render Audit',
  focus: 'Identify DOM elements that render more than once when they should be singletons '
       + '(#hud-hp, .result-text, .stage-banner, .levelup-notice, .env-desc). '
       + 'Flag duplicate choice labels in the action panel (same text appearing twice). '
       + 'Flag duplicate quest entries. Flag [DUPLICATE] log entries. '
       + 'In screenshots, look for any text, stat, or UI element visibly doubled.',
  logHeavy: true,
  imageHeavy: true,
}
```

#### `main()` changes
- Call `selectCuratedScreenshots(ctx.screenshots)` to get `curatedShots`
- Replace both `analyzeWithCLI` and `analyzeWithSDK` calls with `analyzeWithImages(domain, ctx, curatedPaths)`
- `curatedPaths` = full absolute paths for `curatedShots`
- Log count: `[post-run-analysis] ${curatedShots.length} curated screenshots selected for analysis`

---

### 2. `playtest-headed.spec.js` additions

#### `probeDuplicates(page, tag, picks)`
New async helper function. Called inside the main pick loop every `PROBE_EVERY` picks, alongside `probeHUD`.

```
Singleton check:
  selectors = ['#hud-hp','#hud-level','#hud-gold','#hud-renown','#hud-day',
               '#hud-location','#topbar-stage','.result-text',
               '.stage-banner','.levelup-notice','.env-desc']
  For each: count DOM instances. If count > 1 → log [DUPLICATE tag] pick=N element=SEL count=N

Duplicate choice labels:
  Read all .choice-btn:visible text content
  If any label appears more than once → log [DUPLICATE tag] pick=N choice-label="..." count=N

Duplicate quest entries:
  Read all .quest-entry or equivalent text content
  If any entry text appears more than once → log [DUPLICATE tag] pick=N quest="..." count=N

Duplicate narrative text:
  Read .narrative-text and .env-desc inner text
  If identical content appears in >1 container → log [DUPLICATE tag] pick=N narrative-dup=true
```

#### `probeHUD()` extensions

Extend the existing function (currently checks HP, level, stage) with:

```
Extended G-vs-DOM checks (after existing checks):

Skills (only when char sheet is already open during probe):
  For each skill key in ['combat','stealth','survival','lore','persuasion','craft']:
    Read G.skills[key] from g object
    Compare against text content of matching .char-skill-row[data-skill=key] .skill-val
    If mismatch → log [hud-mismatch tag] VIOLATION: skill=KEY G=N shown=M

Heat (read from HUD heat row):
  For polities shown in #hud-heat-row:
    Read rendered heat pip count or value
    Compare against G.heat[polity] from log
    If mismatch → log [hud-mismatch tag] VIOLATION: heat=POLITY G=N shown=M

Alignment (only when |G.benevolence| >= 10 or |G.orderAxis| >= 10):
  Check alignment bar is visible
  Compare bar fill direction against sign of G.benevolence / G.orderAxis
  If bar absent when threshold met → log [hud-mismatch tag] VIOLATION: alignment-bar missing benevolence=N

Gold extended:
  Parse #hud-gold text as number
  Compare against G.gold
  If mismatch > 0 → log [hud-mismatch tag] VIOLATION: gold G=N shown=M
```

---

### 3. `validate-structure.js` additions

#### `checkDuplicateIds()`
```
Scan ledger-of-ash.html source for all id="..." attributes.
Build a frequency map: id → count.
For any id with count > 1: fail(`ledger-of-ash.html: duplicate id="${id}" appears ${count} times`)
Excludes template literals and commented-out sections (simple heuristic: skip lines starting with //)
```

#### `checkInnerHTMLAccumulation()`
```
Scan ledger-of-ash.html source for innerHTML += patterns on known render containers.
Target containers: #action-content, #story-output, #env-panel .env-desc,
                   .result-text, .narrative-text, #quest-list, #journal-overlay-body
Pattern: /(\w+)\.innerHTML\s*\+=/ or getElementById/querySelector result stored in variable
         then that variable used with +=
For each match: warn(`ledger-of-ash.html:LINE: innerHTML += on "${container}" — 
                       may accumulate across re-renders`)
Report as WARN (not FAIL) — accumulation is a design smell, not always a bug.
```

Both checks added to the `run()` function alongside existing checks. `checkDuplicateIds` uses `fail()` (exits non-zero). `checkInnerHTMLAccumulation` uses a new `warn()` function (does not exit non-zero).

---

## Log Entry Reference

New structured log entries produced by the upgraded spec:

| Prefix | Severity | Example |
|--------|----------|---------|
| `[DUPLICATE tag]` | P1 (domain 12) | `[DUPLICATE warrior_w_garrison] pick=80 element=.result-text count=2` |
| `[hud-mismatch tag]` | P0 (domain 11) | `[hud-mismatch warrior_w_garrison] VIOLATION: skill=combat G=4 shown=2` |
| `[hud-integrity tag] VIOLATION` | P0 (existing, domain 11 now picks up) | `[hud-integrity warrior_w_garrison] VIOLATION: HUD hp="40" vs G.hp=12` |

`post-run-analysis.js` log parser additions:
```js
const hudMismatches = (log.match(/\[hud-mismatch[^\n]*/g) || []).slice(0, 30);
const duplicates    = (log.match(/\[DUPLICATE[^\n]*/g)    || []).slice(0, 30);
```
Both injected into `ctx.logExcerpt` alongside existing sections.

---

## Testing

- `validate-structure.js` changes: tested by running `node tests/content/validate-structure.js` against current `ledger-of-ash.html` — should pass with 0 errors (no duplicate IDs expected, any `innerHTML +=` warnings are informational)
- `probeDuplicates` and `probeHUD` extensions: validated by running the headed spec for one family and checking the log for `[DUPLICATE]` and `[hud-mismatch]` entries (absence of entries = correct behavior when no bugs present)
- `post-run-analysis.js` image path: validated by running the script against the latest `playtest-report-*-headed.md` and confirming the analysis `.md` output contains image-informed findings in the polish and ui_duplication domains

---

## Out of Scope

- Headless spec changes (duplication probe is headed only per design decision)
- Per-screenshot individual API calls (using curated batch per design decision)
- Changes to any other existing files
- Stage 3+ content or engine changes
