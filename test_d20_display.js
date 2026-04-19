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
    
    console.log('Step 1: Clicking Begin...');
    await page.click('#beginBtn');
    await new Promise(r => setTimeout(r, 1500));
    
    console.log('Step 2: Clicking first choice...');
    await page.click('[data-choice]');
    await new Promise(r => setTimeout(r, 1500));
    
    const rolls = await page.evaluate(() => {
      const html = document.body.innerHTML;
      const matches = html.match(/d20[^<]*/g);
      return matches ? matches.slice(0, 5) : [];
    });
    
    console.log('Found d20 references:', rolls);
    console.log('Done!');
    
  } catch (err) {
    console.error('ERROR:', err.message);
  } finally {
    if (browser) await browser.close();
  }
})();
