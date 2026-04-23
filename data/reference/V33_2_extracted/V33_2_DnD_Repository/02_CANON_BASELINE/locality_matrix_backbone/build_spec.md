# Locality Matrix Backbone Build Spec and Schema

## Purpose

Build a canonical locality labeling backbone that can support:

- travel UI lookups
- environment and narrative lookups
- local bestiary assignment
- culture and polity-flavor inheritance
- validation and audit checks
- synthetic district generation for large settlements
- mobile caravan overlays

The backbone must preserve raw source wording, preserve hierarchy, and allow conservative fallback assignment only when explicitly governed by schema rules.

---

## Source scope

Primary source classes:

- `polities`
- `macroregions`
- `settlements`
- `districts`
- `sublocations`
- `operational_anchors`
- `wilderness_points`
- `spatial/location_key`
- `spatial/polity_summary`
- `route_transition_packets`
- `locality_packets`
- `district_packets`

Separate runtime products built from the same backbone:

1. `locality_matrix`
2. `route_matrix`
3. `narrative_lookup`
4. `bestiary_lookup`
5. `culture_lookup`

---

## Canonical hierarchy

Top-down chain:

`umbrella_polity -> parent_polity -> macroregion_environment_profile -> locality`

Where relevant, locality continues downward as:

- `settlement -> district -> sublocation`
- `settlement -> sublocation`
- `settlement -> synthetic_district -> sublocation`
- `operational_anchor`
- `wilderness_point`

Route data is stored separately and linked by locality IDs:

`from_locality -> to_locality`

---

## Locality row unit

The base row unit is **one row per named place**.

Valid named place classes:

- settlement
- district
- sublocation
- operational anchor
- wilderness point
- macroregion

A separate row type exists for routes, not mixed into locality rows.

---

## Crosswalk rules

Every significant label must preserve both raw source wording and code-safe handling.

Each label-bearing field should be materialized as:

- `raw_value`
- `normalized_key`
- `source_field`
- `source_file_class`

### Example crosswalk object

```json
{
  "raw_value": "Principality of Shelk",
  "normalized_key": "principality_of_shelk",
  "source_field": "parent_polity_normalized",
  "source_file_class": "settlements"
}
```

### Crosswalk rules

- raw source strings are authoritative display values
- normalized keys are for joins, validation, and code
- no two distinct raw values may be merged unless explicitly crosswalked
- every crosswalk merge must be auditable

---

## Tier rules

### Tier 1: umbrella polity

Examples include umbrella-level polity blocks such as:

- The Principalities
- Sheresh Communes
- Soreheim Alliance
- Psanan

### Tier 2: parent polity

Examples include second-tier polity rows beneath umbrella blocks, including:

- Principality of Shelk
- Principality of Cosmouth
- Principality of Shirsh
- Principality of Roaz
- Principality of Zootia
- Principality of Mimolot
- Panim
- The Union

`The Union` is stored as a second-tier polity under `The Principalities`, while remaining distinct in its narrative, cultural, and industrial handling.

---

## Macroregion and environment profile

Macroregions are real hierarchy nodes.

Each locality row links upward to one singular macroregion/environment profile.

### Environment storage model

Store both:

1. raw environment fields
2. merged weighted environment profile

### Raw environment fields

Suggested fields:

- `macroregion_name_raw`
- `macroregion_key`
- `biome_scale_label_raw`
- `biome_scale_label_key`
- `locality_scale_biome_raw`
- `locality_scale_biome_key`
- `surface_role_raw`
- `surface_role_key`
- `nearest_spatial_node_raw`
- `nearest_spatial_node_key`

### Merged environment profile

Suggested fields:

- `primary_environment_label_raw`
- `primary_environment_label_key`
- `environment_components[]`
- `environment_weights{}`
- `environment_assignment_method`
- `environment_assignment_confidence`

### Weight order

