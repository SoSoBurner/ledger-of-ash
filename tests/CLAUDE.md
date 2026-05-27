# Ledger of Ash — Testing & Playwright Reference

> Loaded automatically when working in tests/. Full playtest protocol in `docs/PLAYTEST_PROTOCOL.md`.

## Testing Infrastructure

- Run logic tests: `npx jest` (not `npm test` if jest not in PATH globally)
- Run content validators: `node tests/content/validate-content.js && node tests/content/validate-flags.js && node tests/content/validate-structure.js`
- Run E2E: `npx playwright test`
- **`node --check` rejects HTML**: `node --check ledger-of-ash.html` fails — Node treats it as ESM. Use `node --check content/*.js` to syntax-check content files instead.
- **vm context mocking gotcha**: Function declarations in `ledger-of-ash.html` are hoisted into the vm context at eval time, overriding sandbox stubs. Reassigning `ctx.funcName` after eval has no effect on compiled closures. Assert observable G state (e.g. `G.dead`, `G.hp`) instead of spying on internal function calls.
- **Backlog violation counts are estimates**: Always run `node tests/content/validate-content.js 2>&1 | grep <filename>` to get the real count before starting a fix pass — BACKLOG.md snapshots drift.
- `locality_voice_guide.js` and `npc_dossiers.js` are reference-only — not loaded by HTML, whitelisted in validate-structure.js `REFERENCE_ONLY` set
- `content/` has subdirectories — all `fs.readdirSync` scans must use `.filter(f => fs.statSync(...).isFile())`
- Baseline (Apr 2026): 838 content violations pre-existing (label length, question marks). Validator is correct; content debt is real.

## Playwright E2E — Critical Gotchas

- **E2E stall guards**: 60s wall-clock stall → counted as failed run; 3x same-label pick → `_travelCoreTravelTo(dest)` teleport to `ESCAPE_LOCS`; 30-pick same-location → teleport. Do not remove these guards or reduce the 60s threshold.
- **No pipes or redirects in playwright commands**: `Bash(npx playwright test *)` in settings.json won't match `npx playwright test ... | tail` or `... > file`. Run bare: `npx playwright test tests/e2e/foo.spec.js --reporter=line`
- **`/tmp/` doesn't exist on Windows**: Never redirect output there. Use `run_in_background:true` and let the task capture output, or redirect to an absolute Windows path.
- **`test.use({ launchOptions })` must be file-level**: Can't use inside `test.describe()` — Playwright rejects it. Headed vs headless = separate spec files.
- **`playwright.config.js` headless override**: `use.headless: true` in config beats `test.use({ launchOptions: { headless: false } })` in spec. Use `test.use({ headless: false })` (top-level key) to override it correctly.
- **Headless pacing = 0**: No human watching → set all `waitForTimeout` pacing constants to 0. Only `waitForChoices` needs a real timeout (1500ms) for DOM to render.
- **Monitor tool on Windows**: `Get-Content -Wait | Where-Object` and `Get-Content -Wait | Select-String` both exit immediately (exit 1) in the Monitor tool. Use bash `tail -f /path/to/file | grep -E --line-buffered "pattern"` syntax instead.
- **`ctx_execute` cap vs Playwright specs**: Playwright headless runs take 10–20 min — exceeds `ctx_execute`'s 10-min sandbox limit. Run specs via PowerShell `run_in_background` or foreground PowerShell only; never `ctx_execute`.
- **Background task output files**: Written to a Windows temp path. Read via PowerShell `Get-Content` or the `Read` tool — bash `cat`/`tail` on those paths fails silently.
- **Never pipe Playwright background runs through `Select-Object -First N`**: PowerShell closes the pipe after N items, silently killing the test process.
- **Kill only Playwright processes, not all Chrome**: Use WMI to filter by command line:
  ```powershell
  Get-WmiObject Win32_Process -Filter "Name='chrome.exe'" | Where-Object { $_.CommandLine -match '--headless|--remote-debugging' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
  Get-WmiObject Win32_Process -Filter "Name='node.exe'" | Where-Object { $_.CommandLine -match 'playwright' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
  ```
