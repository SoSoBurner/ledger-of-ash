#!/usr/bin/env python3
import re
import json
from collections import Counter

with open('stage2_enriched_choices.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find label patterns - search for the actual label: pattern followed by text
labels = re.findall(r'label:\s*["\'](.+?)["\'][,\}]', content)

print(f'Total labels in stage2: {len(labels)}')
print(f'Unique labels in stage2: {len(set(labels))}')

counts = Counter(labels)
dups = [(label, count) for label, count in counts.items() if count > 1]
dups.sort(key=lambda x: -x[1])

print(f'Duplicates found: {len(dups)}')
if dups:
    print()
    print('Duplicates:')
    for label, count in dups:
        print(f'  {count}x: {label[:100]}')
