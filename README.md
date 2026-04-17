# Ledger of Ash

A text-based RPG set in the V28_4 Material Planet canon. You are a capable person
in an unstable world. The eastern route has gone wrong. The city knows.
Your job is to understand what happened and decide what to do about it.

## Play

Open `dist/index.html` in any modern browser. No server required.
Save system uses localStorage with a 4-digit passcode. Schema version 5.

## Build

```bash
cd /path/to/loa
python3 build.py
# Output: dist/index.html (~506 KB single file)
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

## Current state

**25 archetypes, 75 backgrounds, 75 opening scenes, 85 consequence nodes, 11 localities, 4 recruitable companions.**

See `docs/CANON_UPDATE.md` for full build numbers and canon manifest.
See `docs/CURRENT_BUILD_UPGRADE_PLAN.md` for what was changed and what remains.
See `docs/PLAYTEST_MATRIX.md` for documented playtests of all 4 key archetypes.

## File structure

```
js/
  party.js          Companion definitions, recruit flow, camp talk, party overlay
  world.js          World notices, faction clocks, archetype encounter weighting
  combat.js         Full TTRPG combat with archetype-specific abilities (75 total)
  world-data.js     Archetypes, backgrounds, locations, factions, ability trees (105)
  scenes.js         75 opening scenes — one per background, all with archetype-family choice
  consequences.js   85 consequence nodes — shared + family-level + archetype-specific
  engine.js         Core engine: state, level-up, save/load, shop, NPCs, dynamic scene text
css/
  style.css         Full stylesheet including party/companion UI
index.html          HTML shell — overlays for journal, notices, NPCs, party, sheet, map
build.py            Builds single-file dist/index.html
docs/
  ARCHITECTURE.md           Technical architecture and Phase 2 stack
  API_CONTRACTS.md          Phase 2 API endpoint definitions
  NARRATION_PACKET.md       Claude boundary contract for Phase 2
  CURRENT_BUILD_UPGRADE_PLAN.md  What was upgraded and what remains
  PLAYTEST_MATRIX.md        Documented playtests for 4 key archetypes
  CANON_UPDATE.md           Canon manifest: V28_4 source, extractions, inference rules
  QA_CHECKLIST.md           Pre-deploy quality checklist
```

## Game systems

- **25 archetypes** — 4 families (combat, magic, stealth, support)
- **75 backgrounds** — 3 per archetype, each with unique canon-grounded opening
- **Archetype-family branching** — all 75 openings route to family-specific first node
- **Per-archetype mid-spines** — Archer, Healer, Elementalist, Warrior have 3-node dedicated paths
- **4 recruitable companions** — Vera Wren, Toriel Palevow, Neren Rimebridge, Elyra Mossbane
- **Companion mechanics** — trust threshold, join/refuse scenes, party HUD, camp talk, passive roll bonuses, leave conditions
- **85 consequence nodes** — 73 shared investigation + 12 archetype-specific Stage I nodes
- **105 archetype abilities** — passive/active split, applied at level-up
- **Dynamic scene text** — env panel reflects faction clock pressure, rival activity, locality tone
- **Journal typed records** — deduplication, categories, locality+day stamps
- **Stage I–V progression** — Stage II at L6, Stage V at L19 with three quest spines
- **World notices board** — faction clock events, rival postings, auto-updating
- **Save schema v5** — full migration chain v1→v5

## Canon

V28_4 DnD World Repository. All settlement names, faction IDs, NPC names, deity references
grounded in canon. No Psanan starting localities. No invented factions.

## What is not done yet

- 6 additional archetypes (spec targets 31)
- 18 additional backgrounds (spec targets 93)
- Per-archetype mid-spines for 21 remaining archetypes
- Locality-specific nodes for Soreheim, Cosmoria, Shirshal, Mimolot, Guildheart
- Route graph (currently polity-gating; adjacency-based travel planned for Phase 2)
- First-class combat entry (combat system exists; entry experience thin)
