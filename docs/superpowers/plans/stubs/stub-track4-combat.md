# Track 4 — Combat Skill Normalization
## Agent Brief: Fix C1 + Fix C2 (C3 is HUD-policy gated — see below)

**Source file:** `C:\Users\CEO\ledger-of-ash\ledger-of-ash.html`
**Functions in scope:** `resolveCombatAction`, `renderCombatRound`
**No-touch list:** `rollD20` (already correct — has its own `_KEY_NORM`), `_KEY_NORM` global (do not change), `enterCombat`, `ARCHETYPE_COMBAT_ABILITIES` data, `ENEMY_TEMPLATES`, `endCombat`, equipment system, HUD layout

---

## Context

This is a self-contained repair brief. Read only this file and the source file listed above.

**Architecture note:** `ledger-of-ash.html` is a ~16K line single-file game. ES5 only. `G` is module-scope (never `window.G`). `CS` is the combat state object. The global `_KEY_NORM` in `rollD20` already normalizes old→new skill keys — but `resolveCombatAction` reads `G.skills[ab.skillReq]` directly, bypassing that normalization.

**Bug C1 (HIGH):** `ARCHETYPE_COMBAT_ABILITIES` entries use old internal skill keys (`'combat'`, `'lore'`, `'stealth'`). `resolveCombatAction` reads `G.skills[ab.skillReq]` raw. `G.skills['combat']` is `undefined` because `G.skills` uses display-name keys (`might`, `finesse`, `vigor`, `wits`, `charm`, `spirit`). Every combat ability rolls at 0 bonus regardless of player investment.

**Bug C2 (LOW):** `renderCombatRound` renders `a.skillReq` directly in the button label. Shows "combat" instead of "Might."

**Fix C3 — DO NOT IMPLEMENT:** Adding player HP to the combat panel modifies HUD layout. This requires user approval before implementation. See the CHECK WITH USER section at the bottom of this file.

---

## Step 0 — Read before editing

Read approximately lines 4750–4900 in `ledger-of-ash.html` to locate `resolveCombatAction`. Specifically find:
1. The `'ability'` action branch (where `ab.skillReq` is read)
2. The exact line(s) that read `G.skills[ab.skillReq]`

Read approximately lines 4520–4580 to locate `renderCombatRound`. Find:
1. Where `a.skillReq` is rendered into the button HTML
2. The exact string concatenation or template that outputs the skill label

Implement against what you find — line numbers in the plan are approximate.

---

## Fix C1 — Normalize skill key before reading G.skills in resolveCombatAction

### Location
`resolveCombatAction`, approximately **line 4806–4830**, inside the `case 'ability':` branch (or equivalent ability-action block).

### Find the ability-skill read pattern
```js
// Looks something like one of these:
var _rollBonus = G.skills[ab.skillReq] || 0;
// or:
var _skillVal = G.skills[ab.skillReq];
// or the read may be inline:
rollD20(ab.skillReq, G.skills[ab.skillReq] || 0);
```

### Add normalization immediately before this read

```js
var _CAB_KEY_NORM_ACT = {
  combat: 'might',
  stealth: 'finesse',
  survival: 'vigor',
  lore: 'wits',
  persuasion: 'charm'
};
var _abSkillKey = _CAB_KEY_NORM_ACT[ab.skillReq] || ab.skillReq;
var _abSkillVal = G.skills[_abSkillKey] || 0;
```

Then replace every use of `G.skills[ab.skillReq]` in this ability action branch with `_abSkillVal`. Also replace any `rollD20(ab.skillReq, ...)` calls in this branch with `rollD20(_abSkillKey, ...)` so the roll itself normalizes too.

### Scope boundary

Apply this normalization only inside the ability action branch of `resolveCombatAction`. Do not modify `rollD20`, `_KEY_NORM`, or any other roll function. Do not change `ARCHETYPE_COMBAT_ABILITIES` data.

---

## Fix C2 — Display normalized skill name in combat ability button

### Location
`renderCombatRound`, approximately **line 4550**, in the section that builds combat ability button HTML.

### Find the skill label render
```js
// Looks something like:
'<span class="skill-label">' + a.skillReq + '</span>'
// or inline in a button string:
'(' + a.skillReq + ')'
```

### Add display normalization before the HTML build

```js
var _CAB_DISPLAY = {
  combat: 'Might',
  stealth: 'Finesse',
  survival: 'Vigor',
  lore: 'Wits',
  persuasion: 'Charm'
};
var _displaySkill = _CAB_DISPLAY[a.skillReq] || a.skillReq;
```

Then replace `a.skillReq` in the button label string with `_displaySkill`. Do not change the actual ability data — only the rendered label.

---

## CHECK WITH USER — Fix C3 (DO NOT IMPLEMENT WITHOUT APPROVAL)

**What:** Add player HP to the combat round panel so players can see their HP without checking the sidebar.

**Why it is gated:** The HUD Change Policy (from the master plan) requires user confirmation before modifying the combat panel layout.

**The proposed change (DO NOT implement yet):**
```js
// In renderCombatRound(), in the combat panel HTML:
'<div class="combat-player-hp" style="font-size:11px;opacity:0.8;">Your HP: ' + G.hp + ' / ' + G.maxHp + '</div>'
```

**Action required:** After C1 and C2 are complete, ask the user: "Fix C3 would add a 'Your HP: X/Y' line to the combat panel. This changes the combat panel layout. Do you want this added?" Implement only if user confirms.

---

## Verification Steps (browser-checkable)

Open `ledger-of-ash.html` via `play.bat`.

**Test C1 — Ability roll uses correct skill:**
1. Create a warrior/fighter-type archetype (one with combat abilities in their tree).
2. Invest points in Might (either via level-up training or by choosing Might in level-up).
3. Enter combat with any enemy.
4. Open the Companions or Abilities sub-menu in combat, find a combat ability, activate it.
5. **Console check immediately after activation:** `G._lastRollInfo.total` must reflect the Might value. If Might is 3 and base roll is 12, total should be ~15, not 12.
6. **Also verify:** `G._lastRollInfo` shows the correct skill key (`'might'` not `'combat'`).

**Test C2 — Ability button label shows display name:**
1. Enter combat (same character as above).
2. Look at the combat ability button.
3. **Expected:** Button reads "Might" (or "Wits," "Finesse," depending on the ability's `skillReq` value after normalization), not the old key "combat" or "lore."

---

## Git Commit Message Template

```
fix(combat): normalize old skill keys in resolveCombatAction + renderCombatRound

Fix C1: resolveCombatAction read G.skills[ab.skillReq] with old internal
keys (combat/stealth/lore). G.skills uses display-name keys — every combat
ability rolled at 0 bonus. Added _CAB_KEY_NORM_ACT normalization inline.

Fix C2: renderCombatRound rendered a.skillReq raw in button label, showing
"combat" instead of "Might". Added _CAB_DISPLAY map for label normalization.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```
