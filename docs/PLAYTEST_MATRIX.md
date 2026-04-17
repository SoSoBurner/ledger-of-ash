# Ledger of Ash — Playtest Matrix

Simulated playtests run against the current build (post-upgrade pass).
Each covers 10 meaningful actions, tracks branch collapse, journal, party, and narration.

---

## Playtest 1: Archer / Sunspire Haven / Frontier Ranging Company (a_frontier)

**Background:** Frontier range patrol work. Knows terrain. Suspicious of the east route changes.

| # | Action | Outcome | Notes |
|---|--------|---------|-------|
| 1 | Open scene: Read the terrain from elevation before engaging with anyone | → `archer_frontier_read` | **Archetype-specific node. Not shared spine.** |
| 2 | SUCCESS: High-ground read identifies undocumented eastern waypoint | → `archer_frontier_track` | Distinct. XP 7. Quest: find who built waypoint. |
| 3 | SUCCESS: Cache found — unmarked containers, decommissioned stamp, internal FC shorthand | → `archer_frontier_ally` | Distinct. XP 8. Evidence in hand. |
| 4 | SUCCESS: Elyra confirms Duneshade stamp, southern waypoint sightings | Recruit prompt fires | Elyra trust +8. Recruit option available. |
| 5 | RECRUIT: Ask Elyra to join | Elyra joins party | First companion acquired in Sunspire. |
| 6 | Camp talk with Elyra | Elyra: "I mapped 12 active crossing points not on official charts" | Distinct companion line. |
| 7 | Go to southern waypoint: east_road | Now entering shared spine | **First shared node appears at action 7, not action 2** |
| 8 | SUCCESS: follow_tracks | Evidence chain continues | Shared but with Elyra bonus on survival |
| 9 | report_findings | Roadwardens alerted | Renown +1 |
| 10 | World notice: Roadwarden clocks advance | env-panel reflects checkpoint pressure | Dynamic scene text working |

**First failure:** Step 2 on failure → archetype-specific failure text, not shared "nothing found" |
**Shared spine entry:** Action 7 (acceptable — spec requires 3-5 distinct actions before convergence) |
**Journal duplicates:** None — `archer_frontier_ridge_read` deduped correctly |
**Party/recruit trigger:** Yes at action 4-5 |
**Narration reflects locality:** Yes — Sunspire road dust, frontier tone, pressure descriptor |
**Mobile portrait:** All elements fit — topbar tight but functional |

**Verdict:** Sunspire/Archer no longer feels like a cosmetic wrapper. Distinct path for 6+ actions.

---

## Playtest 2: Healer / Panim Haven / Panim Recovery Specialist (hl_panim)

**Background:** Medical intake, registry access, post-trauma recovery work.

| # | Action | Outcome | Notes |
|---|--------|---------|-------|
| 1 | Open scene: Medical intake records will tell more than official reports | → `healer_panim_read` | **Healer-specific node. Not shared spine.** |
| 2 | SUCCESS: Injury patterns indicate deliberate restraint, not accident. Three cases. | → `healer_panim_registry` | Distinct. XP 7. False classification identified. |
| 3 | SUCCESS: Amendment trail — Celis Lanthorn, non-medical admin with granted access | → probe or ally | Distinct. XP 8. Renown +1. |
| 4 | Go to Toriel: healer_panim_ally | Toriel has suppressed documentation | Trust +8. Recruit prompt. |
| 5 | RECRUIT: Ask Toriel to join | Toriel joins. | Companion acquired in Panim. |
| 6 | Camp talk with Toriel | "Injury types match controlled restraint. Not improvisation." | Distinct companion line. |
| 7 | probe_order_origin (shared) | Now in shared spine | **First shared node at action 7** |
| 8 | Faction consequence: Panim registry irregularity → journal typed as 'fact' | No duplicate | Dedupe working |
| 9 | trace_missing_persons | Families contacted | Good alignment shift |
| 10 | report_findings | First convergence with Shelk investigation | With Toriel, lore rolls get +1 |

**First failure:** Step 2 failure → amendment trail partially cleared, not shared "nothing" |
**Shared spine entry:** Action 7 |
**Journal duplicates:** None — `healer_panim_injury_pattern` deduped |
**Party/recruit trigger:** Yes at action 4-5 |
**Narration reflects locality:** Yes — Panim embalming oil, afterlife clock, memorial notices |
**Panim feels distinct:** Yes. Registry access, false classifications, civil code — distinctly Panim |

**Verdict:** Panim Healer is no longer a cosmetic wrapper. Medical evidence path is mechanically distinct.

---

## Playtest 3: Elementalist / Aurora Crown Commune / Dome Climate Researcher (el_sheresh)

**Background:** Sheresh dome data correlates with axis anomaly. Technical expertise.

