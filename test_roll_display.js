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
    
    // Make one choice to trigger a roll
    const firstChoice = await page.$('[data-choice]');
    if (firstChoice) {
      console.log('Clicking first choice...');
      await firstChoice.click();
      await new Promise(r => setTimeout(r, 1000));
    }
    
    // Get the roll display
    const rollDisplay = await page.evaluate(() => {
      const result = document.getElementById('result');
      return result ? result.innerText : 'result element not found';
    });
    
    console.log('\n=== Roll Display ===');
    console.log(rollDisplay);
    
    // Get the full chosen action section
    const chosenSection = await page.evaluate(() => {
      const chosen = document.querySelector('.chosenAction');
      const pills = document.querySelectorAll('.pill');
      return {
        action: chosen ? chosen.textContent : 'not found',
        pills: Array.from(pills).map(p => p.textContent),
        fullHTML: document.querySelector('.resultCard').innerHTML.slice(0, 500)
      };
    });
    
    console.log('\n=== Roll Summary ===');
    console.log('Action:', chosenSection.action);
    console.log('Pills:', chosenSection.pills);
    console.log('\nResult card HTML (first 500 chars):');
    console.log(chosenSection.fullHTML);
    
  } catch (err) {
    console.error('ERROR:', err.message);
  } finally {
    if (browser) await browser.close();
  }
})();
