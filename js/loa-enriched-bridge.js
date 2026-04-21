// ═══════════════════════════════════════════════════════
// LOA ENRICHED CHOICE BRIDGE  v2
// Supports Stage I + Stage II enriched choice injection
// Enriched choice files (stage1-5 + stage2 locality files) loaded before this script
// ═══════════════════════════════════════════════════════

(function() {
'use strict';

// ── FUNCTION SHIMS ──────────────────────────────────────────

window.gainXp = function(n, _reason) {
  if (typeof gainXP === 'function') gainXP(n);
};

if (typeof window.advanceTime !== 'function') {
  window.advanceTime = function(days) {
    if (window.G && typeof window.G.dayCount !== 'undefined') window.G.dayCount += (days || 1);
  };
}

// Canonical skill map — normalizes all old and variant skill names to new canonical keys
// New canonical keys: might, finesse, vigor, wits, charm, spirit
const SKILL_NORM = {
  // Old canonical names → new canonical names (backward compat for all enriched files)
  combat: 'might', stealth: 'finesse', survival: 'vigor',
  lore: 'wits', persuasion: 'charm', craft: 'spirit',
  // Variant names → new canonical names
  investigation: 'wits', perception: 'vigor', deception: 'finesse',
  empathy: 'charm', insight: 'wits', awareness: 'vigor',
  arcane: 'wits', arcana: 'wits', repair: 'spirit', labor: 'spirit',
  alchemy: 'spirit', medicine: 'spirit', endurance: 'vigor',
  athletics: 'might', intimidation: 'might', performance: 'charm',
  history: 'wits', nature: 'vigor', religion: 'spirit'
};

window.rollD20 = function(skill, bonus) {
  const normSkill = SKILL_NORM[skill] || skill;
  const roll = Math.floor(Math.random() * 20) + 1;
  const skillVal = (window.G && window.G.skills && window.G.skills[normSkill]) ? window.G.skills[normSkill] : 0;
  const woundFatiguePenalty = (function() {
    if (!window.G) return 0;
    const activeWounds = (window.G.wounds || []).filter(function(w){ return !w.healed; }).length;
    return (activeWounds >= 3 || (window.G.fatigue || 0) >= 5) ? 1 : 0;
  })();
  const penalty = ((window.G && window.G._dcPenalty) || 0) + ((window.G && window.G._alignmentDCPenalty) || 0) + woundFatiguePenalty;
  const total = roll + skillVal + (bonus || 0) - penalty;
  if (window.G) {
    window.G._lastRollWasCrit = (roll === 20);
    window.G._lastRollWasFumble = (roll === 1);
    window.G._lastRollRaw = roll;
    window.G._lastRollSkillVal = skillVal;
    window.G._lastRollTotal = total;
  }
  return { roll, total, isCrit: roll === 20, isFumble: roll === 1 };
};

window.maybeStageAdvance = function() {
  if (typeof checkStageAdvance === 'function') checkStageAdvance();
};

// addJournal arg-order bridge:
// Enriched convention: addJournal(type, text, key)
// LOA convention:      addJournal(text, type, key)
const JOURNAL_TYPES = new Set([
  'investigation','complication','discovery','combat','travel',
  'faction','item','quest','warning','info','field_note','note',
  'alliance','contact','consequence','action','intel','rest','companion'
]);
const _origAddJournal = window.addJournal;
window.addJournal = function(arg1, arg2, arg3) {
  if (JOURNAL_TYPES.has(arg1) && arg2) {
    _origAddJournal(arg2, arg1, arg3);
  } else {
    _origAddJournal(arg1, arg2, arg3);
  }
};

// ── G STATE PATCH ──────────────────────────────────────────

function patchGState() {
  const G = window.G;
  if (!G) return;
  if (!G.worldClocks) G.worldClocks = { pressure: 0, rival: 0, omens: 0, watchfulness: 0, reverence: 0, isolation: 0 };
  if (!G.stageProgress) G.stageProgress = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (!G.telemetry) G.telemetry = { turns: 0, actions: 0 };
  if (typeof G.lastResult === 'undefined') G.lastResult = '';
  if (typeof G.recentOutcomeType === 'undefined') G.recentOutcomeType = '';
  if (!G.discoveries) G.discoveries = [];
  // Stage 2 new fields
  if (typeof G.investigationProgress === 'undefined') G.investigationProgress = 0;
  if (!G.flags) G.flags = {};
  if (typeof G.rivalId === 'undefined') G.rivalId = null;
  if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };
}

function _autoSaveTick() {
  const G = window.G;
  if (!G) return;
  G.choiceCount = (G.choiceCount || 0) + 1;
  if (G.choiceCount % 20 === 0 && typeof saveGame === 'function') {
    saveGame(G._lastSlot || 1);
  }
}

// ── ENRICHED CHOICE POOLS ─────────────────────────────────

// Stage 1 locality pools
const POOL_MAP_S1 = {
  shelkopolis:         'SHELKOPOLIS_STAGE1_ENRICHED_CHOICES',
  soreheim_proper:     'SOREHEIM_PROPER_STAGE1_ENRICHED_CHOICES',
  guildheart_hub:      'GUILDHEART_HUB_STAGE1_ENRICHED_CHOICES',
  sunspire_haven:      'SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES',
  aurora_crown_commune:'AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES',
  ithtananalor:        'ITHTANANALOR_STAGE1_ENRICHED_CHOICES',
  mimolot_academy:     'MIMOLOT_ACADEMY_STAGE1_ENRICHED_CHOICES',
  panim_haven:         'PANIM_HAVEN_STAGE1_ENRICHED_CHOICES',
  fairhaven:           'FAIRHAVEN_STAGE1_ENRICHED_CHOICES',
  shirshal:            'SHIRSHAL_STAGE1_ENRICHED_CHOICES',
  cosmoria:            'COSMORIA_STAGE1_ENRICHED_CHOICES',
  harvest_circle:      'HARVEST_CIRCLE_STAGE1_ENRICHED_CHOICES',
  // 6 new Stage 1 localities
  glasswake_commune:   'GLASSWAKE_COMMUNE_STAGE1_ENRICHED_CHOICES',
  whitebridge_commune: 'WHITEBRIDGE_COMMUNE_STAGE1_ENRICHED_CHOICES',
  craftspire:          'CRAFTSPIRE_STAGE1_ENRICHED_CHOICES',
  unity_square:        'UNITY_SQUARE_STAGE1_ENRICHED_CHOICES',
  ironhold_quarry:     'IRONHOLD_QUARRY_STAGE1_ENRICHED_CHOICES',
  plumes_end_outpost:  'PLUMES_END_OUTPOST_STAGE1_ENRICHED_CHOICES',
  // Canon district pools for Stage 1
  shelkopolis_aurora_heights:       'AURORA_HEIGHTS_STAGE1_ENRICHED_CHOICES',
  shelkopolis_ironspool_ward:       'IRONSPOOL_WARD_STAGE1_ENRICHED_CHOICES',
  shelkopolis_verdant_row:          'VERDANT_ROW_STAGE1_ENRICHED_CHOICES',
  harvest_keep_granary_steps:       'GRANARY_STEPS_STAGE1_ENRICHED_CHOICES',
  ithtananalor_iron_ledger_ward:    'IRON_LEDGER_WARD_STAGE1_ENRICHED_CHOICES',
  panim_haven_reckoning_quarter:    'RECKONING_QUARTER_STAGE1_ENRICHED_CHOICES',
  mimolot_academy_scriptorium_steps:'SCRIPTORIUM_STEPS_STAGE1_ENRICHED_CHOICES',
};

// Travel arc pools (non-Shelk localities → Shelkopolis)
const POOL_MAP_ARC = {
  soreheim_proper:     'SOREHEIM_PROPER_TO_SHELK_ARC',
  sunspire_haven:      'SUNSPIRE_HAVEN_TO_SHELK_ARC',
  harvest_circle:      'HARVEST_CIRCLE_TO_SHELK_ARC',
  panim_haven:         'PANIM_HAVEN_TO_SHELK_ARC',
  aurora_crown_commune:'AURORA_CROWN_TO_SHELK_ARC',
  glasswake_commune:   'GLASSWAKE_TO_SHELK_ARC',
  whitebridge_commune: 'WHITEBRIDGE_TO_SHELK_ARC',
  ithtananalor:        'ITHTANANALOR_TO_SHELK_ARC',
  mimolot_academy:     'MIMOLOT_ACADEMY_TO_SHELK_ARC',
  guildheart_hub:      'GUILDHEART_HUB_TO_SHELK_ARC',
  shirshal:            'SHIRSHAL_TO_SHELK_ARC',
  cosmoria:            'COSMORIA_TO_SHELK_ARC',
};

// Stage 2 locality pools (dedicated per-locality files)
const POOL_MAP_S2 = {
  shelkopolis:         'SHELKOPOLIS_STAGE2_ENRICHED_CHOICES',
  soreheim_proper:     'SOREHEIM_PROPER_STAGE2_ENRICHED_CHOICES',
  guildheart_hub:      'GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES',
  sunspire_haven:      'SUNSPIRE_HAVEN_STAGE2_ENRICHED_CHOICES',
  aurora_crown_commune:'AURORA_CROWN_COMMUNE_STAGE2_ENRICHED_CHOICES',
  ithtananalor:        'ITHTANANALOR_STAGE2_ENRICHED_CHOICES',
  mimolot_academy:     'MIMOLOT_ACADEMY_STAGE2_ENRICHED_CHOICES',
  panim_haven:         'PANIM_HAVEN_STAGE2_ENRICHED_CHOICES',
  fairhaven:           'FAIRHAVEN_STAGE2_ENRICHED_CHOICES',
  shirshal:            'SHIRSHAL_STAGE2_ENRICHED_CHOICES',
  cosmoria:            'COSMORIA_STAGE2_ENRICHED_CHOICES',
  harvest_circle:      'HARVEST_CIRCLE_STAGE2_ENRICHED_CHOICES',
  craftspire:          'CRAFTSPIRE_STAGE2_ENRICHED_CHOICES',
  unity_square:        'UNITY_SQUARE_STAGE2_ENRICHED_CHOICES',
  glasswake_commune:   'GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES',
  ironhold_quarry:     'IRONHOLD_QUARRY_STAGE2_ENRICHED_CHOICES',
  plumes_end_outpost:  'PLUMES_END_OUTPOST_STAGE2_ENRICHED_CHOICES',
  whitebridge_commune: 'WHITEBRIDGE_COMMUNE_STAGE2_ENRICHED_CHOICES',
  // District-specific pools (canon districts)
  shelkopolis_aurora_heights:      'AURORA_HEIGHTS_STAGE2_ENRICHED_CHOICES',
  shelkopolis_ironspool_ward:      'IRONSPOOL_WARD_STAGE2_ENRICHED_CHOICES',
  shelkopolis_verdant_row:         'VERDANT_ROW_STAGE2_ENRICHED_CHOICES',
  harvest_keep_granary_steps:      'GRANARY_STEPS_STAGE2_ENRICHED_CHOICES',
  ithtananalor_iron_ledger_ward:   'IRON_LEDGER_WARD_STAGE2_ENRICHED_CHOICES',
  panim_haven_reckoning_quarter:   'RECKONING_QUARTER_STAGE2_ENRICHED_CHOICES',
  mimolot_academy_scriptorium_steps:'SCRIPTORIUM_STEPS_STAGE2_ENRICHED_CHOICES',
  // Synthetic district type pools (shared across all settlements of same type)
  high_quarter_type:    'HIGH_QUARTER_STAGE2_ENRICHED_CHOICES',
  common_quarter_type:  'COMMON_QUARTER_STAGE2_ENRICHED_CHOICES',
  low_ward_type:        'LOW_WARD_STAGE2_ENRICHED_CHOICES',
  // Nomdara
  nomdara_caravan:      'NOMDARA_STAGE2_CHOICES',
};

function getLocDistrictType(locId) {
  const lm = window.LOCALITY_MATRIX;
  if (!lm || !lm[locId]) return null;
  const entry = lm[locId];
  if (entry.locality_class !== 'district' || !entry.is_synthetic) return null;
  const name = (entry.display_name_raw || '').toLowerCase();
  if (name.includes('high quarter')) return 'high_quarter_type';
  if (name.includes('common quarter')) return 'common_quarter_type';
  if (name.includes('low ward')) return 'low_ward_type';
  return null;
}

function getEnrichedPool(locId, stage) {
  // Nomdara: stage-routed services
  if (locId === 'nomdara_caravan') {
    const G = window.G;
    const gStage = G && G.stage;
    if (gStage && gStage >= 2 && window.NOMDARA_STAGE2_CHOICES) return window.NOMDARA_STAGE2_CHOICES.slice();
    if (window.NOMDARA_STAGE1_CHOICES) return window.NOMDARA_STAGE1_CHOICES.slice();
    return [];
  }
  // Travel arc: inject arc pool for non-Shelk S1 localities when arc trigger conditions met
  if (stage !== 'Stage II') {
    const G = window.G;
    const arcVarName = POOL_MAP_ARC[locId];
    if (arcVarName && window[arcVarName]) {
      const invProg = (G && G.investigationProgress) || 0;
      const level = (G && G.level) || 1;
      if (invProg >= 5 || level >= 6) {
        // Merge arc choices into S1 pool
        const s1VarName = POOL_MAP_S1[locId];
        const base = (s1VarName && window[s1VarName]) ? window[s1VarName].slice() : [];
        return base.concat(window[arcVarName].slice());
      }
    }
  }
  const map = stage === 'Stage II' ? POOL_MAP_S2 : POOL_MAP_S1;
  let varName = map[locId];
  // Stage 1 synthetic district fallback
  if (!varName && stage !== 'Stage II') {
    const distType = getLocDistrictType(locId);
    if (distType) {
      const s1DistMap = {
        high_quarter_type:   'HIGH_QUARTER_STAGE1_ENRICHED_CHOICES',
        common_quarter_type: 'COMMON_QUARTER_STAGE1_ENRICHED_CHOICES',
        low_ward_type:       'LOW_WARD_STAGE1_ENRICHED_CHOICES',
      };
      varName = s1DistMap[distType];
    }
  }
  // Stage 2 synthetic district fallback
  if (!varName && stage === 'Stage II') {
    const distType = getLocDistrictType(locId);
    if (distType) varName = POOL_MAP_S2[distType];
  }
  if (varName && window[varName]) return window[varName].slice();
  // Stage 2 generic fallback
  if (stage === 'Stage II' && window.STAGE2_ENRICHED_CHOICES) {
    return window.STAGE2_ENRICHED_CHOICES.slice();
  }
  return [];
}

function sampleEnrichedChoices(locId, n, stage) {
  const pool = getEnrichedPool(locId, stage || 'Stage I');
  if (!pool.length) return [];
  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }
  return pool.slice(0, n).map(function(c) {
    return {
      text: c.label || c.text || 'Investigate.',
      skill: SKILL_NORM[c.skill] || c.skill || 'lore',
      tag: c.tag || 'risky',
      align: c.align || 'neutral',
      cid: '__enriched__',
      __enrichedFn: c.fn
    };
  });
}

