BUILD PATHWAY — LEDGER OF ASH  
Current-State Build: `https://github.com/SoSoBurner/ledger-of-ash`  
Development Path: staged release pathway from current build to full single-player completion, post-launch stabilization, canon-repository migration, and eventual MMORPG expansion

---

## 1. ROLE AND MANDATE

You are acting as:
- senior game director
- systems designer
- narrative director
- world-architecture lead
- gameplay debugger
- content architect
- UI/UX director
- implementation auditor
- direct repository execution lead

Your job is to inspect the current Ledger of Ash build, compare it against the release pathway below, debug what is broken or misaligned, create or complete any missing content, systems, logic, structure, and presentation, and then directly implement, test, and deploy those changes to the GitHub repository in the correct release order.

You are not being asked to write a separate design document instead of building. You are being asked to work in the repo through the release pathway until each release is brought as close as possible to completion against its scope, with enough specificity, implementation depth, and polish that every release reads like an executable production roadmap rather than a broad concept brief.

This means you must behave like the lead owner of the build, not like an outside commentator. You must continuously translate high-level goals into real repository work: actual code changes, actual content additions, actual system integrations, actual tests, actual UI refinements, actual runtime flow corrections, actual deployment-ready updates, and actual release completion criteria.

---

## 2. CURRENT-STATE BUILD ANCHOR

Treat this build as the current live implementation:
- `https://github.com/SoSoBurner/ledger-of-ash`

Treat this repository as the actual current-state build, not a hypothetical prototype, not a clean slate, and not a purely conceptual foundation. It is a real project with live constraints, active files, partially connected systems, likely stale assumptions, probable integration debt, and real architecture you must inspect before deciding what to preserve, refactor, replace, expand, or debug.

You must inspect the real repo structure, real files, real active runtime, real build process, and real technical debt. Do not assume a greenfield architecture if the repo already contains working or partially working systems. Do not propose theoretical systems while ignoring what already exists in code. Do not mentally replace the repository with a cleaner imaginary version.

At minimum, inspect and work from:
- `README.md`
- `build.py`
- `index.html`
- `js/data.js`
- `js/background-locality-map.js`
- `js/stage2-backgrounds.js`
- `js/narrative.js`
- `js/party.js`
- `js/combat.js`
- `js/engine.js`
- relevant assets, docs, `dist/`, deployment files, and any active support files

Respect active versus archived code. If the repo marks files as historical, legacy, or archived, do not accidentally build from them unless you are intentionally porting useful logic into the active runtime. Distinguish:
- actively executed runtime files
- generation or bundling files
- data sources
- inactive or historical files
- reference or archival experiments
- deployment outputs
- canonical support files
- placeholder structures that appear complete but are not actually used in runtime

Known current-state gaps must be verified in code, not merely repeated:
- party recruitment and camp flows exist but are not fully connected to the engine
- companion support exists but is not fully integrated into the main runtime
- combat abilities and a multi-round combat system exist, but combat flow is not fully integrated into encounter choices
- the game is a static browser game with a bundled JS architecture, so release improvements must work within or carefully evolve that structure

These are starting points, not the full audit. You must verify:
- whether these gaps are still accurate
- exactly where integration breaks occur
- whether the current data model already anticipates future features
- whether narrative, state, party, and combat layers are duplicating logic
- whether route logic and stage logic are centralized or scattered
- whether the current UI can scale to later-stage complexity without redesign
- whether the current build process can support the content volume required for all releases

---

## 3. NON-NEGOTIABLE RULES

- Do NOT include MMO features before Release 7.
- The game may remain MMO-shaped in architecture and world logic, but Releases 1 through 6 must target the single-player version only.
- Do NOT redesign this into a different game.
- Do NOT flatten it into generic fantasy.
- Do NOT reduce this to brainstorming.
- Do NOT write a vague pitch.
- Do NOT stop at critique alone.
- Do NOT stop after analysis if implementation can continue.
- Do NOT produce a separate design document as the main deliverable.
- Do NOT only write repo patch notes.
- Do NOT ask unnecessary questions.
- Do NOT treat local customs, culture, economy, law, or infrastructure as separate showcase pillars unless a build requirement canonically depends on them.
- Do NOT add free-floating setting flavor that is not grounded in repository authority.
- Do NOT leave core archetype playstyles underdeveloped, especially the three major player-facing archetype groups:
  - classic combat
  - magic and spellcasting
  - stealth and precision
