'use strict';
const { createGameContext, resetG } = require('../setup');

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => { resetG(ctx.G); });

describe('renderShop', () => {
  test('renders shelkopolis items with stat lines', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.gold = 50;
    ctx.G.inventory = [];
    const html = ctx.renderShop();
    expect(html).toContain('Iron Blade');
    expect(html).toContain('+2 Might');
    expect(html).toContain('Patched Armor');
  });

  test('shows empty message for locality with no shop', () => {
    ctx.G.location = 'nowhere_special';
    const html = ctx.renderShop();
    expect(html).toContain('Nothing available');
  });

  test('shows OWNED for already-owned items', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.inventory = [{ id: 'iron_blade' }];
    ctx.G.gold = 100;
    const html = ctx.renderShop();
    expect(html).toContain('OWNED');
  });

  test('disables buy button when cannot afford', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.gold = 5;
    ctx.G.inventory = [];
    const html = ctx.renderShop();
    expect(html).toContain('disabled');
  });

  test('renders cosmoria items', () => {
    ctx.G.location = 'cosmoria';
    ctx.G.gold = 100;
    ctx.G.inventory = [];
    const html = ctx.renderShop();
    expect(html).toContain('Guild Seal');
    expect(html).toContain('+2 Wits');
  });
});

describe('buyShopItem', () => {
  test('deducts gold and adds item to inventory', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.gold = 50;
    ctx.G.inventory = [];
    ctx.buyShopItem('iron_blade');
    expect(ctx.G.gold).toBe(15); // 50 - 35
    expect(ctx.G.inventory.some(i => i.id === 'iron_blade')).toBe(true);
  });

  test('refuses purchase when insufficient gold', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.gold = 10;
    ctx.G.inventory = [];
    ctx.buyShopItem('iron_blade');
    expect(ctx.G.inventory.length).toBe(0);
    expect(ctx.G.gold).toBe(10);
  });

  test('refuses duplicate purchase', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.gold = 100;
    ctx.G.inventory = [{ id: 'iron_blade' }];
    ctx.buyShopItem('iron_blade');
    expect(ctx.G.gold).toBe(100); // unchanged
  });

  test('ignores unknown item id', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.gold = 100;
    ctx.G.inventory = [];
    ctx.buyShopItem('nonexistent_item');
    expect(ctx.G.gold).toBe(100);
  });
});
