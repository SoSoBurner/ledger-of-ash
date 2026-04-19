import os

os.makedirs('dist', exist_ok=True)

with open('js/data.js', encoding='utf-8') as f: da = f.read()
with open('js/background-locality-map.js', encoding='utf-8') as f: blm = f.read()
with open('index.html', encoding='utf-8') as f: html = f.read()

out = html
print(f"Original: {out.count('<script src')} script src tags")

out = out.replace("<script src='js/data.js'></script>", '<script>' + da + '</script>')
print(f"After data.js: {out.count('<script src')} script src tags")

out = out.replace("<script src='js/background-locality-map.js'></script>", '<script>' + blm + '</script>')
print(f"After background-locality-map.js: {out.count('<script src')} script src tags")

# Check if the new <script> tags contain the bundled code
if '  const ARCHETYPES' in out:
    print("✓ data.js content found in output")
else:
    print("✗ data.js content NOT found")

if 'BACKGROUND_STARTING_LOCALITY' in out:
    print("✓ background-locality-map.js content found")
else:
    print("✗ background-locality-map.js content NOT found")
