# Ledger of Ash

A text-based RPG set in the **V28_8** Material Planet canon. You are a capable person
in an unstable world. The eastern route has gone wrong. The city knows.
Your job is to understand what happened and decide what to do about it.

**Current build:** 31 archetypes × 3 backgrounds = 93 backgrounds; 13 canonical localities; Stage I–V progression; V28_8 canon alignment; Stage I locality grounding.

## Play

Open `dist/index.html` in any modern browser. No server required.
Save system uses localStorage with a 4-digit passcode. Schema version 5.

## Build

```bash
cd /path/to/loa
python3 build.py
# Output: dist/index.html (~230 KB single file)
# Bundles: data.js, background-locality-map.js, stage2-backgrounds.js, narrative.js, party.js, combat.js, engine.js
```

## Deploy

### Option 1: Azure Static Web Apps

1. Fork this repo to your GitHub account
2. Create an Azure Static Web App pointing to your fork
3. Add the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret to your repo
4. Push to `main` — GitHub Actions builds and deploys automatically

### Option 2: Docker

```bash
docker compose up -d
# Serves at http://localhost:8080
```

### Option 3: Any static host

Upload `dist/index.html` to any web host. No backend needed for Phase 1.

## Architecture

### Active Runtime (Bundled into dist/index.html)

**Core Data & Mapping:**
- `js/data.js` — ARCHETYPES (31), KEY_LOCALITIES (11 V28_8-canonical), ADJACENCY map, NPC_PLACEMENTS, BESTIARY, HAZARDS
- `js/background-locality-map.js` — V28_8 Stage I locality grounding: maps all 93 backgrounds to their canonical starting localities (not hardcoded to Shelkopolis)

**Game Content:**
- `js/stage2-backgrounds.js` — Stage II content templates for 31 archetype families (shared + family-specific pressure chains)
- `js/narrative.js` — Dynamic scene narration generator: composes scene text from locality, pressure state, hazards, NPCs, route hints

**Systems:**
- `js/engine.js` — Core engine: state initialization, level-up, save/load, character creation, stage progression, objective cycling, threat/rescue logic
- `js/party.js` — Companion definitions (4 recruitable NPCs), skill bonus logic (`window.companionBonus`); recruitment/camp/overlay flows defined but use legacy DOM API not connected to current engine
- `js/combat.js` — 93 archetype combat abilities (3 per archetype) + full TTRPG multi-round combat system; combat abilities defined, multi-round flow not integrated into engine.js encounter choices

**Deployment:**
- `index.html` — HTML shell with overlays (journal, notices, NPCs, party, sheet, map); inline CSS; script imports
- `build.py` — Bundles all active JS files and generates single-file `dist/index.html`

### Archived Files (Historical Reference Only)

The following files were part of V28_4 implementation and are kept in `legacy/` for historical reference:
- `legacy/world.js` — V28_4 notice templates, faction clocks, encounter weighting (replaced by inlined systems in engine.js)
- `legacy/world-data.js` — V28_4 archetype/background database (replaced by augmented data.js with V28_8 grounding)
- `legacy/scenes.js` — V28_4 opening scenes with incorrect starting localities (replaced by background-locality-map.js routing)
- `legacy/consequences.js` — V28_4 consequence node database (replaced by stage2-backgrounds.js content)

**Do not include archived files in the build pipeline.** They are provided for reference only.

### Directory Structure

```
js/
  data.js                      [ACTIVE] V28_8 canonical data: archetypes, localities, adjacency, NPCs, hazards
  background-locality-map.js   [ACTIVE] All 93 backgrounds → V28_8 starting localities
  stage2-backgrounds.js        [ACTIVE] Stage II content templates (family-based pressure chains)
  narrative.js                 [ACTIVE] Dynamic scene narration generator
  party.js                     [ACTIVE] Companions: recruitment, trust, camp, party overlay
  combat.js                    [ACTIVE] Combat system with archetype abilities
  engine.js                    [ACTIVE] Core game engine
  
css/ (was style.css)           [ARCHIVED] CSS is now fully inlined in index.html

legacy/
  world.js                     [ARCHIVED] V28_4 scaffold
  world-data.js                [ARCHIVED] V28_4 scaffold
  scenes.js                    [ARCHIVED] V28_4 opening scenes
  consequences.js              [ARCHIVED] V28_4 consequence nodes
  [other archived docs]

dist/
  index.html                   [GENERATED] Single-file deployable (230 KB)
  assets/                      [STATIC] Image, audio, data assets

docs/
  ARCHITECTURE.md              Technical design and Phase 2 planning
  API_CONTRACTS.md             Phase 2 API specifications
  CANON_UPDATE.md              V28_8 canon alignment notes
  QA_CHECKLIST.md              Pre-deploy quality checklist
  [other documentation]

build.py                       Python build script: bundles active JS + generates dist/index.html
index.html                     HTML shell: overlays, inline CSS, script imports
README.md                      This file
```

