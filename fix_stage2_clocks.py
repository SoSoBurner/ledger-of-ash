#!/usr/bin/env python3
"""Replace undefined world clocks with existing ones"""

with open('stage2_enriched_choices.js', 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Replace all undefined clock references with existing ones
# threat -> pressure (main tension clock)
replacements = [
    ('worldClocks.threat', 'worldClocks.pressure'),
    ('worldClocks.watchfulness', 'worldClocks.pressure'),
    ('worldClocks.reverence', 'worldClocks.omens'),
    ('worldClocks.distance', 'worldClocks.pressure'),
    ('worldClocks.isolation', 'worldClocks.pressure'),
    ('worldClocks.attention', 'worldClocks.pressure'),
]

count = 0
for old, new in replacements:
    if old in content:
        instances = content.count(old)
        content = content.replace(old, new)
        count += instances
        print(f'✓ Replaced {instances}x {old} -> {new}')

with open('stage2_enriched_choices.js', 'w', encoding='utf-8-sig') as f:
    f.write(content)

print(f'\n✓✓✓ Total replacements: {count}')
