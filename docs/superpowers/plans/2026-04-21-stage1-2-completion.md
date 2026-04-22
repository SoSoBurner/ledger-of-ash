# Stage 1 & 2 Completion — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Stages 1 and 2 of Ledger of Ash fully playable with no dead ends, broken mechanics, or missing content.

**Architecture:** The game is a single-file browser text RPG (`ledger-of-ash.html` ~10k lines) with companion JS modules in `js/`. Global state lives in `window.G`. The build script (`build.py`) inlines all `js/` files into `dist/ledger-of-ash.html`. All source edits go to the root `ledger-of-ash.html` or the `js/` files — never to `dist/`.

**CRITICAL — build.py file placement:** `build.py` only picks up files explicitly listed in its `enriched_files` array. New scene files (scope_reveal, sheresh_stage1, etc.) must go in the **root directory** (same level as `ledger-of-ash.html`), NOT in `js/scenes/`. Each new root-level JS file must also be added to `build.py`'s `enriched_files` list.

**Locality polity data:** `data/locality_matrix.js` already has `parent_polity.normalized_key` and `umbrella_polity.normalized_key` on all 44 localities. Task 7 uses these directly — no separate mapping needed. Polity adjacency is derived from `data/route_matrix.js` edges grouped by `parent_polity.normalized_key`.

**Tech Stack:** Vanilla JS/HTML/CSS, localStorage persistence, no build dependencies beyond `build.py`.

---

## File Map

| File | Changes |
|---|---|
| `ledger-of-ash.html` | All bug fixes, UI, systems, content (main source) |
| `js/loa-enriched-bridge.js` | Sideplot key fix, isolation clock, anti-spam, neutral NPC tone |
| `js/travel.js` | Stage lock system, fog of war, Principalities route |
| `js/engine.js` | Clock increment paths, crit next-roll bonus |
| `maren_oss_encounter.js` | Full rewrite as indirect evidence scene |
| `scope_reveal.js` | New root-level file; add to build.py enriched_files |
| `sheresh_stage1.js` | New root-level file; add to build.py enriched_files |
| `soreheim_stage1.js` | New root-level file (replaces interim_seat); add to build.py enriched_files |
| `shadow_ledger_hints.js` | New root-level file; add to build.py enriched_files |

---

## Phase A — Critical Bug Fixes (do these first; everything else depends on a stable base)

---

### Task 1: Fix renderChoices stacking bug + wire Case File meter

**Files:**
- Modify: `ledger-of-ash.html:8178` (`renderChoices` function)
- Modify: `ledger-of-ash.html` (`updateHUD` function, near line 7549)

- [ ] **Step 1: Locate renderChoices and add clearing**

Open `ledger-of-ash.html`, find line 8178 where `function renderChoices(choices)` begins. The function builds a block element and appends it to `#choices` via `el.appendChild(block)` WITHOUT clearing first.

Find the line with `el.appendChild(block)` (approx line 8237). Add `el.innerHTML = '';` immediately before it:

```javascript
// Before (broken):
el.appendChild(block);

// After (fixed):
el.innerHTML = '';
el.appendChild(block);
```

- [ ] **Step 2: Verify the fix**

Open browser console, navigate to a choice scene. Trigger the same scene twice. Verify only one set of choice buttons appears and all are clickable.

- [ ] **Step 3: Wire Case File meter to investigationProgress**

