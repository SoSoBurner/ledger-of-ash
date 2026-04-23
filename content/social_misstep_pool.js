// social_misstep_pool.js
// Maps locality_id -> array of social misstep consequence strings.
// Called when a persuasion or lore check fails in a Stage 2 locality encounter.
// Source: V33_2 locality_packets social_misstep_examples arrays.

var SOCIAL_MISSTEP_POOL = {

  shelkopolis: [
    "Treating Shelkopolis like a casual stop rather than a governed space.",
    "Ignoring local expectation to observe site-specific decorum; respect local fashion and craft traditions."
  ],

  cosmoria: [
    "Treating Cosmoria like a casual stop rather than a governed space.",
    "Ignoring local expectation to respect archives and maritime administration."
  ],

  guildheart_hub: [
    "Treating Guildheart Hub like a casual stop rather than a governed space.",
    "Ignoring local expectation to declare business plainly; observe queue and hearing order."
  ],

  panim_haven: [
    "Treating Panim Haven like a casual stop rather than a governed space.",
    "Ignoring local expectation to ritual seriousness and respectful petition."
  ],

  ithtananalor: [
    "Treating Ithtananalor like a casual stop rather than a governed space.",
    "Ignoring local expectation to comply promptly; accept inspection."
  ],

  soreheim_proper: [
    "Treating Soreheim Proper like a casual stop rather than a governed space.",
    "Ignoring local expectation to meet quotas; respect tower rank."
  ],

  craftspire: [
    "Treating Craftspire like a casual stop rather than a governed space.",
    "Ignoring local expectation to respect queue and workshop boundaries; do not touch commissioned work."
  ],

  ironhold_quarry: [
    "Treating Ironhold Quarry like a casual stop rather than a governed space.",
    "Ignoring local expectation to obey labor zones and guard instructions."
  ],

  unity_square: [
    "Treating Unity Square like a casual stop rather than a governed space.",
    "Ignoring local expectation to state terms clearly; observe inspection lines."
  ],

  glasswake_commune: [
    "Treating Glasswake Commune like a casual stop rather than a governed space.",
    "Ignoring local expectation to submit to scanning; treat every breach as real until cleared."
  ],

  plumes_end_outpost: [
    "Treating Plume's End Outpost like a casual stop rather than a governed space.",
    "Ignoring local expectation to submit to route order; respect shrine etiquette."
  ],

  whitebridge_commune: [
    "Treating Whitebridge Commune like a casual stop rather than a governed space.",
    "Ignoring local expectation to declare route intent; share hazard knowledge before departure."
  ],

  fairhaven: [
    "Treating Fairhaven like a casual stop rather than a governed space.",
    "Your presence has been noted."
  ],

  harvest_circle: [
    "Treating Harvest Circle like a casual stop rather than a governed space.",
    "Ignoring local expectation to declare loads honestly; respect family-controlled stalls and convoy order."
  ],

  mimolot_academy: [
    "Treating Mimolot Academy like a casual stop rather than a governed space.",
    "Ignoring local expectation to scholarly decorum."
  ],

  shirshal: [
    "Treating Shirshal like a casual stop rather than a governed space.",
    "Ignoring local expectation to cooperate with inquiries."
  ],

  sunspire_haven: [
    "Treating Sunspire Haven like a casual stop rather than a governed space.",
    "Ignoring local expectation to contribute and trade fairly; show respect to the family or syndicate controlling the yard you stand in."
  ],

  aurora_crown_commune: [
    "Treating Aurora Crown Commune like a casual stop rather than a governed space.",
    "Ignoring local expectation to respect dome protocols; report cracks, contamination, and supply irregularities immediately."
  ],

  // Districts: combined pool from all four sub-district packets
  districts: [
    "Treating the Districts like a casual stop rather than a governed space.",
    "Ignoring local expectation to measured conduct; fine attire.",
    "Ignoring local expectation to mind your business, pay your tab, and do not mistake poverty for disorder.",
    "Ignoring local expectation to leave procession routes clear; treat banners and masks as dynastic civic property.",
    "Ignoring local expectation to value work, collaboration, and practical courtesy."
  ],

  // Sub-district keys for direct lookups
  aurora_heights_district: [
    "Treating Aurora Heights District like a casual stop rather than a governed space.",
    "Ignoring local expectation to measured conduct; fine attire."
  ],

  ironspool_ward_district: [
    "Treating Ironspool Ward District like a casual stop rather than a governed space.",
    "Ignoring local expectation to mind your business, pay your tab, and do not mistake poverty for disorder."
  ],

  maskscar_plaza_district: [
    "Treating Maskscar Plaza District like a casual stop rather than a governed space.",
    "Ignoring local expectation to leave procession routes clear; treat banners and masks as dynastic civic property."
  ],

  verdant_row_district: [
    "Treating Verdant Row District like a casual stop rather than a governed space.",
    "Ignoring local expectation to value work, collaboration, and practical courtesy."
  ]

};

function drawSocialMisstep(localityId) {
  var pool = SOCIAL_MISSTEP_POOL[localityId];
  if (!pool || pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

window.SOCIAL_MISSTEP_POOL = SOCIAL_MISSTEP_POOL;
window.drawSocialMisstep = drawSocialMisstep;
