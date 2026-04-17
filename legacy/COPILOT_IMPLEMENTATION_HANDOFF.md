---
> **ARCHIVED FOR HISTORY ONLY**
> This document is kept for reference and context only.
> It reflects planning or spec work from prior sessions.
> Do not treat this as current documentation.
---

# COPILOT IMPLEMENTATION HANDOFF

## Role of This Pass
This pass is for the implementation tool that will make the next concrete repo edits.

Your job is not to redesign Ledger of Ash.
Your job is to bring the current build into **V28_8 Stage I canon alignment** and **Story-screen hierarchy compliance** while keeping all unrelated systems unchanged.

---

## Non-Negotiable Scope Boundary
You are only authorized to change, rewrite, remap, or reframe:
- locations
- backgrounds
- opening scene locality logic
- Stage I locality grounding
- narration text
- lore canon references
- canon sourcing logic
- institution / polity / settlement / route / faction / law / ritual / infrastructure references where required to make the above correct

Do not redesign:
- combat systems
- progression systems
- archetype trees
- party system foundations
- core save model
- unrelated feature systems
- broader UI beyond what is required to enforce the Story-screen / narration-panel mandate and Notice Board readability

---

## Required Source Order
Use this source order exactly:
1. inspect `README.md` only for current runtime/build context, not final canon truth
2. inspect `V28_8_DnD_World_Repository.zip` as the canon source of truth
3. inspect:
   - `00_PACKAGE_MANIFEST/package_manifest.json`
   - `00_PACKAGE_MANIFEST/source_authority_map.json`
   - `00_PACKAGE_MANIFEST/source_inventory.json`
4. inspect `01_CANON_GOVERNANCE`
5. inspect `03_LOCALITY_ENGINE`
6. inspect `05_RUNTIME_ENGINE` only where runtime coexistence requires it
7. inspect `02_CANON_BASELINE` only when locality packets depend on it
8. inspect `03_RECONCILIATION_LAYER` and `04_CONSERVATIVE_INFERENCE` only when a real gap exists

## Canon rule
V28_8 wins over all V28_4 repo assumptions.
Do not preserve a V28_4 locality, institution, polity, route, faction, or narration label when V28_8 supersedes it.

---

# V28_8 CANON ALIGNMENT AUDIT

## Must audit and correct
- `README.md`
- `docs/CANON_UPDATE.md`
- `docs/NARRATION_PACKET.md`
- runtime-facing canon labels in `js/world-data.js`
- opening scene text
- early Stage I node text
- Stage I notice copy
- Stage I NPC/contact naming
- locality, polity, institution, route, law, ritual, and faction references surfaced to the player

## Known repo drift to correct
The repo currently contains mixed signals:
- older surfaces still claim V28_4 canon
- runtime already contains stronger rooted-locality support than some stale docs imply
- the build still relies on the older static-browser structure in multiple places

Correct the canon and locality truth.
Do not widen scope into runtime-architecture evangelizing.

---

# STAGE I LOCALITY CONSISTENCY AUDIT

## Non-negotiable rule
For Stage I, background location and current playable location must match under V28_8.

## Required background audit
For every implemented background, verify:
1. background location
2. actual Stage I physical play location
3. opening-scene locality
4. first-choice locality
5. Stage I consequence-node locality
6. Stage I notice and NPC locality
7. narration fidelity to V28_8
8. whether any Stage I content silently relocates the player into another polity
9. whether any lore text still reflects V28_4 assumptions or stale naming

## Required fix behavior
- Stage I header must show the actual current location, and for Stage I that location must be the background locality under V28_8.
- Life overview / intro may mention travel history, prior service, house ties, academy ties, trade ties, or route ties.
- The first playable scene must remain in the background locality.
- Broader inter-polity widening happens later through Stage II+.
- Do not preserve a hybrid where the header shows one place while the prose, notices, first nodes, or consequence chain assume another.

---

## Known Wrong-Locality Opening Groups
These opening groups require immediate audit and likely rewrite because their Stage I prose still reads as Shelkopolis-first while the runtime location is elsewhere.

### Panim-linked openings
- `k_order`
- `pr_panim`
- `nc_panim`

### Fairhaven-linked openings
- `r_shelk`
- `pr_community`

### Mimolot-linked openings
- `wz_mimolot`
- `nc_mimolot`
- `iq_mimolot`
- `or_mimolot`

### Aurora / Sheresh-linked openings
- `r_sheresh`
- `nc_sheresh`
- `el_sheresh`
- `al_sheresh`
- `or_sheresh`
- `bm_sheresh`

### Ithtananalor / Roaz-linked openings
- `w_roaz`
- `p_eloljaro`
- `cl_eloljaro`
- `eg_roaz`
- `or_ithtananalor`
- `wl_roaz`

### Soreheim-linked openings
- `w_frontier`
- `r_soreheim`
- `b_soreheim`
- `wz_field`
- `wa2_soreheim`
- `wl_soreheim`
- `bm_soreheim`

### Guildheart-linked openings
- `cl_remeny`
- `ro_union`
- `ro_nomdara`
- `tr_nomdara`
- `sn_remeny`

