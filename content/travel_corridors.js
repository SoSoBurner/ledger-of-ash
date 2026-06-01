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
    'soreheim_proper|eternal_lands':       { tier:'long',   biome:'sea',     foot:0,    horse:0,    cart:0,    boat:21.0 },
    'eternal_lands|soreheim_proper':       { tier:'long',   biome:'sea',     foot:0,    horse:0,    cart:0,    boat:21.0 }
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
            skill: 'survival', tag: 'risky', align: 'neutral',
            cid: 'corridor_scavenge_short_search',
            action: function() {
              var r = (typeof rollD20 === 'function') ? rollD20('vigor', (G && G.skills ? G.skills.survival : 0)) : {roll:10,total:10,isCrit:false,isFumble:false};
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
            skill: 'survival', tag: 'safe', align: 'neutral',
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
            skill: 'survival', tag: 'risky', align: 'neutral',
            cid: 'corridor_scavenge_medium_search',
            action: function() {
              var r = (typeof rollD20 === 'function') ? rollD20('vigor', (G && G.skills ? G.skills.survival : 0)) : {roll:10,total:10,isCrit:false,isFumble:false};
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
            skill: 'lore', tag: 'safe', align: 'neutral',
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
            skill: 'survival', tag: 'bold', align: 'neutral',
            cid: 'corridor_scavenge_long_search',
            action: function() {
              var r = (typeof rollD20 === 'function') ? rollD20('vigor', (G && G.skills ? G.skills.survival : 0)) : {roll:10,total:10,isCrit:false,isFumble:false};
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
            skill: 'survival', tag: 'safe', align: 'neutral',
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
            if (typeof addJournal === 'function') addJournal('Rested at Fairhaven East Waystation.', 'field_note');
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
            if (typeof addJournal === 'function') addJournal('Rested at Soreheim Border Allocation Post.', 'field_note');
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
      locality: 'aurora_crown',
      name: 'Dome Perimeter Rest Stop',
      desc: 'A Dome Stewards-maintained rest point at the Sheresh perimeter. The dome-light is close enough here to read by without a lamp. Insulated sleeping rolls are stored in a locked rack — key on a hook above the door, available to travelers. The cold through the walls is steady, not cutting.',
      choices: [
        { text: 'Dome-light does not stop. Sleep is possible if the cold is manageable.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: 'anchor_make_camp_sheresh',
          action: function() {
            var heal = Math.min(3, ((G.maxHp || 14) - (G.hp || 14)));
            if (heal > 0 && typeof modHP === 'function') modHP(heal);
            G.fatigue = Math.max(0, (G.fatigue || 0) - 2);
            if (typeof addNarration === 'function') addNarration('', 'The dome-light does not follow a day cycle — it is steady, not bright. The insulated roll is cold at first. By the second hour it holds its warmth. You sleep through the dome-glow.');
            if (typeof addJournal === 'function') addJournal('Rested at Dome Perimeter Rest Stop.', 'field_note');
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
            if (typeof addJournal === 'function') addJournal('Rested at Ash Road Iron Station.', 'field_note');
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
  // Helper: resolve macroregion from locality IDs
  // ---------------------------------------------------------------------------
  function resolveMacroregion(fromId, toId) {
    var from = LOCALITY_MACROREGION[fromId] || 'principalities';
    var to   = LOCALITY_MACROREGION[toId]   || 'principalities';
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
      if (typeof advanceTime === 'function') advanceTime(totalDays);
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

      if (typeof _setMapOverlayContent === 'function') {
        _setMapOverlayContent(
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
        { text: 'Stop moving. Let it show itself or move off.', skill: 'stealth', tag: 'risky', align: 'neutral', cid: 'tep_forest_treeline_wait' },
        { text: 'Change direction sharply and cut behind it.', skill: 'survival', tag: 'bold', align: 'neutral', cid: 'tep_forest_treeline_flank' },
        { text: 'Keep the pace and give it nothing to read.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'tep_forest_treeline_ignore' }
      ]
    },
    {
      id: 'tep_forest_deadfall',
      title: 'Deadfall Crossing',
      text: 'The path drops into a dry creek bed choked with deadfall — trunks across the crossing point, bark stripped, cut ends showing. Someone cleared this deliberately, then left the trunks in place. The crossing is passable but slow. Fresh boot prints go in and do not come out the other side.',
      choices: [
        { text: 'The prints go in. Someone is waiting at the deadfall.', skill: 'survival', tag: 'risky', align: 'neutral', cid: 'tep_forest_deadfall_careful' },
        { text: 'Find a crossing upstream. The deadfall is the point.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'tep_forest_deadfall_detour' }
      ]
    },
    {
      id: 'tep_forest_old_camp',
      title: 'Abandoned Camp',
      text: 'A camp that was occupied recently: fire ring with ash still warm at the center, cut brush arranged as windbreak, three cord ties on a branch overhead where packs were hung. Left in order, not abandoned in a hurry. A chalk mark on the nearest trunk — a direction arrow, pointing back toward the road.',
      choices: [
        { text: 'Warm ash and chalk arrows mean someone is coming back here.', skill: 'lore', tag: 'risky', align: 'neutral', cid: 'tep_forest_camp_wait' },
        { text: 'Follow the chalk direction. Whoever left it wants it followed.', skill: 'survival', tag: 'bold', align: 'neutral', cid: 'tep_forest_camp_follow' },
        { text: 'Leave it as found. Forest camps are operational — not yours to read.', skill: 'stealth', tag: 'safe', align: 'neutral', cid: 'tep_forest_camp_leave' }
      ]
    },
    {
      id: 'tep_forest_toll',
      title: 'Unofficial Toll',
      text: 'Two people block the narrow section of path where the trees press closest. They have a rope across the track at knee height, slack enough to step over. The taller one names a figure. It is not high. The other is watching your hands.',
      choices: [
        { text: 'The figure is low enough to mean this is a test, not a profession.', skill: 'persuasion', tag: 'risky', align: 'neutral', cid: 'tep_forest_toll_talk' },
        { text: 'Pay it. Low toll, specific location — road knowledge has value here.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'tep_forest_toll_pay' },
        { text: 'Step the rope and move through them before they decide what to do about it.', skill: 'combat', tag: 'bold', align: 'chaotic', cid: 'tep_forest_toll_push' }
      ]
    },
    {
      id: 'tep_forest_sinkhole',
      title: 'Sinkhole on the Track',
      text: 'The track ends at a sinkhole roughly three meters across, edges raw — recent collapse. Cart ruts go up to the edge and stop. On the far side, the ruts resume. Whatever made them went through here before the ground gave.',
      choices: [
        { text: 'Work around the perimeter. The collapse is not finished.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'tep_forest_sinkhole_around' },
        { text: 'Check the depth. A shallow sinkhole has a different explanation than a deep one.', skill: 'lore', tag: 'risky', align: 'neutral', cid: 'tep_forest_sinkhole_check' }
      ]
    }
  ];

  window.TRAVEL_ENCOUNTER_POOLS['road'] = window.TRAVEL_ENCOUNTER_POOLS['road'] || [
    {
      id: 'tep_road_milestone',
      title: 'Tampered Milestone',
      text: 'The league marker at the road edge has been turned to face the ditch — no vandalism otherwise, no damage, just rotated. The Roadwarden dispatch box at its base has a fresh seal mark from this morning. Someone turned it after the warden passed.',
      choices: [
        { text: 'A turned milestone on a staffed route is a signal, not an accident.', skill: 'lore', tag: 'risky', align: 'neutral', cid: 'tep_road_milestone_read' },
        { text: 'Rotate it back and keep moving. The warden will not notice either way.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'tep_road_milestone_restore' }
      ]
    },
    {
      id: 'tep_road_warden_post',
      title: 'Warden Post Empty',
      text: 'The Roadwarden post at this junction is staffed — lantern lit, door open, boots visible under the desk inside. But no one answers when you call at the window. The transit log on the counter is open to today\'s date. The last entry is two hours old.',
      choices: [
        { text: 'Two hours and no entry means something interrupted the post mid-shift.', skill: 'lore', tag: 'risky', align: 'neutral', cid: 'tep_road_warden_investigate' },
        { text: 'Log yourself in the transit book and move. The post\'s problem is its own.', skill: 'persuasion', tag: 'safe', align: 'neutral', cid: 'tep_road_warden_self_log' }
      ]
    }
  ];

  window.TRAVEL_ENCOUNTER_POOLS['sea'] = window.TRAVEL_ENCOUNTER_POOLS['sea'] || [
    {
      id: 'tep_sea_following_vessel',
      title: 'Vessel Running Parallel',
      text: 'A smaller boat has been matching your vessel\'s course for the last two hours — close enough to read its lines, too far to hail comfortably. No flag. No hull mark visible at this distance. When your vessel adjusts heading, it adjusts. The captain has noticed.',
      choices: [
        { text: 'A vessel that shadows without flagging is reading cargo or route, not requesting passage.', skill: 'lore', tag: 'risky', align: 'neutral', cid: 'tep_sea_following_read' },
        { text: 'Put distance on it. Change speed. See whether it holds or falls back.', skill: 'survival', tag: 'bold', align: 'neutral', cid: 'tep_sea_following_evade' },
        { text: 'It is the captain\'s water and the captain\'s problem. Stay out of it.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'tep_sea_following_ignore' }
      ]
    },
    {
      id: 'tep_sea_manifest_dispute',
      title: 'Manifest Dispute',
      text: 'The captain calls you to the cargo hold. Three crates have been stacked against one marked in the manifest as empty. The seal on the empty crate is different from the others — older, from a routing office that closed two years ago. Someone loaded this before your departure.',
      choices: [
        { text: 'A sealed crate with a closed office mark is not empty. Open it.', skill: 'lore', tag: 'bold', align: 'neutral', cid: 'tep_sea_manifest_open' },
        { text: 'The manifest discrepancy belongs to the captain, not to a passenger.', skill: 'persuasion', tag: 'safe', align: 'neutral', cid: 'tep_sea_manifest_pass' }
      ]
    }
  ];

  window.TRAVEL_ENCOUNTER_POOLS['highland'] = window.TRAVEL_ENCOUNTER_POOLS['highland'] || [
    {
      id: 'tep_highland_weather_turn',
      title: 'Weather Coming In',
      text: 'The cloud base has dropped three hundred meters in the last hour. The path ahead is still visible but the next ridge is not. Highland travelers coming the other direction are moving faster than is comfortable on this terrain. One of them gives you a single look but does not stop.',
      choices: [
        { text: 'Make the ridge before the cloud closes. The other travelers are reading it right.', skill: 'survival', tag: 'bold', align: 'neutral', cid: 'tep_highland_weather_push' },
        { text: 'Find a sheltered position and wait for the cloud to lift or commit.', skill: 'lore', tag: 'safe', align: 'neutral', cid: 'tep_highland_weather_shelter' }
      ]
    },
    {
      id: 'tep_highland_cairn_chain',
      title: 'Cairn Chain Broken',
      text: 'The waymarker cairns on this section of path run at fifty-meter intervals. One is knocked over — not collapsed, knocked, stones scattered in a fan pattern. The next cairn is intact. The one after that is gone entirely. The path continues but unmarked for a stretch ahead.',
      choices: [
        { text: 'A knocked cairn means someone came through here in a hurry or with a reason.', skill: 'lore', tag: 'risky', align: 'neutral', cid: 'tep_highland_cairn_read' },
        { text: 'Navigate by terrain to the next visible waymark. The path is recoverable.', skill: 'survival', tag: 'risky', align: 'neutral', cid: 'tep_highland_cairn_navigate' },
        { text: 'Rebuild the knocked cairn before continuing. Someone coming the other direction will need it.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'tep_highland_cairn_rebuild' }
      ]
    },
    {
      id: 'tep_highland_border_marker',
      title: 'Border Marker Dispute',
      text: 'Two people are arguing on the path beside a boundary stone. One is holding a document. The other is holding an older document. The boundary stone itself has been recently re-cut on one face — the chisel marks are clean. Both of them stop arguing when you arrive.',
      choices: [
        { text: 'A re-cut boundary stone with two competing documents is not a private dispute.', skill: 'lore', tag: 'risky', align: 'neutral', cid: 'tep_highland_border_read' },
        { text: 'Step around them. Highland boundary disputes resolve at the commune level, not on the path.', skill: 'survival', tag: 'safe', align: 'neutral', cid: 'tep_highland_border_pass' }
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
