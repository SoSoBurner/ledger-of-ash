# Engine API Reference — Ledger of Ash

All functions listed here are defined in `ledger-of-ash.html` and are globally available in the browser context. Line numbers are approximate and shift as the file grows.

Skill parameter notes apply throughout: any function accepting a `skill` string must handle both internal keys (`combat`, `stealth`, `survival`, `lore`, `persuasion`, `craft`) and display keys (`might`, `finesse`, `vigor`, `wits`, `charm`, `spirit`). Normalization is done internally via `_KEY_NORM`.

---

## addHeat(polity, amount)

**Purpose:** Adjusts heat for a polity by `amount`, clamped to 0–10.

**Parameters:**
- `polity` — string, one of: `shelk`, `roaz`, `shirsh`, `mimolot`, `panim`, `cosmouth`, `zootia`, `union`, `sheresh`, `soreheim`, `nomdara`
- `amount` — integer, positive to increase, negative to decrease

**Side effects:** Mutates `G.heat[polity]`. Calls `updateHUD()`.

**Notes:** Use `addHeat(polity, -1)` for heat decay. The floor is 0 — negative values are clamped. Heat at 0 causes the heat HUD row to auto-hide.

---

## addJournal(text, category, dedupeKey)

**Purpose:** Adds an entry to the player's journal.

**Parameters:**
- `text` — string, the journal entry text. **Must be first.**
- `category` — string, one of: `evidence`, `intelligence`, `rumor`, `discovery`, `contact_made`, `complication`. Never `'investigation'`.
- `dedupeKey` — optional string, prevents duplicate entries with the same key

**Side effects:** Appends to `G.journalRecords` (full record `{id, category, day, text}`). Appends to `G.journal` (string-only, capped at 30, deduped). Calls `updateHUD()`.

**Notes:** Parameter order is `text` first, `category` second. Reversing them silently breaks journal logging — the entry is stored under the wrong category with no error.

---

## addQuest(msg, hint, questId)

**Purpose:** Adds a quest string to `G.quests` and optionally stores a hint.

**Parameters:**
- `msg` — string or object. If object, extracts `.msg` property. Normalized to string internally.
- `hint` — optional string, stored in `G.questHints[questId]`
- `questId` — optional string key for the hint map

**Side effects:** Pushes to `G.quests` (deduplicated). Stores hint in `G.questHints`. Calls `updateQuestHUD()`.

**Notes:** Accepts object input to handle `{type:'quest', msg:'...'}` effect objects passed directly. Duplicate quest strings are silently ignored.

---

## applyTensionModifier(npcRole)

**Purpose:** Returns a tension-flavored NPC dialogue suffix string based on active faction flags.

**Parameters:**
- `npcRole` — string, e.g. `'collegium_any'`, `'warden_any'`

**Returns:** String — additional NPC line if a matching faction flag is set, otherwise `''`.

**Side effects:** None. Read-only.

**Notes:** Checks `G.flags.stage2_faction_shadowhands` and `G.flags.stage2_faction_red_hood`. Extend the internal `tensions` object to add new role reactions.

---

## applyWound(damage, source)

**Purpose:** Applies combat damage to the player, accounting for armor, then calls `confirmDeath()` if HP reaches 0.

**Parameters:**
- `damage` — number, raw incoming damage before armor reduction
- `source` — string, wound description stored in `G.wounds`

**Side effects:** Reduces `G.hp` (clamped at 0). Pushes to `G.wounds` for damage >= 5. Increments `G.fatigue` for damage >= 8 (capped at 10). Sets `G.dead = true` and calls `confirmDeath()` if `G.hp <= 0`. Calls `saveGame()`.

**Notes:** This is the combat damage path. It calls `confirmDeath()` directly — no external death guard needed. Contrast with `modHP`, which does not call `confirmDeath`.

---

## buildLivingDesc(locId, g)

**Purpose:** Writes the living environment description into `#env-panel .env-desc`.

**Parameters:**
- `locId` — string, locality ID
- `g` — the G state object (pass `G`)

**Side effects:** Sets `innerHTML` of `#env-panel .env-desc`.

**Notes:** Fallback chain: `LIVING_VARIANTS[locId][variantIndex]` → `LOCALITY_ANCHORS[locId]` → first sentence of `LOCALITY_NARRATIONS[locId]`. Locations without a `LOCALITY_NARRATIONS` entry show blank — silent, not an error. `content/living_narration.js` does not exist and is not loaded.

---

## campAction(type)

**Purpose:** Executes a camp action chosen by the player.

**Parameters:**
- `type` — string, one of:
  - `'rest'` — heal HP (limited to 2 rests per day)
  - `'sleep'` — full sleep/recovery scene, calls `doSleepScene()`
  - `'train'` — opens training menu
  - `'craft'` — crafting from recipes via `getAllRecipes()`
  - `'post_watches'` — converts night ambush to warned encounter
  - `'talk'` — companion talk scene
  - `'recover'` — professional care via `seekProfessionalCare()`
  - `'lay_low'` — reduces heat exposure
  - `'review_notes'` — journal review action
  - `'campout'` — outdoor camp

