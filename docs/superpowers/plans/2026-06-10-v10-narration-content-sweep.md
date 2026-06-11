# V1.0 Narration Triage + Content ResultType Sweep + HUD Polish — Local Branch Plan

> **STATUS: COMPLETE** — all 5 defects verified fixed in commits `47994078` + `7a856cb8` (dist rebuild). Verified by staleness audit 2026-06-10: Bug A fixed via `data-primary-outcome` targeting; dist `.scene-location` matches canonical; `_LEAK_PREFIXES` double-underscore matches producer; all 829 resultType calls swept to `(G && G.lastResultType) || X`; HUD legacy elements deleted + fatigue pill live. No execution needed.

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development`. **Phase 1 dispatches 4 parallel teams (T1/T2/T3/T4) via `agent-teams:parallel-feature-development`** with non-overlapping file/line-range ownership. **T2 internally fans out 43 per-file content sub-teams in parallel.** Phase 2 Team Lead applies patches sequentially on a local feature branch and creates 4 local commits. **No `git push` at any stage.** Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Land the V1.0 narration triage repair pass discovered in the headed playtest 20260609-2314 (after polish bundle `25540947`). Eliminate Bug A (failed roll lines attached to level-up cards), fix the dist `.scene-location` regression that ships ALL CAPS to itch, stop the combat-ability + trait id leak into choice button text, sweep the 829 hardcoded `'failure'`/`'neutral'` `resultType` calls in `content/*.js` so they consult the live roll outcome, delete four HUD legacy elements, surface fatigue as a journey-strip pill, and harden the validator to flag dynamic-but-still-wrong resultType expressions.

**Context (why now):** Playtest 20260609-2314 was 4/4 SUCCESS (337 picks, 0 JS errors) but three parallel investigation agents confirmed two CRITICAL and five HIGH defects that the green report masks. Bug A is a shell-attachment race: `adaptEnrichedChoice` calls `gainXp(c.xpReward)` at L11847 BEFORE `c.fn()` at L11848 BEFORE `emitRollLine` at L11880; on level-up, `_finalizeLevelUp` emits a `'success'` shell at L14507 BEFORE the failed roll line lands, so `entries[entries.length-1]` selection in `emitRollLine` attaches the failure under the green level-up card. Bug K is a stale dist: `dist/ledger-of-ash.html:1027-1028` still ships the pre-T1 5px-letter-spacing/uppercase `.scene-location`, so itch builds show ALL CAPS scene labels even though the canonical was fixed. The combat-ability filter at L12048 reads `'__combat_ability__'` (single underscore) but the producer at L18776 emits `'__combat__ability__'` (double underscore), so the filter is a permanent no-op and ability ids leak into choice text. 829 hardcoded outcome strings in 43 content files never check the roll — every safe-tier failure path renders the wrong color. User wants this entire bundle landed on a local-only feature branch with 4 distinct commits (no push).

**Architecture:** Single-file engine `ledger-of-ash.html` (~19K lines, vanilla ES5) + bundled `dist/ledger-of-ash.html` via `python3 build.py` + 43 `content/*.js` enriched-choice files + Jest unit harness + 3 content-validator scripts + 2 Playwright playtest specs. Four teams own non-overlapping scopes. T2 fans out 43 per-file sub-teams via `agent-teams:parallel-feature-development` because each content file is an isolated owner-boundary. Team Lead in Phase 2 applies patches sequentially on a local branch (no race) and produces 4 commits, none pushed.

**Tech Stack:** Vanilla JS (ES5), CSS (inline `<style>`), Jest (unit), Playwright (e2e), Node validators, Python `build.py` bundler.

---

## Plan Relocation

- [ ] **Step 0: Copy plan to repo docs (read-only mirror — execute from repo copy)**

```bash
mkdir -p /c/Users/CEO/ledger-of-ash/docs/superpowers/plans
cp /c/Users/CEO/.claude/plans/composed-squishing-boot.md \
   /c/Users/CEO/ledger-of-ash/docs/superpowers/plans/2026-06-10-v10-narration-content-sweep.md
```

Execute all tasks below against the repo copy.

---

## Scope Boundaries (Out of Scope)

- New content authoring beyond the 829-call resultType rewrite. No new choices, no new localities, no new NPCs, no new arc text.
- Stage 3+ work (frozen per `CLAUDE.md`).
- 5 zero-sp2 localities content debt (cosmoria, ithtananalor, mimolot, guildheart, soreheim) — separate content sprint.
- Playtest system code (`tests/e2e/playtest-*.spec.js`, helpers) — covered by Playtest Change Gate; do not touch.
- Save schema bump (current v3 handles all new runtime flags).
- New `resultType` values — T1 keeps the locked 10 (success/failure/partial/neutral/complication/notice/encounter/dim/crit/fumble).
- `git push` — **all commits stay local on the feature branch**. No remote sync at any phase.
- `ledger-of-ash-itch` branch — untouched until a separate explicit "update itch.io release" request.

---

# Pre-Flight: Branch Creation + Baseline

**Why first:** Lock a clean local branch so the four-team apply and four commits all land on the same isolated history. Capture baselines so post-merge regressions are detectable.

### Task 0: Branch + baselines

**Files (read-only baseline):** all

- [ ] **Step 1: Confirm clean main**

```bash
cd /c/Users/CEO/ledger-of-ash
git status
git log -1 --oneline
```

Expected: clean working tree, HEAD at or after commit `25540947` (V1.0 polish bundle).

- [ ] **Step 2: Create local feature branch (no push)**

```bash
git checkout -b v10-narration-content-sweep
git branch
```

Expected: now on `v10-narration-content-sweep`. **DO NOT run `git push -u origin v10-narration-content-sweep`** — the user explicitly wants local-only work.

- [ ] **Step 3: Jest baseline**

```bash
npx jest --listTests >/dev/null && npx jest
```

Capture pass/fail count. Pre-existing mastery-XP failures acceptable. Record baseline count for post-T1 comparison.

- [ ] **Step 4: Content validator baseline**

```bash
node tests/content/validate-content.js 2>&1 | tail -20
node tests/content/validate-flags.js 2>&1 | tail -5
node tests/content/validate-structure.js 2>&1 | tail -5
```

Capture warning count (838 known pre-existing per `tests/CLAUDE.md`). T2 must NOT increase this; T4 validator update may legitimately raise it by catching the 829 hardcoded resultType calls — that is the intended signal.

- [ ] **Step 5: Build.py sanity**

```bash
python3 build.py
ls -l dist/ledger-of-ash.html
```

Expected: exit 0. Note the byte size — T4 uses this as the pre-rebuild baseline.

- [ ] **Step 6: Confirm last playtest report on disk**

```bash
ls -1 tests/test-results/playtest-report-20260609-2314-headed.md
```

Expected: file exists. T5 Phase 3 re-runs the headed spec and diffs the new report against this one.

---

# Phase 1: Parallel Team Implementation

Four teams work in parallel with non-overlapping ownership. Each produces a unified diff plus a brief readme. Team Lead in Phase 2 applies all four patches sequentially on the local branch.

**Coordination contract (binding for T1/T2/T3/T4):**
- Each team reads target files fresh before editing — line numbers may have drifted.
- No team edits outside their declared scope.
- No team commits — Phase 2 handles all commits.
- No team pushes — Phase 2 explicitly skips push.
- Each team produces: `(a)` unified diff in owned scope, `(b)` brief readme, `(c)` scope-boundary confirmation.

---

## Team 1: Engine Narration / Roll-Display / Combat Round / Ability+Trait Leakage (T1)

**Why this team exists:** Bug A (failed rolls attached to level-up cards) plus four related engine defects all live in the same ~7K-line slice of `ledger-of-ash.html` (L4791–L18776). One team owning the slice avoids merge conflicts and lets the diff reviewer reason about narration + roll + combat path coherently.

**Owned scope:**
- `ledger-of-ash.html` L11606–11651 (`addNarration` — add `data-primary-outcome="true"` attribute write)
- `ledger-of-ash.html` L11647–11660 (`emitRollLine` — select by `data-primary-outcome="true"`, clear after attach, never fall back to a `neutral` shell)
- `ledger-of-ash.html` L11663–11682 (`_formatRollLine` — crit on `d20===20`, fumble on `d20===1`, both supersede math; conditional rival DC term only when nonzero)
- `ledger-of-ash.html` L11842–11948 (`adaptEnrichedChoice` — write `G.lastResultType` from roll outcome BEFORE calling `c.fn()`/`c.failResult()` so T2 content can read it; preserve gainXp-before-fn order but pass primary-outcome marker through addNarration)
- `ledger-of-ash.html` L12048 (combat-ability filter typo) → generalize to `_LEAK_PREFIXES = ['__combat__ability__', '__ability__', '__trait__']` AND check `c.kind === 'combat_ability' || c.kind === 'trait'`
- `ledger-of-ash.html` L4791–L5103 (`resolveCombatAction` — migrate inline roll-text builders at L4927/L4972/L5083 to `emitRollLine` with proper resultType; shell emit at L5103 sets `data-primary-outcome="true"`)
- `ledger-of-ash.html` L14497–L14534 (`_finalizeLevelUp` — emit level-up shell WITHOUT `data-primary-outcome` so the prior roll-line can still find the choice shell)
- `ledger-of-ash.html` L11998 (heat narration body-in-label-slot — pass body via html arg, not label arg)
- `ledger-of-ash.html` L18776 (combat-ability cid producer — confirm double-underscore form is correct producer; do not change format)

**Forbidden:** any edits to `content/*.js` (T2), HUD elements (T3), dist (T4), validators (T4).

### Task 1.1: Make addNarration tag the primary outcome shell

- [ ] **Step 1: Read L11606–11651 in context**

- [ ] **Step 2: Replace the function body so `data-primary-outcome="true"` lands on every shell emitted as the primary outcome of a choice resolution, and NOT on level-up shells or notice shells**

The signature stays `addNarration(label, html, resultType, opts)`. Add a fourth optional `opts` arg. When `opts && opts.primary === true`, write `data-primary-outcome="true"` onto the `.scroll-entry` div.

Specifically, build the entry HTML so:

```javascript
var primaryAttr = (opts && opts.primary === true) ? ' data-primary-outcome="true"' : '';
var entry =
  '<div class="scroll-entry scroll-entry--' + type + '"' + primaryAttr + '>' +
    '<span class="scroll-entry__type">' + typeLabel + '</span>' +
    headerHtml +
    '<div class="scroll-entry__body">' + bodyHtml + '</div>' +
  '</div>';
```

Preserve everything else in addNarration unchanged (counter increment, target resolution, scroll-to-bottom). The 10 type-label map stays as locked vocabulary.

### Task 1.2: Rewrite emitRollLine to select on primary-outcome attribute and clear it after attach

- [ ] **Step 1: Read L11647–11660**

- [ ] **Step 2: Replace the function body**

```javascript
function emitRollLine(rollText, resultType) {
  var target = document.getElementById('scroll')
            || document.getElementById('narrative')
            || document.querySelector('.narrative-text');
  if (!target) return;

  // Select the primary-outcome shell from THIS choice resolution, not the most-recent shell.
  var primary = target.querySelector('.scroll-entry[data-primary-outcome="true"]');
  if (primary) {
    var meta = document.createElement('span');
    meta.className = 'scroll-entry__meta';
    meta.innerHTML = rollText;
    primary.appendChild(meta);
    // Clear so the next choice does not attach to this shell.
    primary.removeAttribute('data-primary-outcome');
    return;
  }

  // No primary shell present (e.g. failure-gate path where fn() emitted nothing).
  // Emit a standalone entry of the correct resultType — NEVER fall back to 'neutral'.
  var rt = (typeof resultType === 'string' && resultType) ? resultType : 'failure';
  addNarration('', rollText, rt, { primary: false });
}
```

The non-neutral fallback (default to `'failure'`, not `'neutral'`) is the user-decided rule: a failed roll with no shell of its own should still render red.

### Task 1.3: Fix _formatRollLine — crit/fumble override, conditional rival DC term

- [ ] **Step 1: Read L11663–L11682**

- [ ] **Step 2: Replace the builder**

```javascript
function _formatRollLine(rollInfo, skillKey, dc, succeeded) {
  var skillDisplay = (skillKey || 'Untrained').charAt(0).toUpperCase() + (skillKey || 'Untrained').slice(1);
  var parts = [];
  parts.push('d20: <b>' + rollInfo.roll + '</b>');
  if (rollInfo.statValue)              parts.push(skillDisplay + ' +' + rollInfo.statValue);
  if (rollInfo.traitBonus)             parts.push('trait ' + (rollInfo.traitBonus > 0 ? '+' : '') + rollInfo.traitBonus);
  if (rollInfo.equipmentBonus)         parts.push('gear ' + (rollInfo.equipmentBonus > 0 ? '+' : '') + rollInfo.equipmentBonus);
  if (rollInfo.campoutBonus)           parts.push('rested +' + rollInfo.campoutBonus);
  if (rollInfo.sleeplessMalus)         parts.push('sleepless ' + rollInfo.sleeplessMalus);
  if (rollInfo.travelFatigueMalus)     parts.push('journey ' + rollInfo.travelFatigueMalus);
  if (rollInfo.fatigueExhaustionPenalty) parts.push('exhausted ' + rollInfo.fatigueExhaustionPenalty);

  // Conditional rival DC: render the term ONLY when nonzero. Never fold into dc and never double-print.
  if (rollInfo.rivalDcMod && rollInfo.rivalDcMod !== 0) {
    parts.push('rival DC +' + rollInfo.rivalDcMod);
  }
  if (typeof rollInfo.rangeMod === 'number' && rollInfo.rangeMod !== 0 && rollInfo.rangeMod !== -99) {
    parts.push('range ' + (rollInfo.rangeMod > 0 ? '+' : '') + rollInfo.rangeMod);
  }

  var total = rollInfo.total != null ? rollInfo.total : rollInfo.roll;

  // Crit/fumble override: d20 face supersedes math. Pass/Fail is computed from succeeded for the rest.
  var outcome;
  if (rollInfo.roll === 20)      outcome = 'Critical Success';
  else if (rollInfo.roll === 1)  outcome = 'Fumble';
  else                            outcome = succeeded ? 'Pass' : 'Fail';

  return parts.join(' \u00b7 ') + ' = <b>' + total + '</b> vs DC ' + dc + ' \u2014 ' + outcome;
}
```

The `rollInfo.roll === 20` and `rollInfo.roll === 1` branches are the user-locked override: face value beats DC math for the outcome word, regardless of what `succeeded` was computed to.

### Task 1.4: adaptEnrichedChoice — write G.lastResultType, pass primary flag, preserve gainXp order

- [ ] **Step 1: Read L11842–L11948 in full**

- [ ] **Step 2: Locate the section just before `c.fn()` is called (~L11848) and just before `c.failResult()`**

- [ ] **Step 3: Insert the `G.lastResultType` write BEFORE each fn/failResult call**

The roll outcome is determined earlier in this function (`_riSucceeded` at L11878 and related vars). Before calling fn():

```javascript
var _rt = succeeded
  ? ((G._lastRollInfo && G._lastRollInfo.roll === 20) ? 'crit' : 'success')
  : ((G._lastRollInfo && G._lastRollInfo.roll === 1) ? 'fumble' : 'failure');
if (typeof G !== 'undefined' && G) {
  G.lastResultType = _rt;
}
```

Before calling failResult():

```javascript
var _rt = (G._lastRollInfo && G._lastRollInfo.roll === 1) ? 'fumble' : 'failure';
if (typeof G !== 'undefined' && G) {
  G.lastResultType = _rt;
}
```

T2 content files will read `G.lastResultType` instead of hardcoding `'failure'`/`'neutral'`.

- [ ] **Step 4: Locate every `addNarration(...)` call inside `adaptEnrichedChoice` that emits the primary outcome shell (the shell whose roll line is what `emitRollLine` should attach to)**

For each, append `{ primary: true }` as the fourth arg. Specifically: the addNarration call that wraps `c.label`-as-success-shell or `c.failLabel`-as-failure-shell. Do NOT mark journal entries, toast notifications, or auxiliary world-notice emits as primary.

- [ ] **Step 5: Preserve the existing `gainXp(c.xpReward)` call order at L11847**

The user's locked rule: keep gainXp BEFORE c.fn() (level-up shell can still emit), but the primary-outcome attribute on the choice shell ensures emitRollLine attaches THERE and not to the level-up success shell.

### Task 1.5: Generalize ability + trait leakage filter at L12048

- [ ] **Step 1: Read L12046–L12055 in context**

The existing line is approximately:
```javascript
if (_cid && _cid.indexOf && _cid.indexOf('__combat_ability__') === 0) { /* skip render */ }
```

Note: `'__combat_ability__'` has a SINGLE underscore between `combat` and `ability`. The producer at L18776 emits `'__combat__ability__'` (DOUBLE underscore). The filter is a permanent no-op.

- [ ] **Step 2: Replace with a multi-prefix + kind-aware filter**

```javascript
var _LEAK_PREFIXES = ['__combat__ability__', '__ability__', '__trait__'];
var _isLeakedAbilityOrTrait = false;
if (_cid && typeof _cid === 'string') {
  for (var _li = 0; _li < _LEAK_PREFIXES.length; _li++) {
    if (_cid.indexOf(_LEAK_PREFIXES[_li]) === 0) { _isLeakedAbilityOrTrait = true; break; }
  }
}
if (!_isLeakedAbilityOrTrait && c && (c.kind === 'combat_ability' || c.kind === 'trait' || c.kind === 'ability')) {
  _isLeakedAbilityOrTrait = true;
}
if (_isLeakedAbilityOrTrait) {
  // skip rendering — abilities and traits surface in combat UI and char sheet only.
  continue;
}
```

The producer at L18776 is left unchanged — `'__combat__ability__'` with double underscores is now the canonical form; the filter recognizes it.

### Task 1.6: Combat round emitRollLine migration

- [ ] **Step 1: Read L4791–L5103 in context (`resolveCombatAction`)**

- [ ] **Step 2: Replace the three inline roll-text builders at L4927/L4972/L5083**

Each currently builds a string like `'d20: ' + roll + ' + ' + statValue + ' = ' + total + ' vs DC ' + dc` and either appends it inline or calls addNarration with raw HTML. Replace each with:

```javascript
var _rollLine = _formatRollLine(G._lastRollInfo || {}, _skillKey, _dc, _succeeded);
var _rollType = _succeeded
  ? ((G._lastRollInfo && G._lastRollInfo.roll === 20) ? 'crit' : 'success')
  : ((G._lastRollInfo && G._lastRollInfo.roll === 1) ? 'fumble' : 'failure');
