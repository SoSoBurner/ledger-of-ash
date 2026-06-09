# Unified Travel Overlay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Route all travel through the existing `#overlay-map` with day-by-day encounter legs driven by spatial data, biome, and mode-of-travel — replacing the current three-headed modal/inline/corridor split.

**Architecture:** The `#map-body` div inside `#overlay-map` switches between three modes: map-grid (destination picker), mode-select, and journey (day counter + encounter choices). All three modes stay inside the same overlay. Encounters render as choice buttons inside `#map-body`; result narration still goes to the main story area via `addNarration`. The day-leg engine lives in `travel_corridors.js` as `TRAVEL_CORRIDOR.startOverlayJourney()` / `advanceDayLeg()`. Route complication encounters are authored as self-contained JS objects (no CID lookup needed) keyed by `'from|to'` in `ROUTE_COMPLICATIONS`.

**Tech Stack:** Vanilla ES5 JS, no bundler. `ledger-of-ash.html` (engine), `content/travel_corridors.js` (corridor layer), `content/travel_route_data.js` (new — route index). Tests: `npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line` for regression; manual `play.bat` for UI verification.

---

## File Map

| File | Role | Change type |
|---|---|---|
| `content/travel_route_data.js` | Route spatial index: days by mode, biome sequence, route_note, allowed modes per route | **Create** |
| `ledger-of-ash.html` | Engine: overlay helper, travelTo/showMap rewire, mode-select/pack-choice overlays | **Modify** |
| `content/travel_corridors.js` | Day-leg engine, `ROUTE_COMPLICATIONS`, `_renderChoicesInOverlay`, anchor wiring | **Modify** |

---

## Critical Context (read before touching any file)

- **`#overlay-map` HTML (line 2052–2057):** `<div class="overlay" id="overlay-map"><div class="overlay-box overlay-wide"><div class="overlay-header">…</div><div class="overlay-body" id="map-body"></div></div></div>`. The `#map-body` div is the content container `showMap()` fills. All three travel modes (map grid, mode-select, journey) will swap this div's content.
- **`showTravelModeSelect()` (lines 13870–13896):** The current modal overlay — `position:fixed` appended to `document.body`. This gets **removed** entirely and replaced by in-overlay rendering.
- **`selectTravelMode()` (lines 13898–13911):** Sets `G.travelMode`, fires `window._travelModeCallback`. Also removed — mode selection now happens inline.
- **`travelTo(locId)` (lines 13913–13933):** Checks `G.travelMode`, calls modal OR `beginJourney()`. Modified to call `_showModeSelectInOverlay(locId)` always (mode is never pre-set anymore — `G.travelMode` is cleared after each journey).
- **`beginJourney(fromId, toId)` (lines 13935–13951):** Renders inline pack choices in story area. Modified to call `_showPackChoicesInOverlay(fromId, toId, mode)`.
- **`doTravelJourney(destId)` (lines ~14780–14827):** Handles fatigue + time, calls `_travelStartEncounter()`. Modified to call `TRAVEL_CORRIDOR.startOverlayJourney()` instead.
- **`showMap()` (lines 15034–15133):** Destination buttons call `travelTo(locId)`. Change button handlers to call `_showModeSelectInOverlay(locId)` directly (skips the travelTo gate-check — gate logic moves inside `_showModeSelectInOverlay`).
- **`TRAVEL_ROUTES` (travel_corridors.js lines 63–97):** Authoritative day counts by mode for all playable routes. `travel_route_data.js` augments these with `route_note`, `biomes[]`, `route_class`.
- **`TRAVEL_CORRIDOR.triggerEncounters()` (travel_corridors.js line 453):** Current encounter entry point called from `_travelStartEncounter`. Replaced — day-leg engine handles encounter scheduling.
- **`TRAVEL_CORRIDOR.nextEncounter()` (travel_corridors.js line 547):** Called by action functions via `window._travelNextEncounter`. Replaced by `TRAVEL_CORRIDOR.advanceDayLeg()`.
- **`OPERATIONAL_ANCHORS` (travel_corridors.js lines 381–422):** 4 authored waypoints, each with `locality`, `name`, `desc`, `choices`. Currently unlinked. Wired in Task 7.
- **`_wrapEncounterChoices(choices, dest)` (travel_corridors.js):** Wraps CID-based choices to call `nextEncounter` after resolution. No longer needed — all corridor encounter choices will have inline `action` functions after Task 6.

---

## Task 1: Create `content/travel_route_data.js`

**Files:**
- Create: `content/travel_route_data.js`
- Modify: `ledger-of-ash.html` (add script tag)

This file provides the augmented route index. Data extracted from `material_planet_spatial_intelligence_filesystem_ultimate_100_ai_runtime.zip` → `data/routes.json` and `data/travel_calibration.json`. Days come from `TRAVEL_ROUTES` (already in travel_corridors.js — do NOT duplicate). This file only adds: `route_note`, `biomes[]`, `route_class`, `allowed_modes`.

- [ ] **Step 1: Create the file**

```js
// travel_route_data.js
// Augments TRAVEL_ROUTES with route flavor, biome sequence, and mode availability.
// Keyed by 'from_id|to_id' (canonical order, lowercase). Both directions share one entry.
// Days-by-mode come from TRAVEL_ROUTES — do not duplicate here.
window.ROUTE_SPATIAL_DATA = {
  'shelkopolis|fairhaven': {
    route_note: 'The Shelkopolis road is easiest when intentions, cargo, and patronage are legible before questions begin.',
    biomes: ['plains'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'shelkopolis|aurora_crown_commune': {
    route_note: 'The Whitebridge Domeway passes two checkpoint posts. Both are staffed. Neither is informal.',
    biomes: ['plains','highland'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'shelkopolis|cosmoria': {
    route_note: 'The Brineland harbor ring runs through Cosmouth authority. Cargo manifests are inspected at two points.',
    biomes: ['plains','coastal'],
    route_class: 'mixed',
    allowed_modes: ['foot','horse','cart','boat']
  },
  'guildheart_hub|fairhaven': {
    route_note: 'The plains road between Guildheart and Fairhaven carries Guild transit seals. Both are required.',
    biomes: ['plains'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'guildheart_hub|ithtananalor': {
    route_note: 'Forest roads here are maintained to guild standard but the canopy reduces sightlines. Wardens work in pairs.',
    biomes: ['plains','forest'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'guildheart_hub|soreheim_proper': {
    route_note: 'The Craftspire corridor enters Soreheim allocation territory at the highland boundary. Quota transit rules apply.',
    biomes: ['plains','highland','mountain'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'guildheart_hub|mimolot_academy': {
    route_note: 'Mimolot-bound traffic is light but checked twice — once at the guild transit gate and once at the academy boundary.',
    biomes: ['plains'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'soreheim_proper|sunspire_haven': {
    route_note: 'The highland road between Soreheim and Sunspire is a quota route. Extraction figures are posted at each marker.',
    biomes: ['mountain','highland'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'panim_haven|shirshal': {
    route_note: 'The coastal road between Panim and Shirshal runs through contested patrol zones. The jurisdictional boundary is not marked.',
    biomes: ['coastal'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'shirshal|ithtananalor': {
    route_note: 'The forest road east is maintained by neither Shirshal nor Ithtananalor authority. It shows.',
    biomes: ['forest'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'mimolot_academy|ithtananalor': {
    route_note: 'Forest road. Academy-sealed cargo moves this route regularly; searchers know the smell of the wax.',
    biomes: ['plains','forest'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'amber_fountain_inn|fairhaven': {
    route_note: 'The Amber Tides river route requires port authorization at Fairhaven. The river master checks manifests against the harbor ledger.',
    biomes: ['coastal'],
    route_class: 'river',
    allowed_modes: ['boat']
  },
  'cosmoria|brineland': {
    route_note: 'The Brineland sea passage is open year-round but subject to seasonal storm windows. Port inspection on arrival.',
    biomes: ['sea'],
    route_class: 'sea',
    allowed_modes: ['boat']
  }
};

// Normalize key lookup — both directions map to the same canonical entry.
// Usage: ROUTE_SPATIAL_DATA.get('fairhaven', 'shelkopolis')
ROUTE_SPATIAL_DATA.get = function(fromId, toId) {
  return this[fromId + '|' + toId] || this[toId + '|' + fromId] || null;
};
```

