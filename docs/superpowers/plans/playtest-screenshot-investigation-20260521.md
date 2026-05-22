# Playtest Screenshot Investigation — 2026-05-21

**Type:** investigative findings (not a fix plan)
**Source run:** headless playtest, files captured 2026-05-21 12:23 local (run completion `playtest-analysis-20260521-2114.md` generated 2026-05-21 19:14:12 UTC)
**Screenshots reviewed:** 39 PNGs, all from `test-results/playthrough-screenshots/headless/`
**Filename ID range:** `1779389605344` … `1779389605382` (sequential monotonic IDs assigned during capture, **not** wall-clock — file mtime is the true timestamp)
**Archetypes screenshotted (passing families only):**
- `classic-combat / warrior / Frontier Hammer Company` → SUCCESS at p144, sp 18 (Stage II reached)
- `magic-spellcasting / paladin / Brother Cael, Instrument of Eloljaro` → SUCCESS at p184, sp 16
- `stealth-precision / trickster / Fox, Nomdara Performance Circuit` → SUCCESS at p129, sp 19
- `support-leadership / saint / Alia, Living Instrument of Cysur` → SUCCESS at p92, sp 8

**Companion text analyses already on disk (do not duplicate):**
- `test-results/playtest-analysis-20260521-2049.md` — engine bug focus
- `test-results/playtest-analysis-20260521-2114.md` — engine bug focus, max-picks ceiling, sp2 flow

This document covers what the *screenshots* reveal that those text-only analyses cannot.

---

## 1. Run summary (per archetype)

| Archetype | Name | Start locality | Final pick | Final sp | Final level | Final day | Result |
|---|---|---|---|---|---|---|---|
| Warrior | Ash | Sorbeheim Proper → Shelkopolis | 144 | 18 | 4 | 7+ | SUCCESS, Stage II reached |
| Paladin | Brother Cael | Ithtananalor → Cosmoria | 184 | 16 | 5 | 11 | SUCCESS, Stage II reached |
| Trickster | Fox | Guildheart Hub → Shelkopolis | 129 | 19 | 4 | 10 | SUCCESS, Stage II reached |
| Saint | Alia | Shelkopolis | 92 | 8 | 5 | 4 | SUCCESS (but **sp 8 is suspicious — Stage II banner not visible**) |

All four are marked SUCCESS by the harness, but the saint reached only sp 8 and only Day 4 — well short of the other three. **Worth investigating whether the saint family's success criterion fires too early, or whether its content path is unusually short.**

---

## 2. Stage 1 & 2 HUD scope reference (grounded in `specs/feature_wiring_manifest.md` and `ledger-of-ash.html`)

Top bar: `#topbar-stage` stage pill, `#hud-safe-streak`, `#hud-case-file` (X/120) `#hud-case-file-track/-fill/-count`, How to Play button.
Left panel: name, class, alignment, level, XP, renown, HP+bar, status, gold, plotcredits (Soreheim/Sunspire only), consumable count, watchfulness, day, rival, heat, watch, progress thread, companions, stage progress bar+hint, axis row+tick, pressure bars (watch/heat), fatigue, trait-ready, 6 skills, location, time.
Center: narration panel, action/choice panel.
Right rail (Chronicle): quests, factions, party HUD, world clocks, party, journal/ledger.
Overlays: Ledger (journal), Material Planet (map), Character (charsheet), Make Camp, Party, Notices, Local Contacts (NPCs), Hall of Legends, Death, Save (DOM only, unimplemented), Onboarding, How to Play.
Camp actions wired: rest, recover, train, craft, talk. **Unwired buttons present in DOM:** sleep, post_watches, campout, lay_low, review_notes.
Combat: 4-action Press/Defend/Talk/Retreat.

Cited: `feature_wiring_manifest.md:13`, `:38`, `:41-43`, `:52-66`, `:75-83`, `:118`, `:148-162`, `:165`, `:198`, `:203`; `ledger-of-ash.html:1866-2122`; `CLAUDE.md:72`, `:74`, `:87`, `:97`, `:172-181`.

---

## 3. Findings by category

Each finding cites the screenshot file (use mtime, not filename ID, for chronology). Severity: **[BLK]** blocker / **[H]** high / **[M]** medium / **[L]** low / **[?]** needs verification.

### 3a. UI / HUD rendering

