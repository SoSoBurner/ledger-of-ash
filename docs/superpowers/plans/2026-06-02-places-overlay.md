# Places Overlay (Shops & Taverns) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Places" overlay panel accessible from the HUD alongside existing overlays (map, NPCs). Shows locality-specific shops (browseable catalog + buy action) and taverns (rumors, NPC chance, gold-cost rest). Tavern rest surfaces the existing `doSleepScene()` system — it's a new access point, not a new rest implementation.

**Architecture:** New `content/places_data.js` defines establishments per locality using V33_2 named entities first, authored fallbacks for gaps. New `overlay-places` div follows the existing `overlay-npcs` pattern in HTML. `showPlaces()` renders the panel from places data. Shop CSS already exists (`.shop-item`, `.shop-buy-btn`). Tavern rest routes to existing `doSleepScene()`. Rumors are a pool of 4–6 per locality, 1–2 random per visit, gated by `investigationProgress` where relevant — authored to never contradict main quest canon.

**Tech Stack:** Vanilla ES5 JS, `ledger-of-ash.html` (overlay HTML + `showPlaces()` function), `content/places_data.js` (data), existing shop CSS, existing `doSleepScene()`.

**Canon constraint:** All tavern rumors and shop NPCs must be V33_2-consistent. No rumors that reveal main quest answers prematurely. Rumors may hint at sideplots, reference known institutional tensions, or provide world texture.

---

## Files

| File | Change |
|------|--------|
| `content/places_data.js` | New — localities → shops + taverns + rumors |
| `ledger-of-ash.html` (HTML section) | Add `<div class="overlay" id="overlay-places">` after `overlay-npcs` |
| `ledger-of-ash.html` (JS section) | Add `showPlaces()`, `buyShopItem()`, `openTavernRest()` functions |
| `ledger-of-ash.html` (G defaults) | Add `G.shopSeen = {}` and `G.tavernRumorsSeen = {}` |
| `ledger-of-ash.html` (HUD) | Add Places button to overlay nav near the NPCs button |

---

### Task 1: Research V33_2 establishment names per Stage 1 locality

**Files:**
- Read-only research — output informs Task 2

- [ ] **Step 1: Scan locality packets for establishment names**

```bash
grep -r "inn\|tavern\|shop\|market\|guild hall\|exchange\|workshop\|apothecary\|archive\|library" \
  "data/reference/V33_2_extracted/V33_2_DnD_Repository/03_LOCALITY_ENGINE/locality_packets/" \
  --include="*.json" -l | head -20
```

- [ ] **Step 2: Extract named establishments per locality**

For each of the 12 Stage 1 localities, read the locality packet and note any named establishments:
- Shelkopolis, Fairhaven, Guildheart, Soreheim, Sunspire, Mimolot
- Ithtananalor, Panim, Shirshal, Aurora, Glasswake, Cosmoria

```bash
for LOC in shelkopolis fairhaven guildheart soreheim sunspire mimolot ithtananalor panim shirshal aurora glasswake cosmoria; do
  echo "=== $LOC ==="; grep -i "inn\|tavern\|shop\|market\|exchange\|archive" \
    "data/reference/V33_2_extracted/V33_2_DnD_Repository/03_LOCALITY_ENGINE/locality_packets/${LOC}.json" 2>/dev/null | head -5; done
```

- [ ] **Step 3: Note the results for Task 2**

Record: for each locality — shop name (or "none found"), tavern name (or "none found"), any notable V33_2 goods/items mentioned.

---

### Task 2: Create content/places_data.js

**Files:**
- Create: `content/places_data.js`

- [ ] **Step 1: Scaffold the file structure**

```js
// content/places_data.js — shop and tavern data per locality
// V33_2 named establishments take priority; fallbacks are authored to match locality identity.
// Canon rule: rumor text must never reveal main quest conclusions prematurely.
// Shop types: 'trade' | 'labor' | 'academic' | 'harbor' | 'frontier'

window.PLACES_DATA = {
  // PATTERN for each locality:
  // localityId: {
  //   shops: [{ id, name, type, desc, items: [{id, name, desc, cost, effect}] }],
  //   tavern: { id, name, desc, rumors: [{id, text, minProgress}], restCost }
  // }
};
```

- [ ] **Step 2: Author Shelkopolis entry**

