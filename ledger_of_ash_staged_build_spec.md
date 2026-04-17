# Ledger of Ash — Staged Build Spec

## 1. Purpose of This File

This file is the canonical implementation path for future AI coders working on **Ledger of Ash**.

Its job is to translate the intended full single-player game into a release-sequenced build path that can be followed without re-deriving scope from scattered notes, stale batch docs, or partial runtime scaffolding.

This file is not a pitch, not a wiki, and not a historical changelog. It is an execution document.

A future coder should be able to read this file and know:
- what the game is,
- what the finished single-player target is,
- what must be built first,
- what depends on what,
- what is intentionally deferred,
- what counts as complete at each release,
- what must be tested before advancing.

### Current repo reality this spec is built against

The current main-branch runtime is a **static single-page HTML + JavaScript prototype**, not yet a backend-driven game. The active game shell is `index.html` with runtime data and logic in:
- `js/data.js`
- `js/engine.js`
- `js/combat.js`
- `js/party.js`
- `js/narrative.js`

The current runtime already contains:
- 31 archetypes
- 93 backgrounds
- 93 route signatures generated from the archetype/background matrix
- stage labels and level bands for five stages
- a central narrative panel and separate result panel
- panels for map, services, sheet, journal, NPCs, notices, camp, and legends
- settlement POI scaffolding
- group-based encounter verbs
- party recruitment shell
- rescue continuation shell for pre-final stages
- Stage V permadeath shell
- Hall of Legends shell

The current runtime does **not** yet satisfy the full target described below. In particular, it still relies on shallow procedural scaffolding in places where the final game requires authored differentiation, deeper canon grounding, stronger route variance, broader locality coverage, richer class-authentic confrontation, and stronger long-run consequence.

### Important repo reading rule

Existing documents under `docs/` are useful as historical context, but they are **not automatically authoritative**. Some are stale, conflict with current runtime counts, or refer to older canon baselines and earlier overlay structures. When this file conflicts with historical batch notes, use:
1. the active runtime code,
2. the V28_8 canon package,
3. this staged build spec.

## 2. Product Identity

### What Ledger of Ash is

Ledger of Ash is a **premium-feeling, text-first, single-player dark fantasy campaign RPG for web and mobile**.

It is built for:
- TTRPG and D&D-adjacent players
- narrative CRPG players
- dark fantasy readers
- build-crafters who want martial, magical, and stealth-forward play to feel truly different
- players who return for consequence, atmosphere, class fantasy, party tension, and route variation
- players who recommend games because runs feel personal, reactive, and memorable

The player does **not** begin as a chosen hero. The player begins as a person who already belongs to a place and a structure:
- a settlement
- a valid lineage and social frame
- an archetype identity
- a grassroots background
- a local pressure already underway

The game starts intimate and local, then widens across five stages until the run becomes legendary.

### What Ledger of Ash must feel like

The game must feel:
- gripping in the first session
- readable and satisfying in moment-to-moment play
- replayable because different runs are materially different
- immersive because the world responds visibly and immediately
- memorable because the player character remains the living center of the run

### What Ledger of Ash is not

Ledger of Ash is not:
- a generic fantasy text adventure
- a visual novel with fake branches
- a roguelike that erases history between attempts
- a lore dump disguised as a game
- a party-spectator game where companions replace the player as protagonist
- an MMO in the current release plan

## 3. Canon and Source Authority Rules

### Canon source of truth

Use **V28_8** as the sole canon authority for:
- continuity
- locality identity
- institutions
- law
- economy
- infrastructure
- routes
- hazards
- NPC grounding
- chronology
- social behavior

### Required source inspection order

Before changing content or systems that depend on canon, future coders must inspect sources in this order:

1. `README.md` plus package manifest and source authority files from V28_8
2. `01_CANON_GOVERNANCE`
3. `05_RUNTIME_ENGINE`
4. `03_LOCALITY_ENGINE`
5. `03_RECONCILIATION_LAYER` and `04_CONSERVATIVE_INFERENCE` only as bounded support
6. `02_CANON_BASELINE`
7. reference views only as convenience, never over primary canon layers

### Precedence rules

Use these precedence rules consistently:
- corrective or superseding records over older baseline
- direct locality or named-subject records over broad summaries
- district, settlement, institution, route, polity, or locality packets over regional synthesis
- structured canon over stylistic assumption
- runtime current state over archival summary when runtime exists

### Truth rules

Do not:
- invent unsupported canon
- flatten uncertainty into certainty
- genericize law, faith, economy, infrastructure, or social hierarchy
- patch gaps using external fantasy defaults

### Canon integration boundary

Customs, culture, economy, law, and infrastructure may only surface where they materially affect:
- locality identity
- confrontation legality
- route access
- settlement services
- chronology pressure
- faction behavior
- public notices
- starting options
- hazards
- social response

They are operative systems, not exposition pillars.

### Current blocker rule

The repo contains the V28_8 zip package, but the active runtime and some docs still reflect older simplifications. Before broadening authored content, future coders must first unpack and verify the V28_8 package and then reconcile any stale runtime assumptions against it.

## 4. Non-Negotiable Design Rules

1. **Do not implement MMO features in this staged plan.**
2. The architecture may remain MMO-shaped, but every release in this file targets the complete single-player version only.
3. Do not redesign the game into a different genre.
4. Do not flatten the world into generic fantasy.
5. Do not reduce class fantasy to cosmetic flavor.
6. Do not let the setting or companions become the protagonist.
7. Do not author companion tracks as archetype-locked or background-locked unless in-world conditions justify access restrictions.
8. Do not replace canon with inference when canon can be inspected.
9. Do not present lower-trust material as equal to higher-trust canon.
10. Do not treat historical batch docs as the main specification.

### Player-primacy rule

The player character must remain the focal living center of play. The run is not about watching a world simulation happen. It is about inhabiting one character’s embodied route through it.

### Party grounding rule

Party NPCs must be:
- world-rooted,
- naturally located,
- recruitable through in-world conditions,
- persistent,
- consequential,
- subordinate to player primacy.

The player gathers people into **their** run. They do not become a supporting character in a companion anthology.

## 5. Finished Single-Player Target

The finished game target is:
- 31 archetypes
- 93 backgrounds
- 5 stages
- 20 total levels
- unique Stage I grassroots origins per background
- unique five-stage route signatures per background
- living chronology that continues without the player
- strong locality identity
- meaningful party management
- canonical bestiary and hazards
- route widening from local stakes to world stakes
- rescue-based death handling in Stages I to IV
- true permadeath in Stage V
- Hall of Legends as a historical memory layer
- strong class-specific play for classic combat, magic/spellcasting, and stealth/precision

### Target experiential pillars

#### Rooted beginnings
Character creation must feel authored by the world rather than selected from disconnected menus.

#### Immediate embodiment
Every turn should feel like a choice made by a person in a place, not a cursor selecting content cards.

#### Route variation
Different backgrounds and archetypes must lead to meaningfully different early game pressure, different widening vectors, different rival/faction pressure, and different remembered endings.

#### Observably living world
The world must move without the player and show that movement through changed access, new notices, altered route conditions, rising pressure, and missed windows.

#### Class-authentic play
Martial, magical, and stealth-forward runs must not collapse into the same interaction model with different labels.

## 6. Release Roadmap Overview

The build path is release-sequenced as follows:

### Release 1 — Stage I + Stage II
Purpose: deliver the complete early game and adjacent-regional game as a polished, replayable, premium-feeling foundation.

### Release 2 — Stage III
Purpose: widen the run into national-scale pressure, deepen institutions and factions, and make midgame builds feel materially stronger and more differentiated.

### Release 3 — Stage IV
Purpose: convert the run into continental-force play with dense consequence, stronger logistics, stronger party relevance, and late-game build-defining identity.

