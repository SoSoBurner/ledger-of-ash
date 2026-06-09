# Ledger of Ash — Repair Sprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Repair all broken, orphaned, inconsistent, and silently-failing code across the engine and content files — no new features, no additive content, only fixes.

**Architecture:** Single-file HTML game (`ledger-of-ash.html`, ~16K lines vanilla ES5) with content scripts in `content/`. All fixes go directly into source files. No build step. Test with validators (`node tests/content/validate-*.js`) and headless Playwright (`npx playwright test tests/e2e/playtest-headless.spec.js`).

**Tech Stack:** Vanilla ES5 JS, HTML, CSS. Playwright for E2E. Node.js for validators.

---

## File Map

| File | Tasks |
|------|-------|
| `ledger-of-ash.html` | 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14 |
| `content/stage1_boss.js` | 5 |
| `content/aurora_crown_commune_to_shelk_arc.js` | 9, 15 |
| `content/cosmoria_to_shelk_arc.js` | 9, 15 |
| `content/glasswake_commune_to_shelk_arc.js` | 9, 15 |
| `content/guildheart_hub_to_shelk_arc.js` | 9, 15 |
| `content/harvest_circle_to_shelk_arc.js` | 9, 15 |
| `content/ithtananalor_to_shelk_arc.js` | 9, 15 |
| `content/mimolot_academy_to_shelk_arc.js` | 9, 15 |
| `content/panim_haven_to_shelk_arc.js` | 9, 15 |
| `content/shirshal_to_shelk_arc.js` | 9, 15 |
| `content/soreheim_proper_to_shelk_arc.js` | 9, 15 |
| `content/sunspire_haven_to_shelk_arc.js` | 9, 15 |
| `content/whitebridge_commune_to_shelk_arc.js` | 9, 15 |
| `content/districts_stage1_enriched_choices.js` | 16 |
| `content/ithtananalor_to_shelk_arc.js` | 16 |
| `content/shirshal_stage1_enriched_choices.js` | 16 |
| `content/fairhaven_stage1_enriched_choices.js` | 16 |
| `content/guildheart_hub_stage2_enriched_choices.js` | 16 |
| `content/stage2_enriched_choices.js` | 16 |
| `content/combat_midspine.js` | 16 |
| `content/aurora_crown_commune_stage2_enriched_choices.js` | 16 |
| `content/magic_midspine.js` | 16 |
| `content/soreheim_proper_to_shelk_arc.js` | 16 |

---

## Task 1: Complete getDefaultG() — Add 15+ Missing Properties

**Problem:** `getDefaultG()` is missing properties that runtime code depends on. On new games, these cause silent failures: crafting breaks (`materials`), travel breaks (`travelMode`, `supplyTier`), camp mechanics break (`consecutiveSleepless`, `_heatDCMod`), supply depletes from zero (`supply`).

**Files:**
- Modify: `ledger-of-ash.html` ~line 9960 (getDefaultG function)

- [ ] **Step 1: Open `ledger-of-ash.html` and find `getDefaultG()` at line ~9960**

The function currently ends at line 9995 with `schemaVersion:6`. The existing keys already include: name, archetype, background, level, xp, renown, hp, maxHp, gold, skills, traits, location, timeIndex, dayCount, axisTick, axisInverted, stage, stageLabel, benevolence, orderAxis, localityHeat, tensionLevel, factions, quests, questHints, journal, journalRecords, history, inventory, equipped, wounds, fatigue, recoveryState, npcMemory, trainingDisadvantage, unlockedAbilities, unlockedCombatAbilities, abilityUsedThisRest, _pendingAbilityBonus, _pendingAbilitySkill, _pendingDcReduce, companions, tutorialFlags, dead, rivalAdventurers, marenRenown, marenRevealed, stageProgress, telemetry, worldClocks, discoveries, contacts, suspects, investigationProgress, flags, rivalId, factionHostility, stage2_rival_status, stage2_evidence_shared, stage2_faction_declared, nomdara_last_visit_locality, seenChoices, startingLocality, _campoutPenalty, campoutDay, trainingCooldowns, trainingSessionsUsed, lastTrainedStat, lastResult, masteryXP, masteryPurchased, masteryBonuses, traitProgress, unlockedTraits, spentAbilities, archetypeBaseStats, sorePlotCredits, soreCreditUsed, shopCreditBoost, statCap, restCount, heat, tempBonuses, newNoticeCount, schemaVersion.

- [ ] **Step 2: Add missing properties at line 9994, before `schemaVersion:6`**

After `newNoticeCount:0,` and before `schemaVersion:6`, insert:

```js
    materials:{},
    supply:10, travelMode:'foot', travelPace:'normal',
    journeyPack:[], supplyTier:'standard', journeyFatigue:0,
    recentOutcomeType:null, recentChoiceIds:[], shopSeen:{}, tavernRumorsSeen:{},
    narrationUpdateCounter:0, _narrationFading:false, district:null,
    consecutiveSleepless:0, watchPosted:false, _heatDCMod:0,
    pendingVictoryCallback:null,
    abilities:[],
    factionClocks:null,
    _pendingHeatEncounter:null,
    inSettlement:true,
```

- [ ] **Step 3: Verify the function still parses (no missing commas)**

```bash
node -e "const fs=require('fs'); const h=fs.readFileSync('ledger-of-ash.html','utf8'); console.log('parse check: getDefaultG found at', h.indexOf('function getDefaultG'));"
```

Expected: prints `parse check: getDefaultG found at [number > 0]`

- [ ] **Step 4: Run headless spec baseline**

```bash
cd C:/Users/CEO/ledger-of-ash && npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line 2>&1 | tail -10
```

