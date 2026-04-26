/**
 * PLUMES_END OUTPOST STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 investigation paths grounded in frontier patrol and pressure gradient early signs
 * Plumes End: a remote frontier outpost where pressure gradient readings have been changing in a pattern nobody can explain
 * Named NPC: Letha Dawnsilk (the outpost commander whose pressure measurement records have been suppressed)
 */

const PLUMES_END_OUTPOST_STAGE1_ENRICHED_CHOICES = [

  // 1. FIRST ENCOUNTER: LETHA DAWNSILK
  {
    label: "The outpost commander's pressure logs were reclassified. She's still here.",
    tags: ['Investigation', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'meeting Commander Letha Dawnsilk');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `The stockade wall throws its morning shadow across the checkpoint barrier at the track junction — the eastern track already gone soft at the shoulder, less maintained than the road in. Letha Dawnsilk has the reports stacked on the left side of her desk — a six-month column of paper, organized by date. She doesn't offer you a seat. She checks the window before she answers. Not the street outside — the reflection in the glass. "I've been sending pressure anomaly readings to central coordination for six months. Three months ago they stopped acknowledging receipt. Two months ago I was told the measurements were under review and not to share them externally." She taps the stack. She never stopped writing the reports. "If they won't use them, at least they exist."  `;
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
    label: "Letha's six months of pressure records are sitting on that desk.",
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
        const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
        if (result.total >= 12) {
          G.lastResult = `Six months of readings, laid out in order: the gradient is directional, not diffuse, building consistently from the northeast quadrant — the direction that puts Aurora Crown Commune at its origin point. Low-level, slow-building, not matching any weather or seasonal pattern. Four months ago the rate of increase accelerated. Letha has the date circled. It corresponds to the period when Aurora Crown's dome filtration additive was substituted. Whatever the dome is releasing has been propagating outward from that point. Plumes End is reading the leading edge of it.`;
          G.flags.analyzed_pressure_reports = true;
          addJournal('Pressure gradient: directional increase from Aurora Crown quadrant, accelerated 4 months ago — atmospheric event propagating from dome compound substitution', 'discovery', `plumes-pressure-${G.dayCount}`);
        } else {
          G.lastResult = `The pressure records show a clear trend in the columns, but the numbers resist easy interpretation — units specific to atmospheric dynamics, reference ranges Letha has to look up in a technical manual she ordered three months ago. "I know what I measured," she says. "I can't tell you what it means at a systems level." The data exists. The framework to defend it in formal review is still being assembled.`;
        }
      } else {
        G.lastResult = `Letha's desk holds six months of pressure records, but access to them runs through her alone. The suppression order pulled the reports from the official distribution chain — no copies at central coordination, no duplicate filed with the patrol station's intake register. What exists is in this room, on those shelves, behind a commander who hasn't decided yet whether you're someone she can trust with them.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 3. CLUE: CENTRAL COORDINATION SUPPRESSION
  {
    label: "Someone issued that suppression order. The name on it isn't in any standard directory.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing suppression order chain');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The suppression order came through a "regional environmental coordination office" — a body Letha has never received communications from before. The instruction was formatted correctly for a central coordination directive, but the issuing office doesn't appear in the standard directory of regional oversight bodies. Another ghost institution. Someone inserted a suppression order into the legitimate communication chain using a fabricated authority. Letha's reports were silenced by an entity that technically doesn't exist.`;
        if (!G.flags) G.flags = {};
        G.flags.found_suppression_source = true;
        addJournal('Suppression order from ghost institution "regional environmental coordination office" — same pattern as Whitebridge ghost account, Unity Square ghost category', 'evidence', `plumes-suppression-${G.dayCount}`);
      } else {
        G.lastResult = `The suppression order arrived in standard formatting — header, reference number, issuing body name — and passed the intake clerk's verification. The issuing body is unfamiliar, but the regional authority directory is a bound volume behind Letha's desk, not a document you can access independently. Without it, the name could be legitimate and obscure, or fabricated to read as legitimate. The difference requires a directory you don't have.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 4. INVESTIGATION: WILDLIFE BEHAVIOR CHANGES
  {
    label: "The patrol rangers have been watching the northeast corridors empty out.",
    tags: ['Investigation', 'Survival', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'gathering wildlife behavior data');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Patrol rangers have documented movement pattern changes in birds and large mammals starting four months ago. Animals are shifting territory southward and away from the northeast quadrant. "We've seen this before during volcanic pressure events," one ranger says. "But there's no geological activity in that direction." What there is: an atmospheric pressure gradient that animals are sensitive to before human instruments detect it clearly. The fauna have been evacuating the affected zone. The gradient is real and it's been building long enough for wildlife to notice.`;
        if (!G.flags) G.flags = {};
        G.flags.found_wildlife_evidence = true;
        addJournal('Wildlife territorial shift southward from NE quadrant for 4 months — fauna evacuating before instruments detect full gradient', 'evidence', `plumes-wildlife-${G.dayCount}`);
      } else {
        G.lastResult = `The rangers have documented movement changes in their patrol logs — fewer animals along the northeast corridors, grazing pressure shifting south — but the patrol debrief notes call it seasonal variation. One ranger mentions it's been running long for a season shift, then stops himself. Without Letha's directional pressure data to set beside the patrol observations, the pattern stays inconclusive; the rangers have no framework to measure what they've been watching.`;
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
    label: "The Warden Order's coordinator doesn't know what Letha has been measuring.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Warden Order contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Patrol coordinator Sera Vance receives the summary of Letha's reports with visible concern. "We've had two other outposts report communication disruptions from the same regional coordination source — the one that told Commander Dawnsilk to suppress her readings." She pauses. "If the same ghost authority is suppressing data at multiple outposts simultaneously, there's a systematic information blackout in the field." The Warden Order has been operating with deliberately incomplete atmospheric data across the region. They're operating blind in a zone that's actively changing.`;
        if (!G.flags) G.flags = {};
        G.flags.met_warden_order_plumes = true;
        G.factionHostility.warden_order += 1;
        addJournal('faction', 'Warden Order coordinator Sera Vance: ghost authority suppressed reports at multiple outposts — systematic regional information blackout confirmed', `plumes-warden-${G.dayCount}`);
      } else {
        G.lastResult = `The Warden Order's regional coordinator is courteous and unhelpful in equal measure. An inquiry requires documentation submitted through the standard regional channel — the same channel the suppression order closed. Letha's reports would need to be formally re-filed as new submissions, which requires a patrol dispatch authorization she'd have to request from the same coordination body that suppressed the originals. The process folds back on itself.`;
        if (!G.flags) G.flags = {};
        G.flags.located_warden_order_plumes = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 7. SOCIAL: THE VETERAN PATROL RANGER
  {
    label: "Eleven years on this frontier. He knows what the air used to feel like.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'interviewing veteran patrol ranger');

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Ranger Coss has been patrolling this frontier for eleven years. "The air here used to be clean. We'd go days without needing the patrol's environmental gear." He pauses. "Now I wear it for extended northeast patrols. Not orders — just habit. I don't feel right without it in that direction anymore." He hasn't been formally told to wear protective equipment on northeast routes. He started doing it himself three months ago because his body told him to. His nervous system is picking up what the instruments are measuring.`;
        if (!G.flags) G.flags = {};
        G.flags.met_coss_ranger = true;
        addJournal('contact', 'Veteran ranger Coss: wearing protective equipment on NE routes voluntarily for 3 months — body-level detection of atmospheric change preceding formal orders', `plumes-coss-${G.dayCount}`);
      } else {
        G.lastResult = `The ranger keeps his eyes on the patrol board when you ask about the northeast routes. The suppression order circulated to all outpost personnel — measurements under review, not for informal discussion. He straightens a posting on the board that doesn't need straightening. "I don't have anything to add to the official record." He says it carefully, the way someone says something they've been told to say and have been practicing.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 8. MORAL PRESSURE: LETHA'S POSITION
  {
    label: "The official channels are compromised. Letha knows it. She's waiting to see if I do.",
    tags: ['Moral', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'Letha escalation decision');
      if (!G.flags) G.flags = {};

      G.lastResult = `"If I go through official channels and they're compromised, I'm just feeding information to the people suppressing it," Letha says. She checks the window before she continues — not the street outside, the reflection in the glass. "If I go around them, I'm potentially violating my chain of command in a way that would give them grounds to dismiss my reports as unauthorized." She has six months of valid, documented data about an atmospheric event that's affecting people's ability to live in the affected zone. And she's been structurally blocked from sharing it. She's asking how to move without losing the authority that makes her reports credible.`;
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = 'Letha Dawnsilk';
      addJournal('consequence', 'Letha Dawnsilk escalation decision: official channels compromised, unofficial channels risk authority — structural trap', `plumes-letha-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 9. INVESTIGATION: THE COMPOUND ELEMENT IN THE GRADIENT
  {
    label: "Something is in that gradient. The outpost equipment might be able to name it.",
    tags: ['Investigation', 'Craft', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'analyzing atmospheric gradient chemistry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Using the outpost's environmental analysis equipment, you capture and analyze a sample from the northeast perimeter. The gradient contains trace levels of the same compound class that Jorin identified at Craftspire and that Glasswake's shard amplification data describes as dangerous in atmospheric applications. At Plumes End, the concentration is still low — the leading edge of whatever is propagating from Aurora Crown's zone. At source concentration, this compound class would be significantly more hazardous. Plumes End is in the far fallout zone. Aurora Crown is in the source zone.`;
        if (!G.flags) G.flags = {};
        G.flags.analyzed_gradient_chemistry = true;
        addJournal('Atmospheric gradient chemistry: trace levels of same compound class as Craftspire extraction and Glasswake shard data — Plumes End in far fallout zone, Aurora Crown at source', 'discovery', `plumes-chemistry-${G.dayCount}`);
      } else {
        G.lastResult = `The outpost's field equipment is calibrated for patrol conditions — wide-area presence detection, not compound-class isolation. The sample registers something: a reading above baseline, a minor variance in the ambient trace signature. But the instruments can't narrow it further than that. Whether this matches the class Jorin described at Craftspire, the data won't say. Presence confirmed. Identity of what's present: unresolved. The frontier station was never equipped to answer the harder question.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 10. ATMOSPHERE: THE FRONTIER AT DAWN
  {
    label: "The northeast horizon looks wrong. Letha has been watching it change for six months.",
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
    label: "This outpost was built to detect something from the northeast. There was a previous event.",
    tags: ['Investigation', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'comparing historical atmospheric records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Historical records at Plumes End go back forty years. One comparable gradient event: recorded sixty-three years ago, before the outpost's current archive. A note references it in the archive's preface as a reason the outpost was established — "to provide early detection of atmospheric irregularities in the northeastern territories." The outpost was built because of a previous event from this direction. Whatever happened sixty-three years ago was significant enough to establish a permanent monitoring presence. Letha is detecting the early signs of a second occurrence of something that was judged severe enough to warrant permanent outpost installation.`;
        addJournal('Historical comparison: outpost established after similar event 63 years ago — Plumes End exists specifically to detect early signs of NE atmospheric irregularity', 'discovery', `plumes-historical-${G.dayCount}`);
      } else {
        G.lastResult = `The archive room holds forty years of outpost records in bound seasonal volumes, organized by quarter on open shelving. Forty years is as far as the current archive goes — the preface notes a prior records system that wasn't transferred when the outpost was rebuilt. Whatever gradient events predated the current archive's opening are referenced only in the aggregate, not documented. The earlier period is a gap in the record, not a gap in the history.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 12. PERSONAL ARC: LETHA'S REPORTS OFFSITE
  {
    label: "Letha's six months of records can't stay here. The suppression knows where to look.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'securing Letha\'s reports offsite');
      if (!G.flags) G.flags = {};

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Letha prepares a secondary copy of the six months of reports — formatted as standard patrol documentation, which is what they officially are. A patrol supply run to Shelkopolis carries the copy inside a standard patrol dispatch bag. The suppression order was applied to the official reporting channel. The patrol dispatch channel runs separately. Letha found the gap in the suppression and used it. The reports are on their way to Shelkopolis.`;
        G.flags.letha_reports_secured = true;
        addJournal('consequence', 'Letha\'s 6-month pressure reports secured via patrol dispatch channel — gap in suppression order exploited', `plumes-reports-secure-${G.dayCount}`);
      } else {
        G.lastResult = `The suppression order arrived through the standard reporting channel and the outpost's communications handler took it as covering everything that goes out. Every category of outgoing report is now staged for review before transmission. The language of the order is broad enough that challenging its scope would require someone willing to put their name to the challenge — and Letha's people can't afford that visibility. Finding an exempt path means identifying which categories the order didn't name, and whether any of them fit what Letha documented.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 13. RUMOR LAYER
  {
    label: "The supply traders hear everything. The northeast has been producing more worth remembering lately.",
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

      G.lastResult = `The supply traders work the frontier circuit in long loops — Plumes End is one of six stops, and they talk to everyone at each one. Over a cup at the outpost's supply desk, the account surfaces: ${selected}. The traders don't know what to make of it. They're not paid to make sense of what they hear. But they remember it, because this stretch of the frontier has been producing more things worth remembering lately.`;
      addJournal(`Plumes End frontier trader rumor: "${selected}"`, 'evidence', `plumes-rumor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 14. SOCIAL: THE ABANDONING FARMER
  {
    label: "Three farming families left their northeast holdings without harvesting. People don't abandon a harvest.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'interviewing displaced frontier farmer');

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Farmer Edne abandoned a holding her family maintained for three generations. "The headaches started first. We thought it was the season. Then the animals started leaving — not running, just slowly moving their grazing toward the south. We moved too when my youngest stopped sleeping through the night and our water tasted wrong." She describes symptoms consistent with low-level exposure to the compound class Letha's data suggests is present. "I couldn't tell you what was wrong. I just knew something was." She left with almost nothing. The holding is still there. She's not going back.`;
        if (!G.flags) G.flags = {};
        G.flags.met_edne_farmer = true;
        addJournal('contact', 'Farmer Edne: abandoned 3-generation holding due to headaches, animal behavioral changes, sleep disruption, water taste — symptom profile matches low-level compound exposure', `plumes-edne-${G.dayCount}`);
      } else {
        G.lastResult = `The frontier supply traders know there were farmers moving south from the northeast holdings last season — they carried some of them on cart beds — but where those people settled afterward, none of the traders tracked. Displaced families don't announce a destination. They move until they find a place willing to take them, then go quiet. Finding specific individuals among that scatter requires someone with outpost-level network reach across all the way stations between here and the interior.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 15. INVESTIGATION: THE SCALE OF THE AFFECTED ZONE
  {
    label: "Letha's directional readings can anchor a radius calculation. The zone is bigger than anyone has said.",
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
        const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));
        if (result.total >= 12) {
          G.lastResult = `Combining Letha's directional readings with the wildlife displacement corridors and the farmer abandonment pattern: the gradient's effective zone is approximately eighty kilometers across at Plumes End's distance. Scaling backward to the Aurora Crown source location and applying atmospheric diffusion models, the source zone would be experiencing concentrations approximately forty times what Plumes End is detecting. At that concentration, long-term residence becomes medically hazardous. Aurora Crown's dome has been releasing this compound at forty times safe exposure levels for potentially four months.`;
          G.flags.mapped_affected_zone = true;
          addJournal('Affected zone: 80km across at Plumes End distance, source zone (Aurora Crown area) at ~40x safe concentration levels for 4 months', 'discovery', `plumes-zone-map-${G.dayCount}`);
        } else {
          G.lastResult = `A zone map needs a directional anchor — a point of origin confirmed by sequential readings from a fixed station. Letha's six months of directional data is exactly that anchor. Without her records, the wildlife displacement corridors and farmer abandonment pattern can suggest a direction but not a radius, and atmospheric diffusion calculations without a known source location produce margins too wide to be actionable. The math requires her measurements.`;
        }
      } else {
        G.lastResult = `The zone mapping can't be built without Letha's six months of directional readings. Everything else — the wildlife displacement, the farmer accounts, the patrol observations — points toward a general direction. Precise radius calculation requires a station log from a fixed point, with consistent measurement intervals and a dated baseline. That log is Letha's. The work at this desk starts with the work at hers.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 16. ATMOSPHERE: PLUMES END AT NIGHT
  {
    label: "After dark, the northeast horizon has a glow that doesn't match any settlement.",
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
    label: "If Letha's reports had arrived, the hazard protocol would have triggered four months ago.",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'understanding suppression motivation');

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Standard central coordination protocol for a consistent atmospheric anomaly of Plumes End's reported scale: automatic environmental hazard assessment, mandatory field inspection, public notification if the assessment confirms hazard. The suppression prevented that protocol from triggering. If Letha's reports had arrived, the field inspection would have identified Aurora Crown's contamination zone four months ago — before the affected population had been exposed for the full duration. The suppression didn't just hide the data. It extended the exposure window by four months.`;
        addJournal('Suppression consequence: prevented standard hazard protocol from triggering — exposure window extended by 4 months deliberately', 'evidence', `plumes-suppression-purpose-${G.dayCount}`);
      } else {
        G.lastResult = `The suppression order blocked the reports, but what that blocking actually prevented requires knowledge of central coordination's response thresholds — the specific anomaly scale that triggers an automatic environmental hazard assessment, and how quickly that process moves. The outpost's protocol manual doesn't include coordination-level procedures. Whatever the suppression bought in time, the calculation sits behind a document you don't have access to here.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 18. WORLD COLOR: LETHA'S READING HABITS
  {
    label: "Letha has three volumes of atmospheric chemistry texts she didn't have six months ago.",
    tags: ['WorldColor', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 48,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(48, 'learning Letha\'s research focus');

      G.lastResult = `Letha has three volumes of atmospheric chemistry texts she's been reading since the gradient appeared. She checks the window before she answers — not the street outside, the reflection in the glass. "I'm an operations commander, not a chemist," she says. "But if my reports are going to be taken seriously, I need to understand what I'm measuring well enough to defend the data." She's been educating herself specifically so she can argue for her own observations. The suppression has turned a frontier commander into a self-taught atmospheric scientist. The work she's doing is beyond her job description and she knows it. "Someone needs to understand this," she says simply.`;
      addJournal('Letha self-educating in atmospheric chemistry to defend suppressed data — command competence in response to institutional suppression', 'discovery', `plumes-letha-books-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 19. INVESTIGATION: THE FULL PICTURE
  {
    label: "Plumes End is detecting the leading edge. The operation is already in progress.",
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
    label: "A supply runner saw someone moving south from the northeast — too fast, too purposeful.",
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
      G.flags.stage1_rival_seeded = true;
      addJournal('warning', 'Rival-adjacent operative moving from northeast zone toward Shelkopolis ahead of you — field intelligence collected, same destination', `plumes-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // TYPE: PRESSURE — WORLD COLOR VIGNETTE
  {
    label: "The wind at Plumes End has a name the patrol uses among themselves that doesn't appear on any map.",
    tags: ['WorldColor', 'Atmosphere', 'Stage1'],
    xpReward: 38,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'learning the frontier wind name');
      G.lastResult = `The patrol at Plumes End calls the northeast wind "the push" — named for what it does to the pressure readings, which reliably spike when the wind turns northeast for more than two consecutive days. It's not in any official meteorological record; the name lives in patrol hand-off notes and verbal briefings and the shorthand entries in Letha's personal log. The meteorological charts the outpost files use compass bearings and seasonal designations. "The push" is a local invention, precise in meaning to anyone stationed here long enough to know what it predicts. Letha uses it without explanation in six months of notes, expecting whoever reads them to know what it means.`;
      G.recentOutcomeType = 'observe'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — ARCHETYPE GATE (Knight archetype / mounted)
  {
    label: "The patrol routes on the northeast circuit were quietly shortened three months ago — the amended maps never reached the supply traders.",
    tags: ['Pressure', 'ArchetypeGate', 'Stage1'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const arch = G.archetype || '';
      const isMounted = (arch === 'Knight') || (G.archetype && G.archetype.name === 'Knight');
      if (!isMounted) {
        G.lastResult = `The patrol coverage maps at Plumes End show routes that stop short of where the older maps show them continuing. Someone reduced the patrol depth into the northeast three months ago. You note the discrepancy in the posted vs. archived maps without being able to determine whether the decision was operational or institutional.`;
        gainXp(32, 'noting patrol route discrepancy');
        G.recentOutcomeType = 'observe'; maybeStageAdvance(); return;
      }
      gainXp(70, 'analyzing patrol route reduction');
      G.stageProgress[1]++;
      G.lastResult = `The amended patrol maps cut the northeast circuit at the ridge line — stopping three leagues short of where the pre-amendment maps showed the boundary. For mounted patrol, three leagues is forty minutes of coverage. The reduction leaves the affected zone unmonitored without removing it from the patrol jurisdiction record: the outpost still officially covers the area, it simply no longer sends patrols there. Whatever is producing the pressure anomalies in the northeast is now in a monitored-but-unvisited zone. The amendment created that status deliberately.`;
      if (!G.flags) G.flags = {};
      G.flags.plumes_route_reduction = true;
      addJournal('Patrol route amendment: northeast circuit shortened to ridge line 3 months ago — affected zone officially covered but no longer visited', 'evidence', `plumes-routes-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — BACKGROUND FLAVOR
  {
    label: "The outpost's supply manifest has a line item that appears every month but corresponds to no equipment in the inventory.",
    tags: ['Pressure', 'Background', 'Stage1'],
    xpReward: 55,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'checking outpost supply manifest against inventory');
      const bg = G.background || '';
      let result = `The monthly supply manifest includes a recurring line item: "specialized atmospheric monitoring equipment — maintenance allocation." The equipment cache at the outpost carries standard patrol gear, emergency supplies, and survey instruments. No atmospheric monitoring equipment appears in the inventory. The allocation exists. The equipment doesn't. The monthly allocation line has been running for fourteen months.`;
      if (bg === 'soldier' || bg === 'scout') {
        result = `Supply manifests at frontier outposts carry ghost line items occasionally — budget allocations for equipment that was requested, approved, never delivered, but whose allocation wasn't cancelled. Standard administrative lag. This one is different: "specialized atmospheric monitoring equipment" has been in the manifest for fourteen months with a maintenance allocation rather than an acquisition allocation. You don't allocate for maintenance on equipment you don't yet have. Either the equipment existed and was removed without updating the manifest, or the line item is covering funding that's going somewhere other than equipment.`;
      }
      G.lastResult = result;
      addJournal('Plumes End supply manifest: 14-month maintenance allocation for atmospheric monitoring equipment absent from inventory', 'evidence', `plumes-manifest-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — RISKY
  {
    label: "The outpost's communications log shows a two-week gap in acknowledged receipt from the central coordination channel.",
    tags: ['Pressure', 'Risky', 'Records', 'Stage1'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reviewing outpost communications log');
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Outpost communications logs run continuous — every transmission sent, every acknowledgment received, dated and signed by the duty clerk. The gap runs from the third to the seventeenth of last month: outpost transmissions continue normally, but the received-acknowledgment column goes blank. Sixteen days of sent dispatches with no return signal. During that same window, Letha's log shows the pressure readings reached their highest recorded value. Someone at the receiving end stopped responding to Plumes End during the period when the outpost's data was most significant.`;
        if (!G.flags) G.flags = {};
        G.flags.plumes_comms_gap = true;
        addJournal('Communications log gap: 16 days of unanswered dispatches during peak pressure anomaly period — silence at the moment data was most significant', 'evidence', `plumes-comms-${G.dayCount}`);
      } else {
        G.lastResult = `The communications log lives in the duty station, which runs on Letha's posted schedule — the log is accessible during the daily administrative period, which closed forty minutes ago and won't reopen until the morning rotation. The gap Letha mentioned informally is in that log. It's also in her personal records, which she's offered to share. The official log version is one day away.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — BOLD
  {
    label: "The suppression order's language has a clause that Letha didn't receive — someone edited the version sent to Plumes End.",
    tags: ['Pressure', 'Bold', 'Records', 'Stage1'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'comparing suppression order versions');
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 14) {
        G.lastResult = `The suppression order that arrived at Plumes End is missing clause four from the standard template — the clause that specifies exemptions for emergency communications when patrol safety is at risk. That clause is in every other suppression order in the outpost's archive of similar directives. Its absence means Letha's staff believed they had no communication exemption even in an emergency. The version sent here was modified before dispatch. Someone specifically targeted this outpost's ability to break the silence under any circumstances.`;
        if (!G.flags) G.flags = {};
        G.flags.plumes_order_modified = true;
        addJournal('Suppression order comparison: Plumes End version missing emergency exemption clause present in all other archived orders — targeted modification', 'evidence', `plumes-order-${G.dayCount}`);
      } else {
        G.lastResult = `Comparing the suppression order's language against the standard template requires access to the archive of similar directives, which Letha keeps but is currently reviewing. Getting the specific version sent here alongside the template requires that review to complete first, or her authorization to access the archive directly. The comparison is a half-hour task once the materials are in hand.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — SAFE/SOCIAL
  {
    label: "The youngest patrol member has been on the northeast route more times than anyone else at this outpost.",
    tags: ['Pressure', 'Safe', 'NPC', 'Stage1'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'talking to the northeast patrol veteran');
      G.lastResult = `Recruit Wess has completed the northeast patrol circuit fourteen times — more than any other active member, because nobody else accepts the assignment twice voluntarily. "The air changes about two hours in," he says. He's not alarmed by this; alarm faded somewhere around the sixth patrol. "You can taste it. Sweet, wrong — the kind of wrong you notice once and then spend the rest of the patrol trying not to breathe deeply." He adjusts his route markers when he returns from each one, noting where the air quality boundary moved. The boundary has moved south on every patrol for the past three months. It's getting closer.`;
      if (!G.flags) G.flags = {};
      G.flags.met_wess_patrol = true;
      addJournal('Patrol recruit Wess: sweet-wrong air quality shift on northeast route, boundary moving south each patrol for 3 months', 'evidence', `plumes-wess-${G.dayCount}`);
      G.lastResult += ' The boundary has moved south on every patrol for three months. The thread points the same direction it has been pointing.';
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — SOCIAL/RISKY
  {
    label: "The regional Compact officer who is supposed to review Plumes End's monthly reports hasn't visited in eight months.",
    tags: ['Pressure', 'Risky', 'NPC', 'Stage1'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'inquiring about Compact oversight absence');
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `The Compact regional officer was here eight months ago for a standard quarterly review — the last one. The two scheduled reviews since then were postponed, then cancelled with a form notice citing "administrative reorganization." The reorganization notice arrived once. No further explanation followed. Letha filed her quarterly reports to the standard address regardless. Return acknowledgments came back with a different signature each time — different people, different handwriting, no consistent reviewer. The oversight structure for this outpost has been unstaffed or deliberately rotated for eight months.`;
        if (!G.flags) G.flags = {};
        G.flags.plumes_oversight_gap = true;
        addJournal('Compact oversight absent 8 months: quarterly reviews cancelled, return acknowledgments signed by different people each time — oversight structure deliberately disrupted', 'evidence', `plumes-oversight-${G.dayCount}`);
      } else {
        G.lastResult = `Administrative records of the Compact review schedule live in the duty station's external correspondence folder — posted visits, cancellation notices, acknowledgment logs. The duty station is staffed but the correspondence folder is under Letha's administrative access. This is a request she'd need to authorize. Given her established cooperation, it's a request she'd authorize. The conversation needs to happen first.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — ATMOSPHERE
  {
    label: "The supply station has a small hearth that the overnight watch keeps burning regardless of the season.",
    tags: ['WorldColor', 'Atmosphere', 'Stage1'],
    xpReward: 35,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(35, 'observing the outpost overnight hearth');
      G.lastResult = `The supply station hearth runs through the night on every rotation — not for warmth, which is adequate without it, but because the overnight watch developed the habit after the first northeast patrols started returning with the smell of the affected zone on their gear. The hearth smoke clears the space. Practical in the way frontier adaptations always are: an observation that became a practice that became a rotation standard without ever being written into the duty manual. The current watch officer learned it from the previous one, who learned it from Wess. The outpost's institutional memory lives in the habits, not the records.`;
      G.recentOutcomeType = 'observe'; maybeStageAdvance();
    }
  },

  // TYPE: PRESSURE — BOLD/STEALTH
  {
    label: "The northeast zone boundary cairns have been moved — they mark a smaller area than the map shows.",
    tags: ['Pressure', 'Bold', 'Physical', 'Stage1'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'checking northeast boundary cairn positions');
      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The first boundary cairn on the northeast approach sits thirty meters south of where the patrol map marks it. The second sits forty meters south of its marked position. Both cairns are solid, weathered, look long-established — but the ground around the base of each shows faint disturbance, the kind that comes from moving a heavy stone and resetting the earth to erase the evidence of movement. The boundary of the "unsafe zone" has been physically contracted. Whatever is actually producing the atmospheric anomaly now sits outside the marked boundary, in territory that looks unmapped and unclaimed on any official document.`;
        if (!G.flags) G.flags = {};
        G.flags.plumes_cairns_moved = true;
        addJournal('Northeast boundary cairns: both moved south 30-40m from map positions — anomaly source now lies outside the officially marked danger zone', 'evidence', `plumes-cairns-${G.dayCount}`);
      } else {
        G.lastResult = `The northeast route past the boundary cairns puts you in territory where Wess marks the air quality shift. Reaching the cairn positions for comparison against the map requires passing through that threshold — which is manageable with preparation, less manageable unannounced. The patrol gear at the outpost includes the heavier protection Wess uses. Borrowing it before the approach is the difference between a survivable comparison and a miserable one.`;
      }
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
