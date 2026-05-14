'use strict';
// E2E: Two-tier archetype playtest suite.
// Tier 1 — Organic playthroughs: one per archetype family (4 tests), 400 iterations.
// Tier 2 — Stage 2 smoke tests: one per archetype (31 tests), 200 iterations with G injection.

const { test, expect } = require('@playwright/test');

// ─────────────────────────────────────────────────────────────────────────────
// Archetype registry
// ─────────────────────────────────────────────────────────────────────────────

const ARCHETYPES_BY_FAMILY = {
  combat:  ['Warrior', 'Knight', 'Ranger', 'Paladin', 'Archer', 'Berserker'],
  magic:   ['Wizard', 'Cleric', 'Priest', 'Necromancer', 'Illusionist', 'Inquisitor', 'Elementalist'],
  stealth: ['Rogue', 'Assassin', 'Spellthief', 'Scout', 'Thief', 'Trickster'],
  support: ['Healer', 'Artificer', 'Engineer', 'Tactician', 'Alchemist', 'Saint', 'Bard',
            'Oracle', 'Warden', 'Warlord', 'Death Knight', 'Beastmaster'],
};

// Representative archetype per family used for Tier 1 organic runs
const FAMILY_REPRESENTATIVES = {
  combat:  'Warrior',
  magic:   'Wizard',
  stealth: 'Rogue',
  support: 'Healer',
};

// ─────────────────────────────────────────────────────────────────────────────
// Character creation helper
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Start a new game for a named archetype.
 * Falls back to first card if the archetype card can't be found by text.
 */
async function startGameForArchetype(page, archetypeName) {
  await page.goto('/');
  await page.evaluate(() => { try { localStorage.clear(); } catch (_) {} });
  await page.waitForSelector('#btn-new-legend', { state: 'visible' });
  await page.click('#btn-new-legend');

  // Fill character name
  await page.fill('#char-name', archetypeName + ' Test');

  // Try data-id match first, then text match, then first card fallback
  let cardClicked = false;

  // data-id (lowercase, spaces → underscores or hyphens)
  const dataId = archetypeName.toLowerCase().replace(/\s+/g, '_');
  const dataIdHyphen = archetypeName.toLowerCase().replace(/\s+/g, '-');
  for (const id of [dataId, dataIdHyphen]) {
    const card = page.locator(`#archetype-grid .archetype-card[data-id="${id}"], #archetype-grid .card[data-id="${id}"]`);
    if (await card.count() > 0) {
      await card.first().waitFor({ state: 'visible', timeout: 4000 });
      await card.first().click();
      cardClicked = true;
      break;
    }
  }

  // Text match fallback
  if (!cardClicked) {
    const textCard = page.locator('#archetype-grid .archetype-card, #archetype-grid .card')
      .filter({ hasText: archetypeName });
    if (await textCard.count() > 0) {
      await textCard.first().waitFor({ state: 'visible', timeout: 4000 });
      await textCard.first().click();
      cardClicked = true;
    }
  }

  // Last resort: first card
  if (!cardClicked) {
    const firstCard = page.locator('#archetype-grid .archetype-card, #archetype-grid .card').first();
    await firstCard.waitFor({ state: 'visible', timeout: 5000 });
    await firstCard.click();
  }

  // Background step — click first available background
  const bgStep = page.locator('#bg-step');
  if (await bgStep.isVisible({ timeout: 2000 }).catch(() => false)) {
    const firstBg = page.locator('#background-grid .bg-card, #background-grid .card').first();
    if (await firstBg.count() > 0) {
      await firstBg.click();
    }
  }

  // Begin game
  await page.waitForSelector('#begin-btn:not([style*="display:none"])', { timeout: 5000 });
  await page.click('#begin-btn');

  // Skip onboarding if present
  const skip = page.locator('#onboarding-skip');
  if (await skip.isVisible({ timeout: 2000 }).catch(() => false)) {
    await skip.click();
  }

  await page.waitForSelector('#screen-game', { timeout: 10000 });
  await page.waitForTimeout(500);
}

// ─────────────────────────────────────────────────────────────────────────────
// Stage 2 state injection
// ─────────────────────────────────────────────────────────────────────────────

