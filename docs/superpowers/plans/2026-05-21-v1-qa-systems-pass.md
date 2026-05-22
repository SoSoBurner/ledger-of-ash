# V1 QA & Systems Pass — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring Ledger of Ash Stage 1 & 2 to full player-facing verification — headed spec passing with screencapture analysis, all major systems (combat, travel, archetypes, abilities) wired and player-facing, content expanded to exceed Stage 1 volume.

**Architecture:** Six independent phases executed in order. Each phase produces committed, testable changes. Phases 1–2 are prerequisites; Phases 3–6 can be worked in parallel after Phase 2 completes. Primary file is `ledger-of-ash.html` (16K+ line single-file game engine); content files are in `content/*.js`; test harness is `tests/e2e/`.

**Tech Stack:** Vanilla ES5/ES6 JS, Playwright (E2E), Node.js (validators + post-run analysis), Claude API (post-run analysis domains)

---

> **Subsystem split note:** Phases 3–6 are independent. If parallelizing, assign each phase to a separate worktree/agent. Phase 1 and 2 must complete before any Phase 3–6 work is committed.

---

## Key Files Reference

| File | Phases |
|---|---|
| `ledger-of-ash.html` | 1, 3, 4, 5 |
| `content/travel_corridors.js` | 3 |
| `content/stage1_boss.js` | 3 |
| `content/stage2_boss.js` | 3 |
| `content/stage2_enriched_choices.js` | 6 |
| `content/stage2_antechamber.js` | 6 |
| `content/*_stage2_enriched_choices.js` | 6 |
| `tests/e2e/playtest-headed.spec.js` | 1, 2 |
| `tests/e2e/post-run-analysis.js` | 1, 2 |
| `tests/e2e/helpers/coverage-tracker.js` | 1 |

---

## Phase 1: Pre-Verification Infrastructure Fixes

**Files:** `tests/e2e/playtest-headed.spec.js`, `tests/e2e/post-run-analysis.js`

### Task 1.1 — Fix dead-end probe 3× dedup in headed spec

The headed spec fires the dead-end probe 3 times per pick during stalls. Each `picks % N === 0` condition fires N times on the same pick with `continue`. Guard with a `lastDeadEndPick` variable.

- [ ] **Read** `tests/e2e/playtest-headed.spec.js` — search for `dead-end` or `DEAD_END` or `deadEnd` probe logic (~lines 100–200)
- [ ] **Find** the probe block that logs dead-ends and add a guard:
  ```js
  var lastDeadEndPick = -1;
  // Inside the probe condition:
  if (pickNum !== lastDeadEndPick) {
    lastDeadEndPick = pickNum;
    // existing dead-end logging code
  }
  ```
- [ ] **Commit:** `fix: headed spec dead-end probe dedup — guard lastDeadEndPick prevents 3x logging per pick`

### Task 1.2 — Fix post-run-analysis.js screenshot path

The spec writes screenshots to `tests/test-results/playthrough-screenshots/headed/` but `post-run-analysis.js` looks in `test-results/playthrough-screenshots/headed/` (missing `tests/` prefix).

- [ ] **Read** `tests/e2e/post-run-analysis.js` lines 1–30 — find the `SCREENSHOTS` path constant
- [ ] **Current code** (line ~24):
  ```js
  const SCREENSHOTS = path.join(ROOT, 'test-results', 'playthrough-screenshots', 'headed');
  ```
  **Fix to:**
  ```js
  const SCREENSHOTS = path.join(ROOT, 'tests', 'test-results', 'playthrough-screenshots', 'headed');
  ```
- [ ] **Also fix `TEST_RESULTS`** constant if it's used for the report search:
  ```js
  const TEST_RESULTS = path.join(ROOT, 'tests', 'test-results');
  ```
- [ ] **Verify** by running: `node -e "const p=require('path'); console.log(require('fs').existsSync(p.join('C:/Users/CEO/ledger-of-ash','tests','test-results')))"` → should print `true`
- [ ] **Commit:** `fix: post-run-analysis — correct screenshot and test-results path (tests/ prefix missing)`

### Task 1.3 — Fix post-run-analysis.js stale model IDs

Two analysis domains use `claude-sonnet-4-5-20251022` (model no longer available). Update to current models.

- [ ] **Read** `tests/e2e/post-run-analysis.js` — search for `model` or `claude-sonnet-4-5`
- [ ] **Find all model ID references** — update:
  - Standard analysis domains → `claude-sonnet-4-6`
  - HUD/G-State Cross-Reference and UI Duplication (complex cross-referencing) → `claude-opus-4-7`
  - Example pattern to find and replace:
    ```js
    // Before:
    model: 'claude-sonnet-4-5-20251022'
    // After (standard domains):
    model: 'claude-sonnet-4-6'
    // After (HUD / UI duplication domains):
    model: 'claude-opus-4-7'
    ```
