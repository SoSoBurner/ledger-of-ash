# RUNTIME VS STALE SCAFFOLD AUDIT

> **HISTORICAL RECORD** — This audit was written against the pre-cleanup state. Since this audit was completed: build.py was fixed (no longer reads legacy files), js/world.js + js/scenes.js + js/world-data.js + js/consequences.js were moved to legacy/, and background-locality-map.js keys were aligned to the data.js ID scheme. The current active state is described in README.md.

## Audit goal
This document classifies the current repo into three required buckets:

1. **ACTIVE RUNTIME SOURCE**
2. **STALE BUT STILL PRESENT PARALLEL SOURCE**
3. **ARCHIVAL / LEGACY MATERIAL**

It also recommends the cleanup action for each file or directory explicitly requested for review.

---

## Short conclusion
The current repo contains a valid active browser runtime, but that runtime coexists with a substantial stale scaffold layer.

### Real active path
The live browser path is driven by:
- `index.html`
- `js/data.js`
- `js/engine.js`
- `js/narrative.js`
- `js/background-locality-map.js`
- `js/stage2-backgrounds.js`

### Parallel stale layer
The old authored scaffold is still present in:
- `js/world-data.js`
- `js/scenes.js`
- `js/consequences.js`
- `js/world.js`
- stale V28_4 docs
- old single-file artifacts
- build assumptions that still read old files even when the shell no longer imports them

---

## Runtime truth findings

### A. What the current shell actually imports
The current `index.html` imports:
- `js/data.js`
- `js/background-locality-map.js`
- `js/stage2-backgrounds.js`
- `js/narrative.js`
- `js/party.js`
- `js/combat.js`
- `js/engine.js`

It does **not** import:
- `js/world.js`
- `js/world-data.js`
- `js/scenes.js`
- `js/consequences.js`
- `bundle.min.js`

### B. What the current shell uses for styling
The live shell uses an inline `<style>` block inside `index.html`.
It does **not** currently link `css/style.css`.

### C. What `build.py` currently consumes
`build.py` still reads:
- `css/style.css`
- `js/data.js`
- `js/background-locality-map.js`
- `js/stage2-backgrounds.js`
- `js/narrative.js`
- `js/party.js`
- `js/combat.js`
- `js/world.js`
- `js/world-data.js`
- `js/scenes.js`
- `js/consequences.js`
- `js/engine.js`
- `index.html`

But because the shell only contains script tags for the first group, the old files are read by `build.py` and then effectively ignored by the string-replacement step.
That is still a drift bug, because the build script is encoding a broader runtime model than the shell actually runs.

### D. Whether `data.js + engine.js` are the real primary Stage I–II runtime
Yes.
That is the real active runtime core.

Evidence in the code shape:
- `data.js` builds the archetype/background registry, localities, route atlas support, stage families, hazards, creatures, POIs, and build verification.
- `engine.js` reads `window.ARCHETYPES`, `window.BACKGROUNDS`, `window.KEY_LOCALITIES`, `window.BACKGROUND_ROUTE_SIGNATURES`, `window.ROUTE_ATLAS`, `window.STAGE2_DESTINATION_CONTENT`, `window.FAMILY_OBJECTIVES`, and `window.BUILD_VERIFICATION`.
- `engine.js` never depends on `OPENING_SCENES` or `CONSEQUENCES` from the old scaffold.

### E. Whether `world-data.js / scenes.js / consequences.js` are still active
They are **not active in the current shell**.
They are parallel stale scaffold files.

### F. Whether `background-locality-map.js` is authoritative, secondary, or obsolete
It is **secondary helper still in use**, but it should not remain authoritative.

Reason:
- the current background objects already carry `originLocality` inside `data.js`
- `background-locality-map.js` duplicates that truth
- the duplicate map is already provably imperfect because `spellthief_frontier` is missing

Required direction:
- make `data.js` background objects the sole start-state authority
- either regenerate `background-locality-map.js` from `data.js` or remove it entirely from the live path

### G. Whether the repo’s declared live counts match the actual active runtime
No.

Current repo surfaces disagree across at least four count shapes:
- README / CANON_UPDATE: 25 / 75 / 85 / 11 / 4
- dist README and several batch docs: 31 / 93 / 93 / 30
- active `data.js`: 31 / 93 / 93 / 13 active key localities
- active `stage2-backgrounds.js`: 72 bespoke Stage II background entries, not 93

