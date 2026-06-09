# Post-Playtest Handoff Plan — 2026-06-06

Full scope for next spec-miner + writing-plans session. Sources reconciled: this session's headed playtest findings, `deep-enchanting-clover.md` P0 backlog, `BACKLOG.md` NOT BUILT / PARTIAL items, and live spec-miner combat investigation.

Items marked ✅ were fixed this session.

---

## ✅ FIXED THIS SESSION

### 1. `narrative-text undefined` rendering
**Root:** `addNarration(label, html)` — `undefined`/`null` html rendered as literal string.
**Fix:** `var _safeHtml = (html == null) ? '' : String(html)` guard added.
**File:** `ledger-of-ash.html` ~line 11375

### 2. Patrol guard appearing for non-patrol-guard authority enemies
**Root:** `AUTHORITY_ENEMY_MAP` had duplicate keys + `book_tariff_office` → `'patrol_guard'` (should be `'guild_enforcer'`).
**Fix:** Map deduped; `book_tariff_office` → `guild_enforcer`; `magi_magistratus` → `magi_investigator`; `giant_council` → `giant_enforcer`; `afterlife_registry` → `ritual_enforcer`.
**Remaining:** `cosmouth_patrol`, `zootia_patrol`, `sheresh_patrol`, `nomdara_patrol`, `harvest_measures_board`, `cosmouth_archives` still `patrol_guard` — acceptable for now, see item 9.

---

## P0 — ENGINE / WIRING BUGS (fix before any content work)

### 3. Level-up ability step — `renderAbilityStep` reads from WRONG pool
**Root (spec-mined, confirmed):** `renderAbilityStep()` at **line 13964** reads from `ARCHETYPE_TRAIT_POOLS[archId]` — the TRAIT pool — instead of `ARCHETYPE_ABILITY_TREES[archId]`. This means it filters traits for `type === 'active'` rather than showing actual ability tree entries. At level 3, when all active traits in the trait pool are unlocked, the step renders empty → "All abilities unlocked" → `#btn-lu-ability-done` Continue button.
**Guard flag:** `_awaitingLevelUp` (line 9676) — set `true` at line 13418, reset `false` at line 14047 (`_finalizeLevelUp`) and line 10216 (`loadGame`). Also guarded at line 12518 (gainXp resets if no `.levelup-block` DOM exists).
**Fix:** Change line 13964 from `ARCHETYPE_TRAIT_POOLS[archId]` to `ARCHETYPE_ABILITY_TREES[archId]`. All archetypes including healer have entries in `ARCHETYPE_ABILITY_TREES` (healer at line 6086).
**Also fix spec:** Add `#btn-lu-ability-done, #btn-lu-done` to `handleLevelup` button locator in `tests/e2e/playtest-headed.spec.js` ~line 374.
**File:** `ledger-of-ash.html` `renderAbilityStep()` line 13964

### 4. Death "Not Yet" survival narrative — may not be rendering
**Root (spec-mined, confirmed):** `doSurvive()` at line 17926. Full sequence:
1. Line 17933–17942: builds `_survivalText` from `G.archetype.group` — separate strings for `combat/warden/death_knight/warlord`, `magic`, `stealth`, else default
2. Line 17944–17947: sets `G.dead=false`, `G.hp=1`, `G.lastResult=_survivalText`, `G.recentOutcomeType='neutral'`
3. Line 17948: `closeOverlay('overlay-death')`
4. Line 17949: `addNarration('You Survived', _survivalText, 'neutral')`
5. Line 17950: `loadStageChoices()`
**"Not yet" button** is at DOM line 2159 — inline onclick `doSurvive()`. No event listener needed.
**Suspected failure point:** `_survivalText` is built before the null-guard fix — if `G.archetype.group` is missing, the variable may be undefined and the `addNarration` now renders empty (after fix) rather than "undefined". Check if survival narration is blank vs absent.
**File:** `ledger-of-ash.html` line 17926–17950

