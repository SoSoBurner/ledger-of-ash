/**
 * AURORA CROWN COMMUNE → SHELKOPOLIS TRAVEL ARC
 * Journey from the contaminated dome settlement to Stage 2 hub
 * Narrative: Filtration system documentation, dome additive substitution, atmospheric exposure evidence
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 */

const AURORA_CROWN_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  {
    label: "The dome additive substitution documentation from Aurora Crown is the clearest evidence yet of what was done and how. Move it south to Shelkopolis.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'departing Aurora Crown with dome substitution documentation');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `Three documents rolled together and wrapped in oilcloth: the original dome filtration specification, the replacement additive delivery manifest, and the pressure monitoring log that shows the gradient shift beginning two days after substitution. Read separately, each is administrative paper. Together, they show a residential atmospheric system changed by design. You carry them south. Leaving them in Aurora Crown means leaving them within reach of whoever changed the system to begin with.`;
      G.recentOutcomeType = 'neutral';
      addJournal('decision', 'Left Aurora Crown carrying dome contamination documentation south', `aurora-arc-departure-${G.dayCount}`);
    }
  },

  {
    label: "The Oversight Collegium's commune inspection team arrives in Aurora Crown every thirty days. The next window opens in four days. You need to be gone before then.",
    tags: ['ArcRoad', 'Survival', 'Risk'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'departing before Collegium inspection window');
      if (!G.flags) G.flags = {};

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `You are on the southern road before dawn. By mid-morning the traffic is already thickening — researchers, contractors, supply runs, all clearing out before the Collegium inspection teams arrive. You are one figure in a long string of departures. No one at the gate writes your name down. You are past the first waystation before the inspection window opens.`;
        G.flags.aurora_arc_clean_departure = true;
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `A Collegium advance officer is already at the southern gate when you reach it, one day ahead of the inspection schedule. She has a transit log open on a folding table and records everyone departing with any research classification in their papers. She notes your name, your stated destination, and the time of day. Her handwriting is careful. So is her attention.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        G.recentOutcomeType = 'complication';
      }
    }
  },

  {
    label: "Engineer Orren left Aurora Crown by a different route two days ago. He left a message at the southern waystation.",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'finding Orren\'s message at the southern waystation');
      if (!G.flags) G.flags = {};

      G.lastResult = `Orren's note is folded into a plain envelope with no name on the front — the waystation keeper hands it over when you describe him. The text is precise: the dome manifold pressure differential corresponds to a source flow rate of 0.3 cubic metres per day. Full residential zone saturation at that rate falls between ninety and one hundred ten days from the substitution start. He calculated the start date as four months ago. He underlines the next sentence: saturation threshold may already be reached. He signed with his qualification number rather than his name.`;
      G.flags.aurora_arc_orren_message = true;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('discovery', 'Orren: dome may be at saturation threshold — 4 months from substitution start', `aurora-arc-orren-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  // ——— SOFT TRIGGER deepening ———

  {
    label: "The filtration system documentation shows the substitution was designed to be undetectable for 60-90 days. That window has closed. Aurora Crown's residents are already exposed.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 80,
    condition: function() { return (G.investigationProgress || 0) >= 5; },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'calculating exposure timeline from filtration documentation');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `Below a certain concentration, the substitute additive produces nothing — no smell, no irritation, no symptom cluster. Above the threshold, it creates pressure gradient sensitivity: the kind of response Letha Dawnsilk's outpost has been logging at eighty kilometres' distance and attributing to axial weather. Aurora Crown's residential population has been above that threshold for approximately six weeks. The symptoms that follow — fatigue, low-grade respiratory irritation — are indistinguishable from late-season illness. Whoever designed this built the cover into the compound itself.`;
      G.flags.aurora_arc_exposure_timeline = true;
      addJournal('discovery', 'Exposure above threshold for 6 weeks — symptoms present as seasonal illness, cover is built-in', `aurora-arc-exposure-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "Merav Solind, Oversight Collegium observer, has a transit authorization on the same southern road. She may be following you, or heading to Shelkopolis for her own reasons.",
    tags: ['ArcDeepening', 'Stealth', 'Risk'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'assessing whether Solind is following or parallel-tracking');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `You match your pace to hers over two days and watch her check-in rhythm. She stops at the same waystation intervals, produces a Collegium transit pass each time, and shows no variation in route or speed. She is not adjusting to your movements. She is heading to Shelkopolis on her own schedule for her own reasons. Those reasons are not yet clear. She will be there when you arrive.`;
        G.flags.aurora_arc_solind_parallel = true;
        G.recentOutcomeType = 'neutral';
      } else {
        G.lastResult = `You slow down for two hours, then speed up. Her pace does not change in response. She may be on the same road by coincidence or by a schedule that does not require her to watch you specifically. You cannot confirm it either way. She is on the same road. She is heading to the same city. That is what you know.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "A roadside healer's post. Several people from Aurora Crown's outer settlements are here with the same cluster of symptoms. She's treating them as seasonal fatigue.",
    tags: ['ArcDeepening', 'Survival', 'Lore'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'observing symptom cluster at roadside healer');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Three patients waiting on the healer's bench, all from outer settlements along the same road. They describe fatigue, intermittent throat irritation, a pressure behind the eyes that comes and goes. The healer is giving them willow-bark preparation and telling them to rest. That is the correct treatment for late-season fever. It is the wrong treatment for sub-threshold atmospheric compound exposure, which would not respond to it regardless. You ask where they came from. All three settlements fall within eight kilometres of Aurora Crown's dome infrastructure.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Symptom cluster within 8km of Aurora Crown dome — compound exposure presenting as seasonal illness', `aurora-arc-symptoms-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The patients look worn down in the way people look at the tail end of a hard season — not dramatically ill, just depleted. Without the technical background to read the symptom pattern against compound exposure data, you cannot tell what you are looking at. You note that there are three of them, from the same road, presenting on the same day. Then you keep moving.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— ARRIVAL ———

  {
    label: "Shelkopolis: the dome infrastructure here is the same generation of atmospheric filtration as Aurora Crown's. The same substitution is possible here.",
    tags: ['ArcArrival', 'Lore', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'recognizing dome architecture match between cities');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `The filtration access terminals along Shelkopolis's outer ring use the same pressure regulation chassis as Aurora Crown's — same generation, same maintenance access points, same additive input manifolds. The installation dates are staggered by two years but the specification is identical. What was done to Aurora Crown's atmospheric system can be done here using the same method. Based on the supply chain evidence from Craftspire and Ironhold, the material to do it is already moving south. Aurora Crown did not end anything. It demonstrated that the method works.`;
        G.flags.aurora_arc_shelk_dome_match = true;
        addJournal('discovery', 'Shelkopolis dome architecture matches Aurora Crown — same substitution is possible here', `aurora-arc-dome-match-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The filtration terminals look similar to Aurora Crown's from the outside but you cannot read the internal specification without the technical documents to compare against. The chassis design might match or might be a different generation entirely. An engineer would know. You need to find one before drawing conclusions.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "The investigation network contact in Shelkopolis is at a technical archive in the Aurora Heights district. They've been waiting for someone with dome documentation.",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'making contact at Aurora Heights technical archive');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `The archivist works at a long table covered in dome specification sheets, some rolled, some pinned flat. His name is Doran and he has been building this comparison for two months. "Someone forwarded me the Glasswake shard amplification study," he says without looking up. "I read what it described. Then I pulled Shelkopolis's dome maintenance log." He turns a page toward you: the input manifolds have not been formally inspected in eleven months — four months past the required maintenance cycle. He taps the Aurora Crown specification. The chassis is identical. Aurora Crown was not a test run. It was a template in operation.`;
        G.flags.met_doran_aurora_heights = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('discovery', 'Doran: Shelkopolis dome uninspected for 11 months — Aurora Crown was a template, not test', `aurora-arc-doran-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `A junior assistant is holding down the archive desk. She cannot access personnel contact records — that requires Doran's sign-off and Doran is on a scheduled observatory rotation. She takes your name and writes it on a slip of paper she folds into a ledger. You find a room nearby and wait.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— HARD GATE ———

  {
    label: "Aurora Crown was exposed deliberately. Shelkopolis's dome uses the same architecture. The documentation you carry explains how it was done and confirms it can be done here.",
    tags: ['ArcGate', 'Decision'],
    xpReward: 80,
    condition: function() { return G.level >= 6 && !(G.flags && G.flags.aurora_arc_departing); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'committing to bring dome evidence to Shelkopolis');
      if (!G.flags) G.flags = {};
      G.flags.aurora_arc_departing = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `Staying in Aurora Crown means watching a dome settlement get sicker by degrees while the operation advances to the next target. The documentation you carry names the mechanism and the supply chain. Shelkopolis has the same filtration architecture. You pack what you need and take the southern road.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— FINALE ———

  {
    label: "Arrive in Shelkopolis. Aurora Crown showed what the operation looks like at completion. This city shows what it looks like before it begins.",
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() { return (G.investigationProgress || 0) >= 5 || G.level >= 6; },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis from Aurora Crown');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_aurora_crown = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      const finalText = arch === 'combat' ? ` The exposure in Aurora Crown built over weeks before anyone presented symptoms. A population does not mobilize against what it cannot name as a threat. That is what made it work.`
        : arch === 'magic' ? ` The atmospheric chemistry is exact — compound behavior calibrated to dome pressure regulation, threshold saturation timed to the season. Someone with formal training in both disciplines designed this.`
        : arch === 'stealth' ? ` Aurora Crown's residents are being treated for seasonal illness. None of them know what is in their air. The contamination is secondary to the invisibility — the invisibility is the architecture.`
        : ` People in Aurora Crown are receiving the wrong treatment for what is making them sick. In Shelkopolis, the same infrastructure stands uninspected. The window before that changes is shorter than you would like.`;

      G.lastResult = `Shelkopolis — the dome terminals visible on the western skyline, the same chassis as Aurora Crown, the same input manifolds, the maintenance schedule running four months overdue.${finalText} Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 2;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('consequence', 'Arrived in Shelkopolis from Aurora Crown — Stage 2 begins', `aurora-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];

window.AURORA_CROWN_TO_SHELK_ARC = AURORA_CROWN_TO_SHELK_ARC;
