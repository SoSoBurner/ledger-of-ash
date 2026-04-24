# Design Review Index — 2026-04-23
**Session scope:** Last 24-hour changes + full Stage 1 & 2 release audit

---

## Review Files

| Review | File | Scope |
|--------|------|-------|
| Code/Spec Audit (24h changes) | `legacy/specs/ledger_of_ash_24hr_reverse_spec.md` | Stage II boss, Stage III climax, boss seeds, public complication hook, Soreheim economy, bug fixes |
| Appeal & Engagement | `docs/reviews/appeal-engagement-review.md` | 24h changes |
| Feedback Loops | `docs/reviews/feedback-loop-review.md` | 24h changes |
| Fun | `docs/reviews/fun-review.md` | Full game, Stage 1 & 2 |
| Polish | `docs/reviews/polish-review.md` | Full game, Stage 1 & 2 |
| Level Design | `docs/reviews/level-design-review.md` | Full game + items/combat/economy/build |

---

## Consolidated Findings by Priority

### P0 — Bugs / Broken Systems (fix before release)

| # | Issue | File | Status |
|---|-------|------|--------|
| 1 | ~~`G.worldClocks.watchfulness` dead writes~~  | `stage2_boss.js`, `stage3_climax.js` | ❌ Not a bug — hook reads `G.worldClocks.watchfulness`. Reverted. |
| 2 | `_closeClimax` double-logs malformed journal entry | `stage3_climax.js` | ✅ Fixed |
| 3 | `G.worldClocks.day` dead time-skip — 3 locations | `stage2_boss.js` | ✅ Fixed |
| 4 | Dead second arg `loadStageChoices(G.location, G.stage)` in rival timeout | `ledger-of-ash.html` | ✅ Fixed |
| 5 | No re-trigger guard in `triggerRivalEncounter` | `ledger-of-ash.html` | ⬜ Open |

### P1 — Stage 2 Content & Density (release blocker)

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 4 | Stage 2 at 27% of Stage 1 density | Flow breaks when player exits Stage 1; incentive chain loses density at climax build | Escalation pass: assign locality arc roles (discovery/faction/reckoning phases), author to density |
| 5 | Stage 2 milestone structure felt as grind, not arc | stageProgress thresholds (8/12/15) are correct architecture; content between them is under-populated | Surface `stageProgress[2]` as a felt pressure indicator + structured locality roles |

### P2 — Player Clarity (high impact, moderate effort)

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 6 | No visible macro goal in Stage 1 | Players complete encounters without a felt destination; motivation loss before Stage 2 | Add a stated player intention at start that answers "what am I working toward?" without naming the conspiracy |
| 7 | Rival clock and watchfulness both invisible | Two competing systems fire without HUD signal; "I'm being punished and don't know why" | Surface both: rival clock timer + watchfulness indicator in HUD |
| 8 | Training cooldown invisible | "Why can't I train?" confusion; `G.dayCount` not in HUD | Surface day count and training cooldown status |
| 9 | Stage 2 → Stage 3 DC modifier fully hidden | Player gets DC 12 vs 15 on mediate path without knowing why; earned benefit invisible | One narration line at Stage III mediate acknowledging inquisitor contact |

### P3 — Feedback Loops (engagement depth)

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 10 | Watchfulness has no drain mechanic | One-way ratchet; eventually guarantees complications regardless of behavior | Add `campAction('lay_low')`: watchfulness -1 or -2 at cost of 1 day |
| 11 | stageProgress can stall below boss threshold | Clock penalty can outpace gains if player avoids rivals; no recovery redirect | Clock penalty should open a "lay low" recovery opportunity, not just subtract |

### P4 — Teaching Sequence (onboarding quality)

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 12 | Archetype selected before mechanics demonstrated | Uninformed irrevocable choice; build traps invisible until Stage 2 | Mid-first-locality archetype confirmation beat after all six skills demonstrated |
| 13 | Stage 2 rival clock + watchfulness not introduced | Players hit competing systems cold with no demonstration | Seed both concepts in Stage 1→2 bridge arc narration |
| 14 | Combat archetypes face Stage 2 social game untelegraphed | May be correct thematic design; may be accidental build trap | Verify Stage 2 rival encounters have at least one non-persuasion path; if not, add |

### P5 — Polish & Visual Identity (quality ceiling)

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 15 | No documented color identity system | Ad hoc color decisions across 534 KB of content; consistency gap | Document: base + 3 accent roles (gold/danger/discovery) with hex values in CLAUDE.md |
| 16 | Boss encounters visually identical to routine encounters | Pattern-pop-subversion fails at most important moments | One CSS class (`encounter--boss`) applied by `enterCombat()`: border-color or background shift |
| 17 | Stage transitions have no visual acknowledgment | Stage 1→2 advancement is mechanical but not felt | CSS state change on stage transition |

### P6 — Design Depth (longevity)

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 18 | sorePlotCredits system fully hidden | Player sees prices change but doesn't understand why; investment invisible | Social register flavor line in Soreheim shop signaling reputation is opening doors |
| 19 | Meso objectives (training/items/companions) not surfaced | Player tracks macro (stage) and micro (choice) but not the rich middle layer | Consider a lightweight "current pursuits" HUD element or journal section |
| 20 | 22 Stage 1 localities use identical structure | Becomes predictable by locality 6 | Assign distinct locality types: information / pressure / discovery |

---

## Strengths — What's Working

- **Three-path boss approach routing** — expose/negotiate/disappear routes to build identity. Direct "you are your build" feedback. Best structural design in Stage 2.
- **Boss seed injection** — telegraphs encounters before firing. Respects player agency. Correct teaching sequence for bosses.
- **DC three-tier system** — visible safe/risky/bold tiers on choice buttons. Teaching through structure, not text.
- **Typography three-tier system** — Cinzel/Crimson Pro with documented enforcement. Strongest polish element.
- **Stage 2 → Stage 3 flag dependency** — prior decisions have mechanical weight downstream. Correct RPG design.
- **Locality arrival kit system** — infrastructure-before-atmosphere requirement produces distinct physical identity per locality.
- **Item system architecture** — 4 families × 3 slots × 4 chains is correct build-identity scaffolding.
- **Watchfulness complication hook** — creates genuine competing objectives in Stage 2. Correct loop structure.

---

## Session Bugs Fixed (already in codebase)

- Launch screen SyntaxError (duplicate `const stage` in `loadStageChoices`) — ✅ Fixed
- `G.stageProgress` scalar corruption at 4 locations (rival exchange, probe, pressure clock, rival clock) — ✅ Fixed
