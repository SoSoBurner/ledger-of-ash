# Travel Arc, Combat Variety & Boss Encounter Fix Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix three engine bugs causing (A) travel to silently fail in Stage I, (B) corridor encounter arcs to be polluted by enriched choice injection, and (C) all authority combat encounters to default to road wardens.

**Architecture:** All bugs are in `ledger-of-ash.html` with one also touching `tests/e2e/playtest-headed.spec.js`. The travel fix aligns two mismatched Stage I gate conditions. The encounter fix swaps `renderChoices` for `_rawRenderChoices` at corridor render sites. The combat fix adds an `AUTHORITY_ENEMY_MAP` object and uses it in `enterAuthorityConfrontation`. Each task is independent; all can be done in any order except Task 6 (verification), which depends on all prior tasks.

**Tech Stack:** Vanilla ES5 JS in `ledger-of-ash.html`, Playwright (`tests/e2e/playtest-headed.spec.js`)

---

## Evidence Summary (do not re-investigate — trust this)

**Bug A confirmed by playtest data (20260526-0113):** 11 map travels executed, only 3 localities visited. fairhaven, aurora, mimolot, sunspire appear in travel log but never in locality coverage — journey never started for any of them. Root cause confirmed at line 14745 vs 13582.

**Bug B confirmed by code:** `renderChoices` at lines 11956 and 12334 injects enriched choices into corridor encounter choice sets. Enriched choices alongside "My papers are in order" confuse both players and the harness. Player/harness may pick an enriched choice instead of the corridor choice, abandoning the journey silently.

**Bug C confirmed by code:** Line 9503 builds `authorityKey + '_officer'` (e.g. `road_wardens_officer`). None of these keys exist in ENEMY_TEMPLATES (line ~2915). `enterCombat` falls through to `startCombat` with the invalid key → `getEnemyStats` returns null → console.error → `loadStageChoices(G.location)` → bestiary encounter → always `patrol_guard`.

**Bug D (boss) — no fix needed:** Organic run (20260526-0113) confirmed boss fires and completes naturally at sp2≈12. `boss=false` at sp2=9, `boss=true` at sp2=14. The issue was harness injection in prior sessions — the injection is gone and the system works.

---

## File Map

| File | Lines | Change |
|------|-------|--------|
| `ledger-of-ash.html` | 14745 | Map lock condition — align with travelTo Stage I gate |
| `ledger-of-ash.html` | 11956 | Corridor encounter render — `renderChoices` → `_rawRenderChoices` |
| `ledger-of-ash.html` | 12334 | Corridor result `next` render — same swap |
| `ledger-of-ash.html` | ~9490–9505 | Add `AUTHORITY_ENEMY_MAP`, use it in `enterAuthorityConfrontation` |
| `tests/e2e/playtest-headed.spec.js` | ~s2-probe line | Fix `boss` flag probe to check `stage2_miniboss_started` not `stage2_miniboss_complete` |

---

## Task 1: Debug Instrumentation — Confirm Bugs in Live Play

**Files:**
- Modify: `ledger-of-ash.html` — add 3 `console.log` calls, one per bug

This task adds temporary console instrumentation. You will open the game via `play.bat`, open Chrome DevTools (F12 → Console), reproduce each bug, and read the output. This confirms the bugs are real before fixing them.

- [ ] **Step 1: Add travel gate debug log**

Find the Stage I block in `travelTo` at line ~13582:

```js
if (G.stage === 'Stage I' && cur) {
    const samePolitya = loc.polity === cur.polity;
    const sameMacro = lmr[locId] && lmr[G.location] && lmr[locId] === lmr[G.location];
    const plotUnlock = G.flags && G.flags['travel_unlock_' + locId];
    if (!samePolitya && !sameMacro && !plotUnlock) {
```

Add immediately inside the inner `if` block (before `addNarration`):

```js
    if (!samePolitya && !sameMacro && !plotUnlock) {
      console.log('[travel-debug] BLOCKED locId=' + locId + ' polity='+loc.polity+'/'+cur.polity+' samePol='+samePolitya+' macro='+lmr[locId]+'/'+lmr[G.location]+' sameMacro='+sameMacro);
      addNarration('', '<em style="color:var(--gold-dim)">The road to ' + loc.name + ' lies beyond your current range. Advance to Stage II to journey further.</em>');
```