### Release 4 — Stage V
Purpose: complete the endgame with true final-pressure logic, permadeath, ending families, and full Hall of Legends payoff.

### Cross-release dependency rule

A release is not “done” because its labels exist. It is done only when:
- the required systems behave correctly,
- required content exists in viable breadth,
- class fantasy is legible in live play,
- route structure is readable,
- testing passes,
- non-goals remain deferred rather than half-built.

---

# 7. Release 1 Spec: Stage I + Stage II

## A. Release purpose

Release 1 must establish Ledger of Ash as a compelling game on its own.

By the end of Release 1, a player should be able to start a new character, feel immediately rooted, survive a distinct local opening, widen into adjacent-regional play, recruit early party members, use settlement services, confront canon-rooted hazards and creatures, experience chronology pressure, survive death through rescue continuation, and finish a run segment that already feels personal and replayable.

This is the make-or-break release. If Release 1 does not feel premium and differentiated, later releases do not matter.

## B. Systems in scope

Release 1 must build or complete:
- world-rooted character creation
- Stage I route structure
- Stage II adjacency and widening structure
- locality-specific openings and locality projection
- early chronology and world motion surfaces
- central narrative panel foundation
- confrontation foundation
- creature and hazard foundation
- settlement POI loop foundation
- equipment and itemization foundation for early tiers
- party recruitment and persistence foundation
- camp interaction foundation
- journal, notices, map, sheet, and legends foundations
- rescue-based death continuation for Stages I and II
- early renown and level progression

## C. Dependencies

Release 1 depends on:
- V28_8 package inspection and source-order verification
- a reconciled locality authority list
- reconciled starting-settlement rules
- reconciled lineage-per-locality rules
- reconciled Stage I and Stage II legal/travel constraints
- active runtime source-of-truth agreement

### Release 1 source-of-truth rule

For Release 1, treat the active runtime as the code starting point, but do not trust its content breadth. The current repo provides shell systems, not full authored completeness.

## D. Content scope

Release 1 must contain at minimum:
- a finalized starting-settlement matrix
- valid lineage options per settlement
- valid age logic and presentation logic
- 31 archetypes and 93 backgrounds preserved
- a unique, authored Stage I opening for every background
- a distinct first local contradiction and first objective for every background
- a Stage II widening path for every background using shared modules where appropriate
- settlement content for every active Stage I/II locality
- enough named NPC presence to make starting places feel inhabited
- enough creature and hazard coverage to make every active locality feel regionally distinct
- early route pressure per background that does not collapse into one shared generic investigation feel after one or two turns

### Release 1 audited gap to solve

Current runtime already preserves 31 archetypes and 93 backgrounds, but backgrounds are generated through a repeated three-background template per archetype and route signatures are algorithmically assigned. Release 1 must convert this from a useful scaffold into a genuinely authored early-game matrix.

## E. Class fantasy requirements

### Classic combat by end of Release 1
A combat player must clearly feel:
- front-line identity
- weapon distinction
- shield or guard value where applicable
- posture and protection pressure
- physical forcing options
- direct suppression of creatures and threats
- usefulness in escort, choke-point, and body-risk scenarios

Minimum Release 1 implementation standard:
- at least three materially different martial verbs beyond generic attack
- gear choices that affect tactics, not only stats
- at least one protection-oriented solution path in Stage I and one in Stage II
- at least one direct-force route option that is not a disguised skill check clone

### Magic and spellcasting by end of Release 1
A magic player must clearly feel:
- magical problem-reading
- ritual or ward logic
- resource-aware magical action identity
- difference between magical solving and martial solving
- danger, procedure, or doctrinal texture

Minimum Release 1 implementation standard:
- at least three materially different magical verbs beyond generic lore checks
- readable ward, focus, or reagent identity in UI and settlement services
- at least one ritual solution path in Stage I and one in Stage II
- locality scenes that react differently to magical reading than to force or stealth

