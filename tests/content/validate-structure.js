'use strict';
/**
 * Structure validator — runs standalone: node tests/content/validate-structure.js
 * Checks that every content file is wired into the HTML, no window.G usage,
 * and addJournal calls have correct argument order.
 */

const fs   = require('fs');
const path = require('path');

const ROOT        = path.join(__dirname, '..', '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const HTML_PATH   = path.join(ROOT, 'ledger-of-ash.html');

let errors = 0;
let warnings = 0;

function fail(msg) {
  console.error(`  FAIL: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  WARN: ${msg}`);
  warnings++;
}

function readFile(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
}

// ─── Every content JS file must have a <script> tag in the HTML ──────────────

// Files intentionally excluded from the HTML (reference/dev files, not game content)
const REFERENCE_ONLY = new Set([
  'locality_voice_guide.js', // style reference — per CLAUDE.md, not a dialogue tree
  'npc_dossiers.js',         // NPC reference data, not loaded at runtime
]);

function checkAllContentFilesReferenced() {
  const htmlSrc = readFile(HTML_PATH);
  const contentFiles = fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.js') && !REFERENCE_ONLY.has(f));

  for (const f of contentFiles) {
    if (!htmlSrc.includes(`content/${f}`)) {
      fail(`content/${f} is not referenced by a <script> tag in ledger-of-ash.html`);
    }
  }
}

// ─── No content file may reference window.G ──────────────────────────────────

function checkNoWindowG() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.js') && fs.statSync(path.join(CONTENT_DIR, f)).isFile());
  for (const f of files) {
    const src = readFile(path.join(CONTENT_DIR, f));
    const lines = src.split('\n');
    lines.forEach((line, i) => {
      if (/window\.G\b/.test(line) && !line.trim().startsWith('//')) {
        fail(`content/${f}:${i + 1}: uses window.G — G is let-scoped, window.G is undefined`);
      }
    });
  }
}

// ─── addJournal calls must be addJournal(text, category) — text first ────────
//     A reversed call looks like addJournal('evidence', '...long text...')
//     We heuristically flag calls where arg1 is a known category string.

const VALID_CATS = ['evidence', 'intelligence', 'rumor', 'discovery', 'contact_made', 'complication', 'field_note'];
const CAT_PATTERN = new RegExp(`addJournal\\s*\\(\\s*['"](?:${VALID_CATS.join('|')})['"]`, 'g');

function checkAddJournalArgOrder() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.js') && fs.statSync(path.join(CONTENT_DIR, f)).isFile());
  for (const f of files) {
    const src = readFile(path.join(CONTENT_DIR, f));
    const lines = src.split('\n');
    lines.forEach((line, i) => {
      if (CAT_PATTERN.test(line)) {
        fail(`content/${f}:${i + 1}: addJournal called with category as first arg (reversed) — must be addJournal(text, category)`);
      }
      CAT_PATTERN.lastIndex = 0; // reset regex state
    });
  }

  // Also check HTML inline scripts
  const htmlSrc = readFile(HTML_PATH);
  const htmlLines = htmlSrc.split('\n');
  htmlLines.forEach((line, i) => {
    if (CAT_PATTERN.test(line)) {
      fail(`ledger-of-ash.html:${i + 1}: addJournal called with category as first arg (reversed)`);
    }
    CAT_PATTERN.lastIndex = 0;
  });
}

// ─── All addJournal calls use valid categories ────────────────────────────────

function checkAddJournalCategories() {
  const CAT_CALL_RE = /addJournal\s*\(\s*(?:'[^']*'|"[^"]*")\s*,\s*['"]([^'"]+)['"]/g;
  const files = [
    ...fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.js') && fs.statSync(path.join(CONTENT_DIR, f)).isFile()).map(f => path.join(CONTENT_DIR, f)),
    HTML_PATH,
  ];

  for (const filePath of files) {
    const src = readFile(filePath);
    const base = path.relative(ROOT, filePath);
    let m;
    CAT_CALL_RE.lastIndex = 0;
    while ((m = CAT_CALL_RE.exec(src)) !== null) {
      const cat = m[1];
      if (!VALID_CATS.includes(cat)) {
        const lineNo = src.slice(0, m.index).split('\n').length;
        fail(`${base}:${lineNo}: addJournal uses invalid category "${cat}" (valid: ${VALID_CATS.join(', ')})`);
      }
    }
  }
}

// ─── No duplicate id= attributes in ledger-of-ash.html ───────────────────────

function checkDuplicateIds() {
  const src = readFile(HTML_PATH);
  const freq = {};
  const lines = src.split('\n');
  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) continue;
    const re = /\bid=["']([^"']+)["']/g;
    let m;
    while ((m = re.exec(line)) !== null) {
      const id = m[1];
      freq[id] = (freq[id] || 0) + 1;
    }
  }
  for (const [id, count] of Object.entries(freq)) {
    if (count > 1) fail(`ledger-of-ash.html: duplicate id="${id}" appears ${count} times`);
  }
}

// ─── innerHTML += on render containers may accumulate across re-renders ───────

function checkInnerHTMLAccumulation() {
  const src = readFile(HTML_PATH);
  const lines = src.split('\n');
  const CONTAINERS = [
    '#action-content', '#story-output', '.env-desc',
    '.result-text', '.narrative-text', '#quest-list', '#journal-overlay-body',
  ];
  const accRe = /innerHTML\s*\+=/;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!accRe.test(line)) continue;
    const lineNo = i + 1;
    const isContainer = CONTAINERS.some(sel => line.includes(sel.replace(/[#.]/g, '')));
    if (isContainer) {
      warn(`ledger-of-ash.html:${lineNo}: innerHTML += on known render container — may accumulate across re-renders`);
    }
  }
}

function run() {
  console.log('Checking content file structure…\n');

  checkAllContentFilesReferenced();
  checkNoWindowG();
  checkAddJournalArgOrder();
  checkAddJournalCategories();
  checkDuplicateIds();
  checkInnerHTMLAccumulation();

  if (errors > 0) {
    console.error(`\n${errors} violation(s) found.`);
    process.exit(1);
  } else {
    if (warnings > 0) console.warn(`\n${warnings} warning(s).`);
    console.log('All structure checks passed.');
  }
}

run();
