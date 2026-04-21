/**
 * HARVEST CIRCLE → SHELKOPOLIS TRAVEL ARC
 * Journey from the Northern Provision Compact's distribution node to Stage 2 hub
 * Narrative: Routing number anomaly, charter mark containers, supply chain suspicion
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 */

const HARVEST_CIRCLE_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  {
    label: "The charter mark on the Harvest Circle containers matches Ironhold and Whitebridge. This supply chain has a single origin. Move south to trace it.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'departing Harvest Circle with supply chain evidence');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The charter mark is a capital C with a horizontal strike — not a registered trade sigil but a coordination mark. Whoever uses it operates outside the standard guild registry. You've traced it through three localities now and it's on containers that shouldn't share a supply chain. The road to Shelkopolis runs west.`;
      G.recentOutcomeType = 'neutral';
      addJournal('decision', 'Left Harvest Circle following charter mark supply chain south', `harvest-arc-departure-${G.dayCount}`);
    }
  },

  {
    label: "The Northern Provision Compact has an official transit office at the road junction. Your papers need to look like normal agricultural research transit.",
    tags: ['ArcRoad', 'Stealth', 'Risk'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'passing Provision Compact transit office');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `"Crop yield documentation for the Shelkopolis Granary Authority" — a category that exists, is dull, and nobody checks. The transit clerk stamps your papers without looking up.`;
        G.flags.harvest_arc_clean_transit = true;
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The clerk asks which yield study and you give a plausible answer, but she writes your name in the irregular travel section rather than the standard transit log. You're not stopped — just noted.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.recentOutcomeType = 'complication';
      }
    }
  },

  {
    label: "Fieldworker Nann, who confirmed the independent harvest count discrepancy, left Harvest Circle two days before you. She's heading to family in Shelkopolis.",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'meeting Nann on the road south');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Nann left because a Compact overseer told her the count records "were being reviewed for accuracy." In her experience, that phrase means the records disappear. She took copies before leaving. "I don't know what they're for," she says, "but they spent thirty years being right and now they're wrong, and the containers that made them wrong are all heading the same direction you are."`;
        G.flags.met_nann_harvest = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Nann: count records being \'reviewed\' — she saved copies before leaving', `harvest-arc-nann-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Nann isn't comfortable talking on the road — Compact overseers know her face. She waves and keeps a different pace. You'll meet again in Shelkopolis if she can manage it.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— SOFT TRIGGER deepening ———

  {
    label: "The routing number anomaly from Harvest Circle is a systematic offset — not an error. It was engineered to hide weight by distributing it across legitimate manifests.",
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

      G.lastResult = `Each routing entry is fractionally underweight — 3-5% below actual. Spread across hundreds of manifests over eight months, that 3-5% offset accumulates to a significant undeclared weight moving south. The algorithm wasn't random. Someone calibrated it to stay below the threshold that triggers a second-level manifest review. This is not Harvest Circle's work — this is a system someone external inserted into Harvest Circle's logistics.`;
      G.flags.harvest_arc_routing_decoded = true;
      addJournal('discovery', 'Routing anomaly is engineered offset — external system inserted into Harvest Circle logistics', `harvest-arc-routing-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "A road market halfway south: a vendor selling agricultural supplies has the same charter mark on his packing crates. He doesn't know what it means.",
    tags: ['ArcDeepening', 'Investigation', 'Social'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'finding charter mark on road market supply crates');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `The vendor has been receiving pre-marked crates from a "coordinating wholesaler" for six months. He doesn't know the company name — it changes with each order. "They pay on time and don't ask questions," he says. "I figure it's one of those efficiency consortiums." The crates go north when he's done with them. Empty, charter mark intact.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Charter mark crates returned north empty — containers in circulation, not disposable', `harvest-arc-charter-road-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `He's too busy to talk during market hours. You note the charter mark is here, this far south, on standard supply crates, and file it.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Iron Compact liaison Veth Karst's name appears in a junction town transit authority register. He authorized a special pass for 'coordinated agricultural distribution' two months ago.",
    tags: ['ArcDeepening', 'Lore', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'finding Veth Karst\'s transit authority authorization');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Veth Karst authorized a blanket transit pass for "coordinated agricultural distribution" — a category he invented for this authorization, it doesn't exist in standard transit law. The pass allows containers matching specific weight ranges to bypass inspection at three checkpoints between Harvest Circle and Shelkopolis. The containers don't need to be inspected. They just need to move.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Veth Karst created non-existent transit category to exempt containers from inspection', `harvest-arc-karst-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Karst's name is there but the full authorization document is in a back file. You note his name and the category he authorized and keep moving.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— ARRIVAL ———

  {
    label: "Shelkopolis outer district, Granary Steps. The smell of stored grain and the sound of distribution machinery. This is where Harvest Circle's supply chain ends.",
    tags: ['ArcArrival', 'Survival', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'arriving at Granary Steps in Shelkopolis');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `The Granary Steps complex feeds into the dome distribution network — the same pressure-equalized atmospheric system that serves Shelkopolis outer districts. A charter-marked container entering this complex's loading area could introduce its contents into an atmospheric delivery system that reaches residential and industrial zones simultaneously. The Harvest Circle supply chain terminates here. So does everything else.`;
        G.flags.harvest_arc_granary_steps_surveyed = true;
        addJournal('discovery', 'Granary Steps connects to dome atmospheric distribution — terminus for charter mark supply chain', `harvest-arc-granary-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The Granary Steps complex is large and busy and you can't see clearly how the logistics flow through it. You'll need more time to map it.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "The investigation network address in Shelkopolis: a factor's office in the Ironspool Ward that handles 'commodity reconciliation.'",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'making contact at the Ironspool Ward factor\'s office');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `The factor, a compact man named Reth, has already received the charter mark specification. "We've had four people bring us pieces of this," he says. "Harvest Circle is the piece about supply chain insertion. The Glasswake piece is the chemical mechanism. The Ironhold piece is the raw material. And someone from Plumes End sent a note about atmospheric detection." He spreads four maps on his desk. The charter mark is on all of them.`;
        G.flags.met_reth_ironspool = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('discovery', 'Reth: four-piece investigation network assembling in Shelkopolis — charter mark links all', `harvest-arc-reth-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The factor's office is closed for two days — a district inspection cycle. You'll have to wait or find another contact.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— HARD GATE ———

  {
    label: "The charter mark supply chain leads to Shelkopolis. You have enough to justify the journey even without more.",
    tags: ['ArcGate', 'Decision'],
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
    label: "Arrive in Shelkopolis. The supply chain from Harvest Circle feeds into this city's dome infrastructure. You are now inside the operation's target.",
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() { return (G.investigationProgress || 0) >= 5 || G.level >= 6; },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis from Harvest Circle');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_harvest_circle = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      const finalText = arch === 'combat' ? ` Whoever designed the supply chain insertion knew that a city this size operates on trust — that the grain arriving at Granary Steps doesn't need to be inspected because it always has been safe.`
        : arch === 'magic' ? ` The logistics of what you've traced are remarkable in a terrible way. Each link was designed to be invisible and explainable alone. Together they form a mechanism.`
        : arch === 'stealth' ? ` You've been running a parallel operation to the one you're investigating. Yours was information-gathering. Theirs was delivery. Both terminate here.`
        : ` The supply chain that started in Harvest Circle ends in a city of several hundred thousand people who don't know it exists.`;

      G.lastResult = `Shelkopolis.${finalText} Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 2;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('consequence', 'Arrived in Shelkopolis from Harvest Circle — Stage 2 begins', `harvest-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];
