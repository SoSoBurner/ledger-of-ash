'use strict';
const { createGameContext, resetG } = require('../setup');

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => { resetG(ctx.G); });

// ─── Stage I → II ────────────────────────────────────────────────────────────

describe('Stage I → II gate', () => {
  test('does NOT advance when at level cap but flag missing', () => {
    ctx.G.stage = 'Stage I';
    ctx.G.level = 5;
    ctx.G.flags.stage1_narrative_complete = false;
    ctx.checkStageAdvance();
    expect(ctx.G.stage).toBe('Stage I');
  });

  test('does NOT advance when flag set but stage already past Stage I', () => {
    ctx.G.stage = 'Stage II';
    ctx.G.flags.stage1_narrative_complete = true;
    ctx.checkStageAdvance();
    expect(ctx.G.stage).toBe('Stage II');
  });

  test('advances when stage1_narrative_complete is true', () => {
    ctx.G.stage = 'Stage I';
    ctx.G.level = 3;
    ctx.G.flags.stage1_narrative_complete = true;
    ctx.checkStageAdvance();
    expect(ctx.G.stage).toBe('Stage II');
  });

  test('sets stageLabel on advance', () => {
    ctx.G.stage = 'Stage I';
    ctx.G.flags.stage1_narrative_complete = true;
    ctx.checkStageAdvance();
    expect(ctx.G.stageLabel).toBe('Local Inter-Polity');
  });

  test('sets principalities_route_unlocked flag on advance', () => {
    ctx.G.stage = 'Stage I';
    ctx.G.flags.stage1_narrative_complete = true;
    ctx.checkStageAdvance();
    expect(ctx.G.flags.principalities_route_unlocked).toBe(true);
  });

  test('level 5 without flag: stage stays I (cap only, no advance)', () => {
    ctx.G.stage = 'Stage I';
    ctx.G.level = 5;
    ctx.checkStageAdvance();
    expect(ctx.G.stage).toBe('Stage I');
  });
});

// ─── canAdvanceToStage3 — V1.0 hardcoded false ───────────────────────────────
// Stage 3 is not part of the V1.0 release. The function is hardcoded to return
// false until Stage 3 content exists. These tests document that contract.

describe('canAdvanceToStage3() — V1.0 stub', () => {
  test('returns false with no flags (baseline)', () => {
    expect(ctx.canAdvanceToStage3()).toBe(false);
  });

  test('returns false even when all gate conditions are set', () => {
    ctx.G.flags.stage2_climax_complete = true;
    ctx.G.flags.stage2_faction_contact_made = true;
    ctx.G.investigationProgress = 15;
    expect(ctx.canAdvanceToStage3()).toBe(false);
  });

  test('returns false regardless of investigationProgress value', () => {
    ctx.G.investigationProgress = 99;
    expect(ctx.canAdvanceToStage3()).toBe(false);
  });
});

// ─── checkStageAdvance: Stage II does NOT advance to III in V1.0 ──────────────

describe('Stage II → III via checkStageAdvance() — V1.0 stub', () => {
  test('does not advance from Stage II regardless of flags', () => {
    ctx.G.stage = 'Stage II';
    ctx.G.flags.stage2_climax_complete = true;
    ctx.G.flags.stage2_faction_contact_made = true;
    ctx.G.investigationProgress = 15;
    ctx.checkStageAdvance();
    expect(ctx.G.stage).toBe('Stage II');
  });
});
