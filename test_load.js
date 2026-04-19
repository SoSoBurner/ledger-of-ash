const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    let errors = [];
    page.on('pageerror', err => errors.push(err.toString()));
    
    const filePath = `file://${path.resolve('dist/index.html')}`;
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
    
    if (errors.length) {
      console.log('Errors:', errors);
    }
    
    const result = await page.evaluate(() => {
      return {
        hasG: typeof G !== 'undefined',
        scriptText: document.querySelector('script:not([src])').textContent.substring(0, 200)
      };
    });
    
    console.log('Has G:', result.hasG);
    console.log('First 200 chars of bundled script:');
    console.log(result.scriptText);
    
  } catch (err) {
    console.error('ERROR:', err.message);
  } finally {
    if (browser) await browser.close();
  }
})();
