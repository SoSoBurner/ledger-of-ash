# Playtest Screenshot Investigation — 2026-05-20

**Generated:** 2026-05-21  
**Scope:** Investigative — findings only. No fix plans.  
**Output of:** Plan `zesty-purring-kitten.md` (Phase 4 synthesis)

---

## 1. Run Summary

| Field | Value |
|---|---|
| Run date | 2026-05-20 |
| Screenshot count | 35 PNGs |
| Screenshot location | `test-results/playthrough-screenshots/headless/` |
| Families covered | classic-combat/archer · magic-spellcasting/ranger · stealth-precision/scout_c · support-leadership/artificer |
| Corresponding report | `tests/test-results/playtest-report-20260520-2325-headless.md` (post-fix) |

### Pre-fix vs. post-fix context

The screenshots were taken on a run **before** the `const→var` fix (SHA 3949d69e). That fix converted 58 `const`/`let` declarations to `var` in 40 enriched-choice content files, restoring `window[tableKey]` locality pool lookups that had been broken since those files were authored.

As a result, sp2 values visible in the screenshots (sp15, sp18, sp20, sp21) reflect the **fallback sp2 inflation loop** — not organic stage progression. The post-fix run (`2325-headless`) shows final sp2 of 0–4, with all 5 visited localities contributing 0 sp2. The sp2 non-advancement is therefore a **separate open issue**, not resolved by the `const→var` fix.

### Per-family outcomes (from screenshot filenames)

| Family | Archetype | BG | Screenshots | Picks (final) | sp2 at p50 | sp2 at p100 | Dead-ends | Outcome |
|---|---|---|---|---|---|---|---|---|
| classic-combat | archer | a_nomdara | `_393–402` (10) | 121 | sp5 | sp18 | 0 | SUCCESS |
| magic-spellcasting | ranger | r_sheresh | `_403–413` (11) | 102 | sp6 | sp20 | 1 (p84) | SUCCESS |
| stealth-precision | scout_c | sc_shelk | `_414–420` (7) | 88 | sp15 | — | 1 (p51) | SUCCESS |
| support-leadership | artificer | af_tinker | `_421–427` (7) | 51 | sp21 | — | 1 (p21) | SUCCESS |

All 4 families completed (SUCCESS). All 3 dead-ends have empty result text (HTML snippet = blank). Stealth/support show sp2 3–4× higher than combat/magic at p50 — consistent with the pre-fix fallback loop inflating sp2 unevenly across families.

Localities visited: 5 of ~33 (`guildheart`, `shelkopolis`, `cosmoria`, `aurora`, `fairhaven`). All 5 contributed 0 sp2 in the post-fix run.

---

## 2. Findings by Category

### 2.1 UI / Visual

| ID | Screenshot(s) | Severity | Description | Suspected source |
|---|---|---|---|---|
| F-UV-01 | `_395, _398, _405, _409, _416, _424` (charsheet screenshots) | high | Character sheet displays raw internal skill keys ("CHARM", "SPIRIT") instead of display names (Charm, Spirit) on 6 charsheet screenshots. Note: **contradicted by Continuity/State agent** which found all display names correct. Requires live DOM verification — see Open Questions. | `ledger-of-ash.html` `renderCharacterSheet()` ~line 10418 |
| F-UV-02 | `_400, _411, _420, _427` (camp screenshots) | medium | Camp panel SLEEP action button is absent or not rendered in camp screenshots for all 4 families. Camp shows other actions (rest, train, etc.) but SLEEP is missing. | `ledger-of-ash.html` camp panel render / `campAction` wiring |

### 2.2 Narrative / Content

