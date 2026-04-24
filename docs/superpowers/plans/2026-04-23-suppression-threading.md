# Suppression Threading — Stage 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thread observable suppression signals through 6 Stage 1 localities so that the player accumulates a pattern of institutional pressure before Stage 2 names the mechanism. Signals must be felt, not explained — missing names, deflected questions, sealed records, institutional refusals.

**Architecture:** Targeted narration edits and 1–2 new choice additions per locality, all within existing `content/*_stage1_enriched_choices.js` files and `content/locality_narrations.js`. No new files. Canon rule: "Ledger of Ash" must never appear before mid-Stage 4. Suppression is felt through texture, not named.

**Tech Stack:** Vanilla JS content files, `addNarration`, `addJournal` with `'intelligence'` or `'evidence'` categories

---

## Suppression Signal Vocabulary (use these patterns — do not invent new categories)

These are the observable forms suppression takes in Stages 1–3:

| Signal Type | Observable Form |
|-------------|----------------|
| Missing name | "The record lists an authorization code but no signatory name. The column is blank." |
| Deflected question | NPC answers a different question than the one asked. Behavior, not meta-commentary. |
| Sealed record | Physical object: wax seal, locked drawer, stamp reading ADMINISTRATIVE HOLD |
| Institutional refusal | Procedural denial — "That filing is not available at this registry level." No explanation. |
| Anomalous gap | A date range missing from an otherwise complete log. No annotation for the gap. |
| Cautious NPC | An NPC who starts to say something, stops, and completes a different sentence entirely. |

**Never**: name the Ledger of Ash, name the suppression system, have an NPC say "something is wrong here" in those words. Show the behavior. Let the player name it.

---

## File Map

Target localities (Stage 1, high traffic, strong institutional presence):

| Locality | File | Signal focus |
|----------|------|-------------|
| Shelkopolis | `content/shelkopolis_stage1_enriched_choices.js` | Missing signatory, sealed registry |
| Soreheim Proper | `content/soreheim_proper_stage1_enriched_choices.js` | Institutional refusal, anomalous gap |
| Guildheart Hub | `content/guildheart_hub_stage1_enriched_choices.js` | Deflected question, cautious factor |
| Fairhaven | `content/fairhaven_stage1_enriched_choices.js` | Sealed record, missing name |
| Cosmoria | `content/cosmoria_stage1_enriched_choices.js` | Administrative hold stamp, anomalous date gap |
| Whitebridge Commune | `content/whitebridge_commune_stage1_enriched_choices.js` | Cautious NPC, deflected question |

---

## Task 1: Shelkopolis — Missing Signatory + Sealed Registry

Shelkopolis is the hub. The first suppression signal the player encounters should be here — subtle, embedded in normal civic life.

**Files:**
- Modify: `content/shelkopolis_stage1_enriched_choices.js`

- [ ] **Step 1: Read the file and find existing registry or records-adjacent choices**

Search for `registry\|record\|ledger\|clerk\|scribe` in the file. Read the surrounding context. Find a natural attachment point for a new intelligence choice — a moment where the player would plausibly interact with institutional records.

- [ ] **Step 2: Add 1 new choice: "The authorization column is blank"**

Write a choice where the player notices a missing signatory in a routine record. The observation must be embedded in physical detail — paper texture, ink age, the clerk's posture when you point it out. Do not editorialize. The player notices; the text does not tell them what it means.

Example result structure (write the actual content — this is a guide, not a template):
- Opens with physical detail of the document or the space (not "You notice that...")
- The clerk's reaction is behavioral — not what they say, but what they do with their hands or eyes
- Journal call: `addJournal('text describing the observation concretely', 'intelligence')`
- No `stageProgress` increment — this is ambient texture, not a milestone

- [ ] **Step 3: Add 1 narration edit to an existing choice**

Find a choice that already involves a civic official or public record. Add one sentence to its result text describing an anomaly — a seal on the wrong drawer, a date that doesn't match the record above it. One sentence. Do not restructure the choice.

Confirm the result text is still ≤ 120 words after the addition.

- [ ] **Step 4: Validate**

```bash
node tests/content/review-content.js content/shelkopolis_stage1_enriched_choices.js
```

Expected: 0 FAIL.

- [ ] **Step 5: Commit**

```bash
git add content/shelkopolis_stage1_enriched_choices.js
git commit -m "feat: suppression threading — Shelkopolis (missing signatory, sealed registry)"
```

---

## Task 2: Soreheim Proper — Institutional Refusal + Anomalous Gap

Soreheim is the economic center. Suppression here reads as administrative procedure — not hostile, just impenetrable.

**Files:**
- Modify: `content/soreheim_proper_stage1_enriched_choices.js`

- [ ] **Step 1: Read the file and find a natural institutional access point**

Search for `guild\|factor\|registry\|permit\|approval` in the file.

- [ ] **Step 2: Add 1 new choice: a records request that hits a procedural wall**

The player requests something routine — a past-season ledger, a guild factor's authorization log. The clerk delivers a procedural refusal: "That filing is not available at this registry level." No hostility. No explanation. The clerk returns to their work. The player's only signal that something is wrong is that the refusal is too smooth — it has been given before.