- [ ] **Step 2: Add script tag to HTML**

In `ledger-of-ash.html`, find the block of `<script src="content/...">` tags. Add immediately after `travel_corridors.js`:

```html
<script src="content/travel_route_data.js"></script>
```

- [ ] **Step 3: Verify load**

Open `play.bat`. In DevTools console: `ROUTE_SPATIAL_DATA.get('shelkopolis','fairhaven')`. Should return the shelkopolis|fairhaven object with `route_note`, `biomes`, `allowed_modes`.

- [ ] **Step 4: Commit**

```bash
git add content/travel_route_data.js ledger-of-ash.html
git commit -m "feat(travel): add ROUTE_SPATIAL_DATA — route notes, biomes, allowed modes for 13 playable routes"
```

---

## Task 2: Add overlay journey infrastructure helper

**Files:**
- Modify: `ledger-of-ash.html` (add `_setMapOverlayContent()` helper + journey CSS)

`_setMapOverlayContent(titleHtml, bodyHtml, showClose)` swaps `#map-body` content and updates the overlay title. The close button is hidden during a journey (player must resolve the journey to exit).

- [ ] **Step 1: Find the `showMap()` function in HTML**

`showMap()` is at approximately line 15034. Find the line that reads `function showMap()`.

- [ ] **Step 2: Add `_setMapOverlayContent()` immediately before `showMap()`**

```js
// Swap #map-body content and update overlay header. Call before showOverlay().
function _setMapOverlayContent(titleHtml, bodyHtml, showClose) {
  var mapBody = document.getElementById('map-body');
  if (mapBody) mapBody.innerHTML = bodyHtml;
  var titleEl = document.querySelector('#overlay-map .overlay-title');
  if (titleEl) titleEl.innerHTML = titleHtml;
  var closeBtn = document.querySelector('#overlay-map .overlay-close');
  if (closeBtn) closeBtn.style.display = showClose === false ? 'none' : '';
}
```

- [ ] **Step 3: Add journey-mode CSS**

In the `<style>` block (search for `.overlay-map` or `.overlay-box`), add:

```css
.journey-day-header {
  font-family: var(--font-display);
  font-size: 12px;
  color: var(--accent-gold);
  letter-spacing: 1px;
  margin-bottom: 10px;
}
.journey-narration {
  font-family: 'Crimson Pro', serif;
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink);
  margin-bottom: 14px;
}
.journey-route-note {
  font-size: 12px;
  color: var(--ink-dim);
  font-style: italic;
  margin-bottom: 14px;
  padding-left: 10px;
  border-left: 2px solid var(--char);
}
.journey-choices {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
```

- [ ] **Step 4: Refactor `showMap()` to use `_setMapOverlayContent()`**

Inside `showMap()`, find the line where it builds `html` and calls `mapBody.innerHTML = html`. Replace the assignment with:

```js
_setMapOverlayContent('The Material Planet', html, true);
showOverlay('overlay-map');
```

Remove any existing `showOverlay('overlay-map')` call that comes after.

- [ ] **Step 5: Test map overlay still works**

Open `play.bat`. Click the map button. Verify the map grid opens correctly. Click the × button to close. Verify it closes.

- [ ] **Step 6: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(travel): add _setMapOverlayContent() helper + journey CSS; refactor showMap() to use it"
```

---

## Task 3: In-overlay mode select (replace modal)

**Files:**
- Modify: `ledger-of-ash.html` — remove `showTravelModeSelect()` and `selectTravelMode()`, add `_showModeSelectInOverlay()`, modify `travelTo()` and `showMap()` destination click handlers

- [ ] **Step 1: Delete `showTravelModeSelect()` (lines 13870–13896)**

Remove the entire function. It builds a `position:fixed` modal appended to `document.body`. It is no longer needed.

- [ ] **Step 2: Delete `selectTravelMode()` (lines 13898–13911)**

Remove the entire function and `window.selectTravelMode = selectTravelMode`.

- [ ] **Step 3: Add `_showModeSelectInOverlay(locId)` before `travelTo()`**

```js
function _showModeSelectInOverlay(locId) {
  var loc = WORLD_LOCATIONS[locId];
  if (!loc) return;
  var cur = WORLD_LOCATIONS[G.location];
  // Stage I cross-polity gate (same logic as original travelTo)
  if (G.stage === 'Stage I' && cur) {
    var lmr = window.LOCALITY_MACROREGION || {};
    var sameMacro = lmr[locId] && lmr[G.location] && lmr[locId] === lmr[G.location];
    var samePolitya = loc.polity === cur.polity;
    var plotUnlock = G.flags && G.flags['travel_unlock_' + locId];
    if (!samePolitya && !sameMacro && !plotUnlock) {
      addNarration('', '<em style="color:var(--gold-dim)">Advance to Stage II to journey beyond your current region.</em>');
      return;
    }
  }

  var _costs = { foot: 0, horse: 8, cart: 12, boat: 15 };
  var _labels = { foot: 'On Foot', horse: 'Horse', cart: 'Cart', boat: 'River Passage' };
  var routeData = window.ROUTE_SPATIAL_DATA ? window.ROUTE_SPATIAL_DATA.get(G.location, locId) : null;
  var allowed = routeData ? routeData.allowed_modes : ['foot','horse','cart'];
  var routeEntry = (window.TRAVEL_ROUTES || {})[G.location + '|' + locId]
                || (window.TRAVEL_ROUTES || {})[locId + '|' + G.location] || {};
  var _gold = G.gold || 0;

  var btnsHtml = allowed.map(function(m) {
    var cost = _costs[m] || 0;
    var days = routeEntry[m] || '?';
    var canAfford = cost === 0 || _gold >= cost;
    return '<button class="choice-btn overlay-mode-btn"'
      + ' data-mode="' + m + '" data-destid="' + locId + '"'
      + (!canAfford ? ' disabled style="opacity:0.4;cursor:not-allowed"' : '')
      + '>' + _labels[m]
      + (cost > 0 ? ' — ' + cost + 'g' : ' — Free')
      + '<br><span style="font-size:11px;color:var(--ink-dim)">~' + (typeof days === 'number' ? Math.ceil(days) : days) + ' days</span></button>';
  }).join('');

  var noteHtml = routeData && routeData.route_note
    ? '<div class="journey-route-note">' + routeData.route_note + '</div>' : '';

  _setMapOverlayContent(
    'Travel to ' + loc.name,
    noteHtml
    + '<div class="journey-choices">' + btnsHtml + '</div>'
    + '<div style="margin-top:14px"><button id="overlay-back-to-map" class="btn btn-ghost btn-sm">← Back to map</button></div>',
    false
  );
  showOverlay('overlay-map');

  document.querySelectorAll('.overlay-mode-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var mode = btn.dataset.mode;
      var destId = btn.dataset.destid;
      var cost = _costs[mode] || 0;
      if (cost > 0 && _gold < cost) { showToast('Not enough gold.'); return; }
      if (cost > 0) { G.gold = Math.max(0, _gold - cost); updateHUD(); }
      G.travelMode = mode;
      _showPackChoicesInOverlay(G.location, destId, mode);
    });
  });

  var backBtn = document.getElementById('overlay-back-to-map');
  if (backBtn) backBtn.addEventListener('click', function() { showMap(); });
}
```

- [ ] **Step 4: Modify `travelTo(locId)` to call `_showModeSelectInOverlay()`**

Replace the body of `travelTo()` with:

```js
function travelTo(locId) {
  _showModeSelectInOverlay(locId);
}
```

(Gate logic now lives inside `_showModeSelectInOverlay`. `beginJourney` and the old modal path are gone.)

- [ ] **Step 5: Modify `showMap()` destination button handlers**

In `showMap()`, find the line: `btn.addEventListener('click', () => { closeOverlay('overlay-map'); travelTo(btn.dataset.locid); });`

Replace with:

```js
btn.addEventListener('click', function() { _showModeSelectInOverlay(btn.dataset.locid); });
```

(No longer close the overlay — mode select now opens inside it.)

- [ ] **Step 6: Verify**

Open `play.bat`. Click map → click a destination. Verify mode select appears inside the overlay (not a separate modal). Verify cost labels show. Verify "Back to map" returns to map grid. Verify Stage I cross-polity gate still works.

- [ ] **Step 7: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(travel): replace modal mode select with in-overlay _showModeSelectInOverlay()"
```

