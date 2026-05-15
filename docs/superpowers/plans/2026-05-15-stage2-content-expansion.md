# Stage II Content Expansion Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand Stage II total content volume to exceed Stage I (~15K lines, ~534KB) and make `sp2=18` reachable in ≤200 picks across all 4 archetype families. Every task adds net-new choices — no existing content is reduced or replaced.

**Architecture:** Gap analysis drives a per-locality expansion pass. Each task is independently executable by a subagent. All edits go to `content/` files. Never touch `dist/`. Never reduce existing choice counts.

**Tech Stack:** Vanilla JS enriched choice objects, `npx jest` (logic tests), `node tests/content/validate-content.js` (content validators)

**CLAUDE.md critical rules for all tasks:**
- Source of truth: `C:\Users\CEO\ledger-of-ash\ledger-of-ash.html` — never `dist/`
- `G` is module-scoped `let` — never use `window.G`
- Skill keys: `G.skills` uses `combat/stealth/survival/lore/persuasion/craft` internally
- Result text: 60–90 words target; 120 max for high-stakes moments. Scene not summary.
- Choice labels: player's inner voice, under 15 words. No question marks. No infinitives.
- Forbidden words: `you feel` / `you realize` / `you sense` / `meaningful` / `investigate` / `official` (vague) / `contact` (noun for person) / `in a way that suggests`
- Every choice must have a `failResult` field (safe choices: forward redirect)
- Journal: `addJournal(text, category)` — text first, category second
- Journal categories: `'evidence'`, `'intelligence'`, `'rumor'`, `'discovery'`, `'contact_made'`, `'complication'` only

---

## Gap Analysis

### Current sp2-Advancing Choice Count

| File | sp2++ count |
|------|------------|
| `stage2_enriched_choices.js` (global pool) | 70 |
| `glasswake_commune_stage2_enriched_choices.js` | 4 |
| `craftspire_stage2_enriched_choices.js` | 4 |
| `ironhold_quarry_stage2_enriched_choices.js` | 4 |
| `unity_square_stage2_enriched_choices.js` | 4 |
| `aurora_crown_commune_stage2_enriched_choices.js` | 2 |
| `harvest_circle_stage2_enriched_choices.js` | 2 |
| `plumes_end_outpost_stage2_enriched_choices.js` | 2 |
| `sunspire_haven_stage2_enriched_choices.js` | 2 |
| `cosmoria_stage2_enriched_choices.js` | **0** |
| `districts_stage2_enriched_choices.js` | **0** |
| `fairhaven_stage2_enriched_choices.js` | **0** |
| `guildheart_hub_stage2_enriched_choices.js` | **0** |
| `ithtananalor_stage2_enriched_choices.js` | **0** |
| `mimolot_academy_stage2_enriched_choices.js` | **0** |
| `nomdara_stage2_choices.js` | **0** |
| `panim_haven_stage2_enriched_choices.js` | **0** |
| `shelkopolis_stage2_enriched_choices.js` | **0** |
| `shirshal_stage2_enriched_choices.js` | **0** |
| `soreheim_proper_stage2_enriched_choices.js` | **0** |
| `whitebridge_commune_stage2_enriched_choices.js` | **0** |

**Total confirmed sp2++ calls: 94** (across 9 of 21 stage2 files)

### How Many More Choices Are Needed

**Reach sp2=18 in ≤200 picks:**
- Player visits ~3–5 localities before antechamber triggers at sp2≥12
- At 3–5 choices per locality visit, each awarding sp2++ on success (~60% hit rate), player needs ~25–30 total sp2-awarding choices across their path
- Antechamber gate: sp2≥12 AND `stage2_faction_contact_made` flag
- Climax requires `maren_oss_resolved`
- **Target: sp2≥18 reachable from ≤6 locality visits at normal play rate**

**Per-locality target:** Each of the 12 zero-count localities needs **minimum 4 sp2-advancing choices** (2 success paths per choice × 2 choices minimum = 4 sp2++ calls). Higher-traffic localities (shelkopolis, cosmoria, soreheim) need 6–8.

**Minimum new sp2++ calls needed:** ~60 additional (across the 12 zero-count localities), bringing total to ~154 — sufficient for any archetype path to reach sp2=18 within 200 picks.

### Emptiest Localities (Priority Order)