```js
  shelkopolis: {
    shops: [
      {
        id: 'shelk_supply',
        name: 'Silkweaver\'s Dry Goods',
        type: 'trade',
        desc: 'Rations, lantern oil, and rope. The counter woman writes everything down.',
        items: [
          { id: 'rations_3', name: 'Three Days\' Rations', desc: 'Dried meal packs. Keeps for two weeks.', cost: 6, effect: { type: 'item', id: 'rations_3', name: 'Three Days\' Rations' } },
          { id: 'lantern_oil', name: 'Lantern Oil (flask)', desc: 'One flask, eight hours.', cost: 4, effect: { type: 'item', id: 'lantern_oil', name: 'Lantern Oil' } },
          { id: 'rope_30', name: 'Rope (30 ft)', desc: 'Braided hemp. Tested weight.', cost: 8, effect: { type: 'item', id: 'rope_30', name: 'Rope (30 ft)' } },
          { id: 'blank_journal', name: 'Blank Journal', desc: 'Sewn binding. Sixty pages.', cost: 12, effect: { type: 'item', id: 'blank_journal', name: 'Blank Journal' } }
        ]
      }
    ],
    tavern: {
      id: 'shelk_redletter',
      name: 'The Red Letter Inn',
      desc: 'Low ceilings, long benches, and a proprietor who keeps her own records.',
      restCost: 4,
      rumors: [
        { id: 'shelk_r1', text: 'The garrison rotation changed twice in a month. Nobody posts a new schedule without a reason.', minProgress: 0 },
        { id: 'shelk_r2', text: 'A factor from the eastern procurement bureau was here three nights running. He stopped coming after the ward failures started.', minProgress: 2 },
        { id: 'shelk_r3', text: 'Marta charges the same as she always has. The ledger she keeps under the counter is a different matter.', minProgress: 0 },
        { id: 'shelk_r4', text: 'The chapel letters stopped for two days last week. The priest said it was a courier delay. The couriers said nothing.', minProgress: 4 },
        { id: 'shelk_r5', text: 'Someone at the ward office has been pulling names from the resident rolls. Not writing them down — just reading and replacing the book.', minProgress: 3 }
      ]
    }
  },
```

- [ ] **Step 3: Author Fairhaven entry**

```js
  fairhaven: {
    shops: [
      {
        id: 'fairhaven_harbor_supply',
        name: 'The Harbor Provisioner',
        type: 'harbor',
        desc: 'Rope, canvas, dockside tools. A second window sells transit papers.',
        items: [
          { id: 'rations_3', name: 'Three Days\' Rations', desc: 'Dried meal packs.', cost: 5, effect: { type: 'item', id: 'rations_3', name: 'Three Days\' Rations' } },
          { id: 'transit_chit', name: 'Transit Chit', desc: 'One-use passage document for a coastal route.', cost: 15, effect: { type: 'item', id: 'transit_chit', name: 'Transit Chit' } },
          { id: 'calming_compound', name: 'Calming Compound (dose)', desc: 'The compound that circulates at the harbor. Sedating effect. Use with intent.', cost: 3, effect: { type: 'item', id: 'calming_compound', name: 'Calming Compound' } },
          { id: 'waterproof_pouch', name: 'Waterproof Pouch', desc: 'Oilcloth lined. Keeps documents dry.', cost: 6, effect: { type: 'item', id: 'waterproof_pouch', name: 'Waterproof Pouch' } }
        ]
      }
    ],
    tavern: {
      id: 'fairhaven_brokerage',
      name: 'The Brokerage Hearth',
      desc: 'Where the harbor factors drink. The noise is useful cover.',
      restCost: 5,
      rumors: [
        { id: 'fh_r1', text: 'The compound price dropped again. Third time this season. That doesn\'t happen without someone controlling supply.', minProgress: 0 },
        { id: 'fh_r2', text: 'A broker named Tessard lost three agreements in a row. All to the same goods type. He\'s not surprised, which is the interesting part.', minProgress: 1 },
        { id: 'fh_r3', text: 'The garrison was halved after the doctrine revision. They said it was efficiency. The locals said nothing, which is not the same as agreeing.', minProgress: 2 },
        { id: 'fh_r4', text: 'Children in the south quarter have been listless for two months. The physicians use the word "dietary" and stop there.', minProgress: 3 },
        { id: 'fh_r5', text: 'The shrine observance words changed. The ritual is the same but the time given to it is shorter. Elders notice. Elders do not complain out loud.', minProgress: 1 }
      ]
    }
  },
```

- [ ] **Step 4: Author remaining 10 localities**

Follow the same pattern for: guildheart, soreheim, sunspire, mimolot, ithtananalor, panim, shirshal, aurora, glasswake, cosmoria.

