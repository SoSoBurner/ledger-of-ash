/**
 * MIMOLOT ACADEMY → SHELKOPOLIS TRAVEL ARC
 * Journey from the classified formula research site to Stage 2 hub
 * Narrative: Carrying classified formula fragments, Memory Hall documents, Warden Order academic entanglement
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 */

const MIMOLOT_ACADEMY_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  {
    label: "The notation looks like coursework. Only I know what it describes.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'departing Mimolot with classified formula fragments');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The formula fragments are academic notation — the kind of shorthand that means nothing to anyone who didn't study atmospheric chemistry formally. You copy the relevant sections in that same notation, which is useful: if you're stopped, you're carrying academic research notes. Only someone trained to read them would understand what they describe. You're betting Shelkopolis has those people. Word of your movements has reached someone who tracks such things.`;
      G.recentOutcomeType = 'neutral';
      addJournal('Left Mimolot with formula fragments in academic notation — readable only to trained chemists', 'intelligence', `mimolot-arc-departure-${G.dayCount}`);
    }
  },

  {
    label: "Ashe transferred yesterday. He'll see everything that arrives through the network.",
    tags: ['ArcRoad', 'Lore', 'Risk'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'discovering Brevard Ashe\'s transfer to Shelkopolis');
      if (!G.flags) G.flags = {};

      G.lastResult = `Ashe's transfer category is "academic liaison reassignment to central review." The same pattern as every other lateral move the operation has made — legitimate-sounding category, real transfer, operational repositioning. His role at Mimolot was oversight of classified research access. In Shelkopolis, he'll have the same access profile but applied to the central Academy's research archive. He'll see everything that comes in from the network.`;
      G.flags.ashe_in_shelkopolis = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      addJournal('Brevard Ashe transferred to Shelkopolis central Academy — will monitor incoming research', 'discovery', `mimolot-arc-ashe-${G.dayCount}`);
      G.recentOutcomeType = 'complication';
    }
  },

  {
    label: "Tavin carries his own recommendation. I embed the formula inside it.",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'using Tavin\'s student travel for document cover');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Tavin doesn't need to know what he's carrying — you write the formula fragments into a genuine academic recommendation letter for him, embedded in the notation as if they're course examples. He carries his own recommendation. You carry the formula. The content is invisible unless the reader is looking for it.`;
        G.flags.tavin_carrying_formula = true;
        G.flags.mimolot_arc_formula_distributed = true;
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Tavin is too nervous about the placement exam to take on any side task. You carry everything yourself.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— SOFT TRIGGER deepening ———

  {
    label: "340 kilograms deployment threshold. Craftspire extracted exactly 340 kilograms.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 80,
    condition: function() { return (G.investigationProgress || 0) >= 5; },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'decoding the Memory Hall compound specification');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `340 kilograms combined mass for deployment-grade configuration. Craftspire extracted 340kg across three workshops over six months. The formula's activation threshold and the Craftspire accumulation are identical. The extraction wasn't arbitrary — it was calibrated to hit exactly the minimum required for atmospheric deployment. Whoever set the extraction target knew the Memory Hall formula. The academic research and the operational logistics are connected at the design level.`;
      G.flags.mimolot_arc_threshold_confirmed = true;
      addJournal('Craftspire extraction = 340kg = Memory Hall deployment threshold — academic and operational connected at design', 'discovery', `mimolot-arc-threshold-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "Doss has been in Shelkopolis three months. Long enough to be found.",
    tags: ['ArcDeepening', 'Social', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'learning Doss is already in Shelkopolis');
      if (!G.flags) G.flags = {};

      G.lastResult = `Doss was the scholar who first flagged the formula fragments as classified beyond their apparent category. His "sabbatical" was arranged three weeks after he filed the reclassification query. He's been in Shelkopolis for three months — long enough to have established alternate contacts and to have continued his analysis independently of Mimolot's oversight structure. He's also been in Shelkopolis long enough to be found by the wrong people.`;
      G.flags.doss_in_shelkopolis = true;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('Doss in Shelkopolis for 3 months — forced sabbatical after reclassification query, may have been found', 'discovery', `mimolot-arc-doss-location-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "One last check of the secondary index before I leave this place for good.",
    tags: ['ArcDeepening', 'Lore', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'final Scriptorium check before departure');
      if (!G.flags) G.flags = {};

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `In the secondary index — the one kept in a physical card system rather than the primary electronic record — you find a cross-reference: the formula's originating researcher filed an application to the Shelkopolis Institute fourteen months ago. The application was denied by a review board that included Brevard Ashe. The research was denied publication and simultaneously classified. Ashe has been managing the suppression of this formula from inside Mimolot for over a year.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Ashe denied publication then classified formula 14 months ago — suppression started before operation', 'discovery', `mimolot-arc-ashe-history-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The secondary index yields nothing new. You leave Mimolot with what you already have.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— ARRIVAL ———

  {
    label: "The central Academy review board now has a Warden Order seat. Ashe holds it.",
    tags: ['ArcArrival', 'Lore', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'arriving at Shelkopolis academic district');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `The central Academy is three times Mimolot's size and operates on a completely open submission model — any researcher can file a study for review. But the review board that accepts or rejects submissions has a Warden Order liaison as a formal member. Ashe's predecessor held that seat for eleven years. Ashe will hold it now. Whatever is filed through the Collegium's official channels will reach his desk.`;
      G.flags.mimolot_arc_central_academy_surveyed = true;
      addJournal('Shelkopolis central Academy review board includes Warden Order liaison — Ashe now holds that seat', 'discovery', `mimolot-arc-academy-${G.dayCount}`);
      G.recentOutcomeType = 'neutral';
    }
  },

  {
    label: "Doss is alive and working. Ashe is looking. I need to get there first.",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'finding Doss before Ashe can');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Doss is alive and careful. He's been running his analysis through a private correspondence chain that uses historical research as cover. "I've completed the full synthesis model," he tells you. "The formula fragments plus the Glasswake shard amplification data plus the Craftspire accumulation quantity — it produces a compound that is lethal at sustained exposure above 180 hours." He says it quietly. "That's what we're talking about."`;
        G.flags.met_doss_shelkopolis = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 2;
        addJournal('Doss: full synthesis model complete — lethal at 180+ hours sustained exposure', 'discovery', `mimolot-arc-doss-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Doss's last known address is empty. He moved. Someone in the network knows where but you haven't made that contact yet. You'll find him in Stage 2.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— HARD GATE ———

  {
    label: "Fragments are not findings. Shelkopolis has the chemists who can make them one.",
    tags: ['ArcGate', 'Decision'],
    plot: 'main',
    xpReward: 80,
    condition: function() { return G.level >= 6 && !(G.flags && G.flags.mimolot_arc_departing); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'committing to bring formula data to Shelkopolis');
      if (!G.flags) G.flags = {};
      G.flags.mimolot_arc_departing = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `Mimolot's research library is the most complete record of what this compound does. But a library that's been systematically suppressed and partially classified is not the same as actionable evidence. Shelkopolis has the infrastructure to turn fragments into a formal finding. Go.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— FINALE ———

  {
    label: "The formula names what this is. I carry the name south.",
    plot: 'main',
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() { return (G.investigationProgress || 0) >= 5 || G.level >= 6; },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis from Mimolot Academy');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_mimolot_academy = true;
      if ((G.investigationProgress || 0) < 5 && G.level >= 6) {
        addJournal('You have reached the limit of what this stage can teach you. The road south is open — but the threads you leave unresolved will cost you in Shelkopolis.', 'intelligence');
      }
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      const finalText = arch === 'magic' ? ` Doss's synthesis model is the endpoint you've been working toward without knowing it. The formula fragments, the shard data, the compound quantities — they combine into a single calculation that makes the operation's purpose unmistakable.`
        : arch === 'combat' ? ` 180 hours of sustained exposure at the Shelkopolis dome's pressure distribution rate. Across six outer districts. The casualty projections don't require much calculation once you have the formula.`
        : arch === 'stealth' ? ` The formula was classified specifically to prevent what you're now doing with it — connecting it to the supply chain. That connection is the most dangerous thing you're carrying.`
        : ` The Memory Hall's classified research and the northern operation's logistics were designed by the same people, using the same knowledge. Mimolot trained whoever built this. That's the most disturbing finding yet.`;

      G.lastResult = `Shelkopolis.${finalText} Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 2;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('Arrived in Shelkopolis from Mimolot Academy — Stage 2 begins', 'evidence', `mimolot-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];

window.MIMOLOT_ACADEMY_TO_SHELK_ARC = MIMOLOT_ACADEMY_TO_SHELK_ARC;
