// DEVELOPMENT TOOL — not game code, not shipped. See tests/e2e/README.md
// @ts-check
/**
 * journey-overlay.spec.js
 * Smoke test for the full overlay journey system.
 *
 * The main headed/headless specs (playtest-headed.spec.js, playtest-headless.spec.js)
 * bypass the overlay journey code path entirely — they teleport via
 * `_travelCoreTravelTo(dest)` to keep runs fast and deterministic. As a result,
 * `startOverlayJourney()` / `advanceDayLeg()` / `_completeJourney()` are never
 * actually exercised by the main playtest suites.
 *
 * This spec specifically drives the UI path:
 *   showMap() → .map-travel-btn click → mode select (foot)
 *     → pack select (standard) → startOverlayJourney()
 *       → JOURNEY tab day loop + CAMP tab rest
 *         → _completeJourney() → arrival render
 *
 * Keep this small and focused — it's a smoke test, not a full playtest.
 */

'use strict';

const { test, expect } = require('@playwright/test');

// Must be at FILE LEVEL — Playwright rejects `test.use` inside `describe`.
test.use({ headless: true });

// ---------------------------------------------------------------------------
// Pacing — headless, real waits only where DOM render is required
// ---------------------------------------------------------------------------
const WAIT_CHOICES        = 1500;  // DOM render budget for .choice-btn
const ENCOUNTER_SETTLE_MS = 1800;  // auto-advance fires 1400ms after a day-leg choice
const ARRIVAL_SETTLE_MS   = 1500;  // resolveArrival schedules 200ms; pad for safety
const MAX_JOURNEY_ITERS   = 30;    // amber_fountain_inn→fairhaven = ~18 days + encounter overhead

// ---------------------------------------------------------------------------
// Module-scope helpers — no closures over test() vars (Playwright closure trap)
// ---------------------------------------------------------------------------

async function readG(page) {
  return page.evaluate(() => {
    try {
      return {
        stage:      G.stage,
        location:   G.location,
        hp:         G.hp,
        maxHp:      G.maxHp || G.hp,
        axisTick:   G.axisTick || 0,
        dayCount:   G.dayCount || 0,
        dead:       !!G.dead,
        level:      G.level || 1,
        travelMode: G.travelMode || null,
        jrnTotal:   (G.flags && G.flags._jrn_total) || 0,
        jrnCurrent: (G.flags && G.flags._jrn_current) || 0,
        jrnTo:      (G.flags && G.flags._jrn_to) || null,
      };
    } catch (_) { return {}; }
  }).catch(() => ({}));
}

async function dismissTutorialOverlays(page) {
  for (let i = 0; i < 15; i++) {
    const btn = page.locator(
      'button:has-text("Skip"), button:has-text("Got it"), button:has-text("Continue"), ' +
      'button:has-text("Begin"), .onboarding-skip'
    ).first();
    if (!await btn.isVisible({ timeout: 400 }).catch(() => false)) break;
    await btn.click().catch(() => {});
    await page.waitForTimeout(150);
  }
}

async function pickFirstVisibleChoice(page) {
  const btn = page.locator('.choice-btn:visible:not([disabled])').first();
  if (!await btn.isVisible({ timeout: 400 }).catch(() => false)) return false;
  await btn.click().catch(() => {});
  return true;
}

async function createBerserker(page) {
  await page.goto('/ledger-of-ash.html');
  await page.evaluate(() => { try { localStorage.clear(); } catch (_) {} });
  await page.waitForSelector('#btn-new-legend', { state: 'visible', timeout: 15000 });
  await page.click('#btn-new-legend');

  await page.fill('#char-name', 'Gorn');

  await page.waitForFunction(() => typeof selectArchetype === 'function', { timeout: 8000 });
  await page.evaluate(() => selectArchetype('berserker'));
  await page.waitForSelector('#bg-step', { state: 'visible', timeout: 5000 });

  // berserker → b_soreheim (first canonical bg)
  await page.evaluate(() => selectBackground('b_soreheim', 'berserker'));

  await page.waitForSelector('#begin-btn:not([style*="display:none"])', { timeout: 5000 });
  await page.click('#begin-btn');
  await page.waitForSelector('#screen-game', { timeout: 10000 });
  await page.waitForTimeout(400);

  await dismissTutorialOverlays(page);
  await page.waitForSelector('.choice-btn:visible', { timeout: 15000 });
}

