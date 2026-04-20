#!/usr/bin/env python3
"""Verify enriched choices are properly loaded and accessible"""

import json

# Quick test: verify window exports exist in built dist
with open('dist/index.html', 'r', encoding='utf-8-sig') as f:
    html = f.read()

# Find bundled script
import re
match = re.search(r'<script>(.*?)</script>', html, re.DOTALL)
if not match:
    print('✗ No bundled script found')
    exit(1)

script = match.group(1)

# Test for key exports
tests = [
    ('SHELKOPOLIS_STAGE1_ENRICHED_CHOICES', 'Shelkopolis enriched'),
    ('SOREHEIM_PROPER_STAGE1_ENRICHED_CHOICES', 'Soreheim enriched'),
    ('STAGE2_ENRICHED_CHOICES', 'Stage 2 enriched'),
    ('window.SHELKOPOLIS_STAGE1_ENRICHED_CHOICES', 'Shelkopolis window export'),
    ('window.STAGE2_ENRICHED_CHOICES', 'Stage 2 window export'),
    ('companionBonus', 'companionBonus export'),
    ('buildCompanionTrust', 'buildCompanionTrust export'),
    ('dailyHeatDecay', 'dailyHeatDecay function'),
    ('initializeAlignment', 'Alignment system'),
    ('alignmentSystemExports', 'Alignment exports'),
]

print('Verifying bundled script exports:')
for pattern, desc in tests:
    if pattern in script:
        print(f'✓ {desc}')
    else:
        print(f'✗ {desc}')

# Also verify new skills are in the script
print('\nVerifying skill additions:')
skill_tests = [
    ('insight:', 'insight skill'),
    ('perception:', 'perception skill'),
    ('deception:', 'deception skill'),
    ('arcana:', 'arcana skill'),
    ('medicine:', 'medicine skill'),
    ('investigation:', 'investigation skill'),
]

for pattern, desc in skill_tests:
    if pattern in script:
        print(f'✓ {desc}')
    else:
        print(f'✗ {desc}')

# Verify worldClocks replacements
print('\nVerifying world clock fixes:')
if 'worldClocks.threat' in script:
    print(f'✗ Old "threat" clock still present')
else:
    print(f'✓ Old "threat" clock removed')

if 'worldClocks.pressure' in script:
    print(f'✓ "pressure" clock present')
else:
    print(f'✗ "pressure" clock missing')

# Verify alignment system references
print('\nVerifying alignment system:')
if 'G.alignmentSystem.benevolence' in script:
    print(f'✓ Alignment system uses benevolence')
else:
    print(f'✗ Alignment system benevolence missing')

if 'G.alignment.goodEvil' in script:
    print(f'✗ Old alignment references still present')
else:
    print(f'✓ Old alignment references removed')

print('\n✓✓✓ Verification complete!')
