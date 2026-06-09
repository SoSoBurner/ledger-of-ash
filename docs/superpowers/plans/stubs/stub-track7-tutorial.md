# Track 7 — Tutorial and How-To
**System:** Tutorial callouts + HOWTO_SECTIONS content
**File to modify:** `ledger-of-ash.html`
**Functions in scope:** `maybeShowTutorial`, `updateCaseFileHUD`, `HOWTO_SECTIONS` array
**No-touch:** `showHowToPlay()`, `_buildOnboardingPages()`, onboarding modal structure, tutorial flag object shape (`G.tutorialFlags`)

---

## Context

`HOWTO_SECTIONS` is a JS array declared at ~line 18490 of `ledger-of-ash.html`. It is rendered by `showHowToPlay()` at ~line 18515. Tutorial callouts (`first_combat`, `first_levelup`, etc.) are defined at lines 17263–17314 and triggered by `maybeShowTutorial(event)`.

Issues confirmed by spec-mine:
- Boss threshold text is wrong (says 8, engine uses 15)
- `updateCaseFileHUD` denominator is wrong (divides by 10, should be 15)
- Camp action "Review Notes" listed but doesn't exist
- World clock "Attention" label mismatch (engine + HUD uses "Watchfulness")
- `first_npc` tutorial references old key "Lore" (should be "Wits")
- `first_combat` and `first_levelup` defined but never triggered
- HOWTO_SECTIONS has 5 duplicated topic pairs

---

## Fix TU1 — Boss threshold wrong (HIGH)

**File:** `ledger-of-ash.html`
**Line:** 18511 (HOWTO_SECTIONS "Stage Progress" entry)

BEFORE:
```
{ heading: 'Stage Progress', body: 'The progress bar in your HUD tracks your stage advancement. Risky and bold choices advance it; safe choices do not. The bar must reach 3 for the stage miniboss to unlock, and 8 or higher to face the stage boss. Completing the boss encounter clears the way to advance. You cannot skip stages — the groundwork must be laid before the confrontation becomes possible.' },
```

AFTER:
```
{ heading: 'Stage Progress', body: 'The progress bar in your HUD tracks your stage advancement. Risky and bold choices advance it; safe choices do not. The bar must reach 3 for the stage miniboss to unlock, and 15 or higher to face the stage boss. Completing the boss encounter clears the way to advance. You cannot skip stages — the groundwork must be laid before the confrontation becomes possible.' },
```

**Also fix `updateCaseFileHUD` denominator at ~line 17706:**

BEFORE (line 17706):
```js
fill.style.width = Math.min(100, Math.round((inv / 10) * 100)) + '%';
count.textContent = inv + ' / 10';
```

AFTER:
```js
fill.style.width = Math.min(100, Math.round((inv / 15) * 100)) + '%';
count.textContent = inv + ' / 15';
```

Note: This is a text-only change inside an existing span — exempt from HUD layout policy.

---

## Fix TU2 — Companion descriptions factually wrong (HIGH)

**File:** `ledger-of-ash.html`
**Line:** 18510 (HOWTO_SECTIONS "Companions" second entry — will survive deduplication in TU7)

BEFORE:
```
{ heading: 'Companions', body: 'Companions join after you resolve the Maren Oss encounter in Stage I. Vorath Gelden provides combat bonuses and intimidation presence. Mira Calden provides skill bonuses to lore and stealth. Each companion has an agenda that can create friction — they are not tools, they have opinions. Companion bonuses apply passively to relevant rolls. Losing a companion mid-stage has lasting narrative consequences.' },
```

AFTER:
```
{ heading: 'Companions', body: 'Companions join after you resolve the Maren Oss encounter and open the companion gate. Vorath Gelden provides +2 to social checks with garrison-affiliated NPCs and a once-per-scene Tactical Assessment ability. Mira Calden provides once-per-locality trade anomaly intelligence and a once-per-scene Political Read ability. Kaevrin provides +2 to Wits on intelligence-gathering choices and a once-per-scene Pattern Analysis ability. Each companion has an agenda — they are not tools, they have opinions.' },
```

---

## Fix TU3 — 'Review Notes' camp action doesn't exist (HIGH)

**File:** `ledger-of-ash.html`
**Line:** 18494 (HOWTO_SECTIONS "Rest Mechanics" entry — will be removed in TU7; apply the fix to the surviving "Camp & Recovery" entry at line 18498 instead)

Wait: TU7 removes the "Rest Mechanics" entry (18494) and keeps "Camp & Rest" (18509). Apply Fix TU3 to line 18509 "Camp & Rest" entry by removing "Review Notes" language and ensuring the correct camp action list appears.

BEFORE (line 18509):
```
{ heading: 'Camp & Rest', body: 'Rest at camp to recover HP. The amount healed scales with your Vigor skill. Crafting at camp uses a Spirit roll against the recipe difficulty — success produces the item, failure consumes materials. If you have companions, posting watches overnight converts potential ambushes into warned encounters where you act first. Camp is also where companion-specific events can trigger.' },
```

AFTER:
```
{ heading: 'Camp & Rest', body: 'Rest at camp to recover HP. The amount healed scales with your Vigor skill. Camp actions: Rest, Sleep, Train, Talk (requires active companion), Seek Care, Lay Low, Camp Outside, Craft, Post Watches. Crafting at camp uses a Craft roll against the recipe difficulty — success produces the item, failure consumes materials. If you have companions, posting watches converts potential ambushes into warned encounters where you act first. Camp is also where companion-specific events trigger.' },
```