### 5. Day counter not visually updating after travel
**Root (spec-mined, confirmed wiring):** `G.dayCount += Math.ceil(totalDays)` at `travel_corridors.js:4317`, then `updateHUD()` SYNCHRONOUSLY at line 4318. `#hud-day` is written at `ledger-of-ash.html:17497-17498` with explicit `style.display = ''`. Wiring is correct end-to-end.
**Headed spec log confirmed:** `day=undefined` at map-travel log time — the spec LOG fires at the moment the travel button is clicked (before `startOverlayJourney` executes), so `G.dayCount` is still uninitialized at that point. This is a **spec timing artifact**, not a game bug. `G.dayCount` starts undefined (not 0) for some run paths.
**Actual player-facing issue:** May be that `G.dayCount` default in `getDefaultG()` is `undefined` or `0` but the HUD shows `Day 0` rather than the correct incremented value. Verify `G.dayCount` is initialized to `0` (not undefined) in `getDefaultG()` — if undefined, `G.dayCount || 0` guard works but the first journey shows Day 0 instead of Day N.
**File:** `content/travel_corridors.js` line 4317; `ledger-of-ash.html` line 17497; `getDefaultG()` dayCount initialization

### 6. `env-desc` blank for some localities
**Root:** `buildLivingDesc()` requires `window.LOCALITY_NARRATIONS[locId]`. Missing entries show blank.
**Confirmed present:** shelkopolis, panim_haven, cosmoria, aurora, soreheim_proper, shirshal, guildheart_hub, glasswake_commune, fairhaven, sunspire_haven, ithtananalor, mimolot_academy.
**Missing (show blank):** sunspire, districts, nomdara, sheresh, roaz, remeny, eloljaro, gwybodaeth, all subdistricts.
**Action:** Add `LOCALITY_NARRATIONS` entries for each missing locality, or confirm `WORLD_LOCATIONS[locId].name` is the acceptable fallback.

### 7. Combat CID Path B — silent fallback to `patrol_guard`
**Root:** `handleChoice` has three distinct CID paths (spec-mined, exact wiring):
- **Path A** `__combat__<enemyId>` (line 12680): `choice.cid.replace('__combat__','')` → `startCombat(enemyId, {})`
- **Path B** `__combat_<mode>__<enemyKey>` (line 12551): `parts = cid.split('__')` → `enemyKey = parts[3] || 'patrol_guard'` — **fallback fires if parts[3] undefined**
- **Path C** ability `__combat__ability__<enemyKey>__<abilityId>` (line 18337): routed through Path B when `mode === 'ability'`

`resolveCombatEntry(mode, enemyKey, abilityId)` is called by Path B/C at line 18435+. `startCombat(enemyKey, ctx)` is called by Path A directly and by `resolveCombatEntry`.

**Fix:** Replace `parts[3] || 'patrol_guard'` with explicit error + return.
**File:** `ledger-of-ash.html` `handleChoice()` ~line 12551–12559

### 8. `_activeCombatantId` set before template validation
**Root:** `enterCombat()` line 18360: `window._activeCombatantId = enemyKey` set BEFORE `if (!enemy)` guard. Read in `handleChoice()` line 12538 with `ENEMY_TEMPLATES[window._activeCombatantId]` check — fallback to `'patrol_guard'` if unset or invalid. Setting it before validation means a failed lookup leaves a stale ID.
**Globals touched by enterCombat:** `window._activeCombatantId`, `G.pendingVictoryCallback` (authority fight hook), `CS` (via startCombat).
**Fix:** Move `window._activeCombatantId = enemyKey` to after successful template validation.
**File:** `ledger-of-ash.html` `enterCombat()` ~line 18359–18361

### 9. `getEnemyStats()` null silently cancels combat
**Root:** `getEnemyStats(baseKey, level)` line 4370 returns `null` if `ENEMY_TEMPLATES[baseKey]` missing. `startCombat()` line 4401–4403: `console.error` + `loadStageChoices()` — combat silently cancelled, no player feedback. Also called by `resolveCombatAction()` line 4932 for group combat second-enemy spawn and `triggerCombatEncounter()` line 5092 for validation.
**CS global structure** (set by startCombat, read by renderCombatRound + resolveCombatAction): `{ enemy, round, entryBonus, playerActed, context, log, rangeTier, isBossFight, strategyActive, strategyRoundsLeft, rangeLocked, companionAbilitiesUsed, nextAttackBonus, enemyDefMod, deathPrevented, enemyGroupCount, enemyGroupDefeated }`. CS = null after `endCombat()`.
**Fix:** Add visible narration before fallback reload. Pre-flight validate authority-mapped key exists in ENEMY_TEMPLATES before calling enterCombat.
**File:** `ledger-of-ash.html` `startCombat()` ~line 4401

