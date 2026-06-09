# Track 1 — Abilities System
## Agent Brief: Fix A1 + Fix A2

**Source file:** `C:\Users\CEO\ledger-of-ash\ledger-of-ash.html`
**Functions in scope:** `renderAbilityStep`, `awardAbility`, `activateAbility`, `ABILITY_EFFECTS`, `STARTER_ABILITIES`, `getAbilityById`
**No-touch list:** `ARCHETYPE_ABILITY_TREES` (data only — do not modify), `ARCHETYPE_TRAIT_POOLS`, `renderTraitStep`, `checkLevelUp`, `updateHUD` skill loop, equipment system

---

## Context

This is a self-contained repair brief. Read only this file and the source files listed above. Do not read other plan files.

**Architecture note:** `ledger-of-ash.html` is a ~16K line single-file game. All JS is inline `<script>` blocks. ES5 only (no arrow functions, no `const`/`let`, no template literals). Play via `play.bat` (opens in Chrome over `file://`). No build step.

**The bug (confirmed by headed playtest 2026-06-06):** Players choose an ability at level-up, see the correct card, but the ability never appears in their Abilities tab. The Abilities tab shows every ability as LOCKED. Root cause: `renderAbilityStep` pushes the full ability object to `G.abilities` (wrong target). All downstream readers check `G.unlockedAbilities` (ID string array). The write and read are on different properties.

Secondary bug: starter abilities granted at level 2 (`pressure_strike`, `shadow_step`, `field_assess`, `pattern_recall`) have no entry in `ABILITY_EFFECTS` and no definition returned by `getAbilityById`. Their Activate button never renders.

---

## Fix A1 — Level-up write target (CRITICAL, ~1 line change)

### Location
Search for `renderAbilityStep` in `ledger-of-ash.html`. The relevant push is at approximately **line 14044**.

### Find this code
```js
G.abilities = G.abilities || [];
G.abilities.push(chosenAbility);
```

### Replace with
```js
G.unlockedAbilities = G.unlockedAbilities || [];
if (G.unlockedAbilities.indexOf(chosenAbility.id) === -1) {
  G.unlockedAbilities.push(chosenAbility.id);
}
```

### Supplemental check — `applyLevelUpChoice`
Search for `applyLevelUpChoice` (~line 14103). If this function exists and also writes to `G.abilities` or `G.unlockedAbilities`, reconcile so exactly one write occurs per ability choice. The canonical target is `G.unlockedAbilities` (ID string array). Remove any duplicate push. Do not add a second write.

### Why this is safe
`G.unlockedAbilities` is the only property read by:
- HUD ability count (~line 17658): `G.unlockedAbilities.length`
- Character sheet (~line 16454): `G.unlockedAbilities.indexOf(ab.id) !== -1`
- Choice-render ability check (~line 12333): `G.unlockedAbilities.indexOf(id) !== -1`

`G.abilities` is not read by any of these. The old push to `G.abilities` was dead.

---

## Fix A2 — Starter ability IDs not in ABILITY_EFFECTS or getAbilityById (HIGH)

### Background
`STARTER_ABILITIES` (~line 2926) grants `pressure_strike`, `shadow_step`, `field_assess`, `pattern_recall` at level 2 via `awardAbility`. These IDs do not exist in `ABILITY_EFFECTS` (~line 12096) or in any ARCHETYPE_ABILITY_TREE. `getAbilityById` returns `null` for them. The Activate button check is `if (!getAbilityById(id)) return;` — so these abilities are silently skipped.

### Part 1 — Add to ABILITY_EFFECTS

Find `ABILITY_EFFECTS` at approximately **line 12096** in `ledger-of-ash.html`. It is an object literal. Add these four entries (use exact existing formatting):

```js
'pressure_strike': {type: 'roll_bonus', skill: 'might', bonus: 3, duration: 1},
'shadow_step':     {type: 'roll_bonus', skill: 'finesse', bonus: 3, duration: 1},
'field_assess':    {type: 'dc_reduce', amount: 2, duration: 1},
'pattern_recall':  {type: 'roll_bonus', skill: 'wits', bonus: 3, duration: 1},
```

Skill keys: `might`, `finesse`, `wits` are the display-name keys used by `G.skills`. Do not use old internal keys (`combat`, `stealth`, `lore`).

### Part 2 — Add fallback definitions in `getAbilityById`

Find `getAbilityById` at approximately **line 12082** in `ledger-of-ash.html`. It searches `ARCHETYPE_ABILITY_TREES` and returns `null` if not found. Add a fallback lookup before the final `return null`:

```js
var STARTER_ABILITY_DEFS = {
  'pressure_strike': {
    id: 'pressure_strike', name: 'Pressure Strike', type: 'active',
    desc: 'Your next combat or risky roll gains +3.', unlockLevel: 2
  },
  'shadow_step': {
    id: 'shadow_step', name: 'Shadow Step', type: 'active',
    desc: 'Your next finesse roll gains +3.', unlockLevel: 2
  },
  'field_assess': {
    id: 'field_assess', name: 'Field Assessment', type: 'active',
    desc: 'Reduce the next DC you face by 2.', unlockLevel: 2
  },
  'pattern_recall': {
    id: 'pattern_recall', name: 'Pattern Recall', type: 'active',
    desc: 'Your next wits roll gains +3.', unlockLevel: 2
  }
};
if (STARTER_ABILITY_DEFS[abilId]) return STARTER_ABILITY_DEFS[abilId];
return null;
```

Place this block immediately before the existing `return null;` at the end of `getAbilityById`. The local variable `STARTER_ABILITY_DEFS` is defined inside the function — no scope issue.

---

## Verification Steps (browser-checkable)

Open `ledger-of-ash.html` via `play.bat`. Use the browser DevTools console.

**Test A1:**
1. Create a new character (any archetype).
2. Make choices until level 2 triggers. Level-up step 2 shows "CHOOSE A NEW ABILITY" — select any ability card shown.
3. Complete the level-up flow.
4. Open the Abilities tab in the character sheet.
5. **Expected:** The chosen ability appears with an "Activate" button (not LOCKED).
6. **Console check:** `G.unlockedAbilities` must contain the chosen ability's ID string. `G.abilities` should be `[]` or contain no full-object entries from this level-up.

**Test A2 — starter abilities:**
1. Reach level 2 (as above).
2. After level-up completes, look for the ability Activate button above the choice list.
3. **Expected:** One starter ability button is visible (e.g., "Pressure Strike — Activate").
4. Click Activate.
5. **Expected:** A narration appears confirming the bonus is applied. The button is consumed (grayed/gone).
6. **Console check:** `G._lastRollInfo` on the next risky/combat roll must show a total 3 higher than the base roll.

**Test A1 + A2 together — Abilities tab at level 3:**
1. Level to 3+, choosing a tree ability at level-up.
2. Open Abilities tab.
3. **Expected:** Chosen tree ability shows "Activate" (not LOCKED). Starter ability from level 2 also shows (if not consumed) or shows as "Used."

---

## Git Commit Message Template

```
fix(abilities): write unlocked abilities to G.unlockedAbilities, add starter ability defs

Fix A1: renderAbilityStep pushed full object to G.abilities; all readers
check G.unlockedAbilities (ID string array). Redirect push + dedup guard.

Fix A2: pressure_strike/shadow_step/field_assess/pattern_recall had no
ABILITY_EFFECTS entry and no getAbilityById definition — Activate button
never rendered. Add ABILITY_EFFECTS entries + STARTER_ABILITY_DEFS fallback
in getAbilityById.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
