---
> **ARCHIVED FOR HISTORY ONLY**
> This document is kept for reference and context only.
> It reflects planning or spec work from prior sessions.
> Do not treat this as current documentation.
---

# LEDGER OF ASH MASTER UPDATE BRIEF

## Purpose
This brief replaces the older narrow Stage I canon-alignment update brief with a full execution brief for the complete single-player text-RPG scope.

This is not a planning-only handoff. This is an execution directive for the implementation model working directly in the repository. The repo must be inspected, corrected, expanded, tested, and pushed toward the intended complete single-player build.

The prior brief's most important diagnoses remain active and are now inherited inside a broader mandate:
- V28_8 is the sole canon authority.
- Stage I locality truth must remain correct.
- the central narrative panel is a first-class system, not a polish detail.
- the Notice Board is a critical world-motion surface and a critical readability blocker if unstable.
- the player character and chosen archetype must remain the focal living force of the run.

---

## Acting Role
You are Claude, acting as:
- senior game director
- systems designer
- narrative director
- world-architecture lead
- gameplay debugger
- content architect
- UI/UX director
- implementation auditor
- direct repository execution lead

Your job is to inspect the current Ledger of Ash build, compare it against the intended full single-player scope in this brief, debug what is broken or misaligned, create or complete missing content and systems, improve presentation, test continuously, and directly implement the corrected work in the repository.

You are not being asked to produce a separate design document instead of building.

---

## Target Demographic and Quality Bar
Build the version of Ledger of Ash most likely to deeply engage, immerse, and earn repeated replays from the audience that best fits this game model:
- TTRPG and D&D-adjacent players
- narrative CRPG players
- dark fantasy readers
- build-crafters who want martial, magical, and stealth play to feel truly different
- players who return for consequence, atmosphere, class fantasy, party tension, and route variation
- players who recommend games because they feel personal, reactive, and memorable

Product standard:
- gripping in the first session
- legible and satisfying in moment-to-moment play
- replayable because different runs genuinely feel different
- immersive because the world responds visibly and immediately
- memorable because the player character feels like the central living force of the run

---

## Current Build Baseline To Preserve
The current build is materially stronger than an early thin prototype. It already demonstrates useful runtime foundations that should be preserved and built upon rather than discarded:
- a text-first browser RPG structure
- build pipeline centered on `build.py -> dist/index.html`
- localStorage passcode save structure in runtime reality
- Stage I to Stage V framing already surfaced in the repo
- live backgrounds, localities, notices, route signals, and consequence state
- settlement surfaces, POIs, inventory and equipment state, and class-readable readiness signals
- stronger Stage I and Stage II play than some older repo docs imply

The existing narrow master brief correctly identified several still-active blockers that remain inherited in this larger brief:
1. Stage I locality truth is still inconsistent in parts of the build.
2. The central narration is not yet consistently protected as the primary scene anchor.
3. The Notice Board remains a critical mobile readability blocker.
4. Shared early node logic still over-assumes Shelk-first staging in too many places.
5. Canon authority still drifts between runtime, docs, comments, and older V28_4 references.

These are no longer the entire scope, but they are still high-priority correction areas inside the full-scope buildout.

---

## Non-Negotiable Rules
Do NOT include MMO features yet.

The game may remain MMO-shaped in architecture and world logic, but the work in this brief targets the complete single-player version only.

Do NOT:
- redesign the game into something else
- flatten it into generic fantasy
- reduce the work to brainstorming
- write a vague pitch instead of building
- stop at critique alone
- stop after analysis if implementation can continue
- produce a separate design document as the main deliverable
- only write repo patch notes
- ask unnecessary questions
- treat local customs, culture, economy, law, or infrastructure as separate showcase pillars unless a gameplay or canon requirement depends on them
- add free-floating setting flavor not grounded in V28_8 repository authority
- leave core archetype playstyles underdeveloped, especially the major player-facing groups of classic combat, magic and spellcasting, and stealth and precision
- let the party or setting become the protagonist instead of the player character
- build party NPCs as player-character-specific companion tracks tied to one archetype or background

You must:
- inspect the current repository directly
- use V28_8 as the sole canon authority for continuity, locality identity, institutions, law, economy, infrastructure, routes, hazards, NPC grounding, chronology, and social behavior
- compare the live implementation against the full scope below
- identify misalignment, bugs, dead ends, missing systems, missing content, weak UI, shallow route behavior, incomplete progression, and under-supported class fantasy
- ask clarifying questions only when ambiguity would materially affect canon fidelity, route structure, progression logic, content correctness, or deployment safety
- directly implement missing or corrected code and content
- directly improve the UI for beauty, readability, immersion, and clarity
- directly create missing narrative, route, party, bestiary, hazard, chronology, progression, rescue, Hall of Legends, and settlement content where absent
- directly create or strengthen missing combat, spellcasting, stealth, utility, equipment, and encounter affordances needed for strong DnD-adjacent character immersion and engaging gameplay, with priority weighted toward the appropriate archetype group rather than evenly flattened across all builds
- keep play immediate, player-embodied, and centered on the player character's lived agency
- keep party NPCs world-rooted, naturally located, and equally available to all archetypes and backgrounds that can find and recruit them under in-world conditions
- integrate local customs, culture, economy, law, and infrastructure only where the build specs canonically require them to shape play, readability, differentiation, legality, travel, access, pressure, or services
- run tests continuously while working
- manually play critical flows
- fix failures as they appear
- commit in coherent, reviewable increments
- push completed work to GitHub
- continue until the build is as close as possible to full-scope completion

If blocked by ambiguity:
- ask one concise clarifying question
- explain why the answer materially affects correctness
- continue immediately once resolved

If something can be completed reasonably without asking, complete it.

---

## V28_8 Canon Execution Rule
Treat the uploaded V28_8 repository as the sole world engine and sole canon authority.

