# LEDGER OF ASH MASTER UPDATE BRIEF

## Purpose
This package is the planning, diagnosis, repo-truth reconciliation, and implementation handoff pass for the current public `ledger-of-ash` repository.

It is not a redesign brief.
It is not a broad sequel pitch.
It is not permission to widen scope into unrelated systems.

Its job is to reconcile the live repo against the actual active runtime and the V28_8 canon direction, then hand an implementation tool a precise repair sequence.

---

## Executive diagnosis

### Primary diagnosis to preserve
The repo is no longer primarily failing because the active shell is empty.

It is failing because **two overlapping project shapes now coexist in the same repo**:

1. **A newer active Stage I–II runtime** centered on `index.html` + `js/data.js` + `js/engine.js`, with support from `js/narrative.js`, `js/background-locality-map.js`, and `js/stage2-backgrounds.js`.
2. **An older authored scaffold** still represented in `README.md`, `build.py` assumptions, `world-data.js`, `scenes.js`, `consequences.js`, old single-file artifacts, stale docs, and repo-facing batch notes.

The live problem is therefore:
- cleanup
- consistency
- canon truth
- source-of-truth clarification
- build-path correction
- stale file triage
- Stage I–II density honesty
- Story-screen hierarchy refinement

The live problem is **not** “there is no game.”

---

## What is clearly improved already
- The shell is real, playable, and no longer a blank placeholder.
- The current Story screen already has a center-column structure with separate `#narrative`, `#result`, and `#choices` containers.
- `data.js` contains a substantial V28_8-direction data layer: 31 archetypes, 93 generated backgrounds, 13 active key localities, route signatures, route atlas data, locality POIs, hazards, creatures, and stage-family scaffolding.
- `engine.js` already runs a functional Stage I–II loop using `BACKGROUND_ROUTE_SIGNATURES`, `ROUTE_ATLAS`, `STAGE2_DESTINATION_CONTENT`, `FAMILY_OBJECTIVES`, and `BUILD_VERIFICATION`.
- Stage II widening exists in active runtime form and is not purely hypothetical.
- Root-level handoff/spec docs already show that the repo had started moving toward V28_8-first correction, even though the repo-facing truth is still split.

---

## What is still broken or misleading

### 1. Repo-facing truth is inconsistent
Current contributor-facing surfaces disagree about:
- canon version
- active counts
- file authority
- build path
- whether the runtime is still `world-data.js` / `scenes.js` / `consequences.js`-first
- whether the project is still V28_4-oriented

### 2. README is actively wrong for the current repo
The README still describes:
- V28_4 as active canon
- 25 archetypes
- 75 backgrounds
- 75 opening scenes
- 85 consequence nodes
- 11 localities
- 4 recruitable companions
- a file structure centered on `world-data.js`, `scenes.js`, and `consequences.js`

That is no longer a reliable description of the live shell or the repo-root direction.

### 3. Build pipeline assumptions drift from the active shell
`build.py` still reads:
- `js/world.js`
- `js/world-data.js`
- `js/scenes.js`
- `js/consequences.js`
- `css/style.css`

But the live `index.html` shell currently imports:
- `js/data.js`
- `js/background-locality-map.js`
- `js/stage2-backgrounds.js`
- `js/narrative.js`
- `js/party.js`
- `js/combat.js`
- `js/engine.js`

And the shell uses **inline CSS in `index.html`**, not `css/style.css`.

### 4. Stage I individuality is more procedural than several docs imply
The live background model is real, but it is not a fully bespoke 93-opening authored matrix.

In `data.js`, backgrounds are generated as:
- `{archetype}_civic`
- `{archetype}_frontier`
- `{archetype}_occult`

Their first contradiction, first objective, and first locality grounding are mixed from locality data and archetype family rules.

That means the current live background model is:
- **not fake**
- **not empty**
- **not fully bespoke at Stage I either**

It is a **mixed procedural/runtime model**.

### 5. Stage II is mixed, not uniformly bespoke
`stage2-backgrounds.js` is loaded by the shell and provides real bespoke Stage II content, but it covers only **72 of 93** background IDs.

That means 21 backgrounds still rely on generic/family/procedural fallback in active runtime.

### 6. Start-state authority is split
Start locality is defined in more than one place:
- `data.js` via `originLocality`
- `background-locality-map.js` via `getStartingLocality()`

These are mostly aligned, but the parallel map is missing `spellthief_frontier`, which proves the split authority model is brittle.

### 7. Stale files are still living outside `legacy/`
Several old runtime or authored scaffold files remain in live repo paths and can still mislead contributors, builders, or coding tools:
- `js/world-data.js`
- `js/scenes.js`
- `js/consequences.js`
- `js/world.js`
- `bundle.min.js`
- `ledger-of-ash-single.html`
- `dist/README.md`
- old audit / upgrade docs

### 8. Party-system claims are overstated
The repo still claims a mature live party/companion system, but the loaded `party.js` is structurally misaligned with the active engine:
- engine expects `window.recruitChoice` and `window.companionBonus`
- loaded `party.js` does not provide those exports in the form the engine expects
- engine state uses `G.companions` as an array in some places
- loaded `party.js` treats `G.companions` as an object map

This is a truth problem even if the party layer is out of scope for major redesign.

