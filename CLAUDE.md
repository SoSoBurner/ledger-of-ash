# Ledger of Ash — Project Context

## Quick Reference

| Need | Go to |
|------|-------|
| File paths, branches, play command | [Dev Setup](#1-dev-setup) |
| Stage gates, G object, XP, combat | [Engine Rules](#2-engine-rules) |
| Session startup, skills, plugins | [Process](#3-process) |
| Writing style, canon, choice labels | `content/CLAUDE.md` |
| Playwright, validators, playtest | `tests/CLAUDE.md` |
| World graph, NPC profiles, locality packets | `data/reference/V33_2_extracted/` |

---

# 1. Dev Setup

## Dev Environment

- **Source file**: `C:\Users\CEO\ledger-of-ash\ledger-of-ash.html` — this is what `play.bat` opens. Never edit `dist/`.
- **Play**: Run `play.bat` to open in Chrome app mode (`file://` protocol).
- **Content scripts**: All JS files in `content/` must be referenced as `content/filename.js` in HTML script tags.
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
- **Stage 1**: COMPLETE AND FROZEN. 22 localities. Additive fixes only — never reduce choice count or result text.
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
