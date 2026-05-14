# Ledger of Ash

A text-based RPG set in the **V33_2** Material Planet canon. You are a capable person
in an unstable world. The eastern route has gone wrong. The city knows.
Your job is to understand what happened and decide what to do about it.

**Current build:** v0.11.0 · 31 archetypes · 93 backgrounds · 18 localities · Stage I–III complete · 480+ items · 80+ enemies · Full combat & companion system · V33_2 canon.

## Play Online

**Play now on itch.io:** https://sosoburner.itch.io/ledger-of-ash

Or download and run locally:
- Extract the game folder
- Open `index.html` in your web browser
- No server required. Save system uses localStorage.

## Architecture

The game is a **single-file HTML application**: `index.html` contains all CSS, core JS, game data, and HTML inline. Content scripts live in `content/` and are loaded via `<script>` tags.

```
index.html              Single-file game engine (bundled, minified)
content/                Stage content, encounters, companion scenes, systems
  stage1_choices_*.js   Per-locality Stage I enriched choices
  stage1_boss.js        Mini-boss (Roadwarden Lt. Perrin Gleam) + main boss (Marshal Sera Ironveil)
  stage2_climax.js      Stage II climax encounter (3-phase institutional confrontation)
  stage2_boss.js        Customs Senior Auditor Dravn Pell (3-phase)
  stage3_climax.js      Stage III climax (3-phase Ander Voss confrontation)
  item_system.js        480 items (240 Stage I + 240 Stage II, Levels 1-10)
  combat_system.js      Combat engine, 80+ enemies, group combat (35% 2-enemy groups)
  companion_*.js        7 companion recruitment & interaction scenes
  world_clocks.js       Watchfulness, Pressure, Rival, Weather escalation
  consequences.js       Choice consequence handlers (~200+ CIDs)
  shop_system.js        Tiered economy across 11 settlements
  social_misstep_pool   Locality-specific social complications
  public_complication   Public watchfulness reactions
  bestiary_lookup.js    80+ macroregion enemy entries with faction flavor
```

> The game is delivered as a single minified HTML file. No build step needed to play.

## Game Features

### Character Creation
**31 Archetypes** across 4 families (93 total backgrounds — 3 per archetype):
- **Combat (9):** Warrior, Knight, Ranger, Paladin, Archer, Berserker, Warden, Warlord, Death Knight
- **Magic (8):** Wizard, Cleric, Priest, Necromancer, Illusionist, Inquisitor, Elementalist, Oracle
- **Stealth (7):** Rogue, Assassin, Spellthief, Scout, Thief, Trickster, Beastmaster
- **Support (7):** Healer, Artificer, Engineer, Tactician, Alchemist, Saint, Bard

Each background grants passive traits and ties to a canonical starting locality.

### World & Localities
**18 Active Localities:** Shelkopolis, Fairhaven, Panim Haven, Soreheim Proper, Sunspire Haven,
Mimolot Academy, Ithtananalor, Guildheart Hub, Cosmoria, Aurora Crown Commune, Glasswake Commune,
Shirshal, Harvest Circle, and 5 adjacent localities — all grounded in V33_2 canon.

### Progression & Story
**Stage I–III Complete Progression:**
- **Stage I:** Locality-grounded pressure chains, stat training, 4+ actions to advance. Mini-boss (Roadwarden Lt. Perrin Gleam) + main boss (Marshal Sera Ironveil) encounters with branching resolutions.
- **Stage II:** Adjacent locality investigation, institutional confrontation, evidence gathering, faction contact. Customs confrontation with Auditor Dravn Pell. Climax encounter uncovers institutional conspiracy.
- **Stage III:** Deep evidence uncovering, faction pressure escalation, alliance mechanics, world-level stakes. Climax encounter reveals Ander Voss (Collegium Keeper, 11-year shadow record) and suppression mechanism. Mediation paths using prior companions.
- **Stage IV–V:** In development.

