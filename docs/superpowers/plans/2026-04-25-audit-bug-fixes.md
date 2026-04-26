# Ledger of Ash — Audit Bug Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix three confirmed bugs found in the Apr 25 2026 code audit: reversed `addJournal` args throughout `stage2_enriched_choices.js`, a stale-key bug in `loadFromSlot`, and an unguarded `G.flags` read in `checkStageAdvance`.

**Architecture:** All three fixes are independent — no shared state. Task 1 is a mechanical find-and-replace in a content file. Task 2 is a one-line guard in `ledger-of-ash.html`. Task 3 extracts a helper from `initCreate()` and wires it into `loadFromSlot`. Each task commits independently.

**Tech Stack:** Vanilla JavaScript (ES5 in HTML, ES6 in content files), Jest 29 for tests, Node.js for test runner.

---

## File Structure

- **Modify:** `content/stage2_enriched_choices.js` — fix ~40 reversed `addJournal` calls and remap invalid categories
- **Modify:** `ledger-of-ash.html` — (a) add `G.flags` guard at line 11569; (b) extract `getDefaultG()` helper near line 9229; (c) update `loadFromSlot` at line 14688
- **Test:** `tests/game-logic.test.js` — add regression tests for all three fixes

---

## Critical background: `addJournal` signature

```js
addJournal(text, category)   // ← correct order
addJournal(category, text)   // ← WRONG — what ~40 calls in stage2_enriched_choices.js do
```

Valid categories (the only six accepted): `evidence`, `intelligence`, `rumor`, `discovery`, `contact_made`, `complication`

**Category remap table** (invalid → valid):

| Invalid (used as arg 1) | Correct valid category |
|---|---|
| `alliance` | `contact_made` |
| `ally` | `contact_made` |
| `companion` | `contact_made` |
| `contact` | `contact_made` |
| `setback` | `complication` |
| `combat` | `complication` |
| `consequence` | `complication` |
| `conflict` | `complication` |
| `threat` | `complication` |
| `expense` | `complication` |
| `progress` | `intelligence` |
| `action` | `intelligence` |
| `news` | `intelligence` |
| `faction` | `intelligence` |
| `rest` | `intelligence` |
| `mystery` | `discovery` |
| `route` | `discovery` |

---

## Task 1: Fix `addJournal` reversed args in `stage2_enriched_choices.js`

**Files:**
- Modify: `content/stage2_enriched_choices.js`
- Test: `tests/game-logic.test.js`

- [ ] **Step 1: Write the failing test**

Add this test to `tests/game-logic.test.js` (in an existing `describe` block or a new one):

```js
describe('stage2_enriched_choices addJournal arg order', () => {
  it('no addJournal call uses an invalid category as its first argument', () => {
    const fs = require('fs');
    const src = fs.readFileSync('content/stage2_enriched_choices.js', 'utf8');
    const INVALID_CATEGORIES = [
      'alliance','ally','companion','contact','setback','combat','consequence',
      'conflict','threat','expense','progress','action','news','faction','rest',
      'mystery','route','spy','espionage','loss','network'
    ];
    const pattern = /addJournal\(\s*'([^']+)'/g;
    let m;
    const violations = [];
    while ((m = pattern.exec(src)) !== null) {
      if (INVALID_CATEGORIES.includes(m[1])) {
        violations.push(`line contains addJournal('${m[1]}', ...)`);
      }
    }
    expect(violations).toEqual([]);
  });

  it('no addJournal call uses a valid category as its first argument (that would be reversed)', () => {
    const fs = require('fs');
    const src = fs.readFileSync('content/stage2_enriched_choices.js', 'utf8');
    // Calls like addJournal('evidence', ...) or addJournal('complication', ...) are reversed
    const VALID_CATS = ['evidence','intelligence','rumor','discovery','contact_made','complication'];
    const pattern = /addJournal\(\s*'(evidence|intelligence|rumor|discovery|contact_made|complication)'\s*,\s*'[A-Z]/g;
    // A valid category followed by a sentence starting with a capital = reversed (text is second)
    const matches = src.match(pattern) || [];
    expect(matches).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```
npx jest tests/game-logic.test.js --testNamePattern="addJournal" --no-coverage
```

Expected: FAIL — finds reversed calls.

- [ ] **Step 3: Apply the fix with a Node.js script**

Create `scripts/fix-addjournal.js` (delete after running):

```js
const fs = require('fs');
const path = 'content/stage2_enriched_choices.js';
let src = fs.readFileSync(path, 'utf8');

// Category remap: invalid first-arg → valid category
const REMAP = {
  alliance:'contact_made', ally:'contact_made', companion:'contact_made', contact:'contact_made',
  setback:'complication', combat:'complication', consequence:'complication', conflict:'complication',
  threat:'complication', expense:'complication',
  progress:'intelligence', action:'intelligence', news:'intelligence', faction:'intelligence', rest:'intelligence',
  mystery:'discovery', route:'discovery', spy:'intelligence', espionage:'intelligence',
  loss:'complication', network:'contact_made'
};

