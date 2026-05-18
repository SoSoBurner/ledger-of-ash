# Architecture — Ledger of Ash

Ledger of Ash is a single-file ES5 vanilla JavaScript text RPG. All game logic, CSS, and HTML live in `ledger-of-ash.html`. External content files in `content/` and data files in `data/` are loaded via `<script>` tags and set globals on `window`.

---

## G State Object

The entire game state is stored in a module-scope variable declared as `let G`. `window.G` is `undefined` — always reference `G` directly. Never write `var G = window.G` as a local alias; it silently breaks every write to G inside that function.

### Core identity and progression

| Property | Type | Description |
|---|---|---|
| `G.stage` | string | Current stage label: `'Stage I'`, `'Stage II'`, etc. |
| `G.stageProgress` | object | Per-stage progress counters: `{1:0, 2:0, 3:0, 4:0, 5:0}` |
| `G.level` | number | Current player level (1–20, capped per stage) |
| `G.xp` | number | XP toward next level |
| `G.masteryXP` | number | Overflow XP accumulated at level cap |
| `G.renown` | number | Renown score |
| `G.dayCount` | number | In-game day counter |
| `G.location` | string | Current locality ID, e.g. `'shelkopolis'` |
| `G.dead` | boolean | Death flag — checked at entry of `loadStageChoices` |

**`G.stageProgress` serialization gotcha:** Keys are integers (`1`, `2`, etc.). Object spread (`{ ...G.stageProgress }`) loses integer keys in some JS environments. When reading `stageProgress` from outside the engine (e.g. Playwright tests), use `page.evaluate()` to read `G` directly — never rely on a spread copy for numeric-keyed properties.

### Vitals

| Property | Type | Description |
|---|---|---|
| `G.hp` | number | Current hit points |
| `G.maxHp` | number | Maximum hit points |
| `G.wounds` | array | Active wound records `{desc, severity, round}` |
| `G.fatigue` | number | Fatigue level (0–10) |
| `G.recoveryState` | string | `'healthy'`, `'critical'`, etc. |

### Economy

| Property | Type | Description |
|---|---|---|
| `G.gold` | number | Gold pieces |
| `G.supply` | number | Supply units |

### Skills

`G.skills` uses internal keys only. These differ from display names shown to the player.

| Internal key (`G.skills`) | Display name |
|---|---|
| `combat` | Might |
| `stealth` | Finesse |
| `survival` | Vigor |
| `lore` | Wits |
| `persuasion` | Charm |
| `craft` | Spirit |

Any code that accepts a skill name from content or UI must normalize it before reading `G.skills`:

```js
var _KEY_NORM = {might:'combat', finesse:'stealth', vigor:'survival',
                 wits:'lore', charm:'persuasion', spirit:'craft'};
var _sk = _KEY_NORM[skill] || skill;
```

`rollD20`, `getTraitBonus`, and `getEquipmentBonus` all apply this normalization internally. Apply the same pattern to any new roll helper.

### Traits and equipment

| Property | Type | Notes |
|---|---|---|
| `G.traits` | array | Mixed-format — see dual format note below |
| `G.unlockedTraits` | array | Traits unlocked via progression |
| `G.traitProgress` | object | Progress toward trait unlocks |
| `G.equipped` | object | `{weapon, armor, tool}` slots |
| `G.inventory` | array | Item objects |

**`G.traits` dual format (critical):** Background traits use `{skillBonus:{combat:1}, passive:true, source:'background'}`. Archetype and item traits use `{skill:'combat', bonus:1, condition?}`. Any function reading `G.traits` must handle both formats. Never add a third format.

### Alignment

| Property | Type | Range | Description |
|---|---|---|---|
| `G.benevolence` | number | -50 to +50 | Moral axis |
| `G.orderAxis` | number | -50 to +50 | Order/chaos axis |

Alignment badges (Cruel/Benevolent, Anarchy/Order) render on the character sheet only at threshold ±10. They never appear on choice buttons.

### Heat

`G.heat` is an object keyed by polity ID, each value an integer 0–10.

Valid polity keys: `shelk`, `roaz`, `shirsh`, `mimolot`, `panim`, `cosmouth`, `zootia`, `union`, `sheresh`, `soreheim`, `nomdara`.

Heat thresholds: 3 = notice + optional encounter; 5 = mandatory encounter + DC+1; 8 = warrant issued.

### Flags

`G.flags` is a flat object of boolean and string flags. Always guard access:

```js
if (G && G.flags && !G.flags.someFlag) { ... }
```

`G.flags` itself can be null at early init. `if (G && !G.flags.x)` crashes.

### Journal

| Property | Type | Notes |
|---|---|---|
| `G.journal` | array | String-only deduplicated entries, capped at 30 |
| `G.journalRecords` | array | Full records: `{id, category, day, text}` |

Do not assert exact counts against `G.journal` in tests — it is capped and deduped. Use `G.journalRecords` for structured queries.

### Quests

| Property | Type | Notes |
|---|---|---|
| `G.quests` | array | Quest text strings |
| `G.questHints` | object | Keyed by `questId`, holds hint text |

Wire quest effects as `{type:'quest', msg:'...', hint:'...', questId:'key'}`. Do not change `G.quests` structure — breaks save compatibility.

### Companions

`G.companions` is an object keyed by companion ID. `vorath_gelden` and `mira_calden` gate on `G.flags.maren_oss_resolved`, which is set in `_closeClimax()` in `content/stage2_climax.js`.

### G defaults rule

Every property read from G in enriched choices or game logic must be initialized in the G defaults object. Missing keys cause silent TypeErrors swallowed by `adaptEnrichedChoice`'s try/catch, silently halting stage progress.

