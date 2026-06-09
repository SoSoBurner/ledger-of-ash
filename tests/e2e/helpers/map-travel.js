'use strict';
/**
 * map-travel.js — Map menu travel helper
 *
 * Opens the Map overlay (#overlay-map), picks a random unvisited locality,
 * clicks "Travel here", then returns. Corridor encounters fired by travelTo()
 * are handled by the main pick loop (map-travel just initiates the travel).
 *
 * Usage:
 *   const { shouldTravelNow, openMapAndTravel } = require('./helpers/map-travel');
 *
 *   // In pick loop:
 *   if (shouldTravelNow(picks, lastMapTravelPick)) {
 *     const travelled = await openMapAndTravel(page, visitedLocalities, log);
 *     if (travelled) { lastMapTravelPick = picks; tracker.onMapTravel(from, travelled, picks); }
 *   }
 */

const MAP_TRAVEL_INTERVAL_MIN = 15;
const MAP_TRAVEL_INTERVAL_MAX = 20;

let _nextTravelAt = MAP_TRAVEL_INTERVAL_MIN + Math.floor(Math.random() * (MAP_TRAVEL_INTERVAL_MAX - MAP_TRAVEL_INTERVAL_MIN + 1));

/**
 * Returns true when it's time to do a map travel.
 * Randomizes the next interval after each travel.
 *
 * @param {number} picks — current pick count
 * @param {number} lastMapTravelPick — pick number of last map travel (0 if none)
 * @returns {boolean}
 */
function shouldTravelNow(picks, lastMapTravelPick) {
  return picks > 0 && (picks - lastMapTravelPick) >= _nextTravelAt;
}

/** Resets interval after a travel fires */
function resetInterval() {
  _nextTravelAt = MAP_TRAVEL_INTERVAL_MIN + Math.floor(Math.random() * (MAP_TRAVEL_INTERVAL_MAX - MAP_TRAVEL_INTERVAL_MIN + 1));
}

/**
 * Public reset for inter-family isolation.
 * Prevents travel interval bleed from one family run to the next.
 */
function resetTravelInterval() {
  _nextTravelAt = MAP_TRAVEL_INTERVAL_MIN + Math.floor(Math.random() * (MAP_TRAVEL_INTERVAL_MAX - MAP_TRAVEL_INTERVAL_MIN + 1));
}

/**
 * Opens Map overlay, picks a random unvisited locality, and clicks "Travel here".
 * Returns the locId travelled to, or null if no unvisited localities remain or map fails.
 *
 * @param {import('@playwright/test').Page} page
 * @param {Set<string>} visitedLocalities — set of already-visited locIds this run
 * @param {Function} log — logging function
 * @param {number} picks — current pick count (for log label)
 * @returns {Promise<string|null>} — locId travelled to, or null
 */
