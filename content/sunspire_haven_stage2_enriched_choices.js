/**
 * SUNSPIRE HAVEN STAGE 2 ENRICHED CHOICES
 * Investigation arc: northern convoy route staging / magical knowledge registry suppression
 * NPCs: Elyra Mossbane (Patron of Forests), Kael Emberthrone (Machinery Overseer),
 *       Orvak Strone (Trade Adjudicator), Jorva Helmrune (Communal Responsibility),
 *       Taldan Veyst (Magical Knowledge Overseer)
 */

const SUNSPIRE_HAVEN_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Suppression requests citing a non-existent regulatory authority. The registry keeps receiving them.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'investigating knowledge suppression requests with Taldan Veyst');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Taldan opens the suppression file on the first request and keeps going — fourteen in a row, six months of them, fanned across the desk. The cited authority, "Northern Glyph Oversight Commission," appears nowhere in the legal register or the regional charter index, and he has checked both twice. Every request targeted documentation that would allow someone to identify and counter glyph pressure engineering. Not general glyph knowledge. Specifically the countermeasures. "Censorship is most useful when it is targeted," he says. He has been waiting for someone to ask why.`;
        addJournal('Sunspire: 14 suppression requests from fake authority — targeting glyph countermeasure documentation', 'evidence', `sun-taldan-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Taldan records the visit before he responds — name, time, description, and nature of inquiry, in a neat hand. The summary goes to his supervisory chain by messenger before your second sentence is out. He explains this without apology: an outside party asking about a specific suppression file pattern looks, procedurally, indistinguishable from a new suppression attempt. He is not hostile. He is thorough. The visit is now part of the registry's own record, attached to the files you were asking about.`;
        addJournal('Knowledge Registry visit logged as potential suppression inquiry', 'complication', `sun-taldan-fail-${G.dayCount}`);
      } else {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.lastResult = `Taldan confirms the requests without prompting — he's been expecting someone to ask. "An authority I cannot verify in three major legal registers is not an authority." He taps the file. Multiple requests, same fake citation, same pattern of targeted documentation. He has not complied with any of them. The refusals are logged carefully, each one cross-referenced to the register checks he ran. He has been building a record on the assumption that the record would eventually matter.`;
        addJournal('Suppression requests from unverified authority — Taldan declined compliance', 'evidence', `sun-taldan-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Convoy modification requisitions matching suppression compound transport container descriptions.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining convoy modification requisitions with Kael Emberthrone');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_kael_emberthrone = true;
        G.investigationProgress++;
        G.lastResult = `Kael's requisition records show custom-built container insulation equipment — specifically designed to mask chemical compound signatures during standard cargo inspection. The work was commissioned by a party using the same sealed charter reference that appears throughout the record trail. Sunspire's convoy infrastructure was used as a modification workshop for the transport containers.`;
        addJournal('Sunspire convoy workshop used to build inspection-masking container insulation — same charter ref', 'evidence', `sun-kael-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kael wipes his hands on a rag and sets it down before he turns. The logs are syndicate property under convoy commercial confidentiality — he says this before you finish the question, the phrasing ready-made, a sentence he has delivered before. Without a formal override order from the Adjudicator's office, he cannot open them to an outside party. He is not apologetic about it. He goes back to the bench. The caliper is already in his hand before he reaches the worktop.`;
        addJournal('Convoy machinery logs — commercial confidentiality block', 'complication', `sun-kael-fail-${G.dayCount}`);
      } else {
        G.flags.met_kael_emberthrone = true;
        G.investigationProgress++;
        G.lastResult = `Kael pulls the requisition from the bench shelf without ceremony and reads the spec line aloud before you can ask: insulation, not for temperature regulation. "More like signal damping," he says, turning the page to show the material notations. "Not standard convoy equipment — not anything I've built for a standard customer." He's already done the comparison in his head. He sets the sheet on the bench between you and picks up a caliper, waiting for the next question.`;
        addJournal('Signal-damping container insulation produced at Sunspire — not standard equipment', 'evidence', `sun-kael-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A payment dispute over container modification work. The commissioning party's documentation is in it.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining container commission dispute with Orvak Strone');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_orvak_strone = true;
        G.investigationProgress++;
        G.lastResult = `The dispute documentation includes the original commissioning party's contact reference — a specific charter subsidiary code that matches the sealed charter buyer identified by Thalen Sunweave in Fairhaven. The commissioning party is now in default on the final payment. Orvak provides the full documentation to support the adjudication.`;
        addJournal('Container commission dispute reveals charter subsidiary code — matches Fairhaven suppression buyer', 'evidence', `sun-orvak-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Orvak sets his quill down and folds his hands over the adjudication docket. Active proceedings are confidential by charter — both parties receive notice of any external inquiry into the dispute, a rule he explains without inflection, because it is simply the rule. He logs your name and the nature of your interest in the margin register before the conversation is over. Both parties will know someone asked before the day is out. He picks the quill back up and waits for you to leave.`;
        addJournal('Trade adjudication confidential — interest logged, parties notified', 'complication', `sun-orvak-fail-${G.dayCount}`);
      } else {
        G.flags.met_orvak_strone = true;
        G.investigationProgress++;
        G.lastResult = `Orvak sets the docket on the edge of the desk where you can both read it. The commissioning party is a subsidiary charter entity — he can confirm that, and confirm the reference code was used for the work order. The ultimate principal sits behind the subsidiary structure, and identifying them requires a compliance review order from the Adjudicator's board. "The subsidiary is real. What is behind it is not recorded here." He closes the docket with both hands and squares its edge with the desk corner.`;
        addJournal('Charter subsidiary confirmed as commissioning party — principal identification requires formal order', 'evidence', `sun-orvak-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Glyph surges disrupting wildlife migration in a pattern Elyra has tracked for four months.",
    tags: ['NPC', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'reviewing ecological glyph impact data with Elyra Mossbane');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_elyra_mossbane_sun = true;
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Elyra's thumb presses the migration logbook flat while she turns pages. She exhales through her nose — small, controlled — and stops on four months back. Wildlife corridors shifted northwest across every indicator species. The shift began precisely when the Watchers Perch cave modification completed. Her thumb does not lift from the cover. "The pressure gradient is displacing the creatures. Toward the staging location." She has known the alignment longer than she has said it aloud.`;
        addJournal('Wildlife migration shifted northwest — glyph gradient displaces ecosystems toward staging location', 'evidence', `sun-elyra-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Elyra's thumb closes over the logbook cover and stays there. She exhales through her nose — small, controlled. "Ecological records are patron-family materials. Endorsement required." The book does not move under her hand. She has taken the exact same breath when other strangers asked the same thing, and she has not yet shown any of them the shifted corridor charts she keeps logged four months back.`;
        addJournal('Patron ecological records — endorsement required for access', 'complication', `sun-elyra-fail-${G.dayCount}`);
      } else {
        G.flags.met_elyra_mossbane_sun = true;
        G.investigationProgress++;
        G.lastResult = `Elyra's thumb flattens against the logbook cover while she speaks. She exhales through her nose — small, controlled. "Every indicator species has shifted northwest in the past four months. Something in the pressure gradient is wrong." Her thumb does not lift. She gestures with her other hand at a stack of copied reports on the counter. "I have filed these. No response has come back." The stack is taller than a week's worth.`;
        addJournal('Abnormal northwest migration — pressure gradient anomaly, unreported', 'evidence', `sun-elyra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A community member filed a report. Convoy handlers receiving payments from an external party.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'reviewing convoy handler payment report with Jorva Helmrune');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_jorva_helmrune_sun = true;
        G.investigationProgress++;
        G.lastResult = `Jorva squares the payment report against her desk edge before she opens it — corner to corner, a motion that does not read as deliberate unless you are watching for it. Three convoy handlers received gold payments from a representative carrying sealed charter documentation. The payments cleared immediately after the container modification work completed. "The charter description matches every other thread in this file," she says. She does not say how many other threads she has already squared against the same desk edge.`;
        addJournal('Convoy handler payments from charter-documented party — post-modification completion timing', 'evidence', `sun-jorva-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Jorva squares the closed responsibility file against her desk edge — corner to corner, without looking. "Communal council review. External access follows conclusion." The file stays squared under her palm. She does not indicate the reviewing councilor by name, and her thumb does not leave the corner she has set it on. The file has been lined up on that edge for more days than the dust on her desk suggests it should.`;
        addJournal('Communal responsibility report under council review — external access blocked', 'complication', `sun-jorva-fail-${G.dayCount}`);
      } else {
        G.flags.met_jorva_helmrune_sun = true;
        G.investigationProgress++;
        G.lastResult = `Jorva squares the handler statements against her desk edge before she reads them out — corner to corner, a gesture she does not announce. External payments to three convoy handlers are confirmed. The documentation used by the payer was described as "sealed official charter." The handlers have not been forthcoming about what the work entailed. Her thumb rests on the corner of the squared stack while she waits for the next question.`;
        addJournal('External charter payments to convoy handlers — work nature undisclosed', 'evidence', `sun-jorva-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The requisition ledger has a gap where a page was removed. Kael hasn't mentioned it.",
    tags: ['stage2', 'sunspire_haven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('charm', G.skills.persuasion);
      if (roll.total >= 13 || roll.isCrit) {
        G.flags.kael_ledger_gap_revealed = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('The Missing Page', 'Kael sets the requisition ledger on the workbench and turns away, the back of his neck reddening. The binding shows it cleanly — a razor cut through stitching, no stub left. He taps the iron clasp twice before he speaks. "Someone came back after the work was done. Said the commission had been logged wrong. I let them correct it." His thumb presses against the clasp and stays there. "I should not have let them correct it."');
        addJournal('Kael confirms a requisition page was removed post-completion by the commissioning party', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Workshop Confidentiality', 'Kael straightens the ledger and slides it to the far end of the bench. "Workshop records are syndicate property. I can confirm work was done. I cannot walk through every line with an outsider." He picks up a caliper and turns back to the bench in a way that closes the conversation.');
      }
    }
  },

  {
    label: "Glyph-scoring marks on the storehouse wall at the wrong height. Not structural, not decorative.",
    tags: ['stage2', 'sunspire_haven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13 || roll.isCrit) {
        G.flags.storehouse_glyph_marks_examined = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Scoring Marks', 'The marks run in a horizontal band along the storehouse\'s interior wall at hip height — shallow cuts in the stone, spaced too evenly for damage, too low for ward-lines. Dust has settled differently inside each groove. Taldan\'s countermeasure documentation describes exactly this: a pressure-sampling array, used to measure glyph saturation in enclosed cargo spaces. Someone ran a calibration here. The storehouse was a test environment before the containers were built.');
        addJournal('Storehouse interior shows glyph pressure-sampling array marks — calibration site for container modification work', 'discovery');
        maybeStageAdvance();
      } else {
        addNarration('Stone Damage', 'The marks could be tool drag, old ward lines, or simple wear. Without sharper reference material the distinction between deliberate scoring and incidental damage stays open. A syndicate clerk spots the examination and asks, with some edge, whether there is a problem with the storage facility.');
      }
    }
  },

  {
    label: "Sealed papers without a family endorsement mark. That kind of error draws attention here.",
    tags: ['stage2', 'sunspire_haven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('finesse', G.skills.stealth);
      if (roll.total >= 13 || roll.isCrit) {
        G.flags.sunspire_social_breach_navigated = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Wrong Seal, Right Moment', 'The market clerk\'s eyes drop to the papers and stay there a half-beat too long. The endorsement column is blank. He draws breath to speak and you step into the pause — naming the Crownmere family yard three streets north, asking about freight timing. His posture shifts. The question is familiar enough to settle him. By the time he hands the papers back, his attention has moved on, and the freight manifest on his desk — the one with the charter subsidiary stamp — remains face-up long enough to read the reference number.');
        addJournal('Charter subsidiary reference number confirmed on Sunspire freight manifest — same code as commissioning party', 'intelligence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('Logged', 'The clerk does not raise his voice. He simply asks for a family endorsement mark, writes something in his ledger, and waits. The pause stretches until retreat is the only clean option. The entry stays in his book.');
      }
    }
  },

  {
    label: "A porter's stray errand keeps ending at the same shuttered cart shed.",
    tags: ['stage2', 'sunspire_haven'],
    xpReward: 32,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('vigor', G.skills.survival);
      if (roll.total >= 13 || roll.isCrit) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('The Shed Off the Back Lane', 'The porter — name unasked, cheap tin whistle on a cord around his neck that he flicks against his collarbone every few strides — has walked you halfway there before he realizes he has walked you there. The shuttered cart shed sits behind the third textile yard, padlocked with new brass on old iron. The ground inside the lane is compacted in a pattern that says heavy convoy weight has been parked here recently, despite the shed\'s paint having weathered past two seasons. The porter flicks the whistle, once, and does not ask what you are looking at.');
        addJournal('Shuttered cart shed behind textile yard shows recent heavy-convoy compaction — padlocked with new brass', 'discovery');
        maybeStageAdvance();
      } else {
        addNarration('Wrong Lane, Wrong Time', 'The porter stops at the mouth of the back lane, flicks the tin whistle against his collarbone, and turns his body to block the turn. "Syndicate yard. Family-retained labor only past this point." He does not look directly at you while he says it. A syndicate clerk at the far end of the lane has already noticed the pause and is walking over without hurry. The porter stays where he is, whistle in hand. The conversation has been decided before it opens.');
      }
    }
  },

  {
    label: "A paperwork dispute at stall sixteen pulls a steward at noon.",
    tags: ['stage2', 'sunspire_haven'],
    xpReward: 32,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('charm', G.skills.persuasion);
      if (roll.total >= 13 || roll.isCrit) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Paperwork Clarification, Stall Sixteen', 'The clerk at stall sixteen — name patch worn, thumb bandaged from a stamp lip — keeps rotating his stamp through his fingers while he works. The disputed papers sit top of his queue: a grain manifest with two family endorsements that contradict each other on the origin yard. The dispute was filed three days ago and escalated to steward arbitration at noon. He rotates the stamp twice more. "One of these endorsements is a forged family mark. I cannot tell which." He sets the stamp down. He has already flagged it to the escalation board.');
        addJournal('Forged patron-family endorsement on grain manifest — steward arbitration scheduled noon', 'intelligence');
        maybeStageAdvance();
      } else {
        addNarration('Queue Discipline', 'The clerk rotates the stamp through his fingers without looking up. "Stall queue is twelve parties deep. External queries after the noon steward arbitration." He re-inks the stamp pad. A porter behind you audibly shifts, making the point that you are the reason the queue is not moving. The clerk\'s bandaged thumb presses the next stamp. The window has closed without opening.');
      }
    }
  },

  {
    label: "The family yard gate expects a retainer greeting I do not know how to give.",
    tags: ['stage2', 'sunspire_haven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('finesse', G.skills.stealth);
      if (roll.total >= 13 || roll.isCrit) {
        G.flags.sunspire_retainer_greeting_mirrored = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Two Knocks on the Lintel', 'The Crownmere yard gate is open at the hour a retainer would expect it closed, and the gatekeeper — a small woman with a steel-wire armband coiled three turns high on her left forearm — taps the lintel twice with the side of her ring before she speaks to the retainer ahead of you. You mirror it when your turn comes, two knuckles, same rhythm. Her armband uncoils a fraction as her shoulders drop. She lets you through to the second courtyard where convoy handlers are loading crates stamped with the charter subsidiary mark in plain sight.');
        addJournal('Crownmere yard loading crates with charter subsidiary mark in second courtyard — retainer greeting accepted', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('The Armband Tightens', 'The gatekeeper\'s steel-wire armband tightens a full coil when you skip the lintel tap and she looks at your shoulder line, not your face, for a full breath. "The yard is holding at retainer-only hours." Her ring is still against the lintel wood. She does not move it. A second retainer inside the courtyard has already set down his load and is walking toward the gate. You are outside before he reaches it. Your description goes into the yard log without you seeing the page.');
      }
    }
  },

  {
    label: "The charter exemption number she cited was written for diplomatic pouches, not bulk cargo.",
    tags: ['Stage2', 'Lore'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining sealed container weight exemption with shipping clerk');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_weight_exemption_traced = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The clerk — Bessa, her name burned into the station plate at her elbow — sets the exemption index flat and runs her finger to the column without being asked. Charter class 7-F: diplomatic sealed correspondence, weight not declared for security of state. The sealed containers are listed as 7-F on every northern convoy manifest for the past six months. She turns the index so you can read the weight threshold for 7-F: twelve pounds. The containers moving through Sunspire's staging yard run between four hundred and nine hundred pounds each. Her finger stays on the threshold line.`;
        addJournal('Northern convoy containers claim 7-F diplomatic exemption — weight threshold exceeded by 75x', 'evidence', `sun-weight-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Bessa closes the exemption index and sets it square with the station edge. "Exemption classification queries go to the Adjudicator's office, not staging clerks." Her tone does not rise. She writes something in her station log — the date, the nature of the query — and caps the ink without looking up. The entry is made before you have turned to leave. Her supervisor's office is visible through the glass partition, and the supervisor has already lifted his eyes from his own work.`;
        addJournal('Weight exemption query logged at staging station — supervisor notified', 'complication', `sun-weight-fail-${G.dayCount}`);
      } else {
        G.flags.sun_weight_exemption_traced = true;
        G.investigationProgress++;
        G.lastResult = `Bessa pulls the index without ceremony and opens it to class 7-F. Diplomatic sealed correspondence. She reads the threshold aloud — twelve pounds — and then looks at the staging manifest on her desk without touching it. "I cite the number because the paperwork requires a citation. The paperwork has always required a citation." She closes the index. She does not say that the discrepancy is obvious, because she has already decided not to be the one who says it.`;
        addJournal('7-F diplomatic exemption applied to bulk cargo — staging clerk aware of weight discrepancy', 'intelligence', `sun-weight-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The backup archive was last accessed the week the suppression requests started.",
    tags: ['Stage2', 'Stealth'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing Knowledge Registry backup access logs');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_backup_archive_traced = true;
        G.investigationProgress++;
        G.stageProgress[2]++;
        G.lastResult = `The off-site archive sits in a stone outbuilding behind the main registry — door unlocked, visitor log hanging inside on a peg. Six months back, one entry: a name written in a hand that presses hard enough to groove the page, followed by a charter reference number and the word "compliance." The date is three days before the first suppression request arrived at Taldan's desk. The same charter reference number runs through the container modification work orders. The visitor's name is not in any local family roll.`;
        addJournal('Backup archive accessed 3 days before first suppression request — same charter ref as container work orders', 'evidence', `sun-backup-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The outbuilding door opens onto a clerk who was not expected to be there — Taldan's junior archivist, cataloguing by lamplight. She does not ask what you are doing. She writes the time in her own log, notes the visitor, and goes back to cataloguing. Her log entry will reach Taldan's desk in the morning report. The visitor log on the peg is visible but she has moved her lamp between you and it without appearing to do so deliberately.`;
        addJournal('Backup archive visit logged by junior archivist — Taldan notified by morning', 'complication', `sun-backup-fail-${G.dayCount}`);
      } else {
        G.flags.sun_backup_archive_traced = true;
        G.investigationProgress++;
        G.lastResult = `The visitor log shows one entry in the last year — six months back, a charter reference and the notation "compliance review." The date is close to when Taldan's suppression files start. The name attached to the visit is written in careful block letters, not cursive, which is unusual for registry procedure. Whether the name is real or assumed cannot be determined from the log alone, but the charter reference number is legible and matches at least one number already in the file.`;
        addJournal('Off-site archive: one visitor six months ago, charter ref matches existing file — name unverified', 'intelligence', `sun-backup-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The withdrawn contract dispute has a reference number and no resolution on file.",
    tags: ['Stage2', 'Persuasion'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracing withdrawn contract dispute in Elyra Mossbane patronage portfolio');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_mossbane_dispute_traced = true;
        G.flags.met_elyra_mossbane_sun = true;
        G.investigationProgress++;
        G.lastResult = `Elyra sets her hand flat on the patronage ledger and does not open it. "Researcher Lenn Orvaith filed a contract dispute two months ago and withdrew it three days later. The reference number exists. The resolution does not." Her thumbnail finds the ledger's spine and stays there. "Orvaith's funded research was on glyph pressure dispersal. It went quiet at the same time the dispute closed." She looks at a point past your shoulder. "I have not heard from him since the withdrawal."`;
        addJournal('Mossbane patronage: Orvaith withdrew dispute 3 days after filing — glyph dispersal research went silent same week', 'evidence', `sun-dispute-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Elyra's hand closes the ledger before the question finishes. "Patronage portfolio matters are patron-family private." Her thumbnail finds the spine and stays there. "The researcher in question withdrew the dispute voluntarily. That is the record." She exhales through her nose — small, controlled — and the ledger does not move again. The conversation has a shape she has given to it, and she is holding that shape until you leave.`;
        addJournal('Mossbane declined to discuss withdrawn researcher dispute — portfolio private', 'complication', `sun-dispute-fail-${G.dayCount}`);
      } else {
        G.flags.sun_mossbane_dispute_traced = true;
        G.flags.met_elyra_mossbane_sun = true;
        G.investigationProgress++;
        G.lastResult = `Elyra opens the ledger to the dispute entry and taps the reference number with one finger. A funded researcher filed, then withdrew three days later. No resolution record. The research topic — glyph pressure work — is listed as "suspended pending review." She keeps her finger on the entry. "I do not know why it was withdrawn. I know the researcher did not contact me before he withdrew it." She closes the ledger with both hands, squaring the cover.`;
        addJournal('Mossbane ledger: glyph research dispute withdrawn without patron contact — research suspended', 'intelligence', `sun-dispute-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The sealed bay was listed as testing infrastructure. The question is what it is testing.",
    tags: ['Stage2', 'Survival'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining sealed component bay in machinery section');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_sealed_bay_examined = true;
        G.flags.met_kael_emberthrone = true;
        G.investigationProgress++;
        G.lastResult = `The bay door is unlocked — Kael has not said this, but he has also not said otherwise. Inside: a low stone table, glyph-scored in a grid pattern across the surface, with brass anchor points at each corner. The scoring is the same depth and spacing as the marks in the grain storehouse wall. A pressure-sampling array, full scale. The anchor points match the external dimensions of the modified containers. The bay was not built to test infrastructure. It was built to calibrate the containers to a specific glyph saturation threshold before they shipped north.`;
        addJournal('Sealed bay: full-scale glyph pressure calibration rig, container-matched anchor points — purpose was pre-shipment calibration', 'evidence', `sun-bay-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Kael's hand finds the bay door before you reach it — not blocking, simply present, the flat of his palm against the panel. "ORE-adjacent construction permit means ORE inspection rights. An outside party in that space during an active permit window creates a compliance flag for the whole facility." He does not raise his voice. He is explaining procedure, and the procedure is the lock. A compliance flag affects every other operation under his oversight. He waits for you to step back.`;
        addJournal('Sealed bay access refused — ORE inspection rights invoked, compliance flag risk cited', 'complication', `sun-bay-fail-${G.dayCount}`);
      } else {
        G.flags.sun_sealed_bay_examined = true;
        G.flags.met_kael_emberthrone = true;
        G.investigationProgress++;
        G.lastResult = `The bay is narrow, stone-floored, with a low table at center and a set of brass anchor points spaced along its edges. The anchor point spacing is wider than standard workshop fixtures. The table surface carries shallow scoring in a grid — not random wear, too even. Kael stands at the door and says nothing, which is its own answer. The dimensions of the anchor point array are close enough to the container specs in his requisition records to ask whether they are the same.`;
        addJournal('Sealed bay contains brass anchor array matching container dimensions — table scoring consistent with pressure calibration', 'intelligence', `sun-bay-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Researcher Orvaith left tools in his funded workspace. The tools are still there.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining Lenn Orvaith abandoned research workspace');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_orvaith_workspace_examined = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The funded workspace is a narrow stone room behind the Knowledge Registry's secondary reading hall — two benches, a slate board, a row of glass measuring vessels still clouded with dried reagent residue. The residue profile is specific: glyph pressure dispersal medium, the formulation Orvaith was authoring countermeasures for. On the slate board, half-erased: a pressure threshold number and the notation "container volume ~850 lbs." He calculated the container weight before he disappeared. His tools remain because nobody was authorized to remove them.`;
        addJournal('Orvaith workspace: dispersal reagent residue + container weight calculation still on slate board', 'evidence', `sun-orvaith-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The workspace is locked — patron funding suspension triggers a standard access closure pending portfolio review. A junior archivist is cataloguing the room's contents through the door's glass pane without entering; he notes your presence and the time before you have finished reading the closure notice. The inventory is being conducted under Elyra Mossbane's patronage review authorization. Her name is at the top of the closure form.`;
        addJournal('Orvaith workspace locked under patronage review — contents inventoried, presence noted', 'complication', `sun-orvaith-fail-${G.dayCount}`);
      } else {
        G.flags.sun_orvaith_workspace_examined = true;
        G.investigationProgress++;
        G.lastResult = `The workspace door is unlocked — the closure paperwork has not caught up to the room yet. The slate board carries partial notation in a small, dense hand: threshold values for glyph pressure dispersal, a column of container weight estimates. The glass vessels on the bench are residue-clouded, not cleaned. Whatever Orvaith was building toward, he left in the middle of a working session rather than at a natural stopping point.`;
        addJournal('Orvaith workspace: pressure threshold notation and container weight estimates — abandoned mid-session', 'intelligence', `sun-orvaith-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Twelve days in the convoy log with no notation where daily entries should be.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'examining north gate convoy exit log gap with road warden');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_north_gate_log_examined = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The warden — Pelsa, name stitched on the shoulder of his post coat — sets the convoy log flat and opens it to the gap without being asked. Twelve days of blank entry columns, each one bearing only a single stamp impression rather than the full transit record: convoy weight, cargo classification, charter reference. The stamp code used during those twelve days is a Roadwarden protocol override designation — used only when cargo is moving under sealed charter inspection exemption. The exemption code matches the 7-F diplomatic classification Bessa cited. It was applied to weight-range entries that should have been 400 to 900 pounds.`;
        addJournal('North gate: 12-day 7-F override logs confirm heavy exempt cargo — same charter code as staging manifests', 'evidence', `sun-gate-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Pelsa closes the log before the spine opens fully. "Transit records under active charter exemption stay with the Adjudicator's office during the review window." His stamp is already in his hand. He is not hostile, but he has given this answer before, to people whose purposes he did not ask about. He logs the query with a date stamp before you have reached the bottom of the post steps.`;
        addJournal('North gate log access blocked — active charter exemption review period', 'complication', `sun-gate-fail-${G.dayCount}`);
      } else {
        G.flags.sun_north_gate_log_examined = true;
        G.investigationProgress++;
        G.lastResult = `Pelsa opens the log to the gap and keeps his thumb on the edge of the page rather than pointing directly at anything. "Protocol override stamp. Used when the Adjudicator's office has already logged the transit." He turns the page. "These entries have the stamp but no corresponding Adjudicator log number in the margin." He closes the log and sets it square with the desk corner. He does not say what that means because he does not want to be on record as saying it.`;
        addJournal('North gate: override stamps with no Adjudicator log numbers — procedural gap confirmed', 'intelligence', `sun-gate-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The communal grain count and the storehouse physical stock are two different numbers.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reconciling communal grain stock discrepancy with Jorva Helmrune');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_grain_stock_discrepancy = true;
        G.flags.met_jorva_helmrune_sun = true;
        G.investigationProgress++;
        G.lastResult = `Jorva squares the physical count sheet against her desk edge, corner to corner, before she holds it next to the registry total. A twelve-percent shortfall across six months. She sets both documents flat and keeps a hand on each. "The storehouse was used as testing infrastructure during the container calibration period. Floor space taken for the array means stack capacity reduced." She pauses. "The grain displacement was never logged as a temporary operational change. It was absorbed into the normal variance column." Twelve percent of Sunspire's communal grain reserve was displaced and not reported.`;
        addJournal('Grain shortfall 12% over 6 months — storehouse calibration use displaced supply, absorbed into variance', 'evidence', `sun-grain-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Jorva squares the responsibility log before she looks up. "Stock variance review is a full communal audit process. An outside party flagging a variance number before a formal request has been filed creates a preliminary record." Her thumb does not move from the corner of the log. The preliminary record goes into the same chain as the handler payment file she was already managing. She does not tell you whether that makes things easier or harder.`;
        addJournal('Grain variance flagged — preliminary communal audit record opened', 'complication', `sun-grain-fail-${G.dayCount}`);
      } else {
        G.flags.sun_grain_stock_discrepancy = true;
        G.flags.met_jorva_helmrune_sun = true;
        G.investigationProgress++;
        G.lastResult = `Jorva squares both documents against the desk edge before she compares them. Physical count is lower than the registry total — consistently, across the last two complete reporting cycles. She sets her hand flat on the count sheet. "A discrepancy this consistent is not measurement error." She pulls a separate form from the drawer: a communal resource displacement report, blank, date-ready. She has not yet decided whether to file it.`;
        addJournal('Grain stock vs registry: consistent discrepancy across 2 cycles — Jorva has blank displacement report ready', 'intelligence', `sun-grain-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The handler who took the external payment has avoided the common house for a month.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'locating and speaking with avoiding convoy handler');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_handler_testimony_secured = true;
        G.investigationProgress++;
        G.lastResult = `His name is Tavar Brenn, and he eats at the secondary supply station now, away from the common house benches. He picks a loose thread from his sleeve hem before he speaks — works it between two fingers without pulling. "The work was loading. Lifting the containers onto the staging frames, nothing else." Then, after a pause: "The containers had a sound. When we moved them. Not liquid, not solid. More like packed powder settling." He drops the thread. "I did not ask what the powder was. I was told not to ask." He does not meet your eyes after that.`;
        addJournal('Handler Tavar Brenn: containers held packed powder, not liquid — told not to ask about contents', 'evidence', `sun-handler-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Tavar Brenn sees the approach before it arrives. He sets his meal down and stands without finishing it, taking the secondary lane toward the textile yard — the route that stays away from the main market. Someone at the communal common house has noticed the exchange, noted the direction, and gone still in the way people go still when they are deciding whether to report what they observed. The handler does not look back.`;
        addJournal('Handler Tavar Brenn evaded approach — observer noted, may report', 'complication', `sun-handler-fail-${G.dayCount}`);
      } else {
        G.flags.sun_handler_testimony_secured = true;
        G.investigationProgress++;
        G.lastResult = `Tavar Brenn picks a thread from his sleeve hem and works it without pulling while he decides what to say. "Loading work. Nothing I was not told to do." He sets the thread down. "The containers were heavier than the documentation said they were." He does not elaborate on how he knew what the documentation said. He finishes the meal and leaves without being dismissed, and the thread is still on the table.`;
        addJournal('Handler confirms containers heavier than documentation declared — aware of documentation', 'intelligence', `sun-handler-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The night watch rotation during the container work ran four handlers instead of two.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'cross-checking night watch rotation against handler payment records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_watch_rotation_examined = true;
        G.investigationProgress++;
        G.lastResult = `The watch rotation board hangs in the handlers' staging anteroom, updated in chalk. The six-week window of container modification work shows double staffing on every night shift, logged under a communal "facility inspection assistance" notation that does not correspond to any standard watch protocol. The four handlers listed during that window are the same three from Jorva's payment report plus one additional name — not in the payment file, not cross-referenced anywhere else. A fourth handler was involved who was not paid through the external party's charter documentation.`;
        addJournal('Night watch: double-staffed under "facility inspection" label — 4th handler present not in payment record', 'evidence', `sun-watch-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The anteroom is handlers-only, and the door is not locked but it is closed, which carries the same weight here. A senior handler inside calls through the door before it opens — he has heard someone at the latch — and the question of who is asking and for what purpose precedes every other exchange. He writes something on the interior board before he steps into the doorway. The chalk sound is audible through the panel.`;
        addJournal('Handlers anteroom access refused — presence logged before entry attempted', 'complication', `sun-watch-fail-${G.dayCount}`);
      } else {
        G.flags.sun_watch_rotation_examined = true;
        G.investigationProgress++;
        G.lastResult = `The rotation board shows the modification period as double-staffed night watch under a nonstandard notation. The names are in chalk and the board is a working document — they will be wiped when the next rotation cycle posts. Three of the four names are already in Jorva's payment file. The fourth is a staging hand whose name appears only in this six-week window and nowhere before or after it.`;
        addJournal('Rotation board: 4th handler name appears only during container work window — not in payment file', 'intelligence', `sun-watch-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Elyra's logbook has pages she did not include in her official filings.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'reviewing Elyra Mossbane unsubmitted ecological field readings');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_elyra_unsubmitted_data = true;
        G.flags.met_elyra_mossbane_sun = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Elyra's thumb stays on the logbook cover for a full breath before she opens it past the last submitted page. The unsubmitted section runs eight weeks. Glyph pressure readings taken at dawn, at the field perimeter, every three days — not a standard ecological metric, but she has a portable resonance gauge she adapted from a forestry instrument. The readings spike every time the night convoy movement logs show activity at the staging yard. She exhales through her nose, small and controlled. "I did not file these because filing them requires me to explain how I know what the spikes correspond to, and that explanation implicates the charter subsidiary."`;
        addJournal('Mossbane: unsubmitted 8-week glyph pressure readings spike with convoy movement — she withheld to avoid implicating subsidiary', 'evidence', `sun-elyra2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Elyra's thumb does not move from the logbook cover, and after a moment she picks up the book and sets it on the shelf behind her rather than the desk. "Patron-family ecological records are not released to external parties without endorsement." Her exhale is small and controlled. She has decided something just now — the decision has made her posture more deliberate, not less. The logbook is behind her and she has not put her back to it.`;
        addJournal('Elyra declined to open unsubmitted logbook section — moved it from desk', 'complication', `sun-elyra2-fail-${G.dayCount}`);
      } else {
        G.flags.sun_elyra_unsubmitted_data = true;
        G.flags.met_elyra_mossbane_sun = true;
        G.investigationProgress++;
        G.lastResult = `Elyra opens the logbook past the last submitted entry and holds it open without narrating the contents. The entries visible are marked with small field-notation codes alongside the ecological data — a secondary column, not standard patrol format. Her thumb finds the spine. "I kept more than I filed." She does not say why, but the field notation codes appear in a consistent pattern alongside the dates of the container modification work.`;
        addJournal('Mossbane logbook: secondary notation column alongside container work dates — unfiled field data confirmed', 'intelligence', `sun-elyra2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The suppression requests were drafted somewhere — Taldan's junior assistant remembers the handwriting.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'tracing suppression request authorship through Taldan junior assistant');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_suppression_author_identified = true;
        G.investigationProgress++;
        G.lastResult = `The junior assistant — Mirren, inked fingers, a stamp-callus ridge on her right ring finger — sets the first suppression request on the desk and reads it once before she speaks. "This hand slopes left. Not a Sunspire writing posture — we train right-forward here. This was written by someone schooled in a coastal registry style. Cosmouth, possibly Shirsh." She sets the next one beside it. "Same hand. All fourteen, same hand." She aligns them corner to corner on the desk, a precise row. "The 'Commission' letterhead was pressed, not stamped — a portable press. Not an institutional office."`;
        addJournal('Suppression requests: coastal registry handwriting, portable press letterhead — author not locally based', 'evidence', `sun-author-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Mirren sets her stamp down and looks at the suppression file that Taldan has left visible on his desk. "Those files are under Taldan's review authority." She does not move toward them. "I log intake. I don't analyze correspondence from parties external to the registry." She pulls her own log toward her and enters the time of the query. Her ink is fresh and the entry is legible from where you are standing.`;
        addJournal('Junior assistant declined suppression request analysis — query logged', 'complication', `sun-author-fail-${G.dayCount}`);
      } else {
        G.flags.sun_suppression_author_identified = true;
        G.investigationProgress++;
        G.lastResult = `Mirren reads the first suppression request without touching it and tilts her head. "The slope is wrong for a local hand. We write right-forward here." She moves to the second request and the third. "Same person. Not from Sunspire, not trained here." She sets the stamp callus on her ring finger against the edge of the page without pressing it. "The letterhead looks pressed, not institutional. Portable equipment." She steps back and leaves the comparison to you.`;
        addJournal('Suppression requests: non-local hand, portable press letterhead — external author confirmed', 'intelligence', `sun-author-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The charter subsidiary's local agent signed three documents in Sunspire before the modification work began.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing charter subsidiary local agent signature through Orvak Strone records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_local_agent_identified = true;
        G.flags.met_orvak_strone = true;
        G.investigationProgress++;
        G.lastResult = `Orvak places three charter documents on the desk in sequence, each bearing the subsidiary code confirmed earlier and a secondary signature line below the principal's seal. The secondary signature is the same across all three — a local agent authorization, required under Sunspire's charter entry protocol. The name in the signature line: Dennov Cray. Not in any Sunspire family roll, not in the handler payment record, not connected to any of the named parties so far. Orvak slides a blank contact-report form across the desk. "The protocol requires me to log this conversation. It does not require me to prevent the next one."`;
        addJournal('Charter subsidiary local agent: Dennov Cray — signed 3 pre-modification charter entries, no Sunspire affiliation', 'evidence', `sun-agent-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Orvak sets his quill down before you finish the phrasing. "Signatory identification from charter documents requires a formal compliance review filing." He folds his hands over the document stack. "A verbal inquiry about a named signatory on an active charter creates a notification obligation to that signatory's registered address." He has said the second sentence before you have processed the first. The filing is required. The notification goes out automatically. The conversation is the filing.`;
        addJournal('Local agent inquiry triggers signatory notification — Adjudicator protocol invoked', 'complication', `sun-agent-fail-${G.dayCount}`);
      } else {
        G.flags.sun_local_agent_identified = true;
        G.flags.met_orvak_strone = true;
        G.investigationProgress++;
        G.lastResult = `Orvak opens the charter entry file to the secondary signature line and sets a finger alongside it without covering the name. "An external agent is permitted to sign on behalf of a subsidiary principal under entry protocol." The name is legible. He closes the file and squares it with the desk edge. "I am not authorized to provide further biographical detail on charter signatories. The name is in the public entry record."`;
        addJournal('Charter entry record: local agent name identified in public secondary signature — no further detail available', 'intelligence', `sun-agent-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Sunspire is an operation infrastructure node. Shut it down formally or neutralize it quietly.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 104,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(104, 'Sunspire Haven Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The documentation is incomplete. The subsidiary charter, the container modification records, the suppression requests — they point in the same direction, but the chain between them has gaps. Presenting this to the Patron-Family council or releasing it publicly without a closed chain gives the other side room to discredit the pieces rather than answer the whole. More threads need to be followed before the next move.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `The full dossier goes to the Patron-Family council in sequence: suppression requests from a non-existent authority, container modification specs, convoy handler payments, the calibration marks in the storehouse. Two council members read it through twice without speaking. The charter subsidiary's operational access is suspended before the session closes, and the matter is formally referred to Roadwarden oversight. What began as an internal irregularity is now a Patron-Family record with teeth.`;
        addJournal('Sunspire S2 finale: Patron-Family council suspends charter subsidiary access', 'evidence', `sun-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The suppression list goes to Taldan Veyst before the Patron-Family route closes — fourteen requests, fake regulatory authority, targeted countermeasure documentation, all of it. Taldan reads it standing at his desk and begins the publication process before you have left the building. By evening, every document the fake authority tried to suppress is in the Knowledge Registry's open stack. Every locality in the northern circuit receives copies by courier within forty-eight hours. The suppression campaign has now produced the opposite of its intended effect.`;
        addJournal('Sunspire S2 finale: suppressed countermeasure docs published via Knowledge Registry', 'evidence', `sun-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.SUNSPIRE_HAVEN_STAGE2_ENRICHED_CHOICES = SUNSPIRE_HAVEN_STAGE2_ENRICHED_CHOICES;
