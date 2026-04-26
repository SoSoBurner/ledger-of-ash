const fs = require('fs');
const path = require('path');

describe('stage2_enriched_choices addJournal arg order', () => {
  let src;
  beforeAll(() => {
    src = fs.readFileSync(
      path.join(__dirname, '../../content/stage2_enriched_choices.js'),
      'utf8'
    );
  });

  it('every addJournal call has a valid category as its second argument', () => {
    const VALID = new Set(['evidence','intelligence','rumor','discovery','contact_made','complication']);
    // Match addJournal(firstArg, 'secondArg') — capture second arg
    const pattern = /addJournal\([^,]+,\s*'([^']+)'\s*\)/g;
    let m;
    const violations = [];
    while ((m = pattern.exec(src)) !== null) {
      if (!VALID.has(m[1])) {
        violations.push(`second arg '${m[1]}' is not a valid category`);
      }
    }
    expect(violations).toEqual([]);
  });

  it('no addJournal call has a lowercase keyword as its first argument', () => {
    // First arg should be a sentence (starts with uppercase or is a long string with spaces)
    // A lowercase-only single word as first arg = reversed
    const pattern = /addJournal\(\s*'([a-z_]+)'\s*,/g;
    let m;
    const violations = [];
    while ((m = pattern.exec(src)) !== null) {
      violations.push(`addJournal('${m[1]}', ...) — lowercase keyword as first arg`);
    }
    expect(violations).toEqual([]);
  });
});
