'use strict';

var LOCALITY_ANCHORS = {
  shelkopolis: 'The dome terminals line the outer ring, pressure gauges visible behind the glass facings. Transit clerks work the checkpoint booths without looking up.',
  soreheim_proper: 'Stamps on the doorframes, the axle bolts, the sleeve cloth. No price boards. Workers take what they need from the open crates.',
  panim_haven: 'Funerary markers line the approach road — stone tablets, names only, no epitaphs. The shrine intermediary moves through dock traffic with a ledger.',
  cosmoria: 'The counting-house windows face the cranes. A stevedore argues with a foreman about weight records; the foreman has a ledger, the stevedore does not.',
  fairhaven: 'The mill wheel turns and the grind continues, but the workers move through it with the silence of people who have stopped talking about something important.',
  guildheart_hub: 'Multi-story counting halls face the main avenue. Clerks argue about manifest formats under a covered walkway; nobody is finished with anything.',
  aurora_crown_commune: 'Blue-white light from the reinforced dome panels, communal message boards recording names and decisions. A warden stands at the junction with a monitoring instrument.',
  glasswake_commune: 'Instrument stations on the shore, color-coded exposure markers on every post. A warden checks readings near the northern trench without breaking stride.',
  whitebridge_commune: 'The stone is cold to the touch even in summer. Two people stand at the rail mid-bridge looking at the water; they are not talking to each other.',
  ironhold_quarry: 'The stone face has retreated into the hillside in horizontal bands. A marshal with a tally board stands at the transport junction; the count goes on a second board near the gate.',
  plumes_end_outpost: 'The Roadwarden on duty is reading something. She does not put it down when you arrive. The track east is less maintained than the track you came in on.',
  craftspire: 'Workhouses with ledger balconies face the street. A queue outside the guild registry suggests the spire\'s reputation extends further than its walls.',
  unity_square: 'Color-coded guild awnings line the perimeter, territory marked and maintained. The inscription above the gate is partially obscured by a posted notice about cart-load fees.',
  mimolot_academy: 'A registration checkpoint inside the gate — academic business only, staffed. Wards mark the archive doors with House Mimolot seals.',
  sheresh: 'The commune sits inside a reinforced seawall, older than Collegium-built. An elder reads from the commune registry to children on the steps; she notes the time when you pass.',
  districts: 'Dome spec sheets cover the worktables in the technical archive. The overhead panels diffuse Aurora Heights light into something close to daylight, but not quite.',
  harvest_circle: 'Patron-family quota boards run the length of the market wall. Field output brokers move between stalls with seasonal tally rolls under their arms.',
  sunspire_haven: 'Grain contract boards bracket the crossroads entrance. Workshop syndicate marks are painted on the doorframes — each guild has its own color, its own stroke width.',
  shirshal: 'Compliance inspectors work the entry corridor in pairs. Ward seals on the doorframes glow faintly where the magical-law inspections were most recent.',
  ithtananalor: 'The identity inspection station is the first structure inside the gate. Legal transit papers are checked against a secondary ledger before the inner checkpoint opens.',
  guildheart_archive: 'The reading room smells of paper and preservation wax. The shelves go further back than the building\'s exterior suggests they should.',
  shelkopolis_harbor: 'Crane-arms over the water, warehouses the size of civic buildings. A Collegium inspector makes notes near berth seven; two dockhands watch him without speaking.',
  soreheim_transit_post: 'Manifest clerks work in parallel at long counters. The compliance office has no queue — which means it does either very little or very much.'
};

