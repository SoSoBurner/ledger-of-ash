# Ledger of Ash — Full Systems Repair Plan
# 2026-06-06 — Post-Playtest Spec-Mine + Companion + Craft Synthesis

> **Version:** 2 (supersedes initial draft; updated with companion findings, craft investigation, headed playtest evidence)
>
> **Scope:** Wiring and mechanics repairs only. No new narrative content. Each fix closes a confirmed gap between authored data and player-visible outcome.
>
> **Method:** 10 parallel spec-mine investigations + headless (4/4 pass) + headed (4/5 pass, 374 screenshots). All bug citations are file:line verified by agent investigation.
>
> **Architecture:** `ledger-of-ash.html` (~16K lines inline JS, ES5). Content scripts in `content/`. No build step. Play via `play.bat`.
>
> **Execution model:** Parallel agent system tracks — one `agent-teams:team-implementer` per system. Tracks are independent unless noted. Each stub is agent-ready (no additional research needed).
>
> **Acceptance:** `npm run test:content` → headless 4-family → headed 4-family (new screenshot baseline).

---

## Headed Playtest Evidence (2026-06-06-0328)

**Report:** `tests/test-results/playtest-report-20260606-0328-headed.md`
**Screenshots:** `test-results/playthrough-screenshots/headed/` (374 files)

### Run Summary
- 4/5 families passed (classic-combat/ranger stall-timeout at pick 117 with sp2=13)
- 0 JS errors, 0 new validator warnings
- abilities=0 across ALL archetypes — confirmed visual bug (level-up step shows ability card, but it vanishes after selection)

### Key Screenshot Observations

**HUD Entry State — All 4 Family Starts**

| Screenshot | Archetype | Location | CRAFT visible | 7 stats |
|---|---|---|---|---|
| `1780812283667_stage1_entry_hud_full.png` | Paladin | Shelkopolis | CRAFT: 0 ✓ | ✓ |
| `1780812283756_magic-spellcasting_priest_a1_start.png` | Priest | Panim Haven | CRAFT: 0 ✓ | ✓ |
| `1780812283861_stealth-precision_thief_a1_start.png` | Thief | Shelkopolis | CRAFT: 0 ✓ | ✓ |
| `1780812283948_support-leadership_bard_a1_start.png` | Bard | Shelkopolis | CRAFT: 0 ✓ | ✓ |

**Finding:** CRAFT: 0 appears in the stats panel for ALL archetypes including non-crafting ones (bard, thief, priest, paladin). The `updateHUD()` iterates `Object.entries(G.skills||{})` with no filter — craft is injected at character creation for everyone.

**Level-Up Ability Step — Ability Chosen But Never Acquired**

Screenshots `1780812283672_classic-combat_paladin_a1_levelup_step2.png` + `1780812283673_classic-combat_paladin_a1_levelup_lvl2.png`:
- Step 2 shows: "CHOOSE A NEW ABILITY: Divine Favor — Your deity is present in your actions. PASSIVE / STEP 3 OF 3 — PASSIVE ABILITY" — correct card displayed
- Level 2 result shows: "Might improved to 4/10. Trait gained: Divine Strike. +8 max HP." — **ability (Divine Favor) is never mentioned as acquired**
- Abilities tab would show Divine Favor as LOCKED because `renderAbilityStep` wrote to `G.abilities` not `G.unlockedAbilities`

**Balance Matrix (from Report)**

| Family | combat | stealth | survival | lore | persuasion | craft |
|---|---|---|---|---|---|---|
| classic-combat/ranger | 2 | 0 | 0 | 0 | 0 | 0 |
| magic-spellcasting/inquisitor | 1 | 0 | 0 | 0 | 0 | 0 |
| stealth-precision/thief | 1 | 0 | 0 | 0 | 0 | 0 |
| support-leadership/healer | 2 | 0 | 0 | 0 | 0 | 0 |

**Finding:** Balance matrix logs OLD internal keys (combat/stealth/survival/lore/persuasion). Since `G.skills` uses display-name keys (might/finesse/vigor/wits/charm), every skill except 1-2 combat picks reads as 0. The logger is reading keys that don't exist in `G.skills`. Distribution is invisible.

### Coverage Gaps (0 sp2 in headed run)
- `fairhaven` — visited 7 times, 0 sp2
- `ithtananalor` — visited 3 times, 0 sp2
- `panim` — visited 1 time, 0 sp2

---

## Confirmed-Working Systems — DO NOT MODIFY

These are fully wired and regression-tested. Implementers must not touch adjacent code in these systems:

