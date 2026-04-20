/**
 * WHITEBRIDGE COMMUNE STAGE 2 ENRICHED CHOICES
 * Investigation arc: bridge crossing records / northern route transit monitoring
 * NPCs: Arbiter Nyra Thawmark (Communal Arbiter), Cadrin Crownmere (Bridge Clerk),
 *       Aster Starice (Night-Lantern Inspector), Thora Snowveil (Grain Measurer)
 */

const WHITEBRIDGE_COMMUNE_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Cadrin Crownmere's Bridge Crossing Office records every transit — a specific crossing pattern repeats every twelve days and matches the northern courier schedule Vaelis Sunweave identified in Fairhaven.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-referencing bridge crossing patterns with Cadrin Crownmere');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_cadrin_crownmere = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The twelve-day pattern is precise to the hour. A party of two to three individuals crosses northbound in the evening, returns southbound three days later. The crossing records show "diplomatic transit" exemption on every occasion — an exemption category normally requiring advance Commune Council approval that was never filed for these crossings. The exemption was applied administratively by a Collegium liaison.`;
        addJournal('investigation', 'Whitebridge: 12-day courier crossings under unauthorized Collegium diplomatic exemption', `wb-cadrin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The crossing records require Arbiter authorization to access for external review. Cadrin cannot provide access without it.`;
        addJournal('complication', 'Bridge crossing records require Arbiter authorization — access blocked', `wb-cadrin-fail-${G.dayCount}`);
      } else {
        G.flags.met_cadrin_crownmere = true;
        G.investigationProgress++;
        G.lastResult = `Cadrin confirms the regular crossing pattern. "Same party, same schedule, same exemption code for seven months. I flagged it to my supervisor twice. Both flags were cleared by administrative override."`;
        addJournal('investigation', 'Regular diplomatic exemption crossings — administrative override cleared 2 flags', `wb-cadrin-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Aster Starice's Night-Lantern Circuit surveys the bridge at night — she has witnessed cargo transfers occurring on the bridge after midnight that are not logged in any crossing record.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'gathering night-transfer witness account from Aster Starice');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_aster_starice = true;
        G.investigationProgress++;
        G.lastResult = `Aster has been recording the transfers in her personal inspection log. Sealed containers, transferred between two convoys on the bridge midpoint, never registered as a crossing because neither convoy fully crosses — they meet, exchange cargo, and return to their respective sides. The containers bear the same sealed charter mark. The operation uses the bridge as a mid-transit exchange point to break the cargo tracking chain.`;
        addJournal('investigation', 'Bridge used as mid-transit exchange point — breaks cargo tracking chain, charter mark confirmed', `wb-aster-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Aster is cautious about sharing night observation data. A previous report she filed about unusual bridge activity was dismissed and she received a formal warning for "unauthorized observation protocols." She declines to share further.`;
        addJournal('complication', 'Night inspector declined — previous report dismissed, formal warning received', `wb-aster-fail-${G.dayCount}`);
      } else {
        G.flags.met_aster_starice = true;
        G.investigationProgress++;
        G.lastResult = `Aster describes the cargo transfers. "They never fully cross, so they never register as a crossing. Very clever." She has a personal log of six instances with approximate timing and cargo volume estimates.`;
        addJournal('investigation', 'Bridge midpoint exchanges — 6 instances logged, never registered as crossings', `wb-aster-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Arbiter Nyra Thawmark adjudicates crossing loss claims — a claim filed by a farmer for cargo damaged at the bridge contains a description of an unusual container he found on the bridge.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reviewing unusual container claim with Arbiter Nyra Thawmark');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_arbiter_nyra_thawmark = true;
        G.investigationProgress++;
        G.lastResult = `The farmer's claim describes a container left on the bridge midpoint — sealed, heavy, with a geometric charter mark. He moved it to file a path obstruction claim. The container's contents, when inspected by Nyra for the claim, consisted of sealed chemical vials consistent with suppression compound components. Nyra retained samples as claim evidence. She provides them.`;
        addJournal('investigation', 'Arbiter has physical suppression compound samples from abandoned bridge container', `wb-nyra-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The claim is under active arbitration. Nyra cannot share claim documentation with external parties until the arbitration concludes. The timeline is six weeks.`;
        addJournal('complication', 'Claim under arbitration — external access blocked for 6 weeks', `wb-nyra-fail-${G.dayCount}`);
      } else {
        G.flags.met_arbiter_nyra_thawmark = true;
        G.investigationProgress++;
        G.lastResult = `Nyra confirms the unusual container in the claim file. The farmer's description matches what you're looking for. She cannot share the samples yet but confirms they were unusual enough to retain.`;
        addJournal('investigation', 'Arbiter retained unusual container samples — consistent with investigation targets', `wb-nyra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Thora Snowveil's grain measurement records track all agricultural transit — sealed non-agricultural containers have been using grain convoy exemptions to cross the bridge without inspection.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'examining grain exemption misuse with Thora Snowveil');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_thora_snowveil = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Thora's weight measurements expose the misuse precisely: grain convoys crossing under standard manifests contain weight discrepancies consistent with additional sealed containers not listed. The same agricultural routing number fraud Farlan Inkshade found in Harvest Circle is operating at Whitebridge, adding an additional transit layer to the supply chain obfuscation.`;
        addJournal('investigation', 'Whitebridge grain weight discrepancies confirm same routing fraud as Harvest Circle — second transit layer', `wb-thora-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Thora's measurement records are submitted for weekly agricultural board review. Your request to review them outside the standard process is denied pending board approval.`;
        addJournal('complication', 'Grain measurement records under board review — non-standard access denied', `wb-thora-fail-${G.dayCount}`);
      } else {
        G.flags.met_thora_snowveil = true;
        G.investigationProgress++;
        G.lastResult = `Thora has noted weight anomalies in several grain convoys. "The numbers don't reconcile. Grain convoy declares twenty sacks. I weigh the equivalent of twenty-three. Three unaccounted." She files the discrepancies every time.`;
        addJournal('investigation', 'Grain weight discrepancies filed by Thora — unaccounted cargo in convoy', `wb-thora-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Whitebridge Commune finale — the bridge is both a transit point and evidence source. Use Nyra's samples and Aster's log to formally close the crossing or quietly document the next transfer.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 104,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(104, 'Whitebridge Commune Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Whitebridge investigation needs more evidence to proceed.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You present Nyra's samples, Aster's transfer log, and the grain weight records to the Commune Council. The Council suspends all diplomatic exemption crossings and submits the physical evidence to Roadwarden forensic review. The bridge transit route is formally closed. Stage III opens with Commune Council institutional backing.`;
        addJournal('investigation', 'Whitebridge S2 finale: Council suspends diplomatic crossings, forensic evidence submitted', `wb-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You photograph and document the next midnight transfer using Aster's schedule and distribute the documentation to the Verdant Row network. The courier pattern is publicly known before the next scheduled crossing. The bridge route is abandoned.`;
        addJournal('investigation', 'Whitebridge S2 finale: next transfer documented and distributed — route abandoned', `wb-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];