| ID | Screenshot(s) / Source | Severity | Description | Suspected source |
|---|---|---|---|---|
| F-NC-01 | Source: 6 `*_to_shelk_arc.js` files | high | Choice labels use infinitive form ("Find X", "Get X") violating the player inner-voice standard. Six arc files affected: `cosmoria_to_shelk_arc.js:171`, `glasswake_commune_to_shelk_arc.js:159`, `ithtananalor_to_shelk_arc.js:171`, `mimolot_academy_to_shelk_arc.js:158`, `panim_haven_to_shelk_arc.js:162`, `sunspire_haven_to_shelk_arc.js:168`. | `content/*_to_shelk_arc.js` (6 files, listed lines) |
| F-NC-02 | Source: `aurora_crown_commune_to_shelk_arc.js` | high | Choice labels 24–27 words, well over the 15-word limit. Multiple labels in this file are extended action descriptions, not inner-voice thoughts. | `content/aurora_crown_commune_to_shelk_arc.js` |
| F-NC-03 | Source: `soreheim_proper_to_shelk_arc.js:126` | medium | Choice label contains a question mark — forbidden by choice label standard (labels are thoughts, not questions). | `content/soreheim_proper_to_shelk_arc.js:126` |
| F-NC-04 | Screenshots with visible roll output | medium | Roll result display uses raw internal skill keys ("charm", "combat") in player-facing output instead of display names (Charm, Might). Affects all roll outcome strings that reference a skill name. | `ledger-of-ash.html:4405, 11808, 11929` |

### 2.3 Progression / Stall

| ID | Screenshot(s) | Severity | Description | Suspected source |
|---|---|---|---|---|
| F-PS-01 | `_408_deadend_p84`, `_419_deadend_p51`, `_423_deadend_p21` | blocker | 3 dead-end screens have empty result text (HTML blank). Players reach a choice, take it, and see a completely blank result panel with no narrative, no outcome, no feedback. All 3 dead-ends span 3 different families (ranger/scout_c/artificer) and 3 different localities (cosmoria/shelkopolis/fairhaven). | Choices with missing `result:` field or `html:""` in stage1/stage2 content; possibly the same class as the prior P0 batch |
| F-PS-02 | `_418_p50_sp15`, `_426_p50_sp21` vs `_397_p50_sp5`, `_407_p50_sp6` | high | Stealth and support families show sp2 3–4× higher than combat and magic at p50 (sp15/sp21 vs sp5/sp6). Represents the pre-fix fallback sp2 inflation loop operating unevenly across archetype families. Not a current regression post-fix, but a signal that sp2 sources were/are family-dependent in unexpected ways. | Pre-fix fallback loop in `ledger-of-ash.html` `maybeStageAdvance()`; interaction with archetype-specific content pools |
| F-PS-03 | `_401_p100_sp18`, `_412_p100_sp20` | high | Post-fix run shows final sp2=1 (archer) and sp2=0 (ranger) despite screenshots showing sp18/sp20 at p100. All 5 visited localities contribute 0 sp2 in the post-fix run. sp2 advancement via `G.investigationProgress` is not working through any of the currently visited localities (guildheart, shelkopolis, cosmoria, aurora, fairhaven). | `content/*_stage2_enriched_choices.js` — choices lack `sp2` effect fields, or `maybeStageAdvance()` gate condition not met for these localities |
| F-PS-04 | All family screenshots | high | Only 5 of ~33 stage 1–2 localities were visited across all 4 family runs. 28 localities remain completely unvisited. The map travel system fires (5 travels logged) but only cycles within the shelkopolis↔fairhaven corridor. Cross-polity travel to unvisited localities is not occurring. | `content/travel_corridors.js` + map travel logic in `ledger-of-ash.html`; possibly gated by the "Reach Level 6" map overlay string (which should read "Advance to Stage II") |
| F-PS-05 | `_420_success_p88`, `_427_success_p51` vs `_402_success_p121`, `_413_success_p102` | medium | Support/stealth families complete in 51–88 picks; combat/magic require 102–121 picks. 2× pick-count difference for equivalent success outcomes. May reflect archetype-specific choice pool size differences or sp2 gate differences. | Archetype family content pool sizes in respective `*_stage2_enriched_choices.js` files |

### 2.4 Continuity / State

