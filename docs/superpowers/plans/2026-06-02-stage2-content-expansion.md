# Stage 2 Content Expansion — Plan (Track B)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deepen Stage 2 faction paths from 4 choices each (Collegium + Road Wardens) to 12 choices each, add 4-family archetype variants on both paths, add investigation dead-ends that require backtracking, and apply named NPC conditional result variants to V33_2 canon figures. Stage 2 content volume must EXCEED Stage 1 total when complete.

**Architecture:** All changes are to `content/stage2_enriched_choices.js`. The two faction paths (Collegium = institutional path, Road Wardens = underworld/resistance path) each get 8 new choices added, keeping the existing 4 as the base. Investigation dead-ends are choices with `failResult` consequences that set a `recovery_needed` flag and surface a recovery choice. Archetype variants use `archetypeGroup` exactly as in Stage 1. Named NPC variants gate on `G.flags['met_NPCNAME']`.

**Tech Stack:** Vanilla ES5 JS, `content/stage2_enriched_choices.js`, `node tests/content/validate-content.js`, `node tests/content/validate-structure.js`.

**Stage 2 canon context:**
- Stage 2 gated on `investigationProgress >= 8`
- Faction paths: Collegium (institutional — legal mechanisms, official record access) vs. Road Wardens (underworld — black market intel, resistance networks)
- Boss NPCs: Gleam (surveillance miniboss, reached after stageProgress[2] >= 8), Ironveil (ORE Marshal, main boss, reached at stageProgress[2] >= 15)
- Main conspiracy: Ironveil authorized suppression of axis exploitation operation records; Gleam enforces surveillance; Torveld Mast (Soreheim Transit Post) rubber-stamped the accounting
- Do NOT name the resolution of the conspiracy in Stage 2 choices — choices narrow toward it, the climax resolves it

---

## Files

| File | Change |
|------|--------|
| `content/stage2_enriched_choices.js` | Expand Collegium path 4→12 choices, Wardens path 4→12 choices, add archetype variants, add dead-ends |

---

### Task 1: Read and map current Stage 2 choice structure

**Files:**
- Read: `content/stage2_enriched_choices.js`

- [ ] **Step 1: Identify all existing choices**

```bash
grep -n "id:\|label:\|plot:\|questId:\|condition:" content/stage2_enriched_choices.js | head -60
```

Map out: existing Collegium choices (s2_collegium_1 through s2_collegium_4) and Wardens choices (s2_wardens_1 through s2_wardens_4). Note their conditions, labels, and what they advance.

- [ ] **Step 2: Note existing condition dependencies**

```bash
grep -n "stage2_collegium_contact\|stage2_wardens_contact\|stageProgress\[2\]" content/stage2_enriched_choices.js
```

The new choices must gate on the same flags as the existing ones (or deeper progression flags). Pattern: Collegium choices require `G.flags.stage2_collegium_contact`, Wardens choices require `G.flags.stage2_wardens_contact`.

---

### Task 2: Expand Collegium faction path to 12 choices

**Files:**
- Modify: `content/stage2_enriched_choices.js` — Collegium section

**Collegium path arc:** The Collegium represents institutional access to suppressed records. The path escalates from initial contact → verified testimony → internal evidence → confrontation setup. Each choice advances `G.stageProgress[2]` and/or sets faction-specific flags.

**8 new Collegium choices to add:**

Choice pattern structure:
```js
{
  id: 's2_collegium_N',
  label: '[INNER-VOICE LABEL ≤15 WORDS]',
  skill: '[wits|charm|finesse|spirit]',
  tags: ['[tag1]', '[tag2]'],
  plot: 'main',
  questId: 'q_s2_climax',    // or 'q_s2_boss' for mid-stage choices
  condition: function() {
    return G.flags.stage2_collegium_contact && (G.stageProgress[2] || 0) >= [THRESHOLD];
  },
  fn: function() {
    G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
    addNarration('', '[2-4 sentences advancing the institutional investigation. References Collegium records, suppressed documentation, named bureaucratic figures. Does not name Ironveil directly until threshold.]');
    addJournal('[Evidence summary 1 sentence]', 'evidence');
    if (G.stageProgress[2] >= [NEXT_MILESTONE]) {
      G.flags['[milestone_flag]'] = true;
    }
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof saveGame === 'function') saveGame();
  },
  failResult: {
    text: '[1-2 sentences: access denied, or partial record, or bureaucratic deflection — not a dead end, advances partial clue]'
  }
},
```

**8 new Collegium choices — content guide:**

