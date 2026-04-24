'use strict';
// Rule 3: NPC proper names appearing in narration must exist in the V33_2 canon or COMPANION_DEFS.
// Heuristic: capitalized two-word phrases appearing more than once per file.
// Returns WARN (not FAIL) due to the heuristic's false-positive rate.

const path = require('path');
const { extractResultStrings } = require('../../content/validate-content');

let _knownNpcs = null;
function loadKnownNpcs() {
  if (_knownNpcs) return _knownNpcs;
  const fixture = path.join(__dirname, '../fixtures/known-npcs.json');
  _knownNpcs = new Set(
    require(fixture).map(n => n.canonical_name.toLowerCase())
  );
  return _knownNpcs;
}

const PROPER_NOUN_RE = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)\b/g;

function extractProperNouns(text) {
  const found = [];
  let m;
  PROPER_NOUN_RE.lastIndex = 0;
  while ((m = PROPER_NOUN_RE.exec(text)) !== null) found.push(m[1]);
  return found;
}

function checkNpcCanon(choices, knownNpcs) {
  // Count proper noun occurrences across all result strings in the file
  const counts = new Map();
  for (const choice of choices) {
    if (typeof choice.fn !== 'function') continue;
    const texts = extractResultStrings(choice.fn.toString());
    for (const text of texts) {
      for (const noun of extractProperNouns(text)) {
        counts.set(noun, (counts.get(noun) || 0) + 1);
      }
    }
  }

  const violations = [];
  for (const [noun, count] of counts) {
    if (count < 2) continue; // single occurrence may be incidental
    if (knownNpcs.has(noun.toLowerCase())) continue;
    violations.push({ level: 'warn', msg: `NPC name "${noun}" appears ${count}x but is not in V33_2 canon — verify or add to named_npcs/` });
  }
  return violations;
}

module.exports = { checkNpcCanon, loadKnownNpcs, extractProperNouns };
