'use strict';
// E2E: Organic click-through playtest for each of the 11 starting localities.
// Runs against ledger-of-ash.html via file:// protocol.
// Each test picks the first archetype whose region maps to the target locality,
// completes character creation, then loops through game choices for up to 200
// iterations, handling level-ups, travel modals, combat, overlays, and choices
// in priority order. Hard-fail assertions verify meaningful progress and valid state.

const { test, expect } = require('@playwright/test');

const STARTING_LOCALITIES = [
  'shelkopolis',
  'fairhaven',
  'mimolot',
  'soreheim',
  'sunspire',
  'guildheart',
  'panim',
  'ithtananalor',
  'aurora',
  'cosmoria',
  'shirshal',
];

// Resolve archetype + background for a target locality via game globals.
// Returns { archetypeId, bgId } or null if no archetype maps to that locality.
async function resolveLocality(page, targetLocality) {
  return page.evaluate((locality) => {
    if (typeof BACKGROUNDS === 'undefined' || typeof BG_LOCATION_MAP === 'undefined') {
      return null;
    }
    for (const [archetypeId, archetypeData] of Object.entries(BACKGROUNDS)) {
      const region = archetypeData.region;
      if (!region) continue;
      const mappedLocality = BG_LOCATION_MAP[region];
      if (mappedLocality === locality) {
        // Find a background for this archetype — use first available bg key
        const bgKeys = archetypeData.backgrounds ? Object.keys(archetypeData.backgrounds) : [];
        const bgId = bgKeys.length > 0 ? bgKeys[0] : null;
        return { archetypeId, bgId };
      }
    }
    return null;
  }, targetLocality);
}

// Complete character creation for a specific archetype + background.
async function startGameForLocality(page, archetypeId, bgId) {
  await page.goto('/');
  await page.waitForSelector('#btn-new-legend', { state: 'visible' });
  await page.click('#btn-new-legend');

  // Fill character name
  await page.fill('#char-name', 'Playtest');

  // Click the specific archetype card
  const archetypeCard = page.locator(`#archetype-grid .archetype-card[data-id="${archetypeId}"], #archetype-grid .card[data-id="${archetypeId}"]`);
  const archetypeExists = await archetypeCard.count() > 0;
  if (archetypeExists) {
    await archetypeCard.waitFor({ state: 'visible', timeout: 5000 });
    await archetypeCard.click();
  } else {
    // Fallback: click first archetype card
    const firstCard = page.locator('#archetype-grid .archetype-card, #archetype-grid .card').first();
    await firstCard.waitFor({ state: 'visible', timeout: 5000 });
    await firstCard.click();
  }

  // Select background if step is visible
  const bgStep = page.locator('#bg-step');
  if (await bgStep.isVisible({ timeout: 2000 }).catch(() => false)) {
    let bgClicked = false;
    if (bgId) {
      const bgCard = page.locator(`#background-grid .bg-card[data-id="${bgId}"], #background-grid .card[data-id="${bgId}"]`);
      if (await bgCard.count() > 0) {
        await bgCard.click();
        bgClicked = true;
      }
    }
    if (!bgClicked) {
      const firstBg = page.locator('#background-grid .bg-card, #background-grid .card').first();
      if (await firstBg.count() > 0) await firstBg.click();
    }
  }

  // Begin game
  await page.waitForSelector('#begin-btn:not([style*="display:none"])', { timeout: 5000 });
  await page.click('#begin-btn');

  // Skip onboarding tutorial if present
  const skip = page.locator('#onboarding-skip');
  if (await skip.isVisible({ timeout: 2000 }).catch(() => false)) {
    await skip.click();
  }

  // Wait for game screen
  await page.waitForSelector('#screen-game', { timeout: 10000 });
  await page.waitForTimeout(500);
}

