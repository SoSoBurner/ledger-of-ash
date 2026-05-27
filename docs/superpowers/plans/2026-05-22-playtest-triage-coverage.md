# Playtest Protocol Triage & Coverage Improvements

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **REQUIRED BEFORE ANY CHANGE:** Confirm "Are you sure you want to modify the Playtest system?" per tests/CLAUDE.md.

**Goal:** Add surgical diagnostic signals to the headless spec (Stage I→II flag validation, boss-fire watch, sp2 stall detection) and richer player-experience coverage to the headed spec (combat outcomes, death screen, Stage II climax logging, ability cards, craft UI).

**Architecture:** Additive changes only — no rewrites. Headless adds local vars before the `while` loop + TRIAGE block logic in `runPlaythrough`. Headed adds local vars inside `runPlaythrough` + expands existing `probeCharSheet`, `probeCamp`, and `probeCombatBranches` functions. All sp2 reads use `page.evaluate()` due to the `readG()` serialization gap (tests/CLAUDE.md).

**Tech Stack:** Playwright, Node.js, JavaScript (ES5 `var` for module-scope vars per established pattern), Markdown log files, PNG screenshots.

**Shipping order:** Phase 1+2 (Tasks 1–7) → verify headless run → Phase 3+4 (Tasks 8–12) → verify headed run.

---

## File Map

| File | What changes |
|------|-------------|
| `tests/e2e/playtest-headless.spec.js` | Tasks 1–6 (H1–H6): local vars + TRIAGE block additions + isSuccess tightening |
| `tests/e2e/playtest-headed.spec.js` | Tasks 7–11 (D1–D6): local vars + probe expansions |
| `tests/e2e/helpers/coverage-tracker.js` | Task 12: verify/add sp2 zero-contributor list |

---

## Phase 1+2 — Headless Triage Enrichment

### Task 1: H6 — G-snapshot enrichment

**Files:**
- Modify: `tests/e2e/playtest-headless.spec.js:878-881`

The existing `[G tag]` log line (emitted when sp1 changes) lacks heat, benevolence, and orderAxis. Add them so every Stage I triage snapshot carries alignment + heat signals.

- [ ] **Step 1: Find the log line**

  Open `playtest-headless.spec.js`. Locate this block (around line 878):
  ```javascript
  if (sp1 !== lastLoggedSP1) {
    log(`[G ${tag}] pick=${picks} sp1=${sp1} sp2=${(g.stageProgress && g.stageProgress[2]) || 0} stage=${g.stage} loc=${g.location} lvl=${g.level}`);
    lastLoggedSP1 = sp1;
  }
  ```

- [ ] **Step 2: Replace with enriched version**

  ```javascript
  if (sp1 !== lastLoggedSP1) {
    const _heatShelk = (g.heat && g.heat.shelk) || 0;
    log(`[G ${tag}] pick=${picks} sp1=${sp1} sp2=${(g.stageProgress && g.stageProgress[2]) || 0} stage=${g.stage} loc=${g.location} lvl=${g.level} heat_shelk=${_heatShelk} ben=${g.benevolence || 0} order=${g.orderAxis || 0}`);
    lastLoggedSP1 = sp1;
  }
  ```

- [ ] **Step 3: Verify format (manual check)**

  `readG()` already reads `heat`, `benevolence`, `orderAxis` from the engine — no changes to `readG` needed. Confirm by grepping:
  ```
  grep -n "benevolence\|orderAxis\|heat" tests/e2e/playtest-headless.spec.js | head -10
  ```
  Expected: at least one hit showing readG captures these fields.

- [ ] **Step 4: Commit**
  ```
  git add tests/e2e/playtest-headless.spec.js
  git commit -m "feat(playtest): H6 — enrich headless G-snapshot with heat/alignment fields"
  ```

---

### Task 2: H1 — Boss-fire watch

**Files:**
- Modify: `tests/e2e/playtest-headless.spec.js` — local vars (around line 753) + TRIAGE block (around line 759)

The boss (Sera Ironveil) triggers when `sp1 >= 15`. If it doesn't fire within 35 picks of hitting that threshold, the gate is broken. This is currently silent.

- [ ] **Step 1: Add local vars before the while loop**

  Locate line 753 where `var _lastSp1Check = 0;` is declared. Add immediately after it:
  ```javascript
  var _sp1Reached15AtPick = -1;
  var _bossWatchEmitted   = false;
  ```

- [ ] **Step 2: Add boss-fire check in the TRIAGE block**

  The TRIAGE block starts at `if (picks % 25 === 0 && picks > 0)` (around line 759). After the existing TRIAGE 2 block (`_lastSp1Check` logic, ending around line 771), add:

  ```javascript
  // TRIAGE 3: boss-fire watch — flag if sp1 reached 15 but boss hasn't started in 35 picks
  var _sp1ForBoss = (g.stageProgress && g.stageProgress[1]) || 0;
  if (_sp1ForBoss >= 15 && _sp1Reached15AtPick === -1) {
    _sp1Reached15AtPick = picks;
  }
  if (_sp1Reached15AtPick !== -1 && !_bossWatchEmitted) {
    var _bossLag = picks - _sp1Reached15AtPick;
    if (_bossLag >= 35 && !(g.flags && g.flags.stage1_boss_started)) {
      log('[TRIAGE_BOSS_NOT_FIRING ' + tag + '] pick=' + picks + ' sp1=' + _sp1ForBoss + ' lag=' + _bossLag + ' picks since sp1=15');
      _bossWatchEmitted = true;
    }
  }
  ```

- [ ] **Step 3: Verify no emission on healthy run**

  Note: we can't run the full spec now. Instead, verify the logic is sound by reading it aloud:
  - `_sp1Reached15AtPick` records the first pick where sp1 hits 15.
  - If 35 picks pass without `stage1_boss_started`, emit once.
  - `_bossWatchEmitted` prevents duplicate emissions.
  - If boss fires normally (before 35 picks), the check `!(g.flags && g.flags.stage1_boss_started)` is false → no emission. ✓