// ---------------------------------------------------------------------------
// The test
// ---------------------------------------------------------------------------
test('overlay journey — full loop: mode -> pack -> journey tab -> camp rest -> complete', async ({ page }) => {
  // -------------------------------------------------------------------------
  // PHASE 1 — Create character via UI (no nuclear injection)
  // -------------------------------------------------------------------------
  await createBerserker(page);
  const gStart = await readG(page);
  console.log(`[journey-overlay] start: location=${gStart.location} level=${gStart.level} hp=${gStart.hp}/${gStart.maxHp}`);

  // -------------------------------------------------------------------------
  // PHASE 2 — Teleport to amber_fountain_inn for a known short ~18-day route
  // (soreheim→fairhaven is 286 days foot — unusable for a smoke test)
  // -------------------------------------------------------------------------
  await page.evaluate(() => {
    G.location = 'amber_fountain_inn';
    G.gold = Math.max(G.gold || 0, 50); // cover boat/horse costs on coastal routes
  });
  console.log(`[journey-overlay] teleported to amber_fountain_inn, gold padded to 50+`);

  // Open map
  await page.evaluate(() => { if (typeof showMap === 'function') showMap(); });
  await page.waitForSelector('#overlay-map', { state: 'visible', timeout: 5000 });

  const travelButtons = page.locator('.map-travel-btn[data-locid]:visible:not([disabled])');
  const travelCount = await travelButtons.count();
  expect(travelCount, 'Starting locality must have at least one map travel route').toBeGreaterThan(0);

  const targetLocId = await travelButtons.first().getAttribute('data-locid');
  console.log(`[journey-overlay] travelling to: ${targetLocId}`);
  await travelButtons.first().click();

  // -------------------------------------------------------------------------
  // PHASE 3 — Select mode (pick first available — route may not support foot)
  // -------------------------------------------------------------------------
  await page.waitForSelector('.choice-btn.overlay-mode-btn:visible:not([disabled])', { timeout: 5000 });
  const availableModeBtn = page.locator('.choice-btn.overlay-mode-btn:visible:not([disabled])').first();
  const chosenMode = await availableModeBtn.getAttribute('data-mode');
  console.log(`[journey-overlay] mode selected: ${chosenMode}`);
  await availableModeBtn.click();

  // -------------------------------------------------------------------------
  // PHASE 4 — Select pack (standard)
  // -------------------------------------------------------------------------
  await page.waitForSelector('.choice-btn.overlay-pack-btn:visible', { timeout: 5000 });
  const standardPackBtn = page.locator('.choice-btn.overlay-pack-btn[data-pack="standard"]:visible:not([disabled])');
  if (await standardPackBtn.count() > 0) {
    await standardPackBtn.click();
  } else {
    // Fallback: first available pack option
    await page.locator('.choice-btn.overlay-pack-btn:visible:not([disabled])').first().click();
  }

  // -------------------------------------------------------------------------
  // PHASE 5 — Verify startOverlayJourney() fired
  // -------------------------------------------------------------------------
  await page.waitForSelector('.journey-tab-strip', { state: 'visible', timeout: 5000 });
  await expect(page.locator('.journey-tab[data-tab="journey"]'), 'JOURNEY tab must render').toBeVisible();
  await expect(page.locator('.journey-tab[data-tab="camp"]'), 'CAMP tab must render').toBeVisible();

  const gJourneyStart = await readG(page);
  const axisTickStart = gJourneyStart.axisTick;
  expect(gJourneyStart.jrnTotal, 'G.flags._jrn_total must be set when journey starts').toBeGreaterThan(0);
  expect(gJourneyStart.travelMode, 'G.travelMode must be set to chosen mode').toBeTruthy();
  console.log(`[journey-overlay] journey started: total=${gJourneyStart.jrnTotal} days to=${gJourneyStart.jrnTo}`);

  // -------------------------------------------------------------------------
  // PHASE 6 — Switch to CAMP tab, click rest, verify HP heals
  // -------------------------------------------------------------------------
  const gPreRest = await readG(page);
  await page.locator('.journey-tab[data-tab="camp"]').click();
  await page.waitForSelector('.journey-tab-pane[data-pane="camp"]', { state: 'visible', timeout: 3000 });

  // Rest button: inside camp pane, text matches /rest/i (NOT "Make camp" / sleep)
  const restBtn = page.locator('.journey-tab-pane[data-pane="camp"] .choice-btn:visible:not([disabled])')
    .filter({ hasText: /rest/i })
    .filter({ hasNotText: /make camp/i })
    .first();

  if (await restBtn.isVisible({ timeout: 1500 }).catch(() => false)) {
    await restBtn.click();
    await page.waitForTimeout(600);
    const gPostRest = await readG(page);
    expect(gPostRest.hp, 'Rest must heal HP (or at least not decrease it)').toBeGreaterThanOrEqual(gPreRest.hp);
    console.log(`[journey-overlay] camp rest: hp ${gPreRest.hp} -> ${gPostRest.hp}`);
  } else {
    console.log('[journey-overlay] CAMP rest button not found — skipping camp probe');
  }

  // Camp tab rest also advances the day-leg loop — the journey-choice-area will rerender.
  // Switch back to journey tab if it's still there.
  const journeyTab = page.locator('.journey-tab[data-tab="journey"]');
  if (await journeyTab.isVisible({ timeout: 800 }).catch(() => false)) {
    await journeyTab.click().catch(() => {});
    await page.waitForTimeout(200);
  }

  // -------------------------------------------------------------------------
  // PHASE 7 — Day-leg loop: pick choices until journey completes
  // -------------------------------------------------------------------------
  let iter = 0;
  let combatFlips = 0;
  let dayPicks = 0;

  for (iter = 0; iter < MAX_JOURNEY_ITERS; iter++) {
    // Check completion first: G.flags._jrn_total cleared on completion
    const gNow = await readG(page);
    if (!gNow.jrnTotal) {
      console.log(`[journey-overlay] journey complete at iter=${iter} (jrn_total cleared)`);
      break;
    }
    if (gNow.dead) {
      console.log(`[journey-overlay] DEAD at iter=${iter} — journey aborted`);
      break;
    }

    const mapVisible = await page.locator('#overlay-map').isVisible({ timeout: 300 }).catch(() => false);

    if (!mapVisible) {
      // Combat encounter — overlay-map closed, combat UI rendered in main panel.
      // G.pendingVictoryCallback will reopen the overlay on victory.
      combatFlips++;
      const clicked = await pickFirstVisibleChoice(page);
      if (!clicked) {
        await page.waitForTimeout(600);
        continue;
      }
      await page.waitForTimeout(ENCOUNTER_SETTLE_MS);
      continue;
    }

    // Overlay open — ensure JOURNEY tab is active (not stuck on CAMP)
    const journeyActive = await page.locator('.journey-tab[data-tab="journey"].active')
      .isVisible({ timeout: 300 }).catch(() => false);
    if (!journeyActive) {
      const jt = page.locator('.journey-tab[data-tab="journey"]');
      if (await jt.isVisible({ timeout: 300 }).catch(() => false)) {
        await jt.click().catch(() => {});
        await page.waitForTimeout(200);
      }
    }

    // Pick a journey choice
    const journeyChoice = page.locator('#journey-choice-area .choice-btn:visible:not([disabled])').first();
    if (!await journeyChoice.isVisible({ timeout: 1000 }).catch(() => false)) {
      await page.waitForTimeout(500);
      continue;
    }
    await journeyChoice.click().catch(() => {});
    dayPicks++;
    // After encounter choices, auto-advance fires after 1400ms — wait 1800ms to be safe
    await page.waitForTimeout(ENCOUNTER_SETTLE_MS);
  }

  // -------------------------------------------------------------------------
  // PHASE 8 — Verify journey completion state
  // -------------------------------------------------------------------------
  const gComplete = await readG(page);
  expect(!!gComplete.jrnTotal, 'G.flags._jrn_total must be cleared on completion').toBe(false);
  expect(!!gComplete.travelMode, 'G.travelMode must be cleared on completion').toBe(false);

  // Map overlay must be hidden after _completeJourney()
  const mapHidden = !await page.locator('#overlay-map').isVisible({ timeout: 500 }).catch(() => false);
  expect(mapHidden, '#overlay-map must be hidden after journey completes').toBe(true);

  // -------------------------------------------------------------------------
  // PHASE 9 — Wait for arrival render, verify choices loaded + axis advanced
  // -------------------------------------------------------------------------
  await page.waitForTimeout(ARRIVAL_SETTLE_MS);
  await page.waitForSelector('.choice-btn:visible', { timeout: 5000 }).catch(() => {});
  const arrivalChoiceCount = await page.locator('.choice-btn:visible:not([disabled])').count().catch(() => 0);
  expect(arrivalChoiceCount, 'Arrival must render at least one playable choice').toBeGreaterThan(0);

  // _completeJourney only calls tickAxis when totalDays > 1 — skip assertion for 1-day routes
  if (gJourneyStart.jrnTotal > 1) {
    expect(gComplete.axisTick, 'axisTick must advance during journey').toBeGreaterThan(axisTickStart);
  } else {
    console.log('[journey-overlay] single-day journey — axis tick assertion skipped (expected: tickAxis not called for 1-day routes)');
  }

  // -------------------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------------------
  console.log(`[journey-overlay] iters=${iter} dayPicks=${dayPicks} combatFlips=${combatFlips}`);
  console.log(`[journey-overlay] axisTick delta: ${gComplete.axisTick - axisTickStart}`);
  console.log(`[journey-overlay] final location=${gComplete.location} hp=${gComplete.hp}/${gComplete.maxHp}`);
});
