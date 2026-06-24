const fs = require('fs');
const path = require('path');

describe('loadGame legacy-code path surfaces failures via showToast', () => {
  let src;
  beforeAll(() => {
    src = fs.readFileSync(
      path.join(__dirname, '../../ledger-of-ash.html'),
      'utf8'
    );
  });

  function legacyBlock() {
    const start = src.indexOf('function loadGame(slotArg, legacyCode)');
    expect(start).toBeGreaterThan(-1);
    const sliceEnd = src.indexOf('function exportSave()', start);
    expect(sliceEnd).toBeGreaterThan(start);
    return src.slice(start, sliceEnd);
  }

  it('"not found" path calls showToast before returning false', () => {
    const block = legacyBlock();
    // The "not found" path is the bare `return false;` after the inner `if (raw) { ... }`
    // It must be preceded by a showToast call (with conditional guard).
    expect(/showToast\(['"]Legacy save not found[^'"]*['"]\);\s*return false;/.test(block)).toBe(true);
  });

  it('"parse error" path (catch) calls showToast before returning false', () => {
    const block = legacyBlock();
    // The catch(e) block must surface a toast — never just `catch(e) { return false; }`.
    expect(/catch\s*\(e\)\s*\{\s*[^}]*showToast\(['"]Legacy save found but could not be read[^'"]*['"]\);[^}]*return false;[^}]*\}/.test(block)).toBe(true);
  });

  it('success path still uses showToast for symmetry', () => {
    const block = legacyBlock();
    expect(/showToast\(['"]Legacy save migrated to Slot 1/.test(block)).toBe(true);
  });

  it('every `return false;` in loadGame has a preceding showToast call', () => {
    const block = legacyBlock();
    // The loadGame function only returns false in the legacy path (the slot path
    // delegates to loadFromSlot). Every `return false;` must be preceded by a
    // showToast within the prior 300 chars so the player is never left guessing.
    const returnFalseMatches = [...block.matchAll(/return false;/g)];
    expect(returnFalseMatches.length).toBeGreaterThan(0);
    for (const m of returnFalseMatches) {
      const before = block.slice(Math.max(0, m.index - 300), m.index);
      expect(before).toMatch(/showToast\(/);
    }
  });
});
