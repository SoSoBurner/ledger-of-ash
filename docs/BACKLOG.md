# Ledger of Ash — Feature Backlog

**Last updated:** 2026-04-26  
**Source:** Audited across 10+ plan files this session. Check this before re-planning any feature.

## Status codes
- `DONE` — wired, working, verified in code
- `PARTIAL` — code exists but incomplete or broken
- `NOT BUILT` — planned, not implemented
- `UNKNOWN` — planned, not verified (check code before assuming done)

## Summary counts
| Status | Count |
|--------|-------|
| DONE | 38 |
| PARTIAL | 13 |
| NOT BUILT | 37 |
| UNKNOWN | 22 |

---

## P0 — Fix Before Anything Else (Breaks player / fails CI)

| Feature | Status | Notes |
|---------|--------|-------|
| BUG A: 1 HP immortality — applyWound floors to 1, death never triggers | NOT BUILT | enchanted-greeting-matsumoto.md |
| Whitebridge labels: 3 labels at 17 words — validator fails | NOT BUILT | validate-content.js reports these |
| cosmoria arc line 25: addJournal uses 'decision' — invalid category | NOT BUILT | validate-structure.js will flag |
| cosmoria arc line 246: addJournal uses 'consequence' — invalid category | NOT BUILT | validate-structure.js will flag |
| Heat HUD always display:none — player never sees heat system | PARTIAL | exists in code, never rendered |

---

## P1 — Core Mechanical Gaps (Player will hit these)

| Feature | Status | Notes |
|---------|--------|-------|
| Blue border for main quest choices (gold left-border CSS) | NOT BUILT | tender-twirling-stallman.md; no border logic in choice renderer |
| Rival direct encounter scenes (triggerRivalEncounter + resolveRivalOutcome) | NOT BUILT | do-2-replicated-newell.md; 4 edits to ledger-of-ash.html |
| __rival__ routing in handleChoice | NOT BUILT | do-2-replicated-newell.md |
| advanceRivals() forEach needs index (r, i) for encounter trigger | NOT BUILT | do-2-replicated-newell.md |
| Rival lay-low drain mechanic | NOT BUILT | balance-polish-fixes.md |
| Rival DC pressure (+1 per threshold 3/6/9) | NOT BUILT | balance-polish-fixes.md; _dcPenalty not wired |
| Rival clock world notice at threshold 6 | PARTIAL | notices at 3/5 only; 6 and 9 missing |
| Universal roll DC 7 for safe choices (code uses DC 8) | PARTIAL | CLAUDE.md spec says 7; engine uses 8 |
| Universal roll — every choice auto-rolls | PARTIAL | safe auto-roll documented; not all choices wired |
| Safe choice failResult field (required per CLAUDE.md) | NOT BUILT | no enforcement or audit |
| getEquippedBonus() dead for all shop items (Fix 2) | DONE | Pipeline correct — full objects stored; regression tests added; ITEM_DEFS guarded in crafting |

---

## P2 — Significant Missing Systems

| Feature | Status | Notes |
|---------|--------|-------|
| Arrival scenes (locality first-arrival narration, all localities) | NOT BUILT | Phase 1 of ask-me-the-answer; never implemented |
| Text RPG flavor packets (9 of 14 localities missing packets) | PARTIAL | Only ~5 localities have text_rpg_packets data |
| Enemy scaling — tiered stat variants (L1-3/L4-7/L8-10) | NOT BUILT | 1-full-roll-craft Block D; currently 7 flat templates for all levels |
| Group combat (Stage II+: 2-3 enemies per encounter, 35% chance) | NOT BUILT | 1-full-roll-craft Block D3 |
| Training redesign (gold cost, 3-session point, 30-day cooldown) | NOT BUILT | 1-full-roll-craft Block C; currently costs watchfulness |
| Training stat cap /10 everywhere | NOT BUILT | currently /5 in all UI |
| archetypeBaseStats in G defaults (training ceiling) | NOT BUILT | prerequisite for Block C |
| Unified item ID namespace (ITEM_DEFS ↔ SHOP_INVENTORY) | NOT BUILT | 1-full-roll-craft Block L; prerequisite for all item work |
| Background passive traits (bgTrait per background, 55 backgrounds) | NOT BUILT | 1-full-roll-craft Block J |
| Stage 1 NPC model compliance (remaining files) | PARTIAL | some files fixed in recent commits; not all |
| Bold tag semantic classification (code impl) | PARTIAL | mapping in CLAUDE.md; code impl unclear |
| _abilRemap inverted — archetype ability gating broken (Fix 1) | UNKNOWN | maps to display names; G.skills uses internal keys |
| Training stat cap unconditional++ (Fix 3) | UNKNOWN | no post-click guard |
| equipItem() crashes on null G.equipped (Fix 4) | UNKNOWN | unequipItem() guards; equipItem() does not |
| Range modifier computed but never applied (Fix 5) | UNKNOWN | getRangeModifier() called but not included in attack total |
| getTraitBonus() hardcoded archetype IDs won't scale (Fix 6) | UNKNOWN | 1-full-roll-craft Fix 6 |
| endCombat() logs round count after CS=null (Fix 8) | UNKNOWN | 1-full-roll-craft Fix 8 |