### Sunspire-linked openings
- `a_frontier`
- `b_frontier`

### Shirshal-linked openings
- `iq_shirsh`

### Cosmoria-linked openings
- `th_cosmouth`

Use these as the first rewrite list.
Do not assume they are the only mismatches.
Audit the full implemented set.

---

## Concrete Files / Components Likely To Change

### Primary runtime files
- `js/engine.js`
- `js/world.js`
- `js/scenes.js`
- `js/consequences.js`
- `js/world-data.js`
- `css/style.css`
- `index.html`

### Secondary documentation / canon surfaces
- `README.md`
- `docs/CANON_UPDATE.md`
- `docs/NARRATION_PACKET.md`

---

## What To Edit First

### 1. Canon authority cleanup
First, correct the repo’s stated canon authority.
Remove or update stale V28_4-facing repo surfaces that would mislead the next pass.

### 2. Background locality map audit
Verify that every implemented Stage I background maps to the correct playable locality under V28_8.

### 3. Opening scene rewrite pass
Rewrite wrong-polity openings so the first playable scene physically occurs in the background locality.

### 4. Early node and consequence localization pass
Audit early consequence nodes and first chain beats for silent Shelk-first staging.
Localize, fork, or template these where necessary.

### 5. Stage I notice and NPC localization pass
Make sure notices, contacts, shrine/civic surfaces, freight/service surfaces, and public pressure all align to the same local polity.

### 6. Story-screen hierarchy refactor
Refactor the current center-column scene rendering so the central narration panel becomes the first full-width scene-text block under the header.

### 7. Notice Board responsive pass
Add explicit notice-specific CSS and tighten mobile presentation.

### 8. Final repo-facing doc cleanup
After implementation stabilizes, update README/docs to match the corrected state.

---

## Story-Screen Implementation Direction
The central narration panel must occupy the primary scene-text slot on the Story screen.
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

### Practical implementation note
The current rendering model appends narration, choice records, rolls, and result text into a common narrative stream.
Refactor this into stable scene slots instead of increasing transcript volume.

Recommended direction:
- keep a dedicated current-scene narration container
- keep a dedicated current action/result container
- keep a dedicated live choice container
- move historical accumulation to journal/history surfaces or a controlled recap layer

Do not solve this by moving narration into a modal or side panel.

---

## Notice Board Critical Fix
Treat Notice Board readability as a blocker.

### Current problem pattern
Notice markup exists, but notice-specific CSS treatment is too weak.
This is likely why the mobile notice surface can become unreadable or visually corrupted.

### Required fixes
Add and tune explicit styles for:
- `.notice-card`
- `.notice-text`
- `.notice-day`
- `.notice-section-label`

Required behavior:
- long text wraps cleanly
- no horizontal overflow
- no card overlap
- clear entry separation
- readable padding and line height on mobile
- stable scrolling inside the overlay

---

## Stage I Locality Fix Strategy
If the build relies on Shelkopolis-first consequence nodes, do not preserve that structure by lying in the header.
Instead:
- localize the node
- fork the node
- or template the node into locality-specific variants

### Minimum variant categories to support
For each active starting locality, early Stage I should have local equivalents for:
- authority / office pressure
- records / archive / clerk access
- shrine / memorial / ritual pressure
- dock / depot / wagon / freight / gate / market pressure
- named local contact exposure
- rumor / public notice / closure / warning flow

The broader eastern-route crisis can stay shared at a higher level.
The player’s lived Stage I space must be local.

---

## What To Avoid
Do not:
- redesign combat or progression
- add unrelated party features
- widen scope into a general UI rewrite
- replace class readability with generic flavor prose
- preserve stale V28_4 labels for convenience
- silently keep a hybrid where header, prose, notices, and node chains disagree
- turn the narration panel into a recap block below the result cards

---

## What To Debug Carefully
- opening scene text vs actual rooted location
- first-choice locality vs header locality
- Stage I consequence-node polity assumptions
- Stage I notice generation locality
- Stage I NPC/contact locality
- route labels and public institutions
- any stale Shelkopolis-only assumptions leaking into non-Shelk starts
- any stale V28_4 naming in runtime-facing text
- mobile notice overlay wrapping and spacing
- center-column hierarchy after many turns

---

## Verification Before Commit
Before committing, verify all of the following:
- every implemented Stage I background remains physically located in its own background locality
- no opening scene, first node, notice, NPC list, route label, or consequence node silently relocates the player into the wrong polity
- all location/background/narration/lore references align to V28_8
- unrelated mechanics remain unchanged
- the central narration panel is the first full-width scene-text block under the header
- the player reads the Story screen in the required order
- the Notice Board is readable on desktop and mobile
- repeated investigation now produces visible access, social, or environmental change often enough to preserve momentum

### Final grep-style sanity checks
Before finalizing, run targeted searches for stale locality/canon drift such as:
- `V28_4`
- `Shelkopolis`
- stale institution labels
- stale polity labels
- stale route labels

Then inspect any remaining matches manually.
