'use strict';
const { createGameContext } = require('../setup');

describe('useUtilitySkill — direct application', () => {
  test('applies utilityResult unconditionally via G.lastResult', () => {
    const ctx = createGameContext({ level: 3 });
    const { G, useUtilitySkill } = ctx;
    G.traits = [{
      id: 'test_utility',
      skill: 'wits',
      bonus: 2,
      utilityResult: 'You sense hidden patterns in the data.'
    }];
    useUtilitySkill('test_utility');
    expect(G.lastResult).toBe('You sense hidden patterns in the data.');
  });

  test('does not set a failure message in G.lastResult', () => {
    const ctx = createGameContext({});
    const { G, useUtilitySkill } = ctx;
    G.traits = [{ id: 'fizzle_test', utilityResult: 'Works.' }];
    useUtilitySkill('fizzle_test');
    expect(G.lastResult).not.toMatch(/fizzles|yields little/i);
  });

  test('marks trait as used after activation', () => {
    const ctx = createGameContext({});
    const { G, useUtilitySkill } = ctx;
    G.traits = [{ id: 'use_once', utilityResult: 'Effect applied.' }];
    useUtilitySkill('use_once');
    expect(G.traits[0].used).toBe(true);
  });

  test('does not alter G.lastResult for unknown trait id', () => {
    const ctx = createGameContext({});
    const { G, useUtilitySkill } = ctx;
    G.traits = [];
    G.lastResult = 'prior';
    useUtilitySkill('nonexistent_id');
    expect(G.lastResult).toBe('prior');
  });
});
