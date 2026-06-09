# Stage I / Stage II Unblock Sprint — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all Stage I and Stage II blockers so all 4 archetype families can complete Stage II (sp2 > 0, boss fires, antechamber reached) with zero stalls or dead-ends in the full 20-family headed playtest.

**Architecture:** Three phases with a headless gate between Phase 1 and Phase 2. Phase 1 fixes Stage I enriched choice loading (export name mismatch) and engine DC/HUD wiring. Phase 2 investigates and fixes Stage II sp2 advancement, adds the Sera Ironveil boss, and unblocks district navigation. Phase 3 is a parallel polish pass over content quality bugs. Phase 1 and Phase 3 tasks use file-ownership-bounded parallel sub-agents; Phase 2 is sequential because investigation drives later tasks.

**Tech Stack:** Vanilla ES5 JavaScript, Node/Jest unit tests (`tests/logic/`, `tests/content/`), Playwright e2e (`tests/e2e/`), single-file game engine at `ledger-of-ash.html` (18 832 lines), content scripts in `content/`, reference data in `data/reference/`.

---

## File Ownership Map

| Task | Files Modified | Conflicts |
|---|---|---|
| T1 | 6 `content/*_stage1_enriched_choices.js` | none |
| T2–T4 | `ledger-of-ash.html` (3 sections) | T2/T3/T4 share file — run as one sub-agent |
| T5 | `content/travel_corridors.js`, `content/travel_route_data.js` | none |
| T6 | `tests/e2e/helpers/map-travel.js` | none |
| T7 | read-only investigation | none |
| T8 | stage2 content files (determined by T7) | T8 after T7 |
| T9 | `data/bestiary_lookup.js` | none |
| T10 | `content/districts_stage2_enriched_choices.js` | none |
| T11 | `content/districts_stage2_enriched_choices.js`, `content/cosmoria_stage2_enriched_choices.js`, `content/fairhaven_stage2_enriched_choices.js`, `content/guildheart_hub_stage2_enriched_choices.js`, `content/soreheim_proper_stage2_enriched_choices.js` | T10 also touches districts file — run T10 before T11 |
| T12 | same 4 non-district stage2 files | shares with T11 — run T12 as part of T11 sub-agent |
| T13 | `ledger-of-ash.html` | none after T2–T4 committed |
| T14 | `content/ithtananalor_stage2_enriched_choices.js` | none |
| T15 | `data/reference/V33_2_extracted/.../travel_complications/*.md` (7 new files) | none |

---

## PHASE 1 — Stage I Unblock

### Parallel dispatch strategy
- **Sub-agent Alpha:** Task 1 (6 stage1 export renames)
- **Sub-agent Beta:** Tasks 2–4 bundled (all ledger-of-ash.html engine fixes, single file)
- **Sub-agent Gamma:** Tasks 5–6 (dirty files commit + spec rewrite)
- All three run concurrently. Phase 1 gate runs after all three complete.

---

### Task 1: Rename Stage 1 Enriched Choice Exports in 6 Files

**Why:** `_STAGE_TABLE_ALIAS_S1` maps short locality keys (e.g. `soreheim`) to full locality names (e.g. `soreheim_proper`), then computes `SOREHEIM_PROPER_STAGE1_ENRICHED_CHOICES` as the window lookup key. But all 6 content files export with the short stem (`SOREHEIM_STAGE1_ENRICHED_CHOICES`). Result: zero enriched choices loaded → generic pool only → no plot:main advancement → Stage I stall.

**Files:**
- Modify: `content/soreheim_proper_stage1_enriched_choices.js` (last line)
- Modify: `content/mimolot_academy_stage1_enriched_choices.js` (last line)
- Modify: `content/panim_haven_stage1_enriched_choices.js` (last line)
- Modify: `content/sunspire_haven_stage1_enriched_choices.js` (last line)
- Modify: `content/guildheart_hub_stage1_enriched_choices.js` (last line)
- Modify: `content/aurora_crown_commune_stage1_enriched_choices.js` (last line)

- [ ] **Step 1: Verify current export names**

```bash
grep -n "^window\." content/soreheim_proper_stage1_enriched_choices.js | tail -1
grep -n "^window\." content/mimolot_academy_stage1_enriched_choices.js | tail -1
grep -n "^window\." content/panim_haven_stage1_enriched_choices.js | tail -1
grep -n "^window\." content/sunspire_haven_stage1_enriched_choices.js | tail -1
grep -n "^window\." content/guildheart_hub_stage1_enriched_choices.js | tail -1
grep -n "^window\." content/aurora_crown_commune_stage1_enriched_choices.js | tail -1
```

