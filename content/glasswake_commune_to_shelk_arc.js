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
      G.lastResult = `Sections 7-12 run to twenty-three pages. You spend two hours with the critical diagrams and memorize the key concentration figures. The rest you copy in a technical shorthand you devised for your own fieldwork — notation that reads as illegible marginal notes to anyone who does not know the system. The physical pages go to three separate locations in Glasswake as insurance. What you carry south is a cipher that exists only in your head and on paper no one else can parse. The consortium has eyes on departures. Someone is already watching which direction you went.`;
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

      G.lastResult = `Fen is heading northeast, not south, and you do not tell her your destination. She hands you a folded copy of the appendix methodology before you part. "Any materials chemist with the right equipment can reproduce the findings from this alone," she says. "The concentration calculations are derivable from the methodology independently." She does not say what she means directly. What she means is: if you are stopped, the data does not die with you.`;
      G.flags.fen_glasswake_distributed = true;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('Fen distributed study metadata — findings can be independently reconstructed by materials chemist', 'discovery', `glasswake-arc-fen-${G.dayCount}`);
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

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The commune's internal courier network reaches the first waystation through a path that does not cross the road authority checkpoint. Courier runs are logged by category — "internal correspondence delivery" — not by individual name. The consortium's monitoring contract specifies researcher transit departures. You are, for the record, a correspondence packet. You reach the waystation without appearing in any log that the consortium can pull.`;
        G.flags.glasswake_arc_bypass_monitoring = true;
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The road authority checkpoint officer stamps your papers and writes your departure in the log under "research transit." The consortium's monitoring contract covers exactly this category, in exactly this window — researchers departing south within sixty days of a committee publication review. You are in their system before you are two kilometres down the road.`;
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

      G.lastResult = `The glasswake shard formation near Aurora Crown amplifies ambient atmospheric compounds — all of them, indiscriminately, including any substitute additive that enters the dome filtration system. The consortium suppressed this data not because of licensing concerns. They suppressed it because the study proved that Aurora Crown's contamination would be dramatically more severe than the baseline compound alone would produce. The formation doubles the effective concentration. They knew this. They held the data that proved they knew. That is not negligence.`;
      G.flags.glasswake_arc_complicity_established = true;
      addJournal('Consortium suppressed data proving amplification doubles contamination — known complicity, not negligence', 'discovery', `glasswake-arc-complicity-${G.dayCount}`);
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

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Winn's message went to the Shelkopolis Institute of Applied Atmospheric Sciences — the one body with jurisdictional authority to demand the suppressed study from the Glasswake committee under research transparency protocols. An Institute request cannot be ignored the way a private complaint can. But the process moves slowly: initial inquiry, committee response, formal review. Months, at minimum. The operation will conclude before the Institute's first formal filing reaches the Glasswake registry.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Winn contacted Shelkopolis Institute — official channel exists but too slow for timeline', 'discovery', `glasswake-arc-winn-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The courier routing Winn used distributes messages through three relay points before reaching its destination — a privacy measure that makes it difficult to trace the endpoint without registry access you do not have here. You know it went south. You know Winn chose someone with authority to act on it. Shelkopolis is where you will find out who received it.`;
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

      G.lastResult = `The glasswake formation is passive and permanent at this scale. It amplifies whatever compound is present in the surrounding atmosphere without discrimination or limit. Once the substitute additive concentration in Aurora Crown crosses the activation threshold, the shard formation locks it there — amplified, dispersed, sustained indefinitely. Toman's note on this is direct: there is no remediation. The only intervention that matters is preventing the source material from reaching Shelkopolis's dome input manifolds. Before it enters the system, the formation is irrelevant. After it does, the formation becomes the primary threat.`;
      G.flags.glasswake_arc_urgency_established = true;
      addJournal('Shard amplification is permanent — only prevention matters, not remediation', 'discovery', `glasswake-arc-urgency-${G.dayCount}`);
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

      G.lastResult = `The Institute building takes up a full block in Aurora Heights — stone facade, rooftop instruments visible from two streets away. Passive atmospheric sensors, updated quarterly. They are calibrated to detect compound concentrations well above the activation threshold — they will not register the substitution until it has already caused harm. The shard data you carry tells the Institute what its own instruments cannot. That gap is what makes you useful to them.`;
      G.flags.glasswake_arc_institute_located = true;
      addJournal('Shelkopolis Institute located — carrying shard data that gives it actionable intelligence', 'discovery', `glasswake-arc-institute-${G.dayCount}`);
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

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Oslet works in a back office of the Institute that is technically hers but not listed in the Institute's public directory. She decodes your cipher in under twenty minutes, using the methodology in Fen's appendix as a key. She reads the concentration figures twice, then sets the paper down carefully. "Winn described the method," she says. "I needed the numbers." She files the data formally into the Institute's independent review process — a submission that creates a permanent record she cannot be asked to withdraw. The study is now in official channels and in the network simultaneously.`;
        G.flags.met_oslet_institute = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Oslet: shard data formally entered into Institute review — in official and network channels', 'discovery', `glasswake-arc-oslet-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Oslet is at an observatory rotation that runs two more days. Her assistant is a second-year student who cannot accept research data submissions without a faculty sign-off. You leave a message with your lodging address and keep the cipher in your possession. Two days of the city, two days of not knowing whether the data is safe, before you can deliver it to anyone who can use it.`;
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
      G.lastResult = `Without the shard data, the contamination reads as a supply chain accident. With it, the design is legible: the formation was selected, the compound was calibrated to the formation's amplification rate, and the threshold was timed. Glasswake has the data and no one with authority to act on it. Shelkopolis has the chemists, the Institute, and the network. Move the data south.`;
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
      if ((G.investigationProgress || 0) < 5 && G.level >= 6) {
        addJournal('You have reached the limit of what this stage can teach you. The road south is open — but the threads you leave unresolved will cost you in Shelkopolis.', 'intelligence');
      }
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      const finalText = arch === 'magic' ? ` The shard amplification mechanism uses the formation's natural resonance properties as a force multiplier. It requires no additional intervention after the compound enters the atmosphere. Whoever calibrated the compound to the formation's amplification rate understood both disciplines at a level that narrows the list of possible designers considerably.`
        : arch === 'combat' ? ` The glasswake formation is a passive system — no maintenance required, no signature produced, no means of disarming it after the compound reaches activation threshold. The only viable defense is interdicting the compound before it enters the dome infrastructure.`
        : ` The consortium could not suppress the formation itself — geology is not compliant. What they could suppress was the data proving what the formation does. You have ended that suppression. The data is in the Institute's independent review record and cannot be withdrawn.`
        : ` Everything from the northern localities connects through a single mechanism that was designed to be invisible without this data. The design was built on knowledge that only Glasswake's research community held. Someone inside that community was part of this from the beginning.`;

      G.lastResult = `Shelkopolis — the Institute roofline visible from the eastern approach, its passive sensors running quarterly updates that will not catch what you are carrying until it is too late.${finalText} Stage 2 begins here.`;
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
