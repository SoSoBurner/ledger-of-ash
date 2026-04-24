'use strict';
/**
 * Flag usage validator — runs standalone: node tests/content/validate-flags.js
 * Checks that critical stage-gate flags are only set in their authoritative files.
 */

const fs   = require('fs');
const path = require('path');

const ROOT        = path.join(__dirname, '..', '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const HTML_PATH   = path.join(ROOT, 'ledger-of-ash.html');

let errors = 0;

function fail(msg) {
  console.error(`  FAIL: ${msg}`);
  errors++;
}

function readFile(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
}

// ─── Rule: stage1_narrative_complete must only be SET in stage1_boss.js ──────

function checkStage1Flag() {
  const authoritative = path.join(CONTENT_DIR, 'stage1_boss.js');
  const authSrc = readFile(authoritative);
  if (!authSrc.includes('stage1_narrative_complete')) {
    fail('stage1_boss.js does not set G.flags.stage1_narrative_complete — boss gate is broken');
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.js') && f !== 'stage1_boss.js' && fs.statSync(path.join(CONTENT_DIR, f)).isFile());
  for (const f of files) {
    const src = readFile(path.join(CONTENT_DIR, f));
    // Setting the flag (not just reading it)
    if (/stage1_narrative_complete\s*=\s*true/.test(src)) {
      fail(`${f} sets stage1_narrative_complete (only stage1_boss.js may set this)`);
    }
  }
}

// ─── Rule: stage2_climax_complete must only be SET in stage2_climax.js ───────

function checkStage2ClimaxFlag() {
  const authoritative = path.join(CONTENT_DIR, 'stage2_climax.js');
  const authSrc = readFile(authoritative);
  if (!authSrc.includes('stage2_climax_complete')) {
    fail('stage2_climax.js does not set G.flags.stage2_climax_complete — Stage II climax gate is broken');
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.js') && f !== 'stage2_climax.js' && fs.statSync(path.join(CONTENT_DIR, f)).isFile());
  for (const f of files) {
    const src = readFile(path.join(CONTENT_DIR, f));
    if (/stage2_climax_complete\s*=\s*true/.test(src)) {
      fail(`${f} sets stage2_climax_complete (only stage2_climax.js may set this)`);
    }
  }
}

// ─── Rule: gate flags read in checkStageAdvance / canAdvanceToStage3 ─────────
//     must exist in the authoritative setters above

function checkGateFlagsInitialized() {
  const htmlSrc = readFile(HTML_PATH);

  // Extract flags referenced near checkStageAdvance and canAdvanceToStage3
  // We just check the known required flags are mentioned in G defaults or set before read
  const requiredFlags = [
    'stage1_narrative_complete',
    'stage2_climax_complete',
    'stage2_faction_contact_made',
  ];

  for (const flag of requiredFlags) {
    // Flag must appear somewhere in game logic (either html or content)
    const inHtml    = htmlSrc.includes(flag);
    const inContent = fs.readdirSync(CONTENT_DIR)
      .filter(f => f.endsWith('.js') && fs.statSync(path.join(CONTENT_DIR, f)).isFile())
      .some(f => readFile(path.join(CONTENT_DIR, f)).includes(flag));
    if (!inHtml && !inContent) {
      fail(`Flag "${flag}" is never set anywhere — stage gate will never open`);
    }
  }
}

// ─── Rule: stageProgress increments in content use ++ not direct assignment ──

function checkStageProgressPattern() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.js') && fs.statSync(path.join(CONTENT_DIR, f)).isFile());
  const directAssign = /G\.stageProgress\[\d+\]\s*=\s*\d+/;
  const floorPattern = /Math\.max/;

  for (const f of files) {
    const src = readFile(path.join(CONTENT_DIR, f));
    const lines = src.split('\n');
    lines.forEach((line, i) => {
      if (directAssign.test(line) && !floorPattern.test(line) && !line.trim().startsWith('//')) {
        fail(`${f}:${i + 1}: direct stageProgress assignment without Math.max guard — use G.stageProgress[N]++ or Math.max()`);
      }
    });
  }
}

function run() {
  console.log('Checking stage-gate flag rules…\n');

  checkStage1Flag();
  checkStage2ClimaxFlag();
  checkGateFlagsInitialized();
  checkStageProgressPattern();

  if (errors > 0) {
    console.error(`\n${errors} violation(s) found.`);
    process.exit(1);
  } else {
    console.log('All flag checks passed.');
  }
}

run();
