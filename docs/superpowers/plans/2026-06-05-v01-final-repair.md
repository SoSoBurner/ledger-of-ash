# Ledger of Ash V0.1 Final Repair — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all P0/P1 engine + content bugs across Stages 1 and 2 for a fully playable V0.1 release.
**Architecture:** Single-file text RPG; engine in `ledger-of-ash.html` (~16K lines vanilla ES5); content in `content/*.js`; no bundler.
**Tech Stack:** Vanilla ES5 JS, Playwright E2E (`tests/e2e/`), Node.js validators (`tests/validators/`)

---

## Already Completed (Do NOT Re-Implement)

| Done | Commit | What |
|------|--------|------|
| ✅ | `3d64fa34` | `adaptEnrichedChoice` re-throw fix + `c.fn` validation |
| ✅ | `89eef723` | `G.lastResultType` from `_lastRollInfo`; `failResult` gate uses rolled skill |
| ✅ | `21b322b9` | Fairhaven content: family case + sideplot hook |
| ✅ | `d94ed31e,62da7c09,e05cfa11,1678cfbb,086e1890,de15d657` | Skill key normalization ~1,234 replacements across 66 files |
| ✅ | `aff25b15` | Fairhaven mill displacement: `text`→`label`, `result`→`fn` |

---

## File Map

| File | Tasks |
|------|-------|
| `ledger-of-ash.html` | A1–A10 |
| `content/stage2_climax.js` | A5 (remove companion flag set from climax) |
| `content/stage1_*.js`, `content/stage2_*.js`, `content/*_arc.js` | B1, B2, B3 |
| `tests/e2e/playtest-headless.spec.js` | C1, C2 |
| `js/` (18 dead files, keep `loa-enriched-bridge.js`) | C3 |

---

## Stream A — `ledger-of-ash.html` (Sequential — One Agent)

### Task A1: Eager-Init `factionClocks` in `getDefaultG()`

**Files:** `ledger-of-ash.html` ~line 10031 (getDefaultG), ~line 2887 (lazy-init guard)

- [ ] **Step 1:** `grep -n "factionClocks" ledger-of-ash.html | head -20`

- [ ] **Step 2:** In `getDefaultG()`, find `factionClocks: null,`. Replace with:
  ```js
  factionClocks: typeof FACTION_CLOCKS !== 'undefined' ? JSON.parse(JSON.stringify(FACTION_CLOCKS)) : {},
  ```

- [ ] **Step 3:** Find and delete the lazy-init guard at ~line 2887:
  ```js
  if (!G.factionClocks) G.factionClocks = ...
  ```
  Also delete `if (typeof initFactionClocks === 'function') G.factionClocks = null;` at ~line 10590 (resets to null — wrong).

- [ ] **Step 4:** `node tests/validators/validate-all.js 2>&1 | tail -10` — Expected: 0 errors

- [ ] **Step 5:**
  ```bash
  git add ledger-of-ash.html
  git commit -m "fix(engine): eager-init factionClocks in getDefaultG"
  ```

---

### Task A2: Fix `worldClocks.attention` → `.pressure`

**Files:** `ledger-of-ash.html` ~lines 9885–9888 + getDefaultG()

- [ ] **Step 1:** `grep -n "worldClocks\.attention" ledger-of-ash.html`

- [ ] **Step 2:** Change `G.worldClocks.attention` → `G.worldClocks.pressure` at every WRITE site.
  Also check getDefaultG() for `worldClocks: { attention: 0 }` → `{ pressure: 0 }`.

- [ ] **Step 3:** Confirm 0 remaining: `grep -n "worldClocks\.attention" ledger-of-ash.html`

- [ ] **Step 4:** Fix companion onboarding text:
  ```bash
  grep -n "companion\|Vorath\|Mira" ledger-of-ash.html | grep -i "tutorial\|onboard\|tip\|how.to\|start"
  ```
  Reword any text implying companions available from start → "after completing Stage I".