- [ ] **Step 2: Add corridor encounter encList debug log**

Find the corridor encounter selection in `handleChoice` at line ~11943:

```js
    const encList = (window.CORRIDOR_ENCOUNTERS || {})[tier] || [];
    if (!encList.length) { resolveArrival(destId); return; }
```

Add immediately after the `encList` assignment:

```js
    const encList = (window.CORRIDOR_ENCOUNTERS || {})[tier] || [];
    console.log('[corridor-debug] tier=' + tier + ' encList.length=' + encList.length + ' dest=' + destId + ' fromMacro=' + fromMacro + ' toMacro=' + toMacro + ' curPol=' + curPol + ' toPol=' + toPol);
    if (!encList.length) { resolveArrival(destId); return; }
```

- [ ] **Step 3: Add authority combat debug log**

Find `enterAuthorityConfrontation` outcome handler at line ~9502:

```js
    if (typeof enterCombat === 'function') {
      enterCombat(authorityKey + '_officer', { isBoss: false, _authorityPolity: polity, _authorityKey: authorityKey, _authorityFight: true });
    }
```

Add immediately before:

```js
    console.log('[combat-debug] authority fight: key=' + authorityKey + '_officer (will fail lookup — no ENEMY_TEMPLATES entry)');
    if (typeof enterCombat === 'function') {
      enterCombat(authorityKey + '_officer', { isBoss: false, _authorityPolity: polity, _authorityKey: authorityKey, _authorityFight: true });
    }
```

- [ ] **Step 4: Open game and reproduce**

Run `play.bat`. Open DevTools (F12). In Stage I:
1. Open the map (Map button in UI). Click "Travel here" on a non-adjacent locality. Look for `[travel-debug] BLOCKED` in console. Note the `polity` and `macro` values.
2. Click "Travel here" on a nearby locality (same region). Pick a journey pack. Look for `[corridor-debug]` in console — confirm `encList.length > 0`.
3. Trigger an authority confrontation (walk into a high-heat area or pick a choice tagged `Confrontation`). Pick "Fight". Look for `[combat-debug]` in console.

Expected:
- `[travel-debug] BLOCKED` fires for cross-polity destinations — confirms Bug A
- `[corridor-debug] tier=short encList.length=4` — confirms encounters exist when tier is correct
- `[combat-debug] authority fight: key=road_wardens_officer (will fail)` — confirms Bug C

- [ ] **Step 5: Commit debug instrumentation**

```bash
git add ledger-of-ash.html
git commit -m "debug: add travel/corridor/combat console instrumentation

Temporary logs to confirm Bug A (travelTo Stage I gate mismatch),
Bug B (corridor encList tier), Bug C (authority _officer key miss).
Remove in follow-up fix commits.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 2: Fix Map Lock — Align with `travelTo` Stage I Gate

**Files:**
- Modify: `ledger-of-ash.html` line ~14745

The map builds the `locked` flag using `l.region !== curRegion`. The `travelTo()` function blocks travel using `!samePolitya && !sameMacro`. These use different attributes (`region` vs `polity`+`macroregion`). When the map shows a "Travel here" button for a destination that `travelTo()` will block, the player clicks it and sees "Advance to Stage II" narration — travel appears broken.

The fix: replace the map's `locked` calculation with the same polity+macroregion check that `travelTo()` uses.

- [ ] **Step 1: Find the map rendering context**

Run:
```bash
grep -n "const locked\|curRegion\|isCur.*locked\|map-travel-btn" ledger-of-ash.html | head -15
```

Find the block starting around line 14740 that looks like:
```js
const curRegion = ...;
// ...
const locked = G.stage === 'Stage I' && l.region !== curRegion && !stranded;
```

Read 20 lines before and after line 14745 to understand the full context — what variables are available (`l`, `curLoc`, `G.location`, etc.).

- [ ] **Step 2: Read what `curLoc` and `l` contain**

The map loop iterates over world locations. Each `l` is a locality object with fields like `l.id`, `l.polity`, `l.region`. The current locality is accessed as `WORLD_LOCATIONS[G.location]` (call it `curLoc`). Confirm by reading the lines before the `locked` assignment.

- [ ] **Step 3: Replace the locked condition**

Find:
```js
      const locked = G.stage === 'Stage I' && l.region !== curRegion && !stranded;
