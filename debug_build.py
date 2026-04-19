with open('index.html', encoding='utf-8') as f:
    html = f.read()

# Check patterns
patterns = [
    "<script src='js/data.js'></script>",
    "<script src='js/engine.js'></script>"
]

for p in patterns:
    if p in html:
        print(f"✓ Found: {p[:50]}")
        idx = html.find(p)
        context = html[max(0, idx-20):idx+len(p)+20]
        print(f"  Context: ...{context}...")
    else:
        print(f"✗ NOT FOUND: {p}")

# Show what's actually in the file
lines = html.split('\n')
for i, line in enumerate(lines):
    if 'script' in line.lower():
        print(f"Line {i}: {line[:100]}")
