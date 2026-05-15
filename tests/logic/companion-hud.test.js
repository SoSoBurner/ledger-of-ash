'use strict';
const { createGameContext, resetG } = require('../setup');

let ctx;
beforeAll(() => { ctx = createGameContext(); });
beforeEach(() => { resetG(ctx.G); });

describe('buildCompanionHudHTML', () => {
  test('returns empty string when no companions', () => {
    expect(ctx.buildCompanionHudHTML([])).toBe('');
    expect(ctx.buildCompanionHudHTML(null)).toBe('');
  });

  test('renders companion id when no COMPANION_DEFS entry', () => {
    const html = ctx.buildCompanionHudHTML([{ id: 'mystery_companion' }]);
    expect(html).toContain('MYSTERY_COMPANION');
  });

  test('truncates passive trait at 60 chars', () => {
    ctx.window.COMPANION_DEFS = {
      vorath: { name: 'Vorath Gelden', passive: 'A'.repeat(80) }
    };
    const html = ctx.buildCompanionHudHTML([{ id: 'vorath' }]);
    expect(html).toContain('VORATH GELDEN');
    expect(html).toContain('\u2026');
    // Should not contain more than 60 A's in the passive block
    const passiveMatch = html.match(/hud-companion-passive">(A+)/);
    expect(passiveMatch && passiveMatch[1].length).toBe(60);
  });

  test('renders multiple companions', () => {
    ctx.window.COMPANION_DEFS = {
      vorath: { name: 'Vorath Gelden', passive: 'Combat support.' },
      mira:   { name: 'Mira Calden',   passive: 'Lore specialist.' }
    };
    const html = ctx.buildCompanionHudHTML([{ id: 'vorath' }, { id: 'mira' }]);
    expect(html).toContain('VORATH GELDEN');
    expect(html).toContain('MIRA CALDEN');
  });

  test('no passive — only name rendered', () => {
    ctx.window.COMPANION_DEFS = { silent: { name: 'Silent One', passive: '' } };
    const html = ctx.buildCompanionHudHTML([{ id: 'silent' }]);
    expect(html).toContain('SILENT ONE');
    expect(html).not.toContain('hud-companion-passive');
  });
});
