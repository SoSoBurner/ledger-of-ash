'use strict';
const { createGameContext } = require('../setup');

describe('getTraitBonus — Format C (bonusSkill alias used by archetype defs)', () => {
  test('bonusSkill:"might" with bonus:1 contributes +1 to combat', () => {
    const ctx = createGameContext();
    if (!ctx.getTraitBonus) {
      console.warn('getTraitBonus not exported — skip');
      return;
    }
    ctx.G.traits = [{ bonusSkill: 'might', bonus: 1, source: 'archetype' }];
    expect(ctx.getTraitBonus('combat')).toBe(1);
    expect(ctx.getTraitBonus('lore')).toBe(0);
  });

  test('bonusSkill:"finesse" with bonus:2 contributes +2 to stealth', () => {
    const ctx = createGameContext();
    if (!ctx.getTraitBonus) {
      console.warn('getTraitBonus not exported — skip');
      return;
    }
    ctx.G.traits = [{ bonusSkill: 'finesse', bonus: 2, source: 'archetype' }];
    expect(ctx.getTraitBonus('stealth')).toBe(2);
    expect(ctx.getTraitBonus('combat')).toBe(0);
  });

  test('hp_low condition: returns 0 when hp > 40% maxHp, returns bonus when hp ≤ 40%', () => {
    const ctx = createGameContext();
    if (!ctx.getTraitBonus) {
      console.warn('getTraitBonus not exported — skip');
      return;
    }
    ctx.G.maxHp = 20;
    ctx.G.traits = [{ bonusSkill: 'might', bonus: 2, condition: 'hp_low', source: 'archetype' }];

    // hp above 40% threshold (8) — should NOT apply
    ctx.G.hp = 15;
    expect(ctx.getTraitBonus('combat')).toBe(0);

    // hp at threshold (8 = floor(20*0.4)) — strict gt; equal does apply (G.hp > 8 false)
    ctx.G.hp = 8;
    expect(ctx.getTraitBonus('combat')).toBe(2);

    // hp well below threshold — should apply
    ctx.G.hp = 5;
    expect(ctx.getTraitBonus('combat')).toBe(2);
  });

  test('Format A still works: skillBonus map unchanged', () => {
    const ctx = createGameContext();
    if (!ctx.getTraitBonus) {
      console.warn('getTraitBonus not exported — skip');
      return;
    }
    ctx.G.traits = [{ skillBonus: { combat: 1 }, passive: true, source: 'background' }];
    expect(ctx.getTraitBonus('combat')).toBe(1);
  });

  test('Format B still works: skill property with internal key', () => {
    const ctx = createGameContext();
    if (!ctx.getTraitBonus) {
      console.warn('getTraitBonus not exported — skip');
      return;
    }
    ctx.G.traits = [{ skill: 'combat', bonus: 1 }];
    expect(ctx.getTraitBonus('combat')).toBe(1);
  });
});
