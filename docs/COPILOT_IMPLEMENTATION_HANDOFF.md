# COPILOT IMPLEMENTATION HANDOFF

## Role of this pass
This pass is for the implementation tool that will make the next concrete repo edits.

Your job is not to redesign Ledger of Ash.
Your job is to reconcile the repo to its actual active runtime, align active repo truth to V28_8, and remove the active/stale split that is currently misleading contributors and polluting the build path.

---

## Non-negotiable scope boundary
You are authorized to change, rewrite, remap, or reclassify only what is required for:
- repo truth and documentation alignment
- canon version alignment to V28_8
- runtime-vs-stale-source reconciliation
- build pipeline correction
- stale file triage
- source-of-truth clarification
- Stage I–II locality/background/runtime alignment
- narrative panel and Story-screen hierarchy
- mobile information hierarchy
- notice-system structural improvement
- Stage I / Stage II content-architecture clarity
- acceptance criteria and test coverage support

Do not redesign:
- the whole game
- unrelated combat architecture
- the progression model
- archetype trees
- save model fundamentals
- broad new feature systems

---

## Required source order
Use this source order exactly:
1. inspect `README.md` only for current repo-facing claims, not canon truth
2. inspect `V28_8_DnD_World_Repository.zip` as canon source of truth
3. inspect the V28_8 manifest / authority files inside that package
4. inspect active runtime files to see what is actually live
5. compare active runtime against stale scaffold files
6. classify and repair the repo accordingly

### Canon rule
V28_8 wins over all V28_4 repo assumptions.
Do not preserve a V28_4 canon label in any active README, docs, runtime labels, or handoff materials.

---

## Current repo truth you should implement around

### Real active runtime core
- `js/data.js`
- `js/engine.js`

### Active support layer
- `js/narrative.js`
- `js/stage2-backgrounds.js`
- `js/background-locality-map.js` (temporary, redundant)

### Stale parallel scaffold
- `js/world.js`
- `js/world-data.js`
- `js/scenes.js`
- `js/consequences.js`

### Live shell imports today
- `js/data.js`
- `js/background-locality-map.js`
- `js/stage2-backgrounds.js`
- `js/narrative.js`
- `js/party.js`
- `js/combat.js`
- `js/engine.js`

### Truth warning
`party.js` and `combat.js` are still loaded but are not cleanly reconciled to the active engine contract.
Treat them as loaded parallel risk, not unquestioned active authority.

---

## Concrete files/components likely to change first

### Priority 1 — repo truth surfaces
- `README.md`
- `docs/CANON_UPDATE.md`
- `docs/CURRENT_BUILD_UPGRADE_PLAN.md`
- `docs/CURRENT_BUILD_AUDIT.md`
- `dist/README.md`

### Priority 2 — build/source-of-truth surfaces
- `build.py`
- `index.html`
- `css/style.css` or inline CSS source, depending on chosen authority strategy

### Priority 3 — runtime truth surfaces
- `js/data.js`
- `js/background-locality-map.js`
- `js/stage2-backgrounds.js`
- `js/narrative.js`
- `js/engine.js`

### Priority 4 — stale live-root cleanup
- `js/world.js`
- `js/world-data.js`
- `js/scenes.js`
- `js/consequences.js`
- `bundle.min.js`
- `ledger-of-ash-single.html`
- `dist_base_tmp/`

---

## What to edit first

### 1. Rewrite repo-facing truth before feature edits
Start by making the repo stop lying.

#### Update README to state
- active canon direction = V28_8
- current runtime core = `data.js + engine.js`
- stage model truth = live Stage I–II runtime exists
- active counts = computed from live runtime, not stale docs
- Stage II truth = mixed bespoke/fallback until completed
- stale scaffold files = archived or inactive, not live runtime authority

### 2. Normalize source authority
Choose one start-locality authority and implement it.

