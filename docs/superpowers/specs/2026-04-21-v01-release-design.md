# Ledger of Ash — V0.1 Release Design Spec

*Synthesized 2026-04-21 from: FORBRAIN.md, LoA Content 04192026 deployment specs, V33 world repository, Pantheon lore, Broad History, Soreheim Alliance doc, Gwybodaeth's Missing Text, celestial/astral essays, 12 game design + code reviews.*

---

## 1. Game Identity

**The pitch:** You are a licensed investigator uncovering a conspiracy to erase people from the historical record, racing against a rival who is one step ahead.

**The "but" that makes it interesting:** "It's a political investigation in a fantasy bureaucracy BUT the thing you're hunting is a register of people whose names were deliberately erased from history — and the erasure goes all the way up."

**V0.1 scope:** Playable through Stage I + Stage II. Stage III triggers a "Thank you for playing v0.1" blocker. Stage II sandbox remains accessible after the blocker. Estimated play time: 2–4 hours to Stage III gate.

**Platform:** Single-file HTML, itch.io + GitHub Pages.

**Lore resonance (for writers/designers):** The Ledger of Ash as a concept echoes the cosmological conspiracy at the top of the pantheon — Vonalzo (god of Ambition) has been literally erasing other gods from divine memory by absorbing their shards, while Gwybodaeth (goddess of Knowledge) searches for data she can feel is missing. The player character is doing at the mortal level what Gwybodaeth does at the divine: finding what was deliberately removed from the record. This is the hidden depth layer, not player-facing, but it should inform every piece of narration.

---

## 2. Core Mechanic Systems

### 2.1 Roll System

| Element | Value |
|---------|-------|
| Dice | d20 + skill modifier |
| Skill range | 0–4 per archetype |
| Stage I DC | 10 (safe/social) / 12 (risky) / 14 (bold) |
| Stage II DC | 12 / 14 / 16 |
| Stage III DC | 14 / 16 / 18 |
| Effective DC | baseDC + stageOffset + G._dcPenalty |
| Crit success | Natural 20 |
| Fumble | Natural 1 |

**Status:** Implemented. DC shown in choice buttons before commitment (in progress via HUD agent).

**Pending design decision:** Does nat-1 always fumble regardless of skill, or should a high-enough total override? (Current: nat-1 always fumbles — 5% fumble rate regardless of build. Intentional or should elite characters reduce fumble risk?)

### 2.2 Risk Tiers

| Tag | Roll | stageProgress | On fumble |
|-----|------|--------------|-----------|
| `safe` | None — auto-success | base only | N/A |
| `risky` | d20 + skill vs DC | +2 on success | Lock choice + inject backup |
| `bold` | d20 + skill vs DC | +2 on success (+1 on crit) | Lock choice + inject backup |

**Tag derivation from domain:**
- **Bold:** Combat, Confrontation, Infiltration, Ritual, Assassination, Accusation, Negotiation, Exposure, Betrayal, Tribunal
- **Safe:** Social, Rest, Trade, Observation, Research
- **Risky:** Everything else (default)

**Status:** Implemented. Bold tag derivation extended to include Accusation/Negotiation/Exposure/Betrayal/Tribunal.

### 2.3 Fumble Locking

- **Main plot fumble:** Choice grayed with gold left-border. DC−2 backup choice injected. Minimum backup DC: 8.
- **Critical sideplot fumble:** Permanently locked. Journal entry: "This path has closed." Flag set. No backup.
- UI signal needed: "Another path opens..." narration on backup injection (not yet implemented).

**Status:** Locking implemented. DC−2 backup rule in progress. Visual signal pending.

### 2.4 World Clocks (6)

| Clock | Display name | Range | Visible to player |
|-------|-------------|-------|------------------|
| `rival` | Maren Oss (rival progress) | 0–10+ | Partially — threshold notices, pending full HUD |
| `pressure` | Danger level | 0–10+ | No |
| `watchfulness` | Collegium Awareness | 0–10+ | No |
| `reverence` | Spiritual Pressure | 0–10+ | No |
| `omens` | Supernatural Atmosphere | 0–10+ | No |
| `isolation` | Solitude | 0–10+ | No |

**Rival clock thresholds (player-facing notices):**
- `rival >= 3`: Maren Oss named, asking questions along the Ridgeway. Red-bound notebook detail.
- `rival >= 6`: Her business card found at Guildheart Hub archive. dcPenalty +1 applied.
- `rival >= 9`: Partial report filed with Oversight Collegium. Further dcPenalty.