var _TAG_SKILL = { Combat: 'combat', Magic: 'lore', Stealth: 'stealth', Support: 'persuasion', Bard: 'persuasion' };

// 3D — Stage DC offset lookup
var STAGE_DC_OFFSET = { 'Stage I': 0, 'Stage II': 2, 'Stage III': 4, 'Stage IV': 6, 'Stage V': 8 };

var _TAG_RISK = {
  Combat: 'bold', Confrontation: 'bold', Infiltration: 'bold', Ritual: 'bold', Assassination: 'bold',
  Accusation: 'bold', Negotiation: 'bold', Exposure: 'bold', Betrayal: 'bold', Tribunal: 'bold',
  Social: 'safe', Rest: 'safe', Trade: 'safe', Observation: 'safe', Research: 'safe'
};

function toEnrichedChoice(c) {
  var tagSkill = c.tags && c.tags.reduce(function(found, t) { return found || _TAG_SKILL[t] || null; }, null);
  var riskTag = c.tags && c.tags.reduce(function(found, t) { return found || _TAG_RISK[t] || null; }, null);
  var resolvedTag = c.tag || riskTag || 'risky';

  // 3C — track consecutive safe choices; rival clock advances at 3
  var G = window.G;
  if (G) {
    if (resolvedTag === 'safe') {
      G._consecutiveSafeChoices = (G._consecutiveSafeChoices || 0) + 1;
      if (G._consecutiveSafeChoices >= 3) {
        G.worldClocks = G.worldClocks || {};
        G.worldClocks.rival = (G.worldClocks.rival || 0) + 1;
        G._consecutiveSafeChoices = 0;
        checkRivalClock();
        if (!G.flags._rivalNotice_safeStreak) {
          G.flags._rivalNotice_safeStreak = true;
          if (typeof window.addWorldNotice === 'function') {
            window.addWorldNotice('You have played it safe three times running. Word reaches Maren Oss\'s contacts.');
          }
        }
      }
    } else {
      G._consecutiveSafeChoices = 0;
    }
  }

  return {
    text: c.label || c.text || 'A critical moment demands attention.',
    skill: SKILL_NORM[c.skill] || c.skill || tagSkill || 'persuasion',
    tag: resolvedTag,
    align: c.align || 'neutral',
    cid: '__enriched__',
    plot: c.plot || 'side',
    criticalSideplot: c.criticalSideplot || false,
    __enrichedFn: c.fn
  };
}

