# Audit Round 3 Bug Fix Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all confirmed bugs from 4-agent Round 3 audit: quest hints silently dropped, 7 missing travel routes (Fairhaven spokes), dead renderCharacterSheet references, missing `plot:'main'` on Stage 1 advancement choices, and forbidden words + label violations across Stage 1 and Stage 2 content.

**Architecture:** Vanilla ES5. Engine in `ledger-of-ash.html`. Content in `content/*.js`. Travel data split between `content/travel_corridors.js` (TRAVEL_ROUTES, ROUTE_COMPLICATIONS) and `content/travel_route_data.js` (ROUTE_SPATIAL_DATA).

**Tech Stack:** Vanilla ES5 JS, Playwright E2E (`npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line`), Node.js syntax check.

**Generated:** 2026-06-01

---

## False Positives — Do NOT Fix

- **LOCALITY_MACROREGION "missing" IDs**: Audit agent read the LOCAL fallback copy at `travel_corridors.js:11`. The authoritative `window.LOCALITY_MACROREGION` at `ledger-of-ash.html:5502` already contains all IDs (`aurora_crown_commune`, `mimolot_academy`, `glasswake_commune`, `cosmoria`, `amber_fountain_inn`, `brineland`, `eternal_lands`, `ashforge_citadel`, `ashwake_port`). Do not change anything.
- **STAGE2_BOSS_MODULE.checkTrigger asymmetry** — intentional per CLAUDE.md.
- **canAdvanceToStage3() returning false** — intentional V1.0 stub.
- **content/locality_voice_guide.js not loaded** — intentional human-only reference doc, not game code.
- **sunspire_haven_stage2 export name** — `window.SUNSPIRE_STAGE2_ENRICHED_CHOICES` is the actual export name the engine looks up. Local var name difference is harmless.
- **content/npc_dossiers.js** — defer; needs separate decision on whether to wire or delete.

---

## Task 1: Fix quest hints wiring

**Severity:** CRITICAL. `addQuest(msg, hint, questId)` pushes a plain string to `G.quests`. The hint renderer at line 17189 checks `typeof q === 'string' ? null : q.questId` — always `null` for strings. Every quest hint ever set in `G.questHints` is permanently unreachable. The hint display arrow `→ hint text` in the quest HUD never fires.

**File:** `ledger-of-ash.html` — `addQuest()` at line 13896–13908

**Current broken code (line 13900):**
```js
G.quests.push(text);
```

**Fix:** Push an object when `questId` is provided, so the renderer's existing `typeof q === 'string'` check correctly routes to hint lookup:

- [ ] **Step 1: Read the current addQuest function**

Read `ledger-of-ash.html` lines 13896–13908 to confirm the current push line.

- [ ] **Step 2: Apply the fix**

In `ledger-of-ash.html` at line 13900, change:
```js
G.quests.push(text);
```
To:
```js
G.quests.push(questId ? {msg: text, questId: questId} : text);
```

The renderer at line 17188–17190 already handles both cases:
```js
var msg = typeof q === 'string' ? q : q.msg;        // ← reads .msg from object
var qid = typeof q === 'string' ? null : q.questId; // ← now finds questId
var hint = G.questHints && qid && G.questHints[qid]; // ← now resolves hint
```
String-only quests (no questId) remain stored as strings — backward save compat preserved.

- [ ] **Step 3: Syntax check**

```bash
cd C:/Users/CEO/ledger-of-ash && node --check ledger-of-ash.html && echo SYNTAX OK
```

- [ ] **Step 4: Commit**

```bash
cd C:/Users/CEO/ledger-of-ash && git add ledger-of-ash.html && git commit -m "fix(engine): addQuest stores {msg,questId} objects so hint renderer can display quest hints"
```

---

## Task 2: Remove dead renderCharacterSheet references

**Severity:** HIGH. `renderCharacterSheet` is referenced at 3 call sites but was never defined in the source (the real function is `showCharSheet()`). The `typeof` guard prevents crashes, but the intended UI refresh after item use, shop purchase, and trait activation silently no-ops. `updateHUD()` is already called on the preceding line in all 3 cases, so these lines are pure dead code.

**File:** `ledger-of-ash.html` — lines 16310, 16827, 17636

- [ ] **Step 1: Locate and remove the 3 dead lines**

Search for `renderCharacterSheet` in `ledger-of-ash.html`. There should be exactly 3 matches:

```
line 16310: if (typeof renderCharacterSheet === 'function') renderCharacterSheet();  // after useItem
line 16827: if (typeof renderCharacterSheet === 'function') renderCharacterSheet();  // after shop purchase
line 17636: if (typeof renderCharacterSheet === 'function') renderCharacterSheet();  // after trait use
```

Delete all 3 lines.

- [ ] **Step 2: Syntax check**

```bash
cd C:/Users/CEO/ledger-of-ash && node --check ledger-of-ash.html && echo SYNTAX OK
```

- [ ] **Step 3: Commit**

```bash
cd C:/Users/CEO/ledger-of-ash && git add ledger-of-ash.html && git commit -m "fix(engine): remove 3 dead renderCharacterSheet() references — function was never defined"
```

---

## Task 3: Add 7 missing TRAVEL_ROUTES + ROUTE_SPATIAL_DATA entries

**Severity:** HIGH. The world graph (`data/reference/07_WORLD_GRAPH/locality_travel_network.json`) defines 7 direct routes from Stage 1 localities to Fairhaven. None of these routes exist in `TRAVEL_ROUTES` (travel_corridors.js) or `ROUTE_SPATIAL_DATA` (travel_route_data.js). Players in Ithtananalor, Mimolot Academy, Panim Haven, Shirshal, Soreheim Proper, Sunspire Haven, or Aurora Crown Commune cannot travel directly to Fairhaven.

**Files:**
- Modify: `content/travel_corridors.js` — TRAVEL_ROUTES block (~line 97)
- Modify: `content/travel_route_data.js` — ROUTE_SPATIAL_DATA object (before closing `};`)

- [ ] **Step 1: Add to TRAVEL_ROUTES in travel_corridors.js**

In `content/travel_corridors.js`, find the closing of the `TRAVEL_ROUTES` object (after the `eternal_lands|soreheim_proper` entry at ~line 96). Before the closing `};`, add:

```js
    // Direct Fairhaven spoke routes (from world graph — previously missing)
    'ithtananalor|fairhaven':          { tier:'long', biome:'forest',   foot:46.8,  horse:28.1,  cart:62.4,  boat:0 },
    'fairhaven|ithtananalor':          { tier:'long', biome:'forest',   foot:46.8,  horse:28.1,  cart:62.4,  boat:0 },
    'mimolot_academy|fairhaven':       { tier:'long', biome:'plains',   foot:62.3,  horse:37.4,  cart:83.1,  boat:0 },
    'fairhaven|mimolot_academy':       { tier:'long', biome:'plains',   foot:62.3,  horse:37.4,  cart:83.1,  boat:0 },
    'panim_haven|fairhaven':           { tier:'long', biome:'coastal',  foot:91.7,  horse:55.0,  cart:122.3, boat:0 },
    'fairhaven|panim_haven':           { tier:'long', biome:'coastal',  foot:91.7,  horse:55.0,  cart:122.3, boat:0 },
    'shirshal|fairhaven':              { tier:'long', biome:'coastal',  foot:51.2,  horse:30.7,  cart:68.3,  boat:0 },
    'fairhaven|shirshal':              { tier:'long', biome:'coastal',  foot:51.2,  horse:30.7,  cart:68.3,  boat:0 },
    'soreheim_proper|fairhaven':       { tier:'long', biome:'mountain', foot:285.2, horse:171.1, cart:380.3, boat:0 },
    'fairhaven|soreheim_proper':       { tier:'long', biome:'mountain', foot:285.2, horse:171.1, cart:380.3, boat:0 },
    'sunspire_haven|fairhaven':        { tier:'long', biome:'highland', foot:244.5, horse:146.7, cart:326.1, boat:0 },
    'fairhaven|sunspire_haven':        { tier:'long', biome:'highland', foot:244.5, horse:146.7, cart:326.1, boat:0 },
    'aurora_crown_commune|fairhaven':  { tier:'long', biome:'highland', foot:108.2, horse:64.9,  cart:144.3, boat:0 },
    'fairhaven|aurora_crown_commune':  { tier:'long', biome:'highland', foot:108.2, horse:64.9,  cart:144.3, boat:0 },
```

