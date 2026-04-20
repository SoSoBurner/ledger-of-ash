#!/usr/bin/env python3
"""Add window exports to all enriched choice files"""

enriched_files = {
    'shelkopolis_stage1_enriched_choices.js': 'SHELKOPOLIS_STAGE1_ENRICHED_CHOICES',
    'soreheim_proper_stage1_enriched_choices.js': 'SOREHEIM_PROPER_STAGE1_ENRICHED_CHOICES',
    'guildheart_hub_stage1_enriched_choices.js': 'GUILDHEART_HUB_STAGE1_ENRICHED_CHOICES',
    'sunspire_haven_stage1_enriched_choices.js': 'SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES',
    'aurora_crown_commune_stage1_enriched_choices.js': 'AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES',
    'ithtananalor_stage1_enriched_choices.js': 'ITHTANANALOR_STAGE1_ENRICHED_CHOICES',
    'mimolot_academy_stage1_enriched_choices.js': 'MIMOLOT_ACADEMY_STAGE1_ENRICHED_CHOICES',
    'panim_haven_stage1_enriched_choices.js': 'PANIM_HAVEN_STAGE1_ENRICHED_CHOICES',
    'fairhaven_stage1_enriched_choices.js': 'FAIRHAVEN_STAGE1_ENRICHED_CHOICES',
    'shirshal_stage1_enriched_choices.js': 'SHIRSHAL_STAGE1_ENRICHED_CHOICES',
    'cosmoria_stage1_enriched_choices.js': 'COSMORIA_STAGE1_ENRICHED_CHOICES',
    'harvest_circle_stage1_enriched_choices.js': 'HARVEST_CIRCLE_STAGE1_ENRICHED_CHOICES',
}

for filename, varname in enriched_files.items():
    with open(filename, 'r', encoding='utf-8-sig') as f:
        content = f.read()
    
    if f'window.{varname}' in content:
        print(f'✓ {filename} already has export')
        continue
    
    export_line = f'\nwindow.{varname} = {varname};\n'
    content = content.rstrip() + export_line
    
    with open(filename, 'w', encoding='utf-8-sig') as f:
        f.write(content)
    
    print(f'✓ Added export to {filename}')

# Fix stage2
with open('stage2_enriched_choices.js', 'r', encoding='utf-8-sig') as f:
    content = f.read()

if 'window.STAGE2_ENRICHED_CHOICES' not in content:
    content = content.rstrip() + '\nwindow.STAGE2_ENRICHED_CHOICES = STAGE2_ENRICHED_CHOICES;\n'
    with open('stage2_enriched_choices.js', 'w', encoding='utf-8-sig') as f:
        f.write(content)
    print(f'✓ Added export to stage2_enriched_choices.js')
else:
    print(f'✓ stage2_enriched_choices.js already has export')

print('\n✓✓✓ All 13 enriched files updated with window exports!')