---

## Task 4: Pack choices in overlay

**Files:**
- Modify: `ledger-of-ash.html` — add `_showPackChoicesInOverlay()`, modify `beginJourney()`

- [ ] **Step 1: Add `_showPackChoicesInOverlay(fromId, toId, mode)` before `beginJourney()`**

```js
function _showPackChoicesInOverlay(fromId, toId, mode) {
  var loc = WORLD_LOCATIONS[toId];
  var destName = loc ? loc.name : toId;
  var macro = (window.LOCALITY_MACROREGION || {})[fromId] || 'principalities';
  var narrs = (window.MACROREGION_NARRATIONS || {})[macro] || [];
  var ambient = narrs[Math.floor(Math.random() * narrs.length)] || 'The road opens ahead.';

  _setMapOverlayContent(
    'Departing for ' + destName,
    '<div class="journey-narration">' + ambient + '</div>'
    + '<div class="journey-day-header">SUPPLY</div>'
    + '<div class="journey-choices">'
    + '<button class="choice-btn overlay-pack-btn" data-pack="light">Travel light — speed over supply.<br><span style="font-size:11px;color:var(--ink-dim)">Faster; +1 fatigue risk per encounter</span></button>'
    + '<button class="choice-btn overlay-pack-btn" data-pack="standard">Standard kit. Everything I need, nothing extra.<br><span style="font-size:11px;color:var(--ink-dim)">Balanced</span></button>'
    + '<button class="choice-btn overlay-pack-btn" data-pack="heavy">Full pack. The weight is a problem I can manage.<br><span style="font-size:11px;color:var(--ink-dim)">+1 supply per 3 days; Craft DC 10 carry roll</span></button>'
    + '</div>',
    false
  );

  document.querySelectorAll('.overlay-pack-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var pack = btn.dataset.pack;
      G.journeyPack = pack;
      if (pack === 'heavy') {
        var r = typeof rollD20 === 'function' ? rollD20('craft') : { total: 12 };
        if (r.total < 10) {
          G.fatigue = (G.fatigue || 0) + 2;
          addNarration('', 'The weight is harder to manage than expected. Two points of fatigue before the road begins.');
        }
      }
      if (typeof TRAVEL_CORRIDOR !== 'undefined' && TRAVEL_CORRIDOR.startOverlayJourney) {
        TRAVEL_CORRIDOR.startOverlayJourney(fromId, toId, mode, pack);
      }
    });
  });
}
```

- [ ] **Step 2: Gut `beginJourney()` — redirect to `_showPackChoicesInOverlay()`**

`beginJourney(fromId, toId)` currently renders inline pack choices in the story area. Replace its body:

```js
function beginJourney(fromId, toId) {
  _showPackChoicesInOverlay(fromId, toId, G.travelMode || 'foot');
}
```

- [ ] **Step 3: Verify**

