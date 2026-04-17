#!/usr/bin/env python3
"""Build Ledger of Ash into single-file HTML for deployment.
Active runtime imports:
- js/data.js (ARCHETYPES, KEY_LOCALITIES, ADJACENCY, NPC_PLACEMENTS, BESTIARY, HAZARDS)
- js/background-locality-map.js (BACKGROUND_STARTING_LOCALITY mapping, V28_8 grounding)
- js/stage2-backgrounds.js (Stage II content templates)
- js/narrative.js (Dynamic scene narration)
- js/party.js (Companions, recruitment, camp)
- js/combat.js (Combat system)
- js/engine.js (Core engine)

Legacy files (NOT bundled):
- js/world.js (archived, replaced by inlined engine.js systems)
- js/world-data.js (archived, replaced by augmented data.js with V28_8)
- js/scenes.js (archived, V28_4 opening scenes)
- js/consequences.js (archived, replaced by stage2-backgrounds.js)
- css/style.css (archived, fully inlined in index.html)
"""
import re, os

def build():
    os.makedirs('dist', exist_ok=True)
    
    # Load only active runtime files
    with open('js/data.js', encoding='utf-8') as f: da = f.read()
    with open('js/background-locality-map.js', encoding='utf-8') as f: blm = f.read()
    with open('js/stage2-backgrounds.js', encoding='utf-8') as f: s2bg = f.read()
    with open('js/narrative.js', encoding='utf-8') as f: na = f.read()
    with open('js/party.js', encoding='utf-8') as f: pj = f.read()
    with open('js/combat.js', encoding='utf-8') as f: cb = f.read()
    with open('js/engine.js', encoding='utf-8') as f: en = f.read()
    with open('index.html', encoding='utf-8') as f: html = f.read()
    
    out = html
    # Bundle active runtime files into index.html
    out = out.replace("<script src='js/data.js'></script>", '<script>' + da + '</script>')
    out = out.replace("<script src='js/background-locality-map.js'></script>", '<script>' + blm + '</script>')
    out = out.replace("<script src='js/stage2-backgrounds.js'></script>", '<script>' + s2bg + '</script>')
    out = out.replace("<script src='js/narrative.js'></script>", '<script>' + na + '</script>')
    out = out.replace("<script src='js/party.js'></script>", '<script>' + pj + '</script>')
    out = out.replace("<script src='js/combat.js'></script>", '<script>' + cb + '</script>')
    out = out.replace("<script src='js/engine.js'></script>", '<script>' + en + '</script>')
    
    with open('dist/index.html', 'w', encoding='utf-8') as f: f.write(out)
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
