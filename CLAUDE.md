# Ledger of Ash — Project Context

## Dev Environment

- **Source file**: `C:\Users\CEO\ledger-of-ash\ledger-of-ash.html` — this is what `play.bat` opens. Never edit `dist/`.
- **Play**: Run `play.bat` to open in Chrome app mode (`file://` protocol).
- **Content scripts**: All JS files in `content/` must be referenced as `content/filename.js` in HTML script tags.
- **Google Fonts**: Do NOT add Google Fonts `<link>` tags — they fail over `file://`. Use `var(--font-body)` or `var(--font-display)` CSS variables directly.
- **Debug**: Use `console.log` / `console.error` only. Never `alert()` — it appears as an error dialog to the user.
- **Font changes**: Always grep the TARGET element's class directly before editing. ID-selector font rules beat parent class rules. Fix the direct rule, not the parent.

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
- `03_LOCALITY_ENGINE/locality_packets/` — 53 JSON locality files (identity, encounter rhythm, scene openers, social misstep examples)
- `03_LOCALITY_ENGINE/text_rpg_packets/` — 14 MD narrative flavor bundles (10 Stage 1 localities are missing these)
- `12_TABLE_KITS/arrival_kits/` — 53 MD first-arrival scene seeds, one per locality
- `11_REFERENCE_VIEWS/locality_quickstart_cards/` — 53 MD quick-reference cards (Districts, Nomdara, Plumes End Outpost, Sheresh missing)
- `02_CANON_BASELINE/named_npcs/` — 723 NPC JSON profiles
- `02_CANON_BASELINE/interface_role_instances/` — NPC role instances by polity

## Stage Content Status

- **V1.0 Release scope: Stages 1 and 2** — Stage 3 is NOT part of this release. Do not develop Stage 3 content until Stages 1 and 2 are complete.
- **Stage 1**: COMPLETE AND FROZEN for reduction. 22 localities, ~15K lines, ~534 KB of enriched choice files. Additive fixes only (label wording, forward hooks, NPC subtext). Never reduce choice count or result text.
- **Stage 2**: Completable end-to-end (boss→antechamber→climax all wired). Content needs expansion to EXCEED Stage 1 total content volume.

## World Expansion Rule

Every plan phase that adds content must expand the total content of the stage it targets. Each stage must have slightly more total content than the previous stage — more localities, more choices per locality, more result text, more NPC encounters. The world grows as the player progresses: Stage 2 exceeds Stage 1, Stage 3 exceeds Stage 2, and so on. This applies to every future plan and content authoring session.

- Never reduce content in a completed stage to make room for a new one.
- Additive fixes (label rewording, hook additions, subtext) do not count as new content — they are maintenance.
- New choices, new localities, new NPC scenes, and new result branches count as content expansion.
- **Stage 3**: Not yet authored. Stage gate declared in `G.stageProgress` but no content files exist.
- Stage 1→2 bridge arcs: `*_to_shelk_arc.js` files in `content/` (12 files, inject when progress ≥ 5 OR level ≥ 6)
- Stage 2 global specials: `stage2_enriched_choices.js` (pool), `stage2_antechamber.js` (triggers at stageProgress[2] ≥ 12), `stage2_climax.js` (confrontation)

## Stage Gate Logic

- Stage I → II: `stage1_narrative_complete` flag only — `checkStageAdvance()` ~line 8777. Level cap (5) stops XP but does NOT auto-advance stage.
- Stage II → III: `canAdvanceToStage3()` ~line 8786 — **V1.0 stub: hardcoded `return false`**. Flags/conditions documented in plan but not yet active.
- `G.stageProgress` is `{1:0, 2:0, 3:0, 4:0, 5:0}` — all 5 stages declared, 3–5 not yet authored

## Testing Infrastructure

- Run logic tests: `npx jest` (not `npm test` if jest not in PATH globally)
- Run content validators: `node tests/content/validate-content.js && node tests/content/validate-flags.js && node tests/content/validate-structure.js`
- Run E2E: `npx playwright test`
- `locality_voice_guide.js` and `npc_dossiers.js` are reference-only — not loaded by HTML, whitelisted in validate-structure.js `REFERENCE_ONLY` set
- `content/` has subdirectories — all `fs.readdirSync` scans must use `.filter(f => fs.statSync(...).isFile())`
- Baseline (Apr 2026): 838 content violations pre-existing (label length, question marks). Validator is correct; content debt is real.

## XP and Level System

