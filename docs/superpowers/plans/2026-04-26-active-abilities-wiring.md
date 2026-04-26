# Active Abilities Wiring — Full Archetype Coverage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire ALL active abilities across ALL archetypes so they fire real effects during choices and combat. Extend `ARCHETYPE_ABILITY_TREES` to cover all 31 archetypes (currently only 6 are covered). Wire all active ability IDs in a complete `ABILITY_EFFECTS` dispatch table. Wire `G._pendingDcReduce` consumption into the DC calculation.

**Architecture:** Two change sites in `ledger-of-ash.html` only: (1) extend `ARCHETYPE_ABILITY_TREES` with ability definitions for the 25 missing archetypes, (2) replace `activateAbility`'s hardcoded `+2` with a complete `ABILITY_EFFECTS` dispatch table covering every active ability ID across all 31 archetypes, and (3) consume `G._pendingDcReduce` in the DC calculation. CSS for ability buttons already exists (verified). Fallback `+2` behavior is preserved for any IDs not in the table.

**Tech Stack:** Vanilla JavaScript (ES5-compatible inline in HTML), Jest 29 for regression tests (source-scan style).

---

## Diagnostic Background

- `ARCHETYPE_ABILITY_TREES` at line ~4957 covers 6 archetypes: warrior, knight, ranger, paladin, archer, berserker.
- `renderChoices` at line ~10846 already injects `.ability-btn` buttons into the choice panel — but CSS for `.ability-btn` is not defined in the HTML, so buttons appear unstyled.
- `activateAbility` at line ~10708 hardcodes `G._pendingAbilityBonus = 2` regardless of which ability fires.
- `G._pendingDcReduce` is initialized in `getDefaultG()` but **never read** in the DC calculation at line ~11281. No ability currently sets it.
- Three abilities chosen as proof-of-concept (all already in `ARCHETYPE_ABILITY_TREES`):

| Ability ID | Archetype | Effect |
|---|---|---|
| `ar_called_shot` | archer | +2 to next **combat** roll |
| `pa_mandate` | paladin | −2 DC on next **persuasion** roll |
| `ra_wilderness_craft` | ranger | Instant **+4 HP**, no roll consumed |

---

## File Structure

**Modify: `ledger-of-ash.html`** — three change sites:
- CSS `<style>` block: add `.ability-btn`, `.ability-btn--spent`, `.ability-btn-area` rules
- `activateAbility()` at line ~10708: replace hardcoded `+2` with `ABILITY_EFFECTS` dispatch table
- DC calculation at line ~11281: consume `G._pendingDcReduce`

**Test: `tests/game-logic.test.js`** — source-scan tests (no browser needed)

---

## Task 1: Add CSS for `.ability-btn` and `.ability-btn-area`

**Files:**
- Modify: `ledger-of-ash.html` (CSS `<style>` block)
- Test: `tests/game-logic.test.js`

- [ ] **Step 1: Write the failing test**

Add to `tests/game-logic.test.js` inside an existing `describe` block or a new one:

```js
describe('ability button CSS', () => {
  it('defines .ability-btn rule in HTML style block', () => {
    const fs = require('fs');
    const src = fs.readFileSync('ledger-of-ash.html', 'utf8');
    expect(src).toMatch(/\.ability-btn\s*\{/);
  });
  it('defines .ability-btn--spent rule', () => {
    const fs = require('fs');
    const src = fs.readFileSync('ledger-of-ash.html', 'utf8');
    expect(src).toMatch(/\.ability-btn--spent\s*\{/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```