| System | Status | Key functions |
|---|---|---|
| Equipment | WORKING | `equipItem`, `getEquipmentBonus`, `G.equipped` — all 3 slots wired, normalized, sheet displays correctly |
| Combat entry display | WORKING | `enterCombat`, `renderCombatRound` HTML structure, `resolveCombatAction` routing |
| Combat companion_ability action | WORKING | picker sub-menu, all 4 effect types, per-fight cooldown in `CS.companionAbilitiesUsed` |
| Save/Load | WORKING | `saveToSlot`, `loadFromSlot`, `G.companions` round-trips correctly |
| Faction HUD | WORKING | `updateFactionHUD` top-5 filter/sort confirmed |
| World Clocks | WORKING | `updateWorldTab` renders Pressure/Watchfulness/Omens — only `rival` hides at 0 |
| Choice border colors | WORKING | BOLD/SAFE/RISKY/COMBAT/plot-main borders all confirmed by screenshots |
| Material drops | WORKING | `addMaterial`, `G.materials`, sell UI all wired |
| XP / level system | WORKING | `gainXp`, `checkLevelUp`, level denominator `G.level * 60` |
| Stage gate | WORKING | `checkStageAdvance`, `STAGE1_BOSS_MODULE.shouldTrigger` export — correct |

**HUD CHANGE POLICY:** The user has specified minimal changes to the HUD. Any fix that modifies layout, font, visible element count, or visual structure of the HUD must be raised for approval before implementing. Small label text corrections (e.g., Lore→Wits in a tooltip) are exempt.

---

## Parallel Execution Tracks

Launch all tracks simultaneously via `agent-teams:team-implementer`. Each track owns a disjoint set of file sections and functions.

---

## Track 1 — Abilities System
**File:** `ledger-of-ash.html`
**Functions:** `renderAbilityStep`, `awardAbility`, `activateAbility`, `ABILITY_EFFECTS`, `STARTER_ABILITIES`, `getAbilityById`
**No-touch:** `ARCHETYPE_ABILITY_TREES` (data), `ARCHETYPE_TRAIT_POOLS`, `renderTraitStep`

### Fix A1 — Level-up write target (CRITICAL, 1 line)

`renderAbilityStep` at line 14044 pushes `chosenAbility` (full object) to `G.abilities`. Every downstream reader (HUD line 17658, char sheet line 16454, choice-render line 12333) reads `G.unlockedAbilities` (ID string array). Abilities chosen at level-up silently vanish.

**Change at ~line 14044:**
```js
// BEFORE:
G.abilities = G.abilities || [];
G.abilities.push(chosenAbility);

// AFTER:
G.unlockedAbilities = G.unlockedAbilities || [];
if (G.unlockedAbilities.indexOf(chosenAbility.id) === -1) {
  G.unlockedAbilities.push(chosenAbility.id);
}
```

Also check whether `applyLevelUpChoice` (~line 14103) correctly writes to `G.unlockedAbilities`. If so, wire it as the canonical handler and remove the duplicate push from `renderAbilityStep`.

### Fix A2 — Starter ability IDs not in trees or ABILITY_EFFECTS (HIGH)

`STARTER_ABILITIES` at ~line 2926 grants `pressure_strike`, `shadow_step`, `field_assess`, `pattern_recall` at level 2 via `awardAbility`. None exist in `ARCHETYPE_ABILITY_TREES` or `ABILITY_EFFECTS` (~line 12096). `getAbilityById` returns null. Activate button never renders.

**Part 1 — Add to ABILITY_EFFECTS (~line 12096):**
```js
'pressure_strike': {type:'roll_bonus', skill:'might', bonus:3, duration:1},
'shadow_step':     {type:'roll_bonus', skill:'finesse', bonus:3, duration:1},
'field_assess':    {type:'dc_reduce', amount:2, duration:1},
'pattern_recall':  {type:'roll_bonus', skill:'wits', bonus:3, duration:1},
```

**Part 2 — Add STARTER_ABILITY_DEFS lookup in `getAbilityById` (~line 12082):**
```js
var STARTER_ABILITY_DEFS = {
  'pressure_strike': {id:'pressure_strike', name:'Pressure Strike', type:'active',
    desc:'Your next combat or risky roll gains +3.', unlockLevel:2},
  'shadow_step':     {id:'shadow_step', name:'Shadow Step', type:'active',
    desc:'Your next finesse roll gains +3.', unlockLevel:2},
  'field_assess':    {id:'field_assess', name:'Field Assessment', type:'active',
    desc:'Reduce the next DC you face by 2.', unlockLevel:2},
  'pattern_recall':  {id:'pattern_recall', name:'Pattern Recall', type:'active',
    desc:'Your next wits roll gains +3.', unlockLevel:2},
};
// Add before the final `return null;`:
return STARTER_ABILITY_DEFS[abilId] || null;
```

**Verify:**
1. New character → level to 2 → starter ability button must appear above the choice list
2. Click Activate → narration must show bonus applied
3. Level to 3+ → chosen ability must appear in Abilities tab with Activate button (not LOCKED)

---

## Track 2 — Boss System
**File:** `ledger-of-ash.html` (endCombat, resolveCombatAction), `content/stage1_boss.js`
**No-touch:** `enterCombat`, `ENEMY_TEMPLATES`, `STAGE1_BOSS_MODULE.shouldTrigger`

### Fix B1 — `onDefeat` and `onPhaseChange` never called (CRITICAL)

