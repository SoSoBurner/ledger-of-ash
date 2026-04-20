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
    with open('js/combat-ui.js', encoding='utf-8-sig') as f: cbui = f.read()
    with open('js/engine.js', encoding='utf-8-sig') as f: en = f.read()
    with open('index.html', encoding='utf-8-sig') as f: html = f.read()
    
    # Load enriched choice files (Stage 1 + Stage 2 + Stage 3 + Stage 4 + Stage 5)
    enriched_files = [
        # Stage 1: 12 localities x 20 choices = 240 choices
        'shelkopolis_stage1_enriched_choices.js',
        'soreheim_proper_stage1_enriched_choices.js',
        'guildheart_hub_stage1_enriched_choices.js',
        'sunspire_haven_stage1_enriched_choices.js',
        'aurora_crown_commune_stage1_enriched_choices.js',
        'ithtananalor_stage1_enriched_choices.js',
        'mimolot_academy_stage1_enriched_choices.js',
        'panim_haven_stage1_enriched_choices.js',
        'fairhaven_stage1_enriched_choices.js',
        'shirshal_stage1_enriched_choices.js',
        'cosmoria_stage1_enriched_choices.js',
        'harvest_circle_stage1_enriched_choices.js',
        # Stage 2: 45 choices
        'stage2_enriched_choices.js',
        # Stage 3: 60 choices (institutional investigation)
        'stage3_enriched_choices.js',
        # Stage 4: 50 choices (moral/ethical branches)
        'stage4_enriched_choices.js',
        # Stage 5: 45 choices (consequence/payoff)
        'stage5_enriched_choices.js'
    ]
    
    enriched_content = ''
    for filename in enriched_files:
        filepath = os.path.join('.', filename)
        if os.path.exists(filepath):
            with open(filepath, encoding='utf-8-sig') as f:
                enriched_content += f.read() + '\n'
        else:
            print(f'Warning: {filename} not found, skipping')
    
    # Bundle all JS files into a single script content (preserve order: data deps → engine → enriched)
    # IMPORTANT: engine.js ends with })(); - we need to remove it, add enriched content, then close again
    en_without_close = en.rstrip()
    if en_without_close.endswith('})();'):
        en_without_close = en_without_close[:-5]  # Remove })();
    
    bundled = da + '\n' + blm + '\n' + s2bg + '\n' + na + '\n' + pj + '\n' + cb + '\n' + cbui + '\n' + en_without_close + '\n' + enriched_content + '\n})();'
    
    out = html
    # Remove individual script src tags and replace first one with bundled content
    out = out.replace("<script src='js/data.js'></script>", '<script>' + bundled + '</script>')
    out = out.replace("<script src='js/background-locality-map.js'></script>", '')
    out = out.replace("<script src='js/stage2-backgrounds.js'></script>", '')
    out = out.replace("<script src='js/narrative.js'></script>", '')
    out = out.replace("<script src='js/party.js'></script>", '')
    out = out.replace("<script src='js/combat.js'></script>", '')
    out = out.replace("<script src='js/combat-ui.js'></script>", '')
    out = out.replace("<script src='js/engine.js'></script>", '')
    
    # Remove enriched choice script tags (they're bundled now)
    for filename in enriched_files:
        out = out.replace(f"<script src='{filename}'></script>", '')
    
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

