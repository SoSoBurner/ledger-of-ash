#!/usr/bin/env python3
"""Build Ledger of Ash into single-file HTML for deployment."""
import re, os

def build():
    os.makedirs('dist', exist_ok=True)
    
    with open('css/style.css', encoding='utf-8') as f: css = f.read()
    with open('js/data.js', encoding='utf-8') as f: da = f.read()
    with open('js/stage2-backgrounds.js', encoding='utf-8') as f: s2bg = f.read()
    with open('js/narrative.js', encoding='utf-8') as f: na = f.read()
    with open('js/party.js', encoding='utf-8') as f: pj = f.read()
    with open('js/world.js', encoding='utf-8') as f: wj = f.read()
    with open('js/combat.js', encoding='utf-8') as f: cb = f.read()
    with open('js/world-data.js', encoding='utf-8') as f: wd = f.read()
    with open('js/scenes.js', encoding='utf-8') as f: sc = f.read()
    with open('js/consequences.js', encoding='utf-8') as f: co = f.read()
    with open('js/engine.js', encoding='utf-8') as f: en = f.read()
    with open('index.html', encoding='utf-8') as f: html = f.read()
    
    css = re.sub(r'@import url\([^)]+\);\s*', '', css)
    
    out = html
    out = out.replace('<link rel="stylesheet" href="css/style.css">', '<style>' + css + '</style>')
    out = out.replace('<script src="js/data.js"></script>', '<script>' + da + '</script>')
    out = out.replace("<script src='js/data.js'></script>", '<script>' + da + '</script>')
    out = out.replace('<script src="js/stage2-backgrounds.js"></script>', '<script>' + s2bg + '</script>')
    out = out.replace("<script src='js/stage2-backgrounds.js'></script>", '<script>' + s2bg + '</script>')
    out = out.replace('<script src="js/narrative.js"></script>', '<script>' + na + '</script>')
    out = out.replace("<script src='js/narrative.js'></script>", '<script>' + na + '</script>')
    out = out.replace('<script src="js/party.js"></script>', '<script>' + pj + '</script>')
    out = out.replace("<script src='js/party.js'></script>", '<script>' + pj + '</script>')
    out = out.replace('<script src="js/world.js"></script>', '<script>' + wj + '</script>')
    out = out.replace("<script src='js/world.js'></script>", '<script>' + wj + '</script>')
    out = out.replace('<script src="js/combat.js"></script>', '<script>' + cb + '</script>')
    out = out.replace("<script src='js/combat.js'></script>", '<script>' + cb + '</script>')
    out = out.replace('<script src="js/world-data.js"></script>', '<script>' + wd + '</script>')
    out = out.replace("<script src='js/world-data.js'></script>", '<script>' + wd + '</script>')
    out = out.replace('<script src="js/scenes.js"></script>', '<script>' + sc + '</script>')
    out = out.replace("<script src='js/scenes.js'></script>", '<script>' + sc + '</script>')
    out = out.replace('<script src="js/consequences.js"></script>', '<script>' + co + '</script>')
    out = out.replace("<script src='js/consequences.js'></script>", '<script>' + co + '</script>')
    out = out.replace('<script src="js/engine.js"></script>', '<script>' + en + '</script>')
    out = out.replace("<script src='js/engine.js'></script>", '<script>' + en + '</script>')
    
    with open('dist/index.html', 'w', encoding='utf-8') as f: f.write(out)
    size = os.path.getsize("dist/index.html")
    print(f'Built: {size:,} bytes ({size//1024} KB)')

if __name__ == '__main__':
    build()
