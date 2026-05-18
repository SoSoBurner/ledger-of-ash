# Ledger of Ash — Content & Narrative Reference

> Loaded automatically when working in content/. V33_2 is the canon floor — see `data/reference/V33_2_extracted/`.

## Narrative Style

Write in an observational, immersive style. Prioritize vivid sensory detail over explanation. Keep prose clear, grounded, and readable. Favor concrete description over metaphor. Fantasy terminology should remain light, implied, and sparse.

Default preferences:
- Moderate reading level, clear paragraph flow, strong atmosphere
- Visible emotional texture through behavior, tone, posture, and dialogue
- Avoid internal monologue, info-dumping, and generic filler adjectives
- Prefer lived-in cultural detail: rituals, habits, greetings, environmental quirks

When revising: tighten repetition, preserve tone, keep the strongest sensory details, remove stale phrasing, keep dialogue natural and distinct by speaker.

Always protect continuity of: names, places, rituals, attire, injuries, weather, timeline, relationship dynamics.

## Content Type Standards

- **Result text**: 60–90 words target; 120 max for high-stakes moments. Scene not summary. No scrolling.
- **Choice labels**: player's inner voice, under 15 words. The label is a THOUGHT, not a description of an action. No question marks. No infinitives. Wrong: "Ask the innkeeper about recent guests." Right: "The innkeeper notices things she doesn't write down."
- **Locality narrations**: open with sensory detail specific to THIS place only. No editorial framing. Must reflect the locality's defining physical infrastructure (dome, Titan Towers, seawall, quarry face, etc.) before atmosphere.
- **Rumors**: notice board / town crier register. Always include source texture (who said it, where).
- **Backgrounds**: sensory opening line, personal history first, never tell the player what their character feels.

## NPC Model

Every named NPC needs three things before any dialogue is written:

1. **Agenda** — something they want that is independent of the player
2. **Register** — speech shaped by locality of origin, class, and local magic law
3. **Tell** — one physical or behavioral habit that is theirs alone. Must be specific enough that no other NPC would do it. Wrong: "she folds her hands." Right: "her thumb finds the chalk edge of the ward mark in the doorframe without her seeming to notice it."

Named NPCs and locality authority figures react to player archetype — shown, not announced. Renown expressed through behavior change, not words. Subtext: NPCs rarely say exactly what they mean. One unsaid layer per scene.

## Canon Rules (V33_2 is the hard floor)

- The Ledger of Ash is never named in public-facing text before mid-Stage 4.
- Magic follows local law — what is permitted differs by locality. Show this in narration and NPC behavior.
- Archetype-aware NPC reactions: named NPCs and locality authority figures only.
- Cosmic/deity references: unnamed forces for most NPCs; named only by religious leaders and cultural elite.
- Union aesthetic: guild marks on everything, proceduralism over outcomes, Guildmaster Selene leads Guild Council.
- Full canon reference: see project memory file `canon_reference.md` (loaded in AI sessions automatically).

## Forbidden Words (player-facing text only — not code or variable names)

**Scope:** All player-facing text including choice text, result text, NPC dialogue, background copy, AND UI chrome labels. Check `ledger-of-ash.html` directly. `js/consequences.js` is a dead copy.

- "investigation" / "investigate" — retire; use specific alternatives
- "meaningful" — cut entirely
- "contact" as a noun for a person
- "official" as a vague adjective
- "you feel" / "you realize" / "you sense" — show the observable instead
- Editorial framing: "the city knows it," "in a way that suggests," "precisely as X as Y"

## Ledger Revelation Arc

Stages 1–3: Suppression felt through missing names, NPC deflection, institutional pattern without a name.
Mid-Stage 4: Player finds a document. "Ledger of Ash" named explicitly for the first time.
Never: in rumors, gossip, NPC speech, or public records before that document is found.

## Seasonal Integration

Show seasonal pressure as narration texture: small observable details (closed route marker, festival banner coming down, frost on a manifest board). The 73-day axial flip causes route disruption and festival shifts. Extreme conditions may require the player to wait them out. *(Apply when world-clock seasonal detection is implemented.)*

## Choice Label Standard — Moral Texture