1. direct locality-specific biome/locality-scale environment
2. nearest mapped spatial node
3. macroregion
4. surface role
5. polity environmental identity

### Usage priority by downstream product

#### narration and culture

- polity first
- then environment profile

#### bestiary

- environment first
- then polity constraint or modifier

---

## Locality classes

Distinct node classes must be preserved in schema.

### Allowed locality classes

- `settlement`
- `district`
- `sublocation`
- `operational_anchor`
- `wilderness_point`
- `macroregion`

### Required category fields

Each locality row should include:

- `record_kind = locality`
- `locality_class`
- `locality_type_raw`
- `locality_type_key`

### Additional class-specific fields

#### settlement

- `settlement_type_raw`
- `settlement_type_key`

#### district

- `district_type_raw`
- `district_type_key`
- `parent_settlement_id`

#### sublocation

- `sublocation_type_raw`
- `sublocation_type_key`
- `parent_district_id` or `parent_settlement_id`

#### operational anchor

- `anchor_type_raw`
- `anchor_type_key`
- `anchor_kind_raw`
- `anchor_kind_key`

#### wilderness point

- `travel_tags_raw[]`
- `travel_tags_keys[]`

---

## Large-settlement district generation

Synthetic district structure must be created for these settlement types when canon district structure is absent:

- `city`
- `metropolis`
- `floating metropolis`
- `macro-capital core`

### Shared synthetic district set

- `High Quarter`
- `Common Quarter`
- `Low Ward`

### Synthetic district rules

- if canon district rows exist, use canon and do not replace them
- if canon district rows do not exist for a large settlement, create synthetic districts
- synthetic districts must be flagged as generated, not source-native
- synthetic districts must use best-fit POI assignment

### Required synthetic district fields

- `is_synthetic = true`
- `synthetic_generation_rule = class_based_city_partition`
- `synthetic_basis = settlement_type`
- `parent_settlement_id`

### Smaller settlements

Smaller settlements remain flat:

`settlement -> POI directly`

---

## POI assignment rules

POIs and sublocations must be assigned by best fit.

### Assignment logic

1. if canon district parent exists, use it
2. else if settlement is large and synthetic districts exist, assign by best-fit district intention
3. else attach directly under settlement
4. if POI is outside district and settlement structures entirely, attach under wilderness only when source placement indicates that relationship

### Best-fit intention mapping

The build should support a rule table that maps POI/sublocation types to:

- `High Quarter`
- `Common Quarter`
- `Low Ward`

Example tendencies:

- prestigious temples, high courts, elite guild halls, formal archives -> High Quarter
- ordinary markets, inns, workshops, social halls -> Common Quarter
- repair yards, labor-heavy service areas, crowded support spaces -> Low Ward

This mapping must remain auditable and overridable by canon locality-specific placement.

---

## Route matrix

Route data is stored separately from locality rows.

### Route row unit

One row per route edge.

### Route matrix fields

Required:

- `record_kind = route`
- `from_locality_id`
- `to_locality_id`
- `directionality`
- `allowed_travel_modes[]`
- `travel_tags_raw[]`
- `travel_tags_keys[]`
- `hazard_tags_raw[]`
- `hazard_tags_keys[]`
- `route_note_raw`
- `route_type_raw`
- `route_type_key`
- `distance_units`
- `travel_time_by_mode{}`
- `assignment_method`
- `assignment_confidence`

### Directionality rules

Routes are directional only when:

- travel mode differs by direction
- hazard differs by direction
- source route packets explicitly distinguish direction

Otherwise, routes may be treated as bidirectional with mirrored records.

---

## Travel modes

Allowed travel modes:

- `foot`
- `horse`
- `cart`
- `boat`
- `airship`

### Explicit route-edge rule

Each route edge must store explicit `allowed_travel_modes`.

Derivation from route class is only a fallback.

### Water travel rule

Boat travel only exists on explicit water-route edges.

Do not infer boat travel from coastline alone.

