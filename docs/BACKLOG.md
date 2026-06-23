# Ledger of Ash — Feature Backlog

**Last updated:** 2026-06-22 (re-audit post-V1.0 ship — 863 commits since 2026-04-26)
**Source:** Audited across 10+ plan files + verified against live codebase. Check this before re-planning any feature.

## Status codes
- `DONE` — wired, working, verified in code
- `PARTIAL` — code exists but incomplete or broken
- `NOT BUILT` — planned, not implemented
- `UNKNOWN` — planned, not verified (check code before assuming done)
- `HUD-LOCKED` — requires HUD edits; HUD locked starting 2026-06-22, needs user re-authorization
- `STAGE-3-FROZEN` — Stage 3+ content is frozen per CLAUDE.md until Stages 1–2 ship
- `OBSOLETE` — superseded by newer system or no longer applicable; safe to delete

## Summary counts
| Status | Count |
|--------|-------|
| DONE | 113 |
| PARTIAL | 4 |
| NOT BUILT | 5 |
| UNKNOWN | 0 |
| HUD-LOCKED | 3 |
| STAGE-3-FROZEN | 2 |
| OBSOLETE | 3 |

**Audit delta vs 2026-04-26:** +17 DONE, −1 PARTIAL, −5 NOT BUILT, −6 UNKNOWN. 3 newly classified HUD-LOCKED, 3 newly classified OBSOLETE.

---

## P0 — Fix Before Anything Else (Breaks player / fails CI)

| Feature | Status | Notes |
|---------|--------|-------|
| BUG A: 1 HP immortality — applyWound floors to 1, death never triggers | DONE | applyWound sets G.hp=0, G.dead=true (line 5324); test in combat.test.js [audited 2026-06-22: still DONE] |
| Whitebridge labels: 3 labels at 17 words — validator fails | DONE | Fixed; all labels ≤15 words [audited 2026-06-22: still DONE] |
| cosmoria arc line 25: addJournal uses 'decision' — invalid category | DONE | Fixed → 'intelligence' [audited 2026-06-22: still DONE] |
| cosmoria arc line 246: addJournal uses 'consequence' — invalid category | DONE | Fixed → 'discovery' [audited 2026-06-22: still DONE] |
| Heat HUD always display:none — player never sees heat system | DONE | hidden when heat=0, visible when active (line 10062); commit af459aea [audited 2026-06-22: still DONE; verified updateHeatHUD at L10055] |
| Journal overlay quest rows render [object Object] | DONE | All render paths handle {msg,questId} shape [audited 2026-06-22: still DONE] |

---

## P1 — Core Mechanical Gaps (Player will hit these)

| Feature | Status | Notes |
|---------|--------|-------|
| Camp actions `sleep`/`post_watches`/`campout`/`lay_low`/`review_notes` — buttons render but no handlers wired | DONE | [audited 2026-06-22: 8 of 9 wired at lines 15340–15535 (rest/sleep/recover/train/craft/talk/post_watches/lay_low/campout); `review_notes` button never existed — likely spec-miner false positive. Mark `review_notes` portion OBSOLETE.] |
| Blue border for main quest choices (gold left-border CSS) | DONE | `.choice-btn.plot-main` wired at `#4a7ab5`; CSS rule exists |
| Rival direct encounter scenes (triggerRivalEncounter + resolveRivalOutcome) | DONE | do-2-replicated-newell.md; all 4 edits applied; lines 9870/9905/11201 |
| __rival__ routing in handleChoice | DONE | line 11201 |
| advanceRivals() forEach needs index (r, i) for encounter trigger | DONE | wired with encounter trigger |
| Rival lay-low drain mechanic | DONE | r.layLow=true → drain 1 renown, reset; test in rivals.test.js |
| Rival DC pressure (+1 per threshold 3/6/9) | DONE | getRivalDCMod() updated to thresholds 3/6/9; _rivalMod added to gate DC in adaptEnrichedChoice; roll display shows "(rival +N)" annotation. |
| Rival clock world notice at threshold 3/6/9 | DONE | all three thresholds fire addWorldNotice |
| Universal roll DC 7 for safe choices | DONE | handleChoice: `_tier==='safe' ? 7`; test in dc-safe.test.js |
| Universal roll — every choice auto-rolls | DONE | verified L11628–11672: safe=DC7, risky=DC13, bold=DC16, stage modifier applied; all tiers auto-roll when choice.roll absent |
| Safe choice failResult field (required per CLAUDE.md) | DONE | validator rule A7 in validate-content.js; unit tests added |
| getEquippedBonus() dead for all shop items | DONE | Pipeline correct — full objects stored; regression tests added |