- Level 1→2: 120 XP. Level N→N+1: N×60 XP.
- `STAGE_LEVEL_CAP = {'Stage I':5, 'Stage II':10, 'Stage III':15, 'Stage IV':18, 'Stage V':20}`
- At cap: XP overflow goes to `G.masteryXP`; level does not increase.
- `equipItem(idx)` uses `item.type` ('weapon'/'armor' → matching slot; anything else → 'tool') — not `item.slot`.

## Travel Mode System

`G.travelMode` is declared in G defaults (`false`) but not yet activated. Modes: foot (1 unit/day, free), horse (2/day, gold rental), cart (1/day, gold, no fast pace), boat (3/day, gold passage, route-fixed). `G.pace` controls fast/normal/slow where available. All travel implementation lives in `ledger-of-ash.html` and `content/travel_corridors.js` — never in `js/travel.js`.

## Archetype System

31 archetypes total. `getArchetypeFamily(archetype)` returns family string. Support family (7 archetypes): Healer, Artificer, Engineer, Tactician, Alchemist, Saint, Bard. Craft-heavy (highest base craft): Artificer (4), Engineer (4), Alchemist (3). Knight has Mounted Discipline passive. Archetype-sensitive NPC reactions: Tier 1 polity NPCs and named antagonists only.

## Camp System

`doSleepScene()` — handles rest and healing. `campAction(type)` — available types: `'post_watches'` (converts night ambush to warned encounter), `'craft'` (craft skill action). `G.companions` — array of active companion objects. `vorath_gelden` and `mira_calden` gate on `G.flags.maren_oss_resolved`.

## Plans Directory Warning

`C:\Users\CEO\.claude\plans\` has 28+ plan files that are NOT auto-loaded into sessions. Check `memory/ACTIVE_PLANS_INDEX.md` at session start. Do not re-derive decisions that are already recorded there.

## Locality Status Constraints

- **Nomdara**: Transit-only — no NPC encounters. Zero canon NPCs. Mobile settlement; no authored quickstart card.
- **Sheresh**: Stage 1 content only (no Stage 2). Zero canon NPCs — any Sheresh NPCs must be authored from scratch, canon-consistent.
- **Districts + Plumes End Outpost**: Missing quickstart cards — use locality packet data as working reference substitute.

## Skill Keys vs Display Names

`G.skills` uses internal keys only — never display names:

| Key        | Display |
|------------|---------|
| combat     | Might   |
| stealth    | Finesse |
| survival   | Vigor   |
| lore       | Wits    |
| persuasion | Charm   |
| craft      | Spirit  |

## window.G is undefined

`G` is declared `let G` at module scope — `window.G` is `undefined`. Never use `var G = window.G` as a local alias (it silently breaks the function). Always reference the outer `G` directly, as every other function does.

## G Defaults Rule

Any property read from G in enriched choices or game logic must be initialized in the G defaults object. Missing keys cause silent TypeErrors swallowed by `adaptEnrichedChoice`'s try/catch — stage progress silently stops advancing.

## Stage II Companion Gate

`vorath_gelden` and `mira_calden` gate on `G.flags.maren_oss_resolved` (set in `_closeClimax()`, `content/stage2_climax.js`). If Stage II companions seem locked, check this flag is being set.

## Skill Display: Two Render Paths

Skills render in `updateHUD()` (~line 10862) and `renderCharacterSheet()` (~line 10418). Change both or the HUD and character sheet diverge.

## DC Reference

Base DCs: safe=8, risky=13, bold=16. Stage modifier: +1 per stage (Stage I=+0 … Stage V=+4). Additional: axis flip +1–2, severe weather +1.

## Combat Entry

- `enterCombat(enemyKey, ctx)` — narrative encounter: shows NPC intent, renders Press/Defend/Talk/Retreat choices. Use for story-driven fights.
- `startCombat(enemyKey, ctx)` — low-level engine entry. Only call directly for non-narrative triggers.
- Legacy CIDs routed through `handleChoice` → `enterCombat` via `legacyCombatCids` array.

## Typography System (three tiers — enforce strictly)

| Tier | Variable | Font | Role |
|------|----------|------|------|
| A | `var(--font-display)` | `'Cinzel', serif` | Headers, labels, UI chrome, choice buttons. Short text only. Never italic. |
| B | `var(--font-body)` | `system-ui, -apple-system, 'Segoe UI', sans-serif` | UI chrome: card descriptions, overlays, hints, journal labels, small UI text. |
| B+ | *(direct)* | `'Crimson Pro', serif; weight-300; non-italic` | Long-form prose only: `.narrative-text`, `.result-text`, `.env-desc`. 19px narrative / 17px results. |
| C | *(direct)* | `'Crimson Pro', serif; italic` | Atmosphere accent only: title tagline, world notices, camp intro, death screen, HUD flavor. Under ~25 words. |

Both variables are defined in `:root`. Cinzel and Crimson Pro are embedded via `@font-face` (no network dependency).

## Color Identity System (4-role palette — enforce consistently)

| Role | Variable | Hex | Use |
|------|----------|-----|-----|
| Base surface | `--ash` / `--coal` / `--char` | `#07060d` / `#0c0a14` / `#131019` | Page backgrounds, panels |
| Gold accent | `--accent-gold` / `--gold-bright` | `#d89a2c` | Renown, level, reward, stage unlock text |
| Danger accent | `--danger` / `--blood-bright` | `#be2828` | Boss encounters, wounds, critical states, death |
| Discovery accent | `--discovery` / `--jade-bright` | `#26603e` | Success, allies, safe paths, journal finds |