- Do NOT let the game drift into feeling like the party or the setting is the protagonist instead of the player character.
- Do NOT build party NPCs as player-character-specific companion tracks tied to one archetype or background.
- Do NOT let release ordering blur. Systems required for Release 1 must be implemented and stabilized as Release 1 systems, not deferred into later releases because they are difficult.
- Do NOT treat “partially wired,” “stubbed,” “represented in data,” “mentioned in README,” or “present in isolated files” as equivalent to “implemented in the actual player experience.”
- Do NOT accept superficial feature presence as completion. A system is complete only if it is connected, surfaced, testable, playable, comprehensible, and materially valuable in runtime.

You must:
- inspect the current repository directly
- compare the current implementation against the release scope below
- identify misalignment, bugs, dead ends, missing systems, missing content, weak UI, shallow route behavior, incomplete progression, and under-supported class fantasy
- directly implement missing or corrected code and content
- directly improve the UI for beauty, readability, immersion, and clarity
- directly create missing narrative, route, party, bestiary, hazard, chronology, progression, rescue, Hall of Legends, and settlement content where absent
- directly strengthen missing combat, spellcasting, stealth, utility, equipment, and encounter affordances needed for strong DnD-adjacent character immersion and engaging gameplay
- ensure play consistently feels player-embodied, first-person in immediacy, and centered on the player character’s lived agency
- ensure the chosen archetype remains focal to how the story is experienced
- ensure party NPCs remain world-rooted people equally available to any archetype or background if found naturally in the world and recruited through in-world conditions
- integrate local customs, culture, economy, law, and infrastructure only where the build canonically requires them to shape play, readability, differentiation, legality, travel, access, pressure, or services
- run tests continuously
- manually play through critical flows
- fix failures as they appear
- commit in coherent, reviewable increments
- push completed work to GitHub
- continue until each release is as close as possible to completion against this pathway

If blocked by ambiguity:
- ask one concise clarifying question
- explain why the answer materially affects correctness
- continue immediately once resolved

If something can be completed reasonably without asking, complete it.

---

## 4. CANON / WORLD-REPOSITORY EXECUTION RULE

Treat the uploaded world repository as the sole canon authority for world continuity, locality identity, institutions, law, economy, infrastructure, routes, hazards, NPC grounding, chronology, and social behavior.

Use this retrieval and implementation order:
1. classify the build problem
2. inspect `README.md` plus package manifest, source authority map, and inventory
3. inspect canon governance and source precedence
4. inspect runtime engine / live-state layers
5. inspect locality engine records for locality packets, authority packets, behavior packets, district packets, site packets, seasonal packets, and text-RPG packets
6. inspect reconciliation and conservative inference only as bounded support
7. inspect canon baseline for polity, settlement, law, economy, route, ecology, religion, magic, infrastructure, and chronology
8. inspect provenance, supersession, lineage, and release deltas only when needed to resolve conflicts
9. use reference views only as convenience, never above source layers

Source precedence:
- corrective or superseding records over older baseline
- direct local packet or named-subject record over broad summary
- district, settlement, institution, route, polity, or locality packet over generic regional synthesis
- structured canon over stylistic assumption
- runtime current state over archival summary when runtime exists

Truth handling:
- preserve repository truth distinctions
- do not present lower-trust material as equal to higher-trust canon
- do not invent unsupported canon
- do not flatten uncertainty
- do not genericize institutions, law, faith, or social hierarchy
- do not use external fantasy defaults to fill gaps

If canon-version differences matter between repository generations, resolve them through repository evidence rather than assumption.

Implementation boundary for customs, culture, economy, law, and infrastructure:
- use them where the system canonically needs them
- do not turn them into separate lore expositions
- surface them only when they materially affect locality identity, confrontation legality, route access, settlement services, chronology pressure, faction behavior, public notices, starting options, hazards, or social response
- prefer local packet evidence first, then supporting baseline layers as needed

Canon integration must be operational rather than decorative. If a law matters, it must affect access, risk, enforcement, punishment, or behavior. If infrastructure matters, it must affect routes, services, logistics, blockages, or travel time. If economy matters, it must affect equipment, scarcity, labor, pricing, contraband, or supply. If culture matters, it must affect how scenes read, how NPCs behave, how authority is displayed, how rituals are conducted, how hospitality works, or how outsiders are perceived. If it does not change play, it should not be over-surfaced.

---

## 5. OVERALL DEVELOPMENT PATH

The game is developed in seven releases:

- Release 1: all core functions plus Stages I and II
- Release 2: Stage III
- Release 3: Stage IV
- Release 4: Stage V
- Release 5: upgrade, debug, and patch pass
- Release 6: new canon repository update and debug
- Release 7: MMORPG expansion

Releases 1 through 4 are the core single-player build pathway.  
Release 5 is stabilization and quality elevation.  
Release 6 is canon migration, reconciliation, and debug.  
Release 7 is the first true MMO expansion phase and must only begin after the single-player pathway is complete and stable.

This pathway is cumulative. Each release inherits the completed systems of the prior release and extends them. Later releases must not quietly compensate for earlier missing foundations. If a system is foundational, it belongs in the earliest release where it is needed to make the game function properly.

The release pathway must be treated as:
- a sequence of implementation priorities
- a sequence of system maturity milestones
- a sequence of content unlock scales
- a sequence of progression-scope expansions
- a sequence of testing burdens
- a sequence of performance and UI stress increases
- a sequence of narrative and chronology complexity escalations

---

## 6. RELEASE 1 — CORE FUNCTIONS + STAGES I & II

Release 1 is the first real playable premium single-player release.

Release 1 must deliver:
- all foundational game functions
- complete Stage I
- complete Stage II
- a stable and immersive player loop from character creation through early and mid-early route widening
- a fully playable build that already feels like Ledger of Ash rather than a prototype

Release 1 is the most important structural release. It establishes the game’s identity, architecture, player embodiment, archetype feel, route logic, locality identity, and engine integrations. If Release 1 is shallow, disconnected, repetitive, or mechanically generic, the later releases will only magnify those failures.

Release 1 must include:

### A. CORE FOUNDATIONAL SYSTEMS

Release 1 must fully establish the base systems that every later release depends on:

- world-rooted character creation
- archetype selection
- background selection
- starting locality logic
- lineage legality and locality availability
- life overview generation
- route initialization
- chronology initialization
- world-state initialization
- player sheet / identity surfaces
- basic journal, notices, codex, and chronicle surfaces
- location, time, and state header
- central narrative panel
- live choice presentation
- stage progression logic for Stage I and Stage II
- route widening logic from local to regional stakes
- encounter generation and confrontation flow
- settlement interactions
- basic itemization and service access
- party recruitment integration
- camp scene integration
- companion persistence
- injuries and recovery
- bestiary and hazard visibility
- rescue-based death handling for Releases 1 and 2 applicable stages
- renown and difficulty baseline
- responsive web and mobile layout

Each of these systems must be complete enough to matter in live play. Specifically:

Character creation must not merely collect values. It must establish identity, context, and immediate route relevance. The player should understand:
- where they are from
- why that origin matters
- what their archetype means in action
- what kind of early pressures they are likely to face
- why this run will not feel identical to another run

Route initialization must not merely assign a route label. It must create:
- a locality-rooted starting condition
- a background-specific Stage I plot foundation
- relevant tensions
- relevant NPC pools
- likely first conflicts
- likely first opportunities
- immediate hooks that make the first 10 to 30 minutes of play feel authored and intentional

Chronology initialization must establish:
- time state
- current local pressure
- active notices or latent updates
- route windows
- rival advancement baselines where appropriate
- early atmosphere that signals the world is already moving

The journal, codex, notices, and chronicle surfaces must not merely exist as blank tabs. They must already provide real utility:
- Journal should track player-facing active threads, recent developments, and actionable context
- Notices should surface world changes, warnings, legal shifts, danger announcements, civic pressure, travel updates, or faction signals
- Codex should support clarity on terms, creatures, institutions, places, or systems the player has encountered
- Chronicle should begin preserving the run’s unfolding significance

The central narrative panel must already function as the game’s heartbeat in Release 1, not wait until a later release to become dynamic.

Settlement interactions must already feel meaningful in Release 1. Settlements must already support:
- recovery
- equipment improvement
- supply acquisition
- information gathering
- recruitment opportunity
- route advancement
- hidden or gated content beginnings

Party recruitment integration in Release 1 must already work end-to-end:
- encounter NPC
- satisfy world conditions
- recruit or be refused
- persist in state
- appear in relevant surfaces
- contribute to scenes, travel, or confrontation where appropriate

Camp scenes in Release 1 must already matter. They should:
- surface trust
- surface tension
- surface injuries, mood, or readiness
- reinforce the player character’s role as focal center
- create a sense of journey and accumulated consequence

### B. STAGE I — GRASSROOTS

