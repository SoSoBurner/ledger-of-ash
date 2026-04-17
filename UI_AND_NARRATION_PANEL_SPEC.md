# UI AND NARRATION PANEL SPEC

## Purpose
This document defines the required Story-screen hierarchy, the exact behavior of the central narration panel, and the responsive treatment needed to keep Ledger of Ash readable, atmospheric, and class-authentic on desktop and mobile.

This is not optional polish.
This is a first-class implementation requirement.

---

## Defining Requirement

**The central narration panel must occupy the primary scene-text slot on the Story screen.**
That means:
- it is the first full-width story-text block immediately below the location / settlement / time / state header
- it is directly above the “You chose,” roll, outcome/result, and live choices
- it remains inline on the main Story screen
- it is not a modal, not a lower recap block, not a side panel, not a result card, and not decorative flavor
- the player must read the Story screen in this order:
  1. where they are
  2. what the current place feels like right now
  3. what just happened
  4. what they can do next

This narration panel is one of the defining features of the finished game and must be treated as a **first-class system**, not a polish detail.

---

## Current Structural Problem
The current runtime already contains atmospheric locality text, but the center column is still structurally unstable.

At present, the implementation behaves like a rolling transcript:
- location/environment information is surfaced in the environment panel
- narration, chosen action, rolls, result text, and choices all append into the same narrative stream
- the center column therefore reads like a scrolling log instead of a controlled scene hierarchy

This causes four problems:
1. the place-state is not visually protected as the primary anchor
2. result text competes with atmospheric text instead of following it
3. repeated scenes accumulate as equally weighted blocks
4. mobile sessions become crowded and hierarchy degrades faster than desktop

The fix is **not** to add more prose.
The fix is to create a stricter hierarchy and a dedicated narrative slot.

---

## Story Screen Layout Order

## Mandatory reading order
Every Story-screen render must present information in this order:

1. **Location / Settlement / Time / State header**
2. **Central narration panel**
3. **You chose**
4. **Roll display**
5. **Outcome / result card**
6. **Live choices**

Everything else is secondary.

## The hierarchy rule
The player should never need to scan past a result card, notice card, journal block, or sidebar block in order to understand where they are and what this place currently feels like.

---

## Desktop Treatment

## Global layout
Desktop should preserve a three-plane hierarchy:
- **Left rail** = character and play-state reference
- **Center column** = current scene
- **Right rail / auxiliary zones** = secondary information and management surfaces

## Left rail treatment
The left rail should remain information-dense but visually stable. It should include, in a clearly ordered stack:
- identity block
- archetype / role line
- vitals / readiness
- axis tick / progression / standing summary where already supported
- skill lines
- current location / current time reference if repeated there
- compact equipment / wound / resource / pressure signals where already supported

The left rail is not the place to carry primary scene prose.
It is the place to support interpretation.

## Center column treatment
The center column must be restructured into stable scene slots:
1. **Header strip**
2. **Primary narration panel**
3. **Action/result strip**
4. **Choice stack**

The center column must not behave like a long flat transcript where old narration, old choices, and new result cards carry the same weight.

## Right rail / side surfaces
The right rail can continue to carry:
- quest / stage summary
- party / camp info
- faction summaries
- journal / codex shortcuts
- notices launcher
- map launcher

But it must remain visually secondary to the center scene column.

---

## Mobile Portrait Treatment

## Mobile rule
Mobile must preserve the same hierarchy as desktop.
It must not collapse into a long stack of equally weighted text blocks.

## Required mobile order
On mobile portrait, the main Story surface must still read in this order:
1. header
2. central narration panel
3. action/result strip
4. choice stack
5. optional secondary controls and launchers

## Mobile treatment details
- The header can condense, but it cannot disappear.
- The narration panel must remain the first large block after the header.
- Result text must stay below the narration panel.
- Live choices must remain below the result area.
- Auxiliary panels and overlays must not visually outrank the narration block.

## Mobile spacing rules
- Avoid thin gutters that make cards feel glued together.
- Maintain clear vertical separation between narration, result, and choices.
- Protect line length and line wrapping on notices and result text.
- Do not allow dense button stacks to visually bury the narration panel.
- Do not let long notices or long result text force horizontal overflow.

---

## Exact Placement of the Central Narration Panel

## Placement
The central narration panel must sit:
- directly below the location / settlement / time / state header
- above any “You chose” line
- above any roll text
- above any success/failure result card
- above the live choice list

