# Ledger of Ash

A text-based RPG set in the **V32_2** Material Planet canon. You are a capable person
in an unstable world. The eastern route has gone wrong. The city knows.
Your job is to understand what happened and decide what to do about it.

**Current build:** 31 archetypes × 3 backgrounds = 93 backgrounds; 18 canonical localities; Stage I–V progression; V32_2 canon alignment.

## Play

1. Run `python build.py` to generate `dist/index.html`
2. Double-click `launch.bat` to open the game in your default browser

No server required. Save system uses localStorage with a 4-digit passcode.

## Build

```bash
python build.py
# Output: dist/index.html (~444 KB single file)
```

## Architecture

### Active Runtime (Bundled into dist/index.html)

**Core Data & Mapping:**
- `js/data.js` — ARCHETYPES (31), KEY_LOCALITIES (18), ADJACENCY map, NPC_PLACEMENTS, BESTIARY, HAZARDS
- `js/background-locality-map.js` — Maps all 93 backgrounds to canonical starting localities
- `js/stage2-backgrounds.js` — Stage II content templates for 31 archetype families

**Game Content:**
- `js/narrative.js` — Dynamic scene narration generator
- `js/party.js` — Companion definitions, trust, injury, leave mechanics
- `js/combat.js` — 93 archetype combat abilities + multi-round combat system
- `js/combat-ui.js` — Combat UI layer
- `js/engine.js` — Core engine: state, save/load, character creation, stage progression

**Enriched Choices (bundled at build time):**
- `*_stage1_enriched_choices.js` — Per-locality Stage I choices (12 localities)
- `stage1_additional_enriched_choices.js` — Universal Stage I variety choices
- `stage2_enriched_choices.js` — Stage II choices
- `stage3_enriched_choices.js` — Stage III choices

**Launcher:**
- `launch.bat` — Opens `dist/index.html` in the default browser
- `build.py` — Bundles all active JS + generates `dist/index.html`
- `index.html` — HTML shell: overlays, inline CSS, script imports

### Archived Files

Files in `legacy/` are historical reference only. Do not include them in the build.

### Directory Structure

```
js/                              Active runtime source files
dist/
  index.html                     [GENERATED] Single-file game (~444 KB)
  assets/                        [STATIC] Image, audio, data assets
legacy/                          Archived — do not edit or build from
build.py                         Build script
launch.bat                       Local launcher
index.html                       HTML shell
```

## Game Content

**31 Archetypes** across 4 families:
- Combat: Warrior, Knight, Ranger, Paladin, Archer, Berserker, Warden, Warlord, Death Knight
- Magic: Wizard, Cleric, Priest, Necromancer, Illusionist, Inquisitor, Elementalist, Oracle
- Stealth: Rogue, Assassin, Spellthief, Scout, Thief, Trickster, Beastmaster
- Support: Healer, Artificer, Engineer, Tactician, Alchemist, Saint, Bard

**93 Backgrounds** (3 per archetype): Civic, Frontier, Occult

**18 Active Localities:** Panim Haven, Soreheim Proper, Sunspire Haven, Shelkopolis, Fairhaven,
Mimolot Academy, Ithtananalor, Guildheart Hub, Cosmoria, Aurora Crown Commune, Glasswake Commune,
Shirshal, Harvest Circle, and 5 V32_2 adjacent localities.

**Stage I–V Progression:**
- Stage I: Locality-grounded pressure chains; 4+ actions + Level 5 to advance
- Stage II: Adjacent locality pressure; route content; settlement services
- Stage III: Institutional investigation; national-scale route pressure
- Stage IV: Moral/ethical branches; faction interplay
- Stage V: Permadeath; final confrontation; legend saved on death

**Companion System:** 4 companions with trust, injury, leave conditions, and combat bonuses.

**Save System:** localStorage-based with 4-digit passcode.

## Canon Authority

**V32_2 DnD World Repository** is the source of truth for all settlement names, localities,
factions, NPCs, routes, and archetype grounding. Canon zip: `V31_3_DnD_World_Repository.zip`.

## Contributing

1. Edit source files in `js/` or enriched choice files in the repo root
2. Never edit files in `legacy/`
3. Run `python build.py` after changes
4. Test via `launch.bat`