- [ ] **Step 5:**
  ```bash
  node tests/validators/validate-all.js 2>&1 | tail -10
  git add ledger-of-ash.html
  git commit -m "fix(engine): worldClocks.attention -> .pressure; fix companion onboarding timing text"
  ```

---

### Task A3: Add 6 No-Op Cases to `applyEffect()`

**Files:** `ledger-of-ash.html` ~line 12883

- [ ] **Step 1:** `grep -n "function applyEffect\|case 'access'\|case 'trade'" ledger-of-ash.html | head -20`

- [ ] **Step 2:** Add before `default:` in the switch:
  ```js
  case 'access':
  case 'trade':
  case 'harbor':
  case 'frontier':
  case 'labor':
  case 'academic':
    console.warn('[applyEffect] unimplemented effect type:', eff.type);
    break;
  ```

- [ ] **Step 3:**
  ```bash
  node tests/validators/validate-all.js 2>&1 | tail -10
  git add ledger-of-ash.html
  git commit -m "fix(engine): add no-op cases for 6 unimplemented applyEffect types"
  ```

---

### Task A4: SEMANTIC Tag Classification Audit (**REVIEW PAUSE**)

**Files:** Read-only: `ledger-of-ash.html` ~lines 11247–11248

- [ ] **Step 1:** `grep -n "SEMANTIC_SAFE_TAGS\|SEMANTIC_BOLD_TAGS" ledger-of-ash.html | head -5`
  Read both arrays.

- [ ] **Step 2:**
  ```bash
  grep -roh "tag: '[^']*'" content/ | sort | uniq -c | sort -rn | head -50
  ```
  List tags NOT in either array.

- [ ] **Step 3:** Build classification table with SAFE/RISKY/BOLD + confidence level.

- [ ] **Step 4: STOP — Present table to user. Do NOT write code yet.**

---

### Task A4b: Apply Approved SEMANTIC Classifications

**Files:** `ledger-of-ash.html` ~lines 11247–11248
**Prerequisite:** User approved the A4 table.

- [ ] **Step 1:** Add approved SAFE tags to `SEMANTIC_SAFE_TAGS`.
- [ ] **Step 2:** Add approved BOLD tags to `SEMANTIC_BOLD_TAGS`.
- [ ] **Step 3:** Check for 'Meaningful': `grep -r "tag.*[Mm]eaningful" content/` — add to SAFE if found.
- [ ] **Step 4:**
  ```bash
  node tests/validators/validate-all.js 2>&1 | tail -10
  git add ledger-of-ash.html
  git commit -m "fix(engine): classify SEMANTIC_SAFE/BOLD_TAGS — unify choice risk tier display"
  ```

---

### Task A5: Companion Gate Fix

**Files:** `ledger-of-ash.html` (checkStageAdvance ~line 13393; camp UI ~line 17595–17598); `content/stage2_climax.js` line ~157

**Context:** `companion_gate_open` set only at Stage II climax (too late). Move to Stage I→II in checkStageAdvance(). Camp UI checks `maren_oss_resolved` (wrong) → `companion_gate_open`.

- [ ] **Step 1:** `grep -n "stage1_narrative_complete\|Stage II\|stageProgress\[2\]" ledger-of-ash.html | head -20`

- [ ] **Step 2:** In `checkStageAdvance()` Stage I→II block, add:
  ```js
  G.flags.companion_gate_open = true;
  ```

- [ ] **Step 3:** In `content/stage2_climax.js` ~line 157, delete:
  ```js
  G.flags.companion_gate_open = true;
  ```
  Keep `G.flags.maren_oss_resolved = true;` (~line 156).

- [ ] **Step 4:** At camp UI ~line 17595, change `!G.flags.maren_oss_resolved` → `!G.flags.companion_gate_open`.

- [ ] **Step 5:**
  ```bash
  node tests/validators/validate-all.js 2>&1 | tail -10
  git add ledger-of-ash.html content/stage2_climax.js
  git commit -m "fix(engine): move companion_gate_open to Stage I→II; fix camp UI gate check"
  ```

---

