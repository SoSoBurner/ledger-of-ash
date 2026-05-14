'use strict';
/**
 * Tests for getChoiceTier and getChoiceDC.
 * Verifies semantic tag arrays classify correctly and level scaling applies.
 */

const { createGameContext, resetG } = require('../setup');

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => { resetG(ctx.G); });

describe('DC classification — getChoiceTier', () => {
  test('Investigation tag resolves to safe tier', () => {
    const choice = { tags: ['Investigation'], text: 'Test', skill: 'lore' };
    expect(ctx.getChoiceTier(choice)).toBe('safe');
  });

  test('NPC tag resolves to safe tier', () => {
    const choice = { tags: ['NPC'], text: 'Test', skill: 'persuasion' };
    expect(ctx.getChoiceTier(choice)).toBe('safe');
  });

  test('Maritime tag resolves to safe tier', () => {
    const choice = { tags: ['Maritime'], text: 'Test', skill: 'lore' };
    expect(ctx.getChoiceTier(choice)).toBe('safe');
  });

  test('Confrontation tag resolves to bold tier', () => {
    const choice = { tags: ['Confrontation'], text: 'Test', skill: 'combat' };
    expect(ctx.getChoiceTier(choice)).toBe('bold');
  });

  test('Ambush tag resolves to bold tier', () => {
    const choice = { tags: ['Ambush'], text: 'Test', skill: 'combat' };
    expect(ctx.getChoiceTier(choice)).toBe('bold');
  });

  test('Espionage tag resolves to bold tier', () => {
    const choice = { tags: ['Espionage'], text: 'Test', skill: 'stealth' };
    expect(ctx.getChoiceTier(choice)).toBe('bold');
  });

  test('no tags defaults to risky', () => {
    const choice = { tags: [], text: 'Test', skill: 'lore' };
    expect(ctx.getChoiceTier(choice)).toBe('risky');
  });

  test('missing tags property defaults to risky', () => {
    const choice = { text: 'Test', skill: 'lore' };
    expect(ctx.getChoiceTier(choice)).toBe('risky');
  });

  test('explicit tag:"safe" scalar wins over bold tags array', () => {
    const choice = { tag: 'safe', tags: ['Confrontation'], text: 'Test', skill: 'lore' };
    expect(ctx.getChoiceTier(choice)).toBe('safe');
  });

  test('explicit tag:"bold" scalar wins over safe tags array', () => {
    const choice = { tag: 'bold', tags: ['Investigation'], text: 'Test', skill: 'lore' };
    expect(ctx.getChoiceTier(choice)).toBe('bold');
  });

  test('explicit tag:"risky" scalar wins', () => {
    const choice = { tag: 'risky', tags: ['Investigation'], text: 'Test', skill: 'lore' };
    expect(ctx.getChoiceTier(choice)).toBe('risky');
  });

  test('bold tag in array takes priority over safe tag', () => {
    const choice = { tags: ['Investigation', 'Confrontation'], text: 'Test', skill: 'lore' };
    expect(ctx.getChoiceTier(choice)).toBe('bold');
  });
});

describe('DC classification — getChoiceDC', () => {
  test('safe tier base DC is 7 at level 1 Stage I', () => {
    ctx.G.level = 1; ctx.G.stage = 'Stage I';
    const choice = { tags: ['Investigation'], skill: 'lore' };
    expect(ctx.getChoiceDC(choice)).toBe(7);
  });

  test('risky tier base DC is 13 at level 1 Stage I', () => {
    ctx.G.level = 1; ctx.G.stage = 'Stage I';
    const choice = { tags: [], skill: 'lore' };
    expect(ctx.getChoiceDC(choice)).toBe(13);
  });

  test('bold tier base DC is 16 at level 1 Stage I', () => {
    ctx.G.level = 1; ctx.G.stage = 'Stage I';
    const choice = { tags: ['Confrontation'], skill: 'combat' };
    expect(ctx.getChoiceDC(choice)).toBe(16);
  });

  test('level scaling: level 3 adds +1 to DC', () => {
    ctx.G.level = 3; ctx.G.stage = 'Stage I';
    const choice = { tags: ['Investigation'], skill: 'lore' };
    // floor((3-1)/2) = 1 → 7 + 1 = 8
    expect(ctx.getChoiceDC(choice)).toBe(8);
  });

  test('level scaling: level 5 adds +2 to DC', () => {
    ctx.G.level = 5; ctx.G.stage = 'Stage I';
    const choice = { tags: ['Investigation'], skill: 'lore' };
    // floor((5-1)/2) = 2 → 7 + 2 = 9
    expect(ctx.getChoiceDC(choice)).toBe(9);
  });

  test('stage II adds +1 to DC', () => {
    ctx.G.level = 1; ctx.G.stage = 'Stage II';
    const choice = { tags: ['Investigation'], skill: 'lore' };
    // 7 + 1 (stage) + 0 (level) = 8
    expect(ctx.getChoiceDC(choice)).toBe(8);
  });

  test('stage II + level 3 stacks bonuses', () => {
    ctx.G.level = 3; ctx.G.stage = 'Stage II';
    const choice = { tags: [], skill: 'lore' };
    // 13 + 1 (stage II) + 1 (level 3) = 15
    expect(ctx.getChoiceDC(choice)).toBe(15);
  });

  test('explicit choice.dc overrides base DC but still gets stage+level scaling', () => {
    ctx.G.level = 3; ctx.G.stage = 'Stage I';
    const choice = { dc: 10, tags: ['Investigation'], skill: 'lore' };
    // choice.dc=10 + 0 (stage I) + 1 (level 3) = 11
    expect(ctx.getChoiceDC(choice)).toBe(11);
  });
});