Note: Also removes "Spirit roll" for crafting (fix aligns with Track 5 Fix CR1 which corrects craft to use craft skill, not spirit).

---

## Fix TU4 — 'Attention' clock name mismatch (MEDIUM)

**File:** `ledger-of-ash.html`

**Location 1 — HOWTO_SECTIONS "World Clocks" at line 18492:**

BEFORE:
```
{ heading: 'World Clocks', body: '<ul><li><strong>Attention</strong> — accumulates from your actions. As it rises, encounters become harder and authority takes notice.</li><li><strong>Watchfulness</strong> — marks how visible your movements have become. High watchfulness raises DCs and draws scrutiny.</li><li><strong>Rivals</strong> — advance independently each choice. High rival renown imposes DC penalties on contested ground.</li></ul>' },
```

AFTER:
```
{ heading: 'World Clocks', body: '<ul><li><strong>Watchfulness</strong> — accumulates from your actions. As it rises, encounters become harder and authority takes notice.</li><li><strong>Omens</strong> — marks escalating supernatural tension. High omens affect spirit-based rolls and may unlock hidden paths.</li><li><strong>Rivals</strong> — advance independently each choice. High rival renown imposes DC penalties on contested ground.</li></ul>' },
```

**Location 2 — Tutorial callout `first_pressure` at line 17302:**

BEFORE:
```js
first_pressure: '<strong>Attention is building.</strong> As it rises, encounters become harder and authority takes notice of your work.',
```

AFTER:
```js
first_pressure: '<strong>Watchfulness is building.</strong> As it rises, encounters become harder and authority takes notice of your work.',
```

---

## Fix TU5 — first_npc tutorial uses old key 'Lore' (MEDIUM)

**File:** `ledger-of-ash.html`
**Line:** 17297

BEFORE:
```js
first_npc: '<strong>NPCs:</strong> Local contacts are gated by your Lore skill. Higher Lore reveals more contacts. Approach them to open conversation. Trust increases with repeated contact.',
```

AFTER:
```js
first_npc: '<strong>NPCs:</strong> Local contacts are gated by your Wits skill. Higher Wits reveals more contacts. Approach them to open conversation. Trust increases with repeated contact.',
```

---

## Fix TU6 — Wire orphaned tutorial callouts (MEDIUM)

**File:** `ledger-of-ash.html`

`first_combat` and `first_levelup` are defined (lines 17294, 17299) but no engine function calls `maybeShowTutorial` for them.

**Step 1:** Locate `enterCombat()` in `ledger-of-ash.html`. Search for `function enterCombat`. Add the following line at the top of the function body (after any `if (!CS)` null guard, before the first narration call):

```js
if (typeof maybeShowTutorial === 'function') maybeShowTutorial('first_combat');
```

**Step 2:** Locate `checkLevelUp()` in `ledger-of-ash.html`. Search for `function checkLevelUp`. Add the following line at the point where a level-up is confirmed (after the `G.level++` increment):

```js
if (typeof maybeShowTutorial === 'function') maybeShowTutorial('first_levelup');
```

Before adding, grep for existing `maybeShowTutorial` calls in `enterCombat` and `checkLevelUp` to confirm they are absent — do not add duplicates.

---

## Fix TU7 — HOWTO_SECTIONS deduplication (LOW)

**File:** `ledger-of-ash.html`
**Lines:** 18490–18513 (the full HOWTO_SECTIONS array)

Five topic pairs are duplicated. Remove the weaker entry of each pair as follows:

| Topic | Remove (line) | Keep (line) |
|---|---|---|
| Travel | 18495 (sparse version) | 18508 (has Vigor/Spirit/pack references) |
| Companions | 18501 (generic) | 18510 (will be updated by TU2) |
| Alignment | 18500 (sparse) | 18512 (has ±10 threshold detail) |
| Camp | 18498 ("Camp & Recovery") | 18509 ("Camp & Rest" — updated by TU3) |
| Roll System | 18505 (duplicate of Risk Tiers) | 18491 ("Risk Tiers" — keep, merge DC stage note) |

After removing the 5 duplicate entries, add the following sentence to the surviving "Risk Tiers" entry (line 18491), appending it to the body text:

```
 DCs rise by +1 per stage advanced.
```

**Implementation order:** Apply TU2 and TU3 first (they modify entries at 18509 and 18510), then remove the 5 duplicate lines. This avoids confusion about which version to delete.

---

## Verify Steps

1. Open game → click "?" or "How To Play." Scroll through all sections. Each of the following topics must appear **exactly once**: Travel, Companions, Alignment, Camp, Roll System.
2. "Stage Progress" section must say "15 or higher to face the stage boss."
3. HUD case-file bar (if visible): hover or inspect — denominator must be 15, not 10.
4. "World Clocks" section must list "Watchfulness" not "Attention" as the primary clock.
5. "Companions" section must mention Vorath, Mira, and Kaevrin with correct ability descriptions.
6. "Camp & Rest" section must NOT mention "Review Notes." Must list the 9 camp actions.
7. Create a new character. Enter combat on first available combat choice. First-combat tutorial callout must appear in the story area (once, non-repeating).
8. Level up. First-levelup tutorial callout must appear.
9. Encounter an NPC (click any NPC-gated choice in Shelkopolis). Tutorial callout must say "Wits skill" not "Lore skill."

---

## Git Commit Message Template

```
fix(tutorial): correct HOWTO_SECTIONS — boss threshold 8→15, dedup 5 topic pairs, remove Review Notes, fix Attention→Watchfulness, wire first_combat + first_levelup triggers

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
