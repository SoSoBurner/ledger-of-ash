#!/usr/bin/env node
/**
 * Audit Skills and Clocks System
 * 
 * Scans for:
 * 1. Undefined skill references
 * 2. Inconsistent clock names
 * 3. Mismatched skill/clock initialization
 * 4. Suggestions for standardization
 */

const fs = require('fs');
const path = require('path');

// Read all JS files
const jsDir = 'js';
const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));

// Collect all references
const skillReferences = new Set();
const clockReferences = new Set();
const skillInitializations = new Set();
const clockInitializations = new Set();

files.forEach(file => {
  const filePath = path.join(jsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find G.skills.* references
  const skillMatches = content.matchAll(/G\.skills\.(\w+)/g);
  for (const match of skillMatches) {
    skillReferences.add(match[1]);
  }
  
  // Find G.worldClocks.* references
  const clockMatches = content.matchAll(/G\.worldClocks\.(\w+)/g);
  for (const match of clockMatches) {
    clockReferences.add(match[1]);
  }
  
  // Find skill initializations (in defaultState or similar)
  const skillInitMatches = content.matchAll(/skills:\s*{([^}]+)}/g);
  for (const match of skillInitMatches) {
    const skillsBlock = match[1];
    const skillNames = skillsBlock.matchAll(/(\w+):/g);
    for (const skillMatch of skillNames) {
      skillInitializations.add(skillMatch[1]);
    }
  }
  
  // Find clock initializations
  const clockInitMatches = content.matchAll(/worldClocks:\s*{([^}]+)}/g);
  for (const match of clockInitMatches) {
    const clocksBlock = match[1];
    const clockNames = clocksBlock.matchAll(/(\w+):/g);
    for (const clockMatch of clockNames) {
      clockInitializations.add(clockMatch[1]);
    }
  }
});

console.log('='.repeat(70));
console.log('SKILLS & CLOCKS AUDIT');
console.log('='.repeat(70) + '\n');

// Sort for consistent output
const sortedSkillRefs = Array.from(skillReferences).sort();
const sortedClockRefs = Array.from(clockReferences).sort();
const sortedSkillInit = Array.from(skillInitializations).sort();
const sortedClockInit = Array.from(clockInitializations).sort();

console.log('SKILLS ANALYSIS');
console.log('-'.repeat(70));
console.log('Skills Referenced in Code:');
sortedSkillRefs.forEach(skill => {
  const status = skillInitializations.has(skill) ? '✓' : '✗ UNDEFINED';
  console.log(`  ${status} ${skill}`);
});

console.log('\nSkills Initialized in defaultState:');
sortedSkillInit.forEach(skill => {
  const referenced = skillReferences.has(skill) ? '✓' : '⚠ UNUSED';
  console.log(`  ${referenced} ${skill}`);
});

// Find mismatches
const undefinedSkills = sortedSkillRefs.filter(s => !skillInitializations.has(s));
const unusedSkills = sortedSkillInit.filter(s => !skillReferences.has(s));

if (undefinedSkills.length > 0) {
  console.log('\n⚠ UNDEFINED SKILLS (Referenced but not initialized):');
  undefinedSkills.forEach(skill => console.log(`  - ${skill}`));
} else {
  console.log('\n✓ All referenced skills are initialized');
}

if (unusedSkills.length > 0) {
  console.log('\n⚠ UNUSED SKILLS (Initialized but never referenced):');
  unusedSkills.forEach(skill => console.log(`  - ${skill}`));
} else {
  console.log('\n✓ No unused skills in initialization');
}

// Clocks analysis
console.log('\n' + '='.repeat(70));
console.log('CLOCKS ANALYSIS');
console.log('-'.repeat(70));
console.log('Clocks Referenced in Code:');
sortedClockRefs.forEach(clock => {
  const status = clockInitializations.has(clock) ? '✓' : '✗ UNDEFINED';
  console.log(`  ${status} ${clock}`);
});

console.log('\nClocks Initialized in defaultState:');
sortedClockInit.forEach(clock => {
  const referenced = clockReferences.has(clock) ? '✓' : '⚠ UNUSED';
  console.log(`  ${referenced} ${clock}`);
});

// Find mismatches
const undefinedClocks = sortedClockRefs.filter(c => !clockInitializations.has(c));
const unusedClocks = sortedClockInit.filter(c => !clockReferences.has(c));

if (undefinedClocks.length > 0) {
  console.log('\n⚠ UNDEFINED CLOCKS (Referenced but not initialized):');
  undefinedClocks.forEach(clock => console.log(`  - ${clock}`));
} else {
  console.log('\n✓ All referenced clocks are initialized');
}

if (unusedClocks.length > 0) {
  console.log('\n⚠ UNUSED CLOCKS (Initialized but never referenced):');
  unusedClocks.forEach(clock => console.log(`  - ${clock}`));
} else {
  console.log('\n✓ No unused clocks in initialization');
}

// Summary
console.log('\n' + '='.repeat(70));
console.log('AUDIT SUMMARY');
console.log('='.repeat(70));
console.log(`Total Skills Referenced: ${sortedSkillRefs.length}`);
console.log(`Total Skills Initialized: ${sortedSkillInit.length}`);
console.log(`Undefined Skills: ${undefinedSkills.length}`);
console.log(`Unused Skills: ${unusedSkills.length}`);
console.log();
console.log(`Total Clocks Referenced: ${sortedClockRefs.length}`);
console.log(`Total Clocks Initialized: ${sortedClockInit.length}`);
console.log(`Undefined Clocks: ${undefinedClocks.length}`);
console.log(`Unused Clocks: ${unusedClocks.length}`);

const totalIssues = undefinedSkills.length + unusedSkills.length + undefinedClocks.length + unusedClocks.length;

if (totalIssues === 0) {
  console.log('\n✓ Skills and clocks system is consistent!');
  process.exit(0);
} else {
  console.log(`\n⚠ Found ${totalIssues} issues requiring standardization`);
  process.exit(0); // Don't fail since this is informational
}