- [ ] **Step 2: Add to ROUTE_SPATIAL_DATA in travel_route_data.js**

In `content/travel_route_data.js`, before the closing `};` of `window.ROUTE_SPATIAL_DATA`, add:

```js
  'ithtananalor|fairhaven': {
    route_note: 'The forest road west to Fairhaven is older than the guild maintenance schedule. The verge is overgrown past the first waymarker. Guild transit seals are still required at the Fairhaven boundary, but there is no one to check them before that.',
    biomes: ['forest', 'plains'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'mimolot_academy|fairhaven': {
    route_note: 'The Mimolot plains road to Fairhaven carries Academy-sealed cargo regularly. The guild checkpoint at the Fairhaven entry is familiar with Academy manifests. Familiarity is not the same as speed.',
    biomes: ['plains'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'panim_haven|fairhaven': {
    route_note: 'The coastal road north from Panim Haven runs three months of patrol conflict before the terrain opens into Fairhaven approach. Jurisdiction shifts twice without posted markers.',
    biomes: ['coastal', 'plains'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'shirshal|fairhaven': {
    route_note: 'The Shirshal road to Fairhaven passes through contested patrol territory for the first quarter of the route. After the boundary post, the road improves and the jurisdiction becomes clear again.',
    biomes: ['coastal', 'plains'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'soreheim_proper|fairhaven': {
    route_note: 'The direct road from Soreheim to Fairhaven crosses three territorial boundaries and two mountain passes. Most cargo traffic uses the Guildheart Hub relay. This route exists but is not maintained for speed.',
    biomes: ['mountain', 'highland', 'plains'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'sunspire_haven|fairhaven': {
    route_note: 'The highland road from Sunspire to Fairhaven descends through two elevation changes and a stretch of unmarked Soreheim extraction territory. Quota transit rules apply at the boundary post, if anyone is staffing it.',
    biomes: ['highland', 'plains'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'aurora_crown_commune|fairhaven': {
    route_note: 'The long road from Aurora Crown to Fairhaven bypasses Shelkopolis entirely. Sheresh transit papers are valid through the first two checkpoints. After the territorial boundary, they are not.',
    biomes: ['highland', 'plains'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
```

- [ ] **Step 3: Syntax check both files**

```bash
cd C:/Users/CEO/ledger-of-ash && node --check content/travel_corridors.js && node --check content/travel_route_data.js && echo ALL OK
```

- [ ] **Step 4: Commit**

```bash
cd C:/Users/CEO/ledger-of-ash && git add content/travel_corridors.js content/travel_route_data.js && git commit -m "fix(travel): add 7 missing Fairhaven spoke routes to TRAVEL_ROUTES and ROUTE_SPATIAL_DATA"
```

---

## Task 4: Add 7 missing ROUTE_COMPLICATIONS entries

**Severity:** HIGH. The 7 routes added in Task 3 have no `ROUTE_COMPLICATIONS` entries. When the travel overlay fires a complication encounter on these routes, `ROUTE_COMPLICATIONS.get(fromId, toId)` returns null and the encounter type defaults silently. Each route needs `checkpoint`, `patrol`, `night`, and `hazard` entries following the exact established pattern.

**File:** `content/travel_corridors.js` — `window.ROUTE_COMPLICATIONS` block

The pattern for every complication entry:
```js
window.ROUTE_COMPLICATIONS['KEY'] = {
  checkpoint: { title: '...', text: '...', choices: [{ text:'...', skill:'...', tag:'safe'|'risky', action: function() { var r = rollD20('skill'); if (r.total >= DC) { addNarration('', 'success text'); gainXp(N); } else { addNarration('', 'fail text'); addHeat('polity', N); } setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500); } }] },
  patrol: { ... },
  night: { ... },
  hazard: { ... }
};
```

- [ ] **Step 1: Add ROUTE_COMPLICATIONS for all 7 routes**

At the end of `content/travel_corridors.js`, before `})();`, add the following 7 entries. Add them after the last existing ROUTE_COMPLICATIONS entry (the `eternal_lands|soreheim_proper` entry):

