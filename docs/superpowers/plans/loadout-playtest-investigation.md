# Loadout: Ledger of Ash — Playtest Screenshot Investigative Report

## Context

The user is preparing a future session that will analyze the Playtest Protocol screenshots from the most recent headless playtest run and produce an investigative report. That report will then drive a planning session for follow-up fixes. This document is a loadout manifest: it enumerates the skills, agents, MCP tools, and reference files the future session should pull in, and where the source material lives.

**Scope:** investigative — covers UI/visual, narrative/content, progression/stall, and continuity/state simultaneously. The report should not commit to a fix direction; it should surface and categorize findings so the *next* session can plan from a complete picture.

**Working directory for the future session:** `C:\Users\CEO\ledger-of-ash` (not the current `ApplyPilot` dir).

---

## Source material

### Screenshots
- **Location:** `C:\Users\CEO\ledger-of-ash\test-results\playthrough-screenshots\headless\`
- **Count:** ~32 PNGs (latest run 2026-05-20)
- **Coverage:** 4 archetype families — `classic-combat_berserker`, `magic-spellcasting_spellthief`, `stealth-precision_assassin`, `support-leadership_artificer`
- **Naming convention:** `{timestamp}_{family}_{archetype}_a{attempt}_{event}_p{picks}_sp{stageProgress}.png` — parse filenames to tag findings without opening every image
- **Event types observed:** `start`, `p0_sp0`, `charsheet_lvlN`, `journal_dayN`, `p50_spN`, `deadend_pN`, `success_pN`, `camp_dayN`, `p100_spN`

### Protocol and prior analysis
- `docs/PLAYTEST_PROTOCOL.md` — the canonical Playtest loop (pre-flight, Step 0 validators, Step 1 headless, Step 2 triage)
- `docs/PLAYTEST_MATRIX.md` — archetype/family matrix definition
- `docs/superpowers/specs/2026-05-19-playtest-visual-analysis-design.md` — prior design spec for visual analysis
- `docs/superpowers/plans/2026-05-19-playtest-visual-analysis.md` — prior plan
- `docs/superpowers/plans/playtest-plan-20260520-1944.md` — most recent playtest plan
- `test-results/playhead-headless-log.md` (and dated `playtest-report-*.md` files under `tests/test-results/`) — text-side companion to the screenshots
- `memory/ACTIVE_PLANS_INDEX.md` — alignment reference for any fix suggestions
- `CLAUDE.md` (repo root) — engine rules, file structure, branch policy (work on `main`)

---

## Skills to invoke (Skill tool, in this order)

### Pre-flight (from Playtest Protocol)
1. `superpowers:subagent-driven-development` — parallel screenshot review
2. `superpowers:dispatching-parallel-agents` — fan-out across archetypes
3. `game-design:playtest-plan`
4. `game-design:playtesting-strategy`

### UI / visual (per-screenshot rendering)
5. `ui-text-fit` (project skill) — text overflow, panel fit issues
6. `ui-design:accessibility-audit`
7. `ui-design:design-review`
8. `chrome-devtools-mcp:a11y-debugging` — if any screenshot prompts a live DOM re-check via `play.bat`

### Narrative / content
9. `narrative-voice`
10. `scene-pass`
11. `dialogue-naturalizer`
12. `humanizer`
13. `locality-flavor-pass`
14. `canon-grounder`
15. `line-editor`

### Progression / mechanics
16. `game-design:mechanics-review`
17. `game-design:balance-review`
18. `game-design:fun-review`
19. `game-design:feedback-loop-review`
20. `game-design:level-design-review`

### Continuity / branching / state
21. `continuity-check`
22. `choice-branch-polish`
23. `sideplot-weaver`
24. `stage-escalation-pass`

### Process / output
25. `superpowers:writing-plans` — for the follow-up planning session
26. `superpowers:verification-before-completion`
27. `remember:remember` — checkpoint state before the long investigative pass

---

## Agents (Agent tool) to keep warm

Read-only investigators, fan out one per archetype family where useful:

- `branch-drift-auditor` — Ledger-of-Ash-specific branch text reuse and option-set imbalance
- `narration-surface-scanner` — Ledger-of-Ash-specific narrative surface, canon, locality references
- `continuity-auditor` — chapter/scene continuity, canon, timeline
- `line-editor` — sentence-level prose if any narration screenshots show wording issues
- `code-explorer` — trace any progression-blocker back to engine code (`ledger-of-ash.html`, `content/*.js`)
- `Explore` — generic read-only file/symbol search
- `gan-evaluator` (if live re-runs of the game are needed) — Playwright-based scoring

For fix work in the *follow-up* session (not this one):
- `agent-teams:team-debug` / `team-feature` / `team-review`

---

## MCP tools to have available

- `mcp__plugin_chrome-devtools-mcp_chrome-devtools__*` — for live DOM/console inspection if a screenshot finding needs verification
- `mcp__plugin_playwright_playwright__*` — re-running specific archetype paths from `tests/e2e/playtest-headless.spec.js`
- `mcp__plugin_context7_context7__*` — for any library/API doc questions that surface

---

## Output of the future session

A single investigative report at:

`C:\Users\CEO\ledger-of-ash\docs\superpowers\plans\playtest-screenshot-investigation-20260520.md`

Structure:

1. **Run summary** — date, archetypes, screenshot count, derived progression outcomes per archetype (success vs deadend, max p/sp reached)
2. **Findings by category** — UI/visual, Narrative/content, Progression/stall, Continuity/state. Each finding: screenshot filename(s), category, severity (blocker / high / medium / low), one-line description, suspected source file
3. **Cross-cutting patterns** — issues spanning archetypes or repeated across runs
4. **Open questions** — items needing live engine inspection or designer judgment
5. **Recommended next-session focus** — ordered list of top 5–10 issues to plan fixes for

The report itself does NOT include fix plans — those come in the subsequent planning session.

---

## Critical files (read in the future session)

- `C:\Users\CEO\ledger-of-ash\CLAUDE.md` — engine rules and constraints
- `C:\Users\CEO\ledger-of-ash\content\CLAUDE.md` — writing style and canon
- `C:\Users\CEO\ledger-of-ash\tests\CLAUDE.md` — playtest tooling
- `C:\Users\CEO\ledger-of-ash\docs\PLAYTEST_PROTOCOL.md`
- `C:\Users\CEO\ledger-of-ash\docs\PLAYTEST_MATRIX.md`
- `C:\Users\CEO\ledger-of-ash\docs\superpowers\specs\2026-05-19-playtest-visual-analysis-design.md`
- `C:\Users\CEO\ledger-of-ash\memory\ACTIVE_PLANS_INDEX.md`
- Latest text report under `C:\Users\CEO\ledger-of-ash\tests\test-results\playtest-report-*.md`

---

## Verification

The loadout is correct when, at the start of the future session:

1. `cd C:\Users\CEO\ledger-of-ash` and `git branch` shows `main`
2. `Get-ChildItem test-results\playthrough-screenshots\headless` returns ~32 PNGs
3. Each Skill listed above is invocable via the `Skill` tool without error
4. `docs/PLAYTEST_PROTOCOL.md` opens and matches the canonical loop
5. The investigative report is produced at the path above and contains all five sections

---

## Notes / constraints

- Plan-mode restriction prevents me from copying this manifest into the Ledger of Ash repo right now. After ExitPlanMode approval, the user (or a follow-up turn) can copy this file to `C:\Users\CEO\ledger-of-ash\docs\superpowers\plans\loadout-playtest-investigation.md`.
- The future session should switch its working directory to `C:\Users\CEO\ledger-of-ash` before invoking any of the agents above — several are repo-scoped (branch-drift-auditor, narration-surface-scanner) and rely on Ledger-of-Ash filesystem layout.
- Per `CLAUDE.md`, default branch is `main`; do not branch unless explicitly requested.
- Screenshots are large (PNGs) — load by filename pattern first, only open images when a category-tag review demands visual confirmation.
