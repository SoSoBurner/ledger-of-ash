# FORBRAIN.md — Ledger of Ash Master Design Reference
*Generated 2026-04-20 from comprehensive codebase analysis + full review session*

---

## PART I: SYSTEM ARCHITECTURE

### Tech Stack
- **Runtime:** Browser (single-file HTML bundle) + Node.js (QA harness only)
- **Languages:** Vanilla JavaScript (ES5-compatible), HTML5, CSS3 with custom properties
- **Fonts:** Cinzel (display) + Crimson Pro (body) — bundled, no CDN dependency
- **Build:** `build.py` (Python) — assembles `dist/ledger-of-ash.html` from source files
- **Storage:** `localStorage` — auto-saves after every choice, 4-digit passcode system
- **QA:** `node quick_playtest.js` — 7 behavioral checkpoints, all passing

### File Structure
```
ledger-of-ash/
├── ledger-of-ash.html          # Master source (~9400 lines, 1.1MB)
├── dist/ledger-of-ash.html     # Built single-file bundle (2.6MB)
├── js/
│   ├── loa-enriched-bridge.js  # Core mechanics bridge (MOST IMPORTANT)
│   ├── world-data.js           # 31 archetypes, 93 backgrounds, faction data
│   ├── archetype-skills.js     # 31 archetypes × 60 skills, levels 1-20
│   ├── engine.js, combat.js, narrative.js, world.js, travel.js, scenes.js
│   ├── items.js, party.js, data.js
│   ├── background-locality-map.js, stage2-backgrounds.js
│   └── consequences.js
├── stage2_climax.js            # Stage II boss fight (IIFE module)
├── maren_oss_encounter.js      # Stage II Maren encounter (added this session)
├── bard_midspine.js            # Archetype-specific midspines (5 files)
├── combat_midspine.js
├── magic_midspine.js
├── stealth_midspine.js
├── support_midspine.js
├── nomdara_stage1/2_choices.js # Caravan faction choices
├── [18 locality]_stage1_enriched_choices.js  # 60-100+ choices each
├── [locality]_stage2_enriched_choices.js     # 20-60 choices each
├── [locality]_to_shelk_arc.js               # Travel arc pools (14-24KB)
├── stage1_additional_enriched_choices.js
├── stage2_enriched_choices.js
├── stage3_enriched_choices.js
├── quick_playtest.js           # QA harness — 7 checkpoints
├── build.py                    # Build script
├── package.json, nginx.conf, Dockerfile, docker-compose.yml
├── .github/workflows/          # CI/CD (GitHub Pages + itch.io)
└── 07_WORLD_GRAPH/             # World graph data directory
```

### Global State Object (window.G)
```js
window.G = {
  stage: 'Stage I' | 'Stage II' | 'Stage III',
  level: Number,                    // Character level (1-20)
  xp: Number,                      // Total XP earned
  dayCount: Number,                 // In-game days elapsed
  restCount: Number,                // Rests taken today (cap: 2)
  stageProgress: { 1: N, 2: N, 3: N }, // Per-stage advancement
  investigationProgress: Number,    // Stage III gate (needs ≥10)
  worldClocks: {
    pressure:     Number,           // General danger level
    rival:        Number,           // Maren Oss threat (0-10+)
    watchfulness: Number,           // Oversight Collegium awareness
    reverence:    Number,           // Spiritual/divine pressure
    omens:        Number,           // Supernatural atmosphere
    isolation:    Number            // Player solitude
  },
  flags: { [key]: Boolean },        // Persistent narrative/mechanical flags
  factionHostility: {               // Faction relationship tracking
    warden_order:        Number,
    iron_compact:        Number,
    oversight_collegium: Number
  },
  // Internal bridge state
  _dcPenalty: Number,               // Rival-derived roll penalty
  _lastDC: Number,                  // Last base DC used (for display)
  _lastRollTotal: Number,           // Last roll result
  _consecutiveSafeChoices: Number,  // Safe-choice streak counter
  _pendingBackupChoice: Object,     // Injected backup after fumble lock
  lastResult: String,               // Last narration text
  recentOutcomeType: String         // 'success'|'partial'|'failure'|'crit'
}
```

---

## PART II: GAME MECHANICS