```js
  // ── 7 Fairhaven spoke routes added in Round 3 ──

  window.ROUTE_COMPLICATIONS['ithtananalor|fairhaven'] = {
    checkpoint: {
      title: 'Guild Transit Gate — Forest Road West',
      text: 'The guild transit gate at the forest road junction is unmanned — but the barrier arm is down and the logbook on the post is open to today\'s date. Someone will come back to check entries. Or they will not.',
      choices: [
        { text: 'Log the entry yourself and raise the arm.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'The entry is plausible. The arm raises on its counterweight. No one comes back before you are past sight of the post.'); gainXp(10); }
            else { addNarration('', 'The handwriting is close but not close enough. The guild archivist who reviews this log will notice the discrepancy in the entry sequence.'); addHeat('union', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Wait at the barrier. Someone will return.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'The warden returns in forty minutes. She checks the log, checks you, stamps your transit card without comment. The arm goes up.'); gainXp(15); }
            else { addNarration('', 'The warden is accompanied by a colleague. The second warden is the one who asks questions. Her questions are specific.'); addHeat('union', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Ithtananalor Forest Warden Pair',
      text: 'Two forest wardens — not guild, Ithtananalor local authority — moving east on the same road. They work in pairs here and they are watching the tree line as much as the road. The one nearest the road edge glances at you and does not look away.',
      choices: [
        { text: 'Name the road you came from and where you are going. Specific answers disarm suspicion.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'Specific answers land correctly. The warden notes something in a pocket log and nods. Her partner has already moved on.'); gainXp(10); }
            else { addNarration('', 'The answer is too specific in the wrong way — the road junction you named doesn\'t match the usual westbound route. She asks a second question.'); addHeat('shirsh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Step off the path into the tree margin before they reach you.', skill: 'finesse', tag: 'risky',
          action: function() {
            var r = rollD20('finesse');
            if (r.total >= 13) { addNarration('', 'The tree margin is deep enough. They pass. The one watching the tree line looks directly at where you are standing and sees nothing worth stopping for.'); gainXp(20); }
            else { addNarration('', 'Movement in the trees is exactly what the tree-line watcher is trained for. She signals her partner without raising her voice.'); addHeat('shirsh', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Forest Road After Dark',
      text: 'The forest road west does not have posted night rules — there is no authority here that maintains them. What there is: the road is narrower in the dark, the canopy overhead kills the moon, and something has been moving parallel to you in the tree margin for the last quarter mile.',
      choices: [
        { text: 'Build a fire at the roadside and wait for dawn.', skill: 'vigor', tag: 'safe',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 7) { addNarration('', 'The fire works. Whatever was moving stops. The road at dawn is quiet and you are rested enough to continue.'); gainXp(10); }
            else { addNarration('', 'The fire draws a different kind of attention — a traveler coming the other way, moving fast, who asks too many questions before continuing east.'); addHeat('shirsh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Keep moving. Whatever is in the trees has not stepped onto the road yet.', skill: 'finesse', tag: 'risky',
          action: function() {
            var r = rollD20('finesse');
            if (r.total >= 13) { addNarration('', 'The parallel movement stops after another half mile. The road widens as the forest thins. The plains boundary is ahead.'); gainXp(20); }
            else { addNarration('', 'The parallel movement stops — and something steps onto the road ahead of you instead of beside you.'); addHeat('shirsh', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Washed-Out Forest Road Section',
      text: 'The road surface has failed over a stretch of roughly sixty meters — storm runoff has taken the compacted base with it and left loose aggregate over a soft underlayer. Cart passage is risky. Even foot travel requires care. There is no way around.',
      choices: [
        { text: 'Test the surface carefully before committing weight.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Testing the edge first tells you where the firm substrate is. The crossing takes time but nothing gives way.'); gainXp(10); }
            else { addNarration('', 'The test was not thorough enough. The surface holds for the first thirty meters and fails on the last ten. Wet boots, a turned ankle, a lost hour.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Move fast across the worst section. Speed is better than weight.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'The surface moves under you but you are across before it can decide what to do about it.'); gainXp(20); }
            else { addNarration('', 'Fast is not right here. The surface gives at the midpoint. The recovery costs time and gear.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  window.ROUTE_COMPLICATIONS['mimolot_academy|fairhaven'] = {
    checkpoint: {
      title: 'Academy Cargo Inspection Post',
      text: 'The inspection post at the academy road junction is staffed by a Mimolot security officer, not a guild warden. She checks the cargo manifest against a sealed Academy register. The process is thorough and the officer has been doing it long enough that small discrepancies register as clearly as large ones.',
      choices: [
        { text: 'Present the transit papers before she asks for them.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'The papers are in order. She checks the Academy seal, checks the date stamp, hands them back. The barrier arm goes up.'); gainXp(10); }
            else { addNarration('', 'The papers are in order but the departure time listed conflicts with the road distance. She flags it for review.'); addHeat('mimolot', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Name the transit administrator who approved the route.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'The name is correct and she knows it. The verification that would otherwise take ten minutes takes two. The arm goes up.'); gainXp(20); }
            else { addNarration('', 'The name is correct but she asks which office processes that administrator\'s approvals. The answer is not in the papers.'); addHeat('mimolot', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Plains Road Guild Patrol',
      text: 'A mounted guild patrol working the plains road — two riders, grey transit cloaks, moving at standard inspection pace. One is checking the road surface. The other is checking travelers. The traveler-checker has already assessed your pack size.',
      choices: [
        { text: 'Keep moving at even pace. Nothing to indicate otherwise.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'The pack assessment does not turn into a stop. The patrol continues its pattern. You continue yours.'); gainXp(10); }
            else { addNarration('', 'The patrol circles back. The traveler-checker asks where you\'re going and what your business is on the Academy road.'); addHeat('union', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Produce the transit papers before the patrol reaches you.', skill: 'wits', tag: 'risky',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 13) { addNarration('', 'Producing papers preemptively reads as compliance. The patrol reviews them at pace without stopping.'); gainXp(15); }
            else { addNarration('', 'Producing papers preemptively reads as anxiety. The patrol stops to conduct a full inspection.'); addHeat('union', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Plains Road Night Curfew',
      text: 'The Mimolot plains road carries a posted night curfew for non-cargo transit — sunset to dawn, non-emergency passage requires a night permit. The checkpoint post ahead has its lamp lit, which means the overnight warden is on duty.',
      choices: [
        { text: 'Produce the transit papers and claim urgent Academy business.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'Academy business is a recognized category. The warden checks the seal and waves you through with a note for the morning log.'); gainXp(10); }
            else { addNarration('', 'The warden checks the seal and it is correct, but the request for an urgent-transit endorsement note goes poorly. He writes the stop in the log.'); addHeat('union', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Leave the road before the checkpoint and rejoin it after.', skill: 'finesse', tag: 'risky',
          action: function() {
            var r = rollD20('finesse');
            if (r.total >= 13) { addNarration('', 'The verge is flat enough to navigate by starlight. The checkpoint lamp is behind you before the warden\'s eyes adjust to the dark.'); gainXp(20); }
            else { addNarration('', 'The verge is flat but the checkpoint warden has a lantern on a post that covers the standard deviation distance. She sees the movement.'); addHeat('union', 3); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Dust Storm on the Plains Road',
      text: 'A dust front moving from the west — visible for twenty minutes, now here. The visibility on the plains road drops to ten meters in the heavier gusts. There is no shelter on the road itself. The route markers are posts every half mile, but the next one is not visible.',
      choices: [
        { text: 'Stop and wait the storm out with your back to the wind.', skill: 'vigor', tag: 'safe',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 7) { addNarration('', 'The storm passes in an hour. The dust settles unevenly — thicker on the eastern side, thinner on the road surface itself. You continue.'); gainXp(10); }
            else { addNarration('', 'The wait costs more than an hour. The dust has settled into your kit and the road surface is altered enough that the next stretch is slow.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Navigate by the wind direction alone. West to east. Keep moving.', skill: 'wits', tag: 'risky',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 13) { addNarration('', 'The wind is consistent and so is the road surface under your feet. You arrive at the next route marker without having stopped.'); gainXp(20); }
            else { addNarration('', 'The wind shifts twice. The road does not. You leave the road surface without realizing it and spend thirty minutes reorienting.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  window.ROUTE_COMPLICATIONS['panim_haven|fairhaven'] = {
    checkpoint: {
      title: 'Contested Patrol Zone Boundary Post',
      text: 'The boundary post between Panim Haven authority and the neutral coastal stretch is staffed by two wardens — one from each jurisdiction. They are not cooperating on the manifest check. They are each conducting a separate check. You will need to satisfy both.',
      choices: [
        { text: 'Address the Panim warden first. The originating jurisdiction takes precedence.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Addressing the Panim warden first is the correct protocol. The second warden accepts the Panim clearance and adds his own stamp. Both arms go up.'); gainXp(10); }
            else { addNarration('', 'The Panim warden is satisfied but the second warden has a different question set. She asks about cargo weight and the answer is approximate, not exact.'); addHeat('panim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Present the papers to both simultaneously. Efficiency as compliance.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'Both wardens accept the simultaneous presentation as confidence. The clearance is faster than standard. You are through in four minutes.'); gainXp(20); }
            else { addNarration('', 'The wardens have a protocol dispute about which clearance is primary. You are held at the post for twenty minutes while they resolve it between themselves.'); addHeat('panim', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Coastal Road Patrol — Panim Haven Authority',
      text: 'A Panim Haven authority patrol on the coastal road — foot patrol, three wardens, moving north at standard pace. The lead warden has stopped to check the last traveler passed. You will be the next traveler she checks.',
      choices: [
        { text: 'Join the queue behind the current traveler being checked. Orderly.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'The queue approach signals compliance. Your check is faster than the previous traveler\'s — her warden is warmed up and the papers are routine.'); gainXp(10); }
            else { addNarration('', 'The previous traveler\'s check reveals something irregular. The warden\'s attention level is elevated by the time she reaches you.'); addHeat('panim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Turn onto the beach access path before reaching the check point.', skill: 'finesse', tag: 'risky',
          action: function() {
            var r = rollD20('finesse');
            if (r.total >= 13) { addNarration('', 'The beach access path is not the road and the patrol is working the road. You rejoin the coastal road two hundred meters north of the checkpoint.'); gainXp(20); }
            else { addNarration('', 'One of the three wardens is watching the beach access path. It is the third warden, not the lead, which is worse.'); addHeat('panim', 3); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Coastal Road After Curfew — Panim Haven',
      text: 'The coastal road carries a posted curfew that Panim Haven authority enforces — the night warden at the marker post is one of three stationed at intervals along this stretch. The nearest lamp is visible ahead.',
      choices: [
        { text: 'Approach the post and report travel delay — weather, road condition, route error.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'The warden accepts the delay explanation and marks it in the log. Night-transit approval is noted as situational. You continue.'); gainXp(10); }
            else { addNarration('', 'The warden accepts the explanation but asks for a specific route confirmation. The route you name has a checkpoint record that would show your timing.'); addHeat('panim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Use the beach margin. Below the road edge, below the lamp radius.', skill: 'finesse', tag: 'risky',
          action: function() {
            var r = rollD20('finesse');
            if (r.total >= 13) { addNarration('', 'The beach margin is below the lamp radius and the warden is watching the road, not the tide line. The post is behind you.'); gainXp(20); }
            else { addNarration('', 'The tide line is higher than the visible mark from the road. The margin is narrower than calculated.'); addHeat('panim', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Coastal Flooding on the Northern Stretch',
      text: 'The coastal road north of the boundary post has taken tidal flooding — a stretch of eighty meters is under twenty centimeters of water with soft sand underneath. The water is receding but not quickly. Waiting means losing a tide window on the other end.',
      choices: [
        { text: 'Find the highest edge of the road and move carefully across the flooded section.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'The highest road edge holds firm. The crossing is wet but nothing gives way under the water.'); gainXp(10); }
            else { addNarration('', 'The apparent high edge is not the actual high edge. The soft section is on the right side, not the left.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Move quickly and accept the wet kit. The delay of waiting is worse.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'Quick movement keeps you in the shallower water. The kit is wet but functional. You are past the flooded section in three minutes.'); gainXp(15); }
            else { addNarration('', 'Quick movement finds the soft section before the firm section. Recovery costs time and a boot.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  window.ROUTE_COMPLICATIONS['shirshal|fairhaven'] = {
    checkpoint: {
      title: 'Shirshal Transit Boundary Post',
      text: 'The road north from Shirshal crosses a jurisdiction boundary two days out from the city. The post is marked with both Shirshal authority colors and Principalities grey. The warden on duty is Principalities — she checks Shirshal-origin manifests against a different register than she uses for local transit.',
      choices: [
        { text: 'Declare Shirshal origin and present the full transit record.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Full declaration matches the cross-reference register. The warden stamps the transit card with the boundary clearance mark. Straightforward.'); gainXp(10); }
            else { addNarration('', 'The Shirshal origin declaration triggers a secondary check for the item classification list. One item in your kit is on the list.'); addHeat('shirsh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Omit the Shirshal origin and declare the boundary post as origin point.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'The boundary post as origin is not common but not implausible. The warden accepts it without the secondary check. You continue.'); gainXp(20); }
            else { addNarration('', 'The boundary post origin does not match the road wear on your kit. The warden knows what a two-day road journey looks like.'); addHeat('shirsh', 2); addHeat('union', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Jurisdiction Boundary Patrol',
      text: 'A joint patrol — one Shirshal authority warden and one Principalities warden riding together. The combination is uncommon. It means someone upstream has flagged the route for elevated scrutiny. They are moving south, checking travelers moving north.',
      choices: [
        { text: 'Answer the Principalities warden first. Her jurisdiction is where you are going.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'The Principalities warden takes the lead and is satisfied quickly. The Shirshal warden adds one question and accepts your answer. Joint patrol clears you.'); gainXp(10); }
            else { addNarration('', 'The Principalities warden is satisfied but the Shirshal warden has a different question — about your activities in Shirshal, specifically.'); addHeat('shirsh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Step off the road onto the coastal verge as if checking your pack.', skill: 'finesse', tag: 'risky',
          action: function() {
            var r = rollD20('finesse');
            if (r.total >= 13) { addNarration('', 'The pack-check reads as traveler behavior, not avoidance. The patrol passes. You rejoin the road.'); gainXp(20); }
            else { addNarration('', 'The Shirshal warden specifically watches travelers who step off the road before being checked. That is the behavior he was briefed on.'); addHeat('shirsh', 3); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Night Road North of the Jurisdiction Line',
      text: 'The road north of the jurisdiction boundary does not carry a formal night curfew — but the patrol pattern on this stretch runs through the night because the joint agreement requires it. A patrol lamp is visible a quarter mile ahead, moving south.',
      choices: [
        { text: 'Wait off-road for the patrol to pass before continuing.', skill: 'vigor', tag: 'safe',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 7) { addNarration('', 'The patrol passes within forty meters of where you are waiting. The lamp does not sweep the road margin. You continue when the light is far enough south.'); gainXp(10); }
            else { addNarration('', 'The wait is correct but the patrol interval is shorter than standard. A second lamp appears before you have moved far enough north.'); addHeat('shirsh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Flag the patrol and declare night travel. Easier than avoiding it.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'The patrol logs the night transit declaration and issues a temporary clearance. Legal, documented, done.'); gainXp(15); }
            else { addNarration('', 'The declaration triggers the Shirshal warden\'s interest in why you are moving at night on this specific road.'); addHeat('shirsh', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Road Surface Failure Near the Coast',
      text: 'Coastal erosion has taken the eastern edge of the road over a stretch of forty meters. What remains is a one-meter-wide firm strip with a two-meter drop to the beach on the right. The strip is solid but narrow. Wind from the sea is consistent.',
      choices: [
        { text: 'Move along the left edge, away from the drop. Slower but controlled.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Left edge is correct. The road surface is firm there and you have enough margin to move safely through the full stretch.'); gainXp(10); }
            else { addNarration('', 'Left edge is soft in the middle section where a second failure point has not yet opened fully. The surface dips under your weight.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Move quickly across the narrow section. Less time on the unstable ground.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'Speed across the narrow section keeps you on the firm surface. You are past the erosion damage in thirty seconds.'); gainXp(20); }
            else { addNarration('', 'Speed works against you when the wind gusts. The movement is fine; the wind is not.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  window.ROUTE_COMPLICATIONS['soreheim_proper|fairhaven'] = {
    checkpoint: {
      title: 'Multi-Jurisdiction Mountain Transit Gate',
      text: 'The mountain transit gate on the long Soreheim-to-Fairhaven road sits at the first territorial boundary — a full two weeks\' walk from Soreheim. The post is staffed by a quota authority warden who checks extraction manifests against a transit ledger. Non-extraction travelers are checked separately.',
      choices: [
        { text: 'Declare non-extraction status immediately. The separate process is faster.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Non-extraction transit is a narrow but recognized category. The warden uses a shorter form. The gate opens in ten minutes.'); gainXp(10); }
            else { addNarration('', 'Non-extraction declaration requires a purpose statement. The warden asks what business takes a traveler on the direct mountain road to Fairhaven.'); addHeat('soreheim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Use the guild transit seal to bypass the quota authority process.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'The guild seal correctly overrides the quota authority process for non-extraction transit. The warden is not happy about it but the protocol is clear.'); gainXp(20); }
            else { addNarration('', 'The quota authority warden checks with her supervisor before accepting the guild seal override. The supervisor takes fifteen minutes to arrive.'); addHeat('soreheim', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Soreheim Mountain Road Extraction Patrol',
      text: 'An extraction monitoring patrol — checking that cargo moving on the mountain road matches filed extraction outputs. They are thorough and they have time. The patrol leader asks every non-extraction traveler the same three questions.',
      choices: [
        { text: 'Answer the three standard questions before they are asked. Road preparation.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Pre-answering the standard questions signals familiarity with Soreheim transit procedure. The patrol leader marks the log quickly and moves on.'); gainXp(15); }
            else { addNarration('', 'Anticipating the questions reads as rehearsal. The patrol leader adds a fourth question that is not standard.'); addHeat('soreheim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'State the transit purpose plainly. Specific detail deflects further questioning.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'Specific purpose and destination detail satisfies the patrol leader\'s threshold. She does not ask the third standard question.'); gainXp(20); }
            else { addNarration('', 'The specific destination triggers a cross-reference check — there is a travel advisory for the route you named that you were not aware of.'); addHeat('soreheim', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Mountain Road — Cold Night at Altitude',
      text: 'The high mountain section of this route drops temperature significantly after dark. The road is safe but exposure is a risk for travelers without mountain kit. A Soreheim extraction crew camp is visible at the next switchback — firelight, tents, a cook fire.',
      choices: [
        { text: 'Request temporary shelter at the extraction crew camp.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'Extraction crew camps regularly take in transit travelers. The crew leader assigns you a fire position and charges nothing. By morning the temperature has dropped another six degrees outside.'); gainXp(10); }
            else { addNarration('', 'The crew leader accepts the shelter request but asks which quota authority issued your non-extraction transit clearance. The answer is in the papers but the papers are in your pack.'); addHeat('soreheim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Continue past the camp and find natural shelter in the rock formations above the switchback.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'The rock formation provides good windbreak. The temperature is manageable and you are moving again before the extraction crew has finished breakfast.'); gainXp(20); }
            else { addNarration('', 'The rock formation is good windbreak but poor thermal mass. The cold settles in over three hours and does not lift until after dawn.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Rock Fall on the Mountain Road',
      text: 'A recent rock fall has covered a section of mountain road with loose debris — ranging from fist-sized stones to blocks a meter across. The road is impassable for carts. Foot passage requires careful navigation.',
      choices: [
        { text: 'Assess the debris field and plot a line through it before moving.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'The assessment finds a line through the debris that avoids the unstable large blocks. The crossing is slow but nothing shifts under you.'); gainXp(10); }
            else { addNarration('', 'The assessed line is correct until the fourth large block, which has a different stability than it appears from a distance.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Move continuously across the debris field. Continuous weight distribution is safer than static.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'Continuous movement works. The debris shifts in places but not enough to catch a moving foot. You are across in four minutes.'); gainXp(20); }
            else { addNarration('', 'Continuous movement finds the wrong stone at the wrong angle. The recovery is possible but the right ankle is slow for the next day.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  window.ROUTE_COMPLICATIONS['sunspire_haven|fairhaven'] = {
    checkpoint: {
      title: 'Soreheim Highland Boundary Post',
      text: 'The Soreheim highland boundary post sits at the elevation drop where the highland road begins its long descent toward the Principalities. The warden checks outbound transit against the quota compliance register — extraction workers can leave freely, but non-extraction travelers require a purpose declaration.',
      choices: [
        { text: 'State the transit purpose specifically: destination, time, reason.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'The purpose declaration satisfies the compliance register threshold. The warden stamps the outbound record and opens the gate.'); gainXp(10); }
            else { addNarration('', 'The destination is accepted but the time declared conflicts with the road distance. The warden asks for a route explanation.'); addHeat('soreheim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Present the Sunspire Haven transit authorization seal.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'The Sunspire Haven seal is recognized. The warden checks the date stamp, finds it current, and processes the outbound transit without the standard declaration.'); gainXp(20); }
            else { addNarration('', 'The seal is recognized but the Sunspire Haven authorization requires counter-signature from a Soreheim quota officer. The warden asks where to find one on this road.'); addHeat('soreheim', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Highland Road Patrol — Quota Monitoring',
      text: 'A quota monitoring patrol on the highland road descent — checking that highland travelers are not carrying undeclared extraction outputs. The patrol is working south and has already checked three travelers ahead of you. The lead warden\'s approach changes slightly after the third check.',
      choices: [
        { text: 'Open your pack for inspection before they ask. No undeclared material.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Voluntary inspection reads as confidence. The patrol checks quickly and moves on. Their changed approach was not about you.'); gainXp(10); }
            else { addNarration('', 'Voluntary inspection finds nothing declarable, but one item in the pack has a material profile that requires a cross-reference check. It takes twenty minutes.'); addHeat('soreheim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Match the patrol\'s changed approach by slowing your pace. Let them come to you.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'The pacing reads as patience, not concern. The warden reaches you and runs a standard check — their changed approach was about the previous traveler, not you.'); gainXp(20); }
            else { addNarration('', 'Slowing down on the road when a patrol has visually acquired you is interpreted as hesitation. The patrol stops early.'); addHeat('soreheim', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Highland Descent — Fog After Dark',
      text: 'Fog on the highland descent — common at this elevation after dark. The road surface is sound but visibility is reduced to five meters and the descent has steep sections without guardrail. The next road marker is not visible. The one before it is barely visible.',
      choices: [
        { text: 'Move by the road edge on the uphill side. Stay on the firm surface.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Uphill edge is the right call. The road curves left at the steep section and the uphill edge keeps you on the inside of the curve. You reach the marker.'); gainXp(10); }
            else { addNarration('', 'Uphill edge is correct until the switchback where uphill becomes downhill. The transition in fog takes a moment to process.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Stop and wait for the fog to lift or for dawn. Either ends the hazard.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'The fog lifts two hours before dawn. The road is clear and you are moving again in good time.'); gainXp(15); }
            else { addNarration('', 'The fog does not lift before dawn. Dawn only makes the fog visible. You lose four hours.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Unstable Ground on the Highland Road',
      text: 'The highland road crosses a section of subsidence — the ground beneath the road has shifted and the surface above is visibly cracked across the width of the road. The cracks are recent; the edges are sharp. The subsidence may be ongoing.',
      choices: [
        { text: 'Cross quickly at the section with the smallest crack gap.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'The smallest crack section is also the most recently cracked — the edges are sharp enough to grip. The crossing is quick.'); gainXp(10); }
            else { addNarration('', 'Smallest gap is not smallest subsidence. The road surface flexes under weight at that point.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Move at the road edge where the bedrock outcrops. Solid ground underneath.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'Bedrock outcrop at the road edge holds. The subsidence has not reached that section. You are across.'); gainXp(20); }
            else { addNarration('', 'The bedrock outcrop is correct but narrow. The kit catches on the road edge crack. Recovery costs time.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  window.ROUTE_COMPLICATIONS['aurora_crown_commune|fairhaven'] = {
    checkpoint: {
      title: 'Sheresh Transit Boundary — Fairhaven Approach',
      text: 'The long road from Aurora Crown to Fairhaven passes through a territorial checkpoint where Sheresh authority ends and Principalities authority begins. The post is staffed by two wardens — one from each side — and they apply different documents to the same traveler.',
      choices: [
        { text: 'Present Sheresh transit papers to the Sheresh warden and Principalities transit to the other.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Presenting authority-specific documents to the correct warden in sequence is the expected protocol. Both clear you without consultation.'); gainXp(10); }
            else { addNarration('', 'The Sheresh papers are current but the purpose declaration on the Principalities side requires cross-referencing the Sheresh record. They confer.'); addHeat('sheresh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Use the guild seal as the primary clearance document. Both wardens accept guild authority.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'Both wardens accept the guild seal as primary — they have seen this before and neither side wants to dispute guild transit authority on this road.'); gainXp(20); }
            else { addNarration('', 'The Sheresh warden accepts the guild seal. The Principalities warden asks which guild office issued it and which transit route was originally filed.'); addHeat('union', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Sheresh Perimeter Patrol — Outbound',
      text: 'A Sheresh authority patrol checking outbound travelers — specifically looking for undeclared equipment from the Aurora Crown commune area. The patrol is post-inspection, not pre-inspection: they check what you are carrying out, not what you have transit approval for.',
      choices: [
        { text: 'Open the kit fully. Nothing undeclared from the commune.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Full kit presentation reads as compliance with the outbound inspection protocol. The patrol marks the log and clears you.'); gainXp(10); }
            else { addNarration('', 'Full kit presentation is accepted but one item has a material signature they note. They ask where it was acquired.'); addHeat('sheresh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Name the Sheresh transit coordinator who processed the outbound clearance.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'The name is current and known to the patrol leader. She checks the log and finds the clearance. The outbound inspection is waived.'); gainXp(20); }
            else { addNarration('', 'The name is current but the coordinator works a different sector. The patrol leader asks which sector issued the clearance.'); addHeat('sheresh', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Highland Road — Night Watch Post',
      text: 'The highland road from Aurora Crown carries a Sheresh night watch post at the halfway marker. The post is occupied — a single warden with a fire and a log. She checks everyone who passes the marker after dark, without exception.',
      choices: [
        { text: 'Stop at the post, declare night transit, and present the outbound clearance.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'The declaration and clearance are in order. She logs the night transit and hands back the clearance with a time stamp. The road ahead is clear.'); gainXp(10); }
            else { addNarration('', 'The clearance is accepted but her standard follow-up question about activity in the commune area takes twenty minutes to satisfy.'); addHeat('sheresh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Leave the road before the halfway marker and rejoin it after the post.', skill: 'finesse', tag: 'risky',
          action: function() {
            var r = rollD20('finesse');
            if (r.total >= 13) { addNarration('', 'The highland road margin is wide here and the terrain beyond it is flat. The post lamp does not cover the margin at this distance. You rejoin the road north of the post.'); gainXp(25); }
            else { addNarration('', 'The watch post has a second lamp on the margin side that is not visible from the road approach. The warden\'s field of view is wider than estimated.'); addHeat('sheresh', 3); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Aurora Crown Dome Interference — Equipment Failure',
      text: 'The commune\'s atmospheric dome generates interference on the road approaches. Equipment carried through the dome perimeter frequently malfunctions on the far side. A navigational tool you have been relying on is no longer functioning correctly.',
      choices: [
        { text: 'Navigate by road marker sequence alone. The markers are posted and numbered.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Marker navigation is slower but reliable. The route is marked at every half mile. You reach the territorial boundary without deviation.'); gainXp(10); }
            else { addNarration('', 'Marker navigation works until marker 14, which is missing — removed or fallen. The gap requires a best-estimate decision.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Use terrain features — high ground, road surface, sun position — to continue.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'Terrain navigation works well in highland. The sun position and road surface quality give enough information to stay on route.'); gainXp(20); }
            else { addNarration('', 'The terrain navigation is adequate until the cloud cover changes. Without sun position the terrain features look similar in three directions.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };
```

