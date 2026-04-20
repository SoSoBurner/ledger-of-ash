/**
 * SUNSPIRE HAVEN STAGE 2 ENRICHED CHOICES
 * Investigation arc: northern convoy route staging / magical knowledge registry suppression
 * NPCs: Elyra Mossbane (Patron of Forests), Kael Emberthrone (Machinery Overseer),
 *       Orvak Strone (Trade Adjudicator), Jorva Helmrune (Communal Responsibility),
 *       Taldan Veyst (Magical Knowledge Overseer)
 */

const SUNSPIRE_HAVEN_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Taldan Veyst's Knowledge Registry has been receiving requests to suppress glyph research documentation — the suppression requests cite a non-existent regulatory authority.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'investigating knowledge suppression requests with Taldan Veyst');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Taldan has kept every suppression request on file precisely because the cited regulatory authority — "Northern Glyph Oversight Commission" — does not exist. Fourteen requests over six months. Each request targeted documentation that would help someone understand how to counter glyph pressure engineering. The pattern is censorship of countermeasures.`;
        addJournal('investigation', 'Sunspire: 14 suppression requests from fake authority — targeting glyph countermeasure documentation', `sun-taldan-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Taldan treats your inquiry as a potential additional suppression attempt. He records your visit and forwards a summary to his supervisory chain before engaging further.`;
        addJournal('complication', 'Knowledge Registry visit logged as potential suppression inquiry', `sun-taldan-fail-${G.dayCount}`);
      } else {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.lastResult = `Taldan confirms multiple suppression requests from an unverified authority. He has not complied with any of them. "An authority I cannot verify in three major legal registers is not an authority."`;
        addJournal('investigation', 'Suppression requests from unverified authority — Taldan declined compliance', `sun-taldan-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Kael Emberthrone's machinery oversight records show unusual requisitions for convoy modification equipment — the modifications match descriptions of suppression compound transport containers.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining convoy modification requisitions with Kael Emberthrone');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_kael_emberthrone = true;
        G.investigationProgress++;
        G.lastResult = `Kael's requisition records show custom-built container insulation equipment — specifically designed to mask chemical compound signatures during standard cargo inspection. The work was commissioned by a party using the same sealed charter reference that appears throughout the investigation. Sunspire's convoy infrastructure was used as a modification workshop for the transport containers.`;
        addJournal('investigation', 'Sunspire convoy workshop used to build inspection-masking container insulation — same charter ref', `sun-kael-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kael's machinery logs are protected under convoy commercial confidentiality. His legal standing requires him to decline without a formal override order.`;
        addJournal('complication', 'Convoy machinery logs — commercial confidentiality block', `sun-kael-fail-${G.dayCount}`);
      } else {
        G.flags.met_kael_emberthrone = true;
        G.investigationProgress++;
        G.lastResult = `Kael confirms unusual container modification work. "Insulation spec was unusual — not temperature, more like signal damping. Not standard convoy equipment."`;
        addJournal('investigation', 'Signal-damping container insulation produced at Sunspire — not standard equipment', `sun-kael-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Orvak Strone adjudicates unauthorized trade disputes — a dispute over payment for the container modification work reveals the commissioning party's documentation.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining container commission dispute with Orvak Strone');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_orvak_strone = true;
        G.investigationProgress++;
        G.lastResult = `The dispute documentation includes the original commissioning party's contact reference — a specific charter subsidiary code that matches the sealed charter buyer identified by Thalen Sunweave in Fairhaven. The commissioning party is now in default on the final payment. Orvak provides the full documentation to support the adjudication.`;
        addJournal('investigation', 'Container commission dispute reveals charter subsidiary code — matches Fairhaven suppression buyer', `sun-orvak-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Orvak's adjudication is confidential until formally concluded. Your interest in the proceedings is logged and forwarded to both disputing parties.`;
        addJournal('complication', 'Trade adjudication confidential — interest logged, parties notified', `sun-orvak-fail-${G.dayCount}`);
      } else {
        G.flags.met_orvak_strone = true;
        G.investigationProgress++;
        G.lastResult = `Orvak confirms the commissioning party reference is a subsidiary charter entity. He can confirm it was used to commission the work but cannot identify the ultimate principal without a compliance investigation order.`;
        addJournal('investigation', 'Charter subsidiary confirmed as commissioning party — principal identification requires formal order', `sun-orvak-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Elyra Mossbane's Patron of Forests and Plains role gives her a regional ecological overview — glyph surges have been disrupting local wildlife migration in a pattern she has tracked for four months.",
    tags: ['NPC', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'reviewing ecological glyph impact data with Elyra Mossbane');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_elyra_mossbane_sun = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Elyra's ecological records show wildlife migration corridors shifting northwest across all species in the region. The shift began four months ago and aligns precisely with the modification of the Watchers Perch cave. The glyph pressure gradient is physically displacing the natural world around it — and driving creatures toward the northwest, toward the staging location.`;
        addJournal('investigation', 'Wildlife migration shifted northwest — glyph gradient displaces ecosystems toward staging location', `sun-elyra-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Elyra is protective of her ecological records. She interprets your interest in the wildlife data as potential exploitation of migration patterns. She declines to share the data without a patron-family endorsement.`;
        addJournal('complication', 'Patron ecological records — endorsement required for access', `sun-elyra-fail-${G.dayCount}`);
      } else {
        G.flags.met_elyra_mossbane_sun = true;
        G.investigationProgress++;
        G.lastResult = `Elyra confirms abnormal migration patterns. "Every indicator species has shifted northwest in the past four months. Something in the pressure gradient is wrong." She has been filing reports. No response.`;
        addJournal('investigation', 'Abnormal northwest migration — pressure gradient anomaly, unreported', `sun-elyra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Jorva Helmrune's communal responsibility enforcement covers supply chain integrity — a community member filed a report about convoy handlers receiving payments from an external party.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'reviewing convoy handler payment report with Jorva Helmrune');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_jorva_helmrune_sun = true;
        G.investigationProgress++;
        G.lastResult = `The payment report identifies three convoy handlers who received gold payments from a representative presenting sealed charter documentation. The payments were made immediately after the container modification work was completed. The charter documentation description matches across every thread of the investigation.`;
        addJournal('investigation', 'Convoy handler payments from charter-documented party — post-modification completion timing', `sun-jorva-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The responsibility report is under communal council review and cannot be accessed by external parties before the review is completed.`;
        addJournal('complication', 'Communal responsibility report under council review — external access blocked', `sun-jorva-fail-${G.dayCount}`);
      } else {
        G.flags.met_jorva_helmrune_sun = true;
        G.investigationProgress++;
        G.lastResult = `Jorva confirms external payments to convoy handlers. The documentation used by the payer was described as "sealed official charter." The handlers have not been forthcoming about what the work entailed.`;
        addJournal('investigation', 'External charter payments to convoy handlers — work nature undisclosed', `sun-jorva-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Sunspire Haven finale — the convoy modification workshop and knowledge suppression campaign confirm Sunspire as an operation infrastructure node. Shut it down formally or neutralize it quietly.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 104,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(104, 'Sunspire Haven Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Sunspire Haven investigation needs more evidence before acting.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You file the knowledge suppression evidence and the convoy modification records with the Sunspire Patron-Family council. The council suspends the charter subsidiary's operational access and refers the matter to Roadwarden oversight. Stage III opens with Patron-Family institutional backing.`;
        addJournal('investigation', 'Sunspire S2 finale: Patron-Family council suspends charter subsidiary access', `sun-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You release the suppression request list and the container modification specs to Taldan Veyst for open publication. The Knowledge Registry publishes the suppressed countermeasure documentation immediately. Every affected locality receives the technical information they were denied.`;
        addJournal('investigation', 'Sunspire S2 finale: suppressed countermeasure docs published via Knowledge Registry', `sun-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];
