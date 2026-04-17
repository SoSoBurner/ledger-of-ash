---
> **ARCHIVED FOR HISTORY ONLY**
> This document is kept for reference and context only.
> It reflects planning or spec work from prior sessions.
> Do not treat this as current documentation.
---

# ACCEPTANCE CRITERIA AND TEST MATRIX

## Purpose
This document defines the pass/fail checks for the next Ledger of Ash update.

A change is not complete because it compiles.
A change is complete only when the runtime, prose, layout, and locality truth all pass the checks below.

---

## Global Acceptance Rule
All locations, backgrounds, narrations, and lore references must align to V28_8 while everything else remains unchanged unless a direct dependency required adjustment.

That means the update passes only if:
- Stage I locality truth is corrected
- Story-screen hierarchy is corrected
- Notice Board readability is corrected
- pacing and scene-state payoff improve
- unrelated systems are not widened or redesigned

---

# A. DESKTOP LAYOUT CHECKS

## A1. Story-screen hierarchy
**Pass condition:** The player reads the Story screen in this order: header, narration panel, chosen action, roll, result, choices.  
**Failure signal:** Result cards, transcript clutter, or side surfaces visually outrank the current place-state.  
**Test method:** Start multiple Stage I backgrounds, take at least 5 meaningful actions, and inspect the scene after each refresh.

## A2. Left rail stability
**Pass condition:** Left rail remains readable and supports interpretation without stealing focus from the center scene.  
**Failure signal:** Primary scene prose appears displaced into side rails or the left rail becomes visually dominant over the scene anchor.  
**Test method:** Inspect the Story screen at start, after damage/readiness changes, and after level-up.

## A3. Choice stack readability
**Pass condition:** Live choices remain clearly grouped as the next-action surface below the result layer.  
**Failure signal:** Choices blend into transcript clutter or become visually indistinct from lore/summary text.  
**Test method:** Run three different starts and inspect long and short choice lists.

## A4. Result card separation
**Pass condition:** Result text is clearly distinct from narration text.  
**Failure signal:** The place-state and outcome are merged into a flat wall of text.  
**Test method:** Compare a success, failure, and mixed-information result.

---

# B. MOBILE PORTRAIT CHECKS

## B1. Hierarchy survives on mobile
**Pass condition:** Mobile preserves the same order as desktop: header, narration, result, choices.  
**Failure signal:** Mobile collapses into a long stack of equal-weight blocks.  
**Test method:** Test on narrow portrait widths and inspect at start, after multiple turns, and after overlay use.

## B2. Narration remains primary on mobile
**Pass condition:** The narration panel remains the first major text block below the header.  
**Failure signal:** Result text or previous transcript content appears first.  
**Test method:** Trigger repeated actions and inspect the top of the Story screen after each render.

## B3. Tap-safe overlays
**Pass condition:** Overlay surfaces remain scrollable, tappable, and visually stable.  
**Failure signal:** Notice overlay clips text, overlaps content, or becomes hard to scroll.  
**Test method:** Open Notices, Journal, and any relevant overlay after several in-world days.

---

# C. NOTICE BOARD READABILITY

## C1. Entry separation
**Pass condition:** Individual notices are clearly separated as distinct entries.  
**Failure signal:** Notices read like one merged block.  
**Test method:** Open Notice Board after enough world motion to generate multiple entries.

## C2. Long-text wrapping
**Pass condition:** Long notice text, route labels, institution names, and public warnings wrap cleanly with no horizontal overflow.  
**Failure signal:** Truncation, clipping, sideways overflow, or overlap.  
**Test method:** Force or locate the longest available notice copy and test on desktop and mobile.

## C3. Section-label readability
**Pass condition:** Section labels are visually distinct from notice body text.  
**Failure signal:** Section labels blend into the notice cards or appear as broken inline text.  
**Test method:** Open the Notice Board on desktop and mobile and inspect multiple notice groups.

## C4. Story-screen longevity
**Pass condition:** After many in-world days, the Notice Board remains readable and useful.  
**Failure signal:** The surface degrades into clutter, duplication, or corruption.  
**Test method:** Advance time, generate world notices, reopen the surface multiple times.

---

# D. NARRATION PANEL PLACEMENT AND BEHAVIOR

## D1. Exact placement
**Pass condition:** The narration panel is the first full-width story-text block immediately below the header.  
**Failure signal:** It appears below result text, below choices, in a recap block, in a side panel, or in a modal.  
**Test method:** Inspect the DOM/rendered order during fresh start and after several actions.

