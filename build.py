#!/usr/bin/env python3
import os

def build():
    os.makedirs('dist', exist_ok=True)
    
    # Load all runtime files
    with open('js/data.js', encoding='utf-8-sig') as f: da = f.read()
    with open('js/background-locality-map.js', encoding='utf-8-sig') as f: blm = f.read()
    with open('js/stage2-backgrounds.js', encoding='utf-8-sig') as f: s2bg = f.read()
    with open('js/narrative.js', encoding='utf-8-sig') as f: na = f.read()
    with open('js/party.js', encoding='utf-8-sig') as f: pj = f.read()
    with open('js/combat.js', encoding='utf-8-sig') as f: cb = f.read()
    with open('js/engine.js', encoding='utf-8-sig') as f: en = f.read()
    with open('index.html', encoding='utf-8-sig') as f: html = f.read()
    
    # Bundle all JS files into a single script content (preserve order: data deps come first)
    bundled = da + '\n' + blm + '\n' + s2bg + '\n' + na + '\n' + pj + '\n' + cb + '\n' + en
    
    out = html
    # Remove individual script src tags and replace first one with bundled content
    out = out.replace("<script src='js/data.js'></script>", '<script>' + bundled + '</script>')
    out = out.replace("<script src='js/background-locality-map.js'></script>", '')
    out = out.replace("<script src='js/stage2-backgrounds.js'></script>", '')
    out = out.replace("<script src='js/narrative.js'></script>", '')
    out = out.replace("<script src='js/party.js'></script>", '')
    out = out.replace("<script src='js/combat.js'></script>", '')
    out = out.replace("<script src='js/engine.js'></script>", '')
    
    with open('dist/index.html', 'w', encoding='utf-8-sig') as f:
        f.write(out)
        
    # Copy assets to dist
    import shutil
    if os.path.isdir('assets'):
        dst = 'dist/assets'
        if os.path.exists(dst): shutil.rmtree(dst)
        shutil.copytree('assets', dst)
        
    size = os.path.getsize("dist/index.html")
    print(f'Built: {size:,} bytes ({size//1024} KB)')

if __name__ == '__main__':
    build()
