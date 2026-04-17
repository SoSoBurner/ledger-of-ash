# BUILD PIPELINE REALIGNMENT SPEC

## Goal
Make the build pipeline, shell imports, CSS path, counts, and deploy artifacts agree on one runtime truth.

The next implementation pass must leave the repo in a state where:
- the shell imports only the active runtime files
- the build script consumes only the active runtime files
- the CSS authority is singular and explicit
- stale scaffold files are not silently read by the build pipeline
- generated artifacts cannot contradict README or docs

---

## Current-state mismatch

### Current shell reality
`index.html` currently uses:
- inline CSS in a `<style>` block
- script tags for `data.js`, `background-locality-map.js`, `stage2-backgrounds.js`, `narrative.js`, `party.js`, `combat.js`, and `engine.js`

### Current build reality
`build.py` currently reads:
- `css/style.css`
- all currently imported active files
- **plus old files not imported by the shell**: `world.js`, `world-data.js`, `scenes.js`, `consequences.js`

### Why this is bad
- contributors cannot tell which files matter
- old files continue to look “official” because the build script still mentions them
- CSS authority is split
- stale artifacts can be regenerated or preserved accidentally

---

## Required design rule
The build pipeline must follow the live modular shell.

### Single-source rule
If a file is not imported by the modular shell, it must not be treated as part of the active build unless explicitly declared as generated or archived.

### No parallel-authority rule
Do not maintain a second runtime definition through build-only inputs.

---

## Required target state

### 1. Authoritative modular runtime
The authoritative browser runtime should be:
- `index.html`
- one authoritative stylesheet source
- `js/data.js`
- `js/narrative.js`
- `js/stage2-backgrounds.js`
- `js/engine.js`
- and only those helper files that the shell intentionally loads and the engine genuinely uses

### 2. Single-file artifact as derived output only
`dist/index.html` should be a compiled artifact derived from the same authoritative modular runtime.
It must not contain extra stale scaffold code that the modular runtime does not load.

### 3. Archived files outside live build path
These must not be read by `build.py` once the pipeline is corrected:
- `js/world.js`
- `js/world-data.js`
- `js/scenes.js`
- `js/consequences.js`
- `bundle.min.js`
- `ledger-of-ash-single.html`

---

## Shell import realignment

### Required import audit
The implementation pass must perform and preserve an explicit import list.

### Preferred live shell after cleanup

#### Mandatory core imports
- `js/data.js`
- `js/narrative.js`
- `js/stage2-backgrounds.js`
- `js/engine.js`

#### Conditional helper imports
- `js/background-locality-map.js` only if not yet folded into `data.js`
- `js/party.js` only if rewritten to active engine contract
- `js/combat.js` only if rewritten to active engine contract

#### Remove from shell load path
- any file not directly used by the live runtime

---

## CSS path truth

## Current truth
The current shell is inline-style authoritative.
`css/style.css` is not actually live.

## Required correction
Choose one and commit fully:

### Option A — Preferred for maintainability
1. extract the current inline CSS from `index.html`
2. paste it into `css/style.css` without visual changes
3. replace inline style block with a real stylesheet link
4. make `build.py` inline that real stylesheet when producing `dist/index.html`
5. delete any dead duplicate CSS blocks

### Option B — Acceptable only for minimal-risk stabilization
1. keep CSS inline in `index.html`
2. remove `css/style.css` from build assumptions
3. archive `css/style.css`
4. document inline-only CSS as intentional

### Recommendation
Use **Option A**.
It preserves current appearance while removing dual authority.

---

## `build.py` rewrite spec

## Required behavior
`build.py` must:
1. read `index.html`
2. resolve the exact stylesheet links present in `index.html`
3. resolve the exact script tags present in `index.html`
4. inline those sources in order
5. fail loudly if any expected import is missing
6. write `dist/index.html`
7. optionally emit a build manifest

## Must not do
- must not hard-code stale file reads that the shell does not import
- must not silently succeed while shell/build drift persists
- must not assume a stylesheet placeholder string that no longer exists

## Required validation inside build
Add pre-build and post-build checks for:
- canon version string in active docs = V28_8
- README counts match computed runtime counts
- shell import list matches build source list
- no `V28_4` strings remain in active root/docs/runtime surfaces outside archive
- all active background IDs have a declared Stage II status (`bespoke` or `fallback`)
- no duplicate start-locality authorities remain live without explicit synchronization

---

## Suggested build manifest
Emit something like `dist/build-manifest.json` with:
- `canon_version`
- `runtime_core_files`
- `helper_files`
- `archived_parallel_sources_excluded`
- `archetype_count`
- `background_count`
- `stage2_bespoke_count`
- `stage2_fallback_count`
- `locality_count`
- `generated_at`

This is not player-facing. It is contributor-trust infrastructure.

---

## Artifact directory realignment

### `dist/`
Keep only deployable output and a current manifest.
Do not leave stale batch narrative docs in `dist/` as if they describe the live runtime.

### `dist_base_tmp/`
Remove from active root or regenerate only as ephemeral CI output.
It should not function as a semi-official artifact directory.

### `bundle.min.js`
Move to archive or delete unless it remains part of a separate intentional deployment path.

### `ledger-of-ash-single.html`
Archive or regenerate from the active runtime after build realignment.
Do not keep the stale V28_4 single-file artifact at repo root.

---

## Specific stale-file handling in build realignment

| Path | Build status after fix |
|---|---|
| `js/world.js` | excluded from active build |
| `js/world-data.js` | excluded from active build |
| `js/scenes.js` | excluded from active build |
| `js/consequences.js` | excluded from active build |
| `css/style.css` | authoritative only if explicitly linked |
| `bundle.min.js` | excluded from active build |
| `ledger-of-ash-single.html` | not a source file |

---

## Anti-drift rules to add

### Rule 1: shell/build parity check
CI or pre-commit should fail if `build.py` references a runtime file that `index.html` does not import.

### Rule 2: README/runtime parity check
CI or pre-commit should fail if README counts do not match computed runtime counts.

### Rule 3: active-canon parity check
CI or pre-commit should fail if `V28_4` appears in:
- `README.md`
- `index.html`
- active `js/` runtime files
- active root handoff docs

### Rule 4: explicit Stage II coverage reporting
CI or pre-commit should emit:
- number of bespoke Stage II backgrounds
- number of fallback Stage II backgrounds
- missing keys if any

### Rule 5: start-locality authority singularity
CI or pre-commit should fail if start-locality truth differs between any active authority files.

---

## Minimal implementation order
1. decide CSS authority
2. rewrite shell imports to final active list
3. rewrite `build.py` to parse actual imports
4. archive old scaffold files from live build path
5. regenerate `dist/index.html`
6. regenerate build manifest
7. rewrite README/docs to match exact build output

---

## Success criteria
The build pipeline is realigned only when:
- the modular shell and build consume the same active sources
- stylesheet authority is singular
- stale scaffold files are not build-active
- generated artifacts no longer contradict docs
- current deployable output can be traced directly to the live shell
