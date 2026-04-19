import os

os.makedirs('dist', exist_ok=True)

# Load files
with open('js/data.js', encoding='utf-8') as f: da = f.read()
with open('index.html', encoding='utf-8') as f: html = f.read()

print(f"data.js size: {len(da)} chars")
print(f"index.html original size: {len(html)} chars")

# Try replacement
out = html
before = out.count('<script src')
out = out.replace("<script src='js/data.js'></script>", '<script>' + da + '</script>')
after = out.count('<script src')

print(f"Script src tags before: {before}")
print(f"Script src tags after: {after}")
print(f"Output size: {len(out)} chars")

# Check if replacement worked
if "<script>" in out:
    print("✓ Has bundled script tags")
    
# Count script tags
print(f"Total '<script' in output: {out.count('<script')}")
print(f"Total '</script>' in output: {out.count('</script>')}")

# Save to check
with open('dist/index.html', 'w') as f:
    f.write(out)
    
print(f"✓ Wrote {len(out)} bytes to dist/index.html")
