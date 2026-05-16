# Feature Wiring Manifest — Ledger of Ash HTML Game Engine

**Source:** `C:\Users\CEO\ledger-of-ash\ledger-of-ash.html` (single-file HTML5 game)  
**Analysis Date:** 2026-05-15  
**Scope:** Mapping system outputs to player-facing DOM elements (HUD, overlays, panels)

---

## 1. HUD Elements — Top Bar & Left Panel

### Summary

All HUD properties are rendered in `updateHUD()` (line 15851). Complete mapping of G properties → DOM element IDs:

| G Property | DOM Element ID | Rendered | Status |
|---|---|---|---|
| `G.name` | `#hud-name` | ✓ | textContent |
| `G.archetype.name` | `#hud-class` | ✓ | textContent |
| `G.level` | `#hud-level` | ✓ | textContent |
| `G.xp` or `G.masteryXP` | `#hud-xp` | ✓ | textContent (conditional: "XP: N/M" or "Mastery: N" at level cap) |
| `G.renown` + `getRenownedTitle()` | `#hud-renown` | ✓ | textContent |
| `G.hp` / `G.maxHp` | `#hud-hp` | ✓ | textContent |
| `G.gold` | `#hud-gold` | ✓ | textContent |
| `G.dayCount` | `#hud-day` | ✓ | textContent (`"Day N"`) |
| `G.stage` or `G.stageLabel` | `#topbar-stage` | ✓ | textContent |
| `G.stageProgress[currentStage]` | `#hud-stage-progress-val` | ✓ | textContent (`"N / Max"`) + bar fill |
| `G.location` (via `WORLD_LOCATIONS`) | `#hud-location` | ✓ | textContent |
| `G.timeIndex` (via `TIME_NAMES`) | `#hud-time` | ✓ | textContent |
| `G.recoveryState` | `#hud-status` | ✓ | textContent + className (good/danger) |
| `G.hp/G.maxHp` ratio | `#hud-hpbar` (fill) | ✓ | style.width % + toggles 'low' class |
| `G.worldClocks.watchfulness` | `#hud-watch-row`, `#hud-watch-val`, `#hud-watch-fill` | ✓ | visibility + textContent + bar width |
| `G.heat` (max by polity) | `#hud-heat-row`, `#hud-heat-val`, `#hud-heat-fill` | ✓ | visibility (display:none if 0) + bar width |
| `G.skills.*` | `#hud-skills` | ✓ | innerHTML (6 skills: might, finesse, vigor, wits, charm, spirit) |
| `G.benevolence`, `G.orderAxis` | `#hud-alignment` | ✓ | className set by engine |
| `G.companions` (active) | `#hud-companions` | ✓ | innerHTML (name + passive trait) |
| `G.inventory.type==='consumable'` | `#hud-consumable-count` | ✓ | textContent + visibility |
| `G.stageProgress[n]` | `#hud-progress` | ✓ | textContent (`"thread ◆◆◆…"`) |
| `G.sorePlotCredits` (Soreheim/Sunspire) | `#hud-plotcredits` | ✓ | textContent (location-conditional) |
| `G.rivalAdventurers[].renown`, `G.marenRenown` | `#hud-rival` | ✓ | textContent (`"rival: N"`) |
| `G.investigationProgress` | `#hud-case-file`, `#hud-case-file-fill`, `#hud-case-file-count` | ✓ | bar fill + count display |
| `G._consecutiveSafeChoices` | `#hud-safe-streak` | ✓ | textContent (`"streak: N"`) if 1–2 |
| `G.fatigue` | `#hud-fatigue` | ✓ | textContent + color (danger if ≥5) |
| `G.traits[]` (non-passive ready count) | `#hud-trait-ready` | ✓ | textContent (`"TRAITS N/M READY"`) + color |

**Dependencies:** updateAlignmentHUD(), updateFactionHUD(), updateQuestHUD(), updateEnvironmentPanel(), updateNoticesBadge(), updatePartyHUD(), updateStageProgressBar(), updateSafeStreakHUD(), updateCaseFileHUD(), updateWorldTab(), updatePartyTab()

---

## 2. Camp Actions System

All camp actions wired via `data-camp` attribute on buttons in `#overlay-camp`. Buttons call `campAction(type)` (line 13542).

