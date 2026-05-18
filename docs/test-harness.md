# Playtest Harness — Developer Reference

This document describes the Playwright end-to-end test harness for Ledger of Ash. It covers both spec files, all helper modules, the post-run analysis script, and known gotchas specific to this project and environment.

---

## Overview

The harness runs two complementary specs against `ledger-of-ash.html` using Playwright:

| Spec | Mode | Purpose | Time cap |
|---|---|---|---|
| `playtest-headless.spec.js` | Headless | Fast CI smoke test — organic Stage I → II progression | 62 min hard / 55 min soft |
| `playtest-headed.spec.js` | Headed (visible browser) | Full QA — screenshots, overlays, sp2 completion | 3 hr hard / 2 hr 45 min soft |

Both specs run the same 4 archetype families:

| Family | Archetypes |
|---|---|
| classic-combat | warrior, knight, berserker, warlord, warden, death_knight, archer |
| magic-spellcasting | paladin, spellthief, ranger |
| stealth-precision | rogue, assassin, scout_c, thief, trickster, beastmaster |
| support-leadership | healer, artificer, engineer, tactician, alchemist, saint, bard |

Both specs share the same helper modules under `tests/e2e/helpers/`.

---

## Running the specs

Run from the repo root (`C:\Users\CEO\ledger-of-ash`), always via PowerShell — not bash (per CLAUDE.md: `npx` is not in PATH in background bash tasks).

```powershell
# Headless (fast — run first)
Set-Location "C:\Users\CEO\ledger-of-ash"
cmd /c "npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line"

# Headed (full QA — run after headless passes)
Set-Location "C:\Users\CEO\ledger-of-ash"
cmd /c "npx playwright test tests/e2e/playtest-headed.spec.js --reporter=line"
```

Never pipe Playwright output through `Select-Object` or any filter — PowerShell closes the pipe after N items, which silently kills the test process (per CLAUDE.md).

Kill lingering Playwright processes before a new run:

```powershell
Get-WmiObject Win32_Process -Filter "Name='chrome.exe'" |
  Where-Object { $_.CommandLine -match '--headless|--remote-debugging' } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

Get-WmiObject Win32_Process -Filter "Name='node.exe'" |
  Where-Object { $_.CommandLine -match 'playwright' } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
```

Do not use `Stop-Process` on all `chrome.exe` — it kills the user's regular browser.

---

## playtest-headless.spec.js

**File:** `tests/e2e/playtest-headless.spec.js`

### Purpose

Organic progression smoke test. Verifies that each of the 4 archetype families can advance from Stage I to Stage II without any stage-progress injection. Designed for speed: all pacing constants are 0 except `waitChoices` (1500 ms for DOM render).

### Time caps

- Outer Playwright timeout: 62 minutes (`test.setTimeout(62 * 60 * 1000)`)
- Hard suite cap: 60 minutes — families are skipped if the cap is reached between families
- Soft exit threshold: 55 minutes — checked every 25 picks inside `runPlaythrough`; exits cleanly with a partial report rather than waiting for the hard kill

### Success condition per family

```
G.stage !== 'Stage I'
```

Evaluated organically (no sp2 injection). The spec calls the local `isSuccess(page, ceiling, headless=true)` wrapper, not `stageLockIsSuccess` directly.

### Stage ceiling

Detected once before families begin by loading a temporary page and calling `getStageCeiling(page)`. With `canAdvanceToStage3()` hardcoded `return false`, this returns `'Stage II'`. When Stage III content is built and `canAdvanceToStage3` returns true, the ceiling auto-raises with no spec changes needed.

### Triage probes (every 25 picks)

Two inline checks fire at every 25-pick boundary:

- `TRIAGE_STALL`: if `#choice-panel` inner text is empty and `G.dead === false`, logs `[TRIAGE_STALL]` and attempts a `loadStageChoices()` recovery call.
- `TRIAGE_PROGRESSION_BLOCKED`: if `sp1` (stageProgress[1]) is the same value as the previous 25-pick check, logs `[TRIAGE_PROGRESSION_BLOCKED tag] pick=N — sp1=N frozen`.

