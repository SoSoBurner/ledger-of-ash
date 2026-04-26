# Stage 1 & 2 Release Tightening — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to execute task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tighten the Stage 1 & 2 release by fixing bugs in existing systems, connecting already-built mechanics that are unwired, filling shop/gear gaps, wiring 4 sideplots into gameplay with macroregion combat, and auditing prose/labels for quality — no new mechanics or branches.

**Architecture:** Single-file game (`ledger-of-ash.html`) + `content/` JS files loaded via `<script>` tags. `G` is module-scope `let` — never `window.G`. All changes are additive or connective: fix bugs, wire loose ends, expand content pools.

**Test baseline:** `npx jest` 78/78 pass. `node tests/content/validate-content.js` ≤838 violations. Both must hold after every task.

---

## Phase 0 — Critical Bug Fixes

### Task 0.1 — Antechamber rollD20 invalid skill key

**File:** `content/stage2_antechamber.js`

**Bug:** `window.rollD20('investigation')` — `'investigation'` is not a valid skill key. Valid keys: combat, stealth, survival, lore, persuasion, craft. Causes silent failure (returns NaN roll), making the antechamber DC check unreliable.

- [ ] Grep `rollD20` in `stage2_antechamber.js` to find all occurrences
- [ ] Replace every `rollD20('investigation')` with `rollD20('lore')`
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: antechamber rollD20 invalid skill key investigation → lore`

---

### Task 0.2 — SKILL_LABELS Combat/Might mismatch

**File:** `ledger-of-ash.html`

**Bug:** Two SKILL_LABELS definitions exist. Line ~12235 has `{combat:'Combat'}` (wrong — raw key shown to player). Line ~13357 has `{combat:'Might'}` (correct). The wrong one renders in one of the two skill display paths, showing "Combat" instead of "Might" in HUD or character sheet.

- [ ] Grep `SKILL_LABELS` to find both definition sites
- [ ] At the line ~12235 definition, change `combat: 'Combat'` to `combat: 'Might'`
- [ ] Verify both definitions now read: `{combat:'Might', stealth:'Finesse', survival:'Vigor', lore:'Wits', persuasion:'Charm', craft:'Spirit'}`
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: SKILL_LABELS combat→Might in secondary HUD definition`

---

### Task 0.3 — Trait reset on rest (all non-passive traits)

**File:** `ledger-of-ash.html`

**Bug:** `doSleepScene()` resets only `G.traits[0].used = false` (index 0 only). Active and investigation traits at any other index remain locked for the rest of the run, making them one-time-use for the entire playthrough instead of once per scene/rest.

- [ ] Grep `G.traits\[0\].used` to find the reset line in `doSleepScene()`
- [ ] Replace the single-index reset with a loop that resets all non-passive traits:

```javascript
// Reset all active and investigation traits on rest
if (G.traits) {
  G.traits.forEach(function(t) {
    if (t.traitType !== 'passive') t.used = false;
  });
}
```

- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: trait reset on rest covers all active/investigation traits not just index 0`

---

### Task 0.4 — Wire scope_reveal.trigger() and SHADOW_LEDGER_HINTS.checkAndFire()

**File:** `ledger-of-ash.html`

**Bug:** Both `content/scope_reveal.js` and `content/shadow_ledger_hints.js` are loaded via `<script>` tags but their trigger functions are never called from game logic. `SCOPE_REVEAL.trigger()` needs to fire from `checkStageAdvance()` when `investigationProgress >= 5`. `SHADOW_LEDGER_HINTS.checkAndFire()` needs to fire from `advanceTime()` after every clock increment.

- [ ] Grep `checkStageAdvance` to find the function body. Add near the top, before the stage-advance checks:
```javascript
if (typeof SCOPE_REVEAL !== 'undefined' && SCOPE_REVEAL.trigger) SCOPE_REVEAL.trigger();
```
- [ ] Grep `advanceTime` to find the function body. At the end, after clock updates:
```javascript
if (typeof SHADOW_LEDGER_HINTS !== 'undefined' && SHADOW_LEDGER_HINTS.checkAndFire) SHADOW_LEDGER_HINTS.checkAndFire();
```
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: wire SCOPE_REVEAL.trigger() in checkStageAdvance + SHADOW_LEDGER_HINTS.checkAndFire() in advanceTime`

---

### Task 0.5 — corridor_encounters_enabled set at game start

**File:** `ledger-of-ash.html`

**Bug:** `corridor_encounters_enabled` is referenced as a gate in `travel_corridors.js` but never set to `true` anywhere. All travel corridor encounters (combat and narrative) are permanently disabled.

- [ ] Grep `corridor_encounters_enabled` to confirm the gate location in `travel_corridors.js` and that it is never set
- [ ] In `beginLegend()` (or wherever `G` is initialized and `startOpeningScene()` is called), add:
```javascript
G.flags.corridor_encounters_enabled = true;
```
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: corridor_encounters_enabled set at game start — travel encounters now fire`

---

## Phase 1 — HUD Improvements

### Task 1.1 — Watchfulness + heat as skill-bar-track bars above stats panel

**File:** `ledger-of-ash.html`

**Context:** `#hud-watchfulness` and `#hud-heat` are plain text divs in `.l-vitals`. The skill bars in `.l-skills` use `.skill-bar-track` / `.skill-bar-fill` with CSS custom property fill widths. User wants watchfulness and heat displayed as bar-track style bars, above the stats (`.l-skills`) panel, only when values > 0.

The HUD left column order (top to bottom): `.l-vitals` (HP bar, status) → NEW: pressure bars → `.l-skills` (skill bars).

- [ ] Add CSS classes for the pressure bars. Insert in `<style>` near `.skill-bar-track`:

```css
/* Pressure bars — watchfulness and heat */
.pressure-bars { padding: 0 14px 8px; display: none; }
.pressure-bars.has-values { display: block; }
.pressure-bar-row { margin-bottom: 6px; }
.pressure-bar-label {
  font-family: var(--font-display); font-size: 8px; letter-spacing: 2px;
  text-transform: uppercase; color: var(--ink-faint);
  display: flex; justify-content: space-between; margin-bottom: 3px;
}
.pressure-bar-label .pbar-val { color: var(--ink); }
.pressure-bar-track {
  height: 6px;
  background: rgba(0,0,0,.55);
  border-radius: 3px; overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0,0,0,.6), 0 0 0 1px rgba(0,0,0,.4);
}
.pressure-bar-fill {
  height: 100%; border-radius: 3px; transition: width .4s ease;
}
.pressure-bar-fill.watchfulness-fill {
  background: linear-gradient(90deg, var(--danger) 0%, var(--blood-bright) 100%);
  box-shadow: 0 0 6px rgba(190,40,40,.4);
}
.pressure-bar-fill.heat-fill {
  background: linear-gradient(90deg, #7a3010 0%, #c85020 100%);
  box-shadow: 0 0 6px rgba(200,80,16,.4);
}
```

- [ ] In the HUD HTML, replace (or supplement) the `#hud-watchfulness` and `#hud-heat` divs. Add a `<div class="pressure-bars" id="hud-pressure-bars">` section just before `.l-skills`:

```html
<div class="pressure-bars" id="hud-pressure-bars">
  <div class="pressure-bar-row" id="hud-watch-row" style="display:none">
    <div class="pressure-bar-label">
      <span>WATCHFULNESS</span><span class="pbar-val" id="hud-watch-val">0</span>
    </div>
    <div class="pressure-bar-track">
      <div class="pressure-bar-fill watchfulness-fill" id="hud-watch-fill" style="width:0%"></div>
    </div>
  </div>
  <div class="pressure-bar-row" id="hud-heat-row" style="display:none">
    <div class="pressure-bar-label">
      <span>HEAT</span><span class="pbar-val" id="hud-heat-val">0</span>
    </div>
    <div class="pressure-bar-track">
      <div class="pressure-bar-fill heat-fill" id="hud-heat-fill" style="width:0%"></div>
    </div>
  </div>
</div>
```

- [ ] In `updateHUD()`, add pressure bar update logic:

```javascript
// Pressure bars
var _watch = (G.worldClocks && G.worldClocks.watchfulness) || 0;
var _maxHeat = 0;
if (G.heat) Object.values(G.heat).forEach(function(v){ if(v>_maxHeat) _maxHeat=v; });
var _watchRow = document.getElementById('hud-watch-row');
var _heatRow = document.getElementById('hud-heat-row');
var _pBars = document.getElementById('hud-pressure-bars');
if (_watchRow) { _watchRow.style.display = _watch > 0 ? '' : 'none'; }
if (document.getElementById('hud-watch-val')) document.getElementById('hud-watch-val').textContent = _watch;
if (document.getElementById('hud-watch-fill')) document.getElementById('hud-watch-fill').style.width = Math.min(100, _watch*10) + '%';
if (_heatRow) { _heatRow.style.display = _maxHeat > 0 ? '' : 'none'; }
if (document.getElementById('hud-heat-val')) document.getElementById('hud-heat-val').textContent = _maxHeat;
if (document.getElementById('hud-heat-fill')) document.getElementById('hud-heat-fill').style.width = Math.min(100, _maxHeat*10) + '%';
if (_pBars) _pBars.classList.toggle('has-values', _watch > 0 || _maxHeat > 0);
```

- [ ] Mirror both values in `renderCharacterSheet()` — same div-based approach, shown only when > 0
- [ ] Remove old plain-text `#hud-watchfulness` and `#hud-heat` divs (or hide them) to avoid duplication
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: watchfulness + heat as pressure bar tracks above stats panel`

---

### Task 1.2 — Consumable count indicator in tactical UI

**File:** `ledger-of-ash.html`

**Context:** When player has ≥1 consumable in inventory, a count badge should appear in the tactical/HUD area to signal that consumables are available to use. This requires identifying consumables by `type: 'consumable'` in `G.inventory`.

- [ ] In `updateHUD()`, count consumables in inventory:

```javascript
var _consumCount = (G.inventory || []).filter(function(i){ return i.type === 'consumable'; }).length;
var _consumEl = document.getElementById('hud-consumable-count');
if (_consumEl) {
  _consumEl.textContent = _consumCount > 0 ? _consumCount + ' CONSUMABLE' + (_consumCount > 1 ? 'S' : '') : '';
  _consumEl.style.display = _consumCount > 0 ? '' : 'none';
}
```

- [ ] Add `<div id="hud-consumable-count" class="stat-val" style="display:none;color:var(--jade-bright);font-size:10px;"></div>` in `.l-vitals-footer` area
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: consumable count badge in HUD when inventory has consumables`

---

### Task 1.3 — Equipment bonus label in HUD

**File:** `ledger-of-ash.html`

**Context:** The `eqBonus` is calculated at roll time from `G.equipped` slots but never displayed. Players don't know their equipped item is affecting rolls. A compact summary in the character sheet (not main HUD — too noisy) shows active equipment bonuses.

- [ ] In `renderCharacterSheet()`, after skill bars, add an "Equipment" section that lists equipped items and their `skillBonus`/`bonus` values:

```javascript
// Equipment summary
var eqLines = [];
['weapon','armor','tool'].forEach(function(slot) {
  var item = G.equipped && G.equipped[slot];
  if (item && item.bonus > 0) {
    var label = {combat:'Might',stealth:'Finesse',survival:'Vigor',lore:'Wits',persuasion:'Charm',craft:'Spirit'}[item.skillBonus] || item.skillBonus;
    eqLines.push('<div class="eq-summary-row"><span class="eq-name">' + item.name + '</span><span class="eq-bonus">+' + item.bonus + ' ' + label + '</span></div>');
  }
});
if (eqLines.length) {
  // Insert the HTML block into the character sheet panel after skill bars
}
```

- [ ] Add matching CSS for `.eq-summary-row`, `.eq-name`, `.eq-bonus` (small, Cinzel display font, faint colors)
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: equipment bonus summary in character sheet`

---

## Phase 2 — Choice System Wiring

### Task 2.1 — Safe/risky/bold classification fix (semantic tag mapping)

**File:** `ledger-of-ash.html`

**Bug:** All Stage 1 enriched choices use semantic tag arrays (`['Investigation','NPC','Maritime']`) that don't match `BOLD_TAGS`/`SAFE_TAGS` — they all silently default to `'risky'` (red). Players see every enriched choice as high-risk regardless of intent.

- [ ] Grep `BOLD_TAGS` and `SAFE_TAGS` to find their definition arrays
- [ ] Add semantic tags to `SAFE_TAGS`:
```javascript
// Add to SAFE_TAGS array:
'Investigation', 'NPC', 'Social', 'Lore', 'Maritime', 'Archive', 'Observation', 'Rumor', 'Contact'
```
- [ ] Add semantic tags to `BOLD_TAGS`:
```javascript
// Add to BOLD_TAGS array:
'Confrontation', 'Accusation', 'Exposure', 'Betrayal', 'Tribunal', 'Ambush'
```
- [ ] Add scalar override: in the classification function, before semantic lookup, check if `choice.tag` is a string (`'safe'`/`'risky'`/`'bold'`) and return it directly:
```javascript
if (typeof choice.tag === 'string' && ['safe','risky','bold'].includes(choice.tag)) return choice.tag;
```
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: safe/risky/bold classification — semantic tag mapping + scalar override`

---

### Task 2.2 — prioritizeChoices() wired into loadStageChoices()

**File:** `ledger-of-ash.html`

**Bug:** `prioritizeChoices()` function exists at line ~9729 and sorts choices by priority tier (main:1/side:2/enriched:3/utility:4), capping at 5. But `loadStageChoices()` never calls it — 73 of 75 `renderChoices()` call sites bypass the priority cap entirely.

- [ ] Grep `function prioritizeChoices` to confirm it exists and find its signature
- [ ] In `loadStageChoices()`, find where the final `choices` array is assembled before `renderChoices()` or `(window._rawRenderChoices || window.renderChoices)(choices)` is called. Wrap the call:
```javascript
var _prioritized = (typeof prioritizeChoices === 'function') ? prioritizeChoices(choices) : choices;
(window._rawRenderChoices || window.renderChoices)(_prioritized);
```
- [ ] Verify `prioritizeChoices` returns at most 5 items and that the priority ordering preserves `plot:'main'` choices at index 0
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: prioritizeChoices() wired into loadStageChoices() — 5-choice cap enforced`

---

## Phase 3 — Tutorial

### Task 3.1 — 5th tutorial page: Camp & Recovery

**File:** `ledger-of-ash.html`

**Context:** `showOnboarding()` builds pages via `_buildOnboardingPages()`. Currently 4 pages. Add a 5th page covering: camp actions, rest to recover HP, lay_low to reduce watchfulness, trait reset on rest, and what the skill bars mean in camp context.

- [ ] Grep `_buildOnboardingPages` to find the pages array
- [ ] Add page 5 to the array:

```javascript
{
  title: 'Camp & Recovery',
  body: 'When you make camp, you can rest to recover HP, lay low to reduce watchfulness, or craft if your archetype allows it. Resting also resets your active abilities — they cost nothing to use, but only once between rests. The pressure bars above your skills (watchfulness and heat) tell you how exposed you are. Both can be reduced by careful play. High watchfulness means more scrutiny on your choices. Heat is per-polity — earned through confrontation, drained by caution.'
}
```

- [ ] Verify Skip/Next navigation works with 5 pages (the page index must handle the new count)
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: 5th tutorial page — camp and recovery mechanics`

---

## Phase 4 — Full Shop Buildout

### Task 4.1 — Add shops for all Stage 1/2 localities missing from SHOP_INVENTORY

**File:** `ledger-of-ash.html`

**Context:** `SHOP_INVENTORY` currently has only `shelkopolis` as a locality key. All other Stage 1 and Stage 2 localities have no shop data, making `openShop()` a dead end in most localities.

Shops use this item format:
```javascript
{ id: 'item_id', name: 'Display Name', desc: 'Flavor line.', cost: 20, type: 'consumable'|'weapon'|'armor'|'tool', skillBonus: 'skill_key', bonus: 1 }
```

Each locality shop needs minimum 3 items, canonically appropriate to the polity and setting. Consumables have `healAmount` for healing items.

- [ ] For each locality below, add a key to `SHOP_INVENTORY` with 3–5 items. Use canonical flavor from BESTIARY_LOOKUP and locality character. Minimum items per locality:

**fairhaven** (aurora meadows, volcanic coast, Road Wardens adjacent):
```javascript
fairhaven: [
  { id: 'warden_travel_ration', name: 'Road Warden Ration Pack', desc: 'Dense, efficient. The Wardens know how to eat on the move.', cost: 12, type: 'consumable', healAmount: 8 },
  { id: 'transit_map', name: 'Fairhaven Transit Map', desc: 'Current checkpoint positions, marked in warden shorthand.', cost: 18, type: 'tool', skillBonus: 'survival', bonus: 1 },
  { id: 'iron_accord_clasp', name: 'Iron Accord Travel Clasp', desc: 'Opens checkpoints with less delay. Persuasion for transit only.', cost: 30, type: 'tool', skillBonus: 'persuasion', bonus: 1 }
]
```

**soreheim_proper** (industrial plains, giant council territory):
```javascript
soreheim_proper: [
  { id: 'quarry_brace', name: 'Quarry Work Brace', desc: 'Reinforced. Made for labor, useful in a fight.', cost: 25, type: 'armor', skillBonus: 'survival', bonus: 1 },
  { id: 'giant_labor_stim', name: 'Labor Stimulant', desc: 'Keeps you working through pain. Clears a wound penalty for one scene.', cost: 20, type: 'consumable', healAmount: 12 },
  { id: 'iron_ledger_strip', name: 'Iron Ledger Strip', desc: 'Used by the council to verify accounts. Lore for institutional records.', cost: 22, type: 'tool', skillBonus: 'lore', bonus: 1 }
]
```

**cosmoria** (harbor ring, maritime, Cosmouth archives):
```javascript
cosmoria: [
  { id: 'harbor_lantern', name: 'Harbor Lantern', desc: 'Low-profile. For work at the waterline when the torches go out.', cost: 15, type: 'tool', skillBonus: 'stealth', bonus: 1 },
  { id: 'salt_salve', name: 'Salt Salve', desc: 'Harbor medic standard. Closes cuts fast, stings worse.', cost: 14, type: 'consumable', healAmount: 10 },
  { id: 'cargo_manifest_stamp', name: 'Cargo Manifest Stamp', desc: 'Forged routing mark. Persuasion for customs encounters.', cost: 35, type: 'tool', skillBonus: 'persuasion', bonus: 1 }
]
```

**guildheart_hub** (Union trade hub, contract-dense):
```javascript
guildheart_hub: [
  { id: 'guild_reference', name: 'Guild Reference Compendium', desc: 'Exhaustive. Cross-references contract clauses and precedents.', cost: 28, type: 'tool', skillBonus: 'lore', bonus: 1 },
  { id: 'arbitration_seal', name: 'Trade Arbitration Seal', desc: 'A copy of the Guild seal. Opens testimony lanes.', cost: 40, type: 'tool', skillBonus: 'persuasion', bonus: 1 },
  { id: 'contract_bond_kit', name: 'Contract Bond Kit', desc: 'Portable notary supplies. Craft for document work.', cost: 22, type: 'tool', skillBonus: 'craft', bonus: 1 }
]
```

**panim_haven** (memorial lowlands, ritual-heavy, Panim afterlife registry):
```javascript
panim_haven: [
  { id: 'offering_kit', name: 'Certified Offering Kit', desc: 'Registry-stamped. Moves through ritual checkpoints without delay.', cost: 18, type: 'tool', skillBonus: 'persuasion', bonus: 1 },
  { id: 'pale_tincture', name: 'Memorial Tincture', desc: 'Ritual compound. Heals and steadies the mind.', cost: 16, type: 'consumable', healAmount: 12 },
  { id: 'funerary_ledger', name: 'Funerary Registry Extract', desc: 'Names, dates, expunctions. Lore for death-registry research.', cost: 25, type: 'tool', skillBonus: 'lore', bonus: 1 }
]
```

**ithtananalor** (roazian highland, anti-magic enforcement):
```javascript
ithtananalor: [
  { id: 'detection_ward', name: 'Null-Ward Shard', desc: 'Blocks one casual magic detection. Single use.', cost: 30, type: 'tool', skillBonus: 'stealth', bonus: 1 },
  { id: 'highland_compress', name: 'Highland Compress', desc: 'Field dressing from the Roazian medical corps.', cost: 14, type: 'consumable', healAmount: 10 },
  { id: 'compliance_form', name: 'Pre-Stamped Compliance Form', desc: 'Cuts through Roazian enforcement encounters. Persuasion for inspections.', cost: 32, type: 'tool', skillBonus: 'persuasion', bonus: 1 }
]
```

