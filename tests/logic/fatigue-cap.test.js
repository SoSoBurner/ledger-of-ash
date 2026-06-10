'use strict';

const { createGameContext } = require('../setup');

describe('addFatigue invariant', () => {
  test('clamps at FATIGUE_MAX (10)', () => {
    const { G, addFatigue, FATIGUE_MAX } = createGameContext({ fatigue: 8 });
    expect(FATIGUE_MAX).toBe(10);
    addFatigue(5);
    expect(G.fatigue).toBe(10);
  });

  test('clamps at 0 floor on negative delta', () => {
    const { G, addFatigue } = createGameContext({ fatigue: 2 });
    addFatigue(-5);
    expect(G.fatigue).toBe(0);
  });

  test('first-cap dedup flag set once per save', () => {
    // Observable-state version of the once-per-save guard. The flag check inside
    // addFatigue gates the toast; verifying flag semantics is equivalent to verifying
    // toast count without depending on DOM-bound showToast.
    const { G, addFatigue } = createGameContext({ fatigue: 9, flags: {} });
    addFatigue(2);
    expect(G.fatigue).toBe(10);
    expect(G.flags._fatigue_cap_seen).toBe(true);

    addFatigue(-1);
    expect(G.fatigue).toBe(9);
    expect(G.flags._fatigue_cap_seen).toBe(true);

    addFatigue(2);
    expect(G.fatigue).toBe(10);
    expect(G.flags._fatigue_cap_seen).toBe(true);
  });

  test('rollD20 applies -1 physical penalty at cap', () => {
    const { G, rollD20 } = createGameContext({
      fatigue: 10,
      level: 3,
      skills: { might: 2, vigor: 0, wits: 0, charm: 0, finesse: 0, spirit: 0, craft: 0 },
    });
    const result = rollD20('might', 0);
    // Expected: roll + statValue(2) - fatigueExhaustionPenalty(1) = roll + 1
    expect(result.total).toBe(result.roll + 2 - 1);
    expect(G._lastRollInfo.fatigueExhaustionPenalty).toBe(1);
  });

  test('rollD20 does NOT apply penalty on wits/charm/spirit', () => {
    const { G, rollD20 } = createGameContext({
      fatigue: 10,
      level: 3,
      skills: { might: 0, vigor: 0, wits: 2, charm: 0, finesse: 0, spirit: 0, craft: 0 },
    });
    const result = rollD20('wits', 0);
    expect(result.total).toBe(result.roll + 2);
    expect(G._lastRollInfo.fatigueExhaustionPenalty).toBe(0);
  });
});