Find the `updateHUD` function (near line 7549). Find where `#stage-progress-fill` is updated (or find it's missing). The HTML at line 1664 has:
```html
<div id="stage-progress-track"><div id="stage-progress-fill"></div></div>
```

In `updateHUD`, add/update the Case File meter wiring:
```javascript
// Wire investigationProgress to the Case File fill bar
var caseFile = document.getElementById('stage-progress-fill');
if (caseFile) {
  var progress = Math.min(100, ((G.investigationProgress || 0) / 10) * 100);
  caseFile.style.width = progress + '%';
}
```

- [ ] **Step 4: Verify meter updates**

Open a new game, complete a choice that increments `investigationProgress`. Confirm the Case File bar fills visually.

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix: renderChoices clear-before-append + wire Case File meter"
```

---

### Task 2: Fix sideplot activation paths (cosmoria key + isolation clock)

**Files:**
- Modify: `js/loa-enriched-bridge.js:737` (SIDEPLOT_TRIGGERS cosmoria key)
- Modify: `js/loa-enriched-bridge.js` (isolation clock increment paths)
- Modify: `js/engine.js` (isolation increment on solo choices)

- [ ] **Step 1: Fix cosmoria locality key mismatch**

In `js/loa-enriched-bridge.js` at line 737, the trigger uses `locality:'cosmoria_harbor'` but the POOL_MAP at line 120 keys it as `cosmoria`. Change the trigger locality:

```javascript
// Before (broken — locality key doesn't match POOL_MAP):
{ id:'cosmoria_weight_fraud', locality:'cosmoria_harbor', clock:'pressure', threshold:3, flag:'sideplot_cosmoria_started',

// After (fixed):
{ id:'cosmoria_weight_fraud', locality:'cosmoria', clock:'pressure', threshold:3, flag:'sideplot_cosmoria_started',
```

- [ ] **Step 2: Add isolation clock increment paths**

In `js/loa-enriched-bridge.js`, find the post-choice hook where world clocks are updated (near the bottom of `sampleEnrichedChoices` or the post-render hook). Add isolation increments:

```javascript
// In the post-choice processing hook, add isolation increment triggers:
function maybeIncrementIsolation(choice) {
  var G = window.G;
  if (!G || !G.worldClocks) return;
  // Solo investigation choices in Stage I
  if (choice && choice.tag === 'risky' && choice.id && choice.id.indexOf('solo') !== -1) {
    G.worldClocks.isolation = (G.worldClocks.isolation || 0) + 1;
  }
  // Failed social contact (result text contains 'dismiss' or 'refuse')
  // handled in engine.js via failed-roll hook
}
```

Also add to the sampleEnrichedChoices post-processing: when a choice with `align:'neutral'` is selected 3+ times in a row without social contact, increment isolation by 1.

- [ ] **Step 3: Add isolation increment to engine.js for camp/solo**

In `js/engine.js`, find the camp break action (search for `'Break camp.'` or `passive_intel`). After a camp break where no companion interaction happened, add:

```javascript
// After camp break with no companion interaction:
if (G.worldClocks && !(G.companions || []).some(c => c.active)) {
  G.worldClocks.isolation = (G.worldClocks.isolation || 0) + 1;
}
```

- [ ] **Step 4: Verify cosmoria sideplot triggers**

In browser console: `G.location = 'cosmoria'; G.worldClocks.pressure = 4;` then trigger a choice cycle. Confirm `sideplot_cosmoria_started` flag is set and sideplot choices appear.

- [ ] **Step 5: Commit**

```bash
git add js/loa-enriched-bridge.js js/engine.js
git commit -m "fix: cosmoria sideplot key + isolation clock increment paths"
```

---

### Task 3: Fix UI bugs (howto modal, contacts null, NPC tension borders, trait passivity)

**Files:**
- Modify: `ledger-of-ash.html` (howto close handler, showNPCMenu, trait activation, NPC element CSS)

- [ ] **Step 1: Fix howto-close button**

Find `#howto-close` click handler. Ensure it removes the `active` class from `#howto-modal`:

```javascript
// Find the existing howto-close handler and ensure it reads:
document.getElementById('howto-close').addEventListener('click', function() {
  document.getElementById('howto-modal').classList.remove('active');
});
```

- [ ] **Step 2: Fix contacts null crash in showNPCMenu**

Find `showNPCMenu()` function. Add null guard at the top:

```javascript
function showNPCMenu() {
  var G = window.G;
  if (!G || !G.location) {
    addNarration('System', 'You are between locations. Travel to a settlement to meet contacts.');
    return;
  }
  // ... rest of function
}
```

- [ ] **Step 3: Apply NPC tension colors to NPC element borders**

Find where NPC elements are rendered (look for `npc-element`, `npc-portrait`, or similar). Add tension class application parallel to the choice button logic at lines 8204-8205:

```javascript
// After applying tension classes to choice buttons, also apply to npc-container:
var npcEl = document.getElementById('npc-container');
if (npcEl) {
  npcEl.classList.toggle('tension-warn', (window.G && (window.G.tensionLevel||0) >= 1));
  npcEl.classList.toggle('tension-hot',  (window.G && (window.G.tensionLevel||0) >= 2));
}
```

Add to CSS (near lines 1024-1025):
```css
.npc-container.tension-warn { border-color: var(--gold, #c8a96e) !important; box-shadow: 0 0 6px rgba(200,169,110,0.35); }
.npc-container.tension-hot  { border-color: var(--blood, #8b2020) !important; box-shadow: 0 0 8px rgba(139,32,32,0.45); animation: pulse-red 1.8s ease-in-out infinite; }
```

- [ ] **Step 4: Remove scene triggers from trait activation**

Search for `activateTrait` or the trait activation function. Find any calls to `renderChoices`, `addNarration`, or scene-triggering code inside trait activation. Remove them — traits must be silently passive. The trait should only modify `G` state values, nothing visual:

```javascript
// Any trait that currently does:
//   addNarration('Trait', 'some text');
//   renderChoices([...]);
// Remove those calls entirely. Traits apply their effect silently.
// If the trait was "Shape of Things" or "Captive Audience", 
// they are now utility skills — see Task 10.
```

- [ ] **Step 5: Fix level-up stat descriptions**

Find `STAT_DISPLAY` (near line 8862). Update stat hint text to be mechanical:

```javascript
// Update each stat hint:
might:  { label: 'Might',   hint: 'Governs combat rolls, forced entry, and feats of physical strength.' },
finesse:{ label: 'Finesse', hint: 'Governs stealth, picking locks, sleight of hand, and precision strikes.' },
vigor:  { label: 'Vigor',   hint: 'Governs endurance, resistance to wounds, and survival checks.' },
wits:   { label: 'Wits',    hint: 'Governs investigation, lore, trap disarmament, and tactical reads.' },
charm:  { label: 'Charm',   hint: 'Governs persuasion, deception, social maneuvering, and first impressions.' },
spirit: { label: 'Spirit',  hint: 'Governs healing, crafting, ritual knowledge, and commune with the unseen.' },
```

- [ ] **Step 6: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix: howto modal, contacts null guard, NPC tension borders, trait passivity, stat descriptions"
```

---

### Task 4: XP anti-spam — G.seenChoices

**Files:**
- Modify: `ledger-of-ash.html` (G init, choice processing)
- Modify: `js/loa-enriched-bridge.js` (sandbox 0-XP rule)

- [ ] **Step 1: Add seenChoices to G init**

Find G initialization (line ~7650 where `schemaVersion:6` is set). Add `seenChoices` to G defaults:

```javascript
// In G default object and in newGame G init:
seenChoices: {},
```

- [ ] **Step 2: Add seenChoices to schema migration**

Find `migrateState()` or schema version handling. Add migration for any saves missing `seenChoices`:

```javascript
// In the schema migration block:
if (!G.seenChoices) G.seenChoices = {};
```

- [ ] **Step 3: Gate XP on seenChoices in choice processing**

Find where XP is awarded after a choice is made (look for `gainXP` or `_XP_BY_TAG`). Add the seen-choice gate:

```javascript
function processChoiceXP(choice) {
  var G = window.G;
  if (!G) return 0;
  if (!G.seenChoices) G.seenChoices = {};
  var cid = choice.id || choice.cid || choice.text;
  // Sandbox navigation choices: never award XP
  if (choice.sandbox) return 0;
  // Plot choices: one-time only
  if (G.seenChoices[cid]) return 0;
  G.seenChoices[cid] = true;
  return choice.tag ? (_XP_BY_TAG[choice.tag] || 8) : 8;
}
```

- [ ] **Step 4: Tag sandbox choices in bridge**

In `js/loa-enriched-bridge.js`, find where sandbox/navigation choices are generated. Add `sandbox: true` to their choice objects:

```javascript
// Navigation and observation choices get sandbox:true
{ text: 'Look around the area.', sandbox: true, tag: 'safe', ... }
```

- [ ] **Step 5: Verify XP behavior**

Complete the same choice twice. Verify XP awarded first time, 0 XP second time. Navigate with a sandbox choice, verify 0 XP always.

- [ ] **Step 6: Commit**

```bash
git add ledger-of-ash.html js/loa-enriched-bridge.js
git commit -m "feat: XP anti-spam via G.seenChoices — plot choices one-time, sandbox 0-XP"
```

---

## Phase B — Systems

---

### Task 5: Companion warnStage — strike counter redesign

**Files:**
- Modify: `ledger-of-ash.html` (COMPANION_DEFS, tolerance check function near line 2191)

The current system uses `warnStage` 0/1/2 as a state. The new spec requires a **strike counter** where strikes accumulate and 2 consecutive in-bounds choices reduce strikes by 1.

- [ ] **Step 1: Audit current warnStage logic**

Read lines 2191–2265 of `ledger-of-ash.html`. The current logic:
- `warnCooldown >= 3` → decrement `warnStage` by 1
- `warnStage` goes 0→1 (warn) → 2 (confront) → implied departure

- [ ] **Step 2: Rename warnStage → strikes, update departure threshold**

The companion object has `warnStage`. Replace with `strikes` throughout the companion check code. Update thresholds:

```javascript
// In companion tolerance check (near line 2202):
// OLD: if warnStage >= 1 and cooldown fire warn/confront/leave
// NEW: strikes-based system

// Count violations:
comp.strikes = (comp.strikes || 0) + 1;
comp.consecutiveInBounds = 0;

// Count in-bounds:
comp.consecutiveInBounds = (comp.consecutiveInBounds || 0) + 1;
if (comp.consecutiveInBounds >= 2) {
  comp.strikes = Math.max(0, comp.strikes - 1);
  comp.consecutiveInBounds = 0;
}

// Fire scenes based on strike count:
if (comp.strikes === 1 && !comp._warnFired) {
  comp._warnFired = true;
  addNarration(comp.name, def.warnScene || def.leaveScene);
} else if (comp.strikes === 3 && !comp._confrontFired) {
  comp._confrontFired = true;
  addNarration(comp.name, def.confrontScene || def.leaveScene);
} else if (comp.strikes >= 5) {
  // Companion departs
  departCompanion(comp.id);
}
```

- [ ] **Step 3: Update Elyra's benevolence floor**

Find Elyra in `COMPANION_DEFS` (near line 1855). Update her `benevolenceFloor` from -10 to -20:

```javascript
elyra: {
  // ...
  benevolenceFloor: -20,   // was -10
  // ...
}
```

- [ ] **Step 4: Add strikes to companion schema migration**

In schema migration: `if (comp.warnStage !== undefined && comp.strikes === undefined) { comp.strikes = comp.warnStage * 2; comp.consecutiveInBounds = 0; }`

- [ ] **Step 5: Verify departure path**

In browser console: manually increment a companion's strikes to 5. Confirm departure scene fires and companion is removed from active party.

- [ ] **Step 6: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: companion warnStage → strike counter (1/3/5 thresholds, -1 per 2 in-bounds)"
```

---

### Task 6: Save system rebuild — 3-slot + case code + JSON export

**Files:**
- Modify: `ledger-of-ash.html` (save/load functions, title screen HTML, char creation HTML)

The current system uses a 4-digit PIN stored in `loa_save_<name>_<pin>` keys. Replace with UUID run ID + 6-char case code + 3 named slots + JSON export.

- [ ] **Step 1: Write UUID generator**

Add utility function near the save code:

```javascript
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function generateCaseCode() {
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  var code = '';
  for (var i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}
```

- [ ] **Step 2: Update G init with runId and caseCode**

In the `newGame` G initialization (line ~7650):
```javascript
// Replace passcode with:
runId: generateUUID(),
caseCode: generateCaseCode(),
saveSlot: 1,
// Remove: passcode: ''
```

- [ ] **Step 3: Rewrite saveGame**

Replace the existing `saveGame()` function:

```javascript
function saveGame(slotOverride) {
  if (!G) return;
  var slot = slotOverride || G.saveSlot || 1;
  var key = 'loa_run_' + G.runId + '_slot' + slot;
  var meta = { runId: G.runId, caseCode: G.caseCode, name: G.name, level: G.level || 1,
               archetype: G.archetype ? G.archetype.name : 'Unknown',
               location: G.location || 'shelkopolis', stage: G.stage || 'Stage I',
               slot: slot, savedAt: Date.now() };
  localStorage.setItem(key, JSON.stringify(G));
  localStorage.setItem('loa_meta_' + G.runId + '_slot' + slot, JSON.stringify(meta));
  updateSaveIndex(G.runId, slot, meta);
}

function updateSaveIndex(runId, slot, meta) {
  var idx = JSON.parse(localStorage.getItem('loa_save_index_v2') || '{}');
  if (!idx[runId]) idx[runId] = {};
  idx[runId][slot] = meta;
  localStorage.setItem('loa_save_index_v2', JSON.stringify(idx));
}
```

- [ ] **Step 4: Rewrite loadGame**

```javascript
function loadByCaseCode(caseCode) {
  var idx = JSON.parse(localStorage.getItem('loa_save_index_v2') || '{}');
  var found = null;
  Object.values(idx).forEach(function(runSlots) {
    Object.values(runSlots).forEach(function(meta) {
      if (meta.caseCode === caseCode.toUpperCase()) found = meta;
    });
  });
  if (!found) { showToast('Case code not found.'); return false; }
  var key = 'loa_run_' + found.runId + '_slot' + found.slot;
  var data = JSON.parse(localStorage.getItem(key) || 'null');
  if (!data) { showToast('Save data missing.'); return false; }
  window.G = data;
  migrateState();
  return true;
}
```

- [ ] **Step 5: Add auto-save hook**

In the choice processing code (where `G.choiceCount` is incremented, near line 10285):
```javascript
G.choiceCount = (G.choiceCount || 0) + 1;
if (G.choiceCount % 20 === 0) saveGame();
```

- [ ] **Step 6: Add JSON export/import**

```javascript
function exportSave() {
  var blob = new Blob([JSON.stringify(G, null, 2)], {type: 'application/json'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'loa-' + (G.caseCode || 'save') + '.json';
  a.click();
}

function importSave(file) {
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = JSON.parse(e.target.result);
      if (!data.runId || !data.caseCode) { showToast('Invalid save file.'); return; }
      window.G = data;
      migrateState();
      showToast('Save loaded: ' + data.caseCode);
      startGame();
    } catch(err) { showToast('Could not read save file.'); }
  };
  reader.readAsText(file);
}
```

- [ ] **Step 7: Update title screen HTML**

Replace the passcode input (line ~1604) with a case code input:
```html
<p class="title-entry-label">Enter your 6-character case code to resume, or begin a new case.</p>
<input type="text" id="title-casecode" maxlength="6" placeholder="XXXXXX" autocomplete="off" style="text-transform:uppercase;">
<button onclick="resumeGame()">Resume</button>
<button onclick="showCharCreate()">New Game</button>
<button onclick="document.getElementById('import-file').click()">Import Save</button>
<input type="file" id="import-file" accept=".json" style="display:none" onchange="importSave(this.files[0])">
```

- [ ] **Step 8: Update char creation — remove passcode field**

Remove the 4-digit passcode input (line ~1635). The new game generates a case code automatically. Show it to the player after creation:
```javascript
// After G init in newGame:
showToast('Your case code: ' + G.caseCode + ' — write it down!');
```

- [ ] **Step 9: Add old save migration dialog**

In `migrateState()`, detect old `loa_save_*` keys and offer one-time import:
```javascript
function checkLegacySaves() {
  var legacyKeys = Object.keys(localStorage).filter(k => k.startsWith('loa_save_') && k !== 'loa_save_index');
  if (legacyKeys.length > 0 && !localStorage.getItem('loa_legacy_migrated')) {
    showToast('Found ' + legacyKeys.length + ' legacy save(s). Legacy saves use old passcode system.');
    localStorage.setItem('loa_legacy_migrated', '1');
  }
}
```

- [ ] **Step 10: Verify save roundtrip**

New game → play 5 choices → check case code displayed → reload page → enter case code → verify state matches. Export JSON → fresh page → import → verify state.

- [ ] **Step 11: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: save system rebuild — UUID runId + 6-char case code + 3 slots + JSON export"
```

---

### Task 7: Travel stage lock system (polity hierarchy)

**Files:**
- Modify: `js/travel.js` (stage lock logic, Principalities route)
- Modify: `js/world-data.js` or wherever locality data lives (add polity hierarchy fields)

- [ ] **Step 1: Read current travel.js stage lock code**

Open `js/travel.js`. The current implementation uses distance ≤ N for stage locks. Find `executeTravelTo` and the lock checking code.

- [ ] **Step 2: Add polity data to locality definitions**

In the locality data (wherever `KEY_LOCALITIES` is defined — likely `js/world-data.js`), ensure each locality has:
```javascript
// Each locality needs these fields (add if missing):
shelkopolis: {
  id: 'shelkopolis',
  name: 'Shelkopolis',
  macroregion: 'the_principalities_heartland',
  parent_polity: 'principality_of_shelk',
  umbrella_polity: 'the_principalities',
  // ...
}
```

- [ ] **Step 3: Replace distance-based lock with polity-based lock**

In `js/travel.js`, replace the distance check with polity hierarchy check:

```javascript
function canTravelTo(destId) {
  var G = window.G;
  if (!G) return false;
  var dest = (window.KEY_LOCALITIES || {})[destId];
  if (!dest) return false;
  var stage = G.stage || 'Stage I';
  var startLocId = G.startingLocality || G.location || 'shelkopolis';
  var startLoc = (window.KEY_LOCALITIES || {})[startLocId];
  if (!startLoc) return true; // fallback: allow travel if no data

  // Stage I: same macroregion only
  if (stage === 'Stage I') {
    return dest.macroregion === startLoc.macroregion;
  }
  // Stage II: same parent_polity OR adjacent parent_polities OR Principalities route unlocked
  if (stage === 'Stage II') {
    if (dest.parent_polity === startLoc.parent_polity) return true;
    if (G.flags && G.flags.principalities_route_unlocked && dest.umbrella_polity === 'the_principalities') return true;
    // Adjacent parent polities (defined in ADJACENT_POLITIES data)
    var adjacentPolities = (window.ADJACENT_POLITIES || {})[startLoc.parent_polity] || [];
    if (adjacentPolities.indexOf(dest.parent_polity) !== -1) return true;
    return false;
  }
  // Stage III: same umbrella_polity
  if (stage === 'Stage III') {
    return dest.umbrella_polity === startLoc.umbrella_polity;
  }
  // Stage IV+: all
  return true;
}
```

- [ ] **Step 4: Add ADJACENT_POLITIES data**

Add a constant near the top of `js/world-data.js` or `js/travel.js`:

```javascript
window.ADJACENT_POLITIES = {
  'principality_of_shelk': ['principality_of_cosmoria', 'principality_of_fairhaven'],
  'principality_of_cosmoria': ['principality_of_shelk', 'soreheim_western_reaches'],
  'soreheim_western_reaches': ['principality_of_cosmoria', 'soreheim_central_range'],
  'sheresh_northern_communes': ['sheresh_coastal_communes', 'principality_of_fairhaven'],
  // Add others as known from V33_1 geography
};
```

- [ ] **Step 5: Unlock Principalities route at Stage II entry**

In the stage advance logic (where stage changes from I to II), add:
```javascript
// When stage advances to Stage II:
G.flags.principalities_route_unlocked = true;
addNarration('The Road Opens', 'The road to the Principalities lies before you. Shelkopolis is within reach.');
```

- [ ] **Step 6: Store startingLocality on new game**

In `newGame` initialization, record the starting locality:
```javascript
G.startingLocality = G.location || 'shelkopolis';
```

- [ ] **Step 7: Verify stage locks**

Test: Stage I character at Shelkopolis. Confirm Cosmoria Harbor not reachable. Advance to Stage II. Confirm Cosmoria Harbor now reachable. Confirm Soreheim Proper NOT reachable (different umbrella polity).

- [ ] **Step 8: Commit**

```bash
git add js/travel.js js/world-data.js
git commit -m "feat: travel stage locks via polity hierarchy — macroregion/parent_polity/umbrella gates"
```

---

### Task 8: Fog of war — two-tier locality discovery

**Files:**
- Modify: `ledger-of-ash.html` (G init)
- Modify: `js/travel.js` (discovery on travel)
- Modify: `js/loa-enriched-bridge.js` (discovery on NPC dialogue/rumors)

- [ ] **Step 1: Add discovery tiers to G init**

```javascript
// In G default object:
discoveredLocalities: {},   // {[id]: 'rumor'|'visited'}
```

- [ ] **Step 2: Mark visited on arrival**

In `executeTravelTo` in `js/travel.js`, after the player arrives:
```javascript
G.discoveredLocalities = G.discoveredLocalities || {};
G.discoveredLocalities[destId] = 'visited';
if (!G.visitedLocalities) G.visitedLocalities = {};
G.visitedLocalities[destId] = true;
```

- [ ] **Step 3: Mark discovered on rumor/NPC dialogue**

In `js/loa-enriched-bridge.js`, when a choice result mentions a locality name or has a `reveals_locality` field:
```javascript
// In post-choice processing:
if (choice.reveals_locality) {
  G.discoveredLocalities = G.discoveredLocalities || {};
  if (!G.discoveredLocalities[choice.reveals_locality]) {
    G.discoveredLocalities[choice.reveals_locality] = 'rumor';
  }
}
```

- [ ] **Step 4: Update travel menu to show discovery state**

In the travel UI rendering (wherever travel destinations are listed), show tiered labels:
```javascript
// When rendering destination option:
var disc = (G.discoveredLocalities || {})[destId];
var label = loc.name;
if (!disc) label = '[Unknown]';
else if (disc === 'rumor') label = loc.name + ' — you\'ve heard of this place';
// disc === 'visited': show full name
```

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html js/travel.js js/loa-enriched-bridge.js
git commit -m "feat: two-tier fog of war — G.discoveredLocalities rumor/visited"
```

---

### Task 9: "Travel to the Principalities" leg-by-leg route (Stage II unlock)

**Files:**
- Modify: `js/travel.js` (leg-by-leg journey function)
- Modify: `js/world-data.js` (route node data)

- [ ] **Step 1: Define the Principalities route nodes**

Add route definition data (in `js/world-data.js` or inline in `travel.js`):

```javascript
window.PRINCIPALITIES_ROUTE = [
  {
    id: 'crossing_the_brinelands',
    name: 'The Brinelands Crossing',
    narration: 'The Brinelands stretch flat and salt-white under a pale sky. Caravans move in loose clusters here, wary of the open ground. The far shore is a brown smear against the horizon — the Principality of Shelk beginning its slow rise. A merchant argues with her cart driver about weight limits. Nobody agrees on anything out here except the direction of travel.',
    encounterChance: 0.25,
    enemyPool: ['brinelands_bandit', 'desperate_traveler']
  },
  {
    id: 'shelk_border_approach',
    name: 'Shelk Border Road',
    narration: 'The road narrows and the stone changes character — quarried, deliberate, laid by a civilization that planned ahead. Iron Accord checkpoints appear at intervals: a gatepost, a ledger, a bored clerk with a stamp. The smell of the city reaches you before it comes into view. Something burning. Something cooking. Something old.',
    encounterChance: 0.15,
    enemyPool: ['toll_collector', 'patrol_guard']
  },
  {
    id: 'shelkopolis_gates',
    name: 'The Gates of Shelkopolis',
    narration: 'The city announces itself with noise before architecture: vendors, quarrels, the creak of loaded carts on ancient paving stones. The gates are iron and old, half-decorative now, flanked by city wardens who watch without urgency. A letter of introduction helps. A convincing face helps more. You step through.',
    encounterChance: 0,
    destination: 'shelkopolis'
  }
];
```

- [ ] **Step 2: Write leg-by-leg travel function**

In `js/travel.js`:

```javascript
function startPrincipalitiesRoute() {
  var G = window.G;
  if (!G || !G.flags.principalities_route_unlocked) return;
  if (G.flags.principalities_route_complete) {
    executeTravelTo('shelkopolis');
    return;
  }
  G._routeProgress = G._routeProgress || 0;
  advancePrincipalitiesLeg();
}

function advancePrincipalitiesLeg() {
  var G = window.G;
  var route = window.PRINCIPALITIES_ROUTE;
  var leg = route[G._routeProgress || 0];
  if (!leg) {
    G.flags.principalities_route_complete = true;
    executeTravelTo('shelkopolis');
    return;
  }
  // Display leg narration in env-desc
  updateEnvDesc(leg.narration);
  addNarration('On the Road', leg.narration);
  // Check for encounter
  if (leg.encounterChance > 0 && Math.random() < leg.encounterChance) {
    var enemy = leg.enemyPool[Math.floor(Math.random() * leg.enemyPool.length)];
    addNarration('Encounter', 'The road is not empty.');
    setTimeout(function() {
      if (typeof startCombat === 'function') startCombat(enemy, { routeLeg: leg.id });
    }, 600);
    return;
  }
  G._routeProgress = (G._routeProgress || 0) + 1;
  // Show continue button
  window.renderChoices([{
    id: 'route_continue_' + leg.id,
    text: 'Continue toward Shelkopolis.',
    sandbox: true,
    action: function() { advancePrincipalitiesLeg(); }
  }]);
}
```

- [ ] **Step 3: Wire route to travel menu**

In the travel menu (wherever "Travel to..." options appear), add for non-Principalities Stage II players:
```javascript
// If Stage II and not in Principalities and route not complete:
if (G.stage === 'Stage II' && startLoc.umbrella_polity !== 'the_principalities' && !G.flags.principalities_route_complete) {
  travelOptions.push({
    text: 'Travel to the Principalities (Shelkopolis)',
    action: function() { startPrincipalitiesRoute(); }
  });
}
```

- [ ] **Step 4: Verify route fires**

Start non-Principalities background, advance to Stage II, select "Travel to the Principalities." Verify 3-leg narration sequence fires, encounter rolls work, and player arrives at Shelkopolis at the end.

- [ ] **Step 5: Commit**

```bash
git add js/travel.js js/world-data.js
git commit -m "feat: Travel to Principalities — 3-node leg-by-leg route with encounter rolls"
```

---

## Phase C — UI Layout

---

### Task 10: env-desc left sub-column + sandbox default panel

**Files:**
- Modify: `ledger-of-ash.html` (CSS, HTML layout, sandbox choice rendering)

- [ ] **Step 1: Audit current center panel HTML**

Find the center panel HTML (around line 1664). The current layout has `#stage-progress-track` and the main result/choice area.

- [ ] **Step 2: Restructure center panel into two sub-columns**

In the HTML, wrap the center panel content into two sub-columns:

```html
<!-- Center panel: replace existing content with two-sub-column layout -->
<div id="center-panel">
  <!-- Left sub-column: persistent setting -->
  <div id="center-left">
    <div id="env-status">
      <!-- locality name, district, time of day, weather - already exists, wire here -->
    </div>
    <div id="env-desc">
      <!-- Rich narrative description; updates on location/scene change -->
    </div>
  </div>
  <!-- Right sub-column: live play surface -->
  <div id="center-right">
    <div id="stage-progress-track"><div id="stage-progress-fill"></div></div>
    <div id="narrative-result"></div>
    <div id="choices"></div>
  </div>
</div>
```

- [ ] **Step 3: Add CSS for two-sub-column layout**

```css
#center-panel {
  display: flex;
  gap: 12px;
}
#center-left {
  flex: 0 0 260px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
#env-status {
  font-size: 0.85em;
  color: var(--fog);
  border-bottom: 1px solid var(--border);
  padding-bottom: 6px;
}
#env-desc {
  flex: 1;
  overflow-y: auto;
  font-size: 0.9em;
  line-height: 1.6;
  color: var(--parchment, #d4c5a0);
  font-style: italic;
}
#center-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
```

- [ ] **Step 4: Write updateEnvDesc function**

```javascript
function updateEnvDesc(text) {
  var el = document.getElementById('env-desc');
  if (el) el.innerHTML = text ? '<p>' + text + '</p>' : '';
}
window.updateEnvDesc = updateEnvDesc;
```

Call `updateEnvDesc` whenever location changes (in `executeTravelTo`) and on scene change.

- [ ] **Step 5: Implement sandbox default choice panel**

When no active scene is running and `#choices` would be empty, show the sandbox panel. Add after any choice-rendering call:

```javascript
function showSandboxPanel() {
  var G = window.G;
  if (!G || !G.location) return;
  var loc = (window.KEY_LOCALITIES || {})[G.location];
  var locName = loc ? loc.name : G.location;
  var choices = [];
  // Navigation options
  var adj = (loc && loc.adjacent) || [];
  adj.forEach(function(adjId) {
    var adjLoc = (window.KEY_LOCALITIES || {})[adjId];
    if (adjLoc && canTravelTo(adjId)) {
      choices.push({ id: 'travel_' + adjId, text: 'Travel to ' + adjLoc.name + '.', sandbox: true,
        action: function(id) { return function() { executeTravelTo(id); }; }(adjId) });
    }
  });
  // Look around
  choices.push({ id: 'sandbox_look', text: 'Look around ' + locName + '.', sandbox: true,
    action: function() {
      updateEnvDesc((window.ENV_DESCS || {})[G.location] || 'You take in your surroundings.');
      addNarration('', (window.ENV_DESCS || {})[G.location] || 'Nothing unusual catches your eye.');
      showSandboxPanel();
    }
  });
  // Camp
  choices.push({ id: 'sandbox_camp', text: 'Make camp.', sandbox: true, action: function() { showCampMenu(); } });
  window.renderChoices(choices);
}
window.showSandboxPanel = showSandboxPanel;
```

- [ ] **Step 6: Verify layout**

Open browser. Verify center panel shows two sub-columns. Verify env-desc updates on location change. Verify sandbox panel appears between scenes.

- [ ] **Step 7: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: env-desc left sub-column + sandbox default choice panel"
```

---

### Task 11: Right panel tabs — World clocks, Character sheet, Party/Contacts

**Files:**
- Modify: `ledger-of-ash.html` (right panel HTML + tab JS)

- [ ] **Step 1: Ensure all four tabs exist in HTML**

Find the right panel (look for `#right-panel` or tab structure). Verify tabs: Character, Party, World, Journal exist. If any tab is missing, add it:

```html
<div id="right-panel">
  <div class="tab-bar">
    <button class="tab-btn active" data-tab="character">Character</button>
    <button class="tab-btn" data-tab="party">Party</button>
    <button class="tab-btn" data-tab="world">World</button>
    <button class="tab-btn" data-tab="journal">Journal</button>
  </div>
  <div id="tab-character" class="tab-pane active"><!-- Character sheet --></div>
  <div id="tab-party" class="tab-pane"><!-- Companions + contacts --></div>
  <div id="tab-world" class="tab-pane"><!-- World clocks --></div>
  <div id="tab-journal" class="tab-pane"><!-- Journal log --></div>
</div>
```

- [ ] **Step 2: Wire World tab to display clock bars**

In `updateHUD` or a dedicated `updateWorldTab` function:

```javascript
function updateWorldTab() {
  var G = window.G;
  if (!G || !G.worldClocks) return;
  var clocks = ['pressure', 'watchfulness', 'rival', 'reverence', 'omens', 'isolation'];
  var labels = { pressure:'Pressure', watchfulness:'Watchfulness', rival:'Rival', reverence:'Reverence', omens:'Omens', isolation:'Isolation' };
  var maxVal = 10;
  var html = clocks.map(function(c) {
    var val = G.worldClocks[c] || 0;
    var pct = Math.min(100, (val / maxVal) * 100);
    return '<div class="clock-row"><span class="clock-label">' + labels[c] + '</span>' +
           '<div class="clock-track"><div class="clock-fill" style="width:' + pct + '%"></div></div>' +
           '<span class="clock-val">' + val + '</span></div>';
  }).join('');
  var el = document.getElementById('tab-world');
  if (el) el.innerHTML = '<h3>World Clocks</h3>' + html + '<div id="world-notices"></div>';
}
```

- [ ] **Step 3: Wire Party tab to show companion status**

```javascript
function updatePartyTab() {
  var G = window.G;
  if (!G) return;
  var companions = G.companions || [];
  if (!companions.length) {
    document.getElementById('tab-party').innerHTML = '<p>No companions.</p>';
    return;
  }
  var html = companions.filter(c => c.active).map(function(c) {
    var def = (window.COMPANION_DEFS || {})[c.id] || {};
    var strikePct = Math.min(100, ((c.strikes || 0) / 5) * 100);
    var strikeColor = (c.strikes||0) >= 3 ? 'var(--blood)' : (c.strikes||0) >= 1 ? 'var(--gold)' : 'var(--success)';
    return '<div class="companion-row">' +
      '<span class="companion-name">' + (def.name || c.id) + '</span>' +
      '<div class="companion-bar" style="background:' + strikeColor + ';width:' + strikePct + '%"></div>' +
      '</div>';
  }).join('');
  var el = document.getElementById('tab-party');
  if (el) el.innerHTML = '<h3>Party</h3>' + html;
}
```

- [ ] **Step 4: Call update functions from updateHUD**

Add to `updateHUD()`: `updateWorldTab(); updatePartyTab();`

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: right panel World/Party tabs wired to clocks and companion strikes"
```

---

## Phase D — Combat & Tension

---

### Task 12: Social → tactical combat flip at tensionLevel 2

**Files:**
- Modify: `ledger-of-ash.html` (renderChoices, choice action handling near line 8204)

- [ ] **Step 1: Understand current tension flow**

At lines 8204-8205, `tensionLevel >= 1` adds `tension-warn` and `tensionLevel >= 2` adds `tension-hot` to choice buttons. At tension 2, there is no automatic combat flip yet.

- [ ] **Step 2: Add fight choice injection at tensionLevel 2**

In `renderChoices`, after applying tension classes, if `tensionLevel >= 2`, inject a fight choice if none exists:

```javascript
// In renderChoices, after building choices block:
if (window.G && (window.G.tensionLevel||0) >= 2) {
  var hasFight = choices.some(function(c) { return c.id && c.id.indexOf('fight') !== -1; });
  if (!hasFight && window.G._activeCombatantId) {
    choices = choices.concat([{
      id: 'tension_fight_now',
      text: 'Draw on them — this ends now.',
      tag: 'risky',
      action: function() {
        var enemyId = window.G._activeCombatantId || 'generic_hostile';
        if (typeof startCombat === 'function') startCombat(enemyId, { fromTension: true });
      }
    }]);
  }
}
```

- [ ] **Step 3: Add aggressive-fail → combat flip**

In the roll resolution for narrative choices tagged `bold` or `risky` with `align:'cruel'` or `align:'anarchy'`:

```javascript
// In the fail branch of processChoice for aggressive/risky choices at tension 2:
if (r.isFumble || (!r.success && (window.G.tensionLevel||0) >= 2 && choice.aggressive)) {
  addNarration('', 'The situation breaks. There is no talking your way out of this.');
  setTimeout(function() {
    if (typeof startCombat === 'function') startCombat(window.G._activeCombatantId || 'generic_hostile', { fromEscalation: true });
  }, 600);
  return;
}
```

- [ ] **Step 4: Set _activeCombatantId during NPC interactions**

When an NPC conversation is opened, store the NPC's combat template ID:
```javascript
// When opening an NPC scene:
G._activeCombatantId = npc.combatTemplate || npc.id || null;
```

- [ ] **Step 5: Verify flip**

In browser: trigger an NPC conversation, escalate tension to 2 via aggressive choices. Verify fight choice appears. Select an aggressive choice that fails — verify combat starts.

- [ ] **Step 6: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: social→tactical combat flip — fight choice at tension 2, aggressive-fail trigger"
```

---

## Phase E — Content

---

### Task 13: Character creation — progressive text preview + 5 group backstories

**Files:**
- Modify: `ledger-of-ash.html` (char creation screen, G init)

- [ ] **Step 1: Add progressive narrative preview**

Find the character creation screen (near line 1627). Add a `#create-narrative` element:
```html
<div id="create-narrative">
  <!-- Updates as player makes selections -->
</div>
```

Add JS to update the preview on each selection change:
```javascript
function updateCreateNarrative() {
  var arch = document.getElementById('char-archetype-select') || {};
  var bg = document.getElementById('char-bg-select') || {};
  var name = (document.getElementById('char-name') || {}).value || '...';
  var archVal = arch.value || null;
  var bgVal = bg.value || null;
  var parts = ['You are ' + (name !== '...' ? name : '...')];
  if (archVal) parts.push('a ' + archVal);
  if (bgVal) parts.push('from ' + bgVal);
  parts.push(bgVal && archVal ? '...' : '');
  // If all selections complete, show full backstory
  if (name !== '...' && archVal && bgVal) {
    var group = getArchetypeGroup(archVal);
    var hook = (window.GROUP_BACKSTORIES || {})[group];
    if (hook) {
      var full = hook.narrative.replace('{name}', name).replace('{archetype}', archVal);
      document.getElementById('create-narrative').innerHTML = '<p>' + full + '</p>';
      return;
    }
  }
  document.getElementById('create-narrative').innerHTML = '<p>' + parts.filter(Boolean).join(', ') + '.</p>';
}
```

- [ ] **Step 2: Define GROUP_BACKSTORIES constant**

Add to `ledger-of-ash.html` before the game init:

```javascript
window.GROUP_BACKSTORIES = {
  combat: {
    narrative: '{name} grew up measuring worth in outcomes. You served — a garrison, a company, a contract — and learned that institutions are only as honest as the orders they give. The order you still think about came down three years ago: stand down, let it happen, file no report. The person who refused that order was Davan Rell, your squad second, who disappeared forty-eight hours later. No court of inquiry. No record of the incident. You have been looking for Davan\'s name in official documents ever since. You have not found it. That absence is why you are here.'
  },
  magic: {
    narrative: 'Your teacher was Senia Ash — not her real name, you later learned, but the one she used when she was still allowed to publish. She spent eleven years documenting Catastrophe-era suppression records before the Collegium declared the research inflammatory. That was the word they used: inflammatory. Her last paper was pulled from circulation the same week she stopped responding to letters. You inherited her notes, her methods, and her question: whose names are missing from the record, and why? The answer is why you are here.'
  },
  stealth: {
    narrative: 'Contracts come through a relay — you never meet the client directly. But one client left traces: a payment routing that looped through three shell accounts before landing in your ledger, all owned by the same person. That person was a Collegium archivist named Ferrin Voss, who vanished six weeks after you completed the job. You did not kill Ferrin Voss. Someone else did — and they used your contract as cover. You have been trying to find out who since. That search is why you are here.'
  },
  support: {
    narrative: 'Mira Cael was not supposed to die from a standard compound fever. You had seen worse cases stabilize. She was four days from walking out when the Collegium\'s medical examiner appeared, reviewed the ward records, and marked her file closed before she finished dying. The ward record had been updated — her case history showed a different treatment than the one you administered. You kept your own notes. You have been keeping your own notes on a lot of things since. That habit is why you are here.'
  },
  bard: {
    narrative: 'There was a singer in the market district who had been performing for forty years — name, face, reputation well-known to every collector of oral history in the Principalities. Her name was Osa Telev. When you tried to cite her in a commission for the Merchant Assembly, the Assembly\'s archivist returned your draft with a note: "Source unverifiable. No record of this individual in the performance registry." You have the broadsheets. You have twenty witnesses. The registry has nothing. That gap is why you are here.'
  }
};

function getArchetypeGroup(archetypeName) {
  var combatTypes = ['Warrior','Knight','Ranger','Paladin','Archer','Berserker','Warden','Warlord','Death Knight'];
  var magicTypes = ['Wizard','Cleric','Priest','Necromancer','Illusionist','Inquisitor','Elementalist','Oracle'];
  var stealthTypes = ['Rogue','Assassin','Spellthief','Scout','Thief','Trickster','Beastmaster'];
  var supportTypes = ['Healer','Artificer','Engineer','Tactician','Alchemist','Saint'];
  if (combatTypes.indexOf(archetypeName) !== -1) return 'combat';
  if (magicTypes.indexOf(archetypeName) !== -1) return 'magic';
  if (stealthTypes.indexOf(archetypeName) !== -1) return 'stealth';
  if (supportTypes.indexOf(archetypeName) !== -1) return 'support';
  return 'bard';
}
window.getArchetypeGroup = getArchetypeGroup;
```

- [ ] **Step 3: Store backstory group on G**

In `newGame` after archetype selection:
```javascript
G.backstoryGroup = getArchetypeGroup(G.archetype ? G.archetype.name : '');
```

- [ ] **Step 4: Verify progressive preview**

Create a new character. Verify the preview updates to show name + archetype + "..." as each field is selected, then shows the full backstory paragraph when all fields are complete.

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: char creation progressive preview + 5 group backstories with personal missing-person hook"
```

---

### Task 14: Rewrite maren_oss_encounter.js as indirect evidence scene

**Files:**
- Modify: `maren_oss_encounter.js` (full rewrite)

The current file has a direct face-to-face encounter. Replace with an indirect evidence scene: player finds her case notes at the Guildheart Hub Archive.

- [ ] **Step 1: Read current maren_oss_encounter.js**

Open `maren_oss_encounter.js`. Note the flag names and call site.

- [ ] **Step 2: Write the indirect evidence scene**

Replace the entire file content:

```javascript
var MAREN_OSS_ENCOUNTER = (function() {

  function trigger() {
    var G = window.G;
    if (!G || G.flags.maren_oss_trail_found || G.flags.maren_oss_encounter_done) return;
    G.flags.maren_oss_trail_found = true;

    G.lastResult = 'The archive shelf is organized by acquisition date, not subject — whoever filed these did not want them found. Tucked behind a monograph on transit law, a thin folder with no name on the cover. Inside: case notes. Someone has been mapping the same investigation you are running. The handwriting is precise, unhurried. The analysis is two steps ahead of yours. At the bottom of the last page, a single annotation in a different ink, added later: "Subject is operational. Do not interfere with their findings." You do not know who wrote this. But they know you exist.';
    G.recentOutcomeType = 'discovery';
    window.addJournal('investigation', G.lastResult);
    if (typeof updateHUD === 'function') updateHUD();

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        {
          id: 'maren_evidence_study',
          text: 'Study the notes thoroughly — record what you can before returning them.',
          tag: 'bold',
          action: function() { studyNotes(); }
        },
        {
          id: 'maren_evidence_take',
          text: 'Take a copy — photograph or transcribe the key sections.',
          tag: 'risky',
          action: function() { copyNotes(); }
        },
        {
          id: 'maren_evidence_leave',
          text: 'Leave them undisturbed. Whoever placed them here may be watching.',
          tag: 'safe',
          action: function() { leaveNotes(); }
        }
      ]);
    }, 400);
  }

  function studyNotes() {
    var G = window.G;
    var r = rollD20('wits');
    if (r.success) {
      G.lastResult = 'You read carefully, piecing together a methodology that mirrors your own but extends further. Whoever this investigator is, they have access to sources you have not found yet — and they have been at this longer. You leave the folder exactly as you found it. What you have read is already changing how you see the investigation.';
      G.flags.maren_oss_profiled = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 6);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'You work quickly but cannot retain everything. The methodology is clear enough — this investigator is systematic, careful, and connected. But the specific names blur under haste. You replace the folder without the full picture.';
      G.flags.maren_oss_profiled = true;
      G.recentOutcomeType = 'partial';
    }
    _close();
  }

  function copyNotes() {
    var G = window.G;
    var r = rollD20('finesse');
    if (r.success) {
      G.lastResult = 'Your transcription is fast and clean. Three pages of methodology, two pages of source chains you have not seen before. The folder is back on the shelf before the archive clerk returns from her break. You carry more than you found.';
      G.flags.maren_oss_profiled = true;
      G.flags.maren_oss_notes_copied = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 7);
      G.recentOutcomeType = 'success';
    } else {
      G.lastResult = 'The transcription takes longer than expected. The clerk returns; you manage to step away without the folder but without everything you needed. She glances at the shelf. She does not comment. But she looked.';
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      G.flags.maren_oss_profiled = true;
      G.recentOutcomeType = 'complication';
    }
    _close();
  }

  function leaveNotes() {
    var G = window.G;
    G.lastResult = 'You replace the folder exactly as you found it. Whoever left this here may return. Whatever they want you to know, they already decided you should find it — which means the question is not whether to trust the information, but why they want you to have it.';
    G.flags.maren_oss_suspected = true;
    G.recentOutcomeType = 'investigation';
    _close();
  }

  function _close() {
    var G = window.G;
    window.addJournal('investigation', G.lastResult);
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  return { trigger: trigger };
})();

