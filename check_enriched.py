#!/usr/bin/env python3
"""Verify build process includes enriched files"""

import os

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

print('Checking enriched files:')
total_size = 0
for filename in enriched_files:
    if os.path.exists(filename):
        size = os.path.getsize(filename)
        total_size += size
        print(f'  ✓ {filename}: {size:,} bytes')
    else:
        print(f'  ✗ {filename}: NOT FOUND')

print(f'\nTotal enriched content: {total_size:,} bytes')

# Check if exports are in each file
print('\nChecking exports in source files:')
for filename in enriched_files[:3]:  # Check first 3
    with open(filename, 'r', encoding='utf-8-sig') as f:
        content = f.read()
    
    # Determine expected variable name
    if 'stage2' in filename:
        varname = 'STAGE2_ENRICHED_CHOICES'
    else:
        prefix = filename.replace('_stage1_enriched_choices.js', '').upper()
        varname = f'{prefix}_STAGE1_ENRICHED_CHOICES'
    
    export = f'window.{varname} ='
    if export in content:
        print(f'  ✓ {filename} has {export}')
    else:
        print(f'  ✗ {filename} missing {export}')