Rule: use the semantic role variable (`--danger`, `--discovery`, `--accent-gold`) in new CSS. Fall back to the specific color variable only when the semantic one doesn't apply.

Boss encounters: pass `{isBoss: true}` in context to `enterCombat()` — applies `.encounter--boss` class (danger border).

---

# Narrative Project Rules

Write in an observational, immersive style.
Prioritize vivid sensory detail over explanation.
Keep prose clear, grounded, and readable.
Favor concrete description over metaphor.
Do not over-explain lore or fantasy systems.
Fantasy terminology should remain light, implied, and sparse unless explicitly requested.

Default narrative preferences:

* Moderate reading level
* Clear paragraph flow
* Strong atmosphere
* Visible emotional texture through behavior, tone, posture, and dialogue
* Avoid internal monologue unless requested
* Avoid info-dumping
* Avoid generic filler adjectives
* Prefer lived-in cultural detail, rituals, habits, greetings, and environmental quirks

When revising:

* Tighten repetition
* Preserve tone
* Keep the strongest sensory details
* Remove stale phrasing
* Keep dialogue natural and distinct by speaker

Always protect continuity of:

* names
* places
* rituals
* attire
* injuries
* weather
* timeline
* relationship dynamics

## Content Type Standards

Result text: 60–90 words target; 120 target max for high-stakes moments. Scene not summary. No scrolling.
Choice labels: player's inner voice, under 15 words. The label is a THOUGHT being had, not a description of an action. Wrong: "Ask the innkeeper about recent guests." Right: "The innkeeper notices things she doesn't write down." No question marks. No infinitives describing what you'll do.
Locality narrations: open with sensory detail specific to THIS place only. No editorial framing. Must reflect the locality's defining physical infrastructure (dome, Titan Towers, seawall, quarry face, etc.) before atmosphere — generic atmosphere over wrong architecture is the failure mode.
Rumors: notice board / town crier register. Always include source texture (who said it, where).
Backgrounds: sensory opening line, personal history first, never tell the player what their character feels.

Journal category strings (addJournal calls): use specific types only — 'evidence', 'intelligence', 'rumor', 'discovery', 'contact_made', 'complication'. Never 'investigation'.
`addJournal(text, category)` — text first, category second. Reversing silently breaks journal logging.
`G.journalRecords` holds full records ({id, category, day, text}). `G.journal` is a string-only deduplicated array, capped at 30 — do not assert journal counts against it in tests.

## NPC Model

Every named NPC needs three things before any dialogue is written:

1. Agenda — something they want that is independent of the player
2. Register — speech shaped by locality of origin, class, and local magic law
3. Tell — one physical or behavioral habit that is theirs alone. Must be specific enough that no other NPC would do it. Wrong: "she folds her hands." Right: "her thumb finds the chalk edge of the ward mark in the doorframe without her seeming to notice it."

Named NPCs and locality authority figures react to player archetype — shown, not announced.
Renown expressed through behavior change, not words.
Subtext: NPCs rarely say exactly what they mean. One unsaid layer per scene.

## Canon Rules (V33\_2 is the hard floor)

* The Ledger of Ash is never named in public-facing text before mid-Stage 4.
* Magic follows local law — what is permitted differs by locality. Show this in narration and NPC behavior.
* Archetype-aware NPC reactions: named NPCs and locality authority figures only.
* Cosmic/deity references: unnamed forces for most NPCs; named only by religious leaders and cultural elite.
* Union aesthetic: guild marks on everything, proceduralism over outcomes, Guildmaster Selene leads Guild Council.
* Full canon reference: see project memory file canon\_reference.md (loaded in AI sessions automatically).