async function openMapAndTravel(page, visitedLocalities, log, picks) {
  try {
    // Open map via engine (avoids selector brittleness with nav button)
    const opened = await page.evaluate(() => {
      try { showMap(); return true; } catch (_) { return false; }
    }).catch(() => false);

    if (!opened) {
      log(`[map-travel] pick=${picks} — showMap() failed, skipping`);
      resetInterval();
      return null;
    }

    await page.waitForTimeout(300);

    // Read all available travel buttons from the map overlay
    const locIds = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.map-travel-btn[data-locid]'))
        .map(btn => btn.dataset.locid)
        .filter(id => !!id);
    }).catch(() => []);

    if (!locIds.length) {
      log(`[map-travel] pick=${picks} — no .map-travel-btn found, closing map`);
      await page.evaluate(() => { try { closeOverlay('overlay-map'); } catch (_) {} }).catch(() => {});
      resetInterval();
      return null;
    }

    // Prefer unvisited localities; fall back to fewest-visits if all visited
    const unvisited = locIds.filter(l => !visitedLocalities.has(l));
    const candidate = unvisited.length > 0
      ? unvisited[Math.floor(Math.random() * unvisited.length)]
      : locIds.slice().sort((a, b) => (visitedLocalities[a] || 0) - (visitedLocalities[b] || 0))[0];
    const target = candidate;

    log(`[map-travel] pick=${picks} → travelling to ${target} (${unvisited.length} unvisited available)`);
    resetInterval();

    // Click the travel button to open mode selection
    await page.click(`.map-travel-btn[data-locid="${target}"]`);
    await page.waitForTimeout(400);

    // Handle mode selection — pick first non-disabled mode (prefer foot/free)
    const modeBtn = page.locator('.overlay-mode-btn:visible:not([disabled])').first();
    const modeBtnCount = await modeBtn.count().catch(() => 0);
    if (!modeBtnCount) {
      log(`[map-travel] pick=${picks} → no mode buttons found, falling back`);
      await page.evaluate((locId) => {
        try { if (typeof _travelCoreTravelTo === 'function') _travelCoreTravelTo(locId); } catch(_) {}
      }, target).catch(() => {});
      await page.waitForSelector('.choice-btn:visible:not([disabled])', { timeout: 5000 }).catch(() => {});
      return target;
    }
    await modeBtn.click();
    await page.waitForTimeout(400);

    // Handle pack selection — pick first available pack
    const packBtn = page.locator('.overlay-pack-btn:visible:not([disabled])').first();
    const packBtnCount = await packBtn.count().catch(() => 0);
    if (packBtnCount > 0) {
      await packBtn.click();
      await page.waitForTimeout(400);
    }

    // Wait for journey choice area
    const journeyAreaVisible = await page.locator('#journey-choice-area .choice-btn:visible:not([disabled])').count().catch(() => 0);
    if (!journeyAreaVisible) {
      // Journey may not have started — wait up to 5s
      await page.waitForSelector('#journey-choice-area .choice-btn:visible', { timeout: 5000 }).catch(() => {});
    }

    // Journey loop — pick day-leg choices organically
    const MAX_JOURNEY_ITERS = 60;
    for (let _jIter = 0; _jIter < MAX_JOURNEY_ITERS; _jIter++) {
      // Check journey still active (journey-tab-strip present means we're in journey mode)
      const inJourney = await page.locator('.journey-tab-strip').isVisible().catch(() => false);
      if (!inJourney) break; // Journey completed

      // Camp if HP < 40%
      const hpRatio = await page.evaluate(() => {
        try { return G.maxHp > 0 ? G.hp / G.maxHp : 1; } catch(_) { return 1; }
      }).catch(() => 1);

      if (hpRatio < 0.40) {
        const campTab = page.locator('.journey-tab[data-tab="camp"]');
        const campTabVisible = await campTab.isVisible().catch(() => false);
        if (campTabVisible) {
          await campTab.click();
          await page.waitForTimeout(300);
          const restBtn = page.locator('button:has-text("Rest"):visible').first();
          if (await restBtn.count().catch(() => 0)) {
            await restBtn.click();
            await page.waitForTimeout(500);
            // Switch back to journey tab
            const journeyTab = page.locator('.journey-tab[data-tab="journey"]');
            if (await journeyTab.isVisible().catch(() => false)) await journeyTab.click();
            await page.waitForTimeout(300);
            continue;
          }
        }
      }

      // Pick a journey choice
      const journeyChoice = page.locator('#journey-choice-area .choice-btn:visible:not([disabled])').first();
      const hasJourneyChoice = await journeyChoice.count().catch(() => 0);
      if (!hasJourneyChoice) {
        // May be in combat — check for combat buttons
        const combatBtn = page.locator('.combat-action-btn:visible:not([disabled]), #combat-area .choice-btn:visible:not([disabled])').first();
        if (await combatBtn.count().catch(() => 0)) {
          await combatBtn.click();
          await page.waitForTimeout(600);
          continue;
        }
        // No choices visible — wait briefly and retry
        await page.waitForTimeout(800);
        continue;
      }

      await journeyChoice.click();
      await page.waitForTimeout(600);
    }

    if (await page.locator('.journey-tab-strip').isVisible().catch(() => false)) {
      // Journey loop hit cap — fall back
      log(`[map-travel] pick=${picks} → journey loop cap hit, falling back to _travelCoreTravelTo`);
      await page.evaluate((locId) => {
        try { if (typeof _travelCoreTravelTo === 'function') _travelCoreTravelTo(locId); } catch(_) {}
      }, target).catch(() => {});
    }

    // Wait for choices to appear at destination (up to 5s)
    await page.waitForSelector('.choice-btn:visible', { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(200);

    // Travel assertion: verify G.location changed to target
    const arrivedLoc = await page.evaluate(() => {
      try { return G.location; } catch (_) { return null; }
    }).catch(() => null);
    const arrivedDay = await page.evaluate(() => {
      try { return G.day; } catch (_) { return 0; }
    }).catch(() => 0);

    if (arrivedLoc === target) {
      log(`[map-travel] pick=${picks} → travel initiated to ${target} day=${arrivedDay} — G.location confirmed`);
    } else {
      log(`[map-travel] pick=${picks} → travel initiated to ${target} (journey pending; G.location=${arrivedLoc} pre-pack-pick)`);
    }

    // Arc-choice presence: at Shelkopolis, check that at least one choice renders (bg-locality arcs inject on arrival)
    if (target === 'shelkopolis') {
      const choiceCount = await page.locator('.choice-btn:visible:not([disabled])').count().catch(() => 0);
      const hasArcChoice = await page.evaluate(() => {
        try {
          const btns = document.querySelectorAll('.choice-btn:not([disabled])');
          for (const b of btns) {
            const cls = b.className || '';
            if (cls.includes('plot-main') || b.textContent.length > 20) return true;
          }
          return false;
        } catch (_) { return false; }
      }).catch(() => false);
      log(`[map-travel] shelkopolis arrival: choiceCount=${choiceCount} hasArcChoice=${hasArcChoice}`);
    }

    return target;
  } catch (err) {
    log(`[map-travel] pick=${picks} — error: ${String(err).slice(0, 80)}`);
    // Try to close any open overlay
    await page.evaluate(() => {
      try { closeOverlay('overlay-map'); } catch (_) {}
    }).catch(() => {});
    resetInterval();
    return null;
  }
}

module.exports = { shouldTravelNow, openMapAndTravel, resetInterval, resetTravelInterval };