- [ ] **Step 4: Commit**
  ```
  git add tests/e2e/playtest-headless.spec.js
  git commit -m "feat(playtest): H1 — boss-fire watch: TRIAGE_BOSS_NOT_FIRING after 35 picks at sp1≥15"
  ```

---

### Task 3: H2 — Stage I→II flag chain log

**Files:**
- Modify: `tests/e2e/playtest-headless.spec.js` — local var + TRIAGE block

When the stage advances from I to II, validate the gate flags fired correctly. Currently the transition is invisible in triage logs.

- [ ] **Step 1: Add tracking var before the while loop** (after the H1 vars from Task 2):
  ```javascript
  var _headlessLastStage = '';
  ```

- [ ] **Step 2: Add stage transition check in the TRIAGE block** (after the H1 block from Task 2):

  ```javascript
  // TRIAGE 4: Stage I→II flag chain validation
  if (_headlessLastStage === 'Stage I' && g.stage === 'Stage II') {
    var _f = g.flags || {};
    var _mainbossOk      = !!_f.stage1_mainboss_complete;
    var _narrativeOk     = !!_f.stage1_narrative_complete;
    var _sp1AtAdvance    = (g.stageProgress && g.stageProgress[1]) || 0;
    var _sp2AtAdvance    = 0;
    try { _sp2AtAdvance = await page.evaluate(function(){ return (G && G.stageProgress && G.stageProgress[2]) || 0; }); } catch(_e) {}
    if (_mainbossOk && _narrativeOk) {
      log('[stage-advance:I→II ' + tag + '] pick=' + picks + ' sp1=' + _sp1AtAdvance + ' sp2=' + _sp2AtAdvance + ' flags: mainboss_complete=true narrative_complete=true');
    } else {
      log('[TRIAGE_STAGE_ADVANCE_BAD_FLAGS ' + tag + '] pick=' + picks + ' mainboss_complete=' + _mainbossOk + ' narrative_complete=' + _narrativeOk);
    }
  }
  if (g.stage) _headlessLastStage = g.stage;
  ```

  Note: detection has up to 25-pick lag (TRIAGE fires every 25 picks). Acceptable for triage.

- [ ] **Step 3: Verify logic**

  If the boss fires and the gate works, `_mainbossOk` and `_narrativeOk` are both `true` → clean `[stage-advance:I→II]` log. If a run somehow skips a flag, `[TRIAGE_STAGE_ADVANCE_BAD_FLAGS]` fires. Correct.

- [ ] **Step 4: Commit**
  ```
  git add tests/e2e/playtest-headless.spec.js
  git commit -m "feat(playtest): H2 — Stage I→II flag chain log with TRIAGE_STAGE_ADVANCE_BAD_FLAGS"
  ```

---

### Task 4: H3 — Stage II G-snapshot

**Files:**
- Modify: `tests/e2e/playtest-headless.spec.js` — local var + sp2-change block after line 881

In Stage II, sp1 is frozen, so the existing `[G tag]` snapshot never fires. We need a parallel snapshot keyed to sp2 changes that includes Stage II progression flags.

- [ ] **Step 1: Grep for actual faction arc flag names**

  Before writing the probe, find the real flag names used by the four faction arcs:
  ```
  grep -rn "G\.flags\.\|flags\." content/stage2_shadowhands_arc.js content/stage2_enriched_choices.js content/stage2_climax.js 2>/dev/null | grep "arc_started\|contacted\|arc_begin\|faction_" | head -20
  ```
  Record the four actual flag names. Example expected output (may differ):
  ```
  stage2_shadowhands_contacted
  stage2_collegium_arc_started
  ```
  Use the actual names in the next step.

- [ ] **Step 2: Add tracking var before the while loop** (after Task 3 vars):
  ```javascript
  var _lastLoggedSP2 = -1;
  ```

- [ ] **Step 3: Add Stage II snapshot block after the existing sp1 snapshot block** (after line 881):

  The block to add goes right after the closing `}` of the `if (sp1 !== lastLoggedSP1)` block:

  ```javascript
  // H3: Stage II G-snapshot — fires when sp2 changes (sp1 frozen in Stage II)
  if (g.stage !== 'Stage I') {
    var _sp2Live = 0;
    try { _sp2Live = await page.evaluate(function(){ return (G && G.stageProgress && G.stageProgress[2]) || 0; }); } catch(_e) {}
    if (_sp2Live !== _lastLoggedSP2) {
      var _f2 = g.flags || {};
      // Determine active faction arc — update names from grep results in Step 1
      var _arc = 'none';
      if (_f2.stage2_collegium_arc_started)    _arc = 'collegium';
      else if (_f2.stage2_roadwarden_arc_started) _arc = 'roadwarden';
      else if (_f2.stage2_shadowhands_contacted)  _arc = 'shadowhands';
      else if (_f2.stage2_redhood_arc_started)    _arc = 'redhood';
      log('[G2 ' + tag + '] pick=' + picks + ' sp2=' + _sp2Live + ' arc=' + _arc
        + ' faction_contact=' + !!_f2.stage2_faction_contact_made
        + ' miniboss=' + !!_f2.stage2_miniboss_complete
        + ' antechamber=' + !!_f2.stage2_antechamber_done
        + ' climax_started=' + !!_f2.stage2_climax_started
        + ' climax_done=' + !!(_f2.stage2_climax_complete || _f2.maren_oss_resolved));
      _lastLoggedSP2 = _sp2Live;
    }
  }
  ```

  > **If grep in Step 1 shows different flag names:** update the four `if (_f2.stage2_*_...)` lines to match the real names.

