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

const { checkResultOpener } = require('./validate-content');

describe('checkResultOpener (A3)', () => {
  test('FAIL: result opens with "Confirms"', () => {
    expect(checkResultOpener('Confirms the backlog exists and points you toward the third shelf.')).toMatchObject({ level: 'fail' });
  });

  test('FAIL: result opens with "You learn that"', () => {
    expect(checkResultOpener('You learn that the shipment was rerouted three days ago.')).toMatchObject({ level: 'fail' });
  });

  test('FAIL: result opens with "It turns out"', () => {
    expect(checkResultOpener('It turns out the warden was already watching the gate.')).toMatchObject({ level: 'fail' });
  });

  test('PASS: result opens with observable action', () => {
    expect(checkResultOpener('The clerk sets the ledger down and does not look at you.')).toBeNull();
  });

  test('PASS: result opens with NPC dialogue', () => {
    expect(checkResultOpener('"You were not expected," she says.')).toBeNull();
  });
});

describe('checkResultWordCount (A2 — warn/fail range)', () => {
  test('WARN: result 30-59 words', () => {
    const text = Array(45).fill('word').join(' ');
    expect(checkResultWordCount(text)).toMatchObject({ level: 'warn' });
  });

  test('FAIL: result over 120 words', () => {
    const text = Array(125).fill('word').join(' ');
    expect(checkResultWordCount(text)).toMatchObject({ level: 'fail' });
  });

  test('PASS: result at exactly 60 words', () => {
    const text = Array(60).fill('word').join(' ');
    expect(checkResultWordCount(text)).toBeNull();
  });
});

describe('checkResultWordCount (A1)', () => {
  test('FAIL: result under 30 words', () => {
    const result = checkResultWordCount('Short result with only a few words here now.');
    expect(result).toMatchObject({ level: 'fail' });
  });

  test('WARN: result at exactly 30 words (passes A1, triggers A2)', () => {
    const text = Array(30).fill('word').join(' ');
    expect(checkResultWordCount(text)).toMatchObject({ level: 'warn' });
  });

  test('PASS: result in the 60-90 word target range', () => {
    const text = Array(75).fill('word').join(' ');
    expect(checkResultWordCount(text)).toBeNull();
  });
});