### 9. Story layout is structurally better, but still too transcript-light and too thin
The center column is already closer to the right architecture than older states.
However:
- narration is still relatively lightweight
- result / utility surfaces still compete for visual weight
- there is no stable dedicated “You chose” / roll display strip
- mobile compression still risks flattening the hierarchy

### 10. Notice Board is improved but still underspecified as a system surface
The current notice rendering is just another right-stack panel rendered through reused card styles.
It should be treated as a managed information surface with explicit rules for:
- entry separation
- unread / archived state
- long-text wrapping
- mobile readability
- scroll stability

---

## Source-order rule for the implementation pass
Implementation tools must use this source order exactly:

1. inspect `README.md` **only** for current repo-facing claims, not canon truth
2. inspect `V28_8_DnD_World_Repository.zip` as canon source of truth
3. inspect the V28_8 manifest / authority files inside that package
4. inspect active runtime files to determine what is actually live
5. compare active runtime against stale scaffold files
6. classify and repair the repo accordingly

### Canon rule
Use **V28_8** as the sole canon authority for active repo truth.
Do not preserve V28_4 as active canon truth in runtime labels, README, docs, or build-facing handoff materials.

---

## Active runtime truth summary

### Current active shell
The current modular shell is:
- `index.html`
- `js/data.js`
- `js/background-locality-map.js`
- `js/stage2-backgrounds.js`
- `js/narrative.js`
- `js/party.js`
- `js/combat.js`
- `js/engine.js`

### Actual primary runtime core
The real primary Stage I–II runtime is:
- `js/data.js`
- `js/engine.js`

with active support from:
- `js/narrative.js`
- `js/stage2-backgrounds.js`
- `js/background-locality-map.js`

### CSS truth
The current live shell is **inline-style authoritative**, because `index.html` contains the active `<style>` block and does **not** link `css/style.css`.

### Counts truth visible from active runtime
The active runtime currently computes or exposes:
- 31 archetypes
- 93 generated backgrounds
- 93 route signatures
- 13 active key localities in `data.js`
- 72 bespoke Stage II background content entries
- 1 verified background-locality-map omission (`spellthief_frontier`)

### Architecture truth
- Stage I background model: **mixed procedural/runtime**
- Stage I locality grounding: **mixed / split authority**
- Stage II content: **mixed bespoke + family/procedural fallback**
- old `world-data.js` / `scenes.js` / `consequences.js`: **parallel stale scaffold**

---

## Ranked implementation priorities

### Critical blockers
1. README and repo-facing canon/scope drift
2. build pipeline drift against the live shell
3. active-vs-stale source ambiguity
4. stale files still outside `legacy/` or `archive/`
5. split start-state authority between `data.js` and `background-locality-map.js`
6. root contributors still being pointed at the wrong runtime shape

### High-value improvements
1. clarify `data.js` + `engine.js` as the live runtime core
2. rewrite README to V28_8 truth
3. remove old scaffold files from live build assumptions
4. either repair or remove stale loaded helpers (`party.js`, `combat.js`)
5. make Stage II coverage honesty explicit: bespoke where present, fallback where missing
6. formalize notice board as a managed surface
7. strengthen narration panel composition without changing the whole game

### Medium-priority refinements
1. normalize CSS authority to one source only
2. regenerate or archive single-file artifacts
3. consolidate batch verification docs into one current truth file
4. relabel stale docs as archived rather than current
5. add build-time verification of counts / shell imports / canon version

### Later-pass polish
1. deepen authored Stage I individuality beyond current procedural structure
2. fill the 21 missing bespoke Stage II background entries
3. repair and reconcile party/combat helpers if retained on the live path
4. broaden Stage III–V authored density after repo truth is stable

---

## Non-negotiable UI requirement

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

## Implementation sequence
1. Freeze repo truth: decide the authoritative active runtime path.
2. Rewrite README and active docs to that truth.
3. Realign `build.py` to the exact shell imports.
4. Remove unused stale scaffold files from the live build path.
5. Collapse Stage I start-state authority to one source.
6. Preserve current shell structure, but harden the Story screen hierarchy.
7. Upgrade Notice Board from generic card stack to managed information surface.
8. Make Stage II coverage truth explicit in docs and acceptance criteria.
9. Re-run counts and import verification.
10. Only then do deeper prose / density cleanup.

---

## Explicit out-of-scope boundary
Do not redesign the whole game.
Do not replace the active runtime with a new architecture just because it is imperfect.
Do not widen into unrelated feature work.
Do not turn this pass into a broad content rewrite.

This pass succeeds when the repo becomes truthful, internally consistent, and implementation-safe.

---

## Package contents
- `LEDGER_OF_ASH_MASTER_UPDATE_BRIEF.md`
- `RUNTIME_VS_STALE_SCAFFOLD_AUDIT.md`
- `BUILD_PIPELINE_REALIGNMENT_SPEC.md`
- `UI_AND_NARRATION_PANEL_SPEC.md`
- `COPILOT_IMPLEMENTATION_HANDOFF.md`
- `CLAUDE_CODE_DEBUG_AND_VALIDATION_HANDOFF.md`
- `ACCEPTANCE_CRITERIA_AND_TEST_MATRIX.md`