| ID | Source | Severity | Description | Suspected source |
|---|---|---|---|---|
| F-CS-01 | `content/guildheart_hub_stage2_enriched_choices.js:270` | high | Player-facing G.lastResult prose contains "Tuesday and Thursday mornings" — real-world Gregorian day names. Canon violation. World uses bell-and-tide time references only. | `content/guildheart_hub_stage2_enriched_choices.js:270` |
| F-CS-02 | `content/shelkopolis_stage2_enriched_choices.js:369` | high | Player-facing result text contains a Gregorian day name. Same class of violation as F-CS-01. Exact day name unconfirmed (line too long for grep display). | `content/shelkopolis_stage2_enriched_choices.js:369` |
| F-CS-03 | `content/cosmoria_stage1_enriched_choices.js:658` | medium | Player-facing G.lastResult prose contains "investigating" — forbidden word per `content/CLAUDE.md`. String: `...something they've decided not to be caught investigating — quietly, plausibly deniable...` | `content/cosmoria_stage1_enriched_choices.js:658` |
| F-CS-04 | `content/cosmoria_stage1_enriched_choices.js:1001` | low | Journal entry text visible to the player contains "investigated" — `'Rival-adjacent operative investigated Cosmoria ghost vessels before you...'`. Journal strings are player-facing. | `content/cosmoria_stage1_enriched_choices.js:1001` |
| F-CS-05 | `content/cosmoria_stage1_enriched_choices.js:232, 358, 917` | medium (unverified) | The word "official" appears on 3 G.lastResult lines that exceed grep display limit. Whether "official" is used as the forbidden vague adjective or as a valid proper role title cannot be confirmed without direct file inspection. | `content/cosmoria_stage1_enriched_choices.js:232, 358, 917` |
| F-CS-06 | `content/cosmoria_stage1_enriched_choices.js:272 vs 280, 435` | medium (unverified) | Possible gender inconsistency for the unnamed cosmoria archivist: line 272 (crit-result, too long for grep display) shows a pattern matching `she.*archivist`; lines 280 and 435 (non-crit and follow-up) use "He"/"him". If the crit path uses "she", this is a within-scene pronoun inconsistency. | `content/cosmoria_stage1_enriched_choices.js:272, 280, 435` |

### 2.5 Branch Drift / Label Register

*(From the branch-drift-auditor agent — source-code findings, not directly visible in screenshots but explain content pool quality.)*

| ID | Source | Severity | Description | Suspected source |
|---|---|---|---|---|
| F-BD-01 | `content/shelkopolis_stage2_enriched_choices.js` (all labels), `content/cosmoria_stage2_enriched_choices.js` (all labels) | high | All Stage 2 choice labels in both files are written as third-person observational descriptions ("The guild seal catches the light differently here") rather than player inner-voice thoughts ("That seal hasn't always read that way"). Systematic register violation across both stage2 content files — every label needs rewriting. | Both `*_stage2_enriched_choices.js` files, entire label set |
| F-BD-02 | `content/shelkopolis_stage2_enriched_choices.js:14, 524, 590` and `content/cosmoria_stage2_enriched_choices.js` | medium | Tag arrays use 3 incompatible casing conventions: `['Investigation','Stage2']`, `['stage2','shelkopolis']`, `['Stage2','NPC']`. Tag-based pool lookups are case-sensitive — inconsistency prevents choices from matching stage-gate filters reliably. | Both `*_stage2_enriched_choices.js` files, tag declarations |
| F-BD-03 | `content/cosmoria_stage2_enriched_choices.js:232–592` | high | A 13-choice block at lines 232–592 is entirely tagged `['Stage2', 'NPC']`. No subtype variation. Players in cosmoria at stage2 receive only NPC-flavored choices with no environmental, evidence, or travel alternatives, creating a flat content experience. | `content/cosmoria_stage2_enriched_choices.js:232–592` |
| F-BD-04 | `content/cosmoria_stage2_enriched_choices.js:775, 790, 804` | high | Three late-file choices lack the `Stage2` tag entirely. These choices are excluded from stage-gated pool lookups and are never presented to the player. | `content/cosmoria_stage2_enriched_choices.js:775, 790, 804` |
| F-BD-05 | `content/shelkopolis_stage2_enriched_choices.js:513, 667, 724, 1075` | medium | Result text closes with "trail still blocked" pattern 4 times in different choices within the same file. `content/cosmoria_stage2_enriched_choices.js:399, 460, 465` uses a formulaic "watcher" NPC beat 3 times in a tight cluster. Repetition is visible to players who explore the locality thoroughly. | `content/shelkopolis_stage2_enriched_choices.js` (4 lines), `content/cosmoria_stage2_enriched_choices.js` (3 lines) |
| F-BD-06 | `content/cosmoria_stage2_enriched_choices.js:628` | medium | Finale result text references named NPCs the player may never have met (NPC references gated to specific earlier choices, but finale triggers regardless of which choices were taken). | `content/cosmoria_stage2_enriched_choices.js:628` |

---

