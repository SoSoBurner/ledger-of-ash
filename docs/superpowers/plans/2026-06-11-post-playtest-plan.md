# Ledger of Ash — Post-Playtest Improvement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The most critical finding is a two-punch onboarding failure: players hit dead-ends at picks 16 and 23 — both within the tutorial window — with no narration and no choices rendered, making the game unc
**Architecture:** Stage-based text-RPG; all game logic in ledger-of-ash.html + content/*.js; no bundler.
**Tech Stack:** Vanilla ES5 JS (ledger-of-ash.html, content/*.js), Playwright E2E, Node.js validators

**Generated:** 2026-06-11T20:57:17.786Z
**Source analysis:** playtest-analysis-20260611-1338.md

---

## Tasks (prioritized by playtest findings)

Good — I have the full plan file. Now I can synthesize this properly, deduplicating across all domains.

`★ Insight ─────────────────────────────────────`
The plan file was machine-generated from the harness report — it contains cross-domain duplicates (heat system listed under both Combat and Stage Progression, dead-ends under four separate domains). The synthesis job here is to collapse those duplicates, weight by player impact, and surface the true P0 root causes rather than their symptoms.
`─────────────────────────────────────────────────`

---

### Tasks (prioritized)

---

#### P0 — Fix before any build

- [ ] **[P0]** Diagnose and fix dead-end at pick 16 (sunspire) and pick 23 (shelkopolis) — *why: empty HTML result with no narration and no next choices; player is completely stuck with no recovery path; occurs in the first ~25 picks (tutorial window), killing first-session retention*
- [ ] **[P0]** Expand reachable localities from 8 → target 18+ in headless harness — *why: only 8 of 32 localities are visited across 601 picks/4 families; harness travel weights are too narrow; balance, sp2, and combat data from 75% of the world map is invisible and unverifiable*
- [ ] **[P0]** Wire heat confrontations — `enterAuthorityConfrontation` never fires despite heat accumulating — *why: 601 picks across 4 families produced zero heat events at any polity; the mechanic exists in the engine but is disconnected from choice consequences; entire faction pressure system is dead for V1.0*

---

#### P1 — Fix in next session

- [ ] **[P1]** Audit sp2-contribution gap in 6 localities (soreheim, sunspire, ithtananalor, mimolot, fairhaven, panim) — *why: all 6 show sp2=0 despite being visited; either their enriched choices lack `maybeStageAdvance()` calls or their travel visits are harness artifacts that don't trigger `resolveArrival`; bottlenecks real sp2 flow to shelkopolis + cosmoria only*
- [ ] **[P1]** Add combat encounter instrumentation to harness — encounter frequency, win/loss ratio, XP per combat, DC hit rates — *why: no combat performance data was recorded across 601 picks; impossible to verify difficulty scaling or XP balance without it*
- [ ] **[P1]** Add economy instrumentation to harness — gold delta per pick, supply balance, shop interaction count — *why: the commerce path is completely unverifiable; no gold/supply numbers recorded means the economy design doc assumptions cannot be tested against actual play*
- [ ] **[P1]** Fix screenshot capture reporter — summary claims 49 screenshots taken but list shows 0 — *why: visual QA domain (HUD field accuracy, tooltip presence, onboarding copy) is entirely blocked; a reporting bug is masking 49 real screenshots or the capture itself silently fails*
- [ ] **[P1]** Verify `awardAbility` path fires on combat win — harness shows 0 ability awards post-combat — *why: `seedDefaultCombatAbilities` at archetype select was fixed, but the grant-on-win path may still be unwired; abilities are a core progression signal and players never see them activate*
- [ ] **[P1]** Audit skill distribution in content — 6/7 skills never rolled across full playtest — *why: choice content funnels nearly all rolls through a single skill; players don't experience the skill system's breadth; vigor/finesse/spirit/spirit/craft effectively don't exist in Stage 1–2 play*

---

#### P2 — Backlog

- [ ] **[P2]** Surface dead-end choice text in harness debug log — currently logged as blank cells — *why: triage requires knowing which choice triggered the dead-end; without the label/id, root-cause investigation requires manual bisecting*
- [ ] **[P2]** Rebalance harness travel weights to distribute picks across later localities — fairhaven first reached pick 494, panim pick 543 of 601 — *why: late-game localities never receive sufficient coverage in standard runs; edge cases in sp2 and heat accumulation at those nodes go untested*
- [ ] **[P2]** Add `plot:'main'` to all stage-advancement choices — missing blue border removes the visual progression signal — *why: content audit found stage-gating choices lack the required field; players have no visual cue distinguishing story-critical decisions from flavor choices*
- [ ] **[P2]** Probe `buildLivingDesc()` / `#env-panel .env-desc` output for the 6 zero-sp2 localities — *why: CLAUDE.md notes localities without `LOCALITY_NARRATIONS[locId]` silently show blank; these 6 localities may also have silent env-sidebar failures that are masked by the coverage gap*
- [ ] **[P2]** Verify XP pacing against `G.level * 60` denominator in Stage 2 families — earlier analysis flagged +40% faster than baseline — *why: if the denominator was recently fixed from hardcoded 120, Stage 2 families (level 6–10) would have experienced a 5–10× denominator shift; may produce artificially fast or slow level-ups at higher levels*

---

## Executive Summary

The most critical finding is a two-punch onboarding failure: players hit dead-ends at picks 16 and 23 — both within the tutorial window — with no narration and no choices rendered, making the game uncompletable for a significant entry path. Compounding this, the harness only reaches 8 of 32 localities, meaning the P0 dead-ends and the entirely inactive heat confrontation system were both caught only because those specific localities fell within the narrow coverage window. The P1 cluster is dominated by instrumentation gaps: without combat metrics, economy metrics, and working screenshot capture, three of the game's five core systems (faction pressure, economy, combat scaling) cannot be verified against design intent. The recommended sequence is: fix the two dead-ends and unblock heat confrontations this session, then expand harness locality coverage and add the three missing metric domains, leaving skill distribution breadth and XP pacing for a subsequent content pass once the verification infrastructure is in place.

---

## Balance Review (detail)

[skills-pass failed: spawnSync C:\WINDOWS\system32\cmd.exe ETIMEDOUT]

## Economy Review (detail)

[skills-pass failed: spawnSync C:\WINDOWS\system32\cmd.exe ETIMEDOUT]

## Fun & Engagement Review (detail)

[skills-pass failed: spawnSync C:\WINDOWS\system32\cmd.exe ETIMEDOUT]

---
*Generated by post-run-skills-pass.js from playtest-analysis-20260611-1338.md*