**Locality shop type guide (derive from V33_2 identity):**
- `guildheart` — type: 'trade' (guild commerce hub); local specials: guild certification documents, arbitration fee prepayment, courier tokens
- `soreheim` — type: 'labor' (industrial town); local specials: quality tools, equipment repair vouchers, safety gear
- `sunspire` — type: 'frontier' (family syndicate staging area); local specials: route maps, convoy hire documents, preserved food
- `mimolot` — type: 'academic' (academy settlement); local specials: reference texts, ink and vellum, classification keys
- `ithtananalor` — type: 'trade' (Principality of Roaz crossroads); local specials: Roaz-transit documents, border goods
- `panim` — type: 'harbor' (Panim Haven port); local specials: coastal transit, fishing supplies, weather reports
- `shirshal` — type: 'frontier' (House Shirsh border territory); local specials: House Shirsh permits, frontier rations
- `aurora` — type: 'trade' (Aurora Crown commune); local specials: commune goods, mutual-aid vouchers
- `glasswake` — type: 'frontier' (Harvest Circle); local specials: agricultural tools, seed stocks
- `cosmoria` — type: 'harbor' (House Cosmouth harbor); local specials: shipping manifests, dockworker tools

**Tavern rumors rules:**
- Each tavern: 5 rumors minimum, `minProgress` ranges from 0–5
- Rumors at `minProgress: 0` are ambient world texture
- Rumors at `minProgress: 2+` hint at institutional patterns without naming the conspiracy
- No rumor text may use forbidden words: investigation, official (as adjective), contact (as person)
- No rumor may explicitly name Gleam or Ironveil — they are encountered through choices, not rumors

- [ ] **Step 5: Add to HTML script tags**

In `ledger-of-ash.html`, find the block of content/ script tags (near `stage1_boss.js`, `travel_corridors.js`, etc.) and add:

```html
<script src="content/places_data.js"></script>
```

- [ ] **Step 6: Validate JS syntax**

```bash
node --check content/places_data.js
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add content/places_data.js ledger-of-ash.html
git commit -m "feat(places): add places_data.js with shops and taverns for all 12 Stage 1 localities"
```

---

### Task 3: Add G defaults for Places state

**Files:**
- Modify: `ledger-of-ash.html` — G defaults object

- [ ] **Step 1: Find G defaults**

```bash
grep -n "recentChoiceIds:\|recentOutcomeType:" ledger-of-ash.html | head -3
```

- [ ] **Step 2: Add Places-related state**

In the G defaults object, add:

```js
shopSeen: {},          // keyed by item.id — tracks purchased items for sold-out state
tavernRumorsSeen: {},  // keyed by rumor.id — tracks shown rumors to avoid repeat same visit
```

- [ ] **Step 3: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(places): add G.shopSeen and G.tavernRumorsSeen defaults"
```

---

### Task 4: Add Places overlay HTML

**Files:**
- Modify: `ledger-of-ash.html` — HTML overlay section (after `overlay-npcs` at line 2132)

- [ ] **Step 1: Find overlay-npcs in HTML**

```bash
grep -n "overlay-npcs\|id=\"overlay-npcs\"" ledger-of-ash.html | head -3
```

- [ ] **Step 2: Insert Places overlay div after overlay-npcs**

After the closing `</div>` of the `overlay-npcs` block, insert:

```html
<div class="overlay" id="overlay-places">
  <div class="overlay-box">
    <div class="overlay-header">
      <span class="overlay-title">Places</span>
      <button class="overlay-close" data-close="overlay-places">&#x00D7;</button>
    </div>
    <div class="overlay-body" id="places-overlay-body"></div>
  </div>
</div>
```

- [ ] **Step 3: Verify HTML structure**

```bash
node --check ledger-of-ash.html 2>&1 | head -5
```

Expected: no JS errors (this just checks script blocks, but confirms no parse failures).

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(places): add overlay-places HTML structure"
```

---

### Task 5: Implement showPlaces() function

**Files:**
- Modify: `ledger-of-ash.html` — JS section, near `showOverlay` / NPC overlay functions

- [ ] **Step 1: Find the NPC overlay render function location**

```bash
grep -n "npc-overlay-body\|function showNPC\|function renderNPC" ledger-of-ash.html | head -5
```

- [ ] **Step 2: Insert showPlaces() after the NPC overlay section**

