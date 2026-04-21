/**
 * SUNSPIRE HAVEN → SHELKOPOLIS TRAVEL ARC
 * Journey from the disrupted convoy district to Stage 2 hub
 * Narrative: Signal-damping container analysis, convoy irregularity, evidence of atmospheric deployment
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 */

const SUNSPIRE_HAVEN_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  {
    label: "The signal-damping container and the convoy deviation logs are enough to act on. Prepare to move south to Shelkopolis.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'preparing to leave Sunspire with container evidence');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The container's liner — non-reactive polymer rated for atmospheric compounds — came from a Principalities supplier. That provenance detail is not in any Sunspire manifest. You've transcribed the chemical liner rating onto paper small enough to fold into your boot. Someone spent significant capital to keep this moving quietly.`;
      G.recentOutcomeType = 'neutral';
      addJournal('decision', 'Left Sunspire Haven with container liner evidence', `sunspire-arc-departure-${G.dayCount}`);
    }
  },

  {
    label: "Sunspire's Warden Order garrison is rotated out this week. The timing with your departure is uncomfortable. Move before the new garrison arrives.",
    tags: ['ArcRoad', 'Survival', 'Risk'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'timing departure around garrison rotation');
      if (!G.flags) G.flags = {};

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `You leave during the four-hour gap between garrison out-processing and the new unit's arrival. No outgoing guards to report unusual departures; no incoming guards to have been briefed yet. The road south is clear.`;
        G.flags.sunspire_arc_clean_departure = true;
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `A Warden Order transit officer catches you at the southern gate and asks your destination and purpose — standard procedure, nothing targeted. You're logged as "research transit." The name goes in a ledger.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.recentOutcomeType = 'complication';
      }
    }
  },

  {
    label: "A Sunspire convoy guard named Tennen is also heading south — laid off when the disrupted convoy route was 'suspended pending review.'",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'traveling with displaced convoy guard Tennen');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Tennen isn't angry — he's methodical. He kept his own log of the convoy deviation dates, because that's what he does. Seventeen deviations in eight months, all on nights where he and three other guards were replaced by a different crew. "I thought it was scheduling," he says. "Now I think I was being managed." He gives you his log.`;
        G.flags.met_tennen_sunspire = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Tennen: convoy guard rotation matches deviation dates — guards were managed', `sunspire-arc-tennen-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Tennen walks south without talking. He's not hostile — just done. You travel in parallel for half a day and then the roads split.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— SOFT TRIGGER deepening ———

  {
    label: "The container's liner specification matches atmospheric compound transport standards. The convoy was carrying something for deployment, not storage.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 80,
    condition: function() { return (G.investigationProgress || 0) >= 5; },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'identifying container as deployment-configured');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `Storage-grade liner is designed to prevent leakage. Deployment-grade liner is designed to release at a controlled rate under temperature or pressure change. The Sunspire container has deployment-grade specifications. It was never meant to hold something permanently — it was meant to release it. The dome infrastructure in Shelkopolis's outer districts runs on pressure-regulated atmospheric systems. The pieces align.`;
      G.flags.sunspire_arc_deployment_identified = true;
      addJournal('discovery', 'Container is deployment-grade — designed for controlled release into dome systems', `sunspire-arc-deployment-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "A junction town on the road south: the waybill records show three containers of identical weight and specification passing through in the past two months.",
    tags: ['ArcDeepening', 'Lore', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'finding matching containers in junction waybills');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Three identical specifications, three different declared senders — all using name variations that differ by one word: "Regional Supplies Consortium," "Northern Regional Supplies," "Regional Supply Coordination." Same entity, rotating its alias. The last container passed through six days ago.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Three containers, three alias variants of same sender — 6 days ago, last passage', `sunspire-arc-waybill-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The waybill clerk isn't available and the records are in a back room. You note that the junction town exists and keep moving. What the road junction knows is less important than what Shelkopolis knows.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Captain-Adjutant Sera's contact name surfaces again — she transferred to Shelkopolis-region duty last month. This was not a coincidence.",
    tags: ['ArcDeepening', 'Social', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'tracing Sera\'s transfer to Shelkopolis region');
      if (!G.flags) G.flags = {};

      G.lastResult = `The transfer paperwork would have gone through three desks. Someone authorized it. In the Warden Order's internal structure, a Captain-Adjutant transferring to a regional hub at this moment, with this timing, is either being brought in to manage something or being removed from somewhere she was becoming inconvenient. Either way, she's in Shelkopolis. That's useful or dangerous depending on which of those two reasons is true.`;
      G.flags.sunspire_arc_sera_in_shelk = true;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— ARRIVAL ———

  {
    label: "Shelkopolis western approach — the dome infrastructure is visible two kilometers out. The scale of it makes the container specification suddenly real.",
    tags: ['ArcArrival', 'Survival', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'sighting Shelkopolis dome infrastructure');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `The dome serves the outer six districts simultaneously — a unified atmospheric system, pressure-equalized, meaning what enters one access point propagates to all six. The Sunspire container, deployment-configured, released at one access point would disperse to a combined residential and industrial population of several hundred thousand. You walk slower for a moment. Then you walk faster.`;
        G.flags.sunspire_arc_dome_scale_understood = true;
        addJournal('discovery', 'Dome atmospheric system is unified — single access point, full district propagation', `sunspire-arc-dome-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The dome infrastructure is impressive and its scale matters but you don't have enough technical knowledge to read it precisely. You file the observation and continue into the city.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Find temporary accommodation in the Aurora Heights district — the investigation network contact address references a specific bookbinder there.",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'making contact in Aurora Heights');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `The bookbinder knows who you are before you identify yourself. "Sunspire," she says, not a question. "The container information — three others tried to bring that same container spec to our attention before you. None of them made it south." She says it matter-of-factly. She stamps your documentation into the network. Your evidence is now in multiple locations simultaneously.`;
        G.flags.met_aurora_heights_contact = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('discovery', 'Bookbinder: three prior Sunspire contacts never arrived — evidence now distributed', `sunspire-arc-contact-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The bookbinder is closed. A note on the door gives another address in the Verdant Row. You note it for tomorrow.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— HARD GATE ———

  {
    label: "Level of knowledge, level of risk. You've accumulated enough from Sunspire Haven to justify the move to Shelkopolis.",
    tags: ['ArcGate', 'Decision'],
    xpReward: 80,
    condition: function() { return G.level >= 6 && !(G.flags && G.flags.sunspire_arc_departing); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'committing to the move south');
      if (!G.flags) G.flags = {};
      G.flags.sunspire_arc_departing = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `Everything Sunspire Haven's disrupted convoy route pointed at runs south. You have the container specification, the deviation logs, and a structural picture of what's being moved and how. The question of where it's going has one answer. Shelkopolis.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— FINALE ———

  {
    label: "Enter Shelkopolis proper. The convoy evidence from Sunspire Haven connects to something that was already in motion here before you arrived.",
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() { return (G.investigationProgress || 0) >= 5 || G.level >= 6; },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis from Sunspire Haven');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_sunspire_haven = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      let finalText = arch === 'combat' ? ` You enter a city that doesn't know it's a target yet.`
        : arch === 'magic' ? ` The atmospheric chemistry framework you've built is almost complete. One or two more data points and the synthesis will be undeniable.`
        : arch === 'stealth' ? ` You enter a city where the operation is already in motion. You're not ahead of it — you're behind it, and catching up.`
        : ` Everything from Sunspire's convoy anomalies points at Shelkopolis dome infrastructure. You're now standing in the middle of what you've been reading about.`;

      G.lastResult = `Shelkopolis.${finalText} Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 2;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('consequence', 'Arrived in Shelkopolis from Sunspire Haven — Stage 2 begins', `sunspire-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];