| ID | Label concept | Skill | Progress gate | Advances |
|----|---------------|-------|---------------|---------|
| `s2_collegium_5` | Internal audit request filed — now someone knows it was filed | wits | sp2 >= 2 | sp2 += 1, sets `collegium_audit_flagged` |
| `s2_collegium_6` | The Collegium witness wants something in return before speaking | charm | sp2 >= 3 | sp2 += 1, sets `collegium_witness_met` |
| `s2_collegium_7` | The evidence trail goes through a sealed records partition | finesse | sp2 >= 4 | sp2 += 1, opens `collegium_sealed_accessed` |
| `s2_collegium_8` | A Collegium member broke with the faction over this suppression | charm | sp2 >= 5 | sp2 += 1, adds dissenter testimony |
| `s2_collegium_9` | The suppression authorization runs through a transit stamp, not a signatory | wits | sp2 >= 6 | sp2 += 1, hints at Torveld Mast role |
| `s2_collegium_10` | The third Collegium record confirms external coordination beyond this polity | wits | sp2 >= 7, `collegium_witness_met` | sp2 += 2, sets `collegium_evidence_complete` |
| `s2_collegium_11` | The Collegium faction can provide cover for the confrontation — for a price | charm | sp2 >= 8 | sp2 += 1, sets `collegium_cover_arranged` |
| `s2_collegium_12` | The final Collegium record names the enforcement mechanism, not the person | wits | sp2 >= 9 | sp2 += 2, sets `gleam_mechanism_identified` (boss prereq) |

- [ ] **Step 1: Author all 8 new Collegium choices**

Fill in each choice from the table above using the template. The narrative content must:
- Reference the Principality of Shelk institutional apparatus (not generic bureaucracy)
- Each choice's result must reveal a distinct piece of the suppression mechanism (no two choices reveal the same thing)
- Progress toward identifying Gleam as the surveillance enforcement mechanism without naming them until `gleam_mechanism_identified` fires

- [ ] **Step 2: Run validators**

```bash
node tests/content/validate-content.js && node tests/content/validate-structure.js
```

Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add content/stage2_enriched_choices.js
git commit -m "feat(content): expand Collegium faction path from 4 to 12 choices"
```

---

### Task 3: Expand Road Wardens faction path to 12 choices

**Files:**
- Modify: `content/stage2_enriched_choices.js` — Wardens section

**Wardens path arc:** The Road Wardens represent resistance/underworld access — black market records, coercion victims who talk, smuggled documentation. The path is riskier (higher DCs) but accesses information the Collegium can't reach.

**8 new Wardens choices — content guide:**

| ID | Label concept | Skill | Progress gate | Advances |
|----|---------------|-------|---------------|---------|
| `s2_wardens_5` | The runner the Wardens use knows three routes nobody maps | finesse | sp2 >= 2 | sp2 += 1, sets `wardens_route_known` |
| `s2_wardens_6` | A coerced cargo broker speaks if the Wardens vouch for the meeting | charm | sp2 >= 3 | sp2 += 1, sets `wardens_broker_testimony` |
| `s2_wardens_7` | The Wardens' safe house has records the official archive destroyed | wits | sp2 >= 4 | sp2 += 1, opens destroyed record evidence |
| `s2_wardens_8` | Someone who was displaced by the suppression operation is still in Shelk | charm | sp2 >= 5 | sp2 += 1, adds witness displacement testimony |
| `s2_wardens_9` | The Wardens know who runs the enforcement side. They use a codename. | finesse | sp2 >= 6 | sp2 += 1, introduces Gleam by codename only |
| `s2_wardens_10` | The black market transit records name the routing point, not the authority | wits | sp2 >= 7, `wardens_broker_testimony` | sp2 += 2, hints at transit stamp mechanism |
| `s2_wardens_11` | The Wardens can create a distraction for the confrontation | finesse | sp2 >= 8 | sp2 += 1, sets `wardens_distraction_arranged` |
| `s2_wardens_12` | The final Wardens source has documentation of the enforcement action itself | wits | sp2 >= 9 | sp2 += 2, sets `gleam_mechanism_identified` (boss prereq) |

- [ ] **Step 1: Author all 8 new Wardens choices**

Fill in each choice using the template from Task 2. Narrative content must:
- Reflect underworld/resistance texture (different from Collegium's institutional tone)
- Higher stakes, higher DCs (risky or bold tags where appropriate)
- The Wardens are morally complex — they want the suppression exposed but for their own reasons

- [ ] **Step 2: Run validators**

```bash
node tests/content/validate-content.js
```

Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add content/stage2_enriched_choices.js
git commit -m "feat(content): expand Road Wardens faction path from 4 to 12 choices"
```