Labels are the player's inner voice: under 15 words, no question marks, no infinitives, no NPC-directed verbs. The label carries moral register — not revealed only in the result.

Examples (old → new):
- "Ask Aurek Tidereach whether certain merchant routes are being blocked." → "Aurek knows which routes stopped moving. He's decided not to say."
- "To investigate the routing discrepancy further." → "The numbers don't match. Someone made them not match."
- "Consult the night archivist about the missing manifest entries." → "The archivist works nights for a reason."
- "Question the road warden about checkpoint irregularities." → "The warden stamped that manifest without looking at it."

## Journal System

`addJournal(text, category)` — text first, category second. Reversing silently breaks journal logging. Valid categories: `'evidence'`, `'intelligence'`, `'rumor'`, `'discovery'`, `'contact_made'`, `'complication'`. Never `'investigation'`. `G.journalRecords` holds full records ({id, category, day, text}). `G.journal` is a string-only deduplicated array, capped at 30 — do not assert journal counts against it in tests.

## Typography System

Enforce strictly — three tiers:

| Tier | Variable | Font | Role |
|------|----------|------|------|
| A | `var(--font-display)` | `'Cinzel', serif` | Headers, labels, UI chrome, choice buttons. Short text only. Never italic. |
| B | `var(--font-body)` | `system-ui, -apple-system, 'Segoe UI', sans-serif` | UI chrome: card descriptions, overlays, hints, journal labels, small UI text. |
| B+ | *(direct)* | `'Crimson Pro', serif; weight-300; non-italic` | Long-form prose only: `.narrative-text`, `.result-text`, `.env-desc`. 19px narrative / 17px results. |
| C | *(direct)* | `'Crimson Pro', serif; italic` | Atmosphere accent only: title tagline, world notices, camp intro, death screen, HUD flavor. Under ~25 words. |

Both variables are defined in `:root`. Cinzel and Crimson Pro are embedded via `@font-face` (no network dependency).

## Color Identity System

Use semantic role variables in new CSS. Fall back to specific color variable only when the semantic one doesn't apply.

| Role | Variable | Hex | Use |
|------|----------|-----|-----|
| Base surface | `--ash` / `--coal` / `--char` | `#07060d` / `#0c0a14` / `#131019` | Page backgrounds, panels |
| Gold accent | `--accent-gold` / `--gold-bright` | `#d89a2c` | Renown, level, reward, stage unlock text |
| Danger accent | `--danger` / `--blood-bright` | `#be2828` | Boss encounters, wounds, critical states, death |
| Discovery accent | `--discovery` / `--jade-bright` | `#26603e` | Success, allies, safe paths, journal finds |

## Choice Border Semantics (locked Apr 2026)

Choice button left-borders carry semantic meaning — do not reassign colors across roles:

| Border | Hex | Class | Triggers | Status |
|---|---|---|---|---|
| Blue | `#4a7ab5` | `.choice-btn.plot-main` | `plot:'main'` on choice object — main quest advancement only | Active |
| Orange | `#d47517` | `.choice-btn--warn1` | Confrontation / Accusation / Ambush tags | Active |
| Dark amber | `#7a5c1e` | `.choice-btn--warn2` | Conflict / Exposure / Betrayal tags | Active |
| Red | — | `.choice-btn--combat` | Combat / Tactical / Boss / CombatEntry tags | Active |
| Yellow→Red ramp | — | `.choice-btn.threat-*` | Combat escalation threat level | NOT YET BUILT |

Rules:
- Blue is intentionally distinct from gold/danger/discovery — do not change `.plot-main` to gold (gold signals reward/renown, not narrative criticality).
- Arc tags (ArcDeparture/ArcFinale/etc) have NO border — removed Apr 2026.
- Stage 1 main quest choices currently have NO `plot:'main'` — needs a pass to add it.

## Locality Status Constraints

- **Nomdara**: Transit-only — no NPC encounters. Zero canon NPCs. Mobile settlement; no authored quickstart card.
- **Sheresh**: Stage 1 content only (no Stage 2). Zero canon NPCs — any Sheresh NPCs must be authored from scratch, canon-consistent.
- **Districts + Plumes End Outpost**: Missing quickstart cards — use locality packet data as working reference substitute.
