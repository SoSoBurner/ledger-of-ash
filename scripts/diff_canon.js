#!/usr/bin/env node
// Diff two canon snapshots — reports added/removed/changed files across the
// V-version boundary. Run after dropping a new V## zip to see what shifted.
//
// Usage:
//   node scripts/diff_canon.js <oldDir> <newDir> [--subtree=relative/path]
//
// Defaults (when run without args) compare the in-tree V33_2 lineage baseline
// inside V34_2 against V34_2's current canon. Set explicit dirs when comparing
// a future V35 against V34_2.
//
// Output: human-readable summary to stdout; per-file change list to stderr.
// Compares by relative path AND content hash (sha256). Same-path-different-hash
// = "changed". Different-path = "added"/"removed".

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const V34 = path.join(
  ROOT, 'data', 'reference', 'V34_2_extracted', 'V34_2_World_Repository'
);
const V33_IN_V34 = path.join(V34, 'canon', '10_LINEAGE_HISTORY', 'V33_2_DnD_Repository_baseline');

const args = process.argv.slice(2);
let subtree = '';
const positional = [];
for (const a of args) {
  if (a.startsWith('--subtree=')) subtree = a.slice('--subtree='.length);
  else positional.push(a);
}
const oldDir = positional[0] || V33_IN_V34;
const newDir = positional[1] || path.join(V34, 'canon');

function walk(root, sub) {
  const start = sub ? path.join(root, sub) : root;
  const out = new Map();
  if (!fs.existsSync(start)) return out;
  const stack = [start];
  while (stack.length) {
    const d = stack.pop();
    let entries;
    try { entries = fs.readdirSync(d, { withFileTypes: true }); } catch (_) { continue; }
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.isFile()) {
        const rel = path.relative(start, p).replace(/\\/g, '/');
        const h = crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex').slice(0, 16);
        out.set(rel, h);
      }
    }
  }
  return out;
}

console.log(`[diff] old: ${path.relative(ROOT, oldDir)}${subtree ? '/' + subtree : ''}`);
console.log(`[diff] new: ${path.relative(ROOT, newDir)}${subtree ? '/' + subtree : ''}`);

const oldMap = walk(oldDir, subtree);
const newMap = walk(newDir, subtree);

const added = [];
const removed = [];
const changed = [];
for (const [rel, h] of newMap) {
  if (!oldMap.has(rel)) added.push(rel);
  else if (oldMap.get(rel) !== h) changed.push(rel);
}
for (const rel of oldMap.keys()) {
  if (!newMap.has(rel)) removed.push(rel);
}
added.sort(); removed.sort(); changed.sort();

console.log(`[diff] added:   ${added.length}`);
console.log(`[diff] removed: ${removed.length}`);
console.log(`[diff] changed: ${changed.length}`);
console.log(`[diff] (old: ${oldMap.size} files, new: ${newMap.size} files)`);

if (added.length)   process.stderr.write('\n[ADDED]\n  ' + added.join('\n  ') + '\n');
if (removed.length) process.stderr.write('\n[REMOVED]\n  ' + removed.join('\n  ') + '\n');
if (changed.length) process.stderr.write('\n[CHANGED]\n  ' + changed.join('\n  ') + '\n');
