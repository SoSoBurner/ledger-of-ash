# Level Design Review — Ledger of Ash
**Date:** 2026-04-23  
**Scope:** Entire game — Stage 1 & 2 release, items, combat, economy, character build  
**Skill:** game-design:level-design-review

---

## Framework Lens Mapping

| Spatial Concept | Ledger of Ash Equivalent |
|----------------|--------------------------|
| Level / Room | Locality (22 Stage 1, Stage 2 set) |
| Critical path | stageProgress[N] → milestone thresholds |
| Navigation vectors | Choice pool (observational = reading choices, strategic = weighing risk, navigational = committing) |
| Boss gate | Boss encounter at stageProgress threshold |
| Safe zone | Camp system, low-watchfulness localities |
| Embedded difficulty | Safe/risky/bold DC tier structure |
| Modular encounters | Enriched choice pool system |
| Teaching sequence | Archetype → skill demonstration → DC escalation |

---

## Lens 1: Principles — Stage 1

**Does not cool the action:** 22-locality structure risks dead time when players exhaust good choices in a locality and fall to generic fallback options. Every locality needs at least one thing worth finding even on a third visit.

**Teaches through play — character build (FAIL):** Archetype selection at character creation = framework's "difficulty select screen" anti-pattern. Uninformed, essentially irrevocable choice before the player understands what each skill does. A player who selects Engineer (high craft/lore) doesn't know Charm dominates Stage 2 social encounters until it's too late to respec. **Fix:** First locality as tutorial space demonstrating all six skill types; archetype confirmation beat at end of first locality.

**Teaches through play — DC system (PASS):** Three named tiers (safe=7, risky=12, bold=15) visible on choice buttons. Teaching through structure, not text. ✅

**Embedded difficulty:** DC tier structure IS embedded difficulty — players self-select risk. **Risk:** If bold success yields same outcome as risky success, the risk/reward signal breaks. Bold outcomes need to be meaningfully differentiated.

**Rollercoaster pacing — predictability trap:** 22 localities with identical structure (arrive → narration → choices → results) becomes predictable by locality 6. Needs at least three distinct locality types: **information** (heavy NPC dialogue, rumor density), **pressure** (watchfulness cost, time-sensitive), **discovery** (lore-heavy, implicit narrative). Without distinct types, the learn-play-challenge-surprise loop flattens.

---

## Lens 1: Principles — Stage 2

**Milestone structure:** Three thresholds (boss=8, antechamber=12, climax gate=15) = correct three-act level design. Named gates create anticipation and a felt arc. ✅

**Content density (27%) makes the arc a grind.** Milestones are architecturally correct. The space between them is under-populated. Framework: "empty spaces with nothing to do kill momentum."

**Rival clock:** Introduces genuine time pressure Stage 1 lacks. Correct pacing tool. **But** clock penalty only matters if player can see the clock. If rival encounter fires as a surprise, pressure is invisible until it hurts. Invisible pressure = frustration, not tension.

**Bi-directionality:** When player returns to a Stage 2 locality after raising stageProgress, does it feel different? Different rival encounter pool? Changed NPC disposition? If identical on revisit, modular encounter opportunity missed.

---

## Lens 2: Design Layers

**Layer 1 — Nonlinear explorable space:** Travel network exists. Travel mode (`G.travelMode`) not yet activated. Between-locality journeys not yet a designed experience — when activated, routes need the same "no dead time" rule as localities.

**Layer 2 — Finite resources:** Gold creates scarcity tension between training and items. Correct design. Economy tension only works if gold is calibrated: too plentiful = no choice, too scarce = frustration, correct = player must prioritize. Untested playtest question.

**Layer 3 — Reactive world state:** Flag-reactive NPC behavior, watchfulness modifier, Stage 2 flags affecting Stage 3 DCs. Layer exists. Visibility inconsistent — players need to SEE the world reacted, not just experience a different result text.

**Layer 4 — Sensory AI (translated: NPC situational awareness):** 5-tier NPC model with archetype-sensitive reactions. **Gap:** Only applies to named NPCs and authority figures. If 90% of encounters are archetype-blind, the reactive layer feels sparse.