emitRollLine(_rollLine, _rollType);
```

Where `_skillKey`, `_dc`, `_succeeded` come from the existing local vars at each call site (do not rename).

- [ ] **Step 3: At the combat shell emit ~L5103, add `{ primary: true }` as the fourth arg**

```javascript
addNarration(combatLabel, combatBodyHtml, combatResultType, { primary: true });
```

So that the emitRollLine call immediately above attaches to the combat round shell, not the prior locality shell.

### Task 1.7: Level-up shell — do NOT mark as primary

- [ ] **Step 1: Read L14497–L14534 (`_finalizeLevelUp`)**

- [ ] **Step 2: Locate the addNarration call at L14507**

```javascript
addNarration('Level ' + G.level, desc, 'success');
```

- [ ] **Step 3: Confirm no `{ primary: true }` opts arg is added**

This is the locked rule: the level-up shell is auxiliary, not the primary outcome of the choice. The choice's own shell (emitted via adaptEnrichedChoice with `{ primary: true }`) owns the roll-line attach.

### Task 1.8: Heat narration body-in-label-slot fix at L11998

- [ ] **Step 1: Read L11995–L12005 in context**

- [ ] **Step 2: Verify the addNarration call passes the heat-change body as the html arg (second param), not the label arg (first param)**

The buggy form is approximately `addNarration('Heat rose because the courier saw your face.', '', 'complication')`. The body has been placed where the locality-label would go, so the scroll renders with no body text and an oversized header.

Correct form:

```javascript
addNarration('', 'Heat rose because the courier saw your face.', 'complication', { primary: false });
```

`{ primary: false }` is explicit: a heat notice is not the primary outcome of a player choice; it accompanies one. Do NOT mark as primary.

### Task 1.9: T1 verification

- [ ] **Step 1: Grep for surviving bypasses**

```bash
grep -n "d20:" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
grep -n "roll-result\"\|roll-note\"" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
grep -n "__combat_ability__" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
grep -n "data-primary-outcome" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: `d20:` hits only inside `_formatRollLine`; zero `class="roll-result"` / `class="roll-note"` in JS code; zero `__combat_ability__` single-underscore hits (only `__combat__ability__` double in the producer at L18776 and in `_LEAK_PREFIXES`); at least 3 `data-primary-outcome` hits (addNarration write site, emitRollLine select site, emitRollLine clear site).

