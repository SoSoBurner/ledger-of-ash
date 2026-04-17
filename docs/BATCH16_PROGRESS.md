
# Batch 16 Progress

Tangible progress in this batch:

- Added stage-aware telemetry to the runtime state.
- Wired telemetry into travel, scouting, safe-zone leverage, encounters, rescues, and legend output.
- Added adaptive threat scaling so stages respond to player readiness instead of only static threat bias.
- Exposed a live balance snapshot in the character sheet overlay.
- Preserved the current static overlay architecture while making balance work materially testable.

This batch is intended to be a real instrumentation and scaling pass rather than another purely descriptive scope expansion.
