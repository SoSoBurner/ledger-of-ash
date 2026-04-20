#!/usr/bin/env python3
"""
Audit all stage transitions to verify they don't have level gates.
Expected behavior: Stages should advance based on stageProgress only, not level.
"""

import re

with open('js/engine.js', 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Find all maybeStageAdvance() function and its logic
# Look for the main stage check blocks
stage_blocks = re.findall(
    r'if\(G\.stage===(\d)\s*&&\s*G\.stageProgress\[\d\]\s*>=\s*(\d+)\)',
    content
)

print("Stage Transition Audit")
print("=" * 70)
print()
print("Stage transitions found in maybeStageAdvance():")
print("-" * 70)

stage_transitions = {
    1: (20, "Stage 1 → Stage 2"),
    2: (45, "Stage 2 → Stage 3"),
    3: (60, "Stage 3 → Stage 4"),
    4: (50, "Stage 4 → Stage 5")
}

for stage, threshold in stage_transitions.items():
    found = any(s == str(stage) and t == str(threshold) for s, t in stage_blocks)
    status = "✓ PASS" if found else "✗ FAIL"
    print(f"{status}: Stage {stage} → {stage+1} at stageProgress >= {threshold}")

print()
print("Checking for any level-based stage gates...")
print("-" * 70)

# Look for any stage advancement that uses level
level_gates = re.findall(r'G\.stage\s*[=>!<]|G\.level.*?G\.stage|stage.*?level', content, re.IGNORECASE)
print(f"Level-based stage references found: {len(level_gates)}")

if level_gates:
    print("⚠️  POTENTIAL ISSUES - Found level-stage coupling:")
    for gate in level_gates[:10]:
        print(f"  - {gate[:80]}")
else:
    print("✓ No level-stage coupling detected in stage advancement")

print()
print("Verification of gainXp() function...")
print("-" * 70)

# Check if gainXp respects currentLevelCap
if 'currentLevelCap()' in content and 'gainXp' in content:
    if 'while(G.level < cap' in content:
        print("✓ PASS: gainXp() respects stage-based level cap")
    else:
        print("✗ FAIL: gainXp() may not respect level cap")
else:
    print("⚠️  WARNING: Could not verify gainXp cap logic")

print()
print("=" * 70)
print("AUDIT COMPLETE")
print("=" * 70)