| # | Sev | Finding | Screenshots |
|---|---|---|---|
| U1 | [?] | **Top bar stage pill replaced by "MASTERY: 565" then "MASTERY: 704"** on paladin during Stage II (p100/p150). Spec says `#topbar-stage` shows the stage pill. Either a new "Mastery" tracker was added (undocumented in `feature_wiring_manifest.md`) or the stage pill is being clobbered by a Stage II ability counter. | `..362_magic-spellcasting_paladin_a1_p100_sp14.png`, `..365_..._p150_sp16.png` |
| U2 | [H] | **Camp action set differs by archetype/locality.** Warrior camp (Day 7, Shelkopolis) shows **Rest / Sleep / Seek Care / Train / Craft / Companions**. Paladin and trickster camps (Day 7/10, Cosmoria) show only **Rest / Seek Care / Train / Craft / Companions** — no Sleep button. Spec says Sleep is one of 5 *unwired* camp actions. Either Sleep is being conditionally shown (and is wired for warrior path) or the DOM render is inconsistent. | `..351_classic-combat_warrior_a1_camp_day7.png` vs `..361_magic-spellcasting_paladin_a1_camp_day7.png` vs `..374_stealth-precision_trickster_a1_camp_day10.png` |
| U3 | [M] | **No `#hud-safe-streak`, `#hud-companions`, `#hud-fatigue`, `#hud-trait-ready` visible in any screenshot.** Spec lists these as Stage 1 HUD elements. They may be hidden at zero-value but four full runs surfaced none of them. | All start/p0/p50/p100/success captures |
| U4 | [M] | **Case File counter shows `0/120` across every player at run start and never appears to increment to a visible number on the top bar.** Either investigationProgress isn't accumulating, or the top-bar count isn't binding. The `#hud-case-file-track/-fill` width should reflect progress; screenshots show no fill state at p50/p100/success. | `..344, ..354, ..367, ..377` (starts) and `..353, ..366, ..376, ..382` (success) |
| U5 | [L] | **Character sheet "Watchfulness" row appears for paladin (`1 — Low`) but not for warrior or saint.** Spec lists watchfulness as a HUD field. Sheet rendering may gate on a non-zero value, but a `0 — None` baseline should arguably still display. | `..346_..._charsheet_lvl4.png` (no watch), `..356_paladin_charsheet_lvl4.png` (`1 — Low`), `..359/363_paladin_charsheet_lvl5.png` (`1 — Low`), `..369/372_trickster_charsheet.png` (no watch), `..379_saint_charsheet.png` (no watch) |
| U6 | [L] | **`Vitals` block has visible inconsistency in spacing**: paladin Day-11 sheet places **Fatigue** in the Vitals column where Day-2 sheet did not — Vitals column orders/contents differ by run state. May be expected (Fatigue surfaces only when > 0) but cross-archetype consistency is worth verifying. | `..356_paladin_charsheet_lvl4.png` (no fatigue row) vs `..363_paladin_charsheet_lvl5.png` (Fatigue 1/10) |
| U7 | [?] | **No on-page DC indicator** is clearly readable in success/p50 captures despite spec `v01-release-design.md:185-189` listing "DC-in-button" as in-progress. Choice cards in the action column don't show DC numerals at the resolution captured. Verify whether DC-in-button is rendered in current build. | `..348, ..358, ..371, ..381` (p50 captures) |

### 3b. Narrative / content