Stage I must be complete and fully differentiated.

Stage I must support:
- unique grassroots origins for all 93 backgrounds
- strong locality grounding
- immediate player-character identity
- low-scale but meaningful stakes
- local services, customs, route blockages, faction tensions, hazards, and social dynamics
- real differences between settlements and local starts
- route-specific Stage I local plots
- class-authentic early gameplay for classic combat, magic and spellcasting, and stealth and precision
- introductory but real party recruitment
- introductory but meaningful bestiary and hazards
- rescue-based continuation on death
- strong player-focal narrative texture

Stage I must feel lived-in, grounded, and personal.

Stage I is where the game proves that backgrounds are not cosmetic, that localities are not interchangeable, and that the player character’s life begins somewhere real. It must create the sense that the player starts as a person embedded in a place, not as a blank adventurer dropped into a generic quest machine.

Stage I locality design must differentiate:
- how authority looks and behaves
- how labor, trade, or daily rhythm appears
- how danger is signaled
- how public space feels
- how strangers are treated
- how rumors circulate
- how rituals or shrines function visibly if applicable
- what recovery looks like
- what equipment access feels like
- what counts as suspicious, dangerous, honorable, or shameful

Stage I bestiary and hazards must not be filler. They must introduce:
- locality-specific threat identity
- travel caution
- tactical variance
- atmospheric fear
- early archetype differentiation
- early lessons about what this world punishes and rewards

Stage I objectives must not feel bureaucratic or over-abstract. They must feel like:
- immediate problems
- visible pressures
- concrete needs
- local tensions that a real person in this setting would recognize and act upon

### C. STAGE II — REGIONAL NAME

Stage II must be complete and clearly broader than Stage I.

Stage II must support:
- widening route logic
- regional movement
- stronger faction and institution involvement
- improved party relevance
- deeper encounter structure
- stronger bestiary and hazard pressure
- meaningful equipment and progression expansion
- early renown visibility
- more complex objective webs
- more visible world motion
- stronger route differentiation
- clear escalation from local problems to regional consequence

Stage II must feel like the player character is becoming known and increasingly entangled in larger systems without losing personal agency.

Stage II should introduce the feeling that:
- the player is beginning to matter outside their immediate locality
- more people know their name, deeds, failures, or affiliations
- factions are beginning to react with interest, caution, hostility, or recruitment pressure
- routes are becoming more interconnected
- missed opportunities now matter more
- travel carries larger stakes
- companions matter more because the world is getting heavier

### D. RELEASE 1 ARCHETYPE REQUIREMENTS

Release 1 must already make the three major archetype groups feel satisfying.

Classic Combat in Release 1 must support:
- front-line identity
- weapon and armor distinction
- shield identity
- protection and interception
- positional combat meaning
- durable survival feel
- local and regional martial problem-solving

In practice this means martial play in Release 1 should already feel different depending on whether the player leans:
- heavy and durable
- agile and pressuring
- disciplined and defensive
- brutal and high-impact
- ranged-martial and spacing-oriented
- duelist and timing-focused

Magic and Spellcasting in Release 1 must support:
- spell choice distinction
- early resource tension
- clear magical utility
- direct offense and defense
- ritual-adjacent or doctrine-adjacent identity where canon supports it
- magical interaction with hazards, clues, wards, and obstacles

In practice this means magical play must already feel like:
- a separate problem-solving language
- a separate risk profile
- a separate pacing model
- a separate interaction style with the world

Stealth and Precision in Release 1 must support:
- concealment
- scouting
- infiltration
- ambush
- lock, trap, sabotage, disguise, and bypass logic where canon supports it
- high value from timing, patience, and clean exits

In practice this means stealth play must already support:
- observing before acting
- route reading
- bypassing rather than brute forcing
- surgically choosing when to expose oneself
- benefiting from setup and preparation

### E. RELEASE 1 PARTY REQUIREMENTS

Party NPCs in Release 1 must:
- exist as world-rooted people
- be recruitable where naturally found
- not be archetype-locked or background-locked unless canonically justified by world conditions
- support refusal, persistence, and consequence
- deepen the player’s run without replacing the player as focal center

Recruitment logic must already account for:
- where an NPC naturally belongs
- why they would or would not travel
- what makes them trust or distrust the player
- what local conditions influence availability
- whether their recruitment creates narrative or tactical shifts
- whether their injury, fear, obligations, or loyalties affect persistence

### F. RELEASE 1 UI / UX REQUIREMENTS

