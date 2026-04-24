# Content Authoring Standards — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend `validate-content.js` with 6 automated rules (A1–A6), add a per-file review reporter (`review-content.js`), and produce `docs/CONTENT_STANDARDS.md` as a writer-facing guide — all built in lock-step, one standard at a time.

**Architecture:** Approach C (true parallel) — each standard gets a guide entry and a validator rule in the same pass. Rule logic is extracted into pure, testable functions exported from validate-content.js. A Jest test suite covers each rule independently.

**Tech Stack:** Node.js, Jest (already installed), `vm` module (already in use), `fs`/`path` (already in use).

---

## File Map

| File | Action | Role |
|------|--------|------|
| `tests/content/validate-content.js` | Modify | Add A1–A6 rules + exports + warn counter |
| `tests/content/validate-content.rules.test.js` | Create | Jest unit tests for all rule functions |
| `tests/content/review-content.js` | Create | Per-file report generator |
| `docs/CONTENT_STANDARDS.md` | Create | Writer-facing authoring guide |
| `package.json` | Modify | Add `review:content` script |

---

## Task 1: Testable Exports + Result String Extractor + A1 Rule (≥30 words)

**Files:**
- Modify: `tests/content/validate-content.js`
- Create: `tests/content/validate-content.rules.test.js`

- [ ] **Step 1: Write failing Jest test**

Create `tests/content/validate-content.rules.test.js`:

```js
'use strict';
const { extractResultStrings, checkResultWordCount } = require('./validate-content');

describe('extractResultStrings', () => {
  test('extracts single-quote result from addNarration call', () => {
    const src = `function fn() { addNarration('Title', 'The clerk sets the ledger down.'); }`;
    expect(extractResultStrings(src)).toContain('The clerk sets the ledger down.');
  });

  test('extracts double-quote result from addNarration call', () => {
    const src = `function fn() { addNarration("", "She does not look up from the page."); }`;
    expect(extractResultStrings(src)).toContain('She does not look up from the page.');
  });

  test('returns empty array when no addNarration calls', () => {
    const src = `function fn() { G.flags.done = true; }`;
    expect(extractResultStrings(src)).toHaveLength(0);
  });
});

describe('checkResultWordCount (A1)', () => {
  test('FAIL: result under 30 words', () => {
    const result = checkResultWordCount('Short result with only a few words here now.');
    expect(result).toMatchObject({ level: 'fail' });
  });

  test('PASS: result at exactly 30 words', () => {
    const text = Array(30).fill('word').join(' ');
    expect(checkResultWordCount(text)).toBeNull();
  });

  test('PASS: result in the 60-90 word target range', () => {
    const text = Array(75).fill('word').join(' ');
    expect(checkResultWordCount(text)).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```
npx jest tests/content/validate-content.rules.test.js --no-coverage
```

Expected: FAIL — "Cannot find module './validate-content'" or "extractResultStrings is not a function"

- [ ] **Step 3: Guard run() and add exports + extractResultStrings + checkResultWordCount to validate-content.js**

At the bottom of `tests/content/validate-content.js`, replace the bare `run();` call with:

```js
// ─── Exported rule helpers (used by review-content.js and tests) ─────────────

