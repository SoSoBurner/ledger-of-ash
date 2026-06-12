'use strict';
// Contract tests for the combat ability-effect dispatcher (ABILITY_DISPATCH)
// in resolveCombatAction(action='ability', abilityId).
//
// Determinism: ability success requires d20 + skill >= 10. We set the relevant
// G.skills value to 10 so even a roll of 1 succeeds (1 + 10 = 11). We assert
// observable state only (G.hp, CS fields, enemy hp) — never spies (vm gotcha:
// function declarations hoist into the vm context and cannot be stubbed).

const { createGameContext } = require('../setup');

jest.setTimeout(180000);

/**
 * Build a context with an active combat session against a neutralized enemy.
 * @param {string} archetypeId — must exist in ARCHETYPE_COMBAT_ABILITIES
 * @param {Object} skills — partial G.skills overrides (e.g. {charm: 10})
 * @param {Object} [gOverrides] — extra G overrides (hp, maxHp, ...)
 */
function makeCombatCtx(archetypeId, skills, gOverrides) {
  const ctx = createGameContext(Object.assign({ hp: 50, maxHp: 100, level: 3 }, gOverrides || {}));
  expect(typeof ctx.startCombat).toBe('function');
  expect(typeof ctx.resolveCombatAction).toBe('function');
  expect(typeof ctx.getCS).toBe('function');

  ctx.G.archetype = { id: archetypeId, name: archetypeId };
  ctx.G.skills = Object.assign(
    { might: 0, vigor: 0, charm: 0, wits: 0, finesse: 0, spirit: 0, craft: 0 },
    skills || {}
  );
  ctx.G.unlockedCombatAbilities = ctx.G.unlockedCombatAbilities || [];
  ctx.G.stage = 'Stage I'; // avoid Stage II 35% group-combat randomness

  ctx.startCombat('road_bandit', {});
  const CS = ctx.getCS();
  expect(CS).toBeTruthy();
  // Neutralize the enemy so tests are deterministic:
  // huge hp (no victory mid-test), attack 0 (no counter damage unless we raise it),
  // defense 50 (player basic attacks always miss), fleeThreshold -1 (never flees).
  CS.enemy.hp = 1000;
  CS.enemy.maxHp = 1000;
  CS.enemy.attack = 0;
  CS.enemy.defense = 50;
  CS.enemy.fleeThreshold = -1;
  return ctx;
}

// ── Healing abilities ────────────────────────────────────────────────────────

describe('ABILITY_DISPATCH — healing', () => {
  test('lay_on_hands heals 1d8+charm (range 1+charm .. 8+charm)', () => {
    const ctx = makeCombatCtx('paladin', { charm: 10 });
    const G = ctx.G;
    for (let i = 0; i < 12; i++) {
      G.hp = 1;
      ctx.resolveCombatAction('ability', 'lay_on_hands');
      const healed = G.hp - 1;
      expect(healed).toBeGreaterThanOrEqual(1 + 10); // 1d8 min 1 + charm 10
      expect(healed).toBeLessThanOrEqual(8 + 10);    // 1d8 max 8 + charm 10
    }
  });

  test('lay_on_hands never heals past G.maxHp', () => {
    const ctx = makeCombatCtx('paladin', { charm: 10 });
    ctx.G.hp = ctx.G.maxHp - 1;
    ctx.resolveCombatAction('ability', 'lay_on_hands');
    expect(ctx.G.hp).toBe(ctx.G.maxHp);
  });

  test('communal_aid heals exactly 4', () => {
    const ctx = makeCombatCtx('priest', { charm: 10 });
    ctx.G.hp = 10;
    ctx.resolveCombatAction('ability', 'communal_aid');
    expect(ctx.G.hp).toBe(14);
  });

  test('emergency_repair heals exactly 4', () => {
    const ctx = makeCombatCtx('artificer', { craft: 10 });
    ctx.G.hp = 10;
    ctx.resolveCombatAction('ability', 'emergency_repair');
    expect(ctx.G.hp).toBe(14);
  });

  test('field_triage heals 1d8+2 (range 3..10)', () => {
    const ctx = makeCombatCtx('healer', { wits: 10 });
    const G = ctx.G;
    for (let i = 0; i < 12; i++) {
      G.hp = 1;
      ctx.resolveCombatAction('ability', 'field_triage');
      const healed = G.hp - 1;
      expect(healed).toBeGreaterThanOrEqual(3);
      expect(healed).toBeLessThanOrEqual(10);
    }
  });
});

// ── Smite ────────────────────────────────────────────────────────────────────

describe('ABILITY_DISPATCH — smite', () => {
  test('smite costs 3 HP and deals at least 5 enemy damage', () => {
    const ctx = makeCombatCtx('paladin', { might: 10 });
    const CS = ctx.getCS();
    ctx.G.hp = 20;
    const enemyBefore = CS.enemy.hp;
    ctx.resolveCombatAction('ability', 'smite');
    expect(ctx.G.hp).toBe(17);
    expect(enemyBefore - CS.enemy.hp).toBeGreaterThanOrEqual(5);
  });

  test('smite HP cost floors at 1 — never drops the player to 0', () => {
    const ctx = makeCombatCtx('paladin', { might: 10 });
    ctx.G.hp = 2;
    ctx.resolveCombatAction('ability', 'smite');
    expect(ctx.G.hp).toBe(1);
    expect(ctx.G.dead).toBe(false);
  });
});

