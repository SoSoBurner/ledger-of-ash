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
let warns = 0;
let checked = 0;

function fail(file, label, msg) {
  console.error(`  FAIL [${path.basename(file)}] "${label}": ${msg}`);
  errors++;
}

function warn(file, label, msg) {
  console.warn(`  WARN [${path.basename(file)}] "${label}": ${msg}`);
  warns++;
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

  // A1/A2: result word count
  if (typeof choice.fn === 'function') {
    const results = extractResultStrings(choice.fn.toString());
    for (const text of results) {
      const r = checkResultWordCount(text);
      if (r && r.level === 'fail') fail(file, label, r.msg);
      if (r && r.level === 'warn') warn(file, label, r.msg);
      const r3 = checkResultOpener(text);
      if (r3) fail(file, label, r3.msg);
    }
    // A4: rumor source attribution
    const rumorTexts = extractRumorTexts(choice.fn.toString());
    for (const text of rumorTexts) {
      const r4 = checkRumorSource(text);
      if (r4) fail(file, label, r4.msg);
    }
    // A5: NPC flag timing
    const a5 = checkNpcFlagTiming(choice.fn.toString());
    for (const r5 of a5) fail(file, label, r5.msg);
    // A6: world clock transparency
    const r6 = checkWorldClockTransparency(choice.fn.toString());
    if (r6) warn(file, label, r6.msg);
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
  if (warns > 0) console.warn(`${warns} warning(s).`);
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
  if (words > 120) return { level: 'fail', msg: `result text too long: ${words} words (max 120)` };
  if (words < 60) return { level: 'warn', msg: `result text short: ${words} words (target 60–90, expand if possible)` };
  return null;
}

const SUMMARY_OPENERS = ['confirms', 'acknowledges', 'indicates', 'the result is', 'you learn that', 'it turns out'];

function checkResultOpener(text) {
  const lower = text.trimStart().toLowerCase();
  for (const opener of SUMMARY_OPENERS) {
    if (lower.startsWith(opener)) {
      return { level: 'fail', msg: `result opens with summary-register phrase: "${opener}"` };
    }
  }
  return null;
}

// ─── A4 — Rumor Source Attribution ───────────────────────────────────────────

const SOCIAL_ROLES_RE = /\b(?:merchant|factor|clerk|warden|innkeeper|stevedore|guildsman|handler|carter|broker|scribe|soldier|captain|lieutenant|marshal|sergeant|courier)\b/i;
const LOCATION_WORDS_RE = /\b(?:market|hall|inn|gate|ward|district|square|dock|harbor|wharf|quay|alley|quarter|bridge|tower|guild|yard|cellar|tavern|chapel|warehouse)\b/i;
const LOCATION_PREP_RE  = /\b(?:at|in|near|from)\s+the\s+[a-z]/i;
const PROPER_NOUN_RE    = /[A-Z][a-z]+\s+[A-Z][a-z]+/;

function extractRumorTexts(fnSrc) {
  const src = fnSrc.replace(/\/\/[^\n]*/g, '');
  const results = [];
  const reSQ = /addJournal\s*\(\s*'((?:[^'\\]|\\.)*)'\s*,\s*'rumor'/g;
  const reDQ = /addJournal\s*\(\s*"((?:[^"\\]|\\.)*)"\s*,\s*["']rumor["']/g;
  for (const re of [reSQ, reDQ]) {
    let m;
    while ((m = re.exec(src)) !== null) {
      const text = m[1].replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"').trim();
      if (text.length > 0) results.push(text);
    }
  }
  return results;
}

function checkRumorSource(text) {
  if (PROPER_NOUN_RE.test(text)) return null;
  if (SOCIAL_ROLES_RE.test(text)) return null;
  if (LOCATION_WORDS_RE.test(text)) return null;
  if (LOCATION_PREP_RE.test(text)) return null;
  return { level: 'fail', msg: 'rumor has no source attribution (no proper noun, social role, or location reference)' };
}

// ─── A5 — NPC First-Encounter Flag Timing ────────────────────────────────────

function checkNpcFlagTiming(fnSrc) {
  const src = fnSrc.replace(/\/\/[^\n]*/g, '');
  const flagRe = /G\.flags\.met_([a-z_]+)\s*=\s*true/g;
  const violations = [];
  let m;
  while ((m = flagRe.exec(src)) !== null) {
    const fullName = m[1];
    const firstName = fullName.split('_')[0];
    const flagPos = m.index;
    const before = src.slice(0, flagPos);
    const narrationRe = /addNarration\s*\(/g;
    let nm;
    let violated = false;
    while ((nm = narrationRe.exec(before)) !== null) {
      // Skip narrations in a different branch (separated from the flag by } else)
      const between = before.slice(nm.index, flagPos);
      if (/\}\s*else/.test(between)) continue;
      const callText = before.slice(nm.index, nm.index + 500);
      if (callText.toLowerCase().includes(firstName.toLowerCase())) {
        violated = true;
        break;
      }
    }
    if (violated) {
      violations.push({ level: 'fail', msg: `G.flags.met_${fullName} set after addNarration that names "${firstName}" — set the flag before narration` });
    }
  }
  return violations;
}

// ─── A6 — World Clock Transparency ───────────────────────────────────────────

const CONSEQUENCE_WORDS = ['attention', 'pressure', 'harder', 'watchful', 'noticed', 'tracked', 'scrutin'];

function checkWorldClockTransparency(fnSrc) {
  const src = fnSrc.replace(/\/\/[^\n]*/g, '');
  if (!/G\.worldClocks\.\w+\s*(?:\+\+|\+=)/.test(src)) return null;
  // Check signal words only in narration result strings, not in code (avoids false pass on clock key names like "pressure")
  const resultTexts = extractResultStrings(src);
  const combinedText = resultTexts.join(' ').toLowerCase();
  for (const word of CONSEQUENCE_WORDS) {
    if (combinedText.includes(word)) return null;
  }
  return { level: 'warn', msg: 'worldClock incremented without consequence signal word (attention/pressure/harder/watchful/noticed/tracked/scrutin)' };
}

if (require.main === module) { run(); }

module.exports = { extractResultStrings, checkResultWordCount, checkResultOpener, extractRumorTexts, checkRumorSource, checkNpcFlagTiming, checkWorldClockTransparency, loadChoicesFromFile };
