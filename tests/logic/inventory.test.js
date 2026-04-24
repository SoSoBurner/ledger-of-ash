'use strict';
const { createGameContext, resetG } = require('../setup');

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => {
  resetG(ctx.G);
  ctx.G.inventory = [];
  ctx.G.equipped = { weapon: null, armor: null, tool: null };
});

// equipItem uses item.type (not item.slot) to determine the slot

describe('addToInventory(item)', () => {
  test('adds item to G.inventory', () => {
    ctx.addToInventory({ id: 'sword', name: 'Iron Sword', type: 'weapon' });
    expect(ctx.G.inventory.length).toBe(1);
  });

  test('multiple items accumulate', () => {
    ctx.addToInventory({ id: 'a', name: 'Item A', type: 'weapon' });
    ctx.addToInventory({ id: 'b', name: 'Item B', type: 'tool' });
    expect(ctx.G.inventory.length).toBe(2);
  });

  test('stored item has equipped:false by default', () => {
    ctx.addToInventory({ id: 'sword', name: 'Iron Sword', type: 'weapon' });
    expect(ctx.G.inventory[0].equipped).toBe(false);
  });
});

describe('equipItem(idx)', () => {
  test('equips weapon item to weapon slot', () => {
    ctx.addToInventory({ id: 'sword', name: 'Iron Sword', type: 'weapon' });
    ctx.equipItem(0);
    expect(ctx.G.equipped.weapon).not.toBeNull();
  });

  test('equips armor item to armor slot', () => {
    ctx.addToInventory({ id: 'mail', name: 'Chain Mail', type: 'armor' });
    ctx.equipItem(0);
    expect(ctx.G.equipped.armor).not.toBeNull();
  });

  test('equips non-weapon/armor item to tool slot', () => {
    ctx.addToInventory({ id: 'lantern', name: 'Lantern', type: 'tool' });
    ctx.equipItem(0);
    expect(ctx.G.equipped.tool).not.toBeNull();
  });

  test('marks item as equipped in inventory', () => {
    ctx.addToInventory({ id: 'sword', name: 'Iron Sword', type: 'weapon' });
    ctx.equipItem(0);
    expect(ctx.G.inventory[0].equipped).toBe(true);
  });

  test('equipping new weapon replaces old in slot', () => {
    ctx.addToInventory({ id: 'sword1', name: 'Old Sword', type: 'weapon' });
    ctx.addToInventory({ id: 'sword2', name: 'New Sword', type: 'weapon' });
    ctx.equipItem(0);
    ctx.equipItem(1);
    expect(JSON.stringify(ctx.G.equipped.weapon)).toContain('New Sword');
  });

  test('equipping index out of bounds does nothing', () => {
    ctx.equipItem(99);
    expect(ctx.G.equipped.weapon).toBeNull();
  });
});

describe('unequipItem(slot)', () => {
  test('clears the slot', () => {
    ctx.addToInventory({ id: 'sword', name: 'Iron Sword', type: 'weapon' });
    ctx.equipItem(0);
    ctx.unequipItem('weapon');
    expect(ctx.G.equipped.weapon).toBeNull();
  });

  test('marks item as not equipped after unequip', () => {
    ctx.addToInventory({ id: 'sword', name: 'Iron Sword', type: 'weapon' });
    ctx.equipItem(0);
    ctx.unequipItem('weapon');
    expect(ctx.G.inventory[0].equipped).toBe(false);
  });
});