- [ ] **Commit:** `fix: post-run-analysis — update stale model IDs to claude-sonnet-4-6 / claude-opus-4-7`

### Task 1.4 — Enhance headed spec: full overlay interaction depth

> **Playtest Change Gate:** This task modifies `tests/e2e/playtest-headed.spec.js`. Confirm with user before making changes — note that the user has explicitly requested these changes in this planning session.

The headed spec must **make selections** in-game and **screencapture them** — not just open overlays. Update these probe functions:

**`probeShop` — add sell flow after buy:**
- After successfully clicking a buy button: read gold before, then call `probeInventory` inline (open sheet, find the purchased item by name match), click its `Sell` button (`.sell-btn[data-idx]` or `button:has-text("Sell")`), screenshot before/after, read gold after, log gold delta
- If sell button not visible: log `[panel:shop tag] WARN: sell button not found after buy`

**`probeCamp` — exercise all available actions:**
- Add attempts for: `sleep`, `post_watches`, `lay_low`, `recover`, `review_notes`, `talk`
- Pattern for each: check `button.camp-action[data-camp="ACTION"]` is visible AND enabled; if so, click it, `waitForTimeout(PACE.short)`, screenshot result, log result text; if not visible or disabled, log `SKIP`
- `sleep` advances the day — this is expected; continue after
- `review_notes` and `talk` may be gated by flags — log SKIP if disabled, not FAIL

**`probeContacts` — click all visible contact cards:**
- After opening the overlay, find all `.npc-entry, .contact-card, [data-npcid]` cards
- For each: click it, `waitForTimeout(PACE.panelDwell)`, screenshot, read `.npc-dialog-text, .contact-dialog, .npc-bio` first 120 chars, log, close dialog (Escape or close button)
- If 0 contacts found: log `[panel:contacts tag] WARN: no contact cards visible`

**`probeParty` — click each companion card:**
- After opening the overlay, find all `.companion-card, .party-member-card, [data-companion]`
- For each: click it, screenshot, read `.companion-bio, .companion-dialog, .companion-profile` first 120 chars, verify non-empty (log WARN if empty), close
- If 0 companions: log `[panel:party tag] WARN: no companions — expected empty at early play`

