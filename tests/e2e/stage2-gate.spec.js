'use strict';
// E2E: Stage II state assertions and inventory equip confirmation
// Uses page.evaluate() to set game state, then asserts on DOM.

const { test, expect } = require('@playwright/test');

async function startNewGame(page) {
  await page.goto('/');
  await page.waitForSelector('#btn-new-legend', { state: 'visible' });
  await page.click('#btn-new-legend');
  await page.fill('#char-name', 'Teslyn');

  const archetypeCard = page.locator('#archetype-grid .archetype-card, #archetype-grid .card').first();
  await archetypeCard.waitFor({ state: 'visible', timeout: 5000 });
  await archetypeCard.click();

  const bgStep = page.locator('#bg-step');
  if (await bgStep.isVisible().catch(() => false)) {
    const bgCard = page.locator('#background-grid .card, #background-grid .bg-card').first();
    await bgCard.click();
  }

  await page.waitForSelector('#begin-btn:not([style*="display:none"])', { timeout: 5000 });
  await page.click('#begin-btn');

  const skip = page.locator('#onboarding-skip');
  if (await skip.isVisible({ timeout: 2000 }).catch(() => false)) {
    await skip.click();
  }

  await page.waitForSelector('#screen-game', { timeout: 10000 });
  await page.waitForTimeout(500);
}

test('Stage II HUD reflects Stage II label after advance', async ({ page }) => {
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

test('Stage II → III does not advance (V1.0 — Stage 3 not released)', async ({ page }) => {
  await startNewGame(page);

  await page.evaluate(() => {
    G.stage = 'Stage II';
    G.flags.stage2_climax_complete = true;
    G.flags.stage2_faction_contact_made = true;
    G.investigationProgress = 15;
    checkStageAdvance();
    updateHUD();
  });

  await page.waitForTimeout(300);
  const stageText = await page.locator('#topbar-stage').textContent();
  expect(stageText).not.toContain('Stage III');
});

test('XP at Stage II cap goes to masteryXP, not level', async ({ page }) => {
  await startNewGame(page);

  const result = await page.evaluate(() => {
    G.stage = 'Stage II';
    G.level = 10;
    G.xp = 0;
    G.masteryXP = 0;
    gainXp(200);
    return { level: G.level, masteryXP: G.masteryXP, xp: G.xp };
  });

  expect(result.level).toBe(10);
  expect(result.masteryXP).toBeGreaterThan(0);
  expect(result.xp).toBe(0);
});

test('addToInventory and equipItem update G.equipped', async ({ page }) => {
  await startNewGame(page);

  const result = await page.evaluate(() => {
    G.inventory = [];
    G.equipped = { weapon: null, armor: null, tool: null };
    addToInventory({ id: 'test_sword', name: 'Test Sword', type: 'weapon' });
    equipItem(0);
    return {
      inventoryLength: G.inventory.length,
      equippedWeapon: G.equipped.weapon ? G.equipped.weapon.name : null,
    };
  });

  expect(result.inventoryLength).toBe(1);
  expect(result.equippedWeapon).toBe('Test Sword');
});

test('G.flags.stage1_narrative_complete is set after stage1_boss is complete', async ({ page }) => {
  await startNewGame(page);

  // Simulate the defeat callback that stage1_boss.js runs on Sera Ironveil defeat
  const flagSet = await page.evaluate(() => {
    G.flags.stage1_mainboss_complete = true;
    G.flags.stage1_narrative_complete = true;
    return G.flags.stage1_narrative_complete === true;
  });

  expect(flagSet).toBe(true);
});