window.MAREN_OSS_ENCOUNTER = MAREN_OSS_ENCOUNTER;
```

- [ ] **Step 3: Update all references to old flag names**

Search for `maren_oss_encounter_done` and `maren_oss_resolved` in all files. Replace with `maren_oss_trail_found` where the trigger check is needed.

- [ ] **Step 4: Verify the scene**

Trigger `MAREN_OSS_ENCOUNTER.trigger()` from browser console. Verify the indirect evidence scene shows (no face-to-face). Test all three choices. Verify appropriate flags are set.

- [ ] **Step 5: Commit**

```bash
git add maren_oss_encounter.js ledger-of-ash.html
git commit -m "feat: rewrite Maren Oss encounter as indirect evidence scene at archive"
```

---

### Task 15: interim_seat sideplot rewrite (Soreheim canon-safe)

**Files:**
- Modify: `js/` or root — wherever `interim_seat` sideplot is defined

- [ ] **Step 1: Find the current interim_seat file**

Search for `interim_seat` in all JS files. Find the file defining its scenes/choices.

- [ ] **Step 2: Write canon-safe quota manipulation rewrite**

The new sideplot: a worker's production contribution is being erased from Soreheim quota ledgers — credit stolen by a rival clan operating inside the official registry. Player discovers this mirrors the main campaign's name-erasure theme in an industrial context.

Key beats:
1. **Opening hook**: A dockworker or cart operator at Soreheim Proper mentions their output hasn't shown in the monthly ledger — two weeks of loads unaccounted for.
2. **Investigation**: Player traces the missing entries to the registry office. A clerk is being pressured. Quota manipulation benefits Clan Vorrk (or another canonical clan with documented rivalry tensions).
3. **Resolution**: Three options: expose the fraud (pressure +2, watchfulness +2), quietly correct the record (investigation+1, no clock changes), or confront the clerk and force a formal complaint (rival clock moves, watchfulness +1).

The sideplot **does not involve a character named Halversen** and does not imply Soreheim governance instability — it's localized clan corruption within the functioning hierarchy.

Write the new sideplot file at `js/scenes/soreheim_stage1.js`:

```javascript
var SOREHEIM_STAGE1 = (function() {
  function openingHook() {
    var G = window.G;
    G.lastResult = 'A dockworker at the Soreheim Proper weigh-station is arguing with a registry clerk — not loudly, not productively. "Two full weeks," he says. "Forty-three loads verified at the gate. Nothing in the ledger." The clerk stares at his book and does not look up. Nearby, a man in a clan-mark coat watches the exchange without expression.';
    G.flags.sideplot_interim_seat_started = true;
    window.addJournal('investigation', G.lastResult);
    (window._rawRenderChoices || window.renderChoices)([
      { id: 'interim_investigate', text: 'Ask the dockworker about the discrepancy.', tag: 'bold',
        action: function() { investigateRegistry(); } },
      { id: 'interim_observe', text: 'Watch the man in the clan coat.', tag: 'safe',
        action: function() { observeClanAgent(); } },
      { id: 'interim_ignore', text: 'This is not your matter. Move on.', tag: 'safe',
        action: function() { ignoreHook(); } }
    ]);
  }

  function investigateRegistry() {
    var G = window.G;
    var r = rollD20('wits');
    if (r.success) {
      G.lastResult = 'The dockworker — Gerrit, he says — is not the first to notice. Three other operators have the same problem. All from the same macroregion route. All registered under the same output code. The code traces to a processing clerk named Ossa Vonn who has been reassigned twice in six months.';
      G.flags.interim_seat_lead_found = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 3);
    } else {
      G.lastResult = 'The dockworker is worried about official reprisal and speaks in fragments. You get an output code and a name — Ossa Vonn — before he shuts down and walks away. It is something.';
      G.flags.interim_seat_lead_found = true;
    }
    window.addJournal('investigation', G.lastResult);
    setTimeout(showResolution, 400);
  }

  function observeClanAgent() {
    var G = window.G;
    G.lastResult = 'The man in the clan coat — Vorrk clan markings, third-tier by the weave — makes a quiet note in a small book, then leaves. He does not interact with the clerk. He did not need to. Whatever he came to verify, he verified it.';
    G.flags.interim_seat_clan_agent_observed = true;
    window.addJournal('investigation', G.lastResult);
    setTimeout(showResolution, 400);
  }

  function ignoreHook() {
    var G = window.G;
    G.lastResult = 'You move on. The argument continues behind you.';
    G.flags.sideplot_interim_seat_skipped = true;
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  function showResolution() {
    (window._rawRenderChoices || window.renderChoices)([
      { id: 'interim_expose', text: 'Take the evidence to the Soreheim registry oversight office — make it official.', tag: 'risky',
        action: function() { resolveExpose(); } },
      { id: 'interim_correct', text: 'Quietly correct the ledger entry through a sympathetic clerk.', tag: 'bold',
        action: function() { resolveCorrect(); } },
      { id: 'interim_confront', text: 'Confront the Vorrk agent directly — demand a formal accounting.', tag: 'risky',
        action: function() { resolveConfront(); } }
    ]);
  }

  function resolveExpose() {
    var G = window.G;
    G.lastResult = 'The oversight office receives your evidence with bureaucratic gravity. A formal inquiry is opened. Gerrit gets his ledger corrected. Ossa Vonn is transferred again. The Vorrk clan agent you observed does not appear in the registry. The correction will hold — for now.';
    G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 2;
    G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
    G.flags.sideplot_interim_seat_complete = true;
    G.flags.interim_seat_resolution = 'exposed';
    _close();
  }

  function resolveCorrect() {
    var G = window.G;
    G.lastResult = 'The clerk — a young woman who clearly understands exactly what she has been participating in — makes the correction quietly and thanks you in a way that suggests she has been waiting for someone to give her a reason to. The record is right. Nobody is watching.';
    G.investigationProgress = Math.max(G.investigationProgress || 0, (G.investigationProgress||0) + 1);
    G.flags.sideplot_interim_seat_complete = true;
    G.flags.interim_seat_resolution = 'corrected';
    _close();
  }

  function resolveConfront() {
    var G = window.G;
    var r = rollD20('charm');
    if (r.success) {
      G.lastResult = 'The Vorrk agent is pragmatic. When you lay out what you know and who else knows it, he produces a written acknowledgment that the records will be corrected. Quiet. Efficient. He does not thank you. You were not expecting him to.';
      G.worldClocks.rival = Math.max(0, (G.worldClocks.rival || 0) - 1);
    } else {
      G.lastResult = 'The agent listens without acknowledgment, produces nothing, and files a counter-complaint with the registry office naming you as a disruptive outside interest. The records remain uncorrected. You have made an enemy in the quota office.';
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
    }
    G.flags.sideplot_interim_seat_complete = true;
    G.flags.interim_seat_resolution = 'confronted';
    _close();
  }

  function _close() {
    var G = window.G;
    window.addJournal('investigation', G.lastResult);
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  return { openingHook: openingHook };
})();

window.SOREHEIM_STAGE1 = SOREHEIM_STAGE1;
```

- [ ] **Step 3: Wire to sideplot system**

In `js/loa-enriched-bridge.js` SIDEPLOT_TRIGGERS, add or update the `interim_seat` entry:
```javascript
{ id:'interim_seat', locality:'soreheim_proper', clock:'watchfulness', threshold:2, flag:'sideplot_interim_seat_started',
  trigger: function() { if (window.SOREHEIM_STAGE1) SOREHEIM_STAGE1.openingHook(); } },
```

- [ ] **Step 4: Verify sideplot triggers and resolves**

Set `G.location = 'soreheim_proper'; G.worldClocks.watchfulness = 3;` in console. Trigger a choice. Verify opening hook fires. Complete all three resolution paths.

- [ ] **Step 5: Commit**

```bash
git add js/scenes/soreheim_stage1.js js/loa-enriched-bridge.js
git commit -m "feat: interim_seat rewrite — canon-safe Soreheim quota manipulation (no Halversen)"
```

---

### Task 16: Mid-Stage 1 scope reveal

**Files:**
- Create: `js/scenes/scope_reveal.js`
- Modify: `js/engine.js` (hook into investigationProgress check)

- [ ] **Step 1: Write scope reveal scene**

Create `js/scenes/scope_reveal.js`:

```javascript
var SCOPE_REVEAL = (function() {

  function trigger() {
    var G = window.G;
    if (!G || G.flags.scope_reveal_shown) return;
    if ((G.investigationProgress || 0) < 5) return;
    G.flags.scope_reveal_shown = true;

    G.lastResult = 'The document is not addressed to anyone. It was folded inside a tax ledger from three years ago, overlooked or deliberately hidden. A list — partial, hand-copied — of names. Most mean nothing to you. But three of them are names you have encountered in other contexts, other documents, other frayed ends of this investigation. They are not connected by crime. They are connected by absence: every name on this list has been removed from at least one official record since the Catastrophe era. Someone has been compiling this absence. Someone else has been trying to stop them. The investigation you thought you were running is the surface of something much older.';
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.omens = (G.worldClocks.omens || 0) + 1;
    G.recentOutcomeType = 'discovery';
    window.addJournal('investigation', G.lastResult);
    if (typeof addNarration === 'function') addNarration('Found Document', G.lastResult);
    if (typeof updateHUD === 'function') updateHUD();
    (window._rawRenderChoices || window.renderChoices)([
      { id: 'scope_note_names', text: 'Record the names carefully. Cross-reference with everything you have found.', tag: 'bold',
        action: function() {
          window.G.flags.scope_reveal_names_recorded = true;
          window.G.investigationProgress = Math.max(window.G.investigationProgress || 0, 6);
          addNarration('', 'Three more threads. The picture is not larger — it is deeper.');
          if (typeof checkStageAdvance === 'function') checkStageAdvance();
        }
      },
      { id: 'scope_take_document', text: 'Take the document. It should not be here.', tag: 'safe',
        action: function() {
          window.G.flags.scope_reveal_document_taken = true;
          addNarration('', 'You fold it into your case notes. Evidence. Pattern. Purpose.');
          if (typeof checkStageAdvance === 'function') checkStageAdvance();
        }
      }
    ]);
  }

  return { trigger: trigger };
})();

window.SCOPE_REVEAL = SCOPE_REVEAL;
```

- [ ] **Step 2: Hook into investigationProgress in engine.js**

In `js/engine.js`, find where `G.investigationProgress` is incremented. After each increment:
```javascript
// After G.investigationProgress increment:
if (window.SCOPE_REVEAL && (G.investigationProgress || 0) >= 5) {
  setTimeout(function() { SCOPE_REVEAL.trigger(); }, 500);
}
```

- [ ] **Step 3: Verify trigger**

In console: `G.investigationProgress = 5; SCOPE_REVEAL.trigger();` — verify scene fires, narration appears, omens clock increments.

- [ ] **Step 4: Commit**

```bash
git add js/scenes/scope_reveal.js js/engine.js
git commit -m "feat: mid-Stage 1 scope reveal at investigationProgress 5 — deeper pattern discovered"
```

---

### Task 17: 18 locality opening narrations

**Files:**
- Create: `js/scenes/locality_narrations.js`
- Modify: `js/travel.js` (fire narration on first visit)

- [ ] **Step 1: Create locality narration data file**

Create `js/scenes/locality_narrations.js` with arrival narrations for all 18 Stage 1-2 localities. Follow the style guide: observational travel narrative, second person as lens (no actions given to "you"), sensory and vivid, fantasy elements understated.

Template structure: `opening_image → terrain_material_feel → ambient_activity → visible_power_structure → local_interaction_1 → local_interaction_2 → closing_sensory`

```javascript
window.LOCALITY_NARRATIONS = {

  shelkopolis: 'The city does not announce itself gently. Even from the road, the smell arrives first — coal smoke and old stone, fish salt from the harbor district, the sharp chemical note of the tanneries downwind. The streets inside the gate are narrow and purposeful, buildings leaning close as if in conference. A crier reads notices from a post outside the Iron Accord registry. Nearby, a woman in House Mimolot colors argues with a cart driver about something to do with permits. Two children race across the mouth of an alley without looking. The city is indifferent to your arrival and deeply, mechanically alive.',

  panim_haven: 'The fishing village smells of drying nets and the particular rot of things the sea discards. The docks are small, practical, patched. A weathered notice board outside the harbormaster\'s shed lists tide times and missing persons in the same bureaucratic hand. Gulls argue over something in the water. The main street has four businesses: a tavern, a chandler, a bait seller, and a building with no sign whose purpose you cannot immediately determine. An old man on a dock bench watches the horizon with the expression of someone who has given up expecting it to be interesting.',

  cosmoria: 'The harbor district is built on two levels: the working docks below, slick with brine and cargo chains, and the commercial street above, where the ledger-keepers and factors watch the cranes from behind counting-house windows. The smell is salt and grain and something slightly off — weevils in the storage, perhaps, or something heavier in the water. A stevedore argues with a foreman about weight records. The foreman has a ledger. The stevedore does not. The foreman wins.',

  fairhaven: 'The mill town is quieter than a working mill town should be. The wheel turns, the grind continues, but the workers move through it with the particular silence of people who have stopped talking to each other about something important. The main square has a well, a notice board, and three benches where nobody is sitting. A woman hangs laundry from a window above a shuttered shopfront. She looks down once, then away. The mill road has cart-ruts from the morning run. The afternoon run has not come.',

  guildheart_hub: 'The hub is a transit town that has mistaken itself for an administrative center. The main avenue has a genuine customs house, a surveyor\'s office, and a building that houses three competing guilds in separate wings — the wall between the Artificers and the Handlers is load-bearing in a way that suggests it was not always there. Carts move through in both directions. Clerks argue about manifest formats under a covered walkway. Someone is always in the middle of something and nobody is finished with it.',

  soreheim_proper: 'The city is built for extraction and management, not for aesthetics. The quota offices occupy the most prominent street, their façades marked with production tallies from the current season. The Giant administrators move through the population with the ease of people who have never needed to explain their authority. A row of standardized workers\' housing lines the eastern approach. The ration-distribution point near the central market has a queue that has clearly been there since morning. The scale of everything is calibrated for efficiency — functional, correct, and precisely as comfortable as required.',

  aurora_crown_commune: 'The commune is older than its current governance. The buildings are stone and earth-brick, built over generations, walls thick enough to lean into. Every communal space has a message-board — not announcements, but records, names, decisions, the accumulated living memory of a shared administration. The grain stores are communal, clearly labeled, maintained. A child plays near the registry hall while two elders revise something at a table near the door. The sounds are domestic: cooking, someone hammering, the low register of a discussion in the next building.',

  glasswake_commune: 'The commune sits on a shallow estuary, its buildings on stilts above the seasonal flood line. The water carries light strangely here — the surface breaks reflections into fragments that suggest shapes that are not there. The dock planks are salt-bleached and replace-marked; everything here gets replaced eventually. A fisherman mends a net on the shore. He does not look up when you arrive.',

  whitebridge_commune: 'The bridge is older than the commune. The commune grew around it, organized itself by it, named itself after it. The stone is white-grey and cold to the touch even in summer. The commune buildings cluster on both banks in a way that makes the bridge the center of everything — market, meeting, transit, argument. Two people stand at the rail mid-bridge looking at the water below. They are not talking to each other.',

  ironhold_quarry: 'The quarry has been working this site for over a century — you can tell by the way the stone face has retreated into the hillside, methodically, in horizontal bands. The workers are quiet in the way that people who work near loud machinery always are, voices tuned to carry over distance. A foreman marks a tally board near the equipment shed. The dust is everywhere, coating the roadside brush in white grey.',

  plumes_end_outpost: 'The outpost is a relay and a waypoint and not much else. Two buildings, a supply cache, a well, and a fire-signal platform that has not been used in years. The Roadwarden on duty is reading something. She does not put it down when you arrive. The track east is less maintained than the track you came in on.',

  craftspire: 'The spire is not a natural formation — it is a building, or was once, or is something in between. The structure rises higher than it has any right to from this size of settlement, its upper reaches modified and remodified over centuries. The artificers\' workshops cluster at its base. The smell is hot metal and flux. A queue outside the guild registry suggests the spire\'s reputation extends beyond its walls.',

  unity_square: 'The square was built to be ceremonial and has become commercial through sheer civic inertia. The stage at the center is used for trade announcements and labor allocation, not speeches. Factors walk the perimeter taking notes. A public ledger near the entrance records work assignments for the current week. The inscription above the gate, partially obscured by a posted notice, reads something about solidarity. The notice is about cart-load fees.',

  shelkopolis_harbor: 'The harbor is a separate city from the streets above it. Down here, the scale changes: crane-arms over the water, warehouses the size of civic buildings, the constant creak and complaint of ships at load. The customs house operates at all hours with the grim efficiency of an institution that cannot afford delays. A Collegium inspector makes notes on a clipboard near berth seven. Two dockhands watch him from across the pier without speaking.',

  guildheart_archive: 'The archive annex is attached to the hub\'s administrative building by a covered walkway that always seems to be in shadow. The reading room smells of paper and preservation wax. A single archivist manages intake and reference from a desk surrounded by indexed containers. The shelves go further back than the building\'s exterior suggests they should.',

  mimolot_academy: 'The academy sits above the city on a terraced hillside, its buildings arranged in a way that suggests it was designed to overlook everything. The students move through its paths with the focused distraction of people who are always thinking about something other than where they are walking. The main library is marked by a carved lintel that lists its founding principles in an old script. Someone has pasted a student broadsheet over the bottom half of the inscription.',

  sheresh_coastal_commune: 'The commune sits on the high ground above the tide line, facing the sea. The buildings are organized around the memory hall — the largest structure, kept clean, its records more rigorously maintained than the infrastructure around it. An elder reads from the commune registry to a group of children on the steps. She does not look up when you pass, but she notes the time.',

  soreheim_transit_post: 'The transit post is the administrative midpoint between two quota districts, and it knows it. The manifest clerks work in parallel at long counters. The verification office has a queue. The compliance office does not have a queue, which means it either does very little or very much. A factor in Alliance colors argues with a clerk about load classification while a Roadwarden watches from the corner with the expression of someone who has watched this argument happen before.'

};
```

- [ ] **Step 2: Wire narrations to first-visit in travel.js**

In `executeTravelTo` in `js/travel.js`, after setting `G.discoveredLocalities[destId] = 'visited'`:
```javascript
// Fire arrival narration on first visit only:
var narr = (window.LOCALITY_NARRATIONS || {})[destId];
if (narr && !(G.flags['visited_' + destId])) {
  G.flags['visited_' + destId] = true;
  if (typeof updateEnvDesc === 'function') updateEnvDesc(narr);
  if (typeof addNarration === 'function') addNarration('Arriving', narr);
} else if (narr && typeof updateEnvDesc === 'function') {
  // Subsequent visits: update env-desc without narration repeat
  updateEnvDesc(narr);
}
```

- [ ] **Step 3: Verify narration fires**

Travel to Cosmoria. Verify opening narration appears in both the env-desc column and the narrative panel. Travel away and return — verify env-desc updates but no duplicate narration.

- [ ] **Step 4: Commit**

```bash
git add js/scenes/locality_narrations.js js/travel.js
git commit -m "feat: 18 locality opening narrations wired to first-visit in travel system"
```

---

### Task 18: Sheresh Stage 1 arc + shadow_ledger Stage 2 hints

**Files:**
- Create: `js/scenes/sheresh_stage1.js`
- Create: `js/scenes/shadow_ledger_hints.js`
- Modify: `js/loa-enriched-bridge.js` (wire both to sideplot system)

- [ ] **Step 1: Write Sheresh Stage 1 arc**

Create `js/scenes/sheresh_stage1.js`:

```javascript
var SHERESH_STAGE1 = (function() {

  function openingHook() {
    var G = window.G;
    if (!G || G.flags.sideplot_sheresh_started) return;
    G.flags.sideplot_sheresh_started = true;

    G.lastResult = 'At the commune registry, you search the memory records on a different matter — and find the absence instead. The entry for the year you turned nine has a gap where a name should be. Not a crossed-out name, not a redaction. A gap. As if the record was never written, or as if something was placed here to hold a space that was then removed. You know whose name belongs in that gap. You remember her — the healer who taught you the first names of the fever-plants, who had an opinion about everything and expressed it without cruelty. Her name is not here. According to the commune record, she never existed.';
    G.flags.sheresh_memory_gap_found = true;
    G.recentOutcomeType = 'discovery';
    G.investigationProgress = Math.max(G.investigationProgress || 0, 2);
    window.addJournal('investigation', G.lastResult);

    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        { id: 'sheresh_ask_elder', text: 'Ask an elder about the gap in the record.', tag: 'bold',
          action: function() { askElder(); } },
        { id: 'sheresh_search_older', text: 'Search older records — find evidence she existed before the gap.', tag: 'risky',
          action: function() { searchOlderRecords(); } },
        { id: 'sheresh_sit_with_it', text: 'Sit with the knowledge. What does it mean that she is gone from here too?', tag: 'safe',
          action: function() { sitWithIt(); } }
      ]);
    }, 400);
  }

  function askElder() {
    var G = window.G;
    var r = rollD20('charm');
    if (r.success) {
      G.lastResult = 'The elder is old enough to remember, and she knows exactly what you are asking. She looks at the gap for a long moment. "We were told it was a registration error. A duplicate that needed to be resolved." She looks at you. "I never believed that." She cannot tell you who ordered it. She can tell you it came from outside the commune.';
      G.flags.sheresh_external_erasure_confirmed = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 3);
    } else {
      G.lastResult = 'The elder you approach doesn\'t remember — or says she doesn\'t. The record gap is awkward in the conversation. She suggests a clerical explanation with the careful voice of someone who does not want to say more.';
      G.flags.sheresh_elder_uncooperative = true;
    }
    window.addJournal('investigation', G.lastResult);
    _closeWithHint();
  }

  function searchOlderRecords() {
    var G = window.G;
    var r = rollD20('wits');
    if (r.success) {
      G.lastResult = 'In a secondary ledger — the kind used for inter-commune correspondence, kept in a back room with no active index — her name appears three times. A resource request she submitted. A healer certification renewal. A grievance she filed against the collective memory board, three months before her name vanished from the main registry. The grievance references "external registry interference." The grievance has no resolution recorded.';
      G.flags.sheresh_evidence_found = true;
      G.flags.sheresh_grievance_found = true;
      G.investigationProgress = Math.max(G.investigationProgress || 0, 4);
    } else {
      G.lastResult = 'The older records are disorganized and partially damaged. You find nothing conclusive — only a single certification entry that could be her, if the year aligns, which you cannot confirm.';
    }
    window.addJournal('investigation', G.lastResult);
    _closeWithHint();
  }

  function sitWithIt() {
    var G = window.G;
    G.lastResult = 'She existed. You know she existed. The commune record says she did not. The distance between those two facts is not a clerical error. Someone decided she should not have existed, and someone else decided that decision should be made permanent. The investigation you thought was about the ledger of ash is also about this — about everyone who was removed from every record, everywhere. About what it means that it happened here, at home, before you even knew to look.';
    G.flags.sheresh_emotional_anchor_set = true;
    G.worldClocks.isolation = (G.worldClocks.isolation || 0) + 1;
    G.investigationProgress = Math.max(G.investigationProgress || 0, 3);
    window.addJournal('investigation', G.lastResult);
    _closeWithHint();
  }

  function _closeWithHint() {
    var G = window.G;
    if (!G.flags.sheresh_principalities_hint_shown) {
      G.flags.sheresh_principalities_hint_shown = true;
      addNarration('A Thought', 'The pattern is larger than this commune. If it happened here, it happened in more places. The Principalities — Shelkopolis in particular — is where official records are centralized. That is where the answer is.');
    }
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
  }

  return { openingHook: openingHook };
})();

