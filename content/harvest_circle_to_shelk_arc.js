/**
 * HARVEST CIRCLE → SHELKOPOLIS TRAVEL ARC
 * Journey from the Northern Provision Compact's distribution node to Stage 2 hub
 * Narrative: Routing number anomaly, charter mark containers, supply chain suspicion
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 */

const HARVEST_CIRCLE_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  {
    label: "The same mark on three different containers from three different places.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'departing Harvest Circle with supply chain evidence');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The mark is a capital C with a horizontal strike through the vertical stroke — not a registered trade sigil, not a standard guild mark. A coordination marker used by an entity that does not appear in any registry you have checked. You have traced it through three localities now, on containers that have no logical supply-chain connection to each other except through this mark and whoever places it. The road west runs to Shelkopolis. Someone is already aware you've been following this thread.`;
      G.recentOutcomeType = 'neutral';
      addJournal('Left Harvest Circle following charter mark supply chain south', 'intelligence', `harvest-arc-departure-${G.dayCount}`);
    }
  },

  {
    label: "The transit clerk has seen too many academic transfers to care about one more.",
    tags: ['ArcRoad', 'Stealth', 'Risk'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'passing Provision Compact transit office');
      if (!G.flags) G.flags = {};

      const result = rollD20('finesse', (G.skills.finesse || 0));
      if (result.total >= 12) {
        G.lastResult = `"Crop yield documentation for the Shelkopolis Granary Authority." The transit clerk reads the category, stamps the paper, and slides it back across the counter without looking at your face. It is a real category, it is genuinely tedious, and nobody requests a secondary check on yield documentation. You are through the transit office and back on the road in four minutes.`;
        G.flags.harvest_arc_clean_transit = true;
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The clerk asks which yield study, and your answer is plausible but not specific enough. She writes something and you see her pen move to a different column of the log — the irregular travel section, not the standard transit record. You are waved through without further questions. Your name is in a separate column, separated from the ordinary flow of traffic.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.recentOutcomeType = 'complication';
      }
    }
  },

  {
    label: "Nann left two days before the records went under review. She took copies.",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'meeting Nann on the road south');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 10) {
        G.lastResult = `Nann left Harvest Circle two days after a Compact overseer told her the count records were "being reviewed for accuracy." She has been a fieldworker long enough to know what that phrase precedes. She took her own copies before the review could reach them. "They were right for thirty years," she says. "Now they're wrong. And the containers that made them wrong are all moving the same direction you are." She pats her coat where the copies are folded.`;
        G.flags.met_nann_harvest = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Nann: count records being \'reviewed\' — she saved copies before leaving', 'discovery', `harvest-arc-nann-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Nann recognizes you and picks up her pace slightly, putting distance between you before giving a brief wave. Compact overseers work this road and know her face. She does not stop. She does not speak. You travel south in parallel on different sections of the road and she turns off at a different junction. Shelkopolis is where she said she was headed.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— SOFT TRIGGER deepening ———

  {
    label: "Not drift error. Someone set the threshold and calibrated just below it.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 80,
    condition: function() { return (G.investigationProgress || 0) >= 5; },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'decoding routing number anomaly as engineered offset');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `Each individual routing entry is fractionally underweight — three to five percent below the verified gate weight. Across hundreds of manifests over eight months, that offset accumulates to a substantial undeclared tonnage moving south without triggering a secondary manifest review. The calibration is too consistent to be drift error. Someone set this threshold deliberately, knowing the exact weight that triggers a second-level check, and set the offset just below it. This system was not built by Harvest Circle. It was inserted into Harvest Circle's logistics by someone with access to the manifesting software and knowledge of the review threshold.`;
      G.flags.harvest_arc_routing_decoded = true;
      addJournal('Routing anomaly is engineered offset — external system inserted into Harvest Circle logistics', 'discovery', `harvest-arc-routing-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "Same mark. This far south. On crates he empties and returns north.",
    tags: ['ArcDeepening', 'Investigation', 'Social'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'finding charter mark on road market supply crates');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 11) {
        G.lastResult = `The vendor has been receiving pre-marked crates for six months through a "coordinating wholesaler" that uses a different company name on every order form. He does not know the entity behind the name changes. "Pay on time, no disputes," he says. "I assumed it was one of the efficiency consortiums." When he empties the crates, a runner collects them and they go north. The crates return empty, charter mark still intact, to wherever they came from.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Charter mark crates returned north empty — containers in circulation, not disposable', 'discovery', `harvest-arc-charter-road-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The market is at full midday pace and the vendor does not pause to speak with someone who is not buying. You note the mark on three separate crates at his stall — the same capital C with horizontal strike, this far south of Harvest Circle, on what look like standard supply crates. You file it and keep moving.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Karst invented a transit category that doesn't exist in transit law.",
    tags: ['ArcDeepening', 'Lore', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'finding Veth Karst\'s transit authority authorization');
      if (!G.flags) G.flags = {};

      const result = rollD20('wits', (G.skills.wits || 0));
      if (result.total >= 12) {
        G.lastResult = `Veth Karst authorized a blanket transit pass two months ago for "coordinated agricultural distribution" — a category that appears nowhere in standard transit law. He filed it as a special administrative provision under a section of the transit code that allows for expedited movement of perishable goods. The pass covers containers matching specific weight ranges and exempts them from checkpoint inspection at three stations between Harvest Circle and Shelkopolis. The containers do not need to be opened. They only need to be moving.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Veth Karst created non-existent transit category to exempt containers from inspection', 'discovery', `harvest-arc-karst-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Karst's name appears in the transit authority register under the authorization date. The full document is in a back file that requires a registered trader's credential to access. You copy the date, the category name, and his title from the public-facing entry. The detail you need — the specific weight range and the three checkpoint exemptions — is behind the credential gate.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— ARRIVAL ———

  {
    label: "Granary Steps. The loading intake feeds directly into the dome distribution network.",
    tags: ['ArcArrival', 'Survival', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'arriving at Granary Steps in Shelkopolis');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      const result = rollD20('vigor', (G.skills.vigor || 0));
      if (result.total >= 10) {
        G.lastResult = `The Granary Steps complex at dusk: grain dust and the mechanical rhythm of distribution machinery. The loading area feeds directly into Shelkopolis's pressure-equalized dome distribution network — the atmospheric system serving the outer districts. A charter-marked container moved through this complex's loading intake would introduce its contents into a delivery system that propagates to residential and industrial zones without discrimination. The Harvest Circle supply chain ends here. So does every other supply chain you have been following.`;
        G.flags.harvest_arc_granary_steps_surveyed = true;
        addJournal('Granary Steps connects to dome atmospheric distribution — terminus for charter mark supply chain', 'discovery', `harvest-arc-granary-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The Granary Steps complex is large and busy and you can't see clearly how the logistics flow through it. You'll need more time to map it.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "The charter mark is on all four maps. Someone in this office already counted.",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'making contact at the Ironspool Ward factor\'s office');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 11) {
        G.lastResult = `The factor, a compact man named Reth, has already received the charter mark specification. "We've had four people bring us pieces of this," he says. "Harvest Circle is the piece about supply chain insertion. The Glasswake piece is the chemical mechanism. The Ironhold piece is the raw material. And someone from Plumes End sent a note about atmospheric detection." He spreads four maps on his desk. The charter mark is on all of them.`;
        G.flags.met_reth_ironspool = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Reth: four-piece network assembling in Shelkopolis — charter mark links all four', 'discovery', `harvest-arc-reth-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The factor's office is closed for two days — a district inspection cycle. You'll have to wait or find another source.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— HARD GATE ———

  {
    label: "Routing anomalies, mark matches, and a picture that only makes sense as a plan.",
    tags: ['ArcGate', 'Decision'],
    plot: 'main',
    xpReward: 80,
    condition: function() { return G.level >= 6 && !(G.flags && G.flags.harvest_arc_departing); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'committing to following supply chain to Shelkopolis');
      if (!G.flags) G.flags = {};
      G.flags.harvest_arc_departing = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `Everything from Harvest Circle's distribution irregularities points south. You have routing anomalies, charter mark matches, and a structural picture that doesn't make sense as an accident. It makes sense as a plan. Shelkopolis is the destination.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— FINALE ———

  {
    label: "The supply chain that started in Harvest Circle ends here, in this city.",
    plot: 'main',
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() { return (G.investigationProgress || 0) >= 5 || G.level >= 6; },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis from Harvest Circle');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_harvest_circle = true;
      if ((G.investigationProgress || 0) < 5 && G.level >= 6) {
        addJournal('You have reached the limit of what this stage can teach you. The road south is open — but the threads you leave unresolved will cost you in Shelkopolis.', 'intelligence');
      }
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      const finalText = arch === 'combat' ? ` Whoever designed the supply chain insertion knew that a city this size operates on trust — that the grain arriving at Granary Steps doesn't need to be inspected because it always has been safe.`
        : arch === 'magic' ? ` The logistics of what you've traced are remarkable in a terrible way. Each link was designed to be invisible and explainable alone. Together they form a mechanism.`
        : arch === 'stealth' ? ` You've been running a parallel operation to the one you've been tracing. Yours was information-gathering. Theirs was delivery. Both terminate here.`
        : ` The supply chain that started in Harvest Circle ends in a city of several hundred thousand people who don't know it exists.`;

      G.lastResult = `Shelkopolis.${finalText} Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 'Stage II';
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('Arrived in Shelkopolis from Harvest Circle — Stage 2 begins', 'evidence', `harvest-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];

window.HARVEST_CIRCLE_TO_SHELK_ARC = HARVEST_CIRCLE_TO_SHELK_ARC;