**Rival clock triggers:**
- Rest: +1
- Safe-choice streak of 3: +1 (causal narration fires at trigger moment)
- Main plot fumble: +1
- Lay_low: −1

**Status:** Clocks implemented. Causal narration at safe-streak trigger in progress (bridge agent).

### 2.5 Lay_Low

- Available when `rival >= 4`
- `rival -= 1`
- `stageProgress[current] -= 1` ONLY when `rival < 7` (emergency mode at rival ≥ 7 = no stageProgress cost)
- Narration: "You go quiet — no meetings, no movement, no trail. The rival loses a step."
- Advances time by 1 day

**Status:** Implemented. Rival ≥ 7 stageProgress exemption in progress (bridge agent).

### 2.6 Stage Progression

| Stage | Advance threshold | Level gate | Content unlocked |
|-------|------------------|-----------|-----------------|
| Stage I | stageProgress[1] >= 20 | Level 6 | 18 localities, 7 districts, archetype midspines |
| Stage II | stageProgress[2] >= 15 | — | Stage II enriched choices, Maren encounter, climax |
| Stage III | All S2 conditions + stage2_climax_complete | — | Blocker fires → V0.1 end |

**Stage III gate conditions:**
1. `G.flags.stage2_climax_complete === true`
2. `G.investigationProgress >= 10`
3. `G.flags.stage2_faction_contact_made === true`
4. `G.stageProgress[2] >= 15`

**Status:** Implemented. Stage III blocker implemented.

### 2.7 XP and Leveling

| Metric | Value |
|--------|-------|
| Total XP target (full game) | ~20,000 |
| Stage caps | S1: Level 5, S2: Level 10, S3: Level 15, S4: Level 18, S5: Level 20 |
| Meaningful choices | ~220 @ 68 XP each |
| Lesser choices | ~1,000 @ 5 XP each |
| Level-up effect | Unlocks skills per archetype table |

**XP/stageProgress decoupling (pending):** Some choices should yield high XP / low stageProgress (deep dives, tangential investigation) vs. high stageProgress / low XP (direct moves). Currently they always travel together. This is the single highest-leverage economy change for V0.1.

**Market intel XP drain (pending):** `market_intel` action should cost 15–20 XP. First true XP sink, creates real currency competition.

### 2.8 Locality Heat (pending implementation)

**Replaces:** Standing system.

**Design:** Dual-axis alignment tracking per locality.
- **Axis 1:** Benevolent ↔ Cruel (how you treat people)
- **Axis 2:** Order ↔ Anarchy (how you treat institutions)
- **Range:** −90 to +90 signed integer per locality
- **Decay:** 1 point per in-game day toward neutral
- **Effect:** High Heat unlocks faction-specific enriched choices, modifies NPC greeting behavior

**Status:** Specified. Not yet implemented. Decision needed: Is Heat V0.1 or post-V0.1?

### 2.9 Reverence Modifier

At `worldClocks.reverence >= 7`, reduce effectiveDC by 1 on social and persuasion checks.

**Status:** Specified. Not yet implemented.

### 2.10 Archetype Reorganization

**Current labels in code:** Combat / Magic / Stealth / Support
**Target labels per deployment spec:** Physical / Arcane / Stealth / Support

**31 archetypes organized as:**

| Group | Archetypes |
|-------|-----------|
| **Physical** (formerly Combat, 9) | Warrior, Knight, Ranger, Paladin, Archer, Berserker, Warden, Warlord, Death Knight |
| **Arcane** (formerly Magic, 8) | Wizard, Cleric, Priest, Necromancer, Illusionist, Inquisitor, Elementalist, Oracle |
| **Stealth** (7) | Rogue, Assassin, Spellthief, Scout, Thief, Trickster, Beastmaster |
| **Support** (7) | Healer, Artificer, Engineer, Tactician, Alchemist, Saint, Bard |

**Note:** User previously expressed preference for Physical / Arcane / Stealth as primary group names. Confirm whether Support becomes a fourth named group or collapses into one of the others.

**Status:** Design confirmed. Rename not yet applied to code.

### 2.11 Magical Items (pending)

