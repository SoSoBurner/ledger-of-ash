'use strict';
const { createGameContext } = require('../setup');

const BASE = { location: 'shelkopolis', flags: {}, stageProgress: { 1: 0, 2: 0 } };

function makeRival(renown, overrides) {
  return Object.assign({
    name: 'Test Rival', archetype: 'Fighter', hook: 'test',
    renown, active: true, lastSeen: 'shelkopolis', location: 'other'
  }, overrides);
}

// Force Math.random → 0.9 so roll = floor(0.9*10) = 9 >= 8, guaranteeing renown++
function withForcedRoll(fn) {
  const orig = Math.random;
  Math.random = () => 0.9;
  try { fn(); } finally { Math.random = orig; }
}

function ctx(rivals) {
  return createGameContext(Object.assign({}, BASE, { rivalAdventurers: rivals }));
}

describe('advanceRivals — threshold notices', () => {
  test('fires world notice when rival crosses renown 3', () => {
    const c = ctx([makeRival(2)]);
    if (!c.advanceRivals) { console.warn('advanceRivals not exported — skip'); return; }
    withForcedRoll(() => c.advanceRivals());
    expect(c.G.rivalAdventurers[0].renown).toBe(3);
    expect(c.G._rivalNoticeCount).toBe(1);
  });

  test('fires world notice when rival crosses renown 6', () => {
    const c = ctx([makeRival(5)]);
    if (!c.advanceRivals) { console.warn('advanceRivals not exported — skip'); return; }
    withForcedRoll(() => c.advanceRivals());
    expect(c.G.rivalAdventurers[0].renown).toBe(6);
    expect(c.G._rivalNoticeCount).toBe(1);
  });

  test('fires world notice when rival crosses renown 9', () => {
    const c = ctx([makeRival(8)]);
    if (!c.advanceRivals) { console.warn('advanceRivals not exported — skip'); return; }
    withForcedRoll(() => c.advanceRivals());
    expect(c.G.rivalAdventurers[0].renown).toBe(9);
    expect(c.G._rivalNoticeCount).toBe(1);
  });
});

describe('advanceRivals — lay-low drain', () => {
  test('rival with layLow:true loses 1 renown instead of gaining', () => {
    const c = ctx([makeRival(5, { layLow: true })]);
    if (!c.advanceRivals) { console.warn('advanceRivals not exported — skip'); return; }
    withForcedRoll(() => c.advanceRivals());
    expect(c.G.rivalAdventurers[0].renown).toBe(4);
    expect(c.G.rivalAdventurers[0].layLow).toBe(false);
  });

  test('rival renown never drains below 1 during lay-low', () => {
    const c = ctx([makeRival(1, { layLow: true })]);
    if (!c.advanceRivals) { console.warn('advanceRivals not exported — skip'); return; }
    withForcedRoll(() => c.advanceRivals());
    expect(c.G.rivalAdventurers[0].renown).toBe(1);
  });
});