Use this retrieval and implementation order:
1. classify the requested build problem
2. inspect `README.md` plus `00_PACKAGE_MANIFEST/package_manifest.json`, `source_authority_map.json`, and `source_inventory.json`
3. inspect `01_CANON_GOVERNANCE` for source precedence, truth layers, normalization, locality saturation, and runtime separation
4. inspect `05_RUNTIME_ENGINE` as the live runtime layer for current state, branch state, ledgers, projections, registries, and campaign effects
5. inspect `03_LOCALITY_ENGINE` for locality packets, arrival packets, authority packets, behavior packets, district packets, site packets, seasonal packets, and text-RPG packets
6. inspect `03_RECONCILIATION_LAYER` and `04_CONSERVATIVE_INFERENCE` only as bounded support
7. inspect `02_CANON_BASELINE` as baseline canon for polity, settlement, law, economy, route, ecology, religion, magic, infrastructure, and chronology support
8. inspect provenance, supersession, lineage, and release deltas only when needed to resolve conflicts or identify the most current corrective layer
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

Implementation boundary for customs, culture, economy, law, and infrastructure:
- use them where the game system canonically needs them
- do not turn them into separate lore expositions
- surface them only when they materially affect locality identity, confrontation legality, route access, settlement services, chronology pressure, faction behavior, public notices, starting options, hazards, or social response
- prefer local packet evidence first, then supporting baseline layers as needed

---

## Inherited Stage I Canon and Locality Rules
The prior brief's Stage I correction rules remain active.

### Hard canon rule
Do not preserve any V28_4-based locality, background, settlement, institution, faction, route, or narration reference when V28_8 supersedes it.

### Stage I locality rule
For Stage I, background location and current playable location must match under V28_8.

All Stage I play must take place in the background location and its canonically local surrounding district or route network as defined by V28_8.

Do not shift Stage I openings, investigations, notices, NPC chains, route logic, or first consequence chains into another polity just because an older Shelk-first structure exists in the repo.

### Required Stage I audit checks
For all implemented backgrounds, audit:
1. background location
2. actual Stage I physical play location
3. opening-scene locality
4. first-choice locality
5. Stage I consequence-node locality
6. Stage I notice and NPC locality
7. narration fidelity to V28_8
8. whether Stage I content silently relocates the player into another polity
9. whether any lore text still reflects V28_4 assumptions or stale naming

### Required correction behavior
- Stage I header must show the actual current location, and for Stage I that must be the background location under V28_8.
- Life overview, sheet, and intro may mention travel history, prior service, trade ties, academy ties, or house ties.
- The first playable scene must remain in the background locality.
- Route framing must communicate that the player is dealing with the local form of the wider route crisis from inside their own rooted world.
- Broader inter-polity widening happens in Stage II and later.
- If the build still relies on Shelk-first consequence nodes, localize, fork, or template them so Stage I works correctly in every starting locality.
- If runtime labels differ from V28_8, V28_8 wins.

---

## Primary Goal
Bring the current Ledger of Ash build into alignment with the projected complete single-player version of the game as a premium, text-first, route-driven, TTRPG-reminiscent fantasy campaign RPG for web and mobile, built around:
- 31 archetypes
- 93 backgrounds
- 5 stages
- 20 total levels
- unique Stage I grassroots origins per background
- unique five-stage route signatures per background
- a living chronology that continues without the player
- strong locality identity
- meaningful party management
- canonical bestiary and hazard confrontation
- route-based widening from local to world-scale stakes
- rescue-based death handling in Stages I to IV
- true permadeath in Stage V
- Hall of Legends as a meaningful final memory system
- genuinely satisfying class fantasy for players who expect martial, magical, or stealth-forward characters to feel mechanically and narratively distinct in the way strong tabletop campaigns do
- a play experience where the player character is always the focal living center of the run and the chosen archetype meaningfully shapes how the story is inhabited moment by moment

Treat the full scope below as the target state for the repository.

---

## Finished Game Definition
You must determine whether the current build truly satisfies, and if not then implement and verify:
- what the finished game is
- what the player fantasy is
- what makes the game compelling and replayable
- how the world is structured
- how character creation works
- how archetypes and backgrounds work
- how route-signature progression works
- how all 5 stages function
- how party, combat, and confrontation work
- how bestiary and hazards are integrated
- how chronology and world motion work
- how sandbox guidance and clear objectives work
- how progression, renown, and difficulty scaling work
- how death, rescue, and permadeath work
- how Hall of Legends works
- how the UI and UX work on desktop and mobile
- how the build delivers class-specific immersion and moment-to-moment agency for classic combat, magic and spellcasting, and stealth and precision characters
- whether play consistently feels immediate and keeps the player character, not companions or ambient lore, as the focal story force
- what the finished game explicitly excludes because MMO is not implemented yet

---

## Hard Product Positioning
Ledger of Ash is:
- a finished single-player game
- text-first
- premium-feeling
- web and mobile
- route-driven
- deeply rooted in world canon
- locality-specific
- party-based
- high-replay
- campaign-like
- progression-heavy
- consequence-heavy
- observably alive
- not a generic text adventure
- not a visual novel with fake branches
- not a roguelike that wipes everything clean
- not an MMO yet

It should feel like:
- a fantasy campaign journal you actively inhabit
- a rooted local life becoming a legend
- a party whose history matters
- a world that keeps moving
- a game where each run becomes historically memorable
- a game where martial characters feel physically commanding, spellcasters feel systemically powerful and flexible, and stealth characters feel cunning, evasive, and surgically effective rather than all solving problems through the same flattened interaction model
- a game where the player is always inhabiting their own character's choices, risks, limitations, strengths, and archetype identity first

---

## World and Tone
Treat the world as a differentiated canon space, not generic medieval fantasy.

The setting tone must include:
- locality-specific culture
- divine instability
- political texture
- route logic
- ritual, law, economy, geography, and infrastructure shaping play where the build canonically requires those pressures to be visible
- visible social behavior
- strong sensory writing
- high fantasy scale by late game
- grounded lived-in detail in early game

The world must feel distinct by polity and settlement, including:
- Shelk and Shelkopolis
- Panim Haven
- Sunspire Haven
- Aurora Crown Commune
- broader inter-polity expansion across later stages

Do not implement this as lore-dump exposition. Implement it as game-facing world structure.

When auditing the current build, check whether the world actually feels differentiated in live play. If it does not, create or correct missing:
- locality projection
- identity markers
- scene content
- systemic differentiation
- presentation logic

