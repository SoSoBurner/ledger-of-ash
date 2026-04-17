// ═══════════════════════════════════════════════════════
// BACKGROUND → STARTING LOCALITY MAPPING
// V28_8 Canon-Aligned Stage I Grounding
// Maps each background to its correct starting locality per V28_8
// ═══════════════════════════════════════════════════════

(function(){
  // Region to Locality ID mapping (V28_8 canonical mapping)
  const REGION_TO_LOCALITY = {
    'Shelkopolis': 'shelkopolis',
    'Ithtananalor': 'ithtananalor',
    'Panim Haven': 'panim_haven',
    'Fairhaven': 'fairhaven',
    'Soreheim Proper': 'soreheim_proper',
    'Aurora Crown Commune': 'aurora_crown_commune',
    'Sunspire Haven': 'sunspire_haven',
    'Mimolot Academy': 'mimolot_academy',
    'Shirshal': 'shirshal',
    'Guildheart Hub': 'guildheart_hub',
    'Cosmoria': 'cosmoria'
  };

  // Explicit background to locality mapping (from world-data.js regions)
  const BACKGROUND_STARTING_LOCALITY = {
    // WARRIOR
    'w_garrison': 'shelkopolis',
    'w_roaz': 'ithtananalor',
    'w_frontier': 'soreheim_proper',

    // KNIGHT
    'k_shelk': 'shelkopolis',
    'k_roaz': 'ithtananalor',
    'k_order': 'panim_haven',

    // RANGER
    'r_shelk': 'fairhaven',
    'r_soreheim': 'soreheim_proper',
    'r_sheresh': 'aurora_crown_commune',

    // PALADIN
    'p_cysur': 'shelkopolis',
    'p_eloljaro': 'ithtananalor',
    'p_gwybodaeth': 'mimolot_academy',

    // ARCHER
    'a_roadwarden': 'shelkopolis',
    'a_frontier': 'sunspire_haven',
    'a_nomdara': 'guildheart_hub',

    // BERSERKER
    'b_soreheim': 'soreheim_proper',
    'b_frontier': 'sunspire_haven',
    'b_cosmouth': 'cosmoria',

    // WIZARD
    'wz_mimolot': 'mimolot_academy',
    'wz_shelk': 'shelkopolis',
    'wz_field': 'soreheim_proper',  // Zootian Expanse approximates Soreheim research

    // CLERIC
    'cl_cysur': 'shelkopolis',
    'cl_eloljaro': 'ithtananalor',
    'cl_remeny': 'guildheart_hub',

    // PRIEST
    'pr_panim': 'panim_haven',
    'pr_community': 'fairhaven',
    'pr_soreheim': 'soreheim_proper',

    // NECROMANCER
    'nc_panim': 'panim_haven',
    'nc_mimolot': 'mimolot_academy',
    'nc_sheresh': 'aurora_crown_commune',

    // ILLUSIONIST
    'il_shelk': 'shelkopolis',
    'il_union': 'guildheart_hub',
    'il_twyll': 'shelkopolis',

    // INQUISITOR
    'iq_shirsh': 'shirshal',
    'iq_mimolot': 'mimolot_academy',
    'iq_union': 'guildheart_hub',

    // ELEMENTALIST
    'el_axis': 'sunspire_haven',
    'el_sheresh': 'aurora_crown_commune',
    'el_mimolot': 'mimolot_academy',

    // ROGUE
    'ro_shelk': 'shelkopolis',
    'ro_union': 'guildheart_hub',
    'ro_nomdara': 'guildheart_hub',

    // ASSASSIN
    'as_shadowhands': 'shelkopolis',
    'as_redhoodguild': 'shelkopolis',
    'as_shirsh': 'shirshal',

    // SPELLTHIEF
    'st_mimolot': 'mimolot_academy',
    'st_court': 'shelkopolis',

    // SCOUT
    'sc_field': 'soreheim_proper',
    'sc_mimolot': 'mimolot_academy',
    'sc_fairhaven': 'fairhaven',

    // THIEF
    'th_shelk': 'shelkopolis',
    'th_union': 'guildheart_hub',
    'th_shirsh': 'shirshal',

    // TRICKSTER
    'tr_shelk': 'shelkopolis',
    'tr_union': 'guildheart_hub',
    'tr_panim': 'panim_haven',

    // HEALER
    'he_shelk': 'shelkopolis',
    'he_panim': 'panim_haven',
    'he_mimolot': 'mimolot_academy',

    // ARTIFICER
    'ar_shelk': 'shelkopolis',
    'ar_soreheim': 'soreheim_proper',
    'ar_guild': 'guildheart_hub',

    // ENGINEER
    'en_soreheim': 'soreheim_proper',
    'en_sheresh': 'aurora_crown_commune',
    'en_guild': 'guildheart_hub',

    // TACTICIAN
    'ta_shelk': 'shelkopolis',
    'ta_panim': 'panim_haven',
    'ta_mimolot': 'mimolot_academy',

    // ALCHEMIST
    'al_shelk': 'shelkopolis',
    'al_mimolot': 'mimolot_academy',
    'al_guild': 'guildheart_hub',

    // SAINT
    'sa_shelk': 'shelkopolis',
    'sa_panim': 'panim_haven',
    'sa_guild': 'guildheart_hub',

    // WARDEN
    'wa_shelk': 'shelkopolis',
    'wa_roaz': 'ithtananalor',
    'wa_guild': 'guildheart_hub',

    // WARLORD
    'wl_shelk': 'shelkopolis',
    'wl_soreheim': 'soreheim_proper',
    'wl_roaz': 'ithtananalor',

    // DEATH KNIGHT
    'dk_panim': 'panim_haven',
    'dk_roaz': 'ithtananalor',
    'dk_shirsh': 'shirshal',

    // BEASTMASTER
    'bm_soreheim': 'soreheim_proper',
    'bm_sheresh': 'aurora_crown_commune',
    'bm_fairhaven': 'fairhaven',

    // ORACLE
    'or_shelk': 'shelkopolis',
    'or_panim': 'panim_haven',
    'or_mimolot': 'mimolot_academy',

    // BARD
    'bd_shelk': 'shelkopolis',
    'bd_guild': 'guildheart_hub',
    'bd_panim': 'panim_haven'
  };

  // Utility function to get starting locality for a background
  function getStartingLocality(backgroundId) {
    return BACKGROUND_STARTING_LOCALITY[backgroundId] || 'shelkopolis'; // Default fallback
  }

  window.BACKGROUND_STARTING_LOCALITY = BACKGROUND_STARTING_LOCALITY;
  window.REGION_TO_LOCALITY = REGION_TO_LOCALITY;
  window.getStartingLocality = getStartingLocality;
})();
