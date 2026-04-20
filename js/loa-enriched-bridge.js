// ═══════════════════════════════════════════════════════
// LOA ENRICHED CHOICE BRIDGE
// Adapts engine.js enriched choice format to ledger-of-ash.html rendering
// All enriched choice files (stage1-5) are loaded before this script
// ═══════════════════════════════════════════════════════

(function() {
'use strict';

// ── FUNCTION SHIMS ──────────────────────────────────────────

window.gainXp = function(n, _reason) {
  if (typeof gainXP === 'function') gainXP(n);
};

window.rollD20 = function(skill, bonus) {
  const roll = Math.floor(Math.random() * 20) + 1;
  const skillVal = (window.G && window.G.skills && window.G.skills[skill]) ? window.G.skills[skill] : 0;
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
  'faction','item','quest','warning','info','field_note','note'
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
}

// ── ENRICHED CHOICE POOL ──────────────────────────────────

const ENRICHED_POOL_MAP = {
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

function getEnrichedPool(locId) {
  const varName = ENRICHED_POOL_MAP[locId];
  if (!varName) return [];
  return (window[varName] || []).slice();
}

function sampleEnrichedChoices(locId, n) {
  const pool = getEnrichedPool(locId);
  if (!pool.length) return [];
  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }
  return pool.slice(0, n).map(function(c) {
    return {
      text: c.label || c.text || 'Investigate.',
      skill: c.skill || 'lore',
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
    const nextChoices = buildNextChoiceSet(G.location);
    if (!window._awaitingLevelUp && typeof renderChoices === 'function') {
      _origRenderChoices(nextChoices);
    }
  }, 400);
}

function buildNextChoiceSet(locId) {
  const enriched = sampleEnrichedChoices(locId, 2);
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
  // Inject 1-2 enriched choices when stage 1 and pool available and choices < 4
  if (G && G.stage === 'Stage I' && choices.length < 4) {
    const slots = Math.min(2, 4 - choices.length);
    const enriched = sampleEnrichedChoices(G.location, slots);
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
