'use strict';
const { createGameContext, resetG } = require('../setup');

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => { resetG(ctx.G); });

describe('renderShop', () => {
  // TODO: renderShop/buyLegacyShopItem not yet in engine
  test.skip('renders shelkopolis items with stat lines', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.gold = 50;
    ctx.G.inventory = [];
    const html = ctx.renderShop();
    expect(html).toContain('Iron Blade');
    expect(html).toContain('+2 Might');
    expect(html).toContain('Patched Armor');
  });

  // TODO: renderShop/buyLegacyShopItem not yet in engine
  test.skip('shows empty message for locality with no shop', () => {
    ctx.G.location = 'nowhere_special';
    const html = ctx.renderShop();
    expect(html).toContain('Nothing available');
  });

  // TODO: renderShop/buyLegacyShopItem not yet in engine
  test.skip('shows OWNED for already-owned items', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.inventory = [{ id: 'iron_blade' }];
    ctx.G.gold = 100;
    const html = ctx.renderShop();
    expect(html).toContain('OWNED');
  });

  // TODO: renderShop/buyLegacyShopItem not yet in engine
  test.skip('disables buy button when cannot afford', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.gold = 5;
    ctx.G.inventory = [];
    const html = ctx.renderShop();
    expect(html).toContain('disabled');
  });

  // TODO: renderShop/buyLegacyShopItem not yet in engine
  test.skip('renders cosmoria items', () => {
    ctx.G.location = 'cosmoria';
    ctx.G.gold = 100;
    ctx.G.inventory = [];
    const html = ctx.renderShop();
    expect(html).toContain('Guild Seal');
    expect(html).toContain('+2 Wits');
  });
});

describe('buyLegacyShopItem', () => {
  // TODO: renderShop/buyLegacyShopItem not yet in engine
  test.skip('deducts gold and adds item to inventory', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.gold = 50;
    ctx.G.inventory = [];
    ctx.buyLegacyShopItem('iron_blade');
    expect(ctx.G.gold).toBe(15); // 50 - 35
    expect(ctx.G.inventory.some(i => i.id === 'iron_blade')).toBe(true);
  });

  // TODO: renderShop/buyLegacyShopItem not yet in engine
  test.skip('refuses purchase when insufficient gold', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.gold = 10;
    ctx.G.inventory = [];
    ctx.buyLegacyShopItem('iron_blade');
    expect(ctx.G.inventory.length).toBe(0);
    expect(ctx.G.gold).toBe(10);
  });

  // TODO: renderShop/buyLegacyShopItem not yet in engine
  test.skip('refuses duplicate purchase', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.gold = 100;
    ctx.G.inventory = [{ id: 'iron_blade' }];
    ctx.buyLegacyShopItem('iron_blade');
    expect(ctx.G.gold).toBe(100); // unchanged
  });

  // TODO: renderShop/buyLegacyShopItem not yet in engine
  test.skip('ignores unknown item id', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.gold = 100;
    ctx.G.inventory = [];
    ctx.buyLegacyShopItem('nonexistent_item');
    expect(ctx.G.gold).toBe(100);
  });
});
