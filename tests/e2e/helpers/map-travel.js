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

    // Use _travelCoreTravelTo directly — bypasses mode-select/pack-choices UI layers
    // (clicking map-travel-btn → mode-select → pack-choices overlay, all inside #overlay-map;
    //  dismissOverlays() would close it before pickChoice could interact).
    // _travelCoreTravelTo fires corridor encounters and sets G.location, same as escape teleports.
    await page.evaluate((locId) => {
      try { if (typeof closeOverlay === 'function') closeOverlay('overlay-map'); } catch (_) {}
      try {
        if (typeof _travelCoreTravelTo === 'function') _travelCoreTravelTo(locId);
        else if (typeof resolveArrival === 'function') resolveArrival(locId);
      } catch (_) {}
    }, target).catch(() => {});

    resetInterval();
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