## Forbidden in Player-Facing Narrative Strings Only (not code or variable names)

**Scope:** These words live in inline HTML data — choice text, result text, NPC dialogue, background copy. Check `ledger-of-ash.html` directly. `js/consequences.js` is a dead copy and does not reflect what the game runs.

* "investigation" / "investigate" — retire; use specific alternatives
* "meaningful" — cut entirely
* "contact" as a noun for a person
* "official" as a vague adjective
* "you feel" / "you realize" / "you sense" — show the observable instead
* Editorial framing: "the city knows it," "in a way that suggests," "precisely as X as Y"

## Ledger Revelation Arc

Stages 1–3: Suppression felt through missing names, NPC deflection, institutional pattern without a name.
Mid-Stage 4: Player finds a document. "Ledger of Ash" named explicitly for the first time.
Never: in rumors, gossip, NPC speech, or public records before that document is found.

## Seasonal Integration (apply when world-clock seasonal detection is implemented)

Show seasonal pressure as narration texture: small observable details (closed route marker, festival banner
coming down, frost on a manifest board). The 73-day axial flip causes route disruption and festival shifts.
Extreme conditions may require the player to wait them out.

## Clarification Policy

Before executing any prompt that is multi-line, appears complex, or would make large/wide-ranging changes: stop and ask clarifying questions first. Get alignment before acting. Single-line, obviously scoped requests can proceed directly.

Caps: if there are more than 100 total unanswered questions across all open topics, or more than 50 questions asked in a single successive exchange without executing anything — pause the ask-before-act rule and proceed with best judgment on the remaining open items, noting assumptions made. Before proceeding, always prompt: "I have [N] more questions — want to hear them before I continue?"

## Prework Questions Format

When asking clarifying questions before a task, always use this numbered format:

**N. Short title**
One sentence explaining what the issue or ambiguity is and why it matters.
*Recommendation A: first concrete option with brief rationale.*
*Recommendation B: second concrete option with brief rationale.*
*(Additional options if genuinely distinct approaches exist.)*

Rules:
- Number every question
- Explain the issue — never ask a bare question without context
- Provide recommendations only when there are genuinely distinct options worth choosing between — do not pad to meet a quota
- If only one approach makes sense, state it and move on rather than manufacturing a false alternative
- Mark your preferred recommendation clearly if one is stronger
- Group related sub-questions under one number rather than splitting them
- Use this format for prework, not mid-task clarifications

## Memory Save Points

- **Before large tasks**: Save a memory checkpoint of current project state and the plan before starting any large or wide-ranging task.
- **Before 5+ questions**: When asking more than 5 clarifying questions, save a memory checkpoint first — record decisions made so far and open items, so nothing is lost if the session ends.

## Research Before Asking

Do a light sweep before asking any question. If the code answers it, find it — don't ask. Never ask needless questions or manufacture alternatives to fill a quota.

Before writing any prework question, check whether the code already answers it. Most design questions about mechanics, clocks, UI, combat, or rivals have answers in the existing source.

**Efficient research order (minimize tool usage):**
1. `ctx_search` first — one call with multiple queries covers most of the codebase fast
2. `ctx_batch_execute` — for reading several specific files in one call when search isn't enough
3. Explore subagent — only for deep feature traces that require multi-file tracing

**Rule:** If a question can be answered by reading existing code, read it first and don't ask. Only surface genuinely ambiguous *design decisions* — things the code cannot answer — to the user. Prioritize reusing existing mechanics over proposing new ones.

## Session Startup — MANDATORY, NO EXCEPTIONS

Run ALL of the following at the start of every session. Never skip any step, even if context seems warm from a prior session:

1. Invoke skill: `dispatching-parallel-agents`
2. Invoke skill: `subagent-driven-development`
3. Run skill: `less-permission-prompts`
4. Run `/reload-plugins`
5. Confirm all agents, commands, built-in tools, hooks, skills, and widgets are loaded and ready for Ledger of Ash work

## Tool Usage — Always On, No Permission Needed

All of the following are permanently authorized. Use them proactively without asking:

- **Agents**: Dispatch subagents for any task that is large, isolated, or benefits from fresh context. Run independent tasks in parallel by default. Never rationalize doing a subagent-appropriate task inline.
- **Skills**: Invoke the relevant skill BEFORE any response when there is even a 1% chance it applies. Never rationalize skipping a skill because the task "seems simple."
- **Built-in tools** (Read, Edit, Write, Grep, Glob, Bash): Use freely at any time. Prefer dedicated tools over Bash for file operations.
- **Parallel dispatch**: When 2+ tasks are independent, dispatch them in parallel as the default — sequential is the exception.
- **Hooks**: Treat hook feedback as direct user instructions.
- **Widgets and commands**: Use whenever available and relevant without asking first.