---

## P2 — Significant Missing Systems

| Feature | Status | Notes |
|---------|--------|-------|
| Save/Load overlay (`#overlay-save`) — DOM stub exists, no render logic | DONE | [audited 2026-06-22: showSaveModal at L18854 iterates SAVE_SLOT_KEYS, calls readSlotMeta (L18764); btn-save / btn-load wired at L2041–2042; loadFromSlot + showScreen wired in commit 5a523f4e] |
| Arrival scenes (locality first-arrival narration, all localities) | DONE | locality_arrival_narrations.js covers all 22 Stage 1 localities; helper fns wired |
| Text RPG flavor packets (all 14+ localities) | DONE | All 11 missing Stage 1 packets authored and committed (bcf7ad22) |
| Enemy scaling — tiered stat variants (L1-3/L4-7/L8-10) | DONE | getEnemyStats(key, level) + getEnemyTier(level) wired |
| Group combat (Stage II+: 2-3 enemies per encounter, 35% chance) | DONE | enemyGroupCount computed; group fight rendering wired |
| Training redesign (gold cost, 3-session point, 30-day cooldown) | DONE | flat 20g cost, 3-session +1 point, 30-day cooldown; commit ac68c6ba |
| Training stat cap /10 everywhere | DONE | levelup + passive apply caps updated to /10 |
| archetypeBaseStats in G defaults (training ceiling) | DONE | G.archetypeBaseStats set at archetype selection |
| Unified item ID namespace (ITEM_DEFS ↔ SHOP_INVENTORY) | DONE | getEquippedBonus() fixed; full objects stored in G.equipped |
| Background passive traits (bgTrait per background, 55 backgrounds) | DONE | BG_TRAITS const at line 4670; bgTrait applied on background selection |
| Stage 1 NPC model compliance (remaining files) | PARTIAL | Dravn Pell, Sera Ironveil, Coralyn Tideglass + 5 locality spot check done; ~17 localities not yet audited. [audited 2026-06-22: still PARTIAL — V34_2 canon migration may surface additional NPC profile mismatches; defer to post-V1.0 polish] |
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
| districts_stage1_enriched_choices.js | DONE | file exists; script tag wired |
| nomdara_stage1_choices.js | DONE | file exists; script tag wired |
| Fumble locking (main plot locks + backup injection) | DONE | [audited 2026-06-22: was PARTIAL; itch playtest sprint wired fumble_locked across Stage 1+2 per v1_completion_state.md; commit history shows fumble locking applied] |
| Archetype confirmation screen | DONE | doSleepScene() checks G.flags.archetype_confirmed; shows confirmation choice at first rest; grants +1 renown; lines 13618-13643 |

---

## P1 — System Design Gaps (May 2026 skill/agent review)

