const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    const filePath = `file://${path.resolve('dist/index.html')}`;
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));
    
    // Click Begin
    await page.click('#beginBtn');
    await new Promise(r => setTimeout(r, 2000));
    
    // Make multiple choices to find one that shows rolls
    for (let i = 0; i < 5; i++) {
      console.log(`\n=== Attempt ${i+1} ===`);
      
      const rollInfo = await page.evaluate(() => ({
        hasRoll: !!document.querySelector('.chosenAction'),
        resultHTML: document.getElementById('result')?.innerHTML.slice(0, 200),
        resultCardHTML: document.querySelector('.resultCard')?.innerHTML.slice(0, 400)
      }));
      
      console.log('Has roll UI?', rollInfo.hasRoll);
      if (rollInfo.resultCardHTML) {
        console.log('Result card (first 400 chars):');
        console.log(rollInfo.resultCardHTML);
      }
      
      // Click next choice
      const choices = await page.$$('[data-choice]');
      if (choices.length > 0) {
        console.log(`Clicking choice (${choices.length} available)...`);
        await choices[0].click();
        await new Promise(r => setTimeout(r, 1200));
      }
    }
    
  } catch (err) {
    console.error('ERROR:', err.message);
  } finally {
    if (browser) await browser.close();
  }
})();