window.SHERESH_STAGE1 = SHERESH_STAGE1;
```

- [ ] **Step 2: Write shadow_ledger Stage 2 hints**

Create `js/scenes/shadow_ledger_hints.js`:

```javascript
var SHADOW_LEDGER_HINTS = (function() {

  var HINTS = [
    { id: 'hint_permit_seals', text: 'A merchant at the transit post mentions suspicious permit seals — the watermark is wrong, but the signature is genuine. "Twice-Sealed, they call the forgeries. Someone knows both sides of the approval chain."', clock: 'pressure', threshold: 2 },
    { id: 'hint_sel_stone', text: 'A contact at the Guildheart Hub mentions a name — Sel Stone — with the careful tone of someone passing on information they weren\'t supposed to have. "He knows who moves things through channels that don\'t exist. Red Hood Guild, maybe. Maybe older than that."', clock: 'watchfulness', threshold: 3 },
    { id: 'hint_transit_workers', text: 'Three transit workers at the harbor have not been paid in six weeks. Their work orders reference a company that does not appear in the official permit registry. The company name: Twice-Sealed Transit.', clock: 'pressure', threshold: 4 }
  ];

  function checkAndFire() {
    var G = window.G;
    if (!G || !G.worldClocks) return;
    HINTS.forEach(function(hint) {
      if (!G.flags['hint_' + hint.id] && (G.worldClocks[hint.clock] || 0) >= hint.threshold) {
        G.flags['hint_' + hint.id] = true;
        addNarration('Rumor', hint.text);
        window.addJournal('investigation', hint.text);
        if (hint.id === 'hint_sel_stone') {
          G.flags.sel_stone_known = true;
          if (!G.discoveredNPCs) G.discoveredNPCs = {};
          G.discoveredNPCs['sel_stone'] = { name: 'Sel Stone', status: 'rumor', notes: 'Red Hood Guild connection. Knows unofficial transit channels.' };
        }
      }
    });
  }

  return { checkAndFire: checkAndFire };
})();

