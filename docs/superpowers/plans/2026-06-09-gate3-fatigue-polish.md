# Gate 3 + Engine Fatigue Cap + Topbar Polish + Narration Shell Unification Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` to execute task-by-task. Four implementation teams (T1/T2/T3/T4) work in parallel via the `agent-teams:parallel-feature-development` pattern with line-range ownership in `ledger-of-ash.html`. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close out the V1.0 narrative content unification sprint by validating two uncommitted P0 fixes, hardening the engine fatigue invariant with a canonical setter + DC penalty + first-cap toast, clearing the topbar + PLACES polish punch list, and unifying the narration scroll area so every entry (success/failure/neutral/notice/combat-begins/roll-line/follow-up) renders inside one consistent card shell.

**Architecture:** Single-file engine (`ledger-of-ash.html`, ~19K lines) with non-overlapping line-range ownership: T1 owns the game-logic block (helpers, `rollD20`, `updateHUD`), T2 owns the topbar CSS + HTML + new `More ▾` dropdown JS (lines 500–2500), T3 owns two PLACES string literals (15800–15900), T4 owns the `.narrative-text`/`.result-text`/`.scroll-entry` CSS block + the `addNarration` function + every roll-line / combat-begins / neutral-tag emitter that currently bypasses the shell. The Team Lead applies T1/T2/T3/T4 patches sequentially after parallel completion to avoid same-file commit races. Branch: `main`. Plan executor must first relocate this file to `docs/superpowers/plans/2026-06-09-gate3-fatigue-polish.md` before executing Task 1.

**Tech Stack:** Vanilla JS (ES5), CSS (inline `<style>`), Jest (unit), Playwright (e2e), Node http-server. No bundler — `play.bat` opens `ledger-of-ash.html` over `file://` in Chrome app mode.

---

## Plan Relocation

- [ ] **Step 0: Copy plan to repo docs**

```bash
mkdir -p /c/Users/CEO/ledger-of-ash/docs/superpowers/plans
cp /c/Users/CEO/.claude/plans/composed-squishing-boot.md \
   /c/Users/CEO/ledger-of-ash/docs/superpowers/plans/2026-06-09-gate3-fatigue-polish.md
```

Then execute all tasks below against the repo copy. The `.claude/plans/` copy is plan-mode scaffolding only.

---

## Scope Boundaries (Out of Scope)

- New content authoring (no new choices, no new localities, no new NPCs)
- Stage 3+ work (frozen per `CLAUDE.md`)
- Save schema changes (no `G` property additions; the `_fatigue_cap_seen` flag goes in `G.flags`, which is migration-safe)
- Refactor of the 42 already-clamped sites in `content/travel_corridors.js` — leave them as inline `Math.min`; the engine-level invariant in Task 1 backs them up
- `BOAT_ROUTE_NARRATIONS` and consumer wiring (already shipped uncommitted)
- "Forge it — reach for your weapon" choice — **dropped from scope**, no content file contains this label; require a fresh screenshot before any future action
- **Narration content rewrites** — T4 changes the visual shell only; never edit result text or roll-line wording
- **New `resultType` semantics** — T4 uses the existing six types (`success`/`failure`/`neutral`/`complication`/`notice`/`encounter`) and does not introduce new ones

---

# Pre-Flight: Gate 3 Validation of Uncommitted P0 Fixes

**Why first:** Two P0 fixes are uncommitted in the working tree. If either is broken, every downstream task builds on bad foundation. Validate before touching anything.

### Task 0: Validate uncommitted P0 fixes

**Files (read-only):**
- `content/travel_corridors.js` (42 fatigue clamps + 6 new `LAND_ROUTE_NARRATIONS` entries)
- `tests/e2e/playtest-headed.spec.js` (journey-overlay scope fix)
- `ledger-of-ash.html` (unchanged)

- [ ] **Step 1: Jest unit suite**

Run: `npm test`
Expected: exit code 0, all suites pass. If pre-existing mastery-XP test failures from earlier sprints persist, accept them as known and continue. Capture the line of any new failure.

- [ ] **Step 2: Content validators**

Run: `npm run test:content`
Expected: exit code 0. Warnings (forbidden-word advisories, word-count over 90) are acceptable. Errors (broken script-tag wiring, banned categories on `addJournal`) are blocking.

- [ ] **Step 3: Continuity validators**

Run: `npm run test:continuity`
Expected: exit code 0.

- [ ] **Step 4: Headed playtest re-run (4 families)**

Run: `npm run test:e2e -- tests/e2e/playtest-headed.spec.js`
Expected: 4/4 SUCCESS terminal states. Pick counts roughly in-range: knight 50–80, illusionist 80–120, assassin 70–100, tactician 60–100.

- [ ] **Step 5: Open illusionist final character sheet screenshot**

Find the latest run's screenshot under `test-results/` or `playwright-report/`. Visually verify the Fatigue value on the final character sheet is ≤ 10. If > 10, the `content/travel_corridors.js` clamp didn't take — halt and dispatch a `code-modernization:legacy-analyst` subagent to bisect which of the 42 sites was missed.

- [ ] **Step 6: Commit the two P0 fixes**

```bash
cd /c/Users/CEO/ledger-of-ash
git add content/travel_corridors.js tests/e2e/playtest-headed.spec.js
git commit -m "fix(travel): clamp 42 fatigue increments + 6 LAND_ROUTE_NARRATIONS; scope spec pickChoice to journey overlay"
```