## Not acceptable
The narration panel must not be:
- appended lower in the transcript after the result
- rendered as a recap below choices
- moved into a modal
- rendered as decorative flavor in the side rail
- reduced to a tooltip or hover detail
- merged into the notice board or journal

---

## Exact Function of the Central Narration Panel
The central narration panel exists to answer:
- where the player is
- what the place feels like right now
- how the player’s recent action has changed that place-state
- what kind of pressure now hangs in the air

It is the **scene anchor**.

It is not:
- a quest summary
- a recap of all prior turns
- a codex entry
- a log of dice math
- a notice board substitute
- a result card substitute

---

## Composition Inputs
Each narration refresh should compose from the current runtime state rather than recycle a static paragraph.

Minimum composition inputs:
- current locality
- district / site / room / approach context where supported
- time-of-day and in-world day pressure
- background-locality truth for Stage I
- current route state
- current faction / authority posture
- recent action type
- recent action result
- recent access change
- recent hazard or suspicion shift
- recent public or institutional response
- class-readable play-state emphasis

## Class-authentic readability rules
The narration panel must surface what matters to the current play style.

### Martial / combat players must be able to read:
- protection posture
- immediate threat
- wound exposure
- stance and readiness
- gear relevance
- front-line consequence

### Spellcasters must be able to read:
- magical resource pressure
- active effects
- wards or ritual context
- prepared option relevance
- ambient magical tension
- arcane consequence risk

### Stealth players must be able to read:
- concealment quality
- suspicion / noise state
- position quality
- infiltration tool relevance
- escape viability
- exposure risk

The prose can remain atmospheric, but it must still support tactical interpretation.

---

## Refresh Rules

## Full refresh rule
The narration panel must **fully refresh** after every meaningful:
- player choice
- locality change
- time change
- pressure shift
- route shift
- faction shift
- hazard shift
- consequence shift

It should not make tiny micro-edits to old text.
It should repaint the place as newly changed.

## Meaningful refresh rule
A refresh should answer:
- what is visibly different now
- who is acting differently
- what feels more open or more closed
- what has become riskier or safer
- what new pressure or leverage is now present

---

## Style Rules
The panel must use:
- immediate sensory prose
- locality-specific details
- player-embodied perspective
- archetype-authentic emphasis
- concise but rich scene painting
- changed-state language after each meaningful turn

The panel must avoid:
- lore dumping
- generic filler
- quest-summary voice
- repeated stock phrasing
- detached omniscient narration
- decorative language that hides gameplay meaning

## Correct tone
The prose should feel like the world is responding in real time to the player’s presence and actions inside a specific place.

---

## Correct vs Incorrect Behavior

## Correct behavior
**Header:** Panim Haven, lower quay, late afternoon, public pressure rising  
**Narration panel:** The lower quay has gone quieter since the memorial notices were posted. Families linger in twos and threes rather than clusters, and the depot clerks keep glancing toward the sealed freight cage before they speak. Your last question has not closed the room. It has made everyone in it more careful.  
**You chose:** Press the dock ledger clerk about the missing seal record.  
**Roll:** D20 + Lore  
**Result:** Success. The clerk admits the entry was amended after noon and gives you the copied wagon mark.  
**Choices:** Follow the copied mark / ask who ordered the amendment / check the memorial route / leave for the shrine stairs

Why this is correct:
- place-state comes first
- the scene has changed because of the player
- result text is separate from scene text
- choices follow the outcome
- the scene remains local to Panim Haven

## Incorrect behavior
- The header says Panim Haven, but the narration opens as if the player is already in Shelkopolis.
- The panel says only “You review the situation” with no locality texture.
- The result block appears before the place-state prose.
- The scene prose is hidden below several old transcript entries.
- The player must scroll through old roll cards to find the current place-state.

---

## Difference From Other Surfaces

## Not the same as result text
The narration panel describes the **current lived scene**.
The result card describes the **direct outcome of the last action**.

## Not the same as the Notice Board
The notice board is a public world-motion surface.
It summarizes wider rumors, directives, losses, closures, offerings, and civic/public information.
It does not replace the immediate scene anchor.

## Not the same as the Journal
The journal is a history and reference surface.
It is not the primary current-scene renderer.

## Not the same as the Codex
The codex is background truth and reference knowledge.
It is not the active scene.

---

## Repeated Clue-Chain Progress Rule
Repeated investigation must stop feeling like “confirmation only.”

