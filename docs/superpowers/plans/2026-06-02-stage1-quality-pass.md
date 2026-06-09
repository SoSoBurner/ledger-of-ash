# Stage 1 Content Quality Pass — Plan (Track A)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring Stage 1 content up to full quality: (1) `plot:'main'` coverage on all 12 locality files, (2) `questId` wiring on advancement choices, (3) sideplot opening hook choices for all 4 sideplots, (4) 4-family archetype deep pass on Set 2 (ithtananalor/panim/shirshal/aurora/glasswake/cosmoria), (5) redundancy fix via retheme+progress-gate hybrid on all files, (6) named NPC conditional result variants.

**Architecture:** All changes are additive to existing `content/*_stage1_enriched_choices.js` files. No choices are removed. Retheme (changing result text) is allowed when net text volume stays equal or grows. `questId` fields are added only to `plot:'main'` choices and sideplot-opening choices. Sideplot opening hooks are new choices added to the relevant locality file with `plot:'side'` and a sideplot-start flag. Archetype variants use the existing `archetypeGroup` field pattern. Named NPC variants use `condition: function(){ return G.flags && G.flags['met_npcname']; }` gates.

**Tech Stack:** Vanilla ES5 JS, content files in `content/`, `node tests/content/validate-content.js`, `node tests/content/validate-structure.js`, `node tests/content/validate-flags.js`.

**Content rules (must not violate):**
- Choice labels ≤ 15 words, inner-voice phrasing ("The innkeeper knows..." not "Talk to the innkeeper")
- No forbidden words: investigation, official (as adjective), contact (as person reference), wardens (when referring to Road Wardens NPC org)
- `plot:'main'` choices must advance `G.investigationProgress` or set a stage-advance flag
- `plot:'side'` sideplot hooks must set exactly one `G.flags.sideplot_*_started` flag
- All archetype variants must reference the archetype's mechanical identity (combat=force/threat reads, magic=arcane/energy reads, stealth=shadows/systems reads, support=social/network reads)

---

## Files

| File | Change |
|------|--------|
| `content/ithtananalor_stage1_enriched_choices.js` | plot:'main' audit, questId, archetype deep pass, redundancy fix, NPC variants |
| `content/panim_stage1_enriched_choices.js` | Same |
| `content/shirshal_stage1_enriched_choices.js` | Same |
| `content/aurora_stage1_enriched_choices.js` | Same |
| `content/glasswake_stage1_enriched_choices.js` | Same |
| `content/cosmoria_stage1_enriched_choices.js` | Same + sideplot opening hook for cosmoria_harbor_weight_fraud |
| `content/shelkopolis_stage1_enriched_choices.js` | questId on plot:'main' choices, archetype fill-gaps, redundancy fix, NPC variants |
| `content/fairhaven_stage1_enriched_choices.js` | Same + sideplot hook for fairhaven_meadow_mill_displacement |
| `content/guildheart_stage1_enriched_choices.js` | Same + sideplot hook for guildheart_union_testimony_gap |
| `content/shelk_fairhaven_ledger_shadow_sideplot.js` (sideplot opening) | New sideplot hook choice targeting either shelkopolis or fairhaven file |

---

### Task 1: Add questId fields to all existing plot:'main' choices in Set 1 files

**Files:**
- Modify: shelkopolis, fairhaven, guildheart, soreheim, sunspire, mimolot enriched choice files

- [ ] **Step 1: Confirm current plot:'main' choices in Set 1**

```bash
grep -n "plot.*main\|'main'" content/shelkopolis_stage1_enriched_choices.js content/fairhaven_stage1_enriched_choices.js content/guildheart_stage1_enriched_choices.js | head -20
```

Each file should have 3 plot:'main' choices. Note their `id` or `label` fields.

- [ ] **Step 2: Add questId to Shelkopolis plot:'main' choices**

For each of the 3 plot:'main' choices in `content/shelkopolis_stage1_enriched_choices.js`, add a `questId` field:

```js
// Choice 1 (investigationProgress += 1, early)
questId: 'q_s1_pattern',

// Choice 2 (investigationProgress += 1, mid)
questId: 'q_s1_converging',

// Choice 3 (investigationProgress += 1, late / near boss gate)
questId: 'q_s1_close',
```

The `questId` values must match the existing quest ids in `ledger-of-ash.html` (lines 13240–13248): `q_s1_pattern`, `q_s1_converging`, `q_s1_close`.