### Stealth and precision by end of Release 1
A stealth player must clearly feel:
- concealment and discovery pressure
- timing and angle advantages
- scouting value
- quiet entry or bypass identity
- difference between stealth solving and direct-force solving

Minimum Release 1 implementation standard:
- at least three materially different stealth verbs beyond generic stealth checks
- readable concealment/tool/escape state
- at least one infiltration or surveillance solution path in Stage I and one in Stage II
- at least one silent-or-low-profile resolution path for a pressure situation

## F. Route and world requirements

Release 1 route structure must provide:
- unique Stage I local origin per background
- visible distinction between locality-rooted starts
- widening into adjacent settlements or adjacent polity pressure in Stage II
- route memory that the player can see and understand
- visible route risk and route style in the map/world layer
- readable route pressure, not only travel labels

Release 1 world motion must provide:
- visible day and time movement
- at least one pressure clock the player can feel in outcomes
- notices that change with time and pressure
- changed route conditions or growing opposition when the player delays
- visible “you arrived late” consequences in at least some cases

## G. Party requirements

Release 1 party depth is foundational, not final.

It must include:
- world-located recruit candidates
- refusal or trust-building before recruitment in at least some cases
- persistent companion records
- injured/unavailable companion states
- companion skill contribution to gameplay
- at least one camp interaction that deepens trust or consequences
- recruitment not tied to player-specific companion scripts

Release 1 party system is complete enough only if a player can finish Stage I and Stage II while feeling that recruiting someone meaningfully changes risk, capability, and future scenes.

## H. UI/UX requirements

Release 1 UI must clearly communicate:
- where the player is
- what time it is
- current stage and current objective
- player identity and build
- current threat/readiness state
- the scene as lived reality
- what changed last turn
- what the current choices are
- what side systems are available

Release 1 must preserve these interface layers:
- Story
- World
- Identity
- Party
- Chronicle

### Release 1 required screens/panels
- central narrative panel
- result/outcome panel
- live choices
- map/world panel
- services panel
- sheet/identity panel
- journal panel
- notices panel
- camp panel
- legends panel

### Release 1 central narrative panel standard
The panel must repaint the current lived scene, not merely repeat a result string.

It must update after:
- choice resolution
- locality changes
- pressure changes
- service use
- recruitment
- rescue aftermath
- meaningful time shifts

## I. Testing requirements

Mandatory Release 1 tests:
- character creation validation for every active starting locality
- archetype/background pairing validity across all 93 backgrounds
- Stage I start test for every archetype group
- Stage II transition test for every archetype group
- locality differentiation test across all active Release 1 localities
- settlement services test for every active locality
- equipment purchase and equip persistence test
- map and route visibility test
- Stage I and II creature/hazard encounter tests
- confrontation verb coverage test by archetype group
- rescue flow test in Stage I and Stage II
- companion recruit / trust / injury / availability tests
- mobile portrait layout checks
- desktop readability checks
- journal and notices persistence checks
- Hall of Legends partial memorial integrity check

## J. Definition of done

Release 1 is done only when all of the following are true:
- every background has a distinct authored Stage I opening and first problem
- Stage II is a real widening phase, not just renamed local play
- localities feel materially different in play
- each major archetype group has clear, satisfying early-game identity
- settlement visits are worth taking because they solve real needs
- death continuation works without resetting time
- early companions matter and persist
- the narrative panel visibly reflects player choices and changed conditions
- the game can sustain multiple early runs without obvious sameness
- the UI remains readable on desktop and mobile

## K. Blockers and non-goals

### Blockers
- unresolved V28_8 settlement/start legality
- unresolved lineage availability
- unresolved canon route access constraints
- unresolved NPC placement conflicts

### Non-goals
Do not build in Release 1:
- full national-scale faction webs
- final late-game itemization
- full continental travel systems
- endgame-only Hall richness
- final boss/endgame tuning
- MMO sync architecture

