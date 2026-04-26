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

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_letha_dawnsilk = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Letha's readings are unambiguous. The pressure gradient has been building for four months, emanating from a fixed point northwest at approximately three days' travel on foot. The gradient matches Watchers Perch cave output calculations exactly. She has mapped the pressure cone and can identify the source point within a half-day's travel radius. She gives you the map.`;
        addJournal("Letha's hazard map pinpoints pressure source within half-day radius northwest — staging location identified", 'evidence', `plumes-letha-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `A gesture toward the instrument array catches one of the calibration weights — the scale tips, the needle swings, and Letha's hand shoots out to stabilize it before she even looks up. The false reading is already in her log by the time the needle settles. She marks it with a red pencil and writes the time. "Six months of clean data." She doesn't raise her voice. She closes the instrument housing with both hands and turns back to her desk. The consultation is over.`;
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


      const result = rollD20('might', (G.skills.combat||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_patrol_leader = true;
        G.investigationProgress++;
        G.lastResult = `The Patrol Leader has been to the structure twice. It is a fortified supply depot with active guard rotation — Soreheim military insignia on the perimeter posts, not local Outpost authority. He was warned off on the second visit by a patrol with Warden Order badges riding under Soreheim authorization. The structure is jointly held by two factions of the investigation.`;
        addJournal('Staging structure confirmed: Soreheim military + Warden Order joint control — Patrol Leader warned off', 'evidence', `plumes-patrol-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The Patrol Leader's expression shifts the moment the structure's location comes up. He filed a formal incident report three weeks ago — unauthorized facility, northern road, overriding local patrol access. Your questions track the same geography. He has you wait at the patrol desk while he sends a runner to his superior. Twenty minutes in a side room with no windows. The superior asks the same questions twice and releases you with a notation in the patrol incident file. Your name is now attached to the original report.`;
        addJournal('Patrol incident connection — detained for questioning by patrol superior', 'complication', `plumes-patrol-fail-${G.dayCount}`);
      } else {
        G.flags.met_patrol_leader = true;
        G.investigationProgress++;
        G.lastResult = `The Patrol Leader keeps his voice level and his eyes on the road map pinned to the wall behind you. The structure: fortified perimeter, active guard rotation, authorization papers that override local patrol access when he tried to log it. "I've patrolled that road for eight years. That building wasn't there two years ago." He taps the map without touching the location. "Whatever it is, it outranks me, and nobody above me has told me what it's for."`;
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


      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_shrine_keeper_cysur = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The shrine accounts include a traveler who worked at the structure for six weeks before leaving. The traveler described "pressure management work" involving compound dispensing equipment aimed at Watchers Perch cave. They described a second cache — the one Vorgul Oxtend confirmed — stored in the structure's lower level under military guard. The traveler has since disappeared from any registry.`;
        addJournal("Shrine traveler account: pressure management compound dispensing at cave + second cache confirmed — worker missing", 'evidence', `plumes-cysur-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `The shrine's traveler accounts are protected under Cysur's doctrinal confidentiality. The shrine is a place of sanctuary; what is spoken here is not for outside hands.`;
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

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
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

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
    label: "A northern road driver keeps a private log from the construction period.",
    tags: ['Stage2', 'Lore'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'reviewing caravan driver traffic log for construction and supply entries');
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_caravan_driver_osset = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The driver — Osset Halvarn, who unlatches the bench compartment with a single knuckle-tap before he lifts the lid, as if announcing himself to what's inside — opens his oilskin log to a section flagged with red leather. The first entry describing the structure is fourteen months old: a construction crew of twenty-two, moving in on a road that hadn't existed the previous season. Four entries across the following three months document supply wagons arriving under Soreheim military tarp with Warden Order outriders. The first chemical delivery is described by smell — "sharp, like copper left in rain." The entry is underlined twice.`;
        addJournal('Driver Osset Halvarn log: structure construction 14 months ago, chemical delivery described by smell — Warden Order outriders', 'evidence', `plumes-osset-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Halvarn's expression closes before you finish the first sentence about the northern road. "I don't keep written notes about other people's cargo. That's how drivers stay employed." He turns to check the rear harness without looking back. When he settles into his seat again, his knuckle taps the bench compartment lid once — muscle memory — but his hand stays flat on top. The conversation is over before it started.`;
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
    label: "The outpost manifest has a requisition category that feeds the northern route.",
    tags: ['Stage2', 'Lore'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'tracing phantom supply requisition category feeding the northern route');
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
    label: "The outpost smithy repairs field equipment — the smith has seen what the northern crews bring in for maintenance.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'speaking with outpost smith Brann Veld about northern equipment repairs');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_smith_brann_veld = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Brann Veld sets down his hammer when you ask about the northern crews, and the deliberateness of it is notable — a man who stops working to talk has decided something. Over the past year he has repaired three different pumping assemblies brought down from the northern structure, each one corroded in the same way: a chemical byproduct residue that eats brass fittings from the inside. He pulled the same residue from a compressor housing two months ago. He saved a sample in a tin on the shelf above the forge. He pushes it across the bench to you without being asked.`;
        addJournal('Smith Brann Veld: chemical corrosion residue from northern pump repairs — physical sample recovered', 'evidence', `plumes-smith-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Brann Veld is midway through a bearing replacement when you approach and does not slow down. His answers are short and angled away from anything specific: he repairs what comes in, he doesn't ask where it's been. A Roadwarden auxiliary sitting by the door eating midday rations is watching the exchange with the patience of a man with nothing else to do. The smith's posture closes. "Work to finish." He turns back to the bench.`;
        addJournal('Smith declined — Roadwarden auxiliary presence closed conversation', 'complication', `plumes-smith-fail-${G.dayCount}`);
      } else {
        G.flags.met_smith_brann_veld = true;
        G.investigationProgress++;
        G.lastResult = `Brann Veld confirms he has repaired equipment from the northern structure across several visits — pumping assemblies and valve housings, all showing the same unusual wear pattern. Corrosion on internal brass surfaces from something moving through the lines that wasn't water. He doesn't name the compound but shows you the fittings still in the bin: the metal has a greenish cast where the erosion is deepest, the color even, not rust.`;
        addJournal('Smith confirms chemical erosion in northern pump fittings — unusual internal corrosion pattern', 'intelligence', `plumes-smith-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The outpost's supply depot clerk has a discrepancy she flagged and then was told to un-flag.",
    tags: ['Stage2', 'Archive'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reviewing supply depot discrepancy with clerk Pella Orn');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_clerk_pella_orn = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Pella Orn pulls the original flag from a personal ledger she keeps separate from the official intake record — a habit, she says, from six years of watching corrections arrive after the fact. The discrepancy: eleven months ago, a consignment of sixty sealed canisters passed through under a Roadwarden transit pass that listed their contents as "atmospheric calibration equipment." The weight on the weigh ticket was wrong for the declared contents by a factor of three. She flagged it. A senior Roadwarden countersigned a correction the next day and told her the weight difference was permitted under a Warden Order charter clause she had never heard of. She wrote it down verbatim.`;
        addJournal('Clerk Pella Orn: canister consignment weight falsified — Warden Order charter clause invoked to override flag', 'evidence', `plumes-clerk-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Pella Orn is at the intake window when you arrive and the queue behind you makes a private conversation impossible. When you ask about discrepancies on northern transit passes, her expression stays neutral with the practiced stillness of someone who has learned not to react at the wrong moment. She hands you a standard intake form. "Fill that out if you have a formal goods query." The window slides closed.`;
        addJournal('Depot clerk closed intake window — wrong setting for inquiry, watchfulness elevated', 'complication', `plumes-clerk-fail-${G.dayCount}`);
      } else {
        G.flags.met_clerk_pella_orn = true;
        G.investigationProgress++;
        G.lastResult = `Pella Orn confirms the discrepancy exists in her personal notes. A consignment of sealed canisters — declared as atmospheric calibration equipment — had a weight-ticket anomaly she reported and was told to correct. The correction came fast, from above her chain. "When corrections arrive the same day, someone is watching the intake logs." She doesn't say more than that but slides her personal ledger an inch closer to your side of the counter.`;
        addJournal('Depot clerk: canister weight discrepancy corrected same-day from above — intake logs under active watch', 'intelligence', `plumes-clerk-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The northern tree line holds a camp marker from a survey team that stopped returning reports six weeks ago.",
    tags: ['Stage2', 'Scouting'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'locating abandoned survey camp marker on northern tree line');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.survey_camp_found = true;
        G.investigationProgress++;
        G.lastResult = `The marker is still standing — a survey stake with a blue flag that has gone brittle in the weather. Thirty meters behind it, in the shallow of a spruce stand, the camp: two collapsed lean-tos, a fire ring cold for weeks, and a survey kit left open on its side. Inside the kit's waterproof inner case, wrapped in oilskin, a half-completed map. The map shows the northern structure in elevation detail, annotated with measurements. A note in the margin, in a cramped hand: "Sub-floor access confirmed via service hatch, north face. Guard rotation 8-minute gap, dusk only." The map is dated five weeks ago.`;
        addJournal('Abandoned survey camp: elevation map of staging structure with sub-floor access note — 5 weeks old', 'evidence', `plumes-survey-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The tree line is dense enough that the marker could be anywhere in a quarter-mile stretch. You spend the better part of the afternoon ranging through wet spruce and emerge at the road with nothing but scratches and the particular exhaustion of searching for something that may have already been cleared. A staging structure patrol passes on the road while you are emerging from the trees. They note the direction and keep moving.`;
        addJournal('Survey camp not located — staging structure patrol observed your tree line emergence', 'complication', `plumes-survey-fail-${G.dayCount}`);
      } else {
        G.flags.survey_camp_found = true;
        G.investigationProgress++;
        G.lastResult = `The camp is there, abandoned in the disarray of a fast departure: food stores left open, one lean-to still standing, the fire ring scattered as though kicked out in a hurry. The survey kit is gone, but a single stake map remains tacked to the standing lean-to — a rough elevation sketch of the northern structure showing three above-ground levels. No annotations. The survey team left in a hurry and left this behind.`;
        addJournal('Abandoned survey camp found: structure elevation sketch recovered — team departed fast, kit gone', 'discovery', `plumes-survey-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Letha Dawnsilk's instrument housing holds a calibration record that predates her assignment by eight months.",
    tags: ['Stage2', 'Lore'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'examining pre-assignment calibration record in Letha Dawnsilk hazard station');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.letha_early_record_found = true;
        G.investigationProgress++;
        G.lastResult = `The calibration record is in a different hand than Letha's — her predecessor, a hazard reader named Aldec Sorn, posted here before her. Sorn's records show normal baseline pressure for the region until a specific date: eighteen months ago, the baseline shifts upward by a measurable increment and holds at the new level permanently. Sorn flagged it, labeled it "anthropogenic source — awaiting Warden Order assessment," and was transferred out of the post three weeks later. There is no assessment in the file. Letha never knew the baseline had changed.`;
        addJournal('Letha station: predecessor Aldec Sorn flagged pressure baseline shift 18 months ago — transferred 3 weeks later, no assessment on record', 'evidence', `plumes-letha2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The instrument housing is a sealed unit — the calibration record inside is accessible only with the hazard reader's maintenance key. Letha keeps it on her person. When you reach past the housing to examine the back mounting bracket, she moves to stand between you and the instrument without saying anything. Her hand rests on the housing latch. "The instruments are calibrated by me and by me only."`;
        addJournal('Hazard station calibration record inaccessible — Letha guards housing access', 'complication', `plumes-letha2-fail-${G.dayCount}`);
      } else {
        G.flags.letha_early_record_found = true;
        G.investigationProgress++;
        G.lastResult = `Letha opens the calibration record herself when you describe what you are looking for — she has been curious about the same question. Her predecessor's entries end abruptly. The final entry is dated eighteen months ago: a pressure baseline notation marked "review required," with a Warden Order referral number that corresponds to no document she has ever received. The referral line stops there.`;
        addJournal('Letha station: predecessor baseline review and Warden Order referral number — no corresponding document received', 'intelligence', `plumes-letha2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A supply runner who works the northern route knows the structure by its cargo — she has been inside.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'speaking with northern supply runner Destin Var about staging structure interior');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_runner_destin_var = true;
        G.investigationProgress++;
        G.lastResult = `Destin Var agrees to talk only after you find her outside the main waystation, checking her pack straps alone. She has been inside the structure's loading bay three times. The loading bay connects to a lower level via a grated floor hatch she passed over during the second delivery — the grate was open, and she looked down. Below: a chamber with two large copper tanks connected by a piping manifold, both tanks marked with a symbol she describes precisely: a circle with a horizontal bar, the bar crossed at the center. She does not know what the tanks hold. The symbol is a Warden Order materials classification mark for pressurized chemical compound.`;
        addJournal('Runner Destin Var: sub-floor copper tanks with Warden Order pressurized-compound mark — loading bay grate access confirmed', 'evidence', `plumes-runner-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `You approach Destin Var at the waystation bench while two other runners are within clear earshot. She reads the situation immediately and looks away. When you persist, she picks up her pack and walks to the posting board, takes her next assignment slip, and leaves the waystation without further eye contact. She is gone before you reach the door. The runners at the bench watched all of it.`;
        addJournal('Runner contact failed — wrong setting, witnessed approach, Destin Var departed', 'complication', `plumes-runner-fail-${G.dayCount}`);
      } else {
        G.flags.met_runner_destin_var = true;
        G.investigationProgress++;
        G.lastResult = `Destin Var keeps her voice at a level that carries maybe a meter. She has been inside the loading bay twice for standard cargo drops. The bay is larger than necessary for the declared supply function — the floor space is clear except for racking along the far wall, and the racking holds sealed containers with Warden Order markings. She saw the grated hatch in the floor on the second visit but the guard positioned near it made clear it was not for runners. "You deliver and you go. That's the arrangement."`;
        addJournal('Runner: loading bay holds Warden Order sealed containers, sub-floor hatch guarded during deliveries', 'intelligence', `plumes-runner-partial-${G.dayCount}`);
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
        G.lastResult = `More evidence is needed before approaching the staging location. The threads are not tight enough yet.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/2));
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