Where needed, pull support from V28_8 locality packets, authority packets, behavior packets, law layers, economy layers, and infrastructure layers, but only to the degree required for build correctness and experiential differentiation.

Locality richness must intensify the player's sense of being here, now, as this archetype. It must not shift attention away from the player into detached world summary.

---

## Character Creation
The finished game must begin with world-rooted character creation.

The player chooses:
- starting settlement
- available race or lineage for that locality
- age within lifespan logic
- Male, Female, or Non-Gendered presentation
- archetype
- grassroots background
- basic characteristics
- valid alphabetic name

The game then generates:
- a life overview up to the exact starting point
- local social grounding
- immediate starting tensions
- what that starting life means mechanically and narratively
- a clear articulation of the character's emerging playstyle fantasy in terms the player can immediately feel in play, especially for martial, magical, and stealth-forward builds

Character creation must feel authored by the world, not menu-generated.

When checking the current build, verify whether character creation actually achieves this. If it does not, debug and implement the missing:
- selection logic
- validation logic
- content generation
- life-overview content
- locality-grounded starting differentiation
- class-fantasy signaling so the player understands how their archetype will solve problems, contribute to a party, and grow across stages

Use V28_8 locality and lineage support to determine valid starts, stranger norms, social grounding, local pressures, and life texture. Use law, economy, customs, or infrastructure only where they materially affect starting legality, options, restrictions, expectations, or survival context.

Character creation must establish that this is your life, your body, your tools, your social position, and your route into the wider world. The player should begin with an immediate sense that the chosen archetype is not an abstract class label but the primary lens through which the story will be lived.

---

## Archetypes and Backgrounds
The finished game contains:
- 31 archetypes
- 93 backgrounds

You must preserve and complete a structure where:
- archetypes support multiple play styles
- the adventurer lane remains the design backbone
- each archetype supports combat, social, exploration, survival, faction and utility, party support, and capstone identity
- backgrounds localize archetypes
- backgrounds feel like true lived origins rather than cosmetic variants

Do not flatten archetypes or backgrounds into token differences.
Do not leave them differentiated only in comments or labels.

When auditing the current build, confirm whether archetypes and backgrounds are actually differentiated in gameplay and route behavior. If they are shallow, collapsing, contradictory, or incomplete, debug and create the missing content or structure.

Background localization should draw from V28_8 locality identity, expected behavior, visible power, pressure, and social placement. Bring in local economy, legal context, ritual norms, or infrastructure only when those elements canonically change the actual starting life, mechanical incentives, or route pressure.

### Major archetype-group audit and support rules

#### Classic Combat must strongly support:
- front-line identity
- weapon distinction
- armor distinction
- shield use and defensive posture
- reach, positioning, interception, and threat control
- protecting allies
- multi-target pressure where appropriate
- burst damage where appropriate
- battlefield endurance
- grappling, shoving, pinning, breaking, bracing, or other physical control actions where canonically appropriate
- different feelings between heavy, agile, brutal, disciplined, mounted, ranged-martial, duelist, or guardian styles
- equipment progression that materially changes choices rather than only increasing numbers

#### Magic and Spellcasting must strongly support:
- spell preparation or known-spell identity where appropriate
- cast economy and resource tension
- spell schools, disciplines, rites, or doctrine where canonically appropriate
- direct damage, control, defense, utility, travel, information, and ritual applications
- area pressure
- counters, wards, dispels, or anti-magic interactions where applicable
- concentration, channeling, or sustained-effect tension where applicable
- summoning, binding, enhancement, curse, divination, or environmental manipulation if canonically supported
- component, focus, reagent, or scroll identity where relevant
- high fantasy escalation in later stages without trivializing hazards, factions, or travel
- the feeling that a spellcaster solves problems differently from a martial or stealth character at both the tactical and route level

#### Stealth and Precision must strongly support:
- concealment and discovery states
- line of sight and attention management
- infiltration
- scouting
- ambush
- single-target burst or precision disablement
- traps, locks, sabotage, and bypass tools
- disguise, forgery, smuggling, concealment, or false identity play where canonically appropriate
- mobility, evasion, escape, and repositioning
- ranged precision and silent takedown identity where applicable
- information theft and route intelligence gathering
- the feeling that patience, setup, timing, and exit planning matter as much as raw damage

For these three groups, prioritize the appropriate systems much more heavily for the classes that depend on them. Do not distribute support so evenly that all classes end up feeling similar.

Archetype differentiation must remain player-focal. The story should repeatedly confirm that the archetype changes what the player notices, what the player can attempt, what feels risky, what feels natural, and what kinds of victories become theirs. Backgrounds may shape origin and route context, but they must not overshadow the archetype as the player's primary play identity once the run is underway.

---

## Route-Signature Architecture
Each of the 93 backgrounds must have:
- its own Stage I local plot
- its own five-stage route signature
- widening through shared canonical modules and plot families rather than 93 isolated mega-campaigns

A route signature includes:
- origin locality
- root plot
- widening vectors
- thematic identity
- rival pressure type
- core factions
- key NPC pools
- legendary memory tags
- failure forms
- ending families

Route signatures must preserve:
- replayability
- locality identity
- lore grounding
- systemic scalability
- narrative distinctness

When checking the current build, inspect whether routes are collapsing too early, over-converging, or only appearing distinct in comments rather than runtime. If so, debug those failures and create missing:
- route-signature content
- stage vectors
- plot families
- branching structure
- failure forms
- ending differentiation

When route structure depends on local law, trade, customs, infrastructure, travel routes, institutional access, or civic behavior, source those references from V28_8 and implement them as route logic, pressure, access conditions, or consequence states rather than lore exposition.

Also verify that route structure gives the major archetype groups different ways to engage:
- classic combat routes should include more opportunities for escort defense, direct confrontation, battlefield leadership, siege response, monster suppression, duels, and protection pressure
- magic and spellcasting routes should include more opportunities for ritual solving, arcane investigation, warding, counter-rite intervention, resource preparation, environmental manipulation, and doctrinal tension
- stealth and precision routes should include more opportunities for infiltration, surveillance, sabotage, extractions, theft, discreet killings where canonically permitted, smuggling, covert travel, and intelligence play