## Alignment System

`G.benevolence` (−50 to +50) and `G.orderAxis` (−50 to +50) are live in G defaults. Modified via choice effects: `{type:'morality', n}` adjusts benevolence; `{type:'order', n}` adjusts orderAxis. Character sheet renders both as bar charts (BENEVOLENCE / ORDER sections). Alignment badges (Cruel/Benevolent, Anarchy/Order) appear on character sheet only at threshold ±10 — **never on choice buttons** (preserves discovery tension). No new fields required — derive badges at render time from existing G values.

## Quest System

`G.quests` array + `addQuest(msg)` + `updateQuestHUD()` are live. Wired to `{type:'quest', msg:'...'}` effects. Quest hints use a **parallel map** `G.questHints = {}` keyed by `questId` string — **do not change G.quests structure** (breaks save compatibility). Wire: `{type:'quest', msg:'...', hint:'...', questId:'key'}`. `updateQuestHUD()` shows hint line below quest text when `G.questHints[questId]` exists. Rival clock appears in journal page only — **not in quest HUD**.

## Heat System

`G.heat[polityKey]` (0–10, integers) per-polity heat tracking. Helpers: `getHeat(polity)` returns integer; `addHeat(polity, amount)` clamps at 10. 11 polity keys: `shelk`, `roaz`, `shirsh`, `mimolot`, `panim`, `cosmouth`, `zootia`, `union`, `sheresh`, `soreheim`, `nomdara`. `enterAuthorityConfrontation(authorityKey, ctx)` handles all authority encounters — never call `enterCombat()` directly for authority figures. Heat thresholds: 3 = notice + optional encounter, 5 = mandatory encounter + DC+1, 8 = warrant issued. Law enforcement NPCs remember past interactions: narration in `enterAuthorityConfrontation` Phase 1 includes heat-conditional opening line at heat 3-4 / 5-7 / 8+.

## Safe/Risky/Bold Classification

**Bug (pre-existing):** Stage 1 enriched choices use semantic tags (`['Investigation','NPC','Maritime']`) that don't match `BOLD_TAGS`/`SAFE_TAGS` — all default to 'risky'. **Fix approach:** Add semantic mapping to tag lookup: `Investigation/NPC/Social/Lore/Maritime/Archive/Observation` → safe; `Confrontation/Accusation/Exposure/Betrayal/Tribunal/Ambush` → bold. Also support explicit scalar `tag` field: `tag:'safe'`/`'risky'`/`'bold'` bypasses semantic lookup entirely. Do not change choice content to fix this — fix the classification logic.

## Universal Roll Rule

**Every choice must roll.** Safe choices auto-roll at DC 7 if no explicit `choice.roll` is specified. Mechanical wire: derive roll at call time in `handleChoice` — do not mutate choice data. DC derivation: safe=7, risky=12, bold=15 (plus stage modifier from DC Reference). Content requirement: every safe choice must have a `failResult` field — failure redirects rather than dead-ends. Safe failure register: "This path is closed here, but [forward thread]." This affects all 19 Stage 1 files, Stage 2 files, and the tutorial (which must explain that all choices involve a roll).

## Choice Label Standard — Moral Texture

Labels are the player's inner voice. Under 15 words, no question marks, no infinitives, no NPC-directed verbs. The label carries moral register — not revealed only in the result. Four example pairs (old → new):

- "Ask Aurek Tidereach whether certain merchant routes are being blocked." → "Aurek knows which routes stopped moving. He's decided not to say."
- "To investigate the routing discrepancy further." → "The numbers don't match. Someone made them not match."
- "Consult the night archivist about the missing manifest entries." → "The archivist works nights for a reason."
- "Question the road warden about checkpoint irregularities." → "The warden stamped that manifest without looking at it."

Root cause of label drift: absent enforcement at authoring time. New choices must pass the 15-word / inner-voice test before commit.

## Stage 3+ Content Freeze

Stage 3, 4, and 5 content is **NOT being authored** until Stages 1 and 2 are complete and play-tested. `canAdvanceToStage3()` is hardcoded `return false`. Do not author Stage 3+ choices, NPCs, localities, climaxes, or mechanics in any plan or session until explicitly instructed. Stage 3 stub files (`stage3_enriched_choices.js`, `stage3_climax.js`) exist but contain no playable content.
