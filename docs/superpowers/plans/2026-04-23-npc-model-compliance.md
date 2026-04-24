# NPC Model Compliance Pass — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every named NPC appearing in Stage 1 and Stage 2 enriched choice files must have their canonical agenda, register, and physical tell present in at least one scene. Fix scenes where the tell is absent or every NPC line can be taken at face value (no subtext).

**Architecture:** Content audit + targeted edits to existing enriched choice files. No new files. Uses V33_2 NPC dossiers as the source of truth for agenda/register/tell. All edits must pass `npm run test:content`.

**Tech Stack:** Node (audit scripts), vanilla JS content files, V33_2 JSON dossiers at `data/reference/V33_2_extracted/V33_2_DnD_Repository/02_CANON_BASELINE/named_npcs/`

---

## NPC Model Requirements (per `docs/CONTENT_STANDARDS.md` B2 + B5)

Each named NPC appearing in dialogue needs:
1. **Agenda** — something they want independent of the player (from dossier or authored if canon-consistent)
2. **Register** — speech shaped by locality, class, and local magic law — must match dossier
3. **Tell** — one specific physical or behavioral habit that no other NPC shares. Must be concrete (not "she crosses her arms"). **Must appear at least once per scene.**
4. **Subtext** — at least one unsaid layer per scene. If every NPC line can be taken at face value, the scene fails.

---

## File Map

| File | Purpose |
|------|---------|
| `data/reference/V33_2_extracted/V33_2_DnD_Repository/02_CANON_BASELINE/named_npcs/` | Source of truth for all NPC dossiers |
| `tests/continuity/fixtures/known-npcs.json` | Extracted NPC name list for cross-reference |
| `content/*_stage1_enriched_choices.js` | Stage 1 files to audit |
| `content/*_stage2_enriched_choices.js` | Stage 2 files to audit |
| `content/stage2_boss.js` | Dravn Pell — needs tell fix (identified in audit) |
| `content/stage1_boss.js` | Sera Ironveil — needs pronoun consistency check |

---

## Task 1: Extract Named NPCs Appearing in Content Files

Build a list of which NPCs appear in which files so we know where to look.

**Files:**
- Read: all enriched choice files
- Read: `tests/continuity/fixtures/known-npcs.json`

- [ ] **Step 1: Run extraction script**

```bash
node -e "
const fs = require('fs');
const path = require('path');
const known = JSON.parse(fs.readFileSync('tests/continuity/fixtures/known-npcs.json','utf8'));
const names = known.map(n => n.canonical_name).filter(n => n && n.includes(' '));
const contentDir = 'content';
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('_enriched_choices.js'));
const results = {};
for (const file of files) {
  const src = fs.readFileSync(path.join(contentDir, file), 'utf8');
  const hits = names.filter(name => {
    const first = name.split(' ')[0];
    return src.includes(first) && src.includes(name.split(' ')[1] || first);
  });
  if (hits.length) results[file] = hits;
}
console.log(JSON.stringify(results, null, 2));
" 2>/dev/null | head -100
```

- [ ] **Step 2: Record the NPC-to-file mapping**

Note which NPCs appear in which files. Focus on NPCs who appear in 3+ scenes — these are the highest-priority compliance fixes.

- [ ] **Step 3: Commit nothing — research only**

---

## Task 2: Audit Priority NPCs — Dravn Pell and Sera Ironveil

These two are the Stage 1 and Stage 2 boss figures. Their scenes have the most player exposure.

**Files:**
- Read/Modify: `content/stage2_boss.js`
- Read/Modify: `content/stage1_boss.js`
- Reference: `data/reference/V33_2_extracted/V33_2_DnD_Repository/02_CANON_BASELINE/named_npcs/`

- [ ] **Step 1: Read Dravn Pell's dossier**

```bash
ls "data/reference/V33_2_extracted/V33_2_DnD_Repository/02_CANON_BASELINE/named_npcs/" | grep -i dravn
```

Read the JSON file. Note: canonical_name, physical_description, speech_register, agenda, any behavioral tells listed.

- [ ] **Step 2: Read `content/stage2_boss.js` and find Dravn Pell scenes**

Search for `dravn` (case-insensitive) in `content/stage2_boss.js`. Identify every `addNarration` call that includes Dravn Pell dialogue or physical description.

- [ ] **Step 3: Check for tell presence**

For each Dravn Pell scene, answer: does the physical tell appear? If the dossier specifies a tell, search for it. If absent, add it to the narration text. The tell must be specific and belong only to Dravn — not a generic gesture.

