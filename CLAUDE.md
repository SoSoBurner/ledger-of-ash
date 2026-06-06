# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Ledger of Ash — Project Context

## Quick Reference

| Need | Go to |
|------|-------|
| Commands (test, build, run) | [Commands](#0-commands) |
| File paths, branches, play command | [Dev Setup](#1-dev-setup) |
| Stage gates, G object, XP, combat | [Engine Rules](#2-engine-rules) |
| Key function signatures | [Engine Functions](#key-engine-functions) |
| Session startup, skills, plugins | [Process](#3-process) |
| Writing style, canon, choice labels | `content/CLAUDE.md` |
| Playwright, validators, playtest | `tests/CLAUDE.md` |
| World graph, NPC profiles, locality packets | `data/reference/V33_2_extracted/` |

---

# 0. Commands

## Play

```
play.bat          # opens ledger-of-ash.html in Chrome app mode (file:// protocol)
```

## Tests

```
npm test                  # Jest unit tests: tests/logic/**/*.test.js + tests/content/**/*.test.js
npm run test:content      # 3-step content validation: choice standards, flag rules, HTML wiring
npm run test:e2e          # Playwright specs in tests/e2e/*.spec.js (auto-launches http-server on :8080)
npm run test:continuity   # Plot continuity: NPC sequence, canon fence, world clock transparency
npm run test:all          # All four suites sequentially
npm run review:content    # Advisory tone/balance audit — warnings only, no enforced failures
```

Run a single Jest test file:
```
npx jest tests/logic/combat.test.js
```

No lint or format scripts are wired. `.prettierrc` exists (120 char width, 2-space, single quotes) but must be run manually.

## Test Harness

`tests/setup.js` extracts all inline `<script>` blocks from `ledger-of-ash.html`, patches scoping for Node, and runs in a VM sandbox with a fake DOM/localStorage. Tests import it via:

```js
const { createGameContext } = require('../setup');
const { G, addJournal, checkLevelUp, narrations } = createGameContext({ level: 3 });
```

`createGameContext(gOverrides)` accepts partial G overrides and returns the live G object plus all exported engine functions and captured `narrations`/`toasts` arrays.

---

# 1. Dev Setup

## Dev Environment

- **Source file**: `C:\Users\CEO\ledger-of-ash\ledger-of-ash.html` — this is what `play.bat` opens. Never edit `dist/`.
- **Play**: Run `play.bat` to open in Chrome app mode (`file://` protocol).
- **Content scripts**: All JS files in `content/` must be referenced as `content/filename.js` in HTML script tags. There is no auto-loading — add `<script src="content/yourfile.js"></script>` in the appropriate block near lines 18220–18322 of `ledger-of-ash.html` or the file will silently be ignored.
- **Google Fonts**: Do NOT add Google Fonts `<link>` tags — they fail over `file://`. Use `var(--font-body)` or `var(--font-display)` CSS variables directly.
- **Debug**: Use `console.log` / `console.error` only. Never `alert()` — it appears as an error dialog to the user.
- **Font changes**: Always grep the TARGET element's class directly before editing. ID-selector font rules beat parent class rules. Fix the direct rule, not the parent.

## Branch Workflow

- **Default branch: `main`** — all development happens on `main` unless explicitly told otherwise.
- **Feature branches**: allowed for large or risky work when explicitly requested by the user.
- **`ledger-of-ash-itch` branch**: reserved exclusively for itch.io release builds. Only touch it when the user explicitly says "update the itch.io release" or equivalent. Never commit game development work there.
- At session start, assume you are working on `main`. Confirm with `git branch` if uncertain.

## File Structure

- `ledger-of-ash.html` — single-file game engine: all CSS, core JS, game data, and HTML
- `content/` — stage files, encounter scripts, narrations, NPC data (loaded via `<script>` tags in HTML)
- `content/locality_narrations.js` — locality opening narration strings
- `content/locality_voice_guide.js` — locality style reference (not dialogue trees)
- `content/maren_oss_encounter.js` — Maren Oss encounter logic
- `content/travel_corridors.js` — travel encounter system
- `data/narrative_lookup.js` — prose snippets keyed to localities (504 lines)
- `data/bestiary_lookup.js` — creature stats and encounter groups (602 lines)
- `css/style.css` — external stylesheet (not used by play.bat; source HTML has inline `<style>`)
- `dist/` — bundled build output; NOT what play.bat serves
- `play.bat` — opens root source HTML in Chrome app mode
- `js/` — **NOT loaded by the game.** `js/consequences.js` and other files here are dead copies. All choice/consequence data is inline in `ledger-of-ash.html`. Edits to `js/` have no effect.
- `js/travel.js` — **DEAD FILE (635 lines).** Looks authoritative but is never loaded. All travel implementation goes in `ledger-of-ash.html` + `content/travel_corridors.js`.

## Travel Data Sources

- Node graph: `data/reference/07_WORLD_GRAPH/locality_travel_network.json` — edges with travel times
- Per-route complications: `data/reference/V33_2_extracted/V33_2_DnD_Repository/12_TABLE_KITS/travel_complications/` — one `.md` per route with authored complication flavor

## Reference Library (V33_2 — Do Not Edit)

All paths under `data/reference/V33_2_extracted/V33_2_DnD_Repository/`:
- `03_LOCALITY_ENGINE/locality_packets/` — 53 JSON locality files
- `03_LOCALITY_ENGINE/text_rpg_packets/` — 14 MD narrative flavor bundles (10 Stage 1 localities missing)
- `12_TABLE_KITS/arrival_kits/` — 53 MD first-arrival scene seeds
- `11_REFERENCE_VIEWS/locality_quickstart_cards/` — 53 MD quick-reference cards (Districts, Nomdara, Plumes End Outpost, Sheresh missing)
- `02_CANON_BASELINE/named_npcs/` — 723 NPC JSON profiles
- `02_CANON_BASELINE/interface_role_instances/` — NPC role instances by polity

---

# 2. Engine Rules

## Stage Content Status

- **V1.0 Release scope: Stages 1 and 2** — Stage 3 is NOT part of this release.
- **Stage 1**: Functionally complete. 22 localities. Additive content (new archetype variants, new choices, new sideplot hooks) is always safe. Retheme/rewrite of existing result text is allowed when the net text volume stays equal or grows. Never remove choices or cut result text.
- **Stage 2**: Completable end-to-end. Content needs expansion to EXCEED Stage 1 total content volume.

## World Expansion Rule

Every content plan must expand the targeted stage — more localities, choices, result text, NPC encounters. Never reduce a completed stage. Additive fixes (label rewording, hook additions) don't count as expansion.
- Stage 1→2 bridges: `*_to_shelk_arc.js` files in `content/` (inject when progress ≥ 5 OR level ≥ 6)
- Stage 2 specials: `stage2_enriched_choices.js` (pool), `stage2_antechamber.js` (sp2 ≥ 12), `stage2_climax.js`

## Stage Gate Logic

- Stage I→II: `stage1_narrative_complete` flag only — `checkStageAdvance()` line 12465. **`checkStageAdvance` must be called from `resolveArrival`** — at level cap, `checkLevelUp` never fires, so it's the only reliable call site.
- Full chain: `STAGE1_BOSS_MODULE.shouldTrigger()` → boss fires → `stage1_narrative_complete` set (`stage1_boss.js:191`) → next `resolveArrival` → `checkStageAdvance()` unlocks Stage II.
- `STAGE1_BOSS_MODULE` **must** export `shouldTrigger: checkStage1BossTriggered` — engine checks this property. `checkTrigger` is NOT what the engine calls. If absent, boss never fires and Stage II never unlocks.
- `STAGE2_BOSS_MODULE` exports `checkTrigger` (not `shouldTrigger`) — intentionally different from Stage 1. Silent-failure-hunter will flag this as a bug; it is a false positive.
- Stage II→III: `canAdvanceToStage3()` ~line 8786 — **V1.0 stub: hardcoded `return false`**.
- `G.stageProgress` is `{1:0, 2:0, 3:0, 4:0, 5:0}` — all 5 stages declared, 3–5 not yet authored.

## Stage 3+ Content Freeze

Do not author Stage 3+ choices, NPCs, localities, climaxes, or mechanics until Stages 1–2 are complete and play-tested. `canAdvanceToStage3()` is hardcoded `return false`. Stage 3 stub files (`stage3_enriched_choices.js`, `stage3_climax.js`) exist but contain no playable content.

## XP and Level System

- Level N→N+1: N×60 XP (Level 1→2 = 120). XP denominator in `updateHUD()` must be `G.level * 60` — not hardcoded 120.
- `STAGE_LEVEL_CAP = {'Stage I':5, 'Stage II':10, 'Stage III':15, 'Stage IV':18, 'Stage V':20}`. At cap: XP overflow → `G.masteryXP`.
- `gainXp`/`gainXP` both exist (~lines 11726, 12098). Prefer `gainXp`. `equipItem(idx)` uses `item.type`, not `item.slot`.

## Travel Mode

`G.travelMode` declared but not yet active. All travel code: `ledger-of-ash.html` + `content/travel_corridors.js` — NEVER `js/travel.js`.

## Archetypes

31 archetypes. `getArchetypeFamily(archetype)` returns family. Archetype-sensitive NPC reactions: Tier 1 polity NPCs and named antagonists only.

## Camp System

`campAction(type)` types: `'rest','sleep','train','talk','recover','lay_low','review_notes','campout','craft','post_watches'`. Only `post_watches`/`craft` fully wired. `doSleepScene()` handles rest/healing. Companions gate on `G.flags.maren_oss_resolved`.

## Combat Entry

- `enterCombat(enemyKey, ctx)` — narrative encounter (NPC intent, Press/Defend/Talk/Retreat). Use for story-driven fights.
- `startCombat(enemyKey, ctx)` — low-level entry. Only for non-narrative triggers.
- **`loadStageChoices` death guard**: Must check `if (G.dead) { confirmDeath(); return; }` at entry — `modHP` in enriched choices can set `G.dead` without triggering death screen.
- Boss encounters: pass `{isBoss: true}` to `enterCombat()` — applies `.encounter--boss` class.

## DC Reference & Roll Rules

Base DCs: safe=7, risky=13, bold=16. +1/stage. Every choice rolls. Safe choices auto-roll DC 7 if no `choice.roll`; must have `failResult` field — failure redirects, never dead-ends.

## Safe/Risky/Bold Classification

Pre-existing bug: Stage 1 choices use semantic tags that don't match `BOLD_TAGS`/`SAFE_TAGS` (tag lists at ~lines 10684-10685) — all default to 'risky'. Fix: add semantic mapping. Support explicit scalar `tag:'safe'`/`'risky'`/`'bold'` to bypass lookup. Do not change choice content to fix this — fix the classification logic.

## Alignment System

`G.benevolence` and `G.orderAxis` (−50 to +50). Effects: `{type:'morality', n}` / `{type:'order', n}`. Alignment badges render on character sheet only at threshold ±10 — **never on choice buttons** (preserves discovery tension).

## Quest System

`addQuest(msg)` / `G.questHints = {}` parallel map keyed by questId — **do not change G.quests structure** (breaks save compatibility). Wire: `{type:'quest', msg:'...', hint:'...', questId:'key'}`. Rival clock in journal page only — not in quest HUD.

## Heat System

`G.heat[polityKey]` (0–10). Helpers: `getHeat(polity)`, `addHeat(polity, amount)`. 11 polity keys: `shelk`, `roaz`, `shirsh`, `mimolot`, `panim`, `cosmouth`, `zootia`, `union`, `sheresh`, `soreheim`, `nomdara`. `enterAuthorityConfrontation(authorityKey, ctx)` for all authority encounters — never call `enterCombat()` directly for authority figures. Thresholds: 3=notice+optional, 5=mandatory+DC+1, 8=warrant.

## Skill Keys

`G.skills` uses display-name keys directly. Content and engine code both use these:

| G.skills key | Display name | Notes |
|---|---|---|
| `might` | Might | Physical force, combat |
| `vigor` | Vigor | Endurance, survival |
| `wits` | Wits | Knowledge, investigation |
| `charm` | Charm | Persuasion, social |
| `finesse` | Finesse | Stealth, precision |
| `spirit` | Spirit | Magic, willpower |
| `craft` | (internal) | Crafting DCs only — not in skill HUD, not levelable |

Old internal keys (combat/survival/lore/stealth/persuasion) are accepted by rollD20 via `_KEY_NORM` normalization for backward compatibility with old content files. New content must use display-name keys.

Some call sites pass old internal keys. All functions reading `G.skills[skill]` must normalize first:
```js
var _KEY_NORM = {combat:'might',stealth:'finesse',survival:'vigor',lore:'wits',persuasion:'charm'};
var _sk = _KEY_NORM[skill] || skill;
```
`rollD20`, `getTraitBonus`, `getEquipmentBonus` all fixed May 2026. Apply same pattern to any new roll helper.

**G.traits format note:** `bgTraitBonus` objects still use old internal keys (e.g. `{combat:1}`). `getTraitBonus` handles this via an internal `_KEY_OLD` reverse-lookup. Do not change bgTraitBonus key format — it would break backward compatibility with saves.

## G Object Rules

**G is module-scope:** `G` is declared `let G` at module scope — `window.G` is `undefined`. Never use `var G = window.G` as a local alias.

**G defaults:** Any property read from G in enriched choices or game logic must be initialized in the G defaults object. Missing keys cause silent TypeErrors swallowed by `adaptEnrichedChoice`'s try/catch — stage progress silently stops advancing.

**`G.flags` null guard:** Always write `if (G && G.flags && !G.flags.someFlag)` — `G.flags` itself can be null at early init. `if (G && !G.flags.x)` crashes.

**`G.worldClocks` object trap:** Any `G.worldClocks` key initialized to `{}` or an object (not 0) renders as `[object Object]` in the sidebar. All keys in the G defaults must be integers (0).

**G.traits dual format (critical):** Background traits: `{skillBonus:{combat:1}, passive:true, source:'background'}` — skillBonus object uses OLD internal keys. Archetype/item traits: `{skill:'combat', bonus:1, condition?}` — skill field may be old or new key. Any function reading `G.traits` must handle BOTH formats and normalize via `_KEY_NORM`. Never add a third format.

## Skill Display

Skills render in `updateHUD()` (~line 10862) AND `renderCharacterSheet()` (~line 10418). Change both or HUD/sheet diverge.

## Living Narration

`buildLivingDesc()` → `#env-panel .env-desc` (environment sidebar, NOT story area). Fallback chain: `LOCALITY_NARRATIONS[locId].split('. ')[0]` (first sentence, 18 of 22+ localities covered). Locations without entry show blank — silent, not an error.

## Stage II Companion Gate

`vorath_gelden`/`mira_calden` gate on `G.flags.maren_oss_resolved` (set in `_closeClimax()`, `content/stage2_climax.js`).

## BACKLOG Verification Rule

Do not mark a feature DONE based on code existence alone. A feature is DONE only when verified to produce correct player-facing output. Silent failures routinely pass code-existence checks.

## Save / Load System

Persistence is `localStorage` only. Key functions:

```js
saveGame(slotArg)          // serialize G to localStorage key ledger_save_<slot>
loadGame(slotArg, legacyCode)  // restore G from slot; legacyCode for pre-session saves
getSaveList()              // → [{key, name, level, archetype}]
getSaveListFull()          // → [{key, name, level, archetype, location, stage}]
```

`G.schemaVersion` (currently 3) gates migration logic in `loadGame`. Do not change G property names or restructure `G.quests` without bumping schema and writing a migration.

## Enriched Choice Object Schema

```js
{
  label: 'Inner-voice phrasing, ≤15 words, no question marks',
  fn: function() { /* executes on success */ },
  failResult: function() { /* executes on failure; required for safe-tier choices */ },
  tag: 'safe' | 'risky' | 'bold',   // explicit scalar overrides tag-array lookup
  tags: ['tag1', 'tag2'],            // semantic tags; checked against SEMANTIC_BOLD/SAFE_TAGS
  skill: 'might' | 'wits' | ...,    // which G.skills key to roll
  roll: { dc: 13 },                  // override base DC
  dc: 13,                            // alternate DC shorthand
  xpReward: 15,                      // number; added on success
  align: { type: 'morality', n: 1 }, // alignment effect
  plot: 'main',                      // blue border; required on stage-advancement choices
  cid: '__combat__enemyKey',         // routes to enterCombat via handleChoice
  id: 'unique_choice_id',
}
```

`adaptEnrichedChoice(c)` wraps `c.fn()` in try/catch — any missing G default or TypeError is **silently swallowed**. Always initialize G properties in the defaults object before reading them in content.

## Key Engine Functions

### Narrative output
```js
addNarration(label, html, resultType)
// label: string header ('' for none); html: trusted HTML body; resultType: 'success'|'failure'|'neutral'|'complication'

addJournal(text, category, dedupeKey)
// ⚠ arg order: text FIRST, category SECOND. Reversed args silently log nothing.
// Valid categories: 'evidence','intelligence','rumor','discovery','contact_made','complication','field_note'
// NOT valid: 'investigation','fact','faction','quest' (those are DOM section IDs)

addQuest(msg, hint, questId)
// Pushes to G.quests array and G.questHints[questId]. Never restructure G.quests (breaks saves).
```

### Choice pipeline
```js
renderChoices(choices)       // choices → DOM buttons with click handlers
handleChoice(choice)         // dispatch: combat CIDs → enterCombat, enriched → adaptEnrichedChoice
adaptEnrichedChoice(c)       // try/catch wrapper; rolls DC; calls c.fn() or c.failResult()
getChoiceTier(choice)        // returns 'safe'|'risky'|'bold' from tag or tags array
getChoiceDC(choice, rivalMod) // base + stage bonus + rival mod − pendingDcReduce
```

### Rolls
```js
rollD20(skill, bonus)
// Returns {roll, total, isCrit, isFumble}. Normalizes old skill keys via _KEY_NORM.
// Stores metadata in G._lastRollInfo. Applies rival penalty, sleepless, campout, travel fatigue.

getRivalDCMod(locId)  // → 0–3 DC penalty based on active rivals
```

### Arrival / stage flow
```js
resolveArrival(locId)
// Entry point on location change. Loads narration, renders choices, calls checkStageAdvance().
// Guard: if (G.dead) { confirmDeath(); return; }

loadStageChoices(locId)  // re-render choices for current stage; gates companions, injects travel
maybeStageAdvance()      // syncs G.investigationProgress → G.stageProgress[2], calls checkStageAdvance
```

### Content validators (run via npm run test:content)
- **Choice label**: ≤15 words, no `?`, no infinitive verbs (`To `/ `Ask `/ `Check ` etc.)
- **Result text**: 60–90 words (warn), ≤120 max (fail for non-high-stakes)
- **Forbidden words in result text**: `investigation`, `meaningful`, `you feel`, `you realize`, `you sense`, `official`, `contact` (as person noun)
- **Structure**: every `content/*.js` (except `REFERENCE_ONLY` whitelist) must have a `<script src>` tag in HTML; no `window.G` usage

---

# 3. Process

## Session Startup — MANDATORY, NO EXCEPTIONS

Run ALL of the following at the start of every session. Never skip any step, even if context seems warm from a prior session:

1. Run `/reload-plugins` first — skills from plugins (superpowers, game-design, etc.) are unavailable until this runs
2. Invoke skill: `superpowers:dispatching-parallel-agents`
3. Invoke skill: `superpowers:subagent-driven-development`
4. Run skill: `less-permission-prompts`
5. Confirm all agents, commands, built-in tools, hooks, skills, and widgets are loaded and ready for Ledger of Ash work

## Tool Usage — Always On, No Permission Needed

All of the following are permanently authorized. Use them proactively without asking:

- **Agents**: Dispatch subagents for any task that is large, isolated, or benefits from fresh context. Run independent tasks in parallel by default.
- **Skills**: Invoke the relevant skill BEFORE any response when there is even a 1% chance it applies.
- **Built-in tools** (Read, Edit, Write, Grep, Glob, Bash): Use freely at any time. Prefer dedicated tools over Bash for file operations.
- **Parallel dispatch**: When 2+ tasks are independent, dispatch them in parallel as the default — sequential is the exception.
- **Hooks**: Treat hook feedback as direct user instructions.
- **Widgets and commands**: Use whenever available and relevant without asking first.

## Plans Directory Warning

`C:\Users\CEO\.claude\plans\` has 28+ plan files that are NOT auto-loaded into sessions. Check `memory/ACTIVE_PLANS_INDEX.md` at session start. Do not re-derive decisions that are already recorded there.

## Skills and Plugins

- **Local skills**: `~/.claude/skills/` is separate from `~/.claude/plugins/cache/`. If a skill isn't found in plugins, check the local skills dir. Example: `humanizer` lives at `~/.claude/skills/humanizer/SKILL.md`.
- **Game design skills**: `claude-game-studiokit` plugin — `game-design:balance-review`, `game-design:mechanics-review`, `game-design:fun-review`, `game-design:feedback-loop-review`, `game-design:playtest-plan`, `game-design:playtesting-strategy`, `game-design:polish-review`, `game-design:economy-review`, `game-design:tutorial-review`, `game-design:appeal-engagement-review`, `game-design:randomness-review`
- **Reverse-engineering**: `fullstack-dev-skills:spec-miner` — extracts specs from undocumented code. Use when tracing unknown engine behavior in `ledger-of-ash.html`.
- **Agent teams**: `agent-teams:parallel-debugging` + `agent-teams:team-debugger` — hypothesis-driven parallel investigation (3+ root-cause candidates). `agent-teams:parallel-feature-development` + `agent-teams:team-implementer` + `agent-teams:team-lead` — file-ownership-bounded parallel content authoring.
- **Legacy analysis**: `code-modernization:legacy-analyst` — maps structure, dead code, and load graph of `ledger-of-ash.html` (16K lines). `code-modernization:business-rules-extractor` — extracts game mechanics as testable Given/When/Then specs.
- **JS expertise**: `fullstack-dev-skills:javascript-pro` — vanilla ES5 JS patterns. `developer-essentials:e2e-testing-patterns` — Playwright spec architecture (different from `playwright-expert` which debugs failing tests).
- **Maintenance**: `codebase-cleanup:refactor-clean` — remove dead files. `ralph-loop:ralph-loop` — autonomous loop for repeatedly running validators or headless spec.
- **Custom skill creation**: `skill-creator:skill-creator` — create LoA-specific skills (e.g. a choice-label-auditor enforcing the 15-word inner-voice rule).
- **Commit workflow**: `commit-commands:commit` — streamlined commit with proper message format and push.