### H. Whether Stage II widening is genuinely background-specific or still family-templated
It is **mixed**.

- 72 backgrounds have bespoke Stage II content in `stage2-backgrounds.js`
- 21 backgrounds do not
- missing cases fall back to family/procedural runtime behavior via `engine.js`

So Stage II is **not uniformly background-specific**.
It is a hybrid of:
- bespoke background-specific Stage II content
- generic family / objective-web / adjacency fallback

### I. Whether the active party system matches repo-facing claims
No.

The live repo still claims a companion system that is more mature than the active engine integration actually is.

Key truth issues:
- engine looks for `window.recruitChoice`
- engine looks for `window.companionBonus`
- loaded `party.js` does not provide those as the engine expects
- engine and `party.js` disagree on the structure of `G.companions`

This is not the main blocker for this pass, but it is a contributor-trust problem and should not be overstated in repo-facing copy.

---

## File-by-file classification and cleanup recommendation

| Path | Current class | Why | Required action |
|---|---|---|---|
| `README.md` | **STALE BUT DANGEROUS** | Still declares V28_4 and older 25/75/85/11/4 shape | Rewrite immediately to active V28_8 repo truth |
| `build.py` | **ACTIVE TOOL WITH STALE ASSUMPTIONS** | Consumes old files not imported by shell; assumes stylesheet path not actually live | Rewrite to match shell imports exactly |
| `index.html` | **ACTIVE RUNTIME SOURCE** | Current live modular shell | Keep, but clarify hierarchy and CSS authority |
| `js/data.js` | **ACTIVE RUNTIME SOURCE** | Real primary registry for archetypes, backgrounds, localities, route signatures, POIs, hazards | Keep as primary authority |
| `js/background-locality-map.js` | **SECONDARY HELPER STILL IN USE** | Used by default state, but redundant and missing `spellthief_frontier` | Fold into `data.js` or regenerate from `data.js`; remove split authority |
| `js/stage2-backgrounds.js` | **SECONDARY HELPER STILL IN USE** | Loaded and read by engine, but only covers 72/93 backgrounds | Keep for now, but document fallback and fill missing coverage later |
| `js/narrative.js` | **ACTIVE SECONDARY SOURCE** | Live narration composition helper | Keep and deepen, do not relocate |
| `js/party.js` | **STALE BUT DANGEROUS (LOADED)** | Loaded by shell but mismatched to engine contract | Remove from live path until reconciled, or rewrite to active engine contract |
| `js/combat.js` | **STALE BUT DANGEROUS (LOADED)** | Loaded by shell but largely separate from active encounter flow and old UI helpers | Remove from live path until reconciled, or rewrite to active engine contract |
| `js/engine.js` | **ACTIVE RUNTIME SOURCE** | Core state, stage loop, rendering, encounters, saving | Keep as core authority |
| `js/world.js` | **STALE BUT DANGEROUS** | Old world/notice helper not imported by current shell, still read by build.py | Move to `legacy/` or `archive/` |
| `js/world-data.js` | **STALE BUT DANGEROUS** | Old V28_4 registry, old runtime shape, not imported by shell | Move to `legacy/` or `archive/` |
| `js/scenes.js` | **STALE BUT DANGEROUS** | Old 75-scene opening scaffold with short IDs and wrong live assumptions | Move to `legacy/` or `archive/` |
| `js/consequences.js` | **STALE BUT DANGEROUS** | Old consequence-node database not used by active engine | Move to `legacy/` or `archive/` |
| `css/style.css` | **STALE PARALLEL SOURCE** | Not linked by live shell; build.py still reads it | Either make it the sole live stylesheet or archive it |
| `bundle.min.js` | **ARCHIVAL / DELETE CANDIDATE** | Different architecture bundle; not imported by shell | Archive outside live root or delete if no longer needed |
| `ledger-of-ash-single.html` | **ARCHIVAL / DELETE CANDIDATE** | V28_4 single-file artifact with old scaffold | Archive or delete; do not leave as current-facing artifact |
| `dist_base_tmp/` | **ARCHIVAL / DELETE CANDIDATE** | Temporary/staging artifact directory, high drift risk | Remove from live root or regenerate only in CI |
| `dist/README.md` | **STALE BUT DANGEROUS** | Batch doc claims a different runtime truth than README and active shell | Rewrite or archive with explicit batch/date label |
| `docs/CANON_UPDATE.md` | **STALE BUT DANGEROUS** | Still says V28_4 is active canon truth | Rewrite to V28_8 truth |
| `docs/CURRENT_BUILD_UPGRADE_PLAN.md` | **STALE BUT DANGEROUS** | Describes old patch cycle and old active shape | Archive or rewrite as historical doc |
| `docs/CURRENT_BUILD_AUDIT.md` | **STALE BUT DANGEROUS** | Old batch audit still living as current-facing doc | Archive or relabel as historical audit |
| `docs/BUILD_VERIFICATION*.md` | **ARCHIVAL / SECONDARY AUDIT MATERIAL** | Useful evidence of prior passes, but not single current truth | Consolidate into one current verification doc, archive the rest |
| repo-root handoff/spec markdown files | **SECONDARY PLANNING LAYER** | Some newer intent is useful, but assumptions still mix old runtime/stale locality model | Supersede in place with this package or archive old versions with dated suffix |