1. **shelkopolis_stage2** — highest-traffic locality, 0 sp2 choices. Most players arrive here first in Stage II.
2. **cosmoria_stage2** — archive/lore hub, 0 sp2 choices. Lore/Wits archetypes route here.
3. **guildheart_hub_stage2** — faction contact point, 0 sp2 choices. `stage2_faction_contact_made` flag is antechamber gate.
4. **mimolot_academy_stage2** — craft/lore hub, 0 sp2 choices. Artificer/Alchemist archetypes route here.
5. **soreheim_proper_stage2** — combat/survival hub, 0 sp2 choices. Might archetypes route here.
6. **panim_haven_stage2** — investigation hub, 0 sp2 choices.
7. **shirshal_stage2**, **districts_stage2**, **fairhaven_stage2**, **whitebridge_commune_stage2**, **ithtananalor_stage2**, **nomdara_stage2** — all zero.

---

## Expansion Tasks

### Task 1: shelkopolis_stage2 — Core Hub Expansion

**Priority:** CRITICAL — highest player traffic in Stage II

**File:** `content/shelkopolis_stage2_enriched_choices.js`

**Add minimum:** 8 new sp2-advancing choices (6 standard + 2 faction-contact choices that set `stage2_faction_contact_made`)

**Choice types to add:**
- 2× NPC encounter (Collegium intermediaries, merchants with restricted manifests)
- 2× Lore/archive discovery (suppressed routes, missing manifest patterns)
- 2× Faction interaction — **must set `G.flags.stage2_faction_contact_made = true`** on success (antechamber gate depends on this)
- 2× Travel complication (checkpoint evasion, staged document review)

**Skills to invoke:**
- `game-design:design-discovery` — for choice architecture and progression gating
- `superpowers:writing-skills` — for result text (60–90 words, scene-not-summary)
- `humanizer` — strip forbidden words, editorial framing
- `continuity-auditor` — verify NPC names against V33_2 named NPC canon

**Canon constraints:**
- Load: `data/reference/V33_2_extracted/V33_2_DnD_Repository/03_LOCALITY_ENGINE/locality_packets/shelkopolis.json`
- Load: `data/reference/V33_2_extracted/V33_2_DnD_Repository/11_REFERENCE_VIEWS/locality_quickstart_cards/shelkopolis.md`
- Shelkopolis is a Union polity. Guild marks on everything. Proceduralism dominates.
- Named NPCs: draw from `02_CANON_BASELINE/named_npcs/` — do not invent names that conflict
- No Ledger of Ash named. Suppression shown through NPC deflection and institutional pattern.

**World Expansion Rule check:** Each added choice must include result text ≥60 words. No existing choices removed.

**Each choice object must include:**
```javascript
{
  label: "...",          // under 15 words, player's inner voice
  tags: [...],           // semantic tags for DC classification
  xpReward: 65-80,
  stageProgress: 2,
  fn: function() {
    advanceTime(1);
    G.telemetry.turns++;
    G.telemetry.actions++;
    gainXp(N, 'description');
    const result = rollD20('skill', bonus);
    if (result.isCrit) {
      G.stageProgress[2]++;
      // For faction choices: G.flags.stage2_faction_contact_made = true;
      G.lastResult = `...60-90 words, scene...`;
      addJournal('...', 'category');
    } else if (result.isFumble) {
      G.worldClocks.pressure++;
      G.lastResult = `...scene...`;
      addJournal('...', 'complication');
    } else {
      G.stageProgress[2]++;
      G.lastResult = `...60-90 words, scene...`;
      addJournal('...', 'category');
    }
    G.recentOutcomeType = '...';
    maybeStageAdvance();
  },
  failResult: '...'    // 30-60 words, forward redirect
}
```

- [ ] **Step 1:** Read current `shelkopolis_stage2_enriched_choices.js` — note existing choice count and any established NPC names
- [ ] **Step 2:** Draft 8 new choices following the template above
- [ ] **Step 3:** Verify 2 of the 8 set `stage2_faction_contact_made = true` on success path
- [ ] **Step 4:** Run `node tests/content/validate-content.js 2>&1 | grep shelkopolis_stage2` — verify 0 new violations
- [ ] **Step 5:** Commit: `git add content/shelkopolis_stage2_enriched_choices.js && git commit -m "feat: shelkopolis stage2 — 8 new sp2 choices, faction contact gate wired"`

---

### Task 2: guildheart_hub_stage2 — Faction Contact Gate

**Priority:** CRITICAL — `stage2_faction_contact_made` flag must be settable here for players who route through Guildheart

