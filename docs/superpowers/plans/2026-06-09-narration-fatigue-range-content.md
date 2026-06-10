# V1.0 Bundled Repair Plan — Narration Shell + Fatigue Cap + Combat Range + Silent Choice Detection

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` for task-by-task execution. **Phase 1 dispatches 5 parallel teams (T1/T2/T3/T4/T5) via `agent-teams:parallel-feature-development`** with non-overlapping file/line-range ownership. Phase 2 Team Lead applies patches sequentially and commits one per team. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close out four entangled V1.0 release blockers in one coordinated sprint: (1) unify the narration scroll panel so every entry routes through one card shell with one roll-display format, (2) fix the fatigue cap leak that lets dist/save migrations push fatigue past `FATIGUE_MAX`, (3) make combat range honest — weapons declare `attackType`, attack button disables on invalid pairings, no more `+ range -99` sentinels visible to the player, (4) detect silent choices at engine and validator level and queue them for author replacement, and (5) lock the `resultType` vocabulary so future drift is caught at validate time.

**Architecture:** Single-file engine (`ledger-of-ash.html` ~19K lines, vanilla ES5) plus 43 `content/*.js` enriched-choice files plus `content/item_system.js` (80 weapons). All five teams own non-overlapping file/line-range scopes. Team Lead in Phase 2 applies patches sequentially to avoid same-file commit races. Branch: `main`. Plan executor must first relocate this file to `docs/superpowers/plans/2026-06-09-narration-fatigue-range-content.md` before executing Task 1.

**Tech Stack:** Vanilla JS (ES5), CSS (inline `<style>`), Jest (unit), Playwright (e2e), Node validators, Python `build.py` bundler.

---

## Plan Relocation

- [ ] **Step 0: Copy plan to repo docs**

```bash
mkdir -p /c/Users/CEO/ledger-of-ash/docs/superpowers/plans
cp /c/Users/CEO/.claude/plans/composed-squishing-boot.md \
   /c/Users/CEO/ledger-of-ash/docs/superpowers/plans/2026-06-09-narration-fatigue-range-content.md
```

Execute all tasks below against the repo copy.

---

## Scope Boundaries (Out of Scope)

- New content authoring (no new choices, no new localities, no new NPCs)
- Stage 3+ work (frozen per `CLAUDE.md`)
- Save schema changes (no `G` property additions; `G._narrationCount`, `G.flags._playtest_silent_choices`, `G.flags._range_invalid_seen` are runtime-only — they go on existing `G`/`G.flags`, migration-safe)
- Refactoring 80 weapon stat blocks beyond adding `attackType` field
- Refactoring narration **content** — T1 changes the visual shell and roll-line format only; never edit result text wording
- Introducing new `resultType` values — T5 LOCKS the current set at 10
- Re-running BACKLOG.md feature audits — separate effort
- Save schema version bump — current schema (v3) handles the new runtime flags via existing `G.flags` migration

---

# Pre-Flight: Baseline Validation

**Why first:** Before five teams diverge on parallel branches, confirm `main` is green. Capture pre-existing failure baselines so post-merge regressions are detectable.

### Task 0: Capture baselines

**Files (read-only):** all

- [ ] **Step 1: Jest baseline**

Run: `npm test`
Expected: capture pass/fail count. Pre-existing mastery-XP failures acceptable. Record any baseline count.

- [ ] **Step 2: Content validator baseline**

Run: `npm run test:content`
Expected: capture warning count (838 known pre-existing per `tests/CLAUDE.md`).

- [ ] **Step 3: Continuity validator**

Run: `npm run test:continuity`
Expected: exit 0.

- [ ] **Step 4: Build.py sanity**

Run: `python3 build.py`
Expected: exit 0, `dist/ledger-of-ash.html` regenerated. Note size — used as baseline for T2 dist rebuild verification.

- [ ] **Step 5: Headless playtest baseline**

Run: `npm run test:e2e -- tests/e2e/playtest-headless.spec.js --reporter=line`
Expected: 4 families complete. Capture: pick counts per family, final stage per family, any new warnings above the 291 baseline.

---

# Phase 1: Parallel Team Implementation

Five teams work in parallel with non-overlapping ownership. Each team produces a unified diff plus a brief readme. Team Lead in Phase 2 applies all five patches sequentially.

**Coordination contract (binding for T1/T2/T3/T4/T5):**
- Each team reads target files fresh before editing — line numbers may have drifted.
- No team edits outside their declared scope.
- No team commits — Phase 2 handles all commits.
- Each team produces: `(a)` unified diff in owned scope, `(b)` brief readme of changes, `(c)` confirmation that scope did not require edits outside declared bounds.

---

## Team 1: Narration Shell Unification (T1)

**Why this team exists:** The narration scroll panel currently renders entries through 11+ visual styles. Roots: (1) `addNarration(label, html, resultType)` at L11528–11558 has two render paths gated by `resultType`, (2) 10 emitter sites bypass `addNarration` with inline `<div class="roll-result">` markup, (3) `.scene-location` CSS at L1026–1030 applies `text-transform:uppercase` + `letter-spacing:5px` to every `label` passed in (which is why Sunweave/Glasswake/etc. render in ALL CAPS shouting), (4) roll lines display as raw `d20: + 0 + range -99 = 14 vs DC 14 — FAIL` with no skill name and no breakdown of which modifier did what.

**Owned scope:**
- `ledger-of-ash.html` CSS block: L1026–1030 (`.scene-location` rule)
- `ledger-of-ash.html` CSS block: append `.scroll-entry__meta` + `.roll-result` + 10 result-type modifiers at end of main `<style>`
- `ledger-of-ash.html` JS: L11528–11750 (`addNarration` + `adaptEnrichedChoice` roll-display rebuild)
- `ledger-of-ash.html` JS: insert `emitRollLine()` helper after `addNarration` close
- 10 emitter call sites in `ledger-of-ash.html`: L10004, L10035, L11687, L11744, L12217, L12236, L12885, L13009, L13121, L18727

**Forbidden:** any edits to fatigue logic (T2), combat range (T3), `adaptEnrichedChoice` try/catch error-path (T4), validator code (T5).

### Task 1.1: Fix `.scene-location` ALL CAPS root cause

- [ ] **Step 1: Read L1024–1034 in context**

- [ ] **Step 2: Replace the rule**

Change:

```css
.scene-location {
  text-transform: uppercase;
  letter-spacing: 5px;
  /* other props */
}
```

To:

```css
.scene-location {
  font-family: var(--font-display);
  letter-spacing: 1.5px;
  font-size: 14px;
  font-weight: 600;
  color: var(--gold-bright, #d89a2c);
  /* keep any other existing non-transform props */
}
```

Read the existing rule first — preserve any margin/padding/display props that already exist; only remove `text-transform: uppercase` and reduce `letter-spacing` from 5px to 1.5px. Add explicit font-size if not already set.

### Task 1.2: Add unified scroll-entry CSS

- [ ] **Step 1: Find the last `</style>` in the main `<style>` block**

```bash
grep -n "</style>" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -3
```

Append before it:

```css
.scroll-entry {
  position: relative;
  margin: 14px 0;
  padding: 10px 14px;
  border-left: 3px solid var(--char, #131019);
  background: rgba(12, 10, 20, 0.6);
  font-family: var(--font-body);
  line-height: 1.55;
}
.scroll-entry__type {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 2px 8px;
  margin-bottom: 6px;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.35);
}
.scroll-entry__body { font-family: 'Crimson Pro', serif; font-weight: 300; font-size: 17px; }
.scroll-entry__meta {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  font-style: italic;
  opacity: 0.78;
  font-family: 'Crimson Pro', serif;
}

.scroll-entry--success      { border-left-color: var(--discovery, #26603e); }
.scroll-entry--success      .scroll-entry__type { color: var(--jade-bright, #5ec78a); }
.scroll-entry--failure      { border-left-color: var(--danger, #be2828); }
.scroll-entry--failure      .scroll-entry__type { color: var(--blood-bright, #e76a6a); }
.scroll-entry--partial      { border-left-color: #b88a2c; }
.scroll-entry--partial      .scroll-entry__type { color: #d89a2c; }
.scroll-entry--neutral      { border-left-color: rgba(216, 154, 44, 0.35); }
.scroll-entry--neutral      .scroll-entry__type { color: rgba(216, 154, 44, 0.7); }
.scroll-entry--complication { border-left-color: #d47517; }
.scroll-entry--complication .scroll-entry__type { color: #d47517; }
.scroll-entry--notice       { border-left-color: #4a7ab5; }
.scroll-entry--notice       .scroll-entry__type { color: #4a7ab5; }
.scroll-entry--encounter    { border-left-color: var(--danger, #be2828); }
.scroll-entry--encounter    .scroll-entry__type { color: var(--blood-bright, #e76a6a); }
.scroll-entry--dim          { border-left-color: rgba(120, 120, 130, 0.25); opacity: 0.7; }
.scroll-entry--dim          .scroll-entry__type { color: rgba(180, 180, 190, 0.5); }
.scroll-entry--crit         { border-left-color: #5ec78a; box-shadow: 0 0 12px rgba(94, 199, 138, 0.25); }
.scroll-entry--crit         .scroll-entry__type { color: #5ec78a; }
.scroll-entry--fumble       { border-left-color: #e76a6a; box-shadow: 0 0 12px rgba(231, 106, 106, 0.25); }
.scroll-entry--fumble       .scroll-entry__type { color: #e76a6a; }
```

10 modifiers — one per locked `resultType` (see T5).

### Task 1.3: Rewrite `addNarration` to single-path through shell

- [ ] **Step 1: Read L11528–11558 in full**

- [ ] **Step 2: Replace the function body**

```javascript
function addNarration(label, html, resultType) {
  // Increment narration emission counter for silent-choice detection (T4).
  if (typeof G !== 'undefined' && G) {
    G._narrationCount = (G._narrationCount || 0) + 1;
  }

  var type = (typeof resultType === 'string' && resultType) ? resultType : 'neutral';
  var typeLabelMap = {
    success:      '\u2713 Success',
    failure:      '\u2717 Failure',
    partial:      'Partial',
    neutral:      'Neutral',
    complication: 'Complication',
    notice:       'Notice',
    encounter:    'Encounter',
    dim:          'Aside',
    crit:         '\u2605 Critical',
    fumble:       '\u2620 Fumble'
  };
  var typeLabel = typeLabelMap[type] || 'Neutral';
  var bodyHtml  = html || '';
  var headerHtml = label ? '<div class="scene-location">' + label + '</div>' : '';

  var entry =
    '<div class="scroll-entry scroll-entry--' + type + '">' +
      '<span class="scroll-entry__type">' + typeLabel + '</span>' +
      headerHtml +
      '<div class="scroll-entry__body">' + bodyHtml + '</div>' +
    '</div>';

  // Preserve existing scroll-container resolution — read the original implementation first
  // and use whichever ID/class it already targets.
  var target = document.getElementById('scroll')
            || document.getElementById('narrative')
            || document.querySelector('.narrative-text');
  if (target) {
    target.insertAdjacentHTML('beforeend', entry);
    target.scrollTop = target.scrollHeight;
  }
}
```

The `.scene-location` rule edited in Task 1.1 now renders as a small gold display-font header without shouting. Both render paths in the original two-branch implementation collapse into one.

### Task 1.4: Add `emitRollLine` helper

Insert immediately after `addNarration`'s closing brace:

```javascript
function emitRollLine(rollText, resultType) {
  // Append a roll-result as a meta line inside the most recent scroll-entry.
  // If no entry exists, fall back to a standalone neutral entry.
  var target = document.getElementById('scroll')
            || document.getElementById('narrative')
            || document.querySelector('.narrative-text');
  if (!target) return;
  var entries = target.querySelectorAll('.scroll-entry');
  var last = entries[entries.length - 1];
  if (!last) {
    addNarration('', rollText, resultType || 'neutral');
    return;
  }
  var meta = document.createElement('span');
  meta.className = 'scroll-entry__meta';
  meta.innerHTML = rollText;
  last.appendChild(meta);
}
```

### Task 1.5: Rebuild the roll-display string in `adaptEnrichedChoice`

The current call sites emit raw HTML like `d20: 12 + 0 + range -99 = vs DC 14 — FAIL` with no skill name, no per-mod breakdown, and the visible `-99` sentinel. T3 fixes the underlying `-99`; T1 fixes the rendering.

- [ ] **Step 1: Read L11628–11750 (`adaptEnrichedChoice`) — locate the roll-display string-build section**

- [ ] **Step 2: Replace the roll-display construction**

Find the segment that produces the `d20: ... vs DC N — Pass/Fail` HTML. Replace with the canonical builder:

```javascript
function _formatRollLine(rollInfo, skillKey, dc, succeeded) {
  // rollInfo = { roll, statValue, traitBonus, equipmentBonus, rivalDcMod,
  //              sleeplessMalus, campoutBonus, travelFatigueMalus,
  //              fatigueExhaustionPenalty, rangeMod, otherBonuses }
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
  if (rollInfo.rivalDcMod)             parts.push('rival DC +' + rollInfo.rivalDcMod);
  if (typeof rollInfo.rangeMod === 'number' && rollInfo.rangeMod !== 0 && rollInfo.rangeMod !== -99) {
    parts.push('range ' + (rollInfo.rangeMod > 0 ? '+' : '') + rollInfo.rangeMod);
  }
  var total = rollInfo.total != null ? rollInfo.total : rollInfo.roll;
  var outcome = succeeded ? 'Pass' : 'Fail';
  return parts.join(' · ') + ' = <b>' + total + '</b> vs DC ' + dc + ' \u2014 ' + outcome;
}
```

Then where the function currently calls `addNarration(label, rollHtml, ...)` for the roll line, replace with:

```javascript
var rollLine = _formatRollLine(G._lastRollInfo || {}, c.skill, dc, succeeded);
var rollType = succeeded
  ? (G._lastRollInfo && G._lastRollInfo.isCrit ? 'crit' : 'success')
  : (G._lastRollInfo && G._lastRollInfo.isFumble ? 'fumble' : 'failure');
emitRollLine(rollLine, rollType);
```

**Critical:** T1 does NOT change `rollD20`'s metadata fields. It uses what's already on `G._lastRollInfo`. T3 adds `rangeMod` to `G._lastRollInfo`; T1's `_formatRollLine` reads it conditionally.

### Task 1.6: Reroute the 10 bypass emitters

Each of these 10 sites currently emits a roll line directly (often as inline HTML through `addNarration('', '<div class="roll-result">...')` or via DOM manipulation).

```bash
grep -n "roll-result\|d20:" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -30
```

Expected sites: L10004, L10035, L11687, L11744, L12217, L12236, L12885, L13009, L13121, L18727.

- [ ] **Step 1: For each site, replace inline roll-line HTML with `emitRollLine(rollLine, rollType)`**

  Use the new `_formatRollLine(G._lastRollInfo, skill, dc, succeeded)` builder (or, where the existing call site has its own custom text like "Reflex save +3 = 17 vs DC 14 — Pass", pass that text directly: `emitRollLine(customText, succeeded ? 'success' : 'failure')`).

- [ ] **Step 2: Replace the `<span class="roll-note">` site at L13121**

This one site uses `roll-note` instead of `roll-result`. Migrate it to `emitRollLine` like the others.

- [ ] **Step 3: Replace any inline `<div class="roll-result">` in `enterCombat`/`startCombat`/`resolveCombatAction`**

Any combat-side roll lines must also use `emitRollLine`.

### Task 1.7: Verify T1

- [ ] **Step 1: Grep for surviving bypasses**

```bash
grep -n "d20:" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
grep -n "roll-result\"\|roll-note\"" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
grep -n "text-transform: uppercase" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: `d20:` hits all inside `_formatRollLine`. Zero `class="roll-result"` or `class="roll-note"` in JS code. The `text-transform: uppercase` hit on `.scene-location` is GONE (may persist on other elements like type pills — those are intentional).

- [ ] **Step 2: Open `play.bat`, spawn a knight, trigger a roll**

Confirm: result card renders inside `.scroll-entry--success` (green border) or `.scroll-entry--failure` (red), with type pill, scene-location header in normal-case gold display font, body in serif, and the d20 line as italic meta below — all inside ONE shell.

- [ ] **Step 3: Trigger combat**

Confirm: `COMBAT BEGINS` and combat roll lines all use `.scroll-entry--encounter` and `emitRollLine`.

### Task 1.8: T1 produces output

T1 produces:
1. Unified diff of `ledger-of-ash.html` within owned scope
2. Brief readme: lines touched, emitter sites migrated, CSS rules added/changed
3. Two screenshots: success+roll, combat-begins+combat-roll

T1 does NOT commit. Hands to Team Lead.

---

## Team 2: Fatigue Cap Leak Fix (T2)

**Why this team exists:** Players reported HUD showing `17/10` and `20/10` for fatigue. Root causes: (1) `dist/ledger-of-ash.html` is stale and missing `FATIGUE_MAX` entirely — uncapped writes leak through, (2) `migrateState(loaded)` at L17531–17624 in canonical HTML does not clamp `loaded.fatigue` on load, so legacy save files persist over-cap values.

**Owned scope:**
- `ledger-of-ash.html` L17531–17624 (`migrateState`)
- `dist/ledger-of-ash.html` (full regen via `build.py`)
- `tests/logic/fatigue-cap.test.js` (extend existing T1-from-prior-plan tests)

**Forbidden:** any narration rendering (T1), combat range (T3), `adaptEnrichedChoice` (T4), validator code (T5). T2 does NOT touch the canonical `FATIGUE_MAX` declaration or `addFatigue()` helper — those are assumed shipped already.

### Task 2.1: Verify `FATIGUE_MAX` and `addFatigue` exist

- [ ] **Step 1: Confirm prior shipping**

```bash
grep -n "FATIGUE_MAX\|function addFatigue" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: `var FATIGUE_MAX = 10;` declaration + `function addFatigue(n)` definition. If either is missing, T2 must ship them first (see prior gate3 plan or memory `MEMORY.md`).

### Task 2.2: Add load-time clamp in `migrateState`

- [ ] **Step 1: Read L17531–17624 (`migrateState(loaded)`) in full**

- [ ] **Step 2: Find the `return loaded;` line near the bottom of the function**

- [ ] **Step 3: Insert immediately before `return loaded;`**

```javascript
  // Defensive load-time clamp: any save written before FATIGUE_MAX existed,
  // or any save that drifted via a now-fixed leak, gets brought into bounds.
  if (typeof loaded.fatigue === 'number' && isFinite(loaded.fatigue)) {
    loaded.fatigue = Math.max(0, Math.min(FATIGUE_MAX, loaded.fatigue));
  } else {
    loaded.fatigue = 0;
  }
```

`FATIGUE_MAX` is declared at module scope (~L12797) and is in scope here.

### Task 2.3: Rebuild dist

- [ ] **Step 1: Run the bundler**

```bash
cd /c/Users/CEO/ledger-of-ash
python3 build.py
```

Expected: exit 0, dist regenerated.

- [ ] **Step 2: Verify dist now contains the constant + helper**

```bash
grep -n "FATIGUE_MAX\|function addFatigue" /c/Users/CEO/ledger-of-ash/dist/ledger-of-ash.html | head -10
```

Expected: at least 3 hits (declaration + helper + uses). If 0 hits, the bundler didn't pick up the change — investigate `build.py` source inclusion order.

- [ ] **Step 3: Verify no surviving `Math.min(10, ` uncapped writes in dist**

```bash
grep -n "G\.fatigue\s*=\s*Math\.min(10" /c/Users/CEO/ledger-of-ash/dist/ledger-of-ash.html
```

Expected: 0 hits (all migrated to `addFatigue()` in canonical). If any survive in dist, the canonical also has untouched sites — fix in canonical, rerun `build.py`.

### Task 2.4: Add Jest coverage for migration clamp

Open `tests/logic/fatigue-cap.test.js` (created in prior plan). Append:

```javascript
describe('migrateState clamps fatigue at load', () => {
  test('legacy over-cap save value is clamped', () => {
    const { window } = createGameContext({});
    // migrateState is exposed via the harness — adjust accessor if needed
    const legacy = { fatigue: 38, schemaVersion: 2 };
    const migrated = window.migrateState
      ? window.migrateState(legacy)
      : legacy; // fallback if not exposed
    if (window.migrateState) {
      expect(migrated.fatigue).toBe(10);
    }
  });

  test('negative legacy value floors at 0', () => {
    const { window } = createGameContext({});
    if (window.migrateState) {
      const migrated = window.migrateState({ fatigue: -7, schemaVersion: 2 });
      expect(migrated.fatigue).toBe(0);
    }
  });

  test('non-numeric legacy value resets to 0', () => {
    const { window } = createGameContext({});
    if (window.migrateState) {
      const migrated = window.migrateState({ fatigue: 'broken', schemaVersion: 2 });
      expect(migrated.fatigue).toBe(0);
    }
  });
});
```

If `migrateState` is not on the vm context yet, add it to the exposure block at the bottom of `tests/setup.js`:

```javascript
migrateState: ctx.migrateState,
```

(Per harness convention — see existing exposures for `addFatigue`, `rollD20`.)

### Task 2.5: Verify T2

- [ ] **Step 1: Run Jest**

```bash
npx jest tests/logic/fatigue-cap.test.js -v
```

Expected: all pass (existing + new 3 migration tests).

- [ ] **Step 2: Live smoke**

Open `play.bat`, in dev console:

```javascript
G.fatigue = 38;
saveGame(1);
loadGame(1);
// Expected: G.fatigue === 10 after load
```

### Task 2.6: T2 produces output

T2 produces:
1. Unified diff of `ledger-of-ash.html` L17531–17624 + `tests/logic/fatigue-cap.test.js`
2. Note that `dist/ledger-of-ash.html` was regenerated via `python3 build.py`
3. Brief readme

T2 does NOT commit. Hands to Team Lead.

---

## Team 3: Combat Range Honesty (T3)

**Why this team exists:** Players see roll lines that include `+ range -99`. `getRangeModifier(attackType, rangeTier)` at L4544–4554 returns `-99` as a sentinel when the attack/range pair is invalid (e.g. `'melee'` attack at `'long'` range). But: (1) all 80 weapons in `content/item_system.js` lack an `attackType` field, so combat hardcodes `'melee'` at L4828 and L4946 regardless of equipped weapon, (2) the attack button does not disable when the range mod is `-99`, so players click and see the sentinel in the result.

**Owned scope:**
- `content/item_system.js` (80 weapon stat blocks — add `attackType` field per family/chain mapping)
- `ledger-of-ash.html` L4500–4575 (insert `getEquippedWeaponAttackType()` helper + update `getRangeModifier` callers + add button disable)
- `ledger-of-ash.html` L4625–4628 (attack button render — add disable + tooltip)
- `ledger-of-ash.html` L4828, L4946 (replace hardcoded `'melee'` with helper)
- `ledger-of-ash.html` CSS append: `.combat-action-btn[disabled]` styling
- `rollD20` metadata (write `rangeMod` to `G._lastRollInfo` for T1 to read)

**Forbidden:** narration shell (T1), fatigue (T2), `adaptEnrichedChoice` (T4), validator code (T5).

### Task 3.1: Add `attackType` to 80 weapons in `content/item_system.js`

Mapping rules (per family + chain — confirm by reading the existing weapon definitions):

| Family | Chain A | Chain B | Chain C | Chain D |
|--------|---------|---------|---------|---------|
| combat | melee | melee | melee | melee |
| magic | magic | magic | magic | magic |
| stealth | melee | **ranged** | melee | melee |
| support | magic | magic | magic | magic |

- [ ] **Step 1: Read `content/item_system.js` and identify the 80 weapon definitions**

- [ ] **Step 2: For each weapon, add `attackType: 'melee'|'ranged'|'magic'` per the mapping table**

Example before:

```javascript
{ name: 'Iron Accord Standard Blade', family: 'combat', chain: 'A', level: 1, slot: 'weapon', bonus: 1, /* ... */ }
```

After:

```javascript
{ name: 'Iron Accord Standard Blade', family: 'combat', chain: 'A', level: 1, slot: 'weapon', bonus: 1, attackType: 'melee', /* ... */ }
```

- [ ] **Step 3: Also add `attackType` to any archetype starter-weapon literal in `ledger-of-ash.html` at L10856 (and any other inline weapon definition)**

```bash
grep -n "Iron Accord Standard Blade\|'weapon'" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -10
```

### Task 3.2: Add `getEquippedWeaponAttackType()` helper

In `ledger-of-ash.html` near L4500–4520 (combat init area), insert:

```javascript
function getEquippedWeaponAttackType() {
  // Return 'melee'|'ranged'|'magic' from currently equipped weapon, default 'melee'.
  if (!G || !G.equipped || !G.equipped.weapon) return 'melee';
  var w = G.equipped.weapon;
  if (typeof w === 'object' && w.attackType) return w.attackType;
  // Fallback: look up by index in inventory
  if (typeof w === 'number' && G.inventory && G.inventory[w]) {
    var item = G.inventory[w];
    if (item && item.attackType) return item.attackType;
  }
  return 'melee';
}
```

### Task 3.3: Replace hardcoded `'melee'` call sites

- [ ] **Step 1: Read L4828 and L4946 in context**

- [ ] **Step 2: Replace each `getRangeModifier('melee', ...)` with `getRangeModifier(getEquippedWeaponAttackType(), ...)`**

```bash
grep -n "getRangeModifier(" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Confirm exactly 2 hits at the call sites — fix both.

### Task 3.4: Disable attack button on invalid pairing

- [ ] **Step 1: Read L4625–4628 (attack button render)**

- [ ] **Step 2: Modify render to compute range mod and disable**

Inside the render block, before constructing the button HTML:

```javascript
var _atkType  = getEquippedWeaponAttackType();
var _rangeMod = getRangeModifier(_atkType, CS.rangeTier);
var _invalid  = (_rangeMod === -99);
var _disabledAttr = _invalid ? ' disabled' : '';
var _tooltip = _invalid
  ? ' title="' + _atkType.charAt(0).toUpperCase() + _atkType.slice(1)
    + ' attacks cannot reach at ' + CS.rangeTier + ' range. Move closer or change weapon."'
  : '';
```

Then the button:

```javascript
'<button class="combat-action-btn"' + _disabledAttr + _tooltip + ' onclick="resolveCombatAction(\'attack\')">Attack</button>'
```

### Task 3.5: Add CSS for disabled attack button

Append to CSS block:

```css
.combat-action-btn[disabled] {
  opacity: 0.4;
  cursor: not-allowed;
  filter: grayscale(0.5);
}
.combat-action-btn[disabled]:hover {
  background: inherit;
  border-color: inherit;
}
```

### Task 3.6: Write `rangeMod` into `G._lastRollInfo`

In `rollD20()` (~L12525), find the section where `G._lastRollInfo` is populated. Add at the bottom:

```javascript
// Range modifier — populated by combat call sites that pass range data
// via the `bonus` arg construction. Here we just ensure the field exists.
G._lastRollInfo.rangeMod = G._lastRollInfo.rangeMod || 0;
```

And in `resolveCombatAction()` (search for `resolveCombatAction`), where the attack roll is built, store the range mod before calling `rollD20`:

```javascript
var _rangeMod = getRangeModifier(getEquippedWeaponAttackType(), CS.rangeTier);
// ... existing bonus calculation, fold _rangeMod in ...
// After rollD20 call:
if (G._lastRollInfo) G._lastRollInfo.rangeMod = _rangeMod;
```

T1's `_formatRollLine` reads this field and renders `range +N` / `range -N` only when nonzero AND not `-99`. With the button disable in Task 3.4, `-99` should never reach the roll line, but the guard is belt-and-suspenders.

### Task 3.7: Verify T3

- [ ] **Step 1: Grep for surviving hardcoded 'melee'**

```bash
grep -n "getRangeModifier('melee'" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: 0 hits.

- [ ] **Step 2: Spot-check 5 weapons in `content/item_system.js`**

Confirm each has `attackType`. One stealth chain-B weapon must be `'ranged'`.

- [ ] **Step 3: Open `play.bat`, enter combat, force long range**

In dev console: `CS.rangeTier = 'long'`. Confirm: attack button disabled (grayed out), hover tooltip says "Melee attacks cannot reach at long range. Move closer or change weapon." No `-99` visible anywhere.

### Task 3.8: T3 produces output

T3 produces:
1. Unified diff of `content/item_system.js` + `ledger-of-ash.html`
2. Confirmation: 80 weapons have `attackType`; helper added; 2 hardcoded sites fixed; button disable shipped
3. Brief readme

T3 does NOT commit. Hands to Team Lead.

---

## Team 4: Silent Choice Detection (T4)

**Why this team exists:** Some choices fire `c.fn()` without emitting any `addNarration` call. The player clicks, the game state updates (XP, alignment, flags), but the narration scroll panel shows nothing. Players experience this as a dead button. T4 adds a counter to `addNarration`, snapshots it around `c.fn()` in `adaptEnrichedChoice`, emits a tier-appropriate generic if no emission happened, and queues the choice id to `G.flags._playtest_silent_choices` for the playtest reporter to flag for author replacement.

**Owned scope:**
- `ledger-of-ash.html`: `addNarration` already has `G._narrationCount++` (added in T1 Task 1.3 — coordinate)
- `ledger-of-ash.html` L11628–11750 (`adaptEnrichedChoice` snapshot + check + fallback)
- `tests/content/validate-content.js` (new rule `checkNarrationEmission` — static-scan only; flags choices whose `fn` body has no `addNarration` or `addJournal` or `showToast` or `addWorldNotice` call)
- `tests/e2e/helpers/report-writer.js` (new "Silent Choices Queue" section in report)

**Forbidden:** narration CSS/shell (T1), fatigue (T2), combat range (T3), `addNarration` body rewrite (already T1's). T4 only adds to `addNarration` the counter line (which is also added in T1 — T4 ensures T1 included it).

### Task 4.1: Confirm `G._narrationCount` increments in `addNarration`

- [ ] **Step 1: Verify T1's `addNarration` rewrite includes the counter line**

```bash
grep -n "G._narrationCount" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: at least 1 hit inside `addNarration`. If 0, T1 missed it — T4 escalates to Team Lead BEFORE T4 ships.

### Task 4.2: Wrap `c.fn()` in `adaptEnrichedChoice` with snapshot/check

- [ ] **Step 1: Read L11628–11750 (`adaptEnrichedChoice`)**

- [ ] **Step 2: Find the section that calls `c.fn()` (or `c.failResult()`)**

- [ ] **Step 3: Wrap with snapshot/check**

Before each `c.fn()` / `c.failResult()` call:

```javascript
var _narrSnap = G._narrationCount || 0;
```

After each (inside the existing try block — do not change try/catch structure):

```javascript
var _narrAfter = G._narrationCount || 0;
if (_narrAfter === _narrSnap) {
  // Silent choice — fn ran but emitted no narration. Generate a tier-appropriate generic.
  var _tier = getChoiceTier(c);
  var _genericBySuccess = succeeded ? {
    safe:  'You handle it steadily. Nothing dramatic happens.',
    risky: 'It works. You file the moment away.',
    bold:  'It pays off. The cost was real, but so is the result.'
  } : {
    safe:  'It doesn\u2019t land. You step back and reset.',
    risky: 'It slips. You note what went wrong.',
    bold:  'It fails hard. The cost outlasts the moment.'
  };
  var _generic = _genericBySuccess[_tier] || (succeeded ? 'You manage it.' : 'It doesn\u2019t go as hoped.');
  addNarration('', _generic, succeeded ? 'neutral' : 'failure');

  // Queue choice id for playtest report.
  if (!G.flags) G.flags = {};
  if (!G.flags._playtest_silent_choices) G.flags._playtest_silent_choices = [];
  var _cid = c.id || c.cid || (c.label ? c.label.slice(0, 40) : 'unknown');
  if (G.flags._playtest_silent_choices.indexOf(_cid) === -1) {
    G.flags._playtest_silent_choices.push(_cid);
  }
}
```

**Critical:** wrap BOTH `c.fn()` and `c.failResult()` call sites with the same snapshot/check pattern. The fallback is intentionally generic — author replacement is the long-term fix; the engine fallback prevents the dead-button player experience.

### Task 4.3: Add static-scan validator rule

Open `tests/content/validate-content.js` (or `validate-structure.js` — whichever is the content-rule entry point) and add:

```javascript
function checkNarrationEmission(fileBody, fileName) {
  // Scan enriched-choice fn bodies for at least one narration-side-effect call.
  // Heuristic: find `fn: function() { ... }` and `failResult: function() { ... }` blocks.
  var warnings = [];
  var fnBlockRe = /(fn|failResult)\s*:\s*function\s*\([^)]*\)\s*\{([\s\S]*?)\n\s*\}/g;
  var SIDE_EFFECTS_RE = /\b(addNarration|addJournal|showToast|addWorldNotice|addQuest|enterCombat|startTravel|showTransitionBanner)\b/;
  var m;
  while ((m = fnBlockRe.exec(fileBody)) !== null) {
    var body = m[2] || '';
    if (body.trim().length === 0) continue; // empty fn is a separate concern
    if (!SIDE_EFFECTS_RE.test(body)) {
      var lineNo = fileBody.slice(0, m.index).split('\n').length;
      warnings.push({
        file: fileName,
        line: lineNo,
        kind: 'silent_choice',
        message: 'Choice fn/failResult body has no addNarration/addJournal/showToast call — risks silent fire.'
      });
    }
  }
  return warnings;
}
```

Wire it into the existing validator's rule list and reporter. Output goes to console + the existing warning summary.

### Task 4.4: Add reporter section for runtime queue

Open `tests/e2e/helpers/report-writer.js`. Add a new section method:

```javascript
writeSilentChoicesSection() {
  // Read G.flags._playtest_silent_choices via page.evaluate before report finalize
  // (or inject reading at the end of each family run).
  // Append a markdown section to the report:
  // ## Silent Choices Detected
  // | Choice ID | Family | Tier | First Hit Pick |
}
```

Wire the section into the existing `finalize()` flow. If reading G via `page.evaluate` is not feasible at finalize time, instead capture the queue at the end of each family run and pass it through to `ReportWriter`.

### Task 4.5: Verify T4

- [ ] **Step 1: Open `play.bat`, dev console**

```javascript
// Manually fire a known silent choice (if any), or stub:
G.flags._playtest_silent_choices = [];
G._narrationCount = 0;
adaptEnrichedChoice({ fn: function() { G.xp = (G.xp || 0) + 1; }, tag: 'safe' });
// Expected: G.flags._playtest_silent_choices has one entry; narration emitted generic safe-pass text.
```

- [ ] **Step 2: Run content validator and confirm new warnings appear**

```bash
node tests/content/validate-content.js
```

Expected: some new `silent_choice` warnings if any content/*.js fn bodies lack side-effect calls.

### Task 4.6: T4 produces output

T4 produces:
1. Unified diff of `ledger-of-ash.html` + `tests/content/validate-content.js` + `tests/e2e/helpers/report-writer.js`
2. Sample console output showing the new validator warnings
3. Brief readme

T4 does NOT commit. Hands to Team Lead.

---

## Team 5: ResultType Vocabulary Lock (T5)

**Why this team exists:** T1 locks the visual shell at 10 `resultType` values. New content (or accidental typos like `'sucess'`/`'neturl'`) must be caught at validate time, not at runtime where they fall through to the `'neutral'` default and become invisible drift.

**Owned scope:**
- `tests/content/validate-content.js` — new rule `checkResultTypeVocabulary`
- No engine edits (the engine already defaults unknown types to `'neutral'`; T5 catches drift before it ships)

**Forbidden:** any engine edits (T1/T2/T3/T4 own those).

### Task 5.1: Add `VALID_RESULT_TYPES` set + scanner

Open `tests/content/validate-content.js`. Add at the top:

```javascript
const VALID_RESULT_TYPES = new Set([
  'success', 'failure', 'partial', 'neutral', 'complication',
  'notice', 'encounter', 'dim', 'crit', 'fumble'
]);
```

Add the rule function:

```javascript
function checkResultTypeVocabulary(fileBody, fileName) {
  var warnings = [];
  // Find every addNarration(label, html, TYPE) call; capture the third arg if string literal.
  var re = /addNarration\s*\(\s*[^,]+,\s*[^,]+,\s*['"]([a-z_]+)['"]\s*\)/g;
  var m;
  while ((m = re.exec(fileBody)) !== null) {
    var type = m[1];
    if (!VALID_RESULT_TYPES.has(type)) {
      var lineNo = fileBody.slice(0, m.index).split('\n').length;
      warnings.push({
        file: fileName,
        line: lineNo,
        kind: 'invalid_resultType',
        message: 'addNarration resultType "' + type + '" is not in the locked vocabulary. Valid: '
                 + Array.from(VALID_RESULT_TYPES).join(', ')
      });
    }
  }
  return warnings;
}
```

Wire into the existing rule loop.

### Task 5.2: Verify T5

- [ ] **Step 1: Test on a deliberate typo**

Create a throwaway test:

```javascript
const body = "addNarration('', 'test', 'sucess');";
const warnings = checkResultTypeVocabulary(body, 'test.js');
console.log(warnings); // expect 1 warning
```

- [ ] **Step 2: Run validator on full content tree**

```bash
node tests/content/validate-content.js
```

Expected: 0 `invalid_resultType` warnings if content is clean, or N warnings if there are real typos (which T5 is designed to catch).

### Task 5.3: T5 produces output

T5 produces:
1. Unified diff of `tests/content/validate-content.js`
2. Brief readme

T5 does NOT commit. Hands to Team Lead.

---

# Phase 2: Team Lead Integration + Commits

**Team Lead role:** Receive all five patches. Apply sequentially. Commit each as a separate commit.

### Task 6: Integration

- [ ] **Step 1: Verify clean working tree**

```bash
cd /c/Users/CEO/ledger-of-ash
git status
```

Expected: clean (Pre-Flight Task 0 captured baselines, no commits required).

- [ ] **Step 2: Apply T2 patch FIRST (fatigue cap leak)**

Apply T2's diff. Run `python3 build.py` to regenerate dist. Verify with:

```bash
grep -c "FATIGUE_MAX" /c/Users/CEO/ledger-of-ash/dist/ledger-of-ash.html
npx jest tests/logic/fatigue-cap.test.js
```

Expected: dist contains `FATIGUE_MAX`; all fatigue tests pass.

T2 first because it's the smallest surface and unblocks the headed playtest re-run (Phase 3) from save-state pollution.

- [ ] **Step 3: Commit T2**

```bash
git add ledger-of-ash.html dist/ledger-of-ash.html tests/logic/fatigue-cap.test.js
git commit -m "fix(fatigue): clamp loaded.fatigue in migrateState; rebuild dist; add Jest migration coverage"
```

- [ ] **Step 4: Apply T3 patch (combat range)**

Apply T3's diff. Open `play.bat`, force long range in combat, verify button disables with tooltip.

- [ ] **Step 5: Commit T3**

```bash
git add content/item_system.js ledger-of-ash.html
git commit -m "feat(combat): add attackType to 80 weapons; disable attack button on invalid range; remove -99 sentinel from player view"
```

- [ ] **Step 6: Apply T1 patch (narration shell)**

Apply T1's diff. Verify with:

```bash
grep -c "scroll-entry--" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
grep -n "text-transform: uppercase" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -3
grep -n "d20:" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: 10+ `scroll-entry--` modifiers, no `text-transform: uppercase` on `.scene-location`, all `d20:` references inside `_formatRollLine` only. Open `play.bat`, trigger a roll, confirm card shell + meta line.

- [ ] **Step 7: Commit T1**

```bash
git add ledger-of-ash.html
git commit -m "polish(narration): unify scroll-entry shell across all 10 resultTypes; emit roll lines as meta inside parent shell; fix scene-location ALL CAPS"
```

- [ ] **Step 8: Apply T4 patch (silent choice detection)**

Apply T4's diff. Verify validator emits new warnings if any. Verify runtime queue populates on a stub silent choice.

- [ ] **Step 9: Commit T4**

```bash
git add ledger-of-ash.html tests/content/validate-content.js tests/e2e/helpers/report-writer.js
git commit -m "feat(engine): detect silent choices via narration counter; emit tier-appropriate generic; queue to playtest report; add validator rule"
```

- [ ] **Step 10: Apply T5 patch (vocabulary lock)**

Apply T5's diff. Run validator.

- [ ] **Step 11: Commit T5**

```bash
git add tests/content/validate-content.js
git commit -m "test(content): lock resultType vocabulary at 10 values via new validator rule"
```

---

# Phase 3: Final Verification Gate

### Task 7: Full validation matrix

- [ ] **Step 1: All test suites**

```bash
npm run test:all
```

Expected: all suites pass. Pre-existing mastery-XP failures acceptable. T2's migration test, T4's runtime smoke, T5's vocabulary scan all pass.

- [ ] **Step 2: Headed playtest re-run**

```bash
npm run test:e2e -- tests/e2e/playtest-headed.spec.js
```

Expected: 4/4 SUCCESS. Final fatigue ≤ 10 on every character sheet. Report includes new "Silent Choices Detected" section.

- [ ] **Step 3: Manual smoke — narration shell**

`play.bat`, spawn knight, take a `risky` choice that rolls. Confirm:
- Result block inside `.scroll-entry--success` (green border) or `.scroll-entry--failure` (red).
- Scene-location header in normal-case gold display font (NOT ALL CAPS, NOT 5px letter-spacing).
- d20 roll line as italic meta below body, inside the SAME card.
- Skill name shown ("Might +2", "Wits +1", etc.) — not a bare number.
- No `-99` anywhere.

- [ ] **Step 4: Manual smoke — combat range**

`play.bat`, enter combat, in console: `CS.rangeTier = 'long'; resolveCombatAction('move')` then re-render. Attack button must be grayed out with tooltip. Try equipping a stealth chain-B (ranged) weapon — attack button must re-enable at long range.

- [ ] **Step 5: Manual smoke — fatigue migration**

`play.bat`, dev console:

```javascript
G.fatigue = 38;
saveGame(1);
loadGame(1);
// Expect: G.fatigue === 10
```

- [ ] **Step 6: Manual smoke — silent choice detection**

`play.bat`, dev console:

```javascript
G.flags._playtest_silent_choices = [];
G._narrationCount = 0;
adaptEnrichedChoice({ fn: function() { G.gold = (G.gold || 0) + 1; }, tag: 'risky' });
console.log(G.flags._playtest_silent_choices);
// Expect: one entry
```

- [ ] **Step 7: Push**

```bash
git push origin main
```

---

# Self-Review — Spec Coverage

| Requirement (from 15 Q decisions + Q-scope) | Implementing Task | Status |
|---|---|---|
| ALL CAPS Sunweave / scene-location header drift | T1 Task 1.1 | ✓ |
| Unify 11+ narration visual styles → 10 locked shells | T1 Task 1.2–1.3 | ✓ |
| `emitRollLine` helper + 10 emitter migrations | T1 Task 1.4, 1.6 | ✓ |
| Roll-display shows skill name + breakdown (always) | T1 Task 1.5 (`_formatRollLine`) | ✓ |
| Fatigue HUD never shows X/10 with X > 10 | T2 Task 2.2 (migrateState clamp) | ✓ |
| Dist regenerated so play.bat picks up clamp | T2 Task 2.3 | ✓ |
| Jest covers migration clamp path | T2 Task 2.4 | ✓ |
| Player never sees `+ range -99` in roll line | T3 Task 3.4 (button disable) + T1 Task 1.5 (conditional render) | ✓ |
| 80 weapons declare `attackType` | T3 Task 3.1 | ✓ |
| Combat reads equipped weapon's attackType, not hardcoded | T3 Task 3.2–3.3 | ✓ |
| Disabled attack button has visible state + tooltip | T3 Task 3.4–3.5 | ✓ |
| Silent choices detected at runtime + emit generic | T4 Task 4.2 | ✓ |
| Silent choices queued for author replacement | T4 Task 4.2, 4.4 | ✓ |
| Static validator catches silent choices pre-merge | T4 Task 4.3 | ✓ |
| resultType vocabulary locked at 10 values | T5 Task 5.1 | ✓ |
| Plan saved at `docs/superpowers/plans/2026-06-09-narration-fatigue-range-content.md` | Plan Relocation step 0 | ✓ |
| One bundled plan, 5 parallel teams | Phase 1 structure | ✓ |
| 5 separate commits, sequential apply order | Phase 2 Task 6 | ✓ |
| Full verification matrix after merge | Phase 3 Task 7 | ✓ |

**Placeholder scan:** No "TBD", "TODO", or "similar to Task N" references. All code blocks complete. T1 contains one explicit read-before-write instruction ("Read the existing rule first — preserve any margin/padding/display props") which is required guidance, not a placeholder.

**Type consistency:** Function names — `addNarration`, `emitRollLine`, `_formatRollLine`, `addFatigue`, `FATIGUE_MAX`, `migrateState`, `getRangeModifier`, `getEquippedWeaponAttackType`, `adaptEnrichedChoice`, `getChoiceTier`, `rollD20`, `checkNarrationEmission`, `checkResultTypeVocabulary` — used consistently. CSS class names — `.scene-location`, `.scroll-entry`, `.scroll-entry__type`, `.scroll-entry__body`, `.scroll-entry__meta`, `.scroll-entry--success/failure/partial/neutral/complication/notice/encounter/dim/crit/fumble`, `.combat-action-btn[disabled]` — used consistently between Task 1.2 (CSS) and Task 1.3–1.5 (JS rendering) and Task 3.5 (combat CSS).

**Order consistency:** Phase 2 applies T2 → T3 → T1 → T4 → T5. T2 first unblocks save-state. T3 before T1 so T1's roll-display reads a clean `G._lastRollInfo.rangeMod` (no `-99`). T1 before T4 so T4's counter line is already in `addNarration`. T5 last because it's pure validator addition with no engine dependency.

---

# Execution Handoff

After this plan is approved:

**Subagent-Driven (recommended)** — REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`. Phase 1 dispatches T1, T2, T3, T4, T5 as five parallel subagents via the `agent-teams:parallel-feature-development` pattern. Phase 2 Team Lead and Phase 3 final validation run in the same session.

Tasks execute in this order: Pre-Flight Task 0 (sequential, blocking) → T1+T2+T3+T4+T5 (parallel) → Phase 2 Task 6 (sequential commits, order = T2→T3→T1→T4→T5) → Phase 3 Task 7 (sequential verification).