- [ ] **Step 4: Commit**
  ```
  git add tests/e2e/playtest-headless.spec.js
  git commit -m "feat(playtest): H3 — Stage II G2-snapshot with faction arc + progression flags"
  ```

---

### Task 5: H4 — sp2 stall + Stage II enriched-choice check

**Files:**
- Modify: `tests/e2e/playtest-headless.spec.js` — local vars + TRIAGE block

Two new Stage II triage signals: sp2 frozen for 75 picks (3 TRIAGE cycles), and no Stage II enriched choices appearing in 75 picks.

- [ ] **Step 1: Find the Stage II enriched-choice `data-cid` prefix**

  ```
  grep -n "data-cid\|cid:" content/stage2_enriched_choices.js content/shelkopolis_stage2_enriched_choices.js 2>/dev/null | head -10
  ```
  Confirm the prefix used (e.g., `s2_`, `stage2_`, or another pattern). Use it in Step 3 below.

- [ ] **Step 2: Add local vars before the while loop** (after Task 4 vars):
  ```javascript
  var _lastSp2AtTriage        = -1;
  var _sp2FrozenCount         = 0;
  var _lastStage2EnrichedPick = 0;
  ```

- [ ] **Step 3: Add sp2 stall + enriched-choice checks in the TRIAGE block** (after the H3 TRIAGE 4 block from Task 3):

  ```javascript
  // TRIAGE 5: sp2 stall detection (Stage II only)
  if (g.stage !== 'Stage I') {
    var _sp2Triage = 0;
    try { _sp2Triage = await page.evaluate(function(){ return (G && G.stageProgress && G.stageProgress[2]) || 0; }); } catch(_e) {}
    if (_sp2Triage === _lastSp2AtTriage) {
      _sp2FrozenCount++;
      if (_sp2FrozenCount >= 3) { // 3 cycles = 75 picks
        log('[TRIAGE_PROGRESSION_BLOCKED_SP2 ' + tag + '] pick=' + picks + ' sp2=' + _sp2Triage + ' frozen for ' + (_sp2FrozenCount * 25) + ' picks');
      }
    } else {
      _sp2FrozenCount = 0;
    }
    _lastSp2AtTriage = _sp2Triage;

    // TRIAGE 6: no Stage II enriched choices appearing
    // Grep Step 1 result → update selector prefix below if needed
    var _enrichedCount = await page.locator('.choice-btn[data-cid^="s2_"],.choice-btn[data-cid^="stage2_"]').count().catch(function() { return 0; });
    if (_enrichedCount > 0) {
      _lastStage2EnrichedPick = picks;
    } else if (picks - _lastStage2EnrichedPick >= 75 && _lastStage2EnrichedPick > 0) {
      log('[TRIAGE_STAGE_II_NO_ENRICHED_CHOICES ' + tag + '] pick=' + picks + ' loc=' + g.location + ' — no Stage II choices in 75 picks');
      _lastStage2EnrichedPick = picks; // reset to avoid repeated spam
    }
  }
  ```

  > **Update the selector:** If Step 1 grep shows a different prefix (e.g., `data-cid` values start with `shelk_s2` or similar), update the two `data-cid^=` values accordingly.

- [ ] **Step 4: Commit**
  ```
  git add tests/e2e/playtest-headless.spec.js
  git commit -m "feat(playtest): H4 — sp2 stall (75p) + Stage II enriched-choice absence detection"
  ```

---

### Task 6: D5 + D6 — Stage advance screenshot + alignment drift (headed)

**Files:**
- Modify: `tests/e2e/playtest-headed.spec.js` — local vars in `runPlaythrough` + 10-pick HUD block (~line 1538)

D5 captures a screenshot the moment the stage advances (I→II). D6 tracks benevolence/orderAxis drift every 10 picks and screenshots when alignment thresholds are crossed.

- [ ] **Step 1: Add local vars in `runPlaythrough`**

  In the headed `runPlaythrough` (around line 1440, where `_lastScreenshotAtPick` and `_lastHudProbeAtPick` are declared), add:

  ```javascript
  let _lastKnownStage      = '';
  let _lastBenevolence     = 0;
  let _lastOrderAxis       = 0;
  let _benThresholdHit     = false;
  let _ordThresholdHit     = false;
  ```

- [ ] **Step 2: Seed `_lastKnownStage` after character creation**

  After `await createCharacter(...)` and the first `g = await readG(page);` call, add:
  ```javascript
  _lastKnownStage = g.stage || '';
  ```