**Side effects:** Closes the camp overlay. Mutates `G` state based on type (HP, restCount, fatigue, heat, etc.). Calls `renderChoices()` to show follow-up choices.

---

## canAdvanceToStage3()

**Purpose:** Gate function for Stage II → Stage III transition.

**Returns:** `false` (hardcoded, V1.0 stub).

**Notes:** Do not modify until Stage III content is authored. The Playwright test harness (`tests/e2e/helpers/stage-lock.js`) reads this function to determine the stage ceiling automatically.

---

## checkStageAdvance()

**Purpose:** Evaluates all stage transition conditions and fires the appropriate trigger (boss, antechamber, climax, or stage unlock).

**Parameters:** None.

**Side effects:** May set `G.stage`, `G.flags`, fire boss or antechamber modules, render narration. Calls `updateHUD()`.

**Notes:** Must be called from `resolveArrival()`. At Stage I level cap (5), `checkLevelUp` never fires — `resolveArrival` is the only reliable call site. Stage I→II fires when `G.flags.stage1_narrative_complete` is set. Stage II→III is gated by `canAdvanceToStage3()` (currently hardcoded `false`).

---

## doSleepScene()

**Purpose:** Runs the full sleep and healing scene, applies recovery, and renders follow-up choices.

**Parameters:** None.

**Side effects:** Clears expired campout penalty. Heals `G.hp` based on `G.recoveryState` and skills. Advances time. Calls `updateHUD()` and `renderChoices()`.

**Notes:** Called by `campAction('sleep')` and by the camp overlay's sleep button. Handles the `_campoutPenalty` mechanic — if `G.campoutDay >= 0` and more than 1 day has passed, the penalty is cleared.

---

## drawLocalityRumor(localityId)

**Purpose:** Returns a random rumor string for the given locality.

**Parameters:**
- `localityId` — string, locality ID

**Returns:** String — one rumor drawn from `window.LOCALITY_RUMORS[localityId]`, or a generic fallback rumor if the pool is absent.

**Side effects:** None.

---

## enterAuthorityConfrontation(authorityKey, ctx)

**Purpose:** Initiates a structured authority encounter (inspection, warrant check, tribunal). Use this for all law enforcement and institutional authority figures — never call `enterCombat()` directly for these.

**Parameters:**
- `authorityKey` — string, e.g. `'road_wardens'`, `'roazian_enforcement'`, `'magi_magistratus'`
- `ctx` — object, encounter context

**Side effects:** Renders authority encounter UI. May adjust `G.heat`, `G.flags`, `G.gold`. Escalates to `enterCombat()` internally if the player chooses to fight.

**Notes:** Authority confrontation has heat-conditional opening narration at heat 3–4 / 5–7 / 8+. Never call `enterCombat()` directly for authority figures — it bypasses heat tracking and the structured confrontation flow.

---

## enterCombat(enemyKey, context)

**Purpose:** Narrative combat entry. Shows enemy intent and renders Press / Defend / Talk / Retreat choices before combat begins.

**Parameters:**
- `enemyKey` — string, key into `ENEMY_TEMPLATES` (or `data/bestiary_lookup.js`)
- `context` — object, optional flags:
  - `isBoss: true` — applies `.encounter--boss` CSS class (danger border)
  - `escalated: true` — skips the intent display, goes straight to combat
  - `_authorityFight: true` — marks as authority escalation

**Side effects:** Renders encounter UI. Transitions to `startCombat()` when the player commits.

**Notes:** Use for all story-driven fights. For non-narrative triggers, call `startCombat()` directly. Pass `{isBoss: true}` for boss encounters to get the danger border styling.

---

## gainXp(amount)

**Purpose:** Adds XP to the player and triggers level-up if the threshold is met.

**Parameters:**
- `amount` — number, XP to add

**Side effects:** Increments `G.xp`. Calls `checkLevelUp()`. At level cap, routes overflow to `G.masteryXP` and zeroes `G.xp`.

**Notes:** XP thresholds: level 1→2 = 120 XP; level N→N+1 = N×60 XP. At cap (`STAGE_LEVEL_CAP[G.stage]`), XP overflows into `G.masteryXP` — level does not increase. Also exported as `gainXP` (uppercase alias) in some call sites.

---

## getHeat(polity)

**Purpose:** Returns the current heat value for a polity.

**Parameters:**
- `polity` — string, polity key

**Returns:** Integer 0–10.

**Side effects:** None.

---

## handleChoice(choice)

**Purpose:** Main choice dispatcher. Routes a player choice to the appropriate handler.

**Parameters:**
- `choice` — object with at minimum `{cid, text}`. Enriched choices also carry `fn`, `skill`, `tag`, `dc`, `result`, `failResult`.

**Side effects:** Depends on route taken. May call `enterCombat()`, `enterAuthorityConfrontation()`, or invoke `choice.fn()` for enriched choices.

