/**
 * IRONHOLD QUARRY STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 investigation paths grounded in mining operations and special extraction
 * Ironhold: a major quarry complex where a specific extraction operation is happening under cover of standard mining
 * Named NPCs: Darian (the operations lead), Velka Ironspike (the veteran mine overseer who knows something is wrong)
 */

var IRONHOLD_QUARRY_STAGE1_ENRICHED_CHOICES = [

  // 1. FIRST ENCOUNTER: VELKA IRONSPIKE
  {
    plot: 'main',
    label: "Velka has kept her own logs for fourteen months. The quarry record is wrong.",
    tags: ['Investigation', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    failResult: {
      text: `Velka is mid-count at the production checkpoint, tally board raised, two fingers up — not now. A foreman in a grey coat moves between you and the board line without speaking, ledger tucked under one arm, face turned just enough to close the angle. The shift whistle has her pinned to the checkpoint until the count clears. The end-of-shift wind-down, when the face goes quiet and the supervisors move to the equipment shed, is the only window she keeps for herself.`,
      xp: 0, effects: [],
      next: [{text: 'Wait for the wind-down window', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'meeting Velka Ironspike');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Velka is at the production checkpoint with a tally board, marking off the morning output. She listens without turning from the board. "Twenty years at this face. I know what comes out of it and what doesn't." She caps her pen and sets it in the same groove on the board frame — a groove worn smooth from use, the wood darker there than anywhere else. "There's a section on the eastern side that doesn't appear in the weekly reports. I've been logging it myself because the official record is wrong on purpose." She has the tone of someone who has waited a long time for the right question.`;
        G.flags.met_velka_ironspike = true;
        addJournal('Velka Ironspike met: 20-year veteran, personal log of undisclosed eastern face operations, waiting for the right inquiry', 'contact_made', `ironhold-velka-${G.dayCount}`);
      } else {
        G.lastResult = `Velka is mid-rotation at the production checkpoint, tally board in hand, and raises two fingers without turning — not now. A worker at the adjacent checkpoint supplies what she won't: Velka keeps her own hours, arrives before the first bell and stays past the last. She's been at Ironhold longer than anyone currently in the management structure. The end-of-shift wind-down, when the face goes quiet and the supervisors move to the equipment shed for the daily count, is the window.`;
        G.flags.located_velka_ironspike = true;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 2. CLUE: THE EASTERN FACE EXTRACTION
  {
    plot: 'main',
    label: "The eastern face disposal schedule doesn't match the shipping calendar.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 74,
    failResult: {
      text: `The disposal records at the equipment shed are clipped to a board inside the foreman's window — visible through the glass, not accessible without his say-so. He's at the window now, running his daily count in a ruled ledger, marking each line with a flat stroke. The access path for eastern face documentation runs through Velka, who has been keeping independent records for fourteen months and holds standing access to the shed line. She takes her break at the end-of-shift wind-down.`,
      xp: 0, effects: [],
      next: [{text: 'Find Velka at the wind-down', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'reading eastern face extraction records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      if (!G.flags) G.flags = {};
      if (G.flags.met_velka_ironspike) {
        G.lastResult = `Velka's log runs fourteen months in compressed technical notation. The eastern face reached a secondary mineral layer eight months ago. Official production sheets classify it as geological waste, marked for disposal. But Velka tracked the disposal schedule against the shipping calendar and the numbers don't match. The waste is being collected, separated, containerized — and moved out on days the official calendar shows no shipments. The disposal is the operation.`;
        G.flags.found_eastern_face_evidence = true;
        addJournal('Eastern face: secondary mineral layer logged as "disposal" but actually collected separately on off-schedule — primary extraction disguised as waste', 'evidence', `ironhold-eastern-face-${G.dayCount}`);
      } else {
        G.lastResult = `The eastern face is visible from the main equipment road — same stone, same cut lines, indistinguishable from the standard face at this distance. The access path branches behind the shed line without markings. The official production reports show geological waste volumes in the expected range for this deposit type. Those numbers only look wrong when compared against an independent count — which Velka has. She takes her break at the end-of-shift wind-down, when the face goes quiet and the supervisors move to the equipment shed.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 3. CLUE: DARIAN'S OPERATIONS SCHEDULE
  {
    label: "Extraction runs on calendar days left blank — built around the inspection schedule.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    failResult: {
      text: `The management shed door stays closed during active shift hours — stone dust protocol, keeps the paperwork legible. The schedule board is visible through the window but the angle is wrong for reading specific dates. Two foremen cross the yard between sheds, ledgers under their arms, without glancing over. The window opens at shift change, when supervisors move to the equipment shed for the daily count and the management building empties for twelve minutes. Velka uses that window to sign her production reports.`,
      xp: 0, effects: [],
      next: [{text: 'Time the shift-change window', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'comparing operations schedules');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Darian's working schedule, pinned to the board inside the management shed, shows eastern face crew assignments on three days the official calendar leaves blank. Each of those days falls within a known courier window — the same windows Velka noted in her log as off-schedule shipment days. The extraction runs when the quarry's own oversight rotation is inactive. Someone read the inspection timetable before building the extraction timetable around it.`;
        if (!G.flags) G.flags = {};
        G.flags.found_darian_schedule = true;
        addJournal('Darian schedule: eastern face extraction on off-calendar days matching courier windows — timed to avoid quarry inspection', 'evidence', `ironhold-schedule-${G.dayCount}`);
      } else {
        G.lastResult = `The management shed door is closed and stays closed during active shift hours — a standard practice at production sites to keep the work floor's dust out of the paperwork. Through the window, the schedule board is visible but not readable from this angle. The window for getting inside is narrow: either a shift change when the supervisors move to the equipment sheds for the daily count, or an introduction through someone with standing access. Velka has standing access to the management shed — she's been signing off production reports there for twenty years.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 4. INVESTIGATION: THE SECONDARY MINERAL
  {
    label: "The filed sheet calls it waste. The color banding says otherwise.",
    tags: ['Investigation', 'Craft', 'Stage1', 'Meaningful'],
    xpReward: 74,
    failResult: {
      text: `The fragment in hand is limestone on three sides and something else on the fourth — a faint reactive smell when it warms in the sun, a color that doesn't belong to the surrounding rock. But naming it precisely needs a testing kit or a specialist. Neither is at the quarry. The sample is worth keeping. Kess, the Iron Compact authority at the assay station, runs a registered material identification service and has access to the Compact's mineral reference catalog.`,
      xp: 0, effects: [],
      next: [{text: 'Bring the sample to Kess at the assay station', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'identifying secondary mineral');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `A fragment from the eastern face's discard pile — the material the extraction sheet calls geological waste. The color banding is distinctive: a reactive compound precursor, the same category appearing in the Craftspire supply chain records. At Craftspire it was extracted from processed compounds. Here it comes out of the rock directly. Raw source, same destination. Both operations are moving toward the same accumulation point.`;
        if (!G.flags) G.flags = {};
        G.flags.identified_ironhold_mineral = true;
        addJournal('Secondary mineral identified: reactive compound precursor — same category as Craftspire extraction, both feeding the same accumulation', 'discovery', `ironhold-mineral-${G.dayCount}`);
      } else {
        G.lastResult = `The fragment comes back from the face in your hand, streaked with a color that doesn't match the surrounding limestone. Something reactive — the faint smell when it heats in the sun is a property marker. But naming the compound precisely requires a testing kit or a specialist, neither of which is at the quarry. The sample is worth keeping.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 5. ARCHETYPE-GATED: READING THE QUARRY
  {
    label: "The quarry runs at peak production. The eastern face does not behave like the rest.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 67,
    failResult: {
      text: `The quarry floor during active shift is noise and dust and purposeful movement — nothing stands still long enough to read. Workers move between station markers at a pace the shift whistle enforces, foremen counting output against their ledger lines, equipment checks running in fixed sequence. The quarry at dawn, before the first bell, is a different thing. The crews aren't on the clock yet. The patterns between tasks are visible before the day covers them. First light is the window.`,
      xp: 0, effects: [],
      next: [{text: 'Return at first light before the first bell', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'reading quarry operations');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The site guards at the quarry gate are Ironhold's own, marked by the quarry's tally-board badge. Around the eastern face there's a second set — different cut of coat, different cadence when they walk the perimeter. They don't check in with the site supervisor. They answer to something outside the quarry's command structure. The eastern face has its own security, and that security answers to whoever owns the extraction, not the quarry.`;
      } else if (arch === 'magic') {
        G.lastResult = `The color banding visible in the exposed eastern face shows the secondary mineral layer running deeper and wider than the current extraction front covers. The operation has been deliberately scoped — they're pulling a specific volume on a specific schedule rather than clearing the full seam. They're not mining what's there. They're harvesting what they need and leaving the rest undisturbed.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The shift rotation at the eastern face runs shorter than standard — workers rotate out before the main face crews. During an eastern face shift, those workers aren't permitted to cross over to the main production area. The segregation holds at every handover, but nothing in the operations board shows this split exists. Two workforces, one site, no written record of the division.`;
      } else {
        G.lastResult = `Three workers on the standard face carry hand scarring inconsistent with stonework — chemical burns, not abrasion. The kind of injury that comes from handling reactive material without the right gloves. They've been rotated through the eastern face and rotated back, and the injury pattern followed. Someone stripped the safety protocol from that extraction and absorbed the cost in workers rather than risk a paper record.`;
      }
      addJournal('Quarry operations: dual security structure, limited extraction quantity on schedule, workforce segregation, reactive material injuries on workers', 'evidence', `ironhold-quarry-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 6. FACTION SEED: IRON COMPACT MINING AUTHORITY
  {
    label: "The Iron Compact has a representative at the assay station. This belongs with her.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    failResult: {
      text: `Kess is at the assay station with a tally register open and two minutes on the clock before her next run. The description of schedule discrepancies doesn't move her expression. She sets one finger on the register. "Show me the specific dates where the operations board diverges from the production calendar. I need documentation, not description." Without that, informal claims sit as hearsay in the Compact's process and go nowhere. Velka's fourteen-month log has exactly those dates.`,
      xp: 0, effects: [],
      next: [{text: "Get Velka's documentation first", skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Iron Compact contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Kess is at the assay station near the equipment sheds, running tallies in a bound register. She listens without putting the register down. "Off-calendar extraction at a Compact-affiliated quarry is a production disclosure violation. Full stop." When you describe the mineral category as a reactive precursor, she sets the register on the table and makes a notation in a different ledger — the one with the blue binding. "That changes the tier." The Compact has revenue interest in Ironhold's yield. Unauthorized extraction of a tiered material is their problem to pursue.`;
        if (!G.flags) G.flags = {};
        G.flags.met_iron_compact_ironhold = true;
        G.factionHostility.iron_compact += 1;
        addJournal('Iron Compact authority Kess: off-calendar extraction is financial violation, reactive precursor elevates category — Compact inquiry opened', 'intelligence', `ironhold-iron-${G.dayCount}`);
      } else {
        G.lastResult = `Kess is at the assay station with a tally register open and gives you two minutes before her next run. The description of schedule discrepancies doesn't move her expression. "I need the production calendar laid against the operations board entries — show me the specific dates where they diverge." She taps her register with one finger. Without documentation, informal description sits as hearsay in the Compact's process and goes nowhere. Velka's log has fourteen months of eastern face dates laid against the official production calendar. That's the document Kess needs.`;
        if (!G.flags) G.flags = {};
        G.flags.located_iron_compact_ironhold = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 7. SOCIAL: DARIAN'S BACKGROUND
  {
    label: "Darian arrived eighteen months ago. His predecessor is still here, doing different work.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    failResult: {
      text: `Darian's employment record is in a closed cabinet in the administration building, accessible only to site administration or through a formal Compact audit request. The Compact's public registry shows licensing structure and ownership filings, not individual histories. One detail is public without an audit: the appointment date — eighteen months ago, the same month the eastern face reached the secondary mineral layer. The timing is the information. Kess at the assay station has standing to request the full personnel file under audit protocol.`,
      xp: 0, effects: [],
      next: [{text: 'Request an audit through Kess', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'researching Darian\'s background');

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Darian's appointment at Ironhold is eighteen months old — the same period when the eastern face reached the secondary mineral layer. The appointment came through the quarry's external ownership structure, bypassing the internal promotion process that had been in use for twenty years. Before Ironhold he managed a processing facility in the northern commercial district. The facility's primary product line: reactive compound handling. He arrived at Ironhold already knowing what the eastern face would produce.`;
        if (!G.flags) G.flags = {};
        G.flags.researched_darian = true;
        addJournal('Darian: appointed from external ownership 18 months ago, prior work in reactive compound processing — recruited specifically for secondary mineral management', 'evidence', `ironhold-darian-background-${G.dayCount}`);
      } else {
        G.lastResult = `Darian's employment record is held in the quarry's administrative files inside the management building — a closed cabinet accessible only to site administration or through a formal Compact audit request. The Compact's public registry shows Ironhold's license structure and ownership filings, not individual personnel histories. The appointment date is visible in the public record: eighteen months ago. The same month the eastern face reached the secondary mineral layer. The timing is the information.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 8. MORAL PRESSURE: VELKA'S DILEMMA
  {
    label: "Velka kept quiet for fourteen months. She wants to know if that was right.",
    tags: ['Moral', 'Evidence', 'Confrontation', 'Stage1', 'Meaningful'],
    xpReward: 65,
    effects: [
      { type: 'heat', polity: 'soreheim', amount: 1 }
    ],
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'Velka evidence decision');
      if (!G.flags) G.flags = {};

        G.lastResult = `Velka is at the end of the main terrace with the dust settling behind the last equipment run of the day. She doesn't look up when she starts talking. "If I go to Darian directly, he pulls my eastern face access within the week. I stop being useful the moment I move." She turns a chip of stone in her palm. "If I keep documenting, whatever's going through those containers keeps going. Fourteen months is already fourteen months too long." She's not asking for reassurance. She's asking which loss is the right one.`;
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = 'Velka Ironspike';
      addJournal('Velka Ironspike decision: confront Darian and lose access vs continue documenting while extraction continues', 'evidence', `ironhold-velka-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 9. INVESTIGATION: THE CONTAINER DESTINATION
  {
    label: "Unmarked containers leave the eastern face on days the calendar shows nothing moving.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 73,
    failResult: {
      text: `The secondary guard places himself between you and the service track access without a word, ledger under one arm, hands at his sides. He holds the position until the window has passed, then walks back to his rotation point. Your presence near the track is registered. The night contractor delivers equipment to the eastern face in the early hours — two to four in the morning on irregular dates, when the guard pattern changes. Velka's private log marks the delivery windows. The track is accessible then.`,
      xp: 0, effects: [],
      next: [{text: 'Wait for the night delivery window', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'tracking container destination');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `The container leaves the eastern face on a cart moving at walking pace, heading not toward the main gate but along a service track behind the drainage berm — a road that doesn't appear on the quarry's official site map. At the perimeter fence it transfers to a covered wagon. The charter mark stenciled low on the wagon's side panel is the same mark Whitebridge's Cadrin described on night-crossing wagons — the ones using the river bridge after dark on new-moon schedules. The extraction and the crossings are one operation. Ironhold to Whitebridge to wherever.`;
        if (!G.flags) G.flags = {};
        G.flags.linked_ironhold_whitebridge = true;
        addJournal('Container tracked to same charter mark as Whitebridge midnight crossings — Ironhold extraction and Whitebridge river crossings are one supply chain', 'discovery', `ironhold-container-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The container exits through a service track behind the drainage berm — not the main gate — and transfers to a covered wagon at the perimeter. You hold the sightline as far as the northern tree line, but the wagon moves faster than expected once it clears the quarry road. The track runs north. The charter mark on the wagon's panel is partially covered by a tarp edge. Partial mark, northbound road, no destination confirmed.`;
      } else {
        G.lastResult = `You're fifty meters from the service track when one of the eastern face's secondary guards steps out from behind the drainage berm and positions between you and the access road. No words. He holds the position until the wagon has cleared the perimeter. A second guard appears at your right. They walk you back toward the main equipment area without explaining where they're taking you, then leave you at the equipment shed without documentation or acknowledgment. Your presence near the track has been registered by someone.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 10. ATMOSPHERE: THE QUARRY AT DAWN
  {
    label: "The quarry before the shift whistle — a different operation than at noon.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    failResult: {
      text: `The gate board is already full when you arrive — workers clocked in before first light, tally pegs in their slots, the shift sequence settled and closed. The foreman at the gate marks latecomers in a separate column without looking up. The quarry's rhythm doesn't wait. The eastern face shifts start tighter than the standard face, arrival time enforced by a secondary count that runs before the main bell. Tomorrow, the gate board opens thirty minutes before first light.`,
      xp: 0, effects: [],
      next: [{text: 'Come back thirty minutes before first light', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing quarry dawn operations');

        G.lastResult = `First light at Ironhold arrives grey and dusty. Workers clock in at the gate board in the order they've arrived for twenty years — same hands, same sequence, the same slap of the tally peg. Equipment checks run in a fixed rotation without prompting. The quarry's rhythm is geological, settled into itself. The eastern face shift breaks from that. Workers assigned there arrive tighter, move faster. There's no settling-in. They run a quota check before the equipment check. The rest of the quarry is doing its day. The eastern face is running against a clock.`;
      addJournal('Ironhold dawn: eastern face workers move with urgency unlike the rest of the quarry — operation is on a timeline', 'discovery', `ironhold-dawn-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 11. INVESTIGATION: QUARRY OWNERSHIP STRUCTURE
  {
    label: "The ownership structure above Darian doesn't appear in any public filing.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    xpReward: 70,
    failResult: {
      text: `The Compact's registry at the assay station holds current operating licenses and a five-year indexed ledger of affiliate filings. The surface layer reads quickly: Ironhold's license under the Compact's quarrying affiliate. Below that, the affiliate structure runs through registration layers requiring cross-reference to separate volumes. The assay station copy lacks those volumes. Kess has cross-reference access to the full affiliate structure in the Compact's working files and runs documentation queries through her audit authority.`,
      xp: 0, effects: [],
      next: [{text: 'Route the ownership query through Kess', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'mapping quarry ownership structure');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Ironhold's operating license sits under the Compact's quarrying affiliate, registered with a controlling interest held by a northern investment consortium incorporated two years ago. The consortium's principal address in the Compact's registry is a Unity Square post office — the same address the Northern Route Coordination Consortium uses. Same entity behind two separate commercial instruments. Whatever northern bloc has appeared before has Ironhold's quarrying affiliate in the same portfolio.`;
        if (!G.flags) G.flags = {};
        G.flags.found_ironhold_ownership = true;
        addJournal('Ironhold ownership: controlling interest held by same northern consortium as Unity Square entity — multi-locality control pattern confirmed', 'evidence', `ironhold-ownership-${G.dayCount}`);
      } else {
        G.lastResult = `The Compact's registry is accessible at the assay station during business hours — a bound volume for current operating licenses, an indexed ledger for affiliate filings going back five years. The surface layer is clear: Ironhold's license sits under the Compact's quarrying affiliate. Below that, the affiliate structure runs through multiple registration layers, each requiring a cross-reference to a separate filing volume. Kess the Compact authority representative has cross-reference access to the full affiliate structure. The documentation session runs through her.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 12. PERSONAL ARC: VELKA'S LOG OFFSITE
  {
    label: "Velka's log is the only accurate eastern face record. It can't stay at Ironhold.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'securing Velka\'s log offsite');
      if (!G.flags) G.flags = {};

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Velka's log is written in production shorthand — layer notation, shift codes, container volume in quarry units. Without the reference guide that hangs inside every Compact-affiliated equipment shed, it reads as routine extraction data. The copy goes out inside a standard geological sample case, labeled with a site assessment number. Darian's crew checks outgoing cases against the equipment manifest at the gate. This one clears. Fourteen months of undisclosed eastern face operations are outside the quarry's reach.`;
        G.flags.velka_log_secured = true;
        addJournal('Velka\'s 14-month eastern face log secured offsite — undisclosed operations record preserved outside quarry administration', 'evidence', `ironhold-velka-log-${G.dayCount}`);
      } else {
        G.lastResult = `The gate inspection runs longer than expected — a second guard checks outgoing documentation against a manifest that wasn't operating yesterday. The eastern face security is tightening the exit protocols. The smell of quarry dust and machine grease hangs at the gate line; hauling chains clank from somewhere behind the equipment shed. The log copy, still in its sample case, stays put. Getting it out requires a window when the secondary inspection isn't active, or a different exit point that doesn't route through Darian's gate crew.`;
      }
      G.recentOutcomeType = 'craft'; maybeStageAdvance();
    }
  },

  // 13. RUMOR LAYER
  {
    label: "When the supervisors move to the equipment shed, workers talk.",
    tags: ['Investigation', 'Rumor', 'Stage1', 'Meaningful'],
    xpReward: 60,
    failResult: {
      text: `The end-of-shift gathering hasn't formed yet — the face is still running, the shift whistle not down, foremen moving between station markers with their ledgers open. Workers at active stations don't take eyes off their work when management is visible on the floor. The count has to close and the supervisors have to clear to the equipment shed before conversation opens up. That takes another forty minutes. The water barrel near the main face is where the workers collect first.`,
      xp: 0, effects: [],
      next: [{text: 'Wait at the water barrel after the count clears', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'gathering quarry worker rumors');

      const rumors = [
        'workers assigned to the eastern face rotation receive a pay supplement that isn\'t in their standard contracts',
        'three workers from the eastern face rotation haven\'t returned after their reassignment — nobody knows where they went',
        'Darian spends more time in the eastern face area than any operations lead should need to',
        'the eastern face output containers are sealed with a different locking mechanism than standard quarry export containers'
      ];
      const selected = rumors[Math.floor(Math.random() * rumors.length)];

        G.lastResult = `End-of-shift at the equipment shed line, when the noise from the face drops and voices carry again — the cold of the quarry's stone face still coming off the workers' coats, stone dust on every collar. The word moving through the crew: "${selected}." It circulates in the gaps between louder conversation, repeated to people who already know it, passed sideways when the foremen are still visible. Workers at Ironhold don't need the full picture to know something at the eastern face has gone wrong. They've been watching the signs accumulate for weeks.`;
      addJournal(`Ironhold quarry worker rumor: "${selected}"`, 'evidence', `ironhold-rumor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 14. SOCIAL: THE RETURNING EASTERN FACE WORKER
  {
    label: "One eastern face worker has been on rotation long enough to know what's missing.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    failResult: {
      text: `The worker checks your face twice before answering, then steps back toward the face without a word. Eastern face rotation workers signed a supplementary contract clause — she won't say what it covers, but the way she looks toward the equipment shed says it includes conversations with outsiders. Velka placed three of those workers on their first rotation herself. They trust her in a way they won't extend to a visitor. An introduction through Velka at the end-of-shift wind-down is the path that opens.`,
      xp: 0, effects: [],
      next: [{text: 'Get Velka to make the introduction', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'interviewing eastern face worker');

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Worge speaks at the water barrel near the main face, keeping her back to the equipment shed. Three months on the eastern face rotation — before she asked to be moved and wasn't given a reason why that was allowed. "First thing they tell you: don't ask what you're pulling." The pay supplement was listed as technical complexity. The gloves were heavier than standard quarry issue. "Chart on the wall in the eastern shed — not a hazard chart. A quantity tracker. Every shift's output was marked against a number. We were working toward a specific total and nobody named what the total was for." The operation has a completion point. Someone knows what it is.`;
        if (!G.flags) G.flags = {};
        G.flags.met_worge_worker = true;
        addJournal('Eastern face worker Worge: unnamed material quota tracked against specific target, heavy protective gear, no questions permitted', 'contact_made', `ironhold-worge-${G.dayCount}`);
      } else {
        G.lastResult = `The worker you approach checks your face twice before answering. Eastern face rotation workers signed a supplementary contract clause — she won't say what it covers, but the way she steps back and looks toward the equipment shed tells you it includes conversations with outsiders. She walks back to the face without another word. Velka placed three of those workers on their first rotation herself. They trust her in a way they won't trust a visitor.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 15. INVESTIGATION: THE QUOTA TARGET
  {
    label: "Velka's log has the volume data to calculate how far along the operation is.",
    tags: ['Investigation', 'Craft', 'Stage1', 'Meaningful'],
    xpReward: 72,
    failResult: {
      text: `The stratum depth is in Velka's personal notation — she mapped it herself over fourteen months, layer by layer, without the quarry's sanction. Without that depth figure, an extraction rate is a speed without a distance. The calculation requires her data, not a workaround. The eastern face itself gives no reliable indication from the terrace. Velka takes her break at the end-of-shift wind-down, when the face goes quiet and she can work through the numbers without a foreman looking over her shoulder.`,
      xp: 0, effects: [],
      next: [{text: "Work through the numbers with Velka at wind-down", skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'estimating extraction quota completion');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      if (!G.flags) G.flags = {};
      if (G.flags.met_velka_ironspike) {
        const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));
        if (result.total >= 12) {
          G.lastResult = `Velka's log combined with Worge's shift count gives a working estimate. The secondary mineral stratum has been mapped at full depth — Velka did it over fourteen months without telling anyone. At current extraction rates the operation is roughly seventy percent complete. Four to six weeks to the final container. After that, the eastern face goes back to standard production and the record of what passed through it closes. The window for catching the operation while it's still running is measured in weeks.`;
          G.flags.estimated_ironhold_completion = true;
          addJournal('Eastern face extraction ~70% complete: operation concludes in 4-6 weeks — closing evidence window', 'discovery', `ironhold-completion-${G.dayCount}`);
        } else {
          G.lastResult = `The stratum depth is in Velka's personal notation — she mapped it herself over fourteen months without the quarry's sanction or assistance. Without that map, the mineral layer could be ten meters deep or a hundred; the exposed face gives no reliable indication. The extraction rate per shift is a fixed number. But rate without total volume is meaningless for estimating completion. The calculation requires Velka's depth data, and accessing it means working through her rather than around her.`;
        }
      } else {
        G.lastResult = `From the main terrace, the eastern face reads as a standard exposure — cut lines, pale stone, drainage channels that haven't been maintained. Whether the secondary mineral stratum runs three meters deep or thirty is not visible from here. Velka has been mapping it in her personal log for over a year, depth notation in quarry-standard measurement. She takes her break at the end-of-shift wind-down. That's the window.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 16. ATMOSPHERE: VELKA'S TWENTY YEARS
  {
    label: "Twenty years at this face. The question is what keeping quiet costs a person.",
    tags: ['WorldColor', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 48,
    failResult: {
      text: `Velka is mid-production count at the main terrace checkpoint, pen moving down the tally board in the fast, flat strokes of someone who has done this ten thousand times. She doesn't look up. The count is a closed ritual — twenty years of it, and she doesn't break the sequence for anyone during active shift hours. The western terrace wall, where she goes to look at the cut lines she approved a decade ago, is her space at the end of the day when the face goes quiet.`,
      xp: 0, effects: [],
      next: [{text: "Find Velka at the western terrace after shift", skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(48, 'understanding Velka\'s perspective');

        G.lastResult = `"First year, I'd have walked straight to the shift manager," Velka says. She's at the western terrace wall, looking out at the cut lines she approved a decade ago. "Didn't understand yet that the manager might be the problem." She runs a thumb along the edge of the stone in her hand. "Twenty years teaches you what a quarry is. It's not the stone — it's the record of the stone. Every cut logged, every output accounted for. Whoever built this operation used that record as their cover. If it comes out, they take the quarry's name down with them." She documents them because they're using the institution as a shield and she won't let that stand.`;
      addJournal('Velka: 20 years of institutional knowledge — quarry\'s reputation used as cover, she\'s protecting it by documenting the exploitation', 'discovery', `ironhold-velka-perspective-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 17. INVESTIGATION: CONNECTING IRONHOLD TO SHELKOPOLIS
  {
    label: "The same mineral class appears at Craftspire and here. Both operations point the same direction.",
    tags: ['Investigation', 'Networks', 'Stage1', 'Meaningful'],
    xpReward: 70,
    failResult: {
      text: `The container route runs north from Ironhold toward Whitebridge and the trail goes cold there. On hand: two origin points and a partially legible charter mark on the containers. What's missing is the final leg — the documentation that places the combined material at a specific Shelkopolis destination. The charter mark is registered with the Compact. Kess has access to the Compact's freight charter registry and can run a mark-to-registrant search without a formal audit trigger.`,
      xp: 0, effects: [],
      next: [{text: 'Kess can run the charter mark. She has done it before.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'connecting Ironhold to central investigation');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The two supply streams map against each other: Ironhold's raw mineral precursor and Craftspire's extracted compound reach industrial-grade concentration only in combination. Neither is sufficient alone. Both are moving. The Whitebridge crossing sits on the route that connects both origin points to Shelkopolis's outer district. The combination occurs at a third location — not a quarry, not a processing facility. The scale of what the combined material enables points toward dome-level infrastructure. Something in Shelkopolis's outer district is the endpoint.`;
        if (!G.flags) G.flags = {};
        G.flags.mapped_ironhold_shelkopolis_connection = true;
        addJournal('Ironhold + Craftspire materials converge toward Shelkopolis outer district — dome-level atmospheric application endpoint', 'evidence', `ironhold-connection-${G.dayCount}`);
      } else {
        G.lastResult = `The container route ends at Whitebridge and the trail goes cold. What's in hand: two origin points, a transfer crossing, and a northbound road that runs toward the Shelkopolis outer district. What's missing: the final leg's documentation. Mapping it requires port records, district freight manifests, or an outer district registry that covers inbound industrial supply — none of which are held at Ironhold. The charter mark on the containers was partially visible. That mark is registered with the Compact.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 18. WORLD COLOR: THE QUARRY FACE
  {
    label: "The active quarry face during extraction — what the eastern face doesn't look like.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 48,
    failResult: {
      text: `The production floor during an active extraction run is off-limits to non-credentialed visitors — the foreman at the face access marker makes that clear with a single raised hand and a look toward the gate. Stone dust coats everything within fifty meters; the vibration from deep blasting travels through the ground before the sound arrives. The terrace above the main face gives a clean sightline without crossing the access boundary. Velka approved those cut lines personally. She reads the face from there.`,
      xp: 0, effects: [],
      next: [{text: 'Observe from the terrace above the face', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(48, 'observing active quarry extraction');

        G.lastResult = `The active quarry face is legible from fifty meters. Cut lines, drainage channels, terrace steps — each layer is a logged decision, recorded in the order it was made. Velka's twenty years of oversight are visible in the even spacing and the clean drainage gutters that keep the lower terraces dry. The eastern face uses the same stone and the same tools, but the cut pattern is different. Wider removal, irregular spacing, no drainage consideration. This face isn't being managed. It's being emptied.`;
      addJournal('Quarry face observation: standard operations are transparent and ordered, eastern face breaks that transparency — wrong extraction visible in the contrast', 'discovery', `ironhold-face-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 19. INVESTIGATION: TIMELINE URGENCY
  {
    plot: 'main',
    label: "The extraction ends in 4-6 weeks. What happens to the material after collection is unanswered.",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 72,
    failResult: {
      text: `The deployment logic turns on a compound stability window — how long from final collection before the material degrades below useful concentration. Without that figure, the extraction timeline marks an end point but not what follows it. That number is specialist knowledge. Craftspire's material ledger contained synthesis studies on this compound class before they were suppressed. The studies exist somewhere outside the quarry. The answer to the question is not at Ironhold.`,
      xp: 0, effects: [],
      next: [{text: 'Suppressed synthesis studies are not destroyed. They are relocated.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'assessing post-extraction timeline');

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Compound stability data against the extraction timeline: the combined material from Ironhold and Craftspire degrades within days of final collection if not applied. There's no viable storage window. The extraction isn't leading to a preparation phase — the preparation is concurrent. When the last container clears Ironhold, the clock on deployment is already running. Six weeks to extraction completion means six weeks to application. This operation has been building toward a specific date, not a general readiness. The plan is in its final stage.`;
        if (!G.flags) G.flags = {};
        G.flags.assessed_timeline_urgency = true;
        addJournal('Timeline assessment: material deployed immediately after extraction completes — plan is in final phase, deployment window is 6-8 weeks away', 'discovery', `ironhold-timeline-${G.dayCount}`);
      } else {
        G.lastResult = `The deployment logic turns on a piece of specialist knowledge: the compound's stability window — how long from final collection before the material degrades past useful concentration. Without that figure, the extraction timeline tells you when the operation ends but not whether deployment follows immediately or allows a preparation window. Jorin worked with this material category at Craftspire and had access to the synthesis studies before they were suppressed. That data exists somewhere. It isn't at Ironhold.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 20. SHADOW RIVAL INTRO
  {
    label: "Four months ago a geological assessor came through. His questions weren't about geology. Velka noticed.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"Asked about the access roads," Velka says. She's reviewing her tally board and doesn't stop. "Specifically which ones could handle heavy vehicle load at night. And whether the quarry's security response protocol covered external personnel in restricted areas." Not questions a geological assessor asks. Questions about weight capacity and response times. They were mapping the quarry as a logistics route or a target, not a site under review. This person knew about the eastern face operation and was assessing what surrounds it.`;
      } else if (arch === 'magic') {
        G.lastResult = `"Took samples," Velka says. "From the eastern face — without my guidance, without asking where to go. Walked straight to the right section as if they'd been given coordinates." The collection kit they used wasn't standard geological issue. Purpose-built for a specific material type. "Not a field kit. A transport kit. They already had what they needed to carry it." They arrived knowing the material, knowing its location, and prepared to handle it. They weren't assessing the eastern face. They were checking on it.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"Walked it backwards," Velka says. "Started at the perimeter — the service track where the containers exit — then moved toward the face. Product to source, not source to product." She taps her log with two fingers. "I map it forward. Anyone genuinely assessing this quarry maps it forward. They mapped the supply chain as if they already knew where it ended and wanted to confirm the beginning." They came with the destination already in hand.`;
      } else {
        G.lastResult = `"Forty minutes with Darian," Velka says. "I was outside. When they came out Darian had the look of someone who'd just confirmed something they needed confirmed." She closes her log. "The extraction schedule moved two weeks earlier after that meeting. Whatever they discussed, the timeline changed." They didn't come to audit. They came to coordinate, and the operation adjusted to their visit.`;
      }

      G.lastResult += ` Four months ago. Eastern face operational knowledge. Not at the quarry to question the operation — already working around or with it.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('Rival-adjacent operative visited Ironhold 4 months ago — specific eastern face knowledge, possible coordination with operation', 'complication', `ironhold-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // TYPE: DISCOVERY — WORLD COLOR VIGNETTE
  {
    label: "The quarry face at noon sounds different from the quarry face at dawn.",
    tags: ['WorldColor', 'Atmosphere', 'Stage1'],
    xpReward: 38,
    failResult: {
      text: `The quarry is in full production — extraction percussion running off the stone walls and returning half a second late, the air too thick with dust and vibration for anything subtle to register. The acoustic difference between dawn and noon only comes through after the face quiets. The shift whistle marks the midpoint, but the real quiet comes at end-of-day when the equipment shuts down and the supervisors move to the count shed. That's when the quarry's own voice is audible again.`,
      xp: 0, effects: [],
      next: [{text: 'Return when the equipment shuts down', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'observing quarry acoustic change');
      G.lastResult = `At dawn the quarry face resonates — sound carries differently in cold air, the percussion of extraction work ringing off the stone walls and returning a half-second late. By noon the air warms and the resonance flattens: the same tools, the same rock, but the sound arrives and dies where it lands. Workers who have spent years at Ironhold tell time by it — the shift from resonant to flat marks the midpoint of the working day as accurately as any bell. The eastern face runs quieter than the main operation throughout. At noon, when the rest of the quarry flattens, the eastern face is already silent.`;
      G.recentOutcomeType = 'observe'; maybeStageAdvance();
    }
  },

  // TYPE: DISCOVERY — ARCHETYPE GATE (Support family)
  {
    label: "Eastern face workers come off rotation showing fatigue that isn't from physical labor.",
    tags: ['Discovery', 'ArchetypeGate', 'Stage1'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const family = typeof getArchetypeFamily === 'function' ? getArchetypeFamily(G.archetype) : '';
      if (family !== 'Support') {
        G.lastResult = `The eastern face workers come off rotation looking tired in a way that doesn't match their reported work classification. The eastern section isn't listed as heavy-extraction — the production ledger classifies it as routine material handling. The fatigue profile doesn't fit the task description: dry-throated, slow on the fine movements, nothing that drill impacts and hauling chains would produce. Stone dust coats their gear the same as any crew, but something about the way they hold their arms at end-of-shift marks a different kind of exposure. The discrepancy is visible without being nameable from outside the work.`;
        gainXp(32, 'noting eastern face worker fatigue pattern');
        G.recentOutcomeType = 'observe'; maybeStageAdvance(); return;
      }
      gainXp(72, 'assessing eastern face worker health pattern');
      G.stageProgress[1]++;
      G.lastResult = `Three workers finishing the eastern face rotation show the same fatigue signature: dry throat, mild headache behind the eyes, slight coordination delay in fine motor movements. Not exhaustion from load-bearing — compound exposure. Low-level, cumulative, the kind that clears overnight at current exposure rates but accumulates over weeks and months. The protective gear is heavier than standard issue but not heavy enough for the material class the symptom profile suggests. The workers are being exposed to something the issued equipment was not designed to contain.`;
      if (!G.flags) G.flags = {};
      G.flags.ironhold_exposure_noted = true;
      addJournal('Eastern face workers: compound exposure symptoms — issued protective gear insufficient for material class being handled', 'evidence', `ironhold-exposure-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: DISCOVERY — BACKGROUND FLAVOR
  {
    label: "The equipment shed wall chart tracks totals that the quarry production records don't mention.",
    tags: ['Discovery', 'Background', 'Stage1'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'reading equipment shed wall chart');
      const bg = G.background || '';
      let result = `The eastern equipment shed has a running total chart on the interior wall — a simple column format, date and figure, running back fourteen months. The figures don't correspond to any production category in the daily reports on file. The column header is a symbol, not a word. The chart is updated regularly; the most recent entry is three days old. Someone is tracking a parallel output metric that exists only inside this shed.`;
      if (bg === 'laborer' || bg === 'trades') {
        result = `The chart format is production-standard — same column structure used in every extraction operation you've worked near. But the category marker at the top is a symbol you don't recognize from standard quarry reporting. That marker belongs to the old Compact extraction classification system, deprecated when the unified reporting codes came in. Whoever built this chart is using pre-reform notation. Old notation, new entries, fourteen months of parallel tracking that the quarry records don't acknowledge.`;
      }
      G.lastResult = result;
      addJournal('Eastern equipment shed: 14-month wall chart tracking undisclosed output category in non-standard notation', 'evidence', `ironhold-wallchart-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: DISCOVERY — RISKY
  {
    label: "The eastern face drainage channel runs a different color after heavy rain.",
    tags: ['Discovery', 'Risky', 'Physical', 'Stage1'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'sampling eastern drainage channel');
      const result = rollD20('vigor', (G.skills.vigor || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `After this morning's rain, the main face drainage channels run grey-brown — standard quarry runoff, stone particulate and surface clay. The eastern face channel runs a slightly different shade: duller, less reflective, with a surface film that doesn't appear in the western channels. The film isn't thick enough to be residue from a spill. It's consistent with persistent low-level leaching from material stored or processed in that section over a sustained period. The eastern face has been producing this signature long enough that it shows in the drainage pattern.`;
        if (!G.flags) G.flags = {};
        G.flags.ironhold_drainage_sampled = true;
        addJournal('Eastern face drainage: distinct surface film after rain — consistent with sustained material leaching, not incidental spill', 'evidence', `ironhold-drainage-${G.dayCount}`);
      } else {
        G.lastResult = `The drainage channel access on the eastern perimeter requires moving past the service gate that the secondary guard rotation covers. Getting to the channel during daylight means explaining the detour to whoever is on gate duty, and the most likely explanation — routine inspection — doesn't hold up when you're not carrying inspection credentials. After dark the gate goes unattended. The drainage channel will still be there.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: DISCOVERY — BOLD
  {
    label: "A container batch in last month's manifest doesn't appear in intake or dispatch records.",
    tags: ['Discovery', 'Bold', 'Records', 'Stage1'],
    xpReward: 78,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'tracking ghost container batch');
      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));
      if (result.total >= 14) {
        G.lastResult = `Batch reference IH-4471-E appears in the operations manifest as received and processed — but no corresponding entry exists in the intake log, and no dispatch record carries it out. The batch exists in the middle of the supply chain with no origin and no destination in the official record. IH-prefix codes belong to the eastern face designation series. A container that arrived and left without being logged at either end was handled by a process running parallel to the official system. The manifest entry is the only trace — whoever maintained the parallel process missed one record.`;
        if (!G.flags) G.flags = {};
        G.flags.ironhold_ghost_batch = true;
        addJournal('Ghost batch IH-4471-E: eastern face container with no intake or dispatch record — parallel handling process exposed by single manifest entry', 'evidence', `ironhold-ghost-batch-${G.dayCount}`);
      } else {
        G.lastResult = `The operations manifest runs to forty-eight pages for last month — batch references in the hundreds, cross-referenced across three separate logs. Finding an anomaly in that volume requires either a complete ledger comparison or knowing which date range to target. Velka's private log would narrow the window considerably. Without her records as a reference frame, the manifest search is a month of work with no guaranteed entry point.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: DISCOVERY — SAFE/LORE
  {
    label: "The extraction license covers seventeen categories. The current operation adds an unnamed eighteenth.",
    tags: ['Discovery', 'Safe', 'Records', 'Stage1'],
    xpReward: 55,
    failResult: {
      text: `The administration building entry is closed between shifts — dust protocol, keeps the display cases clean. The framed license copy is visible through the entry glass but the addendum notation at the bottom runs in smaller type, too small to read from the door. The building opens at the start of the afternoon shift when the administrative clerk runs the day's filing. That window is twenty minutes long before the supervisors arrive for their own paperwork.`,
      xp: 0, effects: [],
      next: [{text: 'Come back when the admin building opens', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'reviewing Ironhold extraction license');
      G.lastResult = `The original Ironhold extraction license is framed inside the administration building entry — a display copy, not the working document, but the text is legible. Seventeen material categories: standard aggregate, three grades of structural stone, mineral iron, various clay classes. Below the listed categories, an addendum notation in smaller type: "including unlisted category designates approved under supplementary Compact authorization." The addendum has no date. The supplementary authorization it references isn't on display. The license permits something without naming it.`;
      addJournal('Ironhold extraction license: addendum authorizes unnamed additional material category under undisplayed supplementary Compact authorization', 'evidence', `ironhold-license-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: DISCOVERY — SOCIAL/RISKY
  {
    label: "The contractor who supplies the eastern face only visits at night and leaves before dawn.",
    tags: ['Discovery', 'Risky', 'NPC', 'Stage1'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'intercepting the night delivery contractor');
      const result = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The contractor goes by a supply house name rather than a personal name, which means the conversation happens at the service track where the cart waits during unloading. "I deliver. I don't ask." He says it before you've finished the question. What he will confirm: the order comes through a routing number that bypasses the standard quarry supply channel, the equipment specs are provided by the client, not selected from a standard catalog, and payment clears before each delivery, not after — which is unusual enough that he noted it. He doesn't know what the equipment is used for. He knows he's not supposed to be there during daylight.`;
        if (!G.flags) G.flags = {};
        G.flags.met_night_contractor = true;
        addJournal('Night supply contractor: specialized equipment routed through non-standard channel, pre-payment, daylight exclusion — deliberate operational separation', 'evidence', `ironhold-contractor-${G.dayCount}`);
      } else {
        G.lastResult = `The service track is empty at the hours the equipment arrives — Velka's private log marks the delivery windows as two to four in the morning on irregular dates. Intercepting the contractor means being at the service track during those windows without triggering the eastern perimeter guard rotation. The guard pattern changes the same nights the deliveries happen. The timing isn't coincidental.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // TYPE: DISCOVERY — ATMOSPHERE SAFE
  {
    label: "The carved depth markers on the quarry's oldest sections still carry the original surveyors' initials.",
    tags: ['WorldColor', 'Atmosphere', 'Stage1'],
    xpReward: 35,
    failResult: {
      text: `The oldest quarry sections are across the main equipment road, behind the drainage berm — accessible in principle, but the path runs within thirty meters of the eastern perimeter guard rotation. During production hours the guards have a sightline over that stretch. The access is clean at the shift change, when the guard rotation moves to the eastern face for the container count and the berm path empties for twelve minutes. The depth markers have been in the stone for decades. They'll still be there.`,
      xp: 0, effects: [],
      next: [{text: 'Cross during the guard rotation gap', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(35, 'reading original quarry depth markers');
      G.lastResult = `Stone quarries mark their work as they go — depth indicators, layer designations, cut boundaries, surveyor initials chiseled at intervals as the face advances. The oldest sections of Ironhold carry marks from three surveyors whose initials appear in the first decade of operation: K.V., the original lead; T.M., the secondary survey; and a third, H.R., who appears only in the deepest sections and nowhere in the administrative records. The marks are permanent. The administrative records aren't.`;
      G.recentOutcomeType = 'observe'; maybeStageAdvance();
    }
  },

  // TYPE: DISCOVERY — BOLD/LORE
  {
    label: "The geological survey was last updated eight years ago. A section was redacted before filing.",
    tags: ['Discovery', 'Bold', 'Records', 'Stage1'],
    xpReward: 75,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'reading geological survey with redaction');
      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The filed geological survey is eighty-three pages. Pages forty-one through forty-seven are replaced with a single redaction notice: "Section 7 — Stratum Composition Detail — withheld per Compact resource classification protocol." The protocol it cites was in effect eight years ago, which means someone used an existing regulatory mechanism to seal what a geological survey found in a specific stratum. The redaction is legal. The stratum it covers corresponds to the eastern face's depth range. Someone found something in that layer and immediately classified what they found.`;
        if (!G.flags) G.flags = {};
        G.flags.ironhold_survey_redaction = true;
        addJournal('Geological survey: 7-page section on eastern stratum redacted under Compact classification protocol — material found in that layer was immediately sealed', 'evidence', `ironhold-survey-${G.dayCount}`);
      } else {
        G.lastResult = `The geological survey is a public filing — available at the district resource office, filed with the Compact administrative branch, accessible in principle. In practice, the copy at the resource office has a processing lag: it's available "upon written request with a fourteen-day handling period." The copy that should be at the quarry's own administration building isn't on the shelf where surveys are kept. The absence isn't noted anywhere. Something isn't where it's supposed to be, and nobody marked the gap.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

{
  label: 'The notice board has recent postings.',
  tags: ['social'],
  xpReward: 5,
  failResult: {
    text: `The notice board outside the equipment shed is covered — a foreman's shift summary pinned over the top half, a new work-order sheet tacked over the lower section. Whatever was posted this morning is under two layers of today's operational paperwork. The board clears at end-of-shift when the foreman pulls the day's sheets for the count log. The postings beneath will be visible again then, assuming nobody replaces them with tomorrow's run sheet before the morning bell.`,
    xp: 0, effects: [],
    next: [{text: 'Check the board after the count log runs', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
  },
  fn: function() {
    var key = 'rumor_drawn_' + G.location + '_' + G.dayCount;
    if (G.flags[key]) {
      G.lastResult = 'The board has nothing new since this morning. The weight quotas for the day shift are posted, and an outbound cart schedule is tacked beside them — standard operational notices, nothing that wasn\'t there at first light. Stone dust has already settled on the upper edge of the board, the same fine grey coat that covers every surface at Ironhold by mid-shift. The quarry production ledger on the shed wall beside it shows today\'s extraction weight in the same hand as yesterday\'s. Nothing here points to the eastern face.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
}
];
window.IRONHOLD_QUARRY_STAGE1_ENRICHED_CHOICES = IRONHOLD_QUARRY_STAGE1_ENRICHED_CHOICES;