function extractResultStrings(fnSrc) {
  const src = fnSrc.replace(/\/\/[^\n]*/g, ''); // strip single-line comments
  const results = [];
  // Match addNarration(<first-arg>, '<result>') — single quotes
  const reSQ = /addNarration\s*\(\s*(?:'[^']*'|"[^"]*")\s*,\s*'((?:[^'\\]|\\.)*)'/g;
  // Match addNarration(<first-arg>, "<result>") — double quotes
  const reDQ = /addNarration\s*\(\s*(?:'[^']*'|"[^"]*")\s*,\s*"((?:[^"\\]|\\.)*)"/g;
  for (const re of [reSQ, reDQ]) {
    let m;
    while ((m = re.exec(src)) !== null) {
      const text = m[1].replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"').trim();
      if (text.length > 0) results.push(text);
    }
  }
  return results;
}

function checkResultWordCount(text) {
  const words = countWords(text); // countWords already defined above
  if (words < 30) return { level: 'fail', msg: `result text too short: ${words} words (min 30)` };
  return null;
}

if (require.main === module) { run(); }

module.exports = { extractResultStrings, checkResultWordCount };
```

Wire A1 into `validateChoice` — add after the `xpReward` check:

```js
  // A1: result text ≥ 30 words
  if (typeof choice.fn === 'function') {
    const results = extractResultStrings(choice.fn.toString());
    for (const text of results) {
      const r = checkResultWordCount(text);
      if (r) fail(file, label, r.msg);
    }
  }
```

- [ ] **Step 4: Run test to verify it passes**

```
npx jest tests/content/validate-content.rules.test.js --no-coverage
```

Expected: All tests PASS

- [ ] **Step 5: Run full validator to confirm no regressions**

```
node tests/content/validate-content.js 2>&1 | tail -5
```

Expected: violation count same as or higher than baseline (838+); no new crashes.

- [ ] **Step 6: Add guide entry**

Append to `docs/CONTENT_STANDARDS.md` (create if first time):

```markdown
# Content Authoring Standards — Ledger of Ash

## A1 — Result Text Minimum Length

**Rule:** Every result text must be at least 30 words. Under 30 words is a placeholder, not a result.

**Pass:** "The innkeeper slides the registry across without meeting your eye. The entry you need is already folded to — a small crease at the corner, recent. Someone read this before you arrived. The name in the margin is not in the standard registry hand; it was added after the page was filled."

**Fail:** "You find the entry. Someone has already read it."
```

- [ ] **Step 7: Commit**

```
git add tests/content/validate-content.js tests/content/validate-content.rules.test.js docs/CONTENT_STANDARDS.md
git commit -m "feat(standards): A1 result word count minimum + extractResultStrings + exports"
```

---

## Task 2: A2 Rule — Result Word Count Range Warning

**Files:**
- Modify: `tests/content/validate-content.js`
- Modify: `tests/content/validate-content.rules.test.js`
- Modify: `docs/CONTENT_STANDARDS.md`

- [ ] **Step 1: Write failing tests**

Add to `validate-content.rules.test.js`:

```js
describe('checkResultWordCount (A2 — warn/fail range)', () => {
  test('WARN: result 30-59 words', () => {
    const text = Array(45).fill('word').join(' ');
    const result = checkResultWordCount(text);
    expect(result).toMatchObject({ level: 'warn' });
  });

  test('FAIL: result over 120 words', () => {
    const text = Array(125).fill('word').join(' ');
    const result = checkResultWordCount(text);
    expect(result).toMatchObject({ level: 'fail' });
  });

  test('PASS: result at exactly 60 words', () => {
    const text = Array(60).fill('word').join(' ');
    expect(checkResultWordCount(text)).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```
npx jest tests/content/validate-content.rules.test.js --no-coverage -t "A2"
```

Expected: FAIL — warn case returns null instead of {level:'warn'}

- [ ] **Step 3: Update checkResultWordCount to cover full range**

Replace the existing `checkResultWordCount` export in `validate-content.js`:

```js
function checkResultWordCount(text) {
  const words = countWords(text);
  if (words < 30) return { level: 'fail', msg: `result text too short: ${words} words (min 30)` };
  if (words > 120) return { level: 'fail', msg: `result text too long: ${words} words (max 120)` };
  if (words < 60) return { level: 'warn', msg: `result text short: ${words} words (target 60–90, expand if possible)` };
  return null;
}
```

Add a `warns` counter to the module (alongside `errors` at the top):

```js
let warns = 0;
```

Add a `warn` function (alongside `fail`):

```js
function warn(file, label, msg) {
  console.warn(`  WARN [${path.basename(file)}] "${label}": ${msg}`);
  warns++;
}
```

Update the A1 wiring in `validateChoice` to dispatch warn vs fail:

```js
  // A1/A2: result word count
  if (typeof choice.fn === 'function') {
    const results = extractResultStrings(choice.fn.toString());
    for (const text of results) {
      const r = checkResultWordCount(text);
      if (r && r.level === 'fail') fail(file, label, r.msg);
      if (r && r.level === 'warn') warn(file, label, r.msg);
    }
  }
```

Update `run()` to print warn count:

```js
  console.log(`\nChecked ${checked} choices across ${files.length} files.`);
  if (warns > 0) console.warn(`${warns} warning(s).`);
  if (errors > 0) {
    console.error(`${errors} violation(s) found.`);
    process.exit(1);
  } else {
    console.log('All checks passed.');
  }
```

- [ ] **Step 4: Run tests to verify pass**

```
npx jest tests/content/validate-content.rules.test.js --no-coverage
```

Expected: All tests PASS

- [ ] **Step 5: Add guide entry**

Append to `docs/CONTENT_STANDARDS.md`:

```markdown
## A2 — Result Text Target Length

**Rule:** Target 60–90 words. 30–59 words triggers a warning (expand if possible). Over 120 words fails (trim to fit one screen).

At 60 words a result earns its place. At 90 it's complete. Past 120 it scrolls, and scrolling breaks immersion.
```

- [ ] **Step 6: Commit**

```
git add tests/content/validate-content.js tests/content/validate-content.rules.test.js docs/CONTENT_STANDARDS.md
git commit -m "feat(standards): A2 result word count range + warn counter"
```

---

## Task 3: A3 Rule — No Summary-Register Openers

**Files:**
- Modify: `tests/content/validate-content.js`
- Modify: `tests/content/validate-content.rules.test.js`
- Modify: `docs/CONTENT_STANDARDS.md`

- [ ] **Step 1: Write failing tests**

Add to `validate-content.rules.test.js`:

```js
const { checkResultOpener } = require('./validate-content');

describe('checkResultOpener (A3)', () => {
  test('FAIL: result opens with "Confirms"', () => {
    expect(checkResultOpener('Confirms the backlog exists and points you toward the third shelf.')).toMatchObject({ level: 'fail' });
  });

  test('FAIL: result opens with "You learn that"', () => {
    expect(checkResultOpener('You learn that the shipment was rerouted three days ago.')).toMatchObject({ level: 'fail' });
  });

  test('FAIL: result opens with "It turns out"', () => {
    expect(checkResultOpener('It turns out the warden was already watching the gate.')).toMatchObject({ level: 'fail' });
  });

  test('PASS: result opens with observable action', () => {
    expect(checkResultOpener('The clerk sets the ledger down and does not look at you.')).toBeNull();
  });

  test('PASS: result opens with NPC dialogue', () => {
    expect(checkResultOpener('"You were not expected," she says.')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```
npx jest tests/content/validate-content.rules.test.js --no-coverage -t "A3"
```

Expected: FAIL — checkResultOpener is not a function

- [ ] **Step 3: Implement checkResultOpener and wire into validateChoice**

Add to `validate-content.js` exports section:

```js
const SUMMARY_OPENERS = ['confirms', 'acknowledges', 'indicates', 'the result is', 'you learn that', 'it turns out'];

function checkResultOpener(text) {
  const lower = text.trimStart().toLowerCase();
  for (const opener of SUMMARY_OPENERS) {
    if (lower.startsWith(opener)) {
      return { level: 'fail', msg: `result opens with summary-register phrase: "${opener}"` };
    }
  }
  return null;
}
```

Add `checkResultOpener` to `module.exports`.

Add to the A1/A2 block in `validateChoice`:

```js
      const r3 = checkResultOpener(text);
      if (r3) fail(file, label, r3.msg);
```

So the full block becomes:

```js
  if (typeof choice.fn === 'function') {
    const results = extractResultStrings(choice.fn.toString());
    for (const text of results) {
      const r = checkResultWordCount(text);
      if (r && r.level === 'fail') fail(file, label, r.msg);
      if (r && r.level === 'warn') warn(file, label, r.msg);
      const r3 = checkResultOpener(text);
      if (r3) fail(file, label, r3.msg);
    }
  }
```

- [ ] **Step 4: Run tests to verify pass**

```
npx jest tests/content/validate-content.rules.test.js --no-coverage
```

Expected: All tests PASS

- [ ] **Step 5: Add guide entry**

Append to `docs/CONTENT_STANDARDS.md`:

```markdown
## A3 — No Summary-Register Openers

**Rule:** Result text must not begin with a procedural summary phrase.

**Blocked openers (case-insensitive):** "confirms", "acknowledges", "indicates", "the result is", "you learn that", "it turns out"

**Fail:** "Confirms the delivery was rerouted. The factor handled it personally."

**Pass:** "The factor handled it personally. That much is in the ledger, in ink that's still bright — the entry was made after everything else on the page."

The blocked phrases open with a verdict. The game already resolved the dice; the result should open in the scene, not above it.
```

- [ ] **Step 6: Commit**

```
git add tests/content/validate-content.js tests/content/validate-content.rules.test.js docs/CONTENT_STANDARDS.md
git commit -m "feat(standards): A3 no summary-register openers"
```

---

## Task 4: A4 Rule — Rumor Source Attribution

**Files:**
- Modify: `tests/content/validate-content.js`
- Modify: `tests/content/validate-content.rules.test.js`
- Modify: `docs/CONTENT_STANDARDS.md`

- [ ] **Step 1: Write failing tests**

Add to `validate-content.rules.test.js`:

```js
const { extractRumorTexts, checkRumorSource } = require('./validate-content');

describe('extractRumorTexts', () => {
  test('extracts text from addJournal rumor call (single quotes)', () => {
    const src = `function fn() { addJournal('A cart was turned away at the gate.', 'rumor'); }`;
    expect(extractRumorTexts(src)).toContain('A cart was turned away at the gate.');
  });

  test('returns empty array when no rumor addJournal calls', () => {
    const src = `function fn() { addJournal('Evidence text.', 'evidence'); }`;
    expect(extractRumorTexts(src)).toHaveLength(0);
  });
});

describe('checkRumorSource (A4)', () => {
  test('FAIL: rumor with no source attribution', () => {
    expect(checkRumorSource('Word is the shipment was rerouted.')).toMatchObject({ level: 'fail' });
  });

  test('PASS: rumor with proper noun (NPC name)', () => {
    expect(checkRumorSource('Elior Cadrin was seen at the docks before the manifest was pulled.')).toBeNull();
  });

  test('PASS: rumor with social role', () => {
    expect(checkRumorSource('A wool merchant said the gate log was altered last week.')).toBeNull();
  });

  test('PASS: rumor with location reference', () => {
    expect(checkRumorSource('At the market square, the rumor is the Guildhall sealed the third floor.')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```
npx jest tests/content/validate-content.rules.test.js --no-coverage -t "A4"
```

Expected: FAIL — functions not found

- [ ] **Step 3: Implement extractRumorTexts and checkRumorSource, wire into validateChoice**

Add to `validate-content.js` exports section:

```js
function extractRumorTexts(fnSrc) {
  const src = fnSrc.replace(/\/\/[^\n]*/g, '');
  const results = [];
  // addJournal('text', 'rumor') — single-quote text
  const reSQ = /addJournal\s*\(\s*'((?:[^'\\]|\\.)*)'\s*,\s*['"]rumor['"]/g;
  // addJournal("text", 'rumor') — double-quote text
  const reDQ = /addJournal\s*\(\s*"((?:[^"\\]|\\.)*)"\s*,\s*['"]rumor['"]/g;
  for (const re of [reSQ, reDQ]) {
    let m;
    while ((m = re.exec(src)) !== null) {
      results.push(m[1].trim());
    }
  }
  return results;
}

const SOCIAL_ROLES = /\b(?:merchant|factor|clerk|warden|innkeeper|stevedore|guildsman|handler|carter|broker|scribe|soldier|captain|lieutenant|marshal|sergeant|courier|porter|dockhand)\b/i;
const LOCATION_REFS = /\b(?:at|in|near|from|outside|inside|by)\s+the\s+[a-z]/i;

function checkRumorSource(text) {
  const hasProperNoun = /[A-Z][a-z]+\s+[A-Z][a-z]+/.test(text);
  const hasLocation = LOCATION_REFS.test(text) ||
    /\b(?:market|hall|inn|gate|ward|district|square|dock|harbor|wharf|bridge|warehouse)\b/i.test(text);
  const hasSocialRole = SOCIAL_ROLES.test(text);

  if (!hasProperNoun && !hasLocation && !hasSocialRole) {
    return { level: 'fail', msg: 'rumor has no source attribution — needs a proper noun, location, or social role' };
  }
  return null;
}
```

Add both to `module.exports`.

Add to `validateChoice` after the fn check block:

```js
  // A4: rumor source attribution
  if (typeof choice.fn === 'function') {
    const rumorTexts = extractRumorTexts(choice.fn.toString());
    for (const text of rumorTexts) {
      const r4 = checkRumorSource(text);
      if (r4) fail(file, label, r4.msg);
    }
  }
```

- [ ] **Step 4: Run tests to verify pass**

```
npx jest tests/content/validate-content.rules.test.js --no-coverage
```

Expected: All tests PASS

- [ ] **Step 5: Add guide entry**

Append to `docs/CONTENT_STANDARDS.md`:

```markdown
## A4 — Rumor Source Attribution

**Rule:** Any `addJournal(text, 'rumor')` call must embed a source — a proper noun (NPC name), a location reference, or a social role ("a wool merchant", "the factor", "a clerk at the intake hall").

**Fail:** "Word is the cargo was rerouted before it reached the ward."

**Pass:** "A stevedore at the south wharf said the cargo was rerouted before the manifest was logged — he saw it moved himself but didn't ask why."

A rumor without a source is a briefing. Give it a mouth and a room.
```

- [ ] **Step 6: Commit**

```
git add tests/content/validate-content.js tests/content/validate-content.rules.test.js docs/CONTENT_STANDARDS.md
git commit -m "feat(standards): A4 rumor source attribution"
```

---

## Task 5: A5 Rule — NPC Flag Timing

**Files:**
- Modify: `tests/content/validate-content.js`
- Modify: `tests/content/validate-content.rules.test.js`
- Modify: `docs/CONTENT_STANDARDS.md`

- [ ] **Step 1: Write failing tests**

Add to `validate-content.rules.test.js`:

```js
const { checkNpcFlagTiming } = require('./validate-content');

describe('checkNpcFlagTiming (A5)', () => {
  test('FAIL: met flag set after narration that uses NPC name', () => {
    const src = `function fn() {
      addNarration('', 'Elior sets the ledger down.');
      G.flags.met_elior = true;
    }`;
    const issues = checkNpcFlagTiming(src);
    expect(issues.length).toBeGreaterThan(0);
    expect(issues[0]).toMatchObject({ level: 'fail' });
  });

  test('PASS: met flag set before narration that uses NPC name', () => {
    const src = `function fn() {
      G.flags.met_elior = true;
      addNarration('', 'Elior sets the ledger down.');
    }`;
    expect(checkNpcFlagTiming(src)).toHaveLength(0);
  });

  test('PASS: no met flags at all', () => {
    const src = `function fn() { addNarration('', 'The room is quiet.'); }`;
    expect(checkNpcFlagTiming(src)).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```
npx jest tests/content/validate-content.rules.test.js --no-coverage -t "A5"
```

Expected: FAIL — checkNpcFlagTiming is not a function

- [ ] **Step 3: Implement checkNpcFlagTiming and wire into validateChoice**

Add to `validate-content.js` exports section:

```js
function checkNpcFlagTiming(fnSrc) {
  const src = fnSrc.replace(/\/\/[^\n]*/g, '');
  const issues = [];
  const flagRe = /G\.flags\.(met_\w+)\s*=\s*true/g;
  let m;
  while ((m = flagRe.exec(src)) !== null) {
    const flagName = m[1]; // e.g. "met_elior_cadrin"
    const flagPos = m.index;
    // Extract first name segment from flag: met_elior_cadrin → "elior"
    const firstName = flagName.replace('met_', '').split('_')[0].toLowerCase();
    // Check if any addNarration call before this position contains that name
    const srcBefore = src.slice(0, flagPos);
    const narrationRe = /addNarration\s*\(/g;
    let nm;
    while ((nm = narrationRe.exec(srcBefore)) !== null) {
      // Grab a window of 300 chars after addNarration( to check for the name
      const window = srcBefore.slice(nm.index, nm.index + 300).toLowerCase();
      if (window.includes(firstName)) {
        issues.push({ level: 'fail', msg: `G.flags.${flagName} set after addNarration references "${firstName}" — move flag assignment before addNarration` });
        break;
      }
    }
  }
  return issues;
}
```

Add `checkNpcFlagTiming` to `module.exports`.

Add to `validateChoice` after A4 block:

```js
  // A5: NPC flag timing
  if (typeof choice.fn === 'function') {
    const timingIssues = checkNpcFlagTiming(choice.fn.toString());
    for (const issue of timingIssues) {
      fail(file, label, issue.msg);
    }
  }
```

- [ ] **Step 4: Run tests to verify pass**

```
npx jest tests/content/validate-content.rules.test.js --no-coverage
```

Expected: All tests PASS

- [ ] **Step 5: Add guide entry**

Append to `docs/CONTENT_STANDARDS.md`:

```markdown
## A5 — NPC First-Encounter Flag Timing

**Rule:** `G.flags.met_<name> = true` must be set *before* the `addNarration` call that addresses that NPC directly by name. Setting the flag during the outcome block (after narration) means any subsequent check sees the wrong state.

**Fail:**
```js
addNarration('', 'Elior sets the ledger down without looking at you.');
G.flags.met_elior = true; // too late — narration already ran
```

**Pass:**
```js
G.flags.met_elior = true;
addNarration('', 'Elior sets the ledger down without looking at you.');
```
```

- [ ] **Step 6: Commit**

```
git add tests/content/validate-content.js tests/content/validate-content.rules.test.js docs/CONTENT_STANDARDS.md
git commit -m "feat(standards): A5 NPC flag timing check"
```

---

## Task 6: A6 Rule — World Clock Transparency

**Files:**
- Modify: `tests/content/validate-content.js`
- Modify: `tests/content/validate-content.rules.test.js`
- Modify: `docs/CONTENT_STANDARDS.md`

- [ ] **Step 1: Write failing tests**

Add to `validate-content.rules.test.js`:

```js
const { checkWorldClockTransparency } = require('./validate-content');

describe('checkWorldClockTransparency (A6)', () => {
  test('WARN: worldClock incremented without consequence word', () => {
    const src = `function fn() {
      G.worldClocks.pressure++;
      addNarration('', 'The gate log shows your arrival time written twice.');
    }`;
    expect(checkWorldClockTransparency(src)).toMatchObject({ level: 'warn' });
  });

  test('PASS: worldClock incremented with consequence word in result', () => {
    const src = `function fn() {
      G.worldClocks.pressure++;
      addNarration('', 'The gate log shows your arrival time written twice. The pressure of being watched has increased.');
    }`;
    expect(checkWorldClockTransparency(src)).toBeNull();
  });

  test('PASS: no worldClock increment', () => {
    const src = `function fn() {
      addNarration('', 'The room is quiet.');
    }`;
    expect(checkWorldClockTransparency(src)).toBeNull();
  });

  test('PASS: worldClock with "harder" consequence word', () => {
    const src = `function fn() {
      G.worldClocks.watchfulness += 2;
      addNarration('', 'The ward clerk marks your name. Future checks here will be harder.');
    }`;
    expect(checkWorldClockTransparency(src)).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```
npx jest tests/content/validate-content.rules.test.js --no-coverage -t "A6"
```

Expected: FAIL — checkWorldClockTransparency is not a function

- [ ] **Step 3: Implement checkWorldClockTransparency and wire into validateChoice**

Add to `validate-content.js` exports section:

```js
const CONSEQUENCE_WORDS = ['attention', 'pressure', 'harder', 'watchful', 'noticed', 'tracked', 'scrutin'];

function checkWorldClockTransparency(fnSrc) {
  const src = fnSrc.replace(/\/\/[^\n]*/g, '');
  if (!/G\.worldClocks\.\w+\s*(?:\+\+|\+=)/.test(src)) return null;

  const results = extractResultStrings(fnSrc);
  const allText = results.join(' ').toLowerCase();
  const hasConsequenceWord = CONSEQUENCE_WORDS.some(w => allText.includes(w));

  if (!hasConsequenceWord) {
    return {
      level: 'warn',
      msg: `worldClock incremented without consequence signal word (${CONSEQUENCE_WORDS.slice(0,4).join('/')}/…)`,
    };
  }
  return null;
}
```

Add `checkWorldClockTransparency` to `module.exports`.

Add to `validateChoice` after A5 block:

```js
  // A6: world clock transparency
  if (typeof choice.fn === 'function') {
    const r6 = checkWorldClockTransparency(choice.fn.toString());
    if (r6) warn(file, label, r6.msg);
  }
```

- [ ] **Step 4: Run all tests to verify pass**

```
npx jest tests/content/validate-content.rules.test.js --no-coverage
```

Expected: All tests PASS

- [ ] **Step 5: Add guide entry**

Append to `docs/CONTENT_STANDARDS.md`:

```markdown
## A6 — World Clock Transparency

**Rule:** If a choice outcome increments `G.worldClocks.<key>`, the result text in the same function must contain at least one consequence-signal word: `attention`, `pressure`, `harder`, `watchful`, `noticed`, `tracked`, `scrutin`.

Silent clock increments are invisible tax — the player has no way to know why future DCs are harder.

**Fail:**
```js
G.worldClocks.pressure++;
addNarration('', 'The gate clerk marks your name in the log.');
// ← no signal that pressure increased
```

**Pass:**
```js
G.worldClocks.pressure++;
addNarration('', 'The gate clerk marks your name in the log. The next time through this checkpoint will be harder — he has your face now.');
```
```

- [ ] **Step 6: Commit**

```
git add tests/content/validate-content.js tests/content/validate-content.rules.test.js docs/CONTENT_STANDARDS.md
git commit -m "feat(standards): A6 world clock transparency warning"
```

---

## Task 7: review-content.js — Per-File Report Generator

**Files:**
- Create: `tests/content/review-content.js`
- Modify: `package.json`

- [ ] **Step 1: Create review-content.js**

Create `tests/content/review-content.js`:

```js
'use strict';
/**
 * Per-file content review report generator.
 * Usage: node tests/content/review-content.js <content-filename>
 * Output: docs/reviews/<filename>-review.md
 */

const fs   = require('fs');
const path = require('path');

const {
  extractResultStrings,
  extractRumorTexts,
  checkResultWordCount,
  checkResultOpener,
  checkRumorSource,
  checkNpcFlagTiming,
  checkWorldClockTransparency,
} = require('./validate-content');

const CONTENT_DIR = path.join(__dirname, '..', '..', 'content');
const REVIEWS_DIR = path.join(__dirname, '..', '..', 'docs', 'reviews');

const filename = process.argv[2];
if (!filename) {
  console.error('Usage: node tests/content/review-content.js <content-filename>');
  process.exit(1);
}

const filePath = path.join(CONTENT_DIR, filename);
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

// Load the file and collect choice objects using same logic as validate-content
const vm = require('vm');
const VALID_CATS = new Set(['evidence', 'intelligence', 'rumor', 'discovery', 'contact_made', 'complication']);

function loadChoices(fp) {
  const src = fs.readFileSync(fp, 'utf8');
  const captured = [];
  const sandbox = {
    window: {}, console: { log: () => {}, warn: () => {}, error: () => {} },
    Math, JSON, Object, Array, Date, RegExp, Error,
    parseInt, parseFloat, isNaN, isFinite,
    G: { level: 1, stage: 'Stage I', stageProgress: {1:0,2:0,3:0,4:0,5:0}, flags: {},
         skills: {combat:0,survival:0,persuasion:0,lore:0,stealth:0,craft:0},
         inventory: [], renown: 0, gold: 20, hp: 20, maxHp: 20, xp: 0 },
    addJournal: () => {}, addNarration: () => {}, showToast: () => {}, updateHUD: () => {},
    saveGame: () => {}, gainXp: () => {}, addToInventory: () => {}, advanceTime: () => {},
    tickAxis: () => {}, enterCombat: () => {}, addWorldNotice: () => {}, addQuest: () => {},
    loadStageChoices: () => {}, renderChoices: () => {}, maybeStageAdvance: () => {}, getRivalDCMod: () => 0,
  };
  const proxy = new Proxy(sandbox.window, {
    set(target, key, value) {
      target[key] = value;
      if (Array.isArray(value)) {
        value.forEach(item => {
          if (item && typeof item === 'object' && ('label' in item || 'fn' in item)) captured.push(item);
        });
      }
      return true;
    },
  });
  sandbox.window = proxy;
  sandbox.window.window = proxy;
  try { vm.runInContext(src, vm.createContext(sandbox), { timeout: 3000 }); } catch (_) {}
  const extra = [];
  for (const key of Object.keys(sandbox.window)) {
    const val = sandbox.window[key];
    if (Array.isArray(val)) {
      val.forEach(item => {
        if (item && typeof item === 'object' && ('label' in item || 'fn' in item) && !captured.includes(item)) extra.push(item);
      });
    }
  }
  return [...captured, ...extra];
}

const choices = loadChoices(filePath);
const date = new Date().toISOString().slice(0, 10);

const findings = { fail: [], warn: [] };
const bLines = { b1: [], b2: [], b3: [], b4: [], b5: [] };

let choiceIndex = 0;
for (const choice of choices) {
  choiceIndex++;
  const label = (choice.label || '(no label)').slice(0, 50);
  if (typeof choice.fn !== 'function') continue;
  const fnSrc = choice.fn.toString();
  const results = extractResultStrings(fnSrc);

  for (const text of results) {
    const r = checkResultWordCount(text);
    if (r && r.level === 'fail') findings.fail.push(`A1/A2 [choice ${choiceIndex} "${label}"]: ${r.msg}`);
    if (r && r.level === 'warn') findings.warn.push(`A2 [choice ${choiceIndex} "${label}"]: ${r.msg}`);
    const r3 = checkResultOpener(text);
    if (r3) findings.fail.push(`A3 [choice ${choiceIndex} "${label}"]: ${r3.msg}`);
    // B1 heuristic: flag short results and any result that starts with a verb as possible procedural opener
    if (results.length > 0) bLines.b1.push(`choice ${choiceIndex}`);
  }

  const rumorTexts = extractRumorTexts(fnSrc);
  for (const text of rumorTexts) {
    const r4 = checkRumorSource(text);
    if (r4) findings.fail.push(`A4 [choice ${choiceIndex} "${label}"]: ${r4.msg}`);
    bLines.b3.push(`choice ${choiceIndex}`);
  }

  const timingIssues = checkNpcFlagTiming(fnSrc);
  for (const issue of timingIssues) findings.fail.push(`A5 [choice ${choiceIndex} "${label}"]: ${issue.msg}`);

  const r6 = checkWorldClockTransparency(fnSrc);
  if (r6) findings.warn.push(`A6 [choice ${choiceIndex} "${label}"]: ${r6.msg}`);

  // B2: note any choice with named NPCs (heuristic: met_ flags)
  if (/G\.flags\.met_/.test(fnSrc)) bLines.b2.push(`choice ${choiceIndex}`);
  // B4: note combat choices (heuristic: enterCombat or rollD20)
  if (/enterCombat|rollD20/.test(fnSrc)) bLines.b4.push(`choice ${choiceIndex}`);
  // B5: flag all NPC-heavy choices for subtext check
  if (/G\.flags\.met_|addNarration/.test(fnSrc)) bLines.b5.push(`choice ${choiceIndex}`);
}

const blocked = findings.fail.length > 0;
const statusLine = blocked
  ? '> ⛔ BLOCKED — fix automated failures before human review'
  : '> ✅ Automated gate passed — proceed to human review';

const report = `# Content Review — ${filename}
Date: ${date}

${statusLine}

## Automated Gate (Layer A)

### Failures (${findings.fail.length})
${findings.fail.length === 0 ? '_None_' : findings.fail.map(f => `- FAIL: ${f}`).join('\n')}

### Warnings (${findings.warn.length})
${findings.warn.length === 0 ? '_None_' : findings.warn.map(w => `- WARN: ${w}`).join('\n')}

## Human Review Checklist (Layer B)

- [ ] **B1 — Scene openings** (check all ${bLines.b1.length} choices with result text — do they open with observable action or sensory detail?)
- [ ] **B2 — NPC register/tell** (NPC-flagged choices: ${bLines.b2.join(', ') || 'none detected'})
- [ ] **B3 — Rumor source texture** (rumor choices: ${bLines.b3.join(', ') || 'none'})
- [ ] **B4 — Combat result vividness** (combat choices: ${bLines.b4.join(', ') || 'none'})
- [ ] **B5 — Subtext** (NPC scenes: ${bLines.b5.slice(0, 10).join(', ') || 'none'}${bLines.b5.length > 10 ? ` + ${bLines.b5.length - 10} more` : ''})

## Decision

Status:
Date:
Notes:
`;

if (!fs.existsSync(REVIEWS_DIR)) fs.mkdirSync(REVIEWS_DIR, { recursive: true });
const outPath = path.join(REVIEWS_DIR, `${filename}-review.md`);
fs.writeFileSync(outPath, report);

const summary = `${filename}: ${findings.fail.length} FAIL, ${findings.warn.length} WARN — report saved to docs/reviews/${filename}-review.md`;
if (findings.fail.length > 0) console.error(summary);
else console.log(summary);
process.exit(findings.fail.length > 0 ? 1 : 0);
```

- [ ] **Step 2: Add script to package.json**

In `package.json`, add to the `scripts` block:

```json
"review:content": "node tests/content/review-content.js"
```

- [ ] **Step 3: Smoke test the reporter**

```
node tests/content/review-content.js nomdara_stage1_enriched_choices.js
```

Expected: prints summary line, creates `docs/reviews/nomdara_stage1_enriched_choices.js-review.md`

```
cat docs/reviews/nomdara_stage1_enriched_choices.js-review.md | head -30
```

Expected: report with date header, gate section, and B checklist visible

- [ ] **Step 4: Commit**

```
git add tests/content/review-content.js package.json docs/reviews/
git commit -m "feat(standards): review-content.js per-file report generator"
```

---

## Task 8: CONTENT_STANDARDS.md — Human Review Items (B1–B5)

**Files:**
- Modify: `docs/CONTENT_STANDARDS.md`

- [ ] **Step 1: Append B-items to CONTENT_STANDARDS.md**

Append:

```markdown
---

## Human Review Items (B1–B5)

These checks require judgment — they cannot be fully automated. Run them once per content file using the review report generated by `review-content.js`.

---

## B1 — Scene Openings

**Check:** Does every result text open with an observable action, physical environment, or sensory detail? Or does it open with procedural summary, NPC dialogue tag, or editorial framing?

**Pass signal:** *"Aurek sets the ledger down without looking at it."* (observable action — player is in the scene)

**Fail signal:** *"Aurek confirms the figures match."* (procedural summary — player is above the scene)

NPC dialogue as an opener is a judgment call: it's acceptable if it lands the player *in* the scene, not if it's a verdict ("She says you're right.").

---

## B2 — NPC Register and Tell

**Check:** For any named NPC appearing in dialogue — does their speech pattern match their dossier register? Does their physical tell appear at least once per scene?

Every named NPC in this game has three required properties: Agenda, Register, Tell. The tell must be specific enough that no other NPC would do it.

**Wrong:** "she folds her hands."
**Right:** "her thumb finds the chalk edge of the ward mark in the doorframe without her seeming to notice it."

Cross-check against `content/npc_dossiers.js` or the V33_2 named NPC files at `data/reference/V33_2_extracted/V33_2_DnD_Repository/02_CANON_BASELINE/named_npcs/`.

---

## B3 — Rumor Source Texture

**Check:** Does the rumor feel like it was overheard in a specific place, at a specific time, from a specific social register? Or does it read like a clean summary with a source label?

A4 checks for the mechanical presence of attribution. B3 checks whether the attribution feels *lived in*.

**Fail (passes A4, fails B3):** "A merchant said the cart was turned away." (attribution is present but feels like a label, not a voice)

**Pass:** "The Guildhall factor on the third floor — the one who always smells of pitch and moves like he's counting steps — said the cart was turned away before the manifest was stamped." (attribution is embedded in texture)

---

## B4 — Combat Result Vividness

**Check:** Do combat outcomes (press/defend results) include at least one specific physical detail — a body part, a weapon behavior, a surface, a sound?

No: "You win the fight." / "The enemy falls."

Yes: "The baton catches your forearm — you feel it in the wrist. He steps back and gives you the alley." (specific weapon, specific body location, specific spatial resolution)

Combat is the highest-stakes moment in most encounters. Generic outcomes flatten it.

---

## B5 — Subtext

**Check:** Does every named NPC scene have at least one layer of subtext — something the NPC wants but doesn't say directly?

If every NPC line can be taken at face value, the scene is flat. NPCs in Ledger of Ash have agendas independent of the player. Those agendas should be visible through behavior, register, and what is not said.

**No subtext:** "She tells you the permit is expired and you need to renew it." (NPC delivers information, no agenda visible)

**With subtext:** "She tells you the permit is expired. She doesn't ask where you got it. She slides the renewal form across without uncapping her pen." (she knows something is wrong; she's deciding whether to act on it; the uncapped pen is the tell)
```

- [ ] **Step 2: Commit**

```
git add docs/CONTENT_STANDARDS.md
git commit -m "docs(standards): B1-B5 human review items in CONTENT_STANDARDS.md"
```

---

## Verification Checklist

After all 8 tasks:

- [ ] `npx jest tests/content/validate-content.rules.test.js --no-coverage` — all tests pass
- [ ] `node tests/content/validate-content.js 2>&1 | tail -5` — runs without crash, reports violations + warnings
- [ ] `node tests/content/review-content.js cosmoria_stage2_enriched_choices.js` — generates report in `docs/reviews/`
- [ ] Open `docs/reviews/cosmoria_stage2_enriched_choices.js-review.md` — verify gate section and B checklist are populated
- [ ] Introduce A3 violation: change a result text to start with "Confirms…", re-run validator — FAIL fires
- [ ] Introduce A6 violation: add `G.worldClocks.pressure++` to a choice fn without consequence word, re-run — WARN fires
- [ ] Fix the violations — re-run — clean
