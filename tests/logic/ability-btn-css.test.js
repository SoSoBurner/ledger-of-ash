'use strict';
// Verifies that the three ability-button CSS rules are present in the source HTML.
// These rules are required by the active-ability rendering path (renderCharacterSheet /
// updateHUD) and must not be accidentally removed during style refactors.

const fs   = require('fs');
const path = require('path');

const HTML_PATH = path.join(__dirname, '..', '..', 'ledger-of-ash.html');
const html = fs.readFileSync(HTML_PATH, 'utf8');

describe('ability-btn CSS rules — present in ledger-of-ash.html', () => {
  test('.ability-btn rule is defined', () => {
    // The rule must declare at minimum a border using --accent-gold and a cursor.
    expect(html).toMatch(/\.ability-btn\s*\{[^}]*border[^}]*\}/);
  });

  test('.ability-btn--spent rule is defined', () => {
    // Must reduce opacity and set cursor:not-allowed so spent abilities are visually distinct.
    expect(html).toMatch(/\.ability-btn--spent\s*\{[^}]*opacity[^}]*\}/);
  });

  test('.ability-btn-area rule is defined', () => {
    // Container rule must include a top margin or border separator.
    expect(html).toMatch(/\.ability-btn-area\s*\{[^}]*margin-top[^}]*\}/);
  });

  test('.ability-btn uses --accent-gold for color and border', () => {
    // Enforce color-identity system: ability buttons must use the gold accent token.
    const ruleMatch = html.match(/\.ability-btn\s*\{([^}]*)\}/);
    expect(ruleMatch).not.toBeNull();
    const ruleBody = ruleMatch[1];
    expect(ruleBody).toContain('--accent-gold');
  });

  test('.ability-btn--spent sets cursor:not-allowed', () => {
    const ruleMatch = html.match(/\.ability-btn--spent\s*\{([^}]*)\}/);
    expect(ruleMatch).not.toBeNull();
    expect(ruleMatch[1]).toContain('not-allowed');
  });

  test('.ability-btn-area has a border-top separator', () => {
    const ruleMatch = html.match(/\.ability-btn-area\s*\{([^}]*)\}/);
    expect(ruleMatch).not.toBeNull();
    expect(ruleMatch[1]).toContain('border-top');
  });
});
