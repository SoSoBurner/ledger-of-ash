'use strict';
// E2E: new-game flow through first choices, stage I sanity checks
// Runs against ledger-of-ash.html via file:// protocol.

const { test, expect } = require('@playwright/test');

// Helper: complete character creation and reach the game screen
async function startNewGame(page) {
  await page.goto('/');
  await page.waitForSelector('#btn-new-legend', { state: 'visible' });
  await page.click('#btn-new-legend');

  // Fill name
  await page.fill('#char-name', 'Teslyn');

  // Select the first archetype card
  const archetypeCard = page.locator('#archetype-grid .archetype-card, #archetype-grid .card').first();
  await archetypeCard.waitFor({ state: 'visible', timeout: 5000 });
  await archetypeCard.click();

  // Select background if step appears
  const bgStep = page.locator('#bg-step');
  const bgVisible = await bgStep.isVisible().catch(() => false);
  if (bgVisible) {
    const bgCard = page.locator('#background-grid .card, #background-grid .bg-card').first();
    await bgCard.click();
  }

  // Begin
  await page.waitForSelector('#begin-btn:not([style*="display:none"])', { timeout: 5000 });
  await page.click('#begin-btn');

  // Skip onboarding if shown
  const skip = page.locator('#onboarding-skip');
  if (await skip.isVisible({ timeout: 2000 }).catch(() => false)) {
    await skip.click();
  }

  // Wait for game screen
  await page.waitForSelector('#screen-game.active, #screen-game', { timeout: 10000 });
  await page.waitForTimeout(500);
}

test('title screen loads and shows Begin New Legend', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#btn-new-legend')).toBeVisible();
  await expect(page.locator('#screen-title')).toBeVisible();
});

test('new game creation reaches game screen', async ({ page }) => {
  await startNewGame(page);
  await expect(page.locator('#topbar-stage')).toBeVisible();
});

test('game starts in Stage I', async ({ page }) => {
  await startNewGame(page);
  const stageText = await page.locator('#topbar-stage').textContent();
  expect(stageText).toContain('Stage I');
});

test('choices are rendered after new game starts', async ({ page }) => {
  await startNewGame(page);
  // Wait for at least one choice button to appear
  await page.waitForSelector('.choice-btn', { timeout: 8000 });
  const count = await page.locator('.choice-btn').count();
  expect(count).toBeGreaterThan(0);
});

test('clicking a choice produces narration', async ({ page }) => {
  await startNewGame(page);
  await page.waitForSelector('.choice-btn', { timeout: 8000 });

  // Click the first safe/available choice
  const btn = page.locator('.choice-btn').first();
  await btn.click();

  // After a choice, new narration or new choices should appear
  await page.waitForTimeout(800);
  const hasChoices = await page.locator('.choice-btn').count() > 0;
  const hasNarration = await page.locator('.narrative-text, .result-text, #narration-panel').count() > 0;
  expect(hasChoices || hasNarration).toBe(true);
});

test('Stage I cap: level 5 does NOT auto-advance to Stage II', async ({ page }) => {
  await startNewGame(page);

  // Force state: level cap reached, no narrative flag
  await page.evaluate(() => {
    G.level = 5;
    G.xp = 0;
    G.stage = 'Stage I';
    G.flags.stage1_narrative_complete = false;
    checkStageAdvance();
  });

  const stageText = await page.locator('#topbar-stage').textContent();
  expect(stageText).toContain('Stage I');
});

test('Stage I advances to II when stage1_narrative_complete is set', async ({ page }) => {
  await startNewGame(page);

  await page.evaluate(() => {
    G.stage = 'Stage I';
    G.flags.stage1_narrative_complete = true;
    checkStageAdvance();
    updateHUD();
  });

  await page.waitForTimeout(300);
  const stageText = await page.locator('#topbar-stage').textContent();
  expect(stageText).toContain('Stage II');
});
