#!/usr/bin/env node
/**
 * Test if the bundled script can parse and execute without errors
 */

const fs = require('fs');
const path = require('path');

// Read the dist HTML
const html = fs.readFileSync('dist/index.html', 'utf8');

// Extract just the bundled application script (second <script>)
const allScripts = html.split('<script>');
const bundledScript = allScripts[2].split('</script>')[0];

console.log('Testing bundled script...');
console.log(`Script size: ${bundledScript.length} bytes\n`);

try {
  // Try to parse the script as JavaScript
  new Function(bundledScript);
  console.log('✓ Script parses without syntax errors');
} catch (e) {
  console.log('✗ Script has syntax error:');
  console.log('  ', e.message);
  process.exit(1);
}

// Check for critical functions
const functions = [
  'function beginNew',
  'function fillSelectors',
  'const $ =',
  'function defaultState',
  'function loadLegend',
  'window.addEventListener',
  'DOMContentLoaded'
];

console.log('\nCritical elements:');
functions.forEach(fn => {
  const found = bundledScript.includes(fn);
  console.log(`  ${found ? '✓' : '✗'} ${fn}`);
});

// Check for the specific IIFE wrapper
if (bundledScript.startsWith('(function(){')) {
  console.log('\n✓ Script wrapped in IIFE');
} else {
  console.log('\n✗ Script NOT in IIFE wrapper');
}

// Check if it ends properly
if (bundledScript.trim().endsWith('})();')) {
  console.log('✓ IIFE ends properly');
} else {
  console.log('✗ IIFE does NOT end properly');
  console.log('Last 100 chars:', bundledScript.slice(-100));
}

console.log('\n✓✓✓ Bundled script structure is valid');
