// travel_corridors.js — Road encounter layer for Ledger of Ash
// Loaded via <script src="content/travel_corridors.js"></script> before </body>

(function() {
  'use strict';

  // ---------------------------------------------------------------------------
  // MACROREGION LOCALITY MAP
  // Used to determine which macroregion narration to show based on from/to IDs
  // ---------------------------------------------------------------------------
  var LOCALITY_MACROREGION = {
    shelkopolis:    'principalities',
    fairhaven:      'principalities',
    shirshal:       'principalities',
    panim_haven:    'principalities',
    mimolot:        'principalities',
    guildheart_hub: 'principalities',
    cosmouth:       'principalities',
    ithtananalor:   'principalities',
    sunspire_haven: 'soreheim',
    soreheim_proper:'soreheim',
    quarry_flats:   'soreheim',
    aurora_crown:   'sheresh',
    sheresh:        'sheresh',
    psanan:         'psanan',
    forge_coast:    'psanan'
  };

  // ---------------------------------------------------------------------------
  // MACROREGION_NARRATIONS
  // One narration per macroregion. Show as ambient route flavor before encounter.
  // ---------------------------------------------------------------------------
  window.MACROREGION_NARRATIONS = {
    principalities: [
      'The road is wide enough for two carts side by side, cobbled in the old House Shelk pattern — square-cut stone laid flat, edges mortared. Roadwarden posts appear at every league marker: a green-and-grey painted post, a sealed dispatch box at its base, and a warden\'s name chalked on the board above. Someone has erased the last name and not replaced it.',
      'The Principalities road runs straight between hedgerows trimmed to guild standard height. A checkpoint barrier — striped in House Shelk grey — sits across the road ahead. The warden\'s post is occupied; a pair of boots protrude from under the barrier arm, the warden lying on his back, staring up at something in the sky above the road.',
      'Mile-markers on this stretch are double-stamped: the Roadwardens seal first, then a second impression in red — the Guild Council transit authorization mark. Both marks are required for commercial transit. The road itself is in good repair, drainage channels clear, the verge cut back. Someone maintains this route whether travelers use it or not.'
    ],
    soreheim: [
      'The road surface changes where Soreheim territory begins: packed aggregate over compacted earth, designed for the weight of loaded cargo haulers. Quota signs appear on both sides — white boards with black numerals, updated in grease pencil. The current extraction figure has been circled twice. The previous figure has been scratched through.',
      'Giant-scale construction flanks the road on the eastern approach: timber staging platforms at twice the height of any Principalities building, crossbeam cranes left overnight with loads still attached. A Quota Authority notice board at the road edge carries three active advisories. Two are standard transit-zone warnings. The third is a handwritten addendum: INCIDENT REPORTING REQUIRED — ALL PARTIES.',
      'The road cuts through a worked hillside, the face blasted clean in horizontal layers that show the rock strata. Dust has settled across the road surface in a continuous grey film — not from today\'s work, from weeks of it. A water trough at the roadside is full. The engineer\'s marker beside it reads: REFILL DAILY — QUOTA OBLIGATION 14.'
    ],
    sheresh: [
      'The cold arrives before the dome is visible. The road surface shifts from mud to frozen rut to hard-packed ice in the space of a few hundred meters, and then the dome-light appears on the horizon — a pale blue luminescence sitting above the treeline like a second, smaller sun that does not move. The path marker ahead has been driven deep into frozen ground. Someone has wrapped the post with insulating cord.',
      'Ice-locked paths branch away from the main road at intervals, each one sealed with a Sheresh Dome Stewards notice: ROUTE SUSPENDED — AXIS CONDITIONS. The main road is passable but narrow where the ice has crept from the verge. Dome-light is close enough now to cast faint shadows behind the road markers. Everything ahead is very quiet.',
      'The dome is visible to the northeast, its glow steady and cold against a grey sky. The road here passes through a waystation that has been locked from the outside — padlock on the hasp, shutters barred. A chalk message on the door reads: STEWARDS NOTIFIED — DO NOT FORCE. The water barrel beside the station is frozen solid.'
    ],
    psanan: [
      'The volcanic haze thickens as the road descends toward the coast. Ash sits in the road\'s drainage channels like grey sand, light enough to lift with a breath. The forgeheat comes from below rather than above — the rock underfoot holds warmth long after dark. Directional markers on this stretch are cast iron rather than painted wood: the painted ones didn\'t last.',
      'The road surface is lava-composite: laid in dark irregular slabs that retain the forge heat through the night. Ash has settled into the gaps and been tamped there deliberately as caulking. The smell is sulfur and hot stone and, underneath both, something organic — the dark soil where farming happens in the ash belt between eruption zones.',
      'A Guild transit post marks the boundary of the active ash zone: a squat iron-roofed structure with ventilation slots rather than windows. The notice board outside carries advisories in three languages. The Psanan-script entry at the top is longest. The translation below it, in Common, reads simply: CONDITIONS CHANGED — CONFIRM ROUTE BEFORE PROCEEDING.'
    ]
  };

  // ---------------------------------------------------------------------------
  // TRAVEL_ROUTES
  // Keyed by 'origin_id|dest_id' (bidirectional — both directions listed).
  // tier: 'short'(<3d foot)|'medium'(3-30d)|'long'(>30d)
  // biome: drives encounter pool weighting
  // times in days; boat:0 = mode unavailable on this route
  // ---------------------------------------------------------------------------
  var TRAVEL_ROUTES = {
    'shelkopolis|fairhaven':               { tier:'long', biome:'plains',    foot:52.2, horse:31.3, cart:69.6, boat:0 },
    'fairhaven|shelkopolis':               { tier:'long', biome:'plains',    foot:52.2, horse:31.3, cart:69.6, boat:0 },
    'shelkopolis|aurora_crown_commune':    { tier:'long', biome:'highland',  foot:61.5, horse:36.9, cart:81.9, boat:0 },
    'aurora_crown_commune|shelkopolis':    { tier:'long', biome:'highland',  foot:61.5, horse:36.9, cart:81.9, boat:0 },
    'shelkopolis|glasswake_commune':       { tier:'long', biome:'highland',  foot:63.2, horse:37.9, cart:84.3, boat:0 },
    'glasswake_commune|shelkopolis':       { tier:'long', biome:'highland',  foot:63.2, horse:37.9, cart:84.3, boat:0 },
    'shelkopolis|cosmoria':                { tier:'long', biome:'coastal',   foot:99.0, horse:59.4, cart:131.9, boat:19.8 },
    'cosmoria|shelkopolis':                { tier:'long', biome:'coastal',   foot:99.0, horse:59.4, cart:131.9, boat:19.8 },
    'guildheart_hub|fairhaven':            { tier:'long', biome:'plains',    foot:60.6, horse:36.4, cart:80.8, boat:0 },
    'fairhaven|guildheart_hub':            { tier:'long', biome:'plains',    foot:60.6, horse:36.4, cart:80.8, boat:0 },
    'guildheart_hub|ithtananalor':         { tier:'long', biome:'forest',    foot:73.2, horse:43.9, cart:97.6, boat:0 },
    'ithtananalor|guildheart_hub':         { tier:'long', biome:'forest',    foot:73.2, horse:43.9, cart:97.6, boat:0 },
    'guildheart_hub|soreheim_proper':      { tier:'long', biome:'mountain',  foot:72.1, horse:43.3, cart:96.1, boat:0 },
    'soreheim_proper|guildheart_hub':      { tier:'long', biome:'mountain',  foot:72.1, horse:43.3, cart:96.1, boat:0 },
    'guildheart_hub|mimolot_academy':      { tier:'long', biome:'plains',    foot:68.5, horse:41.1, cart:91.3, boat:0 },
    'mimolot_academy|guildheart_hub':      { tier:'long', biome:'plains',    foot:68.5, horse:41.1, cart:91.3, boat:0 },
    'soreheim_proper|sunspire_haven':      { tier:'long', biome:'highland',  foot:55.0, horse:33.0, cart:73.3, boat:0 },
    'sunspire_haven|soreheim_proper':      { tier:'long', biome:'highland',  foot:55.0, horse:33.0, cart:73.3, boat:0 },
    'panim_haven|shirshal':                { tier:'long', biome:'coastal',   foot:46.3, horse:27.8, cart:61.7, boat:0 },
    'shirshal|panim_haven':                { tier:'long', biome:'coastal',   foot:46.3, horse:27.8, cart:61.7, boat:0 },
    'shirshal|ithtananalor':               { tier:'long', biome:'forest',    foot:58.9, horse:35.3, cart:78.5, boat:0 },
    'ithtananalor|shirshal':               { tier:'long', biome:'forest',    foot:58.9, horse:35.3, cart:78.5, boat:0 },
    'mimolot_academy|ithtananalor':        { tier:'long', biome:'forest',    foot:63.8, horse:38.3, cart:85.1, boat:0 },
    'ithtananalor|mimolot_academy':        { tier:'long', biome:'forest',    foot:63.8, horse:38.3, cart:85.1, boat:0 },
    // Boat-only routes — Amber Tides River, harbor ring, freight passage
    'amber_fountain_inn|fairhaven':        { tier:'medium', biome:'coastal', foot:18.0, horse:10.8, cart:24.0, boat:6.0 },
    'fairhaven|amber_fountain_inn':        { tier:'medium', biome:'coastal', foot:18.0, horse:10.8, cart:24.0, boat:6.0 },
    'ashforge_citadel|ashwake_port':       { tier:'short',  biome:'coastal', foot:4.0,  horse:2.4,  cart:5.3,  boat:1.3 },
    'ashwake_port|ashforge_citadel':       { tier:'short',  biome:'coastal', foot:4.0,  horse:2.4,  cart:5.3,  boat:1.3 },
    'cosmoria|brineland':                  { tier:'medium', biome:'sea',     foot:0,    horse:0,    cart:0,    boat:8.0 },
    'brineland|cosmoria':                  { tier:'medium', biome:'sea',     foot:0,    horse:0,    cart:0,    boat:8.0 },
    'cosmoria|panim_haven':                { tier:'medium', biome:'coastal', foot:0,    horse:0,    cart:0,    boat:8.0 },
    'panim_haven|cosmoria':                { tier:'medium', biome:'coastal', foot:0,    horse:0,    cart:0,    boat:8.0 },
    'soreheim_proper|eternal_lands':       { tier:'long',   biome:'sea',     foot:0,    horse:0,    cart:0,    boat:21.0 },
    'eternal_lands|soreheim_proper':       { tier:'long',   biome:'sea',     foot:0,    horse:0,    cart:0,    boat:21.0 },
    // Direct Fairhaven spoke routes (from world graph — previously missing)
    'ithtananalor|fairhaven':          { tier:'long', biome:'forest',   foot:46.8,  horse:28.1,  cart:62.4,  boat:0 },
    'fairhaven|ithtananalor':          { tier:'long', biome:'forest',   foot:46.8,  horse:28.1,  cart:62.4,  boat:0 },
    'mimolot_academy|fairhaven':       { tier:'long', biome:'plains',   foot:62.3,  horse:37.4,  cart:83.1,  boat:0 },
    'fairhaven|mimolot_academy':       { tier:'long', biome:'plains',   foot:62.3,  horse:37.4,  cart:83.1,  boat:0 },
    'panim_haven|fairhaven':           { tier:'long', biome:'coastal',  foot:91.7,  horse:55.0,  cart:122.3, boat:0 },
    'fairhaven|panim_haven':           { tier:'long', biome:'coastal',  foot:91.7,  horse:55.0,  cart:122.3, boat:0 },
    'shirshal|fairhaven':              { tier:'long', biome:'coastal',  foot:51.2,  horse:30.7,  cart:68.3,  boat:0 },
    'fairhaven|shirshal':              { tier:'long', biome:'coastal',  foot:51.2,  horse:30.7,  cart:68.3,  boat:0 },
    'soreheim_proper|fairhaven':       { tier:'long', biome:'mountain', foot:285.2, horse:171.1, cart:380.3, boat:0 },
    'fairhaven|soreheim_proper':       { tier:'long', biome:'mountain', foot:285.2, horse:171.1, cart:380.3, boat:0 },
    'sunspire_haven|fairhaven':        { tier:'long', biome:'highland', foot:244.5, horse:146.7, cart:326.1, boat:0 },
    'fairhaven|sunspire_haven':        { tier:'long', biome:'highland', foot:244.5, horse:146.7, cart:326.1, boat:0 },
    'aurora_crown_commune|fairhaven':  { tier:'long', biome:'highland', foot:108.2, horse:64.9,  cart:144.3, boat:0 },
    'fairhaven|aurora_crown_commune':  { tier:'long', biome:'highland', foot:108.2, horse:64.9,  cart:144.3, boat:0 }
  };

  // Encounter rate extras by biome (added rolls on top of base tier count)
  var BIOME_ENCOUNTER_WEIGHTS = {
    plains:      { short_extra: 0,   medium_extra: 0,   long_extra: 0    },
    principalities: { short_extra: 0, medium_extra: 0,  long_extra: 0    },
    soreheim:    { short_extra: 0,   medium_extra: 0.5, long_extra: 1    },
    mountain:    { short_extra: 0,   medium_extra: 0.5, long_extra: 1    },
    sheresh:     { short_extra: 0.5, medium_extra: 1,   long_extra: 1.5  },
    psanan:      { short_extra: 0,   medium_extra: 0.5, long_extra: 1    },
    coastal:     { short_extra: 0,   medium_extra: 0,   long_extra: 0.5  },
    sea:         { short_extra: 0,   medium_extra: 0.5, long_extra: 1.5  },
    highland:    { short_extra: 0.5, medium_extra: 1,   long_extra: 1.5  },
    forest:      { short_extra: 0,   medium_extra: 0.5, long_extra: 0.75 }
  };

  // Pace modifiers applied to journey tick cost and encounter rate
  var PACE_MODIFIERS = {
    fast:   { tickMultiplier: 0.75, encounterRateBonus: 1.25, fatiguePerDay: 2 },
    normal: { tickMultiplier: 1.0,  encounterRateBonus: 1.0,  fatiguePerDay: 1 },
    slow:   { tickMultiplier: 1.5,  encounterRateBonus: 0.75, fatiguePerDay: 0 }
  };

  // ---------------------------------------------------------------------------
  // CORRIDOR_ENCOUNTERS
  // Keyed by route tier: short / medium / long
  // Each tier has 3–4 authored scenes.
  // ---------------------------------------------------------------------------
  window.CORRIDOR_ENCOUNTERS = {

    short: [
      {
        id: 'ce_short_warden_check',
        title: 'Roadwarden Checkpoint',
        text: 'A Roadwarden steps from the post shelter as you approach, one hand raised. She is young for the posting — her grey cloak still has its original hem rather than the field-patched look of a long-route warden. She checks the transit board mounted on the barrier arm without looking at you, running a finger down columns of names. Her finger stops. She looks up.',
        choices: [
          { text: 'My papers are in order. She already knows that.', skill: 'wits', tag: 'safe', align: 'neutral', cid: 'corridor_warden_papers',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10, isCrit: false, isFumble: false };
              var dc = 7;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'She runs the stamp across the transit form without comment. The barrier arm lifts. Her finger has already moved to the next column before you reach the road beyond the post.');
                if (typeof gainXp === 'function') gainXp(10);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The stamp does not come down. She holds the form at arm\'s length, tilting it toward the light. The discrepancy she\'s found is small enough that she doesn\'t name it — she just watches you.');
                if (typeof addHeat === 'function') addHeat('shelk', 1);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'Something about her pause does not fit a standard check.', skill: 'charm', tag: 'risky', align: 'neutral', cid: 'corridor_warden_probe',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'You ask about the route advisory two posts back — a neutral question, something the board had wrong. She answers it. The stamp comes down while she\'s still correcting the record. She waves you through without looking up again.');
                if (typeof gainXp === 'function') gainXp(20);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The question lands on the wrong note. She sets the form down and asks a follow-up — specific, procedural, and not something you can answer without either lying or pausing long enough that she notices the pause.');
                if (typeof addHeat === 'function') addHeat('shelk', 2);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'Step aside from the road before she finishes reading.', skill: 'finesse', tag: 'risky', align: 'neutral', cid: 'corridor_warden_evade',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'You take the road verge before she finishes the column. She calls something to the next traveler in line — not to you. Her attention has already shifted. You rejoin the road fifty meters on.');
                if (typeof gainXp === 'function') gainXp(15);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The movement is too deliberate. She steps away from the barrier arm, one hand on the post, and watches you take the verge. She hasn\'t called out yet, but her weight has shifted toward the road.');
                if (typeof addHeat === 'function') addHeat('shelk', 3);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          }
        ]
      },
      {
        id: 'ce_short_fellow_traveler',
        title: 'Fellow Traveler',
        text: 'A man moving in the same direction as you has fallen into step a few paces back — not close enough to be obvious about it, not far enough to be coincidental. He carries a Guild-stamped cargo satchel and a walking staff with a notched handle. When you slow, he slows. When the road bends, he takes the inside line the same way you do. He has not spoken.',
        choices: [
          { text: 'He is moving cargo. Let him move it.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'corridor_traveler_ignore',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10, isCrit: false, isFumble: false };
              var dc = 7;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'You set your own pace and hold it. He moves at the satchel weight\'s pace, which is slower than yours. The gap grows. By the next mile-marker he is a dark shape behind you, not a shadow at your heels.');
                if (typeof gainXp === 'function') gainXp(8);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'He closes to conversation range — not urgently, but steadily. He asks which house you\'re carrying for. The Guild satchel on his shoulder is now a prop in something that is not a conversation about cargo.');
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'Turn and give him room to pass or explain.', skill: 'charm', tag: 'safe', align: 'neutral', cid: 'corridor_traveler_confront',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10, isCrit: false, isFumble: false };
              var dc = 7;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'He steps aside without hesitation. He was tracking the road, not you — same route, different schedule, same destination. The satchel is a hauler\'s satchel. The notched staff is for dogs, not people. You had the same route.');
                if (typeof gainXp === 'function') gainXp(10);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'He doesn\'t step aside. His feet plant and he asks where you\'re going. The notched staff is in his hands now, not at his side. The Guild satchel has become the subject of a question he hasn\'t asked yet.');
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          }
        ]
      },
      {
        id: 'ce_short_cart_stopped',
        title: 'Stopped Cart',
        text: 'A freight cart is stopped in the road, wheel off. The carter is sitting on the verge with his boots off, not working on the wheel — just sitting. The horse is tied to a post and eating grass from the verge. Three crates are stacked beside the road, each sealed with a Roadwarden inspection mark from three days ago. The carter looks up when your shadow crosses him.',
        choices: [
          { text: 'What is in those crates matters more than the wheel.', skill: 'wits', tag: 'risky', align: 'neutral', cid: 'corridor_cart_inspect',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'The seal dates are three days old. The manifest is dated two days ago. The cart left Shelkopolis before the manifest was written. You note the crate marks — not standard outfitter codes, but something narrower — and step back before the carter finishes standing up.');
                if (typeof addJournal === 'function') addJournal('Stopped cart: seal dates mismatched with manifest. Three crates, Roadwarden-marked. Crate codes non-standard.', 'evidence');
                if (typeof gainXp === 'function') gainXp(20);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'You lean toward the nearest crate to read the mark. The carter is on his feet before you get close. He steps between you and the crates without a word. The inspection ends there.');
                if (typeof addHeat === 'function') addHeat('shelk', 1);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: "The wheel's stuck. A quick hand here and we're moving.", skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'corridor_cart_help',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10, isCrit: false, isFumble: false };
              var dc = 7;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'The wheel seats on the third lift. The carter nods — he doesn\'t say much, but he gets moving. You\'re back on the road faster than the delay cost.');
                if (typeof gainXp === 'function') gainXp(8);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The wheel won\'t seat. The axle fitting is stripped — this needed a smith before it needed a hand. You spend time on something that cannot be fixed at a road verge and leave the carter sitting where you found him.');
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          }
        ]
      },
      {
        id: 'ce_short_milestone_marked',
        title: 'Marked Milestone',
        text: 'The league marker at the roadside has been tampered with — the Roadwarden seal is intact, but someone has scratched a secondary mark into the stone below it: a narrow vertical line bisected by two short horizontals. It is not a House Shelk symbol or a Guild mark. The scratch is recent; the stone dust has not dispersed. The same mark appears on the next post fifty meters up the road.',
        choices: [
          { text: 'Copy the mark into notes. Someone is using these posts.', skill: 'wits', tag: 'safe', align: 'neutral', cid: 'corridor_milestone_copy',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10, isCrit: false, isFumble: false };
              var dc = 7;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'Two vertical marks, bisected — the same hand cut both, the same tool made them. The depth is consistent. Not a casual scratch. You get the shape clean on the second try.');
                if (typeof addJournal === 'function') addJournal('Secondary mark on road milestones — narrow vertical bisected by two horizontals. Not Guild, not Shelk. Same hand, same tool, same depth on both posts.', 'intelligence');
                if (typeof gainXp === 'function') gainXp(10);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The light is wrong for the angle. You get the shape of the first mark but not the second — the shadow hides the depth and the bisection could be two marks or one. The copy is partial.');
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'Route markers belong to whoever is maintaining this road.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'corridor_milestone_pass',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10, isCrit: false, isFumble: false };
              var dc = 7;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'The marked posts fall behind you. The road ahead is clear.');
                if (typeof gainXp === 'function') gainXp(5);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'A Roadwarden maintenance crew rounds the bend ahead, working toward the marked post with tools and a fresh-paint board. They will be at the marks before you are clear of this stretch.');
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          }
        ]
      },
      {
        id: 'ce_short_road_debris',
        title: 'Debris in the Verge',
        text: 'The road-edge has been recently maintained — hedge stumps cut back, the ditch cleared. What the work exposed has not been collected: a split sack of road-paving compound, a sealed document sleeve wedged in the cut hedge above the waterline, broken transit cord scattered across the verge. The sleeve is Guild-stamped. The address is rain-blurred past reading.',
        choices: [
          {
            text: 'What the maintenance exposed is worth more than the time it takes.',
            skill: 'vigor', tag: 'risky', align: 'neutral',
            cid: 'corridor_scavenge_short_search',
            action: function() {
              var r = (typeof rollD20 === 'function') ? rollD20('vigor', (G && G.skills ? G.skills.vigor : 0)) : {roll:10,total:10,isCrit:false,isFumble:false};
              var txt;
              if (r.isFumble) {
                txt = 'The compound is waterlogged through. The sleeve is empty — contents long gone, address blurred past the seal. You lose time and come back with nothing useful.';
              } else if (r.total >= 10) {
                if (typeof addMaterial === 'function') { addMaterial('road_dust', 1); addMaterial('carved_seal', 1); }
                txt = 'The compound sack has a dry center worth salvaging. The sleeve holds a blank transit form, seal intact. You take both.' + (r.isCrit ? ' Folded beneath the sleeve: a short stack of stamped paper, still dry.' : '');
                if (r.isCrit && typeof addMaterial === 'function') addMaterial('stamped_paper', 1);
              } else {
                if (typeof addMaterial === 'function') addMaterial('road_dust', 1);
                txt = 'The sleeve is empty. Most of the compound is waterlogged, but the center of the spill is dry enough to be useful.';
              }
              if (typeof addNarration === 'function') addNarration('', txt);
              setTimeout(function() {
                if (typeof _travelNextEncounter === 'function') _travelNextEncounter();
                else if (typeof loadStageChoices === 'function') loadStageChoices(G ? G.currentLocation : '');
              }, 600);
            }
          },
          {
            text: 'Road maintenance debris is a Roadwarden accounting problem.',
            skill: 'vigor', tag: 'safe', align: 'neutral',
            cid: 'corridor_scavenge_short_pass',
            action: function() {
              setTimeout(function() {
                window.TRAVEL_CORRIDOR.nextEncounter();
              }, 200);
            }
          }
        ]
      }
    ],

    medium: [
      {
        id: 'ce_medium_quota_patrol',
        title: 'Quota Authority Patrol',
        text: 'A three-person Quota Authority patrol is working the road in the opposite direction, stopping every traveler and checking cargo manifests against a ledger one of them carries. They are not Roadwardens — their tabards are grey with a yellow number-stamp rather than the Roadwarden green-and-grey. The one with the ledger is noting something after each stop. The travelers they check do not stop to talk about it afterward.',
        choices: [
          { text: 'My cargo is personal goods. That classification has limits they may test.', skill: 'wits', tag: 'risky', align: 'neutral', cid: 'corridor_quota_declare',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'Personal goods. The ledger-holder notes it — you see her pen move — but she doesn\'t challenge the classification. The patrol passes. The notation stays in her ledger, which is not the same as being stopped.');
                if (typeof gainXp === 'function') gainXp(20);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'Personal goods. She writes something, then asks for itemized contents. The personal goods classification does not cover what she begins writing down. The ledger is filling with your cargo.');
                if (typeof addHeat === 'function') addHeat('shelk', 2);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'Step off the road and let the patrol pass before joining it.', skill: 'finesse', tag: 'risky', align: 'neutral', cid: 'corridor_quota_avoid',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'You\'re off the road before they reach you. The patrol passes on the road below. You rejoin the road fifty meters on, behind them now, moving in the same direction — no longer in their path.');
                if (typeof gainXp === 'function') gainXp(15);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The one watching the road\'s edge has been watching you specifically. He signals before you reach the verge. The patrol stops moving and two of them turn toward where you are standing.');
                if (typeof addHeat === 'function') addHeat('shelk', 2);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'Resistance is the signal they look for. I am not resisting.', skill: 'charm', tag: 'safe', align: 'neutral', cid: 'corridor_quota_through',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10, isCrit: false, isFumble: false };
              var dc = 7;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'They check. They note. They move on. The ledger closes. The cooperative approach is indistinguishable from a traveler with nothing to hide, which is exactly what cooperative approaches are designed to resemble.');
                if (typeof gainXp === 'function') gainXp(10);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The posture reads as rehearsed. She takes a step back, asks a secondary question — inventory, specific — and the routine check has become something longer. The other two patrol members stop walking.');
                if (typeof addHeat === 'function') addHeat('shelk', 1);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          }
        ]
      },
      {
        id: 'ce_medium_roadwarden_incident',
        title: 'Incident on the Road',
        text: 'Two Roadwardens are standing over a man face-down in the road, hands bound behind him with cord. A third warden is writing in a field ledger. The bound man\'s coat has been turned inside out and laid beside him — the lining has been cut open. A Roadwarden cargo bag sits open nearby, its contents spread across the road surface in a grid pattern. One warden notices you and watches without speaking.',
        choices: [
          { text: 'This is a Roadwarden proceeding. Walk around it at the verge.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'corridor_incident_bypass',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10, isCrit: false, isFumble: false };
              var dc = 7;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'The verge is wide enough. You move around without entering the proceeding\'s perimeter. The warden who noticed you has gone back to watching the bound man. The road resumes on the other side.');
                if (typeof gainXp === 'function') gainXp(8);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The warden who noticed you steps to the verge edge before you reach the widest point. He asks you to stop. He has questions — and the field ledger is still open in the writing warden\'s hands.');
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'A lining cut open means they were looking for something specific.', skill: 'wits', tag: 'risky', align: 'neutral', cid: 'corridor_incident_read',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'Lining-cut means a specific object — document-shaped, from the packing pattern in the spread contents. The coat\'s inner seam was cut by someone who knew where to look. The name stitched into the outer collar is readable from here.');
                if (typeof addJournal === 'function') addJournal('Roadwarden lining-search on road. Object sought: document-shaped. Name on coat collar legible — see entry.', 'intelligence');
                if (typeof gainXp === 'function') gainXp(25);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'You slow enough to read the lining. The writing warden looks up from the ledger. Your attention on the cut coat is visible from where he is standing. He marks something and looks at you again.');
                if (typeof addHeat === 'function') addHeat('shelk', 1);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          }
        ]
      },
      {
        id: 'ce_medium_night_camp',
        title: 'Campfire Off-Road',
        text: 'Thirty meters off the road through a gap in the hedgerow, a fire is burning in a stone ring. Two figures sit with their backs to the road. A third is standing at the road edge watching traffic pass — watching you pass. He has no pack visible. His hands are at his sides. The fire ring looks permanent: built with laid stone, not gathered.',
        choices: [
          { text: 'A permanent fire ring off a major route means regular use.', skill: 'wits', tag: 'risky', align: 'neutral', cid: 'corridor_camp_approach',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'The fire ring is permanent, maintained, used weekly. The flat stones around it have been resettled more than once. The standing figure\'s posture shifts when you stop — shoulders down, not hands-up. He is noting you, not moving toward you.');
                if (typeof addJournal === 'function') addJournal('Permanent fire ring off main road. Watcher at road edge. Regular maintenance pattern — weekly use minimum.', 'intelligence');
                if (typeof gainXp === 'function') gainXp(20);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'You step off the road toward the gap in the hedgerow. The standing figure takes a step toward the road before you decide anything. His hands stay at his sides.');
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'Their watcher is noting faces. Give him nothing to work with.', skill: 'finesse', tag: 'risky', align: 'neutral', cid: 'corridor_camp_evade',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'Face angled toward the road surface, pace unchanged. The watcher\'s gaze moves past you. He turns back toward the fire before you reach the next bend. You gave him a coat and a direction, not a face.');
                if (typeof gainXp === 'function') gainXp(15);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The pace change is the tell — a traveler keeping their face down is a traveler keeping their face down. The watcher takes a step onto the road shoulder. You keep moving. He keeps pace for thirty meters before stopping.');
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'Keep the road. Campfires are not my business tonight.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'corridor_camp_ignore',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10, isCrit: false, isFumble: false };
              var dc = 7;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'The fire is their business. The road is yours. The watcher watches. You pass.');
                if (typeof gainXp === 'function') gainXp(8);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The standing figure calls something after you. It is not a question and not a greeting. You do not stop. The words don\'t carry far enough to be clear, but the tone does.');
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          }
        ]
      },
      {
        id: 'ce_medium_guild_seal_broken',
        title: 'Broken Guild Seal',
        text: 'A cargo crate sits at the roadside with a broken Guild transit seal — the wax intact but the cord cut cleanly through. Whatever was inside has been removed: the packing material remains, shaped to a rectangular object roughly the size of a document case. The crate carries a manifest tag from a Shelkopolis outfitter, departure dated four days ago. There is no carter, no cart, no other cargo.',
        choices: [
          { text: 'The packing shape and the seal type belong together in my notes.', skill: 'wits', tag: 'safe', align: 'neutral', cid: 'corridor_seal_examine',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10, isCrit: false, isFumble: false };
              var dc = 7;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'Cord cut, not pulled — deliberate, not hurried. The packing shape held a document case. The manifest tag gives the Shelkopolis outfitter and a departure date four days back. No carter, no cart, no second removal. Whatever was in it left on foot.');
                if (typeof addJournal === 'function') addJournal('Roadside abandoned crate: Guild seal cord-cut, document-case shaped removal. Shelkopolis outfitter, four days old. No cart or carter present.', 'intelligence');
                if (typeof gainXp === 'function') gainXp(12);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'You get the seal date and origin mark. The packing material has shifted since — the document shape is readable but not precise. The outfitter is clear. The object shape is a guess.');
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'Sitting near stolen Guild cargo on an open road is a problem I do not need.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'corridor_seal_leave',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10, isCrit: false, isFumble: false };
              var dc = 7;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'Both directions of road are clear. You pass the crate without stopping and continue.');
                if (typeof gainXp === 'function') gainXp(5);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'A Roadwarden approaches from the opposite direction at pace. She has seen you near the crate and she is not slowing down.');
                if (typeof addHeat === 'function') addHeat('shelk', 1);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          }
        ]
      },
      {
        id: 'ce_medium_field_cache',
        title: 'Old Trackway Exposed',
        text: 'A section of roadside hedgerow has collapsed inward, pulling down a length of old drystone walling behind it. The wall collapse has opened a narrow field trackway — disused, by the growth over it. Against the exposed base of the wall: a rotted satchel split along its seams, dried fiber matting spilling out, and a stoneware jar sealed with wax. The jar has no mark. The fiber is old but intact.',
        choices: [
          {
            text: 'Old trackways and sealed jars do not sit together by accident.',
            skill: 'vigor', tag: 'risky', align: 'neutral',
            cid: 'corridor_scavenge_medium_search',
            action: function() {
              var r = (typeof rollD20 === 'function') ? rollD20('vigor', (G && G.skills ? G.skills.vigor : 0)) : {roll:10,total:10,isCrit:false,isFumble:false};
              var txt;
              if (r.isFumble) {
                txt = 'The jar is empty — cleaned out deliberately, not abandoned. The fiber has rotted through wherever it matters. You spend time on something that was already picked over.';
              } else if (r.total >= 10) {
                if (typeof addMaterial === 'function') { addMaterial('frontier_fiber', 1); addMaterial('ash_compound', 1); }
                txt = 'The fiber matting is solid at the core, still workable. The jar holds a paste compound — ash-based, familiar to anyone who knows industrial preparation. You take both.' + (r.isCrit ? ' Behind the jar, wrapped in oilcloth: folded papers in a hand you do not recognize, figures and names.' : '');
                if (r.isCrit && typeof addMaterial === 'function') addMaterial('debt_ledger_scraps', 1);
              } else {
                if (typeof addMaterial === 'function') addMaterial('frontier_fiber', 1);
                txt = 'The jar is sealed but empty. The fiber is intact where it mattered to whoever stored it. You take what held together.';
              }
              if (typeof addNarration === 'function') addNarration('', txt);
              setTimeout(function() {
                if (typeof _travelNextEncounter === 'function') _travelNextEncounter();
                else if (typeof loadStageChoices === 'function') loadStageChoices(G ? G.currentLocation : '');
              }, 600);
            }
          },
          {
            text: 'A collapsed wall on someone\'s field boundary is someone else\'s problem.',
            skill: 'wits', tag: 'safe', align: 'neutral',
            cid: 'corridor_scavenge_medium_pass',
            action: function() {
              setTimeout(function() {
                if (typeof _travelNextEncounter === 'function') _travelNextEncounter();
                else if (typeof loadStageChoices === 'function') loadStageChoices(G ? G.currentLocation : '');
              }, 200);
            }
          }
        ]
      }
    ],

    long: [
      {
        id: 'ce_long_ambush_approach',
        title: 'Road Ahead Blocked',
        text: 'Three figures have positioned themselves across the road at a narrow point where hedgerows press close on both sides. They are not Roadwardens. Two have staffs; one has a hand on a belt knife but has not drawn it. Behind you, a fourth figure has stepped onto the road from the hedgerow gap. They are positioned well — someone who knows this stretch. The one with the knife speaks first: you are carrying something they want. He does not say what.',
        choices: [
          { text: 'The positioning means they have done this before. Make the cost too high.', skill: 'might', tag: 'bold', align: 'neutral', cid: 'corridor_ambush_fight',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('might') : { total: 10, isCrit: false, isFumble: false };
              var dc = 16;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'The forward two step back when the cost becomes clear. The one with the knife holds for a moment — long enough to be a decision — and then doesn\'t. The fourth figure behind you stays where he is. You move through the gap they leave.');
                if (typeof gainXp === 'function') gainXp(30);
                G.fatigue = (G.fatigue || 0) + 1;
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The fourth figure from behind closes faster than expected. The forward positioning was designed for this — the road narrows exactly where you\'re standing. The fight is worse than the arithmetic suggested.');
                if (typeof modHP === 'function') modHP(-3);
                G.fatigue = (G.fatigue || 0) + 2;
                if (typeof addHeat === 'function') addHeat('shelk', 1);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'They said what they want. They have not said they know what it is.', skill: 'charm', tag: 'risky', align: 'neutral', cid: 'corridor_ambush_talk',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'They want what they think you\'re carrying. When you describe what you\'re actually carrying, the calculation changes visibly. The knife-holder sends the fourth figure to check. He finds nothing worth the trouble. The road clears.');
                if (typeof gainXp === 'function') gainXp(20);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The conversation takes longer than the positioning allows. The fourth figure has closed from behind by the time you reach the second sentence. The negotiation is over and the terms are different now.');
                if (typeof modHP === 'function') modHP(-2);
                if (typeof addHeat === 'function') addHeat('shelk', 1);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'The hedgerow on the right is thinner. The position is not as tight as it looks.', skill: 'finesse', tag: 'risky', align: 'neutral', cid: 'corridor_ambush_break',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'Two competing root systems have left a gap at ground level. You\'re through it before anyone moves. The road on the far side of the hedgerow is clear and runs parallel for two hundred meters before rejoining the main route.');
                if (typeof gainXp === 'function') gainXp(25);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The gap is shallower than it looked from the road. The figure with the staff reaches the hedgerow before you push through. The position is tighter than it looked.');
                if (typeof addHeat === 'function') addHeat('shelk', 1);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          }
        ]
      },
      {
        id: 'ce_long_courier_down',
        title: 'Courier on the Ground',
        text: 'A Roadwarden courier is sitting against a milestone, one leg extended, the other drawn up. Her dispatch bag is still sealed and still on her shoulder. The injury is to her ankle — she has wrapped it with cord from her pack. Her horse is nowhere visible. When she sees you, her hand moves to the bag strap, not to any weapon, and she watches your face before she says anything.',
        choices: [
          { text: 'She is protecting the bag, not herself. The bag is what matters here.', skill: 'wits', tag: 'risky', align: 'neutral', cid: 'corridor_courier_bag',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'She gives you the dispatch number without the route. She decides that the number is less dangerous than the route — you can see the decision. The seal is intact, the bag is going through. The number is enough to trace the origin checkpoint.');
                if (typeof addJournal === 'function') addJournal('Injured courier. Dispatch bag sealed, number recorded. No horse — not lost, removed. Origin: two checkpoints south.', 'intelligence');
                if (typeof gainXp === 'function') gainXp(20);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'Her hand tightens on the strap when you mention the bag. She stops answering and watches the road behind you instead. The conversation is finished.');
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'Help with the ankle. The bag is her problem to manage.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'corridor_courier_help',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10, isCrit: false, isFumble: false };
              var dc = 7;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'The ankle is wrapped correctly for short travel. She tests it, stands, and can move. She thanks you without using your name — she noticed that you did not give it, and that noticing is visible in the way she said it.');
                if (typeof gainXp === 'function') gainXp(12);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The cord is wrong for this injury — bone, not tendon. She needs the next post\'s medical kit, not field wrapping. You\'ve added time to her stop without making it shorter.');
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'A sealed dispatch bag and no horse on a long route means she was intercepted once already.', skill: 'charm', tag: 'risky', align: 'neutral', cid: 'corridor_courier_ask',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'The dispatch originated two checkpoints south. The horse was taken, not lost — she makes that distinction carefully, specifically, the way you make distinctions that matter for a formal report. She says it once and does not repeat it.');
                if (typeof addJournal === 'function') addJournal('Courier horse removed, not lost. Dispatch originated two checkpoints south. Pattern: active interception on long route.', 'intelligence');
                if (typeof gainXp === 'function') gainXp(25);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'She answers the first question and stops. Whatever you asked after that closed the conversation. She is watching the road behind you, not looking at your face.');
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          }
        ]
      },
      {
        id: 'ce_long_crossroads_authority',
        title: 'Crossroads Authority',
        text: 'The crossroads has a permanent Roadwarden post and a second structure beside it: a grey fieldstone building with the Guild Council transit seal above the door and a notice board three panels wide. A senior warden — the shoulder-bar indicates route commander rank — is standing outside with a list. She is checking names against it as travelers pass. Behind her, through the open door, two more wardens are visible at a table with cargo manifests spread open.',
        choices: [
          { text: 'Route commander rank at a crossroads check means an active directive, not routine work.', skill: 'wits', tag: 'risky', align: 'neutral', cid: 'corridor_crossroads_read',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'Route commander rank. The list she\'s working from is name-specific, not cargo-specific — you can see the column layout from the road. The manifests inside have been cross-referenced against something. This is an active directive, not a quota check.');
                if (typeof addJournal === 'function') addJournal('Crossroads checkpoint: route commander, name-specific list, cross-referenced manifests. Active directive in force — not routine quota.', 'intelligence');
                if (typeof gainXp === 'function') gainXp(25);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'You slow enough to read the rank insignia. She stops checking her list and looks directly at you. Her pen is still in her hand.');
                if (typeof addHeat === 'function') addHeat('shelk', 2);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'Cross at the standard pace. A hesitation is what they are watching for.', skill: 'charm', tag: 'safe', align: 'neutral', cid: 'corridor_crossroads_through',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10, isCrit: false, isFumble: false };
              var dc = 7;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'She checks the list. Your name is not on it. She waves you through without looking up from the column.');
                if (typeof gainXp === 'function') gainXp(10);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'She checks the list twice. You pass through, but the pause between checks was long enough that one of the wardens inside looked up from the manifests. You have been noted, if not stopped.');
                if (typeof addHeat === 'function') addHeat('shelk', 1);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'The secondary road to the east adds half a day. It is not on her list.', skill: 'vigor', tag: 'risky', align: 'neutral', cid: 'corridor_crossroads_detour',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'The eastern road meets the main route again eight kilometers on. Half a day added, nothing written in the checkpoint ledger. The detour costs time and buys nothing except the absence of a notation.');
                if (typeof gainXp === 'function') gainXp(20);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'The eastern road is gated a kilometer in — seasonal maintenance closure, padlocked, notice board facing the wrong direction. You walk back to the crossroads checkpoint. She watches you rejoin the queue.');
                if (typeof addHeat === 'function') addHeat('shelk', 1);
                G.fatigue = (G.fatigue || 0) + 1;
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          }
        ]
      },
      {
        id: 'ce_long_significant_find',
        title: 'Something Left on the Road',
        text: 'A document case lies open in the middle of the road — not dropped and kicked aside, but placed, centered between the wheel ruts, as though someone wanted it found. The case is Guild-stamped with a Shelkopolis origin mark. Inside is a single folded document. The paper has a Roadwarden header, but the text below has been struck through in red ink — every line, systematically, with the same hand. A name at the bottom remains legible.',
        choices: [
          { text: 'The case was placed. Someone knew this route would bring the right traveler past it.', skill: 'wits', tag: 'bold', align: 'neutral', cid: 'corridor_find_take',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10, isCrit: false, isFumble: false };
              var dc = 16;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'The name at the bottom is one you recognize from register, not personally. The struck-through text is systematic — every line, same hand, same pressure, not redaction but erasure. The document says something was expected and did not arrive. The case goes into your pack.');
                if (typeof addJournal === 'function') addJournal('Placed document: Roadwarden header, full text struck through systematically. Single legible name at bottom. Taken for further analysis.', 'evidence');
                if (typeof gainXp === 'function') gainXp(40);
                if (typeof addMaterial === 'function') addMaterial('redacted_warrant', 1);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'A Roadwarden patrol appears at the far end of the road as you lift the document from the case. You have the document. They have a clear line of sight. The case is still open in the road.');
                if (typeof addHeat === 'function') addHeat('shelk', 3);
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          },
          { text: 'Placed evidence is someone\'s trap or someone\'s message. Neither option is comfortable.', skill: 'vigor', tag: 'risky', align: 'neutral', cid: 'corridor_find_read_only',
            action: function() {
              var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10, isCrit: false, isFumble: false };
              var dc = 13;
              if (r.total >= dc) {
                if (typeof addNarration === 'function') addNarration('', 'You read the name without touching the case. The placement is deliberate — centered, visible, on a road with regular traffic. Someone placed this for a specific reader. You are not that reader. You step past it.');
                if (typeof addJournal === 'function') addJournal('Placed document at roadside. Name at bottom readable. Not addressed to you — left for a specific reader on this route.', 'intelligence');
                if (typeof gainXp === 'function') gainXp(15);
              } else {
                if (typeof addNarration === 'function') addNarration('', 'You read the name and step back. A figure at the road bend thirty meters back has been standing still long enough to have watched you read it. They do not approach. They do not move.');
              }
              setTimeout(function() {
                if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
                else TRAVEL_CORRIDOR.advanceDayLeg();
              }, 500);
            }
          }
        ]
      },
      {
        id: 'ce_long_waymark_cache',
        title: 'Cache at the Waymark Stone',
        text: 'The old waymark stone — pre-Roadwarden, by the carved style — has a hollow behind it that someone has used recently. Inside: a roll of waxed cloth around a tight bundle, a folded paper marked with a route notation in a hand that looks clerical, and a small pouch of pale chalk dust that smells faintly of something that does not belong on a road. The hollow has been used before. The cloth is dry. The chalk is fresh.',
        choices: [
          {
            text: 'Fresh chalk and a clerical route notation mean someone is coming back for this.',
            skill: 'vigor', tag: 'bold', align: 'neutral',
            cid: 'corridor_scavenge_long_search',
            action: function() {
              var r = (typeof rollD20 === 'function') ? rollD20('vigor', (G && G.skills ? G.skills.vigor : 0)) : {roll:10,total:10,isCrit:false,isFumble:false};
              var txt;
              if (r.isFumble) {
                txt = 'The bundle is decoy weight — wrapped stone. The paper is blank beneath the route marks. Someone leaves false caches on long routes for a reason, and now you have announced yourself to whatever that reason is.';
              } else if (r.total >= 10) {
                if (typeof addMaterial === 'function') { addMaterial('contract_fragment', 1); addMaterial('archive_chalk', 1); }
                txt = 'The bundle holds a fragment of a contract — names redacted, but the structure is recognizable. The chalk is archive-grade, not road chalk. Both have use. You take them and repack the waxed cloth so the hollow looks undisturbed.' + (r.isCrit ? ' Beneath the chalk pouch, wrapped separately: a folded wax seal, fresh and unused, from a commune you recognize.' : '');
                if (r.isCrit && typeof addMaterial === 'function') addMaterial('ritual_wax', 1);
              } else {
                if (typeof addMaterial === 'function') addMaterial('archive_chalk', 1);
                txt = 'The bundle is gone — taken recently, leaving only the chalk pouch. The route notation on the paper is partial. You take the chalk and leave the hollow as you found it.';
              }
              if (typeof addNarration === 'function') addNarration('', txt);
              setTimeout(function() {
                if (typeof _travelNextEncounter === 'function') _travelNextEncounter();
                else if (typeof loadStageChoices === 'function') loadStageChoices(G ? G.currentLocation : '');
              }, 600);
            }
          },
          {
            text: 'Cache hollows on long routes are someone\'s operational infrastructure. Leave it alone.',
            skill: 'vigor', tag: 'safe', align: 'neutral',
            cid: 'corridor_scavenge_long_pass',
            action: function() {
              if (typeof addMaterial === 'function') addMaterial('ritual_wax', 1);
              if (typeof addNarration === 'function') addNarration('', 'You leave the cache undisturbed. On your way past, the waxed cloth catches the light — a single sealed wax disc has slipped from the bundle onto the ground outside the hollow. Whoever comes back for the cache will not miss one.');
              setTimeout(function() {
                if (typeof _travelNextEncounter === 'function') _travelNextEncounter();
                else if (typeof loadStageChoices === 'function') loadStageChoices(G ? G.currentLocation : '');
              }, 600);
            }
          }
        ]
      }
    ]
  };

  // ---------------------------------------------------------------------------
  // OPERATIONAL_ANCHORS
  // Real waypoints where the player can pause mid-journey
  // ---------------------------------------------------------------------------
  window.OPERATIONAL_ANCHORS = [
    {
      id: 'anchor_fairhaven_east',
      locality: 'fairhaven',
      name: 'Fairhaven East Waystation',
      desc: 'A Roadwarden waystation at the eastern edge of Fairhaven territory. Stone-built, single room, fire laid but not lit. The dispatch board has four notices pinned to it; two are this week\'s. Water is clean. The door bolt works from inside.',
      choices: [
        { text: 'Rest here. The road will still be there at first light.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'anchor_make_camp_fairhaven',
          action: function() {
            var heal = Math.min(3, ((G.maxHp || 14) - (G.hp || 14)));
            if (heal > 0 && typeof modHP === 'function') modHP(heal);
            G.fatigue = Math.max(0, (G.fatigue || 0) - 2);
            if (typeof addNarration === 'function') addNarration('', 'The fire takes on the third strike. The dispatch board is readable from the sleeping roll. You don\'t sleep well, but you sleep. The ankle stiffness is gone by first light.');
            if (typeof addJournal === 'function') addJournal('Rested at Fairhaven East Waystation.', 'evidence');
            setTimeout(function() {
              if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
              else TRAVEL_CORRIDOR.advanceDayLeg();
            }, 500);
          }
        },
        { text: 'Read the dispatch board before pushing on.', skill: 'wits', tag: 'safe', align: 'neutral', cid: 'anchor_push_on_fairhaven',
          action: function() {
            if (typeof gainXp === 'function') gainXp(15);
            if (typeof addJournal === 'function') addJournal('Fairhaven East Waystation dispatch board: two notices current this week.', 'intelligence');
            if (typeof addNarration === 'function') addNarration('', 'Two current notices on the board — one route advisory, one cargo flag. You note both and continue. The eastern road is yours for another hour before the next waystation.');
            setTimeout(function() {
              if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
              else TRAVEL_CORRIDOR.advanceDayLeg();
            }, 500);
          }
        }
      ]
    },
    {
      id: 'anchor_soreheim_border',
      locality: 'sunspire_haven',
      name: 'Soreheim Border Allocation Post',
      desc: 'A Giant Council allocation post at the Soreheim boundary marker. Staffed during quota hours; currently empty. A grease-pencil transit log on the counter shows twelve crossings today. The stove is warm. Someone left a canteen.',
      choices: [
        { text: 'An empty quota post and a warm stove. Make use of both.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'anchor_make_camp_soreheim',
          action: function() {
            var heal = Math.min(3, ((G.maxHp || 14) - (G.hp || 14)));
            if (heal > 0 && typeof modHP === 'function') modHP(heal);
            G.fatigue = Math.max(0, (G.fatigue || 0) - 2);
            if (typeof addNarration === 'function') addNarration('', 'The stove warmth is allocation post warmth — dry and even. The canteen on the counter is full. You use it. Twelve names in the transit log. You read them without meaning to.');
            if (typeof addJournal === 'function') addJournal('Rested at Soreheim Border Allocation Post.', 'evidence');
            setTimeout(function() {
              if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
              else TRAVEL_CORRIDOR.advanceDayLeg();
            }, 500);
          }
        },
        { text: 'The transit log has names. Cross the boundary now and stay out of it.', skill: 'finesse', tag: 'risky', align: 'neutral', cid: 'anchor_push_on_soreheim',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10, isCrit: false, isFumble: false };
            var dc = 13;
            if (r.total >= dc) {
              if (typeof gainXp === 'function') gainXp(20);
              if (typeof addNarration === 'function') addNarration('', 'The boundary crossing is clean. No allocation warden on duty. The log has your transit number but not your name — the distinction is institutional, not personal, and it will hold.');
            } else {
              if (typeof addNarration === 'function') addNarration('', 'An allocation warden arrives from the south post as you cross. She asks your transit number. You give it. She writes it down. The log now has both the number and the name she asked for after.');
              if (typeof addHeat === 'function') addHeat('shelk', 1);
            }
            setTimeout(function() {
              if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
              else TRAVEL_CORRIDOR.advanceDayLeg();
            }, 500);
          }
        }
      ]
    },
    {
      id: 'anchor_sheresh_perimeter',
      locality: 'aurora_crown_commune',
      name: 'Dome Perimeter Rest Stop',
      desc: 'A Dome Stewards-maintained rest point at the Sheresh perimeter. The dome-light is close enough here to read by without a lamp. Insulated sleeping rolls are stored in a locked rack — key on a hook above the door, available to travelers. The cold through the walls is steady, not cutting.',
      choices: [
        { text: 'Dome-light does not stop. Sleep is possible if the cold is manageable.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'anchor_make_camp_sheresh',
          action: function() {
            var heal = Math.min(3, ((G.maxHp || 14) - (G.hp || 14)));
            if (heal > 0 && typeof modHP === 'function') modHP(heal);
            G.fatigue = Math.max(0, (G.fatigue || 0) - 2);
            if (typeof addNarration === 'function') addNarration('', 'The dome-light does not follow a day cycle — it is steady, not bright. The insulated roll is cold at first. By the second hour it holds its warmth. You sleep through the dome-glow.');
            if (typeof addJournal === 'function') addJournal('Rested at Dome Perimeter Rest Stop.', 'evidence');
            setTimeout(function() {
              if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
              else TRAVEL_CORRIDOR.advanceDayLeg();
            }, 500);
          }
        },
        { text: 'The dome perimeter is monitored. Better to arrive in full daylight.', skill: 'wits', tag: 'safe', align: 'neutral', cid: 'anchor_push_on_sheresh',
          action: function() {
            if (typeof gainXp === 'function') gainXp(10);
            if (typeof addNarration === 'function') addNarration('', 'The perimeter monitoring operates on a visual cycle, not a time one. Arriving in full daylight means arriving in the window where the sweep already cleared your approach. The next checkpoint is two kilometers in.');
            setTimeout(function() {
              if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
              else TRAVEL_CORRIDOR.advanceDayLeg();
            }, 500);
          }
        }
      ]
    },
    {
      id: 'anchor_psanan_ash_road',
      locality: 'psanan',
      name: 'Ash Road Iron Station',
      desc: 'A cast-iron waystation on the Psanan ash road. Ventilation slots along the roof keep the air inside cleaner than outside. The forge heat from below keeps it warm without fire. A route advisory board carries one current notice, updated in grease pencil: ASH LEVEL — ELEVATED EAST.',
      choices: [
        { text: 'The forge heat and the clean air are reasons enough to stop.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'anchor_make_camp_psanan',
          action: function() {
            var heal = Math.min(3, ((G.maxHp || 14) - (G.hp || 14)));
            if (heal > 0 && typeof modHP === 'function') modHP(heal);
            G.fatigue = Math.max(0, (G.fatigue || 0) - 2);
            if (typeof addNarration === 'function') addNarration('', 'The ventilation keeps the air cleaner than outside by enough to matter. The forge heat from below is steady and sourceless. You sleep warmer than the road has any right to allow.');
            if (typeof addJournal === 'function') addJournal('Rested at Ash Road Iron Station.', 'evidence');
            setTimeout(function() {
              if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
              else TRAVEL_CORRIDOR.advanceDayLeg();
            }, 500);
          }
        },
        { text: 'Elevated ash east means the timing matters. Move now.', skill: 'wits', tag: 'risky', align: 'neutral', cid: 'anchor_push_on_psanan',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10, isCrit: false, isFumble: false };
            var dc = 13;
            if (r.total >= dc) {
              if (typeof gainXp === 'function') gainXp(20);
              if (typeof addNarration === 'function') addNarration('', 'ELEVATED EAST means the ash layer rises toward the settlement boundary. Moving now means moving through the transition zone while it is still crossable. You time it correctly.');
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The ash level east rises faster than the advisory suggested. You reach the boundary but not cleanly — the transition zone was already at threshold when you entered it.');
              G.fatigue = (G.fatigue || 0) + 2;
            }
            setTimeout(function() {
              if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter();
              else TRAVEL_CORRIDOR.advanceDayLeg();
            }, 500);
          }
        }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // ROUTE_COMPLICATIONS — keyed by 'from_id|to_id' (canonical order)
  // Types: checkpoint (day 1–15%), patrol (15–50%), night (50–75%), hazard (75–100%)
  // ---------------------------------------------------------------------------
  window.ROUTE_COMPLICATIONS = {};

  // Route 1: shelkopolis|fairhaven
  window.ROUTE_COMPLICATIONS['shelkopolis|fairhaven'] = {
    checkpoint: {
      title: 'Shelk Transit Checkpoint',
      text: 'A grey-and-white checkpoint barrier at the road edge. The warden on duty is running a manifest comparison against a sealed board — cargo weights, passenger names, departure stamps. The warden\'s pen has been tapping the board at irregular intervals. She looks up when you reach the barrier arm.',
      choices: [
        {
          text: 'Offer papers before she asks.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Papers first. She checks, stamps, lifts the arm. The efficiency of it is what she notes — you are the third traveler today who did not make her ask.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The papers are in order but she finds a discrepancy in the departure stamp — the day is correct, the hour is not. She writes something. You are through, but the note goes somewhere.');
              if (typeof addHeat === 'function') addHeat('shelk', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'Name the intermediary who handled the transit authorization.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The name works. She knows it — the warden relaxes by one degree, which in Shelk transit terms means she stops tapping her pen. The barrier arm goes up.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The name does not land the way you expected. She asks a follow-up question about the authorization office location. You guess wrong. The note she writes is longer this time.');
              if (typeof addHeat === 'function') addHeat('shelk', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Shelk Road Patrol',
      text: 'A two-warden patrol coming the opposite direction — mounted, grey cloaks — moving at a pace that is not urgent but is not leisure. One warden is watching the road verge. The other is watching travelers. They have not signaled a stop yet, but the one watching travelers has noted you.',
      choices: [
        {
          text: 'Keep pace. Looking like you belong is the simplest answer.',
          skill: 'charm', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The mounted warden\'s gaze moves past you to the cart behind. Keeping pace and posture turned out to be the right calculation. They continue south. You continue north.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The patrol stops ten meters past you, turns, and calls you back. The mounted warden asks where you are coming from and going to, in that order. The answer matters less than how long it takes you to give it.');
              if (typeof addHeat === 'function') addHeat('shelk', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'Step into the verge before they pass. Less visible, less memorable.',
          skill: 'finesse', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The verge is lower than the road by half a meter. You descend without stumbling. The wardens pass. Neither looks down.');
              if (typeof gainXp === 'function') gainXp(15);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The movement is too deliberate. The road-watching warden\'s head turns. He does not stop immediately — that is what concerns you more than if he had.');
              if (typeof addHeat === 'function') addHeat('shelk', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'After Sunset on the Shelkopolis Road',
      text: 'The posted curfew for non-cargo travel on the Shelkopolis road is two hours after sunset. You are still moving. The road is not empty — a light cart ahead, someone on horseback behind — but the checkpoint interval has not closed for the night yet and the warden at the marker post ahead is noting who is still on the road.',
      choices: [
        {
          text: 'Move to the camp ground adjacent to the checkpoint. The road can wait until first light.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The campground is staked and fire-pitted. Three other travelers are already there. The warden notes your arrival but does not question it — you made the right call before the right moment.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The campground is full. The warden directs you to the overflow area, which is a field with no fire pit. The rest is adequate but not comfortable.');
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The checkpoint will not close for another hour. Press through.',
          skill: 'wits', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The checkpoint is still open. The warden marks your transit and waves you through. The road ahead is darker but passable.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The checkpoint closes fifteen minutes before you reach it. The warden is already inside. The sealed arm is down. You camp at the barrier and wait for first light.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Inspection Pressure on the Shelkopolis Road',
      text: 'A freight inspection point has been set up at a wide section of the road — temporary barriers, three wardens, a scale for weighing cargo. They are checking everything, not sampling. The line of travelers ahead is short but moving slowly. A warden at the edge of the inspection area is watching people decide whether to join the line.',
      choices: [
        {
          text: 'Join the line. What you\'re carrying will pass a standard inspection.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Thirty minutes in the line. The inspection is thorough but procedural. You pass. The warden stamps your manifest and releases you.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The inspection finds something irregular — not contraband, but a documentation gap. The warden pulls you to the secondary area. The delay costs half a day.');
              if (typeof advanceTime === 'function') advanceTime(0.5);
              if (typeof addHeat === 'function') addHeat('shelk', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The road verge goes around this section. Use it.',
          skill: 'finesse', tag: 'bold',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 16) {
              if (typeof addNarration === 'function') addNarration('', 'The verge bypass is unmarked but passable. The warden at the edge of the inspection area watches you move but does not call out. You rejoin the road fifty meters past the checkpoint.');
              if (typeof gainXp === 'function') gainXp(25);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The warden at the edge calls out before you have cleared the inspection zone. You stop. The secondary area is worse than the line would have been.');
              if (typeof addHeat === 'function') addHeat('shelk', 3);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  // Route 2: shelkopolis|aurora_crown_commune
  window.ROUTE_COMPLICATIONS['shelkopolis|aurora_crown_commune'] = {
    checkpoint: {
      title: 'Domeway Transit Registration',
      text: 'A glass-panel booth at the roadside, two Dome Stewards inside. The booth is enclosed and heated — the cold outside makes the glass fog at the edges. One Steward is logging names into a bound register; the other is checking transit reasons against a reference sheet. A printed notice beside the booth window lists restricted conjuration categories within three kilometers of the dome perimeter.',
      choices: [
        {
          text: 'Register standard. Papers and transit reason, nothing more.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Name entered, transit reason accepted — personal travel, non-commercial. The Steward stamps the register page and slides a transit token through the booth window without looking up. The barrier lifts.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The transit reason raises a question — the Steward wants a destination district within Aurora Crown, not just the settlement name. The follow-up takes ten minutes and ends with a provisional entry in the register.');
              if (typeof addHeat === 'function') addHeat('sheresh', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'A transit reason that does not invite follow-up questions.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Supply delivery, third-party authorization — the Steward checks the reference sheet, finds the category, and moves on. The reason was calibrated correctly: specific enough to be real, vague enough not to generate a secondary log entry.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The transit reason does not match a recognized category on the reference sheet. The Steward asks which authorization tier covers it. There is no good answer. The log entry is flagged.');
              if (typeof addHeat === 'function') addHeat('sheresh', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Dome Perimeter Patrol',
      text: 'Two Dome Stewards on foot in silver-piped grey coats, moving along the perimeter approach road. Their breath is visible in the cold. One carries a warded-cargo detection rod — a thin brass instrument that extends to half a meter when active. They are stopping travelers heading toward the dome, not away from it. The rod comes out for packs, not for persons.',
      choices: [
        {
          text: 'Standard traveler posture. Nothing warded to declare.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The rod passes over your pack without registering. The Steward retracts it, nods, steps aside. The patrol continues north. Nothing in your kit was warded and nothing read as warded.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The rod hesitates over a corner of your pack — not a full register, but enough that the Steward asks you to open the top section. The inspection is brief but logged.');
              if (typeof addHeat === 'function') addHeat('sheresh', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'Something in my kit is warded. Declare it before the rod finds it.',
          skill: 'spirit', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('spirit') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Declaring before the rod sweeps reads as transparency. The Steward checks the warded item against the restricted list — it is not on it. The declaration goes into a separate log, not the heat register. You are through.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The warded item is on the restricted list. Not prohibited — but requiring a special transit endorsement you do not have. The Steward writes the endorsement gap into the patrol log.');
              if (typeof addHeat === 'function') addHeat('sheresh', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'After-Hours Domeway',
      text: 'The Domeway closes at sunset. The cold intensifies once the booth lights go out — the glass-panel booths hold warmth that the open road does not. A waystation marker post is visible two hundred meters ahead, lit by a single hanging lamp. A notice board at the waystation entrance lists overnight registration requirements: name, transit token, departure time.',
      choices: [
        {
          text: 'Make for the waystation. The cold is manageable.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The waystation has two bunks free. Registration takes five minutes — name, transit token number, planned departure. The Steward on night duty does not look up from the log. The bunk is narrow but the cold stays outside.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The waystation is at capacity. The night-duty Steward directs you to a covered platform outside — registered, but without the bunk. The cold keeps you half-awake until dawn.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The Domeway after-hours rules have a transit-cargo exception. Argue it.',
          skill: 'wits', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Transit-cargo exception applies to authorized carriers moving perishables through after-hours. The Steward checks the classification against his reference sheet, finds the category, and allows continued transit. The barrier lifts on a closed road.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The exception exists but your cargo does not qualify under it. The Steward is patient but firm. You stay at the waystation until the Domeway reopens at first light.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Warded Cargo Inspection Point',
      text: 'A full cargo inspection point set up across the approach road — four Dome Stewards, a pair of detection rods on tripod mounts, travelers in line ahead having packs opened and scanned. The detection rods are fixed-position here, not handheld. They register at a wider frequency. A notice board beside the inspection point lists the specific conjuration categories under enhanced scrutiny this transit window.',
      choices: [
        {
          text: 'Line up. What you\'re carrying will pass a standard scan.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The fixed rods do not register your pack. The Steward checks the visual inspection against the scan result, stamps your transit token, and directs you through the barrier. The traveler behind you is less straightforward.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The fixed rods flag something at the edge of their frequency range. The Steward cannot identify a specific item but logs the read. Your transit token gets a secondary mark. It will be visible at the next checkpoint.');
              if (typeof addHeat === 'function') addHeat('sheresh', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The inspection perimeter has a gap at the eastern ditch. Use it.',
          skill: 'finesse', tag: 'bold',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 16) {
              if (typeof addNarration === 'function') addNarration('', 'The ditch is dry and the eastern gap is real — the detection rods do not cover the full width at that angle. You move through without entering the inspection zone. The road rejoins fifty meters past the barrier.');
              if (typeof gainXp === 'function') gainXp(25);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'One of the handheld-rod Stewards is stationed at the eastern edge specifically for the ditch gap. She sees you before you reach it. The secondary inspection is more thorough than the standard line would have been.');
              if (typeof addHeat === 'function') addHeat('sheresh', 3);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  // Route 3: shelkopolis|cosmoria
  window.ROUTE_COMPLICATIONS['shelkopolis|cosmoria'] = {
    checkpoint: {
      title: 'Harbor Ring Entry Post',
      text: 'A Cosmouth warden in a dark blue tabard with a silver scales mark stands at a weighing post on the coastal approach road. Behind him, a hanging balance scale is mounted to a post beam. He is checking departure weights against a manifest board — Shelk departure figures on the left column, Cosmouth arrival figures on the right. The two columns use different calculation methods.',
      choices: [
        {
          text: 'Manifest first. Weight declared before he asks.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The warden checks your declared weight against the scale, enters it in the right column, and stamps the manifest. The Shelk departure figure and the Cosmouth arrival figure align within tolerance. He marks it clean.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The scale reads heavier than your declaration by enough to require a secondary log entry. The warden circles the discrepancy and notes it. You are through, but the entry goes to the harbor ledger.');
              if (typeof addHeat === 'function') addHeat('cosmouth', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The Shelk departure weight formula differs from Cosmouth\'s. Work that gap.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The warden knows the formula difference — he has been noting it all day. Citing it correctly reads as institutional knowledge, not evasion. He applies the conversion factor, the columns align, the stamp goes on.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The conversion argument requires citing the specific harbor code section. You get the code number wrong. The warden stops writing and looks at you for the first time.');
              if (typeof addHeat === 'function') addHeat('cosmouth', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Blue Tabard Road Patrol',
      text: 'Two Cosmouth wardens on horseback, moving the coastal approach at a walking pace. Both wear the dark blue tabard with silver scales. One is holding a manifest board across his saddle — he has been checking cargo carts. The other is watching the road edge where the coastal verge begins, a wide strip of salt-grass that runs parallel to the road for the next half kilometer.',
      choices: [
        {
          text: 'Open cargo posture. The patrol checks and moves on.',
          skill: 'charm', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The manifest-holding warden pulls alongside, checks your pack declaration against the board, and moves on without stopping. Personal travel without cargo does not require a ledger entry on this stretch.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The warden stops his horse and asks for your departure point and cargo category. Personal travel is not on his manifest board and he is not sure which column it goes in. He makes a note in the margin.');
              if (typeof addHeat === 'function') addHeat('cosmouth', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The coastal verge is wide enough here to step off unnoticed.',
          skill: 'finesse', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The salt-grass is dense enough to move through without the road noise changing. The warden watching the verge has his attention on the stretch ahead. You rejoin the road past the patrol without registering on either man\'s manifest board.');
              if (typeof gainXp === 'function') gainXp(15);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The salt-grass is thinner than it looked from the road. The verge-watching warden sees the movement and calls a halt. The patrol turns around.');
              if (typeof addHeat === 'function') addHeat('cosmouth', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Coastal Road After Dark',
      text: 'The coastal road carries a night transit ban for unmarked cargo between sunset and the harbor bell — roughly six hours. Personal travel is not banned but is subject to a stop-and-log requirement at any warden post still lit. A warden post with a lamp is visible ahead at the road junction. Harbor lights are visible on the horizon to the south.',
      choices: [
        {
          text: 'Make for the warden post. Night transit log is routine.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The post warden is expecting personal travelers — the night log has three entries already. Name, departure point, estimated harbor arrival. He stamps your record and you continue. The harbor lights are closer now.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The post warden has a question about your cargo category that takes longer to resolve than it should. The log entry ends with an asterisk. He does not explain what the asterisk means.');
              if (typeof addHeat === 'function') addHeat('cosmouth', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'Unmarked cargo has a personal-use exemption. Know it before saying it.',
          skill: 'wits', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Personal-use exemption, section four of the coastal transit code, applies to cargo under a declared weight threshold carried by a single traveler without commercial purpose. You cite it correctly. The warden does not check his reference sheet.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The exemption threshold is lower than you cited. The warden checks his reference sheet and finds the correct figure. Your cargo is over it. The log entry is mandatory now, and flagged.');
              if (typeof addHeat === 'function') addHeat('cosmouth', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Harbor Manifest Cross-Check',
      text: 'The harbor approach has been stopped for a manifest reconciliation — Cosmouth authority is running outbound manifests against a sealed harbor ledger, checking cargo declared at departure against cargo arriving at the ring. Four wardens are working the line. A fifth is consulting the ledger at a portable writing stand. The line is moving but every traveler is getting a full column check.',
      choices: [
        {
          text: 'Wait in line. The reconciliation is procedural.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The column check takes four minutes. Your departure declaration matches the harbor ledger entry within the tolerance margin. The warden stamps both columns and waves you through. The ledger stays sealed.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The ledger entry for your departure point is missing — not your fault, but the reconciliation cannot close without it. A secondary check is required. The delay is forty minutes.');
              if (typeof addHeat === 'function') addHeat('cosmouth', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The harbor ledger has a personal-goods category that bypasses reconciliation. Request it.',
          skill: 'charm', tag: 'bold',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 16) {
              if (typeof addNarration === 'function') addNarration('', 'The personal-goods category exists and the warden consulting the ledger knows it. Requesting it correctly — citing the ledger section, not just the category name — gets you moved to the short column. The reconciliation does not apply to your transit class.');
              if (typeof gainXp === 'function') gainXp(25);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The category exists but your cargo does not qualify under its weight limit. The warden closes the ledger section and sends you back to the main line. You have now been in the line twice.');
              if (typeof addHeat === 'function') addHeat('cosmouth', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  // Route 4: guildheart_hub|fairhaven
  window.ROUTE_COMPLICATIONS['guildheart_hub|fairhaven'] = {
    checkpoint: {
      title: 'Guild Transit Seal Check',
      text: 'A Guild warden in a brown tabard with a stamped guild-mark stands at a mid-route transit post, a doubled seal directory open on the counter in front of her. She is checking the integrity of double-stamped transit seals — one stamp from Guildheart, one endorsement from the mid-route post itself. The road is busy. Two cargo carts are ahead of you. A Guild courier has already been waved through.',
      choices: [
        {
          text: 'Both seals present and intact. Standard check.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'She checks both stamps against the directory, finds both valid, marks the seal record, and waves you through. The mid-route post stamp in the directory is from this week. Your seals are current.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'One seal is from a Guildheart office that has since relocated — the directory lists a forwarding address but no updated stamp record. The warden logs the gap. You are through, but the seal record is flagged.');
              if (typeof addHeat === 'function') addHeat('union', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'One seal is from a relocated office. Explain before she checks the directory.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Explaining the relocation before she reaches that page in the directory reads as preparation, not evasion. She finds the forwarding note, accepts the explanation, and applies the current-office standard to the old stamp. Both seals pass.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The relocated office explanation requires citing the relocation date. The date you give does not match the directory. She marks the seal record as unresolved and asks you to step aside while she checks the secondary register.');
              if (typeof addHeat === 'function') addHeat('union', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Guild Road Patrol',
      text: 'Two Guild wardens on foot, working the road in the direction of Fairhaven. They are not checking cargo carts — they have waved three past without stopping. They are checking seal integrity on personal travelers: pressing seals between finger and thumb, feeling for the wax depth that indicates a genuine stamp. Rumor traffic is heavy on this road. A carter ahead of you has already been stopped for questions.',
      choices: [
        {
          text: 'Open your transit case before they ask.',
          skill: 'charm', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Opening the case first shortens the interaction to thirty seconds. One warden presses your seal, confirms the wax depth, hands it back. The other is already looking at the traveler behind you.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The seal depth is correct but one warden asks about your route purpose. Guild road patrol asks that question when the seal check does not fully satisfy. The answer goes into the patrol log.');
              if (typeof addHeat === 'function') addHeat('union', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'Personal transit seals have a different inspection standard than cargo seals.',
          skill: 'wits', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Correct — personal transit seals require depth check only, not the endorsement-directory verification that cargo seals go through. One warden knows the distinction. He confirms it to the other. Your seal passes the correct standard.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The patrol applies cargo seal standards to personal seals and your seal does not have the cargo endorsement layer. The distinction you cited does not help — the warden does not know it and does not want to be corrected on a public road.');
              if (typeof addHeat === 'function') addHeat('union', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Guild Road Night Curfew',
      text: 'The Guild road runs a cargo-only night transit rule after two hours past sunset — personal travelers must have a registered waystation booking to continue. A waystation sign is visible at the road fork ahead. Three travelers are already turning toward it. A Guild courier passes in the opposite direction with the kind of speed that suggests couriers are exempt.',
      choices: [
        {
          text: 'Make for the nearest registered waystation.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The waystation has two bunks free and a registered log still open. You enter your name, seal number, and departure time. The Guild warden on overnight duty stamps the booking. The road resumes in the morning.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The waystation log is closed — the overnight warden sealed it at the cutoff time. Your name goes on an addendum sheet that counts as registered but carries an after-cutoff note.');
              if (typeof addHeat === 'function') addHeat('union', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'Apprentice transit exceptions allow personal travel after dark. Argue the category.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Apprentice transit exception applies to Guild-affiliated travelers in active transit on a time-sensitive assignment. The warden at the fork knows the category. Your argument lands on the right side of the line between legitimate exception and creative interpretation.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The exception requires a current apprentice transit authorization, which you do not have. The warden at the fork knows the difference between citing an exemption and qualifying for one. The waystation it is.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Seal Integrity Inspection',
      text: 'A full Guild inspection point at a wide road section — two tables, a magnification lens mounted on a brass stand, four wardens. They are checking seal-on-seal integrity: whether the Guildheart stamp and the mid-route endorsement align without gap or overlap. The lens examination takes ten minutes per traveler. The side track that branches off twenty meters back is not a posted route.',
      choices: [
        {
          text: 'Your seals are correct. Stand the inspection.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Ten minutes under the lens. The warden finds no gap between the two stamp layers, no overlap that would indicate a forgery. He closes the lens housing and stamps your transit record. Clean inspection.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The lens finds a minor misalignment between stamps — not a forgery, but a printing variance from the relocated office. The warden logs it and sends you to the secondary table. Secondary takes thirty minutes.');
              if (typeof addHeat === 'function') addHeat('union', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The side track bypasses this post entirely.',
          skill: 'finesse', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The side track is overgrown but passable. It rejoins the main road two hundred meters past the inspection point. No warden is posted at the rejoining point. You are back on the Guild road without a lens record.');
              if (typeof gainXp === 'function') gainXp(15);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'A fourth warden is positioned at the side track junction specifically because other travelers have had the same idea. He steps onto the track before you reach the treeline.');
              if (typeof addHeat === 'function') addHeat('union', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  // Route 5: guildheart_hub|ithtananalor
  window.ROUTE_COMPLICATIONS['guildheart_hub|ithtananalor'] = {
    checkpoint: {
      title: 'Forest Road Guild Post',
      text: 'The last Guild checkpoint before the canopy closes over the road. Two wardens in forest-standard gear — darker tabards, shorter boots, no horses. One is consulting a route advisory board that lists amber moth activity levels by kilometer marker. The other is noting the time in a transit log. The checkpoint booth has a posted notice: sightlines beyond this point are thirty meters maximum.',
      choices: [
        {
          text: 'Standard transit declaration. Papers before the post.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The log entry is straightforward: destination, estimated transit time, solo or group. You answer all three without prompting. The warden stamps the transit card and checks the moth-level board — current advisory is moderate, not extreme. You continue.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The warden asks for your route purpose in the forest section specifically. Transit through to Ithtananalor is a valid purpose but requires a destination district entry. You do not have one. The log entry is incomplete.');
              if (typeof addHeat === 'function') addHeat('union', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The warden has questions about my route purpose. Answer precisely.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Route purpose: through-transit to Ithtananalor, non-commercial, no stops anticipated within the Guild-maintained section. The warden finds the category, logs it, and adds a moth-season advisory to the transit card. His tone is not unfriendly.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The route purpose answer is technically correct but raises a question about the non-stop declaration — the Guild post at the two-kilometer marker requires all travelers to check in. You did not know about it.');
              if (typeof addHeat === 'function') addHeat('union', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Tree Line Warden Pair',
      text: 'A warden pair on the forest road: one walking the road center, one moving parallel in the tree line, visible only as movement at thirty meters. Amber moth season advisory notices are nailed to every other tree. The road warden is watching travelers; the tree-line warden is watching the canopy. The two are connected by a rope at their belts — standard pairing protocol for low-visibility sections.',
      choices: [
        {
          text: 'Keep the center of the road. Navigation compliance is visible.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Center-road movement reads as navigation-compliant. The road warden notes you and moves on. The tree-line warden has not changed position — still watching the canopy, not the road. The pair continues their circuit.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The road warden stops you to ask about amber moth exposure — you are in a moderate advisory zone and he wants to verify your navigation kit. The kit check is brief but adds a log entry.');
              if (typeof addHeat === 'function') addHeat('union', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The tree-line warden has lost my line of travel in the canopy density.',
          skill: 'finesse', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The canopy density breaks the tree-line warden\'s sightline at the bend. The road warden is watching traffic, not individuals. You move through the pair\'s circuit gap without entering their thirty-meter radius. The rope between them goes taut as they adjust position.');
              if (typeof gainXp === 'function') gainXp(15);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The tree-line warden does not lose you — the canopy is thinner than the density suggested from the road. He adjusts position and the road warden turns. Both wardens are now watching you.');
              if (typeof addHeat === 'function') addHeat('union', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Forest Road After Dark',
      text: 'Official guidance on the forest road is to stop before dark — amber moths become active at dusk and their navigation disruption effects worsen through the night. The road is invisible past ten meters. No warden posts after dark; the pair system does not operate at night. The road surface is identifiable by feel — the center stone is slightly raised above the packed earth on either side.',
      choices: [
        {
          text: 'Stop and make camp. The road is here in the morning.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Camp on the road center stone, pack as pillow. The amber moths are active in the tree line — visible as drifting orange points at twenty meters — but do not enter the road surface zone. First light comes with the canopy brightening from grey to green.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The road stone is harder than expected for sleeping. The amber moths drift closer than the advisory suggested. You rest badly and wake with the sense that the forest road has moved around you in the dark.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'Amber moth disruption follows the moisture line. The road runs dry above it.',
          skill: 'wits', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The moisture line is lower than the road grade here — the moths stay below it. Moving along the dry ridge of the road surface keeps you above the disruption zone. The navigation is difficult but not disorienting. You cover a kilometer before setting camp.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The moisture line is higher than the road grade at this section. The amber moths reach the road surface. The disorientation is mild but enough to lose the center stone. You stop and wait for the effect to pass.');
              G.fatigue = (G.fatigue || 0) + 2;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Root Fall Debris Block',
      text: 'A root fall has come down across the road — not a fallen tree but a root mass pulled from below by recent rain, the kind that leaves a raw earth cavity three meters wide and one meter deep on the upstream side. Guild maintenance crew is working the debris with hand tools. Travelers are being rerouted through the tree line on a marked detour. The detour signs are new and the path has not been walked flat yet.',
      choices: [
        {
          text: 'Take the reroute. The maintenance crew knows the detour.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The detour signs lead through a section of younger trees where the canopy is thinner. The path has not been walked flat but the ground is firm. Forty minutes added to the transit. The maintenance crew is still working when you rejoin the main road.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The detour path crosses a secondary root system that the maintenance crew has not flagged yet. You stumble through it without injury but the delay adds more time than the signs suggested.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The root fall exposed original stone road surface. I know the stone route.',
          skill: 'wits', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The exposed stone surface runs under the root mass and continues on the far side of the cavity. The maintenance crew watches you navigate it but does not stop you — they know the stone route exists, they just do not know how to use it. You are past the block in six minutes.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The stone route runs under the root mass but not through it — there is a gap where the stone was pulled up with the roots. The maintenance crew supervisor steps over and redirects you to the detour.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  // Route 6: guildheart_hub|soreheim_proper
  window.ROUTE_COMPLICATIONS['guildheart_hub|soreheim_proper'] = {
    checkpoint: {
      title: 'Quota Boundary Crossing',
      text: 'The highland boundary marker is a stone post four meters tall — Giant-scale, with quota figures carved into the face at eye height for a Giant and knee height for everyone else. A Quota Authority warden in a grey tabard with yellow number-stamps stands beside a weighing platform. Two extraction carts are being processed ahead of you. Everything here is sized for Giants and adapted for humans with a step stool and a secondary log.',
      choices: [
        {
          text: 'Declare your carry weight before the scale. The Quota Authority works in order.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The warden records your declared weight in the secondary log — the human-scale column beside the Giant extraction figures. The scale confirms your declaration within tolerance. He stamps the quota transit card and steps aside.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The weighing platform reads in Giant-scale units. Your pack weight converts to a fraction of a unit and the warden has to do the conversion by hand. He gets a different number than you declared. The discrepancy is small but he logs it.');
              if (typeof addHeat === 'function') addHeat('soreheim', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'This is personal goods, not quota goods. The distinction matters here.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Personal goods travel under the non-extraction category, which has its own column in the secondary log and does not go through the weighing platform at all. The warden knows this — he is relieved not to do the conversion. You are logged and waved through.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The warden is not sure the non-extraction category applies to your cargo without a declaration form. He does not have the form. He weighs you anyway and notes the category dispute in the log margin.');
              if (typeof addHeat === 'function') addHeat('soreheim', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Quota Authority Highland Patrol',
      text: 'A three-person Quota Authority patrol on the corridor road — two on foot, one mounted on a horse that looks undersized against the highland backdrop. Grey tabards, yellow number-stamps clearly legible from twenty meters. They are checking extraction figures against posted quota markers on the road posts, comparing cargo cart declarations against the posted numbers. Personal travelers are secondary to their manifest work.',
      choices: [
        {
          text: 'Non-quota traveler posture. Nothing to weigh.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The mounted warden gives you a single look and returns to the cargo cart manifest she was checking. Non-quota personal travel does not interrupt extraction work. You pass the patrol without the mounted warden looking up again.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'One of the foot wardens steps out of the manifest work to check your transit card. He is looking for a quota transit endorsement. Personal travelers through the extraction corridor are supposed to have one. You do not.');
              if (typeof addHeat === 'function') addHeat('soreheim', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The patrol\'s attention is on cargo carts. Personal travel at the verge reads differently.',
          skill: 'finesse', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The road verge on the highland section is narrow but passable. The mounted warden and both foot wardens are focused on a cart with a mismatched manifest. You move through the patrol zone at the verge edge without entering their working radius.');
              if (typeof gainXp === 'function') gainXp(15);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The verge is narrower than it looked from behind — the highland ground drops sharply on the far side. You slow to navigate it and the movement draws the mounted warden\'s attention away from the manifest.');
              if (typeof addHeat === 'function') addHeat('soreheim', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Highland Night Transit',
      text: 'The quota road carries a curfew after sunset — extraction weight stations close, quota logs seal, and the road is legally restricted to registered overnight transit only. A boundary waystation is visible from the last marker post: a low building with a Giant-scale entrance and a human-scale door cut into the frame beside it. A warden is still at the desk inside; the log is still open.',
      choices: [
        {
          text: 'Register at the boundary waystation. It is what it is there for.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The human-scale door opens into a room with a ceiling built for Giants. The warden\'s desk is on a raised platform. Name, transit category, planned departure. The log is still open and the entry is clean. The bunk allocation is on a side wall.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The log is sealed. The warden opens an addendum sheet — after-cutoff registration, valid but flagged. The bunk allocation is the overflow floor space, which is a Giant-scale stone floor with a single wool blanket.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The night transit exemption for non-extraction travelers is real. Invoke it at the post.',
          skill: 'wits', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Giant Council transit code section seven: non-extraction personal travel is exempt from the sunset curfew if the traveler carries no quota goods and is in documented through-transit. The warden checks the code section, finds it current, and endorses continued transit. The road is yours.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The exemption requires a through-transit declaration filed at the boundary marker before sunset. You did not file one. The exemption does not apply retroactively. The warden is apologetic but the log is already open.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Extraction Weight Station',
      text: 'A full weight inspection point on the corridor road — a Giant-scale platform scale spanning the full road width, with a counterbalanced arm overhead. Every traveler and every cart must cross the platform. Three Quota Authority wardens are working the ledger and the arm. The process is slow: the scale is calibrated for Giant extraction loads and personal travelers register as near-zero, which requires a manual secondary entry.',
      choices: [
        {
          text: 'Put the pack on the scale. Personal goods weigh within the exemption.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The scale arm barely registers. The warden records a personal-goods exemption entry in the secondary column — a two-line note rather than a full quota record. The process takes three minutes instead of fifteen. You are through.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The scale arm registers slightly above the personal-goods threshold — the pack weight is on the line. The warden calls for a secondary manual weight check with a handheld scale. The delay is twenty minutes.');
              if (typeof addHeat === 'function') addHeat('soreheim', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The highland verge is wide enough to go around the scale platform.',
          skill: 'finesse', tag: 'bold',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 16) {
              if (typeof addNarration === 'function') addNarration('', 'The verge on the highland side of the scale is wide and the ground is firm. The scale platform does not extend to the verge edge — there is a meter gap between the platform and the drop. You move through it while the wardens are occupied with a cart manifest discrepancy.');
              if (typeof gainXp === 'function') gainXp(25);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The verge gap is real but a fourth warden is positioned there. The quota inspection point is always accompanied by a verge watcher — it is standard protocol. He signals the platform wardens before you clear the gap.');
              if (typeof addHeat === 'function') addHeat('soreheim', 3);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  // Route 7: guildheart_hub|mimolot_academy
  window.ROUTE_COMPLICATIONS['guildheart_hub|mimolot_academy'] = {
    checkpoint: {
      title: 'Academy Boundary Check',
      text: 'Two Academy wardens at the Mimolot end of the plains road — lighter uniforms than Guild wardens, no tabard mark, but each carries a small sealed directory of authorized cargo categories. They are checking for book-tax compliance: texts above a weight threshold require Academy import authorization stamped on the outside of the binding. Blue wax on a cargo seal identifies Academy-authorized materials from inside the boundary.',
      choices: [
        {
          text: 'No Academy-sealed cargo. Standard transit.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The warden checks your pack for blue wax and for text weight — a brief visual and a press on the pack sides. Nothing sealed, nothing above the threshold. She stamps the boundary entry log and directs you through.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The warden\'s press on the pack sides finds the density pattern of bound text. She asks to open the pack. Personal notes at non-taxable weight — but the process of demonstrating this takes twenty minutes.');
              if (typeof addHeat === 'function') addHeat('mimolot', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The texts are personal notes, not taxable books. The distinction is testable.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The warden knows the distinction — taxable books are bound, titled, intended for distribution. Personal notes are unbound or titled only by hand. She checks the classification, finds your materials on the correct side of the line, and stamps the entry.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The distinction is real but the warden applies the weight threshold regardless of classification for anything that looks like a book. Your materials look like books. She opens the secondary directory.');
              if (typeof addHeat === 'function') addHeat('mimolot', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Academy Road Patrol',
      text: 'A single Academy warden on foot on the quiet plains road — the traffic here is light enough that a solo patrol covers it adequately. He moves slowly, checking packs by smell as much as by sight: Academy blue wax has a distinctive cold-resin scent that lingers even through cloth. He is stopping travelers with packs of a certain shape and weight.',
      choices: [
        {
          text: 'Open your pack. Nothing sealed, nothing taxable.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The warden looks and smells — no blue wax, no cold-resin scent, nothing at text-weight threshold. He closes the pack and moves on to the traveler behind you. The check takes ninety seconds.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The warden detects something — not blue wax, but a wax adjacent scent from a food-storage seal. He is not certain it is not Academy wax. The secondary check goes into his log.');
              if (typeof addHeat === 'function') addHeat('mimolot', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'He is checking for blue wax scent, not for what it seals.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The warden\'s check is scent-primary. Nothing in your pack uses cold-resin wax — you are clear before he reaches hand-check distance. Naming the process correctly makes him more efficient, not suspicious. He passes you and moves on.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'Naming his process makes him more deliberate, not faster. He takes the pack through a full hand-check to demonstrate thoroughness. The check is clean but the extra ten minutes are yours to absorb.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Mimolot Road Night',
      text: 'The Mimolot Academy boundary closes at full dark — the gate seals and the boundary warden goes inside. The plains road itself has no night curfew, but travelers who arrive after the boundary closes must wait at a waystation operated by the Academy. The waystation has a travel-purpose declaration requirement before it issues a bunk assignment. The declaration form is specific: ten categories, one of which must be checked.',
      choices: [
        {
          text: 'Declare transit purpose. Personal travel is a valid category.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Category seven on the declaration form: personal transit, non-Academy, through-destination. The waystation warden checks the box and issues a bunk assignment. No secondary questions for category seven. The bunk is narrow but clean.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The declaration form has been updated and category seven has been split into two sub-categories. You check the wrong one. The warden asks you to redo the form. The second attempt is correct, but the delay goes into the overnight log.');
              if (typeof addHeat === 'function') addHeat('mimolot', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The Academy boundary night gate has one check: unauthorized Academy property.',
          skill: 'finesse', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The boundary gate is locked but not watched after dark. The warden\'s single check — is anything Academy-sealed moving out — does not apply to inbound personal travelers. The gate has a traveler-side release for emergency access. It is not locked from your side.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The traveler-side release was replaced last season with a warden-key lock following a breach. The gate does not open from your side. The waystation is where you are going after all.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Book Weight Inspection',
      text: 'An Academy inspector has set up a portable weight station on the plains road — a hanging scale and an authorization directory, checking texts against import records. She is targeting travelers with bound materials: anything that reads as a book by weight and format goes on the scale, then against the directory. The directory is three years old. Three travelers ahead of you have been stopped and two released.',
      choices: [
        {
          text: 'What you\'re carrying does not meet the taxable threshold.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The scale confirms sub-threshold weight. The inspector checks the directory anyway — nothing matching your materials. She marks the inspection record with a clear note and waves you through. The directory is old but the threshold weight is current.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The scale reads borderline. The inspector checks the directory for your material type and finds an old entry that may or may not apply. She logs it as unresolved pending clarification from the boundary office.');
              if (typeof addHeat === 'function') addHeat('mimolot', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The authorization directory has been reclassified since that edition. Name the category.',
          skill: 'charm', tag: 'bold',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 16) {
              if (typeof addNarration === 'function') addNarration('', 'The reclassification moved your material type from the restricted column to the personal-import column two years ago. The inspector does not have the updated directory. She writes the category name you cited into her inspection log and applies the current standard. You pass.');
              if (typeof gainXp === 'function') gainXp(25);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The reclassification exists but you cited the wrong category name. The inspector checks her old directory, finds the name you cited is not in it, and concludes the reclassification is unverified. The inspection holds until the boundary office can confirm.');
              if (typeof addHeat === 'function') addHeat('mimolot', 3);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  // Route 8: soreheim_proper|sunspire_haven
  window.ROUTE_COMPLICATIONS['soreheim_proper|sunspire_haven'] = {
    checkpoint: {
      title: 'Highland Allocation Post',
      text: 'A Giant Council allocation post at the highland road marker — a stone booth built to Giant proportion, staffed by a single Quota Authority warden at a human-scale desk inside. Quota hours are posted on the door: they run on Giant Council time, which is currently two hours ahead of solar noon. The warden is in the middle of a quota calculation and will not look up until he finishes.',
      choices: [
        {
          text: 'Declare your pack weight at the post. Quota hours are in effect.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The warden finishes his calculation and turns to the entry log. Pack weight, transit category, destination. Non-extraction personal travel goes in the short column. He stamps the transit card and returns to his calculation without comment.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The warden is at the end of a quota hour — the log is about to close. Your arrival catches him at the transition and the entry goes into the new hour\'s log, which requires a fresh declaration form. The delay is procedural but costs fifteen minutes.');
              if (typeof addHeat === 'function') addHeat('soreheim', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'Quota hours here run on Giant Council time, not sun time. I know the difference.',
          skill: 'wits', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The current Giant Council hour is the third allocation period, which maps to transit category three on the declaration form — the category with the shortest log process. Knowing this lets you fill the form correctly the first time. The warden notices and stamps without follow-up.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'Giant Council time and solar time diverge by more than you thought at this altitude. The period you cited has already closed. The warden corrects you and moves your entry to the current period, which has a longer declaration requirement.');
              if (typeof addHeat === 'function') addHeat('soreheim', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Quota Altitude Patrol',
      text: 'Two Quota Authority wardens at altitude — above eight hundred meters, the cold is functional cold. Their breath is visible and so is yours. Both wardens are in extended-cold gear: heavier tabards with the yellow stamps still readable, insulated boots. They are checking extraction figures against quota marker posts, comparing the carved numbers on the posts against figures in a ledger. The road is narrow here.',
      choices: [
        {
          text: 'Non-extraction traveler. Nothing to weigh.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'One warden checks your transit card while the other continues the marker post comparison. Non-extraction transit card is correct for this road. He stamps the altitude-section entry and steps back. The cold makes everything faster — no one lingers.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The warden asks for your pack weight anyway — altitude section protocol requires weight verification even for non-extraction travelers due to the supply cache rules in effect above eight hundred meters. The secondary check adds an entry to the altitude log.');
              if (typeof addHeat === 'function') addHeat('soreheim', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The highland track to the east is not on their marker route.',
          skill: 'finesse', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The eastern track branches off before the patrol\'s marker zone. The wardens are working the main road markers in sequence — they do not cover side tracks during a standard circuit. The eastern track is rougher but it rejoins the main road past the patrol position.');
              if (typeof gainXp === 'function') gainXp(15);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The eastern track is visible from the patrol\'s position on the road. One warden watches you take it and makes a note. Side-track transit is not prohibited but it is logged when seen. The note goes into the altitude ledger.');
              if (typeof addHeat === 'function') addHeat('soreheim', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Altitude Night Camp',
      text: 'Quota posts close at Giant Council dusk — which at this latitude and altitude in summer falls two hours before local sunset. The mandatory camp notice is posted on a marker post: a stone plaque with the Giant Council dusk hour and the location of the nearest approved camp site. The camp site is a cleared flat section of highland with a wind-break wall, three hundred meters off the main road.',
      choices: [
        {
          text: 'Make camp at the posted rest area. Cold is manageable with the right approach.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The wind-break wall cuts the worst of the highland cold. The flat ground is solid, no root systems. Two other travelers are already at the site. Nobody talks. The Giant Council dusk notice was right about the wind direction. The camp holds through the night.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The wind-break wall has a gap on the north face that the posted map does not show. The gap funnels cold through the camp site for most of the night. The rest is adequate but not restorative.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The highland cold has a pattern. The wind shifts after the second hour.',
          skill: 'spirit', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('spirit') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The wind shifts at the second hour, predictably, from the northwest to the east. Moving at the shift means moving in the calm window between the two directions. You cover two kilometers before the east wind establishes. Camp at the next natural shelter point with the wind at your back.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The wind shift comes later than the pattern suggested — the highland weather has its own variation. The east wind catches you in the open. The cold is functional: it slows movement and drains warmth faster than it should.');
              G.fatigue = (G.fatigue || 0) + 2;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Quota Reconciliation Point',
      text: 'A full extraction weight reconciliation on the highland road — every traveler weighed, every cart logged against the current quota cycle. The equipment is Giant-scaled: the main platform can weigh a fully loaded extraction cart in one pass. Personal travelers register as essentially nothing on the main platform, but the reconciliation protocol requires a secondary handheld scale for anything below the minimum registration threshold.',
      choices: [
        {
          text: 'Queue at the reconciliation post. Personal goods are a known exemption category.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The handheld scale check for personal travelers takes four minutes. The warden marks the exemption category in the reconciliation log, notes the weight in the sub-threshold column, and releases you. The main platform queue is still moving behind you.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The handheld scale reads slightly above the sub-threshold line. The warden is not sure whether to log you as personal-goods or low-extraction. The uncertainty gets referred to the senior warden, whose queue is longer.');
              if (typeof addHeat === 'function') addHeat('soreheim', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'Personal travelers can move through the unmeasured lane at the road edge.',
          skill: 'finesse', tag: 'bold',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 16) {
              if (typeof addNarration === 'function') addNarration('', 'The unmeasured lane exists for exactly this reason: the reconciliation equipment cannot process sub-threshold weights and the protocol acknowledges it. The lane is not marked but it is real. You move through while a warden is occupied recalibrating the handheld scale.');
              if (typeof gainXp === 'function') gainXp(25);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The lane is real but it is not unsupervised — a junior warden is stationed there to redirect travelers to the handheld scale. The reconciliation protocol closes the gap that the equipment cannot cover.');
              if (typeof addHeat === 'function') addHeat('soreheim', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  // Route 9: panim_haven|shirshal
  window.ROUTE_COMPLICATIONS['panim_haven|shirshal'] = {
    checkpoint: {
      title: 'Contested Jurisdiction Post',
      text: 'A checkpoint post on the coastal road with no clear authority marking — the sign has been changed twice and currently shows both a Panim Haven emblem and a Shirshal district mark, one painted over the other imperfectly. The warden on duty is working from a manifest form that was printed by Panim authority. He is standing in what is technically Shirshal territory. The sound of the sea covers the approach from both directions.',
      choices: [
        {
          text: 'Give enough information that the jurisdictional question resolves itself.',
          skill: 'charm', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Name, departure point, destination — all the information the Panim form requires. The warden fills in the columns without having to decide which jurisdiction to apply. The form is complete, the stamp is Panim, the road is open. Neither of you raises the sign problem.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The warden asks which jurisdiction you expect to apply. It is the wrong question for him to ask and he knows it. The delay while he figures out what form to use costs half an hour. The entry ends up in both logs.');
              if (typeof addHeat === 'function') addHeat('panim', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'She has Panim authority but this is Shirshal territory. I know which rules she can enforce.',
          skill: 'wits', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Panim authority on Shirshal ground can process departures but cannot log arrivals — the log jurisdiction follows the destination, not the departure. The warden understands the distinction and is quietly relieved someone else has figured it out. The departure log only. You continue.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The jurisdictional argument is correct but the warden does not have authority to act on it unilaterally. She calls it in — which means waiting for a response from whoever is on the other end of the coastal message line. The wait is forty minutes.');
              if (typeof addHeat === 'function') addHeat('shirsh', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Competing Coastal Patrols',
      text: 'A Panim patrol and a Shirshal patrol have met on the coastal road at a point neither expected the other to reach. They are standing three meters apart having a conversation about whose sector this stretch belongs to. Both patrols have manifest boards. Neither is checking travelers right now. A carter has already driven past while both patrols were occupied with each other.',
      choices: [
        {
          text: 'Walk past while they are talking to each other.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The jurisdictional discussion is loud enough that neither patrol is watching the road. You pass at walking pace without either group acknowledging you. The sound of the sea fills the gap their conversation leaves.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'One member of the Shirshal patrol notices you and uses the interruption as a reason to redirect the discussion toward who should be processing travelers. Both patrols now want to check your papers.');
              if (typeof addHeat === 'function') addHeat('shirsh', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The coastal path below the road cuts this section entirely.',
          skill: 'finesse', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The coastal path is three meters below the road edge, accessible by a cut in the cliff face. The two patrols cannot see the path from where they are standing. You move through the coastal section below their sightline and rejoin the road past their position.');
              if (typeof gainXp === 'function') gainXp(15);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The cut down to the coastal path is visible from the road edge and the Panim patrol has a member watching the cliff face specifically. The maneuver is spotted before you reach the path.');
              if (typeof addHeat === 'function') addHeat('panim', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Coastal Road Night',
      text: 'No authority presence on the coastal road after dark — neither Panim nor Shirshal patrols this section at night, a fact that is documented in both patrol logs as a known gap. The sound of the sea makes it impossible to hear approach from either direction. No waystation at the contested boundary. The road surface is identifiable by the absence of sound — the sea noise stops where the cliff overhang begins.',
      choices: [
        {
          text: 'Camp above the tide line. The road is yours until first light.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Above the tide line, the coastal ground is firm and the cliff provides a windbreak. No patrols, no other travelers. The sea noise is constant but manageable. First light comes with the cliff face brightening before the road does.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The tide line is higher than it appeared in the dark. The camp site floods two hours before dawn. You move to higher ground and lose the rest of the night to repositioning.');
              G.fatigue = (G.fatigue || 0) + 2;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'Moving after dark means no checkpoints, but the coastal path is tide-dependent.',
          skill: 'finesse', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Low tide. The coastal path below the road is fully passable — two meters of dry rock between the cliff face and the water line. No patrols, no checkpoints, no noise except the sea. You cover three kilometers before the tide turns.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The tide is higher than the path\'s passable threshold. The dry section is narrower than a meter in places. You retreat to the road before the path closes entirely, having covered less distance than staying on the road would have given you.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Jurisdictional Document Review',
      text: 'Both a Panim and a Shirshal warden are present at the same point on the road — not a patrol meeting this time, but a scheduled joint document review. They are cross-checking manifests against each other\'s records, looking for travelers who have been logged by one authority but not the other. The process is methodical and slow. Four travelers ahead of you are in the review queue.',
      choices: [
        {
          text: 'Your papers satisfy both sets of requirements.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Both wardens check your papers against their respective records. The Panim log has you, the Shirshal log has you, the cross-check finds no gap. Both wardens stamp the review record independently and release you. The process takes eight minutes.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The Shirshal log does not have you — the contested checkpoint earlier logged you only in the Panim column. The joint review finds the gap. Neither warden can resolve it without escalation. You wait while they figure out who has authority to close the record.');
              if (typeof addHeat === 'function') addHeat('shirsh', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'I know which authority has precedent on this section. Say it before they ask.',
          skill: 'charm', tag: 'bold',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 16) {
              if (typeof addNarration === 'function') addNarration('', 'Precedent on this section belongs to Shirshal by the coastal demarcation agreement, which means the Shirshal warden\'s log is the primary record. Naming this before they ask short-circuits the cross-check: the Shirshal warden takes the lead, finds your entry, and closes the review. The Panim warden does not argue.');
              if (typeof gainXp === 'function') gainXp(25);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The precedent argument is correct in principle but the demarcation agreement has an exception for this specific kilometer marker. Both wardens know it. The exception puts you back into joint review. Raising the argument made the process longer, not shorter.');
              if (typeof addHeat === 'function') addHeat('panim', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  // Route 10: shirshal|ithtananalor
  window.ROUTE_COMPLICATIONS['shirshal|ithtananalor'] = {
    checkpoint: {
      title: 'Last Maintained Post',
      text: 'The last Shirshal post before the maintained road ends — a stone waystation, half its windows boarded. A single warden is on duty, logging departures into an unmaintained-route register. The register is a different format than the standard manifest: date, departure time, destination notation, solo or group. The warden has a posted advisory on the desk: the unmaintained section is recommended for groups of three or more.',
      choices: [
        {
          text: 'Declare your destination. The warden logs you as entered on the unmaintained route.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The register entry is straightforward — date, time, destination, solo. The warden stamps it and adds the standard advisory notation. His tone carries no judgment about the solo classification, but he marks the expected return estimate column with a question mark.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The warden asks for an expected return estimate, which the unmaintained route register requires for solo travelers. You give one. He logs it but adds a note that the estimate is traveler-declared, not warden-verified.');
              if (typeof addHeat === 'function') addHeat('shirsh', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The warden recommends against going alone. I\'m going anyway.',
          skill: 'vigor', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The warden notes the solo departure in the advisory column and adds a personal note that you were informed of the group recommendation. Then he logs you and steps aside. The advisory is not a prohibition. You are in the register and you are moving.');
              if (typeof gainXp === 'function') gainXp(15);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The warden decides the solo departure requires a secondary authorization form — a recent policy change that the advisory board has not been updated to reflect. The form takes twenty minutes to complete and adds a formal risk-acknowledgment entry to the register.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Wildlife Interference',
      text: 'A pair of territorial ground birds — dark feathers, wingspan wider than two outstretched arms — have nested in the road verge thirty meters ahead. The nesting pair is using the road margin as a boundary marker, and one bird is standing in the road itself. The road surface here is original stone, partly lifted by root systems; the verge on the north side of the road is thin but the canopy on that side is lower.',
      choices: [
        {
          text: 'Give the nesting area wide berth. The birds don\'t pursue past their territory edge.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The southern side of the road curves away from the nest zone. The wider berth adds two hundred meters but keeps you below the territory threshold. The standing bird watches you leave without moving from the road stone.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The wide berth is not wide enough — the nest territory extends further south than the bird\'s road position suggested. The second bird lifts off from the verge grass before you clear the zone. You move through the alarm response without injury but not without noise.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The north canopy is thin enough for a narrow path around the nest zone.',
          skill: 'finesse', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The path through the north canopy edge is narrow but the birds do not nest on that side of the road. The low branches require crouching but the ground is firm. You emerge on the far side of the nest zone with both birds still focused on the road stone.');
              if (typeof gainXp === 'function') gainXp(15);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The north canopy path is thinner than the tree line suggested — the branches push you back toward the road edge and into the nest zone perimeter. The bird on the road lifts. The alarm call is loud in the unmaintained section.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Forest Road After Dark',
      text: 'No landmarks visible past five meters. The road surface is identifiable by feel — the original stone is higher than the surrounding earth. Something is moving in the forest parallel to the road: not predatory movement, but not random either. It has been following the same pace as you for a sustained period. The unmaintained road has no warden posts. No one knows you are here except the register entry at the last Shirshal post.',
      choices: [
        {
          text: 'Stop and make camp on the stone road surface, away from the root verge.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The stone surface holds its heat from the day. The forest movement stops when you stop — whatever it was, it was tracking motion, not presence. First light comes slowly; the canopy keeps the dawn grey for an hour before it brightens to green.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The stone is harder than expected and the root verge is closer to the road center than the daylight suggested. The camp holds but the forest movement resumes after an hour of silence. You do not sleep deeply.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'Something is moving parallel to the road. It has been doing so for half an hour.',
          skill: 'spirit', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('spirit') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The movement pattern is not territorial — it is methodical, surface-following. Something is tracking the stone road as a navigation aid, not tracking you. Stopping and letting it pass reveals a large nocturnal grazer moving along its own route. It does not acknowledge you.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The movement stops when you engage with it directly. The silence is worse than the movement. Whatever it is, the pattern has changed and you cannot read the new one.');
              G.fatigue = (G.fatigue || 0) + 1;
              if (typeof modHP === 'function') modHP(-2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Road Surface Collapse',
      text: 'A section of original stone has dropped into a root cavity — the void was forming for years under the lifted road surface and finally gave way. The gap is two meters wide and a meter and a half deep. On the far side, the stone road continues intact. The root cavity walls are solid. The detour around the gap goes through the forest and adds two hours to the transit; a traveler\'s marker stick has been placed at the detour entry.',
      choices: [
        {
          text: 'Take the detour. The root cavity is not crossable without risk.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The detour track is marked by previous travelers — broken branches and compressed ground. Two hours of forest walking brings you back to the stone road on the far side of the gap. The root cavity is visible from the road edge where you rejoin. It is deeper than it looked from the other side.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The detour track loses itself in the forest after the first kilometer. The marker sticks stop. You navigate by general direction and rejoin the road at a different point than intended, adding an extra hour to the already extended detour.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The stone edges of the gap are solid. A running start and the right angle clears it.',
          skill: 'might', tag: 'bold',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('might') : { total: 10 };
            if (r.total >= 16) {
              if (typeof addNarration === 'function') addNarration('', 'The stone edges hold. The angle is correct. The landing on the far side is on solid road surface, not on the gap edge. You are across in three seconds. The detour track marker stick is still visible behind you on the other side.');
              if (typeof gainXp === 'function') gainXp(25);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The angle is slightly off. You clear the gap but land on the edge, not the flat surface. The edge holds but the landing jars. The detour would have been two hours. This cost only ten minutes, but not without physical consequence.');
              if (typeof modHP === 'function') modHP(-3);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  // Route 11: mimolot_academy|ithtananalor
  window.ROUTE_COMPLICATIONS['mimolot_academy|ithtananalor'] = {
    checkpoint: {
      title: 'Academy Exit Seal Check',
      text: 'The Academy boundary checkpoint on the outbound side — a single warden at a seal verification station, checking all outbound cargo for Academy seals or unsealed Academy materials. Personal transit is a known category: the warden checks for blue wax, checks the weight against the taxable threshold, and logs the departure. The checkpoint is quiet; most traffic on this road moves inbound.',
      choices: [
        {
          text: 'Nothing Academy-sealed. Personal transit declaration.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The warden checks for blue wax — visual and then by press, feeling for the wax-depth of an Academy seal. Nothing found. She logs the departure as personal transit, non-Academy, and stamps the boundary exit record. Clean departure.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The press-check finds something that reads like wax but is not blue wax — a food storage seal that the warden cannot immediately classify. She asks to open the relevant pocket. The classification takes ten minutes and ends with a non-Academy notation.');
              if (typeof addHeat === 'function') addHeat('mimolot', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The book has an Academy binding but was bought at a non-Academy market.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Secondary-market Academy materials are a known category — binding does not equal seal. The warden checks the book for an Academy colophon and import stamp. Neither present. Secondary-market classification confirmed. The departure log records it correctly and you are through.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The Academy binding is enough for the warden to treat the book as Academy property until proven otherwise. Proving otherwise requires a secondary check against the Academy purchasing records. That check is not available at the boundary checkpoint.');
              if (typeof addHeat === 'function') addHeat('mimolot', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Forest Warden Pair',
      text: 'Ithtananalor forest wardens on the Academy road section — a pair, moving on a fixed circuit with a rope between them as per forest-road protocol. They are checking for Academy cargo moved without forest transit authorization: the forest authority has its own registration for materials crossing from Academy boundary into the forest section. The pair moves on an eighteen-minute circuit.',
      choices: [
        {
          text: 'Open declaration. No Academy cargo.',
          skill: 'charm', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Both wardens do a brief visual check — no blue wax visible, pack shape does not suggest Academy cargo format. One warden asks for the Academy boundary exit stamp. You have it. Forest transit authorization is confirmed. They continue their circuit.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The forest wardens want both the Academy exit stamp and a separate forest transit registration, which is a second form that the Academy boundary checkpoint did not provide. The gap between the two authorities\' requirements is your problem.');
              if (typeof addHeat === 'function') addHeat('union', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The forest warden pair moves on an eighteen-minute circuit. I know the timing gap.',
          skill: 'finesse', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The eighteen-minute circuit has a twelve-minute gap at the far end of the route where both wardens are out of sightline of this section. The timing is exact — you move through the gap and are past the patrol zone before the circuit brings them back around.');
              if (typeof gainXp === 'function') gainXp(15);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The circuit timing has changed — the pair is running a fourteen-minute loop today, not eighteen. The gap is shorter than expected. The road warden is back in sightline before you clear the patrol zone.');
              if (typeof addHeat === 'function') addHeat('union', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Forest Road Night, Academy Section',
      text: 'The Academy boundary closes at full dark. The forest beyond has no authority presence after dark. The road between them — a two-kilometer section — is in a gray zone: outside Academy authority, inside forest territory but without forest patrol. Travelers caught here after dark are in an unresolved jurisdictional position that neither authority will act on but both will log.',
      choices: [
        {
          text: 'Stay inside the Academy boundary perimeter until first light. The gray zone has consequences.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The boundary perimeter waystation is inside the Academy fence line. The overnight log is open. The bunk assignment is standard. The gray zone is someone else\'s problem for tonight and both authorities\' problem in the morning.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The waystation has a mandatory declaration form for overnight guests that the boundary warden is enforcing strictly tonight. The form asks for your transit purpose in the Academy zone — which you technically do not have for an inbound overnight stay.');
              if (typeof addHeat === 'function') addHeat('mimolot', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The gray zone is legally unresolved. Move through it at speed.',
          skill: 'vigor', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Two kilometers at night, on a road that is maintained on one end and unmaintained on the other. The transition between the surfaces is identifiable by sound — the packed stone gives way to earth and root at the forest boundary. You are through the gray zone in thirty minutes.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The forest boundary in the dark is identifiable by the road surface change but the unmaintained section on the far side is not safe to navigate without light. You stop in the gray zone itself — the worst of the three options.');
              G.fatigue = (G.fatigue || 0) + 2;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Academy Cargo Inspection',
      text: 'An Academy inspector on the forest section of the road — a spot-check, not a scheduled inspection. She has a blue wax detection kit: a small brass instrument that registers the cold-resin compound used in Academy seals. Every traveler on the road is being stopped. She is working through packs systematically: visual first, instrument second for anything that shows a seal of any type.',
      choices: [
        {
          text: 'Academy-smell check: nothing sealed, nothing waxed.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The visual check finds no seals. The instrument check confirms no cold-resin compound. The inspector marks your transit record as clear and moves to the next traveler. The spot-check format is efficient — she does not linger on negatives.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The instrument registers a trace reading near the pack bottom — not a current seal, but residue from previous contents. The inspector asks what was stored there before. The answer determines whether the residue requires a full secondary check.');
              if (typeof addHeat === 'function') addHeat('mimolot', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'No blue wax. Demonstrate this clearly and move.',
          skill: 'charm', tag: 'bold',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 16) {
              if (typeof addNarration === 'function') addNarration('', 'Opening the pack completely and presenting the contents for visual inspection before she begins her instrument check saves four minutes per traveler. The inspector acknowledges the efficiency — no instrument check required when the visual is conclusive. She marks you clear and you move before the next traveler has been processed.');
              if (typeof gainXp === 'function') gainXp(25);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The inspector does not accept self-presented inspections — the protocol requires her to conduct the check, not receive the results of yours. The instrument check proceeds at her pace regardless.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  // Route 12: amber_fountain_inn|fairhaven
  window.ROUTE_COMPLICATIONS['amber_fountain_inn|fairhaven'] = {
    checkpoint: {
      title: 'River Guild Pilot Check',
      text: 'A floating post on the river — a flat-bottomed barge with a River Guild mark and a desk on the upper deck. A Guild agent is checking pilot authorization for all vessels entering the lower stretch. The lower stretch has submerged root systems and variable channel depth; River Guild pilot authorization is required for commercial vessels and recommended for personal craft above a certain draft.',
      choices: [
        {
          text: 'Charter includes pilot authorization. Standard check.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The Guild agent checks the charter authorization against the lower-stretch pilot registry, finds your authorization current, and stamps the transit record. The floating post rocks gently while he works. The channel ahead is visible and clear from this position.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The pilot authorization is current but the charter number format has been updated this season. The old format is still accepted but requires a manual cross-reference against a secondary registry on the floating post. The cross-reference takes twenty minutes.');
              if (typeof addHeat === 'function') addHeat('union', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'River Guild pilot authorization is waived for personal travel on vessels under this draft.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The draft threshold for waiver is eight centimeters. Your vessel sits at six. The Guild agent measures the waterline, confirms the waiver applies, and logs you under the personal-transit exemption. No pilot authorization required. He adds a channel advisory for the root system section.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The draft threshold you cited is for the upper stretch, not the lower. The lower stretch threshold is different and your vessel does not qualify for the waiver. The Guild agent is polite but the pilot authorization requirement stands.');
              if (typeof addHeat === 'function') addHeat('union', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'River Traffic Warden',
      text: 'A River traffic warden on a shallow-draft patrol boat, moving upstream at a pace that suggests regular circuit work. She carries a manifest board across the gunwale and a stamp kit on her belt. She is flagging vessels for manifest compliance checks — not all vessels, but a systematic sample. Her patrol boat is slower than it looks in moving water.',
      choices: [
        {
          text: 'Manifest open. Everything declared.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The warden pulls alongside, checks the manifest against the board, stamps the river transit record, and falls back. The check takes four minutes. The patrol boat is already pulling toward the next vessel in the sample before you have stowed the manifest.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'One line item on the manifest uses a cargo category that the warden\'s board lists under a different classification. The discrepancy is minor but she logs it. The stamp goes on but with a secondary notation.');
              if (typeof addHeat === 'function') addHeat('union', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'Personal-goods exemption applies to vessels under three passengers. I qualify.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The three-passenger threshold for the personal-goods exemption is real and in effect on this stretch. The warden checks the passenger count — one — confirms the exemption category, and stamps the transit record with the exemption notation. No manifest check required.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The exemption exists but requires a personal-transit declaration form filed at the departure point. You did not file one at Amber Fountain Inn. Without the form, the exemption cannot be applied retroactively on the water. The manifest check proceeds.');
              if (typeof addHeat === 'function') addHeat('union', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'River After Dark',
      text: 'River navigation after dark requires a river lantern authorization — a specific lighting standard that distinguishes an authorized vessel from debris in the channel. The authorization is issued at departure points and marked on the transit record. Without it, any vessel moving at night is subject to immediate stop-and-board by river wardens. The submerged root systems are not marked at night; the channel line shifts between seasons.',
      choices: [
        {
          text: 'Tie off at the river post and wait for first light.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The river post is a stone bollard with a ring. Tying off takes two minutes. The current pulls gently at the vessel through the night but the tie holds. First light comes with the river mist and the channel line is visible by the second hour of morning.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The post ring is fouled with old rope and the tie is not as secure as it should be. The vessel drifts two meters in the night but does not pull free. The drift means repositioning at first light, which adds an hour to the departure.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The root system patterns are predictable on this stretch. The channel line is known.',
          skill: 'wits', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The root system on this stretch follows the eastern bank consistently. The channel line runs two meters off the western bank at all water levels. Moving at dead slow speed with a pole for depth confirmation keeps the vessel in clear water. You reach the Fairhaven approach before the river wardens\' morning circuit.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The channel line has shifted since last season. The root system on the eastern bank has expanded into the previous center channel. The vessel grounds on a submerged root at low speed — no damage, but the extraction takes two hours and the river wardens are involved before the end of it.');
              if (typeof modHP === 'function') modHP(-1);
              if (typeof addHeat === 'function') addHeat('union', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Fairhaven Harbor Ledger Check',
      text: 'The river master at Fairhaven harbor is running a manifest cross-check against the harbor ledger before allowing vessels to dock. The ledger is three days behind — a known lag in the harbor administration — which means vessels that departed after the last ledger update are not in the record and cannot be verified against it. Three vessels are ahead of you in the docking queue.',
      choices: [
        {
          text: 'Your manifest matches your charter. The ledger lag is the river master\'s problem.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The river master checks your manifest against the charter, finds them matching, and applies the ledger-lag override process: a manual entry into the current-day log that acknowledges the three-day gap. Standard procedure for recent departures. You are docked.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The ledger-lag override process requires a secondary endorsement from the harbor authority supervisor, who is not currently at the dock. The river master keeps you in the docking queue while he sends for her.');
              if (typeof addHeat === 'function') addHeat('union', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'I know which harbor official can authorize a ledger override. Name them.',
          skill: 'charm', tag: 'bold',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 16) {
              if (typeof addNarration === 'function') addNarration('', 'The harbor authority supervisor has a deputy with override authority for the ledger-lag process when the supervisor is unavailable. Naming the deputy — and knowing that the override authority was delegated last season — gets you to the front of the authorization queue. You are docked before the third vessel in the original queue has been processed.');
              if (typeof gainXp === 'function') gainXp(25);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The deputy you named was reassigned two months ago. The river master knows the name but not as the current override authority. The misinformation is noted and you return to the standard docking queue.');
              if (typeof addHeat === 'function') addHeat('union', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  // Route 13: cosmoria|brineland
  window.ROUTE_COMPLICATIONS['cosmoria|brineland'] = {
    checkpoint: {
      title: 'Brineland Port Arrival',
      text: 'The Brineland port authority inspection process is thorough by design: weight first, open second, sample third. Wardens in dark green tabards work the arrival dock in teams of two. A posted schedule on the harbor wall shows inspection windows — the current window is standard, not elevated. Three vessels are docked ahead of you and being processed simultaneously.',
      choices: [
        {
          text: 'Manifest first. Declare before the weight scale.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Manifest before scale reads as prepared. The warden accepts the declared weight, runs the scale check, finds it within tolerance, and moves to the open-and-sample step. Nothing unusual in the sample. The inspection record is clean and the dock authorization is issued.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The manifest weight and the scale weight diverge outside tolerance. Not significantly, but enough for the warden to request the secondary weight check. The secondary check confirms the scale; your manifest figure was slightly off. The discrepancy goes in the inspection record.');
              if (typeof addHeat === 'function') addHeat('cosmouth', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The Brineland port authority has a cargo-description shortcut for established trade goods.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The established-goods shortcut is a real provision — category seven of the Brineland inspection protocol — for cargo with a prior inspection record at this port. Your manifest cites the correct category and the warden confirms the prior record exists. Weight-and-sample only, no open step.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The established-goods provision requires three prior inspection records at Brineland specifically. You have records from Cosmouth but not Brineland. The provision does not transfer between ports. Standard full inspection proceeds.');
              if (typeof addHeat === 'function') addHeat('cosmouth', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Sea Lane Traffic Check',
      text: 'A Brineland harbor patrol vessel moving the sea lane approach — a low-profile craft with a green pennant, faster than its hull shape suggests. The patrol is doing manifest checks in open water: flagging vessels, pulling alongside, checking papers before the port arrival inspection. It is a pre-screening operation, not a replacement for the dock inspection. The sea lane narrows where the coastal rock formation begins.',
      choices: [
        {
          text: 'Heave to and present manifest. Standard sea-lane protocol.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The patrol vessel pulls alongside. The warden checks the manifest against the pre-screen list, stamps a transit code onto the upper corner, and falls back. The transit code at the dock inspection will shorten the process. Heaving to was the right calculation.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The manifest is in order but the pre-screen warden wants a departure authorization stamp from Cosmouth that the Cosmoria departure process does not issue. The gap between what she expects and what the Cosmoria process provides takes fifteen minutes to resolve.');
              if (typeof addHeat === 'function') addHeat('cosmouth', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The sea lane narrows ahead. The patrol vessel is slower than it looks at speed.',
          skill: 'finesse', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The narrow section between the coastal rocks requires precise navigation that the patrol vessel cannot match at speed. You thread the narrows while the patrol waits for a gap in the cross-current. By the time they have cleared it, you are past the pre-screen zone and approaching the dock queue.');
              if (typeof gainXp === 'function') gainXp(15);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The patrol vessel has the narrows memorized and uses the eastern passage rather than the main lane. They are alongside before you have cleared the rocks. Attempting to evade a harbor patrol in their own approach lane adds a note to the dock inspection record that was not there before.');
              if (typeof addHeat === 'function') addHeat('cosmouth', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'East Wind Warning',
      text: 'The east wind is rising. A harbor pilot\'s advisory buoy is visible — a lit float with a signal flag indicating wind speed and a posted passage status. The flag shows amber: wind approaching threshold, passage not yet closed, thirty-minute estimate to closure. The Cosmoria-Brineland passage closes when the east wind exceeds the threshold; the closure is enforced by the Brineland harbor authority.',
      choices: [
        {
          text: 'Heave to at the buoy and wait out the window.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Heaving to at the buoy is the recommended action on amber. Two other vessels are already anchored nearby. The east wind peaks and drops in three hours — not unusual for this passage. The flag shifts to green before the harbor authority issues a formal closure.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The wind peaks faster than the thirty-minute estimate. The harbor authority issues a closure while you are anchored at the buoy. The closure holds for six hours. The wait at anchor is cold and the sea state makes rest impossible.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'East wind windows have a pattern. This one is short. Crossing now is the edge of the window.',
          skill: 'spirit', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('spirit') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The east wind pattern on this passage follows the pressure gradient from the northern shelf — short windows close in under four hours and the amber flag was posted at the beginning of the decline, not the rise. Crossing now means crossing during the drop. The Brineland approach is rough but passable. You dock ahead of the other vessels at the buoy.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The window is longer than the pattern suggested. The east wind holds at threshold for five hours rather than dropping. The crossing is feasible but punishing — every meter of progress costs more than it should. You arrive at Brineland depleted and the dock inspection proceeds without allowance for the passage conditions.');
              G.fatigue = (G.fatigue || 0) + 2;
              if (typeof modHP === 'function') modHP(-2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Storm Window Closure',
      text: 'The east wind has crossed the threshold. The Brineland harbor authority has issued a formal passage closure — all traffic ordered to heave to. A harbor authority vessel is enforcing the closure: flagging vessels, confirming heave-to compliance, logging vessels that attempt to continue. The main passage is closed. To the north, behind the coastal rock formation, there is a lee channel that stays navigable past the main closure window.',
      choices: [
        {
          text: 'Heave to and comply. The closure is real and the harbor authority knows it.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The harbor authority vessel logs your heave-to compliance and issues a transit hold number. When the closure lifts, the transit hold number determines the docking queue order. You are number four. The closure lifts after four hours. The dock inspection proceeds without complications from the closure.');
              G.fatigue = (G.fatigue || 0) + 1;
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The heave-to position is in an exposed section of water. The sea state during the closure is worse than at the buoy. The vessel holds but the four hours in the exposed section are not restful.');
              G.fatigue = (G.fatigue || 0) + 2;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        {
          text: 'The lee channel on the north side stays open two hours past the main closure.',
          skill: 'might', tag: 'bold',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('might') : { total: 10 };
            if (r.total >= 16) {
              if (typeof addNarration === 'function') addNarration('', 'The lee channel requires threading between coastal rocks — gaps of three to four meters, wind-shadow on the northern faces, cross-currents at each gap entry. Physical work: pole and oar, not sail, for most of the channel length. You clear the last gap as the harbor authority vessel begins its second sweep of the main passage. Brineland dock is five minutes ahead.');
              if (typeof gainXp === 'function') gainXp(25);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The lee channel is navigable but the third gap is tighter than the chart suggested. The vessel grounds briefly on a submerged rock ledge. The extraction is manual and damages the hull below the waterline enough to require attention at Brineland before the vessel can continue. The harbor authority logs the lee channel use and the damage.');
              if (typeof modHP === 'function') modHP(-3);
              if (typeof addHeat === 'function') addHeat('cosmouth', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  // Route: cosmoria|panim_haven (coastal, boat-only)
  window.ROUTE_COMPLICATIONS['cosmoria|panim_haven'] = {
    complications: [
      {
        id: 'cosmoria_panim_squall',
        label: 'Coastal Squall',
        description: 'A squall pushes the vessel off course. The captain holds the shipping lane but loses half a day tacking back.',
        dc: 11,
        skill: 'vigor',
        successResult: 'You help reef the sails. The squall passes without further delay.',
        failResult: 'The crossing takes an extra day. You arrive weathered and short on sleep.',
        tags: ['Weather', 'Travel']
      },
      {
        id: 'cosmoria_panim_patrol',
        label: 'Panim Harbor Patrol',
        description: 'A Panim Haven customs cutter intercepts the vessel to check manifests before the harbor approach.',
        dc: 10,
        skill: 'charm',
        successResult: 'Your papers pass inspection. The cutter waves you through.',
        failResult: 'Your papers are held for secondary review. The delay costs you a day in the harbor queue.',
        tags: ['Social', 'Faction']
      },
      {
        id: 'cosmoria_panim_merchant',
        label: 'Merchant Gossip',
        description: 'A merchant aboard shares route intelligence about Panim Haven\'s current trade situation.',
        dc: 9,
        skill: 'wits',
        successResult: 'The merchant\'s information is specific and useful — which factors are buying, which are not.',
        failResult: 'The merchant\'s information is outdated. You note it but don\'t count on it.',
        tags: ['Intelligence', 'Travel']
      }
    ]
  };

  // Route: ashforge_citadel|ashwake_port
  window.ROUTE_COMPLICATIONS['ashforge_citadel|ashwake_port'] = {
    checkpoint: {
      title: 'Psanan Authority Post',
      text: 'A painted post at the road edge with a Psanan authority marker — brass numerals, a declarant\'s window built into a low stone wall. The attendant behind the window has a cargo declaration ledger open. The coastal road requires declaration at both Ashforge and Ashwake. This is the first.',
      choices: [
        {
          text: 'Declare cargo and transit reason. Standard.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Declaration accepted. The attendant stamps the ledger, tears a receipt strip, and passes it through the window. You will need it at the Ashwake end. The post arm lifts.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The declaration form has a category mismatch — the attendant circles it and asks you to refile. The correction takes time. The receipt is issued but flagged.');
              if (typeof addHeat === 'function') addHeat('shelk', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        },
        {
          text: 'Name a cargo broker who handles coastal declarations. Shortcut the paperwork.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The broker name is recognized. The attendant pulls a pre-stamped authorization form from a side drawer — the broker has standing accounts at this post. The declaration files in thirty seconds.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The broker name is on a dispute list. The attendant notes it and asks for the full declaration anyway, plus the broker authorization number. You do not have it. Secondary review.');
              if (typeof addHeat === 'function') addHeat('shelk', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        }
      ]
    },
    patrol: {
      title: 'Coastal Road Patrol',
      text: 'Two authority riders on the coast road, moving south. They are wearing Psanan insignia — grey-and-yellow, not the grey-and-white of Shelk authority. One has a saddlebag that is too full for a standard patrol shift. They pull up when they reach you.',
      choices: [
        {
          text: 'Show the declaration receipt from the last post.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The receipt is current and stamped correctly. The rider checks the date, checks your face, hands it back. The other rider has stopped watching. They continue south.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The receipt format is from two seasons ago — the authority post updated its forms. The rider notes the discrepancy, issues a correction slip, and records the stop. The encounter is procedural, not hostile, but it is recorded.');
              if (typeof addHeat === 'function') addHeat('shelk', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        },
        {
          text: 'The patrol is carrying something it does not want noted. Use that.',
          skill: 'finesse', tag: 'bold',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 16) {
              if (typeof addNarration === 'function') addNarration('', 'The overfull saddlebag is a leverage point neither rider wants examined. The lead rider waves you through without asking for the receipt at all. The transaction is mutual and unspoken.');
              if (typeof gainXp === 'function') gainXp(25);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The rider sees what you are doing before you finish doing it. The saddlebag comment lands wrong. He dismounts. This takes considerably longer than showing the receipt would have.');
              if (typeof addHeat === 'function') addHeat('shelk', 3);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        }
      ]
    },
    night: {
      title: 'After Dark on the Coastal Road',
      text: 'The coastal road has posted overnight restrictions between the two authority zones — no freight movement, personal travel at own risk. The sea is audible. The road is not lit. A shore-side fire a hundred meters ahead is either a permitted camp or it is not.',
      choices: [
        {
          text: 'Make camp at the marked traveler ground, not the fire.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The traveler ground is a flat strip of gravel with a fire ring and a windbreak of stacked stone. No fire tonight — the sea wind kills the spark. You sleep in the cold, but the morning patrol passes without comment.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The traveler ground is occupied. Another party has taken both fire rings. You sleep on the verge and wake stiff and cold.');
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        },
        {
          text: 'Walk toward the shore fire. Shared warmth is worth the risk.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The fire belongs to a cargo broker\'s shore party, waiting on a delayed vessel. They have food and news. You sleep better than you would have at the traveler ground and learn that the Ashwake declaration desk opens an hour later than posted.');
              if (typeof gainXp === 'function') gainXp(20);
              G.fatigue = Math.max(0, (G.fatigue || 0) - 2);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The fire belongs to an authority night post that is not marked on the road guide. The watch officer takes your name and transit reason and adds it to a log you cannot read. You are not detained, but you are noted.');
              if (typeof addHeat === 'function') addHeat('shelk', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        }
      ]
    },
    hazard: {
      title: 'Coastal Road Obstruction',
      text: 'A section of the coastal road has been blocked — a freight cart has come off the verge and is half-blocking the carriageway. The driver is arguing with a Psanan post attendant about whose jurisdiction covers the clearing costs. The road is passable on foot by stepping past the cart wheel, but cargo and horses cannot get through until the argument resolves.',
      choices: [
        {
          text: 'Wait it out. The argument will end.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Twenty minutes. The attendant wins — the driver agrees to pay the road clearance fee. The cart is righted and the road opens. You lose the time but nothing else.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The argument escalates to a secondary review, which requires a second attendant who is not at the post. The wait is over an hour. The fatigue adds up.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        },
        {
          text: 'Cut through the terrain above the road. The rise is manageable.',
          skill: 'might', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('might') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The coastal rise is loose shale but climbable. You pick a line above the blocked section and rejoin the road forty meters past the cart. The attendant watches but does not call out — jurisdiction is genuinely unclear and calling out means paperwork.');
              if (typeof gainXp === 'function') gainXp(15);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The shale gives halfway up. You catch yourself on a brush root but the scramble is visible from the road. The attendant marks you in his log as taking unauthorized road bypass — a minor infraction, but filed.');
              if (typeof addHeat === 'function') addHeat('shelk', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        }
      ]
    }
  };

  // Route: glasswake_commune|shelkopolis
  window.ROUTE_COMPLICATIONS['glasswake_commune|shelkopolis'] = {
    checkpoint: {
      title: 'Border Zone Transit Desk',
      text: 'A low timber building at the highland–plains boundary. Two desks visible through the window, each flying a different authority seal — Sheresh on the left, Shelk on the right. Neither desk acknowledges the other. Each requires its own form. A posted notice says the order does not matter, but both must be completed before proceeding.',
      choices: [
        {
          text: 'Complete both forms in sequence. Sheresh first, Shelk second.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Both desks stamp both forms. The Sheresh clerk does not look at the Shelk stamp. The Shelk clerk does not look at the Sheresh stamp. The door to the southbound road opens.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The Shelk form requires a transit origin that the Sheresh form left blank. The clerk sends you back to the Sheresh desk. The Sheresh clerk requires a counter-signature from the Shelk desk to reopen the form. This takes a while.');
              if (typeof addHeat === 'function') addHeat('sheresh', 1);
              if (typeof addHeat === 'function') addHeat('shelk', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        },
        {
          text: 'A border zone this contested has people who know how to move through it quietly.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The Sheresh clerk has been here long enough to have a workaround. A single consolidated form, known to both desks, that satisfies both requirements in one filing. He fills it in himself. You are through in ten minutes.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The consolidated form gambit requires the Shelk clerk\'s cooperation, which is not forthcoming today. The Shelk clerk files a non-compliance note. You complete both standard forms and leave with a flag on your transit record.');
              if (typeof addHeat === 'function') addHeat('shelk', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        }
      ]
    },
    patrol: {
      title: 'Dual-Authority Patrol Zone',
      text: 'A Shelk road patrol and a Sheresh perimeter patrol are both working this section of the highland road — on the same stretch, traveling the same direction, fifty meters apart. Neither is speaking to the other. You are between them.',
      choices: [
        {
          text: 'Keep pace with the gap. Stay equidistant from both patrols.',
          skill: 'finesse', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Neither patrol stops you. Staying in the gap means neither has clear jurisdictional claim on the stop. You walk through the zone and emerge on the plains side with nothing filed against you.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The Shelk patrol drops back and closes the gap before you can clear the zone. The lead warden asks for transit papers. The Sheresh patrol keeps moving and is out of sight before the check is done.');
              if (typeof addHeat === 'function') addHeat('shelk', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        },
        {
          text: 'Join the Sheresh patrol briefly. Harder to stop a moving group.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'A brief explanation of your transit direction is enough for the Sheresh patrol leader to allow the attachment. The Shelk wardens watch but do not stop a group moving in Sheresh company. You peel off at the boundary marker.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The Sheresh patrol leader does not want the complication. She waves you off. The Shelk patrol has been watching the exchange and considers it suspicious enough to stop you when you separate.');
              if (typeof addHeat === 'function') addHeat('shelk', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        }
      ]
    },
    night: {
      title: 'Highland Road After Dark',
      text: 'The highland stretch of this route has no authorized overnight camps — both authority zones claim it, so neither maintains rest infrastructure here. The road is cold, the wind is lateral, and the next posted camp is on the Shelkopolis side of the boundary, which requires completing the transit forms first.',
      choices: [
        {
          text: 'Push through to the posted camp on the Shelk side.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The transit desk is closed for the night but the camp is on the open side of the barrier — accessible before the forms are filed. You find a berth. The cold eases. The desk opens at first light.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The camp is full. The night warden points you to a windbreak shelf cut into the hillside — technically outside camp. The rest is inadequate and the cold is thorough.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        },
        {
          text: 'The highland has natural shelter if you know what to look for.',
          skill: 'wits', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'A leeward rock shelf thirty meters off the road, high enough to block the wind, low enough to retain heat. You spend the night there. No patrol passes. The border zone infrastructure gap works in your favor for once.');
              if (typeof gainXp === 'function') gainXp(20);
              G.fatigue = Math.max(0, (G.fatigue || 0) - 2);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The shelter you find is exposed on one side and the wind shifts after midnight. You sleep in intervals. The morning arrives before you are ready for it.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        }
      ]
    },
    hazard: {
      title: 'Border Zone Paperwork Freeze',
      text: 'The transit building is closed — a notice in the window says both desks are in a jurisdictional review that will not clear until the following morning. No transit papers can be issued or validated. The road is technically impassable for documented travelers until the desks reopen.',
      choices: [
        {
          text: 'Wait at the transit building until morning.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The bench outside the transit building is cold but covered. You sleep against the wall in your pack. The desks open two hours after first light. Both clerks pretend the delay did not happen. Your papers are stamped without comment.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The bench fills up. Six travelers are waiting when the desks open and the clerks process them in the order they arrived. You are fifth. The wait adds another three hours to your day.');
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        },
        {
          text: 'The jurisdictional review means neither authority is watching the road. Move now.',
          skill: 'finesse', tag: 'bold',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 16) {
              if (typeof addNarration === 'function') addNarration('', 'The road is genuinely unwatched. Both clerks are in the review room. You are through the zone in twenty minutes and on the Shelkopolis side before either desk reopens. No record of transit — which means no record of you.');
              if (typeof gainXp === 'function') gainXp(25);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'One clerk stepped out for air and sees you moving through the unmonitored zone. The review is paused. Your unauthorized transit goes into both authority logs simultaneously — a rare double-filing.');
              if (typeof addHeat === 'function') addHeat('shelk', 2);
              if (typeof addHeat === 'function') addHeat('sheresh', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        }
      ]
    }
  };

  // Route: eternal_lands|soreheim_proper
  window.ROUTE_COMPLICATIONS['eternal_lands|soreheim_proper'] = {
    checkpoint: {
      title: 'Soreheim Convoy Registration',
      text: 'The Soreheim sea approach requires convoy registration — solo vessels are logged and assigned a convoy slot before departure. The registration post floats on a moored platform at the deep water boundary, staffed by two Soreheim quota officers. The next convoy departs in a fixed window. Being late for registration means waiting for the next one.',
      choices: [
        {
          text: 'Register with the quota officers. Full manifest and vessel details.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'Registration complete. The officer assigns a convoy position — third behind the lead extraction vessel. The convoy flag is a red pennant. You depart in the next window.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The manifest has a cargo category the officers cannot process without a senior sign-off. The senior officer is on the second platform. The delay pushes you to the following convoy window.');
              if (typeof addHeat === 'function') addHeat('soreheim', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        },
        {
          text: 'The convoy system has exemptions. Cite the one that applies here.',
          skill: 'charm', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('charm') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'Independent transit authorization — valid for vessels carrying less than quota-threshold cargo. The officer checks, confirms, and issues a solo transit permit. You depart on your own schedule instead of the convoy\'s.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The exemption category you cite was suspended two seasons ago when independent transit was reclassified. The officer notes the attempted citation and assigns your vessel to mandatory convoy escort — which means waiting.');
              if (typeof addHeat === 'function') addHeat('soreheim', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        }
      ]
    },
    patrol: {
      title: 'Extraction Convoy Escort',
      text: 'An extraction vessel coming the opposite direction — outbound from Soreheim, low in the water with loaded holds. A quota officer on its deck is monitoring the sea lane. Solo vessels on this route are logged each time they pass a convoy moving the other way. The officer has a scope and is noting your vessel.',
      choices: [
        {
          text: 'Display the convoy registration flag. Standard identification.',
          skill: 'wits', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The red pennant is visible before the officer raises the scope. He checks it, notes the convoy number, and logs you as authorized inbound. The extraction vessel passes without signaling a stop.');
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The pennant is obscured by rigging at the moment the officer is looking. He signals a vessel identification request. The exchange takes ten minutes of close approach and flag exchange before clearance is given.');
              if (typeof addHeat === 'function') addHeat('soreheim', 1);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        },
        {
          text: 'The sea lane is wide. Change course to put distance between the vessels.',
          skill: 'finesse', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('finesse') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'A natural course adjustment — wind shift, not evasion. The distance you gain means the officer cannot note your vessel numbers clearly. The log entry reads "inbound solo vessel, unresolved" — which is not the same as flagged.');
              if (typeof gainXp === 'function') gainXp(15);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The course change reads as evasion at the range the officer is watching. He radios ahead to the Soreheim approach post. You are flagged for enhanced registration when you arrive.');
              if (typeof addHeat === 'function') addHeat('soreheim', 2);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        }
      ]
    },
    night: {
      title: 'Sea Crossing After Dark',
      text: 'The Eternal Lands to Soreheim passage is long enough that most transits cross at least one night. Convoy vessels travel with running lights only — no anchor stops on open water. The exposed sea crossing in darkness requires constant watch.',
      choices: [
        {
          text: 'Take the watch rotation. Maintain convoy pace through the night.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The night passage is uneventful. The convoy running lights stay steady. You take two watch periods and sleep between them. The crossing is monotonous in the way only open water at night can be — completely uniform, no reference points.');
              G.fatigue = Math.max(0, (G.fatigue || 0) - 1);
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The watch rotation goes wrong — someone misses a period and you cover it. By morning you have worked two full watch periods without a sleep interval. The crossing is done but fatigue is compounding.');
              G.fatigue = (G.fatigue || 0) + 2;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        },
        {
          text: 'Run lights-out between convoy waypoints. Faster and harder to track.',
          skill: 'spirit', tag: 'bold',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('spirit') : { total: 10 };
            if (r.total >= 16) {
              if (typeof addNarration === 'function') addNarration('', 'The lights-out run shaves hours off the crossing. The sea reads differently without the running light bleeding into your night vision. You arrive at Soreheim approach two hours ahead of the convoy. The registration desk is open and uncrowded.');
              if (typeof gainXp === 'function') gainXp(25);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'Running lights-out on a convoy route means the convoy loses track of your position. When you arrive at Soreheim, you are logged as a missing vessel for twelve hours. The paperwork required to resolve a missing-vessel log is substantial.');
              if (typeof addHeat === 'function') addHeat('soreheim', 3);
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        }
      ]
    },
    hazard: {
      title: 'Exposed Sea Conditions',
      text: 'The open water between Eternal Lands and Soreheim has no natural shelter. A weather system is moving in from the west — not a full storm, but enough to make the passage rough for the next several hours. The convoy is pressing through rather than holding position. The decision is whether to stay with the convoy or reduce speed and wait for the system to pass.',
      choices: [
        {
          text: 'Stay with the convoy. Maintaining position is the safer call.',
          skill: 'vigor', tag: 'safe',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('vigor') : { total: 10 };
            if (r.total >= 7) {
              if (typeof addNarration === 'function') addNarration('', 'The weather system is rough but not dangerous. Three hours of roll and spray. The convoy maintains pace. You arrive at Soreheim damp, fatigued, and on schedule. The quota post is not particularly sympathetic but the arrival is logged correctly.');
              G.fatigue = (G.fatigue || 0) + 1;
              if (typeof gainXp === 'function') gainXp(10);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'Maintaining convoy pace in the weather costs more than expected. A fitting on the vessel gives way under the strain and requires emergency securing. The convoy continues; you fall behind and arrive outside the expected window. The quota post logs the arrival gap.');
              if (typeof modHP === 'function') modHP(-2);
              G.fatigue = (G.fatigue || 0) + 2;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        },
        {
          text: 'Drop convoy pace and wait for the system to clear.',
          skill: 'wits', tag: 'risky',
          action: function() {
            var r = typeof rollD20 === 'function' ? rollD20('wits') : { total: 10 };
            if (r.total >= 13) {
              if (typeof addNarration === 'function') addNarration('', 'The system passes in ninety minutes. You resume speed and arrive at Soreheim three hours behind the convoy, but the quota post accepts the weather delay as a valid variance. The vessel is undamaged. The difference in arrival condition is visible to the post officer.');
              if (typeof gainXp === 'function') gainXp(20);
            } else {
              if (typeof addNarration === 'function') addNarration('', 'The system does not pass in the time you allocated. You wait four hours, arrive well outside the convoy window, and the quota post requires a detailed explanation of the variance. The weather log from the day does not match your arrival gap cleanly.');
              if (typeof addHeat === 'function') addHeat('soreheim', 1);
              G.fatigue = (G.fatigue || 0) + 1;
            }
            setTimeout(function() { if (typeof window._travelNextEncounter === 'function') window._travelNextEncounter(); else TRAVEL_CORRIDOR.advanceDayLeg(); }, 400);
          }
        }
      ]
    }
  };

  // ── 7 Fairhaven spoke routes added in Round 3 ──

  window.ROUTE_COMPLICATIONS['ithtananalor|fairhaven'] = {
    checkpoint: {
      title: 'Guild Transit Gate — Forest Road West',
      text: 'The guild transit gate at the forest road junction is unmanned — but the barrier arm is down and the logbook on the post is open to today\'s date. Someone will come back to check entries. Or they will not.',
      choices: [
        { text: 'Log the entry yourself and raise the arm.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'The entry is plausible. The arm raises on its counterweight. No one comes back before you are past sight of the post.'); gainXp(10); }
            else { addNarration('', 'The handwriting is close but not close enough. The guild archivist who reviews this log will notice the discrepancy in the entry sequence.'); addHeat('union', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Wait at the barrier. Someone will return.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'The warden returns in forty minutes. She checks the log, checks you, stamps your transit card without comment. The arm goes up.'); gainXp(15); }
            else { addNarration('', 'The warden is accompanied by a colleague. The second warden is the one who asks questions. Her questions are specific.'); addHeat('union', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Ithtananalor Forest Warden Pair',
      text: 'Two forest wardens — not guild, Ithtananalor local authority — moving east on the same road. They work in pairs here and they are watching the tree line as much as the road. The one nearest the road edge glances at you and does not look away.',
      choices: [
        { text: 'Name the road you came from and where you are going. Specific answers disarm suspicion.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'Specific answers land correctly. The warden notes something in a pocket log and nods. Her partner has already moved on.'); gainXp(10); }
            else { addNarration('', 'The answer is too specific in the wrong way — the road junction you named doesn\'t match the usual westbound route. She asks a second question.'); addHeat('shirsh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Step off the path into the tree margin before they reach you.', skill: 'finesse', tag: 'risky',
          action: function() {
            var r = rollD20('finesse');
            if (r.total >= 13) { addNarration('', 'The tree margin is deep enough. They pass. The one watching the tree line looks directly at where you are standing and sees nothing worth stopping for.'); gainXp(20); }
            else { addNarration('', 'Movement in the trees is exactly what the tree-line watcher is trained for. She signals her partner without raising her voice.'); addHeat('shirsh', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Forest Road After Dark',
      text: 'The forest road west does not have posted night rules — there is no authority here that maintains them. What there is: the road is narrower in the dark, the canopy overhead kills the moon, and something has been moving parallel to you in the tree margin for the last quarter mile.',
      choices: [
        { text: 'Build a fire at the roadside and wait for dawn.', skill: 'vigor', tag: 'safe',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 7) { addNarration('', 'The fire works. Whatever was moving stops. The road at dawn is quiet and you are rested enough to continue.'); gainXp(10); }
            else { addNarration('', 'The fire draws a different kind of attention — a traveler coming the other way, moving fast, who asks too many questions before continuing east.'); addHeat('shirsh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Keep moving. Whatever is in the trees has not stepped onto the road yet.', skill: 'finesse', tag: 'risky',
          action: function() {
            var r = rollD20('finesse');
            if (r.total >= 13) { addNarration('', 'The parallel movement stops after another half mile. The road widens as the forest thins. The plains boundary is ahead.'); gainXp(20); }
            else { addNarration('', 'The parallel movement stops — and something steps onto the road ahead of you instead of beside you.'); addHeat('shirsh', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Washed-Out Forest Road Section',
      text: 'The road surface has failed over a stretch of roughly sixty meters — storm runoff has taken the compacted base with it and left loose aggregate over a soft underlayer. Cart passage is risky. Even foot travel requires care. There is no way around.',
      choices: [
        { text: 'Test the surface carefully before committing weight.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Testing the edge first tells you where the firm substrate is. The crossing takes time but nothing gives way.'); gainXp(10); }
            else { addNarration('', 'The test was not thorough enough. The surface holds for the first thirty meters and fails on the last ten. Wet boots, a turned ankle, a lost hour.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Move fast across the worst section. Speed is better than weight.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'The surface moves under you but you are across before it can decide what to do about it.'); gainXp(20); }
            else { addNarration('', 'Fast is not right here. The surface gives at the midpoint. The recovery costs time and gear.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  window.ROUTE_COMPLICATIONS['mimolot_academy|fairhaven'] = {
    checkpoint: {
      title: 'Academy Cargo Inspection Post',
      text: 'The inspection post at the academy road junction is staffed by a Mimolot security officer, not a guild warden. She checks the cargo manifest against a sealed Academy register. The process is thorough and the officer has been doing it long enough that small discrepancies register as clearly as large ones.',
      choices: [
        { text: 'Present the transit papers before she asks for them.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'The papers are in order. She checks the Academy seal, checks the date stamp, hands them back. The barrier arm goes up.'); gainXp(10); }
            else { addNarration('', 'The papers are in order but the departure time listed conflicts with the road distance. She flags it for review.'); addHeat('mimolot', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Name the transit administrator who approved the route.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'The name is correct and she knows it. The verification that would otherwise take ten minutes takes two. The arm goes up.'); gainXp(20); }
            else { addNarration('', 'The name is correct but she asks which office processes that administrator\'s approvals. The answer is not in the papers.'); addHeat('mimolot', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Plains Road Guild Patrol',
      text: 'A mounted guild patrol working the plains road — two riders, grey transit cloaks, moving at standard inspection pace. One is checking the road surface. The other is checking travelers. The traveler-checker has already assessed your pack size.',
      choices: [
        { text: 'Keep moving at even pace. Nothing to indicate otherwise.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'The pack assessment does not turn into a stop. The patrol continues its pattern. You continue yours.'); gainXp(10); }
            else { addNarration('', 'The patrol circles back. The traveler-checker asks where you\'re going and what your business is on the Academy road.'); addHeat('union', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Produce the transit papers before the patrol reaches you.', skill: 'wits', tag: 'risky',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 13) { addNarration('', 'Producing papers preemptively reads as compliance. The patrol reviews them at pace without stopping.'); gainXp(15); }
            else { addNarration('', 'Producing papers preemptively reads as anxiety. The patrol stops to conduct a full inspection.'); addHeat('union', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Plains Road Night Curfew',
      text: 'The Mimolot plains road carries a posted night curfew for non-cargo transit — sunset to dawn, non-emergency passage requires a night permit. The checkpoint post ahead has its lamp lit, which means the overnight warden is on duty.',
      choices: [
        { text: 'Produce the transit papers and claim urgent Academy business.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'Academy business is a recognized category. The warden checks the seal and waves you through with a note for the morning log.'); gainXp(10); }
            else { addNarration('', 'The warden checks the seal and it is correct, but the request for an urgent-transit endorsement note goes poorly. He writes the stop in the log.'); addHeat('union', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Leave the road before the checkpoint and rejoin it after.', skill: 'finesse', tag: 'risky',
          action: function() {
            var r = rollD20('finesse');
            if (r.total >= 13) { addNarration('', 'The verge is flat enough to navigate by starlight. The checkpoint lamp is behind you before the warden\'s eyes adjust to the dark.'); gainXp(20); }
            else { addNarration('', 'The verge is flat but the checkpoint warden has a lantern on a post that covers the standard deviation distance. She sees the movement.'); addHeat('union', 3); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Dust Storm on the Plains Road',
      text: 'A dust front moving from the west — visible for twenty minutes, now here. The visibility on the plains road drops to ten meters in the heavier gusts. There is no shelter on the road itself. The route markers are posts every half mile, but the next one is not visible.',
      choices: [
        { text: 'Stop and wait the storm out with your back to the wind.', skill: 'vigor', tag: 'safe',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 7) { addNarration('', 'The storm passes in an hour. The dust settles unevenly — thicker on the eastern side, thinner on the road surface itself. You continue.'); gainXp(10); }
            else { addNarration('', 'The wait costs more than an hour. The dust has settled into your kit and the road surface is altered enough that the next stretch is slow.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Navigate by the wind direction alone. West to east. Keep moving.', skill: 'wits', tag: 'risky',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 13) { addNarration('', 'The wind is consistent and so is the road surface under your feet. You arrive at the next route marker without having stopped.'); gainXp(20); }
            else { addNarration('', 'The wind shifts twice. The road does not. You leave the road surface without realizing it and spend thirty minutes reorienting.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  window.ROUTE_COMPLICATIONS['panim_haven|fairhaven'] = {
    checkpoint: {
      title: 'Contested Patrol Zone Boundary Post',
      text: 'The boundary post between Panim Haven authority and the neutral coastal stretch is staffed by two wardens — one from each jurisdiction. They are not cooperating on the manifest check. They are each conducting a separate check. You will need to satisfy both.',
      choices: [
        { text: 'Address the Panim warden first. The originating jurisdiction takes precedence.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Addressing the Panim warden first is the correct protocol. The second warden accepts the Panim clearance and adds his own stamp. Both arms go up.'); gainXp(10); }
            else { addNarration('', 'The Panim warden is satisfied but the second warden has a different question set. She asks about cargo weight and the answer is approximate, not exact.'); addHeat('panim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Present the papers to both simultaneously. Efficiency as compliance.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'Both wardens accept the simultaneous presentation as confidence. The clearance is faster than standard. You are through in four minutes.'); gainXp(20); }
            else { addNarration('', 'The wardens have a protocol dispute about which clearance is primary. You are held at the post for twenty minutes while they resolve it between themselves.'); addHeat('panim', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Coastal Road Patrol — Panim Haven Authority',
      text: 'A Panim Haven authority patrol on the coastal road — foot patrol, three wardens, moving north at standard pace. The lead warden has stopped to check the last traveler passed. You will be the next traveler she checks.',
      choices: [
        { text: 'Join the queue behind the current traveler being checked. Orderly.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'The queue approach signals compliance. Your check is faster than the previous traveler\'s — her warden is warmed up and the papers are routine.'); gainXp(10); }
            else { addNarration('', 'The previous traveler\'s check reveals something irregular. The warden\'s attention level is elevated by the time she reaches you.'); addHeat('panim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Turn onto the beach access path before reaching the check point.', skill: 'finesse', tag: 'risky',
          action: function() {
            var r = rollD20('finesse');
            if (r.total >= 13) { addNarration('', 'The beach access path is not the road and the patrol is working the road. You rejoin the coastal road two hundred meters north of the checkpoint.'); gainXp(20); }
            else { addNarration('', 'One of the three wardens is watching the beach access path. It is the third warden, not the lead, which is worse.'); addHeat('panim', 3); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Coastal Road After Curfew — Panim Haven',
      text: 'The coastal road carries a posted curfew that Panim Haven authority enforces — the night warden at the marker post is one of three stationed at intervals along this stretch. The nearest lamp is visible ahead.',
      choices: [
        { text: 'Approach the post and report travel delay — weather, road condition, route error.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'The warden accepts the delay explanation and marks it in the log. Night-transit approval is noted as situational. You continue.'); gainXp(10); }
            else { addNarration('', 'The warden accepts the explanation but asks for a specific route confirmation. The route you name has a checkpoint record that would show your timing.'); addHeat('panim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Use the beach margin. Below the road edge, below the lamp radius.', skill: 'finesse', tag: 'risky',
          action: function() {
            var r = rollD20('finesse');
            if (r.total >= 13) { addNarration('', 'The beach margin is below the lamp radius and the warden is watching the road, not the tide line. The post is behind you.'); gainXp(20); }
            else { addNarration('', 'The tide line is higher than the visible mark from the road. The margin is narrower than calculated.'); addHeat('panim', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Coastal Flooding on the Northern Stretch',
      text: 'The coastal road north of the boundary post has taken tidal flooding — a stretch of eighty meters is under twenty centimeters of water with soft sand underneath. The water is receding but not quickly. Waiting means losing a tide window on the other end.',
      choices: [
        { text: 'Find the highest edge of the road and move carefully across the flooded section.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'The highest road edge holds firm. The crossing is wet but nothing gives way under the water.'); gainXp(10); }
            else { addNarration('', 'The apparent high edge is not the actual high edge. The soft section is on the right side, not the left.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Move quickly and accept the wet kit. The delay of waiting is worse.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'Quick movement keeps you in the shallower water. The kit is wet but functional. You are past the flooded section in three minutes.'); gainXp(15); }
            else { addNarration('', 'Quick movement finds the soft section before the firm section. Recovery costs time and a boot.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  window.ROUTE_COMPLICATIONS['shirshal|fairhaven'] = {
    checkpoint: {
      title: 'Shirshal Transit Boundary Post',
      text: 'The road north from Shirshal crosses a jurisdiction boundary two days out from the city. The post is marked with both Shirshal authority colors and Principalities grey. The warden on duty is Principalities — she checks Shirshal-origin manifests against a different register than she uses for local transit.',
      choices: [
        { text: 'Declare Shirshal origin and present the full transit record.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Full declaration matches the cross-reference register. The warden stamps the transit card with the boundary clearance mark. Straightforward.'); gainXp(10); }
            else { addNarration('', 'The Shirshal origin declaration triggers a secondary check for the item classification list. One item in your kit is on the list.'); addHeat('shirsh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Omit the Shirshal origin and declare the boundary post as origin point.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'The boundary post as origin is not common but not implausible. The warden accepts it without the secondary check. You continue.'); gainXp(20); }
            else { addNarration('', 'The boundary post origin does not match the road wear on your kit. The warden knows what a two-day road journey looks like.'); addHeat('shirsh', 2); addHeat('union', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Jurisdiction Boundary Patrol',
      text: 'A joint patrol — one Shirshal authority warden and one Principalities warden riding together. The combination is uncommon. It means someone upstream has flagged the route for elevated scrutiny. They are moving south, checking travelers moving north.',
      choices: [
        { text: 'Answer the Principalities warden first. Her jurisdiction is where you are going.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'The Principalities warden takes the lead and is satisfied quickly. The Shirshal warden adds one question and accepts your answer. Joint patrol clears you.'); gainXp(10); }
            else { addNarration('', 'The Principalities warden is satisfied but the Shirshal warden has a different question — about your activities in Shirshal, specifically.'); addHeat('shirsh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Step off the road onto the coastal verge as if checking your pack.', skill: 'finesse', tag: 'risky',
          action: function() {
            var r = rollD20('finesse');
            if (r.total >= 13) { addNarration('', 'The pack-check reads as traveler behavior, not avoidance. The patrol passes. You rejoin the road.'); gainXp(20); }
            else { addNarration('', 'The Shirshal warden specifically watches travelers who step off the road before being checked. That is the behavior he was briefed on.'); addHeat('shirsh', 3); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Night Road North of the Jurisdiction Line',
      text: 'The road north of the jurisdiction boundary does not carry a formal night curfew — but the patrol pattern on this stretch runs through the night because the joint agreement requires it. A patrol lamp is visible a quarter mile ahead, moving south.',
      choices: [
        { text: 'Wait off-road for the patrol to pass before continuing.', skill: 'vigor', tag: 'safe',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 7) { addNarration('', 'The patrol passes within forty meters of where you are waiting. The lamp does not sweep the road margin. You continue when the light is far enough south.'); gainXp(10); }
            else { addNarration('', 'The wait is correct but the patrol interval is shorter than standard. A second lamp appears before you have moved far enough north.'); addHeat('shirsh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Flag the patrol and declare night travel. Easier than avoiding it.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'The patrol logs the night transit declaration and issues a temporary clearance. Legal, documented, done.'); gainXp(15); }
            else { addNarration('', 'The declaration triggers the Shirshal warden\'s interest in why you are moving at night on this specific road.'); addHeat('shirsh', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Road Surface Failure Near the Coast',
      text: 'Coastal erosion has taken the eastern edge of the road over a stretch of forty meters. What remains is a one-meter-wide firm strip with a two-meter drop to the beach on the right. The strip is solid but narrow. Wind from the sea is consistent.',
      choices: [
        { text: 'Move along the left edge, away from the drop. Slower but controlled.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Left edge is correct. The road surface is firm there and you have enough margin to move safely through the full stretch.'); gainXp(10); }
            else { addNarration('', 'Left edge is soft in the middle section where a second failure point has not yet opened fully. The surface dips under your weight.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Move quickly across the narrow section. Less time on the unstable ground.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'Speed across the narrow section keeps you on the firm surface. You are past the erosion damage in thirty seconds.'); gainXp(20); }
            else { addNarration('', 'Speed works against you when the wind gusts. The movement is fine; the wind is not.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  window.ROUTE_COMPLICATIONS['soreheim_proper|fairhaven'] = {
    checkpoint: {
      title: 'Multi-Jurisdiction Mountain Transit Gate',
      text: 'The mountain transit gate on the long Soreheim-to-Fairhaven road sits at the first territorial boundary — a full two weeks\' walk from Soreheim. The post is staffed by a quota authority warden who checks extraction manifests against a transit ledger. Non-extraction travelers are checked separately.',
      choices: [
        { text: 'Declare non-extraction status immediately. The separate process is faster.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Non-extraction transit is a narrow but recognized category. The warden uses a shorter form. The gate opens in ten minutes.'); gainXp(10); }
            else { addNarration('', 'Non-extraction declaration requires a purpose statement. The warden asks what business takes a traveler on the direct mountain road to Fairhaven.'); addHeat('soreheim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Use the guild transit seal to bypass the quota authority process.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'The guild seal correctly overrides the quota authority process for non-extraction transit. The warden is not happy about it but the protocol is clear.'); gainXp(20); }
            else { addNarration('', 'The quota authority warden checks with her supervisor before accepting the guild seal override. The supervisor takes fifteen minutes to arrive.'); addHeat('soreheim', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Soreheim Mountain Road Extraction Patrol',
      text: 'An extraction monitoring patrol — checking that cargo moving on the mountain road matches filed extraction outputs. They are thorough and they have time. The patrol leader asks every non-extraction traveler the same three questions.',
      choices: [
        { text: 'Answer the three standard questions before they are asked. Road preparation.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Pre-answering the standard questions signals familiarity with Soreheim transit procedure. The patrol leader marks the log quickly and moves on.'); gainXp(15); }
            else { addNarration('', 'Anticipating the questions reads as rehearsal. The patrol leader adds a fourth question that is not standard.'); addHeat('soreheim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'State the transit purpose plainly. Specific detail deflects further questioning.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'Specific purpose and destination detail satisfies the patrol leader\'s threshold. She does not ask the third standard question.'); gainXp(20); }
            else { addNarration('', 'The specific destination triggers a cross-reference check — there is a travel advisory for the route you named that you were not aware of.'); addHeat('soreheim', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Mountain Road — Cold Night at Altitude',
      text: 'The high mountain section of this route drops temperature significantly after dark. The road is safe but exposure is a risk for travelers without mountain kit. A Soreheim extraction crew camp is visible at the next switchback — firelight, tents, a cook fire.',
      choices: [
        { text: 'Request temporary shelter at the extraction crew camp.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'Extraction crew camps regularly take in transit travelers. The crew leader assigns you a fire position and charges nothing. By morning the temperature has dropped another six degrees outside.'); gainXp(10); }
            else { addNarration('', 'The crew leader accepts the shelter request but asks which quota authority issued your non-extraction transit clearance. The answer is in the papers but the papers are in your pack.'); addHeat('soreheim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Continue past the camp and find natural shelter in the rock formations above the switchback.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'The rock formation provides good windbreak. The temperature is manageable and you are moving again before the extraction crew has finished breakfast.'); gainXp(20); }
            else { addNarration('', 'The rock formation is good windbreak but poor thermal mass. The cold settles in over three hours and does not lift until after dawn.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Rock Fall on the Mountain Road',
      text: 'A recent rock fall has covered a section of mountain road with loose debris — ranging from fist-sized stones to blocks a meter across. The road is impassable for carts. Foot passage requires careful navigation.',
      choices: [
        { text: 'Assess the debris field and plot a line through it before moving.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'The assessment finds a line through the debris that avoids the unstable large blocks. The crossing is slow but nothing shifts under you.'); gainXp(10); }
            else { addNarration('', 'The assessed line is correct until the fourth large block, which has a different stability than it appears from a distance.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Move continuously across the debris field. Continuous weight distribution is safer than static.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'Continuous movement works. The debris shifts in places but not enough to catch a moving foot. You are across in four minutes.'); gainXp(20); }
            else { addNarration('', 'Continuous movement finds the wrong stone at the wrong angle. The recovery is possible but the right ankle is slow for the next day.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  window.ROUTE_COMPLICATIONS['sunspire_haven|fairhaven'] = {
    checkpoint: {
      title: 'Soreheim Highland Boundary Post',
      text: 'The Soreheim highland boundary post sits at the elevation drop where the highland road begins its long descent toward the Principalities. The warden checks outbound transit against the quota compliance register — extraction workers can leave freely, but non-extraction travelers require a purpose declaration.',
      choices: [
        { text: 'State the transit purpose specifically: destination, time, reason.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'The purpose declaration satisfies the compliance register threshold. The warden stamps the outbound record and opens the gate.'); gainXp(10); }
            else { addNarration('', 'The destination is accepted but the time declared conflicts with the road distance. The warden asks for a route explanation.'); addHeat('soreheim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Present the Sunspire Haven transit authorization seal.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'The Sunspire Haven seal is recognized. The warden checks the date stamp, finds it current, and processes the outbound transit without the standard declaration.'); gainXp(20); }
            else { addNarration('', 'The seal is recognized but the Sunspire Haven authorization requires counter-signature from a Soreheim quota officer. The warden asks where to find one on this road.'); addHeat('soreheim', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Highland Road Patrol — Quota Monitoring',
      text: 'A quota monitoring patrol on the highland road descent — checking that highland travelers are not carrying undeclared extraction outputs. The patrol is working south and has already checked three travelers ahead of you. The lead warden\'s approach changes slightly after the third check.',
      choices: [
        { text: 'Open your pack for inspection before they ask. No undeclared material.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Voluntary inspection reads as confidence. The patrol checks quickly and moves on. Their changed approach was not about you.'); gainXp(10); }
            else { addNarration('', 'Voluntary inspection finds nothing declarable, but one item in the pack has a material profile that requires a cross-reference check. It takes twenty minutes.'); addHeat('soreheim', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Match the patrol\'s changed approach by slowing your pace. Let them come to you.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'The pacing reads as patience, not concern. The warden reaches you and runs a standard check — their changed approach was about the previous traveler, not you.'); gainXp(20); }
            else { addNarration('', 'Slowing down on the road when a patrol has visually acquired you is interpreted as hesitation. The patrol stops early.'); addHeat('soreheim', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Highland Descent — Fog After Dark',
      text: 'Fog on the highland descent — common at this elevation after dark. The road surface is sound but visibility is reduced to five meters and the descent has steep sections without guardrail. The next road marker is not visible. The one before it is barely visible.',
      choices: [
        { text: 'Move by the road edge on the uphill side. Stay on the firm surface.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Uphill edge is the right call. The road curves left at the steep section and the uphill edge keeps you on the inside of the curve. You reach the marker.'); gainXp(10); }
            else { addNarration('', 'Uphill edge is correct until the switchback where uphill becomes downhill. The transition in fog takes a moment to process.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Stop and wait for the fog to lift or for dawn. Either ends the hazard.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'The fog lifts two hours before dawn. The road is clear and you are moving again in good time.'); gainXp(15); }
            else { addNarration('', 'The fog does not lift before dawn. Dawn only makes the fog visible. You lose four hours.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Unstable Ground on the Highland Road',
      text: 'The highland road crosses a section of subsidence — the ground beneath the road has shifted and the surface above is visibly cracked across the width of the road. The cracks are recent; the edges are sharp. The subsidence may be ongoing.',
      choices: [
        { text: 'Cross quickly at the section with the smallest crack gap.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'The smallest crack section is also the most recently cracked — the edges are sharp enough to grip. The crossing is quick.'); gainXp(10); }
            else { addNarration('', 'Smallest gap is not smallest subsidence. The road surface flexes under weight at that point.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Move at the road edge where the bedrock outcrops. Solid ground underneath.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'Bedrock outcrop at the road edge holds. The subsidence has not reached that section. You are across.'); gainXp(20); }
            else { addNarration('', 'The bedrock outcrop is correct but narrow. The kit catches on the road edge crack. Recovery costs time.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  window.ROUTE_COMPLICATIONS['aurora_crown_commune|fairhaven'] = {
    checkpoint: {
      title: 'Sheresh Transit Boundary — Fairhaven Approach',
      text: 'The long road from Aurora Crown to Fairhaven passes through a territorial checkpoint where Sheresh authority ends and Principalities authority begins. The post is staffed by two wardens — one from each side — and they apply different documents to the same traveler.',
      choices: [
        { text: 'Present Sheresh transit papers to the Sheresh warden and Principalities transit to the other.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Presenting authority-specific documents to the correct warden in sequence is the expected protocol. Both clear you without consultation.'); gainXp(10); }
            else { addNarration('', 'The Sheresh papers are current but the purpose declaration on the Principalities side requires cross-referencing the Sheresh record. They confer.'); addHeat('sheresh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Use the guild seal as the primary clearance document. Both wardens accept guild authority.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'Both wardens accept the guild seal as primary — they have seen this before and neither side wants to dispute guild transit authority on this road.'); gainXp(20); }
            else { addNarration('', 'The Sheresh warden accepts the guild seal. The Principalities warden asks which guild office issued it and which transit route was originally filed.'); addHeat('union', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    patrol: {
      title: 'Sheresh Perimeter Patrol — Outbound',
      text: 'A Sheresh authority patrol checking outbound travelers — specifically looking for undeclared equipment from the Aurora Crown commune area. The patrol is post-inspection, not pre-inspection: they check what you are carrying out, not what you have transit approval for.',
      choices: [
        { text: 'Open the kit fully. Nothing undeclared from the commune.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Full kit presentation reads as compliance with the outbound inspection protocol. The patrol marks the log and clears you.'); gainXp(10); }
            else { addNarration('', 'Full kit presentation is accepted but one item has a material signature they note. They ask where it was acquired.'); addHeat('sheresh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Name the Sheresh transit coordinator who processed the outbound clearance.', skill: 'charm', tag: 'risky',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 13) { addNarration('', 'The name is current and known to the patrol leader. She checks the log and finds the clearance. The outbound inspection is waived.'); gainXp(20); }
            else { addNarration('', 'The name is current but the coordinator works a different sector. The patrol leader asks which sector issued the clearance.'); addHeat('sheresh', 2); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    night: {
      title: 'Highland Road — Night Watch Post',
      text: 'The highland road from Aurora Crown carries a Sheresh night watch post at the halfway marker. The post is occupied — a single warden with a fire and a log. She checks everyone who passes the marker after dark, without exception.',
      choices: [
        { text: 'Stop at the post, declare night transit, and present the outbound clearance.', skill: 'charm', tag: 'safe',
          action: function() {
            var r = rollD20('charm');
            if (r.total >= 7) { addNarration('', 'The declaration and clearance are in order. She logs the night transit and hands back the clearance with a time stamp. The road ahead is clear.'); gainXp(10); }
            else { addNarration('', 'The clearance is accepted but her standard follow-up question about activity in the commune area takes twenty minutes to satisfy.'); addHeat('sheresh', 1); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Leave the road before the halfway marker and rejoin it after the post.', skill: 'finesse', tag: 'risky',
          action: function() {
            var r = rollD20('finesse');
            if (r.total >= 13) { addNarration('', 'The highland road margin is wide here and the terrain beyond it is flat. The post lamp does not cover the margin at this distance. You rejoin the road north of the post.'); gainXp(25); }
            else { addNarration('', 'The watch post has a second lamp on the margin side that is not visible from the road approach. The warden\'s field of view is wider than estimated.'); addHeat('sheresh', 3); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    },
    hazard: {
      title: 'Aurora Crown Dome Interference — Equipment Failure',
      text: 'The commune\'s atmospheric dome generates interference on the road approaches. Equipment carried through the dome perimeter frequently malfunctions on the far side. A navigational tool you have been relying on is no longer functioning correctly.',
      choices: [
        { text: 'Navigate by road marker sequence alone. The markers are posted and numbered.', skill: 'wits', tag: 'safe',
          action: function() {
            var r = rollD20('wits');
            if (r.total >= 7) { addNarration('', 'Marker navigation is slower but reliable. The route is marked at every half mile. You reach the territorial boundary without deviation.'); gainXp(10); }
            else { addNarration('', 'Marker navigation works until marker 14, which is missing — removed or fallen. The gap requires a best-estimate decision.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        },
        { text: 'Use terrain features — high ground, road surface, sun position — to continue.', skill: 'vigor', tag: 'risky',
          action: function() {
            var r = rollD20('vigor');
            if (r.total >= 13) { addNarration('', 'Terrain navigation works well in highland. The sun position and road surface quality give enough information to stay on route.'); gainXp(20); }
            else { addNarration('', 'The terrain navigation is adequate until the cloud cover changes. Without sun position the terrain features look similar in three directions.'); }
            setTimeout(function() { window._travelNextEncounter ? window._travelNextEncounter() : TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        }
      ]
    }
  };

  // ---------------------------------------------------------------------------
  // Helper: resolve macroregion from locality IDs
  // ---------------------------------------------------------------------------
  function resolveMacroregion(fromId, toId) {
    var lmr = window.LOCALITY_MACROREGION || LOCALITY_MACROREGION || {};
    var from = lmr[fromId] || 'principalities';
    var to   = lmr[toId]   || 'principalities';
    // If crossing regions, prefer destination region
    return to || from;
  }

  // ---------------------------------------------------------------------------
  // Helper: pick N unique random items from array
  // ---------------------------------------------------------------------------
  function pickRandom(arr, n) {
    var copy = arr.slice();
    var result = [];
    n = Math.min(n, copy.length);
    for (var i = 0; i < n; i++) {
      var idx = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(idx, 1)[0]);
    }
    return result;
  }

  // ---------------------------------------------------------------------------
  // TRAVEL_CORRIDOR — main controller
  // ---------------------------------------------------------------------------
  window.TRAVEL_CORRIDOR = {

    triggerEncounters: function(routeTier, fromId, toId) {
      var tier = routeTier || 'short';
      var from = fromId || '';
      // toId is the destination locality — G.location is already set to it when called.
      // We must capture it so every downstream path calls resolveArrival(dest).
      var dest = toId || from;

      // Gate: if no encounters pool or flag not enabled, go straight to arrival
      var encountersEnabled = G && G.flags && G.flags.corridor_encounters_enabled;
      var pool = window.CORRIDOR_ENCOUNTERS && (window.CORRIDOR_ENCOUNTERS[tier] || window.CORRIDOR_ENCOUNTERS['short']);
      if (!encountersEnabled || !pool || !pool.length) {
        if (typeof resolveArrival === 'function') {
          resolveArrival(dest);
        } else if (typeof loadStageChoices === 'function') {
          loadStageChoices(dest);
        }
        return;
      }

      // Determine encounter count by tier, modified by stage scaling (Stage I-II active)
      var encounterCount = tier === 'long' ? 3 : (tier === 'medium' ? 2 : 1);
      var _scaling = window.COMBAT_SCALING_TABLE && G && window.COMBAT_SCALING_TABLE[G.stage];
      if (_scaling && _scaling.rateModifier > 1.0 && Math.random() < (_scaling.rateModifier - 1.0)) {
        encounterCount = Math.min(encounterCount + 1, 4);
      }

      var selected = pickRandom(pool, encounterCount);

      // Biome-specific encounters: insert 1 from TRAVEL_ENCOUNTER_POOLS if available
      var _biomeKey = window.getBiomeForRoute ? window.getBiomeForRoute(dest, from) : null;
      var _biomePool = _biomeKey && window.TRAVEL_ENCOUNTER_POOLS && window.TRAVEL_ENCOUNTER_POOLS[_biomeKey];
      if (_biomePool && _biomePool.length > 0) {
        // Pick 1 random biome encounter and insert at a random position in the queue
        var _biomeEnc = _biomePool[Math.floor(Math.random() * _biomePool.length)];
        var _insertAt = Math.floor(Math.random() * (selected.length + 1));
        selected.splice(_insertAt, 0, _biomeEnc);
        // Long tier: add up to 1 more biome encounter (deduplicated)
        if (tier === 'long' && _biomePool.length > 1) {
          var _biomePool2 = _biomePool.filter(function(e) { return e.id !== _biomeEnc.id; });
          if (_biomePool2.length > 0) {
            selected.push(_biomePool2[Math.floor(Math.random() * _biomePool2.length)]);
          }
        }
      }

      // Fast pace: +1 encounter chance — roll one extra biome encounter if pace is fast
      // Knight Mounted Discipline skips this extra roll (handled inside _travelFastPaceExtraEncounter)
      if (G && G.pace === 'fast' && Math.random() < 0.5) {
        var _biome = window.getBiomeForRoute ? window.getBiomeForRoute(dest, from) : null;
        if (typeof window._travelFastPaceExtraEncounter === 'function') {
          setTimeout(function() { window._travelFastPaceExtraEncounter(_biome || 'road'); }, 1200);
        }
      }

      // Store state for chaining — capture dest so nextEncounter can resolveArrival
      if (G && G.flags) {
        G.flags._corridor_encounters_remaining = selected.length - 1;
        G.flags._corridor_encounters_queue     = selected.slice(1).map(function(e){ return e.id; });
        G.flags._corridor_from                 = from;
        G.flags._corridor_to                   = dest;
        G.flags._corridor_dest                 = dest;
        G.flags._corridor_tier                 = tier;
      }

      // Show macroregion narration
      var region = resolveMacroregion(from, dest);
      var narrations = window.MACROREGION_NARRATIONS[region] || window.MACROREGION_NARRATIONS['principalities'];
      var narText = narrations[Math.floor(Math.random() * narrations.length)];
      if (typeof addNarration === 'function') {
        addNarration('On the Road', narText);
      }

      // If no encounters were selected after all, go straight to arrival
      var first = selected[0];
      if (!first) {
        if (typeof resolveArrival === 'function') resolveArrival(dest);
        else if (typeof loadStageChoices === 'function') loadStageChoices(dest);
        return;
      }

      // Wrap encounter choices so each action ends with resolveArrival(dest)
      var _wrappedChoices = _wrapEncounterChoices(first.choices, dest);

      if (typeof addNarration === 'function') {
        addNarration(first.title, first.text);
      }
      if (typeof renderChoices === 'function') {
        setTimeout(function() {
          renderChoices(_wrappedChoices);
        }, 300);
      }
    },

    // Called after a corridor choice resolves, to chain to the next encounter
    nextEncounter: function() {
      if (!G || !G.flags) return;
      var remaining = G.flags._corridor_encounters_remaining || 0;
      var dest = G.flags._corridor_dest || G.location || '';

      if (remaining <= 0) {
        // No more encounters — proceed to arrival
        if (typeof resolveArrival === 'function') resolveArrival(dest);
        else if (typeof loadStageChoices === 'function') loadStageChoices(dest);
        return;
      }

      var queue = G.flags._corridor_encounters_queue || [];
      if (!queue.length) {
        if (typeof resolveArrival === 'function') resolveArrival(dest);
        else if (typeof loadStageChoices === 'function') loadStageChoices(dest);
        return;
      }

      var nextId = queue.shift();
      G.flags._corridor_encounters_queue     = queue;
      G.flags._corridor_encounters_remaining = remaining - 1;

      var allTiers = [].concat(
        window.CORRIDOR_ENCOUNTERS.short || [],
        window.CORRIDOR_ENCOUNTERS.medium || [],
        window.CORRIDOR_ENCOUNTERS.long || []
      );
      // Also search TRAVEL_ENCOUNTER_POOLS so biome encounters queued by triggerEncounters
      // can be found by ID during nextEncounter chain resolution.
      if (window.TRAVEL_ENCOUNTER_POOLS) {
        var _tep = window.TRAVEL_ENCOUNTER_POOLS;
        for (var _bk in _tep) {
          if (Object.prototype.hasOwnProperty.call(_tep, _bk) && Array.isArray(_tep[_bk])) {
            allTiers = allTiers.concat(_tep[_bk]);
          }
        }
      }
      var encounter = null;
      for (var i = 0; i < allTiers.length; i++) {
        if (allTiers[i].id === nextId) { encounter = allTiers[i]; break; }
      }
      if (!encounter) {
        if (typeof resolveArrival === 'function') resolveArrival(dest);
        else if (typeof loadStageChoices === 'function') loadStageChoices(dest);
        return;
      }

      var _wrappedChoices = _wrapEncounterChoices(encounter.choices, dest);

      if (typeof addNarration === 'function') {
        addNarration(encounter.title, encounter.text);
      }
      if (typeof renderChoices === 'function') {
        setTimeout(function() {
          renderChoices(_wrappedChoices);
        }, 300);
      }
    },
    startOverlayJourney: function(fromId, toId, mode, pack) {
      TRAVEL_CORRIDOR._resetJourneyGlobalState(fromId, toId);
      var routeKey = fromId + '|' + toId;
      var revKey   = toId   + '|' + fromId;
      var routeEntry = (window.TRAVEL_ROUTES || {})[routeKey]
                    || (window.TRAVEL_ROUTES || {})[revKey] || {};
      var spatialData = window.ROUTE_SPATIAL_DATA ? window.ROUTE_SPATIAL_DATA.get(fromId, toId) : null;
      var totalDays = Math.max(1, Math.ceil(routeEntry[mode] || routeEntry['foot'] || 1));
      var tier = routeEntry.tier || (totalDays <= 2 ? 'short' : totalDays <= 14 ? 'medium' : 'long');
      var baseCount = { short: 1, medium: 2, long: 3 }[tier] || 1;
      var biomes = spatialData ? spatialData.biomes : [(routeEntry.biome || 'plains')];
      var schedule = [];
      for (var i = 0; i < baseCount; i++) {
        var day = Math.max(1, Math.round(totalDays * (i + 1) / (baseCount + 1)));
        var biomeIdx = Math.min(Math.floor(biomes.length * day / totalDays), biomes.length - 1);
        schedule.push({ day: day, biome: biomes[biomeIdx] || 'plains', tier: tier });
      }
      var anchorDay = null;
      var anchorId = null;
      var fromMacro = (window.LOCALITY_MACROREGION || {})[fromId] || '';
      var toMacro   = (window.LOCALITY_MACROREGION || {})[toId]   || '';
      if (window.OPERATIONAL_ANCHORS) {
        var _anchors = window.OPERATIONAL_ANCHORS;
        for (var j = 0; j < _anchors.length; j++) {
          var a = _anchors[j];
          var aMacro = (window.LOCALITY_MACROREGION || {})[a.locality] || '';
          if (aMacro === fromMacro || aMacro === toMacro) {
            anchorDay = Math.max(1, Math.round(totalDays * 0.6));
            anchorId  = a.id;
            break;
          }
        }
      }
      var paceMod = { fatiguePerDay: 1 };
      G.fatigue = (G.fatigue || 0) + Math.ceil(totalDays * 0.3);
      G.dayCount = (G.dayCount || 0) + Math.ceil(totalDays);
      if (typeof updateHUD === 'function') updateHUD();
      G.flags._jrn_from      = fromId;
      G.flags._jrn_to        = toId;
      G.flags._jrn_mode      = mode;
      G.flags._jrn_total     = totalDays;
      G.flags._jrn_current   = 0;
      G.flags._jrn_sched     = JSON.stringify(schedule);
      G.flags._jrn_sched_idx = 0;
      G.flags._jrn_biomes    = biomes.join(',');
      G.flags._jrn_note      = spatialData ? (spatialData.route_note || '') : '';
      G.flags._jrn_anchor_day = anchorDay;
      G.flags._jrn_anchor_id  = anchorId;
      window._travelNextEncounter = function() { TRAVEL_CORRIDOR.advanceDayLeg(); };
      if (G) G.location = toId;
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof closeOverlay === 'function') closeOverlay('overlay-map');
      TRAVEL_CORRIDOR.advanceDayLeg();
    },
    advanceDayLeg: function() {
      if (!G || !G.flags) return;
      var fromId    = G.flags._jrn_from || '';
      var toId      = G.flags._jrn_to   || '';
      var totalDays = G.flags._jrn_total || 1;
      var current   = (G.flags._jrn_current || 0) + 1;
      var schedule  = JSON.parse(G.flags._jrn_sched  || '[]');
      var schedIdx  = G.flags._jrn_sched_idx || 0;
      var biomes    = (G.flags._jrn_biomes || 'plains').split(',');
      var note      = G.flags._jrn_note || '';
      var anchorDay = G.flags._jrn_anchor_day;
      var anchorId  = G.flags._jrn_anchor_id;
      var destLoc   = window.WORLD_LOCATIONS ? window.WORLD_LOCATIONS[toId] : null;
      var destName  = destLoc ? destLoc.name : toId;
      var routeTierObj = (window.TRAVEL_ROUTES || {})[fromId+'|'+toId]
                      || (window.TRAVEL_ROUTES || {})[toId+'|'+fromId] || {};
      var routeTier = routeTierObj.tier || 'medium';

      G.flags._jrn_current = current;

      if (current > totalDays) {
        TRAVEL_CORRIDOR._completeJourney(toId);
        return;
      }

      var dayFraction = totalDays > 1 ? (current - 1) / (totalDays - 1) : 0;
      var biomeIdx = Math.min(Math.floor(biomes.length * dayFraction), biomes.length - 1);
      var biome = biomes[biomeIdx] || 'plains';
      var fromMacro = (window.LOCALITY_MACROREGION || {})[fromId] || 'principalities';
      var toMacro   = (window.LOCALITY_MACROREGION || {})[toId]   || 'principalities';
      var macro = dayFraction < 0.5 ? fromMacro : toMacro;
      var narrs = (window.MACROREGION_NARRATIONS || {})[macro] || [];
      var ambient = narrs[Math.floor(Math.random() * narrs.length)] || 'The road continues.';

      var todayEncounter = schedule[schedIdx] && schedule[schedIdx].day === current;
      var todayAnchor    = anchorDay !== null && anchorDay === current && anchorId;

      var headerHtml   = '<div class="journey-day-header">DAY ' + current + ' OF ' + totalDays + ' \u2014 ' + destName.toUpperCase() + '</div>';
      var narrationHtml = '<div class="journey-narration">' + ambient + '</div>';
      var noteHtml     = note ? '<div class="journey-route-note">' + note + '</div>' : '';
      var choicesHtml  = '<div class="journey-choices" id="journey-choice-area"></div>';

      var _smc = window._setMapOverlayContent || (typeof _setMapOverlayContent === 'function' ? _setMapOverlayContent : null);
      if (_smc) {
        _smc(
          'Day ' + current + ' of ' + totalDays + ' \u2014 ' + destName,
          headerHtml + narrationHtml + noteHtml + choicesHtml,
          false
        );
      }

      var choiceArea = document.getElementById('journey-choice-area');
      if (!choiceArea) { TRAVEL_CORRIDOR._completeJourney(toId); return; }

      if (todayAnchor) {
        G.flags._jrn_anchor_day = null;
        TRAVEL_CORRIDOR._renderAnchorInOverlay(anchorId, choiceArea);
      } else if (todayEncounter) {
        G.flags._jrn_sched_idx = schedIdx + 1;
        TRAVEL_CORRIDOR._renderEncounterInOverlay(biome, routeTier, choiceArea);
      } else {
        var btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = 'Continue on the road.';
        btn.addEventListener('click', function() { TRAVEL_CORRIDOR.advanceDayLeg(); });
        choiceArea.appendChild(btn);
      }
    },
    _completeJourney: function(toId) {
      var _keys = ['_jrn_from','_jrn_to','_jrn_mode','_jrn_total','_jrn_current',
                   '_jrn_sched','_jrn_sched_idx','_jrn_biomes','_jrn_note',
                   '_jrn_anchor_day','_jrn_anchor_id'];
      for (var ki = 0; ki < _keys.length; ki++) {
        if (G && G.flags) delete G.flags[_keys[ki]];
      }
      if (G) G.travelMode = null;
      window._travelNextEncounter = null;
      if (typeof closeOverlay === 'function') closeOverlay('overlay-map');
      setTimeout(function() {
        if (typeof resolveArrival === 'function') resolveArrival(toId);
        else if (typeof loadStageChoices === 'function') loadStageChoices(toId);
      }, 200);
    },
    _renderEncounterInOverlay: function(biome, tier, choiceArea) {
      var fromId    = G.flags._jrn_from || '';
      var toId      = G.flags._jrn_to   || '';
      var dayNum    = G.flags._jrn_current || 1;
      var totalDays = G.flags._jrn_total   || 1;

      // Try ROUTE_COMPLICATIONS first (route-specific authored content)
      var compKey = fromId + '|' + toId;
      var revKey  = toId   + '|' + fromId;
      var complications = (window.ROUTE_COMPLICATIONS || {})[compKey]
                       || (window.ROUTE_COMPLICATIONS || {})[revKey];
      var enc = null;

      if (complications) {
        var pct = totalDays > 1 ? (dayNum - 1) / (totalDays - 1) : 0;
        var compType = pct <= 0.15 ? 'checkpoint'
                     : pct <= 0.5  ? 'patrol'
                     : pct <= 0.75 ? 'night'
                     : 'hazard';
        if (complications[compType] && !complications['_used_' + compType]) {
          enc = complications[compType];
          complications['_used_' + compType] = true;
        }
      }

      if (!enc) {
        // Fall back to CORRIDOR_ENCOUNTERS by tier
        var pool = (window.CORRIDOR_ENCOUNTERS || {})[tier]
                || (window.CORRIDOR_ENCOUNTERS || {})['short']
                || [];
        var unused = pool.filter(function(e) { return !e._overlay_used; });
        if (!unused.length) {
          pool.forEach(function(e) { e._overlay_used = false; });
          unused = pool.slice();
        }
        if (unused.length) {
          enc = unused[Math.floor(Math.random() * unused.length)];
          enc._overlay_used = true;
        }
      }

      if (!enc) {
        // No encounter available — skip to continue button
        var skipBtn = document.createElement('button');
        skipBtn.className = 'choice-btn';
        skipBtn.textContent = 'Continue on the road.';
        skipBtn.addEventListener('click', function() { TRAVEL_CORRIDOR.advanceDayLeg(); });
        choiceArea.appendChild(skipBtn);
        return;
      }

      // Render encounter header + text above choice area
      var encLabel = document.createElement('div');
      encLabel.className = 'journey-day-header';
      encLabel.style.color = 'var(--blood-bright)';
      encLabel.textContent = (enc.title || 'ENCOUNTER').toUpperCase();
      choiceArea.parentNode.insertBefore(encLabel, choiceArea);

      var textDiv = document.createElement('div');
      textDiv.className = 'journey-narration';
      textDiv.style.borderTop = '1px solid var(--char)';
      textDiv.style.paddingTop = '10px';
      textDiv.textContent = enc.text || enc.narration || '';
      choiceArea.parentNode.insertBefore(textDiv, choiceArea);

      // Render choice buttons
      var choices = enc.choices || [];
      choices.forEach(function(choice) {
        var btn = document.createElement('button');
        btn.className = 'choice-btn';
        var tagLabel = choice.tag === 'bold' ? ' \u00b7 Bold' : choice.tag === 'safe' ? ' \u00b7 Safe' : ' \u00b7 Risky';
        var skillDisplay = choice.skill ? (' \u2014 ' + choice.skill + tagLabel) : '';
        btn.innerHTML = choice.text
          + (skillDisplay ? '<br><span style="font-size:11px;color:var(--ink-dim)">' + skillDisplay + '</span>' : '');
        btn.addEventListener('click', function() {
          choiceArea.querySelectorAll('button').forEach(function(b) { b.disabled = true; });
          if (typeof choice.action === 'function') {
            choice.action();
          } else {
            // Fallback for any remaining CID-only choices
            var r = typeof rollD20 === 'function' ? rollD20(choice.skill || 'wits') : { total: 10 };
            var dc = choice.tag === 'bold' ? 16 : choice.tag === 'safe' ? 7 : 13;
            var resultText = r.total >= dc
              ? (choice.successResult || 'You proceed without incident.')
              : (choice.failResult    || 'The road resists.');
            if (typeof addNarration === 'function') addNarration('', resultText);
            setTimeout(function() { TRAVEL_CORRIDOR.advanceDayLeg(); }, 500);
          }
        });
        choiceArea.appendChild(btn);
      });
    },
    _renderAnchorInOverlay: function(anchorId, choiceArea) {
      var anchor = null;
      if (window.OPERATIONAL_ANCHORS) {
        for (var i = 0; i < window.OPERATIONAL_ANCHORS.length; i++) {
          if (window.OPERATIONAL_ANCHORS[i].id === anchorId) { anchor = window.OPERATIONAL_ANCHORS[i]; break; }
        }
      }
      if (!anchor) { TRAVEL_CORRIDOR.advanceDayLeg(); return; }

      var nameLabel = document.createElement('div');
      nameLabel.className = 'journey-day-header';
      nameLabel.style.color = 'var(--jade-bright)';
      nameLabel.textContent = anchor.name.toUpperCase();
      choiceArea.parentNode.insertBefore(nameLabel, choiceArea);

      var descDiv = document.createElement('div');
      descDiv.className = 'journey-narration';
      descDiv.style.borderTop = '1px solid var(--char)';
      descDiv.style.paddingTop = '10px';
      descDiv.textContent = anchor.desc || '';
      choiceArea.parentNode.insertBefore(descDiv, choiceArea);

      var choices = anchor.choices || [];
      choices.forEach(function(choice) {
        var btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.addEventListener('click', function() {
          choiceArea.querySelectorAll('button').forEach(function(b) { b.disabled = true; });
          if (typeof choice.action === 'function') {
            choice.action();
          } else {
            TRAVEL_CORRIDOR.advanceDayLeg();
          }
        });
        choiceArea.appendChild(btn);
      });
    },
    _resetJourneyGlobalState: function(fromId, toId) {
      if (window.CORRIDOR_ENCOUNTERS) {
        ['short','medium','long'].forEach(function(tier) {
          var pool = window.CORRIDOR_ENCOUNTERS[tier] || [];
          pool.forEach(function(enc) { enc._overlay_used = false; });
        });
      }
      if (window.ROUTE_COMPLICATIONS) {
        var key1 = fromId + '|' + toId;
        var key2 = toId + '|' + fromId;
        [key1, key2].forEach(function(key) {
          var comp = window.ROUTE_COMPLICATIONS[key];
          if (comp) {
            ['checkpoint','patrol','night','hazard'].forEach(function(t) {
              delete comp['_used_' + t];
            });
          }
        });
      }
    }
  };

  // ---------------------------------------------------------------------------
  // Helper: wrap encounter choices so each action concludes with resolveArrival(dest).
  // Choices with an existing action() get it called first; then the chain continues.
  // Choices without an action get a default action that calls nextEncounter / arrival.
  // A closure captures dest so it's always correct even if G.flags changes.
  // ---------------------------------------------------------------------------
  function _wrapEncounterChoices(choices, dest) {
    if (!choices || !choices.length) return choices;
    return choices.map(function(c) {
      var original = c.action;
      // CID-based choices (no inline action) must fall through to the C consequence
      // lookup in handleChoice so their success/failure text and XP are shown.
      // Only wrap choices that already have an inline action function.
      if (typeof original !== 'function') return c;
      // Return a shallow clone with action replaced to patch _travelNextEncounter
      var wrapped = {};
      for (var k in c) { if (Object.prototype.hasOwnProperty.call(c, k)) wrapped[k] = c[k]; }
      wrapped.action = (function(_orig, _dest) {
        return function(ctx) {
          // Original action handles its own narration/roll; it must NOT call
          // loadStageChoices/resolveArrival itself — we handle that via nextEncounter.
          // Patch the fallback references inside legacy closures by temporarily
          // overriding _travelNextEncounter to point at corridor nextEncounter.
          var _prevNext = window._travelNextEncounter;
          window._travelNextEncounter = function() {
            window._travelNextEncounter = _prevNext;
            window.TRAVEL_CORRIDOR.nextEncounter();
          };
          _orig.call(this, ctx);
          // If the original did NOT call _travelNextEncounter synchronously,
          // restore and let the timeout inside the original fire as normal.
        };
      })(original, dest);
      return wrapped;
    });
  }

  // ---------------------------------------------------------------------------
  // Wire the hook — override _travelStartEncounter
  // ---------------------------------------------------------------------------
  window._travelStartEncounter = function(type, fromId, toId) {
    var tier = type || 'short';
    window.TRAVEL_CORRIDOR.triggerEncounters(tier, fromId || '', toId || '');
  };

  // Expose route and modifier tables for functions in ledger-of-ash.html
  window.TRAVEL_ROUTES = TRAVEL_ROUTES;
  window.PACE_MODIFIERS = PACE_MODIFIERS;
  window.BIOME_ENCOUNTER_WEIGHTS = BIOME_ENCOUNTER_WEIGHTS;

  // ---------------------------------------------------------------------------
  // BIOME_ENCOUNTER_POOLS — fast-pace extra encounter source by biome.
  // Keys must exist in window.ENEMY_STATS (data/bestiary_lookup.js).
  // ---------------------------------------------------------------------------
  // Enemy keys must exist in ENEMY_TEMPLATES (ledger-of-ash.html).
  // patrol_guard and border_enforcer are law enforcement — they route through
  // enterAuthorityConfrontation(), not enterCombat(). Excluded here.
  window.BIOME_ENCOUNTER_POOLS = {
    plains:       ['plains_dust_hound', 'plains_grazer_bull', 'plains_scavenger_kite'],
    highland:     ['highland_rockjaw', 'highland_ridge_viper', 'highland_fog_stalker'],
    coastal:      ['coastal_shorecat', 'coastal_tide_crawler'],
    mountain:     ['mountain_ironwing', 'mountain_stoneback', 'mountain_crevice_asp'],
    forest:       ['forest_shadowmaw', 'forest_vine_horror', 'forest_needle_crow'],
    'ash-zone':   ['ash_zone_cinder_rat', 'ash_zone_ember_hound'],
    'ice-locked': ['ice_locked_frostgrip', 'ice_locked_polar_asp']
  };

  // ---------------------------------------------------------------------------
  // getBiomeForRoute — look up TRAVEL_ROUTES for the matching route pair
  // and return its biome tag. Falls back through both orderings.
  // ---------------------------------------------------------------------------
  window.getBiomeForRoute = function(toId, fromId) {
    if (!toId || !fromId) return null;
    var _LOC_ALIAS = {
      aurora: 'aurora_crown_commune',
      guildheart: 'guildheart_hub',
      panim: 'panim_haven',
      soreheim: 'soreheim_proper',
      mimolot: 'mimolot_academy'
    };
    var _from = _LOC_ALIAS[fromId] || fromId;
    var _to   = _LOC_ALIAS[toId]   || toId;
    var keyA = _from + '|' + _to;
    var keyB = _to   + '|' + _from;
    var r = TRAVEL_ROUTES[keyA] || TRAVEL_ROUTES[keyB];
    return (r && r.biome) || null;
  };

  // ---------------------------------------------------------------------------
  // TRAVEL_ENCOUNTER_POOLS — authored biome encounter objects.
  // Used for fast-pace extra encounter rolls and biome-specific flavor.
  // Keys: 'forest', 'road', 'sea', 'highland', 'coastal', 'mountain', 'plains'
  // ---------------------------------------------------------------------------
  window.TRAVEL_ENCOUNTER_POOLS = window.TRAVEL_ENCOUNTER_POOLS || {};

  window.TRAVEL_ENCOUNTER_POOLS['forest'] = [
    {
      id: 'tep_forest_treeline',
      title: 'Movement in the Tree Line',
      text: 'Something moves parallel to the path, keeping pace. Not an animal — the rhythm is wrong, too deliberate, pausing when you pause. The tree cover here is dense enough that only sound tells you it is there.',
      choices: [
        { text: 'Stop moving. Let it show itself or move off.', skill: 'finesse', tag: 'risky', align: 'neutral', cid: 'tep_forest_treeline_wait' },
        { text: 'Change direction sharply and cut behind it.', skill: 'vigor', tag: 'bold', align: 'neutral', cid: 'tep_forest_treeline_flank' },
        { text: 'Keep the pace and give it nothing to read.', skill: 'wits', tag: 'safe', align: 'neutral', cid: 'tep_forest_treeline_ignore' }
      ]
    },
    {
      id: 'tep_forest_deadfall',
      title: 'Deadfall Crossing',
      text: 'The path drops into a dry creek bed choked with deadfall — trunks across the crossing point, bark stripped, cut ends showing. Someone cleared this deliberately, then left the trunks in place. The crossing is passable but slow. Fresh boot prints go in and do not come out the other side.',
      choices: [
        { text: 'The prints go in. Someone is waiting at the deadfall.', skill: 'vigor', tag: 'risky', align: 'neutral', cid: 'tep_forest_deadfall_careful' },
        { text: 'Find a crossing upstream. The deadfall is the point.', skill: 'wits', tag: 'safe', align: 'neutral', cid: 'tep_forest_deadfall_detour' }
      ]
    },
    {
      id: 'tep_forest_old_camp',
      title: 'Abandoned Camp',
      text: 'A camp that was occupied recently: fire ring with ash still warm at the center, cut brush arranged as windbreak, three cord ties on a branch overhead where packs were hung. Left in order, not abandoned in a hurry. A chalk mark on the nearest trunk — a direction arrow, pointing back toward the road.',
      choices: [
        { text: 'Warm ash and chalk arrows mean someone is coming back here.', skill: 'wits', tag: 'risky', align: 'neutral', cid: 'tep_forest_camp_wait' },
        { text: 'Follow the chalk direction. Whoever left it wants it followed.', skill: 'vigor', tag: 'bold', align: 'neutral', cid: 'tep_forest_camp_follow' },
        { text: 'Leave it as found. Forest camps are operational — not yours to read.', skill: 'finesse', tag: 'safe', align: 'neutral', cid: 'tep_forest_camp_leave' }
      ]
    },
    {
      id: 'tep_forest_toll',
      title: 'Unofficial Toll',
      text: 'Two people block the narrow section of path where the trees press closest. They have a rope across the track at knee height, slack enough to step over. The taller one names a figure. It is not high. The other is watching your hands.',
      choices: [
        { text: 'The figure is low enough to mean this is a test, not a profession.', skill: 'charm', tag: 'risky', align: 'neutral', cid: 'tep_forest_toll_talk' },
        { text: 'Pay it. Low toll, specific location — road knowledge has value here.', skill: 'wits', tag: 'safe', align: 'neutral', cid: 'tep_forest_toll_pay' },
        { text: 'Step the rope and move through them before they decide what to do about it.', skill: 'might', tag: 'bold', align: 'chaotic', cid: 'tep_forest_toll_push' }
      ]
    },
    {
      id: 'tep_forest_sinkhole',
      title: 'Sinkhole on the Track',
      text: 'The track ends at a sinkhole roughly three meters across, edges raw — recent collapse. Cart ruts go up to the edge and stop. On the far side, the ruts resume. Whatever made them went through here before the ground gave.',
      choices: [
        { text: 'Work around the perimeter. The collapse is not finished.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'tep_forest_sinkhole_around' },
        { text: 'Check the depth. A shallow sinkhole has a different explanation than a deep one.', skill: 'wits', tag: 'risky', align: 'neutral', cid: 'tep_forest_sinkhole_check' }
      ]
    }
  ];

  window.TRAVEL_ENCOUNTER_POOLS['road'] = window.TRAVEL_ENCOUNTER_POOLS['road'] || [
    {
      id: 'tep_road_milestone',
      title: 'Tampered Milestone',
      text: 'The league marker at the road edge has been turned to face the ditch — no vandalism otherwise, no damage, just rotated. The Roadwarden dispatch box at its base has a fresh seal mark from this morning. Someone turned it after the warden passed.',
      choices: [
        { text: 'A turned milestone on a staffed route is a signal, not an accident.', skill: 'wits', tag: 'risky', align: 'neutral', cid: 'tep_road_milestone_read' },
        { text: 'Rotate it back and keep moving. The warden will not notice either way.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'tep_road_milestone_restore' }
      ]
    },
    {
      id: 'tep_road_warden_post',
      title: 'Warden Post Empty',
      text: 'The Roadwarden post at this junction is staffed — lantern lit, door open, boots visible under the desk inside. But no one answers when you call at the window. The transit log on the counter is open to today\'s date. The last entry is two hours old.',
      choices: [
        { text: 'Two hours and no entry means something interrupted the post mid-shift.', skill: 'wits', tag: 'risky', align: 'neutral', cid: 'tep_road_warden_investigate' },
        { text: 'Log yourself in the transit book and move. The post\'s problem is its own.', skill: 'charm', tag: 'safe', align: 'neutral', cid: 'tep_road_warden_self_log' }
      ]
    }
  ];

  window.TRAVEL_ENCOUNTER_POOLS['sea'] = window.TRAVEL_ENCOUNTER_POOLS['sea'] || [
    {
      id: 'tep_sea_following_vessel',
      title: 'Vessel Running Parallel',
      text: 'A smaller boat has been matching your vessel\'s course for the last two hours — close enough to read its lines, too far to hail comfortably. No flag. No hull mark visible at this distance. When your vessel adjusts heading, it adjusts. The captain has noticed.',
      choices: [
        { text: 'A vessel that shadows without flagging is reading cargo or route, not requesting passage.', skill: 'wits', tag: 'risky', align: 'neutral', cid: 'tep_sea_following_read' },
        { text: 'Put distance on it. Change speed. See whether it holds or falls back.', skill: 'vigor', tag: 'bold', align: 'neutral', cid: 'tep_sea_following_evade' },
        { text: 'It is the captain\'s water and the captain\'s problem. Stay out of it.', skill: 'wits', tag: 'safe', align: 'neutral', cid: 'tep_sea_following_ignore' }
      ]
    },
    {
      id: 'tep_sea_manifest_dispute',
      title: 'Manifest Dispute',
      text: 'The captain calls you to the cargo hold. Three crates have been stacked against one marked in the manifest as empty. The seal on the empty crate is different from the others — older, from a routing office that closed two years ago. Someone loaded this before your departure.',
      choices: [
        { text: 'A sealed crate with a closed office mark is not empty. Open it.', skill: 'wits', tag: 'bold', align: 'neutral', cid: 'tep_sea_manifest_open' },
        { text: 'The manifest discrepancy belongs to the captain, not to a passenger.', skill: 'charm', tag: 'safe', align: 'neutral', cid: 'tep_sea_manifest_pass' }
      ]
    }
  ];

  window.TRAVEL_ENCOUNTER_POOLS['highland'] = window.TRAVEL_ENCOUNTER_POOLS['highland'] || [
    {
      id: 'tep_highland_weather_turn',
      title: 'Weather Coming In',
      text: 'The cloud base has dropped three hundred meters in the last hour. The path ahead is still visible but the next ridge is not. Highland travelers coming the other direction are moving faster than is comfortable on this terrain. One of them gives you a single look but does not stop.',
      choices: [
        { text: 'Make the ridge before the cloud closes. The other travelers are reading it right.', skill: 'vigor', tag: 'bold', align: 'neutral', cid: 'tep_highland_weather_push' },
        { text: 'Find a sheltered position and wait for the cloud to lift or commit.', skill: 'wits', tag: 'safe', align: 'neutral', cid: 'tep_highland_weather_shelter' }
      ]
    },
    {
      id: 'tep_highland_cairn_chain',
      title: 'Cairn Chain Broken',
      text: 'The waymarker cairns on this section of path run at fifty-meter intervals. One is knocked over — not collapsed, knocked, stones scattered in a fan pattern. The next cairn is intact. The one after that is gone entirely. The path continues but unmarked for a stretch ahead.',
      choices: [
        { text: 'A knocked cairn means someone came through here in a hurry or with a reason.', skill: 'wits', tag: 'risky', align: 'neutral', cid: 'tep_highland_cairn_read' },
        { text: 'Navigate by terrain to the next visible waymark. The path is recoverable.', skill: 'vigor', tag: 'risky', align: 'neutral', cid: 'tep_highland_cairn_navigate' },
        { text: 'Rebuild the knocked cairn before continuing. Someone coming the other direction will need it.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'tep_highland_cairn_rebuild' }
      ]
    },
    {
      id: 'tep_highland_border_marker',
      title: 'Border Marker Dispute',
      text: 'Two people are arguing on the path beside a boundary stone. One is holding a document. The other is holding an older document. The boundary stone itself has been recently re-cut on one face — the chisel marks are clean. Both of them stop arguing when you arrive.',
      choices: [
        { text: 'A re-cut boundary stone with two competing documents is not a private dispute.', skill: 'wits', tag: 'risky', align: 'neutral', cid: 'tep_highland_border_read' },
        { text: 'Step around them. Highland boundary disputes resolve at the commune level, not on the path.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'tep_highland_border_pass' }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // TRAVEL COMBAT WIRING
  // Inject a bold combat option into every corridor/pool encounter that has choices.
  // ---------------------------------------------------------------------------
  function _makeCombatChoice(biome) {
    return {
      id: 'enc_fight',
      text: 'Step into the open. If they want a fight, they\'ll get one.',
      tag: 'bold',
      skill: 'might',
      action: function(ctx) {
        // Prefer: explicit ctx.biome → static biome arg → dynamic route lookup → fallback
        var b = (ctx && ctx.biome) || biome;
        if (!b && G && G.flags && G.flags._corridor_to && G.flags._corridor_from) {
          b = (typeof window.getBiomeForRoute === 'function')
            ? (window.getBiomeForRoute(G.flags._corridor_to, G.flags._corridor_from) || 'plains')
            : 'plains';
        }
        b = b || 'plains';

        // Heat-gated authority encounter — fires INSTEAD of creature on high heat
        var _polity = (G.flags && G.flags._corridor_polity) || null;
        var _heat = _polity && G.heat && G.heat[_polity] || 0;
        if (_heat >= 5 && Math.random() < 0.4) {
          // High heat: authority confrontation instead of creature
          if (typeof enterAuthorityConfrontation === 'function') {
            enterAuthorityConfrontation(_polity + '_patrol', ctx);
            return;
          }
        } else if (_heat >= 3 && Math.random() < 0.2) {
          // Notice heat: possible authority encounter in addition to creature
          if (typeof enterAuthorityConfrontation === 'function') {
            enterAuthorityConfrontation(_polity + '_roadwarden', ctx);
            return;
          }
        }
        // Otherwise: normal creature encounter
        var pool = (typeof BIOME_ENCOUNTER_POOLS !== 'undefined' && window.BIOME_ENCOUNTER_POOLS && window.BIOME_ENCOUNTER_POOLS[b]) || ['plains_dust_hound'];
        var enemy = pool[Math.floor(Math.random() * pool.length)];
        if (typeof startCombat === 'function') startCombat(enemy, { isBoss: false });
      }
    };
  }

  // Inject combat choice into CORRIDOR_ENCOUNTERS.
  // No biome arg passed here — the action resolves route biome dynamically at fire time
  // via G.flags._corridor_to / _corridor_from set by TRAVEL_CORRIDOR.triggerEncounters.
  (function() {
    var tiers = ['short', 'medium', 'long'];
    tiers.forEach(function(tier) {
      var encounters = window.CORRIDOR_ENCOUNTERS && window.CORRIDOR_ENCOUNTERS[tier];
      if (!encounters) return;
      encounters.forEach(function(enc) {
        if (!enc.choices) return;
        var alreadyHasFight = enc.choices.some(function(c) { return c.id === 'enc_fight'; });
        if (!alreadyHasFight) enc.choices.push(_makeCombatChoice());
      });
    });
  })();

  // Inject into TRAVEL_ENCOUNTER_POOLS after they are all defined (called below)
  function _injectCombatIntoTravelPools() {
    var pools = window.TRAVEL_ENCOUNTER_POOLS;
    if (!pools) return;
    Object.keys(pools).forEach(function(biome) {
      var encounters = pools[biome];
      if (!Array.isArray(encounters)) return;
      encounters.forEach(function(enc) {
        if (!enc.choices) return;
        var alreadyHasFight = enc.choices.some(function(c) { return c.id === 'enc_fight'; });
        if (!alreadyHasFight) enc.choices.push(_makeCombatChoice(biome));
      });
    });
  }

  // Fast-pace extra encounter: when G.pace === 'fast', the corridor controller calls this
  // to add one additional encounter roll from the biome pool.
  window._travelFastPaceExtraEncounter = function(biome) {
    if (!G || !G.flags) return;
    var pool = window.TRAVEL_ENCOUNTER_POOLS[biome] || window.TRAVEL_ENCOUNTER_POOLS['road'] || [];
    if (!pool.length) return;
    // Knight Mounted Discipline: skip extra encounter on horse+fast
    if (G.travelMode === 'horse' && G.archetype && (G.archetype.id || G.archetype || '').toLowerCase() === 'knight') return;
    var enc = pool[Math.floor(Math.random() * pool.length)];
    if (!enc) return;
    if (typeof addNarration === 'function') addNarration(enc.title, enc.text);
    if (typeof renderChoices === 'function') setTimeout(function() { renderChoices(enc.choices); }, 300);
  };

  // Inject combat choices into travel pools now that all pools are defined
  _injectCombatIntoTravelPools();

  // Export so handleChoice __journey__ path can wrap corridor choices correctly
  window._wrapEncounterChoices = _wrapEncounterChoices;

})();