- **Run Playwright from PowerShell, not background bash**: background bash tasks fail exit 127 (npx not in PATH). Use: `Set-Location "C:\Users\CEO\ledger-of-ash"; cmd /c "npx playwright test tests/e2e/FILE.spec.js --timeout=N --reporter=line"`
- **`shiftTension` never raises tension**: nothing in content files increments it. If tension locks at 2, add `shiftTension(-1)` to choice resolution paths in `handleChoice`.
- **Location teleport in spec**: stall/escape teleports use `_travelCoreTravelTo(dest)` (fires corridor encounters, no mode-select UI). `resolveArrival(loc)` for in-place re-renders only. `loadStageChoices` re-renders same location silently — do not use for teleports.
- **`dismissOverlays` selector scope**: Only `.overlay.active` misses modals that don't use `.active`. Extend to `.overlay.active, [id$="-modal"]:visible, .modal:visible` and add DOM-fallback `querySelectorAll('.overlay.active').forEach(el => el.classList.remove('active'))` after the loop.
- **Travel mode buttons in spec**: `.choice-btn:visible` matches the disabled `selectTravelMode` buttons. Always use `.choice-btn:visible:not([disabled])` in `pickChoice`.
- **`resolveCombatAction` null guard**: Always has `if (!CS) return;` as first line. Loop-detect sets `CS = null`; click handlers on already-rendered combat buttons fire after that, crashing on `CS.enemyDefMod`.
- **Probe dedup in spec loops**: Any `picks % N === 0` condition inside a `while` loop with `continue` fires N times on the same pick during stalls. Guard with a `lastFiredAtPick` variable.
- **Playwright module-scope closure trap**: Functions defined at module scope cannot close over variables declared inside `test()`. Declare shared state at module scope (`var x = 0;`), assign inside `test()` (`x = Date.now();`). Symptom: variable is `undefined` at runtime, soft-threshold checks silently never fire.
- **`readNarrativeText` reads ambient text**: Returns persistent `.narrative-text` (locality desc), not per-pick result. To capture result text for review, also query `.result-text` after `waitForChoices()` resolves.
- **Skill review scope**: Apply all applicable skills (polish-review, feedback-loop-review, balance-review, line-editor) to BOTH screenshots AND log/report output.
- **Journal DOM structure**: Categories are `quest, field_note, faction, rival, companion, fact` — NOT evidence/intelligence/rumor/discovery. Rendered as `.jov-section` / `.jov-entry` divs by `showJournal()`. `#journal-overlay-body` holds all sections at once.
- **Camp/Notice/Shop selectors**: Camp = `button.camp-action[data-camp="rest/sleep/train/craft"]`. Notices = `.notice-card`, `.notice-card:not(.seen)`, `.notice-text`. Shop = `.shop-buy-btn[data-shop-idx]`, `.shop-item` — no `#overlay-shop`, rendered dynamically.
- **Char sheet DOM sections**: `.char-skill-row` (skill values), `.ability-card` (abilities), `.trait-section` (traits). No sub-tabs — all sections render at once in `#sheet-body`.
- **HUD element IDs**: `#hud-hp`, `#hud-level`, `#hud-gold`, `#hud-renown`, `#hud-day`, `#hud-location`, `#topbar-stage`, `#hud-stage-progress-val`, `#hud-xp`, `#hud-heat-row`. Extend `readG()` to include gold/xp/renown/maxHp/benevolence/orderAxis before writing HUD integrity probes.
- **Kill playwright before restart**: Always `Stop-Process` all playwright node.exe and headless chrome.exe before starting a new spec run.
- **Alignment bars threshold**: Benevolence/order bars only render when `|G.benevolence| >= 10` or `|G.orderAxis| >= 10`. Absent bars are NOT a bug.
- **`readG()` sp2 serialization gap**: `g.stageProgress[2]` from `readG()` can return 0 even when the live page has sp2=10+. Root cause: integer-keyed object spread loses numeric keys. Use `page.evaluate()` to read G directly — never rely on `readG()` for stageProgress numeric keys.
- **Playwright multi-match `.isVisible()` strict mode**: Comma-separated locators may match multiple elements — `.isVisible()` may throw. Use specific single selectors.
- **Char sheet traitType fallback label**: The else-branch of the `traitType` ternary at line ~14925 must render `'Utility — 1/scene'` for unrecognized traitTypes (not `'Investigation — 1/scene'`).
- **Map travel gate string**: Map overlay says "Reach Level 6 to cross polity lines" — Stage I cap is 5, making it unreachable. Must read "Advance to Stage II to unlock cross-polity travel."
- **"Safe choices always succeed" tooltip violates Universal Roll Rule**: All choices roll. Correct text: "Safe choices roll at low DC — failure redirects rather than stops you."