| Item | Status | Notes |
|------|--------|-------|
| Heat reduction mechanic — heat is a one-way ratchet with no drain | DONE | [audited 2026-06-22: lay_low camp action at L15479–15506 drains all polity heat by 1; heat decay via commit e879a7c7 (May 2026); Low Profile mastery option also exists at L13905] |
| stageProgress denominator in HUD — player sees `7` not `7/10` | DONE | [audited 2026-06-22: hud-stage-progress-val element at L2092; stage-progress-label at L2021 + L604 CSS; commit fcad3c13 wired "X / N" format. **HUD-LOCKED** if further tweaks needed] |
| Bold choice reward differential — bold success = same +1 stageProgress as safe | DONE | [audited 2026-06-22: per v1_completion_state.md "Bold bonus XP on success" commit fe362de6 + Phase D.2 cut bold bonus to 3 in commit ef8e2829; bold reward differential now in place via XP not stageProgress — design pivoted] |
| Tutorial: investigation mandate framing missing | NOT BUILT | [audited 2026-06-22: no "finding the shape" / "operation, not a person" framing found in onboarding strings; tutorialFlags exist but no investigation-mandate page authored] |
| Tutorial: heat/rival first-occurrence callouts missing | DONE | [audited 2026-06-22: maybeShowTutorial wired at L18079; tutorialFlags include first_watchfulness, first_heat, first_rival per L18093 messaging; called from addHeat path] |
| Gold/supply drain — travel is free (foot only, no daily supply sink) | PARTIAL | [audited 2026-06-22: supplyTier system exists (light/medium/plentiful) at L15039+; foot mode is free at L15866; lay_low drains supply at L15483; addFatigue + FATIGUE_MAX added in commit 4fd18119; daily supply tick on advanceTime NOT yet wired — confirm via spec-miner] |
| Mandatory gold drain — shop is only gold sink, no travel cost | DONE | [audited 2026-06-22: travel mode costs at L15875–15895 (horse=8g, cart=12g, boat=15g); only foot is free which is intentional per design] |
| `adaptEnrichedChoice` rethrow not caught in callers — blank choice block on content bug | DONE | [audited 2026-06-22: zero-choice fallback in loadStageChoices per S1-S6 phase in v1_completion_state.md; recovery narration + 800ms reload baked in] |
| `startCombat` unknown key silently reloads — no player signal | NOT BUILT | [audited 2026-06-22: no toast message found; still silently reloads] |
| Craft/spirit choice density in Stage 1 — support archetypes penalized | NOT BUILT | [audited 2026-06-22: no audit committed; still penalizes craft/spirit-only archetypes] |
| `'Meaningful'` tag on every Stage 1 choice — tag system non-functional | PARTIAL | [audited 2026-06-22: 174 occurrences across 10 files still present; commit 8e9530f2 removed 6 Meaningful tags but ~170 remain. Defer to content polish pass — non-blocking] |
| "pulls you aside" repeated 9× across 8 localities | DONE | [audited 2026-06-22: only 1 remaining occurrence (aurora_crown_commune_stage1_enriched_choices.js); 8 of 9 fixed during quality pass] |
| Closing meta-summary pattern in result text (5/15 passages audited) | DONE | [audited 2026-06-22: 14 commits in result-text expansion (block 3 of tender-twirling-stallman.md); forbidden-words validator now flags meta-summary patterns; commit 1add0e64 replaced 31 banned-phrase failResults] |
| Stage 2 enriched_choices.js line 972 label — infinitive + action-description | DONE | [audited 2026-06-22: stage2 label audits committed in 2d76d1c2 (midspines), 348c31d5 (craftspire), and locality-specific rewrites] |
| Save migration error silently swallowed | NOT BUILT | [audited 2026-06-22: loadGame legacy path at L18809 still has `catch(e) { return false; }` with no console.error or toast; deferred] |
| `'Investigation'` tag as universal first tag — no classification signal | PARTIAL | [audited 2026-06-22: 506 occurrences across 54 files; remains a tag-cardinality problem but is non-blocking — defer to content polish sprint] |
| `.title-error` uses display font (Cinzel) — legibility under stress | NOT BUILT | [audited 2026-06-22: L313 still uses `font-family: var(--font-display)`; one-line CSS swap to var(--font-body)] |
| 8px card tags / 9px item-use buttons — below readable floor | HUD-LOCKED | [audited 2026-06-22: 223 occurrences of `font-size: 8px`/`9px` in HTML; floor lift would touch HUD typography — requires user re-authorization per HUD lockdown] |
| Locality name casing on death screen — "cosmouth" not "Cosmouth" | DONE | [audited 2026-06-22: confirmDeath at L18598 uses WORLD_LOCATIONS[loc].name fallback (L18600, L18616) which returns properly-cased canonical names] |

---

## P4 — UX & Polish

