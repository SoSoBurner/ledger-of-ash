const fs = require('fs');
const path = require('path');

describe('loadFromSlot uses getDefaultG reset', () => {
  let src;
  beforeAll(() => {
    src = fs.readFileSync(
      path.join(__dirname, '../../ledger-of-ash.html'),
      'utf8'
    );
  });

  it('getDefaultG function is defined', () => {
    expect(/function getDefaultG\(\)\s*\{/.test(src)).toBe(true);
  });

  it('loadFromSlot resets G with getDefaultG before merging save data', () => {
    expect(/Object\.assign\(G,\s*getDefaultG\(\),\s*d\)/.test(src)).toBe(true);
  });

  it('initCreate uses getDefaultG()', () => {
    expect(/function initCreate\(\)\s*\{[^}]{0,200}G\s*=\s*getDefaultG\(\)/.test(src)).toBe(true);
  });
});