## 3. Cross-Cutting Patterns

### Pattern A — sp2 advancement is universally broken post-fix

All 5 visited localities (`guildheart`, `shelkopolis`, `cosmoria`, `aurora`, `fairhaven`) contribute 0 sp2 in the post-fix run. This affects all 4 families. The `const→var` fix restored pool lookups, but sp2-advancing choices either don't exist in the current stage2 content for these localities, or the `maybeStageAdvance()` gate condition isn't being met. This is not a single-file issue — it's a system-level gap that spans the entire stage2 content layer.

### Pattern B — Stage 2 choice label register is wrong in both authored files

Both `shelkopolis_stage2_enriched_choices.js` and `cosmoria_stage2_enriched_choices.js` have the same label register problem: third-person observation instead of player inner-voice. This is a consistent authoring pattern across all Stage 2 labels, not isolated mistakes — it indicates the Stage 2 content was written without internalizing the choice label standard.

### Pattern C — Arc transition files carry systematic label violations

Six of the Stage 1→2 arc files (`*_to_shelk_arc.js`) independently have infinitive-form labels ("Find the contact", "Get the manifest"). These are bridge content written separately from stage2 files but share the same label standard. The violation pattern suggests the label standard wasn't enforced during arc file authoring.

### Pattern D — Stage 2 content is missing Stage2 tags in multiple files

Missing or broken tags appear in both `cosmoria_stage2` (3 late-file choices missing `Stage2` tag, lines 775/790/804) and the tag casing fracture across both stage2 files. These errors silently exclude content from stage-gated pools — the choices exist in the codebase but are never shown to players.

### Pattern E — Dead-ends with empty result text persist post-fix

3 empty dead-end result panels appear in this run (picks 21/51/84 across 3 families). The prior session fixed 30 empty dead-ends in the P0 pass, but these 3 survived. They are in different localities (cosmoria/shelkopolis/fairhaven) and families (ranger/scout_c/artificer), suggesting the prior fix was not comprehensive — or new empty dead-ends were introduced alongside the content additions.

### Pattern F — Real-world calendar contamination in Stage 2 content

Two Stage 2 files contain Gregorian day names in player-facing text (guildheart_hub_stage2:270, shelkopolis_stage2:369). Stage 1 files are clean (verified by the continuity agent). Stage 2 was authored after Stage 1, suggesting the day-name canon rule was not applied during Stage 2 authoring. A sweep of all other Stage 2 files for day-name violations is warranted.

---

## 4. Open Questions

1. **Charsheet raw keys vs display names (agents contradict):** The UI/Visual agent observed raw internal keys ("CHARM", "SPIRIT") on 6 charsheet screenshots; the Continuity/State agent independently found all display names correct. These are mutually exclusive findings. Requires live DOM check: open `play.bat`, navigate to charsheet, inspect `.char-skill-row` elements. Source: `ledger-of-ash.html renderCharacterSheet()` ~line 10418.

2. **"official" at cosmoria_stage1 lines 232, 358, 917:** Three G.lastResult lines containing "official" exceed grep's display limit. Cannot confirm whether the word is used as the forbidden vague adjective or as a valid role title without opening the file directly and reading those lines in full.

3. **Archivist pronoun at cosmoria_stage1 line 272:** The crit-result line (line 272) matches `she.*archivist` in pattern, but the normal-result lines 280 and 435 use "He"/"him". Line 272 content is unreadable via grep due to line length. Requires direct file read to confirm or rule out pronoun inconsistency.

4. **sp2 advancement root cause:** Post-fix, all visited localities contribute 0 sp2. Is this because: (a) none of the stage2 enriched choices in shelkopolis/cosmoria/fairhaven have `sp2` effect fields? (b) the `maybeStageAdvance()` gate requires a flag not set in headless runs? (c) the `window[tableKey]` pool lookup is now working but the choices returned don't include sp2 advancements? Needs engine trace in `ledger-of-ash.html maybeStageAdvance()` and sample choice inspection from the live pools.

5. **Dead-end empty result text — new or residual?** The 3 remaining dead-ends (picks 21/51/84) — are these choices that were always empty and missed in the prior P0 fix pass, or did new empty choices get added alongside stage2 content? Need to grep the specific locality files for choices with `html:""` or missing `result:` fields.

