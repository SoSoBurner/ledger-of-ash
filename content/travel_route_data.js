// travel_route_data.js — Spatial metadata for travel routes
// Loaded via <script src="content/travel_route_data.js"></script>
//
// Exposes window.ROUTE_SPATIAL_DATA with a bidirectional .get(fromId, toId)
// lookup. Each route is stored once in canonical direction; the .get() method
// tries both fromId|toId and toId|fromId.
//
// Properties used by engine:
//   route_note     — sensory route description rendered in travel overlay
//   biomes         — biome list for encounter-pool weighting
//   route_class    — 'overland' | 'river' | 'sea' | 'mixed'
//   allowed_modes  — modes the engine should render as travel options
//
// allowed_modes must match TRAVEL_ROUTES values: only include a mode if its
// TRAVEL_ROUTES entry for this route is > 0. Sea-only routes use ['boat'].

(function() {
  'use strict';

  var _data = {
    'shelkopolis|fairhaven': {
      route_note: 'The Shelkopolis road is easiest when intentions, cargo, and patronage are legible before questions begin.',
      biomes: ['plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'shelkopolis|aurora_crown_commune': {
      route_note: 'The Whitebridge Domeway passes two checkpoint posts. Both are staffed. Neither is informal.',
      biomes: ['plains','highland'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'shelkopolis|cosmoria': {
      route_note: 'The Brineland harbor ring runs through Cosmouth authority. Cargo manifests are inspected at two points.',
      biomes: ['plains','coastal'],
      route_class: 'mixed',
      allowed_modes: ['foot','horse','cart','boat']
    },
    'guildheart_hub|fairhaven': {
      route_note: 'The plains road between Guildheart and Fairhaven carries Guild transit seals. Both are required.',
      biomes: ['plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'guildheart_hub|ithtananalor': {
      route_note: 'Forest roads here are maintained to guild standard but the canopy reduces sightlines. Wardens work in pairs.',
      biomes: ['plains','forest'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'guildheart_hub|soreheim_proper': {
      route_note: 'The Craftspire corridor enters Soreheim allocation territory at the highland boundary. Quota transit rules apply.',
      biomes: ['plains','highland','mountain'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'guildheart_hub|mimolot_academy': {
      route_note: 'Mimolot-bound traffic is light but checked twice — once at the guild transit gate and once at the academy boundary.',
      biomes: ['plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'soreheim_proper|sunspire_haven': {
      route_note: 'The highland road between Soreheim and Sunspire is a quota route. Extraction figures are posted at each marker.',
      biomes: ['mountain','highland'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'panim_haven|shirshal': {
      route_note: 'The coastal road between Panim and Shirshal runs through contested patrol zones. The jurisdictional boundary is not marked.',
      biomes: ['coastal'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'shirshal|ithtananalor': {
      route_note: 'The forest road east is maintained by neither Shirshal nor Ithtananalor authority. It shows.',
      biomes: ['forest'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'mimolot_academy|ithtananalor': {
      route_note: 'Forest road. Academy-sealed cargo moves this route regularly; searchers know the smell of the wax.',
      biomes: ['plains','forest'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'amber_fountain_inn|fairhaven': {
      route_note: 'The Amber Tides river route requires port authorization at Fairhaven. The river master checks manifests against the harbor ledger.',
      biomes: ['coastal'],
      route_class: 'river',
      allowed_modes: ['boat']
    },
    'cosmoria|brineland': {
      route_note: 'The Brineland sea passage is open year-round but subject to seasonal storm windows. Port inspection on arrival.',
      biomes: ['sea'],
      route_class: 'sea',
      allowed_modes: ['boat']
    },
    'cosmoria|panim_haven': {
      route_note: 'The coastal sea lane between Cosmoria and Panim Haven is short but well-patrolled. Harbor masters at both ends compare manifests.',
      biomes: ['coastal','sea'],
      route_class: 'sea',
      allowed_modes: ['boat']
    },
    'ashforge_citadel|ashwake_port': {
      route_note: 'The coastal road between Ashforge and Ashwake is marked by Psanan authority posts. Cargo declarations are required at both ends.',
      biomes: ['coastal'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'glasswake_commune|shelkopolis': {
      route_note: 'The highland road from Glasswake into Shelkopolis carries Sheresh transit papers through the border zone. Neither authority fully acknowledges the other.',
      biomes: ['highland','plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'eternal_lands|soreheim_proper': {
      route_note: 'The Eternal Lands sea approach to Soreheim is long and exposed. Extraction vessels move this route in convoy.',
      biomes: ['sea','coastal'],
      route_class: 'sea',
      allowed_modes: ['boat']
    },
    'ithtananalor|fairhaven': {
      route_note: 'The forest road west to Fairhaven is older than the guild maintenance schedule. The verge is overgrown past the first waymarker. Guild transit seals are still required at the Fairhaven boundary, but there is no one to check them before that.',
      biomes: ['forest', 'plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'mimolot_academy|fairhaven': {
      route_note: 'The Mimolot plains road to Fairhaven carries Academy-sealed cargo regularly. The guild checkpoint at the Fairhaven entry is familiar with Academy manifests. Familiarity is not the same as speed.',
      biomes: ['plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'panim_haven|fairhaven': {
      route_note: 'The coastal road north from Panim Haven runs three months of patrol conflict before the terrain opens into Fairhaven approach. Jurisdiction shifts twice without posted markers.',
      biomes: ['coastal', 'plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'shirshal|fairhaven': {
      route_note: 'The Shirshal road to Fairhaven passes through contested patrol territory for the first quarter of the route. After the boundary post, the road improves and the jurisdiction becomes clear again.',
      biomes: ['coastal', 'plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'soreheim_proper|fairhaven': {
      route_note: 'The direct road from Soreheim to Fairhaven crosses three territorial boundaries and two mountain passes. Most cargo traffic uses the Guildheart Hub relay. This route exists but is not maintained for speed.',
      biomes: ['mountain', 'highland', 'plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'sunspire_haven|fairhaven': {
      route_note: 'The highland road from Sunspire to Fairhaven descends through two elevation changes and a stretch of unmarked Soreheim extraction territory. Quota transit rules apply at the boundary post, if anyone is staffing it.',
      biomes: ['highland', 'plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'aurora_crown_commune|fairhaven': {
      route_note: 'The long road from Aurora Crown to Fairhaven bypasses Shelkopolis entirely. Sheresh transit papers are valid through the first two checkpoints. After the territorial boundary, they are not.',
      biomes: ['highland', 'plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'ithtananalor|shelkopolis': {
      route_note: 'The Ithtananalor overland crossing passes principality boundary posts before the Shelk approach. Intent and patronage are declared at each toll gate.',
      biomes: ['plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'shirshal|shelkopolis': {
      route_note: 'Shirshal roads narrow into the Shelk lowlands. House authority ends at the ridge; Shelk patrols begin at the river crossing.',
      biomes: ['plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'guildheart_hub|shelkopolis': {
      route_note: 'Union freight lanes run parallel to the Shelk access road. Cargo manifests are checked where the roads converge.',
      biomes: ['plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'mimolot_academy|shelkopolis': {
      route_note: 'The Academy descent crosses highland passes before the plains open toward Shelkopolis. Elevation drops sharply at the boundary marker.',
      biomes: ['highland', 'plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'panim_haven|shelkopolis': {
      route_note: 'Panim sea lanes connect to the Shelk harbor district. Overland travelers follow the coast road through Shelk customs at port entry.',
      biomes: ['coastal', 'plains'],
      route_class: 'mixed',
      allowed_modes: ['foot','horse','cart','boat']
    },
    'sunspire_haven|shelkopolis': {
      route_note: 'Sunspire descent crosses highland terrain before the road opens toward the Shelk lowlands. Elevation checkpoints mark the boundary.',
      biomes: ['highland', 'plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },
    'soreheim_proper|shelkopolis': {
      route_note: 'The Soreheim approach descends through mountain passes before entering Shelk territorial roads. Allocation transit rules apply at the highland boundary.',
      biomes: ['mountain', 'highland', 'plains'],
      route_class: 'overland',
      allowed_modes: ['foot','horse','cart']
    },

    // -------------------------------------------------------------------------
    // Cross-continental sea routes — Soreheim Proper <-> Principalities
    // Times from V33_2 world_graph.json coordinates (avg ocean 6.15 mi/px,
    // 120 mi/day ship). distance_km derived as boat_days * 222 km/day.
    // -------------------------------------------------------------------------
    'soreheim_proper|shirshal': {
      route_note: 'North Swirling Sea crossing. Forty-six days of open water under cargo manifest, the convoy lights visible only at dusk. Shirshal harbor inspection on arrival.',
      biomes: ['sea'],
      route_class: 'sea',
      allowed_modes: ['boat'],
      distance_km: 10221
    },
    'soreheim_proper|ithtananalor': {
      route_note: 'Open ocean passage. Fifty days to the Roaz coast offshore anchorage. Ithtananalor port wardens count hulls before they count crews.',
      biomes: ['sea'],
      route_class: 'sea',
      allowed_modes: ['boat'],
      distance_km: 11058
    },
    'soreheim_proper|aurora_crown_commune': {
      route_note: 'Polar crossing. The Swirling Sea narrows into frigid water and stays frigid for sixty-nine days. Dome-light is visible from the rail before landfall.',
      biomes: ['sea'],
      route_class: 'sea',
      allowed_modes: ['boat'],
      distance_km: 15292
    },
    'soreheim_proper|glasswake_commune': {
      route_note: 'Extreme polar crossing. Seventy-two days of open ocean ending at the Glasswake ice-shelf landfall. The Stewards meet the vessel before it docks.',
      biomes: ['sea'],
      route_class: 'sea',
      allowed_modes: ['boat'],
      distance_km: 15856
    }
  };

  // Bidirectional key lookup — engine calls .get(fromId, toId).
  // Each route is stored in one canonical direction; this checks both.
  window.ROUTE_SPATIAL_DATA = {
    get: function(fromId, toId) {
      return _data[fromId + '|' + toId] || _data[toId + '|' + fromId] || null;
    }
  };
})();