- [ ] **Step 2: Syntax check**

```bash
cd C:/Users/CEO/ledger-of-ash && node --check content/travel_corridors.js && echo SYNTAX OK
```

- [ ] **Step 3: Commit**

```bash
cd C:/Users/CEO/ledger-of-ash && git add content/travel_corridors.js && git commit -m "fix(travel): add ROUTE_COMPLICATIONS for 7 missing Fairhaven spoke routes"
```

---

## Task 5: Add plot:'main' to Stage 1 advancement choices

**Severity:** HIGH. The `plot:'main'` property causes a blue left-border on choice buttons — the visual signal for main quest advancement. Two gaps exist: (A) all 12 ArcFinale choices (Stage 1→2 transition) have no `plot:'main'`; (B) three specific locality files have main-advancement choices without it.

**Files:**
- All 12 `content/*_to_shelk_arc.js` files — ArcFinale choice object
- `content/stage1_boss.js` — lines 56, 91 (mini-boss choices)
- `content/soreheim_stage1.js` — resolution choices at ~lines 53, 55
- `content/sheresh_stage1.js` — openingHook choices at ~lines 17, 19, 21

For the arc files: each ArcFinale choice is an object in the arc array with `tags: ['ArcFinale', ...]`. Add `plot: 'main',` to each.

