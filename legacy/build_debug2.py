#!/usr/bin/env python3
"""Debug build process to find where bundled script is lost"""

import os

def build_debug():
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
    
    enriched_files = [
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
        'stage2_enriched_choices.js'
    ]
    
    enriched_content = ''
    for filename in enriched_files:
        filepath = os.path.join('.', filename)
        if os.path.exists(filepath):
            with open(filepath, encoding='utf-8-sig') as f:
                enriched_content += f.read() + '\n'
    
    # Bundle all JS files
    bundled = da + '\n' + blm + '\n' + s2bg + '\n' + na + '\n' + pj + '\n' + cb + '\n' + cbui + '\n' + en + '\n' + enriched_content
    
    print(f'Bundled size: {len(bundled):,} bytes')
    print(f'Contains function beginNew: {"function beginNew" in bundled}')
    print(f'Contains function defaultState: {"function defaultState" in bundled}')
    
    out = html
    print(f'\nBefore replacement:')
    print(f'  HTML contains <script src="js/data.js">: {"<script src=\'js/data.js\'></script>" in out}')
    
    # The critical replacement
    old_tag = "<script src='js/data.js'></script>"
    new_tag = '<script>' + bundled + '</script>'
    
    if old_tag in out:
        out = out.replace(old_tag, new_tag)
        print(f'  Replacement done: old tag found')
    else:
        print(f'  ERROR: old tag NOT found in HTML!')
        print(f'  Searching for variations...')
        if '<script src="js/data.js"></script>' in out:
            print(f'  Found with double quotes!')
        if '<script src=\'js/data.js\'>' in out:
            print(f'  Found without closing tag!')
    
    # Now check if bundled script made it to output
    final_script_match = out[out.find('<script>'):out.find('<script>') + 500] if '<script>' in out else None
    print(f'\nAfter replacement:')
    print(f'  First 500 chars of <script> tag:')
    if final_script_match:
        print(f'    {final_script_match}')
    print(f'  Final HTML contains function beginNew: {"function beginNew" in out}')
    
    with open('dist/index.html', 'w', encoding='utf-8-sig') as f:
        f.write(out)
    
    size = os.path.getsize("dist/index.html")
    print(f'\nFinal dist/index.html: {size:,} bytes')

if __name__ == '__main__':
    build_debug()