---

# 8. Release 2 Spec: Stage III

## A. Release purpose

Release 2 turns Ledger of Ash from a strong local-regional game into a credible national-scale campaign RPG.

The player should now feel that they are no longer only managing one locality cluster. Their choices should begin shifting institutions, route networks, witness chains, ritual order, industrial flow, or civic pressure on a broader scale.

## B. Systems in scope

Release 2 must build or complete:
- Stage III route architecture
- national-scale faction and institution interplay
- expanded chronology pressure
- broader travel and access logic
- Stage III party strategy expansion
- Stage III class-fantasy escalation
- deeper notices and chronicle visibility
- broader Stage III hazard and creature integration
- stronger renown meaning
- Stage III rescue continuation rules

## C. Dependencies

Release 2 depends on complete Release 1 acceptance, plus:
- stable adjacency and route memory systems
- stable journal and notice infrastructure
- stable confrontation baseline
- stable companion persistence
- stable settlement service framework

## D. Content scope

Release 2 must contain:
- Stage III route modules for every route family
- institution-specific pressure content for every active Stage III family
- broader travel logic beyond simple adjacency
- stage-appropriate hazards and creatures
- more than one form of national-scale pressure per route family
- authored objective webs per Stage III family sufficient to avoid generic repetition

## E. Class fantasy requirements

### Classic combat by end of Release 2
Must now feel like:
- battlefield command starting to emerge
- line holding, interception, escort defense, and tactical pressure mattering at wider scale
- stronger armor and weapon distinction
- direct confrontation affecting institutions and route control

### Magic and spellcasting by end of Release 2
Must now feel like:
- warding, ritual intervention, doctrinal tension, and arcane analysis mattering at wider scale
- magical options opening unique investigative and containment solutions
- real midgame magical leverage without trivializing danger

### Stealth and precision by end of Release 2
Must now feel like:
- surveillance, infiltration, extraction, and information theft affecting larger systems
- alternate paths through secrecy and timing remaining viable in a less forgiving world
- exposure and alertness pressure scaling upward meaningfully

## F. Route and world requirements

Release 2 route structure must deliver:
- national-scale route escalation
- visible faction/institution entanglement
- clearer rival and opposition advancement
- route decay or closure under delay
- stronger consequence from travel timing and missed windows

## G. Party requirements

Release 2 must deepen party play into:
- stronger role synergy
- more explicit support functions
- more consequence for injured or absent companions
- more trust consequences
- more route planning value from companions

## H. UI/UX requirements

Release 2 UI must add:
- clearer chronology pressure visibility
- stronger world/notices/chronicle relationship
- better route-state readability
- stronger faction/institution signal surfaces
- stronger party state visibility

## I. Testing requirements

Mandatory Release 2 tests:
- Stage III entry validation for all route families
- Stage III objective-web branch coverage
- institution/faction pressure surfacing tests
- travel access and delay consequence tests
- Stage III rescue continuation tests
- midgame party synergy tests
- Stage III creature/hazard differentiation tests
- midgame class-fantasy validation tests

## J. Definition of done

Release 2 is done only when:
- Stage III feels materially broader than Stage II
- the world now feels national in consequence, not just larger in text
- party strategy deepens in a noticeable way
- midgame builds feel stronger and more differentiated, not just numerically higher
- chronology pressure is visible and consequential
- route families do not collapse into one generic verb loop

## K. Blockers and non-goals

### Blockers
- unresolved inter-polity route canon
- unresolved institution access rules
- unresolved broader named-NPC placement conflicts

### Non-goals
Do not build in Release 2:
- full Stage IV continental logistics
- final permadeath/endgame family payoff
- final Hall of Legends memorial richness
- MMO sync features

---

# 9. Release 3 Spec: Stage IV

## A. Release purpose

Release 3 must make the player feel like a continental-force actor whose name, methods, and allies now change what large powers dare, hide, concede, or weaponize.

