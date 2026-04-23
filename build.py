#!/usr/bin/env python3
import os

def build():
    os.makedirs('dist', exist_ok=True)

    # Run locality matrix build first
    import subprocess, sys
    if os.path.exists('build_locality_matrix.py'):
        result = subprocess.run([sys.executable, 'build_locality_matrix.py'], capture_output=True, text=True)
        if result.returncode != 0:
            print('Warning: build_locality_matrix.py failed:\n' + result.stderr)
        else:
            for line in result.stdout.strip().splitlines():
                print('  [matrix] ' + line)

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
        # Stage 1: 6 new locality files
        'glasswake_commune_stage1_enriched_choices.js',
        'whitebridge_commune_stage1_enriched_choices.js',
        'craftspire_stage1_enriched_choices.js',
        'unity_square_stage1_enriched_choices.js',
        'ironhold_quarry_stage1_enriched_choices.js',
        'plumes_end_outpost_stage1_enriched_choices.js',
        # Stage 1: districts + Nomdara
        'districts_stage1_enriched_choices.js',
        'nomdara_stage1_choices.js',
        # Stage 1: archetype midspines
        'combat_midspine.js',
        'magic_midspine.js',
        'stealth_midspine.js',
        'support_midspine.js',
        # Travel arcs: 12 non-Shelk localities → Shelkopolis
        'soreheim_proper_to_shelk_arc.js',
        'sunspire_haven_to_shelk_arc.js',
        'harvest_circle_to_shelk_arc.js',
        'panim_haven_to_shelk_arc.js',
        'aurora_crown_to_shelk_arc.js',
        'glasswake_to_shelk_arc.js',
        'whitebridge_to_shelk_arc.js',
        'ithtananalor_to_shelk_arc.js',
        'mimolot_academy_to_shelk_arc.js',
        'guildheart_hub_to_shelk_arc.js',
        'shirshal_to_shelk_arc.js',
        'cosmoria_to_shelk_arc.js',
        # Stage 2: generic fallback + 18 locality files + districts + Nomdara
        'stage2_enriched_choices.js',
        'shelkopolis_stage2_enriched_choices.js',
        'panim_haven_stage2_enriched_choices.js',
        'ithtananalor_stage2_enriched_choices.js',
        'fairhaven_stage2_enriched_choices.js',
        'mimolot_academy_stage2_enriched_choices.js',
        'shirshal_stage2_enriched_choices.js',
        'guildheart_hub_stage2_enriched_choices.js',
        'cosmoria_stage2_enriched_choices.js',
        'soreheim_proper_stage2_enriched_choices.js',
        'harvest_circle_stage2_enriched_choices.js',
        'sunspire_haven_stage2_enriched_choices.js',
        'aurora_crown_commune_stage2_enriched_choices.js',
        'glasswake_commune_stage2_enriched_choices.js',
        'whitebridge_commune_stage2_enriched_choices.js',
        'craftspire_stage2_enriched_choices.js',
        'unity_square_stage2_enriched_choices.js',
        'ironhold_quarry_stage2_enriched_choices.js',
        'plumes_end_outpost_stage2_enriched_choices.js',
        'districts_stage2_enriched_choices.js',
        'nomdara_stage2_choices.js',
        # Scene modules: narrations, sideplots, reveals
        'locality_narrations.js',
        'scope_reveal.js',
        'soreheim_stage1.js',
        'sheresh_stage1.js',
        'shadow_ledger_hints.js',
        'maren_oss_encounter.js',
        'stage2_antechamber.js',
        'stage2_climax.js',
        # Stage 3: 60 choices (institutional investigation)
        'stage3_enriched_choices.js',
        # Stage 4: 50 choices (moral/ethical branches)
        'stage4_enriched_choices.js',
        # Stage 5: 45 choices (consequence/payoff)
        'stage5_enriched_choices.js'
    ]

    enriched_parts = []
    for filename in enriched_files:
        filepath = os.path.join('content', filename)
        if os.path.exists(filepath):
            with open(filepath, encoding='utf-8-sig') as f:
                enriched_parts.append(f.read())
        else:
            print(f'Warning: {filename} not found, skipping')
    enriched_content = '\n'.join(enriched_parts)

    # Read ledger-of-ash.html as the template
    with open('ledger-of-ash.html', encoding='utf-8-sig') as f: html = f.read()

    # Load locality matrix data files (generated by build_locality_matrix.py)
    data_files = [
        'data/locality_matrix.js',
        'data/route_matrix.js',
        'data/narrative_lookup.js',
        'data/bestiary_lookup.js',
        'data/nomdara_overlay.js',
    ]
    matrix_content = ''
    for df in data_files:
        if os.path.exists(df):
            with open(df, encoding='utf-8') as f:
                matrix_content += f.read() + '\n'
        else:
            print(f'Warning: {df} not found, skipping')

    # Bundle all enriched content + bridge into a single inline script block
    bundled_script = '<script>\n' + matrix_content + enriched_content + '\n' + bridge + '\n</script>'

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

    # Remove all remaining external script tags in one regex pass
    import re
    all_src_tags = (
        ["js/loa-enriched-bridge.js"] +
        enriched_files +
        data_files
    )
    tag_pattern = re.compile(
        '|'.join(re.escape(f"<script src='{s}'></script>") for s in all_src_tags)
    )
    out = tag_pattern.sub('', out)
    out = out.replace("<!-- ── LOCALITY MATRIX DATA (generated by build_locality_matrix.py) ── -->", '')

    with open('dist/ledger-of-ash.html', 'w', encoding='utf-8-sig') as f:
        f.write(out)

    # Copy assets to dist
    import shutil
    if os.path.isdir('assets'):
        dst = 'dist/assets'
        if os.path.exists(dst): shutil.rmtree(dst)
        shutil.copytree('assets', dst)

        # Compress large PNG images
        try:
            from PIL import Image
            cover_png = os.path.join(dst, 'cover.png')
            if os.path.exists(cover_png):
                img = Image.open(cover_png)
                # Resize if > 500KB, compress to target size
                original_size = os.path.getsize(cover_png)
                if original_size > 500 * 1024:
                    # Resize to 80% and recompress
                    w, h = img.size
                    new_size = (int(w * 0.8), int(h * 0.8))
                    img = img.resize(new_size, Image.Resampling.LANCZOS)
                    img.save(cover_png, 'PNG', optimize=True)
                    new_size_bytes = os.path.getsize(cover_png)
                    print(f'Compressed: {cover_png} — {original_size:,} → {new_size_bytes:,} bytes ({new_size_bytes//1024} KB)')
        except ImportError:
            print('Note: PIL/Pillow not installed; skipping image compression')

    size = os.path.getsize("dist/ledger-of-ash.html")
    print(f'Built: dist/ledger-of-ash.html — {size:,} bytes ({size//1024} KB)')

if __name__ == '__main__':
    build()