---

## Cleanup recommendation table for stale files outside `legacy/`

| File / directory | Recommendation | Safety note |
|---|---|---|
| `js/world.js` | move to `legacy/runtime-parallel/` | Safe if build.py updated first |
| `js/world-data.js` | move to `legacy/runtime-parallel/` | Safe if README/build/docs updated first |
| `js/scenes.js` | move to `legacy/runtime-parallel/` | Safe if no live shell import remains |
| `js/consequences.js` | move to `legacy/runtime-parallel/` | Safe if no live shell import remains |
| `bundle.min.js` | move to `legacy/artifacts/` or delete | Keep only if there is a separate historical deployment need |
| `ledger-of-ash-single.html` | move to `legacy/artifacts/` or delete | Do not leave at repo root as if current |
| `dist_base_tmp/` | delete or move to `legacy/build-artifacts/` | Temporary directory should not function as repo truth |
| `dist/README.md` | rewrite or archive to `docs/archive/` | Avoid leaving stale batch claims in deploy folder |
| `docs/CANON_UPDATE.md` | rewrite in place | This is current-facing and cannot remain stale |
| `docs/CURRENT_BUILD_UPGRADE_PLAN.md` | archive or rewrite in place with “historical” label | Do not leave as current plan if superseded |
| `docs/CURRENT_BUILD_AUDIT.md` | archive or rewrite with historical label | Same issue |
| `docs/BUILD_VERIFICATION*.md` | consolidate current truth, archive remainder | Reduce contributor confusion |
| existing root handoff/spec docs | supersede with current package or archive with dated suffix | Avoid multiple competing implementation briefs |

---

## Repo classes after cleanup

### 1. ACTIVE RUNTIME SOURCE
Target after reconciliation:
- `index.html`
- `js/data.js`
- `js/engine.js`
- `js/narrative.js`
- `js/stage2-backgrounds.js` (until merged elsewhere)
- one authoritative stylesheet path
- one current README
- one current verification doc

### 2. STALE BUT STILL PRESENT PARALLEL SOURCE
Should be emptied from the live path after cleanup.

### 3. ARCHIVAL / LEGACY MATERIAL
Must live under:
- `legacy/`
- `docs/archive/`
- or an explicitly historical artifact directory

Nothing in this bucket should be allowed to pose as the current runtime or current canon truth.

---

## Required reconciliation decisions

### Decision 1: runtime authority
Declare `data.js + engine.js` the live Stage I–II authority.

### Decision 2: start locality authority
Choose one:
- **preferred:** `data.js` background objects are authoritative; remove duplicate map
- fallback: regenerate `background-locality-map.js` from `data.js` at build time

### Decision 3: Stage II truth
Document Stage II honestly as:
- bespoke for 72 backgrounds
- fallback for 21 backgrounds

### Decision 4: CSS authority
Choose one source only:
- extract current inline CSS into `css/style.css` and link it explicitly, or
- delete the dead stylesheet path and keep inline-only intentionally

### Decision 5: stale scaffold disposition
Move old scaffold files out of live root once build.py and README stop referring to them.

---

## Bottom line
The repo already has a viable active runtime.
The failure is that stale scaffold material still surrounds it, contradicts it, and confuses anyone trying to maintain it.

The next pass should not invent a new runtime.
It should make the repo tell the truth about the one it already has.