- [ ] **Step 3: Repeat for fairhaven, guildheart, soreheim, sunspire, mimolot**

Apply the same 3-questId pattern to the 3 plot:'main' choices in each of the remaining 5 Set 1 files. Assignment is:
- First/lowest-progress main choice → `questId: 'q_s1_pattern'`
- Middle main choice → `questId: 'q_s1_converging'`
- Final/highest-progress main choice → `questId: 'q_s1_close'`

- [ ] **Step 4: Run validators**

```bash
node tests/content/validate-flags.js && node tests/content/validate-structure.js
```

Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add content/shelkopolis_stage1_enriched_choices.js content/fairhaven_stage1_enriched_choices.js content/guildheart_stage1_enriched_choices.js content/soreheim_stage1_enriched_choices.js content/sunspire_stage1_enriched_choices.js content/mimolot_stage1_enriched_choices.js
git commit -m "feat(content): add questId wiring to plot:main choices in Stage 1 Set 1 files"
```

---

### Task 2: Audit and add plot:'main' to Set 2 files + questId

**Files:**
- Modify: ithtananalor, panim, shirshal, aurora, glasswake, cosmoria enriched choice files

- [ ] **Step 1: Audit each Set 2 file for plot:'main' presence**

```bash
grep -n "plot.*main\|'main'" \
  content/ithtananalor_stage1_enriched_choices.js \
  content/panim_stage1_enriched_choices.js \
  content/shirshal_stage1_enriched_choices.js \
  content/aurora_stage1_enriched_choices.js \
  content/glasswake_stage1_enriched_choices.js \
  content/cosmoria_stage1_enriched_choices.js
```

For any file with 0 matches: add 3 plot:'main' choices (see Step 2). For any file with fewer than 3: add the missing ones.

- [ ] **Step 2: For each Set 2 file missing plot:'main' choices, add exactly 3**

Each new plot:'main' choice must:
- Advance `G.investigationProgress` by 1 in the `fn` body
- Match the locality's institutional wrongness theme (use the file's existing flavor)
- Have a `label` of ≤15 words in inner-voice phrasing
- Have `questId` matching the tier (pattern/converging/close as in Task 1)
- Have `failResult` with `text` and a consequence that doesn't dead-end

**Template for a new plot:'main' choice:**

```js
{
  id: 'LOCALITYID_main_1',
  label: 'The [SPECIFIC_ELEMENT] confirms the pattern is not local.',
  skill: 'wits',
  tags: ['Investigation', 'Discovery'],
  plot: 'main',
  questId: 'q_s1_pattern',
  fn: function() {
    G.investigationProgress = (G.investigationProgress || 0) + 1;
    addNarration('', '[DISCOVERY_TEXT: 2-3 sentences establishing the institutional wrongness specific to this locality. Never name Gleam or Ironveil.]');
    addJournal('[JOURNAL_ENTRY: 1 sentence evidence summary]', 'evidence');
    if (typeof checkStageAdvance === 'function') checkStageAdvance();
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof saveGame === 'function') saveGame();
  },
  failResult: {
    text: '[FAIL_TEXT: 1-2 sentences — the approach fails but reveals a partial clue, not a dead end]'
  }
},
```

**Locality-specific discovery angles (choose one per choice, keep distinct within file):**
- `ithtananalor`: Roaz border permits, supply routing anomalies, institutional access control
- `panim`: Harbor shipping records, coastal supply chain disruption, dockhands' displacement
- `shirshal`: House Shirsh frontier contract irregularities, guard rotation changes
- `aurora`: Commune allocation records, ceremonial observance changes, elder memory vs. official record
- `glasswake`: Harvest Circle crop accounting discrepancies, allocation formula changes
- `cosmoria`: Harbor weight records, Cosmouth shipping manifests, dock inspection irregularities

- [ ] **Step 3: Run validators**

```bash
node tests/content/validate-content.js && node tests/content/validate-flags.js
```

Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add content/ithtananalor_stage1_enriched_choices.js content/panim_stage1_enriched_choices.js content/shirshal_stage1_enriched_choices.js content/aurora_stage1_enriched_choices.js content/glasswake_stage1_enriched_choices.js content/cosmoria_stage1_enriched_choices.js
git commit -m "feat(content): add plot:main choices with questId to Stage 1 Set 2 files"
```

---

### Task 3: Add sideplot opening hook choices

