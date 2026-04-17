#!/usr/bin/env python3
"""Build Ledger of Ash into single-file HTML for deployment."""
import re, os

def build():
    os.makedirs('dist', exist_ok=True)
    
    with open('css/style.css') as f: css = f.read()
    with open('js/party.js') as f: pj = f.read()
    with open('js/world.js') as f: wj = f.read()
    with open('js/combat.js') as f: cb = f.read()
    with open('js/world-data.js') as f: wd = f.read()
    with open('js/scenes.js') as f: sc = f.read()
    with open('js/consequences.js') as f: co = f.read()
    with open('js/engine.js') as f: en = f.read()
    with open('index.html') as f: html = f.read()
    
    css = re.sub(r'@import url\([^)]+\);\s*', '', css)
    
    out = html
    out = out.replace('<link rel="stylesheet" href="css/style.css">', '<style>' + css + '</style>')
    out = out.replace('<script src="js/party.js"></script>', '<script>' + pj + '</script>')
    out = out.replace('<script src="js/world.js"></script>', '<script>' + wj + '</script>')
    out = out.replace('<script src="js/combat.js"></script>', '<script>' + cb + '</script>')
    out = out.replace('<script src="js/world-data.js"></script>', '<script>' + wd + '</script>')
    out = out.replace('<script src="js/scenes.js"></script>', '<script>' + sc + '</script>')
    out = out.replace('<script src="js/consequences.js"></script>', '<script>' + co + '</script>')
    out = out.replace('<script src="js/engine.js"></script>', '<script>' + en + '</script>')
    
    with open('dist/index.html', 'w') as f: f.write(out)
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
