# Ledger of Ash — Architecture

## Current state (HTML phase)
Single-file static HTML game. Deployed to:
- Production: www.sosothervguy.com/ledger-of-ash (via Azure + GitHub)
- Canon: V28_4_DnD_World_Repository

### Files
```
/js/combat.js        — Combat system, enemy templates, archetype abilities
/js/world-data.js    — Archetypes, backgrounds, locations, factions
/js/scenes.js        — 75 opening scenes (1 per background)
/js/consequences.js  — 61+ consequence nodes with success/failure/partial branches
/js/engine.js        — Core engine: state, HUD, save/load, level-up, alignment
/css/style.css       — Full stylesheet
/index.html          — HTML shell with overlay structure
```

### Save system (Phase 1 — localStorage)
Key format: `loa_save_{name}_{4digitPIN}`
Schema version: 3
Migration: `Object.assign(G, parsed)` — forward-compatible

### State object (G)
See engine.js G declaration. Key fields:
- `schemaVersion`: 3
- `wounds`, `fatigue`, `recoveryState`: injury tracking
- `npcMemory`: {npcId: {trust, seen, lastNote}}
- `inventory`, `equipped`: item system
- `morality`, `order`: -100 to +100 alignment
- `trainingDisadvantage`: 0-5 choices with -2 penalty
- `rivalAdventurers`: [{name, archetype, hook, renown, active}]
- `stage`, `stageLabel`: Stage I (Grass Roots) through Stage V

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