## D2. Refresh behavior
**Pass condition:** The narration panel fully refreshes after every meaningful change.  
**Failure signal:** Only tiny edits occur, or old narration remains the primary current-scene text.  
**Test method:** Trigger meaningful changes in time, pressure, route, faction posture, and access.

## D3. Scene-state painting
**Pass condition:** The narration repaints the place as changed by the player’s actions.  
**Failure signal:** It merely repeats suspicion or generic quest-summary text.  
**Test method:** Follow a repeated clue chain and inspect whether public, spatial, or institutional change appears.

## D4. Player-focality
**Pass condition:** The narration remains player-embodied and archetype-authentic.  
**Failure signal:** It becomes detached lore text or generic scene summary.  
**Test method:** Compare martial, caster, and stealth-oriented runs.

---

# E. CLUE-CHAIN PACING AND MOMENTUM

## E1. First-session momentum
**Pass condition:** Within the first session, the player experiences meaningful new pressure, access, or payoff quickly enough to stay engaged.  
**Failure signal:** Too many actions pass before anything materially changes.  
**Test method:** Run several fresh starts and count turns to first meaningful access or pressure shift.

## E2. Repeated investigation payoff
**Pass condition:** Repeated investigation continues to feel like progress rather than stall.  
**Failure signal:** The player repeatedly confirms known suspicion without gaining new access, heat, leverage, or changed posture.  
**Test method:** Follow repeated clue chains and inspect changes to authority, public mood, route access, named contact openness, or environmental state.

## E3. Branch / reconvergence behavior
**Pass condition:** Reconverging branches still preserve enough differentiated consequence and scene-state texture.  
**Failure signal:** Different paths collapse into identical generic output too quickly.  
**Test method:** Take alternate routes toward the same node and compare the resulting scene-state and notices.

---

# F. ROUTE-STATE READABILITY

## F1. Local route framing
**Pass condition:** Stage I clearly communicates, “you are here, in your local world, dealing with the local version of the eastern-route crisis.”  
**Failure signal:** The route framing feels imported from another polity or from a generalized Shelk-first script.  
**Test method:** Compare multiple locality starts and inspect route-related narration and notices.

## F2. Route change visibility
**Pass condition:** The player can tell when route pressure, closures, freight irregularity, or access has changed.  
**Failure signal:** Route-state changes happen invisibly or only in mechanical back-end terms.  
**Test method:** Trigger route-relevant results and inspect narration, notices, and follow-up choices.

---

# G. CLASS-SPECIFIC READABILITY

## G1. Martial/combat readability
**Pass condition:** Martial/combat players can read protection, threat, wounds, stance, gear readiness, and front-line consequence.  
**Failure signal:** The prose becomes atmospheric but not tactically legible.  
**Test method:** Run combat-forward starts and inspect the narration/result surfaces after risky actions.

## G2. Spellcaster readability
**Pass condition:** Spellcasters can read magical resources, active effects, wards, rituals, prepared options, and magical pressure.  
**Failure signal:** Magical play-state is obscured or flattened into generic prose.  
**Test method:** Run caster-forward starts and inspect magical contexts in both safe and pressured scenes.

## G3. Stealth readability
**Pass condition:** Stealth players can read concealment state, suspicion/noise, position quality, infiltration tools, and escape viability.  
**Failure signal:** The player cannot tell how hidden, exposed, or recoverable the situation is.  
**Test method:** Run stealth-forward starts and inspect narration after covert actions, partial failures, and escapes.

---

# H. LEVEL-UP AND CAMP FLOW CLARITY

## H1. Level-up readability
**Pass condition:** Level 2 and Level 3 advancement remains understandable within the improved hierarchy.  
**Failure signal:** Advancement UI becomes buried, confusing, or visually subordinate to transcript clutter.  
**Test method:** Trigger advancement and inspect readability on desktop and mobile.

## H2. Camp flow clarity
**Pass condition:** Camp behavior remains legible and does not break the current-scene hierarchy.  
**Failure signal:** Camp surfaces feel detached from the Story-screen logic or obscure the current scene.  
**Test method:** Enter solo-state camp-related flows and inspect layout and result readability.

---

# I. STAGE I LOCALITY CONSISTENCY MATRIX