- [ ] **Step 3: Add D5 + D6 logic in the every-10-picks HUD block**

  The every-10-picks HUD block is around line 1538:
  ```javascript
  if (picks > 0 && picks % 10 === 0 && picks !== _lastHudProbeAtPick) {
    _lastHudProbeAtPick = picks;
    if (picks % PROBE_EVERY !== 0) {
      await probeHUD(page, tag, g);
    }
  }
  ```

  Replace it with the enriched version:
  ```javascript
  if (picks > 0 && picks % 10 === 0 && picks !== _lastHudProbeAtPick) {
    _lastHudProbeAtPick = picks;
    if (picks % PROBE_EVERY !== 0) {
      await probeHUD(page, tag, g);
    }

    // D5: Stage advance screenshot
    try {
      const _curStage = g.stage || '';
      if (_lastKnownStage && _curStage && _curStage !== _lastKnownStage) {
        const _oldLabel = _lastKnownStage.replace(/\s/g, '_');
        const _newLabel = _curStage.replace(/\s/g, '_');
        await screenshot(page, `${tag}_stage_advance_${_oldLabel}_to_${_newLabel}`);
        const _sp2Now = await page.evaluate(function(){ return (G && G.stageProgress && G.stageProgress[2]) || 0; }).catch(() => 0);
        const _sp1Now = (g.stageProgress && g.stageProgress[1]) || 0;
        log(`[stage-advance ${tag}] pick=${picks} old="${_lastKnownStage}" new="${_curStage}" sp1=${_sp1Now} sp2=${_sp2Now}`);
        _lastKnownStage = _curStage;
      } else if (_curStage && !_lastKnownStage) {
        _lastKnownStage = _curStage;
      }
    } catch (_) {}

    // D6: Alignment drift tracking
    try {
      const _curBen = g.benevolence || 0;
      const _curOrd = g.orderAxis   || 0;
      const _dBen   = _curBen - _lastBenevolence;
      const _dOrd   = _curOrd - _lastOrderAxis;
      if (_dBen !== 0 || _dOrd !== 0) {
        log(`[alignment-drift ${tag}] pick=${picks} ben=${_curBen}(${_dBen >= 0 ? '+' : ''}${_dBen}) order=${_curOrd}(${_dOrd >= 0 ? '+' : ''}${_dOrd})`);
      }
      // First crossing of ±10 threshold
      if (!_benThresholdHit && Math.abs(_curBen) >= 10) {
        _benThresholdHit = true;
        await screenshot(page, `${tag}_alignment_ben_threshold_p${picks}`);
        log(`[alignment-drift ${tag}] pick=${picks} THRESHOLD: benevolence=${_curBen} — alignment badge should appear`);
      }
      if (!_ordThresholdHit && Math.abs(_curOrd) >= 10) {
        _ordThresholdHit = true;
        await screenshot(page, `${tag}_alignment_ord_threshold_p${picks}`);
        log(`[alignment-drift ${tag}] pick=${picks} THRESHOLD: orderAxis=${_curOrd} — alignment badge should appear`);
      }
      _lastBenevolence = _curBen;
      _lastOrderAxis   = _curOrd;
    } catch (_) {}
  }
  ```

- [ ] **Step 4: Commit**
  ```
  git add tests/e2e/playtest-headed.spec.js
  git commit -m "feat(playtest): D5+D6 — stage-advance screenshot + alignment drift tracking"
  ```

---

### Task 7: Phase 1+2 verification run

**Files:** Read-only — run and check outputs.

- [ ] **Step 1: Run headless spec (one family, time-limited)**

  ```
  Set-Location "C:\Users\CEO\ledger-of-ash"
  cmd /c "npx playwright test tests/e2e/playtest-headless.spec.js --timeout=600000 --reporter=line"
  ```

  Wait for completion (up to 60 minutes). Check for test pass/fail.

- [ ] **Step 2: Verify H6 — enriched G-snapshot appears**

  ```
  grep -m 5 "heat_shelk=\|ben=\|order=" test-results/playtest-headless-log.md
  ```
  Expected: Lines matching `[G ...] pick=N sp1=X ... heat_shelk=N ben=N order=N`

- [ ] **Step 3: Verify H1 — no false TRIAGE_BOSS_NOT_FIRING on healthy run**

  ```
  grep "TRIAGE_BOSS_NOT_FIRING" test-results/playtest-headless-log.md
  ```
  Expected: Empty (boss fires normally within 35 picks of sp1=15). If it appears, check `grep "stage1_boss_started\|sp1=15" test-results/playtest-headless-log.md` to diagnose.

- [ ] **Step 4: Verify H2 — stage-advance log appears**

  ```
  grep "stage-advance:I\|TRIAGE_STAGE_ADVANCE_BAD" test-results/playtest-headless-log.md
  ```
  Expected: `[stage-advance:I→II ...]` with `mainboss_complete=true narrative_complete=true`. No `TRIAGE_STAGE_ADVANCE_BAD_FLAGS`.

- [ ] **Step 5: Verify H3 — G2 snapshots appear in Stage II**

  ```
  grep "^\[G2 " test-results/playtest-headless-log.md | head -5
  ```
  Expected: Lines like `[G2 family_arch_a1] pick=N sp2=X arc=collegium faction_contact=true ...`

- [ ] **Step 6: Verify H4 — no false stall warnings on healthy run**

  ```
  grep "TRIAGE_PROGRESSION_BLOCKED_SP2\|TRIAGE_STAGE_II_NO_ENRICHED" test-results/playtest-headless-log.md
  ```
  Expected: Empty on a healthy run, or appears only if sp2 genuinely stalled.

- [ ] **Step 7: Verify headed D5+D6 — run a quick headed check**

  ```
  cmd /c "npx playwright test tests/e2e/playtest-headed.spec.js --timeout=600000 --reporter=line"
  ```
  Then:
  ```
  grep "stage-advance\|alignment-drift\|alignment_threshold" test-results/full-playthrough-log-headed.md | head -10
  ```
  Expected: `[stage-advance ...]` entries when stage advances, `[alignment-drift ...]` entries as alignment shifts.

---

## Phase 3+4 — isSuccess Tightening + Headed Coverage

### Task 8: H5 — isSuccess strict threshold

**Files:**
- Modify: `tests/e2e/playtest-headless.spec.js:233-247`

Currently, any run that reaches Stage II passes headless. With H5, the run must reach `sp2 >= 12` AND have visited `>= 3` localities (antechamber threshold). A run that flips stage but stalls at sp2=4 continues playing until 350-pick cap.

- [ ] **Step 1: Locate and read the current inline `isSuccess`**

  The function is at lines 233–247:
  ```javascript
  async function isSuccess(page, ceiling, headless) {
    if (headless) {
      return page.evaluate((c) => {
        try {
          if (typeof G === 'undefined') return false;
          if (c === 'Stage II') return G.stage !== 'Stage I';
          // ...
        } catch (_) { return false; }
      }, ceiling).catch(() => false);
    }
    return stageLockIsSuccess(page, ceiling);
  }
  ```

