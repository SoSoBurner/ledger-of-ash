# Ledger of Ash — Mechanics Reference

> **Purpose:** Orientation guide for Claude sessions and developers. Covers all player-facing systems within Stages 1 and 2 scope. Use this to find, debug, and extend existing infrastructure without re-deriving it from scratch.

---

## Quick Orientation

| File | Role |
|------|------|
| `ledger-of-ash.html` | Single-file engine: all CSS, core JS, game data, HTML (~13K lines) |
| `content/*_stage1_enriched_choices.js` | Stage 1 choice pools per locality |
| `content/*_stage2_enriched_choices.js` | Stage 2 choice pools per locality |
| `content/*_to_shelk_arc.js` | Stage I→II bridge arcs (12 files) |
| `content/npc_lookup.js` | NPC encounter system, all tiers |
| `content/item_system.js` | Item definitions, levels 1–10 |
| `content/travel_corridors.js` | Travel encounter pools, route data |
| `content/maren_oss_encounter.js` | Maren Oss encounter logic |
| `content/stage2_enriched_choices.js` | Stage 2 global choice pool |
| `content/stage2_antechamber.js` | Antechamber trigger (stageProgress[2] ≥ 12) |
| `content/stage2_climax.js` | Stage 2 climax confrontation |
| `content/stage2_boss.js` | Mini-boss: Dravn Pell |
| `js/` | **DEAD — never loaded.** All live code is in `ledger-of-ash.html` |

**Never edit `dist/`.** `play.bat` opens the root source HTML directly.

---

## G — The Global State Object

`G` is declared `let G` at module scope. **`window.G` is `undefined`.** Never use `var G = window.G`.

```js
let G = {
  // Identity
  name: '', archetype: null, background: null,

  // Progression
  level: 1, xp: 0, renown: 0,
  stage: 'Stage I', stageLabel: 'Grass Roots',
  stageProgress: {1:0, 2:0, 3:0, 4:0, 5:0},

  // Vitals
  hp: 20, maxHp: 20, gold: 20,
  wounds: [],           // [{desc, severity:'minor'|'severe', round, healed}]
  fatigue: 0,
  recoveryState: 'stable',  // 'stable' | 'recovering'

  // Skills (internal keys only — see Skill Keys section)
  skills: {combat:0, survival:0, persuasion:0, lore:0, stealth:0, craft:0},
  traits: [],

  // World state
  location: 'shelkopolis',
  timeIndex: 0, dayCount: 0,
  axisTick: 0, axisInverted: false,
  benevolence: 0, orderAxis: 0,
  localityHeat: {},    // {localityId: number} — -30 to +30, decays 2/day
  tensionLevel: 0,

  // Collections
  factions: [],        // [{id, rep}]
  quests: [],
  journal: [],
  journalRecords: [],
  history: [],
  inventory: [],       // [{name, type, equipped, ...}]
  equipped: {weapon: null, armor: null, tool: null},
  materials: {},

  // NPC memory
  npcMemory: {},       // {npcId: {trust, seen, lastNote}}
  trainingDisadvantage: 0,  // counts down — next N choices suffer -2

  // Rivals
  rivalAdventurers: [],
  marenRenown: 0, marenRevealed: false,

  // Travel
  travelMode: 'foot',   // 'foot' | 'horse' | 'cart' | 'boat'
  pace: 'normal',       // 'fast' | 'normal' | 'slow'
  supplyTier: 'light',
  journeyFatigue: 0,

  // Misc
  flags: {},            // arbitrary boolean/value flags
  dead: false,
  schemaVersion: 3
};
```

**Rule:** Any property read from G in enriched choices MUST be initialized in G defaults. Missing keys cause silent TypeErrors swallowed by `adaptEnrichedChoice`'s try/catch — stage progress silently stops advancing.

---

## Skill Keys

Internal keys ≠ display names. Use keys everywhere in code.

| Key | Display | Notes |
|-----|---------|-------|
| `combat` | Might | Combat rolls, press attacks |
| `stealth` | Finesse | Sneak, subterfuge |
| `survival` | Vigor | Endurance, wilderness |
| `lore` | Wits | Knowledge, investigation |
| `persuasion` | Charm | Social, negotiation |
| `craft` | Spirit | Crafting, alchemy |

