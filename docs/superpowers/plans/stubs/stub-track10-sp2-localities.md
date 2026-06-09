# Track 10 — Zero-sp2 Locality Wiring
**System:** Stage 2 progress wiring for fairhaven, ithtananalor, and panim_haven
**Files to modify:** `content/fairhaven_stage2_enriched_choices.js`, `content/ithtananalor_stage2_enriched_choices.js`, `content/panim_haven_stage2_enriched_choices.js`
**Functions in scope:** Choice `fn()` callbacks in all three files, `maybeStageAdvance` call sites within them
**No-touch:** `stageProgress` increment logic in `ledger-of-ash.html` engine, `maybeStageAdvance()` implementation in engine, `adaptEnrichedChoice`, `resolveArrival`, choice validation rules, `plot:'main'` choices that already have it

---

## Context

Headed playtest (2026-06-06) confirmed 0 sp2 contributed from three localities despite multiple visits:
- `fairhaven` — visited 7 times, 0 sp2 accumulated
- `ithtananalor` — visited 3 times, 0 sp2 accumulated
- `panim_haven` — visited 1 time, 0 sp2 accumulated

These files ARE loaded in `ledger-of-ash.html` (confirmed script tags at lines 18586–18589). The choice arrays ARE exported (`window.FAIRHAVEN_STAGE2_ENRICHED_CHOICES` etc.). The engine DOES consume them.

**Important:** `stageProgress[2]` in the headed spec is read via `result.g.stageProgress[2]`, which uses integer-keyed object spread — this can silently return 0 even when the live page has a non-zero value (known harness gap documented in `tests/CLAUDE.md`). However, the headed report also uses `CoverageTracker` which reads sp2 via `page.evaluate()` directly — that reading is authoritative. The 0 readings in the Coverage Map section are real gaps.

---

## Step 1 — Diagnostic (REQUIRED BEFORE EDITING)

For each of the three files, determine the root cause before writing any fix:

**Check A — Do success `fn()` bodies call `G.stageProgress[2]++` or `(G.stageProgress[2]||0) + 1`?**

Run:
```
grep -n "stageProgress\|maybeStageAdvance\|investigationProgress" content/fairhaven_stage2_enriched_choices.js
grep -n "stageProgress\|maybeStageAdvance\|investigationProgress" content/ithtananalor_stage2_enriched_choices.js
grep -n "stageProgress\|maybeStageAdvance\|investigationProgress" content/panim_haven_stage2_enriched_choices.js
```

**Expected findings from prior investigation:**
- `fairhaven_stage2_enriched_choices.js` — HAS `G.stageProgress[2] = (G.stageProgress[2]||0) + 1` and `maybeStageAdvance()` calls on success paths. If sp2 is still 0, the issue is upstream (choices not being loaded/rendered, or `adaptEnrichedChoice` catching an error).
- `ithtananalor_stage2_enriched_choices.js` — HAS `G.stageProgress[2]` increments on success paths. Same caveat.
- `panim_haven_stage2_enriched_choices.js` — HAS `G.stageProgress[2]` increments in some choices. Check for choices that call `maybeStageAdvance()` WITHOUT also incrementing `G.stageProgress[2]` on the success path (lines ~20–35 of this file show some choices only calling `maybeStageAdvance()` without the explicit increment).

**Check B — Are choices registered under the correct locality ID?**

The engine loads stage 2 choices by matching `G.location` to the registered locality key. Check each file's exported variable name and how the engine consumes it:

```
grep -n "window\.\(FAIRHAVEN\|ITHTANANALOR\|PANIM_HAVEN\)" content/fairhaven_stage2_enriched_choices.js
grep -n "window\.\(FAIRHAVEN\|ITHTANANALOR\|PANIM_HAVEN\)" content/ithtananalor_stage2_enriched_choices.js
grep -n "window\.\(FAIRHAVEN\|ITHTANANALOR\|PANIM_HAVEN\)" content/panim_haven_stage2_enriched_choices.js
```

Then confirm the engine's lookup key:
```
grep -n "FAIRHAVEN_STAGE2\|ITHTANANALOR_STAGE2\|PANIM_HAVEN_STAGE2" ledger-of-ash.html | grep -v "script src"
```