**File:** `content/guildheart_hub_stage2_enriched_choices.js`

**Add minimum:** 6 new sp2-advancing choices

**Choice types:**
- 3× Faction interaction (Guild Council intermediaries, procurement access, inner sanctum approach) — at least 2 must set `stage2_faction_contact_made = true`
- 2× Lore discovery (suppressed routing ledgers, cross-referencing guild records)
- 1× NPC encounter (Guildmaster Selene's staff, rank-and-file guild members)

**Skills:** `game-design:design-discovery`, `superpowers:writing-skills`, `humanizer`, `continuity-auditor`

**Canon constraints:**
- Load: `data/reference/V33_2_extracted/V33_2_DnD_Repository/03_LOCALITY_ENGINE/locality_packets/guildheart_hub.json`
- Guild Council led by Guildmaster Selene. Guild marks on everything. Proceduralism.
- Union polity — heat system applies (`addHeat('union', n)` on confrontation outcomes)

- [ ] **Step 1:** Read current file
- [ ] **Step 2:** Draft 6 new choices; 2 must set `stage2_faction_contact_made = true`
- [ ] **Step 3:** Validate
- [ ] **Step 4:** Commit: `git add content/guildheart_hub_stage2_enriched_choices.js && git commit -m "feat: guildheart hub stage2 — 6 new sp2 choices, faction contact gate"`

---

### Task 3: cosmoria_stage2 — Archive/Lore Path

**Priority:** HIGH — primary route for Lore/Wits archetypes (Archivist, Scholar backgrounds)

**File:** `content/cosmoria_stage2_enriched_choices.js`

**Add minimum:** 6 new sp2-advancing choices

**Choice types:**
- 3× Archive/lore discovery (restricted stacks, cross-referencing suppressed manifests, night archivist access)
- 2× NPC encounter (Britta the night archivist if established in locality_npcs.js; new canon-consistent NPCs)
- 1× Faction interaction (Archive authority challenge)

**Skills:** `game-design:design-discovery`, `superpowers:writing-skills`, `humanizer`, `locality-flavor-pass`

**Canon constraints:**
- Load: `data/reference/V33_2_extracted/V33_2_DnD_Repository/03_LOCALITY_ENGINE/locality_packets/cosmoria.json`
- Load: `data/reference/V33_2_extracted/V33_2_DnD_Repository/12_TABLE_KITS/arrival_kits/cosmoria.md`
- Archive access gates on `G.flags.archive_access` (set by Archive Entry Warrant from shop)
- Magic law differs here — show in narration and NPC behavior

- [ ] **Step 1:** Read current file; check if `archive_access` flag is used
- [ ] **Step 2:** Draft 6 choices; lore discoveries should gate on `archive_access` flag where appropriate
- [ ] **Step 3:** Validate
- [ ] **Step 4:** Commit: `git add content/cosmoria_stage2_enriched_choices.js && git commit -m "feat: cosmoria stage2 — 6 new sp2 choices, archive lore path"`

---

### Task 4: mimolot_academy_stage2 — Craft/Scholar Path

**Priority:** HIGH — primary route for Artificer, Alchemist, Engineer archetypes

**File:** `content/mimolot_academy_stage2_enriched_choices.js`

**Add minimum:** 6 new sp2-advancing choices

**Choice types:**
- 2× Craft/lore discovery (suppressed research, sequestered academic records)
- 2× NPC encounter (academy faculty under institutional pressure, students with restricted materials)
- 2× Faction interaction (Academy administration, Collegium oversight presence)

**Skills:** `game-design:design-discovery`, `superpowers:writing-skills`, `humanizer`, `continuity-auditor`

**Canon constraints:**
- Load: `data/reference/V33_2_extracted/V33_2_DnD_Repository/03_LOCALITY_ENGINE/locality_packets/mimolot_academy.json`
- Researcher Doss (mentioned in `stage2_enriched_choices.js`) relocated from Mimolot — use this thread
- Academic register: formal, indirect, heavy use of institutional language as deflection

- [ ] **Step 1:** Read current file; search for any existing Doss references
- [ ] **Step 2:** Draft 6 choices; at least 1 should continue the Doss thread from global pool
- [ ] **Step 3:** Validate
- [ ] **Step 4:** Commit: `git add content/mimolot_academy_stage2_enriched_choices.js && git commit -m "feat: mimolot academy stage2 — 6 new sp2 choices, Doss thread, craft path"`

---

### Task 5: soreheim_proper_stage2 — Combat/Survival Path

**Priority:** HIGH — primary route for combat/might archetypes

**File:** `content/soreheim_proper_stage2_enriched_choices.js`

**Add minimum:** 6 new sp2-advancing choices

**Choice types:**
- 2× Combat/survival encounter (labor gang disputes, Soreheim enforcement, terrain hazards)
- 2× NPC encounter (foremen, labor organizers, debt-enforcement agents)
- 2× Lore/intelligence discovery (quota manipulation evidence, missing workers thread from Cort Massik)

**Skills:** `game-design:design-discovery`, `superpowers:writing-skills`, `humanizer`, `stage-escalation-pass`

**Canon constraints:**
- Load: `data/reference/V33_2_extracted/V33_2_DnD_Repository/03_LOCALITY_ENGINE/locality_packets/soreheim_proper.json`
- Soreheim economy: decommodification applies. Supply costs and labor dynamics per `ECONOMY_AND_TRADE.md`
- Quota discrepancy thread (18% increase, no contract revision) established in locality_npcs.js — continue it
- Heat system: confrontations with enforcement use `addHeat('soreheim', n)`

- [ ] **Step 1:** Read current file
- [ ] **Step 2:** Draft 6 choices continuing quota/missing-workers threads
- [ ] **Step 3:** Validate
- [ ] **Step 4:** Commit: `git add content/soreheim_proper_stage2_enriched_choices.js && git commit -m "feat: soreheim proper stage2 — 6 new sp2 choices, labor thread, combat path"`

---

### Task 6: panim_haven_stage2 — Investigation/Evidence Path

**Priority:** HIGH — death registry access, document work, Charm/Wits archetypes

**File:** `content/panim_haven_stage2_enriched_choices.js`

**Add minimum:** 6 new sp2-advancing choices

**Choice types:**
- 3× Evidence/intelligence discovery (death records, cross-referencing coroner notes, registry discrepancies)
- 2× NPC encounter (registry clerks, mourning procession contacts, night coroner)
- 1× Faction interaction (registry authority gate)

**Skills:** `game-design:design-discovery`, `superpowers:writing-skills`, `humanizer`, `continuity-auditor`

**Canon constraints:**
- Load: `data/reference/V33_2_extracted/V33_2_DnD_Repository/03_LOCALITY_ENGINE/locality_packets/panim_haven.json`
- `panim_registry_access` flag gates some choices (set by shop item)
- Register: funerary quiet, procedural, institutional deference to death rites
- Panim polity: `addHeat('panim', n)` for confrontation paths

- [ ] **Step 1:** Read current file; verify `panim_registry_access` flag usage
- [ ] **Step 2:** Draft 6 choices; 2 gated on `panim_registry_access`
- [ ] **Step 3:** Validate
- [ ] **Step 4:** Commit: `git add content/panim_haven_stage2_enriched_choices.js && git commit -m "feat: panim haven stage2 — 6 new sp2 choices, registry thread, evidence path"`

---

### Task 7: shirshal_stage2, districts_stage2, fairhaven_stage2 — Mid-Tier Expansion

**Priority:** MEDIUM — secondary routes; still need sp2 contribution for full coverage

**Files:**
- `content/shirshal_stage2_enriched_choices.js`
- `content/districts_stage2_enriched_choices.js`
- `content/fairhaven_stage2_enriched_choices.js`

**Add minimum:** 4 new sp2-advancing choices per file (12 total across 3 files)

**Choice types per file:**
- 2× locality-specific NPC encounter
- 1× lore/intelligence discovery
- 1× travel complication or faction interaction

**Skills:** `game-design:design-discovery`, `superpowers:writing-skills`, `humanizer`

**Canon constraints:**
- Load locality packets for each: `03_LOCALITY_ENGINE/locality_packets/[locality].json`
- Districts: Missing quickstart card — use locality packet data as substitute. No canon NPCs.
- Shirshal and Fairhaven: draw NPCs from `02_CANON_BASELINE/named_npcs/` where available

- [ ] **Step 1:** Read each file; note current choice count and NPC names
- [ ] **Step 2:** Draft 4 choices per file following the standard template
- [ ] **Step 3:** Validate all three
- [ ] **Step 4:** Commit per file batch

---

### Task 8: whitebridge_commune_stage2, ithtananalor_stage2, nomdara_stage2 — Thin Coverage

**Priority:** MEDIUM — edge localities; Nomdara requires special handling

**Files:**
- `content/whitebridge_commune_stage2_enriched_choices.js`
- `content/ithtananalor_stage2_enriched_choices.js`
- `content/nomdara_stage2_choices.js`

**Add minimum:** 4 new sp2-advancing choices per file

**Choice types:**
- whitebridge: 2× NPC encounter, 2× lore/travel discovery
- ithtananalor: 2× lore discovery, 2× faction interaction
- nomdara: **Transit-only. Zero canon NPCs. Zero NPC encounters.** Add only: 2× travel complication, 2× environmental/route discovery

**Nomdara constraint (hard rule from CLAUDE.md):** No NPC encounters. No named NPCs. Mobile settlement — no authored quickstart card. Travel and environmental choices only.

**Skills:** `game-design:design-discovery`, `superpowers:writing-skills`, `humanizer`

- [ ] **Step 1:** Read each file
- [ ] **Step 2:** Draft choices per type constraints above
- [ ] **Step 3:** Validate
- [ ] **Step 4:** Commit per file

---

### Task 9: Boost Thin-Count Localities (aurora, harvest, plumes, sunspire)

**Priority:** MEDIUM — currently 2 sp2 choices each; need minimum 4

**Files:**
- `content/aurora_crown_commune_stage2_enriched_choices.js` (2 → target 6)
- `content/harvest_circle_stage2_enriched_choices.js` (2 → target 6)
- `content/plumes_end_outpost_stage2_enriched_choices.js` (2 → target 6)
- `content/sunspire_haven_stage2_enriched_choices.js` (2 → target 6)

**Add minimum:** 4 new sp2-advancing choices per file (16 total)

**Choice types:** Match locality identity from locality packet. Mix of NPC, lore, exploration.

**Canon constraints:**
- Plumes End Outpost: Missing quickstart card — use locality packet data as reference
- aurora, harvest, sunspire: load respective locality packets

**Skills:** `game-design:design-discovery`, `superpowers:writing-skills`, `humanizer`, `locality-flavor-pass`

- [ ] **Step 1:** Read each file; note existing 2 choices for continuity
- [ ] **Step 2:** Draft 4 new choices per file
- [ ] **Step 3:** Validate all four
- [ ] **Step 4:** Commit per file

---

### Task 10: stage2_enriched_choices.js — Global Pool Archetype Coverage Audit

**Priority:** MEDIUM — 70 existing choices; verify all 4 archetype families can hit sp2=18 through the global pool alone if locality choices are also present

**File:** `content/stage2_enriched_choices.js`

**Audit steps:**
- Tag each existing choice with its primary skill demand: combat/stealth/survival = might-path; lore/persuasion = social-path; craft = craft-path
- Identify skill imbalances: if >60% of choices demand lore/persuasion, add combat and craft alternatives
- Add minimum 6 new choices targeting underrepresented archetypes (Knight, Warrior, Artificer, Engineer family)

**Choice types to add:**
- 2× combat/survival travel encounter (physical path through hazardous terrain, escort complication)
- 2× craft/trade encounter (material identification, route supply analysis)
- 2× stealth/finesse encounter (checkpoint evasion, document swap)

**Skills:** `game-design:balance-review`, `game-design:design-discovery`, `superpowers:writing-skills`, `humanizer`

- [ ] **Step 1:** Tally existing global pool choices by primary skill
- [ ] **Step 2:** Draft 6 new choices for underrepresented skill paths
- [ ] **Step 3:** Validate
- [ ] **Step 4:** Commit: `git add content/stage2_enriched_choices.js && git commit -m "feat: stage2 global pool — 6 new choices for archetype balance (combat/craft/stealth paths)"`

---

### Task 11: Antechamber Gate Audit — Verify `stage2_faction_contact_made` Is Settable on All Paths

**Priority:** CRITICAL — if this flag is never set, antechamber never triggers regardless of sp2 count

**Files to check:**
- All locality files touched in Tasks 1–9
- `content/stage2_enriched_choices.js` global pool
- `content/stage2_antechamber.js` (shouldTrigger condition)

**Audit:**
- Confirm `stage2_faction_contact_made = true` is set in at minimum: shelkopolis, guildheart_hub, and 2+ other high-traffic localities
- Confirm the flag is in `G.flags` (not `G.stageProgress` or elsewhere)
- Confirm `G.flags.stage2_faction_contact_made` is initialized in G defaults (search `ledger-of-ash.html` for the G defaults object)

**Fix if missing:** Add the flag initialization to G defaults. Add at least one faction-contact choice in each of the 5 most-visited localities.

- [ ] **Step 1:** Grep for `stage2_faction_contact_made` across all content files
- [ ] **Step 2:** Grep for `stage2_faction_contact_made` in `ledger-of-ash.html` G defaults
- [ ] **Step 3:** Add missing flag sets and G defaults initialization
- [ ] **Step 4:** Commit: `git add ledger-of-ash.html content/ && git commit -m "fix: stage2_faction_contact_made — ensure flag settable on all archetype paths, G defaults init"`

---

### Task 12: Volume Verification — Stage 2 Must Exceed Stage 1

**Priority:** MUST COMPLETE — World Expansion Rule compliance check

**After all other tasks:**

```bash
# Stage 1 baseline
wc -l content/*stage1*enriched_choices.js | tail -1

# Stage 2 total
wc -l content/*stage2* | tail -1

# File size comparison
du -sh content/*stage1* | awk '{sum+=$1} END{print "Stage1: "sum}'
du -sh content/*stage2* | awk '{sum+=$1} END{print "Stage2: "sum}'
```

**Target:** Stage 2 total line count and KB must exceed Stage 1 (~15K lines, ~534KB).

**If not met:** Return to highest-priority empty localities and add 4+ more choices each until the threshold is cleared.

- [ ] **Step 1:** Run line count comparison after all expansion tasks complete
- [ ] **Step 2:** If Stage 2 < Stage 1, identify which tasks need additional choices and add them
- [ ] **Step 3:** Final validate: `node tests/content/validate-content.js`
- [ ] **Step 4:** Final commit: `git commit -m "feat: stage2 content expansion complete — exceeds stage1 volume"`

---

## Success Criteria

| Criterion | Target | Verification |
|-----------|--------|-------------|
| sp2=18 reachable | ≤200 picks, all 4 archetype families | Manual playthrough or Playwright harness |
| Antechamber triggers | sp2≥12 AND `stage2_faction_contact_made` on all paths | Grep flag across locality files |
| Climax reachable | `maren_oss_resolved` set after climax | `stage2_climax.js` `_closeClimax()` check |
| Stage 2 volume | Exceeds Stage 1 (~15K lines, ~534KB) | `wc -l` comparison |
| Content validator | 0 new violations | `node tests/content/validate-content.js` |
| Forbidden words | 0 in new result text | Validator grep pass |
| All choices have `failResult` | Including all new safe choices | Validator check |

---

## Skill Matrix

| Task Type | Skills to Fire |
|-----------|---------------|
| Choice architecture + progression gating | `game-design:design-discovery` |
| Result text authoring (60–90 words, scene) | `superpowers:writing-skills` |
| Forbidden words + editorial voice removal | `humanizer` |
| NPC name/register/canon verification | `continuity-auditor` |
| Locality sensory opening + physical infrastructure | `locality-flavor-pass` |
| Combat/survival choice escalation | `stage-escalation-pass` |
| Archetype coverage balance check | `game-design:balance-review` |
| Label inner-voice + 15-word enforcement | `choice-branch-polish` |

---

## Execution Order

| Priority | Task | Blocker for |
|----------|------|------------|
| 1 | Task 11 (gate audit) | Everything — antechamber won't trigger without flag |
| 2 | Task 1 (shelkopolis) | Highest player traffic |
| 3 | Task 2 (guildheart) | `stage2_faction_contact_made` second source |
| 4 | Tasks 3–6 (cosmoria, mimolot, soreheim, panim) | Archetype family coverage |
| 5 | Tasks 7–9 (mid-tier, thin-count localities) | Volume target |
| 6 | Task 10 (global pool balance) | Archetype balance |
| 7 | Task 12 (volume verification) | World Expansion Rule compliance |

Execute Tasks 3–6 in parallel (independent files). Execute Tasks 7–9 in parallel.

---

## Block E Relationship (Non-Duplication)

Block E of `2026-05-14-stage1-2-release-polish.md` covers:
- **E1:** Prose/label/failResult quality pass on existing Stage 2 files
- **E2:** Stage 2 locality NPC entries in `locality_npcs.js`

**This plan covers:** Net-new sp2-advancing choices added to currently-empty or thin localities. The two plans are complementary — Block E polishes what exists; this plan adds new content. Run Block E **after** this plan so the quality pass catches new choices too.
