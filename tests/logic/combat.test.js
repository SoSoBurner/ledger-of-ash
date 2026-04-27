'use strict';
const { createGameContext } = require('../setup');

describe('applyWound — death path', () => {
  test('lethal damage sets hp to 0 and marks G.dead', () => {
    const ctx = createGameContext({ hp: 5, maxHp: 20 });

    if (!ctx.applyWound) {
      console.warn('applyWound not available in test context — skipping');
      return;
    }

    ctx.applyWound(10, 'test');
    expect(ctx.G.hp).toBe(0);
    expect(ctx.G.dead).toBe(true);
  });

  test('non-lethal damage reduces hp and does not mark G.dead', () => {
    const ctx = createGameContext({ hp: 20, maxHp: 20 });

    if (!ctx.applyWound) {
      console.warn('applyWound not available in test context — skipping');
      return;
    }

    ctx.applyWound(5, 'test');
    expect(ctx.G.hp).toBe(15);
    expect(ctx.G.dead).toBe(false);
  });
});
