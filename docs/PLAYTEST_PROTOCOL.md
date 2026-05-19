> **This is a development tool.** The playtest harness runs alongside Ledger of Ash to validate engine correctness and surface content bugs. It is never loaded by the game, never shipped to players, and has no effect on gameplay. See `tests/e2e/README.md` for the directory overview.

# Playtest Protocol — Ledger of Ash

Triggered when the user says **"Playtest"**. Run this full loop autonomously. Stop only at a deliberate stage gate (`canAdvanceToStage3()` hardcoded `return false`).

---

## Pre-flight (always, before Step 0)

Load pinned core skills:
1. Invoke `superpowers:subagent-driven-development`
2. Invoke `superpowers:dispatching-parallel-agents`
3. Run `less-permission-prompts`
4. Invoke `game-design:playtest-plan` + `game-design:playtesting-strategy`
5. Read `memory/ACTIVE_PLANS_INDEX.md` (plan alignment reference for all fixes)

---

## Step 0 — Validators

Run: `node tests/content/validate-content.js && node tests/content/validate-flags.js && node tests/content/validate-structure.js`

Fix all failures. Each fix = commit. Re-run until clean. Blocks Step 1.

`validate-structure.js` additionally checks:
- Duplicate HTML `id=` attributes → **FAIL**
- `innerHTML +=` on render containers → **WARN**

---

## Step 1 — Headless run (1hr hard cap, 55min soft exit)

Run: `npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line`

4 families: Classic Combat / Magic and Spellcasting / Stealth and Precision / Support and Leadership.
Hard cap: 62min Playwright timeout. Soft threshold: 55min graceful exit with partial report.
Organic progression only — no sp1/sp2 injection.
Success per family: `G.stage !== 'Stage I'` (reached Stage II).

Inline triage (in spec, every 25 picks — progression blockers only):
- Empty panel + G.dead=false → log TRIAGE_STALL, attempt `loadStageChoices()` recovery
- sp1 unchanged for 25 picks → log TRIAGE_PROGRESSION_BLOCKED

ESCAPE_LOCS expanded to 19 locality IDs (covers all known stall localities).

Failed families get one automatic retry pass after first pass completes.

No style/content/narrative triage during headless.

---

## Step 2 — Post-headless triage and fix loop

Parse headless log. For each STALL or TIMEOUT family:
- Identify root cause (engine bug / content gap / missing ungated choices)
- Fix only progression-blocking bugs. Dispatch fix sub-agent with full context brief.
- Re-run headless after each batch. Up to 3 retry cycles. 3+ files changed → pause and ask via AskUserQuestion.

---

## Step 3 — Headed run (3hr hard cap, 2hr45min soft exit)

Run: `npx playwright test tests/e2e/playtest-headed.spec.js --reporter=line`

4 families, same order. Fixed first attempt per family (see spec), then random archetype+background per retry.
Hard cap: 3hr Playwright timeout. Soft threshold: 2hr45min graceful exit with partial report.
Success per family: `climaxDone && sp2 >= 18` or Stage III unlock.

Family run exits immediately when `stage2_narrative_complete` flag is set — no need to run to MAX_PICKS.

Full game test:
- Every overlay exercised exhaustively ONCE per run at pick 20 of family 1 (char sheet, journal, camp, inventory, map, notices, shop, contacts, party, how-to-play — all sub-options clicked)
- After that: organic human-synth play; PROBE_EVERY=20 lightweight probes continue (HUD, charsheet, journal, quest, heat, alignment, map, notices, contacts, party)
- Screenshots: all milestone shots (char creation, first result, combat, level-up, stage unlock, death, success) plus PROBE_EVERY=20 periodic shots
- Pre-stall screenshots captured before each stall-escape teleport
- `[first-visit tag]` log entries emitted for each new locality visited
- HUD integrity check every 20 picks via `probeHUD()`:
  - Cross-checks gold, faction heat row, alignment bars against G-state
  - Calls `probeCharSheet` to validate skill values against G-state
  - Mismatches logged as `[hud-mismatch ...]`
