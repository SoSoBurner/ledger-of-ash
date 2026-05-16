# Ledger of Ash — Feature Backlog

**Last updated:** 2026-04-27 (session 5 — Phases B/C/D/E applied)
**Source:** Audited across 10+ plan files + verified against live codebase. Check this before re-planning any feature.

## Status codes
- `DONE` — wired, working, verified in code
- `PARTIAL` — code exists but incomplete or broken
- `NOT BUILT` — planned, not implemented
- `UNKNOWN` — planned, not verified (check code before assuming done)

## Summary counts
| Status | Count |
|--------|-------|
| DONE | 96 |
| PARTIAL | 5 |
| NOT BUILT | 10 |
| UNKNOWN | 6 |

---

## P0 — Fix Before Anything Else (Breaks player / fails CI)

| Feature | Status | Notes |
|---------|--------|-------|
| BUG A: 1 HP immortality — applyWound floors to 1, death never triggers | DONE | applyWound now sets G.hp=0, G.dead=true; test in combat.test.js |
| Whitebridge labels: 3 labels at 17 words — validator fails | DONE | Fixed this session; all labels ≤15 words |
| cosmoria arc line 25: addJournal uses 'decision' — invalid category | DONE | Fixed → 'intelligence' |
| cosmoria arc line 246: addJournal uses 'consequence' — invalid category | DONE | Fixed → 'discovery' |
| Heat HUD always display:none — player never sees heat system | DONE | hidden when heat=0, visible when active; commit af459aea |
| Journal overlay quest rows render [object Object] | DONE | All three render paths (updateQuestHUD, showCharSheet, journal overview) verified to handle {msg,questId} object shape correctly — Phase A audit found no fix needed. |

---

## P1 — Core Mechanical Gaps (Player will hit these)

| Feature | Status | Notes |
|---------|--------|-------|
| Camp actions `sleep`/`post_watches`/`campout`/`lay_low`/`review_notes` — buttons render but no handlers wired | NOT BUILT | spec-miner 2026-05-15: 5 of 9 camp types have DOM buttons but `campAction()` has no branch for them; clicking silently does nothing |
| Blue border for main quest choices (gold left-border CSS) | DONE | `.choice-btn.plot-main` wired at `#4a7ab5`; CSS rule exists |
| Rival direct encounter scenes (triggerRivalEncounter + resolveRivalOutcome) | DONE | do-2-replicated-newell.md; all 4 edits applied; lines 9870/9905/11201 |
| __rival__ routing in handleChoice | DONE | line 11201 |
| advanceRivals() forEach needs index (r, i) for encounter trigger | DONE | wired with encounter trigger |
| Rival lay-low drain mechanic | DONE | r.layLow=true → drain 1 renown, reset; test in rivals.test.js |
| Rival DC pressure (+1 per threshold 3/6/9) | DONE | getRivalDCMod() updated to thresholds 3/6/9; _rivalMod added to gate DC in adaptEnrichedChoice; roll display shows "(rival +N)" annotation. Phase B this session. |
| Rival clock world notice at threshold 3/6/9 | DONE | all three thresholds fire addWorldNotice |
| Universal roll DC 7 for safe choices | DONE | handleChoice: `_tier==='safe' ? 7`; test in dc-safe.test.js |
| Universal roll — every choice auto-rolls | DONE | verified L11628–11672: safe=DC7, risky=DC13, bold=DC16, stage modifier applied; all tiers auto-roll when choice.roll absent |
| Safe choice failResult field (required per CLAUDE.md) | DONE | validator rule A7 in validate-content.js; unit tests added |
| getEquippedBonus() dead for all shop items | DONE | Pipeline correct — full objects stored; regression tests added |

---

## P2 — Significant Missing Systems

