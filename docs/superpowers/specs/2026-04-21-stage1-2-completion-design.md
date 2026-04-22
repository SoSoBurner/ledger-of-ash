# Ledger of Ash — Stage 1 & 2 Completion Design Spec
**Date:** 2026-04-21  
**Scope:** All systems required to make Stages 1 and 2 fully functional and complete for v0.1

---

## 1. Overview & Goals

This spec captures all design decisions needed to complete Stage 1 and Stage 2 of Ledger of Ash as a fully playable, immersive experience. It covers UI layout, mechanics, content, travel, sideplots, companions, and character creation.

**Primary goals:**
- All Stage 1 and Stage 2 content active and reachable in v0.1
- No dead ends, unclickable choices, or broken mechanics
- Sandbox gameplay loop that makes the world feel alive
- Travel system that makes the world feel like it's growing
- Emotional hooks that drive player investment from character creation onward

**Deferred to post-"done" / executing-plans phase:**
- File/folder architecture redesign (`/architecture-designer` invocation)
- `build_locality_matrix.py` update to spec (3) schema
- Full leg-by-leg sequential routing UI (infrastructure built now, full UI in v0.2)

---

## 2. Critical Bug Fixes (Ship-Blocking)

These must land before any feature work.

| Bug | Location | Fix |
|---|---|---|
| `renderChoices()` appends without clearing | `ledger-of-ash.html:8237` | Add `el.innerHTML = ''` before `el.appendChild(block)` |
| Choice stacking causes unclickable buttons | Same as above | Fixed by above |
| Case File meter doesn't update | `stage-progress-track` HUD | Wire `investigationProgress` to meter element in `updateHUD()` |
| Social→tactical combat flip not implemented | `ledger-of-ash.html:~2888` | At `tensionLevel === 2`, add fight choice + aggressive-fail trigger |
| Save system still uses 4-digit PIN | Load screen + char creation | Implement new save system (see §10) |
| `checkStageAdvance` only in dist HTML | Source gap | Move definition to `js/engine.js` |
| Tension color on NPC elements missing | Choice render | Apply `.tension-warn`/`.tension-hot` to NPC element borders, same as choice buttons |
| How-to-play close button broken | `#howto-close` | Verify click handler removes `active` class from `#howto-modal` |
| Contacts button fails silently | `showNPCMenu()` | Add fallback message when `G.location` is null |
| Trait activation giving scenes/choices | Trait code | Remove all scene triggers from trait activation; traits are passive only |
| Level-up stat descriptions are generic | `ledger-of-ash.html:8862` | Update hints to mechanical descriptions (e.g., "Governs combat rolls and physical checks") |
| XP farmable via repeat choices | Bridge + choice pool | Add `G.seenChoices` set; plot choices one-time only, sandbox choices award 0 XP after first |
| Internal stat keys use old names | Throughout | Rename: `combat→might`, `stealth→finesse`, `survival→vigor`, `lore→wits`, `persuasion→charm`, `craft→spirit` |
| Opening page redundant subtitle | Load screen | Remove "material planet" eyebrow text if background already shows it |
| `omens` clock never incremented | Engine | Add increment triggers (bold investigation choices, Maren notice events) |
| `isolation` clock never incremented | Engine | Add increment triggers (failed social contact, solo choices, ignored NPC interactions) |

---

## 3. UI Layout

### 3.1 Three-Column Division

| Column | Purpose | Contents |
|---|---|---|
| **Left** | Orientation & readiness | HP, wounds, fatigue, alignment axes, XP bar, level, active companion status (green/yellow/red per companion), current locality + district label |
| **Center** | Live experience & decisions | Two sub-columns (see §3.2) |
| **Right** | Inspect & reflect | Tabbed panel (see §3.3) |

Companions are **not** in the main HUD — they appear in the camp menu only.

### 3.2 Center Panel Layout

The center panel is split into two horizontal sub-columns:

**Left sub-column (persistent setting):**
- `env-status` — pinned at top (locality name, district, time of day, weather)
- `env-desc` — rich narrative description below env-status; updates on every location change and scene change
  - Style: observational travel narrative, second-person lens, sensory and vivid, fantasy elements understated (see §11 for full style guide)
  - Fixed-width column, scrollable if long

