# CLAUDE CODE DEBUG AND VALIDATION HANDOFF

## Role of This Pass
This pass happens after the implementation-oriented edits.

Your job is to:
- test the live-flow quality of the updated build
- catch locality drift that survived implementation
- audit pacing and hierarchy under actual play
- run mobile and regression checks
- tighten prose and scene-state behavior without widening scope

You are not here to reopen design scope.
You are here to validate, debug, and refine the shipped direction.

---

## Hard Constraints
Do not widen into unrelated systems work.
Do not redesign combat, progression, party architecture, or unrelated UI systems.
Do not revert the first-class central narration requirement.
Do not preserve stale V28_4 locality truth for convenience.

---

## Core Validation Goals
You must confirm that the updated build now delivers:
- correct Stage I locality truth under V28_8
- stable Story-screen hierarchy
- readable central narration on desktop and mobile
- readable Notice Board on desktop and mobile
- stronger first-session momentum
- clearer class-authentic information pickup
- better repeated-clue-chain payoff through visible world change

---

## Priority Audit Stack
Run the audits in this order:
1. **Locality-consistency audit**
2. **UI regression audit**
3. **Mobile portrait audit**
4. **World-motion / Notice-system audit**
5. **Route pacing audit**
6. **Class-fantasy audit**
7. **Final prose cleanup and polish pass**

---

# LOCALITY-CONSISTENCY AUDIT

## Required truth rule
For Stage I, background location and current playable location must match under V28_8.

## Required checks
For each implemented Stage I background, verify:
- header locality
- opening-scene locality
- first meaningful choice locality
- first investigation chain locality
- first notice set locality
- first named contact locality
- first consequence chain locality
- route labels and institutional labels
- ritual / law / public behavior texture

## Failure pattern to catch
Any case where:
- the header shows one locality
- the opening scene is staged in another
- notices imply a third
- the early node chain still assumes Shelkopolis-first routing

That must be treated as a failed implementation.

---

## Specific Locality-Consistency Audit Points

### Panim-linked starts
Panim-linked starts must remain in Panim Haven for all of Stage I.
Audit docks, depots, memorial notices, gate or quay authority, freight-chain hooks, and any eastern-route crisis wording for Panim-local truth.

### Fairhaven-linked starts
Fairhaven-linked starts must remain in Fairhaven for all of Stage I.
Audit market, observatory, shrine, civic, cave-edge, and route-pressure surfaces for Fairhaven-local truth.

### Mimolot-linked starts
Mimolot-linked starts must remain in Mimolot for all of Stage I.
Audit academy-cover, book-tariff, archive, clerk, and research-space behavior for Mimolot-local truth.

### Aurora-linked starts
Aurora-linked starts must remain in Aurora Crown Commune / Sheresh for all of Stage I.
Audit public tone, magical civics, local authority, commune infrastructure, and route behavior for Aurora-local truth.

### Roaz-linked starts
Roaz-linked starts must remain in Ithtananalor / Roaz for all of Stage I.
Audit law, records, mercantile behavior, public conduct, and civic-procedural texture for Roaz-local truth.

### Soreheim-linked starts
Soreheim-linked starts must remain in Soreheim for all of Stage I.
Audit frontier, watch, travel, hazard, and authority posture for Soreheim-local truth.

### Guildheart-linked starts
Guildheart-linked starts must remain in Guildheart for all of Stage I.
Audit guild logic, route ties, trade posture, freight flow, and industrial/social texture for Guildheart-local truth.

### Shelk-native starts
Shelk-native starts are the control case.
They may remain in Shelkopolis / Principality of Shelk.
Use them to confirm the implementation did not break the original Shelk-grounded case while fixing the non-Shelk starts.

---

# UI REGRESSION AUDIT

## Central narration panel requirement
Confirm that the central narration panel now occupies the primary scene-text slot on the Story screen.
That means:
- first full-width story-text block below the header
- above “You chose”
- above roll text
- above outcome/result text
- above live choices
- inline on the main Story screen
- not a modal
- not a side panel
- not a recap block

## UI hierarchy validation
Confirm the player reads the Story screen in this order:
1. where they are
2. what the current place feels like right now
3. what just happened
4. what they can do next

## Failure signals
- old transcript clutter visually outranks the current scene
- the result card appears before the current place-state
- the narration panel is buried below previous turn content
- the scene anchor is missing or visually weak

---

# MOBILE PORTRAIT AUDIT

