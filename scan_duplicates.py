#!/usr/bin/env python3
import re
import json

with open('js/engine.js', 'r', encoding='utf-8') as f:
    en = f.read()

# Extract choice labels using multiple patterns
matches = re.findall(r"label:\s*['\"](.+?)['\"][,\}]", en)

counts = {}
for label in matches:
    counts[label] = counts.get(label, 0) + 1

dups = sorted([(l, c) for l, c in counts.items() if c > 1], key=lambda x: -x[1])

print(f'Total choices scanned: {len(matches)}')
print(f'Unique labels: {len(counts)}')
print(f'Duplicate labels found: {len(dups)}')
print()
print('Top 30 duplicate labels:')
print('-' * 100)

for label, count in dups[:30]:
    print(f'{count:2}x  | {label[:90]}')

# Save detailed report
with open('choice_duplicates_report.json', 'w') as f:
    json.dump({
        'total_choices': len(matches),
        'unique_labels': len(counts),
        'duplicates_found': len(dups),
        'top_duplicates': dups[:50]
    }, f, indent=2)

print()
print('Report saved to choice_duplicates_report.json')