**Right sub-column (live play surface):**
- Narrative results (consequence of last action)
- Choice panel / conversation UI / tactical UI (stacked bottom)
- Combat stays here — no context switch

### 3.3 Right Panel — Tabs

1. **Character** — Stats (6 core with scores + mechanical descriptions), Skills (by archetype category, governing stat shown), Traits (passive list with effect text, distinct color/icon)
2. **Party** — Companions with warnStage indicator, relationship bar, camp talk
3. **World** — Active world clocks (pressure/watchfulness/rival/reverence/omens/isolation as visual bars), notices feed
4. **Journal** — Full narrative history log

### 3.4 Contacts System

Contacts is a tab within the **Right panel** (Party tab or its own tab). Shows:
- Named NPCs the player has met: location, status, services, relationship toward player
- Descriptive entries for known-but-unmet NPCs
- Recruitable NPCs in current locality with find-location hint
- If NPC is in the same district: "Interact" option opens a narration → conversation scene in the center panel

### 3.5 Character Sheet (Stats / Skills / Traits)

Three visually distinct panels within the Character tab:

- **Stats panel**: Might, Vigor, Charm, Wits, Finesse, Spirit — scores + one-line mechanical description each
- **Skills panel**: Listed by archetype category, shows governing stat, active/passive indicator
- **Traits panel**: Always-on passive bonuses only; distinct icon/color; no activation required or triggered

### 3.6 Stats / Skills / Traits Definitions

- **Stats**: Might, Vigor, Charm, Wits, Finesse, Spirit — the 6 core values
- **Skills**: Combative, healing, or utility
  - Utility skills = special action OR temporary bonus; costs one action in scenes
  - Previously "for one scene" traits reclassified as utility skills (see §7)
- **Traits**: ALWAYS passive; apply automatically after acquisition; no scenes, no choices triggered

---

## 4. XP & Risk Tier System

### 4.1 Tier Values (new order: safe < bold < risky)

| Tag | XP | DC | Intent |
|---|---|---|---|
| `safe` | 8 | 10 | Cautious play, low stakes |
| `bold` | 25 | 13 | Calculated risk, moderate stakes |
| `risky` | 45 | 15+ | Maximum stakes, high reward |
| `climax` | 68 | Varies | Boss/stage climax scenes |

### 4.2 Anti-Spam Rules

- Plot choices: flagged one-time in `G.seenChoices`; second selection awards 0 XP and no narration repeat
- Sandbox choices (navigate, observe, approach): award 0 XP always
- XP is only awarded when a choice **progresses or solves something**
- Narrative/investigation crits do not double-award XP

### 4.3 Crit Bonus

On a natural 20 (crit), the bonus automatically applies to the **next roll of the same stat type**:
- +2 to the next roll using the same stat
- No player decision required — auto-applies
- Displayed as a brief status indicator ("Next [Might] roll: +2")

### 4.4 Fumble

Natural 1 (fumble) — permanent state penalty unchanged. Asymmetry is intentional.

---

## 5. Combat & Tension System

### 5.1 Social → Tactical Escalation

- **Tension level 0**: Normal choices
- **Tension level 1** (yellow borders on choices AND NPC element): Deescalation choices appear; situation is hot
- **Tension level 2** (red borders on choices AND NPC element): Fight choice always available; a failed narratively aggressive roll triggers automatic flip to tactical UI
- **Tactical UI flip**: Combat begins in center panel; no context switch

### 5.2 NPC Tension Separation

Tension tracks per scene/encounter, separated by relationship type:

| NPC type | Tension behavior |
|---|---|
| **Companion** | Separate from combat tension; only warnStage departure risk applies |
| **Ally / player's side** | Tension = relationship strain; combat flip threshold much higher |
| **Neutral / opposition** | Standard tension track; fight at level 2 |
| **Law enforcement** | Heat-based: options and DC change based on locality heat (Clean/Watched/Hot) |
| **Criminal NPC** | Criminal label hidden by fog of war until player learns or survives tactical encounter; label revealed post-discovery |

### 5.3 Bestiary Encounters

- Per-leg encounter roll during travel (see §8.3)
- Bestiary encounters can trigger tactical UI
- Environment drives bestiary selection (polity as constraint)

---

## 6. Companion System

### 6.1 warnStage — Strike Counter

