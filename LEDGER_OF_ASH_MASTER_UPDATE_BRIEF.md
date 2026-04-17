# LEDGER OF ASH MASTER UPDATE BRIEF

## Purpose
This package is the planning, diagnosis, and handoff pass for the next repository update cycle.

It is not the final implementation pass.

Its purpose is to tell GitHub Copilot and Claude Code Console exactly what to inspect, what to fix, what not to widen, and how to verify completion.

---

## Non-Negotiable Goal
Bring the current Ledger of Ash build into **V28_8 canon alignment for Stage I locality play** while preserving the current game’s stronger runtime foundations.

The update must improve:
- locality truth
- scene hierarchy
- immediate player readability
- first-session payoff density
- mobile notice-board stability
- class-authentic scene legibility

It must **not** widen into unrelated mechanical redesign.

---

## Hard Change Boundary
Authorized change surface only:
- locations
- backgrounds
- opening scene locality logic
- Stage I locality grounding
- narration text
- lore canon references
- canon sourcing logic
- institution / polity / settlement / route / faction / law / ritual / infrastructure references where required to make the above correct

Do **not** redesign:
- combat systems
- progression curves
- archetype ability trees
- party system foundations
- stage thresholds
- core save structure
- unrelated overlays or unrelated feature systems

Keep everything else unchanged unless directly required to support canon-alignment and Story-screen hierarchy correction.

---

## Primary Diagnosis To Preserve
The build is materially stronger than earlier versions.

The repo now shows real runtime progress rather than a thin prototype shell:
- active rooted localities
- more backgrounds and openings
- more route and faction signals
- settlement services and inventory/equipment state
- class-readable readiness indicators
- broader Stage I / Stage II grounded play

The main bottleneck is no longer “missing foundations only.”
The main bottleneck is now:
- session-quality density
- momentum
- scene hierarchy
- differentiated payoff per minute
- locality truth consistency

The game has more route logic, clue chains, and systemic motion, but too many actions can still pass before the player feels materially new:
- pressure
- access
- authority response
- named human consequence
- route-state transformation
- public change
- class-authentic reward

Repeated investigation can still confirm what the player already suspects without enough visible environmental, social, procedural, or institutional change.

---

## Current-State Diagnosis

### What is clearly improved
1. Runtime scale is materially stronger than earlier repo descriptions.
2. The engine already roots the player location from the chosen background region via `BG_LOCATION_MAP` and `G.location`.
3. The runtime contains active localities, settlement POIs, service actions, inventory/equipment state, and class-readable readiness signals.
4. The game already attempts dynamic locality text through the environment panel.
5. Stage I and Stage II are more playable than older docs imply.

### What is still broken
1. **Stage I locality truth is still inconsistent.**
   A large portion of implemented non-Shelk backgrounds still open with prose that silently relocates the player into Shelkopolis even when the rooted runtime location is Panim, Fairhaven, Mimolot, Aurora, Ithtananalor, Soreheim, Guildheart, Shirshal, Cosmoria, or Sunspire.
2. **The central narration is not consistently protected as the primary scene anchor.**
   The center column still behaves as a rolling transcript feed rather than a first-class, fully refreshed place-state panel.
3. **The Notice Board is a critical blocker.**
   Notice overlay markup exists, but notice-specific CSS treatment is not robust enough. On mobile this can degrade into cramped or corrupted presentation.
4. **Stage I shared node logic remains heavily Shelk-biased.**
   Early notices, investigation hooks, authority contacts, shrine hooks, and several first-node chains still read like Shelkopolis-first content with local surface dressing added on top.
5. **Canon authority is still drifted across repo surfaces.**
   V28_4 references persist in code comments and docs. V28_8 is present and must win completely.

### What is still missing
1. A formal Stage I locality consistency audit across all implemented backgrounds.
2. A canon-authority rewrite that removes stale V28_4 claims from README/docs/narration packet/canon update layers.
3. A protected Story-screen hierarchy where the player always reads:
   1. where they are
   2. what the place feels like right now
   3. what just happened
   4. what they can do next
4. Localized Stage I first-node templates for all active starting localities.
5. Stronger repeated-clue transformation rules so the same clue chain changes access, route state, public posture, or institutional stance instead of only restating suspicion.

