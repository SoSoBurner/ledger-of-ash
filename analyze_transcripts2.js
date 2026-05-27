const fs = require('fs');

const files = [
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-ledger-of-ash\\a4896e02-d1dc-4dc0-9580-d5aa772817a3\\subagents\\agent-aa9c0e46791dda6db.jsonl',
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-ledger-of-ash\\a4896e02-d1dc-4dc0-9580-d5aa772817a3.jsonl',
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-AppData-Local-Temp\\aa3b527b-af1e-49cd-b127-b7d84f892799.jsonl',
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-AppData-Local-Temp\\0991f7b2-878f-45fd-b9f3-8a890da9068c.jsonl',
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-ledger-of-ash\\8f2d8bd1-09ce-48bb-aa03-3436952a050e.jsonl',
];

const allCommands = {};
const mcpTools = {};

function extractBashCommand(cmd) {
  if (!cmd) return null;
  let clean = cmd.trim();
  // Remove leading env vars
  clean = clean.replace(/^[A-Z_]+=\S+\s+/, '');
  // Remove common prefixes
  clean = clean.replace(/^(sudo|timeout\s+\S+)\s+/, '');
  // Extract base command
  const match = clean.match(/^([a-z\-_]+)\s+(.*)$/);
  if (match) {
    return { cmd: match[1], full: clean };
  }
  return { cmd: clean, full: clean };
}

function extractToolCalls(line) {
  try {
    const obj = JSON.parse(line);
    if (!obj.message?.content) return;

    obj.message.content.forEach(item => {
      if (item.type === 'tool_use') {
        if (item.name === 'Bash' && item.input?.command) {
          const parsed = extractBashCommand(item.input.command);
          if (parsed) {
            allCommands[parsed.cmd] = (allCommands[parsed.cmd] || 0) + 1;
          }
        } else if (item.name.startsWith('mcp__')) {
          mcpTools[item.name] = (mcpTools[item.name] || 0) + 1;
        }
      }
    });
  } catch (e) {
    // skip
  }
}

// Read files
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  try {
    const content = fs.readFileSync(file, 'utf-8');
    content.split('\n').forEach(line => {
      if (line.trim()) extractToolCalls(line);
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

// Sort by frequency
const sorted = Object.entries(allCommands)
  .sort((a, b) => b[1] - a[1]);

console.log('=== All Bash Commands by Frequency ===');
sorted.slice(0, 30).forEach(([cmd, count]) => {
  console.log(`${cmd.padEnd(25)} ${count}`);
});

console.log('\n=== MCP Tools ===');
Object.entries(mcpTools).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([tool, count]) => {
  console.log(`${tool.padEnd(60)} ${count}`);
});
