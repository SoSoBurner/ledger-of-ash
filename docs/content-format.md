# Content Authoring Reference — Ledger of Ash

This document covers the enriched choice format, effect types, NPC dialogue, narration strings, and file loading conventions for content authors. All schema documentation is grounded in reading actual files in `content/`. Where something is specified only in CLAUDE.md and not confirmed in files, it is marked *(per CLAUDE.md)*.

---

## Enriched Choice Schema

A choice object is a plain JavaScript object. Here is the complete set of supported fields:

```js
{
  // --- Identity ---
  id: 'shelk_gate_records',         // string, required, unique across all content

  // --- Label ---
  text: 'His tally sheet has more crossings than the gate log shows.',
  // Player inner voice. Under 15 words. No question marks. No infinitives ("to ask…").
  // The label carries the moral register — not revealed only in result text.

  // --- Classification ---
  tag: 'safe · lore · DC 7',
  // One of three forms:
  //   Scalar:   'safe' | 'risky' | 'bold'   — bypasses semantic lookup
  //   Compound: 'safe · lore · DC 7'        — used in NPC dialogue files
  //   Array:    ['Investigation','NPC']      — used in Stage 1 enriched files (semantic mapping applies)

  // --- Roll ---
  skill: 'lore',
  // Internal skill key. Must be one of: combat, stealth, survival, lore, persuasion, craft
  // Never use display names (might, finesse, vigor, wits, charm, spirit) here.

  dc: 7,
  // Difficulty class. Base values: safe=7, risky=13, bold=16. +1 per stage beyond Stage I.
  // If omitted, engine derives from tag (safe→7, risky→13, bold→16).

  // --- Plot flag ---
  plot: 'main',
  // Optional. Marks this choice as main-quest-advancing. Renders with a blue left border.
  // Add only to choices that advance G.stageProgress or set stage-gate flags.

  // --- Result text ---
  result: 'Sunweave sets down his cup with precise care before answering...',
  // Required. 60–90 words, 120 max for high-stakes moments.
  // Scene, not summary. No "you feel / you realize / you sense."

  failResult: 'Sunweave listens without moving. He says the gate log is complete...',
  // Required for ALL choices, including safe ones.
  // Failure redirects — it does not dead-end. Register: "This path is closed here, but [forward thread]."
  // 30–60 words for safe choices.

  // --- Effects ---
  effects: [
    // Zero or more effect objects. See Effect Types Reference below.
  ]
}
```

### Field requirements summary

| Field | Required | Notes |
|---|---|---|
| `id` | Yes | Unique string across all content |
| `text` | Yes | Player inner voice, <15 words, no ?, no infinitives |
| `tag` | Yes | Scalar, compound, or array — see Classification |
| `skill` | Yes | Internal key only |
| `dc` | No | Derived from tag if omitted |
| `plot` | No | `'main'` only, main quest choices only |
| `result` | Yes | 60–90 words, scene not summary |
| `failResult` | Yes | Required even for safe choices |
| `effects` | No | Empty array `[]` is valid |

---

## Effect Types Reference

Effects are objects in the `effects` array. Each has a `type` field and type-specific fields.

### `journal`
Adds an entry to the player's journal.
```js
{ type: 'journal', text: 'Sunweave noted a three-cart logging gap at the Shelk gate.', category: 'intelligence' }
```
**Critical:** `addJournal(text, category)` — text first, category second. Reversing silently breaks journal logging.

Valid `category` values: `evidence`, `intelligence`, `rumor`, `discovery`, `contact_made`, `complication`.

Retired (do not use): `investigation`, `meaningful`.

---

### `renown`
Adjusts player renown.
```js
{ type: 'renown', n: 1 }   // positive or negative integer
```

---

### `xp`
Awards experience points.
```js
{ type: 'xp', n: 25 }
```

---

### `quest`
Adds a quest entry and optional hint.
```js
{ type: 'quest', msg: 'Find out what was offloaded in Ironspool Ward two nights ago.', hint: 'Ask the night dockmaster.', questId: 'ironspool_offload' }
```
`hint` and `questId` are optional but must be paired — `questId` keys `G.questHints`.

---

### `morality`
Adjusts `G.benevolence` (−50 to +50). Positive = more benevolent, negative = more cruel.
```js
{ type: 'morality', n: 1 }
```
Alignment badges only appear on the character sheet at threshold ±10. Not shown on choice buttons.

---

### `order`
Adjusts `G.orderAxis` (−50 to +50). Positive = more ordered, negative = more anarchic.
```js
{ type: 'order', n: -1 }
```

---

### `heat`
Adds heat to a polity.
```js
{ type: 'heat', polity: 'shelk', n: 1 }
```
Valid polity keys: `shelk`, `roaz`, `shirsh`, `mimolot`, `panim`, `cosmouth`, `zootia`, `union`, `sheresh`, `soreheim`, `nomdara`.