- [ ] **Step 2: Update the call site to pass sp2 and locality count**

  The call site is around line 794:
  ```javascript
  if (await isSuccess(page, ceiling, !isHeaded)) {
  ```
  Replace with:
  ```javascript
  const _sp2ForSuccess = await page.evaluate(function(){ try{ return G.stageProgress[2]||0; } catch(_){return 0;} }).catch(()=>0);
  if (await isSuccess(page, ceiling, !isHeaded, _sp2ForSuccess, visitedLocalities.size)) {
  ```

- [ ] **Step 3: Update the `isSuccess` function signature and Stage II logic**

  Replace the entire `isSuccess` function (lines 233–247):
  ```javascript
  async function isSuccess(page, ceiling, headless, sp2, localitiesCount) {
    if (headless) {
      // Stage II: require sp2 >= 12 (antechamber reachable) + 3+ localities visited
      return page.evaluate((c) => {
        try {
          if (typeof G === 'undefined') return false;
          if (c === 'Stage II') return G.stage !== 'Stage I';
          if (c === 'Stage III') return G.stage === 'Stage III' || G.stage === 'Stage IV' || G.stage === 'Stage V';
          if (c === 'Stage IV') return G.stage === 'Stage IV' || G.stage === 'Stage V';
          return G.stage === 'Stage V';
        } catch (_) { return false; }
      }, ceiling).then(function(stageOk) {
        if (!stageOk) return false;
        if (ceiling === 'Stage II') {
          if ((sp2 || 0) < 12 || (localitiesCount || 0) < 3) return false;
        }
        return true;
      }).catch(() => false);
    }
    return stageLockIsSuccess(page, ceiling);
  }
  ```

