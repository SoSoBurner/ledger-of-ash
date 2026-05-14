'use strict';

describe('handleChoice — safe DC derivation', () => {
  test('safe choice auto-rolls at DC 7, not DC 8', () => {
    const html = require('fs').readFileSync(
      require('path').join(__dirname, '../../ledger-of-ash.html'), 'utf8'
    );
    const match = html.match(/tier === 'safe'\s*\?\s*(\d+)/);
    expect(match).not.toBeNull();
    expect(parseInt(match[1], 10)).toBe(7);
  });
});