- [ ] **Step 1: Add plot:'main' to all 12 ArcFinale choices**

For EACH of the following files, find the ArcFinale choice (grep for `'ArcFinale'`) and add `plot: 'main',` to the choice object, on the line before `tags:`:

Files:
- `content/aurora_crown_commune_to_shelk_arc.js` — ArcFinale at ~line 215
- `content/cosmoria_to_shelk_arc.js` — ArcFinale at ~line 220
- `content/glasswake_commune_to_shelk_arc.js` — ArcFinale at ~line 208
- `content/guildheart_hub_to_shelk_arc.js` — ArcFinale at ~line 214
- `content/harvest_circle_to_shelk_arc.js` — ArcFinale at ~line 225
- `content/ithtananalor_to_shelk_arc.js` — ArcFinale at ~line 220
- `content/mimolot_academy_to_shelk_arc.js` — ArcFinale at ~line 207
- `content/panim_haven_to_shelk_arc.js` — ArcFinale at ~line 211
- `content/shirshal_to_shelk_arc.js` — ArcFinale at ~line 224
- `content/soreheim_proper_to_shelk_arc.js` — ArcFinale at ~line 339
- `content/sunspire_haven_to_shelk_arc.js` — ArcFinale at ~line 217
- `content/whitebridge_commune_to_shelk_arc.js` — ArcFinale at ~line 223

