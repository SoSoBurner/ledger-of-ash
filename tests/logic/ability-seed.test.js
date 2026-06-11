'use strict';
const { createGameContext, resetG } = require('../setup');

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => { resetG(ctx.G); });

// seedDefaultCombatAbilities: at creation, abilities whose minSkill the character
// already meets unlock immediately; the rest remain level-up rewards.
// Warrior abilities: shield_press (combat/might, min 2), battle_cry (persuasion/charm, min 1),
// disarm (combat/might, min 3). skillReq uses OLD internal keys; G.skills uses display keys.

describe('seedDefaultCombatAbilities', () => {
  test('is exported by the harness', () => {
    expect(typeof ctx.seedDefaultCombatAbilities).toBe('function');
  });

  test('seeds abilities whose minSkill is met, excludes unmet ones', () => {
    ctx.G.archetype = { id: 'warrior' };
    ctx.G.skills = { might: 2, charm: 1, finesse: 0, vigor: 0, wits: 0, spirit: 0 };
    ctx.G.unlockedCombatAbilities = [];
    ctx.seedDefaultCombatAbilities();
    expect(ctx.G.unlockedCombatAbilities).toContain('shield_press'); // might 2 >= 2
    expect(ctx.G.unlockedCombatAbilities).toContain('battle_cry');   // charm 1 >= 1
    expect(ctx.G.unlockedCombatAbilities).not.toContain('disarm');   // might 2 < 3
  });

  test('normalizes old skillReq keys against display-name G.skills keys', () => {
    ctx.G.archetype = { id: 'warrior' };
    ctx.G.skills = { might: 3, charm: 0 };
    ctx.G.unlockedCombatAbilities = [];
    ctx.seedDefaultCombatAbilities();
    // skillReq 'combat' must resolve to G.skills.might
    expect(ctx.G.unlockedCombatAbilities).toContain('disarm');
    // skillReq 'persuasion' resolves to charm 0 < 1 → excluded
    expect(ctx.G.unlockedCombatAbilities).not.toContain('battle_cry');
  });

  test('calling twice does not duplicate ids', () => {
    ctx.G.archetype = { id: 'warrior' };
    ctx.G.skills = { might: 2, charm: 1 };
    ctx.G.unlockedCombatAbilities = [];
    ctx.seedDefaultCombatAbilities();
    const first = ctx.G.unlockedCombatAbilities.slice();
    ctx.seedDefaultCombatAbilities();
    expect(ctx.G.unlockedCombatAbilities).toEqual(first);
  });

  test('initializes missing unlockedCombatAbilities array', () => {
    ctx.G.archetype = { id: 'warrior' };
    ctx.G.skills = { might: 2, charm: 1 };
    delete ctx.G.unlockedCombatAbilities;
    ctx.seedDefaultCombatAbilities();
    expect(Array.isArray(ctx.G.unlockedCombatAbilities)).toBe(true);
    expect(ctx.G.unlockedCombatAbilities.length).toBeGreaterThan(0);
  });

  test('no-op without an archetype', () => {
    ctx.G.archetype = null;
    ctx.G.unlockedCombatAbilities = [];
    expect(() => ctx.seedDefaultCombatAbilities()).not.toThrow();
    expect(ctx.G.unlockedCombatAbilities).toEqual([]);
  });
});
