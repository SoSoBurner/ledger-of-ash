# Combat & Authority UI Fix Sprint — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all P0/P1 defects in the combat entry, travel corridor combat, and authority confrontation UI systems discovered via browser observation on 2026-05-31.

**Architecture:** Six independent bug-fix tasks ordered by severity (P0 first). Each task is self-contained. Tasks 1–3 fix dead code paths that prevented any of these systems from working at all. Tasks 4–6 fix correctness and content errors within those systems.

**Tech Stack:** Vanilla ES5 JS, single-file HTML game engine (`ledger-of-ash.html`), external content file (`content/stage2_enriched_choices.js`, `content/travel_corridors.js`). Validators: `node tests/content/validate-content.js`. E2E: `npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line`.

---

## Defect Reference

| ID | Severity | Description |
|----|----------|-------------|
| D10 | P0 | `window.WORLD_LOCATIONS` is undefined (module `const`) → `G._currentPolity` always `''` → heat confrontation NEVER fires |
| D9 | P1 | `G._currentPolity` derived 13 lines AFTER heat check → confrontation deferred by one interaction |
| D3-engine | P0 | `loadStageChoices` uses `c.label` as dedup key; 27 choices have no `label:` → all share `seen[undefined]` |
| D3-content | P0 | Those 27 choices use `result: function()` instead of `fn: function()` → `adaptEnrichedChoice` calls `c.fn()` → TypeError, renders "undefined" |
| D11 | P1 | `enterAuthorityConfrontation` passes raw `authorityKey` (e.g. `'shelk_patrol'`) to `getHeat()` → heat-based DC never applies; also corrupts tutorial text |
| D2 | P1 | Authority confrontation Phase 1 + Phase 2 choices use old skill keys (`persuasion`, `stealth`, `combat`) → wrong roll bonus |
| D7 | P0 | `BIOME_ENCOUNTER_POOLS` keys (`plains_dust_hound`, etc.) not in `ENEMY_TEMPLATES` → corridor combat fails with unknown enemy key every time |
| D8 | P1 | `enc_fight` choice in `_makeCombatChoice()` has no `skill:` → rolls with Wits 0 for all archetypes |
| D1 | P1 | `enterCombat()` entry overlay shows no HP bar or enemy stat block — HP bar only renders inside `startCombat()`'s round loop |

---

## File Map

| File | What changes |
|------|-------------|
| `ledger-of-ash.html` | Tasks 1, 2, 3, 6: `loadStageChoices` polity fix + heat gate reorder; `enterAuthorityConfrontation` polity key extraction; `_authorityRenderPhase1/2` skill keys; `enterCombat` stat preview; ENEMY_TEMPLATES 18 new creatures |
| `content/stage2_enriched_choices.js` | Task 4: rename `result:` → `fn:` on 27 choices |
| `content/travel_corridors.js` | Task 5: add `skill:'might'` to `enc_fight`; BIOME_ENCOUNTER_POOLS already correct |

---

## Task 1 — Fix P0: Heat Confrontation Trigger (`loadStageChoices`)

**What:** Two bugs in `loadStageChoices` (`ledger-of-ash.html`):
1. Line 11281: `window.WORLD_LOCATIONS` is `undefined` because `const WORLD_LOCATIONS` is module-scoped, not on `window`. Polity derivation always fails → `G._currentPolity` is always `''` → heat gate never fires.
2. Lines 11271–11284: Polity is derived from `G._currentPolity` (line 11271) but `G._currentPolity` is SET at line 11284 — reading before writing. On first arrival, polity is stale (empty). Fix: move polity derivation to the top of `loadStageChoices`, before the heat check.

**Files:**
- Modify: `ledger-of-ash.html` (~line 11271–11290)

- [ ] **Step 1: Locate the heat gate block**

Find this block in `ledger-of-ash.html` (around lines 11271–11290):

```js
  checkHeatConsequences();
  var _heatPolity = G._currentPolity || '';
  var _heatTickFlag = '_auth_check_' + _heatPolity + '_' + (G.dayCount || 0);
  if (_heatPolity && getHeat(_heatPolity) >= 3 && !(G.flags && G.flags[_heatTickFlag])) {
    if (!G.flags) G.flags = {};
    G.flags[_heatTickFlag] = true;
    enterAuthorityConfrontation(_heatPolity + '_patrol', { source: 'heat_threshold' });
    return;
  }
  const loc = locId || G.location || '';
  // Derive polity key from WORLD_LOCATIONS config for authority encounter injection
  var _wlData = (window.WORLD_LOCATIONS && window.WORLD_LOCATIONS[loc]) || {};
  var _rawPolity = (_wlData.polity || '').toLowerCase();
  var _polityKeys = ['shelk','roaz','shirsh','mimolot','panim','cosmouth','zootia','union','sheresh','soreheim','nomdara'];
  G._currentPolity = _polityKeys.reduce(function(found, k){ return found || (_rawPolity.indexOf(k) >= 0 ? k : ''); }, '');
```

