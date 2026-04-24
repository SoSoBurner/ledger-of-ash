'use strict';
const { createGameContext, resetG } = require('../setup');

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => { resetG(ctx.G); ctx.G.companions = []; });

describe('getActiveCompanions()', () => {
  test('returns empty array when no companions', () => {
    expect(ctx.getActiveCompanions()).toEqual([]);
  });

  test('returns only companions with status === "active"', () => {
    ctx.G.companions = [
      { id: 'vorath', status: 'active' },
      { id: 'mira',   status: 'inactive' },
      { id: 'extra',  status: 'active' },
    ];
    const active = ctx.getActiveCompanions();
    expect(active.length).toBe(2);
    expect(active.map(c => c.id)).toEqual(['vorath', 'extra']);
  });

  test('excludes wounded/dead companions', () => {
    ctx.G.companions = [
      { id: 'a', status: 'wounded' },
      { id: 'b', status: 'dead' },
      { id: 'c', status: 'active' },
    ];
    const active = ctx.getActiveCompanions();
    expect(active.length).toBe(1);
    expect(active[0].id).toBe('c');
  });

  test('returns empty when all companions inactive', () => {
    ctx.G.companions = [
      { id: 'x', status: 'inactive' },
      { id: 'y', status: 'wounded' },
    ];
    expect(ctx.getActiveCompanions()).toEqual([]);
  });
});
