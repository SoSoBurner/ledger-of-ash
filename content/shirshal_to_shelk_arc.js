/**
 * SHIRSHAL → SHELKOPOLIS TRAVEL ARC
 * Journey from the suppressed maritime justice district to Stage 2 hub
 * Narrative: Suppressed Tazren case continuation, Bureau ghost visitors, maritime justice obstruction
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 */

const SHIRSHAL_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  {
    label: "The ghost visitor records from Shirshal's Bureau prove that Tazren's suppressed case had active investigators — who then stopped appearing in any official record. Move south.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'departing Shirshal with ghost visitor records');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The ghost visitor records are names that appeared in Shirshal's Bureau reception log and then never appeared in any official file, case assignment, or personnel record. They were there. They signed in. Then they ceased to exist administratively. Six names over four months, all during the period Tazren's case was active. Whatever they were investigating, the investigation ended them — not the other way around. Word of your movements has reached someone who tracks such things.`;
      G.recentOutcomeType = 'neutral';
      addJournal('decision', 'Left Shirshal with ghost visitor records — six investigators disappeared administratively during Tazren case', `shirshal-arc-departure-${G.dayCount}`);
    }
  },

  {
    label: "Magistrate Corin gave you one piece of information before closing his door: a case number from the central maritime registry that was formally closed twelve months ago but never disposed.",
    tags: ['ArcRoad', 'Lore', 'Investigation'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'following Corin\'s undisposed case number');
      if (!G.flags) G.flags = {};

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `A formally closed case that was never disposed means the physical case file still exists somewhere — it wasn't destroyed. Normally closed cases are archived within sixty days. This one has been in limbo for twelve months, which means someone is keeping it accessible without putting it into the permanent archive. The maritime registry's limbo files are held at the Shelkopolis central bureau. That's where it went when Shirshal couldn't dispose of it without explaining why it was closed.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Undisposed case in Shelkopolis central bureau limbo files — someone keeping it accessible', 'discovery', `shirshal-arc-case-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The case number format tells you it's maritime registry but not much else. The details are in Shelkopolis.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Dispossessed shipowner Wend is also heading inland — his shipping license was suspended pending the same review that closed the maritime case. He's furious and detailed.",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'getting Wend\'s account of the shipping license suspension');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Wend has been a shipowner for twenty-two years. His license was suspended after he refused to accept a rerouting order that would have taken his vessel through a specified maritime corridor during a specified twelve-hour window. "They wanted me out of that corridor," he says. "I didn't go. Three days later, my license was under review." The corridor and the twelve-hour window he describes correspond exactly with the ghost vessel registry dates from his region.`;
        G.flags.met_wend_shipowner = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Wend refused rerouting order — license suspended; corridor/window matches ghost vessel dates', 'discovery', `shirshal-arc-wend-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Wend is too angry to be specific. He gives you general grievances that are consistent with everything you know but don't add new information.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— SOFT TRIGGER deepening ———

  {
    label: "The ghost vessel registry connects to the charter mark containers: vessels that appeared in Shirshal's maritime log moved cargo that matches the Whitebridge crossing weight class.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 80,
    condition: function() { return (G.investigationProgress || 0) >= 5; },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'connecting ghost vessels to charter mark container supply chain');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `The ghost vessels were removing cargo from the Whitebridge-bound supply chain at the coastal transfer point. Whatever came across Whitebridge bridge at midnight was part of a larger maritime supply network. The coastal route and the inland route are parallel channels of the same supply chain. One is Wend's corridor. The other is Cadrin's bridge. Both pointed south. Both move charter mark containers. Both go to Shelkopolis.`;
      G.flags.shirshal_arc_maritime_link = true;
      addJournal('Ghost vessels and charter mark containers are parallel channels of same supply chain — both to Shelkopolis', 'discovery', `shirshal-arc-maritime-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "Oversight Collegium liaison Parro's check-in logs from Shirshal: he reported no unusual maritime activity in the same weeks the ghost vessels were active.",
    tags: ['ArcDeepening', 'Lore', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'cross-referencing Parro\'s clean reports with ghost vessel dates');
      if (!G.flags) G.flags = {};

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Parro's check-ins are regular and his language is consistent: "maritime sector — no unusual activity." The ghost vessel dates and his clean-report dates overlap perfectly. He either didn't see the activity or he reported clean deliberately. His transfer to Shelkopolis happened one week after the last ghost vessel's maritime transit window closed. He's not a passive observer — he's a participant in the coverage operation.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Parro\'s clean reports match ghost vessel dates — deliberate non-reporting, transferred after last window', 'discovery', `shirshal-arc-parro-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The log comparison is suggestive but not conclusive. Parro may simply have been incompetent rather than complicit. The distinction matters for evidence.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Shirshal's harbor at night: the last ghost vessel transaction was seventeen days ago. The harbor is quiet now. The maritime phase is complete.",
    tags: ['ArcDeepening', 'Survival', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'surveying the harbor for post-operation signs');
      if (!G.flags) G.flags = {};

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `The mooring patterns have changed. Three berths that were in regular use during the ghost vessel period now show no wear patterns consistent with recent use. The supply chain through Shirshal's harbor is finished. Whatever it was building toward, the maritime delivery phase was completed seventeen days ago. You're behind the supply chain. Shelkopolis is where you catch up.`;
        G.flags.shirshal_arc_maritime_complete = true;
        addJournal('Shirshal harbor maritime phase complete 17 days ago — supply chain delivered before investigation concluded', 'discovery', `shirshal-arc-harbor-${G.dayCount}`);
        G.recentOutcomeType = 'neutral';
      } else {
        G.lastResult = `The harbor is busy enough that changes in mooring patterns are hard to read. You note that it's quieter than it was during the ghost vessel period.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— ARRIVAL ———

  {
    label: "Shelkopolis coast road approach. The maritime transit lanes visible from the road feed directly into the city's port district — the same infrastructure the ghost vessels were using.",
    tags: ['ArcArrival', 'Survival', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'reading maritime infrastructure on approach to Shelkopolis');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `The Shelkopolis port district connects to the city's dome infrastructure via an underground freight channel — a legacy system from the city's founding, used for bulk material transit between port and manufacturing districts. The ghost vessels didn't dock at the main port. They used the secondary freight terminal, which feeds directly into that underground channel. Whatever they delivered bypassed port inspection entirely and went directly into the city's interior distribution system.`;
        G.flags.shirshal_arc_port_channel_mapped = true;
        addJournal('Ghost vessels used secondary freight terminal to underground channel — bypassed port inspection into interior distribution', 'discovery', `shirshal-arc-port-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The port district is visible on approach but you can't read the freight infrastructure from this distance.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "The investigation network contact in Shelkopolis handles maritime cases — find them at the secondary port registry office.",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'making contact at the secondary port registry');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `The port registrar is a woman named Aldeth who has been tracking discrepancies in the secondary freight terminal logs for six months. "Six vessels logged as 'maintenance transit' that never appeared in the maintenance queue," she says. "I filed a query three times. Each time, the query was rerouted to a bureau that didn't exist." She connects ghost vessels, undisposed cases, and the maintenance transit cover story into a single pattern. She stamps you into the network.`;
        G.flags.met_aldeth_port = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Aldeth: 6 ghost vessels as \'maintenance transit\' — queries rerouted to non-existent bureau', 'discovery', `shirshal-arc-aldeth-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The secondary port registry office is closed for a quarterly audit. The network contact is inaccessible for two days.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— HARD GATE ———

  {
    label: "Shirshal's maritime phase is complete. The material is already in Shelkopolis. You need to be there too.",
    tags: ['ArcGate', 'Decision'],
    xpReward: 80,
    condition: function() { return G.level >= 6 && !(G.flags && G.flags.shirshal_arc_departing); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'committing to move to Shelkopolis after maritime phase conclusion');
      if (!G.flags) G.flags = {};
      G.flags.shirshal_arc_departing = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The ghost vessels stopped operating seventeen days ago. The maritime supply chain delivered what it was carrying. You're not in a position to intercept anything that already moved. What you can do is get to Shelkopolis and understand where it went after it arrived. The ghost visitor records and Wend's testimony are the evidence. Move.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— FINALE ———

  {
    label: "Arrive in Shelkopolis. Shirshal's ghost vessels used this city's secondary freight terminal to deliver cargo that bypassed port inspection. It's already here.",
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() { return (G.investigationProgress || 0) >= 5 || G.level >= 6; },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis from Shirshal');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_shirshal = true;
      if ((G.investigationProgress || 0) < 5 && G.level >= 6) {
        addJournal('You have reached the limit of what this stage can teach you. The road south is open — but the threads you leave unresolved will cost you in Shelkopolis.', 'intelligence');
      }
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      const finalText = arch === 'combat' ? ` The maritime route was the quiet channel. No checkpoints, no road authority, no visible transit. The operation chose each channel for what it could conceal. The maritime channel concealed the final delivery.`
        : arch === 'magic' ? ` Six ghost vessels, seventeen days ago, using a maintenance transit cover that routes to a non-existent bureau. The operation's administrative architecture is specifically designed to make institutional follow-up impossible.`
        : arch === 'stealth' ? ` The underground freight channel from the secondary terminal to the city's interior distribution system was the operation's final handoff point. You're standing in the receiving end of a supply chain that started in eight localities.`
        : ` Whatever came through Shirshal's harbor on those six ghost vessels is already inside Shelkopolis. You are inside Shelkopolis. Now find where it is.`;

      G.lastResult = `Shelkopolis.${finalText} Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 2;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('consequence', 'Arrived in Shelkopolis from Shirshal — Stage 2 begins', `shirshal-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];

window.SHIRSHAL_TO_SHELK_ARC = SHIRSHAL_TO_SHELK_ARC;
