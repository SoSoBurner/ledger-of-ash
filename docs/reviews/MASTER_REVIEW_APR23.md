# Ledger of Ash — Master Design & Code Review
**Date:** 2026-04-23  
**Session scope:** Last 24-hour changes + full Stage 1 & 2 release audit  
**Reviews included:** Spec audit, Code review, Appeal & Engagement, Feedback Loops, Fun, Polish, Level Design

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Consolidated Action Items](#2-consolidated-action-items)
3. [Code & Spec Audit — 24h Changes](#3-code--spec-audit--24h-changes)
4. [Code Review — Content Modules](#4-code-review--content-modules)
5. [Appeal & Engagement Review](#5-appeal--engagement-review)
6. [Feedback Loop Review](#6-feedback-loop-review)
7. [Fun Review](#7-fun-review)
8. [Polish Review](#8-polish-review)
9. [Level Design Review](#9-level-design-review)
10. [What's Working](#10-whats-working)

---

## 1. Executive Summary

### Strengths
The game's mechanical architecture is sound. The DC three-tier system, boss seed injection pattern, three-path approach routing, and IIFE module encapsulation are all correct and well-executed. Typography is the strongest single polish element — Cinzel/Crimson Pro with documented enforcement rules produces consistent identity. Prose quality across both new content modules is strong: NPC register, physical tells, and institutional tone are well-maintained.

### Critical Risks (in order of severity)
1. **Three silent bugs in the new content modules** — `G.worldClocks.watchfulness` writes to a dead key (correct key is `G.watchfulness`); `_closeClimax` double-logs a malformed journal entry; `G.worldClocks.day` is a dead time-skip key (correct key is `G.dayCount`).
2. **Stage 2 at 27% of Stage 1 density** — the incentive chain that sustains Stage 1 flow loses density at the exact moment it should build toward climax. The most urgent release risk.
3. **No visible macro goal in Stage 1** — players complete 22 localities without a stated destination. The mystery suppression arc withholds the conspiracy's name but doesn't replace it with a visible player intent.
4. **Watchfulness has no drain mechanic** — one-way ratchet that eventually guarantees complications regardless of player behavior.
5. **No documented color identity system** — typography has enforcement rules; color doesn't. Ad hoc color decisions accumulating across 534 KB of content.

### Session Bugs Fixed (already in codebase)
- Launch screen SyntaxError from duplicate `const stage` in `loadStageChoices` ✅
- `G.stageProgress` scalar corruption at 4 locations (rival exchange, probe, pressure clock, rival clock) ✅
- `G.worldClocks.watchfulness` write/read alignment verified — not a bug. Prior session analysis was incorrect; changes reverted. ✅
- `G.worldClocks.day` dead time-skip writes (3 locations in `stage2_boss.js`) → `G.dayCount` ✅
- `_closeClimax` malformed journal double-log removed (`stage3_climax.js` line 184) ✅
- Dead `G.stage` second arg removed from `loadStageChoices` rival timeout (`ledger-of-ash.html` line 8862) ✅

---

## 2. Consolidated Action Items

### P0 — Bugs (fix immediately, pre-release blocker)

| # | Issue | Location | Status |
|---|-------|----------|--------|
| 1 | ~~`G.worldClocks.watchfulness` dead writes~~ | `stage2_boss.js`, `stage3_climax.js` | ❌ Not a bug — hook at line 10711 reads `G.worldClocks.watchfulness`. Writes and reader are aligned. Analysis error in prior session. Reverted. |
| 2 | `_closeClimax` double-logs malformed journal entry | `stage3_climax.js` line 184 | ✅ Fixed — `addJournal` call removed |
| 3 | `G.worldClocks.day` dead time-skip — 3 locations | `stage2_boss.js` lines 93, 190, 196 | ✅ Fixed — changed to `G.dayCount` |
| 4 | Dead `G.stage` second arg in `loadStageChoices` call | `ledger-of-ash.html` line 8862 | ✅ Fixed — arg removed |
| 5 | No re-trigger guard in `triggerRivalEncounter` | `ledger-of-ash.html` | ⬜ Open |

### P1 — Release Blockers (Stage 2 content)

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 6 | Stage 2 at 27% of Stage 1 density | Flow breaks when player exits Stage 1; incentive chain collapses at climax build | Escalation pass: assign locality arc roles (discovery/faction/reckoning), author to density |
| 7 | Stage 2 milestone structure felt as grind | Thresholds 8/12/15 are correct architecture; space between is under-populated | Surface `stageProgress[2]` as felt pressure + structured locality phases |

### P2 — Player Clarity (high impact)

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 8 | No visible macro goal in Stage 1 | Players complete encounters without a felt destination | Add stated player intent early — answers "what am I working toward?" without naming the conspiracy |
| 9 | Rival clock + watchfulness both invisible in HUD | Two competing systems fire without signal; player feels punished without understanding why | Surface both as HUD indicators |
| 10 | Training cooldown invisible | "Why can't I train?" confusion | Surface day count and training cooldown status |
| 11 | Stage 2 → Stage 3 DC modifier fully hidden | Player gets DC 12 vs 15 on mediate with no explanation | One narration line at Stage III mediate acknowledging inquisitor contact |

### P3 — Feedback Loops

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 12 | Watchfulness has no drain mechanic | One-way ratchet; late Stage 2 becomes complication-flooded | `campAction('lay_low')`: watchfulness -1 or -2 at cost of 1 day |
| 13 | stageProgress can stall below boss threshold | Clock penalty outpaces gains if player avoids rivals | Clock penalty should redirect to recovery opportunity, not just subtract |
| 14 | `G.investigationProgress` not confirmed in G defaults | Silent TypeError risk in `adaptEnrichedChoice` | Verify/add `investigationProgress: 0` to G defaults |

### P4 — Teaching Sequence

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 15 | Archetype selected before mechanics demonstrated | Uninformed irrevocable choice; build traps invisible until Stage 2 | Mid-first-locality archetype confirmation beat after all 6 skills demonstrated |
| 16 | Stage 2 rival clock + watchfulness not introduced before Stage 2 | Players hit competing systems cold | Seed both concepts in Stage 1→2 bridge arc narration |
| 17 | Combat archetypes may face Stage 2 as untelegraphed social game | Possible build trap | Verify Stage 2 rival encounters have non-persuasion paths; add if absent |

### P5 — Polish

| # | Issue | Impact | Fix |
|---|-------|--------|-----|
| 18 | No documented color identity system | Ad hoc color across 534 KB content; consistency gap | Document: base + 3 accent roles (gold/danger/discovery) with hex values in CLAUDE.md |
| 19 | Boss encounters visually identical to routine encounters | Pattern-pop-subversion fails at most important moments | CSS class `encounter--boss` on `enterCombat()` for narrative encounters |
| 20 | Stage transitions have no visual acknowledgment | Stage 1→2 advancement is mechanical but not felt | CSS state change on stage transition |

### P6 — Code Quality / Minor

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 21 | `checkTrigger` operator precedence confusing | `stage2_boss.js` line 219 | `((G.stageProgress && G.stageProgress[2]) \|\| 0) >= 8` |
| 22 | Magic number DCs inline | Both files | Named constants at module top: `DC_PELL_EXPOSE = 15` etc. |
| 23 | `_pell_phase2` no double-invocation guard | `stage2_boss.js` | Add `stage2_miniboss_p2_started` flag guard |
| 24 | sorePlotCredits system hidden | Economy | Social flavor line in Soreheim shop signaling reputation |
| 25 | 22 Stage 1 localities use identical structure | Stage 1 content | Assign distinct locality types: information / pressure / discovery |

---

## 3. Code & Spec Audit — 24h Changes

**Method:** EARS (Easy Approach to Requirements Syntax) — observed behavior only  
**Commits covered:** `0a4663bc`, `a13cbb76`, `636b07e8`, `fd512fd1`, `9967f68f` + session fixes

### Modules Changed

| File | Change | Commit |
|------|--------|--------|
| `content/stage2_boss.js` | New — Dravn Pell mini-boss | `636b07e8` |
| `content/stage3_climax.js` | Updated — Ander Voss climax | `9967f68f` |
| `content/item_system.js` | Appended — 240 Stage II items | `fd512fd1` |
| `ledger-of-ash.html` | 5 fixes (SyntaxError + 4 stageProgress) | this session |

### Observed Requirements (EARS)

**Stage II Mini-Boss: Dravn Pell**
- When `checkTrigger()` is called, system returns true only if: `!stage2_miniboss_complete`, `!stage2_miniboss_started`, `stageProgress[2] >= 8`, and `stage2_miniboss_seed_seen`.
- When a seed choice resolves, system sets `G.flags.stage2_miniboss_seed_seen = true`.
- System shall offer three approach paths: expose (Wits DC 14), negotiate (Charm DC 13), disappear (Vigor DC 12). *(Note: actual DCs in code are 14/14/13 — review index had minor discrepancy.)*
- `_closeMiniboss()` shall set `stage2_miniboss_complete = true`, increment `stageProgress[2]` by 2, call `resolveArrival(G.location)` after 1200ms.

**Stage III Climax: Ander Voss**
- Three approach phases: open (Charm DC 13), guarded (Stealth DC 12), early (Vigor DC 12).
- Three resolution paths: carry (Vigor DC 14), expose (Wits DC 15), mediate (Charm DC 12 with inquisitor contact, DC 15 without).
- `_closeClimax()` shall set `stage3_climax_complete = true`, set `stageProgress[3] = Math.max(stageProgress[3] \|\| 0, 20)`.

**Open Issues Found in Spec Audit**

| Severity | Issue | Status |
|----------|-------|--------|
| Medium | `G.worldClocks.day` dead key — no game engine reader | ✅ Fixed |
| Medium | ~~`G.worldClocks.watchfulness` dead key~~ — hook at line 10711 reads `G.worldClocks.watchfulness`. Not a bug. Analysis error. | ❌ Closed — not a bug |
| Low | Dead second arg in `loadStageChoices` rival timeout | ✅ Fixed |
| Low | No re-trigger guard in `triggerRivalEncounter` | ⬜ Open |

---

## 4. Code Review — Content Modules

**Verdict: Request Changes** — 3 critical issues must be resolved before production.

### Critical Issues

**Issue 1: `G.worldClocks.watchfulness` is a dead write (8 locations)**

The world clock tick function reads `W = G.worldClocks` and processes `W.pressure` and `W.rival` — but never `W.watchfulness`. The complication hook fires on `G.watchfulness` (top-level). All watchfulness consequences from Pell and Voss encounters are silently discarded.

Affected: `stage2_boss.js` lines 76, 98, 153, 157, 175; `stage3_climax.js` lines 74, 127, 173.

```javascript
// BEFORE (dead write)
G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

// AFTER (correct)
G.watchfulness = (G.watchfulness || 0) + 1;
```

**Issue 2: `_closeClimax` logs a malformed, duplicate journal entry**

`stage3_climax.js` line 94 concatenates Phase 3 setup onto `G.lastResult`, which already contains Phase 2 narration text. `_closeClimax` then logs this combined blob as `'evidence'`. Result: journal entry contains hundreds of words of combined text; Phase 1 approach results are logged twice; failure paths are categorized as `'evidence'` instead of `'complication'`.

```javascript
// REMOVE this line from _closeClimax():
addJournal(G.lastResult, 'evidence');
// Each resolution function already logs its own outcome at the correct point.
```

**Issue 3: `G.worldClocks.day` is a dead write (3 locations in stage2_boss.js)**

`G.dayCount` is the canonical day counter. `G.worldClocks.day` has no readers. Time-skips in disappear/delay paths produce no in-game effect.

```javascript
// stage2_boss.js line 190
G.dayCount = (G.dayCount || 0) + 14;
if (typeof updateHUD === 'function') updateHUD();

// line 93 (4-day delay)
G.dayCount = (G.dayCount || 0) + 4;

// line 196 (disappear fail — 3 days)
G.dayCount = (G.dayCount || 0) + 3;
```

### Major Issues

**Issue 4: Dead second arg in `loadStageChoices` — line 8862**
```javascript
// BEFORE
setTimeout(() => loadStageChoices(G.location, G.stage), 600);
// AFTER
setTimeout(() => loadStageChoices(G.location), 600);
```

**Issue 5: `G.investigationProgress` not confirmed in G defaults**

`stage3_climax.js` line 85 writes this key. CLAUDE.md G Defaults Rule requires any property read from G to be initialized in the G defaults object. Verify/add `investigationProgress: 0` to the G defaults block.

**Issue 6: `checkTrigger` operator precedence — stage2_boss.js line 219**
```javascript
// BEFORE (works but misleading)
(G.stageProgress && G.stageProgress[2] || 0) >= 8

// AFTER (clear and defensive)
((G.stageProgress && G.stageProgress[2]) || 0) >= 8
```

### Minor Issues
- Magic number DCs (12, 13, 14, 15) inline — consider named constants at module top
- `_pell_phase2` has no double-invocation guard (unlike `_pell_phase1`)
- `stageNum` in `loadStageChoices` is a string; `G.stageProgress` uses numeric keys — coexist without conflict but latent confusion for future developers

### Positive Feedback
- **IIFE pattern in `stage3_climax.js`** — correct module encapsulation; `_roll()` helper eliminates repetition across 6 resolution checks
- **Boss seed injection two-stage flag logic** — sequential `seeded_1`/`seeded_2` gates for Stage I, single `seed_seen` for Stage II — elegant
- **`_closeMiniboss` stageProgress increment** — correctly uses `G.stageProgress[2]` after session fixes
- **Fisher-Yates shuffle in `loadStageChoices`** — correct implementation, no off-by-one
- **Prose quality in both files** — Pell's procedural register and Voss's physical tells follow the NPC spec correctly; institutional tone is consistent
- **`_spn1`–`_spn4` stageProgress fixes** — correctly scoped with `var`, correctly keyed, `Math.max(0, ...)` guard applied where appropriate

---

## 5. Appeal & Engagement Review

### Flow Foundation
Skill-challenge balance calibrated. Three-path approach routing lets players match build to challenge. ✅  
Sense of control: seed injection telegraphs boss encounters. ✅  
Feedback gap: `G.worldClocks.day` (now `G.dayCount`) time-skip produces no narration confirmation. ⚠️

### Appeal Taxonomy

| Type | Status |
|------|--------|
| I want to experience a story | ✅ Strong — named antagonist arcs with closure |
| I want to discover secrets | ✅ Strong — Ledger revelation arc, seed choices as mystery hooks |
| I want to be someone | ✅ Moderate — archetype-sensitive NPC reactions |
| I want to solve puzzles | ✅ Moderate — DC routing, flag-chain dependencies |
| I want to tinker and build | ⚠️ Underserved — 240 items exist but no visible optimization loop from outside |
| I want to touch and feel that | ❌ Not addressed — no new feedback texture |

**Appeal "but" test:** "It's a serious institutional conspiracy thriller, but played through guild-procedural fantasy aesthetics." Contrast is there and distinctive — but almost entirely invisible outside the prose.

### Engagement Assessment
The "but" test holds for Stage 2: *"You advance by confronting rivals, but every public action raises watchfulness, and watchfulness triggers complications that threaten the contacts you've built."*

The watchfulness complication hook is the most structurally sound engagement addition — creates real competing objectives. The Soreheim sorePlotCredits loop is well-capped (hard cap 30, once-per-day guard). Both good.

**Core tension:** 24h build is ~95% engagement infrastructure, ~5% appeal surface. The mechanics earn players who showed up. Appeal is what gets them there.

### Two Highest-Leverage Changes
1. Fix the dead time-skip feedback — `G.dayCount += 14` plus 1–2 lines of narration confirming time passed.
2. Create one appeal-first asset before the next feature pass — a single screenshot-worthy moment that communicates the game's tone in one read.

---

## 6. Feedback Loop Review

### Loop Inventory

| Loop | Type | Visibility | Status |
|------|------|------------|--------|
| stageProgress accumulation/drain | Mixed | Partial | Structurally correct; clock penalty has no recovery redirect ⚠️ |
| Watchfulness → Complication | Negative | Partial | No drain mechanic — one-way ratchet ❌ |
| Soreheim social → shopCreditBoost | Positive (hard cap) | Hidden | Well-capped; should be surfaced ⚠️ |
| Boss seed → boss trigger | Milestone-gated positive | Full/Partial | Correct design ✅ |
| Stage 2 flag → Stage 3 DC modifier | Carry-forward positive | Hidden | Hidden payoff needs narration ⚠️ |
| Item acquisition → skill → DC roll | Positive (stat cap) | Full | No issues ✅ |

### The Compounding Risk
Rival clock punishes *inaction* (stageProgress drain). Watchfulness punishes *action* (complications). Both fire in Stage II+. Together they create a squeeze with no clearly signaled middle path. Without a watchfulness drain, this is not a balanced negative loop — it's a one-way accumulator.

### Two Highest-Leverage Changes
1. **Add watchfulness drain** — `campAction('lay_low')`: watchfulness -1/-2 at cost of 1 day. Frame as opportunity ("go quiet") not punishment.
2. **Surface Stage 2 → Stage 3 DC modifier** — one narration line at Stage III mediate acknowledging the inquisitor contact. Converts hidden loop to legible earned payoff.

---

## 7. Fun Review

### Fun Type Classification
**Primary:** Mimicry + Alea. **Secondary:** Agon. **Minimal by design:** Ilinx (text RPG — correct).  
**Player motivation:** Explorers + Achievers.  
**Temporal type:** Targets Type 1 (flow in moment) with Type 2 elements. Risk: Type 3 (bounce before payoff) if Stage 1/2 onboarding is weak.

### Incentive Chains
- **Micro (per encounter):** Fully visible ✅
- **Meso (per stage):** stageProgress threshold invisible; anticipation engine requires Y to be visible ⚠️
- **Macro (across stages):** Weakest link — no visible player goal while mystery runs beneath ❌

### Tension
- **Stage 1:** Thin. DC risk is difficulty not competing objectives. Stage 1 runs on Mimicry/Explorer enjoyment.
- **Stage 2:** Substantially stronger — watchfulness/rival clock squeeze is correct "but" design.
- **Boss encounters:** Strongest tension moments — satisfy all three diagnostics. ✅

### Spider Graph — Stage 1 & 2

```
Incentive Chains     ████████░░  6/10 (micro strong, macro weak)
Tension              █████░░░░░  5.5/10 (Stage 1 weak, Stage 2 better)
Visceral Feedback    ████░░░░░░  4/10 (text ceiling, correct tradeoff)
Mechanical Depth     ████████░░  8/10
Fantasy Layer        ████████░░  8/10
Scope Reveals        ████░░░░░░  4/10 (big reveal deferred to Stage 4)
Player Clarity       █████░░░░░  5/10
```

### Two Highest-Leverage Changes
1. **Stage 2 content escalation pass** — most urgent fun risk. 27% density means incentive chain collapses exactly when it should build. No system polish fixes this.
2. **Give Stage 1 a visible surrogate macro goal** — a stated player intent that answers "what am I working toward?" without naming the conspiracy. The goal and the mystery are different things.

---

## 8. Polish Review

### Identity Constraints
**Practical:** Two fonts (Cinzel + Crimson Pro), @font-face embedded, no audio, text-only surface.  
**Conceptual:** "Make suppression feel institutional." Guild marks everywhere. Absence as presence.

### Typography — Strongest Polish Element

| Tier | Font | Role | Status |
|------|------|------|--------|
| A — Cinzel | Display serif | UI chrome, choice buttons | ✅ Correct material associations |
| B — System UI | Sans-serif stack | Labels, hints, journal tags | ✅ Neutral carrier |
| B+ — Crimson Pro 300 | Text serif non-italic | Long-form prose | ✅ Weight-300 gives breathing room |
| C — Crimson Pro italic | Atmosphere accent | <25 words: death, camp, HUD flavor | ✅ Correct pop deployment |

**Risk:** Cinzel designed for 2–7 word labels; choice labels run to 15 words. Consider 8–10 word hard cap on Cinzel-rendered choice labels.

### Audio — Clean Absence
No audio = correct architectural decision for file:// browser RPG. Tier C italic is doing audio's emotional job. **Fragility:** no safety net for weak prose moments. Forbidden-words list, 60–90 word result cap, and "scene not summary" standard are doing audio design work — must be applied without exception.

### Color — Biggest Gap
Typography has documented enforcement rules. **Color has none.** No documented identity system. Ad hoc decisions accumulating across 534 KB of content.

**Correct system for this theme:**
- Dark neutral base (institutional opacity)
- Gold/amber accent (guild marks, reward, authority)
- Danger accent (threat, watchfulness, hostile encounter)
- Discovery accent (evidence, journal, unlocked content)

Three roles, all derived from the conceptual constraint. Anything outside these four = intentional deviation.

### Pattern-Pop-Subversion Gaps
- **Boss encounter chrome** — if Dravn Pell and a Soreheim merchant have identical visual chrome, the pattern cannot pop at its most important moment.
- **Stage transitions** — no visual acknowledgment of Stage 1→2 advancement.
- **Complication firing** — no visual signal distinguishing watchfulness-triggered complications from routine encounters.

### Two Highest-Leverage Changes
1. **Document and enforce a color identity system** — five-line rule in CLAUDE.md. Same rigor as typography.
2. **Differentiate boss encounter visual chrome** — one CSS class (`encounter--boss`) applied by `enterCombat()` for narrative encounters. Border-color or background shift. Player needs to *feel* "this is different" — not be told.

---

## 9. Level Design Review

### Framework Mapping

| Spatial Concept | Ledger Equivalent |
|----------------|-------------------|
| Level / Room | Locality (22 Stage 1, Stage 2 set) |
| Critical path | stageProgress[N] → milestone thresholds |
| Navigation | Choice pool (read choices → weigh risk → commit) |
| Boss gate | stageProgress threshold trigger |
| Safe zone | Camp system |
| Embedded difficulty | Safe/risky/bold DC tier |

### Lens 1: Principles

**Stage 1 issues:**
- **Archetype selection = uninformed irrevocable choice (fail).** Player chooses entire skill distribution before understanding what each skill does. Correct fix: first locality as tutorial space demonstrating all 6 skills, archetype confirmation beat at end.
- **DC teaching (pass).** Three named tiers visible on choice buttons. Teaching through structure. ✅
- **22 localities with identical structure.** Becomes predictable by locality 6. Needs 3 distinct types: information / pressure / discovery.

**Stage 2 issues:**
- **Three-threshold milestone structure is correct architecture.** Boss=8, antechamber=12, climax gate=15. ✅
- **27% density makes the arc a grind.** Space between milestones under-populated.
- **Rival clock pressure invisible.** If rival encounter fires as surprise, it's frustration not tension.

### Lens 2: Design Layers

| Layer | Status |
|-------|--------|
| Nonlinear explorable space | Travel network exists; `G.travelMode` not yet activated ⚠️ |
| Finite resources | Gold creates training vs. items tension — correct design; calibration untested ⚠️ |
| Reactive world state | Flag-reactive NPC behavior exists; visibility inconsistent ⚠️ |
| NPC situational awareness | 5-tier model with archetype reactions; only named NPCs ⚠️ |
| Safe zones | Camp system correct; must remain genuinely safe ✅ |
| Narrative curation | Arrival kit + infrastructure-before-atmosphere = strongest narrative layer ✅ |

### Lens 3: Systems

**Combat teaching:** Does first combat introduce all four options (Press/Defend/Talk/Retreat) at low stakes? **Companion gating risk:** Vorath/Mira gate on `maren_oss_resolved`. Player may hit Stage 2 combat before acquiring companions.

**Item system:** Four families × 3 slots × 4 chains. Build identity requires the right family accessible in early localities. If items are shop-only and the correct shop is in an unvisited locality, system exists but player never engages it.

**Training cooldown:** 30-day cooldown creates time management tension only if player knows the day count. If `G.dayCount` isn't surfaced, cooldown produces confusion not decisions.

### Teaching Sequence — Full Game Arc

| Stage | Should Be | Risk |
|-------|-----------|------|
| Character creation | Informed choice | Archetype before mechanics understood ❌ |
| Stage 1 localities 1-4 | DC system + skills introduced | All 6 skills available immediately ⚠️ |
| Stage 1 boss | Mastery test | Correctly structured ✅ |
| Stage 1→2 bridge | Mini scope reveal | Exists; prose quality determines effectiveness ⚠️ |
| Stage 2 early | Rival clock + watchfulness introduced | Both invisible in HUD ❌ |
| Stage 2 boss (Dravn Pell) | Social navigation mastery test | Correctly gated + seeded ✅ |
| Stage 2 climax | Creative reuse of all systems | Depends on density ⚠️ |

### Concurrent Objectives

| Layer | Visibility |
|-------|------------|
| Macro: advance stageProgress | Visible |
| Meso: build skills + items + companions | **Mostly invisible — not on any screen** |
| Micro: choose approaches | Visible |

The meso layer is the richest concurrent system and it's entirely behind the HUD.

### Two Highest-Leverage Changes
1. **Mid-first-locality archetype confirmation beat** — play through first locality with all six skill types at low stakes, then offer "lock in your path" at the end. Converts uninformed irrevocable choice into informed contextual one.
2. **Assign Stage 2 localities explicit arc roles** — discovery (0–8), faction (8–12), reckoning (12–15). Choice pools in localities reflect their phase. Surface `stageProgress[2]` as felt pressure. Converts milestone grind into felt escalation arc.

---

## 10. What's Working

These patterns are strong — maintain them going forward:

- **Three-path boss approach routing** — expose/negotiate/disappear routes to build identity. Most direct "you are your build" feedback in the game.
- **Boss seed injection system** — telegraphs encounters before firing. Correct teaching sequence for high-stakes content.
- **DC three-tier visible system** — safe/risky/bold on choice buttons. Teaching through structure not text.
- **Typography three-tier enforcement** — Cinzel/Crimson Pro with documented rules and specificity guidance. Strongest consistency mechanism in the project.
- **IIFE module pattern in `stage3_climax.js`** — correct encapsulation with `_roll()` eliminating repetition.
- **Stage 2 → Stage 3 flag dependency** — `stage2_climax_inquisitor_contact` → DC 12 vs 15. Prior decisions have mechanical weight downstream. Correct RPG design (needs surfacing, not redesigning).
- **Locality arrival kit system** — infrastructure-before-atmosphere requirement produces distinct physical identity per locality.
- **Fisher-Yates shuffle in `loadStageChoices`** — correct implementation.
- **`_spn1`–`_spn4` stageProgress keyed-object fixes** — all four correctly scoped, correctly keyed, correctly guarded.
- **Watchfulness complication hook structure** — competing objectives in Stage 2 are correct design. The loop itself is right; it just needs a drain counterpart.
- **Prose quality** — Pell's procedural register and Voss's physical tells follow the NPC spec. Institutional tone consistent across both files.