### Task A6: Quest Closure at Stage I→II

**Files:** `ledger-of-ash.html` ~line 13393

- [ ] **Step 1:** `grep -rn "questId:" content/ | grep -v stage2 | head -20` — list Stage I quest IDs.

- [ ] **Step 2:** Add near `checkStageAdvance()`:
  ```js
  function resolveStage1Quests() {
    var ids = [/* actual Stage I questIds from Step 1 */];
    ids.forEach(function(qid) {
      if (G.questHints && G.questHints[qid]) {
        G.questHints[qid].resolved = true;
      }
    });
  }
  ```

- [ ] **Step 3:** Call `resolveStage1Quests();` in the Stage I→II block (same block as A5).

- [ ] **Step 4:**
  ```bash
  node tests/validators/validate-all.js 2>&1 | tail -10
  git add ledger-of-ash.html
  git commit -m "fix(engine): resolve Stage I quests at Stage I→II transition"
  ```

---

### Task A7: Remove Dead `review_notes` Camp UI

- [ ] **Step 1:**
  ```bash
  grep -n "review_notes" ledger-of-ash.html
  grep -rn "review_notes" tests/
  ```
- [ ] **Step 2:** Remove camp button HTML.
- [ ] **Step 3:** Remove `case 'review_notes':` from `campAction()`.
- [ ] **Step 4:** Remove how-to-play mention.
- [ ] **Step 5:** Remove test references.
- [ ] **Step 6:**
  ```bash
  node tests/validators/validate-all.js 2>&1 | tail -10
  git add ledger-of-ash.html tests/
  git commit -m "fix(engine): remove dead review_notes camp UI and handler"
  ```

---

### Task A8: Remove Dead `G.contacts` and `G.discoveries`

- [ ] **Step 1:** Confirm unused:
  ```bash
  grep -n "G\.contacts\b" ledger-of-ash.html | grep -v "getDefaultG\|^\s*//"
  grep -n "G\.discoveries\b" ledger-of-ash.html | grep -v "getDefaultG\|^\s*//"
  ```
  Expected: 0 meaningful sites.
- [ ] **Step 2:** Delete `contacts: {},` and `discoveries: [],` from `getDefaultG()`.
- [ ] **Step 3:**
  ```bash
  node tests/validators/validate-all.js 2>&1 | tail -10
  git add ledger-of-ash.html
  git commit -m "fix(engine): remove dead G.contacts and G.discoveries from getDefaultG"
  ```

---

### Task A9: Add `console.error` at Critical Silent Catch Sites

- [ ] **Step 1:** `grep -n "} catch" ledger-of-ash.html | grep -v "console\." | head -20`
- [ ] **Step 2:** In `adaptEnrichedChoice`, `loadStageChoices`, `applyEffect`, `resolveArrival` catches:
  ```js
  } catch(e) {
    console.error('[FUNCTION_NAME] error:', e);
  ```
- [ ] **Step 3:**
  ```bash
  git add ledger-of-ash.html
  git commit -m "fix(engine): add console.error to critical silent catch sites"
  ```

---

### Task A10: Rival Clock Narration Beats

- [ ] **Step 1:** `grep -n "rivalClock\|rival.*[Cc]lock\|worldClocks.*rival" ledger-of-ash.html | head -20`
- [ ] **Step 2:** After each rival clock increment:
  ```js
  var _rc = G.worldClocks.rival || 0;
  if (_rc === 3) addJournal('A shadow follows your trail — you sense you are being tracked.', 'event');
  if (_rc === 6) addJournal('The pursuit grows closer. Your rival has found your path.', 'event');
  if (_rc === 9) addJournal('Danger: your rival is nearly upon you. Resolve this soon.', 'event');
  ```
- [ ] **Step 3:**
  ```bash
  node tests/validators/validate-all.js 2>&1 | tail -10
  git add ledger-of-ash.html
  git commit -m "fix(engine): rival clock narration beats at thresholds 3/6/9"
  ```

---

## Stream B — `content/*.js` (Parallel Agents)