- [ ] **Step 2: Replace with fixed version**

Replace that entire block with:

```js
  checkHeatConsequences();
  const loc = locId || G.location || '';
  // Derive polity FIRST (before heat check uses it)
  var _wlData = (typeof WORLD_LOCATIONS !== 'undefined' && WORLD_LOCATIONS[loc]) || {};
  var _rawPolity = (_wlData.polity || '').toLowerCase();
  var _polityKeys = ['shelk','roaz','shirsh','mimolot','panim','cosmouth','zootia','union','sheresh','soreheim','nomdara'];
  G._currentPolity = _polityKeys.reduce(function(found, k){ return found || (_rawPolity.indexOf(k) >= 0 ? k : ''); }, '');

  var _heatPolity = G._currentPolity || '';
  var _heatTickFlag = '_auth_check_' + _heatPolity + '_' + (G.dayCount || 0);
  if (_heatPolity && getHeat(_heatPolity) >= 3 && !(G.flags && G.flags[_heatTickFlag])) {
    if (!G.flags) G.flags = {};
    G.flags[_heatTickFlag] = true;
    enterAuthorityConfrontation(_heatPolity + '_patrol', { source: 'heat_threshold', polity: _heatPolity });
    return;
  }
```

Key changes:
- `window.WORLD_LOCATIONS` → `typeof WORLD_LOCATIONS !== 'undefined' && WORLD_LOCATIONS` (removes `window.` prefix — `const` is not on `window`)
- Polity derivation block moved to BEFORE the `_heatPolity` read
- Added `polity: _heatPolity` to the context passed to `enterAuthorityConfrontation` (used in Task 2)
- Remove the duplicate `const loc = locId || G.location || ''` line that appears later in the same function (it will now be defined above)

- [ ] **Step 3: Remove now-duplicate `loc` variable**

After the heat gate block, there is a second `const loc = locId || G.location || ''` declaration. Remove it — it is now declared above. Search for and delete the second occurrence:

```js
  const loc = locId || G.location || '';
```

(There may also be `var _wlData`, `var _rawPolity`, `var _polityKeys`, `G._currentPolity =` lines after the heat gate that are now duplicates — remove those too.)

- [ ] **Step 4: Verify syntax**

```bash
node --check content/stage2_enriched_choices.js
```
Expected: no output (no errors). This won't catch HTML syntax but confirms no introduced JS errors.

- [ ] **Step 5: Manual smoke test via browser**

Open game, create a new character, play to Shelkopolis (Stage II), open DevTools console, run:
```js
saveToSlot('loa_slot_2');
var s = JSON.parse(localStorage.getItem('loa_slot_2'));
console.log(s._currentPolity); // should be 'shelk', not ''
```
Expected: `shelk`

