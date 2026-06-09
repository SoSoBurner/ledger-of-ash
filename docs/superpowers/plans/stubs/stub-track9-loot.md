# Track 9 — Loot System
**System:** Material sell price registration for ENEMY_TEMPLATES drops
**File to modify:** `ledger-of-ash.html`
**Functions in scope:** `MATERIAL_SELL_PRICES` object (~line 16944)
**No-touch:** `addMaterial`, `addToInventory`, material drop logic in `ENEMY_TEMPLATES`, `endCombat`, sell UI rendering at ~line 15679 and ~line 15763, `showShop`

---

## Context

`MATERIAL_SELL_PRICES` is a flat object at ~line 16944 of `ledger-of-ash.html`. Both sell UIs filter sellable materials through this table:

- Places overlay sell tab (~line 15679): `var _msp = (typeof MATERIAL_SELL_PRICES !== 'undefined') ? MATERIAL_SELL_PRICES : {};`
- Legacy sell tab in `showShop()` (~line 17043): `var _mats = G.materials ? Object.keys(G.materials).filter(function(k) { return (G.materials[k] || 0) > 0 && MATERIAL_SELL_PRICES[k]; }) ...`

Any material ID absent from `MATERIAL_SELL_PRICES` is invisible in both sell UIs — it accumulates in `G.materials` silently and can never be sold.

**Confirmed gap:** Five material IDs appear in `ENEMY_TEMPLATES` loot tables but are missing from `MATERIAL_SELL_PRICES`:

| Material ID | Source enemies | Current MATERIAL_SELL_PRICES entry |
|---|---|---|
| `parchment_roll` | patrol_scribe (~line 3398), ceremonial_guard (~line 3615) | ABSENT |
| `salt_cloth` | harbor_enforcer (~line 3391) | ABSENT |
| `hide_scrap` | dust_hound (~line 3521), raider_scout (~line 3598) | ABSENT |
| `swamp_resin` | bog_stalker (~line 3259), murk_crawler (~line 3265) | ABSENT |
| `beast_bone` | thick_bull (~line 3528), stone_chitin (~line 3535), predator (~line 3591), dense_bone (~line 3605) | ABSENT |

**Note on L1:** Boss loot format fix (array vs flat-object) is handled in Track 2 (Fix B2). Do not modify `endCombat` boss loot handling in this track.

---

## Fix L2 — Add 5 missing material IDs to MATERIAL_SELL_PRICES (MEDIUM)

**File:** `ledger-of-ash.html`
**Location:** `MATERIAL_SELL_PRICES` object at ~line 16944–16966

Current end of the object:
```js
var MATERIAL_SELL_PRICES = {
  stamped_paper: 2,
  iron_shard: 3,
  frontier_fiber: 2,
  debt_ledger_scraps: 1,
  ash_compound: 2,
  enforcement_resin: 4,
  patrol_insignia: 4,
  house_crest_brass: 5,
  shadow_residue: 6,
  contract_fragment: 8,
  carved_seal: 7,
  guild_token: 5,
  allocation_chit: 3,
  contraband_note: 5,
  rope_coil: 2,
  salt_iron: 3,
  cold_iron: 4,
  highland_cloth: 3,
  bone_pin: 2,
  bone_shard: 2,
  beast_hide: 5
};
```

AFTER — add the 5 missing entries before the closing `}`:
```js
var MATERIAL_SELL_PRICES = {
  stamped_paper: 2,
  iron_shard: 3,
  frontier_fiber: 2,
  debt_ledger_scraps: 1,
  ash_compound: 2,
  enforcement_resin: 4,
  patrol_insignia: 4,
  house_crest_brass: 5,
  shadow_residue: 6,
  contract_fragment: 8,
  carved_seal: 7,
  guild_token: 5,
  allocation_chit: 3,
  contraband_note: 5,
  rope_coil: 2,
  salt_iron: 3,
  cold_iron: 4,
  highland_cloth: 3,
  bone_pin: 2,
  bone_shard: 2,
  beast_hide: 5,
  parchment_roll: 3,
  salt_cloth: 4,
  hide_scrap: 5,
  swamp_resin: 6,
  beast_bone: 7
};
```

Prices are functional defaults based on rarity/source tier. They may be adjusted in a future economy balance pass — the priority here is making the materials visible in sell UIs.

---

## Verify Steps

1. Open browser console on a save where any of these materials exist in `G.materials`, OR defeat a bog_stalker (drops `swamp_resin`) in combat.
2. Open the Places overlay → Sell tab. `swamp_resin` (or whichever material was acquired) must now appear in the sellable list with a price.
3. Confirm via console: `MATERIAL_SELL_PRICES['hide_scrap']` must return `5` (not `undefined`).
4. Confirm via console: `MATERIAL_SELL_PRICES['beast_bone']` must return `7` (not `undefined`).
5. Sell a `hide_scrap` in the Places overlay. `G.gold` must increase by 5. `G.materials.hide_scrap` must decrease by 1.
6. Run `npm run test:content` — must show 0 new violations.

---

## Git Commit Message Template

```
fix(loot): register parchment_roll/salt_cloth/hide_scrap/swamp_resin/beast_bone in MATERIAL_SELL_PRICES — materials now appear in sell UI

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
