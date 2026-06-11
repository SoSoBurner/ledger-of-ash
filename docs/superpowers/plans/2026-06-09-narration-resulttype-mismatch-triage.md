# Post-Playtest Triage — Narration / Roll-Outcome Decoupling Bug

**Captured:** 2026-06-09 23:21 (mid-playtest, headed run for V1.0 bundle commit `25540947`)
**Trigger:** User observed narration cards rendering with resultType inconsistent with the underlying d20 roll outcome.

---

## Observed Bugs (User-Flagged)

### Bug A — Success card shown when d20 roll FAILED (level-up flow)

Example 1 — Level 2:

```
✓ Success
Level 2
Might improved to 4/10. Trait gained: Divine Strike. +8 max HP.
d20: 5 = 5 vs DC 7 — Fail
```

Example 2 — Level 5:

```
✓ Success
Level 5
Might improved to 7/10. Trait gained: Holy Resilience. +8 max HP.
d20: 1 = 1 vs DC 9 — Fail
```

**Inconsistency:** The roll line inside the card explicitly says "Fail" (d20=5 vs DC 7; d20=1 vs DC 9 — fumble), but the card shell is `.scroll-entry--success` and the type pill reads `✓ Success`. Level-up announcements are being attributed to choices whose roll actually failed.

### Bug B — Failure card with NO roll line

Example (Brother Aldwin scene):

```
✗ Failure
Brother Aldwin is mid-blessing... [body text]
[no d20 line below body]
```

**Inconsistency:** The failure-shell card emits no `.scroll-entry__meta` roll line. Either `emitRollLine()` was never called on this path, or the helper's fallback (open new neutral entry if no last-entry exists) is silently swallowing the call when the failure path runs before any scroll-entry exists.

### Bug C — Neutral card with failed roll line

Example (Lodging — Duskcall):

```
· Neutral
Lodging
It is Duskcall. You need somewhere to sleep.
d20: 8 = 8 vs DC 10 — Fail
```

**Inconsistency:** Card shell type is `.scroll-entry--neutral` but the roll line attached to it shows "Fail". Either: (1) the safe-tier `failResult` path is emitting `addNarration(label, html, 'neutral')` when it should emit `'failure'`, OR (2) this is the `emitRollLine` fallback firing on a Lodging body that was previously authored as a neutral aside, and the next choice's failed roll line appended to it (same root cause class as H3).

### Bug E — Crit-fumble (d20=1) with passing math, Failure-card shell

Example (Neren scene):

```
✗ Failure
Neren is more cautious than you expected. 'My position here depends on institutional trust...'
Critical Failure! d20: 1 + Wits 4 + trait 2 + gear 2 = 9 vs DC 7 — Success
```

**Inconsistency:** "Critical Failure!" label precedes the line, math says `9 > 7` so display says "Success", card says "Failure". Three sources of truth disagree. The engine correctly treats d20=1 as crit-fumble (card shell + Critical Failure! label), but `_formatRollLine`'s "Pass/Fail" suffix uses raw math without checking the crit override. **H7.**

### Bug F — Crit-success (d20=20) with failure-flavored body, Failure-card shell

Example (Freight lane scene):

```
✗ Failure
The freight lane is also closed. Whatever is happening on the eastern route, it is contained on all sides.
Critical Success! d20: 20 + Vigor 2 = 22 vs DC 7 — Success
```

**Inconsistency:** "Critical Success!" + math says pass, but card says Failure and body describes a closed lane. Likely the author hardcoded the failure-flavored body inside `c.fn()` unconditionally, but the engine rolled a 20 and tried to override the resultType — failed to thread back to the card shell. **H9.**

### Bug G — Tie (total == DC) — Failure-card shell, Success roll line

Example (Roadwarden off-duty scene):

```
✗ Failure
Every Roadwarden you find off-duty is either unresponsive or actively avoiding the topic of eastern routes.
d20: 5 + Wits 4 + trait 2 + gear 2 = 13 vs DC 13 — Success
```

