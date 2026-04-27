# V1.0 Completion Master Plan — Ledger of Ash

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close all 32 confirmed remaining gaps across P0–P4 to reach a shippable V1.0 build covering Stages 1 and 2.

**Architecture:** All changes target `ledger-of-ash.html` (engine), `content/` (stage data), and `tests/` (validators/jest). No new files unless specified. Follow existing patterns throughout — the engine is a single-file IIFE with G state, helper functions, and a render loop.

**Tech Stack:** Vanilla JS (no build step), Node.js validators, Jest for logic tests, vm sandbox for content validation.

---

## File Map

| File | Tasks |
|------|-------|
| `ledger-of-ash.html` | P0, P1-1, P1-2, P1-3, P1-4, P1-5, P1-6, P1-7, P2-5(partial), P3-7, P3-8, P3-9, P3-10, P4-1, P4-2, P4-3, P4-4 |
| `content/stage1_boss.js` and boss files | P2-7 |
| `content/*_stage1_enriched_choices.js` (17 files) | P2-5 |
| `content/*_stage2_enriched_choices.js` (all) | P2-6 |
| `content/nomdara_stage1_choices.js` | P2-8 |
| `tests/logic/training.test.js` | P1-4, P1-5 |
| `tests/logic/combat.test.js` | P1-6 |
| New content files for items/bestiary | P3-1 through P3-6 |

---

## P0 — Heat HUD (1 task)

### Task P0: Render heat HUD

**Files:**
- Modify: `ledger-of-ash.html` (~line where `#heat-hud` or heat display defined)

- [ ] **Step 1: Locate the heat HUD element**

```bash
grep -n "heat-hud\|display:none.*heat\|heat.*display:none" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Remove display:none and wire updateHeatHUD()**

Find the CSS rule hiding the heat HUD. Remove `display: none` (or change to `display: block`). Then find `updateHUD()` (~line 10862) and ensure `updateHeatHUD()` is called from it.

If `updateHeatHUD()` does not exist, add it near the other HUD updaters:

```javascript
function updateHeatHUD() {
  var container = document.getElementById('heat-hud');
  if (!container) return;
  var polities = Object.keys(G.heat || {});
  if (!polities.length) { container.style.display = 'none'; return; }
  var active = polities.filter(function(p) { return (G.heat[p] || 0) > 0; });
  if (!active.length) { container.style.display = 'none'; return; }
  container.style.display = 'block';
  container.innerHTML = active.map(function(p) {
    return '<span class="heat-pip" data-polity="' + p + '">' + p + ':' + G.heat[p] + '</span>';
  }).join(' ');
}
```

Add call in `updateHUD()`:
```javascript
updateHeatHUD();
```

- [ ] **Step 3: Verify in browser**

Open `play.bat`, use a choice that calls `addHeat('shelk', 3)` via console (`addHeat('shelk', 3); updateHUD();`). Heat bar should appear.

- [ ] **Step 4: Commit**

```bash
cd /c/Users/CEO/ledger-of-ash
git add ledger-of-ash.html
git commit -m "fix: heat HUD now renders — removed display:none, wired updateHeatHUD()"
```

---

## P1 — Core Engine Fixes (7 tasks)

### Task P1-1: Fix _abilRemap inverted gating

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate _abilRemap**

```bash
grep -n "_abilRemap\|abilRemap" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Identify the inversion bug**

The bug: `_abilRemap` maps archetype abilities but the gate logic is inverted — abilities that should be locked are unlocked and vice versa. Read the function and the gate condition.

- [ ] **Step 3: Fix the inversion**

If the gate is `if (!_abilRemap[arch])` it should be `if (_abilRemap[arch])` (or vice versa). Apply the correct logic based on what you find.

- [ ] **Step 4: Run jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -10
```

Expected: all existing tests pass.

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix: _abilRemap gate inversion — archetype ability gating now correct"
```

---

### Task P1-2: Fix training stat cap (unconditional ++)

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate training cap logic**

```bash
grep -n "case 'train'\|G\.skills\[sk\]++\|trainCap\|stat.*cap" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Read the training case block**

Find the `case 'train':` block in `campAction()`. The bug is that `G.skills[sk]++` happens unconditionally without checking the cap.

- [ ] **Step 3: Add cap check**

Wrap the increment:
```javascript
var currentCap = 5; // will be updated in P1-3 after archetypeBaseStats added
if (G.skills[sk] < currentCap) {
  G.skills[sk]++;
  showToast(sk + ' increased to ' + G.skills[sk] + '!');
} else {
  showToast('Already at cap for ' + sk + '.');
}
```

- [ ] **Step 4: Run jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix: training stat cap enforced — G.skills[sk]++ now checks cap before incrementing"
```

---

### Task P1-3: Add archetypeBaseStats to G defaults

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate G defaults**

```bash
grep -n "archetypeBaseStats\|let G = \|G = {" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -10
```

- [ ] **Step 2: Add archetypeBaseStats to G defaults**

Find the G defaults object and add:
```javascript
archetypeBaseStats: {},
trainingProgress: {},
trainingCooldown: {},
```