`endCombat()` never invokes `enemy.onDefeat()`. `resolveCombatAction()` has no half-HP phase check. The miniboss `onDefeat` at `content/stage1_boss.js:125` grants 3 stageProgress[1] points — never fires.

**In `endCombat()` (~line 5030), after victory narration, before `loadStageChoices`:**
```js
if (CS && CS.enemy && typeof CS.enemy.onDefeat === 'function') {
  CS.enemy.onDefeat();
}
```

**In `resolveCombatAction()`, after damage applied to `CS.enemy.hp`:**
```js
if (CS.enemy && typeof CS.enemy.onPhaseChange === 'function' &&
    !CS._phaseChanged && CS.enemy.hp <= CS.enemy.maxHp * 0.5) {
  CS._phaseChanged = true;
  CS.enemy.onPhaseChange();
}
```

### Fix B2 — Boss loot array vs flat-object format (HIGH)

`stage1_boss.js` lines 123 and 196 declare `loot` as an array `[{name, type, effect, desc}]`. `endCombat()` reads `enemy.loot.gold` and `enemy.loot.item` — both undefined on an array. Boss drops (Silver Registry Pencil, ORE Intake Seal) never added to inventory.

**In `endCombat()` (~line 5038), add array-loot branch:**
```js
// After existing enemy.loot.gold check:
if (Array.isArray(enemy.loot)) {
  enemy.loot.forEach(function(lootEntry) {
    if (lootEntry.name) {
      G.inventory.push({
        id: lootEntry.id || lootEntry.name.toLowerCase().replace(/\s+/g,'_'),
        name: lootEntry.name, desc: lootEntry.desc || '',
        type: lootEntry.type || 'tool', cost: 0, equipped: false
      });
      victoryText += ' You recover the ' + lootEntry.name + '.';
    }
    if (lootEntry.effect) {
      Object.keys(lootEntry.effect).forEach(function(sk) {
        var _norm = {lore:'wits',combat:'might',stealth:'finesse',survival:'vigor',persuasion:'charm'};
        var key = _norm[sk] || sk;
        if (G.skills[key] !== undefined) G.skills[key] += lootEntry.effect[sk];
      });
    }
  });
}
```

**Verify:**
- Defeat Stage 1 miniboss: `G.stageProgress[1]` increments by 3 (check in console)
- Boss at ~50% HP: boss phase-change narration fires (attack boost applies)
- Defeating boss: ORE Intake Seal appears in inventory

---

## Track 3 — Travel System
**File:** `ledger-of-ash.html`
**Functions:** `_showModeSelectInOverlay`, `_showPackChoicesInOverlay`, `startOverlayJourney`
**No-touch:** `TRAVEL_ROUTES`, `ROUTE_SPATIAL_DATA`, `advanceDayLeg`, `_completeJourney`

### Fix T1 — Alias not passed downstream (HIGH)

`_showModeSelectInOverlay` computes `_LOC_ALIAS_OVL` (short→full ID map) at line 14302 for ROUTE_SPATIAL_DATA lookup but passes raw `G.location` to `_showPackChoicesInOverlay` at line 14344. `startOverlayJourney` at line 4284 builds `routeKey = fromId + '|' + toId` using the unaliased raw ID. Short-form starting localities (aurora, guildheart, panim, soreheim, mimolot, sunspire per `BG_LOCATION_MAP`) miss TRAVEL_ROUTES keys → `totalDays = 1` always.

**Change at line 14344:**
```js
// BEFORE:
_showPackChoicesInOverlay(G.location, _toLocId, _route, _mode);

// AFTER:
var _fromAlias = _LOC_ALIAS_OVL[G.location] || G.location;
_showPackChoicesInOverlay(_fromAlias, _toLocId, _route, _mode);
```

Verify `_showPackChoicesInOverlay` passes its `fromId` argument to `startOverlayJourney` without further re-aliasing (it should — the alias is the full canonical ID that matches TRAVEL_ROUTES keys).

**Verify:**
- Start as aurora_crown_commune. Open map → select a destination. Pack overlay must show correct days (not 1). After travel completes, `G.dayCount` must advance by the route's actual days.

---

## Track 4 — Combat Skill Normalization
**File:** `ledger-of-ash.html`
**Functions:** `resolveCombatAction`, `renderCombatRound`
**No-touch:** `rollD20`, `_KEY_NORM` (already correct in rollD20)

### Fix C1 — Ability rolls use wrong skill key in resolveCombatAction (HIGH)

`resolveCombatAction` at ~line 4809 reads `G.skills[ab.skillReq]` directly. `ARCHETYPE_COMBAT_ABILITIES` entries use old keys (`'combat'`, `'lore'`, `'stealth'`). `G.skills['combat']` is undefined → every combat ability rolls at 0 bonus regardless of player investment.

**Add normalization at the ability action branch in `resolveCombatAction` (~line 4806):**
```js
var _CAB_KEY_NORM_ACT = {combat:'might',stealth:'finesse',survival:'vigor',lore:'wits',persuasion:'charm'};
var _abSkillKey = _CAB_KEY_NORM_ACT[ab.skillReq] || ab.skillReq;
var _abSkillVal = G.skills[_abSkillKey] || 0;
// Replace all G.skills[ab.skillReq] reads in this branch with _abSkillVal
```

