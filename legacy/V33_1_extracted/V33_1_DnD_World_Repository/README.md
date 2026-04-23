# V33_1_DnD_World_Repository

A standalone world repository for immediate GM use. This release is a corrective and deepening pass over the prior build, preserving its playable structure while normalizing current-release identity, repairing semantic drift in NPC records, and adding stronger canon-to-play reference surfaces.

## Fast paths
- `START_HERE_GM.md`
- `RUN_A_SESSION_NOW.md`
- `CURRENT_CAMPAIGN_STATE.md`
- `WORLD_REFERENCE/README.md`
- `PLAY/README.md`
- `11_REFERENCE_VIEWS/current_release/current_release_manifest.json`
  
  In addition to the above, advanced users should explore the **runtime and locality engines**:
  - `05_RUNTIME_ENGINE/` – contains the campaign‑manager runtime support with projections, stress runs, world‑effect indexes, and registries for simulating state changes.
  - `03_LOCALITY_ENGINE/` – holds arrival, authority, behavior, culture and locality packets used to generate or extend local play surfaces.

## What is new in V33_1
- package-native world question answering contract for canon-grounded retrieval and response composition
- canon-safe intro build instructions preserved inside the repository as a reusable build note
- refreshed release manifests, checksums, and source inventory to include the new support files
- current-release guide for broad worldsetting question routing and status-labeled answers
- integrated runtime engine (`05_RUNTIME_ENGINE`) and locality engine (`03_LOCALITY_ENGINE`) directories providing simulation support and locality packet generation

## What V33_1 improvements remain included
- hard release-identity normalization to V33_1 lineage
- regenerated current-release manifests and validation reports
- semantic repair pass for misaligned named NPC records and anonymous interface-role placeholders
- expanded canon reference surfaces for pantheon, religion, doomsday consequences, and region play
- cleaner operator-facing release guidance and audit reporting

## Repository stance
This package remains standalone and internally navigable. It may mention that it was built from source documents and prior repository layers, but it is intended to function on its own once unzipped.
