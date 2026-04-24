'use strict';
// Rule 1: "Ledger of Ash" must not appear in player-facing strings before Stage 4 content.
// Stage 4+ files are exempt. This is a regression guard — the name is not yet revealed.

function checkCanonFence(filePath, src) {
  const filename = require('path').basename(filePath);
  if (/stage[45]/.test(filename)) return [];

  const violations = [];
  const re = /ledger\s+of\s+ash/gi;
  let m;
  while ((m = re.exec(src)) !== null) {
    const line = src.slice(0, m.index).split('\n').length;
    violations.push({ level: 'fail', line, msg: `"Ledger of Ash" named before Stage 4 — canon fence violated` });
  }
  return violations;
}

module.exports = { checkCanonFence };
