/**
 * COSMORIA → SHELKOPOLIS TRAVEL ARC
 * Journey from the maritime city to Stage 2 hub
 * Narrative: Ghost vessel evidence, maritime transit laundering, administrator appointment log
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 */

const COSMORIA_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  {
    label: "The maritime transit laundering template from Cosmoria's registry explains how the ghost vessel operation maintained legal cover. Carry this framework inland to Shelkopolis.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'departing Cosmoria with maritime laundering template');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The template runs on three manifest categories: maintenance transit, emergency supply, and safety inspection response. Each triggers automatic port clearance — no secondary review required. The ghost vessels rotated between the three on consecutive voyages, keeping each category's usage low enough to avoid frequency flags. No single vessel appeared twice under the same category within any sixty-day window. This was not a workaround that developed through practice. Someone designed it specifically for the purpose of moving cargo through maritime checkpoints without it being opened.`;
      G.recentOutcomeType = 'neutral';
      addJournal('decision', 'Left Cosmoria with transit laundering template — three-category rotation designed to avoid flagging', `cosmoria-arc-departure-${G.dayCount}`);
    }
  },

  {
    label: "Iron Compact trade agent Sull Crenn has commercial offices in both Cosmoria and Shelkopolis. He manages the cross-city commercial relationship — which includes the port district charter.",
    tags: ['ArcRoad', 'Lore', 'Risk'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'tracing Crenn\'s dual-city commercial presence');
      if (!G.flags) G.flags = {};

      G.lastResult = `Crenn's Cosmoria office handles standard trade agent work — well-documented, nothing remarkable. His Shelkopolis office opened fourteen months ago. That date aligns with the charter renewal and the first ghost vessel transit window. The Cosmoria office provides the commercial credibility. The Shelkopolis office is where the operation runs. Anyone who flags your departure from Cosmoria's registry will report it there first.`;
      G.flags.crenn_in_shelkopolis = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      addJournal('discovery', 'Crenn has Shelkopolis office opened 14 months ago matching charter/vessel timeline — cover and operation', `cosmoria-arc-crenn-${G.dayCount}`);
      G.recentOutcomeType = 'complication';
    }
  },

  {
    label: "Sailor Kavan, who described the handlers with reactive material containers, is heading to Shelkopolis for a new posting. He doesn't realize what he witnessed.",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'traveling with Kavan toward Shelkopolis');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Kavan holds his hands apart to show container width, then height. "Merchant sailors load rough. These people were slow — two-person lifts, deliberate movements, no jarring." The handlers wore elbow-length gloves with wrist seals. He remembered because he had never seen that protocol used on freight he recognized as ordinary cargo. The dimensions he sketches match the three-to-five tonne weight class from Cadrin's Whitebridge bridge stress observations. The coastal and inland supply chains are handling identical containers.`;
        G.flags.kavan_traveling_south = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Kavan: container dimensions match Whitebridge weight class — inland and coastal supply chains are same containers', `cosmoria-arc-kavan-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Kavan is on a posting deadline and moves at a pace that discourages conversation. You share the road for half a day without more than a nod. He turns off at a junction and you keep south. What he witnessed is still only what you already know he witnessed — unconfirmed, unuseful without the right follow-up questions.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— SOFT TRIGGER deepening ———

  {
    label: "The administrator appointment log from Cosmoria: the current port administrator was appointed by a committee that includes the same Compact names as the Ithtananalor ghost account authorizations.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 80,
    condition: function() { return (G.investigationProgress || 0) >= 5; },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'connecting port administrator appointment to ghost account committee');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `Three names appear on both documents. The Cosmoria port administrator appointment committee, sixteen months ago. The Ithtananalor ghost account authorization records, fifteen months ago. One month between the committee's work and the ghost accounts going active. The administrator's role is operational — she approves the manifest categories the transit template uses for automatic clearance. She was appointed to that desk specifically so the clearance mechanism would have an authorized signature behind it.`;
      G.flags.cosmoria_arc_committee_link = true;
      addJournal('discovery', 'Port administrator appointed by same committee as ghost account authorizations — installed to approve transit clearances', `cosmoria-arc-committee-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "Cross-reference the ghost vessel registry with the Shelkopolis port authority's inbound manifest records. What arrived in Shelkopolis that matches what departed Cosmoria?",
    tags: ['ArcDeepening', 'Lore', 'Craft'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'cross-referencing Cosmoria departures with Shelkopolis arrivals');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Each ghost vessel departure date from Cosmoria corresponds to an arrival at Shelkopolis's secondary freight terminal, logged under one of the same three manifest categories. The transit times match standard maritime speed along the coastal route. The cargo that left Cosmoria's harbor arrived at Shelkopolis's secondary terminal. The last arrival entry is dated nineteen days ago. The coastal delivery phase of this supply chain finished before you left Cosmoria.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Ghost vessel departure dates match Shelkopolis secondary terminal arrivals — coastal delivery phase complete 19 days ago', `cosmoria-arc-crossref-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The Shelkopolis inbound manifest records are available to view but not to copy without a registered trade credential. You can read arrival dates and terminal categories. Cargo details are locked behind the secondary review tier. You have arrival patterns. What was in the containers stays unconfirmed until you find someone with better access.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "The tide marker on Cosmoria's harbor wall: a notation in weathered chalk, re-chalked weekly — coordinates. Someone is still communicating through this harbor.",
    tags: ['ArcDeepening', 'Survival', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'decoding tide marker notation');
      if (!G.flags) G.flags = {};

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The chalk notation is not harbor depth marking — the format is a compressed inland grid reference, updated weekly in fresh chalk over older marks. The coordinates resolve to a location in Shelkopolis's outer district. Someone at Cosmoria's harbor is still communicating position information to maritime contacts. The delivery phase may be complete but the operation has not withdrawn its presence from the harbor. Someone is still watching it and reporting south.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Tide marker: updated inland coordinates for Shelkopolis outer district — operation still has active maritime observer', `cosmoria-arc-tides-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The chalk marks follow a harbor notation format — depth references, current markers, standard piloting shorthand. You cannot read anything out of the ordinary in them without the background to decode a compressed grid reference from the format. You note that someone re-chalks them weekly. That is an unusual frequency for navigation marks that do not change.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— ARRIVAL ———

  {
    label: "Shelkopolis port district. The secondary freight terminal that the ghost vessels used is visible from the harbor road. You're standing at the delivery endpoint.",
    tags: ['ArcArrival', 'Survival', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'arriving at Shelkopolis secondary freight terminal');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `The secondary freight terminal sits adjacent to the main port — a smaller, quieter building staffed by three full-time workers and a rotating duty officer. It handles non-commercial cargo: maintenance equipment, emergency provisions, inspection materials. Nothing here is supposed to be reviewed at the commercial tier. An underground freight channel runs from the terminal's loading bay four kilometres to the dome infrastructure's primary distribution hub. This is where the coastal supply chain hands off to the city's interior delivery system.`;
        G.flags.cosmoria_arc_terminal_surveyed = true;
        addJournal('discovery', 'Secondary terminal underground channel runs 4km to dome infrastructure primary distribution hub', `cosmoria-arc-terminal-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The secondary terminal is a plain structure with loading doors that face away from the main port road. You walk past it twice before confirming it is the right building. The underground channel entrance is not visible from the street. You note the location and continue into the city.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Find the investigation network contact in Shelkopolis who handles maritime jurisdiction — they'll know Aldeth from the port registry.",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'connecting with maritime investigation network contact');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Aldeth from Shirshal arrived three days ahead of you and has already been working with a port authority archivist named Sevel who tracks manifest discrepancies as a private interest. They have a cross-reference built: secondary terminal arrivals against the three manifest categories, sorted by date. Sevel puts the total in front of you without preamble: forty-one arrivals over fourteen months. Forty-one containers moved from the secondary terminal into the underground channel. "We don't know what's at the channel's other end," he says. You do.`;
        G.flags.met_sevel_port = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 2;
        addJournal('discovery', 'Sevel and Aldeth: 41 containers via secondary terminal into underground channel — channel terminus is dome infrastructure', `cosmoria-arc-sevel-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The maritime archivist you need is at the main port authority managing the afternoon shipping register — a process that runs until the last vessel logs in, which could be any time in the next three hours. You find a bench outside the authority building and wait. The harbor smell, the loading sounds, the afternoon light on the water. You have time to think about forty-one containers and what was in them.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— HARD GATE ———

  {
    label: "Cosmoria's ghost vessels delivered to Shelkopolis. The maritime phase is done. The only thing left to do is get to where the delivery ended up.",
    tags: ['ArcGate', 'Decision'],
    xpReward: 80,
    condition: function() { return G.level >= 6 && !(G.flags && G.flags.cosmoria_arc_departing); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'committing to follow coastal delivery to Shelkopolis');
      if (!G.flags) G.flags = {};
      G.flags.cosmoria_arc_departing = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The transit template, the appointed administrator, the tide marker still transmitting inland coordinates — these are three components of the same system. Cosmoria was the staging hub. Shelkopolis was the terminus. The last delivery arrived nineteen days ago. The supply chain completed its coastal phase before you left. You are behind it, not ahead of it. Shelkopolis is the only place that changes.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— FINALE ———

  {
    label: "Arrive in Shelkopolis. Cosmoria's maritime laundering template and forty-one container arrivals all point to the secondary freight terminal underground channel leading to the dome.",
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() { return (G.investigationProgress || 0) >= 5 || G.level >= 6; },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis from Cosmoria');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_cosmoria = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      const finalText = arch === 'combat' ? ` Forty-one containers over fourteen months. Each delivery small enough to avoid notice. Each manifest category used infrequently enough to avoid flags. Patience like that is not improvised — it is planned and maintained and managed.`
        : arch === 'magic' ? ` The transit laundering template works in any port city using the same manifest category system. Cosmoria was not chosen for any particular quality. It was chosen because it had the right administrative structure. Any city with that structure is vulnerable to the same method.`
        : arch === 'stealth' ? ` The tide marker is still being updated. Someone at Cosmoria's harbor has eyes on departures. If your name was noted leaving, it will have been reported here before you arrived.`
        : ` The maritime supply chain from Cosmoria and Shirshal and the inland routes from Whitebridge and Ironhold all resolve to the same secondary freight terminal. All of it ends in the same city. So do you.`;

      G.lastResult = `Shelkopolis — the harbor road leads into the port district, and the secondary freight terminal sits two hundred metres from the main gate, unmarked, unguarded, with a loading door that opens onto an underground channel four kilometres long.${finalText} Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 2;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('consequence', 'Arrived in Shelkopolis from Cosmoria — Stage 2 begins', `cosmoria-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];

window.COSMORIA_TO_SHELK_ARC = COSMORIA_TO_SHELK_ARC;