Release 1 UI must already be:
- readable
- premium-feeling
- immersive
- mobile-usable
- desktop-rich without overload
- centered on the player’s lived moment
- capable of surfacing archetype state, threat, time, route pressure, and consequence clearly

Release 1 UI must not feel like placeholder scaffolding. It should already support long-session readability through:
- strong typography hierarchy
- clear separation between narrative, state, and choices
- smart spacing
- low clutter
- easy action scanning
- clear consequence visibility
- strong visual anchoring on the player’s present situation

### G. RELEASE 1 SUCCESS CONDITION

Release 1 succeeds only if the game already feels like a complete premium early-to-mid campaign experience, not a mechanical shell.

A failed Release 1 is one where:
- systems exist in isolated files but are not integrated
- class fantasy is shallow
- narrative voice is generic
- party is decorative
- combat is disconnected
- settlements are shallow
- chronology is invisible
- Stage I and Stage II feel like the same stage with different labels
- the player does not feel like the focal protagonist of a living run

---

## 7. RELEASE 2 — STAGE III

Release 2 expands the game into full Stage III.

Release 2 must deliver:
- complete Stage III
- proper transition from Stage II into Stage III
- national-scale route pressure
- deeper progression
- broader world involvement
- richer faction interplay
- stronger chronology consequences
- more advanced party expectations
- more complex confrontation and hazard design

Stage III must support:
- National Power identity
- larger travel footprint
- stronger institutional involvement
- escalating world recognition
- national-scale rival and faction pressure
- more complex branching and failure forms
- broader bestiary and hazard scale
- deeper equipment, specialization, and renown systems
- stronger route-family differentiation

Release 2 must create the feeling that the player is no longer merely rising within a region. They are now large enough to be noticed by institutions, rival actors, cross-regional interests, ideological blocs, or politically meaningful power structures.

Stage III must deepen:
- the cost of indecision
- the visibility of consequences
- the weight of travel commitments
- the seriousness of faction ties
- the strategic importance of party composition
- the distinction between route families
- the significance of renown

Release 2 archetype requirements:

Classic Combat must now grow into:
- battlefield command identity
- advanced protection roles
- stronger martial control
- stronger durability and line-breaking
- richer equipment specialization

This means martial play must now start to support:
- holding lines
- coordinating around allies
- broader multi-target combat decision-making
- more meaningful armor and shield identities
- stronger tradeoffs between endurance, aggression, and control

Magic and Spellcasting must now grow into:
- broader spell breadth
- more distinct schools, rites, or doctrine if canonically supported
- stronger area control
- deeper ritual handling
- more advanced magical counters, wards, and resource management

This means magical play must now support:
- more than direct damage
- scenario-specific utility
- tactical area shaping
- preparation and resource planning
- counterplay against magical threats
- greater differentiation between different magical identities

Stealth and Precision must now grow into:
- advanced infiltration
- intelligence gathering
- sabotage chains
- covert mobility
- stronger concealment and exposure systems
- route manipulation through precision action

This means stealth play must now support:
- layered infiltration
- information advantage
- chain reactions set up through covert action
- risk of exposure that changes downstream play
- route outcomes changed by what the player learns, steals, or disrupts

Release 2 success condition:
Stage III must feel like a real new layer of play rather than Stage II with larger numbers.

---

## 8. RELEASE 3 — STAGE IV

Release 3 expands the game into full Stage IV.

Release 3 must deliver:
- complete Stage IV
- proper Stage III to IV transition
- continental-scale route widening
- major escalation in narrative, logistical, factional, and hazard complexity
- genuine late-game broadening without flattening the player character

Stage IV must support:
- Continental Force identity
- continental travel logic
- extremely broad route pressure
- heavier chronology consequence
- major institution and polity interplay
- advanced hazard and bestiary escalation
- larger conflict structures
- deeper party relevance
- heavier strategic burden
- stronger route-ending differentiation

Stage IV is where the world must begin to feel truly large without dissolving into abstraction. The player should not merely “have bigger quests.” They should feel:
- broader travel burden
- broader consequence reach
- greater logistical strain
- denser institutions and competing powers
- stronger danger stacking
- slower, heavier decision-making
- broader narrative consequence

Release 3 archetype requirements:

Classic Combat must now grow into:
- elite battlefield presence
- legendary physical command
- advanced hold, break, pressure, and protection patterns
- stronger survival under overwhelming conditions

