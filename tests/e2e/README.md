# Playtest Harness — Developer Tool

This directory contains the automated playtest system for Ledger of Ash.

**This is development infrastructure, not game code.**
- None of these files are loaded by `ledger-of-ash.html`
- None of these files are shipped to players
- Running or editing these files has no effect on game behavior

## Tools

| File | Purpose |
|------|---------|
| `playtest-headed.spec.js` | Playwright spec — runs full playthroughs in a headed browser (screenshot-capable) |
| `playtest-headless.spec.js` | Playwright spec — fast family-level regression runs without browser UI |
| `post-run-analysis.js` | Post-run AI analysis — sends log + screenshots to Claude for multi-domain review |
| `helpers/coverage-tracker.js` | Per-pick coverage metrics (localities visited, sp2 progress, dead-ends) |

## Running

See `docs/PLAYTEST_PROTOCOL.md` for the full protocol and invocation commands.