This is where the run must become denser, slower, more consequential, and more burdensome.

## B. Systems in scope

Release 3 must build or complete:
- Stage IV route architecture
- continental-pressure logic
- broad logistics and public consequence systems
- late-game build-defining gear and service support
- advanced party consequence
- Stage IV chronology intensity
- stronger legendary-memory preconditions
- pre-endgame world response

## C. Dependencies

Release 3 depends on complete Release 2 acceptance, plus:
- stable Stage III family progression
- stable renown response logic
- stable broader travel logic
- stable party consequence tracking

## D. Content scope

Release 3 must contain:
- Stage IV route content for every route family
- broad polity-facing pressure content
- late-game creatures and hazards worthy of Stage IV scope
- late-game settlement or service support where canon permits
- stronger legendary-level confrontations that are still not final endgame

## E. Class fantasy requirements

### Classic combat by end of Release 3
Must now feel like:
- elite battlefield presence
- command under strain
- endurance against high-pressure threats
- tactical dominance through interception, control, and protection

### Magic and spellcasting by end of Release 3
Must now feel like:
- flexible high-consequence magical solving
- dangerous but reliable late-game rituals and wards
- bigger world-shaping options within canon limits

### Stealth and precision by end of Release 3
Must now feel like:
- elite infiltration and sabotage
- deniable action against powerful systems
- high-risk covert options with meaningful consequences if exposed

## F. Route and world requirements

Release 3 route structure must deliver:
- wide geography pressure
- polity-spanning consequence
- altered public behavior and access under rising legend pressure
- more visible world response to the player’s history

## G. Party requirements

Release 3 party must now provide:
- stronger tactical relevance in confrontation
- stronger emotional and strategic consequence
- stronger leave/break/injury consequences
- more ending-shaping relevance

## H. UI/UX requirements

Release 3 UI must add:
- clearer legend-scale pressure visibility
- improved route-history and chronicle surfaces
- clearer advanced readiness signals for each class cluster
- stronger pre-endgame state communication

## I. Testing requirements

Mandatory Release 3 tests:
- Stage IV entry validation for all route families
- late-game equipment and service tests
- advanced confrontation tests by build cluster
- companion consequence and departure tests
- polity-pressure visibility tests
- Stage IV chronology escalation tests
- pre-endgame memory and chronicle tests

## J. Definition of done

Release 3 is done only when:
- Stage IV feels slower, broader, denser, and harder than Stage III
- late-game class identity is build-defining, not merely improved
- the player’s history is visibly shaping how the world presents itself
- companions now matter to ending trajectories, not only to rolls
- the run feels like it is approaching something final

## K. Blockers and non-goals

### Blockers
- unresolved continental route canon
- unresolved late-game polity response logic
- unresolved Stage IV named-NPC/faction authority gaps

### Non-goals
Do not build in Release 3:
- final permadeath resolution flow
- final boss/end-hazard families as completed endgame
- final Hall of Legends memorial pass
- MMO features

---

# 10. Release 4 Spec: Stage V

## A. Release purpose

Release 4 completes the run.

By the end of Release 4, Ledger of Ash must support a true endgame where the player reaches final-pressure confrontations, commits to an ending family, can die permanently, and leaves behind a memorialized run whose meaning is specific and historically legible.

## B. Systems in scope

Release 4 must build or complete:
- Stage V route logic
- full endgame confrontation structure
- final boss/final hazard families
- true permadeath handling
- ending-family differentiation
- complete Hall of Legends memorialization
- final difficulty tuning
- final consequence sealing

## C. Dependencies

Release 4 depends on complete Release 3 acceptance, plus:
- stable Stage IV progression
- stable late-game itemization and confrontation
- stable chronicle/history capture
- stable rescue/permadeath boundary logic

## D. Content scope

