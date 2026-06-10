/**
 * MIMOLOT ACADEMY STAGE 2 ENRICHED CHOICES
 * Investigation arc: forbidden knowledge trafficking / suppression compound theoretical basis
 * NPCs: Quenra Quillfire (Tutor-Magistrate), Ilys Quillfire (Innkeeper),
 *       Sarith Quillfire (Market Clerk), Velis Quillfire (Shrine Attendant), Myra Quillfire (Porter)
 */

var MIMOLOT_ACADEMY_STAGE2_ENRICHED_CHOICES = [

  {
    plot: 'main',
    label: "The suppression compound formula appears in theoretical texts three years before it was commissioned.",
    skill: 'wits',
    tags: ['Investigation', 'Stage2'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'accessing restricted Academy curriculum');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_quenra_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Quenra lays the original research notes beside the commission date — the gap is unmistakable. The formula was developed here as theoretical glyph resonance damping work, years before anyone placed an order for it. The classification directive that sealed it came eighteen months ago, not from the faculty council but from an external charter instruction. Quenra reads the charter reference aloud and stops. She's seen that designation before, in a different context, tied to the buyer pattern.`;
        addJournal('Academy glyph damping research classified by external charter — predates commission', 'evidence', `mim-quenra-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Quenra reaches the classification directive before you finish your question and holds it up like a wall. "This research falls under restricted access." She writes something in the margin of a log at her desk. External-access protocol, she explains — any inquiry touching classified curriculum materials is automatically flagged. Someone outside this building will receive a record of your visit and what you asked about.`;
        addJournal('Academy access logged — notification sent to unknown party', 'complication', `mim-quenra-fail-${G.dayCount}`);
      } else {
        G.flags.met_quenra_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Quenra confirms the formula is in restricted materials without opening the file. She can't share it directly, but she confirms the classification came after the commission date — not before. She says this carefully, as if she's thought about what it implies and decided that confirming the sequence is different from discussing the content. Someone placed the commission knowing the formula already existed here.`;
        addJournal('Academy formula classified post-commission — buyer had prior knowledge', 'evidence', `mim-quenra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "Incoming shipments logged that don't match standard academic supply manifests.",
    skill: 'spirit',
    tags: ['NPC', 'Craft', 'Stage2'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reviewing Archive Loading Bay delivery records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.spirit||0));
      if (result.isCrit) {
        G.flags.met_myra_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Myra pulls her personal log from under the counter without being asked — she's been keeping it specifically because the standard manifest counter doesn't cover everything. Six deliveries over four months, all arriving on the Fairhaven scholar route. Signed off by an Academy regent code she checked against the Academy's exemption registry and couldn't match. She points at two entries. Both precede documented glyph surge events in Shelkopolis by forty-eight hours. She circled the dates when she noticed.`;
        addJournal('Academy off-manifest deliveries via Fairhaven path — 48hr pre-surge correlation', 'evidence', `mim-myra-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Myra's supervisor is two meters away when you approach. Myra listens to your question, says "I can't help you with that" in a flat voice, and hands you a standard inquiry-refusal form. Her eyes move to the supervisor and back. She fills out the refusal with her pen held loosely, like someone doing something they don't mean. Come back without the supervisor present.`;
        addJournal('Loading Bay inquiry refused under supervisor watch', 'complication', `mim-myra-fail-${G.dayCount}`);
      } else {
        G.flags.met_myra_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Myra nods before you finish the question. "Non-standard deliveries on non-standard paperwork — I log everything that comes through the bay regardless of manifest status. Writing it down isn't my job to question." She opens the personal log and sets it on the counter. She has written it all down. The question is what the entries add up to when read together.`;
        addJournal('Non-standard Academy deliveries confirmed in personal cargo log', 'evidence', `mim-myra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "Three recent acquisitions bypassed tariff entirely. No exemption filed.",
    skill: 'wits',
    tags: ['NPC', 'Lore', 'Stage2'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining Academy knowledge tariff bypass records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_sarith_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Sarith's tariff records are organized by exemption category, and the "Crown Research Protocol" designation appears in three entries and nowhere else in the registry — not in the formal exemption categories, not in supplementary guidance, not in the Academy charter's fee schedule. All three exemptions were applied to glyph resonance theory acquisitions. All three list Fairhaven as point of origin. Sarith checked the designation against every reference she has. It appears in no Academy record. It was used anyway, and the exemptions held.`;
        addJournal('Crown Research Protocol exemptions — glyph theory, Fairhaven origin', 'evidence', `mim-sarith-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Sarith's counter has an audit flag mechanism built into it — externally audited quarterly, any unusual inquiry logged. Your questions about the exemption entries trigger the flag before you finish asking them. The next audit will include a record of your name and what you asked. Sarith explains this without apology. It's not her choice; it's the procedure. The records you need are now associated with your name in a queue that goes outside the Academy.`;
        addJournal('Tariff inquiry flagged in quarterly audit queue', 'complication', `mim-sarith-fail-${G.dayCount}`);
      } else {
        G.flags.met_sarith_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Sarith confirms the three exemptions without hesitation — she processed them herself and noted the unfamiliar code at the time, penciling it into the margin of her own copy because it did not appear in the fee schedule posted behind her desk. Academy leadership entered the designation; she did not question it, but she marked in her ledger that the materials would normally fall under her "applied craft components" category, not scholarly texts. The exemption code bypassed the category check entirely. The brass shelf fittings behind her catch the clerestory light as she closes the register.`;
        addJournal('Academy tariff-exempt craft components — misclassified acquisitions', 'evidence', `mim-sarith-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "A late-night conversation about 'pressure management protocols.' The guests aren't on the faculty roster.",
    skill: 'finesse',
    tags: ['NPC', 'Stealth', 'Stage2'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'questioning Academy innkeeper about scholar guests');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.isCrit) {
        G.flags.met_ilys_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Ilys describes the guests with the precision of someone who notices things professionally: what they wore, how they moved, whether they looked at the room or the exits when they entered. One matches the physical description you have from Vaelis Sunweave's account in Fairhaven — same courier on the north-south route. The overheard phrase from the late-night conversation: "the cave output needs another three months of calibration." The guests checked out before the morning bell. No forwarding note.`;
        addJournal('Academy inn guest matches Fairhaven courier — cave calibration timeline overheard', 'evidence', `mim-ilys-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The timing is wrong. A guest is in the common room who stops eating when you approach Ilys — not conspicuously, just a pause — and doesn't resume until you leave. He's not on the faculty roster; Ilys confirmed that when he arrived. She gives you a look that conveys something she can't say aloud and a brief formal response. Come back when the common room is empty.`;
        addJournal('Academy inn — non-faculty observer present, conversation closed', 'complication', `mim-ilys-fail-${G.dayCount}`);
      } else {
        G.flags.met_ilys_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Ilys describes the guests by habit: northern accents, sealed documentation cases stored at the foot of the beds instead of in the wardrobe, pre-dawn departures without breakfast. The phrase she caught from the late-night conversation was "pressure management." She didn't know what it referred to. She noted it because it was an odd phrase for people claiming to be here on academic business. You know what it refers to.`;
        addJournal('Academy inn — pressure management phrase, northern guests', 'evidence', `mim-ilys-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The shrine inscriptions include pre-suppression glyph data that was never formally classified.",
    skill: 'wits',
    tags: ['NPC', 'Lore', 'Stage2'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'reviewing Memory Hall Shrine historical inscriptions');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_velis_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The inscriptions predate the classification directive by decades — this is history that was never flagged for restriction because nobody connected it to the present. The original Watchers Perch cave is documented as a designed pressure regulation site: built by the settlement architects specifically to prevent glyph surge overload in the surrounding area. The modifications Quenra referenced weren't experimental additions. They reversed a safety system that has been functioning for generations.`;
        addJournal('Memory Hall: Watchers Perch was safety system — modifications reversed it deliberately', 'evidence', `mim-velis-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Velis listens to the questions and sets her maintenance tools down with a deliberate movement. The shrine's inscriptions exist for contemplation and preservation, she explains — not for removal into documentary chains. She closes the hall for the day and lodges a formal grievance with the Academy's doctrinal committee. The inscriptions are still in there. Getting to them now requires the committee to clear you, which is a longer path than the one you tried.`;
        addJournal('Memory Hall closed — doctrinal committee grievance filed', 'complication', `mim-velis-fail-${G.dayCount}`);
      } else {
        G.flags.met_velis_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Velis grants reading access and stands to one side while you work through the inscriptions. The Watchers Perch cave is described as a designed site — engineered by the original settlement architects for pressure regulation, maintained across generations as infrastructure rather than natural formation. The recent modifications weren't a first intervention. Someone intervened twice: once to build this, once to break it.`;
        addJournal('Watchers Perch was previously engineered — recent modifications are second intervention', 'evidence', `mim-velis-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "Leth Quillfire has been carrying the same sealed ledger for three days without logging it.",
    skill: 'charm',
    tags: ['stage2', 'mimolot_academy'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'confronting Leth Quillfire over unlogged sealed ledger');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('charm', (G.skills.charm||0));
      if (roll.total >= 16) {
        G.flags.met_leth_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('The Scribe\'s Ledger', 'Leth sets the ledger on the reading-room table and slides it across without speaking. His thumb stays on the cover for a moment before he lifts it away. The entries inside are written in two different hands — his precise, vertical script for the Academy entries, and a second, compressed hand for the external requisitions. The compressed hand matches the charter notation on Sarith\'s exemption records. Leth confirms this when pressed. He has been holding the ledger because nobody told him to file it, and he does not file things without instruction.');
        addJournal('Scribe ledger: two-hand entries link charter notation to Academy external requisitions', 'evidence');
        maybeStageAdvance();
      } else if (roll <= 4) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration('The Scribe\'s Ledger', 'Leth listens to the full question with his hands flat on the reading-room table and then asks for your faculty authorization form. When you cannot produce one, he writes something in the duty log — not hurriedly, but with the steady attention of someone recording for an audience that is not present. He picks up the ledger and walks it to the restricted document cage. The lock clicks once.');
        addJournal('Leth Quillfire logged inquiry — restricted access invoked without explanation', 'complication');
      } else {
        G.flags.met_leth_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('The Scribe\'s Ledger', 'Leth does not open the ledger but confirms the dual-hand notation system — standard practice for co-authorized requisitions, he explains, where an external signatory adds a counter-entry. He has not filed it because the external co-authorization is incomplete: one signature present, counter-signature absent. He has been waiting for the second hand to return. It has not.');
        addJournal('Unlogged Academy ledger: incomplete external co-authorization — second signatory absent', 'intelligence');
        maybeStageAdvance();
      }
    }
  },

  {
    plot: 'main',
    label: "The Restricted Stacks seal is newer than the archive housing it.",
    skill: 'wits',
    tags: ['stage2', 'mimolot_academy'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'examining Restricted Stacks seal and archive infrastructure');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('wits', (G.skills.wits||0));
      if (roll.total >= 13) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('Restricted Stacks', 'The archive housing is original construction — stone cut and set during the Academy\'s founding period, the mortar joints darkened with decades of lamp-oil residue. The seal on the Restricted Stacks gate is a different story: pressed wax over a cast-iron plate, the wax still showing tool marks, the plate mounted in brackets that have not oxidized yet. Somebody sealed this section recently. The classification directive date on Quenra\'s files is the same month as the bracket installation, judging by the hardware finish.');
        addJournal('Restricted Stacks seal is recent installation — matches classification directive date', 'discovery');
        maybeStageAdvance();
      } else if (roll <= 3) {
        addNarration('Restricted Stacks', 'An Academy proctor is conducting a routine walk of the archive corridor when you approach the Restricted Stacks gate. She stops two meters away and asks for your reader authorization card. The question is asked quietly, but two students at nearby study tables look up. A formal access refusal in a public corridor is the kind of thing that gets written into the weekly compliance summary.');
        addJournal('Restricted Stacks approach interrupted by proctor — access formally refused', 'complication');
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('Restricted Stacks', 'The seal hardware is newer than the surrounding stonework — that much is clear from the bracket finish and the wax condition. The section beyond was accessible to general readers until recently; the reading-room register still has patron entries from last term filed under stack numbers that are now classified. The cutoff is abrupt: entries stop in the same week the classification directive was issued.');
        addJournal('Restricted Stacks access cut off same week as classification directive', 'evidence');
        maybeStageAdvance();
      }
    }
  },

  {
    plot: 'main',
    label: "Calia Quillfire asked a question in the wrong register and the lecture hall went quiet.",
    skill: 'finesse',
    tags: ['stage2', 'mimolot_academy'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'navigating Calia Quillfire social complication in lecture hall');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('finesse', (G.skills.finesse||0));
      if (roll.total >= 13) {
        G.flags.met_calia_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('The Foreman\'s Ledger', 'Calia is the labor foreman\'s clerk, and she asked the question that cleared the room: whether the crew that reinforced the Restricted Stacks gate was the same crew that serviced the Watchers Perch access tunnel last season. The lecture hall went quiet because the answer is yes, and everyone with a work-order number in their head knows it. She finds you after the session ends and gives you the crew rotation log without explanation. Her handwriting is in the margins of two separate entries.');
        addJournal('Labor crew overlap: Restricted Stacks gate and Watchers Perch tunnel — same rotation', 'evidence');
        maybeStageAdvance();
      } else if (roll <= 4) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration('The Wrong Register', 'The question lands wrong and the silence that follows it is the kind that travels. By the time the session ends, two faculty members have exchanged a look you were not meant to see, and Calia is being escorted toward an administrative office by a proctor who appeared from the side corridor with timing that does not feel coincidental. Whatever she knew, it is now associated with your presence here.');
        addJournal('Calia Quillfire removed from lecture — faculty response logged', 'complication');
      } else {
        G.flags.met_calia_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('The Foreman\'s Ledger', 'Calia hands you the crew rotation log after the session without making a production of it — the way someone passes a document they have been carrying with intent. The Watchers Perch tunnel crew and the Restricted Stacks reinforcement crew share four names. She circled the names in pencil, then erased the circles, then handed it to you anyway. The indentations are still there if you hold it to the lamp.');
        addJournal('Labor crew rotation log: four names shared across Watchers Perch and Restricted Stacks jobs', 'intelligence');
        maybeStageAdvance();
      }
    }
  },

  {
    plot: 'main',
    label: "Things moved through the night dock that don't appear in the morning intake log.",
    skill: 'vigor',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'pressing Hoven Draske on night-dock off-manifest transfers');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0));
      if (result.isCrit) {
        G.flags.met_hoven_draske = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Hoven is a large man who sits very still when he's weighing something. He sits still for a long time. Then he takes a folded receipt from inside his coat and sets it on the crate between you without speaking. The receipt is for a sealed reagent crate, Fairhaven provenance, night-docked four months ago — no intake number, no faculty co-sign, just a charter mark he did not recognize and a weight notation in a hand that matches the compressed entries in Leth's ledger. He has been holding it because nobody asked before. Nobody looked like they could do anything about it before.`;
        addJournal('Night-dock Fairhaven reagent receipt — matches compressed ledger hand, no intake number', 'evidence', `mim-hoven-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Hoven listens with his arms folded and his weight back — the posture of a man who has heard the question before in different words. He says he unloads what the dock bill says and logs what the intake form requires. He does not elaborate. Before you reach the dock gate on your way out, a proctor is already walking toward the night materials station from the main corridor. The timing is not coincidental. Someone on the dock has a faster line to the compliance office than the morning shift does.`;
        addJournal('Night dock — proctor response triggered, Hoven protected by protocol', 'complication', `mim-hoven-fail-${G.dayCount}`);
      } else {
        G.flags.met_hoven_draske = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Hoven confirms the night-dock receives transfers that do not go through the morning intake process — a separate authorization channel, he explains, for materials under faculty regent codes. He has logged everything in his own shift register, which is not the same document the day supervisor reviews. He can show the shift register. The regent codes on the night-dock entries are the same ones Sarith could not match against the Academy's exemption registry.`;
        addJournal('Night-dock shift register: regent codes match Sarith tariff anomalies — separate auth channel', 'intelligence', `mim-hoven-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The faculty auditor stopped filing anomaly reports six weeks ago. No explanation given.",
    skill: 'charm',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'drawing out Pellin Ost on suspended anomaly reporting');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.isCrit) {
        G.flags.met_pellin_ost = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Pellin closes his office door before he speaks, and then he speaks quickly. Six weeks ago he filed an anomaly report on a recurring expenditure line coded to "theoretical infrastructure maintenance" — a budget category that does not exist in the Academy's approved expenditure schedule. The report came back from the Dean's office with a single annotation: "Reclassified. No further inquiry required." The annotation was not in the Dean's handwriting. He stopped filing because the next anomaly he found was larger, and the annotation on the first one told him where that report would go.`;
        addJournal('Pellin Ost: expenditure anomaly reclassified by unknown annotator — Dean handwriting absent', 'evidence', `mim-pellin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Pellin's door is open but his body language closes it: chair angled toward the window, pen moving across unrelated paperwork before you finish the first sentence. He says anomaly reporting procedures are an internal faculty matter and refers you to the public-facing audit charter summary, which is posted in the rotunda. His pen does not stop moving. The paperwork he is writing is a duty-log entry. You are in it.`;
        addJournal('Pellin Ost — referral to public charter, duty log entry confirmed', 'complication', `mim-pellin-fail-${G.dayCount}`);
      } else {
        G.flags.met_pellin_ost = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Pellin confirms he suspended anomaly reporting without elaborating on the reason. He opens a drawer, retrieves a single sheet, and sets it face-down on the desk between you. The sheet is the returned anomaly report — the reclassification annotation visible through the paper when held to the window light. He does not turn it over. "The process functioned as designed," he says, which is a precise and deliberate way to describe a process that did not function as intended.`;
        addJournal('Pellin Ost: anomaly report returned reclassified — process described as "functioning as designed"', 'intelligence', `mim-pellin-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "A regular Fairhaven courier stop at the Academy that doesn't appear in the public schedule.",
    skill: 'finesse',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracing Draith Calver Fairhaven courier off-schedule Academy stop');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.isCrit) {
        G.flags.met_draith_calver = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The courier is Draith Calver, and he arrives at the Academy's east service gate every twelve days — not on the posted schedule, which lists Fairhaven deliveries as monthly. The east service gate is not staffed by regular dock workers. The same two faces appear on every off-schedule arrival, drawn from a short roster Myra's shift log does not account for. Draith's route manifest for these stops shows a single line entry: "Academic reagent exchange — pre-cleared." The pre-clearance code resolves to the same external charter mark Hoven pulled from his coat.`;
        addJournal('Draith Calver 12-day courier cycle: same charter mark as Hoven dock receipt', 'evidence', `mim-draith-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The east service gate is staffed when it should be unstaffed — two workers in nondescript work coats who clock you from thirty meters and do not move toward the gate. The courier does not arrive during the window. A different delivery comes through the main dock instead, routine and logged, and the two workers are gone when you check the gate again an hour later. The pattern closed before it opened.`;
        addJournal('East gate surveillance — off-schedule stop did not occur, workers present and watchful', 'complication', `mim-draith-fail-${G.dayCount}`);
      } else {
        G.flags.met_draith_calver = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The east service gate shows irregular traffic in Myra's cargo log — entries logged under a "pre-cleared academic exchange" category that runs on a twelve-day cycle, not the monthly schedule posted publicly. The courier name on these entries is partially redacted, but the route origin — Fairhaven — is intact. The twelve-day interval matches the surge event spacing Myra circled in her log.`;
        addJournal('East gate 12-day Fairhaven exchange cycle matches Myra surge event intervals', 'intelligence', `mim-draith-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The archive papers are cited by research that doesn't exist in the Academy's own catalog.",
    skill: 'wits',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing phantom citation network in glyph resonance theory archive');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.mim_phantom_citations_mapped = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Fourteen papers in the glyph resonance theory stack cite a source titled "Distributed Pressure Regulation: Applied Architecture" — a monograph that does not appear in the Academy catalog, the Collegium registry, or any public acquisition record. The citation format uses a Fairhaven institutional prefix. All fourteen papers were authored in the two years preceding the classification directive. The monograph's existence was known to the Academy's faculty before the theoretical work here was completed. Someone gave the faculty this text through a channel that left no acquisition record.`;
        addJournal('Phantom monograph: 14 papers cite Fairhaven source absent from all registries', 'evidence', `mim-citations-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The catalog access system requires a reader registration current within sixty days. The registration clerk is not at the desk; the stand-in does not have authorization to process external reader renewals. The stand-in writes the request in the duty log and marks it pending faculty review. The glyph resonance stack is available to registered readers only. The pending flag on a lapsed registration is now in the same system as the quarterly audit queue.`;
        addJournal('Catalog access blocked — lapsed registration flagged in audit queue', 'complication', `mim-citations-fail-${G.dayCount}`);
      } else {
        G.flags.mim_phantom_citations_mapped = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The citation discrepancy is systematic: a single source appears in multiple papers in the glyph resonance stack but resolves to nothing in the catalog. The papers themselves are available to read. The source they cite is not. This is not a cataloging error — each paper uses the same citation format, the same institutional prefix, and the same publication date. The source was real and known to these authors. It simply does not exist in any record the Academy is willing to show.`;
        addJournal('Systematic phantom citation: single Fairhaven source, same format across 14 papers — deliberate omission', 'intelligence', `mim-citations-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The manifest notation isn't Academy standard. Someone with field training filled this in.",
    skill: 'spirit',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'decoding non-standard reagent weighing notation in storage manifest');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.spirit||0));
      if (result.isCrit) {
        G.flags.mim_reagent_notation_decoded = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The notation is a field-craft weighing shorthand used in extraction operations — not a workshop system, not an academic one. Someone trained in applied field extraction filled in these manifests. The weights themselves are significant: the quantities logged for three reagent entries correspond to batch sizes for suppression compound production at a scale that would supply a distributed deployment, not a contained test. The manifest is signed off as routine Academy reagent storage. The quantities are not routine. Not even close.`;
        addJournal('Reagent manifest: field-extraction notation, batch sizes indicate distributed suppression deployment', 'evidence', `mim-reagent-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The storage manifest is behind the materials desk in a locked binder. The clerk on duty is new to the desk and is not certain whether external access to storage manifests falls under the general reader exemption or the faculty-restricted materials protocol. She decides, correctly, that she does not know, and escalates to a senior clerk who does. The senior clerk applies the restricted protocol. The manifest goes into the locked drawer. The escalation is logged.`;
        addJournal('Storage manifest access escalated — restricted protocol applied, logged', 'complication', `mim-reagent-fail-${G.dayCount}`);
      } else {
        G.flags.mim_reagent_notation_decoded = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The weighing notation is not Academy standard — that much is clear from the unit abbreviations, which don't match the faculty measurement guide on the wall behind the desk. The shorthand is from outside the academic system: a practical extraction notation used in applied field work, not theoretical research. Someone with field training filled in these manifests. The Academy's storage records have been maintained by someone who has never worked inside an academy.`;
        addJournal('Storage manifest notation: field-craft shorthand — non-academic author confirmed', 'intelligence', `mim-reagent-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The study room access log has entries in the same hand as the charter exemptions.",
    skill: 'wits',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing study room access log against charter exemption handwriting');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.mim_access_log_handwriting_matched = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The study room access log is kept in a cloth binder at the anatomy faculty desk — open reference, no reader credential required. Eight entries over three months use a compressed, vertical hand that matches the counter-entries in Leth's dual-notation ledger. The study room booked under those entries is the cadaveric chemistry suite, which requires a secondary faculty approval for glyph-sensitive reagent work. That approval was signed by a regent code Sarith could not match. The anatomy faculty desk clerk flips to the approval slips unprompted. She has already noticed the handwriting. She has been waiting for someone to ask.`;
        addJournal('Study room access log: charter hand matches ledger — chemistry suite approvals use unverifiable regent code', 'evidence', `mim-accesslog-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The anatomy faculty desk is staffed by a proctor running two posts simultaneously. He logs the inquiry before answering it — duty protocol, he explains, for any cross-referencing request involving access records. The log binder goes under the desk. Cross-referencing access records against external documents requires a formal comparative analysis request, reviewed by the faculty secretary. The request form is three pages. The review takes ten days.`;
        addJournal('Study room access log request blocked — comparative analysis protocol invoked', 'complication', `mim-accesslog-fail-${G.dayCount}`);
      } else {
        G.flags.mim_access_log_handwriting_matched = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The access log shows eight bookings in the cadaveric chemistry suite outside the standard teaching schedule. The hand in those entries is compressed and vertical — not the anatomy faculty's rounded administrative script. The desk clerk confirms she did not write those entries. They are in the log because they arrived pre-filled, already approved. She filed them without questioning the format. The regent code on the approval slips is the same code Sarith flagged.`;
        addJournal('Pre-filled chemistry suite bookings in foreign hand — Sarith regent code on approvals', 'intelligence', `mim-accesslog-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "Student stipend disbursements for glyph resonance candidates stopped without a faculty notice.",
    skill: 'charm',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracing glyph resonance student stipend disbursement halt');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.isCrit) {
        G.flags.mim_stipend_halt_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The stipend disbursement office is run by Neven Osk, a compact man who keeps his records in coloured folders by funding source. The glyph resonance track folder is thinner than the others. Neven opens it without prompting and names the disbursement halt date: the same week Pellin Ost's anomaly report was reclassified. The halt was not a budget decision — the fund balance was intact. It was an administrative hold placed by an external authority code that Neven had not encountered before and has not encountered since. Three candidates received half-disbursement before the hold. The fourth received nothing and withdrew the following term.`;
        addJournal('Stipend halt: administrative hold by unknown authority code, same week as Pellin reclassification — one candidate withdrew', 'evidence', `mim-stipend-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Neven Osk asks for a faculty authorization code before opening the disbursement records. He is not obstructing — he is following a procedure that was added to his desk manual four months ago, precisely for glyph resonance track inquiries. He shows the desk manual page, which is printed on paper that does not match the surrounding pages: thicker stock, fresher ink, inserted after the original binding. Someone added that procedure recently and specifically.`;
        addJournal('Stipend office: new glyph resonance inquiry procedure inserted into desk manual — recent addition', 'complication', `mim-stipend-fail-${G.dayCount}`);
      } else {
        G.flags.mim_stipend_halt_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Neven confirms the disbursement halt without hesitation — it is an anomaly in his records and he has no satisfactory explanation for it. The halt code applied to the entire glyph resonance track at once, affecting four active candidates. The fund remained solvent throughout. No faculty notice accompanied the hold. He filed a query with the Dean's finance office. The query was acknowledged and is marked pending, which in this office means it will not be answered.`;
        addJournal('Glyph resonance stipend halt: whole-track administrative hold, solvent fund — Dean finance query unanswered', 'intelligence', `mim-stipend-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "A pressure spike on the same night as a Fairhaven delivery not in any manifest.",
    skill: 'wits',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'correlating observatory glyph sensor spike with off-manifest Fairhaven delivery');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.mim_observatory_spike_linked = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The observatory keeps a continuous glyph pressure log — a long paper roll mechanically advanced by a calibrated clock drum, updated every four hours. The technician on duty, Bress Alvane, pulls the roll to the inspection table and points to the spike without being asked: a pressure deviation three times the ambient baseline, lasting forty minutes, origin bearing southwest. Southwest is the Watchers Perch tunnel approach. The date is four nights before the classification directive was issued. The same date is the last unmanifested Fairhaven delivery in Myra's personal cargo log. The spike is annotated in the margin in Bress's handwriting: "No weather cause — source unknown."`;
        addJournal('Observatory spike matches last unmanifested Fairhaven delivery — Watchers Perch bearing, pre-classification', 'evidence', `mim-observatory-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The observatory is locked for calibration maintenance — a scheduled event that the door notice says runs until the end of the week. Bress Alvane can be reached through the faculty instrument office, where a secretary takes the inquiry and adds it to a callback list. The callback list, she mentions, currently runs about twelve days. The lock on the observatory door is a padlock, not a key cylinder — it has been added recently, over the original door hardware.`;
        addJournal('Observatory locked for calibration — padlock added over original hardware', 'complication', `mim-observatory-fail-${G.dayCount}`);
      } else {
        G.flags.mim_observatory_spike_linked = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Bress Alvane is willing to show the pressure log and does so without formality. The spike is documented: southwest bearing, no weather cause noted, forty-minute duration. The date falls in the same window as the unmanifested Fairhaven deliveries Myra's cargo log covers. Bress cannot say what caused it — the instruments measure direction and magnitude, not source. But the bearing puts the origin consistent with the Watchers Perch access tunnel, and the date puts it consistent with delivery activity.`;
        addJournal('Observatory pressure spike: southwest bearing, no weather cause — consistent with Watchers Perch and Fairhaven delivery window', 'intelligence', `mim-observatory-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The credential file holds a Collegium endorsement the Collegium's registry can't confirm.",
    skill: 'finesse',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'verifying visiting lecturer Collegium credential against registry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.isCrit) {
        G.flags.mim_lecturer_credential_fraudulent = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The credential file is in the faculty registrar's open-access visitor section — no restriction on reading, only on copying. The Collegium endorsement uses a valid seal format, the right counter-signature position, the correct certification phrase. Everything except the reference number. The reference number resolves to a dormant Collegium file from eleven years ago, assigned to an institution that no longer exists. Someone transferred the number to a current credential. The visiting lecturer has been delivering glyph resonance supplementary sessions for six weeks, off the public lecture calendar.`;
        addJournal('Visiting lecturer credential: Collegium reference number belongs to defunct institution — off-calendar glyph resonance sessions', 'evidence', `mim-lecturer-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The registrar's visitor section is open during posted hours. The hours posted on the door are different from the hours on the faculty noticeboard in the rotunda. The section is closed when arrived at. The registrar on duty through the window writes something at his desk while maintaining the polite fiction of not having seen you at the door. The duty log entry will note an after-hours approach. Come back during the correct hours, which will now require looking them up.`;
        addJournal('Registrar visitor section closed — after-hours approach logged', 'complication', `mim-lecturer-fail-${G.dayCount}`);
      } else {
        G.flags.mim_lecturer_credential_fraudulent = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The credential file is readable. The Collegium endorsement looks correct in form — seal position, counter-signature, certification phrase — but the reference number does not appear in the Collegium registry when checked against the posted annual index. The annual index is current as of three months ago. The credential was filed seven months ago. Either the endorsement predates the index update, or it was never in the registry to begin with. The visiting lecturer's session schedule is not on the public calendar.`;
        addJournal('Visiting lecturer Collegium reference not in annual registry — session schedule off public calendar', 'intelligence', `mim-lecturer-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The east tunnel approach serviced three times in one month. No maintenance order filed.",
    skill: 'vigor',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'questioning grounds crew lead Torva Seld about unlogged east tunnel maintenance');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.vigor||0));
      if (result.isCrit) {
        G.flags.met_torva_seld = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Torva Seld runs the grounds crew out of a low building near the east perimeter and keeps her own work orders filed in a wooden box by date. She tips the box out on the table between you without ceremony and points to three dates. No maintenance orders — she asked for them each time and was told by a single faculty regent that the work was pre-authorized verbally and the orders would follow. They did not follow. The work was clearing and widening the east tunnel approach: not routine, not maintenance. She knows the difference. The regent's name she gives does not appear on the faculty roster.`;
        addJournal('Grounds crew: east tunnel widening, no orders — non-faculty regent matches Ilys inn guest description', 'evidence', `mim-grounds-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Torva Seld is mid-shift and her crew is visible across the east yard. She listens to the question, sets her work order binder flat, and says that grounds crew records are property of the Academy estates office and are not available for external review. She is not hostile. She is specific. The estates office is on the other side of the main building, open three mornings a week, and requires a faculty sponsor for external access requests. Her crew has gone back to work around her.`;
        addJournal('Grounds crew records referred to estates office — faculty sponsor required for access', 'complication', `mim-grounds-fail-${G.dayCount}`);
      } else {
        G.flags.met_torva_seld = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Torva confirms the three east tunnel approach servicing jobs and confirms no maintenance orders were filed for any of them. Verbal authorization from a faculty regent, she says — she asked twice for written orders and was told they were coming. The work itself was approach clearance and tunnel-mouth widening: not standard maintenance, more consistent with preparing a route for repeated vehicle or cargo access. She noted this at the time in her personal log but did not escalate it.`;
        addJournal('East tunnel approach widened three times, verbal auth only — grounds lead noted cargo-access preparation', 'intelligence', `mim-grounds-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The emeritus office was cleared mid-term. Furniture out, key returned, no sabbatical notice posted.",
    skill: 'finesse',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'tracing sudden mid-term emeritus office vacancy');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.isCrit) {
        G.flags.mim_emeritus_office_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The faculty housing office keeps departure records by room number. The emeritus office cleared nine weeks ago: furniture removed in a single morning, key returned by proxy, no forwarding address filed. The proxy who returned the key signed with the same compressed hand as the charter exemptions and the anatomy study room entries. The emeritus who held the office is the same one whose initials appear exclusively on the restricted-stack withdrawal register for the past eleven months. He did not resign or retire — no notice in the faculty record. He stopped appearing and someone returned his key.`;
        addJournal('Emeritus office cleared by proxy with charter hand — restricted-stack monopoly holder vanished without notice', 'evidence', `mim-emeritus-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The faculty housing office has a standing instruction — added to the duty protocol at the same time as the anatomy desk manual amendment — that emeritus accommodation changes are handled through the Dean's office directly and not discussed with external parties. The housing clerk shows the protocol amendment before closing the inquiry. It is the same thick-stock paper, the same fresher ink as the anatomy desk amendment. Someone updated two different office manuals at the same time.`;
        addJournal('Housing office: emeritus records closed by Dean protocol — same paper stock as anatomy desk amendment', 'complication', `mim-emeritus-fail-${G.dayCount}`);
      } else {
        G.flags.mim_emeritus_office_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The housing office confirms the emeritus departure: nine weeks ago, morning clearance, key by proxy. No sabbatical posted, no forwarding address. The clerk pulls the departure slip — the proxy signature is initials only, compressed script. She doesn't recognize the hand. The emeritus's name is the same one on the restricted-stack withdrawal register. He held exclusive access for eleven months. He is no longer in the building. Nobody in the housing office was told why.`;
        addJournal('Emeritus departed by proxy, nine weeks ago — same individual as restricted-stack monopoly holder', 'intelligence', `mim-emeritus-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "After certain seminars the same group leaves together. They don't return to the dormitory.",
    skill: 'finesse',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tailing student group departing seminars to off-dormitory destination');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.finesse||0));
      if (result.isCrit) {
        G.flags.mim_student_debrief_route_mapped = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Four students, all on the glyph resonance track, exit through the library garden gate after the visiting lecturer's off-calendar sessions and walk to a provisioning house on the east side of the settlement — not a faculty building, not on Academy maps. The route goes past the east gate without stopping. Inside the provisioning house, through the window, a lamp is already burning at a table with three chairs and documents laid flat. The students are met by a figure in a plain coat who is not the visiting lecturer. The session in there runs longer than the seminar did. Whatever is being taught in the sanctioned curriculum, this is the actual one.`;
        addJournal('Glyph resonance students debrief at off-Academy provisioning house — third-party instructor, documents on table', 'evidence', `mim-debrief-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The group splits at the library garden gate — two take the dormitory path, two continue east, and one of the eastbound students glances back before the corner. The glance is brief and returns forward without reaction, but the pace of the two eastbound students increases after the corner. When the corner is rounded, they are gone: not into a building, not down the lane, simply not where a normal walking pace would have put them. Someone in that group has been watching for followers.`;
        addJournal('Student group counter-surveillance at library gate — eastbound pair lost after corner check', 'complication', `mim-debrief-fail-${G.dayCount}`);
      } else {
        G.flags.mim_student_debrief_route_mapped = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Three students from the visiting lecturer's off-calendar sessions leave together via the library garden gate. The route goes east, past the main campus boundary, to a provisioning house not marked on Academy maps. The building's ground-floor window shows lamplight after dark on the same evenings as the sessions. The pattern is consistent enough to be a standing arrangement. Whatever is happening in that building is tied to the same schedule as the off-calendar seminars.`;
        addJournal('Student group follows east route to unmapped provisioning house after off-calendar sessions — standing arrangement', 'intelligence', `mim-debrief-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The seal is genuine. The paper it's on was made this year.",
    skill: 'spirit',
    tags: ['Stage2', 'NPC'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'conducting materials analysis on external charter document authenticity');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.spirit||0));
      if (result.isCrit) {
        G.flags.mim_charter_document_forged = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The external charter document that authorized the classification directive sits in the Dean's open reference file as a matter of institutional record. The seal is authentic — old wax, the right press depth, heat-oxidation consistent with its stated date. The paper is not. The fiber compression on this stock does not occur until after three years of shelf storage; this document shows none. The ink carrier has not fully set into the weave. Written on paper produced this year, dated three years ago, sealed with a genuine seal from that period. A genuine seal taken from a different document and transferred. The classification directive is built on a fabricated foundation.`;
        addJournal('External charter document: genuine seal on fresh paper — seal transferred from period document, directive is fabricated', 'evidence', `mim-charter-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The Dean's reference file is available to faculty and registered researchers. Registered readers may view documents but not handle them without archivist supervision. The archivist assigned to supervise document handling is away from the desk. The duty archivist who covers in her absence handles document access through a booking form with a two-day turnaround. The charter document is visible in the file through the reference cabinet glass — the seal is right, the paper is another matter — but the glass is between the document and any analysis.`;
        addJournal('Charter document visible but inaccessible — archivist booking required, two-day wait', 'complication', `mim-charter-fail-${G.dayCount}`);
      } else {
        G.flags.mim_charter_document_forged = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The paper stock and the seal do not belong to the same document. The seal carries genuine age: wax oxidation, press depth consistent with old tooling. The paper is too fresh — the fiber has not had time to compress fully, and the ink carrier sits on the surface rather than sinking into the weave. Three years old on the face. Produced this year by the material evidence. The classification directive rests on a document where the authority mark and the physical record are from different sources.`;
        addJournal('Charter document seal and paper from different sources — directive authority mark transferred onto fresh paper', 'intelligence', `mim-charter-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    label: "The Academy's classified research was the theoretical foundation. Expose or contain.",
    skill: 'wits',
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(108, 'Mimolot Academy Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The reading room map on the rotunda wall shows nine points of evidence, but three connections between them are still broken lines. The the faculty council requires a complete chain before it will convene on an institutional complaint — a single unlinked fragment gives them room to dissolve the whole inquiry. The gaps need closing before this can move forward. The smell of old vellum and chalk dust fills the corridor outside. Scholars work in silence at the reference tables beneath the tall clerestory windows. The sealed external directive sits in its folder, waiting for the rest of the record to meet it.`;
        G.recentOutcomeType = 'partial'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You lay the full chain in front of the the faculty council: theoretical formula predating the commission, classification directive from outside the faculty, Fairhaven delivery logs, Memory Hall inscription confirming the safety system reversal. The Council convenes in closed session the same afternoon. A formal inquiry is opened. The operation's theoretical foundation is now in the institutional record, attached to named signatories on both sides of the charter violation.`;
        addJournal('Mimolot Academy S2 finale: the faculty council formal inquiry opened', 'evidence', `mim-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The classified research goes to the Verdant Row network before the Academy's containment procedures can close around it. Copies move through three separate channels simultaneously. The network has the theoretical basis for the suppression compounds now, and the knowledge of how the Watchers Perch system was reversed. The Academy's ability to contain this ends before it starts. The cost is that the network knows it before the the faculty council does.`;
        addJournal('Mimolot Academy S2 finale: classified research leaked to Verdant Row', 'evidence', `mim-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "Faculty correspondence in the archive hints at outside interference — no name attached.",
    skill: 'wits',
    tags: ['Collegium', 'Stage2', 'Evidence'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'Mimolot Collegium academic correspondence');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit || result.total >= 12) {
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The correspondence is between two faculty members — formal register, tight margins, no salutation beyond initials. The first letter asks whether the external classification directive applies to the theoretical work as well as the applied findings. The second answers: classification directives from outside the faculty are not standard procedure and have no precedent in the Academy charter, but the directive arrived with a Collegium counter-seal, which means it carries force regardless of charter. The correspondent adds, in a postscript so compressed it is nearly illegible: "We are being told to not write down what we already know."';
        addJournal('Mimolot archive: faculty correspondence — external Collegium classification directive applied to theoretical research, no charter precedent, counter-seal used to enforce.', 'evidence');
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The research archive requires a faculty credential or an approved external researcher registration. The archive attendant notes the request and explains the process without hurrying it: three-day review, faculty sponsor required, Dean\'s office sign-off for correspondence files. She writes the inquiry reference number on a form slip and slides it across. The request is logged. Whatever the letters say, they are now behind a process that takes longer than the window available.';
        addJournal('Mimolot archive: external researcher registration required for correspondence files — access request logged with Dean\'s office.', 'complication');
      } else {
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The archive holds faculty correspondence by term and subject. The administrative anomalies file — a designation someone added to an otherwise unnamed folder — contains letters between two scholars discussing a classification directive that arrived from outside the faculty. The language is precise and deliberately plain: they were told certain findings could not be documented. The letters do not name who told them this. They note the date.';
        addJournal('Mimolot archive: faculty correspondence on external classification directive — findings suppressed by unnamed authority, date recorded.', 'evidence');
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "Ruveth knows the suppression history cold — until the conversation reaches the Academy itself.",
    skill: 'charm',
    tags: ['Collegium', 'Stage2', 'Intelligence'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'Mimolot Collegium scholar evasion');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var result = rollD20('charm', (G.skills.charm||0));
      if (result.isCrit || result.total >= 14) {
        G.flags.met_scholar_ruveth = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Ruveth speaks fluently about the suppression period — dates, mechanisms, procedural logic. Then the question touches the Academy\'s own Collegium relationship. He finishes his coffee, sets the cup in the exact center of the saucer ring, and says: "The Academy accepted a funding arrangement that required certain research to remain within the institution\'s administrative domain. That is not uncommon." He does not say what the arrangement required in exchange. Technically true. The conversation ends without the thread closing.';
        addJournal('Mimolot scholar Ruveth: Academy accepted Collegium-linked funding arrangement requiring research to remain in administrative domain — terms not stated.', 'intelligence');
        G.flags.stage2_faction_contact_made = true;
      } else if (result.isFumble) {
        G.flags.met_scholar_ruveth = true;
        G.lastResult = 'Ruveth discusses administrative history with precision and apparent openness, right up to the moment the question turns toward the Academy\'s current institutional relationships. He finishes his coffee, sets the cup down in the center of the saucer ring, and says the relevant records are internal to the faculty governance process. He smiles. "I would check the public charter filings — those are accurate as far as they go." The qualification is doing a great deal of work.';
      } else {
        G.flags.met_scholar_ruveth = true;
        G.lastResult = 'Ruveth is precise and helpful until the conversation approaches the Academy\'s own institutional position. He finishes his coffee, sets the cup down in the exact center of the saucer ring, and notes that the administrative relationship between academic institutions and external bodies is a matter of public charter record. He is not refusing to answer. He is redirecting toward a record that, if you have already looked, you know has a gap in it.';
        addJournal('Mimolot scholar Ruveth: redirected to public charter record when questioned about Academy-Collegium relationship — charter gap already documented.', 'intelligence');
        G.investigationProgress = (G.investigationProgress||0) + 1;
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The thesis defense schedule has a recurring deferral on one research track.",
    skill: 'wits',
    tags: ['stage2', 'mimolot_academy'],
    xpReward: 36,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(36, 'reviewing academy thesis defense deferrals');
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 13) {
        G.flags.mim_defense_deferrals_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('Indefinitely Deferred', 'The defense schedule is pinned to a cork board in the rotunda, each term on a colored card. Four candidates on the glyph resonance track have been marked DEFERRED PENDING ADVISOR REVIEW across three consecutive terms — the same notation, the same advisor signature, a different handwriting on each card. Standard deferral is one term. Three is procedurally unprecedented. One candidate was on the rolls at the same time as the Fairhaven delivery shipments. She has since withdrawn without a filed reason. The empty card slot was replaced with a blank.');
        addJournal('Academy defense schedule: 4 glyph resonance candidates deferred three terms — one withdrew during Fairhaven shipment window', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration('Rotunda Monitor', 'A proctor passes through the rotunda while the schedule cards are being read and slows without stopping. The cards are student-facing notices; close review by non-faculty requires an advisor sponsorship letter on file. He does not ask for one. He notes the time on his duty sheet instead, which is worse — the notation is indefinite and travels with him into the weekly briefing. The cards themselves stay pinned. The reader, now, is logged. The glyph resonance track disappears behind the brass compass study under the next pinup rotation.');
      }
    }
  },

  {
    plot: 'main',
    label: "The library's late-return register has the same reader's initials on every restricted-stack withdrawal.",
    skill: 'finesse',
    tags: ['stage2', 'mimolot_academy'],
    xpReward: 38,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'tracing Academy restricted-stack withdrawals');
      var roll = rollD20('finesse', G.skills.finesse);
      if (roll.total >= 14) {
        G.flags.mim_restricted_withdrawal_tracked = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('Same Initials', 'The late-return register is kept at the circulation desk in a weatherworn cloth binder — three years of returns logged in alternating ink colors by shift. Restricted-stack withdrawals are supposed to rotate through multiple authorized readers as an internal check against single-point access. The register shows the same two initials on every restricted return for the past eleven months. The initials match a senior faculty name that does not appear on the faculty roster. He holds emeritus status. Emeritus holders retain check-out privileges but are not supposed to hold them exclusively.');
        addJournal('Academy restricted stacks: emeritus faculty holds exclusive withdrawal access for 11 months — rotation protocol bypassed', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Circulation Protocol', 'The circulation librarian closes the register cover with a small movement that does not hurry itself. Withdrawal records are library administrative files; access requires a librarian referral and a filed purpose statement. She does not produce either form — she simply waits. Two students at the return counter have started reshelving slips that do not require reshelving. The register goes back under the desk. The cloth binder carries a small ink smudge on the spine from a thumb that rests there when someone is deciding what to do next.');
      }
    }
  },

  {
    plot: 'main',
    label: "The glyph damping theoretical texts cite a practitioner network the faculty won't name.",
    skill: 'wits',
    tags: ['Stage2', 'Lore', 'Arcane'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'tracing practitioner network cited in Academy glyph damping theory');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var result = rollD20('wits', (G.skills.wits||0));
      if (result.total >= 13 || result.isCrit) {
        G.flags.arcane_contact_1 = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The footnotes in the glyph resonance theory stack use an inconsistent citation format for one specific body of work — not the Fairhaven phantom monograph, something older. The source is identified only by a practitioner mark: a three-loop glyph pressed into the page margin in faded ink, not printed. Quenra sees you trace it and takes the book. She holds it to the window for a moment. "That mark belongs to the Resonance Compact. They operated before the classification period." She sets the book down carefully. "They are not supposed to still be operating." Her voice is level. Her hand is still on the cover.';
        addJournal('Academy texts cite pre-suppression Resonance Compact — practitioner mark found in margin, Quenra confirms group still active', 'intelligence');
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The footnote trail leads to the restricted section, and the restricted section is locked. A faculty proctor finds you at the gate with the open research paper in hand. He writes the citation reference in his duty log before he escorts you out. Whatever practitioner network left those margin marks, the Academy has now been told someone was looking for them.';
        addJournal('Restricted-stack approach logged — practitioner citation inquiry flagged', 'complication');
      } else {
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The margin marks are consistent across four papers: a three-loop glyph, pressed with a personal seal rather than printed. The papers span the founding period of the Academy\'s glyph resonance track. The mark does not match any faculty seal in the public registry. Someone outside the institution contributed to this research and chose not to be named in the formal record. The omission looks deliberate.';
        addJournal('Unregistered practitioner seal in Academy glyph theory margins — consistent across four papers, deliberate omission', 'evidence');
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The lecturer crossed out a name in his own margin before speaking.",
    skill: 'wits',
    tags: ['stage2', 'mimolot_academy'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(40, 'observing a lecturer self-censoring margin notes');
      var roll = rollD20('wits', G.skills.wits);
      if (roll.total >= 14) {
        G.flags.mim_lecturer_self_censor_seen = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        addNarration('Crossed Through', 'The lecturer arrives early and sets his notes on the lectern, reviewing them while the hall fills. Before the session opens he draws a line through a name in his own margin — a single horizontal stroke, pen pressed hard enough to leave an indent through two pages. The lecture proceeds without reference to the crossed-out name. Afterward, when the hall empties, the notes remain on the lectern for the sweeper. The indent is readable against the lamp. The name corresponds to a co-author on a glyph damping paper whose abstract was pulled from the Academy catalog three months ago.');
        addJournal('Academy lecture notes: lecturer self-censored co-author name — abstract also pulled from catalog', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration('Sweeper Intervention', 'The hall sweeper reaches the lectern before the lamp angle is right for reading the indent. He is a tidy older man with a cart, and he carries the pages to the faculty pigeonholes without looking at them — long habit, deliberate incuriosity. The lecturer has already left through the side corridor. The lectern is wiped down with a cloth that leaves no streak. Whatever was crossed out is now in a pigeonhole, which is a locked-key corridor the Academy does not extend to visiting readers. The reading path closes cleanly.');
      }
    }
  },

  // === COLLEGIUM INVESTIGATION PATH — Chain Link 3 (Terminus) ===
  // Gated on collegium_contact_2; sets collegium_contact_3 + stage2_faction_contact_made
  {
    plot: 'main',
    label: "Renne's cross-reference code points to a name in the Academy's restricted visitor log.",
    skill: 'charm',
    tags: ['Collegium', 'Stage2', 'NPC', 'Persuasion', 'Faction'],
    xpReward: 40,
    failResult: function() {
      addNarration('', 'The archive hush settles over the reading carrel before the second sentence forms. A registrar pauses at the catalogue station, tracking you without raising her eyes. You step back from the brass-fitted shelving and leave the question unspoken.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.flags) G.flags = {};
      if (!G.flags.collegium_contact_2) {
        G.lastResult = 'The senior review track at the Academy requires a Cosmoria cross-reference code — a registry identifier from the Cosmoria Collegium linking prior access records. You do not have one yet. That chain begins elsewhere. The restricted visitor log sits behind a clerk\'s desk at the far end of the archive corridor, its brass clasp catching the light from the clerestory windows above the reference shelves. The corridor smells of old vellum and chalk dust. The clerk works in silence, making entries in a ruled ledger, unhurried, as though nothing about this room carries weight.';
        G.recentOutcomeType = 'locked';
        return;
      }
      gainXp(95, 'completing Collegium chain at Mimolot Academy');
      var result = rollD20('charm', (G.skills.charm||0));
      if (result.total >= 14) {
        G.flags.collegium_contact_3 = true;
        G.flags.stage2_faction_contact_made = true;
        G.investigationProgress = (G.investigationProgress||0) + 2;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The name in the restricted visitor log is Overseer Davan Mirce, Collegium Senior Review, Transit Certification Division. He visited the Academy twice in the same season the glyph damping abstracts were pulled from the catalog. The Academy\'s notation lists the purpose as "curriculum consultation." Mirce is in the Collegium\'s own records as a routing compliance officer, not a curriculum consultant. The cross-reference code from Cosmoria connects his visit dates to the hold stamp anomaly. The chain is complete. It is also documentable, which is different from safe.';
        addJournal('Collegium Senior Reviewer Mirce visited Mimolot Academy during the abstract suppression period. Visit logged as curriculum consultation — does not match his Collegium role. Cross-reference to Cosmoria hold stamp anomaly confirmed. Source: Mimolot restricted visitor log, Collegium transit records.', 'evidence');
        G.recentOutcomeType = 'success';
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The restricted visitor log requires a faculty counter-signature to release cross-reference entries to outside inquirers. The faculty registrar is willing but needs two working days to produce the form. She is precise about this — two days, not one, and not before the certification review cycle closes. The cross-reference will be accessible then. The window is narrow and the Collegium\'s review schedule moves on its own clock.';
        G.recentOutcomeType = 'blocked';
      }
    }
  },

  {
    plot: 'main',
    label: "Quillan Quillmark processed the restriction paperwork. He held the pen.",
    skill: 'charm',
    tags: ['Stage2', 'NPC', 'Lore'],
    tag: 'bold',
    failResult: "Quillan is behind the access desk with two faculty members present. He listens to the question, opens a form drawer, and produces the external inquiry protocol sheet without speaking. The faculty members do not look up. The form has seven fields. The review cycle takes fourteen days.",
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'pressing Quillan Quillmark on restricted-access paperwork he processed');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.isCrit) {
        G.flags.met_quillan_quillmark = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Quillan sets his pen down with the deliberateness of a man deciding something. He says he processed the restriction paperwork under a regent authorization code that arrived pre-filled — his job was to date it, countersign, and file it. He did all three. The authorization code is the same one Sarith flagged at the tariff desk. He opens his filing cabinet and pulls the original instruction slip without being asked. His initials are on the bottom line. "I signed it," he says. "I did not write it. Those are different things."';
        addJournal('Quillan Quillmark: restriction paperwork signed under pre-filled regent code — same code as Sarith tariff anomaly', 'evidence', 'mim-quillan-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Quillan is behind the access desk with two faculty members present when the question lands. He opens a form drawer without pause and produces the external inquiry protocol sheet — the motion is smooth, well-practiced, the drawer closing with a soft click of the brass pull. The faculty members do not look up from their papers. The form has seven fields and a review cycle of fourteen days. The duty log entry under his pen is already dated. Whatever he might have said in a different register is not accessible here, in the chalk-dust quiet of the Academy\'s intake corridor, with witnesses at either elbow.';
        addJournal('Quillan Quillmark inquiry — external protocol invoked, faculty present, duty log entry dated', 'complication', 'mim-quillan-fail-' + G.dayCount);
      } else {
        G.flags.met_quillan_quillmark = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Quillan confirms he countersigned the restriction paperwork. He does not open his filing cabinet, but he does not deny the question either. The regent authorization code that came with the instruction was formatted correctly for an internal faculty directive — the right fields, the right sequence — but the originating office designation does not correspond to any faculty department he has seen before or since. He noted this at the time. He filed it anyway because the format was valid. He has wondered since whether that was the point.';
        addJournal('Quillan Quillmark: restriction instruction used valid format but unknown originating office — accepted on format, not verified authority', 'intelligence', 'mim-quillan-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "Vessa Scriptmere maintains canon compliance. The phantom monograph breaks it.",
    skill: 'wits',
    tags: ['Stage2', 'NPC', 'Lore'],
    tag: 'risky',
    failResult: "Vessa's canon compliance work runs through the faculty review channel, not the public archive. External access to compliance records requires a faculty membership number on file. She writes the reference number for the access form on a slip of paper and slides it across the desk. Her expression is not unkind.",
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'drawing out Vessa Scriptmere on phantom citation canon compliance failure');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_vessa_scriptmere = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Vessa pulls a compliance flag she filed eight months ago without being prompted — she kept a copy after the original was returned to her stamped RESOLVED with no resolution attached. The phantom monograph appears in her flag: fourteen citations across the glyph resonance stack referencing a Fairhaven source she could not locate in any registry she has access to. She escalated it to the canon review committee. The committee returned the flag as resolved and declined to share the resolution basis. She wrote the committee\'s non-answer into the flag margin in a hand tight enough to read only at close distance.';
        addJournal('Vessa Scriptmere: phantom monograph compliance flag returned RESOLVED without resolution — committee response documented in margin', 'evidence', 'mim-vessa-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Vessa\'s compliance role runs through the faculty review channel and she tells this clearly: external access to compliance records requires a faculty membership number. She is not obstructing. She writes the reference number for the access form on a slip of paper. Her expression is not unkind. The compliance records that might answer the question are now behind a process that requires sponsorship she cannot provide.';
        addJournal('Vessa Scriptmere canon compliance records — faculty membership required, access form reference given', 'complication', 'mim-vessa-fail-' + G.dayCount);
      } else {
        G.flags.met_vessa_scriptmere = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Vessa confirms the phantom monograph is a canon compliance failure — a source cited fourteen times in the glyph resonance stack that resolves to nothing in any registry she can access. She flagged it eight months ago. The flag came back stamped RESOLVED. She asked for the resolution basis. No one provided it. She opens the compliance log to the entry and points to the RESOLVED stamp. Below it, in her own hand, is a single word: "By whom."';
        addJournal('Vessa Scriptmere: phantom monograph compliance flag resolved without basis — "By whom" noted in log', 'intelligence', 'mim-vessa-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "Archivist Valcrest approved the rotation bypass. That decision left a paper trail.",
    skill: 'wits',
    tags: ['Stage2', 'NPC', 'Lore'],
    tag: 'bold',
    failResult: "Valcrest's office door is closed and the schedule posted outside shows his next available appointment is in eleven days. The archive attendant offers to add a name to the waiting list. She does not offer a reason for the delay. The waiting list has four names above the one she writes.",
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'confronting Archivist Luthen Valcrest on restricted-stack rotation bypass authorization');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_archivist_valcrest = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Valcrest is at the reading-room table when the question reaches him — not in his office, accessible by circumstance rather than appointment. He looks at the late-return register page for a long time. Then he says the rotation bypass was a directive he received through the Dean\'s office, attached to the same external charter authorization that sealed the restricted stacks. He signed the bypass form because the charter authorization was formally valid. He has since checked the charter mark against the Academy\'s sealed-authority registry. It appears there once: on the paperwork Quillan Quillmark countersigned. Nowhere before that. He has been waiting for someone to connect those two documents.';
        addJournal('Archivist Valcrest: rotation bypass ordered under external charter — same mark as Quillan paperwork, appears nowhere prior in authority registry', 'evidence', 'mim-valcrest-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'Valcrest\'s office door is closed. The schedule posted outside shows eleven days to the next available appointment. The archive attendant adds a name to the waiting list without being asked for a reason. The list has four names above it. Before the outer door is reached on the way out, the attendant has already sent a message through the internal courier slot — a folded slip, sealed with a green wax circle that is the archive\'s standard inter-office notation for visitor inquiries.';
        addJournal('Archivist Valcrest inaccessible — waiting list logged, inter-office notification sent on departure', 'complication', 'mim-valcrest-fail-' + G.dayCount);
      } else {
        G.flags.met_archivist_valcrest = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'Valcrest confirms he authorized the rotation bypass — it is his signature on the form, and he does not deny it. The directive came through the Dean\'s office with a charter authorization attached. He processed it as a valid institutional instruction. When pressed on the charter mark\'s origin, he pauses. He says he checked the sealed-authority registry afterward, as a matter of professional habit. The mark appears only once in that registry, on a document dated the same week as the restricted-stacks classification. Before that week, it does not exist.';
        addJournal('Archivist Valcrest: rotation bypass on Dean-relayed charter — mark appears in authority registry only once, dated same week as restriction', 'intelligence', 'mim-valcrest-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The Crown Research Protocol code has a parent authority file. Someone filed it somewhere.",
    skill: 'wits',
    tags: ['Stage2', 'NPC', 'Lore'],
    tag: 'risky',
    failResult: "The Book Tariff Office's authority file index is a restricted administrative document — exempt designation codes and their originating authorities are not public record. The clerk at the counter explains this with the practiced patience of someone who has said it many times. The index stays in its locked cabinet behind the desk.",
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'tracing Crown Research Protocol authority origin in Book Tariff Office registry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.mim_crown_protocol_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The Book Tariff Office keeps its authority file index in a cabinet behind the counter — restricted, but the clerk on duty this afternoon trained under the previous registrar and holds the older key set. She pulls the index without fanfare. The Crown Research Protocol designation appears once: registered seven months ago under a filing authority listed as "Collegium Transit Certification — Special Review Division." The same division Overseer Davan Mirce works under. The registration was processed by the tariff office\'s senior clerk, who retired four months ago. His forwarding address is Fairhaven.';
        addJournal('Crown Research Protocol registered by Collegium Transit Certification — Mirce\'s division, senior clerk now retired to Fairhaven', 'evidence', 'mim-protocol-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The authority file index is a restricted administrative document and the clerk at the counter explains this with the practiced patience of someone who has said it before. The index stays in its locked cabinet. She writes the inquiry into the desk log before the question finishes. The log, she notes, is reviewed by the tariff office\'s senior oversight committee on a monthly basis. The next review is in nine days.';
        addJournal('Book Tariff authority index inquiry logged — oversight committee review in nine days', 'complication', 'mim-protocol-fail-' + G.dayCount);
      } else {
        G.flags.mim_crown_protocol_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = 'The authority file index yields the Crown Research Protocol designation under a filing authority that reads "Collegium Transit Certification — Special Review Division." The registration date is seven months ago. The clerk notes this is an unusual filing — most exempt designations originate within the Academy\'s own administrative structure. An external body registering a tariff exemption code through the Book Tariff Office directly, bypassing Academy administration, is procedurally irregular. She did not process it. It was the senior clerk, now retired.';
        addJournal('Crown Research Protocol filed externally by Collegium Transit Certification — bypassed Academy administration, processed by now-retired senior clerk', 'intelligence', 'mim-protocol-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },


  // === FORBIDDEN KNOWLEDGE TRAFFICKING — ~6 choices ===

  {
    plot: 'main',
    label: "Sarith's 'theoretical materials' ledger column has no description and no recipient name.",
    skill: 'wits',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'auditing Sarith Quillfire theoretical-materials ledger column');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_sarith_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Sarith opens the ledger to the column without asking which one — she has been watching it herself. Eleven entries across five months, each listing a weight and a category code but no recipient, no description, no faculty sponsor. The category code is her own shorthand for materials she could not classify against the standard schedule, penciled in rather than printed. She checks the dates against the night-dock register Myra maintains. Seven of eleven entries correspond to Draith Calver's twelve-day arrival cycle. She has known this for three weeks. Nobody asked before.`;
        addJournal('Sarith ledger: theoretical-materials column matches Draith courier cycle, 7 of 11 entries — no recipient, no description', 'evidence', 'mim-sarith-col-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Sarith's desk is shared today with a senior clerk from the Academy accounts office conducting a quarterly receipts audit. The ledger is in use. The senior clerk notes the inquiry, writes the name in his audit log, and suggests a formal access request through the Academy administration office. The ledger column that mattered is now associated with an audit log entry that will travel to the administration office before the week ends.`;
        addJournal('Theoretical-materials column inquiry logged in quarterly audit — administration referral pending', 'complication', 'mim-sarith-col-fail-' + G.dayCount);
      } else {
        G.flags.met_sarith_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Sarith opens the ledger to the column and reads through it with her finger tracing the rows — the habit of someone who has done this before, alone, looking for a pattern. Eleven entries. No recipient name on any of them. The category code is her own, not a standard designation, applied when she could not match an item to the existing schedule. The weights are recorded in a unit notation she recognizes as field shorthand. Not Academy notation. Something older and more portable.`;
        addJournal('Sarith ledger: theoretical-materials column — 11 entries, no recipients, field-shorthand weight notation', 'evidence', 'mim-sarith-col-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The restricted wing smells of something that isn't in the academy's reagent catalog.",
    skill: 'spirit',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'identifying unregistered reagent odor in restricted Academy wing');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.spirit||0));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.mim_unregistered_reagent_identified = true;
        G.lastResult = `The smell is faint and specific: a low mineral sharpness under the standard chalk-and-vellum baseline, not volatile enough to be recent, not faded enough to be old. It matches the residue profile of glyph-reactive binding agents — substances used in prepared suppression compound, not in theoretical research. They leave this trace on porous stone for four to six weeks after contact. The restricted wing's outer corridor has been used for transit storage, not access, and the compound passed through here recently enough that the stone still carries it.`;
        addJournal('Restricted wing: suppression compound binding-agent trace in corridor — transit storage use within 4-6 weeks', 'evidence', 'mim-reagent-smell-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `A maintenance worker is re-sealing the corridor tiles at the restricted wing approach — routine work, by schedule, he says, though the schedule board at the facilities desk does not show this section flagged for maintenance today. He notices the attention paid to the floor and asks for an access credential. When it cannot be produced, he flags the approach on his work sheet and radios the facilities office. The corridor is off limits pending completion of the sealing work, which he estimates at two days.`;
        addJournal('Restricted wing approach sealed — unscheduled maintenance, access flagged', 'complication', 'mim-reagent-smell-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The smell is real and specific enough to isolate — not the standard chalk-and-vellum baseline of the archive corridor, not the lamp-oil residue of the reading room, but something sharper and mineral beneath both. It belongs to a class of binding reagents not on the Academy's catalog of approved materials. Something moved through this corridor that was neither textbook nor equipment. The stone floor carries it in the grain. Whatever it was, it was here recently.`;
        addJournal('Restricted wing: unregistered binding-reagent odor in corridor stone — non-catalog material transported recently', 'evidence', 'mim-reagent-smell-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The glyph resonance text has marginalia in two different hands — neither is faculty.",
    skill: 'wits',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing non-faculty marginalia in restricted glyph resonance text');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.mim_marginalia_identified = true;
        G.lastResult = `The first hand is a field notation style — abbreviated, practical, the writing of someone who takes notes while doing something rather than reading. The second is tighter and more deliberate, adding corrections to the first hand's notes in places. Together they constitute a working commentary on the theoretical text's applicability to active suppression compound production: which equations translate directly, which require adjustment for material purity. This is not scholarship. This is production planning, written into a restricted theoretical text by people who had access to it before it was classified.`;
        addJournal('Glyph resonance marginalia: field + correction hands map compound production steps — written before classification', 'evidence', 'mim-marginalia-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The text is in the restricted section. The reading room attendant who escorted access to it checks back at the table before enough pages are turned to reach the annotated section. She logs the page the text is open to, closes it to the title page, and returns it to the restricted-access shelf. Marginal annotations in restricted texts are a preservation concern, she explains, and further handling requires a preservation supervision request. That form routes to the archive committee.`;
        addJournal('Restricted text access closed — preservation protocol invoked before annotated section reached', 'complication', 'mim-marginalia-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Two distinct hands worked through this text before the classification seal went on. Both are outside any faculty writing style in the open-access reading records — not academic register, not institutional script. One makes brief numerical notes at equation margins. The other adds corrections to the first hand's figures in a smaller, tighter stroke. Someone was using this theoretical text as a working reference, not a research object. They returned it to the shelf.`;
        addJournal('Glyph resonance text: two non-faculty annotating hands — numerical notes and corrections, working use pattern', 'evidence', 'mim-marginalia-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "Three crate labels list Watchers Perch as a transit waypoint, not a destination.",
    skill: 'spirit',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'auditing Watchers Perch transit-waypoint crate labels in loading records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.spirit||0));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.mim_watchers_perch_waypoint_confirmed = true;
        G.lastResult = `Watchers Perch does not have a receiving dock — it is a cave site with a modified access tunnel, not a supply terminus. Three crate labels routing through it as a waypoint point to a final destination field that is blank. Myra's cargo log has the weight notations for the same three crates: the combined mass is consistent with processed compound in transit-grade containment, not raw materials. Whatever was in those crates passed through the cave site and continued moving somewhere the paperwork chose not to record.`;
        addJournal('Three crates routed via Watchers Perch with blank final destinations — weights match processed compound transit', 'evidence', 'mim-waypoint-' + G.dayCount);
      } else if (result.isFumble) {
        G.lastResult = `The loading records for the Watchers Perch route are filed under a separate category from standard Academy deliveries — a designation Myra's supervisor added to the filing system eight months ago. The supervisor handles those files directly. He is not on shift. The records stay where they are. The supervisor's desk, Myra says carefully, is not the kind of desk that gets looked at without his presence.`;
        addJournal('Watchers Perch loading records held by supervisor — separate category, supervisor absent', 'complication', 'mim-waypoint-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Three crates in the loading records list Watchers Perch as a transit point with a blank final destination. Watchers Perch is not a supply terminus — it has no receiving dock, no storage facility, no Academy personnel assigned to it. A transit waypoint at a cave site with no onward destination on record means the paperwork stops before the journey does. The crates moved through there and continued somewhere the manifest does not say.`;
        addJournal('Watchers Perch listed as transit waypoint on three crates — blank final destination, no receiving infrastructure at site', 'evidence', 'mim-waypoint-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The Fairhaven courier's seal matches the wax type on the restricted archive gate.",
    skill: 'spirit',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'comparing courier wax seal to restricted archive gate wax');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.spirit||0));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.mim_wax_match_confirmed = true;
        G.lastResult = `The wax on the restricted archive gate and the wax on Draith Calver's courier receipt are the same compound — identical mineral colorant ratio, identical hardness, the specific formulation produced by one supplier in Fairhaven and not available through any local chandlery. The seal press used on the archive gate left a tool mark in the base wax that matches the press face on the courier's authentication seal. Same wax, same press tool. The gate was sealed by the same hand that issued the courier's pre-clearance.`;
        addJournal('Archive gate wax matches Draith courier seal — same press tool, same Fairhaven mineral wax, same hand', 'evidence', 'mim-wax-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Close examination of the archive gate seal requires approaching the gate with evident intent. A faculty proctor making rounds arrives at the same moment. He does not ask what is being examined; he simply waits. The wait is polite, patient, and complete. When the area is vacated, he checks the gate hardware with a gloved hand and notes something on his duty sheet. The gate's hardware condition is now logged by someone who saw the approach.`;
        addJournal('Archive gate approach observed by proctor — hardware inspection logged on duty sheet', 'complication', 'mim-wax-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The wax on the restricted archive gate is not standard Academy sealing wax — it is a harder compound with a faint mineral coloration, the kind sourced from a specific Fairhaven supplier rather than the local chandlery that fills the Academy's standard supply orders. Draith Calver's courier receipts use the same wax type. The formulation is specific enough to suggest a shared supply source. Both seals came from the same direction.`;
        addJournal('Archive gate wax matches Draith courier receipt wax — Fairhaven mineral compound, non-local supply', 'evidence', 'mim-wax-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The shipment weights don't match what glyph damping theory actually requires.",
    skill: 'wits',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-checking shipment weights against glyph damping theoretical material requirements');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.mim_shipment_weight_discrepancy = true;
        G.lastResult = `Theoretical glyph damping work requires reagents in milligram quantities for controlled experiments. The off-manifest shipments through the east gate list weights in kilograms — three orders of magnitude beyond laboratory scale. At kilogram quantities, these materials are not research supplies. They are production feedstock. The theoretical research at the Academy provided the formula; the shipments provided what the formula requires at a scale that corresponds to distributed field deployment, not academic study. The Academy's role in this was never theoretical at all.`;
        addJournal('Shipment weights at kilogram scale — three orders beyond lab use, consistent with distributed field deployment of compound', 'evidence', 'mim-weight-discrepancy-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The materials schedule for the glyph resonance track is a restricted faculty document — it lists reagent quantities by research phase and is not available for cross-referencing against intake records without a formal comparative request. The faculty secretary's office handles comparative requests. The process requires a purpose statement and a faculty sponsor. The materials schedule and the intake records, kept in two separate offices in two separate buildings, continue to be inaccessible in combination.`;
        addJournal('Materials schedule comparison blocked — separate offices, faculty sponsor required for cross-reference', 'complication', 'mim-weight-discrepancy-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The reagent quantities in the off-manifest shipment logs are wrong for laboratory research — too large by a factor that eliminates any plausible academic use. Glyph damping theoretical work uses trace amounts measured carefully. The night-dock entries log kilograms. The excess is not a rounding error or a cataloging convention. At these weights, the materials are feedstock, not samples. Research was the cover. Something else was the purpose.`;
        addJournal('Off-manifest reagent weights at production scale — laboratory cover inconsistent with kilogram quantities logged', 'evidence', 'mim-weight-discrepancy-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // === NPC ENCOUNTERS — ~7 choices ===

  {
    plot: 'main',
    label: "Quenra's restricted access list has forty names. Thirty-seven of them are faculty.",
    skill: 'wits',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'cross-referencing faculty restricted access with Tutor-Magistrate Quenra Quillfire');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_quenra_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Quenra shows the three non-faculty names on the restricted access list without being asked — she has already circled them in pencil, the circles faint but deliberate. All three received their clearance codes through a Mimolot administrative channel that does not route through faculty authorization at all. The clearance code format matches the one used in the northern convoy staging documentation she is not cleared to share. She taps the margin beside the circled names. "These three were given faculty-equivalent access by someone who is not on this list."`;
        addJournal('Restricted access: 3 non-faculty names hold faculty-equivalent clearance via non-standard admin channel', 'evidence', 'mim-quenra-rlist-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Quenra files a faculty access report citing an unauthorized query about restricted list personnel before the question finishes. The report goes to the Academy compliance wing. Three other faculty members receive notification about the inquiry within the hour — she shows the automated distribution list as she explains the procedure. The report is filed, the names are still there, and the path to reaching them is now significantly narrower than it was before walking through this door.`;
        addJournal('Unauthorized restricted list query logged — compliance wing notified, faculty distribution sent', 'complication', 'mim-quenra-rlist-fail-' + G.dayCount);
      } else {
        G.flags.met_quenra_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Quenra confirms the three non-faculty entries without opening the clearance code records — she cannot open those without a chancellor authorization, and the chancellor was away at a polity assembly during the week the codes were issued. She says this carefully, as if she has thought about what it implies and decided that confirming the sequence is different from discussing the content. Someone signed the chancellor's authorization in the chancellor's absence. The signature line is not blank.`;
        addJournal('Non-faculty restricted access dated to chancellor absence — alternate signatory on authorization', 'evidence', 'mim-quenra-rlist-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "Ilys knows which students don't come back after certain seminars.",
    skill: 'charm',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'drawing out Ilys Quillfire on students absent after specific seminars');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.isCrit) {
        G.flags.met_ilys_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Ilys sets a cup on the counter without being asked and speaks quietly, the way innkeepers learn to speak in common rooms with uncertain acoustics. Four students from the glyph resonance track checked out of their rooms the morning after a specific seminar in the restricted wing — not after the publicly listed sessions, but after the off-calendar one the visiting lecturer runs three times a term. All four listed "extended field placement" as their departure reason. Two came back after a month. Two did not come back at all. She remembers all four. She keeps the room ledger.`;
        addJournal('Four glyph resonance students departed after restricted off-calendar seminar — two did not return', 'evidence', 'mim-ilys-students-' + G.dayCount);
      } else if (result.isFumble) {
        G.lastResult = `The common room is busy — a faculty gathering running late, three tables occupied, voices carrying. Ilys moves between tables with practiced economy, refilling cups without pausing. She hears the question and gives a short, complete answer: "I run an inn. I don't track why guests leave." The answer is not hostile. It is the answer she gives when the room is full. Come back when the tables are empty.`;
        addJournal('Ilys Quillfire deflected — common room occupied, return required', 'complication', 'mim-ilys-students-fail-' + G.dayCount);
      } else {
        G.flags.met_ilys_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Ilys confirms the pattern without needing to check the ledger — she has already noticed it. Students on the glyph resonance track who attend the off-calendar seminars check out at irregular hours, often before dawn. Most come back. A few do not. She has not reported this to anyone because the Academy does not ask innkeepers about student movement patterns, and she was not certain it was her business to volunteer. She is now less certain of that.`;
        addJournal('Ilys Quillfire: glyph resonance students depart after off-calendar seminars — some do not return', 'evidence', 'mim-ilys-students-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "Velis noticed a second set of footprints at the shrine door. Not students, not faculty.",
    skill: 'charm',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'drawing out Velis Quillfire on unidentified visitors to the Memory Hall shrine');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.isCrit) {
        G.flags.met_velis_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Velis maintains the shrine entry mat daily — it is a ritual practice as much as a cleaning task, and she knows the dust patterns that accumulate between the morning and evening maintenance passes. Two mornings a month, she finds boot impressions that do not match student or faculty shoe patterns: wider sole, heavier tread, the kind worn for extended outdoor walking rather than campus corridors. The impressions appear on the evenings before the off-calendar seminars and are gone by morning. Someone visits the shrine's archive section after the hall closes, reads the pre-suppression inscriptions, and leaves before dawn.`;
        addJournal('Memory Hall shrine: heavy-sole boot prints appear night before off-calendar seminars — pre-suppression inscriptions accessed after hours', 'evidence', 'mim-velis-prints-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Velis is mid-way through the evening ritual preparation when the question interrupts it. She stops what she is doing, which is worse than a refusal — stopping the ritual means starting it again from the beginning, which she does not explain but demonstrates by returning to the shrine threshold and beginning a preparation sequence that clearly has a fixed form. She does not ask for quiet. She simply proceeds. The question hangs unanswered in the lamplight of the hall until the moment has passed entirely.`;
        addJournal('Velis Quillfire: ritual interrupted — approach timing was wrong, return at neutral moment', 'complication', 'mim-velis-prints-fail-' + G.dayCount);
      } else {
        G.flags.met_velis_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Velis confirms the boot prints without surprise — she has been waiting for someone to ask about them. Heavy tread, wide sole, appearing twice a month on the entry mat's fine dust. She has swept them away each morning without recording them, because the hall's visitor log requires a name, and she has no name to write. She knows they are not students. She knows they are not faculty. "They come for the inscriptions," she says. "The old ones, on the north interior wall."`;
        addJournal('Velis Quillfire: unidentified heavy-tread visitors access Memory Hall north wall inscriptions twice monthly', 'evidence', 'mim-velis-prints-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "Myra's cargo log has an entry she crossed out and re-entered three weeks later.",
    skill: 'charm',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'drawing out Myra Quillfire on a corrected and re-entered cargo log entry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.isCrit) {
        G.flags.met_myra_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Myra opens the log to the page before being asked — she has tabs marking the entries she keeps returning to. The crossed-out entry was a crate she logged on delivery, then was told not to log, then re-entered three weeks later when the instruction not to log it was itself reversed. The supervisor who told her not to log it did so verbally, no written order; the one who told her to re-enter it gave her a written instruction on Academy letterhead with no signature block. She kept both the verbal record in her personal notes and the written instruction. She pushes the log across the counter with both documents folded inside it.`;
        addJournal('Myra Quillfire: suppressed-then-reinstated cargo entry — verbal suppression, unsigned re-entry instruction', 'evidence', 'mim-myra-log-' + G.dayCount);
      } else if (result.isFumble) {
        G.lastResult = `The personal cargo log is personal property and not required to be shared with external inquirers — Myra's supervisor established this in a staff briefing six months ago, she explains, which means the question and Myra's refusal are both on the right side of the same rule. She does not seem pleased about either. The log stays on the shelf behind her. The supervisor in question is visible through the loading bay door.`;
        addJournal('Myra Quillfire personal log: external inquiry blocked by supervisor policy — supervisor present', 'complication', 'mim-myra-log-fail-' + G.dayCount);
      } else {
        G.flags.met_myra_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Myra shows the crossed-out entry and the re-entered one side by side. A crate logged on arrival, then verbally ordered off the record by her supervisor, then re-entered three weeks later under a written instruction she received without a signature. She followed all three instructions. She does not know why any of them were given. The re-entry instruction, she says, arrived on the same day the restricted stacks gate hardware was updated — she noticed because the facilities crew passed through the loading bay that afternoon, which was unusual.`;
        addJournal('Myra Quillfire: suppressed cargo entry reinstated on day restricted stacks were resealed — convergent timing', 'evidence', 'mim-myra-log-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "Sarith filed a discrepancy notice four months ago. Nobody responded.",
    skill: 'charm',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'drawing out Sarith Quillfire on an unanswered discrepancy notice');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('charm', (G.skills.charm||0));
      if (result.isCrit) {
        G.flags.met_sarith_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Sarith reaches into the shelf behind her counter without leaving her seat and produces a carbon copy of the discrepancy notice — she kept one; the original went to the faculty administration office four months ago and has not come back with an acknowledgment. The discrepancy is a category code she had no record of applied to three separate acquisitions, all in the same week. She noted the acquisition weight, the category code, and the absence of any corresponding item in the Academy's materials schedule. The copy is annotated in her own hand with the follow-up dates: four attempts to reach the administration office, four non-responses. The fifth attempt, she says, produced a verbal instruction not to re-file.`;
        addJournal('Sarith discrepancy notice: 4 unanswered follow-ups, verbal instruction not to re-file on 5th', 'evidence', 'mim-sarith-notice-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Sarith's counter has its quarterly audit flag active — she mentions this before anything else, a procedural note she is required to give to any external inquirer. Any question she answers during an active audit flag period is included in the quarterly audit record. She is not refusing; she is warning. The questions asked here, and her answers, are going into a document that travels to the administration office. The audit flag runs for another six days.`;
        addJournal('Sarith Quillfire: quarterly audit flag active — all inquiries logged in administration record for 6 more days', 'complication', 'mim-sarith-notice-fail-' + G.dayCount);
      } else {
        G.flags.met_sarith_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Sarith confirms the discrepancy notice without opening the counter drawer — she remembers the entries and the non-response without needing the copy. Three acquisitions, unknown category code, no materials schedule match. She filed the notice through the standard channel and received nothing back. Four months of nothing. She does not interpret this as an oversight. "When an office doesn't respond to a discrepancy notice, that is itself a response," she says, and the phrasing is precise enough that she has clearly said it before, to herself, while waiting.`;
        addJournal('Sarith discrepancy notice: four months, no acknowledgment — non-response interpreted as deliberate', 'evidence', 'mim-sarith-notice-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "Myra logged a delivery signed by a porter who doesn't match any staff record.",
    skill: 'wits',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'tracing Myra Quillfire ghost-porter signature in delivery record');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.flags.met_myra_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The porter's name in the delivery record — written in a hand Myra confirms is not hers — checks against the Academy's full staffing registry including the temporary labour pool and the external maintenance contractors. No match. The signature is a name that has no employment record, no payroll entry, no duty assignment. Myra points to the next entry in her log: a weight confirmation written by herself, thirty minutes later, for a crate she says she did not see signed in. The ghost porter's delivery completed before she was there to receive it. Someone moved the crate through the loading bay using a name that does not exist and was gone before the shift started.`;
        addJournal('Ghost-porter signature on delivery — name not in staffing registry, crate moved before shift began', 'evidence', 'mim-myra-ghost-' + G.dayCount);
      } else if (result.isFumble) {
        G.lastResult = `The staffing registry is a human resources document maintained by the Academy administration office — external access for cross-referencing delivery records against staff names requires a formal HR inquiry form, countersigned by a faculty member. Myra explains this while the supervisor moves between the loading bay and the dock exterior on a routine check cycle. The form, she says, takes three working days to process. The crate in question moved through seven weeks ago.`;
        addJournal('Ghost-porter cross-reference blocked — HR inquiry form required, faculty counter-signature needed', 'complication', 'mim-myra-ghost-fail-' + G.dayCount);
      } else {
        G.flags.met_myra_quillfire = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Myra checked the porter's name against the staffing list herself — it was the first thing she did when she noticed the delivery record. No match anywhere in the staff registry, the temporary pool, or the contractor list. She tried the maintenance contractor records separately, thinking it might be an off-site hire. Nothing. The name on the delivery record is not a person the Academy employed. The crate signed in under that name is one of the ones in the theoretical-materials column.`;
        addJournal('Ghost-porter name absent from all Academy registries — delivery corresponds to theoretical-materials column entry', 'evidence', 'mim-myra-ghost-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // === SUPPRESSION COMPOUND THEORETICAL BASIS — ~5 choices ===

  {
    plot: 'main',
    label: "The formula's pressure tolerance range is ten times what academic damping work would need.",
    skill: 'wits',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'analyzing suppression formula pressure tolerance parameters against academic use');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.mim_formula_scale_confirmed = true;
        G.lastResult = `The theoretical formula's upper pressure tolerance is set at a level that corresponds to sustained open-site glyph suppression across a zone several hundred meters in radius. Academic damping work — the application the formula's classification paperwork cites — requires a tolerance two orders of magnitude lower, for controlled single-chamber experiments. The upper range was not included for academic purposes. It was included because the formula was designed from the beginning for deployment at a scale that has nothing to do with what the Academy's curriculum covers. The theoretical work here was product development with a pedagogical label.`;
        addJournal('Formula pressure tolerance 100x academic need — designed for open-site zone suppression, not laboratory use', 'evidence', 'mim-formula-scale-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The formula details are in the restricted stacks. The attendant at the reading room desk tracks which sections visitors move toward and flags restricted-stack approaches automatically in the duty log. The approach was logged before the restricted gate was reached. A proctor arrives in the reading room six minutes later — not running, not hurrying, just present. The formula's parameters are still behind the sealed gate. The approach is now in the duty log for the third time this week.`;
        addJournal('Formula access attempt logged — proctor arrival timed, restricted approach flagged again', 'complication', 'mim-formula-scale-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The pressure tolerance range in the formula exceeds what any controlled academic experiment would require by a significant margin. Laboratory damping applications work at low tolerances, carefully bounded to prevent cascade effects in a contained setting. The upper range in this formula is designed for a different environment: open site, larger area, sustained application. The theoretical framing around it describes laboratory use. The formula itself does not match that description.`;
        addJournal('Formula upper pressure range inconsistent with laboratory framing — parameters match open-site sustained deployment', 'evidence', 'mim-formula-scale-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The suppression compound has a stabilizer compound only available outside Academy supply channels.",
    skill: 'spirit',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing suppression compound stabilizer to non-Academy supply source');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('spirit', (G.skills.spirit||0));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.mim_stabilizer_sourced = true;
        G.lastResult = `The stabilizer component in the compound formula is not on the Academy's approved reagent list and has never been on it — it is a processed extract from a specific cave mineral deposit, the kind formed only under sustained glyph pressure over long periods. The only documented source for it in the region is the Watchers Perch cave system, which was producing a natural form of the compound in the pressure regulation layers before the modifications reversed the site's function. The modifications that reversed the safety system also created the extraction conditions the stabilizer requires. The cave was converted from a suppression buffer into a production site.`;
        addJournal('Stabilizer sourced from Watchers Perch mineral deposit — site converted from safety buffer to production via modifications', 'evidence', 'mim-stabilizer-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The Academy's reagent catalog is a public document. The stabilizer component is not in it, which should make the question simple — except that clarifying exactly what is being looked for requires referencing the formula, which is in the restricted stacks, which requires faculty authorization. The reference desk attendant notes the specific inquiry in her assistance log, which is reviewed by the faculty librarian weekly. A specific inquiry about a compound component that requires the restricted formula to name is now in the weekly review log.`;
        addJournal('Stabilizer inquiry logged — requires restricted formula reference, in weekly faculty review queue', 'complication', 'mim-stabilizer-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The stabilizer component is absent from the Academy's reagent catalog, which means the Academy cannot produce the compound internally — not because they lack the formula, but because they cannot source one of its components through normal supply channels. The component is a processed cave mineral extract. The processing requires sustained glyph pressure environments. The Academy doesn't have that environment. Watchers Perch, modified as it was, would.`;
        addJournal('Compound stabilizer absent from Academy catalog — requires glyph pressure extraction environment, Watchers Perch consistent match', 'evidence', 'mim-stabilizer-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The earliest version of the formula lacked the deployment mechanism. It was added later.",
    skill: 'wits',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'tracing iterative additions to suppression formula draft sequence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.mim_formula_versioning_mapped = true;
        G.lastResult = `The draft sequence in Quenra's unrestricted research notes — the versions predating the classification — shows the formula in three distinct stages. The first two are theoretical damping work, consistent with academic application. The third draft adds a dispersal mechanism that has no academic function: a carrier compound that makes the suppression effect airborne and persistent across terrain rather than contained to a single surface. The third draft is dated six weeks after the Fairhaven phantom monograph's citation first appears in the research stack. The deployment mechanism came from outside the Academy. The faculty developed the theory; someone else added the weapon.`;
        addJournal('Formula draft 3 adds airborne dispersal mechanism — dated 6 weeks after phantom monograph citation, external origin', 'evidence', 'mim-formula-versions-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Quenra's research notes are faculty property filed under her departmental records — the unrestricted drafts are accessible by faculty request, but the access process requires a stated academic purpose from an enrolled or affiliated researcher. External access without affiliation requires a visiting researcher application, which takes three weeks to process. The notes sit in a cloth folder in the open-shelf section of the departmental archive, visible from the doorway, inaccessible by procedure for twenty-one days.`;
        addJournal('Quenra research notes access blocked — visiting researcher application required, 3-week process', 'complication', 'mim-formula-versions-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The draft sequence shows the formula evolving across three versions. The first two fit the academic application described in the classification paperwork: damping theory for controlled experiments. The third adds a component that does not fit that description — a carrier mechanism for terrain-scale dispersal. The gap between the second and third drafts is six weeks. Something arrived during those six weeks that changed the direction of the work.`;
        addJournal('Formula draft sequence: dispersal mechanism added in third version, 6-week gap from academic drafts', 'evidence', 'mim-formula-versions-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The Watchers Perch modification schematics show a conversion, not a construction project.",
    skill: 'wits',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'analyzing Watchers Perch modification schematics against original installation records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.mim_watchers_perch_conversion_confirmed = true;
        G.lastResult = `The modification schematics, cross-referenced against the Memory Hall inscriptions Velis opened, are not the plans for a new installation. Every structural change documented in the schematics corresponds to an existing element of the original pressure-regulation architecture: valve positions reversed, flow channels redirected, pressure accumulation points converted from release nodes to retention chambers. The people who designed the modification had the original schematics. They knew exactly what the site was built to do, and they reversed it with precision. Intentional conversion, not accidental damage, not improvised addition. Someone understood the original system completely before they dismantled it.`;
        addJournal('Watchers Perch schematics: each modification reverses an original safety element — precision conversion with original plans in hand', 'evidence', 'mim-conversion-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The modification schematics are filed with the grounds and facilities office as a completed project archive — sealed at project completion, accessible to faculty with relevant departmental credentials. The facilities clerk pulls the access requirement card without looking for it, which means she has pulled it recently. Someone else has already asked for these documents. The name on the most recent access request is not readable from the counter. The schematics are behind the credential requirement regardless.`;
        addJournal('Watchers Perch schematics access blocked — prior inquiry on record, faculty credential required', 'complication', 'mim-conversion-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The modification schematics show changes made to existing infrastructure rather than new construction: redirected channels, repositioned valves, accumulation chamber conversions. All of it corresponds to elements described in the Memory Hall inscriptions as pressure-regulation mechanisms. This was a conversion project. The original system was understood and systematically reversed. Whatever was built at Watchers Perch originally, the modification was designed to make it do the opposite.`;
        addJournal('Watchers Perch modifications reverse original safety mechanisms element by element — systematic conversion', 'evidence', 'mim-conversion-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "The compound's degradation window rules out everything except population-scale deployment.",
    skill: 'wits',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'analyzing suppression compound degradation timeline against academic vs field application');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.mim_degradation_timeline_mapped = true;
        G.lastResult = `The compound degrades to inert components within eight hours of dispersal — which means it cannot be stockpiled in active form, must be produced continuously near its deployment site, and must be applied over a large area to achieve effect before degradation neutralizes it. This is not the profile of a controlled research agent. It is the profile of a weapon designed for mass deployment: too unstable to store, too short-lived to use on individuals, exactly suited for broad ambient release across an inhabited area. The Academy's theoretical framing as a research compound is not just a cover — it is the only legal description available for something with these properties.`;
        addJournal('Compound degradation profile: 8-hour window, requires continuous production near deployment — optimized for mass ambient release, not research', 'evidence', 'mim-degradation-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The compound's technical parameters are detailed in the restricted formula. The restricted formula requires faculty authorization to access. The question touches enough specific technical detail that the reading room attendant, when asked for help locating relevant sections of the unrestricted literature, refers the inquiry to the faculty science liaison. The science liaison's schedule is booked through the end of the week. The referral is logged with a notation about the nature of the inquiry.`;
        addJournal('Compound parameter inquiry referred to faculty liaison — specific technical detail triggered referral, inquiry logged', 'complication', 'mim-degradation-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The degradation timeline in the theoretical literature — the sections accessible without restriction — describes a compound that becomes inert within hours of dispersal. That window is too short for controlled laboratory use and too short for targeted individual application. It is exactly right for broad area deployment where the goal is saturation rather than precision. The compound's usefulness is directly proportional to the size of the area it covers. The Academy's framing as a research agent does not fit its properties.`;
        addJournal('Compound degradation timeline inconsistent with research application — optimized for broad area saturation', 'evidence', 'mim-degradation-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  // === EXTERNAL AGENTS WITH ACADEMY ACCESS — ~4 choices ===

  {
    plot: 'main',
    label: "The three external clearance codes share a common registration block in the admin ledger.",
    skill: 'wits',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing shared registration block for external Academy clearance codes');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.mim_clearance_block_traced = true;
        G.lastResult = `The three external clearance codes were issued on the same afternoon, logged in a sequential registration block in the administrative ledger — the kind of block that appears when a single processing session issues multiple codes. One issuing clerk's initials appear on all three entries. The clerk's employment record shows a twelve-week posting to the Academy from the Collegium Transit Certification division — the same division that registered the Crown Research Protocol exemption code. The clerk completed the posting and returned to Fairhaven four months ago. All the clearance infrastructure for the external agents was installed by a Collegium employee on temporary assignment, in a single afternoon, and left in place when she departed.`;
        addJournal('Three external clearances issued same afternoon by Collegium Transit clerk on temporary posting — infrastructure left after departure', 'evidence', 'mim-clearance-block-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The administrative ledger is a restricted document — it records internal processing codes and cannot be accessed without a faculty administrative credential and a stated purpose. The clerk at the administrative desk notes the inquiry, writes a reference number, and explains that ledger access requests are reviewed by the Dean's administrative secretary on a ten-day cycle. The inquiry is in the queue. The queue is a list. The list is in the same office as the ledger.`;
        addJournal('Admin ledger access blocked — 10-day Dean review cycle, inquiry queued', 'complication', 'mim-clearance-block-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The three external clearance codes appear in a sequential block in the admin ledger — not issued over time, but in a single session, by the same initials. Sequential issuance in one block is the processing pattern for a coordinated credential setup rather than three separate requests. The initials belong to a temporary posting from outside the Academy. The posting is complete; the employee is no longer on site. The clearances she installed are still active.`;
        addJournal('Three external clearances issued in single sequential block by temporary posting employee — clearances remain active after departure', 'evidence', 'mim-clearance-block-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "One external agent attended a faculty-only thesis session. No committee record of it.",
    skill: 'wits',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-checking external agent attendance against faculty thesis committee records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.mim_agent_committee_access = true;
        G.lastResult = `The thesis committee session log is kept by the faculty secretary and is a public administrative record, open to academic readers. One session on the glyph resonance track lists five attendees; the faculty membership rolls account for four of them. The fifth name — written in the same compressed hand as the charter exemptions — does not appear on any faculty list, adjunct list, or invited examiner record. The committee secretary, when tracked down in the archive corridor, confirms she did not write the fifth name. It was there when she filed the log. Somebody attended a closed faculty thesis committee meeting and added their own name to the session record afterward.`;
        addJournal('External agent name added to thesis committee session log post hoc — committee secretary did not write it', 'evidence', 'mim-committee-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The thesis committee session log is kept in the faculty secretary's administrative files — open by designation, but the faculty secretary's office door is locked at the moment of inquiry, with a "Staff Meeting in Progress" card. The card is new: it was not on the door this morning, based on the dust pattern around the card holder, which was recently cleaned. The meeting in progress, if it exists, was convened after the approach to the archive corridor began.`;
        addJournal('Faculty secretary office locked after approach observed — staff meeting card newly placed', 'complication', 'mim-committee-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The thesis committee session log lists five attendees for a glyph resonance session where only four faculty members are authorized to participate. The fifth name does not correspond to any faculty member, adjunct, or invited examiner on the rolls. The name is in the session record. It was not removed. Whoever it belongs to was either present at a closed faculty session without authorization, or added their name to the record afterward without being present. Both possibilities are significant.`;
        addJournal('Thesis committee session log: unidentified fifth attendee at faculty-only glyph resonance session', 'evidence', 'mim-committee-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "External agents' key return dates all fall on the same day as Draith Calver's arrivals.",
    skill: 'wits',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'correlating external agent key return dates with Draith Calver courier arrival schedule');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.mim_agent_courier_sync_confirmed = true;
        G.lastResult = `The key return log for external access passes tracks the dates each holder returned their pass after a session — a routine record kept at the facilities desk without particular attention. The three external clearance holders returned their passes on five separate occasions over four months. All five return dates match Draith Calver's twelve-day arrival cycle to within a six-hour window. They were not at the Academy to do research. They were at the Academy to receive what Draith brought, transfer what they took from the restricted wing, and depart on the same day the courier left. The Academy's facilities desk was keeping the coordination record without knowing it.`;
        addJournal('External agent key returns correlate with Draith courier arrivals on 5 of 5 occasions — transfer operation using Academy access infrastructure', 'evidence', 'mim-agent-courier-' + G.dayCount);
      } else if (result.isFumble) {
        G.lastResult = `The key return log is at the facilities desk — a casual record, not a restricted document, but the facilities desk is in the middle of a shift changeover when the log is requested. The outgoing clerk does not have authority to release administrative records; the incoming clerk has not yet signed on. The log stays where it is for forty minutes while the handover completes. By the time access is available, the window for same-day correlation against Myra's cargo log has closed.`;
        addJournal('Key return log access delayed by shift changeover — same-day correlation window lost', 'complication', 'mim-agent-courier-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The key return log shows the external access holders returning their passes in clusters — not randomly distributed, but falling consistently within a narrow window. Cross-referenced against Myra's twelve-day courier cycle notes, four of five return dates align with Draith Calver's off-schedule arrivals. The external agents and the courier were operating on the same schedule. Their Academy visits were not independent.`;
        addJournal('External agent key returns align with courier arrival schedule on 4 of 5 logged dates', 'evidence', 'mim-agent-courier-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

  {
    plot: 'main',
    label: "One external agent's faculty endorsement is signed by someone who died two years ago.",
    skill: 'wits',
    tags: ['Academy', 'Stage2'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'verifying visiting faculty endorsement signature against faculty mortality records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.wits||0));
      if (result.isCrit) {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.flags.mim_dead_endorser_confirmed = true;
        G.lastResult = `The endorsement is from Emeritus Scholar Tavan Relle, whose faculty memorial was held eighteen months ago — the memorial is documented in the Academy's public record and the faculty necrology. Relle's signature appears on the external agent's access endorsement dated eight months ago, six months after his death. The signature is a close copy of his archival script, close enough that it passed the faculty registrar's desk without question. The endorsement granted access to the restricted wing and the cadaveric chemistry suite. The forged signature carried faculty-level authority for ten months before the access pass was eventually returned. Nobody checked the endorser's status at the time of filing.`;
        addJournal('External agent endorsed by dead faculty member — forged signature of Emeritus Relle, filed 6 months after his death', 'evidence', 'mim-dead-endorser-' + G.dayCount);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The faculty endorsement files are administrative records and access requires a purpose statement reviewed by the faculty secretary. The faculty secretary's assistant logs the inquiry and provides the review process timeline: five working days. She also notes, without elaboration, that external inquiries about endorsement records are forwarded to the faculty governance office as a matter of protocol. The forwarding is automatic. The governance office receives the log of the inquiry before the inquiry is even processed.`;
        addJournal('Endorsement file inquiry automatically forwarded to faculty governance — 5-day review, governance notified immediately', 'complication', 'mim-dead-endorser-fail-' + G.dayCount);
      } else {
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The endorsing faculty member's name on one external agent's access file does not appear on the current faculty or emeritus rolls. A check against the faculty necrology — posted in the archive corridor outside the memorial reading room — locates the name immediately. He died two years ago. The endorsement on the access file is dated eight months ago. Either the record is wrong about the date, or the signature is wrong about the signatory. The signature is in the file. The man is in the necrology.`;
        addJournal('External agent endorsement signed by faculty member who died 18 months before endorsement date', 'evidence', 'mim-dead-endorser-partial-' + G.dayCount);
      }
      G.recentOutcomeType = result.isFumble ? 'complication' : 'success'; maybeStageAdvance();
    }
  },

];

window.MIMOLOT_STAGE2_ENRICHED_CHOICES = MIMOLOT_ACADEMY_STAGE2_ENRICHED_CHOICES;
