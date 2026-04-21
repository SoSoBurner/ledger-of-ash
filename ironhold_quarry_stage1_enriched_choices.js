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
        G.lastResult = `Velka has the patience of someone who works in geological time. "Twenty years at this quarry. I know what comes out of it." She doesn't say what's wrong immediately. She watches you for a moment, then says: "There's a section of the eastern face we don't discuss in the official operations reports. I've been including it in my personal log because someone should." She's been waiting for someone to ask who isn't Darian or the operations management.`;
        G.flags.met_velka_ironspike = true;
        addJournal('contact', 'Velka Ironspike met: 20-year veteran, personal log of undisclosed eastern face operations, waiting for the right inquiry', `ironhold-velka-${G.dayCount}`);
      } else {
        G.lastResult = `Velka is mid-shift at a production checkpoint. She'll be available at the end of the work period. Her reputation at the quarry is solid: she's been here longer than the current management.`;
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
        G.lastResult = `Velka's log covers fourteen months. The eastern face has been producing a secondary material — a mineral layer encountered when the face reached a specific geological stratum. The official production reports log this layer as "geological waste — disposal." But Velka has been watching the disposal: the material isn't being disposed. It's being collected, separated, and loaded into unmarked containers on a schedule that doesn't align with the quarry's official shipping calendar. The "disposal" is actually the primary extraction.`;
        G.flags.found_eastern_face_evidence = true;
        addJournal('investigation', 'Eastern face: secondary mineral layer logged as "disposal" but actually collected separately on off-schedule — primary extraction disguised as waste', `ironhold-eastern-face-${G.dayCount}`);
      } else {
        G.lastResult = `Without Velka's cooperation, the eastern face operations aren't accessible to outside inquiry. Official reports show nothing unusual there.`;
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
        G.lastResult = `Darian's internal schedule shows eastern face operations on days not listed in the official production calendar. The off-calendar operations always coincide with specific courier arrival windows — outside the quarry's normal supply delivery days. The schedule has been structured so that the eastern face extraction happens on days when the quarry's official oversight isn't active. Someone scheduled the hidden extraction to avoid its own inspection regime.`;
        if (!G.flags) G.flags = {};
        G.flags.found_darian_schedule = true;
        addJournal('investigation', 'Darian schedule: eastern face extraction on off-calendar days matching courier windows — timed to avoid quarry inspection', `ironhold-schedule-${G.dayCount}`);
      } else {
        G.lastResult = `Darian's detailed operations schedule is in the management office. Accessing it without detection requires either an inside contact or an opportunity not yet available.`;
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
        G.lastResult = `You obtain a small sample from discarded eastern face material. The mineral is a reactive compound precursor — the same category Jorin identified as being extracted from Craftspire's supply chain. At Ironhold, it's being directly mined rather than extracted from processed compounds. This is a raw source for the same material category. Wherever the Craftspire extraction is going, Ironhold's primary extraction is going to the same place. Both operations are feeding the same accumulation.`;
        if (!G.flags) G.flags = {};
        G.flags.identified_ironhold_mineral = true;
        addJournal('discovery', 'Secondary mineral identified: reactive compound precursor — same category as Craftspire extraction, both feeding the same accumulation', `ironhold-mineral-${G.dayCount}`);
      } else {
        G.lastResult = `The material is geologically unusual but identifying it precisely requires specialist analysis you'd need to take elsewhere.`;
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
        G.lastResult = `The quarry security has been restructured. The original site guards are still present but a second security layer operates around the eastern face area — different uniforms, different protocols, clearly trained differently. The eastern face has its own dedicated security that doesn't answer to the quarry's operations chain. Someone is protecting the eastern face extraction from the quarry's own oversight structure.`;
      } else if (arch === 'magic') {
        G.lastResult = `The geology of the eastern face is distinctive. You can see from the color banding in the exposed rock that the secondary mineral layer extends further than the current extraction front suggests. The operation has been deliberately limited to what can be extracted quickly without full exposure. They're not mining everything there is — they're taking a specific quantity on a specific schedule.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The shift rotation at the eastern face is different from the main quarry. Same workers, shorter rotations, and they're not permitted to cross-rotate to the main face during an eastern face shift. The workforce segregation is enforced but not formally recorded in the operations documentation. The two operations share physical space but are kept procedurally isolated.`;
      } else {
        G.lastResult = `Three workers on the standard face have scars from injuries that don't match normal quarry work patterns — they're consistent with handling reactive materials without full protective equipment. They're being used in the eastern face operation where normal safety protocols have been suspended to maintain secrecy. Someone decided speed and deniability were worth the injury risk.`;
      }
      addJournal('investigation', 'Quarry operations: dual security structure, limited extraction quantity on schedule, workforce segregation, reactive material injuries on workers', `ironhold-quarry-read-${G.dayCount}`);
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
        G.lastResult = `Authority representative Kess listens to the schedule discrepancy with practiced attention. "Off-calendar extraction at an Iron Compact-affiliated quarry constitutes a production disclosure violation." She asks about the mineral category. When you describe it as a reactive precursor, her expression doesn't change but she makes a specific notation. "That changes the category." The Iron Compact has financial interest in what comes out of Ironhold — unauthorized extraction of valuable material is their problem. She'll investigate through the Compact's channels.`;
        if (!G.flags) G.flags = {};
        G.flags.met_iron_compact_ironhold = true;
        G.factionHostility.iron_compact += 1;
        addJournal('faction', 'Iron Compact authority Kess: off-calendar extraction is financial violation, reactive precursor elevates category — Compact investigation opened', `ironhold-iron-${G.dayCount}`);
      } else {
        G.lastResult = `The Iron Compact representative requires formal documentation of the production schedule discrepancy before opening an investigation. Informal description isn't sufficient.`;
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
        G.lastResult = `Darian became operations lead eighteen months ago — the same period when the eastern face reached the secondary mineral layer. His appointment came from the quarry's external ownership rather than through the normal internal promotion process. Before Ironhold, he managed a processing facility in a northern commercial district. That facility's primary product category: reactive compound processing. He was specifically recruited because he has the technical background to manage what the eastern face is producing.`;
        if (!G.flags) G.flags = {};
        G.flags.researched_darian = true;
        addJournal('investigation', 'Darian: appointed from external ownership 18 months ago, prior work in reactive compound processing — recruited specifically for secondary mineral management', `ironhold-darian-background-${G.dayCount}`);
      } else {
        G.lastResult = `Darian's official employment history is in the quarry's HR records. Accessing those requires either his cooperation or administrative override.`;
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

      G.lastResult = `Velka has been here twenty years. This quarry is her professional identity. "If I confront Darian without external backing, he has the authority to reassign me or simply close my access to the eastern face. If I keep documenting, whatever they're doing continues. But if I move too early, I lose the position that lets me keep watching." She's asking for guidance about the trade-off between action and continued observation.`;
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
        G.lastResult = `Following a container from the eastern face to the quarry perimeter: it leaves through a secondary access road not on the official quarry map, loaded onto a wagon with the same charter mark that Whitebridge's Cadrin described crossing the river bridge on new-moon nights. The Ironhold extraction and the Whitebridge midnight crossings are the same supply chain. The mineral leaves Ironhold and reaches its destination through Whitebridge's unauthorized crossing.`;
        if (!G.flags) G.flags = {};
        G.flags.linked_ironhold_whitebridge = true;
        addJournal('discovery', 'Container tracked to same charter mark as Whitebridge midnight crossings — Ironhold extraction and Whitebridge river crossings are one supply chain', `ironhold-container-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The container leaves through a secondary access road but you lose it before it reaches a identifiable destination. The road leads north. The charter mark on the wagon is small and partially covered.`;
      } else {
        G.lastResult = `The container tracking is noticed. Quarry security redirects you away from the secondary access road area. Your surveillance attempt has been logged.`;
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

      G.lastResult = `Ironhold comes to life methodically. Workers arrive by shift, equipment check procedures run without variation. This is a quarry that has operated on the same rhythm for generations. The eastern face section — when the shift rotation reaches it — has a different rhythm. Faster, more directed. The workers there don't have the slow settling-in of people doing familiar work. They move like people on a timeline. Whatever the eastern face operation is, it's being treated as urgent in a way the rest of the quarry is not.`;
      addJournal('discovery', 'Ironhold dawn: eastern face workers move with urgency unlike the rest of the quarry — operation is on a timeline', `ironhold-dawn-${G.dayCount}`);
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
        G.lastResult = `Ironhold is registered under the Iron Compact's quarrying affiliate. The affiliate's ownership documents show a controlling interest held by a northern investment consortium that was incorporated two years ago. The consortium's principal address matches the Northern Route Coordination Consortium at Unity Square. Same entity, different commercial instrument. The northern bloc that's been appearing across multiple investigations also owns Ironhold's quarrying affiliate.`;
        if (!G.flags) G.flags = {};
        G.flags.found_ironhold_ownership = true;
        addJournal('investigation', 'Ironhold ownership: controlling interest held by same northern consortium as Unity Square entity — multi-locality control pattern confirmed', `ironhold-ownership-${G.dayCount}`);
      } else {
        G.lastResult = `Ownership documentation for mining operations is in the Iron Compact's registry. The affiliate structure requires cross-referencing that takes more time than you have access to in one sitting.`;
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
        G.lastResult = `Velka writes her log in technical mining notation — incomprehensible to anyone outside the profession without a reference guide. You carry a copy out inside a standard geological survey case. From the outside, it's indistinguishable from a routine sample assessment report. The fourteen months of undisclosed eastern face operations are now documented and preserved outside Darian's administrative control.`;
        G.flags.velka_log_secured = true;
        addJournal('consequence', 'Velka\'s 14-month eastern face log secured offsite — undisclosed operations record preserved outside quarry administration', `ironhold-velka-log-${G.dayCount}`);
      } else {
        G.lastResult = `The quarry's exit inspection is stricter than Velka expected — site security checks all outgoing documentation against a manifest. Getting the log out requires a window when inspection isn't running.`;
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

      G.lastResult = `End-of-shift whisper: "${selected}." The quarry's workers sense something irregular even without the full picture.`;
      addJournal('investigation', `Ironhold quarry worker rumor: "${selected}"`, `ironhold-rumor-${G.dayCount}`);
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
        G.lastResult = `Worge was on eastern face rotation for three months. "You don't ask questions about what you're extracting. That's the first thing they tell you." She received a pay supplement and was told it was for "technical complexity." The material she handled required gloves heavier than standard quarry gear. "The supervisor had a chart on the wall — not a safety chart, a quantity tracker. Every shift's output was logged against a target. We were on a quota for something they didn't name." A production target for an unnamed material, against a specific quantity. There's a defined endpoint to this operation.`;
        if (!G.flags) G.flags = {};
        G.flags.met_worge_worker = true;
        addJournal('contact', 'Eastern face worker Worge: unnamed material quota tracked against specific target, heavy protective gear, no questions permitted', `ironhold-worge-${G.dayCount}`);
      } else {
        G.lastResult = `Workers from the eastern face rotation have signed non-disclosure arrangements. They're legally restricted from discussing the operation's specifics.`;
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
          G.lastResult = `Velka's log plus Worge's shift count data: at current extraction rates, the eastern face operation is approximately seventy percent complete. The geological stratum containing the secondary mineral has been assessed at full depth — Velka has been mapping it. At current pace, the operation concludes in four to six weeks. After that, the eastern face extraction is done and the evidence disappears with the operation. There's a closing window.`;
          G.flags.estimated_ironhold_completion = true;
          addJournal('discovery', 'Eastern face extraction ~70% complete: operation concludes in 4-6 weeks — closing evidence window', `ironhold-completion-${G.dayCount}`);
        } else {
          G.lastResult = `The geological mapping needed to estimate completion is in Velka's personal notes. Without her detailed records, the completion timeline can't be determined precisely.`;
        }
      } else {
        G.lastResult = `Estimating the extraction completion requires Velka's geological knowledge of the stratum depth. Her cooperation is needed.`;
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

      G.lastResult = `"In my first year I would have gone directly to management," Velka says. "I didn't know yet that management can be part of the problem." She turns over a piece of stone in her hand. "After twenty years you know: the quarry is what it produces over time. One operation doesn't define it. But whoever's doing this is using the quarry's history and reputation as cover for something that would destroy both if it was known." She's protecting the institution by documenting the people exploiting it.`;
      addJournal('discovery', 'Velka: 20 years of institutional knowledge — quarry\'s reputation used as cover, she\'s protecting it by documenting the exploitation', `ironhold-velka-perspective-${G.dayCount}`);
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
        G.lastResult = `Ironhold's secondary mineral combined with Craftspire's extracted compound reaches a sufficient concentration for industrial atmospheric applications only when combined. The two supply chains are converging toward a third location where the combination occurs. The Whitebridge crossing — where the Ironhold containers travel — connects to routes that lead toward Shelkopolis's outer district. The combined material is headed for an atmospheric application in or near Shelkopolis. The scale and nature points toward dome-level infrastructure.`;
        if (!G.flags) G.flags = {};
        G.flags.mapped_ironhold_shelkopolis_connection = true;
        addJournal('investigation', 'Ironhold + Craftspire materials converge toward Shelkopolis outer district — dome-level atmospheric application endpoint', `ironhold-connection-${G.dayCount}`);
      } else {
        G.lastResult = `The connection to Shelkopolis requires cross-referencing the container routing against Shelkopolis's infrastructure map — data you don't have assembled yet.`;
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

      G.lastResult = `The quarry face has an honesty to it. Each cut reveals exactly what was always there, hidden by the depth of original geography. The tools and workers are transparent: this is where the stone is, this is what we're taking, this is what we're leaving. Twenty years of Velka's work is visible in the ordered terraces, the clean cut lines, the managed drainage. Then the eastern face — same tools, same workers, but the transparency is missing. Something is being taken that was never meant to be part of this story.`;
      addJournal('discovery', 'Quarry face observation: standard operations are transparent and ordered, eastern face breaks that transparency — wrong extraction visible in the contrast', `ironhold-face-${G.dayCount}`);
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
        G.lastResult = `Working from compound stability data and application requirements: at full accumulation, the combined material from Ironhold and Craftspire would be ready for use within days of final collection. There's no storage timeline — the material is either used promptly or it degrades. The six-week extraction window isn't the preparation phase. The preparation is almost complete. Whatever the material is being used for, it will be deployed shortly after the extraction concludes. This is the final phase of a plan that's been running for over a year.`;
        if (!G.flags) G.flags = {};
        G.flags.assessed_timeline_urgency = true;
        addJournal('discovery', 'Timeline assessment: material deployed immediately after extraction completes — plan is in final phase, deployment window is 6-8 weeks away', `ironhold-timeline-${G.dayCount}`);
      } else {
        G.lastResult = `The deployment timeline requires detailed knowledge of the compound stability characteristics that Jorin or a specialist would need to provide.`;
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
        G.lastResult = `"They asked about the access roads — specifically which roads could support heavy vehicle loads," Velka says. "And whether the quarry had its own security response protocol if external personnel entered restricted zones." Military logistics and security assessment. They were evaluating Ironhold as a target or an obstacle, not as an investigation site.`;
      } else if (arch === 'magic') {
        G.lastResult = `"They took samples," Velka says. "From the eastern face, which was odd since I hadn't told them about it — they went straight there as if they already knew. The samples went into a purpose-built collection kit, not a standard geological container." They came with the right equipment for the right material. They knew exactly what they were looking for and where it was.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They worked backwards," Velka says. "Started at the output point — where the containers leave — then moved toward the extraction face. They were mapping the operational chain in reverse, from product to source. You map it forward, from source to product. They mapped the finished supply chain, not the investigation."`;
      } else {
        G.lastResult = `"They spoke to Darian for forty minutes in the management office," Velka says. "I wasn't permitted in. When they came out, Darian seemed satisfied. I don't know what they discussed, but the extraction timeline appeared to accelerate by two weeks after their visit." They didn't investigate the operation — they coordinated with it.`;
      }

      G.lastResult += ` This person knew about the eastern face operation specifically. They weren't investigating it; they were working with or around it.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative visited Ironhold 4 months ago — specific eastern face knowledge, possible coordination with operation', `ironhold-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.IRONHOLD_QUARRY_STAGE1_ENRICHED_CHOICES = IRONHOLD_QUARRY_STAGE1_ENRICHED_CHOICES;