// ── Buff / debuff CS fields ──────────────────────────────────────────────────

describe('ABILITY_DISPATCH — buffs and debuffs', () => {
  test('divine_ward increases CS.playerDefBonusThisRound by 3', () => {
    const ctx = makeCombatCtx('paladin', { wits: 10 });
    const CS = ctx.getCS();
    // divine_ward sets no duration, so the same call's round-end pass would
    // reset the buff to 0 before we can observe it. Pre-set a duration so the
    // round end decrements instead of resetting — the +3 itself stays visible.
    CS.playerDefBonusDuration = 5;
    ctx.resolveCombatAction('ability', 'divine_ward');
    expect(CS.playerDefBonusThisRound).toBe(3);
    expect(CS.playerDefBonusDuration).toBe(4);
  });

  test('wd_fortify grants +3 defense and a 2-round duration', () => {
    const ctx = makeCombatCtx('warden', { vigor: 10 });
    const CS = ctx.getCS();
    ctx.resolveCombatAction('ability', 'wd_fortify');
    expect(CS.playerDefBonusThisRound).toBe(3);
    // Contract sets duration to 2; the same call's round-end pass may already
    // have decremented it once — accept 2 (pre-decrement) or 1 (post-decrement).
    expect([1, 2]).toContain(CS.playerDefBonusDuration);
  });

  test('oath_strike increases CS.nextAttackBonus by 4', () => {
    const ctx = makeCombatCtx('knight', { might: 10 });
    const CS = ctx.getCS();
    CS.nextAttackBonus = 0;
    ctx.resolveCombatAction('ability', 'oath_strike');
    expect(CS.nextAttackBonus).toBe(4);
  });

  test('drain_will decreases CS.enemyDefMod by 2', () => {
    const ctx = makeCombatCtx('necromancer', { wits: 10 });
    const CS = ctx.getCS();
    CS.enemyDefMod = 0;
    ctx.resolveCombatAction('ability', 'drain_will');
    expect(CS.enemyDefMod).toBe(-2);
  });

  test('blessing increases CS.nextRollBonus by 2', () => {
    const ctx = makeCombatCtx('cleric', { charm: 10 });
    const CS = ctx.getCS();
    ctx.resolveCombatAction('ability', 'blessing');
    expect(CS.nextRollBonus).toBe(2);
  });
});

// ── Defense buff vs enemy counter damage ────────────────────────────────────

describe('playerDefBonusThisRound — enemy counter-damage reduction', () => {
  // might=0, vigor=0, enemy.attack=50 → counter always hits
  // (eRoll + 50 >= 0 + 0 + 8) and raw damage is 47..50.
  function counterCtx() {
    const ctx = makeCombatCtx('warrior', { might: 0, vigor: 0 }, { hp: 200, maxHp: 200 });
    const CS = ctx.getCS();
    CS.enemy.attack = 50;
    return ctx;
  }

  test('huge defense buff (99) reduces counter damage to 0', () => {
    const ctx = counterCtx();
    ctx.getCS().playerDefBonusThisRound = 99;
    ctx.resolveCombatAction('attack');
    expect(ctx.G.hp).toBe(200); // damage clamped to >= 0, so no wound applied
  });

  test('no defense buff (0) — counter damage lands', () => {
    const ctx = counterCtx();
    ctx.getCS().playerDefBonusThisRound = 0;
    ctx.resolveCombatAction('attack');
    expect(ctx.G.hp).toBeLessThan(200);
  });
});

// ── Round-end buff lifecycle ─────────────────────────────────────────────────

describe('round end — playerDefBonus duration handling', () => {
  // enemy.attack stays 0 from makeCombatCtx, so 'defend' resolves a full round
  // with zero incoming damage — a clean way to exercise the round-end pass.
  test('duration 0: playerDefBonusThisRound resets to 0 at round end', () => {
    const ctx = makeCombatCtx('warrior', { vigor: 10 });
    const CS = ctx.getCS();
    CS.playerDefBonusThisRound = 5;
    CS.playerDefBonusDuration = 0;
    ctx.resolveCombatAction('defend');
    expect(CS.playerDefBonusThisRound).toBe(0);
  });

  test('duration > 0: decrements and the buff survives the round', () => {
    const ctx = makeCombatCtx('warrior', { vigor: 10 });
    const CS = ctx.getCS();
    CS.playerDefBonusThisRound = 5;
    CS.playerDefBonusDuration = 2;
    ctx.resolveCombatAction('defend');
    expect(CS.playerDefBonusThisRound).toBe(5);
    expect(CS.playerDefBonusDuration).toBe(1);
  });
});

// ── Generic fallback ─────────────────────────────────────────────────────────

describe('ABILITY_DISPATCH — unmapped id fallback', () => {
  test('id not in dispatch table falls back to generic damage (enemy hp decreases)', () => {
    const ctx = makeCombatCtx('ranger', { finesse: 10 });
    const CS = ctx.getCS();
    const enemyBefore = CS.enemy.hp;
    // 'withdraw' (ranger, stealth) is a narrative ability with no ABILITY_DISPATCH entry.
    ctx.resolveCombatAction('ability', 'withdraw');
    expect(CS.enemy.hp).toBeLessThan(enemyBefore);
    expect(ctx.G.hp).toBeGreaterThan(0);
  });
});