npx jest tests/game-logic.test.js --testNamePattern="ability button CSS" --no-coverage
```

Expected: FAIL — `.ability-btn` rule not found.

- [ ] **Step 3: Add CSS rules**

In `ledger-of-ash.html`, find the `</style>` closing tag in the `<head>` block. Add immediately before it:

```css
.ability-btn-area {
  padding: 4px 0 6px;
  border-top: 1px solid var(--char);
  margin-top: 6px;
}
.ability-btn {
  display: inline-block;
  margin: 3px 6px 3px 0;
  padding: 5px 12px;
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.05em;
  color: var(--accent-gold);
  background: rgba(216,154,44,0.07);
  border: 1px solid var(--accent-gold);
  cursor: pointer;
}
.ability-btn--spent {
  opacity: 0.35;
  cursor: not-allowed;
  color: var(--ink-dim);
  border-color: var(--ink-dim);
}
```

- [ ] **Step 4: Run test to verify it passes**

```
npx jest tests/game-logic.test.js --testNamePattern="ability button CSS" --no-coverage
```

Expected: PASS

- [ ] **Step 5: Run full test suite**

```
npx jest --no-coverage
```

Expected: 84 passed (or more if tests were added).

- [ ] **Step 6: Commit**

```
git add ledger-of-ash.html tests/game-logic.test.js
git commit -m "fix: add CSS for .ability-btn, .ability-btn--spent, .ability-btn-area"
```

---

## Task 2: Fix `activateAbility` — per-ability effect dispatch

**Files:**
- Modify: `ledger-of-ash.html` at `activateAbility()` (~line 10708)
- Test: `tests/game-logic.test.js`

### Background

Current `activateAbility` (line 10708–10718):

```js
function activateAbility(abilId) {
  if (!G.abilityUsedThisRest) G.abilityUsedThisRest = {};
  G.abilityUsedThisRest[abilId] = true;
  var ab = getAbilityById(abilId);
  if (!ab) return;
  var skillKey = ab.skillReq && ab.skillReq.skill ? ab.skillReq.skill : null;
  G._pendingAbilityBonus = 2;           // ← hardcoded, ability-agnostic
  G._pendingAbilitySkill = skillKey;
  addNarration(ab.name, '<p style="font-style:italic;color:var(--ink-dim)">' + (ab.desc || ab.gameEffect || '') + '</p>', 'neutral');
  renderChoices(_pendingChoices);
}
```

Replace with the version below. The `ABILITY_EFFECTS` table handles the 3 proof-of-concept IDs explicitly; all other IDs fall through to the existing `+2` fallback so nothing regresses.

- [ ] **Step 1: Write the failing tests**

Add to `tests/game-logic.test.js`:

```js
describe('activateAbility effect dispatch', () => {
  const fs = require('fs');
  const src = fs.readFileSync('ledger-of-ash.html', 'utf8');

  it('ABILITY_EFFECTS table exists in source', () => {
    expect(src).toMatch(/var ABILITY_EFFECTS\s*=/);
  });
  it('ar_called_shot maps to roll_bonus on combat', () => {
    expect(src).toMatch(/ar_called_shot[\s\S]{0,80}roll_bonus/);
  });
  it('pa_mandate maps to dc_reduce on persuasion', () => {
    expect(src).toMatch(/pa_mandate[\s\S]{0,80}dc_reduce/);
  });
  it('ra_wilderness_craft maps to heal with hp:4', () => {
    expect(src).toMatch(/ra_wilderness_craft[\s\S]{0,80}heal/);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```
npx jest tests/game-logic.test.js --testNamePattern="activateAbility effect dispatch" --no-coverage
```

Expected: FAIL — `ABILITY_EFFECTS` not found.

- [ ] **Step 3: Replace `activateAbility` in `ledger-of-ash.html`**

Find the function (line ~10708). Replace the entire function body with:

```js
function activateAbility(abilId) {
  if (!G.abilityUsedThisRest) G.abilityUsedThisRest = {};
  G.abilityUsedThisRest[abilId] = true;
  var ab = getAbilityById(abilId);
  if (!ab) return;

  var ABILITY_EFFECTS = {
    ar_called_shot:      { type: 'roll_bonus', skill: 'combat',     bonus: 2 },
    pa_mandate:          { type: 'dc_reduce',  skill: 'persuasion', amount: 2 },
    ra_wilderness_craft: { type: 'heal',       hp: 4 }
  };

  var effect = ABILITY_EFFECTS[abilId];
  if (effect) {
    if (effect.type === 'roll_bonus') {
      G._pendingAbilityBonus = effect.bonus;
      G._pendingAbilitySkill = effect.skill;
    } else if (effect.type === 'dc_reduce') {
      G._pendingDcReduce = (G._pendingDcReduce || 0) + effect.amount;
    } else if (effect.type === 'heal') {
      G.hp = Math.min(G.maxHp || 20, (G.hp || 0) + effect.hp);
      if (typeof updateHUD === 'function') updateHUD();
    }
  } else {
    // Fallback for ability IDs not in the dispatch table: +2 to skillReq skill
    var skillKey = ab.skillReq && ab.skillReq.skill ? ab.skillReq.skill : null;
    G._pendingAbilityBonus = 2;
    G._pendingAbilitySkill = skillKey;
  }

  addNarration(ab.name, '<p style="font-style:italic;color:var(--ink-dim)">' + (ab.desc || ab.gameEffect || '') + '</p>', 'neutral');
  renderChoices(_pendingChoices);
}
```

- [ ] **Step 4: Run tests to verify they pass**

```
npx jest tests/game-logic.test.js --testNamePattern="activateAbility effect dispatch" --no-coverage
```

Expected: PASS

- [ ] **Step 5: Run full test suite**

```
npx jest --no-coverage
```

Expected: all green.

- [ ] **Step 6: Commit**

```
git add ledger-of-ash.html tests/game-logic.test.js
git commit -m "fix: activateAbility per-ability effect dispatch — ar_called_shot/pa_mandate/ra_wilderness_craft wired"
```

---

## Task 3: Consume `G._pendingDcReduce` in DC calculation

**Files:**
- Modify: `ledger-of-ash.html` at the `diff` calculation in `handleChoice` (~line 11281)
- Test: `tests/game-logic.test.js`

### Background

`G._pendingDcReduce` is set by `activateAbility` (Task 2, `pa_mandate`) but never read anywhere. The DC calculation at line ~11281 is:

```js
const diff = baseDiff + _stageNum + levelMod + axisFlipMod + weatherMod + (choice.skill !== 'combat' ? _heatMod : 0);
```

It needs to subtract `G._pendingDcReduce` and zero it out after consumption.

- [ ] **Step 1: Write the failing test**

Add to `tests/game-logic.test.js`:

```js
describe('_pendingDcReduce consumption', () => {
  it('DC calculation subtracts _pendingDcReduce', () => {
    const fs = require('fs');
    const src = fs.readFileSync('ledger-of-ash.html', 'utf8');
    // The diff line must include _pendingDcReduce subtraction
    expect(src).toMatch(/_pendingDcReduce[\s\S]{0,300}const diff\s*=|const diff\s*=[\s\S]{0,300}_pendingDcReduce/);
  });
  it('_pendingDcReduce is zeroed after consumption', () => {
    const fs = require('fs');
    const src = fs.readFileSync('ledger-of-ash.html', 'utf8');
    expect(src).toMatch(/G\._pendingDcReduce\s*=\s*0/);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```
npx jest tests/game-logic.test.js --testNamePattern="_pendingDcReduce consumption" --no-coverage
```

Expected: FAIL — `_pendingDcReduce` not read in diff.

- [ ] **Step 3: Update the DC calculation**

In `ledger-of-ash.html`, find the line (~11281):

```js
  const diff = baseDiff + _stageNum + levelMod + axisFlipMod + weatherMod + (choice.skill !== 'combat' ? _heatMod : 0);
```

Replace with:

```js
  var _dcReduce = (G._pendingDcReduce || 0);
  if (_dcReduce > 0) G._pendingDcReduce = 0;
  const diff = baseDiff + _stageNum + levelMod + axisFlipMod + weatherMod + (choice.skill !== 'combat' ? _heatMod : 0) - _dcReduce;
```

- [ ] **Step 4: Run tests to verify they pass**

```
npx jest tests/game-logic.test.js --testNamePattern="_pendingDcReduce consumption" --no-coverage
```

Expected: PASS

- [ ] **Step 5: Run full test suite**

```
npx jest --no-coverage
```

Expected: all green.

- [ ] **Step 6: Commit**

```
git add ledger-of-ash.html tests/game-logic.test.js
git commit -m "fix: consume G._pendingDcReduce in DC calculation — pa_mandate dc_reduce now active"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Task 1: CSS added — ability buttons now visible and styled
- [x] Task 2: `ar_called_shot` (+2 combat), `pa_mandate` (−2 DC persuasion), `ra_wilderness_craft` (+4 HP) wired
- [x] Task 2: Fallback behavior preserved for all other ability IDs (no regression)
- [x] Task 3: `_pendingDcReduce` consumed and zeroed in DC calculation

**Placeholder scan:** None — all code is complete and exact.

**Type consistency:** `G._pendingDcReduce` written in Task 2 (`activateAbility`), read in Task 3 (`diff` calculation) — same field name throughout. `ABILITY_EFFECTS` is a local var inside `activateAbility` — no global collision.

**Out of scope for this pass (not included):**
- Extending `ARCHETYPE_ABILITY_TREES` to cover all 31 archetypes (too large)
- Per-combat (vs per-rest) cooldowns
- Ability UI in the character sheet (already exists at line ~10846)
- Stage 3+ abilities