In each file, find the ArcFinale choice object. It looks like:
```js
  {
    label: "Arrive in Shelkopolis...",
    tags: ['ArcFinale', ...],
```
Change to:
```js
  {
    label: "Arrive in Shelkopolis...",
    plot: 'main',
    tags: ['ArcFinale', ...],
```

- [ ] **Step 2: Add plot:'main' to stage1_boss mini-boss choices**

In `content/stage1_boss.js`, find the mini-boss encounter choices at ~lines 50-95. The two choices that set `stage1_miniboss_complete` (the "push" and "flee" options) need `plot: 'main'` added.

Read the file to find the exact choice objects, then add `plot: 'main'` to each.

- [ ] **Step 3: Add plot:'main' to soreheim_stage1 resolution choices**

In `content/soreheim_stage1.js`, find the two resolution choices (~lines 53, 55) — the ones that call `checkStageAdvance()`. Read the file, find the choices, add `plot: 'main'` to each.

- [ ] **Step 4: Add plot:'main' to sheresh_stage1 openingHook choices**

In `content/sheresh_stage1.js`, find the openingHook choices (~lines 17, 19, 21) — the three choices that call `checkStageAdvance()`. Read the file, find the choices, add `plot: 'main'` to each.

- [ ] **Step 5: Syntax check all modified files**

```bash
cd C:/Users/CEO/ledger-of-ash && for f in content/*_to_shelk_arc.js content/stage1_boss.js content/soreheim_stage1.js content/sheresh_stage1.js; do node --check "$f" && echo "OK: $f"; done
```

- [ ] **Step 6: Commit**

```bash
cd C:/Users/CEO/ledger-of-ash && git add content/ && git commit -m "fix(content): add plot:'main' to all 12 ArcFinale choices and stage1 boss/soreheim/sheresh advancement choices"
```

---

## Task 6: Fix forbidden words in Stage 2 content