**Inconsistency:** total=13, DC=13. Display: `>=` → "Success". Engine: `>` → fail. **H5 CONFIRMED.** This is a strict-vs-inclusive operator mismatch between the roll-line builder and the engine's pass/fail check.

### Bug H — Ambient/locality/encounter narration emitted as `'neutral'` resultType

Examples:

```
· Neutral
Shelkopolis
Shelkopolis. Capital of House Shelk. Dyes, pressed flowers, and polished boots. Road patrols are visible...
```

```
· Neutral
Your analysis of the eastern route logistics was suppressed by the Academy six weeks ago...
[long arrival-kit prologue, no roll line]
```

```
· Neutral
Roadwarden Lieutenant Perrin Gleam
You found him before he expected to be found. The alley at the end of Copper Lane...
[NPC encounter intro, no roll line]
```

**Inconsistency:** These are ambient/intro/encounter texts, not roll outcomes. Type pill says `· Neutral` — visually identical to "you rolled and nothing happened." Should be:
- Locality intros → `'dim'` (ambient aside, lighter visual weight)
- Arrival-kit prologues → `'dim'` or `'notice'` (incoming info)
- NPC encounter intros → `'encounter'` (red-bordered, distinct shell)

**H8.** The `'neutral'` resultType is being overused as a catch-all for any non-roll narration.

### Bug I — Author-success-body on failed-roll choice

Example (Watch-the-city scene, two repeated instances with different d20s — same body, both failed):

```
✓ Success
You sit, watch, and let the city wash over you. Over two hours you collect three fragments:
a Roadwarden captain argued with a merchant in a way that ended with the merchant leaving faster than was polite;
a broadsheet was distributed and then collected again within an hour;
and someone described a route checkpoint as closed until further notice.
d20: 9 + Charm 2 = 11 vs DC 13 — Failure
```

```
✓ Success
[same body]
d20: 5 + Charm 2 = 7 vs DC 13 — Failure
```

**Inconsistency:** Body describes collecting three useful fragments — a clear success outcome. Roll line says Failure both times. Likely the choice's `c.fn()` writes the success-flavored body unconditionally, not gated on the roll. Author authored only the success path; no `failResult`. Engine still narrates the body via `c.fn()` even when failing, then attaches a "Failure" roll line. The fix is content-side: split into `fn`/`failResult`, or gate body emission on roll outcome. **H6 + H9 combined.**

### Bug M — Notice/incoming-info card emitted as `'neutral'`, roll line attached

Example (Transit Verification Inquiry):

```
· Neutral
Transit Verification Inquiry — Form 14-C
The form arrives folded inside a courier sleeve, delivered to your lodgings before the morning shift change.
It is formal, pre-printed, and precise: the Transit Verification Division of the Oversight Collegium requests
the bearer present their travel documentation, source notes, and any materials gathered in connection with
routes currently under active audit. A time is listed. A room number. Signed at the bottom in the same
careful hand from the manifest bundles: D. Pell, Senior Auditor. He laid his pen flat after signing it —
the ink pressed cleanly, without a drag mark. He expected this form to be delivered.
d20: 6 · Wits +1 · rival DC +1 = 7 vs DC 12 — Fail
```

**Inconsistency stack:**

1. Body describes a delivered notice/summons — clear `'notice'` (or `'complication'`, since this is a problem) event. Rendered as `'neutral'` instead.
2. Body has NPC name + clue ("D. Pell expected this form to be delivered" — diegetic foreshadowing). This is *information delivery*, not a roll outcome.
3. The failed Wits roll line attached to this card likely belongs to the previous choice (e.g. "try to dodge the auditor's attention" failed → form arrives). H3 pattern: side-effect/notice shell interposes between primary choice and its roll line.

**Most likely root cause:** A separate `addNarration` call in the choice's `c.fn()` or in an event-queue side-effect emits the form-arrival notice as `'neutral'` because the author didn't know `'notice'` existed (or it was added by T5 after the content was authored). The next `emitRollLine` call attaches to this last-shell.

**Cross-references:** H3 (shell wedging), H6 (author hardcoded neutral), H8 (neutral overused for non-roll narrations). Likely combination of all three.

### Bug N — Roll-line format drift across emit sites