### 10. `AUTHORITY_ENEMY_MAP` local variable — unmapped keys silently produce patrol_guard
**Root:** Map declared inside `_authorityResolvePhase2()` — `|| 'patrol_guard'` fallback at line 9953 swallows unrecognized authority keys.
**Fix:** Add `if (!AUTHORITY_ENEMY_MAP[authorityKey]) { console.warn('[authority] unmapped key:', authorityKey); }` before lookup. Consider moving map to module scope.
**File:** `ledger-of-ash.html` `_authorityResolvePhase2()` ~line 9919–9953

### 11. `adaptEnrichedChoice` errors silently swallowed — no player signal
**Root (spec-mined, confirmed):** `adaptEnrichedChoice()` at line 11452. Try/catch at lines 11517–11523 CATCHES errors and `console.error` logs them — **does NOT rethrow**. Callers receive no exception. Result: content bugs (missing G defaults, TypeError in fn()) produce a blank choice block with no UI feedback.
**This is the opposite of what CLAUDE.md says** — there is no rethrow to catch. The issue is the silent swallow itself.
**Fix:** In the catch block (line 11523), after `console.error`, add `addNarration('', 'An error occurred in this scene. Reloading...', 'neutral')` and `setTimeout(function(){ loadStageChoices(G.location); }, 800)` to give players a visible recovery path.
**File:** `ledger-of-ash.html` `adaptEnrichedChoice()` line 11523

### 12. Camp actions — logic implemented but `sleep` button NOT RENDERING in DOM
**Spec-mined, confirmed:** `campAction()` at line 14680 has branches for ALL 9 types: `rest` (14683), `talk` (14710), `train` (14717), `recover` (14719), `craft` (14722), `post_watches` (14780), `lay_low` (14819), `sleep` (14845 → `doSleepScene()`), `campout` (14848). Only missing: no `default` branch — unknown type silently falls through.
**`showCampTalk()` at line 2635** is also FULLY IMPLEMENTED (not a stub). Gated on `G.flags.maren_oss_resolved`. Cycles `COMPANION_DEFS[comp.id].campLines`.
**Headed playtest confirmed (pick 60+):** `panel:camp WARN: missing core camp actions (rest=true sleep=false)` — `sleep` button is NOT rendered in the camp panel DOM even though the handler is wired. `rest` renders (correct); `train`/`craft`/`post_watches`/`lay_low`/`recover`/`talk` also not visible. Root: the camp panel HTML template likely gates button rendering on conditions (stage, companion, flags) that aren't met. The `button.camp-action[data-camp="sleep"]` element is either missing from the template or hidden by a display condition.
**Fix:** Find the camp panel render function (likely `showCamp()` or inline HTML near the `.camp-action` buttons) and confirm `data-camp="sleep"` button exists unconditionally. Check all display conditions.
**File:** `ledger-of-ash.html` camp panel render logic + `campAction()` line 14680

### 13. Save/Load overlay — not a stub, but needs verification
**Spec-mined, confirmed:** `#overlay-save` is NOT a stub. Lines 18161–18235 build full slot UI dynamically with save/load handlers on each slot click. Shows via `showOverlay('overlay-save')` at line 18235.
**Stale CLAUDE.md API:** `getSaveList()` and `getSaveListFull()` referenced in CLAUDE.md **do not exist** in code. Actual slot API: `saveGame(slot)`, `loadGame(slot)`, `readSlotMeta(slotKey)`, iterating `SAVE_SLOT_KEYS`. Update CLAUDE.md.
**Action:** Verify save/load overlay works end-to-end in headed play. Correct CLAUDE.md API references.

### 14. Char sheet VIOLATION — spirit/craft double row + "Undefined" row
**Root (spec-mined, confirmed exact):** Two separate bugs caused by `loadGame()` migration at lines 17206–17210:
- Line 17206: `loaded.skills.spirit = loaded.skills.craft || 0; delete loaded.skills.craft;` — copies craft→spirit, deletes craft
- Line 17210: `if (loaded.skills.craft === undefined) loaded.skills.craft = 0;` — immediately RECREATES craft as 0
- Result: `G.skills` has BOTH `spirit` and `craft` as separate keys after migration
- `showCharSheet()` at line 16202 uses `Object.entries(G.skills||{})` (line 16270) — iterates all keys
- Spirit appears as a real skill row; craft appears as a SECOND row labeled "Craft" (value 0)
- The `skillDisplay()` function at line 11417 maps via `SKILL_DISPLAY` — if `craft` maps to `"Craft"` it shows normally; the spec probe reads `G.skills.craft=0` but the sheet shows a row for "spirit" with the craft value — confirms migration corruption
- **"Undefined 8"** row: if any key in `G.skills` is not in `SKILL_DISPLAY` after normalization, `skillDisplay()` falls back to `key.charAt(0).toUpperCase() + key.slice(1)` — literal key name displayed
**Fix:** In migration, do NOT recreate craft after deleting it (remove line 17210 entirely, or change condition).
**File:** `ledger-of-ash.html` `loadGame()` migration lines 17206–17210