**`handleLevelup` — 3-step verification:**
- Current: picks first option on whatever step is shown
- New: after each click, wait up to 2s for next step's `.lu-option` or `.levelup-option` to appear; screenshot before each pick; after third step (or when modal closes), log `[panel:level-up tag] 3-step complete lvl=X`
- If only 1 or 2 steps render (archetype doesn't have all tiers yet): log `[panel:level-up tag] WARN: only N steps rendered`

**`probeHUDAbilityBadge` — new probe (call once per run after first level-up):**
```js
async function probeHUDAbilityBadge(page, tag) {
  // 1. Check badge count
  const badge = page.locator('#hud-trait-ready,[id*="trait-ready"],[class*="trait-ready"]').first();
  if (!await badge.isVisible({ timeout: 600 }).catch(() => false)) {
    log(`[hud-ability-badge ${tag}] SKIP: badge not visible`); return;
  }
  const badgeTxt = await badge.innerText().catch(() => '');
  const count = parseInt(badgeTxt.match(/\d+/)?.[0] || '0');
  log(`[hud-ability-badge ${tag}] badge="${badgeTxt}" count=${count}`);
  if (count === 0) { log(`[hud-ability-badge ${tag}] WARN: count=0 after level-up`); return; }
  // 2. Click badge — should open char sheet to traits tab
  await badge.click();
  await page.waitForTimeout(PACE.panelDwell);
  await screenshot(page, `${tag}_hud_badge_click`);
  const sheetOpen = await page.locator('#overlay-charsheet').isVisible({ timeout: 1500 }).catch(() => false);
  log(`[hud-ability-badge ${tag}] click-opens-sheet=${sheetOpen}`);
  // 3. Verify ability listed in traits section
  const traitsText = await page.locator('.trait-section,.ability-card').first().innerText().catch(() => '');
  log(`[hud-ability-badge ${tag}] traits-sample: "${traitsText.slice(0,100).replace(/\n/g,' ')}"`);
  if (!traitsText) log(`[hud-ability-badge ${tag}] WARN: no trait/ability cards in sheet after badge click`);
  await closeSpecificOverlay(page, 'overlay-charsheet');
}
```

**`probeMap` — click a destination (previously read-only):**
- Remove the "do NOT click" guard
- After screenshotting the open map: find `.map-travel-btn[data-locid]:not([disabled])` buttons
- Click the first enabled button that is NOT the current location
- Wait for travel to complete (`waitForChoices` or `waitForSelector('.choice-btn')`)
- Screenshot arrival scene
- Read `g = await readG(page)` and log new location
- If no enabled buttons: log `[panel:map tag] WARN: no travel destinations available`
- Note: `openMapAndTravel()` helper still handles periodic organic travel; this probe does the pick-20 visual verification travel

- [ ] **Implement** all 6 changes above in `tests/e2e/playtest-headed.spec.js`
- [ ] **Run** headed spec for family 1 only (warrior/w_garrison) as a smoke test before full run
- [ ] **Verify** screenshots include: camp_sleep, camp_post_watches, contacts dialog, companion profile, 3 level-up steps, hud_badge_click, map arrival
- [ ] **Commit:** `feat: headed spec — full overlay interaction depth (buy+sell, all camp, all contacts, party profiles, 3-step levelup, map travel, hud badge)`

---

## Phase 2: Headed Verification Run + Visual Audit

### Task 2.1 — Run headed spec

```powershell
Set-Location "C:\Users\CEO\ledger-of-ash"
cmd /c "npx playwright test tests/e2e/playtest-headed.spec.js --timeout=600000 --reporter=line"
```

Expected: 4/4 (or 6/6 depending on spec config) families pass. Post-run analysis auto-triggers and writes `tests/test-results/playtest-analysis-{YYYYMMDD-HHmm}.md`.

If any family fails: triage the failure log, fix the blocking issue, re-run. Do NOT proceed to Phase 3+ until headed spec passes cleanly.

### Task 2.2 — Visual audit checklist from screenshots

After headed run, review screenshots in `tests/test-results/playthrough-screenshots/headed/`. For each feature below, confirm at least 1 screenshot shows it working:

| Feature | What to look for | Pass criteria |
|---|---|---|
| Shop | Shop overlay with items + Buy buttons | Items render, gold deducted on buy |
| Sell | Inventory with Sell button (when at shop locality) | Button visible, gold increases |
| NPC interactions | NPC menu with contact list + Approach button | At least 2 NPCs visible |
| Contacts overlay | `#overlay-contacts` panel rendered | NPC names + trust levels shown |
| Party overlay | Party member cards rendered | Companion cards with abilities shown |
| Boss encounter | Red-bordered encounter panel (`encounter--boss`) | Distinct visual vs. normal combat |
| Travel map | Map overlay with locality buttons | Travel buttons clickable |
| Combat HUD | Attack/Defend/Move/Retreat + ability options | Ability name appears in action list |
| TRAITS badge | `hud-trait-ready` shows count | "TRAITS X/Y READY" visible in HUD |
| Level-up screen | 3-step UI (stat/trait/ability) | All 3 steps render |

Flag any feature absent from all screenshots as a gap requiring a fix task.

### Task 2.3 — Arc spot-check (manual)

Open `ledger-of-ash.html` in Chrome via `play.bat`. Start a new game with Cosmoria background. Travel to Shelkopolis. Confirm:
- Arc choices appear in the choice panel (distinct from standard Shelkopolis choices)
- Arc choices have proper labels (no infinitives, ≤15 words)
- After completing the arc, `G.flags.arrived_from_cosmoria === true` in DevTools console

Pass: arc choices visible. Fail: no arc choices → investigate `loadStageChoices` arc injection block.

### Task 2.4 — Boss encounter spot-check (manual)

In Chrome DevTools console, on a live game at Stage I:
```js
G.stageProgress[1] = 15; G.flags.stage1_miniboss_complete = true; loadStageChoices(G.location);
```
Confirm: boss encounter panel renders with red border (`.encounter--boss` class), "no retreat" lock active.

---

## Phase 3: Combat System Fixes

**Files:** `content/travel_corridors.js`, `content/stage1_boss.js`, `content/stage2_boss.js`, `ledger-of-ash.html`

### Task 3.1 — Remove law enforcement from biome encounter pools

`patrol_guard` (Shelk Roadwardens) and `border_enforcer` (Roaz checkpoints) are in biome pools and route to `enterCombat()` instead of `enterAuthorityConfrontation()`. Replace with non-authority adversaries.

- [ ] **Read** `content/travel_corridors.js` — find `TRAVEL_ENCOUNTER_POOLS` or `BIOME_ENCOUNTER_POOLS`
- [ ] **Replace** all occurrences of `patrol_guard` and `border_enforcer` in the pools:
  ```js
  // plains pool — before:
  { id: 'patrol_guard', ... }
  // after:
  { id: 'road_bandit', name: 'Road Bandit', hp: 10, attack: 3, defense: 4, xp: 15 }

  // highland pool — before:
  { id: 'border_enforcer', ... }
  // after:
  { id: 'shadowhands_watcher', name: 'Shadowhands Watcher', hp: 9, attack: 3, defense: 5, xp: 18 }
  ```
  Replacement mapping:
  - `patrol_guard` → `road_bandit` (plains, coastal, ice-locked)
  - `border_enforcer` → `shadowhands_watcher` (highland) or `red_hood_operative` (mountain) or `hostile_debtor` (ash-zone)
- [ ] **Verify** no `patrol_guard` or `border_enforcer` remain in biome pool arrays (check with grep)
- [ ] **Commit:** `fix: remove law enforcement from biome encounter pools — replace with road_bandit/shadowhands/red-hood`

### Task 3.2 — Boss encounter narrative reframe

Both Stage 1 boss encounters are law enforcement. The fix: reframe opening encounter text to clarify this is an investigative confrontation the player has chosen to pursue, not an arrest scenario.

- [ ] **Read** `content/stage1_boss.js` — find the mini-boss encounter opening text (Gleam) and main boss opening text (Ironveil)
- [ ] **Edit Gleam opening** — change "you are stopped / blocked / intercepted" framing to "you seek him out / confront him / force the meeting":
  - Before (approximate): narration that Gleam approaches and stops the player
  - After: narration that the player tracks Gleam to a checkpoint and forces the confrontation
- [ ] **Edit Ironveil opening** — same reframe: player has chosen to confront the Marshal, not the Marshal arresting the player:
  - Before: Ironveil has the player brought in / summoned
  - After: player enters the intake hall deliberately, on their terms
- [ ] **Read** `content/stage2_boss.js` — confirm Pell's confrontation is already player-initiated (the player exposes him), no reframe needed unless narrative reads as arrest
- [ ] **Commit:** `fix: boss encounter narrative — reframe Gleam + Ironveil as player-initiated investigative confrontations`

### Task 3.3 — Combative abilities as additional action + enemy balancing

The user confirmed combative abilities are ADDITIONAL actions (bonus hit on top of normal attack). Enemy HP/attack must be balanced to account for this.

- [ ] **Read** `ledger-of-ash.html` — search `executeTraitAbility` and the combat action handler for `action === 'ability'` or similar
- [ ] **Confirm** that combative ability execution does NOT prevent the normal attack in the same round (i.e., it's a bonus, not a replacement). If it currently replaces attack: change the flow so ability fires as a bonus action and standard attack still resolves.
- [ ] **Find** `ENEMY_STATS` or `ENEMY_TEMPLATES` in the bestiary — identify Stage 1 and Stage 2 enemy HP/attack values
- [ ] **Apply balance adjustments** — if player now gets an extra hit per round via ability, enemy HP needs ~15–20% increase to maintain fight length:
  - Stage 1 standard enemies: +2 HP (e.g., road_bandit 10→12 HP)
  - Stage 1 miniboss: +3 HP
  - Stage 2 standard enemies: +3 HP
  - Stage 2 boss: +4 HP
  - Adjust by looking at actual current values in `ENEMY_STATS` — apply the percentage, not these absolute numbers if actuals differ significantly
- [ ] **Run** `node tests/content/validate-content.js` — confirm 0 new violations
- [ ] **Commit:** `feat: combative abilities are additional actions + proportional enemy HP balancing`

---

## Phase 4: Travel System — All Location Changes Through Map Menu

**Files:** `ledger-of-ash.html`

**Context:** 7 code paths change `G.location` without opening the map overlay. The user requires ALL location changes to go through the map menu, including story-driven ones. The map overlay is `#overlay-map` opened via `showMap()`.

**Design decision:** For story-directed travel (choice effects `type:'travel'`, arc transitions), present the map with the destination pre-highlighted and a "Confirm travel to [Destination]" button. Player must click to proceed. This preserves the travel encounter system triggering for all moves.

### Task 4.1 — Add `confirmMapTravel(destLocId, onConfirm)` helper

- [ ] **Read** `ledger-of-ash.html` — find `showMap()` function and `#overlay-map` HTML
- [ ] **Add** a new function `confirmMapTravel(destLocId, onConfirm)` near `showMap()`:
  ```js
  function confirmMapTravel(destLocId, onConfirm) {
    // Open map overlay with destination pre-selected
    showMap();
    // Highlight the destination button
    var destBtn = document.querySelector('.map-travel-btn[data-locid="' + destLocId + '"]');
    if (destBtn) {
      destBtn.classList.add('map-btn--preselected');
      destBtn.textContent = destBtn.textContent + ' ►';
    }
    // Inject a confirm banner above the map
    var mapBody = document.getElementById('overlay-map-body') || document.querySelector('#overlay-map .overlay-body');
    if (mapBody) {
      var banner = document.createElement('div');
      banner.className = 'map-confirm-banner';
      banner.innerHTML = '<span>Your path leads to <strong>' + (WORLD_LOCATIONS[destLocId] && WORLD_LOCATIONS[destLocId].name || destLocId) + '</strong>.</span>' +
        '<button class="choice-btn map-confirm-btn" onclick="closeOverlay(\'map\'); (' + onConfirm.toString() + ')();">Confirm Travel</button>';
      mapBody.insertBefore(banner, mapBody.firstChild);
    }
  }
  ```
- [ ] **Add CSS** for `.map-confirm-banner` and `.map-btn--preselected`:
  ```css
  .map-confirm-banner { background: var(--char); border: 1px solid var(--accent-gold); padding: 12px 16px; margin-bottom: 12px; border-radius: 4px; display: flex; align-items: center; gap: 12px; }
  .map-btn--preselected { border-color: var(--accent-gold) !important; box-shadow: 0 0 8px rgba(216,154,44,.4); }
  ```
- [ ] **Commit:** `feat: confirmMapTravel() helper — opens map with pre-selected destination for story-directed travel`

### Task 4.2 — Route choice effect `type:'travel'` through map

- [ ] **Read** `ledger-of-ash.html` — find `case 'travel':` in `applyEffect()` (~line 12338)
- [ ] **Current code:**
  ```js
  case 'travel': G.location = fx.dest; resolveArrival(fx.dest); break;
  ```
  **Replace with:**
  ```js
  case 'travel':
    confirmMapTravel(fx.dest, function() { _travelCoreTravelTo(fx.dest); });
    break;
  ```
- [ ] **Commit:** `fix: travel effect type — routes through map confirmation before location change`

### Task 4.3 — Route `resolveArrival()` corridor auto-resolution through map

- [ ] **Read** `ledger-of-ash.html` — find `resolveArrival()` (~line 13659) and the calls that trigger it after corridor travel
- [ ] **Identify** the call site(s) where corridor travel auto-resolves to destination without map (the `G.location = dest` before `resolveArrival`)
- [ ] **Wrap** those call sites: instead of immediately setting location, call `confirmMapTravel(dest, function() { _travelCoreTravelTo(dest); })`
- [ ] **Exception:** `resolveArrival` called with the SAME location (in-place re-render) — do NOT wrap those. Only wrap the ones that change `G.location` to a new value.
- [ ] **Commit:** `fix: corridor travel arrival — shows map confirmation before resolving destination`

### Task 4.4 — Route district and Nomdara travel through map

- [ ] **Read** `ledger-of-ash.html` — find `enterDistrict()` (~line 13698) and `enterNomdara()` (~line 13719)
- [ ] **`enterDistrict(districtId)`**: Add `confirmMapTravel(districtId, function() { /* original enterDistrict body */ })` wrapper, or open the map filtered to district options
- [ ] **`enterNomdara()`**: Add `confirmMapTravel('nomdara', function() { /* original enterNomdara body */ })` wrapper
- [ ] **Commit:** `fix: district and Nomdara travel — route through map confirmation overlay`

### Task 4.5 — Unify `startTravel()` and `doTravelJourney()` through map

- [ ] **Read** `ledger-of-ash.html` — find `startTravel()` (~line 14392) and `doTravelJourney()` (~line 14431)
- [ ] **`doTravelJourney(dest, ...)`**: Wrap the final location assignment with `confirmMapTravel(dest, function() { _travelCoreTravelTo(dest); })`
- [ ] **`startTravel(dest)`**: Same treatment — wrap destination assignment
- [ ] **`_travelCoreTravelTo(dest)`**: This is the core teleport — it should NOT be wrapped (it's the confirmed destination setter). Ensure it calls `resolveArrival(dest)` and `loadStageChoices(dest)`.
- [ ] **Commit:** `fix: startTravel/doTravelJourney — route through map confirmation before destination resolution`

### Task 4.6 — Run validators + headless spec to confirm no regressions

```powershell
node tests/content/validate-content.js && node tests/content/validate-flags.js && node tests/content/validate-structure.js
```
Then:
```powershell
cmd /c "npx playwright test tests/e2e/playtest-headless.spec.js --timeout=600000 --reporter=line"
```
Expected: 4/4 families pass, 0 new violations.

---

## Phase 5: Archetype & Ability System

**Files:** `ledger-of-ash.html`

### Task 5.1 — Archetype family reorganization (Cleric → Support, Death Knight → Magic)

**Target:** Combat 6 / Magic 6 / Stealth 6 / Support 6.
- Move `cleric`: Magic → Support (charm:2, spirit:1, faith-based healing abilities)
- Move `death_knight`: Support → Magic (might:0, charm:3, necromantic ability pool)

- [ ] **Read** `ledger-of-ash.html` — search `getArchetypeFamily` (~line 2859)
- [ ] **Current arrays:**
  ```js
  var MAGIC_ARCHETYPES = ['wizard','cleric','priest','necromancer','illusionist','inquisitor','elementalist'];
  var SUPPORT_ARCHETYPES = []; // or default
  ```
  **Updated:**
  ```js
  var MAGIC_ARCHETYPES = ['wizard','priest','necromancer','illusionist','inquisitor','elementalist','death_knight'];
  // Support is the default fallback — cleric will fall through to Support
  // Remove cleric from MAGIC_ARCHETYPES; add death_knight
  ```
- [ ] **Verify** `getArchetypeFamily('cleric')` returns `'support'` and `getArchetypeFamily('death_knight')` returns `'magic'` in browser console
- [ ] **Update CLAUDE.md** archetype family table to reflect new groupings
- [ ] **Commit:** `feat: archetype family reorg — Cleric→Support, Death Knight→Magic, achieves 6-6-6-6`

### Task 5.2 — Active ability recharge: per rest/sleep (not per combat)

Currently abilities reset at combat end (`t.used = false` in combat resolution). Change: reset only when player rests at camp (`campAction('rest')` or `campAction('sleep')`).

- [ ] **Read** `ledger-of-ash.html` — search `t.used = false` in the combat resolution section (~line 13855) and in `campAction`
- [ ] **Remove** the combat-end ability reset (line ~13855):
  ```js
  // REMOVE this block in combat end handler:
  G.traits.forEach(function(t) { if (t.type === 'active' || t.traitType === 'active') t.used = false; });
  ```
- [ ] **Add** reset in `campAction` handler for `'rest'` and `'sleep'` cases:
  ```js
  case 'rest':
  case 'sleep':
    // existing rest logic...
    // Reset active abilities
    if (G.traits) G.traits.forEach(function(t) {
      if ((t.type === 'active' || t.traitType === 'active') && t.used) {
        t.used = false;
      }
    });
    if (G.unlockedTraits) G.unlockedTraits.forEach(function(t) {
      if ((t.type === 'active' || t.traitType === 'active') && t.used) {
        t.used = false;
      }
    });
    break;
  ```
- [ ] **Verify** in console: use an ability, check `G.traits[0].used === true`, then trigger `campAction('rest')`, check `G.traits[0].used === false`
- [ ] **Commit:** `feat: active abilities reset per rest/sleep — removes per-combat reset`

### Task 5.3 — Expand archetype trait pools to 12+ entries each

Each archetype currently has 4–5 trait pool entries. Target: 12+ per archetype (2 base + 4 at levelMin 3-5 + 4 at levelMin 6-10 + 2 at levelMin 8-10).

- [ ] **Read** `ledger-of-ash.html` — search `ARCHETYPE_TRAIT_POOLS` — find the full pool definition
- [ ] **For each archetype**, add traits following this structure:
  ```js
  {
    id: 'archetype_traitname',        // snake_case, unique
    name: 'Trait Display Name',
    type: 'active' | 'passive',
    traitType: 'active' | 'passive',
    activeSkillType: 'combative' | 'utility',  // only for active
    desc: 'Player-facing description under 20 words.',
    skill: 'combat' | 'stealth' | 'survival' | 'lore' | 'persuasion' | 'craft',
    bonus: 1 | 2,
    levelMin: 1 | 3 | 5 | 8,
    condition: 'hp_low' | 'hp_critical' | 'urban' | 'wilderness' | 'heat_high'  // for passives only
  }
  ```
- [ ] **Priority order for expansion**: Warrior, Rogue, Wizard first (most-played), then remaining 21 archetypes
- [ ] **Minimum per archetype**: 12 total entries (existing + new). Keep thematic coherence:
  - Combat family traits: might/survival/combat rolls
  - Magic family traits: lore/craft/spirit
  - Stealth family traits: stealth/lore/urban conditions
  - Support family traits: persuasion/craft/charm
- [ ] **Validate** `ARCHETYPE_TRAIT_POOLS['warrior'].length >= 12` in console
- [ ] **Commit:** `feat: expand archetype trait pools to 12+ entries per archetype`

### Task 5.4 — Add urban/wilderness/heat passive condition types

Currently `getTraitBonus` handles `hp_low` and `hp_critical`. Add:
- `urban`: fires when `G.location` is in an urban locality (settlement with buildings)
- `wilderness`: fires when `G.location` is in a travel/wilderness locality
- `heat_high`: fires when `getHeat(currentPolity) >= 5`

- [ ] **Read** `ledger-of-ash.html` — search `getTraitBonus` (~line 12258) — find condition check logic
- [ ] **Define locality type lookup** near `getTraitBonus`:
  ```js
  var URBAN_LOCALITIES = ['shelkopolis','cosmoria','soreheim','panim','nomdara','guildheart',
    'roaz','shirshal','mimolot_academy','cysur','remeny','eloljaro','gwybodaeth',
    'cosmouth','districts','fairhaven','guildheart_hub','panim_haven'];
  var WILDERNESS_LOCALITIES = ['fairhaven','ithtananalor','aurora_crown_commune',
    'glasswake_commune','harvest_circle','whitebridge_commune','plumes_end_outpost',
    'sunspire_haven','craftspire','ironhold_quarry','unity_square'];
  ```
  (Adjust based on `WORLD_LOCATIONS` keys in the engine.)
- [ ] **Extend** condition checking in `getTraitBonus`:
  ```js
  if (t.condition === 'urban' && URBAN_LOCALITIES.indexOf(G.location) === -1) continue;
  if (t.condition === 'wilderness' && WILDERNESS_LOCALITIES.indexOf(G.location) === -1) continue;
  if (t.condition === 'heat_high') {
    var _polity = G.polity || (WORLD_LOCATIONS[G.location] && WORLD_LOCATIONS[G.location].polity);
    if (!_polity || getHeat(_polity) < 5) continue;
  }
  ```
- [ ] **Add example traits** using new conditions to Stealth (urban/heat) and Combat (wilderness) pools:
  ```js
  // Rogue — urban passive:
  { id:'ro_street_knowledge', name:'Street Knowledge', type:'passive', traitType:'passive',
    desc:'Urban network awareness. +2 wits in any settlement.', skill:'lore', bonus:2,
    levelMin:3, condition:'urban' }
  // Ranger — wilderness passive:
  { id:'ra_terrain_read', name:'Terrain Read', type:'passive', traitType:'passive',
    desc:'Wilderness instinct. +2 survival on open routes.', skill:'survival', bonus:2,
    levelMin:3, condition:'wilderness' }
  // Assassin — heat passive:
  { id:'as_wanted_edge', name:'Wanted Edge', type:'passive', traitType:'passive',
    desc:'Pressure sharpens focus. +1 finesse when actively hunted.', skill:'stealth', bonus:1,
    levelMin:5, condition:'heat_high' }
  ```
- [ ] **Commit:** `feat: add urban/wilderness/heat_high passive conditions to getTraitBonus + Stealth/Combat examples`

### Task 5.5 — Verify HUD ability display is player-facing and polished

The `hud-trait-ready` badge shows "TRAITS X/Y READY." Audit: is it accurate, readable, and clickable?

- [ ] **Read** `ledger-of-ash.html` — find `hud-trait-ready` badge rendering in `updateHUD()` (~line 16254)
- [ ] **Check** the count formula counts only `active`/`utility` type traits from BOTH `G.traits` and `G.unlockedTraits`, not passive-only traits
  ```js
  var activeTraits = (G.traits || []).concat(G.unlockedTraits || [])
    .filter(function(t) { return (t.type === 'active' || t.traitType === 'active') && !t.passive; });
  var ready = activeTraits.filter(function(t) { return !t.used; }).length;
  var total = activeTraits.length;
  ```
- [ ] **Add** click handler: clicking the badge should open the character sheet to the traits tab:
  ```js
  document.getElementById('hud-trait-ready').onclick = function() { showCharacterSheet('traits'); };
  ```
  Where `showCharacterSheet(tab)` is the function that opens the sheet — find it and verify it accepts a tab argument. If not, add tab routing.
- [ ] **Verify** in browser: badge shows correct count, clicking opens sheet at traits tab, used abilities show "(used)" label
- [ ] **Commit:** `fix: HUD ability badge — accurate count formula, clickable to traits tab`

### Task 5.6 — Verify passive stacking (additive, no cap)

Confirm `getTraitBonus` sums all matching passive bonuses without capping.

- [ ] **Read** `ledger-of-ash.html` — `getTraitBonus(skill)` function body
- [ ] **Confirm** it uses additive accumulation (e.g., `total += t.bonus`) not a `Math.max` or early return pattern
- [ ] **If** there's a cap: remove it. The design decision is stack additively, no cap.
- [ ] **Test** in console with two +1 might passives both active: `getTraitBonus('combat')` should return 2
- [ ] **Commit:** `fix: getTraitBonus — confirm additive passive stacking, remove any cap if present`

---

## Phase 6: Content Expansion

**Files:** `content/stage2_enriched_choices.js`, `content/*_stage2_enriched_choices.js`, `ledger-of-ash.html`

**Design rule:** Stage II must exceed Stage I total content volume. Each choice added must have:
- Label: player inner voice, ≤15 words, no infinitives, no question marks
- Result text: 60–90 words, scene not summary
- At least one `{type:'sp2Progress', n:1}` effect per 2–3 choices in a locality pool

### Task 6.1 — Investigate shelkopolis 0 sp2 contribution

The coverage tracker showed shelkopolis visited 23 times with 0 sp2 advancement. Diagnose before adding content.

- [ ] **Grep** `stage2_enriched_choices.js` for `locId.*shelk` or `shelkopolis` entries
- [ ] **Check** if shelkopolis has `sp2Progress` choices — if none exist, that's a content gap (not a bug)
- [ ] **Check** if shelkopolis choices exist but have broken condition gates (gating on flags that never fire)
- [ ] **If** no sp2 choices: add 3–5 investigation choices specific to shelkopolis Stage II content, each with `{type:'sp2Progress', n:1}` and appropriate label/result text
- [ ] **If** choices exist but are gated: fix the condition, don't add new choices
- [ ] **Commit:** `feat: shelkopolis Stage II — add sp2-advancing investigation choices` (or `fix: shelkopolis Stage II gate condition` if it was a bug)

### Task 6.2 — Expand cosmoria Stage II depth

Cosmoria contributed 7 sp2 across 23 visits. Target: 15+ sp2 available from cosmoria choices in a typical run.

- [ ] **Read** existing cosmoria Stage II choices — count them and their sp2 effects
- [ ] **Add** 4–6 new cosmoria Stage II choices:
  - 2 safe choices (DC 7, low risk, sp2+1)
  - 2 risky choices (DC 13, sp2+2 on success, flavor on fail)
  - 1 bold choice (DC 16, sp2+3 on success)
  - Each must reference Cosmoria's defining environment (the basin, Titan Towers, the seawall)
- [ ] **Commit:** `feat: cosmoria Stage II — expand choice pool (+5 choices, +15 sp2 ceiling)`

### Task 6.3 — Add Stage II choices to 3 under-covered localities

Guildheart, Ithtananalor, and Soreheim had 0 sp2 contributions. Each needs at least 3 Stage II enriched choices.

- [ ] **For each locality**, add to the relevant Stage II choices file:
  ```js
  // Structure:
  {
    locId: 'guildheart',
    label: 'The guild registry skipped a filing cycle.',
    roll: { skill: 'lore', dc: 13 },
    result: 'Scene text 60-90 words describing what the player finds...',
    effects: [{ type: 'sp2Progress', n: 1 }, { type: 'xp', n: 20 }],
    failResult: 'Scene text for the failed check...',
    failEffects: []
  }
  ```
- [ ] **Guildheart**: 3 choices themed around guild records, trade irregularities, Guildmaster Selene's oversight
- [ ] **Ithtananalor**: 3 choices themed around the institution's records, the suppression pattern visible in administrative data
- [ ] **Soreheim**: 3 choices themed around the decommodification economy, import routes, the Iron Accord
- [ ] **Commit:** `feat: Stage II choices for guildheart, ithtananalor, soreheim (3 each)`

### Task 6.4 — Expand short result texts (530 validator warnings)

Target: address the highest-count files first. Run validator to see which files have the most short-result warnings.

```powershell
node tests/content/validate-content.js 2>&1 | Select-String "result text short" | Group-Object { ($_ -split '\[')[1].Split(']')[0] } | Sort-Object Count -Descending | Select-Object -First 5
```

- [ ] **Top 5 files by warning count** — for each, expand result texts from <60 words to 60–90 words minimum
- [ ] **Rule**: expand by adding sensory detail, physical setting, or NPC reaction — never add filler
- [ ] **After expansion**, rerun validator: target <400 total warnings (was 530)
- [ ] **Commit:** `fix: expand short result texts — target top 5 files, reduce validator warnings`

### Task 6.5 — Final headless verification

```powershell
cmd /c "npx playwright test tests/e2e/playtest-headless.spec.js --timeout=600000 --reporter=line"
node tests/content/validate-content.js && node tests/content/validate-flags.js && node tests/content/validate-structure.js
```

Expected: 4/4 families pass, 0 new violations, <400 content warnings. If any family fails, triage and fix before marking plan complete.

---

## Verification Checklist

**Headed spec interactions (all confirmed by screenshots):**
- [ ] Shop buy+sell: gold before/after logged, sell button found in inventory after buy
- [ ] Camp all actions: sleep, rest, train, craft, post_watches, lay_low, recover — each screencaptured; review_notes/talk: SKIP log if gated (not FAIL)
- [ ] Contacts: ALL visible contact cards clicked, dialog screenshots taken, text non-empty
- [ ] Party: ALL companion cards clicked, profile screenshots taken, text non-empty
- [ ] Level-up: 3 steps (stat/trait/ability) each screencaptured, modal closes cleanly
- [ ] HUD ability badge: count > 0 after level-up, click opens char sheet to traits tab, ability listed
- [ ] Map probe: clicks destination at pick 20, screenshots arrival scene, G.location updated

**System verification:**
- [ ] Headed spec: 4/4 families pass
- [ ] Arc injection: cosmoria→Shelkopolis shows arc choices (manual spot-check)
- [ ] Boss encounter: red-bordered encounter panel renders (manual spot-check)
- [ ] Active abilities: reset on rest/sleep (not per-combat)
- [ ] Archetype families: Cleric in Support, Death Knight in Magic, 6-6-6-6 confirmed
- [ ] Biome pools: no patrol_guard or border_enforcer entries
- [ ] Boss text: confrontation framed as player-initiated investigation
- [ ] All travel through map: no direct G.location assignments in choice effects
- [ ] Shelkopolis Stage II: sp2-advancing choices fire on visits
- [ ] Cosmoria Stage II: 15+ sp2 available from choice pool
- [ ] Headless spec: 4/4 pass post all fixes
- [ ] Content validator: 0 new violations, <400 total warnings

---

*Generated 2026-05-21 from question session covering: headed verification, combat enemy audit, travel system, archetype/ability system, content expansion.*
