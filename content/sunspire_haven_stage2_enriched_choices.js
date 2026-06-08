/**
 * SUNSPIRE HAVEN STAGE 2 ENRICHED CHOICES
 * Investigation arc: northern convoy route staging / magical knowledge registry suppression
 * NPCs: Elyra Mossbane (Patron of Forests), Kael Emberthrone (Machinery Overseer),
 *       Orvak Strone (Trade Adjudicator), Jorva Helmrune (Communal Responsibility),
 *       Taldan Veyst (Magical Knowledge Overseer)
 */

var SUNSPIRE_HAVEN_STAGE2_ENRICHED_CHOICES = [

  {
    label: "The altitude staging manifest has a week gap where nothing moved.",
    tags: ['Investigation', 'Stage2'],
    plot: 'main',
    skill: 'wits',
    stageProgress: 1,
    xpReward: 40,
    failResult: 'The dispatch log uses a sealed charter reference you cannot open without authorization. The week disappears behind procedural access controls.',
    fn: function() {
      advanceTime(1);
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      var result = rollD20('wits');
      if (result.isCrit || result.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
        G.lastResult = 'The staging manifest has a seven-day gap — no departures, no arrivals, no weather notation to explain it. Kael signs the surrounding entries but not the blank week. The gap ends on the same date the suppression request pattern in the knowledge registry begins. Whatever used Sunspire during that week left no record of doing so. The cold air off the high plain keeps the manifest pages dry and undamaged. The absence is deliberate — and deliberate gaps in a signed log carry their own weight.';
        addJournal('Sunspire staging: 7-day manifest gap, no weather explanation, coincides with suppression request pattern start', 'evidence', 'sun-manifest-gap-' + (G.dayCount||0));
        if (typeof gainXp === 'function') gainXp(40);
      } else {
        G.lastResult = 'The dispatch log entry carries a sealed charter reference in the margin — a string of institutional codes that blocks further access without formal clearance. You copy the code. The clerk behind the counter watches the copy without comment, then turns back to her ledger. The filing desk has a stamp on it that reads "Charter Office — Third Ring." You note the floor number. The corridor back out is long.';
        if (typeof gainXp === 'function') gainXp(15);
      }
    }
  },

  {
    label: "A knowledge overseer keeps filing refusals into a register no one reads.",
    tags: ['NPC', 'Investigation', 'Stage2'],
    plot: 'main',
    skill: 'charm',
    stageProgress: 1,
    xpReward: 40,
    failResult: 'Taldan acknowledges the meeting in his register before you have said anything substantive. The log goes to his supervisory chain.',
    fn: function() {
      advanceTime(1);
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      var result = rollD20('charm');
      if (result.isCrit || result.total >= 12) {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
        G.lastResult = 'Taldan has been waiting for someone who would ask the right question. He pulls a folder from a locked drawer — his personal copy of the refusals, not the institutional file. Fourteen requests, each citing the same nonexistent authority. He did not comply. He also did not report upward. He says: whoever issued these expected compliance, not a paper trail. He has been building the paper trail anyway.';
        addJournal('Taldan keeps personal refusal copies — 14 requests, same fake authority, building own evidence record', 'evidence', 'sun-taldan-main-' + (G.dayCount||0));
        if (typeof gainXp === 'function') gainXp(40);
      } else {
        G.lastResult = 'Taldan enters the meeting in his register before you have said anything of substance. The pen moves precisely: date, time, nature of inquiry (listed as "general archival request"), your name spelled in the formal register. He answers what you ask and nothing more. Each answer closes a door. When you leave, the register stays open on his desk, the entry still drying. He is not protecting himself. He is protecting something specific.';
        if (typeof gainXp === 'function') gainXp(15);
      }
    }
  },

  {
    label: "Suppression requests citing a non-existent regulatory authority. The registry keeps receiving them.",
    plot: 'main',
    tags: ['Investigation', 'Stage2'],
    xpReward: 76,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'investigating knowledge suppression requests with Taldan Veyst');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
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
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Taldan confirms the requests without prompting — he's been expecting someone to ask. "An authority I cannot verify in three major legal registers is not an authority." He taps the file. Multiple requests, same fake citation, same pattern of targeted documentation. He has not complied with any of them. The refusals are logged carefully, each one cross-referenced to the register checks he ran. He has been building a record on the assumption that the record would eventually matter.`;
        addJournal('Suppression requests from unverified authority — Taldan declined compliance', 'evidence', `sun-taldan-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Convoy modification requisitions matching suppression compound transport container descriptions.",
    tags: ['NPC', 'Craft', 'Stage2'],
    xpReward: 72,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'examining convoy modification requisitions with Kael Emberthrone');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_kael_emberthrone = true;
        G.investigationProgress++;
        G.lastResult = `Kael's requisition records show custom-built container insulation equipment — specifically designed to mask chemical compound signatures during standard cargo inspection. The work was commissioned by a party using the same sealed charter reference that appears throughout the record trail. The modification work ran for six weeks. Sunspire's convoy infrastructure was used as a modification workshop for the transport containers, at altitude, away from the port inspectors who would have recognized the equipment's purpose.`;
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A payment dispute over container modification work. The commissioning party's documentation is in it.",
    tags: ['NPC', 'Persuasion', 'Stage2'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining container commission dispute with Orvak Strone');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_orvak_strone = true;
        G.investigationProgress++;
        G.lastResult = `The dispute documentation includes the original commissioning party's charter subsidiary code — a reference that matches the sealed charter buyer identified by Thalen Sunweave in Fairhaven. The commissioning party is now in default on the final payment, and the adjudication file is a matter of public record. Orvak provides the full documentation without hesitation, squaring the pages against the desk edge as he hands them across. The cold at altitude carries its own weight in a room this quiet.`;
        addJournal('Container commission dispute reveals charter subsidiary code — matches Fairhaven suppression buyer', 'evidence', `sun-orvak-${G.dayCount}`);
      } else if (result.isFumble) {
        addHeat('soreheim', 1);
        G.lastResult = `Orvak sets his quill down and folds his hands over the adjudication docket. Active proceedings are confidential by charter — both parties receive notice of any external inquiry into the dispute, a rule he explains without inflection, because it is simply the rule. He logs your name and the nature of your interest in the margin register before the conversation is over. Both parties will know someone asked before the day is out. He picks the quill back up and waits for you to leave.`;
        addJournal('Trade adjudication confidential — interest logged, parties notified', 'complication', `sun-orvak-fail-${G.dayCount}`);
      } else {
        G.flags.met_orvak_strone = true;
        G.investigationProgress++;
        G.lastResult = `Orvak sets the docket on the edge of the desk where you can both read it. The commissioning party is a subsidiary charter entity — he can confirm that, and confirm the reference code was used for the work order. The ultimate principal sits behind the subsidiary structure, and identifying them requires a compliance review order from the Adjudicator's board. "The subsidiary is real. What is behind it is not recorded here." He closes the docket with both hands and squares its edge with the desk corner.`;
        addJournal('Charter subsidiary confirmed as commissioning party — principal identification requires formal order', 'evidence', `sun-orvak-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Glyph surges disrupting wildlife migration in a pattern Elyra has tracked for four months.",
    plot: 'main',
    tags: ['NPC', 'Survival', 'Stage2'],
    xpReward: 66,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'reviewing ecological glyph impact data with Elyra Mossbane');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_elyra_mossbane_sun = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A community member filed a report. Convoy handlers receiving payments from an external party.",
    tags: ['NPC', 'Lore', 'Stage2'],
    xpReward: 64,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'reviewing convoy handler payment report with Jorva Helmrune');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
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
      var roll = rollD20('charm', G.skills.charm);
      if (roll.total >= 13 || roll.isCrit) {
        G.flags.kael_ledger_gap_revealed = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('The Missing Page', 'Kael sets the requisition ledger on the workbench and turns away, the back of his neck reddening. The binding shows it cleanly — a razor cut through the stitching, no stub left. Cold comes through the workshop wall at this altitude; his exhale is faintly visible. He taps the iron clasp twice before he speaks. "Someone came back after the work was done. Said the commission had been logged wrong. I let them correct it." His thumb presses against the clasp and stays there. "I should not have let them correct it."');
        addJournal('Kael confirms a requisition page was removed post-completion by the commissioning party', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Workshop Confidentiality', 'Kael straightens the ledger and slides it to the far end of the bench. "Workshop records are syndicate property. I can confirm work was done. I cannot walk through every line with an outsider." He picks up a caliper and turns back to the bench in a way that closes the conversation. The cold at altitude makes the iron of the bench clamp visible in contrast to the warmed stone wall. The ledger stays at the far end.');
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
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 13 || roll.isCrit) {
        G.flags.storehouse_glyph_marks_examined = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Scoring Marks', 'The marks run in a horizontal band along the storehouse\'s interior wall at hip height — shallow cuts in the dry stone, spaced too evenly for damage, too low for ward-lines. Dust has settled differently inside each groove, undisturbed by the wind that moves through the high-plain gaps in the eaves. Taldan\'s countermeasure documentation describes exactly this: a pressure-sampling array, used to measure glyph saturation in enclosed cargo spaces. Someone ran a calibration here, at altitude, before the containers were built. The storehouse was a test environment.');
        addJournal('Storehouse interior shows glyph pressure-sampling array marks — calibration site for container modification work', 'discovery');
        maybeStageAdvance();
      } else {
        addNarration('Stone Damage', 'The marks could be tool drag, old ward lines, or simple wear. Without sharper reference material the distinction between deliberate scoring and incidental damage stays open. Dry wind moves through the eave gaps at this altitude, carrying the smell of warmed stone. A syndicate clerk spots the examination and asks, with some edge, whether there is a problem with the storage facility. He writes the time and a description in a pocket log before he moves on.');
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
      var roll = rollD20('finesse', G.skills.finesse);
      if (roll.total >= 13 || roll.isCrit) {
        G.flags.sunspire_social_breach_navigated = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Wrong Seal, Right Moment', 'The market clerk\'s eyes drop to the papers and stay there a half-beat too long. The endorsement column is blank. Cold dry air moves through the market stall gap at his back. He draws breath to speak and you step into the pause — naming the Crownmere family yard three streets north, asking about freight timing in the altitude-specific phrasing that marks a local. His posture shifts. The question is familiar enough to settle him. By the time he hands the papers back, his attention has moved on, and the freight manifest on his desk — the one with the charter subsidiary stamp — remains face-up long enough to read the reference number.');
        addJournal('Charter subsidiary reference number confirmed on Sunspire freight manifest — same code as commissioning party', 'intelligence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('Logged', 'The clerk does not raise his voice. He simply asks for a family endorsement mark, writes something in his ledger, and waits. The pause stretches until retreat is the only clean option. The sound of the watchtower wind is audible through the market wall at this altitude, thin and constant. The entry stays in his book. The wax of the altitude-adapted seal on the counter beside him has dried to a pale ring.');
      }
    }
  },

  {
    label: "A porter's stray errand keeps ending at the same shuttered cart shed.",
    tags: ['stage2', 'sunspire_haven'],
    xpReward: 32,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('vigor', G.skills.vigor);
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
      var roll = rollD20('charm', G.skills.charm);
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
      var roll = rollD20('finesse', G.skills.finesse);
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
    plot: 'main',
    tags: ['Stage2', 'Lore'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining sealed container weight exemption with shipping clerk');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The backup archive was last accessed the week the suppression requests started.",
    plot: 'main',
    tags: ['Stage2', 'Stealth'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing Knowledge Registry backup access logs');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
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
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
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
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Researcher Orvaith left tools in his funded workspace. The tools are still there.",
    plot: 'main',
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Twelve days in the convoy log with no notation where daily entries should be.",
    plot: 'main',
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'examining north gate convoy exit log gap with road warden');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The communal grain count and the storehouse physical stock are two different numbers.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reconciling communal grain stock discrepancy with Jorva Helmrune');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The handler who took the external payment has avoided the common house for a month.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'locating and speaking with avoiding convoy handler');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The night watch rotation during the container work ran four handlers instead of two.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'cross-checking night watch rotation against handler payment records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Elyra's logbook has pages she did not include in her submitted filings.",
    plot: 'main',
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'reviewing Elyra Mossbane unsubmitted ecological field readings');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The suppression requests were drafted somewhere — Taldan's junior assistant remembers the handwriting.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'tracing suppression request authorship through Taldan junior assistant');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The charter subsidiary's local agent signed three documents in Sunspire before the modification work began.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing charter subsidiary local agent signature through Orvak Strone records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The suppression requests targeted the same countermeasure the Compact developed.",
    plot: 'main',
    tags: ['Stage2', 'Lore', 'Arcane'],
    xpReward: 76,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'connecting suppression requests to Resonance Compact countermeasure research');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags.arcane_contact_1) {
        G.lastResult = 'The pattern in Taldan\'s suppression files is clear — targeted documentation, not broad censorship. Fourteen requests, a fake regulatory authority, all of it pointing at the same narrow category of countermeasure knowledge. The dry air off the high-plain carries the smell of warmed stone through the registry window. But the connection to any specific practitioner group requires a thread that has not yet surfaced here. There is more to find in the other localities before this line opens.';
        return;
      }
      var result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.total >= 13 || result.isCrit) {
        G.flags.arcane_contact_2 = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Taldan lays the fourteen suppression requests out in sequence and you set the Compact\'s practitioner mark beside the relevant paper titles. Every document the fake Northern Glyph Oversight Commission tried to suppress is a countermeasure paper. Not glyph theory broadly — specifically the dispersal methods the Compact\'s pre-classification research made possible. Taldan\'s finger traces the list. "Someone knew exactly which papers would make glyph pressure engineering reversible." He looks at the practitioner mark. "And exactly who had authored the methods to reverse it."';
        addJournal('Suppression list targets Resonance Compact countermeasure papers specifically — knowledge of practitioner authorship confirmed', 'intelligence');
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The visitor log entry from the earlier inquiry surfaces during this conversation — Taldan\'s junior archivist has already flagged the cross-reference attempt. The connection between the suppression list and any practitioner group is a conclusion Taldan cannot officially endorse without a formal comparative analysis request. He describes this procedure at length. He is not obstructing. He is unable to do otherwise while someone is watching the log.';
        addJournal('Cross-reference attempt flagged — comparative analysis procedure invoked, visitor log active', 'complication');
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The suppression target list and the Compact practitioner citations overlap across eight of the fourteen papers. The pattern is specific enough to hold weight. Taldan pulls the overlap documents and sets them aside from the main stack. "These eight were the ones they pushed hardest on," he says. "I refused all fourteen, but the pressure on these was different. More persistent." He squares the stack. He does not say what that implies, but he has been thinking about it.';
        addJournal('Eight suppression targets overlap with Compact-cited papers — most persistent suppression on Compact-linked countermeasures', 'evidence');
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // --- BATCH 2: +25 CHOICES ADDED 2026-05-29 ---

  // MAGICAL KNOWLEDGE REGISTRY ANOMALIES (~7)

  {
    label: "Taldan's registry has two restricted tiers. The second has no public entries at all.",
    plot: 'main',
    tags: ['Registry', 'Stage2'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'auditing magical knowledge registry tiers with Overseer Taldan Veyst');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Taldan sets the classification index on the reading ledge and opens it to the second tier — a section whose spine crease shows it is rarely opened from the outside. The tier exists as an internal notation cross-referenced only through convoy staging authorizations. Every entry is marked with a Guildheart-issued clearance code. None of those codes appear in any public index he can produce. The dry air off the high-plain moves through the registry window. The codes are real. Their public counterparts are not.`;
        addJournal('Registry second tier — convoy staging authorization, Guildheart clearance codes missing from public index', 'evidence', `sun-taldan2-${G.dayCount}`);
      } else if (result.isFumble) {
        addHeat('soreheim', 1);
        G.lastResult = `Taldan receives the query and routes it to his compliance review cycle before answering — the cycle requires fourteen days and a formal cross-reference audit from the requesting party. He explains this procedure without apology. Access to the second tier is suspended pending audit completion. The timing, he does not say, is not accidental. He sets the index back on the shelf with both hands, spine facing inward.`;
        addJournal('Registry access suspended — compliance review triggered', 'complication', `sun-taldan2-fail-${G.dayCount}`);
      } else {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Taldan confirms the second tier exists and sets the authorization form on the reading ledge without opening it. The form has not been revised in eighteen months — he supplies this detail unprompted, running a finger across the document date. The last revision coincides with when the northern convoy pattern changed. He closes the form. He will not open the tier itself without a cross-registry authorization, but he has said everything else.`;
        addJournal('Registry second tier confirmed — authorization form revision date matches convoy pattern shift', 'evidence', `sun-taldan2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Registry intake stamps run unbroken — except a three-week window six months ago.",
    plot: 'main',
    tags: ['Registry', 'Stage2'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'auditing Knowledge Registry intake stamp sequence for gaps');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The intake ledger runs sequentially — every submission given a stamped number in order — until a three-week gap where stamp numbers jump from 4,112 to 4,156. Forty-three submissions are missing from the sequence. Taldan pulls the intake manifest for those three weeks: the entries exist in the manifest log but carry no corresponding physical file in the reading stacks. The manifest notes them as "transferred — administrative relocation." No destination is listed. The transfers happened during the container calibration period.`;
        addJournal('Registry intake: 43 missing files, transferred with no destination — during container calibration window', 'evidence', `sun-intake-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addHeat('soreheim', 1);
        G.lastResult = `The intake ledger is a restricted working document — only registry staff read it in sequence. Taldan's junior archivist notes the request in her own log before replying. Registry sequence continuity is a staff quality-assurance matter, not a subject of external audit. The answer is brief and the pen keeps moving in her log. The entry will go to Taldan's morning report.`;
        addJournal('Registry intake ledger — restricted document, query logged', 'complication', `sun-intake-fail-${G.dayCount}`);
      } else {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.lastResult = `Taldan opens the intake ledger without hesitation and runs his thumb along the stamp sequence until it jumps. He keeps his thumb at the gap. "Administrative relocation," he says. "That notation does not appear anywhere else in the seven-year ledger." He does not move his thumb. The gap runs three weeks and covers the same period as the container modification work. He closes the ledger with both hands.`;
        addJournal('Registry intake gap: 3-week administrative relocation notation — unique in 7-year ledger', 'intelligence', `sun-intake-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Four restricted access entries share the same charter reference as the suppression requests.",
    plot: 'main',
    tags: ['Registry', 'Stage2'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'cross-checking restricted access log against suppression request charter references');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_taldan_veyst = true;
        G.flags.sun_access_log_linked = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Taldan sets the restricted access log beside the suppression request stack and lets the comparison happen without narrating it. The charter reference number appears four times in the access log — each visit targeting the same sub-section of glyph countermeasure documentation. The visits preceded the suppression requests by one to three days. The party was reading what they later tried to suppress. Taldan's finger traces the dates in sequence. "They knew what they were asking for before they asked for its removal."`;
        addJournal('Access log: charter ref visited glyph countermeasure docs 1–3 days before each suppression request — pre-mapped the targets', 'evidence', `sun-accesslog-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The restricted access log requires countersign from the registry's patron liaison before an external party reads it — this is not a discretionary rule, and Taldan explains it with the precision of someone who has explained it many times. The patron liaison is available on third-bell days only. Today is not a third-bell day. The window is logged and closed before it opens.`;
        addJournal('Restricted access log — patron liaison countersign required, not available today', 'complication', `sun-accesslog-fail-${G.dayCount}`);
      } else {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.lastResult = `Taldan holds the access log open to the charter reference entries while you compare dates against the suppression request stack. The references align — access visits, then suppression requests, same material, same charter number. He sets the log flat. "The party accessed the material. Then tried to ensure no one else could." He squares the log with the desk edge and does not say what that sequence of events suggests. He doesn't need to.`;
        addJournal('Access log dates precede suppression requests — party accessed then attempted to suppress same documents', 'intelligence', `sun-accesslog-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The registry's physical glyph-ward seals were upgraded after the suppression requests arrived.",
    plot: 'main',
    tags: ['Registry', 'Stage2'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining glyph-ward seal upgrade timeline at Knowledge Registry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The ward seals on the registry's reading-room door are new — the resin is paler than the stone surround, not yet darkened by the altitude-damp that greys everything else in Sunspire. A ward craftsman's date mark is pressed into the seal base: four months ago, one week after the first suppression request arrived. Taldan had the seals upgraded not to comply with the pressure but to protect the collection from a different kind of access. The seals block glyph-assisted extraction, not physical entry.`;
        addJournal('Registry ward seals upgraded 1 week after first suppression request — Taldan blocked glyph-assisted extraction proactively', 'evidence', `sun-wards-${G.dayCount}`);
      } else if (result.isFumble) {
        addHeat('soreheim', 1);
        G.lastResult = `Registry maintenance records are working documents — not available for external review. A craftsman near the door asks if there is a fault with the seals and writes something in a maintenance log when the answer involves anything other than "no." The entry will go to the registry's patron liaison. The seal resin near the door frame is paler than the surrounding stone and does not explain itself.`;
        addJournal('Ward seal maintenance records not available — query logged', 'complication', `sun-wards-fail-${G.dayCount}`);
      } else {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.lastResult = `Taldan gestures toward the reading-room door without leading the eye directly to the seals. "The wards were upgraded four months ago. I commissioned it through the craftsman registry." The resin is visibly newer than the stonework around it. He sets his hand on the door frame beside the seal rather than on the seal itself. He does not explain the timing. The first suppression request arrived five weeks before the upgrade.`;
        addJournal('Registry ward upgrade commissioned 4 months ago — new resin visible, timing near suppression request period', 'intelligence', `sun-wards-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Two researchers applied for restricted section access the same week. Both withdrew applications without explanation.",
    plot: 'main',
    tags: ['Registry', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing withdrawn restricted access applications at Knowledge Registry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Taldan opens the application register to the withdrawal entries — both researchers, same week, no notation beyond "applicant rescinded." He sets a finger on one name. "Orvaith is one of them." His finger does not move. The second name is Cira Lunne, a materials analyst whose patron funding lapsed at the same time Orvaith's research went quiet. Both researchers were working adjacent topics: glyph pressure behavior in enclosed cargo environments. The withdrawal week coincides with the third suppression request.`;
        addJournal('Two researchers — Orvaith and Lunne — withdrew restricted access applications same week as 3rd suppression request', 'evidence', `sun-withdrawals-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Application records are confidential by registry protocol — a researcher's withdrawal is their private decision, and its disclosure to external parties requires the researcher's written consent. Neither researcher has filed consent. Taldan explains this without variation from the procedure. The application register stays closed on the reading ledge while he speaks. The dry altitude air holds the silence between sentences, cold and thin.`;
        addJournal('Withdrawn application records confidential — researcher consent required', 'complication', `sun-withdrawals-fail-${G.dayCount}`);
      } else {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.lastResult = `Taldan opens the register to the relevant week without checking the index — he knows where it is. Two withdrawals, same week, no stated reason on either. He keeps the register open. "The withdrawal notation is standard. There is nothing in the record that says why." His thumb finds the spine. The date sits inside the window when the suppression pressure was at its most active, and he has not forgotten that.`;
        addJournal('Two researcher withdrawals same week — no stated reason, timing inside peak suppression window', 'intelligence', `sun-withdrawals-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "An index cross-reference points to a locality that doesn't match any Sunspire district.",
    plot: 'main',
    tags: ['Registry', 'Stage2'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'tracing anomalous cross-reference notation in Knowledge Registry index');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_registry_crossref = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The cross-reference notation appears in eight index entries across the glyph countermeasure section — a two-letter locality code, "WH," that does not correspond to any Sunspire district or registry sub-collection. Running the code against the Roadwarden registry of waypoints produces one match: Watchers Perch Halt, a northern transit rest-point two days' convoy travel from Sunspire. The cross-reference was added during the suppression period. Someone was routing registry materials through a Roadwarden-designated convoy waypoint.`;
        addJournal('Registry cross-ref "WH" = Watchers Perch Halt — convoy waypoint linked to 8 glyph countermeasure entries during suppression period', 'evidence', `sun-crossref-${G.dayCount}`);
      } else if (result.isFumble) {
        addHeat('soreheim', 1);
        G.lastResult = `The index notation requires the classification key to decode — without it, the two-letter code is ambiguous. The classification key is a restricted reference held by the Overseer's office. Taldan is not in the building. His junior archivist can provide the key on his authorization only. The wind off the high-plain moves through the registry window and the index sits open at the anomalous entry while she explains procedure.`;
        addJournal('Registry cross-reference code undecoded — classification key requires Overseer authorization', 'complication', `sun-crossref-fail-${G.dayCount}`);
      } else {
        G.flags.sun_registry_crossref = true;
        G.investigationProgress++;
        G.lastResult = `The two-letter code "WH" appears in eight index entries, all within the glyph countermeasure sub-collection, all added in the same period. The standard locality codes Sunspire uses are three letters. This one is shorter and appears in no Sunspire district mapping. Whatever it refers to is outside the usual index structure. The entries it appears in are the same eight that drew the most persistent suppression pressure.`;
        addJournal('Unknown 2-letter cross-reference "WH" in 8 high-pressure suppression targets — outside standard locality code system', 'intelligence', `sun-crossref-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The registry's copy of the Northern Charter Accord is missing its third annex entirely.",
    plot: 'main',
    tags: ['Registry', 'Stage2'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'auditing Northern Charter Accord holdings in Knowledge Registry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The Accord's binding is intact and its index lists three annexes — but where the third annex should start, the folios skip from 84 to 112. Twenty-eight pages, gone cleanly. The pages were not torn; the stitching along the spine gap is continuous without a stub. Taldan's intake log shows the third annex as received in full when the collection was catalogued eleven years ago. Someone removed the folios after intake, with access to both the document and the stitching tools to close the binding afterward. The third annex covers cross-locality glyph authority jurisdiction — who has the right to suppress glyph knowledge in transit.`;
        addJournal('Northern Charter Accord: third annex removed — covered cross-locality glyph authority jurisdiction, pages 84–112 missing', 'evidence', `sun-accord-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The Accord is in the reading section reserved for charter reference materials — access requires a charter-party endorsement to remove it from the reading shelf. Asking after specific annexes without endorsement produces a notation in the access log rather than a document. The junior archivist is already writing the time before the question has resolved. Her pen does not pause, and the entry goes into Taldan's morning report.`;
        addJournal('Northern Charter Accord access — charter-party endorsement required, query logged', 'complication', `sun-accord-fail-${G.dayCount}`);
      } else {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.lastResult = `The Accord's binding runs from page 1 to 84, then skips to 112. The index lists a third annex. Taldan sets the document flat and opens it to the gap without directing attention to it. "I noticed this during a routine collection check. The intake record shows the document as received complete." He does not say when he noticed. He sets the Accord square with the reading ledge and waits, both hands still on the cover.`;
        addJournal('Northern Charter Accord: binding gap at pages 84–112, third annex listed but absent — Taldan aware', 'intelligence', `sun-accord-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // NPC ENCOUNTERS (~7)

  {
    label: "Elyra's forest patrol routes avoid the northern staging road entirely.",
    plot: 'main',
    tags: ['NPC', 'Stage2'],
    xpReward: 65,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'observing Elyra Mossbane patrol route pattern');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_elyra_mossbane_sun = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Elyra sets the patrol log on the desk and exhales through her nose — small, controlled — before she opens it. Every route for the past five months curves east of the northern staging road by at least two hundred meters. She taps the margin notation beside the first diverted route: "convoy activity, access not advised." She has written this notation forty-one times. "I was told the road was under charter-maintenance exclusion. The exclusion order does not appear in any maintenance record I can locate." Her thumb presses flat against the cover.`;
        addJournal('Elyra patrol routes: 41 diversions east of northern staging road — charter maintenance exclusion order not verifiable', 'evidence', `sun-elyra3-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Elyra's thumb closes over the patrol log before it opens. "Patron-family route planning is a working document — the decisions in it are operational, not archival." She exhales through her nose, small and controlled. "The northern staging road is in active use. The routes around it are as documented." She sets the log on the shelf behind her and keeps her back to it for the remainder of the exchange.`;
        addJournal('Elyra patrol log access declined — operational document, not archival', 'complication', `sun-elyra3-fail-${G.dayCount}`);
      } else {
        G.flags.met_elyra_mossbane_sun = true;
        G.investigationProgress++;
        G.lastResult = `Elyra holds the patrol log open without pointing at the relevant sections. The routes on the page curve away from the northern staging road — it is visible in the route line itself, the drawn path bending east. "Charter activity on that road means I route my people around it." She closes the log with one hand. "I have not been told when the charter activity ends."`;
        addJournal('Elyra patrol routes curve east of northern staging road — charter activity ongoing, no end date given', 'intelligence', `sun-elyra3-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Kael's machinery logs have a gap during the last three convoy cycles.",
    plot: 'main',
    tags: ['NPC', 'Stage2'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'auditing Kael Emberthrone machinery log continuity');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_kael_emberthrone = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Kael sets the machinery log on the workbench and turns it to the gap without being asked to. Three convoy cycles, twelve days each — no maintenance entries, no equipment check stamps, no daily notation. The bench beside him carries a fresh stamp pad, still capped. "During the charter period, I was told the logs were being maintained centrally." He taps the gap with a caliper handle. "I never saw the central logs. I do not know if they exist." He does not look away from the gap.`;
        addJournal('Machinery logs: 36-day gap across 3 convoy cycles — "central logging" claimed but logs never seen', 'evidence', `sun-kaellog-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kael wipes both hands on the bench rag and does not reach for the log. "Syndicate machinery records are commercial property. I've said this already to someone else this week." He turns back to the bench and picks up the caliper. The log sits on the shelf above the workbench at a height where the gap in notation is not visible from the door. He has arranged the workshop so the relevant section is not casually visible.`;
        addJournal('Machinery log access refused — syndicate commercial property, second inquiry this week', 'complication', `sun-kaellog-fail-${G.dayCount}`);
      } else {
        G.flags.met_kael_emberthrone = true;
        G.investigationProgress++;
        G.lastResult = `Kael slides the machinery log to the edge of the bench where both of you can see it. He taps the gap with the caliper. "Three convoy cycles. No entries." He says this without explanation. The log is otherwise meticulous — daily notation, equipment check stamps, a consistent hand. The gap sits inside the container modification window. He sets the caliper down and waits for the next question without picking it back up.`;
        addJournal('Machinery log gap: 3 convoy cycles with no entries — otherwise meticulous record, gap inside modification window', 'intelligence', `sun-kaellog-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Orvak keeps the adjudication docket locked after the second bell. Someone came after second bell.",
    plot: 'main',
    tags: ['NPC', 'Stage2'],
    xpReward: 66,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'probing Orvak Strone after-hours docket access incident');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_orvak_strone = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Orvak squares the after-hours log against the desk edge before he opens it. The entry is three weeks old: a party presenting sealed charter documentation after second bell, requesting access to the container dispute docket. Orvak declined and logged the refusal in full — name, charter reference, time of request. The charter reference matches the subsidiary code. The name in the log is Dennov Cray. He presses his quill against the closed log. "I log everything after second bell. It is a habit I began when things started being logged in other people's offices."`;
        addJournal('After-hours docket access attempt: Dennov Cray, charter subsidiary ref — Orvak declined and logged in full', 'evidence', `sun-orvakbell-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Orvak folds both hands over the desk before answering. "After-hours access records are adjudication office confidential — sharing them requires a formal evidentiary request filed through the Patron-Family council." He sets his quill square with the desk edge. The after-hours log is visible on the shelf behind him. He has not moved it, but he has also not indicated it, and he does not intend to do either.`;
        addJournal('After-hours access records — adjudication confidential, formal request required', 'complication', `sun-orvakbell-fail-${G.dayCount}`);
      } else {
        G.flags.met_orvak_strone = true;
        G.investigationProgress++;
        G.lastResult = `Orvak sets the after-hours log on the desk and opens it to the relevant entry without prompting. A party with sealed charter documentation came after second bell. He declined. The charter reference in his log matches the subsidiary code. He squares the log with the desk edge before closing it. "I record everything after second bell. It is a policy I applied before this specific situation arose." He does not say when the policy started.`;
        addJournal('After-hours access attempt with subsidiary charter ref logged by Orvak — declined, fully documented', 'intelligence', `sun-orvakbell-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Jorva keeps the communal ledger locked after the second bell. The lock is new.",
    plot: 'main',
    tags: ['NPC', 'Stage2'],
    xpReward: 65,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'examining Jorva Helmrune communal ledger security change');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_jorva_helmrune_sun = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Jorva squares the ledger against the desk edge before she sets her hand on the lock. The lock is new brass — the clasp plate still bright, no altitude-tarnish yet. "Someone entered the communal records room after second bell two months ago. I found entries flagged in the handler payment section — someone had folded a corner on the page with the external payment records." She sets both hands flat on the ledger. "I did not fold that corner. I do not fold corners." The lock was fitted the next morning.`;
        addJournal('Communal ledger locked after after-hours entry 2 months ago — handler payment page found corner-flagged by unknown party', 'evidence', `sun-jorvalock-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Jorva's hand closes over the lock and stays there. "The communal ledger is under council access protocol. External queries about security procedures go to the full council." She squares the ledger corner to corner against the desk edge without releasing the lock. The exchange is closed before it opens. Her thumb remains on the bright lock plate, still unworn from recent fitting.`;
        addJournal('Communal ledger security — council access protocol, external queries escalated', 'complication', `sun-jorvalock-fail-${G.dayCount}`);
      } else {
        G.flags.met_jorva_helmrune_sun = true;
        G.investigationProgress++;
        G.lastResult = `Jorva sets her hand on the new lock without pointing at it. "Two months ago, the records room was accessed after bell hours." She does not say by whom. She squares the ledger corner to corner. "I added the lock after. That is not unusual — it is what you do when you find a door open that should be closed." Her thumb rests on the bright clasp plate and does not leave it. The brass is still unworn.`;
        addJournal('Communal records room accessed after-hours 2 months ago — new lock added by Jorva, no identification of party', 'intelligence', `sun-jorvalock-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Taldan asked the Patron-Family council for oversight authority two months ago. It was denied.",
    plot: 'main',
    tags: ['NPC', 'Stage2'],
    xpReward: 72,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'documenting Taldan Veyst oversight authority request and denial');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_taldan_veyst = true;
        G.flags.sun_taldan_oversight_denied = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Taldan sets the request filing on the reading ledge — he has not filed it away. The petition asked the Patron-Family council to extend registry oversight authority to include transit cargo documentation held under charter exemption. The denial came in writing, signed by two council members, citing "charter sovereignty of transit records." The signing council members' names appear on two of the charter subsidiary entry documents in Orvak's adjudication file. Taldan keeps his finger on one name. "I found that correspondence after the denial arrived."`;
        addJournal('Taldan oversight petition denied by council members — same names sign subsidiary charter entries in Orvak file', 'evidence', `sun-taldanoversight-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Taldan sets his hands flat on the reading ledge and exhales. "A petition to the Patron-Family council is a council matter from the moment it is filed. I cannot discuss the substance of a pending or resolved petition with an outside party without council authorization." He opens the classification index and begins working. The petition filing is visible in the outbox tray behind him, not yet archived, spine out.`;
        addJournal('Taldan declined to discuss council petition — council matter, outside party restriction', 'complication', `sun-taldanoversight-fail-${G.dayCount}`);
      } else {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.lastResult = `Taldan pulls the denial letter from his outbox without prompting. Two months ago, denied. "Charter sovereignty of transit records" — he reads the phrase aloud and sets the letter square with the reading ledge. "That phrase does not appear in any charter I can locate." He closes the denial. The petition is still in the tray behind him, not yet archived. He has not decided what to do with it.`;
        addJournal('Taldan oversight petition denied — "charter sovereignty of transit records" phrase not found in any charter', 'intelligence', `sun-taldanoversight-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Elyra knows the researcher Orvaith. She has not said so until now.",
    plot: 'main',
    tags: ['NPC', 'Stage2'],
    xpReward: 67,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'cross-examining Elyra Mossbane on Lenn Orvaith connection');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_elyra_mossbane_sun = true;
        G.flags.sun_elyra_orvaith_link = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Elyra exhales through her nose — small, controlled — and keeps her thumb on the logbook spine. "Orvaith was my field monitoring liaison for glyph pressure readings. He ran the portable gauge before I adapted my own." She has not said this in any previous conversation. "He sent me his final dataset two weeks before his research went quiet. I have not forwarded it anywhere because I do not know who forwarded it last time." Her thumb does not lift. The dataset is what sent his dispute into withdrawal.`;
        addJournal('Elyra was Orvaith\'s field monitoring liaison — holds his final dataset, withheld for security', 'evidence', `sun-elyraorvaith-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Elyra's hand closes the logbook and sets it on the shelf behind her. "I have said what I can say about patronage portfolio researchers." Her exhale is small and controlled. The deliberateness of her posture increases — each movement a degree more precise. She has decided something, and the decision is that the conversation is finished. The dry plateau air holds the room still.`;
        addJournal('Elyra declined further discussion of Orvaith — logbook moved from desk', 'complication', `sun-elyraorvaith-fail-${G.dayCount}`);
      } else {
        G.flags.met_elyra_mossbane_sun = true;
        G.investigationProgress++;
        G.lastResult = `Elyra exhales through her nose — small, controlled — and keeps her thumb on the spine. "I knew him. We worked in proximity on field data." She does not elaborate. "He sent me materials before the withdrawal. I have them." She does not say what the materials are or where they are kept. The logbook stays closed under her hand. The dry plateau wind moves through the room and she waits.`;
        addJournal('Elyra knew Orvaith, received materials before his withdrawal — will not specify contents or location', 'intelligence', `sun-elyraorvaith-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Kael recognized the container specs — he built similar insulation for Guildheart.",
    plot: 'main',
    tags: ['NPC', 'Stage2'],
    xpReward: 75,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'tracing Kael Emberthrone prior Guildheart commission connection');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_kael_emberthrone = true;
        G.flags.sun_kael_guildheart_link = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Kael wipes both hands on the bench rag and sets it down carefully. "Three years ago, I built signal-damping insulation for a Guildheart transport commission. Different dimensions but same material layering — compressed mineral damping medium, glyph-scored face plates." He pulls a sketch from under the bench without being asked. "When the new commission arrived, the spec notation was in the same hand as the Guildheart commission. I recognized the abbreviation system." He sets the sketch beside the new commission. The hand is identical.`;
        addJournal('Kael: Sunspire commission spec hand matches 3-year-old Guildheart commission — same operator, same abbreviation system', 'evidence', `sun-kaelguild-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kael's hand finds the caliper before he answers — turns it once, sets it down. "Commission origin details are syndicate commercial confidential. Previous commissions are not public record." He does not elaborate and does not pick up the caliper again. The bench between you has a sketch face-down on the far end that he has not acknowledged, and he does not glance toward it.`;
        addJournal('Kael declined prior commission comparison — commercial confidential', 'complication', `sun-kaelguild-fail-${G.dayCount}`);
      } else {
        G.flags.met_kael_emberthrone = true;
        G.investigationProgress++;
        G.lastResult = `Kael sets the caliper down and exhales. "The spec notation matched something I'd built before. Different size, same layering logic." He does not say who the prior commission was for. He taps the new commission spec with one finger. "When you see the same abbreviation system twice, you know it's the same desk." He picks the caliper back up and returns to the bench. The sketch under the far end of the bench stays face-down.`;
        addJournal('Kael: new commission spec matches prior work abbreviation system — same operator, origin undisclosed', 'intelligence', `sun-kaelguild-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // NORTHERN CONVOY STAGING ROUTES (~5)

  {
    label: "The northern staging road has two waypoints that don't appear on the Roadwarden's public map.",
    plot: 'main',
    tags: ['Convoy', 'Stage2'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-checking northern staging road against Roadwarden public waypoint map');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_staging_waypoints_found = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The Roadwarden's public map and the convoy handler's internal route sheet differ by two waypoints. The first is a timber-frame rest stop three hours north — marked on the handler sheet as "WH-1, charter maintenance." The second, six hours further, is marked "WH-2, inspection hold." Both use the same "WH" designation from the registry cross-reference index. The public map shows uninterrupted forest corridor across both locations. The waypoints exist as operational infrastructure without a public record.`;
        addJournal('Northern staging road: 2 unlisted waypoints WH-1 and WH-2 — match registry cross-reference "WH" code', 'evidence', `sun-waypoints-${G.dayCount}`);
      } else if (result.isFumble) {
        addHeat('soreheim', 1);
        G.lastResult = `The Roadwarden post at Sunspire's north gate handles waypoint map queries only during first-bell hours. This is not first-bell. The warden on duty logs the query and notes it for the morning officer. The convoy handler's internal route sheet is syndicate property and not available for comparison. Wind carries the smell of pine resin off the upper branches, steady and cold at this elevation.`;
        addJournal('Waypoint map query — first-bell hours only, query logged for morning officer', 'complication', `sun-waypoints-fail-${G.dayCount}`);
      } else {
        G.flags.sun_staging_waypoints_found = true;
        G.investigationProgress++;
        G.lastResult = `The public map and the handler's route sheet don't match — two stops on the handler's sheet don't appear on the public version. One is marked "WH-1," the second "WH-2," both using a designation that doesn't correspond to any Roadwarden waypoint code in the index. The public map shows forest at both locations. Whatever the waypoints are, they are maintained under a separate notation system.`;
        addJournal('Two unlisted waypoints WH-1 and WH-2 on handler route sheet — not on public Roadwarden map', 'intelligence', `sun-waypoints-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The convoy weight declarations at the north gate averaged four hundred pounds under actual load.",
    plot: 'main',
    tags: ['Convoy', 'Stage2'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'cross-referencing north gate weight declarations against axle-load records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_weight_underreport = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The axle-load impressions in the northern staging road are compressed to a depth the Roadwarden infrastructure guide sets at eight hundred to eleven hundred pounds per axle. The weight declarations filed at the north gate for the same convoy window average four hundred to five hundred. Pelsa, the warden, sets the two figures side by side on the station desk without speaking. The declarations were filed under the 7-F diplomatic exemption, which requires no verification. The gap between declared and loaded weight is the size of the suppression compound shipment.`;
        addJournal('Axle impressions show 800–1100 lb load vs 400–500 lb declarations — under 7-F exemption, no verification required', 'evidence', `sun-weight2-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Pelsa has the transit log under his arm before the comparison is proposed. "Active charter exemption records are Adjudicator-controlled during the review window. I cannot provide axle-load comparison access." He stamps a transit form without looking up. The road impression in the lane behind him — ruts from heavy wagon weight — is visible from the gate post but not from his desk.`;
        addJournal('Weight comparison access refused — charter exemption review period, Adjudicator control', 'complication', `sun-weight2-fail-${G.dayCount}`);
      } else {
        G.flags.sun_weight_underreport = true;
        G.investigationProgress++;
        G.lastResult = `Pelsa opens the transit log without prompting and sets it beside the road infrastructure guide. The axle-load section gives a depth-to-weight table. He taps the rut depth column and then the declaration weight column. They do not agree. He does not say the discrepancy is intentional. He closes both documents and squares them with the station edge, which is its own kind of statement.`;
        addJournal('Axle-load depth vs weight declaration mismatch — Pelsa demonstrated comparison without comment', 'intelligence', `sun-weight2-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "A convoy manifest had its origin locality listed as a locality that does not exist.",
    plot: 'main',
    tags: ['Convoy', 'Stage2'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing false origin locality on convoy manifest');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_false_origin_manifest = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The manifest lists origin as "Creston Halt" — a locality name that does not appear in any Roadwarden registry, any charter map index, or any regional trade record in the Knowledge Registry's holdings. Taldan checks all three while you wait. The locality name is plausible — a transit rest-point or small settlement — but its absence from every georegistry suggests it was chosen precisely for that: familiar enough to pass a quick review, absent enough to prevent a trace. The shipment's actual origin cannot be reconstructed from the manifest.`;
        addJournal('Convoy manifest origin "Creston Halt" — locality absent from all registries, plausible but untraceable', 'evidence', `sun-manifest-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Manifest verification requires the cargo's charter documentation — without it, a locality query against a single manifest entry is classified as a customs irregularity report, which triggers a formal hold and notification to the filing party. The notification goes to the charter address on the manifest. The filing party will know within two days. The procedure applies to every manifest query, without exception.`;
        addJournal('Manifest locality verification — triggers irregularity report and charter notification, procedure unavoidable', 'complication', `sun-manifest-fail-${G.dayCount}`);
      } else {
        G.flags.sun_false_origin_manifest = true;
        G.investigationProgress++;
        G.lastResult = `Three registries checked — no Creston Halt in any of them. The manifest origin is a locality name that sounds functional but leaves no trace. Taldan sets the manifest flat. "This is not an error. Errors produce a name that exists but is wrong. This name simply does not exist." He squares the document. The cargo cleared the gate regardless because the 7-F exemption waived origin verification.`;
        addJournal('Manifest origin locality nonexistent across 3 registries — 7-F exemption waived verification', 'intelligence', `sun-manifest-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The staging yard's loading crane was rented from an outside party for the modification period.",
    plot: 'main',
    tags: ['Convoy', 'Stage2'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'tracing staging yard equipment rental for container loading period');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_crane_rental_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The crane rental agreement is in the communal equipment registry — Jorva has it filed under infrastructure lease, squared corner to corner in the appropriate binder. The renting party is listed as the charter subsidiary. The crane's rated capacity: twelve hundred pounds. The rental period exactly spans the container loading window. A crane rated at twelve hundred pounds was brought to Sunspire to lift containers declared at under five hundred pounds each. Jorva sets the lease on the desk and keeps a hand on each corner.`;
        addJournal('Crane rental by charter subsidiary — 1200 lb capacity for containers declared under 500 lb each', 'evidence', `sun-crane-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Infrastructure lease records are communal property — access requires council authorization during an active lease period. The crane rental is listed as still active in the equipment registry, which classifies it as a live commercial agreement. External queries during active agreements require council countersign. Jorva squares the registry closed and sets her hand flat on the cover without lifting her eyes from the desk.`;
        addJournal('Crane lease records — active agreement, council countersign required', 'complication', `sun-crane-fail-${G.dayCount}`);
      } else {
        G.flags.sun_crane_rental_traced = true;
        G.investigationProgress++;
        G.lastResult = `Jorva opens the equipment registry and squares the crane lease entry against the desk edge before reading it aloud. Rented by the charter subsidiary, same period as the container work. She sets the rated capacity figure beside the declared container weight figures. "The crane is rated for considerably more than the declared cargo weight would require." She closes the registry and sets it at the corner. She has done the arithmetic already, and she is not the only one.`;
        addJournal('Crane rental: charter subsidiary, rated capacity exceeds declared container weights by 2.4x', 'intelligence', `sun-crane-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Three convoy drivers took the same northern deviation last run. None filed a report.",
    plot: 'main',
    tags: ['Convoy', 'Stage2'],
    xpReward: 69,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(69, 'locating convoy drivers who took undocumented northern deviation');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_drivers_testimony = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `One driver agrees to speak — Nevel, a wide-shouldered woman who keeps her route token on the table between you and rotates it once before answering anything. The deviation was mandatory, not optional — the convoy was met at the staging yard's north exit by a handler with a charter override card and rerouted to a waypoint stop not on the standard map. The waypoint had its own loading infrastructure already in place. "We offloaded part of the containers there. Reloaded something different." She rotates the token again. "We were told it was a redistribution stop. I have run forty routes. There are no redistribution stops on that road."`;
        addJournal('Driver Nevel: convoy rerouted by charter override to unmapped waypoint — partial offload and reload of unknown materials', 'evidence', `sun-drivers-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `All three drivers are working routes today. The staging yard's dispatch office notes the query and adds it to the driver interview queue — standard procedure when an outside party asks about individual driver routes. The queue review happens quarterly. The dispatch clerk writes the date and nature of the query with a practiced hand, does not look up afterward, and slides the form to the completed stack.`;
        addJournal('Driver route query routed to quarterly review queue — dispatch clerk logged inquiry', 'complication', `sun-drivers-fail-${G.dayCount}`);
      } else {
        G.flags.sun_drivers_testimony = true;
        G.investigationProgress++;
        G.lastResult = `Nevel rotates the route token once before speaking. "We were rerouted. Charter override, north of the standard exit." She sets the token flat. "The stop was not on any map I carry. There was loading equipment already there." She does not say what was loaded or offloaded. She picks up the token and pockets it, which closes the subject. She has said more than she planned to when she sat down.`;
        addJournal('Driver confirms charter-override reroute to unmapped waypoint with pre-placed loading equipment', 'intelligence', `sun-drivers-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // SUPPRESSION COMPOUND THEORETICAL BASIS (~4)

  {
    label: "The suppression compound requires glyph pressure at a specific saturation threshold to activate.",
    plot: 'main',
    tags: ['Arcane', 'Stage2'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'cross-referencing suppression compound activation conditions from Orvaith workspace data');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_compound_theory_advanced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Orvaith's workspace slate board carried a threshold number that connects to a broader activation model: the compound does not suppress at ambient glyph pressure levels. It requires external glyph pressure applied to the container as an activation mechanism, creating a pressure-locked delivery system. The containers ship inert. Someone at the destination applies pressure — not countermeasure pressure but initiation pressure — and the compound activates. The calibration work at Sunspire was setting the precise pressure range required for initiation without premature activation during transit.`;
        addJournal('Compound activation: pressure-locked delivery — inert in transit, initiates under applied glyph pressure at destination', 'evidence', `sun-compound-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The theoretical framework requires the full dataset to resolve — without Orvaith's complete research materials, the threshold calculation from the slate board is an isolated data point. The slate board's half-erased figures could support multiple interpretations. Dry wind moves through the workspace eave gap and the residue-clouded glass vessels on the bench catch no light at this angle of the afternoon.`;
        addJournal('Compound activation theory inconclusive — incomplete dataset, multiple interpretations possible', 'complication', `sun-compound-fail-${G.dayCount}`);
      } else {
        G.flags.sun_compound_theory_advanced = true;
        G.investigationProgress++;
        G.lastResult = `The slate board threshold and the container calibration specs from the sealed bay point in the same direction: an activation mechanism that requires external glyph pressure applied within a specific range. The compound stays inert below the threshold. Applied at calibration range, it activates. The Sunspire calibration work was precision work — not rough approximation but exact threshold-setting to prevent transit activation. The sealed bay was built for this and nothing else.`;
        addJournal('Container calibration sets activation threshold — compound inert below range, activates under precise applied pressure', 'intelligence', `sun-compound-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Not a weapon — a suppression agent for active glyph wards. That is more frightening.",
    plot: 'main',
    tags: ['Arcane', 'Stage2'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'synthesizing compound purpose from registry and workspace evidence');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (G.investigationProgress < 6) {
        G.lastResult = `The theoretical framework is not yet closed. The compound's purpose requires cross-referencing the container specs, the registry's suppressed documentation, and Orvaith's dispersal research — and not all of those threads are in hand yet. The pine resin smell from the timber yard carries on the altitude wind through the corridor. There is more to follow before this conclusion can be reached with any confidence.`;
        return;
      }
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_compound_purpose_identified = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The full picture: glyph wards are maintained at localities through standing pressure arrays. The suppression compound, when activated at calibration threshold, disperses through enclosed spaces and disrupts the ward-maintenance frequency — not destroying wards, but causing them to degrade at an accelerated rate without triggering a visible attack signature. A locality's ward infrastructure fails over weeks, appearing as natural attrition. The party suppressed the countermeasure documentation specifically because the countermeasures would make the degradation visible and reversible.`;
        addJournal('Compound purpose: ward-maintenance frequency disruption — staged degradation, no attack signature, suppressed countermeasures make it detectable', 'evidence', `sun-purpose-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The synthesis requires Orvaith's complete dispersal dataset to confirm — without it, the purpose identification is hypothesis supported by partial evidence. The threshold calculations, the container specs, the suppressed documentation all point in the same direction, but the confirmation requires a closed chain that one missing dataset prevents. The altitude wind moves through the corridor, cold and steady, carrying the smell of warmed stone.`;
        addJournal('Compound purpose synthesis incomplete — Orvaith dispersal dataset required for confirmation', 'complication', `sun-purpose-fail-${G.dayCount}`);
      } else {
        G.flags.sun_compound_purpose_identified = true;
        G.investigationProgress++;
        G.lastResult = `The evidence threads converge: a compound that disrupts glyph ward maintenance frequencies, delivered in sealed containers, calibrated to activate under specific pressure, documented to suppress countermeasure research. The result is ward degradation over weeks — slow enough to appear as maintenance attrition, traceable only if you know what the countermeasures were designed to find. The suppression campaign removed the detection tools before the compound shipped. The sequence is not accidental — it is a methodology.`;
        addJournal('Compound identified as ward-maintenance frequency disruptor — degradation mimics attrition, countermeasure suppression removed detection', 'evidence', `sun-purpose-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Altitude matters. The calibration required elevation — the compound behaves differently above the plateau line.",
    plot: 'main',
    tags: ['Arcane', 'Stage2'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'documenting altitude-dependency of suppression compound calibration');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_altitude_calibration = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Elyra's ecological pressure readings tell the second half of the story: glyph pressure readings at Sunspire's elevation run at approximately sixty percent of the sea-level baseline she uses for comparison. The compound's activation threshold in Orvaith's notes is calibrated to this lower ambient level. At sea level, the compound would activate prematurely from ambient glyph saturation alone. Sunspire's altitude was not incidental to the operation — it was a technical requirement. Only at this elevation could the containers be loaded, calibrated, and sealed without spontaneous activation during the journey north.`;
        addJournal('Altitude-dependency confirmed: compound requires low ambient glyph pressure for safe calibration — Sunspire elevation was technical requirement', 'evidence', `sun-altitude-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The altitude-pressure relationship requires Elyra's portable resonance gauge readings for quantification — without access to the unsubmitted dataset, the relationship is theoretical. The cold at this elevation keeps the breath visible and the pine resin smell sharp on the air. The observational inference is supportable; the specific calibration dependency cannot be confirmed from the evidence currently in hand, and that gap will need to close before any broader claim holds.`;
        addJournal('Altitude calibration dependency inferred but not quantified — Elyra dataset access required', 'complication', `sun-altitude-fail-${G.dayCount}`);
      } else {
        G.flags.sun_altitude_calibration = true;
        G.investigationProgress++;
        G.lastResult = `The calibration bay is at Sunspire's highest point — maximum elevation within the settlement. The sealed bay's anchor spacing matches containers designed to hold a compound at rest at this altitude's ambient pressure. Lower elevation means higher ambient glyph saturation. A compound activated by applied pressure needs ambient saturation below its activation threshold during transit. Sunspire provides exactly that: the only place in the northern corridor where calibration could proceed safely.`;
        addJournal('Calibration bay at maximum elevation — altitude provides ambient pressure below activation threshold for safe transit', 'intelligence', `sun-altitude-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "Orvaith's dispersal dataset is the only thing that can quantify the compound's effective radius.",
    plot: 'main',
    tags: ['Arcane', 'Stage2'],
    xpReward: 77,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(77, 'establishing Orvaith dataset as critical missing evidence for compound radius');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_orvaith_dataset_critical = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The workspace glass vessels held dispersal medium in quantities that point to a full locality coverage test — not a room-scale experiment. Orvaith's container weight estimate of eight-fifty pounds corresponds to a dispersal volume sufficient to cover an enclosed locality district at Sunspire-scale elevation. Elyra holds the dataset. The dataset will confirm the coverage radius and determine whether a single container per district is sufficient or whether the multi-container convoy pattern suggests multiple simultaneous targets. The radius is the difference between a local incident and a coordinated campaign.`;
        addJournal('Orvaith dataset critical: container volume suggests district-scale dispersal — radius determines single vs. coordinated target scope', 'evidence', `sun-radius-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Dispersal radius calculation requires the complete reagent formulation and the ambient pressure measurements from Orvaith's field work — neither is available without the dataset. The calculation from the workspace evidence alone produces an error range too wide to be operational. The glass vessels on the workspace bench are clouded and sealed, and they remain so. The room is otherwise undisturbed.`;
        addJournal('Dispersal radius incalculable from available evidence — Orvaith dataset required', 'complication', `sun-radius-fail-${G.dayCount}`);
      } else {
        G.flags.sun_orvaith_dataset_critical = true;
        G.investigationProgress++;
        G.lastResult = `Container volume at eight-fifty pounds, combined with the dispersal medium residue profile from the workspace vessels, gives an approximate radius: large enough to cover a locality district at this elevation. Sufficient to disrupt the ward structure across an inhabited area, not just a single building. The dataset would confirm whether that estimate is conservative or accurate, and whether a single container is sufficient per district. Elyra has the dataset and has not yet said whether she will share it.`;
        addJournal('Estimated dispersal radius: locality-district scale — Elyra dataset would confirm, not yet offered', 'intelligence', `sun-radius-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // CROSS-LOCALITY THREADS (~2)

  {
    label: "The charter subsidiary that commissioned the containers holds a registered address in Guildheart.",
    plot: 'main',
    tags: ['CrossLocality', 'Stage2'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'tracing charter subsidiary registration address to Guildheart');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_guildheart_link = true;
        G.flags.sun_local_agent_identified = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Orvak's adjudication records carry the subsidiary's registered address in full: a charter office district address in Guildheart, filed with the Guildheart Commerce Registry under a registration date that is eleven months old. The subsidiary was created eleven months ago — four months before the suppression requests arrived at Sunspire, five months before the container modification work began. It was established specifically for this operation, with enough lead time to build a credible paper history. Dennov Cray, the local agent, signed the Sunspire entry documents. His Guildheart address matches the subsidiary's registration exactly.`;
        addJournal('Charter subsidiary: Guildheart address, 11-month-old registration — created 4 months before suppression requests, Cray address matches', 'evidence', `sun-guildheart-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Cross-locality charter registration queries require a formal request through the Guildheart Commerce Registry — a process that takes fourteen days minimum and notifies the registered party that a query has been filed. The notification is automatic. Filing means the subsidiary knows within a week that someone is tracing its registration. Orvak explains the notification rule without suggesting an alternative, then sets the document square with his desk edge.`;
        addJournal('Guildheart charter registration query — 14 days, party notified automatically, process unavoidable', 'complication', `sun-guildheart-fail-${G.dayCount}`);
      } else {
        G.flags.sun_guildheart_link = true;
        G.investigationProgress++;
        G.lastResult = `The subsidiary's registered address is in Guildheart — visible on the adjudication record's filing header, not protected by confidentiality because it is a commercial public registration. Orvak leaves the document open where the address is legible. "Registered addresses are public charter record," he says, closing the file with both hands once the information has been read. He squares it with the desk edge. The conversation continues from here.`;
        addJournal('Charter subsidiary registered in Guildheart — address visible on public adjudication filing header', 'intelligence', `sun-guildheart-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "This suppression pattern appeared two weeks north of here before it reached Sunspire.",
    plot: 'main',
    tags: ['CrossLocality', 'Stage2'],
    xpReward: 79,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(79, 'cross-referencing Sunspire suppression pattern against prior locality records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sun_prior_locality_link = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Taldan pulls a northern circuit Knowledge Registry correspondence file and opens it to a letter from the Watchers Perch Halt registry post, dated two months before Sunspire's first suppression request. The post describes an identical pattern: multiple requests from a nonexistent regulatory authority targeting glyph countermeasure documentation. The Watchers Perch registry complied — the requests were filed with sealed charter documentation and the post had no oversight authority to refuse. The suppression at Sunspire is the second wave. The first wave succeeded.`;
        addJournal('Watchers Perch Halt registry: identical suppression pattern 2 months prior — they complied, Sunspire was second target', 'evidence', `sun-priorloc-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Cross-locality correspondence is archived under the northern circuit filing index — accessible only to registered registry staff or parties with a patron-family endorsement. The correspondence with Watchers Perch and other northern posts is in that archive. Taldan indicates its location without opening it. Access requires paperwork he does not currently have the authority to waive, and he makes no promise that this will change.`;
        addJournal('Northern circuit correspondence archive — patron-family endorsement required for external access', 'complication', `sun-priorloc-fail-${G.dayCount}`);
      } else {
        G.flags.sun_prior_locality_link = true;
        G.investigationProgress++;
        G.lastResult = `Taldan opens the northern circuit correspondence file to a Watchers Perch letter, two months old. The post there received suppression requests that match the Sunspire pattern — same fake regulatory authority, same targeted documentation category. Taldan sets the letter beside his own suppression file. "They acted before reaching us. Whether they succeeded there, I cannot say from this correspondence alone." The cold altitude air carries the silence between them. The letter is addressed in a hand that slopes left.`;
        addJournal('Watchers Perch received identical suppression requests 2 months before Sunspire — prior locality targeted first', 'intelligence', `sun-priorloc-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The contract table at the grain broker's. Two stamps, one seal, none of them match.",
    tags: ['stage2', 'sunspire_haven', 'Investigation', 'Stage2'],
    plot: 'main',
    skill: 'wits',
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 13 || roll.isCrit) {
        G.flags.sun_broker_table_stamps_read = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
        addNarration('Three Marks, One Lie', 'The grain broker keeps her contract table at the front of the counting shed. Dry wind off the high plain moves the lamp flame. The pending sheet carries two syndicate stamps and a wax seal in one column. The Helmrune and Crownmere stamps are legitimate. The wax seal is not. Its impress shows the charter subsidiary mark that has run through every other thread of the file. A grain contract has been routed through the same shell that commissioned the container work. The broker squares the page without raising her eyes.', 'success');
        addJournal('Grain contract at Sunspire broker stamped with same charter subsidiary mark as container commission', 'evidence', 'sun-broker-stamps-' + (G.dayCount||0));
        if (typeof gainXp === 'function') gainXp(20);
      } else {
        addNarration('The Page Turns', 'The broker turns the contract sheet face-down before the question lands. "Stall-side review is for signatories." Her hand stays flat on the page until you step back from the table. The lamp flame holds steady in the dry altitude air. Behind her, a syndicate clerk takes a half-step nearer the doorway, log in hand. The contract goes into the lower drawer. The drawer key goes into her apron pocket. The next petitioner is already waiting at the counter.', 'failure');
        if (typeof loadStageChoices === 'function') loadStageChoices(G.location);
      }
    },
    failResult: function() {
      addNarration('The Page Turns', 'The broker turns the contract sheet face-down before the question lands. "Stall-side review is for signatories." Her hand stays flat on the page until you step back from the table. The lamp flame holds steady in the dry altitude air. Behind her, a syndicate clerk takes a half-step nearer the doorway, log in hand. The contract goes into the lower drawer. The drawer key goes into her apron pocket. The next petitioner is already waiting at the counter.', 'failure');
      if (typeof loadStageChoices === 'function') loadStageChoices(G.location);
    }
  },

  {
    label: "Convoy departure rites at the cart yard. The oath-giver skips a line every time.",
    tags: ['stage2', 'sunspire_haven', 'NPC', 'Stage2'],
    plot: 'main',
    skill: 'finesse',
    xpReward: 20,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.stageProgress) G.stageProgress = {1:0,2:0,3:0,4:0,5:0};
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('finesse', G.skills.finesse);
      if (roll.total >= 13 || roll.isCrit) {
        G.flags.sun_departure_rite_omission_caught = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (typeof maybeStageAdvance === 'function') maybeStageAdvance();
        addNarration('The Skipped Line', 'The shrine attendant runs the convoy departure rite at the cart yard mouth as he has done for the morning batch, the noon batch, and now this third one. The dry plain wind carries the small chime he uses to mark the verses. On the third convoy, he passes over the verse that asks each oath-giver to declare the convoy\'s cargo by category. The omission is small and consistent. The same hauler crew is loading the third yard each time. The crew chief watches the attendant skip the line without flinching, which means the arrangement is known to him.', 'success');
        addJournal('Sunspire departure rite skips cargo-declaration verse for one specific hauler crew — known to crew chief', 'evidence', 'sun-rite-skip-' + (G.dayCount||0));
        if (typeof gainXp === 'function') gainXp(20);
      } else {
        addNarration('The Chime Stops', 'The attendant\'s chime stops mid-verse. He looks up from the brazier without turning his head, the way a market clerk looks up when a queue position has been broken. The crew chief in the third yard sets down the strap he is buckling and walks toward the chime, slowly. The dry wind moves through the yard gap. By the time the attendant resumes the rite, the cart you were standing behind has rolled forward, and your sightline to the third yard is gone. The verses finish in proper sequence after that.', 'failure');
        if (typeof loadStageChoices === 'function') loadStageChoices(G.location);
      }
    },
    failResult: function() {
      addNarration('The Chime Stops', 'The attendant\'s chime stops mid-verse. He looks up from the brazier without turning his head, the way a market clerk looks up when a queue position has been broken. The crew chief in the third yard sets down the strap he is buckling and walks toward the chime, slowly. The dry wind moves through the yard gap. By the time the attendant resumes the rite, the cart you were standing behind has rolled forward, and your sightline to the third yard is gone. The verses finish in proper sequence after that.', 'failure');
      if (typeof loadStageChoices === 'function') loadStageChoices(G.location);
    }
  },

  // FINALE (unchanged, kept at end)
  {
    label: "Sunspire is an operation infrastructure node. Shut it down formally or neutralize it quietly.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence'],
    xpReward: 104,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(104, 'Sunspire Haven Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The documentation is incomplete. The subsidiary charter, the container modification records, the suppression requests — they point in the same direction, but the chain between them has gaps. Presenting this to the Patron-Family council or releasing it publicly without a closed chain gives the other side room to discredit the pieces rather than answer the whole. More threads need to be followed before the next move.`;
        G.recentOutcomeType = 'partial'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0) + Math.floor(G.level/2));
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
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

];

window.SUNSPIRE_STAGE2_ENRICHED_CHOICES = SUNSPIRE_HAVEN_STAGE2_ENRICHED_CHOICES;
