# Ledger of Ash — Content Authoring Guide

> Reference for writers adding choices, NPCs, and journal entries. Assumes familiarity with JavaScript objects. For engine internals, see `docs/ENGINE.md`.

---

## 1. Quick Start

### Create a new content file

1. Create `content/mylocality_stage1_enriched_choices.js`
2. Declare a global array:

```js
var MYLOCALITY_STAGE1_ENRICHED_CHOICES = [
  {
    label: "The harbor clerk checks ledgers everyone else ignores.",
    tags: ['NPC', 'Evidence', 'Intelligence'],
    skill: 'wits',
    xpReward: 70,
    plot: 'main',
    failResult: function() {
      addNarration('', 'The clerk is occupied. Come back when the tide shift changes her queue.', 'failure');
    },
    fn: function() {
      G.stageProgress[1]++;
      gainXp(70);
      addNarration('', 'She confirms the manifest discrepancy without naming it.', 'success');
      addJournal('Harbor clerk confirmed manifest gap — western route.', 'evidence', 'harbor-clerk-west');
      maybeStageAdvance();
    }
  }
];
```

3. Register it in `ledger-of-ash.html` near lines 18220–18322:

```html
<script src="content/mylocality_stage1_enriched_choices.js"></script>
```

**There is no auto-loading.** A missing script tag means the file silently does not exist at runtime.

4. Wire the array into the locality's choice pool inside `loadStageChoices` in the HTML (search for the locality's key and the existing choice pool builder for that stage).

5. Run validators before committing:

```bash
node tests/content/validate-content.js
node tests/content/validate-flags.js
node tests/content/validate-structure.js
```

---

## 2. Enriched Choice Schema

Every field in detail:

```js
{
  // REQUIRED
  label: 'The innkeeper notices things she does not write down.',

  // REQUIRED for safe-tier choices; strongly recommended for risky
  failResult: function() { /* fires when roll < DC */ },

  // REQUIRED on choices that advance stage progress
  fn: function() { /* fires when roll >= DC */ },

  // TIER CLASSIFICATION — pick one approach
  tag: 'safe',               // explicit scalar: 'safe' | 'risky' | 'bold'
  tags: ['NPC', 'Evidence'], // semantic array — checked against SEMANTIC_SAFE/BOLD_TAGS

  // ROLL CONFIG
  skill: 'wits',             // which G.skills key to roll
  roll: { dc: 13 },          // override base DC (alt: use dc: 13 directly)
  dc: 13,                    // shorthand DC override

  // REWARDS
  xpReward: 70,              // XP on success (added via gainXp inside fn())
                             // Note: xpReward is informational — call gainXp() yourself

  // NARRATIVE FLAGS
  plot: 'main',              // blue border; required on stage-advancement choices
  id: 'shelk_innkeeper_01',  // stable ID for recency tracking and deduplication

  // EFFECTS
  align: { type: 'morality', n: 1 },  // alignment effect on resolution
  // type: 'morality' affects G.benevolence; type: 'order' affects G.orderAxis
  // n: positive = more benevolent/lawful; negative = darker/chaotic

  // COMBAT ROUTING
  cid: '__combat__patrol_guard',  // routes to enterCombat('patrol_guard', {})

  // CONDITIONAL DISPLAY
  condition: function() { return G.stageProgress[1] < 10; },
  // If condition() returns false, choice is filtered from the rendered set

  // QUEST LINK
  questId: 'q_s1_pattern',  // links choice to quest hint (informational only)
}
```

### Key behaviors

- `fn()` and `failResult()` are both wrapped in `try/catch` inside `adaptEnrichedChoice`. Errors are swallowed and only appear in `console.error('[enriched]', e)`. A TypeError from a missing G property silently kills the entire choice.
- `xpReward` is not automatically applied — call `gainXp(amount)` inside `fn()` yourself.
- `align` effects are applied by `adaptEnrichedChoice` automatically if present on the choice object.
- `condition` is evaluated at render time, not at click time.

---

## 3. Choice Label Rules

Labels are the **player's inner voice** — a thought, not a description of an action.

### Rules

- Maximum 15 words
- No question marks
- No infinitive verbs: do not start with `To `, `Ask `, `Check `, `Find `, `Look `, `Search `, `Question `
- No NPC-directed verbs: `Tell`, `Show`, `Confront`, `Approach` fail this rule
- The label carries moral register — the reader should feel the choice before they click it

### Good vs bad examples

