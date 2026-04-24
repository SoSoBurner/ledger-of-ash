# Stage 2 Escalation Pass — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring all Stage 2 locality files to a minimum of 7 enriched choices per locality, and author a complete Collegium investigation path through 5 core Stage 2 localities so that one full playthrough exists.

**Architecture:** Content authoring only — edit existing `content/*_stage2_enriched_choices.js` files. Each file uses the `window.LOCALITY_STAGE2_CHOICES = [...]` pattern. No new files. All new choices must pass `npm run test:content` before commit.

**Tech Stack:** Vanilla JS IIFEs, game functions (`addNarration`, `addJournal`, `gainXp`, `G.flags`, `G.stageProgress`)

---

## Content Standards (read before writing any choice)

All choices must comply with `docs/CONTENT_STANDARDS.md`:
- **Label**: player's inner thought, ≤ 15 words, no question marks, no infinitive verbs ("To ask...", "Check...")
- **Result text**: 60–90 words, opens with observable action/sensory detail (not "You learn that..."), no forbidden words (`investigation`, `meaningful`, `you feel`, `you realize`, `you sense`)
- **Rumor**: must include source attribution (proper noun, social role, or location)
- **NPC flag**: set `G.flags.met_<name> = true` BEFORE any `addNarration` that names the NPC
- Validate with: `node tests/content/review-content.js content/<filename>`

---

## File Map

Thin localities (< 7 choices estimated based on line count):

| File | Lines | Priority |
|------|-------|----------|
| `content/unity_square_stage2_enriched_choices.js` | 220 | High |
| `content/ironhold_quarry_stage2_enriched_choices.js` | 221 | High |
| `content/craftspire_stage2_enriched_choices.js` | 223 | High |
| `content/plumes_end_outpost_stage2_enriched_choices.js` | 223 | High |
| `content/glasswake_commune_stage2_enriched_choices.js` | 231 | Medium |
| `content/soreheim_proper_stage2_enriched_choices.js` | 266 | Medium |
| `content/aurora_crown_commune_stage2_enriched_choices.js` | 258 | Medium |

Collegium path core localities (need faction-flavored choices):
- `content/shelkopolis_stage2_enriched_choices.js` (659 lines — richest, anchor here)
- `content/guildheart_hub_stage2_enriched_choices.js` (273 lines — needs Collegium thread)
- `content/cosmoria_stage2_enriched_choices.js` (259 lines — institutional records focus)
- `content/mimolot_academy_stage2_enriched_choices.js` (278 lines — scholarly access)
- `content/ithtananalor_stage2_enriched_choices.js` (314 lines — border pressure)

---

## Task 1: Density Audit — Count Actual Choices Per File

Before writing, confirm which files are thin.

**Files:**
- Read: all `content/*_stage2_enriched_choices.js` files

- [ ] **Step 1: Count `label:` entries per file**

```bash
for f in content/*_stage2_enriched_choices.js; do
  echo "$(grep -c 'label:' $f) $f"
done | sort -n
```

- [ ] **Step 2: Record which files have fewer than 7 choices**

Make a note of the exact count per file. Any file with < 7 `label:` entries needs new choices in Tasks 2–4.

- [ ] **Step 3: Commit nothing — this is research only**

---

## Task 2: Thin Locality Pass — Unity Square + Ironhold Quarry

Add 3 new choices to each. These localities have distinct identities:
- **Unity Square**: civic gathering space, public announcements, guild notices, social friction between factions
- **Ironhold Quarry**: industrial extraction, physical labor culture, extraction quotas, safety disputes

**Files:**
- Modify: `content/unity_square_stage2_enriched_choices.js`
- Modify: `content/ironhold_quarry_stage2_enriched_choices.js`

- [ ] **Step 1: Read both files to understand current choice structure and window variable name**

Each file declares something like `window.UNITY_SQUARE_STAGE2_CHOICES = [...]`. Find the array and append to it.

- [ ] **Step 2: Add 3 choices to Unity Square**

Append inside the array. Example structure — write actual content, not placeholder:

```js
{
  label: 'The notice board carries a sealed guild amendment',
  fn: function() {
    addNarration('Unity Square — Notice Board', 'A paper seal in Merchants\' Alliance yellow closes the lower half of the board. Someone has posted a counter-notice beside it, unsigned, on market stationery. Two clerks stand at the edge of the square watching who stops to read. Neither approaches.');
    addJournal('A sealed guild amendment appeared on the Unity Square board overnight. A warden from the Civic Council was seen nearby.', 'intelligence');
    gainXp(15);
    G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
  },
  xpReward: 15
},
```

Write 3 choices covering: (1) an intelligence-gathering opportunity, (2) a social interaction with a civic official, (3) a complication or faction friction moment. Each must follow CONTENT_STANDARDS.md — observable opening, 60–90 words, proper source attribution on any rumor.

- [ ] **Step 3: Add 3 choices to Ironhold Quarry**

Write 3 choices covering: (1) a physical evidence opportunity (extraction records, quota sheets), (2) a worker interaction that reveals institutional pressure, (3) a complication (oversight presence, sealed area). Each must be specific to quarry life — stone dust, extraction rhythms, shift-end culture, weight of the rock.

- [ ] **Step 4: Run the content validator**

```bash
node tests/content/review-content.js content/unity_square_stage2_enriched_choices.js
node tests/content/review-content.js content/ironhold_quarry_stage2_enriched_choices.js
```

Expected: 0 FAIL. WARNs on result length are acceptable if text is 50–59 words and complete — expand if possible.

- [ ] **Step 5: Run the full gate**

```bash
npm run test:content
```

Expected: exits 0.

- [ ] **Step 6: Commit**

```bash
git add content/unity_square_stage2_enriched_choices.js content/ironhold_quarry_stage2_enriched_choices.js
git commit -m "feat: Stage 2 density pass — Unity Square + Ironhold Quarry (+3 choices each)"
```

---

## Task 3: Thin Locality Pass — Craftspire + Plumes End + Glasswake

Same process as Task 2 for three more thin localities:
- **Craftspire**: artisan production, guild craft certification, quality disputes, workshop access
- **Plumes End Outpost**: transit checkpoint, border crossing, document inspection culture, traveler friction
- **Glasswake Commune**: communal water management, shared resource governance, seasonal tensions

**Files:**
- Modify: `content/craftspire_stage2_enriched_choices.js`
- Modify: `content/plumes_end_outpost_stage2_enriched_choices.js`
- Modify: `content/glasswake_commune_stage2_enriched_choices.js`

- [ ] **Step 1: Read each file to understand the current array structure and existing choices**

Note: check `data/reference/V33_2_extracted/V33_2_DnD_Repository/03_LOCALITY_ENGINE/locality_packets/` for each locality's identity card before writing. The JSON file contains `encounter_rhythm`, `social_misstep_examples`, and `scene_openers` — use these.

- [ ] **Step 2: Add 3 choices to Craftspire**

Focus on: guild certification records (intelligence), a craftspire master who knows about supply chain irregularities (NPC encounter, follow CONTENT_STANDARDS.md NPC rules: agenda + register + tell), and a complication involving disputed quality marks.

- [ ] **Step 3: Add 3 choices to Plumes End Outpost**

Focus on: document inspection revealing sealed transit records (evidence), a checkpoint warden who recognizes a pattern but won't commit (NPC with subtext), and a complication where a traveler ahead of you is turned back without explanation.

- [ ] **Step 4: Add 3 choices to Glasswake Commune**

