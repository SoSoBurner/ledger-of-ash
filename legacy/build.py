#!/usr/bin/env python3
import os

def build():
    os.makedirs('dist', exist_ok=True)

    # Read the bridge script
    with open('js/loa-enriched-bridge.js', encoding='utf-8-sig') as f: bridge = f.read()

    # Load enriched choice files (Stage 1 + Stage 2 + Stage 3 + Stage 4 + Stage 5)
    enriched_files = [
        # Stage 1: 12 localities x 20 choices = 240 choices + universal additional choices
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
        # Additional universal Stage 1 choices
        'stage1_additional_enriched_choices.js',
        # Bard archetype 3-node mid-spine (Stage 1 consequence chain)
        'bard_midspine.js',
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

    # Read ledger-of-ash.html as the template
    with open('ledger-of-ash.html', encoding='utf-8-sig') as f: html = f.read()

    # Bundle all enriched content + bridge into a single inline script block
    bundled_script = '<script>\n' + enriched_content + '\n' + bridge + '\n</script>'

    out = html

    # Replace the external enriched script tags with the bundled block (replace first one found)
    first_tag = None
    for filename in enriched_files:
        tag = f"<script src='{filename}'></script>"
        if tag in out:
            if first_tag is None:
                first_tag = tag
                out = out.replace(tag, bundled_script, 1)
            else:
                out = out.replace(tag, '')

    # If no enriched script tags found, inject before </body>
    if first_tag is None:
        out = out.replace('</body>', bundled_script + '\n</body>', 1)

    # Remove the bridge script tag if present
    out = out.replace("<script src='js/loa-enriched-bridge.js'></script>", '')

    # Remove any remaining enriched script src tags
    for filename in enriched_files:
        out = out.replace(f"<script src='{filename}'></script>", '')

    with open('dist/ledger-of-ash.html', 'w', encoding='utf-8-sig') as f:
        f.write(out)

    # Copy assets to dist
    import shutil
    if os.path.isdir('assets'):
        dst = 'dist/assets'
        if os.path.exists(dst): shutil.rmtree(dst)
        shutil.copytree('assets', dst)

    size = os.path.getsize("dist/ledger-of-ash.html")
    print(f'Built: dist/ledger-of-ash.html — {size:,} bytes ({size//1024} KB)')

if __name__ == '__main__':
    build()