**mimolot_academy** (principality highland, book tariff, knowledge control):
```javascript
mimolot_academy: [
  { id: 'exemption_slip', name: 'Text Exemption Slip', desc: 'Signed by a tariff assessor. One-time transit clearance for a text.', cost: 20, type: 'tool', skillBonus: 'persuasion', bonus: 1 },
  { id: 'annotated_lexicon', name: 'Annotated Lexicon Fragment', desc: 'Partial but dense. Lore for arcane institutional research.', cost: 25, type: 'tool', skillBonus: 'lore', bonus: 1 },
  { id: 'mind_clarity_draft', name: 'Mind Clarity Draft', desc: 'Used by academy staff before examinations. Heals and sharpens.', cost: 18, type: 'consumable', healAmount: 8 }
]
```

**shirshal** (aurora meadows, Magi Magistratus, evidence-heavy):
```javascript
shirshal: [
  { id: 'evidence_seal', name: 'Evidence Containment Seal', desc: 'Magistratus-certified. Validates physical evidence for testimony.', cost: 22, type: 'tool', skillBonus: 'lore', bonus: 1 },
  { id: 'magistratus_pass', name: 'Investigative Pass', desc: 'Grants access to restricted zones during active inquiries.', cost: 35, type: 'tool', skillBonus: 'persuasion', bonus: 1 },
  { id: 'field_splint', name: 'Field Splint Kit', desc: 'Court investigator standard. Used after evidence collection in hostile sites.', cost: 12, type: 'consumable', healAmount: 10 }
]
```

**harvest_circle** (soreheim plains, Zootia Harvest Board, agricultural):
```javascript
harvest_circle: [
  { id: 'yield_counter', name: 'Calibrated Yield Counter', desc: 'Standard issue. Survival for harvest and supply assessment.', cost: 16, type: 'tool', skillBonus: 'survival', bonus: 1 },
  { id: 'field_ration', name: 'Field Ration Bundle', desc: 'Three days standard. Recovery for long travel.', cost: 10, type: 'consumable', healAmount: 8 },
  { id: 'grain_route_pass', name: 'Grain Route Pass', desc: 'Authorizes movement through supply corridors.', cost: 20, type: 'tool', skillBonus: 'persuasion', bonus: 1 }
]
```

**glasswake_commune** (polar dome, Sheresh):
```javascript
glasswake_commune: [
  { id: 'dome_sealant', name: 'Emergency Dome Sealant', desc: 'Patches micro-breaches. Survival inside compromised dome sections.', cost: 18, type: 'tool', skillBonus: 'survival', bonus: 1 },
  { id: 'cold_compress', name: 'Dome Cold Pack', desc: 'Reduces inflammation. Heals efficiently in cold conditions.', cost: 12, type: 'consumable', healAmount: 9 },
  { id: 'communal_token', name: 'Commune Identification Token', desc: 'Marks you as a registered dome resident. Persuasion within Aurora communes.', cost: 24, type: 'tool', skillBonus: 'persuasion', bonus: 1 }
]
```

**aurora_crown_commune** (polar dome):
```javascript
aurora_crown_commune: [
  { id: 'aurora_salve', name: 'Aurora Salve', desc: 'Synthesized from dome condensate. Seals small wounds.', cost: 14, type: 'consumable', healAmount: 10 },
  { id: 'spectrum_reader', name: 'Aurora Spectrum Reader', desc: 'Reads dome flux readings. Lore for dome-science research.', cost: 20, type: 'tool', skillBonus: 'lore', bonus: 1 },
  { id: 'commune_writ', name: 'Commune Writ of Passage', desc: 'Signed by the Aurora Crown council. Persuasion within dome polities.', cost: 28, type: 'tool', skillBonus: 'persuasion', bonus: 1 }
]
```

**unity_square** (Union district, trade arbitration):
```javascript
unity_square: [
  { id: 'guild_charter', name: 'Guild Charter Copy', desc: 'Formal. Lore for Union precedent and contract law.', cost: 22, type: 'tool', skillBonus: 'lore', bonus: 1 },
  { id: 'trader_bond', name: 'Trade Bond Certificate', desc: 'Establishes standing in Union markets. Persuasion for merchant encounters.', cost: 30, type: 'tool', skillBonus: 'persuasion', bonus: 1 },
  { id: 'medicinal_compound', name: 'Trader\'s Compound', desc: 'Circulates through merchant caravans. Reliable healing.', cost: 14, type: 'consumable', healAmount: 10 }
]
```

**whitebridge_commune**, **craftspire**, **ironhold_quarry**, **plumes_end_outpost**, **sunspire_haven** — same 3-item pattern, matching canonical flavor:

```javascript
whitebridge_commune: [
  { id: 'bridge_toll_pass', name: 'Bridge Authority Pass', desc: 'Clears crossing checkpoints without delay.', cost: 18, type: 'tool', skillBonus: 'persuasion', bonus: 1 },
  { id: 'commune_salve', name: 'Commune Medic Salve', desc: 'Distributed at the commune hall. Standard recovery compound.', cost: 12, type: 'consumable', healAmount: 9 },
  { id: 'structural_survey', name: 'Crossing Survey Notes', desc: 'Cargo route data. Survival for bridge and transit navigation.', cost: 16, type: 'tool', skillBonus: 'survival', bonus: 1 }
],
craftspire: [
  { id: 'guild_tool_kit', name: 'Craftspire Workshop Kit', desc: 'Well-maintained. Craft for workshop and fabrication work.', cost: 20, type: 'tool', skillBonus: 'craft', bonus: 1 },
  { id: 'forge_tonic', name: 'Forge Recovery Tonic', desc: 'Heat-treated. Used by workshop staff after long shifts.', cost: 14, type: 'consumable', healAmount: 10 },
  { id: 'workshop_manifest', name: 'Workshop Supply Manifest', desc: 'Lists suppliers. Lore for tracing material origins.', cost: 18, type: 'tool', skillBonus: 'lore', bonus: 1 }
],
ironhold_quarry: [
  { id: 'quarry_rope', name: 'Ironhold Quarry Rope', desc: 'Load-rated. Survival for quarry traversal and extraction.', cost: 14, type: 'tool', skillBonus: 'survival', bonus: 1 },
  { id: 'dust_compress', name: 'Quarry Dust Compress', desc: 'Clears airways and closes rock-cut wounds.', cost: 10, type: 'consumable', healAmount: 8 },
  { id: 'extraction_log', name: 'Extraction Log Entry', desc: 'Records shipment anomalies. Lore for quarry supply research.', cost: 20, type: 'tool', skillBonus: 'lore', bonus: 1 }
],
plumes_end_outpost: [
  { id: 'frontier_kit', name: 'Frontier Patrol Kit', desc: 'Compact. Survival for open-road and outpost navigation.', cost: 16, type: 'tool', skillBonus: 'survival', bonus: 1 },
  { id: 'outpost_ration', name: 'Outpost Ration', desc: 'Standard frontier issue. Heals a small wound.', cost: 8, type: 'consumable', healAmount: 7 },
  { id: 'patrol_dossier', name: 'Patrol Route Dossier', desc: 'Warden-marked. Stealth for moving through patrol corridors.', cost: 20, type: 'tool', skillBonus: 'stealth', bonus: 1 }
],
sunspire_haven: [
  { id: 'haven_salve', name: 'Sunspire Haven Salve', desc: 'Prepared at the haven. Reliable healing.', cost: 12, type: 'consumable', healAmount: 10 },
  { id: 'frontier_treaty', name: 'Haven Passage Treaty', desc: 'Sunspire endorsement. Persuasion for frontier authority encounters.', cost: 25, type: 'tool', skillBonus: 'persuasion', bonus: 1 },
  { id: 'wilderness_guide', name: 'Wilderness Field Guide', desc: 'Terrain and creature notes for the Soreheim frontier.', cost: 18, type: 'tool', skillBonus: 'survival', bonus: 1 }
]
```

- [ ] After `shelkopolis:` in `SHOP_INVENTORY`, add all the above locality entries
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: full shop inventory — all Stage 1/2 localities (15 added)`

---

### Task 4.2 — Nomdara shop (mobile trade goods)

**File:** `ledger-of-ash.html`

**Context:** Nomdara is transit-only, no NPC encounters, mobile settlement. Its shop should feel transient — goods that move with the caravan, priced slightly higher to reflect the mobility premium.

- [ ] Add `nomdara_caravan` key to `SHOP_INVENTORY`:

```javascript
nomdara_caravan: [
  { id: 'bonded_passage_writ', name: 'Bonded Passage Writ', desc: 'Registry-sealed. Clears checkpoint encounters in bonded polities.', cost: 45, type: 'tool', skillBonus: 'persuasion', bonus: 1 },
  { id: 'caravan_remedy', name: 'Caravan Remedy', desc: 'Mixed on the road. Reliable but expensive.', cost: 22, type: 'consumable', healAmount: 14 },
  { id: 'route_ledger', name: 'Route Ledger Extract', desc: 'One active route\'s waypoints and hazard notes. Survival for that route only.', cost: 30, type: 'tool', skillBonus: 'survival', bonus: 1 },
  { id: 'seal_kit', name: 'Mobile Seal Kit', desc: 'Bond clerk\'s personal kit. Craft for formal document verification.', cost: 35, type: 'tool', skillBonus: 'craft', bonus: 1 }
]
```

- [ ] In `enterNomdara()`, ensure `openShop()` (or equivalent) is called with location key `'nomdara_caravan'`
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: Nomdara caravan shop (mobile trade goods, premium priced)`

---

## Phase 5 — Consumables: Use Button

### Task 5.1 — Use button for consumables in inventory panel

**File:** `ledger-of-ash.html`

**Context:** Consumables sit inert in inventory. Items with `type: 'consumable'` and `healAmount > 0` need a "Use" button that applies `healAmount` to `G.hp` (capped at `G.maxHp`). Items with `skillBonus` and `bonus` (but `healAmount === 0`) need a Use button that applies the bonus to the next roll.

- [ ] In `renderInventory()` (or wherever inventory items are rendered), for each item where `item.type === 'consumable'`:

```javascript
// Add Use button
if (item.type === 'consumable') {
  var useBtn = '<button class="btn-use-item" onclick="useConsumable(' + idx + ')">Use</button>';
  // append to item row
}
```

- [ ] Implement `useConsumable(idx)`:

```javascript
function useConsumable(idx) {
  var item = G.inventory && G.inventory[idx];
  if (!item || item.type !== 'consumable') return;
  if (item.healAmount && item.healAmount > 0) {
    G.hp = Math.min(G.maxHp || 20, (G.hp || 0) + item.healAmount);
    G.lastResult = 'You use the ' + item.name + '. ' + item.healAmount + ' HP recovered.';
  } else if (item.skillBonus && item.bonus > 0) {
    // Temporary bonus — stored for next roll
    G.tempBonuses = G.tempBonuses || {};
    G.tempBonuses[item.skillBonus] = (G.tempBonuses[item.skillBonus] || 0) + item.bonus;
    G.lastResult = 'You use the ' + item.name + '. +' + item.bonus + ' to your next ' + item.skillBonus + ' roll.';
  }
  G.inventory.splice(idx, 1); // remove after use
  updateHUD();
  if (typeof renderNarration === 'function') renderNarration();
  if (typeof renderInventory === 'function') renderInventory();
}
```

- [ ] In the roll resolution function, after `eqBonus` is calculated, add temp bonus consumption:

```javascript
// Consume temp bonus if applicable
if (G.tempBonuses && G.tempBonuses[skill]) {
  eqBonus += G.tempBonuses[skill];
  delete G.tempBonuses[skill];
}
```

- [ ] Add `.btn-use-item` CSS: small button, `var(--jade)` color, same base as `.btn-sm`
- [ ] Add `tempBonuses: {}` to G defaults
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: consumable Use button — healAmount and skill-buff consumables now usable`

---

## Phase 6 — Archetype Starting Gear

### Task 6.1 — Add starting armor for all archetype groups + shared equippable items

**File:** `ledger-of-ash.html`

**Context:** `_archetypeGear` gives each of 4 groups one weapon or tool. Armor slot is always empty at start. The intention is multiple archetypes can equip shared items for build diversity. Add starting armor per group and seed the shop with shared items usable across groups.

- [ ] In `_archetypeGear`, add `armor` field for each group:

```javascript
_archetypeGear = {
  combat:  {
    weapon: { name:'Iron Accord Standard Blade', type:'weapon', skillBonus:'combat',   bonus:1, desc:'Standard issue. Keeps you alive.' },
    armor:  { name:'Warden Field Plate',          type:'armor',  skillBonus:'survival', bonus:1, desc:'Worn through checkpoints. Absorbs the first hit.' }
  },
  magic:   {
    tool:   { name:"Practitioner's Codex",        type:'tool',   skillBonus:'lore',     bonus:1, desc:'Annotated reference. Lore +1 for the scene.' },
    armor:  { name:'Warding Robe',                type:'armor',  skillBonus:'lore',     bonus:1, desc:'Warded fabric. Marginal protection, strong presence.' }
  },
  stealth: {
    tool:   { name:'Shadowhands Field Kit',        type:'tool',   skillBonus:'stealth',  bonus:1, desc:'Lock tools, dark cloth, chalk marks.' },
    armor:  { name:'Shadow-Weave Vest',            type:'armor',  skillBonus:'stealth',  bonus:1, desc:'Reduces silhouette. Fitted over anything.' }
  },
  support: {
    tool:   { name:'Field Medic Satchel',          type:'tool',   skillBonus:'survival', bonus:1, desc:'Bandages, reagents, tourniquet.' },
    armor:  { name:'Reinforced Work Coat',         type:'armor',  skillBonus:'survival', bonus:1, desc:'Practical. Takes a beating and keeps going.' }
  }
};
// Apply both items at character creation:
const _groupGear = _archetypeGear[G.archetype.group];
if (_groupGear) {
  ['weapon','tool','armor'].forEach(function(slot) {
    if (_groupGear[slot]) {
      const gi = Object.assign({}, _groupGear[slot], { equipped: true });
      G.inventory.push(gi);
      G.equipped[slot] = gi;
    }
  });
}
```

- [ ] Remove the old single-item `_startGear` assignment code
- [ ] Add shared equippable items to `shelkopolis` shop that any archetype group can equip (type: 'weapon', 'armor', or 'tool' with broad-applicable skill bonuses):

```javascript
// Add to shelkopolis shop (or global items available across shops):
{ id: 'iron_dagger', name: 'Iron Dagger', desc: 'Fits any hand. Combat or stealth — your call.', cost: 25, type: 'weapon', skillBonus: 'combat', bonus: 1 },
{ id: 'travelers_cloak', name: 'Traveler\'s Cloak', desc: 'Fits any build. Survival on the road.', cost: 20, type: 'armor', skillBonus: 'survival', bonus: 1 },
{ id: 'observation_lens', name: 'Observation Lens', desc: 'Ground for fieldwork. Lore or stealth for evidence gathering.', cost: 28, type: 'tool', skillBonus: 'lore', bonus: 1 }
```

- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: archetype starting armor for all 4 groups + shared equippable items in shelkopolis shop`

---

## Phase 7 — Sideplot Wiring

### Task 7.1 — Convert shelk-fairhaven-ledger-shadow.json → JS

**File to create:** `content/sideplots/shelk_fairhaven_ledger_shadow.js`