### Character Creation

#### Archetypes (31 total)
Organized in 4 skill-group tiers:

| Group | Archetypes |
|-------|-----------|
| **Combat** (9) | Warrior, Knight, Ranger, Paladin, Archer, Berserker, Warden, Warlord, Death Knight |
| **Magic** (8) | Wizard, Cleric, Priest, Necromancer, Illusionist, Inquisitor, Elementalist, Oracle |
| **Stealth** (7) | Rogue, Assassin, Spellthief, Scout, Thief, Trickster, Beastmaster |
| **Support** (7) | Healer, Artificer, Engineer, Tactician, Alchemist, Saint, Bard |

Each archetype has: primary skill allocation (6 skills, 0-4 each), HP, starting gold, trait, role description, and 3 background options.

**Example — Bard:**
- Trait: "Captive Audience" — performance draws crowds, NPCs non-hostile for one scene
- Skills: persuasion +4, lore +3, stealth +2, craft +2, combat +1, survival +1
- HP: 16, Gold: 22
- Role: "recorder of events the powerful would prefer unrecorded"

#### Backgrounds (93 total — 3 per archetype)
Region-locked: each background ties the character to a specific locality and faction.

**Example — Warrior backgrounds:**
- `w_garrison` (Shelkopolis): Roadwardens +15, House Shelk +10, "Roadwarden Contact" ability
- `w_roaz_iron_guard` (Ithtananalor): Iron Accord +15, Roazian enforcement +10
- `w_frontier_hammer` (Soreheim): Frontier Hammer Companies faction tie

#### Skills (6 core)
`combat`, `survival`, `persuasion`, `lore`, `stealth`, `craft` — rated 0-4 per archetype.

**Normalization map** (content files may use these aliases, bridge resolves them):
```
investigation→lore   perception→survival   deception→stealth
empathy→persuasion   insight→lore          awareness→survival
arcane→lore          repair→craft          performance→persuasion
history→lore         nature→survival       religion→lore
```

---

### World Graph

#### 18 Main Localities + 7 Districts
```
Shelkopolis (capital)
  ├── Aurora Heights district
  ├── Ironspool Ward district
  └── Verdant Row district
Soreheim Proper (Giant Council region)
Aurora Crown Commune (Sheresh Domes)
Ithtananalor (Roazian territory)
Panim Haven (death registry governance)
Guildheart Hub (The Union trade hub)
Mimolot Academy (scholarship/tariff)
Fairhaven
Shirshal
Cosmoria
Harvest Circle
Glasswake Commune
Whitebridge Commune
Craftspire
Unity Square
Ironhold Quarry
Plumes End Outpost
Sunspire Haven
```

**Synthetic district types** (shared across settlements): High Quarter, Common Quarter, Low Ward.

**Travel Arcs:** Non-Shelk localities have `*_to_shelk_arc.js` files. Triggered when `investigationProgress >= 5` or `level >= 6`. 30-50 choices per arc.

**Nomdara Caravan:** Neutral cross-polity trade route faction. Separate choice pools (`nomdara_stage1/2_choices.js`). Available to characters with "Nomdara Transit Papers" (Archer/Rogue backgrounds). Provides alternative routing independent of House Shelk.

---

### Stage System

#### Stage I (Opening Investigation)
- `stageProgress[1]` threshold: **20**
- Content: 18 localities + 7 districts, archetype midspines
- Advance condition: `stageProgress[1] >= 20` + level threshold (level 6)
- Midspines fire during Stage I (archetype-specific 3-node chains)

#### Stage II (Active Investigation)
- `stageProgress[2]` threshold: **15**
- Content: Stage 2 enriched choice files, Maren Oss encounter (rival >= 4)
- Advance condition (Stage III gate): ALL of:
  - `G.flags.stage2_climax_complete === true`
  - `G.investigationProgress >= 10`
  - `G.flags.stage2_faction_contact_made === true`
  - `G.stageProgress[2] >= 15`

#### Stage III Gate (v0.1 blocker)
- When all Stage III conditions met: `showStage3Blocker()` fires
- Shows "Thank you for playing v0.1" modal
- Sets `G.flags.stage3_blocked = true`, stage stays at 'Stage II'
- Player returns to Stage II sandbox (all content remains accessible)