These differences should appear in actual mission structure, consequences, and route options, not merely in descriptive flavor.

Route structure must keep the player character focal. Rivals, factions, companions, and world events matter because they press against the player's path, choices, archetype strengths, and failures. The game must not drift into feeling like the player is merely observing more important actors.

---

## Stage Structure
The full five-stage structure is:
- Stage I: Grassroots
- Stage II: Regional Name
- Stage III: National Power
- Stage IV: Continental Force
- Stage V: International Legend

For each stage, the build must support:
- narrative scale
- gameplay scale
- locality scope
- route widening behavior
- difficulty expectations
- travel expectations
- faction and institution involvement
- party expectations
- puzzle, combat, and hazard expectations
- clear differentiation from the previous stage

Important:
- later stages must feel broader, slower, denser, and harder
- they must not feel like the same game with larger numbers
- Stage V must feel like genuine endgame

When auditing the current build, inspect whether stage progression is real or merely labeled. Debug shallow stage transitions and implement missing:
- content
- progression rules
- route escalation
- stage-specific pressure
- endgame structure

Use V28_8 chronology, route, polity, and locality support to scale how the world opens. Surface law, infrastructure, economy, customs, and institutional density only when stage growth canonically changes access, movement, public pressure, response, or available solutions.

Also ensure stage growth deepens archetype fantasy:
- classic combat should grow from local toughness into commanding battlefield presence, elite survival, leadership under pressure, and late-game legendary physical dominance
- magic and spellcasting should grow from practical or dangerous early access into flexible midgame problem-solving and late-game reality-shaping or world-scale ritual consequence within canon limits
- stealth and precision should grow from local skulking and theft into network-level intelligence, elite infiltration, operational sabotage, and high-risk deniable action with meaningful failure consequences

Stage growth must still feel like the widening story of the player character, not an external world escalation that leaves the player emotionally off-center.

---

## Party System
The complete party system includes:
- recruitability
- refusal
- persistence
- trust thresholds
- injuries
- unavailability
- support roles
- synergy
- camp scenes
- leave and break conditions
- tactical relevance
- ending relevance

The party must evolve from early-game support into late-game critical strategy without trivializing challenge.

When checking the current build, verify whether:
- recruitment works
- refusal works
- persistence works
- tactical value is real
- companion consequence exists
- camp scenes matter
- ending influence is present

If not, debug and complete them.

Use V28_8 NPC, locality, faction, and authority structures to shape recruitment logic and refusal. Where canonically relevant, let local law, social norms, economic pressure, institutional ties, or infrastructure constraints influence availability, trust, shelter, travel readiness, or risk tolerance.

Also verify party role support for the major archetype groups:
- classic combat characters must be able to anchor a party through protection, interception, durability, formation pressure, and frontline control
- magic and spellcasting characters must be able to shape battlefields, support allies, solve out-of-combat barriers, and create meaningful preparation advantages
- stealth and precision characters must be able to scout, disarm, infiltrate, reconnoiter, mark targets, secure escape paths, and open alternate approaches for the party

Party synergy should make mixed groups feel smart and powerful without making any one role mandatory in every run.

Party NPCs must not be authored as special companions reserved for or tailored to specific player archetypes or backgrounds. They must be world-grounded NPCs located where they naturally belong in the setting, recruitable by any player build that reaches them and meets the relevant in-world conditions. Their personalities, loyalties, injuries, and histories should remain their own rather than existing to mirror the player character.

At the same time, the party system must preserve player primacy:
- companions support, challenge, and react to the player character
- camp scenes deepen the player character's run rather than shifting the story's center away from them
- recruitment should feel like gathering people into the player's journey, not stepping into theirs as a secondary figure

---

## Combat and Confrontation
The complete confrontation model must include:
- tactical storytelling
- enemy intent
- real encounter setup
- combat abilities
- protect, press, retreat, surrender, containment, ritual, environment, and escort-defense options
- legality effects
- renown changes
- faction or morality shifts where appropriate
- wounds and recovery consequences

Confrontation is broader than direct combat and includes:
- avoidance
- containment
- bypass
- mitigation
- ritual handling
- environmental problem-solving
- escort protection
- survival under pressure

When auditing the current build, inspect whether confrontation is genuinely systemically varied or still mostly flavored checks. Debug weak encounter design and implement missing:
- encounter states
- AI or intent structure
- confrontation options
- outcome rules
- tactical differentiation

Legality, public response, ritual legitimacy, environmental handling, and authority escalation must be grounded in V28_8 where applicable. Use local law, visible power, customs, and infrastructure only when those systems canonically change what the player can do, what counts as escalation, and how the locality reacts.

### Archetype-specific confrontation support

#### Classic Combat
- weapon-dependent action choices
- shield and guard actions
- stance or posture identity where appropriate
- threat management
- protecting weaker allies
- terrain use for martial advantage
- melee engagement pressure
- ranged martial viability where applicable
- physically forcing outcomes such as breaking lines, holding choke points, pinning threats, or surviving attrition

#### Magic and Spellcasting
- spell choice as a real tactical layer
- offensive, defensive, control, and utility spell distinctions
- resource costs that matter
- cast interruption or risk where appropriate
- ritual handling in and out of combat
- environmental spell interactions
- resistances, counters, wards, or magical complications where applicable
- late-game spell options that widen encounter solutions without invalidating the rest of the game

#### Stealth and Precision
- stealth entry and stealth break states
- surprise and setup advantages
- precision strikes
- escape and re-hide options where applicable
- scouting-informed combat bonuses
- trap placement or trap avoidance
- sabotage before open confrontation
- alternate victory through theft, disablement, extraction, or quiet objective completion

These must be implemented as real systems, options, and consequences, not just text dressing.

Combat and confrontation must always resolve through the player character's immediate agency. Even when allies contribute, the encounter should still feel like something the player is personally navigating, reading, risking, and shaping through their archetype's strengths.

---

## Bestiary and Hazards
The finished game integrates canon-rooted bestiary and hazard systems.

This means:
- creatures and hazards are locality-specific
- route-specific
- stage-scaled
- canon-rooted
- mechanically meaningful
- tied to ecology, fear, ritual, travel risk, and puzzle structure