function getActiveMidspineChoices() {
  const G = window.G;
  if (!G) return [];
  // Normalize string archetype so condition() checks like G.archetype.group work
  if (G.archetype && typeof G.archetype === 'string') {
    G.archetype = { id: G.archetype, group: G.archetype };
  }
  const active = [];

  // Non-bard midspines: use built-in condition()
  [window.COMBAT_MIDSPINE_CHOICES, window.MAGIC_MIDSPINE_CHOICES,
   window.STEALTH_MIDSPINE_CHOICES, window.SUPPORT_MIDSPINE_CHOICES].forEach(function(arr) {
    if (!Array.isArray(arr)) return;
    arr.forEach(function(entry) {
      if (typeof entry.condition === 'function') {
        try { if (entry.condition()) active.push(entry); } catch(e) {}
      }
    });
  });

  // Bard midspine: signal-based gating
  var bard = window.BARD_MIDSPINE_NODES;
  if (Array.isArray(bard) && G.archetype && (G.archetype.id === 'bard' || G.archetype === 'bard')) {
    var sig = (G.signals && G.signals.bardSpine) || '';
    if (!sig && bard[0]) active.push(bard[0]);
    else if (sig === 'voice_found' && bard[1]) active.push(bard[1]);
    else if (sig === 'thread_pulled' && bard[2]) active.push(bard[2]);
  }

  return active;
}

