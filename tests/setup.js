'use strict';
// Game test harness. Extracts inline <script> blocks from ledger-of-ash.html,
// patches let/const → var for the key globals we need to inspect,
// then runs everything in a vm context with browser globals stubbed.

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const HTML_PATH = path.join(__dirname, '..', 'ledger-of-ash.html');

function defaultG() {
  return {
    name: '', archetype: null, background: null,
    level: 1, xp: 0, renown: 0,
    hp: 20, maxHp: 20, gold: 20,
    skills: { combat:0, survival:0, persuasion:0, lore:0, stealth:0, craft:0 },
    traits: [], location: 'shelkopolis',
    timeIndex: 0, dayCount: 0, axisTick: 0, axisInverted: false,
    stage: 'Stage I', stageLabel: 'Grass Roots',
    stageProgress: { 1:0, 2:0, 3:0, 4:0, 5:0 },
    benevolence: 0, orderAxis: 0, localityHeat: {}, tensionLevel: 0,
    factions: [], quests: [], journal: [], journalRecords: [], history: [],
    inventory: [], equipped: { weapon: null, armor: null, tool: null },
    materials: {},
    wounds: [], fatigue: 0, recoveryState: 'stable',
    npcMemory: {},
    trainingDisadvantage: 0,
    dead: false,
    rivalAdventurers: [],
    marenRenown: 0, marenRevealed: false,
    travelMode: 'foot', pace: 'normal', supplyTier: 'light', journeyFatigue: 0,
    flags: {},
    masteryXP: 0,
    investigationProgress: 0,
    worldClocks: { watchfulness: 0, pressure: 0, reverence: 0 },
    telemetry: { turns: 0, actions: 0 },
    schemaVersion: 3,
  };
}

function extractInlineScripts(html) {
  const blocks = [];
  // Match <script> without src= attribute
  const re = /<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    blocks.push(m[1]);
  }
  return blocks.join('\n');
}

function buildSandbox(gOverrides) {
  // Minimal DOM stubs so script-level initialisation doesn't throw
  const fakeEl = () => ({
    style: {}, className: '', innerHTML: '', textContent: '',
    dataset: {}, value: '', id: '',
    appendChild: () => fakeEl(),
    remove: () => {},
    addEventListener: () => {},
    querySelector: () => null,
    querySelectorAll: () => ({ forEach: () => {}, length: 0 }),
    classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} },
  });

  const fakeDoc = {
    getElementById:     () => fakeEl(),
    querySelector:      () => null,
    querySelectorAll:   () => ({ forEach: () => {}, length: 0 }),
    createElement:      () => fakeEl(),
    body: fakeEl(),
    head: fakeEl(),
    activeElement: null,
    readyState: 'complete',
    addEventListener:   () => {},
  };

  const fakeStorage = (() => {
    const store = {};
    return {
      getItem:    (k) => store[k] ?? null,
      setItem:    (k, v) => { store[k] = String(v); },
      removeItem: (k) => { delete store[k]; },
    };
  })();

  const G = Object.assign(defaultG(), gOverrides || {});

  const sb = {
    // Core
    G,
    window:       {},
    document:     fakeDoc,
    localStorage: fakeStorage,
    console,
    Math, JSON, Object, Array, Date, RegExp, Error,
    parseInt, parseFloat, isNaN, isFinite,
    setTimeout:  (fn) => { try { fn(); } catch (_) {} },
    clearTimeout:  () => {},
    setInterval:   () => 0,
    clearInterval: () => {},
    requestAnimationFrame: () => {},
    performance: { now: () => Date.now() },

    // Game UI stubs (captured for assertion in tests if needed)
    _narrations: [],
    _toasts: [],
    _journals: [],

    addNarration:          function(label, html) { this._narrations.push({ label, html }); },
    showToast:             function(msg)          { this._toasts.push(msg); },
    updateHUD:             () => {},
    saveGame:              () => {},
    showTransitionBanner:  () => {},
    addQuest:              () => {},
    addWorldNotice:        () => {},
    loadStageChoices:      () => {},
    renderChoices:         () => {},
    maybeStageAdvance:     () => {},
    advanceTime:           () => {},
    tickAxis:              () => {},
    gainXp:                () => {},
    getRivalDCMod:         () => 0,
    getArchetypeFamily:    () => 'support',   // overwritten after eval
  };

  // Make window point to the sandbox itself so window.foo = ... works
  sb.window = sb;

  return sb;
}

