/**
 * PLUME'S END OUTPOST STAGE 2 ENRICHED CHOICES
 * Investigation arc: northern frontier hazard readings / staging location proximity
 * NPCs: Patrol Leader (Patrol Leader), Shrine Keeper Cysur (Shrine Keeper), Letha Dawnsilk (Hazard Reader)
 */

const PLUMES_END_OUTPOST_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Letha Dawnsilk's Northern Road Hazard Station tracks atmospheric glyph pressure — her readings show a persistent pressure gradient pointing northwest toward the staging location.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'analyzing northern hazard readings with Letha Dawnsilk');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_letha_dawnsilk = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Letha's readings are unambiguous. The pressure gradient has been building for four months, emanating from a fixed point northwest at approximately three days' travel on foot. The gradient matches Watchers Perch cave output calculations exactly. She has mapped the pressure cone and can identify the source point within a half-day's travel radius. She gives you the map.`;
        addJournal("Letha's hazard map pinpoints pressure source within half-day radius northwest — staging location identified", 'evidence', `plumes-letha-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `You disturb Letha's calibrated instruments during the conversation. The disruption creates a false reading event in her log. She is professionally frustrated and closes the consultation.`;
        addJournal('Hazard instrument disrupted — false reading logged, consultation closed', 'complication', `plumes-letha-fail-${G.dayCount}`);
      } else {
        G.flags.met_letha_dawnsilk = true;
        G.investigationProgress++;
        G.lastResult = `Letha confirms the persistent northwest pressure gradient. She has been filing hazard elevation reports for four months. The reports were acknowledged but no action was taken. "The gradient is not natural. Natural gradients don't hold position for four months."`;
        addJournal('Persistent northwest pressure gradient — non-natural duration, reports unacted upon', 'evidence', `plumes-letha-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Patrol Leader has been running northern road patrols and has encountered a structure that does not appear on any survey map — the staging location.",
    tags: ['NPC', 'Combat', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'questioning Patrol Leader about unmapped northern structure');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('combat', (G.skills.combat||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_patrol_leader = true;
        G.investigationProgress++;
        G.lastResult = `The Patrol Leader has been to the structure twice. It is a fortified supply depot with active guard rotation — Soreheim military insignia on the perimeter posts, not local Outpost authority. He was warned off on the second visit by a patrol with Warden Order badges riding under Soreheim authorization. The structure is jointly held by two factions of the investigation.`;
        addJournal('Staging structure confirmed: Soreheim military + Warden Order joint control — Patrol Leader warned off', 'evidence', `plumes-patrol-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The Patrol Leader filed an official incident report about the structure. Your questions about the same structure mark you as connected to the original incident. He detains you briefly for questioning by his superior.`;
        addJournal('Patrol incident connection — detained for questioning by patrol superior', 'complication', `plumes-patrol-fail-${G.dayCount}`);
      } else {
        G.flags.met_patrol_leader = true;
        G.investigationProgress++;
        G.lastResult = `The Patrol Leader describes the unmapped structure. Fortified, guarded, operating under authority that overrides local patrol access. "I've patrolled that road for eight years. That building wasn't there two years ago."`;
        addJournal('Unmapped fortified structure on northern road — built within 2 years, overrides local patrol', 'evidence', `plumes-patrol-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Shrine Keeper Cysur's shrine records include travelers' accounts — a cluster of travelers have described the northwestern structure and its connection to 'the pressure management work.'",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reviewing traveler accounts at Shrine of Cysur');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_shrine_keeper_cysur = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The shrine accounts include a traveler who worked at the structure for six weeks before leaving. The traveler described "pressure management work" involving compound dispensing equipment aimed at Watchers Perch cave. They described a second cache — the one Vorgul Oxtend confirmed — stored in the structure's lower level under military guard. The traveler has since disappeared from any registry.`;
        addJournal("Shrine traveler account: pressure management compound dispensing at cave + second cache confirmed — worker missing", 'evidence', `plumes-cysur-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `The shrine's traveler accounts are protected under Cysur's doctrinal confidentiality. The shrine is a place of sanctuary; its records are not investigative resources.`;
        addJournal('Shrine traveler accounts protected under Cysur doctrine — not investigative records', 'complication', `plumes-cysur-fail-${G.dayCount}`);
      } else {
        G.flags.met_shrine_keeper_cysur = true;
        G.investigationProgress++;
        G.lastResult = `The shrine keeper shares that travelers have described the structure in account fragments across four months. Collectively they describe a fortified operation focused on something in the northwestern hills. "They come through here afraid of what they know. That's unusual."`;
        addJournal('Shrine traveler fragments describe northwestern fortified operation — witnesses arrive afraid', 'evidence', `plumes-cysur-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Shrine Keeper Cysur has been keeping something back. A second conversation — after the shrine clears of travelers — may draw it out.",
    tags: ['Stage2', 'NPC'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'second conversation with Shrine Keeper Cysur');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.cysur_second_meeting = true;
        G.investigationProgress++;
        G.lastResult = `Cysur waits until the last caravan hand leaves the shrine, then closes the door. She pulls a folded paper from behind the offering ledger — a transit receipt, signed with a Warden Order seal, for a cargo load described as "pressure stabilization components." Delivered four months ago to a northern waypoint that doesn't appear on any public route list. She found it tucked inside a pilgrim's donation pouch. "I kept it because I didn't know who was safe to give it to."`;
        addJournal('Cysur: Warden Order transit receipt for pressure stabilization components — delivered to unlisted northern waypoint', 'evidence', `plumes-cysur2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Cysur's expression closes the moment you press. A Roadwarden steps into the shrine doorway behind you — routine patrol timing, but the coincidence reads badly. She gestures toward the door. "This is a place of passage. Not of questions."`;
        addJournal('Cysur closed second meeting — Roadwarden presence noted, shrine relationship strained', 'complication', `plumes-cysur2-fail-${G.dayCount}`);
      } else {
        G.flags.cysur_second_meeting = true;
        G.investigationProgress++;
        G.lastResult = `Cysur confirms what she withheld before. Three of the frightened travelers she mentioned weren't passing through — they were leaving the structure for good. All three described the same thing: a second chamber below the main floor, accessed through a locked grate, with equipment she didn't recognize from their descriptions. She never reported it. "I pray for travelers. I don't manage what they carry."`;
        addJournal('Cysur confirms: departing workers described sub-floor chamber with unidentified equipment at staging structure', 'evidence', `plumes-cysur2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The staging structure's guard rotation has a gap — a narrow window between the northern and western patrol legs where the tree line reaches within thirty meters of the outer wall.",
    tags: ['Stage2', 'Scouting'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'scouting the staging structure guard rotation');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.staging_structure_scouted = true;
        G.investigationProgress++;
        G.lastResult = `The rotation gap is eleven minutes, not the eight you estimated. You get close enough to read the perimeter posts: standard Soreheim military marking on the east face, a second mark below it — a Warden Order brand, newer, applied over the original paint. Through the northern embrasure you count three guards on the upper level and hear the sound of mechanical cycling below the floor — a pump or compressor running at intervals. The lower chamber is real.`;
        addJournal('Staging structure: dual-branded perimeter, Warden Order over Soreheim military — sub-floor mechanical equipment confirmed audible', 'evidence', `plumes-scout-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You close to within fifty meters before a guard dog picks up the scent from the wrong angle. You pull back into the tree line without being seen, but the dog's alert prompts a full rotation check — the gap closes, and a fourth guard is added to the northern leg for the rest of the day. The rotation is now tighter.`;
        addJournal('Scout attempt blown by guard dog — staging structure rotation tightened, watchfulness elevated', 'complication', `plumes-scout-fail-${G.dayCount}`);
      } else {
        G.flags.staging_structure_scouted = true;
        G.investigationProgress++;
        G.lastResult = `You hold position in the tree line for two rotation cycles and confirm the gap is real — eleven minutes between the northern and western legs passing the blind corner. Four guards on rotation, a fifth stationed at the main entry. The structure is larger than the Patrol Leader described: a second roofline visible behind the first, extending back into the hillside. Whatever the main building holds, there is more behind it.`;
        addJournal('Staging structure: 5-guard rotation confirmed, secondary roofline extending into hillside — structure larger than reported', 'evidence', `plumes-scout-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A Roadwarden checkpoint at the northern gate requires stating your business before you pass. The wrong answer here is anything vague.",
    tags: ['Stage2', 'Social'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'navigating Roadwarden checkpoint friction');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.roadwarden_checkpoint_passed = true;
        G.investigationProgress++;
        G.lastResult = `The Roadwarden on the gate is thorough but fair. You give him a trade purpose, specific enough to check and mundane enough to not warrant it. He stamps the transit log and waves you through. As he hands back your mark, he lowers his voice: "Whatever you're looking into up north — three other travelers asked about the same road this month. None of them came back through this gate."`;
        addJournal('Roadwarden checkpoint: three prior travelers asked about northern road — none returned through the gate', 'intelligence', `plumes-checkpoint-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The Roadwarden flags your transit record for a secondary hold — your stated purpose doesn't match the route you came in on. You spend two hours in the waystation anteroom while a second Roadwarden cross-checks your documents. The delay is noted in the outpost log, keyed to your name and arrival date.`;
        addJournal('Flagged at Roadwarden checkpoint — secondary hold, name logged against northern road inquiry', 'complication', `plumes-checkpoint-fail-${G.dayCount}`);
      } else {
        G.flags.roadwarden_checkpoint_passed = true;
        G.investigationProgress++;
        G.lastResult = `The gate Roadwarden is satisfied with your stated purpose but adds a note to the transit log regardless — standard procedure for anyone heading north of the outpost boundary. The stamp goes in. He doesn't look up when he says it: "Route law applies past the marker. Anything you find out there, you're responsible for documenting through us."`;
        addJournal('Roadwarden checkpoint passed — northern transit logged, route law reminder issued', 'intelligence', `plumes-checkpoint-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A northern road driver keeps a private log. He was there during the structure's construction.",
    tags: ['Stage2', 'Lore'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'reviewing caravan driver traffic log for construction and supply entries');
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_caravan_driver_osset = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The driver — Osset Halvarn, who keeps his private log in a worn oilskin pouch stitched to the underside of his cart bench — opens to a section flagged with a strip of red leather. The first entry describing the structure is fourteen months old: a construction crew of twenty-two, moving in on a road that hadn't existed the previous season. Four entries across the following three months document supply wagons arriving under Soreheim military tarp with Warden Order outriders. The first chemical delivery is described by smell — "sharp, like copper left in rain." The entry is underlined twice.`;
        addJournal('Driver Osset Halvarn log: structure construction 14 months ago, chemical delivery described by smell — Warden Order outriders', 'evidence', `plumes-osset-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Halvarn's expression closes before you finish the first sentence about the northern road. "I don't keep written notes about other people's cargo. That's how drivers stay employed." He straightens the tarp on his load and checks the rear harness. The oilskin pouch pressed against the bench frame is visible for a moment as he shifts position, but he does not acknowledge it. The conversation is over before it started.`;
        addJournal('Caravan driver declined — stated no written cargo notes, oilskin log not mentioned', 'complication', `plumes-osset-fail-${G.dayCount}`);
      } else {
        G.flags.met_caravan_driver_osset = true;
        G.investigationProgress++;
        G.lastResult = `Halvarn confirms he drove the northern road during the structure's construction phase. He won't open the log here, but he describes from memory: a crew of over twenty, unauthorized road cut through a surveyed timber tract, supply deliveries that smelled wrong for standard construction materials. "Copper and something underneath it. You know the smell is wrong when the horses start moving to the far side of the road." He closes the bench lid without showing what's under it.`;
        addJournal('Driver confirms construction crew, unauthorized road cut, and chemical cargo smell on northern route', 'intelligence', `plumes-osset-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The outpost manifest has a requisition category that feeds the northern route, not the outpost.",
    tags: ['Stage2', 'Lore'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'tracing phantom supply requisition category feeding the northern route');
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.phantom_requisition_traced = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The manifest category is labelled "remote station support" — a Roadwarden administrative designation that exists but is normally used for auxiliary supply caches, not active facilities. Eighteen months of entries. Every delivery routed under that category moves out of the outpost within forty-eight hours on a northern heading, under the same transport authorization: a Warden Order standing requisition countersigned by a Shelkopolis command line. The outpost is a pass-through point, not the destination. It has been functioning as a logistics node for the staging structure since before the structure was finished.`;
        addJournal('Outpost remote-station requisitions: Warden Order standing auth, Shelkopolis countersign, 18-month northern routing', 'evidence', `plumes-manifest-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The manifest is a Roadwarden operational document — access requires a Roadwarden administrative credential or formal audit request through Fairhaven post command. The duty officer at the intake desk is polite about it: "That's not a public register." Your name goes into the inquiry log as standard procedure. The manifest stays behind the desk.`;
        addJournal('Outpost manifest access denied — Roadwarden credential required, inquiry logged', 'complication', `plumes-manifest-fail-${G.dayCount}`);
      } else {
        G.flags.phantom_requisition_traced = true;
        G.investigationProgress++;
        G.lastResult = `The duty officer finds the category in question without prompting — she has been trying to reconcile it herself. "Remote station support is supposed to attach to a registered auxiliary cache. I have no registration for whatever this is feeding." She closes the manifest before you can read the authorization countersignature. "I'm not supposed to share authorization details. But the category exists and it moves goods north."`;
        addJournal('Outpost duty officer confirms phantom requisition category — feeds unregistered northern point', 'intelligence', `plumes-manifest-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Plume's End Outpost finale — the staging location is physically located. Scout it formally with Patrol Leader backup or use Letha's map to infiltrate quietly.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 112,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(112, "Plume's End Outpost Stage 2 resolution");
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Outpost investigation needs more evidence before approaching the staging location.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You brief the Patrol Leader with the full evidence chain and request an official scouting operation. The Patrol Leader formally escalates to Roadwarden Fairhaven post command. A joint patrol is authorized. The staging structure is officially confirmed, documented, and its coordinates submitted to Shelkopolis command. Stage III opens with confirmed staging location on the institutional record.`;
        addJournal("Plumes End S2 finale: official patrol documents staging location — submitted to Shelkopolis command", 'evidence', `plumes-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You use Letha's precise map to approach the staging structure alone, document its contents and the second compound cache, and transmit the documentation to the Verdant Row network from a position outside the guard perimeter. The structure's existence and contents are public before dawn.`;
        addJournal("Plumes End S2 finale: solo infiltration, staging structure documented and distributed", 'evidence', `plumes-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.PLUMES_END_OUTPOST_STAGE2_ENRICHED_CHOICES = PLUMES_END_OUTPOST_STAGE2_ENRICHED_CHOICES;
