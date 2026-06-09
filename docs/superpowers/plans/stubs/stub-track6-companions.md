# Track 6 — Companion System
## Agent Brief: Fix CP1–CP6 + Kaevrin Implementation

**Source files:**
- `C:\Users\CEO\ledger-of-ash\ledger-of-ash.html` (primary — engine functions)
- `C:\Users\CEO\ledger-of-ash\content\maren_oss_encounter.js` (CP1 — read and edit)
- `C:\Users\CEO\ledger-of-ash\content\stage2_climax.js` (reference — do not edit)

**Functions in scope:** `MAREN_ENCOUNTER` / `MAREN_OSS_ENCOUNTER`, `canRecruit`, `showRecruitScene`, `showCampTalk`, `buildCompanionHudHTML`, `updatePartyTab`, `loadStageChoices`, `COMPANION_PASSIVES`, `COMPANION_ABILITIES`

**No-touch list:** `resolveRecruitChoice`, `resolveCombatAction` companion_ability branch, `G.companions` structure (save/load is working), `COMPANION_DEFS` entries for `vorath_gelden` and `mira_calden`, `stage2_climax.js` (read-only), `STAGE2_BOSS_MODULE`

---

## Context

This is a self-contained repair brief. Read only this file and the source files listed above.

**Architecture note:** `ledger-of-ash.html` is a ~16K line single-file game. ES5 only. `G` is module-scope. Content files loaded via `<script src>` tags. `window.MAREN_OSS_ENCOUNTER` is set by `content/maren_oss_encounter.js` — a different name from what the engine expects.

**Critical dependency order:** Fix CP1 (name mismatch) must be implemented first — it unblocks the entire companion chain. CP2–CP6 depend on the encounter triggering correctly.

**Bugs overview:**

| ID | Severity | Description |
|----|----------|-------------|
| CP1 | CRITICAL | Engine calls `window.MAREN_ENCOUNTER` but content exports `window.MAREN_OSS_ENCOUNTER` — encounter permanently skipped |
| CP2 | HIGH | `updatePartyTab` filters by `c.active` (boolean) but entries use `c.status === 'active'` (string) — party tab always empty |
| CP3 | HIGH | `buildCompanionHudHTML` reads `def.passive` but `COMPANION_DEFS` has no `passive` field — companion HUD description always blank |
| CP4 | HIGH | `showCampTalk` gates on `G.flags.maren_oss_resolved` but other companion gates use `companion_gate_open` — talk option shows "No companion" even with active companions |
| CP5 | MEDIUM | No enriched choice or code path calls `showRecruitScene()` automatically — players have no organic way to recruit after gate opens |
| CP6 | HIGH | Kaevrin defined in `COMPANION_DEFS` but missing from `COMPANION_PASSIVES`, `COMPANION_ABILITIES`, and has no recruit trigger |

---

## Step 0 — Read before editing

Before any changes, read:
1. `content/maren_oss_encounter.js` lines 100–130: confirm the export name (`window.MAREN_OSS_ENCOUNTER` or `window.MAREN_ENCOUNTER`?) and the exported method names (`shouldTrigger`, `checkTrigger`, or other?)
2. `ledger-of-ash.html` ~line 13695–13710: confirm the exact `typeof window.MAREN_ENCOUNTER` check (or similar) and what method it calls
3. `ledger-of-ash.html` ~line 17765–17785: `updatePartyTab` — find the filter line
4. `ledger-of-ash.html` ~line 17470–17490: `buildCompanionHudHTML` — find the passive read
5. `ledger-of-ash.html` ~line 2630–2645: `showCampTalk` — find the flag gate
6. `ledger-of-ash.html` ~line 2280–2350: `COMPANION_DEFS` — find Kaevrin's entry, confirm its `id` field and `campLines`
7. `ledger-of-ash.html` ~line 2415–2435: `COMPANION_PASSIVES` and `COMPANION_ABILITIES` — confirm existing structure and Kaevrin's absence