| Feature | Status | Notes |
|---------|--------|-------|
| Arrival scenes (locality first-arrival narration, all localities) | DONE | locality_arrival_narrations.js covers all 22 Stage 1 localities; helper fns wired |
| Text RPG flavor packets (all 14+ localities) | DONE | All 11 missing Stage 1 packets authored and committed (bcf7ad22) |
| Enemy scaling — tiered stat variants (L1-3/L4-7/L8-10) | DONE | getEnemyStats(key, level) + getEnemyTier(level) wired |
| Group combat (Stage II+: 2-3 enemies per encounter, 35% chance) | DONE | enemyGroupCount computed; group fight rendering wired |
| Training redesign (gold cost, 3-session point, 30-day cooldown) | DONE | flat 20g cost, 3-session +1 point, 30-day cooldown; commit ac68c6ba |
| Training stat cap /10 everywhere | DONE | levelup + passive apply caps updated to /10 |
| archetypeBaseStats in G defaults (training ceiling) | DONE | G.archetypeBaseStats set at archetype selection |
| Unified item ID namespace (ITEM_DEFS ↔ SHOP_INVENTORY) | DONE | getEquippedBonus() fixed; full objects stored in G.equipped |
| Background passive traits (bgTrait per background, 55 backgrounds) | DONE | BG_TRAITS const at line 4670; bgTrait applied on background selection |
| Stage 1 NPC model compliance (remaining files) | PARTIAL | Dravn Pell, Sera Ironveil, Coralyn Tideglass, 5 locality spot check done; ~17 localities not yet audited |
| Bold tag semantic classification (code impl) | DONE | _BOLD_TAGS/_SAFE_TAGS in adaptEnrichedChoice; Accusation/Negotiation/Exposure/Betrayal/Tribunal classified bold |
| Suppression threading — Stage 1 (6 localities) | DONE | All signals present: signatory blank, procedural refusal, date gap, ADMIN HOLD, sealed wax, deflected answer |
| Stage 2 Collegium investigation path | DONE | Collegium content verified in all 5 core Stage 2 files |

---

## P3 — Large Content Expansions

| Feature | Status | Notes |
|---------|--------|-------|
| Item expansion Stage I (240 items, 4 families × 3 slots × 4 chains × 5 levels) | DONE | content/item_system.js Block H; 240 items levels 1-5 |
| Item expansion Stage II (240 items, levels 6-10) | DONE | content/item_system.js Block K; 240 items levels 6-10 |
| Macroregion bestiary (73+ enemies, 10+ per environment profile) | DONE | 73 enemies across 8 environment profiles; commits 4289726c + e8f6dcac |
| Soreheim plot currency (sorePlotCredits, social roll system) | DONE | G.sorePlotCredits in G defaults; 12 references in stage2 content |
| Economy balance (gold income baseline, price tiers, regional differentiation) | DONE | SHOP_INVENTORIES per locality; price tiers common/uncommon/rare |
| Regional shop differentiation (Psanan/Soreheim/Union sources) | DONE | 11 locality shops in item_system.js with regional flavor |
| Party combat — companion passive bonuses | DONE | getCompanionPassiveBonus() wired into combat resolution |
| Party combat — companion combat abilities (1 use per fight) | DONE | COMPANION_ABILITIES const; 1-use-per-fight tracking |
| Combat escalation path (threatLevel → yellow/orange/red choice border) | DONE | threatLevel computed; CSS classes wired to choice buttons |
| Distance system visible in combat UI (range tier display) | DONE | rangeTier rendered in combat HUD |
| Boss narrative buildup flags (NPC must appear 2+ times before boss) | DONE | stage1_miniboss_seeded_1/2 in stage1_boss.js; stage2_miniboss_seed_seen in stage2_boss.js |
| Stage 1 macro goal system | DONE | _macroGoals object defined ~line 9977; G.quests.unshift() loads macro goal from archetype.group at stage start |
| Companion dynamic placement in narrative | DONE | G.companions tracked; getActiveCompanions() maps companions into narration strings; lines 2369-2384 |
| Nomdara drift system | DONE | driftNomdara() function wired; G.nomdara_visited + G.nomdara_last_visit_locality tracked; drift_interval_time_units property |
| districts_stage1_enriched_choices.js | DONE | file exists; script tag at line 16304 |
| nomdara_stage1_choices.js | DONE | file exists; script tag at line 16305 |
| Fumble locking (main plot locks + backup injection) | PARTIAL | Code complete. Activation requires adding `{type:'flag', key:'fumble_locked', value:true}` to at least one choice in each Stage 1 file where a main plot choice fumbles. Deferred to Stage 2 polish pass. |
| Archetype confirmation screen | DONE | doSleepScene() checks G.flags.archetype_confirmed; shows confirmation choice at first rest; grants +1 renown; lines 13618-13643 |

---

## P4 — UX & Polish