Open `play.bat`. Click map → destination → select a mode. Verify pack choice screen appears inside the overlay with the macroregion narration. Verify Heavy triggers a Craft roll (check console). Verify "Continue" is NOT yet wired (clicking a pack button should not crash — `TRAVEL_CORRIDOR.startOverlayJourney` not yet defined).

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(travel): add _showPackChoicesInOverlay(); redirect beginJourney() to overlay"
```

---

## Task 5: Day-leg engine in TRAVEL_CORRIDOR

**Files:**
- Modify: `content/travel_corridors.js` — add `TRAVEL_CORRIDOR.startOverlayJourney()`, `TRAVEL_CORRIDOR.advanceDayLeg()`, `TRAVEL_CORRIDOR._completeJourney()`

Add these three methods to the `window.TRAVEL_CORRIDOR` object (before the closing `};` of the object literal, after `nextEncounter`).

- [ ] **Step 1: Add `startOverlayJourney()` to TRAVEL_CORRIDOR**

```js
startOverlayJourney: function(fromId, toId, mode, pack) {
  // Resolve route data
  var routeKey = fromId + '|' + toId;
  var revKey   = toId   + '|' + fromId;
  var routeEntry = (window.TRAVEL_ROUTES || {})[routeKey]
                || (window.TRAVEL_ROUTES || {})[revKey] || {};
  var spatialData = window.ROUTE_SPATIAL_DATA ? window.ROUTE_SPATIAL_DATA.get(fromId, toId) : null;
  var totalDays = Math.max(1, Math.ceil(routeEntry[mode] || 1));

  // Tier-based encounter count
  var tier = routeEntry.tier || (totalDays <= 2 ? 'short' : totalDays <= 14 ? 'medium' : 'long');
  var baseCount = { short: 1, medium: 2, long: 3 }[tier] || 1;

  // Biome sequence (one biome entry per encounter slot)
  var biomes = spatialData ? spatialData.biomes : [routeEntry.biome || 'plains'];

  // Build encounter schedule: array of day numbers that get an encounter
  var schedule = [];
  for (var i = 0; i < baseCount; i++) {
    var day = Math.max(1, Math.round(totalDays * (i + 1) / (baseCount + 1)));
    var biomeIdx = Math.min(Math.floor(biomes.length * day / totalDays), biomes.length - 1);
    schedule.push({ day: day, biome: biomes[biomeIdx] || 'plains' });
  }

  // Check for OPERATIONAL_ANCHOR on this route
  var anchorDay = null;
  var anchorEntry = null;
  var fromMacro = (window.LOCALITY_MACROREGION || {})[fromId] || 'principalities';
  var toMacro   = (window.LOCALITY_MACROREGION || {})[toId]   || 'principalities';
  if (window.OPERATIONAL_ANCHORS) {
    window.OPERATIONAL_ANCHORS.forEach(function(a) {
      var aMacro = (window.LOCALITY_MACROREGION || {})[a.locality] || '';
      if (aMacro === fromMacro || aMacro === toMacro) {
        // Place anchor at the 60% mark of the journey
        anchorDay   = Math.max(1, Math.round(totalDays * 0.6));
        anchorEntry = a;
      }
    });
  }

  // Apply fatigue
  var paceMod = (window.PACE_MODIFIERS || {})[G.pace || 'normal'] || { fatiguePerDay: 1 };
  G.journeyFatigue = (G.journeyFatigue || 0) + Math.ceil(totalDays * paceMod.fatiguePerDay);
  G.fatigue        = (G.fatigue || 0)        + Math.ceil(totalDays * paceMod.fatiguePerDay * 0.3);

  // Advance time
  if (typeof advanceTime === 'function') advanceTime(totalDays);
  if (typeof updateHUD === 'function') updateHUD();

  // Store journey state
  G.flags._jrn_from       = fromId;
  G.flags._jrn_to         = toId;
  G.flags._jrn_mode       = mode;
  G.flags._jrn_total      = totalDays;
  G.flags._jrn_current    = 0;
  G.flags._jrn_sched      = JSON.stringify(schedule);
  G.flags._jrn_sched_idx  = 0;
  G.flags._jrn_biomes     = biomes.join(',');
  G.flags._jrn_note       = spatialData ? (spatialData.route_note || '') : '';
  G.flags._jrn_anchor_day = anchorDay;
  G.flags._jrn_anchor_id  = anchorEntry ? anchorEntry.id : null;

  // Redirect _travelNextEncounter → advanceDayLeg so existing action functions chain correctly
  window._travelNextEncounter = function() { TRAVEL_CORRIDOR.advanceDayLeg(); };

  TRAVEL_CORRIDOR.advanceDayLeg();
},
```

- [ ] **Step 2: Add `advanceDayLeg()` to TRAVEL_CORRIDOR**

```js
advanceDayLeg: function() {
  if (!G || !G.flags) return;
  var fromId    = G.flags._jrn_from;
  var toId      = G.flags._jrn_to;
  var totalDays = G.flags._jrn_total || 1;
  var current   = (G.flags._jrn_current || 0) + 1;
  var schedule  = JSON.parse(G.flags._jrn_sched || '[]');
  var schedIdx  = G.flags._jrn_sched_idx || 0;
  var biomes    = (G.flags._jrn_biomes || 'plains').split(',');
  var note      = G.flags._jrn_note || '';
  var anchorDay = G.flags._jrn_anchor_day;
  var anchorId  = G.flags._jrn_anchor_id;
  var destLoc   = window.WORLD_LOCATIONS ? window.WORLD_LOCATIONS[toId] : null;
  var destName  = destLoc ? destLoc.name : toId;

  G.flags._jrn_current = current;

  // Journey complete
  if (current > totalDays) {
    TRAVEL_CORRIDOR._completeJourney(toId);
    return;
  }

  // Pick macroregion narration for this day
  var dayFraction = totalDays > 1 ? (current - 1) / (totalDays - 1) : 0;
  var biomeIdx = Math.min(Math.floor(biomes.length * dayFraction), biomes.length - 1);
  var biome = biomes[biomeIdx] || 'plains';
  var fromMacro = (window.LOCALITY_MACROREGION || {})[fromId] || 'principalities';
  var toMacro   = (window.LOCALITY_MACROREGION || {})[toId]   || 'principalities';
  var macro = dayFraction < 0.5 ? fromMacro : toMacro;
  var narrs = (window.MACROREGION_NARRATIONS || {})[macro] || [];
  var ambient = narrs[Math.floor(Math.random() * narrs.length)] || 'The road continues.';

  // Check if this day has a scheduled encounter
  var todayEncounter = schedule[schedIdx] && schedule[schedIdx].day === current;
  // Check if this day has an anchor
  var todayAnchor = anchorDay !== null && anchorDay === current && anchorId;

  var headerHtml = '<div class="journey-day-header">DAY ' + current + ' OF ' + totalDays + ' — ' + destName.toUpperCase() + '</div>';
  var narrationHtml = '<div class="journey-narration">' + ambient + '</div>';
  var noteHtml = note ? '<div class="journey-route-note">' + note + '</div>' : '';
  var choicesHtml = '<div class="journey-choices" id="journey-choice-area"></div>';

  if (typeof _setMapOverlayContent === 'function') {
    _setMapOverlayContent(
      'Day ' + current + ' of ' + totalDays + ' — ' + destName,
      headerHtml + narrationHtml + noteHtml + choicesHtml,
      false
    );
  }

  var choiceArea = document.getElementById('journey-choice-area');
  if (!choiceArea) { TRAVEL_CORRIDOR._completeJourney(toId); return; }

  if (todayAnchor) {
    G.flags._jrn_anchor_day = null; // fire only once
    TRAVEL_CORRIDOR._renderAnchorInOverlay(anchorId, choiceArea);
  } else if (todayEncounter) {
    G.flags._jrn_sched_idx = schedIdx + 1;
    TRAVEL_CORRIDOR._renderEncounterInOverlay(biome, routeTier, choiceArea);
  } else {
    // Non-encounter day — continue button
    var btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = 'Continue on the road.';
    btn.addEventListener('click', function() { TRAVEL_CORRIDOR.advanceDayLeg(); });
    choiceArea.appendChild(btn);
  }

  // Expose routeTier for _renderEncounterInOverlay — resolve from schedule entry
  var routeTier = schedule[schedIdx] ? (schedule[schedIdx].tier || 'medium') : 'medium';
},
```

**Note:** `routeTier` is referenced before it is assigned in the `advanceDayLeg` body above. Fix by hoisting it:

```js
// At the top of advanceDayLeg, after resolving 'schedule':
var routeTier = (window.TRAVEL_ROUTES || {})[fromId+'|'+toId]
             || (window.TRAVEL_ROUTES || {})[toId+'|'+fromId] || {};