| Strikes | State | Action |
|---|---|---|
| 1 | Stage 1 | `warnScene` fires |
| 3 | Stage 2 | `confrontScene` fires |
| 5 | Stage 3 | Companion departs |

- Each alignment/tolerance violation = +1 strike (cumulative, not consecutive)
- 2 consecutive in-bounds choices = −1 strike
- Visible as a relationship bar in the camp menu (not main HUD)

### 6.2 Companion Tolerances (updated)

- **Elyra**: benevolenceFloor raised from −10 to **−20**
- All other tolerances unchanged

### 6.3 Stage 2 Companions

- Kaevrin and Vorath: all join/warn/confront/leave content confirmed complete
- Both unlock after `maren_oss_resolved` flag

### 6.4 Camp Menu

- Companions visible in camp menu only
- Camp talk available; warnStage indicator visible per companion
- Swap cooldown: 5-day countdown visible

---

## 7. Traits → Utility Skills Reclassification

The following traits are reclassified as **utility skills** (one action, once per scene, stat requirement):

| Old trait | New utility skill | Mechanic | Stat req |
|---|---|---|---|
| **Shape of Things** (Oracle) | Shape of Things | Once per scene: read probable outcome, speak it aloud. NPCs who hear it treat your next social roll as minimum success. | Wits ≥ 3 |
| **Captive Audience** (Bard) | Captive Audience | Once per scene: perform. NPCs present cannot initiate hostility without actively choosing to leave first. | Charm ≥ 3 |

All other archetype traits remain passive.

---

## 8. Travel & Stage Lock System

### 8.1 Polity Hierarchy

```
Umbrella Polity (Stage 3)
  └── Parent Polity (Stage 2)
        └── Macroregion (Stage 1)
              └── Locality / Settlement
                    └── District
                          └── Sublocation / POI
```

**Umbrella polities**: The Principalities, Sheresh Communes, Soreheim Alliance, Psanan

### 8.2 Stage Lock Rules (per background starting locality)

| Stage | Accessible zone |
|---|---|
| 1 | Directly adjacent localities to starting settlement, narrowed to same parent polity |
| 2 | Full starting parent polity + directly adjacent parent polities + "Travel to the Principalities" route unlocks |
| 3 | Starting umbrella polity |
| 4–5 | All umbrella polities |

- Stage locks based on **background starting locality** (varies per archetype background)
- Stage locks must **not impede main plot** — main plot always reachable
- Home region gets **new Stage 2 content layer** when Stage 2 begins (world feels alive on return)
- Each background retains expanded Stage 2 home boundary **plus** Principalities access

### 8.3 "Travel to the Principalities" Route

- Unlocks at Stage 2 entry for all non-Principalities starting backgrounds
- 2–3 node leg-by-leg journey to Shelkopolis
- Each leg: display `travel_narrative_raw` from ROUTE_MATRIX in center right sub-column
- Each leg: encounter roll (15% Stage 1, 25% Stage 2; can trigger bestiary + tactical UI)
- First implementation of the sequential routing infrastructure

### 8.4 Sequential Routing (Hybrid)

- **v0.1**: Infrastructure in place for leg-by-leg; route narration displayed on arrival
- **v0.2**: Full leg-by-leg journey loop with "Continue" prompt between legs
- Per-leg encounter rolls implemented now

### 8.5 Fog of War — Two Tiers

- `G.discoveredLocalities` — heard rumors; shows locality name + one-line rumor description
- `G.visitedLocalities` — been there; shows full env-desc on arrival
- Some localities unlock via **plot flag, NPC dialogue, rumors, gossip** without travel
- Unvisited-but-reachable localities shown as: "[Name] — you've heard of this place"
- Route narrative displays on arrival (env-desc update fires)

### 8.6 Nomdara Caravan

- Stage 2+ strict for all backgrounds (no exceptions)
- Mobile overlay attaches to nearest node; appears in travel menu when adjacent

### 8.7 Missing S1 Localities

Six localities with routes but no Stage 1 pools: `glasswake_commune`, `whitebridge_commune`, `ironhold_quarry`, `plumes_end_outpost`, `craftspire`, `unity_square` → **Stage 2+ locked**

---

## 9. Sandbox & Locality Interaction

### 9.1 Default Choice Panel (no active scene)

When no scene is active, the choice panel shows:

1. **Immediate NPC list** (current district only):
   - Unmet NPCs: descriptive entry ("a heavyset woman arguing with a dockworker")
   - Met NPCs: named entry with status indicator
   - Clicking an unmet NPC → brief observation narration → option to engage
   - Clicking a met NPC → scene narration opens → conversation

2. **Navigation options**: Adjacent district entries, travel to another locality

3. **Environmental interactions**: Notable objects/locations in the immediate area

### 9.2 Conversation System

- Conversation **replaces** the choice menu for its duration
- **Always-present "End conversation"** button returns to locality choices
- After conversation ends: locality choices **refresh** (NPCs may have moved, new rumor available)
- NPC conversation triggered from sandbox panel, contacts tab, or scene narration

### 9.3 Sandbox Navigation Narration

- Selecting navigation options (move to district, approach object) prompts second-person narration in the env-desc area
- Narration describes the movement and immediate new sensory details
- Keeps the player grounded in the world as their character

### 9.4 Direct Interactions → Tactical Escalation

- Direct NPC interactions can escalate via tension system
- At tension 2: fight choice appears; aggressive action fail triggers tactical UI
- Tactical UI is a mode within the center panel, not a separate screen

---

## 10. Save System Rebuild

Replace 4-digit PIN system with:

- **Run ID**: UUID generated at new game
- **Case code**: 6-character alphanumeric (player-visible for sharing/recovery)
- **3 named slots** per run with timestamps
- **Auto-save** every 20 choices (`G.choiceCount % 20 === 0`)
- **Import/Export**: JSON file download/upload
- **Migration**: Detect old `loa_save_*` localStorage keys, offer one-time migration dialog

---

## 11. Backstory & Character Creation

### 11.1 Five Narrative Groups

All 31 archetypes organize into 5 narrative groups. Each group has one backstory block with a distinct emotional hook. Infrastructure supports per-archetype and per-background variants in v0.2.

| Group | Archetypes | Emotional hook |
|---|---|---|
| **Combat** | Warrior, Knight, Ranger, Paladin, Archer, Berserker, Warden, Warlord, Death Knight | A squadmate or commanding officer who refused an order and disappeared |
| **Magic** | Wizard, Cleric, Priest, Necromancer, Illusionist, Inquisitor, Elementalist, Oracle | A teacher or researcher suppressed after studying Catastrophe-era forbidden history |
| **Stealth** | Rogue, Assassin, Spellthief, Scout, Thief, Trickster, Beastmaster | A contact or handler who went silent after learning too much |
| **Support** | Healer, Artificer, Engineer, Tactician, Alchemist, Saint | A patient or colleague who died suspiciously after helping the wrong person |
| **Bard** | Bard | A performer, story-keeper, or mentor whose records were specifically erased |

- Each archetype has a **different named person** and **different relationship flavor** (immersion + replayability)
- Backstory predates gameplay; defined at character creation
- Personal stake: they stumbled into the investigation AND someone they knew is named in the ledger

### 11.2 Character Creation Screen

- `create-narrative visible` element: renders character background narrative **only when all creation choices are complete**
- **During selection**: progressive text preview — each choice adds a sentence ("You are a Warrior. From the Principality of Shelk. Your past...") with remaining slots shown as "..." until filled
- Full narrative paragraph renders at completion

### 11.3 Backstory Delivery

- **Creation prose block**: 2–3 paragraph narrative at character creation completion
- **Fragments in play**: journal entries, NPC dialogue, and found documents reveal deeper backstory as the investigation progresses

---

## 12. Sideplot System

### 12.1 All Five Sideplots — Status & Requirements

| Sideplot | Locality | Stage | Required | Fix needed |
|---|---|---|---|---|
| `cosmoria_weight_fraud` | Cosmoria Harbor | 1–2 | **Yes** (Stage 2 gate) | Fix locality key: `cosmoria_harbor` → `cosmoria` in POOL_MAP |
| `fairhaven_mill` | Fairhaven | 1–2 | No | Add `isolation` clock increment paths |
| `guildheart_testimony` | Guildheart Hub | 1–2 | **Yes** (Stage 2 gate) | Already functional (watchfulness-gated) |
| `interim_seat` | Soreheim Proper | 1–2 | No | Full rewrite (see §12.2) |
| `shadow_ledger` | TBD (not Shelkopolis) | 3 | No | New design (see §12.3); Stage 2 hints only |

