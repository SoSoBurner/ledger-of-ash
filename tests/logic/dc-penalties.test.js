const { createGameContext } = require('../setup');

describe('getChoiceDC — alignment and watchfulness penalties', () => {
  test('no penalty when neutral and zero watchfulness', () => {
    const { G, getChoiceDC } = createGameContext({ benevolence: 0, orderAxis: 0 });
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.watchfulness = 0;
    G._alignmentDCPenalty = 0;
    expect(getChoiceDC({ dc: 13 }, 0)).toBe(13);
  });

  test('watchfulness >= 3 adds +1 DC', () => {
    const { G, getChoiceDC } = createGameContext({});
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.watchfulness = 3;
    G._alignmentDCPenalty = 0;
    expect(getChoiceDC({ dc: 13 }, 0)).toBe(14);
  });

  test('watchfulness >= 5 adds +2 DC', () => {
    const { G, getChoiceDC } = createGameContext({});
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.watchfulness = 5;
    G._alignmentDCPenalty = 0;
    expect(getChoiceDC({ dc: 13 }, 0)).toBe(15);
  });

  test('watchfulness >= 7 adds +3 DC', () => {
    const { G, getChoiceDC } = createGameContext({});
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.watchfulness = 7;
    G._alignmentDCPenalty = 0;
    expect(getChoiceDC({ dc: 13 }, 0)).toBe(16);
  });

  test('alignment penalty stacks with watchfulness', () => {
    const { G, getChoiceDC } = createGameContext({});
    G.worldClocks = G.worldClocks || {};
    G.worldClocks.watchfulness = 3;
    G._alignmentDCPenalty = 2;
    expect(getChoiceDC({ dc: 13 }, 0)).toBe(16);
  });
});
