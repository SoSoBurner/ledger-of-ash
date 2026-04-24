'use strict';
const { createGameContext, resetG } = require('../setup');

const VALID_CATEGORIES = ['evidence', 'intelligence', 'rumor', 'discovery', 'contact_made', 'complication'];

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => {
  resetG(ctx.G);
  ctx.G.journal = [];
  ctx.G.journalRecords = [];
});

// addJournal(text, category) — text first, category second.
// G.journal is a string array (recent text). Full records are in G.journalRecords.

describe('addJournal(text, category)', () => {
  test('adds entry to G.journalRecords', () => {
    ctx.addJournal('A merchant was found dead.', 'evidence');
    expect(ctx.G.journalRecords.length).toBe(1);
  });

  test('text is stored on the record', () => {
    ctx.addJournal('Rumor about the guild.', 'rumor');
    expect(ctx.G.journalRecords[0].text).toContain('Rumor about the guild');
  });

  test('category is stored on the record', () => {
    ctx.addJournal('Rumor about the guild.', 'rumor');
    expect(ctx.G.journalRecords[0].category).toBe('rumor');
  });

  test('all valid categories are accepted without error', () => {
    VALID_CATEGORIES.forEach((cat, i) => {
      expect(() => ctx.addJournal(`Test entry ${i}.`, cat)).not.toThrow();
    });
    expect(ctx.G.journalRecords.length).toBe(VALID_CATEGORIES.length);
  });

  test('duplicate text updates existing record rather than adding new one', () => {
    ctx.addJournal('Same text.', 'evidence');
    ctx.addJournal('Same text.', 'evidence');
    expect(ctx.G.journalRecords.length).toBe(1);
  });

  test('record has a day timestamp', () => {
    ctx.G.dayCount = 3;
    ctx.addJournal('Timed entry.', 'evidence');
    expect(ctx.G.journalRecords[0].day).toBe(3);
  });

  test('record has an id', () => {
    ctx.addJournal('Entry.', 'discovery');
    expect(ctx.G.journalRecords[0].id).toBeTruthy();
  });
});
