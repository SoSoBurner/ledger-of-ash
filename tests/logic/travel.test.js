'use strict';
const { createGameContext, resetG } = require('../setup');

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => {
  resetG(ctx.G);
  // Set up minimal travel network on the vm sandbox (window === sandbox in game code)
  ctx.window.LOCALITY_TRAVEL_NETWORK = {
    edges: [
      { from: 'shelkopolis', to: 'panim_haven', distance: 4, corridor: 'shelk_panim' },
      { from: 'shelkopolis', to: 'cosmoria', distance: 2, corridor: 'shelk_cosmoria' }
    ]
  };
  ctx.window.TRAVEL_COMPLICATIONS = {};
});
afterEach(() => {
  delete ctx.window.LOCALITY_TRAVEL_NETWORK;
  delete ctx.window.TRAVEL_COMPLICATIONS;
});

describe('startTravel', () => {
  test('calculates days correctly for foot at normal pace', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.travelMode = 'foot';
    ctx.G.travelPace = 'normal';
    const daysBefore = ctx.G.dayCount || 0;
    ctx.startTravel('panim_haven');
    expect(ctx.G.location).toBe('panim_haven');
    // foot=1, normal=1x, distance=4 → ceil(4/1) = 4 days
    expect((ctx.G.dayCount || 0) - daysBefore).toBe(4);
  });

  test('horse halves travel time', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.travelMode = 'horse';
    ctx.G.travelPace = 'normal';
    const daysBefore = ctx.G.dayCount || 0;
    ctx.startTravel('panim_haven');
    // horse=2, normal=1x, distance=4 → ceil(4/2) = 2 days
    expect((ctx.G.dayCount || 0) - daysBefore).toBe(2);
  });

  test('boat is fastest at 3 units/day', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.travelMode = 'boat';
    ctx.G.travelPace = 'normal';
    const daysBefore = ctx.G.dayCount || 0;
    ctx.startTravel('cosmoria');
    // boat=3, distance=2 → ceil(2/3) = 1 day
    expect((ctx.G.dayCount || 0) - daysBefore).toBe(1);
  });

  test('unknown destination does not change location', () => {
    ctx.G.location = 'shelkopolis';
    ctx.startTravel('nowhere');
    expect(ctx.G.location).toBe('shelkopolis');
  });

  test('updates G.location on success', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.travelMode = 'foot';
    ctx.startTravel('cosmoria');
    expect(ctx.G.location).toBe('cosmoria');
  });

  test('fast pace reduces travel time', () => {
    ctx.G.location = 'shelkopolis';
    ctx.G.travelMode = 'foot';
    ctx.G.pace = 'fast';
    const daysBefore = ctx.G.dayCount || 0;
    ctx.startTravel('panim_haven');
    // foot=1, fast=1.5x, distance=4 → ceil(4/1.5) = 3 days
    expect((ctx.G.dayCount || 0) - daysBefore).toBe(3);
  });
});