- [ ] **Step 2: Open `play.bat`, spawn a knight, take a risky choice that you expect to fail, then take a choice that triggers level-up**

Confirm: failed roll line attaches to the FAILED choice card (red border), NOT to the green level-up card.

- [ ] **Step 3: Trigger combat at long range with melee weapon**

Confirm: roll line shows `range -1` (or whatever the legitimate mod is), NEVER `range -99`; crit on natural 20 displays `Critical Success` not `Pass`; fumble on natural 1 displays `Fumble` not `Fail`.

- [ ] **Step 4: Trigger a heat-rise notice**

Confirm: notice renders with body in body slot, header empty, complication-orange border.

### Task 1.10: T1 produces output

T1 produces:
1. Unified diff of `ledger-of-ash.html` within owned scope
2. Brief readme: lines touched, primary-outcome attribute strategy, leak prefix list, level-up shell exclusion rationale
3. Three screenshots: failed-roll + level-up (proves Bug A fixed), combat crit/fumble (proves rule), heat notice (proves Bug K-canonical fixed)

T1 does NOT commit. T1 does NOT push. Hands to Team Lead.

---

## Team 2: Content ResultType Sweep — 829 calls in 43 files (T2)

**Why this team exists:** 829 hardcoded `'failure'`/`'neutral'` resultType strings in 43 `content/*.js` files render the wrong card color whenever the actual roll outcome diverges from the authored assumption. Engine prerequisite for the fix lives in T1 (`G.lastResultType` set in `adaptEnrichedChoice` BEFORE fn/failResult runs). Once that is in place, content swaps `'failure'` / `'neutral'` → `(G && G.lastResultType) || 'neutral'` everywhere.

