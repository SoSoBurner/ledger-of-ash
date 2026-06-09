# Track 11 — Balance Matrix Logger
**System:** Headed playtest spec skill-use tracking and balance matrix reporting
**File to modify:** `tests/e2e/playtest-headed.spec.js`
**Functions in scope:** K6 skill-use logger (~line 2174–2188), Block M balance matrix emit (~line 2392–2411)
**No-touch:** `runPlaythrough`, `pickChoice`, `dismissOverlays`, `CoverageTracker`, `ReportWriter`, `post-run-analysis.js`, `playtest-headless.spec.js`, all other helpers in `tests/e2e/helpers/`

---

## PLAYTEST CHANGE GATE — MANDATORY FIRST STEP

**STOP. Before making any change:**

Confirm with the user: **"Are you sure you want to modify the Playtest system?"**

Do not proceed until you receive explicit confirmation. This gate exists because changes to the playtest harness can silently invalidate run baselines, break the headed/headless regression suite, or alter the acceptance criteria for all other tracks.

Only after receiving confirmation: proceed with Fix BM1 below.

---

## Context

The headed spec's K6 skill logger (~line 2174) reads the displayed skill badge from the about-to-be-picked choice button. The badge text is one of: `MIGHT`, `FINESSE`, `VIGOR`, `WITS`, `CHARM`, `SPIRIT`, `CRAFT` (display-name keys used by the engine since May 2026 normalization).

The K6 block extracts the badge and then runs it through `_KEY_NORM` — but that map is currently a **reverse normalization** (display-name → old internal key):

```js
// Current code at ~line 2181 — THIS IS THE BUG:
const _KEY_NORM = { might:'combat', finesse:'stealth', vigor:'survival', wits:'lore', charm:'persuasion', spirit:'craft' };
_skillUsed = _KEY_NORM[_skillUsed] || _skillUsed;
```

Effect: A button showing `MIGHT` gets normalized to `'combat'`. A button showing `WITS` gets normalized to `'lore'`. The `_familySkillCounts` object accumulates under old internal keys.

Block M then logs `_familySkillCounts` entries directly into the balance matrix. Because `G.skills` uses display-name keys (might/finesse/vigor/wits/charm/spirit), the report column headers (old internal keys) never match what's actually in G.skills — the matrix reads as all-zeros for every skill except the few remaining content choices that still display old keys as their badge.

The fix: remove the reverse normalization from K6 entirely. The badge is already in the correct display-name format. Store it directly.

---

## Fix BM1 — Remove reverse normalization from K6 skill logger (HIGH)

**File:** `tests/e2e/playtest-headed.spec.js`
**Lines:** ~2174–2188

**Read the current K6 block first** (read file at ~line 2173, limit 20 lines) to confirm exact current code before editing.

BEFORE (~lines 2174–2188, approximate):
```js
let _skillUsed = 'unknown';
try {
  const _pickedBtnLocator = page.locator('.choice-btn:visible:not([disabled])').first();
  const _btnText = await _pickedBtnLocator.textContent().catch(function() { return ''; });
  const _skillMatch = (_btnText || '').match(/\b(SURVIVAL|COMBAT|STEALTH|LORE|PERSUASION|CRAFT|MIGHT|FINESSE|VIGOR|WITS|CHARM|SPIRIT)\b/i);
  if (_skillMatch) {
    _skillUsed = _skillMatch[1].toLowerCase();
    const _KEY_NORM = { might:'combat', finesse:'stealth', vigor:'survival', wits:'lore', charm:'persuasion', spirit:'craft' };
    _skillUsed = _KEY_NORM[_skillUsed] || _skillUsed;
  }
  // Block M — ability tracking: detect ability button clicks by label text
  if (/\babilit/i.test(_btnText || '')) {
    _familyAbilityCount++;
  }
} catch (_) {}
```