### Combat System
- **80+ tiered enemies** across 8 macroregions with faction-specific flavor text
- **Enemy scaling** with player level (tier 1/2/3 modifiers)
- **Group combat:** 35% chance of 2-enemy encounters requiring tactical switching
- **Combat archetypes** have combat-specific actions; cruel alignment triggers instant attack injection
- **Range system:** Magic/support archetypes start at medium range with persistent range display
- **Companion combat abilities:** Each companion has 1 special ability per fight (damage/heal/buff/debuff/special)
- **Threat levels:** Yellow/orange/red choice borders indicating escalating danger

### Equipment & Economy
- **480+ items** across 10 levels with family-specific chains
  - 240 Stage I items (Levels 1-5): 4 families × 3 slots × 4 chains × 5 levels
  - 240 Stage II items (Levels 6-10): Uncommon/Rare rarity tiers, Psanan vocabulary on advanced chains
- **Tiered shops** across 11 settlements (5-9 items per location)
- **Economy:** Pricing calibrated to ~$8 USD per 1 gold standard
- **Soreheim plot currency:** Accumulate credits from Soreheim choices (cap 30); unlock temporary purchasing power via social rolls

### Character Development
- **Stats Training:** Stat caps at 10, gold cost `(stat+1)*15`, 30-day cooldown, 3-session progression per +1
- **Skill progression:** All rolls show adjusted DC with level annotation
- **Background passive traits:** Always-active passive bonuses tied to your background

### Companion System
- **7 Companions** (4 recruitable in Stage I, 3 in Stage II)
- **Trust-gated recruitment:** Earn trust through choices before recruiting
- **Injuries & departure:** Companions can be injured in combat or leave under certain conditions
- **Re-recruitment:** Injured companions can be healed and rejoined
- **Passive bonuses:** Always-on stat bonuses per active companion

### World Systems
- **World Clocks:** Watchfulness, Pressure, Rival, Weather — escalate consequences as you progress
- **Public Complications:** 20% base trigger on locality arrival/transitions (scales with watchfulness)
- **Social Missteps:** Locality-specific complications from failed social choices
- **Save System:** localStorage-based auto-save after every choice — resume anytime

### Narrative Depth
- 100+ distinct localities, districts, and faction contacts
- 57+ Stage II pressure chain choices (3 per locality)
- 40+ Stage III enriched choices across faction/evidence/world/alliance paths
- V33_2 canon authority: settlement names, factions, NPCs, routes, magic law, union aesthetics (see `CLAUDE.md` for writer guidelines)
- The Ledger of Ash is never named in player text before mid-Stage 4

## World & Canon Authority

**V33_2 Material Planet Canon** is the authoritative source for all narrative decisions:
- Settlement names, localities, districts, and geography
- Faction structures and NPC relationships
- Routes, travel mechanics, and regional flavor
- Archetype grounding in material and magical systems
- Magic law and union aesthetics
- Institutional hierarchies and power structures

See `CLAUDE.md` for detailed writer rules and content guidelines.

> **Note:** The Ledger of Ash is never named in player-facing text before mid-Stage 4. This is intentional narrative design.

## For Players

### System Requirements
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No internet connection required (plays fully offline)
- ~10 MB storage for save data

### Gameplay Length
- **Per playthrough:** 3–5 hours (Stage I–III)
- **First run:** Expect discovery of multiple ending paths and optional encounters

### Controller Support
- Fully playable with keyboard navigation
- Mouse/touchscreen fully supported

## For Developers & Contributors

See the main repository for development setup, testing, and contribution guidelines.

### Testing Suite
- **Unit tests:** `npm test`
- **Content validation:** `npm run test:content`
- **E2E tests:** `npm run test:e2e`
- **Continuity validation:** `npm run test:continuity`

### Build Process
The game is built from source using a Python build script that bundles all content into a single minified HTML file for itch.io distribution.