| Feature | Status | Notes |
|---------|--------|-------|
| DC recalibration (level-scaling: baseDC + floor((level-1)/2)) | NOT BUILT | 1-full-roll-craft Block B |
| Skills→Stats terminology in player-facing UI | NOT BUILT | 1-full-roll-craft Block A; internal G.skills keys unchanged |
| Abilities/Traits sections in character sheet | NOT BUILT | 1-full-roll-craft Block A |
| Tutorial / onboarding (5-page modal at new game) | DONE | #onboarding-modal with page system (_onboardingPage), showOnboarding(), skip option; lines 1642-1696, 8889-8941 |
| How-to-play screen | DONE | #howto-modal with .active state, h2/h3 headers, close button; lines 1721-1731 |
| Stage progress bar in HUD | DONE | #stage-progress-label shows "X / N" below bar; CSS + JS wired |
| World clock onboarding tooltip (first increment per clock) | DONE | G.tutorialFlags['first_watchfulness/pressure/reverence'] checked at lines 15368-15374; one-shot notices wired |
| Character creation mechanic explanation (per archetype card) | DONE | mechNote field defined in archetype objects and rendered in archetype card selection UI |
| .env-desc font 19px→17px | DONE | Currently 15px (reduced further) |
| Narrative scroll bottom padding fix (48px→100px) | DONE | #narrative-scroll padding-bottom 100px |
| #panel-action empty guard (ensureActionContent fallback) | DONE | `if (!querySelector('.choice-block')) loadStageChoices()` pattern in 8+ locations |
| Journal evidence category counts | DONE | updateJournalHUD() shows ev/int/rum/disc summary header |
| Crit rewards (+XP, +stageProgress on nat 20) | DONE | Implemented at line 11807; was calling nonexistent addXP — fixed to gainXp(1); stageProgress +1 wired |
| Rest limit (2× per day, G.restCount) | DONE | Enforced at line 13342: `if ((G.restCount||0) >= 2)` blocks third rest. G.restCount resets to 0 on day advance. Phase E2 verified this session. |
| Auto-save after every choice | DONE | saveGame() called at line 10765 (enriched path) and line 10721 (gate path) after every resolved choice |
| Save export / JSON download | DONE | btn-export-save + exportSave() creates JSON blob download 'loa-save-*.json'; lines 1847, 15987-15990 |
| Sandbox mode (post-Stage 3 blocker, Stage II stays open) | NOT BUILT | prancy-growing; blocker never fires (hardcoded false) |
| Second-person choice labels ("You…" register) | NOT BUILT | inspect-create; CLAUDE.md still uses inner-voice framing |
| GitHub Pages / itch.io deployment | NOT BUILT | prancy-growing; Azure only currently |
| CSS token system (--white, --ink-mid, --modal-bg) | DONE | Tokens defined in :root; button/modal raw hex replaced |

---

## DONE — Verified This Session or Prior

### Engine
| Feature | Notes |
|---------|-------|
| HP double-apply fix | Removed from checkLevelUp(), kept in _finalizeLevelUp() |
| BUG A: 1HP immortality fix | applyWound sets G.hp=0, G.dead=true; test added |
| archetype.group→family in _finalizeLevelUp | commit 273e100c |
| validate-structure.js regex fix (nested parens) | `[^)]+` → paren-safe pattern |
| Duplicate choice text race condition (BUG B) | renderChoices fixed |
| addJournal missing category in camp rest | Fixed in NPC compliance pass |
| DC safe=7 (was 8) | handleChoice: `_tier==='safe' ? 7` |
| Rival lay-low drain | r.layLow → drain 1 renown, reset layLow=false |
| Rival threshold notices 3/6/9 | G._rivalNoticeCount + addWorldNotice at each threshold |
| Rival direct encounter scenes | triggerRivalEncounter + resolveRivalOutcome + __rival__ routing |
| CSS tokens | --white, --ink-mid, --modal-bg in :root |
| Bold tag semantic classification | _BOLD_TAGS + _SAFE_TAGS in adaptEnrichedChoice |

### Content Standards
| Feature | Notes |
|---------|-------|
| cosmoria_to_shelk_arc.js:13 label | Fixed this session |
| cosmoria_to_shelk_arc.js:96 label | Fixed prior session |
| guildheart_hub_to_shelk_arc.js:120 label | Fixed prior session |
| soreheim_proper_stage1:13 label + 'Meaningful' tag | Fixed prior session |
| Whitebridge Commune labels | Fixed this session |
| cosmoria arc addJournal 'decision'/'consequence' | Fixed this session → 'intelligence'/'discovery' |
| Suppression threading — 6 Stage 1 localities | Shelk/Soreheim/Guildheart/Fairhaven/Cosmoria/Whitebridge |
| Stage 2 Collegium investigation path | All 5 core Stage 2 files verified |
| validate-content rule A7 (failResult) | commit 7720a646 |