| # | Sev | Finding | Screenshots |
|---|---|---|---|
| N1 | [H] | **Same opening locality narration text reused verbatim across totally different starts.** Warrior's Sorbeheim Proper start text and the "Shelkopolis" narration in warrior p50 share identical phrasing ("The pyre stone wells show from the road — ledge and emerald lozenges on the gatehouse, bright-plumed hawkwatches posted at the approach"). This locality-flavor reuse repeats elsewhere. **Risk:** localities feel interchangeable. | `..344_warrior_start.png`, `..348_warrior_p50_sp6.png`, `..378_saint_p0_sp0.png` (Shelkopolis) |
| N2 | [M] | **"Stage II — The Scope Expands" banner content text appears identical across runs.** Warrior and trickster both show the same opening Stage II paragraph ("Hairband bow lashes…cinders blanket the eastern routes…broken depot…"). Acceptable if it's a stage-gate banner, but the prose should be reviewed for boilerplate fatigue. | `..352_warrior_p100_sp18.png`, `..353_warrior_success_p144.png`, `..375_trickster_p100_sp19.png`, `..376_trickster_success_p129.png` |
| N3 | [H] | **Quest list deduplication is leaky.** Paladin journal at Day 11 shows **Wounds & Recovery (7)** with **6 identical "from Roadwarden Patrol Guard (minor)" entries** — same source, same severity, same string, not collapsed. Warrior Day 7 journal shows **(1)** of the same wound, so the wound exists; the issue is *repeated identical entries* over time. | `..364_paladin_journal_day11.png` |
| N4 | [M] | **Quest descriptions show inconsistent voice between first-person interior ("I want names." / "I plan to find out what they're hiding.") and third-person factual ("The manifest has no matching shipment." / "The record was cleaned…").** Both register types co-exist in the same quest list. Decide on a convention or accept the mix as intentional player-journal vs world-fact split. | `..347_warrior_journal_day3.png`, `..370_trickster_journal_day5.png`, `..380_saint_journal_day4.png` |
| N5 | [L] | **Saint quest line includes "Attend informal meeting with House Shelk operations officer."** which uses bureaucratic register that contrasts with the "Living Instrument of Cysur" mystical background. Voice review pass candidate. | `..380_saint_journal_day4.png` |

### 3c. Progression / stage / state

| # | Sev | Finding | Screenshots |
|---|---|---|---|
| P1 | [H] | **Warrior is `Alignment: Cruel` on the very first character sheet at Day 3, lvl 4, after just 0 picks of meaningful narrative interaction** (`charsheet_lvl4.png` captures at p<=0 according to filename ordering). Spec `CLAUDE.md:129` says alignment badges appear at ±10 — so the system thinks the warrior is already at -10 cruel by Day 3. Investigate whether the archetype seed or background "Frontier Hammer Company" pre-seeds an alignment value. | `..346_warrior_charsheet_lvl4.png`, `..349_warrior_charsheet_lvl4.png` (Day 7, still Cruel) |
| P2 | [BLK] | **XP overflow not draining to level-up.** Warrior charsheet shows `XP 972/240` at level 4 (Day 7) — far above level threshold but still level 4. Expected: at sp/level cap (Stage 1 cap = L5 per `CLAUDE.md:97`), XP should plateau or trigger level-up. By success the warrior has `XP 2578/240`, still level 4. Possible: level-up handler not firing on Stage 1 cap, or level cap logic suppressing the level event. | `..349_warrior_charsheet_lvl4.png` (XP 972), `..352_warrior_p100_sp18.png` and `..353_warrior_success_p144.png` (HUD shows 2578/240, lvl 4) |
| P3 | [H] | **Paladin alignment changes from `Unaligned` (Day 2) → `Cruel` (Day 7) → `CRUEL / ORDER` (Day 11)**. The dual-axis (Benevolent↔Cruel, Order↔Anarchy) is spec'd as Stage 2 / locality-heat work in `v01-release-design.md:127-138` and listed as NOT implemented. Yet `CRUEL / ORDER` rendering is showing on the paladin sheet. **Either the feature shipped quietly (and is not yet on the manifest) or this is a leak from an unintended code path.** | `..356_paladin_charsheet_lvl4.png`, `..359/363_paladin_charsheet_lvl5.png` |
| P4 | [M] | **Saint reached SUCCESS at sp 8 in only 92 picks and Day 4**, never showing the Stage II banner. Other archetypes hit sp ≥ 14 and showed the banner. **Either:** (a) saint success criterion is a different code path (early-completion path?), (b) saint hit a content stub success rather than reaching Stage II, or (c) the spec for what "success" means is per-archetype. | `..382_saint_success_p92.png` (no Stage II banner visible) vs warrior `..353`, paladin `..366`, trickster `..376` (all show "Stage II — The Scope Expands") |
| P5 | [M] | **Renown remains `0 — Unknown` or `1 — Unknown` or `2 — Unknown` through entire runs.** The "Unknown" label paired with non-zero values (1, 2, 3 — Noticed for trickster) suggests the renown-tier name lookup table either has a stale "Unknown" default for tiers 0–2 or the tier names are deliberately ambiguous. Trickster Day 10 reads `3 — Noticed`, confirming the label resolver works — so why do warrior at Renown 2 and paladin at Renown 2 still read `Unknown`? Investigate per-class renown ladders. | `..346_warrior_lvl4 (Renown 2 — Unknown)`, `..356/359_paladin (Renown 0/1/2 — Unknown)`, `..372_trickster_lvl4 (Renown 3 — Noticed)`, `..379_saint_lvl5 (Renown 0 — Unknown)` |
| P6 | [L] | **Rival Clock drifts at archetype-specific rates** that don't obviously correlate with day count: warrior Day 7 = Rival 4, paladin Day 11 = Rival 8, trickster Day 10 = Rival 4, saint Day 4 = Rival 4. Worth verifying whether Rival is tracking deliberate pressure or whether one archetype's content overuses rival hooks. | `..349, ..363, ..372, ..379` |