#### Required direction
- `data.js` background objects should become the sole active Stage I start-state authority
- `background-locality-map.js` should either be removed, auto-generated, or demoted to a synced helper

### 3. Realign build.py to the actual shell
Rewrite `build.py` so it consumes only what `index.html` actually imports.
Do not let it read old scaffold files after this pass.

### 4. Clean the live root
Move clearly stale scaffold files out of the live runtime path.
Use `legacy/` or `docs/archive/`.
Do not leave them at root or in active `js/` as if they still define the game.

### 5. Preserve and strengthen the current Story screen hierarchy
Current shell order is already closer to correct than older repo states.
Do not break that.
Improve it.

---

## What to avoid
- do not rebuild the whole runtime around `world-data.js`
- do not re-activate `scenes.js` / `consequences.js` just because they are fuller prose packets
- do not preserve V28_4 active labels for convenience
- do not widen into unrelated combat/progression redesign
- do not produce a hybrid repo where README says one thing, build.py assumes another, and shell imports a third
- do not keep duplicate authorities for background locality, counts, or canon version

---

## Specific repair tasks

### A. README truth alignment
Rewrite README so it no longer claims:
- V28_4 active canon
- 25 archetypes / 75 backgrounds / 85 nodes / 11 localities / 4 companions as current runtime truth
- `world-data.js`, `scenes.js`, and `consequences.js` as the live browser runtime center

### B. Build pipeline correction
Update `build.py` to:
- parse real imports from `index.html`
- inline exactly those imports
- stop reading stale scaffold files
- stop assuming a nonexistent stylesheet placeholder
- optionally emit a build manifest with counts

### C. CSS truth correction
Choose one source only:
- linked `css/style.css`, or
- inline `index.html`

Recommended implementation:
- move current inline CSS into `css/style.css`
- link it from `index.html`
- have `build.py` inline the link into `dist/index.html`

### D. Stage I–II runtime truth correction
Preserve this runtime conclusion in code comments and docs:
- `data.js + engine.js` are the real primary runtime
- Stage I is mixed procedural/locality-based
- Stage II is mixed bespoke + fallback

### E. Stage II coverage truth
Add a small generated or documented coverage summary:
- bespoke Stage II entries present: 72
- fallback Stage II entries present: 21

### F. Background-locality map bug
Repair or eliminate the missing `spellthief_frontier` mapping.
This is a proof point of split-authority brittleness.

### G. Story-screen hierarchy refinement
Refactor the center scene rendering into explicit slots:
- header
- narration
- “You chose”
- roll
- result
- choices

Do not solve this with more transcript accumulation.

### H. Notice Board structural pass
Replace generic card-stack treatment with explicit notice-specific markup/classes.
Long text must wrap cleanly on desktop and mobile.

### I. Party-system truth correction
Do not leave README or docs overstating the current party integration.
You may either:
- downscope the claim to what is actually wired, or
- do a narrow compatibility repair if it is cheap and safe

Do not turn this into a broad party redesign.

---

## Recommended execution order
1. rewrite README and active docs
2. lock runtime authority comments / labels
3. fix build.py
4. fix CSS authority
5. fix background locality authority split
6. archive/remove stale scaffold files from active path
7. tighten Story-screen hierarchy
8. tighten Notice Board
9. rerun counts/import parity
10. update acceptance docs

---

## What to verify before commit
- README matches active runtime truth
- no active V28_4 labels remain outside archive/legacy
- build.py sources match shell imports exactly
- active CSS source is singular
- `data.js` is clearly primary background/locality authority
- Stage II coverage honesty is documented
- stale files moved out of live path do not break build
- narration remains first-class on desktop and mobile
- Notice Board wraps and separates entries correctly
- contributor-facing docs now describe the active runtime instead of the stale scaffold

---

## Commit intent
This implementation pass should leave the repo in a state where the next coding or content pass is working from one truthful architecture rather than from a misleading hybrid.