/**
 * Load the game and return an object with G + all top-level game functions.
 * G is the live object — modify its properties in tests, call functions, assert.
 *
 * @param {Object} [gOverrides] — properties to merge into starting G state
 */
function createGameContext(gOverrides) {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  let code   = extractInlineScripts(html);

  // Patch let/var for the top-level bindings we need to access via the context.
  // function declarations are automatically available on the context; let/const are not.
  code = code.replace(/^let\s+G\s*=/m,            'var G =');
  code = code.replace(/^const\s+STAGE_LEVEL_CAP/m, 'var STAGE_LEVEL_CAP');
  code = code.replace(/^const\s+ARCHETYPES\b/m,   'var ARCHETYPES');
  code = code.replace(/^const\s+ENEMY_TEMPLATES/m, 'var ENEMY_TEMPLATES');
  code = code.replace(/^const\s+COMPANION_DEFS/m,  'var COMPANION_DEFS');
  code = code.replace(/^const\s+BACKGROUNDS\b/m,   'var BACKGROUNDS');

  // Append: expose key let/const under a known name so tests can grab them
  code += '\ntry { this.__STAGE_LEVEL_CAP = STAGE_LEVEL_CAP; } catch(_) {}';
  code += '\ntry { this.__G = G; } catch(_) {}';

  const sandbox = buildSandbox(gOverrides);
  const ctx     = vm.createContext(sandbox);

  try {
    vm.runInContext(code, ctx, { filename: 'ledger-of-ash.html', timeout: 5000 });
  } catch (err) {
    // Initialisation errors from DOM-dependent startup are expected — ignore.
    // The functions we care about are still defined.
  }

  // After eval, G on the context may be the game's own G (from var G = {...} in the script).
  // We need tests to manipulate THAT G (the one the functions close over), not a copy.
  // Prefer ctx.__G (the one functions close over) if available.
  const liveG = ctx.__G || ctx.G || sandbox.G;

  // Merge any gOverrides into the live G so initial state is as requested
  if (gOverrides) {
    Object.assign(liveG, gOverrides);
    if (gOverrides.flags) liveG.flags = Object.assign({}, liveG.flags, gOverrides.flags);
  }

  return {
    G:                 liveG,
    STAGE_LEVEL_CAP:   ctx.__STAGE_LEVEL_CAP || ctx.STAGE_LEVEL_CAP || { 'Stage I':5,'Stage II':10,'Stage III':15,'Stage IV':18,'Stage V':20 },
    narrations:        sandbox._narrations,
    toasts:            sandbox._toasts,
    // Functions (automatically on ctx because they're function declarations)
    checkLevelUp:      ctx.checkLevelUp,
    checkStageAdvance: ctx.checkStageAdvance,
    canAdvanceToStage3:ctx.canAdvanceToStage3,
    addJournal:        ctx.addJournal,
    addToInventory:    ctx.addToInventory,
    equipItem:         ctx.equipItem,
    unequipItem:       ctx.unequipItem,
    getArchetypeFamily:ctx.getArchetypeFamily,
    getActiveCompanions:ctx.getActiveCompanions,
    gainXp:            ctx.gainXp,
    adaptEnrichedChoice: ctx.adaptEnrichedChoice,
  };
}

/** Reset G to clean defaults in-place (keeps the same reference). */
function resetG(G) {
  const fresh = defaultG();
  Object.keys(G).forEach(k => { delete G[k]; });
  Object.assign(G, fresh);
}

module.exports = { createGameContext, defaultG, resetG };
