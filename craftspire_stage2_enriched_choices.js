/**
 * CRAFTSPIRE STAGE 2 ENRICHED CHOICES
 * Investigation arc: material ledger discrepancies / counterfeit trade documentation
 * NPCs: Jorin Ledgermere (Ledger Officer), Tess Ledgermere (Night-Lantern Inspector),
 *       Copy Warden (Copy Legitimacy Warden)
 */

const CRAFTSPIRE_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Jorin Ledgermere's Material Ledger Office tracks every craft input — a category of 'specialty chemical inputs' has been appearing in ledgers without corresponding purchase orders.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing specialty chemical input discrepancies with Jorin Ledgermere');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_jorin_ledgermere = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The specialty chemical inputs appear in the ledger but have no purchase order trail. Jorin traced them backward: they arrive with the monthly container deliveries that bypass standard intake, carried under the same guild charter exemption Sable Ledgermere identified in Guildheart Hub. Craftspire's material ledger is being used to launder the chemical supply chain — giving the compounds a legitimate craft origin on paper.`;
        addJournal('investigation', 'Craftspire ledger laundering chemical supply chain — craft origin paper trail created', `craft-jorin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Jorin's ledger review access is limited to materials with purchase orders. Items without purchase orders are classified under a separate oversight category. Your inquiry is referred to that oversight category — which does not have public access.`;
        addJournal('complication', 'No-PO ledger items referred to inaccessible oversight category', `craft-jorin-fail-${G.dayCount}`);
      } else {
        G.flags.met_jorin_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Jorin confirms the purchase-order gap. "I've been trying to reconcile these for four months. The inputs appear, they get used, but there's no upstream source I can trace." His reconciliation attempts have been filed without response.`;
        addJournal('investigation', 'Chemical inputs with no PO trail — 4 months of unanswered reconciliation attempts', `craft-jorin-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Tess Ledgermere's Night-Lantern Circuit monitors workshop activity after hours — she has observed craft workshops operating during restricted hours on materials that match suppression compound components.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reviewing after-hours workshop observations with Tess Ledgermere');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_tess_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Tess has logged six after-hours operations over four months. The workshops involved are all registered to a single craft entity that she cannot find in any active trade registration — another ghost entity using the same operational pattern as the Northern Provision Compact. Craftspire hosts a ghost workshop front for the final production stage of the suppression compounds.`;
        addJournal('investigation', 'Ghost workshop entity in Craftspire — final production stage for suppression compounds', `craft-tess-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tess filed a report on the after-hours activity three months ago. The report was reclassified as a routine workshop overtime variance. She is not willing to escalate further without someone with more authority.`;
        addJournal('complication', 'After-hours report reclassified as routine — Tess unwilling to escalate alone', `craft-tess-fail-${G.dayCount}`);
      } else {
        G.flags.met_tess_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Tess confirms after-hours operations in specific workshops. The materials involved had an unusual chemical profile she noted but could not identify. The registered workshop entity's name does not appear in her standard trade registry.`;
        addJournal('investigation', 'After-hours chemical operations in unregistered workshop entity', `craft-tess-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Copy Warden's Book-Copy Bureau reviews all document reproduction — copies of suppression compound formulas have been reproduced under academic exemption using a falsified Mimolot Academy citation.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing falsified formula copy citations with the Copy Warden');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_copy_warden = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The Copy Warden's records show seven copies of glyph resonance damping formulas reproduced over three months, all citing a Mimolot Academy classification number that Quenra Quillfire confirmed was classified — not released for academic citation. The falsified citations enabled production-scale formula reproduction without triggering copy restriction flags.`;
        addJournal('investigation', 'Formula copies via falsified Mimolot citation — 7 production-scale copies, restricted citation spoofed', `craft-warden-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The Copy Bureau's academic exemption records are protected under scholarly copy legitimacy doctrine. Your request requires a formal academic standing credential.`;
        addJournal('complication', 'Copy Bureau academic exemption records — academic credential required', `craft-warden-fail-${G.dayCount}`);
      } else {
        G.flags.met_copy_warden = true;
        G.investigationProgress++;
        G.lastResult = `The Copy Warden confirms academic exemption copies of formula documents. The Mimolot citation reference is unusual — classified works are rarely cited for open copy reproduction. "I flagged it. The flag was cleared by a Collegium academic affairs code."`;
        addJournal('investigation', 'Formula copies via suspicious Mimolot citation — Collegium academic code cleared flag', `craft-warden-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Craftspire finale — the ghost workshop and ledger laundering confirm Craftspire as the production facility. Raid through guild authority or dismantle the supply chain from below.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 102,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(102, 'Craftspire Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The Craftspire investigation needs more evidence to confirm the production facility.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You present the ledger laundering evidence, the ghost workshop registration, and the falsified formula copies to the Union Guild Council. The Council orders an immediate workshop raid under trade enforcement authority. The production facility is shut down. Stage III opens with Union trade enforcement backing.`;
        addJournal('investigation', 'Craftspire S2 finale: Guild Council workshop raid — production facility shut down', `craft-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You route the ghost entity registration and the ledger discrepancy records to competing craft guilds who have a direct interest in eliminating unlicensed competition. They move on the ghost workshop through trade enforcement mechanisms that do not require formal oversight.`;
        addJournal('investigation', 'Craftspire S2 finale: ghost workshop exposed to competing guilds — trade enforcement dismantles it', `craft-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.CRAFTSPIRE_STAGE2_ENRICHED_CHOICES = CRAFTSPIRE_STAGE2_ENRICHED_CHOICES;
