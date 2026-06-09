# Track 3 — Travel System
## Agent Brief: Fix T1

**Source file:** `C:\Users\CEO\ledger-of-ash\ledger-of-ash.html`
**Functions in scope:** `_showModeSelectInOverlay`, `_showPackChoicesInOverlay`, `startOverlayJourney`
**No-touch list:** `TRAVEL_ROUTES` (data — do not modify), `ROUTE_SPATIAL_DATA` (data — do not modify), `advanceDayLeg`, `_completeJourney`, `BG_LOCATION_MAP`

---

## Context

This is a self-contained repair brief. Read only this file and the source file listed above.

**Architecture note:** `ledger-of-ash.html` is a ~16K line single-file game. ES5 only. All travel implementation is in this file plus `content/travel_corridors.js` — the file `js/travel.js` is a dead copy and must not be edited.

**The bug (HIGH):** Players who start in short-form starting localities (aurora, guildheart, panim, soreheim, mimolot, sunspire) always see `totalDays = 1` when they open the travel overlay. The route key mismatch causes `TRAVEL_ROUTES[routeKey]` to return `undefined`, and the code falls back to a default of 1 day.

**Root cause:** `_showModeSelectInOverlay` computes `_LOC_ALIAS_OVL` (a map from short-form IDs to full canonical IDs like `aurora` → `aurora_crown_commune`) for its own `ROUTE_SPATIAL_DATA` lookup. But it passes the raw unaliased `G.location` to `_showPackChoicesInOverlay`. `_showPackChoicesInOverlay` then builds the route key as `G.location + '|' + toId` — which doesn't match any `TRAVEL_ROUTES` key because those use full canonical IDs.

---

## Step 0 — Read the relevant functions first

Before making any changes, read approximately lines 14280–14370 of `ledger-of-ash.html`. Confirm:

1. `_LOC_ALIAS_OVL` is defined inside `_showModeSelectInOverlay` as an object mapping short IDs to full IDs.
2. The call to `_showPackChoicesInOverlay` at approximately **line 14344** passes `G.location` as the first argument.
3. `_showPackChoicesInOverlay`'s signature — confirm the first parameter is `fromId`.
4. Confirm that `startOverlayJourney` (approximately line 4284) builds `routeKey = fromId + '|' + toId` using its arguments directly.

Read approximately lines 4280–4300 to confirm `startOverlayJourney`'s route key construction.

---

## Fix T1 — Alias not passed downstream

### The change (single line)

Find the call to `_showPackChoicesInOverlay` inside `_showModeSelectInOverlay`, at approximately **line 14344**.

**BEFORE:**
```js
_showPackChoicesInOverlay(G.location, _toLocId, _route, _mode);
```

**AFTER:**
```js
var _fromAlias = _LOC_ALIAS_OVL[G.location] || G.location;
_showPackChoicesInOverlay(_fromAlias, _toLocId, _route, _mode);
```

### Why this is safe

`_LOC_ALIAS_OVL[G.location] || G.location` is a safe fallback: if `G.location` is already the full canonical ID (e.g., player started at `shelkopolis`), the alias lookup returns `undefined` and the `||` falls through to `G.location` unchanged. Players who don't use short-form starting localities are unaffected.

### What to verify before committing

After making the change, confirm that `_showPackChoicesInOverlay` does NOT re-alias its `fromId` argument internally before passing it to `startOverlayJourney`. If it does, the alias would be applied twice. The expected flow is:

```
G.location (may be short-form)
  → _LOC_ALIAS_OVL lookup → full canonical ID
    → _showPackChoicesInOverlay(fullId, ...)
      → startOverlayJourney(fullId, ...)
        → routeKey = fullId + '|' + toId   ← matches TRAVEL_ROUTES key
```

If `_showPackChoicesInOverlay` contains its own alias lookup, remove one of the two alias steps (keep whichever is closer to `startOverlayJourney`).

---

## Verification Steps (browser-checkable)

Open `ledger-of-ash.html` via `play.bat`.

**Test T1 — Short-form starting locality:**
1. Create a new character and select a starting location that maps to a short-form ID. The affected IDs are: `aurora`, `guildheart`, `panim`, `soreheim`, `mimolot`, `sunspire`.
   - Fastest: choose any background that starts in one of these.
2. Once in the game, open the map/travel overlay and select any destination.
3. In the pack selection step, confirm the travel duration shown is **greater than 1 day** (the actual route distance).
4. **Console check:** Before clicking, add `console.log` temporarily or use `window._LOC_ALIAS_OVL` in the console to confirm the alias resolves. Alternatively: `G.location` returns `'aurora'` or similar short form; after the fix, the route key used must be `'aurora_crown_commune|[dest]'` matching the TRAVEL_ROUTES entry.

**Test T1 — Full-ID starting locality (regression):**
1. Create a character starting at `shelkopolis` or another full-ID locality.
2. Open travel overlay → pack step.
3. Confirm days still show correctly (not regressed to 1).

**Test T1 — Complete a journey:**
1. Pick a 3+ day route. Accept the journey.
2. Advance through choices until journey completes.
3. **Console check:** `G.dayCount` must advance by the actual route days, not by 1.

---

## Git Commit Message Template

```
fix(travel): pass aliased fromId to _showPackChoicesInOverlay

_showModeSelectInOverlay computed _LOC_ALIAS_OVL for its own lookup but
passed raw G.location to _showPackChoicesInOverlay. Short-form starting
localities (aurora, panim, etc.) produced unmatched TRAVEL_ROUTES keys,
collapsing every journey to totalDays=1.

Now computes _fromAlias before the downstream call; falls back to G.location
for full-ID localities (no regression).

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