- `probeDuplicates()` runs every 20 picks:
  - Checks singleton DOM elements, duplicate choice labels, quest entries, narrative text
  - Issues logged as `[DUPLICATE ...]`
- Canon text scan after each `waitForChoices()`: forbidden words, "Ledger of Ash" in Stage I/II text
- ESCAPE_LOCS expanded to 19 locality IDs (was 5)
- Per-screenshot Claude API skill dispatch (async, non-blocking): see post-run-analysis.js DOMAINS for model routing

Up to 5 retry cycles per family. sp2 stuck below 18 → Stage II content expansion pass, commit, retry.

### Screenshot directories

Screenshots are written to separate subdirectories:
- Headed spec: `test-results/playthrough-screenshots/headed/`
- Headless spec: `test-results/playthrough-screenshots/headless/`

Post-run analysis reads from `headed/` only — headless captures are diagnostic-only.

---

## Step 4 — All-skills analysis and fix plan

After each headed family run completes, post-run analysis triggers automatically — no manual invocation needed.

`node tests/e2e/post-run-analysis.js [report-file] [screenshot-dir]` runs **12 domains**:
1. Engine bugs
2. HUD/progression
3. Narrative quality
4. Balance/combat
5. Economy
6. Canon compliance
7. Voice/register
8. Branch drift
9. Tutorial
10. Polish/fun
11. **HUD integrity** *(new)*
12. **UI duplication** *(new)*

Model routing:
- Domains 1–10: `claude-haiku` (fast, cost-efficient)
- Domains 11–12 (`hud_integrity`, `ui_duplication`): `claude-sonnet-4-5-20251022` (higher reasoning for structural analysis)

Screenshots are sent as actual base64 image data via `claude -p --input-format stream-json` — no API key configuration required beyond the CLI.

When analysis writes `test-results/playtest-analysis-{YYYYMMDD-HHmm}.md`: invoke EnterPlanMode with that file as context. The planning session applies all applicable skills to build the fix plan.
The fix plan is the deliverable. No zip rebuild, no publish step.

---

## Coverage Tracker

`sp2` (Stage II progress) is extracted as a scalar inside `page.evaluate()` before serialization — avoids object-serialization bug that previously caused `sp2` to read as `[object Object]` in coverage reports.

---

## Stage lock = done

Deliberate stage gate reached → playtest complete.
Run `claude-md-management:revise-claude-md` to capture any new gotchas.
Deliver: one-paragraph summary — stages completed, bugs fixed (commit SHAs), stage lock reason, path to analysis .md.

---

## Archetype Families (match character creation screen)

- Classic Combat: warrior, knight, berserker, warlord, warden, death_knight, archer
- Magic and Spellcasting: paladin, spellthief, ranger
- Stealth and Precision: rogue, assassin, scout_c, thief, trickster, beastmaster
- Support and Leadership: healer, artificer, engineer, tactician, alchemist, saint, bard

---

## Reactive Resource Loading by Bug Type