Both `updateHUD()` (~line 10862) and `renderCharacterSheet()` (~line 10418) must be updated together if skill display changes.

---

## Stage System

### Stage I → Stage II Gate
`checkStageAdvance()` (~line 8776 / also ~line 10210)

```
G.level >= 5  →  G.stage = 'Stage II'
```

Sets `G.flags.principalities_route_unlocked = true` and narrates stage unlock. Note: two implementations exist in the file — both check `G.level >= 5`.

### Stage II → Stage III Gate
`canAdvanceToStage3()` checks all three:
- `G.flags.stage2_climax_complete` — set by `_closeClimax()` in `stage2_climax.js`
- `G.flags.stage2_faction_contact_made`
- `G.investigationProgress >= 10`

Trigger order in `checkStageAdvance()`:
1. Maren encounter (`MAREN_ENCOUNTER.shouldTrigger()`)
2. Antechamber (`STAGE2_ANTECHAMBER.shouldTrigger()` at stageProgress[2] ≥ 12)
3. Climax (`STAGE2_CLIMAX` when all gate conditions met)
4. Hint to player when gate not yet open

### stageProgress
`G.stageProgress` = `{1:0, 2:0, 3:0, 4:0, 5:0}` — increment with `G.stageProgress[1]++` or `G.stageProgress[2]++` inside enriched choice `fn()`.

Arc files (`*_to_shelk_arc.js`) inject when `G.stageProgress[1] >= 5 OR G.level >= 6`.

---

## Choice Pipeline

```
loadStageChoices(locId)
  → picks from locality enriched choice pool
  → adaptEnrichedChoice(c)        ← wraps fn() in try/catch
  → renderChoices(choices)        ← overridden to call weightChoicesForArchetype()
  → handleChoice(choice)          ← dispatches by cid or fn()
```

### Key Functions

**`loadStageChoices(locId)`** — line 9236 / 9337
Selects enriched choices for the current locality. Checks for arrival choices and prepends them.

**`adaptEnrichedChoice(c)`** — line 9213 / 9266
Wraps an enriched choice object into the standard choice format. All `fn()` calls are wrapped in try/catch — **errors are swallowed silently**. Always test in browser console if stage progress isn't advancing.

**`handleChoice(choice)`** — line 9686
Main choice dispatcher. Routes legacy combat CIDs through `enterCombat()` via `legacyCombatCids` array.

**`weightChoicesForArchetype(choices)`** — line 2554
Appends an archetype-appropriate encounter option to the choices array based on `getArchetypeFamily()`.

### Writing Enriched Choices

```js
{
  label: "Player's inner voice — under 15 words, no question marks, no infinitives",
  tags: ['Stage1', 'Meaningful'],  // or Stage2
  xpReward: 60,
  stageProgress: 1,  // optional — use integer
  fn: function() {
    advanceTime(1);
    G.telemetry.turns++;
    G.telemetry.actions++;
    gainXp(60, 'description');
    G.stageProgress[1]++;

    // Always guard flags
    if (!G.flags) G.flags = {};
    G.flags.my_flag = true;

    // addJournal: text FIRST, category SECOND
    addJournal('What happened', 'evidence');

    G.lastResult = `Result text. 60–90 words target.`;
    G.recentOutcomeType = 'social';  // or 'combat', 'exploration'
    maybeStageAdvance();
  }
}
```

**Journal categories (exact strings only):** `'evidence'`, `'intelligence'`, `'rumor'`, `'discovery'`, `'contact_made'`, `'complication'`

---

## Combat System

### Entry Points

**`enterCombat(enemyKey, context)`** — line 12803
Narrative encounter entry. Shows enemy intent, renders Press/Defend/Talk/Retreat choices. Use for all story-driven fights.

```js
enterCombat('patrol_guard', { isBoss: false });
enterCombat('dravn_pell',   { isBoss: true });   // applies .encounter--boss border
```

**`startCombat(enemyKey, context)`** — line 3122
Low-level engine entry. Full TTRPG multi-round combat with archetype abilities. Only call directly for non-narrative triggers.