```js
function showPlaces() {
  var _loc = G.location || '';
  var _data = (window.PLACES_DATA && window.PLACES_DATA[_loc]) || null;
  var _body = document.getElementById('places-overlay-body');
  if (!_body) return;
  if (!_data) {
    _body.innerHTML = '<div style="color:var(--ink-faint);font-style:italic;font-size:13px">No known establishments at this location.</div>';
    showOverlay('overlay-places');
    return;
  }
  var html = '';
  // Shops section
  if (_data.shops && _data.shops.length) {
    html += '<div style="margin-bottom:16px">';
    html += '<div style="font-family:var(--font-display);font-size:11px;letter-spacing:2px;color:var(--gold-dim);text-transform:uppercase;margin-bottom:10px">Shops</div>';
    _data.shops.forEach(function(shop) {
      html += '<div style="margin-bottom:14px">';
      html += '<div style="font-family:var(--font-display);font-size:13px;color:var(--gold-bright);margin-bottom:2px">' + shop.name + '</div>';
      html += '<div style="font-size:12px;color:var(--ink-faint);margin-bottom:8px;font-style:italic">' + shop.desc + '</div>';
      if (shop.items && shop.items.length) {
        shop.items.forEach(function(item) {
          var _alreadyBought = G.shopSeen && G.shopSeen[item.id];
          html += '<div class="shop-item' + (_alreadyBought ? ' shop-item--sold' : '') + '">';
          html += '<div class="shop-item-info">';
          html += '<div class="shop-item-name">' + item.name + '</div>';
          html += '<div class="shop-item-desc">' + item.desc + '</div>';
          html += '</div>';
          html += '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">';
          html += '<div class="shop-item-cost">' + item.cost + 'g</div>';
          if (!_alreadyBought) {
            html += '<button class="shop-buy-btn" onclick="buyShopItem(\'' + shop.id + '\',\'' + item.id + '\')" '
              + 'data-cost="' + item.cost + '">'
              + (G.gold >= item.cost ? 'Buy' : 'Need ' + item.cost + 'g')
              + '</button>';
          } else {
            html += '<span style="font-size:10px;color:var(--ink-faint)">Purchased</span>';
          }
          html += '</div></div>';
        });
      }
      html += '</div>';
    });
    html += '</div>';
  }
  // Tavern section
  if (_data.tavern) {
    var _tav = _data.tavern;
    html += '<div style="border-top:1px solid var(--border);padding-top:14px">';
    html += '<div style="font-family:var(--font-display);font-size:11px;letter-spacing:2px;color:var(--gold-dim);text-transform:uppercase;margin-bottom:10px">Tavern</div>';
    html += '<div style="font-family:var(--font-display);font-size:13px;color:var(--gold-bright);margin-bottom:2px">' + _tav.name + '</div>';
    html += '<div style="font-size:12px;color:var(--ink-faint);margin-bottom:10px;font-style:italic">' + _tav.desc + '</div>';
    // Rumors
    var _inv = (G.investigationProgress || 0);
    var _eligible = (_tav.rumors || []).filter(function(r) { return (r.minProgress || 0) <= _inv && !(G.tavernRumorsSeen && G.tavernRumorsSeen[r.id]); });
    if (_eligible.length) {
      // Pick 1-2 random rumors
      var _shuffled = _eligible.slice().sort(function() { return Math.random() - 0.5; });
      var _shown = _shuffled.slice(0, 2);
      html += '<div style="margin-bottom:10px">';
      html += '<div style="font-size:11px;color:var(--gold-dim);letter-spacing:1px;text-transform:uppercase;margin-bottom:6px">Overheard</div>';
      _shown.forEach(function(r) {
        if (G.tavernRumorsSeen) G.tavernRumorsSeen[r.id] = true;
        html += '<div style="font-size:13px;color:var(--ink-mid);font-style:italic;border-left:2px solid var(--border);padding-left:10px;margin-bottom:8px">"' + r.text + '"</div>';
      });
      html += '</div>';
    } else {
      html += '<div style="font-size:12px;color:var(--ink-faint);font-style:italic;margin-bottom:10px">The tavern talk is quiet tonight. Nothing you haven\'t heard.</div>';
    }
    // Rest option
    var _restCost = _tav.restCost || 4;
    var _canRest = (G.timeIndex || 0) >= 1; // available afternoon onwards
    if (_canRest) {
      html += '<button class="choice-btn" style="width:100%;margin-top:8px;background:var(--char)" onclick="openTavernRest(' + _restCost + ')">'
        + 'Take a room for the night — ' + _restCost + 'g'
        + (G.gold < _restCost ? ' <span style="color:var(--ember);font-size:11px">(need ' + _restCost + 'g)</span>' : '')
        + '</button>';
    }
    html += '</div>';
  }
  _body.innerHTML = html;
  showOverlay('overlay-places');
}
```