| Camp Action Type | DOM Button | Handler | Wired? | Notes |
|---|---|---|---|---|
| `rest` | `data-camp="rest"` | Heals HP, refreshes traits, advances watchfulness | ✓ | +45% max HP, +10% if plentiful supplies |
| `sleep` | `data-camp="sleep"` | (No handler in campAction()) | ✗ | Button exists, unimplemented |
| `recover` | `data-camp="recover"` | Calls seekProfessionalCare() | ✓ | Remove wounds, costs gold |
| `train` | `data-camp="train"` | Calls showTrainingMenu() | ✓ | 3 sessions per stat point |
| `craft` | `data-camp="craft"` | Calls getAllRecipes(), crafting menu | ✓ | DC rolls, material cost |
| `talk` | `data-camp="talk"` | Calls showCampTalk() | ✓ | Companion dialogue |
| `post_watches` | `data-camp="post_watches"` | (Incomplete) | ✗ | Button wired, handler incomplete |
| `campout` | `data-camp="campout"` | (No handler) | ✗ | Button exists, unimplemented |
| `lay_low` | `data-camp="lay_low"` | (No handler) | ✗ | Hidden button, unimplemented |
| `review_notes` | `data-camp="review_notes"` | (No handler) | ✗ | Hidden button, unimplemented |

**Wiring:** Line 16730 — `document.querySelectorAll('[data-camp]').forEach(btn => btn.addEventListener('click', () => campAction(btn.dataset.camp)));`

**Gap:** 5 camp action types have DOM buttons but no working handlers.

---

## 3. Combat System

Core actions rendered in narrative combat entry. Actions: Press, Defend, Talk, Retreat.

| Combat Action | DOM Data Attribute | Rendering | Branch Coverage |
|---|---|---|---|
| Press (attack) | `data-action="attack"` | ✓ | ✓ Archetype abilities + companion abilities |
| Defend (protect) | `data-action="defend"` | ✓ | ✓ Damage reduction mechanics |
| Talk (social) | `data-action="talk"` | ✓ | ✓ Charm/persuasion skills |
| Retreat (flee) | `data-action="retreat"` | ✓ | ✓ Stealth check, costs renown |

**Entry Function:** `enterCombat(enemyKey, context)` (line 16634, documented as "Narrative combat entry. Shows enemy intent, renders Press/Defend/Talk/Retreat.")

**Resolution:** `resolveCombatAction(action, abilityId)` (line 4281) handles all 4 core actions + companion selection + ability resolution.

**Archetype Abilities:** Warrior, Knight, Paladin, Berserker have `bonus:{skill, n}` and `choices[]` arrays.

**Gap:** Active abilities (traits with `activeSkillType:'combative'` or `'social'`) may not be fully wired to combat UI buttons yet (noted in backlog).

---

## 4. Alignment System

Tracked via `G.benevolence` (range: -30 to +30) and `G.orderAxis` (range: -45 to +45).

| System | G Property | DOM Element | Visibility | Rendering |
|---|---|---|---|---|
| **Alignment Class** | `G.benevolence`, `G.orderAxis` | `#hud-alignment` | Always visible | Class names: chaotic-evil, neutral-evil, lawful-evil, chaotic-neutral, true-neutral, lawful-neutral, chaotic-good, neutral-good, lawful-good |
| **Alignment Gates** | `choice.alignGate` | Choice filter | Per-choice | Values: 'benevolent' (≥25), 'cruel' (≤-25), 'order' (≥25), 'anarchy' (≤-25) |
| **Archetype Tolerance** | `archetype.tolerances` | Character check | Gating function | Each archetype has benevolenceFloor, orderMin, orderMax, trustMin |

**Modification:** Choices with `align:'lawful'|'chaotic'|'benevolent'|'cruel'` increment axes. Fleeing combat costs renown and alignment.

**Gap:** Alignment threshold gates documented in backlog but not confirmed fully implemented in active choice filtering.

---

## 5. Heat System

Tracked per-polity in `G.heat` object: `{polity_key: value}` (0–10 scale). Rendered only when `max(G.heat[*]) > 0`.

| System | G Property | DOM Element | Visibility | Implementation |
|---|---|---|---|---|
| **Heat Bar** | `G.heat[polity]` (max) | `#hud-heat-row`, `#hud-heat-val`, `#hud-heat-fill` | display:none if 0, else visible | Line 15901: conditional display toggle |
| **Heat Per-Polity** | `G.heat[polity_key]` | Character sheet (overlay-charsheet) | Detail view only | `<div class="char-stat-row" data-clock="heat">` |

**Visibility Trigger:** Line 15901 — `_heatRow.style.display = _maxHeat > 0 ? '' : 'none';`