Per deployment spec, 8 item classes. Details not yet fully specified. Must-have for V0.1 if the economy review's recommendation for a "meaningful XP sink" item system is adopted.

**Known item classes from spec:** (8 total, class names not yet confirmed)

**Status:** Specified at category level. Needs full item table.

---

## 3. Player-Facing UI

### 3.1 HUD Elements (current + pending)

| Element | Status | Notes |
|---------|--------|-------|
| Stage progress bar | Implemented | Shows stageProgress[current]/threshold |
| XP / Level display | Implemented | — |
| Day counter | Implemented | — |
| Rest counter | Implemented | Shows rests used today (cap: 2) |
| World notices | Implemented | Push-notification cards, seen/unread state |
| DC in choice buttons | In progress (HUD agent) | Shows effectiveDC before commitment |
| Case File meter | In progress (HUD agent) | Shows investigationProgress as "Case File: X/10" |
| Safe-streak counter | In progress (HUD agent) | Shows _consecutiveSafeChoices near rival clock |
| Rival clock (full) | Partially done | Threshold notices fire; dedicated HUD indicator pending |
| Fumble signal | Pending | "Another path opens..." narration on backup injection |

### 3.2 Character Creation

**Flow:**
1. Choose archetype (grouped by Physical / Arcane / Stealth / Support)
2. Choose background (3 per archetype, region-locked with faction starting relationships)
3. See: HP, Gold, Trait, starting skills, faction relationships
4. Enter name (4-digit passcode ties save to name)

**Per-tier contextual teaching (pending — replaces 5-page upfront onboarding):**
- On first safe choice encountered: one-line label "Safe choices always succeed. No roll."
- On first risky choice: "Risky choices roll d20 + your skill vs DC [N]. Success/partial/failure."
- On first bold choice: "Bold choices carry real risk. A fumble locks this path permanently."
- These fire in-narrative, not as tutorial screens.

### 3.3 Choice Rendering

**Each choice button shows:**
- Choice text
- Domain tag (e.g., "Persuasion · Bold")
- Effective DC (e.g., "DC 14") — pending HUD agent
- Skill used
- XP reward on success

**Fumbled choices:**
- Grayed with 1px gold left-border
- No tooltip (intended)
- If critical sideplot: labeled "Closed" in small text below

### 3.4 Roll Result Display

Four outcome tiers rendered in narrative:
- `crit` — ember/gold coloring
- `success` — standard success color
- `partial` — amber / "near-success" tier (pending: partial outcome should produce a meaningful reduced-stakes result, not just failure narration)
- `failure/fumble` — muted, gray

**Status:** Crit/success/failure implemented. Partial outcome tier as genuine third state (not just flavor on failure) is a pending design decision.

### 3.5 Narration / Observation Block UI (pending)

Per narration/UI rewrite spec, structured observation blocks replace flat narration walls. Slots:

| Slot | Content |
|------|---------|
| `opening_image` | First visual frame of arriving at a location |
| `terrain_material_feel` | Ground, air, physical sensation |
| `ambient_activity` | What people are doing |
| `visible_power_structure` | Who has authority here |
| `common_labor_or_traffic` | Economic texture |
| `outsider_friction` | How the investigator is perceived |
| `local_threat_pressure` | Active danger |
| `beast_ecology_pressure` | Wilderness/environmental threat layer |
| `sensory_close` | Closing sensory beat before choices render |
| `district_poi_differentiator` | What makes this sub-location distinct |

**Status:** Template slots specified. Not yet wired into rendering engine.

### 3.6 Typography Key Art (pending — HIGH priority)

**Spec:** "Ledger of Ash" rendered in Cinzel on a full-bleed ember-dark background (`#1a0a00` or similar), subtitle "A text RPG about what gets left out of the record," clean dark-mode layout. This is the itch.io thumbnail, social share image, and game load screen. Currently the game's visual first impression is a blank loading screen.

---

## 4. Plots & Narrative Structure

### 4.1 Central Mystery

The **Ledger of Ash** is a register of suppressed names — people deliberately erased from historical and administrative records by institutional powers. Someone inside the Oversight Collegium is protecting those names. Someone else (Maren Oss) is hunting them for competing interests. The player sits between these two forces.

**Lore depth layer (non-player-facing):** This mirrors the divine conspiracy — Vonalzo (Ambition) has been erasing gods from the divine record by absorbing their essence-shards. Gwybodaeth (Knowledge) suspects data is missing but can't locate what. The player character is the mortal analog of Gwybodaeth: finding what was removed. This resonance is available for writers but should never be stated directly to the player.