Result: 60–90 words. Opens with the space (clerk's desk, the quality of light, the sound of stamps elsewhere in the room). Journal: `addJournal('...', 'intelligence')`.

- [ ] **Step 3: Add 1 sentence to an existing choice's result text**

Find a choice that involves year-end or seasonal records. Add one sentence: a date range in the middle of the log where entries simply stop, then resume. No annotation. No explanation. The gap is just there.

- [ ] **Step 4: Validate**

```bash
node tests/content/review-content.js content/soreheim_proper_stage1_enriched_choices.js
```

- [ ] **Step 5: Commit**

```bash
git add content/soreheim_proper_stage1_enriched_choices.js
git commit -m "feat: suppression threading — Soreheim Proper (institutional refusal, date gap)"
```

---

## Task 3: Guildheart Hub — Cautious Factor

Guildheart is a transit and coordination point. Suppression here reads as interpersonal caution — a factor who starts to answer a question and then doesn't.

**Files:**
- Modify: `content/guildheart_hub_stage1_enriched_choices.js`

- [ ] **Step 1: Find an existing NPC-interaction choice involving a factor or coordinator**

Read the file. Find a choice that involves an NPC conversation. This is the attachment point.

- [ ] **Step 2: Edit the result text to add a cautious-NPC moment**

In the existing choice's result text, find the NPC's most forthcoming line. Before it, add 1–2 sentences: the factor begins a sentence, pauses, looks at something behind you (the door, the window, another person passing), and finishes with a different sentence entirely. The interrupted thought is never recovered.

Keep the total result text ≤ 120 words. Trim elsewhere if needed.

- [ ] **Step 3: Add 1 new intelligence choice**

Write a new choice where the player overhears a conversation cut short. Two officials. One says something specific — a number, a name, a date. The other glances toward the player. The conversation ends. Journal: `addJournal('text embedding the specific detail overheard', 'intelligence')`. Source attribution required for the journal entry (per A4): note the location and the social role of the speakers.

- [ ] **Step 4: Validate**

```bash
node tests/content/review-content.js content/guildheart_hub_stage1_enriched_choices.js
```

- [ ] **Step 5: Commit**

```bash
git add content/guildheart_hub_stage1_enriched_choices.js
git commit -m "feat: suppression threading — Guildheart Hub (cautious factor, overheard fragment)"
```

---

## Task 4: Fairhaven + Cosmoria + Whitebridge

Apply one suppression signal per locality. Smaller scope than Tasks 1–3 — one edit or one new choice per file.

**Files:**
- Modify: `content/fairhaven_stage1_enriched_choices.js`
- Modify: `content/cosmoria_stage1_enriched_choices.js`
- Modify: `content/whitebridge_commune_stage1_enriched_choices.js`

- [ ] **Step 1: Fairhaven — sealed record**

Find a choice involving a merchant, shipper, or port record. Edit the result to add: a drawer sealed with administrative wax on a manifest cabinet — same stamp, same red, different drawer than the one you were shown. One sentence. Do not editorialize.

- [ ] **Step 2: Cosmoria — administrative hold stamp**

Find a choice involving records or a civic official. Edit the result to add: a document in the stack behind the clerk's desk — visible for a moment — bearing a red ADMINISTRATIVE HOLD stamp in Collegium procedural font. The clerk does not acknowledge it. One sentence.

- [ ] **Step 3: Whitebridge — deflected question**

Find a choice involving a community official or elder. Edit the NPC's dialogue to have them answer a question the player didn't ask. Not evasion — misdirection. They speak at length. None of it addresses what was asked. Their manner is helpful. The result is nothing.

- [ ] **Step 4: Validate all three**

```bash
node tests/content/review-content.js content/fairhaven_stage1_enriched_choices.js
node tests/content/review-content.js content/cosmoria_stage1_enriched_choices.js
node tests/content/review-content.js content/whitebridge_commune_stage1_enriched_choices.js
npm run test:content
npm run test:continuity
```

Expected: 0 FAIL across all.

- [ ] **Step 5: Commit**

```bash
git add content/fairhaven_stage1_enriched_choices.js content/cosmoria_stage1_enriched_choices.js content/whitebridge_commune_stage1_enriched_choices.js
git commit -m "feat: suppression threading — Fairhaven + Cosmoria + Whitebridge (sealed, hold stamp, deflection)"
```

---

## Task 5: Verify Canon Compliance

Confirm the Rule 1 canon fence still passes — no "Ledger of Ash" in Stage 1 content.

- [ ] **Step 1: Run continuity validator**

```bash
npm run test:continuity
```

Expected: 0 FAIL. If Rule 1 fires on any Stage 1 file, fix immediately — remove or rephrase the offending text. "Ledger of Ash" must not appear in any Stage 1 or Stage 2 player-facing string.

- [ ] **Step 2: Manual check on modified files**

```bash
grep -i 'ledger of ash' content/shelkopolis_stage1_enriched_choices.js content/soreheim_proper_stage1_enriched_choices.js content/guildheart_hub_stage1_enriched_choices.js content/fairhaven_stage1_enriched_choices.js content/cosmoria_stage1_enriched_choices.js content/whitebridge_commune_stage1_enriched_choices.js
```

Expected: no output (no matches).

- [ ] **Step 3: Final commit if any fixes were needed**

```bash
git add content/
git commit -m "fix: canon fence compliance — remove premature Ledger of Ash references if any"
```
