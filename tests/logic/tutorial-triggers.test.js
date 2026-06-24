const fs = require('fs');
const path = require('path');

describe('Tutorial triggers (Stream C) — 6 new topics wired into engine', () => {
  let src;
  beforeAll(() => {
    src = fs.readFileSync(
      path.join(__dirname, '../../ledger-of-ash.html'),
      'utf8'
    );
  });

  // ── TUTORIAL_FLAGS object ───────────────────────────────────
  describe('TUTORIAL_FLAGS object', () => {
    function flagsBlock() {
      const start = src.indexOf('const TUTORIAL_FLAGS = {');
      expect(start).toBeGreaterThan(-1);
      const end = src.indexOf('};', start);
      expect(end).toBeGreaterThan(start);
      return src.slice(start, end + 2);
    }

    const NEW_KEYS = [
      'first_supply_tier',
      'first_save_load',
      'first_travel_mode',
      'first_combat_retreat',
      'first_ability_activate',
      'first_camp_detail',
    ];

    NEW_KEYS.forEach(function(key) {
      it('contains ' + key + ': false', function() {
        const block = flagsBlock();
        const re = new RegExp(key + '\\s*:\\s*false');
        expect(re.test(block)).toBe(true);
      });
    });

    it('preserves the 10 pre-existing tutorial flag keys (regression guard)', function() {
      const block = flagsBlock();
      const OLD_KEYS = [
        'first_choice',
        'first_combat',
        'first_levelup',
        'first_camp',
        'first_journal',
        'first_npc',
        'first_shop',
        'first_map',
        'first_watchfulness',
        'first_pressure',
      ];
      OLD_KEYS.forEach(function(k) {
        expect(block.indexOf(k + ':')).toBeGreaterThan(-1);
      });
    });
  });

  // ── maybeShowTutorial msgs entries ──────────────────────────
  describe('maybeShowTutorial msgs entries', () => {
    function msgsBlock() {
      const fnStart = src.indexOf('function maybeShowTutorial(event)');
      expect(fnStart).toBeGreaterThan(-1);
      const msgsStart = src.indexOf('const msgs = {', fnStart);
      expect(msgsStart).toBeGreaterThan(-1);
      // Closing of the msgs object literal — the next `};` after msgsStart.
      const msgsEnd = src.indexOf('};', msgsStart);
      expect(msgsEnd).toBeGreaterThan(msgsStart);
      return src.slice(msgsStart, msgsEnd + 2);
    }

    const NEW_EVENTS = [
      'first_supply_tier',
      'first_save_load',
      'first_travel_mode',
      'first_combat_retreat',
      'first_ability_activate',
      'first_camp_detail',
    ];

    NEW_EVENTS.forEach(function(event) {
      it('msgs contains an entry for ' + event, function() {
        const block = msgsBlock();
        // Match `eventName:` as a property key (with the trailing colon, so it's a key not a value).
        const re = new RegExp(event + '\\s*:\\s*[\'"]');
        expect(re.test(block)).toBe(true);
      });
    });
  });

  // ── 6 trigger call sites ────────────────────────────────────
  describe('Trigger call sites — each new tutorial fires from the natural first-event point', () => {
    it('first_supply_tier fires inside degradeSupplyTier() body', function() {
      const fnStart = src.indexOf('function degradeSupplyTier()');
      expect(fnStart).toBeGreaterThan(-1);
      const fnEnd = src.indexOf('\nfunction ', fnStart + 1);
      const block = src.slice(fnStart, fnEnd > -1 ? fnEnd : fnStart + 800);
      expect(block.indexOf("maybeShowTutorial('first_supply_tier')")).toBeGreaterThan(-1);
    });

    it('first_save_load fires inside showSaveModal()', function() {
      const fnStart = src.indexOf('function showSaveModal(mode)');
      expect(fnStart).toBeGreaterThan(-1);
      const fnEnd = src.indexOf('\nfunction ', fnStart + 1);
      const block = src.slice(fnStart, fnEnd > -1 ? fnEnd : fnStart + 4000);
      expect(block.indexOf("maybeShowTutorial('first_save_load')")).toBeGreaterThan(-1);
    });

    it('first_travel_mode fires near the travel-mode choice render', function() {
      // The travel-mode choice render lives in a function above startTravel().
      // We search for the "How will you travel" narration string and assert the
      // tutorial call sits within the prior ~400 chars (same render path).
      const narrIdx = src.indexOf('How will you travel from');
      expect(narrIdx).toBeGreaterThan(-1);
      const window = src.slice(Math.max(0, narrIdx - 600), narrIdx + 200);
      expect(window.indexOf("maybeShowTutorial('first_travel_mode')")).toBeGreaterThan(-1);
    });

    it('first_combat_retreat fires next to the Flee button render', function() {
      // The Flee button is built inside renderCombatRound() with data-action="flee".
      const fleeIdx = src.indexOf('data-action="flee"');
      expect(fleeIdx).toBeGreaterThan(-1);
      const window = src.slice(Math.max(0, fleeIdx - 400), fleeIdx + 200);
      expect(window.indexOf("maybeShowTutorial('first_combat_retreat')")).toBeGreaterThan(-1);
    });

    it('first_ability_activate fires inside activateAbilityFromSheet()', function() {
      const fnStart = src.indexOf('function activateAbilityFromSheet(abilityId)');
      expect(fnStart).toBeGreaterThan(-1);
      const fnEnd = src.indexOf('\nfunction ', fnStart + 1);
      const block = src.slice(fnStart, fnEnd > -1 ? fnEnd : fnStart + 800);
      expect(block.indexOf("maybeShowTutorial('first_ability_activate')")).toBeGreaterThan(-1);
    });

    it('first_camp_detail fires inside campAction() gated to detail types', function() {
      const fnStart = src.indexOf('function campAction(type)');
      expect(fnStart).toBeGreaterThan(-1);
      const fnEnd = src.indexOf('\nfunction ', fnStart + 1);
      const block = src.slice(fnStart, fnEnd > -1 ? fnEnd : fnStart + 8000);
      // The first_camp_detail call must exist...
      expect(block.indexOf("maybeShowTutorial('first_camp_detail')")).toBeGreaterThan(-1);
      // ...and be guarded by an inclusion check covering the 4 detail-type camp actions.
      expect(/\[\s*['"]post_watches['"][\s\S]{0,120}['"]lay_low['"][\s\S]{0,120}['"]campout['"][\s\S]{0,120}['"]sleep['"][\s\S]{0,80}\]\s*\.includes\s*\(\s*type\s*\)/.test(block)).toBe(true);
    });
  });

  // ── Regression guard: pre-existing tutorial triggers still present ──
  describe('Regression guard — pre-existing triggers preserved', () => {
    it('all 8 pre-existing maybeShowTutorial call sites are still present', function() {
      const PRE_EXISTING = [
        'first_choice',
        'first_levelup',
        'first_camp',
        'first_journal',
        'first_npc',
        'first_map',
        'first_shop',
        'first_combat',
      ];
      PRE_EXISTING.forEach(function(ev) {
        const re = new RegExp("maybeShowTutorial\\(['\"]" + ev + "['\"]\\)");
        expect(re.test(src)).toBe(true);
      });
    });

    it('total maybeShowTutorial(...) call count is at least 14 (8 prior + 6 new)', function() {
      // Excludes the function definition line itself.
      const calls = [...src.matchAll(/maybeShowTutorial\(\s*['"]/g)];
      expect(calls.length).toBeGreaterThanOrEqual(14);
    });
  });
});