### 4.2 Stage I — Opening Investigation

**Player situation:** Newly arrived investigator, licensed but not yet known, beginning to map the conspiracy.

**Narrative arc:**
- Game start → journal entry reveals Ledger of Ash = register of erased names (not financial records)
- 18 localities × Stage I choice pools (60–100+ choices each)
- 7 districts (Aurora Heights, Ironspool Ward, Verdant Row in Shelkopolis + 4 others)
- 5 archetype midspines (3-node consequence chains before converging to shared investigation spine)
- Rival clock begins ticking; first Maren Oss notice at `rival >= 3`
- Stage I complete at stageProgress[1] >= 20 + level >= 6

**Midspine summaries:**

| Midspine | Focus | First node example |
|---------|-------|--------------------|
| Physical | Direct confrontation / enforcement contacts | Find the guard who let someone through without documentation |
| Arcane | Archive and ritual investigation | Decode the sigil on the suppressed record |
| Stealth | Covert surveillance / information theft | Lift the archivist's notes without being seen |
| Support | Faction resource / NPC network | Trade a favor with the Nomdara caravan for a ledger fragment |
| Bard | Social/performance route | Listen for the shape of the silence |

### 4.3 Stage II — Active Investigation

**Player situation:** The rival is real and named. The Collegium has noticed you. The conspiracy has a face.

**Narrative arc:**
1. Stage II enriched choices (per locality, escalated DCs)
2. Travel arcs (triggered at investigationProgress >= 5 or level >= 6) — 30–50 choices per arc, non-Shelk localities traveling toward Shelkopolis
3. `rival >= 4` → Maren Oss scripted encounter at Guildheart Hub archive (three resolution paths)
4. `rival >= 6` → Collegium Awareness escalates; dcPenalty +1
5. Boss antechamber content (1–2 foreshadowing choices before climax triggers) — PENDING
6. Stage 2 Climax — Oversight Collegium Confrontation (three phases)
7. Stage III gate triggers → V0.1 blocker

### 4.4 Stage 2 Climax — Oversight Collegium Confrontation

**Phase 1 — The Summons (Inquisitor Orveth):**

| Choice | Skill | DC | Success | Failure |
|--------|-------|----|---------|---------|
| Negotiate | persuasion | 14 | `stage2_climax_negotiated`, crit → `inquisitor_contact` | `person_of_interest`, watchfulness +2 |
| Deflect | stealth | 13 | Collegium convinced | watchfulness +1, pressure +1 |
| Refuse | — | 0 (bold) | Direct assertion | watchfulness +1, `stage2_climax_refused_summons` |

**Phase 2 — The Revelation (Seld, junior archivist):**
- Seld appears at night; reveals ledger = suppressed names
- Someone inside Collegium protecting names; someone hunting them
- Sets `stage2_revelation_received`; forces `investigationProgress = max(10, current)`

**Phase 3 — The Resolution:**

| Choice | Skill | DC | Outcome |
|--------|-------|----|---------|
| Expose | lore | 15 | Success: ledger public, city fractured. Fail: intercepted, pressure +2 |
| Align (Orveth) | — | 0 | `inquisitor_contact` flag; Collegium path for Stage III |
| Withdraw | — | 0 | Hide ledger, `resolution = 'withdraw'`, rival −2 |

**Critical bug pending fix:** `window.renderChoices()` in stage2_climax.js re-enters enriched bridge wrapper, causing boss choices to be padded with random enriched choices. Must use private render or guard before V0.1 ship.

### 4.5 Maren Oss — Stage II Encounter

**Trigger:** Stage II + `rival >= 4` + `!maren_oss_encounter_done` + `!stage2_climax_started`

**Location:** Guildheart Hub archive

| Choice | Skill | DC | Outcome |
|--------|-------|----|---------|
| Follow her trail | persuasion | 13 | `maren_oss_profiled`, rival −1, 40 XP |
| Leave a false trail | stealth | 11 | rival −2, `maren_oss_misled`, 35 XP |
| Note and move on | — | 0 | `maren_oss_confirmed`, 20 XP |

**One-plot constraint:** Maren Oss encounter cannot fire if climax has started. She has one narrative purpose in V0.1 — establishing her as a person before the endgame.

