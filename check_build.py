import os

# Check if files exist
files = [
    'js/data.js',
    'js/background-locality-map.js', 
    'js/stage2-backgrounds.js',
    'js/narrative.js',
    'js/party.js',
    'js/combat.js',
    'js/engine.js',
    'index.html'
]

for f in files:
    exists = os.path.exists(f)
    if exists:
        size = os.path.getsize(f)
        print(f"✓ {f} ({size} bytes)")
    else:
        print(f"✗ {f} MISSING")

# Check what would be replaced in index.html
with open('index.html') as f:
    html = f.read()
    
patterns = [
    "<script src='js/data.js'></script>",
    "<script src='js/background-locality-map.js'></script>",
    "<script src='js/stage2-backgrounds.js'></script>",
    "<script src='js/narrative.js'></script>",
    "<script src='js/party.js'></script>",
    "<script src='js/combat.js'></script>",
    "<script src='js/engine.js'></script>"
]

print("\n=== Patterns in index.html ===")
for p in patterns:
    found = p in html
    print(f"{'✓' if found else '✗'} {p}")
