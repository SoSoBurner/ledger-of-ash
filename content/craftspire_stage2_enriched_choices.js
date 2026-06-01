/**
 * CRAFTSPIRE STAGE 2 ENRICHED CHOICES
 * Investigation arc: material ledger discrepancies / counterfeit trade documentation
 * NPCs: Jorin Ledgermere (Ledger Officer), Tess Ledgermere (Night-Lantern Inspector),
 *       Copy Warden (Copy Legitimacy Warden)
 */

var CRAFTSPIRE_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Specialty chemical inputs appear in the ledgers. No purchase orders exist for them.",
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
    label: "Workshops operating after hours on materials that match suppression compound components.",
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
        G.lastResult = `Tess spreads her circuit log on the inspection table, a narrow ledger with columns for time, lantern position, and observed activity. Six entries are marked with a double tick — her notation for anything requiring follow-up. The materials involved carried an unusual chemical profile: sharp base notes cutting through the forge-heat and sawdust smell of the surrounding workshops, compounds she wrote down but could not cross-reference against anything in the standard craft register. The registered workshop entity listed in her notes does not appear in the trade registry at all.`;
        addJournal('After-hours chemical operations in unregistered workshop entity', 'evidence', `craft-tess-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Formula copies reproduced under academic exemption. The Mimolot citation is falsified.",
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
        G.lastResult = `The Copy Warden's records show seven copies of glyph resonance damping formulas reproduced over three months, all citing a Mimolot Academy classification number that Quenra Quillfire confirmed was classified — not released for academic citation. The Warden's copy desk smells of fresh ink and the faint soldering flux carried on the air from the adjoining workshop vault. The falsified citations enabled production-scale formula reproduction without triggering copy restriction flags. Seven copies, each stamped through cleanly under a number that should have locked the request on arrival.`;
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
    label: "A recurring Collegium credit offsets the no-PO inputs. The record trail is disappearing.",
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
        G.lastResult = `Jorin shows the credit offset line by line. The Collegium charter number is unfamiliar — not a format he recognizes from standard institutional accounts. The ledger balcony is warm from the forge ventilation shafts below; the smell of hot metal rises faintly through the grate beside his desk. He copies the reference string onto a separate slip of paper and slides it across without comment, keeping his eyes on the ledger page. The reference string is eleven characters. None of the standard Collegium account prefixes match.`;
        addJournal('Unrecognized Collegium charter format used for chemical input credits', 'evidence', `craft-jorin2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Unmarked crates moving through the corridor Tess flagged. The floor inspectors can't see it.",
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
        G.lastResult = `The service corridor runs narrow between two workshop walls, the stone overhead black with lamp oil smoke deposited over years of near-capacity operation. The crates are stenciled with a broker mark but the porters close the bay before the full code is readable. What carries through is the smell — sharp chemical base notes over pine resin, nothing that matches any standard craft material category. The panel-frame door seals flush into the wall with no visible latch or hinge on the corridor side.`;
        addJournal('Ghost workshop transfer — sealed bay, unidentified chemical odor, broker mark partially observed', 'intelligence', `craft-ghost-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "An artisan blocks the copy window. A crowd is watching. The Warden isn't here yet.",
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
        G.lastResult = `The intervention reads as an outsider overstepping workshop floor protocol. The artisan turns from the clerk to address you directly: "Queue order is not your concern unless you're filing." The crowd agrees, visibly — a low murmur carries toward the copy windows, where the smell of fresh binding wax and lamp oil hangs thick from the morning's work. The intake clerk resumes the original dispute. The Copy Bureau staff file you as someone who does not understand Craftspire's governing rhythms, which are older than anyone in this room.`;
        addJournal('Copy Bureau social misstep — outsider status confirmed, workshop floor credibility lost', 'complication', `craft-social-fail-${G.dayCount}`);
      } else {
        G.flags.copy_bureau_social_standing = true;
        G.investigationProgress++;
        G.lastResult = `The dispute de-escalates without resolution — the artisan steps back from the window, the queue moves, and the broader argument goes unaddressed. The Copy Bureau's intake room settles back into its working noise: the dry scrape of certification forms, the knock of the stamp rack, the faint smell of binding wax and lamp oil from the copy benches beyond the partition. The intake clerk gives you a look that carries more acknowledgment than dismissal. One of the watching copyists pauses near the exit and tells you the Copy Warden's inspection rounds run after the second bell.`;
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
        G.lastResult = `Sovi looks at you the way people look at approaches they've already survived twice. "Whatever's back there, my name is already in the wrong places." She closes the strap on her materials case — worn canvas, ink-stained at the corner from years on the copy floor — and doesn't look up again. The hallway carries the standard Craftspire smell: sawdust and lacquer from the joinery district, hot stone from the venting shafts. The workbench is empty before the hallway clears. She was the last one here who might have talked.`;
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
        G.lastResult = `The account inquiry requires a formal audit request filed through the Guild Council trade registry — a process that sends notification to the account's registered signatory the same day the request is logged. Jorin points to the relevant clause in the Guild certification handbook before you file, his thumb on the line that specifies mandatory notification. The ledger balcony overhead carries the faint smell of hot metal from the forge vents; the sound of tool-grinding from the lower floor fills the silence while the clause is read. Your inquiry would reach the signatory before any response could reach you. The account stays unexamined.`;
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
    label: "Three months of unsigned forms. Her stamp is on them. Her eyes weren't.",
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
        G.lastResult = `The inspector's tray holds sixty-three unsigned forms. She certified each batch on the master ledger the same day it arrived — but the intake log shows the materials entered the building two hours before the testing lab opened. The certification precedes the test. She looks at the stack without moving. "I sign what the allocation sheet tells me passed." The allocation sheet column for lab technician reads the same initials across three months: a name that does not appear on any active staff roster.`;
        addJournal('Certification inspector signing without testing — lab tech initials on forms belong to no active staff member', 'evidence', `craft-inspector-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The inspector stands when you approach her desk, blocking the tray from view with her body. "The certification process is an internal materials function. Queries go through the Materials Compliance Office in writing." She has already moved the tray to the shelf behind her before the sentence ends. The forms stay out of reach. Her name badge faces inward.';
        addJournal('Inspector deflected query — forms moved out of view, written process only', 'complication', `craft-inspector-fail-${G.dayCount}`);
      } else {
        G.flags.certification_backlog_exposed = true;
        G.investigationProgress++;
        G.lastResult = 'She points to the tray without explaining it. The forms are dated daily but the test columns are empty — blank where a result should appear. The tray holds the familiar weight of certification paperwork: heavy guild stock, the ink still faintly sharp from the morning stamp run. "Allocation sheets come in certified. I process them certified." She turns back to her desk. The stack is real. The gap between the date stamps and any visible test record is real. She does not say anything else, and the sound of the forge floor carries up through the wall behind her.';
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
        G.lastResult = `The furnace operator's name is Dervel. He has worked the pre-dawn shift for eleven months. The guild payroll shows no record of him — but the furnace heat logs show his shift every third night with the precision of someone who runs the same temperature sequence each time. His wages draw from an account flagged in the material ledger as a Collegium operational disbursement. The Collegium does not operate furnaces. Someone is paying Dervel to run a furnace the guild pretends is cold.`;
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
    label: "The manifest was amended after the shipment left. The correction is in different ink.",
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
        G.lastResult = `The amendment overwrites the destination with a routing code that resolves to a bonded holding depot outside Craftspire's jurisdiction — a depot whose registration lists a trade entity that shares an administrative address with the ghost workshop. The original destination, barely legible under the correction, is the Guild Council's own precision instruments archive. Someone redirected a tools shipment bound for the Guild's own records office. The amendment ink is Oversight Collegium standard issue.`;
        addJournal('Transit manifest amended in Collegium ink — tools redirected from Guild archive to ghost-entity depot', 'evidence', `craft-manifest-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The transit office clerk pulls the manifest copy from the outbound file and holds it at an angle that keeps the amendment line out of your direct view. "Manifest amendments are a carrier-side function. We hold the originating copy. The amended version is with the carrier." The carrier's contact information on the form is a trade post address three localities away. The clerk does not offer to forward an inquiry.`;
        addJournal('Transit amendment copy withheld — carrier-side version inaccessible from Craftspire', 'complication', `craft-manifest-fail-${G.dayCount}`);
      } else {
        G.flags.transit_manifest_amended = true;
        G.investigationProgress++;
        G.lastResult = `The amendment is visible in natural light: darker strokes over lighter ones, the earlier destination still legible at the right margin where the correction did not fully cover it. The new routing code sends the shipment outside Craftspire's trade district. You copy both codes before returning the manifest. The transit clerk does not stop you, but she notes the time of your visit in the access log beside the filing shelf.`;
        addJournal('Redirected tools manifest — original destination partially visible under amendment, outside-district routing code copied', 'intelligence', `craft-manifest-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The defect report is statistically impossible. No workshop has ever cleared this clean.",
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
        G.lastResult = `The defect rate in the report is 0.003 percent across forty-two inspection rounds — a figure that would require every component to arrive pre-graded, pre-selected, and pre-certified before entering the workshop floor. That is not a manufacturing process. It is a documentation process. Comparing the report's component batch codes to the no-PO chemical inputs in Jorin's ledger, three batch codes overlap: the "zero defect" materials are the same materials with no purchase orders. The audit report is covering for unverified inputs by recording them as flawless outputs.`;
        addJournal('Impossible audit report: zero-defect batches match no-PO chemical inputs — audit laundering undocumented materials', 'evidence', `craft-audit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The Quality Standards Office keeps historical audit reports behind a certification access barrier — a brass-edged partition with a sign listing the credential classes required to review comparative defect records. Your credential class is not on the list. The clerk behind the partition gestures to a public summary board near the entrance that shows aggregate workshop performance ratings without batch-level detail. The summary shows nothing unusual.';
        addJournal('Historical audit records credential-gated — batch-level comparison unavailable without certification access', 'complication', `craft-audit-fail-${G.dayCount}`);
      } else {
        G.flags.audit_report_impossibility_confirmed = true;
        G.investigationProgress++;
        G.lastResult = `The historical comparison takes an hour in the reference stacks. Craftspire's workshop defect rates average between 2 and 6 percent across every recorded cycle — the variance is consistent with material quality and operator experience. The report in question shows 0.003 percent. Either this workshop operates at a precision level no Craftspire facility has ever achieved, or the number was chosen rather than measured. You copy the batch codes from the report before the reading room closes.`;
        addJournal('Audit defect rate 0.003% — statistically impossible against all Craftspire historical baselines, batch codes copied', 'intelligence', `craft-audit-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The sealed archive predates the charter. It names institutions never supposed to exist here.",
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
    label: "Craftspire is the production facility. Guild authority or supply chain — one path ends here.",
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
        G.lastResult = `One row on the lower ledger balcony board runs well above the surrounding entries — output targets that would require continuous operation across registered floor space with no margin for equipment downtime. The quota board is posted under the high Craftspire vaults, lamp oil smoke darkening the stone above each bracket light. The inspector approval mark is there. No secondary verification notation. Standard quota approvals at this level require two marks; this row has one. The second mark's absence is either an administrative oversight or the approval was never submitted for the second reviewer to see.`;
        addJournal('Quota board: single-mark approval on oversize ghost workshop target — second mark absent', 'intelligence', `craft-quota-partial-${G.dayCount}`);
        G.recentOutcomeType = 'neutral';
      }
      if (!result.isFumble) G.recentOutcomeType = result.isCrit ? 'success' : 'neutral';
      maybeStageAdvance();
    }
  },

  {
    label: "The intake log has a compound category no registered copy process uses.",
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
    label: "A materials broker filed a complaint and withdrew it the same day.",
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
        G.lastResult = `The broker — a compact woman named Heln Varris who keeps her invoice ledgers in a waxed canvas roll she carries on her belt — filed the complaint at the ninth bell and withdrew it before the second bell the following morning. She is direct about why: someone came to her workshop between those two bells and left a sealed letter with no return address. The letter contained a correct accounting of her remaining supply contracts, her outstanding debts to three specific creditors, and a note explaining that the complaint would make the accounting public. She withdrew the complaint and has not filed anything since.`;
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

  {
    label: "The same item carries two certification stamps from different seasons",
    tags: ['Records', 'Evidence', 'Stage2'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'dual certification stamp');
      G.lastResult = 'The certification log shows the piece by item number — a standard finished-goods entry, spring season mark, guild inspector stamp. Two pages later, the same item number appears again under autumn, with a different inspector stamp. Items do not get certified twice. Either the same piece passed through the system twice with different paperwork, or someone is using valid item numbers to certify things that were never inspected.';
      addJournal('A Craftspire certification log shows the same item number certified twice under different seasons by different inspectors. Source: Craftspire guild certification office.', 'evidence', `craft-dualstamp-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  {
    label: "The master knows the materials are wrong. She's known for months",
    tags: ['NPC', 'Intelligence', 'Stage2'],
    xpReward: 15,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(15, 'master craftsperson supply chain');
      G.lastResult = 'She runs her thumb along the edge of the sample piece — a gesture so automatic it belongs to her hands, not her attention. "The temper is wrong." She sets it down. The supply manifest says the same grade it always said. The pieces are not the same grade. She has been working around it since last winter, adjusting her process, not filing. Filing would mean naming who supplied it.';
      addJournal('A Craftspire master craftsperson confirmed supply materials have been substandard since winter — has been adjusting process rather than filing a supplier complaint. Source: Craftspire workshop, master\'s bench.', 'intelligence', `craft-master-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  {
    label: "A quality mark dispute that traces back to one administrative decision",
    tags: ['Records', 'Intelligence', 'Stage2'],
    xpReward: 15,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(15, 'quality mark origin trace');
      G.lastResult = 'Three workshops appealing the same quality classification change. Different items, different masters, different seasons — all pointing to one administrative memo from eight months ago that reclassified a material grade downward without a formal review. The workshops were never notified. They found out when their pieces failed certification under the new standard. The memo carries a Collegium filing reference, not a guild one.';
      addJournal('Three Craftspire quality mark disputes trace back to one Collegium administrative memo that reclassified a material grade without formal review or workshop notification. Source: Craftspire certification appeals archive.', 'intelligence', `craft-qualitymemo-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  {
    label: "The rejected certification appeals all reference the same filing code",
    tags: ['Records', 'Evidence', 'Stage2'],
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(20, 'appeals archive pattern');
      G.lastResult = 'A full season of rejected certification appeals. Each rejection letter cites a different reason — material standards, process deviation, inspector availability. But in the administrative reference column at the bottom of each letter, the same filing code appears on every one. The code format is Collegium procedural, not guild. Whatever that filing contains, it is the actual reason every one of these appeals failed.';
      addJournal('Craftspire certification rejection letters from the past season all share the same Collegium administrative filing code, despite citing varied rejection reasons. Source: Craftspire appeals archive.', 'evidence', `craft-appeals-${G.dayCount}`);
      G.recentOutcomeType = 'investigate';
      G.stageProgress[2] = (G.stageProgress[2] || 0) + 1;
      maybeStageAdvance();
    }
  },

  // === MATERIAL LEDGER DISCREPANCIES (~6 choices) ===

  {
    label: "Jorin's material ledger uses two different unit systems on the same page.",
    tags: ['Workshop', 'Records', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'cross-checking unit system discrepancy in Craftspire material ledger');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_jorin_ledgermere = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Jorin sets both ledger volumes side by side on the high window shelf. His finger lands on the column break — old guild weight on the left half of the page, Collegium metric on the right. The switch happened mid-month, seven months ago. The entries before the switch show higher quantities for the same line items. On paper, nothing was lost. But the units changed, and whoever changed them knew the difference would compound quietly across every downstream manifest.';
        addJournal('Craftspire material ledger unit system switched mid-month 7 months ago — quantities inflated on paper via conversion gap. Source: Jorin Ledgermere, Material Ledger Office.', 'evidence', `craft-units-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The ledger clerk at the intake desk glances up before the second page is open. The volumes are not available for general cross-reference — they are working documents, subject to active audit protocol. A sealed notice is already clipped to the binding. The audit was filed this morning. The timing makes the neck prickle.';
        addJournal('Craftspire material ledger volumes under active audit — access sealed this morning.', 'complication', `craft-units-fail-${G.dayCount}`);
      } else {
        G.flags.met_jorin_ledgermere = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Two unit systems, one ledger page. Jorin traces it: guild weights pre-date the Collegium harmonization memo by eight months. The switch should have been simultaneous across all ledger volumes. It was not. Several stockyard entries kept guild weights after harmonization — same commodities, different columns, different totals. No correction note. No reconciliation entry. The gap is small per line and enormous across a full season.';
        addJournal('Craftspire ledger harmonization incomplete — guild weight entries post-date Collegium memo, creating seasonal quantity gap. Source: Jorin Ledgermere.', 'evidence', `craft-units-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Three material classifications were reclassified the same week the night-window inspections changed.",
    tags: ['Records', 'Pattern', 'Stage2'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'tracing reclassification timing against inspection schedule changes');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.reclassification_timing_flagged = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The reclassification memo is dated the same morning the inspection rotation changed. Three material grades — standard copper alloy, a binding resin, and a pressed composite — moved from open-stockyard to bonded-store classification. Bonded-store items are not subject to night-window spot checks. The inspection schedule change removed the one oversight window that covered bonded-store items after hours. Both changes required separate authorization. Both carry the same officer seal.';
        addJournal('Craftspire reclassification and inspection schedule change issued same day, same officer seal — bonded-store materials now exempt from night-window checks. Source: Classification records.', 'evidence', `craft-reclassify-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The classification archive is stored in the upper-floor reference room — accessible by appointment only, and the appointment clerk has no slots until after the current audit window closes. The wait would be a week. By then, whatever the reclassification memos contain will have had time to be amended.';
        addJournal('Classification archive access requires appointment — next slot after current audit window closes.', 'complication', `craft-reclassify-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The classification shift is in the record. Three material grades, same week the inspection schedule changed. The reclassification is internally documented as a storage efficiency measure — bonded-store facilities have better environmental control. The reason is plausible. The timing is not. Night-window spot checks on those materials stopped the same week they were moved out of their previous category.';
        addJournal('Three Craftspire material reclassifications coincide with end of night-window spot-check coverage for same materials. Source: Classification and inspection records.', 'evidence', `craft-reclassify-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The stockyard intake manifest has a column with no header and no corresponding ledger field.",
    tags: ['Records', 'Stage2'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing anonymous column in stockyard intake manifest');
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The column is not blank — it carries a string of two-letter codes, different on each row. Cross-referencing against the bonded-store routing index takes most of an hour. The codes map to holding bays that are not listed in the public stockyard directory. Three of the bays are associated with a charter exemption that predates the current guild administration by eleven years. Whatever enters those bays enters outside the standard intake record.';
        addJournal('Craftspire intake manifest anonymous column maps to unlisted bonded-store bays under an 11-year-old charter exemption. Source: Stockyard intake records and routing index.', 'evidence', `craft-column-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The manifest clerk notices the question before it is fully formed — she has worked this desk a long time. The column is an internal routing field, she says. It is not part of the public ledger. Her tone ends the inquiry without raising her voice. The manifest is collected from the review surface and returned to its binder.';
        addJournal('Craftspire intake manifest anonymous column identified as internal routing field — clerk ended access without explanation.', 'complication', `craft-column-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The headerless column runs down every intake manifest going back at least two seasons. The entries are not random — the codes repeat in clusters, each cluster corresponding to a batch delivery date. No cross-reference key is attached to any manifest. The intake records reference a routing supplement that is not filed with the main ledger series.';
        addJournal('Craftspire stockyard intake manifests contain anonymous routing codes with no cross-reference key — routing supplement not filed with ledger series.', 'intelligence', `craft-column-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The ledger volume covering last winter's batch deliveries is thinner than the others.",
    tags: ['Records', 'Stage2'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'auditing ledger volume completeness for winter batch period');
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The winter volume has been rebound. The stitching at the spine is newer than the cover, and the page signatures are not continuous — several are missing the sequential folio numbers stamped at the bindery. The pages that remain cover ordinary intake days. The batch delivery dates are entirely absent. Someone removed those pages and had the volume rebound to disguise the gap. The bindery mark on the spine is from a shop inside the Collegium compound.';
        addJournal('Craftspire winter ledger volume rebound after page removal — batch delivery dates excised; rebinding done by Collegium compound bindery. Source: Physical ledger examination.', 'evidence', `craft-wintervol-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The ledger shelf runs along the upper wall. The winter volume is on the high end, out of reach without the rolling ladder. The ladder is locked to the far wall — in use by a records clerk who shows no sign of finishing. Waiting draws attention. The volume stays out of reach.';
        addJournal('Could not access winter ledger volume — ladder in use, access not possible without drawing attention.', 'complication', `craft-wintervol-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The winter volume is noticeably thinner than the autumn and spring volumes flanking it on the shelf. The page count is lower and the folio numbers skip — thirty-one pages are simply not there. No notation in the index marks them as transferred or sealed. The volume was filed complete. It is no longer complete.';
        addJournal('Craftspire winter ledger volume missing 31 pages with no transfer or seal notation in index. Source: Material Ledger Office shelf.', 'evidence', `craft-wintervol-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Jorin avoids certain entries. The shape of that silence is specific.",
    tags: ['NPC', 'Workshop', 'Stage2'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'reading Jorin Ledgermere for what he avoids in the ledger');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_jorin_ledgermere = true;
        G.flags.jorin_partial_disclosure = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Jorin does not look up from the ledger he is copying. His pen slows on the line that references the batch delivery bays. He says, carefully, that he keeps his work to the columns he is assigned. His thumb rubs the edge of the page — a practiced gesture, the kind that belongs to a man who has taught himself not to read past a certain point. He copies the next entry verbatim. The column he skips is the one without a header.';
        addJournal('Jorin Ledgermere physically avoids the anonymous routing column in intake manifests — deliberate occupational constraint, not ignorance. Source: Observed at Material Ledger Office.', 'evidence', `craft-jorin-silence-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Jorin sets the pen down with the particular care of a man who has been approached this way before. He is cooperative, thorough, and utterly unhelpful — every answer technically accurate, no answer pointing anywhere. By the time the conversation ends, it is clear he has given nothing that could be used and that he knows exactly what he withheld.';
        addJournal('Jorin Ledgermere gave accurate but useless answers — experienced at deflection without lying.', 'complication', `craft-jorin-silence-fail-${G.dayCount}`);
      } else {
        G.flags.met_jorin_ledgermere = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'He is helpful up to a point. The point is consistent: anything touching the bonded-store bays, he refers to a different office. He does it without being asked, preemptively, as if the question is already in the air before it is spoken. He has been trained to route those inquiries away. He knows the inquiry does not go anywhere useful. He routes it anyway.';
        addJournal('Jorin Ledgermere pre-emptively reroutes all bonded-store bay queries to separate office — conditioned response, not personal decision. Source: Material Ledger Office.', 'intelligence', `craft-jorin-silence-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The stockyard measurements and ledger totals disagree by the same amount every quarter.",
    tags: ['Records', 'Pattern', 'Stage2'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'cross-referencing stockyard measurement records against ledger totals');
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The variance is not approximately the same — it is precisely the same, to the half-unit, every quarter for six quarters. A natural variance drifts. This one does not drift. It is calculated. The quantity routed through the anonymous intake column each quarter equals the shortfall between stockyard measurement and ledger total. The ledger is not wrong. It is recording something real. The measurement record is what has been adjusted.';
        addJournal('Craftspire quarterly ledger-to-stockyard variance is identical to half-unit precision across 6 quarters — matches anonymous intake column volume exactly. Source: Measurement records and ledger cross-reference.', 'evidence', `craft-variance-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The measurement records and the ledger volumes are kept by different offices in different buildings. Cross-referencing them requires a formal reconciliation request. The request takes ten days to process. Ten days is long enough for a careful person to notice the request was filed.';
        addJournal('Cross-referencing stockyard measurements against ledger requires 10-day formal request — exposure window created.', 'complication', `craft-variance-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Six quarters of measurement records against six quarters of ledger totals. The discrepancy holds: same direction, same magnitude, every time. A rounding error would drift randomly. An equipment error would compound. This is neither. The amount that disappears from the measurement record and reappears in the ledger total is consistent to a degree that requires someone to maintain it deliberately.';
        addJournal('Six-quarter Craftspire measurement-to-ledger discrepancy is stable and non-random — deliberate maintenance implied. Source: Records cross-reference.', 'evidence', `craft-variance-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // === COUNTERFEIT TRADE DOCUMENTATION (~5 choices) ===

  {
    label: "The copy-authentication desk has a queue that clears in under a minute.",
    tags: ['Workshop', 'Stage2'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'observing copy-authentication desk processing speed and warden behavior');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.copy_warden_observed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Copy Warden works the authentication desk with a stamp so worn its face barely raises an impression on paper. He processes documents at a pace that allows no time for the moisture check, the fiber test, or the sequential number verification that the posted procedure requires. Three trade certificates pass under that stamp in the time it takes to read the procedure placard. One of them is dated three weeks from now.';
        addJournal('Copy Warden authentication desk skips required document verification steps — one processed document post-dated by three weeks. Source: Craftspire Copy Legitimacy desk, direct observation.', 'evidence', `craft-copywarden-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The Copy Warden clocks the attention from across the room. He does not change pace — he does not need to. The desk is positioned to be observed, and what is observable is entirely procedurally correct. Whatever the speed means, it is not something that can be confirmed from the public side of that counter.';
        addJournal('Copy authentication desk processing is observable but desk positioned to show only compliant surface — cannot assess from public side.', 'complication', `craft-copywarden-fail-${G.dayCount}`);
      } else {
        G.flags.copy_warden_observed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The queue is short and moves fast — faster than the posted processing time suggests it should. The Copy Warden does not look at the document face. He checks the header, applies the stamp, passes it back. The verification marks his stamp leaves are identical on every document: same pressure, same angle. Authentication is supposed to be a physical assessment. This is a mechanical repetition.';
        addJournal('Craftspire Copy Warden processing documents without required physical assessment — stamp applied by rote, not verification. Source: Direct observation.', 'intelligence', `craft-copywarden-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Two certificates for the same shipment: different stamps, identical origin seal.",
    tags: ['Records', 'Evidence', 'Stage2'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'comparing duplicate trade certificate authentication against origin seal');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.duplicate_certificate_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The origin seal is physically identical — not a copy, not a forgery of a forgery, but the same engraved die pressed twice. Two authentication stamps from two different Copy Wardens, on documents that are supposed to be a single original and its registered copy. Both stamps are genuine. The die used to press the origin seal should only exist in one location. It was used twice within the same day. Either it moved, or there are two dies.';
        addJournal('Craftspire trade certificate duplicate: same die used for origin seal twice in one day — two genuine authentication stamps on what should be one original. Source: Certificate physical comparison.', 'evidence', `craft-dupe-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The second certificate is legitimate — a correction copy issued when the first was damaged in transit. The notation is in the supplementary archive, which requires a separate access request. The explanation is mundane. The time spent on it is not.';
        addJournal('Duplicate trade certificate explained as transit-damage correction copy — explanation verifiable but diverts time.', 'complication', `craft-dupe-fail-${G.dayCount}`);
      } else {
        G.flags.duplicate_certificate_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Same origin seal. Different authentication stamps. Trade certificates for the same shipment are not supposed to be issued twice under different stamps — that is what the origin seal is for, to mark the authoritative copy. The second stamp is as genuine as the first. One of these certificates did not travel with the shipment. It was produced separately and authenticated separately by a different warden.';
        addJournal('Craftspire shipment has two genuinely authenticated trade certificates with same origin seal — second certificate issued and authenticated separately. Source: Certificate archive.', 'evidence', `craft-dupe-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Copy Warden's validation marks are different weights on weekday certificates versus night-window ones.",
    tags: ['Evidence', 'Stage2'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'comparing copy warden validation mark weight across certificate batches');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.nightwindow_certificates_flagged = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The impression depth is measurably different — not by condition of the stamp, which shows even wear, but by applied pressure. Night-window certificates carry a shallower mark. The same die, pressed lighter. A deliberate tell, or a man tired enough at three in the morning that his grip fails consistently. Except the variation is consistent across all night-window certificates regardless of which Copy Warden signed them. Both wardens light-press at night. Both. That is not fatigue.';
        addJournal('Both Craftspire Copy Wardens apply lighter stamp pressure on night-window certificates — consistent across both, not fatigue-related. Possible deliberate authentication differentiation. Source: Physical certificate comparison.', 'evidence', `craft-markweight-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Authentication stamps vary by age and use. The lighter marks on the night certificates are consistent with the older stamp die, which shows more wear. The variation is an equipment maintenance issue, not a procedural one. The explanation holds — until it is checked against which warden used which die.';
        addJournal('Night-window certificate mark variation initially attributed to stamp wear — equipment explanation plausible but unverified.', 'complication', `craft-markweight-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Night-window certificates come back from the desk with a shallower validation mark. It is visible when they are held at an angle to the light from the high windows. The mark is genuine — the stamp is the correct one, the warden is the same one on duty. The pressure is lighter. Every night-window batch. The daytime certificates are full-depth marks without exception.';
        addJournal('Craftspire night-window certificates carry shallower Copy Warden validation marks than daytime certificates — consistent pattern across batches. Source: Physical document comparison.', 'intelligence', `craft-markweight-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A trade certificate references a material classification that was abolished four years ago.",
    tags: ['Records', 'Evidence', 'Stage2'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'tracing obsolete material classification on active trade certificate');
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The abolished classification was retired because it covered a range of materials too broad to certify with confidence — it was a catch-all that preceded the current tiered system. Using it now would allow any material in that original range to travel under a single certificate, bypassing the specific documentation the tiered system requires. The certificate bearing this classification passed authentication two weeks ago. The Copy Warden who stamped it has been at the desk for six years. He knows every classification on the active list.';
        addJournal('Active Craftspire trade certificate uses abolished 4-year-old catch-all classification — bypasses tiered documentation requirements; authenticated by 6-year veteran warden. Source: Classification archive and certificate record.', 'evidence', `craft-oldclass-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The classification code is flagged in the archive as retired but the archive note includes a grandfather clause — existing certificates under the old system remain valid through the end of the current administrative year. The certificate is technically legitimate. The clause expires in six weeks.';
        addJournal('Obsolete classification on Craftspire certificate covered by grandfather clause — valid for 6 more weeks.', 'complication', `craft-oldclass-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The classification index marks it as retired and replaced. The replacement system has been in use for four years. A current trade certificate should not carry the old code — the authentication desk has the updated classification list pinned behind the counter. The certificate passed through that desk and was stamped legitimate. Either the list behind the counter is not the current list, or the warden did not check it.';
        addJournal('Craftspire trade certificate with 4-year-obsolete classification passed authentication desk — updated list should have flagged it. Source: Classification index and certificate.', 'evidence', `craft-oldclass-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Blank trade certificates with pre-applied authentication stamps are not supposed to exist.",
    tags: ['Evidence', 'Stage2'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'documenting pre-stamped blank trade certificates at Craftspire authentication desk');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.prestamped_blanks_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The stack is under the return-tray on the Copy Warden\'s desk — twelve blank trade certificate forms, each carrying a full authentication stamp with a date from next quarter. The stock number is sequential. They were printed together, stamped together, and filed under the desk together. Whoever fills in the content fields can move any material through Craftspire\'s documentation chain without returning to the authentication desk. The stamps are not forgeries. They are genuine, applied in advance, by the warden who is currently sitting two feet away.';
        addJournal('12 pre-stamped blank trade certificates found at Craftspire authentication desk — sequential stock numbers, genuine stamps dated next quarter, filed under warden desk. Source: Copy Legitimacy desk, direct access.', 'evidence', `craft-blanks-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The return tray is empty. Whatever was under it has been moved. The Copy Warden watches the tray with a practiced absence of expression. Something was there and is no longer there, and reaching for it now would make the next hour considerably worse.';
        addJournal('Evidence under Copy Warden return tray removed before access — warden aware of approach.', 'complication', `craft-blanks-fail-${G.dayCount}`);
      } else {
        G.flags.prestamped_blanks_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The forms are blank and stamped. Trade certificate stock, authentication mark already applied, date field filled in for a date that has not happened yet. They are in the return-tray stack rather than the issued-documents file. Either they were processed incorrectly or they were set aside for specific use. The Copy Warden has not looked up from his current document.';
        addJournal('Pre-stamped blank trade certificate forms found in Copy Warden return tray — future-dated authentication stamps, not filed in issued-documents record. Source: Craftspire authentication desk.', 'evidence', `craft-blanks-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // === NPC ENCOUNTERS (~6 choices) ===

  {
    label: "Tess's log has seven items marked 'resolved' with no resolution note.",
    tags: ['NPC', 'Workshop', 'Stage2'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'examining inspection log resolution gaps with Night-Lantern Inspector Tess');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_tess_ledgermere = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Tess finds that the seven marked-resolved items were all flagged during night-window inspections and closed by a single authorization code that does not correspond to any current officer assignment. The code was used fourteen times over three months and then never again. She pulls the duty roster for the relevant nights — no officer is listed as active for those shifts. The authorizations came from somewhere, applied to specific items, and then the code was retired.';
        addJournal('Seven Craftspire night-window inspection items resolved by an authorization code matching no officer — 14 uses over 3 months, then retired. Source: Tess Ledgermere, Night-Lantern Inspector.', 'evidence', `craft-tesslog-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Tess pulls the inspection log and finds a compliance hold already placed on the flagged items — triggered by a query filed the day before this visit. The timing is too precise to be coincidence. She can confirm the hold exists. She cannot confirm who filed the triggering query without going through the compliance office, which is not her jurisdiction.';
        addJournal('Craftspire inspection log items under pre-existing compliance hold — query filed the day before arrival; origin unconfirmable through Tess.', 'complication', `craft-tesslog-fail-${G.dayCount}`);
      } else {
        G.flags.met_tess_ledgermere = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Tess confirms the unresolved resolutions and pulls the authorization code. It is a valid format — the system accepted it — but she cannot match it to any officer roster she has access to. She marks the seven items for re-review and stamps them herself, so the change is on record with her name, not the anonymous code. The stamp leaves a clean mark. She does not look pleased about needing to use it.';
        addJournal('Seven Craftspire inspection items re-reviewed: authorization code valid but unmatched in officer roster. Tess Ledgermere placed personal stamp on re-review record. Source: Night-Lantern Inspector.', 'evidence', `craft-tesslog-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Tess works the night-window shift because something changed three months ago and she asked to.",
    tags: ['NPC', 'Stage2'],
    xpReward: 69,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(69, 'learning what prompted Tess Ledgermere to request night-window assignment');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_tess_ledgermere = true;
        G.flags.tess_motive_known = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'She asked for the night-window shift after a daytime batch delivery she was not supposed to see. She was in the stockyard for a different reason — a meter calibration check — and the delivery came through the bonded-store bay while she was there. She did not see the contents. She saw how it was handled: no intake form, no measurement record, no warden present. Moved by hand, by two people she did not recognize, into a bay that was not on her calibration list. She requested the shift change that evening.';
        addJournal('Tess Ledgermere requested night-window shift after witnessing unrecorded bonded-store delivery — no intake form, no measurement record, unknown handlers. Source: Tess Ledgermere, direct disclosure.', 'evidence', `craft-tessmotive-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'She is pleasant and oblique in roughly equal measure. The night-window shift was a scheduling preference, she says. The forge-smoke is worse in the afternoon when the smelting lines are running. It is a reasonable answer. It is also the answer of someone who has given it before and found it closes questions efficiently.';
        addJournal('Tess Ledgermere gave scheduling preference explanation for night-window shift — practiced deflection.', 'complication', `craft-tessmotive-fail-${G.dayCount}`);
      } else {
        G.flags.met_tess_ledgermere = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'She asked for the shift three months ago. Before that she was on the standard day rotation, same as her brother Jorin. She wanted to see what moved through the inspection points at night. She says this with no particular inflection, as if it were obvious. The night-window schedule is quieter. She gets to look at things for longer. She does not say what she has been looking at.';
        addJournal('Tess Ledgermere proactively requested night-window shift 3 months ago to observe night-time movement — has been monitoring something specific, undisclosed. Source: Tess Ledgermere.', 'intelligence', `craft-tessmotive-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Copy Warden has a second stamp. The desk only issues one.",
    tags: ['NPC', 'Evidence', 'Stage2'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'observing Copy Warden carrying unauthorized second authentication stamp');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.copy_warden_second_stamp = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The second stamp comes out when he reaches for something in his inner coat pocket and clips the desk edge. It rolls half a turn before he catches it — not alarmed, just automatic. He pockets it without looking up. The face of the stamp is visible for less than two seconds: the authentication mark is correct but the serial number stamped into the handle is not in the sequence that the Copy Legitimacy Office uses for issued equipment. That handle number belongs to a stamp that was reported lost fourteen months ago.';
        addJournal('Copy Warden carrying second authentication stamp with serial number of a stamp reported lost 14 months ago. Source: Craftspire authentication desk, direct observation.', 'evidence', `craft-wardenstamp-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The coat stays on. He works the desk without going into his pockets, and the angle never opens. Whatever is in his coat remains there. The shift ends and he leaves through the staff corridor, not the public entrance.';
        addJournal('Copy Warden did not expose coat pocket contents — observation window did not open.', 'complication', `craft-wardenstamp-fail-${G.dayCount}`);
      } else {
        G.flags.copy_warden_second_stamp = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The second stamp is in his inner pocket — there is the shape of it through the coat fabric when he leans forward over the desk, the rectangular weight pulling the lining. Authentication wardens carry one stamp. The desk-issued stamp is in his right hand. The one in his pocket has been there all morning.';
        addJournal('Copy Warden carrying second stamp-shaped object in inner coat pocket throughout shift — authentication wardens issued only one stamp. Source: Craftspire authentication desk, observation.', 'intelligence', `craft-wardenstamp-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Jorin and Tess don't speak here. The silence between them is careful.",
    tags: ['NPC', 'Stage2'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'reading the dynamic between Jorin and Tess Ledgermere in the ledger house');
      if (!G.flags) G.flags = {};
      var result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_jorin_ledgermere = true;
        G.flags.met_tess_ledgermere = true;
        G.flags.ledgermere_sibling_rift = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Tess is in the ledger house for a calibration consultation — an ordinary reason to be there. Jorin is copying entries at his desk. They do not acknowledge each other. It is not hostility; it is the kind of deliberate not-seeing that people practice when they have decided that what one of them knows cannot be shared with the other without cost. Tess leaves first. Jorin tracks her exit with his peripheral vision and then copies the next line with slightly more pressure than the one before it.';
        addJournal('Jorin and Tess Ledgermere deliberately avoiding contact in shared workspace — indicates each has information the other is not safe to know. Source: Craftspire ledger house, direct observation.', 'intelligence', `craft-siblings-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'They are on different floors — Jorin in the main ledger room, Tess checking calibration equipment in the lower records wing. The silence is geographic. There is nothing to read into proximity that does not exist.';
        addJournal('Jorin and Tess Ledgermere on different floors during visit — no shared-space dynamic observable.', 'complication', `craft-siblings-fail-${G.dayCount}`);
      } else {
        G.flags.met_jorin_ledgermere = true;
        G.flags.met_tess_ledgermere = true;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'They are in the same room for eleven minutes and do not speak. Not unusual for siblings working the same institution — professional distance is a practical choice. But the particular quality of the silence is deliberate. Jorin does not look up when Tess enters. Tess does not route her question about the calibration record to him, though he is the senior ledger officer and it would be the obvious path.';
        addJournal('Jorin and Tess Ledgermere in shared workspace with deliberate non-interaction — Tess bypassed Jorin as resource despite his relevant seniority. Source: Craftspire ledger house.', 'intelligence', `craft-siblings-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Copy Warden predates the authentication system he operates.",
    tags: ['NPC', 'Stage2'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'placing Copy Warden tenure against authentication system history');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.copy_warden_observed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The current authentication system was implemented nine years ago. The Copy Warden has been at this desk for sixteen. He was here under the previous system — the loose-paper certification process that the current stamp-and-register protocol was designed to replace. He knows exactly what the new system is meant to prevent because he watched the old vulnerabilities work in practice for seven years. He did not help design the new system. He was retained to operate it.';
        addJournal('Craftspire Copy Warden pre-dates current authentication system by 7 years — experienced with old loose-paper vulnerabilities the current system was designed to close; was retained, not reformed. Source: Personnel and system history.', 'evidence', `craft-wardenseniority-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Personnel records for the Copy Legitimacy Warden position are not part of the material ledger archive — they are held by the guild administration office, separate building, appointment required. The warden is at his desk. The records are elsewhere.';
        addJournal('Copy Warden personnel records held in separate guild administration building — not accessible through ledger archive.', 'complication', `craft-wardenseniority-fail-${G.dayCount}`);
      } else {
        G.flags.copy_warden_observed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The authentication desk protocols were formalized nine years ago. The Copy Warden name appears on documentation that predates the protocol — he is listed as a procedural consultant during the transition year. He helped define what a legitimate stamp was supposed to look like. He knows the system from the drafting stage, not just the operating stage.';
        addJournal('Craftspire Copy Warden served as procedural consultant during authentication system implementation 9 years ago — knows system architecture from drafting stage. Source: Transition-year documentation.', 'intelligence', `craft-wardenseniority-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Jorin asked for a transfer eighteen months ago. It was denied. He never asked again.",
    tags: ['NPC', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing Jorin Ledgermere transfer request denial and its aftermath');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_jorin_ledgermere = true;
        G.flags.jorin_compromised = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The transfer request and its denial are in the personnel file. Attached to the denial is a brief internal note — not a formal document, just a note — that the request was reviewed and that the requestor\'s "continued familiarity with the current assignment" was considered essential to administrative continuity. The phrasing is polite. It means: you know too much to be moved, and we prefer you where we can watch what you do with it. Jorin received a copy of the note. He kept it.';
        addJournal('Jorin Ledgermere transfer denied with internal note citing "continued familiarity" — administrative language for controlled retention. He kept the note. Source: Personnel file and Jorin Ledgermere.', 'evidence', `craft-jorinseniority-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'Transfer request records are not part of the material ledger archive. Personnel matters are handled through the guild administration office. Jorin answers the indirect question with the flat professionalism of someone who has answered it before and received nothing from answering.';
        addJournal('Jorin Ledgermere transfer records not accessible through ledger archive — personnel question deflected.', 'complication', `craft-jorinseniority-fail-${G.dayCount}`);
      } else {
        G.flags.met_jorin_ledgermere = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'He mentions the transfer request without being asked about it directly — it surfaces when the conversation touches on how long he has been in the Material Ledger Office. Eighteen months ago, he says. Denied. He does not say where he asked to go or what reason was given. He returns to copying the current entry with the careful pace of a man who has learned to fill time usefully.';
        addJournal('Jorin Ledgermere transfer request denied 18 months ago — unprompted disclosure, reason and destination not given. Source: Jorin Ledgermere.', 'intelligence', `craft-jorinseniority-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // === CROSS-REFERENCE THREADS (~3 choices) ===

  {
    label: "The suppression compound's material inputs have a Craftspire ledger trail. It's not hidden well.",
    tags: ['Records', 'Evidence', 'Stage2'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'threading Craftspire ledger entries to suppression compound material supply chain');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.suppression_craftspire_link = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The binding resin and the copper-base alloy both appear in the Craftspire ledger under craft-material classifications — legitimate enough at the point of entry. Following the allocation records forward, both materials route to a consortium supplier rather than a named workshop. The consortium charter lists Craftspire as its home registration. Its outgoing allocation records reference delivery addresses that are not workshops. Three of those addresses cross-reference to the batch delivery bays connected to the unlisted charter exemption. The trail was not hidden. It was buried in volume.';
        addJournal('Craftspire ledger links binding resin and copper-base alloy to consortium deliveries at unlisted charter-exemption bays — same bays as batch delivery routing. Trail buried in document volume, not obscured. Source: Craftspire allocation records.', 'evidence', `craft-supplychain-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The allocation records for the relevant material categories are part of the bonded-store documentation — the same category that routes above the Material Ledger Office. Access requires a Collegium authorization code. The trail exists. It is accessible only to whoever controls that authorization chain.';
        addJournal('Craftspire material allocation records for relevant categories gated behind Collegium authorization — trail blocked at bonded-store documentation threshold.', 'complication', `craft-supplychain-fail-${G.dayCount}`);
      } else {
        G.flags.suppression_craftspire_link = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The material inputs follow a path through the ledger that looks ordinary until the allocation stage. At allocation, they stop going to named workshops and start going to a consortium entry — a legitimate registration, Craftspire-based, with a charter that covers a wide category of material distribution. The consortium outgoing records are in a separate ledger series. That series is filed and accessible. It is simply very long.';
        addJournal('Craftspire material inputs routed to consortium at allocation stage — consortium outgoing records exist but filed across a very long series. Source: Material Ledger Office allocation records.', 'evidence', `craft-supplychain-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The same consortium name appears here and in the last locality's documents.",
    tags: ['Records', 'Pattern', 'Stage2'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'cross-referencing consortium name between Craftspire records and prior locality documents');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.consortium_cross_reference = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The consortium appears in both sets of records with the same charter number but different registration localities — Craftspire in one, a transit-point designation in the other. A consortium cannot have two home registrations. One of them is false. The transit-point designation is the older record. The Craftspire registration was filed fourteen months ago — two weeks after a compliance review at the other locality would have flagged the original registration for audit.';
        addJournal('Consortium carries dual locality registrations with same charter number — Craftspire registration filed 2 weeks after compliance review would have flagged original, implying re-registration to avoid audit. Source: Cross-locality records comparison.', 'evidence', `craft-consortium-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The consortium name is common enough — it uses a standard trade designation that appears in dozens of registered entities across the region. Without the charter number, matching records across localities produces twenty-three candidates. Narrowing them requires access to the inter-locality registration index, which is a Collegium document.';
        addJournal('Consortium name search returned 23 candidates — charter number needed to narrow match, requires Collegium inter-locality registry access.', 'complication', `craft-consortium-fail-${G.dayCount}`);
      } else {
        G.flags.consortium_cross_reference = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The name matches and the charter number matches. The same entity appears in Craftspire\'s material allocation records and in documents from before this locality. It is registered here, and it was active there. A consortium registered to a single locality should not have active operations across multiple jurisdictions without an inter-locality charter endorsement. That endorsement is not in the record.';
        addJournal('Same consortium (matching name and charter number) active in Craftspire records and prior locality documents — no inter-locality charter endorsement on file. Source: Craftspire records cross-reference.', 'evidence', `craft-consortium-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The forge output reported to the Collegium doesn't match the stockyard.",
    tags: ['Records', 'Pattern', 'Stage2'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'cross-referencing Craftspire forge output reports against stockyard physical holdings');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.output_reporting_gap = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Collegium output reports are filed quarterly and show steady, moderate production — the numbers that keep a forge licensed at a standard operating tier without attracting capacity review. The stockyard, walked in person, holds materially more than a forge at that production tier should generate. The excess is not randomly distributed across material categories. It clusters in the same three categories as the reclassified materials, in the same bonded-store bays connected to the unlisted charter exemption. The forge is producing at a higher tier than it reports and routing the excess through documentation that does not touch the Collegium record.';
        addJournal('Craftspire forge stockyard holdings exceed reported production tier — excess concentrated in reclassified material categories in unlisted bonded bays. Source: Physical stockyard assessment vs. Collegium output reports.', 'evidence', `craft-forgeoutput-crit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = 'The stockyard is not accessible for casual inspection — materials in the bonded-store category require a warden escort and a formal entry purpose. The Collegium output reports are filed documents and available at the public archive window. Without stockyard access, one side of the comparison is not obtainable.';
        addJournal('Stockyard access requires warden escort — cannot assess physical holdings to compare against Collegium output reports without formal entry.', 'complication', `craft-forgeoutput-fail-${G.dayCount}`);
      } else {
        G.flags.output_reporting_gap = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Collegium report shows a specific production volume. The stockyard holds more than that volume in processed materials, visible from the inspection walkway above the main floor. The difference is not dramatic — it is the kind of gap that a busy auditor might attribute to staging or transit-ready stock. The forge smoke in the rafters is heavier than a forge at that reported production tier would produce.';
        addJournal('Craftspire stockyard visible holdings exceed Collegium-reported production volume — forge smoke density inconsistent with reported tier. Source: Stockyard observation and Collegium output report comparison.', 'evidence', `craft-forgeoutput-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.CRAFTSPIRE_STAGE2_ENRICHED_CHOICES = CRAFTSPIRE_STAGE2_ENRICHED_CHOICES;