When the player follows a repeated clue chain, the narration panel must increasingly show visible change in at least one of these categories:
- public behavior
- authority posture
- route access
- named contact openness
- physical site condition
- memorial / ritual tone
- market or service behavior
- faction watchfulness
- environmental hazard
- concealment difficulty

A repeat chain that only says “you confirm your suspicion” without changing access, posture, or place-state should be treated as a weak outcome.

---

## Stage I Locality Rule Inside Narration
For Stage I, the narration panel must remain fully local to the background locality under V28_8.

That means:
- Panim-linked starts narrate Panim Haven and Panim-local institutions, routes, pressures, and behaviors
- Fairhaven-linked starts narrate Fairhaven and Fairhaven-local market, observatory, shrine, cave-edge, or civic texture
- Mimolot-linked starts narrate Mimolot-local academy / archive / tariff / research / clerkly spaces
- Aurora-linked starts narrate Aurora Crown Commune / Sheresh-local infrastructure and public tone
- Roaz-linked starts narrate Ithtananalor / Roaz-local civic, legal, mercantile, or route logic
- Soreheim-linked starts narrate Soreheim-local frontier conditions
- Guildheart-linked starts narrate Guildheart-local guild / route / trade-space truth
- Shelk-native starts may stage in Shelkopolis / Principality of Shelk

The narration may mention broader eastern-route pressure, but it must frame that pressure as:
**you are here, in your local world, dealing with the local version of the eastern-route crisis**

---

## Canon Sourcing Rule for Narration
All location, background, institution, polity, route, law, ritual, and behavior details used in narration must be sourced from V28_8 rather than legacy repo assumptions.

Implementation tools must inspect:
1. `V28_8_DnD_World_Repository.zip`
2. `00_PACKAGE_MANIFEST/package_manifest.json`
3. `00_PACKAGE_MANIFEST/source_authority_map.json`
4. `00_PACKAGE_MANIFEST/source_inventory.json`
5. `01_CANON_GOVERNANCE`
6. `03_LOCALITY_ENGINE`
7. `05_RUNTIME_ENGINE` only where runtime coexistence requires it
8. `02_CANON_BASELINE` only when locality packets depend on it
9. `03_RECONCILIATION_LAYER` and `04_CONSERVATIVE_INFERENCE` only when a real gap exists

---

## Notice Board Behavior
The Notice Board is a critical blocker because it carries world motion, notices, rival activity, and public pressure.

## Required Notice Board behavior
- must remain readable on desktop and mobile
- must wrap long text cleanly
- must visually separate entries
- must separate section labels from notice bodies
- must support long notice histories without collapsing into visual corruption
- must preserve touch-safe scrolling and tap targets on mobile

## Required CSS treatment
The implementation pass must add explicit styling for notice-specific markup, including:
- `.notice-card`
- `.notice-text`
- `.notice-day`
- `.notice-section-label`

Minimum behavior requirements:
- no horizontal overflow
- no text overlap
- no card collapse
- no indistinct merge between consecutive notices
- no unreadably tight padding on mobile
- strong wrapping for long names, route labels, or institutional titles

---

## Choice Stack Behavior
The live choices must appear below the narration and result layers.

Choices must:
- be visually grouped as the next-action surface
- remain readable without scanning past prior transcript clutter
- avoid equal visual weight with lore or recap surfaces
- clearly communicate unavailable, risky, or gated states where already supported

---

## Result Card Behavior
The result card must remain distinct from narration.

A result card should show:
- what action was attempted
- whether it succeeded, failed, or partially succeeded
- what changed immediately
- what was gained, lost, opened, or worsened

It should **not** absorb the entire place-state description.
That belongs in the narration panel above it.

---

## Spacing and Hierarchy Rules
- Header is compact but authoritative.
- Narration panel is the first large text block.
- Result strip is smaller and more transactional.
- Choices are grouped and clearly actionable.
- Auxiliary surfaces never visually outrank the narration panel.
- Repeated old blocks should not push current scene text below the fold in normal play.

---

## Implementation Direction
This spec should be implemented by converting the Story screen from an append-only transcript model to a stable slot model.

That means:
- preserve a current scene anchor
- preserve a current action/result block
- preserve a current choice list
- move historical accumulation to journal/history surfaces or a controlled recap surface
- keep the notice board as its own overlay/system

Do not solve this by simply adding more narration into the current rolling feed.
That would increase prose volume while leaving the hierarchy failure intact.