---

### World Clocks (6)

| Clock | Meaning | Key Triggers |
|-------|---------|-------------|
| `pressure` | General danger/intensity | Failed rolls, fumbles, faction hostility |
| `rival` | Maren Oss threat (0-10+) | Rest (+1), safe streak of 3 (+1), main plot fumble (+1) |
| `watchfulness` | Oversight Collegium awareness | Climax negotiation fail (+2), refuse summons (+1) |
| `reverence` | Spiritual/divine pressure | Faith-based choices, shrine interactions |
| `omens` | Supernatural atmosphere | Ritual choices, supernatural encounters |
| `isolation` | Player solitude | Solo investigation paths |

**Rival Clock Thresholds (`_RIVAL_THRESHOLDS`):**
- `rival >= 3`: "Word reaches you that Maren Oss, a licensed investigator, has been asking questions along the Ridgeway. She has a head start." (flag-gated, once)
- `rival >= 6`: "You arrive at the Guildheart Hub archive to find Maren Oss's business card on the archivist's desk. She was here this morning." (flag-gated, adds `dcPenalty: 1`)
- `rival >= 9`: "Maren Oss has submitted a partial report to the Oversight Collegium. The window is closing." (flag-gated, adds further `dcPenalty`)

**Lay_low:** Available when `rival >= 4`. Costs `rival -1` and (when `rival < 7`) `stageProgress -1`. When `rival >= 7`, no stageProgress cost (emergency triage, not strategic trade).

---

### Enriched Choice System

#### Choice Object Structure
```js
{
  id: String,          // Unique identifier
  cid: String,         // Choice ID (used for fumble locking keys)
  text: String,        // Button display text
  tag: 'safe'|'risky'|'bold',  // Risk tier
  plot: 'main'|'side', // Main vs side plot (fumble locking behavior)
  dc: Number,          // Difficulty class (0 for safe)
  skill: String,       // Skill to roll (normalized via SKILL_NORM)
  xpReward: Number,    // XP on success
  criticalSideplot: Boolean, // If true, fumble permanently closes this path
  __enrichedFn: Function    // Executes on choice selection
}
```

#### Risk Tier Mechanics
| Tag | Roll | stageProgress bonus | On fumble |
|-----|------|-------------------|-----------|
| `safe` | None (auto-success) | +0 (base only) | N/A |
| `risky` | d20 + skill vs DC | +2 on success | Lock + backup injection |
| `bold` | d20 + skill vs DC | +2 on success (+1 on crit) | Lock + backup injection |

#### Tag Derivation (`_TAG_RISK`)
Domain tags in content files are mapped to risk tiers:
- **Bold:** Combat, Confrontation, Infiltration, Ritual, Assassination, Accusation, Negotiation, Exposure, Betrayal, Tribunal
- **Safe:** Social, Rest, Trade, Observation, Research
- **Risky:** Everything else (default)

#### DC System
```
STAGE_DC_BASE:
  Stage I:   DC 10 (safe/social), DC 12 (risky/investigation), DC 14 (bold/confrontation)
  Stage II:  DC 12 / DC 14 / DC 16
  Stage III: DC 14 / DC 16 / DC 18

effectiveDC = baseDC + stageOffset + G._dcPenalty
roll total  = d20 + skillValue + bonus
```

#### Fumble Locking
- **Main plot fumble:** `G.flags['fumble_locked_' + cid] = true`. Backup choice injected via `G._pendingBackupChoice`. Backup gets DC−2 mercy rule (minimum DC 8).
- **Critical sideplot fumble:** Permanently locked + journal entry ("This path has closed.") + flag set.
- UI: Fumbled choices grayed with 1px gold left-border (`--gold-dim`). No tooltip.

#### Pool Maps
- `POOL_MAP_S1`: 18 localities + 7 districts (Stage I enriched choices)
- `POOL_MAP_S2`: 17 localities + districts + synthetic types (Stage II)
- `POOL_MAP_ARC`: Travel arcs (triggered by investigationProgress >= 5)
- Nomdara pools: Separate routing, stage-keyed

---

### Special Choice Handlers

