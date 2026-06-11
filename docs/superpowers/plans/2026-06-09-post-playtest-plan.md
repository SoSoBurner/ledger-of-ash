# Ledger of Ash — Post-Playtest Improvement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The most critical risk to V1.0 is **sp2 starvation**: five localities visited by every routing pattern contribute zero stage-progress points because their main-path choices lack `plot:'main'`, meaning
**Architecture:** Stage-based text-RPG; all game logic in ledger-of-ash.html + content/*.js; no bundler.
**Tech Stack:** Vanilla ES5 JS (ledger-of-ash.html, content/*.js), Playwright E2E, Node.js validators

**Generated:** 2026-06-10T02:48:42.847Z
**Source analysis:** playtest-analysis-20260609-1923.md

---

## Tasks (prioritized by playtest findings)

All three specialist skill invocations timed out, so I'll synthesize directly from the two playtest reports in session memory (20260608-2023 and 20260609-1848), the CLAUDE.md engine rules, and the recurring-issue memory files.

---

### Tasks (prioritized)

**P0 — Blockers**

- [ ] **[P0]** Add `plot:'main'` to stage-advancement choices in 5 zero-sp2 localities: `glasswake_commune`, `aurora`, `shirshal`, `soreheim`, `mimolot` — *why: sp2 never accumulates at these stops; Stage II gate (`sp2 ≥ 12`) is unreachable if the player routes through any of them; glasswake alone is missing it on 18/44 choices*
- [ ] **[P0]** Fix JS crash (`charAt` on `undefined`) in `stage2_enriched_choices.js` — *why: game-breaking mid-session crash for any player who reaches Stage II content; silently swallowed by `adaptEnrichedChoice` try/catch so player sees recovery narration loop rather than an error*
- [ ] **[P0]** Verify `cosmoria` choice dead-end: trace path that leaves player with 0 rendered choices and add a fallback or corrective `failResult` branch — *why: player is permanently stuck with no action available; no reload prompt fires because the engine thinks it rendered choices successfully*

**P1 — Major Player Impact**

- [ ] **[P1]** Seed `G.unlockedCombatAbilities` at archetype selection so abilities ≠ 0 on first combat entry — *why: abilities panel shows empty across all 4 archetype families; combat is effectively missing a core system; tracked as abilities=0 in harness metrics (DOM button count, not G state — confirm against live G before closing)*
- [ ] **[P1]** Audit and correct 5 undefined CSS result types (`neutral`, `complication`, `notice`, `encounter`, `dim`) in narrative scroll rendering — *why: 7 narrative inconsistencies trace to these missing class rules; result text appears with broken or absent visual treatment, eroding trust in the UI's feedback signal*
- [ ] **[P1]** Strip forbidden words from result text across all `content/*.js` files: `meaningful`, `investigation`, `you feel`, `you realize`, `you sense`, `official` (as person noun), `contact` (as person noun) — *why: content validator flags these as immersion-breaking or passive-voice tells; recurring in every sprint; run `npm run test:content` to get the full list before editing*
- [ ] **[P1]** Deduplicate repeated failure narration text — *why: same failure prose appearing multiple times per session flattens tension and signals shallow content; worst-case: player learns to read failure as "you see the same sentence again" rather than a meaningful setback*
- [ ] **[P1]** Redistribute travel routing weight so fewer runs concentrate at hub localities — *why: 73% of map is unvisited across the 20260609 run; authored content exists but players never encounter it; check `TRAVEL_ROUTES` edge weights and origin-locality draw probabilities in `travel_corridors.js`*

**P2 — Quality / Polish**

- [ ] **[P2]** Add semantic tag mapping for `SAFE_TAGS` / `BOLD_TAGS` so choices with semantic tags get correct tier classification — *why: engine bug causes all semantically-tagged choices to default to 'risky'; DCs are miscalibrated silently; fix the lookup table, not choice content*
- [ ] **[P2]** Verify skill coverage across a full run: ensure `vigor`, `finesse`, and `spirit` each appear on at least 2 choices per stage — *why: harness shows some skills never rolled in 330-pick runs; skill investment becomes meaningless if the skill is never tested*
- [ ] **[P2]** Audit `cosmoria` choice density and efficiency — even where no dead-end exists, the payoff-per-click ratio is low relative to other localities; consider consolidating or adding a higher-stakes branching option
- [ ] **[P2]** Normalize `addJournal` call sites: arg order is `(text, category, dedupeKey)` — verify all content files pass category second, not first — *why: reversed args silently log nothing; recurring bug in every sprint; a one-pass grep catches all sites*

---

## Executive Summary

The most critical risk to V1.0 is **sp2 starvation**: five localities visited by every routing pattern contribute zero stage-progress points because their main-path choices lack `plot:'main'`, meaning Stage II advancement becomes dependent on hitting the right subset of localities in the right order — a near-lottery from the player's perspective. That bug plus the `charAt` crash in `stage2_enriched_choices.js` mean Stage II content is both hard to reach and crash-prone on arrival. Everything else — the abilities display, forbidden words, CSS type gaps, routing concentration — degrades session quality but doesn't block progression. Fix the three P0s first (one grep-and-label pass on the five localities, one typeof guard on the charAt crash, one path trace on cosmoria), then address the P1 ability seeding and narration audit before the next playtest run. The P2 items are safe to batch into a content-quality pass after the P0/P1 fixes are validated by a clean headless run.

---

## Balance Review (detail)

[skills-pass failed: spawnSync C:\WINDOWS\system32\cmd.exe ETIMEDOUT]

## Economy Review (detail)

[skills-pass failed: spawnSync C:\WINDOWS\system32\cmd.exe ETIMEDOUT]

## Fun & Engagement Review (detail)

[skills-pass failed: spawnSync C:\WINDOWS\system32\cmd.exe ETIMEDOUT]

---
*Generated by post-run-skills-pass.js from playtest-analysis-20260609-1923.md*