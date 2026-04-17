// ═══════════════════════════════════════════════════════
// BACKGROUND → STARTING LOCALITY MAPPING
// V28_8 Canon-Aligned Stage I Grounding
// Keys match data.js background ID scheme: {archetype}_{civic|frontier|occult}
// ═══════════════════════════════════════════════════════

(function(){
  const BACKGROUND_STARTING_LOCALITY = {
    // WARRIOR
    warrior_civic:      'shelkopolis',
    warrior_frontier:   'soreheim_proper',
    warrior_occult:     'ithtananalor',

    // KNIGHT
    knight_civic:       'shelkopolis',
    knight_frontier:    'ithtananalor',
    knight_occult:      'panim_haven',

    // RANGER
    ranger_civic:       'fairhaven',
    ranger_frontier:    'soreheim_proper',
    ranger_occult:      'aurora_crown_commune',

    // PALADIN
    paladin_civic:      'shelkopolis',
    paladin_frontier:   'ithtananalor',
    paladin_occult:     'mimolot_academy',

    // ARCHER
    archer_civic:       'shelkopolis',
    archer_frontier:    'sunspire_haven',
    archer_occult:      'guildheart_hub',

    // BERSERKER
    berserker_civic:    'soreheim_proper',
    berserker_frontier: 'sunspire_haven',
    berserker_occult:   'cosmoria',

    // WIZARD
    wizard_civic:       'mimolot_academy',
    wizard_frontier:    'shelkopolis',
    wizard_occult:      'soreheim_proper',

    // CLERIC
    cleric_civic:       'shelkopolis',
    cleric_frontier:    'ithtananalor',
    cleric_occult:      'guildheart_hub',

    // PRIEST
    priest_civic:       'panim_haven',
    priest_frontier:    'fairhaven',
    priest_occult:      'soreheim_proper',

    // NECROMANCER
    necromancer_civic:      'panim_haven',
    necromancer_frontier:   'mimolot_academy',
    necromancer_occult:     'aurora_crown_commune',

    // ILLUSIONIST
    illusionist_civic:      'shelkopolis',
    illusionist_frontier:   'guildheart_hub',
    illusionist_occult:     'shirshal',

    // INQUISITOR
    inquisitor_civic:       'shirshal',
    inquisitor_frontier:    'mimolot_academy',
    inquisitor_occult:      'guildheart_hub',

    // ELEMENTALIST
    elementalist_civic:     'sunspire_haven',
    elementalist_frontier:  'aurora_crown_commune',
    elementalist_occult:    'mimolot_academy',

    // ROGUE
    rogue_civic:        'shelkopolis',
    rogue_frontier:     'guildheart_hub',
    rogue_occult:       'fairhaven',

    // ASSASSIN
    assassin_civic:     'shelkopolis',
    assassin_frontier:  'shelkopolis',
    assassin_occult:    'shirshal',

    // SPELLTHIEF
    spellthief_civic:   'mimolot_academy',
    spellthief_frontier:'shelkopolis',
    spellthief_occult:  'guildheart_hub',

    // SCOUT
    scout_civic:        'soreheim_proper',
    scout_frontier:     'mimolot_academy',
    scout_occult:       'fairhaven',

    // THIEF
    thief_civic:        'shelkopolis',
    thief_frontier:     'guildheart_hub',
    thief_occult:       'shirshal',

    // TRICKSTER
    trickster_civic:    'shelkopolis',
    trickster_frontier: 'guildheart_hub',
    trickster_occult:   'panim_haven',

    // BEASTMASTER
    beastmaster_civic:      'soreheim_proper',
    beastmaster_frontier:   'aurora_crown_commune',
    beastmaster_occult:     'fairhaven',

    // HEALER
    healer_civic:       'shelkopolis',
    healer_frontier:    'panim_haven',
    healer_occult:      'mimolot_academy',

    // ARTIFICER
    artificer_civic:    'shelkopolis',
    artificer_frontier: 'soreheim_proper',
    artificer_occult:   'guildheart_hub',

    // ENGINEER
    engineer_civic:     'soreheim_proper',
    engineer_frontier:  'aurora_crown_commune',
    engineer_occult:    'guildheart_hub',

    // TACTICIAN
    tactician_civic:    'shelkopolis',
    tactician_frontier: 'panim_haven',
    tactician_occult:   'mimolot_academy',

    // ALCHEMIST
    alchemist_civic:    'shelkopolis',
    alchemist_frontier: 'mimolot_academy',
    alchemist_occult:   'guildheart_hub',

    // SAINT
    saint_civic:        'shelkopolis',
    saint_frontier:     'panim_haven',
    saint_occult:       'guildheart_hub',

    // WARDEN
    warden_civic:       'shelkopolis',
    warden_frontier:    'ithtananalor',
    warden_occult:      'guildheart_hub',

    // WARLORD
    warlord_civic:      'shelkopolis',
    warlord_frontier:   'soreheim_proper',
    warlord_occult:     'ithtananalor',

    // DEATH KNIGHT
    death_knight_civic:     'panim_haven',
    death_knight_frontier:  'ithtananalor',
    death_knight_occult:    'shirshal',

    // ORACLE
    oracle_civic:       'shelkopolis',
    oracle_frontier:    'panim_haven',
    oracle_occult:      'mimolot_academy',

    // BARD
    bard_civic:         'shelkopolis',
    bard_frontier:      'guildheart_hub',
    bard_occult:        'panim_haven'
  };

  function getStartingLocality(backgroundId) {
    return BACKGROUND_STARTING_LOCALITY[backgroundId] || 'shelkopolis';
  }

  window.BACKGROUND_STARTING_LOCALITY = BACKGROUND_STARTING_LOCALITY;
  window.getStartingLocality = getStartingLocality;
})();