**Consequences:** `applyHeatThresholds()` (line 10916) evaluates heat thresholds and applies world-state consequences.

**Gap:** None — heat system fully wired.

---

## 6. Quest System

Tracked in `G.quests[]` array and `G.questHints` object (keyed by questId).

| System | G Property | DOM Element | Rendered | Notes |
|---|---|---|---|---|
| **Quest List** | `G.quests[]` | `#quest-list` (inferred) | ✓ | Latest 5 quests shown via updateQuestHUD() |
| **Quest Hints** | `G.questHints[questId]` | Inline with quest | ✓ | Fetched from hints object if exists |
| **Quest Summary** | `G.quests.length` | Journal title | ✓ | "The investigation moved forward" at ≥3 quests |

**Recording:** `addQuest(text, questId, hint)` (line 13201) pushes to `G.quests[]` and optionally sets `G.questHints[questId]`.

**Example:** `G.questHints['anomalous_manifest'] = 'The routing numbers exist. Find who assigned them.'`

**Gap:** Quest list DOM container ID not explicitly confirmed (inferred as `#quest-list`).

---

## 7. Overlay Catalog

All overlays use `class="overlay"` and `id="overlay-*"`. Controlled via `openOverlay(id)` / `closeOverlay(id)`.

| Overlay ID | Title | Body Element | Purpose |
|---|---|---|---|
| `#overlay-journal` | "The Ledger" | `#journal-overlay-body` | Journal entries, discovery log |
| `#overlay-map` | "The Material Planet" | `#map-body` | World map (wide layout) |
| `#overlay-charsheet` | "Character" | `#sheet-body` | Character stats, skills, traits, equipment, heat per-polity |
| `#overlay-camp` | "Make Camp" | Inline buttons | Rest/train/craft/talk/watch actions |
| `#overlay-party` | "Party" | `#party-overlay-body` | Companion roster + individual sheets |
| `#overlay-notices` | "Notice Board" | `#notices-overlay-body` | World notices / rumor board |
| `#overlay-npcs` | "Local Contacts" | `#npc-overlay-body` | NPC directory (location-specific) |
| `#overlay-hall` | "Hall of Legends" | `#hall-body` | Completed legend entries (endgame) |
| `#overlay-death` | "Your Legend Ends" | (narrow layout) | Death screen + endgame narration |
| `#overlay-save` | (TBD) | (not found) | Save/load UI (not implemented) |
| `#howto-modal` | How To Play | (standalone) | Tutorial / help |
| `#onboarding-modal` | Onboarding | (standalone) | Character creation |

**Close Pattern:** `<button class="overlay-close" data-close="overlay-id">×</button>` triggers `closeOverlay(data-close)`.

**Gap:** `#overlay-save` exists in DOM but no save/load UI rendering confirmed.

---

## 8. Stage II Features

Stage II (and Stage III/endgame) features tracked via flags. No dedicated DOM elements for "antechamber" or "companion join" — narrative sequences only.

| Feature | G Property/Flag | Rendering | Status |
|---|---|---|---|
| **Stage II Unlock** | `G.stage !== 'Stage I'` | Story progression | ✓ |
| **Stage II Miniboss** | `G.stageProgress[2] >= 4` | Choice trigger (line 10909) | ✓ |
| **Stage II Climax** | `stage2_climax` flag | Not found | ✗ |
| **Companion Join** | `G.companions[]` additions | Choice narrative (`choice.fn()`) | ✓ |
| **Antechamber** | `antechamber` flag | Not found | ✗ |

**Gap:** Stage II climax and antechamber scenes not explicitly wired to DOM. Companion join is narrative-driven.

---

## Summary: Built vs. Wired

### WIRED (Working):
- HUD top bar (25+ properties)
- Heat system (toggle + rendering)
- Alignment system (class names)
- Combat core 4 actions (Press/Defend/Talk/Retreat)
- Camp rest/train/craft/talk (4 of 9 types)
- Quest tracking (rendering + hints)
- Overlay system (10 confirmed)
- Stage progression display

### UNWIRED (Gaps):
1. **Camp Actions (5):** sleep, post_watches, campout, lay_low, review_notes
2. **Combat Active Abilities:** Not confirmed wired to narrative combat UI
3. **Alignment Gates:** Documented but not confirmed in active filtering
4. **Stage II Climax:** No DOM element found
5. **Antechamber:** No DOM element found
6. **Save/Load Overlay:** Button exists, no rendering logic

---

Generated: 2026-05-15