var STATE_SUFFIXES = {
  s1: {
    heat_critical: [
      'A Roadwarden near the far entrance has noted your direction twice.',
      'The checkpoint clerk copies your transit mark into a second ledger without explanation.',
      'Someone near the registry door has been watching the same corner since you arrived.',
      'The inspection queue opens for others and closes again before your turn.'
    ],
    pressure_high: [
      'The usual passage points are staffed with people who are not the usual staff.',
      'A notice has gone up near the gate; two locals read it and walk a different direction.',
      'The clerk at the counter takes slightly longer than the work requires.',
      'Something in the foot traffic has changed — a gap where there should not be one.'
    ],
    rival_active: [
      'The factor who arrived before you has already spoken to the registry clerk.',
      'A runner leaves the counting house ahead of you, moving faster than the errand suggests.',
      'The manifest you needed has been pulled for separate review.',
      'Someone else\'s name appears in the intake log where yours should be first.'
    ],
    complication: [
      'The access you expected is closed with no explanation posted.',
      'A minor discrepancy in your papers has flagged a secondary review.',
      'The contact point you came for has moved to a different office today.',
      'The route through the interior has been redirected without notice.'
    ],
    success: [
      'The clerk returns your papers without additional questions.',
      'The passage opens on the first request; the warden does not look twice.',
      'A door that was closed last time stands open without ceremony.',
      'The intake record shows your entry without the additional notation you expected.'
    ],
    neutral: [
      'The usual traffic moves through at its usual pace.',
      'The midday shift change happens without affecting the flow.',
      'Workers pass without registering the arrival.',
      'The administrative rhythm continues around you undisturbed.'
    ]
  },
  s2: {
    heat_critical: [
      'A warrant notice on the board carries a physical description close enough to matter.',
      'The inspector at the secondary checkpoint already has your name on a list.',
      'The corridor ahead has more eyes in it than any checkpoint requires.',
      'The compliance office door is open and someone inside is watching the entrance.'
    ],
    pressure_high: [
      'Institutional pressure has reached the point where even routine requests require sign-off.',
      'The doors that were negotiable last stage are now controlled by someone with no discretion.',
      'Every entry point has a secondary record being kept that does not match the primary one.',
      'The weight of accumulated attention makes the familiar path feel narrow.'
    ],
    rival_active: [
      'The rival\'s structural advantage shows in the deference clerks give without being asked.',
      'Your access tier is one step below what it was; someone filed the reclassification.',
      'The name that keeps appearing in the wrong places has acquired institutional backing.',
      'The registry shows a prior claim on the resource you came here to access.'
    ],
    complication: [
      'The setback resets the timeline by more than one step — recalculation required.',
      'A new obstacle has appeared where the path was clear a stage ago.',
      'The workaround that worked before has been closed as a documented exception.',
      'The complication is institutional now, not procedural — harder to route around.'
    ],
    success: [
      'The thread holds; the confirmation is in the secondary record, not just the first.',
      'Advancement here opens an access tier that was not available before.',
      'The clerk\'s notation is different this time — a small mark that means the record is clean.',
      'The door that required justification now opens on your standing alone.'
    ],
    neutral: [
      'The stage two machinery operates at its usual steady rate; nothing flags your presence.',
      'Institutional attention is elsewhere today; the path through is unremarkable.',
      'The administrative weight is present but not directed at you specifically.',
      'The counters are staffed, the records are current, and the process runs without incident.'
    ]
  }
};

