#!/usr/bin/env python3
import re
import json
import glob
import os

# Scan all JS files including enriched choices
js_files = glob.glob('js/*.js') + glob.glob('*enriched_choices.js') + glob.glob('stage2_enriched_choices.js')

all_labels = []
for filepath in js_files:
    if not os.path.exists(filepath):
        continue
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            # Extract choice labels
            matches = re.findall(r"label:\s*['\"](.+?)['\"]", content)
            all_labels.extend([(filepath.split('/')[-1], label) for label in matches])
    except:
        pass

# Count duplicates across all files
counts = {}
label_locations = {}
for filepath, label in all_labels:
    if label not in counts:
        counts[label] = 0
        label_locations[label] = []
    counts[label] += 1
    label_locations[label].append(filepath)

dups = sorted([(l, c, label_locations[l]) for l, c in counts.items() if c > 1], key=lambda x: -x[1])

print(f'Total labels scanned: {len(all_labels)}')
print(f'Unique labels: {len(counts)}')
print(f'Duplicate labels found: {len(dups)}')
print()

if dups:
    print('DUPLICATES FOUND (top 30):')
    print('-' * 120)
    for label, count, locations in dups[:30]:
        print(f'{count:3}x  | {label[:80]}')
        for loc in set(locations):
            print(f'        → {loc}')
else:
    print('✓ NO DUPLICATE CHOICE LABELS FOUND')
    print('All choices are unique across the entire system!')

# Save report
with open('choice_duplicates_comprehensive.json', 'w') as f:
    json.dump({
        'total_labels': len(all_labels),
        'unique_labels': len(counts),
        'duplicates_found': len(dups),
        'files_scanned': len(js_files),
        'duplicate_details': [(label, count, list(set(locs))) for label, count, locs in dups[:50]]
    }, f, indent=2)

print()
print('Full report saved to choice_duplicates_comprehensive.json')