routeTier = routeTier.tier || 'medium';
```

- [ ] **Step 3: Add `_completeJourney()` to TRAVEL_CORRIDOR**

```js
_completeJourney: function(toId) {
  // Clear journey state
  ['_jrn_from','_jrn_to','_jrn_mode','_jrn_total','_jrn_current',
   '_jrn_sched','_jrn_sched_idx','_jrn_biomes','_jrn_note',
   '_jrn_anchor_day','_jrn_anchor_id'].forEach(function(k) {
    if (G && G.flags) delete G.flags[k];
  });
  if (G) G.travelMode = null;
  window._travelNextEncounter = null;

  // Close overlay then resolve arrival
  if (typeof closeOverlay === 'function') closeOverlay('overlay-map');
  if (typeof resolveArrival === 'function') {
    setTimeout(function() { resolveArrival(toId); }, 200);
  } else if (typeof loadStageChoices === 'function') {
    setTimeout(function() { loadStageChoices(toId); }, 200);
  }
},
```

- [ ] **Step 4: Verify skeleton works**

`_renderEncounterInOverlay` and `_renderAnchorInOverlay` don't exist yet — they come in Task 6 and 7. For now, add stubs:

```js
_renderEncounterInOverlay: function(biome, tier, choiceArea) {
  var btn = document.createElement('button');
  btn.className = 'choice-btn';
  btn.textContent = '[ENCOUNTER STUB — Task 6]';
  btn.addEventListener('click', function() { TRAVEL_CORRIDOR.advanceDayLeg(); });
  choiceArea.appendChild(btn);
},

_renderAnchorInOverlay: function(anchorId, choiceArea) {
  var btn = document.createElement('button');
  btn.className = 'choice-btn';
  btn.textContent = '[ANCHOR STUB — Task 7]';
  btn.addEventListener('click', function() { TRAVEL_CORRIDOR.advanceDayLeg(); });
  choiceArea.appendChild(btn);
},
```

Open `play.bat`. Travel from any locality to another. Verify:
- Mode select appears in overlay ✓
- Pack choice appears in overlay ✓
- Day counter increments each click ✓
- "Continue on the road" appears for non-encounter days ✓
- Overlay closes and arrival resolves on final day ✓

- [ ] **Step 5: Run headless spec**

```
Set-Location "C:\Users\CEO\ledger-of-ash"; cmd /c "npx playwright test tests/e2e/playtest-headless.spec.js --timeout=1200000 --reporter=line"
```

Expected: 4/4 families pass (harness uses `_travelCoreTravelTo` teleport which bypasses this system — should be unaffected).

- [ ] **Step 6: Commit**

```bash
git add content/travel_corridors.js
git commit -m "feat(travel): add day-leg engine — startOverlayJourney, advanceDayLeg, _completeJourney"
```

---

## Task 6: Encounter rendering inside overlay

**Files:**
- Modify: `content/travel_corridors.js` — replace `_renderEncounterInOverlay()` stub with real implementation; convert all CORRIDOR_ENCOUNTER choices from CID-only to inline `action` functions

The current CORRIDOR_ENCOUNTERS choices mix CID-based choices (no action function) with action-function choices. CID-based choices require the consequence system — which calls `loadStageChoices` at resolution, breaking the day-leg chain. **Convert all CID-only choices to inline action functions.** Each converted choice: rolls dice using `choice.skill` + `choice.tag`, applies a result narrative, calls `window._travelNextEncounter()` at the end.

- [ ] **Step 1: Audit all CID-only choices in CORRIDOR_ENCOUNTERS**

Search `content/travel_corridors.js` for lines matching `cid: 'corridor_` that do NOT have a sibling `action:` on the same choice object. List them. Example CIDs to convert: `corridor_warden_papers`, `corridor_warden_probe`, `corridor_warden_evade`, `corridor_traveler_ignore`, `corridor_traveler_confront`, `corridor_cart_inspect`, `corridor_cart_help`, `corridor_milestone_copy`, `corridor_milestone_pass`.

- [ ] **Step 2: Convert each CID-only choice to an inline action**

Pattern: remove `cid:` field, add `action: function() { ... }`. Each action must:
1. Roll dice: `var r = typeof rollD20 === 'function' ? rollD20(choice.skill) : { total: 10, isCrit: false, isFumble: false };`
2. Compute DC: `var dc = tag === 'bold' ? 16 : tag === 'safe' ? 7 : 13;`
3. `addNarration('', r.total >= dc ? successText : failText);`
4. Apply any effects (gold, XP, materials, heat)
5. `setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else if (typeof loadStageChoices === 'function') loadStageChoices(G.location || ''); }, 500);`

**Example conversion for `ce_short_warden_check`:**

```js
choices: [
  {
    text: 'My papers are in order. She already knows that.',
    skill: 'lore', tag: 'safe', align: 'neutral',
    action: function() {
      var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10, isCrit: false, isFumble: false };
      if (r.total >= 7) {
        addNarration('', 'She reads the papers once, stamps the transit board, and lifts the barrier arm. The warden does not write anything down. You are through before the next traveler reaches the post.');
        if (typeof gainXp === 'function') gainXp(10);
      } else {
        addNarration('', 'The stamp does not come. She asks for a second document — a transit endorsement from the last checkpoint. You do not have one. She steps back to the post shelter and picks up a handset. You wait.');
        addHeat('shelk', 1);
      }
      setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else if (typeof loadStageChoices === 'function') loadStageChoices(G ? G.location : ''); }, 500);
    }
  },
  {
    text: 'Something about her pause does not fit a standard check.',
    skill: 'charm', tag: 'risky', align: 'neutral',
    action: function() {
      var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10, isCrit: false, isFumble: false };
      if (r.total >= 13) {
        addNarration('', 'You ask, casually, whether the route north is still open. It is the kind of question that gives her something to answer instead of a question to ask. She stamps your papers while explaining the northern checkpoint rotation. Both of you know what just happened.');
        if (typeof gainXp === 'function') gainXp(20);
      } else {
        addNarration('', 'The question lands wrong. She stops, looks at you fully for the first time, and asks who referred you to this checkpoint. You name the road. She makes a note.');
        addHeat('shelk', 2);
      }
      setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else if (typeof loadStageChoices === 'function') loadStageChoices(G ? G.location : ''); }, 500);
    }
  },
  {
    text: 'Step aside from the road before she finishes reading.',
    skill: 'finesse', tag: 'risky', align: 'neutral',
    action: function() {
      var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10, isCrit: false, isFumble: false };
      if (r.total >= 13) {
        addNarration('', 'The verge drops below road level on the east side. You take it. She calls out — to the next traveler in line, it turns out — and does not follow. You rejoin the road two posts further on.');
        if (typeof gainXp === 'function') gainXp(15);
      } else {
        addNarration('', 'The movement catches her eye immediately. She steps away from the barrier, one hand on the handset pole. You stop. The conversation you were trying to avoid is now unavoidable, and you are standing in a ditch.');
        addHeat('shelk', 3);
      }
      setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else if (typeof loadStageChoices === 'function') loadStageChoices(G ? G.location : ''); }, 500);
    }
  }
]
```

Apply this pattern to every CID-only choice. Keep all existing `action`-function choices as-is (they already call `_travelNextEncounter`).

- [ ] **Step 3: Replace `_renderEncounterInOverlay()` stub with real implementation**