// ── WORLD CLOCK THRESHOLD OBSERVER ───────────────────────

const CLOCK_THRESHOLDS = [
  { clock: 'watchfulness', at: 3, flag: 'clock_watch_3',
    notice: 'You sense you\'re being watched. The Warden Order has opened a parallel file on your investigation.' },
  { clock: 'watchfulness', at: 5, flag: 'clock_watch_5', dcPenalty: 2,
    notice: 'Agents are actively tracking your movements. All skill checks are harder until you reduce exposure.' },
  { clock: 'pressure',     at: 4, flag: 'clock_pressure_4',
    notice: 'The investigation is drawing dangerous attention. Something will have to give.' },
  { clock: 'pressure',     at: 7, flag: 'clock_pressure_7', dcPenalty: 1,
    notice: 'You are running out of room. Faction pressure is affecting everything you attempt.' },
  { clock: 'reverence',    at: 3, flag: 'clock_reverence_3',
    notice: 'Your reputation opens doors. Allied factions are watching your progress with interest.' },
];

// 3C — Rival clock thresholds (declared before checkClockThresholds which references it)
var _RIVAL_THRESHOLDS = [
  { at: 3, flag: 'rival_notice_3', notice: 'Word reaches you that an investigator named Maren Oss has been asking questions along the Ridgeway. She is licensed. She is thorough. She has a head start.' },
  { at: 6, flag: 'rival_notice_6', notice: 'At the archive in Guildheart Hub, the clerk tells you someone was here yesterday asking about the same names. She left a card: Maren Oss, Licensed Inquiry. The path grows harder.', dcPenalty: 1 },
  { at: 9, flag: 'rival_notice_9', notice: 'Maren Oss has submitted a partial report to the Oversight Collegium. The window is closing. She is one step ahead.', dcPenalty: 1 },
];

