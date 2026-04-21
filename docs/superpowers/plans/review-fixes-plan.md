# Review Fixes Implementation Plan
Date: 2026-04-20

## Context
Multi-review pass (balance, mechanics, code quality, polish, level design) surfaced 11 actionable
code fixes in two files: `js/loa-enriched-bridge.js` and `ledger-of-ash.html`.
Design decisions (roll visibility UI, rest cost, XP gap) are out of scope for this plan.

---

## Group A — Bridge Fixes (js/loa-enriched-bridge.js)

### Task A1: Fix recentOutcomeType mismatch
**File:** `js/loa-enriched-bridge.js`
**Problem:** Content files set `G.recentOutcomeType = 'investigate'` but bridge checks for
`'success'` or `'complication'` before awarding risky/bold stageProgress bonus. Bonus never fires.
**Fix:** In `handleEnrichedChoice`, change the condition that gates the risky/bold bonus.
Instead of checking `recentOutcomeType === 'success'`, check that the choice did not fumble
(i.e., `!result.isFumble`). The bonus should fire on any non-fumble enriched outcome.
Specifically at ~line 345-356: award the tag-based stageProgress bonus whenever
`result.total >= DC && !result.isFumble` — do not gate on recentOutcomeType string.

### Task A2: Map bold tag from domain tags
**File:** `js/loa-enriched-bridge.js`
**Problem:** `bold` branch (+2 stageProgress, +1 reverence) never fires because no content sets
`c.tag = 'bold'`. All choices default to `'risky'`.
**Fix:** In `toEnrichedChoice()`, extend tag derivation: after the existing `_TAG_SKILL` skill
lookup, add a `_TAG_RISK` map that maps high-stakes domain tags to `'bold'` and lower-stakes
tags to `'safe'`. Suggested mapping:
- `'bold'`: `['Combat', 'Confrontation', 'Infiltration', 'Ritual', 'Assassination']`
- `'safe'`: `['Social', 'Rest', 'Trade', 'Observation', 'Research']`
- default (everything else): `'risky'`
Apply this as: `tag: c.tag || _TAG_RISK[firstMatchingTag] || 'risky'`

### Task A3: Fix stageProgress hardcoded to [1]
**File:** `js/loa-enriched-bridge.js`
**Problem:** Lines ~350 and ~353 write to `G.stageProgress[1]` unconditionally regardless of
current stage. Stage 2+ risky/bold bonuses go to the Stage 1 bucket.
Also affects `market_intel` handler at ~line 404.
**Fix:** Derive the current stage key before writing:
```js
const stageKey = (G.stage === 'Stage II' || G.stage === 2) ? 2
               : (G.stage === 'Stage III' || G.stage === 3) ? 3
               : 1;
```
Use `stageKey` in all three stageProgress writes (risky bonus, bold bonus, market_intel).

### Task A4: Fix window.G null guard ordering
**File:** `js/loa-enriched-bridge.js`
**Problem:** In `handleEnrichedChoice`, `patchGState()` is called but then `const G = window.G`
is captured — if G was null, patchGState returned early and G is still null.
Lines 330-331 (`G.lastResult = ''`, `G.recentOutcomeType = ''`) are outside the try/catch and
will throw if G is null.
**Fix:** Reorder:
1. Call `patchGState()` first
2. `const G = window.G; if (!G) return;`
3. Then set `G.lastResult = ''` etc.
This ensures the null guard covers the pre-fn-call state mutations.

### Task A5: Add advanceTime shim
**File:** `js/loa-enriched-bridge.js`
**Problem:** All enriched fn bodies call `advanceTime(1)` bare with no guard. If the host game
doesn't define it (or it's not yet loaded), the entire fn throws silently.
**Fix:** In the bridge's shim section (near `gainXp`, `rollD20`), add:
```js
if (typeof window.advanceTime !== 'function') {
  window.advanceTime = function(days) {
    if (window.G && window.G.dayCount !== undefined) window.G.dayCount += (days || 1);
  };
}
```

---

## Group B — CSS/HTML Fixes (ledger-of-ash.html)

### Task B1: Fix crit block background color
**File:** `ledger-of-ash.html`
**Problem:** `.result-block.crit` uses a jade/green background gradient (`rgba(22,56,40,...)`)
that contradicts the ember-hi border. Crit looks like "success with an orange outline."
**Fix:** Change the crit background to use ember alpha values, e.g.:
`background: linear-gradient(135deg, rgba(160,50,10,.22) 0%, rgba(80,20,5,.18) 100%)`
Match the existing `--ember-glow` alpha convention already in the token system.

### Task B2: Remove duplicate token declarations
**File:** `ledger-of-ash.html`
**Problem:** Lines ~77-80 re-declare `--gold-bright`, `--gold-dim`, `--blood-bright`,
`--jade-bright` under a "Legacy compat" comment. The primary declarations already exist above.
**Fix:** Delete the 4 redundant declarations (the entire "Legacy compat" block if it only
contains these 4).

### Task B3: Fix notice-card CSS/JS state mismatch
**File:** `ledger-of-ash.html`
**Problem:** CSS uses `.notice-card:not(.seen)` for the "unread" ember border style, but
JS adds/removes class `.unread` — two different class names for the same state.
**Fix:** Audit all JS that touches notice-card state. Pick one convention (`seen` or `unread`)
and apply it consistently. Recommend `seen`: CSS already uses it, so update JS to add `.seen`
when a notice is dismissed rather than removing `.unread`.

### Task B4: Fix .roll-result font-family
**File:** `ledger-of-ash.html`
**Problem:** `.roll-result { font-family: 'Cinzel', monospace }` — malformed stack.
Cinzel is a serif display font; `monospace` as fallback creates a jarring style drop.
**Fix:** Change to `font-family: 'Cinzel', serif` to stay in the established font system.

---

## Out of Scope (design decisions needed from user)

- **Roll visibility**: Show die face, DC, margin before result text (mechanics review #1)
- **Rest cost**: Make rest decrement stageProgress or tick rival clock (mechanics review #2)
- **XP gap**: Raise fallback XP from 4-7 to 25-35 and add narrative consequence (level design #2)
- **Fumble variety**: Differentiate fumble branches across content files (level design #1)