// Run the main game loop for up to maxIterations clicks.
// Returns stats: { iterations, combatTriggered, xpPerChoiceMax, finalLevel }
async function runGameLoop(page, maxIterations) {
  let iterations = 0;
  let consecutiveNoClick = 0;
  let combatTriggered = false;
  let lastXp = 0;
  let xpPerChoiceMax = 0;

  while (iterations < maxIterations) {
    let clicked = false;

    // Priority 1: Level-up modal — pick first upgrade option, then confirm
    const luOption = page.locator('.lu-option-btn').first();
    if (await luOption.isVisible({ timeout: 300 }).catch(() => false)) {
      await luOption.click();
      await page.waitForTimeout(200);
      const luDone = page.locator('#btn-lu-done');
      if (await luDone.isVisible({ timeout: 500 }).catch(() => false)) {
        await luDone.click();
      }
      clicked = true;
    }

    // Priority 2: Travel mode modal — dismiss with first button
    if (!clicked) {
      const travelModal = page.locator('#travel-mode-modal');
      if (await travelModal.isVisible({ timeout: 300 }).catch(() => false)) {
        const travelBtn = travelModal.locator('button').first();
        if (await travelBtn.isVisible({ timeout: 300 }).catch(() => false)) {
          await travelBtn.click();
          clicked = true;
        }
      }
    }

    // Priority 3: Combat buttons — prefer flee/retreat
    if (!clicked) {
      const combatArea = page.locator('#combat-panel, .combat-area, [id*="combat"]');
      const combatVisible = await combatArea.isVisible({ timeout: 300 }).catch(() => false);
      if (combatVisible) {
        combatTriggered = true;
        // Try to find a flee/retreat button first
        const fleeBtn = page.locator('.combat-btn').filter({ hasText: /flee|retreat|run|escape/i }).first();
        if (await fleeBtn.isVisible({ timeout: 300 }).catch(() => false)) {
          await fleeBtn.click();
          clicked = true;
        } else {
          // Fall back to any combat button
          const anyBtn = page.locator('.combat-btn').first();
          if (await anyBtn.isVisible({ timeout: 300 }).catch(() => false)) {
            await anyBtn.click();
            clicked = true;
          }
        }
      }
    }

    // Priority 4: Close any open overlay
    if (!clicked) {
      const overlayClose = page.locator('.overlay-close').first();
      if (await overlayClose.isVisible({ timeout: 300 }).catch(() => false)) {
        await overlayClose.click();
        clicked = true;
      }
    }

    // Priority 5: Plot-main choices
    if (!clicked) {
      const plotMain = page.locator('.choice-btn.plot-main').first();
      if (await plotMain.isVisible({ timeout: 300 }).catch(() => false)) {
        // Track XP before click
        const xpBefore = await page.evaluate(() => (typeof G !== 'undefined' ? G.xp : 0)).catch(() => 0);
        await plotMain.click();
        await page.waitForTimeout(400);
        const xpAfter = await page.evaluate(() => (typeof G !== 'undefined' ? G.xp : 0)).catch(() => 0);
        const xpGained = xpAfter - xpBefore;
        if (xpGained > xpPerChoiceMax) xpPerChoiceMax = xpGained;
        clicked = true;
      }
    }

    // Priority 6: First available choice button
    if (!clicked) {
      const firstChoice = page.locator('.choice-btn').first();
      if (await firstChoice.isVisible({ timeout: 300 }).catch(() => false)) {
        const xpBefore = await page.evaluate(() => (typeof G !== 'undefined' ? G.xp : 0)).catch(() => 0);
        await firstChoice.click();
        await page.waitForTimeout(400);
        const xpAfter = await page.evaluate(() => (typeof G !== 'undefined' ? G.xp : 0)).catch(() => 0);
        const xpGained = xpAfter - xpBefore;
        if (xpGained > xpPerChoiceMax) xpPerChoiceMax = xpGained;
        clicked = true;
      }
    }

    if (clicked) {
      consecutiveNoClick = 0;
    } else {
      consecutiveNoClick++;
      if (consecutiveNoClick >= 5) {
        console.log(`[playtest] Stuck guard triggered after ${iterations} iterations — no clickable element found for 5 consecutive checks. Breaking loop.`);
        break;
      }
      await page.waitForTimeout(300);
    }

    iterations++;
  }

  const finalLevel = await page.evaluate(() => (typeof G !== 'undefined' ? G.level : -1)).catch(() => -1);
  return { iterations, combatTriggered, xpPerChoiceMax, finalLevel };
}

// Build one test per starting locality
for (const locality of STARTING_LOCALITIES) {
  test(`playtest — ${locality}`, async ({ page }) => {
    test.setTimeout(5 * 60 * 1000);

    // Collect JS console errors
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Fresh page — localStorage is isolated per test context in Playwright
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // Resolve archetype + background for this locality
    const resolution = await resolveLocality(page, locality);

    if (!resolution) {
      console.log(`[playtest:${locality}] No archetype maps to this locality via BG_LOCATION_MAP — using first available archetype.`);
    }

    const archetypeId = resolution ? resolution.archetypeId : null;
    const bgId = resolution ? resolution.bgId : null;

    // Start game
    await startGameForLocality(page, archetypeId, bgId);

    // Run game loop (max 200 iterations)
    const stats = await runGameLoop(page, 200);

    // --- Soft warns (console.log only, no fail) ---
    if (!stats.combatTriggered) {
      console.log(`[playtest:${locality}] Soft warn: combat was never triggered during this run.`);
    }
    if (stats.xpPerChoiceMax > 100) {
      console.log(`[playtest:${locality}] Soft warn: XP anomaly — max XP gained in a single choice was ${stats.xpPerChoiceMax}.`);
    }
    console.log(`[playtest:${locality}] Final level reached: ${stats.finalLevel} after ${stats.iterations} iterations.`);

    // --- Hard-fail assertions ---

    // 1. No JS errors during the run
    expect(
      errors,
      `JS errors encountered during ${locality} playtest:\n${errors.join('\n')}`
    ).toHaveLength(0);

    // 2. Meaningful progress: stageProgress[1] >= 3 OR already in Stage II
    const progress = await page.evaluate(() => {
      if (typeof G === 'undefined') return { stageProgress1: 0, stage: '' };
      return { stageProgress1: G.stageProgress ? G.stageProgress[1] : 0, stage: G.stage };
    });
    expect(
      progress.stageProgress1 >= 3 || progress.stage === 'Stage II',
      `Expected stageProgress[1] >= 3 or Stage II, got stageProgress[1]=${progress.stageProgress1}, stage=${progress.stage}`
    ).toBe(true);

    // 3. HP is a valid non-negative number
    const hp = await page.evaluate(() => (typeof G !== 'undefined' ? G.hp : NaN));
    expect(!isNaN(hp) && hp >= 0, `Expected valid HP >= 0, got ${hp}`).toBe(true);

    // 4. Level and XP are valid numbers
    const levelXp = await page.evaluate(() => {
      if (typeof G === 'undefined') return { level: NaN, xp: NaN };
      return { level: G.level, xp: G.xp };
    });
    expect(!isNaN(levelXp.level), `Expected valid level number, got ${levelXp.level}`).toBe(true);
    expect(!isNaN(levelXp.xp), `Expected valid xp number, got ${levelXp.xp}`).toBe(true);
  });
}