- [ ] **Step 3: Populate archetypeBaseStats on archetype selection**

Find where archetype is set (character creation or `_finalizeLevelUp`). Add:
```javascript
// Set base stats from archetype definition
var archetypeDef = ARCHETYPES.find(function(a) { return a.name === G.archetype; });
if (archetypeDef && archetypeDef.stats) {
  G.archetypeBaseStats = Object.assign({}, archetypeDef.stats);
}
```

- [ ] **Step 4: Run jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: archetypeBaseStats in G defaults — prerequisite for training ceiling calc"
```

---

### Task P1-4: Training redesign (20g cost, 3-session point, 30-day cooldown)

**Files:**
- Modify: `ledger-of-ash.html`
- Create: `tests/logic/training.test.js`

- [ ] **Step 1: Write failing tests**

Create `tests/logic/training.test.js`:

```javascript
'use strict';
const { createGameContext } = require('../setup');

describe('training redesign', () => {
  function makeCtx(overrides) {
    return createGameContext(Object.assign({
      archetype: 'Fighter', gold: 100, skills: { combat: 2, stealth: 1, survival: 1, lore: 1, persuasion: 1, craft: 1 },
      archetypeBaseStats: { combat: 3, stealth: 1, survival: 1, lore: 1, persuasion: 1, craft: 1 },
      trainingProgress: {}, trainingCooldown: {}, dayCount: 0
    }, overrides));
  }

  test('training costs 20 gold', () => {
    const c = makeCtx({ gold: 20 });
    if (!c.campAction) { console.warn('campAction not exported — skip'); return; }
    c.campAction('train', 'combat');
    expect(c.G.gold).toBe(0);
  });

  test('training 3 times increments skill by 1', () => {
    const c = makeCtx({ gold: 100 });
    if (!c.campAction) { console.warn('campAction not exported — skip'); return; }
    c.campAction('train', 'combat');
    c.campAction('train', 'combat');
    expect(c.G.skills.combat).toBe(2); // not yet
    c.campAction('train', 'combat');
    expect(c.G.skills.combat).toBe(3); // now incremented
  });

  test('training fails with insufficient gold', () => {
    const c = makeCtx({ gold: 10 });
    if (!c.campAction) { console.warn('campAction not exported — skip'); return; }
    c.campAction('train', 'combat');
    expect(c.G.gold).toBe(10); // unchanged
    expect(c.G.skills.combat).toBe(2); // unchanged
  });

  test('training respects 30-day cooldown', () => {
    const c = makeCtx({ gold: 200, trainingCooldown: { combat: 25 }, dayCount: 20 });
    if (!c.campAction) { console.warn('campAction not exported — skip'); return; }
    c.campAction('train', 'combat');
    expect(c.G.gold).toBe(200); // blocked
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest tests/logic/training.test.js --no-coverage 2>&1 | tail -15
```

Expected: FAIL or skip (campAction not exported).

- [ ] **Step 3: Implement training redesign in campAction**

Find `case 'train':` in `campAction()`. Replace with:

```javascript
case 'train': {
  var sk = arg;
  var TRAIN_GOLD_COST = 20, TRAIN_SESSIONS_NEEDED = 3, TRAIN_COOLDOWN_DAYS = 30;
  var cap = (G.archetypeBaseStats && G.archetypeBaseStats[sk] !== undefined)
    ? (G.archetypeBaseStats[sk] + 5) : 5;
  if (G.skills[sk] >= cap) { showToast('Already at cap for ' + sk + '.'); break; }
  if (G.gold < TRAIN_GOLD_COST) { showToast('Not enough gold to train (need 20).'); break; }
  var cooldownDay = (G.trainingCooldown && G.trainingCooldown[sk]) || 0;
  if (G.dayCount < cooldownDay) {
    showToast('Need to rest ' + (cooldownDay - G.dayCount) + ' more days before training ' + sk + ' again.');
    break;
  }
  G.gold -= TRAIN_GOLD_COST;
  G.trainingProgress = G.trainingProgress || {};
  G.trainingProgress[sk] = (G.trainingProgress[sk] || 0) + 1;
  if (G.trainingProgress[sk] >= TRAIN_SESSIONS_NEEDED) {
    G.skills[sk]++;
    G.trainingProgress[sk] = 0;
    G.trainingCooldown = G.trainingCooldown || {};
    G.trainingCooldown[sk] = G.dayCount + TRAIN_COOLDOWN_DAYS;
    showToast(sk + ' increased to ' + G.skills[sk] + '! (30-day cooldown begins)');
  } else {
    showToast('Training session ' + G.trainingProgress[sk] + '/' + TRAIN_SESSIONS_NEEDED + ' complete.');
  }
  updateHUD();
  break;
}
```

- [ ] **Step 4: Run tests**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest tests/logic/training.test.js --no-coverage 2>&1 | tail -10
```

Expected: all pass (or skip if campAction not exported to test context).

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html tests/logic/training.test.js
git commit -m "feat: training redesign — 20g cost, 3 sessions per point, 30-day cooldown"
```

---

### Task P1-5: Training stat cap /10 everywhere

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Find all /5 stat cap references**

```bash
grep -n "skills\[.*\] >= 5\|skill.*>= 5\|cap.*= 5\b\|maxStat.*5" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Update cap from 5 to 10 in training context**

The training cap formula from P1-4 is `archetypeBaseStats[sk] + 5`. For most stats this gives ~6-8. The global hard cap is 10 (per CLAUDE.md). Ensure:
- The formula uses `Math.min(cap, 10)` as upper bound
- Any UI that shows "max 5" is updated to "max 10"
- Character sheet stat bars scale to 10 not 5

Find the character sheet render and update max display:
```javascript
// Example pattern to find and update:
var maxStat = 10; // was 5
```

- [ ] **Step 3: Run jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix: training stat cap /10 everywhere — character sheet scales to 10"
```

---

### Task P1-6: Universal roll — risky/bold choices now all roll

**Files:**
- Modify: `ledger-of-ash.html`
- Modify: `tests/logic/combat.test.js` (or new `tests/logic/dc-all-tiers.test.js`)

- [ ] **Step 1: Locate handleChoice roll logic**

```bash
grep -n "handleChoice\|_tier.*safe\|auto.*roll\|DC.*7\|dc.*safe" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -30
```

- [ ] **Step 2: Read the handleChoice function**

Read from the handleChoice function definition to understand how safe auto-roll is currently wired vs risky/bold.

- [ ] **Step 3: Wire risky and bold rolls**

Ensure risky and bold choices also call the roll function. The pattern (safe already done):

```javascript
// Already exists for safe:
if (choice._tier === 'safe') { dc = 7; }
// Add/verify for risky and bold:
else if (choice._tier === 'risky') { dc = 12; }
else if (choice._tier === 'bold') { dc = 15; }
// Then: var roll = rollD20(); var success = (roll + bonus) >= dc;
```

Stage modifier (+1 per stage past I):
```javascript
var stageNum = parseInt((G.stage || 'Stage I').replace('Stage ', ''), 10) || 1;
dc += Math.max(0, stageNum - 1);
```

Axis flip modifier (+1 or +2 if benevolence/order thresholds crossed):
```javascript
if (Math.abs(G.benevolence || 0) >= 40) dc += 1;
if (Math.abs(G.orderAxis || 0) >= 40) dc += 1;
```

- [ ] **Step 4: Run all tests**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -10
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: universal roll — risky/bold choices now auto-roll at DC 12/15"
```

---

### Task P1-7: Crit rewards (+XP, +stageProgress on nat 20)

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate roll result handling**

```bash
grep -n "nat.*20\|roll.*20\|natTwenty\|crit.*reward\|=== 20" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Add crit rewards after nat 20 detection**

Find where the roll result is evaluated. Add after the roll:

```javascript
if (roll === 20) {
  var critXp = 15;
  gainXp(critXp);
  G.stageProgress[parseInt((G.stage || 'Stage I').replace('Stage ', ''), 10) || 1]++;
  showToast('Critical success! +' + critXp + ' XP, +1 stage progress.');
}
```

- [ ] **Step 3: Run jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: crit rewards — nat 20 gives +15 XP and +1 stageProgress"
```

---

## P2 — Missing Systems (10 tasks)

### Task P2-1: Enemy scaling — tiered stat variants (L1-3/L4-7/L8-10)

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate enemy templates**

```bash
grep -n "ENEMY_TEMPLATES\|ENEMIES\|enemyStats\|bestiary" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Add tier multipliers to enterCombat**

Find `enterCombat(enemyKey, ctx)` and the enemy stat lookup. Add tier scaling:

```javascript
function getEnemyStats(enemyKey) {
  var base = ENEMY_TEMPLATES[enemyKey];
  if (!base) return null;
  var tier = G.level <= 3 ? 1 : G.level <= 7 ? 2 : 3;
  var mult = [1, 1, 1.4, 1.9][tier]; // T1: x1, T2: x1.4, T3: x1.9
  return {
    name: base.name,
    hp: Math.round((base.hp || 10) * mult),
    attack: Math.round((base.attack || 3) * mult),
    defense: Math.round((base.defense || 1) * mult),
    xp: Math.round((base.xp || 20) * mult),
    gold: base.gold || 0,
  };
}
```

Replace all direct `ENEMY_TEMPLATES[key]` stat reads in combat with `getEnemyStats(key)`.

- [ ] **Step 3: Run jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: enemy scaling — tiered stat variants at L1-3/L4-7/L8-10"
```

---

### Task P2-2: Group combat (2-3 enemies, 35% chance at Stage II+)

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate combat entry point**

```bash
grep -n "enterCombat\|startCombat\|G\.combatState\|CS\." /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Add group combat spawn logic**

In `enterCombat()` or `startCombat()`, after enemy is determined, add:

```javascript
var stageNum = parseInt((G.stage || 'Stage I').replace('Stage ', ''), 10) || 1;
var groupChance = stageNum >= 2 ? 0.35 : 0;
CS.enemies = [getEnemyStats(enemyKey)];
if (Math.random() < groupChance) {
  var count = Math.random() < 0.5 ? 2 : 3;
  for (var ei = 1; ei < count; ei++) {
    CS.enemies.push(getEnemyStats(enemyKey)); // same type for now
  }
}
CS.currentEnemyIdx = 0;
```

Update combat round logic to fight enemies sequentially: when current enemy HP reaches 0, advance `CS.currentEnemyIdx`. Combat ends when all enemies defeated.

- [ ] **Step 3: Update combat UI to show enemy count**

Find where enemy name/HP renders. Add:
```javascript
var enemyLabel = CS.enemies.length > 1
  ? CS.enemies[CS.currentEnemyIdx].name + ' (' + (CS.currentEnemyIdx+1) + '/' + CS.enemies.length + ')'
  : CS.enemies[0].name;
```

- [ ] **Step 4: Run jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: group combat — 35% chance of 2-3 enemies at Stage II+"
```

---

### Task P2-3: Unified item ID namespace (getItem() helper)

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate ITEM_DEFS and SHOP_INVENTORY**

```bash
grep -n "ITEM_DEFS\|SHOP_INVENTORY\|getEquippedBonus\|item\.id" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Add getItem() helper**

After `ITEM_DEFS` and `SHOP_INVENTORY` are defined, add:

```javascript
function getItem(id) {
  if (ITEM_DEFS[id]) return ITEM_DEFS[id];
  // Search shop inventories
  for (var shopKey in SHOP_INVENTORY) {
    var shop = SHOP_INVENTORY[shopKey];
    for (var i = 0; i < shop.length; i++) {
      if (shop[i].id === id) return shop[i];
    }
  }
  return null;
}
```

- [ ] **Step 3: Update getEquippedBonus() to use getItem()**

Find `getEquippedBonus()`. Replace direct lookups:
```javascript
// Before: ITEM_DEFS[G.equipped.weapon]
// After:
var item = getItem(G.equipped.weapon);
var bonus = item ? (item.combatBonus || 0) : 0;
```

- [ ] **Step 4: Run jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: unified item namespace — getItem() searches ITEM_DEFS + SHOP_INVENTORY"
```

---

### Task P2-4: Background passive traits (bgTrait per background)

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate background definitions**

```bash
grep -n "BACKGROUNDS\|background.*trait\|bgTrait\|G\.background" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Add bgTrait field to background definitions**

Each background in `BACKGROUNDS` array gets a `trait` object. Example pattern for 5 representative backgrounds (repeat for all):

```javascript
{ name: 'Dockworker', desc: '...', trait: { key: 'survival', bonus: 1, note: 'Years loading cargo.' } },
{ name: 'Scribe', desc: '...', trait: { key: 'lore', bonus: 1, note: 'Ledgers and records.' } },
{ name: 'Soldier', desc: '...', trait: { key: 'combat', bonus: 1, note: 'Drill and discipline.' } },
{ name: 'Merchant', desc: '...', trait: { key: 'persuasion', bonus: 1, note: 'Years of bargaining.' } },
{ name: 'Thief', desc: '...', trait: { key: 'stealth', bonus: 1, note: 'Light fingers, lighter footstep.' } },
```

- [ ] **Step 3: Apply bgTrait at character creation**

Find where background is set on the G object. Add:

```javascript
var bg = BACKGROUNDS.find(function(b) { return b.name === G.background; });
if (bg && bg.trait) {
  G.skills[bg.trait.key] = (G.skills[bg.trait.key] || 0) + bg.trait.bonus;
  G.bgTraitNote = bg.trait.note;
}
```

- [ ] **Step 4: Show bgTrait in character sheet**

Find `renderCharacterSheet()`. Add below background name:
```javascript
if (G.bgTraitNote) {
  html += '<p class="bg-trait-note"><em>' + G.bgTraitNote + '</em></p>';
}
```

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: background passive traits — bgTrait applies +1 skill at character creation"
```

---

### Task P2-5: Stage 1 NPC model compliance (~17 remaining localities)

**Files:**
- Modify: `content/*_stage1_enriched_choices.js` (17 files not yet audited)

- [ ] **Step 1: Identify which Stage 1 files need audit**

```bash
ls /c/Users/CEO/ledger-of-ash/content/*stage1*enriched*.js | grep -v "districts\|nomdara"
```

Cross-reference with BACKLOG.md — 5 localities already done (Dravn Pell, Sera Ironveil, Coralyn Tideglass + 5 spot check). Remaining ~17 files need tell/subtext pass.

- [ ] **Step 2: For each remaining file, run NPC compliance audit**

For each file, grep for named NPCs and check:
1. Does each named NPC have a behavioral tell in their first scene?
2. Is there subtext (one unsaid layer per scene)?
3. No forbidden words ('investigation', 'meaningful', 'contact' as noun)?

```bash
node tests/content/validate-content.js 2>&1 | grep "FAIL\|WARN" | head -40
```

Fix violations found.

- [ ] **Step 3: Run validator**

```bash
node tests/content/validate-content.js 2>&1 | tail -5
```

- [ ] **Step 4: Commit per batch of 3-4 files**

```bash
git add content/
git commit -m "fix: Stage 1 NPC model compliance — [locality names] tell/subtext pass"
```

---

### Task P2-6: Stage 2 NPC model compliance

**Files:**
- Modify: `content/*_stage2_enriched_choices.js`

Same process as P2-5. Run validator, fix violations, commit per batch.

- [ ] **Step 1: Audit all Stage 2 files**

```bash
node tests/content/validate-content.js 2>&1 | grep "stage2" | head -40
```

- [ ] **Step 2: Fix violations**

Focus: forbidden words, tell presence, subtext layer, rumor attribution.

- [ ] **Step 3: Commit**

```bash
git add content/
git commit -m "fix: Stage 2 NPC model compliance — tell/subtext pass across all localities"
```

---

### Task P2-7: Boss narrative buildup flags

**Files:**
- Modify: `content/stage1_boss.js`, `content/stage2_boss.js`

- [ ] **Step 1: Check current boss gate logic**

```bash
grep -n "buildup\|boss.*flag\|seen.*boss\|met.*boss\|G\.flags" /c/Users/CEO/ledger-of-ash/content/stage1_boss.js | head -20
```

- [ ] **Step 2: Add buildup flag requirement**

In the boss encounter condition function, add a check that the player has encountered the boss NPC at least twice before the final confrontation:

```javascript
// In stage1_boss.js condition:
condition: function() {
  return G.flags.stage1_narrative_complete &&
    (G.flags.sera_ironveil_seen_count || 0) >= 2;
},
```

Add `seen_count` flag increments in earlier Sera Ironveil appearances.

- [ ] **Step 3: Repeat for stage2_boss.js**

Same pattern for Stage 2 boss.

- [ ] **Step 4: Commit**

```bash
git add content/stage1_boss.js content/stage2_boss.js
git commit -m "feat: boss buildup flags — NPC must appear 2+ times before final confrontation"
```

---

### Task P2-8: Nomdara — rename + content expansion

**Files:**
- Modify: `content/nomdara_stage1_choices.js`

- [ ] **Step 1: Read current nomdara content**

```bash
wc -l /c/Users/CEO/ledger-of-ash/content/nomdara_stage1_choices.js
grep -n "label\|fn:" /c/Users/CEO/ledger-of-ash/content/nomdara_stage1_choices.js | wc -l
```

Per BACKLOG: Nomdara is transit-only, no canon NPCs. Content should reflect this.

- [ ] **Step 2: Verify transit-only constraint**

Nomdara is a mobile settlement. Choices should focus on transit observations, not NPC encounters with named characters. Remove any named NPC encounters. Add transit-appropriate choices (watching the caravan move, overhearing merchants, observing route markers).

- [ ] **Step 3: Run validator**

```bash
node tests/content/validate-content.js 2>&1 | grep "nomdara" | head -20
```

Fix any violations.

- [ ] **Step 4: Commit**

```bash
git add content/nomdara_stage1_choices.js
git commit -m "fix: Nomdara transit-only constraint enforced — removed NPC encounters, added transit flavor"
```

---

### Task P2-9: Archetype confirmation modal

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate character creation flow**

```bash
grep -n "archetype.*select\|confirmArchetype\|archetype.*modal\|chooseArchetype" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Add confirmation modal**

If archetype selection goes directly to game start without a confirmation screen, add:

```javascript
function showArchetypeConfirmation(archetypeName) {
  var arch = ARCHETYPES.find(function(a) { return a.name === archetypeName; });
  if (!arch) return;
  var modal = document.getElementById('archetype-confirm-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'archetype-confirm-modal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }
  modal.innerHTML = '<div class="modal-box">' +
    '<h2 class="modal-title" style="font-family:var(--font-display)">' + arch.name + '</h2>' +
    '<p>' + (arch.desc || '') + '</p>' +
    '<p><strong>Starting stats:</strong> ' + Object.keys(arch.stats || {}).map(function(k) {
      return k + ': ' + arch.stats[k];
    }).join(', ') + '</p>' +
    '<button onclick="finalizeArchetype(\'' + archetypeName + '\')" class="choice-btn">Begin as ' + arch.name + '</button>' +
    '<button onclick="document.getElementById(\'archetype-confirm-modal\').style.display=\'none\'" class="choice-btn">Back</button>' +
    '</div>';
  modal.style.display = 'flex';
}
```

- [ ] **Step 3: Wire to archetype selection**

Replace direct `finalizeArchetype(name)` call in archetype card click with `showArchetypeConfirmation(name)`.

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: archetype confirmation modal — shows stats/desc before finalizing choice"
```

---

### Task P2-10: Archetype mechNote cards (per-archetype card descriptions)

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate archetype card rendering**

```bash
grep -n "mechNote\|archetype.*card\|renderArchetypeCard\|archetype.*desc" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Add mechNote to each archetype definition**

Each archetype in `ARCHETYPES` gets a `mechNote` string (1 sentence explaining how the archetype plays mechanically):

```javascript
{ name: 'Fighter', family: 'Combat', mechNote: 'High combat stat — direct confrontation succeeds more often.', stats: {...} },
{ name: 'Rogue', family: 'Combat', mechNote: 'High stealth stat — avoids detection, reaches restricted areas.', stats: {...} },
```

- [ ] **Step 3: Render mechNote on archetype card**

In the archetype card HTML:
```javascript
'<span class="mech-note" style="font-size:13px;opacity:0.8">' + (arch.mechNote || '') + '</span>'
```

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: archetype mechNote cards — per-archetype mechanical description on selection screen"
```

---

## P3 — Large Content Expansions (10 tasks)

### Task P3-1: Item catalog Stage I (240 items, levels 1-5)

**Files:**
- Create: `content/items_stage1.js`
- Modify: `ledger-of-ash.html` (load script tag + merge into ITEM_DEFS)

- [ ] **Step 1: Design item schema**

4 families × 3 slots × 4 chains × 5 levels = 240 items. Families: Blade, Shield, Cloak, Tool. Slots: weapon, armor, tool.

Each item:
```javascript
{ id: 'blade_iron_1', name: 'Iron Blade', type: 'weapon', level: 1, combatBonus: 1, price: 30, desc: 'A plain iron blade, serviceable.' },
```

- [ ] **Step 2: Author the 240 items**

Write `content/items_stage1.js` with all Stage I items following the pattern. Organize by family and chain level. Use `window.STAGE1_ITEMS = [...]`.

- [ ] **Step 3: Load and merge in ledger-of-ash.html**

Add `<script src="content/items_stage1.js"></script>` tag. After ITEM_DEFS declaration, add:

```javascript
if (typeof STAGE1_ITEMS !== 'undefined') {
  STAGE1_ITEMS.forEach(function(item) { ITEM_DEFS[item.id] = item; });
}
```

- [ ] **Step 4: Run validator**

```bash
node tests/content/validate-content.js 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add content/items_stage1.js ledger-of-ash.html
git commit -m "feat: item catalog Stage I — 240 items (4 families × 3 slots × 4 chains × 5 levels)"
```

---

### Task P3-2: Item catalog Stage II (240 items, levels 6-10)

Same structure as P3-1 but levels 6-10. Create `content/items_stage2.js`, load via `window.STAGE2_ITEMS`, merge into ITEM_DEFS.

- [ ] **Step 1: Author 240 Stage II items** (higher stats, more exotic materials)
- [ ] **Step 2: Wire script tag and merge**
- [ ] **Step 3: Commit**

```bash
git add content/items_stage2.js ledger-of-ash.html
git commit -m "feat: item catalog Stage II — 240 items at levels 6-10"
```

---

### Task P3-3: Macroregion bestiary (73+ enemies)

**Files:**
- Create: `content/bestiary_stage1.js`, `content/bestiary_stage2.js`
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Design enemy ecology**

10+ enemies per environment profile (coastal, highland, urban, wilderness). Each enemy needs: name, hp, attack, defense, xp, gold, desc, region tags.

- [ ] **Step 2: Author bestiary files**

```javascript
// content/bestiary_stage1.js
window.BESTIARY_STAGE1 = [
  { id: 'dock_rat', name: 'Dock Enforcer', hp: 8, attack: 3, defense: 1, xp: 15, gold: 5, region: ['shelk', 'cosmouth'], desc: 'Guild bruiser who collects late fees with his fists.' },
  // ... 70+ more
];
```

- [ ] **Step 3: Merge into ENEMY_TEMPLATES**

```javascript
if (typeof BESTIARY_STAGE1 !== 'undefined') {
  BESTIARY_STAGE1.forEach(function(e) { ENEMY_TEMPLATES[e.id] = e; });
}
```

- [ ] **Step 4: Commit**

```bash
git add content/bestiary_stage1.js content/bestiary_stage2.js ledger-of-ash.html
git commit -m "feat: macroregion bestiary — 73+ enemies across 10 environment profiles"
```

---

### Task P3-4: Soreheim plot currency (sorePlotCredits)

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Add sorePlotCredits to G defaults**

```javascript
sorePlotCredits: 0,
```

- [ ] **Step 2: Add helper functions**

```javascript
function addSorePlotCredit(n) { G.sorePlotCredits = (G.sorePlotCredits || 0) + (n || 1); updateHUD(); }
function getSorePlotCredits() { return G.sorePlotCredits || 0; }
```

- [ ] **Step 3: Wire to Soreheim social roll outcomes**

In Soreheim enriched choices, successful social interactions (persuasion/lore rolls) add sorePlotCredits:

```javascript
if (success) { addSorePlotCredit(1); addJournal('Earned standing in Soreheim.', 'intelligence'); }
```

- [ ] **Step 4: Gate Soreheim-specific content**

Boss or climax content in Soreheim regions requires `G.sorePlotCredits >= 5`.

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: sorePlotCredits — Soreheim social roll currency system"
```

---

### Task P3-5: Economy balance (gold income baseline, price tiers)

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Audit current gold income sources**

```bash
grep -n "G\.gold\s*+\|gold.*reward\|xpReward.*gold\|addGold" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -30
```

- [ ] **Step 2: Set baseline income rates**

Target: player earns ~15-25 gold per locality visited. Adjust choice gold rewards to hit this baseline. Combat gold drops should scale with enemy tier.

- [ ] **Step 3: Set price tiers**

| Tier | Price range | Examples |
|------|-------------|---------|
| Common | 10-30g | Basic weapons, light armor |
| Uncommon | 40-80g | Crafted gear, special tools |
| Rare | 100-200g | Masterwork, named items |

Update SHOP_INVENTORY prices to match tiers.

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: economy balance — gold income baseline 15-25g/locality, price tiers normalized"
```

---

### Task P3-6: Regional shop differentiation

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Identify shop inventory structure**

```bash
grep -n "SHOP_INVENTORY\|shopItems\|getShopItems\|locality.*shop" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Add region tags to shop inventories**

Each shop entry gets a `regions` array. `getShopItems(locality)` filters by region:

```javascript
function getShopItems(locality) {
  var polity = getPolityForLocality(locality);
  return SHOP_INVENTORY.filter(function(item) {
    return !item.regions || item.regions.indexOf(polity) !== -1;
  });
}
```

- [ ] **Step 3: Add region-specific items**

Psanan shops: maritime gear, rope, charts. Soreheim shops: highland supplies, cold-weather gear. Union shops: guild-marked tools, standardized equipment.

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: regional shop differentiation — Psanan/Soreheim/Union source filtering"
```

---

### Task P3-7: Companion passive bonuses in combat

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate companion bonus in combat**

```bash
grep -n "compBonus\|companion.*combat\|G\.companions.*bonus" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Implement compBonus calculation**

```javascript
function getCompanionBonus() {
  if (!G.companions || !G.companions.length) return 0;
  return G.companions.reduce(function(total, comp) {
    if (!comp.active) return total;
    return total + (comp.combatBonus || 1);
  }, 0);
}
```

Wire `getCompanionBonus()` into the combat attack calculation:
```javascript
var playerAttack = rollD20() + (G.skills.combat || 0) + getEquippedBonus() + getCompanionBonus();
```

- [ ] **Step 3: Run jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: companion passive combat bonuses — active companions add to attack roll"
```

---

### Task P3-8: Companion abilities (1 use per fight)

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Add ability data to companion definitions**

Each companion gets an `ability` object:
```javascript
{ name: 'Vorath Gelden', ability: { name: 'Shield Wall', desc: 'Reduces next enemy attack by 5.', effect: 'reduce_enemy_attack', value: 5, used: false } }
```

- [ ] **Step 2: Add ability reset on combat start**

In `enterCombat()` / `startCombat()`:
```javascript
(G.companions || []).forEach(function(c) { if (c.ability) c.ability.used = false; });
```

- [ ] **Step 3: Add ability button in combat UI**

In combat render, for each active companion with unused ability, add a button:
```javascript
if (comp.ability && !comp.ability.used) {
  html += '<button class="choice-btn" onclick="useCompanionAbility(\'' + comp.name + '\')">' + comp.ability.name + ': ' + comp.ability.desc + '</button>';
}
```

- [ ] **Step 4: Implement useCompanionAbility()**

```javascript
function useCompanionAbility(compName) {
  var comp = (G.companions || []).find(function(c) { return c.name === compName; });
  if (!comp || !comp.ability || comp.ability.used) return;
  comp.ability.used = true;
  if (comp.ability.effect === 'reduce_enemy_attack') {
    CS.enemyAttackDebuff = (CS.enemyAttackDebuff || 0) + comp.ability.value;
    addNarration(comp.name, comp.name + ' uses ' + comp.ability.name + '!');
  }
  renderCombat();
}
```

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: companion abilities — 1 use per fight, applied via combat UI button"
```

---

### Task P3-9: Combat escalation borders (yellow/orange/red)

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Add threatLevel to combat state**

In `enterCombat()`:
```javascript
CS.threatLevel = 0; // 0=normal, 1=yellow, 2=orange, 3=red
```

- [ ] **Step 2: Update threatLevel each round**

After each combat round:
```javascript
var hpPct = CS.enemies[CS.currentEnemyIdx].hp / CS.enemies[CS.currentEnemyIdx].maxHp;
CS.threatLevel = hpPct > 0.66 ? 0 : hpPct > 0.33 ? 1 : 2;
if (CS.playerHp < G.maxHp * 0.25) CS.threatLevel = 3;
```

- [ ] **Step 3: Apply border CSS class**

In combat choice rendering:
```javascript
var threatClass = ['', 'threat-yellow', 'threat-orange', 'threat-red'][CS.threatLevel] || '';
choiceBtn.className = 'choice-btn ' + threatClass;
```

Add CSS:
```css
.choice-btn.threat-yellow { border-left: 4px solid #c8a020; }
.choice-btn.threat-orange { border-left: 4px solid #c06010; }
.choice-btn.threat-red { border-left: 4px solid #be2828; }
```

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: combat escalation borders — yellow/orange/red choice borders by threat level"
```

---

### Task P3-10: Distance system visible in combat UI

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate rangeTier**

```bash
grep -n "rangeTier\|rangeModifier\|distance.*combat\|combat.*range" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Render rangeTier in combat UI**

Find the combat UI HTML construction. Add range display:
```javascript
var rangeLabels = ['Close', 'Near', 'Far', 'Distant'];
var rangeHtml = '<div class="range-display">Range: ' + (rangeLabels[CS.rangeTier] || 'Close') + '</div>';
```

Add CSS:
```css
.range-display { font-family: var(--font-body); font-size: 13px; opacity: 0.75; margin-bottom: 6px; }
```

- [ ] **Step 3: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: distance system in combat UI — range tier now shown to player"
```

---

## P4 — UX & Polish (4 tasks)

### Task P4-1: DC level-scaling formula

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate DC derivation**

The current DC Reference (from CLAUDE.md): safe=7, risky=13, bold=16. Stage modifier already applied in P1-6.

The level-scaling formula: `adjustedDC = baseDC + floor((G.level - 1) / 2)`.

- [ ] **Step 2: Add level modifier to DC calc**

In the roll DC derivation (updated in P1-6), add level modifier:
```javascript
var levelMod = Math.floor((G.level - 1) / 2);
dc += levelMod;
```

- [ ] **Step 3: Run jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: DC level-scaling — baseDC + floor((level-1)/2) applied to all choices"
```

---

### Task P4-2: Skills→Stats terminology (abilToDisplay() helper)

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Add mapping helpers**

Find the G defaults or top of the engine. Add:

```javascript
var _SKILL_KEY_TO_DISPLAY = { combat:'Might', stealth:'Finesse', survival:'Vigor', lore:'Wits', persuasion:'Charm', craft:'Spirit' };
var _DISPLAY_TO_SKILL_KEY = { Might:'combat', Finesse:'stealth', Vigor:'survival', Wits:'lore', Charm:'persuasion', Spirit:'craft' };
function abilToKey(displayName) { return _DISPLAY_TO_SKILL_KEY[displayName] || displayName; }
function abilToDisplay(key) { return _SKILL_KEY_TO_DISPLAY[key] || key; }
```

- [ ] **Step 2: Update all player-facing skill name renders**

In `updateHUD()` and `renderCharacterSheet()`, replace raw key display with `abilToDisplay(key)`:

```javascript
// Before: label.textContent = sk; // shows "combat"
// After:
label.textContent = abilToDisplay(sk); // shows "Might"
```

- [ ] **Step 3: Verify internal G.skills keys unchanged**

The internal `G.skills.combat` key MUST NOT change — only display names change. Search for any place where `G.skills` is set by display name and fix it.

- [ ] **Step 4: Run jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -5
```

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: Skills→Stats display — abilToDisplay() maps keys to Might/Finesse/Vigor/Wits/Charm/Spirit"
```

---

### Task P4-3: Abilities/Traits sections in character sheet

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate renderCharacterSheet()**

```bash
grep -n "renderCharacterSheet\|character.*sheet\|panel-character" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -10
```

- [ ] **Step 2: Add Abilities section**

After stats section, add:
```javascript
html += '<section class="char-section"><h3 style="font-family:var(--font-display)">Abilities</h3>';
var arch = ARCHETYPES.find(function(a) { return a.name === G.archetype; });
if (arch && arch.abilities) {
  arch.abilities.forEach(function(ab) {
    html += '<div class="ability-entry"><strong>' + ab.name + ':</strong> ' + ab.desc + '</div>';
  });
} else {
  html += '<p style="opacity:0.6">No special abilities.</p>';
}
html += '</section>';
```

- [ ] **Step 3: Add Traits section**

```javascript
html += '<section class="char-section"><h3 style="font-family:var(--font-display)">Traits</h3>';
if (G.bgTraitNote) {
  html += '<div class="trait-entry"><strong>Background:</strong> ' + G.bgTraitNote + '</div>';
}
html += '</section>';
```

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: Abilities/Traits sections in character sheet"
```

---

### Task P4-4: World clock first-increment tooltip

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Locate world clock increment logic**

```bash
grep -n "G\.worldClocks\|worldClock.*++\|addWorldClock" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

- [ ] **Step 2: Add first-increment flag and tooltip**

Add to G defaults:
```javascript
_worldClockIntroSeen: {},
```

In the world clock increment logic, after each increment:
```javascript
var clockKey = 'pressure'; // or whatever key
if (!G._worldClockIntroSeen[clockKey]) {
  G._worldClockIntroSeen[clockKey] = true;
  showToast('The ' + clockKey + ' clock increased. Authorities take notice when patterns repeat.');
}
```

- [ ] **Step 3: Run jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: world clock first-increment tooltip — explains consequence on first trigger"
```

---

## Verification — Full Suite

After all tasks complete:

```bash
cd /c/Users/CEO/ledger-of-ash
npx jest --no-coverage
node tests/content/validate-content.js
node tests/content/validate-flags.js
node tests/content/validate-structure.js
```

Expected:
- Jest: all logic tests pass
- validate-content: 0 new violations (existing 838 label-length violations pre-date this plan)
- validate-flags: pass
- validate-structure: pass

Then open `play.bat` and verify:
- Heat bar appears when heat > 0
- Training costs gold and requires 3 sessions
- Combat rolls for all choice types
- Nat 20 shows crit toast
- Character sheet shows Might/Finesse/Vigor/Wits/Charm/Spirit
- Archetype confirmation modal appears before game start