- [ ] **Step 4: Add TRIAGE_THIN_STAGE_II log at the call site**

  At the call site, after reading `_sp2ForSuccess`, add a thin-advance detector:
  ```javascript
  const _sp2ForSuccess = await page.evaluate(function(){ try{ return G.stageProgress[2]||0; } catch(_){return 0;} }).catch(()=>0);
  // H5: log thin Stage II (advanced but sp2 too low to count as success)
  if (_sp2ForSuccess > 0) {
    const _stageNow = await page.evaluate(function(){ try{ return G.stage; } catch(_){ return ''; } }).catch(()=>'');
    if (_stageNow !== 'Stage I' && _sp2ForSuccess < 12) {
      if (_sp2ForSuccess < 12 || visitedLocalities.size < 3) {
        log('[TRIAGE_THIN_STAGE_II ' + tag + '] pick=' + picks + ' sp2=' + _sp2ForSuccess + ' locs=' + visitedLocalities.size + ' — stage advanced but below sp2=12 threshold, continuing');
      }
    }
  }
  if (await isSuccess(page, ceiling, !isHeaded, _sp2ForSuccess, visitedLocalities.size)) {
  ```

  Note: `[TRIAGE_THIN_STAGE_II]` fires every 25 picks while below threshold — this is OK (it's a triage signal, not an error). To suppress repeats, gate with a boolean `_thinStageIILogged` (optional — add if log is too noisy).

- [ ] **Step 5: Commit**
  ```
  git add tests/e2e/playtest-headless.spec.js
  git commit -m "feat(playtest): H5 — strict isSuccess: Stage II requires sp2≥12 + 3 localities"
  ```

---

### Task 9: D1 — Combat probe: Strike/Defend + death screen

**Files:**
- Modify: `tests/e2e/playtest-headed.spec.js:1189` — `probeCombatBranches` function
- Modify: `tests/e2e/playtest-headed.spec.js` — module-scope var for combat mode alternation

Combat mode alternates per family, round-robin across the 4-family suite: even-index families use Defend+flee (safe), odd-index families use Strike (fight to possible death).

- [ ] **Step 1: Add module-scope combat mode counter**

  In `playtest-headed.spec.js`, near the other module-scope `var` declarations (look for `var _exhaustiveCycleDone`), add:
  ```javascript
  var _combatProbeModeCounter = 0; // incremented at each family start; even=defend+flee, odd=strike
  ```

- [ ] **Step 2: Increment the counter at family start**

  In the `runPlaythrough` function, near the top where `tag` is built, add:
  ```javascript
  _combatProbeModeCounter++;
  const _combatMode = (_combatProbeModeCounter % 2 === 0) ? 'defend' : 'strike';
  ```
  Then pass `_combatMode` to `probeCombatBranches`. Find the call site for `probeCombatBranches` (search for `probeCombatBranches(page` and add the parameter):
  ```javascript
  await probeCombatBranches(page, tag, _combatMode);
  ```

- [ ] **Step 3: Update `probeCombatBranches` signature**

  Change the function signature at line 1189:
  ```javascript
  async function probeCombatBranches(page, tag, combatMode) {
  ```
  `combatMode` defaults to `'defend'` if not passed. Add at the top of the function body:
  ```javascript
  combatMode = combatMode || 'defend';
  ```

- [ ] **Step 4: Add Strike sub-probe (for 'strike' mode)**

  After the `await screenshot(page, \`${tag}_combat_probe_entry\`);` line (around line 1216), add the Strike probe that fires BEFORE the SAFE_LABELS loop:

  ```javascript
  // D1: Strike probe — fires on odd-index families
  let _strikeProbeOccurred = false;
  if (combatMode === 'strike') {
    const _hpBefore = await page.evaluate(function(){ try{ return G.hp; } catch(_){ return -1; } }).catch(() => -1);
    if (_hpBefore >= 10) { // HP guard — avoid death-risk at low HP
      const _strikeBtn = page.locator('[data-action="attack"]:visible,.combat-btn:visible:has-text("Strike")').first();
      if (await _strikeBtn.isVisible({ timeout: 800 }).catch(() => false)) {
        await _strikeBtn.click();
        await page.waitForTimeout(PACE.betweenCombat);
        const _hpAfter = await page.evaluate(function(){ try{ return G.hp; } catch(_){ return -1; } }).catch(() => -1);
        await screenshot(page, `${tag}_combat_probe_strike`);
        log(`[combat-probe ${tag}] strike: hp_before=${_hpBefore} hp_after=${_hpAfter} delta=${_hpAfter - _hpBefore}`);
        _strikeProbeOccurred = true;

        // Check for death screen
        const _deadNow = await page.locator('#screen-death,.death-screen,#death-overlay,#overlay-death').isVisible({ timeout: 800 }).catch(() => false);
        if (_deadNow) {
          log(`[combat-probe ${tag}] DEATH: hp dropped to 0 during strike probe`);
          await screenshot(page, `${tag}_combat_probe_death`);

          // Death screen probe: verify buttons render
          const _loadBtn    = page.locator('button:has-text("Load"),button:has-text("Continue")').first();
          const _restartBtn = page.locator('button:has-text("Restart"),button:has-text("New Game")').first();
          const _endBtn     = page.locator('button:has-text("End Legend")').first();
          const _loadVis    = await _loadBtn.isVisible({ timeout: 1000 }).catch(() => false);
          const _restartVis = await _restartBtn.isVisible({ timeout: 1000 }).catch(() => false);
          const _endVis     = await _endBtn.isVisible({ timeout: 1000 }).catch(() => false);
          log(`[combat-probe ${tag}] death-screen: load=${_loadVis} restart=${_restartVis} endLegend=${_endVis}`);

          // Verify save exists before clicking Load
          const _hasSave = await page.evaluate(function(){
            try { return !!(localStorage.getItem('ledgerSave') || localStorage.getItem('loaSave') || localStorage.getItem('saveData')); }
            catch(_) { return false; }
          }).catch(() => false);

          if (_hasSave && _loadVis) {
            await _loadBtn.click();
            await page.waitForTimeout(1500);
            log(`[combat-probe ${tag}] death-resume: clicked Load — save restored`);
          } else if (_restartVis) {
            await _restartBtn.click();
            await page.waitForTimeout(1500);
            // Re-create character to resume run
            await createCharacter(page, archetypeId, backgroundId);
            log(`[combat-probe ${tag}] death-resume: no save found — clicked Restart`);
          }
          await screenshot(page, `${tag}_combat_probe_death_resume`);
          return; // Exit probeCombatBranches — run state was reset
        }
      } else {
        log(`[combat-probe ${tag}] strike: [data-action="attack"] not visible — skipping`);
      }
    } else {
      log(`[combat-probe ${tag}] strike: SKIP hp_low=${_hpBefore}`);
    }
  }
  ```

  Note: `archetypeId` and `backgroundId` must be in scope for the Restart path. Pass them as parameters to `probeCombatBranches` if they are not already accessible: `async function probeCombatBranches(page, tag, combatMode, archetypeId, backgroundId)`. Update the call site accordingly.

- [ ] **Step 5: Add Defend sub-probe (for 'defend' mode, before existing SAFE_LABELS loop)**

  After the Strike probe block, add:
  ```javascript
  // Defend sub-probe — fires on even-index families
  if (combatMode === 'defend' && !_strikeProbeOccurred) {
    const _hpBefore = await page.evaluate(function(){ try{ return G.hp; } catch(_){ return -1; } }).catch(() => -1);
    const _defendBtn = page.locator('[data-action="defend"]:visible,.combat-btn:visible:has-text("Defend")').first();
    if (await _defendBtn.isVisible({ timeout: 800 }).catch(() => false)) {
      await _defendBtn.click();
      await page.waitForTimeout(PACE.betweenCombat);
      const _hpAfter = await page.evaluate(function(){ try{ return G.hp; } catch(_){ return -1; } }).catch(() => -1);
      log(`[combat-probe ${tag}] defend: hp_before=${_hpBefore} hp_after=${_hpAfter}`);
      await screenshot(page, `${tag}_combat_probe_defend`);
    }
  }
  ```

  The existing SAFE_LABELS loop (which includes `'Retreat'`) then runs as the exit strategy.

- [ ] **Step 6: Commit**
  ```
  git add tests/e2e/playtest-headed.spec.js
  git commit -m "feat(playtest): D1 — combat probe: alternate Strike/Defend+death-screen per family"
  ```

---

### Task 10: D2 — Stage II climax organic probe

**Files:**
- Modify: `tests/e2e/playtest-headed.spec.js` — inside `runPlaythrough` while loop

When Stage II content fires organically (antechamber, climax), intercept choices to test specific branches. Rotate branches by family index: 0=Negotiate, 1=Deflect, 2=Refuse, 3=normal algorithm.

- [ ] **Step 1: Find actual climax choice labels**

  ```
  grep -n "label:\|text:" content/stage2_climax.js | grep -i "negoti\|deflect\|refus\|cooperat\|avoid\|confront" | head -10
  ```
  Record the exact choice labels for the three branches. Use them in Step 3.

- [ ] **Step 2: Add local vars in `runPlaythrough`**

  After the `_benThresholdHit` vars from Task 6, add:
  ```javascript
  const _climaxBranch = ['negotiate', 'deflect', 'refuse', 'auto'][attemptNum % 4] || 'auto';
  let _climaxPhasesSeen   = 0;
  let _antechamberLogged  = false;
  let _climaxComplete     = false;
  ```
  Note: `attemptNum` is a parameter of `runPlaythrough` — use it directly.

- [ ] **Step 3: Add Stage II content probe in the every-10-picks block**

  Inside the `if (picks > 0 && picks % 10 === 0 && picks !== _lastHudProbeAtPick)` block (after D5/D6 from Task 6), add:

  ```javascript
  // D2: Stage II organic probe — antechamber + climax interception
  try {
    const _f = g.flags || {};

    // Antechamber entry screenshot (once)
    if (!_antechamberLogged && _f.stage2_antechamber_started && !_f.stage2_antechamber_done) {
      _antechamberLogged = true;
      await screenshot(page, `${tag}_stage2_antechamber_active_p${picks}`);
      log(`[stage2-antechamber ${tag}] pick=${picks} ACTIVE — sp2=${(g.stageProgress&&g.stageProgress[2])||0} faction_contact=${!!_f.stage2_faction_contact_made}`);
    }

    // Climax phase interception
    if (_f.stage2_climax_started && !_climaxComplete && _climaxPhasesSeen < 5) {
      // Check if we're currently in a climax choice — look for climax-specific choice text
      // Update labels from Step 1 grep results:
      const _BRANCH_LABELS = {
        negotiate: ['negotiate', 'cooperate', 'agree', 'accept'],
        deflect:   ['deflect', 'evade', 'avoid', 'redirect'],
        refuse:    ['refuse', 'confront', 'deny', 'reject'],
        auto:      [] // empty = use normal pick algorithm
      };
      const _branchKeywords = _BRANCH_LABELS[_climaxBranch] || [];

      if (_branchKeywords.length > 0) {
        // Find a visible choice matching the branch keywords
        let _climaxChoice = null;
        for (const kw of _branchKeywords) {
          const _btn = page.locator(`.choice-btn:visible:has-text("${kw}")`).first();
          if (await _btn.isVisible({ timeout: 400 }).catch(() => false)) {
            _climaxChoice = _btn;
            const _label = await _btn.innerText().catch(() => kw);
            log(`[stage2-climax ${tag}] phase=${_climaxPhasesSeen + 1} intercept: branch=${_climaxBranch} choice="${_label.replace(/\n/g,' ').slice(0,60)}"`);
            await screenshot(page, `${tag}_stage2_climax_phase${_climaxPhasesSeen + 1}`);
            await _climaxChoice.click();
            await page.waitForTimeout(PACE.betweenCombat);
            _climaxPhasesSeen++;
            break;
          }
        }
      }

      // Climax complete detection
      if (_f.stage2_climax_complete || _f.maren_oss_resolved) {
        _climaxComplete = true;
        await screenshot(page, `${tag}_stage2_climax_complete`);
        log(`[stage2-climax ${tag}] COMPLETE pick=${picks} flags: climax_complete=${!!_f.stage2_climax_complete} maren_resolved=${!!_f.maren_oss_resolved}`);
      }
    }
  } catch (_) {}
  ```

  > **Update `_BRANCH_LABELS`** with the exact substrings from Step 1 grep. The `has-text("keyword")` Playwright selector does partial match — any word from the choice label works.

- [ ] **Step 4: Commit**
  ```
  git add tests/e2e/playtest-headed.spec.js
  git commit -m "feat(playtest): D2 — Stage II climax organic probe with branch-per-family interception"
  ```

---

### Task 11: D3 + D4 — Ability card click + craft recipe UI probe

**Files:**
- Modify: `tests/e2e/playtest-headed.spec.js:588` — `probeCharSheet`
- Modify: `tests/e2e/playtest-headed.spec.js:681` — `probeCamp`

D3 clicks the first ability card to verify it's interactive (or at least non-crashing). D4 exercises the craft recipe selection UI.

- [ ] **Step 1: Add D3 to `probeCharSheet`**

  In `probeCharSheet`, after the final skill cross-check block (around line 644), before `await closeSpecificOverlay(page, 'overlay-charsheet');`, add:

  ```javascript
  // D3: Ability card click probe
  try {
    const _abilityCard = page.locator('.ability-card').first();
    const _abilVis = await _abilityCard.isVisible({ timeout: 500 }).catch(() => false);
    if (_abilVis) {
      await _abilityCard.click();
      await page.waitForTimeout(PACE.short);
      const _cardTxt   = await _abilityCard.innerText().catch(() => '');
      const _cardObjObj = _cardTxt.includes('[object Object]');
      await screenshot(page, `${tag}_ability_card_p${g.level}`);
      log(`[panel:char-sheet ${tag}] ability-card-click: interactive=true objObj=${_cardObjObj} text="${_cardTxt.slice(0,60).replace(/\n/g,' ')}"`);
    } else {
      log(`[panel:char-sheet ${tag}] ability-card-click: no .ability-card visible`);
    }
  } catch (_) {}
  ```

- [ ] **Step 2: Find craft recipe `data-cid` prefix**

  ```
  grep -n "cid:.*craft_\|'craft_'" content/ledger-of-ash.html 2>/dev/null | head -5 || grep -n "cid.*craft" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -5
  ```
  Confirm the prefix (e.g., `craft_field_ration` → prefix is `craft_`).

- [ ] **Step 3: Add D4 to `probeCamp`**

  In `probeCamp`, find the existing craft block (around line 714–725):
  ```javascript
  if (craftVisible) {
    const craftBtn = ...;
    await craftBtn.click();
    await page.waitForTimeout(PACE.short);
    await screenshot(page, `${tag}_camp_craft_result`);
    const craftTxt = ...;
    log(`[panel:camp ${tag}] craft-result: ...`);
  }
  ```

  Replace the entire `if (craftVisible)` block with the extended version:
  ```javascript
  if (craftVisible) {
    const craftBtn = page.locator('button.camp-action[data-camp="craft"],[data-camp="craft"],#btn-craft').first();
    try {
      // Only attempt craft UI if character is Level 2+ (craft is gated)
      const _lvlForCraft = (g && g.level) || 1;
      await craftBtn.click();
      await page.waitForTimeout(PACE.short);

      // D4: Check for recipe selection UI
      const _recipeCount = await page.locator('.choice-btn[data-cid^="craft_"]').count().catch(() => 0);
      if (_recipeCount > 0 && _lvlForCraft >= 2) {
        await screenshot(page, `${tag}_camp_craft_recipes`);
        log(`[panel:camp ${tag}] craft-recipes=${_recipeCount}`);
        // Click the first recipe choice
        const _firstRecipe = page.locator('.choice-btn[data-cid^="craft_"]').first();
        const _recipeLabel = await _firstRecipe.innerText().catch(() => '?');
        await _firstRecipe.click();
        await page.waitForTimeout(PACE.short);
        const _craftResultTxt = await page.locator('.result-text,.narrative-text').first().innerText().catch(() => '');
        const _craftObjObj    = _craftResultTxt.includes('[object Object]');
        await screenshot(page, `${tag}_camp_craft_recipe_result`);
        log(`[panel:camp ${tag}] craft-recipe-clicked: "${_recipeLabel.slice(0,40)}" result="${_craftResultTxt.slice(0,80).replace(/\n/g,' ')}" objObj=${_craftObjObj}`);
      } else {
        // No recipe selection UI — craft resolved directly
        const craftTxt = await page.locator('#overlay-camp,.result-text,.narrative-text').first().innerText().catch(() => '');
        await screenshot(page, `${tag}_camp_craft_result`);
        log(`[panel:camp ${tag}] craft-result: "${craftTxt.slice(0, 100).replace(/\n/g, ' ')}"`);
      }
    } catch (_err) {
      log(`[panel:camp ${tag}] craft FAIL: ${_err.message}`);
    } finally {
      // Ensure overlay is still closeable
      await closeOverlay(page).catch(() => {});
    }
  }
  ```

- [ ] **Step 4: Commit**
  ```
  git add tests/e2e/playtest-headed.spec.js
  git commit -m "feat(playtest): D3+D4 — ability card click probe + craft recipe UI probe"
  ```

---

### Task 12: sp2 zero-contributor coverage verification

**Files:**
- Read: `tests/e2e/helpers/coverage-tracker.js`
- Conditionally modify: `tests/e2e/helpers/coverage-tracker.js`

Before adding new code, verify whether `CoverageTracker` already emits the sp2-zero-contributor list.

- [ ] **Step 1: Check existing coverage output**

  ```
  grep -n "coverage-gaps\|zero.*sp2\|sp2.*zero\|getSummary\|zeroContrib" tests/e2e/helpers/coverage-tracker.js
  ```
  Also check a recent report:
  ```
  grep "coverage-gaps\|zero-sp2" test-results/playtest-report-*-headless.md 2>/dev/null | head -5
  ```

- [ ] **Step 2: If `[coverage-gaps]` already lists zero-sp2 localities → no change needed**

  Log `"coverage-tracker already emits sp2 zero-contributor list — Task 12 complete, no code change"` and commit nothing.

- [ ] **Step 3: If NOT present → add it to `coverage-tracker.js`**

  In `CoverageTracker`, find the `getSummary()` or equivalent export method. Add:

  ```javascript
  // After existing summary fields
  const zeroSp2Locs = [];
  for (const [loc, data] of Object.entries(this.localityData || {})) {
    if ((data.sp2Contributed || 0) === 0 && (data.visits || 0) > 0) {
      zeroSp2Locs.push(loc);
    }
  }
  // Include in summary:
  summary.zeroSp2Localities = zeroSp2Locs;
  ```

  And in the log output (wherever `[coverage-gaps]` is written), add:
  ```javascript
  if (summary.zeroSp2Localities && summary.zeroSp2Localities.length > 0) {
    log('[stage2-coverage-gaps] zero-sp2-locs: ' + summary.zeroSp2Localities.join(', '));
  }
  ```

- [ ] **Step 4: Commit (only if change was needed)**
  ```
  git add tests/e2e/helpers/coverage-tracker.js
  git commit -m "feat(playtest): add Stage II zero-sp2-contributor locality list to coverage report"
  ```

---

### Task 13: Phase 3+4 verification run

- [ ] **Step 1: Run headed spec**

  ```
  Set-Location "C:\Users\CEO\ledger-of-ash"
  cmd /c "npx playwright test tests/e2e/playtest-headed.spec.js --timeout=10800000 --reporter=line"
  ```

- [ ] **Step 2: Verify D1 — combat probe log**

  ```
  grep "combat-probe.*strike\|combat-probe.*defend\|combat-probe.*DEATH" test-results/full-playthrough-log-headed.md | head -10
  ```
  Expected: `[combat-probe family_arch_a1] strike: hp_before=N hp_after=M` (odd families) and `[combat-probe family_arch_a1] defend: hp_before=N hp_after=M` (even families).

- [ ] **Step 3: Verify D2 — climax probe (if reached)**

  ```
  grep "stage2-climax\|stage2-antechamber" test-results/full-playthrough-log-headed.md | head -10
  ```
  Expected when Stage II is reached: `[stage2-antechamber ...]` and/or `[stage2-climax ...]` entries.

- [ ] **Step 4: Verify D3 — ability card probe**

  ```
  grep "ability-card-click" test-results/full-playthrough-log-headed.md | head -5
  ```
  Expected: `[panel:char-sheet tag] ability-card-click: interactive=true/false objObj=false`

- [ ] **Step 5: Verify D4 — craft recipe probe**

  ```
  grep "craft-recipes\|craft-recipe-clicked" test-results/full-playthrough-log-headed.md | head -5
  ```
  Expected: `[panel:camp tag] craft-recipes=N` (or `craft-result` if no recipe UI).

- [ ] **Step 6: Verify H5 — no regressions**

  ```
  grep "TRIAGE_THIN_STAGE_II\|ceiling-reached\|stage2-stall" test-results/playtest-headless-log.md | head -10
  ```
  On a run that reaches sp2 >= 12: `ceiling-reached`. On a run stalling below 12: `TRIAGE_THIN_STAGE_II` + `max-picks` or `timeout`.

- [ ] **Step 7: Screenshot audit**

  ```
  ls test-results/playthrough-screenshots/headed/ | grep "stage_advance\|alignment_threshold\|combat_probe\|stage2_climax\|ability_card\|craft_recipe"
  ```
  Expected: New screenshot filenames present for each of the above features.
