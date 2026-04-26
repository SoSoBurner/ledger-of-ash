// game-logic.test.js — regression tests for game logic correctness

describe('stage2_enriched_choices addJournal arg order', () => {
  it('no addJournal call uses an invalid category as its first argument', () => {
    const fs = require('fs');
    const src = fs.readFileSync('content/stage2_enriched_choices.js', 'utf8');
    const INVALID_CATEGORIES = [
      'alliance','ally','companion','contact','setback','combat','consequence',
      'conflict','threat','expense','progress','action','news','faction','rest',
      'mystery','route','spy','espionage','loss','network'
    ];
    const pattern = /addJournal\(\s*'([^']+)'/g;
    let m;
    const violations = [];
    while ((m = pattern.exec(src)) !== null) {
      if (INVALID_CATEGORIES.includes(m[1])) {
        violations.push(`addJournal('${m[1]}', ...) — invalid category as first arg`);
      }
    }
    expect(violations).toEqual([]);
  });
});