## I1. Panim-linked starts
**Pass condition:** All Stage I Panim-linked starts remain physically located in Panim Haven and Panim-local districts/routes/institutions.  
**Failure signal:** Any opening, notice, NPC, or consequence node silently stages play in Shelkopolis or another polity.  
**Seed backgrounds:** `k_order`, `pr_panim`, `nc_panim`

## I2. Fairhaven-linked starts
**Pass condition:** All Stage I Fairhaven-linked starts remain physically located in Fairhaven and Fairhaven-local spaces.  
**Failure signal:** Any opening, notice, NPC, or consequence node leaks into another polity.  
**Seed backgrounds:** `r_shelk`, `pr_community`

## I3. Mimolot-linked starts
**Pass condition:** All Stage I Mimolot-linked starts remain in Mimolot-local academy / archive / tariff / research spaces.  
**Failure signal:** Any opening, notice, NPC, or consequence node silently relocates the player.  
**Seed backgrounds:** `wz_mimolot`, `nc_mimolot`, `iq_mimolot`, `or_mimolot`

## I4. Aurora / Sheresh-linked starts
**Pass condition:** All Stage I Aurora-linked starts remain in Aurora Crown Commune / Sheresh-local spaces.  
**Failure signal:** Any opening, notice, NPC, or consequence node leaks into Shelkopolis-first staging.  
**Seed backgrounds:** `r_sheresh`, `nc_sheresh`, `el_sheresh`, `al_sheresh`, `or_sheresh`, `bm_sheresh`

## I5. Ithtananalor / Roaz-linked starts
**Pass condition:** All Stage I Roaz-linked starts remain in Ithtananalor / Roaz-local spaces.  
**Failure signal:** Any opening, notice, NPC, or consequence node stages another polity.  
**Seed backgrounds:** `w_roaz`, `p_eloljaro`, `cl_eloljaro`, `eg_roaz`, `or_ithtananalor`, `wl_roaz`

## I6. Soreheim-linked starts
**Pass condition:** All Stage I Soreheim-linked starts remain in Soreheim-local spaces.  
**Failure signal:** Any opening, notice, NPC, or consequence node leaks elsewhere.  
**Seed backgrounds:** `w_frontier`, `r_soreheim`, `b_soreheim`, `wz_field`, `wa2_soreheim`, `wl_soreheim`, `bm_soreheim`

## I7. Guildheart-linked starts
**Pass condition:** All Stage I Guildheart-linked starts remain in Guildheart-local spaces.  
**Failure signal:** Any opening, notice, NPC, or consequence node stages another polity.  
**Seed backgrounds:** `cl_remeny`, `ro_union`, `ro_nomdara`, `tr_nomdara`, `sn_remeny`

## I8. Shelk-native control case
**Pass condition:** Shelk-native starts remain correctly staged in Shelkopolis / Principality of Shelk and continue to work after the broader locality pass.  
**Failure signal:** The locality-alignment pass breaks the original control case.  
**Seed backgrounds:** representative Shelk-native starts from the existing runtime

---

# J. CANON / LORE ALIGNMENT

## J1. V28_8 alignment
**Pass condition:** All locations, backgrounds, narrations, institutions, polity names, route labels, faction references, laws, rituals, and locality behaviors surface as V28_8 truth.  
**Failure signal:** Any stale V28_4 naming or logic remains in runtime-facing Stage I content.  
**Test method:** Compare runtime-facing text to the V28_8 authority sources.

## J2. Wrong-polity leakage
**Pass condition:** No opening, notice, NPC, route, or consequence node leaks into the wrong polity for that Stage I start.  
**Failure signal:** Header/prose/node mismatch, wrong office names, wrong district names, or wrong public behavior.  
**Test method:** Audit the first several turns of each locality seed background.

## J3. Change boundary compliance
**Pass condition:** Only the authorized surfaces changed, except where direct dependencies required support edits.  
**Failure signal:** Combat, progression, party foundations, or unrelated mechanics were redesigned during the canon pass.  
**Test method:** Compare before/after runtime behavior for unrelated systems.

---

## Release Gate
The implementation passes only when every section above passes.

If even one of the following remains true, the build does **not** pass:
- the narration panel is not first-class
- the Notice Board is still unstable on mobile
- any Stage I background is physically staged in the wrong polity
- V28_4-facing locality truth still leaks into runtime-facing content
- repeated investigation still feels like stall rather than progress
