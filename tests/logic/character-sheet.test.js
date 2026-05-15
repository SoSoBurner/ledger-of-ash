'use strict';
const { createGameContext, resetG } = require('../setup');

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => { resetG(ctx.G); });

describe('buildTraitsSectionHTML', () => {
  test('shows active ability from archetype', () => {
    ctx.G.archetype = { abilities: [{ id: 'shield_press', name: 'Shield Press', type: 'active', desc: 'Push enemy back.', levelMin: 2 }] };
    ctx.G.level = 3;
    ctx.G.unlockedTraits = [];
    ctx.G.traits = [];
    ctx.G.spentAbilities = {};
    const html = ctx.buildTraitsSectionHTML();
    expect(html).toContain('Shield Press');
    expect(html).toContain('Active');
    expect(html).toContain('Requires Level 2');
  });

  test('shows passive background trait (dual format — skillBonus object)', () => {
    ctx.G.archetype = null;
    ctx.G.unlockedTraits = [];
    ctx.G.traits = [{ passive: true, source: 'background', desc: 'Quiet footsteps.', skillBonus: { stealth: 1 } }];
    ctx.G.background = { name: 'Scout' };
    const html = ctx.buildTraitsSectionHTML();
    expect(html).toContain('Passive');
    expect(html).toContain('Quiet footsteps.');
  });

  test('shows unlocked trait from G.unlockedTraits', () => {
    ctx.G.archetype = null;
    ctx.G.unlockedTraits = [{ id: 'edge', name: 'Edge', type: 'passive', desc: '+1 to all rolls.' }];
    ctx.G.traits = [];
    const html = ctx.buildTraitsSectionHTML();
    expect(html).toContain('Edge');
    expect(html).toContain('+1 to all rolls.');
  });

  test('shows empty state when no abilities or traits', () => {
    ctx.G.archetype = null;
    ctx.G.unlockedTraits = [];
    ctx.G.traits = [];
    const html = ctx.buildTraitsSectionHTML();
    expect(html).toContain('No abilities or traits unlocked');
  });

  test('spent active ability shows disabled button', () => {
    ctx.G.archetype = { abilities: [{ id: 'shield_press', name: 'Shield Press', type: 'active', desc: 'Push.', levelMin: 1 }] };
    ctx.G.level = 2;
    ctx.G.unlockedTraits = [];
    ctx.G.traits = [];
    ctx.G.spentAbilities = { shield_press: true };
    const html = ctx.buildTraitsSectionHTML();
    expect(html).toContain('disabled');
  });

  test('ability below level gate does not show activate button', () => {
    ctx.G.archetype = { abilities: [{ id: 'shield_press', name: 'Shield Press', type: 'active', desc: 'Push.', levelMin: 5 }] };
    ctx.G.level = 2;
    ctx.G.unlockedTraits = [];
    ctx.G.traits = [];
    ctx.G.spentAbilities = {};
    const html = ctx.buildTraitsSectionHTML();
    expect(html).toContain('Shield Press');
    expect(html).not.toContain('activateAbilityFromSheet');
  });
});

describe('activateAbilityFromSheet', () => {
  test('marks ability as spent in G.spentAbilities', () => {
    ctx.G.spentAbilities = {};
    ctx.activateAbilityFromSheet('shield_press');
    expect(ctx.G.spentAbilities['shield_press']).toBe(true);
  });

  test('initializes spentAbilities if missing', () => {
    ctx.G.spentAbilities = undefined;
    ctx.activateAbilityFromSheet('edge');
    expect(ctx.G.spentAbilities['edge']).toBe(true);
  });
});
