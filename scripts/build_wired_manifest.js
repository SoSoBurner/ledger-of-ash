#!/usr/bin/env node
// Build WIRED_LOCALITIES.json — the source-of-truth diff between authored
// stage1 content and the V34_2 canon locality_packets.
//
// Usage: node scripts/build_wired_manifest.js
// Output: data/reference/WIRED_LOCALITIES.json
//
// Three sets:
//   wired   — authored ∩ canon (locality has both stage1 content AND a canon packet)
//   missing — canon \ authored (canon localities awaiting stage1 content)
//   orphan  — authored \ canon (stage1 content with NO canon packet — likely a typo
//             in the filename or a deprecated/renamed locality)
//
// Orphan list is the high-signal output: anything here is broken or stale.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const PACKETS_DIR = path.join(
  ROOT,
  'data', 'reference', 'V34_2_extracted', 'V34_2_World_Repository',
  'canon', '03_WORLD_OPERATIONAL_ENGINE', 'locality_engine', 'locality_packets'
);
const OUT_PATH = path.join(ROOT, 'data', 'reference', 'WIRED_LOCALITIES.json');

function listLocalities(dir, suffix, ext) {
  if (!fs.existsSync(dir)) {
    console.error(`[wired] missing dir: ${dir}`);
    return new Set();
  }
  const files = fs.readdirSync(dir).filter(f => f.endsWith(suffix + ext));
  return new Set(files.map(f => f.slice(0, f.length - (suffix + ext).length)));
}

// Known content-name → canon-name mappings. Add to this when a new content
// file uses a name that legitimately diverges from a canon packet (composite
// content files, transliteration drift, etc.). Keeps the orphan check
// high-signal — only NEW unexpected orphans fail the build.
const ALIASES = {
  // content/districts_stage1_*.js bundles all Cosmouth wards into one file.
  // Canon has 4 district packets + 2 quarter packets — no umbrella "districts".
  districts: ['aurora_heights_district', 'cindervow_quarter', 'canal_thorn_exchange',
              'ironspool_ward_district', 'maskscar_plaza_district', 'verdant_row_district'],
  // Canon filename has a stray underscore: plume_s_end_outpost.json
  plumes_end_outpost: ['plume_s_end_outpost'],
};

const authored = listLocalities(CONTENT_DIR, '_stage1_enriched_choices', '.js');
const canon = listLocalities(PACKETS_DIR, '', '.json');

function canonMatches(authoredName) {
  if (canon.has(authoredName)) return [authoredName];
  const aliased = ALIASES[authoredName];
  if (aliased && aliased.every(a => canon.has(a))) return aliased;
  return null;
}

const wired = [];
const orphan = [];
const aliasedCanon = new Set();
for (const a of [...authored].sort()) {
  const m = canonMatches(a);
  if (m) {
    wired.push(a);
    m.forEach(x => aliasedCanon.add(x));
  } else {
    orphan.push(a);
  }
}
const missing = [...canon].filter(x => !aliasedCanon.has(x)).sort();

const manifest = {
  generatedAt: new Date().toISOString(),
  canonVersion: 'V34_2_World_Repository',
  counts: { wired: wired.length, missing: missing.length, orphan: orphan.length, canon: canon.size, authored: authored.size },
  wired,
  missing,
  orphan,
  aliases: ALIASES,
};

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(manifest, null, 2) + '\n');

console.log(`[wired] wrote ${path.relative(ROOT, OUT_PATH)}`);
console.log(`[wired]   wired:   ${wired.length}`);
console.log(`[wired]   missing: ${missing.length} (canon localities awaiting stage1 content)`);
console.log(`[wired]   orphan:  ${orphan.length} (authored localities with NO canon packet)`);
if (orphan.length) {
  console.log(`[wired] ORPHAN list — verify these are not typos:\n  ${orphan.join('\n  ')}`);
  process.exit(1);
}
process.exit(0);