**Required sideplot rule**: Player-facing cue fires when the sideplot is required for progression. Sideplots must not be stage-locked by background starting locality in a way that prevents completion.

### 12.2 `interim_seat` Rewrite (Soreheim — Canon-Safe)

**Canon conflict**: Halversen doesn't exist in V33_1. Soreheim governance is stable Giant-led quota hierarchy with 11 named canonical officials (lead: Torma Ironslope). No civic deadlock exists.

**Rewrite direction**: Quota manipulation scheme using canonical Soreheim officials within V33_1's documented tensions (clan rivalry, resource theft, sabotage). A production output record is being altered — someone's contribution is being erased from the quota ledger, skimming credit from a clan's output. Mirrors the main campaign's suppression theme in an industrial context.

- **Available to**: Archetypes with Soreheim-starting backgrounds (Stages 1–2)
- **Note for future releases**: Extend to all archetypes in a later version
- **No Halversen**: Use canonical officials from the 11-person roster

### 12.3 `shadow_ledger` Design (Stage 3)

- **Criminal org**: Twice-Sealed — a Red Hood Guild front operation running permit forgery in a trade hub (not Shelkopolis)
- **Stage 2 hints**: Rumors, gossip, journal entries about suspicious permit seals and unpaid transit workers; Red Hood Guild contact Sel Stone as a rumor source
- **Stage 3 full sideplot**: Investigation of the Twice-Sealed operation and its connection to the main ledger suppression network
- **Note for future releases**: Full design and resolution

### 12.4 Sideplot Design Principles

- Short stage resolutions: 1–2 stages max
- Primarily sandbox extensions: expand exploration, give rumors/gossip/items as bonuses for main campaign
- NPC-driven: NPCs ask the player for help, leading to adjacent POI localities
- Some can be required for progression (player-facing cue fires)

---

## 13. Maren Oss Arc

### 13.1 Agenda — Option C: The Architect

Maren is protecting nothing (no attachments). She is selectively exposing the ledger — seeding information to different parties to set them against each other. She is using the player's investigation as proximate cause: she wants someone else to light the match so she can control what gets rebuilt.

**End state**: She wants control of the Collegium seat via a proxy she controls. Not power directly — control adjacent to power.

### 13.2 Stage Presence

| Stage | Maren's presence |
|---|---|
| 1 early | Her name mentioned by others; player finds indirect evidence she was somewhere |
| 1 mid | Indirect contact: a message left for someone, a shadow in the right place |
| 1 late | Brief presence: she is in the room but does not engage |
| 2 | Indirect evidence scene (finds her notes, learns she was recently at a location); NO face-to-face |
| 3 | Player discovers via found correspondence that she's been using them |
| 4 mid | First direct confrontation |

- Player gets notices when she progresses (world notices in right panel)
- Maren is unaware of the player until after Stage 2 indirect encounter
- No direct confrontation until mid-Stage 4

### 13.3 Stage 3 Discovery