---

### Task 4: Add 4-family archetype variants on both faction paths

**Files:**
- Modify: `content/stage2_enriched_choices.js`

**Target:** At minimum, add 4 archetype-gated choices per faction path (1 per family). These sit alongside the main path choices and give each archetype family a unique angle on the institutional suppression conspiracy.

**Pattern (using existing Stage 1 template from Stage 1 quality plan):**

```js
// Collegium path — combat family variant
{
  id: 's2_collegium_arch_combat',
  label: 'The Collegium security arrangement is designed to prevent witness protection, not ensure it.',
  skill: 'might',
  archetypeGroup: 'combat',
  tags: ['Combat', 'Observation'],
  plot: 'main',
  condition: function() { return G.flags.stage2_collegium_contact; },
  fn: function() {
    G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
    addNarration('', 'The Collegium bodyguard rotations are wrong — too heavy at the archive entrance, too light at the testimony room. That\'s not protection of witnesses. That\'s prevention of exit. Someone high up wants to know who\'s talking, not keep them safe.');
    addJournal('Collegium security: witness room underprotected vs. archive entrance. Surveillance pattern, not protection pattern.', 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
  },
  failResult: { text: 'The Collegium security won\'t let you close enough to read the rotation properly.' }
},
// Wardens path — magic family variant
{
  id: 's2_wardens_arch_magic',
  label: 'The ward pattern on the Wardens\' safe house documents has been scanned but not copied.',
  skill: 'spirit',
  archetypeGroup: 'magic',
  tags: ['Arcane', 'Records'],
  plot: 'main',
  condition: function() { return G.flags.stage2_wardens_contact; },
  fn: function() {
    G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
    addNarration('', 'Someone with institutional arcane access ran a ward scan on these documents after they arrived here. The scan pattern is standard Principality certification — the kind they use to verify record authenticity before suppressing it. The originals were scanned to confirm they were real, then the official copies were destroyed.');
    addJournal('Wardens safe house documents: ward scan shows Principality certification. Originals verified real before official copies destroyed.', 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
  },
  failResult: { text: 'The ward scan residue is too degraded to read cleanly from this distance.' }
},
```

- [ ] **Step 1: Add 4 archetype variants per faction path (8 total)**

One per family (combat/magic/stealth/support) for Collegium, one per family for Wardens. Use angles appropriate to the path's institutional vs. underworld tone.

- [ ] **Step 2: Run validators**

```bash
node tests/content/validate-content.js
```

Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add content/stage2_enriched_choices.js
git commit -m "feat(content): add 4-family archetype variants to both Stage 2 faction paths (8 total)"
```

---

### Task 5: Add investigation dead-ends requiring backtracking

**Files:**
- Modify: `content/stage2_enriched_choices.js`

**Goal:** 2-3 choices per faction path where failure is meaningful — not just "try again," but a consequence that sets a `recovery_needed` flag and requires the player to find the recovery angle before proceeding. This creates the feeling of a real investigation hitting walls.

**Pattern:**

```js
{
  id: 's2_collegium_deadend_1',
  label: 'Push the archivist directly for the suppressed records.',
  skill: 'charm',
  tags: ['Social', 'Bold'],
  plot: 'main',
  condition: function() {
    return G.flags.stage2_collegium_contact && !G.flags.collegium_archivist_burned;
  },
  fn: function() {
    // This is a BOLD choice — high DC, meaningful fail
    addNarration('', 'The archivist looks at you for a long moment. Then he closes the ledger and calls for a colleague. The archive closes for the day. You won\'t get another appointment through normal channels.');
    G.flags.collegium_archivist_burned = true;
    G.flags.recovery_thread_available = true;
    addJournal('Collegium archivist: direct approach failed. Archive closed. Need alternate access route.', 'complication');
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof saveGame === 'function') saveGame();
  },
  // No failResult — this choice ALWAYS produces the dead-end consequence (it IS the failure)
},
// Recovery angle — surfaces after dead-end
{
  id: 's2_collegium_deadend_1_recovery',
  label: 'The junior archive clerk works evenings. The main archivist does not know her.',
  skill: 'finesse',
  tags: ['Stealth', 'Opportunity'],
  plot: 'main',
  condition: function() {
    return G.flags.collegium_archivist_burned && !G.flags.collegium_archive_recovery_done;
  },
  fn: function() {
    G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
    G.flags.collegium_archive_recovery_done = true;
    addNarration('', 'The junior clerk doesn\'t know about your earlier visit. She shows you to the suppressed records section with the practiced indifference of someone who assumes all requests are legitimate.');
    addJournal('Collegium archive: junior clerk access. Suppressed records section reached via evening approach.', 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof saveGame === 'function') saveGame();
  },
  failResult: {
    text: 'The junior clerk is not there tonight. Try again tomorrow evening.'
  }
},
```

- [ ] **Step 1: Add 2 dead-end + recovery pairs for Collegium path**

Topics: direct archive push, direct witness confrontation.

- [ ] **Step 2: Add 2 dead-end + recovery pairs for Wardens path**

Topics: revealing your Collegium contact to a Wardens source (burns trust), pushing the coerced broker too hard (they go silent).

- [ ] **Step 3: Run validators**

```bash
node tests/content/validate-content.js && node tests/content/validate-flags.js
```

Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add content/stage2_enriched_choices.js
git commit -m "feat(content): add investigation dead-ends with recovery angles to both Stage 2 faction paths"
```

