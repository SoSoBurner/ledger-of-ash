# Post-Playtest Repair Plan — 2026-05-30

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all issues surfaced in the 2026-05-30 playtest session: one P0 dead-end, two P1 verification gaps, and 84 persistent WARN-level content violations.

**Architecture:** All fixes target `ledger-of-ash.html` (Stage I shelkopolis dead-end) and Stage II content files (WARN expansions). No new systems. Surgical edits only.

**Tech Stack:** Vanilla ES5 JS, Playwright for verification, `node tests/content/validate-content.js` for content checks.

---

## Playtest Session Summary (2026-05-30)

### Validators
- `validate-content.js`: 0 FAIL, 84 WARNs (pre-existing, result texts 52–59 words)
- `validate-flags.js`: PASS
- `validate-structure.js`: PASS

### Headless Spec — 4/4 SUCCESS
| Family | Archetype | Attempts | Picks |
|---|---|---|---|
| classic-combat | warrior/w_roaz | 2 | 147 |
| magic-spellcasting | ranger/r_sheresh | 3 | 164 |
| stealth-precision | beastmaster/bm_soreheim | 2 | 205 |
| support-leadership | artificer/af_guild | 1 | 164 |

**Dead-end found:** `classic-combat/knight` pick 99 at `shelkopolis`, Stage I — `html=""` (no choices rendered). sp1=21, tension=0.

### UI Screencapture Review — 8/10 PASS
| Feature | Status | Note |
|---|---|---|
| F1 Stage I HUD REPUTATION | PASS | label + goal line correct |
| F2 Archetype confirmation toast | PASS | All 31 archetypes work |
| F3 Combat coaching toast | PASS | One-time flag working |
| F4 Combat border dots | PASS | CSS rules confirmed |
| F5 Stage DC modifier | PARTIAL | Present in `<span>` path; not confirmed in `.roll-result` div path |
| F6 Abilities tab | PASS | Panel renders with ability data |
| F7 Traits tab | PASS | Both archetype + background traits shown |
| F8 HUD trait badge | PASS | `#hud-trait-ready` in DOM |
| F9 Roll skill names | PARTIAL | Test inconclusive — opening scene didn't fire a roll |
| F10 Camp buttons hidden | PASS | `display:none` confirmed before `maren_oss_resolved` |

---

## Files Modified

| File | Tasks |
|---|---|
| `ledger-of-ash.html` | Task 1 (shelkopolis dead-end) |
| `content/unity_square_stage2_enriched_choices.js` | Task 3 (WARN expansions) |
| `tests/e2e/ui-feature-review.spec.js` | Task 2 (roll name test) |

---

## Task 1: Fix shelkopolis Stage I dead-end at pick ~99 (P0)

**Files:**
- Modify: `ledger-of-ash.html` (Stage I enriched choice at shelkopolis — find around the choice that leaves html="" at pick 99)

**Context:** The dead-end occurs with knight archetype in Stage I at shelkopolis around pick 99. html="" means `loadStageChoices()` was not called after a result/failResult branch. sp1=21 means well past the boss trigger window — likely a post-boss or high-sp1 Stage I branch.

- [ ] **Step 1: Locate the dead-end branch**

Search `ledger-of-ash.html` for Stage I shelkopolis choices that could produce empty choice sets:
```bash
grep -n "shelkopolis" ledger-of-ash.html | grep -v "\/\/" | head -30
```
Then search content files:
```bash
grep -rn "loadStageChoices\|failResult" content/shelkopolis_stage2_enriched_choices.js | grep -v "loadStageChoices" | head -20
```
Look for `failResult` or `result` branches that set `G.lastResult` but do NOT end with `loadStageChoices()`.

- [ ] **Step 2: Also check Stage I choices for shelkopolis in the main engine**

```bash
grep -n "shelkopolis\|SHELKOPOLIS" ledger-of-ash.html | grep -i "choice\|result\|fn:" | head -20
```

The dead-end may also be in `content/shelkopolis_stage1_enriched_choices.js` if that file exists:
```bash
ls content/ | grep -i shelk
```

- [ ] **Step 3: Fix the missing loadStageChoices() call**

Pattern to find:
```js
failResult: function() {
  G.lastResult = '...some text...';
  // MISSING: loadStageChoices() call here
}
```

Fix:
```js
failResult: function() {
  G.lastResult = '...existing text...';
  loadStageChoices();  // add this
}
```

Same fix applies to any `result:` branches missing the call.

- [ ] **Step 4: Verify — run headless spec**

```bash
npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line
```

Expected: 4/4 SUCCESS, `[coverage] dead-ends: 0`

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html content/shelkopolis_stage*_enriched_choices.js
git commit -m "fix(content): add missing loadStageChoices() in shelkopolis Stage I dead-end branch"
```

---

## Task 2: Deepen roll skill name test to confirm F9 (P1)

**Files:**
- Modify: `tests/e2e/ui-feature-review.spec.js`

**Context:** F9 test was PARTIAL because the opening scene for warrior/w_roaz didn't trigger a standard roll-result div on first click. Need to click 3-5 times to ensure a roll fires.

- [ ] **Step 1: Update F9 test to click until a roll fires**

In `tests/e2e/ui-feature-review.spec.js`, find the F9 test and replace the single-click logic with a retry loop:

```js
// F9: Roll skill names — retry up to 5 clicks to find a roll
let rollText = '';
for (let i = 0; i < 5; i++) {
  const btns = await page.$$('.choice-btn:visible');
  if (btns.length > 0) await btns[0].click();
  await page.waitForTimeout(400);
  rollText = await page.$eval('#narrative-content', el => el.innerHTML).catch(() => '');
  if (rollText.includes('d20') || rollText.includes('roll')) break;
}
const hasOldKey = /\b(lore|combat|survival|stealth|persuasion)\b/i.test(rollText);
const hasNewKey = /\b(Wits|Might|Vigor|Charm|Finesse|Spirit)\b/.test(rollText);
result.status = hasOldKey ? 'FAIL' : hasNewKey ? 'PASS' : 'PARTIAL';
result.detail = hasOldKey 
  ? 'OLD key found in roll text — rekey not working'
  : hasNewKey ? 'New display keys confirmed' : 'No roll fired after 5 clicks';