**Layer 5 — Safe zones:** Camp system is correct. Must remain genuinely safe — any forced encounter in camp breaks the safety contract and destroys its function as orientation space.

**Layer 6 — Narrative curation:** Arrival kit system (53 first-arrival scenes), infrastructure-before-atmosphere requirement, sensory-specific locality openings. Strongest narrative design element in the game. ✅

---

## Lens 3: Systems

**Combat teaching sequence:** Press/Defend/Talk/Retreat. Does the first combat encounter teach all four options at low stakes? If the first combat can produce a cascading bad state, the teaching is punishing. **Companion gating risk:** Vorath/Mira gate on `maren_oss_resolved`. If player hits difficult Stage 2 combat before resolving Maren Oss, they do it without companions — potentially unintended.

**Item system — build identity payoff:** Four families × 3 slots × 4 chains. Build identity requires: (1) right item family accessible in early localities, (2) item chain visible enough to plan toward, (3) equipped bonus large enough to be perceptible (>10% DC success rate change). If items are shop-only and the correct shop is in an unvisited locality, the system exists but the player never engages it.

**Combat archetype vs. Stage 2 social game:** Rival clock rewards persuasion. Watchfulness punishes aggressive approaches. A pure combat archetype faces Stage 2 as a social game they're not built for. Either: (a) correct thematic design — needs telegraphing in Stage 1 via rival encounters that reward multiple skill types, or (b) accidental build trap — some Stage 2 rival encounters need combat/survival paths.

**Training system — invisible cooldown:** 30-day cooldown creates time management tension. Only works if player knows the in-game day count. If `G.dayCount` isn't surfaced in the HUD, the training cooldown produces confusion ("why can't I train?") rather than decision-making.

---

## Concurrent Objective Structure

| Layer | Visibility |
|-------|------------|
| Macro: advance stageProgress | Visible |
| Meso: build skills + items + companion quests | **Mostly invisible — not on any screen** |
| Micro: choose approaches per encounter | Visible |

The meso layer isn't formally surfaced. Player can't track "training cooldown ends in 12 days / Maren Oss encounter available at X locality." The rich concurrent system is playing behind the HUD.

---

## Teaching Sequence — Full Game Arc

| Stage | Should Be | Risk |
|-------|-----------|------|
| Character creation | Informed choice with demonstrated stakes | Archetype selected before mechanics understood ❌ |
| Stage 1, localities 1-4 | Introduce DC system, skills one at a time | All 6 skills available immediately ⚠️ |
| Stage 1, mid | Training + items demonstrated | Economy tension untested ⚠️ |
| Stage 1 boss | Mastery test | Correctly structured ✅ |
| Stage 1→2 bridge | Scope reveal: patterns are connected | Exists; prose quality determines effectiveness ⚠️ |
| Stage 2, early | Introduce rival clock + watchfulness | Both invisible in HUD ❌ |
| Stage 2 boss (Dravn Pell) | Mastery test of social navigation | Correctly gated, seeded, three paths ✅ |
| Stage 2 climax | Creative reuse of all Stage 2 systems | Depends on density reaching threshold ⚠️ |

---

## Two Highest-Leverage Changes

1. **Add a mid-first-locality archetype confirmation beat.** Let character creation choose a starting archetype as preview. Play through first locality as tutorial space showing all six skill types at low stakes. Offer "lock in your path" beat at the end — not a full respec, just a moment to confirm after experiencing the mechanics. Converts uninformed irrevocable choice into informed contextual one. Single scene + small game-state change.

2. **Assign Stage 2 localities explicit arc roles and surface milestone progress.** Three-act Stage 2 (thresholds 8/12/15) needs each locality declared as: discovery phase (0–8), faction phase (8–12), or reckoning phase (12–15). Choice pools in those localities should reflect that phase. Surface `stageProgress[2]` as a felt pressure indicator (journal gauge, HUD signal). Converts milestone grind into a felt escalation arc.
