# Choice Cap Engine — Weighted Priority Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current enriched-pool-pick-4 + simple-tier-sort with a weighted scoring algorithm (plot:'main'=4, active questId=3, archetype-family match=2, flavor=1) plus a +2 recency bonus for threads engaged in the last 3 turns, capping the choice panel at 8.

**Architecture:** The enriched pool at `loadStageChoices:11491` currently truncates to 4 before the existing `prioritizeChoices` call at line 11622. Fix is two-part: (1) expand the pre-score pool to a wider candidate set, (2) upgrade `prioritizeChoices` to use weighted scoring + recency instead of simple TIERS sort. A new `G.recentChoiceIds` array tracks the last 3 engaged choice IDs and is updated on every choice selection in `adaptEnrichedChoice`'s action closure.

**Tech Stack:** Vanilla ES5 JS, `ledger-of-ash.html` single-file engine, `node tests/content/validate-structure.js` for structural validation, `npx playwright test tests/e2e/playtest-headless.spec.js` for functional verification.

---

## Files

| File | Change |
|------|--------|
| `ledger-of-ash.html:11414-11440` | Upgrade `prioritizeChoices` — weighted score + recency bonus |
| `ledger-of-ash.html:11483-11492` | Expand enriched pool from `slice(0,4)` to wider candidate set before scoring |
| `ledger-of-ash.html` (G defaults, ~line 9960) | Add `recentChoiceIds: []` |
| `ledger-of-ash.html:11248` | Update `adaptEnrichedChoice` action closure to push choice id to `G.recentChoiceIds` |
| `content/CLAUDE.md` | Fix the incorrect "Stage 1 COMPLETE AND FROZEN" language |

---

### Task 1: Fix incorrect CLAUDE.md Stage 1 freeze constraint

**Files:**
- Modify: `content/CLAUDE.md` — remove overly strict freeze wording

- [ ] **Step 1: Find the freeze constraint**

Run:
```bash
grep -n "FROZEN\|freeze\|additive" content/CLAUDE.md | head -10
```

- [ ] **Step 2: Replace the constraint**

Find the line that says "COMPLETE AND FROZEN — additive fixes only, never reduce choice count or result text" and replace with: "Stage 1 is functionally complete. Additive content (new archetype variants, new choices) is always safe. Retheme/rewrite of existing result text is allowed when the net text volume stays equal or grows. Never remove choices or cut result text."

- [ ] **Step 3: Commit**

```bash
git add content/CLAUDE.md
git commit -m "fix(docs): correct Stage 1 freeze constraint — retheme allowed when net text stays equal or grows"
```

---

### Task 2: Add G.recentChoiceIds to G defaults

**Files:**
- Modify: `ledger-of-ash.html` — G defaults object (grep for `recentOutcomeType:` to find the right block)

- [ ] **Step 1: Find G defaults location**

```bash
grep -n "recentOutcomeType:" ledger-of-ash.html | head -3
```

This shows the G defaults object. Find the surrounding block that initializes G state.

- [ ] **Step 2: Add recentChoiceIds**

In the G defaults object, add after `recentOutcomeType: null` (or at a logical nearby position):

```js
recentChoiceIds: [],   // last 3 enriched choice ids engaged; used for recency bonus in prioritizeChoices
```

- [ ] **Step 3: Verify no existing save-load conflict**

```bash
grep -n "recentChoiceIds" ledger-of-ash.html
```