function checkClockThresholds() {
  const G = window.G;
  if (!G || !G.worldClocks) return;
  if (!G.flags) G.flags = {};
  var newPenalty = 0;
  CLOCK_THRESHOLDS.forEach(function(t) {
    var val = G.worldClocks[t.clock] || 0;
    if (val >= t.at) {
      if (!G.flags[t.flag]) {
        G.flags[t.flag] = true;
        if (typeof addWorldNotice === 'function') addWorldNotice(t.notice);
      }
      if (t.dcPenalty) newPenalty += t.dcPenalty;
    }
  });
  // Include rival clock dc penalty so call order doesn't matter
  var rival = G.worldClocks.rival || 0;
  _RIVAL_THRESHOLDS.forEach(function(t) {
    if (rival >= t.at && t.dcPenalty) newPenalty += t.dcPenalty;
  });
  G._dcPenalty = newPenalty;
}

function checkRivalClock() {
  var G = window.G;
  if (!G || !G.worldClocks) return;
  var rival = G.worldClocks.rival || 0;
  _RIVAL_THRESHOLDS.forEach(function(t) {
    if (rival >= t.at && !G.flags[t.flag]) {
      G.flags[t.flag] = true;
      if (typeof addWorldNotice === 'function') addWorldNotice(t.notice);
      // dcPenalty is accumulated in checkClockThresholds to avoid clobber
    }
  });
}

// ── ENRICHED CHOICE HANDLER ───────────────────────────────