**Files:**
- Modify: `content/cosmoria_stage1_enriched_choices.js` — add cosmoria harbor fraud hook
- Modify: `content/fairhaven_stage1_enriched_choices.js` — add meadow mill displacement hook
- Modify: `content/guildheart_stage1_enriched_choices.js` — add union testimony gap hook
- Modify: `content/shelkopolis_stage1_enriched_choices.js` — add shelk-fairhaven ledger shadow hook

- [ ] **Step 1: Understand sideplot module opening pattern**

```bash
head -30 content/sideplots/cosmoria_harbor_weight_fraud.js
```

Note: sideplot opening hook function name and the `G.flags` key it sets on open.

- [ ] **Step 2: Add Cosmoria harbor fraud opening hook to cosmoria file**

```js
{
  id: 'cosmoria_sideplot_harbor_open',
  label: 'The weight discrepancy in the harbor ledger is systematic, not clerical.',
  skill: 'wits',
  tags: ['Investigation', 'Records'],
  plot: 'side',
  condition: function() {
    return !G.flags.sideplot_harbor_fraud_started;
  },
  fn: function() {
    G.flags.sideplot_harbor_fraud_started = true;
    addNarration('', 'The harbor weight records show a consistent 8% shortfall across three different inspection clerks over fourteen months. The shortfall is too regular to be error — and too distributed to be a single bad actor.');
    addJournal('Harbor weight records: systematic 8% shortfall across multiple inspectors. Pattern suggests external instruction.', 'evidence');
    if (window.COSMORIA_HARBOR_WEIGHT_FRAUD && typeof window.COSMORIA_HARBOR_WEIGHT_FRAUD.open === 'function') {
      window.COSMORIA_HARBOR_WEIGHT_FRAUD.open();
    }
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof saveGame === 'function') saveGame();
  },
  failResult: {
    text: 'The records room is locked during the inspection cycle. Come back when the clerks are between rotations.'
  }
},
```

- [ ] **Step 3: Add Fairhaven meadow mill opening hook**

```js
{
  id: 'fairhaven_sideplot_mill_open',
  label: 'The mill displacement records show dates, not reasons.',
  skill: 'wits',
  tags: ['Records', 'Discovery'],
  plot: 'side',
  condition: function() {
    return !G.flags.sideplot_mill_displacement_started;
  },
  fn: function() {
    G.flags.sideplot_mill_displacement_started = true;
    addNarration('', 'Three families who worked the Fairhaven meadow mills have been reassigned to the harbor district in the last six weeks. The reassignment orders are stamped but unsigned — which means someone authorized them without wanting their name on record.');
    addJournal('Meadow mill: three families displaced in six weeks. Reassignment orders unsigned — authorization without accountability.', 'evidence');
    if (window.FAIRHAVEN_MEADOW_MILL_DISPLACEMENT && typeof window.FAIRHAVEN_MEADOW_MILL_DISPLACEMENT.open === 'function') {
      window.FAIRHAVEN_MEADOW_MILL_DISPLACEMENT.open();
    }
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof saveGame === 'function') saveGame();
  },
  failResult: {
    text: 'The mill foreman is not in today. The displacement records are kept in a separate register not available during shift hours.'
  }
},
```

- [ ] **Step 4: Add Guildheart union testimony gap hook**

```js
{
  id: 'guildheart_sideplot_union_open',
  label: 'The union testimony record has a two-week gap that nobody has explained.',
  skill: 'wits',
  tags: ['Records', 'Investigation'],
  plot: 'side',
  condition: function() {
    return !G.flags.sideplot_union_testimony_started;
  },
  fn: function() {
    G.flags.sideplot_union_testimony_started = true;
    addNarration('', 'The union arbitration records show continuous testimony logs for the past three years — except for a fourteen-day gap in the ninth month of last year. No notation explains the gap. The senior archivist says the gap was "administrative." He says it twice.');
    addJournal('Union testimony: fourteen-day gap in arbitration record. Senior archivist explanation insufficient — two repetitions, no detail.', 'evidence');
    if (window.GUILDHEART_UNION_TESTIMONY_GAP && typeof window.GUILDHEART_UNION_TESTIMONY_GAP.open === 'function') {
      window.GUILDHEART_UNION_TESTIMONY_GAP.open();
    }
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof saveGame === 'function') saveGame();
  },
  failResult: {
    text: 'The senior archivist is in session. The testimony logs are not accessible without his authorization.'
  }
},
```