Bestiary and hazards must support:
- combat
- travel disruption
- route danger
- recovery strain
- atmosphere
- faction pressure
- late-game escalation

Do not leave creatures as filler enemies or hazards as generic damage wrappers.

When checking the current build, inspect whether bestiary and hazards are actually grounded, visible, and mechanically meaningful. If they are absent, shallow, or generic, create or correct the missing content and integration.

Draw from V28_8 ecology, route, locality, pressure, and ritual support. Pull in economy, law, labor rhythm, infrastructure, or civic behavior only where hazards canonically disrupt transport, trade, rites, public safety, sanitation, district access, or authority response.

Also verify that hazards and creatures create differentiated class play:
- classic combat should feel strong in holding, escorting, enduring, and direct suppression
- magic and spellcasting should feel strong in warding, countering, identifying, manipulating, containing, and exploiting environmental interactions
- stealth and precision should feel strong in scouting, avoiding, bypassing, disabling, isolating, and exploiting awareness gaps

Hazards and creatures should be encountered as threats to the player, obstacles before the player, and tests of the chosen archetype, not as detached world simulation events.

---

## World Chronology and World Motion
The world continues moving without the player.

This includes:
- chronology clocks
- faction clocks
- rival clocks
- plot escalation clocks
- route decay
- public notices
- scene-level atmospheric change
- visible changes in pressure, law, hazard exposure, religious behavior, logistics, access, and fear

The player experiences world motion through:
- central narrative updates
- notices
- changing route conditions
- evolving objectives
- missed opportunities
- rival advancement
- late arrivals to changed situations

When auditing the current build, verify whether chronology is actually visible, consequential, and stable in play. If it is hidden, weak, decorative, or inconsistent, debug and extend it.

Use V28_8 chronology, runtime state, locality packets, and pressure packets as the primary source. Let law, economy, customs, and infrastructure appear only where chronology canonically changes them or where they materially alter access, danger, enforcement, crowd behavior, or route conditions.

Also ensure world motion pressures different builds differently where appropriate:
- martial characters should feel the cost of failing to hold or respond
- spellcasters should feel the urgency of escalating rites, corruption, anomalies, or magical breakdowns
- stealth characters should feel shrinking windows, rising alertness, counterintelligence, sealed routes, or compromised covers

World motion must remain readable as pressure on the player character's life and run. The game should not feel like it is merely updating a world-state dashboard while the player watches from outside.

---

## Sandbox Structure and Objective Clarity
The game stays sandbox-like without becoming aimless.

The player should always be able to identify:
- a main-stage pressure
- a regional pressure
- a party pressure
- a faction pressure
- a personal or build pressure
- a route pressure
- a world-in-motion pressure

The game supports multiple approaches to major objectives, such as:
- person
- place
- records
- stealth
- force
- ritual
- recovery
- interception
- route tracing
- hazard mitigation
- creature handling

The build must not collapse into bureaucracy-heavy clue ladders.

When checking the current build, inspect whether objectives are clear without becoming forced and whether solutions are meaningfully plural. If the build collapses into repetitive ladders, debug and expand its objective web.

Where objective structure depends on civic restrictions, institutional access, social codes, trade channels, transport nodes, or legal risk, source that from V28_8 and implement it as actual branching pressure or access logic, not descriptive filler.

Also make sure objective structure supports build-authentic solutions:
- classic combat should often be able to solve problems through escorting, defending, forcing passage, openly challenging threats, or surviving direct pressure
- magic and spellcasting should often be able to solve problems through ritual work, arcane analysis, warding, controlled destruction, sensing, translation, or reshaping conditions
- stealth and precision should often be able to solve problems through infiltration, theft, eavesdropping, sabotage, disguise, smuggling, or silent elimination where canonically appropriate

No archetype group should be forced too often into a solution style that ignores its core fantasy.

Objectives must present themselves as things the character can pursue, refuse, postpone, or redefine. The sandbox should never make the player feel like an impersonal cursor moving through content instead of a focal person making consequential choices.

---

## Progression, Leveling, and Renown
The complete game uses a full 20-level progression model.

This includes:
- meaningful levels
- stages distinct from levels
- difficulty scaling
- player growth scaling
- party growth scaling
- later stages becoming longer and richer without becoming grindy
- player-only renown bonuses
- empowerment moments in Stages III and IV that reinforce growth without flattening the curve
- Stage V being hard but fair

When auditing the current build, inspect whether progression actually feels smooth, rewarding, and increasingly demanding. Debug broken scaling, dead levels, trivialized stages, or missing renown logic, and complete the missing content.

Use V28_8 route, faction, chronology, and locality support to determine what renown means in different places. Surface law, social status behavior, trade privilege, authority scrutiny, ritual access, or infrastructure reach only when they canonically change progression outcomes or world response.

Also verify progression depth for the three major archetype groups:
- classic combat must gain meaningful martial tools, defensive and offensive pivots, equipment-driven identity shifts, and late-stage battlefield authority
- magic and spellcasting must gain meaningful spell breadth, depth, synergy, scaling, ritual identity, and risk-reward tension
- stealth and precision must gain meaningful infiltration tools, mobility, precision damage or disablement, information control, and escape options

Progression must not devolve into larger numbers alone. New levels should unlock new patterns of play.

Progression should feel like the character becoming more dangerous, more capable, more feared, more renowned, or more burdened. The player should never lose the sense that this is their ascent, not a party-wide abstraction.

---

## Death, Rescue, and Permadeath
The complete death-handling system works like this:

### Stages I to IV
- death does not reset time
- death does not reload a save
- death resolves through canon-grounded rescue or survival aftermath
- the player resumes in an adjacent safe zone
- chronology and consequences continue
- there is always real cost

### Stage V
- true permadeath
- no rescue rollback
- run ends
- Hall of Legends records the outcome meaningfully

Near-death and final-death both shape the run's meaning.

When checking the current build, verify whether death handling actually follows this model. If it does not, debug and implement the missing:
- rescue continuation
- consequence preservation
- adjacent safe-zone logic
- Stage V permadeath logic

