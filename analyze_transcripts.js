const fs = require('fs');
const path = require('path');

const files = [
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-ledger-of-ash\\a4896e02-d1dc-4dc0-9580-d5aa772817a3\\subagents\\agent-aa9c0e46791dda6db.jsonl',
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-ledger-of-ash\\a4896e02-d1dc-4dc0-9580-d5aa772817a3.jsonl',
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-AppData-Local-Temp\\aa3b527b-af1e-49cd-b127-b7d84f892799.jsonl',
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-AppData-Local-Temp\\0991f7b2-878f-45fd-b9f3-8a890da9068c.jsonl',
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-ledger-of-ash\\8f2d8bd1-09ce-48bb-aa03-3436952a050e.jsonl',
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-AppData-Local-Temp\\b014992a-fabb-4f63-9f31-115797abb2e8.jsonl',
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-ledger-of-ash\\d654fb30-77a7-4641-8230-c6c91f6c3423.jsonl',
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-AppData-Local-Temp\\e55e19a1-d68b-4424-b4aa-0ce4de559319.jsonl',
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-AppData-Local-Temp\\0c783da3-1d05-4812-a818-c0b34d3364ab.jsonl',
  'C:\\Users\\CEO\\.claude\\projects\\C--Users-CEO-ledger-of-ash\\3da3db17-3cb7-46c0-ac48-8c33dde2cfe9.jsonl'
];

const bashCommands = {};
const mcpTools = {};

const autoAllowedBash = new Set([
  'git status', 'git log', 'git diff', 'git show', 'git blame', 'git branch',
  'git tag', 'git remote', 'git ls-files', 'git config', 'git rev-parse',
  'git add', 'git commit', 'git push', 'git checkout',
  'cat', 'head', 'tail', 'wc', 'find', 'ls', 'cd', 'pwd', 'which', 'echo',
  'grep', 'rg', 'node', 'npx', 'jest', 'python', 'mkdir',
  'gh pr view', 'gh pr list', 'gh issue view', 'gh issue list'
]);

const notReadOnly = new Set([
  'git add', 'git commit', 'git push', 'git checkout', 'git merge', 'git rebase',
  'rm', 'mv', 'cp', 'touch', 'nano', 'vi', 'npm install', 'npm i', 'yarn install',
  'pip install', 'brew install', 'apt install', 'git reset', 'git clean'
]);

function extractToolCalls(line) {
  try {
    const obj = JSON.parse(line);
    if (!obj.message || !obj.message.content) return;

    const content = obj.message.content;
    if (!Array.isArray(content)) return;

    content.forEach(item => {
      if (item.type === 'tool_use') {
        const toolName = item.name;

        if (toolName === 'Bash') {
          const cmd = item.input?.command || '';
          if (!cmd) return;

          // Extract leading command (skip env vars, sudo, etc.)
          let clean = cmd.trim();
          clean = clean.replace(/^[A-Z_]+=\S+\s+/, ''); // env vars
          clean = clean.replace(/^sudo\s+/, ''); // sudo
          clean = clean.replace(/^timeout\s+\S+\s+/, ''); // timeout

          // Get first two words (command + subcommand)
          const parts = clean.split(/\s+/);
          let key = parts[0];
          if (parts[1] && !parts[1].startsWith('-')) {
            key = parts[0] + ' ' + parts[1];
          }

          if (key && !notReadOnly.has(key)) {
            bashCommands[key] = (bashCommands[key] || 0) + 1;
          }
        } else if (toolName.startsWith('mcp__')) {
          mcpTools[toolName] = (mcpTools[toolName] || 0) + 1;
        }
      }
    });
  } catch (e) {
    // skip unparseable lines
  }
}

// Read and parse each file
for (const file of files) {
  if (!fs.existsSync(file)) {
    console.error(`File not found: ${file}`);
    continue;
  }
  try {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.trim()) {
        extractToolCalls(line);
      }
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
  }
}

// Sort and filter
const sortedBash = Object.entries(bashCommands)
  .filter(([k, v]) => v >= 3 && !autoAllowedBash.has(k))
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20);

const sortedMcp = Object.entries(mcpTools)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20);

console.log('=== Bash Commands (count >= 3, not auto-allowed) ===');
sortedBash.forEach(([cmd, count]) => {
  console.log(`${cmd.padEnd(40)} ${count}`);
});

console.log('\n=== MCP Tools (top 20) ===');
sortedMcp.forEach(([tool, count]) => {
  console.log(`${tool.padEnd(60)} ${count}`);
});

// Output for integration
console.log('\n=== INTEGRATION (add to permissions.allow) ===');
sortedBash.forEach(([cmd, count]) => {
  if (cmd.includes(' ')) {
    console.log(`"Bash(${cmd} *)",`);
  } else {
    console.log(`"Bash(${cmd})",`);
  }
});
sortedMcp.forEach(([tool, count]) => {
  console.log(`"${tool}",`);
});
