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

describe('activateAbility full dispatch table', () => {
  const fs = require('fs');
  const src = fs.readFileSync('ledger-of-ash.html', 'utf8');

  it('ABILITY_EFFECTS table is defined inside activateAbility', () => {
    expect(src).toMatch(/var ABILITY_EFFECTS\s*=/);
  });
  it('covers roll_bonus abilities', () => {
    expect(src).toMatch(/ar_called_shot[\s\S]{0,60}roll_bonus/);
    expect(src).toMatch(/wa_rally[\s\S]{0,60}roll_bonus/);
    expect(src).toMatch(/be_last_stand[\s\S]{0,60}roll_bonus/);
  });
  it('covers dc_reduce abilities', () => {
    expect(src).toMatch(/pa_mandate[\s\S]{0,60}dc_reduce/);
    expect(src).toMatch(/cl_sanctuary[\s\S]{0,60}dc_reduce/);
    expect(src).toMatch(/bd_captivate[\s\S]{0,60}dc_reduce/);
  });
  it('covers heal abilities', () => {
    expect(src).toMatch(/ra_wilderness_craft[\s\S]{0,60}heal/);
    expect(src).toMatch(/cl_restoration[\s\S]{0,60}heal/);
    expect(src).toMatch(/hl_emergency_care[\s\S]{0,60}heal/);
  });
  it('_pendingDcReduce is consumed in diff calculation', () => {
    expect(src).toMatch(/_dcReduce[\s\S]{0,200}const diff\s*=/);
  });
  it('_pendingDcReduce is zeroed after consumption', () => {
    expect(src).toMatch(/G\._pendingDcReduce\s*=\s*0/);
  });
});
