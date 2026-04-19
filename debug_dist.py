import os

with open('dist/index.html', encoding='utf-8') as f:
    content = f.read()

# Find first script tag
first_script = content.find('<script>')
print(f"First <script> at position: {first_script}")

# Get content after it (first 500 chars of bundled content)
if first_script >= 0:
    snippet = content[first_script:first_script+500]
    print("\nFirst script snippet:")
    print(snippet)

# Count scripts
print(f"\nTotal '<script' tags: {content.count('<script')}")
print(f"Total '</script>' tags: {content.count('</script>')}")

# Show lines with script
lines = content.split('\n')
for i, line in enumerate(lines[300:330], 300):
    if '<script' in line or '</script' in line:
        print(f"{i}: {line[:120]}")
