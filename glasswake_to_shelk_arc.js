/**
 * GLASSWAKE COMMUNE → SHELKOPOLIS TRAVEL ARC
 * Journey from the suppressed shard research site to Stage 2 hub
 * Narrative: Carrying suppressed shard amplification data, consortium commercial liability, Toman's warning
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 */

const GLASSWAKE_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  {
    label: "Toman Iceveil's suppressed study sections 7-12 explain Aurora Crown's contamination mechanism. Carry this data south to Shelkopolis before the consortium finds you have it.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'departing Glasswake with suppressed shard data');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `Sections 7-12 are twenty-three pages. You memorize the key figures and copy the critical diagrams in shorthand notation of your own invention. The physical copies go to three separate locations in Glasswake. What you carry is a cipher readable only to you — and whoever you teach it to in Shelkopolis.`;
      G.recentOutcomeType = 'neutral';
      addJournal('decision', 'Left Glasswake carrying shard data in personal cipher — originals distributed as insurance', `glasswake-arc-departure-${G.dayCount}`);
    }
  },

  {
    label: "Junior researcher Fen leaves Glasswake the same day. She's not coming south — she's going to a sister commune. But she's carrying a copy of the study metadata.",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'coordinating with Fen on distributing study copies');
      if (!G.flags) G.flags = {};

      G.lastResult = `Fen doesn't know where you're going and you don't tell her. "If you find someone in Shelkopolis who can verify the compound concentration calculations," she says, "the methodology is in the appendix. Any materials chemist can reproduce the findings independently." She means: the data doesn't need you as the only carrier. If you don't make it, someone else can reconstruct it.`;
      G.flags.fen_glasswake_distributed = true;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('discovery', 'Fen distributed study metadata — findings can be independently reconstructed by materials chemist', `glasswake-arc-fen-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "The Northern Materials Consortium has a transit monitoring contract with the northern road authority. Your departure from Glasswake may be logged.",
    tags: ['ArcRoad', 'Stealth', 'Risk'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'circumventing consortium transit monitoring');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `You use the commune's internal courier network to get to the first waystation without passing through the road authority checkpoint. Courier traffic is logged by commune category, not by individual. You're listed as "internal correspondence delivery." The consortium's monitoring contract doesn't cover internal commune traffic.`;
        G.flags.glasswake_arc_bypass_monitoring = true;
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The road authority checkpoint logs your departure. Category: "research transit." The consortium's monitoring contract flags researchers traveling south within sixty days of a committee publication review. You're in their system.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
        G.recentOutcomeType = 'complication';
      }
    }
  },

  // ——— SOFT TRIGGER deepening ———

  {
    label: "The consortium's commercial liability calculation from Toman's notes: the shard amplification effect doubles the active concentration of any atmospheric compound released near a glasswake formation.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 80,
    condition: function() { return (G.investigationProgress || 0) >= 5; },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'unpacking consortium liability calculation from Toman\'s notes');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `The glasswake shard formation near Aurora Crown amplifies ambient atmospheric compounds — including the substitute additive introduced into the dome filtration system. The consortium suppressed this data not just to protect its licensing rights. It suppressed it because the study proved that Aurora Crown's dome contamination would be far more acute than the baseline compound alone. They knew. They suppressed the data that proved they knew. That's not negligence. That's complicity.`;
      G.flags.glasswake_arc_complicity_established = true;
      addJournal('discovery', 'Consortium suppressed data proving amplification doubles contamination — known complicity, not negligence', `glasswake-arc-complicity-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "Committee dissenter Winn sent a message south three weeks ago. Trace where it went.",
    tags: ['ArcDeepening', 'Lore', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'tracing Winn\'s forwarded message south');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Winn's message went to the Shelkopolis Institute of Applied Atmospheric Sciences — a body that technically has jurisdictional authority to request the suppressed study from the Glasswake committee under research transparency protocols. If the Institute acts on Winn's message, it creates an official channel for the suppressed data to re-emerge. But that process takes months. The operation will conclude before the Institute files its first inquiry.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Winn contacted Shelkopolis Institute — official channel exists but too slow for timeline', `glasswake-arc-winn-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The message routing is too diffuse to trace precisely. You know it went south and you know Winn sent it to someone who could act. That's enough for now.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Toman's final warning: the shard amplification effect is passive and permanent for formations of this scale. There is no reversing it. Only stopping additional compound release.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'understanding the permanent nature of the shard amplification effect');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `The glasswake formation near Aurora Crown will continue amplifying whatever compound is in the local atmosphere indefinitely. Once the substitute additive concentration rises above the activation threshold, the shard formation ensures it stays there — amplified, dispersed, sustained. The only intervention that matters is stopping the source material from reaching Shelkopolis's dome infrastructure. After that, the formation does nothing. Before that, it does everything.`;
      G.flags.glasswake_arc_urgency_established = true;
      addJournal('discovery', 'Shard amplification is permanent — only prevention matters, not remediation', `glasswake-arc-urgency-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  // ——— ARRIVAL ———

  {
    label: "Shelkopolis. The Institute of Applied Atmospheric Sciences is in the Aurora Heights district. This is where Winn's message went — and where the shard data needs to go.",
    tags: ['ArcArrival', 'Lore', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'orienting toward the Atmospheric Sciences Institute');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `The Institute building occupies a full block in Aurora Heights. Its atmospheric monitoring instruments are visible on the roof — passive sensors, updated quarterly. They won't detect the compound substitution until it's at symptomatic concentration. The real instrument is the shard data you're carrying. That's what makes the Institute useful.`;
      G.flags.glasswake_arc_institute_located = true;
      addJournal('discovery', 'Shelkopolis Institute located — carrying shard data that gives it actionable intelligence', `glasswake-arc-institute-${G.dayCount}`);
      G.recentOutcomeType = 'neutral';
    }
  },

  {
    label: "Find the investigation network contact in Shelkopolis who can decode your cipher and translate the shard data into formal atmospheric chemistry terms.",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'finding contact to decode cipher and formalize shard data');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `The contact is a materials chemist named Oslet who teaches at the Institute and runs a secondary research operation outside its official structure. She decodes your cipher in twenty minutes. "I've been waiting for this," she says. "Winn's message described the methodology but not the numbers. These are the numbers." She formally enters the data into the Institute's independent review process. The suppressed study is now in official channels — and in Shelkopolis's investigation network simultaneously.`;
        G.flags.met_oslet_institute = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('discovery', 'Oslet: shard data formally entered into Institute review — in official and network channels', `glasswake-arc-oslet-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Oslet is at a scheduled observatory rotation and won't be back for two days. Her assistant can take a message but not the data. You hold the cipher until she returns.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— HARD GATE ———

  {
    label: "Glasswake's suppressed data is the mechanism that explains everything else. Carrying it to Shelkopolis is the most important thing you can do right now.",
    tags: ['ArcGate', 'Decision'],
    xpReward: 80,
    condition: function() { return G.level >= 6 && !(G.flags && G.flags.glasswake_arc_departing); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'committing to carry shard data to Shelkopolis');
      if (!G.flags) G.flags = {};
      G.flags.glasswake_arc_departing = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The shard amplification mechanism is the key that makes every other piece of evidence coherent. Without it, the contamination looks like an accident. With it, the design is unmistakable. Shelkopolis has the chemists and the infrastructure knowledge to act on it. Glasswake just has the data. Move it.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— FINALE ———

  {
    label: "Arrive in Shelkopolis carrying the mechanism that explains the entire operation. The shard data is the key — and now it's here.",
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() { return (G.investigationProgress || 0) >= 5 || G.level >= 6; },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis from Glasswake Commune');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_glasswake = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      const finalText = arch === 'magic' ? ` The shard amplification mechanism is elegant in a way that makes it terrible. It uses the natural properties of the glasswake formation as a force multiplier. Whoever understood this understood both the geology and the atmospheric chemistry simultaneously.`
        : arch === 'combat' ? ` The glasswake shard formation is a passive weapon system. It requires no maintenance, produces no signature, and can't be disarmed after activation. The only defense is preventing the ammunition — the compound — from reaching the trigger zone.`
        : arch === 'stealth' ? ` The consortium suppressed the data because they couldn't suppress the formation. The formation is permanent. What they could control was whether anyone knew what it meant. You've ended that control.`
        : ` You're carrying the explanation for why everything in the northern localities fits together. It was designed to fit. And the design was built on something no one outside Glasswake's research community was supposed to know.`;

      G.lastResult = `Shelkopolis.${finalText} Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 2;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('consequence', 'Arrived in Shelkopolis from Glasswake — Stage 2 begins', `glasswake-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];

window.GLASSWAKE_TO_SHELK_ARC = GLASSWAKE_TO_SHELK_ARC;