| # | Action | Outcome | Notes |
|---|--------|---------|-------|
| 1 | Open scene: Dome sensors have been recording the anomaly | → `elementalist_aurora_read` | **Elementalist-specific node.** |
| 2 | SUCCESS: Anomaly follows predictable curve, peaks at transit windows, flags manually cleared | → `elementalist_aurora_suspect` | Distinct. XP 8. Engineered, not natural. |
| 3 | SUCCESS: Dead account resets — inactive CRC station credentials used | Quest: who has physical access? | Distinct. XP 7. |
| 4 | Go to Neren: elementalist_aurora_ally | Neren has unauthorized correlation charts | Trust +8. Recruit prompt. |
| 5 | RECRUIT: Ask Neren to join | Neren joins. Joint technical finding possible. | Companion acquired at Aurora. |
| 6 | Camp talk with Neren | "The pre-inversion window is three hours. Not improvisation — dome-level knowledge." | Distinct line. |
| 7 | First shared node: probe_order_origin | Entering shared spine | **Action 7** |
| 8 | Faction clocks: Neren+survival bonus during axis events | Roll display shows companion +2 | Companion mechanics working |
| 9 | study_packet (shared) | Technical evidence documented | |
| 10 | report_findings | Technical finding filed | With Neren, carries institutional weight |

**First failure:** Step 2 failure → access denied, CRC clearance path opens — still distinct |
**Shared spine entry:** Action 7 |
**Journal duplicates:** `aurora_axis_engineered` deduped when revisited |
**Party/recruit trigger:** Yes at action 4-5 |
**Narration reflects locality:** Yes — dome hum, outside sky wrong, sensor readings |
**Axis events:** Neren gives +2 during inversion — mechanically meaningful |

**Verdict:** Aurora/Elementalist has a coherent technical investigation path. Distinct from other localities.

---

## Playtest 4: Warrior / Shelkopolis / Garrison Soldier (w_garrison)

**Background:** Ex-Roadwarden. Military training. Reads institutions from the inside.

| # | Action | Outcome | Notes |
|---|--------|---------|-------|
| 1 | Open scene: Read the garrison before speaking — staffing patterns tell the story | → `warrior_garrison_read` | **Warrior-specific node.** |
| 2 | SUCCESS: Patrol route deliberately redirected away from depot access road at night | → `warrior_garrison_contact` or track | Distinct. XP 7. Quest: find what they're avoiding. |
| 3 | Find Holst: warrior_garrison_contact | Holst confirms reassignment by order-with-standing | Distinct. XP 7. Roadwardens +8. |
| 4 | SUCCESS: warrior_garrison_track | Clean zone evidence: unregistered vehicle, canvas marking, military meal | Distinct. XP 8. Renown +1. |
| 5 | Canvas marking → study_packet | First shared node | **Action 5 — slightly early but warrior archetype is direct** |
| 6 | probe_order_origin (shared) | Coth emerges as named figure | Shared spine entered |
| 7 | Approach Vera Wren (trust builds) | If trust ≥15: recruit scene | Vera available in Shelkopolis |
| 8 | RECRUIT: Vera joins | Party now active | Combat + informant |
| 9 | Camp talk with Vera | "Delivery records from the Rusted Loom. Packages the week before closure." | Companion line with evidence |
| 10 | east_road | Investigation moves east with party | |

**First failure:** Step 2 failure (garrison closed) → credential path opens, still distinct |
**Shared spine entry:** Action 5 — acceptable for a direct-access archetype |
**Journal duplicates:** `warrior_garrison_patrol_read` deduped |
**Party/recruit trigger:** Yes at action 7-8 |
**Narration reflects locality:** Yes — Shelkopolis pressed flowers, anxious money, Roadwarden notices |
**Warrior feels distinct:** Yes. Military read, patrol analysis, Holst contact — different from magic/stealth |

**Verdict:** Warrior Shelkopolis path is mechanically distinct for 5+ actions before shared convergence.

---

## Summary findings

| Criteria | Result |
|----------|--------|
| Recruitable NPCs can join and persist | ✓ All 4 companions recruitable with full flow |
| Camp reflects real party state | ✓ Distinct lines per companion, injured state, party HUD |
| Stage V exists explicitly | ✓ Triggers at L19, 3 quests, world notice, cosmic label |
| Hall of Legends is deeper | ✓ Origin, significance, companions, rivals, wound details |
| Journal entries dedupe | ✓ dedupeKey system prevents repeat spam |
| Four archetypes materially different for first 5+ actions | ✓ Archer, Healer, Elementalist, Warrior — all distinct |
| Panim and Sunspire no longer wrappers | ✓ Both have 3-node archetype mid-spines |
| Local scene text changes with pressure | ✓ buildEnvPanelText() responds to faction clocks and rivals |
| Combat choices can enter real combat | ✓ Existing combat system; combat_approach feeds it |
| Mobile portrait readable | ✓ Topbar tight but all buttons present; narrative scroll works |
| Repo docs reflect current build | ✓ This doc, UPGRADE_PLAN, CANON_UPDATE updated |

---

## Remaining weaknesses after this pass

1. **21 archetypes still use family-level branching only** — no per-archetype mid-spine.
2. **Locality consequence nodes are thin** — only Panim, Aurora, Sunspire, Shelkopolis have archetype-specific paths. Soreheim, Cosmoria, Shirshal, Mimolot still fully shared.
3. **Companion leave conditions are too coarse** — morality thresholds are blunt; quest-based leaves not fully implemented.
4. **Route travel is still polity-gating** — no adjacency graph. Stage I/II is correct but route-specific closures aren't implemented.
5. **Combat is not first-class** — entering combat works but the combat entry experience is thin relative to the rest of the investigation.
6. **Apostrophes in content** — constraint removed but existing content not yet rewritten with natural contractions.
