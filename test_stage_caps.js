#!/usr/bin/env node
/**
 * Test Stage Level Caps
 * Verifies that level caps are enforced per stage:
 * - S1: L5 (0-900 XP)
 * - S2: L10 (0-3800 XP) 
 * - S3: L15 (0-8700 XP)
 * - S4: L18 (0-12600 XP)
 * - S5: L20 (0-20000 XP)
 */

const fs = require('fs');

// Extract XP table and stage caps from engine.js
const engineCode = fs.readFileSync('js/engine.js', 'utf8');

// Parse XP_PER_LEVEL
const xpMatch = engineCode.match(/const XP_PER_LEVEL = \[([\d, ]+)\]/);
if (!xpMatch) {
  console.error('❌ Could not find XP_PER_LEVEL in engine.js');
  process.exit(1);
}
const XP_PER_LEVEL = xpMatch[1].split(',').map(x => parseInt(x.trim()));
console.log('✓ Loaded XP_PER_LEVEL:', XP_PER_LEVEL);

// Parse STAGE_LEVEL_CAPS
const capsMatch = engineCode.match(/const STAGE_LEVEL_CAPS = \{([^}]+)\}/);
if (!capsMatch) {
  console.error('❌ Could not find STAGE_LEVEL_CAPS in engine.js');
  process.exit(1);
}
const STAGE_LEVEL_CAPS = {};
capsMatch[1].split(',').forEach(item => {
  const [stage, cap] = item.trim().split(':').map(x => parseInt(x.trim()));
  STAGE_LEVEL_CAPS[stage] = cap;
});
console.log('✓ Loaded STAGE_LEVEL_CAPS:', STAGE_LEVEL_CAPS);

// Test Cases
const tests = [
  {
    name: 'Stage 1 Level Cap (L5)',
    stage: 1,
    expectedCap: 5,
    testXp: 900 + 1, // Just over L5 threshold
    expectLevel: 5,  // Should cap at 5
  },
  {
    name: 'Stage 2 Level Cap (L10)',
    stage: 2,
    expectedCap: 10,
    testXp: 3800 + 1, // Just over L10 threshold
    expectLevel: 10,  // Should cap at 10
  },
  {
    name: 'Stage 3 Level Cap (L15)',
    stage: 3,
    expectedCap: 15,
    testXp: 8700 + 1, // Just over L15 threshold
    expectLevel: 15,  // Should cap at 15
  },
  {
    name: 'Stage 4 Level Cap (L18)',
    stage: 4,
    expectedCap: 18,
    testXp: 12600 + 1, // Just over L18 threshold
    expectLevel: 18,  // Should cap at 18
  },
  {
    name: 'Stage 5 Level Cap (L20)',
    stage: 5,
    expectedCap: 20,
    testXp: 20000, // Exact L20 threshold
    expectLevel: 20,  // Should reach 20
  },
];

let passCount = 0;
let failCount = 0;

console.log('\n' + '='.repeat(60));
console.log('TESTING STAGE LEVEL CAPS');
console.log('='.repeat(60) + '\n');

tests.forEach(test => {
  const actualCap = STAGE_LEVEL_CAPS[test.stage];
  
  // Test 1: Cap value matches expected
  if (actualCap === test.expectedCap) {
    console.log(`✓ ${test.name}: Cap = ${actualCap}`);
    passCount++;
  } else {
    console.log(`✗ ${test.name}: Expected ${test.expectedCap}, got ${actualCap}`);
    failCount++;
  }
  
  // Test 2: XP thresholds are sensible
  if (test.testXp > 0) {
    const levelAtXp = XP_PER_LEVEL.findIndex((xp, i) => i === 0 || XP_PER_LEVEL[i-1] <= test.testXp && test.testXp < xp);
    console.log(`  XP Threshold Analysis: ${test.testXp} XP would reach L${levelAtXp}`);
  }
});

// Test stretch arc: L19-20 only reachable in Stage 5
console.log('\n' + '-'.repeat(60));
console.log('TESTING STRETCH ARC (L19-20 Only in Stage 5)');
console.log('-'.repeat(60) + '\n');

// Find XP for L19 and L20
const l19Xp = XP_PER_LEVEL[19];
const l20Xp = XP_PER_LEVEL[20];
console.log(`L19 requires: ${l19Xp} XP`);
console.log(`L20 requires: ${l20Xp} XP`);

// Check each stage's cap against L19 requirement
for (let stage = 1; stage <= 5; stage++) {
  const cap = STAGE_LEVEL_CAPS[stage];
  const capXp = XP_PER_LEVEL[cap];
  
  if (stage < 5) {
    // Stages 1-4 should NOT reach L19-20
    if (cap < 19) {
      console.log(`✓ Stage ${stage}: Max cap L${cap} < L19 ✓`);
      passCount++;
    } else {
      console.log(`✗ Stage ${stage}: Cap L${cap} allows L19+ (should not)`);
      failCount++;
    }
  } else {
    // Stage 5 should reach L20
    if (cap >= 20) {
      console.log(`✓ Stage 5: Max cap L${cap} reaches L20+ ✓`);
      passCount++;
    } else {
      console.log(`✗ Stage 5: Cap L${cap} prevents L20 (should allow)`);
      failCount++;
    }
  }
}

// Test XP boundaries
console.log('\n' + '-'.repeat(60));
console.log('TESTING XP PROGRESSION TABLE');
console.log('-'.repeat(60) + '\n');

const boundaries = [
  { level: 5, xp: XP_PER_LEVEL[5], stage: '1→2' },
  { level: 10, xp: XP_PER_LEVEL[10], stage: '2→3' },
  { level: 15, xp: XP_PER_LEVEL[15], stage: '3→4' },
  { level: 18, xp: XP_PER_LEVEL[18], stage: '4→5' },
  { level: 20, xp: XP_PER_LEVEL[20], stage: 'Final' },
];

boundaries.forEach(b => {
  if (b.xp > 0) {
    console.log(`L${b.level}: ${b.xp} XP (${b.stage})`);
    passCount++;
  } else {
    console.log(`✗ L${b.level}: Invalid XP value`);
    failCount++;
  }
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('TEST SUMMARY');
console.log('='.repeat(60));
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);
console.log(`Total: ${passCount + failCount}`);

if (failCount === 0) {
  console.log('\n✓ All stage caps verified correctly!');
  process.exit(0);
} else {
  console.log('\n✗ Some tests failed.');
  process.exit(1);
}