---

## P3 — Large Content Expansions

| Feature | Status | Notes |
|---------|--------|-------|
| Item expansion Stage I (240 items, 4 families × 3 slots × 4 chains × 5 levels) | NOT BUILT | 1-full-roll-craft Block H; currently 18 ITEM_DEFS |
| Item expansion Stage II (240 items, levels 6-10) | NOT BUILT | 1-full-roll-craft Block K |
| Macroregion bestiary (73+ enemies, 10+ per environment profile) | NOT BUILT | 1-full-roll-craft Block D4; currently 7 templates total |
| Soreheim plot currency (sorePlotCredits, social roll system) | NOT BUILT | 1-full-roll-craft Block I2; not in G defaults |
| Economy balance (gold income baseline, price tiers, regional differentiation) | NOT BUILT | 1-full-roll-craft Block I |
| Regional shop differentiation (Psanan/Soreheim/Union sources) | NOT BUILT | 1-full-roll-craft Block I3 |
| Party combat — companion passive bonuses | NOT BUILT | 1-full-roll-craft Block F1; compBonus≈0 currently |
| Party combat — companion combat abilities (1 use per fight) | NOT BUILT | 1-full-roll-craft Block F2 |
| Combat escalation path (threatLevel → yellow/orange/red choice border) | NOT BUILT | 1-full-roll-craft Block G1 |
| Distance system visible in combat UI (range tier display) | NOT BUILT | 1-full-roll-craft Block G3; rangeTier computed, not shown |
| Boss narrative buildup flags (NPC must appear 2+ times before boss) | PARTIAL | boss files exist; buildup flags not confirmed |
| Stage 1 macro goal system | UNKNOWN | enchanted-greeting; not verified |
| Companion dynamic placement in narrative | UNKNOWN | enchanted-greeting; not verified |
| Nomdara drift system | UNKNOWN | eager-swimming; not verified |
| districts_stage1_enriched_choices.js | UNKNOWN | eager-swimming; not verified |
| nomdara_stage1_choices.js | UNKNOWN | eager-swimming; not verified |
| Fumble locking (main plot locks + backup injection) | NOT BUILT | prancy-growing; js/loa-enriched-bridge.js is dead |
| Archetype confirmation screen | UNKNOWN | enchanted-greeting; not verified |

---

## P4 — UX & Polish

| Feature | Status | Notes |
|---------|--------|-------|
| DC recalibration (level-scaling: baseDC + floor((level-1)/2)) | NOT BUILT | 1-full-roll-craft Block B |
| Skills→Stats terminology in player-facing UI | NOT BUILT | 1-full-roll-craft Block A; internal G.skills keys unchanged |
| Abilities/Traits sections in character sheet | NOT BUILT | 1-full-roll-craft Block A |
| Tutorial / onboarding (5-page modal at new game) | UNKNOWN | prancy-growing; not verified |
| How-to-play screen | UNKNOWN | prancy-growing; not verified |
| Stage progress bar in HUD | UNKNOWN | prancy-growing; not verified |
| World clock onboarding tooltip (first increment per clock) | UNKNOWN | prancy-growing; not verified |
| Character creation mechanic explanation (per archetype card) | UNKNOWN | prancy-growing; not verified |
| .env-desc font 19px→17px | UNKNOWN | inspect-create; not verified |
| Narrative scroll bottom padding fix (48px→100px) | UNKNOWN | inspect-create; not verified |
| #panel-action empty guard (ensureActionContent fallback) | PARTIAL | fallback choices exist; deferred guard unclear |
| Crit rewards (+XP, +stageProgress on nat 20) | UNKNOWN | prancy-growing; not verified |
| Rest limit (2× per day, G.restCount) | UNKNOWN | prancy-growing; not verified |
| Auto-save after every choice | UNKNOWN | prancy-growing; not verified |
| Save export / JSON download | UNKNOWN | prancy-growing; not verified |
| Sandbox mode (post-Stage 3 blocker, Stage II stays open) | NOT BUILT | prancy-growing; blocker never fires (hardcoded false) |
| Second-person choice labels ("You…" register) | NOT BUILT | inspect-create; CLAUDE.md still uses inner-voice framing |
| GitHub Pages / itch.io deployment | NOT BUILT | prancy-growing; Azure only currently |

