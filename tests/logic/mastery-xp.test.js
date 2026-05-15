'use strict';
const { createGameContext, resetG } = require('../setup');

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => { resetG(ctx.G); });

// ─── renderMasterySection ────────────────────────────────────────────────────

describe('renderMasterySection', () => {
  test('returns empty string when masteryXP is 0', () => {
    ctx.G.masteryXP = 0;
    ctx.G.masteryPurchased = [];
    const html = ctx.renderMasterySection();
    expect(html).toBe('');
  });

  test('shows 3 upgrade buttons when masteryXP > 0 and none purchased', () => {
    ctx.G.masteryXP = 100;
    ctx.G.masteryPurchased = [];
    const html = ctx.renderMasterySection();
    const matches = html.match(/ability-btn/g) || [];
    expect(matches.length).toBe(3);
  });

  test('excludes already-purchased upgrades', () => {
    ctx.G.masteryXP = 100;
    ctx.G.masteryPurchased = ['m_hp'];
    const html = ctx.renderMasterySection();
    // m_hp excluded — next 3 from pool should appear (m_roll, m_gold, m_heat)
    expect(html).not.toContain('buyMasteryUpgrade(\'m_hp\')');
    const matches = html.match(/ability-btn/g) || [];
    expect(matches.length).toBe(3);
  });

  test('buttons disabled when cannot afford upgrade', () => {
    ctx.G.masteryXP = 1;  // too low to afford any upgrade (cheapest is 40)
    ctx.G.masteryPurchased = [];
    const html = ctx.renderMasterySection();
    expect(html).toContain('disabled');
    expect(html).not.toContain('onclick="buyMasteryUpgrade');
  });

  test('shows All upgrades purchased message when pool exhausted', () => {
    ctx.G.masteryXP = 200;
    ctx.G.masteryPurchased = ['m_hp', 'm_roll', 'm_gold', 'm_heat', 'm_craft', 'm_renown'];
    const html = ctx.renderMasterySection();
    expect(html).toContain('All upgrades purchased');
  });
});

// ─── buyMasteryUpgrade ───────────────────────────────────────────────────────

describe('buyMasteryUpgrade', () => {
  test('deducts cost from masteryXP on purchase', () => {
    ctx.G.masteryXP = 100;
    ctx.G.masteryPurchased = [];
    ctx.buyMasteryUpgrade('m_hp');  // costs 40
    expect(ctx.G.masteryXP).toBe(60);
  });

  test('records purchased id in G.masteryPurchased', () => {
    ctx.G.masteryXP = 100;
    ctx.G.masteryPurchased = [];
    ctx.buyMasteryUpgrade('m_hp');
    expect(ctx.G.masteryPurchased).toContain('m_hp');
  });

  test('does nothing when masteryXP is insufficient', () => {
    ctx.G.masteryXP = 10;
    ctx.G.masteryPurchased = [];
    ctx.buyMasteryUpgrade('m_hp');  // costs 40
    expect(ctx.G.masteryXP).toBe(10);
    expect(ctx.G.masteryPurchased).toHaveLength(0);
  });

  test('does nothing for unknown upgrade id', () => {
    ctx.G.masteryXP = 100;
    ctx.G.masteryPurchased = [];
    ctx.buyMasteryUpgrade('m_nonexistent');
    expect(ctx.G.masteryXP).toBe(100);
    expect(ctx.G.masteryPurchased).toHaveLength(0);
  });

  test('m_roll sets masteryBonuses.rollBonus', () => {
    ctx.G.masteryXP = 100;
    ctx.G.masteryPurchased = [];
    ctx.G.masteryBonuses = {};
    ctx.buyMasteryUpgrade('m_roll');  // costs 40
    expect(ctx.G.masteryBonuses.rollBonus).toBe(1);
  });

  test('m_gold sets masteryBonuses.goldBonus', () => {
    ctx.G.masteryXP = 100;
    ctx.G.masteryPurchased = [];
    ctx.G.masteryBonuses = {};
    ctx.buyMasteryUpgrade('m_gold');  // costs 40
    expect(ctx.G.masteryBonuses.goldBonus).toBe(3);
  });

  test('m_heat sets masteryBonuses.heatReduction', () => {
    ctx.G.masteryXP = 100;
    ctx.G.masteryPurchased = [];
    ctx.G.masteryBonuses = {};
    ctx.buyMasteryUpgrade('m_heat');  // costs 60
    expect(ctx.G.masteryBonuses.heatReduction).toBe(1);
  });

  test('m_craft sets masteryBonuses.craftDCReduction', () => {
    ctx.G.masteryXP = 100;
    ctx.G.masteryPurchased = [];
    ctx.G.masteryBonuses = {};
    ctx.buyMasteryUpgrade('m_craft');  // costs 60
    expect(ctx.G.masteryBonuses.craftDCReduction).toBe(2);
  });

  test('m_hp purchase deducts cost and records id (effect applied via applyEffect)', () => {
    // applyEffect is a DOM-level call — verify the purchase bookkeeping only
    ctx.G.masteryXP = 100;
    ctx.G.masteryPurchased = [];
    ctx.buyMasteryUpgrade('m_hp');  // costs 40
    expect(ctx.G.masteryXP).toBe(60);
    expect(ctx.G.masteryPurchased).toContain('m_hp');
  });
});