**Why fan-out:** 43 files × ~19 calls/file. Sequential apply is ~6+ hours of focused work. Parallel sub-team apply is ~30 min wall clock (single-file ownership = zero conflicts).

**Owned scope:**
- 43 `content/*.js` files: every `addNarration(...)` call whose third positional arg is the string literal `'failure'` or `'neutral'` (locked in T1's vocab of 10).
- File list captured at run-time by T2's coordinator subagent via the grep below.

**T2 fan-out strategy via `agent-teams:parallel-feature-development`:**

- [ ] **Step 1: T2 coordinator subagent runs the discovery grep**

```bash
grep -rln --include="*.js" "addNarration(.*'failure')\|addNarration(.*'neutral')" /c/Users/CEO/ledger-of-ash/content/ \
  | sort -u
```

Expected: ~43 file paths. T2 coordinator counts per-file occurrences:

```bash
for f in $(grep -rln ...); do
  echo "$f $(grep -c "addNarration(.*'failure'\|addNarration(.*'neutral'" "$f")"
done | sort -k2 -n -r
```

- [ ] **Step 2: T2 coordinator dispatches one parallel implementer subagent per file (max 6 concurrent dispatches)**

Each implementer subagent owns exactly one file. Its prompt:

> File ownership: `content/<filename>.js`.
> Task: For every `addNarration(label, html, 'failure')` call in this file, replace `'failure'` with `(G && G.lastResultType) || 'failure'`. For every `addNarration(label, html, 'neutral')` call, replace `'neutral'` with `(G && G.lastResultType) || 'neutral'`. Do NOT touch any other resultType literal (`'success'`, `'partial'`, `'complication'`, `'notice'`, `'encounter'`, `'dim'`, `'crit'`, `'fumble'`). Do NOT touch label or html args. Do NOT add new addNarration calls. Do NOT remove any.
> Verify: after edit, run `node --check content/<filename>.js`. Expected: exit 0 (no syntax error). Then grep for `addNarration(.*'failure')` and `addNarration(.*'neutral')` in this file — expected: zero hits (every literal replaced).
> Output: unified diff of this file only, plus the count of replacements.
> Forbidden: any edit outside this single file.

- [ ] **Step 3: T2 coordinator collects all 43 diffs, runs final grep to confirm zero literal `'failure'` / `'neutral'` hardcoded resultType remain in `content/*.js`**

```bash
grep -rn --include="*.js" "addNarration(.*, *'failure')" /c/Users/CEO/ledger-of-ash/content/
grep -rn --include="*.js" "addNarration(.*, *'neutral')" /c/Users/CEO/ledger-of-ash/content/
```

Expected: zero hits.

- [ ] **Step 4: T2 coordinator runs combined `node --check` across all touched files**

```bash
for f in $(grep -rln ...); do node --check "$f" || echo "FAIL: $f"; done
```

Expected: zero "FAIL" lines.

- [ ] **Step 5: T2 coordinator runs content validators**

```bash
node tests/content/validate-content.js 2>&1 | tail -10
node tests/content/validate-flags.js 2>&1 | tail -5
node tests/content/validate-structure.js 2>&1 | tail -5
```

Expected: warning count not above baseline. The dynamic expression `(G && G.lastResultType) || 'failure'` is the new pattern; T4's validator update teaches the validator to accept it.

**Forbidden:** any engine edit (T1), HUD edit (T3), dist (T4), validator edit (T4).

### Task 2.6: T2 produces output

T2 produces:
1. 43 unified diffs in `content/*.js`
2. Replacement count per file (sum ≈ 829)
3. Brief readme covering the per-file fan-out + final grep proof

T2 does NOT commit. T2 does NOT push. Hands to Team Lead.

---

## Team 3: HUD Cleanup + Undefined Skill Filter + Fatigue Pill (T3)

**Why this team exists:** Five visible HUD defects span the polish bundle: four legacy DOM elements still render (companions row, hud-day, l-location wrapper, env-region regionSecond span), the skill HUD shows a literal "Undefined" entry, and players have no quick fatigue read in the journey strip. Single team owns all five because they share the `updateHUD()` render path plus inline CSS.

**Owned scope:**
- `ledger-of-ash.html` `#hud-companions` element + its updater function + any helper (full delete)
- `ledger-of-ash.html` L17935-17936 (`#hud-day` element delete)
- `ledger-of-ash.html` L2148-2151 (`<div class="l-location">` element delete) + L18033-L18034 (l-location updater) + L883/L889/L893 (l-location CSS rules delete)
- `ledger-of-ash.html` L11481 (`env-region` `regionSecond` span delete)
- `ledger-of-ash.html` ~L10862 (`updateHUD()` skill list render — filter "Undefined" skill name)
- `ledger-of-ash.html` ~L10418 (`renderCharacterSheet()` skill list render — filter "Undefined" skill name) — note: per CLAUDE.md, the function may be `showCharSheet()`; T3 must grep first to find the actual render site, not trust the name.
- `ledger-of-ash.html` journey-tab-strip — add `<span class="fatigue-pill">Fatigue 0/10</span>` + its updater
- CSS for `.fatigue-pill` + `.fatigue-pill--warn` (≥6) + `.fatigue-pill--crit` (≥9)

**Forbidden:** any engine narration/roll/combat edit (T1), any content edit (T2), dist rebuild (T4).

### Task 3.1: Delete #hud-companions row + updater + helper

- [ ] **Step 1: Grep for the companions element and its updater**

```bash
grep -n "hud-companions\|updateCompanionsHud\|renderCompanions" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

- [ ] **Step 2: Delete the element**

Find the `<div id="hud-companions">...</div>` block in the HUD HTML. Remove it entirely.

- [ ] **Step 3: Delete the updater function**

Find `function updateCompanionsHud(...)` (or whatever name the grep surfaces). Remove the entire function definition. Also remove all call sites that invoked it.

- [ ] **Step 4: Delete any helper used only by the companions HUD**

If grep shows a `renderCompanionPortrait` or similar referenced only by the deleted updater, delete it too. Leave any helper still used by other code (e.g. char sheet).

### Task 3.2: Delete #hud-day

- [ ] **Step 1: Read L17933-L17938 in context**

- [ ] **Step 2: Delete the `<div id="hud-day">...</div>` block at L17935-L17936**

- [ ] **Step 3: Grep for the updater**

```bash
grep -n "hud-day\|#hud-day" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

- [ ] **Step 4: Remove the updater write (typically `document.getElementById('hud-day').textContent = ...` in updateHUD)**

### Task 3.3: Delete <div class="l-location"> + updater + CSS

- [ ] **Step 1: Read L2146-L2153 in context, delete the `<div class="l-location">...</div>` block at L2148-L2151**

- [ ] **Step 2: Read L18030-L18036 in context, delete the updater write at L18033-L18034 (typically `document.querySelector('.l-location').textContent = ...`)**

- [ ] **Step 3: Read L881-L895 in context, delete the three CSS rules at L883, L889, L893 (each targets `.l-location`)**

### Task 3.4: Delete env-region regionSecond span

- [ ] **Step 1: Read L11479-L11484 in context**

- [ ] **Step 2: Delete the `regionSecond` span emit at L11481 (typically `'<span class="env-region-second">' + region2 + '</span>'`)**

- [ ] **Step 3: Confirm no other call site depends on `regionSecond`**

```bash
grep -n "regionSecond\|env-region-second" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: zero remaining hits after the L11481 delete.

### Task 3.5: Filter Undefined skill at HUD render

- [ ] **Step 1: Grep for the skill render loop in updateHUD**

```bash
grep -n "G.skills\|forEach.*skill\|for.*skill" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -30
```

- [ ] **Step 2: At the HUD skill-list render site (~L10862 per CLAUDE.md, confirm by grep), add the filter**

Before pushing each `(skillName, value)` pair into the rendered HTML, gate with:

```javascript
if (!skillName || typeof skillName !== 'string') return; // skip continue/skip in current loop form
var skillNameLower = skillName.toLowerCase();
if (skillNameLower === 'undefined' || skillNameLower === 'null') return;
if (skillName === 'craft') return; // craft is internal-only per CLAUDE.md G.skills table
```

- [ ] **Step 3: At the character-sheet skill render site (~L10418 per CLAUDE.md, confirm with `grep showCharSheet\|renderCharacterSheet`), apply the same filter**

Note: per CLAUDE.md "Function naming collision / nonexistent reference" memory, `renderCharacterSheet()` may not exist — the real function may be `showCharSheet()`. Grep before patching.

### Task 3.6: Add fatigue pill to journey-tab-strip

- [ ] **Step 1: Grep for the journey-tab-strip element**

```bash
grep -n "journey-tab-strip\|journey-strip" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

- [ ] **Step 2: Inside the strip's HTML, add a span**

```html
<span class="fatigue-pill" id="hud-fatigue-pill">Fatigue 0/10</span>
```

- [ ] **Step 3: In updateHUD (the function that already writes other HUD pills), add the fatigue write**

```javascript
var fp = document.getElementById('hud-fatigue-pill');
if (fp) {
  var fat = Math.max(0, Math.min(10, G.fatigue || 0));
  fp.textContent = 'Fatigue ' + fat + '/10';
  fp.classList.remove('fatigue-pill--warn', 'fatigue-pill--crit');
  if (fat >= 9) fp.classList.add('fatigue-pill--crit');
  else if (fat >= 6) fp.classList.add('fatigue-pill--warn');
}
```

- [ ] **Step 4: Append CSS to the main `<style>` block (before its closing tag)**

```css
.fatigue-pill {
  display: inline-block;
  margin: 0 6px;
  padding: 2px 8px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.06em;
  background: rgba(0, 0, 0, 0.35);
  color: rgba(216, 216, 224, 0.9);
}
.fatigue-pill--warn { background: rgba(216, 154, 44, 0.25); color: #d89a2c; }
.fatigue-pill--crit { background: rgba(190, 40, 40, 0.3); color: #e76a6a; }
```

### Task 3.7: T3 verification

- [ ] **Step 1: Grep confirms zero remaining legacy hits**

```bash
grep -n "hud-companions\|hud-day\|l-location\|regionSecond\|env-region-second" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: zero hits.

- [ ] **Step 2: Open `play.bat`, spawn a character, confirm the four deleted elements do not render**

- [ ] **Step 3: In dev console, `G.skills.undefined = 5;` and call `updateHUD()`**

Confirm: "Undefined" skill row does NOT render in the HUD.

- [ ] **Step 4: In dev console, set fatigue values and re-call updateHUD**

```javascript
G.fatigue = 3; updateHUD(); // Expect: pill shows "Fatigue 3/10", no warn class
G.fatigue = 7; updateHUD(); // Expect: pill shows "Fatigue 7/10", warn class active (gold)
G.fatigue = 10; updateHUD(); // Expect: pill shows "Fatigue 10/10", crit class active (red)
```

### Task 3.8: T3 produces output

T3 produces:
1. Unified diff of `ledger-of-ash.html` within owned scope
2. Brief readme: deleted-element inventory, skill-filter sites, fatigue-pill placement
3. Three screenshots: HUD without the four deleted elements, skill list without "Undefined", fatigue pill at each threshold

T3 does NOT commit. T3 does NOT push. Hands to Team Lead.

---

## Team 4: Dist Rebuild + Validator Updates (T4)

**Why this team exists:** Bug K (dist `.scene-location` ALL CAPS regression at `dist/ledger-of-ash.html:1027-1028`) only fixes when `python3 build.py` runs AFTER T1-T3 land. The validator currently only matches string-literal third args to `addNarration` — after T2, content files use a dynamic expression `(G && G.lastResultType) || 'failure'`, and the validator must learn to treat that as compliant while still flagging genuinely wrong cases (e.g. `addNarration('', '', 'sucess')` typo).

**Owned scope:**
- `dist/ledger-of-ash.html` (rebuild via `python3 build.py`)
- `tests/content/validate-content.js` (extend `checkResultTypeVocabulary` to recognize the dynamic expression pattern)
- `tests/content/validate-structure.js` (no expected change — only edit if T2 reveals a regression)

**Forbidden:** engine edits (T1), content rewrites (T2), HUD edits (T3).

### Task 4.1: Rebuild dist after T1+T2+T3 land

T4's work BLOCKS on T1+T2+T3 application. Phase 2 will apply T4 after the other three. The Team Lead invokes T4's dist rebuild as the second step of T4 application (the validator update is independent and can be drafted in parallel).

- [ ] **Step 1: Run the bundler**

```bash
cd /c/Users/CEO/ledger-of-ash
python3 build.py
```

Expected: exit 0; `dist/ledger-of-ash.html` regenerated.

- [ ] **Step 2: Verify dist no longer contains the pre-T1 .scene-location**

```bash
grep -n "text-transform: uppercase" /c/Users/CEO/ledger-of-ash/dist/ledger-of-ash.html | head -10
grep -n "letter-spacing: 5px" /c/Users/CEO/ledger-of-ash/dist/ledger-of-ash.html | head -5
grep -n "\.scene-location" /c/Users/CEO/ledger-of-ash/dist/ledger-of-ash.html | head -5
```

Expected: zero `text-transform: uppercase` hits on `.scene-location` selectors; zero `letter-spacing: 5px` hits; the `.scene-location` rule reflects the canonical T1 version (gold display font, 1.5px letter-spacing).

- [ ] **Step 3: Verify dist contains data-primary-outcome marker**

```bash
grep -c "data-primary-outcome" /c/Users/CEO/ledger-of-ash/dist/ledger-of-ash.html
```

Expected: ≥3 hits (addNarration write, emitRollLine select, emitRollLine clear).

- [ ] **Step 4: Verify dist contains the leak-prefix filter**

```bash
grep -n "_LEAK_PREFIXES\|__combat__ability__" /c/Users/CEO/ledger-of-ash/dist/ledger-of-ash.html | head -5
```

Expected: both the producer line and the `_LEAK_PREFIXES` array are present.

- [ ] **Step 5: Verify HUD deletes propagated**

```bash
grep -n "hud-companions\|hud-day\|l-location\|regionSecond" /c/Users/CEO/ledger-of-ash/dist/ledger-of-ash.html
```

Expected: zero hits.

- [ ] **Step 6: Verify fatigue pill propagated**

```bash
grep -n "hud-fatigue-pill\|fatigue-pill" /c/Users/CEO/ledger-of-ash/dist/ledger-of-ash.html | head -5
```

Expected: at least 2 hits (element + CSS rule).

### Task 4.2: Update validate-content.js to accept dynamic resultType expression

- [ ] **Step 1: Read `tests/content/validate-content.js` — locate the existing `checkResultTypeVocabulary` rule (added in the prior T5 of commit 25540947)**

The current regex captures only string literals:
```javascript
var re = /addNarration\s*\(\s*[^,]+,\s*[^,]+,\s*['"]([a-z_]+)['"]\s*\)/g;
```

- [ ] **Step 2: Extend the rule to also accept the dynamic pattern `(G && G.lastResultType) || 'X'` where X is in the locked vocabulary**

Add a second regex:

```javascript
var dynamicRe = /addNarration\s*\(\s*[^,]+,\s*[^,]+,\s*\(\s*G\s*&&\s*G\.lastResultType\s*\)\s*\|\|\s*['"]([a-z_]+)['"]\s*\)/g;
```

For each match, validate the fallback string is in `VALID_RESULT_TYPES`. If not, emit `invalid_resultType` warning.

The original string-literal regex stays — any direct `'failure'`/`'neutral'` literal in NEW content (post-sweep) should still be allowed (it's not wrong, just less semantic). Do NOT add a warning for hardcoded literals; T2's sweep is one-shot and authors may legitimately write them again.

- [ ] **Step 3: Run validator on `content/`**

```bash
node tests/content/validate-content.js 2>&1 | tail -20
```

Expected: warning count not above pre-T1 baseline. The dynamic expressions T2 introduced are now valid.

### Task 4.3: T4 produces output

T4 produces:
1. Confirmation that `python3 build.py` ran cleanly after T1+T2+T3 apply
2. Diff of `tests/content/validate-content.js`
3. Six grep proofs that dist propagated all canonical changes
4. Brief readme

T4 does NOT commit. T4 does NOT push. Hands to Team Lead.

---

# Phase 2: Team Lead Sequential Apply + Local-Only Commits

**Team Lead role:** Receive all four patch bundles. Apply sequentially on the local feature branch. Create exactly 4 commits. **DO NOT run `git push` at any step.**

### Task 5: Local-branch integration

- [ ] **Step 1: Confirm on feature branch with clean working tree**

```bash
cd /c/Users/CEO/ledger-of-ash
git status
git branch --show-current
```

Expected: clean tree; current branch = `v10-narration-content-sweep`.

- [ ] **Step 2: Apply T1 patch (engine narration/roll/combat/leakage)**

Apply T1's diff. Run `play.bat`, take a failed risky choice that triggers level-up, confirm Bug A is gone (failure attaches under the failed-choice card, not the level-up card).

- [ ] **Step 3: Commit T1 locally**

```bash
git add ledger-of-ash.html
git commit -m "fix(narration): tag primary-outcome shell + emitRollLine attribute selector; crit/fumble override; generalize ability/trait leak filter; migrate combat round to emitRollLine"

# DO NOT run: git push
```

- [ ] **Step 4: Apply T2 patch (43 content files)**

Apply all 43 T2 diffs. Run `play.bat`, trigger several safe-tier failures, confirm result cards now render as `failure` (red border) when the roll fails, not as the hardcoded `'failure'` baked at authoring time (semantically identical here, but post-fix the engine's `G.lastResultType` is the source of truth).

- [ ] **Step 5: Commit T2 locally**

```bash
git add content/
git commit -m "fix(content): replace 829 hardcoded 'failure'/'neutral' resultType strings with (G && G.lastResultType) || fallback across 43 content/*.js files"

# DO NOT run: git push
```

- [ ] **Step 6: Apply T3 patch (HUD cleanup + filter + fatigue pill)**

Apply T3's diff. Run `play.bat`, confirm: hud-companions, hud-day, l-location, env-region-second are all gone; skill list contains no "Undefined" row; fatigue pill renders in journey strip and changes color at thresholds.

- [ ] **Step 7: Commit T3 locally**

```bash
git add ledger-of-ash.html
git commit -m "polish(hud): delete hud-companions/hud-day/l-location/regionSecond; filter Undefined skill at HUD + sheet render; add fatigue pill to journey-tab-strip"

# DO NOT run: git push
```

- [ ] **Step 8: Apply T4 patch (dist rebuild + validator update)**

Run `python3 build.py`. Apply the validator diff.

- [ ] **Step 9: Commit T4 locally**

```bash
git add dist/ledger-of-ash.html tests/content/validate-content.js
git commit -m "build(dist): regenerate dist after T1-T3; teach validate-content.js to accept (G && G.lastResultType) || X dynamic resultType expression"

# DO NOT run: git push
```

- [ ] **Step 10: Confirm 4 commits on local branch and no push happened**

```bash
git log --oneline main..v10-narration-content-sweep
git status
```

Expected: exactly 4 new commits ahead of `main`. Clean working tree.

```bash
git config --get push.default
git remote -v
```

(Diagnostic only — confirms remote is set but Team Lead has not invoked push.)

---

# Phase 3: Final Verification Gate

### Task 6: Full validation matrix

- [ ] **Step 1: All test suites**

```bash
npm test
npm run test:content
npm run test:continuity
```

Expected: all pass. Pre-existing mastery-XP failures acceptable. T2 sweep + T4 validator update produce no new warnings above the baseline captured in Task 0 Step 4.

- [ ] **Step 2: Headed playtest re-run**

```bash
npx playwright test tests/e2e/playtest-headed.spec.js --reporter=line
```

Expected: 4/4 SUCCESS. New `tests/test-results/playtest-report-<stamp>-headed.md` produced. Diff against `tests/test-results/playtest-report-20260609-2314-headed.md`:
- Pick counts comparable (337 ± 50)
- 0 new JS errors
- No new validator warnings above baseline
- Same 5 zero-sp2 localities remain (content debt — out of scope)

- [ ] **Step 3: Manual smoke — Bug A**

`play.bat`, take a risky choice that fails AND triggers level-up in the same resolution. Inspect scroll panel:
- Failed-choice card has red border AND has the d20 italic meta line attached BELOW its body, INSIDE its own shell
- Level-up card has green border AND does NOT have a d20 meta line attached

- [ ] **Step 4: Manual smoke — combat crit/fumble**

`play.bat`, enter combat, in dev console force `G._lastRollInfo = { roll: 20, total: 25 }` then resolve an attack. Expected: roll line ends with `Critical Success`, NOT `Pass`. Force `G._lastRollInfo = { roll: 1, total: 6 }`. Expected: roll line ends with `Fumble`, NOT `Fail`.

- [ ] **Step 5: Manual smoke — combat range honesty**

`play.bat`, combat, dev console `CS.rangeTier = 'long'`. Equip melee weapon. Attack button should be disabled. No `range -99` visible. Equip a stealth chain-B ranged weapon — attack button re-enables.

- [ ] **Step 6: Manual smoke — fatigue pill**

`play.bat`, dev console:
```javascript
G.fatigue = 3; updateHUD(); // pill default style
G.fatigue = 7; updateHUD(); // pill warn (gold)
G.fatigue = 10; updateHUD(); // pill crit (red)
```

- [ ] **Step 7: Manual smoke — ability + trait leak**

`play.bat`, advance to a state where the character has combat abilities + traits unlocked. Re-render choices at a fresh locality. Expected: zero `__combat__ability__...` or `__ability__...` or `__trait__...` strings visible in any choice button text.

- [ ] **Step 8: Manual smoke — dist serves the canonical**

```bash
ls -l dist/ledger-of-ash.html
grep -c "data-primary-outcome" dist/ledger-of-ash.html
grep -c "text-transform: uppercase.*scene-location\|scene-location.*text-transform: uppercase" dist/ledger-of-ash.html
grep -c "fatigue-pill" dist/ledger-of-ash.html
```

Expected: data-primary-outcome ≥3; ALL CAPS rule 0; fatigue-pill ≥2.

- [ ] **Step 9: Confirm branch stays local — no push**

```bash
git log --oneline origin/main..v10-narration-content-sweep 2>/dev/null
git ls-remote origin v10-narration-content-sweep
```

Expected: first command shows the 4 new commits (if origin/main exists locally); second command returns empty / "no such ref" — confirming the branch was never pushed.

**DO NOT push.** The user wants this branch to remain local-only for now.

---

# Self-Review — Spec Coverage

| Decision (from 16 clarifying answers) | Implementing Task | Status |
|---|---|---|
| H3 fix: tag primary-outcome shell + emitRollLine selects by attribute + clears after attach (Q1, Q3) | T1 Task 1.1, 1.2 | ✓ |
| emitRollLine non-neutral fallback (Q4) | T1 Task 1.2 | ✓ |
| Crit on d20===20 / fumble on d20===1, supersedes math (Q5) | T1 Task 1.3 | ✓ |
| Rival DC term conditional, never doubled (Q6) | T1 Task 1.3 | ✓ |
| Preserve gainXp BEFORE c.fn() order (Q2) | T1 Task 1.4 Step 5 | ✓ |
| Generalized ability + trait leak filter at L12048 (Q11 + user note) | T1 Task 1.5 | ✓ |
| Combat round migration to emitRollLine + primary shell (Q7) | T1 Task 1.6 | ✓ |
| Level-up shell NOT marked primary (locked rule) | T1 Task 1.7 | ✓ |
| Heat narration body-in-label slot (Bug K canonical) | T1 Task 1.8 | ✓ |
| 829-call content rewrite using G.lastResultType (Q8) | T2 Task 2 fan-out | ✓ |
| Engine prerequisite: G.lastResultType set in adaptEnrichedChoice (Q8 enable) | T1 Task 1.4 Step 3 | ✓ |
| Delete hud-companions + hud-day + l-location + regionSecond (Q9) | T3 Task 3.1-3.4 | ✓ |
| Filter Undefined skill at HUD render site (Q10) | T3 Task 3.5 | ✓ |
| Fatigue pill in journey-tab-strip with color thresholds (Q12) | T3 Task 3.6 | ✓ |
| Dist rebuild via python3 build.py (CRITICAL Bug K fix) | T4 Task 4.1 | ✓ |
| Validator learns dynamic resultType expression pattern | T4 Task 4.2 | ✓ |
| 4 sequential commits, T1→T2→T3→T4 (Q13 + Q16) | Phase 2 Task 5 | ✓ |
| Local branch v10-narration-content-sweep, NO push at any step (Q16) | Phase 2 Step 1, all commits, Phase 3 Step 9 | ✓ |
| Subagent-driven execution via agent-teams (Q14) | Phase 1 T2 fan-out + Execution Handoff | ✓ |
| Ship gates: Bug A + Bug K + leakage + 829-call sweep ALL BLOCK (Q15) | Phase 3 Task 6 manual smoke matrix Steps 3, 7, 8 + T2 verification | ✓ |

**Placeholder scan:** No "TBD", "TODO", "implement later". Every code block is complete. Two read-before-write instructions exist (T1 Task 1.4 "Locate the section just before c.fn()", T3 Task 3.5 "Grep before patching") — these are required correctness guidance because the line numbers may drift and CLAUDE.md memory `feedback_single_file_function_collision` warns about both renderCharacterSheet/showCharSheet ambiguity and shadow collisions.

**Type / name consistency:** addNarration, emitRollLine, _formatRollLine, _LEAK_PREFIXES, adaptEnrichedChoice, _finalizeLevelUp, resolveCombatAction, updateHUD, showCharSheet (NOT renderCharacterSheet — see CLAUDE.md), G.lastResultType, G._lastRollInfo, fatigue-pill, fatigue-pill--warn, fatigue-pill--crit, data-primary-outcome, scroll-entry, scroll-entry--success/failure/partial/neutral/complication/notice/encounter/dim/crit/fumble — all consistent between CSS/JS sites.

**Order consistency:** Phase 2 applies T1 → T2 → T3 → T4. T1 first so T2's engine prerequisite (`G.lastResultType` write) is live before content reads it. T2 second so T4's validator can confirm the dynamic expression is in place. T3 third (independent — could be first, but sequencing this way matches the smoke-test mental model). T4 last because dist rebuild needs T1+T2+T3 canonical changes to capture.

**Branch / push safety:** Phase 2 Steps 3, 5, 7, 9 each end with explicit `# DO NOT run: git push` comments. Phase 3 Step 9 actively verifies no push has occurred via `git ls-remote origin v10-narration-content-sweep`. Pre-Flight Task 0 Step 2 explicitly notes the user wants no upstream tracking.

---

# Execution Handoff

After this plan is approved:

**REQUIRED SUB-SKILL:** `superpowers:subagent-driven-development`. Phase 1 dispatches T1, T2, T3, T4 as four parallel subagents via the `agent-teams:parallel-feature-development` pattern. **T2 internally fans out 43 single-file implementer subagents.** Phase 2 Team Lead and Phase 3 verification run in the same session.

Tasks execute in this order: Pre-Flight Task 0 (sequential, blocking) → T1+T2+T3+T4 dispatched in parallel (T4's dist-rebuild step blocks on T1+T2+T3 landing) → Phase 2 Task 5 (sequential local commits, NO push) → Phase 3 Task 6 (sequential verification, NO push).

**Hard rule:** No `git push` invoked at any stage of this plan. Branch `v10-narration-content-sweep` stays local.