### 15. Journal using invalid categories
**Root (from headed log):** `faction`, `rival`, `fact` observed in journal log — these are DOM section IDs, NOT valid `addJournal()` categories. Silent failure.
**Action:** `grep -rn "addJournal" content/` — find all calls using `'faction'`, `'rival'`, `'fact'`, `'investigation'`, `'decision'`, `'consequence'` and replace with valid categories: `evidence`, `intelligence`, `rumor`, `discovery`, `contact_made`, `complication`, `field_note`.
**File:** All `content/*.js` files

### 16. HUD ability badge shows "TRAIT READY" but count = 0
**Root (from headed log):** Badge label fires `TRAIT READY` but count badge reads 0 — state mismatch.
**File:** `ledger-of-ash.html` `updateHUD()` badge render logic

### 17. Char sheet "Undefined" skill row with value 8
**Root (from headed log, support-leadership_healer_a1):** `skills: ... | Undefined 8` — char sheet renders a skill row with no display name. Value 8 matches `G.skills.craft` — craft is either labeled "Undefined" or inserted as an extra unlabeled row. `renderCharacterSheet()` skill loop likely iterates `G.skills` object keys and one key lacks a display-name mapping.
**Related to item 14** — the spirit/craft VIOLATION is likely the same row-order bug seen from a different angle.
**File:** `ledger-of-ash.html` `renderCharacterSheet()` ~line 10418

### 18. No ability cards on char sheet at level 5 (healer)
**Root (from headed log):** `WARN: no .ability-card found` at level 5 for `support-leadership_healer_a1`. Abilities should be present. Either healer archetype has no ability pool entries or `.ability-card` selector doesn't match the rendered DOM.
**File:** `ledger-of-ash.html` `renderCharacterSheet()` ability section + `ARCHETYPE_ABILITY_POOLS` healer entry

### 19. XP = 0 at pick 60, level 5 (healer) — `xpReward` field is decorative
**Root (spec-mined, confirmed):** XP is awarded by `loa-enriched-bridge.js` line 458 via **tag-based lookup** (`_XP_BY_TAG[choice.tag] || 20`), NOT via `choice.xpReward`. The `xpReward` field defined in 100+ content choices is DECORATIVE — only the backup choice generation reads it (line 564) for a fallback calculation. `adaptEnrichedChoice` itself does NOT call `gainXp()`.
**`gainXP()` uppercase does not exist** — only `gainXp()` (lowercase) at line 12516. CLAUDE.md may reference stale uppercase form.
**Implication:** If `loa-enriched-bridge.js` is not loaded, not patching the right function, or XP tag lookup is missing healer tags, XP awards silently fail. At level cap (5 for Stage I), XP should flow to `G.masteryXP` — `xp=0` at level 5 in Stage II may mean bridge is awarding XP but checkLevelUp is consuming it.
**Action:** Verify `loa-enriched-bridge.js` is loaded for all archetypes. Check `_XP_BY_TAG` covers healer choice tags. Verify `G.masteryXP` accumulates when at level cap.
**File:** `content/loa-enriched-bridge.js` lines 458, 463; `ledger-of-ash.html` `gainXp()` line 12516

### 20. Companions HUD + combat abilities — unverified functional
**Root (deep-enchanting-clover P0):** Not confirmed working since plan session.
**Action:** Verify `#hud-companions` renders when companion active; companion combat ability buttons appear in `renderCombatRound()`; `post_watches` camp button appears in Stage II after `maren_oss_resolved`.
**File:** `ledger-of-ash.html` companion + combat render paths

---

## P1 — CONTENT GAPS

### 18. 0 sp2 localities — need sp2-advancing paths
**Localities:** ithtananalor, mimolot, guildheart, fairhaven, panim — all visited but 0 sp2.
**Action:** Add ≥1 choice with `stageProgress:1` + `plot:'main'` per locality. Follow the Kael Emberthrone / sunspire_haven pattern.