```

Replace with:
```js
      const _lmr = window.LOCALITY_MACROREGION || {};
      const _samePol = l.polity && curLoc && l.polity === curLoc.polity;
      const _sameMacro = _lmr[l.id] && _lmr[G.location] && _lmr[l.id] === _lmr[G.location];
      const _plotUnlock = G.flags && G.flags['travel_unlock_' + l.id];
      const locked = G.stage === 'Stage I' && !_samePol && !_sameMacro && !_plotUnlock && !stranded;
```

This matches `travelTo()`'s check exactly (lines 13582–13590). Now a destination shows "Travel here" only if `travelTo()` will actually start a journey for it.

- [ ] **Step 4: Remove the now-unused `curRegion` variable**

Find the line that sets `curRegion` (should be 1–3 lines before the old `locked` line) and delete it. It's something like:
```js
const curRegion = curLoc ? curLoc.region : null;
```
Delete this line — `curRegion` is no longer used.

- [ ] **Step 5: Verify via play.bat**

Open game. In Stage I, open the map. Confirm:
- Only destinations in the same polity OR same macroregion as shelkopolis show "Travel here" buttons
- Cross-polity, cross-macroregion destinations show the padlock / "Unlocks at Stage II" text
- Clicking a visible "Travel here" button ALWAYS results in journey pack choices appearing (not "Advance to Stage II" narration)
- Check browser console — NO `[travel-debug] BLOCKED` fires when clicking a button that showed "Travel here"

- [ ] **Step 6: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix: align map lock with travelTo Stage I polity+macroregion gate

Map was locking on l.region !== curRegion while travelTo() gated on
polity+macroregion. Misalignment caused 'Travel here' buttons to appear
for destinations that travelTo() would immediately block with 'Advance
to Stage II' narration. 11 map travel attempts in organic playtest but
only 3 localities reached — all due to this mismatch.

Removed unused curRegion variable.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 3: Fix Corridor Encounter Rendering — Use `_rawRenderChoices`

**Files:**
- Modify: `ledger-of-ash.html` lines 11956 and 12334

`renderChoices` injects enriched Stage II choices into any choice set it renders. Corridor encounter choices (rendered at line 11956) and the "The road continues" `next` choices (rendered at line 12334) go through `renderChoices`, so enriched choices appear alongside corridor choices. The player or harness may pick an enriched choice mid-journey, silently abandoning the travel arc. Fix: use `_rawRenderChoices` (which skips enriched injection) at both sites.

- [ ] **Step 1: Fix corridor encounter choices render (line ~11956)**

Find in `handleChoice` the `__journey__` handler block. Look for:
```js
    addNarration(enc.title, enc.text);
    setTimeout(() => renderChoices(enc.choices), 300);
    return;
```

Replace with:
```js
    addNarration(enc.title, enc.text);
    setTimeout(() => (window._rawRenderChoices || window.renderChoices)(enc.choices), 300);
    return;
```

- [ ] **Step 2: Fix corridor result `next` choices render (line ~12334)**

Find in `resolveConsequence`:
```js
  if (!_awaitingLevelUp && res.next) setTimeout(() => renderChoices(res.next), 400);
```

Replace with:
```js
  if (!_awaitingLevelUp && res.next) setTimeout(() => (window._rawRenderChoices || window.renderChoices)(res.next), 400);