**Routing logic (in order):**
1. `cid === '__instant_attack_escalation__'` → fires escalation combat, subtracts 4 benevolence
2. `cid` in `legacyCombatCids` (`do_combat_patrol`, `confront_coth`, `take_private_contract`) → routes to `enterCombat()` via enemy map
3. `cid.startsWith('__combat_')` → parses combat mode and enemy from cid
4. Enriched choice with `choice.fn` → calls `choice.fn()`
5. Legacy fallback → inline result handling

**Notes:** Do not call `handleChoice` for travel mode selection buttons — those use a separate handler. Combat buttons rendered during an active combat round use `resolveCombatAction`, not `handleChoice`.

---

## loadStageChoices(locId)

**Purpose:** Re-renders the choice panel for the current or specified location.

**Parameters:**
- `locId` — optional string, defaults to `G.location`

**Side effects:** Clears and re-renders `#action-content`. Calls enriched choice pool for the location.

**Notes:** Must check `if (G.dead) { confirmDeath(); return; }` at entry. Without this guard, `modHP` in enriched choices can set `G.dead` and leave the player stuck with no choices and no death screen. Do not use `loadStageChoices` for teleports — use `resolveArrival(loc)` for location changes.

---

## modHP(delta)

**Purpose:** Adjusts HP within the enriched-choice flow (non-combat).

**Parameters:**
- `delta` — number, positive to heal, negative to damage. Clamped to `[0, G.maxHp]`.

**Side effects:** Mutates `G.hp`. If `delta < 0` and `G.hp <= 2` after change, sets `G.recoveryState = 'critical'` and adds a critical warning narration. Calls `updateRecoveryState()` and `updateHUD()`.

**Notes:** Does NOT call `confirmDeath()`. If `modHP` reduces HP to 0, the player is left in a broken state unless `loadStageChoices` has a death guard at entry. The death guard in `loadStageChoices` is the only protection on this path.

---

## resolveArrival(locId)

**Purpose:** Handles all side effects of arriving at a new location.

**Parameters:**
- `locId` — string, destination locality ID (must exist in `WORLD_LOCATIONS`)

**Side effects:** Updates `G.location`, `G.currentLocality`. Advances time (2 ticks intra-macroregion, 3 cross-macroregion). Calls `advanceRivals()`, `advanceMaren()`. Updates HUD, environment panel, living desc. Fires arrival narration and arrival scene. Calls `checkStageAdvance()`.

**Notes:** This is the canonical location-change function. Always call this when moving between localities. `checkStageAdvance()` is called at the end — this is intentional and critical for stage progression at level cap.

---

## rollD20(skill, bonus)

**Purpose:** Rolls a d20 and adds skill value and any applicable trait/equipment bonuses.

**Parameters:**
- `skill` — string, accepts both internal keys (`combat`) and display keys (`might`). Normalized internally.
- `bonus` — optional number, flat bonus added to the roll

**Returns:** Object `{roll, skill, bonus, total, success}` (success determined by caller context).

**Side effects:** None directly. May read `G.skills`, `G.traits`, `G.equipped`.

**Notes:** Normalization pattern applied internally: `_KEY_NORM[skill] || skill`. `rollD20`, `getTraitBonus`, and `getEquipmentBonus` were all fixed in Apr 2026 to handle display key inputs. DC reference: safe = 7, risky = 13, bold = 16 (plus +1 per stage beyond Stage I).

---

## showCharSheet()

**Purpose:** Opens the character sheet overlay.

**Parameters:** None.

**Side effects:** Sets the character sheet overlay to visible. Calls `renderCharacterSheet()` to populate content.

**Notes:** Called via `page.evaluate(() => showCharSheet())` in Playwright tests. The overlay uses `.overlay.active` class — close it by removing that class.

---

## startCombat(enemyTemplateId, context)

**Purpose:** Low-level combat engine entry. Initializes the full multi-round TTRPG combat loop with archetype abilities.

**Parameters:**
- `enemyTemplateId` — string, key into `ENEMY_TEMPLATES`
- `context` — object, optional combat flags (e.g. `{enforcement: true}`)

**Side effects:** Initializes combat state (`CS`). Renders combat UI with action buttons. Begins round loop.

**Notes:** Use `enterCombat()` for all story-driven fights. Call `startCombat()` directly only for non-narrative triggers (e.g. automatic ambush). `resolveCombatAction` always guards with `if (!CS) return;` — the loop-detect sets `CS = null` and click handlers on already-rendered buttons would otherwise crash.

---

## updateHUD()

**Purpose:** Refreshes all HUD elements to reflect current G state.

**Parameters:** None.

**Side effects:** Updates DOM elements: `#hud-hp`, `#hud-level`, `#hud-gold`, `#hud-renown`, `#hud-day`, `#hud-location`, `#topbar-stage`, `#hud-stage-progress-val`, `#hud-xp`, `#hud-heat-row`. Shows/hides heat row based on whether any polity heat > 0. Shows/hides alignment bars based on `|G.benevolence| >= 10` or `|G.orderAxis| >= 10`.

**Notes:** Must be called alongside `renderCharacterSheet()` when changing skill rendering — they are separate render paths. XP denominator must be `G.level * 60`, not hardcoded 120.
