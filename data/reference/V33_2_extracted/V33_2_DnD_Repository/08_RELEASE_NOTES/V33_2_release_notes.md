# V33_2 Release Notes

V33_2 updates **V33_1** by replacing the active locality canon with the uploaded locality matrix backbone specification and emitting the required matrix products as the new canonical locality layer.

## Release identity
- Build version: V33_2
- Package root: V33_2_DnD_Repository
- Build signature: V33_2_LOCALITY_MATRIX_CANON_REPLACEMENT_REBUILD
- Generated at: 2026-04-20T22:34:37Z

## What changed
- added `02_CANON_BASELINE/locality_matrix_backbone/locality_matrix.json`
- added `02_CANON_BASELINE/locality_matrix_backbone/route_matrix.json`
- added `02_CANON_BASELINE/locality_matrix_backbone/label_crosswalk.json`
- added `02_CANON_BASELINE/locality_matrix_backbone/environment_profiles.json`
- added `02_CANON_BASELINE/locality_matrix_backbone/narrative_lookup.json`
- added `02_CANON_BASELINE/locality_matrix_backbone/culture_lookup.json`
- added `02_CANON_BASELINE/locality_matrix_backbone/bestiary_lookup.json`
- added `02_CANON_BASELINE/locality_matrix_backbone/validation_report.json`
- added `01_CANON_GOVERNANCE/locality_matrix_canon_contract.json`
- updated top-level operator documentation to route through the new matrix first

## Validation summary
- locality rows: 239
- route rows: 46
- hierarchy failures: 46
- route failures: 6
- label failures: 0
- Nomdara attachment failures: 3

## Canon authority note
Existing locality packets, route transition packets, and world inspection packets remain useful descriptive surfaces, but `V33_2` treats the locality matrix backbone as the canonical locality hierarchy and routing layer.