```

- [ ] **Step 2: Run updated spec**

```bash
npx playwright test tests/e2e/ui-feature-review.spec.js --reporter=line
```

Expected: F9 shows PASS (new display keys in roll text) or FAIL (old keys present — then escalate to P0 bug).

- [ ] **Step 3: If F9 = FAIL — escalate**

If old keys (`lore`, `combat`, etc.) appear in roll text, the G.skills rekey has a regression. File as P0 and fix `_KEY_NORM` in `rollD20()` at `ledger-of-ash.html` ~line 11950.

- [ ] **Step 4: Commit if spec was changed**

```bash
git add tests/e2e/ui-feature-review.spec.js
git commit -m "test(ui): deepen F9 roll skill name check to retry 5 clicks"
```

---

## Task 3: Expand 84 WARN result texts to clear 60-word floor (P2)

**Files:**
- Modify: `content/unity_square_stage2_enriched_choices.js` (6 WARN entries)

**Context:** `validate-content.js` shows 84 WARNs — result texts at 52–59 words (target 60–90). These are WARN not FAIL, but worth clearing. The unity_square file is the primary remaining source.

- [ ] **Step 1: Get exact list**

```bash
node tests/content/validate-content.js 2>&1 | grep "WARN.*unity_square\|WARN.*result text short" | head -20
```

- [ ] **Step 2: Expand each sub-60-word result text by 1–2 sentences**

For each short result text in `content/unity_square_stage2_enriched_choices.js`:
- Add 1 concrete sensory detail (what the player sees/hears/smells/feels through action)
- OR add 1 consequence detail (what the NPC does next, what gets logged, what door closes)
- Do NOT add internal monologue, forbidden words, or editorial framing
- Do NOT change mechanical outcomes, DC values, xpReward, or `G.stageProgress` logic

- [ ] **Step 3: Verify**

```bash
node tests/content/validate-content.js 2>&1 | grep -c "WARN"
```

Expected: WARN count reduced from 84.

- [ ] **Step 4: Commit**

```bash
git add content/unity_square_stage2_enriched_choices.js
git commit -m "fix(content): expand sub-60-word result texts in unity_square to clear WARN floor"
```

---

## Task 4: Verify Stage DC modifier renders on authority encounter path (F5 follow-up, P1)

**Files:**
- Read: `ledger-of-ash.html` (~line 12258 for DC modifier, ~line 13800 for authority encounter render path)

**Context:** F5 PARTIAL — the DC modifier appends to `.roll-result` div, but authority confrontation path uses `<span>` elements. Need to confirm the modifier also appears on the span path.

- [ ] **Step 1: Find both render paths in rollD20**

```bash
grep -n "roll-result\|span.*d20\|_stageRoman\|pressure" ledger-of-ash.html | head -20
```

- [ ] **Step 2: Confirm modifier is present on BOTH paths**

There should be a `_stageNum > 0 ? ' (Stage ...) ' : ''` append on BOTH:
- The `.roll-result` div path
- The authority `<span>` path (if different code generates it)

If the authority path doesn't include the modifier, add it.

- [ ] **Step 3: Update F5 test to check both paths**

In `tests/e2e/ui-feature-review.spec.js`, update F5:
```js
// Check both render paths for the stage modifier
const narrativeHTML = await page.$eval('#narrative-content', el => el.innerHTML).catch(() => '');
const hasPressure = narrativeHTML.includes('pressure') || narrativeHTML.includes('Stage II');
result.status = hasPressure ? 'PASS' : 'PARTIAL';
```

- [ ] **Step 4: Run updated spec**

```bash
npx playwright test tests/e2e/ui-feature-review.spec.js --reporter=line
```

Expected: F5 = PASS.

- [ ] **Step 5: Commit if code was changed**

```bash
git add ledger-of-ash.html tests/e2e/ui-feature-review.spec.js
git commit -m "fix(engine): ensure stage DC modifier shows on authority encounter roll path"
```

---

## Verification (Final)

After all 4 tasks:

```bash
# 1. Content validator
node tests/content/validate-content.js
# Expected: 0 FAIL, <84 WARNs

# 2. Headless spec
npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line
# Expected: 4/4 SUCCESS, dead-ends: 0

# 3. UI feature review
npx playwright test tests/e2e/ui-feature-review.spec.js --reporter=line
# Expected: 10/10 PASS (0 PARTIAL)
```

---

## Headed Spec (Pending)

The full headed spec (`tests/e2e/playtest-headed.spec.js`) was running at plan-write time. After it completes:

```bash
node tests/e2e/post-run-analysis.js
```

Read `test-results/playtest-analysis-*.md` for 12-domain screenshot analysis. If new P0/P1 issues surface, append them to this plan as Task 5+.