Expected: 4/4 families pass (same as before).

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(engine): add 15 missing properties to getDefaultG() — materials, travelMode, supply, abilities, etc."
```

---

## Task 2: Remove Dead Code — showEnforcementEncounter, gainXP (uppercase), _pendingHeatEncounter

**Problem:** Three dead code items waste lines and cause maintenance confusion:
1. `showEnforcementEncounter()` + `resolveEnforcementChoice()` (lines 13849–13900, ~52 lines) — superseded by `enterAuthorityConfrontation`, never called
2. `gainXP(n)` at line 12952 — dead uppercase duplicate of `gainXp(n)` at line 12256
3. `G._pendingHeatEncounter` is set in `addHeat()` but never read or acted on — dead accumulation

**Files:**
- Modify: `ledger-of-ash.html` lines 12952, 13849–13900, 9524–9527

- [ ] **Step 1: Find and delete `gainXP` (uppercase) at line ~12952**

Find the block:
```js
function gainXP(n) {
```
Delete the entire function (it duplicates `gainXp` exactly). Should be 3–5 lines.

- [ ] **Step 2: Find and delete `showEnforcementEncounter` block at lines ~13849–13900**

Find:
```js
function showEnforcementEncounter() {
```
Delete from that line through the closing `}` of the function (including `resolveEnforcementChoice` inside it). Approximately 52 lines.

- [ ] **Step 3: Remove `_pendingHeatEncounter` set-but-never-read in `addHeat()`**

In `addHeat()` (around line 9520), find:
```js
if (!G._pendingHeatEncounter || G._pendingHeatEncounter.level < t) {
  G._pendingHeatEncounter = { polity, level: t };
}
```
Delete those 3 lines. The property default `null` added in Task 1 means existing save migration won't break. The actual encounter logic in `checkHeatConsequences()` is independent and still works.

- [ ] **Step 4: Verify validators still pass**

```bash
cd C:/Users/CEO/ledger-of-ash && node tests/content/validate-content.js 2>&1 | tail -5
```

Expected: 0 FAILs.

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(engine): remove dead code — showEnforcementEncounter, gainXP duplicate, _pendingHeatEncounter dead accumulation"
```

---

## Task 3: Fix G.flags Null Guards and Reconcile G.abilities / unlockedAbilities

**Problem:** Three sites access `G.flags.x` without guarding `G.flags` for null. If `G.flags` is null at early init (which is possible per CLAUDE.md), these crash. Also, `awardAbility()` pushes to `G.abilities` but only `unlockedAbilities` exists in getDefaultG() — two parallel arrays with no deduplication.

**Files:**
- Modify: `ledger-of-ash.html` lines 10323, 10564, 10568, ~13077

- [ ] **Step 1: Fix null guard at line ~10323 in `showOnboarding()`**

Find:
```js
if (!G || G.flags.onboarding_complete) return;
```
Replace with:
```js
if (!G || !G.flags || G.flags.onboarding_complete) return;
```

- [ ] **Step 2: Fix two similar null guards at lines ~10564 and ~10568**

Find:
```js
if (G && !G.flags.onboarding_complete)
```
Replace with:
```js
if (G && G.flags && !G.flags.onboarding_complete)
```

Find (nearby):
```js
if (G && !G.flags.mystery_hook_shown)
```
Replace with:
```js
if (G && G.flags && !G.flags.mystery_hook_shown)
```

- [ ] **Step 3: Reconcile G.abilities — update `awardAbility()` to use `unlockedAbilities`**

In `awardAbility()` at line ~13077, find:
```js
if (!G.abilities) G.abilities = [];
G.abilities.push(abilityId);
```
Replace with:
```js
if (!G.unlockedAbilities) G.unlockedAbilities = [];
if (!G.unlockedAbilities.includes(abilityId)) G.unlockedAbilities.push(abilityId);
```

Then find any reads of `G.abilities` (search `G\.abilities`) in the HTML and update to `G.unlockedAbilities`. Remove the `abilities:[]` line added to getDefaultG() in Task 1.

- [ ] **Step 4: Run headless spec to verify no regression**

```bash
cd C:/Users/CEO/ledger-of-ash && npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line 2>&1 | tail -10
```

Expected: 4/4 pass.

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(engine): G.flags null guards at 3 sites; reconcile G.abilities into unlockedAbilities"
```

---

## Task 4: Fix buyShopItem Collision — Rename Legacy 1-Arg Version

**Problem:** Two `buyShopItem` functions exist. The 2-arg version at line 15348 (uses `PLACES_DATA`, called from the Places overlay) is overwritten by the 1-arg version at line 16982 (uses `LOCALITY_SHOPS`). The Places overlay shop system is silently broken. Fix: rename the 1-arg version to `buyLegacyShopItem` and update its sole onclick caller.

**Files:**
- Modify: `ledger-of-ash.html` lines 16976, 16982

- [ ] **Step 1: Rename the function at line ~16982**

Find:
```js
function buyShopItem(itemId) {
  var items = LOCALITY_SHOPS[G.location] || [];
```
Change `buyShopItem` to `buyLegacyShopItem`:
```js
function buyLegacyShopItem(itemId) {
  var items = LOCALITY_SHOPS[G.location] || [];
```

- [ ] **Step 2: Update the onclick at line ~16976 that calls the 1-arg version**

Find (in the LOCALITY_SHOPS rendering block, ~line 16976):
```js
onclick="buyShopItem('" + item.id + "')"
```
Replace with:
```js
onclick="buyLegacyShopItem('" + item.id + "')"
```

- [ ] **Step 3: Verify `buyShopItem` now only has one definition (the 2-arg one)**

```bash
grep -n "function buyShopItem\|function buyLegacyShopItem" "C:/Users/CEO/ledger-of-ash/ledger-of-ash.html"
```

Expected output:
```
15348:function buyShopItem(shopId, itemId) {
16982:function buyLegacyShopItem(itemId) {
```

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(engine): rename 1-arg buyShopItem to buyLegacyShopItem — restores PLACES_DATA shop system"
```

---

## Task 5: Fix Stage 1 Boss Trigger Architecture

**Problem 1:** `STAGE1_BOSS_MODULE.shouldTrigger` is wired to a function that actually _fires_ the boss, not one that returns a boolean. The engine calls `shouldTrigger()` expecting a boolean, then immediately calls `trigger()` — creating a double-trigger call sequence.

**Problem 2:** Stage 1 boss `enterCombat` call is missing `{isBoss: true}`. Stage 2 boss has it; Stage 1 does not.

**Files:**
- Modify: `content/stage1_boss.js` lines ~214, ~292–299

- [ ] **Step 1: Open `content/stage1_boss.js` and read the bottom section (~lines 290–300)**

Find the `STAGE1_BOSS_MODULE` export block.

- [ ] **Step 2: Add a pure boolean check function and separate it from the fire function**

Find:
```js
window.STAGE1_BOSS_MODULE = {
  shouldTrigger: checkStage1BossTriggered,
  trigger: checkStage1BossTriggered,
```

Replace with:
```js
function canTriggerStage1Boss() {
  if (!G || !G.flags) return false;
  if (G.flags.stage1_boss_started || G.flags.stage1_narrative_complete) return false;
  if ((G.stageProgress && G.stageProgress[1]) < 5) return false;
  return true;
}

window.STAGE1_BOSS_MODULE = {
  shouldTrigger: canTriggerStage1Boss,
  trigger: checkStage1BossTriggered,
```

Note: the exact `canTrigger` condition should match whatever `checkStage1BossTriggered` currently guards at the top. Read the function body to extract the exact conditions before writing the check.

- [ ] **Step 3: Add `isBoss: true` to the `enterCombat` call at line ~214**

Find (in `triggerStage1MainBoss` or similar, line ~214):
```js
enterCombat(STAGE1_BOSS_NPC_MAIN, { customEnemy: bossEnemy, noRetreat: true });
```
Replace with:
```js
enterCombat(STAGE1_BOSS_NPC_MAIN, { customEnemy: bossEnemy, noRetreat: true, isBoss: true });
```

- [ ] **Step 4: Run headless spec — verify combat family still reaches Stage II**

```bash
cd C:/Users/CEO/ledger-of-ash && npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line 2>&1 | tail -15
```

Expected: 4/4 families pass, combat family reports Stage II reached.

- [ ] **Step 5: Commit**

```bash
git add content/stage1_boss.js
git commit -m "fix(engine): stage1_boss shouldTrigger now returns bool; separate trigger fn; add isBoss:true"
```

---

## Task 6: Add glasswake_commune to WORLD_LOCATIONS

**Problem:** `glasswake_commune` is listed in `STAGE1_ADJACENCY` and `TRAVEL_ROUTES` but has no entry in `WORLD_LOCATIONS`. `_showModeSelectInOverlay` does `var loc = WORLD_LOCATIONS[locId]` → null → early return. Travel to Glasswake silently fails.

**Files:**
- Modify: `ledger-of-ash.html` (WORLD_LOCATIONS object)
- Modify: `content/locality_narrations.js` (narration string — already has 'glasswake_commune' key)

- [ ] **Step 1: Find WORLD_LOCATIONS in `ledger-of-ash.html`**

```bash
grep -n "WORLD_LOCATIONS\s*=" "C:/Users/CEO/ledger-of-ash/ledger-of-ash.html" | head -5
```

- [ ] **Step 2: Find a nearby similar entry (e.g., `whitebridge_commune`) for format reference**

A typical entry looks like:
```js
whitebridge_commune: {
  id: 'whitebridge_commune',
  name: 'Whitebridge Commune',
  region: 'The Midlands',
  polity: 'union',
  type: 'commune',
  tier: 1,
  stage: 'Stage I',
  hasShops: false,
  hasTavern: false,
  desc: 'A trade-hub commune at the crossing point of three arterial roads.'
},
```

- [ ] **Step 3: Add the glasswake_commune entry**

Add after the `whitebridge_commune` entry (or in alphabetical order):
```js
glasswake_commune: {
  id: 'glasswake_commune',
  name: 'Glasswake Commune',
  region: 'The Midlands',
  polity: 'union',
  type: 'commune',
  tier: 1,
  stage: 'Stage I',
  hasShops: false,
  hasTavern: false,
  desc: 'A commune built around an ancient glasswake formation — crystalline structures that amplify atmospheric compounds. Guild-registered and closely monitored.'
},
```

- [ ] **Step 4: Verify `locality_narrations.js` already has a glasswake_commune entry**

```bash
grep -n "glasswake_commune" "C:/Users/CEO/ledger-of-ash/content/locality_narrations.js"
```

If it exists (it does — confirmed in audit), no action needed. If it doesn't exist for some reason, add:
```js
glasswake_commune: 'The glasswake formations rise along the commune's eastern boundary — translucent columns of compressed mineral glass that catch the light at angles no local can quite explain. Guild registration marks are embedded in the base of each formation. The commune itself smells faintly of lamp oil and something sharper underneath.',
```

- [ ] **Step 5: Run headless spec**

```bash
cd C:/Users/CEO/ledger-of-ash && npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line 2>&1 | tail -10
```

Expected: 4/4 pass.

- [ ] **Step 6: Commit**

```bash
git add ledger-of-ash.html content/locality_narrations.js
git commit -m "fix(engine): add glasswake_commune to WORLD_LOCATIONS — travel to Glasswake no longer silently fails"
```

---

## Task 7: Fix Journal System — showJournal() Category Keys + applyEffect Journal Handler

**Problem 1:** `showJournal()` filters `G.journalRecords` by categories `quest/field_note/faction/rival/companion/fact`. But `addJournal()` writes categories `evidence/intelligence/rumor/discovery/contact_made/complication`. Zero overlap — category sections are dead code.

**Problem 2:** `applyEffect` case `'journal'` calls `addJournal(fx.msg)`. But `locality_npcs.js` uses `{type:'journal', text:'...', category:'...'}` — field name is `text` not `msg`, and category is missing. All NPC-system journal entries silently write with undefined text and no category.

**Files:**
- Modify: `ledger-of-ash.html` (showJournal ~line 15527; applyEffect ~line 12767)

- [ ] **Step 1: Find `showJournal()` at ~line 15527 and locate the `byCategory` filter**

Find the block that builds `byCategory`. It will look like:
```js
var byCategory = {};
['quest','field_note','faction','rival','companion','fact'].forEach(function(cat) {
```

- [ ] **Step 2: Update the category list**

Replace:
```js
['quest','field_note','faction','rival','companion','fact'].forEach(function(cat) {
```
With:
```js
['evidence','intelligence','rumor','discovery','contact_made','complication','field_note'].forEach(function(cat) {
```

Note: `field_note` is kept because it is used by `travel_corridors.js` and the engine — it is a valid category despite not being in the CLAUDE.md list. Including it here ensures those entries also render.

- [ ] **Step 3: Verify the rendered HTML sections use the correct headings**

Find where `byCategory` sections are inserted into `jb.innerHTML`. The labels shown to the player should be human-readable. Find the `catSection` or equivalent rendering call and verify it maps each category key to a heading:
```js
var _catLabels = {
  evidence: 'Evidence',
  intelligence: 'Intelligence',
  rumor: 'Rumors',
  discovery: 'Discoveries',
  contact_made: 'Contacts Made',
  complication: 'Complications',
  field_note: 'Field Notes'
};
```
Add this map if it doesn't exist; use it in the rendering loop.

- [ ] **Step 4: Fix `applyEffect` journal handler at line ~12767**

Find:
```js
case 'journal':   addJournal(fx.msg); break;
```
Replace with:
```js
case 'journal':   addJournal(fx.text || fx.msg || '', fx.category || 'discovery'); break;
```

- [ ] **Step 5: Verify validators**

```bash
cd C:/Users/CEO/ledger-of-ash && node tests/content/validate-structure.js 2>&1
```

Expected: same 4 FAILs (travel_corridors field_note — acceptable) or fewer, no new failures.

- [ ] **Step 6: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(engine): showJournal() category keys now match addJournal() categories; applyEffect journal uses fx.text + category"
```

---

## Task 8: applyEffect — Add Rival Handler

**Problem:** `{type:'rival', amount:1}` is used in 8 content files to advance the rival clock, but has no case in `applyEffect()`. The rival world clock never advances from choice effects.

**Files:**
- Modify: `ledger-of-ash.html` (`applyEffect` function, ~line 12798)

- [ ] **Step 1: Find the closing `}` of `applyEffect()`'s switch at line ~12798**

The current switch ends with `case 'suspect': { ... }` then `}`. The closing `}` before `function checkWorldClockThresholds()`.

- [ ] **Step 2: Add the rival case before the closing `}`**

After the `case 'suspect'` block and before the final `}` of the switch:
```js
    case 'rival':
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.rival = Math.min(10, (G.worldClocks.rival || 0) + (fx.amount || fx.n || 1));
      break;