#### `lay_low`
- Available in choice pool when `rival >= 4`
- `rival -= 1`
- `stageProgress[stageKey] -= 1` (only when rival < 7; emergency mode at rival >= 7)
- `lastResult`: "You go quiet — no meetings, no movement, no trail. The rival loses a step."
- `advanceTime(1)`

#### `rest_recover`
- Capped at 2× per in-game day (`G.restCount`)
- On third attempt: "You are too exhausted to rest again today." — no effect
- Increments rival clock (+1)
- Causal notice on first rest-triggered rival increment (one-shot)

#### `market_intel`
- Provides faction intelligence
- Writes to `stageProgress[stageKey]` (correctly keyed to current stage)

---

### Midspine System

5 archetype-group midspines run during Stage I as 3-node consequence chains before converging to the shared investigation spine.

| Midspine | Archetypes | Focus |
|---------|-----------|-------|
| Bard | Bard | Social/performance investigation thread |
| Combat | Warrior/Knight/Ranger... | Physical investigation approach |
| Magic | Wizard/Cleric... | Arcane/lore investigation thread |
| Stealth | Rogue/Assassin... | Covert investigation approach |
| Support | Healer/Artificer... | Faction/resource investigation thread |

**Example — Bard Node 1:** "Listen for the shape of the silence" (persuasion DC 10)
- Crit: `bardSpine = 'voice_found'`, +2 stageProgress, +10 XP
- Success: +1 stageProgress, +8 XP
- Fumble: pressure +2

Injected via `injectArchetypeMidSpineChoices()` in engine.js. Gate checks: archetype + stage + signal flags.

---

### Stage 2 Climax — Oversight Collegium Confrontation

Three-phase boss fight triggered when Stage III gate conditions met (minus `stage2_climax_complete`).

#### Phase 1 — The Summons
Inquisitor Orveth delivers sealed letter. Three choices:

| Choice | Skill | DC | Success | Failure |
|--------|-------|----|---------|---------|
| `climax_p1_negotiate` | persuasion | 14 | `stage2_climax_negotiated`, crit→`inquisitor_contact` | `person_of_interest` flag, watchfulness +2 |
| `climax_p1_deflect` | stealth | 13 | Collegium convinced | watchfulness +1, pressure +1 |
| `climax_p1_refuse` | — | 0 | Direct assertion | watchfulness +1, `stage2_climax_refused_summons` |

#### Phase 2 — The Revelation (300ms delay → phase3)
Seld (junior archivist) appears at night:
- Reveals: Ledger of ash = suppressed names (people erased from history)
- Someone inside Collegium protecting those names; someone hunting them
- Sets `stage2_revelation_received`; forces `investigationProgress = max(10, current)`

#### Phase 3 — The Resolution
Seld provides partial ledger copy. Three resolution paths:

| Choice | Skill | DC | Outcome |
|--------|-------|----|---------|
| `climax_p3_expose` | lore | 15 | Success: ledger reaches public, city fractured. Fail: intercepted, pressure +2 |
| `climax_p3_align` | — | 0 | Deliver to Orveth, `inquisitor_contact` flag |
| `climax_p3_withdraw` | — | 0 | Hide ledger, `resolution = 'withdraw'`, rival -2 |

`_closeClimax()` sets `stage2_climax_complete = true`, calls `checkStageAdvance()`.

---

### Maren Oss — Stage II Encounter

*Added this session — scripted single encounter, file: `maren_oss_encounter.js`*

**Trigger:** Stage II + rival >= 4 + `!maren_oss_encounter_done` + `!stage2_climax_started`

The player crosses paths at Guildheart Hub archive. Archivist mentions another investigator was there that morning.

| Choice | Skill | DC | Outcome |
|--------|-------|----|---------|
| Follow her trail | persuasion | 13 | Success: profile acquired (`maren_oss_profiled`), rival -1, 40 XP |
| Leave a false trail | deception/stealth | 11 | Success: rival -2, `maren_oss_misled`, 35 XP |
| Note and move on | observation | 0 | Auto-success: `maren_oss_confirmed`, 20 XP |

Sets `maren_oss_encounter_done = true` after any resolution.

---

## PART III: FACTIONS & NPCs

