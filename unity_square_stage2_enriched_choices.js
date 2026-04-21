/**
 * UNITY SQUARE STAGE 2 ENRICHED CHOICES
 * Investigation arc: arrival registry manipulation / ward mediation bypasses
 * NPCs: Vale Brokerwell (Clerk of Arrivals), Vale Ledgermere (Ward Mediator), Vale Tinmarch (Street Physician)
 */

const UNITY_SQUARE_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Vale Brokerwell's Arrival Registry has a systematic gap — parties arriving under diplomatic transit exemption are not logged in the main registry, only in a shadow sub-register.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'exposing arrival registry shadow sub-register with Vale Brokerwell');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_vale_brokerwell = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The shadow sub-register contains arrivals spanning six months. Three patterns emerge: the same sealed charter parties from Shirshal's Bureau ghost visitors, cargo weight descriptions consistent with suppression compounds, and a routing pattern that connects every major hub in the investigation. Unity Square is the coordination hub — parties from all nodes meet here periodically.`;
        addJournal('investigation', 'Unity Square shadow register: operation coordination hub confirmed — all node parties meet here', `unity-brokerwell-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The shadow sub-register exists under a classified administrative designation. Your access attempt is flagged immediately and reported to the Ward Administration oversight committee.`;
        addJournal('complication', 'Shadow register access flagged — Ward Administration oversight committee notified', `unity-brokerwell-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_brokerwell = true;
        G.investigationProgress++;
        G.lastResult = `Vale confirms the shadow sub-register exists. He created it himself to track what the main registry was missing. "If I don't log it somewhere, it's like they were never here. That felt wrong." He shares the access.`;
        addJournal('investigation', 'Unity Square shadow register confirms unlogged diplomatic arrivals', `unity-brokerwell-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Vale Ledgermere has mediated disputes between parties that have now appeared in the investigation — the mediation records cross-identify operation participants.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing mediation participants with Vale Ledgermere');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_vale_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Vale mediates under strict confidentiality, but one disputing party from three months ago gave permission for records release during a later legal proceeding. The release reveals an identity: a Soreheim Iron Compact freight agent and a Guildheart Hub broker were disputing a payment default on a "specialized compound consignment." The mediation record confirms both parties and the transaction nature.`;
        addJournal('investigation', 'Mediation record confirms Soreheim Iron Compact agent and Guildheart broker in compound payment dispute', `unity-ledgermere-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Mediation confidentiality is absolute. Vale cannot share any records without both parties' written consent. Your request is documented.`;
        addJournal('complication', 'Ward mediation confidentiality — both party consent required, request documented', `unity-ledgermere-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Vale confirms mediation sessions involving parties from different institutional contexts over the past six months. He cannot share specifics but confirms "specialized commercial disputes of an unusual nature" were mediated. The phrasing suggests compound-adjacent activity.`;
        addJournal('investigation', 'Unusual specialized commercial mediations confirmed — parties from multiple institutions', `unity-ledgermere-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Vale Tinmarch has treated patients presenting with symptoms consistent with low-level suppression compound exposure — they are Unity Square residents who live near the coordination meeting points.",
    tags: ['NPC', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'reviewing suppression exposure symptoms with street physician Vale Tinmarch');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_vale_tinmarch = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Tinmarch has been tracking a cluster of twelve patients over four months. All present with cognitive fog, mild respiratory distress, and reduced magical sensitivity — a symptom cluster consistent with ongoing suppression compound exposure. All twelve live within two blocks of the shadow register's most frequent arrival address. The coordination meetings are contaminating the local population.`;
        addJournal('investigation', 'Unity Square population cluster exposure confirmed — contamination from coordination meeting point', `unity-tinmarch-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tinmarch's patient records are protected under medical privacy protocol. He cannot share symptom clusters without patient consent.`;
        addJournal('complication', 'Medical privacy protocol — patient symptom cluster requires consent', `unity-tinmarch-fail-${G.dayCount}`);
      } else {
        G.flags.met_vale_tinmarch = true;
        G.investigationProgress++;
        G.lastResult = `Tinmarch describes the symptom cluster without naming patients. "Cognitive suppression symptoms in a geographic cluster is not natural variance. Something local is causing this." He doesn't know what. The geographic center matches the arrival registry address.`;
        addJournal('investigation', 'Geographic symptom cluster at arrival registry address — exposure source likely', `unity-tinmarch-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Unity Square finale — the coordination hub is confirmed. Expose the shadow register publicly or use it to map and intercept the final operation meeting.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 102,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(102, 'Unity Square Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Unity Square investigation needs more evidence to confirm the coordination hub.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You present the shadow register, the mediation cross-identification, and the population exposure cluster to Ward Administration oversight. The oversight committee suspends the diplomatic exemption protocol and files a formal complaint with the Roadwarden Central Command in Shelkopolis. Stage III opens with Ward Administration institutional backing.`;
        addJournal('investigation', 'Unity Square S2 finale: Ward oversight committee suspends exemptions, Roadwarden complaint filed', `unity-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You use the shadow register's schedule to predict and observe the next coordination meeting. You document the participants, identify them from multiple investigation threads, and distribute the identification to every investigative contact. The coordination hub is burned.`;
        addJournal('investigation', 'Unity Square S2 finale: coordination meeting observed, participants identified and distributed', `unity-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.UNITY_SQUARE_STAGE2_ENRICHED_CHOICES = UNITY_SQUARE_STAGE2_ENRICHED_CHOICES;
