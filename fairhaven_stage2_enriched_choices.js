/**
 * FAIRHAVEN STAGE 2 ENRICHED CHOICES
 * Investigation arc: glyph-cave pressure / celestial creature coordination, northern route staging
 * NPCs: Naevys Sunweave (Artisan), Serin Sunweave (Cleric), Thalen Sunweave (Alchemist),
 *       Vaelis Sunweave (Innkeeper), Maris Sunweave (Market Clerk)
 */

const FAIRHAVEN_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Thalen Sunweave's alchemist workshop is producing compounds that suppress glyph surge — ask who commissioned the suppression work.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'investigating glyph suppression contracts');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_thalen_sunweave = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Thalen shows you the commission records. The suppression compounds were ordered in bulk quantities six months ago by a buyer identified only through a sealed charter reference — the same subsidiary charter pattern appearing in other investigation threads. The compounds were delivered to a staging location northwest of Fairhaven.`;
        addJournal('investigation', 'Glyph suppression compounds — sealed charter buyer, northwest staging', `fair-thalen-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Thalen is bound by a supplier confidentiality clause and presents the relevant document. The clause was added to his standard contract six months ago. He cannot speak to it without violating the agreement.`;
        addJournal('complication', 'Alchemist confidentiality clause — route blocked', `fair-thalen-fail-${G.dayCount}`);
      } else {
        G.flags.met_thalen_sunweave = true;
        G.investigationProgress++;
        G.lastResult = `Thalen confirms large-scale suppression compound orders. The buyer left no name but the delivery address resolves to a caravan staging point used in the northern route coordination pattern you've been tracking.`;
        addJournal('investigation', 'Suppression compounds link to northern route staging', `fair-thalen-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Serin Sunweave at Felujitas Chapel has been recording celestial creature sightings near Watchers Perch — the sightings correlate with glyph events.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'reviewing celestial creature sighting records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_serin_sunweave = true;
        G.investigationProgress++;
        G.lastResult = `Serin's correlation record is meticulous: every celestial creature sighting at Watchers Perch occurred within 8 hours of a glyph surge event in the region. But the pattern is directional — the creatures appear after the surges, not before. Something is using the surge aftermath as cover. The celestial creatures are either attracted to surge residue or being driven toward it.`;
        addJournal('investigation', 'Celestial sighting post-surge correlation confirmed — directional pattern', `fair-serin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Serin interprets your questions about the sightings as skepticism about their spiritual validity. The conversation closes with a formal citation of Felujitas doctrine on divine observation. No records access.`;
        addJournal('complication', 'Chapel records access refused — doctrinal friction', `fair-serin-fail-${G.dayCount}`);
      } else {
        G.flags.met_serin_sunweave = true;
        G.investigationProgress++;
        G.lastResult = `Serin shares three months of sighting records. The correlation with glyph events is visible to anyone who looks for it. Serin has looked for it and documented it. The records exist because Serin suspected something was wrong before you arrived.`;
        addJournal('investigation', 'Serin sighting records — glyph correlation visible', `fair-serin-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Maris Sunweave's market exchange records show cargo moving through Fairhaven under memorial service manifests — examine the specifics.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'examining Fairhaven market manifests');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_maris_sunweave = true;
        G.investigationProgress++;
        G.lastResult = `Maris has flagged eight manifests in her personal records. All arrive under Panim memorial service classification but contain materials that memorial services do not use — specifically the glyph suppression compounds Thalen was commissioned to produce. The manifests connect Fairhaven to the same northern route staging operation.`;
        addJournal('investigation', 'Fairhaven manifests connect to Panim memorial cover and suppression compounds', `fair-maris-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your manifest review request triggers a market audit protocol. The audit replaces your access with a formal review process that will take weeks and excludes investigative access.`;
        addJournal('complication', 'Market audit triggered — access replaced', `fair-maris-fail-${G.dayCount}`);
      } else {
        G.flags.met_maris_sunweave = true;
        G.investigationProgress++;
        G.lastResult = `Maris confirms unusual memorial manifests. She cannot confirm what they actually contain. "Weight profiles don't match memorial service material standards. I've been noting it for four months."`;
        addJournal('investigation', 'Manifest weight irregularities — four months of noting', `fair-maris-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Vaelis Sunweave's inn sees every suspicious traveler passing through Fairhaven — three specific guests have appeared three times each in the past month.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'questioning Vaelis Sunweave innkeeper');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_vaelis_sunweave = true;
        G.investigationProgress++;
        G.lastResult = `Vaelis names one of the three guests by a description that matches the chapel intermediary pattern from Shelkopolis. The guest always arrives from the north and leaves south. Always after 10 PM. Always with sealed documentation that bypasses the standard guest register entry. Someone has arranged for this guest to be invisible in the formal records.`;
        addJournal('investigation', 'Fairhaven inn — Shelkopolis chapel intermediary cross-identified', `fair-vaelis-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Vaelis has been warned by a specific guest to report inquiries to a contact address. She files the report as instructed. You've been reported to an unknown party.`;
        addJournal('complication', 'Inn report filed with unknown party — player compromised', `fair-vaelis-fail-${G.dayCount}`);
      } else {
        G.flags.met_vaelis_sunweave = true;
        G.investigationProgress++;
        G.lastResult = `Vaelis describes three unusual regular guests without names. The patterns are consistent: northern arrivals, southern departures, sealed documentation. The cycle repeats every 10-12 days.`;
        addJournal('investigation', 'Fairhaven inn — northern courier cycle confirmed', `fair-vaelis-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The glyph cave pressure at Watchers Perch has been deliberately modified — examine the cave entrance for evidence of external intervention.",
    tags: ['Survival', 'Investigation', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'examining Watchers Perch glyph cave');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The cave entrance shows tool marks and glyph inscription modifications that are months old and not consistent with natural cave formation. The modifications were made to increase the cave's pressure output at specific tidal cycles — matching the glyph surge dates in Shelkopolis. Someone engineered the surges from here.`;
        addJournal('investigation', 'Watchers Perch cave modified — engineered surges confirmed', `fair-cave-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `You trigger a residual glyph pressure release during the examination. The surge is small but visible from the market district. Your presence at the cave is now known.`;
        addJournal('complication', 'Glyph pressure release — presence at cave known', `fair-cave-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Tool marks are present but inconclusive as to age and purpose. The cave shows evidence of recent human activity. A specialist in glyph architecture could interpret the markings more precisely.`;
        addJournal('investigation', 'Cave tool marks — human activity confirmed, interpretation limited', `fair-cave-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Fairhaven finale — the northern route staging location is identified. Act now or wait for more certainty.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 108,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(108, 'Fairhaven Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Fairhaven investigation needs more evidence before the staging location can be confirmed and acted upon.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You file a formal investigative report naming the northwest staging location with the Roadwarden Fairhaven post. The post confirms the location and requests Shelkopolis command authorization to proceed. The operation is visible. Stage III opens with full Roadwarden backing.`;
        addJournal('investigation', 'Fairhaven S2 finale: Roadwarden formal report filed', `fair-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You relay the staging location to the Verdant Row network and the alchemist contact before the Roadwardens. The informal circuit moves first. By the time official channels act, the operation has already been disrupted.`;
        addJournal('investigation', 'Fairhaven S2 finale: informal network first-mover', `fair-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.FAIRHAVEN_STAGE2_ENRICHED_CHOICES = FAIRHAVEN_STAGE2_ENRICHED_CHOICES;