### Fix C2 — Ability button shows old internal key (LOW)

`renderCombatRound` at ~line 4550 renders `a.skillReq` raw in the button label (shows "combat" instead of "Might").

**Add display normalization:**
```js
var _CAB_DISPLAY = {combat:'Might',stealth:'Finesse',survival:'Vigor',lore:'Wits',persuasion:'Charm'};
var _displaySkill = _CAB_DISPLAY[a.skillReq] || a.skillReq;
// Use _displaySkill in button label HTML
```

### Fix C3 — Player HP absent from combat round panel (LOW — HUD POLICY APPLIES)

`renderCombatRound()` never shows player HP. Player HP is only visible in the sidebar HUD.

**⚠️ HUD CHANGE POLICY:** This fix modifies the combat panel layout. Confirm with user before implementing. The ask: add one line `Your HP: G.hp / G.maxHp` adjacent to the enemy HP bar inside the `.combat-block`. If user approves, add:
```js
'<div class="combat-player-hp" style="font-size:11px;opacity:0.8;">Your HP: ' + G.hp + ' / ' + G.maxHp + '</div>'
```

**Verify C1:** Use a combat ability as warrior. `G._lastRollInfo.total` in console must reflect Might value (3+), not 0.
**Verify C2:** Combat ability button must show "Might" not "combat" in skill label.

---

## Track 5 — Craft System
**File:** `ledger-of-ash.html`
**Functions:** `campAction` (craft branch ~line 14740), `SKILL_LABELS` (~line 15367), `updateHUD`
**Content:** `content/item_system.js`, `content/craftspire_stage2_enriched_choices.js`
**No-touch:** `CRAFT_RECIPES`, `getAllRecipes`, `hasMaterials`, `addMaterial`, `MATERIAL_DEFS`, `ITEM_DEFS`

### Background

The craft skill is a functional but systematically misconfigured system for crafting archetypes (artificer, engineer, alchemist). Key bugs confirmed by investigation:

1. `campAction('craft')` rolls `spirit` not `craft` (~line 14747) — crafting archetypes get no benefit from their primary skill during camp crafting
2. Training menu `SKILL_LABELS` at ~line 15367 has `craft:'Spirit'` — craft is labeled "Spirit", creating two "Spirit" entries in the training menu
3. Crafting archetype ability trees (artificer/engineer/alchemist) gate every ability on `skillReq:{skill:'craft', min:1-4}`. Since craft starts at 0 and the only growth paths are training (costly) or equipment (rare), these archetypes can't unlock their own abilities organically
4. Most content uses `rollD20('spirit', G.skills.craft)` — treating craft as bonus to spirit, not its own skill. Only 2 content files use `skill:'craft'` correctly
5. CRAFT: 0 shows in HUD for ALL archetypes (not gated on archetype family)

### Fix CR1 — campAction('craft') rolls wrong skill

**Change at ~line 14747:**
```js
// BEFORE:
var _craftResult = rollD20('spirit', (G.skills.spirit || 0) + ...);

// AFTER:
var _craftResult = rollD20('craft', (G.skills.craft || 0) + ...);
```

Also verify the DC modifier line uses craft: `(G.skills.craft || 0)` not `(G.skills.spirit || 0)`.

### Fix CR2 — Training menu mislabels Craft as Spirit

**Change in `SKILL_LABELS` at ~line 15367:**
```js
// BEFORE:
craft: 'Spirit',

// AFTER:
craft: 'Craft',
```

### Fix CR3 — Add craft to getDefaultG() for save compatibility

`getDefaultG()` (~line 10168) does NOT include `craft` in the skills object — it's only injected at character creation. On load, `Object.assign(G, getDefaultG(), savedData)` would clobber craft if a save predates the craft key.

**Add to `getDefaultG()` skills:**
```js
skills: { might: 0, vigor: 0, wits: 0, charm: 0, finesse: 0, spirit: 0, craft: 0 },
```

### Fix CR4 — HUD craft visibility (HUD POLICY APPLIES)

**⚠️ HUD CHANGE POLICY:** Hiding craft from non-crafting archetype HUD panels changes layout for all archetypes. Confirm with user before implementing. The ask: gate craft display in `updateHUD` on archetype family (`getArchetypeFamily(G.archetype) === 'support'` or similar). If user approves: add a filter in the skills loop that skips `craft` unless the archetype is artificer/engineer/alchemist.

Until user confirms, leave craft visible in HUD for all archetypes (current behavior).

### Fix CR5 — Add craft growth path for crafting archetypes

Crafting archetypes can't unlock abilities (craft min:1-4 gates) without craft > 0. Current growth paths are slow (training: 30-day cooldown, 20g, 3 sessions) or equipment-gated.

