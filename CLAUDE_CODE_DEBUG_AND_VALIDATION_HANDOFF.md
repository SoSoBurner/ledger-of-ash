# CLAUDE CODE DEBUG AND VALIDATION HANDOFF

## Role of this pass
This pass happens after the implementation-oriented cleanup and reconciliation edits.

Your job is to:
- test the live-flow quality of the corrected build
- catch runtime-vs-stale drift that survived implementation
- audit Story-screen hierarchy under actual play
- audit mobile portrait behavior
- audit Notice Board stability
- audit Stage I–II truth and coverage honesty
- tighten scene-state behavior without widening scope

You are not here to reopen design scope.
You are here to validate, debug, and refine the shipped direction.

---

## Hard constraints
Do not widen into unrelated systems work.
Do not redesign combat, progression, party architecture, or unrelated UI systems.
Do not revert the first-class central narration requirement.
Do not preserve stale V28_4 truth for convenience.

---

## Core validation goals
Confirm that the updated build now delivers:
- correct repo-facing truth
- correct shell/build alignment
- correct Stage I locality grounding under V28_8
- correct active-vs-stale file classification in practice
- stable Story-screen hierarchy on desktop and mobile
- readable Notice Board on desktop and mobile
- honest Stage II coverage signaling
- no stale scaffold leakage into active runtime behavior

---

## Priority audit stack
Run audits in this order:
1. **repo-truth audit**
2. **build-pipeline audit**
3. **runtime-vs-stale audit**
4. **Story-screen hierarchy audit**
5. **mobile portrait audit**
6. **Notice-system audit**
7. **Stage I–II coverage and truth audit**
8. **party-depth truth audit**
9. **final cleanup and polish pass**

---

## 1. Repo-truth audit
Verify that:
- README now says V28_8, not V28_4
- README count claims match the active runtime
- README names the live runtime correctly
- current docs do not still present `world-data.js / scenes.js / consequences.js` as active core runtime
- stale/historical docs are clearly labeled as archived if retained

### Failure signals
- any active README or root doc still says V28_4 is the live canon
- active docs still say 25/75/85/11/4 as live repo truth
- build docs and runtime docs disagree on file authority

---

## 2. Build-pipeline audit
Verify:
- `index.html` imports only active runtime files
- `build.py` inlines only files actually imported by shell
- stylesheet authority is singular
- `dist/index.html` does not silently include stale scaffold code
- archived files are no longer build-active

### Specific checks
- compare modular shell imports to build input list
- grep built artifact for stale scaffold identifiers after cleanup
- ensure build output still runs offline

### Failure signals
- build.py still reads old scaffold files
- shell and build disagree on CSS source
- built artifact includes stale scaffold code that modular shell no longer loads

---

## 3. Runtime-vs-stale audit
Confirm:
- `data.js + engine.js` are plainly the live runtime core
- `background-locality-map.js` is either removed, synced, or explicitly secondary
- `stage2-backgrounds.js` coverage status is truthful
- stale scaffold files are out of the live runtime path

### Failure signals
- split start-locality authority still exists with mismatched data
- stage2 coverage is still overclaimed
- stale old files remain in active build assumptions

---

## 4. Story-screen hierarchy audit
Confirm that the Story screen reads in this order:
1. header
2. narration panel
3. “You chose”
4. roll
5. result
6. choices

### Required checks
- start multiple fresh legends
- take at least 5 meaningful actions in each
- inspect scene after each refresh
- inspect after camp, service use, encounter, and locality-adjacent Stage II actions

### Failure signals
- narration is not the first full-width story block
- result text outranks place-state
- live choices are visually muddled with transcript/log behavior
- old scene text accumulates as equal-weight clutter

---

## 5. Mobile portrait audit
Test narrow portrait widths after multiple turns.

### Required checks
- narration remains first major block after header
- result remains below narration
- choices remain below result
- side surfaces do not outrank the scene anchor
- notices, results, and choices wrap cleanly with no horizontal overflow

### Failure signals
- mobile reads like one long equal-weight stack
- dense buttons visually bury narration
- notice text clips or overflows
- result cards jump above narration

---

## 6. World-motion / Notice-system audit
Open the Notice Board after enough world motion to produce multiple entries.

### Required checks
- entries remain visually separated
- section labels remain legible
- long entries wrap cleanly
- scrolling remains stable
- repeated openings do not corrupt layout
- unread/read grouping remains understandable

### Failure signals
- merged notice wall
- clipping or overflow
- label/body confusion
- mobile instability

---

## 7. Stage I–II coverage and truth audit

### Stage I truth checks
For multiple starts, verify:
- header locality
- first meaningful scene locality
- first investigation chain locality
- first notice tone
- first named-contact tone
- first service/freight/authority texture
- no silent wrong-polity leakage

### Stage II truth checks
Verify:
- bespoke Stage II backgrounds use bespoke content where declared
- fallback backgrounds clearly function through generic/family fallback
- no doc claims 93 bespoke Stage II branches if only 72 are present

### Failure signals
- wrong-polity leakage
- docs overclaiming bespoke coverage
- background-locality split still producing mismatches

---

## 8. Party-depth truth audit
This is a truth audit, not a redesign pass.

### Verify
- whether current party/companion hooks are actually wired
- whether current repo-facing claims overstate companion behavior
- whether any loaded stale helper still throws runtime errors or dead-hooks the scene

### Failure signals
- engine still expects missing global hooks
- companions are still claimed as fully active when they are not
- stale loaded helper code remains misleading or brittle

---

## 9. Final cleanup and polish pass
Only after all audits above pass:
- tighten repetitive narration wording
- tighten result/narration differentiation
- tighten notice text wrapping or spacing
- remove any remaining stale labels or comments that would mislead a maintainer

Do not widen scope.

---

## Specific bug watchlist for this pass
Use this list as targeted probes during validation:
- missing or duplicated start-locality authority
- `spellthief_frontier` locality map omission if map helper is still retained
- stale V28_4 labels in active docs or artifacts
- build still reading inactive files
- stage2 background coverage overclaim
- companion globals expected by engine but not exported in retained helper code
- any stale single-file artifact still posing as current release output

---

## Exit condition
This pass is complete only when:
- repo truth is stable
- shell/build parity is stable
- narration remains first-class
- notices remain readable
- Stage I–II truth is honest
- stale scaffold leakage is no longer present in active runtime-facing surfaces
