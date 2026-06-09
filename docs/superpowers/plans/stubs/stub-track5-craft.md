# Track 5 — Craft System
## Agent Brief: Fix CR1–CR5 (CR4 is HUD-policy gated — see below)

**Source files:**
- `C:\Users\CEO\ledger-of-ash\ledger-of-ash.html` (primary — all engine changes here)
- `C:\Users\CEO\ledger-of-ash\content\item_system.js` (reference — confirm craft roll pattern, do not change)
- `C:\Users\CEO\ledger-of-ash\content\craftspire_stage2_enriched_choices.js` (reference — do not change)

**Functions in scope:** `campAction` (craft branch ~line 14740), `SKILL_LABELS` (~line 15367), `getDefaultG`, archetype starting-skills initialization
**No-touch list:** `CRAFT_RECIPES`, `getAllRecipes`, `hasMaterials`, `addMaterial`, `MATERIAL_DEFS`, `ITEM_DEFS`, `rollD20` internals, HUD layout (CR4 is gated)

---

## Context

This is a self-contained repair brief. Read only this file and the source files listed above.

**Architecture note:** `ledger-of-ash.html` is a ~16K line single-file game. ES5 only. `G` is module-scope (never `window.G`). Content files in `content/` are loaded via `<script src>` tags. The `craft` skill is a real `G.skills` key for crafting archetypes (artificer, engineer, alchemist) — it is NOT the same as the internal old-key system (`combat`, `lore`, etc.). It is a display-name key like `might` and `wits`.

**Bugs confirmed by headed playtest (2026-06-06):**

| ID | Severity | Description |
|----|----------|-------------|
| CR1 | HIGH | `campAction('craft')` rolls `spirit` not `craft` — crafting archetypes get no benefit from their primary skill during camp crafting |
| CR2 | HIGH | `SKILL_LABELS` has `craft: 'Spirit'` — training menu shows two "Spirit" entries |
| CR3 | HIGH | `getDefaultG()` omits `craft` from skills — on save/load, `Object.assign` with `getDefaultG()` clobbers craft value to undefined |
| CR4 | MEDIUM | `craft` shown in HUD for ALL archetypes (non-crafting archetypes see CRAFT: 0 in stats) — **HUD POLICY GATED** |
| CR5 | HIGH | Crafting archetypes start with `craft: 0` — all tier-1 abilities gate on `craft >= 1`, so new crafting archetypes can't unlock any abilities organically |

---

## Step 0 — Read before editing

Read these approximate line ranges in `ledger-of-ash.html`:
1. **~line 14720–14770:** `campAction` craft branch — find the `rollD20` call for crafting, confirm the skill argument
2. **~line 15360–15380:** `SKILL_LABELS` object — confirm the `craft` entry value
3. **~line 10160–10200:** `getDefaultG()` — confirm the `skills` object declared there
4. **~line 10640–10680:** Archetype starting-skills initialization — find where `G.skills` receives initial values per archetype (look for archetype names like `'artificer'`, `'engineer'`, `'alchemist'` near skill assignments)

Implement against what you find. Line numbers in this brief are approximate.

---

## Fix CR1 — campAction('craft') rolls wrong skill

### Location
`campAction` function, craft branch, approximately **line 14747** in `ledger-of-ash.html`.

### Find this code
The craft branch rolls a skill. It will look like one of:
```js
var _craftResult = rollD20('spirit', (G.skills.spirit || 0) + ...);
// or:
rollD20('spirit', G.skills.spirit || 0);
```

### Replace with
```js
var _craftResult = rollD20('craft', (G.skills.craft || 0) + ...);
```

If the DC modifier line also reads `G.skills.spirit` (for a bonus-to-DC calculation), update that line too:
```js
// Change G.skills.spirit to G.skills.craft in the DC modifier
```

Do not change the `rollD20` function itself. Only change the arguments passed to it in this craft branch.

---

## Fix CR2 — Training menu mislabels Craft as Spirit

### Location
`SKILL_LABELS` object at approximately **line 15367** in `ledger-of-ash.html`.

### Find this entry
```js
craft: 'Spirit',
```

### Replace with
```js
craft: 'Craft',
```

This is a one-word change. `SKILL_LABELS` is used to render the training menu — after this fix, the training menu will show "Craft" instead of a second "Spirit" entry.

---

## Fix CR3 — Add craft to getDefaultG() for save compatibility

### Location
`getDefaultG()` function at approximately **line 10168** in `ledger-of-ash.html`. Find the `skills` object inside it.

### Find this (approximate — actual code may differ slightly):
```js
skills: { might: 0, vigor: 0, wits: 0, charm: 0, finesse: 0, spirit: 0 },
```

### Replace with
```js
skills: { might: 0, vigor: 0, wits: 0, charm: 0, finesse: 0, spirit: 0, craft: 0 },
```

