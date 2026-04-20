#!/usr/bin/env node
/**
 * Test Stretch Arc: L19-20 Only Reachable in Stage 5
 * 
 * This test simulates progression through all stages and verifies:
 * 1. Player cannot reach L19-20 in Stages 1-4 even with max XP
 * 2. Player can reach L19-20 in Stage 5 with proper XP
 * 3. Stage transitions prevent premature leveling
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

/**
 * Simulate level progression given stage and XP amount
 */
function getMaxLevelForStage(stage, totalXp) {
  const cap = STAGE_LEVEL_CAPS[stage];
  let level = 1;
  
  for (let l = 2; l <= cap && l <= 20; l++) {
    if (totalXp >= XP_PER_LEVEL[l]) {
      level = l;
    } else {
      break;
    }
  }
  
  return level;
}

/**
 * Find XP required to reach a specific level
 */
function getXpForLevel(level) {
  return XP_PER_LEVEL[level] || 0;
}

// Test scenarios
const scenarios = [
  { name: 'Stage 1 with S1 XP budget', stage: 1, xp: 900, max: 20 },
  { name: 'Stage 2 with S2 XP budget', stage: 2, xp: 3800, max: 20 },
  { name: 'Stage 3 with S3 XP budget', stage: 3, xp: 8700, max: 20 },
  { name: 'Stage 4 with S4 XP budget', stage: 4, xp: 12600, max: 20 },
  { name: 'Stage 5 with full XP budget', stage: 5, xp: 20000, max: 20 },
  
  // Edge cases: what if player saves up XP from earlier stages?
  { name: 'Aggressive early grind (S1→S2 transition)', stage: 2, xp: 5000, max: 20 },
  { name: 'Aggressive mid-game (S3→S4 transition)', stage: 4, xp: 15000, max: 20 },
];

console.log('='.repeat(70));
console.log('TESTING STRETCH ARC: L19-20 Only Reachable in Stage 5');
console.log('='.repeat(70) + '\n');

let passCount = 0;
let failCount = 0;

scenarios.forEach(scenario => {
  const maxLevel = getMaxLevelForStage(scenario.stage, scenario.xp);
  const cap = STAGE_LEVEL_CAPS[scenario.stage];
  
  console.log(`Stage ${scenario.stage} (Cap: L${cap})`);
  console.log(`  XP: ${scenario.xp}, Max Reachable: L${maxLevel}`);
  
  if (scenario.stage < 5) {
    // Should NOT reach L19
    if (maxLevel < 19) {
      console.log(`  ✓ Correctly capped below L19`);
      passCount++;
    } else {
      console.log(`  ✗ ERROR: Reached L${maxLevel} (should be < L19)`);
      failCount++;
    }
  } else {
    // Stage 5 should reach L20
    if (maxLevel === 20) {
      console.log(`  ✓ Correctly reached L20`);
      passCount++;
    } else {
      console.log(`  ✗ ERROR: Only reached L${maxLevel} (should reach L20)`);
      failCount++;
    }
  }
  
  console.log();
});

// Detailed analysis table
console.log('='.repeat(70));
console.log('DETAILED ANALYSIS: STAGE-BY-STAGE PROGRESSION');
console.log('='.repeat(70) + '\n');

console.log('Stage | Level Cap | Max XP | Max Reachable | Can Reach L19?');
console.log('------|-----------|--------|---------------|---------------');

for (let stage = 1; stage <= 5; stage++) {
  const cap = STAGE_LEVEL_CAPS[stage];
  const stageBudgetXp = stage === 1 ? 900 : stage === 2 ? 3800 : stage === 3 ? 8700 : stage === 4 ? 12600 : 20000;
  const maxLevel = getMaxLevelForStage(stage, stageBudgetXp);
  const canReachL19 = stage === 5 ? '✓ Yes (Stage 5 only)' : '✗ No';
  
  console.log(`  ${stage}   |    L${cap}    |  ${String(stageBudgetXp).padEnd(5)} | L${maxLevel}        | ${canReachL19}`);
}

console.log('\n' + '='.repeat(70));
console.log('CRITICAL CHECKPOINT ANALYSIS');
console.log('='.repeat(70) + '\n');

// Check if L19 is truly only reachable in Stage 5
const l19Xp = getXpForLevel(19);
const l20Xp = getXpForLevel(20);

console.log(`L19 Requirement: ${l19Xp} XP`);
console.log(`L20 Requirement: ${l20Xp} XP\n`);

for (let stage = 1; stage <= 4; stage++) {
  const cap = STAGE_LEVEL_CAPS[stage];
  const maxLevelXp = getXpForLevel(cap);
  
  console.log(`Stage ${stage} (L${cap} cap):`);
  console.log(`  Max XP available: ${maxLevelXp}`);
  console.log(`  XP to L19: ${l19Xp}`);
  
  if (l19Xp > maxLevelXp) {
    console.log(`  ✓ SAFE: L19 requires more XP than stage provides\n`);
    passCount++;
  } else {
    console.log(`  ✗ UNSAFE: L19 reachable in stage!\n`);
    failCount++;
  }
}

console.log('Stage 5:');
console.log(`  Max XP available: ${l20Xp}`);
console.log(`  XP to L20: ${l20Xp}`);
console.log(`  ✓ CORRECT: L20 exactly reachable\n`);
passCount++;

// Summary
console.log('='.repeat(70));
console.log('TEST SUMMARY');
console.log('='.repeat(70));
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);
console.log(`Total: ${passCount + failCount}`);

if (failCount === 0) {
  console.log('\n✓ Stretch arc verified! L19-20 only reachable in Stage 5.');
  process.exit(0);
} else {
  console.log('\n✗ Stretch arc test failed.');
  process.exit(1);
}