### Task B1: `plot:'main'` Audit

- [ ] Dispatch spec-miner (read-only): "What does `plot:'main'` do in the engine? Which choices need it?"
- [ ] Dispatch code-reviewer (read-only): "Audit content/stage*.js and content/*_arc.js for choices missing `plot:'main'` that advance story/stage/boss. List HIGH-confidence only with file:line."
- [ ] Apply HIGH-confidence corrections only.
- [ ] `node tests/validators/validate-all.js 2>&1 | tail -10`
- [ ] `git add content/ && git commit -m "fix(content): add missing plot:'main' to stage advancement choices"`

### Task B2: Forbidden Words Fix

- [ ] Find:
  ```bash
  grep -rn "\binvestigation\b\|\bcontact\b\|\bofficial\b" content/ --include="*.js" \
    | grep -v "^\s*//" | grep -v "addJournal\|questId\|npcId\|key:"
  ```
- [ ] Paraphrase: investigation→inquiry/search, contact→informant/ally, official→functionary/clerk.
- [ ] Confirm 0 remaining. Commit: `fix(content): paraphrase forbidden words in player-visible text`

### Task B3: `addJournal()` Category Audit

- [ ] `grep -rn "addJournal(" content/ | head -60`
- [ ] Valid categories: `'event'`, `'quest'`, `'location'`, `'combat'`, `'item'`
- [ ] Map invalid → `'event'`. Commit if fixes found: `fix(content): correct addJournal category arguments`

---

## Stream C — Tests + Git Ops

### Task C1: Headless `% 5` → `% 3`

- [ ] `grep -n "% 5" tests/e2e/playtest-headless.spec.js` → change to `% 3`
- [ ] Verify + commit: `fix(tests): headless spec % 5 → % 3 for broader path coverage`

### Task C2: Economy Telemetry in Headless Spec

- [ ] After each pick, add:
  ```js
  const econ = await page.evaluate(function() {
    return { xp: G.xp, gold: G.gold,
      sp1: G.stageProgress[1], sp2: G.stageProgress[2],
      level: G.level, stage: G.stage };
  });
  console.log('[pick ' + pickCount + '] xp=' + econ.xp + ' gold=' + econ.gold +
    ' sp1=' + econ.sp1 + ' sp2=' + econ.sp2 + ' L' + econ.level + ' ' + econ.stage);
  ```
- [ ] Verify + commit: `fix(tests): add economy telemetry per pick in headless spec`

### Task C3: Remove 18 Dead `js/` Files

- [ ] `ls js/` — note all files EXCEPT `loa-enriched-bridge.js`
- [ ] `git rm` all dead files
- [ ] Verify: `ls js/` → only `loa-enriched-bridge.js`
- [ ] Commit: `chore: remove 18 dead js/ files — loa-enriched-bridge.js is the only loaded file`

---

## Execution Order

| Wave | What | Who |
|------|------|-----|
| 0 | Fairhaven unstaged check | Main ✅ DONE |
| 1a | A1 → A2 → A3 | Stream A agent (sequential) |
| 1b | C3 (git rm dead js/) | Stream C agent (parallel with 1a) |
| 2 | A4 (SEMANTIC table) — **PAUSE for user review** | Stream A |
| 3 | A4b (after approval) + B1+B2+B3 | A sequential + B parallel |
| 4 | A5 + A6 (companion gate + quest closure) | Stream A |
| 5 | A7 + A8 + A9 + A10 | Stream A |
| 6 | C1 + C2 (test fixes) | Stream C |
| Final | Validators + headless + headed | Verification |

---

## Verification

```bash
node tests/validators/validate-all.js 2>&1 | tail -20
npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line 2>&1 | tail -30
npx playwright test tests/e2e/playtest-headed.spec.js --reporter=line 2>&1 | tail -30
```

**Pass criteria:** 0 validator errors; 4/4 headless families; economy telemetry visible; companions recruitable post-Stage-I; 0 forbidden words in player-visible text; no silent TypeErrors swallowed.
