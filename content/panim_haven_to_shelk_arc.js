/**
 * PANIM HAVEN → SHELKOPOLIS TRAVEL ARC
 * Journey from the Bureau reckoning district to Stage 2 hub
 * Narrative: Case fragments from the Bureau, Tazren's shadow, coastal passage surveillance
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 */

const PANIM_HAVEN_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  {
    label: "The Bureau case fragments point toward Shelkopolis. Tazren was last seen heading inland. Follow the thread.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'departing Panim Haven following Tazren\'s trail');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The Bureau assigned Tazren to a case that officially doesn't exist anymore. Three documents reference a "coastal passage irregularity review" that was closed before conclusions. You have the case number. Whatever it found, it was suppressed at the Bureau director level. Tazren kept working. He's not in Panim Haven anymore, which means you shouldn't be either.`;
      G.recentOutcomeType = 'neutral';
      addJournal('decision', 'Left Panim Haven following Bureau case and Tazren\'s trail inland', `panim-arc-departure-${G.dayCount}`);
    }
  },

  {
    label: "Panim Haven's coastal road has Oversight Collegium observation posts at irregular intervals. Travel through the harbor district to bypass them.",
    tags: ['ArcRoad', 'Stealth', 'Risk'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'bypassing Collegium observation posts via harbor district');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The harbor district's commercial traffic — deliveries, boat maintenance crews, fish market workers — provides the cover of normal movement. You move through it without drawing attention and exit the city via the freight gate rather than the main road. No one logs you as departing.`;
        G.flags.panim_arc_clean_exit = true;
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `An observation post clerk calls out to verify your transit papers. Standard procedure. You're logged as departing for "research transit — inland." Your exit time is recorded.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.recentOutcomeType = 'complication';
      }
    }
  },

  {
    label: "Complainant Sera, whose case was dismissed under Tazren's watch, left a message at the harbor master's office. She's already in Shelkopolis.",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'finding Sera\'s message at the harbor master\'s office');
      if (!G.flags) G.flags = {};

      G.lastResult = `The note is brief: "Case 4-Reckoning is not closed. Contact the Panim network through the textile factor in Shelkopolis's Verdant Row. Ask for Sana. She's been holding the case record since the Bureau dismissed it." Sera moved faster than you. Whatever she found in Panim Haven was enough to move immediately.`;
      G.flags.panim_arc_sera_in_shelk = true;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('Sera in Shelkopolis — Case 4-Reckoning record held by Sana in Verdant Row', 'discovery', `panim-arc-sera-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  // ——— SOFT TRIGGER deepening ———

  {
    label: "The Bureau case number connects to a coastal passage that moved containers south two months before the Reckoning Quarter irregularities began. Tazren found the sequence.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 80,
    condition: function() { return (G.investigationProgress || 0) >= 5; },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'connecting Bureau case to coastal passage timeline');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `The coastal passage irregularities started sixty days before Tazren's case was opened. He was responding to something that had already been in motion. The containers that moved through Panim Haven's harbor during that window are the same weight class as the ones in the Harvest Circle routing anomalies. Tazren saw the overlap. That's why his case was suppressed and not simply dismissed.`;
      G.flags.panim_arc_tazren_sequence = true;
      addJournal('Tazren found the container timeline overlap — case suppressed because he was right', 'discovery', `panim-arc-sequence-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "A road waystation: a Bureau courier is waiting for the morning route. She's carrying sealed dispatches. You recognize the case number prefix on the outer label.",
    tags: ['ArcDeepening', 'Investigation', 'Risk'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'observing Bureau courier with familiar case prefix');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The case number prefix is the same series as Tazren's suppressed case — but the suffix is new. Someone has reopened the case under a different number. Bureau administrative procedure: when a case is suppressed by order, it can be reconstructed under a new case number by a different adjudicator if new evidence emerges. Someone inside the Bureau is continuing what Tazren started.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Bureau reopened Tazren\'s case under new number — inside contact still working', 'discovery', `panim-arc-reopen-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The prefix looks familiar but you can't place it precisely — the courier is careful about not letting the labels be read. You file the observation.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Oversight Collegium observer Tren Callow's patrol record shows irregular check-ins near the inland route. Someone is watching this road specifically.",
    tags: ['ArcDeepening', 'Survival', 'Risk'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'reading Callow\'s irregular patrol as surveillance of the route');
      if (!G.flags) G.flags = {};

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Callow's patrol pattern isn't a route — it's a watch. He covers a three-kilometer stretch of the inland road on irregular schedules, which is exactly how you'd monitor a road without being predictable enough for someone traveling it to avoid you. You adjust your timing and come through during a gap in his pattern.`;
        G.flags.panim_arc_avoided_callow = true;
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `You see Callow before he sees you and change roads, adding two hours to the journey. You arrive later but unobserved by him specifically.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— ARRIVAL ———

  {
    label: "Shelkopolis eastern approach. The Reckoning Quarter's administrative network connects to every major district. Panim Haven's case fragments belong here.",
    tags: ['ArcArrival', 'Lore', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'arriving at Shelkopolis eastern approach');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `Shelkopolis's administrative districts mirror Panim Haven's Reckoning Quarter but at a larger scale — case records, appeals, institutional oversight all flow through here. Whatever the Bureau suppressed in Panim Haven, the central administrative record is in Shelkopolis. The original document may still exist somewhere in this city's archive.`;
      G.flags.panim_arc_administrative_surveyed = true;
      addJournal('Shelkopolis central administrative archive — Panim Bureau suppressed record may exist here', 'discovery', `panim-arc-admin-${G.dayCount}`);
      G.recentOutcomeType = 'neutral';
    }
  },

  {
    label: "Find Sana at the Verdant Row textile factor. Sera said she's been holding Case 4-Reckoning since the Bureau dismissed it.",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'finding Sana with Case 4-Reckoning record');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Sana is in her fifties, runs a legitimate textile operation, and has been holding case records for the Panim network for eight years. "Case 4-Reckoning has twenty-three attached documents," she says, sliding a portfolio across the counter. "Tazren filed the last six before his case was suppressed. He knew what was in the coastal passage. He just couldn't prove who authorized it." She stamps you into the network. You have the full case record now.`;
        G.flags.met_sana_verdant_row = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Sana: full Case 4-Reckoning record — 23 documents, Tazren\'s 6 final filings included', 'discovery', `panim-arc-sana-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Sana needs verification before she hands over case records to someone she hasn't met. She gives you a test — a document she says is incomplete and asks you what's missing. You'll need to come back with the right answer.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— HARD GATE ———

  {
    label: "Tazren's case was suppressed because he was right. The evidence you've gathered from Panim Haven continues his work. Move to Shelkopolis.",
    tags: ['ArcGate', 'Decision'],
    xpReward: 80,
    condition: function() { return G.level >= 6 && !(G.flags && G.flags.panim_arc_departing); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'committing to continue Tazren\'s investigation in Shelkopolis');
      if (!G.flags) G.flags = {};
      G.flags.panim_arc_departing = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The Bureau closed Tazren's case because the evidence pointed at something large enough to be inconvenient. You've gathered enough since then to know he was correct. The conclusion of his case — what he was trying to prove — is in Shelkopolis. So is the answer to why it was suppressed.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— FINALE ———

  {
    label: "Arrive in Shelkopolis. The Bureau case that was suppressed in Panim Haven has its answer here, in the city the coastal passage was supplying.",
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() { return (G.investigationProgress || 0) >= 5 || G.level >= 6; },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis from Panim Haven');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_panim_haven = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      const finalText = arch === 'combat' ? ` The coastal passage operation moved material efficiently and quietly. Whoever organized it has logistics discipline you'd associate with a military planning structure.`
        : arch === 'magic' ? ` The suppression of Tazren's case required institutional access at the Bureau director level. Whoever gave that order knew exactly what they were protecting.`
        : arch === 'stealth' ? ` Everything from Panim Haven was designed to be unmemorable — a case closed, a complainant dismissed, a courier who never existed. The operation's signature is negative space.`
        : ` Tazren spent months documenting something that was designed to be undocumentable. You're carrying what he found to the city it was pointing at.`;

      G.lastResult = `Shelkopolis.${finalText} Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 2;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('consequence', 'Arrived in Shelkopolis from Panim Haven — Stage 2 begins', `panim-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];

window.PANIM_HAVEN_TO_SHELK_ARC = PANIM_HAVEN_TO_SHELK_ARC;
