'use strict';
/**
 * Round-trip tests for adaptEnrichedChoice.
 * Verifies fn() executes, G mutations propagate, and errors are NOT silently swallowed.
 */

const { createGameContext, resetG } = require('../setup');

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => { resetG(ctx.G); });

describe('adaptEnrichedChoice', () => {
  test('executes fn() and mutates G.stageProgress', () => {
    const G = ctx.G;
    const choice = ctx.adaptEnrichedChoice({
      label: 'Test',
      fn: function() { G.stageProgress[1]++; }
    });
    expect(G.stageProgress[1]).toBe(0);
    choice.action();
    expect(G.stageProgress[1]).toBe(1);
  });

  test('propagates G.investigationProgress increment', () => {
    const G = ctx.G;
    const choice = ctx.adaptEnrichedChoice({
      label: 'Investigate',
      fn: function() { G.investigationProgress++; }
    });
    expect(G.investigationProgress).toBe(0);
    choice.action();
    expect(G.investigationProgress).toBe(1);
  });

  test('does not silently swallow fn() errors', () => {
    const choice = ctx.adaptEnrichedChoice({
      label: 'Broken',
      fn: function() { throw new Error('fn failed'); }
    });
    // Before fix: catch swallows, no throw — this test FAILS.
    // After fix: re-throw makes this pass.
    expect(() => choice.action()).toThrow('fn failed');
  });
});