If the engine lookups return no results, the window-global variable is declared but never consumed — that is the root cause.

**Check C — Is `G.stage === 'Stage II'` when these localities are visited?**

Stage 2 enriched choices are likely only injected when `G.stage === 'Stage II'`. If the player is still in Stage I during the headed run when visiting these localities, no sp2 choices appear. Confirm by checking `loadStageChoices()` in `ledger-of-ash.html` for the stage guard around stage 2 choice loading.

---

## Step 2 — Apply Fix Based on Diagnostic

### Scenario A: Choices DO increment stageProgress but sp2 stays 0 (wiring gap in engine)

If the content is correct but the engine isn't consuming these arrays, add the missing engine lookup in `loadStageChoices()` in `ledger-of-ash.html`. Find where the engine loads stage 2 enriched choices for other localities (e.g., shelkopolis, soreheim) and add analogous entries for fairhaven, ithtananalor, and panim_haven.

The pattern to add in `loadStageChoices` (inside the Stage II block):
```js
if (G.location === 'fairhaven' && typeof window.FAIRHAVEN_STAGE2_ENRICHED_CHOICES !== 'undefined') {
  _choices = _choices.concat(window.FAIRHAVEN_STAGE2_ENRICHED_CHOICES);
}
if (G.location === 'ithtananalor' && typeof window.ITHTANANALOR_STAGE2_ENRICHED_CHOICES !== 'undefined') {
  _choices = _choices.concat(window.ITHTANANALOR_STAGE2_ENRICHED_CHOICES);
}
if (G.location === 'panim_haven' || G.location === 'panim') {
  if (typeof window.PANIM_HAVEN_STAGE2_ENRICHED_CHOICES !== 'undefined') {
    _choices = _choices.concat(window.PANIM_HAVEN_STAGE2_ENRICHED_CHOICES);
  }
}
```

### Scenario B: Some choices missing `G.stageProgress[2]` increment on success paths

For any choice `fn()` body that calls `maybeStageAdvance()` without explicitly incrementing `G.stageProgress[2]`, add the increment before the `maybeStageAdvance()` call:

```js
// In any fn() that calls maybeStageAdvance() without the increment:
G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
maybeStageAdvance();
```

Only add this to choices where the player's success should represent meaningful stage progress (risky/bold choices on investigation paths). Do NOT add it to safe-tier low-stakes choices.

### Scenario C: Choices missing `plot: 'main'` on stage-advancement paths

Choices that increment `G.stageProgress[2]` should have `plot: 'main'` to render the blue border. Check each stage-advancing choice in all three files:

```js
// Add to any choice that calls stageProgress[2]++ but lacks plot field:
plot: 'main',
```

---

## Step 3 — panim_haven ID alias check

The engine may reference `panim` (short form) while the content file exports `PANIM_HAVEN_STAGE2_ENRICHED_CHOICES`. Confirm the locality ID used at runtime:

```
grep -n "G.location.*panim\|panim.*G.location\|'panim'" ledger-of-ash.html | head -20
```

If `G.location` is set to `'panim'` (not `'panim_haven'`), the engine lookup for `'panim_haven'` will miss. Add an alias in the lookup:
```js
if (G.location === 'panim_haven' || G.location === 'panim') { ... }
```

---

## Verify Steps

1. Run `npm run test:content` after all changes — must show 0 new violations.
2. In the browser console, load a Stage II save. Navigate to `fairhaven` (`resolveArrival('fairhaven')`). Open the choice panel — stage-advancing choices (blue border) must appear.
3. Pick a risky or bold stage-advancing choice at `fairhaven`. Check `G.stageProgress[2]` in console — must increment from its prior value.
4. Repeat steps 2–3 for `ithtananalor` and `panim_haven` (or `panim`).
5. Run the headed Playwright spec: `npx playwright test tests/e2e/playtest-headed.spec.js --reporter=line`. In the Coverage Map section of the generated report, `fairhaven`, `ithtananalor`, and `panim` must show sp2 > 0.

---

## Git Commit Message Template

```
fix(content): wire fairhaven/ithtananalor/panim stage2 enriched choices to engine — localities now contribute sp2 on success paths

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
