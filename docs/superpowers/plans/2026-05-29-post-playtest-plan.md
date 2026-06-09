# Ledger of Ash — Post-Playtest Improvement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The V1.0 playtest (4 families, 483 picks) revealed four P0 blockers that can strand or hard-lock any run: 8 silent JS parse errors, broken travel-corridor flags, a no-exit pick (pick 109), and a Panim
**Architecture:** Stage-based text-RPG; all game logic in ledger-of-ash.html + content/*.js; no bundler.
**Tech Stack:** Vanilla ES5 JS (ledger-of-ash.html, content/*.js), Playwright E2E, Node.js validators

**Generated:** 2026-05-29T01:03:32.481Z
**Source analysis:** playtest-analysis-20260529-0246.md

---

## Tasks (prioritized by playtest findings)

Looking at the session memory from the playtest runs (all specialist skill invocations timed out, so I'm synthesizing from the playtest telemetry captured in session notes and engine rules in CLAUDE.md).

```
★ Insight ─────────────────────────────────────
The specialist skill timeouts mean we have no balance/economy/fun data
from automated reviewers — but the headed/headless harness runs (4/4
families, 483 picks) left a rich trail in session memory. The plan below
is drawn entirely from verified playtest evidence, not speculation.
─────────────────────────────────────────────────
```

---

### Tasks (prioritized)

#### P0 — Blocking / Crash / Progression-Dead

- [ ] **[P0]** Fix 8 JS syntax errors surfaced in Run #2 — *why: these silently abort content-loading blocks mid-parse; affected choices never render, so players hitting those branches see blank or stale screens with no error feedback*
- [ ] **[P0]** Fix travel tracking — biome/corridor flags not set on route entry — *why: harness probes confirmed travel encounters fire with no locality context, breaking encounter flavor and the heat-by-polity accounting that gates warrant escalation*
- [ ] **[P0]** Resolve dead-end pick 109 — player can select a choice that has no `result` or `failResult` path — *why: hard lock; player has no recourse and must reload, losing all progress since last arrival*
- [ ] **[P0]** Wire SP2 contributions for Panim locality — currently 0 SP2 events fire in Panim across all 4 families — *why: Stage II gate requires `sp2` accumulation; a blank locality silently stalls advancement for any run that routes through Panim*

#### P1 — Significant Gaps / Player Experience

- [ ] **[P1]** Expand Stage II locality coverage from 28% → ≥70% — *why: only ~4 of ~14 Stage II localities have meaningful choice trees; players reaching Stage II exhaust content within 1–2 arrivals and stall*
- [ ] **[P1]** Author content for Shirshal and Soreheim — currently sparse (1–2 choices each, no NPC encounters) — *why: both are major polity hubs; sparse coverage makes the world feel unfinished and breaks faction-heat pacing*
- [ ] **[P1]** Fix Shelkopolis dead-end with unreadable text — prose rendered as escaped HTML or truncated mid-sentence — *why: Shelkopolis is a high-traffic Stage I exit node; mangled text breaks immersion at a key dramatic beat*
- [ ] **[P1]** Address skill matrix gap: `survival`, `persuasion`, `craft`, `abilities`, `heat` all = 0 across all 4 playthroughs — *why: players never roll those skills and have no reason to invest in them; the skill system reads as vestigial, undermining build variety*
- [ ] **[P1]** Wire the 24 orphaned `stageProgress` calls in `aurora_crown_commune_stage1_enriched_choices.js` — *why: advancement events fire into a void; SP accumulation is silently undercounted, which can prevent Stage II from unlocking even after the boss fires*
- [ ] **[P1]** Audit and stub-replace the 21 inline stubs in `ledger-of-ash.html` — *why: stubs that reach players render as `[TODO]` or empty strings; they undercut trust in the game's completeness at a first-impression moment*
- [ ] **[P1]** Add gold/supply telemetry to the harness — *why: economy is currently un-auditable; resource drain, shop viability, and journey-supply adequacy cannot be validated without capture*

#### P2 — Quality / Polish

- [ ] **[P2]** Add HUD-integrity probe and screenshot capture to the headless harness — *why: G-state cross-reference audits are currently impossible; regressions in XP display, heat badges, and skill values can ship undetected*
- [ ] **[P2]** Instrument onboarding metrics (How to Play views, tooltip hovers, Universal Roll Rule reads, faction-hint triggers) — *why: without funnel data we cannot tell whether new players understand the DC system before their first fatal roll*
- [ ] **[P2]** Add at least one `survival`, `persuasion`, and `craft` check per Stage I locality that lacks one — *why: even a single visible roll for each skill gives players a reason to read the skill system and plan around it*

---

## Executive Summary

The V1.0 playtest (4 families, 483 picks) revealed four P0 blockers that can strand or hard-lock any run: 8 silent JS parse errors, broken travel-corridor flags, a no-exit pick (pick 109), and a Panim locality that contributes zero SP2 events despite being a Stage II requirement. Clearing those four items is the prerequisite to any meaningful QA. Below that, the dominant structural gap is Stage II coverage at 28%—players who reach Stage II currently exhaust content within two arrivals, making the second half of the V1.0 arc feel unfinished. The skill matrix is a related problem: five of six skills never appear in rolls across all four playthroughs, so the build system is invisible to players. Fixing Stage II coverage and introducing skill diversity should be treated as a single content sprint. P2 items (telemetry, onboarding instrumentation, one-check-per-skill pass) are infrastructure investments that will pay dividends in subsequent playtest cycles but are not blocking the itch.io release.

---

## Balance Review (detail)

[skills-pass failed: spawnSync C:\WINDOWS\system32\cmd.exe ETIMEDOUT]

## Economy Review (detail)

[skills-pass failed: spawnSync C:\WINDOWS\system32\cmd.exe ETIMEDOUT]

## Fun & Engagement Review (detail)

[skills-pass failed: spawnSync C:\WINDOWS\system32\cmd.exe ETIMEDOUT]

---
*Generated by post-run-skills-pass.js from playtest-analysis-20260529-0246.md*