### Major Factions (12)
| Faction | Base | Notes |
|---------|------|-------|
| Oversight Collegium | Shelkopolis | Institutional authority; Inquisitor Orveth leads |
| Warden Order | Cross-polity | Law enforcement; Roadwardens subunit |
| House Shelk | Shelkopolis | Principalities nobility, trade route control |
| The Union | Guildheart Hub | Cross-polity merchant caravan, Nomdara operator |
| Office of Roazian Enforcement | Ithtananalor | Regional authority |
| House Panim | Panim Haven | Death registry governance |
| Sheresh Dome Stewards | Aurora Crown | Techno-religious administration |
| Iron Accord | Ithtananalor | Fortification governance |
| Engineers Consortium | Soreheim | Infrastructure, Giant Council adjacent |
| House Mimolot | Mimolot Academy | Knowledge/tariff governance |
| Frontier Hammer Companies | Soreheim | Labor-militia |
| Shadowhands | Underground | Covert network |

### Named NPCs
| NPC | Role | Where |
|-----|------|-------|
| **Inquisitor Orveth** | Oversight Collegium lead | Stage 2 climax Phase 1 |
| **Seld** | Junior archivist, informant | Stage 2 climax Phase 2 |
| **Maren Oss** | Licensed rival investigator | Rival clock notices + Stage II encounter |

---

## PART IV: REVIEW FINDINGS

*Full review session conducted 2026-04-20. Each review's top 2 recommendations listed.*

---

### Balance Review
**Core finding:** Safe-choice dominance — optimal play avoids risk entirely. Bold tag was dead code (no content set it; tag derivation was missing).

**Implemented fixes:**
- `dcPenalty: 1` at `rival >= 6` threshold (commit B1)
- `lay_low` mechanic added (commit B1)
- Bold tag derived from domain tags via `_TAG_RISK` — extended to include Accusation, Negotiation, Exposure, Betrayal, Tribunal (commit B2)

**Remaining recommendations:**
- None critical (B1/B2 fully addressed the issues)

---

### Level Design Review (×2)

**LD1 — Mystery hook:**
- Problem: No central mystery hook established in Stage I. Players don't know what the investigation is about.
- Fix implemented: Journal entry + world notice at game start (800ms after onboarding) revealing ledger of ash = register of erased names. (commit dd72587d)

**LD2 — Rival naming:**
- Problem: Rival clock threshold notices referred to "another investigator" — no character identity.
- Fix implemented: Threshold notices now name Maren Oss with physical presence (red-bound notebook, Guildheart Hub archive, partial Collegium report). (commit 67fad992)

**Remaining recommendations:**
- 1-2 foreshadowing choices before Stage 2 climax triggers ("boss antechamber" content)
- Scope reveal: A moment where the player realizes the rival clock has been running while they played it safe

---

### Mechanics Review

**Core findings:**
- `recentOutcomeType` mismatch blocked risky/bold stageProgress bonus (A1 — fixed)
- Bold tag derived from wrong source (A2 — fixed via B2)
- `stageProgress` hardcoded to `[1]` regardless of stage (A3 — fixed)
- `window.G` null guard ordering issue (A4 — fixed)
- `advanceTime` shim missing (A5 — fixed)
- Crit block used jade/green background instead of ember (B1-css — fixed)
- Duplicate CSS token declarations (B2-css — fixed)
- Notice-card CSS/JS state class mismatch (`seen` vs `unread`) (B3 — fixed)
- `.roll-result` font-family malformed (B4 — fixed)

**Pending recommendation:**
- Reverence should reduce DC at high values: at `reverence >= 7`, `effectiveDC -= 1` on social/persuasion checks (not yet implemented)

---

### Architecture Review (ADRs)

Four Architecture Decision Records written:
1. **ADR-001:** Single-file HTML distribution — correct for itch.io/GitHub Pages target
2. **ADR-002:** `window.G` schema — recommend formal schema validation in `patchGState()` before Stage III
3. **ADR-003:** Bridge split — recommend splitting `loa-enriched-bridge.js` into 3 focused files (routing, mechanics, special-handlers) — deferred
4. **ADR-004:** Content-as-behavior — enriched choice `__enrichedFn` pattern is sound; maintain the separation

