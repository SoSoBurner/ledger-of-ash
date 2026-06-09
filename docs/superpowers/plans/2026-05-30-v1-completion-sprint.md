# V1.0 Completion Sprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close all verified outstanding gaps before V1.0 release — complete the G.skills rekey (highest priority), add skill diversity to Stage II content, activate heat and abilities, fix UI gaps, and do a content quality pass.

**Architecture:** All engine changes are in `ledger-of-ash.html`. Content changes are in `content/*_stage2_enriched_choices.js`. No new files needed except CLAUDE.md update to reflect confirmed skill naming.

**Tech Stack:** Vanilla ES5 JS (ledger-of-ash.html, content/*.js), Playwright E2E (tests/e2e/), Node.js validators (tests/content/)

---

## CONFIRMED DESIGN DECISIONS (2026-05-30)

| Decision | Answer |
|---|---|
| Skill rekey | **Complete it** — G.skills live keys are might/vigor/charm/wits/finesse/spirit |
| craft vs spirit | **craft is a 7th separate skill** — crafting DCs only, not in HUD, not levelable |
| Content skill keys | **New display names** — content uses charm/might/vigor/finesse/spirit/wits |

**Canonical skill table (post-rekey):**
| G.skills key | Display name | Used for |
|---|---|---|
| `might` | Might | Combat, physical force |
| `vigor` | Vigor | Survival, endurance |
| `wits` | Wits | Lore, knowledge, investigation |
| `charm` | Charm | Persuasion, social |
| `finesse` | Finesse | Stealth, precision |
| `spirit` | Spirit | Magic, willpower |
| `craft` | (internal) | Crafting DCs only — not in skill HUD |

---

## AUDIT RECONCILIATION — ALREADY FIXED THIS SESSION

- ✅ stageProgress wiring: ALL 12 Stage II localities confirmed wired
- ✅ Sunspire deadend: code analysis found zero deadends
- ✅ Stage II content: 840 choices across all localities
- ✅ UTF-8 BOM stripped from 13 content files
- ✅ Combat DC/crit tuning
- ✅ Label trimming pass (95 violations addressed)

---

## TRACK R — Complete the G.skills Rekey (HIGHEST PRIORITY)

**Problem:** _SK_NORM_INIT at line ~10200 converts archetype's new display-name keys back to old internal keys when initializing G.skills. rollD20's _KEY_NORM maps new→old for lookup. Result: G.skills stores values under old keys (combat/survival/etc.) while G defaults initialize new keys (might/vigor/etc.) at 0. HUD reads new keys → always shows 0. rollD20 reads old keys → correct values, but invisible to player.

**Root cause line:** `ledger-of-ash.html:10200` — `Object.keys(_rawArchSkills).forEach(function(k){ G.skills[_SK_NORM_INIT[k]||k] = _rawArchSkills[k]; });`

**Fix direction:** Remove _SK_NORM_INIT conversion (write new keys directly), reverse _KEY_NORM to old→new, add craft as separate key, update all old-key references.

---

### Task R1: Audit All Old-Key References Before Touching Anything

**Files:** `ledger-of-ash.html` (read-only grep step)

- [ ] **Step 1: Find all G.skills old-key direct accesses**

```bash
grep -n "G\.skills\['\(combat\|survival\|lore\|stealth\|persuasion\)\|G\.skills\.combat\|G\.skills\.survival\|G\.skills\.lore\|G\.skills\.stealth\|G\.skills\.persuasion" ledger-of-ash.html
```

Record every line number. These all need updating to new keys.

- [ ] **Step 2: Find all _KEY_NORM and _SK_NORM_INIT definitions**

```bash
grep -n "_KEY_NORM\|_SK_NORM_INIT" ledger-of-ash.html
```

There are multiple _KEY_NORM definitions (one per function). Record all line numbers — every one needs reversing.

- [ ] **Step 3: Find the level-up skills array**

```bash
grep -n "skills.*combat.*survival\|'combat','survival'\|\[.*combat.*stealth" ledger-of-ash.html
```

Expected: line ~9907: `const skills = ['combat','survival','persuasion','lore','stealth','craft'];`

- [ ] **Step 4: Find craft references in crafting system**

```bash
grep -n "rollD20.*craft\|G\.skills\.craft\|skill.*craft\|craft.*DC\|CRAFT_RECIPES" ledger-of-ash.html content/item_system.js 2>/dev/null | head -30
```

These should use `G.skills.craft` after the rekey — confirm they already do or note what needs updating.

---

### Task R2: Fix G Defaults — Add craft as 7th Skill

**Files:**
- Modify: `ledger-of-ash.html:9291` (G defaults skills object)

- [ ] **Step 1: Find current G defaults skills**

```bash
grep -n "skills:{might" ledger-of-ash.html
```

Expected line ~9291: `skills:{might:0,vigor:0,charm:0,wits:0,finesse:0,spirit:0},`

- [ ] **Step 2: Add craft to G defaults**

Change:
```javascript
skills:{might:0,vigor:0,charm:0,wits:0,finesse:0,spirit:0},
```
To:
```javascript
skills:{might:0,vigor:0,charm:0,wits:0,finesse:0,spirit:0,craft:0},
```

Also update the reset G object at line ~9757 (same pattern):
```javascript
skills:{might:0,vigor:0,charm:0,wits:0,finesse:0,spirit:0,craft:0},
```

- [ ] **Step 3: Verify no JS syntax error**

```bash
node --check ledger-of-ash.html
```

---

### Task R3: Fix _SK_NORM_INIT — Write New Keys Directly

**Files:**
- Modify: `ledger-of-ash.html:~10197-10205`

- [ ] **Step 1: Find _SK_NORM_INIT block**

```bash
grep -n "_SK_NORM_INIT" ledger-of-ash.html
```

- [ ] **Step 2: Remove the old-key conversion**

Current (line ~10197-10200):
```javascript
var _SK_NORM_INIT = {might:'combat',finesse:'stealth',vigor:'survival',wits:'lore',charm:'persuasion',spirit:'craft'};
// ...
Object.keys(_rawArchSkills).forEach(function(k){ G.skills[_SK_NORM_INIT[k]||k] = _rawArchSkills[k]; });
```

Change to (write new keys directly, no conversion):
```javascript
Object.keys(_rawArchSkills).forEach(function(k){ G.skills[k] = _rawArchSkills[k]; });
```

And remove the `var _SK_NORM_INIT = {...}` line entirely.

- [ ] **Step 3: Verify syntax**

```bash
node --check ledger-of-ash.html
```

---

### Task R4: Reverse All _KEY_NORM Maps in rollD20 and Helpers

**Files:**
- Modify: `ledger-of-ash.html` (multiple locations — found in Task R1 Step 2)

Every `_KEY_NORM` definition in the file currently maps new→old. Reverse each one to old→new. The craft key is NOT in this map (craft stays as-is, separate from spirit).

- [ ] **Step 1: Replace every _KEY_NORM definition**

Find all instances of:
```javascript
var _KEY_NORM = {might:'combat',finesse:'stealth',vigor:'survival',wits:'lore',charm:'persuasion',spirit:'craft'};
```

Replace with:
```javascript
var _KEY_NORM = {combat:'might',stealth:'finesse',survival:'vigor',lore:'wits',persuasion:'charm'};
```

Note: `spirit:'craft'` is REMOVED from the map. `spirit` stays as `spirit`. `craft` stays as `craft` (7th skill, no normalization).

Also find the `_KEY_NORM_GLOBAL` (line ~10936) and update it the same way:
```javascript
const _KEY_NORM_GLOBAL = {combat:'might',stealth:'finesse',survival:'vigor',lore:'wits',persuasion:'charm'};
```

And `_aeKeyNorm` (line ~10983):
```javascript
var _aeKeyNorm = {combat:'might',stealth:'finesse',survival:'vigor',lore:'wits',persuasion:'charm'};
```

And `_KEY_NORM_G` (line ~11005):
```javascript
var _KEY_NORM_G = {combat:'might',stealth:'finesse',survival:'vigor',lore:'wits',persuasion:'charm'};
```

And `_KEY_EFX` (line ~12489):
```javascript
var _KEY_EFX = {combat:'might',stealth:'finesse',survival:'vigor',lore:'wits',persuasion:'charm'};
```

- [ ] **Step 2: Verify syntax**

```bash
node --check ledger-of-ash.html
```

---

### Task R5: Update Old-Key Direct References in Engine

**Files:**
- Modify: `ledger-of-ash.html` (all lines found in Task R1 Step 1)

Replace every `G.skills.combat` → `G.skills.might`, `G.skills.survival` → `G.skills.vigor`, etc.

- [ ] **Step 1: Fix G.skills.lore references (lines 11406, 11425)**

Find:
```javascript
var _sk = (G.skills && G.skills.lore) || 0;
```
Replace with:
```javascript
var _sk = (G.skills && G.skills.wits) || 0;
```

- [ ] **Step 2: Fix level-up skills array (line ~9907)**

Find:
```javascript
const skills = ['combat','survival','persuasion','lore','stealth','craft'];
```
Replace with:
```javascript
const skills = ['might','vigor','charm','wits','finesse','spirit'];
```

Note: `craft` is intentionally NOT in this array — it's not a levelable stat.

- [ ] **Step 3: Fix stat display loop (line ~13203 area)**

Find any loop iterating over stat keys for display/training that uses old keys. Update to new keys.

```bash
grep -n "combat.*vigor\|stat\.key.*combat\|'combat'\|'survival'\|'persuasion'\|'lore'\|'stealth'" ledger-of-ash.html | grep -v "normalization\|_KEY_NORM\|_SK_NORM\|SKILL_DISPLAY\|comment\|//" | head -30
```

Fix each one found.

- [ ] **Step 4: Fix _SKILL_DISPLAY map (line ~15355)**

Current:
```javascript
var _SKILL_DISPLAY = {might:'Might',vigor:'Vigor',charm:'Charm',wits:'Wits',finesse:'Finesse',spirit:'Spirit',combat:'Might',stealth:'Finesse',survival:'Vigor',lore:'Wits',persuasion:'Charm',craft:'Spirit'};
```

Update to remove old-key duplicates and add craft as its own entry:
```javascript
var _SKILL_DISPLAY = {might:'Might',vigor:'Vigor',charm:'Charm',wits:'Wits',finesse:'Finesse',spirit:'Spirit',craft:'Craft'};
```

- [ ] **Step 5: Extend save migration to handle craft**

Find save migration at line ~16172:
```javascript
loaded.skills.might   = loaded.skills.combat    || 0; delete loaded.skills.combat;
loaded.skills.finesse = loaded.skills.stealth   || 0; delete loaded.skills.stealth;
// ...
```

Verify all 5 old→new conversions exist. Also add:
```javascript
if (!loaded.skills.craft) loaded.skills.craft = 0;
```

(craft starts at 0 for any save that predates this change)

- [ ] **Step 6: Full syntax check**

```bash
node --check ledger-of-ash.html
```

---

### Task R6: Update CLAUDE.md to Reflect New Canonical Skill Keys

**Files:**
- Modify: `CLAUDE.md` (Skill Keys section)

- [ ] **Step 1: Update the Skill Keys table**

Find:
```markdown
## Skill Keys

`G.skills` always uses internal keys — never display names:

| Internal key | Display name |
|---|---|
| `combat` | Might |
| `stealth` | Finesse |
| `survival` | Vigor |
| `lore` | Wits |
| `persuasion` | Charm |
| `craft` | Spirit |
```

Replace with:
```markdown
## Skill Keys

`G.skills` uses display-name keys. Content and engine both use these directly:

| G.skills key | Display name | Notes |
|---|---|---|
| `might` | Might | Physical force, combat |
| `vigor` | Vigor | Endurance, survival |
| `wits` | Wits | Knowledge, investigation |
| `charm` | Charm | Persuasion, social |
| `finesse` | Finesse | Stealth, precision |
| `spirit` | Spirit | Magic, willpower |
| `craft` | (internal) | Crafting DCs only — not in skill HUD, not levelable |

Old internal keys (combat/survival/lore/stealth/persuasion) are still accepted by rollD20 via _KEY_NORM normalization for backward-compatibility with old content files. New content must use new display-name keys.
```

Also update the normalization example:
```javascript
// OLD (no longer needed for new content):
var _KEY_NORM = {combat:'might',stealth:'finesse',survival:'vigor',lore:'wits',persuasion:'charm'};
var _sk = _KEY_NORM[skill] || skill;
```

- [ ] **Step 2: Commit CLAUDE.md**

```bash
git add CLAUDE.md
git commit -m "docs(claude.md): update canonical skill keys — might/vigor/charm/wits/finesse/spirit + craft as 7th"
```

---

### Task R7: Verify Rekey with Headless Spec

- [ ] **Step 1: Run validators**

```bash
node tests/content/validate-content.js 2>&1 | grep -E "^(P0|ERROR)" | head -20
node tests/content/validate-flags.js 2>&1 | grep -E "^(P0|ERROR)" | head -10
```

- [ ] **Step 2: Run headless spec**

```bash
npx playwright test tests/e2e/full-playthrough.spec.js --reporter=line 2>&1 | tail -20
```

Expected: 4/4 pass. Skill values should now be non-zero in playtest log.

- [ ] **Step 3: Check skill values in harness output**

```bash
grep -i "might\|vigor\|charm\|wits\|finesse\|spirit\|skills" test-results/full-playthrough-log-headless.md | head -20
```

Expected: skill values > 0 for the archetype's primary skills.

- [ ] **Step 4: Commit the rekey**

```bash
git add ledger-of-ash.html
git commit -m "feat(engine): complete G.skills rekey — might/vigor/charm/wits/finesse/spirit live keys; craft as 7th; reverse _KEY_NORM old→new"
```

---

## TRACK A — Skill Diversity & Archetype Impact (P0)

**Problem:** 81–85% of all locality choices use `vigor` (old: survival) regardless of archetype. Might, Finesse, Spirit, Charm appear in under 5% of choices combined.

**All content choices below use new display-name keys.**

---

### Task A1: Audit Current Skill Distribution Per Locality

- [ ] **Step 1: Count skill tags per Stage II file**

```bash
for f in content/*stage2*.js; do echo "==$f=="; grep -o "'skill': '[^']*'\|skill: '[^']*'" "$f" | sort | uniq -c | sort -rn; done 2>&1 | head -80
```

- [ ] **Step 2: Identify the most underrepresented skills**

Expected: `might` and `craft`/`spirit` near-zero everywhere. `charm` at 5-8%. `finesse` at 7%.

---

### Task A2: Add Skill-Diverse Choices to Aurora Stage II

**Files:**
- Modify: `content/aurora_crown_commune_stage2_enriched_choices.js`

- [ ] **Step 1: Add a spirit-skill choice (dome filtration arc)**

```javascript
{
  label: "The filtration manifold readings are off — a trained hand could recalibrate without alerting the duty log",
  tags: ['Stage2', 'Investigation'],
  skill: 'spirit',
  xpReward: 80,
  fn: function() {
    var result = rollD20('spirit', {dc: 13, locality: 'aurora_crown_commune', label: 'Recalibrate manifold'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      addJournal('The manifold calibration log shows three unauthorized resets — each timed to a scheduled inspection. Someone was erasing evidence of power diversion.', 'evidence');
      G.lastResult = 'You recalibrate the manifold and pull the maintenance history. Three deliberate resets, each timed to coincide with external inspections. This is sabotage with a schedule.';
    } else if (result.isFumble) {
      addHeat('shelk', 1);
      G.lastResult = 'The manifold alarm trips before you finish. A duty officer appears. You explain it as a routine check — they do not look convinced.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'You recalibrate it cleanly. The log shows three resets — deliberate, timed. Someone with maintenance access was covering their tracks.';
    } else {
      G.lastResult = 'The calibration panel locks you out after the second attempt. You retreat before anyone notices the failed access request.';
    }
  }
},
```

- [ ] **Step 2: Add a might-skill choice (confrontation arc)**

```javascript
{
  label: "A maintenance supervisor is physically blocking the corridor — direct negotiation from strength is the fastest path through",
  tags: ['Stage2', 'Confrontation'],
  skill: 'might',
  xpReward: 70,
  fn: function() {
    var result = rollD20('might', {dc: 13, locality: 'aurora_crown_commune', label: 'Corridor confrontation'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      G.flags.aurora_supervisor_cleared = true;
      G.lastResult = 'Your posture and tone cut through his rehearsed obstruction. He steps aside and gives you a name — the person who told him to hold this corridor on inspection days.';
    } else if (result.isFumble) {
      addHeat('shelk', 2);
      G.lastResult = 'The confrontation escalates. He calls for security. You withdraw — the incident will be logged.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'He yields the corridor without naming anyone. The way he looks over your shoulder tells you someone upstream told him to hold this post.';
    } else {
      G.lastResult = 'He holds his ground. You cannot press further without drawing attention. You find another route.';
    }
  }
},
```

- [ ] **Step 3: Add a finesse-skill choice (access arc)**

```javascript
{
  label: "The restricted equipment bay has a staff-only entrance — but the ventilation access is unwatched and wide enough",
  tags: ['Stage2', 'Infiltration'],
  skill: 'finesse',
  xpReward: 80,
  fn: function() {
    var result = rollD20('finesse', {dc: 14, locality: 'aurora_crown_commune', label: 'Ventilation access'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      addJournal('Equipment bay inventory shows three filtration cores listed as "decommissioned" but absent from the disposal log.', 'evidence');
      G.lastResult = 'Through the ventilation access you reach the equipment bay unseen. Three filtration cores are logged as decommissioned — but missing from the disposal register. Someone moved them.';
    } else if (result.isFumble) {
      addHeat('shelk', 1);
      G.lastResult = 'A guard on a non-standard patrol catches your movement in the vent. You drop and walk out with a cover story, but they have your face now.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'You make it through. The inventory discrepancy is real — decommissioned equipment with no disposal paperwork. A ghost supply chain.';
    } else {
      G.lastResult = 'The vent is louder than expected. You retreat before reaching the bay.';
    }
  }
},
```

- [ ] **Step 4: Validate and commit**

```bash
node tests/content/validate-content.js 2>&1 | grep P0 | head -10
git add content/aurora_crown_commune_stage2_enriched_choices.js
git commit -m "content(aurora): add spirit/might/finesse choices — skill diversity pass"
```

---

### Task A3: Add Skill-Diverse Choices to Guildheart Stage II

**Files:**
- Modify: `content/guildheart_hub_stage2_enriched_choices.js`

- [ ] **Step 1: Add a spirit-skill choice (document analysis arc)**

```javascript
{
  label: "The Collegium ledger signatures look identical across three different notary stamps — too consistent for authentic documents",
  tags: ['Stage2', 'Investigation'],
  skill: 'spirit',
  xpReward: 82,
  fn: function() {
    var result = rollD20('spirit', {dc: 13, locality: 'guildheart_hub', label: 'Document forgery analysis'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      addJournal('Three Collegium notary stamps share identical ink dispersion patterns — physically impossible if authentic. The ledgers were batch-stamped by one hand.', 'evidence');
      G.lastResult = 'Your analysis of the stamp impressions is conclusive: identical ink dispersion radius, same micro-fracture in the left serif. One forger made three notary identities.';
    } else if (result.isFumble) {
      G.lastResult = 'A librarian notices you holding documents up to the light. You replace them quickly but your access to this section is now monitored.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'The stamps are too consistent — real notaries have different pressure habits. These were made by one person mimicking multiple identities.';
    } else {
      G.lastResult = 'You spot anomalies but lack the materials to confirm forgery without lab access.';
    }
  }
},
```

- [ ] **Step 2: Add a might-skill choice (confrontation arc)**

```javascript
{
  label: "The Collegium archivist knows more than he is saying — pressing him directly from a position of authority might break the rehearsed deflection",
  tags: ['Stage2', 'Confrontation'],
  skill: 'might',
  xpReward: 75,
  fn: function() {
    var result = rollD20('might', {dc: 14, locality: 'guildheart_hub', label: 'Archivist confrontation'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      addJournal('Archivist Denn confirmed the ledger gap was flagged internally in the third cycle but suppressed by directive from the head registrar.', 'evidence');
      G.flags.guildheart_archivist_broken = true;
      G.lastResult = 'You hold his gaze until the deflection collapses. He tells you: the gap was internally flagged. The head registrar ordered it buried. He has the original complaint letter.';
    } else if (result.isFumble) {
      addHeat('shelk', 1);
      G.lastResult = 'He calls for a floor supervisor. You withdraw before the scene escalates, but your presence here will be noted.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'He gives you a date range — three weeks where ledger entries were systematically amended. Not missing. Replaced.';
    } else {
      G.lastResult = 'He holds firm. Whatever fear he has of you is less than whatever keeps him quiet.';
    }
  }
},
```

- [ ] **Step 3: Add a charm-skill choice (social arc)**

```javascript
{
  label: "The senior registrar is tired and overworked — a sympathetic ear and genuine interest in her burden might open the record you need",
  tags: ['Stage2', 'Social'],
  skill: 'charm',
  xpReward: 72,
  fn: function() {
    var result = rollD20('charm', {dc: 12, locality: 'guildheart_hub', label: 'Registrar rapport'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      addJournal('Senior registrar Avra Tessil confirmed: the backlog is manufactured. Requests are accepted and filed as "processing" indefinitely to prevent investigators from timing the suppression window.', 'evidence');
      G.lastResult = 'She appreciates the question — no one has. Over the next hour she explains exactly how the backlog works: intentional, calibrated delay. Not paperwork failure. Policy.';
    } else if (result.isFumble) {
      G.lastResult = 'Your approach reads as flattery and she withdraws. She has seen too many people try this. You have used this angle; it is closed now.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'She vents, which is useful. The backlog is not random — someone sets the priority queue and certain categories of requests never reach the top.';
    } else {
      G.lastResult = 'She is too guarded. Sympathy alone is not a sufficient currency here.';
    }
  }
},
```

- [ ] **Step 4: Validate and commit**

```bash
node tests/content/validate-content.js 2>&1 | grep P0 | head -10
git add content/guildheart_hub_stage2_enriched_choices.js
git commit -m "content(guildheart): add spirit/might/charm choices — skill diversity pass"
```

---

### Task A4: Add Skill-Diverse Choices to Three Remaining Localities

Apply the same pattern to glasswake, cosmoria, and shirshal. Each needs at minimum: one `spirit` choice and one `might` choice. Add a `charm` choice where the narrative supports social approaches.

**Files:**
- Modify: `content/glasswake_commune_stage2_enriched_choices.js`
- Modify: `content/cosmoria_stage2_enriched_choices.js`
- Modify: `content/shirshal_stage2_enriched_choices.js`

- [ ] **Step 1: Add spirit + might + charm choices to glasswake_commune_stage2**

Glasswake context: contamination research, water filtration, environmental monitoring.

```javascript
// spirit choice — sensor analysis
{
  label: "The contamination sensor array has calibration drift that a careful technician could use to reconstruct original readings",
  tags: ['Stage2', 'Investigation'],
  skill: 'spirit',
  xpReward: 80,
  fn: function() {
    var result = rollD20('spirit', {dc: 13, locality: 'glasswake_commune', label: 'Sensor calibration reconstruction'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      addJournal('Original sensor readings reconstructed from calibration drift: contamination levels were 4x reported values during the suppressed period.', 'evidence');
      G.lastResult = 'The drift pattern is a fingerprint. You reconstruct the original readings: contamination was four times what was reported. The sensors were adjusted, not miscalibrated.';
    } else if (result.isFumble) {
      G.lastResult = 'The reconstruction overwrites a calibration baseline. You reset the sensor to avoid leaving a trace of your access, losing the data.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'Rough reconstruction confirms suppression: actual contamination substantially higher than filed reports. Someone adjusted the output threshold.';
    } else {
      G.lastResult = 'Inconclusive without the original reference data you do not have access to.';
    }
  }
},
// might choice — authority bluff
{
  label: "A monitoring post guard is demanding documentation you do not have — physical presence and command tone may be enough",
  tags: ['Stage2', 'Confrontation'],
  skill: 'might',
  xpReward: 72,
  fn: function() {
    var result = rollD20('might', {dc: 13, locality: 'glasswake_commune', label: 'Monitoring post bluff'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      G.lastResult = 'Your bearing reads as authority he was not prepared to question. He waves you through and mentions — unprompted — that the last inspection team asked about the same access point.';
    } else if (result.isFumble) {
      addHeat('shelk', 1);
      G.lastResult = 'He calls it in. You exit the way you came before a supervisor arrives.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'He steps aside. The confidence read as authority. The post is accessible for now.';
    } else {
      G.lastResult = 'He is not convinced. You need documentation or another route.';
    }
  }
},
// charm choice — researcher rapport
{
  label: "The lead contamination researcher is publishing the official findings — her private doubts may surface in a genuine conversation",
  tags: ['Stage2', 'Social'],
  skill: 'charm',
  xpReward: 76,
  fn: function() {
    var result = rollD20('charm', {dc: 13, locality: 'glasswake_commune', label: 'Researcher rapport'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      addJournal('Lead researcher Dr. Yenith Carr confirmed her original data was altered before publication. The altered figures came back to her as the official record.', 'evidence');
      G.lastResult = 'She has been waiting for someone to ask the right question. Her original measurements never matched what she was told to publish. She still has the working copies — somewhere she cannot access from here.';
    } else if (result.isFumble) {
      G.lastResult = 'She shuts down the moment you push. She has been approached before. You will not get another chance with her through this route.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'She says enough: the numbers she published were not the numbers she measured. She cannot elaborate here. Someone might be watching.';
    } else {
      G.lastResult = 'She is cordial and says nothing of use. The professional distance holds.';
    }
  }
},
```

- [ ] **Step 2: Add spirit + might + charm choices to cosmoria_stage2**

Cosmoria context: maritime archive, shipping ledgers, trade record suppression.

```javascript
// spirit choice — wax seal analysis
{
  label: "The wax seals on three archive boxes show stress fractures consistent with re-sealing — the documents inside were accessed after official closure",
  tags: ['Stage2', 'Investigation'],
  skill: 'spirit',
  xpReward: 78,
  fn: function() {
    var result = rollD20('spirit', {dc: 13, locality: 'cosmoria', label: 'Wax seal analysis'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      addJournal('Wax fracture analysis on three archive boxes confirms post-closure access — documents were removed and replaced within the sealed chain of custody.', 'evidence');
      G.lastResult = 'The fracture patterns do not lie: these were opened after official sealing. Documents were removed, likely replaced with substitutes, and re-sealed with a close but imperfect match.';
    } else if (result.isFumble) {
      G.lastResult = 'The wax crumbles under your examination, breaking the seal visibly. You replace what you can — the evidence of tampering is now yours to explain.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'Re-sealing stress fractures confirmed. These boxes were opened after the official closure date. Someone had continuing access to sealed archives.';
    } else {
      G.lastResult = 'Fractures are present but could be environmental. You cannot rule out temperature-caused cracking without a comparison sample.';
    }
  }
},
// might choice — clerk confrontation
{
  label: "The archive clerk is stalling in a way that suggests he is waiting for someone — cutting through the hesitation directly may prevent an ambush",
  tags: ['Stage2', 'Confrontation'],
  skill: 'might',
  xpReward: 76,
  fn: function() {
    var result = rollD20('might', {dc: 14, locality: 'cosmoria', label: 'Clerk confrontation'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      G.flags.cosmoria_clerk_flipped = true;
      addJournal('Archive clerk confirmed a standing instruction: delay any investigator asking for Tier 3 shipping ledgers and log their name to a separate registry.', 'evidence');
      G.lastResult = 'You read the delay correctly. Under direct pressure he breaks: a standing instruction to delay investigators and record their identities to a private log. He gives you the contact who placed it.';
    } else if (result.isFumble) {
      addHeat('cosmouth', 1);
      G.lastResult = 'The person he was waiting for arrives before you resolve it. You exit without the information and with a face seen.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'He admits the instruction exists. He will not give the name but confirms: someone with authority placed a watch on investigative requests.';
    } else {
      G.lastResult = 'He holds his composure. The stall continues.';
    }
  }
},
// charm choice — harbor master rapport
{
  label: "The harbor master remembers every unusual shipment by feel — a shared drink and genuine curiosity might surface what records cannot",
  tags: ['Stage2', 'Social'],
  skill: 'charm',
  xpReward: 74,
  fn: function() {
    var result = rollD20('charm', {dc: 12, locality: 'cosmoria', label: 'Harbor master rapport'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      addJournal('Harbor master Drossik recalled three unscheduled night shipments six months before the audit. They were logged under a provisional transit code that no longer exists in the system.', 'evidence');
      G.lastResult = 'He remembers every ship that came at night and left before the morning count. Three such shipments six months before the audit. Logged under a transit code that has since been deleted from the master registry.';
    } else if (result.isFumble) {
      G.lastResult = 'You push the charm too hard and he reads it as an angle. He finishes his drink and excuses himself before you get anything useful.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'He does not give dates, but he gives you a name: the cargo broker who handled all three shipments. Someone you should ask about unusual night work.';
    } else {
      G.lastResult = 'Pleasant enough, but professionally tight. The harbor master has survived many conversations like this by saying nothing.';
    }
  }
},
```

- [ ] **Step 3: Add spirit + might + charm choices to shirshal_stage2**

Shirshal context: archive compliance, institutional documentation, bureaucratic suppression.

```javascript
// spirit choice — document dating analysis
{
  label: "The administrative seals on the compliance ledger pages show different font degradation rates — some pages are newer than their recorded dates",
  tags: ['Stage2', 'Investigation'],
  skill: 'spirit',
  xpReward: 80,
  fn: function() {
    var result = rollD20('spirit', {dc: 13, locality: 'shirshal', label: 'Document dating analysis'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      addJournal('Font degradation analysis: 14 pages in the compliance ledger are less than 8 months old but carry dates from three years prior. Retroactive document insertion.', 'evidence');
      G.lastResult = 'Font degradation does not lie about age. Fourteen pages in this ledger are physically less than eight months old — but stamped three years prior. The compliance record was fabricated in retrospect.';
    } else if (result.isFumble) {
      G.lastResult = 'You need better light for the analysis. When you ask for a lamp, the duty archivist notices what you are examining.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'At least half a dozen pages are newer than their listed dates. The degradation differential is clear. Someone inserted pages into a historical record.';
    } else {
      G.lastResult = 'Inconclusive without a comparison sample from the same paper batch.';
    }
  }
},
// might choice — records officer confrontation
{
  label: "The records officer has stopped pretending to search and is simply waiting for you to leave — confronting the stall directly ends the performance",
  tags: ['Stage2', 'Confrontation'],
  skill: 'might',
  xpReward: 72,
  fn: function() {
    var result = rollD20('might', {dc: 13, locality: 'shirshal', label: 'Records officer confrontation'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      addJournal('Records officer confirmed: a standing hold order on investigative requests for pre-consolidation era documents, placed by the current compliance head.', 'evidence');
      G.lastResult = 'You name the stall precisely: you are not searching, you are waiting. He drops the performance. The hold was placed by the compliance head six weeks after the consolidation. He gives you the order number.';
    } else if (result.isFumble) {
      addHeat('shirsh', 1);
      G.lastResult = 'He escalates to a supervisor. You exit before the confrontation formalizes — but the access log will show your presence.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'He admits he cannot produce the records. Not because they do not exist — because they have a hold status he cannot override at his level.';
    } else {
      G.lastResult = 'He maintains the performance. The order he follows comes from someone with more authority than you can currently threaten.';
    }
  }
},
// charm choice — compliance auditor rapport
{
  label: "The compliance auditor has been running the same review loop for three years — someone who acknowledges the absurdity might earn her trust",
  tags: ['Stage2', 'Social'],
  skill: 'charm',
  xpReward: 74,
  fn: function() {
    var result = rollD20('charm', {dc: 13, locality: 'shirshal', label: 'Auditor rapport'});
    if (result.isCrit) {
      G.stageProgress[2]++;
      addJournal('Senior compliance auditor Pren Vesath confirmed that flagged anomaly reports are filed, reviewed, and returned with "insufficient basis for action" regardless of contents. The review process is a mechanism for burying findings.', 'evidence');
      G.lastResult = 'She laughs at something that stopped being funny two years ago. The anomaly review process is not a dead end — it is the point. Every flag filed is a flag contained. She knows because she keeps filing them.';
    } else if (result.isFumble) {
      G.lastResult = 'She has heard the sympathetic approach before from people who were looking for something to use. She closes off entirely.';
    } else if (result.isSuccess) {
      G.stageProgress[2]++;
      G.lastResult = 'She will not give you names, but she gives you a number: the percentage of anomaly reports that have ever resulted in a formal escalation. It is zero.';
    } else {
      G.lastResult = 'She is professionally warm and says nothing actionable. The walls stay up.';
    }
  }
},
```

- [ ] **Step 4: Validate and commit all three files**

```bash
node tests/content/validate-content.js 2>&1 | grep P0 | head -10
git add content/glasswake_commune_stage2_enriched_choices.js content/cosmoria_stage2_enriched_choices.js content/shirshal_stage2_enriched_choices.js
git commit -m "content(glasswake+cosmoria+shirshal): add spirit/might/charm choices — skill diversity pass"
```

---

## TRACK B — Heat & Ability Activation (P0/P1)

### Task B1: Add Heat Triggers to Stage II Confrontation Choices

The Task A2-A4 choices above already include `addHeat` in their fumble/fail branches. Verify they are present in the committed code, then additionally audit the existing choices in guildheart, shelkopolis, and aurora for confrontation choices that currently have NO heat consequence.

- [ ] **Step 1: Count existing addHeat calls in Stage II**

```bash
grep -c "addHeat" content/*stage2*.js
```

- [ ] **Step 2: Identify confrontation choices without heat**

```bash
grep -n "Confrontation\|confrontation" content/guildheart_hub_stage2_enriched_choices.js content/shelkopolis_stage2_enriched_choices.js | grep -v addHeat | head -20
```

- [ ] **Step 3: Add `addHeat(polity, 1)` to fumble branches of 3-5 existing confrontation choices per file**

Pattern — in an existing choice's fumble branch, add:
```javascript
addHeat('shelk', 1);
```

Use the correct polity key per locality (shelkopolis/guildheart → 'shelk', cosmoria → 'cosmouth', shirshal → 'shirsh', glasswake → 'shelk').

- [ ] **Step 4: Commit**

```bash
git add content/guildheart_hub_stage2_enriched_choices.js content/shelkopolis_stage2_enriched_choices.js
git commit -m "content(stage2): wire addHeat to existing confrontation fumble branches — heat system Stage II activation"
```

---

### Task B2: Award Starter Abilities at Level 2

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Verify G.abilities exists in G defaults**

```bash
grep -n "abilities.*\[\]\|G\.abilities\b" ledger-of-ash.html | head -10
```

If not present, add `abilities: [],` to G defaults at line ~9291.

- [ ] **Step 2: Add STARTER_ABILITIES constant**

In ledger-of-ash.html near archetype definitions, add:
```javascript
var STARTER_ABILITIES = {
  Combat:  {id:'pressure_strike', name:'Pressure Strike', desc:'Once per rest: your next might roll gains +3 and on success the enemy loses their next defensive action.', type:'active', cooldown:'rest'},
  Stealth: {id:'shadow_step',     name:'Shadow Step',     desc:'Once per rest: move through a guarded area without triggering a roll.', type:'active', cooldown:'rest'},
  Support: {id:'field_assess',    name:'Field Assessment', desc:'Once per day: before making any skill roll, assess the situation for +2. Declare before rolling.', type:'active', cooldown:'day'},
  Magic:   {id:'pattern_recall',  name:'Pattern Recall',  desc:'Once per rest: reroll any wits roll and take the better result.', type:'active', cooldown:'rest'}
};
```

- [ ] **Step 3: Add awardAbility() helper**

```javascript
function awardAbility(abilityDef) {
  if (!G.abilities) G.abilities = [];
  var already = G.abilities.some(function(a) { return a.id === abilityDef.id; });
  if (already) return;
  G.abilities.push(abilityDef);
  showToast('Ability unlocked: ' + abilityDef.name);
  updateHUD();
}
```

- [ ] **Step 4: Call awardAbility in checkLevelUp at Level 2**

In the `checkLevelUp()` function, after level-up logic, add:
```javascript
if (G.level === 2 && G.abilities && G.abilities.length === 0) {
  var _fam = getArchetypeFamily(G.archetype);
  if (STARTER_ABILITIES[_fam]) awardAbility(STARTER_ABILITIES[_fam]);
}
```

- [ ] **Step 5: Syntax check and commit**

```bash
node --check ledger-of-ash.html
git add ledger-of-ash.html
git commit -m "feat(engine): STARTER_ABILITIES + awardAbility() — ability award on Level 2 by archetype family"
```

---

## TRACK C — UI Gaps (P1)

### Task C1: Hide Companion Camp Buttons Until Gate

**Files:** `ledger-of-ash.html` (camp render, ~line 14000)

- [ ] **Step 1: Find companion-dependent camp buttons**

```bash
grep -n "post_watches\|campAction.*talk\|Companions" ledger-of-ash.html | head -15
```

- [ ] **Step 2: Wrap in gate check**

Wrap "Post Watches" and "Talk" buttons in:
```javascript
if (G.flags && G.flags.maren_oss_resolved) { /* render button */ }
```

- [ ] **Step 3: Add discovery toast when gate opens**

Find where `G.flags.maren_oss_resolved` is set (in content/stage2_climax.js), and after it, add:
```javascript
showToast('Camp options unlocked: Post Watches, Talk with companions.');
```

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html content/stage2_climax.js
git commit -m "fix(ui): hide companion camp buttons until maren_oss_resolved — add discovery toast"
```