```js
_renderEncounterInOverlay: function(biome, tier, choiceArea) {
  // Pull from ROUTE_COMPLICATIONS first, then biome pool, then tier pool
  var fromId = G.flags._jrn_from;
  var toId   = G.flags._jrn_to;
  var dayNum = G.flags._jrn_current || 1;
  var totalDays = G.flags._jrn_total || 1;
  var complicationKey = fromId + '|' + toId;
  var revKey = toId + '|' + fromId;
  var complications = (window.ROUTE_COMPLICATIONS || {})[complicationKey]
                   || (window.ROUTE_COMPLICATIONS || {})[revKey];

  var enc = null;

  if (complications) {
    // Pick complication type by day position
    var pct = dayNum / totalDays;
    var compType = pct <= 0.15 ? 'checkpoint'
                 : pct <= 0.5  ? 'patrol'
                 : pct <= 0.75 ? 'night'
                 : 'hazard';
    enc = complications[compType] || null;
    // Mark this type used so it doesn't repeat
    complications['_used_' + compType] = true;
  }

  if (!enc) {
    // Fall back to biome pool + tier pool
    var bPool = (window.TRAVEL_ENCOUNTER_POOLS || {})[biome] || [];
    var tPool = (window.CORRIDOR_ENCOUNTERS || {})[tier] || (window.CORRIDOR_ENCOUNTERS || {})['short'] || [];
    var combined = bPool.concat(tPool).filter(function(e) { return !e._used; });
    if (!combined.length) combined = tPool;
    enc = combined[Math.floor(Math.random() * combined.length)];
    if (enc) enc._used = true;
  }

  if (!enc) {
    // No encounter available — skip day
    TRAVEL_CORRIDOR.advanceDayLeg();
    return;
  }

  // Render encounter text above choice area
  var textDiv = document.createElement('div');
  textDiv.className = 'journey-narration';
  textDiv.style.borderTop = '1px solid var(--char)';
  textDiv.style.paddingTop = '10px';
  textDiv.textContent = enc.text || enc.narration || '';
  choiceArea.parentNode.insertBefore(textDiv, choiceArea);

  // Add encounter label
  var encLabel = document.createElement('div');
  encLabel.className = 'journey-day-header';
  encLabel.style.color = 'var(--blood-bright)';
  encLabel.textContent = (enc.title || 'ENCOUNTER').toUpperCase();
  choiceArea.parentNode.insertBefore(encLabel, textDiv);

  // Build choice buttons
  var choices = enc.choices || [];
  choices.forEach(function(choice) {
    var btn = document.createElement('button');
    btn.className = 'choice-btn';
    var tagLabel = choice.tag === 'bold' ? ' · Bold' : choice.tag === 'safe' ? ' · Safe' : ' · Risky';
    btn.innerHTML = choice.text
      + (choice.skill ? '<br><span style="font-size:11px;color:var(--ink-dim)">' + choice.skill + tagLabel + '</span>' : '');
    btn.addEventListener('click', function() {
      // Disable all buttons on click
      choiceArea.querySelectorAll('button').forEach(function(b) { b.disabled = true; });
      if (typeof choice.action === 'function') {
        choice.action();
        // action() calls _travelNextEncounter() → advanceDayLeg() internally
      } else {
        // Inline roll fallback for choices without action
        var r = typeof rollD20 === 'function' ? rollD20(choice.skill || 'wits') : { total: 12, isCrit: false, isFumble: false };
        var dc = choice.tag === 'bold' ? 16 : choice.tag === 'safe' ? 7 : 13;
        var resultText = r.total >= dc ? (choice.successResult || 'You proceed.') : (choice.failResult || 'The road resists.');
        if (typeof addNarration === 'function') addNarration('', resultText);
        setTimeout(function() { TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
      }
    });
    choiceArea.appendChild(btn);
  });
},
```

- [ ] **Step 4: Verify encounter flow**

Open `play.bat`. Travel a long route (e.g., shelkopolis → fairhaven — 52 days on foot). With 3 encounters scheduled, you should see:
- Day 1 → Continue
- Day ~13 → [ENCOUNTER label + encounter text + choices]
- Selecting choice → narration appears in story area → next day loads in overlay
- Day 26 → another encounter
- ...
- Day 52 → arrival, overlay closes, `resolveArrival()` fires

- [ ] **Step 5: Run headless spec again**

```
Set-Location "C:\Users\CEO\ledger-of-ash"; cmd /c "npx playwright test tests/e2e/playtest-headless.spec.js --timeout=1200000 --reporter=line"
```

Expected: 4/4 PASS.

- [ ] **Step 6: Commit**

```bash
git add content/travel_corridors.js
git commit -m "feat(travel): implement _renderEncounterInOverlay; convert CID-only CORRIDOR_ENCOUNTERS to inline actions"
```

---

## Task 7: Wire OPERATIONAL_ANCHORS as rest stops

**Files:**
- Modify: `content/travel_corridors.js` — replace `_renderAnchorInOverlay()` stub with real implementation

`OPERATIONAL_ANCHORS` are authored with `locality`, `name`, `desc`, and `choices` (already has `action: undefined` — choices only have CIDs currently; convert them to inline actions here).

- [ ] **Step 1: Convert OPERATIONAL_ANCHOR choice CIDs to inline actions**

Each anchor has 2 choices: a rest choice and a push-on choice. Convert:

**Rest choice pattern** (`anchor_make_camp_*`):
```js
action: function() {
  var heal = Math.min(4, (G.maxHp || 14) - (G.hp || 14));
  if (heal > 0) { if (typeof modHP === 'function') modHP(heal); }
  G.fatigue = Math.max(0, (G.fatigue || 0) - 2);
  G.journeyFatigue = Math.max(0, (G.journeyFatigue || 0) - 3);
  if (typeof addJournal === 'function') addJournal('You made camp at ' + anchorEntry.name + '. The rest helped.', 'field_note');
  if (typeof addNarration === 'function') addNarration('', 'You rest here for the night. The fatigue lifts slightly. The road tomorrow will be what it is.');
  setTimeout(function() { TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
}
```

**Push-on choice pattern** (`anchor_push_on_*`):
```js
action: function() {
  if (typeof gainXp === 'function') gainXp(15);
  if (typeof addNarration === 'function') addNarration('', 'You move on. The decision costs you nothing now. The road ahead will decide whether it was correct.');
  setTimeout(function() { TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
}
```

Apply to all 4 anchors (fairhaven, soreheim, sheresh, psanan).

- [ ] **Step 2: Replace `_renderAnchorInOverlay()` stub**

```js
_renderAnchorInOverlay: function(anchorId, choiceArea) {
  var anchor = null;
  if (window.OPERATIONAL_ANCHORS) {
    window.OPERATIONAL_ANCHORS.forEach(function(a) { if (a.id === anchorId) anchor = a; });
  }
  if (!anchor) { TRAVEL_CORRIDOR.advanceDayLeg(); return; }

  // Render anchor description
  var descDiv = document.createElement('div');
  descDiv.className = 'journey-narration';
  descDiv.style.borderTop = '1px solid var(--char)';
  descDiv.style.paddingTop = '10px';
  descDiv.textContent = anchor.desc || '';
  choiceArea.parentNode.insertBefore(descDiv, choiceArea);

  var nameLabel = document.createElement('div');
  nameLabel.className = 'journey-day-header';
  nameLabel.style.color = 'var(--jade-bright)';
  nameLabel.textContent = anchor.name.toUpperCase();
  choiceArea.parentNode.insertBefore(nameLabel, descDiv);

  // Build anchor choice buttons
  var choices = anchor.choices || [];
  choices.forEach(function(choice) {
    var btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice.text;
    btn.addEventListener('click', function() {
      choiceArea.querySelectorAll('button').forEach(function(b) { b.disabled = true; });
      if (typeof choice.action === 'function') {
        choice.action();
      } else {
        TRAVEL_CORRIDOR.advanceDayLeg();
      }
    });
    choiceArea.appendChild(btn);
  });
},
```