```

- [ ] **Step 3: Verify with a grep that no other type handler is accidentally affected**

```bash
grep -n "case 'rival'" "C:/Users/CEO/ledger-of-ash/ledger-of-ash.html"
```

Expected: one result at the line just added.

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(engine): applyEffect handles {type:'rival'} — rival world clock now advances from content effects"
```

---

## Task 9: Tag System Repairs — NPC Tag, Double-Load, ArcGate plot:'main'

**Problem A:** `NPC` tag (523 uses in content) is not in `SEMANTIC_SAFE_TAGS`. All NPC social choices default to 'risky' DC (13) instead of 'safe' DC (7).

**Problem B:** `locality_npcs.js` is referenced twice in `ledger-of-ash.html` `<script>` tags — double-initialization.

**Problem C:** All 12 `*_to_shelk_arc.js` ArcGate choices are missing `plot: 'main'`. ArcFinale choices have it; ArcGate choices (the departure decision) don't. Blue border won't appear on the departure choice.

**Files:**
- Modify: `ledger-of-ash.html` (SEMANTIC_SAFE_TAGS ~line 11204; locality_npcs.js script tag)
- Modify: all 12 `content/*_to_shelk_arc.js` files

- [ ] **Step 1: Add 'NPC' and 'Evidence' to SEMANTIC_SAFE_TAGS**