Expected output (each file's last window assignment):
```
NNNN:window.SOREHEIM_STAGE1_ENRICHED_CHOICES = SOREHEIM_PROPER_STAGE1_ENRICHED_CHOICES;
NNNN:window.MIMOLOT_STAGE1_ENRICHED_CHOICES = MIMOLOT_ACADEMY_STAGE1_ENRICHED_CHOICES;
NNNN:window.PANIM_STAGE1_ENRICHED_CHOICES = PANIM_HAVEN_STAGE1_ENRICHED_CHOICES;
NNNN:window.SUNSPIRE_STAGE1_ENRICHED_CHOICES = SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES;
NNNN:window.GUILDHEART_STAGE1_ENRICHED_CHOICES = GUILDHEART_HUB_STAGE1_ENRICHED_CHOICES;
NNNN:window.AURORA_STAGE1_ENRICHED_CHOICES = AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES;
```

NOTE: The internal variable name (RHS) varies per file. Only the `window.*` property name (LHS) needs to change.

- [ ] **Step 2: Rename export in soreheim_proper**

In `content/soreheim_proper_stage1_enriched_choices.js`, find the line:
```js
window.SOREHEIM_STAGE1_ENRICHED_CHOICES = SOREHEIM_PROPER_STAGE1_ENRICHED_CHOICES;
```
Change to:
```js
window.SOREHEIM_PROPER_STAGE1_ENRICHED_CHOICES = SOREHEIM_PROPER_STAGE1_ENRICHED_CHOICES;
```

- [ ] **Step 3: Rename export in mimolot_academy**

In `content/mimolot_academy_stage1_enriched_choices.js`, find and change:
```js
// Before:
window.MIMOLOT_STAGE1_ENRICHED_CHOICES = <internal_var>;
// After:
window.MIMOLOT_ACADEMY_STAGE1_ENRICHED_CHOICES = <internal_var>;
```
(Use the actual internal variable name found in Step 1.)

- [ ] **Step 4: Rename export in panim_haven**

In `content/panim_haven_stage1_enriched_choices.js`:
```js
// Before:
window.PANIM_STAGE1_ENRICHED_CHOICES = <internal_var>;
// After:
window.PANIM_HAVEN_STAGE1_ENRICHED_CHOICES = <internal_var>;
```

- [ ] **Step 5: Rename export in sunspire_haven**

In `content/sunspire_haven_stage1_enriched_choices.js`:
```js
// Before:
window.SUNSPIRE_STAGE1_ENRICHED_CHOICES = <internal_var>;
// After:
window.SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES = <internal_var>;
```

- [ ] **Step 6: Rename export in guildheart_hub**

In `content/guildheart_hub_stage1_enriched_choices.js`:
```js
// Before:
window.GUILDHEART_STAGE1_ENRICHED_CHOICES = <internal_var>;
// After:
window.GUILDHEART_HUB_STAGE1_ENRICHED_CHOICES = <internal_var>;
```

- [ ] **Step 7: Rename export in aurora_crown_commune**

In `content/aurora_crown_commune_stage1_enriched_choices.js`:
```js
// Before:
window.AURORA_STAGE1_ENRICHED_CHOICES = <internal_var>;
// After:
window.AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES = <internal_var>;
```

- [ ] **Step 8: Verify the HTML script tag references these files**

```bash
grep -n "soreheim_proper_stage1\|mimolot_academy_stage1\|panim_haven_stage1\|sunspire_haven_stage1\|guildheart_hub_stage1\|aurora_crown_commune_stage1" ledger-of-ash.html
```

Expected: 6 `<script src="content/...">` lines. If any are missing, add them in the content script block near lines 18220–18322.

- [ ] **Step 9: Run content wiring test**

```bash
npm run test:content
```

Expected: PASS (no missing script tags, no window export errors).

- [ ] **Step 10: Commit**

```bash
git add content/soreheim_proper_stage1_enriched_choices.js content/mimolot_academy_stage1_enriched_choices.js content/panim_haven_stage1_enriched_choices.js content/sunspire_haven_stage1_enriched_choices.js content/guildheart_hub_stage1_enriched_choices.js content/aurora_crown_commune_stage1_enriched_choices.js
git commit -m "fix(content): rename stage1 enriched choice exports to match engine lookup keys — 6 locality files"
```

---

### Tasks 2–4: Engine Mechanics Fixes (Single Sub-Agent, ledger-of-ash.html)

**Why these are bundled:** All three tasks modify `ledger-of-ash.html` in non-overlapping sections. One sub-agent handles all three sequentially to avoid merge conflicts.

**Files:**
- Modify: `ledger-of-ash.html` (lines ~11520 `adaptEnrichedChoice`, ~11494 `getChoiceDC`, ~10063 `advanceTime`, ~9998 `_authorityResolveDetention`, ~14965 `campAction`, ~15385 `startTravel`)

#### Sub-task 2: Null-guard undefined labels in adaptEnrichedChoice

**Why:** `choice.label.charAt(0)` throws `Cannot read properties of undefined` when `choice.label` is not set. This crashed classic-combat ranger at Shelkopolis pick=23. The guard must also log which choice object is missing a label so the content bug can be traced.

- [ ] **Step 2.1: Find adaptEnrichedChoice in ledger-of-ash.html**

```bash
grep -n "function adaptEnrichedChoice" ledger-of-ash.html
```

Expected: one line around 11520.

- [ ] **Step 2.2: Find the label access line**

Read lines around `adaptEnrichedChoice`. Find where `c.label` is first read (likely to build the button text or pass to `renderChoices`). The goal is to add the null-guard at the very top of the function body.

- [ ] **Step 2.3: Add null-guard at top of adaptEnrichedChoice**

Insert immediately after the opening `{` of `adaptEnrichedChoice`:

```js
function adaptEnrichedChoice(c) {
  // Null-guard: choices missing label will log their full object for triage
  if (!c.label && !c.text) {
    console.error('[enriched] choice missing label — check content file:', JSON.stringify(c).slice(0, 200));
    c.label = 'Continue...';
  } else if (!c.label && c.text) {
    c.label = c.text;
  }
  // ... rest of existing function body unchanged
```

- [ ] **Step 2.4: Search for other .charAt calls on choice labels**

```bash
grep -n "\.charAt" ledger-of-ash.html | head -30
```

For each occurrence that reads from `c.label` or `choice.label`, add `|| ''` before the `.charAt` call:
```js
// Pattern to guard:
var first = (c.label || '').charAt(0).toUpperCase();
```

- [ ] **Step 2.5: Verify no new errors introduced**

```bash
npm test
```

Expected: all Jest unit tests pass.

#### Sub-task 3: Wire _alignmentDCPenalty and watchfulness DC into getChoiceDC()

**Why:** `_alignmentDCPenalty` (0–2, set by `_applyAlignmentDCModifier()`) and watchfulness DC penalty (0–3, computed in legacy roll path at line ~12950) are both calculated but not applied to enriched-choice DC rolls. Both should apply universally.

- [ ] **Step 3.1: Find getChoiceDC in ledger-of-ash.html**

```bash
grep -n "function getChoiceDC" ledger-of-ash.html
```

Expected: one line around 11494.

- [ ] **Step 3.2: Read the current return statement**

Current return (approximately lines 11494–11501):
```js
return effectiveDC + stageBonus + levelBonus + (rivalMod || 0) - ((G && G._pendingDcReduce) || 0);
```

- [ ] **Step 3.3: Replace the return with penalty-aware version**

```js
var _wlvl = (G && G.worldClocks && G.worldClocks.watchfulness) || 0;
var _watchPenalty = _wlvl >= 7 ? 3 : _wlvl >= 5 ? 2 : _wlvl >= 3 ? 1 : 0;
var _alignPenalty = (G && G._alignmentDCPenalty) || 0;
return effectiveDC + stageBonus + levelBonus + (rivalMod || 0) 
  - ((G && G._pendingDcReduce) || 0) 
  + _watchPenalty + _alignPenalty;
```

- [ ] **Step 3.4: Write a unit test for the new penalty logic**

In `tests/logic/` create `tests/logic/dc-penalties.test.js`:
```js
const { createGameContext } = require('../setup');

describe('getChoiceDC — alignment and watchfulness penalties', () => {
  test('no penalty when neutral and zero watchfulness', () => {
    const { G, getChoiceDC } = createGameContext({ benevolence: 0, orderAxis: 0 });
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.watchfulness = 0;
    G._alignmentDCPenalty = 0;
    expect(getChoiceDC({ dc: 13 }, 0)).toBe(13);
  });

  test('watchfulness >= 3 adds +1 DC', () => {
    const { G, getChoiceDC } = createGameContext({});
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.watchfulness = 3;
    G._alignmentDCPenalty = 0;
    expect(getChoiceDC({ dc: 13 }, 0)).toBe(14);
  });

  test('watchfulness >= 5 adds +2 DC', () => {
    const { G, getChoiceDC } = createGameContext({});
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.watchfulness = 5;
    G._alignmentDCPenalty = 0;
    expect(getChoiceDC({ dc: 13 }, 0)).toBe(15);
  });

  test('watchfulness >= 7 adds +3 DC', () => {
    const { G, getChoiceDC } = createGameContext({});
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.watchfulness = 7;
    G._alignmentDCPenalty = 0;
    expect(getChoiceDC({ dc: 13 }, 0)).toBe(16);
  });

  test('alignment penalty stacks with watchfulness', () => {
    const { G, getChoiceDC } = createGameContext({});
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.watchfulness = 3;
    G._alignmentDCPenalty = 2;
    expect(getChoiceDC({ dc: 13 }, 0)).toBe(16);
  });
});
```

- [ ] **Step 3.5: Run failing test**

```bash
npx jest tests/logic/dc-penalties.test.js -v
```

Expected: FAIL (tests not passing before fix is confirmed wired).

- [ ] **Step 3.6: Run test after implementing fix**

```bash
npx jest tests/logic/dc-penalties.test.js -v
```

Expected: all 5 tests PASS.

#### Sub-task 4: Add updateEnvironmentPanel() to advanceTime() and 3 partial functions

**Why:** `advanceTime()` calls `updateHUD()` but not `updateEnvironmentPanel()`. Same gap in `_authorityResolveDetention()`, `campAction('lay_low')`, and `startTravel()`. The env-pill (locality description in the sidebar) desynchronizes when time advances.

- [ ] **Step 4.1: Locate all 4 functions**

```bash
grep -n "function advanceTime\|function _authorityResolveDetention\|function startTravel" ledger-of-ash.html
grep -n "'lay_low'" ledger-of-ash.html | head -5
```

- [ ] **Step 4.2: Patch advanceTime()**

Find the `updateHUD()` call inside `advanceTime()` (around line 10113). Add `updateEnvironmentPanel()` immediately after:

```js
// Inside advanceTime() — find the existing updateHUD() call and add after it:
updateHUD();
updateEnvironmentPanel();
```

- [ ] **Step 4.3: Patch _authorityResolveDetention()**

At the end of `_authorityResolveDetention()` (around line 9998–10005), add before the closing `}`:

```js
updateHUD();
updateEnvironmentPanel();
```

- [ ] **Step 4.4: Patch campAction lay_low branch**

In the `'lay_low'` case inside `campAction()` (around line 14965–14989), after the existing `updateHUD()` call, add:

```js
updateEnvironmentPanel();
```

- [ ] **Step 4.5: Patch startTravel()**

In `startTravel()` (around line 15385–15413), after the existing `updateHUD()` call, add:

```js
updateEnvironmentPanel();
```

- [ ] **Step 4.6: Run tests**

```bash
npm test
```

Expected: all Jest unit tests pass (no regressions).

- [ ] **Step 4.7: Commit all engine fixes (Tasks 2–4 together)**

```bash
git add ledger-of-ash.html tests/logic/dc-penalties.test.js
git commit -m "fix(engine): null-guard undefined choice labels; wire alignmentDCPenalty + watchfulness DC into getChoiceDC(); add updateEnvironmentPanel to advanceTime/detain/layLow/startTravel"
```

---

### Task 5: Review and Commit Dirty Travel Files

**Why:** `content/travel_corridors.js` and `content/travel_route_data.js` add 7 new bidirectional Shelkopolis spoke routes. These were staged but never committed.

**Files:**
- Review + commit: `content/travel_corridors.js`
- Review + commit: `content/travel_route_data.js`

- [ ] **Step 5.1: Review the diff**

```bash
git diff content/travel_corridors.js
git diff content/travel_route_data.js
```

Verify: 7 new routes are added symmetrically (both directions: `X|shelkopolis` and `shelkopolis|X`) for: `ithtananalor`, `shirshal`, `guildheart_hub`, `mimolot_academy`, `panim_haven`, `sunspire_haven`, `soreheim_proper`.

Each TRAVEL_ROUTES entry must have: `tier`, `biome`, `foot`, `horse`, `cart` (boat=0 for overland routes, non-zero for coastal).

Each ROUTE_SPATIAL_DATA entry must have: `route_note` (flavor string), `biomes` (array), `allowed_modes` (array), and be accessible via `ROUTE_SPATIAL_DATA.get(fromId, toId)`.

- [ ] **Step 5.2: Verify bidirectional symmetry**

```bash
grep "shelkopolis" content/travel_corridors.js | grep -c "ithtananalor\|shirshal\|guildheart_hub\|mimolot_academy\|panim_haven\|sunspire_haven\|soreheim_proper"
```

Expected: 14 (7 routes × 2 directions each).

- [ ] **Step 5.3: Run content test**

```bash
npm run test:content
```

Expected: PASS.

- [ ] **Step 5.4: Commit travel data files**

```bash
git add content/travel_corridors.js content/travel_route_data.js
git commit -m "feat(travel): add 7 Shelkopolis spoke routes — ithtananalor/shirshal/guildheart_hub/mimolot_academy/panim_haven/sunspire_haven/soreheim_proper"
```

---

### Task 6: Review and Commit Organic Map-Travel Spec Rewrite

**Why:** The old `map-travel.js` bypassed the travel overlay via `page.evaluate(_travelCoreTravelTo)`. After travel, the spec tried `nth(N)` for non-combat choices, but combat arrivals only have 5 buttons and journey overlays only have 1. The rewrite uses the organic map UI (click `.map-travel-btn`, pick mode, pick pack, run 60-iteration journey loop, handle combat and rest mid-journey).

**Files:**
- Review + commit: `tests/e2e/helpers/map-travel.js`

- [ ] **Step 6.1: Review the diff**

```bash
git diff tests/e2e/helpers/map-travel.js
```

Verify: 
- `openMapAndTravel(page, destId)` opens map via `.map-travel-btn`
- Selects first non-disabled `.overlay-mode-btn`
- Selects `.overlay-pack-btn`
- Runs journey loop: up to 60 iterations of `#journey-choice-area` picks
- Handles in-journey combat (`.choice-btn` with combat text)
- Handles HP < 40% → triggers camp rest
- Falls back to `_travelCoreTravelTo` only if mode buttons are absent or cap hit

- [ ] **Step 6.2: Verify fallback doesn't bypass organic flow prematurely**

The fallback `_travelCoreTravelTo` should only fire when the mode selection step fails (no mode buttons at all), not on first try. Check that the fallback is inside an `else` or `catch` block, not the primary path.

- [ ] **Step 6.3: Run the spec in headless mode**

```bash
npm run test:e2e -- --grep "map-travel" 2>&1 | tail -20
```

Expected: map-travel helper runs without timeout errors.

- [ ] **Step 6.4: Commit**

```bash
git add tests/e2e/helpers/map-travel.js
git commit -m "fix(spec): organic map-travel rewrite — 60-iter journey loop, combat handling, HP-gated rest, no bypass"
```

---

### Phase 1 Gate: Headless Spec Run

- [ ] **Run headless spec for all 4 families**

```bash
npm run test:e2e 2>&1 | tail -40
```

Pass criteria:
- All 4 families reach sp1=15+
- Stage I boss fires (boss_started=true in s2-probe)
- Stage II unlocks (stage=Stage II in G probe)
- Zero stall-timeout failures in Stage I
- Zero charAt errors in JS errors block

If any family still stalls in Stage I: **do not proceed to Phase 2**. Diagnose and fix the specific stall before continuing.

---

## PHASE 2 — Stage II Investigation + Unblock

### Task 7: Investigate Stage II sp2=0

**Why:** 3 families reached Stage II in the last run but all showed sp2=0. `G.stageProgress[2]` (sp2) must reach 10+ for antechamber, 12+ for climax trigger. Either the sp2 increment mechanism isn't wired in Stage II enriched choices, or the content doesn't have enough `plot:main` choices to reach sp2=10.

**Files:**
- Read-only: `ledger-of-ash.html` (maybeStageAdvance, loadStageChoices, adaptEnrichedChoice)
- Read-only: `content/shelkopolis_stage2_enriched_choices.js` (most visited Stage II locality)
- Read-only: `content/fairhaven_stage2_enriched_choices.js`
- Read-only: `content/stage2_enriched_choices.js` (generic Stage II pool)

- [ ] **Step 7.1: Find maybeStageAdvance**

```bash
grep -n "function maybeStageAdvance\|investigationProgress" ledger-of-ash.html | head -20
```

Document: How does sp2 increment? Does `maybeStageAdvance()` sync `G.investigationProgress` to `G.stageProgress[2]`? Or does `adaptEnrichedChoice` increment sp2 directly for plot:main choices?

- [ ] **Step 7.2: Count plot:main choices in shelkopolis Stage 2**

```bash
grep -c "plot.*main\|'main'" content/shelkopolis_stage2_enriched_choices.js
```

If count < 10, content is insufficient. If count >= 10, wiring is the likely issue.

- [ ] **Step 7.3: Check if fn() bodies call maybeStageAdvance or increment investigationProgress**

```bash
grep -n "maybeStageAdvance\|investigationProgress" content/shelkopolis_stage2_enriched_choices.js | head -20
grep -n "maybeStageAdvance\|investigationProgress" content/stage2_enriched_choices.js | head -20
```

If no occurrences: the choices run their fn() but never advance Stage II progress. This is the wiring bug.

- [ ] **Step 7.4: Report findings**

Write a 5-line diagnosis to console (or as a comment block at the top of Task 8 if fixing inline):
- Is sp2 increment missing from all Stage II fn() bodies?
- Is sp2 increment present in some but not all?
- Is content volume sufficient (≥10 plot:main choices per major locality)?
- What is the correct wiring call (maybeStageAdvance vs direct increment)?

---

### Task 8: Fix Stage II sp2 Wiring (and Expand Content If Needed)

**Prerequisite:** Task 7 complete.

**Files (determined by Task 7):**
- Likely modify: `content/shelkopolis_stage2_enriched_choices.js`
- Likely modify: `content/fairhaven_stage2_enriched_choices.js`
- Likely modify: `content/stage2_enriched_choices.js`
- Possibly modify: other locality Stage 2 files
- Possibly: add new plot:main choices if content is insufficient

- [ ] **Step 8.1: Apply the wiring fix to all Stage II fn() bodies missing sp2 increment**

If the diagnosis from Task 7 shows that fn() bodies don't call the progression mechanism, add the call to every `plot:'main'` choice's `fn:` body. The correct call is either:

```js
// Option A — if maybeStageAdvance() syncs investigationProgress:
fn: function() {
  G.investigationProgress = (G.investigationProgress || 0) + 1;
  maybeStageAdvance();
  // ... rest of choice logic
}
```

OR:

```js
// Option B — if stageProgress[2] is incremented directly:
fn: function() {
  G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
  checkStageAdvance();
  // ... rest of choice logic
}
```

Use whichever pattern the existing working Stage II choices use. If no working examples exist, use the pattern that Stage I plot:main choices use and adapt for Stage 2.

- [ ] **Step 8.2: Count sp2-advancing choices per major Stage II locality**

After wiring fix, count how many Stage II choices will increment sp2 per locality. Target: at least 12 per locality (need sp2=10 for antechamber, plus buffer for failed rolls). Localities that need content:

```bash
for f in content/*_stage2_enriched_choices.js; do
  echo "$f: $(grep -c "plot.*main\|plot: 'main'" $f) plot:main choices"
done
```

- [ ] **Step 8.3: Author additional plot:main choices if needed**

If any of the 4 primary Stage II localities (shelkopolis, fairhaven, guildheart_hub, soreheim_proper) has fewer than 12 plot:main choices after wiring, author new choices following the content standards:

Content standards (from CLAUDE.md):
- Label: ≤15 words, no question marks, no infinitive verbs (`To ...`, `Ask ...`, `Check ...`)
- Result text: 60–90 words (ideal), ≤120 max
- Forbidden words: `investigation`, `meaningful`, `you feel`, `you realize`, `you sense`, `official`, `contact` (as person noun)
- Must include `plot: 'main'` and the sp2-incrementing `fn:` body

Example Stage II choice:
```js
{
  id: 'shelk_s2_shipping_manifest_gap',
  label: 'Three separate clerks cited the same missing manifest entry.',
  plot: 'main',
  tag: 'risky',
  skill: 'wits',
  roll: { dc: 14 },
  fn: function() {
    G.investigationProgress = (G.investigationProgress || 0) + 1;
    maybeStageAdvance();
    addNarration('Manifest Gap',
      'The manifest entry doesn\'t exist in any of the three ledger copies — but the routing records show a shipment moving through the gap. Someone removed the paperwork after the fact. The timing lines up with the directive restricting eastern gate access.',
      'success');
    addJournal('Shelk shipping manifest — three entries removed post-transit', 'evidence', 'shelk_s2_manifest_gap');
  },
  failResult: function() {
    addNarration('Manifest Gap',
      'The clerks can\'t agree on which ledger version is authoritative. The discrepancy is real, but without a reference copy you can\'t establish the removal timeline. You file the pattern and keep moving.',
      'failure');
  }
}
```

- [ ] **Step 8.4: Run content validator**

```bash
npm run test:content
```

Expected: PASS. Fix any label/word violations before committing.

- [ ] **Step 8.5: Commit**

```bash
git add content/shelkopolis_stage2_enriched_choices.js content/fairhaven_stage2_enriched_choices.js content/stage2_enriched_choices.js
# Add any other modified files
git commit -m "fix(stage2): wire sp2 investigationProgress increment in plot:main fn() bodies; expand Stage II choices to reach antechamber threshold"
```

---

### Task 9: Build marshal_sera_ironveil Bestiary Entry

**Why:** `[startCombat] unknown enemy key: marshal_sera_ironveil` crashed Warlord Stage II run. Sera Ironveil is the Roadwardens leader — Stage II miniboss. Needs a full stat block.

**Files:**
- Modify: `data/bestiary_lookup.js`

- [ ] **Step 9.1: Check existing bestiary format**

```bash
head -40 data/bestiary_lookup.js
```

Note the exact schema (fields: `name`, `hp`, `maxHp`, `def`, `power`, `xpReward`, `goldReward`, `description`, `abilities` or `specialAttacks`, `isBoss`, etc.).

- [ ] **Step 9.2: Check V33_2 canon for Sera Ironveil**

```bash
grep -rl "Sera Ironveil\|Ironveil" data/reference/V33_2_extracted/ | head -5
```

Read the relevant file to get: role, faction, known abilities, personality. She is LEADER OF THE ROADWARDENS, Roadwardens Central Command, Shelkopolis.

- [ ] **Step 9.3: Add marshal_sera_ironveil to bestiary**

Add to `data/bestiary_lookup.js` following the exact schema found in Step 9.1. As Stage II miniboss she should be harder than Stage I enemies:

```js
'marshal_sera_ironveil': {
  name: 'Marshal Sera Ironveil',
  hp: 52,
  maxHp: 52,
  def: 9,
  power: 8,
  xpReward: 120,
  goldReward: 0,
  isBoss: true,
  description: 'Commander of the Roadwardens\' Shelkopolis operations. Disciplined, precise, authoritative. She does not fight unless cornered — and when cornered, she fights to end it.',
  // Add abilities/attacks in whatever format other boss entries use
}
```

Adjust stats to match the bestiary format exactly. If the schema uses `attacks: [...]` instead of `power`, use that format.

- [ ] **Step 9.4: Verify startCombat can resolve the key**

```bash
grep -n "marshal_sera_ironveil\|BESTIARY\|bestiary_lookup" ledger-of-ash.html | head -10
```

Confirm the bestiary is loaded via `<script src="data/bestiary_lookup.js">` in the HTML.

- [ ] **Step 9.5: Commit**

```bash
git add data/bestiary_lookup.js
git commit -m "feat(bestiary): add marshal_sera_ironveil — Stage II miniboss Roadwarden commander"
```

---

### Task 10: Wire 7 Canon Districts into DISTRICTS_STAGE2_CHOICES

**Why:** `DISTRICTS_STAGE2_CHOICES` only maps 9 synthetic pool district types. The 7 canon district locality IDs (aurora_heights, ironspool_ward, verdant_row, granary_steps, iron_ledger_ward, reckoning_quarter, scriptorium_steps) are not in this map. Their choice arrays ARE authored. The `enterDistrict` injection already handles navigation; this task makes their choices accessible.

**Files:**
- Modify: `content/districts_stage2_enriched_choices.js` (~line 2313)

- [ ] **Step 10.1: Confirm district choice arrays exist**

```bash
grep -n "AURORA_HEIGHTS_STAGE2\|IRONSPOOL_WARD_STAGE2\|VERDANT_ROW_STAGE2\|GRANARY_STEPS_STAGE2\|IRON_LEDGER_WARD_STAGE2\|RECKONING_QUARTER_STAGE2\|SCRIPTORIUM_STEPS_STAGE2" content/districts_stage2_enriched_choices.js | head -20
```

Expected: Each array declared (7 results).

- [ ] **Step 10.2: Find DISTRICTS_STAGE2_CHOICES map**

```bash
grep -n "DISTRICTS_STAGE2_CHOICES" content/districts_stage2_enriched_choices.js
```

Find the object definition around line 2313.

- [ ] **Step 10.3: Add the 7 canon district entries to the map**

In `content/districts_stage2_enriched_choices.js`, in the `DISTRICTS_STAGE2_CHOICES` object, add (after the existing entries):

```js
// Canon districts — Shelkopolis
'shelkopolis_aurora_heights':  AURORA_HEIGHTS_STAGE2_ENRICHED_CHOICES,
'shelkopolis_ironspool_ward':  IRONSPOOL_WARD_STAGE2_ENRICHED_CHOICES,
'shelkopolis_verdant_row':     VERDANT_ROW_STAGE2_ENRICHED_CHOICES,
'shelkopolis_granary_steps':   GRANARY_STEPS_STAGE2_ENRICHED_CHOICES,
'shelkopolis_iron_ledger_ward':IRON_LEDGER_WARD_STAGE2_ENRICHED_CHOICES,
'shelkopolis_reckoning_quarter':RECKONING_QUARTER_STAGE2_ENRICHED_CHOICES,
'shelkopolis_scriptorium_steps':SCRIPTORIUM_STEPS_STAGE2_ENRICHED_CHOICES,
```

NOTE: Use the exact district locality IDs that `enterDistrict` produces when navigating from Shelkopolis. Verify the IDs by searching for `enterDistrict` calls:

```bash
grep -n "enterDistrict\|aurora_heights\|ironspool_ward" ledger-of-ash.html | head -20
```

Match the IDs exactly to what `enterDistrict` passes as the locality parameter.

- [ ] **Step 10.4: Verify window export includes the updated map**

```bash
grep -n "window.DISTRICTS_STAGE2_CHOICES\|DISTRICTS_STAGE2_CHOICES =" content/districts_stage2_enriched_choices.js | tail -3
```

Confirm the window assignment is at the end of the file and covers the newly added entries.

- [ ] **Step 10.5: Run content test**

```bash
npm run test:content
```

Expected: PASS.

- [ ] **Step 10.6: Commit**

```bash
git add content/districts_stage2_enriched_choices.js
git commit -m "fix(content): wire 7 canon Shelkopolis districts into DISTRICTS_STAGE2_CHOICES — aurora_heights/ironspool_ward/verdant_row/granary_steps/iron_ledger_ward/reckoning_quarter/scriptorium_steps"
```

---

## PHASE 3 — Polish (Parallel Sub-Agents)

### Parallel dispatch strategy
- **Sub-agent Delta:** Task 11 + Task 12 (same files — level-scaling bonus + spirit/craft fix, bundled)
- **Sub-agent Epsilon:** Task 13 (useUtilitySkill, ledger-of-ash.html only)
- **Sub-agent Zeta:** Task 14 (ithtananalor wiring bugs)
- **Sub-agent Eta:** Task 15 (route complication content, no code)
- All four run concurrently.

---

### Tasks 11 + 12: Remove Level-Scaling Bonus and Fix spirit/craft Mismatch (Bundled)

**Why:** 44 occurrences of `Math.floor(G.level/3)` passed as a bonus to `rollD20()` in stage2 content files double-counts level (engine DC already scales with level). The `rollD20('spirit', G.skills.craft||0)` pattern passes `craft` (always 0) as the skill bonus for spirit rolls — seven occurrences across 4 files.

**Files:**
- Modify: `content/districts_stage2_enriched_choices.js`
- Modify: `content/cosmoria_stage2_enriched_choices.js`
- Modify: `content/fairhaven_stage2_enriched_choices.js`
- Modify: `content/guildheart_hub_stage2_enriched_choices.js`
- Modify: `content/soreheim_proper_stage2_enriched_choices.js`

- [ ] **Step 11.1: Find all level-scaling bonus occurrences**

```bash
grep -rn "Math.floor(G.level/3)" content/
```

Expected: ~44 occurrences across the files listed above.

- [ ] **Step 11.2: Remove level-scaling bonus from all rollD20 calls**

For each occurrence of the pattern:
```js
const result = rollD20('might', (G.skills.might || 0) + Math.floor(G.level/3));
```
Change to:
```js
const result = rollD20('might', (G.skills.might || 0));
```

The `Math.floor(G.level/3)` term is the only thing to remove. Keep the skill bonus expression intact.

Do this for ALL 44 occurrences across all affected files.

- [ ] **Step 11.3: Verify all instances removed**

```bash
grep -rn "Math.floor(G.level/3)" content/
```

Expected: 0 results.

- [ ] **Step 12.1: Find all spirit/craft mismatch occurrences**

```bash
grep -rn "rollD20('spirit', G.skills.craft" content/
```

Expected: 7 occurrences in cosmoria (2), fairhaven (1), guildheart_hub (2), soreheim_proper (2).

- [ ] **Step 12.2: Fix each spirit/craft mismatch**

For each occurrence:
```js
// Before:
const result = rollD20('spirit', G.skills.craft || 0);
// After:
const result = rollD20('spirit', G.skills.spirit || 0);
```

The fix passes the matching skill bonus for the skill being rolled. `craft` is an internal-only skill with no player value (always 0 or undefined).

- [ ] **Step 12.3: Verify all instances fixed**

```bash
grep -rn "rollD20('spirit', G.skills.craft" content/
```

Expected: 0 results.

- [ ] **Step 12.4: Run content validator**

```bash
npm run test:content
```

Expected: PASS.

- [ ] **Step 12.5: Commit**

```bash
git add content/districts_stage2_enriched_choices.js content/cosmoria_stage2_enriched_choices.js content/fairhaven_stage2_enriched_choices.js content/guildheart_hub_stage2_enriched_choices.js content/soreheim_proper_stage2_enriched_choices.js
git commit -m "fix(content): remove Math.floor(G.level/3) bonus from all rollD20 calls (44 occurrences); fix rollD20('spirit', craft) → rollD20('spirit', spirit) in 4 stage2 files"
```

---

### Task 13: Fix useUtilitySkill() — Direct Application, No Roll

**Why:** Design intent: active traits apply their effect directly, no activation roll. Current `useUtilitySkill()` gates the effect on a d20 DC-10 roll. Remove the roll; apply `utilityResult` unconditionally.

**Files:**
- Modify: `ledger-of-ash.html` (~lines 18366–18385)

- [ ] **Step 13.1: Find useUtilitySkill**

```bash
grep -n "function useUtilitySkill" ledger-of-ash.html
```

- [ ] **Step 13.2: Read the current implementation (~15 lines)**

Read lines 18366–18385. Current structure is approximately:
```js
function useUtilitySkill(skillId) {
  var trait = G.traits.find(function(t) { return t.id === skillId; });
  if (!trait) return;
  var r = rollD20(trait.skill || 'wits', (trait.bonus || 0) + (G.skills[trait.skill] || 0));
  var utilityResult = trait.utilityResult || 'The ability takes effect.';
  if (r.total >= 10) {
    addNarration('Ability Used', utilityResult, 'success');
  } else {
    addNarration('Ability Used', 'The ability fizzles.', 'failure');
  }
}
```

- [ ] **Step 13.3: Replace with direct-application version**

Replace the body of `useUtilitySkill`:
```js
function useUtilitySkill(skillId) {
  var trait = G.traits.find(function(t) { return t.id === skillId; });
  if (!trait) return;
  var utilityResult = trait.utilityResult || 'The ability takes effect.';
  addNarration('Ability Used', utilityResult, 'success');
  // Apply any mechanical effect directly
  if (trait.hpRestore) {
    modHP(trait.hpRestore);
  }
  if (trait.dcReduce) {
    G._pendingDcReduce = (G._pendingDcReduce || 0) + trait.dcReduce;
  }
  updateHUD();
}
```

NOTE: If the existing function body handles additional effect types not shown above (check the actual code), preserve all mechanical application logic. Only remove the `rollD20` call and the success/failure branch. Every effect that was applied on success should now apply unconditionally.

- [ ] **Step 13.4: Write unit test**

In `tests/logic/utility-skill.test.js`:
```js
const { createGameContext } = require('../setup');

describe('useUtilitySkill — direct application', () => {
  test('applies utilityResult without rolling', () => {
    const { G, useUtilitySkill, narrations } = createGameContext({ level: 3 });
    G.traits = [{
      id: 'test_utility',
      skill: 'wits',
      bonus: 2,
      utilityResult: 'You sense hidden patterns in the data.'
    }];
    useUtilitySkill('test_utility');
    expect(narrations.some(n => n.includes('You sense hidden patterns'))).toBe(true);
  });

  test('does not add failure narration', () => {
    const { G, useUtilitySkill, narrations } = createGameContext({});
    G.traits = [{ id: 'fizzle_test', utilityResult: 'Works.' }];
    useUtilitySkill('fizzle_test');
    expect(narrations.some(n => n.includes('fizzles'))).toBe(false);
  });
});
```

- [ ] **Step 13.5: Run tests**

```bash
npx jest tests/logic/utility-skill.test.js -v
```

Expected: both tests PASS.

- [ ] **Step 13.6: Commit**

```bash
git add ledger-of-ash.html tests/logic/utility-skill.test.js
git commit -m "fix(engine): useUtilitySkill — remove d20 activation roll; apply trait effects directly per design intent"
```

---

### Task 14: Fix Ithtananalor Stage 2 Wiring Bugs

**Why:** Three distinct bugs in `content/ithtananalor_stage2_enriched_choices.js`:
1. `G.worldClocks.pressure++` at line ~349 — bare increment, undefined++ = NaN
2. `loadStageChoices(G.location)` inside `fn:` bodies at lines ~1019 and ~1050 — bypasses engine's 800ms re-render cycle
3. Three `addJournal` calls missing third argument (dedupeKey) at lines ~268, 295, 323 — spams journal on repeated picks

**Files:**
- Modify: `content/ithtananalor_stage2_enriched_choices.js`

- [ ] **Step 14.1: Fix pressure++ null-guard**

Find line ~349:
```js
// Before:
if (G.investigationProgress === 5) G.worldClocks.pressure++;
// After:
if (G.investigationProgress === 5) {
  G.worldClocks = G.worldClocks || {};
  G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
}
```

- [ ] **Step 14.2: Remove loadStageChoices from fn() bodies**

Find lines ~1019 and ~1050. Each occurrence is inside a failure branch of an `if (roll.total >= 13)` check. Remove the `loadStageChoices(G.location)` call — the engine's `adaptEnrichedChoice` wrapper already handles re-rendering choices after 800ms in the catch path.

Before:
```js
} else {
  addNarration('...', '...', 'failure');
  loadStageChoices(G.location);  // REMOVE THIS LINE
}
```
After:
```js
} else {
  addNarration('...', '...', 'failure');
}
```

- [ ] **Step 14.3: Add dedupeKeys to 3 addJournal calls**

Find the 3 calls at lines ~268, 295, 323 that have only 2 arguments. Add a unique dedupeKey as the 3rd argument:

```js
// Line ~268 — before:
addJournal('Ivena filed a discrepancy report — returned without routing, marked resolved', 'evidence');
// After:
addJournal('Ivena filed a discrepancy report — returned without routing, marked resolved', 'evidence', 'ith_s2_ivena_discrepancy');

// Line ~295 — before:
addJournal('Foundry night manifest — ...', 'evidence');
// After:
addJournal('Foundry night manifest — ...', 'evidence', 'ith_s2_foundry_manifest');

// Line ~323 — before:
addJournal('Administrative wing archive accessed without escort — two-hour window', 'discovery');
// After:
addJournal('Administrative wing archive accessed without escort — two-hour window', 'discovery', 'ith_s2_archive_access');
```

- [ ] **Step 14.4: Run tests**

```bash
npm test
```

Expected: all Jest tests pass.

- [ ] **Step 14.5: Commit**

```bash
git add content/ithtananalor_stage2_enriched_choices.js
git commit -m "fix(content): ithtananalor stage2 — null-guard pressure++; remove loadStageChoices from fn(); add dedupeKeys to 3 addJournal calls"
```

---

### Task 15: Author 7 Shelkopolis Spoke Route Complication Files

**Why:** 7 new routes from `content/travel_corridors.js` (committed in Task 5) have no complication flavor files. Routes function without them, but the travel complication system pulls from these files for encounter flavor. Reference existing files for format.

**Files:**
- Create: `data/reference/V33_2_extracted/V33_2_DnD_Repository/12_TABLE_KITS/travel_complications/ithtananalor_shelkopolis_road_travel_complication.md`
- Create: `data/reference/V33_2_extracted/V33_2_DnD_Repository/12_TABLE_KITS/travel_complications/shirshal_shelkopolis_road_travel_complication.md`
- Create: `data/reference/V33_2_extracted/V33_2_DnD_Repository/12_TABLE_KITS/travel_complications/guildheart_hub_shelkopolis_road_travel_complication.md`
- Create: `data/reference/V33_2_extracted/V33_2_DnD_Repository/12_TABLE_KITS/travel_complications/mimolot_academy_shelkopolis_road_travel_complication.md`
- Create: `data/reference/V33_2_extracted/V33_2_DnD_Repository/12_TABLE_KITS/travel_complications/panim_haven_shelkopolis_road_travel_complication.md`
- Create: `data/reference/V33_2_extracted/V33_2_DnD_Repository/12_TABLE_KITS/travel_complications/sunspire_haven_shelkopolis_road_travel_complication.md`
- Create: `data/reference/V33_2_extracted/V33_2_DnD_Repository/12_TABLE_KITS/travel_complications/soreheim_proper_shelkopolis_road_travel_complication.md`

- [ ] **Step 15.1: Read the format of an existing complication file**

```bash
cat "data/reference/V33_2_extracted/V33_2_DnD_Repository/12_TABLE_KITS/travel_complications/fairhaven_shelkopolis_road_travel_complication.md"
```

Note: section headers, complication types (weather, encounter, supply, structural), flavor tone, dice triggers.

- [ ] **Step 15.2: Author ithtananalor → shelkopolis complication file**

Create `ithtananalor_shelkopolis_road_travel_complication.md`. Route character: highland/borderland road crossing into Principalities territory. Complications should reference Sheresh dome visibility, border transit papers, cold highland weather, Sheresh Dome Steward patrols, frozen waystation (visible in playtest screenshot). Follow exact section structure of the reference file.

- [ ] **Step 15.3: Author shirshal → shelkopolis complication file**

Create `shirshal_shelkopolis_road_travel_complication.md`. Shirshal is a settlement in the Roaz polity zone. Route character: post-industrial terrain, dust and grit, Roaz iron operations visible on horizon, opportunistic bandits targeting workers moving between settlements.

- [ ] **Step 15.4: Author guildheart_hub → shelkopolis complication file**

Create `guildheart_hub_shelkopolis_road_travel_complication.md`. Guildheart is a guild-dominated hub. Route character: well-maintained trade road, heavy merchant traffic, guild factor checkpoints, legitimate delays for cargo inspection, occasional guild courier escorts.

- [ ] **Step 15.5: Author mimolot_academy → shelkopolis complication file**

Create `mimolot_academy_shelkopolis_road_travel_complication.md`. Mimolot is an academic/archive center. Route character: scholarly traffic, archive transfer crates under seal, occasional student groups, Roadwarden escort points for high-value document shipments.

- [ ] **Step 15.6: Author panim_haven → shelkopolis complication file**

Create `panim_haven_shelkopolis_road_travel_complication.md`. Panim Haven has coastal access. Route character: mixed road/coastal, tidal timing matters for the coastal segment, fishing village stopovers, smuggler caches known to locals, salt-air weather complications.

- [ ] **Step 15.7: Author sunspire_haven → shelkopolis complication file**

Create `sunspire_haven_shelkopolis_road_travel_complication.md`. Sunspire Haven is a sacred/pilgrimage site. Route character: pilgrimage road, shrine maintenance workers, territorial disputes between Roadwardens and Sheresh stewards near the border, occasional pilgrim caravans needing escort.

- [ ] **Step 15.8: Author soreheim_proper → shelkopolis complication file**

Create `soreheim_proper_shelkopolis_road_travel_complication.md`. Soreheim is an industrial/trade settlement under Shelk economic pressure. Route character: industrial freight road, heavy ore cart traffic, Shelk trade officers at checkpoints, workers' hostility toward Shelk representatives.

- [ ] **Step 15.9: Commit**

```bash
git add "data/reference/V33_2_extracted/V33_2_DnD_Repository/12_TABLE_KITS/travel_complications/"
git commit -m "feat(content): author 7 Shelkopolis spoke route complication files — ithtananalor/shirshal/guildheart_hub/mimolot_academy/panim_haven/sunspire_haven/soreheim_proper"
```

---

## Final Verification

- [ ] **Run full 20-family headed playtest**

```bash
npm run test:e2e -- --headed 2>&1 | tail -60
```

Pass criteria (all required):
- `Families passed: ≥ 16/20` (accounting for natural variance in archetype/BG combos)
- `stage=Stage II` in s2-probe for ≥ 4 families
- `sp2 > 0` for at least 4 families that reached Stage II
- `boss_started=true` in at least 4 runs
- `JS errors: 0` (zero charAt errors)
- `stall-timeout` count ≤ 2 (residual intermittent issues acceptable)
- `dead-ends: 0`

If pass criteria not met: file new bugs against specific failing families. Do not re-open this plan.

---

## Self-Review

### Spec coverage check
- Stage 1 alias fix: Task 1 ✓
- charAt null-guard + trace: Sub-task 2 ✓
- Dirty files commit: Tasks 5 + 6 ✓
- alignmentDCPenalty + watchfulness DC wired: Sub-task 3 ✓
- advanceTime HUD sync + 3 partial functions: Sub-task 4 ✓
- Phase 1 headless gate: Phase 1 Gate ✓
- Stage II sp2 investigation: Task 7 ✓
- Stage II sp2 fix + content expansion: Task 8 ✓
- marshal_sera_ironveil bestiary: Task 9 ✓
- 7 canon districts wired: Task 10 ✓
- Level-scaling bonus removed (44 occurrences): Task 11 ✓
- spirit/craft mismatch fixed: Task 12 ✓
- useUtilitySkill direct application: Task 13 ✓
- ithtananalor wiring bugs: Task 14 ✓
- 7 route complication files: Task 15 ✓
- Full 20-family headed playtest: Final Verification ✓

### Gaps
- Bug 10 (inline day span style) — deferred (cosmetic, no gameplay impact, would require touching 18+ locations in HTML)
- Bug 13 (districts failResult dead code) — deferred (unreachable code, not a player-visible bug; clean up in separate refactor sprint)
- Magic archetype primary stat mismatch — deferred per user decision (leave wits as family-level mapping)

### Type consistency
- `getChoiceDC` return: uses `G.worldClocks.watchfulness` (matches spec-miner confirmed path)
- `addJournal` calls: arg order is text, category, dedupeKey — matches CLAUDE.md warning ("text FIRST, category SECOND")
- `rollD20('spirit', G.skills.spirit || 0)` — uses display-name key; correct per CLAUDE.md key table
- `G.investigationProgress` vs `G.stageProgress[2]` — Task 8 Step 8.1 explicitly checks which is authoritative before choosing the wiring pattern