- [ ] **Step 5: Add Shelk-Fairhaven ledger shadow hook to shelkopolis file**

```js
{
  id: 'shelk_sideplot_ledger_shadow_open',
  label: 'The routing numbers in this ledger have no matching shipment record.',
  skill: 'wits',
  tags: ['Records', 'Discovery'],
  plot: 'side',
  condition: function() {
    return !G.flags.sideplot_ledger_shadow_started;
  },
  fn: function() {
    G.flags.sideplot_ledger_shadow_started = true;
    addNarration('', 'The Shelkopolis transit ledger lists routing numbers that correspond to no shipment in the official manifest. The numbers exist. The shipments do not. Someone assigned phantom routing codes to real institutional capacity.');
    addJournal('Transit ledger: routing numbers without corresponding shipments. Phantom assignments using real institutional routing infrastructure.', 'evidence');
    if (window.SHELK_FAIRHAVEN_LEDGER_SHADOW && typeof window.SHELK_FAIRHAVEN_LEDGER_SHADOW.open === 'function') {
      window.SHELK_FAIRHAVEN_LEDGER_SHADOW.open();
    }
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof saveGame === 'function') saveGame();
  },
  failResult: {
    text: 'The transit ledger is in use by the current duty clerk. Come back after the end-of-day rotation.'
  }
},
```

- [ ] **Step 6: Verify sideplot module export names match**

```bash
grep -n "window\.\|module\.exports\|COSMORIA_HARBOR\|FAIRHAVEN_MEADOW\|GUILDHEART_UNION\|SHELK_FAIRHAVEN_LEDGER" \
  content/sideplots/cosmoria_harbor_weight_fraud.js \
  content/sideplots/fairhaven_meadow_mill_displacement.js \
  content/sideplots/guildheart_union_testimony_gap.js \
  content/sideplots/shelk_fairhaven_ledger_shadow.js | head -10
```

If the module names differ from the `window.*` references in the hook choices, update the hook choices to match.

- [ ] **Step 7: Run validators**

```bash
node tests/content/validate-content.js && node tests/content/validate-flags.js
```

Expected: exit 0.

- [ ] **Step 8: Commit**

```bash
git add content/cosmoria_stage1_enriched_choices.js content/fairhaven_stage1_enriched_choices.js content/guildheart_stage1_enriched_choices.js content/shelkopolis_stage1_enriched_choices.js
git commit -m "feat(content): add sideplot opening hook choices for all 4 Stage 1 sideplots"
```

---

### Task 4: 4-family archetype deep pass — Set 2 files (ithtananalor, panim, shirshal, aurora, glasswake, cosmoria)

**Files:**
- Modify: all 6 Set 2 content files

