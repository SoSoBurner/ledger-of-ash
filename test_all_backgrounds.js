#!/usr/bin/env node
/**
 * Playtest Harness: Test all 93 backgrounds to Stage 2
 * 
 * Requirements: npm install puppeteer
 * Run: node test_all_backgrounds.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const GAME_PATH = `file://${path.resolve(__dirname, 'dist', 'index.html')}`;
const RESULTS_FILE = 'playtest_results.json';

const results = {
  timestamp: new Date().toISOString(),
  totalBackgrounds: 0,
  successfulPlaytests: 0,
  failedPlaytests: 0,
  failures: [],
  details: []
};

// Get list of all backgrounds from the game data
async function getAllBackgrounds(page) {
  return await page.evaluate(() => {
    const backgrounds = [];
    if (window.ARCHETYPES && window.BACKGROUNDS) {
      for (const arch of window.ARCHETYPES) {
        const archId = arch.id;
        const bgs = window.BACKGROUNDS[archId] || [];
        for (const bg of bgs) {
          backgrounds.push({
            archetype: archId,
            archetypeName: arch.name,
            backgroundId: bg.id,
            flavor: bg.flavor,
            originLocality: bg.originLocality
          });
        }
      }
    }
    return backgrounds;
  });
}

// Play through a single background to Stage 2
async function playtestBackground(page, archetype, backgroundId) {
  try {
    // Clear localStorage and start fresh
    await page.evaluate(() => localStorage.clear());
    await page.goto(GAME_PATH, { waitUntil: 'networkidle2' });
    
    // Verify page loaded
    await page.waitForFunction(() => window.ARCHETYPES && window.BACKGROUNDS, { timeout: 5000 });
    
    // Fill in creation form
    await page.evaluate((arch) => {
      document.getElementById('newName').value = 'TestChar';
      document.getElementById('newCode').value = 'TEST';
      document.getElementById('archSelect').value = arch;
      document.getElementById('archSelect').dispatchEvent(new Event('change', { bubbles: true }));
    }, archetype);
    
    await new Promise(r => setTimeout(r, 300));
    
    // Set background
    await page.evaluate((bgId) => {
      document.getElementById('bgSelect').value = bgId;
      document.getElementById('bgSelect').dispatchEvent(new Event('change', { bubbles: true }));
    }, backgroundId);
    
    await new Promise(r => setTimeout(r, 300));
    
    // Click Begin Legend button
    await page.click('#beginBtn');
    await new Promise(r => setTimeout(r, 500));
    
    // Verify game started
    const startInfo = await page.evaluate(() => ({
      stage: window.G?.stage,
      name: window.G?.name,
      backgroundId: window.G?.backgroundId,
      location: window.G?.location,
      level: window.G?.level
    }));
    
    if (!startInfo.stage || startInfo.stage < 1) {
      return {
        success: false,
        message: 'Failed to initialize game',
        backgroundId: backgroundId,
        archetype: archetype
      };
    }
    
    // Simulate Stage 1 progression: make 10+ choices to advance
    for (let i = 0; i < 10; i++) {
      await page.waitForSelector('button.choice', { timeout: 5000 });
      const buttons = await page.$$('button.choice');
      if (buttons.length > 0) {
        // Pick first choice
        await buttons[0].click();
        await new Promise(r => setTimeout(r, 400));
        
        // Check if we've reached Stage 2
        const stage = await page.evaluate(() => window.G?.stage || 0);
        if (stage >= 2) {
          const finalLevel = await page.evaluate(() => window.G?.level || 0);
          return {
            success: true,
            message: `Reached Stage 2 after ${i + 1} actions (Level ${finalLevel})`,
            stage: stage,
            level: finalLevel,
            backgroundId: backgroundId,
            archetype: archetype
          };
        }
      }
    }
    
    // Check final stage
    const finalData = await page.evaluate(() => ({
      stage: window.G?.stage || 0,
      level: window.G?.level || 0,
      stageProgress: window.G?.stageProgress || []
    }));
    
    if (finalData.stage >= 2) {
      return {
        success: true,
        message: `Reached Stage 2 (Level ${finalData.level})`,
        stage: finalData.stage,
        level: finalData.level,
        backgroundId: backgroundId,
        archetype: archetype
      };
    } else {
      return {
        success: false,
        message: `Did not reach Stage 2 (Stage ${finalData.stage}, Level ${finalData.level}, Progress: ${JSON.stringify(finalData.stageProgress)})`,
        stage: finalData.stage,
        level: finalData.level,
        backgroundId: backgroundId,
        archetype: archetype
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Error: ${error.message}`,
      backgroundId: backgroundId,
      archetype: archetype,
      error: error.message
    };
  }
}

// Main test runner
async function runAllPlaytests() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    page.setViewport({ width: 1920, height: 1080 });
    
    // Load game and get backgrounds
    await page.goto(GAME_PATH, { waitUntil: 'networkidle2' });
    const backgrounds = await getAllBackgrounds(page);
    
    results.totalBackgrounds = backgrounds.length;
    console.log(`\n🎮 Starting Playtest Suite: ${backgrounds.length} Backgrounds`);
    console.log(`📍 Testing all backgrounds to Stage 2\n`);
    
    // Test each background
    let tested = 0;
    for (const bg of backgrounds) {
      tested++;
      const progress = `[${tested}/${backgrounds.length}]`;
      process.stdout.write(`\r${progress} Testing ${bg.archetypeName} - ${bg.flavor}...`);
      
      const result = await playtestBackground(page, bg.archetype, bg.backgroundId);
      
      results.details.push({
        ...bg,
        ...result
      });
      
      if (result.success) {
        results.successfulPlaytests++;
        process.stdout.write(` ✓\n`);
      } else {
        results.failedPlaytests++;
        results.failures.push({
          backgroundId: bg.backgroundId,
          archetype: bg.archetype,
          message: result.message
        });
        process.stdout.write(` ✗\n`);
      }
    }
    
    // Write results
    fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
    
    // Summary
    console.log(`\n${'='.repeat(60)}`);
    console.log(`PLAYTEST SUMMARY`);
    console.log(`${'='.repeat(60)}`);
    console.log(`✓ Successful: ${results.successfulPlaytests}/${results.totalBackgrounds}`);
    console.log(`✗ Failed: ${results.failedPlaytests}/${results.totalBackgrounds}`);
    console.log(`Pass Rate: ${((results.successfulPlaytests / results.totalBackgrounds) * 100).toFixed(1)}%`);
    
    if (results.failures.length > 0) {
      console.log(`\n⚠️  Failed Backgrounds:`);
      results.failures.forEach(f => {
        console.log(`  • ${f.backgroundId} (${f.archetype}): ${f.message}`);
      });
    }
    
    console.log(`\n📊 Full results saved to: ${RESULTS_FILE}\n`);
    
  } finally {
    await browser.close();
  }
}

// Run if executed directly
if (require.main === module) {
  runAllPlaytests().catch(error => {
    console.error('Playtest suite failed:', error);
    process.exit(1);
  });
}

module.exports = { playtestBackground, getAllBackgrounds };