Safe-zone logic, rescue credibility, aftermath, and consequence preservation must be grounded in V28_8 locality, authority, route, institution, and runtime structures. Use local law, healing access, transport constraints, social tolerance, or infrastructure only where rescue plausibility and aftermath canonically require them.

Also verify that recovery aftermath feels distinct by build where appropriate:
- classic combat may more often carry scars, injury burden, damaged gear, or visible reputation from open conflict
- magic and spellcasting may more often carry corruption, depletion, backlash, ritual debt, or doctrinal consequences where canon allows
- stealth and precision may more often carry exposure, heat, compromised covers, confiscated tools, or hunted status after failed covert action

Death and rescue must land as events that happened to the player and now continue to shape the run.

---

## Hall of Legends
Hall of Legends is the finished game's memory system for completed runs.

It records:
- origin
- archetype and background
- major route history
- allies and companions
- rivals
- wounds and scars
- deaths and rescues
- major bestiary or hazard confrontations
- ending form
- world significance
- why the run mattered

It should feel like a true historical memorial, not a scoreboard alone.

When auditing the current build, inspect whether Hall of Legends captures enough specificity and emotional weight. If not, debug and add the missing:
- memory structures
- summaries
- route history surfaces
- ending detail
- presentation weight

Where relevant, Hall entries should preserve canon-grounded distinctions in law, locality, public consequence, faction standing, and social memory, but only when those details materially explain why a run mattered.

Also ensure Hall entries meaningfully preserve build fantasy:
- how a martial character became feared, revered, or remembered
- what signature spells, rites, or magical consequences defined a spellcaster's run
- what covert acts, infiltrations, betrayals, escapes, or perfect strikes defined a stealth character's run

Hall entries must foremost read as the remembered life of the player character. Companions, factions, and world events should appear in relation to the player's run rather than competing with it for narrative centrality.

---

## UI / UX
The full UI concept for desktop and mobile includes:
- location, time, and state header
- central narrative panel
- most recent result or outcome area
- live choice area
- world or map access
- party access
- sheet or identity access
- journal, codex, notices, and chronicle access

The five core interface layers are:
- Story
- World
- Identity
- Party
- Chronicle

Desktop and mobile should differ in layout but preserve the same core feel.

You must inspect the current build's UI for alignment with the intended experience and improve it until it is:
- visually immersive and beautiful
- readable for long sessions
- elegant on both desktop and mobile
- responsive without cramped surfaces
- informative without clutter
- emotionally engaging
- atmosphere-rich without sacrificing usability
- clear enough that the player always understands where they are, what changed, what matters, and what they can do next

The UI must consistently keep the player:
- informed
- engaged
- immersed

This includes:
- typography
- spacing
- contrast
- information hierarchy
- panel placement
- choice readability
- header clarity
- state visibility
- mobile portrait usability
- desktop richness without overload
- consistent visual identity tied to the game's fantasy tone

When checking the current build, debug weak, confusing, ugly, cluttered, low-clarity, or low-immersion UI behavior and create or complete any missing visual or content structure needed to meet this standard.

Where the UI surfaces law, economy, customs, infrastructure, authority presence, or route restrictions, do so because the build state requires those signals for player comprehension, not as decorative lore panels.

Also ensure the UI supports class immersion:
- classic combat players should be able to quickly read protection, threat, wounds, stance, gear readiness, and front-line consequences
- magic and spellcasting players should be able to quickly read spell resources, active effects, wards, rituals, prepared options, and magical pressures
- stealth and precision players should be able to quickly read concealment state, noise or suspicion state, position quality, infiltration tools, and escape viability

These signals must be readable without cluttering the main narrative experience.

The UI must reinforce that the player character is the focal center of play. Identity, state, threat, opportunity, and consequence should read first as conditions of the current lived situation, not as detached systems floating above the character.

---

## Central Narrative Panel
This is required and must be treated as one of the defining features of the finished game.

The central narrative panel is the living descriptive center of the current scene and must be highly dynamic rather than merely atmospheric.

It must:
- update after every player choice resolution
- update after every locality change
- update after every meaningful time, pressure, faction, route, hazard, or consequence shift
- remain on the main screen as a first-class element
- sit above the live choices and below the location, time, and state header
- fully refresh its displayed text rather than making only minor incremental edits
- make the player feel that their choices are actively reshaping what the world looks and feels like around them
- give the player the full lived experience of the world around their character, not just a recap of what happened

The panel must not function as a generic flavor box. It must function as the scene-setting heartbeat of the current moment.

The entire text of the panel should change to reflect:
- what the player just chose
- how the world has responded
- what is now newly visible, tense, altered, missing, threatened, opened, silenced, crowded, celebrated, feared, watched, damaged, sanctified, corrupted, delayed, rerouted, or expected
- how progression feels materially different because of those changes

The player should feel, after every meaningful change:
- that the scene has actually advanced
- that the world has absorbed the choice
- that the place now carries the consequences of what just happened
- that progression is not only mechanical, but environmental, social, and atmospheric

### Narrative style requirements
- immediate player embodiment
- immersive and engaging prose
- vivid, sensory, concrete, and locality-specific
- concise enough to stay playable for long sessions
- colorful and atmospheric without becoming purple prose
- emotionally varied through observable interactions, tensions, gestures, silences, habits, rituals, and social behavior
- grounded in the established rules of the game's prose style
- written so the player feels present inside the moment rather than outside it receiving summary

It must avoid:
- lore dumping
- quest-summary writing
- generic filler
- repetitive stock phrasing
- detached external narration
- internal monologue that invents feelings the player did not choose
- assumed possessions
- narrated movement that did not occur
- flattening different localities into the same descriptive voice

The panel should be composed from changing inputs such as:
- locality projection
- current route or district context
- time of day, season, or axis state
- current civic or religious pressure
- active faction tension
- recent world change
- recent player choice outcome
- current stage and route stakes
- visible bestiary or hazard pressure
- social tone of the present location
- what services, blockages, fears, or opportunities are now apparent

The panel should not merely restate result text. It must transform result text into a freshly realized scene.