function handleEnrichedChoice(choice) {
  patchGState();
  const G = window.G; if (!G) return;
  G.lastResult = '';
  G.recentOutcomeType = '';

  if (choice.id === 'lay_low') {
    var stageKey = (G.stage === 'Stage II' || G.stage === 2) ? 2
                 : (G.stage === 'Stage III' || G.stage === 3) ? 3
                 : 1;
    var _rivalBefore = G.worldClocks.rival || 0;
    G.worldClocks.rival = Math.max(0, _rivalBefore - 1);
    if (_rivalBefore >= 7) {
      // rival >= 7: emergency triage — skip stageProgress deduction
      G.lastResult = 'The situation is critical. You go to ground completely — the rival loses a step, but the investigation pauses.';
    } else {
      G.stageProgress[stageKey] = Math.max(0, (G.stageProgress[stageKey] || 0) - 1);
      G.lastResult = 'You go quiet — no meetings, no movement, no trail. The rival loses a step. The investigation loses one too.';
    }
    G.recentOutcomeType = 'partial';
    advanceTime(1);
    if (typeof updateHUD === 'function') updateHUD();
    return;
  }

  try {
    choice.__enrichedFn.call(null);
  } catch (e) {
    console.warn('[enriched bridge] fn error:', e);
    G.lastResult = 'The situation develops. Observe and proceed.';
    G.recentOutcomeType = 'partial';
  }

  // Fix A3: stage-aware stageProgress key
  var stageKey = (G.stage === 'Stage II' || G.stage === 2) ? 2
               : (G.stage === 'Stage III' || G.stage === 3) ? 3
               : (G.stage === 'Stage IV' || G.stage === 4) ? 4
               : 1;

  // Fix A1: award tag-based stageProgress on roll success, not recentOutcomeType string
  // 3D — stage-based DC offset (computed before display so roll summary shows effectiveDC)
  var stageOffset = STAGE_DC_OFFSET[G.stage] || 0;
  var _lastDC = G._lastDC || 10;
  var effectiveDC = _lastDC + stageOffset;

  // Reverence bonus: at reverence >= 7, reduce DC by 1 on social/persuasion checks
  var reverenceBonus = 0;
  if ((G.worldClocks.reverence || 0) >= 7) {
    var socialSkills = ['persuasion', 'performance', 'empathy'];
    if (socialSkills.indexOf(choice.skill) !== -1 ||
        (choice.tag === 'safe' && choice.plot !== 'main')) {
      reverenceBonus = 1;
    }
  }
  effectiveDC = Math.max(0, effectiveDC - reverenceBonus);
  G._reverenceBonus = reverenceBonus;

  var _lastTotal = G._lastRollTotal || 0;

  // C1 — Roll visibility: inject compact roll-summary line after fn executes
  (function() {
    var _roll = G._lastRollRaw || 0;
    var _skillVal = G._lastRollSkillVal || 0;
    var _pen = G._dcPenalty || 0;
    var _total = G._lastRollTotal || 0;
    var _dc = effectiveDC; // use effectiveDC (includes stage offset) so displayed DC matches check DC
    var _outcome = (_roll === 20) ? 'Critical!'
                 : (_roll === 1)  ? 'Fumble'
                 : (_total >= _dc) ? 'Success'
                 : 'Failure';
    if (_roll > 0) {
      var _parts = 'Rolled ' + _roll;
      if (_skillVal > 0) _parts += ' + ' + _skillVal + ' (skill)';
      if (_pen > 0)      _parts += ' \u2212 ' + _pen + ' (pressure)';
      _parts += ' = ' + _total + ' vs DC ' + _dc + ' \u2014 ' + _outcome;
      var _line = '<span class="roll-result">' + _parts + '</span>';
      if (typeof addNarration === 'function') addNarration('', _line, 'roll');
    }
  })();

  // Promote outcome type to crit/fumble if roll warranted it
  if (G._lastRollWasCrit && G.recentOutcomeType === 'success') G.recentOutcomeType = 'crit';
  if (G._lastRollWasFumble && G.recentOutcomeType === 'complication') G.recentOutcomeType = 'fumble';

  checkClockThresholds();
  var rollSucceeded = (_lastTotal >= effectiveDC) && !G._lastRollWasFumble;
  if (rollSucceeded) {
    if (choice.tag === 'risky') {
      G.stageProgress[stageKey] = (G.stageProgress[stageKey] || 0) + 1;
      G.flags['risky_discovery_' + G.dayCount] = true;
    } else if (choice.tag === 'bold') {
      G.stageProgress[stageKey] = (G.stageProgress[stageKey] || 0) + 2;
      G.flags['bold_discovery_' + G.dayCount] = true;
      G.worldClocks.reverence = (G.worldClocks.reverence || 0) + 1;
    }
  }

  // 3E — Crit rewards: bonus XP and stageProgress
  if (G._lastRollWasCrit || G.recentOutcomeType === 'crit') {
    if (typeof gainXp === 'function') gainXp(1, 'crit bonus');
    G.stageProgress[stageKey] = (G.stageProgress[stageKey] || 0) + 1; // crit bonus stacks on top of tag bonus (by design)
  }

  // 3C — fumble on main plot increments rival clock
  if (G._lastRollWasFumble && choice.plot === 'main') {
    G.worldClocks.rival = (G.worldClocks.rival || 0) + 1;
    checkRivalClock();
  }

  // Fumble locking
  if (G._lastRollWasFumble) {
    var cid = choice.cid || choice.id;
    if (cid) {
      G.flags['fumble_locked_' + cid] = true;

      if (choice.plot === 'main') {
        // Inject backup choice into the pool
        var backupId = cid + '_backup';
        if (!G.flags['fumble_locked_' + backupId]) {
          var backup = {
            id: backupId,
            cid: backupId,
            text: 'Pursue the investigation through a different angle \u2014 the path is harder, but not closed.',
            tag: 'risky',
            plot: 'main',
            isBackup: true,
            dc: 14,
            skill: choice.skill || 'lore',
            xpReward: Math.max(10, (choice.xpReward || 20) - 10),
            __enrichedFn: function() {
              var G = window.G;
              G.lastResult = 'A different thread of the investigation opens. The way is longer and the leads are cold, but the case is not lost.';
              G.recentOutcomeType = 'partial';
              G.stageProgress = G.stageProgress || {};
              var sk = G.stage === 'Stage II' ? 2 : G.stage === 'Stage III' ? 3 : 1;
              G.stageProgress[sk] = (G.stageProgress[sk] || 0) + 1;
              advanceTime(1);
            }
          };
          backup.dc = Math.max(8, (choice.dc || 14) - 2);
          G._pendingBackupChoice = backup;
        }
      } else if (choice.criticalSideplot === true) {
        G.flags['sideplot_failed_' + cid] = true;
        if (typeof addJournal === 'function') {
          addJournal('consequence', 'This path has closed. Some doors, once shut, do not reopen.');
        }
      }
    }
  }

  const resultText = G.lastResult || 'The action proceeds without clear resolution.';

  if (typeof saveGame === 'function') saveGame();
  if (typeof updateHUD === 'function') updateHUD();

  setTimeout(function() {
    if (typeof addNarration === 'function') addNarration('', resultText, G.recentOutcomeType || 'partial');
    const nextChoices = buildNextChoiceSet(G.location, G.stage);
    if (!window._awaitingLevelUp && typeof renderChoices === 'function') {
      _origRenderChoices(nextChoices);
    }
  }, 400);
}

