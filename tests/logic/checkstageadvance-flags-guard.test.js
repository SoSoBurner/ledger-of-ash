const fs = require('fs');
const path = require('path');

describe('checkStageAdvance G.flags guard', () => {
  it('checkStageAdvance guards G.flags before companion_gate_open read', () => {
    const src = fs.readFileSync(
      path.join(__dirname, '../../ledger-of-ash.html'),
      'utf8'
    );
    // The guard must appear between function checkStageAdvance() and the companion_gate_open read
    const guardPresent = /function checkStageAdvance\(\)[\s\S]{0,300}if\s*\(!G\.flags\)\s*G\.flags\s*=\s*\{\}[\s\S]{0,300}companion_gate_open/.test(src);
    expect(guardPresent).toBe(true);
  });
});