Release 4 must contain:
- Stage V content for every route family
- final confrontation logic beyond shell status
- distinct ending families, not one generic ending wrapper
- meaningful final world significance capture
- Hall entries rich enough to explain why the run mattered

## E. Class fantasy requirements

### Classic combat by end of Release 4
Must culminate in:
- legendary physical dominance
- protection or force choices that alter the shape of the ending
- direct confrontation that feels earned and costly

### Magic and spellcasting by end of Release 4
Must culminate in:
- world-shaping magical consequence within canon limits
- final rites, wards, containment, or doctrinal reversals that matter to endings
- magical success feeling fundamentally different from martial or stealth resolution

### Stealth and precision by end of Release 4
Must culminate in:
- final covert action, precision disablement, theft, infiltration, or unseen resolution paths that can truly change endings
- failure states that feel appropriately dangerous and final

## F. Route and world requirements

Release 4 route structure must provide:
- true endgame widening
- no fake “same systems but bigger numbers” loop
- clear final-pressure logic
- meaningful world significance attached to final outcomes

## G. Party requirements

Release 4 party system must support:
- final loyalty consequences
- endgame support without stealing player primacy
- companion memory in Hall of Legends
- end-state relevance for companions who joined, fell away, or were lost

## H. UI/UX requirements

Release 4 UI must communicate:
- finality
- irreversible risk
- endgame objective clarity
- final confrontation readiness
- memorial significance after run end

## I. Testing requirements

Mandatory Release 4 tests:
- Stage V entry validation
- final boss/final hazard family coverage tests
- true permadeath tests
- non-permadeath boundary tests for earlier stages
- ending-family differentiation tests
- Hall of Legends summary integrity tests
- full-run memorialization tests
- final difficulty fairness pass

## J. Definition of done

Release 4 is done only when:
- Stage V is a real endgame
- permadeath works correctly and only in Stage V
- endings differ materially by route family and run history
- Hall of Legends preserves the run as a remembered life rather than a scoreboard row
- final encounters feel earned, difficult, and class-authentic

## K. Blockers and non-goals

### Blockers
- unresolved endgame canon contradictions
- unresolved final route-family authority gaps
- unresolved final Hall schema needs

### Non-goals
Do not build in Release 4:
- multiplayer endgame
- live world sync
- guilds, chat, raids, markets, or co-op

## 11. Cross-Release System Rules

### Character creation rule
Character creation is complete only when the player chooses:
- settlement
- valid lineage for that settlement
- age
- presentation
- archetype
- background
- name

And the game generates:
- a life overview
- social grounding
- immediate local tension
- class-fantasy signaling

### Archetype and background rule
Archetypes must remain the primary ongoing play identity.
Backgrounds shape origin, pressure, and route signature, but must not overshadow the archetype as the main lens of play.

### Route-signature rule
Each background must preserve:
- Stage I local plot
- widening vector
- family identity
- rival pressure type
- key faction framing
- memory tags
- failure forms
- ending families

### Stage-growth rule
Later stages must feel:
- broader
- slower
- denser
- harder
- more institutionally consequential

They must not feel like a numeric extension of the early game.

### Death rule
Stages I to IV use rescue continuation and persistent consequence.
Stage V alone uses true permadeath.

### Hall rule
Hall of Legends must preserve the remembered life of the player character, not just numeric outcome data.

## 12. Class Fantasy Standards

### Classic combat standard
Combat-heavy archetypes must feel:
- weighty
- positional
- physically consequential
- durable or forceful in distinct ways
- capable of protecting others and controlling space

### Magic and spellcasting standard
Magic-heavy archetypes must feel:
- dangerous
- flexible
- procedural or uncanny
- distinct from martial solving
- capable of warding, ritual intervention, and unusual problem-solving

### Stealth and precision standard
Stealth-heavy archetypes must feel:
- quiet
- tense
- observant
- timing-sensitive
- distinct from open force or overt ritual

### Implementation rule
Do not equalize support so evenly that all archetypes end up solving problems through the same flattened model.