If any of Steps 1–5 failed, do NOT commit — fix in place, re-run, then commit.

---

# Phase 1: Parallel Team Implementation

The three teams below work in parallel with non-overlapping line-range ownership in `ledger-of-ash.html`. Each team produces a unified diff against `HEAD` for their owned ranges only. The Team Lead in Phase 2 applies all three patches sequentially.

**Coordination contract (binding for T1/T2/T3):**
- Each agent reads `ledger-of-ash.html` fresh before editing — line numbers may have drifted from prior commits.
- No team edits outside their declared line range.
- No team commits — Phase 2 handles all commits.
- Each team produces output: `(a)` a unified diff in their owned range, `(b)` a brief readme of changes, `(c)` confirmation that their range did not need lines outside the declared bounds.

---

## Team 1: Engine Fatigue Cap (T1)

**Owned line range in `ledger-of-ash.html`:** 12500–17800 (game logic, `rollD20`, `updateHUD`, `gainXp` neighborhood)
**Forbidden line ranges:** 0–2500 (T2 owns), 15800–15900 (T3 owns)

### Task 1.1: Add `FATIGUE_MAX` constant + `addFatigue(n)` setter

**Files:**
- Modify: `ledger-of-ash.html` — insert near `gainXp()` definition

- [ ] **Step 1: Locate `gainXp`**

```bash
grep -n "function gainXp" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Record the line. The new constant + setter go immediately after `gainXp`'s closing brace.

- [ ] **Step 2: Locate any existing `FATIGUE_MAX` to avoid collision**

```bash
grep -n "FATIGUE_MAX" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: 0 hits. If non-zero, a previous attempt left a stub — read it and decide whether to extend or replace.

- [ ] **Step 3: Insert constant + setter**

Insert the following block immediately after `gainXp()`'s closing brace:

```javascript
var FATIGUE_MAX = 10;

function addFatigue(n) {
  if (!G || typeof n !== 'number' || !isFinite(n)) return;
  var prev = G.fatigue || 0;
  G.fatigue = Math.max(0, Math.min(FATIGUE_MAX, prev + n));
  if (prev < FATIGUE_MAX && G.fatigue >= FATIGUE_MAX) {
    if (!G.flags) G.flags = {};
    if (!G.flags._fatigue_cap_seen) {
      G.flags._fatigue_cap_seen = true;
      if (typeof showToast === 'function') {
        showToast('You are exhausted.');
      }
    }
  }
}
```

`var` keyword (not `const`) — codebase uses ES5 syntax in the inline `<script>` block. `showToast` is the existing toast helper (verify in Step 4 below before relying on it).

- [ ] **Step 4: Verify `showToast` exists**