### Airship rule

Airship travel only exists where there is explicit docking, tower, or airship-capable locality/anchor infrastructure.

---

## Travel speed model

Recommended base speed model, preserving adjacency logic while supporting explicit travel lookup:

- foot: `1` distance unit per day
- horse: `2` distance units per day
- cart: `1` distance unit per day
- boat: `3` distance units per day
- airship: `4` distance units per day

### Travel time formula

`travel_days = ceiling(distance_units / mode_speed)`

### Travel fields

Suggested route fields:

```json
{
  "distance_units": 1,
  "allowed_travel_modes": ["foot", "horse", "cart"],
  "travel_time_by_mode": {
    "foot": 1,
    "horse": 1,
    "cart": 1
  }
}
```

---

## Nomdara caravan overlay

Nomdara is modeled as an additive **mobile locality packet**.

### Attachment rule

Attach to the geographically nearest node on the map.

### Tie-break order

1. named settlement
2. operational anchor
3. wilderness point
4. district only if already inside a settlement

### Nomdara fields

Suggested:

- `overlay_kind = mobile_locality_packet`
- `overlay_name_raw`
- `overlay_name_key`
- `attached_locality_id`
- `attachment_method = nearest_geographic_node`
- `attachment_confidence`
- `mobile_services[]`
- `mobile_flavor_profile`
- `temporary_route_effects[]`

---

## Narrative, culture, and bestiary products

Three separate lookup products must be built from the same backbone.

### 1. Narrative lookup

Driven by:

- umbrella polity
- parent polity
- macroregion/environment profile
- locality class and type
- district type
- POI type
- route transition tags

Priority:

- polity first
- environment second

### 2. Culture lookup

Driven by:

- polity hierarchy
- environment profile
- locality class
- settlement type / district type / POI type

Priority:

- polity first
- environment second

### 3. Bestiary lookup

Driven by:

- environment profile
- surface role
- macroregion
- route/wilderness pressure
- polity as constraint or override where applicable

Priority:

- environment first
- polity second

---

## Template system

Use a combined template model:

- tagged prose fragments with conditions
- structured text components

### Recommended template slots

- `opening_image`
- `terrain_material_feel`
- `ambient_activity`
- `visible_power_structure`
- `common_labor_or_traffic`
- `outsider_friction`
- `local_threat_pressure`
- `beast_ecology_pressure`
- `sensory_close`
- `district_poi_differentiator`

### Template condition inputs

Templates may condition on:

- umbrella polity
- parent polity
- macroregion
- surface role
- environment components
- settlement type
- district type
- POI type
- travel tags
- hazard tags
- synthetic vs canon district

---

## Fallback and inference policy

Fallback assignment is allowed only under explicit controlled rules.

Every inferred or fallback assignment must record:

- `assignment_method`
- `assignment_confidence`
- `source_basis[]`

### Example

```json
{
  "assignment_method": "nearest_spatial_node",
  "assignment_confidence": "conservative_inference",
  "source_basis": ["location_key", "macroregion", "route_transition_packet"]
}
```

### Default fallback rule order

1. direct canon field on named locality
2. canon parent locality or parent polity support
3. nearest mapped spatial node
4. macroregion
5. explicit schema default

No silent fallback is allowed.

---

## Validation rules

Validation must be strict.

### Hierarchy validation

- every locality must resolve to one umbrella polity
- every locality must resolve to one parent polity
- every locality must resolve to one macroregion/environment profile
- every district must resolve to a settlement parent
- every sublocation must resolve to a district parent or settlement parent
- every synthetic district must resolve to a valid large-settlement parent

### Route validation

- every route must resolve `from_locality_id`
- every route must resolve `to_locality_id`
- every route must have explicit `allowed_travel_modes`
- no airship route without explicit airship-capable infrastructure support
- no boat route without explicit water-edge support
- directional routes must justify directional split by hazard or mode