## 13. Party and Player-Primacy Rules

1. Companions are world inhabitants first.
2. They are encountered where they naturally belong.
3. Recruitment is governed by in-world access and trust, not player-tailored destiny.
4. They influence tactics, survival, and endings.
5. They do not replace the player as protagonist.
6. Camp scenes deepen the player’s run rather than shifting narrative centrality away from them.

## 14. UI / UX Standards

The interface must preserve five layers:
- Story
- World
- Identity
- Party
- Chronicle

### Global readability requirements
- desktop must feel rich without clutter
- mobile portrait must remain usable
- long-session readability must be preserved
- choice buttons must be clear and tappable
- state changes must be legible immediately

### Central narrative panel standard
The central narrative panel is a flagship system.

It must:
- stay on the main screen
- sit above choices
- repaint the current lived scene after meaningful change
- incorporate locality, pressure, timing, social behavior, hazard presence, route state, and recent consequence
- preserve immediate player embodiment

It must not:
- dump lore
- repeat generic filler
- narrate unchosen internal feelings
- flatten localities into one voice

## 15. Testing Matrix

### Always-on tests across all releases
- syntax/build integrity
- save/load integrity
- journal integrity
- map and access integrity
- stage transition integrity
- confrontation integrity
- creature/hazard integrity
- camp and party integrity
- death/rescue/permadeath integrity
- Hall integrity
- mobile layout integrity
- desktop readability integrity

### Class validation tests
For each release, confirm:
- martial play visibly uses protection, threat, gear, endurance, and physical control
- spellcasting visibly uses magical resources, wards, rites, and magical problem-solving
- stealth visibly uses concealment, timing, infiltration, precision, and escape

### Focality validation tests
For each release, confirm:
- the player feels present in their own moment-to-moment experience
- companions do not displace player primacy
- archetype identity remains legible throughout play

## 16. Definition of Done by Release

### Release 1 done
- early game is compelling and replayable
- all 93 backgrounds have authored Stage I openings
- Stage II adjacency is real and readable
- localities feel distinct
- early class fantasy is strong
- rescue continuation works
- settlement loops are meaningful

### Release 2 done
- Stage III feels national in consequence
- midgame class identity deepens materially
- world pressure becomes more visible and more binding
- party strategy matters more than in Release 1

### Release 3 done
- Stage IV feels continental and heavy
- late-game builds gain defining identity
- companion consequence becomes end-shaping
- pre-endgame gravity is tangible

### Release 4 done
- Stage V is a true endgame
- permadeath works correctly
- endings differ materially
- Hall of Legends preserves meaningful run history

## 17. Explicit Out-of-Scope MMO Features

The following are explicitly out of scope for this staged build path:
- live multiplayer
- shared runtime altered by real players
- guilds
- chat
- co-op combat
- raids
- player-driven markets
- real-time world sync

The architecture may later support those systems, but they are not part of the completion standard for any release in this file.

## 18. Open Canon Blockers or Unknowns

These issues must be treated as active blockers until resolved against V28_8:
- final starting-settlement legality and availability matrix
- final lineage-per-locality matrix
- final route access and travel restrictions by stage
- final named-NPC placements beyond current runtime scaffolding
- final institution and law responses in widened stages
- final geography breadth for Stage III to Stage V
- final hazard and bestiary breadth beyond current active locality set

### Current implementation caution

The current runtime is a strong prototype shell, but it is still not equivalent to the finished single-player target.

The biggest current implementation risks are:
- over-reliance on procedural background and route generation where authored variance is required
- too few active keyed localities relative to intended world breadth
- stage-family scaffolding that still needs authored depth in Stage III to Stage V
- party functionality that is useful but still shallow
- confrontation verbs that are promising but not yet fully class-rich
- historical docs that no longer match the live runtime or canon version expectations

Future coders should use the current runtime as a starting asset base, not as proof of completion.