**Add craft starting bonus for crafting archetypes in archetype starting-skills initialization (~line 10658):**
```js
var _craftFamilyArchetypes = ['artificer', 'engineer', 'alchemist'];
if (_craftFamilyArchetypes.indexOf(G.archetype) !== -1) {
  G.skills.craft = 2; // Starting craft bonus for crafting archetypes
}
```

This gives crafting archetypes immediate access to their level-1 abilities (craft min:1) and a path to level-2 abilities through training.

**Verify:**
- Create artificer character → craft skill in HUD shows 2 (not 0)
- Open camp → Craft tab → roll uses craft score, not spirit
- Open training menu → Craft entry shows "Craft" not "Spirit"
- Artificer abilities tab shows at least first ability as unlockable (not all LOCKED due to craft:0 gate)

---

## Track 6 — Companion System
**File:** `ledger-of-ash.html`, `content/maren_oss_encounter.js`, `content/stage2_climax.js`
**Functions:** `MAREN_ENCOUNTER`, `canRecruit`, `showRecruitScene`, `showCampTalk`, `buildCompanionHudHTML`, `updatePartyTab`
**No-touch:** `resolveRecruitChoice`, `resolveCombatAction` companion_ability branch, `G.companions` save/load

### Fix CP1 — MAREN_ENCOUNTER name mismatch (CRITICAL, blocks entire companion chain)

`ledger-of-ash.html:13700` calls `window.MAREN_ENCOUNTER.shouldTrigger()`. `content/maren_oss_encounter.js:112` exports `window.MAREN_OSS_ENCOUNTER`. The `typeof` guard evaluates false on every tick — Maren encounter is permanently skipped.

**Change at line 13700:**
```js
// BEFORE:
if (typeof window.MAREN_ENCOUNTER !== 'undefined' && window.MAREN_ENCOUNTER.shouldTrigger()) {

// AFTER:
if (typeof window.MAREN_OSS_ENCOUNTER !== 'undefined' && window.MAREN_OSS_ENCOUNTER.shouldTrigger()) {
```

Also check if `maren_oss_encounter.js` exports the trigger under the right method name (`shouldTrigger` vs `checkTrigger` — confirm at `maren_oss_encounter.js:112`).

### Fix CP2 — Party tab filter wrong property (HIGH)

`updatePartyTab()` at line 17771 filters by `c.active` (boolean). `G.companions` entries store `c.status === 'active'` (string). The filter always produces an empty array → party tab always shows "No companions."

**Change at line 17771:**
```js
// BEFORE:
var _active = Object.values(G.companions || {}).filter(function(c){ return c.active; });

// AFTER:
var _active = Object.values(G.companions || {}).filter(function(c){ return c.status === 'active'; });
```

### Fix CP3 — HUD companion passive line always blank (HIGH)

`buildCompanionHudHTML` at line 17478 reads `def.passive`. `COMPANION_DEFS` entries have no `passive` field — they have `abilities` array. Companion HUD shows name but passive description is always empty.

**Change at line 17478:**
```js
// BEFORE:
var _passiveDesc = def.passive || '';

// AFTER:
var _passiveText = def.abilities && def.abilities.find(function(a){ return a.type === 'passive'; });
var _passiveDesc = _passiveText ? _passiveText.desc : '';
```

### Fix CP4 — showCampTalk wrong gate flag (HIGH)

`showCampTalk()` at line 2636 gates on `G.flags.maren_oss_resolved`. Every other companion gate (camp UI, character sheet, `canRecruit`) uses `companion_gate_open`. Camp talk shows "No companion present" even with active companions who haven't yet triggered the Stage II climax.

**Change at line 2636:**
```js
// BEFORE:
if (!G.flags.maren_oss_resolved) { ... return; }

// AFTER:
if (!G.flags.companion_gate_open) { ... return; }
```

### Fix CP5 — Wire auto-injection of recruit choices

No content file or enriched choice currently calls `showRecruitScene()` automatically. After `companion_gate_open` is set, players have no way to encounter Vorath or Mira unless a choice routes there. Inject recruit choices into `loadStageChoices` when the gate is open and companions haven't been recruited yet.

**In `loadStageChoices` (~line 14463), add after base choices are built:**
```js
// Companion recruit injection — fires once per companion when gate is open
if (G.flags && G.flags.companion_gate_open) {
  var _RECRUITABLE = ['vorath_gelden', 'mira_calden', 'kaevrin'];
  _RECRUITABLE.forEach(function(defId) {
    if (!G.companions[defId] && typeof showRecruitScene === 'function') {
      // Inject a single recruit choice into the pool
      _choices.push({
        label: COMPANION_DEFS[defId] && COMPANION_DEFS[defId].joinScene && COMPANION_DEFS[defId].joinScene.trigger || 'Someone is waiting.',
        fn: function() { showRecruitScene(defId); },
        plot: 'main',
        tags: ['Relationship', 'Safe']
      });
    }
  });
}
```

### Fix CP6 — Kaevrin: Full companion implementation (NEW)