```

**Important:** Only change the `res.next` line. Do NOT change any other `renderChoices` call in `resolveConsequence`. The fallback `loadStageChoices` at the 800ms guard below should remain untouched.

- [ ] **Step 3: Verify via play.bat**

In Stage I, travel to a reachable locality (one that now shows "Travel here" after Task 2 fix). Pick a journey pack. The encounter should render with only 2–3 corridor choices — NO enriched Stage II choices should appear alongside them. After picking the corridor choice, "The road continues." should be the ONLY choice rendered (no enriched choices added). Click it — locality should change.

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix: use _rawRenderChoices for corridor encounter arcs

renderChoices injects enriched choices into any choice set. This was
adding Stage II enriched choices alongside corridor encounter choices
and the 'The road continues' step. Players and harness could pick an
enriched choice mid-journey, silently abandoning the travel arc.

Fixed at: handleChoice __journey__ render (enc.choices) and
resolveConsequence res.next render.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 4: Fix Authority Combat — Add `AUTHORITY_ENEMY_MAP`

**Files:**
- Modify: `ledger-of-ash.html` lines ~9490–9505

`enterAuthorityConfrontation` calls `enterCombat(authorityKey + '_officer', ...)`. None of the generated keys (e.g. `road_wardens_officer`) exist in `ENEMY_TEMPLATES`. `enterCombat` falls through to `startCombat` with an invalid key → `getEnemyStats` returns null → console error → `loadStageChoices(G.location)` → bestiary encounter → always `patrol_guard`.

Fix: add `AUTHORITY_ENEMY_MAP` mapping each of the 11 polity authority keys to a valid `ENEMY_TEMPLATES` key. Use it in the `fight` outcome handler.

- [ ] **Step 1: Read the authority keys list**

Run:
```bash
grep -n "authorityKey\|road_wardens\|roazian_enf\|magi_mag\|book_tariff\|afterlife\|cosmouth\|harvest_meas\|trade_arb\|route_warden\|giant_council\|bond_registry" content/authority_encounters.js | head -30
```

Confirm the 11 authority keys that `enterAuthorityConfrontation` receives. They should be:
`road_wardens`, `roazian_enforcement`, `magi_magistratus`, `book_tariff_office`, `afterlife_registry`, `cosmouth_archives`, `harvest_measures_board`, `trade_arbitration_guild`, `route_warden_compacts`, `giant_council`, `bond_registry_ring`

- [ ] **Step 2: Read the ENEMY_TEMPLATES keys**

Run:
```bash
grep -n "patrol_guard\|private_security\|iron_accord\|red_hood\|frontier_militia\|guild_enforcer\|warden_lieutenant\|border_enforcer" ledger-of-ash.html | grep "ENEMY_TEMPLATES\|id:\|key:" | head -20
```

Confirm these are valid ENEMY_TEMPLATES keys:
`patrol_guard`, `private_security`, `iron_accord_enforcer`, `red_hood_operative`, `frontier_militia`, `guild_enforcer`, `warden_lieutenant`, `border_enforcer`

- [ ] **Step 3: Add `AUTHORITY_ENEMY_MAP` near the authority confrontation function**

Find `enterAuthorityConfrontation` (search: `function enterAuthorityConfrontation` or `function _authorityResolve`). Add the map immediately before the `fight` outcome block (around line 9498):

```js
  var AUTHORITY_ENEMY_MAP = {
    road_wardens:           'warden_lieutenant',
    roazian_enforcement:    'iron_accord_enforcer',
    magi_magistratus:       'red_hood_operative',
    book_tariff_office:     'private_security',
    afterlife_registry:     'guild_enforcer',
    cosmouth_archives:      'private_security',
    harvest_measures_board: 'frontier_militia',
    trade_arbitration_guild:'guild_enforcer',
    route_warden_compacts:  'patrol_guard',
    giant_council:          'frontier_militia',
    bond_registry_ring:     'guild_enforcer'
  };
```

- [ ] **Step 4: Use the map in the `fight` outcome**

Find (around line 9498–9504):
```js
  if (outcome === 'fight') {
    // Combat victory result wired via post-combat hook — here we just enter combat
    addHeat(polity, 0); // heat added on victory in _authorityResolveCombatVictory
    document.querySelectorAll('.choice-block,.move-block').forEach(function(b){b.remove();});
    if (typeof enterCombat === 'function') {
      enterCombat(authorityKey + '_officer', { isBoss: false, _authorityPolity: polity, _authorityKey: authorityKey, _authorityFight: true });
    }
  }
```

Replace with:
```js
  if (outcome === 'fight') {
    addHeat(polity, 0);
    document.querySelectorAll('.choice-block,.move-block').forEach(function(b){b.remove();});
    if (typeof enterCombat === 'function') {
      var _enemyKey = AUTHORITY_ENEMY_MAP[authorityKey] || 'patrol_guard';
      enterCombat(_enemyKey, { isBoss: false, _authorityPolity: polity, _authorityKey: authorityKey, _authorityFight: true });
    }
  }