async function injectStage2State(page) {
  await page.evaluate(() => {
    if (typeof G === 'undefined') return;
    G.stage = 'Stage II';
    G.stageProgress = { 1: 18, 2: 0, 3: 0, 4: 0, 5: 0 };
    G.level = 5;
    G.xp = 0;
    G.flags = G.flags || {};
    G.flags.stage1_narrative_complete = true;
    G.flags.stage1_boss_started = true;
    if (typeof loadStageChoices === 'function') loadStageChoices();
    if (typeof renderChoices === 'function') renderChoices();
    if (typeof updateHUD === 'function') updateHUD();
  });
  await page.waitForTimeout(400);
}

// ─────────────────────────────────────────────────────────────────────────────
// Main game loop
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {import('@playwright/test').Page} page
 * @param {number} maxIterations
 * @param {'organic'|'smoke'} mode  – smoke mode prefers flee; organic mode prefers first combat btn
 */
async function runGameLoop(page, maxIterations, mode = 'organic') {
  let iterations = 0;
  let consecutiveNoClick = 0;
  let combatTriggered = false;

  while (iterations < maxIterations) {
    let clicked = false;

    // P1: Level-up — pick first option, then confirm
    try {
      const luOption = page.locator('.lu-option-btn').first();
      if (await luOption.isVisible({ timeout: 200 })) {
        await luOption.click();
        await page.waitForTimeout(150);
        const luDone = page.locator('#btn-lu-done');
        if (await luDone.isVisible({ timeout: 400 }).catch(() => false)) {
          await luDone.click();
        }
        clicked = true;
      }
    } catch (_) {}

    // P2: Travel mode modal
    if (!clicked) {
      try {
        const travelModal = page.locator('#travel-mode-modal');
        if (await travelModal.isVisible({ timeout: 200 })) {
          const travelBtn = travelModal.locator('button').first();
          if (await travelBtn.isVisible({ timeout: 200 }).catch(() => false)) {
            await travelBtn.click();
            clicked = true;
          }
        }
      } catch (_) {}
    }

    // P3: Authority confrontation panel
    if (!clicked) {
      try {
        const authPanel = page.locator('.authority-panel, [id*="authority-"], #authority-modal').first();
        if (await authPanel.isVisible({ timeout: 200 })) {
          // Prefer a comply/submit choice; fall back to first .choice-btn inside
          const complyBtn = authPanel.locator('.choice-btn')
            .filter({ hasText: /comply|submit|cooperate|yes/i }).first();
          if (await complyBtn.isVisible({ timeout: 200 }).catch(() => false)) {
            await complyBtn.click();
          } else {
            const anyBtn = authPanel.locator('.choice-btn').first();
            if (await anyBtn.isVisible({ timeout: 200 }).catch(() => false)) {
              await anyBtn.click();
            }
          }
          clicked = true;
        }
      } catch (_) {}
    }

    // P4: Combat
    if (!clicked) {
      try {
        const combatArea = page.locator('#combat-panel, .combat-area, [id*="combat"]').first();
        if (await combatArea.isVisible({ timeout: 200 })) {
          combatTriggered = true;
          if (mode === 'smoke') {
            // Smoke: prefer flee to keep test fast
            const fleeBtn = page.locator('.combat-btn')
              .filter({ hasText: /flee|retreat|run|escape/i }).first();
            if (await fleeBtn.isVisible({ timeout: 200 }).catch(() => false)) {
              await fleeBtn.click();
              clicked = true;
            }
          }
          if (!clicked) {
            const anyBtn = page.locator('.combat-btn').first();
            if (await anyBtn.isVisible({ timeout: 200 }).catch(() => false)) {
              await anyBtn.click();
              clicked = true;
            }
          }
        }
      } catch (_) {}
    }

    // P5: Close any open overlay
    if (!clicked) {
      try {
        const overlayClose = page.locator('.overlay-close').first();
        if (await overlayClose.isVisible({ timeout: 200 })) {
          await overlayClose.click();
          clicked = true;
        }
      } catch (_) {}
    }

    // P6: Plot-main choice
    if (!clicked) {
      try {
        const plotMain = page.locator('.choice-btn.plot-main').first();
        if (await plotMain.isVisible({ timeout: 200 })) {
          await plotMain.click();
          clicked = true;
        }
      } catch (_) {}
    }

    // P7: First available choice button
    if (!clicked) {
      try {
        const firstChoice = page.locator('.choice-btn').first();
        if (await firstChoice.isVisible({ timeout: 200 })) {
          await firstChoice.click();
          clicked = true;
        }
      } catch (_) {}
    }

    if (clicked) {
      consecutiveNoClick = 0;
      await page.waitForTimeout(200);
    } else {
      consecutiveNoClick++;
      if (consecutiveNoClick >= 5) {
        console.log(`[archetype-playtest] Stuck after ${iterations} iterations — no clickable element for 5 consecutive checks.`);
        break;
      }
      await page.waitForTimeout(300);
    }

    iterations++;
  }

  const finalLevel = await page.evaluate(() => (typeof G !== 'undefined' ? G.level : -1)).catch(() => -1);
  return { iterations, combatTriggered, finalLevel };
}