Player finds a piece of correspondence (letter, cipher, encoded note) that makes clear she anticipated their investigation and has been routing information through them. Creates a three-way choice:
1. **Confront** her directly (escalates toward Stage 4 confrontation sooner)
2. **Use the leverage** against her (blackmail, control the narrative)
3. **Continue unknowing** (let her think the discovery hasn't happened)

### 13.4 `maren_oss_encounter.js` Rewrite

Current file has a direct face-to-face encounter at Guildheart Hub Archive (Stage 2). Rewrite as an **indirect evidence scene**:
- Player finds her notes/case file at the archive
- Three choices: study it thoroughly, take a copy, leave it undisturbed
- Sets appropriate flags (`maren_oss_profiled`, `maren_oss_trail_found`)
- No `maren_oss_encounter_done` — renames to `maren_oss_trail_found`

---

## 14. Locality Opening Narrations

### 14.1 Scope

All 18 Stage 1–2 localities need arrival narrations. These fire when a player **first visits** a locality (env-desc updates on every subsequent visit, but the arrival narration plays only once).

Env-desc updates on **every** location change and scene change with the current atmosphere.

### 14.2 Narrative Style Guide

Write as an observational travel narrative. Voice: a traveler quietly witnessing rather than explaining. Vivid, sensory, concise. Favor clear imagery over heavy metaphor.

Include most of: passing through, environmental/sensory details, local quirks and habits, visible cultural nuances, religious practices/deity rituals, greetings with locals, 1–2 brief local interactions.

Emotional tone through observable ways only. Second person as lens — no actions, possessions, or inner thoughts given to "you."

Fantasy elements: present in loose, vague, understated ways. World feels fantastical through implication, ritual, names, atmosphere — not exposition.

**Template structure** (from spec): `opening_image → terrain_material_feel → ambient_activity → visible_power_structure → local_interaction_1 → local_interaction_2 → closing_sensory`

### 14.3 Delivery

- `env-desc` element in left sub-column of center panel
- Updates on location change and scene change
- Scrollable if long; fixed width

---

## 15. Mid-Stage 1 Scope Reveal

At `investigationProgress` 5–6, a brief narrative beat fires showing the investigation is bigger than expected:
- A found document, an NPC reference, or an overheard conversation
- Hooks the player into Stage 2 before the Collegium summons arrives
- Less bureaucratic — emotional, human element (a family, a name, a face)

---

## 16. Sheresh & Soreheim Stage 1 Plots

Backgrounds starting in Sheresh Communes or Soreheim Alliance need their own Stage 1 arcs that:
1. Are fully canon-safe within V33_1
2. Echo the main plot's themes (suppression, erasure, institutional corruption)
3. Lead the player toward the Principalities by Stage 2

**Soreheim**: A quota/production record falsification scheme — a worker's contribution is being erased from output registries. A clan member's name has been suppressed. Mirrors the ledger's suppression mechanic in an industrial context. Player discovers a parallel suppression system and learns that Shelkopolis may be the origin.

**Sheresh Communes**: A collective memory registry has been expunged — a commune's shared record no longer contains a person. That person doesn't officially exist in commune history. Same theme, communal governance context. Leads to discovering the erasure connects to a wider pattern.

Both plots use canonical NPCs and factions from V33_1.

---

## 17. Alignment System — Neutral Workarounds

Two workarounds for the "stay neutral = optimal strategy" degenerate case:

**(a)** Neutral play gets a distinct NPC reaction tone — neither rewarded nor penalized, but narratively flavored: NPCs treat the player as unreadable, cautious around them, uncertain of their allegiance. Some doors stay closed to the truly neutral.

**(b)** At Stage 2 end, a neutral-arc resolution scene fires specifically for players near the neutral center on both axes. This scene offers a meaningful choice about committing or remaining undefined.

---

## 18. World Clocks — Increment Paths

### `omens` clock
Currently never incremented. Add increments on:
- Bold investigation choices (rare, +1)
- Maren progress notices (every other notice, +1)
- Catastrophe-related lore discoveries (+1)

### `isolation` clock
Currently never incremented (blocks `fairhaven_mill` sideplot). Add increments on:
- Failed social contact attempts (-1 no increment, but cumulative loneliness beats +1)
- Solo choices in Stage 1 (choosing not to engage NPCs repeatedly)
- Certain camp choices

---

## 19. Deferred Items

These are explicitly noted for v0.2 or post-"done" executing-plans phase:

| Item | Phase |
|---|---|
| File/folder architecture redesign (`/architecture-designer`) | executing-plans |
| `build_locality_matrix.py` spec (3) schema update | v0.2 infrastructure |
| Full leg-by-leg sequential routing UI with "Continue" prompt | v0.2 |
| Archetype investigation traits differentiation (per-archetype distinct options) | v0.2 |
| Backstory locality-layer variants (per starting locality within group) | v0.2 |
| Market intel XP drain (15–20 XP cost) | v0.2 |
| Level cap per stage (hard cap, no silent over-leveling) | v0.2 |
| Fog of war: plot-flag locality discovery without travel | v0.1 basic, v0.2 full |
| `shadow_ledger` Stage 3 full design and resolution | v0.2 |
| `interim_seat` non-Soreheim-background availability | future release |
| True permadeath option | v0.2+ |
| Nomdara caravan full mobile content | v0.2 |
| Bestiary per-biome population (full) | v0.2 |

---

## 20. Version

Build stays at **v0.1** until explicit instruction to increment. Version increments by 0.1 each release.

---

*Spec written 2026-04-21. All decisions confirmed through brainstorming session.*