### 4.6 Side Plots (pending)

Per deployment spec, locality-specific side plots that:
- Must be collected through travel (not available remotely)
- Have their own stageProgress-independent flags
- Provide XP and lore depth without advancing the main investigation clock

**Known framework:** Defined in `ledger_of_ash_sideplot_llm_deploy_spec.md`. Individual side plots per locality not yet authored for V0.1 content.

**Decision needed:** How many side plots ship with V0.1? Minimum viable = 1 per tier (Stage I, Stage II). Full = 1 per locality (~18).

---

## 5. World & Labels

### 5.1 Polity Hierarchy

```
Umbrella polity → Parent polity → Macroregion/environment → Locality → District/Sublocation
```

| Umbrella | Parent polities |
|----------|----------------|
| The Principalities | Principality of Shelk, Cosmouth, Shirsh, Roaz, Zootia, Mimolot, The Union |
| Sheresh Communes | (Aurora Crown and related) |
| Soreheim Alliance | (Soreheim Proper and Giant Council territories) |
| Psanan | (separate governance) |
| Nomdara | Mobile caravan, cross-polity (no fixed umbrella) |

### 5.2 18 Main Localities

| Locality | Polity | Notes |
|----------|--------|-------|
| Shelkopolis | Principality of Shelk | Capital, 3 districts: Aurora Heights, Ironspool Ward, Verdant Row |
| Soreheim Proper | Soreheim Alliance | Giant Council seat, Titan Towers |
| Aurora Crown Commune | Sheresh Communes | Sheresh Domes, techno-religious |
| Ithtananalor | Principality of Roaz | Roazian enforcement hub, Veilforged Bastion |
| Panim Haven | House Panim | Death registry governance, star-mediation rites |
| Guildheart Hub | The Union | Cross-polity merchant trade hub |
| Mimolot Academy | Principality of Mimolot | Knowledge, tariff, Gwybodaeth's scribes |
| Fairhaven | (confirm) | — |
| Shirshal | Principality of Shirsh | — |
| Cosmoria | Principality of Cosmouth | Mariners, grand libraries, constellation mapping |
| Harvest Circle | (confirm) | — |
| Glasswake Commune | Sheresh Communes | — |
| Whitebridge Commune | Sheresh Communes | — |
| Craftspire | (confirm) | — |
| Unity Square | The Union | — |
| Ironhold Quarry | (confirm) | — |
| Plumes End Outpost | (confirm) | — |
| Sunspire Haven | (confirm) | — |

### 5.3 Synthetic Districts

For large settlements (city / metropolis / floating metropolis / macro-capital core) without canon district structure:
- **High Quarter** — Prestigious temples, high courts, elite guild halls, formal archives
- **Common Quarter** — Markets, inns, workshops, social halls
- **Low Ward** — Repair yards, labor-heavy service, crowded support spaces

Shelkopolis has canon districts (Aurora Heights, Ironspool Ward, Verdant Row) and does not use synthetic types.

### 5.4 Key Factions (12)

| Faction | Base | Role in V0.1 |
|---------|------|-------------|
| Oversight Collegium | Shelkopolis | Main antagonist institution; Inquisitor Orveth leads |
| Warden Order | Cross-polity | Law enforcement; Roadwardens subunit |
| House Shelk | Shelkopolis | Noble trade control; background faction relationship |
| The Union | Guildheart Hub | Cross-polity merchant, Nomdara operator |
| Office of Roazian Enforcement | Ithtananalor | Regional authority; Iron Accord governance |
| House Panim | Panim Haven | Death registry |
| Sheresh Dome Stewards | Aurora Crown | Techno-religious administration |
| Iron Accord | Ithtananalor | Fortification governance |
| Engineers Consortium | Soreheim | Infrastructure, Giant Council adjacent |
| House Mimolot | Mimolot Academy | Knowledge/tariff |
| Frontier Hammer Companies | Soreheim | Labor-militia |
| Shadowhands | Underground | Covert network, knows more than it shows |

### 5.5 Key NPCs

| NPC | Role | Stage |
|-----|------|-------|
| Inquisitor Orveth | Oversight Collegium; delivers summons | Stage II climax Phase 1 |
| Seld | Junior archivist; informant; reveals ledger truth | Stage II climax Phase 2 |
| Maren Oss | Licensed rival investigator; red-bound notebook | Rival clock notices + Stage II encounter |

