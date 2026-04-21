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
      G.lastResult = `Three documents: the original filtration specification, the replacement additive delivery manifest, and the pressure monitoring log showing gradient shift after substitution. Together they demonstrate deliberate contamination of a residential atmospheric system. Carrying them is a risk. Not carrying them means this evidence stays in Aurora Crown, where it can be destroyed.`;
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
        G.lastResult = `You leave three days early. The southern road from Aurora Crown sees more traffic as the inspection window approaches — everyone with something to do elsewhere does it before the Collegium teams arrive. You're one traveler among many. Unremarkable.`;
        G.flags.aurora_arc_clean_departure = true;
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `A Collegium advance officer arrives a day early to prepare the inspection site. She records departing researchers and their stated destinations. You're in the log.`;
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

      G.lastResult = `Orren's note: "The pressure differential in the dome manifold corresponds to a source flow rate of approximately 0.3 cubic meters per day. At that rate, full saturation of the residential zone occurs in 90-110 days from substitution start date. I calculated the start date as four months ago. We may be at saturation threshold now. Get this to Shelkopolis as fast as you can." He signed it with his qualification number, not his name.`;
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

      G.lastResult = `The substitute additive is a slow-acting atmospheric compound. Below a threshold concentration, it produces no symptoms. Above that threshold, exposure creates a pressure gradient sensitivity — the kind Letha Dawnsilk's outpost is detecting at 80km distance. Aurora Crown's residential population has been above that threshold for approximately six weeks. Whatever symptoms present will appear as ordinary seasonal illness. The cover is built in.`;
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
        G.lastResult = `You observe her transit timing over two days. She's on a fixed schedule — regular check-ins, no deviation to watch you or your route. She's heading to Shelkopolis on Collegium business that has nothing to do with you. But she'll be there when you arrive. In Shelkopolis you'll need to treat her as potentially hostile until her purpose is clear.`;
        G.flags.aurora_arc_solind_parallel = true;
        G.recentOutcomeType = 'neutral';
      } else {
        G.lastResult = `You can't tell if she's following you or coincidentally on the same road. You change your pace for two hours and she keeps her own rhythm. Probably not targeting you. Probably.`;
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
        G.lastResult = `The symptoms match atmospheric compound exposure below acute threshold: mild pressure sensitivity, intermittent respiratory irritation, fatigue. The healer is treating them correctly for seasonal illness — and incorrectly for what they actually have, which wouldn't respond to her treatments anyway. You note the locations these people traveled from. All within eight kilometers of Aurora Crown's dome infrastructure.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Symptom cluster within 8km of Aurora Crown dome — compound exposure presenting as seasonal illness', `aurora-arc-symptoms-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `They look ill. You don't have the medical knowledge to distinguish atmospheric compound exposure from ordinary seasonal fatigue. You keep moving.`;
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
        G.lastResult = `The filtration access terminals in Shelkopolis's outer districts use the same pressure regulation architecture as Aurora Crown. The same maintenance access points. The same additive input manifolds. What was done to Aurora Crown's atmospheric system can be done here, and based on the supply chain evidence from Craftspire and Ironhold, the material to do it is already in transit. Aurora Crown was not the endpoint. It was the proof of concept.`;
        G.flags.aurora_arc_shelk_dome_match = true;
        addJournal('discovery', 'Shelkopolis dome architecture matches Aurora Crown — same substitution is possible here', `aurora-arc-dome-match-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The dome architecture looks similar but you're not certain enough to make the comparison with confidence. You'll need someone with engineering knowledge to confirm it.`;
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
        G.lastResult = `The archivist, Doran, has been collecting atmospheric system documentation for two months. "Someone sent me the Glasswake shard amplification study," he says. "When I realized what it described, I started looking at Shelkopolis's own dome specs. The input manifolds haven't been formally inspected in eleven months. That's four months past the maintenance schedule." He spreads the technical comparison on his desk. Aurora Crown was not a test. It was a template.`;
        G.flags.met_doran_aurora_heights = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('discovery', 'Doran: Shelkopolis dome uninspected for 11 months — Aurora Crown was a template, not test', `aurora-arc-doran-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The archive is staffed by a junior assistant who can't access the contact records. You leave a message and find accommodation nearby.`;
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
      G.lastResult = `Staying in Aurora Crown means watching a contaminated settlement slowly sicken while the operation moves forward elsewhere. The documentation you carry explains the mechanism. Shelkopolis has the same infrastructure. You leave.`;
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
      const finalText = arch === 'combat' ? ` The exposure in Aurora Crown was slow enough to look like illness. Whoever planned this understood that a population doesn't defend against what it doesn't recognize as an attack.`
        : arch === 'magic' ? ` The atmospheric chemistry is precise. This required someone with formal training in compound behavior under pressure regulation — not an amateur operation.`
        : arch === 'stealth' ? ` Aurora Crown's residents still don't know what's in their air. That's the most disturbing operational detail — not the contamination, but the invisibility of it.`
        : ` You watched people in Aurora Crown get treated for something that isn't what's making them sick. In Shelkopolis the same thing hasn't started yet. That window is closing.`;

      G.lastResult = `Shelkopolis.${finalText} Stage 2 begins here.`;
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