| Wrong | Right |
|---|---|
| "Ask the innkeeper about recent guests." | "The innkeeper notices things she doesn't write down." |
| "To investigate the routing discrepancy further." | "The numbers don't match. Someone made them not match." |
| "Consult the night archivist about the missing manifest entries." | "The archivist works nights for a reason." |
| "Question the road warden about checkpoint irregularities." | "The warden stamped that manifest without looking at it." |
| "Check the harbor ledgers for anomalies." | "Three ships, same route, no cargo declaration." |

### The inner-voice test

Read the label aloud as if it is your own thought while walking through the city. If it sounds like you narrating what you are about to do, rewrite it. If it sounds like something you noticed or a conclusion you are turning over — it is correct.

---

## 4. Result Text Standards

- **Target**: 60–90 words
- **Maximum**: 120 words (content validator fails non-high-stakes text above this)
- **Register**: Scene, not summary. Show what the player observes. Do not explain what it means.
- **No scrolling**: Result text should fit in one screen block without scrolling.

### Scene not summary

```
// Wrong — summary
addNarration('', 'You learn that the manifests have been altered. This is meaningful evidence.', 'success');

// Right — scene
addNarration('', 'The clerk pulls a second ledger from under the counter — the one she doesn\'t show surveyors. The column for western departures runs three days short of the column for arrivals. She draws a finger down the gap without speaking. The number it passes over is forty-two. She closes the book before you can ask what forty-two represents.', 'success');
```

### Forbidden words (player-facing text)

Never use these in result text, choice labels, NPC dialogue, or UI copy:

| Forbidden | Use instead |
|---|---|
| `investigation` / `investigate` | Specific action: `trace`, `read the ledger`, `follow the manifest` |
| `meaningful` | Cut entirely. Show the meaning through concrete detail |
| `contact` (as person noun) | `source`, `connection`, `the clerk`, their name |
| `official` (vague adjective) | Name the role: `road warden`, `guild surveyor`, `registry clerk` |
| `you feel` | Show observable behavior: posture, gesture, tone, what they do next |
| `you realize` | Show the evidence that forced the conclusion |
| `you sense` | Show the specific sensory detail |
| Editorial framing: `"in a way that suggests"`, `"the city knows it"` | Cut. Let the scene carry the implication |

---

## 5. Journal Entries

### Critical: arg order

`addJournal(text, category, dedupeKey)` — **text first, category second**. Reversing silently logs nothing.

```js
// Correct
addJournal('Gate manifest altered — three names removed.', 'evidence', 'gate-manifest-names');

// Wrong — category goes in as text, entry is lost
addJournal('evidence', 'Gate manifest altered...');
```

### Category reference

| Category | When |
|---|---|
| `'evidence'` | Hard facts: documents, physical objects, confirmed records |
| `'intelligence'` | Soft info from sources: NPC tips, overheard conversations |
| `'rumor'` | Unverified, gossip-level, source-attributed |
| `'discovery'` | Player found something through direct observation |
| `'contact_made'` | A meaningful NPC relationship was established |
| `'complication'` | Something went wrong; a threat emerged |
| `'field_note'` | Mechanical log entry (combat, travel, HP loss) |

Do not use: `'investigation'`, `'fact'`, `'faction'`, `'quest'`, `'rival'`, `'companion'` — those are DOM section IDs, not valid `addJournal` categories.

### Deduplication

The third argument is a deduplication key. If you call `addJournal` with the same `dedupeKey` twice, the second call updates the existing entry rather than creating a duplicate.

Use a stable, unique key per logical journal item:

```js
addJournal('Pressure level: ' + G.worldClocks.pressure, 'field_note', 'pressure-tracker');
// Calling again with the same key updates the entry in place
```

Without a key, the default dedupeKey is `text.slice(0, 40)` — effective only if you write identical text twice.

---

## 6. DC Reference

### Base DCs by tier

| Tier | Base DC | Stage II | Stage III |
|---|---|---|---|
| `safe` | 7 | 8 | 9 |
| `risky` | 13 | 14 | 15 |
| `bold` | 16 | 17 | 18 |

Level bonus: `floor((level - 1) / 2)` is added on top of the stage bonus.

### Tier selection guidance

- **Safe** — The player is gathering information carefully, avoiding direct confrontation, or retreating. Failure redirects rather than stops. `failResult` required.
- **Risky** — The default. Any direct inquiry, social pressure, or moderately exposed action.
- **Bold** — Confrontation, combat entry, accusation, deliberate exposure. High stakes, high DC.

### Setting explicit DCs

Override the base DC with `dc:` on the choice object:

```js
{ dc: 11, skill: 'charm', tag: 'risky' }
// Uses DC 11 instead of tier-derived 13
```