Find at line ~11204:
```js
var SEMANTIC_SAFE_TAGS = ['Investigation', 'NPC', 'Social', 'Lore', ...
```

Wait — the audit found NPC is NOT in SEMANTIC_SAFE_TAGS. Find the actual line:
```bash
grep -n "SEMANTIC_SAFE_TAGS" "C:/Users/CEO/ledger-of-ash/ledger-of-ash.html"
```

The current array will be something like:
```js
var SEMANTIC_SAFE_TAGS = ['Investigation','Social','Lore','Maritime','Archive','Observation','Rumor','Trade','Civic','Rest','Stealth','Craft','Study','Retreat','Gather','Intelligence','Discovery','Survey','Records','Inquiry'];
```

Add `'NPC'` and `'Evidence'` to this array:
```js
var SEMANTIC_SAFE_TAGS = ['Investigation','NPC','Evidence','Social','Lore','Maritime','Archive','Observation','Rumor','Trade','Civic','Rest','Stealth','Craft','Study','Retreat','Gather','Intelligence','Discovery','Survey','Records','Inquiry'];
```

- [ ] **Step 2: Remove duplicate `<script src="content/locality_npcs.js">` tag**

```bash
grep -n "locality_npcs" "C:/Users/CEO/ledger-of-ash/ledger-of-ash.html"
```

Expected: two results. Remove one (the second occurrence).

- [ ] **Step 3: Add `plot: 'main'` to ArcGate choices in all 12 arc files**

For each of the 12 arc files, find the choice with `tags: ['ArcGate', ...]` and add `plot: 'main'` to it. The pattern for each:

**`content/aurora_crown_commune_to_shelk_arc.js`**: Find the choice at line ~197 with `tags: ['ArcGate', 'Decision']`. Add `plot: 'main',` to it:
```js
{
  id: 'arc_gate_aurora',
  plot: 'main',
  label: ...,
  tags: ['ArcGate', 'Decision'],
```

Repeat for all 12 files:
- `cosmoria_to_shelk_arc.js`
- `glasswake_commune_to_shelk_arc.js`
- `guildheart_hub_to_shelk_arc.js`
- `harvest_circle_to_shelk_arc.js`
- `ithtananalor_to_shelk_arc.js`
- `mimolot_academy_to_shelk_arc.js`
- `panim_haven_to_shelk_arc.js`
- `shirshal_to_shelk_arc.js`
- `soreheim_proper_to_shelk_arc.js` (two ArcGate choices — add to both)
- `sunspire_haven_to_shelk_arc.js`
- `whitebridge_commune_to_shelk_arc.js`

Also add `plot: 'main'` to the ArcFinale choice in `content/stage2_shadowhands_arc.js` (found at the choice with `tags: ['ArcFinale', 'Investigation', 'Decision']`).

- [ ] **Step 4: Verify with grep**