**`resolveCombatEntry(mode, enemyKey, abilityId)`** — line 12849
Resolves the player's combat choice (press/defend/talk/retreat) from `enterCombat`.

**`resolveCombatAction(action, abilityId)`** — line 3322
Resolves a round action inside `startCombat`'s multi-round loop.

### Boss Fights
Pass `{isBoss: true}` in context → applies `.encounter--boss` CSS class (danger-color border, `var(--danger)`).

### Enemy Templates
`ENEMY_TEMPLATES` — keyed by enemy ID. If key not found, `enterCombat` falls through to `startCombat`.

### Archetype Combat Abilities
`ARCHETYPE_COMBAT_ABILITIES` — line 2640. Keyed by archetype ID. Abilities must be in `G.unlockedCombatAbilities` to appear.

### Wounds
```js
G.wounds.push({ desc: source, severity: damage >= 8 ? 'severe' : 'minor', round: CS.round });
// 3+ active wounds OR G.fatigue >= 5 → -1 to all rolls
// Penalty shown in HUD via .env-pill.danger
```

---

## Skill Check System

### NPC Encounter Roll (npc_lookup.js)
```js
function _roll20(skillKey, baseDC, npcId) {
  var raw   = Math.floor(Math.random() * 20) + 1;  // d20
  var total = raw + G.skills[skillKey];
  var dc    = baseDC + (failedAttempts * 2);         // DC escalates +2 per failure
  return { success: total >= dc, total, dc };
}
```

### DC Reference
| Difficulty | Base DC |
|-----------|---------|
| Safe | 7 |
| Risky | 12 |
| Bold | 15 |

Stage modifier: +1 per stage (Stage I = +0 … Stage V = +4).
Additional: axis flip +1–2, severe weather +1.

### Modifiers
- Active wounds (3+) or fatigue (5+): **-1 to all rolls**
- `G.trainingDisadvantage > 0`: **-2** to next N rolls (decrements each roll)
- Companion passive: Vorath → +1 combat attack, Mira → +1 HP regen

---

## Archetype System

31 archetypes total. `getArchetypeFamily()` — line 2525 — returns family string.

| Family | Archetypes |
|--------|-----------|
| Support | Healer, Artificer, Engineer, Tactician, Alchemist, Saint, Bard |
| Martial | Warrior, Knight, Ranger, Rogue, ... |
| ... | ... |

Knight has **Mounted Discipline** passive — reduces fast-pace encounter rate when `G.travelMode === 'horse'`.

Craft-heavy (highest base craft): Artificer (4), Engineer (4), Alchemist (3).

Archetype-sensitive NPC reactions: **Tier 1 polity NPCs and named antagonists only.** Never generic NPCs.

---

## Travel System

### Core State
```js
G.travelMode  // 'foot' | 'horse' | 'cart' | 'boat'
G.pace        // 'fast' | 'normal' | 'slow'
G.supplyTier  // 'light' | 'standard' | 'heavy'
G.journeyFatigue
G.localityHeat[locId]  // -30 to +30; decays 2/day; affects encounter mood
```

### Functions
**`travelTo(locId)`** — line 10753. Top-level locality transition.
**`doTravelJourney(destId)`** — line 11255. Multi-day journey execution with mode/pace.
**`renderTravelUI()`** — renders travel mode selection UI.
**`window._travelTo(destId, modeId)`** — public hook for travel buttons.

### Travel Costs
| Mode | Gold/Journey | Days | Notes |
|------|-------------|------|-------|
| Foot | Free | route × 1 | No restrictions |
| Horse | 8 gold | route × 0.5 | Faster; Mounted Discipline (Knight) |
| Cart | 12 gold | route × 1 | Heavy loads; no fast pace |
| Boat | 15 gold | route × 0.33 | Fixed routes only |

### Locality Heat
`G.localityHeat[locId]` — ranges -30 to +30. Modified by player actions. Decays toward 0 by 2/day. Positive = warmer relations; negative = hostile.

### Route Data
`data/reference/07_WORLD_GRAPH/locality_travel_network.json` — edges with travel times.
Per-route complications: `data/reference/V33_2_extracted/.../travel_complications/` — one `.md` per route.

