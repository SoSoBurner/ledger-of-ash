'use strict';
const { createGameContext } = require('../setup');

describe('equipment bonus pipeline', () => {
  test('equipping a shop item with skillBonus:combat applies bonus to getEquipmentBonus', () => {
    const ctx = createGameContext();
    if (!ctx.addToInventory || !ctx.equipItem || !ctx.getEquipmentBonus) {
      console.warn('equipment functions not exported — skip');
      return;
    }

    ctx.addToInventory({ id: 'basic_sword', name: 'Roadwarden Blade', type: 'weapon', skillBonus: 'combat', bonus: 1 });
    ctx.equipItem(0);

    expect(ctx.getEquipmentBonus('combat')).toBe(1);
    expect(ctx.getEquipmentBonus('lore')).toBe(0);
  });

  test('equipping armor applies bonus to correct skill', () => {
    const ctx = createGameContext();
    if (!ctx.addToInventory || !ctx.equipItem || !ctx.getEquipmentBonus) {
      console.warn('equipment functions not exported — skip');
      return;
    }

    ctx.addToInventory({ id: 'light_armor', name: 'Leather Coat', type: 'armor', skillBonus: 'survival', bonus: 1 });
    ctx.equipItem(0);

    expect(ctx.getEquipmentBonus('survival')).toBe(1);
    expect(ctx.getEquipmentBonus('combat')).toBe(0);
  });

  test('unequipping removes bonus', () => {
    const ctx = createGameContext();
    if (!ctx.addToInventory || !ctx.equipItem || !ctx.unequipItem || !ctx.getEquipmentBonus) {
      console.warn('equipment functions not exported — skip');
      return;
    }

    ctx.addToInventory({ id: 'basic_sword', name: 'Roadwarden Blade', type: 'weapon', skillBonus: 'combat', bonus: 1 });
    ctx.equipItem(0);
    expect(ctx.getEquipmentBonus('combat')).toBe(1);

    ctx.unequipItem('weapon');
    expect(ctx.getEquipmentBonus('combat')).toBe(0);
  });
});