```bash
grep -rn "ArcGate" "C:/Users/CEO/ledger-of-ash/content/" | grep -v "plot.*main"
```

Expected: 0 results (all ArcGate choices now have plot:'main').

- [ ] **Step 5: Run validators**

```bash
cd C:/Users/CEO/ledger-of-ash && node tests/content/validate-content.js 2>&1 | tail -5
```

Expected: 0 FAILs.

- [ ] **Step 6: Commit**

```bash
git add ledger-of-ash.html content/*_to_shelk_arc.js content/stage2_shadowhands_arc.js
git commit -m "fix(content): NPC+Evidence→SAFE_TAGS; remove locality_npcs.js double-load; plot:'main' on all 12 ArcGate choices"
```

---

## Task 10: Fix Roll Notation Skill Label Display

**Problem:** Roll notation is already rendered at line 11317 via `G._lastRollInfo`. The `_riSKD` map at line 11315 only has old internal keys (`combat/stealth/survival/lore/persuasion`). New display-name keys (`wits/finesse/vigor/might/charm/spirit`) are not in the map — they display as raw lowercase strings instead of capitalized labels.

**Files:**
- Modify: `ledger-of-ash.html` line ~11315

- [ ] **Step 1: Find the `_riSKD` map at line ~11315**

Current code:
```js
var _riSKD = {combat:'Might',stealth:'Finesse',survival:'Vigor',lore:'Wits',persuasion:'Charm',craft:'Spirit'};
```

- [ ] **Step 2: Add display-name keys**

Replace with:
```js
var _riSKD = {
  combat:'Might', stealth:'Finesse', survival:'Vigor', lore:'Wits', persuasion:'Charm',
  might:'Might', finesse:'Finesse', vigor:'Vigor', wits:'Wits', charm:'Charm', spirit:'Spirit', craft:'Craft'
};
```

- [ ] **Step 3: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(engine): roll notation skill labels now handle display-name keys (wits/finesse/etc.)"
```

---

## Task 11: Fix Lay Low Visibility — Show When Heat > 0

**Problem:** `lay_low` already reduces heat by 1 per polity. But the camp button is only shown when `worldClocks.watchfulness >= 3`. A player with high heat but low watchfulness cannot see the lay low option — they can't discharge heat even though the mechanic exists.

**Files:**
- Modify: `ledger-of-ash.html` line ~17399

- [ ] **Step 1: Find the lay low visibility toggle at line ~17399**

Current:
```js
if (layLowBtn) layLowBtn.style.display = ((G.worldClocks && G.worldClocks.watchfulness) || 0) >= 3 ? '' : 'none';
```

- [ ] **Step 2: Extend the condition to also show when any polity heat > 0**

Replace with:
```js
var _anyHeat = G.heat && Object.values(G.heat).some(function(v){ return v > 0; });
if (layLowBtn) layLowBtn.style.display = (((G.worldClocks && G.worldClocks.watchfulness) || 0) >= 3 || _anyHeat) ? '' : 'none';
```

- [ ] **Step 3: Also update the button description text to mention heat**

Find the `<button>` for lay_low at line ~2109:
```html
<div class="ca-desc">Go quiet for a day. Reduces Watchfulness by 1. Costs a day.</div>
```
Replace with:
```html
<div class="ca-desc">Go quiet for a day. Reduces Watchfulness and each polity heat by 1. Costs a day.</div>
```

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(engine): lay_low button shows when any polity heat > 0, not only when watchfulness >= 3"
```

---

## Task 12: Bold Choice Rewards — Renown +1 and Discovery Unlock

**Problem:** XP is flat across DC tiers — safe and bold choices yield identical rewards. By decision, XP stays flat but bold successes should grant +1 renown and increase the chance of archetype-gated choices appearing in the next pool.

**Implementation:** In `adaptEnrichedChoice()` at line ~11308, after `G._lastRollInfo` is processed and `_riSucceeded` is determined, add a bold-reward block for bold-tagged successes.

**Files:**
- Modify: `ledger-of-ash.html` lines ~11313–11320 (inside the `G._lastRollInfo` block in `adaptEnrichedChoice`)

- [ ] **Step 1: Find the success/failure determination block at line ~11313**

```js
var _riSucceeded = (G.lastResultType === 'success' || G.lastResultType === 'crit');
```

- [ ] **Step 2: Add bold reward after the roll notation line (after line ~11317)**

After the `addNarration(...roll notation...)` call, add:
```js
// Bold reward: renown + discovery unlock flag
if (_riSucceeded && (c.tag === 'bold' || (SEMANTIC_BOLD_TAGS || []).indexOf(c.tags && c.tags[0]) >= 0)) {
  G.renown = (G.renown || 0) + 1;
  G._boldSuccessThisSession = (G._boldSuccessThisSession || 0) + 1;
  if (typeof updateHUD === 'function') updateHUD();
}
```

- [ ] **Step 3: Use `_boldSuccessThisSession` in choice pool selection to boost archetype-gated options**

In `loadStageChoices()` where archetype-gated choices are filtered or weighted (search for `archetype` or `getArchetypeFamily` near the pool selection logic), add a discovery unlock boost:

Find the area near where choices are filtered by `c.archetypeGate` or similar. After that filter, add:
```js
// If bold successes this session > 0, include one extra archetype-gated choice if available
if ((G._boldSuccessThisSession || 0) > 0 && _archetypeGatedPool && _archetypeGatedPool.length > 0) {
  var _boldBonus = _archetypeGatedPool.filter(function(c){ return !_seenThisRun.has(c.id); })[0];
  if (_boldBonus) pool.push(_boldBonus);
}
```

Note: if the pool selection logic is complex, this step may require reading the actual code in `loadStageChoices()` to find the right insertion point. Search for `archetypeGate` or `getArchetypeFamily` to locate it.

- [ ] **Step 4: Add `_boldSuccessThisSession: 0` to getDefaultG() (already added in Task 1 block)**

Verify it exists:
```bash
grep -n "_boldSuccessThisSession" "C:/Users/CEO/ledger-of-ash/ledger-of-ash.html" | head -5
```

If not present in getDefaultG(), add it in the Task 1 properties block.

- [ ] **Step 5: Run headless spec**

