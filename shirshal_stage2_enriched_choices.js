/**
 * SHIRSHAL STAGE 2 ENRICHED CHOICES
 * Investigation arc: compliance investigation bureau / cross-locality evidence suppression
 * NPCs: Tazren Coilspire (Senior Investigator), Mirae Coilspire (Innkeeper),
 *       Khalis Coilspire (Market Clerk), Sivren Coilspire (Shrine Attendant), Luneth Coilspire (Porter)
 */

const SHIRSHAL_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Tazren Coilspire at the Investigation Bureau has an open case file that overlaps with every thread you've been pulling — compare notes.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 84,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'cross-referencing with Bureau investigator Tazren Coilspire');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_tazren_coilspire = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Tazren has been investigating for eight months. His case file names the same sealed charter pattern, the same Fairhaven staging point, and the same glyph surge correlation. He was reassigned off the case six months ago. His case file was archived. He kept a copy. He shares it.`;
        addJournal('investigation', 'Bureau investigator Tazren — 8-month parallel case file shared, case was suppressed', `shir-tazren-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Tazren is professionally cautious. Your knowledge of the investigation thread without Bureau credentials is itself a red flag. He logs your visit and requests your origin documentation. The Bureau now has your name.`;
        addJournal('complication', 'Bureau visit logged — origin documentation requested', `shir-tazren-fail-${G.dayCount}`);
      } else {
        G.flags.met_tazren_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Tazren confirms the case exists. He cannot share the archived file but confirms it names the same charter pattern. "The file being archived doesn't mean the investigation stopped. It means it moved somewhere without oversight."`;
        addJournal('investigation', 'Bureau archived case confirmed — investigation moved off-record', `shir-tazren-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Luneth Coilspire processes evidence transfers between Bureau departments — three evidence packages related to glyph cases were marked delivered but never logged at their destination.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'tracing missing evidence transfers with Luneth Coilspire');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_luneth_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Luneth's transfer records show three glyph-adjacent evidence packages marked "received — archive" at a sub-registry address that does not appear in the Bureau's official branch list. The address maps to a postal contact in the same northern staging district identified from Fairhaven.`;
        addJournal('investigation', 'Evidence transfers to unlisted sub-registry — maps to northern staging district', `shir-luneth-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The transfer records are under a routine retention audit this week. Your request to review them triggers a hold that freezes access for 30 days. The audit timing was not coincidental.`;
        addJournal('complication', 'Evidence records frozen under retention audit — access blocked 30 days', `shir-luneth-fail-${G.dayCount}`);
      } else {
        G.flags.met_luneth_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Luneth finds the delivery anomaly. Three packages logged as delivered, no arrival record at the stated branch. "That's either a clerical error or the receiving party isn't in our system." Both explanations are concerning.`;
        addJournal('investigation', 'Evidence delivery gap confirmed — receiving party unknown or unlisted', `shir-luneth-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Khalis Coilspire's Arcane Market Counter tracks all arcane material imports — suppression compound precursors have been flowing through Shirshal under false material classifications.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining arcane material import classifications');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_khalis_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Khalis has been filing inconsistency reports for months. The material profiles match resonance damping precursors but are logged as ceremonial incense components. He flags every one. The flags are consistently cleared by a Bureau override code he has never traced to a specific officer.`;
        addJournal('investigation', 'Arcane precursors misclassified as ceremonial — Bureau override clears all flags', `shir-khalis-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Khalis checks your credentials against the tariff review authorization list. You are not on it. He logs the inquiry. Your access level is on record.`;
        addJournal('complication', 'Unauthorized tariff review logged — credentials checked', `shir-khalis-fail-${G.dayCount}`);
      } else {
        G.flags.met_khalis_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Khalis confirms unusual material imports with inconsistent classifications. The volume exceeds what ceremonial use would require by a factor of twelve. He has the numbers. He has flagged them. Nothing happened.`;
        addJournal('investigation', 'Arcane import volumes 12x ceremonial threshold — flags ignored', `shir-khalis-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Mirae Coilspire's inn is adjacent to the Bureau — she has been watching investigator patterns for years and knows who doesn't belong on the active roster.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'questioning Mirae Coilspire about Bureau personnel patterns');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_mirae_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Mirae names two individuals who have visited the Bureau monthly for the past year but do not appear on any investigator roster. One matches the Oversight Collegium's known field coordination profile. The other matches the Shelkopolis chapel intermediary description from Vaelis Sunweave's inn.`;
        addJournal('investigation', 'Shirshal inn: Bureau ghost-visitors match Collegium field agent + Shelkopolis intermediary', `shir-mirae-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Mirae has a standing policy: she does not discuss Bureau guests. It's the reason the inn has been open for twenty-three years. She offers you a drink and changes the subject completely.`;
        addJournal('complication', 'Bureau inn confidentiality — policy refusal, no information', `shir-mirae-fail-${G.dayCount}`);
      } else {
        G.flags.met_mirae_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Mirae describes two off-roster Bureau visitors. She cannot name them but provides physical descriptions and the schedule pattern — always on the third day of the ten-day cycle, always before noon, always departing toward the north road.`;
        addJournal('investigation', 'Bureau off-roster visitors on fixed 10-day cycle — north road departures', `shir-mirae-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Sivren Coilspire's Compliance Shrine records petitions — a cluster of compliance petitions from glyph-affected localities were dismissed simultaneously under a single ruling three months ago.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reviewing Compliance Shrine petition dismissal records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_sivren_coilspire = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Seven glyph-impact petitions from Shelkopolis, Panim Haven, and Fairhaven were all dismissed simultaneously under a Collegium override ruling. The ruling was issued without standard review period. The dismissal date is two weeks before the suppression compound commissioning date Thalen Sunweave identified. The order of events inverts the official story.`;
        addJournal('investigation', 'Collegium override dismissed 7 glyph petitions before commission — inverts official timeline', `shir-sivren-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The petition records are sealed under a Collegium ruling. Your request to access them constitutes a compliance violation. A formal notice is issued against your investigative standing.`;
        addJournal('complication', 'Petition records sealed — compliance violation notice issued', `shir-sivren-fail-${G.dayCount}`);
      } else {
        G.flags.met_sivren_coilspire = true;
        G.investigationProgress++;
        G.lastResult = `Sivren confirms the mass dismissal ruling. Seven petitions, one ruling, no standard review. The ruling reference number belongs to a Collegium administrative category she has never seen applied to petitions before.`;
        addJournal('investigation', 'Mass petition dismissal via unusual Collegium category — no standard review', `shir-sivren-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Shirshal finale — Tazren's suppressed case file and the compliance record inversion confirm coordinated evidence management. Present to the Bureau director or route around it.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 110,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(110, 'Shirshal Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Shirshal investigation requires more evidence corroboration before acting.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You present the combined evidence chain to the Bureau Director directly, bypassing Tazren's former supervisors. The Director opens a priority review. The suppressed case is reinstated. The operation's evidence trail is now on formal Bureau record. Stage III opens with Bureau institutional backing.`;
        addJournal('investigation', 'Shirshal S2 finale: Bureau Director reinstates suppressed case', `shir-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You copy Tazren's case file and route it through the Verdant Row network before the Bureau can suppress it again. The compliance record inversion goes to every investigative contact you have. The operation loses its institutional cover.`;
        addJournal('investigation', 'Shirshal S2 finale: case file distributed through Verdant Row', `shir-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];