These log warnings for post-run analysis. They do not abort the run.

### Stall guards

Three guards prevent the spec from hanging indefinitely:

1. **60-second wall-clock stall**: if no successful pick fires within 60 seconds, logs `STALL` and returns `{ success: false, reason: 'stall-timeout' }`.
2. **3x same-label teleport**: if the last 3 consecutive picked labels are identical, tension is reset to 0 and `_travelCoreTravelTo(dest)` is called to an escape location (one of: shelkopolis, cosmouth, zootia, roaz, soreheim).
3. **30-pick same-location teleport**: if `G.location` has not changed for 30 consecutive picks, the spec teleports to an escape location via `_travelCoreTravelTo`.

### Pick strategy

Each pick follows this priority order:

1. `.choice-btn.plot-main:visible` — always selected first if present
2. Random pick — every 5th pick
3. Longest label — all other picks (longest text correlates with most content)

### Outputs

- `test-results/playtest-headless-log.md` — incremental log, written per-line so a hard kill doesn't lose data
- `test-results/playtest-report-{YYYYMMDD-HHmm}-headless.md` — structured report via `ReportWriter`
- `test-results/playthrough-screenshots/` — screenshots at every 50 picks, dead-ends, stalls, success/death
- `test-results/videos/` — video recordings per attempt (recorded via Playwright `recordVideo`)

---

## playtest-headed.spec.js

**File:** `tests/e2e/playtest-headed.spec.js`

### Purpose

Full game QA simulation. Runs with a visible browser at human-readable pacing. Exercises all overlays, takes frequent screenshots, performs periodic HUD/content probes, and audits choice labels against content standards. Designed to catch visual, UX, and content bugs that headless misses.

Headed mode is set at the file level:
```js
test.use({ headless: false });
```
This overrides `playwright.config.js`'s `use.headless: true` (per CLAUDE.md: `test.use({ headless: false })` at the top level is the correct override; a `launchOptions` block inside `test.describe` is rejected by Playwright).

### Time caps

- Outer Playwright timeout: 3 hours
- Soft exit: 2 hours 45 minutes (checked per-family via a `familyCeiling` remaining-time budget)
- Up to 5 retry attempts per family (`MAX_ATTEMPTS = 5`)

### Success condition per family

```
climaxDone && sp2 >= 18
```

Where `climaxDone = flags.stage2_climax_complete || flags.maren_oss_resolved`. Evaluated organically via `stageLockIsSuccess(page, ceiling)`. No nuclear sp2 injection in the headed spec.

### First attempt per family

Each family runs a deterministic fixed archetype/background on attempt 1:

| Family | Archetype | Background |
|---|---|---|
| classic-combat | warrior | w_garrison |
| magic-spellcasting | paladin | p_cysur |
| stealth-precision | rogue | ro_shelk |
| support-leadership | healer | hl_shelk |

Subsequent attempts draw from a shuffled pool of all archetype+background combos for that family.

### Pacing constants

All pacing delays are set for human-visible play:

| Constant | Value |
|---|---|
| afterResult | 1500 ms |
| beforePanel | 800 ms |
| betweenCombat | 700 ms |
| afterLevelup | 500 ms |
| short | 300 ms |
| waitChoices | 3500 ms |
| panelDwell | 1200 ms |

### Probe schedule

`PROBE_EVERY = 20`, `CAMP_EVERY = 60`, `SCREENSHOT_EVERY = 20`.

| Probe | Cadence |
|---|---|
| `probeCharSheet` | every 20 picks |
| `probeJournal` | every 20 picks |
| `probeQuestHUD` | every 20 picks |
| `probeHeatHUD` | every 20 picks |
| `probeAlignmentBars` | every 20 picks |
| `probeCamp` | every 60 picks |
| `probeInventory` | every 60 picks |
| `probeShop` | every 80 picks |
| `probeHowToPlay` | once at pick 5 |

### Choice label audit

After every `snapshotChoices()` call, `auditChoiceLabels()` checks each label against content standards and logs `VIOLATION` lines for:
- Labels over 15 words
- Labels ending with `?`
- Labels starting with infinitive verb forms (To, Ask, Tell, Go, Find, etc.)