Implement against what you find. All line numbers are approximate.

---

## Fix CP1 — MAREN_ENCOUNTER name mismatch (CRITICAL — implement first)

### Location
`ledger-of-ash.html` at approximately **line 13700**.

### The mismatch
`content/maren_oss_encounter.js` exports: `window.MAREN_OSS_ENCOUNTER`
Engine checks: `window.MAREN_ENCOUNTER` (missing `_OSS_`)

Confirm the exact names by reading both files (Step 0 above) before applying.

### Change in ledger-of-ash.html (~line 13700)

**BEFORE:**
```js
if (typeof window.MAREN_ENCOUNTER !== 'undefined' && window.MAREN_ENCOUNTER.shouldTrigger()) {
```

**AFTER:**
```js
if (typeof window.MAREN_OSS_ENCOUNTER !== 'undefined' && window.MAREN_OSS_ENCOUNTER.shouldTrigger()) {
```

Also check: if the engine later calls `window.MAREN_ENCOUNTER.someMethod()` anywhere else in the file, update all references to `window.MAREN_OSS_ENCOUNTER`. Search for `MAREN_ENCOUNTER` (without `_OSS_`) and replace all occurrences that reference the module (not variable declarations inside `maren_oss_encounter.js`).

### Supplemental check — method name
Confirm `maren_oss_encounter.js` exports a `shouldTrigger` method (not `checkTrigger`). If it exports `checkTrigger`, update the call in the engine to match. Never change the export name in `maren_oss_encounter.js` — change the call site in `ledger-of-ash.html`.

---

## Fix CP2 — Party tab filter wrong property

### Location
`updatePartyTab()` at approximately **line 17771** in `ledger-of-ash.html`.

### BEFORE
```js
var _active = Object.values(G.companions || {}).filter(function(c){ return c.active; });
```

### AFTER
```js
var _active = Object.values(G.companions || {}).filter(function(c){ return c.status === 'active'; });
```

`G.companions` entries have a `status` string field set to `'active'` when recruited. There is no boolean `active` field. This single character-property change makes the party tab correctly show active companions.

---

## Fix CP3 — HUD companion passive line always blank

### Location
`buildCompanionHudHTML()` at approximately **line 17478** in `ledger-of-ash.html`.

### BEFORE
```js
var _passiveDesc = def.passive || '';
```

### AFTER
```js
var _passiveText = def.abilities && def.abilities.find(function(a){ return a.type === 'passive'; });
var _passiveDesc = _passiveText ? _passiveText.desc : '';
```

`COMPANION_DEFS` entries have an `abilities` array where passive abilities have `type: 'passive'`. There is no top-level `passive` string. This reads the first passive ability's description for the HUD display.

---

## Fix CP4 — showCampTalk wrong gate flag

### Location
`showCampTalk()` at approximately **line 2636** in `ledger-of-ash.html`.

### Find the gate check
The function will contain a guard that returns early if a condition is unmet. It currently reads:
```js
if (!G.flags.maren_oss_resolved) { /* return or show error */ return; }
```

### Replace the flag name
```js
if (!G.flags.companion_gate_open) { /* return or show error */ return; }
```

**Important:** Add `G && G.flags &&` null guards per project convention:
```js
if (!(G && G.flags && G.flags.companion_gate_open)) { /* ... */ return; }
```

**Why:** `companion_gate_open` is set by `_closeClimax()` in `content/stage2_climax.js` when the Stage II companion gate opens. `maren_oss_resolved` is a different flag set earlier during the Maren encounter. Both flags may be set but they gate different things. The camp talk system should open when the companion gate is open — which is `companion_gate_open`, not `maren_oss_resolved`.

---

## Fix CP5 — Wire auto-injection of recruit choices

### Location
`loadStageChoices()` at approximately **line 14463** in `ledger-of-ash.html`.

