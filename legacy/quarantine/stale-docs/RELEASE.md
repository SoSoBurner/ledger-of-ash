# Ledger of Ash — Stage I–II Release

**A text-first, single-player TTRPG-style fantasy game built in JavaScript.**

## What's Included

### Game Features
- **31 Archetypes**: Warrior, Knight, Ranger, Paladin, Archer, Berserker, Warden, Warlord, Death Knight, Wizard, Cleric, Priest, Necromancer, Illusionist, Inquisitor, Elementalist, Oracle, Rogue, Assassin, Spellthief, Scout, Thief, Trickster, Beastmaster, Healer, Artificer, Engineer, Tactician, Alchemist, Saint, Bard
- **93 Backgrounds**: 3 backgrounds per archetype (Civic, Frontier, Occult) with unique Stage I grounding
- **8 Route Families**: Memorial, Convoy, Contamination, Guild, Archive, Forge, Witness, Shrine (Stage III–V progression)
- **10 Localities**: Shelkopolis, Panim Haven, Sunspire Haven, Aurora Crown Commune, Harvest Circle, Glasswake Commune, Fairhaven, Mimolot Academy, Soreheim Proper, Shirshal
- **Stage I–II Complete**: Playable progression from character creation through Stage II deepening
- **Combat System**: Skill checks, class-differentiated abilities, creature encounters, hazard resolution
- **Settlement Services**: Equipment, recovery, information gathering, training, secret discoveries
- **Party System**: Recruitable companions with class synergy bonuses

### Game Balance
- 20 Creatures (from Scarab Swarm to Corrupted Archon)
- 20 Environmental Hazards (from Steep Collapse to Plague Spore)
- 5 Skill Trees: Combat, Survival, Persuasion, Lore, Stealth, Craft
- XP progression: Level 1–20 across 5 Stages
- Faction opinion tracking and world-state persistence

### UI & Theme
- **Minimalist text-first design** optimized for narrative clarity
- **Responsive layout** for desktop and mobile viewports
- **Cover image–derived color palette**: Warm ember/gold + cool storm/steel
- **Persistent save system** with passcode-protected character saves
- **Journal, Map, Services, NPCs, Notices, Camp, Legends panels**

## How to Play

1. **Load or Create**: Enter a passcode and select an archetype + background combo
2. **Stage I (Levels 1–4)**: Investigate a local contradiction in your origin locality
3. **Stage II (Levels 5–8)**: Push outward along a widening route, uncovering pressure and consequences
4. **Stage III–V**: Encounter elite threats, build family edges, face legendary challenges

## Technical

- **Built**: Single-file HTML/JavaScript (no dependencies)
- **Save Format**: LocalStorage JSON (browser-based persistence)
- **Display**: Responsive CSS Grid layout
- **Build**: Python bundler combines all CSS and JS into dist/index.html (166 KB)

## Files

- `index.html` — HTML structure and inline scripts
- `dist/index.html` — Bundled, release-ready single-file game
- `assets/cover.png` — Cover art (mood reference and storefront image)
- `js/*.js` — Source modules (bundled for deployment)
- `css/style.css` — Styling (bundled for deployment)
- `build.py` — Build script

## Launch

**Online**: Play at https://github.com/SoSoBurner/ledger-of-ash (open `dist/index.html` locally or host on any static server)

**Local**: `python -m http.server 8001` then open `http://localhost:8001`

## Future Work

### Stage III–V Deepening
- More unique route family content
- Legendary boss encounters
- Family-specific ending narratives

### World Systems
- Faction state persistence across playthroughs
- NPC personality and dialogue trees
- Dynamic locality changes based on player choices
- Consequence visibility and world reactivity

### Content Expansion
- 66 backgrounds ready for narrative deepening (currently templated)
- Additional archetypes and backgrounds
- New route families and regions
- Expanded bestiary and hazard content

---

**Created**: 2024  
**Author**: Copilot  
**License**: Unlicensed (privately held)

---

## Changelog

### Release 1.0
- ✓ All 31 archetypes fully playable
- ✓ All 93 backgrounds with unique Stage I + Stage II hooks
- ✓ Complete Stage I progression (Levels 1–4)
- ✓ Complete Stage II progression (Levels 5–8)
- ✓ Combat system with 31 archetype-specific abilities
- ✓ 10 localities with unique flavor and mechanics
- ✓ Party system with 9+ recruitable companions
- ✓ UI theme derived from cover image
- ✓ Responsive mobile-friendly layout
- ✓ Persistent save system with passcode protection