6. **Map travel cross-polity gate:** All 5 map travels cycled within the shelkopolis↔fairhaven corridor. The map overlay tooltip reads "Reach Level 6 to cross polity lines" — Stage I caps at level 5, making cross-polity travel unreachable. Should read "Advance to Stage II to unlock cross-polity travel." (Documented in `tests/CLAUDE.md`.) Whether this is actively blocking coverage needs confirmation: are cross-polity travel buttons present but disabled in the headless run?

7. **Day-name sweep scope:** Violations confirmed in `guildheart_hub_stage2` and `shelkopolis_stage2`. Have any other Stage 2 files (cosmoria_stage2, the enriched files for other localities) been checked for Gregorian day names? The narration-surface agent only scanned the two files identified by the branch-drift audit. A full sweep of `content/*_stage2_*.js` for `Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|vespers|matins` is pending.

---

## 5. Recommended Next-Session Focus

Ordered by priority. No fix plans included — this is a prioritized backlog for the planning session.

| # | ID(s) | Priority | Issue | Rationale |
|---|---|---|---|---|
| 1 | F-PS-01 | P0 blocker | Fix 3 empty dead-end result texts (picks 21/51/84, localities cosmoria/shelkopolis/fairhaven) | Blank result panel is unplayable. Affects 3 of 4 families. Same class as prior P0 batch — needs systematic audit of all choices with `html:""` or missing `result:` in the relevant content files. |
| 2 | F-PS-03, F-PS-04 | P0 blocker | Trace and fix sp2 non-advancement — all 5 visited localities contribute 0 sp2 post-fix | 0 sp2 from any visited locality means Stage II is unreachable organically. The `const→var` fix restored pool lookups but sp2 advancement itself is broken. Root cause (missing sp2 effect fields vs gate condition) needs to be traced before Stage II completion can be claimed. |
| 3 | F-BD-01 | high | Rewrite all Stage 2 choice labels from third-person observation to player inner-voice | Both stage2 files are entirely wrong in register. Every label needs rewriting. This is the most visible content quality gap and affects every choice a player sees in Stage II. |
| 4 | F-BD-04 | high | Add missing `Stage2` tags to cosmoria_stage2 entries at lines 775, 790, 804 | These 3 choices are permanently excluded from stage-gated pools. A minimal fix (add the tag) restores them to the rotation. |
| 5 | F-CS-01, F-CS-02 | high | Replace real-world day names in guildheart_hub_stage2:270 and shelkopolis_stage2:369 with bell-and-tide references | Canon violation. These strings are visible to players in result text. Also triggers a full sweep of remaining Stage 2 files for similar violations. |
| 6 | F-BD-03 | high | Break up cosmoria_stage2 13-choice monotag NPC block — add subtype variety | All 13 choices in the block are NPC-tagged only. Players in cosmoria get no environmental, evidence, or travel choices for 13 consecutive picks. Adds progression texture. |
| 7 | F-NC-01, F-NC-02, F-NC-03 | high | Fix label violations in 6 arc transition files (infinitives, >15 words, question mark) | Arc files are the bridge between Stage I and Stage II — players see these labels during the key transition moment. Infinitive and oversized labels are jarring against the inner-voice standard. |
| 8 | F-CS-03, F-CS-04 | medium | Remove "investigating"/"investigated" from cosmoria_stage1:658 and :1001 | Forbidden word violations in player-facing prose and journal text. Line 658 is in G.lastResult (visible immediately); line 1001 is in a journal string. Both are straightforward single-line fixes. |
| 9 | F-UV-01 (pending verification) | medium | Verify charsheet display name rendering via live DOM check; fix if raw keys are confirmed | Agents contradict. Live DOM check resolves it. If charsheet shows raw keys, `renderCharacterSheet()` needs display-name mapping. |
| 10 | F-BD-02 | medium | Normalize tag casing convention across all stage2 enriched choice files | 3 incompatible tag casing formats prevent reliable pool matching. Pick one convention and apply it uniformly. Low-risk mechanical fix, but prerequisite for trusting pool coverage metrics. |

---

*This report was generated by 7 parallel investigative agents (UI/Visual, Narrative/Content, Progression/Stall, Continuity/State, Branch-drift-auditor, Narration-surface-scanner, Continuity-auditor) synthesized by the coordinator session. No code was modified during this investigation.*