Examples:
- if the player defies a local authority, the panel should not just say authority standing changed; it should fully repaint the place as watched, colder, quieter, more guarded, or more openly hostile where appropriate
- if the player resolves a hazard, the panel should not just note success; it should repaint the route, crowd behavior, local relief, ritual response, labor rhythm, or new vulnerability now visible
- if the player recruits a companion, the panel should not just confirm recruitment; it should reframe the space through new presence, altered attention, changed confidence, new tensions, or newly opened possibilities
- if time advances under pressure, the panel should make the player feel lateness, strain, anticipation, closure, fatigue, or escalation in the scene itself
- if progression widens the route, the panel should make the player feel that the world now presents itself on a broader, heavier, more consequential scale

This panel is how the game delivers the feeling that choices shape progression and change in the world, moment by moment, even before the player opens the Journal, Notices, or Chronicle.

When auditing the current build, specifically inspect whether the panel already does this. If it does not, debug and create the missing:
- composition logic
- content pools
- refresh behavior
- UI prominence
- prose variation
- scene-reactivity rules

Use V28_8 locality packets and related pressure, authority, behavior, district, season, route, and runtime state as the composition backbone. Surface customs, law, economy, infrastructure, and institutional behavior only where those canon layers materially alter the scene the player is actively inhabiting.

Also ensure the panel reflects class-authentic perception where appropriate:
- classic combat scenes should emphasize bodies in motion, pressure lines, impact, fatigue, crowd reaction to force, and the practical meaning of terrain and protection
- magic and spellcasting scenes should emphasize unstable energies, ritual residue, charged materials, ward tension, sensory oddity, doctrinal response, and the felt consequences of sorcerous action
- stealth and precision scenes should emphasize sightlines, silences, timing windows, exposed routes, hidden watchers, attention shifts, entry points, exits, and the cost of being noticed

The panel must keep the player character and their archetype focal. Companions, factions, and environmental detail should enrich the player's lived moment, not take over narrative centrality.

---

## Settlement Content, Services, and Itemization
When designing player-facing settlement content, remember the main rule:
Players usually do not enter settlements to admire realism. They enter to solve one of five needs:
- recover
- upgrade
- prepare
- gather information
- unlock something

Settlement content must be designed around those needs.

### Settlement POI priorities

#### Highest-priority POIs
- inn or tavern
- general store or market
- blacksmith, armorer, or fletcher
- temple, shrine, or healer
- magic shop, arcanist, or alchemist

These support:
- rest
- rumors
- quest hooks
- NPC recruitment
- social scenes
- resupply
- weapons and armor
- repairs
- healing
- blessings
- potions
- scrolls
- spell components
- identification

#### Second-tier but highly desirable POIs
- town hall, job board, or guard barracks
- stables, caravanserai, or docks
- guild hall or trainer
- library, archive, or sage
- fence, underworld contact, or hidden den

These support:
- bounties
- faction work
- travel routes
- escorts
- crafting
- skill advancement
- research
- lore
- criminal jobs
- illegal goods

#### Flavorful but valuable POIs
- bathhouse, barber, or tailor
- bank, moneychanger, or appraiser
- cartographer
- pet or beast trader
- curio shop
- arena or dueling pit
- court or jail
- sewer entrance, catacombs, or hidden temple
- noble manor, castle, or embassy

Every settlement should ideally contain:
- 1 recovery POI
- 1 equipment POI
- 1 information POI
- 1 progression POI
- 1 flavor or narrative POI
- 1 secret or gated POI

A weak settlement says: here are shops.
A strong settlement says: you can heal here, gear up here, learn something here, unlock something here, and discover something hidden here.

### Player wants in settlements

#### Universal wants
- healing potions
- antidotes
- rations and water containers
- rope
- light sources
- ammo
- bags and carrying upgrades
- maps
- climbing gear
- tents and bedrolls
- repair kits
- mounts and tack

#### Progression wants
- better weapons
- better armor
- shields
- rings, cloaks, boots, belts
- resistances
- damage boosts
- mobility tools
- detection and scouting tools

#### Utility wants
- lockpicks
- crowbars
- grappling hooks
- disguises
- signal devices
- traps
- smoke or flash items
- holy water
- incense and ritual supplies
- identification services

#### Magic wants
- spell scrolls
- focuses
- component pouches
- rare reagents
- spell recovery items
- wards
- familiars or summoning aids
- enchanted storage

#### Additional content categories players care about
- consumables
- travel items
- social and infiltration items
- crafting reagents
- relic fragments
- upgrade catalysts
- faction markers
- forged papers
- disguises
- keys
- coded documents

### Clean five-slot item model

#### Classic Combat
- main weapon
- off-hand or shield
- armor
- ranged or backup weapon
- battle utility item

#### Magic or Spellcasting
- focus, staff, or wand
- spellbook, grimoire, or tome
- robes or ward garment
- components or scroll kit
- arcane trinket or charm

#### Stealth, Performance, or Percussion
- finesse weapon
- light armor or concealment wear
- intrusion tools
- instrument or performance focus
- trick utility item

### Stage labels for item progression
- Grass Roots
- Heroic
- Epic
- Legendary
- God Tier

Simple itemization rule:
- Grass Roots = functional
- Heroic = specialized
- Epic = build-defining
- Legendary = rule-bending
- God Tier = identity-defining or encounter-warping

Production target:
- 225 core equipment items
- 40 shared utility or consumable items
- 25 settlement-exclusive services or POIs
- 10 to 20 hidden or faction-gated items
- about 290 to 360 meaningful settlement content pieces total

Recommended split by stage:
- Grass Roots: 2 items per slot, practical, low magic, strong economy relevance
- Heroic: 3 items per slot, early specialization
- Epic: 3 items per slot, stronger synergy and tactics
- Legendary: 2 to 3 items per slot, fewer but more identity-rich pieces
- God Tier: 1 to 2 items per slot, rare, iconic, near-artifact level

When auditing the current build, check whether settlements actually provide useful recovery, equipment, information, progression, flavor, and hidden or gated content. If settlement visits are shallow, repetitive, or not worth the trip, create the missing services, POIs, item pools, and gated content needed to make them meaningful.

Use V28_8 locality, economy, institution, law, route, and infrastructure support where settlement services canonically depend on them. Do not make economy or law a separate content focus; make them operative where they shape pricing logic, contraband, authority presence, travel services, ritual services, restricted goods, repair access, medical access, or hidden networks.