---

## Companion System

### Gate Condition
Both companions require `G.flags.maren_oss_resolved === true` (set in `_closeClimax()` in `stage2_climax.js`).
Trust threshold: `G.npcMemory[npcId].trust >= 15`.

### Companion Definitions
`COMPANION_DEFS` — line 1923 (also ~2090). Each entry:
```js
{
  id: 'vorath_gelden',
  npcId: '...',
  stageMin: 'Stage II',
  role_tag: '...',
  joinScene: { choices: [...] }
}
```

### Active Companion Functions
```js
getActiveCompanions()    // → array of active companion objects
isCompanionActive(id)    // → boolean
getCompanion(id)         // → companion object or null
```

### Companion Effects
| Companion | Passive | Ability |
|-----------|---------|---------|
| vorath_gelden | +1 atk bonus (combat) | Cover Attack — 1d6 damage |
| mira_calden | +1 hp_regen | Stabilize — prevent death + 4 HP |

### Camp Action: Post Watches
`campAction('post_watches')` — converts night ambush to warned encounter. Requires ≥1 active companion.

---

## Rest & Recovery System

**`doSleepScene()`** — main rest handler.
**`campAction(type)`** — types: `'post_watches'`, `'craft'`.

### Recovery States
`updateRecoveryState()` — sets `G.recoveryState`:
- `'stable'` — HP ≥ 80% and no wounds
- `'recovering'` — HP ≥ 50%
- (else) — critical

### Wound Healing
Wounds array: `G.wounds = [{desc, severity, round, healed}]`
Mark healed: `wound.healed = true`
Healing sources: rest, Mira's Stabilize, items.

---

## Inventory & Items

### Functions
```js
addToInventory(item)    // pushes {equipped:false, ...item} → G.inventory
equipItem(idx)          // equips from inventory by index → G.equipped slot
unequipItem(slot)       // clears 'weapon' | 'armor' | 'tool' slot
```

### Equipped Slots
```js
G.equipped = { weapon: null, armor: null, tool: null }
```

### Item Structure
```js
{ name, type: 'weapon'|'armor'|'tool'|'consumable', equipped: false, ... }
```

Item definitions in `content/item_system.js` — 240 items, levels 1–10.

---

## NPC System

### Tier Model (`content/npc_lookup.js`)
| Tier | Access | DC Behavior |
|------|--------|-------------|
| T1 | Faction rep OR stageProgress OR renown gate | DC escalates +2 per failed attempt |
| T2 | Skill-gated, always accessible | Fixed DC |
| T3 | Service roles | Low DC |

Renown thresholds: `RENOWN_ESTABLISHED = 20`, `RENOWN_RENOWNED = 65`.

### NPC Memory
```js
G.npcMemory[npcId] = { trust: 0, seen: false, lastNote: '' }
```

Trust accumulates through positive interactions. Companion gate requires trust ≥ 15.

### NPC Reaction Rules
- Named NPCs and locality authority figures react to player archetype — **shown, not announced**
- Renown expressed through **behavior change**, not words
- Generic NPCs: no archetype sensitivity

---

## Journal & Flags

### addJournal
```js
addJournal(text, category)  // text FIRST, category SECOND — reversing silently breaks logging
```

Valid categories: `'evidence'`, `'intelligence'`, `'rumor'`, `'discovery'`, `'contact_made'`, `'complication'`

Never use: `'investigation'`

### Flags Pattern
```js
if (!G.flags) G.flags = {};
G.flags.my_flag_name = true;

// Reading:
if (G.flags && G.flags.my_flag_name) { ... }
```

Common flags:
- `stage2_climax_complete` — set by `_closeClimax()`
- `stage2_faction_contact_made` — required for Stage III gate
- `maren_oss_resolved` — gates Vorath and Mira companions
- `principalities_route_unlocked` — set on Stage II unlock

---

## HUD & Render System

Two render paths for skills — **change both or they diverge:**
- `updateHUD()` — line ~10862
- `renderCharacterSheet()` — line ~10418

Key render functions:
- `addNarration(label, html, type)` — appends to narrative feed
- `showResult(text)` — displays result text
- `renderChoices(choices)` — renders choice buttons (overridden for archetype weighting)
- `showToast(msg)` — brief notification