Compare two roll lines from this run:

```
d20: 10 + Charm 1 + trait 2 = 13 vs DC 10 (L5+2) (Stage II pressure +1) — Success
```
vs
```
d20: 6 · Wits +1 · rival DC +1 = 7 vs DC 12 — Fail
```

**Inconsistencies:**

1. Separator: `+ Charm 1` vs `· Wits +1` — `+` joiner with bare number vs `·` joiner with explicit `+1`.
2. Skill display: `Charm 1` (no sign) vs `Wits +1` (signed).
3. DC suffix: `(L5+2) (Stage II pressure +1)` bracketed vs `rival DC +1` inline as a mod.
4. Outcome label: `— Success` vs `— Fail` (capitalization is fine; engine uses both forms).

**Root cause:** Two roll-line emit code paths exist post-T1:
- `_formatRollLine` (T1's canonical builder, uses `·` separator).
- One or more legacy emitters that still build inline HTML with `+` joiners and bracketed DC suffixes.

T1 Task 1.6 was supposed to migrate 10 bypass emitters to `emitRollLine` + `_formatRollLine`. At least one legacy emitter survived migration. Verify via:

```bash
grep -n " + Charm \| + Wits \| + Might \|(L[0-9]+\+\|Stage II pressure" /c/Users/CEO/ledger-of-ash/ledger-of-ash.html
```

Likely culprit: `gainXp`/`checkLevelUp`/`combat-action` paths that build their own roll display.

### Bug L — Choice button tag rendering inconsistent across choices

Example (screenshot at 23:5x — choice list on right side):

```
RISKY                       (only one tag — top, cut-off)

Lady Isabella Shelk knows the disruption doesn't originate in this city. She may say so.
CHARM   SAFE                (two tags — skill + tier)

The shortages are too surgical for a family dispute. The rivalry is scaffolding.
WITS    RISKY               (two tags — skill + tier)

Inquisitor Orveth conducts his reviews at the same tavern table every third day.
CHARM   SAFE                (two tags — skill + tier)
```

**Inconsistencies:**

1. Some choices render TWO tags (skill + tier), some render ONE (tier only or skill only).
2. Tag presence may depend on whether the choice object has both `skill:` and `tag:`/`tags:` fields populated. Choices with `skill: 'charm', tag: 'safe'` get both pills; choices with only `tag: 'risky'` (no skill) get one pill.
3. Visual weight is uneven — uniform tag rendering improves scannability. Players use tag color (red=risky, green=safe, blue=skill) to triage choices at a glance; missing tags break that visual contract.

**Possible root causes:**

1. **Content-side schema drift.** Old content uses `tag: 'risky'` only. Newer content uses `skill: 'charm', tag: 'safe'`. Stage 1 choices may inherit the older single-tag format while Stage 2 choices have both.
2. **Tier inferred but skill not.** `getChoiceTier(choice)` infers tier from `tag`/`tags`. There's no equivalent inference for skill — if the choice doesn't declare `skill:`, no skill pill renders.
3. **Render path only emits pills it finds.** The choice-button render reads `choice.skill` and `choice.tag` independently — if either is missing, that pill is omitted, with no fallback like "Untrained" or "Neutral tier".

**Player UX consequence:** Players see uneven choice cards and can't tell whether a missing tag means "no skill needed" or "author forgot to label it." Tag visual contract should be: every rolled choice shows tier pill (always) + skill pill (always; default `MIGHT` or `UNSKILLED` if absent).

### Bug K — Body text rendered with `.scene-location` ALL CAPS styling (T1 regression or leak)

Example (screenshot at 23:5x — Authority patrols card):

```
· Neutral
AUTHORITY PATROLS HAVE YOUR
DESCRIPTION. MOVING FREELY HAS A
COST NOW.
d20: 12 = 12 vs DC 10 (L3+1) (Stage II pressure +1) — Success
```

The body text is rendered in gold display font, ALL CAPS, with heavy letter-spacing (~5px). This is the OLD pre-T1 `.scene-location` styling — exactly what Task 1.1 was supposed to fix.

**Possible root causes:**

1. **Content passes body as `label` arg to `addNarration`.** `addNarration(label, html, type)` wraps `label` in `<div class="scene-location">label</div>`. If the choice calls `addNarration('Authority patrols have your description...', '', 'neutral')` (body in label slot, empty html), the body gets header styling. **Most likely root cause.**

2. **Content wraps body in `<div class="scene-location">` directly.** Some content files build their own HTML strings: `addNarration('', '<div class="scene-location">AUTHORITY PATROLS...</div>', 'neutral')`. T1's fix relaxed `.scene-location` to normal-case + 1.5px letter-spacing, so this would now render normal-case — but the screenshot shows ALL CAPS, ~5px spacing. So either T1's CSS change didn't ship to the loaded file, OR a secondary CSS rule still applies the old style.

3. **Dist/repo file divergence.** Playwright spec loads via `http-server :8080`. Confirm which file is served — root `ledger-of-ash.html` (canonical, has T1 fix) or `dist/ledger-of-ash.html` (rebuilt by build.py). If `dist/` was used and the rebuild missed picking up T1's CSS, the old styling persists.

4. **Author-side `<style>` block override.** Some content files may inject inline styles or have hardcoded text-transform on a different selector. Less likely.

**Verification step:** Open `play.bat` directly, trigger the same Authority patrols scene, screenshot. If ALL CAPS persists → CSS leak (root cause 4) or dist-only fix (3). If normal-case → playwright/http-server file mismatch (3).

**T1 verification gap:** Task 1.1 grep verification only checked `text-transform: uppercase` count in `ledger-of-ash.html`. It did NOT check `dist/ledger-of-ash.html` for the same. Build.py may have shipped pre-T1 CSS.

### Bug J — `dim` (Aside) card with crit-fumble roll line

Example:

```
· Aside
Your sense of where you stand shifts.
Critical Failure! d20: 1 + Vigor 2 = 3 vs DC 7 — Failure
```

**Inconsistency:** "Your sense of where you stand shifts" is canonical alignment-shift side-effect narration — a tiny incidental note, not a primary outcome. It should be its own ambient/dim card with NO roll line. The crit-fail roll line attached to it almost certainly belongs to the *previous* primary choice. **H3 confirmed.** `emitRollLine` is attaching to the wrong shell — specifically, the alignment-shift side-effect emits its own `'dim'` shell after the primary choice's body, and then the roll line lands inside the dim shell instead of the primary success/failure shell.

### Bug D — Failure card with PASSING roll line (INVERSE of Bug A)

Example (Market contact attempt):

```
✗ Failure
The market is busy and closed to you. Nobody is unfriendly, but nobody is forthcoming.
You are an unknown face in a city that runs on recognition.
d20: 10 + Charm 1 + trait 2 = 13 vs DC 10 (L5+2) (Stage II pressure +1) — Success
```

**Inconsistency:** Roll line concluded "= 13 vs DC 10 — Success" but card shell is `.scroll-entry--failure`. Direct decoupling: the resultType passed to `addNarration` is `'failure'`, while the `succeeded` boolean fed to `_formatRollLine` is `true`. Could be:
- The choice's `c.fn()` body unconditionally calls `addNarration(label, html, 'failure')` regardless of the engine's pass/fail outcome (author bug — common in old enriched content)
- OR the choice writes its own narration shell that *describes failure*, then the engine appends a passing roll line on top (H3-class shell-mismatch on the inverse path)
- OR `(L5+2) (Stage II pressure +1)` mods make the *true* DC `10+2+1 = 13`, and total=13 against DC 13 ties → engine treats tie as fail but `_formatRollLine` displays the raw DC. **Check ties.** This is the most likely root cause for Bug D specifically: tie-breaking inconsistency between engine pass logic and roll-line display logic.

---

## Likely Root-Cause Hypotheses

These are hypotheses to verify, not confirmed diagnoses. Code-reviewer agent should test each:

1. **H1 — Hardcoded `'success'` on level-up announcement.** `checkLevelUp()` (or wherever the "Level N — Might improved..." announcement fires) calls `addNarration(label, html, 'success')` unconditionally, regardless of the triggering choice's roll outcome. The level-up fires off XP gain, which fires regardless of roll pass/fail in some content paths (e.g. tutorial), so the announcement leaks `success` resultType even when the choice failed.

2. **H2 — Roll-line emit happens BEFORE shell, breaking parent attachment.** `emitRollLine()` appends to `.scroll-entry:last-of-type` inside `#scroll`. If `c.failResult()` runs `emitRollLine` before any `addNarration` shell is created (e.g. failure path that only emits a roll line and no body), the helper's fallback opens a new `'neutral'` shell — wrong resultType — and the body-only failure narration ends up disjoint from the roll line.

3. **H3 — `adaptEnrichedChoice` emits both shell AND roll line, but level-up wedges between them.** Order of operations in the success path:
   - `c.fn()` is called
   - `c.fn()` calls `gainXp(N)` → triggers `checkLevelUp()` → emits its own `success` shell + body
   - `adaptEnrichedChoice` then calls `emitRollLine(failedRollText, 'failure')`
   - `emitRollLine` appends to the LAST shell (which is the level-up's success shell)
   - Result: the failed roll line ends up appended INSIDE the level-up's success card
   
   This is the most likely root cause for Bug A specifically — level-ups eating the roll line of the next failed choice.

4. **H4 — `_outcomeType` not threaded.** `_formatRollLine` is given the `succeeded` boolean and chooses `rollType` between `success`/`failure`/`crit`/`fumble`. If `succeeded` is being passed `true` based on `c.fn()` running (not on the roll), the type mismatch is upstream of `_formatRollLine`.

5. **H5 — Tie-breaking display vs engine disagreement (Bug D specific).** Roll line displays `= 13 vs DC 10` with hidden mods like `(L5+2) (Stage II pressure +1)` not folded into the displayed DC. Effective DC may actually be `10+2+1=13`. Engine compares `total >= effDC` differently than `_formatRollLine`'s "Pass" decision — e.g. engine uses strict `>` while display uses `>=`, or vice versa. Result: total=13 vs effDC=13 → engine says fail, display says pass.

6. **H6 — Author-side `addNarration` hardcoded outcomes (Bugs C, D).** Old enriched-choice content predating the resultType lock may call `addNarration(label, html, 'failure')` or `'neutral'` inside `c.fn()` regardless of the engine's roll outcome. The author intended the narration to convey defeat, so they hardcoded `'failure'` — but the engine later attaches a passing roll line because the roll itself succeeded. T5's vocabulary validator catches typos but does NOT catch the semantic-vs-outcome mismatch. **This is likely the most common root cause across Bugs A/C/D** — content debt from before T1.

7. **H7 — Critical-fumble (d20=1) and critical-success (d20=20) override path divergence.** When d20=1+mods total *above* the DC, two truths conflict: raw math says pass, crit-fumble rule says fail. Engine may apply crit-fail to the resultType (`'fumble'` or `'failure'`) while `_formatRollLine` shows pass based on math. Symmetric: d20=20+mods total *below* the DC is rare but possible at very high DCs — raw math says fail, crit-success says pass. Display label "Critical Failure!" / "Critical Success!" then conflicts with the trailing "vs DC N — Success/Failure" verdict.

8. **H8 — Locality/ambient/encounter narration miscategorized as `'neutral'`.** Locality first-arrival intros (e.g. "Shelkopolis. Capital of House Shelk. Dyes, pressed flowers..."), arrival-kit prologue scenes ("Your analysis of the eastern route logistics was suppressed..."), and NPC encounter intros (e.g. Roadwarden Lieutenant Perrin Gleam multi-paragraph intro) are emitted with `resultType: 'neutral'` when they should be `'dim'` (ambient aside), `'notice'` (incoming information), or `'encounter'` (NPC scene). The neutral pill is visually indistinguishable from a "rolled, nothing happened" outcome — readers can't tell ambient-room-text from gameplay-result-text.

9. **H9 — Body authored for one outcome, opposite roll occurred.** Some content choices hardcode body text inside `c.fn()` describing one outcome ("You catalog the broken seal... what you have now is evidence"), then the actual roll result is the opposite. Result: `'success'` card with success-flavored body, then a failed roll line. OR: failure-flavored body inside `c.fn()` that runs unconditionally, then a critical success roll line lands beneath it. Common when `c.fn()` is treated as "always run this body" instead of being gated on the engine's pass/fail check.

---

## Investigation Checklist for Post-Playtest

When the headed playtest completes:

### Dispatch — spec-miner agent
Scope: scan `test-results/playtest-report-*-headed.md` + `test-results/playtest-transcript-*.md` (if generated) + `test-results/playthrough-screenshots/headed/*.png` (or their filenames at minimum) for additional resultType / roll-outcome mismatch patterns. Specifically:

- Cards labeled `--success` whose roll line contains "— Fail" or d20≤DC
- Cards labeled `--failure` whose roll line contains "— Pass" or d20>DC
- `--failure` cards with no `.scroll-entry__meta` child at all
- Level-up bodies attached to non-success-shells (or vice versa)
- `--neutral` cards with crit-fail/crit-success roll lines (Bug E/F/J pattern)
- `--neutral` cards with NPC-name headers or locality-intro bodies (Bug H pattern)
- Body text rendered in ALL CAPS with gold/letter-spaced styling (Bug K — `.scene-location` leak)
- **Choice button tag uniformity** (Bug L) — for every choice list visible across screenshots, count tag-pill render counts: how many show 0 / 1 / 2 / 3+ pills. Identify whether single-pill choices are missing skill or tier. Flag any pattern where choices in the same list have inconsistent tag presence.
- Count occurrences per family + report frequency

### Dispatch — code-reviewer agent
Scope: audit the T1 emission flow in `ledger-of-ash.html`:

- `addNarration` call sites — find every one that passes a hardcoded resultType string ignoring roll outcome. Especially: `checkLevelUp`, `gainXp` (if it narrates), `unlockTrait`, ability-grant emitters, archetype-grant emitters.
- `emitRollLine` reachability — for every code path that calls `c.failResult()` in `adaptEnrichedChoice`, confirm `emitRollLine` is called BEFORE any side-effect that could create a new scroll entry.
- Order-of-operations bug — confirm whether `gainXp`/`checkLevelUp`/`unlockTrait` ever fire inside `c.fn()` BEFORE `emitRollLine` is called, and whether they emit their own shells via `addNarration`.
- **Pass/fail comparison operator** — find the engine's `succeeded = (total >= dc)` or `(total > dc)` line and compare it to `_formatRollLine`'s outcome decision. They must use the same operator. (H5)
- **Effective DC vs displayed DC** — `_formatRollLine` shows raw DC (`vs DC 10`) but the engine may compare against `dc + rivalDcMod + stagePressure - pendingDcReduce`. Add the effective DC to the display OR document the discrepancy. (H5)
- **Content-side `addNarration` audit** — grep `content/*.js` for `addNarration(..., ..., 'failure')` and `addNarration(..., ..., 'neutral')` inside choice `fn:` bodies; flag any where the resultType is hardcoded without consulting the roll outcome. T5's validator only catches typos — extend it to flag hardcoded outcomes inside `fn:` blocks if the choice has a `roll:` or `skill:` field. (H6)
- **Crit-fail/crit-success roll-line suffix** — find `_formatRollLine`'s "Pass/Fail" decision (currently `var outcome = succeeded ? 'Pass' : 'Fail';`). Crit overrides on `isCrit`/`isFumble` should propagate to this suffix, not just to the type pill. (H7)
- **`emitRollLine` target-shell selection** — confirm whether the helper attaches to the absolute-last `.scroll-entry` or to the *primary-outcome* `.scroll-entry`. Side-effect emitters (alignment shifts, ability grants) interpose `dim`/`notice` shells between the primary body and the roll line, breaking the contract. Consider tagging the primary shell with `data-primary="true"` and selecting on that. (H3 / Bug J)
- **`addNarration(label, html, type)` arg-order audit** — content files may pass body text in the `label` slot. Grep `content/*.js` for `addNarration\(\s*['"]` calls where the first quoted arg is longer than 30 chars (suggesting it's body text, not a header). T5 validator extension scope. (Bug K root cause 1)
- **Dist build verification** — confirm `dist/ledger-of-ash.html` contains T1's relaxed `.scene-location` CSS (1.5px letter-spacing, no uppercase). If old uppercase rule persists in dist, rerun `build.py` and verify. (Bug K root cause 3)
- **Choice button tag-pill render audit** — find the choice-button render code (likely in `renderChoices` or a helper). Confirm whether `skill` pill and `tier` pill render conditionally on each field's presence, or unconditionally with defaults. Recommend rendering both always — default `tier` to inferred-from-tags, default skill pill to "GENERAL" if no skill declared. (Bug L)
- Hypotheses H1–H9 above — test each.

---

## Acceptance Criteria for Fix

A fix is complete when:

1. No `.scroll-entry--success` card contains a roll line with "— Fail" or d20 < DC.
2. No `.scroll-entry--failure` card contains a roll line with "— Pass" or d20 ≥ DC.
3. Every choice that triggers a roll produces exactly one roll line, attached to the shell whose resultType matches the roll outcome.
4. Level-up announcements emit their own card (success-typed if level-up itself succeeded — which it always does once XP threshold met), but do NOT interpose between a choice's body shell and its roll line.

---

## Bug O — Combat round results rarely render in formatted card shell

**Observation (user, mid-playtest):** Combat round results in the well-formed shell are RARE. Example of the rare correct format:

```
✗ Failure
Round 1
d20 roll: 4 + Vigor 1 = 5
You are struck as you attempt to break. You take 2 damage and barely escape.
```

The card has: ✗ Failure type pill, "Round 1" header (combat round counter), `d20 roll: 4 + Vigor 1 = 5` roll line with `+` join + skill name + total, body narration with mechanical effect.

**Implication:** Most combat rounds emit something else — likely no card shell (raw inline roll-result `<div>` from a legacy emitter T1 Task 1.6 didn't migrate), or a card with missing roll line, or wrong type pill.

**Roll-line format note:** This example uses `+ Vigor 1` join (legacy emitter style), NOT `_formatRollLine`'s `· Vigor +1` separator format. Combat path appears to have its own roll-line builder distinct from `_formatRollLine`. Either both formats should be unified OR T1's `emitRollLine` migration explicitly skipped combat (Task 1.6 lists 10 sites including L4828/L4946 in combat — confirm whether those emit through `_formatRollLine` or a separate combat-side builder).

**Hypothesis (H10 — new):** Combat resolution (`resolveCombatAction`, ~L4946; `enterCombat` rounds) emits via a different code path than `adaptEnrichedChoice`. The 10 emitter sites T1 Task 1.6 migrated may have included combat sites in the grep list, but the actual implementation in `resolveCombatAction` may still build inline HTML (`'<div class="roll-result">'` or similar) instead of calling `emitRollLine`. Result: most combat rounds render as plain inline text inside the scroll, with NO `.scroll-entry--{success|failure}` shell, no type pill, no border, no italic meta. Only the rare cases where a combat round happens to be emitted through the migrated path produce the proper card.

**Add to spec-miner scope:** Count combat-round emit format across all screenshots: how many show `.scroll-entry--{success|failure}` shells with "Round N" headers vs. how many show bare inline `d20 roll: X + Y` text without a shell. If <20% are shelled, confirm H10.

**Add to code-reviewer scope:** Verify `resolveCombatAction` (~L4946), `enterCombat` round loop, and any `_resolveCombatRound`/`_attackRound`/`_enemyTurn` helpers all call `addNarration` + `emitRollLine` rather than building inline HTML. Grep for `class="roll-result"` and `class="combat-round"` in the canonical file and in `dist/` — there should be zero after T1 Task 1.6.

---

## Defer Until After Playtest

- Do not patch the engine before the headed run completes — losing test coverage of the current build state defeats the playtest.
- Do not auto-dispatch agents until playtest is at "DONE" status. Manual TaskGet of `brer97lx5` (or successor) before launching analysis.