---

### Task 6: Named NPC conditional result variants for Stage 2

**Files:**
- Modify: `content/stage2_enriched_choices.js`

**V33_2 Stage 2 named NPCs to integrate:**
- Torveld Mast (Soreheim Transit Post stamp authority) — referenced once player reaches `q_s2_climax`
- Dravn Pell (institutional backing figure per `q_s2_boss`) — referenced in boss-approach choices
- Gleam (surveillance miniboss, referenced by codename until `gleam_mechanism_identified`)

**Pattern:** Add V33_2-named NPC result variants to 2-3 existing choices where generic phrasing currently stands:

```js
// In fn: body
var _namedText = G.flags && G.flags['gleam_mechanism_identified']
  ? 'The codename is Gleam. The enforcement mechanism is surveillance-based — they don\'t eliminate witnesses, they map them. Track their contacts, identify their networks, and wait for the exposure attempt. You are being mapped right now.'
  : 'The codename is known to the Wardens but they won\'t say it out loud here. Whatever the enforcement mechanism is, it works by watching, not acting.';
addNarration('', _namedText);
```

- [ ] **Step 1: Apply named NPC variants to 3 existing choices**

Target choices: the one that first references the enforcement mechanism (add Gleam codename variant), the transit stamp reference (add Torveld Mast name variant gated on `q_s2_climax`), and the institutional backing reference (add Dravn Pell name variant gated on `q_s2_boss`).

- [ ] **Step 2: Run validators**

```bash
node tests/content/validate-content.js
```

Expected: exit 0.

- [ ] **Step 3: Commit**

```bash
git add content/stage2_enriched_choices.js
git commit -m "feat(content): named NPC conditional variants (Gleam, Torveld Mast, Dravn Pell) in Stage 2 choices"
```

---

### Task 7: Validate Stage 2 volume exceeds Stage 1

- [ ] **Step 1: Count Stage 1 total choices**

```bash
grep -c "^\s*{" content/shelkopolis_stage1_enriched_choices.js content/fairhaven_stage1_enriched_choices.js content/guildheart_stage1_enriched_choices.js content/soreheim_stage1_enriched_choices.js content/sunspire_stage1_enriched_choices.js content/mimolot_stage1_enriched_choices.js content/ithtananalor_stage1_enriched_choices.js content/panim_stage1_enriched_choices.js content/shirshal_stage1_enriched_choices.js content/aurora_stage1_enriched_choices.js content/glasswake_stage1_enriched_choices.js content/cosmoria_stage1_enriched_choices.js 2>/dev/null | awk -F: '{sum += $2} END {print "Stage 1 total choice-like blocks:", sum}'
```

- [ ] **Step 2: Count Stage 2 total choices**

```bash
grep -c "^\s*{" content/stage2_enriched_choices.js 2>/dev/null
```

Stage 2 count must exceed Stage 1 count. If not, add additional flavor choices to the Stage 2 pool.

- [ ] **Step 3: Run full validators**

```bash
node tests/content/validate-content.js && node tests/content/validate-structure.js && node tests/content/validate-flags.js
```

Expected: exit 0 on all three.

- [ ] **Step 4: Run headless spec**

```bash
npx playwright test tests/e2e/playtest-headless.spec.js --reporter=list
```

Expected: all pass.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat(content): Stage 2 expansion complete — 12 choices per faction path, archetype variants, dead-ends, named NPCs. Stage 2 volume exceeds Stage 1."
```