## Required mobile behavior
The same hierarchy must survive on mobile portrait.
Do not accept a long stack of equal-weight cards as “good enough.”

## Check for
- readable header
- narration panel remains first major text block
- result card remains below narration
- choices remain below result
- no horizontal overflow in notices or results
- no cramped text blocks
- no visually merged cards
- no loss of tap usability in overlay panels

## Specific Notice Board mobile checks
The Notice Board must be treated as a blocker surface.
Verify:
- notice cards separate clearly
- long text wraps cleanly
- section labels remain distinct
- scrolling remains stable
- text is not clipped or overlaid
- entry date/day markers remain readable

---

# WORLD-MOTION AND NOTICE-SYSTEM AUDIT

The Notice Board carries world motion, notices, rival activity, and public pressure.
It must feel live, parseable, and locality-true.

## Required checks
- entries remain local to the active Stage I background locality
- notices do not leak wrong-polity naming
- notice deduplication remains sane
- notice order and separation remain readable
- public pressure feels changed by player and world motion
- the surface remains legible after many in-world days

## Failure signals
- notice entries feel like an undifferentiated wall of text
- repeated entries look duplicated but not meaningfully advanced
- wrong-polity offices or neighborhoods appear in a local notice set
- mobile corruption or unreadable stacking returns

---

# ROUTE PACING AUDIT

## Primary pacing question
Does the player feel materially new pressure, access, or payoff quickly enough during Stage I?

## What to watch
- how many actions pass before something visibly changes
- whether repeated clue chains only reconfirm suspicion
- whether route-state change is legible
- whether public pressure and institutional response evolve
- whether access gates feel earned rather than arbitrary

## Desired behavior
By the time the player has followed multiple clue beats, the scene should show visible change in at least one of the following:
- access
- authority posture
- route availability
- public mood
- named contact openness
- ritual / memorial tone
- suspicion / stealth pressure
- magical risk or martial threat posture

---

# CLASS-FANTASY AUDIT

## Martial / combat readability
Verify that martial/combat players can read:
- protection
- threat
- wounds
- stance
- gear readiness
- front-line consequences

## Spellcaster readability
Verify that spellcasters can read:
- magical resources
- active effects
- wards
- rituals
- prepared options
- magical pressure

## Stealth readability
Verify that stealth players can read:
- concealment state
- suspicion / noise
- position quality
- infiltration tool relevance
- escape viability

If the prose becomes atmospheric but stops supporting play interpretation, that is a failure.

---

# SPECIFIC LIVE-FLOW AUDIT POINTS
Use the existing flows shown in the runtime and screenshots as directed validation points.

Audit these specifically:
- Panim Haven eastern-route chain
- gate closure / directive / standing / inside-contact loop
- House Shelk receiving office and off-record meeting flow
- Mimolot academic-cover thread
- Selwyn Coth evidence chain
- Wes / cart-driver leverage chain
- shrine / private memorial pressure chain
- camp solo-state behavior
- level 2 and level 3 advancement readability

For each, check:
- location truth
- scene hierarchy
- momentum
- result readability
- notice behavior
- whether the latest narration actually repaints the world state rather than merely restating a clue

---

# NARRATION / LORE AUDIT

## Required lore truth
All locality-facing prose must align to V28_8 naming, institutions, route identity, law, ritual tone, and social behavior.

## Required checks
- all background intros align to V28_8 locality truth
- all Stage I notices align to V28_8 locality truth
- all Stage I NPC entries align to V28_8 locality truth
- all stale V28_4 references are removed or replaced
- no wrong-polity language remains in the lived Stage I space

## Narration quality checks
Each refreshed narration block should:
- feel local
- feel changed by the player’s action
- avoid generic quest-summary voice
- avoid stale stock phrases
- remain playable, not merely decorative

---

# FINAL CLEANUP AND POLISH PASS
Only after the above audits pass should you perform the cleanup pass.

Allowed cleanup targets:
- prose tightening
- repeated phrase reduction
- card spacing fixes
- notice wrapping tweaks
- hierarchy polish
- naming cleanup
- stale doc strings

Do not reopen unrelated systems work.

---

## Completion Standard
This pass is complete only when:
- every implemented Stage I background remains in its correct locality under V28_8
- no wrong-polity header/prose/node/notice mismatch survives
- the central narration panel is first-class and visually protected
- the Notice Board is readable on desktop and mobile
- repeated clue chains now feel like progress instead of stall
- class-authentic readability remains intact
- the build feels more grounded, more legible, and more momentum-rich without widening scope