### Find the injection point
`loadStageChoices` builds an array of choices and calls `renderChoices`. Find the point where additional choices can be appended to `_choices` (or whatever the local choices array variable is named — search for `renderChoices(` near the end of `loadStageChoices` to find the array name).

### Add recruit injection block

**Insert this block after the base choices are built, before `renderChoices` is called:**

```js
// Companion recruit injection — fires once per companion when gate is open
if (G.flags && G.flags.companion_gate_open) {
  var _RECRUITABLE = ['vorath_gelden', 'mira_calden', 'kaevrin'];
  _RECRUITABLE.forEach(function(defId) {
    if (!G.companions[defId] && typeof showRecruitScene === 'function') {
      var _recruitDef = COMPANION_DEFS && COMPANION_DEFS[defId];
      var _recruitLabel = (_recruitDef && _recruitDef.joinScene && _recruitDef.joinScene.trigger)
        || 'A familiar face is nearby.';
      _choices.push({
        label: _recruitLabel,
        fn: function() { showRecruitScene(defId); },
        plot: 'main',
        tags: ['Relationship', 'Safe']
      });
    }
  });
}
```

**Important:** The `defId` variable in the `forEach` closure must be captured correctly in ES5. If the forEach callback is declared with `function(defId)`, the `defId` inside `fn: function() { showRecruitScene(defId); }` will close over the loop parameter correctly. Verify this works — if there is a closure issue (all 3 companions show the same defId), wrap each push in an IIFE:

```js
(function(id) {
  _choices.push({
    label: ...,
    fn: function() { showRecruitScene(id); },
    ...
  });
}(defId));
```

**Replace `_choices`** with the actual choices array variable name used in `loadStageChoices`.

---

## Fix CP6 — Kaevrin: Full companion implementation

### Step 0 — Confirm Kaevrin's COMPANION_DEFS entry

Read `ledger-of-ash.html` ~lines 2282–2345. Find Kaevrin's entry in `COMPANION_DEFS`. Note:
- The exact `id` field value (should be `'kaevrin'`)
- Whether `campLines` are present
- Whether a `joinScene` object exists with a `trigger` string

If `campLines` are absent, add them (see below). If `joinScene.trigger` is absent, add it.

### Part A — Add to COMPANION_PASSIVES

Find `COMPANION_PASSIVES` at approximately **line 2417** in `ledger-of-ash.html`. Add:

```js
kaevrin: {skill: 'wits', bonus: 2, condition: 'intelligence_gather'},
```

This gives Kaevrin's passive (analyst role: +2 wits on intelligence-gathering choices). Match the existing format of other entries in `COMPANION_PASSIVES`.

### Part B — Add to COMPANION_ABILITIES

Find `COMPANION_ABILITIES` at approximately **line 2425** in `ledger-of-ash.html`. Add:

```js
kaevrin: {
  name: 'Pattern Analysis',
  type: 'special',
  desc: 'Kaevrin reviews the available options. One hidden path becomes visible.',
  effect: {type: 'dc_reduce', amount: 2, duration: 1}
},
```

Match the format of existing entries (Vorath's or Mira's). The `type: 'special'` maps to the in-combat companion ability system.

### Part C — Kaevrin's recruit trigger in CP5 injection

The CP5 fix already includes `'kaevrin'` in `_RECRUITABLE`. No additional work needed for recruitment.

### Part D — Kaevrin's campLines

If Kaevrin's entry in `COMPANION_DEFS` already has `campLines`, no change needed — Fix CP4 (gate fix) will make them render.

If `campLines` are missing, add them inside Kaevrin's `COMPANION_DEFS` entry:

```js
campLines: [
  "Kaevrin spreads a hand-drawn map across the camp table, tracing routes with a blunt finger.",
  "\"The patterns are there,\" Kaevrin says, without looking up. \"You just need to know where to look.\"",
  "She's cataloguing your journey notes again — organizing what you've seen into something she calls a 'threat lattice.'"
]
```

