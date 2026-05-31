window.ROUTE_SPATIAL_DATA = {
  'shelkopolis|fairhaven': {
    route_note: 'The Shelkopolis road is easiest when intentions, cargo, and patronage are legible before questions begin.',
    biomes: ['plains'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'shelkopolis|aurora': {
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
  'guildheart|fairhaven': {
    route_note: 'The plains road between Guildheart and Fairhaven carries Guild transit seals. Both are required.',
    biomes: ['plains'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'guildheart|ithtananalor': {
    route_note: 'Forest roads here are maintained to guild standard but the canopy reduces sightlines. Wardens work in pairs.',
    biomes: ['plains','forest'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'guildheart|soreheim': {
    route_note: 'The Craftspire corridor enters Soreheim allocation territory at the highland boundary. Quota transit rules apply.',
    biomes: ['plains','highland','mountain'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'guildheart|mimolot': {
    route_note: 'Mimolot-bound traffic is light but checked twice — once at the guild transit gate and once at the academy boundary.',
    biomes: ['plains'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'soreheim|sunspire': {
    route_note: 'The highland road between Soreheim and Sunspire is a quota route. Extraction figures are posted at each marker.',
    biomes: ['mountain','highland'],
    route_class: 'overland',
    allowed_modes: ['foot','horse','cart']
  },
  'panim|shirshal': {
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
  'mimolot|ithtananalor': {
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
  }
};

ROUTE_SPATIAL_DATA.get = function(fromId, toId) {
  return this[fromId + '|' + toId] || this[toId + '|' + fromId] || null;
};