| Feature | Status | Notes |
|---------|--------|-------|
| DC recalibration (level-scaling: baseDC + floor((level-1)/2)) | DONE | [audited 2026-06-22: getChoiceDC at L11885 — `levelBonus = Math.min(2, Math.floor(((G.level||1)-1)/2))`; capped at +2 in commit 907e0848] |
| Skills→Stats terminology in player-facing UI | NOT BUILT | [audited 2026-06-22: 1-full-roll-craft Block A; internal G.skills keys unchanged; UI strings still say "Skills". HUD-LOCKED for any final relabeling] |
| Abilities/Traits sections in character sheet | DONE | [audited 2026-06-22: sheet-tab buttons at L17000–17005 — Identity / Equipment / Inventory / Abilities / Traits; showSheetTab dispatch wired] |
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
| Rest limit (2× per day, G.restCount) | DONE | Enforced at line 13342: `if ((G.restCount||0) >= 2)` blocks third rest. G.restCount resets to 0 on day advance. |
| Auto-save after every choice | DONE | saveGame() called at line 10765 (enriched path) and line 10721 (gate path) after every resolved choice |
| Save export / JSON download | DONE | btn-export-save + exportSave() creates JSON blob download 'loa-save-*.json'; lines 1847, 15987-15990 |
| Sandbox mode (post-Stage 3 blocker, Stage II stays open) | STAGE-3-FROZEN | [audited 2026-06-22: showSandboxPanel exists at L18389; gate `canAdvanceToStage3()` hardcoded `return false` at L14422 (correct for V1.0); _showStage3BlockedModal at L14425 displays "Thank you for playing — Stage III in development"; Stage II stays open as designed. Reclassify from NOT BUILT — the system IS intentionally frozen pending Stage 3.] |
| Second-person choice labels ("You…" register) | OBSOLETE | [audited 2026-06-22: CLAUDE.md mandates inner-voice framing (≤15 words, no question marks); second-person register conflicts with current canon. Delete entry.] |
| GitHub Pages / itch.io deployment | DONE | [audited 2026-06-22: itch.io release shipped 2026-06-12 per v1_completion_state.md; commits 534c07e5 + 3e569fb0 + 112fcfcb wire .itch.toml deployment; dist/ledger-of-ash-itchio.zip exists] |
| CSS token system (--white, --ink-mid, --modal-bg) | DONE | Tokens defined in :root; button/modal raw hex replaced |

---

## DONE — Verified This Session or Prior

### V1.0 Sprint (Post-April-26 — 863 commits)
| Feature | Notes |
|---------|-------|
| V34_2 canon library import | commit 38c18d44 — replaces V33_2; canon/03_WORLD_OPERATIONAL_ENGINE/locality_engine + canon/12_TABLE_KITS layout; manifest + diff scripts |
| Save/Load entry fix from title screen | commit 5a523f4e — Load Save now enters game screen; version label v0.1 → v1.0 |
| Ability effect dispatcher | commits ed6d60df + 90c7c2b3 — 71-entry ABILITY_DISPATCH table + contract test ability-effects.test.js |
| Default combat abilities at creation + backfill | commit 768d68a1 — P1 abilities=0 bug fixed |
| Fatigue invariant centralized | commit 4fd18119 — addFatigue(n) + FATIGUE_MAX; HUD pill wiring (51f7bfca) |
| XP pacing rework (June 11 merge) | commits 873b0ef5 + f7809192 + ef8e2829 — every xpReward halved across content; bold-success bonus 10→5→3 |
| Nautical / sea travel system | commits 9b043880 + 562fd5f8 + 850a3e65 — 8 cross-continental sea routes; encounter--nautical CSS; boat mode in mode select |
| Locality-specific interior rewrites | 12+ commits (aurora, sheresh, shelkopolis, soreheim, harvest_circle, mimolot, panim, fairhaven, cosmoria, etc.) — failResults grounded in locality-specific geography |
| District system | commit 76a11e7c — enterDistrict injection + 7 canon Shelkopolis districts wired (fb4f37e9) |
| Shop rotating stock | commit 379465a0 — 5-day rotation + campout time-gate fix |
| 828 hardcoded resultType replacements | commit dc5dee72 — dynamic `(G && G.lastResultType) || X` pattern across 42 content files |
| Narration shell tag fix + emitRollLine | commit 47994078 — primary-outcome tagging; crit/fumble override; combat round forwarding |
| Top-bar More dropdown collapse | commit f28c9e74 — Save/Load/Export/HowTo/End collapse at 1366/1280/1200 breakpoints |
| Boss migration to enriched pattern | commit d0f0b80b — 50 XP/phase; plot:'main' on resolution |
| Mastery cost band 80-150 | commit 907e0848 + 78d2a793 |
| Watchfulness decay | commit 907e0848 |

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
| cosmoria_to_shelk_arc.js:13 label | Fixed |
| cosmoria_to_shelk_arc.js:96 label | Fixed |
| guildheart_hub_to_shelk_arc.js:120 label | Fixed |
| soreheim_proper_stage1:13 label + 'Meaningful' tag | Fixed |
| Whitebridge Commune labels | Fixed |
| cosmoria arc addJournal 'decision'/'consequence' | Fixed → 'intelligence'/'discovery' |
| Suppression threading — 6 Stage 1 localities | Shelk/Soreheim/Guildheart/Fairhaven/Cosmoria/Whitebridge |
| Stage 2 Collegium investigation path | All 5 core Stage 2 files verified |
| validate-content rule A7 (failResult) | commit 7720a646 |

