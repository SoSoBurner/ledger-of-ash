'use strict';
/**
 * stage-lock.js — Dynamic stage ceiling detection
 *
 * Reads canAdvanceToStage3/4/5() from the live engine to determine the highest
 * reachable stage for the current build. When Stage III content is built and
 * canAdvanceToStage3() returns true, this automatically raises the ceiling.
 *
 * Usage:
 *   const { getStageCeiling, isSuccess } = require('./helpers/stage-lock');
 *   const ceiling = await getStageCeiling(page);  // 'Stage II' (current build)
 *   const done    = await isSuccess(page, ceiling);
 */

/**
 * Returns the highest stage this build can reach.
 * Checks canAdvanceToStage3/4/5 in order; returns the last unlocked stage.
 * Falls back to 'Stage II' if anything throws (engine not loaded yet).
 *
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<'Stage I'|'Stage II'|'Stage III'|'Stage IV'|'Stage V'>}
 */
async function getStageCeiling(page) {
  try {
    return await page.evaluate(() => {
      try {
        // canAdvanceToStage3 hardcoded false = Stage II ceiling
        const can3 = (typeof canAdvanceToStage3 === 'function') ? canAdvanceToStage3() : false;
        if (!can3) return 'Stage II';

        const can4 = (typeof canAdvanceToStage4 === 'function') ? canAdvanceToStage4() : false;
        if (!can4) return 'Stage III';

        const can5 = (typeof canAdvanceToStage5 === 'function') ? canAdvanceToStage5() : false;
        if (!can5) return 'Stage IV';

        return 'Stage V';
      } catch (_) {
        return 'Stage II';
      }
    });
  } catch (_) {
    return 'Stage II';
  }
}

/**
 * Returns true when the player has reached the current ceiling stage.
 *
 * Stage II ceiling: climax complete (maren_oss_resolved OR stage2_climax_complete)
 * Stage III+: player G.stage matches or exceeds the ceiling
 *
 * @param {import('@playwright/test').Page} page
 * @param {string} ceiling — from getStageCeiling()
 * @param {object} [opts]
 * @param {boolean} [opts.allowNuclear=false] — headless: allow nuclear sp2 injection
 * @returns {Promise<boolean>}
 */
async function isSuccess(page, ceiling, opts) {
  opts = opts || {};
  try {
    return await page.evaluate((args) => {
      const { ceiling } = args;
      try {
        const stage  = G.stage;
        const flags  = G.flags || {};
        const sp2    = (G.stageProgress && G.stageProgress[2]) || 0;
        const climaxDone = !!(flags.stage2_climax_complete || flags.maren_oss_resolved);

        if (ceiling === 'Stage II') {
          // Organic: climax resolved. sp2 minimum is 1 (ensures Stage II was active).
          return climaxDone && sp2 >= 1;
        }
        if (ceiling === 'Stage III') {
          return stage === 'Stage III' || stage === 'Stage IV' || stage === 'Stage V';
        }
        if (ceiling === 'Stage IV') {
          return stage === 'Stage IV' || stage === 'Stage V';
        }
        return stage === 'Stage V';
      } catch (_) {
        return false;
      }
    }, { ceiling });
  } catch (_) {
    return false;
  }
}

/**
 * Returns a human-readable string describing the current ceiling and why.
 * Used in report headers.
 *
 * @param {string} ceiling
 * @returns {string}
 */
function ceilingLabel(ceiling) {
  const reasons = {
    'Stage II':  'canAdvanceToStage3 = false (Stage III not yet built)',
    'Stage III': 'canAdvanceToStage4 = false (Stage IV not yet built)',
    'Stage IV':  'canAdvanceToStage5 = false (Stage V not yet built)',
    'Stage V':   'All stages unlocked',
  };
  return `${ceiling} — ${reasons[ceiling] || 'unknown'}`;
}

module.exports = { getStageCeiling, isSuccess, ceilingLabel };
