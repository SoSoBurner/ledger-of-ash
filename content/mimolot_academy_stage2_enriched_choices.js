/**
 * MIMOLOT ACADEMY STAGE 2 ENRICHED CHOICES
 * Investigation arc: forbidden knowledge trafficking / suppression compound theoretical basis
 * NPCs: Quenra Quillfire (Tutor-Magistrate), Ilys Quillfire (Innkeeper),
 *       Sarith Quillfire (Market Clerk), Velis Quillfire (Shrine Attendant), Myra Quillfire (Porter)
 */

const MIMOLOT_ACADEMY_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Quenra Quillfire's lecture hall contains restricted curriculum materials — the suppression compound formula appears in theoretical texts three years before it was commissioned.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'accessing restricted Academy curriculum');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
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
    label: "Myra Quillfire handles Archive Loading Bay deliveries — she has recorded incoming shipments that do not match standard academic supply manifests.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reviewing Archive Loading Bay delivery records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('craft', (G.skills.craft||0) + Math.floor(G.level/3));
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
    label: "Sarith Quillfire's Knowledge Tariff Counter processes fees on all research materials entering the Academy — three recent acquisitions bypassed tariff entirely.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'examining Academy knowledge tariff bypass records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
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
    label: "Ilys Quillfire's Academy Inn hosts visiting scholars — she overheard a late-night conversation about 'pressure management protocols' between guests who are not on the faculty roster.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 66,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(66, 'questioning Academy innkeeper about scholar guests');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
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
    label: "Velis Quillfire maintains Memory Hall Shrine records — the shrine's historical inscriptions include pre-suppression glyph architecture data that was never formally classified.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'reviewing Memory Hall Shrine historical inscriptions');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
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
    label: "Stage 2 Mimolot Academy finale — the Academy's classified research was the theoretical foundation for the entire suppression operation. Expose or contain.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 108,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(108, 'Mimolot Academy Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The evidence chain isn't complete. The Regent Council won't open a formal inquiry on fragments — each piece needs a link to the next, and there are gaps in the chain still. More work before this becomes actionable.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/2));
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

];

window.MIMOLOT_ACADEMY_STAGE2_ENRICHED_CHOICES = MIMOLOT_ACADEMY_STAGE2_ENRICHED_CHOICES;
