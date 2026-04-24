'use strict';
const { extractResultStrings, checkResultWordCount } = require('./validate-content');

describe('extractResultStrings', () => {
  test('extracts single-quote result from addNarration call', () => {
    const src = `function fn() { addNarration('Title', 'The clerk sets the ledger down.'); }`;
    expect(extractResultStrings(src)).toContain('The clerk sets the ledger down.');
  });

  test('extracts double-quote result from addNarration call', () => {
    const src = `function fn() { addNarration("", "She does not look up from the page."); }`;
    expect(extractResultStrings(src)).toContain('She does not look up from the page.');
  });

  test('returns empty array when no addNarration calls', () => {
    const src = `function fn() { G.flags.done = true; }`;
    expect(extractResultStrings(src)).toHaveLength(0);
  });
});

describe('checkResultWordCount (A1)', () => {
  test('FAIL: result under 30 words', () => {
    const result = checkResultWordCount('Short result with only a few words here now.');
    expect(result).toMatchObject({ level: 'fail' });
  });

  test('PASS: result at exactly 30 words', () => {
    const text = Array(30).fill('word').join(' ');
    expect(checkResultWordCount(text)).toBeNull();
  });

  test('PASS: result in the 60-90 word target range', () => {
    const text = Array(75).fill('word').join(' ');
    expect(checkResultWordCount(text)).toBeNull();
  });
});