### 5.6 Cosmology Labels (for narration writers)

| Concept | In-world term |
|---------|--------------|
| The cataclysm | "Doomsday" (Felelem followers) / "Ruination" (Felujitas + Cysur) / "The Inculcation" (Gwybodaeth + Talalmany + Cyfoes) / "The First Sieve" (Vonalzo + Uralom) |
| The original unity | Primordial Unity |
| The pantheon | 19 gods (shards of Primordial Unity) |
| Celestial spirits | Valians |
| The afterlife economy mediator | House Panim |
| God of Knowledge (the investigator archetype) | Gwybodaeth |
| God of Ambition (hidden villain) | Vonalzo |
| The failsafe god who caused Doomsday | Mega-Terozash (Desperation) |
| The planetary crisis response | Four elemental planets (Fire, Ocean, Wind, Rock) used by gods to counter the Five Days of Chaos |

---

## 6. Stats & Numbers

### 6.1 Skills

| Skill | Aliases (bridge normalizes) |
|-------|---------------------------|
| `combat` | — |
| `survival` | perception, awareness, nature |
| `persuasion` | empathy, performance |
| `lore` | investigation, insight, arcane, history, religion |
| `stealth` | deception |
| `craft` | repair |

### 6.2 DC Reference Table

| Stage | Safe | Risky | Bold |
|-------|------|-------|------|
| I | 10 | 12 | 14 |
| II | 12 | 14 | 16 |
| III | 14 | 16 | 18 |

Modifiers: `+G._dcPenalty` (from rival thresholds), `−1` at reverence >= 7 on social/persuasion.

### 6.3 Travel Speed

| Mode | Speed (distance units/day) |
|------|---------------------------|
| Foot | 1 |
| Horse | 2 |
| Cart | 1 |
| Boat | 3 |
| Airship | 4 |

Formula: `travel_days = ceiling(distance_units / mode_speed)`

### 6.4 HP by Archetype Group (examples)

| Group | HP range |
|-------|---------|
| Physical | 20–26 |
| Arcane | 14–18 |
| Stealth | 16–20 |
| Support | 14–20 |

(Exact values per archetype defined in world-data.js)

---

## 7. V0.1 Ship Checklist

### Must-ship (blocking)

- [ ] Fix stage2_climax.js: `window.renderChoices` re-entry bug (boss choices padded with random enriched)
- [ ] Fix stage2_climax.js: phase2→phase3 synchronous (no read pause between narration and choices)
- [ ] Fix bridge: `checkRivalClock()` called during render path (side-effect in view)
- [ ] DC shown in choice buttons before commitment
- [ ] Case File: X/10 HUD meter (investigationProgress visible)
- [ ] Safe-streak counter in HUD
- [ ] Causal narration when rival ticks from safe streak
- [ ] Typography key art (load screen + itch.io thumbnail)
- [ ] Boss antechamber content (1–2 foreshadowing choices)
- [ ] Fumble backup signal: "Another path opens..." narration
- [ ] Per-tier contextual teaching (replace 5-page upfront onboarding)
- [ ] Reverence >= 7 → DC −1 on social/persuasion

### Should-ship (strong preference)

- [ ] XP/stageProgress decoupling (some choices favor depth over progress)
- [ ] market_intel XP drain (15–20 XP cost)
- [ ] Archetype group rename: Combat → Physical, Magic → Arcane (display only)
- [ ] Partial outcome tier as genuine third state (reduced stakes, not just failure flavor)
- [ ] lay_low routing via handleChoice instead of empty-fn guard
- [ ] Lay_low rival ≥ 7 stageProgress exemption

### Nice-to-have (post-V0.1 if needed)

- [ ] Locality Heat system (dual-axis, replaces Standing)
- [ ] Narration observation block UI (structured slots)
- [ ] Magical items (8 classes)
- [ ] Side plots per locality
- [ ] G_SCHEMA validation in patchGState()
- [ ] Split loa-enriched-bridge.js into 3 focused files
- [ ] stage2_climax.js: remove 300ms setTimeout in phase2()

---

## 8. Open Design Questions

*See the 20 questions issued with this spec.*

---

*Ledger of Ash V0.1 Design Spec — 2026-04-21*
*Source: 12 game design reviews + full codebase audit + V33 world repository + lore document corpus*