### Part E — Future placeholders (DO NOT MODIFY)

Five companion IDs (`sera_vale`, `toriel_palevow`, `neren_rimebridge`, `elyra_mossbane`, `vera_wren`) have `COMPANION_PASSIVES` and `COMPANION_ABILITIES` entries but no `COMPANION_DEFS` entries, no recruit scenes, and no trigger logic. Do not modify or remove them. They are future-sprint content.

---

## Verification Steps (browser-checkable)

Open `ledger-of-ash.html` via `play.bat`.

**Test CP1 — Maren encounter triggers:**
1. Play into Stage II (or advance manually via console: `G.stage = 'Stage II'; G.stageProgress[2] = 3;` and trigger an arrival).
2. Confirm the Maren Oss encounter fires as a choice or modal.
3. **Console check:** `typeof window.MAREN_OSS_ENCOUNTER` must return `'object'`. `window.MAREN_ENCOUNTER` must be `undefined`.

**Test CP2 — Party tab shows active companions:**
1. Force `companion_gate_open` (after Fix CP4 and CP5 are in): advance to gate-open state.
2. Recruit Vorath (via the injected choice from Fix CP5).
3. Open the Party tab in the character sheet.
4. **Expected:** Vorath's entry is visible with status "Active." Panel does NOT show "No companions."

**Test CP3 — HUD companion passive description:**
1. With Vorath recruited and active, check the companion panel in the HUD sidebar.
2. **Expected:** Vorath's name is shown AND a passive description is visible (not empty/blank).

**Test CP4 — Camp talk with active companion:**
1. Vorath is active and `companion_gate_open` is set.
2. Open camp → Talk option.
3. **Expected:** Vorath's campLine narration renders (not "No companion present").

**Test CP5 — Recruit choices appear organically:**
1. Advance to `companion_gate_open` state.
2. Make a choice at any location.
3. **Expected:** A choice labeled with Vorath's `joinScene.trigger` text (or "A familiar face is nearby") appears in the choice list.
4. Click it → `showRecruitScene('vorath_gelden')` executes.

**Test CP6 — Kaevrin is recruitable:**
1. With `companion_gate_open` and Vorath not yet recruited (or in a separate save with Vorath already recruited):
2. Kaevrin's recruit choice must also appear in the choice list.
3. Recruit Kaevrin → party tab shows Kaevrin.
4. **Console check:** `G.companions['kaevrin'].status === 'active'`.

**Test CP6 — Kaevrin camp talk:**
1. With Kaevrin active, open camp → Talk.
2. **Expected:** Kaevrin's campLine appears.

---

## Git Commit Message Template

```
fix(companions): wire MAREN_OSS_ENCOUNTER name, party tab filter, HUD passive, camp gate, recruit injection; implement Kaevrin

Fix CP1: engine called window.MAREN_ENCOUNTER; content exports
window.MAREN_OSS_ENCOUNTER. Encounter permanently skipped. Updated call site.

Fix CP2: updatePartyTab filtered c.active (boolean); entries use c.status
==='active' (string). Party tab always showed empty. Fixed filter property.

Fix CP3: buildCompanionHudHTML read def.passive (absent); COMPANION_DEFS
uses abilities array with type:'passive'. HUD passive line always blank.
Now finds first passive ability's desc.

Fix CP4: showCampTalk gated on maren_oss_resolved; all other companion gates
use companion_gate_open. Camp talk unavailable with active companions.

Fix CP5: No enriched choice called showRecruitScene organically. Injected
recruit choices into loadStageChoices when companion_gate_open is set.

Fix CP6: Kaevrin defined in COMPANION_DEFS but absent from COMPANION_PASSIVES
and COMPANION_ABILITIES. Added Pattern Analysis ability + wits passive.
Recruit trigger covered by CP5 injection.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
