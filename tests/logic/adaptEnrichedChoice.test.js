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

describe('adaptEnrichedChoice — tag classification', () => {
  const noop = function() {};

  test('explicit scalar tag safe overrides everything', () => {
    const choice = ctx.adaptEnrichedChoice({ label: 'T', tag: 'safe', fn: noop });
    expect(choice.tag).toBe('safe');
  });

  test('explicit scalar tag bold overrides everything', () => {
    const choice = ctx.adaptEnrichedChoice({ label: 'T', tag: 'bold', fn: noop });
    expect(choice.tag).toBe('bold');
  });

  test('tags: [Investigation] → safe (semantic safe mapping)', () => {
    const choice = ctx.adaptEnrichedChoice({ label: 'T', tags: ['Investigation'], fn: noop });
    expect(choice.tag).toBe('safe');
  });

  test('tags: [Confrontation] → bold (semantic bold mapping)', () => {
    const choice = ctx.adaptEnrichedChoice({ label: 'T', tags: ['Confrontation'], fn: noop });
    expect(choice.tag).toBe('bold');
  });

  test('tags: [NPC, Social] → safe', () => {
    const choice = ctx.adaptEnrichedChoice({ label: 'T', tags: ['NPC', 'Social'], fn: noop });
    expect(choice.tag).toBe('safe');
  });

  test('tags: [Ambush] → bold', () => {
    const choice = ctx.adaptEnrichedChoice({ label: 'T', tags: ['Ambush'], fn: noop });
    expect(choice.tag).toBe('bold');
  });

  test('tags: [Travel] → risky (no semantic match)', () => {
    const choice = ctx.adaptEnrichedChoice({ label: 'T', tags: ['Travel'], fn: noop });
    expect(choice.tag).toBe('risky');
  });

  test('bold takes priority over safe when both present in tags', () => {
    const choice = ctx.adaptEnrichedChoice({ label: 'T', tags: ['Investigation', 'Confrontation'], fn: noop });
    expect(choice.tag).toBe('bold');
  });
});

describe('adaptEnrichedChoice — failResult forwarding', () => {
  const noop = function() {};

  test('failResult field is preserved on adapted enriched choice', () => {
    const choice = ctx.adaptEnrichedChoice({
      label: 'Test',
      fn: noop,
      failResult: 'The path is blocked. You turn back.'
    });
    expect(choice.failResult).toBe('The path is blocked. You turn back.');
    expect(choice._isEnriched).toBe(true);
  });

  test('enriched choice without failResult has undefined failResult', () => {
    const choice = ctx.adaptEnrichedChoice({
      label: 'Test',
      fn: noop
    });
    expect(choice.failResult).toBeUndefined();
    expect(choice._isEnriched).toBe(true);
  });
});

describe('handleChoice — failResult guard allows enriched choices', () => {
  test('failResult guard does not exclude enriched choices when failResult is present', () => {
    const html = require('fs').readFileSync(
      require('path').join(__dirname, '../../ledger-of-ash.html'), 'utf8'
    );
    // The guard must NOT be: !choice._isEnriched && choice.failResult
    // It must allow enriched choices through when failResult is set.
    // Correct form: (!choice._isEnriched || choice.failResult) — or just choice.failResult alone.
    const badGuard = /!\s*choice\._isEnriched\s*&&\s*choice\.failResult/;
    expect(badGuard.test(html)).toBe(false);
  });

  test('failResult short-circuit block exists in handleChoice', () => {
    const html = require('fs').readFileSync(
      require('path').join(__dirname, '../../ledger-of-ash.html'), 'utf8'
    );
    expect(html).toMatch(/_autoRollFailed && choice\.failResult/);
  });
});
