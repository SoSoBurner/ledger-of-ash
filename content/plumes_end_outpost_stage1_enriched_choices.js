/**
 * PLUMES_END OUTPOST STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 investigation paths grounded in frontier patrol and pressure gradient early signs
 * Plumes End: a remote frontier outpost where pressure gradient readings have been changing in a pattern nobody can explain
 * Named NPC: Letha Dawnsilk (the outpost commander whose pressure measurement records have been suppressed)
 */

const PLUMES_END_OUTPOST_STAGE1_ENRICHED_CHOICES = [

  // 1. FIRST ENCOUNTER: LETHA DAWNSILK
  {
    label: "Report to Commander Letha Dawnsilk — the outpost commander whose pressure measurement logs were recently reclassified.",
    tags: ['Investigation', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'meeting Commander Letha Dawnsilk');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Letha Dawnsilk has the reports stacked on the left side of her desk — a six-month column of paper, organized by date. She doesn't offer you a seat. "I've been sending pressure anomaly readings to central coordination for six months. Three months ago they stopped acknowledging receipt. Two months ago I was told the measurements were under review and not to share them externally." She taps the stack. She never stopped writing the reports. "If they won't use them, at least they exist."  `;
        G.flags.met_letha_dawnsilk = true;
        addJournal('contact', 'Commander Letha Dawnsilk met: 6 months of suppressed pressure anomaly reports, still maintaining records despite official silence', `plumes-letha-${G.dayCount}`);
      } else {
        G.lastResult = `The outpost runs on a posted schedule — Letha Dawnsilk's available periods are listed on the board by the supply cache, and she's currently in a briefing with the patrol rotation. The clerk at the supply desk is polite and unhelpful. Come back at the posted time. She runs this place to a clock and she keeps to it.`;
        G.flags.located_letha_dawnsilk = true;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 2. CLUE: PRESSURE GRADIENT RECORDS
  {
    label: "Study Letha's pressure anomaly reports in full — map what the gradient readings actually show.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'analyzing pressure gradient data');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      if (!G.flags) G.flags = {};
      if (G.flags.met_letha_dawnsilk) {
        const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
        if (result.total >= 12) {
          G.lastResult = `Six months of readings, laid out in order: the gradient is directional, not diffuse, building consistently from the northeast quadrant — the direction that puts Aurora Crown Commune at its origin point. Low-level, slow-building, not matching any weather or seasonal pattern. Four months ago the rate of increase accelerated. Letha has the date circled. It corresponds to the period when Aurora Crown's dome filtration additive was substituted. Whatever the dome is releasing has been propagating outward from that point. Plumes End is reading the leading edge of it.`;
          G.flags.analyzed_pressure_reports = true;
          addJournal('Pressure gradient: directional increase from Aurora Crown quadrant, accelerated 4 months ago — atmospheric event propagating from dome compound substitution', 'discovery', `plumes-pressure-${G.dayCount}`);
        } else {
          G.lastResult = `The pressure records show a clear trend but interpreting its significance requires expertise in atmospheric dynamics. Letha knows the measurements; she doesn't have the framework to explain them.`;
        }
      } else {
        G.lastResult = `Without Letha's cooperation, accessing the suppressed pressure reports isn't possible. They exist only in her personal records at this point.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 3. CLUE: CENTRAL COORDINATION SUPPRESSION
  {
    label: "Trace the chain of command that ordered Letha's pressure reports to be placed 'under review' — determine who gave that instruction.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing suppression order chain');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The suppression order came through a "regional environmental coordination office" — a body Letha has never received communications from before. The instruction was formatted correctly for a central coordination directive, but the issuing office doesn't appear in the standard directory of regional oversight bodies. Another ghost institution. Someone inserted a suppression order into the legitimate communication chain using a fabricated authority. Letha's reports were silenced by an entity that technically doesn't exist.`;
        if (!G.flags) G.flags = {};
        G.flags.found_suppression_source = true;
        addJournal('Suppression order from ghost institution "regional environmental coordination office" — same pattern as Whitebridge ghost account, Unity Square ghost category', 'evidence', `plumes-suppression-${G.dayCount}`);
      } else {
        G.lastResult = `The suppression order came through official channels but the issuing body is unfamiliar. Without access to the regional authority directory, you can't confirm whether it's legitimate.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 4. INVESTIGATION: WILDLIFE BEHAVIOR CHANGES
  {
    label: "Interview the outpost's frontier patrol rangers about wildlife behavior changes in the northeastern territories.",
    tags: ['Investigation', 'Survival', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'gathering wildlife behavior data');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Patrol rangers have documented movement pattern changes in birds and large mammals starting four months ago. Animals are shifting territory southward and away from the northeast quadrant. "We've seen this before during volcanic pressure events," one ranger says. "But there's no geological activity in that direction." What there is: an atmospheric pressure gradient that animals are sensitive to before human instruments detect it clearly. The fauna have been evacuating the affected zone. The gradient is real and it's been building long enough for wildlife to notice.`;
        if (!G.flags) G.flags = {};
        G.flags.found_wildlife_evidence = true;
        addJournal('Wildlife territorial shift southward from NE quadrant for 4 months — fauna evacuating before instruments detect full gradient', 'evidence', `plumes-wildlife-${G.dayCount}`);
      } else {
        G.lastResult = `Rangers have noticed changes but attribute them to seasonal variation. Without Letha's pressure data for context, the pattern isn't obvious.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 5. ARCHETYPE-GATED: READING PLUMES END
  {
    label: "Walk the outpost perimeter at the frontier edge — read what the environment tells you about what's approaching.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'reading frontier environment');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The outpost's defensive positioning was chosen for threat visibility — you can see approaches from three directions clearly. The northeastern quadrant, where the pressure is coming from, has the worst visibility. Whoever chose this site chose it for the threats they expected. The gradient is coming from the direction nobody planned to defend against because nobody thought anything dangerous lived there. The defensive blind spot is exactly aligned with the atmospheric event's origin.`;
      } else if (arch === 'magic') {
        G.lastResult = `At the northeastern edge of the patrol perimeter, the air has a slightly different quality — not taste, not smell, but a consistency. The gradient isn't just pressure: there's a compound element in it, faint but consistent. This isn't natural atmospheric variation. There's chemistry in this gradient. Something is being released into the atmosphere and traveling this far.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The wildlife evacuation has created clear trails in the soil — large animal movements that would normally be distributed are now concentrated along specific corridors. The corridors point away from the northeast. The landscape is showing you the direction and pace of something's advance through the accumulated evidence of everything that's moving away from it.`;
      } else {
        G.lastResult = `Three frontier families who maintained small holdings in the northeast quadrant have abandoned them in the past two months. Their abandoned plots still have late-season crops unharvested. People don't leave their harvest unless something made staying feel worse than losing the food. The human exit matches the animal exit. The zone is becoming uninhabitable and the people inside it feel it before they can explain it.`;
      }
      addJournal('Frontier edge: defensive blind spot aligned with gradient origin, compound chemistry detected, wildlife corridors show advance direction, human exodus from NE', 'evidence', `plumes-perimeter-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 6. FACTION SEED: WARDEN ORDER PATROL COORDINATION
  {
    label: "Contact the Warden Order's regional patrol coordinator through Letha — report the suppressed pressure anomaly data.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Warden Order contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Patrol coordinator Sera Vance receives the summary of Letha's reports with visible concern. "We've had two other outposts report communication disruptions from the same regional coordination source — the one that told Commander Dawnsilk to suppress her readings." She pauses. "If the same ghost authority is suppressing data at multiple outposts simultaneously, there's a systematic information blackout in the field." The Warden Order has been operating with deliberately incomplete atmospheric data across the region. They're operating blind in a zone that's actively changing.`;
        if (!G.flags) G.flags = {};
        G.flags.met_warden_order_plumes = true;
        G.factionHostility.warden_order += 1;
        addJournal('faction', 'Warden Order coordinator Sera Vance: ghost authority suppressed reports at multiple outposts — systematic regional information blackout confirmed', `plumes-warden-${G.dayCount}`);
      } else {
        G.lastResult = `The Warden Order's regional coordinator requires documentation submitted through standard channels before opening an inquiry. Letha's reports need to be formally re-filed despite the suppression.`;
        if (!G.flags) G.flags = {};
        G.flags.located_warden_order_plumes = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 7. SOCIAL: THE VETERAN PATROL RANGER
  {
    label: "Speak to the outpost's longest-serving patrol ranger about what the frontier has been like over the past year.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'interviewing veteran patrol ranger');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Ranger Coss has been patrolling this frontier for eleven years. "The air here used to be clean. We'd go days without needing the patrol's environmental gear." He pauses. "Now I wear it for extended northeast patrols. Not orders — just habit. I don't feel right without it in that direction anymore." He hasn't been formally told to wear protective equipment on northeast routes. He started doing it himself three months ago because his body told him to. His nervous system is picking up what the instruments are measuring.`;
        if (!G.flags) G.flags = {};
        G.flags.met_coss_ranger = true;
        addJournal('contact', 'Veteran ranger Coss: wearing protective equipment on NE routes voluntarily for 3 months — body-level detection of atmospheric change preceding formal orders', `plumes-coss-${G.dayCount}`);
      } else {
        G.lastResult = `The ranger is cautious about discussing environmental observations since the suppression order came through. They've been told the measurements are under review and shouldn't be discussed informally.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 8. MORAL PRESSURE: LETHA'S POSITION
  {
    label: "Letha asks directly: does she escalate through official channels knowing they've been compromised, or does she go around them?",
    tags: ['Moral', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'Letha escalation decision');
      if (!G.flags) G.flags = {};

      G.lastResult = `"If I go through official channels and they're compromised, I'm just feeding information to the people suppressing it," Letha says. "If I go around them, I'm potentially violating my chain of command in a way that would give them grounds to dismiss my reports as unauthorized." She has six months of valid, documented data about an atmospheric event that's affecting people's ability to live in the affected zone. And she's been structurally blocked from sharing it. She's asking how to move without losing the authority that makes her reports credible.`;
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = 'Letha Dawnsilk';
      addJournal('consequence', 'Letha Dawnsilk escalation decision: official channels compromised, unofficial channels risk authority — structural trap', `plumes-letha-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 9. INVESTIGATION: THE COMPOUND ELEMENT IN THE GRADIENT
  {
    label: "Collect a sample from the atmospheric gradient and analyze its chemical composition.",
    tags: ['Investigation', 'Craft', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'analyzing atmospheric gradient chemistry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Using the outpost's environmental analysis equipment, you capture and analyze a sample from the northeast perimeter. The gradient contains trace levels of the same compound class that Jorin identified at Craftspire and that Glasswake's shard amplification data describes as dangerous in atmospheric applications. At Plumes End, the concentration is still low — the leading edge of whatever is propagating from Aurora Crown's zone. At source concentration, this compound class would be significantly more hazardous. Plumes End is in the far fallout zone. Aurora Crown is in the source zone.`;
        if (!G.flags) G.flags = {};
        G.flags.analyzed_gradient_chemistry = true;
        addJournal('Atmospheric gradient chemistry: trace levels of same compound class as Craftspire extraction and Glasswake shard data — Plumes End in far fallout zone, Aurora Crown at source', 'discovery', `plumes-chemistry-${G.dayCount}`);
      } else {
        G.lastResult = `The outpost's equipment is designed for patrol monitoring, not precise chemical analysis. You can confirm chemical presence but not compound class identification.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 10. ATMOSPHERE: THE FRONTIER AT DAWN
  {
    label: "Watch the frontier horizon from the outpost watchtower at first light — observe what the landscape tells you.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing frontier at dawn');

      G.lastResult = `From the watchtower, the northeast horizon is slightly different from the other directions. Not visible to the eye — more like a quality of light that doesn't quite settle the same way. Letha comes up to check the morning instruments and stands next to you for a moment. "I've been watching it change for six months," she says. "Most people don't notice until I point it out. But once you've seen it, you can't stop seeing it." She goes back to her instruments. You keep watching. She's right.`;
      addJournal('Plumes End watchtower: NE horizon atmospheric difference visible once noticed — Letha has been watching it change for 6 months', 'discovery', `plumes-dawn-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 11. INVESTIGATION: HISTORICAL COMPARISON
  {
    label: "Search the outpost's historical atmospheric records — determine if similar gradients have been recorded before and what happened afterward.",
    tags: ['Investigation', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'comparing historical atmospheric records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Historical records at Plumes End go back forty years. One comparable gradient event: recorded sixty-three years ago, before the outpost's current archive. A note references it in the archive's preface as a reason the outpost was established — "to provide early detection of atmospheric irregularities in the northeastern territories." The outpost was built because of a previous event from this direction. Whatever happened sixty-three years ago was significant enough to establish a permanent monitoring presence. Letha is detecting the early signs of a second occurrence of something that was judged severe enough to warrant permanent outpost installation.`;
        addJournal('Historical comparison: outpost established after similar event 63 years ago — Plumes End exists specifically to detect early signs of NE atmospheric irregularity', 'discovery', `plumes-historical-${G.dayCount}`);
      } else {
        G.lastResult = `The historical records go back forty years. Any older events predate the current archive's beginning.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 12. PERSONAL ARC: LETHA'S REPORTS OFFSITE
  {
    label: "Help Letha get six months of pressure anomaly reports out of Plumes End and into the investigation's main archive.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'securing Letha\'s reports offsite');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Letha prepares a secondary copy of the six months of reports — formatted as standard patrol documentation, which is what they officially are. A patrol supply run to Shelkopolis carries the copy inside a standard patrol dispatch bag. The suppression order was applied to the official reporting channel. The patrol dispatch channel runs separately. Letha found the gap in the suppression and used it. The reports are on their way to Shelkopolis.`;
        G.flags.letha_reports_secured = true;
        addJournal('consequence', 'Letha\'s 6-month pressure reports secured via patrol dispatch channel — gap in suppression order exploited', `plumes-reports-secure-${G.dayCount}`);
      } else {
        G.lastResult = `The suppression order, while it came through the official reporting channel, has been interpreted broadly by Plumes End's communications handler — all outgoing reports are being held for review. Finding an exempt channel requires identifying which categories weren't explicitly covered by the suppression order.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 13. RUMOR LAYER
  {
    label: "Talk to the supply traders who pass through Plumes End on the frontier circuit — what are they hearing from the northeast territories?",
    tags: ['Investigation', 'Rumor', 'Stage1', 'Meaningful'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'gathering frontier trader rumors');

      const rumors = [
        'the northern farming settlements have been having unexplained crop failures for two seasons',
        'a traveler from beyond the northeastern edge said the air there tastes wrong and has for months',
        'an experienced frontier scout refused to complete their northeast patrol route last month and wouldn\'t explain why',
        'the trade route through the northeast has seen declining traffic — merchants are routing around it without officially closing it'
      ];
      const selected = rumors[Math.floor(Math.random() * rumors.length)];

      G.lastResult = `Frontier circuit trader rumor: "${selected}." Information is traveling through the frontier even when official channels are suppressed.`;
      addJournal(`Plumes End frontier trader rumor: "${selected}"`, 'evidence', `plumes-rumor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 14. SOCIAL: THE ABANDONING FARMER
  {
    label: "Find one of the frontier farmers who recently abandoned their northeast holding — ask what drove them out.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'interviewing displaced frontier farmer');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Farmer Edne abandoned a holding her family maintained for three generations. "The headaches started first. We thought it was the season. Then the animals started leaving — not running, just slowly moving their grazing toward the south. We moved too when my youngest stopped sleeping through the night and our water tasted wrong." She describes symptoms consistent with low-level exposure to the compound class Letha's data suggests is present. "I couldn't tell you what was wrong. I just knew something was." She left with almost nothing. The holding is still there. She's not going back.`;
        if (!G.flags) G.flags = {};
        G.flags.met_edne_farmer = true;
        addJournal('contact', 'Farmer Edne: abandoned 3-generation holding due to headaches, animal behavioral changes, sleep disruption, water taste — symptom profile matches low-level compound exposure', `plumes-edne-${G.dayCount}`);
      } else {
        G.lastResult = `The displaced farmers from the northeast have largely dispersed to different settlements. Finding them requires the kind of local knowledge only Letha's outpost network has.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 15. INVESTIGATION: THE SCALE OF THE AFFECTED ZONE
  {
    label: "Map the full extent of the atmospheric gradient using Letha's reports and field observations — determine how large the affected area is.",
    tags: ['Investigation', 'Survival', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'mapping affected zone extent');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      if (!G.flags) G.flags = {};
      if (G.flags.met_letha_dawnsilk) {
        const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
        if (result.total >= 12) {
          G.lastResult = `Combining Letha's directional readings with the wildlife displacement corridors and the farmer abandonment pattern: the gradient's effective zone is approximately eighty kilometers across at Plumes End's distance. Scaling backward to the Aurora Crown source location and applying atmospheric diffusion models, the source zone would be experiencing concentrations approximately forty times what Plumes End is detecting. At that concentration, long-term residence becomes medically hazardous. Aurora Crown's dome has been releasing this compound at forty times safe exposure levels for potentially four months.`;
          G.flags.mapped_affected_zone = true;
          addJournal('Affected zone: 80km across at Plumes End distance, source zone (Aurora Crown area) at ~40x safe concentration levels for 4 months', 'discovery', `plumes-zone-map-${G.dayCount}`);
        } else {
          G.lastResult = `The zone mapping requires Letha's directional reading data to anchor the calculation. Without her cooperation, the mapping is too imprecise to be useful.`;
        }
      } else {
        G.lastResult = `Zone mapping requires Letha's six months of directional data. Building the relationship with her comes first.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 16. ATMOSPHERE: PLUMES END AT NIGHT
  {
    label: "Watch the northeast sky from the outpost at night — observe how the atmospheric gradient appears after dark.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing frontier sky at night');

      G.lastResult = `After dark, the northeast horizon has a faint luminescence — not light from settlements, the wrong color for that. A diffuse glow that pulses very slowly. Letha has been documenting it for two months. "The glasswake shard amplification effect," she says quietly. "That's what it looks like when the compound interacts with a shard-dense area. I've never seen it in the open atmosphere before." She looks at it for a moment. "Someone has made Aurora Crown's dome into a source for this." She sounds like someone who has been hoping they were wrong.`;
      addJournal('Plumes End night sky: NE atmospheric glow consistent with shard amplification effect — Aurora Crown dome converted to atmospheric release point', 'discovery', `plumes-night-sky-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 17. INVESTIGATION: WHY PLUMES END MATTERS
  {
    label: "Determine why the suppression specifically targeted Plumes End's reports — what would have happened if they'd reached central coordination.",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'understanding suppression motivation');

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Standard central coordination protocol for a consistent atmospheric anomaly of Plumes End's reported scale: automatic environmental hazard assessment, mandatory field investigation, public notification if the assessment confirms hazard. The suppression prevented that protocol from triggering. If Letha's reports had arrived, the field investigation would have identified Aurora Crown's contamination zone four months ago — before the affected population had been exposed for the full duration. The suppression didn't just hide the data. It extended the exposure window by four months.`;
        addJournal('Suppression consequence: prevented standard hazard protocol from triggering — exposure window extended by 4 months deliberately', 'evidence', `plumes-suppression-purpose-${G.dayCount}`);
      } else {
        G.lastResult = `Understanding the suppression's full implication requires knowledge of the central coordination protocol's thresholds and response procedures.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 18. WORLD COLOR: LETHA'S READING HABITS
  {
    label: "Notice the technical manuals on Letha's desk — ask what she's been studying.",
    tags: ['WorldColor', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 48,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(48, 'learning Letha\'s research focus');

      G.lastResult = `Letha has three volumes of atmospheric chemistry texts she's been reading since the gradient appeared. "I'm an operations commander, not a chemist," she says. "But if my reports are going to be taken seriously, I need to understand what I'm measuring well enough to defend the data." She's been educating herself specifically so she can argue for her own observations. The suppression has turned a frontier commander into a self-taught atmospheric scientist. The work she's doing is beyond her job description and she knows it. "Someone needs to understand this," she says simply.`;
      addJournal('Letha self-educating in atmospheric chemistry to defend suppressed data — command competence in response to institutional suppression', 'discovery', `plumes-letha-books-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 19. INVESTIGATION: THE FULL PICTURE
  {
    label: "Synthesize everything you've learned at Plumes End — articulate what the complete operation looks like from this evidence point.",
    tags: ['Investigation', 'Synthesis', 'Stage1', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'synthesizing Plumes End evidence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `From Plumes End, the operation looks like this: the Glasswake shard amplification data was suppressed to prevent understanding of how dome filtration additives interact with shard geology. The Aurora Crown filtration additive was then substituted — using exactly the interaction mechanism that the suppressed data described. The substitution is releasing a compound into the atmosphere that's propagating outward from Aurora Crown. The Ironhold and Craftspire operations are accumulating additional material that will amplify this release. The multiple ghost institutions that have suppressed reports and planted false authorizations across different localities are all coordinating to prevent the operation from being identified until it completes. Plumes End is detecting the leading edge of something catastrophic in progress.`;
      if (!G.flags) G.flags = {};
      G.flags.synthesized_plumes_picture = true;
      addJournal('Full synthesis: multi-locality operation to amplify Aurora Crown atmospheric release — suppression, shard data, additive substitution, compound accumulation all connected', 'discovery', `plumes-synthesis-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 20. SHADOW RIVAL INTRO
  {
    label: "A supply runner passing through Plumes End describes a traveler they encountered on the frontier road who seemed to be moving away from the northeast quickly.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"Military cadence," the runner says. "Moving with purpose, not urgency. Dressed for field conditions but not patrol standard. And they were moving south-southwest — away from the gradient, toward Shelkopolis, on a direct line." Someone is carrying field intelligence from the northeast zone to a central location. The same direction you're headed. They're ahead of you on the same road.`;
      } else if (arch === 'magic') {
        G.lastResult = `"Carried sealed tubes," the runner says. "Heavy ones, the kind you use for atmospheric sample transport. But not labeled — no collection markings. Samples taken without formal collection protocol." Someone has been collecting material from the affected zone for their own analysis. The samples they're carrying could confirm everything Letha has measured, or reveal something additional.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They asked what I'd seen on the northeast route," the runner says. "I told them about the air quality. They listened carefully, didn't take notes in front of me. When they thought I wasn't watching, they made a single mark on a document they kept folded inside their coat." A field intelligence collection operation using casual conversation. They're building a picture from multiple source contacts without any one contact knowing they're being used.`;
      } else {
        G.lastResult = `"They were troubled," the runner says. "Not frightened — troubled. Like someone who has seen something they didn't want to see and is now deciding what to do about it." Someone was in the northeast zone personally. They saw what's happening at source. And they're now moving toward Shelkopolis with that knowledge.`;
      }

      G.lastResult += ` Someone else has been in the field on this same investigation and they're ahead of you.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative moving from northeast zone toward Shelkopolis ahead of you — field intelligence collected, same destination', `plumes-rival-${G.dayCount}`);
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
window.PLUMES_END_OUTPOST_STAGE1_ENRICHED_CHOICES = PLUMES_END_OUTPOST_STAGE1_ENRICHED_CHOICES;