// Match: addJournal('INVALID_CAT', 'text', optionalThird)
// Replace with: addJournal('text', 'VALID_CAT')
// Note: third arg (dedup key) is silently ignored by addJournal — strip it
src = src.replace(
  /addJournal\(\s*'([a-z_]+)'\s*,\s*('(?:[^'\\]|\\.)*'|\`(?:[^`\\]|\\.)*\`)\s*(?:,\s*`[^`]*`)?\s*\)/g,
  (match, firstArg, secondArg) => {
    if (REMAP[firstArg]) {
      return `addJournal(${secondArg}, '${REMAP[firstArg]}')`;
    }
    return match; // already correct order — leave untouched
  }
);

fs.writeFileSync(path, src, 'utf8');
console.log('Done. Verify with: grep -n "addJournal" content/stage2_enriched_choices.js | head -30');
```

Run it:

```
node scripts/fix-addjournal.js
```

- [ ] **Step 4: Manually verify a sample of the output**

```
grep -n "addJournal" content/stage2_enriched_choices.js | head -30
```

Expected: every line shows `addJournal('Some actual text...', 'complication')` or similar — text first, valid category second. No lines should start with `addJournal('alliance'` or `addJournal('faction'` etc.

- [ ] **Step 5: Run the test to verify it passes**

```
npx jest tests/game-logic.test.js --testNamePattern="addJournal" --no-coverage
```

Expected: PASS

- [ ] **Step 6: Delete the one-off script**

```
rm scripts/fix-addjournal.js
```

- [ ] **Step 7: Run full test suite**

```
npx jest --no-coverage
```

Expected: 78/78 pass (or more if tests were added — all green).

- [ ] **Step 8: Commit**

```
git add content/stage2_enriched_choices.js tests/game-logic.test.js
git commit -m "fix: reverse addJournal args in stage2_enriched_choices + remap invalid categories"
```

---

## Task 2: Guard `G.flags` in `checkStageAdvance` (HTML line 11569)

**Files:**
- Modify: `ledger-of-ash.html` at line 11569
- Test: `tests/game-logic.test.js`

- [ ] **Step 1: Write the failing test**

Add to `tests/game-logic.test.js`:

```js
describe('checkStageAdvance G.flags guard', () => {
  it('checkStageAdvance does not throw when G.flags is undefined', () => {
    // This test verifies the guard exists in the source
    const fs = require('fs');
    const src = fs.readFileSync('ledger-of-ash.html', 'utf8');
    // The guard must appear immediately before the companion_gate_open read
    const guardPresent = /if\s*\(!G\.flags\)\s*G\.flags\s*=\s*\{\}[\s\S]{0,200}companion_gate_open/.test(src);
    expect(guardPresent).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```
npx jest tests/game-logic.test.js --testNamePattern="G.flags guard" --no-coverage
```

Expected: FAIL — guard not present.

- [ ] **Step 3: Apply the fix**

In `ledger-of-ash.html`, find line 11566–11571 which reads:

```js
function checkStageAdvance() {
  if (typeof SCOPE_REVEAL !== 'undefined' && SCOPE_REVEAL.trigger) SCOPE_REVEAL.trigger();
  // Companion gate — unlocks Vorath and Mira at mid-Stage 1
  if (!G.flags.companion_gate_open && (G.stageProgress && G.stageProgress[1] || 0) >= 5) {
    G.flags.companion_gate_open = true;
  }
```

Change to:

```js
function checkStageAdvance() {
  if (typeof SCOPE_REVEAL !== 'undefined' && SCOPE_REVEAL.trigger) SCOPE_REVEAL.trigger();
  if (!G.flags) G.flags = {};
  // Companion gate — unlocks Vorath and Mira at mid-Stage 1
  if (!G.flags.companion_gate_open && (G.stageProgress && G.stageProgress[1] || 0) >= 5) {
    G.flags.companion_gate_open = true;
  }
```

- [ ] **Step 4: Run test to verify it passes**

```
npx jest tests/game-logic.test.js --testNamePattern="G.flags guard" --no-coverage
```

Expected: PASS

- [ ] **Step 5: Run full test suite**

```
npx jest --no-coverage
```

Expected: all green.

- [ ] **Step 6: Commit**

```
git add ledger-of-ash.html tests/game-logic.test.js
git commit -m "fix: guard G.flags before checkStageAdvance companion_gate_open read"
```

---

## Task 3: Fix `loadFromSlot` stale-key bug with `getDefaultG()` helper

**Files:**
- Modify: `ledger-of-ash.html` — two locations: (a) extract `getDefaultG()` before `initCreate()` at line 9227; (b) update `loadFromSlot` at line 14688
- Test: `tests/game-logic.test.js`

- [ ] **Step 1: Write the failing test**

Add to `tests/game-logic.test.js`:

```js
describe('loadFromSlot getDefaultG reset', () => {
  it('loadFromSlot source uses getDefaultG() before Object.assign', () => {
    const fs = require('fs');
    const src = fs.readFileSync('ledger-of-ash.html', 'utf8');
    // loadFromSlot must call getDefaultG() before Object.assign(G, d)
    const hasHelper = /function getDefaultG\(\)/.test(src);
    const usesHelper = /Object\.assign\(G,\s*getDefaultG\(\),\s*d\)/.test(src);
    expect(hasHelper).toBe(true);
    expect(usesHelper).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```
npx jest tests/game-logic.test.js --testNamePattern="getDefaultG" --no-coverage
```

Expected: FAIL — `getDefaultG` not defined.

- [ ] **Step 3: Extract `getDefaultG()` before `initCreate()`**

In `ledger-of-ash.html`, find line 9227:

```js
// ── CHARACTER CREATION ──────────────────────────────────
function initCreate() {
  G = { name:'', archetype:null, background:null, level:1, xp:0, renown:0, hp:20, maxHp:20, gold:20,
```

Insert this new function **immediately before** the `// ── CHARACTER CREATION` comment:

```js
function getDefaultG() {
  return {
    name:'', archetype:null, background:null, level:1, xp:0, renown:0, hp:20, maxHp:20, gold:20,
    skills:{might:0,vigor:0,charm:0,wits:0,finesse:0,spirit:0},
    traits:[], location:'shelkopolis', timeIndex:0, dayCount:0, axisTick:0, axisInverted:false,
    stage:'Stage I', stageLabel:'Grass Roots', benevolence:0, orderAxis:0, localityHeat:{}, tensionLevel:0,
    factions:[], quests:[], questHints:{}, journal:[], journalRecords:[], history:[],
    inventory:[], equipped:{weapon:null,armor:null,tool:null},
    wounds:[], fatigue:0, recoveryState:'stable',
    npcMemory:{}, trainingDisadvantage:0,
    unlockedAbilities:[], unlockedCombatAbilities:[],
    companions:{}, tutorialFlags:{},
    dead:false, rivalAdventurers:[],
    marenRenown:0, marenRevealed:false,
    stageProgress:{1:0, 2:0, 3:0, 4:0, 5:0},
    telemetry:{turns:0, actions:0},
    worldClocks:{watchfulness:0, pressure:0, rival:0, weather:0, omens:0},
    discoveries:{}, contacts:{},
    investigationProgress:0, flags:{}, rivalId:null,
    factionHostility:{warden_order:0,iron_compact:0,oversight_collegium:0},
    stage2_rival_status:null, stage2_evidence_shared:null, stage2_faction_declared:null,
    nomdara_last_visit_locality:null,
    seenChoices:{},
    startingLocality:'shelkopolis',
    _campoutPenalty:0, campoutDay:-1,
    trainingCooldowns:{}, trainingSessionsUsed:{}, lastTrainedStat:null,
    masteryXP:0, traitProgress:{}, unlockedTraits:[],
    archetypeBaseStats:{}, sorePlotCredits:0, soreCreditUsed:{},
    shopCreditBoost:0, statCap:10,
    restCount:0,
    heat:{}
  };
}

```

Then update `initCreate()` to call it instead of duplicating the literal:

```js
function initCreate() {
  G = getDefaultG();
  // (rest of initCreate continues unchanged — archetype selection, skill distribution, etc.)
```

Do NOT remove any code after `G = { ... }` in `initCreate()` — only replace the object literal assignment with `G = getDefaultG();`. Everything after (archetype/skill setup) stays.

- [ ] **Step 4: Update `loadFromSlot` to use `getDefaultG()`**

In `ledger-of-ash.html`, find line 14688:

```js
    Object.assign(G, d);
```

Change to:

```js
    Object.assign(G, getDefaultG(), d);
```

This ensures: any property that existed in G from a prior session but is absent from the save data gets reset to the new-game default instead of surviving with stale in-session values. Properties in `d` (the save) always win over defaults.

- [ ] **Step 5: Run test to verify it passes**

```
npx jest tests/game-logic.test.js --testNamePattern="getDefaultG" --no-coverage
```

Expected: PASS

- [ ] **Step 6: Run full test suite**

```
npx jest --no-coverage
```

Expected: all green.

- [ ] **Step 7: Commit**

```
git add ledger-of-ash.html tests/game-logic.test.js
git commit -m "fix: extract getDefaultG() helper, reset G state on loadFromSlot to prevent stale-key corruption"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Task 1 covers reversed `addJournal` args + invalid category remap
- [x] Task 2 covers unguarded `G.flags` in `checkStageAdvance`
- [x] Task 3 covers `loadFromSlot` stale-key bug via `getDefaultG()`

**Placeholder scan:** None found — all steps have exact code, exact commands, expected output.

**Type consistency:**
- `getDefaultG()` is defined in Task 3 Step 3 and referenced in Task 3 Step 4 — same name
- `addJournal(text, category)` arg order is consistent throughout
- `G.flags = G.flags || {}` guard pattern matches existing guards in the codebase (lines 9800, 9814, 11230)