```bash
cd C:/Users/CEO/ledger-of-ash && npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line 2>&1 | tail -10
```

Expected: 4/4 pass.

- [ ] **Step 6: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(engine): bold success rewards — renown +1 and discovery unlock boost on bold-tagged successes"
```

---

## Task 13: Implement G.tensionLevel — Wire shiftTension(+1)

**Problem:** `G.tensionLevel` (0–2) and `shiftTension(delta)` exist. At level 2, NPCs get red pulsing borders and a "Force it" combat flip option appears. But `shiftTension` is only called with `-1` (decrement) — never with `+1`. Tension never builds; the escalation system is permanently dormant.

**Implementation:**
- Increment tension (+1) when a stageProgress point is earned
- Increment tension (+1) when a Confrontation, Accusation, Exposure, or Betrayal tagged choice resolves
- Decrement tension (-1) on rest/sleep (in `campAction`)

**Files:**
- Modify: `ledger-of-ash.html` (adaptEnrichedChoice ~line 11308; campAction rest/sleep ~line 14380)

- [ ] **Step 1: Find where `stageProgress` is incremented in `adaptEnrichedChoice()`**

Search for `G.stageProgress` in the enriched choice resolution path. It will be something like:
```js
G.stageProgress[currentStage] = (G.stageProgress[currentStage] || 0) + 1;
```

After this increment, add:
```js
if (typeof shiftTension === 'function') shiftTension(1);
```

- [ ] **Step 2: Add tension increment for confrontation-class tags**

In the same area where `_riSucceeded` is computed (after line ~11313), add:
```js
var _TENSION_TAGS = ['Confrontation','Accusation','Exposure','Betrayal','Tribunal','Ambush'];
var _cTags = (c.tags || []).concat(c.tag ? [c.tag] : []);
if (_cTags.some(function(t){ return _TENSION_TAGS.indexOf(t) >= 0; })) {
  if (typeof shiftTension === 'function') shiftTension(1);
}
```

- [ ] **Step 3: Decrement tension on rest/sleep in campAction**

Find `campAction` around line 14380. Find the `case 'rest'` or `else if (type === 'rest')` block. At the start of that block, add:
```js
if (typeof shiftTension === 'function') shiftTension(-1);
```

Find the `doSleepScene()` call in `campAction` for `case 'sleep'`. Add the same before it:
```js
if (typeof shiftTension === 'function') shiftTension(-1);
```

- [ ] **Step 4: Verify tension level is shown in HUD somewhere meaningful**

```bash
grep -n "tensionLevel\|tension-warn\|tension-hot" "C:/Users/CEO/ledger-of-ash/ledger-of-ash.html" | head -10
```

The CSS classes `.npc-container.tension-warn` and `.tension-hot` are applied in NPC rendering. No HUD element exists for tensionLevel itself — this is fine. The visual feedback is via NPC border state.

- [ ] **Step 5: Run headless spec**

```bash
cd C:/Users/CEO/ledger-of-ash && npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line 2>&1 | tail -10
```

Expected: 4/4 pass.

- [ ] **Step 6: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(engine): wire G.tensionLevel — shiftTension(+1) on stageProgress + confrontation tags; -1 on rest/sleep"
```

---

## Task 14: Alignment Bars Always Visible on Character Sheet

**Problem:** Alignment bars on the character sheet are only conditionally rendered (threshold ±10 for badges). The user wants the bars always visible so players can see alignment state during normal play — currently there is no feedback at all until a badge appears at ±10.

**Files:**
- Modify: `ledger-of-ash.html` (`renderCharacterSheet()` ~line 15897)

- [ ] **Step 1: Find alignment bar rendering in `renderCharacterSheet()` at ~line 15897**

Look for the code that builds the `align-bar` HTML. It currently conditionally shows badges at ±10. The bars themselves (`align-fill benevolence` and `align-fill order-axis`) should always be visible.

- [ ] **Step 2: Ensure the alignment bar container always renders**

Find any condition that hides the alignment bars (e.g., `if (Math.abs(G.benevolence) > 0 || Math.abs(G.orderAxis) > 0)` or similar). Remove the condition so bars always render.

The fill widths should be:
```js
var _benPct = Math.round(((G.benevolence || 0) + 50) / 100 * 100); // 0% = cruel, 50% = neutral, 100% = benevolent
var _ordPct = Math.round(((G.orderAxis || 0) + 50) / 100 * 100);  // 0% = anarchy, 50% = neutral, 100% = order
```

The bar should always render; badges still only appear at ±10.