---

### Task C2: Fix Map Gate String

**Files:** `ledger-of-ash.html`

- [ ] **Step 1: Find the gate string**

```bash
grep -n "Level 6\|Reach Level\|cross polity" ledger-of-ash.html
```

- [ ] **Step 2: Replace**

```javascript
// Old:
"Reach Level 6 to cross polity lines"
// New:
"Advance to Stage II to unlock inter-polity travel"
```

- [ ] **Step 3: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(ui): map gate string — Stage II requirement not Level 6"
```

---

### Task C3: Fix stageProgress HUD Format (X/Threshold)

**Files:** `ledger-of-ash.html` (updateHUD, ~line 10862)

- [ ] **Step 1: Find stageProgress HUD render**

```bash
grep -n "stageProgress\|#hud-sp\|sp2" ledger-of-ash.html | grep -i "textContent\|innerHTML\|render\|hud" | head -10
```

- [ ] **Step 2: Update to show X/threshold**

```javascript
// Stage II antechamber threshold is sp2 >= 12
var _spThresh = stageNum === 2 ? 12 : 10;
el.textContent = G.stageProgress[stageNum] + ' / ' + _spThresh;
```

- [ ] **Step 3: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(ui): stageProgress HUD shows X/threshold format"
```

---

## TRACK E — Full Verification Run