| Bug type | Skills/agents to invoke | Reference files |
|---|---|---|
| Validator / content violation | `branch-drift-auditor`, `narration-surface-scanner`, `continuity-auditor` agents | V33_2 locality/NPC packet via context-mode |
| Engine / JS logic bug | `superpowers:systematic-debugging` + `karpathy-skills:karpathy-guidelines` + `fullstack-dev-skills:spec-miner` + `fullstack-dev-skills:debugging-wizard`; agents: `typescript-reviewer`, `silent-failure-hunter`. For 3+ root-cause candidates: `agent-teams:parallel-debugging` + `agent-teams:team-debugger`. | — |
| Playwright spec / test bug | `fullstack-dev-skills:playwright-expert`; `e2e-runner` agent; `developer-essentials:e2e-testing-patterns` | Screenshot path + log excerpt |
| Large content authoring | `agent-teams:parallel-feature-development`; `agent-teams:team-implementer` per file with `agent-teams:team-lead` as orchestrator | V33_2 locality packets for target localities |
| Dead code / structural bloat | `code-modernization:legacy-analyst` for load graph + dead code map; `codebase-cleanup:refactor-clean` | — |
| Combat / encounter bug | `game-design:balance-review` + `game-design:mechanics-review` + `karpathy-skills:karpathy-guidelines`; `code-reviewer` agent | `data/bestiary_lookup.js`, relevant boss file |
| Progression / stage-advance bug | `game-design:feedback-loop-review` | Stage gate code, stageProgress log |
| Economy / supply bug | `game-design:economy-review` | `data/bestiary_lookup.js`, G.gold/G.supply paths |
| Narrative / NPC bug | `superpowers:writing-skills` + `humanizer`; agents: `continuity-auditor`, `narration-surface-scanner`, `line-editor` | V33_2 locality+NPC packet for affected location |
| Polish / itch release bug | `game-design:polish-review` + `game-design:fun-review` | — |
| Tutorial bug | `game-design:tutorial-review` | — |
| Canon compliance bug | `continuity-auditor` + `narration-surface-scanner`; check `data/reference/V33_2_extracted/.../02_CANON_BASELINE/named_npcs/` and `03_LOCALITY_ENGINE/locality_packets/` | V33_2 NPC JSON, locality JSON |
| HUD/G mismatch bug | `superpowers:systematic-debugging`; trace updateHUD (~line 10862) vs G state | `updateHUD`, `renderCharacterSheet` both must be updated |
| Mechanics violation | `game-design:balance-review` + `game-design:economy-review`; trace `modHP`, `addGold`, `addSupply` call sites | G defaults object, level cap table |

Before committing any fix: invoke `superpowers:verification-before-completion`.

---

## Fix Sub-agent Brief (every fix)

Include: bug description, log excerpt around failure, screenshot path if available, applicable CLAUDE.md rules, V33_2 reference data (content bugs), active plan direction from ACTIVE_PLANS_INDEX.md. Two-stage review after each fix (spec compliance → code quality).

---

## Plan Conflict Handling

Before fixing: check ACTIVE_PLANS_INDEX.md. If fix conflicts with an active plan, try to align if trivial. Always fix regardless. Log the conflict in the playtest summary.

---

## Planning Session Checklist (mandatory before ExitPlanMode)

**Content audit agents are proactive — run in every session touching content, not only when a bug is found:**
- `continuity-auditor` — canon drift, NPC name/injury/timeline consistency
- `narration-surface-scanner` — forbidden words, locality mismatches, premature "Ledger of Ash" references
- `branch-drift-auditor` — repeated phrasing, option-set imbalance, register drift

**Screenshot analysis is required before finalizing any plan:**
After every headed spec run, read ≥10 representative screenshots (start screen, choice panel, result text, journal, character sheet, camp, map, combat, success/fail, stall/dead-end) and apply `polish-review`, `line-editor`, `humanizer` before ExitPlanMode. Skipping this is a planning failure mode — confirmed in May 2026 session.

**Apply game-design skills to playtest REPORTS too:**
Apply all game-design skills to the `.md` playtest report files (family results table, locality coverage, dead-ends log, map travels log) in addition to screenshots. Report data shows sp2-by-locality and dead-end patterns that screenshots don't reveal.

**Pre-ExitPlanMode completeness checklist:**
- [ ] Screenshots analyzed (≥10 shots across all visible family states)
- [ ] Content agents dispatched (continuity-auditor, narration-surface-scanner, branch-drift-auditor)
- [ ] Game-design skills applied to playtest report `.md` files
- [ ] All backlog reports and prior plan files read
- [ ] All skill categories applied (polish, line-editor, humanizer, balance, mechanics, fun, feedback-loop, economy, tutorial)
- [ ] CLAUDE.md updated if new gotchas found