---

## DONE — Verified This Session

### Engine
| Feature | Notes |
|---------|-------|
| HP double-apply fix | Removed from checkLevelUp(), kept in _finalizeLevelUp() |
| archetype.group→family in _finalizeLevelUp | commit 273e100c |
| validate-structure.js regex fix (nested parens) | `[^)]+` → paren-safe pattern |
| Duplicate choice text race condition (BUG B) | renderChoices fixed |
| addJournal missing category in camp rest | Fixed in NPC compliance pass |

### Content Standards
| Feature | Notes |
|---------|-------|
| cosmoria_to_shelk_arc.js:13 label (was 33-word directive) | Fixed this session |
| cosmoria_to_shelk_arc.js:96 label (question mark) | Fixed prior session |
| guildheart_hub_to_shelk_arc.js:120 label (question mark) | Fixed prior session |
| soreheim_proper_stage1:13 label + 'Meaningful' tag | Fixed prior session |

### Core Systems
| Feature | Notes |
|---------|-------|
| Living narration (locality_narrations.js) | Wired |
| Choice panel always has ≥1 option | Base fallback confirmed |
| Rival clock basic (advanceRivals) | Exists in engine |
| Heat system (G.heat, getHeat, addHeat, 11 polities) | Coded |
| Heat authority confrontation (enterAuthorityConfrontation) | Wired |
| Archetype system (31 archetypes, getArchetypeFamily) | Wired |
| Alignment system (benevolence/orderAxis ±50) | Character sheet renders both |
| Quest system (G.quests, addQuest, questHints) | Wired |
| Maren Oss encounter | Wired |
| Stage 2 companion gate (maren_oss_resolved) | Wired |
| stage2_faction_contact_made flag — SET locations | 50+ locations in content |
| Typography system (3-tier Cinzel/system-ui/Crimson Pro) | Per CLAUDE.md |

### Content
| Feature | Notes |
|---------|-------|
| 22 Stage 1 localities with enriched choices | All files exist |
| Stage 1 boss (Sera Ironveil, stage1_boss.js) | Exists |
| Archetype midspines (combat/magic/stealth/support) | 4 files exist |
| All 12 travel arc files (cosmoria, guildheart, etc.) | All in content/ |
| Travel arc soft trigger (inv≥5) | Condition functions present |
| Travel arc hard gate (level≥6) | Wired |
| Stage 2 locality enriched choices | All files exist |
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
| Content validator (validate-content.js) | Runs; 838 pre-existing violations |
| Flag validator (validate-flags.js) | Runs |
| Structure validator (validate-structure.js) | Fixed today |
| Basic combat engine (enterCombat/startCombat) | Wired |

---

## Source Plan Files

| Plan file | Topic |
|-----------|-------|
| `ask-me-the-answer-scalable-rabbit.md` | Main plan: arrival scenes, travel, NPC tiers, Stage 2 escalation, combat |
| `tender-twirling-stallman.md` | V1.0 completion: feedback systems, suppression, Stage 2 expansion, NPC compliance |
| `enchanted-greeting-matsumoto.md` | V1.0 systems: bugs A/B, watchfulness, HUD, companion, rival, Soreheim economy |
| `balance-polish-fixes.md` | Rival DC pressure, lay-low, bold tags, CSS tokens |
| `do-2-replicated-newell.md` | Rival direct encounter scenes (4 HTML edits) |
| `inspect-create-wrap-and-see-silly-hare.md` | UI polish: font scale, scroll fix, choice voice, blank panel |
| `prancy-growing-sunset.md` | V0.1 release: tutorial, fumble locking, rival clock, deployment |
| `eager-swimming-backus.md` | Stage 2 campaign debug + Stage 1 expansion (mega-plan) |
| `stage-gates-are-supposed-encapsulated-cloud.md` | Testing framework |
| `1-full-roll-craft-groovy-horizon.md` | V0.1 systems & balance: 8 bug fixes, Blocks A–L |
| `smooth-exploring-bumblebee.md` | V0.1 — all phases marked complete |
| `2026-04-26-systems-audit-fixes.md` | This session: HP fix, 3 label violations |