If no tell is specified in the dossier, author one that is consistent with his register and institutional role. Example standard: *"Pell straightens the stack of papers on the left side of his desk before speaking, then doesn't look at it again."* — the gesture implies he controls the meeting's tempo.

- [ ] **Step 4: Check for subtext**

For each Dravn Pell dialogue scene, ask: is there anything he wants that he doesn't say directly? If every line is transparent, add one layer. Do not add exposition. Add behavior — an action that suggests his agenda without stating it.

- [ ] **Step 5: Repeat for Sera Ironveil in `content/stage1_boss.js`**

Search for `sera` in `content/stage1_boss.js`. Find her dossier in the named_npcs directory. Check: does her tell appear in every scene she's in? Are there any lines where her agenda (whatever it is per dossier) shows through behavior rather than words?

Also check: the session summary noted a "Sera pronoun error" — search for references to Sera and confirm pronoun consistency (she/her) throughout the file.

- [ ] **Step 6: Validate**

```bash
node tests/content/review-content.js content/stage2_boss.js
node tests/content/review-content.js content/stage1_boss.js
npm run test:content
```

Expected: 0 FAIL.

- [ ] **Step 7: Commit**

```bash
git add content/stage2_boss.js content/stage1_boss.js
git commit -m "fix: NPC model compliance — Dravn Pell tell + Sera Ironveil pronoun/subtext"
```

---

## Task 3: Audit Stage 2 NPCs — Coralyn Tideglass and Other Recurring NPCs

Stage 2 enriched choice files introduce several NPCs who appear in multiple localities. These need consistent tells across files.

**Files:**
- Read/Modify: any `content/*_stage2_enriched_choices.js` file where the target NPC appears

- [ ] **Step 1: Find Coralyn Tideglass scenes**

```bash
grep -rn 'coralyn\|tideglass' content/ --include='*.js' -i | grep -v '.js:.*\/\/'
```

Note every file and line where she appears.

- [ ] **Step 2: Read her dossier**

```bash
ls "data/reference/V33_2_extracted/V33_2_DnD_Repository/02_CANON_BASELINE/named_npcs/" | grep -i coralyn
```

Read the JSON. Note her agenda, register, and tell.

- [ ] **Step 3: For each scene, confirm tell appears and subtext is present**

Her tell must appear at least once per scene she's in. Her agenda (what she wants, independent of the player) must be inferable from her behavior — not stated, but present.

Fix any scene where she reads as a purely helpful or purely obstructive NPC with no private motivation.

- [ ] **Step 4: Repeat for 2–3 additional Stage 2 recurring NPCs**

From the Task 1 mapping, pick the 2–3 NPCs who appear in the most files. Apply the same audit: find dossier, check tell per scene, check subtext per scene, fix gaps.

Priority: any NPC with `G.flags.met_<name> = true` set in the file (these are significant enough to flag — they should be well-authored).

- [ ] **Step 5: Validate all modified files**

```bash
npm run test:content
npm run test:continuity
```

- [ ] **Step 6: Commit**

```bash
git add content/
git commit -m "fix: NPC model compliance — Stage 2 recurring NPCs tell + subtext pass"
```

---

## Task 4: Stage 1 NPC Compliance Spot Check

Stage 1 has 22 localities and many named NPCs. Run a spot check on the 5 highest-traffic localities.

**Files:**
- Read/Modify: enriched choice files for Shelkopolis, Soreheim Proper, Guildheart Hub, Fairhaven, Whitebridge Commune

- [ ] **Step 1: For each of the 5 localities, list named NPCs in Stage 1 content**

```bash
grep -n 'met_\|G\.flags\.' content/shelkopolis_stage1_enriched_choices.js | grep 'met_' | head -10
grep -n 'met_\|G\.flags\.' content/soreheim_proper_stage1_enriched_choices.js | grep 'met_' | head -10
```

The `met_` flags identify NPCs significant enough to track.

- [ ] **Step 2: For each significant NPC, check tell and subtext**

Read the narration or dialogue scenes. For each NPC:
- Does a physical tell appear? (Something specific to them only.)
- Is there at least one line where they want something they don't say directly?

- [ ] **Step 3: Fix the gaps**

Edit the scenes. Keep the result text within 60–90 words after edits. If adding a tell pushes past 90 words, trim elsewhere in the same paragraph — don't cut the tell.

- [ ] **Step 4: Validate**

```bash
npm run test:content
```

- [ ] **Step 5: Commit**

```bash
git add content/
git commit -m "fix: NPC model compliance — Stage 1 spot check (5 localities)"
```
