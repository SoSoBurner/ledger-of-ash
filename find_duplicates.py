#!/usr/bin/env python3
"""Find and report duplicate progress increments"""

import re

files_to_check = [
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

total_duplicates = 0

for filename in files_to_check:
    with open(filename, 'r', encoding='utf-8-sig') as f:
        lines = f.readlines()
    
    duplicates = []
    for i in range(len(lines) - 1):
        if lines[i].strip() == lines[i+1].strip() and 'G.stageProgress' in lines[i]:
            duplicates.append((i+1, lines[i].strip()))
    
    if duplicates:
        print(f'\n{filename}:')
        for line_num, content in duplicates:
            print(f'  Line {line_num}: {content}')
        total_duplicates += len(duplicates)

print(f'\nTotal duplicates found: {total_duplicates}')
