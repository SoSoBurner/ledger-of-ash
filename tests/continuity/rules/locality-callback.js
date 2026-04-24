'use strict';
// Rule 4: If result text references a locality outside the file's own scope,
// an explicit locality-guard (G.flags.visited_X / G.location === '...') must be present.

const path = require('path');
const { extractResultStrings } = require('../../content/validate-content');

let _localityIds = null;
function loadLocalityIds() {
  if (_localityIds) return _localityIds;
  _localityIds = require(path.join(__dirname, '../fixtures/locality-ids.json'));
  return _localityIds;
}

// All locality canonical names — built once from the fixture
let _allLocalityNames = null;
function getAllLocalityNames() {
  if (_allLocalityNames) return _allLocalityNames;
  const ids = loadLocalityIds();
  const nameSet = new Set();
  for (const entry of Object.values(ids)) {
    for (const n of entry.locality_names) nameSet.add(n);
  }
  _allLocalityNames = [...nameSet];
  return _allLocalityNames;
}

const LOCALITY_GUARD_RE = /G\.(?:flags\.visited_\w+|location\s*===?\s*['"][^'"]+['"])/;

function checkLocalityCallback(filename, choices) {
  const ids = loadLocalityIds();
  const allNames = getAllLocalityNames();

  const entry = ids[filename];
  const ownNames = new Set((entry ? entry.locality_names : []).map(n => n.toLowerCase()));

  const violations = [];

  for (const choice of choices) {
    if (typeof choice.fn !== 'function') continue;
    const fnSrc = choice.fn.toString();
    const texts = extractResultStrings(fnSrc);
    const hasGuard = LOCALITY_GUARD_RE.test(fnSrc);

    for (const text of texts) {
      const lower = text.toLowerCase();
      for (const name of allNames) {
        if (ownNames.has(name.toLowerCase())) continue;
        if (!lower.includes(name.toLowerCase())) continue;
        if (hasGuard) continue;
        const label = choice.label || '(no label)';
        violations.push({ level: 'warn', msg: `result text references "${name}" (outside file scope) without a locality guard — add G.flags.visited_X or G.location check`, label });
      }
    }
  }
  return violations;
}

module.exports = { checkLocalityCallback, loadLocalityIds };