### 19. Dead-ends in fairhaven (pick 35) and shelkopolis (pick 21)
**Action:** Find the choice firing at those pick counts; ensure every enriched choice has `failResult` or calls `loadStageChoices` in `fn()`.

### 20. Authority patrol_guard for cosmouth/zootia/sheresh/nomdara — P1 canon pass
- cosmouth → `border_enforcer` or `customs_inspector` (new template needed)
- zootia → `patrol_guard` (genuinely generic — may be acceptable)
- sheresh → `patrol_guard` (Dome Stewards don't fight — keep)
- nomdara → `patrol_guard` (transit-only — acceptable)

### 21. Camp Talk `showCampTalk()` — IMPLEMENTED, gate verification only
**Spec-mined, confirmed:** Fully implemented at line 2635. Gate: `G.flags.maren_oss_resolved` (returns early with fallback if not set). Cycles `COMPANION_DEFS[comp.id].campLines`. Set in `stage2_climax.js:159` in `_closeClimax()`.
**Action:** Verify `maren_oss_resolved` is being set by the climax completion path in Stage II play. No code change needed unless gate is wrong.

### 22. Contacts NPC Menu — IMPLEMENTED, filtering wiring documented
**Spec-mined, confirmed:** `showNPCMenu()` at line 15812. Filters by `G.skills.wits` (not "Lore" — the key is Wits). Trust labels at thresholds: ≥10=Trusted, ≥3=Acquainted, <-3=Hostile, else=Stranger. Approach button hidden when trust < 0.
**Action:** Verify `contact_made` journal entries are populating after NPC approach scenes. Verify NPC approach result calls `addJournal(text, 'contact_made')` in content files.

### 23. Places overlay — functional testing
**Root (deep-enchanting-clover P0):** After `buyShopItem()` fix, verify: shop items render with cost/desc/buy button; tavern rumors visible; gold deducted on purchase; sell tab shows materials + items at correct prices.

### 24. Equipment bonus — flat schema verification
**Root (deep-enchanting-clover P0):** `getEquipmentBonus(skill)` at line 12939 — confirm reads flat `ITEM_DEFS` schema correctly after flatten; bonuses apply to `rollD20()` during play.

### 25. NPC model compliance — 17 localities not yet audited
**Root (BACKLOG PARTIAL):** Dravn Pell, Sera Ironveil, Coralyn Tideglass, 5-locality spot check done. ~17 Stage I + Stage II localities not yet audited for agenda/register/tell compliance.
**Action:** Run dual-agent audit per locality using V33_2 canonical NPC roster.

### 26. 240 orphan ITEM_DEFS — not yet distributed through shops + loot
**Root (deep-enchanting-clover P2):** 240 items defined in `item_system.js` but not assigned to shop inventories or enemy loot tables. Current state: 2 items per locality (partial).
**Action:** Audit all 240; assign to a locality shop or loot table. Schema confirmed flat and working.

### 27. Weather prose injection
**Root (deep-enchanting-clover P3):** When `G.worldClocks.weather >= 3`, inject region-aware prose into arrival narration. DC modifiers already exist — prose only.
**Prose by region:** Sheresh = dome pressure / blizzard risk; Psanan = ash surge; coastal (Cosmouth, Panim Haven) = storm warning; others = rough conditions.
**File:** `ledger-of-ash.html` `resolveArrival()` or `buildLivingDesc()`

### 28. `enterAuthorityConfrontation` polity-specific flavor text
**Root (deep-enchanting-clover P4):** Confrontation function uses generic text for all 11 polities.
**Action:** Add polity-specific confrontation prose per polity — Magi Magistratus: arcane disclosure requirements; Giant Council: tower jurisdiction + quota; Panim: ritual law violation; Shelk: roadwarden mandate language.

### 29. Locality canon audit — choices + result text vs V33_2
**Scope:** For each visited Stage I + Stage II locality, audit choice labels and result text against V33_2 locality packet, text RPG packet, and arrival kit.
**What to check:** Correct institutions, canonical NPC names, correct physical infrastructure, faction naming (ORE, Roadwardens Order, Magi Magistratus, Guild Sanction Board), no forbidden words.
**Priority order:**
1. Ithtananalor — ORE + Iron Accord + Shadowhands (most complex)
2. Shirshal — Magi Magistratus flavor missing from choice text
3. Panim Haven — choice text may still say "guards" (Ritual Enforcer now correct)
4. Mimolot Academy — book tariff enforcement flavor
5. Cosmoria — archive customs + maritime law
6. Guildheart Hub — Guild Sanction Board naming
7. Fairhaven — Shelk polity, Roadwardens presence
8. All Sheresh communes — Dome Stewards vs Route Warden Compacts
9. Remaining localities

### 30. stageProgress denominator missing from HUD
**Root (BACKLOG P1):** Player sees `7` not `7 / 10`. Incentive chain incomplete — player doesn't know how far they are.
**Fix:** Add threshold denominator to `#hud-stage-progress-val` render in `updateHUD()`.

### 31. Bold reward differential — bold success = same +1 as safe
**Root (BACKLOG P1):** Bold success should give +2 stageProgress; safe +1. Restores risk/reward calculus.
**File:** `adaptEnrichedChoice()` stageProgress increment logic

### 32. Tutorial: heat + rival first-occurrence callouts missing
**Root (BACKLOG P1):** One-time inline notices on first `addHeat()` call and first rival threshold crossing never fire.
**File:** `ledger-of-ash.html` `addHeat()` and rival threshold check

### 33. Gold/supply drain — travel is free
**Root (BACKLOG P1):** `advanceTime(1)` not consuming supply. No daily supply sink on foot travel. Shortage should = small HP/morale penalty. Add 1–2 gold toll in `resolveArrival` for non-adjacent travel.

### 34. Fumble locking — PARTIAL, needs activation
**Root (BACKLOG PARTIAL):** Code complete. Needs `{type:'flag', key:'fumble_locked', value:true}` added to at least one choice per Stage 1 file where main plot choice fumbles.

### 35. `'Meaningful'` tag on every Stage 1 choice — non-functional
**Root (BACKLOG P2):** Every Stage 1 choice has `'Meaningful'` as first tag — provides zero classification signal. Remove and replace with actual skill/action type tags.

### 36. "pulls you aside" repeated 9× across 8 localities
**Root (BACKLOG P2):** Prose audit finding. Vary NPC approach geometry: overheard, note passed, document drop, third party, social pressure.

### 37. Closing meta-summary pattern in result text
**Root (BACKLOG P2):** 5+ passages audited with final editorial sentence naming the theme. Strip these; let scenes close on action or image.

---

### 40. `day=undefined` during map-travel log — dayCount read before write
**Root (from headed log, confirmed):** `[map-travel] travel initiated to guildheart day=undefined` logged at picks 57 and 105. The spec reads `G.dayCount` immediately when the travel overlay fires — before `startOverlayJourney` increments it. This is the concrete mechanism of item 5's day counter bug: the value IS written, but the HUD update fires against the pre-travel state or the read happens before the async journey resolves.
**Action:** In `startOverlayJourney`, confirm `G.dayCount +=` runs synchronously before `updateHUD()`. Check whether the spec log fires before or after the journey completes. The `day=undefined` (not `day=0`) suggests `G.dayCount` itself may be uninitialized for this archetype/run path.

### 41. Label-audit VIOLATIONS — infinitive verbs in choice labels
**Root (from headed log):** Spec `label-audit` probe caught:
- Pick 100: `"Find work first. A hired hand has access an idle stranger do..."` — starts with infinitive "Find"
- Pick 110: `"Take the document. It should not be here."` — starts with imperative/infinitive "Take"
**These are player-facing content bugs** — labels must be the player's inner voice, not action instructions.
**Action:** Search all `content/*.js` for choice labels beginning with `"Find "`, `"Take "`, `"Ask "`, `"Check "`, `"Go "`, `"Get "`, `"Use "`, `"Talk "` and replace with inner-voice phrasing per CLAUDE.md standard.

### 42. `#stage3-blocked-modal` blocks all clicks after Stage II success — spec stall + player UX bug
**Root (headed run 0328, confirmed):** When `sp2 >= 12` and `canAdvanceToStage3()` returns false, a `modal-overlay` div with `id="stage3-blocked-modal"` renders over the page and intercepts all pointer events. The spec's `dismissOverlays()` does not call `dismissStage3BlockedModal()`, so the click-retry loop runs until 60s stall-timeout fires. This caused `classic-combat / ranger` to stall-timeout at sp2=13 (past the success threshold) despite actually completing Stage II.
**Two fixes needed:**
1. **Spec fix:** Add `dismissStage3BlockedModal()` call (or direct `classList.remove('active')` / `style.display='none'`) to the spec's `dismissOverlays` helper in `tests/e2e/helpers/` — **requires explicit user approval per Playtest Change Gate**.
2. **Game fix:** The modal should not intercept ALL pointer events indefinitely. After the player clicks "Return to Stage II", the modal should hide and normal play should resume. Verify `dismissStage3BlockedModal()` actually hides the overlay and the `modal-overlay` class doesn't re-trigger.
**File:** `ledger-of-ash.html` `dismissStage3BlockedModal()` + `#stage3-blocked-modal` render condition; `tests/e2e/helpers/` dismissOverlays

### 43. Balance matrix: ONLY "combat" skill fires across ALL archetypes — systemic gap
**Root (confirmed across two headed runs — 0150 and 0328):** Every family in both runs shows only `combat` firing in the balance matrix (survival=0, lore=0, stealth=0, persuasion=0, craft=0). All archetypes, all families.
**Two candidate causes:**
1. The spec's `skill-use` logger reads `choice.skill` from the raw choice object — if enriched choices use display-name keys (`'might'`, `'wits'`, `'finesse'`) instead of the old internal keys (`'combat'`, `'lore'`, `'stealth'`), the balance matrix won't count them (it buckets by old key names).
2. Enriched choice content genuinely doesn't set `skill:` on most choices — the field is optional and most choices omit it, so only the explicit `tag:'risky' skill:'combat'` choices register.
**Action:** Check the balance matrix logger in the spec — does it read `choice.skill` directly? If so, what key format does it expect? Then sample 10 enriched choices across Stage II content to see how many have explicit `skill:` fields.
**File:** `tests/e2e/playtest-headed.spec.js` balance-matrix logger; `content/` enriched choice files

### 44. `abilities=0` confirmed for ALL archetypes across ALL headed runs
**Confirmed by 0150 and 0328 reports** — berserker, illusionist, spellthief, saint, ranger, inquisitor, thief, healer, warrior — EVERY archetype shows `abilities=0`. This is the `renderAbilityStep()` line 13964 bug (reads `ARCHETYPE_TRAIT_POOLS` instead of `ARCHETYPE_ABILITY_TREES`). No archetype has ever successfully received an ability from the level-up screen in a headed run. This is the highest-confidence P0 fix.

### 45. Persistent 0-sp2 localities: fairhaven, ithtananalor, panim
**Confirmed across all headed runs** — these three localities are visited every run but contribute 0 sp2 every time. They need `plot:'main'` + `stageProgress:1` choices added. High priority for content pass.

### 46. Choice label validation — runtime-blind, validator-only, incomplete verb list
**Spec-mined, confirmed:** Label rules (`≤15 words`, `no ?`, `no infinitive verbs`) are enforced ONLY in `tests/content/validate-content.js` — zero enforcement at render time or choice registration in the engine. The `LABEL_VERB_RE` pattern at validator line 17 catches only 14 specific prefix verbs (`To`, `Ask`, `Check`, `Go`, `Find`, `Look`, `Talk`, `Tell`, `Take`, `Give`, `Buy`, `Sell`, `Use`). Verbs like `Watch`, `Read`, `Enter`, `Follow`, `Return`, `Move`, `Press` pass unchecked.
**Gap:** 838 pre-existing violations (label length + question marks) documented as baseline. Verb list is incomplete — production content has additional infinitive violations that won't be caught until the regex is expanded.
**Action:** Expand `LABEL_VERB_RE` in `validate-content.js` to include at least: `Watch `, `Read `, `Enter `, `Follow `, `Return `, `Move `, `Press `, `Cross `, `Open `, `Search `, `Leave `.
**File:** `tests/content/validate-content.js` line 17

### 47. `getChoiceDC()` advisory-only without `failResult` — "universal roll rule" not enforced
**Spec-mined, confirmed:** `adaptEnrichedChoice()` gates the entire roll sequence on `if (c.failResult)` at line 11494. If no `failResult`, `getChoiceDC` is called for display metadata only — `c.fn()` executes unconditionally, always succeeds, no roll shown to player. The documented "Universal Roll Rule" (every choice rolls) is only true for choices that have a `failResult` field. Choices without one are de-facto guaranteed successes.
**Not a new bug — this is a design gap.** The CLAUDE.md rule "every choice rolls" describes intent, not current behavior.
**Action:** Decide policy: (a) all enriched choices must have `failResult` (enforced by validator), or (b) choices without `failResult` explicitly "always succeed" and that's acceptable. If (a): add A7-equivalent check to validator for ALL choices regardless of `tag`/`tags` format.

### 48. `failResult` A7 check: scalar `tag:'safe'` only — `tags:` array choices exempt
**Spec-mined, confirmed:** `checkRuleA7` in the validator (line 352) only triggers when `choice.tag === 'safe'` (scalar). Choices using `tags: ['Investigation', ...]` that resolve to `'safe'` tier via semantic matching are **never checked** for `failResult`. The test at validator line 172–173 explicitly exempts them.
**Production impact:** `aurora_crown_commune_stage1_enriched_choices.js` and `cosmoria_stage1_enriched_choices.js` use `tags:` arrays extensively — a large fraction of their safe-tier choices have no `failResult` and silently always succeed at runtime.
**Fix:** Extend A7 check to also fire when a choice resolves to `'safe'` tier via `tags:` array lookup (call `getChoiceTier(choice) === 'safe'` check, not just `choice.tag === 'safe'`).
**File:** `tests/content/validate-content.js` `checkRuleA7` ~line 352; `content/aurora_crown_commune_stage1_enriched_choices.js`, `content/cosmoria_stage1_enriched_choices.js`

### 49. `xpReward` field — 100+ choices, never read, pure dead metadata
**Spec-mined, confirmed:** No reference to `xpReward` exists anywhere in `ledger-of-ash.html` or `content/loa-enriched-bridge.js`. `aurora_crown_commune_stage1_enriched_choices.js` has 46 occurrences; `cosmoria_stage1_enriched_choices.js` and others have many more. Every `fn()` that awards XP calls `gainXp(N, 'reason')` directly with a hardcoded value. The validator only checks `xpReward` is a number if present.
**Recommended action:** Either (a) remove all `xpReward` fields from content via a batch script (reduces confusion), or (b) wire `adaptEnrichedChoice` to use `choice.xpReward` if present instead of the tag-based bridge lookup. Option (b) gives content authors meaningful control.

### 50. `plot:'main'` — wired correctly, but Stage I main quest choices still missing it
**Spec-mined, confirmed:** `renderChoices()` at line 12231 adds `plot-main` CSS class when `c.plot === 'main'`. `prioritizeChoices()` at line 11788 preferentially includes up to 3 such choices in the capped pool. `content/CLAUDE.md` explicitly documents: "Stage 1 main quest choices currently have NO `plot:'main'` — needs a pass to add it." This is still unresolved.
**Impact:** Without `plot:'main'`, Stage I advancement choices are not blue-bordered (player has no visual signal for main story), AND they compete equally with non-plot choices in the 8-choice cap pool (can be deprioritized/dropped).
**Action:** Audit all Stage I enriched choices that call `G.stageProgress[1]++` or fire stage-advancing content — add `plot: 'main'` to each.
**File:** All `content/*_stage1_enriched_choices.js` files

---

## P2 — COSMETIC / UX

- Stage II banner z-stacking (screenshots)
- Camp rest toast overlapping choices
- `handleLevelup` spec: add `#btn-lu-ability-done, #btn-lu-done` to button locator
- `startCombat` unknown key — add toast before fallback reload instead of silent reload
- Locality name casing on death screen — `"cosmouth"` not `"Cosmouth"` (use `WORLD_LOCATIONS[loc].name` everywhere)
- 8px card tags / 9px item-use buttons — floor at 10px minimum
- "Return to Stage II" label-audit false positive — modal button text flagged as infinitive violation by spec; label-audit probe should whitelist `#stage3-blocked-modal` button text

---

## Headed Playtest Summary (2026-06-06)

| Report | Families | Result | Key Issues |
|--------|----------|--------|-----------|
| 20260606-0150 | 4/4 | ✅ | abilities=0 all archetypes, shelkopolis_common_quarter 0 sp2, only combat skill fires |
| 20260606-0328 | 4/5 | ⚠️ | ranger stall-timeout (stage3-blocked-modal), abilities=0 all archetypes, fairhaven/ithtananalor/panim persistent 0 sp2, only combat skill fires |

**Consistent across both runs:** abilities=0, combat-only balance matrix, fairhaven/ithtananalor/panim zero sp2, 0 JS errors, 0 new validator warnings.

---

## Files Changed This Session

| File | Change |
|------|--------|
| `ledger-of-ash.html` | `addNarration` null guard; AUTHORITY_ENEMY_MAP deduped + fixed |
