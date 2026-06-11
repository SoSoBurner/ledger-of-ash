# Narrative Content Unification + Nomdara Bug Fix

> **For agentic workers:** REQUIRED APPROACH: Dispatch **TA + TB + TC simultaneously** as parallel `agent-teams:team-implementer` agents — zero file overlap. **Model: `haiku`** for all implementer tracks (TA, TB, TC, TA2). **Auto-accept all edits** — do not prompt for confirmation before writing files; proceed directly through all steps. Run **Gate 1** (headless playtest) only after TA and TB have both committed. Run **TA2** (CSS migration) only after Gate 1 passes AND TC is complete. Run **Gate 2** last.

**Goal:** Fix 3 Nomdara/choices regressions, add Nomdara caravan shop, migrate `#narrative-content` inline styles to CSS classes — with a 4-gate confirmation pass.

**Architecture:** Two parallel implementation rounds. Round 1: TA (HTML bug fixes) + TB (places_data content) + TC (spec-miner research) run in parallel. Gate 1: headless playtest. Round 2: TA2 (CSS migration using TC findings). Gate 2: headed playtest + DevTools audit + polish-review + Jest.

**Tech Stack:** Vanilla JS/CSS, single-file engine `ledger-of-ash.html` (~18K lines), `content/places_data.js`, Jest, Playwright.

---

## File Ownership

| Track | File(s) | Phase |
|-------|---------|-------|
| **TA** | `ledger-of-ash.html` | Round 1 + Round 2 (TA2) |
| **TB** | `content/places_data.js` | Round 1 |
| **TC** | Read-only (spec research) | Round 1 (parallel, no writes) |

**⚠️ TC writes nothing. TA and TB touch different files — true zero overlap.**

---

## Context

Three regressions introduced in the composed-squishing-boot sprint, plus one gap:

1. **enterNomdara() line 14802**: Stage I branch maps enriched choices to `{ label, cid, fn }`. `renderChoices()` reads `c.text` → buttons show "undefined". Click handler at line 12921 calls `choice.action()` → `fn:` never fires, buttons inert on click.

2. **renderChoices() line 12503**: Uses `c.text` directly with no guard. Any call site passing only `label:` renders "undefined" silently.

3. **Nomdara caravan Places overlay**: `G.location = 'nomdara_caravan'` (line 14809) but no `PLACES_DATA['nomdara_caravan']` entry exists. Places overlay shows "No known establishments."

4. **`#narrative-content` inline styles**: Roll result display (lines 9960, 9991, 11643, 11700) injects `<span style="font-size:11px;color:var(--ink-faint);font-family:Cinzel,serif">` spans directly into narration HTML, bypassing the CSS class system. Must migrate to `.roll-note` CSS class.

The harbor `places[].type='harbor'` entries added to 4 localities in the previous sprint are **travel routing metadata** — not UI entries. No renderer is needed. A clarifying comment must be added.

---

## Round 1 — Parallel Dispatch: TA + TB + TC

---

## Track TA: HTML Engine Bug Fixes

**File (TA owns exclusively):** `ledger-of-ash.html`

### TA-1: Fix enterNomdara() Stage I choice wiring

- [ ] **Step 1: Find line 14802**

```bash
grep -n "return { label: c.label, cid: '__enriched__nomdara_s1" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```
Expected: exactly 1 match at line ~14802.

- [ ] **Step 2: Replace line 14802**

Change:
```javascript
return { label: c.label, cid: '__enriched__nomdara_s1_' + (c.id || c.label), fn: function() { adaptEnrichedChoice(c); } };
```
To:
```javascript
return { text: c.label, label: c.label, cid: '__enriched__nomdara_s1_' + (c.id || c.label), action: function() { adaptEnrichedChoice(c); } };
```

Two changes only: `text: c.label` added as first property; `fn:` renamed to `action:`.

- [ ] **Step 3: Verify**

```bash
grep -n "text: c.label.*nomdara_s1.*action" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -3
```
Expected: 1 match.

---

### TA-2: Add undefined guard to renderChoices()

- [ ] **Step 1: Find line 12503**

```bash
grep -n "'<span class=\"choice-text\">' + c\.text" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -3
```
Expected: 1 match at line ~12503.

- [ ] **Step 2: Replace c.text**

