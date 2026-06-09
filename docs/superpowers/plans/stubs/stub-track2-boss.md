# Track 2 — Boss System
## Agent Brief: Fix B1 + Fix B2

**Source files:**
- `C:\Users\CEO\ledger-of-ash\ledger-of-ash.html` (functions: `endCombat`, `resolveCombatAction`)
- `C:\Users\CEO\ledger-of-ash\content\stage1_boss.js` (reference only — do not modify)

**Functions in scope:** `endCombat`, `resolveCombatAction`
**No-touch list:** `enterCombat`, `ENEMY_TEMPLATES`, `STAGE1_BOSS_MODULE.shouldTrigger`, `renderCombatRound`, `CS` initialization block, `stage1_boss.js` (read-only — do not edit)

---

## Context

This is a self-contained repair brief. Read only this file and the source files listed above.

**Architecture note:** `ledger-of-ash.html` is a ~16K line single-file game. All JS is inline `<script>` blocks. ES5 only. `CS` is the combat state object, declared at combat entry. `G` is module-scope (never `window.G`).

**Bug B1 (CRITICAL):** `endCombat()` never calls `enemy.onDefeat()`. `resolveCombatAction()` has no half-HP check for `onPhaseChange()`. The Stage 1 miniboss `onDefeat` at `content/stage1_boss.js:125` grants `G.stageProgress[1] += 3` — this never fires. Players can defeat the miniboss and get zero stage progress from it.

**Bug B2 (HIGH):** Boss `loot` is an array `[{name, type, effect, desc}]` in `stage1_boss.js` (lines 123 and 196). `endCombat()` reads `enemy.loot.gold` and `enemy.loot.item` — both `undefined` on an array. Boss drops (Silver Registry Pencil, ORE Intake Seal) never enter inventory.

---

## Step 0 — Read the boss file first

Before making any changes, read `content/stage1_boss.js` lines 100–200. Confirm:
- Line ~125: `onDefeat` function body (should contain `G.stageProgress[1] += 3` or similar)
- Line ~150: `onPhaseChange` function body (should contain phase narration + stat boost)
- Lines ~123 and ~196: `loot` field format (should be an array of objects)

This read is mandatory — the exact property names and logic may differ slightly from the plan. Implement against what you find, not the plan description.

---

## Fix B1 — `onDefeat` and `onPhaseChange` never called

### Part 1: Add `onDefeat` call in `endCombat()`

Find `endCombat` in `ledger-of-ash.html`. Search for the string `endCombat` to locate the function definition (approximately **line 5020–5060**). Inside the function, find the section that handles player victory (when `CS.enemy.hp <= 0`). Locate the line that calls `loadStageChoices` or similar — the victory narration is added just before it.

**Insert this block after the victory narration is added, before `loadStageChoices` is called:**

```js
if (CS && CS.enemy && typeof CS.enemy.onDefeat === 'function') {
  CS.enemy.onDefeat();
}
```

Do not add it inside the defeat-player branch (when player hp <= 0). Only in the enemy-defeated branch.

### Part 2: Add `onPhaseChange` check in `resolveCombatAction()`

Find `resolveCombatAction` in `ledger-of-ash.html` (approximately **line 4750–4900**). Find the section where damage is applied to `CS.enemy.hp` (look for `CS.enemy.hp -= ...` or `CS.enemy.hp = CS.enemy.hp - ...`).

**Insert this block immediately after the damage is applied to enemy HP:**

```js
if (CS.enemy && typeof CS.enemy.onPhaseChange === 'function' &&
    !CS._phaseChanged && CS.enemy.hp <= CS.enemy.maxHp * 0.5) {
  CS._phaseChanged = true;
  CS.enemy.onPhaseChange();
}
```

`CS._phaseChanged` is a guard so phase-change fires exactly once per combat. It does not need to be pre-declared — `undefined` is falsy and the flag self-initializes on first set.

---

## Fix B2 — Boss loot array vs flat-object format

### Read the existing loot handler

In `endCombat()`, find the existing loot handling code (near `enemy.loot.gold` and `enemy.loot.item` reads, approximately **line 5038–5060**). The existing code looks something like:

```js
if (enemy.loot) {
  if (enemy.loot.gold) { G.gold += enemy.loot.gold; ... }
  if (enemy.loot.item) { G.inventory.push(enemy.loot.item); ... }
}
```

### Add array-loot branch

**Add this block inside the `if (enemy.loot)` block, after the existing flat-object checks:**

```js
if (Array.isArray(enemy.loot)) {
  enemy.loot.forEach(function(lootEntry) {
    if (lootEntry.name) {
      G.inventory = G.inventory || [];
      G.inventory.push({
        id: lootEntry.id || lootEntry.name.toLowerCase().replace(/\s+/g, '_'),
        name: lootEntry.name,
        desc: lootEntry.desc || '',
        type: lootEntry.type || 'tool',
        cost: 0,
        equipped: false
      });
      victoryText += ' You recover the ' + lootEntry.name + '.';
    }
    if (lootEntry.effect) {
      Object.keys(lootEntry.effect).forEach(function(sk) {
        var _lootKeyNorm = {lore: 'wits', combat: 'might', stealth: 'finesse', survival: 'vigor', persuasion: 'charm'};
        var _lootKey = _lootKeyNorm[sk] || sk;
        if (G.skills && G.skills[_lootKey] !== undefined) {
          G.skills[_lootKey] += lootEntry.effect[sk];
        }
      });
    }
  });
}
```

**Important:** The variable `victoryText` must already be declared in `endCombat()` scope by the time you reach this block. Verify it exists. If it's named differently (e.g., `_victText`, `_result`), use that name instead.

**Important:** This block must be structured so it does NOT run when `enemy.loot` is a plain object (the `Array.isArray` guard handles this). Do not remove the existing flat-object checks — non-boss enemies may use that format.

---

## Verification Steps (browser-checkable)

Open `ledger-of-ash.html` via `play.bat`.

**Test B1a — onDefeat fires:**
1. Play until Stage 1 miniboss triggers (or use console: `G.stageProgress[1] = 14; resolveArrival(G.location)` to force the threshold).
2. Enter and win the boss fight.
3. **Console check:** `G.stageProgress[1]` must be 3 higher than before the fight (or whatever the boss's `onDefeat` grants — read the actual value from `stage1_boss.js`).

**Test B1b — onPhaseChange fires:**
1. Enter boss fight.
2. Bring boss HP to just below 50% of `maxHp`.
3. **Expected:** A phase-change narration appears (fire narration, enrage message, or whatever `stage1_boss.js:onPhaseChange` outputs).
4. Continue fighting — phase narration must NOT fire a second time.

**Test B2 — Boss loot enters inventory:**
1. Win the boss fight (same run as B1a).
2. Open inventory (character sheet → Items tab).
3. **Expected:** "ORE Intake Seal" (or whatever `stage1_boss.js:loot` array names) appears in the list.
4. **Console check:** `G.inventory.find(function(i){ return i.name.indexOf('Seal') !== -1; })` must return an object.

---

## Git Commit Message Template

```
fix(boss): call onDefeat/onPhaseChange hooks; handle array loot format

Fix B1: endCombat never called enemy.onDefeat — Stage 1 miniboss granted
0 stageProgress on defeat. resolveCombatAction had no half-HP phase check.
Added onDefeat call post-victory + CS._phaseChanged guard for onPhaseChange.

Fix B2: boss loot declared as array [{name,type,effect,desc}]; endCombat
read enemy.loot.gold/.item (undefined on arrays). Added Array.isArray branch
that pushes each loot entry to G.inventory and applies skill effects.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