### Core Systems
| Feature | Notes |
|---------|-------|
| Living narration (locality_narrations.js) | Wired |
| Heat HUD immediate update on addHeat() | updateHeatHUD() extracted from updateHUD(); called from addHeat() so panel updates without waiting for next full HUD refresh. |
| Heat encounter queue in addHeat() | G._pendingHeatEncounter set when heat crosses 3/5/8; loadStageChoices() already consumes it via checkHeatConsequences() + heat patrol check. |
| applyEffect() missing cases: xp/flag/stat/heat | All four cases added to switch. `flag` supports set/clear via value field. `stat` normalises display→internal skill keys. |
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
| Stage 3 gate hardcoded false | STAGE-3-FROZEN — correct for V1.0 |
| Stage 3 content locked (40 choices, 903 lines) | STAGE-3-FROZEN — real content, locked per CLAUDE.md |
| Stage 3 climax locked (198 lines) | STAGE-3-FROZEN — real content, locked per CLAUDE.md |

### Testing
| Feature | Notes |
|---------|-------|
| Content validator (validate-content.js) | Runs |
| Content validator rule A7 (failResult) | New |
| Flag validator (validate-flags.js) | Runs |
| Structure validator (validate-structure.js) | Fixed — regex false positive resolved |
| Basic combat engine (enterCombat/startCombat) | Wired |
| Jest logic tests — 27 files | abilities (3), adaptEnrichedChoice, alignment-gate, character-sheet, combat, companions, dc (3), equipment-bonus, fatigue-cap, inventory, journal, level-up, loadfromslot, mastery-xp, rivals, shop, stage-gates, training, trait-bonus-format-c, travel, utility-skill, etc. |

---

## NEW P0 — Post-V1.0 Audit (2026-06-22)

Top 5 candidates based on current state — confirm priority before scheduling:

| # | Candidate | Why |
|---|-----------|-----|
| 1 | Tutorial: investigation mandate framing | Onboarding still doesn't tell new players the core loop (find the shape of an operation, not a specific person) — confused-player risk for first 30 minutes |
| 2 | `startCombat` unknown key silently reloads — no toast | Headless playtests still hit this; player gets no feedback when a content typo skips an encounter |
| 3 | Save migration error silently swallowed | `loadGame` legacy path swallows JSON parse errors at L18809; corrupted saves vanish without trace |
| 4 | Daily supply drain on advanceTime | supplyTier system + tiers exist but no per-day consumption tick; gold/supply economy collapses to gold-only |
| 5 | `.title-error` uses display font (Cinzel) — legibility under stress | One-line CSS fix; affects error visibility on title screen failures (load failures, invalid codes) |

---

## OBSOLETE — Safe to Delete

| Entry | Reason |
|-------|--------|
| Camp action `review_notes` (was P1 NOT BUILT) | Button never existed in HTML; spec-miner false positive. Other 8 camp actions are wired. |
| Second-person choice labels ("You..." register) | CLAUDE.md mandates inner-voice framing; conflicts with current canon |
| `STAGE 2 CONTENT DENSITY — VERIFIED DONE (Apr 27 2026 correction)` block | Correction made; can be removed once it's been long enough that no one references the original error. |

---