Magic and Spellcasting must now grow into:
- major ritual consequence
- large-scale magical intervention
- advanced magical problem-solving
- stronger reality-shaping feel within canon limits
- increased magical risk and consequence

Stealth and Precision must now grow into:
- continental intelligence play
- elite infiltration
- high-risk covert action
- operational sabotage
- deniable movement through heavily pressured spaces
- stronger exposure, pursuit, and counterintelligence dynamics

Release 3 success condition:
Stage IV must feel broad, heavy, and genuinely late-game rather than just extended midgame.

---

## 9. RELEASE 4 — STAGE V

Release 4 completes the single-player campaign with full Stage V and final-run meaning systems.

Release 4 must deliver:
- complete Stage V
- proper Stage IV to V transition
- International Legend endgame
- true permadeath
- complete Hall of Legends
- final route-end families
- world-significance logic
- meaningful completed-run memorialization
- late-game narrative, bestiary, hazard, faction, and chronology closure structures

Stage V must support:
- international scale
- endgame pressure
- hard but fair confrontation
- true finality
- no rescue rollback
- complete run-end consequence
- strong legendary memory
- end-state route differentiation
- emotional and historical closure

Stage V must not just be “the hardest stage.” It must feel like:
- culmination
- final exposure
- final judgment
- final cost
- final legacy
- final route consequence
- final archetype expression at full maturity

Release 4 archetype requirements:

Classic Combat must culminate in:
- legendary martial presence
- final-stage battlefield authority
- iconic physical identity
- truly earned endgame survivability and force projection

Magic and Spellcasting must culminate in:
- endgame spell and ritual identity
- major magical consequence
- strong but not game-breaking flexibility
- meaningful magical legacy

Stealth and Precision must culminate in:
- master infiltration and surgical force
- route-defining covert action
- precise endgame agency
- memorable signature operations and escapes or failures

Release 4 must also complete:
- Hall of Legends entries with route, wounds, rescues, allies, rivals, hazards, and ending forms
- Stage V permadeath integration
- final player-character memorial framing
- a full feeling that the player’s run mattered historically

Release 4 success condition:
The single-player game is complete from Stage I through Stage V and supports full-run legend formation.

---

## 10. RELEASE 5 — UPGRADE, DEBUG, AND PATCH

Release 5 is the full post-completion stabilization and quality elevation pass for the single-player game.

Release 5 must focus on:
- debug
- patch
- balance
- UX refinement
- readability
- performance
- stability
- progression smoothing
- exploit cleanup
- narrative repetition cleanup
- route clarity improvements
- mobile polish
- desktop polish
- class-fantasy sharpening
- party integration fixes
- combat integration fixes
- Hall of Legends polish
- settlement and itemization polish
- chronology consistency fixes

Release 5 must include:
- bug triage and elimination across all Stages I through V
- confrontation integration cleanup
- combat flow cleanup
- party and camp cleanup
- encounter pacing cleanup
- save and runtime continuity cleanup if applicable
- narrative panel repetition reduction
- archetype readability improvements
- itemization pass
- bestiary and hazard balance pass
- death, rescue, and permadeath validation
- Hall of Legends summary and presentation improvements
- stronger onboarding and clarity without flattening depth

Release 5 is not a minor post-launch patch cycle. It is a major maturity pass whose purpose is to turn “complete but rough” into “stable, elegant, premium, and resilient.”

Release 5 should aggressively identify:
- repetitive text patterns
- dead UI weight
- bloated choice lists
- unreadable long-session flows
- uneven stage pacing
- archetype imbalance
- broken recruitment edge cases
- stale chronology updates
- underwhelming settlement loops
- poor item identity
- dull hazards
- under-signaled state changes
- weak friction or weak payoff in later stages

Release 5 success condition:
The full single-player game becomes materially more stable, polished, legible, and premium.

---

## 11. RELEASE 6 — NEW CANON REPOSITORY UPDATE AND DEBUG

Release 6 is the canon migration and reconciliation release.

Release 6 must:
- ingest the new canon repository update
- reconcile affected world structures
- update content and systems where canon changed
- preserve player-facing coherence
- debug all resulting breakage
- validate that locality, route, faction, chronology, law, economy, infrastructure, bestiary, NPC, and institutional data remain correct after migration

Release 6 must include:
- canon diff audit
- source precedence review
- supersession review
- update of locality packets and world references
- update of route assumptions affected by canon changes
- update of settlement content affected by canon changes
- update of faction, law, economy, travel, bestiary, hazard, and chronology references affected by canon changes
- update of player-facing text where needed
- full regression testing after canon migration
- debug pass specifically for canon mismatch and stale references

