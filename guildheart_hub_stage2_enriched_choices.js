/**
 * GUILDHEART HUB STAGE 2 ENRICHED CHOICES
 * Investigation arc: union freight routing / charter-exempt cargo transit
 * NPCs: Cala Ledgermere (Innkeeper), Derris Ledgermere (Market Clerk),
 *       Nyra Ledgermere (Shrine Attendant), Luthen Ledgermere (Porter), Sable Ledgermere (Scribe)
 */

const GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Sable Ledgermere's Archive Scribing Hall contains the union freight charter records — the sealed charter pattern from the suppression investigation appears in three filed exemptions.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'reviewing union freight charter exemptions');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_sable_ledgermere = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Sable has already flagged the three exemptions internally. The sealed charter pattern matches a subsidiary reference she has seen before — it appears in historical guild records from before the Union consolidation, in a Principality of Shelk contract rider that was supposed to have expired. It did not expire. It was quietly renewed.`;
        addJournal('investigation', 'Sealed charter is expired Shelk contract rider — quietly renewed, predates Union consolidation', `guild-sable-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The charter exemptions require a Guild Arbiter review code to access. Your request without one triggers an automatic referral to the Guild Arbiter office. The referral is logged.`;
        addJournal('complication', 'Charter access referral logged — Guild Arbiter office notified', `guild-sable-fail-${G.dayCount}`);
      } else {
        G.flags.met_sable_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Sable confirms three charter exemptions using the unusual pattern. She cannot trace the charter source without more time, but confirms it predates current Union governance. "Old paper with new ink on the renewal line."`;
        addJournal('investigation', 'Pre-Union charter with recent renewal line — old structure, active use', `guild-sable-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Luthen Ledgermere routes freight through the transit yard — three cargo batches under charter exemption were loaded at unusual hours without standard inspection.",
    tags: ['NPC', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'questioning freight porter Luthen Ledgermere');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_luthen_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Luthen describes the loading crews as non-guild — brought in specifically for those three batches. The cargo smelled of sealed chemical compounds. The destination manifests showed a transit point northeast of Ithtananalor that he has never seen used before. He was instructed not to record the loading in his personal shift log.`;
        addJournal('investigation', 'Non-guild crews loaded sealed compounds — unlisted northeast transit point', `guild-luthen-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Luthen stonewalls. "Charter cargo isn't my business to inspect. My job is to move it." He ends the conversation before you can push further.`;
        addJournal('complication', 'Transit yard freight inquiry stonewalled', `guild-luthen-fail-${G.dayCount}`);
      } else {
        G.flags.met_luthen_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Luthen confirms unusual night-loading operations for charter-exempt cargo. The weight profiles were inconsistent with the manifest descriptions. He noted it, filed nothing. "Charter exemption means no questions asked. That's always been the rule."`;
        addJournal('investigation', 'Charter-exempt cargo weight mismatch — no-questions policy cited', `guild-luthen-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Derris Ledgermere at the Tariff Exchange Counter processes every import fee in Guildheart — a category of imports has been systematically zero-rated for eight months.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining systematically zero-rated imports with Derris Ledgermere');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_derris_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `The zero-rated imports are classified as "memorial ceremonial materials" — the same Panim classification Maris Sunweave identified in Fairhaven. The zero-rating was applied retroactively to cover prior imports and then set as a standing exemption. The trade volume is twenty times what any legitimate memorial supply chain would require.`;
        addJournal('investigation', 'Guildheart zero-rated Panim memorial imports — 20x legitimate volume, retroactive exemption', `guild-derris-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Derris checks your tariff review credentials. Finding none, he logs the inquiry as an unauthorized access attempt. The log goes to the Guild Arbiter.`;
        addJournal('complication', 'Tariff inquiry logged as unauthorized — Guild Arbiter notified', `guild-derris-fail-${G.dayCount}`);
      } else {
        G.flags.met_derris_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Derris confirms the zero-rating anomaly. "That category hasn't been reviewed since it was set. Nobody's questioned it." The volume alone should have triggered a standard audit. It hasn't.`;
        addJournal('investigation', 'Zero-rated import category never audited — volume should have triggered review', `guild-derris-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Cala Ledgermere's Guild Quarter Inn hosts traveling trade arbiters — one arbiters has been a regular guest while working on a contract she refuses to identify.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'questioning innkeeper Cala Ledgermere about trade arbiter guests');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_cala_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Cala describes the arbiter in detail. The physical description matches the Iron Compact's known field arbitration profile. The arbiter always meets with the same freight broker — not a Union-registered broker, but someone operating under a provisional registration that has been renewed every month for eight months. The meeting happens the night before charter-exempt cargo loads.`;
        addJournal('investigation', 'Guildheart inn: Iron Compact arbiter meets unregistered broker night before charter loads', `guild-cala-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Cala is professionally protective of her guests. Your questions about a specific arbiter put her on guard. She gives you nothing and marks your table as "to be watched."`;
        addJournal('complication', 'Inn innkeeper protective response — table flagged', `guild-cala-fail-${G.dayCount}`);
      } else {
        G.flags.met_cala_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Cala describes the regular arbiter guest. Always arrives from the east, always leaves northwest. Sealed contract documentation. "She pays well and doesn't cause trouble. But she's not here to arbitrate anything I've ever seen come through proper channels."`;
        addJournal('investigation', 'Regular off-channel arbiter: east arrival, northwest departure', `guild-cala-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Nyra Ledgermere's Guild Shrine Alcove serves as neutral meeting ground — she has witnessed two conversations between parties who should not know each other.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'speaking with shrine attendant Nyra Ledgermere');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_nyra_ledgermere = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Nyra witnessed a meeting between a Shelkopolis Roadwarden captain and an Oversight Collegium representative. The Roadwarden was not Captain Windrider. The Collegium representative presented a document. The Roadwarden signed it. Nyra does not know what the document was, but the shrine's neutrality principle meant she could not intervene.`;
        addJournal('investigation', 'Shrine meeting: non-Windrider Roadwarden signed Collegium document — witnessed', `guild-nyra-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Nyra invokes shrine confidentiality. The alcove's neutrality principle prevents her from testifying about meetings witnessed there. She apologizes but will not bend.`;
        addJournal('complication', 'Shrine confidentiality invoked — witness testimony refused', `guild-nyra-fail-${G.dayCount}`);
      } else {
        G.flags.met_nyra_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Nyra confirms a meeting between parties from different institutions — she describes their insignia without naming parties. A document exchange occurred. Both left separately. The timing matches the period when the charter exemptions were filed.`;
        addJournal('investigation', 'Shrine document exchange at charter exemption filing time', `guild-nyra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Guildheart Hub finale — the pre-Union charter, zero-rated imports, and shrine document exchange form a complete financing chain. Move through guild channels or route it informally.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 108,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(108, 'Guildheart Hub Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Guildheart investigation requires more corroborating evidence.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You present the financing chain to the Union Guild Council. The Council initiates an immediate charter audit. The pre-Union contract rider is formally voided. The operation loses its financial routing infrastructure. Stage III opens with Union institutional backing.`;
        addJournal('investigation', 'Guildheart S2 finale: Union Guild Council charter audit initiated', `guild-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You route the charter evidence to the Verdant Row network and three competing trade factions simultaneously. The operation's freight routing fractures as multiple parties begin contesting the charter exemptions at once.`;
        addJournal('investigation', 'Guildheart S2 finale: charter evidence distributed to competing factions', `guild-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES = GUILDHEART_HUB_STAGE2_ENRICHED_CHOICES;
