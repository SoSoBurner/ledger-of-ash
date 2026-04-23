/**
 * GLASSWAKE COMMUNE STAGE 2 ENRICHED CHOICES
 * Investigation arc: glasswake shard contamination data / glyph architecture research suppression
 * NPCs: Researcher Toman Iceveil (Contamination Research Lead), Lenna Bannerhold (Commune Research Clerk)
 */

const GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Researcher Toman Iceveil's contamination data shows glasswake shard output increasing in correlation with external glyph pressure events — the shards are responding to engineered surges.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'reviewing glasswake shard glyph correlation with Toman Iceveil');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_toman_iceveil = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Toman's research crosses two previously unconnected findings: glasswake shards amplify glyph pressure differentials, and the regional surge pattern is consistent with a modulated external source rather than natural variance. His conclusion — which he has not published due to suppression pressure — is that someone is deliberately using the shards as a regional pressure amplification network. Glasswake is an unwilling component of the operation.`;
        addJournal('Glasswake shards are surge amplification network — Iceveil has unpublished conclusion', 'evidence', `glass-toman-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Toman's research is under active suppression request from the "Northern Glyph Oversight Commission" — the same fabricated authority Taldan Veyst identified in Sunspire. Engaging with you puts him at formal risk. He closes the conversation.`;
        addJournal('Iceveil research under fake-authority suppression request — cooperation too risky', 'complication', `glass-toman-fail-${G.dayCount}`);
      } else {
        G.flags.met_toman_iceveil = true;
        G.investigationProgress++;
        G.lastResult = `Toman confirms the correlation. "The surge pattern has characteristics of an external modulated signal. Natural variance doesn't produce this regularity." He hasn't published. "The suppression requests started immediately after I submitted for peer review."`;
        addJournal('Surge pattern has external modulated signal characteristics — publication suppressed', 'evidence', `glass-toman-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Lenna Bannerhold's research clerk records include a suppression order that names four specific research conclusions — the conclusions describe the full operation mechanism if read together.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'analyzing suppression order contents with Lenna Bannerhold');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_lenna_bannerhold = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Lenna reads the four suppressed conclusions aloud: shard amplification mechanics, tidal window optimal surge timing, suppression compound delivery efficacy, and staged exposure dosing effects. Together they form a complete operational manual. The suppression order was not preventing harmful research — it was preventing the documentation of a crime.`;
        addJournal('Four suppressed conclusions form complete operation manual — suppression order was evidence concealment', 'evidence', `glass-lenna-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The suppression order's existence is itself a classified document. Your request for its contents is treated as a compliance violation. Lenna is obligated to report the inquiry.`;
        addJournal('Suppression order classified — inquiry reported as compliance violation', 'complication', `glass-lenna-fail-${G.dayCount}`);
      } else {
        G.flags.met_lenna_bannerhold = true;
        G.investigationProgress++;
        G.lastResult = `Lenna can describe the suppression order's structure but cannot read the classified conclusions. The four topics covered are: shard mechanics, timing analysis, compound delivery, and population exposure. The pairing is not coincidental.`;
        addJournal('Four suppression topics identified — shard, timing, compounds, population dosing', 'evidence', `glass-lenna-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Toman Iceveil's unpublished research, combined with the suppression order, creates a complete evidentiary package — help him submit it through a protected channel.",
    tags: ['Investigation', 'Craft', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 84,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'routing Toman Iceveil research through protected publication channel');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags.met_toman_iceveil && !G.flags.met_lenna_bannerhold) {
        G.lastResult = `You need to establish contact with both Toman and Lenna before attempting to route the research.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.flags.stage2_evidence_shared = true;
        G.lastResult = `You route the research through the Mimolot Academy's Velis Quillfire shrine archive — a channel that bypasses commercial publication suppression because shrine records have doctrinal protection. The research is now preserved in a location that cannot be legally suppressed. The operation's mechanism is documented and protected.`;
        addJournal('Glasswake research preserved in shrine archive — legally suppression-proof via Mimolot', 'evidence', `glass-route-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Your routing attempt is intercepted. The suppression authority receives notification that the research was nearly published. Toman faces immediate increased scrutiny. The window is closed for now.`;
        addJournal('Research routing intercepted — Toman under increased scrutiny', 'complication', `glass-route-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.flags.stage2_evidence_shared = true;
        G.lastResult = `The research reaches a secure channel with partial protection. It is preserved but not yet publicly accessible. The operation's architects know the research exists outside their control.`;
        addJournal('Research in secure channel — preserved but not public, architects alerted', 'evidence', `glass-route-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Toman Iceveil returns to the observation gallery with a second data set — shard resonance patterns from three separate clear-sky windows. The amplification is not random. It is timed.",
    tags: ['Stage2', 'Lore'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'tracing timed shard resonance pattern with Toman Iceveil');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.toman_second_meeting = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Toman spreads three parchment charts across the gallery table, weighted at the corners with sample jars. The resonance spikes align to the same two-hour window across all three clear-sky events — separated by forty-three days each. He taps the interval column. "That is not a natural period. The glasswake formation doesn't have a forty-three day cycle. Something external does." The amplification network has a clock. Someone is running it on a schedule.`;
        addJournal('Shard resonance spikes on 43-day interval — external schedule confirmed by Iceveil', 'evidence', `glass-toman2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Toman arrives at the gallery but stops short when he notices a containment warden logging instrument readings nearby. He rolls the charts back without unfolding them. "Not here." He leaves. The warden watches the door for a long moment before returning to the log.`;
        addJournal('Iceveil second data set blocked — warden present, meeting aborted', 'complication', `glass-toman2-fail-${G.dayCount}`);
      } else {
        G.flags.toman_second_meeting = true;
        G.investigationProgress++;
        G.lastResult = `Toman shows one chart — the most recent clear-sky window. The resonance spike is narrow, precise, and two hours after solar peak. "I have two more that match." He won't produce them here, but he confirms the interval is consistent. "Forty-three days. Every time." He folds the chart and pockets it before anyone passes the doorway.`;
        addJournal('One confirmed spike — 43-day interval, Iceveil has two more matching charts', 'evidence', `glass-toman2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The flagged exposure trenches outside the dome mark the shard formation perimeter. At low-observation hours the pylons go dark. The glyph pressure gradient is readable directly from the trench edge.",
    tags: ['Stage2', 'Survival'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'reading glyph pressure gradient at the shard formation site');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.shard_site_observed = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The trench edge is cold enough that breath fogs immediately. The shards here are small — irregular clusters the size of a fist, dark at the base and pale at the tip. The glyph pressure visible to a trained eye runs inward rather than outward: the formation is drawing pressure toward its center, not dispersing it. A natural shard vents. This one collects. The flagging markers are spaced for quarantine, not study. No researcher has stood this close in some time.`;
        addJournal('Shard formation draws pressure inward — collector behavior, not natural venting', 'evidence', `glass-site-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `A pylon activates early — the sensor grid runs a sweep cycle that doesn't match the posted schedule. The light sweeps the trench edge and catches movement. A containment warden is at the dome entrance within minutes, citation board in hand. Your presence at the perimeter outside observation hours goes into the formal log.`;
        addJournal('Caught at shard perimeter — pylon sweep early, formal citation logged', 'complication', `glass-site-fail-${G.dayCount}`);
      } else {
        G.flags.shard_site_observed = true;
        G.investigationProgress++;
        G.lastResult = `The shards are denser at the formation center than the quarantine maps show. The pressure gradient at the trench edge runs counter to what the posted data boards list — inward pull where the readings claim neutral. The discrepancy is measurable with bare attention. Whether it was misread or misreported is a different question.`;
        addJournal('Pressure gradient counter to posted readings — inward pull at shard center', 'evidence', `glass-site-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Lenna Bannerhold flags a procedural breach: you accessed the shard perimeter log without submitting a prior scan record. The Containment Research Concord requires collective sign-off before field access.",
    tags: ['Stage2', 'Persuasion'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'navigating collective process breach with Lenna Bannerhold');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.lenna_trust_built = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Lenna sets the citation form down without filing it. She studies the scan record gap for a moment, then slides the log closed. "The Concord requires process because process creates a record. If your record is missing, that means someone else's record is the only one." She glances toward the suppression files across the room. "That happens to be relevant right now." She marks your access as a supervised observation and countersigns it herself.`;
        addJournal('Lenna countersigned access — process breach resolved, trust established', 'contact_made', `glass-lenna2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Lenna files the citation before the conversation ends. "I understand you have reasons. So does everyone who skips scanning." She is not hostile — she is procedurally obligated and says so plainly. The citation goes to the Containment Research Concord. It will attach to any future access request.`;
        addJournal('Citation filed with Concord — future access requests flagged', 'complication', `glass-lenna2-fail-${G.dayCount}`);
      } else {
        G.flags.lenna_trust_built = true;
        G.investigationProgress++;
        G.lastResult = `Lenna accepts the explanation but logs a formal note rather than dismissing the breach. "I can mark this as remediated, not absent." She hands over a blank scan form. "Submit this before any further perimeter access. The Concord reads absences as intent." It is not a threat. It is the actual rule, stated without editorial.`;
        addJournal('Breach marked remediated — scan form required for further perimeter access', 'intelligence', `glass-lenna2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Glasswake Commune finale — the shard amplification proof and suppressed conclusions confirm the full operation mechanism. Publish openly or submit to institutional authority.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 106,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(106, 'Glasswake Commune Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Glasswake investigation requires more evidence before final action.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You submit the complete research package to the Mimolot Academy Regent Council under Quenra Quillfire's authority. The Council opens a formal academic investigation. The suppression order is declared void under Academy academic freedom doctrine. Stage III opens with academic institution backing.`;
        addJournal('Glasswake S2 finale: Academy formal investigation, suppression order voided', 'evidence', `glass-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You publish the full research package simultaneously across every scholarly network and trade circuit in the region. The mechanism is public knowledge. The operation can no longer rely on technical opacity.`;
        addJournal('Glasswake S2 finale: operation mechanism published across all networks', 'evidence', `glass-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES = GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES;