- [ ] **Step 3: Verify**

Travel a route whose macroregion matches an anchor (e.g., shelkopolis → fairhaven → anchor fires at ~60% mark → day 31 of 52 shows Fairhaven East Waystation with rest/push-on choices).

- [ ] **Step 4: Commit**

```bash
git add content/travel_corridors.js
git commit -m "feat(travel): wire OPERATIONAL_ANCHORS as mid-journey rest stops in overlay"
```

---

## Task 8: Author ROUTE_COMPLICATIONS for Stage I/II routes

**Files:**
- Modify: `content/travel_corridors.js` — add `window.ROUTE_COMPLICATIONS` object

`ROUTE_COMPLICATIONS` is keyed by `'from_id|to_id'` (canonical order). Each entry has 4 complication types: `checkpoint`, `patrol`, `night`, `hazard`. Each complication: `{ title, text, choices: [{text, skill, tag, action}] }`. Choices use inline `action` functions — no CIDs.

**Action function template for all complication choices:**
```js
action: function() {
  var r = typeof rollD20 === 'function' ? rollD20('SKILL') : { total: 10, isCrit: false, isFumble: false };
  var dc = TAG === 'bold' ? 16 : TAG === 'safe' ? 7 : 13;
  if (r.total >= dc) {
    if (typeof addNarration === 'function') addNarration('', 'SUCCESS_TEXT');
    if (typeof gainXp === 'function') gainXp(XP_AMT);
    // optional: addMaterial, modGold, addJournal
  } else {
    if (typeof addNarration === 'function') addNarration('', 'FAIL_TEXT');
    // optional: addHeat, modHP, G.fatigue++
  }
  setTimeout(function() {
    if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
    else TRAVEL_CORRIDOR.advanceDayLeg();
  }, 500);
}
```

- [ ] **Step 1: Add `window.ROUTE_COMPLICATIONS = {}` after OPERATIONAL_ANCHORS block**

- [ ] **Step 2: Author `'shelkopolis|fairhaven'` complications (Shelkopolis Road)**

```js
window.ROUTE_COMPLICATIONS['shelkopolis|fairhaven'] = {
  checkpoint: {
    title: 'Shelk Transit Checkpoint',
    text: 'A grey-and-white checkpoint barrier at the road edge. The warden on duty is running a manifest comparison against a sealed board — cargo weights, passenger names, departure stamps. The warden\'s pen has been tapping the board at irregular intervals. She looks up when you reach the barrier arm.',
    choices: [
      {
        text: 'Offer papers before she asks.',
        skill: 'wits', tag: 'safe',
        action: function() {
          var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
          if (r.total >= 7) {
            addNarration('', 'Papers first. She checks, stamps, lifts the arm. The efficiency of it is what she notes — you are the third traveler today who did not make her ask.');
            if (typeof gainXp === 'function') gainXp(10);
          } else {
            addNarration('', 'The papers are in order but she finds a discrepancy in the departure stamp — the day is correct, the hour is not. She writes something. You are through, but the note goes somewhere.');
            if (typeof addHeat === 'function') addHeat('shelk', 1);
          }
          setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
        }
      },
      {
        text: 'Name the intermediary who handled the transit authorization.',
        skill: 'charm', tag: 'risky',
        action: function() {
          var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
          if (r.total >= 13) {
            addNarration('', 'The name works. She knows it — the warden relaxes by one degree, which in Shelk transit terms means she stops tapping her pen. The barrier arm goes up.');
            if (typeof gainXp === 'function') gainXp(20);
          } else {
            addNarration('', 'The name does not land the way you expected. She asks a follow-up question about the authorization office location. You guess wrong. The note she writes is longer this time.');
            if (typeof addHeat === 'function') addHeat('shelk', 2);
          }
          setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
        }
      }
    ]
  },
  patrol: {
    title: 'Shelk Road Patrol',
    text: 'A two-warden patrol coming the opposite direction — mounted, grey cloaks — moving at a pace that is not urgent but is not leisure. One warden is watching the road verge. The other is watching travelers. They have not signaled a stop yet, but the one watching travelers has noted you.',
    choices: [
      {
        text: 'Keep pace. Looking like you belong is the simplest answer.',
        skill: 'charm', tag: 'safe',
        action: function() {
          var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
          if (r.total >= 7) {
            addNarration('', 'The mounted warden\'s gaze moves past you to the cart behind. Keeping pace and posture turned out to be the right calculation. They continue south. You continue north.');
            if (typeof gainXp === 'function') gainXp(10);
          } else {
            addNarration('', 'The patrol stops ten meters past you, turns, and calls you back. The mounted warden asks where you are coming from and going to, in that order. The answer matters less than how long it takes you to give it.');
            if (typeof addHeat === 'function') addHeat('shelk', 1);
          }
          setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
        }
      },
      {
        text: 'Step into the verge before they pass. Less visible, less memorable.',
        skill: 'finesse', tag: 'risky',
        action: function() {
          var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
          if (r.total >= 13) {
            addNarration('', 'The verge is lower than the road by half a meter. You descend without stumbling. The wardens pass. Neither looks down.');
            if (typeof gainXp === 'function') gainXp(15);
          } else {
            addNarration('', 'The movement is too deliberate. The road-watching warden\'s head turns. He does not stop immediately — that is what concerns you more than if he had.');
            if (typeof addHeat === 'function') addHeat('shelk', 2);
          }
          setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
        }
      }
    ]
  },
  night: {
    title: 'After Sunset on the Shelkopolis Road',
    text: 'The posted curfew for non-cargo travel on the Shelkopolis road is two hours after sunset. You are still moving. The road is not empty — a light cart ahead, someone on horseback behind — but the checkpoint interval has not closed for the night yet and the warden at the marker post ahead is noting who is still on the road.',
    choices: [
      {
        text: 'Move to the camp ground adjacent to the checkpoint. The road can wait until first light.',
        skill: 'vigor', tag: 'safe',
        action: function() {
          var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
          if (r.total >= 7) {
            addNarration('', 'The campground is staked and fire-pitted. Three other travelers are already there. The warden notes your arrival but does not question it — you made the right call before the right moment.');
            G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
            if (typeof gainXp === 'function') gainXp(10);
          } else {
            addNarration('', 'The campground is full. The warden directs you to the overflow area, which is a field with no fire pit. The rest is adequate but not comfortable.');
          }
          setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
        }
      },
      {
        text: 'The checkpoint will not close for another hour. Press through.',
        skill: 'wits', tag: 'risky',
        action: function() {
          var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
          if (r.total >= 13) {
            addNarration('', 'The checkpoint is still open. The warden marks your transit and waves you through. The road ahead is darker but passable.');
            if (typeof gainXp === 'function') gainXp(20);
          } else {
            addNarration('', 'The checkpoint closes fifteen minutes before you reach it. The warden is already inside. The sealed arm is down. You camp at the barrier and wait for first light.');
            G.fatigue = (G.fatigue || 0) + 1;
          }
          setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
        }
      }
    ]
  },
  hazard: {
    title: 'Inspection Pressure on the Shelkopolis Road',
    text: 'A freight inspection point has been set up at a wide section of the road — temporary barriers, three wardens, a scale for weighing cargo. They are checking everything, not sampling. The line of travelers ahead is short but moving slowly. A warden at the edge of the inspection area is watching people decide whether to join the line.',
    choices: [
      {
        text: 'Join the line. What you\'re carrying will pass a standard inspection.',
        skill: 'wits', tag: 'safe',
        action: function() {
          var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
          if (r.total >= 7) {
            addNarration('', 'Thirty minutes in the line. The inspection is thorough but procedural. You pass. The warden stamps your manifest and releases you.');
            if (typeof gainXp === 'function') gainXp(10);
          } else {
            addNarration('', 'The inspection finds something irregular — not contraband, but a documentation gap. The warden pulls you to the secondary area. The delay costs half a day.');
            if (typeof advanceTime === 'function') advanceTime(0.5);
            if (typeof addHeat === 'function') addHeat('shelk', 1);
          }
          setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
        }
      },
      {
        text: 'The road verge goes around this section. Use it.',
        skill: 'finesse', tag: 'bold',
        action: function() {
          var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
          if (r.total >= 16) {
            addNarration('', 'The verge bypass is unmarked but passable. The warden at the edge of the inspection area watches you move but does not call out. You rejoin the road fifty meters past the checkpoint.');
            if (typeof gainXp === 'function') gainXp(25);
          } else {
            addNarration('', 'The warden at the edge calls out before you have cleared the inspection zone. You stop. The secondary area is worse than the line would have been.');
            if (typeof addHeat === 'function') addHeat('shelk', 3);
          }
          setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
        }
      }
    ]
  }
};
```