**Pending recommendations:**
- Add `G_SCHEMA` validation to `patchGState()`
- Split bridge file (3-way: routing / mechanics / handlers)
- Surface `investigationProgress` as visible HUD element (also in fun reviews)

---

### Code Review — Completed Fixes

**Critical (resolved — commit 6ff8f8e1):**
- `URL.revokeObjectURL` sync race on Firefox/Safari → deferred 1000ms
- `gainXp`/`gainXP` casing mismatch → standardized to `gainXp`

**Important (pending from final code review):**
- `lay_low` routing: should be in `handleChoice` not relying on empty-fn guard
- `stage2_climax.js`: Remove 300ms setTimeout in `phase2()` — call `phase3()` directly
- `stage2_climax.js`: Use `window.renderChoices` instead of bare name
- `checkRivalClock()` called during render (side-effect-in-view pattern) — should move to post-execution

---

### Fun Review (×2)

**Fun type profile:**
- Mimicry (HIGH): Investigator role-play, archetype identity
- Alea (MEDIUM-LOW): d20 outcomes, poorly controlled variance
- Agon (MEDIUM): Rival clock competition, but Maren Oss was mechanic not character
- Ilinx (ABSENT): Intentional for text-only format

**Flow blockers identified:**
1. Hidden incentive chains — investigationProgress invisible, safe-streak trigger hidden
2. Cascade spiral can spike challenge beyond player control (fumble + rival)
3. Safe-choice dominance (before rival clock fixes)

**Two highest-leverage changes:**
1. **"Case File: X/10" HUD meter** for investigationProgress — closes broken incentive chain
2. **DC shown in choice button before commitment** — converts blind gamble to informed risk

*Both in progress via HUD agent (a0e0233d6333726b3)*

---

### Economy Review

**Core finding:** No converter decisions exist. Every choice produces XP AND stageProgress simultaneously — no resource allocation dilemma. XP accumulates with no drain; becomes irrelevant between milestones.

**Two highest-leverage changes:**
1. **Decouple XP from stageProgress:** Some choices should yield high XP / low stageProgress (tangential deep dives) vs. high stageProgress / low XP (direct investigation). Currently they always travel together.
2. **Add XP drain via contact costs:** `market_intel` should cost 15-20 XP rather than being free — gives XP a sink, makes intel feel costly.

*Not yet implemented.*

---

### Tutorial Review

**Core finding:** Five-page upfront onboarding teaches before context exists — all forgotten by the time mechanics fire. Two critical explicit systems are untaught at the moment they become relevant.

**Critical teaching gaps:**
1. Rival clock *triggers* (safe streak of 3, rest, fumble) are completely untaught — only consequences are shown
2. Fumble backup injection has no signal — player doesn't know why a new choice appeared
3. Front-loaded onboarding violates "proximity between instruction and application" principle

**Two highest-leverage changes:**
1. **Per-tier contextual teaching at first encounter** — replace 5 onboarding pages with one-line labels on first safe/risky/bold choice encountered
2. **Causal narration when rival ticks** — "You've played it safe three times running. Word reaches Maren Oss's contacts." (one-shot, flag-gated, at the trigger moment)

*Causal narration in progress via bridge agent (ac1d74a3d4be6b85d)*

---

### Randomness Review

**Core finding:** Output randomness (d20 after commitment) is asymmetrically punishing. Nat-1 (fumble lock, permanent) is far more severe than Nat-20 bonus (minor, ephemeral). No controlled variance — no mercy rules, pity timers, or bag systems. Skill modifiers don't reduce fumble rate (5% always, nat-1 is always failure in d20 systems).

**Two highest-leverage changes:**
1. **Backup choices get DC−2 mercy rule** — when fumble injects backup, reduce its DC by 2 (min 8). Recovery path is better than blind retry.
2. **Show DC in choice button before commitment** — converts blind commitment to informed risk assessment.

*DC−2 mercy rule in progress via bridge agent. DC display in progress via HUD agent.*

---

### Appeal & Engagement Review

**Appeal type profile:**
- Strong: Identity (investigator), discovery/secrets, narrative/story, world exploration
- Absent: Tactile, transgressive, strict puzzle-solving

**"But" test (appeal):** "It's a political investigation in a fantasy world BUT the thing you're hunting is a register of people whose names were erased from history." — PASSES. Tonal contrast (bureaucratic ledger + destruction) is the title itself.