**Why this matters:** `loadFromSlot` does `Object.assign(G, getDefaultG(), savedData)`. If `craft` is absent from `getDefaultG()` and also absent from an old save, `G.skills.craft` will be `undefined` after load. `undefined` breaks `G.skills.craft || 0` guards when the guard is applied to property access rather than the result. Adding it to `getDefaultG()` as `0` is safe for all saves — old saves that lack the key will get `0` (correct), new saves will have the key (correct).

---

## Fix CR4 — HUD craft visibility (HUD POLICY GATED — DO NOT IMPLEMENT WITHOUT APPROVAL)

**What:** Hide the `craft` skill row from HUD stats for non-crafting archetypes (bard, thief, priest, paladin, etc.). Currently every archetype sees `CRAFT: 0` in their stats panel.

**Why it is gated:** The HUD Change Policy requires user confirmation before modifying HUD layout or visible element count.

**The proposed change (DO NOT implement yet):**
In `updateHUD()`, the skills loop iterates `Object.entries(G.skills || {})`. Add a filter that skips `craft` unless the archetype is a crafting archetype:
```js
var _craftArchetypes = ['artificer', 'engineer', 'alchemist'];
// In the skills render loop, skip craft for non-crafting archetypes:
if (sk === 'craft' && _craftArchetypes.indexOf(G.archetype) === -1) continue;
```

**Action required:** After CR1–CR3 and CR5 are complete, ask the user: "Fix CR4 would hide the CRAFT stat row from non-crafting archetypes' HUD (bard, thief, etc.). This changes the stats panel layout. Do you want this applied?" Implement only if user confirms.

---

## Fix CR5 — Add craft starting bonus for crafting archetypes

### Location
Archetype starting-skills initialization at approximately **line 10658** in `ledger-of-ash.html`. Find the block where archetype-specific starting skill values are assigned (search for `'artificer'` or `G.archetype` near skill assignments in the character creation flow).

### Add this block

Place it after the general skills initialization, within the character-creation flow, guarded by archetype:

```js
var _craftFamilyArchetypes = ['artificer', 'engineer', 'alchemist'];
if (_craftFamilyArchetypes.indexOf(G.archetype) !== -1) {
  G.skills.craft = 2;
}
```

**Why 2:** Crafting archetype abilities gate on `skillReq: {skill: 'craft', min: 1}` (tier 1) and `min: 2` (tier 2). Starting at 2 gives immediate access to tier-1 abilities and a clear path to tier-2 abilities through training. Starting at 1 would gate tier-2 abilities behind one training session, which is reasonable but means new characters still can't see their full ability trees. 2 is the minimum that makes the system feel functional at character creation.

**Do not** set craft higher than 2 — this would skip the normal growth arc and overlap with tier-3 gating.

---

## Verification Steps (browser-checkable)

Open `ledger-of-ash.html` via `play.bat`.

**Test CR1 — Camp craft rolls the right skill:**
1. Create an artificer (or engineer or alchemist).
2. Open camp panel → Craft tab.
3. Attempt a craft action.
4. **Console check:** `G._lastRollInfo.skill` must be `'craft'` (not `'spirit'`). The roll total must reflect `G.skills.craft` (should be 2 after Fix CR5).

**Test CR2 — Training menu shows Craft, not two Spirits:**
1. Open camp panel → Train tab (or however training is accessed).
2. **Expected:** The skill list shows one "Spirit" entry and one "Craft" entry. No duplicate "Spirit."

**Test CR3 — Craft survives save/load:**
1. Create an artificer. Confirm `G.skills.craft === 2` in console.
2. Save the game (any slot).
3. Load the game.
4. **Console check:** `G.skills.craft` must still be `2` after load (not `undefined` or `0` regressed by `Object.assign`).

**Test CR5 — Crafting archetype starts with craft skill:**
1. Create an artificer character.
2. **Console check:** `G.skills.craft === 2` immediately after character creation.
3. Open Abilities tab.
4. **Expected:** At least one tier-1 ability shows as unlockable (not all LOCKED). Specifically: abilities with `skillReq.min === 1` should be accessible.

**Test CR5 — Non-crafting archetype unaffected:**
1. Create a paladin (or any non-crafting archetype).
2. **Console check:** `G.skills.craft === 0` (from `getDefaultG()`, not 2).

---

## Git Commit Message Template

```
fix(craft): roll craft skill in camp crafting; fix SKILL_LABELS; add craft to defaults; start crafting archetypes at craft:2

Fix CR1: campAction('craft') rolled spirit — crafting archetypes got no
bonus from their primary skill. Changed to rollD20('craft', G.skills.craft).

Fix CR2: SKILL_LABELS had craft:'Spirit', creating duplicate Spirit entry in
training menu. Changed to craft:'Craft'.

Fix CR3: getDefaultG() omitted craft from skills object; Object.assign on
load clobbered craft value. Added craft:0 to defaults for save compatibility.

Fix CR5: Crafting archetypes (artificer/engineer/alchemist) started at
craft:0, gating all tier-1 abilities behind training. Now start at craft:2,
giving immediate access to tier-1 abilities at character creation.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