### What is most likely to hurt retention and first-session engagement
1. The player chooses a non-Shelk background but the narrative still behaves like they were silently moved to Shelkopolis.
2. The center column competes between atmosphere, transcript, rolls, results, and choices without a protected narrative anchor.
3. The notice board is hard to parse on mobile despite being one of the core world-motion surfaces.
4. Investigation loops can confirm suspicion without granting new access, new heat, new named leverage, or new spatial consequence fast enough.
5. Class fantasy payoff still lands unevenly in the first session when scene language does not foreground what matters to that class family.

---

## Documentation / Runtime / Canon Drift

### Repo and doc inconsistency that must be acknowledged and corrected
The implementation tools must assume repo surface drift is real.

Observed drift patterns:
- older repo surfaces still describe V28_4, build.py -> dist/index.html, localStorage passcode save, and earlier scope counts
- newer README/doc surfaces describe later batch progress and broader rooted-locality support
- `engine.js` still uses localStorage passcode saves
- `world-data.js` still labels itself V28_4 canon in comments
- `docs/CANON_UPDATE.md` still declares V28_4 as active canon
- `docs/NARRATION_PACKET.md` still frames narration against V28_4 and a Claude packet model that does not match the new first-class inline narration requirement

### Practical rule
When repo surfaces disagree:
1. runtime reality beats stale prose
2. V28_8 beats V28_4 everywhere
3. current Stage I locality truth beats legacy Shelkopolis-first assumptions

---

# V28_8 CANON ALIGNMENT AUDIT

## Canon authority rule
Use **V28_8 as the sole canon authority** for:
- locations
- backgrounds
- narrations
- settlement identity
- polity identity
- institutions
- route logic
- faction grounding
- law
- economy
- ritual
- chronology
- infrastructure
- locality behavior

## Required source order
Implementation tools must use this source order exactly:
1. inspect README only for current runtime/build context, not final canon truth
2. inspect `V28_8_DnD_World_Repository.zip` as the canon source of truth
3. inspect:
   - `00_PACKAGE_MANIFEST/package_manifest.json`
   - `00_PACKAGE_MANIFEST/source_authority_map.json`
   - `00_PACKAGE_MANIFEST/source_inventory.json`
4. inspect `01_CANON_GOVERNANCE` for source hierarchy, truth layers, normalization, identity separation, and locality saturation rules
5. inspect `03_LOCALITY_ENGINE` for locality packets, authority packets, behavior packets, district packets, site packets, seasonal packets, and arrival/play-state locality material
6. inspect `05_RUNTIME_ENGINE` only where needed to ensure canon and live runtime can coexist cleanly
7. inspect `02_CANON_BASELINE` only as supporting truth for polity, law, economy, infrastructure, route, demography, religion, and chronology when locality packets depend on it
8. inspect `03_RECONCILIATION_LAYER` and `04_CONSERVATIVE_INFERENCE` only when a gap truly exists

## Hard canon rule
Do not preserve any V28_4-based locality, background, settlement, institution, faction, route, or narration reference when V28_8 supersedes it.

## Canon rewrite targets in the repo
At minimum audit and correct:
- `README.md`
- `docs/CANON_UPDATE.md`
- `docs/NARRATION_PACKET.md`
- `world-data.js` header comments and canon references
- opening-scene prose
- Stage I notice copy
- Stage I node prose
- locality names, polity names, institution names, faction names, route names, and ritual details surfaced to the player

---

# STAGE I LOCALITY CONSISTENCY AUDIT

## Non-negotiable Stage I locality rule
For Stage I, **background location and current playable location must match under V28_8**.

The runtime may mention travel history, prior assignments, former service, or external ties, but the first playable scene must stay in the background locality.

## New mandatory Stage I locality rule
All Stage I play must take place in the background location and its canonically local surrounding district / route network as defined by V28_8.

Do not shift Stage I openings, investigations, notices, NPC chains, route logic, or first consequence chains into another polity just because an older Shelkopolis-first structure exists in the repo.

## Required audit checks for every implemented background
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

## Required correction behavior
- Stage I header must show the actual current location, and for Stage I that must be the background location under V28_8
- life overview / sheet / intro may mention travel history, prior service, trade ties, academy ties, or house ties
- the first playable scene must remain in the background locality
- route framing must communicate: **you are here, in your local world, dealing with the local version of the eastern-route crisis**
- broader inter-polity widening happens in Stage II+
- if the build relies on Shelkopolis-first consequence nodes, localize, fork, or template them so Stage I works correctly in every starting locality
- if runtime labels differ from V28_8, V28_8 wins