```

- [ ] **Step 5: Remove the `[combat-debug]` log added in Task 1**

Find and delete:
```js
    console.log('[combat-debug] authority fight: key=' + authorityKey + '_officer (will fail lookup — no ENEMY_TEMPLATES entry)');
```

- [ ] **Step 6: Verify via play.bat**

Trigger an authority confrontation and pick "Fight". Open Chrome DevTools → Console. Confirm:
- No `[startCombat] unknown enemy key:` error
- Combat screen appears with a named enemy (not a blank/broken state)
- The enemy is NOT always `Roadwarden Patrol Guard` — varies by authority type

Trigger confrontations in different authority zones (road wardens vs magi vs trade guild) and confirm different enemies appear.

- [ ] **Step 7: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix: AUTHORITY_ENEMY_MAP — route authority combat to valid enemy keys

enterAuthorityConfrontation was calling enterCombat with
'authorityKey_officer' (e.g. road_wardens_officer) — none of which
exist in ENEMY_TEMPLATES. This caused silent fallback: startCombat
logged an error and called loadStageChoices, which loaded bestiary
encounters — always resolving to patrol_guard.

Added AUTHORITY_ENEMY_MAP (11 polity keys → valid ENEMY_TEMPLATES
entries) and use it in the fight outcome handler.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 5: Fix Harness Boss Probe — Report `started` Not `complete`

**Files:**
- Modify: `tests/e2e/playtest-headed.spec.js` — s2-probe `boss=` field

The s2-probe currently shows `boss=true` when `stage2_miniboss_complete` is true (the encounter is DONE). This conflates "boss is currently happening" with "boss already finished." In prior sessions, the harness injected `stage2_miniboss_complete=true` at sp2≥8, making `boss=true` appear before the encounter ever fired. The injection is gone, but the probe still reads the wrong flag. Fix: probe `stage2_miniboss_started` for "in progress" and `stage2_miniboss_complete` for "done" — report both.

- [ ] **Step 1: Find the s2-probe log line**

Run:
```bash
grep -n "s2-probe\|miniboss_complete\|miniboss.*boss\|boss.*probe" tests/e2e/playtest-headed.spec.js | head -10
```

Find the log line that includes `boss=${...}`. It reads something like:
```js
log(`[s2-probe ${tag}] pick=${picks} stage=${g.stage} sp2=${g.sp2} boss=${g.flags.stage2_miniboss_complete || false} ...`);
```

- [ ] **Step 2: Update the `readG()` return object**

Find `readG()` and locate its flags section. Add two fields:

```js
miniboss_started:  !!(G.flags && G.flags.stage2_miniboss_started),
miniboss_complete: !!(G.flags && G.flags.stage2_miniboss_complete),
```

If these already exist, ensure they read both flags separately.

- [ ] **Step 3: Update the s2-probe log line**

Find the s2-probe `log(...)` call. Replace the `boss=${...}` segment:

Old:
```js
boss=${g.flags.stage2_miniboss_complete || false}
```

New:
```js
boss_started=${g.miniboss_started} boss_done=${g.miniboss_complete}
```

The full s2-probe line should now look like:
```js
log(`[s2-probe ${tag}] pick=${picks} stage=${g.stage} sp2=${g.sp2} boss_started=${g.miniboss_started} boss_done=${g.miniboss_complete} faction=${...} antechamber=${...} climaxDone=${...} gold=${g.gold} xp=${g.xp} supply=${g.supply}`);
```

- [ ] **Step 4: Remove `[travel-debug]` and `[corridor-debug]` logs from Task 1**

Find and delete:
```js
      console.log('[travel-debug] BLOCKED locId=' + locId + ' ...');
```
and:
```js
    console.log('[corridor-debug] tier=' + tier + ' ...');
```

These were temporary — remove them now that the fixes are in.

- [ ] **Step 5: Syntax check**

```bash
node --check tests/e2e/playtest-headed.spec.js
```

Expected: no output (no errors).

- [ ] **Step 6: Commit**

```bash
git add tests/e2e/playtest-headed.spec.js
git commit -m "fix(harness): s2-probe reports boss_started and boss_done separately