Change:
```javascript
'<span class="choice-text">' + c.text + (isLocked ? ' <span style="font-size:10px;opacity:0.7">[path closed]</span>' : '') + '</span>' +
```
To:
```javascript
'<span class="choice-text">' + (c.text || c.label || '\u2014') + (isLocked ? ' <span style="font-size:10px;opacity:0.7">[path closed]</span>' : '') + '</span>' +
```

- [ ] **Step 3: Verify**

```bash
grep -n "c\.text || c\.label || " /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -3
```
Expected: 1 match.

---

### TA-3: Commit TA Round 1

- [ ] **Step 1: Run Jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -10
```
Expected: 0 new failures (pre-existing failures unchanged).

- [ ] **Step 2: Commit**

```bash
git add /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
git commit -m "fix(engine): enterNomdara Stage I text+action; renderChoices c.text||c.label guard"
```

---

## Track TB: Places Data — Nomdara Caravan

**File (TB owns exclusively):** `content/places_data.js`

### TB-1: Add nomdara_caravan PLACES_DATA entry

`G.location` is set to `'nomdara_caravan'` (ledger-of-ash.html line 14809). `showPlaces()` looks up `PLACES_DATA[G.location]`. The entry must use key `'nomdara_caravan'` exactly.

Schema confirmed from existing entries: `{ shops: [{ id, name, type, desc, items: [{ id, name, desc, cost, type?, effect: { type:'item', id, name } }] }] }`. Items with `type: 'consumable'` are re-purchasable; others are one-purchase.

- [ ] **Step 1: Read the end of PLACES_DATA to find insert point**

```bash
grep -n "^}" /c/Users/CEO/ledger-of-ash/content/places_data.js | tail -5
```
Find the closing `}` of `window.PLACES_DATA = { ... }`.

- [ ] **Step 2: Add entry before the closing brace**

Insert the following entry before the final `}` that closes `window.PLACES_DATA`:

```javascript
  'nomdara_caravan': {
    shops: [{
      id: 'nomdara_stock',
      name: 'Caravan Stock',
      type: 'trade',
      desc: 'Traveling goods. What they carry depends on where they\'ve been.',
      items: [
        {
          id: 'nomdara_provisions',
          name: 'Caravan Provisions',
          desc: 'Three days of travel rations. Keeps in any weather.',
          cost: 8,
          type: 'consumable',
          effect: { type: 'item', id: 'nomdara_provisions', name: 'Caravan Provisions' }
        },
        {
          id: 'nomdara_cure',
          name: 'Caravan Remedy',
          desc: 'Brewed in the wagon. Two uses. Each restores 5 HP.',
          cost: 14,
          type: 'consumable',
          effect: { type: 'item', id: 'nomdara_cure', name: 'Caravan Remedy', healAmount: 5, uses: 2 }
        },
        {
          id: 'nomdara_almanac',
          name: 'Route Almanac',
          desc: 'Way-stops and water sources annotated by the caravan master. Wits +1 on unfamiliar roads.',
          cost: 20,
          effect: { type: 'item', id: 'nomdara_almanac', name: 'Route Almanac', skillBonus: 'wits', bonus: 1 }
        },
        {
          id: 'nomdara_blade',
          name: 'Compact Blade',
          desc: 'Caravan defense stock. Balanced for the road. Might +1.',
          cost: 22,
          effect: { type: 'item', id: 'nomdara_blade', name: 'Compact Blade', skillBonus: 'might', bonus: 1 }
        }
      ]
    }]
  },
```

---

### TB-2: Add harbor metadata comment

The previous sprint added `places: [{ name: '...', description: '...', type: 'harbor' }]` arrays to 4 localities. These are travel routing metadata only — `showPlaces()` does not render them.

- [ ] **Step 1: Find the first `places:` array in places_data.js**

```bash
grep -n "places:" /c/Users/CEO/ledger-of-ash/content/places_data.js | head -5
```

- [ ] **Step 2: Add comment immediately above the first `places:` occurrence**

```javascript
// places[]: travel routing metadata only — not rendered in the Places overlay UI.
// type:'harbor' signals boat departure availability; checked by travel routing code.
```

---

### TB-3: Run validator and commit

- [ ] **Step 1: Run structure validator**

```bash
node /c/Users/CEO/ledger-of-ash/tests/content/validate-structure.js 2>&1 | tail -10
```
Expected: no new errors.

- [ ] **Step 2: Commit**

```bash
git add /c/Users/CEO/ledger-of-ash/content/places_data.js
git commit -m "content(nomdara): add nomdara_caravan PLACES_DATA shop; harbor metadata comment"
```

---

## Track TC: Spec-Miner Research (Read-Only)

**No file writes. Results fed to TA2.**

### TC-1: Inventory all inline styles in #narrative-content injection sites

Read the following sections of `ledger-of-ash.html` and document every `style=` attribute in HTML strings that end up rendered inside `#narrative-content`:

- [ ] **Step 1: Read rollD20 result label construction (~lines 9955–9995)**

```bash
sed -n '9955,9995p' /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Confirm these patterns exist:
- `rollLabel` span: `style="font-size:11px;color:var(--ink-faint);font-family:Cinzel,serif"`
- `_aStageSuffix` span: `style="color:var(--ink-faint);font-size:11px"`

- [ ] **Step 2: Read adaptEnrichedChoice rival mod display (~lines 11638–11650)**

```bash
sed -n '11638,11650p' /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Confirm: `style="color:var(--ink-faint);font-size:12px"` on the `(rival +N)` span.

- [ ] **Step 3: Read the second rival mod display (~lines 11695–11710)**

```bash
sed -n '11695,11710p' /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Confirm: same `style="color:var(--ink-faint);font-size:12px"` pattern.

- [ ] **Step 4: Report the full inventory**

Produce a list of every (file:line, element, inline style value) triple. Example format:

```
ledger-of-ash.html:9960  <span>  font-size:11px;color:var(--ink-faint);font-family:Cinzel,serif
ledger-of-ash.html:9959  <span>  color:var(--ink-faint);font-size:11px
ledger-of-ash.html:11643 <span>  color:var(--ink-faint);font-size:12px
ledger-of-ash.html:11700 <span>  color:var(--ink-faint);font-size:12px
```

This list is the contract for TA2.

---

## Gate 1: Headless Playtest

Run AFTER TA and TB have both committed. TC may still be running.

- [ ] **Step 1: Jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -20
```
Expected: 0 new failures.

- [ ] **Step 2: Content validators**

```bash
node tests/content/validate-content.js 2>&1 | tail -5 && node tests/content/validate-structure.js 2>&1 | tail -5
```

- [ ] **Step 3: Headless playtest**

```powershell
Set-Location "C:\Users\CEO\ledger-of-ash"; cmd /c "npx playwright test tests/e2e/playtest-headless.spec.js --reporter=line"
```
Pass criteria: 4/4 families SUCCESS.

- [ ] **Step 4: Triage any new failures**

Mechanical/code fixes only. No visual changes. Loop until 4/4.

---

## Round 2 — Track TA2: CSS Migration

**Prerequisite:** Gate 1 passed + TC-1 complete (spec-miner inventory in hand).

**File (TA2 owns exclusively):** `ledger-of-ash.html`

### TA2-1: Add `.roll-note` CSS class

All four inline styles found by TC are the same semantic role: a de-emphasized metadata annotation shown alongside a roll result. One CSS class covers all.

- [ ] **Step 1: Find the `.roll-result` CSS block**

```bash
grep -n "\.roll-result\|\.roll-line" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -5
```
Expected: ~line 1069.

- [ ] **Step 2: Add `.roll-note` immediately after the `.roll-result.failure` rule**

After the line `'.roll-result.failure { border-left-color: var(--blood-mid); }'` (around line 1077), insert:

```css
.roll-note {
  font-size: 11px;
  color: var(--ink-faint);
  font-family: var(--font-display);
}
```

- [ ] **Step 3: Verify the rule was added**

```bash
grep -n "\.roll-note" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -5
```
Expected: 1 match in the CSS block.

---

### TA2-2: Replace rollLabel inline style (lines ~9960 and ~9991)

Two call sites build `rollLabel` — one in the primary DC resolution path and one in the secondary roll display.

- [ ] **Step 1: Find both occurrences**

```bash
grep -n "font-size:11px;color:var(--ink-faint);font-family:Cinzel,serif" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```
Expected: 2 matches.

- [ ] **Step 2: Replace first occurrence**