Violations are logged but do not abort the run. They appear in the post-run analysis log excerpt under `## VIOLATIONS`.

### `resetTravelInterval()` call

`resetTravelInterval()` is imported from `map-travel.js` and called at the start of each family run to prevent the map travel interval counter from bleeding between families.

### Dead-end recovery (headed — repair mode)

The headed spec uses a more aggressive 6-stage recovery sequence (`handleDeadEndRepair`) when 3 consecutive picks return zero choices:

1. Press Escape
2. Click `#btn-camp` overlay
3. Call `loadStageChoices(G.location)` via `page.evaluate`
4. Runtime blank-panel guard inject (same as R3 but via DOM check)
5. If `G.tensionLevel >= 2`, reset tension to 0 and reload choices
6. Teleport to a random Stage I locality key from `STAGE_LOCALITY_POOL[1]`

### Outputs

- `test-results/playtest-headed-log.md` — incremental log
- `test-results/playtest-report-{YYYYMMDD-HHmm}-headed.md` — structured report
- `test-results/playthrough-screenshots/` — screenshots every 20 picks plus all milestone events

---

## post-run-analysis.js

**File:** `tests/e2e/post-run-analysis.js`

### Purpose

Post-run analysis script. Reads the most recent headed playtest report and log, sends excerpts to Claude for domain-focused QA analysis, and writes a findings report and prioritized fix plan.

### How to run

```powershell
Set-Location "C:\Users\CEO\ledger-of-ash"
node tests/e2e/post-run-analysis.js [report-file] [screenshot-dir]
```

Both arguments are optional. If omitted, the script finds the most recent `playtest-report-*-headed.md` in `test-results/` and uses `test-results/playthrough-screenshots/` as the screenshot directory.

### Claude API vs CLI

- If `@anthropic-ai/sdk` is installed and `ANTHROPIC_API_KEY` is set: uses the Anthropic SDK with `claude-haiku-4-5`, `max_tokens: 2048`
- Otherwise: falls back to `claude -p -` CLI, invoked via `execSync` with a temp prompt file

Domains run sequentially to avoid rate limit conflicts.

### Analysis domains (10 total)

| Domain ID | Label | Focus |
|---|---|---|
| engine | Engine / Logic Bugs | JS errors, silent failures, dead-end patterns, stall causes |
| progression | Stage Progression / sp2 Flow | sp2 advancement rate, stage gate fires, 0-sp2 localities |
| content | Content / Narrative Quality | Choice label standards, result text quality, canon compliance |
| combat | Combat / Balance | Combat frequency, DC hit rates, death causes, XP flow |
| economy | Economy / Resources | Gold/supply flow, shop availability, resource sinks |
| coverage | Locality Coverage | Which localities visited, coverage gaps, map travel effectiveness |
| polish | Polish / UX | HUD integrity, typography, color roles, overall feel |
| humanizer | Voice and Register Audit | AI-prose patterns: "you realize", "you feel", "you sense" etc. |
| branch_drift | Branch Drift Audit | Repeated phrasing, option-set imbalance, register drift |
| tutorial | Tutorial and Onboarding Review | How to Play text, Universal Roll Rule explanation, onboarding copy |

Findings are graded P0 (blocks release), P1 (fix before next build), P2 (backlog).

### Outputs

- `test-results/playtest-analysis-{YYYYMMDD-HHmm}.md` — full domain findings
- `docs/superpowers/plans/playtest-plan-{YYYYMMDD-HHmm}.md` — prioritized P0/P1/P2 fix plan extracted from findings

---

## Helper Modules

### stage-lock.js

**File:** `tests/e2e/helpers/stage-lock.js`

Detects the current stage ceiling by calling the live engine's advance-check functions. Auto-scales when Stage III+ content is built — no harness changes needed.

**`getStageCeiling(page)`**
- Calls `canAdvanceToStage3/4/5()` in order on the live page
- Returns: `'Stage II' | 'Stage III' | 'Stage IV' | 'Stage V'`
- Falls back to `'Stage II'` if the engine is not loaded or throws
- With current build (`canAdvanceToStage3` hardcoded `return false`): always returns `'Stage II'`

