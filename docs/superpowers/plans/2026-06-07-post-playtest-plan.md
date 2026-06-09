# Ledger of Ash — Post-Playtest Improvement Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The most urgent work is three wiring bugs that silently zero out sp2 for multiple archetypes and localities: the missing `skill:` field for inquisitor/artificer, the Mimolot/Ithtananalor key mismatch,
**Architecture:** Stage-based text-RPG; all game logic in ledger-of-ash.html + content/*.js; no bundler.
**Tech Stack:** Vanilla ES5 JS (ledger-of-ash.html, content/*.js), Playwright E2E, Node.js validators

**Generated:** 2026-06-07T20:46:07.380Z
**Source analysis:** playtest-analysis-20260607-1322.md

---

## Tasks (prioritized by playtest findings)

Working from the session memory logs directly.

---

### Tasks (prioritized)

---

#### P0 — Blocking / Progression-Breaking

- [ ] **[P0]** Add missing `skill:` field to inquisitor and artificer enriched choices in `stage2_enriched_choices.js` — *why: `adaptEnrichedChoice` / `rollD20` receives `undefined` skill key; both archetypes contribute 0 sp2 across all Stage II runs, silently blocking progression parity*

- [ ] **[P0]** Wire Mimolot Academy entries in `stage2_enriched_choices.js` — locality key uses `mimolot academy_` prefix that fails constant lookup; add a correct fallback entry for `mimolot` and `mimolot_academy` — *why: 0 sp2 from Mimolot across all playtests despite 2+ visits per run; same gap confirmed for Ithtananalor*

- [ ] **[P0]** Implement supply replenishment: add at least one supply tap (shop purchase, forage camp action, or loot drop) that restores `G.supply` during normal play — *why: supply stock has zero replenishment path; heavy-pack regen is unimplemented; supply becomes a one-way drain with no player agency, making it a silent death sentence for long runs*

- [ ] **[P0]** Rebalance Stage II skill DC distribution — `might`/`vigor`/`spirit` appear in fewer than 5% of choices combined; `finesse` (oracle) accounts for 8× the sp2 of any other skill — *why: monoculture forces archetype non-choices; oracle becomes the mechanically correct pick by default*

---

#### P1 — Important / Player-Facing Quality

- [ ] **[P1]** Wire Sunspire Haven into `stage2_enriched_choices.js` — locality visited 3+ times per run, 0 sp2 contribution in every playtest — *why: content file likely exists but key lookup never matches; same wiring pattern as Mimolot fix above*

- [ ] **[P1]** Fix duplicate `failResult` key collision in `aurora_crown_commune_stage1_enriched_choices.js` (reported at ln ~109 and ~601) — *why: JS object literal dedup silently drops the first authored failure narration; players see the wrong failure text or no text on failure rolls in Aurora*

- [ ] **[P1]** Diversify Cosmoria Stage II option set — 98% of choices currently carry `tag:'risky'`; add at least 2 `safe` and 1 `bold` option to restore DC variety — *why: removes player skill expression; every Cosmoria visit feels mechanically identical regardless of build*

- [ ] **[P1]** Replace copy-pasted notice board text across all localities — identical boilerplate appears in all 12 visited locations in every run — *why: notice boards are first-impression locality flavor; sameness signals "placeholder not content" and breaks immersion immediately*

- [ ] **[P1]** Audit Stage 1 training cost gates — confirm a low-gold archetype (e.g. drifter, exile) can afford at least one training option without prior looting — *why: reported as blocking progression; if `G.gold < trainingCost` on all options, player is hard-stuck at a camp screen with no forward path*

- [ ] **[P1]** Resolve Shelkopolis routing concentration — currently absorbs 41–48% of all sp2 across runs; add travel weight or travel complication variety to deflect traffic toward undervisited nodes — *why: single-locality concentration compresses the apparent world size and starves other content of player exposure*

- [ ] **[P1]** Add persistent in-game reference panel for Universal Roll Rule, stage progress thresholds, and faction heat — *why: playtest found zero accessible docs for these core systems; players who miss the tutorial opening have no recovery path and make uninformed choices for entire runs*

- [ ] **[P1]** Deduplicate Guildheart Hub Stage I structural text (reported at ln 1092 and 1133) — *why: verbatim paragraph reuse within the same locality reads as a rendering bug to players, not intentional design*

---

#### P2 — Nice to Have / Quality Lift

- [ ] **[P2]** Instrument playtest harness to emit economy metrics: `G.gold` delta per pick, supply consumed, shop transactions — *why: six playtests ran with zero economy observability; balancing supply/gold requires this data and it's invisible until added to the harness reporter*

- [ ] **[P2]** Add at least one `vigor` and one `spirit` enriched choice to each Stage II locality pack — *why: both skills show 0 sp2 contribution in every run; players who invest in them gain zero mechanical return in Stage II*

- [ ] **[P2]** Expand Stage II locality coverage from 11/33 (36%) toward 18+ nodes — prioritize: Nomdara, Fairhaven, Shirshal, Glasswake Commune (all confirmed zero-sp2 in prior runs) — *why: 64% of the world map is unreachable in normal play; coverage gap makes the world feel small and makes replay value low*

- [ ] **[P2]** Add alignment and heat threshold tooltips to character sheet — current labels render threshold numbers without explanation — *why: tutorial review flagged undefined consequences for both systems; players can't make informed alignment/heat tradeoffs without feedback*

- [ ] **[P2]** Cosmoria Stage I: deduplicate repeated phrasing block (reported at ln 109/601 of file) — *why: copy-drift; reads as authoring artifact in a content review*

---

## Executive Summary

The most urgent work is three wiring bugs that silently zero out sp2 for multiple archetypes and localities: the missing `skill:` field for inquisitor/artificer, the Mimolot/Ithtananalor key mismatch, and the Sunspire non-connection in `stage2_enriched_choices.js`. These compound with the supply replenishment gap — where `G.supply` drains with no tap — to create invisible progression walls that players cannot diagnose. Once those P0 fixes are in, the P1 work shifts to content quality: the oracle finesse monoculture distorts every archetype decision, the Shelkopolis bottleneck compresses perceived world size, and the copy-pasted notice board text is the single fastest signal to a first-time player that content is unfinished. The P2 instrumentation item (economy metrics in the harness) should be treated as a prerequisite for the next balance pass, not an afterthought — without it, gold and supply tuning remains guesswork.

---

## Balance Review (detail)

[skills-pass failed: spawnSync C:\WINDOWS\system32\cmd.exe ETIMEDOUT]

## Economy Review (detail)

[skills-pass failed: spawnSync C:\WINDOWS\system32\cmd.exe ETIMEDOUT]

## Fun & Engagement Review (detail)

[skills-pass failed: spawnSync C:\WINDOWS\system32\cmd.exe ETIMEDOUT]

---
*Generated by post-run-skills-pass.js from playtest-analysis-20260607-1322.md*