## Game Content

**31 Archetypes** across 4 families:
- Combat: Warrior, Knight, Ranger, Paladin, Archer, Berserker, Warden, Warlord, Death Knight
- Magic: Wizard, Cleric, Priest, Necromancer, Illusionist, Inquisitor, Elementalist, Oracle
- Stealth: Rogue, Assassin, Spellthief, Scout, Thief, Trickster, Beastmaster (7)
- Support: Healer, Artificer, Engineer, Tactician, Alchemist, Saint, Bard (7)

**93 Backgrounds** (3 per archetype): Civic, Frontier, Occult

**Stage I Locality Grounding (V28_8):**
Each background now starts in its V28_8-canonical starting locality instead of hardcoded Shelkopolis:
- Warfare/Roaz backgrounds → Ithtananalor
- Soreheim backgrounds → Soreheim Proper + frontier routes
- Panim backgrounds → Panim Haven + memorials
- Aurora backgrounds → Aurora / Sheresh localities
- Guildheart backgrounds → Guildheart Hub
- etc.

**13 Canonical Localities** (V28_8):
Panim Haven, Soreheim Proper, Sunspire Haven, Shelkopolis, Fairhaven, Mimolot Academy,
Ithtananalor, Guildheart Hub, Cosmoria, Aurora Crown Commune, Glasswake Commune, Shirshal, Harvest Circle

**Stage I–V Progression:**
- Stage I: 4+ objective-web actions + Level 5 to advance; locality-grounded pressure chains
- Stage II: Adjacent locality pressure; background-specific route content; destination scouting
- Stage III–IV: Family milestone tracking (3 milestones each); family edge unlocks at milestone 2
- Stage V: Permadeath; final boss/hazard confrontation after 4 milestones; legend saved on death

**Companion System (defined, partial integration):**
- 4 companions defined in `party.js` with trust, injury, and leave mechanics
- Companion skill bonuses apply to rolls via `window.companionBonus`
- Full recruitment flow and camp talk UI use legacy API; not yet connected to the active engine.js architecture

**93 Archetype Combat Abilities:** 3 per archetype (passive/active/reaction split) defined in `combat.js`

**Encounter System:** Skill-check-based encounters (combat/stealth/lore/retreat) via engine.js `encounterChoices`; full TTRPG multi-round combat defined in `combat.js` but not yet integrated into the active engine

**Save System:** localStorage-based with 4-digit passcode; no migration chain in current build

## Canon Authority

**V28_8 DnD World Repository** is the source of truth for:
- Settlement names and polity identity
- Locality definitions and district composition
- Faction references, law, economy, faith, infrastructure
- Route identity and polity gating
- NPC placement and role
- Archetype/background locality grounding

See `docs/CANON_UPDATE.md` for detailed canon alignment notes.

## What is not done yet (Phase 2+)

- Opening scene text rewrite (scenes.js was V28_4; needs locality-specific rewrites for V28_8 starting positions)
- Stage I consequence nodes audit (verify they don't silently relocate players away from background locality)
- Per-archetype mid-spines for all 31 archetypes (currently: shared family chains)
- Full route graph (currently: polity-based gating; planned: adjacency-based travel)
- First-class combat entry (combat system exists; early-game entry experience thin)
- Phase 2 API backend (Phase 1 is single-file, localStorage-based)

## Current state summary

**This is a functional, single-file, browser-based RPG with:**
- V28_8 canonical world grounding
- Stage I locality grounding: each of 93 backgrounds starts in its own V28_8-canonical starting locality
- 31 playable archetypes with distinct progression paths
- Dynamic narrative generation based on locality, pressure, hazards, NPCs, and routes
- Full 5-stage progression with permadeath at Stage V
- Skill-check encounter system with archetype-matched choices
- localStorage save system with passcode
- Responsive design (desktop + mobile)
- Zero server/database requirements

**What is defined but not yet fully integrated:**
- Full TTRPG multi-round combat system (combat.js — defined, not called by engine.js)
- Companion recruitment flow, camp talk, and party overlay (party.js — defined, uses legacy DOM API not present in current engine.js)

**To contribute:**
1. Identify which system you want to work on (see Architecture section)
2. Active runtime files are in `js/`; never edit archived files in `legacy/`
3. Rebuild with `python build.py` after changes
4. Test in `dist/index.html` 
5. When complete, see the "What is not done yet" section for priority areas