**`isSuccess(page, ceiling, opts?)`**
- `ceiling`: string from `getStageCeiling`
- `opts.allowNuclear`: unused in current harness calls (organic-only headed spec)
- For `'Stage II'` ceiling: returns `true` when `(flags.stage2_climax_complete || flags.maren_oss_resolved) && G.stageProgress[2] >= 18`
- For higher ceilings: checks `G.stage` matches or exceeds the ceiling string
- Returns: `Promise<boolean>`
- Important: reads `G.stageProgress[2]` directly inside `page.evaluate` — not via `readG()` spread, which loses integer keys (per CLAUDE.md)

**`ceilingLabel(ceiling)`**
- Returns: human-readable string explaining why this ceiling applies (e.g. `"Stage II — canAdvanceToStage3 = false (Stage III not yet built)"`)
- Used in report headers

---

### map-travel.js

**File:** `tests/e2e/helpers/map-travel.js`

Handles programmatic map travel to spread locality coverage and exercise the map UI.

**`shouldTravelNow(picks, lastMapTravelPick)`**
- Returns `true` when `(picks - lastMapTravelPick) >= _nextTravelAt`
- `_nextTravelAt` is randomized to 15–20 picks each time a travel fires
- Returns: `boolean`

**`openMapAndTravel(page, visitedLocalities, log, picks)`**
- Opens the map by calling `showMap()` via `page.evaluate` (avoids nav button selector brittleness)
- Reads all `.map-travel-btn[data-locid]` buttons from the map overlay
- Prefers unvisited localities (those not in `visitedLocalities` Set); falls back to all if all visited
- Clicks the chosen button; fallback calls `travelTo(locId)` directly if the click fails
- Calls `resetInterval()` after each travel to randomize the next interval
- Returns: `Promise<string|null>` — the `locId` travelled to, or `null` if the map could not open or no buttons were found

**`resetTravelInterval()`**
- Public reset for inter-family isolation — call at the start of each family run
- Prevents the interval counter from carrying state between families

---

### coverage-tracker.js

**File:** `tests/e2e/helpers/coverage-tracker.js`

Tracks per-locality visits, sp2 contribution, dead-ends, and map travels for the coverage section of the playtest report.

**`new CoverageTracker()`**
- Constructs an empty tracker. One instance per spec run, shared across all families.

**`onPick(g)`**
- Call after every pick with the current G snapshot (from `readG(page)`)
- Tracks: locality visits, sp2 on arrival vs departure, pick count
- `g` must include `g.location` and `g.stageProgress` (object with key `2`)

**`onDeadEnd(loc, pick, html?)`**
- Call when a dead-end is detected (3 consecutive zero-choice picks)
- `loc`: current `G.location`; `pick`: current pick count; `html`: optional HTML snippet for the log

**`onMapTravel(fromLoc, toLoc, pick)`**
- Call when a map travel completes (after `openMapAndTravel` returns a non-null `locId`)

**`onNuclearGate(pick, sp2)`**
- Call when a nuclear sp2 gate fires (headless spec only — headed spec has no nuclear gate)

**`getSummary()`**
- Returns a structured object consumed by `ReportWriter.write()`:
  - `totalPicks` — total pick count across all `onPick` calls
  - `localitiesVisited` — count of distinct localities visited
  - `localityRows` — array of `{ locId, visits, firstVisitPick, sp2Contributed, deadEnds, mapTravels }`
  - `coverageGaps` — localities visited with 0 sp2 contribution
  - `unvisited` — localities from the known list never visited this run
  - `deadEnds` — array of `{ loc, pick, htmlSnippet }`
  - `mapTravels` — array of `{ fromLoc, toLoc, pick }`
  - `nuclearGateFired` — count of nuclear gate fires

The known locality list (`ALL_LOCALITIES`) is hardcoded in the module: 22 Stage I localities plus known Stage II localities.

---

### report-writer.js

**File:** `tests/e2e/helpers/report-writer.js`

Generates the structured markdown playtest report after each run.