### Core Systems
| Feature | Notes |
|---------|-------|
| Living narration (locality_narrations.js) | Wired |
| Heat HUD immediate update on addHeat() | updateHeatHUD() extracted from updateHUD(); called from addHeat() so panel updates without waiting for next full HUD refresh. Phase C this session. |
| Heat encounter queue in addHeat() | G._pendingHeatEncounter set when heat crosses 3/5/8; loadStageChoices() already consumes it via checkHeatConsequences() + heat patrol check. Phase C verified. |
| applyEffect() missing cases: xp/flag/stat/heat | All four cases added to switch. `flag` supports set/clear via value field. `stat` normalises display→internal skill keys. Phase D this session. |
| Choice panel always has ≥1 option | Base fallback confirmed |
| Rival clock basic (advanceRivals) | Exists in engine |
| Rival direct encounters | triggerRivalEncounter wired |
| Heat system (G.heat, getHeat, addHeat, 11 polities) | Coded |
| Heat authority confrontation (enterAuthorityConfrontation) | Wired |
| Archetype system (31 archetypes, getArchetypeFamily) | Wired |
| Alignment system (benevolence/orderAxis ±50) | Character sheet renders both |
| Quest system (G.quests, addQuest, questHints) | Wired |
| Maren Oss encounter | Wired |
| Stage 2 companion gate (maren_oss_resolved) | Wired |
| stage2_faction_contact_made flag — SET locations | 50+ locations in content |
| Typography system (3-tier Cinzel/system-ui/Crimson Pro) | Per CLAUDE.md |
| Arrival scenes (22 Stage 1 localities) | locality_arrival_narrations.js; all 22 covered |
| Stage progress numeric label | #stage-progress-label; "X / N" format |
| Journal category count header | updateJournalHUD() ev/int/rum/disc summary |
| Blank panel guard | if (!querySelector('.choice-block')) loadStageChoices() — 8+ locations |
| Font reductions | .env-desc 15px, .result-text 14.7px |
| Scroll padding | #narrative-scroll padding-bottom 100px |

### NPC Compliance
| Feature | Notes |
|---------|-------|
| Dravn Pell tell + subtext | commit 0666fdab |
| Sera Ironveil pronoun consistency | commit 0666fdab |
| Coralyn Tideglass tell + subtext | commit 6fcdc941 |
| Stage 1 spot check (5 localities) | commit 61a8ecb9 |

### Content
| Feature | Notes |
|---------|-------|
| 22 Stage 1 localities with enriched choices | All files exist |
| Stage 1 boss (Sera Ironveil, stage1_boss.js) | Exists |
| Archetype midspines (combat/magic/stealth/support) | 4 files exist |
| All 12 travel arc files (cosmoria, guildheart, etc.) | All in content/ |
| Travel arc soft trigger (inv≥5) | Condition functions present |
| Travel arc hard gate (level≥6) | Wired |
| Stage 2 locality enriched choices | All files exist; 21-26 choices each |
| Stage 2 expansion (+4 choices per locality) | Recent commits confirmed |
| Stage 2 global specials (stage2_enriched_choices.js) | 2216 lines |
| Stage 2 antechamber | Gate confirmed |
| Stage 2 boss (stage2_boss.js) | Exists |
| Stage 2 climax (stage2_climax.js) | Wired, sets maren_oss_resolved |
| Stage 3 gate hardcoded false | Correct for V1.0 |
| Stage 3 content locked (40 choices, 903 lines) | Real content, locked |
| Stage 3 climax locked (198 lines) | Real content, locked |

### Testing
| Feature | Notes |
|---------|-------|
| Content validator (validate-content.js) | Runs; 838 pre-existing violations (label length) |
| Content validator rule A7 (failResult) | New; 0 violations (scalar tag:'safe' not yet in content) |
| Flag validator (validate-flags.js) | Runs |
| Structure validator (validate-structure.js) | Fixed — regex false positive resolved |
| Basic combat engine (enterCombat/startCombat) | Wired |
| Jest logic tests — 106 passing | rivals, combat, dc-safe, equipment-bonus, addjournal |

---

## Source Plan Files