**Target:** Each file gets at minimum 8 archetype-gated choices (4 families × 2 choices each, or 2 families × 4 choices — distribute based on what the locality's theme makes natural). Existing archetype gates may be deepened but not removed.

**4-family variant pattern (add `archetypeGroup` + distinctive result):**

```js
// Combat family variant — reads through force, threat assessment, physical coercion patterns
{
  id: 'LOCALITYID_arch_combat_1',
  label: 'The enforcement posture here is reactive, not proactive. Someone told them to wait.',
  skill: 'might',
  archetypeGroup: 'combat',
  tags: ['Observation', 'Combat'],
  fn: function() {
    addNarration('', '[Combat-specific read: physical threat assessment, guard positioning, defensive formation tells. 2-3 sentences specific to this locality.]');
    G.investigationProgress = (G.investigationProgress || 0) + 1;
    addJournal('[Combat-angle evidence entry]', 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
  },
  failResult: { text: '[Combat fail: confrontation deflected, or wrong read on guard posture]' }
},
// Magic family variant — reads through arcane residue, ward patterns, ritual interference
{
  id: 'LOCALITYID_arch_magic_1',
  label: 'The ward pattern here has been rewritten. The original alignment is still legible.',
  skill: 'spirit',
  archetypeGroup: 'magic',
  tags: ['Arcane', 'Discovery'],
  fn: function() {
    addNarration('', '[Magic-specific read: arcane residue, ward structures, ritual displacement. 2-3 sentences specific to this locality.]');
    G.investigationProgress = (G.investigationProgress || 0) + 1;
    addJournal('[Magic-angle evidence entry]', 'evidence');
    if (typeof updateHUD === 'function') updateHUD();
  },
  failResult: { text: '[Magic fail: ward interference scrambles the reading]' }
},
// Stealth family variant — reads through surveillance gaps, network mapping, movement pattern analysis
{
  id: 'LOCALITYID_arch_stealth_1',
  label: 'The gap in the watch pattern is too consistent to be a scheduling accident.',
  skill: 'finesse',
  archetypeGroup: 'stealth',
  tags: ['Stealth', 'Surveillance'],
  fn: function() {
    addNarration('', '[Stealth-specific read: coverage gaps, embedded monitors, information dead drops. 2-3 sentences specific to this locality.]');
    G.investigationProgress = (G.investigationProgress || 0) + 1;
    addJournal('[Stealth-angle evidence entry]', 'intelligence');
    if (typeof updateHUD === 'function') updateHUD();
  },
  failResult: { text: '[Stealth fail: the gap closes before you can map it fully]' }
},
// Support family variant — reads through social network analysis, relationship strain, trust failures
{
  id: 'LOCALITYID_arch_support_1',
  label: 'The people here are careful about what they say in front of each other.',
  skill: 'charm',
  archetypeGroup: 'support',
  tags: ['Social', 'Network'],
  fn: function() {
    addNarration('', '[Support-specific read: social coercion, network fragmentation, trust erosion. 2-3 sentences specific to this locality.]');
    G.investigationProgress = (G.investigationProgress || 0) + 1;
    addJournal('[Support-angle evidence entry]', 'contact_made');
    if (typeof updateHUD === 'function') updateHUD();
  },
  failResult: { text: '[Support fail: the community closes around the topic before you can build rapport]' }
},
```

**Per-file locality angles for archetype variants:**

| Locality | Combat angle | Magic angle | Stealth angle | Support angle |
|----------|-------------|-------------|---------------|---------------|
| `ithtananalor` | Border guard overextension | Arcane transit ward rewrites | Courier dead-drop patterns | Roaz merchant network strain |
| `panim` | Harbor watch coverage gaps | Tidal ward interference | Dock movement tracking | Fisher community displacement stress |
| `shirshal` | Frontier patrol formation tells | House Shirsh binding ward changes | Border crossing timing gaps | Shirsh household relationship fractures |
| `aurora` | Commune defense posture | Ceremonial observance energy shift | Observer blind spots at communal events | Elder trust vs. new appointment strain |
| `glasswake` | Harvest Circle harvest guard deployment | Soil ward disruption | Crop allocation route changes | Harvester family allocation stress |
| `cosmoria` | Cosmouth harbor enforcement spacing | Port arcane inspection anomalies | Cargo inspection scheduling gaps | Dockhands' communication fractures |

- [ ] **Step 1: Apply archetype variants to ithtananalor**

Add 8 archetype-gated choices (2 per family) using the template and locality angles above. Fill in the `[LOCALITY-SPECIFIC]` text with ithtananalor-specific institutional flavor.

- [ ] **Step 2: Apply to panim, shirshal, aurora, glasswake, cosmoria**

Repeat for each remaining Set 2 file. Each file: 8 new archetype-gated choices minimum.

- [ ] **Step 3: Validate all 6 files**

```bash
node tests/content/validate-content.js && node tests/content/validate-structure.js
```

Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add content/ithtananalor_stage1_enriched_choices.js content/panim_stage1_enriched_choices.js content/shirshal_stage1_enriched_choices.js content/aurora_stage1_enriched_choices.js content/glasswake_stage1_enriched_choices.js content/cosmoria_stage1_enriched_choices.js
git commit -m "feat(content): 4-family archetype deep pass on Stage 1 Set 2 files (8 new gated choices per locality)"
```

---

### Task 5: 4-family archetype gap-fill on Set 1 files

**Files:**
- Modify: shelkopolis, fairhaven, guildheart, soreheim, sunspire, mimolot enriched choice files

Set 1 already has 8-16 archetype choices per file. This task adds only what's missing — typically 1-2 families that have thin representation in a given file.

- [ ] **Step 1: Audit Set 1 archetype coverage**

```bash
grep -c "archetypeGroup.*combat\|archetypeGroup.*magic\|archetypeGroup.*stealth\|archetypeGroup.*support" \
  content/shelkopolis_stage1_enriched_choices.js \
  content/fairhaven_stage1_enriched_choices.js \
  content/guildheart_stage1_enriched_choices.js \
  content/soreheim_stage1_enriched_choices.js \
  content/sunspire_stage1_enriched_choices.js \
  content/mimolot_stage1_enriched_choices.js
```

For any family with fewer than 2 choices in a given file: add 2 choices using the template from Task 4.

- [ ] **Step 2: Fill gaps in each file**

Using the locality angles:
- `shelkopolis`: institutional surveillance → combat reads garrison, magic reads chapel ward rewrites, stealth reads courier schedule gaps, support reads innkeeper network strain
- `fairhaven`: pharmacological displacement → magic reads compound distribution, stealth reads harbor monitoring blind spots, support reads community coercion fractures
- `guildheart`: arbitration corruption → combat reads guild security deployment, stealth reads witness dead zones, support reads arbiter pressure on member merchants
- `soreheim`: quota weaponization → combat reads foreman enforcement posture, magic reads allocation ward interference, support reads worker mutual-aid network stress
- `sunspire`: syndicate control → combat reads syndicate guard rotation, magic reads kinship binding ritual changes, stealth reads route-monitoring gaps
- `mimolot`: knowledge suppression → combat reads archive security deployment, magic reads sealed section arcane locks, stealth reads surveillance in reading rooms

- [ ] **Step 3: Run validators**

```bash
node tests/content/validate-content.js
```

Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add content/shelkopolis_stage1_enriched_choices.js content/fairhaven_stage1_enriched_choices.js content/guildheart_stage1_enriched_choices.js content/soreheim_stage1_enriched_choices.js content/sunspire_stage1_enriched_choices.js content/mimolot_stage1_enriched_choices.js
git commit -m "feat(content): 4-family archetype gap-fill on Stage 1 Set 1 files"
```

---

### Task 6: Redundancy fix — retheme + progress-gate hybrid

**Files:**
- Modify: all 12 Stage 1 enriched choice files

**Rule:** For each locality's 2-4 redundant choices (same "NPC notices systematic change" structure): retheme each to be mechanically distinct (different skill check, different NPC, different consequence) AND gate them at different `investigationProgress` thresholds so only one is visible at a time.

**Identified redundant clusters by locality:**
- Shelkopolis: letter-frequency + blessing-record choices (same pattern) → retheme one as a combat/confrontation angle, gate at different progress tiers
- Fairhaven: 3 supply-disruption choices → make them `lore`, `charm`, `finesse` respectively, gate at progress 0/2/4
- Guildheart: charter-discrepancy + courier-routing + external-directive choices → give each a distinct NPC and skill, gate at 0/2/4
- Soreheim: equipment-delays + facility-degradation choices 2-4 → differentiate by NPC (foreman vs. worker vs. manager), gate at 0/2/4
- Sunspire: 3 convoy-observation choices → one lore (reading routes), one stealth (tracking movement), one charm (talking to drivers), gate at 0/2/4
- Mimolot: 3 research-suppression choices → one wits (reading reclassified texts), one spirit (detecting arcane restriction), one finesse (mapping sealed section access), gate at 0/2/4
- Set 2 files: identify and apply same pattern

**Implementation pattern for redundant choices:**

For a cluster of N redundant choices:
1. Choice 1 (existing, most basic): add `condition: function(){ return (G.investigationProgress||0) < 3; }`, keep or lightly retheme
2. Choice 2: retheme to different skill/NPC, add `condition: function(){ return (G.investigationProgress||0) >= 3 && (G.investigationProgress||0) < 6; }`
3. Choice 3 (if exists): retheme again to different skill/NPC/consequence, add `condition: function(){ return (G.investigationProgress||0) >= 6; }`

- [ ] **Step 1: Fix Shelkopolis redundant cluster**

Read `content/shelkopolis_stage1_enriched_choices.js`. Find the letter-frequency and blessing-record choices that repeat the same "NPC notices systematic change" structure. Retheme and add progress conditions as described.

- [ ] **Step 2: Fix Fairhaven, Guildheart, Soreheim, Sunspire, Mimolot**

Repeat for each Set 1 file.

- [ ] **Step 3: Identify and fix Set 2 redundant clusters**

```bash
grep -n "NPC notices\|systematic change\|pattern.*not.*local\|same.*question\|same.*direction" \
  content/ithtananalor_stage1_enriched_choices.js \
  content/panim_stage1_enriched_choices.js \
  content/shirshal_stage1_enriched_choices.js \
  content/aurora_stage1_enriched_choices.js \
  content/glasswake_stage1_enriched_choices.js \
  content/cosmoria_stage1_enriched_choices.js | head -30
```

Apply the same retheme + progress-gate pattern to any clusters found.

- [ ] **Step 4: Run validators**

```bash
node tests/content/validate-content.js && node tests/content/validate-structure.js
```

Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add content/*_stage1_enriched_choices.js
git commit -m "feat(content): redundancy fix — retheme + progress-gate hybrid on all Stage 1 locality files"
```

---

### Task 7: Named NPC conditional result variants

**Files:**
- Modify: shelkopolis, fairhaven, guildheart (Set 1 files with known V33_2 named NPCs)
- Modify: cosmoria, guildheart, ithtananalor (where V33_2 names specific individuals)

**Pattern:** For choices where a generic "the innkeeper" or "the harbormaster" is used, add an NPC-name-gated condition for the result text. The generic result remains as fallback.

```js
// In fn: body of choice
fn: function() {
  var _namedResult = G.flags && G.flags['met_marta']
    ? 'Marta keeps her answer short and sets a cup down in front of you. "The letters come twice a week. Wednesday and Saturday. Haven\'t missed one in four years until last month. Missed three." She does not ask why you are asking.'
    : 'The innkeeper answers briefly. The schedule changed last month. She noticed but offers no interpretation.';
  addNarration('', _namedResult);
  // ... rest of fn
},
```

**V33_2 named NPCs to integrate per locality (use V33_2 locality packets to confirm names):**
- Shelkopolis: Marta (innkeeper), named chapel contact, ward officer
- Fairhaven: Tessard (broker), harbor physician, shrine elder
- Guildheart: senior archivist, guild arbitrator (named), courier network handler
- Cosmoria: harbor inspector (named), dock supervisor

- [ ] **Step 1: Confirm NPC names from V33_2**

```bash
grep -r "Marta\|Tessard\|named_npc" data/reference/V33_2_extracted/V33_2_DnD_Repository/02_CANON_BASELINE/named_npcs/ | grep -i "shelk\|fairhaven\|guildheart\|cosmoria" | head -20
```

Use the confirmed names. If V33_2 doesn't name a specific NPC, author a name consistent with the locality's polity naming conventions.

- [ ] **Step 2: Add named NPC variants to 3-4 choices per locality**

Apply the `G.flags['met_NPCNAME']` conditional pattern to the 3-4 choices per locality that reference generic "the innkeeper"/"the broker"/"the arbitrator" language.

- [ ] **Step 3: Verify met_flags are set by NPC dialogue or NPC choice actions**

```bash
grep -n "met_marta\|met_tessard\|flags\['met_" ledger-of-ash.html content/*.js | head -10
```

If a `met_NPCNAME` flag is not set anywhere, add `G.flags['met_npcname'] = true;` to the relevant NPC conversation choice result (in the NPC contacts section or in an existing NPC encounter choice).

- [ ] **Step 4: Run validators**

```bash
node tests/content/validate-content.js
```

Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add content/shelkopolis_stage1_enriched_choices.js content/fairhaven_stage1_enriched_choices.js content/guildheart_stage1_enriched_choices.js content/cosmoria_stage1_enriched_choices.js
git commit -m "feat(content): named NPC conditional result variants for key Stage 1 localities"
```

---

### Task 8: Full validator pass + playtest verification

- [ ] **Step 1: Run all validators**

```bash
node tests/content/validate-content.js && node tests/content/validate-structure.js && node tests/content/validate-flags.js
```

Expected: exit 0 on all three.

- [ ] **Step 2: Run headless spec**

```bash
npx playwright test tests/e2e/playtest-headless.spec.js --reporter=list
```

Expected: all pass.

- [ ] **Step 3: Spot-check quest wiring**

Open `play.bat`. Start a game with a Set 2 starting locality. Progress to investigationProgress 3. Verify quest journal shows "The anomalies are part of a pattern." (the `q_s1_pattern` quest hint).

- [ ] **Step 4: Spot-check sideplot opening**

At Cosmoria locality, verify the harbor weight fraud sideplot opening hook choice is visible. Click it. Verify `G.flags.sideplot_harbor_fraud_started` becomes true (check via browser console: `G.flags.sideplot_harbor_fraud_started`).

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat(content): Stage 1 quality pass complete — questId, sideplots, 4-family archetypes, redundancy fix, NPC variants"
```