**`new ReportWriter(mode)`**
- `mode`: `'headed'` or `'headless'`
- Initializes with warning baseline of 291 and ceiling `'Stage II'`

**`setCeiling(ceiling)`**
- Sets the stage ceiling string (from `getStageCeiling`) for the report header

**`setWarningBaseline(n)`**
- Sets the known-good validator warning count. Default: 291. New warnings above this are flagged.

**`addFamily(result)`**
- Adds a family result object to the report. Call once per family after `runFamily` completes.
- `result` shape: `{ family, success, archetypeId, backgroundId, attempts, picks, sp2, stage, reason }`

**`addJsError(err)`**
- Adds a JS error string to the report's error section

**`write(coverage, warnCount)`**
- `coverage`: object from `CoverageTracker.getSummary()`
- `warnCount`: current validator warning count (pass 291 for known baseline)
- Writes `test-results/playtest-report-{YYYYMMDD-HHmm}-{mode}.md`
- Returns: the written file path as a string

Report sections: Run Summary, Family Results, Stage Gate Status, Locality Coverage Map, Coverage Gaps, Dead-ends Log, Map Travels Log, JS Errors, Warnings.

---

## Known Gotchas

**Never pipe Playwright through Select-Object.**
`... | Select-Object -First N` in PowerShell closes the pipe after N items, silently killing the node process. Run all Playwright commands without any piping.

**Run Playwright from PowerShell, not background bash.**
Background bash tasks launched from `legacy/` return exit 127 because `npx` is not in the bash PATH. Always use:
```powershell
Set-Location "C:\Users\CEO\ledger-of-ash"
cmd /c "npx playwright test tests/e2e/FILE.spec.js --reporter=line"
```

**Kill only Playwright Chrome, not all Chrome.**
`Stop-Process` on all `chrome.exe` kills the user's regular browser. Filter by `CommandLine` matching `--headless` or `--remote-debugging` (see the WMI snippet in the Running section above).

**`readG()` stageProgress serialization gap.**
The `readG()` helper in both specs spreads `G.stageProgress` with `{ ...G.stageProgress }`. Integer-keyed object spread loses numeric keys in some JS environments — `g.stageProgress[2]` can return `0` even when the live page has `sp2 >= 10`. When checking success conditions that depend on `sp2`, read `G.stageProgress[2]` inside a `page.evaluate()` call directly (as `isSuccess` in `stage-lock.js` does). Never rely on `readG()` for stageProgress numeric key reads in success checks (per CLAUDE.md).

**Probe dedup guard for pick-boundary conditions.**
Any `picks % N === 0` condition inside a `while` loop with `continue` can fire N times on the same pick number during stall recovery. Guard with a `lastFiredAtPick` variable:
```js
if (picks !== _lastFiredAtPick) { _lastFiredAtPick = picks; /* do the thing */ }
```

**`test.use({ launchOptions })` must be file-level.**
Cannot use inside `test.describe()` — Playwright rejects it. The headed spec uses `test.use({ headless: false })` at the file's top level, not inside a describe block (per CLAUDE.md).

**`playwright.config.js` headless override.**
`use.headless: true` in the config beats `test.use({ launchOptions: { headless: false } })` in a spec. Use the top-level key form `test.use({ headless: false })` to override it correctly.

**`dismissOverlays` selector scope (headed spec).**
The headed spec's `dismissOverlays` extends beyond `.overlay.active` to also catch `#how-to-play-modal`, `#notice-board-modal`, `[id$="-modal"]:visible`, and `.modal:visible` — modals that don't use the `.active` class. The headless spec's `dismissOverlays` only handles `.overlay.active`. If adding new modal types, update both specs.

**`.choice-btn:visible` matches disabled travel mode buttons.**
The headed spec's `pickChoice` uses `.choice-btn:visible:not([disabled])` to avoid selecting disabled travel mode buttons. The headless `pickChoice` does not include `:not([disabled])` — a known minor divergence.

**`/tmp/` does not exist on Windows.**
Never redirect output to `/tmp/`. Use absolute Windows paths or let `run_in_background` capture output (per CLAUDE.md).