---

## Renown & Level System

```js
addRenown(amount)    // increments G.renown, checks for level-up
gainXp(amount, desc) // increments G.xp, triggers level-up check
levelUp()            // called when XP threshold met — increases stats, checks stage advance
checkStageAdvance()  // called after level-up — handles stage I→II and II→III gates
```

Level advancement triggers `checkStageAdvance()` automatically.

---

## Content File Map (Stages 1 & 2)

### Stage 1 Localities (22 total)
```
shelkopolis, soreheim_proper, guildheart_hub, sunspire_haven,
aurora_crown_commune, ithtananalor, mimolot_academy, panim_haven,
fairhaven, shirshal, cosmoria, harvest_circle,
glasswake_commune, whitebridge_commune, craftspire, unity_square,
ironhold_quarry, plumes_end_outpost, districts, nomdara, sheresh,
stage1_additional (universal pool)
```

**Special constraints:**
- **Nomdara**: Transit-only, no NPC encounters, no quickstart card
- **Sheresh**: Stage 1 only, zero canon NPCs (author from scratch)
- **Districts + Plumes End**: No quickstart cards — use locality packet as substitute

### Stage 2 Content
Each Stage 1 locality has a matching `_stage2_enriched_choices.js`.

Global Stage 2 files:
- `stage2_enriched_choices.js` — shared pool
- `stage2_antechamber.js` — fires at `stageProgress[2] >= 12`
- `stage2_climax.js` — final confrontation (Ander Voss)
- `stage2_boss.js` — Dravn Pell mini-boss

### Bridge Arcs (Stage I→II)
12 `*_to_shelk_arc.js` files. Inject when `stageProgress[1] >= 5 OR level >= 6`.

---

## Persistence

Save/load via `localStorage`:
- Slot key pattern: `loa_slot_1` (primary)
- Save: `saveGame()`, Load: `loadGame(slotKey)`
- Legends: `loa_legends` (JSON array)
- Schema version: `G.schemaVersion = 3`

---

## Typography & Color (Enforce Strictly)

| Tier | Variable / Direct | Font | Use |
|------|------------------|------|-----|
| A | `var(--font-display)` | Cinzel | Headers, labels, UI chrome, buttons |
| B | `var(--font-body)` | system-ui | Card descriptions, overlays, hints |
| B+ | direct | Crimson Pro 300, non-italic | Long prose: `.narrative-text`, `.result-text` |
| C | direct | Crimson Pro italic | Atmosphere accent under ~25 words |

| Role | Variable | Hex | Use |
|------|----------|-----|-----|
| Base surface | `--ash` / `--coal` / `--char` | #07060d / #0c0a14 / #131019 | Backgrounds |
| Gold | `--accent-gold` / `--gold-bright` | #d89a2c | Renown, rewards, stage unlock |
| Danger | `--danger` / `--blood-bright` | #be2828 | Boss, wounds, death, critical |
| Discovery | `--discovery` / `--jade-bright` | #26603e | Success, allies, safe paths |

---

## Common Debugging Patterns

### Stage progress silently not advancing
`adaptEnrichedChoice` wraps `fn()` in try/catch. Open browser console and call the fn directly to see the error. Most common cause: reading a G property not initialized in G defaults.

### Companion gate locked
Check `G.flags.maren_oss_resolved`. Must be set by `_closeClimax()` in `stage2_climax.js`. If Maren encounter hasn't fired, check `MAREN_ENCOUNTER.shouldTrigger()`.

### Choice not appearing
Check `loadStageChoices(locId)` — locality ID must match exactly. Verify the content file is loaded via a `<script>` tag in `ledger-of-ash.html`.

### Stage II not unlocking
`checkStageAdvance()` requires `G.level >= 5`. Confirm `gainXp()` and `levelUp()` are being called. Two implementations of `checkStageAdvance` exist — both check the same condition.

### Journal not logging
`addJournal(text, category)` — text is arg 1, category is arg 2. Reversing silently fails.

### window.G undefined
`G` is `let` at module scope. Never use `var G = window.G`. Reference outer `G` directly.
