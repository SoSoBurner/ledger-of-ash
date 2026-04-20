#!/usr/bin/env python3
"""Remove duplicate consecutive lines"""

files_to_fix = [
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

for filename in files_to_fix:
    with open(filename, 'r', encoding='utf-8-sig') as f:
        lines = f.readlines()
    
    # Find and remove consecutive duplicates of stageProgress lines
    new_lines = []
    i = 0
    removed = 0
    while i < len(lines):
        if i < len(lines) - 1 and lines[i].strip() == lines[i+1].strip() and 'G.stageProgress' in lines[i]:
            # Skip the duplicate
            new_lines.append(lines[i])  # Keep first, skip second
            i += 2
            removed += 1
        else:
            new_lines.append(lines[i])
            i += 1
    
    if removed > 0:
        with open(filename, 'w', encoding='utf-8-sig') as f:
            f.writelines(new_lines)
        print(f'✓ {filename}: Removed {removed} duplicate(s)')

print('\n✓✓✓ All duplicates fixed!')
