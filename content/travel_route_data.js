window.ROUTE_SPATIAL_DATA = {
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
  }
};

// Normalize key lookup — both directions map to the same canonical entry.
// Usage: ROUTE_SPATIAL_DATA.get('fairhaven', 'shelkopolis')
ROUTE_SPATIAL_DATA.get = function(fromId, toId) {
  return this[fromId + '|' + toId] || this[toId + '|' + fromId] || null;
};