Release 6 must not become an excuse for arbitrary redesign. It is a canon update release, not a genre shift.

Release 6 must explicitly identify:
- what canon changed
- what systems those changes touch
- whether any player-facing routes now contradict canon
- whether old location assumptions are invalid
- whether any NPC placements or recruitments must change
- whether any settlement services or legal assumptions must change
- whether any bestiary or hazard descriptions are stale
- whether any chronology triggers now point to outdated world facts

Release 6 success condition:
The full single-player game remains stable and coherent under the new canon repository with resolved inconsistencies and no major stale-canon drift.

---

## 12. RELEASE 7 — MMORPG

Release 7 is the first MMORPG expansion release.

Release 7 begins only after:
- Releases 1 through 6 are substantially complete
- the single-player version is stable
- the player-focal campaign loop is mature
- canon migration is complete and debugged

Release 7 may introduce:
- live multiplayer
- shared-world runtime logic
- other real players affecting runtime conditions
- guild systems
- player chat
- co-op partying
- shared confrontations
- raids
- player-driven markets
- persistent shared-world sync
- MMO social and economic systems
- expansion of architecture required for shared-state persistence

Release 7 must preserve the identity learned from single-player:
- player-character focality
- archetype identity
- strong locality grounding
- world-canon fidelity
- route pressure
- meaningful chronology
- immersive text-first storytelling
- high class-fantasy differentiation

Release 7 must not erase what made the single-player game compelling. It must expand it into multiplayer without collapsing into generic MMO structures.

Release 7 must therefore be treated as:
- architectural evolution
- persistence redesign where needed
- authority and sync redesign
- multiplayer-safe confrontation redesign
- social systems expansion
- economy and marketplace redesign where applicable
- shared chronology handling
- co-op and group-role handling
- shared-space readability and UI scaling
- server or sync-state thinking where architecture demands it

Release 7 must not retroactively make earlier release design sloppy. It must inherit a strong single-player foundation.

---

## 13. RELEASE-SPECIFIC SYSTEM DISTRIBUTION

Use the following release distribution:

Release 1:
- all foundational systems
- complete Stage I
- complete Stage II
- stable player loop
- integrated combat baseline
- integrated party baseline
- integrated chronology baseline
- integrated settlements baseline
- integrated rescue baseline

Release 2:
- complete Stage III
- deeper national systems
- stronger progression and faction interplay

Release 3:
- complete Stage IV
- broader continental pressure and strategic complexity

Release 4:
- complete Stage V
- endgame, permadeath, Hall of Legends, final route outcomes

Release 5:
- stabilization
- debug
- patch
- polish
- balance
- UX cleanup
- system consistency

Release 6:
- canon repository update
- migration
- reconciliation
- debug
- regression validation

Release 7:
- MMORPG conversion and expansion

This distribution is mandatory. Do not allow:
- Release 1 to remain structurally incomplete
- Release 2 to patch missing Release 1 foundations
- Release 3 to compensate for unresolved Release 2 route weaknesses
- Release 4 to carry unresolved systemic incompleteness from prior releases
- Release 5 to become the first time core systems are truly made coherent
- Release 6 to silently redesign gameplay under cover of canon update
- Release 7 to begin before the single-player path is mature

---

## 14. PLAYER FOCALITY ACROSS ALL RELEASES

Across all releases before MMO:
- play must feel first-person in immediacy
- the player character must remain the focal center of the run
- the chosen archetype must feel like the primary play identity
- the world must feel lived-in without displacing player centrality
- companions must deepen the player’s journey without taking over narrative focus

Across all releases:
- classic combat must feel physical, positional, protective, and commanding
- magic and spellcasting must feel dangerous, flexible, uncanny, and system-shaping
- stealth and precision must feel quiet, tense, observational, and timing-sensitive

Player focality must be preserved in:
- narrative panel writing
- encounter framing
- objective framing
- journal language
- notice language
- companion scenes
- route escalation
- world chronology presentation
- Hall of Legends summaries
- UI hierarchy
- progression feedback
- death and rescue consequence framing

The player must never feel like they are merely clicking through events that matter more to factions, companions, or lore than to themselves.

---

## 15. TESTING REQUIREMENTS ACROSS RELEASES

You must perform tests continuously throughout every release.

