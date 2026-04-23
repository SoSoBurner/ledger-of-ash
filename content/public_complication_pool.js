var PUBLIC_COMPLICATION_POOL = {
  shelkopolis: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around glyph corruption beyond the city.",
    "Someone mistakes the party for agents tied to House Shelk nobility.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  cosmoria: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around storm weather.",
    "Someone mistakes the party for agents tied to House Cosmouth.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  guildheart_hub: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around legacy Mal claims.",
    "Someone mistakes the party for agents tied to The Union.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  panim_haven: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around divine balance obligations.",
    "Someone mistakes the party for agents tied to House Panim.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  ithtananalor: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around illicit magic.",
    "Someone mistakes the party for agents tied to Lord Aric Roaz.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  soreheim_proper: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around quota demands.",
    "Someone mistakes the party for agents tied to Giant Council.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  craftspire: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around copy theft.",
    "Someone mistakes the party for agents tied to The Union.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  ironhold_quarry: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around labor harshness.",
    "Someone mistakes the party for agents tied to ORE.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  unity_square: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around price shocks.",
    "Someone mistakes the party for agents tied to Union market stewards.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  glasswake_commune: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around exposure incidents.",
    "Someone mistakes the party for agents tied to Containment Research Concord.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  plumes_end_outpost: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around caravan disruption rumors.",
    "Someone mistakes the party for agents tied to Roadwardens and caravan authorities.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  whitebridge_commune: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around bridge icing.",
    "Someone mistakes the party for agents tied to Route Warden Compacts.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  fairhaven: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around glyph corruption.",
    "Someone mistakes the party for agents tied to local clergy.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  harvest_circle: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around spoilage.",
    "Someone mistakes the party for agents tied to harvest stewards.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  mimolot_academy: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around tariff tensions.",
    "Someone mistakes the party for agents tied to House Mimolot.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  shirshal: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around magical law violations.",
    "Someone mistakes the party for agents tied to Magi Magistratus.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  sunspire_haven: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around predators.",
    "Someone mistakes the party for agents tied to regional leaders.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  aurora_crown_commune: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around dome stress.",
    "Someone mistakes the party for agents tied to Sheresh Dome Stewards.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ],
  // Districts (four sub-districts merged under a shared key)
  districts: [
    "A minor official wants paperwork clarified.",
    "A public argument exposes pressure around alliances.",
    "Someone mistakes the party for agents tied to House Shelk nobility.",
    "A public argument exposes pressure around desperation contracts.",
    "Someone mistakes the party for agents tied to local warders.",
    "A public argument exposes pressure around house rivalry over symbolism.",
    "Someone mistakes the party for agents tied to Rebuilding Oath Courts.",
    "A public argument exposes pressure around economic fraud.",
    "Someone mistakes the party for agents tied to Fashion Artisans Collective.",
    "A delay at a gate, quay, shrine, or market creates heat.",
    "A rumor spreads too quickly.",
    "A small errand reveals a larger local imbalance."
  ]
};

function triggerPublicComplication(localityId) {
  var pool = PUBLIC_COMPLICATION_POOL[localityId];
  if (!pool || pool.length === 0) return null;
  var text = pool[Math.floor(Math.random() * pool.length)];
  if (typeof addNarration === 'function') {
    addNarration('Complication', text);
  }
  if (typeof G !== 'undefined' && G.worldClocks) {
    G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
  }
  return text;
}

window.PUBLIC_COMPLICATION_POOL = PUBLIC_COMPLICATION_POOL;
window.triggerPublicComplication = triggerPublicComplication;