var LIVING_VARIANTS = {
  shelkopolis: [
    'Indigo and emerald banners at the gatehouse, Roadwardens posted at the approach. The city does not register your arrival.',
    'The Iron Accord registry crier reads notices aloud; a woman in House Mimolot colors argues with a cart driver about permits nearby.',
    'Coal smoke and old stone, fish salt from the harbor district, sharp chemical from the tanneries. The streets are narrow and purposeful.'
  ],
  soreheim_proper: [
    'The Titan Towers rise from volcanic hillside above the industrial district, their upper levels lost in heat haze. The air smells of sulfur and wet ash.',
    'The quota offices line the most prominent street, facades marked with production tallies. The ration-distribution queue has been there since morning.',
    'A Giant administrator moves through the market without altering pace for the people in her path. They move without being asked.'
  ],
  craftspire: [
    'The spire rises beyond any structural logic from a settlement this size. The smell is hot metal and flux.',
    'Materials yards stacked with raw stock labeled by grade. The copy tower near the guild registry entrance processes orders without pause.',
    'Cart-choked service lanes run between the workhouses. The ledger balconies above are occupied at all hours.'
  ],
  cosmoria: [
    'The working docks below, slick with brine and cargo chains. The ledger-keepers and factors watch the cranes from counting-house windows above.',
    'The great library doors are open but its reading rooms require a valid trader\'s certificate. The smell is salt and grain and something slightly off.',
    'The foreman wins the weight dispute; he always has a ledger and the stevedore never does. The crane continues.'
  ],
  guildheart_hub: [
    'Multi-story counting halls face the main avenue. Bonded warehouse blocks line the canal-side loading lanes.',
    'Two competing guilds share a building whose partition wall is load-bearing. The seam in the plaster still shows.',
    'Registry towers mark the four corners of the administrative district. Carts move through in both directions; no one is finished with anything.'
  ],
  glasswake_commune: [
    'The reinforced dome is the first thing visible from the approach, surrounded by sensor pylons and flagged exposure trenches.',
    'Instrument stations on the shore, color-coded exposure markers on every post. The replace-marks are on the dock planks, the pylons, the flaglines.',
    'The water carries light strangely, surface breaking reflections into shapes that are not there. A fisherman mends a net at the approved shoreline.'
  ],
  aurora_crown_commune: [
    'Blue-white light from the reinforced panels, layered ice walls visible through the outer access corridor, guarded thermal inlets along the floor.',
    'The communal message boards hold names, decisions, the accumulated living memory of shared administration. Two elders revise something at a table near the registry hall.',
    'A warden stands at the dome junction with a monitoring instrument. The sounds are domestic: cooking, someone hammering, a discussion in the next building.'
  ],
  districts: [
    'Dome spec sheets cover the worktables in the technical archive annex. The filing system is indexed by spec number, not by date.',
    'The overhead panels diffuse Aurora Heights light into something functional. The archive corridor runs longer than the exterior of the building suggests.',
    'Clerks work the specification counters in silence. The request queue is paper-based; the retrieval system is not.'
  ],
  plumes_end_outpost: [
    'A tavern, an armory, a supply waystation, and a shrine — all four arranged around a well inside a low stockade wall.',
    'The fire-signal platform above the stockade has not been used in years. The flag rope is coiled and tied.',
    'The Roadwarden on duty does not put her reading down when you arrive. The track east is less maintained than the one you came in on.'
  ],
  mimolot_academy: [
    'The academy sits on a terraced hillside, its buildings arranged to overlook everything. Wards mark the archive doors with House Mimolot seals.',
    'The outer wall has a registration checkpoint inside the gate — academic business only, a warden keeping a separate log.',
    'Students move through the paths without looking up. A monitoring station near the upper archive runs instruments that do not display what they are recording.'
  ],
  fairhaven: [
    'The mill town is quieter than a working mill town should be. The wheel turns, the grind continues, but the workers have stopped talking about something important.',
    'The main square has a well, a notice board, and three benches where nobody is sitting. The afternoon cart run has not come.',
    'Dust on the boots of travelers who came up from the cave approach below Watcher\'s Perch — a different kind of arrival than the plain road brings.'
  ],
  guildheart_archive: [
    'The archive annex attaches to the hub\'s administrative building by a covered walkway that is always in shadow.',
    'The reading room smells of paper and preservation wax. A single archivist manages intake and reference from a desk surrounded by indexed containers.',
    'The shelves go further back than the building\'s exterior suggests they should. The intake log is current to this morning.'
  ]
};

window.LOCALITY_ANCHORS = LOCALITY_ANCHORS;
window.STATE_SUFFIXES = STATE_SUFFIXES;
window.LIVING_VARIANTS = LIVING_VARIANTS;
