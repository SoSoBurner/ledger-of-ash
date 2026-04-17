# UI AND NARRATION PANEL SPEC

## Purpose
This document defines the required Story-screen hierarchy, the exact behavior of the central narration panel, the mobile treatment, and the Notice Board strengthening required for the next implementation pass.

This is a hard runtime/UI correction pass, not optional polish.

---

## Defining requirement

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

---

## Current-state UI diagnosis

### What is already correct
- the current center column already places `#narrative` above `#result` and `#choices`
- the shell no longer behaves like the old single-file overlay stack
- the current layout already hints at the right primary reading order

### What is still wrong
- header information is still thin and too compact to fully anchor place-state
- the action/result layer is underdefined
- there is no stable “You chose” slot
- there is no stable roll slot
- narration composition is still relatively lightweight and not always changed-state rich enough
- the right-side panel stack can still compete too much for attention on narrow widths
- notices are rendered as a generic panel/card stack rather than a managed information surface

---

## Story-screen layout order

## Mandatory desktop order
1. **Header strip**
2. **Central narration panel**
3. **You chose strip**
4. **Roll strip**
5. **Outcome / result card**
6. **Live choice stack**
7. **Secondary management surfaces**

## Mandatory mobile portrait order
1. **Header strip**
2. **Central narration panel**
3. **You chose strip**
4. **Roll strip**
5. **Outcome / result card**
6. **Live choice stack**
7. **Secondary launchers / panels**

Everything else is secondary.

---

## Exact placement of the central narration panel

### Placement
The narration panel must sit:
- directly below the location / settlement / time / state header
- above any “You chose” line
- above any roll display
- above any success/failure result card
- above the live choice list

### Not acceptable
The narration panel must not be:
- appended after result text
- pushed below choices
- rendered as decorative flavor in a rail
- moved into a modal
- turned into a recap block
- merged with notices, journal, codex, or result text

---

## Exact function of the central narration panel
The narration panel exists to answer:
- where the player is
- what the place feels like right now
- what pressure is now in the air
- what changed because of the recent action
- how that change reads through the player’s class and situation

It is the **scene anchor**.

### It is not
- a quest summary
- a roll log
- a result card
- a codex entry
- a journal transcript
- a Notice Board substitute

---

## Composition inputs
Each narration refresh should compose from live state.

### Minimum inputs
- current locality
- current safe zone / sub-context where available
- day / time / pressure state
- background-locality truth for Stage I
- route state
- faction / authority posture
- recent action type
- recent action result
- hazard or creature pressure
- recent service / access change
- recent destination widening memory where present
- class-authentic emphasis

### Required changed-state rule
The narration must repaint the place as changed, not merely restate a baseline locality paragraph.

---

## Class-authentic readability rules

### Martial / combat players must be able to read
- protection posture
- threat presence
- wound exposure
- stance and readiness
- gear relevance
- front-line consequence

### Spellcasters must be able to read
- magical resource pressure
- ward / rite context
- active magical tension
- prepared option relevance
- magical consequence risk

### Stealth players must be able to read
- concealment quality
- suspicion / noise state
- position quality
- infiltration tool relevance
- escape viability
- exposure risk

### Support / procedural players must be able to read
- structure that is failing
- process weakness
- who still has capacity to help
- what logistical or civic leverage is available
- what practical service or record surface matters next

---

## Refresh rules

### Full refresh rule
The narration panel must fully refresh after every meaningful:
- player choice
- encounter shift
- locality change
- time change
- pressure change
- route-state change
- service interaction
- faction posture change
- Stage II adjacency reveal

### Meaningful refresh rule
A good refresh answers:
- what is visibly different now
- who is acting differently now
- what feels more open or more closed
- what became riskier or safer
- what new leverage or blockage exists

---

## Correct and incorrect behavior examples

### Correct
Header: `Panim Haven · Day 3 · Morning · Level 2`

Narration panel:
- names Panim Haven specifically
- paints its memorial / registry / depot atmosphere in the present moment
- mentions what the recent investigation changed in public posture, authority tension, or access
- reflects the player’s class lens

“You chose” strip:
- `Checked the broken seal at the supply depot`

Roll strip:
- `D20 14 + Lore 3 = 17 vs 12`

Result card:
- `Success. The depot record no longer matches the posted memorial sequence.`

Choices:
- next live actions only

### Incorrect
- header is present, but narration appears below result text
- narration is just a static locality paragraph repeated after every action
- result text and narration are merged into one wall of text
- old results remain visually equal to the current scene anchor
- notices or side panels appear before the scene anchor on mobile

---

## Practical implementation direction

### Required stable scene slots
Add or formalize these containers in the center column:
- `#storyHeader`
- `#narration`
- `#actionStrip`
- `#rollStrip`
- `#result`
- `#choices`

### Important note
Do not solve hierarchy by adding more transcript blocks.
Do not move historical accumulation into the main scene stack.
Move historical accumulation to:
- journal
- legends / hall
- controlled recap surfaces

---

## Desktop treatment

### Global hierarchy
Desktop should preserve three layers:
- **center column** = current scene
- **secondary side stack** = map / notices / sheet / journal / camp / legends
- **header / controls** = global navigation only

### Center column rules
- narration must be visually dominant over result
- result must be visually dominant over choices only as a recent-event layer, not as the primary anchor
- choices must remain clearly grouped and immediately actionable
- old text must not accumulate in the live scene stack

### Side surfaces
The right-side stack may continue to exist, but it must remain visually secondary to the current scene.

---

## Mobile portrait treatment

### Required rules
- header may condense, but cannot disappear
- narration must remain the first major text block after the header
- result must remain below narration
- choices must remain below result
- side panels / launchers must not jump above narration
- spacing between narration, result, and choices must remain explicit
- no horizontal overflow on notices or result text

### Mobile risk to avoid
Do not let dense button stacks or generic cards make the page read like one long equal-weight column.

---

## Notice Board structural strengthening

## New requirement
The Notice Board must be treated as a **managed information surface**, not just another generic card stack in a long column.

### Required Notice Board behavior
- clear entry separation
- stable unread/read grouping
- long-text wrapping without overflow
- consistent padding and line height on mobile
- no visual card collisions
- no reliance on generic `.card` styling alone
- section labels must be visually distinct from notice body text

### Required Notice Board CSS targets
At minimum, use dedicated selectors such as:
- `.notice-board`
- `.notice-group`
- `.notice-section-label`
- `.notice-card`
- `.notice-text`
- `.notice-meta`
- `.notice-day`

### Required Notice Board UI rule
If the board remains a right-side panel, it still needs dedicated markup and styling.
If it moves to a drawer/overlay later, the same information design rules still apply.

---

## Spacing and hierarchy rules
- narration panel must have the strongest border/accent treatment in the scene column
- result card must be visually separate from narration, but subordinate to it
- choices must not share the same visual language as static lore cards
- generic utility cards must not visually outrank the primary scene anchor
- header, narration, result, and choices must read as one controlled scene flow

---

## Minimum implementation notes
1. preserve current index order advantage where narration already comes first
2. add explicit scene sub-slots instead of transcript accumulation
3. strengthen narration refresh logic in `narrative.js`
4. add dedicated notice styling and layout rules
5. test portrait mobile after repeated turns, not just at fresh load

---

## Release gate for this spec
This spec is not satisfied until:
- narration is first-class
- the scene reads in the required order on desktop and mobile
- notices are readable as a managed surface
- result text is distinct from narration
- choices remain the next-action layer rather than another transcript fragment