- [ ] **Step 3: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(ui): alignment bars always visible on character sheet — badges still appear at ±10 threshold"
```

---

## Task 15: Rewrite Arc File Labels — Inner Voice Standard

**Problem:** All 12 `*_to_shelk_arc.js` files have ~120+ choice labels written as plot briefings (25+ words, tells the player what they discovered) instead of the player's inner voice (under 15 words, present-tense thought). This violates the CLAUDE.md inner-voice rule.

**Rule:** Labels are the player's inner voice. Under 15 words. No question marks. No infinitives ("To X"). No NPC-directed verbs ("Ask X"). Should carry moral register — not revealed only in the result.

**Examples of violations and rewrites:**
- BAD: `"Arrive in Shelkopolis. Cosmoria's maritime laundering template and forty-one container arrivals all point to the secondary freight terminal underground channel leading to the dome."` (29 words, summary)
- GOOD: `"The container numbers don't match the terminal records. Someone made forty-one deliberate mistakes."` (14 words, inner voice)

**Files:**
- Modify: ALL 12 files in `content/` matching `*_to_shelk_arc.js`

- [ ] **Step 1: For each arc file, read all `label:` fields and rewrite to inner-voice format**

Process each file in order. For each `label:` value that is over 15 words or reads as a briefing:
1. Extract the core dramatic insight or decision it represents
2. Rewrite as 8–14 word inner-voice thought
3. Apply moral register — the label should carry the weight of the decision

**Reference rewrites (apply same logic to all 120+ labels):**

`cosmoria_to_shelk_arc.js`:
- BAD: `"Arrive in Shelkopolis. Cosmoria's maritime laundering template and forty-one container arrivals all point to the secondary freight terminal underground channel leading to the dome."`
- GOOD: `"Forty-one containers. Someone moved them very carefully and left no names."`

`glasswake_commune_to_shelk_arc.js`:
- BAD: `"The consortium's commercial liability calculation from Toman's notes: the shard amplification effect doubles the active concentration of any atmospheric compound released near a glasswake formation."`
- GOOD: `"Toman's numbers say twice the reach. Someone knew and filed nothing."`

`shirshal_to_shelk_arc.js`:
- BAD: `"The ghost visitor records from Shirshal's Bureau prove that Tazren's suppressed case had active investigators — who then stopped appearing in any official record. Move south."`
- GOOD: `"The names in the record stop at a specific date. Tazren's case ended the same week."`

`soreheim_proper_to_shelk_arc.js`:
- BAD: `"Cross into Shelkopolis proper. You are no longer a witness. You are an investigator with evidence in a city where that evidence matters."`
- GOOD: `"What started as noticing has become carrying something that matters."`

- [ ] **Step 2: After rewriting each file, verify word counts**

For each rewritten label, ensure it is under 15 words:
```bash
node -e "
var labels = require('./content/aurora_crown_commune_to_shelk_arc.js') || [];
// Labels check — run for each file
"
```

A simpler check: grep for long labels:
```bash
node -e "
var fs = require('fs');
var files = ['aurora_crown_commune_to_shelk_arc','cosmoria_to_shelk_arc','glasswake_commune_to_shelk_arc','guildheart_hub_to_shelk_arc','harvest_circle_to_shelk_arc','ithtananalor_to_shelk_arc','mimolot_academy_to_shelk_arc','panim_haven_to_shelk_arc','shirshal_to_shelk_arc','soreheim_proper_to_shelk_arc','sunspire_haven_to_shelk_arc','whitebridge_commune_to_shelk_arc'];
files.forEach(function(f) {
  var txt = fs.readFileSync('content/' + f + '.js', 'utf8');
  var matches = txt.match(/label:\s*['\"\`]([^'\"\`\n]{60,})/g) || [];
  if (matches.length) console.log(f + ': ' + matches.length + ' long labels');
});
"
```

Expected: 0 long labels across all 12 files.

- [ ] **Step 3: Run content validator**

```bash
cd C:/Users/CEO/ledger-of-ash && node tests/content/validate-content.js 2>&1 | tail -5
```

Expected: 0 FAILs.

- [ ] **Step 4: Commit**

```bash
git add content/*_to_shelk_arc.js
git commit -m "fix(content): rewrite all 120+ arc file labels to inner-voice standard (under 15 words, no briefings)"
```

---

## Task 16: Fix Forbidden Words in Player-Facing Text

**Problem:** The words `investigat*`, `meaningful`, and `official` (as vague adjective) appear in player-facing `label:`, `result:`, `successResult:`, and journal text. These are forbidden per `content/CLAUDE.md`.

**Confirmed violations (minimum — scan for more):**
- `investigat*` in result text: `districts_stage1_enriched_choices.js:867`, `ithtananalor_to_shelk_arc.js:48`, `shirshal_stage1_enriched_choices.js:672`, `fairhaven_stage1_enriched_choices.js:1194`, `guildheart_hub_stage2_enriched_choices.js:1162`
- `investigat*` in labels: `shirshal_stage1_enriched_choices.js:174`, `shirshal_stage1_enriched_choices.js:646`, `soreheim_proper_to_shelk_arc.js:338`
- `investigat*` in journal/addJournal calls: ~30+ instances across 20+ files
- `meaningful` in player-facing text: `stage2_enriched_choices.js:2049`
- `official` as vague adjective in labels: `combat_midspine.js:94`, `aurora_crown_commune_stage2_enriched_choices.js:1430`, `magic_midspine.js:49`

**Files:**
- Modify: multiple content files listed above

- [ ] **Step 1: Run a full scan to find all remaining violations**

```bash
grep -rn "investigat" "C:/Users/CEO/ledger-of-ash/content/" 2>/dev/null | grep -E "label:|text:|result:|successResult:|failResult:|addJournal" | grep -v "//\|var \|function \|tags:" > /tmp/investigat_violations.txt
cat /tmp/investigat_violations.txt | wc -l
```

```bash
grep -rn "\bmeaningful\b" "C:/Users/CEO/ledger-of-ash/content/" 2>/dev/null | grep -E "label:|text:|result:|'|\"" | grep -v "tags:"
```

```bash
grep -rn "\bofficial\b" "C:/Users/CEO/ledger-of-ash/content/" 2>/dev/null | grep -E "label:" | grep -iv "//\|record\|document\|minutes\|statement\|position"
```

- [ ] **Step 2: Fix each `investigat*` violation in result/success/fail text**

For each result text containing `investigator`, `investigation`, or `investigate`:
- Replace with specific alternatives: `the archivist`, `the courier`, `the one tracking this`, `the one asking`, or restructure the sentence to name the concrete action instead.

Examples:
- `"you're the first investigator he's met who found him first"` → `"you're the first one to find him before he was looking"`
- `"Connected investigators are easier to suppress"` → `"Connected voices are easier to suppress"`
- `"The investigator admits, quietly"` → `"She admits, quietly"`

- [ ] **Step 3: Fix `investigat*` in `addJournal()` calls**

Journal text is player-facing. For each `addJournal` call with `investigat*`, replace the word. Examples:
- `addJournal('The investigation has a name now.', ...)` → `addJournal('What started as a question has a shape now.', ...)`
- `addJournal('Investigation of route discrepancies ongoing.', ...)` → `addJournal('Route records show gaps that have no innocent explanation.', ...)`

- [ ] **Step 4: Fix `meaningful` in `stage2_enriched_choices.js:2049`**

Find:
```js
'The layering pattern is meaningful — unsupervised access will complete the reading.'
```
Replace:
```js
'The layering pattern holds — unsupervised access will complete the reading.'
```

- [ ] **Step 5: Fix `official` vague adjective violations in labels**

`combat_midspine.js:94`:
- BAD: `"The Warden Order wants to fold your work into their official structure."`
- GOOD: `"The Warden Order wants what you're doing under their roof."`

`aurora_crown_commune_stage2_enriched_choices.js:1430`:
- BAD: `"...wasn't in the official summary."`
- GOOD: `"...wasn't in the circulated summary."`

`magic_midspine.js:49`:
- BAD: `"Disclose it through official channels..."`
- GOOD: `"Disclose it through the registered channels..."`

- [ ] **Step 6: Run content validator**

```bash
cd C:/Users/CEO/ledger-of-ash && node tests/content/validate-content.js 2>&1 | tail -5
```

Expected: 0 FAILs, warning count equal or lower than before.

- [ ] **Step 7: Verify no remaining violations**

```bash
grep -rn "investigat" "C:/Users/CEO/ledger-of-ash/content/" | grep -E "label:|text:|result:|addJournal" | grep -v "tags:\|//" | wc -l
```

Expected: 0.

- [ ] **Step 8: Commit**

```bash
git add content/*.js
git commit -m "fix(content): remove investigat*/meaningful/official forbidden words from all player-facing text"
```

---

## Task 17: Author Archer Archetype Trait Pool

**Problem:** `archer` appears in 3 backgrounds (`a_roadwarden`, `a_frontier`, `a_nomdara`) but has no entry in `ARCHETYPE_TRAIT_POOLS`. Archer players get the `_default` pool at level-up instead of archetype-appropriate traits.

**Files:**
- Modify: `ledger-of-ash.html` (ARCHETYPE_TRAIT_POOLS object, ~line 3720–3730 after the `ranger` pool)

- [ ] **Step 1: Find the end of the `ranger` pool at line ~3681**

```js
  ranger: [
    ...4 entries...
  ],
```

After the closing `],` of the ranger pool, add the archer pool.

- [ ] **Step 2: Add the archer pool**

```js
  archer: [
    {id:'ta_distance',   name:'Long Draw',            type:'passive',      desc:'+2 to ranged attacks at Medium and Long range. At Very Far, ranged attacks are still possible at -1.', levelMin:2},
    {id:'ta_nock',       name:'Fast Nock',             type:'active', traitType:'active', activeSkillType:'combative', desc:'Draw and fire before an enemy can close range. Can be used at the start of any round before initiative resolves (1/combat).', levelMin:4, skill:'finesse', bonus:2, successEffect:'The arrow is away before they close. They take the hit mid-step.', failEffect:'The nock catches — the moment is gone.', critEffect:'The shot lands center-mass. Their approach ends here.'},
    {id:'ta_sight',      name:'Range Reading',         type:'investigation',desc:'Accurately estimate distance, cover quality, and line-of-sight from any position without moving from your current location.', levelMin:3},
    {id:'ta_patience',   name:'Held Shot',             type:'passive',      desc:'If you do not move on your turn, your next ranged attack gains +1 and ignores partial cover.', levelMin:6},
  ],
```

- [ ] **Step 3: Verify the pool is reachable**

```bash
grep -n "archer" "C:/Users/CEO/ledger-of-ash/ledger-of-ash.html" | grep "ARCHETYPE_TRAIT_POOLS\|ta_"
```

Expected: lines showing the archer pool entries.

- [ ] **Step 4: Run headless spec**

```bash
cd C:/Users/CEO/ledger-of-ash && npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line 2>&1 | tail -10
```

Expected: 4/4 pass.

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(content): add ARCHETYPE_TRAIT_POOLS['archer'] — archer players no longer get _default pool at level-up"
```

---

## Final Validation

After all 17 tasks are complete, run the full validation suite:

- [ ] **Run all validators**

```bash
cd C:/Users/CEO/ledger-of-ash
node tests/content/validate-content.js 2>&1 | tail -10
node tests/content/validate-flags.js 2>&1 | tail -5
node tests/content/validate-structure.js 2>&1 | tail -10
```

Expected: 0 FAILs across all three validators. Warning count ≤ 101 (content) from baseline.

- [ ] **Run full headless Playwright spec**

```bash
npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line 2>&1 | tail -20
```

Expected: 4/4 families pass, all reaching Stage II.

- [ ] **Check for any remaining forbidden words**

```bash
grep -rn "investigat\|meaningful\|you feel\|you realize\|you sense" "C:/Users/CEO/ledger-of-ash/content/" | grep -E "label:|text:|result:|addJournal" | grep -v "tags:\|//" | wc -l
```

Expected: 0.

---

## Self-Review

**Spec coverage check:**

| Issue | Task |
|-------|------|
| getDefaultG() missing 15+ properties | Task 1 ✅ |
| buyShopItem 2-arg overwritten by 1-arg | Task 4 ✅ |
| glasswake_commune missing from WORLD_LOCATIONS | Task 6 ✅ |
| Journal byCategory dead code | Task 7 ✅ |
| applyEffect journal handler wrong field | Task 7 ✅ |
| applyEffect rival handler missing | Task 8 ✅ |
| NPC tag not in SEMANTIC_SAFE_TAGS | Task 9 ✅ |
| locality_npcs.js double-load | Task 9 ✅ |
| 12 ArcGate choices missing plot:'main' | Task 9 ✅ |
| Roll notation _riSKD map incomplete | Task 10 ✅ |
| Lay low hidden when heat > 0 but watchfulness < 3 | Task 11 ✅ |
| Bold choice rewards unimplemented | Task 12 ✅ |
| G.tensionLevel never incremented | Task 13 ✅ |
| Alignment bars not visible until ±10 | Task 14 ✅ |
| Arc file labels violate 15-word inner-voice rule | Task 15 ✅ |
| investigat*/meaningful/official in player text | Task 16 ✅ |
| archer archetype missing from ARCHETYPE_TRAIT_POOLS | Task 17 ✅ |
| Dead code: showEnforcementEncounter, gainXP uppercase | Task 2 ✅ |
| G.flags null guards (3 sites) | Task 3 ✅ |
| G.abilities vs unlockedAbilities inconsistency | Task 3 ✅ |
| Stage 1 boss shouldTrigger fires instead of checking | Task 5 ✅ |
| Stage 1 boss missing {isBoss:true} | Task 5 ✅ |
| 4 world clocks with no HUD display | Not in scope — backend-only clocks; adding HUD elements is additive, not repair |
| review_notes camp button always hidden | Not in scope — recovery_thread_available is never set in any content; button is correctly hidden |