Focus on: communal water allocation records that show redirected resources (intelligence), a commune steward who deflects questions about upstream supply (NPC subtext — agenda: protect commune's standing), and a discovery choice that reveals a seasonal anomaly in the allocation logs.

- [ ] **Step 5: Validate all three**

```bash
node tests/content/review-content.js content/craftspire_stage2_enriched_choices.js
node tests/content/review-content.js content/plumes_end_outpost_stage2_enriched_choices.js
node tests/content/review-content.js content/glasswake_commune_stage2_enriched_choices.js
npm run test:content
```

Expected: 0 FAIL across all.

- [ ] **Step 6: Commit**

```bash
git add content/craftspire_stage2_enriched_choices.js content/plumes_end_outpost_stage2_enriched_choices.js content/glasswake_commune_stage2_enriched_choices.js
git commit -m "feat: Stage 2 density pass — Craftspire + Plumes End + Glasswake (+3 each)"
```

---

## Task 4: Collegium Investigation Path — Guildheart + Cosmoria + Mimolot

These three localities are the institutional core of Stage 2. Each needs 2–3 choices that specifically advance the Collegium investigation thread — choices that reward `G.flags.collegium_*` awareness or set faction contact flags.

**Files:**
- Modify: `content/guildheart_hub_stage2_enriched_choices.js`
- Modify: `content/cosmoria_stage2_enriched_choices.js`
- Modify: `content/mimolot_academy_stage2_enriched_choices.js`

- [ ] **Step 1: Read the Collegium faction flag namespace**

Search `ledger-of-ash.html` for `collegium` to find existing flag names and what's already set. Also read `content/stage2_climax.js` to understand what the climax expects to be true before it triggers.

```bash
grep -n 'collegium\|stage2_faction' ledger-of-ash.html | head -30
grep -n 'collegium\|stage2_faction' content/stage2_climax.js | head -20
```

Note the exact flag names — use them.

- [ ] **Step 2: Add Collegium-path choices to Guildheart Hub**

Write 2 choices that:
1. Reward a player who has been following institutional records — a Guildheart factor who has noticed the same pattern (set `G.flags.stage2_faction_contact_made = true` on completion)
2. Surface a document irregularity involving Collegium administrative stamps

Both choices should read as organic Guildheart scenes first (transit hub, factor culture, freight manifests) — the Collegium thread is texture, not explicit announcement.

- [ ] **Step 3: Add Collegium-path choices to Cosmoria**

Cosmoria is an institutional records hub. Write 2 choices:
1. A records request that reveals a sealed Collegium filing (evidence category)
2. An encounter with a Collegium administrator who is evasive in a specific, character-revealing way (NPC: agenda = protect filing order, register = procedural formality, tell = checks a specific document folder before answering anything)

- [ ] **Step 4: Add Collegium-path choices to Mimolot Academy**

Mimolot has scholarly access. Write 2 choices:
1. A research archive request that surfaces academic correspondence referencing administrative suppression without naming it
2. A scholar who is willing to talk about historical pattern but becomes careful when current events come up (subtext: they know more than they say)

- [ ] **Step 5: Validate**

```bash
node tests/content/review-content.js content/guildheart_hub_stage2_enriched_choices.js
node tests/content/review-content.js content/cosmoria_stage2_enriched_choices.js
node tests/content/review-content.js content/mimolot_academy_stage2_enriched_choices.js
npm run test:content
```

- [ ] **Step 6: Commit**

```bash
git add content/guildheart_hub_stage2_enriched_choices.js content/cosmoria_stage2_enriched_choices.js content/mimolot_academy_stage2_enriched_choices.js
git commit -m "feat: Stage 2 Collegium path — Guildheart + Cosmoria + Mimolot (faction thread choices)"
```

---

## Task 5: Final Density Check + Validator Run

- [ ] **Step 1: Re-run label count across all Stage 2 files**

```bash
for f in content/*_stage2_enriched_choices.js; do
  echo "$(grep -c 'label:' $f) $f"
done | sort -n
```

Confirm no locality file has fewer than 7 choices. If any still do, author additional choices following the same pattern as Tasks 2–4.

- [ ] **Step 2: Run full test suite**

```bash
npm run test:content
npm run test:continuity
```

Expected: exits 0 on both.

- [ ] **Step 3: Run review reports on the 5 Collegium-path files**

```bash
node tests/content/review-content.js content/guildheart_hub_stage2_enriched_choices.js
node tests/content/review-content.js content/cosmoria_stage2_enriched_choices.js
node tests/content/review-content.js content/mimolot_academy_stage2_enriched_choices.js
node tests/content/review-content.js content/shelkopolis_stage2_enriched_choices.js
```

Read Layer B findings. Address any B1 (summary openers), B4 (combat vividness), B5 (subtext) flags.

- [ ] **Step 4: Final commit**

```bash
git add content/
git commit -m "feat: Stage 2 escalation pass complete — all localities ≥7 choices, Collegium path wired"
```
