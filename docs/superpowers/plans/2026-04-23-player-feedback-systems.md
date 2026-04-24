# Player Feedback Systems Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make stage progress and journal evidence visible to the player so they understand how far along they are and what they've found.

**Architecture:** Two targeted edits to `ledger-of-ash.html`. (1) Add a numeric text label below the existing stage progress bar. (2) Add a category count summary at the top of the journal sidebar. Both changes are self-contained — no new functions, no new files.

**Tech Stack:** Vanilla JS, inline HTML/CSS in `ledger-of-ash.html`

---

## File Map

| File | Change |
|------|--------|
| `ledger-of-ash.html` line 1722 | Add `#stage-progress-label` span after fill div |
| `ledger-of-ash.html` ~line 550 | Add CSS for `#stage-progress-label` |
| `ledger-of-ash.html` ~line 12481 | Set label text in stage progress update function |
| `ledger-of-ash.html` line 12508 | Add category counts at top of `updateJournalHUD()` |

---

## Task 1: Stage Progress Numeric Label

The stage progress bar (`#stage-progress-fill`) already animates based on `G.stageProgress`, but the player sees only a 4px strip with no numbers. Add a text label showing "X / 20" below the bar.

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Add the label element to HTML**

Find line 1722 (search for `id="stage-progress-fill"`):
```html
<div id="stage-progress-track"><div id="stage-progress-fill"></div></div>
```
Change to:
```html
<div id="stage-progress-track"><div id="stage-progress-fill"></div></div>
<div id="stage-progress-label"></div>
```

- [ ] **Step 2: Add CSS for the label**

Find the `#stage-progress-fill` CSS block (search for `#stage-progress-fill {`, around line 550). Insert immediately after its closing `}`:
```css
#stage-progress-label {
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 1px;
  color: var(--ink-faint, #555);
  text-align: center;
  margin: 2px auto 0;
  opacity: 0.75;
}
```

- [ ] **Step 3: Wire label text in the progress update function**

Find the stage progress update function (search for `fill.style.width = Math.min(100`, around line 12481). The current code is:
```js
fill.style.width = Math.min(100, Math.round((progress / threshold) * 100)) + '%';
```
Add two lines immediately after:
```js
fill.style.width = Math.min(100, Math.round((progress / threshold) * 100)) + '%';
var _pLabel = document.getElementById('stage-progress-label');
if (_pLabel) _pLabel.textContent = progress + ' / ' + threshold;
```

- [ ] **Step 4: Open the game in Chrome and verify**

Run `play.bat`. Start a new game. Make a few choices that grant stageProgress (any enriched choice). Confirm the progress bar now shows a numeric label like "2 / 20" below the bar.

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: add numeric stage progress label to HUD bar"
```

---

## Task 2: Journal Category Summary

`updateJournalHUD()` (line 12508) shows the last 6 journal entries as plain text. Add a one-line summary at the top showing counts by category: evidence, intelligence, rumor, discovery.

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Find `updateJournalHUD` and read its current body**

Search for `function updateJournalHUD()` — around line 12508. The current body is:
```js
function updateJournalHUD() {
  var el = document.getElementById('journal-list');
  if (!el) return;
  el.innerHTML = (G.journal||[]).slice(0,6).map(j=>'<div class="journal-entry">'+j+'</div>').join('') ||
    '<div class="journal-entry">Your ledger awaits its first entry.</div>';
}
```

Note: `G.journalRecords` holds full records with `{id, category, day, text}`. `G.journal` is text-only.

- [ ] **Step 2: Replace the function body with category-aware version**

Replace the `el.innerHTML = ...` line (keeping the function signature and `if (!el) return;`) with:
```js
function updateJournalHUD() {
  var el = document.getElementById('journal-list');
  if (!el) return;
  var records = G.journalRecords || [];
  var counts = { evidence: 0, intelligence: 0, rumor: 0, discovery: 0 };
  records.forEach(function(r) { if (counts[r.category] !== undefined) counts[r.category]++; });
  var total = counts.evidence + counts.intelligence + counts.rumor + counts.discovery;
  var summaryHtml = total > 0
    ? '<div class="journal-summary">' +
        (counts.evidence   ? '<span>' + counts.evidence   + ' ev</span>' : '') +
        (counts.intelligence ? '<span>' + counts.intelligence + ' int</span>' : '') +
        (counts.rumor      ? '<span>' + counts.rumor      + ' rum</span>' : '') +
        (counts.discovery  ? '<span>' + counts.discovery  + ' disc</span>' : '') +
      '</div>'
    : '';
  el.innerHTML = summaryHtml +
    ((G.journal||[]).slice(0,6).map(j=>'<div class="journal-entry">'+j+'</div>').join('') ||
    '<div class="journal-entry">Your ledger awaits its first entry.</div>');
}
```

- [ ] **Step 3: Add CSS for `.journal-summary`**

Search for `.journal-entry {` (around line 1210). Insert before it:
```css
.journal-summary {
  display: flex;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 8px;
  letter-spacing: 1px;
  color: var(--ink-faint, #555);
  text-transform: uppercase;
  padding: 4px 8px 6px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  margin-bottom: 4px;
}
.journal-summary span { opacity: 0.8; }
```

- [ ] **Step 4: Open the game and verify**

Run `play.bat`. Make several choices that produce `addJournal` calls with different categories (evidence, rumor, intelligence). Open the Journal panel. Confirm you see a summary line like "3 ev  2 rum  1 int" above the entries.

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: add journal category summary counts to journal HUD"
```

---

## Task 3: Stage Gate Milestone Hint

When a player hits the level cap in Stage I without `stage1_narrative_complete`, a hint already fires at line 10122. Make it more specific so the player knows to find the boss encounter, not just "explore more."

The existing hint text is at line 10124 (search for `_s1cap_hint_shown`). The current text reads something generic. Replace it.

**Files:**
- Modify: `ledger-of-ash.html`

- [ ] **Step 1: Find the level cap hint**

Search for `_s1cap_hint_shown` — around line 10122. Read the surrounding 10 lines to see what `addWorldNotice` or `addNarration` call fires.

- [ ] **Step 2: Replace the hint text**

Find the `addWorldNotice` or `addNarration` call in that block. Replace its text argument with:
```
'You have reached the Stage I level cap. Advancement requires completing the stage arc — find and confront the source of the institutional pressure you have been tracing.'
```

- [ ] **Step 3: Verify**

In Chrome dev tools console, set `G.level = 5; G.stage = 'Stage I'; G.flags._s1cap_hint_shown = false;` then call `checkLevelUp()`. Confirm the world notice fires with the updated text.

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat: improve Stage I level-cap hint to direct player toward stage arc"
```
