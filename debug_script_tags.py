with open('dist/index.html', encoding='utf-8') as f:
    content = f.read()

# Find opening and closing script tags
opens = []
closes = []

lines = content.split('\n')
for i, line in enumerate(lines, 1):
    if '<script' in line and '</script' not in line:
        opens.append(i)
    if '</script>' in line:
        closes.append(i)

print(f"Opening script tags (lines): {opens}")
print(f"Closing script tags (lines): {closes}")
print(f"Total opens: {len(opens)}, closes: {len(closes)}")

# Find content of script tags around comments
for opening_line in opens[:4]:
    # Get line content
    line = lines[opening_line - 1]
    print(f"\nLine {opening_line}: {line[:120]}")
    # Get next few lines to see the content
    for j in range(max(0, opening_line - 1), min(len(lines), opening_line + 3)):
        print(f"  {j+1}: {lines[j][:100]}")