This includes:
- build tests
- runtime tests
- mobile viewport checks
- desktop layout checks
- route progression checks
- stage transition checks
- recruitment and persistence checks
- confrontation checks
- bestiary and hazard checks
- rescue-flow checks
- Stage V permadeath checks when applicable
- Hall of Legends summary checks when applicable
- central narrative panel update checks
- clarity and readability checks after UI changes
- class fantasy checks for classic combat, magic and spellcasting, and stealth and precision
- player-focality checks
- recruitment checks to confirm party NPCs are not archetype-locked or background-locked unless canonically justified by in-world conditions

You must manually playtest key locality starts and major flows along the way.

Testing must be release-appropriate.

Release 1 testing must heavily stress:
- fresh starts
- multiple archetypes
- multiple localities
- multiple backgrounds
- recruitment flow
- core confrontation
- death / rescue continuation
- settlement loops
- Stage I to II transition
- long-session readability

Release 2 testing must heavily stress:
- Stage II to III transition
- route widening
- increased faction complexity
- stronger chronology consequences
- national-scale quest and pressure handling

Release 3 testing must heavily stress:
- larger state burden
- broader travel logic
- higher confrontation complexity
- party relevance under broad pressures
- late-midgame pacing

Release 4 testing must heavily stress:
- Stage IV to V transition
- endgame fairness
- permadeath correctness
- run-end integrity
- Hall of Legends completeness and emotional weight

Release 5 testing must heavily stress:
- regressions
- repetition
- polish issues
- readability degradation
- performance
- interaction edge cases
- consistency across all stages

Release 6 testing must heavily stress:
- stale canon references
- world-data breakage
- route invalidation
- NPC placement errors
- outdated law/economy/infrastructure assumptions
- canon-consistency regressions

Release 7 testing must heavily stress:
- shared-state integrity
- multiplayer synchronization
- MMO architecture resilience
- role differentiation in multiplayer
- player identity retention under multiplayer conditions

---

## 16. CHECKPOINT REPORTING

At meaningful checkpoints, summarize:
- which release is being worked on
- what was changed in the repo
- what was tested
- what remains for that release
- which release requirements are now satisfied
- which current-state limitations still remain

Also call out whether recent work improved:
- classic combat feel
- magic and spellcasting feel
- stealth and precision feel
- player-character focality
- first-person-feeling embodiment
- world-rooted non-build-specific party recruitment

When summarizing, distinguish clearly between:
- direct repository-supported implementation
- bounded reconciliation or conservative inference
- unresolved canon blockers, if any

Checkpoint summaries must be operational, not vague. They must identify:
- exact systems touched
- exact files or data areas touched
- exact integrations now working
- exact integrations still incomplete
- exact gameplay loops now materially improved
- exact risks still likely to block the next step

---

## 17. WRITING QUALITY RULES

When writing in-game content, UI text, narrative text, route text, panel text, summaries, or implementation-facing explanations, the writing must be:
- clear
- serious
- immersive
- implementation-aware
- premium-feeling
- specific
- not bloated
- not repetitive
- not vague
- not marketing fluff

Do not write like a hype man.
Do not write like a wiki.
Do not write like a patch note list when creating in-game content.
Write like a lead designer and implementation auditor actively bringing the build through the release pathway.

When writing for the three major archetype groups:
- let martial writing feel practical, weighty, positional, and embodied
- let spellcasting writing feel dangerous, flexible, uncanny, and system-aware
- let stealth writing feel quiet, tense, observational, and timing-sensitive

Across all player-facing writing:
- preserve first-person-feeling immediacy
- keep the player character focal
- make the player’s archetype feel like a lived identity, not a label
- ensure companions, factions, and world detail support the player’s experience rather than replacing it

Writing quality should escalate with the release path. Release 1 writing must already be strong enough to sell the game’s identity. Later releases should add complexity, density, and scale without becoming bloated, lore-dumpy, or emotionally vague.

---

## 18. FINAL EXECUTION STANDARD

Success is not:
- the repo was reviewed
- the repo was summarized
- the repo was critiqued
- a design document was produced

Success is:
- the actual `ledger-of-ash` repository was directly audited against this release pathway
- its missing systems, integrations, content, and presentation were directly improved in code and content in release order
- each release materially advanced the build toward the complete single-player target state before MMO expansion
- Release 7 begins only after the single-player pathway, stabilization, and canon update are complete

Use this build pathway as the finish line.
Use `SoSoBurner/ledger-of-ash` as the current-state build to inspect, debug, expand, test, and deploy through Release 7.