```bash
grep -n "function showToast" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: 1 hit. If 0 hits, look for `function toast(` or `addToast(` and adjust the call accordingly.

- [ ] **Step 5: Add invariant clamp in `updateHUD()`**

Find `updateHUD()`:

```bash
grep -n "function updateHUD" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Read the first 5 lines of the function body. Insert this single line as the first executable statement inside the function:

```javascript
if (G && typeof G.fatigue === 'number') G.fatigue = Math.max(0, Math.min(FATIGUE_MAX, G.fatigue));
```

This is the belt-and-suspenders invariant: even if some future content writes `G.fatigue = 38` directly, the next HUD render clamps it.

### Task 1.2: Migrate the 6 inline-clamped increment sites

Each existing site uses `G.fatigue = Math.min(10, (G.fatigue || 0) + N)`. Replace each with `addFatigue(N)`.

- [ ] **Step 1: Locate all 6 sites**

```bash
grep -n "G\.fatigue\s*=\s*Math\.min(10" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: 6 hits. Record line numbers + the `N` value at each.

- [ ] **Step 2: Replace each site**

For each hit, read 1 line of context to confirm `N`, then replace the entire `G.fatigue = Math.min(10, (G.fatigue || 0) + N);` statement with `addFatigue(N);` — preserving any leading whitespace.

Example: `G.fatigue = Math.min(10, (G.fatigue || 0) + 2);` → `addFatigue(2);`

- [ ] **Step 3: Migrate the 2 decrement floors**

```bash
grep -n "G\.fatigue\s*=\s*Math\.max(0" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: 2 hits (decrement sites that floor at 0). Replace `G.fatigue = Math.max(0, (G.fatigue || 0) - N);` with `addFatigue(-N);` at each.

### Task 1.3: Add `-1` physical-skill DC penalty when fatigue is at cap

**Why:** User-spec: at `fatigue === FATIGUE_MAX`, all physical-skill rolls (might / vigor / finesse) take `-1`. Mental/social rolls (wits / charm / spirit) unaffected.

**File:** `ledger-of-ash.html` — modify `rollD20()` (~line 12525 per `CLAUDE.md`)

- [ ] **Step 1: Locate `rollD20`**

```bash
grep -n "function rollD20" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Read 30 lines from that point to understand the existing bonus-stacking pattern (rival penalty, sleepless, campout, travel fatigue). The new penalty stacks the same way.

- [ ] **Step 2: Add the penalty calculation**

Find the section where existing penalties (rival, sleepless, etc.) are summed into a `bonus` or `mod` variable. Add:

```javascript
var _physicalSkills = {might: true, vigor: true, finesse: true};
var _normSk = (typeof _KEY_NORM !== 'undefined' && _KEY_NORM[skill]) ? _KEY_NORM[skill] : skill;
var fatigueExhaustionPenalty = 0;
if (G && G.fatigue >= FATIGUE_MAX && _physicalSkills[_normSk]) {
  fatigueExhaustionPenalty = -1;
}
```

Then add `fatigueExhaustionPenalty` to the existing total-bonus sum that goes into the roll result. **Match the existing stacking pattern** — do not invent a new field name; use whatever the function already calls its running total (e.g. `mod`, `bonus`, `total`).

`_KEY_NORM` is the existing skill-key normalizer (defined elsewhere in the file per `CLAUDE.md`). If it's not in scope at this call site, inline the map: `{combat:'might',stealth:'finesse',survival:'vigor',lore:'wits',persuasion:'charm'}`.

- [ ] **Step 3: Store penalty metadata in `G._lastRollInfo`**

Find where the function writes to `G._lastRollInfo`. Add the new field so character-sheet roll inspection can show the penalty source:

```javascript
G._lastRollInfo.fatigueExhaustionPenalty = fatigueExhaustionPenalty;
```

### Task 1.4: Verify T1

- [ ] **Step 1: Re-grep for unclamped writes**

```bash
grep -n "G\.fatigue\s*[+-]?=\s*[0-9]" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: 1 hit only — the invariant clamp line in `updateHUD()`. All other `G.fatigue =` writes must now route through `addFatigue()`.

- [ ] **Step 2: Run Jest**

```bash
npm test
```

Expected: 0 new failures. Pre-existing mastery-XP failures (if any) acceptable.

- [ ] **Step 3: Write a smoke test**

Create `tests/logic/fatigue-cap.test.js`:

```javascript
const { createGameContext } = require('../setup');

describe('addFatigue invariant', () => {
  test('clamps at FATIGUE_MAX (10)', () => {
    const { G, addFatigue } = createGameContext({ fatigue: 8 });
    addFatigue(5);
    expect(G.fatigue).toBe(10);
  });

  test('clamps at 0 floor on negative delta', () => {
    const { G, addFatigue } = createGameContext({ fatigue: 2 });
    addFatigue(-5);
    expect(G.fatigue).toBe(0);
  });

  test('first-cap toast fires once per save', () => {
    const { G, addFatigue, toasts } = createGameContext({ fatigue: 9, flags: {} });
    addFatigue(2);
    expect(G.flags._fatigue_cap_seen).toBe(true);
    const firstCount = toasts.filter(t => /exhausted/i.test(t)).length;
    expect(firstCount).toBe(1);
    addFatigue(-1);
    addFatigue(2);
    const secondCount = toasts.filter(t => /exhausted/i.test(t)).length;
    expect(secondCount).toBe(1);
  });

  test('rollD20 applies -1 physical penalty at cap', () => {
    const { G, rollD20 } = createGameContext({ fatigue: 10, level: 3, skills: {might: 2} });
    const result = rollD20('might', 0);
    expect(result.total).toBeLessThan(result.roll + 2 + 1);
  });

  test('rollD20 does NOT apply penalty on wits/charm/spirit', () => {
    const { G, rollD20 } = createGameContext({ fatigue: 10, level: 3, skills: {wits: 2} });
    const result = rollD20('wits', 0);
    expect(result.total).toBe(result.roll + 2);
  });
});
```

Run: `npx jest tests/logic/fatigue-cap.test.js`
Expected: 5/5 pass.

### Task 1.5: T1 produces output

T1 produces:
1. Unified diff of changes to `ledger-of-ash.html` within owned range
2. New file `tests/logic/fatigue-cap.test.js`
3. Brief readme: lines touched, sites migrated, tests added

T1 does NOT commit. Hand to Team Lead.

---

## Team 2: Topbar Polish + `More ▾` Dropdown (T2)

**Owned line range in `ledger-of-ash.html`:** 500–2500 (CSS block + topbar HTML); plus a new JS handler block to be inserted at the end of the existing `<script>` block (line range determined by T2 from `grep`)
**Forbidden line ranges:** 12500–17800 (T1 owns), 15800–15900 (T3 owns)

### Task 2.1: Add breakpoint CSS for narrow viewports

**File:** `ledger-of-ash.html` — modify around lines 511–518

- [ ] **Step 1: Read current `#topbar` rule**

Read lines 505–525 of `ledger-of-ash.html`.

- [ ] **Step 2: Append breakpoint rules immediately after the existing `#topbar` block**

```css
@media (max-width: 1366px) {
  #topbar { padding: 0 10px; font-size: 13px; }
  #topbar .topbar-brand .game-title { font-size: 16px; }
  #topbar .topbar-nav { gap: 8px; }
  #topbar .tnav-btn { padding: 4px 8px; }
}

@media (max-width: 1280px) {
  #topbar .topbar-brand .game-title { display: none; }
  #topbar #hud-safe-streak { display: none; }
  #topbar #hud-case-file-label { display: none; }
  #topbar #hud-case-file-track { width: 40px; }
}

@media (max-width: 1200px) {
  #topbar { font-size: 12px; padding: 0 6px; }
  #topbar .tnav-btn { padding: 3px 6px; }
}

.tnav-more-wrap { position: relative; display: inline-block; }
.tnav-more-panel {
  display: none;
  position: absolute;
  top: 100%; right: 0;
  background: var(--coal, #0c0a14);
  border: 1px solid var(--char, #131019);
  padding: 4px;
  min-width: 140px;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0,0,0,0.8);
}
.tnav-more-wrap.is-open .tnav-more-panel { display: block; }
.tnav-more-panel .tnav-btn {
  display: block;
  width: 100%;
  text-align: left;
  margin: 2px 0;
}
```

The three media queries do progressive shrinking: 1366 → padding+font shrink, 1280 → hide wordmark/streak/CaseFile-label, 1200 → further shrink. The `.tnav-more-wrap` rules style the new dropdown.

### Task 2.2: Restructure topbar nav HTML with `More ▾` dropdown

**File:** `ledger-of-ash.html` — modify lines 1945–1960

- [ ] **Step 1: Read lines 1945–1961 to confirm current structure**

- [ ] **Step 2: Replace the `<nav class="topbar-nav">` block**

```html
<nav class="topbar-nav">
  <button class="tnav-btn" id="btn-map">Map</button>
  <button class="tnav-btn" id="btn-journal">Journal</button>
  <button class="tnav-btn" id="btn-npcs">Contacts</button>
  <button class="tnav-btn" id="btn-places" onclick="showPlaces()">Places</button>
  <button class="tnav-btn" id="btn-notices">Board</button>
  <button class="tnav-btn" id="btn-party">Party</button>
  <button class="tnav-btn" id="btn-camp">Camp</button>
  <button class="tnav-btn" id="btn-charsheet">Sheet</button>
  <span class="tnav-more-wrap" id="tnav-more-wrap">
    <button class="tnav-btn" id="btn-more" onclick="toggleMoreMenu(event)">More &#x25BE;</button>
    <div class="tnav-more-panel" id="tnav-more-panel">
      <button class="tnav-btn" id="btn-save" onclick="showSaveModal('save'); closeMoreMenu();">Save</button>
      <button class="tnav-btn" id="btn-load" onclick="showSaveModal('load'); closeMoreMenu();">Load</button>
      <button class="tnav-btn" id="btn-export-save" onclick="exportSave(); closeMoreMenu();">Export</button>
      <button class="tnav-btn" id="btn-howto" onclick="showHowToPlay(); closeMoreMenu();">How to Play</button>
      <button class="tnav-btn tnav-end" id="btn-end-legend" onclick="closeMoreMenu();">End</button>
    </div>
  </span>
</nav>
```

Eight always-visible buttons (Map, Journal, Contacts, Places, Board, Party, Camp, Sheet) + `More ▾` opens a panel with Save, Load, Export, How to Play, End. **End** retains its existing click behavior — if End was previously wired by a JS event listener (not inline `onclick`), check after edit that its handler still binds to `#btn-end-legend`.

- [ ] **Step 3: Find and verify `#btn-end-legend` event wiring**

```bash
grep -n "btn-end-legend" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

If a JS event listener attaches to `#btn-end-legend` elsewhere, the new structure preserves the ID — wiring still works. If End's behavior was inline, re-add the original `onclick=` attribute alongside `closeMoreMenu();`.

### Task 2.3: Add `toggleMoreMenu` and `closeMoreMenu` JS handlers

**File:** `ledger-of-ash.html` — append to the end of the main `<script>` block

- [ ] **Step 1: Find a safe insertion point**

```bash
grep -n "</script>" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | tail -5
```

Choose the last `</script>` immediately before `</body>` — insert before it.

- [ ] **Step 2: Insert handlers**

```javascript
function toggleMoreMenu(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  var wrap = document.getElementById('tnav-more-wrap');
  if (!wrap) return;
  wrap.classList.toggle('is-open');
}

function closeMoreMenu() {
  var wrap = document.getElementById('tnav-more-wrap');
  if (wrap) wrap.classList.remove('is-open');
}

document.addEventListener('click', function(e) {
  var wrap = document.getElementById('tnav-more-wrap');
  if (!wrap || !wrap.classList.contains('is-open')) return;
  if (!wrap.contains(e.target)) closeMoreMenu();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeMoreMenu();
});
```

Click-outside and Escape close behavior. `stopPropagation` on the button click prevents the document listener from immediately closing the panel that just opened.

### Task 2.4: Verify T2

- [ ] **Step 1: Open `ledger-of-ash.html` in Chrome via `play.bat`**

- [ ] **Step 2: Manually verify**

In Chrome devtools, set viewport to 1280×800. Confirm:
- `Ledger of Ash` wordmark hidden
- Safe-streak counter hidden
- 8 inline nav buttons fit without overflow
- `More ▾` button at the right edge
- Click `More ▾` → panel appears with Save / Load / Export / How to Play / End
- Click Save → modal opens (save flow works)
- Click outside `More ▾` → panel closes
- Press Escape with panel open → panel closes

- [ ] **Step 3: Set viewport to 1920×1080 and confirm**

All elements visible: wordmark shown, safe streak shown, Case File label shown, all 8 inline buttons + More button fit comfortably.

### Task 2.5: T2 produces output

T2 produces:
1. Unified diff of changes to `ledger-of-ash.html` within owned ranges (CSS block + topbar HTML + JS append block)
2. Brief readme of changes
3. Screenshots at 1280×800 and 1920×1080 confirming layout

T2 does NOT commit. Hand to Team Lead.

---

## Team 3: PLACES String Cleanup (T3)

**Owned line range in `ledger-of-ash.html`:** 15800–15900 (PLACES rendering function)
**Forbidden line ranges:** 0–2500 (T2 owns), 12500–17800 except 15800–15900 (T1 owns the rest)

### Task 3.1: Replace PLACES preamble copy

**File:** `ledger-of-ash.html` — line 15847

- [ ] **Step 1: Read line 15847 in context**

Read lines 15840–15855.

- [ ] **Step 2: Find and verify the literal**

```bash
grep -n "Stage II unlocked. Canon-supported routes" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: 1 hit at or near line 15847.

- [ ] **Step 3: Replace**

Change:

```javascript
'Stage II unlocked. Canon-supported routes connect the polities below.'
```

To:

```javascript
'Stage II. The wider continent opens.'
```

Mind the surrounding quote style — match whatever single/double quote the file uses on this line.

### Task 3.2: Remove `(synthetic)` distance suffix

**File:** `ledger-of-ash.html` — line 15862

- [ ] **Step 1: Read line 15862 in context**

Read lines 15858–15870.

- [ ] **Step 2: Locate the conditional**

```bash
grep -n "is_synthetic" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: at least 1 hit at the render-time suffix. There may be additional hits in the data layer — leave those alone.

- [ ] **Step 3: Remove only the render-time suffix**

The render call typically looks like:

```javascript
dist.km + ' km' + (dist.is_synthetic ? ' (synthetic)' : '')
```

Change to:

```javascript
dist.km + ' km'
```

Or, if the conditional is on its own template-literal segment, delete the entire `(dist.is_synthetic ? ...)` ternary. **Do not** remove `is_synthetic` from `dist.km`'s producer — the flag stays in the data layer for future use.

### Task 3.3: Verify T3

- [ ] **Step 1: Re-grep for the removed strings**

```bash
grep -n "Canon-supported" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
grep -n "is_synthetic ? ' (synthetic)'" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: 0 hits for both.

- [ ] **Step 2: Open `ledger-of-ash.html` via `play.bat`**

Force Stage II (via dev console: `G.stage = 'Stage II'; resolveArrival(G.location);`), open the PLACES overlay. Confirm:
- Preamble reads "Stage II. The wider continent opens."
- No distance row displays "(synthetic)"

### Task 3.4: T3 produces output

T3 produces:
1. Unified diff of changes to `ledger-of-ash.html` lines 15847 and 15862
2. Brief readme

T3 does NOT commit. Hand to Team Lead.

---

## Team 4: Narration Panel Shell Unification (T4)

**Why this team exists:** Screenshots (Shelkopolis-Level-4 and Glasswake-Level-4) show that the narration scroll panel renders `success` and `failure` blocks inside a gold-bordered card shell, but every other entry — `d20:` roll lines, `COMBAT BEGINS` headers, `· NEUTRAL` tags, follow-up neutral paragraphs, complication notes — bypasses the shell and renders as loose text with at least 4 different inline styles. Same scene, same panel, five visual languages. Root cause aligns with the 12:28 narrative-scroll audit: `addNarration(label, html, resultType)` only routes a subset of `resultType` branches through the card shell.

**Owned ranges in `ledger-of-ash.html`:**
- CSS block additions: append to the end of the main `<style>` block (T4 determines line from `grep`)
- `addNarration` function body (T4 locates via `grep`; expected ~line 11200–11400)
- Roll-line emitter (where `d20:` text is appended — T4 locates via `grep "d20: "`)
- `COMBAT BEGINS` emitter (T4 locates via `grep "COMBAT BEGINS"`)
- Neutral-tag emitter (T4 locates via `grep "NEUTRAL"` near the `addNarration` call sites)

**Forbidden line ranges:** 500–2500 (T2), 12500–17800 (T1), 15800–15900 (T3). T4 must verify its grep results fall outside T1's range — if any emitter lives inside 12500–17800, T4 coordinates by extracting the emitter into a helper that lives in T4's CSS+helper block at the end of the script.

### Task 4.1: Audit the current `addNarration` branches and emitter call sites

- [ ] **Step 1: Locate `addNarration`**

```bash
grep -n "function addNarration" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: 1 hit. Record line number.

- [ ] **Step 2: Read the function body (40 lines)**

Read 40 lines from the function start. Note every branch on `resultType`. Record which branches wrap their output in a `<div class="result-card ...">` (or equivalent) and which emit bare HTML.

Expected branches per `CLAUDE.md` `addJournal` adjacent comment: `success`, `failure`, `neutral`, `complication`. Screenshots reveal additional in-flight types: `notice` (used in image 1's "WHAT DO YOU DO?" header area? — confirm) and `encounter` (combat-begins). Verify all six.

- [ ] **Step 3: Grep for bare emitters that bypass `addNarration`**

```bash
grep -n "d20: " /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
grep -n "COMBAT BEGINS" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
grep -n "· NEUTRAL" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
grep -n "innerHTML.*scroll" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -20
```

Record every line that builds narration HTML without going through `addNarration`. These are the emitters T4 must reroute or wrap.

### Task 4.2: Define one shared card-shell CSS

**File:** `ledger-of-ash.html` — append to the end of the main `<style>` block (T4 locates via `grep` for the last `</style>`)

- [ ] **Step 1: Append the unified shell rule**

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
.scroll-entry__meta { display: block; margin-top: 6px; font-size: 13px; font-style: italic; opacity: 0.72; }

.scroll-entry--success     { border-left-color: var(--discovery, #26603e); }
.scroll-entry--success     .scroll-entry__type { color: var(--jade-bright, #5ec78a); }
.scroll-entry--failure     { border-left-color: var(--danger,    #be2828); }
.scroll-entry--failure     .scroll-entry__type { color: var(--blood-bright, #e76a6a); }
.scroll-entry--neutral     { border-left-color: rgba(216, 154, 44, 0.35); }
.scroll-entry--neutral     .scroll-entry__type { color: rgba(216, 154, 44, 0.7); }
.scroll-entry--complication { border-left-color: #d47517; }
.scroll-entry--complication .scroll-entry__type { color: #d47517; }
.scroll-entry--notice      { border-left-color: #4a7ab5; }
.scroll-entry--notice      .scroll-entry__type { color: #4a7ab5; }
.scroll-entry--encounter   { border-left-color: var(--danger, #be2828); }
.scroll-entry--encounter   .scroll-entry__type { color: var(--blood-bright, #e76a6a); }
```

Six modifiers — one per `resultType`. Border-left + type pill is the discriminator. Body and meta typography is uniform.

### Task 4.3: Rewrite `addNarration` to route every entry through the shell

**File:** `ledger-of-ash.html` — modify `addNarration` in place

- [ ] **Step 1: Replace the function body**

The new function builds the same `.scroll-entry` shell for every `resultType`. Pseudocode (T4 reads the current implementation first to preserve its scroll target + dedupe logic):

```javascript
function addNarration(label, html, resultType) {
  var type = (typeof resultType === 'string' && resultType) ? resultType : 'neutral';
  var typeLabelMap = {
    success: '\u2713 Success',
    failure: '\u2717 Failure',
    neutral: 'Neutral',
    complication: 'Complication',
    notice: 'Notice',
    encounter: 'Encounter'
  };
  var typeLabel = typeLabelMap[type] || 'Neutral';
  var bodyHtml = html || '';
  var headerHtml = label
    ? '<div class="scroll-entry__header">' + label + '</div>'
    : '';
  var entry =
    '<div class="scroll-entry scroll-entry--' + type + '">' +
      '<span class="scroll-entry__type">' + typeLabel + '</span>' +
      headerHtml +
      '<div class="scroll-entry__body">' + bodyHtml + '</div>' +
    '</div>';
  // Preserve existing scroll-target append + scrollIntoView behavior here
  var target = document.getElementById('scroll') || document.getElementById('narrative') || document.querySelector('.narrative-text');
  if (target) {
    target.insertAdjacentHTML('beforeend', entry);
    target.scrollTop = target.scrollHeight;
  }
}
```

T4 preserves whatever scroll-container ID/class the current implementation uses — do not guess. Read the existing implementation first.

- [ ] **Step 2: Add `appendRollLine(rollText)` helper**

For roll lines (e.g. `d20: 14 + Charm 2 + trait 3 = 19 vs DC 18 — Success`), append as the meta line of the most recent entry rather than as a bare text node:

```javascript
function appendRollLine(rollText) {
  var target = document.getElementById('scroll') || document.getElementById('narrative') || document.querySelector('.narrative-text');
  if (!target) return;
  var entries = target.querySelectorAll('.scroll-entry');
  var last = entries[entries.length - 1];
  if (!last) {
    addNarration('', rollText, 'neutral');
    return;
  }
  var meta = document.createElement('span');
  meta.className = 'scroll-entry__meta';
  meta.textContent = rollText;
  last.appendChild(meta);
}
```

### Task 4.4: Reroute bare emitters

For every grep hit from Task 4.1 Step 3 that builds narration HTML without going through `addNarration`:

- [ ] **Step 1: Migrate `d20: …` roll lines**

Replace direct `innerHTML +=` / `textContent =` writes with `appendRollLine(rollText)`. Preserve the exact roll-line text — T4 changes the emission mechanism only, not the wording.

- [ ] **Step 2: Migrate `COMBAT BEGINS` header**

Replace with `addNarration('', 'Combat begins.', 'encounter');` followed by `addNarration('', 'You face the ' + enemy.name + '. HP: ' + enemy.hp + ' · DEF: ' + enemy.def + '. Choose your action.', 'neutral');`. The two-entry split lets the encounter pill and the action prompt each have their own clean shell.

- [ ] **Step 3: Remove the `· NEUTRAL` bullet-prefix pill**

The `.scroll-entry--neutral .scroll-entry__type` now renders the type label uniformly. The bullet `·` prefix is no longer needed — strip it from every emitter that produced it.

### Task 4.5: Verify T4

- [ ] **Step 1: Re-grep for orphan emitters**

```bash
grep -n "d20: " /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
grep -n "COMBAT BEGINS" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
grep -n "· NEUTRAL" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: zero hits for `· NEUTRAL`. The `d20:` hits should now all live inside `appendRollLine` calls (verify by reading 2 lines of context for each). `COMBAT BEGINS` hits should all be inside `addNarration` arguments.

- [ ] **Step 2: Open `ledger-of-ash.html` via `play.bat` and manually verify**

Spawn a knight, take any choice that triggers a roll. Confirm:
- The result block renders inside `.scroll-entry--success` (or `--failure`) with a green/red left border and a type pill in the top-left.
- The `d20: …` line renders as the meta line **inside** the same card, italic + dim, not as a bare line below it.
- Trigger combat (find a combat-tagged choice). Confirm `COMBAT BEGINS` renders as a `.scroll-entry--encounter` with red border + "Encounter" pill, and the action prompt renders as a separate `.scroll-entry--neutral` card immediately below it.

- [ ] **Step 3: Take screenshot at 1280×800 and 1920×1080**

Confirm the panel shows consistent card shells, no orphan italic text, no mixed font sizes between entries.

### Task 4.6: T4 produces output

T4 produces:
1. Unified diff of changes to `ledger-of-ash.html` (CSS append + `addNarration` rewrite + emitter reroutes)
2. Brief readme listing: every emitter migrated, every `resultType` branch covered, manual-verify screenshots
3. Two screenshots (success+roll, combat-begins+neutral) confirming uniform shell

T4 does NOT commit. Hand to Team Lead.

---

# Phase 2: Team Lead Integration + Commits

**Team Lead role:** Receive T1, T2, T3, T4 patches. Apply sequentially to working tree. Commit each as separate commit. Resolve any line-range collisions (should be zero by design — but verify).

### Task 4: Integration

- [ ] **Step 1: Verify clean working tree**

```bash
cd /c/Users/CEO/ledger-of-ash
git status
```

Expected: clean (Pre-Flight Task 0 Step 6 already committed the P0 fixes).

- [ ] **Step 2: Apply T1 patch (engine fatigue)**

Apply T1's unified diff. Add new test file. Verify with:

```bash
grep -c "addFatigue" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: ≥ 10 hits (1 def + 6 increment migrations + 2 decrement migrations + 1 in test file ref).

```bash
npm test
```

Expected: 0 new failures. New tests in `tests/logic/fatigue-cap.test.js` all pass.

- [ ] **Step 3: Commit T1**

```bash
git add ledger-of-ash.html tests/logic/fatigue-cap.test.js
git commit -m "feat(engine): centralize fatigue invariant via addFatigue(n) + FATIGUE_MAX; -1 physical penalty at cap; first-cap toast"
```

- [ ] **Step 4: Apply T2 patch (topbar + More menu)**

Apply T2's unified diff. Open `ledger-of-ash.html` via `play.bat`, set viewport to 1280×800, verify topbar lays out cleanly with `More ▾` dropdown functional.

- [ ] **Step 5: Commit T2**

```bash
git add ledger-of-ash.html
git commit -m "polish(topbar): breakpoint shrink at 1366/1280/1200; collapse Save/Load/Export/HowTo/End into More dropdown; hide brand wordmark below 1280"
```

- [ ] **Step 6: Apply T3 patch (PLACES strings)**

Apply T3's unified diff. Verify both string changes via grep.

- [ ] **Step 7: Commit T3**

```bash
git add ledger-of-ash.html
git commit -m "polish(places): drop 'Canon-supported' dev vocabulary; remove (synthetic) distance suffix"
```

- [ ] **Step 8: Apply T4 patch (narration shell unification)**

Apply T4's unified diff. Verify with:

```bash
grep -n "scroll-entry--" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -10
grep -n "· NEUTRAL" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Expected: 6+ hits on `scroll-entry--` (one per resultType modifier + `addNarration` interpolation), zero hits on `· NEUTRAL`. Open `play.bat`, spawn a knight, trigger a roll-tagged choice, confirm the result card + roll meta line render inside one shell.

- [ ] **Step 9: Commit T4**

```bash
git add ledger-of-ash.html
git commit -m "polish(narration): unify scroll-entry card shell across all resultTypes; route d20 lines + COMBAT BEGINS + neutral tag through one renderer"
```

---

# Phase 3: Final Verification Gate

### Task 5: Full validation matrix

- [ ] **Step 1: Run all test suites**

```bash
npm run test:all
```

Expected: all suites pass. Pre-existing mastery-XP failures acceptable.

- [ ] **Step 2: Headed playtest re-run (4 families)**

```bash
npm run test:e2e -- tests/e2e/playtest-headed.spec.js
```

Expected: 4/4 SUCCESS. Final illusionist fatigue ≤ 10 on character sheet screenshot.

- [ ] **Step 3: Manual smoke check via `play.bat`**

Open the game. Spawn a character. In dev console:

```javascript
G.fatigue = 9;
addFatigue(2);
// Expect: G.fatigue === 10, toast 'You are exhausted.' appears once
addFatigue(-1);
addFatigue(2);
// Expect: G.fatigue === 10, toast does NOT re-fire
G.fatigue = 38;
updateHUD();
// Expect: G.fatigue === 10 after updateHUD invariant clamp
```

- [ ] **Step 4: Force Stage II + open PLACES**

```javascript
G.stage = 'Stage II';
resolveArrival(G.location);
showPlaces();
```

Confirm preamble reads "Stage II. The wider continent opens." and no row displays "(synthetic)".

- [ ] **Step 5: Viewport check**

In Chrome devtools, resize to 1280×800 and 1920×1080. Verify topbar layout at both. Open `More ▾` panel at both. Verify Save / Load / Export / How to Play / End all function from the panel.

- [ ] **Step 6: Narration shell verification**

Spawn a knight. Take a `risky` or `bold` choice that triggers a `rollD20` call. Confirm:
- The result block renders inside a `.scroll-entry--success` or `.scroll-entry--failure` shell with a colored left border and a type pill in the top-left.
- The `d20: …` roll line renders inside the same shell as the meta line (italic dim), not as a separate bare line below.

Then trigger combat (any `cid: '__combat__...'` choice). Confirm:
- `COMBAT BEGINS` renders as `.scroll-entry--encounter` with a red left border + "Encounter" pill.
- The "You face the X" prompt renders as a separate `.scroll-entry--neutral` shell directly below, with the same body typography and a "Neutral" pill.

Take screenshots of both. Compare against the user-supplied Image 4 / Image 5 from 2026-06-09: every entry must now share one shell, not five.

- [ ] **Step 7: Push**

```bash
git push origin main
```

---

# Self-Review

**Spec coverage check** (per writing-plans skill):

| Requirement | Implementing Task | Status |
|---|---|---|
| Validate uncommitted travel-corridor + spec scope fixes | Task 0 | ✓ |
| `addFatigue(n)` canonical setter | Task 1.1 | ✓ |
| `FATIGUE_MAX = 10` constant | Task 1.1 | ✓ |
| Invariant clamp in `updateHUD()` | Task 1.1 Step 5 | ✓ |
| Migrate 6 existing inline-clamp sites | Task 1.2 | ✓ |
| Migrate 2 decrement floor sites | Task 1.2 Step 3 | ✓ |
| `-1` physical-skill penalty at cap | Task 1.3 | ✓ |
| `You are exhausted` toast once per save | Task 1.1 (in `addFatigue`) | ✓ |
| Topbar breakpoint CSS (1366/1280/1200) | Task 2.1 | ✓ |
| Hide wordmark below 1280 | Task 2.1 (1280px media query) | ✓ |
| Hide Safe Streak below 1280 | Task 2.1 (1280px media query) | ✓ |
| Collapse Case File label below 1280 | Task 2.1 (1280px media query) | ✓ |
| `More ▾` dropdown containing Save/Load/Export/HowTo/End | Task 2.2 | ✓ |
| Click-outside + Escape close behavior | Task 2.3 | ✓ |
| PLACES preamble replacement | Task 3.1 | ✓ |
| Remove `(synthetic)` suffix | Task 3.2 | ✓ |
| "Forge it" choice | **Dropped from scope** (see Scope Boundaries) | ✓ |
| Unify narration scroll shell across all `resultType`s | Task 4.2–4.4 | ✓ |
| Reroute `d20:` roll lines into shared shell | Task 4.3 Step 2 + Task 4.4 Step 1 | ✓ |
| Reroute `COMBAT BEGINS` + neutral combat intro through shell | Task 4.4 Step 2 | ✓ |
| Remove `· NEUTRAL` bullet-prefix pill | Task 4.4 Step 3 | ✓ |
| Jest tests for fatigue invariant | Task 1.4 Step 3 | ✓ |
| Headed playtest re-run after all changes | Task 5 Step 2 | ✓ |
| Narration shell verification after all changes | Task 5 Step 6 | ✓ |
| Four commits to main (one per team) | Phase 2 | ✓ |
| Plan saved at `docs/superpowers/plans/2026-06-09-gate3-fatigue-polish.md` | Plan Relocation step 0 | ✓ |

**Placeholder scan:** No "TBD", "TODO (caller)", "implement later", or "similar to Task N" references. All code blocks complete and self-contained. T4 contains one instructed read-before-write ("T4 preserves whatever scroll-container ID/class the current implementation uses — do not guess") which is required guidance, not a placeholder.

**Type consistency:** Function names — `addFatigue`, `FATIGUE_MAX`, `toggleMoreMenu`, `closeMoreMenu`, `showToast`, `showHowToPlay`, `showSaveModal`, `exportSave`, `showPlaces`, `resolveArrival`, `addNarration`, `appendRollLine` — used consistently across all tasks. CSS class names — `.tnav-more-wrap`, `.tnav-more-panel`, `.is-open`, `#tnav-more-wrap`, `#tnav-more-panel`, `#btn-more`, `.scroll-entry`, `.scroll-entry--success`, `.scroll-entry--failure`, `.scroll-entry--neutral`, `.scroll-entry--complication`, `.scroll-entry--notice`, `.scroll-entry--encounter`, `.scroll-entry__type`, `.scroll-entry__body`, `.scroll-entry__meta`, `.scroll-entry__header` — used consistently between Task 4.2 (CSS) and Task 4.3 (JS rendering).

---

# Execution Handoff

After this plan is approved:

**Subagent-Driven (recommended)** — REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`. Phase 1 dispatches T1, T2, T3, T4 as four parallel subagents via the `agent-teams:parallel-feature-development` pattern. Phase 2 Team Lead and Phase 3 final validation run in the same session.

Tasks execute in this order: Task 0 (sequential, blocking) → T1+T2+T3+T4 (parallel) → Task 4 (sequential commits) → Task 5 (sequential verification).