**Context:** `shelk-fairhaven-ledger-shadow.json` is a Stage I–II sideplot set in Shelkopolis Permit Registry (Clerks' Quarter). Theme: circulation, institution. A shadow ledger — permits approved for entities that don't exist. Use the `soreheim_stage1.js` IIFE pattern.

Sideplot has three proof rungs: first (rumor at transit post), second (permit desk irregularity), third (the second ledger). Wire into `shelkopolis_stage1_enriched_choices.js` and `shelkopolis_stage2_enriched_choices.js`.

- [ ] Create `content/sideplots/shelk_fairhaven_ledger_shadow.js`:

```javascript
var SHELK_FAIRHAVEN_LEDGER_SHADOW = (function() {
  'use strict';

  function openingHook() {
    if (!G || G.flags.sideplot_shadow_ledger_started) return null;
    return {
      cid: 'sideplot_shadow_ledger_hook',
      text: 'At the permit desk — a clerk stamps without reading.',
      tags: ['Investigation'],
      plot: 'side',
      result: function() {
        G.flags.sideplot_shadow_ledger_started = true;
        G.lastResult = 'The permit counter is backed up three people deep when the clerk stamps yours without looking at the name. The form is for a trading company. The seal in the corner is Twice-Sealed — a double-impression you have seen on one other document. The company name does not appear in the open registry. You write it down anyway.';
        G.recentOutcomeType = 'discovery';
        addJournal(G.lastResult, 'evidence');
        G.stageProgress = G.stageProgress || {1:0,2:0};
        G.stageProgress[G.stage === 'Stage II' ? 2 : 1] = (G.stageProgress[G.stage === 'Stage II' ? 2 : 1] || 0) + 1;
        if (typeof updateHUD === 'function') updateHUD();
        (window._rawRenderChoices || window.renderChoices)([
          { id: 'shadow_note_company', text: 'The company name is on the form. It should be in the register.', tag: 'safe',
            action: function() {
              G.flags.shadow_ledger_rung1 = true;
              G.lastResult = 'You note the name and the seal. The company\'s registration number leads to an address in the Clerks\' Quarter — a building that was converted to storage twelve years ago. The number is current. The address is not.';
              G.recentOutcomeType = 'discovery';
              addJournal(G.lastResult, 'evidence');
              if (typeof checkStageAdvance === 'function') checkStageAdvance();
            }
          }
        ]);
      }
    };
  }

  function rung2Hook() {
    if (!G || !G.flags.shadow_ledger_rung1 || G.flags.shadow_ledger_rung2) return null;
    return {
      cid: 'sideplot_shadow_ledger_rung2',
      text: 'The permit desk runs two sets of records. The second one is not filed here.',
      tags: ['Investigation'],
      plot: 'side',
      result: function() {
        var r = rollD20('lore');
        if (r.total >= 12) {
          G.flags.shadow_ledger_rung2 = true;
          G.lastResult = 'The clerk\'s filing system has a gap — two drawers with different lock styles. The second drawer has a routing number that does not match the public registry. The entries inside are stamped with the same Twice-Sealed impression. Twenty-three companies. None of them appear in the open rolls.';
          G.recentOutcomeType = 'discovery';
          G.worldClocks = G.worldClocks || {};
          G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        } else {
          G.lastResult = 'The drawer is locked and the clerk has noticed you looking. The routing number is visible through the gap. You have it. The drawer stays closed.';
          G.recentOutcomeType = 'complication';
          G.worldClocks = G.worldClocks || {};
          G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        }
        addJournal(G.lastResult, 'evidence');
        if (typeof checkStageAdvance === 'function') checkStageAdvance();
      }
    };
  }

  function showResolution() {
    if (!G || !G.flags.shadow_ledger_rung2 || G.flags.shadow_ledger_resolved) return;
    G.flags.shadow_ledger_resolved = true;
    G.lastResult = 'Twenty-three companies. The routing number threads through every one. Twice-Sealed Transit — a name that doesn\'t exist in any permit roll, runs through every one. Someone is using the permit system as a parallel channel. The question is not how. The question is who signs the second drawer.';
    G.recentOutcomeType = 'discovery';
    G.flags.shadow_ledger_known = true;
    addJournal(G.lastResult, 'evidence');
    if (typeof addWorldNotice === 'function') addWorldNotice('A second permit registry has been found. Twice-Sealed Transit is not registered anywhere.');
    if (typeof updateHUD === 'function') updateHUD();
  }

  return { openingHook: openingHook, rung2Hook: rung2Hook, showResolution: showResolution };
})();
window.SHELK_FAIRHAVEN_LEDGER_SHADOW = SHELK_FAIRHAVEN_LEDGER_SHADOW;
```

- [ ] Add `<script src="content/sideplots/shelk_fairhaven_ledger_shadow.js"></script>` to `ledger-of-ash.html`
- [ ] In `shelkopolis_stage1_enriched_choices.js`, in the choices array, add injection of `SHELK_FAIRHAVEN_LEDGER_SHADOW.openingHook()` as a conditional choice (when available and Stage I)
- [ ] In `shelkopolis_stage2_enriched_choices.js`, inject `rung2Hook()` and `showResolution()` at appropriate progress gates
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: shelk-fairhaven-ledger-shadow sideplot wired (Shelkopolis permit registry)`

---

### Task 7.2 — Convert cosmoria-harbor-weight-fraud.json → JS

**File to create:** `content/sideplots/cosmoria_harbor_weight_fraud.js`

**Context:** "The False Tide" — Stage I–II sideplot set in Cosmoria Harbor Ring, Weighmaster's Dock. Theme: circulation. Dock workers paid short for cargo that was weighed correctly. Someone runs two sets of weight records. Three proof rungs: dock labor (short pay), weighmaster records, the second weight log. Macroregion/harbor setting — each rung should include a chance to trigger `enterCombat` on a bold escalation (hired muscle protecting the dock operation).

- [ ] Create `content/sideplots/cosmoria_harbor_weight_fraud.js` using the same IIFE pattern as Task 7.1:

```javascript
var COSMORIA_HARBOR_WEIGHT_FRAUD = (function() {
  'use strict';

  function openingHook() {
    if (!G || G.flags.sideplot_harbor_fraud_started) return null;
    return {
      cid: 'sideplot_harbor_fraud_hook',
      text: 'The dock workers count the cargo twice. The weighmaster counts it once.',
      tags: ['Investigation'],
      plot: 'side',
      result: function() {
        G.flags.sideplot_harbor_fraud_started = true;
        G.lastResult = 'Three cargo workers share a fire at the staging ground. Six weeks short pay — they say it the way people say weather, without expecting it to change. Their tallies are correct. The weighmaster\'s log shows different numbers. The discrepancy is small enough to overlook and large enough, repeated across six weeks, to mean something.';
        G.recentOutcomeType = 'discovery';
        addJournal(G.lastResult, 'evidence');
        (window._rawRenderChoices || window.renderChoices)([
          { id: 'harbor_check_log', text: 'The workers\' tally and the weighmaster\'s log don\'t match.', tag: 'safe',
            action: function() {
              G.flags.harbor_fraud_rung1 = true;
              G.lastResult = 'The workers let you see their count records — kept separately, in a pocket ledger. The differences are consistent: always 8–12 percent low in the official log. Always in the same cargo class. The dock foreman has signed every discrepancy.';
              G.recentOutcomeType = 'discovery';
              addJournal(G.lastResult, 'evidence');
              if (typeof checkStageAdvance === 'function') checkStageAdvance();
            }
          }
        ]);
      }
    };
  }

  function rung2Hook() {
    if (!G || !G.flags.harbor_fraud_rung1 || G.flags.harbor_fraud_rung2) return null;
    return {
      cid: 'sideplot_harbor_fraud_rung2',
      text: 'The weighmaster keeps two sets of records. The second is kept at the midnight check.',
      tags: ['Confrontation'],
      plot: 'side',
      result: function() {
        var r = rollD20('stealth');
        if (r.total >= 13) {
          G.flags.harbor_fraud_rung2 = true;
          G.lastResult = 'The midnight check happens at the end of the third shift when the dock is quietest. The weighmaster brings a second ledger — smaller, different binding. You watch from the crane housing. He enters numbers that don\'t match what you saw weighed. Someone meets him at the crane base. They exchange a sealed envelope. You have seen that seal before: Twice-Sealed.';
          G.recentOutcomeType = 'discovery';
          G.worldClocks = G.worldClocks || {};
          G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
          addJournal(G.lastResult, 'evidence');
          if (typeof checkStageAdvance === 'function') checkStageAdvance();
        } else {
          G.lastResult = 'The dock guard spotted you at the crane housing. You got out clean but didn\'t see the exchange. The foreman has been told someone was watching. The second ledger exists — you know that much.';
          G.recentOutcomeType = 'complication';
          G.worldClocks = G.worldClocks || {};
          G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
          addJournal(G.lastResult, 'complication');
          // Bold escalation — hired muscle confrontation
          (window._rawRenderChoices || window.renderChoices)([
            { id: 'harbor_confront_guard', text: 'The dock guard has seen your face. He\'s coming back with someone.', tag: 'bold',
              action: function() {
                if (typeof enterCombat === 'function') enterCombat('hired_muscle', { isBoss: false, context: 'harbor_guard_confrontation' });
              }
            },
            { id: 'harbor_withdraw', text: 'Pull back. The ledger isn\'t worth a dock fight.', tag: 'safe',
              action: function() {
                G.lastResult = 'You clear the dock before the second guard arrives. The ledger is still out there. So is the foreman\'s name.';
                if (typeof checkStageAdvance === 'function') checkStageAdvance();
              }
            }
          ]);
        }
      }
    };
  }

  function showResolution() {
    if (!G || !G.flags.harbor_fraud_rung2 || G.flags.harbor_fraud_resolved) return;
    G.flags.harbor_fraud_resolved = true;
    G.lastResult = 'The second ledger connects the Cosmoria weighmaster to Twice-Sealed Transit. The false weight entries are a payment system — cargo shorted on paper, difference paid in a sealed envelope. Someone upstream authorizes it. The dock workers are owed wages. The foreman is a link in a longer chain.';
    G.recentOutcomeType = 'discovery';
    G.flags.harbor_fraud_known = true;
    addJournal(G.lastResult, 'evidence');
    if (typeof addWorldNotice === 'function') addWorldNotice('Harbor weight fraud traced to Twice-Sealed Transit. The dock foreman is a link.');
    if (typeof updateHUD === 'function') updateHUD();
  }

  return { openingHook: openingHook, rung2Hook: rung2Hook, showResolution: showResolution };
})();
window.COSMORIA_HARBOR_WEIGHT_FRAUD = COSMORIA_HARBOR_WEIGHT_FRAUD;
```

- [ ] Add `<script src="content/sideplots/cosmoria_harbor_weight_fraud.js"></script>`
- [ ] Inject hooks into `cosmoria_stage1_enriched_choices.js` and `cosmoria_stage2_enriched_choices.js`
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: cosmoria harbor weight fraud sideplot wired (The False Tide)`

---

### Task 7.3 — Convert fairhaven-meadow-mill-displacement.json → JS

**File to create:** `content/sideplots/fairhaven_meadow_mill_displacement.js`

**Context:** Stage I–II sideplot set in Fairhaven. Theme: displaced labor, contracts. Workers displaced by a mill expansion that used fraudulent land rerouting paperwork. Three rungs: worker testimony, the rerouting order, the contract behind it. Travel/road setting — macroregion combat available when players press past the mill foreman (border_enforcer pool).

- [ ] Create `content/sideplots/fairhaven_meadow_mill_displacement.js` using the same IIFE pattern:
  - `openingHook()`: returns a sideplot choice available in Fairhaven when Stage I is active. Opening narration: displaced workers near the mill road, one shows a copy of the rerouting order — the property line moved twelve meters. The new line is inside what used to be common land.
  - `rung2Hook()`: lore DC 12 to trace the rerouting order to a permit number. Success: reveals a routing mark that matches Twice-Sealed. Failure: watchfulness +1, escalation choice: confront the mill foreman (`enterCombat('border_enforcer', {isBoss:false})`) or withdraw.
  - `showResolution()`: sets `G.flags.mill_displacement_resolved`, reveals the fraudulent land contract connects to the same permit channel as the shadow ledger. `addWorldNotice('Fairhaven meadow displacement tied to fraudulent land rerouting. The routing mark matches Twice-Sealed.')`
- [ ] Wire flags: `sideplot_mill_displacement_started`, `mill_displacement_rung1`, `mill_displacement_rung2`, `mill_displacement_resolved`
- [ ] Add `<script>` tag
- [ ] Inject into `fairhaven_stage1_enriched_choices.js` and `fairhaven_stage2_enriched_choices.js`
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: fairhaven meadow mill displacement sideplot wired`

---

### Task 7.4 — Convert guildheart-union-testimony-gap.json → JS

**File to create:** `content/sideplots/guildheart_union_testimony_gap.js`

**Context:** "The Blank Witness" — Stage II only (stage_range: II–III; implement Stage II portion only, Stage III gate stays closed). Set in Guildheart Hub, Guild Registry Office and labor halls. Theme: institutional suppression, testimony. A witness to a contract dispute was removed from the official testimony log. The labor halls have her name; the registry does not.

This sideplot is Stage II exclusive — do not make it available in Stage I. Wire into `guildheart_hub_stage2_enriched_choices.js` only.

- [ ] Create `content/sideplots/guildheart_union_testimony_gap.js`:
  - `openingHook()`: guards on `G.stage === 'Stage II'`. Opening: registry clerk in labor hall mentions a name that was struck from the testimony log. The blank witness — someone who was there and whose name was removed.
  - `rung2Hook()`: persuasion DC 13 to find the removed witness. Success: she speaks in a closed hall — she was paid to disappear from the record. Her testimony connects the contract gap to Twice-Sealed Transit's labor channels. Failure: pressure +1, she's already moved.
  - `showResolution()`: sets `G.flags.testimony_gap_resolved`. Journal: the blank witness's account establishes a direct link between the Union testimony suppression and the same Twice-Sealed network. `addWorldNotice('Guildheart Hub testimony suppression traced — a blank witness exists who connects the labor fraud to Twice-Sealed.')`
- [ ] Wire flags: `sideplot_testimony_gap_started`, `testimony_gap_rung1`, `testimony_gap_rung2`, `testimony_gap_resolved`
- [ ] Add `<script>` tag
- [ ] Inject into `guildheart_hub_stage2_enriched_choices.js` only (not Stage 1)
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: guildheart union testimony gap sideplot wired (Stage II only)`

---

## Phase 8 — Travel Combat Wiring

### Task 8.1 — Wire enterCombat into bold travel choices + calibrate encounter rate

**File:** `content/travel_corridors.js`, `ledger-of-ash.html`

**Context:** `TRAVEL_ENCOUNTER_POOLS` has authored narrative encounters for forest and highland biomes. They have `choices` arrays but no `enterCombat` calls — all encounters resolve narratively only. The user wants macroregion/environment localities to have combat chances after each choice, emulating the bestiary as a living threat. `BIOME_ENCOUNTER_POOLS` has 7 biomes with enemy keys.

Bold travel choices should trigger `enterCombat` when the player escalates. Safe choices should always resolve narratively.

- [ ] In `TRAVEL_ENCOUNTER_POOLS`, for each encounter that has a `choices` array, add a bold option that calls `enterCombat`. Example — for the forest ambush encounter:

```javascript
// In existing encounter choice array, add:
{
  id: 'enc_forest_fight',
  text: 'Step into the open. If they want a fight, they\'ll get one.',
  tag: 'bold',
  action: function(ctx) {
    var enemyPool = BIOME_ENCOUNTER_POOLS[ctx.biome] || ['road_bandit'];
    var enemy = enemyPool[Math.floor(Math.random() * enemyPool.length)];
    if (typeof enterCombat === 'function') enterCombat(enemy, { isBoss: false });
  }
}
```

- [ ] For each biome in `BIOME_ENCOUNTER_POOLS`, ensure the enemy keys exist in the main `ENEMY_TEMPLATES` / bestiary. If a key is missing, map it to the nearest valid key from `STAGE_ENEMY_POOL`.
- [ ] Add encounter chance check after each travel corridor choice resolution (not just at segment start). In `advanceCorridor()` or equivalent, after each step:

```javascript
// 20% chance of secondary encounter after each step (Stage I); 30% Stage II
var _secondaryChance = G.stage === 'Stage II' ? 0.30 : 0.20;
if (G.flags.corridor_encounters_enabled && Math.random() < _secondaryChance) {
  _triggerBiomeEncounter(currentBiome);
}
```

- [ ] Implement `_triggerBiomeEncounter(biome)` — picks a random creature from `BIOME_ENCOUNTER_POOLS[biome]`, renders a short narration, and presents Press/Retreat choices (Press triggers `enterCombat`, Retreat costs 1 day)
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: travel combat — enterCombat in bold travel choices, secondary encounter after each step`

---

## Phase 9 — Balance Audit

### Task 9.1 — DC vs. enemy tier success rate audit

**File:** `ledger-of-ash.html`

**Context:** Enemy tiers: t1 (L1-3): base; t2 (L4-7): +6hp/+2atk/+1def; t3 (L8-10): +14hp/+4atk/+3def. DCs: safe=7, risky=12, bold=15 (+stageModifier). At Level 1 with a base skill of 2, a safe check succeeds on d20≥5 (80% success). At Level 5 with skill 4, a bold check (DC 15) succeeds on d20≥11 (50%). These are healthy baselines. The audit should verify:

- [ ] Check each enemy in `STAGE_ENEMY_POOL` exists in `ENEMY_TEMPLATES` (or `BESTIARY_LOOKUP` encounter tables). Grep `ENEMY_TEMPLATES` to find the structure. If any pool enemy key is missing from templates, add a stub entry or remap to an existing key.
- [ ] Verify that `getEnemyStats(key, level)` handles all keys in `STAGE_ENEMY_POOL` without returning `undefined` or throwing. Log any missing keys to console.warn in a test pass.
- [ ] Verify `G.equipped.armor.bonus` is applied to defense in `startCombat()` — grep the combat function for `G.equipped.armor` or `eqBonus`. If armor bonus is NOT reducing incoming damage, add: `var armorBonus = (G.equipped && G.equipped.armor && G.equipped.armor.bonus) || 0;` and apply to damage mitigation.
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: DC/enemy tier balance audit — missing enemy keys patched, armor bonus verified in combat`

---

## Phase 10 — Content Audit

### Task 10.1 — Stage 2 label standard rewrite (15-word ±8 char)

**Files:** All `content/*_stage2_enriched_choices.js`

**Context:** Stage 2 labels average 20-40 words — well above the 15-word player inner-voice standard. Labels should be thoughts being had, not action descriptions. Wiggle room: ±8 characters where it improves the text. Apply the moral texture examples from CLAUDE.md.

**Label standard:**
- Under 15 words (±8 characters)
- Player's inner voice — a thought, not an action description
- No question marks, no infinitives, no NPC-directed verbs
- Carries moral register in the text itself

**Audit pattern:** Grep `text:` in each Stage 2 file, flag any label over 15 words, rewrite.

- [ ] Run: `python3 -c "import glob,re,os; [print(os.path.basename(f), len(re.findall(r'text\s*:\s*[\'\"]\S[^\'\"]{60,}[\'\"]\s*,', open(f).read())), 'violations') for f in glob.glob('C:/Users/CEO/ledger-of-ash/content/*stage2*enriched*.js')]"` — to find files with most violations
- [ ] Rewrite labels in all Stage 2 locality files, worst offenders first. Target text: the clerk's action or the observable detail is the label — never "Question X about Y."

Examples of correct rewrites for Stage 2 contexts:
- "Ask the guild registry clerk about the missing testimony entry." → "The testimony entry is blank. It was not always blank."
- "Investigate the discrepancy in the weighmaster's cargo log." → "The log and the scale don't agree. One of them was changed."
- "Consult with the faction contact about what you have found so far." → "What you have found needs someone who can read what it means."
- "Look into the permit records at the Clerks' Quarter for anomalies." → "Permit records. Someone stopped filing them here."

- [ ] `node tests/content/validate-content.js` — note violation delta (label length violations expected to drop significantly)
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: Stage 2 label standard rewrite — 15-word player inner-voice (all locality files)`

---

### Task 10.2 — Forbidden word audit Stage 1 + Stage 2

**Files:** All `content/*stage1*.js` and `content/*stage2*.js`, `ledger-of-ash.html` narrative strings

**Context:** Forbidden in player-facing strings: "investigation"/"investigate", "meaningful", "contact" as a person-noun, "official" as a vague adjective, "you feel"/"you realize"/"you sense", editorial framing.

- [ ] Run grep across all content files for each forbidden pattern:
```bash
grep -rn "you feel\|you realize\|you sense\|meaningful\|investigate" content/ | grep -v "//\|'investigate'" | head -50
```
- [ ] For each hit in a result string or choice label: replace with concrete observable alternative:
  - "you feel a chill" → "the room is cold in a way that has nothing to do with the season"
  - "you realize" → omit — show the thing directly
  - "meaningful" → cut entirely; use a specific noun instead
  - "investigate" in player-facing text → "trace," "pull," "follow," or recast as a specific action
  - "contact" as person → use name or role ("the archivist," "Seld," "your Collegium source")
  - "official" as vague adjective → specify the institution ("Collegium record," "warden manifest")
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: forbidden word audit — investigate/meaningful/you feel removed from Stage 1+2 results`

---

### Task 10.3 — Stage 1 & 2 prose readability + forward hook audit

**Files:** All Stage 1 and Stage 2 enriched choice files

**Context:** Result text target: 60-90 words (120 max for high-stakes). Every risky and main-plot choice result must end with a forward thread. Safe failures must redirect. User confirmed +/-8 character wiggle room on label rewrites.

- [ ] For each Stage 2 locality file: check result text length. Any result under 40 words: expand with sensory/behavioral detail. Any result over 120 words: trim the most editorial paragraph.
- [ ] For risky choices in all Stage 1 files with audit note `~1/5 missing hooks` (per prior audit: Aurora Crown, Cosmoria, Craftspire, Guildheart, Shelkopolis, Shirshal, Sunspire, Unity, Whitebridge): add one forward-motion sentence to any result that ends without a thread. Use investigative register:
  - "The routing numbers point the same direction they have for three localities now."
  - "Another name removed from record. The removal date matches two others you have found."
  - "The pattern is not new. It is just not named yet."
- [ ] `node tests/content/validate-content.js` — note new violation delta
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: Stage 1+2 prose audit — forward hooks on risky choices, result text 60-90w target`

---

## Phase 11 — Canon Accuracy

### Task 11.1 — Non-Principalities Stage 1 locality canon accuracy pass

**Files:** `content/soreheim_proper_stage1_enriched_choices.js`, `content/sunspire_haven_stage1_enriched_choices.js`, `content/plumes_end_outpost_stage1_enriched_choices.js`, `content/harvest_circle_stage1_enriched_choices.js`

**Context:** User confirmed Stage 1 outside the Principalities parent polity must use exclusively flavored content for that locality — no generic atmosphere. Key failure mode: generic atmosphere over wrong architecture (see CLAUDE.md: "Must reflect the locality's defining physical infrastructure before atmosphere").

- [ ] Read each file's result text for the first 5 choices. Verify:
  - Soreheim Proper: references industrial scale (quarry face, foundry stack, giant council presence, corrective labor crews) before atmosphere
  - Sunspire Haven: references frontier haven structure (watchtower, haven road, Soreheim plains horizon) before atmosphere
  - Plumes End Outpost: references outpost physical structure (checkpoint barrier, patrol rhythm, the road ahead) before atmosphere
  - Harvest Circle: references agricultural infrastructure (grain storage, measure board, harvest crew organization) before atmosphere
- [ ] For any result text that opens with generic city/town atmosphere rather than the defining physical infrastructure: prepend one specific sensory line anchored to the correct architectural feature
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: non-Principalities Stage 1 locality openings — physical infrastructure before atmosphere`

---

## Phase 13 — Camp, Sleep, Healer & UI Polish

### Task 13.1 — btn-howto in-game topbar fix

**File:** `ledger-of-ash.html`

**Bug:** The in-game topbar `<button id="btn-howto">How to Play</button>` has no `onclick` attribute. It relies on an `addEventListener` at line ~13972, which may fire before the button exists or target the wrong element. The title-screen `btn-howto-title` uses `onclick="showHowToPlay()"` and works correctly.

- [ ] Grep `id="btn-howto"` to find the in-game topbar button (not the title screen variant)
- [ ] Add `onclick="showHowToPlay()"` to the in-game button so it matches the title screen pattern:
  ```html
  <button class="tnav-btn" id="btn-howto" onclick="showHowToPlay()">How to Play</button>
  ```
- [ ] Open `play.bat` — start a new game, click "How to Play" in the topbar — verify the modal opens
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: btn-howto in-game topbar onclick wired to showHowToPlay()`

---

### Task 13.2 — Sleep choice cost display in doSleepScene()

**File:** `ledger-of-ash.html`

**Bug:** `doSleepScene()` builds two inn choices but neither shows the cost in the button text. Costs (1 gold cheap, 3 gold comfortable) are passed as arguments to `doSleep()` but players click blind.

- [ ] Grep `doSleepScene` to find the choice-building block. Find the two lines that push cheap and comfortable choices
- [ ] Rewrite both choice text strings to include cost:
  ```javascript
  // BEFORE:
  choices.push({ text: innData.cheap + ' — cheap, loud, and serviceable.', ... });
  choices.push({ text: innData.comfortable + ' — quiet, private, worth the cost.', ... });

  // AFTER:
  choices.push({ text: innData.cheap + ' — cheap, loud, and serviceable. (1 gold)', ... });
  choices.push({ text: innData.comfortable + ' — quiet, private, worth the cost. (3 gold)', ... });
  ```
- [ ] Verify the cost values match the `doSleep(cost, ...)` call arguments (cheap=1, comfortable=3) — if any locality uses different costs, use the variable not the hardcoded value
- [ ] Open `play.bat` — open Camp, click Sleep — verify both options show gold cost before selecting
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: sleep choice cost displayed in button text before selecting`

---

### Task 13.3 — Camp menu reorganization

**File:** `ledger-of-ash.html`

**Context:** Camp overlay has 10 buttons. Rest (HP at camp) and Sleep (inn lodging) both use a moon icon and are easily confused. Post Watches and Camp Outside are outdoor-specific but always visible. Craft (Level 2) and Companions/Talk (Level 3) have gates but show no gate text — they silently fail when used below the gate level. Lay Low and Review Notes are `display:none` by default with no container.

**Reorganization:**

**Group 1 — Recover** (always visible):
- Rest — change icon from moon → `⚕` or `♥`. Label: `Rest — Recover HP. Watchfulness +1. Limit 2/day.`
- Sleep — keep moon icon. Label: `Sleep — Find lodging. Cost shown on select.`
- Seek Care — keep as-is

**Group 2 — Act** (show with gate text when gated):
- Train — keep as-is
- Craft — show label `Craft — Level 2 required.` when `G.level < 2` (disabled, not hidden)
- Companions/Talk — show label `Companions — Level 3 required.` when `G.level < 3` (disabled, not hidden)
- Post Watches — show only when `G.companions && G.companions.length > 0`; hide otherwise

**Group 3 — Investigate** (conditional, collapsible):
- Camp Outside — show only when not in settlement (check `G.inSettlement` or equivalent flag)
- Lay Low — show when `(G.worldClocks.watchfulness || 0) >= 3` (already implemented, keep)
- Review Notes — show when `G.flags.recovery_thread_available` (already implemented, keep)

- [ ] Grep `showCampMenu\|camp-action\|data-camp` in `ledger-of-ash.html` to find the camp overlay HTML and the JS that renders/shows buttons
- [ ] Change Rest button icon: find the Rest button label in the camp overlay HTML and replace moon glyph/emoji with a heart or medical symbol (or add a CSS class `camp-icon--rest` with a distinct character)
- [ ] For Craft button: find where `campAction('craft')` fires. If `G.level < 2`, instead of silently failing, add a guard that renders the button as disabled:
  ```javascript
  // In showCampMenu or the button click handler:
  var craftBtn = document.querySelector('[data-camp="craft"]');
  if (craftBtn) {
    if (G.level < 2) {
      craftBtn.disabled = true;
      craftBtn.textContent = 'Craft — Level 2 required.';
    } else {
      craftBtn.disabled = false;
      craftBtn.textContent = 'Craft — Requires Level 2.';
    }
  }
  ```
- [ ] Same pattern for Companions/Talk: disable at `G.level < 3`, show `'Companions — Level 3 required.'`
- [ ] Post Watches: show button only when `G.companions && G.companions.length > 0`:
  ```javascript
  var watchBtn = document.getElementById('btn-post-watches');
  if (watchBtn) watchBtn.style.display = (G.companions && G.companions.length > 0) ? '' : 'none';
  ```
- [ ] Camp Outside: show button only when player is not in a settlement. Grep `G.inSettlement\|inSettlement` to find the flag name — if no such flag, use `G.location` and check if it matches any settlement locality key. Show/hide `#btn-campout` accordingly.
- [ ] Add visual group separators in the camp overlay HTML: add `<div class="camp-group-label">Recover</div>` before the first group, `<div class="camp-group-label">Act</div>` before Train, `<div class="camp-group-label">Investigate</div>` before Lay Low. CSS: `font-family: var(--font-body); font-size: 11px; color: var(--ink-faint); text-transform: uppercase; letter-spacing: 0.06em; margin: 8px 0 4px;`
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: camp menu reorganization — group labels, level gates visible, outdoor actions conditional`

---

### Task 13.4 — Healer service narration + locality-canon tithing

**File:** `ledger-of-ash.html`

**Context:** `seekProfessionalCare()` shows `"examines your condition. Professional care will cost N gold."` — no locality religion context, no service narration, no tithing flavor. Canonical religions by locality:

| Locality | Religion / Institution |
|----------|----------------------|
| Shelkopolis | Clerical institutions of Cysur, Cyfoes, Felujitas, Felelem — shrine presence |
| Fairhaven | Felujitas and Cyfoes — chapel and fountain |
| Panim Haven | Divine mediation, afterlife obligations — highest faith locality |
| Soreheim Proper | Ambition, domination, retribution — merit judgment at tower shrines |
| All others | Generic shrine — "a donation toward the work of this place" |

**Healer archetype:** If `G.archetype` family includes Healer, player gets shrine-labor narration and 50% tithing cost.

**Implementation:**

- [ ] Grep `seekProfessionalCare` to find the full function body
- [ ] Add a locality→religion lookup at the top of the function:
  ```javascript
  var SHRINE_FLAVOR = {
    shelkopolis: 'The shrine here serves the four clerical institutions — Cysur, Cyfoes, Felujitas, and Felelem. The healer moves between stations, each one a different order\'s corner.',
    fairhaven: 'The chapel beside the fountain is Felujitas — the one with the grain-door relief. The healer works from the back room, where the candles are allowed to stay lit.',
    panim_haven: 'This is a place of careful obligation. The healer here is a mediator of the divine balance — what she takes from you in coin becomes an offering registered against your name in the afterlife ledger.',
    soreheim_proper: 'The tower shrine here does not offer comfort. It offers assessment. The healer consults the merit record before she decides what care you have earned.',
  };
  var shrineText = SHRINE_FLAVOR[G.location] || 'The healer works from a small shrine. The coin goes toward the work of this place.';
  ```
- [ ] Replace the current `addNarration` opening with shrine flavor + service narration:
  ```javascript
  var isHealer = G.archetype && (G.archetype.name === 'Healer' || (G.archetype.family && G.archetype.family.toLowerCase() === 'support'));
  var healerIntro = isHealer
    ? shrineText + ' They put you to work first — carrying water, sorting linens, restocking the poultice shelf. An hour passes. Then they look at your wounds.'
    : shrineText + ' ' + (healer.name || 'The healer') + ' washes their hands at the basin before approaching. They examine each wound in order, saying nothing until the last one.';
  var tithingCost = isHealer ? Math.floor(cost / 2) : cost;
  var tithingLabel = (G.location === 'panim_haven') ? 'offering registered to your name' : 'donation to the shrine';
  addNarration('Recovery — ' + (healer.name || 'Local Healer'),
    healerIntro + ' The ' + tithingLabel + ' comes to ' + tithingCost + ' gold.');
  ```
- [ ] Update `cost` to `tithingCost` in all choice CTA strings within the function (the "Pay for treatment. (N gold)" button text)
- [ ] Update the `'pay'` branch in `handleChoice` or the inline action: deduct `tithingCost` not the original `cost` when player is Healer archetype — pass the correct cost through the choice data:
  ```javascript
  // In the choice object for shrine_service:
  data: { cost: tithingCost }
  // In the handler: use choice.data.cost instead of recalculating
  ```
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: healer service — locality-canon shrine narration, tithing cost, healer archetype shrine-labor scene`

---

## Phase 12 — Tests & Verification

### Task 12.1 — Full test pass

- [ ] `npx jest` — 78/78 pass
- [ ] `node tests/content/validate-content.js` — record violation count (expected improvement from label rewrites; new content may add small delta)
- [ ] `node tests/content/validate-flags.js` — pass (all sideplot flags are per-sideplot, no collisions)
- [ ] `node tests/content/validate-structure.js` — pass (new JS files have correct IIFE export pattern)
- [ ] Open `play.bat` — verify:
  1. No console errors on load
  2. HUD shows watchfulness/heat bars when values > 0 (test by finding a risky choice that adds watchfulness)
  3. Consumable shows count badge in HUD when inventory has one
  4. Shelkopolis shop has items for purchase
  5. Antechamber triggers at stageProgress[2] ≥ 12 without crashing
  6. Stage 2 choice labels are under 15 words
  7. scope_reveal fires at investigationProgress >= 5
  8. shadow_ledger_hints fire when watchfulness/pressure hit thresholds

---

## Verification Summary

| # | Check | Pass Condition |
|---|-------|---------------|
| 1 | `npx jest` | 78/78 |
| 2 | `validate-content.js` | ≤838 + documented delta |
| 3 | Antechamber roll | No silent failure (lore roll, not invalid skill) |
| 4 | SKILL_LABELS | HUD shows "Might" not "Combat" |
| 5 | Active trait at index 1+ | `used: false` after sleep |
| 6 | Travel encounters | Fire in corridor with Stage I flag set |
| 7 | SCOPE_REVEAL | Fires when investigationProgress ≥ 5 |
| 8 | SHADOW_LEDGER_HINTS | Fires when pressure/watchfulness hit threshold |
| 9 | Watchfulness/heat HUD | Bar-track style bars visible above skill bars when > 0 |
| 10 | Consumable count | Badge appears when ≥1 consumable in inventory |
| 11 | Shop | All 15+ localities have ≥3 items |
| 12 | Nomdara shop | Opens with mobile goods when entering caravan |
| 13 | Starting armor | All 4 archetype groups have armor in G.equipped on new game |
| 14 | Consumable Use | Clicking Use removes item and applies healAmount or tempBonus |
| 15 | Sideplot hooks | Shelkopolis/Cosmoria/Fairhaven hooks appear in choice pool |
| 16 | Sideplot combat | Bold harbor/mill choices trigger enterCombat |
| 17 | Guildheart sideplot | Only available in Stage II |
| 18 | Stage 2 labels | No label over 15 words (±8 char) |
| 19 | Forbidden words | "investigate"/"meaningful"/"you feel" absent from result strings |
| 20 | prioritizeChoices() | loadStageChoices() caps at 5 choices |
| 21 | btn-howto in-game | Click "How to Play" topbar button → modal opens |
| 22 | Sleep cost display | Both inn choices show gold cost before selecting |
| 23 | Camp menu groups | Rest/Sleep distinct icons; Craft/Companions show level gate; Post Watches hidden when no companion; Camp Outside hidden in settlement |
| 24 | Healer shrine narration | Locality-canon religion text in `seekProfessionalCare()`; Healer archetype gets shrine-labor scene + half tithing |

---

## Phase 14 — Level Up System

### Task 14.1 — Wire getLevelUpSkillCount() + level-up continuation choices

**File:** `ledger-of-ash.html`

**Context:** `showLevelUpScreen()` at line ~11111 hardcodes `const totalStatPicks = G.level <= 10 ? 1 : 3` and never calls `getLevelUpSkillCount()` at line ~11261. The dead function returns a scaled count (2–5 based on level bracket). Decision: `getLevelUpSkillCount()` is the canonical source — replace the hardcode.

Also: after level-up, the screen closes but renderChoices is not called. Player is left with the previous stale choice set. Add two continuation choices that fire immediately after `_finalizeLevelUp()` completes.

- [ ] Grep `const totalStatPicks` in `showLevelUpScreen()` — replace with:
```javascript
var totalStatPicks = (typeof getLevelUpSkillCount === 'function') ? getLevelUpSkillCount() : (G.level <= 10 ? 1 : 3);
```
- [ ] In `_finalizeLevelUp()`, after all stat/trait application, call `loadStageChoices()` to refresh the choice pool AND render two post-levelup choices:
```javascript
// Post level-up continuation
G.lastResult = 'Level ' + G.level + '. The path ahead is clearer — or the stakes are higher. Either way, you are more capable of meeting them.';
if (typeof renderNarration === 'function') renderNarration();
(window._rawRenderChoices || window.renderChoices)([
  {
    id: 'levelup_continue_investigation',
    text: 'The new capability changes how you approach what\'s ahead.',
    tag: 'safe',
    action: function() {
      G.recentOutcomeType = 'discovery';
      addJournal('Level ' + G.level + ' reached. Capabilities expanded.', 'intelligence');
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  },
  {
    id: 'levelup_review_situation',
    text: 'Take stock before the next move.',
    tag: 'safe',
    action: function() {
      G.recentOutcomeType = 'intelligence';
      addJournal('Level ' + G.level + '. Reviewing the current situation.', 'intelligence');
      if (typeof loadStageChoices === 'function') loadStageChoices();
    }
  }
]);
```
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: level-up uses getLevelUpSkillCount() + post-levelup continuation choices`

---

### Task 14.2 — HP on level up

**File:** `ledger-of-ash.html`

**Context:** Currently no HP is gained on level up. `G.maxHp` is set at character creation and never increases. Add +8 HP per level as a baseline, with the Support archetype family receiving +12 HP per level (their role is survival).

- [ ] In `_finalizeLevelUp()`, before or after stat/trait application, add:
```javascript
// HP growth on level up
var hpGain = (G.archetype && G.archetype.family === 'support') ? 12 : 8;
G.maxHp = (G.maxHp || 20) + hpGain;
G.hp = Math.min(G.maxHp, (G.hp || 0) + hpGain); // also heal partial on level up
```
- [ ] In `renderCharacterSheet()`, verify `G.maxHp` is displayed alongside current `G.hp` in the HP row. If only `G.hp` is shown, change to `G.hp + ' / ' + G.maxHp`.
- [ ] Add `maxHp: 20` to G defaults if not already present (grep to confirm)
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: HP gain on level up (+8 base, +12 Support archetype)`

---

### Task 14.3 — Training menu SKILL_LABELS fix (separate definition)

**File:** `ledger-of-ash.html`

**Context:** The training menu has its OWN separate `const SKILL_LABELS = {combat:'Combat', ...}` at ~line 12252. This is separate from the HUD definition fixed in Task 0.2. Both need the correct display names. Task 0.2 fixes the HUD one; this task fixes the training menu one.

- [ ] Grep `SKILL_LABELS` — find the definition at ~line 12252 (inside the training menu function scope)
- [ ] Update all 6 entries to display names:
```javascript
var SKILL_LABELS = {
  combat: 'Might', stealth: 'Finesse', survival: 'Vigor',
  lore: 'Wits', persuasion: 'Charm', craft: 'Spirit'
};
```
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `fix: training menu SKILL_LABELS — Might/Finesse/Vigor/Wits/Charm/Spirit`

---

## Phase 15 — NPC Conversations & Notice Board

### Task 15.1 — Wire LOCALITY_DATA npcData entries into conversational choices

**File:** `ledger-of-ash.html`

**Context:** `LOCALITY_DATA` has `npcData` arrays for most localities — objects with `{name, role, trust, skillReq, note}`. These are never surfaced as choices. Wire each entry as an optional conversational choice injected into `loadStageChoices()` when the player is in that locality and trust threshold is met.

This is a light choice-based system — not full multi-turn dialogue. One choice per NPC per visit, result text from the note field + authored scene beat. Sets `G.flags.met_[npcId]` on first encounter.

- [ ] Grep `npcData` in `LOCALITY_DATA` to confirm field name and structure. Identify the first 6 NPC-rich localities by npcData array length (likely Shelkopolis, Panim Haven, Soreheim Proper, Cosmoria, Guildheart Hub, Ithtananalor).
- [ ] In `loadStageChoices()`, after the main enriched pool is assembled, add NPC injection:
```javascript
// NPC conversation injection
var _localityNpcs = (LOCALITY_DATA[G.location] && LOCALITY_DATA[G.location].npcData) || [];
_localityNpcs.forEach(function(npc) {
  var npcId = npc.name.toLowerCase().replace(/\s+/g,'_');
  // Show once per visit unless already met at high trust
  var alreadyMet = G.flags['met_' + npcId];
  var trustMet = (G.renown || 0) >= (npc.trust || 0);
  var skillMet = !npc.skillReq || (G.skills && (G.skills[npc.skillReq] || 0) >= 2);
  if (trustMet && skillMet && !G.flags['npc_conv_done_' + npcId + '_' + G.dayCount]) {
    choices.push({
      cid: 'npc_conv_' + npcId,
      text: (npc.role || npc.name) + ' — ' + (npc.note || 'has something to say.').slice(0, 60),
      tags: ['NPC', 'Social'],
      plot: alreadyMet ? 'side' : 'side',
      result: function() {
        G.flags['met_' + npcId] = true;
        G.flags['npc_conv_done_' + npcId + '_' + G.dayCount] = true;
        G.lastResult = npc.note || (npc.name + ' speaks briefly. The conversation ends without resolution.');
        G.recentOutcomeType = 'intelligence';
        addJournal(G.lastResult, 'contact_made');
        if (typeof checkStageAdvance === 'function') checkStageAdvance();
      }
    });
  }
});
```
- [ ] Verify `npc_conv_done_[id]_[day]` prevents the same NPC choice from appearing twice on the same in-game day (visit-once gate)
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: NPC conversation choices from LOCALITY_DATA.npcData — trust-gated per-visit`

---

### Task 15.2 — Inn names for all 22 localities

**File:** `ledger-of-ash.html`

**Context:** `INN_NAMES` at line ~11891 covers 8 localities. ~14 localities fall through to `"a shared room at the local inn"`. Each locality needs canonical inn names (cheap + comfortable) that fit the polity flavor and architecture.

- [ ] Grep `INN_NAMES` to find the full object. Add the following entries for the 14 missing localities:
```javascript
// Missing locality inn data — add to INN_NAMES:
fairhaven: {
  cheap: 'The Road Gate Bunkhouse',
  comfortable: 'The Warden\'s Rest'
},
cosmoria: {
  cheap: 'The Tidal Anchor',
  comfortable: 'The Harbor Ledger House'
},
guildheart_hub: {
  cheap: 'The Guild Floor',
  comfortable: 'The Arbitration Suite'
},
panim_haven: {
  cheap: 'The Memorial Ward',
  comfortable: 'The Offering House'
},
ithtananalor: {
  cheap: 'The Roazian Billet',
  comfortable: 'The Inspection Quarters'
},
mimolot_academy: {
  cheap: 'The Student Annex',
  comfortable: 'The Examiner\'s Lodge'
},
shirshal: {
  cheap: 'The Evidence Quarter',
  comfortable: 'The Magistratus Rest House'
},
harvest_circle: {
  cheap: 'The Granary Floor',
  comfortable: 'The Board House'
},
glasswake_commune: {
  cheap: 'The Dome Bunk',
  comfortable: 'The Commune Chamber'
},
aurora_crown_commune: {
  cheap: 'The Aurora Billet',
  comfortable: 'The Commune Inner Lodge'
},
unity_square: {
  cheap: 'The Open Floor',
  comfortable: 'The Guild Charter Room'
},
whitebridge_commune: {
  cheap: 'The Crossing Bunk',
  comfortable: 'The Bridgekeeper\'s Room'
},
craftspire: {
  cheap: 'The Workshop Annex',
  comfortable: 'The Spire Quarters'
},
ironhold_quarry: {
  cheap: 'The Quarry Bunk',
  comfortable: 'The Foreman\'s Lodge'
},
plumes_end_outpost: {
  cheap: 'The Patrol Floor',
  comfortable: 'The Outpost Officer\'s Room'
},
sunspire_haven: {
  cheap: 'The Haven Bunk',
  comfortable: 'The Watchtower Suite'
}
```
- [ ] In `doSleepScene()`, verify the fallback `"a shared room at the local inn"` only fires when the locality is truly not in `INN_NAMES` — not as the default for any missed case
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: inn names for all 22 localities — no more generic fallback for named settlements`

---

### Task 15.3 — Notice board new-notice signal

**File:** `ledger-of-ash.html`

**Context:** `addNotice()` and `updateNoticeBoard()` are wired. When a new notice is posted, the player has no signal that the notice board has new content. Add a badge/indicator that appears on the "Notices" button in the HUD or topbar when `G.newNoticeCount > 0`, clears when the board is opened.

- [ ] Add `newNoticeCount: 0` to G defaults
- [ ] In `addNotice()`, after adding the notice: `G.newNoticeCount = (G.newNoticeCount || 0) + 1; if (typeof updateHUD === 'function') updateHUD();`
- [ ] In `updateHUD()`, find the Notices button or link. Add a badge span:
```javascript
var _noticeBtn = document.getElementById('btn-notices'); // grep for actual ID
if (_noticeBtn) {
  var _badge = _noticeBtn.querySelector('.notice-badge') || (function() {
    var b = document.createElement('span');
    b.className = 'notice-badge';
    _noticeBtn.appendChild(b);
    return b;
  })();
  _badge.textContent = G.newNoticeCount > 0 ? G.newNoticeCount : '';
  _badge.style.display = G.newNoticeCount > 0 ? 'inline-block' : 'none';
}
```
- [ ] In the function that opens the notice board (grep `showNoticeBoard\|openNotices`): add `G.newNoticeCount = 0; updateHUD();` at the top to clear the badge on open
- [ ] CSS for `.notice-badge`: `background: var(--danger); color: #fff; border-radius: 50%; font-size: 9px; padding: 1px 4px; margin-left: 4px; font-family: var(--font-body); vertical-align: middle;`
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: notice board new-notice badge — clears on open`

---

## Phase 16 — Active Trait HUD Indicator

### Task 16.1 — Active trait availability indicator in HUD

**File:** `ledger-of-ash.html`

**Context:** Active and investigation traits (`traitType !== 'passive'`) are reset on rest (fixed in Task 0.3) but their used/available state is never shown in the HUD — only visible in the character sheet. Players don't know they have active traits available between uses.

Show a compact trait indicator in the HUD only when the player has ≥1 non-passive trait. Format: `TRAITS: 2/3 READY` (available/total non-passive count). On rest, the count resets visually.

- [ ] In `updateHUD()`, compute trait availability:
```javascript
var _nonPassive = (G.traits || []).filter(function(t){ return t.traitType !== 'passive'; });
var _ready = _nonPassive.filter(function(t){ return !t.used; }).length;
var _traitEl = document.getElementById('hud-trait-ready');
if (_traitEl) {
  if (_nonPassive.length > 0) {
    _traitEl.textContent = 'TRAITS ' + _ready + '/' + _nonPassive.length + ' READY';
    _traitEl.style.display = '';
    _traitEl.style.color = _ready > 0 ? 'var(--jade-bright)' : 'var(--ink-faint)';
  } else {
    _traitEl.style.display = 'none';
  }
}
```
- [ ] Add `<div id="hud-trait-ready" style="display:none; font-family:var(--font-body); font-size:10px; letter-spacing:0.06em; padding: 2px 14px;"></div>` in `.l-vitals-footer` or just above `.l-skills`
- [ ] Mirror in `renderCharacterSheet()` — trait availability row in the same area as skills
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: active trait HUD indicator — N/total ready, clears on rest`

---

## Phase 17 — Journey Fatigue Display

### Task 17.1 — Fatigue stat visible in HUD

**File:** `ledger-of-ash.html`

**Context:** `G.fatigue` (0–10) and `G.journeyFatigue` accumulate during travel. A `-1 to all rolls` env-pill appears at `G.fatigue >= 5` but there is no numeric fatigue display — players don't know how close they are to the penalty threshold until it hits. Add fatigue as a labeled counter in the HUD, shown only when `G.fatigue > 0`.

- [ ] In `updateHUD()`, add fatigue display:
```javascript
var _fatigue = G.fatigue || 0;
var _fatigueEl = document.getElementById('hud-fatigue');
if (_fatigueEl) {
  _fatigueEl.textContent = _fatigue > 0 ? 'FATIGUE ' + _fatigue + '/10' : '';
  _fatigueEl.style.display = _fatigue > 0 ? '' : 'none';
  _fatigueEl.style.color = _fatigue >= 5 ? 'var(--danger)' : 'var(--ink-faint)';
}
```
- [ ] Add `<div id="hud-fatigue" style="display:none; font-family:var(--font-body); font-size:10px; letter-spacing:0.06em; padding: 2px 14px;"></div>` near the pressure bars section
- [ ] Mirror in `renderCharacterSheet()` — fatigue row under vitals
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: fatigue stat visible in HUD — shows N/10, danger color at 5+`

---

## Phase 18 — Character Sheet Trait Tab

### Task 18.1 — Dedicated Traits section in character sheet

**File:** `ledger-of-ash.html`

**Context:** Traits are currently listed inline in the Overview tab of the character sheet. With 3–6 traits by mid-game, they crowd the overview. Move traits to a distinct labeled section. The character sheet uses tab navigation — add a "Traits" row between Skills and Journal (or as a collapsible section within Overview if tab structure is complex to modify).

- [ ] Grep `renderCharacterSheet\|showCharSheet` to find where traits are rendered. Identify the trait rendering block.
- [ ] Wrap the trait rendering block in a dedicated section:
```javascript
// Traits section header
html += '<div class="cs-section-label">TRAITS</div>';
(G.traits || []).forEach(function(t) {
  var typeLabel = t.traitType === 'passive' ? 'Passive' : t.traitType === 'active' ? 'Active — 1/rest' : 'Investigation — 1/scene';
  var usedLabel = (t.traitType !== 'passive' && t.used) ? ' <span style="color:var(--ink-faint)">(used)</span>' : '';
  html += '<div class="trait-row"><div class="trait-name">' + t.name + usedLabel + '</div>';
  html += '<div class="trait-type-label">' + typeLabel + '</div>';
  html += '<div class="trait-desc">' + (t.description || '') + '</div></div>';
});
if (!G.traits || G.traits.length === 0) {
  html += '<div class="trait-empty">No traits unlocked yet.</div>';
}
```
- [ ] Add CSS: `.cs-section-label { font-family: var(--font-display); font-size: 9px; letter-spacing: 0.12em; color: var(--ink-faint); text-transform: uppercase; margin: 12px 0 4px; }` `.trait-row { margin-bottom: 8px; }` `.trait-name { font-family: var(--font-display); font-size: 12px; color: var(--accent-gold); }` `.trait-type-label { font-family: var(--font-body); font-size: 10px; color: var(--ink-faint); }` `.trait-desc { font-family: var(--font-body); font-size: 12px; color: var(--ink); }`
- [ ] Remove the old trait rendering from the Overview section to avoid duplication
- [ ] `npx jest` — 78/78 pass
- [ ] Commit: `feat: character sheet dedicated Traits section — type labels, used state, empty state`

---

## Phase 19 — Verification Extension

| # | Check | Pass Condition |
|---|-------|---------------|
| 25 | Level-up stat picks | Uses `getLevelUpSkillCount()` result, not hardcoded 1 |
| 26 | Post-level-up choices | Two choices appear after level screen closes |
| 27 | HP on level up | `G.maxHp` increases by 8 (or 12 for Support) after level |
| 28 | Training menu labels | Shows "Might"/"Finesse"/"Vigor"/"Wits"/"Charm"/"Spirit" |
| 29 | NPC conversation | At least 1 NPC choice appears in Shelkopolis when renown ≥ npc.trust |
| 30 | Inn names | All 22 named localities show canonical inn name, not generic fallback |
| 31 | Notice badge | Badge appears on notices button after `addNotice()` fires; clears on open |
| 32 | Active trait HUD | "TRAITS N/M READY" appears when non-passive traits exist |
| 33 | Fatigue HUD | "FATIGUE N/10" appears when `G.fatigue > 0`; danger color at ≥5 |
| 34 | Character sheet traits | Traits have own labeled section with type and used state |

---

## File Registry

### Modified
- `ledger-of-ash.html` — Phases 0, 1, 2, 3, 4, 6, 8, 9, 14, 15, 16, 17, 18 (SHOP_INVENTORY, HUD CSS/JS, choice system, tutorial, gear, balance, level-up, NPC convos, inn names, notices, traits)
- `content/stage2_antechamber.js` — Task 0.1
- `content/*_stage1_enriched_choices.js` (9 files) — Task 10.3 (forward hooks)
- `content/*_stage2_enriched_choices.js` (22 files) — Task 10.1 (labels), 10.2 (forbidden words)

### Created
- `content/sideplots/shelk_fairhaven_ledger_shadow.js`
- `content/sideplots/cosmoria_harbor_weight_fraud.js`
- `content/sideplots/fairhaven_meadow_mill_displacement.js`
- `content/sideplots/guildheart_union_testimony_gap.js`

---

## Phase CB — Character Build System Overhaul

**Goal:** Fix the broken three-tier character system (Stats / Active Skills / Passive Traits), wire all mechanics end-to-end, author all 21 missing archetype trait pools, and extend masteryXP training to cover active skill and passive trait acquisition.

**Architecture:** All changes in `ledger-of-ash.html`. No new files. Skills canonical keys migrate from internal names (combat/stealth/survival/lore/persuasion/craft) to display-name keys (might/finesse/vigor/wits/charm/spirit). Three core loops that are currently dead get wired: stat investment → roll expression, level-up → trait power, training → stronger outcomes.

---

### Task CB1 — Skills Architecture Fix (canonical key migration)

**Files:** `ledger-of-ash.html`

**Context:** `G.skills` keys were renamed from internal (combat/stealth/survival/lore/persuasion/craft) to display names (might/finesse/vigor/wits/charm/spirit) in a save/load migration at ~line 13139, but the rest of the runtime still reads old internal keys — so all stats silently return 0. `rollD20` never reads `G.skills` at all. `getTraitBonus` reads `G.traits` (background objects), not `G.unlockedTraits` (level-up IDs) — so level-up traits never apply bonuses.

**Fix CB1.1 — ARCHETYPES array: replace internal key values with display-name keys**

At ~line 3822, the `ARCHETYPES` array has entries like:
```javascript
{ id:'warrior', skills:{ combat:3, stealth:1, survival:2, lore:1, persuasion:1, craft:1 } }
```

Replace ALL 31 archetype `skills` objects — change every key:
- `combat` → `might`
- `stealth` → `finesse`
- `survival` → `vigor`
- `lore` → `wits`
- `persuasion` → `charm`
- `craft` → `spirit`

Also update G defaults (wherever `G.skills` is initialized in `selectArchetype()` at ~line 8787) to use display-name keys.

Also update `showTrainingMenu()` at ~line 12231 — the array `['combat','stealth','survival','lore','persuasion','craft']` becomes `['might','finesse','vigor','wits','charm','spirit']`. The display-name labels already exist — just match the keys.

Also update `renderCharacterSheet()` and `updateHUD()` skill rows to use display-name keys.

Also update save/load migration guard (~line 13139) to be conditional: only run if old keys are present (backwards compat for existing saves), then delete old keys and set new ones. Pattern:
```javascript
if (loaded.skills && loaded.skills.combat !== undefined && loaded.skills.might === undefined) {
  loaded.skills.might   = loaded.skills.combat    || 0; delete loaded.skills.combat;
  loaded.skills.finesse = loaded.skills.stealth   || 0; delete loaded.skills.stealth;
  loaded.skills.vigor   = loaded.skills.survival  || 0; delete loaded.skills.survival;
  loaded.skills.wits    = loaded.skills.lore      || 0; delete loaded.skills.lore;
  loaded.skills.charm   = loaded.skills.persuasion|| 0; delete loaded.skills.persuasion;
  loaded.skills.spirit  = loaded.skills.craft     || 0; delete loaded.skills.craft;
}
```

- [ ] Grep `ARCHETYPES` array (~line 3822), replace all 31 archetype `skills` objects with display-name keys.
- [ ] Grep `G.skills = {` in `selectArchetype()` (~line 8787), update initialization to display-name keys.
- [ ] Update `showTrainingMenu()` keys array (~line 12231).
- [ ] Update `renderCharacterSheet()` and `updateHUD()` to read display-name keys.
- [ ] Update save/load migration to conditional guard (only fires when old keys detected).
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `fix: G.skills canonical key migration — combat→might, stealth→finesse, survival→vigor, lore→wits, persuasion→charm, craft→spirit`

**Fix CB1.2 — rollD20: auto-add G.skills[skill] stat value**

At ~line 10141, `rollD20(skill, bonus)` never reads `G.skills`. After this fix it adds the relevant stat automatically. Replace the function body:

```javascript
function rollD20(skill, bonus) {
  var roll = Math.floor(Math.random() * 20) + 1;
  var statValue = (typeof G !== 'undefined' && G && G.skills && typeof G.skills[skill] === 'number') ? G.skills[skill] : 0;
  var penalty = (typeof G !== 'undefined' && G && G._rivalDCPenalty) ? G._rivalDCPenalty : 0;
  var sleepless = (typeof G !== 'undefined' && G && G.consecutiveSleepless) ? Math.min(G.consecutiveSleepless, 3) : 0;
  var campoutMod = (G && G._campoutPenalty && G.dayCount === (G.campoutDay + 1) && (skill === 'might' || skill === 'vigor')) ? 1 : 0;
  var travelFatiguedMod = (G && G.flags && G.flags.travel_fatigued) ? 1 : 0;
  var total = roll + statValue + (bonus || 0) - penalty - sleepless - campoutMod - travelFatiguedMod;
  return { roll: roll, total: total, isCrit: roll === 20, isFumble: roll === 1 };
}
```

Note: `campoutMod` now checks `'might'` and `'vigor'` (display-name keys) not the old internal keys.

- [ ] Replace `rollD20` function body (~line 10141) with the code above.
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `fix: rollD20 reads G.skills stat value automatically — stats now affect rolls`

**Fix CB1.3 — _finalizeLevelUp: push full trait object to G.traits**

At ~line 11212, `_finalizeLevelUp()` pushes trait IDs to `G.unlockedTraits` but never pushes objects to `G.traits`. `getTraitBonus()` reads `G.traits` — so level-up traits never apply bonuses. After `G.unlockedTraits.push(trait.id)`, add:

```javascript
G.traits = G.traits || [];
if (!G.traits.find(function(t){ return t.id === trait.id; })) {
  G.traits.push({
    name: trait.name || trait.id,
    description: trait.desc || '',
    traitType: trait.traitType || 'passive',
    activeSkillType: trait.activeSkillType || null,
    source: 'levelup',
    passive: trait.traitType === 'passive',
    skillBonus: trait.skillBonus || null,
    bonus: trait.bonus || 0,
    skill: trait.bonusSkill || null,
    used: false,
    id: trait.id
  });
}
```

- [ ] Add the G.traits push block after `G.unlockedTraits.push(trait.id)` in `_finalizeLevelUp()`.
- [ ] Add `traitProgress: {}` to G defaults object (needed by CB3).
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `fix: _finalizeLevelUp pushes full trait object to G.traits — level-up bonuses now apply`

**Fix CB1.4 — getTraitBonus: support HP-threshold conditional traits**

At ~line 10535, `getTraitBonus(skill)` sums all `G.traits` bonuses matching skill. Extend to check `trait.condition` field for HP-threshold passives:

```javascript
function getTraitBonus(skill) {
  if (!G || !G.traits) return 0;
  return G.traits.reduce(function(sum, t) {
    if (!t || t.skill !== skill || !t.bonus) return sum;
    if (t.condition === 'hp_low' && G.hp > Math.floor((G.maxHp || 20) * 0.4)) return sum;
    if (t.condition === 'hp_critical' && G.hp > Math.floor((G.maxHp || 20) * 0.2)) return sum;
    return sum + t.bonus;
  }, 0);
}
```

- [ ] Replace `getTraitBonus` (~line 10535) with the version above.
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `feat: getTraitBonus HP-threshold conditional traits (hp_low ≤40%, hp_critical ≤20%)`

---

### Task CB2 — Active Skill System Infrastructure

**Files:** `ledger-of-ash.html`

**Context:** Two separate active ability systems exist: `ARCHETYPE_COMBAT_ABILITIES` (wired to combat phase buttons) and `ARCHETYPE_TRAIT_POOLS` (level-up tracked, but mechanically dead). Active skills need to be split into Combative (fires in combat) and Utility (fires from character sheet Use button). This task wires both paths.

**Fix CB2.1 — Add activeSkillType field to existing active traits in ARCHETYPE_TRAIT_POOLS**

At ~line 3075, `ARCHETYPE_TRAIT_POOLS` has traits like `{ id:'battle_fury', name:'Battle Fury', traitType:'active', ... }` without `activeSkillType`. Add `activeSkillType` to all existing active traits:

Combative (fires in combat, skill-based): `battle_fury`, `shield_wall`, `power_strike`, `whirlwind`, `battle_cry`, `arcane_missile`, `mana_shield`, `healing_touch`, `divine_smite`, `shadow_strike`, `vanish`

Utility (fires from sheet Use button, locality-only): `tactical_assessment`, `field_medicine`, `arcane_analysis`, `divine_guidance`, `identify_weaknesses`

- [ ] Grep `ARCHETYPE_TRAIT_POOLS` (~line 3075). For every trait with `traitType:'active'`: add `activeSkillType: 'combative'` or `activeSkillType: 'utility'` per the lists above.
- [ ] `npx jest` — 78/78 pass.

**Fix CB2.2 — Unlocked combative active skills appear in combat phase buttons**

In the combat phase rendering (grep `renderCombatChoices` or `showCombatActions`), after the standard Press/Defend/Talk/Retreat buttons, inject buttons for each unlocked combative active skill:

```javascript
// After standard combat buttons render:
var combativeSkills = (G.traits || []).filter(function(t) {
  return t.traitType === 'active' && t.activeSkillType === 'combative' && !t.used;
});
combativeSkills.forEach(function(skill) {
  var btn = document.createElement('button');
  btn.className = 'choice-btn combat-lv1';
  btn.textContent = skill.name + ' (Active)';
  btn.onclick = function() { useCombativeSkill(skill.id); };
  choiceContainer.appendChild(btn);
});
```

Add `useCombativeSkill(skillId)` function: finds trait in `G.traits`, rolls `rollD20(trait.skill || 'might', trait.bonus || 0)` vs DC 12, applies effect (damage boost, status, etc.), sets `trait.used = true` until next rest.

```javascript
function useCombativeSkill(skillId) {
  var trait = (G.traits || []).find(function(t){ return t.id === skillId; });
  if (!trait || trait.used) return;
  var r = rollD20(trait.skill || 'might', trait.bonus || 0);
  trait.used = true;
  if (r.isCrit) {
    G.lastResult = trait.name + ': Critical activation — ' + (trait.critEffect || 'the skill fires with full force.');
  } else if (r.total >= 12) {
    G.lastResult = trait.name + ': ' + (trait.successEffect || 'The skill lands cleanly.');
  } else {
    G.lastResult = trait.name + ': ' + (trait.failEffect || 'The attempt falls short but costs nothing.');
    trait.used = false; // fumble: no use cost on outright fail
  }
  addJournal(G.lastResult, 'evidence');
  if (typeof updateHUD === 'function') updateHUD();
  if (typeof renderChoices === 'function') renderChoices(window._lastCombatChoices || []);
}
```

- [ ] Add combative skill injection to combat button render.
- [ ] Add `useCombativeSkill(skillId)` function.
- [ ] `npx jest` — 78/78 pass.

**Fix CB2.3 — Utility active skills: character sheet Use button**

In `renderCharacterSheet()` (~line 10418), in the traits section, render a "Use" button next to each unlocked utility active skill:

```javascript
// In renderCharacterSheet trait loop:
if (t.traitType === 'active' && t.activeSkillType === 'utility' && !t.used) {
  var useBtn = document.createElement('button');
  useBtn.className = 'choice-btn deescalate';
  useBtn.textContent = 'Use: ' + t.name;
  useBtn.style.fontSize = '12px';
  useBtn.style.marginTop = '4px';
  useBtn.onclick = function(traitId) {
    return function() { useUtilitySkill(traitId); };
  }(t.id);
  traitEl.appendChild(useBtn);
}
```

Add `useUtilitySkill(skillId)` function: only fires when in a locality (not in combat). Injects a one-time choice into `window._lastChoicePool` and calls `renderChoices`:

```javascript
function useUtilitySkill(skillId) {
  if (G.flags && G.flags.in_combat) { addNarration('', 'Cannot use utility skills in combat.'); return; }
  var trait = (G.traits || []).find(function(t){ return t.id === skillId; });
  if (!trait || trait.used) return;
  trait.used = true;
  var injected = {
    cid: 'utility_' + skillId + '_' + Date.now(),
    text: trait.name + ' — ' + (trait.utilityLabel || trait.description || 'Apply your expertise.'),
    tag: 'safe',
    result: trait.utilityResult || 'Your ' + trait.name + ' reveals something the situation had not offered otherwise.',
    roll: { skill: trait.skill || 'wits', dc: 10 }
  };
  var pool = window._lastChoicePool ? window._lastChoicePool.concat([injected]) : [injected];
  (window._rawRenderChoices || window.renderChoices)(pool.slice(-5));
  if (typeof updateHUD === 'function') updateHUD();
}
```

- [ ] Add Use button to character sheet trait render for utility active skills.
- [ ] Add `useUtilitySkill(skillId)` function.
- [ ] Commit: `feat: active skill system — combative skills in combat buttons, utility skills via sheet Use button`

---

### Task CB3 — masteryXP Training Extension

**Files:** `ledger-of-ash.html`

**Context:** `G.masteryXP` already exists as XP overflow at the stage level cap. Training menu exists at ~line 12231 but only covers stats. This task extends training to also offer Active Skills and Passive Traits via mastery sessions funded by `G.masteryXP` (10 XP per session, 3 sessions = unlock).

**Fix CB3.1 — G defaults: add traitProgress**

In the G defaults object (~line 8787 in `selectArchetype()`), ensure:
```javascript
traitProgress: {},   // { traitId: 0-3 sessions completed }
masteryXP: 0,        // already exists — verify it's there, add if missing
```

- [ ] Grep G defaults, add `traitProgress: {}` if absent. Verify `masteryXP: 0` exists.
- [ ] `npx jest` — 78/78 pass.

**Fix CB3.2 — Extended training menu: Active Skills + Passive Traits sections**

In `showTrainingMenu()` (~line 12231), after the existing stat training section, add two new sections:

```javascript
// --- ACTIVE SKILLS MASTERY ---
var activeTraits = _getAvailableMasteryTraits('active');
if (activeTraits.length > 0) {
  html += '<h4 style="color:var(--accent-gold);margin:12px 0 6px;">Active Skills</h4>';
  activeTraits.forEach(function(t) {
    var prog = G.traitProgress[t.id] || 0;
    var cost = 10;
    var canTrain = (G.masteryXP || 0) >= cost && prog < 3;
    html += '<div class="training-row">';
    html += '<span>' + t.name + ' (' + prog + '/3 sessions)</span>';
    if (canTrain) {
      html += '<button onclick="trainMastery(\'' + t.id + '\')">' + cost + ' MXP</button>';
    } else if (prog >= 3) {
      html += '<span style="color:var(--jade)">Unlocked</span>';
    } else {
      html += '<span style="color:var(--ink-faint)">Need ' + cost + ' MXP</span>';
    }
    html += '</div>';
  });
}

// --- PASSIVE TRAITS MASTERY ---
var passiveTraits = _getAvailableMasteryTraits('passive');
if (passiveTraits.length > 0) {
  html += '<h4 style="color:var(--accent-gold);margin:12px 0 6px;">Passive Traits</h4>';
  passiveTraits.forEach(function(t) {
    var prog = G.traitProgress[t.id] || 0;
    var cost = 10;
    var canTrain = (G.masteryXP || 0) >= cost && prog < 3;
    html += '<div class="training-row">';
    html += '<span>' + t.name + ' (' + prog + '/3 sessions)</span>';
    if (canTrain) {
      html += '<button onclick="trainMastery(\'' + t.id + '\')">' + cost + ' MXP</button>';
    } else if (prog >= 3) {
      html += '<span style="color:var(--jade)">Unlocked</span>';
    } else {
      html += '<span style="color:var(--ink-faint)">Need ' + cost + ' MXP</span>';
    }
    html += '</div>';
  });
}
```

Add helper `_getAvailableMasteryTraits(type)`: returns traits from the archetype's trait pool that are NOT yet in `G.unlockedTraits`, filtered by `traitType`:

```javascript
function _getAvailableMasteryTraits(type) {
  var archetypeId = G.archetype && G.archetype.id;
  var pool = (window.ARCHETYPE_TRAIT_POOLS && window.ARCHETYPE_TRAIT_POOLS[archetypeId])
    || (window.ARCHETYPE_TRAIT_POOLS && window.ARCHETYPE_TRAIT_POOLS['_default']) || [];
  return pool.filter(function(t) {
    return t.traitType === type && !(G.unlockedTraits || []).includes(t.id);
  });
}
```

Add `trainMastery(traitId)` function:

```javascript
function trainMastery(traitId) {
  var cost = 10;
  if ((G.masteryXP || 0) < cost) { addNarration('', 'Not enough Mastery XP.'); return; }
  G.masteryXP = (G.masteryXP || 0) - cost;
  G.traitProgress = G.traitProgress || {};
  G.traitProgress[traitId] = (G.traitProgress[traitId] || 0) + 1;
  var prog = G.traitProgress[traitId];
  G.lastResult = 'Training session complete. Progress toward mastery: ' + prog + '/3.';
  if (prog >= 3) {
    // Find trait object in pool and unlock
    var archetypeId = G.archetype && G.archetype.id;
    var pool = (window.ARCHETYPE_TRAIT_POOLS && window.ARCHETYPE_TRAIT_POOLS[archetypeId])
      || (window.ARCHETYPE_TRAIT_POOLS && window.ARCHETYPE_TRAIT_POOLS['_default']) || [];
    var trait = pool.find(function(t){ return t.id === traitId; });
    if (trait) {
      G.unlockedTraits = G.unlockedTraits || [];
      if (!G.unlockedTraits.includes(trait.id)) G.unlockedTraits.push(trait.id);
      G.traits = G.traits || [];
      if (!G.traits.find(function(t){ return t.id === trait.id; })) {
        G.traits.push({
          name: trait.name || trait.id,
          description: trait.desc || '',
          traitType: trait.traitType || 'passive',
          activeSkillType: trait.activeSkillType || null,
          source: 'mastery',
          passive: trait.traitType === 'passive',
          skillBonus: trait.skillBonus || null,
          bonus: trait.bonus || 0,
          skill: trait.bonusSkill || null,
          used: false,
          id: trait.id
        });
      }
      G.lastResult = trait.name + ' unlocked via mastery training.';
      addWorldNotice('You have mastered: ' + trait.name + '.');
    }
  }
  addJournal(G.lastResult, 'discovery');
  if (typeof updateHUD === 'function') updateHUD();
  if (typeof showTrainingMenu === 'function') showTrainingMenu();
}
```

- [ ] Add `_getAvailableMasteryTraits(type)` helper function.
- [ ] Add `trainMastery(traitId)` function.
- [ ] Extend `showTrainingMenu()` with Active Skills + Passive Traits sections.
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `feat: masteryXP training extension — active skills and passive traits unlockable via 3-session mastery`

---

### Task CB4 — Vigor-Scaled HP at Level-Up

**Files:** `ledger-of-ash.html`

**Context:** `showLevelUpScreen()` at ~line 11111 hardcodes `const totalStatPicks = G.level <= 10 ? 1 : 3`. `getLevelUpSkillCount()` at ~line 11261 returns 2/3/4/5 by level bracket but is never called. This task wires Vigor into HP growth and fixes the stat pick count.

- [ ] In `_finalizeLevelUp()` (~line 11212), replace the HP gain line with:
  ```javascript
  var vigorBonus = Math.floor((G.skills.vigor || 0) / 2);
  var archetypeHpBonus = (G.archetype && G.archetype.family === 'Support') ? 3 : 0;
  var hpGain = 4 + vigorBonus + archetypeHpBonus;
  G.maxHp = (G.maxHp || 20) + hpGain;
  G.hp = Math.min(G.hp + hpGain, G.maxHp);
  ```
- [ ] In `showLevelUpScreen()` (~line 11111), replace `const totalStatPicks = G.level <= 10 ? 1 : 3` with `const totalStatPicks = getLevelUpSkillCount();` — this wires the existing but dead function.
- [ ] `getLevelUpSkillCount()` should return: level 1-4 = 1, level 5-9 = 2 (milestone pick at 5), level 10 = 3 (milestone pick at 10), level 11+ = 3. Verify or update the function body to match.
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `feat: Vigor-scaled HP at level-up + wire getLevelUpSkillCount() into showLevelUpScreen`

---

### Task CB5 — Stealth Mastery and Applied Craft Passive Traits

**Files:** `ledger-of-ash.html`

**Context:** Stealth (finesse skill) and Craft (spirit skill) are passive traits for specific archetypes — they boost those skill areas for archetypes where they fit thematically. These appear at level 2 via the level-up trait offer, not at character creation.

Add to `ARCHETYPE_TRAIT_POOLS` for the following archetypes:

**Stealth Mastery** (`id:'stealth_mastery'`, level 2 passive) — archetypes: Rogue, Assassin, Spellthief, Scout, Thief (NOT Trickster, NOT Beastmaster):
```javascript
{ id:'stealth_mastery', name:'Stealth Mastery', traitType:'passive',
  desc:'Your training in concealment runs deep. Finesse rolls for avoiding detection gain +2.',
  bonusSkill:'finesse', bonus:2, minLevel:2 }
```

**Applied Craft** (`id:'applied_craft'`, level 2 passive) — archetypes: Artificer, Engineer, Alchemist:
```javascript
{ id:'applied_craft', name:'Applied Craft', traitType:'passive',
  desc:'Your technical knowledge translates to practical advantage. Spirit rolls for crafting and device work gain +2.',
  bonusSkill:'spirit', bonus:2, minLevel:2 }
```

- [ ] Add `stealth_mastery` to ARCHETYPE_TRAIT_POOLS entries for: `rogue`, `assassin`, `spellthief`, `scout_c`, `thief`.
- [ ] Add `applied_craft` to ARCHETYPE_TRAIT_POOLS entries for: `artificer`, `engineer`, `alchemist`.
- [ ] In `showLevelUpScreen()`, filter trait offers to only show traits where `!trait.minLevel || G.level >= trait.minLevel`.
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `feat: Stealth Mastery (rogue family) and Applied Craft (craft family) passive traits at level 2`

---

### Task CB6 — Author All 21 Missing Archetype Trait Pools

**Files:** `ledger-of-ash.html` (ARCHETYPE_TRAIT_POOLS at ~line 3075)

**Context:** 21 of 31 archetypes fall back to `_default` (4 generic traits). This task authors complete pools for all 21. Each pool has 4-6 traits: a mix of passive bonuses, combative active skills, and utility active skills. All authored with full wiring fields (`traitType`, `activeSkillType`, `bonusSkill`, `bonus`, `successEffect`, `failEffect`, `critEffect`, `utilityResult`).

**Insert the following into `ARCHETYPE_TRAIT_POOLS` at ~line 3075, one entry per archetype ID:**

```javascript
// ── COMBAT ARCHETYPES ────────────────────────────────────────────────────

ARCHETYPE_TRAIT_POOLS['paladin'] = [
  { id:'divine_strike', name:'Divine Strike', traitType:'active', activeSkillType:'combative',
    desc:'Channel divine energy into a weapon strike.', minLevel:1,
    skill:'might', bonus:1,
    successEffect:'Sacred light burns through — the strike lands with authority.',
    failEffect:'The blessing falters. The blow lands normally.',
    critEffect:'Divine Strike erupts — allies in the scene feel the resonance.' },
  { id:'lay_on_hands', name:'Lay On Hands', traitType:'active', activeSkillType:'utility',
    desc:'Transfer healing energy to a wounded ally or yourself.', minLevel:1,
    skill:'charm', bonus:0, utilityLabel:'Lay hands on a wound.',
    utilityResult:'You draw on reserves of focused will. A wound closes — not entirely, but enough.' },
  { id:'aura_of_protection', name:'Aura of Protection', traitType:'passive',
    desc:'Your presence stabilizes those around you. Non-combat persuasion checks gain +1.',
    bonusSkill:'charm', bonus:1 },
  { id:'sacred_ground', name:'Sacred Ground', traitType:'passive',
    desc:'You fight better in places of moral clarity. When defending a known innocent, might rolls gain +1.',
    bonusSkill:'might', bonus:1 },
  { id:'holy_resilience', name:'Holy Resilience', traitType:'passive',
    desc:'Conviction sustains you past ordinary limits. At ≤40% HP, vigor checks gain +2.',
    bonusSkill:'vigor', bonus:2, condition:'hp_low' }
];

ARCHETYPE_TRAIT_POOLS['berserker'] = [
  { id:'rage', name:'Rage', traitType:'active', activeSkillType:'combative',
    desc:'Abandon defense for overwhelming offense. Might roll +3 but cannot defend this round.', minLevel:1,
    skill:'might', bonus:3,
    successEffect:'The blow is devastating — the enemy staggers.',
    failEffect:'The fury overreaches. You leave yourself open.',
    critEffect:'Frenzy: two strikes land simultaneously.' },
  { id:'berserker_endurance', name:'Berserker Endurance', traitType:'passive',
    desc:'Pain feeds the rage. At ≤40% HP, might rolls gain +2.',
    bonusSkill:'might', bonus:2, condition:'hp_low' },
  { id:'intimidating_presence', name:'Intimidating Presence', traitType:'passive',
    desc:'Your reputation for violence precedes you. Charm rolls to intimidate gain +2.',
    bonusSkill:'charm', bonus:2 },
  { id:'battle_trance', name:'Battle Trance', traitType:'passive',
    desc:'In extended combat your focus sharpens. After the second round of combat, vigor saves gain +1.',
    bonusSkill:'vigor', bonus:1 },
  { id:'warcry', name:'Warcry', traitType:'active', activeSkillType:'combative',
    desc:'A shout that breaks enemy formation.', minLevel:3,
    skill:'charm', bonus:0,
    successEffect:'The enemy hesitates — your next roll gains advantage.',
    failEffect:'The cry draws attention but changes nothing.',
    critEffect:'The warcry breaks one enemy\'s resolve entirely.' }
];

ARCHETYPE_TRAIT_POOLS['warden'] = [
  { id:'terrain_advantage', name:'Terrain Advantage', traitType:'active', activeSkillType:'combative',
    desc:'Use the environment to control the fight.', minLevel:1,
    skill:'wits', bonus:1,
    successEffect:'You redirect the fight to ground you chose — DC drops by 1 for this encounter.',
    failEffect:'The terrain read was wrong. No advantage.',
    critEffect:'Perfect positioning: you dictate the entire encounter\'s shape.' },
  { id:'nature_awareness', name:'Nature Awareness', traitType:'passive',
    desc:'Survival instinct is always on. Vigor checks in wilderness settings gain +2.',
    bonusSkill:'vigor', bonus:2 },
  { id:'rangers_eye', name:"Ranger's Eye", traitType:'active', activeSkillType:'utility',
    desc:'Assess a path or location for threats before entering.', minLevel:1,
    skill:'wits', bonus:0, utilityLabel:'Read the terrain ahead.',
    utilityResult:'You identify the pressure points before you step into them. One complication in the next choice becomes visible.' },
  { id:'animal_instinct', name:'Animal Instinct', traitType:'passive',
    desc:'You read threat before it forms. Wits checks to detect ambush gain +2.',
    bonusSkill:'wits', bonus:2 },
  { id:'forced_march', name:'Forced March', traitType:'passive',
    desc:'Distance doesn\'t break you. Vigor checks for travel fatigue gain +2.',
    bonusSkill:'vigor', bonus:2 }
];

ARCHETYPE_TRAIT_POOLS['warlord'] = [
  { id:'command_presence', name:'Command Presence', traitType:'active', activeSkillType:'combative',
    desc:'Tactical order that reorganizes the fight in your favor.', minLevel:1,
    skill:'charm', bonus:2,
    successEffect:'Your allies move with purpose — DC on the next action drops by 1.',
    failEffect:'The command doesn\'t land. Everyone acts independently.',
    critEffect:'Perfect execution — your side gains initiative for this round.' },
  { id:'tactical_mind', name:'Tactical Mind', traitType:'passive',
    desc:'Every situation is a problem to solve. Wits checks for planning gain +2.',
    bonusSkill:'wits', bonus:2 },
  { id:'field_assessment', name:'Field Assessment', traitType:'active', activeSkillType:'utility',
    desc:'Read a scene for threat vectors and opportunities before acting.', minLevel:1,
    skill:'wits', bonus:1, utilityLabel:'Assess the field.',
    utilityResult:'You read the room like a battle map. One hidden option in the next choice pool becomes visible.' },
  { id:'iron_discipline', name:'Iron Discipline', traitType:'passive',
    desc:'You perform under pressure. Charm rolls to maintain composure gain +1.',
    bonusSkill:'charm', bonus:1 },
  { id:'exploit_opening', name:'Exploit Opening', traitType:'active', activeSkillType:'combative',
    desc:'Punish any moment of enemy hesitation.', minLevel:3,
    skill:'might', bonus:2,
    successEffect:'The gap was there and you took it.',
    failEffect:'The opening closed before you reached it.',
    critEffect:'The strike exposes a deeper weakness — DC on follow-up drops by 2.' }
];

ARCHETYPE_TRAIT_POOLS['death_knight'] = [
  { id:'unholy_strike', name:'Unholy Strike', traitType:'active', activeSkillType:'combative',
    desc:'A blow infused with necrotic energy.', minLevel:1,
    skill:'might', bonus:2,
    successEffect:'The necrotic charge burns cold — the enemy staggers.',
    failEffect:'The charge dissipates. Strike lands normally.',
    critEffect:'The necrotic surge spreads — secondary enemies in range feel it.' },
  { id:'death_mark', name:'Death Mark', traitType:'active', activeSkillType:'combative',
    desc:'Mark an enemy — your next strike against them ignores 1 point of natural resistance.', minLevel:2,
    skill:'wits', bonus:0,
    successEffect:'The mark adheres. Your next strike against this target gains +2.',
    failEffect:'The mark fails to hold.',
    critEffect:'The mark pulses — all your attacks against this target gain +1 for the encounter.' },
  { id:'undying_will', name:'Undying Will', traitType:'passive',
    desc:'You persist past the threshold where others fall. At ≤20% HP, all rolls gain +2.',
    bonusSkill:'might', bonus:2, condition:'hp_critical' },
  { id:'cold_command', name:'Cold Command', traitType:'passive',
    desc:'Your authority carries death\'s weight. Charm rolls to intimidate gain +3.',
    bonusSkill:'charm', bonus:3 },
  { id:'necrotic_resilience', name:'Necrotic Resilience', traitType:'passive',
    desc:'The boundary between living and dead makes you difficult to kill. Max HP +4 (applied at next level-up).',
    bonusSkill:'vigor', bonus:1 }
];

// ── MAGIC ARCHETYPES ─────────────────────────────────────────────────────

ARCHETYPE_TRAIT_POOLS['cleric'] = [
  { id:'channel_divinity', name:'Channel Divinity', traitType:'active', activeSkillType:'combative',
    desc:'Focus divine power into a direct effect — healing or harm depending on alignment.', minLevel:1,
    skill:'charm', bonus:2,
    successEffect:'The channel flows cleanly — you choose its direction.',
    failEffect:'The divine link wavers. No effect this round.',
    critEffect:'Perfect conduit — the effect is doubled in intensity.' },
  { id:'sacred_word', name:'Sacred Word', traitType:'active', activeSkillType:'utility',
    desc:'Speak a word of power to stabilize a situation, calm a crowd, or open a closed door.', minLevel:1,
    skill:'charm', bonus:1, utilityLabel:'Speak the sacred word.',
    utilityResult:'The word lands with institutional weight. One obstacle in the current scene yields.' },
  { id:'divine_insight', name:'Divine Insight', traitType:'passive',
    desc:'The divine current gives you access to truths others miss. Wits rolls for hidden information gain +1.',
    bonusSkill:'wits', bonus:1 },
  { id:'resilience_of_faith', name:'Resilience of Faith', traitType:'passive',
    desc:'Faith sustains. Vigor checks at ≤40% HP gain +2.',
    bonusSkill:'vigor', bonus:2, condition:'hp_low' },
  { id:'blessed_ground', name:'Blessed Ground', traitType:'passive',
    desc:'Consecrated space amplifies your work. Spirit rolls in sacred or institutional sites gain +1.',
    bonusSkill:'spirit', bonus:1 }
];

ARCHETYPE_TRAIT_POOLS['priest'] = [
  { id:'holy_word', name:'Holy Word', traitType:'active', activeSkillType:'combative',
    desc:'A binding command that disrupts an opponent\'s next action.', minLevel:1,
    skill:'charm', bonus:2,
    successEffect:'The command lands — the opponent loses initiative this round.',
    failEffect:'The word disperses. The opponent continues.',
    critEffect:'The holy word resonates beyond the target — area effect.' },
  { id:'intercessory_prayer', name:'Intercessory Prayer', traitType:'active', activeSkillType:'utility',
    desc:'Call on institutional or divine authority to open a path normally closed.', minLevel:1,
    skill:'charm', bonus:1, utilityLabel:'Invoke institutional standing.',
    utilityResult:'Your clergy credentials open what locked itself against others. One information path clears.' },
  { id:'doctrine_shield', name:'Doctrine Shield', traitType:'passive',
    desc:'Canonical knowledge protects against deception. Wits rolls to detect manipulation gain +2.',
    bonusSkill:'wits', bonus:2 },
  { id:'pastoral_calm', name:'Pastoral Calm', traitType:'passive',
    desc:'Your presence reduces aggression. Charm rolls in fraught social situations gain +1.',
    bonusSkill:'charm', bonus:1 },
  { id:'liturgical_memory', name:'Liturgical Memory', traitType:'passive',
    desc:'Ceremonial text is indexed in your memory. Wits rolls for lore checks gain +1.',
    bonusSkill:'wits', bonus:1 }
];

ARCHETYPE_TRAIT_POOLS['necromancer'] = [
  { id:'life_drain', name:'Life Drain', traitType:'active', activeSkillType:'combative',
    desc:'Draw vitality from an opponent to sustain yourself.', minLevel:1,
    skill:'wits', bonus:1,
    successEffect:'Vitality flows toward you — you recover 3 HP.',
    failEffect:'The drain fails to attach. No effect.',
    critEffect:'The drain overwhelms — you recover 6 HP and the target is weakened.' },
  { id:'animate_shadow', name:'Animate Shadow', traitType:'active', activeSkillType:'combative',
    desc:'Weaponize ambient shadow as a distraction or pressure source.', minLevel:2,
    skill:'wits', bonus:2,
    successEffect:'The shadow moves against the target — their next roll loses 1.',
    failEffect:'Shadow is just shadow today.',
    critEffect:'The animated shadow attacks independently — counts as a second action.' },
  { id:'deathsense', name:'Deathsense', traitType:'active', activeSkillType:'utility',
    desc:'Read the death-history of a location or object.', minLevel:1,
    skill:'wits', bonus:0, utilityLabel:'Read what has died here.',
    utilityResult:'The residue speaks. You learn one piece of evidence a living investigator would have missed.' },
  { id:'necrotic_constitution', name:'Necrotic Constitution', traitType:'passive',
    desc:'Familiarity with death makes you harder to kill. At ≤20% HP, vigor checks gain +3.',
    bonusSkill:'vigor', bonus:3, condition:'hp_critical' },
  { id:'cold_calculation', name:'Cold Calculation', traitType:'passive',
    desc:'Detachment sharpens analysis. Wits checks in high-emotion situations gain +1.',
    bonusSkill:'wits', bonus:1 }
];

ARCHETYPE_TRAIT_POOLS['illusionist'] = [
  { id:'phantom_strike', name:'Phantom Strike', traitType:'active', activeSkillType:'combative',
    desc:'A strike that arrives from an unexpected direction — illusory doubles confuse the target.', minLevel:1,
    skill:'finesse', bonus:2,
    successEffect:'The double-image works — the target defends the wrong direction.',
    failEffect:'The illusion collapses before impact.',
    critEffect:'Perfect misdirection — the target cannot defend next round.' },
  { id:'veil', name:'Veil', traitType:'active', activeSkillType:'utility',
    desc:'Blur your appearance for a scene — not invisibility, but enough to pass at distance.', minLevel:1,
    skill:'finesse', bonus:1, utilityLabel:'Blur your presence.',
    utilityResult:'You are there and not there at the same time. One check that would have required explanation no longer does.' },
  { id:'misdirection', name:'Misdirection', traitType:'passive',
    desc:'Attention slides off you naturally. Finesse checks to avoid detection gain +2.',
    bonusSkill:'finesse', bonus:2 },
  { id:'false_reading', name:'False Reading', traitType:'passive',
    desc:'You are difficult to read. Charm rolls to resist persuasion gain +1.',
    bonusSkill:'charm', bonus:1 },
  { id:'layered_perception', name:'Layered Perception', traitType:'passive',
    desc:'You see through constructed appearances. Wits checks to identify deception gain +2.',
    bonusSkill:'wits', bonus:2 }
];

ARCHETYPE_TRAIT_POOLS['elementalist'] = [
  { id:'elemental_blast', name:'Elemental Blast', traitType:'active', activeSkillType:'combative',
    desc:'Release a focused elemental charge at a target.', minLevel:1,
    skill:'wits', bonus:2,
    successEffect:'The charge lands with force — the target is staggered.',
    failEffect:'The element disperses before concentrating.',
    critEffect:'The blast overchannels — area effect, secondary targets take partial impact.' },
  { id:'elemental_shield', name:'Elemental Shield', traitType:'active', activeSkillType:'combative',
    desc:'Wrap yourself in elemental energy — absorbs one incoming hit.', minLevel:2,
    skill:'wits', bonus:0,
    successEffect:'The shield holds — next incoming hit is reduced by 3.',
    failEffect:'The shield forms but dissipates before impact.',
    critEffect:'The shield reflects — attacker takes partial damage.' },
  { id:'elemental_attunement', name:'Elemental Attunement', traitType:'active', activeSkillType:'utility',
    desc:'Read the elemental state of a location for navigation or safety assessment.', minLevel:1,
    skill:'wits', bonus:0, utilityLabel:'Read the elemental current.',
    utilityResult:'You sense what the elements are doing here. One environmental complication in the next choice becomes readable before it strikes.' },
  { id:'elemental_resilience', name:'Elemental Resilience', traitType:'passive',
    desc:'Extended contact with raw forces makes you harder to shake. Vigor checks against environmental hazards gain +2.',
    bonusSkill:'vigor', bonus:2 },
  { id:'channel_raw', name:'Channel Raw', traitType:'passive',
    desc:'You can push harder than training recommends. Wits rolls when overchanneling gain +1 instead of penalty.',
    bonusSkill:'wits', bonus:1 }
];

ARCHETYPE_TRAIT_POOLS['oracle'] = [
  { id:'foresight_strike', name:'Foresight Strike', traitType:'active', activeSkillType:'combative',
    desc:'You act on information the opponent doesn\'t know you have.', minLevel:1,
    skill:'wits', bonus:3,
    successEffect:'You were already where they didn\'t expect you.',
    failEffect:'The vision was partial. The moment passes.',
    critEffect:'Perfect foresight — you anticipate two moves ahead. You choose the outcome.' },
  { id:'read_intent', name:'Read Intent', traitType:'active', activeSkillType:'utility',
    desc:'Sense what someone intends to do in the next few minutes.', minLevel:1,
    skill:'wits', bonus:1, utilityLabel:'Read their next move.',
    utilityResult:'Intent crystallizes. You know which direction they\'re leaning before they do.' },
  { id:'precognitive_edge', name:'Precognitive Edge', traitType:'passive',
    desc:'Glimpses of outcome improve reaction. Wits checks for investigation gain +2.',
    bonusSkill:'wits', bonus:2 },
  { id:'seen_this', name:"Seen This", traitType:'passive',
    desc:'Déjà vu is information. Wits rolls when encountering a situation you\'ve seen before (via flag) gain +2.',
    bonusSkill:'wits', bonus:2 },
  { id:'calm_center', name:'Calm Center', traitType:'passive',
    desc:'The visions don\'t break you. Charm rolls under pressure gain +1.',
    bonusSkill:'charm', bonus:1 }
];

// ── STEALTH ARCHETYPES ───────────────────────────────────────────────────

ARCHETYPE_TRAIT_POOLS['spellthief'] = [
  { id:'spell_steal', name:'Spell Steal', traitType:'active', activeSkillType:'combative',
    desc:'Intercept and redirect an opponent\'s magical action.', minLevel:1,
    skill:'finesse', bonus:2,
    successEffect:'You catch the working mid-cast and redirect it.',
    failEffect:'The spell escapes your reach.',
    critEffect:'Perfect steal — you absorb the spell and can redirect it once this encounter.' },
  { id:'arcane_infiltration', name:'Arcane Infiltration', traitType:'active', activeSkillType:'utility',
    desc:'Slip through magical barriers or detection wards.', minLevel:1,
    skill:'finesse', bonus:1, utilityLabel:'Thread through the wards.',
    utilityResult:'You find the gap in the magical pattern. One warded access becomes passable.' },
  { id:'stealth_mastery', name:'Stealth Mastery', traitType:'passive',
    desc:'Concealment is second nature. Finesse rolls for avoiding detection gain +2.',
    bonusSkill:'finesse', bonus:2, minLevel:2 },
  { id:'spell_sense', name:'Spell Sense', traitType:'passive',
    desc:'You feel magical workings before they manifest. Wits checks to detect active magic gain +2.',
    bonusSkill:'wits', bonus:2 },
  { id:'shadow_cast', name:'Shadow Cast', traitType:'passive',
    desc:'Your stolen techniques are harder to counter. Wits rolls for improvised magic gain +1.',
    bonusSkill:'wits', bonus:1 }
];

ARCHETYPE_TRAIT_POOLS['scout_c'] = [
  { id:'rapid_recon', name:'Rapid Recon', traitType:'active', activeSkillType:'utility',
    desc:'Fast assessment of terrain, exits, and threats.', minLevel:1,
    skill:'wits', bonus:1, utilityLabel:'Read the ground quickly.',
    utilityResult:'In thirty seconds you know what matters: exits, sightlines, where trouble is coming from.' },
  { id:'precise_shot', name:'Precise Shot', traitType:'active', activeSkillType:'combative',
    desc:'A ranged strike that targets a specific vulnerability.', minLevel:1,
    skill:'finesse', bonus:2,
    successEffect:'The shot finds the gap in their defense.',
    failEffect:'The shot is clean but finds no gap.',
    critEffect:'The shot hits a critical point — the target is disoriented for the next round.' },
  { id:'stealth_mastery', name:'Stealth Mastery', traitType:'passive',
    desc:'Moving unseen is trained reflex. Finesse rolls for avoiding detection gain +2.',
    bonusSkill:'finesse', bonus:2, minLevel:2 },
  { id:'threat_reading', name:'Threat Reading', traitType:'passive',
    desc:'You process danger faster than untrained observers. Wits rolls to detect ambush gain +2.',
    bonusSkill:'wits', bonus:2 },
  { id:'light_step', name:'Light Step', traitType:'passive',
    desc:'You move without announcing yourself. Finesse checks for quiet movement gain +1.',
    bonusSkill:'finesse', bonus:1 }
];

ARCHETYPE_TRAIT_POOLS['thief'] = [
  { id:'pickpocket', name:'Pickpocket', traitType:'active', activeSkillType:'utility',
    desc:'Acquire a held item without the holder noticing.', minLevel:1,
    skill:'finesse', bonus:1, utilityLabel:'Take what they\'re holding.',
    utilityResult:'Your hand finds the item before the mark finds your hand.' },
  { id:'sucker_punch', name:'Sucker Punch', traitType:'active', activeSkillType:'combative',
    desc:'Strike before the opponent registers you as a threat.', minLevel:1,
    skill:'finesse', bonus:2,
    successEffect:'They didn\'t see it coming. The strike lands clean.',
    failEffect:'They saw it. The element of surprise is gone.',
    critEffect:'Perfect hit — the target drops initiative for the full encounter.' },
  { id:'stealth_mastery', name:'Stealth Mastery', traitType:'passive',
    desc:'You move in the dark without thinking about it. Finesse rolls for avoiding detection gain +2.',
    bonusSkill:'finesse', bonus:2, minLevel:2 },
  { id:'quick_hands', name:'Quick Hands', traitType:'passive',
    desc:'Speed is a form of accuracy. Finesse checks for sleight-of-hand gain +2.',
    bonusSkill:'finesse', bonus:2 },
  { id:'street_read', name:'Street Read', traitType:'passive',
    desc:'You know who to trust and who to avoid. Wits rolls to assess social risk gain +1.',
    bonusSkill:'wits', bonus:1 }
];

ARCHETYPE_TRAIT_POOLS['trickster'] = [
  { id:'feint', name:'Feint', traitType:'active', activeSkillType:'combative',
    desc:'Create an opening through misdirection.', minLevel:1,
    skill:'charm', bonus:2,
    successEffect:'The feint worked — the opening is there.',
    failEffect:'They didn\'t bite. Position neutral.',
    critEffect:'Perfect feint — the opponent is off-balance for two rounds.' },
  { id:'fast_talk', name:'Fast Talk', traitType:'active', activeSkillType:'utility',
    desc:'Talk your way through a door, a guard, or a confrontation before it starts.', minLevel:1,
    skill:'charm', bonus:2, utilityLabel:'Talk them out of caring.',
    utilityResult:'You talk faster than they think. The obstacle dissolves into conversation and then nothing.' },
  { id:'social_camouflage', name:'Social Camouflage', traitType:'passive',
    desc:'You become whoever the room needs. Charm rolls for social navigation gain +2.',
    bonusSkill:'charm', bonus:2 },
  { id:'read_the_room', name:'Read the Room', traitType:'passive',
    desc:'Social pressure is information. Wits checks to read NPC intent gain +1.',
    bonusSkill:'wits', bonus:1 },
  { id:'lucky_escape', name:'Lucky Escape', traitType:'passive',
    desc:'When situations go wrong, you find exits others don\'t. Finesse checks to disengage gain +2.',
    bonusSkill:'finesse', bonus:2 }
];

ARCHETYPE_TRAIT_POOLS['beastmaster'] = [
  { id:'animal_companion_strike', name:'Companion Strike', traitType:'active', activeSkillType:'combative',
    desc:'Direct your animal companion to attack in coordination with your move.', minLevel:1,
    skill:'charm', bonus:1,
    successEffect:'The coordinated strike hits from two directions.',
    failEffect:'The companion is hesitant. You act alone.',
    critEffect:'Perfect coordination — companion and you both land — double effect.' },
  { id:'call_of_the_wild', name:'Call of the Wild', traitType:'active', activeSkillType:'utility',
    desc:'Sense the state of local animals and use that information.', minLevel:1,
    skill:'wits', bonus:0, utilityLabel:'Read what the animals know.',
    utilityResult:'The animals in the area have been watching. What they saw is useful.' },
  { id:'pack_instinct', name:'Pack Instinct', traitType:'passive',
    desc:'You read group behavior instantly. Wits checks to understand crowd or group dynamics gain +2.',
    bonusSkill:'wits', bonus:2 },
  { id:'predator_sense', name:'Predator Sense', traitType:'passive',
    desc:'You know when you are being hunted. Wits rolls to detect pursuit or surveillance gain +2.',
    bonusSkill:'wits', bonus:2 },
  { id:'naturalist_endurance', name:'Naturalist Endurance', traitType:'passive',
    desc:'Time in the wild has hardened you. Vigor checks for travel and exposure gain +2.',
    bonusSkill:'vigor', bonus:2 }
];

// ── SUPPORT ARCHETYPES ───────────────────────────────────────────────────

ARCHETYPE_TRAIT_POOLS['artificer'] = [
  { id:'device_deploy', name:'Device Deploy', traitType:'active', activeSkillType:'combative',
    desc:'Deploy a prepared device in combat — trap, deterrent, or distraction.', minLevel:1,
    skill:'spirit', bonus:1,
    successEffect:'The device deploys cleanly and functions as intended.',
    failEffect:'The device misfires. No effect.',
    critEffect:'The device exceeds design parameters — effect is doubled.' },
  { id:'field_diagnosis', name:'Field Diagnosis', traitType:'active', activeSkillType:'utility',
    desc:'Assess a mechanism, object, or structural problem quickly.', minLevel:1,
    skill:'spirit', bonus:2, utilityLabel:'Diagnose the device.',
    utilityResult:'You identify the problem and its origin in under a minute. The fix path is clear.' },
  { id:'applied_craft', name:'Applied Craft', traitType:'passive',
    desc:'Technical knowledge translates directly. Spirit rolls for crafting and device work gain +2.',
    bonusSkill:'spirit', bonus:2, minLevel:2 },
  { id:'material_knowledge', name:'Material Knowledge', traitType:'passive',
    desc:'You know what things are made of and what they can take. Wits rolls for material assessment gain +2.',
    bonusSkill:'wits', bonus:2 },
  { id:'improvise_solution', name:'Improvise Solution', traitType:'passive',
    desc:'When the right tool isn\'t there, you make do. Spirit checks without proper equipment lose only 1 instead of 2.',
    bonusSkill:'spirit', bonus:1 }
];

ARCHETYPE_TRAIT_POOLS['engineer'] = [
  { id:'structural_strike', name:'Structural Strike', traitType:'active', activeSkillType:'combative',
    desc:'Target a structural point — object, door, wall, or opponent\'s equipment.', minLevel:1,
    skill:'might', bonus:1,
    successEffect:'The point gives. The obstacle ceases to function as one.',
    failEffect:'The material holds.',
    critEffect:'The structure fails catastrophically — cascade effect.' },
  { id:'rapid_assessment', name:'Rapid Assessment', traitType:'active', activeSkillType:'utility',
    desc:'Fast-read a building, bridge, or installation for vulnerabilities or access points.', minLevel:1,
    skill:'wits', bonus:1, utilityLabel:'Read the structure.',
    utilityResult:'You see what the builder intended and what they didn\'t account for. One access point becomes available.' },
  { id:'applied_craft', name:'Applied Craft', traitType:'passive',
    desc:'Technical mastery applies everywhere. Spirit rolls for crafting and device work gain +2.',
    bonusSkill:'spirit', bonus:2, minLevel:2 },
  { id:'load_bearing', name:'Load Bearing', traitType:'passive',
    desc:'You know what structures can take. Vigor checks under physical load or structural stress gain +2.',
    bonusSkill:'vigor', bonus:2 },
  { id:'efficiency_mind', name:'Efficiency Mind', traitType:'passive',
    desc:'You find the fastest path. Wits checks for route-finding and logistics gain +1.',
    bonusSkill:'wits', bonus:1 }
];

ARCHETYPE_TRAIT_POOLS['tactician'] = [
  { id:'calculated_strike', name:'Calculated Strike', traitType:'active', activeSkillType:'combative',
    desc:'A strike placed at the geometrically optimal moment.', minLevel:1,
    skill:'wits', bonus:2,
    successEffect:'The geometry was right. The strike lands where no defense was.',
    failEffect:'The calculation was off. Neutral outcome.',
    critEffect:'Perfect geometry — the opponent has no response option.' },
  { id:'logistics_review', name:'Logistics Review', traitType:'active', activeSkillType:'utility',
    desc:'Assess supply, personnel, and route for a planned operation.', minLevel:1,
    skill:'wits', bonus:2, utilityLabel:'Run the numbers.',
    utilityResult:'The plan has a gap you\'ve now found. Or it doesn\'t, and you proceed with confidence.' },
  { id:'positional_awareness', name:'Positional Awareness', traitType:'passive',
    desc:'You always know where everyone is. Wits checks for combat positioning gain +2.',
    bonusSkill:'wits', bonus:2 },
  { id:'pressure_control', name:'Pressure Control', traitType:'passive',
    desc:'You perform better under time constraints. Charm rolls when time pressure is present gain +1.',
    bonusSkill:'charm', bonus:1 },
  { id:'asymmetric_advantage', name:'Asymmetric Advantage', traitType:'passive',
    desc:'You find unequal exchanges in your favor. Wits rolls to identify leverage gain +1.',
    bonusSkill:'wits', bonus:1 }
];

ARCHETYPE_TRAIT_POOLS['alchemist'] = [
  { id:'throw_compound', name:'Throw Compound', traitType:'active', activeSkillType:'combative',
    desc:'Hurl a prepared alchemical compound at a target.', minLevel:1,
    skill:'finesse', bonus:1,
    successEffect:'The compound delivers its intended effect on contact.',
    failEffect:'The compound misses or fails to activate.',
    critEffect:'The compound overreacts — area effect, double potency.' },
  { id:'field_synthesis', name:'Field Synthesis', traitType:'active', activeSkillType:'utility',
    desc:'Improvise a compound from available materials in a scene.', minLevel:1,
    skill:'spirit', bonus:2, utilityLabel:'Synthesize from what\'s here.',
    utilityResult:'The ingredients were there if you knew what to look for. A useful compound takes shape.' },
  { id:'applied_craft', name:'Applied Craft', traitType:'passive',
    desc:'Alchemical knowledge generalizes. Spirit rolls for crafting and compound work gain +2.',
    bonusSkill:'spirit', bonus:2, minLevel:2 },
  { id:'compound_intuition', name:'Compound Intuition', traitType:'passive',
    desc:'You know what things do to each other. Wits checks for identifying substances gain +2.',
    bonusSkill:'wits', bonus:2 },
  { id:'self_dosing', name:'Self-Dosing', traitType:'passive',
    desc:'You know how to use your own compounds on yourself effectively. Vigor checks after consuming a compound gain +1.',
    bonusSkill:'vigor', bonus:1 }
];

ARCHETYPE_TRAIT_POOLS['saint'] = [
  { id:'intercession', name:'Intercession', traitType:'active', activeSkillType:'combative',
    desc:'Place yourself between harm and another — absorb or deflect an incoming effect.', minLevel:1,
    skill:'vigor', bonus:0,
    successEffect:'You take it instead. The protected party is unharmed.',
    failEffect:'You could not reach them in time.',
    critEffect:'Perfect intercession — you absorb the hit without taking full effect.' },
  { id:'sanctuary_blessing', name:'Sanctuary Blessing', traitType:'active', activeSkillType:'utility',
    desc:'Mark a space or person with protection for a scene.', minLevel:1,
    skill:'charm', bonus:1, utilityLabel:'Establish sanctuary.',
    utilityResult:'The blessing holds for this scene. Hostile approaches require additional DC to initiate.' },
  { id:'unshakeable_calm', name:'Unshakeable Calm', traitType:'passive',
    desc:'Nothing rattles you for long. Charm rolls under social pressure gain +2.',
    bonusSkill:'charm', bonus:2 },
  { id:'martyr_resolve', name:'Martyr\'s Resolve', traitType:'passive',
    desc:'You grow stronger as the cost rises. At ≤40% HP, all rolls gain +1.',
    bonusSkill:'vigor', bonus:1, condition:'hp_low' },
  { id:'radiant_presence', name:'Radiant Presence', traitType:'passive',
    desc:'Your sincerity disarms. Charm rolls in first contact situations gain +2.',
    bonusSkill:'charm', bonus:2 }
];
```

- [ ] Open `ledger-of-ash.html`, locate `ARCHETYPE_TRAIT_POOLS` at ~line 3075.
- [ ] After the last existing pool entry (before the closing `};` of the pools object), insert all 21 pool definitions above.
- [ ] Verify no JSON syntax errors (matching brackets, trailing commas correct).
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `feat: author all 21 missing archetype trait pools — Combat/Magic/Stealth/Support all fully flavored with combative + utility active skills + passive traits`

---

### Task CB7 — Enriched File Skill Key Audit

**Files:** All `content/*_enriched_choices.js` files, `ledger-of-ash.html`

**Context:** Stage 1 and Stage 2 enriched choice files contain `rollD20('lore', ...)`, `rollD20('persuasion', ...)`, etc. — internal key calls. After CB1, `rollD20` reads `G.skills[skill]` and `G.skills` uses display-name keys, so internal key calls return stat value 0. All internal key references in roll calls must be updated to display-name keys.

Key mapping for find/replace:
- `rollD20('combat'` → `rollD20('might'`
- `rollD20('stealth'` → `rollD20('finesse'`
- `rollD20('survival'` → `rollD20('vigor'`
- `rollD20('lore'` → `rollD20('wits'`
- `rollD20('persuasion'` → `rollD20('charm'`
- `rollD20('craft'` → `rollD20('spirit'`
- `_roll('combat'` → `_roll('might'`
- `_roll('stealth'` → `_roll('finesse'`
- `_roll('survival'` → `_roll('vigor'`
- `_roll('lore'` → `_roll('wits'`
- `_roll('persuasion'` → `_roll('charm'`
- `_roll('craft'` → `_roll('spirit'`

Also update `DC_` constants and roll references in `stage2_boss.js`, `stage2_climax.js`, `stage3_climax.js`.

- [ ] Grep all `content/` files for `rollD20('combat|stealth|survival|lore|persuasion|craft'`. Count hits.
- [ ] Bulk replace all instances using the key map above across all content files.
- [ ] Grep `ledger-of-ash.html` for same patterns; replace all hits.
- [ ] `npx jest` — 78/78 pass.
- [ ] `node tests/content/validate-content.js` — note any new violations; must not regress beyond 838 pre-existing.
- [ ] Commit: `fix: skill key audit — all rollD20/_roll calls updated to display-name keys (might/finesse/vigor/wits/charm/spirit)`

---

### Task CB8 — Arc File Naming Fix

**Files:** `content/aurora_crown_to_shelk_arc.js`, `content/glasswake_to_shelk_arc.js`, `content/whitebridge_to_shelk_arc.js`, `ledger-of-ash.html`

**Context:** Three arc files are named without the `_commune` suffix. The locality lookup uses `aurora_crown_commune`, `glasswake_commune`, `whitebridge_commune` as keys — so these arc files are never found.

- [ ] Rename files:
  - `aurora_crown_to_shelk_arc.js` → `aurora_crown_commune_to_shelk_arc.js`
  - `glasswake_to_shelk_arc.js` → `glasswake_commune_to_shelk_arc.js`
  - `whitebridge_to_shelk_arc.js` → `whitebridge_commune_to_shelk_arc.js`
- [ ] Update the three `<script src="content/...">` tags in `ledger-of-ash.html` to match the new filenames.
- [ ] Grep for any other references to the old names in test files or validators; update those.
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `fix: arc file naming — aurora_crown/glasswake/whitebridge commune suffix restored, script tags updated`

---

## Phase CB Verification

After all tasks complete, verify end-to-end:

1. `npx jest` — 78/78 pass
2. New game → `G.skills` initialized with display-name keys (`might`, `finesse`, `vigor`, `wits`, `charm`, `spirit`)
3. `rollD20('might')` returns `roll + G.skills.might + bonus - penalties` (not just `roll + bonus`)
4. Level-up → trait selected → appears in both `G.unlockedTraits` AND `G.traits` as full object
5. `getTraitBonus('might')` returns non-zero after a might-bonus trait is unlocked
6. Combat phase → unlocked combative active skills appear as buttons below Press/Defend/Talk/Retreat
7. Character sheet → unlocked utility active skills show "Use: [name]" button
8. Click Use button → choice injected into active scene
9. Training menu → masteryXP section visible when `G.masteryXP >= 10`
10. 3 training sessions on same trait → trait unlocked → appears in G.traits
11. Level-up HP gain = `4 + Math.floor(G.skills.vigor / 2)` (+ 3 for Support archetype)
12. Level 5 character → `getLevelUpSkillCount()` returns 2 (milestone pick)
13. All 21 archetype pool entries accessible by archetype ID key (spot-check 3: paladin, oracle, saint)
14. `content/aurora_crown_commune_to_shelk_arc.js` loads without 404 in console
15. Old internal key `rollD20('lore'` — grep returns 0 matches across all content files

---

### CB File Registry Updates

#### Modified
- `ledger-of-ash.html` — CB1 (skill keys, rollD20, _finalizeLevelUp, getTraitBonus), CB2 (active skill buttons + useUtilitySkill), CB3 (trainMastery + extended training menu), CB4 (Vigor HP scaling, getLevelUpSkillCount), CB5 (stealth_mastery + applied_craft), CB6 (21 archetype pools), CB7 (rollD20 key audit), CB8 (arc script tag update)

#### Renamed
- `content/aurora_crown_to_shelk_arc.js` → `content/aurora_crown_commune_to_shelk_arc.js`
- `content/glasswake_to_shelk_arc.js` → `content/glasswake_commune_to_shelk_arc.js`
- `content/whitebridge_to_shelk_arc.js` → `content/whitebridge_commune_to_shelk_arc.js`

---

## Phase V33 — Locality Authority Encounter Content (V33_2 Canon Pass)

**Goal:** Rewrite the opening narration of each Tier 1 authority encounter in `content/authority_encounters.js` so it matches the V33_2 canonical props, register, and tier structure exactly. No new mechanics. Content only.

**Rule:** Read each locality's V33_2 packet from `data/reference/V33_2_extracted/V33_2_DnD_Repository/03_LOCALITY_ENGINE/locality_packets/[locality].json` before editing. If packet data contradicts the notes below, the packet wins.

---

### Task V33.1 — Cosmouth: Archives and Treasury

**File:** `content/authority_encounters.js` — `shelk` block (Cosmouth Tier 1)

**V33_2 canonical props:** Archivist unrolls a cargo manifest across the counter. Smoothed flat with both palms. She asks for your routing mark. Shelves of bound ledgers floor to ceiling, spine-labeled in compressed notation. She does not look up the mark herself — she waits for you to point to the line.

**Institution name:** `Cosmouth Archives and Treasury` (spelled out, not ampersand)

- [ ] Open `content/authority_encounters.js`. Find the `cosmouth` entry.
- [ ] Verify `addNarration` first argument is `'Cosmouth Archives and Treasury'`. Fix if wrong.
- [ ] Replace the opening narration string with: `'The archivist unrolls a cargo manifest across the counter without preamble. She smooths the edges flat with both palms, then asks for your routing mark. Behind her, shelves of bound ledgers run floor to ceiling, each one spine-labeled in the Archives\' compressed notation. She does not look up the mark herself — she waits for you to point to the line.'`
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `fix: cosmouth authority encounter — V33_2 canonical narration + institution name`

---

### Task V33.2 — Panim: Afterlife Registry

**File:** `content/authority_encounters.js` — `panim` block

**V33_2 canonical props:** Registrar recites three formal invocations before asking your name. Old words — not performance, just procedure. Marks each invocation with a stroke of pale ink. Stack of offering certificates. Ritual register open to a page that already has your arrival date.

**Institution name:** `Panim Afterlife Registry`

- [ ] Find the `panim` entry. Verify institution name in `addNarration`.
- [ ] Replace narration: `'The registrar recites the three formal invocations before she asks your name. The words are old — not a performance, just procedure. She marks each invocation in a ledger with a stroke of pale ink. When the third is done she looks up. Her desk holds a stack of offering certificates, a ritual register open to a page that already has your arrival date on it.'`
- [ ] Confirm the narration does NOT reference Civic Harmony Hall, senior clergy, or Tier 2+ bodies.
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `fix: panim authority encounter — V33_2 three invocations + pale ink register`

---

### Task V33.3 — Mimolot: Book Tariff Office

**File:** `content/authority_encounters.js` — `mimolot` block

**V33_2 canonical props:** Assessor holds document up to window light. Turns it once. Opens exemption register to a tabbed page. Finger moves down the column slowly — not because he is slow, but because he wants you to watch. The silence in the tariff hall has texture: scratch of nibs, soft knock of stamping blocks.

**Institution name:** `Mimolot Book Tariff Office` (polity prefix required)

- [ ] Find the `mimolot` entry. Fix institution name to include `Mimolot` prefix.
- [ ] Replace narration: `'The assessor holds your document up against the window light without ceremony. He turns it once, then opens the exemption register to a tabbed page. His finger moves down the column slowly — not because he is slow, but because he wants you to watch. The silence in the tariff hall has a specific texture: the scratch of nibs, the soft knock of stamping blocks, and nothing else.'`
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `fix: mimolot authority encounter — V33_2 exemption register props + institution prefix`

---

### Task V33.4 — Shirsh: Magi Magistratus

**File:** `content/authority_encounters.js` — `shirsh` block

**V33_2 canonical props:** Sealed evidence bag already on the table. Reference number inked on outside. She does not open it. Second document beside it — movement log, cross-referenced by date. Waits for you to sit before speaking. Voice stays at the register of someone reading minutes.

**Institution name:** `Magi Magistratus`

- [ ] Find the `shirsh` entry. Verify institution name.
- [ ] Replace narration: `'The magistrate has already set a sealed evidence bag on the table. A reference number is inked on the outside in precise script. She does not open it. She places a second document beside it — a log of movements, cross-referenced by date. She waits for you to sit before she speaks, and when she does her voice stays at the register of someone reading minutes.'`
- [ ] Confirm narration does not reference Civic Harmony Hall or watch-lieutenant layer.
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `fix: shirsh authority encounter — V33_2 sealed evidence bag + movement log`

---

### Task V33.5 — Sheresh: Route Warden Compacts

**File:** `content/authority_encounters.js` — `sheresh` block

**V33_2 canonical props:** Compact officer takes crossing documentation without looking at you. Holds each page up against the checkpoint lamp — mounted high so forgeries show. Expression gives nothing back. Barrier behind her is down; route beyond visible and unreachable. Second officer marks something in a ledger at the far end of the post.

**Institution name:** `Sheresh Route Warden Compacts` (polity prefix required)

- [ ] Find the `sheresh` entry. Fix institution name to include `Sheresh` prefix.
- [ ] Replace narration: `'The compact officer takes your crossing documentation without looking at you first. She holds each page up against the checkpoint lamp — the one mounted high so forgeries show. Her expression gives nothing back. The barrier behind her is down; the route beyond it is visible and unreachable. A second officer marks something in a ledger at the far end of the post.'`
- [ ] Confirm narration does NOT reference domes, reactors, or Containment Research Concord (those are Tier 2+).
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `fix: sheresh authority encounter — V33_2 checkpoint lamp + no dome references`

---

### Task V33.6 — Soreheim: Giant Council

**File:** `content/authority_encounters.js` — `soreheim` block

**V33_2 canonical props:** Hill giant's shadow covers the far wall before you notice the council has convened. Three of them — seated, which still puts their faces higher than yours standing. Corrective labor schedule already on the table, thick document printed in two scripts. Presiding councilor does not raise her voice. The room's acoustics carry everything.

**Institution name:** `Giant Council` (verify exact V33_2 prefix against packet before adding)

**Critical:** Corrective labor schedule is the Tier 1 consequence prop — not hill giant enforcers (those are Tier 4). Physical scale must be established before any dialogue.

- [ ] Find the `soreheim` entry. Read V33_2 locality packet for exact institution name.
- [ ] Replace narration to include: shadow establishing physical scale first, three seated council members, corrective labor schedule on the table (thick, two scripts), presiding councilor whose voice carries without effort.
- [ ] Confirm narration does NOT feature hill giant enforcers directly confronting the player — that is Tier 4.
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `fix: soreheim authority encounter — V33_2 physical scale + corrective labor schedule`

---

### Task V33.7 — Nomdara: Bond Registry Ring

**File:** `content/authority_encounters.js` — `nomdara` block

**V33_2 canonical props:** Bond clerk's seal kit spread across the wagon's fold-down table — wax, three stamps, a narrow ledger, and a witness rod laid parallel to the edge. Every transaction is witnessed; the rod signals someone is already watching. Clerk looks up when you stop. Does not greet. Opens the ledger to the current page and holds her pen ready.

**Institution name:** `Nomdara Bond Registry Ring` (polity prefix required)

**Critical:** No fixed building. No checkpoint structure. No permanent settlement. The fold-down table IS the authority space.

- [ ] Find the `nomdara` entry. Fix institution name to include `Nomdara` prefix.
- [ ] Replace narration: `'The bond clerk\'s seal kit is spread across the wagon\'s fold-down table — wax, three stamps, a narrow ledger, and a witness rod laid parallel to the edge. Every transaction here is witnessed; the rod signals that someone else is already watching. The clerk looks up when you stop. She does not greet you. She opens the ledger to the current page and holds her pen ready.'`
- [ ] Confirm narration has NO fixed building reference, no hall, no checkpoint barrier.
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `fix: nomdara authority encounter — V33_2 seal kit + witness rod + mobile setting`

---

### Task V33.8 — Shelk: Road Wardens / Roaz: Enforcement (verify names)

**File:** `content/authority_encounters.js` — `shelk` and `roaz` blocks

**Verify only — no narration rewrite unless V33_2 packet confirms a mismatch:**

- [ ] Read V33_2 locality packet for shelk. Confirm whether `'Roadwardens Order'` (no space) or `'Road Wardens Order'` (space) is canonical. Update if different from current code.
- [ ] Read V33_2 locality packet for roaz. Confirm `'Office of Roazian Enforcement'` matches canonical name.
- [ ] If either name differs from current code: update the `addNarration` first argument.
- [ ] `npx jest` — 78/78 pass.
- [ ] Commit: `fix: shelk/roaz authority names — verified against V33_2 packet`

---

### Phase V33 Verification

1. Open `content/authority_encounters.js` — each `addNarration` first argument matches canonical V33_2 institution name
2. Cosmouth narration includes: manifest unrolled, smoothed with palms, routing mark
3. Panim narration includes: three invocations, pale ink strokes, offering certificates
4. Mimolot narration includes: window light, exemption register tabbed page, stamping blocks
5. Shirsh narration includes: sealed evidence bag, reference number, movement log
6. Sheresh narration includes: checkpoint lamp, barrier down, second officer — no dome/reactor
7. Soreheim narration includes: shadow, three seated council members, corrective labor schedule — no hill giant enforcers
8. Nomdara narration includes: fold-down table, seal kit, witness rod — no fixed building

---

## V33_2 Canon Reference — Authority Structures ("btw" data)

The user provided the canonical V33_2 authority and locality structures for four macroregions. All content authoring for these regions **must be read from V33_2 first**. The notes below are session-derived and must be verified against `data/reference/V33_2_extracted/V33_2_DnD_Repository/` before any name or institution is committed.

### Outside Psanan / The Principalities (Cosmouth, Panim, Mimolot, Shirsh)

- Each Principality has its own Tier 1 authority body. **Civic Harmony Hall is Tier 2 in all four** — fines, mediation, short-term detention. Do not surface Civic Harmony Hall in Tier 1 encounters.
- **Cosmouth:** Tier 1 = `Cosmouth Archives and Treasury` (spelled out, not ampersand). Domain: tax records, maritime fiscal legitimacy, cargo disputes. Tier 2 = Civic Harmony Hall. Tier 3 = House and port authority.
- **Panim:** Tier 1 = `Panim Afterlife Registry`. Domain: funerary legitimacy, offering certification, ritual register. Three formal invocations recited before name is asked — this is procedure, not performance. Tier 3 = Senior clergy / ritual authorities.
- **Mimolot:** Tier 1 = `Mimolot Book Tariff Office` (includes polity prefix). Domain: book tariffs, undeclared-text seizure, knowledge-flow control. Every text cross-referenced against the exemption register before questions.
- **Shirsh (House Shirsh):** Tier 1 = `Magi Magistratus`. Domain: magical investigation, artifact scrutiny, evidence integrity. Evidence bag on the table before the player sits — a reference number inked on the outside. No Civic Harmony Hall at Tier 1.

### Sheresh Communes

- **Tier 1:** `Sheresh Route Warden Compacts` (includes polity prefix). Domain: crossing documentation, escort, route denial, loss-report processing. Documentation held up against the checkpoint lamp (mounted high so forgeries show).
- **Tier 2:** Containment Research Concord — containment restrictions, dangerous-study oversight.
- **Tier 3:** Dome stewards — dome safety, entry protocol, communal survival law.
- **Higher tiers:** Reactor wardens, Reactor-related enforcement. **Do not surface dome/reactor concepts in Tier 1 narration** — they are not public-facing at that encounter level.
- **Stage constraint:** Sheresh has Stage 1 content only. No Stage 2 authored. No canon NPCs — any Sheresh NPCs must be authored from scratch, canon-consistent.

### Soreheim Alliance

- **Tier 1:** `Soreheim Giant Council` (or `Giant Council` — verify exact V33_2 prefix). Domain: high law, contribution-based justice, quota law, corrective labor scheduling.
- **Physical scale is canonical:** Giant Council members are seated and still higher than a standing human. Three of them in a room is presence before words. The corrective labor schedule is a thick document in two scripts — it is already on the table at Tier 1 encounters.
- **Tier 4:** Hill Giant enforcers — coercive labor, direct force. **Hill giants are Tier 4. Do not feature them in Tier 1 encounters.** Tier 1 is the Giant Council — procedural, high-law, quota-based.
- **Tier 5:** Restitution assessors / corrective labor assigners. Tier 6: Injury and waste investigators.
- The presiding councilor does not raise her voice. The room's acoustics carry everything.

### Nomdara Caravan

- **Tier 1:** `Nomdara Bond Registry Ring` (includes polity prefix). Domain: bonded passage, obligation verification, trust status.
- **Mobile settlement — no fixed hall.** The bond clerk's seal kit is spread across the wagon's fold-down table: wax, three stamps, a narrow ledger, and a **witness rod** laid parallel to the edge. Every transaction is witnessed; the rod signals someone is already watching.
- **Tier 2:** Councils / elders — custom-based hearings, social-economic enforcement. **Do not surface councils/elders in Tier 1 narration.**
- **Tier 3:** Convoy magistrates — portable legality, convoy edicts, onboard hearings.
- **Zero canon NPCs.** Nomdara is transit-only, no permanent residents. Any authored Nomdara names must be explicitly marked `// authored` in code comments.
- The clerk does not greet. She opens the ledger to the current page and holds her pen ready.

### Content Rules Derived from V33_2 BTW Data

1. **Institution names:** Use exact canonical names including polity prefixes where V33_2 includes them (Mimolot Book Tariff Office, Cosmouth Archives and Treasury, Sheresh Route Warden Compacts, Nomdara Bond Registry Ring). Verify spelling from V33_2 source before committing — do not use session notes as final authority.
2. **Tier separation:** Tier 1 encounters must not reference Tier 2+ bodies or consequences. Civic Harmony Hall is always Tier 2+ across all Principalities.
3. **Authority props:** Each polity has canonical physical objects that signal authority — use them in narration:
   - Cosmouth: cargo manifest unrolled across the counter, smoothed with both palms
   - Panim: three formal invocations recited in sequence; ledger with pale ink strokes marking each
   - Mimolot: exemption register open to a tabbed page, finger moving down the column slowly
   - Shirsh: sealed evidence bag with reference number; second document (movement log) beside it
   - Sheresh: documentation held up against the checkpoint lamp
   - Soreheim: corrective labor schedule (thick, two scripts) already on the table
   - Nomdara: seal kit spread on fold-down table; witness rod parallel to the edge
4. **Nomdara narration:** No fixed building, no checkpoint structure, no permanent settlement reference.
5. **Soreheim narration:** Corrective labor is the Tier 1 consequence — not imprisonment, not fines. Physical scale must be present before dialogue.
6. **Panim narration:** The three invocations are procedure. Show them as procedural (not theatrical). The registrar marks each with a stroke of pale ink.
