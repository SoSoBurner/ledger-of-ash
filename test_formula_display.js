const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    let consoleMsg = '';
    page.on('console', msg => {
      consoleMsg += `[${msg.type()}] ${msg.text()}\n`;
    });
    page.on('error', err => {
      consoleMsg += `[PAGE ERROR] ${err.message}\n`;
    });
    
    const filePath = `file://${path.resolve('dist/index.html')}`;
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));
    
    console.log('Step 1: Clicking Begin...');
    await page.click('#beginBtn');
    await new Promise(r => setTimeout(r, 2000));
    
    console.log('Step 2: Clicking first choice...');
    try {
      await page.click('[data-choice]');
      await new Promise(r => setTimeout(r, 1500));
    } catch (e) {
      console.log('Click error:', e.message);
    }
    
    if (consoleMsg) {
      console.log('\n=== Console Messages ===');
      console.log(consoleMsg);
    }
    
    // Check game state
    const state = await page.evaluate(() => {
      return {
        hasG: typeof G !== 'undefined',
        stage: typeof G !== 'undefined' ? G.stage : null,
        lastRoll: typeof G !== 'undefined' ? G.lastRoll : null
      };
    });
    
    console.log('\n=== Game State ===');
    console.log(JSON.stringify(state, null, 2));
    
  } catch (err) {
    console.error('ERROR:', err.message);
  } finally {
    if (browser) await browser.close();
  }
})();
