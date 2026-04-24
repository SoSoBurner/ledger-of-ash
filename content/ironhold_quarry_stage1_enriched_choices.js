/**
 * IRONHOLD QUARRY STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 investigation paths grounded in mining operations and special extraction
 * Ironhold: a major quarry complex where a specific extraction operation is happening under cover of standard mining
 * Named NPCs: Darian (the operations lead), Velka Ironspike (the veteran mine overseer who knows something is wrong)
 */

const IRONHOLD_QUARRY_STAGE1_ENRICHED_CHOICES = [

  // 1. FIRST ENCOUNTER: VELKA IRONSPIKE
  {
    label: "Find Velka Ironspike — the mine overseer who has been operating this quarry for twenty years and has started keeping a private operations log.",
    tags: ['Investigation', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'meeting Velka Ironspike');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Velka is at the production checkpoint with a tally board, marking off the morning output. She listens without turning from the board. "Twenty years at this face. I know what comes out of it and what doesn't." She caps her pen. "There's a section on the eastern side that doesn't appear in the weekly reports. I've been logging it myself because the official record is wrong on purpose." She has the tone of someone who has waited a long time for the right question.`;
        G.flags.met_velka_ironspike = true;
        addJournal('contact', 'Velka Ironspike met: 20-year veteran, personal log of undisclosed eastern face operations, waiting for the right inquiry', `ironhold-velka-${G.dayCount}`);
      } else {
        G.lastResult = `Velka is mid-rotation at the production checkpoint, tally board in hand, and raises two fingers without turning — not now. A worker at the adjacent checkpoint supplies what she won't: Velka keeps her own hours, arrives before the first bell and stays past the last. She's been at Ironhold longer than anyone currently in the management structure. The end-of-shift wind-down, when the face goes quiet and the supervisors move to the equipment shed for the daily count, is the window.`;
        G.flags.located_velka_ironspike = true;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 2. CLUE: THE EASTERN FACE EXTRACTION
  {
    label: "Access Velka's personal operations log — read what the eastern face extraction is producing that doesn't appear in official output reports.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 74,
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
        G.lastResult = `The eastern face is visible from the main equipment road — same stone, same cut lines, indistinguishable from the standard face at this distance. The access path branches behind the shed line without markings. The official production reports show geological waste volumes in the expected range for this deposit type. Those numbers only look wrong when compared against an independent count — which Velka has, and which you don't yet have access to. The reports are a closed door that doesn't announce itself as one.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 3. CLUE: DARIAN'S OPERATIONS SCHEDULE
  {
    label: "Obtain Darian's operations schedule — compare the eastern face activity against the official production calendar.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'comparing operations schedules');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Darian's working schedule, pinned to the board inside the management shed, shows eastern face crew assignments on three days the official calendar leaves blank. Each of those days falls within a known courier window — the same windows Velka noted in her log as off-schedule shipment days. The extraction runs when the quarry's own oversight rotation is inactive. Someone read the inspection timetable before building the extraction timetable around it.`;
        if (!G.flags) G.flags = {};
        G.flags.found_darian_schedule = true;
        addJournal('Darian schedule: eastern face extraction on off-calendar days matching courier windows — timed to avoid quarry inspection', 'evidence', `ironhold-schedule-${G.dayCount}`);
      } else {
        G.lastResult = `The management shed door is closed and stays closed during active shift hours — a standard practice at production sites to keep the work floor's dust out of the paperwork. Through the window, the schedule board is visible but not readable from this angle. The window for getting inside is narrow: either a shift change when the supervisors move to the equipment sheds for the daily count, or an introduction through someone with standing access. Neither of those options is available right now.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 4. INVESTIGATION: THE SECONDARY MINERAL
  {
    label: "Identify the secondary mineral being extracted from the eastern face — determine what it is and what it's used for.",
    tags: ['Investigation', 'Craft', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'identifying secondary mineral');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `A fragment from the eastern face's discard pile — the material the official sheet calls geological waste. The color banding is distinctive: a reactive compound precursor, same material category Jorin flagged in Craftspire's supply chain. At Craftspire it was extracted from processed compounds. Here it comes out of the rock directly. Raw source, same destination. Both operations are moving toward the same accumulation point.`;
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
    label: "Walk the quarry complex at peak production — read what the workforce and operations tell you.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 67,
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
    label: "Report the off-schedule extraction to the Iron Compact's mining authority representative stationed at Ironhold.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Iron Compact contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Kess is at the assay station near the equipment sheds, running tallies in a bound register. She listens without putting the register down. "Off-calendar extraction at a Compact-affiliated quarry is a production disclosure violation. Full stop." When you describe the mineral category as a reactive precursor, she sets the register on the table and makes a notation in a different ledger — the one with the blue binding. "That changes the tier." The Compact has revenue interest in Ironhold's yield. Unauthorized extraction of a tiered material is their problem to pursue.`;
        if (!G.flags) G.flags = {};
        G.flags.met_iron_compact_ironhold = true;
        G.factionHostility.iron_compact += 1;
        addJournal('faction', 'Iron Compact authority Kess: off-calendar extraction is financial violation, reactive precursor elevates category — Compact investigation opened', `ironhold-iron-${G.dayCount}`);
      } else {
        G.lastResult = `Kess is at the assay station with a tally register open and gives you two minutes before her next run. The description of schedule discrepancies doesn't move her expression. "I need the production calendar laid against the operations board entries — show me the specific dates where they diverge." She taps her register with one finger. Without documentation, informal description sits as hearsay in the Compact's process and goes nowhere. She returns to her tally and doesn't look up again.`;
        if (!G.flags) G.flags = {};
        G.flags.located_iron_compact_ironhold = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 7. SOCIAL: DARIAN'S BACKGROUND
  {
    label: "Research Darian's background and how he came to be the Ironhold operations lead.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'researching Darian\'s background');

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Darian's appointment at Ironhold is eighteen months old — the same period when the eastern face reached the secondary mineral layer. The appointment came through the quarry's external ownership structure, bypassing the internal promotion process that had been in use for twenty years. Before Ironhold he managed a processing facility in the northern commercial district. The facility's primary product line: reactive compound handling. He arrived at Ironhold already knowing what the eastern face would produce.`;
        if (!G.flags) G.flags = {};
        G.flags.researched_darian = true;
        addJournal('Darian: appointed from external ownership 18 months ago, prior work in reactive compound processing — recruited specifically for secondary mineral management', 'evidence', `ironhold-darian-background-${G.dayCount}`);
      } else {
        G.lastResult = `Darian's employment record is held in the quarry's administrative files inside the management building — a closed cabinet accessible only to site administration or through a formal Compact audit request. The Compact's public registry shows Ironhold's license structure and ownership filings, not individual personnel histories. Whatever his background includes before this posting, the public-facing record shows only his current title and appointment date. What he's put on the board is all that's visible from here.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 8. MORAL PRESSURE: VELKA'S DILEMMA
  {
    label: "Velka asks whether she should confront Darian directly or continue documenting quietly — she's been watching for fourteen months.",
    tags: ['Moral', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'Velka evidence decision');
      if (!G.flags) G.flags = {};

        G.lastResult = `Velka is at the end of the main terrace with the dust settling behind the last equipment run of the day. She doesn't look up when she starts talking. "If I go to Darian directly, he pulls my eastern face access within the week. I stop being useful the moment I move." She turns a chip of stone in her palm. "If I keep documenting, whatever's going through those containers keeps going. Fourteen months is already fourteen months too long." She's not asking for reassurance. She's asking which loss is the right one.`;
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = 'Velka Ironspike';
      addJournal('consequence', 'Velka Ironspike decision: confront Darian and lose access vs continue documenting while extraction continues', `ironhold-velka-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 9. INVESTIGATION: THE CONTAINER DESTINATION
  {
    label: "Track the unmarked containers leaving the eastern face — determine where they're being shipped.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'tracking container destination');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
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
    label: "Arrive at Ironhold at first light — observe the quarry as it begins the production day.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
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
    label: "Map Ironhold's ownership structure — who has authority over the quarry above the operations management level.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'mapping quarry ownership structure');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Ironhold's operating license sits under the Compact's quarrying affiliate, registered with a controlling interest held by a northern investment consortium incorporated two years ago. The consortium's principal address in the Compact's registry is a Unity Square post office — the same address the Northern Route Coordination Consortium uses. Same entity behind two separate commercial instruments. Whatever northern bloc has appeared before has Ironhold's quarrying affiliate in the same portfolio.`;
        if (!G.flags) G.flags = {};
        G.flags.found_ironhold_ownership = true;
        addJournal('Ironhold ownership: controlling interest held by same northern consortium as Unity Square entity — multi-locality control pattern confirmed', 'evidence', `ironhold-ownership-${G.dayCount}`);
      } else {
        G.lastResult = `The Compact's registry is accessible at the assay station during business hours — a bound volume for current operating licenses, an indexed ledger for affiliate filings going back five years. The surface layer is clear: Ironhold's license sits under the Compact's quarrying affiliate. Below that, the affiliate structure runs through multiple registration layers, each requiring a cross-reference to a separate filing volume. The station's daily access window closes at the fourth bell. Reaching the controlling interest at the end of the chain takes a dedicated session, not an afternoon.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 12. PERSONAL ARC: VELKA'S LOG OFFSITE
  {
    label: "Secure a copy of Velka's fourteen-month operations log for preservation outside Ironhold's administrative reach.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'securing Velka\'s log offsite');
      if (!G.flags) G.flags = {};

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Velka's log is written in production shorthand — layer notation, shift codes, container volume in quarry units. Without the reference guide that hangs inside every Compact-affiliated equipment shed, it reads as routine extraction data. The copy goes out inside a standard geological sample case, labeled with a site assessment number. Darian's crew checks outgoing cases against the equipment manifest at the gate. This one clears. Fourteen months of undisclosed eastern face operations are outside the quarry's reach.`;
        G.flags.velka_log_secured = true;
        addJournal('consequence', 'Velka\'s 14-month eastern face log secured offsite — undisclosed operations record preserved outside quarry administration', `ironhold-velka-log-${G.dayCount}`);
      } else {
        G.lastResult = `The gate inspection runs longer than expected — a second guard checks outgoing documentation against a manifest that wasn't operating yesterday. The eastern face security is tightening the exit protocols. The log copy, still in its sample case, stays put. Getting it out requires a window when the secondary inspection isn't active, or a different exit point entirely.`;
      }
      G.recentOutcomeType = 'craft'; maybeStageAdvance();
    }
  },

  // 13. RUMOR LAYER
  {
    label: "Listen to quarry workers at the end-of-shift gathering — what are they saying about changes at the eastern face?",
    tags: ['Investigation', 'Rumor', 'Stage1', 'Meaningful'],
    xpReward: 60,
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

        G.lastResult = `End-of-shift at the equipment shed line, when the noise from the face drops and voices carry again. The word moving through the crew: "${selected}." It circulates in the gaps between louder conversation, repeated to people who already know it. Workers at Ironhold don't need the full picture to know something at the eastern face has gone wrong.`;
      addJournal(`Ironhold quarry worker rumor: "${selected}"`, 'evidence', `ironhold-rumor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 14. SOCIAL: THE RETURNING EASTERN FACE WORKER
  {
    label: "Speak to a worker who has been on the eastern face rotation and is willing to describe the conditions.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'interviewing eastern face worker');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Worge speaks at the water barrel near the main face, keeping her back to the equipment shed. Three months on the eastern face rotation — before she asked to be moved and wasn't given a reason why that was allowed. "First thing they tell you: don't ask what you're pulling." The pay supplement was listed as technical complexity. The gloves were heavier than standard quarry issue. "Chart on the wall in the eastern shed — not a hazard chart. A quantity tracker. Every shift's output was marked against a number. We were working toward a specific total and nobody named what the total was for." The operation has a completion point. Someone knows what it is.`;
        if (!G.flags) G.flags = {};
        G.flags.met_worge_worker = true;
        addJournal('contact', 'Eastern face worker Worge: unnamed material quota tracked against specific target, heavy protective gear, no questions permitted', `ironhold-worge-${G.dayCount}`);
      } else {
        G.lastResult = `The worker you approach checks your face twice before answering. Eastern face rotation workers signed a supplementary contract clause — she won't say what it covers, but the way she steps back and looks toward the equipment shed tells you it includes conversations with outsiders. She walks back to the face without another word. The clause is in effect.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 15. INVESTIGATION: THE QUOTA TARGET
  {
    label: "Estimate the eastern face extraction quota — determine how close to completion the operation is.",
    tags: ['Investigation', 'Craft', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'estimating extraction quota completion');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      if (!G.flags) G.flags = {};
      if (G.flags.met_velka_ironspike) {
        const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));
        if (result.total >= 12) {
          G.lastResult = `Velka's log combined with Worge's shift count gives a working estimate. The secondary mineral stratum has been mapped at full depth — Velka did it over fourteen months without telling anyone. At current extraction rates the operation is roughly seventy percent complete. Four to six weeks to the final container. After that, the eastern face goes back to standard production and the record of what passed through it closes. The window for catching the operation while it's still running is measured in weeks.`;
          G.flags.estimated_ironhold_completion = true;
          addJournal('Eastern face extraction ~70% complete: operation concludes in 4-6 weeks — closing evidence window', 'discovery', `ironhold-completion-${G.dayCount}`);
        } else {
          G.lastResult = `The stratum depth is in Velka's personal notation — she mapped it herself over fourteen months without the quarry's sanction or assistance. Without that map, the mineral layer could be ten meters deep or a hundred; the exposed face gives no reliable indication. The extraction rate per shift is a fixed number. But rate without total volume is meaningless for estimating completion. The calculation requires Velka's depth data, and accessing it means working through her rather than around her.`;
        }
      } else {
        G.lastResult = `From the main terrace, the eastern face reads as a standard exposure — cut lines, pale stone, drainage channels that haven't been maintained. Whether the secondary mineral stratum runs three meters deep or thirty is not visible from here. Velka has been mapping it in her personal log for over a year, depth notation in quarry-standard measurement. Without her cooperation and access to that log, the completion timeline is guesswork built on an unknown floor.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 16. ATMOSPHERE: VELKA'S TWENTY YEARS
  {
    label: "Ask Velka what she would have done if this had happened in her first year here rather than after twenty.",
    tags: ['WorldColor', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 48,
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
    label: "Map how the eastern face extraction operation connects to the larger investigation centered on Shelkopolis.",
    tags: ['Investigation', 'Networks', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'connecting Ironhold to central investigation');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The two supply streams map against each other: Ironhold's raw mineral precursor and Craftspire's extracted compound reach industrial-grade concentration only in combination. Neither is sufficient alone. Both are moving. The Whitebridge crossing sits on the route that connects both origin points to Shelkopolis's outer district. The combination occurs at a third location — not a quarry, not a processing facility. The scale of what the combined material enables points toward dome-level infrastructure. Something in Shelkopolis's outer district is the endpoint.`;
        if (!G.flags) G.flags = {};
        G.flags.mapped_ironhold_shelkopolis_connection = true;
        addJournal('Ironhold + Craftspire materials converge toward Shelkopolis outer district — dome-level atmospheric application endpoint', 'evidence', `ironhold-connection-${G.dayCount}`);
      } else {
        G.lastResult = `The container route ends at Whitebridge and the trail goes cold. What's in hand: two origin points, a transfer crossing, and a northbound road that runs toward the Shelkopolis outer district. What's missing: the final leg's documentation. Mapping it requires port records, district freight manifests, or an outer district registry that covers inbound industrial supply — none of which are held at Ironhold. The routing logic points toward a destination. The documentation to name that destination lives elsewhere.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 18. WORLD COLOR: THE QUARRY FACE
  {
    label: "Stand at the active quarry face during extraction — observe what industrial-scale mineral extraction actually looks like.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 48,
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
    label: "Assess the full timeline: if the eastern face operation completes in 4-6 weeks, what happens to the accumulated material afterward?",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'assessing post-extraction timeline');

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
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
    label: "Velka Ironspike says someone visited the quarry four months ago — a geological assessor whose questions weren't about geology.",
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
      addJournal('warning', 'Rival-adjacent operative visited Ironhold 4 months ago — specific eastern face knowledge, possible coordination with operation', `ironhold-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
{
  label: 'The notice board has recent postings.',
  tags: ['social'],
  xpReward: 5,
  fn: function() {
    var key = 'rumor_drawn_' + G.location + '_' + G.dayCount;
    if (G.flags[key]) {
      G.lastResult = 'The board has nothing new since this morning.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
}
];
window.IRONHOLD_QUARRY_STAGE1_ENRICHED_CHOICES = IRONHOLD_QUARRY_STAGE1_ENRICHED_CHOICES;
