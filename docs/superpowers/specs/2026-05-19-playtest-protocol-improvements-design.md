# Playtest Protocol Improvements — Design Spec
**Date:** 2026-05-19
**Status:** Approved

---

## Goal

Nine targeted improvements to the playtest pipeline across 5 files:
1. Separate headed/headless screenshot directories
2. Auto-trigger post-run analysis at headed run end
3. Model routing (Sonnet for image-heavy domains, Haiku for text domains)
4. Fix sp2 always-zero bug in coverage tracker
5. Pre-stall screenshots at both escape trigger points
6. Expand ESCAPE_LOCS to full locality list
7. Exit family run early on stage SUCCESS
8. Headless: re-run only failed families on second pass
9. First-visit locality logging

Also establishes the playtest system as clearly documented development infrastructure.

---

## Dev Tool Distinction

The playtest system (`tests/e2e/`, `tests/content/`, `docs/PLAYTEST_PROTOCOL.md`) is development infrastructure — equivalent to a CI pipeline. It is never loaded by `ledger-of-ash.html`, never shipped to players, and has no effect on game behavior.

---

## Change 1 — Screenshot Directory Split

**Files:** `playtest-headed.spec.js:32`, `playtest-headless.spec.js:31`, `post-run-analysis.js:23`

Headed screenshots → `test-results/playthrough-screenshots/headed/`
Headless screenshots → `test-results/playthrough-screenshots/headless/`
`post-run-analysis.js` reads from `headed/` only — headless screenshots are low-fidelity diagnostic captures, not analysis inputs.

---

## Change 2 — Auto-Trigger Post-Run Analysis

**File:** `tests/e2e/playtest-headed.spec.js` — end of family runner

At the end of `runFullPanelSimulation()` after the report is written, detect the latest `playtest-report-*-headed.md` and invoke `node tests/e2e/post-run-analysis.js <path>`. Timeout: 300s. Non-fatal on error.

---

## Change 3 — Model Routing

**File:** `tests/e2e/post-run-analysis.js` — DOMAINS array, CLI/SDK invocation

Add `model` field to `hud_integrity` and `ui_duplication` domains: `'claude-sonnet-4-5-20251022'`. All other domains default to Haiku. Thread model flag into `analyzeWithImages()` and `analyzeWithSDK()`.

---

## Change 4 — sp2 Coverage Fix

**Files:** `tests/e2e/helpers/coverage-tracker.js`, `playtest-headed.spec.js`, `playtest-headless.spec.js`

Extract `sp2` as a scalar inside `page.evaluate()` before Playwright serialization loses integer-keyed object values. Pass as `g.sp2` (number). `onPick()` reads `g.sp2` with fallback.

---

## Change 5 — Pre-Stall Screenshots

**File:** `tests/e2e/playtest-headed.spec.js` — both escape blocks

Capture a screenshot immediately before teleporting in both the stuck-location escape (~line 1385) and the same-label loop escape (~line 1472). Filename includes `_prestall_stuck_` or `_prestall_loop_` plus pick number.

---

## Change 6 — Expand ESCAPE_LOCS

**Files:** `playtest-headed.spec.js:1144`, `playtest-headless.spec.js:731`

Replace 5-entry hardcoded list with all 19+ known Stage I/II locality IDs. Prevents spec from toggling between only 2 locations during stall escape.

---

## Change 7 — Exit-on-Success

**File:** `tests/e2e/playtest-headed.spec.js` — pick loop

After each pick, check `g.flags.stage2_narrative_complete`. If true, log `[SUCCESS tag]` and break. Prevents running to MAX_PICKS after the game is already won.

---

## Change 8 — Headless Failed-Family Rerun

**File:** `tests/e2e/playtest-headless.spec.js` — family runner

After all families complete first pass, collect failures and run a second pass only on failed families. At most 2 passes total.

---

## Change 9 — First-Visit Locality Log

**File:** `tests/e2e/playtest-headed.spec.js` — pick loop

Track `visitedForLog = new Set()` per family. Log `[first-visit tag] pick=N loc=X` on each new locality. Feeds post-run coverage analysis.

---

## Out of Scope

- Headless screenshot analysis (headless shots are diagnostic only)
- Stage 3+ content
- Changes to `ledger-of-ash.html` game logic
