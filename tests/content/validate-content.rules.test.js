'use strict';
const { extractResultStrings, checkResultWordCount, extractRumorTexts, checkRumorSource, checkNpcFlagTiming, checkWorldClockTransparency } = require('./validate-content');

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

describe('extractRumorTexts (A4)', () => {
  test('extracts single-quote rumor from addJournal call', () => {
    const src = `function fn() { addJournal('Word is the shipment moved at night.', 'rumor'); }`;
    expect(extractRumorTexts(src)).toContain('Word is the shipment moved at night.');
  });

  test('extracts double-quote rumor text', () => {
    const src = `function fn() { addJournal("A factor at the docks said the manifest was wrong.", "rumor"); }`;
    expect(extractRumorTexts(src)).toContain('A factor at the docks said the manifest was wrong.');
  });

  test('ignores non-rumor addJournal calls', () => {
    const src = `function fn() { addJournal('You found the package.', 'evidence'); }`;
    expect(extractRumorTexts(src)).toHaveLength(0);
  });
});

describe('checkRumorSource (A4)', () => {
  test('PASS: rumor names a proper noun (NPC name)', () => {
    expect(checkRumorSource('Elior Cadrin said the records were moved last week.')).toBeNull();
  });

  test('PASS: rumor names a social role', () => {
    expect(checkRumorSource('A factor at the south dock said the cargo was rerouted.')).toBeNull();
  });

  test('PASS: rumor names a location word', () => {
    expect(checkRumorSource('Overheard at the market — the guild levy doubled this quarter.')).toBeNull();
  });

  test('PASS: rumor uses location preposition pattern', () => {
    expect(checkRumorSource('Someone from the inn near the gate mentioned the warden was asking around.')).toBeNull();
  });

  test('FAIL: rumor has no source, role, or location', () => {
    expect(checkRumorSource('Word is the shipment was rerouted.')).toMatchObject({ level: 'fail' });
  });
});

describe('checkNpcFlagTiming (A5)', () => {
  test('FAIL: met flag set after addNarration that names the NPC', () => {
    const src = `function fn() {
      addNarration('Meeting', 'Elior sets the ledger down without looking at you.');
      G.flags.met_elior = true;
    }`;
    const results = checkNpcFlagTiming(src);
    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({ level: 'fail' });
  });

  test('PASS: met flag set before addNarration', () => {
    const src = `function fn() {
      G.flags.met_elior = true;
      addNarration('Meeting', 'Elior sets the ledger down without looking at you.');
    }`;
    expect(checkNpcFlagTiming(src)).toHaveLength(0);
  });

  test('PASS: no met flags at all', () => {
    const src = `function fn() { addNarration('Title', 'The clerk looks up briefly.'); }`;
    expect(checkNpcFlagTiming(src)).toHaveLength(0);
  });

  test('PASS: met flag with name not present in narration', () => {
    const src = `function fn() {
      addNarration('Scene', 'The clerk looks up briefly.');
      G.flags.met_elior = true;
    }`;
    expect(checkNpcFlagTiming(src)).toHaveLength(0);
  });
});

describe('checkWorldClockTransparency (A6)', () => {
  test('WARN: worldClock incremented with ++ and no signal word', () => {
    const src = `function fn() {
      G.worldClocks.pressure++;
      addNarration('Gate', 'The gate clerk marks your name in the log.');
    }`;
    expect(checkWorldClockTransparency(src)).toMatchObject({ level: 'warn' });
  });

  test('WARN: worldClock incremented with += and no signal word', () => {
    const src = `function fn() { G.worldClocks.watchfulness += 2; addNarration('', 'You leave quickly.'); }`;
    expect(checkWorldClockTransparency(src)).toMatchObject({ level: 'warn' });
  });

  test('PASS: worldClock incremented and "harder" present', () => {
    const src = `function fn() {
      G.worldClocks.pressure++;
      addNarration('Gate', 'The next time through this checkpoint will be harder — he has your face now.');
    }`;
    expect(checkWorldClockTransparency(src)).toBeNull();
  });

  test('PASS: worldClock incremented and "noticed" present', () => {
    const src = `function fn() { G.worldClocks.watchfulness++; addNarration('', 'You were noticed leaving.'); }`;
    expect(checkWorldClockTransparency(src)).toBeNull();
  });

  test('PASS: no worldClock increment at all', () => {
    const src = `function fn() { addNarration('', 'The clerk nods and steps aside.'); }`;
    expect(checkWorldClockTransparency(src)).toBeNull();
  });
});