Expected: only the 1 line you just added. No other references (it's new).

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(engine): add G.recentChoiceIds for choice panel recency tracking"
```

---

### Task 3: Update adaptEnrichedChoice to track recency

**Files:**
- Modify: `ledger-of-ash.html:11248` — inside `adaptEnrichedChoice`'s `action` function

- [ ] **Step 1: Find the action closure entry point**

```bash
grep -n "function adaptEnrichedChoice" ledger-of-ash.html
```

Read lines +30 to find the `action: function() {` block.

- [ ] **Step 2: Add recency push at start of action**

At the very start of the `action: function() {` body (before the `failResult` gate, after any flag checks), add:

```js
// Track recency: push this choice's id/cid to G.recentChoiceIds (keep last 3)
(function() {
  var _cRecencyId = c.id || c.cid || null;
  if (_cRecencyId && G) {
    if (!Array.isArray(G.recentChoiceIds)) G.recentChoiceIds = [];
    // Remove existing occurrence then prepend (dedup + move-to-front)
    G.recentChoiceIds = [_cRecencyId].concat(
      G.recentChoiceIds.filter(function(x){ return x !== _cRecencyId; })
    ).slice(0, 3);
  }
})();
```

- [ ] **Step 3: Verify the insertion doesn't break the failResult gate**

The failResult gate reads `c.failResult` but doesn't touch `G.recentChoiceIds` — no conflict. Verify:

```bash
grep -n "recentChoiceIds" ledger-of-ash.html
```

Expected: 2 lines (G defaults + adaptEnrichedChoice action).

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(engine): track choice recency in adaptEnrichedChoice for priority scoring"
```

---

### Task 4: Upgrade prioritizeChoices with weighted scoring + recency bonus

**Files:**
- Modify: `ledger-of-ash.html:11414-11440` — replace function body

- [ ] **Step 1: Read the current function**

```bash
grep -n "function prioritizeChoices" ledger-of-ash.html
```

Read lines 11414–11440 to see the current TIERS-based sort.

- [ ] **Step 2: Replace the sort logic**

Replace the `var TIERS = ...` block and sort with this weighted scoring approach. Keep the combat-ability strip and archetypeGroup filter intact above it:

```js
function prioritizeChoices(choices, maxCount) {
  if (!Array.isArray(choices)) return choices;
  var cap = (typeof maxCount === 'number' && maxCount > 0) ? maxCount : 8;
  // Strip combat-context ability choices — these belong only in the enterCombat panel
  choices = choices.filter(function(c) {
    if (!c) return false;
    var _cid = c.cid || c.id || '';
    if (typeof _cid === 'string' && _cid.indexOf('__combat_ability__') === 0) return false;
    return true;
  });
  // Filter archetype-exclusive choices — remove if archetypeGroup set and player family doesn't match
  choices = choices.filter(function(c) {
    if (!c.archetypeGroup) return true;
    var _family = (G && G.archetype && typeof getArchetypeFamily === 'function') ? getArchetypeFamily() : null;
    if (!_family) return true;
    return c.archetypeGroup === _family;
  });
  // Weighted scoring: plot:'main'=4, active questId=3, archetype-family match=2, base=1
  // Recency bonus: +2 if choice id/cid was one of the last 3 engaged
  var _recentIds = (G && Array.isArray(G.recentChoiceIds)) ? G.recentChoiceIds : [];
  var _arcFamily = (G && G.archetype && typeof getArchetypeFamily === 'function') ? getArchetypeFamily() : null;
  var scored = choices.filter(Boolean).map(function(c) {
    var pts = 1; // base flavor
    if (c.plot === 'main') pts += 4;
    else if (c.plot === 'side') pts += 2;
    var _choiceQid = c.questId || (c.cid && c.cid.indexOf('q_') === 0 ? c.cid : null);
    if (_choiceQid && G && G.questHints && G.questHints[_choiceQid]) pts += 3;
    if (_arcFamily && c.archetypeGroup === _arcFamily) pts += 2;
    if (c.isUtility) pts = 0; // utility always last
    var _choiceRecencyId = c.cid || c.id || null;
    if (_choiceRecencyId && _recentIds.indexOf(_choiceRecencyId) !== -1) pts += 2;
    return { choice: c, score: pts };
  });
  scored.sort(function(a, b) { return b.score - a.score; });
  return scored.slice(0, cap).map(function(s) { return s.choice; });
}
```

- [ ] **Step 3: Run structure validator**

```bash
node tests/content/validate-structure.js
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(engine): upgrade prioritizeChoices to weighted score + recency bonus (plot:main=4, questId=3, archetype=2, recency=+2)"
```

---

### Task 5: Expand the enriched pool pre-score candidate set

**Files:**
- Modify: `ledger-of-ash.html:11483-11492` — change `slice(0, 4)` to larger pool

- [ ] **Step 1: Read the current pool-pick block**

```bash
grep -n "slice(0, 4)\|_plotMain\|_nonPlot\|Fisher-Yates" ledger-of-ash.html | head -10
```

Expected: shows line 11491 `const picked = (_plotMain.length ? [_plotMain[0]] : []).concat(_nonPlot).slice(0, 4);`

- [ ] **Step 2: Expand the candidate pool**

Replace the `const picked = ...` line (currently `slice(0, 4)`) with:

```js
// Pass a wide candidate set to prioritizeChoices — scoring + cap happens downstream.
// Keep the plotMain guarantee (at least 1 main choice in candidates) but expand pool to 12.
const _mainCandidates = _plotMain.slice(0, 3);   // up to 3 plot:main choices as candidates
const _otherCandidates = _nonPlot.slice(0, 9);    // up to 9 other choices
const picked = _mainCandidates.concat(_otherCandidates);
```

Remove the old `seen` marking that immediately marks picked items, since `picked` is now a wider candidate set before scoring. The `seen` marking must happen **after** `prioritizeChoices` has selected the final 8. Find:

```js
picked.forEach(function(c) { seen[c.label || c.id || c.text] = true; });
```

This line marks seen items — keep it but verify it runs after `picked` is constructed, before `adaptEnrichedChoice`.

- [ ] **Step 3: Verify the final cap is still enforced**

```bash
grep -n "slice(0, 8)\|prioritizeChoices" ledger-of-ash.html | head -5
```

Expected: line 11622 still has `prioritizeChoices(adapted, 8)).slice(0, 8)` — final cap remains enforced.

- [ ] **Step 4: Run validators**

```bash
node tests/content/validate-structure.js && node tests/content/validate-content.js
```

Expected: exit 0 on both.

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(engine): expand enriched choice candidate pool from 4 to 12 so weighted scoring has full range of candidates"
```

---

### Task 6: Playwright functional test for cap enforcement

**Files:**
- Modify: `tests/e2e/playtest-headless.spec.js` — add a cap verification step

- [ ] **Step 1: Find the choice panel assertion area in the headless spec**

```bash
grep -n "choice-btn\|choiceCount\|choices.*length\|panel.*count" tests/e2e/playtest-headless.spec.js | head -10
```

- [ ] **Step 2: Add cap test**

In the `afterEach` or in a shared assertion helper, add (or add to an existing assertion block):

```js
// Verify choice panel never exceeds 8 choices
const choiceCount = await page.locator('#action-content .choice-btn:not([disabled])').count();
expect(choiceCount).toBeLessThanOrEqual(8);
```

If the spec has a `checkChoicePanel()` helper function, add the assertion there. If not, add it at the end of the main `playthrough` test block, after `loadStageChoices` fires.

- [ ] **Step 3: Run headless spec**

```bash
npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line
```

Expected: all tests pass, cap assertion green on all runs.

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/playtest-headless.spec.js
git commit -m "test(e2e): assert choice panel never exceeds 8 choices"
```

---

### Task 7: Manual smoke test + final validator pass

- [ ] **Step 1: Run all validators**

```bash
node tests/content/validate-structure.js && node tests/content/validate-content.js && node tests/content/validate-flags.js
```

Expected: exit 0, no new errors.

- [ ] **Step 2: Run full headless spec**

```bash
npx playwright test tests/e2e/playtest-headless.spec.js --reporter=list
```

Expected: all pass.

- [ ] **Step 3: Open the game and verify visually**

Open `play.bat`. Start a new game, reach a locality with 12+ potential choices (Shelkopolis or Fairhaven). Verify:
- No more than 8 choice buttons appear
- `plot:'main'` choices (blue border) always visible when available
- After clicking a choice, repeat a few times and confirm recently-engaged threads stay near the top

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat(engine): 8-choice cap with weighted priority (plot:main > active quest > archetype > recency > flavor) — complete"
```