| Plan file | Topic |
|-----------|-------|
| `ask-me-the-answer-scalable-rabbit.md` | Main plan: arrival scenes, travel, NPC tiers, Stage 2 escalation, combat |
| `tender-twirling-stallman.md` | V1.0 completion: feedback systems, suppression, Stage 2 expansion, NPC compliance |
| `enchanted-greeting-matsumoto.md` | V1.0 systems: bugs A/B, watchfulness, HUD, companion, rival, Soreheim economy |
| `balance-polish-fixes.md` | Rival DC pressure, lay-low, bold tags, CSS tokens |
| `do-2-replicated-newell.md` | Rival direct encounter scenes |
| `inspect-create-wrap-and-see-silly-hare.md` | UI polish: font scale, scroll fix, blank panel |
| `prancy-growing-sunset.md` | V0.1 release: tutorial, fumble locking, rival clock, deployment |
| `eager-swimming-backus.md` | Stage 2 campaign debug + Stage 1 expansion (mega-plan) |
| `stage-gates-are-supposed-encapsulated-cloud.md` | Testing framework |
| `1-full-roll-craft-groovy-horizon.md` | V0.1 systems & balance: 8 bug fixes, Blocks A–L |
| `smooth-exploring-bumblebee.md` | V0.1 — all phases marked complete |
| `docs/superpowers/plans/2026-04-23-stage2-escalation-pass.md` | Stage 2 density + Collegium path — DONE |
| `docs/superpowers/plans/2026-04-23-suppression-threading.md` | Stage 1 suppression signals — DONE |
| `docs/superpowers/plans/2026-04-23-npc-model-compliance.md` | NPC agenda/register/tell audit — PARTIAL |
| `docs/superpowers/plans/2026-04-23-player-feedback-systems.md` | Stage progress label + journal counts — DONE |
| `docs/superpowers/plans/2026-04-26-p0-bug-fix-pass.md` | BUG A, whitebridge, cosmoria — DONE |
| `docs/superpowers/plans/2026-04-26-p1-rival-system.md` | Rival lay-low + thresholds — DONE |
| `docs/superpowers/plans/2026-04-26-p1-dc-fix.md` | DC safe=7 — DONE |
| `docs/superpowers/plans/2026-04-26-p1-equipment-bonus-audit.md` | Equipment bonus pipeline — DONE |
| `docs/superpowers/plans/2026-04-26-p1-failresult-validator.md` | Validator rule A7 — DONE |

---

## LABEL VIOLATIONS (Apr 27 2026 audit — log only, do not rewrite frozen Stage 1 content)

**Scanned:** All Stage 1 enriched choice files + stage2_enriched_choices.js

| Type | Count | Notes |
|------|-------|-------|
| Over 15 words | 359 | Pre-existing debt; matches known 838-violation baseline. Majority in Stage 1 investigation chains. |
| Infinitive starts | 2 | `glasswake_commune_stage1_enriched_choices.js:158` — "Speak to the newest researcher..."; `harvest_circle_stage1_enriched_choices.js:910` — "Speak to the Iron Compact's..." |
| Question marks | 0 | Clean |

**May 15 2026 headed spec audit — 6 additional infinitive violations detected at runtime:**

| Label | File (approx) | Stage |
|-------|--------------|-------|
| "Walk toward the garrison" | Stage 1 locality | 1 |
| "Find a quiet corner" | Stage 1 locality | 1 |
| "Find the local inn" | Stage 1 locality | 1 |
| "Walk the settlement" | Stage 1 locality | 1 |
| "Try to talk this down" | Stage 1 locality | 1 |
| "Find a healer in the settlement" | Stage 1 locality | 1 |

**Action:** Do not rewrite Stage 1 labels (stage is frozen). Apply label standard to all new Stage 2+ choices before commit.

---

## STAGE 2 CONTENT DENSITY — VERIFIED DONE (Apr 27 2026 correction)

**Prior session incorrectly flagged this NOT BUILT** — counting error: only counted the global pool
(stage2_enriched_choices.js) and missed 17 per-locality Stage 2 files.

**Actual state:** 17 per-locality Stage 2 enriched choice files exist (same coverage as Stage 1),
each with 21–39 choices. shelkopolis_stage2_enriched_choices.js: 39 choices, 1127 lines.
Total Stage 2 choice count substantially exceeds 56. World Expansion Rule is satisfied.

**Status:** DONE — matches BACKLOG line "Stage 2 locality enriched choices | All files exist; 21-26 choices each"