## HUD LOCKDOWN (effective 2026-06-22)

The HUD is locked starting today. Any backlog item requiring HUD edits must be re-authorized by the user before work begins. Flagged items:

| Item | Reason HUD-LOCKED |
|------|-------------------|
| 8px card tags / 9px item-use buttons — below readable floor | Lifting font-size floor touches 223 HUD typography sites |
| stageProgress denominator further tweaks | DONE today but any future re-styling requires re-authorization |
| Skills→Stats terminology in player-facing UI | Touches HUD stat row labels |

---

## STAGE 3 FROZEN (per CLAUDE.md)

Stage 3+ content is intentionally frozen until Stages 1–2 ship and play-test. Do not author Stage 3 choices, climaxes, mechanics, or NPCs. Items reclassified as STAGE-3-FROZEN rather than NOT BUILT:

| Item | Status |
|------|--------|
| Sandbox mode (post-Stage 3 blocker) | STAGE-3-FROZEN — canAdvanceToStage3() returns false by design; _showStage3BlockedModal already shipped |
| Stage 3 content (40 choices, 903 lines) | STAGE-3-FROZEN — locked in stage3_enriched_choices.js |
| Stage 3 climax (198 lines) | STAGE-3-FROZEN — locked in stage3_climax.js |

---

## V34_2 CANON MIGRATION NOTES (2026-06-15)

V33_2 has been replaced by V34_2 (final_v5, ~46,748 validated entries). Paths to verify against any backlog item that references reference content:

- Old: `data/reference/V33_2_extracted/...`
- New: `data/reference/V34_2_extracted/V34_2_World_Repository/canon/...`

Subtree changes:
- `03_WORLD_OPERATIONAL_ENGINE/locality_engine/{locality_packets,text_rpg_packets}/`
- `12_TABLE_KITS/{arrival_kits,travel_complications}/`
- `11_REFERENCE_VIEWS/current_release/locality_quickstart_cards/`
- `02_CANON_BASELINE/{named_npcs,interface_role_instances}/`

No backlog items directly conflict with the new paths — all content references are inline or via `content/` files, not direct `data/reference/V33_2/...` reads.

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
| `docs/superpowers/plans/2026-06-10-v10-narration-content-sweep.md` | V1.0 narration content sweep (per recent commits) |

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

---

## P3 — DEBUG/GAMEPLAYCLEANUP Archive (May 2026)

*Source files: DEBUG.txt and GAMEPLAYCLEANUP.txt — session bootstrapping prompts, archived 2026-05-16*

- [ ] Gameplay audit pass — prose, result text, and choice labels across Stages 1 & 2 for immersion and quality tightening *(source: GAMEPLAYCLEANUP.txt)*
- [ ] Gameplay audit pass — tactical UI (combat HUD, range display, threat escalation) for full implementation of existing mechanics *(source: GAMEPLAYCLEANUP.txt)*
- [ ] Gameplay audit pass — tutorial flow: verify all existing onboarding text is clean, accurate, and reflects current systems *(source: GAMEPLAYCLEANUP.txt)*
- [ ] Gameplay audit pass — shops, services, and items: verify shop inventory wiring, item equip/use paths, and economy balance *(source: GAMEPLAYCLEANUP.txt)*
- [ ] Gameplay audit pass — stats, active abilities, and passive traits: verify all archetypes have correct bonuses applied in combat and rolls *(source: GAMEPLAYCLEANUP.txt)*
- [ ] Gameplay audit pass — level-up system: verify XP threshold display, mastery XP overflow, and level-cap messaging across all stages *(source: GAMEPLAYCLEANUP.txt)*
- [ ] Gameplay audit pass — travel system: verify corridor encounters, travel mode selection UI, supply drain, and toll wiring *(source: GAMEPLAYCLEANUP.txt)*
- [ ] Gameplay audit pass — NPC conversations and local locality scenes (taverns, inns, shops): verify conversational NPC wiring and result text quality *(source: GAMEPLAYCLEANUP.txt)*
- [ ] Gameplay audit pass — main and side plot pathing for Stages 1 & 2: verify all arcs reach a narrative conclusion and no dead ends remain *(source: GAMEPLAYCLEANUP.txt)*
