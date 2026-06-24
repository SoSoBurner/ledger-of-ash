const fs = require('fs');
const path = require('path');

describe('Supply tier decay (Stream B)', () => {
  let src;
  beforeAll(() => {
    src = fs.readFileSync(
      path.join(__dirname, '../../ledger-of-ash.html'),
      'utf8'
    );
  });

  describe('SUPPLY_TIER_ORDER constant', () => {
    it('declares the 5-tier order with starving first and plentiful last', () => {
      // Match the exact declaration. starving is the floor (idx 0); plentiful is the ceiling (idx 4).
      expect(
        /var SUPPLY_TIER_ORDER\s*=\s*\[\s*['"]starving['"]\s*,\s*['"]scarce['"]\s*,\s*['"]light['"]\s*,\s*['"]medium['"]\s*,\s*['"]plentiful['"]\s*\]/.test(src)
      ).toBe(true);
    });
  });

  describe('degradeSupplyTier helper', () => {
    function degradeBlock() {
      const start = src.indexOf('function degradeSupplyTier()');
      expect(start).toBeGreaterThan(-1);
      // Slice until the next top-level function — enough to capture the body.
      const sliceEnd = src.indexOf('\nfunction ', start + 1);
      return src.slice(start, sliceEnd > -1 ? sliceEnd : start + 800);
    }

    it('is defined', () => {
      expect(/function degradeSupplyTier\(\)\s*\{/.test(src)).toBe(true);
    });

    it('uses indexOf to find current tier and decrements by 1', () => {
      const block = degradeBlock();
      expect(/SUPPLY_TIER_ORDER\.indexOf\(G\.supplyTier\)/.test(block)).toBe(true);
      expect(/SUPPLY_TIER_ORDER\[\s*idx\s*-\s*1\s*\]/.test(block)).toBe(true);
    });

    it('floors at index 0 (does not decrement past starving)', () => {
      const block = degradeBlock();
      // The decrement must be guarded by `idx > 0` (or equivalent) so it never goes negative.
      expect(/if\s*\(\s*idx\s*>\s*0\s*\)/.test(block)).toBe(true);
    });
  });

  describe('advanceTime decay hook', () => {
    function advanceTimeBlock() {
      const start = src.indexOf('function advanceTime(ticks)');
      expect(start).toBeGreaterThan(-1);
      const sliceEnd = src.indexOf('\nfunction ', start + 1);
      return src.slice(start, sliceEnd > -1 ? sliceEnd : start + 4000);
    }

    it('contains a `G.dayCount % 3 === 0` check that calls degradeSupplyTier', () => {
      const block = advanceTimeBlock();
      // The decay fires every 3 days. The check + call may be on adjacent lines.
      expect(/G\.dayCount\s*%\s*3\s*===\s*0/.test(block)).toBe(true);
      expect(/degradeSupplyTier\s*\(\s*\)/.test(block)).toBe(true);
      // And the two must appear within ~250 chars of each other (same conditional block).
      const dayMatch = block.match(/G\.dayCount\s*%\s*3\s*===\s*0[\s\S]{0,400}degradeSupplyTier\s*\(\s*\)/);
      expect(dayMatch).not.toBeNull();
    });

    it('contains a starving-tier +1 fatigue branch', () => {
      const block = advanceTimeBlock();
      // Must reference 'starving' and call addFatigue(1) in the same neighborhood.
      const starvingMatch = block.match(/G\.supplyTier\s*===\s*['"]starving['"][\s\S]{0,200}addFatigue\(1\)/);
      expect(starvingMatch).not.toBeNull();
    });
  });

  describe('Rest healing — starving blocks HP regen', () => {
    it('rest-camp action zeroes healed when supplyTier is starving', () => {
      // Locate the rest healing block in campAction('rest').
      const campRestStart = src.indexOf("if (type === 'rest')");
      expect(campRestStart).toBeGreaterThan(-1);
      const sliceEnd = src.indexOf("} else if (type ===", campRestStart);
      const block = src.slice(campRestStart, sliceEnd > -1 ? sliceEnd : campRestStart + 3000);
      // Starving must zero healed (or otherwise skip the HP application).
      expect(/G\.supplyTier\s*===\s*['"]starving['"]/.test(block)).toBe(true);
      expect(/healed\s*=\s*0/.test(block)).toBe(true);
    });
  });

  describe('Complication dodge — only medium/plentiful', () => {
    it('still uses only medium/plentiful as the dodge gate (no penalty added for scarce/starving)', () => {
      // The dodge gate at districtTransition must keep its existing behavior — losing the bonus
      // IS the penalty for scarce/starving (we don't add an explicit complication-rate increase).
      const dodgeMatch = src.match(/G\.supplyTier\s*===\s*['"]medium['"]\s*\|\|\s*G\.supplyTier\s*===\s*['"]plentiful['"]/);
      expect(dodgeMatch).not.toBeNull();
    });
  });

  describe('Supply tier default reconcile', () => {
    it('no remaining reference to the deprecated supplyTier:"standard" default', () => {
      // The old getDefaultG() default was supplyTier:'standard' which is NOT a member of SUPPLY_TIER_ORDER.
      // After reconcile, no such literal should exist anywhere in the engine.
      expect(/supplyTier\s*:\s*['"]standard['"]/.test(src)).toBe(false);
    });

    it('every supplyTier default uses a member of SUPPLY_TIER_ORDER', () => {
      // Sweep all `supplyTier:` property-literal initializations and ensure every value is a valid tier.
      const VALID = new Set(['starving', 'scarce', 'light', 'medium', 'plentiful']);
      const matches = [...src.matchAll(/supplyTier\s*:\s*['"](\w+)['"]/g)];
      expect(matches.length).toBeGreaterThanOrEqual(2); // at least: top-level G defaults + getDefaultG
      for (const m of matches) {
        expect(VALID.has(m[1])).toBe(true);
      }
    });
  });

  describe('Camp banner — NOT in HUD', () => {
    function showCampBlock() {
      const start = src.indexOf('function showCamp()');
      expect(start).toBeGreaterThan(-1);
      const sliceEnd = src.indexOf('\nfunction ', start + 1);
      return src.slice(start, sliceEnd > -1 ? sliceEnd : start + 4000);
    }

    it('showCamp references G.supplyTier (banner reads tier state)', () => {
      const block = showCampBlock();
      expect(/G\.supplyTier/.test(block)).toBe(true);
    });

    it('camp banner uses the camp-supply-banner class (not a .hud-* class)', () => {
      const block = showCampBlock();
      expect(/camp-supply-banner/.test(block)).toBe(true);
      // Critical: the banner code path must NOT touch HUD selectors.
      expect(/#hud\b/.test(block)).toBe(false);
      expect(/\.hud-/.test(block)).toBe(false);
      expect(/hud-stats/.test(block)).toBe(false);
    });

    it('all five tier strings appear in the banner code', () => {
      const block = showCampBlock();
      // Tier message strings are the player-facing surface for decay status.
      expect(/Supplies plentiful/.test(block)).toBe(true);
      expect(/Supplies steady/.test(block)).toBe(true);
      expect(/Supplies light/.test(block)).toBe(true);
      expect(/Supplies scarce/.test(block)).toBe(true);
      expect(/Starving/.test(block)).toBe(true);
    });
  });
});
