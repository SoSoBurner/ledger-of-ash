// LOCALITY VOICE GUIDE
// Source: V33_2 canon — quickstart cards, settlement records, polity files, magic law docs
// Purpose: Narration anchors for locality-level voice consistency in Ledger of Ash
// Active entries: 5 | Stub entries: 13

window.LOCALITY_VOICE_GUIDE = {

  // ── ACTIVE ENTRIES ──────────────────────────────────────────────────────────

  shelkopolis: {
    // Principality of Shelk. Aristocratic civic seat. Harbor, tanneries south,
    // wax-sealed records, Iron Accord registry, House Shelk estate presence.
    sensoryAnchor: 'Coal smoke and old stone, fish salt from the harbor ward, the sharp chemical bite of the tanneries carried downwind on every afternoon wind — it arrives before the walls do.',
    register: 'formal',
    vocabulary: [
      'the Iron Accord',       // central trade and law registry
      'Roadwarden clearance',  // travel authorization issued by the Roadwardens Order
      'house colors'           // visible indicator of noble affiliation; wearing them unsanctioned is noticed
    ],
    magicLaw: 'Magic is permitted under Magi Magistratus certification; uncertified casting in commercial or civic spaces draws Roadwarden attention and may require an Iron Accord inquiry.',
    hierarchyTell: 'House affiliation is worn, not stated — colors, plume style, and the quality of wax on a letter seal communicate rank before a name is offered; lesser parties defer by stepping aside on narrow streets.',
    seasonalNote: 'During the axial high season, estate households hold formal threshold banquets — invitations circulate by sealed courier and exclusion from the guest list is itself a public signal.'
  },

  sheresh_coastal_commune: {
    // Sheresh Communes. Dome-protected northern coastal settlement.
    // Contamination management society. Aurora and celestial research culture.
    // Survival-and-research civic order. Salt air trapped inside dome architecture.
    sensoryAnchor: 'Salt air that never fully moves — trapped by the dome overhead, it sits in the lungs like a kept secret, threaded with the faint mineral smell of the containment wards along the seawall.',
    register: 'bureaucratic',
    vocabulary: [
      'the Concord',             // Sheresh Containment Research Concord — the civic-research authority
      'dome-watch rotation',     // mandatory communal shift monitoring dome integrity
      'contamination strain'     // formal term for environmental hazard load; used in official speech and casual complaint equally
    ],
    magicLaw: 'Magic is embedded in civic infrastructure — dome maintenance, containment seals, and research chambers all require daily magical upkeep; unauthorized casting near containment systems is treated as a public safety violation, not merely a legal one.',
    hierarchyTell: 'Research authority outranks civic management in practice: a Research Concord badge worn at the collar means you speak first, sit closer to the central table, and are addressed by function title rather than personal name.',
    seasonalNote: 'When the aurora is strong, Concord researchers log celestial observations through the dome panels at scheduled intervals — the whole commune adjusts foot traffic to keep dome-facing corridors clear during the observation window.'
  },

  soreheim_proper: {
    // Soreheim Alliance. Giant-led civilizational alliance.
    // Quota and tower-centered government from Soreheim Proper.
    // Giant Council governs law, diplomacy, quotas, foreign affairs, strategic production.
    // Communal contribution hierarchy. Meritocratic but stratified.
    sensoryAnchor: 'Cold stone and forge exhaust — the air carries iron particulate from the Titan Towers, and in the lower corridors the smell is always tinged with the particular cold of rooms built for bodies twice your size.',
    register: 'clipped',
    vocabulary: [
      'the Giant Council',        // supreme governing body; referenced in all formal business
      'quota standing',           // an individual or clan\'s current contribution status — affects access, housing, appeal rights
      'patron-family obligation'  // the system of clan-household mediation beneath the council tier
    ],
    magicLaw: 'Magic is tolerated as an industrial and logistical tool; the Giant Council does not restrict it formally, but unsanctioned magical disruption of quota infrastructure or production systems is treated as sabotage under contribution law.',
    hierarchyTell: 'Giants are addressed by role title only — no honorifics, no names in public business unless you have been specifically invited to use one; smaller races drop their eyes during Giant Council pronouncements as a matter of custom, not compulsion.',
    seasonalNote: 'At the close of the production cycle, quota tallies are posted publicly on tower boards — clans with surplus gain appeal priority for the next season; those in deficit attend mandatory arbitration before the cycle opens again.'
  },

  guildheart_hub: {
    // Guildheart Hub. Union-territory guild center. Guildmaster Selene\'s domain.
    // Proceduralism over outcomes. Guild marks on everything.
    // Precision instruments, ink, wax, and worked metal are the material texture.
    // Union Sanction Board and Trade Arbitration Guild operate here.
    sensoryAnchor: 'Ink and warm wax and the faint metallic edge of worked bronze — the smell of every transaction being recorded, every seal being pressed, every charter receiving its mark before the thing it authorizes can begin.',
    register: 'bureaucratic',
    vocabulary: [
      'guild mark',             // the stamped or embossed certification emblem required on all goods, contracts, and practitioners
      'sanction board review',  // formal Union Sanction Board process; delays are measured in weeks and cost coin
      'the Arbitration Guild'   // Union Trade Arbitration Guild; the body that settles commercial disputes and sets precedent
    ],
    magicLaw: 'Magic used in trade, fabrication, or certification must carry a guild-approved mark; a magically produced good without a mark is legally indistinguishable from contraband, regardless of intent.',
    hierarchyTell: 'Guildmaster Selene\'s name is used as a reference point, not a greeting — invoking her office signals that you intend something formal; practitioners display guild marks on satchel clasps or collar badges, and the tier of the guild determines where you sit in any shared meeting room.',
    seasonalNote: 'At the end of each trade quarter, the Sanction Board posts the chartered goods list for the next period — items dropped from the list cannot be legally traded under guild mark until reapplication, which takes at minimum one full quarter.'
  },

  panim_haven: {
    // Panim. Fishing village. Divine mediation and funerary administration culture.
    // Harbormaster bureaucracy. Panim Afterlife Registry operates here.
    // Magic treated as sacred mediation, funerary process, sanctified duty.
    sensoryAnchor: 'Drying nets and the particular rot of things the sea gives back — it sits under everything, even inside, even in the harbormaster\'s office where the paperwork smells faintly of brine.',
    register: 'warm',
    vocabulary: [
      'the Registry',         // Panim Afterlife Registry — the institution that records deaths, transitions, and sacred custodianship
      'harbormaster\'s log',  // the single administrative ledger that governs tide schedules, missing persons, and fishing permits alike
      'passage rites'         // the ceremonial and bureaucratic process for deceased; skipping steps is a serious social offense
    ],
    magicLaw: 'Magic is sacred here and tied to funerary and transitional ritual; unsanctioned casting that touches death, memory, or the deceased without Registry authorization is treated as a violation of custodial law and draws communal censure.',
    hierarchyTell: 'The harbormaster is the de facto civic authority; everyone else is positioned relative to the docks — those who own boats have standing, those who crew them have less, those who do neither are politely tolerated but not consulted.',
    seasonalNote: 'When the axial season turns, the Registry observes a week of formal passage rites for those lost at sea in the prior year — the harbor operates on reduced hours and fishing boats fly a plain white pennant; merchants who push through anyway are remembered.'
  },

  // ── STUB ENTRIES (name + sensoryAnchor only) ────────────────────────────────
  // Remaining 13 localities. Full fields to be populated in a subsequent pass.

  cosmoria: {
    sensoryAnchor: 'Tidal salt and harbor tar, the low creak of ship timber, and somewhere beneath it the faint sweetness of maritime trade goods packed too close together for too long.'
  },

  fairhaven: {
    sensoryAnchor: 'Road dust and horse-worked leather, the smell of a waystation that has fed and turned over travelers for generations without ever quite belonging to any of them.'
  },

  ironhold_quarry: {
    sensoryAnchor: 'Crushed stone and iron oxide, a dry grit that settles into the back of the throat within minutes, and the percussive echo of extraction work that never fully goes quiet.'
  },

  plumes_end_outpost: {
    sensoryAnchor: 'Cold wind off open terrain, woodsmoke from a fire burning for warmth rather than cooking, and the particular quiet of a place that exists to mark where the road runs out.'
  },

  craftspire: {
    sensoryAnchor: 'Hot metal and oil and the sour smell of industrial flux — a working smell, purposeful, the smell of a place that makes things rather than trades them.'
  },

  unity_square: {
    sensoryAnchor: 'Sun-warmed paving stone, the overlap of voices from competing stalls, and the faint bureaucratic undertone of fresh ink from the posting boards that line every approach.'
  },

  shelkopolis_harbor: {
    sensoryAnchor: 'Fish offal and rope salt and the mineral smell of wet stone steps at low tide — the harbor district smells nothing like the city above it and makes no apology.'
  },

  guildheart_archive: {
    sensoryAnchor: 'Old vellum and the dry, almost sweet smell of aged wax, cool air that holds still, and the faint lanolin scent of the leather-bound charter rolls stacked floor to ceiling.'
  },

  mimolot_academy: {
    sensoryAnchor: 'Lamp oil and chalk dust and the faint residue of regulated spell-work — a controlled smell, managed, the olfactory equivalent of a room where knowledge is treated as property.'
  },

  aurora_crown_commune: {
    sensoryAnchor: 'Dome-trapped air carrying the faint ozone charge of active magical infrastructure, cold stone beneath, and the particular stillness of a settlement that monitors its own atmosphere as a matter of survival.'
  },

  glasswake_commune: {
    sensoryAnchor: 'Still water and reed, the reflective quality of sound off a flat surface, and mud-and-thatch warmth that makes the cold outside feel like a different world.'
  },

  whitebridge_commune: {
    sensoryAnchor: 'Snowmelt and pine resin, the clean cold of elevation, and the communal food smell of a shared kitchen that feeds people who have learned not to waste heat.'
  },

  soreheim_transit_post: {
    sensoryAnchor: 'Iron cold, draft wind from the loading passage, and the compressed smell of bodies, cargo, and forge exhaust moving through a chokepoint that never fully empties.'
  }

};
