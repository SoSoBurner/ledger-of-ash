#!/usr/bin/env python3
import json
import os
import glob
from collections import defaultdict

project_dir = os.path.expanduser("~/.claude/projects/C--Users-CEO-ledger-of-ash")
files = sorted(glob.glob(f"{project_dir}/*.jsonl"), key=os.path.getmtime, reverse=True)[:20]

bash_commands = defaultdict(int)
mcp_tools = defaultdict(int)

auto_allowed_bash = {
    'git', 'cat', 'head', 'tail', 'wc', 'find', 'ls', 'cd', 'pwd', 'which', 'echo',
    'grep', 'rg', 'node', 'npx', 'jest', 'python', 'python3', 'mkdir', 'sleep', 'for'
}

not_readonly = {
    'git add', 'git commit', 'git push', 'git checkout', 'git merge', 'git rebase', 'git reset',
    'rm', 'mv', 'cp', 'touch', 'nano', 'vi', 'npm install', 'pip install', 'git clean'
}

for filepath in files:
    if not os.path.exists(filepath):
        continue
    try:
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            for line in f:
                try:
                    obj = json.loads(line.strip())
                    if obj.get('type') == 'assistant':
                        for content in obj.get('message', {}).get('content', []):
                            if content.get('type') == 'tool_use':
                                tool_name = content.get('name', '')

                                if tool_name == 'Bash':
                                    cmd = content.get('input', {}).get('command', '').strip()
                                    if not cmd:
                                        continue

                                    # Parse command
                                    parts = cmd.split()
                                    if not parts:
                                        continue

                                    # Skip env var prefixes
                                    idx = 0
                                    while idx < len(parts) and '=' in parts[idx]:
                                        idx += 1

                                    if idx >= len(parts):
                                        continue

                                    base_cmd = parts[idx]

                                    # Build key (base + subcommand if present)
                                    if idx + 1 < len(parts) and not parts[idx + 1].startswith('-'):
                                        key = f"{base_cmd} {parts[idx + 1]}"
                                    else:
                                        key = base_cmd

                                    # Filter
                                    if key not in auto_allowed_bash and key not in not_readonly:
                                        bash_commands[key] += 1

                                elif tool_name.startswith('mcp__'):
                                    mcp_tools[tool_name] += 1

                except json.JSONDecodeError:
                    pass
                except Exception as e:
                    pass
    except Exception as e:
        print(f"Error reading {filepath}: {e}", file=__import__('sys').stderr)

# Sort and display
print("=== Bash Commands (count >= 3, not auto-allowed/readonly) ===")
sorted_bash = sorted(bash_commands.items(), key=lambda x: -x[1])
for cmd, count in sorted_bash[:25]:
    if count >= 3:
        print(f"{cmd.ljust(40)} {count}")

print("\n=== MCP Tools ===")
sorted_mcp = sorted(mcp_tools.items(), key=lambda x: -x[1])
for tool, count in sorted_mcp[:20]:
    print(f"{tool.ljust(60)} {count}")

print("\n=== To Add to permissions.allow ===")
for cmd, count in sorted_bash[:15]:
    if count >= 3:
        if ' ' in cmd:
            print(f'"Bash({cmd} *)",')
        else:
            print(f'"Bash({cmd})",')

for tool, count in sorted_mcp[:10]:
    print(f'"{tool}",')