Heat clamps at 10. Thresholds: 3 = notice + optional encounter, 5 = mandatory encounter + DC+1, 8 = warrant issued.

---

### `gold`
Adjusts player gold. Use negative values for costs.
```js
{ type: 'gold', n: -3 }   // costs 3 gold
{ type: 'gold', n: 10 }   // awards 10 gold
```

---

### `hp`
Adjusts player HP. Use negative values for damage.
```js
{ type: 'hp', n: -5 }
```
For wound-level damage in combat, use `applyWound()` instead — not `hp` effects.

---

### `stageProgress`
Advances stage progress counter. Used on main-quest enriched choices.
```js
{ type: 'stageProgress', stage: 2, n: 1 }
```
Convention: add to risky and bold choices unconditionally; add to safe choices only on the success branch.

---

### `flag`
Sets or clears a flag in `G.flags`. *(per CLAUDE.md — confirmed in backlog audit)*
```js
{ type: 'flag', key: 'stage1_narrative_complete', value: true }
{ type: 'flag', key: 'some_flag', value: false }  // clears flag
```
Always guard flag reads: `if (G && G.flags && G.flags.someFlag)`. `G.flags` itself can be null at early init.

---

### `suspect`
Increments suspicion on a named NPC. *(per CLAUDE.md)*
```js
{ type: 'suspect', npc: 'npc_id', n: 1 }
```

---

## Journal Categories

Valid values for the `category` field in journal effects and `addJournal()` calls:

| Category | Use when |
|---|---|
| `evidence` | Physical proof, documents, recovered items |
| `intelligence` | Information gathered through observation or testimony |
| `rumor` | Hearsay, notice board finds, overheard conversation |
| `discovery` | New location, hidden fact, revealed pattern |
| `contact_made` | First meaningful interaction with a named NPC |
| `complication` | New obstacle, threat, or entanglement introduced |

**Do not use:** `investigation` (retired), `meaningful` (retired), or any other string.

---

## Choice Label Standard

The `text` field is the player's inner voice — what they are thinking, not what they do.

**Rules:**
- Under 15 words
- No question marks
- No infinitives ("To investigate the records…")
- No NPC-directed verbs in second person ("Ask the innkeeper about…")
- Must carry moral register — the label implies the stakes before the roll

**Examples:**

| Wrong | Right |
|---|---|
| "Ask the innkeeper about recent guests." | "The innkeeper notices things she doesn't write down." |
| "To investigate the routing discrepancy further." | "The numbers don't match. Someone made them not match." |
| "Question the road warden about checkpoint irregularities." | "The warden stamped that manifest without looking at it." |
| "Consult the night archivist about the missing manifest entries." | "The archivist works nights for a reason." |

---

## Result Text Standard

**Length:** 60–90 words target. 120 words max for high-stakes moments (boss, climax, major revelation). No scrolling.

**Register:** Scene, not summary. Write what the player observes — behavior, objects, dialogue, environment.

**Forbidden in result text:**
- "you feel", "you realize", "you sense" — show the observable instead
- "in a way that suggests", "the city knows it" — no editorial framing
- "investigation" / "investigate" — retired; use specific alternatives
- "meaningful" — cut entirely
- "contact" as a noun for a person
- "official" as a vague adjective

**Fail result register:** Acknowledge the specific failure, then open a forward thread. "This path is closed here, but [something else is visible]." 30–60 words for safe failures.

---

## Safe/Risky/Bold Classification

The engine derives DC from the choice's classification tier. Classification works as follows:

### 1. Explicit scalar tag (wins over all)
```js
tag: 'safe'   // DC 7
tag: 'risky'  // DC 13
tag: 'bold'   // DC 16
```

### 2. Compound tag string (NPC dialogue format)
```js
tag: 'safe · lore · DC 7'
```
Engine parses the first segment for tier and the `DC N` segment for the dc value.

### 3. Semantic array (Stage 1 enriched choice format)
```js
tag: ['Investigation', 'NPC', 'Maritime']
```
Engine maps tags to tier using two lookup sets:

**Bold tags** (any match → bold): `Confrontation`, `Accusation`, `Exposure`, `Betrayal`, `Tribunal`, `Ambush`, `Boss`, `CombatEntry`, `Tactical`, `Assault`, `Violence`

**Safe tags** (any match and no bold → safe): `Investigation`, `NPC`, `Social`, `Lore`, `Maritime`, `Archive`, `Observation`, `Rumor`, `Trade`, `Civic`, `Records`, `Inquiry`, `Survey`, `Intelligence`, `Discovery`

**Default:** anything else → risky (DC 13)

Bold is checked first. A tag array containing both a bold and safe tag is classified as bold.