`G.worldClocks` keys must be integers (0), not objects. Any `{}` value renders as `[object Object]` in the sidebar.

---

## Stage Flow

### Stage I to Stage II

1. `checkStageAdvance()` checks `STAGE1_BOSS_MODULE.shouldTrigger()`. The export must use the property name `shouldTrigger` (mapped to `checkStage1BossTriggered`). The engine reads this specific property; if absent, the boss never fires and Stage II never unlocks.
2. Boss fires. On defeat, `content/stage1_boss.js` line 191 sets `G.flags.stage1_narrative_complete`.
3. `resolveArrival()` is called on the next location change and calls `checkStageAdvance()`.
4. `checkStageAdvance()` detects `stage1_narrative_complete` and unlocks Stage II.

`checkStageAdvance` must be called from `resolveArrival`. At level cap, `checkLevelUp` never fires, making `resolveArrival` the only reliable call site.

### Stage II progression

- `STAGE2_BOSS_MODULE` exports `checkTrigger` (not `shouldTrigger`) — intentionally different from Stage 1.
- `stage2_antechamber.shouldTrigger()` requires: `sp2 >= 12 && stage2_faction_contact_made && !stage2_antechamber_done && !stage2_climax_started`.
- The climax is wired through `STAGE2_BOSS_MODULE.checkTrigger()` inside `checkStageAdvance`.

### Stage II to Stage III

`canAdvanceToStage3()` is hardcoded `return false` (V1.0 stub, line ~12849). Stage III is not yet authored. Do not remove or modify this stub until Stage III content exists.

### Level caps

```js
STAGE_LEVEL_CAP = {'Stage I':5, 'Stage II':10, 'Stage III':15, 'Stage IV':18, 'Stage V':20}
```

At cap: XP overflow goes to `G.masteryXP`; level does not increase. The XP denominator in `updateHUD()` must be `G.level * 60` (not hardcoded 120). Formula: level 1→2 = 120 XP; level N→N+1 = N×60 XP.

---

## Content Loading

Script tags in `ledger-of-ash.html` load external files in this order:

1. **Data layer** — `data/locality_matrix.js`, `data/route_matrix.js`, `data/narrative_lookup.js`, `data/bestiary_lookup.js`, `data/nomdara_overlay.js`
2. **Stage 1 enriched choices** — `content/*_stage1_enriched_choices.js` (22 locality files)
3. **Stage 2 content and bridge arcs** — `content/*_stage2_*.js`, `content/*_to_shelk_arc.js` (12 bridge arc files, injected when `stageProgress[1] >= 5` or `level >= 6`)
4. **Encounter scripts** — `content/stage1_boss.js`, `content/stage2_boss.js`, `content/stage2_antechamber.js`, `content/stage2_climax.js`, `content/maren_oss_encounter.js`, `content/authority_encounters.js`
5. **Narration and NPC data** — `content/locality_narrations.js`, NPC data files
6. **Travel** — `content/travel_corridors.js`

All content files must be referenced as `content/filename.js` in the HTML `<script>` tags. Files in `js/` are dead copies never loaded by the game. `locality_voice_guide.js` and `npc_dossiers.js` are reference-only and not loaded.

---

## Rendering Pipeline

### updateHUD()

Updates all HUD DOM elements after any state change. Both `updateHUD()` and `renderCharacterSheet()` must be updated together when changing skill rendering — they are independent render paths that will diverge if only one is changed.

HUD element IDs: `#hud-hp`, `#hud-level`, `#hud-gold`, `#hud-renown`, `#hud-day`, `#hud-location`, `#topbar-stage`, `#hud-stage-progress-val`, `#hud-xp`, `#hud-heat-row`.

### renderCharacterSheet()

Renders skill values, abilities, and traits inside `#sheet-body`. DOM sections: `.char-skill-row` (skills), `.ability-card` (abilities), `.trait-section` (traits). All sections render at once — no sub-tabs.

### loadStageChoices(locId)

Re-renders the choice panel for the current or given location. **Must check `if (G.dead) { confirmDeath(); return; }` at entry.** Without this guard, `modHP` calls in enriched choices can set `G.dead` and leave the player with no choices and no death screen.

### resolveArrival(locId)

Called on every location change. Full sequence:

1. Validates `locId` against `WORLD_LOCATIONS`
2. Updates `G.location`, `G.currentLocality`
3. Calls `advanceTime()`, `advanceRivals()`, `advanceMaren()`
4. Calls `updateHUD()`, `updateEnvironmentPanel()`, `buildLivingDesc(locId, G)`
5. Fires arrival narration, `maybeFireArrivalScene()`, `showStage2BridgeScene()`, `_maybePublicComplication()`
6. Calls `checkStageAdvance()`

---

## Key Invariants

- `window.G` is `undefined`. Reference the outer `G` directly everywhere.
- `loadStageChoices` requires a `G.dead` guard at entry.
- Font system: 3-tier (Cinzel display / system-ui UI chrome / Crimson Pro long-form prose). Never add Google Fonts `<link>` tags — they fail over `file://`. Use `var(--font-body)` and `var(--font-display)` CSS variables.
- `modHP` (enriched-choice path) does not call `confirmDeath`. The `loadStageChoices` death guard is the only protection on that path.
- `applyWound` (combat path) calls `confirmDeath` directly when HP reaches 0.
- Alignment bars only render when `|G.benevolence| >= 10` or `|G.orderAxis| >= 10`. Absent bars are not a bug.
- `G.stageProgress[2]` read via object spread can return 0 even when the live page has `sp2 > 0`. Use `page.evaluate()` to read G directly in Playwright tests.
- `js/travel.js` is a dead file (635 lines, never loaded). All travel implementation lives in `ledger-of-ash.html` and `content/travel_corridors.js`.
