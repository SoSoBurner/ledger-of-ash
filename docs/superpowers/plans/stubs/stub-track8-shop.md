# Track 8 — Shop and Tavern
**System:** Shop ownership de-duplication, tavern rumor refresh, dead renderShop removal
**Files to modify:** `ledger-of-ash.html`
**Functions in scope:** `showShop`, `buyShopItem` (places overlay buy handler ~line 15800), `openTavernRest`, HOWTO_SECTIONS entry (leave to Track 7)
**No-touch:** `PLACES_DATA` content, `SHOP_INVENTORY` content, `showPlacesTab`, `showPlaces`, `addMaterial`, `MATERIAL_DEFS`, `ITEM_DEFS`, save/load

---

## Context

There are two shop UIs in the game:
- **Legacy `showShop()`** (~line 16975): called from choice buttons and NPC service paths. Tracks ownership via `G.inventory.find(inv => inv.id === item.id)`.
- **Places overlay shop** (~line 15651): opened from the map/places overlay. Tracks ownership via `G.shopSeen[item.id]`.

These two UIs share the same `SHOP_INVENTORY` data but use different ownership signals — the same item can be purchased in both UIs independently. Fix SH1 aligns them by writing to `G.shopSeen` in the legacy path.

The tavern rumor system permanently marks rumors seen (`G.tavernRumorsSeen[r.id] = true`) — localities go silent after ~5 visits. Fix SH2 converts to a day-stamp expiry.

`renderShop()` (~line 17435) and `buyLegacyShopItem()` (~line 17459) and `LOCALITY_SHOPS` (~line 17366) are dead code: `renderShop` is never called from any active code path. Fix SH3 removes them.

---

## Pre-Work: Verify Dead Code Before Deletion

Before implementing Fix SH3, grep `ledger-of-ash.html` for all call sites:

```
grep -n "renderShop\b" ledger-of-ash.html
grep -n "buyLegacyShopItem\b" ledger-of-ash.html
grep -n "LOCALITY_SHOPS\b" ledger-of-ash.html
```

Expected results:
- `renderShop`: only the function definition at ~line 17435 (no callers)
- `buyLegacyShopItem`: only definition at ~line 17459 + one reference inside `renderShop` at ~line 17453
- `LOCALITY_SHOPS`: only the definition at ~line 17366 + one reference inside `renderShop` at ~line 17436

If any additional callers exist that were not found in investigation, **stop and report before deleting**.

---

## Fix SH1 — Dual ownership model mismatch (MEDIUM)

**File:** `ledger-of-ash.html`

**Part A — Write to `G.shopSeen` in legacy shop buy handler (~line 17088–17148).**

Locate the buy success path inside `showShop()`. It currently pushes to `G.inventory` and deducts gold. After the `G.inventory.push(...)` line, add:

```js
G.shopSeen = G.shopSeen || {};
G.shopSeen[item.id] = true;
```

There may be two buy paths in `showShop()` (one for Soreheim credits at ~line 17148, one for gold at ~line 17088). Apply the same `G.shopSeen` write to both paths.

**Part B — Update the legacy "already owned" check inside `showShop()`.**

Find the ownership check (currently reads `G.inventory.find(inv => inv.id === item.id)` or similar). Update it to also check `G.shopSeen`:

BEFORE (approximate):
```js
var _owned = G.inventory.some(function(inv) { return inv.id === item.id; });
```

AFTER:
```js
var _owned = (G.shopSeen && G.shopSeen[item.id]) ||
  G.inventory.some(function(inv) { return inv.id === item.id; });
```

Note: The places overlay already writes to `G.shopSeen` at ~line 15802 — no change needed there. The fix is one-directional: legacy shop writes to `G.shopSeen` so the places overlay can see it.

---

## Fix SH2 — Tavern rumors permanently marked seen (MEDIUM)

**File:** `ledger-of-ash.html`

**Part A — Change mark from permanent boolean to day-stamp at ~line 15726:**

BEFORE (line 15726):
```js
G.tavernRumorsSeen[r.id] = true;
```

AFTER:
```js
G.tavernRumorsSeen[r.id] = G.dayCount + 7;
```

This stores the day number on which the rumor becomes eligible again (current day + 7).

**Part B — Update the rumor eligibility filter at ~line 15719:**

The current filter (line 15719) is:
```js
var _eligible = (_tav.rumors || []).filter(function(r) {
  return (r.minProgress || 0) <= _inv2 && !(G.tavernRumorsSeen && G.tavernRumorsSeen[r.id]);
});
```

AFTER:
```js
var _eligible = (_tav.rumors || []).filter(function(r) {
  return (r.minProgress || 0) <= _inv2 &&
    (!G.tavernRumorsSeen || !G.tavernRumorsSeen[r.id] || G.tavernRumorsSeen[r.id] <= G.dayCount);
});
```

The condition `G.tavernRumorsSeen[r.id] <= G.dayCount` evaluates `false` when the stored value is `true` (boolean, from old saves) — old saves will re-show all tavern rumors immediately, which is the correct behavior on migration (better than permanently silent).

**Note on `_inv2`:** This variable may be named differently in the actual code. Read the surrounding context at ~line 15719 to confirm the exact variable name for `G.investigationProgress` before editing.

---

## Fix SH3 — Remove dead renderShop UI (LOW)

**File:** `ledger-of-ash.html`

After confirming zero callers (pre-work step above), remove the following three blocks entirely:

1. `LOCALITY_SHOPS` object declaration (starts at ~line 17366). Remove from `var LOCALITY_SHOPS = {` through the closing `};` — approximately 65 lines.

2. `renderShop()` function (starts at ~line 17435). Remove from `function renderShop() {` through its closing `}` — approximately 24 lines.

3. `buyLegacyShopItem()` function (starts at ~line 17459). Remove from `function buyLegacyShopItem(itemId) {` through its closing `}` — approximately 20 lines.

Do not remove `showShop()`, `shopShowTab()`, or `buyShopItem()` — those are active.

---

## Verify Steps

1. **SH1 — Dual ownership:** Start a new game. Open the shop via a choice (legacy `showShop()` path). Buy any item. Then open the Places overlay → Buy tab. The purchased item must appear as "Owned" / grayed out / not purchasable. Check `G.shopSeen` in browser console — it must contain the item's ID.

2. **SH1 — Reverse:** Buy an item via the Places overlay. Return to legacy `showShop()`. The same item must show as already owned (the legacy path already checks `G.inventory` which is written by the places overlay buy handler).

3. **SH2 — Rumor refresh:** Open the browser console. Set `G.dayCount = 1`. Visit a tavern (locality with tavern rumors in `PLACES_DATA`). Note which rumors appear. Advance day: `G.dayCount = 9`. Visit the same tavern again. Rumors that were shown on day 1 must appear again (7-day window has passed). Confirm `G.tavernRumorsSeen[r.id]` in console shows a number (not `true`).

4. **SH3 — Dead code removed:** After deletion, run `npm run test:content`. Must show 0 new violations. Grep for `renderShop` in `ledger-of-ash.html` — must return no results. Open the game and visit a shop via a choice button — shop must still appear correctly (confirming `showShop()` was not accidentally removed).

---

## Git Commit Message Template

```
fix(shop): align dual ownership tracking, add 7-day tavern rumor refresh, remove dead renderShop/LOCALITY_SHOPS code

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
