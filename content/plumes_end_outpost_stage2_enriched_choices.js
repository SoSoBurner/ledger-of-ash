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
        addJournal('investigation', "Letha's hazard map pinpoints pressure source within half-day radius northwest — staging location identified", `plumes-letha-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `You disturb Letha's calibrated instruments during the conversation. The disruption creates a false reading event in her log. She is professionally frustrated and closes the consultation.`;
        addJournal('complication', 'Hazard instrument disrupted — false reading logged, consultation closed', `plumes-letha-fail-${G.dayCount}`);
      } else {
        G.flags.met_letha_dawnsilk = true;
        G.investigationProgress++;
        G.lastResult = `Letha confirms the persistent northwest pressure gradient. She has been filing hazard elevation reports for four months. The reports were acknowledged but no action was taken. "The gradient is not natural. Natural gradients don't hold position for four months."`;
        addJournal('investigation', 'Persistent northwest pressure gradient — non-natural duration, reports unacted upon', `plumes-letha-partial-${G.dayCount}`);
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
        addJournal('investigation', 'Staging structure confirmed: Soreheim military + Warden Order joint control — Patrol Leader warned off', `plumes-patrol-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The Patrol Leader filed an official incident report about the structure. Your questions about the same structure mark you as connected to the original incident. He detains you briefly for questioning by his superior.`;
        addJournal('complication', 'Patrol incident connection — detained for questioning by patrol superior', `plumes-patrol-fail-${G.dayCount}`);
      } else {
        G.flags.met_patrol_leader = true;
        G.investigationProgress++;
        G.lastResult = `The Patrol Leader describes the unmapped structure. Fortified, guarded, operating under authority that overrides local patrol access. "I've patrolled that road for eight years. That building wasn't there two years ago."`;
        addJournal('investigation', 'Unmapped fortified structure on northern road — built within 2 years, overrides local patrol', `plumes-patrol-partial-${G.dayCount}`);
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
        addJournal('investigation', "Shrine traveler account: pressure management compound dispensing at cave + second cache confirmed — worker missing", `plumes-cysur-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `The shrine's traveler accounts are protected under Cysur's doctrinal confidentiality. The shrine is a place of sanctuary; its records are not investigative resources.`;
        addJournal('complication', 'Shrine traveler accounts protected under Cysur doctrine — not investigative records', `plumes-cysur-fail-${G.dayCount}`);
      } else {
        G.flags.met_shrine_keeper_cysur = true;
        G.investigationProgress++;
        G.lastResult = `The shrine keeper shares that travelers have described the structure in account fragments across four months. Collectively they describe a fortified operation focused on something in the northwestern hills. "They come through here afraid of what they know. That's unusual."`;
        addJournal('investigation', 'Shrine traveler fragments describe northwestern fortified operation — witnesses arrive afraid', `plumes-cysur-partial-${G.dayCount}`);
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
        addJournal('investigation', "Plumes End S2 finale: official patrol documents staging location — submitted to Shelkopolis command", `plumes-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You use Letha's precise map to approach the staging structure alone, document its contents and the second compound cache, and transmit the documentation to the Verdant Row network from a position outside the guard perimeter. The structure's existence and contents are public before dawn.`;
        addJournal('investigation', "Plumes End S2 finale: solo infiltration, staging structure documented and distributed", `plumes-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.PLUMES_END_OUTPOST_STAGE2_ENRICHED_CHOICES = PLUMES_END_OUTPOST_STAGE2_ENRICHED_CHOICES;
