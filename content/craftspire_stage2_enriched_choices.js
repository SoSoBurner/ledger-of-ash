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
        addJournal('Craftspire ledger laundering chemical supply chain — craft origin paper trail created', 'evidence', `craft-jorin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Jorin's ledger review access is limited to materials with purchase orders. Items without purchase orders are classified under a separate oversight category. Your inquiry is referred to that oversight category — which does not have public access.`;
        addJournal('No-PO ledger items referred to inaccessible oversight category', 'complication', `craft-jorin-fail-${G.dayCount}`);
      } else {
        G.flags.met_jorin_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Jorin confirms the purchase-order gap. "I've been trying to reconcile these for four months. The inputs appear, they get used, but there's no upstream source I can trace." His reconciliation attempts have been filed without response.`;
        addJournal('Chemical inputs with no PO trail — 4 months of unanswered reconciliation attempts', 'evidence', `craft-jorin-partial-${G.dayCount}`);
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
        addJournal('Ghost workshop entity in Craftspire — final production stage for suppression compounds', 'evidence', `craft-tess-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tess filed a report on the after-hours activity three months ago. The report was reclassified as a routine workshop overtime variance. She is not willing to escalate further without someone with more authority.`;
        addJournal('After-hours report reclassified as routine — Tess unwilling to escalate alone', 'complication', `craft-tess-fail-${G.dayCount}`);
      } else {
        G.flags.met_tess_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Tess confirms after-hours operations in specific workshops. The materials involved had an unusual chemical profile she noted but could not identify. The registered workshop entity's name does not appear in her standard trade registry.`;
        addJournal('After-hours chemical operations in unregistered workshop entity', 'evidence', `craft-tess-partial-${G.dayCount}`);
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
        addJournal('Formula copies via falsified Mimolot citation — 7 production-scale copies, restricted citation spoofed', 'evidence', `craft-warden-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The Copy Bureau's academic exemption records are protected under scholarly copy legitimacy doctrine. Your request requires a formal academic standing credential.`;
        addJournal('Copy Bureau academic exemption records — academic credential required', 'complication', `craft-warden-fail-${G.dayCount}`);
      } else {
        G.flags.met_copy_warden = true;
        G.investigationProgress++;
        G.lastResult = `The Copy Warden confirms academic exemption copies of formula documents. The Mimolot citation reference is unusual — classified works are rarely cited for open copy reproduction. "I flagged it. The flag was cleared by a Collegium academic affairs code."`;
        addJournal('Formula copies via suspicious Mimolot citation — Collegium academic code cleared flag', 'evidence', `craft-warden-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Jorin Ledgermere has found a second ledger anomaly — a recurring materials credit issued by a Collegium-adjacent trade office that offsets the no-PO chemical inputs. He's willing to share it, but only if you help him formalize the record trail before it disappears.",
    tags: ['Stage2', 'NPC', 'Escalation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'tracing Collegium credit offset with Jorin Ledgermere');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_jorin_ledgermere = true;
        G.flags.jorin_second_pass = true;
        G.investigationProgress++;
        G.lastResult = `Jorin spreads both ledger pages on the balcony table, anchoring the corners with ink blocks. The credit offset is issued monthly under a Collegium administrative charter number — a code Jorin cannot find in any active Collegium registry. It is a dead charter reference that has been recycling credit authorizations for at least two years without triggering audit flags. Jorin's hands stay flat on the table after he points to it, as though pressing the evidence down so it cannot leave.`;
        addJournal('Dead Collegium charter recycling credit authorizations — 2+ years, no audit flags triggered', 'evidence', `craft-jorin2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Jorin pulls the second ledger page just before you can read the charter code. Someone has already flagged his reconciliation file as under active audit review. He folds the page back into the binder. "If I'm being watched, I can't help you further."`;
        addJournal('Jorin placed under audit review — second ledger access lost', 'complication', `craft-jorin2-fail-${G.dayCount}`);
      } else {
        G.flags.met_jorin_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Jorin shows the credit offset line by line. The Collegium charter number is unfamiliar — not a format he recognizes from standard institutional accounts. He copies the reference string onto a separate slip of paper and slides it across without comment, keeping his eyes on the ledger page rather than on you.`;
        addJournal('Unrecognized Collegium charter format used for chemical input credits', 'evidence', `craft-jorin2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A ghost workshop entity has begun moving unmarked crates through a service corridor connecting two licensed workhouses — the same corridor Tess flagged. Reaching the transfer point means crossing active workshop boundaries without triggering the floor inspectors.",
    tags: ['Stage2', 'Stealth', 'Environmental'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'tracking ghost workshop crate transfer through service corridor');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.ghost_workshop_crates_witnessed = true;
        G.investigationProgress++;
        G.lastResult = `The crates are stenciled with a materials broker mark that belongs to a dissolved trade house — dissolved three years ago, but the mark is fresh ink on raw pine. Two porters move the stack into a rear bay where the wall has been fitted with a panel-frame door that does not appear on any workshop layout you have seen. One crate is left ajar. Inside: sealed ceramic amphorae, the same profile as the compound containers in Tess's observation log.`;
        addJournal('Ghost workshop crates — dissolved broker mark in fresh ink, ceramic amphorae matching compound containers', 'evidence', `craft-ghost-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `A floor inspector intercepts you at the boundary marker between workhouses. The corridor is listed as bonded transit space — entry without a materials pass is a copy-right infringement under Craftspire transit code. The inspector records your name and work-affiliation before escorting you back to the public lane.`;
        addJournal('Intercepted in bonded transit corridor — name recorded by floor inspector', 'complication', `craft-ghost-fail-${G.dayCount}`);
      } else {
        G.flags.ghost_workshop_crates_witnessed = true;
        G.investigationProgress++;
        G.lastResult = `You reach the service corridor before the transfer completes. The crates are stenciled with a broker mark but you cannot get close enough to read the full code before the porters close the bay. What you catch is the smell — sharp chemical base notes that do not match any standard craft materials. The panel-frame door seals without a visible latch.`;
        addJournal('Ghost workshop transfer — sealed bay, unidentified chemical odor, broker mark partially observed', 'intelligence', `craft-ghost-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A queue dispute at a Copy Bureau intake desk has drawn a crowd. An artisan is blocking the window, insisting a commissioned work was copied without authorization. The Copy Warden is not present. Workshop staff are watching to see how outsiders read the room.",
    tags: ['Stage2', 'Social', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'navigating copy queue dispute at the Copy Bureau');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.copy_bureau_social_standing = true;
        G.investigationProgress++;
        G.lastResult = `You cite the copy-right infringement filing process from the Union tariff register — chapter and clause — and the artisan's posture shifts from confrontational to calculating. The intake clerk nods once. The queue moves. Three copyists near the back of the room clock your knowledge of procedure and remember your face. When the Copy Warden returns, the clerk mentions you by description before anyone else speaks.`;
        addJournal('Copy Bureau queue dispute resolved by citation — Copy Warden notified, standing established', 'contact_made', `craft-social-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Your intervention reads as an outsider overstepping workshop floor protocol. The artisan turns from the clerk to address you directly: "Queue order is not your concern unless you're filing." The crowd agrees, visibly. The intake clerk resumes the original dispute and the Copy Bureau staff file you as someone who does not understand Craftspire's governing rhythms.`;
        addJournal('Copy Bureau social misstep — outsider status confirmed, workshop floor credibility lost', 'complication', `craft-social-fail-${G.dayCount}`);
      } else {
        G.flags.copy_bureau_social_standing = true;
        G.investigationProgress++;
        G.lastResult = `The dispute de-escalates without resolution — the artisan steps back from the window, the queue moves, and the broader argument goes unaddressed. The intake clerk gives you a brief look that carries more acknowledgment than dismissal. One of the watching copyists pauses near the exit and tells you the Copy Warden's inspection rounds run after the second bell.`;
        addJournal('Copy Bureau queue intervention — partial standing, Copy Warden schedule obtained', 'intelligence', `craft-social-partial-${G.dayCount}`);
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
        addJournal('Craftspire S2 finale: Guild Council workshop raid — production facility shut down', 'evidence', `craft-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You route the ghost entity registration and the ledger discrepancy records to competing craft guilds who have a direct interest in eliminating unlicensed competition. They move on the ghost workshop through trade enforcement mechanisms that do not require formal oversight.`;
        addJournal('Craftspire S2 finale: ghost workshop exposed to competing guilds — trade enforcement dismantles it', 'evidence', `craft-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.CRAFTSPIRE_STAGE2_ENRICHED_CHOICES = CRAFTSPIRE_STAGE2_ENRICHED_CHOICES;