- [ ] **Step 3: Author the remaining 12 routes**

Apply the same structure to each remaining route. Use the matching `_travel_complications/` .md file as the thematic seed for each complication type. Routes to author:

1. `'shelkopolis|aurora_crown_commune'` — Whitebridge Domeway (dome authority, cold, isolation, magic law)
2. `'shelkopolis|cosmoria'` — Brineland harbor ring (coastal, cargo manifests, harbor inspection)
3. `'guildheart_hub|fairhaven'` — Guild plains road (guild seals, commercial transit, rumor traffic)
4. `'guildheart_hub|ithtananalor'` — Forest road (limited visibility, pair patrols, wildlife pressure)
5. `'guildheart_hub|soreheim_proper'` — Craftspire corridor (quota authority, extraction pressure, giant scale)
6. `'guildheart_hub|mimolot_academy'` — Mimolot plains (academy-sealed cargo, quiet road, book tax)
7. `'soreheim_proper|sunspire_haven'` — Soreheim highland (quota transit, altitude, allocation posts)
8. `'panim_haven|shirshal'` — Panim-Shirshal coastal (contested patrol, jurisdictional ambiguity)
9. `'shirshal|ithtananalor'` — Unmaintained forest road (no authority, structural decay, wildlife)
10. `'mimolot_academy|ithtananalor'` — Academy forest road (sealed cargo, search pressure)
11. `'amber_fountain_inn|fairhaven'` — Amber Tides river (port authorization, manifest, river hazard)
12. `'cosmoria|brineland'` — Sea passage (seasonal storm, port inspection, cargo weight)

Each route needs exactly 4 complication objects (`checkpoint`, `patrol`, `night`, `hazard`) matching the template in Step 2. Use the thematic identity of the polity/biome: Shelk = procedural road authority; Soreheim = quota/allocation; Sheresh = dome authority/cold; Psanan = ash/forge; Sea routes = port/storm/manifest.

- [ ] **Step 4: Verify a route complication fires**

Travel shelkopolis → fairhaven on foot. Day 1 should show a checkpoint complication (from `ROUTE_COMPLICATIONS['shelkopolis|fairhaven'].checkpoint`). Verify the choice text appears in the overlay, the roll fires, and narration appears in the story area.

- [ ] **Step 5: Run headless spec**

```
Set-Location "C:\Users\CEO\ledger-of-ash"; cmd /c "npx playwright test tests/e2e/playtest-headless.spec.js --timeout=1200000 --reporter=line"
```

Expected: 4/4 PASS.

- [ ] **Step 6: Commit**

```bash
git add content/travel_corridors.js
git commit -m "feat(travel): add ROUTE_COMPLICATIONS for all 13 Stage I/II routes (checkpoint/patrol/night/hazard per route)"
```

---

## Self-Review

**1. Spec coverage check:**

| Requirement | Task |
|---|---|
| All travel through overlay | T3 — travelTo() → _showModeSelectInOverlay() |
| Mode select in overlay | T3 |
| Pack choices in overlay | T4 |
| Day-by-day legs | T5 — advanceDayLeg() |
| Encounters between legs | T6 — _renderEncounterInOverlay() |
| 1 encounter per day-block | T5 — schedule array |
| Biome per day based on spatial data | T5 — biomeIdx from ROUTE_SPATIAL_DATA.biomes[] |
| In-route localities (anchors) | T7 |
| Route complications from .md seeds | T8 |
| Spatial intelligence integration | T1 — ROUTE_SPATIAL_DATA from zip |

All requirements covered. ✓

**2. Placeholder check:** No TBD, no "add appropriate…", no "similar to Task N". Step 3 of Task 8 says "apply same structure" — this is intentional scope note for 12 routes, not a placeholder (the template is fully specified in Step 2).

**3. Type consistency check:**
- `_setMapOverlayContent(titleHtml, bodyHtml, showClose)` — consistent across T2, T3, T4, T5 ✓
- `TRAVEL_CORRIDOR.startOverlayJourney(fromId, toId, mode, pack)` — called in T4, defined in T5 ✓
- `TRAVEL_CORRIDOR.advanceDayLeg()` — called in T5, T6, T7 (as setTimeout target) ✓
- `TRAVEL_CORRIDOR._completeJourney(toId)` — called in T5, defined in T5 ✓
- `TRAVEL_CORRIDOR._renderEncounterInOverlay(biome, tier, choiceArea)` — stub in T5, implemented in T6; signature consistent ✓
- `TRAVEL_CORRIDOR._renderAnchorInOverlay(anchorId, choiceArea)` — stub in T5, implemented in T7; signature consistent ✓
- `G.flags._jrn_*` keys — declared in T5.startOverlayJourney, read in T5.advanceDayLeg ✓
- `window._travelNextEncounter` — set in T5.startOverlayJourney, called by T6/T8 action functions ✓
- `ROUTE_COMPLICATIONS` keying — `'from|to'` in T5._renderEncounterInOverlay and T8 authoring ✓

All consistent. ✓
