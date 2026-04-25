'use strict';
/**
 * Per-file content review report generator.
 * Usage: node tests/content/review-content.js <content-filename>
 * Output: docs/reviews/<filename>-review.md
 *
 * Baseline (2026-04-24, 45 files): 0 FAIL, 291 WARN
 * All warnings are A2 short-result advisories (content debt, not blockers).
 */

const fs   = require('fs');
const path = require('path');

const {
  extractResultStrings, checkResultWordCount, checkResultOpener,
  extractRumorTexts, checkRumorSource,
  checkNpcFlagTiming, checkWorldClockTransparency,
  loadChoicesFromFile,
} = require('./validate-content');

const CONTENT_DIR = path.join(__dirname, '..', '..', 'content');
const REVIEWS_DIR = path.join(__dirname, '..', '..', 'docs', 'reviews');

function getDate() {
  return new Date().toISOString().slice(0, 10);
}

function truncLabel(label, max = 40) {
  return label.length > max ? label.slice(0, max) + '…' : label;
}

function analyzeFile(filePath) {
  const choices = loadChoicesFromFile(filePath);
  const failures = [];
  const warnings = [];
  const hasResultText = [];
  const hasNpcFlag    = [];
  const hasRumor      = [];
  const hasCombat     = [];

  choices.forEach((choice, idx) => {
    if (choice.__invalidJournalCat) return;
    if (typeof choice.fn !== 'function') return;

    const num      = idx + 1;
    const label    = choice.label || '(no label)';
    const ref      = `choice ${num} "${truncLabel(label)}"`;
    const fnSrc    = choice.fn.toString();

    const results  = extractResultStrings(fnSrc);
    if (results.length > 0) hasResultText.push(num);

    for (const text of results) {
      const r12 = checkResultWordCount(text);
      if (r12 && r12.level === 'fail') failures.push(`FAIL: A1/A2 [${ref}]: ${r12.msg}`);
      if (r12 && r12.level === 'warn') warnings.push(`WARN: A2 [${ref}]: ${r12.msg}`);
      const r3 = checkResultOpener(text);
      if (r3) failures.push(`FAIL: A3 [${ref}]: ${r3.msg}`);
    }

    const rumorTexts = extractRumorTexts(fnSrc);
    if (rumorTexts.length > 0) hasRumor.push(num);
    for (const text of rumorTexts) {
      const r4 = checkRumorSource(text);
      if (r4) failures.push(`FAIL: A4 [${ref}]: ${r4.msg}`);
    }

    const a5 = checkNpcFlagTiming(fnSrc);
    for (const r5 of a5) failures.push(`FAIL: A5 [${ref}]: ${r5.msg}`);

    const r6 = checkWorldClockTransparency(fnSrc);
    if (r6) warnings.push(`WARN: A6 [${ref}]: ${r6.msg}`);

    if (/G\.flags\.met_/.test(fnSrc)) hasNpcFlag.push(num);
    if (/(?:enterCombat|startCombat)\s*\(/.test(fnSrc)) hasCombat.push(num);
  });

  return { failures, warnings, hasResultText, hasNpcFlag, hasRumor, hasCombat };
}

function buildReport(filename, { failures, warnings, hasResultText, hasNpcFlag, hasRumor, hasCombat }) {
  const blocked    = failures.length > 0;
  const statusLine = blocked
    ? '> ⛔ BLOCKED — fix automated failures before human review'
    : '> ✅ Automated gate passed — proceed to human review';

  const fmt  = arr => arr.length === 0 ? 'none' : arr.join(', ');
  const list = (items) => items.length === 0 ? '- (none)' : items.map(i => `- ${i}`).join('\n');

  return `# Content Review — ${filename}
Date: ${getDate()}

${statusLine}

## Automated Gate (Layer A)

### Failures (${failures.length})
${list(failures)}

### Warnings (${warnings.length})
${list(warnings)}

## Human Review Checklist (Layer B)
- [ ] B1 — Scene openings (choices with result text: ${fmt(hasResultText)})
- [ ] B2 — NPC register/tell (NPC-flagged choices: ${fmt(hasNpcFlag)})
- [ ] B3 — Rumor source texture (rumor choices: ${fmt(hasRumor)})
- [ ] B4 — Combat result vividness (combat choices: ${fmt(hasCombat)})
- [ ] B5 — Subtext (NPC scenes: ${fmt(hasNpcFlag)})

## Decision
Status:
Date:
Notes:
`;
}

function run() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: node tests/content/review-content.js <content-filename>');
    process.exit(1);
  }

  const filename = path.basename(arg);
  const filePath = path.isAbsolute(arg) ? arg : path.join(CONTENT_DIR, filename);

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const analysis = analyzeFile(filePath);
  const report   = buildReport(filename, analysis);

  if (!fs.existsSync(REVIEWS_DIR)) fs.mkdirSync(REVIEWS_DIR, { recursive: true });

  const outPath = path.join(REVIEWS_DIR, `${filename}-review.md`);
  fs.writeFileSync(outPath, report, 'utf8');

  const { failures, warnings } = analysis;
  console.log(`${filename}: ${failures.length} FAIL, ${warnings.length} WARN — report saved to docs/reviews/${filename}-review.md`);

  process.exit(failures.length > 0 ? 1 : 0);
}

run();
