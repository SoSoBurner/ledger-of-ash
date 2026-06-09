const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');
const files = fs.readdirSync(contentDir)
  .filter(f => f.endsWith('.js') && fs.statSync(path.join(contentDir, f)).isFile());

let stripCount = 0;
const stripped = [];

files.forEach(f => {
  const p = path.join(contentDir, f);
  const b = fs.readFileSync(p);

  // Check for UTF-8 BOM: \xEF\xBB\xBF
  if (b[0] === 0xEF && b[1] === 0xBB && b[2] === 0xBF) {
    fs.writeFileSync(p, b.slice(3));
    stripCount++;
    stripped.push(f);
    console.log('stripped:', f);
  }
});

console.log('\n=== BOM STRIP SUMMARY ===');
console.log('Files stripped:', stripCount);
if (stripped.length > 0) {
  console.log('Files affected:');
  stripped.forEach(f => console.log('  - ' + f));
}
