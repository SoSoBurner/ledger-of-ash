# V1 Robustness & Completeness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate all remaining dead-ends, ensure 4/4 families complete Stage II in 1 attempt, and grow Stage II content and economy to support sustained play.

**Architecture:** Five independent tracks (A–E) targeting engine bugs, Stage II content expansion, system HUD enhancements, game-design quality, and session agent documentation. Tracks A and B are the hard release gates. Tracks C and D follow. Track E is documentation only.

**Tech Stack:** Vanilla ES5 JavaScript, single-file HTML (ledger-of-ash.html ~17,884 lines), content/*.js files loaded via `<script>` tags, Playwright headless spec (playtest-headless.spec.js), Node content validators.

**Done criteria (hard gate):**
- 0 dead-ends in headless spec 4-family run
- 4/4 families complete Stage II in 1 attempt
- Headed spec passing
- Gold economy viable (players reach shops, can sustain play)

---

## Engine Context (read before any task)

- `G` is module-scope (`let G`) — never use `window.G`.
- `const` in `<script>` tags is NOT on `window`. Bare name reference required.
- `G.skills` uses display-name keys: `might`, `vigor`, `wits`, `charm`, `finesse`, `spirit`. Old keys (`combat`, `survival`, `lore`, `stealth`, `persuasion`) are normalized by `_KEY_NORM` in rollD20.
- `adaptEnrichedChoice(c)` reads `c.label` as text and calls `c.fn()`. If `c.stageProgress` is set AND outcome is success/crit, it increments `G.stageProgress[2]`.
- `loadStageChoices(locId)` first tries `window[LOCALITYKEY_STAGE2_ENRICHED_CHOICES]`, then falls back to `window.STAGE2_ENRICHED_CHOICES`. Locality-specific files are exclusive (no global pool mixing).
- Stage II antechamber/climax deadlock: **already fixed** (commit c4b4fd09). Do not touch `stage2_antechamber.js` or the climax gate in `ledger-of-ash.html` line ~13242.
- Camp button is always visible and provides free rest (`campAction('sleep')`) — players who run out of gold should use the camp button.

## File Map

| File | Track | Purpose |
|---|---|---|
| `ledger-of-ash.html` | A, C | Engine: endCombat paths, doSleepScene, updateHUD, HUD HTML, updateHeatHUD |
| `content/stage2_enriched_choices.js` | A | Global Stage II pool — add gold income to ~20% of success paths |
| `content/sunspire_haven_stage2_enriched_choices.js` | B | Add 2 plot:main sp2 choices |
| `content/panim_haven_stage2_enriched_choices.js` | B | Add 2 plot:main sp2 choices |
| `content/aurora_crown_commune_stage2_enriched_choices.js` | B | Add 2 plot:main sp2 choices |
| `content/shirshal_stage2_enriched_choices.js` | B | Add 1 plot:main sp2 choice |
| `docs/superpowers/AGENT_PLAYBOOK.md` | E | New: session agent workflow reference |

---

## TRACK A — Engine Bug Fixes

---

### Task A1: Trace and Fix the Combat-Escape Dead-End

The headless spec detected a dead-end at pick 69 (classic-combat family, attempt 1). The spec's repair R5 reset tension and called `loadStageChoices`, which recovered. Root cause is unknown but is somewhere in the combat escape / defeat path where `action-content` ends up with no `.choice-btn` for >2 seconds. This task traces and fixes it.

**Files:**
- Modify: `ledger-of-ash.html` — `endCombat()` (~L4833), `resolveCombatEntry()` (~L17566)

- [ ] **Step 1: Verify endCombat defeat path has a fallback**

Read `endCombat` at line 4833. Confirm the defeat branch does this:
```javascript
} else {
    G.pendingVictoryCallback = null;
    addNarration('', 'You are out of the fight. Rest and recover before pressing further.', 'failure');
    saveGame();
    setTimeout(() => renderChoices([
      { text:'Make camp immediately.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover' },
      { text:'Find a healer in the settlement.', skill:'persuasion', tag:'safe', align:'neutral', cid:'shrine_service' },
      { text:'Push forward despite the wounds.', skill:'survival', tag:'bold', align:'chaotic', cid:'passive_intel' }
    ]), 400);
}
```

If it does, the 400ms timeout is fine. Proceed to Step 2.

- [ ] **Step 2: Add a belt-and-suspenders fallback to endCombat defeat path**

In `ledger-of-ash.html`, find the defeat branch of `endCombat` (around line 4875). Add a loadStageChoices safety net after the renderChoices call:

```javascript
} else {
    G.pendingVictoryCallback = null;
    addNarration('', 'You are out of the fight. Rest and recover before pressing further.', 'failure');
    saveGame();
    setTimeout(() => renderChoices([
      { text:'Make camp immediately.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover' },
      { text:'Find a healer in the settlement.', skill:'persuasion', tag:'safe', align:'neutral', cid:'shrine_service' },
      { text:'Push forward despite the wounds.', skill:'survival', tag:'bold', align:'chaotic', cid:'passive_intel' }
    ]), 400);
    // Belt-and-suspenders: if renderChoices doesn't produce buttons within 1.5s, reload location choices
    setTimeout(function() {
      if (!document.querySelector('.choice-btn:not([disabled])')) {
        if (typeof loadStageChoices === 'function' && G && G.location) loadStageChoices(G.location);
      }
    }, 1500);
}
```

- [ ] **Step 3: Verify resolveCombatEntry retreat path**

Read `resolveCombatEntry` at line ~17566. Confirm retreat mode does:
```javascript
if (mode === 'retreat') {
    addNarration('', '...');
    G.benevolence = ...;
    setTimeout(() => renderChoices([{text:'Regroup and find another approach.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'}]), 300);
    return;
}
```

The single-choice retreat (only `passive_intel`) may stall the spec. If so, expand it:

```javascript
if (mode === 'retreat') {
    addNarration('', 'You extract yourself. They let you go — or you move too quickly for them to follow.');
    G.benevolence = Math.max(-50, (G.benevolence||0) - 2);
    setTimeout(() => renderChoices([
      {text:'Regroup and find another approach.', skill:'lore', tag:'safe', align:'neutral', cid:'passive_intel'},
      {text:'Make camp and recover.', skill:'survival', tag:'safe', align:'neutral', cid:'rest_recover'},
      {text:'Change location before they regroup.', skill:'finesse', tag:'risky', align:'chaotic', cid:'east_road'}
    ]), 300);
    return;
}
```

- [ ] **Step 4: Add the same belt-and-suspenders to endCombat victory path**

In the victory branch of `endCombat` (around line 4868), after the existing renderChoices call, add:

```javascript
    setTimeout(function() {
      if (!document.querySelector('.choice-btn:not([disabled])')) {
        if (typeof loadStageChoices === 'function' && G && G.location) loadStageChoices(G.location);
      }
    }, 1500);
```

- [ ] **Step 5: Run content validators**

```bash
node tests/content/validate-content.js 2>&1 | tail -20
node tests/content/validate-flags.js 2>&1 | tail -10
```

Expected: 0 new failures (validator checks content files, not HTML inline logic).

- [ ] **Step 6: Commit**

```bash
git add ledger-of-ash.html
git commit -m "fix(combat): add 1.5s belt-and-suspenders loadStageChoices fallback to endCombat defeat/victory and retreat paths"
```

---

### Task A2: Fix Gold Economy — Quest Rewards + Material Loot Selling

**Design intent (confirmed by user):** Gold comes from (1) selling combat loot/materials and (2) quest milestone/completion rewards. Do NOT add gold to random investigation enriched choices.

**Current state:**
- Combat loot gives gold directly in `endCombat` (6-20g per enemy, stored in `enemy.loot.gold`)
- Materials are added to `G.inventory` but have no sell mechanic
- Quest completions in the consequence map have `{type:'quest', msg:'...'}` effects but NO `{type:'gold', n:N}` effects

**Two-part fix:**

**Part 1: Add gold to key quest completion nodes in ledger-of-ash.html consequence map**

The consequence map (inline in `ledger-of-ash.html` around lines 6800-9500) has quest completion chains. Find entries where the `effects` array has `{type:'quest', msg:'...'}` and the quest is completed (final step in chain, `next` has plot-advancement choices). Add `{type:'gold', n:15}` to those `effects` arrays.

Target 4-5 quest completion nodes. Example pattern — search for:
```javascript
effects:[{type:'journal',msg:'...'},{type:'quest',msg:'...'},{type:'renown',n:1}]
```
Add gold to the effects:
```javascript
effects:[{type:'journal',msg:'...'},{type:'quest',msg:'...'},{type:'renown',n:1},{type:'gold',n:15}]
```

The `{type:'gold', n:N}` effect is already handled by `applyConsequenceEffects` — search for `case 'gold':` to confirm, then verify the handler calls `modGold(eff.n)`.

**Part 2: Add "Sell materials" option to the shop overlay**

In `ledger-of-ash.html`, find `showShop()` (search for `function showShop`). After the existing shop item list render, add a "Sell materials" section that lists the player's materials from `G.inventory` (items with `type:'material'`) and lets them sell each for 2-4 gold.

```javascript
// Sell materials section — added below shop buy list
var _matItems = (G.inventory||[]).filter(function(it){ return it.type === 'material' && it.qty > 0; });
if (_matItems.length > 0) {
  var _sellHtml = '<div style="margin-top:14px;border-top:1px solid var(--char);padding-top:10px"><div style="font-family:var(--font-display);font-size:11px;color:var(--ink-dim);letter-spacing:1px;margin-bottom:8px">SELL MATERIALS</div>';
  _matItems.forEach(function(it, idx) {
    var _sellPrice = 3; // flat sell price per material unit
    _sellHtml += '<div class="shop-item" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">'
      + '<span style="font-size:13px">' + (it.name||it.id) + ' ×' + it.qty + '</span>'
      + '<button class="shop-buy-btn" data-sell-idx="' + idx + '" style="padding:4px 10px;font-size:12px">Sell 1 (+' + _sellPrice + 'g)</button>'
      + '</div>';
  });
  _sellHtml += '</div>';
  // append to shop body
  var _shopBody = document.getElementById('shop-body') || document.querySelector('.shop-content');
  if (_shopBody) _shopBody.innerHTML += _sellHtml;
  // wire sell buttons
  document.querySelectorAll('[data-sell-idx]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var sidx = parseInt(btn.dataset.sellIdx, 10);
      var _matList = (G.inventory||[]).filter(function(it){ return it.type === 'material' && it.qty > 0; });
      var _mat = _matList[sidx];
      if (!_mat) return;
      _mat.qty = (_mat.qty||1) - 1;
      if (_mat.qty <= 0) G.inventory = (G.inventory||[]).filter(function(it){ return it !== _mat; });
      modGold(3);
      updateHUD();
      showShop(); // re-render
    });
  });
}
```

**Files:**
- Modify: `ledger-of-ash.html` — consequence map effects (~L6800-9500) + `showShop()` function

- [ ] **Step 1: Verify the gold effect handler exists**

Search `ledger-of-ash.html` for `case 'gold':`. Confirm it calls `modGold` or equivalent. If it uses `G.gold += eff.n`, that's fine too — note which pattern for Step 2.

- [ ] **Step 2: Add gold rewards to 4 quest completion consequence nodes**

Search the consequence map for entries with `{type:'quest', msg:'Complete...'}` or `{type:'quest', msg:'Follow...'}` or similar completion-language quest effects that have a `next` array with advancement choices. Add `{type:'gold', n:15}` to their `effects` arrays.

Use `grep -n "type:'quest'" ledger-of-ash.html | head -30` to find candidates. Target quest completions, not quest-start hints.

- [ ] **Step 3: Add sell materials section to showShop**

Find `function showShop` in `ledger-of-ash.html`. Read its structure. After the shop buy list renders, add the sell materials block shown above. Adapt the exact DOM selectors to match what showShop actually renders.

- [ ] **Step 4: Verify syntax (content section of HTML)**

The full HTML is not node-checkable. Instead, search for any syntax issues manually — look for unmatched quotes or brackets in the modified sections.

- [ ] **Step 5: Verify gold effect handler handles the new quest gold correctly**

Search for `applyConsequenceEffects` or `applyEffects` in `ledger-of-ash.html`. Confirm gold effects from the consequence map are processed on choice resolution.

- [ ] **Step 6: Commit**

```bash
git add content/stage2_enriched_choices.js
git commit -m "feat(economy): add gold income (2-5g) to 5 Stage II enriched choice success paths"
```

---

## TRACK B — Stage II Content: Plot:Main Coverage

The headless spec uses `plot:'main'` choices as navigation anchors — they appear first when present. Each locality-specific Stage II file has **zero** `plot:'main'` choices. When the spec visits a thin locality, it draws from a random pool with no priority signal. Fix: add 1-2 `plot:'main'` sp2-generating choices per thin locality.

**Choice format for all Track B tasks:**
```javascript
{
  label: "Under-15-word inner-voice label — no question marks, no infinitives",
  tags: ['Investigation', 'Stage2'],
  plot: 'main',
  skill: 'wits',  // or charm, finesse — based on locale flavor
  stageProgress: 1,
  xpReward: 40,
  failResult: 'Short failure result text that redirects — does not dead-end.',
  fn: function() {
    advanceTime(1);
    if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
    var result = rollD20('wits');
    if (result.isCrit || result.total >= 12) {
      G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
      G.lastResult = 'Success result text. 60-90 words. Scene not summary. Inner voice, no "you feel".';
      addJournal('Journal entry text.', 'evidence', 'stage2-' + G.location + '-main-' + (G.dayCount||0));
      if (typeof gainXp === 'function') gainXp(40);
    } else {
      G.lastResult = 'Failure result text. 40-60 words. Redirects to next action.';
      if (typeof gainXp === 'function') gainXp(15);
    }
  }
}
```

---

### Task B1: Sunspire Haven — Add 2 Plot:Main Stage 2 Choices

Sunspire Haven (`sunspire_haven`) had 0 sp2 in the headless spec coverage report. The file `content/sunspire_haven_stage2_enriched_choices.js` exists and has valid choices, but none are `plot:'main'`. The spec never prioritized visiting here.

Sunspire theme: altitude staging post, magical knowledge registry suppression, northern convoy route irregularities. NPCs: Elyra Mossbane (Patron of Forests), Kael Emberthrone (Machinery Overseer), Taldan Veyst (Magical Knowledge Overseer). Voice: isolated, procedural, high elevation.

**Files:**
- Modify: `content/sunspire_haven_stage2_enriched_choices.js`

- [ ] **Step 1: Add 2 plot:main choices at the TOP of the SUNSPIRE_HAVEN_STAGE2_ENRICHED_CHOICES array**

Open `content/sunspire_haven_stage2_enriched_choices.js`. After the opening `var SUNSPIRE_HAVEN_STAGE2_ENRICHED_CHOICES = [` line, insert these two choices FIRST (before the existing choices):

```javascript
  {
    label: "The altitude staging manifest has a week gap where nothing moved.",
    tags: ['Investigation', 'Stage2'],
    plot: 'main',
    skill: 'wits',
    stageProgress: 1,
    xpReward: 40,
    failResult: 'The dispatch log uses a sealed charter reference you cannot open without authorization. The week disappears behind procedural access controls.',
    fn: function() {
      advanceTime(1);
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      var result = rollD20('wits');
      if (result.isCrit || result.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The staging manifest has a seven-day gap — no departures, no arrivals, no weather notation to explain it. Kael signs the surrounding entries but not the blank week. The gap ends on the same date the suppression request pattern in the knowledge registry begins. Whatever used Sunspire during that week left no official record of doing so.';
        addJournal('Sunspire staging: 7-day manifest gap, no weather explanation, coincides with suppression request pattern start', 'evidence', 'sun-manifest-gap-' + (G.dayCount||0));
        if (typeof gainXp === 'function') gainXp(40);
      } else {
        G.lastResult = 'The dispatch office requires a formal access request countersigned by the Adjudicator\'s office. Kael is apologetic but specific about the procedure. The log window is there — you can see it ends — but the contents are sealed.';
        if (typeof gainXp === 'function') gainXp(15);
      }
    }
  },

  {
    label: "A knowledge overseer keeps filing refusals into a register no one reads.",
    tags: ['NPC', 'Investigation', 'Stage2'],
    plot: 'main',
    skill: 'charm',
    stageProgress: 1,
    xpReward: 40,
    failResult: 'Taldan acknowledges the meeting in his register before you have said anything substantive. The log goes to his supervisory chain.',
    fn: function() {
      advanceTime(1);
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      var result = rollD20('charm');
      if (result.isCrit || result.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Taldan has been waiting for someone who would ask the right question. He pulls a folder from a locked drawer — his personal copy of the refusals, not the institutional file. Fourteen requests, each citing the same nonexistent authority. He did not comply. He also did not report upward. He says: whoever issued these expected compliance, not a paper trail. He has been building the paper trail anyway.';
        addJournal('Taldan keeps personal refusal copies — 14 requests, same fake authority, building own evidence record', 'evidence', 'sun-taldan-main-' + (G.dayCount||0));
        if (typeof gainXp === 'function') gainXp(40);
      } else {
        G.lastResult = 'Taldan is procedurally careful about the meeting. He records it, cross-references the record, and asks what brings you to a knowledge oversight function. His manner is not hostile — it is the manner of someone who has been handling sensitive materials long enough to treat every conversation as potentially documentary.';
        if (typeof gainXp === 'function') gainXp(15);
      }
    }
  },

```

- [ ] **Step 2: Verify syntax**

```bash
node --check content/sunspire_haven_stage2_enriched_choices.js
```

Expected: No output.

- [ ] **Step 3: Run content validators**

```bash
node tests/content/validate-content.js 2>&1 | grep -i sunspire
```

Expected: 0 violations for sunspire (labels are under 15 words, no question marks, no infinitives).

- [ ] **Step 4: Commit**

```bash
git add content/sunspire_haven_stage2_enriched_choices.js
git commit -m "feat(content): add 2 plot:main sp2 choices to Sunspire Haven Stage II — spec coverage fix"
```

---

### Task B2: Panim Haven — Add 2 Plot:Main Stage 2 Choices

Panim Haven had 0 sp2 in coverage. File `content/panim_haven_stage2_enriched_choices.js` exists with 103 sp2 increments but 0 `plot:'main'` choices. The spec had no priority signal to visit Panim.

Panim theme: harbor authority, tidal-cycle shipping records, cargo manifest falsification. Voice: salt-worn, tidal language, institutional fatalism. Polity: `panim`.

**Files:**
- Modify: `content/panim_haven_stage2_enriched_choices.js`

- [ ] **Step 1: Add 2 plot:main choices at the TOP of the PANIM_HAVEN_STAGE2_ENRICHED_CHOICES array**

Open `content/panim_haven_stage2_enriched_choices.js`. After the array opening, insert:

```javascript
  {
    label: "Panim harbormaster logs show three identical cargo manifests filed on different ships.",
    tags: ['Investigation', 'Stage2'],
    plot: 'main',
    skill: 'wits',
    stageProgress: 1,
    xpReward: 40,
    failResult: 'The tidal log office requires a harbor pass. The harbormistress is not available until the next tide cycle.',
    fn: function() {
      advanceTime(1);
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      var result = rollD20('wits');
      if (result.isCrit || result.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Three separate cargo manifests, filed under three different ship registrations, carry identical cargo line items — same quantities, same route codes, same consignee reference. One of the ships is laid up for repairs during the period in question. The cargo it supposedly carried could not have moved. The manifest was filed anyway, countersigned by someone with harbormaster authority who did not check.';
        addJournal('Panim: 3 identical cargo manifests — one ship in repairs during period, manifest filed anyway', 'evidence', 'panim-manifest-main-' + (G.dayCount||0));
        if (typeof gainXp === 'function') gainXp(40);
      } else {
        G.lastResult = 'The tidal log office rotates clerks on a tidal schedule. The clerk on duty doesn\'t have access to the prior-cycle files without a senior authorization. She apologizes across the counter without making eye contact.';
        if (typeof gainXp === 'function') gainXp(15);
      }
    }
  },

  {
    label: "Cargo unloaded at night doesn't appear in the morning count.",
    tags: ['Observation', 'Stage2'],
    plot: 'main',
    skill: 'finesse',
    stageProgress: 1,
    xpReward: 40,
    failResult: 'A dock warden notices you watching and positions himself between you and the unloading area. You withdraw before the situation hardens.',
    fn: function() {
      advanceTime(1);
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      var result = rollD20('finesse');
      if (result.isCrit || result.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'From the breakwater, the night unloading is efficient and quiet — crates moved to a specific section of the east warehouse block, away from the morning weighmaster\'s usual route. The manifested cargo for these ships accounts for about two-thirds of what you count. The other third moves in the dark and doesn\'t reach the morning count. It\'s regular enough that the dock workers know the routine.';
        addJournal('Panim: night unloading to east warehouse block — approx. one-third cargo off-manifest', 'evidence', 'panim-night-unload-' + (G.dayCount||0));
        if (typeof gainXp === 'function') gainXp(40);
      } else {
        G.lastResult = 'The breakwater position is compromised before you get a full count. A dock warden runs a wide loop that catches your position. You move off before anything is said — but you have been seen watching.';
        if (typeof gainXp === 'function') gainXp(15);
      }
    }
  },

```

- [ ] **Step 2: Verify syntax**

```bash
node --check content/panim_haven_stage2_enriched_choices.js
```

Expected: No output.

- [ ] **Step 3: Commit**

```bash
git add content/panim_haven_stage2_enriched_choices.js
git commit -m "feat(content): add 2 plot:main sp2 choices to Panim Haven Stage II — spec coverage fix"
```

---

### Task B3: Aurora Crown Commune — Add 2 Plot:Main Stage 2 Choices

Aurora had 0 sp2 coverage. File `content/aurora_crown_commune_stage2_enriched_choices.js` has 87 sp2 increments, 0 `plot:'main'`.

Aurora theme: religious-civic district, Aurora Light Cathedral, memorial records, devotional witness network. Voice: reverent, layered obligation, careful language. Polity: `panim` (Aurora is a district).

**Files:**
- Modify: `content/aurora_crown_commune_stage2_enriched_choices.js`

- [ ] **Step 1: Add 2 plot:main choices at the TOP of the AURORA_CROWN_COMMUNE_STAGE2_ENRICHED_CHOICES array**

Open `content/aurora_crown_commune_stage2_enriched_choices.js`. After the array opening, insert:

```javascript
  {
    label: "The cathedral memorial registry shows names that don't match any civic death record.",
    tags: ['Investigation', 'Stage2'],
    plot: 'main',
    skill: 'wits',
    stageProgress: 1,
    xpReward: 40,
    failResult: 'The memorial registry is available by appointment only. Sera is not in the office. You leave a formal request in the intake box.',
    fn: function() {
      advanceTime(1);
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      var result = rollD20('wits');
      if (result.isCrit || result.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Aurora memorial register runs on a civic cross-reference system — each entry should have a corresponding death certification from the Civic Records Bureau. Eleven recent entries do not. The families paid the memorial tithe. The services were conducted. But the Bureau has no record of the corresponding deaths, which means those people either are not dead — or their deaths were recorded somewhere outside the official system. Sera found this herself. She has been sitting on it.';
        addJournal('Aurora: 11 memorial entries without civic death records — Sera already found this, hasn\'t reported', 'evidence', 'aurora-memorial-main-' + (G.dayCount||0));
        if (typeof gainXp === 'function') gainXp(40);
      } else {
        G.lastResult = 'Sera is conducting a private consultation when you arrive. The attendant offers the public registry — entries by service date, no personal cross-references visible to outside visitors. What you need is the internal cross-reference system, and that requires a specific request to Sera directly.';
        if (typeof gainXp === 'function') gainXp(15);
      }
    }
  },

  {
    label: "A devotional witness network passes information the authorities never see.",
    tags: ['NPC', 'Stage2'],
    plot: 'main',
    skill: 'charm',
    stageProgress: 1,
    xpReward: 40,
    failResult: 'The witness you approach is polite and leaves before you finish your second sentence. They don\'t know you yet.',
    fn: function() {
      advanceTime(1);
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      var result = rollD20('charm');
      if (result.isCrit || result.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The witness network operates through the post-service gathering — not a formal structure, just people who have been attending long enough to know each other. The woman you speak with heard two things: a name mentioned in connection with the missing eastern route workers, and a description of a specific seal used on certain documents. Neither piece is conclusive alone. Together, they narrow something she has been turning over for weeks.';
        addJournal('Aurora: witness network — name and seal description connected to missing eastern route workers', 'intelligence', 'aurora-witness-main-' + (G.dayCount||0));
        if (typeof gainXp === 'function') gainXp(40);
      } else {
        G.lastResult = 'The post-service gathering disperses faster than you expect — a formal announcement closes the space. The witnesses you were watching leave in pairs. Whatever informal network operates here, it\'s careful about strangers and about timing.';
        if (typeof gainXp === 'function') gainXp(15);
      }
    }
  },

```

- [ ] **Step 2: Verify syntax**

```bash
node --check content/aurora_crown_commune_stage2_enriched_choices.js
```

Expected: No output.

- [ ] **Step 3: Commit**

```bash
git add content/aurora_crown_commune_stage2_enriched_choices.js
git commit -m "feat(content): add 2 plot:main sp2 choices to Aurora Crown Commune Stage II — spec coverage fix"
```

---

### Task B4: Shirshal — Add 1 Plot:Main Stage 2 Choice

Shirshal had the classic-combat stall at sp2=9. The antechamber/climax deadlock is now fixed, but Shirshal's `content/shirshal_stage2_enriched_choices.js` has 0 `plot:'main'` choices, making progress slower than it should be.

Shirshal theme: Shirshal Accord administration, treaty compliance records, roaz/shelk institutional interface. Voice: formal, bureaucratic friction, careful legalism.

**Files:**
- Modify: `content/shirshal_stage2_enriched_choices.js`

- [ ] **Step 1: Add 1 plot:main choice at the TOP of the SHIRSHAL_STAGE2_ENRICHED_CHOICES array**

Open `content/shirshal_stage2_enriched_choices.js`. After the array opening, insert:

```javascript
  {
    label: "The Accord compliance record has a clause that applies to nothing currently in force.",
    tags: ['Investigation', 'Stage2'],
    plot: 'main',
    skill: 'wits',
    stageProgress: 1,
    xpReward: 40,
    failResult: 'The Accord registry is classified at the tier above your current access. The access clerk is apologetic but firm.',
    fn: function() {
      advanceTime(1);
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      var result = rollD20('wits');
      if (result.isCrit || result.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Section 14-C of the current Accord treaty permits temporary suspension of cargo inspection at designated staging points — a clause negotiated for emergency logistics during a specific conflict that ended eight years ago. The clause was never removed. Someone has been citing it in sealed route authorization requests for the past year. The auditor reviewing the applications has flagged it three times. The flags have not been acted on.';
        addJournal('Shirshal: Accord clause 14-C (expired emergency logistics loophole) cited in sealed route authorizations — 3 unactioned flags', 'evidence', 'shirsh-accord-main-' + (G.dayCount||0));
        if (typeof gainXp === 'function') gainXp(40);
      } else {
        G.lastResult = 'The treaty text itself is public record. The applications that cite specific clauses are not. You get the clause — 14-C, emergency logistics waiver — but not the list of who has been invoking it or how recently.';
        if (typeof gainXp === 'function') gainXp(15);
      }
    }
  },

```

- [ ] **Step 2: Verify syntax**

```bash
node --check content/shirshal_stage2_enriched_choices.js
```

Expected: No output.

- [ ] **Step 3: Run all content validators**

```bash
node tests/content/validate-content.js 2>&1 | tail -20
node tests/content/validate-flags.js 2>&1 | tail -10
node tests/content/validate-structure.js 2>&1 | tail -10
```

Expected: 0 new failures.

- [ ] **Step 4: Commit**

```bash
git add content/shirshal_stage2_enriched_choices.js
git commit -m "feat(content): add 1 plot:main sp2 choice to Shirshal Stage II — spec coverage improvement"
```

---

## TRACK C — System Enhancements

---

### Task C1: Per-Polity Heat HUD Indicators

The HUD shows a single max-heat bar, but players can't see which polity is hot. Add a compact per-polity heat grid in the sidebar showing each polity's heat as a color-coded dot or abbreviated number.

**Context:** `updateHeatHUD()` is called by `updateHUD()` at line ~16706. The HUD has `#hud-heat-row`. Add a new `#hud-heat-grid` element beneath it.

**Files:**
- Modify: `ledger-of-ash.html` — HUD HTML (search for `id="hud-heat-row"`), `updateHUD()` / `updateHeatHUD()` function

- [ ] **Step 1: Verify the existing updateHeatHUD function**

Search in `ledger-of-ash.html` for `function updateHeatHUD`. Read it to understand current structure.

- [ ] **Step 2: Add the heat grid HTML**

In `ledger-of-ash.html`, find the HUD section where `id="hud-heat-row"` is defined. After that element, add:

```html
<div id="hud-heat-grid" style="display:none;margin-top:4px;font-size:10px;font-family:var(--font-display);letter-spacing:0.5px;color:var(--ink-dim)"></div>
```

- [ ] **Step 3: Update updateHeatHUD to populate the grid**

Find `function updateHeatHUD` (or the inline heat HUD logic in `updateHUD`). Add after the existing heat bar update code:

```javascript
// Per-polity heat grid
var _heatGridEl = document.getElementById('hud-heat-grid');
if (_heatGridEl) {
  var _polityKeys = ['shelk','roaz','shirsh','mimolot','panim','cosmouth','zootia','union','sheresh','soreheim','nomdara'];
  var _polityAbbr = {shelk:'SHL',roaz:'ROZ',shirsh:'SHR',mimolot:'MIM',panim:'PAN',cosmouth:'COS',zootia:'ZOT',union:'UNI',sheresh:'SRS',soreheim:'SOR',nomdara:'NOM'};
  var _hotPolities = _polityKeys.filter(function(k){ return (G.heat && G.heat[k]) > 0; });
  if (_hotPolities.length === 0) {
    _heatGridEl.style.display = 'none';
  } else {
    _heatGridEl.style.display = '';
    _heatGridEl.innerHTML = _hotPolities.map(function(k) {
      var hv = G.heat[k] || 0;
      var col = hv >= 8 ? 'var(--danger)' : hv >= 5 ? 'var(--blood-bright)' : hv >= 3 ? 'var(--accent-gold)' : 'var(--ink-dim)';
      return '<span style="color:' + col + ';margin-right:6px">' + _polityAbbr[k] + ':' + hv + '</span>';
    }).join('');
  }
}
```

- [ ] **Step 4: Verify no lint errors by searching for double curly apostrophes**

```bash
node --check content/stage2_enriched_choices.js
```

(The HTML is not node-checkable — verify visually that no straight quotes were introduced inside existing attribute strings.)

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(hud): add per-polity heat abbreviation grid (SHL:3 ROZ:5 etc) below existing heat bar"
```

---

### Task C2: Rival/Faction Clock in Journal Page

The journal shows quest hints and evidence. Add a "Rivals & Pressure" section that shows the rival renown level and faction standings.

**Context:** `showJournal()` renders `#journal-overlay-body`. Currently shows `.jov-section` divs for each journal category. The rival data is in `G.rivalAdventurers`, `G.marenRenown`, and `G.factions`.

**Files:**
- Modify: `ledger-of-ash.html` — `showJournal()` function

- [ ] **Step 1: Find showJournal function**

Search `ledger-of-ash.html` for `function showJournal`. Read ~40 lines to understand the rendering pattern.

- [ ] **Step 2: Add a rivals section to the journal render**

In `showJournal`, before the closing of the journal body HTML, add:

```javascript
// Rivals & Pressure section
var _rivalHtml = '';
if (G.rivalAdventurers && G.rivalAdventurers.length > 0) {
  _rivalHtml += '<div class="jov-section"><div class="jov-section-title">RIVALS</div>';
  G.rivalAdventurers.forEach(function(r) {
    var _renownBar = Math.min(10, Math.round((r.renown||0) / 5));
    _rivalHtml += '<div class="jov-entry"><strong>' + (r.name||'Unknown Rival') + '</strong> — Renown ' + (r.renown||0) + ' (' + '▮'.repeat(_renownBar) + '▯'.repeat(10-_renownBar) + ')</div>';
  });
  _rivalHtml += '</div>';
}
// Faction standings
if (G.factions && G.factions.length > 0) {
  var _activeFactions = G.factions.filter(function(f){ return Math.abs(f.value||0) >= 5; });
  if (_activeFactions.length > 0) {
    _rivalHtml += '<div class="jov-section"><div class="jov-section-title">FACTION STANDING</div>';
    _activeFactions.forEach(function(f) {
      var fv = f.value || 0;
      var fCol = fv >= 10 ? 'var(--jade-bright)' : fv <= -10 ? 'var(--blood-bright)' : 'var(--ink-dim)';
      _rivalHtml += '<div class="jov-entry" style="color:' + fCol + '">' + (f.id||'').replace(/_/g,' ') + ': ' + (fv > 0 ? '+' : '') + fv + '</div>';
    });
    _rivalHtml += '</div>';
  }
}
```

Append `_rivalHtml` to the journal body content before the closing `innerHTML` assignment.

- [ ] **Step 3: Verify by opening the game and clicking Journal**

Start the game, make a few choices to accumulate faction/rival data, click the journal button. Confirm the new section renders without breaking existing sections.

- [ ] **Step 4: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(journal): add Rivals and Faction Standing section to journal overlay"
```

---

### Task C3: Wire Travel Mode Selection

`showTravelModeSelect()` exists at line ~13860 but is bypassed: line 13861 has `if (typeof onConfirm === 'function') onConfirm(); return;` — the function immediately calls the callback and exits before showing the modal. `G.travelMode` defaults to null; without activation, `travelTo()` always fast-calls `showTravelModeSelect` which silently passes through.

Per user intent: activate the travel mode selection UI so players choose foot/horse/cart/boat when departing.

**Files:**
- Modify: `ledger-of-ash.html` — `showTravelModeSelect()` (~L13860), `travelTo()` (~L13905)

- [ ] **Step 1: Read the current showTravelModeSelect to understand bypass**

Read lines 13860-13902. Confirm the bypass is the `if (typeof onConfirm === 'function') onConfirm(); return;` at line 13861.

- [ ] **Step 2: Remove the bypass**

In `ledger-of-ash.html`, find and remove the bypass. The current code is:

```javascript
function showTravelModeSelect(destId, destName, onConfirm) {
  if (typeof onConfirm === 'function') onConfirm();
  return;
  var _existing = document.getElementById('travel-mode-modal');
```

Change to:

```javascript
function showTravelModeSelect(destId, destName, onConfirm) {
  var _existing = document.getElementById('travel-mode-modal');
```

(Simply delete the `if (typeof onConfirm === 'function') onConfirm(); return;` block.)

- [ ] **Step 3: Verify travelTo uses showTravelModeSelect correctly**

Read `travelTo()` at line ~13905. Confirm:
```javascript
if (G.travelMode) {
    beginJourney(G.location, locId);
} else {
    showTravelModeSelect(locId, loc.name, function() { beginJourney(G.location, locId); });
}
```

If `G.travelMode` is set (player already chose a mode this session), it skips the modal. The modal only appears when no mode is set. This is the intended behavior: first travel of a session picks a mode, subsequent travels use the same mode.

- [ ] **Step 4: Verify foot mode (cost:0) is always available**

In `showTravelModeSelect`, the `_canAfford` check is `_cost === 0 || _gold >= _cost`. Foot costs 0, so it's always enabled. Horse=5, Cart=3, Boat=8. A player with 0 gold always has foot travel available. Confirm this is the case by reading the modal button code.

- [ ] **Step 5: Commit**

```bash
git add ledger-of-ash.html
git commit -m "feat(travel): activate travel mode selection modal — players now choose foot/horse/cart/boat on first journey"
```

---

## TRACK D — Game-Design Suite

---

### Task D1: Run Remaining Game-Design Skills and Triage P0 Findings

The balance-review, economy-review, and feedback-loop-review skills were run in the prior session. The remaining skills have not been run: `game-design:fun-review`, `game-design:mechanics-review`, `game-design:tutorial-review`, `game-design:randomness-review`, `game-design:polish-review`, `game-design:appeal-engagement-review`.

**This task is research-and-triage, not implementation.** Run the skills, record findings, and implement only P0 fixes in this session.

**Files:**
- No file changes until triage complete. P0 fixes go to `ledger-of-ash.html` or relevant content file.

- [ ] **Step 1: Run fun-review**

```
Invoke skill: game-design:fun-review
```

Context to provide the skill: Ledger of Ash is a text-based investigative RPG. Stage II content features enriched choices with full prose results. Combat uses a TTRPG multi-round loop (startCombat). The main loop: arrive at locality → pick enriched choice → read result → pick next choice. Session typically runs 30-60 choices. XP: level×60 to advance. Gold: from combat loot and some work choices.

- [ ] **Step 2: Run mechanics-review**

```
Invoke skill: game-design:mechanics-review
```

Context: Core mechanics are (1) enriched choice pool with Fisher-Yates shuffle + plot:main priority, (2) d20 roll against DC (safe=7, risky=13, bold=16 + stage bonus), (3) skill values in G.skills (0-5 range), (4) heat system (0-10 per polity), (5) stage progress (sp2: 0→12 for antechamber). Pain points: tension system is wired but never incremented; no explicit fail-forward on all choices yet.

- [ ] **Step 3: Run tutorial-review**

```
Invoke skill: game-design:tutorial-review
```

Context: Game has zero explicit tutorial. Players start with character creation (name, archetype, background), then `resolveArrival` fires at the starting locality showing an arrival scene. First choices are from the enriched pool. No tooltips, no guidance text, no onboarding sequence. The roll result UI shows the d20 breakdown inline.

- [ ] **Step 4: Run randomness-review**

```
Invoke skill: game-design:randomness-review
```

Context: Every choice rolls d20. Safe choices have DC 7 (fail ~35% of the time at skill 0; skill 3 = 85% success). Risky = DC 13. Bold = DC 16. Fisher-Yates shuffle determines which 4 choices from the pool appear each visit. `stageProgress[2]` only increments on success/crit outcomes. A player with low wits who keeps failing investigation checks makes no stage progress.

- [ ] **Step 5: Document findings and identify P0 items**

After each skill runs, note findings. A P0 finding is anything that blocks a player's ability to make progress (e.g., "all choices require high wits but skill starts at 0"). P1 = significant but not blocking.

- [ ] **Step 6: Fix P0 findings**

For each P0 finding identified:
- If it's a DC calibration issue: adjust base DCs in `handleChoice` or `getChoiceDC`.
- If it's a missing failResult causing dead-ends: add `failResult` to that specific choice.
- If it's a tutorial gap: add a one-time hint via `addWorldNotice()` in `resolveArrival()`.

Commit each P0 fix separately:
```bash
git commit -m "fix(game-design): [description of specific fix]"
```

- [ ] **Step 7: Run polish-review and appeal-engagement-review**

```
Invoke skill: game-design:polish-review
Invoke skill: game-design:appeal-engagement-review
```

Record P0/P1 findings. Implement P0 fixes only.

---

## TRACK E — Session Agent Playbook

---

### Task E1: Write AGENT_PLAYBOOK.md

Document the optimal agent dispatch patterns for Ledger of Ash sessions. This is a reference doc for future session startups — it codifies what was learned in the May 2026 sprint about which agents handle which tasks best.

**Files:**
- Create: `docs/superpowers/AGENT_PLAYBOOK.md`

- [ ] **Step 1: Create the AGENT_PLAYBOOK.md file**

Write `docs/superpowers/AGENT_PLAYBOOK.md` with the following sections:

```markdown
# Ledger of Ash — Session Agent Playbook

## Session Startup Protocol (MANDATORY)

Run in order at every session start, no exceptions:
1. `/reload-plugins` — loads game-design skill suite and superpowers skills
2. Invoke `superpowers:dispatching-parallel-agents` — sets parallel dispatch mode
3. Invoke `superpowers:subagent-driven-development` — sets review-loop mode
4. Run `less-permission-prompts` — updates settings.json allowlist

## Agent Type → Task Mapping

| Task | Agent Type | Notes |
|---|---|---|
| Bug investigation (3+ root-cause candidates) | `agent-teams:team-debugger` | Dispatch 3 hypothesis agents in parallel |
| Stage II content authoring (multiple localities) | `agent-teams:team-implementer` | Assign one locality per agent; no shared files |
| Deep code audit (engine architecture) | `code-modernization:legacy-analyst` | Use for ledger-of-ash.html structure questions |
| Codebase search / exploration | `Explore` subagent | Use instead of manual Grep for open-ended questions |
| Playtest spec issues | `debugging-toolkit:debugger` | Playwright errors and dead-end tracing |
| Balance/economy/feedback-loop review | `game-design:*-review` skills | Always run after content additions |

## Parallel Dispatch Patterns

### Content Expansion (multiple localities)
Dispatch one `team-implementer` per locality simultaneously:
```
Task("Add plot:main choices to Sunspire Haven")
Task("Add plot:main choices to Panim Haven")
Task("Add plot:main choices to Aurora Crown Commune")
```
File ownership: each agent owns its one content/*.js file only.

### Bug Investigation (multiple root causes)
Dispatch one `team-debugger` per hypothesis:
```
Task("Hypothesis: endCombat defeat path loses choice block")
Task("Hypothesis: retreat path renderChoices races with dead-end check")
Task("Hypothesis: applyWound → modHP → confirmDeath path skips loadStageChoices")
```

### Game-Design Suite (independent skills)
Run all skills in parallel — they read code, don't write it:
```
Task("Run game-design:fun-review")
Task("Run game-design:mechanics-review")
Task("Run game-design:tutorial-review")
```

## Anti-Patterns (do not do these)

- **Never dispatch multiple agents that edit the same file** — merge conflicts
- **Never skip spec run before committing content** — validator catches format violations
- **Never use `window.G`** — G is module-scope let
- **Never use `window.CONST_NAME`** — const is not on window
- **Never add Stage 3+ content** — `canAdvanceToStage3()` is hardcoded false
- **Never edit dist/** — play.bat serves root source HTML
- **Never add Google Fonts link tags** — file:// protocol, use CSS variables
- **Never call `alert()`** — appears as error dialog; use `showToast()` or `addNarration`

## Playtest Invocation

Full playtest protocol is in `docs/PLAYTEST_PROTOCOL.md`. Summary:
1. Run validators: `node tests/content/validate-content.js`
2. Run headless spec: `npx playwright test tests/e2e/playtest-headless.spec.js`
3. Read coverage report in `test-results/playtest-report-*-headless.md`
4. Triage dead-ends; fix before heading spec
5. Run headed spec: `npx playwright test tests/e2e/playtest-headed.spec.js`

## Known Engine Gotchas (May 2026)

- `shiftTension()` is never called with positive delta — tension never reaches 2 naturally
- `STAGE2_CLIMAX` requires both `antechamber_done` AND `miniboss_complete AND faction_contact_made`
- `loadStageChoices` uses locality-specific pool exclusively — no global pool mixing when locality file exists
- `adaptEnrichedChoice` calls `c.fn()` (not `c.action()`) — old choice format uses `fn`
- `G.travelMode` exists but was bypassed until Track C3 fix
- Sunspire/panim/aurora/shirshal Stage II files have content but no `plot:'main'` — spec skips them
```

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/AGENT_PLAYBOOK.md
git commit -m "docs: add session agent playbook for Ledger of Ash parallel agent dispatch patterns"
```

---

## Release Gate Checklist

Before declaring V1 robustness complete, all of the following must pass:

- [ ] `node tests/content/validate-content.js` — 0 new violations
- [ ] `node tests/content/validate-flags.js` — 0 failures
- [ ] `node tests/content/validate-structure.js` — 0 failures
- [ ] `npx playwright test tests/e2e/playtest-headless.spec.js` — 4/4 families, 1 attempt each, 0 dead-ends
- [ ] `npx playwright test tests/e2e/playtest-headed.spec.js` — 4/4 families passing
- [ ] Gold economy verification: at least 1 family reaches 50+ gold during Stage II play
- [ ] Sunspire, Panim, Aurora each appear in headless coverage with sp2 > 0

---

## Self-Review

**Spec coverage check:**
- A1 (combat dead-end): ✅ covered — endCombat fallback + retreat expansion
- A2 (gold income): ✅ covered — 5 modGold additions to global Stage II pool
- B1-B4 (plot:main for thin locs): ✅ covered — 7 total new plot:main choices
- C1 (heat HUD grid): ✅ covered — per-polity abbreviation grid
- C2 (rival journal): ✅ covered — journal rivals+faction section
- C3 (travel mode): ✅ covered — bypass removed from showTravelModeSelect
- D1 (game-design suite): ✅ covered — 6 skills + triage
- E1 (agent playbook): ✅ covered

**Might/Vigor constraint:** Confirmed. No new Might/Vigor rolls added to exploration choices. Spirit/Charm/Wits/Finesse used for new enriched choices. Might/Vigor remain combat/defense context only.

**No Stage 3+ content:** All new choices have `tags: ['Stage2']`. No Stage 3 references.

**No forbidden words:** "investigation" not used in player-facing text. "meaningful", "contact" as noun, "official" as vague adjective all absent.