**Severity:** MEDIUM. Multiple Stage 2 content files use forbidden words in player-facing text: `investigation`/`investigative`, `contact` as a noun for a person, and `in a way that suggests`.

**Files and exact fixes:**

- [ ] **Step 1: Fix stage2_climax.js**

  - Line 12: `G.recentOutcomeType = 'investigation'` → `G.recentOutcomeType = 'discovery'`
  - Find line with `'Your contact chain is intercepted'` → change `contact chain` to `courier chain`

- [ ] **Step 2: Fix stage2_enriched_choices.js (5 violations)**

  Read the file around each line to get exact context, then:
  - Line ~487: `"the contact's name"` → `"the intermediary's name"`
  - Line ~984: `"every contact point you've used this week"` → `"every channel you've used this week"`
  - Line ~988: `"You keep contact brief"` → `"You keep exchanges brief"`
  - Line ~1430: `addJournal('Warden contact closed down` → `addJournal('Warden channel closed down`
  - Line ~1968: `addJournal('Liaison met unregistered contact carrying` → `addJournal('Liaison met unregistered courier carrying`
  - Line ~1974: `'The contact leaves by a service door'` → `'The courier leaves by a service door'`

- [ ] **Step 3: Fix shirshal_stage2_enriched_choices.js (2 violations)**

  - Line ~1459: Result text contains `"investigation"` three times. Change: 
    - `"specifically for inter-bureau compliance investigations"` → `"specifically for inter-bureau compliance reviews"`
    - `"Fairhaven was told a compliance investigation existed"` → `"Fairhaven was told a compliance case existed"`
    - `"Whatever that investigation contained"` → `"Whatever that case contained"`
  - Line ~1657: `"The hold on pre-consolidation investigative requests"` → `"The hold on pre-consolidation archival requests"`

- [ ] **Step 4: Fix shelkopolis_stage2_enriched_choices.js (3 violations)**

  - Line ~197: `"The contact is established regardless."` → `"The line is open regardless."`
  - Line ~1275: `"Pressure on the investigation increases by one."` → `"The route has grown harder to work quietly."`
  - Line ~1373: Find the exact text containing `"in a way that suggests"` (the forbidden editorial phrase). Read the surrounding context, then rewrite the sentence to show the observable directly. For example: `"...in a way that suggests a different author or a different moment of composition."` → `"...the syntax tightens in the third paragraph — a different hand, or a different hour."`

- [ ] **Step 5: Fix whitebridge_commune_stage2_enriched_choices.js**

  - Line ~407: `"the contact has standing to be there at any hour"` → `"the courier has standing to be there at any hour"`

- [ ] **Step 6: Fix guildheart_hub_stage2_enriched_choices.js**

  - Line ~1060: `"floor brokers are required to record all approach contacts on the Exchange record"` → `"floor brokers are required to record all approach records on the Exchange ledger"`

- [ ] **Step 7: Fix sunspire_haven_stage2_enriched_choices.js**

  - Line ~1118-1119: `"Orvaith was my field monitoring contact for glyph pressure readings."` → `"Orvaith was my field monitoring liaison for glyph pressure readings."` (in both the `G.lastResult` string and the `addJournal` call)

- [ ] **Step 8: Fix panim_haven_stage2_enriched_choices.js**

  - Line ~1731: `"the Collegium contact receives the coin chain by sealed courier"` → `"the Collegium liaison receives the coin chain by sealed courier"`

- [ ] **Step 9: Fix aurora_crown_commune_stage2_enriched_choices.js**

  - Line ~769: `addJournal('Dome dosing method matches Resonance Compact protective protocol exactly — Compact contact identified` → `addJournal('Dome dosing method matches Resonance Compact protective protocol exactly — Compact operative identified`

- [ ] **Step 10: Syntax check all modified files**

```bash
cd C:/Users/CEO/ledger-of-ash && for f in content/stage2_climax.js content/stage2_enriched_choices.js content/shirshal_stage2_enriched_choices.js content/shelkopolis_stage2_enriched_choices.js content/whitebridge_commune_stage2_enriched_choices.js content/guildheart_hub_stage2_enriched_choices.js content/sunspire_haven_stage2_enriched_choices.js content/panim_haven_stage2_enriched_choices.js content/aurora_crown_commune_stage2_enriched_choices.js; do node --check "$f" && echo "OK: $f"; done
```

- [ ] **Step 11: Commit**

```bash
cd C:/Users/CEO/ledger-of-ash && git add content/ && git commit -m "fix(content): remove forbidden words (investigation, contact-as-person, editorial framing) from Stage 2 content"
```

---

## Task 7: Fix forbidden words in Stage 1 content

**Severity:** MEDIUM. Six violations across Stage 1 files.

**Files and fixes:**

- [ ] **Step 1: Fix fairhaven_stage1_enriched_choices.js**

  - Line ~496: In a `G.lastResult` string — `"the scrutiny is standard but it runs the same direction as the investigation."` → `"the scrutiny is standard but it runs the same direction as the inquiry."`

- [ ] **Step 2: Fix guildheart_hub_stage1_enriched_choices.js**

  - Line ~775: Label: `"A guild official is complicit."` → `"A guild officer is complicit."` (officer, not official)

- [ ] **Step 3: Fix harvest_circle_stage1_enriched_choices.js**

  - Line ~703: Label: `"A Harvest Circle official is complicit."` → `"A Harvest Circle officer is complicit."`

- [ ] **Step 4: Fix districts_stage1_enriched_choices.js**

  - Line ~504: Label contains `"outside official positions for two months"` → `"outside appointed roles for two months"`

- [ ] **Step 5: Fix panim_haven_stage1_enriched_choices.js**

  - Line ~641: Label: `"Every precedent favored her. The official ruled against her."` → `"Every precedent favored her. The adjudicator ruled against her."`

- [ ] **Step 6: Fix soreheim_stage1.js**

  - Line ~53: Choice text `"make it official"` → `"make it formal"` (e.g. `"Take the evidence to the Soreheim registry oversight office — make it formal."`)

- [ ] **Step 7: Syntax check**

```bash
cd C:/Users/CEO/ledger-of-ash && for f in content/fairhaven_stage1_enriched_choices.js content/guildheart_hub_stage1_enriched_choices.js content/harvest_circle_stage1_enriched_choices.js content/districts_stage1_enriched_choices.js content/panim_haven_stage1_enriched_choices.js content/soreheim_stage1.js; do node --check "$f" && echo "OK: $f"; done
```

- [ ] **Step 8: Commit**

```bash
cd C:/Users/CEO/ledger-of-ash && git add content/ && git commit -m "fix(content): remove forbidden words (investigation, official) from Stage 1 content"
```

---

## Task 8: Fix label violations in Stage 2 content

**Severity:** MEDIUM. Label violations in Stage 2: NPC-directed verbs in `nomdara_stage2_choices.js`, one overlength label in `stage2_boss.js`, and NPC-directed + overlength in `stage2_shadowhands_arc.js`.

**Files:**

- [ ] **Step 1: Fix nomdara_stage2_choices.js — 4 labels**

  Read the file. The 4 labels at lines ~10, 45, 73, 108 use NPC-directed verbs ("Trade with", "Train with", "Speak to", "Purchase information from"). Replace with player inner-voice labels that still communicate the service type:

  - Line ~10: `"Trade with Lorn — rare items in the caravan stock, priced in hard coin. 'Prices are not negotiable. Barter is.'"` → `"Lorn's stock: rare items, hard coin or barter."`
  - Line ~45: `"Train with Wren — esoteric knowledge in exchange for time. 'She reads ash and distance the same way.'"` → `"Wren's training: esoteric knowledge, paid in time."`
  - Line ~73: `"Speak to Sable about wound or curse removal — 'She does not explain the route. She finds it.'"` → `"Sable's work: wounds and curses. Eighteen coin. She does not explain the route."`
  - Line ~108: `"Purchase information from Lorn — the caravan sees everything passing through every road. The price is coin and discretion."` → `"Lorn's caravan sees every road. Information is ten coin."`