**Core finding:** Appeal is real but invisible. The 3-second comprehension test fails — text RPG gameplay footage shows choice buttons, not the game's appeal. Maren Oss was a dcPenalty counter, not an antagonist.

**Two highest-leverage changes:**
1. **Typography-forward key art** — "Ledger of Ash" in Cinzel on ember-dark background + one-line premise copy. This IS the entire visual appeal layer for itch.io/social.
2. **Direct encounter with Maren Oss** — scripted Stage II scene that transforms her from a pressure mechanic into an antagonist with relationship context.

*Maren Oss encounter in progress via encounter agent (abe202b6146364f36). Key art not yet implemented.*

---

### Feedback Loop Review

**Loop inventory:**
1. **Bold choice positive** — success → stageProgress+, advance faster (POSITIVE, visible)
2. **Safe choice rival negative** — streak of 3 → rival++, dcPenalty escalates (NEGATIVE, HIDDEN trigger)
3. **Fumble cascade** — fumble → locked choice + rival++ → harder rolls → more fumbles (NEGATIVE downward spiral)
4. **XP milestone** — choice → XP → level thresholds (POSITIVE, weak amplification)
5. **Rival pressure ratchet** — rest/fumble/safe-streak → rival++ → dcPenalty (NEGATIVE, cascades with Loop 3)

**Critical problems:**
1. **Mixed signal:** Safe streak trigger is hidden → safe choices appear safe but secretly feed rival pressure. Players cannot read the "but" they're supposed to feel.
2. **Cascade spiral has no hard stop:** Loops 3+5 compound (fumble → locked + rival++) with lay_low as the only exit, but lay_low costs stageProgress that's already scarce in the spiral.
3. **Loop visibility inconsistent:** Bold→stageProgress (visible), XP→level (visible), safe streak→rival (HIDDEN), dcPenalty from rival threshold (hidden/documentation-only).

**Two highest-leverage changes:**
1. **Safe-streak counter visible in HUD** — shows `_consecutiveSafeChoices` count (1, 2) near rival clock. Converts hidden trigger to legible loop. *In progress via HUD agent.*
2. **lay_low stageProgress exemption at rival ≥ 7** — removes the stageProgress cost when rival is critical, preventing the inescapable spiral. *In progress via bridge agent.*

---

## PART V: IMPLEMENTATION LEDGER

### Completed This Session (commits in order)

| SHA | What |
|-----|------|
| `df703954` | Fumble locking — main plot locks, backup injection, critical sideplot |
| `d8932904` | dcPenalty clobber bug fix — checkClockThresholds as single source |
| `e26a4c62` | DC display fix — effectiveDC shown not base _lastDC |
| `4450df3c` | QA playtest harness — 7 checkpoints, all passing |
| `575d9de8` | B1: rival >= 6 dcPenalty + lay_low mechanic |
| `53316d8a` | B2: Bold tag extended to social/investigation domains |
| `766bc553` | P1: CSS token fixes — --white, --ink-mid, --modal-bg, #ff8840 → ember-hi |
| `dd72587d` | LD1: Mystery hook — ledger of ash = register of erased names |
| `67fad992` | LD2: Rival named Maren Oss in all threshold notices |
| `6ff8f8e1` | Critical fixes: revokeObjectURL race, gainXp casing |

### In Progress (agents running)

| Agent | Task | File |
|-------|------|------|
| `a0e0233d` | HUD: safe-streak counter + Case File meter + DC in choices | ledger-of-ash.html |
| `ac1d74a3` | Bridge: lay_low rival-7 exemption + backup DC-2 + causal rival narration | js/loa-enriched-bridge.js |
| `abe202b6` | Maren Oss scripted Stage II encounter | maren_oss_encounter.js |

### Pending (identified, not yet implemented)