### DC modifiers
Base DCs above are for Stage I. Add +1 per stage: Stage II = +1, Stage III = +2, Stage IV = +3, Stage V = +4.

---

## Stage File Structure

### Stage 1 enriched choice files

Each Stage 1 locality has a file `content/{locality_id}_stage1_enriched_choices.js`. The pattern observed in `aurora_crown_commune_stage1_enriched_choices.js`:

```js
// Top of file: local variable holding the choices array
var AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES = [
  {
    id: 'aurora_choice_1',
    text: '...',
    tag: ['Investigation', 'NPC'],
    skill: 'lore',
    dc: 7,
    result: '...',
    failResult: '...',
    effects: [...]
  },
  // ... more choices
];

// Bottom of file: export to window
window.AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES = AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES;
```

The engine reads `window.{LOCALITY_ID_UPPERCASE}_STAGE1_ENRICHED_CHOICES` for each locality.

### Stage 2 enriched choice files

Same pattern, with `STAGE2` in the name:
```js
window.AURORA_CROWN_COMMUNE_STAGE2_ENRICHED_CHOICES = AURORA_CROWN_COMMUNE_STAGE2_ENRICHED_CHOICES;
```

### Global Stage 2 pool

`content/stage2_enriched_choices.js` — a shared pool of choices available across all Stage 2 localities. Exports to `window.STAGE2_ENRICHED_CHOICES`.

### Stage 2 special modules

| File | Export | Trigger condition |
|---|---|---|
| `content/stage2_antechamber.js` | `window.STAGE2_ANTECHAMBER` | `sp2 >= 12 && stage2_faction_contact_made && !antechamber_done` |
| `content/stage2_climax.js` | `window.STAGE2_CLIMAX` | Via `STAGE2_BOSS_MODULE.checkTrigger()` |

`STAGE2_ANTECHAMBER` exports `shouldTrigger()` and `trigger()`.
`STAGE2_CLIMAX` exports `trigger()` and `_closeClimax()` — no `shouldTrigger()`.

### Stage 2 boss module

`content/stage2_boss.js` — exports `window.STAGE2_BOSS_MODULE` with `checkTrigger` (not `shouldTrigger` — intentionally different from Stage 1).

### Stage 1 boss module

`content/stage1_boss.js` — exports `window.STAGE1_BOSS_MODULE`:
```js
window.STAGE1_BOSS_MODULE = {
  triggerMiniBoss: triggerStage1MiniBoss,
  triggerMainBoss: triggerStage1MainBoss,
  checkTrigger: checkStage1BossTriggered,
  shouldTrigger: checkStage1BossTriggered,   // engine calls this property
  seedChoices: window.STAGE1_MINIBOSS_SEED_CHOICES
};
```
The engine calls `shouldTrigger` — `checkTrigger` is an alias and is not what the engine reads.

---

## NPC Dialogue Format

`content/locality_npcs.js` exports `window.LOCALITY_NPCS`.

### Top-level structure

```js
window.LOCALITY_NPCS = {
  shelkopolis: {          // keyed by locality ID
    tavern: { ... },      // optional — tavern NPC
    shop:   { ... },      // optional — shop NPC
  },
  cosmoria: { ... },
};
```

### NPC entry

```js
{
  npcId: 'aelric_sunweave',          // unique NPC ID string
  name:  'Aelric Sunweave',          // display name
  role:  'Toll Witness',             // role/occupation at this locality
  tell:  'sets down his cup with precise care before answering',
  // The NPC's one specific physical/behavioral habit. Must be
  // specific enough that no other NPC would do it.

  agenda: 'keep records accurate and the Shelk road workable; carries reputational strain without showing it',
  // What this NPC wants, independent of the player.

  register: 'polished and status-aware, thinks in testimony and sequence',
  // Speech style shaped by locality of origin, class, local magic law.

  triggerText: 'Sunweave has been watching the queue longer than his shift requires.',
  // Inner-voice label shown on the trigger choice (player thought, <15 words).

  dialogue: [
    {
      id: 'sunweave_records',
      text: 'His tally sheet has more crossings than the gate log shows.',
      // Player inner voice, <15 words, no ?, no infinitives.
      tag: 'safe · lore · DC 7',
      skill: 'lore',
      dc: 7,
      result: '...',       // 60–90 words
      failResult: '...',   // redirect, not dead-end
      effects: [{ type: 'journal', text: '...', category: 'intelligence' }]
    },
    // Recommended pattern: 1 safe, 1 risky, 1 bold per NPC
  ]
}
```

### Rendering

`window.renderNPCDialogue(npcId, locId)` finds the NPC by `npcId` in `LOCALITY_NPCS[locId]` and calls `window.renderChoices(npc.dialogue)`. Each dialogue entry is a standard enriched choice object.

The engine injects a trigger choice into `loadStageChoices` for localities that have an entry in `LOCALITY_NPCS`. The trigger choice uses `triggerText` as its label.