For class immersion, prioritize settlement support appropriately:
- classic combat classes need robust weapon, armor, shield, repair, training, mount, and battlefield utility support
- magic and spellcasting classes need robust scroll, reagent, focus, ward, research, identification, ritual, and magical recovery support
- stealth and precision classes need robust lockpick, disguise, smuggling, poison or disablement support where canonically allowed, trap, climbing, concealment, forgery, and fence-network support

Do not leave these archetype groups shopping from the same homogenized list.

Settlement content must reinforce player embodiment. Services, risks, rumors, and upgrades should read as things the character can personally use, purchase, endure, conceal, or unlock.

---

## Current High-Priority Misalignment Audit
The implementation pass must begin by checking and correcting the highest-value problems first.

### Critical blockers
1. Notice Board readability and mobile corruption.
2. Central narrative panel placement, refresh behavior, and first-class status.
3. Silent wrong-polity Stage I openings.
4. Localized Stage I notices, early hooks, and early NPC or authority chains by background locality.
5. Stale V28_4 canon references in docs, comments, runtime-facing specs, and narration support layers.

### High-value improvements
1. Convert shared Shelk-first openings into locality templates or locality forks.
2. Ensure each active Stage I locality has its own authority surface, public node, spiritual or civic node, freight or route node, and records or institution node where appropriate.
3. Make repeated investigation cause visible public or procedural change after two to three meaningful actions.
4. Sharpen class-readable scene language in the narrative panel and surrounding UI.

### Medium-priority refinements
1. Reduce clue-confirmation repetition.
2. Tighten Story-screen spacing and hierarchy across desktop and mobile.
3. Normalize locality-facing lore labels and institutional naming.

### Later-pass polish
1. Additional prose richness after locality truth is stable.
2. Further per-background sensory differentiation after the structural audit is complete.
3. Decorative UI only after hierarchy and mobile stability are correct.

---

## What The Complete Single-Player Game Excludes
This projected complete version does not yet include:
- live multiplayer
- other real players changing the runtime in real time
- guilds
- chat
- co-op combat
- raids
- player-driven markets
- real-time shared-world sync

The architecture may remain future-friendly, but none of those systems are part of the complete single-player scope being implemented here.

---

## Execution Behavior
You are not being asked to produce a separate static design document as the main deliverable.

Working behavior should be:
1. inspect the current build
2. report the most important misalignments briefly
3. ask any necessary clarifying question only when correctness truly depends on it
4. implement fixes and missing systems or content directly
5. test continuously
6. push changes to GitHub in coherent increments
7. continue until the build is brought as close as possible to full-scope completion

At meaningful checkpoints, summarize:
- what you changed
- what you tested
- what still remains
- what questions, if any, block the next step

When summarizing, distinguish clearly between:
- direct V28_8-supported implementation
- bounded reconciliation or conservative inference
- unresolved canon blockers, if any

Also call out whether the recent work improved:
- classic combat feel
- magic and spellcasting feel
- stealth and precision feel
- player-character focality
- immediate embodiment
- world-rooted but non-build-specific party recruitment

---

## Testing Requirements
Tests must be performed continuously throughout implementation.

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
- Stage V permadeath checks
- Hall of Legends summary checks
- central narrative panel update checks
- clarity and readability checks after UI changes
- class-fantasy checks for classic combat, magic and spellcasting, and stealth and precision starts and mid-run development
- player-focality checks to confirm the player character remains the experiential center of play
- recruitment checks to confirm party NPCs are not archetype-locked or background-locked unless canonically justified by actual in-world conditions rather than player-build tailoring

Key locality starts and major flows must be manually playtested along the way.

Do not leave testing as a final optional step.

Also verify during testing that law, economy, local custom, infrastructure, and civic behavior only surface where the implemented gameplay system actually needs them and never as bloated side exposition.

For archetype validation, confirm that:
- a martial player can clearly feel protection, threat, gear, endurance, and physical control matter
- a spellcaster can clearly feel spell selection, magical resources, ritual options, and magical problem-solving matter
- a stealth player can clearly feel concealment, timing, infiltration, precision, and escape matter

For focality validation, confirm that:
- the player consistently feels present in their own moment-to-moment experience
- companions do not displace the player character as the run's primary center
- the chosen archetype remains clearly legible as the player's main story identity throughout play

---

## Writing Quality Rules
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

Write like a lead designer and implementation auditor actively bringing the full game into alignment.

When drawing on V28_8 customs, culture, economy, law, or infrastructure:
- keep the writing embedded in play
- keep it local and concrete
- keep it proportional to the current build need
- do not stop the game to explain the setting

When writing for the three major archetype groups:
- let martial writing feel practical, weighty, positional, and embodied
- let spellcasting writing feel dangerous, flexible, uncanny, and system-aware
- let stealth writing feel quiet, tense, observational, and timing-sensitive

Across all player-facing writing:
- preserve immediate embodiment
- keep the player character focal
- make the player's archetype feel like a lived identity, not a label
- ensure companions, factions, and world detail support the player's experience rather than replacing it

---

## Final Reminder
Do not reduce this to:
- here are some ideas
- here are some possible features
- here are optional approaches
- here is a document you can use later

You are checking the current build against the projected complete single-player game, debugging misalignment, creating missing content, improving the UI, testing along the way, and directly building and deploying what still needs work so the game moves toward full completion.

Do not include MMO features yet.
Do not stop at description alone.
Do not stop after analysis.

Audit the build, debug the misalignment, create missing content, improve the UI, test continuously, ask clarifying questions when necessary, and push the corrected implementation to GitHub.
Use V28_8 as the sole canon authority.
Implement local customs, culture, economy, law, and infrastructure only where the build specs canonically need those references to make the single-player game function, differentiate localities, or preserve correctness.
Prioritize the missing gameplay, progression, encounter, and immersion elements that DnD-literate players expect from classic combat, magic and spellcasting, and stealth and precision archetype groups, and weight those elements much more heavily for the classes that are supposed to own them.
Keep play immediate in feel, keep the player character and archetype eminently focal to the story, and keep party NPCs world-rooted, naturally located, and equally available to all archetypes and backgrounds that can find and recruit them.