window.SHADOW_LEDGER_HINTS = SHADOW_LEDGER_HINTS;
```

- [ ] **Step 3: Wire both to the sideplot/clock system**

In `js/loa-enriched-bridge.js`, add to post-choice hook:
```javascript
// After each choice, check shadow_ledger hints and Sheresh arc:
if (window.SHADOW_LEDGER_HINTS) SHADOW_LEDGER_HINTS.checkAndFire();
```

Add Sheresh sideplot trigger:
```javascript
{ id:'sheresh_memory_gap', locality:'sheresh_coastal_commune', clock:'isolation', threshold:1,
  flag:'sideplot_sheresh_started',
  trigger: function() { if (window.SHERESH_STAGE1) SHERESH_STAGE1.openingHook(); } },
```

- [ ] **Step 4: Verify Sheresh arc**

Travel to `sheresh_coastal_commune`, set isolation ≥ 1 in console. Trigger choice cycle. Verify opening hook fires. Complete all three response paths.

- [ ] **Step 5: Commit**

```bash
git add js/scenes/sheresh_stage1.js js/scenes/shadow_ledger_hints.js js/loa-enriched-bridge.js
git commit -m "feat: Sheresh Stage 1 arc + shadow_ledger Stage 2 hints (Twice-Sealed/Red Hood Guild)"
```

---

### Task 19: Alignment neutral workarounds + world clock increment paths

**Files:**
- Modify: `js/loa-enriched-bridge.js` (neutral NPC tone, Stage 2 end scene hook)
- Modify: `js/engine.js` (omens clock increment)

- [ ] **Step 1: Add neutral NPC tone to bridge**

In `js/loa-enriched-bridge.js`, find where NPC dialogue tone is determined. Add a neutral flavor track:

```javascript
function getNPCTone(G) {
  if (!G) return 'default';
  var ben = G.benevolence || 0;
  var ord = G.orderAxis || 0;
  // Deep alignment: strong reaction
  if (ben >= 30 || ord >= 30 || ben <= -30 || ord <= -30) return 'aligned';
  // Near-neutral: unreadable tone
  if (Math.abs(ben) < 10 && Math.abs(ord) < 10) return 'neutral';
  return 'default';
}