- [ ] **Step 2: Fix stage2_boss.js — 1 overlength label**

  - Line ~89: `"An inquiry form is not a warrant. I don't have to move on his timeline."` (16 words) → `"An inquiry form is not a warrant. His timeline is not mine."` (12 words)

- [ ] **Step 3: Fix stage2_shadowhands_arc.js — 1 NPC-directed + overlength label**

  - Line ~59: `"Ilve needs operational cover for a document transfer. She's offering the Ironhold ledger in exchange."` (17 words, NPC-directed) → `"Cover for a document move. The Ironhold ledger pays for it."` (11 words, player inner voice)

- [ ] **Step 4: Syntax check**

```bash
cd C:/Users/CEO/ledger-of-ash && for f in content/nomdara_stage2_choices.js content/stage2_boss.js content/stage2_shadowhands_arc.js; do node --check "$f" && echo "OK: $f"; done
```

- [ ] **Step 5: Commit**

```bash
cd C:/Users/CEO/ledger-of-ash && git add content/ && git commit -m "fix(content): fix NPC-directed and overlength label violations in Stage 2 nomdara, boss, shadowhands"
```

---

## Task 9: Fix label violations in Stage 1 content

**Severity:** MEDIUM. NPC-directed verbs in locality files + overlength labels in arc files.

**Part A — Locality and standalone files:**

- [ ] **Step 1: Fix nomdara_stage1_choices.js — 2 labels**

  - Line ~12: `"Speak to Sable — wound or fatigue removal. She finds the route and she finds what ails you."` (19 words, NPC-directed) → `"Sable: wound or fatigue removal. She finds what ails you."`
  - Line ~72: `"Speak to the Nomdara Caravan's route shaman, Wren. She reads ash and distance the same way."` (16 words, NPC-directed) → `"Wren reads the road ahead. Ash and distance are the same to her."`

- [ ] **Step 2: Fix soreheim_stage1.js — 1 label**

  - Line ~12: `"Ask the dockworker about the discrepancy."` (NPC-directed verb) → `"The dockworker would know why the numbers don't match."`

- [ ] **Step 3: Fix sheresh_stage1.js — 1 label**

  - Line ~17: `"Ask an elder about the gap in the record."` (NPC-directed verb) → `"An elder would remember what was before the gap."`

- [ ] **Step 4: Fix next sub-choice labels in locality files**

  These appear as `text:` inside `next:` sub-choice arrays. Read each file to find the exact current text:
  
  - `content/ironhold_quarry_stage1_enriched_choices.js` ~line 466: `"Ask Kess to run the charter mark"` → `"Kess can run the charter mark. She has done it before."`
  - `content/plumes_end_outpost_stage1_enriched_choices.js` ~line 410: `"Ask Letha to use her patrol network to locate the displaced farmers"` → `"Letha's patrol network covers this area. She'll know where they went."`
  - `content/shelkopolis_stage1_enriched_choices.js` ~line 870: `"Ask the neighboring stall holder what they observed."` → `"The neighboring stall holder was here. They saw what happened."`
  - `content/guildheart_hub_stage1_enriched_choices.js` ~line 1238: `"Approach the relay post through the official inquiry channel instead."` → `"The relay post has a formal channel. Use that instead."`

**Part B — Arc file overlength labels (systemic):**

The audit found that ArcDeepening and ArcDeparture labels in arc files run 20–35 words. These function as exposition summaries rather than player inner voice, which violates the label standard. Prioritize the most egregious violations:

- [ ] **Step 5: Fix aurora_crown_commune_to_shelk_arc.js overlength labels**

  Read the file. Find labels at ~lines 31 and 75 that exceed 25 words. Rewrite to under 15 words in player inner voice:
  - Line ~31 (33 words, instructive): Read exact text, reduce to under 15 words capturing the core urgency as player thought.
  - Line ~75 (28 words, editorial): Read exact text, reduce to under 15 words.

- [ ] **Step 6: Fix cosmoria_to_shelk_arc.js overlength labels**

  Read the file. Find labels at ~lines 49 and 78 that exceed 20 words:
  - Line ~49 (26 words): Read exact text, reduce to inner voice under 15 words.
  - Line ~78 (30 words): Read exact text, reduce to inner voice under 15 words.

- [ ] **Step 7: Syntax check all modified files**

```bash
cd C:/Users/CEO/ledger-of-ash && for f in content/nomdara_stage1_choices.js content/soreheim_stage1.js content/sheresh_stage1.js content/ironhold_quarry_stage1_enriched_choices.js content/plumes_end_outpost_stage1_enriched_choices.js content/shelkopolis_stage1_enriched_choices.js content/guildheart_hub_stage1_enriched_choices.js content/aurora_crown_commune_to_shelk_arc.js content/cosmoria_to_shelk_arc.js; do node --check "$f" && echo "OK: $f"; done
```

- [ ] **Step 8: Commit**

```bash
cd C:/Users/CEO/ledger-of-ash && git add content/ && git commit -m "fix(content): fix NPC-directed and overlength label violations in Stage 1 locality and arc files"
```

---

## Verification

After all tasks:

```bash
cd C:/Users/CEO/ledger-of-ash && npx playwright test tests/e2e/playtest-headless.spec.js --timeout=1200000 --reporter=line
```

Expected: 1 passed (exit code 0).

Manual checklist:
- [ ] Quest hint: add a quest via DevTools `addQuest('Test quest', 'Hint text here', 'test_q1')`, open journal, verify `→ Hint text here` appears under the quest entry
- [ ] plot:'main': travel to any Stage 1 locality that has an arc unlocked, look at the ArcFinale choice — it should have a blue left border
- [ ] Travel routes: from Ithtananalor or Shirshal, the Fairhaven direct route should appear as a travel option
- [ ] Forbidden words: `grep -r "investigation\|\"official\"\|\"contact\"" content/*_stage2_*.js` should return only non-player-facing occurrences

---

## Self-Review

**Spec coverage:**
- Quest hints silently dropped → Task 1 ✓
- Dead renderCharacterSheet references → Task 2 ✓
- 7 missing TRAVEL_ROUTES + ROUTE_SPATIAL_DATA → Task 3 ✓
- 7 missing ROUTE_COMPLICATIONS → Task 4 ✓
- plot:'main' on 12 ArcFinale + boss/soreheim/sheresh → Task 5 ✓
- Stage 2 forbidden words (investigation ×5, contact ×12, editorial ×1) → Task 6 ✓
- Stage 1 forbidden words (investigation ×1, official ×5) → Task 7 ✓
- Stage 2 label violations (nomdara ×4, boss ×1, shadowhands ×1) → Task 8 ✓
- Stage 1 label violations (nomdara ×2, soreheim/sheresh ×2, next sub-choices ×4, arc overlength ×4) → Task 9 ✓

**Intentionally excluded:**
- G defaults missing properties (worldClocks.attention, _pendingHeatEncounter, worldNotices, axisFlipDay) — all guarded with `|| 0` / `!== undefined` fallbacks; no crash, no player-visible effect; defer
- G.restedWell set but never consumed — dead state, no player impact; defer
- _consecutiveSafeChoices streak HUD — dead feature stub; defer
- content/npc_dossiers.js — needs user decision on wire vs delete
- LOCALITY_MACROREGION false positive — already correct in window version
