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
        addJournal('Sunspire: 14 suppression requests from fake authority — targeting glyph countermeasure documentation', 'evidence', `sun-taldan-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Taldan treats your inquiry as a potential additional suppression attempt. He records your visit and forwards a summary to his supervisory chain before engaging further.`;
        addJournal('Knowledge Registry visit logged as potential suppression inquiry', 'complication', `sun-taldan-fail-${G.dayCount}`);
      } else {
        G.flags.met_taldan_veyst = true;
        G.investigationProgress++;
        G.lastResult = `Taldan confirms multiple suppression requests from an unverified authority. He has not complied with any of them. "An authority I cannot verify in three major legal registers is not an authority."`;
        addJournal('Suppression requests from unverified authority — Taldan declined compliance', 'evidence', `sun-taldan-partial-${G.dayCount}`);
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
        addJournal('Sunspire convoy workshop used to build inspection-masking container insulation — same charter ref', 'evidence', `sun-kael-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kael's machinery logs are protected under convoy commercial confidentiality. His legal standing requires him to decline without a formal override order.`;
        addJournal('Convoy machinery logs — commercial confidentiality block', 'complication', `sun-kael-fail-${G.dayCount}`);
      } else {
        G.flags.met_kael_emberthrone = true;
        G.investigationProgress++;
        G.lastResult = `Kael confirms unusual container modification work. "Insulation spec was unusual — not temperature, more like signal damping. Not standard convoy equipment."`;
        addJournal('Signal-damping container insulation produced at Sunspire — not standard equipment', 'evidence', `sun-kael-partial-${G.dayCount}`);
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
        addJournal('Container commission dispute reveals charter subsidiary code — matches Fairhaven suppression buyer', 'evidence', `sun-orvak-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Orvak's adjudication is confidential until formally concluded. Your interest in the proceedings is logged and forwarded to both disputing parties.`;
        addJournal('Trade adjudication confidential — interest logged, parties notified', 'complication', `sun-orvak-fail-${G.dayCount}`);
      } else {
        G.flags.met_orvak_strone = true;
        G.investigationProgress++;
        G.lastResult = `Orvak confirms the commissioning party reference is a subsidiary charter entity. He can confirm it was used to commission the work but cannot identify the ultimate principal without a compliance investigation order.`;
        addJournal('Charter subsidiary confirmed as commissioning party — principal identification requires formal order', 'evidence', `sun-orvak-partial-${G.dayCount}`);
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
    label: "Kael is holding something back — the requisition ledger has a gap where a page was removed.",
    tags: ['stage2', 'sunspire_haven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('persuasion', G.skills.persuasion);
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
    label: "The grain storehouse wall carries glyph-scoring marks at the wrong height — not structural, not decorative.",
    tags: ['stage2', 'sunspire_haven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('lore', G.skills.lore);
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
    label: "Presenting sealed papers without a family endorsement mark is the kind of error that draws attention here.",
    tags: ['stage2', 'sunspire_haven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('stealth', G.skills.stealth);
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
      var roll = rollD20('survival', G.skills.survival);
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
      var roll = rollD20('persuasion', G.skills.persuasion);
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
      var roll = rollD20('stealth', G.skills.stealth);
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
        addJournal('Sunspire S2 finale: Patron-Family council suspends charter subsidiary access', 'evidence', `sun-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You release the suppression request list and the container modification specs to Taldan Veyst for open publication. The Knowledge Registry publishes the suppressed countermeasure documentation immediately. Every affected locality receives the technical information they were denied.`;
        addJournal('Sunspire S2 finale: suppressed countermeasure docs published via Knowledge Registry', 'evidence', `sun-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.SUNSPIRE_HAVEN_STAGE2_ENRICHED_CHOICES = SUNSPIRE_HAVEN_STAGE2_ENRICHED_CHOICES;
