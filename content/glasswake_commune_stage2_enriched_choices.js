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
        addJournal('investigation', 'Glasswake shards are surge amplification network — Iceveil has unpublished conclusion', `glass-toman-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Toman's research is under active suppression request from the "Northern Glyph Oversight Commission" — the same fabricated authority Taldan Veyst identified in Sunspire. Engaging with you puts him at formal risk. He closes the conversation.`;
        addJournal('complication', 'Iceveil research under fake-authority suppression request — cooperation too risky', `glass-toman-fail-${G.dayCount}`);
      } else {
        G.flags.met_toman_iceveil = true;
        G.investigationProgress++;
        G.lastResult = `Toman confirms the correlation. "The surge pattern has characteristics of an external modulated signal. Natural variance doesn't produce this regularity." He hasn't published. "The suppression requests started immediately after I submitted for peer review."`;
        addJournal('investigation', 'Surge pattern has external modulated signal characteristics — publication suppressed', `glass-toman-partial-${G.dayCount}`);
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
        addJournal('investigation', 'Four suppressed conclusions form complete operation manual — suppression order was evidence concealment', `glass-lenna-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The suppression order's existence is itself a classified document. Your request for its contents is treated as a compliance violation. Lenna is obligated to report the inquiry.`;
        addJournal('complication', 'Suppression order classified — inquiry reported as compliance violation', `glass-lenna-fail-${G.dayCount}`);
      } else {
        G.flags.met_lenna_bannerhold = true;
        G.investigationProgress++;
        G.lastResult = `Lenna can describe the suppression order's structure but cannot read the classified conclusions. The four topics covered are: shard mechanics, timing analysis, compound delivery, and population exposure. The pairing is not coincidental.`;
        addJournal('investigation', 'Four suppression topics identified — shard, timing, compounds, population dosing', `glass-lenna-partial-${G.dayCount}`);
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
        addJournal('investigation', 'Glasswake research preserved in shrine archive — legally suppression-proof via Mimolot', `glass-route-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Your routing attempt is intercepted. The suppression authority receives notification that the research was nearly published. Toman faces immediate increased scrutiny. The window is closed for now.`;
        addJournal('complication', 'Research routing intercepted — Toman under increased scrutiny', `glass-route-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.flags.stage2_evidence_shared = true;
        G.lastResult = `The research reaches a secure channel with partial protection. It is preserved but not yet publicly accessible. The operation's architects know the research exists outside their control.`;
        addJournal('investigation', 'Research in secure channel — preserved but not public, architects alerted', `glass-route-partial-${G.dayCount}`);
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
        addJournal('investigation', 'Glasswake S2 finale: Academy formal investigation, suppression order voided', `glass-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You publish the full research package simultaneously across every scholarly network and trade circuit in the region. The mechanism is public knowledge. The operation can no longer rely on technical opacity.`;
        addJournal('investigation', 'Glasswake S2 finale: operation mechanism published across all networks', `glass-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES = GLASSWAKE_COMMUNE_STAGE2_ENRICHED_CHOICES;