function buildNextChoiceSet(locId, stage) {
  const midspine = getActiveMidspineChoices().slice(0, 1).map(toEnrichedChoice);
  const enriched = sampleEnrichedChoices(locId, Math.max(0, 2 - midspine.length), stage);
  const standard = [
    { text: 'Look for more leads in the settlement.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'market_intel' },
    { text: 'Rest and reconsider.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'rest_recover' }
  ];
  return midspine.concat(enriched).concat(standard).slice(0, 4);
}

// ── WRAP handleChoice ─────────────────────────────────────

const _origHandleChoice = window.handleChoice;
window.handleChoice = function(choice) {
  // Fix 2: "Rest and reconsider" drains world clocks before passing to original handler
  if (choice && choice.cid === 'rest_recover') {
    const G = window.G;
    if (G) {
      // 3B — enforce 2× per day rest limit
      if (!G.restLastDay || G.restLastDay !== G.dayCount) {
        G.restCount = 0;
        G.restLastDay = G.dayCount != null ? G.dayCount : 0;
      }
      if ((G.restCount || 0) >= 2) {
        if (typeof addNarration === 'function') {
          addNarration('', 'You are too exhausted to rest again today.', 'rest');
        }
        return; // skip all rest effects
      }
      G.restCount = (G.restCount || 0) + 1;
      // 3C — rival advances when you rest
      G.worldClocks = G.worldClocks || {};
      G.worldClocks.rival = (G.worldClocks.rival || 0) + 1;
      checkRivalClock();
      if (!G.flags._rivalNotice_rest) {
        G.flags._rivalNotice_rest = true;
        if (typeof window.addWorldNotice === 'function') {
          window.addWorldNotice('Taking time to recover lets Maren Oss gain ground.');
        }
      }

      // C2 — rest costs 1 stageProgress in current stage (min 0)
      var _restStageKey = (G.stage === 'Stage II' || G.stage === 2) ? 2
                        : (G.stage === 'Stage III' || G.stage === 3) ? 3
                        : (G.stage === 'Stage IV' || G.stage === 4) ? 4 : 1;
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      G.stageProgress[_restStageKey] = Math.max(0, (G.stageProgress[_restStageKey] || 0) - 1);
      if (typeof addNarration === 'function') {
        addNarration('', 'You pause to regroup. The investigation loses ground.', 'rest');
      }
    }
    if (G && G.worldClocks) {
      if (G.worldClocks.watchfulness > 0) G.worldClocks.watchfulness--;
      if (G.worldClocks.pressure > 0) G.worldClocks.pressure--;
      if (typeof addWorldNotice === 'function' && (G.worldClocks.watchfulness <= 2)) {
        addWorldNotice('You kept a low profile. The scrutiny has eased slightly.');
      }
    }
    if (typeof checkClockThresholds === 'function') checkClockThresholds();
    // fall through to original handler
  }
  if (choice && choice.cid === 'market_intel') {
    const G = window.G;
    if (G) {
      if (!G.stageProgress) G.stageProgress = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      var _miStageKey = (G.stage === 'Stage II' || G.stage === 2) ? 2
                      : (G.stage === 'Stage III' || G.stage === 3) ? 3
                      : (G.stage === 'Stage IV' || G.stage === 4) ? 4
                      : 1;
      G.stageProgress[_miStageKey] = (G.stageProgress[_miStageKey] || 0) + 1;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      if (typeof checkClockThresholds === 'function') checkClockThresholds();
    }
    // fall through to original handler
  }
  if (choice && typeof choice.__enrichedFn === 'function') {
    document.querySelectorAll('.choice-block,.move-block').forEach(function(b) { b.remove(); });
    if (typeof addNarration === 'function') {
      addNarration('', '<em style="color:var(--ink-faint);font-size:13px">You chose: ' + choice.text + '</em>');
    }
    handleEnrichedChoice(choice);
    _autoSaveTick();
    return;
  }
  _origHandleChoice(choice);
  _autoSaveTick();
};

// ── WRAP renderChoices — inject enriched choices ───────────

var _origRenderChoices = window.renderChoices;
window.renderChoices = function(choices) {
  const G = window.G;
  if (!G) { _origRenderChoices(choices); return; }
  const injectStages = ['Stage I', 'Stage II'];
  if (injectStages.indexOf(G.stage) !== -1 && choices.length < 4) {
    const midspine = getActiveMidspineChoices().slice(0, 1).map(toEnrichedChoice);
    const slots = Math.min(2, 4 - choices.length) - midspine.length;
    const enriched = slots > 0 ? sampleEnrichedChoices(G.location, slots, G.stage) : [];
    if (midspine.length || enriched.length) choices = choices.concat(midspine).concat(enriched);
  }
  // Inject pending backup choice from fumble locking
  if (window.G && window.G._pendingBackupChoice) {
    choices = choices.concat([window.G._pendingBackupChoice]);
    window.G._pendingBackupChoice = null;
  }
  // Inject lay_low choice when rival clock is high
  if (window.G && (window.G.worldClocks.rival || 0) >= 4) {
    var hasLayLow = choices.some(function(c) { return c.id === 'lay_low'; });
    if (!hasLayLow) {
      choices = choices.concat([{
        id: 'lay_low', cid: 'lay_low',
        text: 'Lay low — go quiet for a day, let the rival lose your trail.',
        tag: 'safe', plot: 'side', dc: 0, skill: 'survival', xpReward: 5,
        __enrichedFn: function() {}
      }]);
    }
  }
  _origRenderChoices(choices);
};

// ── WRAP beginLegend — patch G after init ─────────────────

const _origBeginLegend = window.beginLegend;
window.beginLegend = function() {
  _origBeginLegend();
  patchGState();
  if (typeof initRunIdentity === 'function') initRunIdentity();
};

// ── WRAP enterPasscode — patch G after load ───────────────

const _origEnterPasscode = window.enterPasscode;
if (typeof _origEnterPasscode === 'function') {
  window.enterPasscode = function() {
    _origEnterPasscode();
    setTimeout(patchGState, 100);
  };
}

// ── TEST HARNESS EXPORTS ──────────────────────────────────
window.handleEnrichedChoice = handleEnrichedChoice;
window.checkClockThresholds = checkClockThresholds;
window._rawRenderChoices = _origRenderChoices;

})();