- [ ] **Step 6: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(engine): derive polity before heat check; fix window.WORLD_LOCATIONS reference"
```

---

## Task 2 — Fix P1: Authority Confrontation Polity Key Mismatch

**What:** `enterAuthorityConfrontation` receives `authorityKey` like `'shelk_patrol'` but uses it as the `polity` arg for `getHeat()`, `addHeat()`, and `AUTHORITY_ENEMY_MAP` lookup. `getHeat('shelk_patrol')` always returns 0. Fix: extract polity from context if available (Task 1 now passes `ctx.polity`), otherwise strip the `_patrol` suffix.

Also fix Phase 1 + Phase 2 skill keys from old names (`persuasion`, `stealth`, `combat`) to current names (`charm`, `finesse`, `might`).

**Files:**
- Modify: `ledger-of-ash.html` (~lines 9396–9488)

- [ ] **Step 1: Fix `enterAuthorityConfrontation` polity extraction**

Find this in `enterAuthorityConfrontation` (~line 9396–9402):

```js
function enterAuthorityConfrontation(authorityKey, ctx) {
  ctx = ctx || {};
  var polity    = ctx.polity    || authorityKey;
  var heatLevel = ctx.heatLevel != null ? ctx.heatLevel : getHeat(polity);
  var offense   = ctx.offense   || 'unspecified violation';
  var locality  = ctx.locality  || G.location || 'unknown';
```

Replace with:

```js
function enterAuthorityConfrontation(authorityKey, ctx) {
  ctx = ctx || {};
  // Polity from context (preferred) or strip _patrol/_warden/_enforcer suffix
  var _polityKeys = ['shelk','roaz','shirsh','mimolot','panim','cosmouth','zootia','union','sheresh','soreheim','nomdara'];
  var _derivedPolity = ctx.polity || (function() {
    var ak = authorityKey.toLowerCase();
    return _polityKeys.reduce(function(found, k){ return found || (ak.indexOf(k) >= 0 ? k : ''); }, '') || authorityKey;
  })();
  var polity    = _derivedPolity;
  var heatLevel = ctx.heatLevel != null ? ctx.heatLevel : getHeat(polity);
  var offense   = ctx.offense   || 'unspecified violation';
  var locality  = ctx.locality  || G.location || 'unknown';
```

- [ ] **Step 2: Fix Phase 1 skill keys in `_authorityRenderPhase1`**

Find (~lines 9427–9445):

```js
    {
      text: 'Cooperate fully. Give them no reason to push further.',
      skill: 'persuasion', tag: 'safe', align: 'lawful',
      extraClass: 'deescalate',
      cid: '__authority__' + ak + '__' + pk + '__1__comply'
    },
    {
      text: 'There is a procedural angle here. Work it.',
      skill: 'persuasion', tag: 'risky', align: 'neutral',
      extraClass: 'deescalate',
      cid: '__authority__' + ak + '__' + pk + '__1__negotiate'
    },
    {
      text: 'This does not have to be about you. Give them somewhere else to look.',
      skill: 'stealth', tag: 'risky', align: 'chaotic',
      extraClass: 'deescalate',
      cid: '__authority__' + ak + '__' + pk + '__1__deflect'
    }
```

Replace skill values only:

```js
    {
      text: 'Cooperate fully. Give them no reason to push further.',
      skill: 'charm', tag: 'safe', align: 'lawful',
      extraClass: 'deescalate',
      cid: '__authority__' + ak + '__' + pk + '__1__comply'
    },
    {
      text: 'There is a procedural angle here. Work it.',
      skill: 'charm', tag: 'risky', align: 'neutral',
      extraClass: 'deescalate',
      cid: '__authority__' + ak + '__' + pk + '__1__negotiate'
    },
    {
      text: 'This does not have to be about you. Give them somewhere else to look.',
      skill: 'finesse', tag: 'risky', align: 'chaotic',
      extraClass: 'deescalate',
      cid: '__authority__' + ak + '__' + pk + '__1__deflect'
    }
```

- [ ] **Step 3: Fix Phase 2 skill keys in `_authorityRenderPhase2`**

Find (~lines 9456–9485). Replace skill values:

```js
  var choices = [
    {
      text: 'Hold your ground. Make them commit.',
      preview: 'You do not move. They have to decide whether this is worth escalating — and their hesitation is already an answer.',
      skill: 'charm', tag: 'bold', align: 'chaotic',
      extraClass: 'combat-lv2',
      cid: '__authority__' + ak + '__' + pk + '__2__stand_firm'
    },
    {
      text: 'There is a gap — move through it before it closes.',
      preview: 'The corridor between them is narrow and momentary. Miss it and the situation hardens into something with no good exits.',
      skill: 'finesse', tag: 'bold', align: 'chaotic',
      extraClass: 'combat-lv1',
      cid: '__authority__' + ak + '__' + pk + '__2__attempt_escape'
    },
    {
      text: 'Hands up. This is not the place to fight.',
      skill: 'charm', tag: 'safe', align: 'lawful',
      extraClass: 'combat-lv1',
      cid: '__authority__' + ak + '__' + pk + '__2__accept_detention'
    }
  ];
  if (currentHeat >= 5) {
    choices.push({
      text: 'They are not leaving you a choice. Commit to it.',
      preview: 'Heat 5+. The authority has escalated past negotiation. What follows will be logged, remembered, and difficult to walk back from.',
      skill: 'might', tag: 'bold', align: 'chaotic',
      extraClass: 'combat-lv3',
      cid: '__authority__' + ak + '__' + pk + '__2__fight'
    });
  }
```

- [ ] **Step 4: Smoke test in browser**

Load game with Shelkopolis + heat=3 (via localStorage patch from session notes), trigger confrontation:
```js
loadFromSlot(1); showScreen('screen-game');
enterAuthorityConfrontation('shelk_patrol', { source: 'heat_threshold', polity: 'shelk' });
```
Expected:
- Roll line shows `+ N` where N = actual Charm stat (not 0)
- Confrontation header reads "Shelk Patrol" (unchanged)
- No "Heat rises in shelk_patrol" tutorial text (it will show "Heat rises in Shelk" or won't re-show if already seen)

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(authority): extract polity from authority key; apply _KEY_NORM skill names"
```

---

## Task 3 — Fix P0: `seen[undefined]` Dedup Key in `loadStageChoices`

**What:** `loadStageChoices` at lines 11296 and 11307 uses `c.label` as the dedup key. 27 choices in `stage2_enriched_choices.js` have no `label:` field — so all 27 share `seen[undefined]`. The first one picked marks the key seen, and all 26 others are silently blocked forever.

Fix: fall back through `c.id`, then `c.text` when `c.label` is undefined.

**Files:**
- Modify: `ledger-of-ash.html` (lines ~11296 and ~11307)

- [ ] **Step 1: Find and fix line ~11296**

Search for:
```js
  let pool = enriched.filter(function(c) { return c && !seen[c.label]; });
```

Replace with:
```js
  let pool = enriched.filter(function(c) { return c && !seen[c.label || c.id || c.text]; });
```

- [ ] **Step 2: Find and fix line ~11307**

Search for:
```js
  picked.forEach(function(c) { seen[c.label] = true; });
```

Replace with:
```js
  picked.forEach(function(c) { seen[c.label || c.id || c.text] = true; });
```

- [ ] **Step 3: Verify no other `seen[c.label]` references**

```bash
grep -n "seen\[c\.label\]" ledger-of-ash.html
```
Expected: 0 matches (both instances now fixed).

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(engine): seen[undefined] dedup — fall back to c.id|c.text when c.label absent"
```

---

## Task 4 — Fix P0: `result:` → `fn:` in 27 `stage2_enriched_choices.js` Choices

**What:** 27 choices in `content/stage2_enriched_choices.js` define their callback as `result: function() {...}` instead of `fn: function() {...}`. `adaptEnrichedChoice` calls `c.fn()` — not `c.result()` — so the function is never called, G state never mutates, and the result area renders "undefined".

Fix: rename the property from `result:` to `fn:` on all 27 choices. Do NOT touch any choice that already uses `fn:`.

**Files:**
- Modify: `content/stage2_enriched_choices.js`

- [ ] **Step 1: Verify the scope**

```bash
grep -c "result: function" content/stage2_enriched_choices.js
```
Expected: `27`

```bash
grep -c "fn: function" content/stage2_enriched_choices.js
```
Expected: `61` (existing working choices)

- [ ] **Step 2: Apply the rename**

The property name `result:` is used exclusively for callbacks in this file (not for string result values). Use a targeted sed replacement:

```bash
sed -i 's/    result: function/    fn: function/g' content/stage2_enriched_choices.js
```

- [ ] **Step 3: Verify counts after rename**

```bash
grep -c "result: function" content/stage2_enriched_choices.js
```
Expected: `0`

```bash
grep -c "fn: function" content/stage2_enriched_choices.js
```
Expected: `88` (was 61, added 27)

- [ ] **Step 4: Syntax check**

```bash
node --check content/stage2_enriched_choices.js
```
Expected: no output.

- [ ] **Step 5: Run content validator**

```bash
node tests/content/validate-content.js 2>&1 | grep stage2_enriched
```
Expected: 0 FAIL lines for this file. WARNs about label length are pre-existing and acceptable.

- [ ] **Step 6: Commit**

```bash
git add content/stage2_enriched_choices.js
git commit -m "fix(content): rename result:->fn: on 27 text-only stage2_enriched choices"
```

---

## Task 5 — Fix P0+P1: Corridor Combat — Biome Creatures + enc_fight Skill

**What:**
1. `BIOME_ENCOUNTER_POOLS` keys (`plains_dust_hound`, `highland_rockjaw`, etc.) are not in `ENEMY_TEMPLATES` → `[startCombat] unknown enemy key` every time corridor combat fires.
2. `enc_fight` choice has no `skill:` field → always rolls Wits 0.

**Design directive (from user):** Corridor combat creatures must be biome-specific non-humanoids. Prioritize non-humanoid ecology over generic humanoid threats.

**Files:**
- Modify: `ledger-of-ash.html` (ENEMY_TEMPLATES, ~line 2930)
- Modify: `content/travel_corridors.js` (`_makeCombatChoice`, ~line 832)

- [ ] **Step 1: Add 18 biome creature templates to ENEMY_TEMPLATES**

Find the end of `ENEMY_TEMPLATES` in `ledger-of-ash.html` (search for `tide_wrecker:{` — this is the last entry). After `tide_wrecker`'s closing `},`, add the following block before the closing `};` of ENEMY_TEMPLATES:

```js
  // ── BIOME CREATURES — used by travel corridor enc_fight ──
  plains_dust_hound:{
    name:'Plains Dust Hound', hp:10, maxHp:10, attack:5, defense:3, morale:6,
    desc:'A lean hunting canid gone feral on the open plains. Closes distance fast.',
    loot:{gold:0, item:'Dust Hound Hide', materials:[{id:'beast_hide',qty:1,chance:0.7},{id:'frontier_fiber',qty:1,chance:0.4}]},
    fleeThreshold:0.3, abilities:[{name:'Pack Rush', effect:'attack+2 if ally present'}]
  },
  plains_grazer_bull:{
    name:'Plains Grazer Bull', hp:22, maxHp:22, attack:6, defense:4, morale:11,
    desc:'A massive territorial grazer. Does not retreat until cornered past breaking.',
    loot:{gold:0, item:'Grazer Horn', materials:[{id:'bone_shard',qty:2,chance:0.6},{id:'beast_hide',qty:2,chance:0.5}]},
    fleeThreshold:0.1, abilities:[{name:'Charge', effect:'first attack+4, defense-2 that round'}]
  },
  plains_scavenger_kite:{
    name:'Plains Scavenger Kite', hp:8, maxHp:8, attack:6, defense:5, morale:5,
    desc:'A broad-winged carrion bird that has learned not to wait. Attacks from above.',
    loot:{gold:0, item:'Kite Feather', materials:[{id:'beast_hide',qty:1,chance:0.4}]},
    fleeThreshold:0.4, abilities:[{name:'Dive Strike', effect:'first attack roll+3'}]
  },
  highland_rockjaw:{
    name:'Highland Rockjaw', hp:14, maxHp:14, attack:6, defense:4, morale:8,
    desc:'A burrowing ambush predator. The jaw locks on contact.',
    loot:{gold:0, item:'Rockjaw Mandible', materials:[{id:'bone_shard',qty:2,chance:0.7},{id:'beast_hide',qty:1,chance:0.5}]},
    fleeThreshold:0.25, abilities:[{name:'Lockjaw', effect:'on hit, target -1 to next roll'}]
  },
  highland_ridge_viper:{
    name:'Highland Ridge Viper', hp:7, maxHp:7, attack:5, defense:3, morale:5,
    desc:'Length of a walking staff. Keeps striking after the first hit.',
    loot:{gold:0, item:'Ridge Viper Venom Sac', materials:[{id:'ash_compound',qty:1,chance:0.6},{id:'beast_hide',qty:1,chance:0.3}]},
    fleeThreshold:0.2, abilities:[{name:'Relentless', effect:'attacks twice on successful hit'}]
  },
  highland_fog_stalker:{
    name:'Highland Fog Stalker', hp:16, maxHp:16, attack:5, defense:7, morale:9,
    desc:'Hunts by sound in highland fog. Defense increases in obscured terrain.',
    loot:{gold:0, item:'Fog Stalker Pelt', materials:[{id:'beast_hide',qty:2,chance:0.6},{id:'frontier_fiber',qty:1,chance:0.5}]},
    fleeThreshold:0.35, abilities:[{name:'Fog Cover', effect:'defense+2 in natural terrain'}]
  },
  coastal_shorecat:{
    name:'Coastal Shorecat', hp:11, maxHp:11, attack:7, defense:4, morale:6,
    desc:'A flat-bodied predator. Breathes above and below. Never far from tidal zones.',
    loot:{gold:0, item:'Shorecat Claw', materials:[{id:'bone_shard',qty:2,chance:0.6},{id:'ash_compound',qty:1,chance:0.3}]},
    fleeThreshold:0.4, abilities:[{name:'Ambush Pounce', effect:'first attack+3'}]
  },
  coastal_tide_crawler:{
    name:'Coastal Tide Crawler', hp:18, maxHp:18, attack:5, defense:8, morale:10,
    desc:'Shell the color of tide-dark stone. Slow but hits harder than its size suggests.',
    loot:{gold:0, item:'Tide Crawler Shell Plate', materials:[{id:'enforcement_resin',qty:1,chance:0.5},{id:'bone_shard',qty:2,chance:0.7}]},
    fleeThreshold:0.15, abilities:[{name:'Shell Defense', effect:'defense+3 when stationary'}]
  },
  mountain_ironwing:{
    name:'Mountain Ironwing', hp:13, maxHp:13, attack:7, defense:5, morale:7,
    desc:'A raptor with a six-foot wingspan. Hunts large prey. Attacks from above.',
    loot:{gold:0, item:'Ironwing Talon', materials:[{id:'beast_hide',qty:1,chance:0.5},{id:'iron_shard',qty:1,chance:0.4}]},
    fleeThreshold:0.45, abilities:[{name:'Aerial Strike', effect:'first attack ignores armor bonus'}]
  },
  mountain_stoneback:{
    name:'Mountain Stoneback', hp:20, maxHp:20, attack:5, defense:8, morale:12,
    desc:'Something between a lizard and a boulder. Back plates deflect most strikes.',
    loot:{gold:0, item:'Stoneback Plate', materials:[{id:'enforcement_resin',qty:1,chance:0.5},{id:'bone_shard',qty:2,chance:0.6}]},
    fleeThreshold:0.1, abilities:[{name:'Stone Hide', effect:'reduces incoming damage by 1'}]
  },
  mountain_crevice_asp:{
    name:'Mountain Crevice Asp', hp:7, maxHp:7, attack:6, defense:4, morale:5,
    desc:'Thin enough to thread through rock cracks. Never misses on the first strike.',
    loot:{gold:0, item:'Crevice Asp Fang', materials:[{id:'ash_compound',qty:2,chance:0.7},{id:'beast_hide',qty:1,chance:0.3}]},
    fleeThreshold:0.15, abilities:[{name:'First Strike', effect:'always attacks first in round 1'}]
  },
  forest_shadowmaw:{
    name:'Forest Shadowmaw', hp:14, maxHp:14, attack:6, defense:5, morale:8,
    desc:'A forest predator that stalks from the canopy. Silent until committed.',
    loot:{gold:0, item:'Shadowmaw Fang', materials:[{id:'beast_hide',qty:2,chance:0.6},{id:'shadow_residue',qty:1,chance:0.3}]},
    fleeThreshold:0.35, abilities:[{name:'Canopy Drop', effect:'first attack+2, ignores shield bonus'}]
  },
  forest_vine_horror:{
    name:'Forest Vine Horror', hp:17, maxHp:17, attack:4, defense:6, morale:13,
    desc:'A mass of animate root and vine. Slow but nearly impossible to push back.',
    loot:{gold:0, item:'Vine Horror Core', materials:[{id:'frontier_fiber',qty:3,chance:0.7},{id:'ash_compound',qty:1,chance:0.4}]},
    fleeThreshold:0.05, abilities:[{name:'Entangle', effect:'on hit, target -1 attack for 2 rounds'}]
  },
  forest_needle_crow:{
    name:'Forest Needle Crow', hp:6, maxHp:6, attack:5, defense:4, morale:4,
    desc:'A crow with spine-like beak feathers. Hunts in numbers. Each additional crow hits harder.',
    loot:{gold:0, item:'Needle Crow Spine', materials:[{id:'beast_hide',qty:1,chance:0.5},{id:'bone_shard',qty:1,chance:0.4}]},
    fleeThreshold:0.5, abilities:[{name:'Flock', effect:'attack+1 per additional needle crow in combat'}]
  },
  ash_zone_cinder_rat:{
    name:'Ash-Zone Cinder Rat', hp:6, maxHp:6, attack:4, defense:2, morale:4,
    desc:'Adapted to ash-zone heat. The mineral compound on its teeth works slowly.',
    loot:{gold:0, item:'Cinder Rat Teeth', materials:[{id:'ash_compound',qty:1,chance:0.8},{id:'beast_hide',qty:1,chance:0.4}]},
    fleeThreshold:0.2, abilities:[{name:'Ash Bite', effect:'on hit, target takes 1 extra damage next round'}]
  },
  ash_zone_ember_hound:{
    name:'Ash-Zone Ember Hound', hp:15, maxHp:15, attack:6, defense:5, morale:8,
    desc:'Mineral-dust fur absorbs heat. Hunts in ash-zone travel corridors.',
    loot:{gold:0, item:'Ember Hound Pelt', materials:[{id:'ash_compound',qty:2,chance:0.5},{id:'beast_hide',qty:2,chance:0.6}]},
    fleeThreshold:0.3, abilities:[{name:'Heat Resistance', effect:'immune to fire-type attack bonuses'}]
  },
  ice_locked_frostgrip:{
    name:'Ice-Locked Frostgrip', hp:19, maxHp:19, attack:5, defense:6, morale:11,
    desc:'A territorial predator adapted to sub-axis conditions. Slow but relentless.',
    loot:{gold:0, item:'Frostgrip Claw', materials:[{id:'bone_shard',qty:2,chance:0.7},{id:'beast_hide',qty:2,chance:0.5}]},
    fleeThreshold:0.15, abilities:[{name:'Relentless Pursuit', effect:'cannot be escaped via Retreat without combat resolution'}]
  },
  ice_locked_polar_asp:{
    name:'Ice-Locked Polar Asp', hp:8, maxHp:8, attack:5, defense:3, morale:5,
    desc:'Hunts warm-blooded prey by heat signature. First strike in cold terrain.',
    loot:{gold:0, item:'Polar Asp Scale', materials:[{id:'ash_compound',qty:1,chance:0.6},{id:'beast_hide',qty:1,chance:0.4}]},
    fleeThreshold:0.2, abilities:[{name:'Heat Sense', effect:'attack+2 in ice-locked terrain'}]
  },
```

- [ ] **Step 2: Verify the 18 keys are present**

```bash
grep -c "plains_dust_hound\|plains_grazer_bull\|plains_scavenger_kite\|highland_rockjaw\|highland_ridge_viper\|highland_fog_stalker\|coastal_shorecat\|coastal_tide_crawler\|mountain_ironwing\|mountain_stoneback\|mountain_crevice_asp\|forest_shadowmaw\|forest_vine_horror\|forest_needle_crow\|ash_zone_cinder_rat\|ash_zone_ember_hound\|ice_locked_frostgrip\|ice_locked_polar_asp" ledger-of-ash.html
```
Expected: 36 (each key appears twice — once in ENEMY_TEMPLATES, once in BIOME_ENCOUNTER_POOLS reference count at least)

- [ ] **Step 3: Fix enc_fight skill in `_makeCombatChoice`**

In `content/travel_corridors.js`, find `_makeCombatChoice` (~line 832). Find the `enc_fight` choice object and add `skill: 'might'`:

Find:
```js
    var fightChoice = {
      text: 'Force a confrontation before the situation decides for you.',
      tag: 'bold',
      cid: 'enc_fight',
```

Replace with:
```js
    var fightChoice = {
      text: 'Force a confrontation before the situation decides for you.',
      tag: 'bold',
      skill: 'might',
      cid: 'enc_fight',
```

- [ ] **Step 4: Syntax check**

```bash
node --check content/travel_corridors.js
```
Expected: no output.

- [ ] **Step 5: Browser smoke test**

Open game, travel to any location. When a corridor encounter fires, click the bold enc_fight choice.
Expected:
- Roll line shows `d20: N + [Might bonus]` (not "Wits 0")
- Combat entry screen shows the biome creature name (e.g. "Plains Dust Hound"), not an error
- No `[startCombat] unknown enemy key` in console

- [ ] **Step 6: Commit**

```bash
git add ledger-of-ash.html content/travel_corridors.js
git commit -m "feat(combat): add 18 biome non-humanoid creatures; fix enc_fight skill to might"
```

---

## Task 6 — Fix P1: Add Enemy Stat Preview to `enterCombat()` Entry Overlay

**What:** `enterCombat()` renders a choice overlay (Press/Defend/Talk/Retreat) but shows no enemy HP, attack, or flavor text. The HP bar only appears once combat starts in `renderCombatRound()`. Players enter combat blind. Fix: add a compact stat block to the `enterCombat` overlay — enemy name, HP bar, defense value, and the one-line `desc` field.

**Files:**
- Modify: `ledger-of-ash.html` (~line 17379, the `enterCombat` function)

- [ ] **Step 1: Find the enterCombat HTML block**

Search for the string `HOW DO YOU RESPOND` in `ledger-of-ash.html`. The surrounding code is the `enterCombat` function. It should look like:

```js
  var html = '<div class="combat-entry' + (ctx.isBoss ? ' encounter--boss' : '') + '">'
    + '<div class="encounter-header">' + safeAttr(t.name) + '</div>'
    + '<div class="encounter-intent">' + intentText + '</div>'
    + '<div class="encounter-prompt">HOW DO YOU RESPOND</div>'
    + choiceHtml
    + '</div>';
```

- [ ] **Step 2: Insert stat block between header and intent**

Replace the `html` assembly block to add the stat preview after the header:

```js
  var _hpPct = Math.round((t.hp / t.maxHp) * 100);
  var _hpBarHtml = '<div class="enemy-hp-row" style="margin:4px 0 8px">'
    + '<div style="font-size:10px;font-family:Cinzel,serif;color:var(--ink-dim);margin-bottom:2px">HP ' + t.hp + ' / ' + t.maxHp + ' &nbsp;·&nbsp; DEF ' + (t.defense || 0) + '</div>'
    + '<div class="enemy-hp-bar" style="width:100%;height:4px;background:var(--coal);border-radius:2px">'
    + '<div class="enemy-hp-fill" style="width:' + _hpPct + '%;height:100%;background:var(--danger);border-radius:2px;transition:width 0.3s"></div>'
    + '</div>'
    + (t.desc ? '<div style="font-size:11px;color:var(--ink-dim);font-style:italic;margin-top:4px">' + t.desc + '</div>' : '')
    + '</div>';

  var html = '<div class="combat-entry' + (ctx.isBoss ? ' encounter--boss' : '') + '">'
    + '<div class="encounter-header">' + safeAttr(t.name) + '</div>'
    + _hpBarHtml
    + '<div class="encounter-intent">' + intentText + '</div>'
    + '<div class="encounter-prompt">HOW DO YOU RESPOND</div>'
    + choiceHtml
    + '</div>';
```

- [ ] **Step 3: Browser smoke test**

Trigger combat via authority confrontation fight option (set heat=5 in localStorage, load save, trigger confrontation, fail Phase 2, pick fight):
```js
// In DevTools: patch save with heat=5
var s = JSON.parse(localStorage.getItem('loa_slot_1'));
s.heat = {shelk: 5}; s.stage = 'Stage II';
s.flags = s.flags || {}; s.flags.stage1_narrative_complete = true;
localStorage.setItem('loa_slot_1', JSON.stringify(s));
loadFromSlot(1); showScreen('screen-game');
enterAuthorityConfrontation('shelk_patrol', {polity:'shelk', source:'heat_threshold'});
```
Then fail Phase 1, pick "They are not leaving you a choice. Commit to it." in Phase 2.
Expected:
- Enemy name shows in header ("Iron Accord Enforcer" or "Warden Lieutenant")
- HP bar renders (red fill, correct %)
- Desc text shows in italic below bar

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(combat): add HP bar + stat preview to enterCombat() entry overlay"
```

---

## Final Gate

- [ ] **Run headless spec**

```powershell
Set-Location "C:\Users\CEO\ledger-of-ash"
cmd /c "npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line"
```
Expected: 4/4 SUCCESS, 0 dead-ends. Check `[coverage]` block — verify `soreheim`, `guildheart`, `mimolot` now show non-zero sp2.

- [ ] **Run content validators**

```bash
node tests/content/validate-content.js && node tests/content/validate-flags.js && node tests/content/validate-structure.js
```
Expected: 0 FAIL on all three.

- [ ] **Run headed spec + screenshot analysis**

```powershell
cmd /c "npx playwright test tests/e2e/playtest-headed.spec.js --reporter=line"
```
After run: screenshot analysis using chrome-devtools-mcp with all 6 game-design skills (balance, polish, fun, tutorial, appeal-engagement, feedback-loop). V33_2 is canon ground truth for narrative/voice analysis.

---

## Self-Review Notes

**Spec coverage check:**
- D10 ✓ Task 1 (window.WORLD_LOCATIONS fix)
- D9 ✓ Task 1 (polity derivation reorder)
- D3 engine ✓ Task 3 (seen[undefined])
- D3 content ✓ Task 4 (result: → fn:)
- D11 ✓ Task 2 (polity key extraction)
- D2 ✓ Task 2 (skill key rename)
- D7 ✓ Task 5 (18 creature templates)
- D8 ✓ Task 5 (enc_fight skill: 'might')
- D1 ✓ Task 6 (HP bar in enterCombat entry)
- D6 (deescalate invisible border) — NOT included. Borderless de-escalation with green bg tint is a valid design. Addressing in a future polish pass.

**Placeholder scan:** No TBDs. All code blocks contain actual implementation.

**Type consistency:** `skill: 'charm'/'finesse'/'might'` used consistently in Tasks 2 and 5. `polity` variable name consistent across Task 1 and 2 callsites.
