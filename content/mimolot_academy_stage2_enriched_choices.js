/**
 * MIMOLOT ACADEMY STAGE 2 ENRICHED CHOICES
 * Investigation arc: forbidden knowledge trafficking / suppression compound theoretical basis
 * NPCs: Quenra Quillfire (Tutor-Magistrate), Ilys Quillfire (Innkeeper),
 *       Sarith Quillfire (Market Clerk), Velis Quillfire (Shrine Attendant), Myra Quillfire (Porter)
 */

const MIMOLOT_ACADEMY_STAGE2_ENRICHED_CHOICES = [

  {
    label: "The suppression compound formula appears in theoretical texts three years before it was commissioned.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'accessing restricted Academy curriculum');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_quenra_quillfire = true;
        G.investigationProgress++;
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
        G.lastResult = `Quenra confirms the formula is in restricted materials without opening the file. She can't share it directly, but she confirms the classification came after the commission date — not before. She says this carefully, as if she's thought about what it implies and decided that confirming the sequence is different from discussing the content. Someone placed the commission knowing the formula already existed here.`;
        addJournal('Academy formula classified post-commission — buyer had prior knowledge', 'evidence', `mim-quenra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Incoming shipments logged that don't match standard academic supply manifests.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reviewing Archive Loading Bay delivery records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_myra_quillfire = true;
        G.investigationProgress++;
        G.lastResult = `Myra pulls her personal log from under the counter without being asked — she's been keeping it specifically because the standard manifest counter doesn't cover everything. Six deliveries over four months, all arriving on the Fairhaven scholar route. Signed off by an Academy regent code she checked against the official registry and couldn't match. She points at two entries. Both precede documented glyph surge events in Shelkopolis by forty-eight hours. She circled the dates when she noticed.`;
        addJournal('Academy off-manifest deliveries via Fairhaven path — 48hr pre-surge correlation', 'evidence', `mim-myra-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Myra's supervisor is two meters away when you approach. Myra listens to your question, says "I can't help you with that" in a flat voice, and hands you a standard inquiry-refusal form. Her eyes move to the supervisor and back. She fills out the refusal with her pen held loosely, like someone doing something they don't mean. Come back without the supervisor present.`;
        addJournal('Loading Bay inquiry refused under supervisor watch', 'complication', `mim-myra-fail-${G.dayCount}`);
      } else {
        G.flags.met_myra_quillfire = true;
        G.investigationProgress++;
        G.lastResult = `Myra nods before you finish the question. "Non-standard deliveries on non-standard paperwork — I log everything that comes through the bay regardless of manifest status. Writing it down isn't my job to question." She opens the personal log and sets it on the counter. She has written it all down. The question is what the entries add up to when read together.`;
        addJournal('Non-standard Academy deliveries confirmed in personal cargo log', 'evidence', `mim-myra-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Three recent acquisitions bypassed tariff entirely. No exemption filed.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining Academy knowledge tariff bypass records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_sarith_quillfire = true;
        G.investigationProgress++;
        G.lastResult = `Sarith's tariff records are organized by exemption category, and the "Crown Research Protocol" designation appears in three entries and nowhere else in the registry — not in the formal exemption categories, not in supplementary guidance, not in the Academy charter's fee schedule. All three exemptions were applied to glyph resonance theory acquisitions. All three list Fairhaven as point of origin. Sarith checked the designation against every reference she has. It doesn't exist officially. It was used anyway, and the exemptions held.`;
        addJournal('Crown Research Protocol exemptions — glyph theory, Fairhaven origin', 'evidence', `mim-sarith-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Sarith's counter has an audit flag mechanism built into it — externally audited quarterly, any unusual inquiry logged. Your questions about the exemption entries trigger the flag before you finish asking them. The next audit will include a record of your name and what you asked. Sarith explains this without apology. It's not her choice; it's the procedure. The records you need are now associated with your name in a queue that goes outside the Academy.`;
        addJournal('Tariff inquiry flagged in quarterly audit queue', 'complication', `mim-sarith-fail-${G.dayCount}`);
      } else {
        G.flags.met_sarith_quillfire = true;
        G.investigationProgress++;
        G.lastResult = `Sarith confirms the three exemptions without hesitation — she processed them and noted the unfamiliar code at the time. Academy leadership entered the designation; she didn't question it, but she did note in the margin that the acquired materials would normally fall under her "applied craft components" category, not scholarly texts. The exemption code bypassed the category check entirely.`;
        addJournal('Academy tariff-exempt craft components — misclassified acquisitions', 'evidence', `mim-sarith-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A late-night conversation about 'pressure management protocols.' The guests aren't on the faculty roster.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'questioning Academy innkeeper about scholar guests');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_ilys_quillfire = true;
        G.investigationProgress++;
        G.lastResult = `Ilys describes the guests with the precision of someone who notices things professionally: what they wore, how they moved, whether they looked at the room or the exits when they entered. One matches the physical description you have from Vaelis Sunweave's account in Fairhaven — same courier on the north-south route. The overheard phrase from the late-night conversation: "the cave output needs another three months of calibration." The guests checked out before the morning bell. No forwarding note.`;
        addJournal('Academy inn guest matches Fairhaven courier — cave calibration timeline overheard', 'evidence', `mim-ilys-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The timing is wrong. A guest is in the common room who stops eating when you approach Ilys — not conspicuously, just a pause — and doesn't resume until you leave. He's not on the faculty roster; Ilys confirmed that when he arrived. She gives you a look that conveys something she can't say aloud and a brief formal response. Come back when the common room is empty.`;
        addJournal('Academy inn — non-faculty observer present, conversation closed', 'complication', `mim-ilys-fail-${G.dayCount}`);
      } else {
        G.flags.met_ilys_quillfire = true;
        G.investigationProgress++;
        G.lastResult = `Ilys describes the guests by habit: northern accents, sealed documentation cases stored at the foot of the beds instead of in the wardrobe, pre-dawn departures without breakfast. The phrase she caught from the late-night conversation was "pressure management." She didn't know what it referred to. She noted it because it was an odd phrase for people claiming to be here on academic business. You know what it refers to.`;
        addJournal('Academy inn — pressure management phrase, northern guests', 'evidence', `mim-ilys-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The shrine inscriptions include pre-suppression glyph data that was never formally classified.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'reviewing Memory Hall Shrine historical inscriptions');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_velis_quillfire = true;
        G.investigationProgress++;
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
        G.lastResult = `Velis grants reading access and stands to one side while you work through the inscriptions. The Watchers Perch cave is described as a designed site — engineered by the original settlement architects for pressure regulation, maintained across generations as infrastructure rather than natural formation. The recent modifications weren't a first intervention. Someone intervened twice: once to build this, once to break it.`;
        addJournal('Watchers Perch was previously engineered — recent modifications are second intervention', 'evidence', `mim-velis-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Leth Quillfire has been carrying the same sealed ledger for three days without logging it.",
    tags: ['stage2', 'mimolot_academy'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'confronting Leth Quillfire over unlogged sealed ledger');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (roll.total >= 16) {
        G.flags.met_leth_quillfire = true;
        G.investigationProgress++;
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
        addNarration('The Scribe\'s Ledger', 'Leth does not open the ledger but confirms the dual-hand notation system — standard practice for co-authorized requisitions, he explains, where an external signatory adds a counter-entry. He has not filed it because the external co-authorization is incomplete: one signature present, counter-signature absent. He has been waiting for the second hand to return. It has not.');
        addJournal('Unlogged Academy ledger: incomplete external co-authorization — second signatory absent', 'intelligence');
        maybeStageAdvance();
      }
    }
  },

  {
    label: "The Restricted Stacks seal is newer than the archive housing it.",
    tags: ['stage2', 'mimolot_academy'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'examining Restricted Stacks seal and archive infrastructure');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      var roll = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (roll.total >= 13) {
        G.investigationProgress++;
        addNarration('Restricted Stacks', 'The archive housing is original construction — stone cut and set during the Academy\'s founding period, the mortar joints darkened with decades of lamp-oil residue. The seal on the Restricted Stacks gate is a different story: pressed wax over a cast-iron plate, the wax still showing tool marks, the plate mounted in brackets that have not oxidized yet. Somebody sealed this section recently. The classification directive date on Quenra\'s files is the same month as the bracket installation, judging by the hardware finish.');
        addJournal('Restricted Stacks seal is recent installation — matches classification directive date', 'discovery');
        maybeStageAdvance();
      } else if (roll <= 3) {
        addNarration('Restricted Stacks', 'An Academy proctor is conducting a routine walk of the archive corridor when you approach the Restricted Stacks gate. She stops two meters away and asks for your reader authorization card. The question is asked quietly, but two students at nearby study tables look up. A formal access refusal in a public corridor is the kind of thing that gets written into the weekly compliance summary.');
        addJournal('Restricted Stacks approach interrupted by proctor — access formally refused', 'complication');
      } else {
        G.investigationProgress++;
        addNarration('Restricted Stacks', 'The seal hardware is newer than the surrounding stonework — that much is clear from the bracket finish and the wax condition. The section beyond was accessible to general readers until recently; the reading-room register still has patron entries from last term filed under stack numbers that are now classified. The cutoff is abrupt: entries stop in the same week the classification directive was issued.');
        addJournal('Restricted Stacks access cut off same week as classification directive', 'evidence');
        maybeStageAdvance();
      }
    }
  },

  {
    label: "Calia Quillfire asked a question in the wrong register and the lecture hall went quiet.",
    tags: ['stage2', 'mimolot_academy'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'navigating Calia Quillfire social complication in lecture hall');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (roll.total >= 13) {
        G.flags.met_calia_quillfire = true;
        G.investigationProgress++;
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
        addNarration('The Foreman\'s Ledger', 'Calia hands you the crew rotation log after the session without making a production of it — the way someone passes a document they have been carrying with intent. The Watchers Perch tunnel crew and the Restricted Stacks reinforcement crew share four names. She circled the names in pencil, then erased the circles, then handed it to you anyway. The indentations are still there if you hold it to the lamp.');
        addJournal('Labor crew rotation log: four names shared across Watchers Perch and Restricted Stacks jobs', 'intelligence');
        maybeStageAdvance();
      }
    }
  },

  {
    label: "Things moved through the night dock that don't appear in the morning intake log.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'pressing Hoven Draske on night-dock off-manifest transfers');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
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
        G.lastResult = `Hoven confirms the night-dock receives transfers that do not go through the morning intake process — a separate authorization channel, he explains, for materials under faculty regent codes. He has logged everything in his own shift register, which is not the same document the day supervisor reviews. He can show the shift register. The regent codes on the night-dock entries are the same ones Sarith could not match against the official exemption registry.`;
        addJournal('Night-dock shift register: regent codes match Sarith tariff anomalies — separate auth channel', 'intelligence', `mim-hoven-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The faculty auditor stopped filing anomaly reports six weeks ago. No explanation given.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'drawing out Pellin Ost on suspended anomaly reporting');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
        G.lastResult = `Pellin confirms he suspended anomaly reporting without elaborating on the reason. He opens a drawer, retrieves a single sheet, and sets it face-down on the desk between you. The sheet is the returned anomaly report — the reclassification annotation visible through the paper when held to the window light. He does not turn it over. "The process functioned as designed," he says, which is a precise and deliberate way to describe a process that did not function as intended.`;
        addJournal('Pellin Ost: anomaly report returned reclassified — process described as "functioning as designed"', 'intelligence', `mim-pellin-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A regular Fairhaven courier stop at the Academy that doesn't appear in the public schedule.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracing Draith Calver Fairhaven courier off-schedule Academy stop');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_draith_calver = true;
        G.investigationProgress++;
        G.lastResult = `The courier is Draith Calver, and he arrives at the Academy's east service gate every twelve days — not on the posted schedule, which lists Fairhaven deliveries as monthly. The east service gate is not staffed by regular dock workers. The same two faces appear on every off-schedule arrival, drawn from a short roster Myra's shift log does not account for. Draith's route manifest for these stops shows a single line entry: "Academic reagent exchange — pre-cleared." The pre-clearance code resolves to the same external charter mark Hoven pulled from his coat.`;
        addJournal('Draith Calver 12-day courier cycle: same charter mark as Hoven dock receipt', 'evidence', `mim-draith-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The east service gate is staffed when it should be unstaffed — two workers in nondescript work coats who clock you from thirty meters and do not move toward the gate. The courier does not arrive during the window. A different delivery comes through the main dock instead, routine and logged, and the two workers are gone when you check the gate again an hour later. The pattern closed before it opened.`;
        addJournal('East gate surveillance — off-schedule stop did not occur, workers present and watchful', 'complication', `mim-draith-fail-${G.dayCount}`);
      } else {
        G.flags.met_draith_calver = true;
        G.investigationProgress++;
        G.lastResult = `The east service gate shows irregular traffic in Myra's cargo log — entries logged under a "pre-cleared academic exchange" category that runs on a twelve-day cycle, not the monthly schedule posted publicly. The courier name on these entries is partially redacted, but the route origin — Fairhaven — is intact. The twelve-day interval matches the surge event spacing Myra circled in her log.`;
        addJournal('East gate 12-day Fairhaven exchange cycle matches Myra surge event intervals', 'intelligence', `mim-draith-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The archive papers are cited by research that doesn't exist in the Academy's own catalog.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing phantom citation network in glyph resonance theory archive');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.mim_phantom_citations_mapped = true;
        G.investigationProgress++;
        G.lastResult = `Fourteen papers in the glyph resonance theory stack cite a source titled "Distributed Pressure Regulation: Applied Architecture" — a monograph that does not appear in the Academy catalog, the Collegium registry, or any public acquisition record. The citation format uses a Fairhaven institutional prefix. All fourteen papers were authored in the two years preceding the classification directive. The monograph's existence was known to the Academy's faculty before the theoretical work here was completed. Someone gave the faculty this text through a channel that left no acquisition record.`;
        addJournal('Phantom monograph: 14 papers cite Fairhaven source absent from all registries', 'evidence', `mim-citations-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The catalog access system requires a reader registration current within sixty days. The registration clerk is not at the desk; the stand-in does not have authorization to process external reader renewals. The stand-in writes the request in the duty log and marks it pending faculty review. The glyph resonance stack is available to registered readers only. The pending flag on a lapsed registration is now in the same system as the quarterly audit queue.`;
        addJournal('Catalog access blocked — lapsed registration flagged in audit queue', 'complication', `mim-citations-fail-${G.dayCount}`);
      } else {
        G.flags.mim_phantom_citations_mapped = true;
        G.investigationProgress++;
        G.lastResult = `The citation discrepancy is systematic: a single source appears in multiple papers in the glyph resonance stack but resolves to nothing in the catalog. The papers themselves are available to read. The source they cite is not. This is not a cataloging error — each paper uses the same citation format, the same institutional prefix, and the same publication date. The source was real and known to these authors. It simply does not exist in any record the Academy is willing to show.`;
        addJournal('Systematic phantom citation: single Fairhaven source, same format across 14 papers — deliberate omission', 'intelligence', `mim-citations-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The weighing notation in the reagent manifest doesn't match Academy standard. A craft tell, not a clerical error.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'decoding non-standard reagent weighing notation in storage manifest');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.mim_reagent_notation_decoded = true;
        G.investigationProgress++;
        G.lastResult = `The notation is a field-craft weighing shorthand used in extraction operations — not a workshop system, not an academic one. Someone trained in applied field extraction filled in these manifests. The weights themselves are significant: the quantities logged for three reagent entries correspond to batch sizes for suppression compound production at a scale that would supply a distributed deployment, not a contained test. The manifest is signed off as routine Academy reagent storage. The quantities are not routine. Not even close.`;
        addJournal('Reagent manifest: field-extraction notation, batch sizes indicate distributed suppression deployment', 'evidence', `mim-reagent-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The storage manifest is behind the materials desk in a locked binder. The clerk on duty is new to the desk and is not certain whether external access to storage manifests falls under the general reader exemption or the faculty-restricted materials protocol. She decides, correctly, that she does not know, and escalates to a senior clerk who does. The senior clerk applies the restricted protocol. The manifest goes into the locked drawer. The escalation is logged.`;
        addJournal('Storage manifest access escalated — restricted protocol applied, logged', 'complication', `mim-reagent-fail-${G.dayCount}`);
      } else {
        G.flags.mim_reagent_notation_decoded = true;
        G.investigationProgress++;
        G.lastResult = `The weighing notation is not Academy standard — that much is clear from the unit abbreviations, which don't match the faculty measurement guide on the wall behind the desk. The shorthand is from outside the academic system: a practical extraction notation used in applied field work, not theoretical research. Someone with field training filled in these manifests. The Academy's storage records have been maintained by someone who has never worked inside an academy.`;
        addJournal('Storage manifest notation: field-craft shorthand — non-academic author confirmed', 'intelligence', `mim-reagent-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The study room access log has entries in the same hand as the charter exemptions.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'cross-referencing study room access log against charter exemption handwriting');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
        G.lastResult = `The access log shows eight bookings in the cadaveric chemistry suite outside the standard teaching schedule. The hand in those entries is compressed and vertical — not the anatomy faculty's rounded administrative script. The desk clerk confirms she did not write those entries. They are in the log because they arrived pre-filled, already approved. She filed them without questioning the format. The regent code on the approval slips is the same code Sarith flagged.`;
        addJournal('Pre-filled chemistry suite bookings in foreign hand — Sarith regent code on approvals', 'intelligence', `mim-accesslog-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Student stipend disbursements for glyph resonance candidates stopped without a faculty notice.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tracing glyph resonance student stipend disbursement halt');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.mim_stipend_halt_traced = true;
        G.investigationProgress++;
        G.lastResult = `The stipend disbursement office is run by Neven Osk, a compact man who keeps his records in coloured folders by funding source. The glyph resonance track folder is thinner than the others. Neven opens it without prompting and names the disbursement halt date: the same week Pellin Ost's anomaly report was reclassified. The halt was not a budget decision — the fund balance was intact. It was an administrative hold placed by an external authority code that Neven had not encountered before and has not encountered since. Three candidates received half-disbursement before the hold. The fourth received nothing and withdrew the following term.`;
        addJournal('Stipend halt: administrative hold by unknown authority code, same week as Pellin reclassification — one candidate withdrew', 'evidence', `mim-stipend-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Neven Osk asks for a faculty authorization code before opening the disbursement records. He is not obstructing — he is following a procedure that was added to his desk manual four months ago, precisely for glyph resonance track inquiries. He shows the desk manual page, which is printed on paper that does not match the surrounding pages: thicker stock, fresher ink, inserted after the original binding. Someone added that procedure recently and specifically.`;
        addJournal('Stipend office: new glyph resonance inquiry procedure inserted into desk manual — recent addition', 'complication', `mim-stipend-fail-${G.dayCount}`);
      } else {
        G.flags.mim_stipend_halt_traced = true;
        G.investigationProgress++;
        G.lastResult = `Neven confirms the disbursement halt without hesitation — it is an anomaly in his records and he has no satisfactory explanation for it. The halt code applied to the entire glyph resonance track at once, affecting four active candidates. The fund remained solvent throughout. No faculty notice accompanied the hold. He filed a query with the Dean's finance office. The query was acknowledged and is marked pending, which in this office means it will not be answered.`;
        addJournal('Glyph resonance stipend halt: whole-track administrative hold, solvent fund — Dean finance query unanswered', 'intelligence', `mim-stipend-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A pressure spike on the same night as a Fairhaven delivery not in any manifest.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'correlating observatory glyph sensor spike with off-manifest Fairhaven delivery');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
        G.lastResult = `Bress Alvane is willing to show the pressure log and does so without formality. The spike is documented: southwest bearing, no weather cause noted, forty-minute duration. The date falls in the same window as the unmanifested Fairhaven deliveries Myra's cargo log covers. Bress cannot say what caused it — the instruments measure direction and magnitude, not source. But the bearing puts the origin consistent with the Watchers Perch access tunnel, and the date puts it consistent with delivery activity.`;
        addJournal('Observatory pressure spike: southwest bearing, no weather cause — consistent with Watchers Perch and Fairhaven delivery window', 'intelligence', `mim-observatory-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The credential file holds a Collegium endorsement the Collegium's registry can't confirm.",
    tags: ['Stage2', 'NPC'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'verifying visiting lecturer Collegium credential against registry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.mim_lecturer_credential_fraudulent = true;
        G.investigationProgress++;
        G.lastResult = `The credential file is in the faculty registrar's open-access visitor section — no restriction on reading, only on copying. The Collegium endorsement uses a valid seal format, the right counter-signature position, the correct certification phrase. Everything except the reference number. The reference number resolves to a dormant Collegium file from eleven years ago, assigned to an institution that no longer exists. Someone transferred the number to a current credential. The visiting lecturer has been delivering glyph resonance supplementary sessions for six weeks, off the public lecture calendar.`;
        addJournal('Visiting lecturer credential: Collegium reference number belongs to defunct institution — off-calendar glyph resonance sessions', 'evidence', `mim-lecturer-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The registrar's visitor section is open during posted hours. The hours posted on the door are different from the hours on the faculty noticeboard in the rotunda. The section is closed when arrived at. The registrar on duty through the window writes something at his desk while maintaining the polite fiction of not having seen you at the door. The duty log entry will note an after-hours approach. Come back during the correct hours, which will now require looking them up.`;
        addJournal('Registrar visitor section closed — after-hours approach logged', 'complication', `mim-lecturer-fail-${G.dayCount}`);
      } else {
        G.flags.mim_lecturer_credential_fraudulent = true;
        G.investigationProgress++;
        G.lastResult = `The credential file is readable. The Collegium endorsement looks correct in form — seal position, counter-signature, certification phrase — but the reference number does not appear in the Collegium registry when checked against the posted annual index. The annual index is current as of three months ago. The credential was filed seven months ago. Either the endorsement predates the index update, or it was never in the registry to begin with. The visiting lecturer's session schedule is not on the public calendar.`;
        addJournal('Visiting lecturer Collegium reference not in annual registry — session schedule off public calendar', 'intelligence', `mim-lecturer-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The east tunnel approach serviced three times in one month. No maintenance order filed.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'questioning grounds crew lead Torva Seld about unlogged east tunnel maintenance');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_torva_seld = true;
        G.investigationProgress++;
        G.lastResult = `Torva Seld runs the grounds crew out of a low building near the east perimeter and keeps her own work orders filed in a wooden box by date. She tips the box out on the table between you without ceremony and points to three dates. No maintenance orders — she asked for them each time and was told by a single faculty regent that the work was pre-authorized verbally and the orders would follow. They did not follow. The work was clearing and widening the east tunnel approach: not routine, not maintenance. She knows the difference. The regent's name she gives does not appear on the faculty roster. She described him. He matches the physical description Ilys gave of the non-faculty inn guest.`;
        addJournal('Grounds crew: east tunnel widening, no orders — non-faculty regent matches Ilys inn guest description', 'evidence', `mim-grounds-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Torva Seld is mid-shift and her crew is visible across the east yard. She listens to the question, sets her work order binder flat, and says that grounds crew records are property of the Academy estates office and are not available for external review. She is not hostile. She is specific. The estates office is on the other side of the main building, open three mornings a week, and requires a faculty sponsor for external access requests. Her crew has gone back to work around her.`;
        addJournal('Grounds crew records referred to estates office — faculty sponsor required for access', 'complication', `mim-grounds-fail-${G.dayCount}`);
      } else {
        G.flags.met_torva_seld = true;
        G.investigationProgress++;
        G.lastResult = `Torva confirms the three east tunnel approach servicing jobs and confirms no maintenance orders were filed for any of them. Verbal authorization from a faculty regent, she says — she asked twice for written orders and was told they were coming. The work itself was approach clearance and tunnel-mouth widening: not standard maintenance, more consistent with preparing a route for repeated vehicle or cargo access. She noted this at the time in her personal log but did not escalate it.`;
        addJournal('East tunnel approach widened three times, verbal auth only — grounds lead noted cargo-access preparation', 'intelligence', `mim-grounds-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The emeritus office was cleared mid-term. Furniture out, key returned, no sabbatical notice posted.",
    tags: ['Stage2', 'NPC'],
    xpReward: 64,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(64, 'tracing sudden mid-term emeritus office vacancy');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.mim_emeritus_office_traced = true;
        G.investigationProgress++;
        G.lastResult = `The faculty housing office keeps departure records by room number. The emeritus office cleared nine weeks ago: furniture removed in a single morning, key returned by proxy, no forwarding address filed. The proxy who returned the key signed with the same compressed hand as the charter exemptions and the anatomy study room entries. The emeritus who held the office is the same one whose initials appear exclusively on the restricted-stack withdrawal register for the past eleven months. He did not resign or retire — no notice in the faculty record. He stopped appearing and someone returned his key.`;
        addJournal('Emeritus office cleared by proxy with charter hand — restricted-stack monopoly holder vanished without notice', 'evidence', `mim-emeritus-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The faculty housing office has a standing instruction — added to the duty protocol at the same time as the anatomy desk manual amendment — that emeritus accommodation changes are handled through the Dean's office directly and not discussed with external parties. The housing clerk shows the protocol amendment before closing the inquiry. It is the same thick-stock paper, the same fresher ink as the anatomy desk amendment. Someone updated two different office manuals at the same time.`;
        addJournal('Housing office: emeritus records closed by Dean protocol — same paper stock as anatomy desk amendment', 'complication', `mim-emeritus-fail-${G.dayCount}`);
      } else {
        G.flags.mim_emeritus_office_traced = true;
        G.investigationProgress++;
        G.lastResult = `The housing office confirms the emeritus departure: nine weeks ago, morning clearance, key by proxy. No sabbatical posted, no forwarding address. The clerk pulls the departure slip — the proxy signature is initials only, compressed script. She doesn't recognize the hand. The emeritus's name is the same one on the restricted-stack withdrawal register. He held exclusive access for eleven months. He is no longer in the building. Nobody in the housing office was told why.`;
        addJournal('Emeritus departed by proxy, nine weeks ago — same individual as restricted-stack monopoly holder', 'intelligence', `mim-emeritus-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "After certain seminars the same group leaves together. They don't return to the dormitory.",
    tags: ['Stage2', 'NPC'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'tailing student group departing seminars to off-dormitory destination');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.mim_student_debrief_route_mapped = true;
        G.investigationProgress++;
        G.lastResult = `Four students, all on the glyph resonance track, exit through the library garden gate after the visiting lecturer's off-calendar sessions and walk to a provisioning house on the east side of the settlement — not a faculty building, not on Academy maps. The route goes past the east gate without stopping. Inside the provisioning house, through the window, a lamp is already burning at a table with three chairs and documents laid flat. The students are met by a figure in a plain coat who is not the visiting lecturer. The session in there runs longer than the seminar did. Whatever is being taught officially, this is the actual curriculum.`;
        addJournal('Glyph resonance students debrief at off-Academy provisioning house — third-party instructor, documents on table', 'evidence', `mim-debrief-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The group splits at the library garden gate — two take the dormitory path, two continue east, and one of the eastbound students glances back before the corner. The glance is brief and returns forward without reaction, but the pace of the two eastbound students increases after the corner. When the corner is rounded, they are gone: not into a building, not down the lane, simply not where a normal walking pace would have put them. Someone in that group has been watching for followers.`;
        addJournal('Student group counter-surveillance at library gate — eastbound pair lost after corner check', 'complication', `mim-debrief-fail-${G.dayCount}`);
      } else {
        G.flags.mim_student_debrief_route_mapped = true;
        G.investigationProgress++;
        G.lastResult = `Three students from the visiting lecturer's off-calendar sessions leave together via the library garden gate. The route goes east, past the main campus boundary, to a provisioning house not marked on Academy maps. The building's ground-floor window shows lamplight after dark on the same evenings as the sessions. The pattern is consistent enough to be a standing arrangement. Whatever is happening in that building is tied to the same schedule as the off-calendar seminars.`;
        addJournal('Student group follows east route to unmapped provisioning house after off-calendar sessions — standing arrangement', 'intelligence', `mim-debrief-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The charter ink is wrong for the date. The seal is right. The paper hasn't aged.",
    tags: ['Stage2', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'conducting materials analysis on external charter document authenticity');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.mim_charter_document_forged = true;
        G.investigationProgress++;
        G.lastResult = `The external charter document that authorized the classification directive sits in the Dean's open reference file as a matter of institutional record. The seal is authentic — old wax, the right press depth, heat-oxidation consistent with its stated date. The paper is not. The fiber compression on this stock does not occur until after three years of shelf storage; this document shows none. The ink carrier has not fully set into the weave. Written on paper produced this year, dated three years ago, sealed with a genuine seal from that period. A genuine seal taken from a different document and transferred. The classification directive is built on a fabricated foundation.`;
        addJournal('External charter document: genuine seal on fresh paper — seal transferred from period document, directive is fabricated', 'evidence', `mim-charter-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The Dean's reference file is available to faculty and registered researchers. Registered readers may view documents but not handle them without archivist supervision. The archivist assigned to supervise document handling is away from the desk. The duty archivist who covers in her absence handles document access through a booking form with a two-day turnaround. The charter document is visible in the file through the reference cabinet glass — the seal is right, the paper is another matter — but the glass is between the document and any analysis.`;
        addJournal('Charter document visible but inaccessible — archivist booking required, two-day wait', 'complication', `mim-charter-fail-${G.dayCount}`);
      } else {
        G.flags.mim_charter_document_forged = true;
        G.investigationProgress++;
        G.lastResult = `The paper stock and the seal do not belong to the same document. The seal carries genuine age: wax oxidation, press depth consistent with old tooling. The paper is too fresh — the fiber has not had time to compress fully, and the ink carrier sits on the surface rather than sinking into the weave. Three years old on the face. Produced this year by the material evidence. The classification directive rests on a document where the authority mark and the physical record are from different sources.`;
        addJournal('Charter document seal and paper from different sources — directive authority mark transferred onto fresh paper', 'intelligence', `mim-charter-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Academy's classified research was the theoretical foundation. Expose or contain.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 108,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(108, 'Mimolot Academy Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The reading room map on the rotunda wall shows nine points of evidence, but three connections between them are still broken lines. The Regent Council requires a complete chain before it will convene on an institutional complaint — a single unlinked fragment gives them room to dissolve the whole inquiry. The gaps need closing before this can move forward.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You lay the full chain in front of the Regent Council: theoretical formula predating the commission, classification directive from outside the faculty, Fairhaven delivery logs, Memory Hall inscription confirming the safety system reversal. The Council convenes in closed session the same afternoon. A formal inquiry is opened. The operation's theoretical foundation is now in the institutional record, attached to named signatories on both sides of the charter violation.`;
        addJournal('Mimolot Academy S2 finale: Regent Council formal inquiry opened', 'evidence', `mim-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The classified research goes to the Verdant Row network before the Academy's containment procedures can close around it. Copies move through three separate channels simultaneously. The network has the theoretical basis for the suppression compounds now, and the knowledge of how the Watchers Perch system was reversed. The Academy's ability to contain this ends before it starts. The cost is that the network knows it before the Regent Council does.`;
        addJournal('Mimolot Academy S2 finale: classified research leaked to Verdant Row', 'evidence', `mim-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Faculty correspondence in the archive hints at outside interference — no name attached.",
    tags: ['Collegium', 'Stage2', 'Evidence'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'Mimolot Collegium academic correspondence');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/2));
      if (result.isCrit || result.total >= 12) {
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = 'The correspondence is between two faculty members — formal register, tight margins, no salutation beyond initials. The first letter asks whether the external classification directive applies to the theoretical work as well as the applied findings. The second answers: classification directives from outside the faculty are not standard procedure and have no precedent in the Academy charter, but the directive arrived with a Collegium counter-seal, which means it carries force regardless of charter. The correspondent adds, in a postscript so compressed it is nearly illegible: "We are being told to not write down what we already know."';
        addJournal('Mimolot archive: faculty correspondence — external Collegium classification directive applied to theoretical research, no charter precedent, counter-seal used to enforce.', 'evidence');
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = 'The research archive requires a faculty credential or an approved external researcher registration. The archive attendant notes the request and explains the process without hurrying it: three-day review, faculty sponsor required, Dean\'s office sign-off for correspondence files. She writes the inquiry reference number on a form slip and slides it across. The request is logged. Whatever the letters say, they are now behind a process that takes longer than the window available.';
        addJournal('Mimolot archive: external researcher registration required for correspondence files — access request logged with Dean\'s office.', 'complication');
      } else {
        G.investigationProgress = (G.investigationProgress||0) + 1;
        G.lastResult = 'The archive holds faculty correspondence by term and subject. The administrative anomalies file — a designation someone added to an otherwise unnamed folder — contains letters between two scholars discussing a classification directive that arrived from outside the faculty. The language is precise and deliberately plain: they were told certain findings could not be documented. The letters do not name who told them this. They note the date.';
        addJournal('Mimolot archive: faculty correspondence on external classification directive — findings suppressed by unnamed authority, date recorded.', 'evidence');
      }
      G.recentOutcomeType = 'investigate';
    }
  },

  {
    label: "Ruveth knows the suppression history cold — until the conversation reaches the Academy itself.",
    tags: ['Collegium', 'Stage2', 'Intelligence'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'Mimolot Collegium scholar evasion');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      var result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.isCrit || result.total >= 14) {
        G.flags.met_scholar_ruveth = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
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
      G.recentOutcomeType = 'investigate';
    }
  },

  {
    label: "The thesis defense schedule has a recurring deferral on one research track.",
    tags: ['stage2', 'mimolot_academy'],
    xpReward: 36,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(36, 'reviewing academy thesis defense deferrals');
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13) {
        G.flags.mim_defense_deferrals_traced = true;
        G.investigationProgress++;
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
    label: "The library's late-return register has the same reader's initials on every restricted-stack withdrawal.",
    tags: ['stage2', 'mimolot_academy'],
    xpReward: 38,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'tracing Academy restricted-stack withdrawals');
      var roll = rollD20('finesse', G.skills.stealth);
      if (roll.total >= 14) {
        G.flags.mim_restricted_withdrawal_tracked = true;
        G.investigationProgress++;
        addNarration('Same Initials', 'The late-return register is kept at the circulation desk in a weatherworn cloth binder — three years of returns logged in alternating ink colors by shift. Restricted-stack withdrawals are supposed to rotate through multiple authorized readers as an internal check against single-point access. The register shows the same two initials on every restricted return for the past eleven months. The initials match a senior faculty name that does not appear on the faculty roster. He holds emeritus status. Emeritus holders retain check-out privileges but are not supposed to hold them exclusively.');
        addJournal('Academy restricted stacks: emeritus faculty holds exclusive withdrawal access for 11 months — rotation protocol bypassed', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('Circulation Protocol', 'The circulation librarian closes the register cover with a small movement that does not hurry itself. Withdrawal records are library administrative files; access requires a librarian referral and a filed purpose statement. She does not produce either form — she simply waits. Two students at the return counter have started reshelving slips that do not require reshelving. The register goes back under the desk. The cloth binder carries a small ink smudge on the spine from a thumb that rests there when someone is deciding what to do next.');
      }
    }
  },

  {
    label: "The lecturer crossed out a name in his own margin before speaking.",
    tags: ['stage2', 'mimolot_academy'],
    xpReward: 40,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(40, 'observing a lecturer self-censoring margin notes');
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 14) {
        G.flags.mim_lecturer_self_censor_seen = true;
        G.investigationProgress++;
        addNarration('Crossed Through', 'The lecturer arrives early and sets his notes on the lectern, reviewing them while the hall fills. Before the session opens he draws a line through a name in his own margin — a single horizontal stroke, pen pressed hard enough to leave an indent through two pages. The lecture proceeds without reference to the crossed-out name. Afterward, when the hall empties, the notes remain on the lectern for the sweeper. The indent is readable against the lamp. The name corresponds to a co-author on a glyph damping paper whose abstract was pulled from the Academy catalog three months ago.');
        addJournal('Academy lecture notes: lecturer self-censored co-author name — abstract also pulled from catalog', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        addNarration('Sweeper Intervention', 'The hall sweeper reaches the lectern before the lamp angle is right for reading the indent. He is a tidy older man with a cart, and he carries the pages to the faculty pigeonholes without looking at them — long habit, deliberate incuriosity. The lecturer has already left through the side corridor. The lectern is wiped down with a cloth that leaves no streak. Whatever was crossed out is now in a pigeonhole, which is a locked-key corridor the Academy does not extend to visiting readers. The reading path closes cleanly.');
      }
    }
  },

];

window.MIMOLOT_ACADEMY_STAGE2_ENRICHED_CHOICES = MIMOLOT_ACADEMY_STAGE2_ENRICHED_CHOICES;