### 3d. Continuity / cross-state

| # | Sev | Finding | Screenshots |
|---|---|---|---|
| C1 | [H] | **Warrior's HUD shows `4 63/240` at start AND `4 24/24` at the same start frame** — the HUD has TWO XP-like numerals overlapping or duplicated in the rendered top-left area. This may be HP `40/40` next to XP `0/240` but the resolution shows both reading-positions occupied by a `lvl/xp` style pair. Worth re-rendering a higher-res start capture to confirm whether two XP fields are present. | `..344, ..345_warrior_start/p0` |
| C2 | [M] | **`Stamped Paper x1` appears in warrior's materials at Day 3 (Journal)** — meaning the warrior collected a material before reaching the first explicit "p0" choice that the harness logged. Either the start sequence injects a material into inventory pre-pick-0, or the journal-day-3 capture happened mid-flow but is labeled as a Day-3 snapshot. Cross-check material acquisition trigger against pick counter. | `..347_warrior_journal_day3.png` |
| C3 | [L] | **Faction Relations count `(27)` is identical across all four archetypes**, suggesting the faction list is static. Acceptable. But "Red Hood Guild: 15" appears for paladin while warrior/trickster/saint show 0 for it (or it's below the fold). Verify whether starting faction relations are background-conditioned. | `..357_paladin_journal_day2.png` (Red Hood Guild 15), other journals |
| C4 | [L] | **No `#overlay-map` (Material Planet) screenshot was captured.** Of the 12 spec'd overlays, only `#overlay-charsheet` (Character), `#overlay-journal` (Ledger), and `#overlay-camp` (Make Camp) were exercised. Map, NPCs, Notices, Party, Hall of Legends, Death, Save were not screenshotted — so we have no visual confirmation those overlays render correctly. | (negative space — no screenshots) |

---

## 4. Cross-cutting patterns

1. **HUD scope gaps:** roughly 8 of the spec'd HUD elements (`hud-safe-streak`, `hud-companions`, `hud-fatigue`, `hud-trait-ready`, `hud-heat`, full pressure-bars, plotcredits, watchfulness when zero) never surfaced in 39 captures. Either they're hidden at zero (intended) or they're not wiring at all (bug). The screenshots alone can't disambiguate — need a forced-state run that pushes each value above zero.
2. **Camp action wiring is non-uniform** (U2). Sleep appears for warrior but not paladin/trickster. Spec says Sleep is unwired. If Sleep is being rendered conditionally, that conditional logic is the lead.
3. **Alignment / dual-axis behavior is ahead of (or behind) the manifest** (P1, P3). Either the feature shipped without manifest updates, or alignment seeding from background is auto-pegging characters cruel/order. Either way, the manifest and the runtime diverge.
4. **XP / level-cap interaction is broken** (P2). XP keeps accumulating past the level threshold without level-up. This is reproducible across at least warrior, and the Mastery: 565/704 top-bar label on paladin (U1) may be the same bug surfacing as a different counter.
5. **Saint short-success path** (P4) is a category-of-one observation that warrants its own investigation — the saint may be exiting Stage 1 via a different success condition.
6. **Dedupe & repeated narration** (N1, N3) point to a shared "no consolidation step" pattern across the Quests / Wounds / Materials / Narration pipelines.

---

## 5. Open questions for the next planning session

1. **What is "Mastery: N" replacing the stage pill on the paladin top bar?** Search `ledger-of-ash.html` for `Mastery:` or `setMasteryHUD` and trace its lifecycle.
2. **Is alignment seeding tied to background?** Inspect Frontier Hammer Company definition for any pre-set alignment. Same for Living Instrument of Cysur (saint) and Instrument of Eloljaro (paladin).
3. **Why does the saint complete Stage 1 at sp 8 / Day 4?** Trace `canAdvanceToStage2()` or whatever the saint family's success criterion is.
4. **Is the renown-tier label table per-class?** Trickster gets "Noticed" at tier 3 while the others stay "Unknown" at tiers 0–2. Confirm whether tier strings are class-scoped or shared.
5. **Why does XP not trigger level-up past 240/300?** Find the XP gain handler and the Stage-1-level-cap branch; verify whether the cap suppresses level-up *and* XP gain, or only level-up.
6. **Why are Wounds & Recovery entries not deduplicated** when Quests/Faction Relations are? Look at the wound-add path vs the quest-add path.
7. **Are spec'd HUD elements** (`#hud-safe-streak`, `#hud-fatigue`, etc.) **hidden-at-zero by design, or simply not bound?** Force a one-off state-injection run that maxes each tracked value and re-screenshot.
8. **Does the dual-axis alignment (CRUEL / ORDER)** indicate the feature shipped without updating `feature_wiring_manifest.md`? Audit the spec vs runtime here as part of the same investigation.

---

## 6. Recommended investigative focus for the next session (ordered)

These are the top items to investigate further — not fixes, but investigation tracks. Each should produce its own finding before any code change is planned.

1. **[BLK] XP overflow / level-cap interaction** (P2, partly U1). Highest blast radius — affects every Stage 1 run. Investigate before any content work.
2. **[H] Saint short-success criterion** (P4). Risks shipping a Stage 1 family that exits the stage in 4 in-game days while others take 7–11.
3. **[H] Alignment auto-seeding from background** (P1, P3). Investigates whether players are losing meaningful alignment-choice agency.
4. **[H] Wounds & Recovery duplicate-entry bug** (N3). Highly visible to players in the journal overlay; also suggests a broader add-without-dedupe pattern.
5. **[H] "Mastery: N" top-bar replacement** (U1). Unknown feature on the top bar — either undocumented success or undocumented bug.
6. **[H] Camp action set divergence by archetype/locality** (U2). Reveals whether the unwired camp buttons (Sleep, Post Watches, Campout, Lay Low, Review Notes) are silently being rendered.
7. **[M] Locality narration reuse** (N1) + **Stage II banner stock prose** (N2). Locality-flavor-pass + line-editor candidate work, but only after the engine items are in motion.
8. **[M] Renown-tier label table per class?** (P5). Small but visible to players.
9. **[M] HUD element coverage audit** (U3, U4, U5, C1). Run a state-injection harness pass to force every HUD element above zero and screenshot to verify binding.
10. **[L] Overlay coverage gap** (C4). Add Map / NPCs / Notices / Party / Hall captures to the next playtest harness so we have visual confirmation for all 12 overlays.

---

## 7. Suggested next-session entry plan

The follow-up session should:

1. `cd C:\Users\CEO\ledger-of-ash` ; confirm `git branch` = `main`.
2. Re-read this report and `test-results/playtest-analysis-20260521-2114.md` together.
3. Pick **investigation track #1 (XP overflow / level-cap)** and dispatch a parallel subagent loadout:
   - `code-explorer` to trace `updateHUD()` and the XP/level-up handler in `ledger-of-ash.html`
   - `silent-failure-hunter` agent for the XP-gain path (look for guards that swallow the level-up event)
   - `Explore` for any test that already covers Stage 1 level cap behavior
4. Each finding gets its own short note under `docs/superpowers/findings/` (or appended to this file) before any fix work is planned.
5. Fix work — if scoped — should land in its own plan file written via `superpowers:writing-plans`.

---

## Appendix A — full screenshot inventory

Filename ID → archetype / event / scope evidence collected:

| ID | File | Archetype | Event | Notes / surface shown |
|---|---|---|---|---|
| 344 | warrior_a1_start | warrior | start | Sorbeheim Proper opening, HUD top bar `0/120` case file |
| 345 | warrior_a1_p0_sp0 | warrior | p0 | same frame as start |
| 346 | warrior_a1_charsheet_lvl4 | warrior | charsheet | Identity tab, Alignment CRUEL at Day 3 (P1) |
| 347 | warrior_a1_journal_day3 | warrior | journal | Quests (6), Materials: Stamped Paper x1 (C2) |
| 348 | warrior_a1_p50_sp6 | warrior | p50 | Shelkopolis narration reused (N1), DC visible? (U7) |
| 349 | warrior_a1_charsheet_lvl4 | warrior | charsheet | Day 7, XP 972/240 still lvl 4 (P2) |
| 350 | warrior_a1_journal_day7 | warrior | journal | Quests (9), Wounds (1) Roadwarden Patrol Guard |
| 351 | warrior_a1_camp_day7 | warrior | camp | Rest/Sleep/Seek Care/Train/Craft/Companions (U2) |
| 352 | warrior_a1_p100_sp18 | warrior | p100 | Stage II — The Scope Expands (N2) |
| 353 | warrior_a1_success_p144 | warrior | success | XP 2578/240 still lvl 4 (P2) |
| 354 | paladin_a1_start | paladin | start | Ithtananalor opening, BROTHER CAEL name |
| 355 | paladin_a1_p0_sp0 | paladin | p0 | same frame as start |
| 356 | paladin_a1_charsheet_lvl4 | paladin | charsheet | Day 2, Alignment Unaligned, Watchfulness 1 — Low (U5) |
| 357 | paladin_a1_journal_day2 | paladin | journal | Quests (5), Red Hood Guild 15 (C3) |
| 358 | paladin_a1_p50_sp6 | paladin | p50 | Cosmoria narration |
| 359 | paladin_a1_charsheet_lvl5 | paladin | charsheet | Alignment CRUEL (P3) |
| 360 | paladin_a1_journal_day7 | paladin | journal | Quests (7), Wounds (2) — early dupe |
| 361 | paladin_a1_camp_day7 | paladin | camp | No Sleep button (U2) |
| 362 | paladin_a1_p100_sp14 | paladin | p100 | Top bar `MASTERY: 565` (U1) |
| 363 | paladin_a1_charsheet_lvl5 | paladin | charsheet | Alignment CRUEL / ORDER (P3), Fatigue 1/10 (U6) |
| 364 | paladin_a1_journal_day11 | paladin | journal | Wounds (7) — 6 identical entries (N3) |
| 365 | paladin_a1_p150_sp16 | paladin | p150 | Top bar `MASTERY: 704` (U1) |
| 366 | paladin_a1_success_p184 | paladin | success | Stage II — The Scope Expands (N2) |
| 367 | trickster_a1_start | trickster | start | Guildheart Hub opening, FOX name |
| 368 | trickster_a1_p0_sp0 | trickster | p0 | same frame as start |
| 369 | trickster_a1_charsheet_lvl4 | trickster | charsheet | Day 5, Renown 2 — Unknown (P5) |
| 370 | trickster_a1_journal_day5 | trickster | journal | Quests (8), first-person quest voice (N4) |
| 371 | trickster_a1_p50_sp8 | trickster | p50 | Cosmoria narration, dice/roll line visible |
| 372 | trickster_a1_charsheet_lvl4 | trickster | charsheet | Day 10, Renown 3 — Noticed (P5), XP 1437/240 still lvl 4 (P2) |
| 373 | trickster_a1_journal_day10 | trickster | journal | Quests (9), Materials (4) Road Dust + Stamped Paper |
| 374 | trickster_a1_camp_day10 | trickster | camp | No Sleep button (U2) |
| 375 | trickster_a1_p100_sp19 | trickster | p100 | Shelkopolis narration |
| 376 | trickster_a1_success_p129 | trickster | success | Stage II — The Scope Expands |
| 377 | saint_a1_start | saint | start | Shelkopolis opening, ALIA name |
| 378 | saint_a1_p0_sp0 | saint | p0 | same frame as start, identical Shelkopolis narration to warrior p50 (N1) |
| 379 | saint_a1_charsheet_lvl5 | saint | charsheet | Day 4, Renown 0 — Unknown (P5) |
| 380 | saint_a1_journal_day4 | saint | journal | "Attend informal meeting with House Shelk operations officer" voice mix (N5) |
| 381 | saint_a1_p50_sp8 | saint | p50 | Cosmoria narration |
| 382 | saint_a1_success_p92 | saint | success | sp 8, no Stage II banner (P4) |

---

## Appendix B — methodology notes

- Each PNG was opened individually and graded against the HUD scope inventory from `specs/feature_wiring_manifest.md` and `ledger-of-ash.html:1866-2122`.
- Findings are deliberately **investigative**, not prescriptive — they describe what is visible vs what spec says should be visible, and propose what to look for next. No code change recommendations are included.
- This report is intended to be consumed by the next planning session, which will turn the recommended investigation focus list (Section 6) into a concrete fix/work plan.
