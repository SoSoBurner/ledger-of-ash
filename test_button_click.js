#!/usr/bin/env node
/**
 * Test that the Begin Legend button actually works when clicked
 */

const puppeteer = require('puppeteer');
const path = require('path');

const GAME_PATH = `file://${path.resolve(__dirname, 'dist', 'index.html')}`;

async function testButtonClick() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Enable console logging to catch errors
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.error('PAGE ERROR:', msg.text());
    }
  });
  
  page.on('error', (err) => {
    console.error('PAGE CRASH:', err);
  });
  
  try {
    console.log('Loading game at:', GAME_PATH);
    await page.goto(GAME_PATH, { waitUntil: 'networkidle0', timeout: 10000 });
    
    console.log('✓ Page loaded');
    
    // Wait for page to be fully initialized
    await page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {});
    await new Promise(r => setTimeout(r, 1000));
    
    // Fill in the character name
    await page.type('#newName', 'TestChar');
    console.log('✓ Filled name');
    
    // Select archetype
    await page.select('#archSelect', 'warrior');
    console.log('✓ Selected archetype');
    
    // Wait for backgrounds to load
    await new Promise(r => setTimeout(r, 500));
    
    // Select background  
    await page.select('#bgSelect', 'warrior_civic');
    console.log('✓ Selected background');
    
    // Click the Begin Legend button
    console.log('Clicking Begin Legend button...');
    await page.click('#beginBtn');
    
    // Wait for the game to load
    await new Promise(r => setTimeout(r, 2000));
    
    // Check if we're now in the game (game screen should be visible, start screen should be hidden)
    const gameScreenVisible = await page.evaluate(() => {
      const ss = document.getElementById('startScreen');
      const gs = document.getElementById('gameSection');
      return {
        startScreenDisplay: ss ? window.getComputedStyle(ss).display : 'N/A',
        gameScreenActive: gs ? gs.classList.contains('active') : false,
        gameScreenDisplay: gs ? window.getComputedStyle(gs).display : 'N/A'
      };
    });
    
    console.log('Game screen state:', gameScreenVisible);
    
    // Check if character name is set in the game
    // Since G is inside the IIFE closure, we can't access it directly
    // Instead, check that the game screen is now visible and start screen is hidden
    if (gameScreenVisible.gameScreenActive && gameScreenVisible.startScreenDisplay === 'none') {
      console.log('✅ SUCCESS: Begin Legend button works! Game screen is now active');
      return true;
    } else {
      console.error('❌ FAILED: Character state not set correctly');
      console.error('Expected: name=TestChar, archetype=warrior');
      console.error('Got:', characterState);
      return false;
    }
    
  } catch (e) {
    console.error('❌ TEST FAILED:', e.message);
    return false;
  } finally {
    await browser.close();
  }
}

testButtonClick().then(success => {
  process.exit(success ? 0 : 1);
});