---

## Locality Narrations

`content/locality_narrations.js` exports `window.LOCALITY_NARRATIONS`.

### Structure

```js
window.LOCALITY_NARRATIONS = {
  shelkopolis:   'Long string describing the locality...',
  cosmoria:      '...',
  soreheim_proper: '...',
  // one entry per locality ID
};
```

Keys are the internal locality ID strings (lowercase, underscores). Values are plain strings — the opening narration paragraph shown when the player arrives.

### Authoring rules for narrations

- Open with sensory detail specific to THIS place only
- Lead with the locality's defining physical infrastructure (dome, seawall, quarry face, Titan Towers) before atmosphere
- No editorial framing
- Generic atmosphere over wrong architecture is the primary failure mode

### Usage in the engine

The engine reads `LOCALITY_NARRATIONS[G.location]` in `buildLivingDesc()`. The first sentence (`split('. ')[0]`) is used as the `env-desc` fallback when no `LOCALITY_ANCHORS` entry exists for the location. Locations without a narration entry show a blank env-desc — not an error.

---

## Content File Loading

Script tags in `ledger-of-ash.html` load content files in this order (from the bottom of the HTML file, around line 16969):

```html
<!-- Data tables — loaded before content -->
<script src='data/locality_matrix.js'></script>
<script src='data/route_matrix.js'></script>
<script src='data/narrative_lookup.js'></script>
<script src='data/bestiary_lookup.js'></script>
<script src='data/nomdara_overlay.js'></script>

<!-- Stage 1 enriched choices — one per locality -->
<script src='content/shelkopolis_stage1_enriched_choices.js'></script>
<script src='content/soreheim_proper_stage1_enriched_choices.js'></script>
<script src='content/guildheart_hub_stage1_enriched_choices.js'></script>
<script src='content/sunspire_haven_stage1_enriched_choices.js'></script>
<script src='content/aurora_crown_commune_stage1_enriched_choices.js'></script>
<script src='content/ithtananalor_stage1_enriched_choices.js'></script>
<script src='content/mimolot_academy_stage1_enriched_choices.js'></script>
<script src='content/panim_haven_stage1_enriched_choices.js'></script>
<script src='content/fairhaven_stage1_enriched_choices.js'></script>
<script src='content/shirshal_stage1_enriched_choices.js'></script>
<script src='content/cosmoria_stage1_enriched_choices.js'></script>
<script src='content/harvest_circle_stage1_enriched_choices.js'></script>
<script src='content/glasswake_commune_stage1_enriched_choices.js'></script>
<script src='content/whitebridge_commune_stage1_enriched_choices.js'></script>
<script src='content/craftspire_stage1_enriched_choices.js'></script>
<!-- ... remaining Stage 1 localities follow the same pattern -->

<!-- Stage 2 content -->
<script src='content/stage2_enriched_choices.js'></script>
<!-- per-locality Stage 2 files follow -->

<!-- Stage 2 special modules -->
<script src='content/stage2_antechamber.js'></script>
<script src='content/stage2_climax.js'></script>

<!-- Boss modules -->
<script src='content/stage1_boss.js'></script>
<script src='content/stage2_boss.js'></script>

<!-- Narrations and NPCs -->
<script src='content/locality_narrations.js'></script>
<script src='content/locality_npcs.js'></script>
```

### Rules for adding new files

- Always reference as `content/filename.js` — never an absolute or relative path
- New Stage 1 locality files go in the Stage 1 block, after existing entries
- New Stage 2 locality files go in the Stage 2 block
- Special modules (antechamber, climax, boss) load after the choice pools they reference
- `data/` files load before `content/` files
- `js/` directory files are NOT loaded by the game — all edits go in the source HTML or `content/`

### Dead files — do not edit

- `js/travel.js` — 635 lines, never loaded. Travel implementation lives in `ledger-of-ash.html` and `content/travel_corridors.js`.
- `js/consequences.js` — dead copy. All consequence data is inline in `ledger-of-ash.html`.
- `css/style.css` — not used by `play.bat`. Inline `<style>` in the HTML is the source of truth.

---

## Forbidden Words in Player-Facing Text

These apply to ALL player-visible strings: choice labels, result text, NPC dialogue, narrations, camp headings, sidebar labels, tooltip strings, and button text.

| Word | Status |
|---|---|
| "investigation" / "investigate" | Retired — use specific alternatives |
| "meaningful" | Cut entirely |
| "contact" (noun for a person) | Retired |
| "official" (vague adjective) | Retired |
| "you feel" / "you realize" / "you sense" | Show the observable instead |
| Editorial framing ("the city knows it", "in a way that suggests") | Cut entirely |
| "Ledger of Ash" | Never in Stages 1–3 narrative text — first appears mid-Stage 4 in a specific document |
