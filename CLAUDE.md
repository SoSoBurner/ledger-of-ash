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
- `css/style.css` — external stylesheet (not used by play.bat; source HTML has inline `<style>`)
- `dist/` — bundled build output; NOT what play.bat serves
- `play.bat` — opens root source HTML in Chrome app mode

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

## G Defaults Rule

Any property read from G in enriched choices or game logic must be initialized in the G defaults object. Missing keys cause silent TypeErrors swallowed by `adaptEnrichedChoice`'s try/catch — stage progress silently stops advancing.

## Known Bug: _beginLegendCore Skill Remap

`_beginLegendCore` (~line 8065) remaps `G.skills` keys to display names (might/finesse/vigor/wits/charm/spirit) before game start. All live skill reads use internal keys → return 0. Do not build features on top of this pattern — fix it first.

## Stage II Companion Gate

`vorath_gelden` and `mira_calden` gate on `G.flags.maren_oss_resolved` (set in `_closeClimax()`, `content/stage2_climax.js`). If Stage II companions seem locked, check this flag is being set.

## Skill Display: Two Render Paths

Skills render in `updateHUD()` (~line 10862) and `renderCharacterSheet()` (~line 10418). Change both or the HUD and character sheet diverge.

## DC Reference

Base DCs: safe=7, risky=12, bold=15. Stage modifier: +1 per stage (Stage I=+0 … Stage V=+4). Additional: axis flip +1–2, severe weather +1.

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

## Research Before Asking

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