For boss-class choices, pass `tags: ['Boss']` rather than setting a custom DC — the semantic tier resolution handles it.

---

## 7. Skill Keys

Use display-name keys in all new content. Legacy keys are accepted via normalization for backward compatibility but should not appear in new files.

| Display key (use this) | Legacy key (do not use) | Stat |
|---|---|---|
| `might` | `combat` | Physical force, melee, lifting |
| `vigor` | `survival` | Endurance, disease resistance, travel |
| `wits` | `lore` | Knowledge, investigation, records |
| `charm` | `persuasion` | Persuasion, social maneuvering |
| `finesse` | `stealth` | Stealth, precision, lockpicking |
| `spirit` | — | Magic, willpower, ritual |
| `craft` | — | Crafting DCs only — not levelable |

### In choice objects

```js
{ skill: 'wits', dc: 13 }
// rolls rollD20('wits', bonus) — reads G.skills.wits
```

### Rolling manually inside fn()

```js
var result = rollD20('charm', G.skills.charm || 0);
if (result.isCrit) { /* ... */ }
else if (result.isFumble) { /* ... */ }
else if (result.total >= 13) { /* success path */ }
else { /* failure path */ }
```

---

## 8. Heat and Alignment

### Heat

Use heat to show institutional pressure accumulating from the player's actions. Typical increments: 1 for minor exposure, 2 for confrontational acts, 3 for serious institutional violations.

```js
// Inside fn():
addHeat('shelk', 1);  // e.g., player asked pointed questions to an authority figure

// Trigger an authority encounter immediately:
enterAuthorityConfrontation('road_wardens', {
  polity: 'shelk',
  heatLevel: getHeat('shelk'),
  offense: 'accessing restricted transit records',
  locality: G.location
});
```

Never call `enterCombat()` directly for authority figures — always use `enterAuthorityConfrontation()` to maintain the warrant/threshold chain.

### Writing heat-building choices

Heat choices should not feel punitive. Frame them as natural institutional friction:
- The warden noticed your questions
- The registry clerk flagged your name
- The guild surveyor logged the inquiry

The player should understand they are accumulating heat through their own choices, not through arbitrary triggers.

### Alignment

`align` on a choice object applies automatically on resolution:

```js
{
  align: { type: 'morality', n: 2 },   // pushes benevolence +2 on success
}
// type: 'morality' → G.benevolence
// type: 'order'    → G.orderAxis
// n: positive = benevolent/lawful; negative = malevolent/chaotic
```

Alignment badges only render on the character sheet when `|value| >= 10`. They never appear on choice buttons — preserve discovery tension.

Writing guidance: do not announce moral weight in the label or result text. The align value is the mechanic. The prose shows the action.

---

## 9. NPC Model

Every named NPC needs three things before any dialogue is written:

**1. Agenda** — something they want independent of the player.
Not: "she wants to help the player." Yes: "she wants the ledger audit to close before the polity surveyor arrives next week."

**2. Register** — speech shaped by locality of origin, class, and local magic law. A Soreheim transit clerk speaks differently from a Panim funerary house administrator.

**3. Tell** — one physical or behavioral habit specific enough that no other NPC would do it.
Not: "she folds her hands." Yes: "her thumb finds the chalk edge of the ward mark in the doorframe without her seeming to notice it."

### Showing vs announcing

Named NPCs react to player archetype — shown, not announced:
- A Scoundrel archetype: the NPC prices trust higher, watches pockets
- A Scholar archetype: the NPC speaks in longer sentences, expects to be questioned
- A Soldier archetype: the NPC does not waste time, addresses them by function

Do not write "she recognizes you as an adventurer." Write the behavior difference directly.

### Subtext rule

NPCs rarely say exactly what they mean. One unsaid layer per scene. The reader should be able to identify what the NPC withheld and why.

### Locality-specific constraints

- **Nomdara**: Transit-only locality. Zero canon NPCs. No authored encounters.
- **Sheresh**: Stage 1 content only. Zero canon NPCs — author from scratch, canon-consistent.
- Stage 1 named antagonists and Tier 1 polity authorities react to archetype. Background NPCs do not.

---

## 10. Forbidden Words

Full reference for player-facing text (choice labels, result text, NPC dialogue, background copy, UI labels):

