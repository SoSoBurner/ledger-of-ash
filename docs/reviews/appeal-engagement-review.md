# Appeal & Engagement Review — Ledger of Ash
**Date:** 2026-04-23  
**Scope:** Last 24-hour changes  
**Skill:** game-design:appeal-engagement-review

---

## Flow Foundation

**Skill-challenge balance:** DC scaling calibrated. Stage II/III encounters (DC 12–15) land against level 6–10 characters. Three-path approach routing (expose/negotiate/disappear) lets players match build to challenge. ✅  
**Sense of control:** Seed injection telegraphs boss encounters. Agency is legible. ✅  
**Clear feedback gap:** `G.worldClocks.day += 14` in `_pell_resolve_disappear` is dead — player time-skips but nothing confirms it. Silent consequences break feedback. ⚠️

---

## Appeal Taxonomy

| Type | Status | Evidence |
|------|--------|----------|
| I want to experience a story | ✅ Strong | Dravn Pell, Ander Voss — named antagonist arcs with closure |
| I want to discover secrets | ✅ Strong | Ledger revelation arc, seed choices as mystery hooks |
| I want to be someone | ✅ Moderate | Archetype-sensitive NPC reactions, approach paths reward build identity |
| I want to solve puzzles | ✅ Moderate | DC routing, flag-chain dependencies |
| I want to tinker and build | ⚠️ Underserved | 240 items exist but no visible optimization loop from outside |
| I want to touch and feel that | ❌ Not addressed | No new feedback texture in 24h changes |

**Appeal "but" test:** "It's a serious institutional conspiracy thriller, but played through guild-procedural fantasy aesthetics." The contrast is there and distinctive — but almost entirely invisible outside the prose.

---

## "But" Test for Engagement

> You advance through stages by uncovering institutional corruption, **but** every public action raises watchfulness, and high watchfulness triggers complications that threaten the contacts and progress you've built.

The sentence holds. Watchfulness complication hook creates real competing objectives — the most structurally sound engagement addition in the batch.

---

## Core Problem

24-hour build: **~95% engagement infrastructure, ~5% appeal surface.** Mechanics are well-built. But the funnel model's wide end (premise, visual identity, central fantasy, 3-second comprehension) is untouched. A mechanically brilliant game with a weak premise filters out most of its audience before they experience the mechanics.

---

## Engagement Strengths

- **Boss seed injection** — best structural design in the batch. Telegraphs before firing, respects agency.
- **Three-path approach routing** — routes to build identity. Direct "you are your build" feedback.
- **Stage 2 → Stage 3 flag dependency** — prior decisions have mechanical weight downstream.
- **Watchfulness complication hook** — competing objective tension. Correct.

## Engagement Risks

1. `G.worldClocks.day` dead key — silent consequence in Pell disappear path
2. No rival re-trigger guard — can fire same tick
3. Rival clock penalties now fixed but pressure feedback to player unclear

---

## Two Highest-Leverage Changes

1. **Fix the dead time-skip feedback** — `G.worldClocks.day` → `G.dayCount`, plus 1–2 lines of narration confirming time passed.
2. **Create one appeal-first asset** — a single screenshot-worthy moment (boss confrontation scene, atmospheric locality narration, a choice card that communicates tone in one read) before the next feature pass.
