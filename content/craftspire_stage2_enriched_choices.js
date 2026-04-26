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
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_jorin_ledgermere = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The specialty chemical inputs appear in the ledger but have no purchase order trail. Jorin traced them backward: they arrive with the monthly container deliveries that bypass standard intake, carried under the same guild charter exemption Sable Ledgermere identified in Guildheart Hub. Craftspire's material ledger is being used to launder the chemical supply chain — giving the compounds a legitimate craft origin on paper.`;
        addJournal('Craftspire ledger laundering chemical supply chain — craft origin paper trail created', 'evidence', `craft-jorin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The ledger access desk has a dividing line built into the intake form: materials with purchase orders on the left, materials without on the right. Jorin's access covers the left column only. Items without purchase orders sit in a separate oversight category with a different authorization chain — one that routes above the Material Ledger Office entirely. The inquiry is logged and referred upward. The referral goes nowhere visible from here.`;
        addJournal('No-PO ledger items referred to inaccessible oversight category', 'complication', `craft-jorin-fail-${G.dayCount}`);
      } else {
        G.flags.met_jorin_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Jorin opens the ledger to a tabbed section near the back — the tabs are worn down to paper, worked and reworked. "Four months. The inputs appear in the intake log, they get allocated, they get used. But there's no purchase order upstream. No vendor, no delivery note, no charter authorization." He sets his pen down. His reconciliation attempts are stacked in a tray to the left of the desk: filed, dated, unanswered.`;
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


      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_tess_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Tess has logged six after-hours operations over four months. The workshops involved are all registered to a single craft entity that she cannot find in any active trade registration — another ghost entity using the same operational pattern as the Northern Provision Compact. Craftspire hosts a ghost workshop front for the final production stage of the suppression compounds.`;
        addJournal('Ghost workshop entity in Craftspire — final production stage for suppression compounds', 'evidence', `craft-tess-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A lamp bracket near the Night-Lantern station has been bent outward at an angle that blocks the lantern's reach down the service corridor — Tess points to it without comment. Three months ago she filed a report on the after-hours activity. The report came back stamped as a routine workshop overtime variance. The reclassification was signed by an inspector she doesn't recognize. Without someone carrying formal authority, the flag stays buried under the administrative ruling.`;
        addJournal('After-hours report reclassified as routine — Tess unwilling to escalate alone', 'complication', `craft-tess-fail-${G.dayCount}`);
      } else {
        G.flags.met_tess_ledgermere = true;
        G.investigationProgress++;
        G.lastResult = `Tess spreads her circuit log on the inspection table, a narrow ledger with columns for time, lantern position, and observed activity. Six entries are marked with a double tick — her notation for anything requiring follow-up. The materials involved carried an unusual chemical profile: sharp base notes she wrote down but could not cross-reference against anything in the standard craft register. The registered workshop entity listed in her notes does not appear in the trade registry at all.`;
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


      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_copy_warden = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The Copy Warden's records show seven copies of glyph resonance damping formulas reproduced over three months, all citing a Mimolot Academy classification number that Quenra Quillfire confirmed was classified — not released for academic citation. The falsified citations enabled production-scale formula reproduction without triggering copy restriction flags.`;
        addJournal('Formula copies via falsified Mimolot citation — 7 production-scale copies, restricted citation spoofed', 'evidence', `craft-warden-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The intake shelf for academic exemption records sits behind a partition marked with the scholarly copy legitimacy doctrine notice — a dense paragraph of procedural text that ends with the credential requirement in the final line. The clerk behind the partition does not look up. The records are accessible only to parties with formal academic standing, verified through the Collegium registry. The partition stays closed. The records stay behind it.`;
        addJournal('Copy Bureau academic exemption records — academic credential required', 'complication', `craft-warden-fail-${G.dayCount}`);
      } else {
        G.flags.met_copy_warden = true;
        G.investigationProgress++;
        G.lastResult = `The Copy Warden pulls the request log from the current filing shelf — requests are kept in sequence, not archived until month's end. Three entries marked with the Mimolot classification format stand out against the rest. "Classified works don't come through academic exemption. I flagged every one of them." He turns the log to show the notation. Beside each flag is a clearance stamp in a different ink: a Collegium academic affairs code, applied after the fact, overriding the hold.`;
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

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_jorin_ledgermere = true;
        G.flags.jorin_second_pass = true;
        G.investigationProgress++;
        G.lastResult = `Jorin spreads both ledger pages on the balcony table, anchoring the corners with ink blocks. The credit offset is issued monthly under a Collegium administrative charter number — a code Jorin cannot find in any active Collegium registry. It is a dead charter reference that has been recycling credit authorizations for at least two years without triggering audit flags. Jorin's hands stay flat on the table after he points to it, as though pressing the evidence down so it cannot leave.`;
        addJournal('Dead Collegium charter recycling credit authorizations — 2+ years, no audit flags triggered', 'evidence', `craft-jorin2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The second ledger page is already halfway out of the binder when Jorin stops. His thumb is on the charter code column and then it isn't — he folds the page back before the number is visible. A notice on his desk, date-stamped this morning, flags his reconciliation file as under active audit review. He closes the binder and sets it spine-down on the far edge of the desk. "If my files are being watched, I can't be the one handing you what's in them."`;
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

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
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

      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
    label: "A dismissed copyist left a note in the Copy Warden's inbox. Never collected.",
    tags: ['Stage2', 'Lore'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'speaking with the dismissed copyist outside the ghost workshop corridor');
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_dismissed_copyist_sovi = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `Her name is Sovi Maretch, and she folds her work apron with the inside-out method that senior copyists use to protect inked cuffs. She confirms the uncollected note — she put it in the Copy Warden's box six weeks ago after she noticed the panel-frame door in the corridor change its lock hardware overnight. "The lock was standard Copy Bureau issue. In the morning it was ORE-grade friction bar." She wrote it down. Nobody came for it. Her dismissal followed three weeks later on a procedural citation she still cannot identify.`;
        addJournal('Copyist Sovi Maretch: ghost corridor lock upgraded to ORE-grade overnight — dismissal followed report', 'evidence', `craft-sovi-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Sovi looks at you the way people look at approaches they've already survived twice. "Whatever's back there, my name is already in the wrong places." She closes the strap on her materials case and doesn't look up again. The workbench is empty before the hallway clears. She was the last one here who might have talked.`;
        addJournal('Dismissed copyist declined — already implicated, left before further contact', 'complication', `craft-sovi-fail-${G.dayCount}`);
      } else {
        G.flags.met_dismissed_copyist_sovi = true;
        G.investigationProgress++;
        G.lastResult = `Sovi confirms she filed a note about the corridor but won't describe its contents in detail. "I don't know who reads those boxes anymore." She does say the panel-frame door is real, that the lock changed, and that she saw a crate moved through the corridor in broad daylight three months ago by people who wore no workshop insignia. She picks up her case and moves toward the exit without waiting for questions.`;
        addJournal('Dismissed copyist confirms panel-frame door, lock change, uninsiged crate movement', 'intelligence', `craft-sovi-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The dead charter number draws from a Guild Council account someone is keeping alive.",
    tags: ['Stage2', 'Lore'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'tracing the dormant guild account sustaining the dead charter reference');
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.dead_charter_account_traced = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The administrative account number at the base of the charter reference traces to a Guild Council administrative line opened under a dissolved Craftspire ward committee — dissolved nine years ago, but the account closure was never filed. An active account requires at minimum one authorized signatory. The last recorded signatory action on that account was seven weeks ago. The authorization mark is a Council standing-committee seal, used only by the permanent Guild administration. Someone on the standing committee is maintaining the financial lifeline for the ghost entity.`;
        addJournal('Dead charter account: active Guild Council standing-committee signatory — inside permanent administration', 'evidence', `craft-charter-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The account inquiry requires a formal audit request filed through the Guild Council trade registry — a process that sends notification to the account's registered signatory. Jorin points to the clause before you file. Your inquiry would reach the signatory before any response reaches you. The account stays unexamined.`;
        addJournal('Account audit triggers signatory notification — inquiry paused before alerting target', 'complication', `craft-charter-fail-${G.dayCount}`);
      } else {
        G.flags.dead_charter_account_traced = true;
        G.investigationProgress++;
        G.lastResult = `The account is technically active — not closed, not suspended. Jorin traces the authorization path: the last credit draw was co-signed under a Council standing-committee delegation code. He writes the code on a slip and sets it on the desk without looking at it. "Delegation codes at that level are standing-committee members only. That's twelve people." He slides the slip across.`;
        addJournal('Dead charter account authorized by Council standing-committee delegation — 12-person pool of signatories', 'intelligence', `craft-charter-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The certification inspector's unsigned forms are stacked three months deep — her stamp is on the record, but her eyes never were.",
    tags: ['Stage2', 'NPC', 'Investigation'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining unsigned certification forms with the materials inspector');
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.certification_backlog_exposed = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = 'The inspector's tray holds sixty-three unsigned forms. She certified each batch on the master ledger the same day it arrived — but the intake log shows the materials entered the building two hours before the testing lab opened. The certification precedes the test. She looks at the stack without moving. "I sign what the allocation sheet tells me passed." The allocation sheet column for lab technician reads the same initials across three months: a name that does not appear on any active staff roster.';
        addJournal('Certification inspector signing without testing — lab tech initials on forms belong to no active staff member', 'evidence', `craft-inspector-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The inspector stands when you approach her desk, blocking the tray from view with her body. "The certification process is an internal materials function. Queries go through the Materials Compliance Office in writing." She has already moved the tray to the shelf behind her before the sentence ends. The forms stay out of reach. Her name badge faces inward.';
        addJournal('Inspector deflected query — forms moved out of view, written process only', 'complication', `craft-inspector-fail-${G.dayCount}`);
      } else {
        G.flags.certification_backlog_exposed = true;
        G.investigationProgress++;
        G.lastResult = 'She points to the tray without explaining it. The forms are dated daily but the test columns are empty — blank where a result should appear. "Allocation sheets come in certified. I process them certified." She turns back to her desk. The stack is real. The gap between the date stamps and any visible test record is real. She does not say anything else.';
        addJournal('Certification forms show no test results — materials arrive pre-certified via allocation sheet', 'intelligence', `craft-inspector-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A furnace operator runs a shift that the guild roster says does not exist.",
    tags: ['Stage2', 'NPC', 'Investigation'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing the ghost-shift furnace operator and his unlisted wages');
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.ghost_shift_operator_traced = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = 'The furnace operator's name is Dervel. He has worked the pre-dawn shift for eleven months. The guild payroll shows no record of him — but the furnace heat logs show his shift every third night with the precision of someone who runs the same temperature sequence each time. His wages draw from an account flagged in the material ledger as a Collegium operational disbursement. The Collegium does not operate furnaces. Someone is paying Dervel to run a furnace the guild pretends is cold.';
        addJournal('Ghost-shift furnace operator paid from Collegium disbursement account — shift runs every third pre-dawn', 'evidence', `craft-furnace-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The furnace hall at pre-dawn is empty. The heat log clipboard is gone from its bracket. Someone has pulled it within the last hour — the bracket screw is still warm from the friction of removal. Whatever record was there is not here now. The furnace bricks radiate the specific orange-deep heat of a long operational burn. The operator left before you arrived.';
        addJournal('Furnace heat log removed before arrival — operator cleared the scene', 'complication', `craft-furnace-fail-${G.dayCount}`);
      } else {
        G.flags.ghost_shift_operator_traced = true;
        G.investigationProgress++;
        G.lastResult = 'Dervel is at his station when you arrive, but the guild roster clipboard near the entrance does not have his name on any shift line. He does not acknowledge the discrepancy. The heat log on the furnace control panel shows eleven months of consistent entries in the same hand. His tool belt carries a calibration key for a model of regulator not listed in any Craftspire workshop inventory you have seen.';
        addJournal('Ghost-shift furnace operator present but absent from guild roster — non-standard calibration tool observed', 'intelligence', `craft-furnace-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The transit manifest was amended after the shipment left Craftspire — the correction is in different ink.",
    tags: ['Stage2', 'Lore', 'Investigation'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining the amended transit manifest for the redirected precision tools');
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.transit_manifest_amended = true;
        G.investigationProgress++;
        G.lastResult = 'The amendment overwrites the destination with a routing code that resolves to a bonded holding depot outside Craftspire's jurisdiction — a depot whose registration lists a trade entity that shares an administrative address with the ghost workshop. The original destination, barely legible under the correction, is the Guild Council's own precision instruments archive. Someone redirected a tools shipment bound for the Guild's own records office. The amendment ink is Oversight Collegium standard issue.';
        addJournal('Transit manifest amended in Collegium ink — tools redirected from Guild archive to ghost-entity depot', 'evidence', `craft-manifest-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The transit office clerk pulls the manifest copy from the outbound file and holds it at an angle that keeps the amendment line out of your direct view. "Manifest amendments are a carrier-side function. We hold the originating copy. The amended version is with the carrier." The carrier's contact information on the form is a trade post address three localities away. The clerk does not offer to forward an inquiry.';
        addJournal('Transit amendment copy withheld — carrier-side version inaccessible from Craftspire', 'complication', `craft-manifest-fail-${G.dayCount}`);
      } else {
        G.flags.transit_manifest_amended = true;
        G.investigationProgress++;
        G.lastResult = 'The amendment is visible in natural light: darker strokes over lighter ones, the earlier destination still legible at the right margin where the correction did not fully cover it. The new routing code sends the shipment outside Craftspire's trade district. You copy both codes before returning the manifest. The transit clerk does not stop you, but she notes the time of your visit in the access log beside the filing shelf.';
        addJournal('Redirected tools manifest — original destination partially visible under amendment, outside-district routing code copied', 'intelligence', `craft-manifest-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "An auditor's defect report is statistically impossible — no workshop in Craftspire history has cleared this clean.",
    tags: ['Stage2', 'Lore', 'Investigation'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing the quality auditor\'s impossible defect report against historical records');
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.audit_report_impossibility_confirmed = true;
        G.investigationProgress++;
        G.lastResult = 'The defect rate in the report is 0.003 percent across forty-two inspection rounds — a figure that would require every component to arrive pre-graded, pre-selected, and pre-certified before entering the workshop floor. That is not a manufacturing process. It is a documentation process. Comparing the report's component batch codes to the no-PO chemical inputs in Jorin's ledger, three batch codes overlap: the "zero defect" materials are the same materials with no purchase orders. The audit report is covering for unverified inputs by recording them as flawless outputs.';
        addJournal('Impossible audit report: zero-defect batches match no-PO chemical inputs — audit laundering undocumented materials', 'evidence', `craft-audit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The Quality Standards Office keeps historical audit reports behind a certification access barrier — a brass-edged partition with a sign listing the credential classes required to review comparative defect records. Your credential class is not on the list. The clerk behind the partition gestures to a public summary board near the entrance that shows aggregate workshop performance ratings without batch-level detail. The summary shows nothing unusual.';
        addJournal('Historical audit records credential-gated — batch-level comparison unavailable without certification access', 'complication', `craft-audit-fail-${G.dayCount}`);
      } else {
        G.flags.audit_report_impossibility_confirmed = true;
        G.investigationProgress++;
        G.lastResult = 'The historical comparison takes an hour in the reference stacks. Craftspire's workshop defect rates average between 2 and 6 percent across every recorded cycle — the variance is consistent with material quality and operator experience. The report in question shows 0.003 percent. Either this workshop operates at a precision level no Craftspire facility has ever achieved, or the number was chosen rather than measured. You copy the batch codes from the report before the reading room closes.';
        addJournal('Audit defect rate 0.003% — statistically impossible against all Craftspire historical baselines, batch codes copied', 'intelligence', `craft-audit-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A sealed archive predates the current guild charter — and names institutions that were never supposed to exist in Craftspire.",
    tags: ['Stage2', 'Lore', 'Investigation'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'accessing the sealed pre-charter guild correspondence archive');
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sealed_archive_accessed = true;
        G.investigationProgress++;
        G.lastResult = 'The earliest letters address a body called the Craftspire Oversight Collegium Provisional Bureau — a name that does not appear in any public guild founding document. The correspondence discusses material testing exemptions being granted to an unregistered workshop collective, pending formal charter integration that, based on the letters, never occurred. The Bureau apparently continued operating past the charter ratification date under a dormant authorization that was never rescinded. What is now a ghost entity started as an official provisional organ that was officially forgotten rather than officially closed.';
        addJournal('Pre-charter archive: Oversight Collegium Provisional Bureau operated in Craftspire — never closed, became ghost entity', 'evidence', `craft-archive-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The archive box is sealed with a wax impression that carries a guild charter ratification mark — the kind applied when a document collection is formally placed into restricted holding. Breaking the seal without a Records Tribunal order is a guild infraction. The Copy Bureau clerk who brought you this far checks the seal, sets the box back in its slot, and logs the access request as incomplete. The referral goes to the Records Compliance office. You will not hear back quickly.';
        addJournal('Sealed pre-charter archive: wax seal requires Records Tribunal order to break — referral filed', 'complication', `craft-archive-fail-${G.dayCount}`);
      } else {
        G.flags.sealed_archive_accessed = true;
        G.investigationProgress++;
        G.lastResult = 'The seal is cracked at one edge — old damage, not recent. The first visible letter is addressed to a body whose name does not match any guild institution in the current charter. The correspondence references testing exemptions and a provisional workshop authorization. You get three pages before the archivist arrives to close the reading session. The institution name and the exemption reference are in your notes before the box goes back to its shelf.';
        addJournal('Pre-charter letters reference unchartered institution with workshop exemptions — name and authorization language copied', 'intelligence', `craft-archive-partial-${G.dayCount}`);
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
        G.lastResult = `The ledger laundering, the ghost workshop registration, the falsified formula copies — not all three threads are confirmed yet. Bringing a partial case to the Guild Council produces a partial hearing: a clerk takes notes, a sub-committee is tasked to review, and the workshop operation continues behind its panel-frame door. The Council requires a complete evidentiary record before it authorizes enforcement action.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};

      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `The Guild Council chamber is low-ceilinged and smells of old ink and linseed oil from the floor boards. The evidence is laid out in sequence: the no-PO chemical inputs, the ghost entity registration, the falsified Mimolot citations, the dead charter account. The Council's trade enforcement chair reads every page before speaking. Two hours later, the workshop raid order carries all nine signatures. The production facility is shuttered before the evening bell. Stage III opens with full Guild Council enforcement authority behind it.`;
        addJournal('Craftspire S2 finale: Guild Council workshop raid — production facility shut down', 'evidence', `craft-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `Three competing craft guilds have outstanding grievances against unlicensed workshop operations undercutting their registered members. The ghost entity registration and the ledger discrepancy records land on their respective trade deputies' desks before the close of business. No formal Guild Council authorization is needed — the guilds have standing to pursue trade enforcement through their own mechanisms. The panel-frame door comes off its hinges before the week ends, and no oversight committee is asked to approve it.`;
        addJournal('Craftspire S2 finale: ghost workshop exposed to competing guilds — trade enforcement dismantles it', 'evidence', `craft-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The workshop quota board shows production targets no legitimate craft operation could meet.",
    tags: ['Investigation', 'Stage2', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining workshop quota targets against registered capacity');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('wits'):0));
      if (result.isCrit) {
        G.flags.quota_board_discrepancy_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The quota board covers three floors of the ledger balcony, each row a registered workshop entity with its output target for the quarter. One row is set at four times the capacity listed in the guild registry for that workshop — a physical impossibility given the workshop's registered floor space and equipment inventory. The registered inspector's approval mark is at the end of the row. When you locate the same inspector's other quota approvals, all four of the ghost entity's workshop assignments carry the same mark. He approved quotas for a workshop he never visited. The capacity numbers came from somewhere other than the floor.`;
        addJournal('Craftspire quota board: ghost entity workshop approved at 4x registered capacity — same inspector mark across all four ghost assignments', 'evidence', `craft-quota-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The quota board is a working administrative document — the guild floor coordinator intercepts before the relevant row is fully read. Quota records are internal production data, not accessible to unaffiliated review. A notation goes into the access log before you reach the corridor. The coordinator's pen moves quickly; he's practiced at writing descriptions efficiently.`;
        addJournal('Quota board access blocked — access log notation completed', 'complication', `craft-quota-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      } else {
        G.flags.quota_board_discrepancy_found = true;
        G.investigationProgress++;
        G.lastResult = `One row on the lower ledger balcony board runs well above the surrounding entries — output targets that would require continuous operation across registered floor space with no margin for equipment downtime. The inspector approval mark is there. No secondary verification notation. Standard quota approvals at this level require two marks. This row has one. The second mark's absence is either an oversight or it was never submitted for review.`;
        addJournal('Quota board: single-mark approval on oversize ghost workshop target — second mark absent', 'intelligence', `craft-quota-partial-${G.dayCount}`);
        G.recentOutcomeType = 'neutral';
      }
      if (!result.isFumble) G.recentOutcomeType = result.isCrit ? 'success' : 'neutral';
      maybeStageAdvance();
    }
  },

  {
    label: "The copy tower's materials intake log has a category for compounds that no registered copy process uses.",
    tags: ['Archive', 'Stage2', 'Observation'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'cross-checking copy tower materials intake log against registered process categories');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('wits'):0));
      if (result.isCrit) {
        G.flags.copy_tower_intake_anomaly = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The copy tower's materials intake log classifies incoming compounds under eleven standard categories, each corresponding to a registered copy process in the guild's technical charter. A twelfth category appears in the log beginning six months ago — no charter reference, no process code, just a running tally of received volume. The category label is "Specialty Fixative — Exempt." The exempt designation bypasses the intake inspection that all other categories require. Seventeen entries across six months, always arriving in the same delivery window as the no-PO chemical inputs Jorin logged. The copy tower is not copying anything with these compounds. They pass through the intake log and disappear.`;
        addJournal('Copy tower intake log: unlisted exempt category receives compounds matching Jorin no-PO inputs — 17 entries, no process code', 'evidence', `craft-copytower-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The copy tower intake desk operates under a separate administrative charter from the main workshop floor — the clerk on duty cites it immediately when the materials log is requested. Internal intake records are charter-restricted. An access petition routes through the Copy Bureau document director and carries a fourteen-day review window. Filing it announces the question to the director's office before any answer arrives.`;
        addJournal('Copy tower intake access requires charter petition — director notified on filing', 'complication', `craft-copytower-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      } else {
        G.flags.copy_tower_intake_anomaly = true;
        G.investigationProgress++;
        G.lastResult = `The intake log is visible at the public counter — posted daily summaries, not the full intake record. The daily summary shows eleven compound categories with volume totals. A hand has written a running tally in the summary margin for a twelfth category with no printed column. The margin notation begins six months ago. The clerk who posts the summaries writes it in without being asked and without attaching a category name. It appears between two standard entries as if it belongs there.`;
        addJournal('Copy tower daily summary: uncategorized margin tally running 6 months — no label, no process code', 'intelligence', `craft-copytower-partial-${G.dayCount}`);
        G.recentOutcomeType = 'neutral';
      }
      if (!result.isFumble) G.recentOutcomeType = result.isCrit ? 'success' : 'neutral';
      maybeStageAdvance();
    }
  },

  {
    label: "The guild registry's supply chain ledger shows a materials broker who filed a complaint and then withdrew it the same day.",
    tags: ['NPC', 'Stage2', 'Observation'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing withdrawn supply chain complaint in Craftspire guild registry');
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3) + (typeof getEquipmentBonus==='function'?getEquipmentBonus('charm'):0));
      if (result.isCrit) {
        G.flags.supply_broker_complaint_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The broker — a compact woman named Heln Varris who keeps her invoice ledgers in a waxed canvas roll she carries on her belt — filed the complaint at the ninth bell and withdrew it before the second bell the following morning. She is direct about why: someone came to her workshop between those two bells and left a sealed letter with no return address. The letter contained a correct accounting of her remaining supply contracts, her outstanding debts to three specific creditors, and a note explaining that the complaint would make the accounting public. She withdrew the complaint and has not filed anything since. The original complaint described specialty chemical inputs arriving without purchase orders and being redirected to a workshop entity she could not find in the trade registry. She kept a copy of the complaint. It is in the waxed canvas roll on her belt.`;
        addJournal('Supply broker Heln Varris: withdrew complaint after sealed letter with financial leverage — complaint copy retained, describes no-PO compounds and ghost workshop entity', 'evidence', `craft-broker-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The broker's workshop is locked mid-morning — unusual. A neighbor says Heln Varris closed early three days ago and has not reopened. No notice posted. The guild registry shows her license as active and her last compliance filing as current. Her workshop door has a chalk mark on the lower left corner that was not there last week. It is not a Craftspire guild mark.`;
        addJournal('Supply broker workshop closed without notice — door carries unidentified chalk mark', 'complication', `craft-broker-fail-${G.dayCount}`);
        G.recentOutcomeType = 'complication';
      } else {
        G.flags.supply_broker_complaint_found = true;
        G.investigationProgress++;
        G.lastResult = `Heln Varris confirms she filed and withdrew a complaint in the same day. She gives the reason in a single sentence and does not elaborate: "It became clear that filing had costs I hadn't anticipated." She opens the waxed canvas roll slightly — far enough to confirm the papers inside are there, not far enough to show them. "I still have the original. If the situation changes, I have options." She closes the roll and tightens the strap.`;
        addJournal('Supply broker acknowledges complaint and retained copy — declined to produce without changed circumstances', 'intelligence', `craft-broker-partial-${G.dayCount}`);
        G.recentOutcomeType = 'neutral';
      }
      if (!result.isFumble) G.recentOutcomeType = result.isCrit ? 'success' : 'neutral';
      maybeStageAdvance();
    }
  },

];

window.CRAFTSPIRE_STAGE2_ENRICHED_CHOICES = CRAFTSPIRE_STAGE2_ENRICHED_CHOICES;
