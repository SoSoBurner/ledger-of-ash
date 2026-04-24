'use strict';
/**
 * Plot continuity validator — runs standalone: node tests/continuity/validate-continuity.js
 * Applies Rules 1–5 across all enriched choice files. Exits 1 on any FAIL.
 */

const fs   = require('fs');
const path = require('path');

const { loadChoicesFromFile } = require('../content/validate-content');
const { checkCanonFence }           = require('./rules/canon-fence');
const { checkNpcFlagTiming }        = require('./rules/npc-encounter-seq');
const { checkNpcCanon, loadKnownNpcs } = require('./rules/npc-canon-check');
const { checkLocalityCallback }     = require('./rules/locality-callback');
const { checkWorldClockTransparency } = require('./rules/worldclock-transparency');

const CONTENT_DIR = path.join(__dirname, '..', '..', 'content');

let errors = 0;
let warns  = 0;

function fail(file, label, msg) {
  console.error(`  FAIL [${path.basename(file)}] ${label ? '"' + label + '"' : ''}: ${msg}`);
  errors++;
}

function warn(file, label, msg) {
  console.warn(`  WARN [${path.basename(file)}] ${label ? '"' + label + '"' : ''}: ${msg}`);
  warns++;
}

function run() {
  const files = fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('_enriched_choices.js') && fs.statSync(path.join(CONTENT_DIR, f)).isFile())
    .map(f => path.join(CONTENT_DIR, f));

  if (files.length === 0) {
    console.error('ERROR: no enriched choice files found in content/');
    process.exit(1);
  }

  console.log(`Running continuity checks on ${files.length} files…\n`);

  const knownNpcs = loadKnownNpcs();

  for (const filePath of files) {
    const filename = path.basename(filePath);
    const src = fs.readFileSync(filePath, 'utf8');

    // Rule 1 — canon fence (raw source scan)
    for (const v of checkCanonFence(filePath, src)) {
      fail(filePath, `line ${v.line}`, v.msg);
    }

    // Load choices for per-choice rules
    const choices = loadChoicesFromFile(filePath);

    for (const choice of choices) {
      if (choice.__invalidJournalCat) continue;
      if (typeof choice.fn !== 'function') continue;

      const label  = choice.label || '(no label)';
      const fnSrc  = choice.fn.toString();

      // Rule 2 — NPC flag timing
      for (const v of checkNpcFlagTiming(fnSrc)) {
        fail(filePath, label, v.msg);
      }

      // Rule 5 — world clock transparency
      const r5 = checkWorldClockTransparency(fnSrc);
      if (r5) warn(filePath, label, r5.msg);
    }

    // Rule 3 — NPC canon check (file-level: counts occurrences across all choices)
    for (const v of checkNpcCanon(choices, knownNpcs)) {
      warn(filePath, '', v.msg);
    }

    // Rule 4 — locality callback guard
    for (const v of checkLocalityCallback(filename, choices)) {
      warn(filePath, v.label || '', v.msg);
    }
  }

  console.log(`\nContinuity check complete.`);
  if (warns  > 0) console.warn(`${warns} warning(s).`);
  if (errors > 0) {
    console.error(`\n${errors} continuity violation(s) found.`);
    process.exit(1);
  } else {
    console.log('All continuity checks passed.');
  }
}

// ─── Stage 3–5 bridge stubs (activate when stage3+ content exists) ───────────

// TODO: Rule 6 — Resolution Branch Wiring
// When Stage 3 content files exist, stage2_climax_resolution must be read in Stage 3 opener.
// Each of 'expose'/'align'/'withdraw' branches must produce materially different Voss encounter text.

// TODO: Rule 7 — Inquisitor Orveth Thread
// If G.flags.stage2_climax_inquisitor_contact is true, Stage 3 content must reference her.

// TODO: Rule 8 — Seld Resolution
// If G.flags.stage2_climax_resolution === 'expose', Stage 3 must reference Seld's fate
// or set a seld_arc_resolved flag. Unresolved disappearances are continuity debt.

run();