### Task E1: Final Headless Spec

- [ ] **Step 1: Run all validators**

```bash
node tests/content/validate-content.js 2>&1 | grep -E "^(P0|ERROR)" | head -20
node tests/content/validate-flags.js 2>&1 | grep -E "^(P0|ERROR)" | head -10
node tests/content/validate-structure.js 2>&1 | grep -E "^(P0|ERROR)" | head -10
```

- [ ] **Step 2: Run headless 4 families**

```bash
npx playwright test tests/e2e/full-playthrough.spec.js --reporter=line 2>&1 | tail -30
```

Expected: 4/4 pass. Skill values non-zero in log (rekey working).

- [ ] **Step 3: Confirm skill values in log**

```bash
grep -i "might\|vigor\|charm\|wits\|finesse\|spirit" test-results/full-playthrough-log-headless.md | head -20
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: v1-completion-sprint verified — rekey + skill diversity + heat + abilities + UI gaps"
```

---

## DEFERRED TO POST-V1.0

| Item | Reason |
|---|---|
| Locality shops | Economy not critical for story arc |
| Gold/supply travel drain | Travel system not yet active |
| NPC conversations (locality_npcs.js) | 22 localities × conversation trees = 3+ day sprint |
| Alignment-gated Stage II endings | Current climax is functional |
| Camp `talk()` completion | 90% of camp actions work |
| DC spread rebalancing (30-35-35) | Playable as-is |
| Skill label semantic audit (survival tags on admin choices) | Old content; will improve naturally as new choices added |

---

## SUMMARY

| Track | Tasks | Priority |
|---|---|---|
| R — Skill Rekey | R1-R7 | P0 — do first |
| A — Skill Diversity | A1-A4 | P0 |
| B — Heat + Abilities | B1-B2 | P0/P1 |
| C — UI gaps | C1-C3 | P1 |
| E — Verification | E1 | Required |