Change:
```javascript
'<span style="font-size:11px;color:var(--ink-faint);font-family:Cinzel,serif">d20: ' + roll + ' + ' + skillVal + ' = <strong>' + (roll + skillVal) + '</strong> vs ' + dc + _aStageSuffix + '</span>'
```
To:
```javascript
'<span class="roll-note">d20: ' + roll + ' + ' + skillVal + ' = <strong>' + (roll + skillVal) + '</strong> vs ' + dc + _aStageSuffix + '</span>'
```

- [ ] **Step 3: Replace second occurrence** (same change, same pattern)

- [ ] **Step 4: Verify both replaced**

```bash
grep -n "font-size:11px;color:var(--ink-faint);font-family:Cinzel,serif" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```
Expected: 0 matches.

---

### TA2-3: Replace stage pressure suffix inline style (lines ~9959 and ~9990)

- [ ] **Step 1: Find both occurrences**

```bash
grep -n "'color:var(--ink-faint);font-size:11px" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -5
```

- [ ] **Step 2: Replace**

Change (both occurrences):
```javascript
' <span style="color:var(--ink-faint);font-size:11px">(Stage ' + _aStageRoman + ' pressure +' + _aStageNum + ')</span>'
```
To:
```javascript
' <span class="roll-note">(Stage ' + _aStageRoman + ' pressure +' + _aStageNum + ')</span>'
```

- [ ] **Step 3: Verify**

```bash
grep -n "color:var(--ink-faint);font-size:11px" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -5
```
Expected: 0 matches.

---

### TA2-4: Replace rival mod inline styles (lines ~11643 and ~11700)

- [ ] **Step 1: Find both occurrences**

```bash
grep -n "color:var(--ink-faint);font-size:12px" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -5
```
Expected: 2 matches.

- [ ] **Step 2: Replace both**

Change (both occurrences):
```javascript
'<span style="color:var(--ink-faint);font-size:12px">(rival +' + _rivalMod + ')</span>'
```
To:
```javascript
'<span class="roll-note">(rival +' + _rivalMod + ')</span>'
```

- [ ] **Step 3: Verify**

```bash
grep -n "color:var(--ink-faint);font-size:12px" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html | head -5
```
Expected: 0 matches.

---

### TA2-4b: Replace handleChoice() roll/pressure inline styles (lines ~13050 and ~13060)

TC's inventory pass found two additional inline-style spans in `handleChoice()` that use the same `.roll-note` semantic role. These were missed by the original plan but follow the identical patterns from TA2-2 and TA2-3.

- [ ] **Step 1: Find both occurrences**

```bash
grep -n "color:var(--ink-faint);font-size:11px\|font-size:11px;color:var(--ink-faint);font-family:Cinzel" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```
Expected after TA2-2/3: 2 remaining matches (at lines ~13050 and ~13060 in `handleChoice()`).

- [ ] **Step 2: Replace the stage pressure suffix at ~line 13050**

Change:
```javascript
' <span style="color:var(--ink-faint);font-size:11px">(Stage ' + _aStageRoman + ' pressure +' + _aStageNum + ')</span>'
```
To:
```javascript
' <span class="roll-note">(Stage ' + _aStageRoman + ' pressure +' + _aStageNum + ')</span>'
```

- [ ] **Step 3: Replace the roll display at ~line 13060**

Change:
```javascript
'<span style="font-size:11px;color:var(--ink-faint);font-family:Cinzel,serif">d20: ' + roll + ' + ' + skillVal + ' = <strong>' + (roll + skillVal) + '</strong> vs ' + dc + _aStageSuffix + '</span>'
```
To:
```javascript
'<span class="roll-note">d20: ' + roll + ' + ' + skillVal + ' = <strong>' + (roll + skillVal) + '</strong> vs ' + dc + _aStageSuffix + '</span>'
```

- [ ] **Step 4: Final zero-inline-style verification**

```bash
grep -n "color:var(--ink-faint);font-size:1[12]px\|font-size:1[12]px;color:var(--ink-faint)" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```
Expected: 0 matches across the entire file.

---

### TA2-5: Jest + commit

- [ ] **Step 1: Run Jest**

```bash
cd /c/Users/CEO/ledger-of-ash && npx jest --no-coverage 2>&1 | tail -10
```
Expected: 0 new failures.

- [ ] **Step 2: Commit**

```bash
git add /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
git commit -m "style(narrative): add .roll-note CSS class; migrate 6 inline span styles in roll/rival display"
```

---

## Gate 2: Headed Playtest + Four-Gate Confirmation

