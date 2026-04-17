# Ledger of Ash — Current Build Upgrade Plan

> **HISTORICAL RECORD (pre-Batch 27 era).** This document describes the upgrade pass that transitioned the game from scenes.js/consequences.js architecture to the current data.js/engine.js architecture. Current runtime state is in `README.md`. This document is kept for development history; do not treat its file lists or counts as current.

## Status: Historical — Active patch cycle on static HTML prototype (completed)

This document tracks the current upgrade pass against the spec requirements.
It is not a future architecture vision — it describes what was done and what remains.

---

## What was upgraded in this pass

### 1. Branch convergence — partially addressed
**Was:** All 75 backgrounds collapsed into shared 73-node investigation spine within 2 actions.
**Now:** 
- 4 archetype families each have a distinct family-level first node (combat_approach, magic_read, stealth_surveillance, support_analysis/community) present in all 75 opening scenes.
- 4 key archetypes (Archer/Frontier, Healer/Panim, Elementalist/Aurora, Warrior/Garrison) have dedicated 3-node mid-spines before shared convergence (12 nodes total).
- Archetype-specific nodes feed back into the shared spine after 3-5 distinct actions.
**Still needed:** Per-archetype mid-spines for remaining 21 archetypes. Currently: family-level only.

### 2. Companion and party system — implemented
**Was:** No persistent companion state. approachNPC() had no recruit flow.
**Now:**
- `COMPANION_DEFS` defines 4 recruitable NPCs (Vera Wren/Shelkopolis, Toriel Palevow/Panim, Neren Rimebridge/Aurora, Elyra Mossbane/Sunspire).
- Trust threshold: 15. Recruit flow: join/negotiate/refuse scenes per companion.
- Companions persist in `G.companions{}` with status, trust, injured state, campLineIdx.
- Leave conditions: morality/order thresholds, quest-based triggers.
- Camp talk: distinct lines per companion by campLineIdx, different when injured.
- Companion passive bonuses applied to relevant rolls (Vera+persuasion in Shelkopolis, Toriel+lore, Neren+survival during axis events, Elyra+survival/stealth).
- Party overlay shows all companions with status, abilities, join day.
- Party HUD in left panel shows active companions.
- `checkCompanionLeave()` called every action.
- Journal records companion joins, leaves, events as typed 'companion' entries.

### 3. Stage V — implemented
**Was:** Stage IV was the ceiling with a label change only.
**Now:**
- Stage V triggers at Level 19 when in Stage IV.
- Label: 'International to Cosmic'.
- Three Stage V quests auto-posted on advance.
- World notice posted: axis escalation demands evidence from all parties.
- Completion path: distinct from Stage IV — cosmic scale consequences.
- History entry records Stage V transition.

### 4. Dynamic scene decorators — implemented
**Was:** env-panel description was static time-of-day flavor text only.
**Now:**
- `buildEnvPanelText()` composes: locality tone descriptor + time flavor + faction pressure + axis state + wound condition.
- `getLocalityToneDescriptor(locId)` returns rotating location-specific atmosphere lines (3 per location, 11 locations). Lines change by day count.
- `getScenePressureDescriptor()` reads live faction clock progress and rival state to generate pressure text: Roadwarden checkpoint doubling, House Shelk closures, Shadowhands movement, rival sightings.
- env-panel now reflects the world changing around the player.

### 5. Journal typed records + dedupe — implemented
**Was:** `G.journal` was an array of raw strings that accumulated duplicates freely.
**Now:**
- `G.journalRecords[]` typed records: `{id, category, dedupeKey, locality, day, text, updated, severity}`.
- `addJournal(text, category, dedupeKey)` dedupes by `dedupeKey` — updates existing entry instead of appending duplicate.
- Categories: quest, field_note, faction, rival, companion, fact.
- Journal overlay renders by category with locality+day stamps.
- Schema migration v4→v5 converts existing journal strings to typed records.
- Legacy `G.journal` array maintained for backward compat.

### 6. Hall of Legends — deepened
**Was:** Name, archetype, level, one faction note, wound count, last 6 history lines.
**Now:** Full legend summary: origin, alignment, significance statement, faction highlights, active/lost companions, wound details, rival outcomes, quests active at end, major choice history.

### 7. Apostrophe constraint — removed
**Was:** "No apostrophes in string values" hard rule throughout docs and comments.
**Now:** `safeAttr()` helper added. No authoring constraint. Content can be written naturally. All strings use JS single-quote syntax — apostrophes in content strings that are not inside JS string literals are fine since they're inserted via innerHTML.

### 8. Schema migration v1→v5 — fixed and completed
**Was:** Migration blocks were in wrong order (v4→v5 before v3→v4), schemaVersion never bumped to 5.
**Now:** Correct sequential v1→v2→v3→v4→v5 order. `loaded.schemaVersion = 5` at end.

---

## What is not yet done

| Gap | Priority | Notes |
|-----|----------|-------|
| Per-archetype mid-spine for 21 remaining archetypes | HIGH | Currently family-level only |
| Locality-specific consequence nodes (Panim, Sunspire) | HIGH | Only `panim_contact` exists |
| Apostrophe fix in content strings (actual contractions) | MED | Constraint removed but content not yet rewritten |
| Route graph (adjacency-aware travel) | MED | Still broad polity-gating |
| Combat promotion (first-class combat entry) | MED | Currently routes to existing combat system |
| Canon manifest doc | MED | See CANON_UPDATE.md |
| Modularization (split engine into logical modules) | LOW | Do not do this before backend — premature |
| 31 archetypes / 93 backgrounds | LOW | Spec says 31; currently 25. Add 6 archetypes in next pass. |
| Backend migration prep | DEFERRED | After prototype is solid |

---

## Recommended next patch order

1. **Locality-specific nodes for Panim Haven and Sunspire Haven** — these two localities feel most like wrappers right now.
2. **Per-archetype mid-spine for remaining 21 archetypes** — at least support family, then dedicate to the highest-play archetypes first.
3. **Actual contractions/apostrophes in content** — now that the constraint is removed, audit and rewrite stilted prose.
4. **6 additional archetypes to reach 31** — identify the 6 most distinct and add them with 3 backgrounds each.
5. **Route graph for travel** — replace polity-gating with explicit route adjacency using V28_4 route data.
6. **Combat promotion** — make combat entry feel genuinely different from skill resolution.