// In NPC response generation:
var tone = getNPCTone(window.G);
if (tone === 'neutral') {
  // Add 1-in-4 chance of "unreadable" NPC reaction to choices
  // NPCs don't distrust but don't warm either; some doors stay closed
  if (choice.requiresAlignment && Math.random() < 0.5) {
    addNarration(npcName, 'They study you for a moment without speaking. Something about your approach makes you difficult to place. They proceed, but without the ease they show others.');
  }
}
```

- [ ] **Step 2: Add Stage 2 end neutral-arc resolution scene**

In the stage advance check (where Stage II → Stage III), add neutral arc scene check:

```javascript
// Before Stage II fully resolves, check for neutral arc:
function checkNeutralArcScene() {
  var G = window.G;
  if (!G || G.flags.neutral_arc_shown) return;
  var ben = Math.abs(G.benevolence || 0);
  var ord = Math.abs(G.orderAxis || 0);
  if (ben < 10 && ord < 10) {
    G.flags.neutral_arc_shown = true;
    addNarration('A Moment of Reckoning', 'You have moved through this investigation without committing to a direction. People do not know what to make of you — which has been useful. But the investigation is about to enter its second phase, and the question of who you are in it will stop being theoretical. Uncommitted is a position too. It just stops working when the stakes get high enough.');
    setTimeout(function() {
      (window._rawRenderChoices || window.renderChoices)([
        { id: 'neutral_arc_commit', text: 'The investigation demands something from you. Commit to a direction.', tag: 'bold',
          action: function() { addNarration('', 'You decide. Whatever comes next, it comes with a position.'); checkStageAdvance(); }
        },
        { id: 'neutral_arc_remain', text: 'Neutrality is a tool. You will use it until it stops working.', tag: 'safe',
          action: function() { addNarration('', 'The tool stays sharp until the moment it does not.'); checkStageAdvance(); }
        }
      ]);
    }, 400);
  }
}
```

Call `checkNeutralArcScene()` in `checkStageAdvance` before the Stage III advancement logic.

- [ ] **Step 3: Add omens clock increment paths**

In `js/engine.js`, find the post-choice processing. Add omens increments:

```javascript
// After a bold/risky investigation choice succeeds:
if (choice.tag === 'risky' && result.success && choice.id && choice.id.indexOf('investigation') !== -1) {
  G.worldClocks.omens = (G.worldClocks.omens || 0) + 1;
}
// After scope_reveal fires:
// (already added in scope_reveal.js)
// After Maren progress notices (in maren_oss_encounter.js resolution):
// (already added in that file's _close function)
```

Also in the Catastrophe lore discovery paths (search for any choice that references `catastrophe` or `Catastrophe`):
```javascript
// Tag Catastrophe-related choices to increment omens on success:
// Add to any choice with id containing 'catastrophe' or 'catastrophe_lore':
if (result.success && choice.id && choice.id.indexOf('catastrophe') !== -1) {
  G.worldClocks.omens = (G.worldClocks.omens || 0) + 1;
}
```

- [ ] **Step 4: Verify neutral arc**

Set `G.benevolence = 2; G.orderAxis = 3;` then trigger stage advance from II to III. Verify neutral arc scene fires.

- [ ] **Step 5: Commit**

```bash
git add js/loa-enriched-bridge.js js/engine.js
git commit -m "feat: alignment neutral NPC tone + Stage 2 end neutral arc scene + omens clock paths"
```

---

## Phase F — Final Verification

---

### Task 20: Build, smoke-test, and commit dist

**Files:**
- Run: `python build.py`
- Test: `dist/ledger-of-ash.html`

- [ ] **Step 1: Run build**

```bash
cd C:/Users/CEO/ledger-of-ash
python build.py
```

Expected: `dist/ledger-of-ash.html` updated with no errors.

- [ ] **Step 2: Smoke-test critical paths**

Open `dist/ledger-of-ash.html` in browser. Test:
1. New game → case code displayed → choices render without stacking
2. Case File bar fills as investigationProgress increases
3. Advance to Stage II → Principalities route available for non-Principalities background
4. Companion strike counter works (set strikes to 3 manually → confrontScene fires)
5. Save to slot 1 → reload page → enter case code → state restored
6. Export JSON → fresh session → import → state restored
7. Tension level 2 → fight choice appears
8. Sideplot: set location + clock → sideplot fires
9. Backstory group narration appears at char creation completion

- [ ] **Step 3: Fix any regressions found in smoke test**

Document and fix. Commit fixes individually.

- [ ] **Step 4: Final commit**

```bash
git add dist/ledger-of-ash.html
git commit -m "build: dist rebuild — Stage 1-2 completion implementation"
```

---

## Self-Review: Spec Coverage Check

| Spec Section | Covered by Task(s) |
|---|---|
| §2 Critical bugs | Tasks 1, 2, 3, 4 |
| §3 UI Layout | Tasks 10, 11 |
| §4 XP & Risk Tiers | Task 4 (seenChoices); XP values already implemented |
| §5 Combat & Tension | Task 12 (combat flip), Task 3 (NPC tension colors) |
| §6 Companion System | Task 5 (warnStage strikes), Task 3 (Elyra floor) |
| §7 Traits → Utility Skills | Task 3 |
| §8 Travel & Stage Lock | Tasks 7, 8, 9 |
| §9 Sandbox | Task 10 |
| §10 Save System | Task 6 |
| §11 Character Creation | Task 13 |
| §12 Sideplots | Tasks 2, 15, 18 |
| §13 Maren Oss | Task 14 |
| §14 Locality Narrations | Task 17 |
| §15 Mid-Stage 1 Reveal | Task 16 |
| §16 Sheresh/Soreheim | Tasks 15, 18 |
| §17 Alignment Neutral | Task 19 |
| §18 World Clocks | Tasks 2, 19 |
| §19 Deferred | Not in this plan (by design) |
| §20 Version | No change (v0.1) |

**No spec gaps identified.**