All 4 gates must pass before declaring the visual migration complete. Fix any regression and re-run the failed gate.

### Gate 2-A: Headed playtest

```powershell
Set-Location "C:\Users\CEO\ledger-of-ash"; cmd /c "npx playwright test tests/e2e/playtest-headed.spec.js --reporter=line"
```

Screenshots auto-saved to `test-results/`. Confirm files exist before proceeding.

---

### Gate 2-B: Chrome DevTools MCP — zero inline styles audit

With the game open in Chrome (use `play.bat` or DevTools MCP navigate):

- [ ] **Step 1: Trigger a result block** — make a choice in-game so `.result-block` elements render

- [ ] **Step 2: Run zero-inline-styles query**

```javascript
// Via mcp__plugin_chrome-devtools-mcp_chrome-devtools__evaluate_script
var els = Array.from(document.querySelectorAll('#narrative-content *[style]'));
return els.map(function(el) {
  return { tag: el.tagName, className: el.className, style: el.getAttribute('style') };
});
```
**Pass criteria:** Array is empty (zero `style=` attributes on `#narrative-content` descendants).

- [ ] **Step 3: Verify `.roll-note` computed style**

```javascript
var note = document.querySelector('.roll-note');
if (!note) return 'no .roll-note found — make a choice that triggers a roll first';
var cs = window.getComputedStyle(note);
return { color: cs.color, fontSize: cs.fontSize, fontFamily: cs.fontFamily };
```
**Pass criteria:** `fontSize` is `'11px'`; `fontFamily` includes `'Cinzel'` or the system display font; `color` is not black.

---

### Gate 2-C: game-design:polish-review on headed screenshots

Apply `game-design:polish-review` skill to the most recent headed playtest screenshots in `test-results/`.

Scope: **`#narrative-content` only** — typography consistency, result type color differentiation, roll result readability, spacing rhythm.

**Pass criteria:** No critical styling regressions. Roll annotations readable. All 10 result type variants visually distinct.

---

### Gate 2-D: Jest + validators final check

```bash
cd /c/Users/CEO/ledger-of-ash
npx jest --no-coverage 2>&1 | tail -10
node tests/content/validate-content.js 2>&1 | tail -5
node tests/content/validate-structure.js 2>&1 | tail -5
```
**Pass criteria:** 0 new failures.

---

### Gate 2-E: Fix any remaining issues, re-run failed gates

Apply targeted fixes. Re-run only the gate(s) that failed. Do not re-run all gates unless multiple failed.

---

## Self-Review

**Spec coverage check:**
- ✅ Nomdara Stage I undefined labels + inert clicks → TA-1
- ✅ renderChoices undefined guard → TA-2
- ✅ Nomdara caravan shop → TB-1
- ✅ Harbor metadata comment → TB-2
- ✅ Headless playtest → Gate 1
- ✅ Inline style inventory → TC-1
- ✅ `.roll-note` CSS class → TA2-1
- ✅ rollLabel inline style → TA2-2
- ✅ Stage pressure suffix → TA2-3
- ✅ Rival mod inline styles → TA2-4
- ✅ Headed playtest → Gate 2-A
- ✅ DevTools zero-inline audit → Gate 2-B
- ✅ game-design:polish-review → Gate 2-C
- ✅ Jest + validators → Gate 2-D

**Placeholder scan:** No TBD, no "implement later", no "similar to Task N". All code blocks are complete.

**Property name consistency:**
- `c.text` — renderChoices reads this property throughout
- `choice.action` — click handler at line 12921 calls this
- `'nomdara_caravan'` — exact G.location key set at line 14809
- `.roll-note` — defined in TA2-1 CSS, referenced in TA2-2/3/4 JS replacements

## Key Implementation Guards

- `renderChoices()` reads `c.text` — wrapper objects must have `text:` property
- Click handler at line 12921 calls `choice.action()` — use `action:` in mapped objects, not `fn:`
- `PLACES_DATA` key must be `'nomdara_caravan'` exactly (matches `G.location` at line 14809)
- `places[].type='harbor'` — travel metadata only, not a UI entry, no renderer needed
- CSS migrations use `var(--font-display)` not hardcoded `Cinzel,serif`
- CSS migrations use `var(--ink-faint)` not hardcoded color values
- `addJournal(text, category)` — text first, category second
- `G` is module-scope — never `window.G` in content files