## Known wrong-polity opening groups that must be fixed first
Representative audited groups where the opening text still drifts into Shelkopolis despite non-Shelk background locality:

- **Ithtananalor / Roaz-linked**: `w_roaz`, `p_eloljaro`, `cl_eloljaro`, `eg_roaz`, `or_ithtananalor`, `wl_roaz`
- **Soreheim-linked**: `w_frontier`, `r_soreheim`, `b_soreheim`, `wz_field`, `wa2_soreheim`, `wl_soreheim`, `bm_soreheim`
- **Panim-linked**: `k_order`, `pr_panim`, `nc_panim`
- **Fairhaven-linked**: `r_shelk`, `pr_community`
- **Aurora / Sheresh-linked**: `r_sheresh`, `nc_sheresh`, `el_sheresh`, `al_sheresh`, `or_sheresh`, `bm_sheresh`
- **Sunspire-linked**: `a_frontier`, `b_frontier`
- **Mimolot-linked**: `wz_mimolot`, `nc_mimolot`, `iq_mimolot`, `or_mimolot`
- **Guildheart-linked**: `cl_remeny`, `ro_union`, `ro_nomdara`, `tr_nomdara`, `sn_remeny`
- **Shirshal-linked**: `iq_shirsh`
- **Cosmoria-linked**: `th_cosmouth`

These are the priority correction set because they produce the most obvious header / scene / node mismatch.

---

## Root Cause Summary
The repo currently has a **split truth problem**:
- runtime start location can be correct
- opening prose can still relocate the player mentally to Shelkopolis
- first choice labels often call Shelkopolis-first nodes
- notice board defaults remain Shelk-centric
- shared Stage I consequence prose still over-assumes Shelk institutions

This creates a false feeling of breadth while actually collapsing early play into one dominant polity voice.

---

## Ranked Implementation Priorities

### Critical blockers
1. Fix Notice Board readability and mobile corruption.
2. Protect the central narration panel as the primary Story-screen anchor.
3. Remove silent wrong-polity Stage I openings.
4. Localize Stage I notices / first-node hooks / first NPC and authority chains by background locality.
5. Remove stale V28_4 canon references from runtime-facing docs and narration specs.

### High-value improvements
1. Convert shared Shelkopolis-first openings into locality templates or locality forks.
2. Ensure each Stage I locality has its own authority surface, public node, spiritual/civic node, and freight/route node.
3. Make repeated investigation cause visible public or procedural change after 2-3 meaningful actions.
4. Sharpen class-readable scene language in the central narration panel.

### Medium-priority refinements
1. Reduce repeated clue-confirmation text.
2. Tighten spacing and hierarchy across desktop and mobile Story screen.
3. Normalize locality-facing lore labels and institutional naming.

### Later-pass polish
1. Extra prose richness once locality truth is stable.
2. Further per-background sensory differentiation after the structural audit is complete.
3. Additional decorative UI only after hierarchy and mobile stability are correct.

---

## Fix Strategy

### Strategy principle
Do not solve this by rewriting the entire game.
Solve it by:
1. localizing Stage I truth
2. protecting Story-screen hierarchy
3. templating first-node locality variants
4. cleaning the canon authority chain

### Stage I localization pattern
For each active rooted locality, define a localized Stage I surface set:
- public gathering node
- authority / administration node
- route / freight / checkpoint node
- ritual / shrine / memorial / civic-social node
- records / archive / registry / bureau node where appropriate
- first named NPC / contact set
- first notice-board tone and public pressure set

Then map each background into those local surfaces without changing broader mechanics.

### Pacing-density rule
By the end of every 2-3 meaningful Stage I actions, the player should gain at least one of:
- new access
- named pressure
- route change
- authority interest
- social consequence
- physical evidence change
- public notice escalation
- class-authentic advantage

---

## Final Direction To Implementation Tools
The repo does **not** need a broad feature redesign.
It needs a disciplined canon-alignment and hierarchy pass that makes the already-stronger build actually feel coherent, local, and immediately rewarding.

The winning move is:
- keep the current stronger runtime foundation
- stop Shelkopolis from swallowing non-Shelk Stage I starts
- treat the narration panel as a first-class system
- make the notice board readable and stable
- bring all surfaced lore authority into V28_8

