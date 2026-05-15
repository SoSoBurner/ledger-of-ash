'use strict';
const { createGameContext, resetG } = require('../setup');

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => { resetG(ctx.G); });

describe('passesAlignGate', () => {
  test('no alignGate — always passes', () => {
    expect(ctx.passesAlignGate({ text: 'Go north.' })).toBe(true);
  });

  test('benevolent gate hidden when benevolence < 25', () => {
    ctx.G.benevolence = 20;
    expect(ctx.passesAlignGate({ alignGate: 'benevolent' })).toBe(false);
  });

  test('benevolent gate visible when benevolence >= 25', () => {
    ctx.G.benevolence = 25;
    expect(ctx.passesAlignGate({ alignGate: 'benevolent' })).toBe(true);
  });

  test('cruel gate hidden when benevolence > -25', () => {
    ctx.G.benevolence = 0;
    expect(ctx.passesAlignGate({ alignGate: 'cruel' })).toBe(false);
  });

  test('cruel gate visible when benevolence <= -25', () => {
    ctx.G.benevolence = -25;
    expect(ctx.passesAlignGate({ alignGate: 'cruel' })).toBe(true);
  });

  test('order gate hidden when orderAxis < 25', () => {
    ctx.G.orderAxis = 10;
    expect(ctx.passesAlignGate({ alignGate: 'order' })).toBe(false);
  });

  test('order gate visible when orderAxis >= 25', () => {
    ctx.G.orderAxis = 30;
    expect(ctx.passesAlignGate({ alignGate: 'order' })).toBe(true);
  });

  test('anarchy gate hidden when orderAxis > -25', () => {
    ctx.G.orderAxis = 0;
    expect(ctx.passesAlignGate({ alignGate: 'anarchy' })).toBe(false);
  });

  test('anarchy gate visible when orderAxis <= -25', () => {
    ctx.G.orderAxis = -25;
    expect(ctx.passesAlignGate({ alignGate: 'anarchy' })).toBe(true);
  });

  test('unknown alignGate value — passes by default', () => {
    expect(ctx.passesAlignGate({ alignGate: 'unknown_type' })).toBe(true);
  });
});