### Label validation

- every raw label used in matrix rows must have a normalized key
- no duplicate normalized key for semantically distinct raw labels
- no merge of distinct raw labels without explicit crosswalk record

### Synthetic validation

- synthetic districts may only exist for approved large-settlement classes
- canon district rows override synthetic generation
- synthetic district generation must be logged and reproducible

### Nomdara validation

- every Nomdara overlay must attach to one nearest locality node
- attachment must record tie-break result when relevant

---

## Suggested locality_matrix row shape

```json
{
  "record_kind": "locality",
  "locality_id": "shelkopolis",
  "display_name_raw": "Shelkopolis",
  "display_name_key": "shelkopolis",
  "locality_class": "settlement",
  "settlement_type_raw": "house capital",
  "settlement_type_key": "house_capital",
  "umbrella_polity": {
    "raw_value": "The Principalities",
    "normalized_key": "the_principalities",
    "source_field": "umbrella_polity",
    "source_file_class": "settlements"
  },
  "parent_polity": {
    "raw_value": "Principality of Shelk",
    "normalized_key": "principality_of_shelk",
    "source_field": "parent_polity_normalized",
    "source_file_class": "settlements"
  },
  "macroregion_environment_profile": {
    "macroregion_name_raw": "Aurora Meadows",
    "macroregion_key": "aurora_meadows",
    "surface_role_raw": "volcanic_coast",
    "surface_role_key": "volcanic_coast",
    "primary_environment_label_raw": "Aurora Meadows",
    "primary_environment_label_key": "aurora_meadows",
    "environment_components": ["aurora_meadows", "volcanic_coast"],
    "environment_weights": {
      "locality_specific": 1.0,
      "nearest_spatial_node": 0.9,
      "macroregion": 0.8,
      "surface_role": 0.7,
      "polity_environment_identity": 0.6
    },
    "environment_assignment_method": "direct_plus_weighted_merge",
    "environment_assignment_confidence": "direct"
  },
  "children": ["shelkopolis_high_quarter", "shelkopolis_common_quarter", "shelkopolis_low_ward"]
}
```

---

## Suggested route_matrix row shape

```json
{
  "record_kind": "route",
  "route_id": "shelkopolis_to_harvest_keep_land_01",
  "from_locality_id": "shelkopolis",
  "to_locality_id": "harvest_keep",
  "directionality": "bidirectional",
  "allowed_travel_modes": ["foot", "horse", "cart"],
  "travel_tags_raw": ["trade chokepoint", "inspection corridor"],
  "travel_tags_keys": ["trade_chokepoint", "inspection_corridor"],
  "route_type_raw": "road",
  "route_type_key": "road",
  "distance_units": 1,
  "travel_time_by_mode": {
    "foot": 1,
    "horse": 1,
    "cart": 1
  },
  "assignment_method": "route_packet_plus_adjacency",
  "assignment_confidence": "direct"
}
```

---

## Build order

1. ingest raw polity labels and build crosswalk table
2. ingest macroregions and environment-support nodes
3. ingest named localities by class
4. resolve umbrella polity and parent polity for every named locality
5. resolve macroregion/environment profile for every named locality
6. attach canon districts where present
7. generate synthetic districts for approved large-settlement types lacking canon districts
8. attach sublocations/POIs by canon parent, then best-fit rules
9. ingest route edges and assign explicit travel modes, directionality, hazards, and tags
10. compute travel times by mode
11. attach Nomdara mobile locality packets to nearest geographic nodes
12. generate narrative, culture, and bestiary lookup products
13. run validation and emit audit logs

---

## Output products

Required outputs:

- `locality_matrix.json`
- `route_matrix.json`
- `label_crosswalk.json`
- `environment_profiles.json`
- `narrative_lookup.json`
- `culture_lookup.json`
- `bestiary_lookup.json`
- `validation_report.json`
- `build_spec.md`
- `schema.json`