Previously probed stage2_miniboss_complete (done), which was being
injected artificially. Now reports both started and done flags so the
log shows whether the Pell encounter is active vs completed.

Also removes temporary debug console.log calls added for bug verification.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Task 6: Post-Fix Organic Verification Run

**Goal:** Confirm all three fixes work — localities actually change after map travel, corridor encounter arcs play with correct choice sets, and authority fights produce varied enemies.

- [ ] **Step 1: Kill stale Playwright processes**

```powershell
Get-WmiObject Win32_Process -Filter "Name='chrome.exe'" | Where-Object { $_.CommandLine -match '--headless|--remote-debugging' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Get-WmiObject Win32_Process -Filter "Name='node.exe'" | Where-Object { $_.CommandLine -match 'playwright' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
```

- [ ] **Step 2: Run headless regression gate**

```powershell
Set-Location "C:\Users\CEO\ledger-of-ash"
cmd /c "npx playwright test tests/e2e/playtest-headless.spec.js --timeout=600000 --reporter=line" > "C:\Users\CEO\AppData\Local\Temp\travel-fix-headless.txt" 2>&1; echo "EXIT:$LASTEXITCODE"
```

Wait ~15 min. Then:
```powershell
Get-Content "C:\Users\CEO\AppData\Local\Temp\travel-fix-headless.txt" -Encoding Unicode | Where-Object { $_ -match "passed|failed|EXIT:" } | Select-Object -Last 5
```
Expected: `1 passed`

- [ ] **Step 3: Run headed organic spec**

```powershell
Set-Location "C:\Users\CEO\ledger-of-ash"
cmd /c "npx playwright test tests/e2e/playtest-headed.spec.js --timeout=600000 --reporter=line" > "C:\Users\CEO\AppData\Local\Temp\travel-fix-headed.txt" 2>&1; echo "EXIT:$LASTEXITCODE"
```

Wait ~40 min. Then:
```powershell
Get-Content "C:\Users\CEO\AppData\Local\Temp\travel-fix-headed.txt" -Encoding Unicode | Where-Object { $_ -match "passed|failed|EXIT:|s2-probe|locality|map travels|boss" } | Select-Object -Last 30
```

- [ ] **Step 4: Read the report and verify**

```powershell
$r = Get-ChildItem "C:\Users\CEO\ledger-of-ash\tests\test-results" -Filter "playtest-report-*-headed.md" | Sort-Object LastWriteTime -Descending | Select-Object -First 1 -ExpandProperty FullName; Get-Content $r -Encoding UTF8
```

**Pass criteria (all must be true):**
- Families passed: 4/4
- Localities visited: **≥ 5** (was 3 in organic run before fix — travel gate fix should unlock more destinations)
- Map travels executed: ≥ 8, and **locality visited count ≈ map travel count** (not 11 travels → 3 localities like before)
- Coverage gaps: only `panim` or similar content-gap localities (not fairhaven/aurora/mimolot which are locked by map-gate bug)
- s2-probe log shows `boss_started=true` during one of the runs, then `boss_done=true` (Pell encounter fired and completed)
- `boss_started=false boss_done=false` early in game, transitioning to `boss_started=true` at sp2≈8–12, then `boss_done=true` after ≈10 more picks
- 0 JS errors logged
- 0 new validator warnings above baseline

---

## Self-Review

**Spec coverage check:**
- Travel gate mismatch → Task 2 ✓
- Corridor encounter injection → Task 3 ✓
- Authority enemy mapping → Task 4 ✓
- Debug instrumentation → Task 1 ✓ (plus removal in Task 5)
- Harness probe fix → Task 5 ✓
- Verification → Task 6 ✓

**Placeholder scan:** No TBD, no "handle edge cases", no "similar to Task N". All code is shown in full.

**Type/name consistency:**
- `AUTHORITY_ENEMY_MAP` defined in Task 4 Step 3, used in Task 4 Step 4 ✓
- `_rawRenderChoices` fallback pattern matches existing usage in stage2_antechamber.js and stage2_climax.js ✓
- `miniboss_started` / `miniboss_complete` field names match `G.flags.stage2_miniboss_started` / `G.flags.stage2_miniboss_complete` ✓
