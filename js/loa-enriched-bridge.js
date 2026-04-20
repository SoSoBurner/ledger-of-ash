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

// Canonical skill map — all non-standard skill names normalized to valid game skills
const SKILL_NORM = {
  investigation: 'lore', perception: 'survival', deception: 'stealth',
  empathy: 'persuasion', insight: 'lore', awareness: 'survival',
  arcane: 'lore', arcana: 'lore', repair: 'craft', labor: 'craft',
  alchemy: 'craft', medicine: 'craft', endurance: 'survival',
  athletics: 'combat', intimidation: 'combat', performance: 'persuasion',
  history: 'lore', nature: 'survival', religion: 'lore'
};

window.rollD20 = function(skill, bonus) {
  const normSkill = SKILL_NORM[skill] || skill;
  const roll = Math.floor(Math.random() * 20) + 1;
  const skillVal = (window.G && window.G.skills && window.G.skills[normSkill]) ? window.G.skills[normSkill] : 0;
  const total = roll + skillVal + (bonus || 0);
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
  const map = stage === 'Stage II' ? POOL_MAP_S2 : POOL_MAP_S1;
  let varName = map[locId];
  // Synthetic district fallback
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

// ── ENRICHED CHOICE HANDLER ───────────────────────────────

function handleEnrichedChoice(choice) {
  const G = window.G;
  patchGState();
  G.lastResult = '';
  G.recentOutcomeType = '';

  try {
    choice.__enrichedFn.call(null);
  } catch (e) {
    console.warn('[enriched bridge] fn error:', e);
    G.lastResult = 'The situation develops. Observe and proceed.';
    G.recentOutcomeType = 'partial';
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
  const enriched = sampleEnrichedChoices(locId, 2, stage);
  const standard = [
    { text: 'Look for more leads in the settlement.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'market_intel' },
    { text: 'Rest and reconsider.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'rest_recover' }
  ];
  return enriched.concat(standard).slice(0, 4);
}

// ── WRAP handleChoice ─────────────────────────────────────

const _origHandleChoice = window.handleChoice;
window.handleChoice = function(choice) {
  if (choice && typeof choice.__enrichedFn === 'function') {
    document.querySelectorAll('.choice-block,.move-block').forEach(function(b) { b.remove(); });
    if (typeof addNarration === 'function') {
      addNarration('', '<em style="color:var(--ink-faint);font-size:13px">You chose: ' + choice.text + '</em>');
    }
    handleEnrichedChoice(choice);
    return;
  }
  _origHandleChoice(choice);
};

// ── WRAP renderChoices — inject enriched choices ───────────

var _origRenderChoices = window.renderChoices;
window.renderChoices = function(choices) {
  const G = window.G;
  if (!G) { _origRenderChoices(choices); return; }
  const injectStages = ['Stage I', 'Stage II'];
  if (injectStages.indexOf(G.stage) !== -1 && choices.length < 4) {
    const slots = Math.min(2, 4 - choices.length);
    const enriched = sampleEnrichedChoices(G.location, slots, G.stage);
    if (enriched.length) choices = choices.concat(enriched);
  }
  _origRenderChoices(choices);
};

// ── WRAP beginLegend — patch G after init ─────────────────

const _origBeginLegend = window.beginLegend;
window.beginLegend = function() {
  _origBeginLegend();
  patchGState();
};

// ── WRAP enterPasscode — patch G after load ───────────────

const _origEnterPasscode = window.enterPasscode;
if (typeof _origEnterPasscode === 'function') {
  window.enterPasscode = function() {
    _origEnterPasscode();
    setTimeout(patchGState, 100);
  };
}

})();
