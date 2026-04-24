'use strict';
const { createGameContext, resetG } = require('../setup');

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => { resetG(ctx.G); });

// XP thresholds: level 1→2 needs 120 XP; level N→N+1 needs N*60 XP

describe('XP → level progression', () => {
  test('level 1→2 on 120 XP', () => {
    ctx.G.level = 1;
    ctx.G.stage = 'Stage I';
    ctx.gainXp(120);
    expect(ctx.G.level).toBeGreaterThanOrEqual(2);
  });

  test('119 XP does not trigger level up from level 1', () => {
    ctx.G.level = 1;
    ctx.G.xp = 0;
    ctx.gainXp(119);
    expect(ctx.G.level).toBe(1);
  });

  test('XP below threshold does not level up', () => {
    ctx.G.level = 1;
    ctx.G.xp = 0;
    ctx.gainXp(1);
    expect(ctx.G.level).toBe(1);
  });

  test('level does not exceed stage cap in Stage I (cap = 5)', () => {
    ctx.G.stage = 'Stage I';
    ctx.G.level = 5;
    ctx.G.xp = 0;
    ctx.gainXp(9999);
    expect(ctx.G.level).toBe(5);
  });

  test('level does not exceed stage cap in Stage II (cap = 10)', () => {
    ctx.G.stage = 'Stage II';
    ctx.G.level = 10;
    ctx.G.xp = 0;
    ctx.gainXp(9999);
    expect(ctx.G.level).toBe(10);
  });

  test('XP beyond stage cap overflows into masteryXP', () => {
    ctx.G.stage = 'Stage I';
    ctx.G.level = 5;
    ctx.G.xp = 0;
    ctx.G.masteryXP = 0;
    ctx.gainXp(50);
    expect(ctx.G.masteryXP).toBeGreaterThan(0);
    expect(ctx.G.xp).toBe(0);
  });

  test('cap hint fires once when Stage I cap hit without boss flag', () => {
    ctx.G.stage = 'Stage I';
    ctx.G.level = 5;
    ctx.G.flags.stage1_narrative_complete = false;
    ctx.G.flags._s1cap_hint_shown = false;
    ctx.gainXp(50);
    expect(ctx.G.flags._s1cap_hint_shown).toBe(true);
  });

  test('cap hint does not fire twice', () => {
    ctx.G.stage = 'Stage I';
    ctx.G.level = 5;
    ctx.G.flags.stage1_narrative_complete = false;
    ctx.G.flags._s1cap_hint_shown = true;
    const before = ctx.narrations.length;
    ctx.gainXp(50);
    expect(ctx.narrations.length).toBe(before);
  });

  test('cap hint does not fire when stage1_narrative_complete is true', () => {
    ctx.G.stage = 'Stage I';
    ctx.G.level = 5;
    ctx.G.flags.stage1_narrative_complete = true;
    ctx.G.flags._s1cap_hint_shown = false;
    ctx.gainXp(50);
    expect(ctx.G.flags._s1cap_hint_shown).toBeFalsy();
  });
});

describe('STAGE_LEVEL_CAP values', () => {
  test('Stage I cap is 5', () => {
    expect(ctx.STAGE_LEVEL_CAP['Stage I']).toBe(5);
  });

  test('Stage II cap is 10', () => {
    expect(ctx.STAGE_LEVEL_CAP['Stage II']).toBe(10);
  });

  test('Stage III cap is 15', () => {
    expect(ctx.STAGE_LEVEL_CAP['Stage III']).toBe(15);
  });
});
