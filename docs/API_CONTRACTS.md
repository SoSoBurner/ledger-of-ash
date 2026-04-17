# Ledger of Ash — API Contracts (Phase 2)

Base URL: `https://api.sosothervguy.com`

All endpoints return `application/json`. All state mutations require auth.

---

## Auth

```
POST /auth/login
Body: { code: "000001", password: "string" }
Returns: { token: "jwt", legends: [...] }

POST /auth/register
Body: { password: "string" }
Returns: { code: "000001", token: "jwt" }
```

Code assignment: sequential from 000001, assigned at first character creation.

---

## World

```
GET /world/snapshot
Returns: { axisTick, axisInverted, dayCount, factionClocks, activeNotices }

GET /world/notices
Returns: { notices: [{ id, text, day, category }] }
```

---

## Player Runs

```
POST /player/run/create
Auth required
Body: { archetypeId, backgroundId, name, statBoost }
Returns: { runId, state: G }

POST /player/run/:id/resume
Auth required
Returns: { state: G }

GET /player/run/:id/state
Auth required
Returns: { state: G }
```

---

## Turn Resolution

```
POST /turn/resolve
Auth required
Body: {
  runId: string,
  choiceId: string,      // cid from the choice
  skill: string,
  tag: 'safe'|'risky'|'bold',
  align: string
}
Returns: {
  roll: number,          // d20 result
  total: number,         // roll + all modifiers
  difficulty: number,
  outcome: 'success'|'partial'|'failure',
  effects: [...],        // applied state changes
  stateSnapshot: G,
  narrationPacket: {     // for Claude API
    sceneContext: string,
    outcomeType: string,
    playerName: string,
    location: string,
    archetype: string,
    effectsSummary: string
  },
  fallbackText: string   // used if Claude unavailable
}
```

---

## Combat

```
POST /combat/resolve
Auth required
Body: {
  runId: string,
  enemyId: string,
  action: 'attack'|'defend'|'ability'|'flee',
  abilityId?: string
}
Returns: {
  round: number,
  playerRoll: number,
  enemyRoll: number,
  playerDamage: number,
  enemyDamage: number,
  newEnemyHp: number,
  newPlayerHp: number,
  wounds: [...],
  outcome: 'ongoing'|'victory'|'fled'|'defeated',
  stateSnapshot: G
}
```

---

## Travel

```
POST /travel/resolve
Auth required
Body: { runId, destinationId }
Returns: {
  allowed: boolean,
  reason?: string,         // if not allowed
  stateSnapshot?: G,
  travelCost: { axisTicks, timeUnits, gold }
}
```

---

## Camp

```
POST /camp/resolve
Auth required
Body: { runId, action: 'rest'|'train'|'craft'|'talk'|'recover', skillChoice?: string }
Returns: {
  outcome: string,
  hpRestored?: number,
  skillImproved?: string,
  costPaid: { gold, axisTicks },
  disadvantageApplied?: number,
  stateSnapshot: G
}
```

---

## Recovery

```
POST /recover/resolve
Auth required
Body: { runId, method: 'professional'|'self'|'ritual', cost: number }
Returns: {
  woundsHealed: [...],
  hpRestored: number,
  fatigueDelta: number,
  stateSnapshot: G
}
```

---

## Legends

```
GET /legends
Returns: { legends: [{ name, archetype, background, level, renown, stage, alignment, quests, history, date }] }

POST /legends/:id/end
Auth required
Body: { runId }
Returns: { legendId, summary }
```

---

## NPC Adventurers

```
GET /npc-adventurers
Returns: { rivals: [{ name, archetype, renown, active, hook, lastSeen }] }
```

---

## Claude Boundary

The deterministic engine resolves all of the above.
Claude is called AFTER resolution to generate narrative flavor only.

```
POST /narrate (internal, not exposed to client)
Body: narrationPacket (from turn/resolve)
Returns: { sceneText, npcLines, recapLine }
```

If Claude times out or fails, fallbackText from the deterministic engine is used.
Claude NEVER modifies stateSnapshot. It only generates readable text.

---

## Telemetry Events

All logged via structured events:
- `run.created`, `run.resumed`, `turn.resolved`, `combat.started`, `combat.ended`
- `travel.attempted`, `travel.blocked`, `camp.action`, `levelup.completed`
- `stage.advanced`, `legend.ended`, `claude.called`, `claude.failed`, `fallback.used`

Schema: `{ event, runId, sessionId, timestamp, payload }`