AFTER:
```js
let _skillUsed = 'unknown';
try {
  const _pickedBtnLocator = page.locator('.choice-btn:visible:not([disabled])').first();
  const _btnText = await _pickedBtnLocator.textContent().catch(function() { return ''; });
  const _skillMatch = (_btnText || '').match(/\b(SURVIVAL|COMBAT|STEALTH|LORE|PERSUASION|CRAFT|MIGHT|FINESSE|VIGOR|WITS|CHARM|SPIRIT)\b/i);
  if (_skillMatch) {
    _skillUsed = _skillMatch[1].toLowerCase();
    // No normalization — display-name keys (might/finesse/vigor/wits/charm/spirit) are correct as-is.
    // Old content files may still emit COMBAT/STEALTH/LORE etc; map those forward for backward compatibility:
    const _LEGACY_NORM = { combat:'might', stealth:'finesse', survival:'vigor', lore:'wits', persuasion:'charm' };
    _skillUsed = _LEGACY_NORM[_skillUsed] || _skillUsed;
  }
  // Block M — ability tracking: detect ability button clicks by label text
  if (/\babilit/i.test(_btnText || '')) {
    _familyAbilityCount++;
  }
} catch (_) {}
```

Key change: `_KEY_NORM` (reverse map display→old) replaced with `_LEGACY_NORM` (forward map old→display). Badges that are already display-name format (`might`, `wits`, etc.) pass through `_LEGACY_NORM[key] || key` unchanged. Old badges (`combat`, `lore`) get correctly mapped to display names.

---

## Fix BM1b — Update balance matrix report header labels

**File:** `tests/e2e/playtest-headed.spec.js`

The `ReportWriter.addArchetypeSignature()` at ~line 2401 receives `skillCounts: Object.assign({}, _familySkillCounts)`. The ReportWriter formats this into the balance matrix table. Locate `report-writer.js` in `tests/e2e/helpers/` and find where the balance matrix table header is rendered.

**Search for the header in report-writer:**
```
grep -n "combat\|stealth\|survival\|lore\|persuasion\|balance" tests/e2e/helpers/report-writer.js
```

If the report-writer hardcodes old internal key column headers (e.g., `| combat | stealth | lore |`), update them to display-name keys:

BEFORE (in report-writer.js, approximate):
```js
'| family | combat | stealth | survival | lore | persuasion | craft |'
```

AFTER:
```js
'| family | might | finesse | vigor | wits | charm | spirit | craft |'
```

Also update any corresponding `|---|---|` separator row to match the new column count if `spirit` is added as a new column.

If the report-writer generates headers dynamically from `skillCounts` object keys (not hardcoded), no change is needed — the keys will now be display-name format after Fix BM1.

---

## Verify Steps

1. **Confirm gate was acknowledged** before proceeding (see PLAYTEST CHANGE GATE above).
2. Run `npm run test:content` — must show 0 new violations (spec files are not checked by content validator, but confirm no JS syntax errors in the edited spec).
3. Run the headed spec on a single family for a quick check (reduces full run time):
   ```
   npx playwright test tests/e2e/playtest-headed.spec.js --reporter=line
   ```
4. In the generated report (check `tests/test-results/playtest-report-*-headed.md`), find the Balance Matrix section. It must show:
   - Column headers: `might | finesse | vigor | wits | charm | spirit | craft` (not `combat | stealth | lore | ...`)
   - Non-zero values for at least `wits` and `charm` for investigation/social archetype families
   - Non-zero values for `might` for combat-family archetypes
5. The `[balance-matrix]` log lines (grep in the test output) must show key=value pairs using display-name keys, e.g., `might=12 wits=7 charm=4` rather than `combat=2`.
6. Confirm no regression: all 4 playtest families must still pass (not stall or error). The only change is how skill usage is labeled — no gameplay logic is affected.

---

## Edge Cases

- **Old content choices still displaying `COMBAT`/`LORE` badges:** The `_LEGACY_NORM` forward map handles these correctly. They will be counted under `might`/`wits` respectively, which is correct.
- **`CRAFT` badge:** Already a display-name key — passes through `_LEGACY_NORM` unchanged (`_LEGACY_NORM['craft']` is `undefined`, so `|| 'craft'` returns `'craft'`).
- **`SPIRIT` badge:** Same — `_LEGACY_NORM['spirit']` is `undefined`, returns `'spirit'`.
- **`unknown` skill:** Choice buttons with no skill badge produce `_skillUsed = 'unknown'` — these are skipped in the accumulator (`if (_skillUsed !== 'unknown')`). No change needed.

---

## Git Commit Message Template

```
fix(spec): balance matrix logger — replace reverse KEY_NORM with forward LEGACY_NORM; skill counts now accumulate under display-name keys (might/wits/charm) not old internal keys

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
