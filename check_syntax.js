const fs = require('fs');
const html = fs.readFileSync('./dist/index.html', 'utf8');

// Find the script section
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');

if (scriptStart === -1) {
  console.log('ERROR: No script tag found');
  process.exit(1);
}

const script = html.substring(scriptStart + 8, scriptEnd);

// Try to parse it as JavaScript
try {
  new Function(script);
  console.log('✓ JavaScript syntax is valid');
} catch (e) {
  console.log('✗ Syntax error:', e.message);
  
  // Parse line number from error
  const match = e.message.match(/line (\d+)/i);
  if (match) {
    const lineNum = parseInt(match[1]);
    const lines = script.split('\n');
    
    // Show context around the error
    const start = Math.max(0, lineNum - 3);
    const end = Math.min(lines.length, lineNum + 3);
    
    console.log(`\nContext around line ${lineNum}:`);
    for (let i = start; i < end; i++) {
      const marker = i === lineNum - 1 ? '>>> ' : '    ';
      console.log(`${marker}${i + 1}: ${lines[i].substring(0, 100)}`);
    }
  }
}
