# Ledger of Ash — Architecture

## Current state (HTML phase — V28_8)
Single-file static HTML game. Deployed to:
- Production: www.sosothervguy.com/ledger-of-ash (via Azure + GitHub)
- Canon: V28_8_DnD_World_Repository

### Active runtime files
```
js/data.js                    — ARCHETYPES (31), KEY_LOCALITIES (11 V28_8), ADJACENCY, NPC_PLACEMENTS, BESTIARY, HAZARDS, SETTLEMENT_POIS
js/background-locality-map.js — V28_8 Stage I locality grounding: all 93 backgrounds → canonical starting localities
js/stage2-backgrounds.js      — Stage II content templates (archetype family pressure chains)
js/narrative.js               — Dynamic scene narration generator (locality, pressure, hazards, NPCs, route)
js/party.js                   — 4 companion definitions + companionBonus skill integration
js/combat.js                  — 93 archetype combat abilities + multi-round combat system (not integrated into engine.js)
js/engine.js                  — Core engine: state init, level-up, save/load, stage progression, encounter choices
index.html                    — HTML shell: inline CSS, script imports, Story screen layout
build.py                      — Bundles active JS into dist/index.html

legacy/                       — V28_4 archived files: world.js, world-data.js, scenes.js, consequences.js
```

### Save system (Phase 1 — localStorage)
Key format: `loa_upgrade_batch27` (single key, JSON object of all saves by passcode)
Schema: no explicit version; forward-compatible via default state merge on load

### State object (G)
See engine.js `defaultState()`. Key fields:
- `archetype`, `backgroundId`: player identity
- `location`: current locality ID (V28_8-canonical)
- `stage`, `stageLabel`: Stage I–V
- `stageProgress`: milestone counts per stage
- `skills`: {combat, survival, persuasion, lore, stealth, craft}
- `wounds`, `fatigue`: injury tracking
- `worldClocks`: {pressure, rival, omens}
- `encounter`: active encounter state (null when not in encounter)
- `companions`: array of companion objects (engine.js schema)
- `journalRecords`, `notices`, `legends`, `quests`: log arrays
- `telemetry`: action/encounter/service counters

---

## Phase 2 — Azure + GitHub deployment

### Target architecture
```
www.sosothervguy.com        — Wix marketing shell
www.sosothervguy.com/ledger-of-ash — Game frontend (React/Vite, served from Azure)
api.sosothervguy.com        — Fastify backend API (Azure App Service or Container)
```

### Deployment flow
```
GitHub push → GitHub Actions → Build → Deploy to Azure
```

### Planned stack
- Frontend: React + Vite (replaces current HTML)
- Backend: Fastify (Node.js) on Azure
- DB: Postgres (Azure Database for PostgreSQL)
- Worker: Node.js background process (faction clocks, rival adventurer advancement)

### Required endpoints (Phase 2)
```
GET  /world/snapshot
GET  /world/notices
POST /player/run/create
POST /player/run/:id/resume
POST /turn/resolve
POST /combat/resolve
POST /travel/resolve
POST /camp/resolve
POST /recover/resolve
GET  /legends
GET  /npc-adventurers
```

### Claude boundary
Claude generates ONLY:
- sceneText
- npcLines
- recapLine
- scene flavor

Claude NEVER decides:
- world state, stats, inventory, movement validity
- combat results, healing, injuries, rewards
- progression, flags, faction outcomes, death

---

## Stage structure
| Stage | Levels | Scope |
|-------|--------|-------|
| I — Grass Roots | 1-5 | Origin locality only |
| II — Local Inter-Polity | 6-10 | Cross-polity, canon routes |
| III — Greater Inter-Polity | 11-15 | Regional significance |
| IV — International | 16-19 | Cross-world consequence |
| V — International to Cosmic | 20 | Culmination |

Stage I is origin-locked. Stage II gate: Level 6.

---

## Deterministic integrity rules
1. All game state changes happen in engine.js functions
2. Consequence nodes define outcomes — engine resolves them
3. UI only reads G state — never mutates it except via engine functions
4. Combat resolves via d20 + skill + trait bonus — no narrative override
5. Save/load uses full G serialization — no partial saves