## Playtest Harness v2

Helper files in `tests/e2e/helpers/`:
- `stage-lock.js` — `getStageCeiling(page)` reads `canAdvanceToStage3/4/5()` from the live engine and returns `'Stage II'|'Stage III'|'Stage IV'|'Stage V'`. `isSuccess(page, ceiling)` is organic (no nuclear injection). When Stage III content is built: change `canAdvanceToStage3()` from `return false` to real conditions — the harness auto-scales.
- `map-travel.js` — `shouldTravelNow(picks, lastMapTravelPick)` fires every 15–20 picks. `openMapAndTravel(page, visitedLocalities, log, picks)` opens `#overlay-map` via `showMap()`, reads `.map-travel-btn[data-locid]`, clicks a random unvisited locality.
- `coverage-tracker.js` — `CoverageTracker` tracks per-locality sp2 contribution, dead-ends, map travels. `getSummary()` returns coverage object consumed by `ReportWriter`.
- `report-writer.js` — `ReportWriter('headed'|'headless')` writes `test-results/playtest-report-{YYYYMMDD-HHmm}-{mode}.md` after each run.

**Headless spec**: nuclear gate KEPT (speed). **Headed spec**: nuclear gate REMOVED — organic sp2 only.

**Post-run analysis**: `node tests/e2e/post-run-analysis.js [report-file] [screenshot-dir]`
- Reads latest `test-results/playtest-report-*-headed.md` + log + screenshot list
- Calls Claude API for 7 analysis domains; writes `test-results/playtest-analysis-{YYYYMMDD-HHmm}.md`

**Report file naming**: `playtest-report-{YYYYMMDD-HHmm}-headed.md` / `playtest-report-{YYYYMMDD-HHmm}-headless.md` in `test-results/`.

**Warning baseline**: 291 (set via `reporter.setWarningBaseline(291)`). New warnings above baseline are flagged in report.

**Known harness gaps (do not investigate as new failures):**
- **`pageerror` → `reporter.addJsError()` gap**: Harness logs `pageerror` events to console but never calls `reporter.addJsError()` — report always shows "JS errors logged: 0" even when real browser JS errors fired. Check raw output for `[js-error ...]` lines; don't trust the report's JS error count.
- **Pre-existing startup JS errors**: "Invalid or unexpected token" fires exactly 2× per run at page load across all archetypes — non-blocking, game plays through. 13 content files have UTF-8 BOM. Treat as baseline noise.
- **Zero-sp2 locality pattern**: Localities showing 0 sp2 in coverage map (shelkopolis, fairhaven, cosmoria, mimolot, panim, ithtananalor) are content gaps — no sp2-contributing choices authored for Stage II there. Not engine bugs; file as content backlog items.
- **`post-run-analysis.js` ETIMEDOUT on Windows**: Auto-analysis Claude API call (`spawnSync cmd.exe`) times out in headed spec post-run hook. Non-fatal. Run `node tests/e2e/post-run-analysis.js <report-file>` manually if analysis is needed.

## Playtest Change Gate

NEVER make changes to the Playtest system (`tests/e2e/playtest-headless.spec.js`, `tests/e2e/playtest-headed.spec.js`, `tests/e2e/helpers/*.js`, `tests/e2e/post-run-analysis.js`, or the Playtest Protocol section of CLAUDE.md) unless the user explicitly asks. Then: confirm **"Are you sure you want to modify the Playtest system?"** before making any change.

## Playtest Protocol

When the user says **"Playtest"**, autonomously run the full protocol defined in [`docs/PLAYTEST_PROTOCOL.md`](../docs/PLAYTEST_PROTOCOL.md).

Stop only at a deliberate stage gate (`canAdvanceToStage3()` hardcoded `return false`).