// ─────────────────────────────────────────────────────────────────────────────
// Tier 1 — Organic playthroughs (one per family, 400 iterations)
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Tier 1 — Organic family playthroughs', () => {
  for (const [family, archetype] of Object.entries(FAMILY_REPRESENTATIVES)) {
    test(`${family} family — organic arc (${archetype})`, async ({ page }) => {
      test.setTimeout(120000);

      const jsErrors = [];
      page.on('console', msg => { if (msg.type() === 'error') jsErrors.push(msg.text()); });
      page.on('pageerror', err => jsErrors.push(err.message));

      await startGameForArchetype(page, archetype);
      const stats = await runGameLoop(page, 400, 'organic');

      console.log(`[organic:${family}] ${archetype} — level ${stats.finalLevel}, ${stats.iterations} iterations, combat=${stats.combatTriggered}`);

      // Assertions
      const stage = await page.evaluate(() => (typeof G !== 'undefined' ? G.stage : '')).catch(() => '');
      expect(['Stage I', 'Stage II']).toContain(stage);

      const sp1 = await page.evaluate(() => (typeof G !== 'undefined' && G.stageProgress ? G.stageProgress[1] : 0)).catch(() => 0);
      const sp2 = await page.evaluate(() => (typeof G !== 'undefined' && G.stageProgress ? G.stageProgress[2] : 0)).catch(() => 0);
      expect(sp1 + sp2, `Expected combined stageProgress > 2, got sp1=${sp1} sp2=${sp2}`).toBeGreaterThan(2);

      const hp = await page.evaluate(() => (typeof G !== 'undefined' ? G.hp : NaN)).catch(() => NaN);
      expect(hp, `Expected HP >= 0, got ${hp}`).toBeGreaterThanOrEqual(0);

      const typeErrors = jsErrors.filter(e => e.includes('TypeError') || e.includes('ReferenceError'));
      expect(typeErrors, `JS errors:\n${typeErrors.join('\n')}`).toHaveLength(0);
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Tier 2 — Stage 2 smoke tests (one per archetype, 200 iterations)
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Tier 2 — Stage 2 smoke tests', () => {
  const allArchetypes = Object.values(ARCHETYPES_BY_FAMILY).flat();

  for (const archetype of allArchetypes) {
    test(`${archetype} — Stage 2 smoke`, async ({ page }) => {
      test.setTimeout(60000);

      const jsErrors = [];
      page.on('console', msg => { if (msg.type() === 'error') jsErrors.push(msg.text()); });
      page.on('pageerror', err => jsErrors.push(err.message));

      await startGameForArchetype(page, archetype);
      await injectStage2State(page);
      const stats = await runGameLoop(page, 200, 'smoke');

      console.log(`[smoke:${archetype}] level ${stats.finalLevel}, ${stats.iterations} iterations, combat=${stats.combatTriggered}`);

      // HP valid
      const hp = await page.evaluate(() => (typeof G !== 'undefined' ? G.hp : NaN)).catch(() => NaN);
      expect(hp, `Expected HP >= 0, got ${hp}`).toBeGreaterThanOrEqual(0);

      // At least some Stage 2 progress made
      const sp2 = await page.evaluate(() => (typeof G !== 'undefined' && G.stageProgress ? G.stageProgress[2] : 0)).catch(() => 0);
      expect(sp2, `Expected stageProgress[2] > 0 for ${archetype}`).toBeGreaterThan(0);

      // No TypeError / ReferenceError
      const typeErrors = jsErrors.filter(e => e.includes('TypeError') || e.includes('ReferenceError'));
      expect(typeErrors, `JS errors for ${archetype}:\n${typeErrors.join('\n')}`).toHaveLength(0);
    });
  }
});