| Word/phrase | Why | Replacement |
|---|---|---|
| `investigation` / `investigate` | Narrative crutch; generic. | Specific action: `follow the manifest`, `trace the authorization`, `read the route ledger` |
| `meaningful` | Empty intensifier. | Cut. Show the meaning concretely. |
| `contact` (person noun) | Corporate jargon. | `source`, `intermediary`, the person's name or role |
| `official` (vague adj) | Vague institutional gesture. | Name the role: `guild surveyor`, `registry clerk`, `patrol lieutenant` |
| `you feel` | Internal monologue. | Show behavior: what the player sees or hears that produces the feeling |
| `you realize` | Tells rather than shows. | Show the evidence that forced the conclusion |
| `you sense` | Tells rather than shows. | Name the specific sensory detail |
| `in a way that suggests` | Editorial framing. | Cut. Let the scene imply it. |
| `the city knows it` | Over-omniscient narrator. | Show who specifically knows and how it looks |
| `precisely as X as Y` | Forced comparison. | Concrete description without the template |

**Scope:** All player-facing strings including UI chrome labels and toast messages. Code variables and comments are exempt.

---

## 11. Debugging Silent Failures

### The error is always swallowed

`adaptEnrichedChoice` wraps every `fn()` and `failResult()` in `try/catch`. The player sees "Something went wrong. Continuing..." — the error is in `console.error('[enriched]', e)`.

**Workflow when a choice silently does nothing:**

1. Open browser DevTools → Console tab
2. Click the choice
3. Look for `[enriched]` error lines
4. The error message names the line in your content file

### Most common causes

**Missing G property:** Reading `G.worldClocks.pressure` when `G.worldClocks` is undefined crashes silently. Initialize all G properties in the defaults object in `ledger-of-ash.html` before reading them in content.

```js
// Wrong — crashes if G.worldClocks is undefined
G.worldClocks.pressure++;

// Right — defensive read
if (G.worldClocks) G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
```

**`G.flags` null guard:** `G.flags` can be null at early init. Always use the full guard:

```js
// Crashes when G.flags is null
if (!G.flags.met_innkeeper) { ... }

// Safe
if (G && G.flags && !G.flags.met_innkeeper) { ... }
```

**Wrong function name:** `gainXP` (capital P) does not exist. Use `gainXp`. Calling a nonexistent function is a silent TypeError.

**Wrong `addJournal` arg order:** `addJournal('evidence', text)` silently fails. Text is arg 1.

**Content file not loaded:** If none of the choices from your file appear, the `<script src>` tag in `ledger-of-ash.html` is missing or has a typo in the path. Search for the exact filename in the HTML to confirm it is registered.

**Function name collision:** The engine is 18,000 lines in a single scope. If you define a function with the same name as an existing engine function, the new one silently shadows it. `grep` the HTML for any function name before using it.

---

## 12. Common Bugs Checklist

Run through this before submitting any content PR.

### `addJournal` arg order

- [ ] Every `addJournal` call: text is arg 1, category is arg 2
- [ ] Every category string is in the valid list (evidence / intelligence / rumor / discovery / contact_made / complication / field_note)

### `plot: 'main'` on advancement choices

- [ ] Every choice that calls `G.stageProgress[N]++` has `plot: 'main'`
- [ ] Stage advancement choices appear with a blue left border in the game — verify visually

### `loadStageChoices` death guard

- [ ] The function containing your `loadStageChoices` call has `if (G.dead) { confirmDeath(); return; }` at the top. Enriched choices can set `G.dead` via `modHP` without triggering the death screen; this guard catches it.

### `G.flags` null guard

- [ ] Every read of a `G.flags` property uses `G && G.flags && G.flags.someFlag`, not `G.flags.someFlag` or `!G.flags.someFlag`

### `gainXp` capitalization

- [ ] `gainXp(amount)` — lowercase `p`. Not `gainXP`.

### Missing G defaults

- [ ] Any new G property read in your content file is initialized in the `let G = { ... }` defaults block in `ledger-of-ash.html`. If it isn't, it silently throws in `adaptEnrichedChoice`.

### Forbidden words

- [ ] No `investigation`, `meaningful`, `you feel`, `you realize`, `you sense`, `official`, `contact` (as person noun) in any player-facing string

### `maybeStageAdvance()` at end of `fn()`

- [ ] Every `fn()` that increments `G.stageProgress` calls `maybeStageAdvance()` as its last statement. Omitting it means progress increments but the HUD and stage check do not fire until the next arrival.

### Script tag registered

- [ ] `<script src="content/yourfile.js"></script>` exists in `ledger-of-ash.html` near lines 18220–18322
- [ ] Path uses `content/` prefix and matches the filename exactly (case-sensitive on some systems)

### Result text length

- [ ] Run `node tests/content/validate-content.js` — validator flags text over 120 words
- [ ] Aim for 60–90 words per result block
