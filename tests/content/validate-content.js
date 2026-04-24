'use strict';
/**
 * Content invariant scanner — runs standalone: node tests/content/validate-content.js
 * Loads each enriched choice file, validates every choice object against project standards.
 */

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const CONTENT_DIR  = path.join(__dirname, '..', '..', 'content');
const VALID_CATS   = new Set(['evidence', 'intelligence', 'rumor', 'discovery', 'contact_made', 'complication']);
const FORBIDDEN    = ['investigation', 'meaningful', 'you feel', 'you realize', 'you sense'];
// "contact" as noun-for-person: catch "a contact" / "my contact" / "their contact" etc.
const FORBIDDEN_RE = /\b(a|my|their|your|his|her|our)\s+contact\b/i;

const LABEL_VERB_RE = /^(To |Ask |Check |Go |Find |Look |Talk |Tell |Take |Give |Buy |Sell |Use )/;

let errors = 0;
let checked = 0;

function fail(file, label, msg) {
  console.error(`  FAIL [${path.basename(file)}] "${label}": ${msg}`);
  errors++;
}

function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function checkForbidden(file, label, text) {
  for (const word of FORBIDDEN) {
    if (text.toLowerCase().includes(word)) {
      fail(file, label, `forbidden word/phrase: "${word}"`);
    }
  }
  if (FORBIDDEN_RE.test(text)) {
    fail(file, label, 'forbidden: "contact" used as noun for a person');
  }
}

function validateChoice(file, choice) {
  const label = choice.label || '(no label)';

  // label exists
  if (!choice.label || !choice.label.trim()) {
    fail(file, label, 'label is missing or empty');
    return;
  }

  // label ≤ 15 words
  const labelWords = countWords(choice.label);
  if (labelWords > 15) {
    fail(file, label, `label too long: ${labelWords} words (max 15)`);
  }

  // label has no question marks
  if (choice.label.includes('?')) {
    fail(file, label, 'label contains a question mark');
  }

  // label is not an infinitive action phrase
  if (LABEL_VERB_RE.test(choice.label)) {
    fail(file, label, `label starts with an action infinitive ("${choice.label.slice(0,12)}…")`);
  }

  // fn is a function
  if (typeof choice.fn !== 'function') {
    fail(file, label, 'fn is not a function');
  }

  // xpReward is a number if present
  if ('xpReward' in choice && typeof choice.xpReward !== 'number') {
    fail(file, label, `xpReward is not a number: ${JSON.stringify(choice.xpReward)}`);
  }

  // forbidden words in label
  checkForbidden(file, label, choice.label);

  // A1: result text ≥ 30 words
  if (typeof choice.fn === 'function') {
    const results = extractResultStrings(choice.fn.toString());
    for (const text of results) {
      const r = checkResultWordCount(text);
      if (r) fail(file, label, r.msg);
    }
  }

  checked++;
}

function loadChoicesFromFile(filePath) {
  const src = fs.readFileSync(filePath, 'utf8');

  // Build a sandbox that captures window.* assignments and IIFE calls
  const captured = [];
  const sandbox = {
    window: {},
    console: { log: () => {}, warn: () => {}, error: () => {} },
    Math, JSON, Object, Array, Date, RegExp, Error,
    parseInt, parseFloat, isNaN, isFinite,
    G: {
      level: 1, stage: 'Stage I', stageProgress: {1:0,2:0,3:0,4:0,5:0},
      flags: {}, skills: {combat:0,survival:0,persuasion:0,lore:0,stealth:0,craft:0},
      inventory: [], renown: 0, benevolence: 0, orderAxis: 0,
      gold: 20, hp: 20, maxHp: 20, xp: 0,
    },
    addJournal:        (text, cat) => {
      if (!VALID_CATS.has(cat)) {
        captured.push({ __invalidJournalCat: true, text, cat });
      }
    },
    addNarration:      () => {},
    showToast:         () => {},
    updateHUD:         () => {},
    saveGame:          () => {},
    gainXp:            () => {},
    addToInventory:    () => {},
    advanceTime:       () => {},
    tickAxis:          () => {},
    enterCombat:       () => {},
    addWorldNotice:    () => {},
    addQuest:          () => {},
    loadStageChoices:  () => {},
    renderChoices:     () => {},
    maybeStageAdvance: () => {},
    getRivalDCMod:     () => 0,
  };

  // window.X = [...] assignment pattern — collect choice arrays
  const proxy = new Proxy(sandbox.window, {
    set(target, key, value) {
      target[key] = value;
      if (Array.isArray(value)) {
        value.forEach(item => {
          if (item && typeof item === 'object' && ('label' in item || 'fn' in item)) {
            captured.push(item);
          }
        });
      }
      return true;
    },
  });
  sandbox.window = proxy;
  sandbox.window.window = proxy;

  const ctx = vm.createContext(sandbox);
  try {
    vm.runInContext(src, ctx, { filename: path.basename(filePath), timeout: 3000 });
  } catch (_) {
    // IIFE content files may reference game functions — ignore runtime errors,
    // we only care about the choice objects that were registered.
  }

  // Also collect anything assigned to window directly after execution
  const extra = [];
  for (const key of Object.keys(sandbox.window)) {
    const val = sandbox.window[key];
    if (Array.isArray(val)) {
      val.forEach(item => {
        if (item && typeof item === 'object' && ('label' in item || 'fn' in item)) {
          if (!captured.includes(item)) extra.push(item);
        }
      });
    }
  }

  return [...captured, ...extra];
}

function run() {
  const files = fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('_enriched_choices.js') && fs.statSync(path.join(CONTENT_DIR, f)).isFile())
    .map(f => path.join(CONTENT_DIR, f));

  if (files.length === 0) {
    console.error('ERROR: no enriched choice files found in content/');
    process.exit(1);
  }

  console.log(`Scanning ${files.length} enriched choice files…\n`);

  for (const file of files) {
    const choices = loadChoicesFromFile(file);
    for (const choice of choices) {
      if (choice.__invalidJournalCat) {
        fail(file, choice.text?.slice(0, 40) || '(journal)', `invalid addJournal category: "${choice.cat}"`);
        continue;
      }
      validateChoice(file, choice);
    }
  }

  console.log(`\nChecked ${checked} choices across ${files.length} files.`);
  if (errors > 0) {
    console.error(`\n${errors} violation(s) found.`);
    process.exit(1);
  } else {
    console.log('All checks passed.');
  }
}

// ─── Exported rule helpers (used by review-content.js and tests) ─────────────

function extractResultStrings(fnSrc) {
  const src = fnSrc.replace(/\/\/[^\n]*/g, '');
  const results = [];
  const reSQ = /addNarration\s*\(\s*(?:'[^']*'|"[^"]*")\s*,\s*'((?:[^'\\]|\\.)*)'/g;
  const reDQ = /addNarration\s*\(\s*(?:'[^']*'|"[^"]*")\s*,\s*"((?:[^"\\]|\\.)*)"/g;
  for (const re of [reSQ, reDQ]) {
    let m;
    while ((m = re.exec(src)) !== null) {
      const text = m[1].replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"').trim();
      if (text.length > 0) results.push(text);
    }
  }
  return results;
}

function checkResultWordCount(text) {
  const words = countWords(text);
  if (words < 30) return { level: 'fail', msg: `result text too short: ${words} words (min 30)` };
  return null;
}

if (require.main === module) { run(); }

module.exports = { extractResultStrings, checkResultWordCount };