Kaevrin is defined in `COMPANION_DEFS` (~lines 2282–2345, analyst role) but has no entry in `COMPANION_PASSIVES`, no entry in `COMPANION_ABILITIES`, and no wired recruit trigger. Full implementation to match Vorath/Mira fidelity:

**Part A — Add to `COMPANION_PASSIVES` (~line 2417):**
```js
kaevrin: {skill: 'wits', bonus: 2, condition: 'intelligence_gather'},
```
(Kaevrin's analyst role; passive applies +2 wits on intelligence-gathering choices)

**Part B — Add to `COMPANION_ABILITIES` (~line 2425):**
```js
kaevrin: {
  name: 'Pattern Analysis',
  type: 'special',
  desc: 'Kaevrin reviews the available options. One hidden path becomes visible.',
  effect: {type: 'dc_reduce', amount: 2, duration: 1}
},
```

**Part C — Add `kaevrin` to the auto-inject recruit list (already included in Fix CP5 above).**

**Part D — Wire Kaevrin's campLines into `showCampTalk()`.** Kaevrin's `campLines` in `COMPANION_DEFS` should already be present. Verify line 2636+ renders them — no additional code needed if the gate (Fix CP4) is fixed.

### Future-Companion Note (OUT OF SCOPE)

Five placeholder companion IDs (`sera_vale`, `toriel_palevow`, `neren_rimebridge`, `elyra_mossbane`, `vera_wren`) exist in `COMPANION_PASSIVES` and `COMPANION_ABILITIES` but have no `COMPANION_DEFS` entries, no recruit scenes, and no trigger logic. These are authored future companions. Do NOT modify or remove them. Document their presence in the plan as a content backlog item.

**Verify companion track:**
- Play to Stage II gate open (`companion_gate_open` flag). Recruit choice for Vorath must appear organically.
- Recruit Vorath → party tab must show "1 active companion" (not empty)
- Open camp → Talk option → Vorath's campLine must render (not "No companion present")
- HUD companion panel must show Vorath's name + passive description
- Enter combat with active Vorath → "Companions" button must appear, resolve combat ability correctly
- Kaevrin must be recruitable via the same flow

---

## Track 7 — Tutorial and How-To
**File:** `ledger-of-ash.html`
**Lines:** HOWTO_SECTIONS (~18490–18513), tutorial callout msgs (~17292–17304), onboarding (~10502), `maybeShowTutorial` call sites
**No-touch:** Onboarding modal structure, `showHowToPlay()`, `_buildOnboardingPages()`

### Fix TU1 — Boss threshold wrong (HIGH)

HOWTO_SECTIONS "Stage Progress" (line 18511): "8 or higher to face the stage boss." Engine: `G.stageProgress[1] >= 15`.

Change "8 or higher" → "15 or higher."

Also fix HUD denominator in `updateCaseFileHUD` (~line 17707): change `/ 10` → `/ 15`.

**⚠️ HUD CHANGE POLICY:** Changing the denominator display (X/10 → X/15) is a text-only change inside an existing span. This is exempt from HUD policy — proceed.

### Fix TU2 — Companion descriptions factually wrong (HIGH)

HOWTO_SECTIONS "Companions" (line 18510): Wrong descriptions for Vorath and Mira.

Replace with (after Fix CP6 adds Kaevrin):
```
"Vorath Gelden: +2 to social checks with garrison-affiliated NPCs; once-per-scene Tactical Assessment.
Mira Calden: once-per-locality trade anomaly intelligence; once-per-scene Political Read.
Kaevrin: +2 to wits on intelligence-gathering choices; once-per-scene Pattern Analysis.
All companions require completing the Maren Oss encounter and opening the companion gate."
```

### Fix TU3 — 'Review Notes' camp action doesn't exist (HIGH)

HOWTO_SECTIONS "Rest Mechanics" (line 18494): References "Review Notes" as a camp option. No such `campAction` type exists.

Remove the "Review Notes" sentence entirely. Replace with the actual camp options: "Camp actions: Rest, Sleep, Train, Talk (requires active companion), Seek Care, Lay Low, Camp Outside, Craft, Post Watches."

### Fix TU4 — 'Attention' clock name mismatch (MEDIUM)

HOWTO_SECTIONS "World Clocks" (line 18492) and tutorial `first_pressure` (line 17302) call it "Attention." HUD bar (line 1996) is "WATCHFULNESS." Engine variable is `pressure`.

Change "Attention" → "Watchfulness" in both locations.

### Fix TU5 — first_npc tutorial uses old key (MEDIUM)

Tutorial callout `first_npc` (line 17297): "Local contacts are gated by your **Lore** skill." Lore is an old internal key; display name is "Wits."

Change "Lore skill" → "Wits skill" (twice in the string).

### Fix TU6 — Wire orphaned tutorial callouts (MEDIUM)

`first_combat` and `first_levelup` are defined in tutorial msgs (lines 17294, 17299) but no code calls `maybeShowTutorial` for them.

**In `enterCombat()` (~line 18365), add:**
```js
if (typeof maybeShowTutorial === 'function') maybeShowTutorial('first_combat');
```

**In `checkLevelUp()` (~line 13400), add:**
```js
if (typeof maybeShowTutorial === 'function') maybeShowTutorial('first_levelup');
```

### Fix TU7 — HOWTO_SECTIONS comprehensive deduplication (LOW)

Five topic pairs are duplicated: Travel (lines 18495 + 18508), Companions (18501 + 18510), Alignment (18500 + 18512), Camp (18498 + 18509), Risk Tiers vs Roll System (18491 + 18505).

Consolidate to one entry per topic. Keep the more detailed/accurate version of each pair:
- Travel: keep 18508 (Vigor/Spirit references), remove 18495
- Companions: keep 18510 (will be updated in Fix TU2), remove 18501
- Alignment: keep 18512 (±10 threshold detail), remove 18500
- Camp: keep 18509 (Vigor/Spirit references), remove 18498
- Risk Tiers: merge DC info from 18505 into 18491, remove 18505

Also add to the surviving Risk Tiers entry: "DCs rise by +1 per stage advanced."

**Verify:** Open How-To Play modal. Scroll all sections — each topic appears exactly once. Boss threshold shows "15."

---

## Track 8 — Shop and Tavern
**File:** `ledger-of-ash.html`, `content/places_data.js`
**Functions:** `showShop`, `buyShopItem`, `openTavernRest`, `showPlaces`
**No-touch:** `PLACES_DATA` content, `SHOP_INVENTORY` content, `showPlacesTab`

### Fix SH1 — Dual ownership model mismatch (MEDIUM)

Legacy `showShop()` tracks ownership via `G.inventory.find(inv => inv.id === item.id)` (line 17025). Places overlay tracks via `G.shopSeen[item.id]` (line 15651). Same item ID can be bought in both UIs.

**In legacy `showShop()` buy handler (~line 17104), after `G.inventory.push`:**
```js
G.shopSeen = G.shopSeen || {};
G.shopSeen[item.id] = true;
```

**Update the legacy "already owned" check (~line 17025):**
```js
var _owned = (G.shopSeen && G.shopSeen[item.id]) ||
  G.inventory.some(function(inv){ return inv.id === item.id; });
```

### Fix SH2 — Tavern rumors permanently marked seen (MEDIUM)

`G.tavernRumorsSeen[r.id] = true` at line 15726 permanently prevents rumor re-display. Localities go silent after ~5 visits.

**Change rumor mark from permanent to day-stamped:**
```js
// BEFORE (line 15726):
G.tavernRumorsSeen[r.id] = true;

// AFTER:
G.tavernRumorsSeen[r.id] = G.dayCount + 7;
```

**Update the rumor filter (before the forEach or map at line 15721):**
```js
var _eligibleRumors = tavern.rumors.filter(function(r){
  return r.minProgress <= (G.investigationProgress || 0) &&
    (!G.tavernRumorsSeen[r.id] || G.tavernRumorsSeen[r.id] <= G.dayCount);
});
```

### Fix SH3 — Remove dead renderShop UI (LOW)

`renderShop()` (~line 17435), `buyLegacyShopItem()` (~line 17459), and `LOCALITY_SHOPS` (~line 17420) are never called. Grep for `renderShop(` before deletion — confirm zero call sites.

Remove all three blocks (~50 lines total).

**Verify:**
- Buy item in legacy shop (via Services button). Open Places → Buy tab. Same item must show as already owned.
- Visit a locality's tavern 6+ times. Eligible rumors must still appear after 7+ days pass (check G.dayCount in console).

---

## Track 9 — Loot System
**File:** `ledger-of-ash.html`
**Functions:** `endCombat`, `MATERIAL_SELL_PRICES`
**No-touch:** `addMaterial`, `addToInventory`, material drop logic in ENEMY_TEMPLATES

### Fix L1 — Boss loot array format (covered in Track 2, Fix B2)

The boss loot fix is in Track 2. Track 9 only handles non-boss loot gaps.

### Fix L2 — 5 material IDs missing from sell prices (MEDIUM)

`parchment_roll`, `salt_cloth`, `hide_scrap`, `swamp_resin`, `beast_bone` appear in ENEMY_TEMPLATES loot tables but not in `MATERIAL_SELL_PRICES` (~line 16944). Both sell UIs filter by this table → materials accumulate invisibly.

**Add to `MATERIAL_SELL_PRICES`:**
```js
parchment_roll: 3,
salt_cloth: 4,
hide_scrap: 5,
swamp_resin: 6,
beast_bone: 7,
```

(Prices to be reviewed against economy balance — these are functional defaults.)

**Verify:** Defeat an enemy that drops `hide_scrap`. Open Places → Sell tab. `hide_scrap` must appear in the sellable list.

---

## Track 10 — Zero-sp2 Locality Wiring
**Files:** `content/fairhaven_stage2_enriched_choices.js`, `content/ithtananalor_stage2_enriched_choices.js`, locality-specific content for panim haven
**No-touch:** `stageProgress` increment logic in engine, choice validation rules

### Diagnostic First — Confirm Wiring vs Content Gap

Before fixing, confirm for each locality whether:
1. Existing choices call `G.stageProgress[2]++` or `maybeStageAdvance()` in their `fn()`
2. Whether the `adaptEnrichedChoice` wrapper is actually reaching those calls (check for missing `G.investigationProgress` increments that would map through `maybeStageAdvance`)

If existing `fn()` calls do increment but sp2 stays 0, the gap is in `maybeStageAdvance()` not reading back to `stageProgress[2]`.

**For each zero-sp2 locality, follow this repair template:**

If the locality's enriched choices DON'T call `G.stageProgress[2]++`:
```js
// Add to the fn() of 2-3 relevant stage-advancing choices:
G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
maybeStageAdvance();
```

If they DO call it but sp2 stays 0, investigate `maybeStageAdvance` sync logic.

Also add `plot: 'main'` to choices that advance stageProgress[2] (blue border for main-plot choices).

**Verify:** Run headed spec after fix. `fairhaven`, `ithtananalor`, `panim` must show sp2 > 0 in the Coverage Map section of the report.

---

## Track 11 — Balance Matrix Logger
**File:** `tests/e2e/playtest-headed.spec.js`
**⚠️ PLAYTEST CHANGE GATE:** Before modifying: confirm **"Are you sure you want to modify the Playtest system?"**

### Fix BM1 — Balance matrix reads old internal skill keys

The balance matrix at the end of the headed spec logs skill usage by old internal keys (combat/stealth/lore/survival/persuasion). `G.skills` uses display-name keys (might/finesse/wits/vigor/charm). Every column reads 0 except `combat` (1-2 picks from the few content choices still using the old key).

**Locate the balance matrix logger in `playtest-headed.spec.js`.** Find where it reads `G.skills.combat`, `G.skills.stealth`, etc. Update to read display-name keys:

```js
// BEFORE (approximate):
var _balanceCols = ['combat','stealth','survival','lore','persuasion','craft'];
// After normalization:
var _balanceCols = ['might','finesse','vigor','wits','charm','spirit','craft'];
// And the logging line that reads G.skills[col]:
// already reads correctly if the col names match G.skills keys
```

Also update the report table header labels to match:
```
| might | finesse | vigor | wits | charm | spirit | craft |
```

**Verify:** Run `npx playwright test tests/e2e/playtest-headed.spec.js`. Balance matrix in report must show non-zero values for wits/charm/finesse for relevant archetype families.

---

## Companion Future Backlog (NOT in this plan)

Document for future sprints:
- `sera_vale`, `toriel_palevow`, `neren_rimebridge`, `elyra_mossbane`, `vera_wren` — have COMPANION_PASSIVES/ABILITIES entries, need COMPANION_DEFS + recruit scenes + trigger logic
- `getCompanionHpRegen()` — wired but no call site in rest/sleep system
- Companion-gated Stage II choices (vorath_gelden / mira_calden on `G.flags.maren_oss_resolved`) — these are correctly gated, not broken

---

## Acceptance Test Sequence

After all tracks complete:

**Step 1 — Validators:**
```
npm run test:content
```
Expected: 0 new violations.

**Step 2 — Headless (regression gate, ~14 min):**
```
npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line
```
Expected: 4/4 families pass. No new stall-timeouts.

**Step 3 — Headed (new screenshot baseline, ~35-45 min):**
```
npx playwright test tests/e2e/playtest-headed.spec.js --reporter=line
```
Expected: 4/4 families pass (ranger stall-timeout was sp2=13, close to the 12 gate — should resolve with 0-sp2 locality fixes). Archetype signatures must show `abilities > 0`. Balance matrix must show non-zero skill distribution. Coverage map: fairhaven/ithtananalor/panim must show sp2 > 0.

**Step 4 — Browser spot-checks:**
- New character → level to 2: starter ability Activate button visible above choices
- Level to 3+: chosen ability appears in Abilities tab, not LOCKED
- Defeat Stage 1 miniboss: `G.stageProgress[1]` increments by 3 (check console)
- Travel from aurora_crown_commune: day counter > 1
- Combat ability: roll total reflects Might (not 0)
- Recruit Vorath: party tab shows 1 active companion
- Camp → Talk with active companion: campLine renders correctly
- Tavern: visit same locality 6+ times → rumors still appear after 7+ days
- Craft archetype (artificer): craft shows 2 in stats, not 0

---

## Per-System Stub Files

Generate one stub file per track for parallel agent dispatch:
- `stub-track1-abilities.md`
- `stub-track2-boss.md`
- `stub-track3-travel.md`
- `stub-track4-combat.md`
- `stub-track5-craft.md`
- `stub-track6-companions.md`
- `stub-track7-tutorial.md`
- `stub-track8-shop.md`
- `stub-track9-loot.md`
- `stub-track10-sp2-localities.md`
- `stub-track11-balance-logger.md`

Each stub = this plan section for that track only, formatted as an agent brief with: file:line citations, before/after code blocks, verify steps, and no-touch boundaries. An agent assigned a stub must not need to read any other plan file.