| Priority | What | Source |
|----------|------|--------|
| HIGH | Reverence >= 7 reduces social/persuasion DC by 1 | Mechanics review |
| HIGH | Typography key art (Cinzel + ember + premise copy) | Appeal review |
| MEDIUM | Per-tier contextual teaching (replace upfront onboarding pages) | Tutorial review |
| MEDIUM | Decouple XP from stageProgress in converter design | Economy review |
| MEDIUM | XP drain via market_intel contact cost (15-20 XP) | Economy review |
| MEDIUM | Boss antechamber content (1-2 foreshadowing choices before Stage 2 climax) | Level design review |
| LOW | `lay_low` routing via `handleChoice` instead of empty-fn guard | Code review |
| LOW | stage2_climax.js: remove 300ms setTimeout in phase2() | Code review |
| LOW | stage2_climax.js: use window.renderChoices not bare name | Code review |
| LOW | checkRivalClock() moved out of render path | Code review |
| LOW | G_SCHEMA validation in patchGState() | Architecture review |
| LOW | Split loa-enriched-bridge.js into 3 focused files | Architecture review |
| LOW | Fumble backup injection: add signal/label ("Another path opens...") | Tutorial review |

---

## PART VI: DESIGN PILLARS

### What the Game Is
*"You are a licensed investigator uncovering a conspiracy to erase people from the historical record, racing against a rival who's one step ahead."*

A text RPG where:
- Every mechanic is in-fiction (you play AN INVESTIGATOR, not a character who does investigation)
- Risk is a persistent, legible choice (safe/risky/bold, not hidden difficulty modes)
- Consequences are permanent (fumble locking removes options, they don't come back)
- The rival makes you feel the clock (Maren Oss is a named antagonist with presence, not a number)
- The world has 18 real places with real factions and real travel costs

### Core Tensions (The "But" Tests)
- "Advance the investigation BUT bold moves risk permanent path closure"
- "Play it safe BUT safe play lets Maren Oss gain ground"
- "Go quiet (lay_low) BUT going quiet costs investigation progress"
- "Reveal the ledger BUT revealing it fractures the city you're operating in"

### Flow Conditions Required
1. Player can see their progress toward goals (stageProgress bar ✓, investigationProgress ← fixing)
2. Player understands what causes the rival to advance (safe streak ← fixing visibility)
3. Player can make informed risk decisions (DC shown before commitment ← fixing)
4. Fumble cascade has a recovery path (lay_low with sensible cost ← fixing threshold)
5. Maren Oss feels like a person the player is racing (encounter scene ← in progress)

### What Is Not This Game
- Not a combat game (combat exists but is one archetype cluster among four)
- Not a puzzle game in the strict sense (no deductive logic; investigation is narrative/social)
- Not a roguelike (no run resets; all state is persistent and permanent)
- Not a visual novel (d20 mechanics create genuine uncertainty, not branching story trees)
- Not a management sim (world clocks are pressure, not resource optimization targets)

---

## PART VII: CANONICAL LORE ANCHORS

### The Central Mystery
The **Ledger of Ash** is not a debt record. It is a register of suppressed names — people deliberately erased from the historical record by institutional powers. Someone inside the Oversight Collegium is protecting those names. Someone else is hunting them. The player's investigation sits between these two forces.

### Key Narrative Beats
1. **Game start (Stage I):** Journal entry reveals the ledger's true nature — not financial records but identity erasure.
2. **Rival established (rival >= 3):** Maren Oss named — licensed investigator, methodical, red-bound notebook.
3. **Maren Oss encounter (Stage II, rival >= 4):** Player crosses paths with her at Guildheart Hub. Relationship established (profiled / misled / noted).
4. **Climax Phase 1 (Stage II late):** Inquisitor Orveth summons player — Collegium confrontation.
5. **Climax Phase 2:** Seld reveals the full truth — ledger = erased names. investigationProgress forced to 10.
6. **Climax Phase 3:** Resolution choice — expose, align, or withdraw. Each shapes Stage III hooks.
7. **Stage III blocker:** "Thank you for playing v0.1" — Stage II sandbox continues.

### Faction Dynamics
- **Oversight Collegium** wants to contain the ledger (institutional self-preservation)
- **Warden Order** enforces Collegium decisions (law-aligned, not corruption-aligned)
- **House Shelk** benefits from the suppressed names (trade route control depends on who isn't recorded)
- **The Union / Nomdara** operates outside Collegium jurisdiction — neutral but informed
- **Shadowhands** knows more than they let on

---

*FORBRAIN.md — last updated 2026-04-20 — regenerate after major content additions*