- [ ] **Step 3: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(places): implement showPlaces() with shop catalog and tavern rumor rendering"
```

---

### Task 6: Implement buyShopItem() and openTavernRest()

**Files:**
- Modify: `ledger-of-ash.html` — JS section, immediately after `showPlaces()`

- [ ] **Step 1: Add buyShopItem()**

```js
function buyShopItem(shopId, itemId) {
  var _loc = G.location || '';
  var _data = window.PLACES_DATA && window.PLACES_DATA[_loc];
  if (!_data) return;
  var _shop = (_data.shops || []).find(function(s) { return s.id === shopId; });
  if (!_shop) return;
  var _item = (_shop.items || []).find(function(i) { return i.id === itemId; });
  if (!_item) return;
  if ((G.gold || 0) < _item.cost) {
    if (typeof showToast === 'function') showToast('Not enough gold.');
    return;
  }
  G.gold -= _item.cost;
  if (!G.shopSeen) G.shopSeen = {};
  G.shopSeen[_item.id] = true;
  // Apply item effect
  if (_item.effect) {
    if (_item.effect.type === 'item') {
      if (!Array.isArray(G.inventory)) G.inventory = [];
      G.inventory.push({ id: _item.effect.id, name: _item.effect.name });
    }
  }
  if (typeof addJournal === 'function') addJournal('Purchased: ' + _item.name + ' (' + _item.cost + 'g)', 'event');
  if (typeof updateHUD === 'function') updateHUD();
  if (typeof saveGame === 'function') saveGame();
  // Re-render the places overlay to reflect purchase
  showPlaces();
}
```

- [ ] **Step 2: Add openTavernRest()**

```js
function openTavernRest(cost) {
  if ((G.gold || 0) < cost) {
    if (typeof showToast === 'function') showToast('Not enough gold for a room.');
    return;
  }
  // Close the places overlay before transitioning to rest scene
  var _ov = document.getElementById('overlay-places');
  if (_ov) _ov.classList.remove('active');
  G.gold -= cost;
  if (typeof addJournal === 'function') addJournal('Paid ' + cost + 'g for a room at the tavern.', 'event');
  if (typeof updateHUD === 'function') updateHUD();
  // Route to existing doSleepScene — tavern rest is just a premium access point
  if (typeof doSleepScene === 'function') doSleepScene();
}
```

- [ ] **Step 3: Verify doSleepScene exists**

```bash
grep -n "function doSleepScene" ledger-of-ash.html | head -3
```

Expected: found at some line. If not found, check `campAction('sleep')` instead and route there.

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(places): implement buyShopItem() and openTavernRest() — routes to existing doSleepScene"
```

---

### Task 7: Add Places button to HUD nav

**Files:**
- Modify: `ledger-of-ash.html` — HUD button row (near the NPCs / Map buttons)

- [ ] **Step 1: Find the NPCs button in the HUD**

```bash
grep -n "overlay-npcs\|Show.*Contacts\|Local Contacts\|btn.*npc\|showNPC\|openNPC" ledger-of-ash.html | grep -i "button\|btn\|onclick" | head -10
```

- [ ] **Step 2: Add Places button adjacent to the NPCs button**

Find the NPCs HUD button element. After it (or as a sibling), add:

```html
<button class="hud-btn" id="btn-places" onclick="showPlaces()" title="Places">Places</button>
```

Match the exact class names used by existing HUD buttons in the same row.

- [ ] **Step 3: Verify the overlay close handler wires correctly**

```bash
grep -n "data-close\|overlay-close" ledger-of-ash.html | head -5
```

The `overlay-close` button in the Places overlay HTML uses `data-close="overlay-places"`. Verify the global click handler that processes `data-close` is present:

```bash
grep -n "data-close\|classList.remove.*active" ledger-of-ash.html | grep -v "^.*\/\/" | head -5
```

If a generic `data-close` handler exists, the Places overlay close button will work automatically.

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(places): add Places HUD button"
```

---

### Task 8: Functional test + visual verification

- [ ] **Step 1: Run validators**

```bash
node tests/content/validate-structure.js && node tests/content/validate-content.js
```

Expected: exit 0.

- [ ] **Step 2: Open the game and test**

Open `play.bat`. Start a new game. Navigate to Shelkopolis. Click "Places":
- Shop items visible with gold costs
- Buy an item — gold decreases, item shows "Purchased", journal logs it
- Tavern rumors visible (1-2 random)
- "Take a room for the night" button present
- Click tavern rest — overlay closes, rest scene fires, gold decreases

- [ ] **Step 3: Test edge cases**

- Visit a locality with no places data → overlay shows "No known establishments" message
- Attempt buy with insufficient gold → toast fires, no purchase
- Attempt tavern rest with insufficient gold → toast fires, no rest

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(places): Places overlay complete — shops + tavern rumors + rest integration"
```
