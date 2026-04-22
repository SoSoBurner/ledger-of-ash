/**
 * GLASSWAKE COMMUNE STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 22 investigation paths grounded in shard research suppression and communal science
 * Glasswake: a commune that built its identity around glasswake shard studies — now those studies are being locked away
 * Named NPC: Toman Iceveil (the researcher whose work is being suppressed)
 */

const GLASSWAKE_COMMUNE_STAGE1_ENRICHED_CHOICES = [

  // 1. FIRST ENCOUNTER: TOMAN ICEVEIL
  {
    label: "Seek out Toman Iceveil — the glasswake researcher whose work is cited in suppressed documents.",
    tags: ['Investigation', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'locating key researcher');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The research annex is small and smells of ground mineral compound and old paper. Toman Iceveil is already at his worktable when you arrive, turning a shard sample in his fingers. He sets it down when you explain why you're here and studies you for a moment. "I've been waiting for someone to ask questions that weren't from the administrative committee." He won't hand over current research — too many requests have come in that direction and he's learned to read them. But he'll confirm what you already have evidence for, and he'll point you toward what the committee has spent fourteen months keeping out of print.`;
        G.flags.met_toman_iceveil = true;
        addJournal('contact', 'Toman Iceveil met: suppressed researcher, cautious, will confirm evidence you bring', `glasswake-toman-${G.dayCount}`);
      } else {
        G.lastResult = `Toman's colleagues answer the question without quite answering it. He's in during formal hours. During formal hours he gives official statements. One of them glances at the dock planks outside before adding: "He works late. After the committee leaves." Nobody says where he goes. The estuary at evening, salt-bleached wood and water carrying strange light — that's where the administrative visibility ends. You'll need to find him there.`;
        G.flags.located_toman_iceveil = true;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 2. CLUE: SUPPRESSED SHARD STUDY
  {
    label: "Access the commune's research archive — find what section of the glasswake shard studies has been reclassified.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'identifying reclassified shard research');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Sections 7 through 12 of the shard amplification study sit in the catalogue marked "preliminary — pending administrative review." The reclassification is dated fourteen months ago. No review entry exists anywhere in the subsequent record. You find this at a reading table near the archive window, water light broken across the surface of the estuary outside. Those sections describe the amplification mechanism — specifically how certain atmospheric processing compounds interact with shard-dense geology. Reclassifying them as preliminary prevents publication of the interaction model. The part that was suppressed is the part that explains what's happening to Aurora Crown's dome.`;
        G.flags.found_shard_reclassification = true;
        addJournal('investigation', 'Shard study reclassification: sections 7-12 blocked — describe atmospheric interaction with shard-dense geology matching Aurora Crown', `glasswake-reclassification-${G.dayCount}`);
      } else {
        G.lastResult = `The catalogue lists sections 7 through 12 clearly — they're not hidden, just walled off. Physical access to the restricted shelves requires a senior researcher's endorsement signature. The archivist on duty names Toman Iceveil first when you ask who could provide one, then stops herself. "Or any senior researcher," she adds. The correction is too quick. Toman is the name. You'll need to go through him.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 3. CLUE: SHARD AMPLIFICATION DATA
  {
    label: "Request Toman Iceveil's unpublished amplification data — the numerical basis for the reclassified sections.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'obtaining shard amplification data');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      if (!G.flags) G.flags = {};
      if (G.flags.met_toman_iceveil) {
        G.lastResult = `Toman produces the handwritten summary from a locked drawer in his private workspace, not the research annex. The data is dense but the conclusion is in plain language at the bottom of the third page: glasswake shards act as resonance multipliers for atmospheric compounds within a specific molecular weight range. Dome filtration additives fall exactly within that range. Any dome built over shard-dense geology is vulnerable to exponential compound amplification — introduce the wrong additive and the shards will intensify it beyond what the barrier can hold. He watches you read it. "This was suppressed before it could reach anyone operating a dome."`;

        G.flags.obtained_amplification_data = true;
        addJournal('discovery', 'Shard amplification data obtained: dome filtration additives in resonance range — compound substitution creates exponential feedback loop', `glasswake-amplification-${G.dayCount}`);
      } else {
        G.lastResult = `The official channels for accessing unpublished research data require the author's cooperation or an administrative override that the committee controls. Without Toman's trust, neither route opens. He's visible in the research annex during formal hours, giving official statements. You need to earn the version of this conversation that happens after the committee leaves for the day.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 4. INVESTIGATION: THE COMMITTEE'S AUTHORITY
  {
    label: "Map who sits on the administrative committee that ordered the research reclassification.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'mapping committee authority');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Five members on the committee. Two have served for years — their names appear in the commune's institutional documents going back a decade. The three appointed eighteen months ago — the same month the reclassification was filed — don't appear in any Glasswake institutional record before their appointment. Their shared professional affiliation is a northern materials research consortium. The appointment category used for them — "cooperative research partnership" — had never been invoked before. The committee's working majority was installed from outside, through a procedural category opened specifically to install them.`;
        addJournal('investigation', 'Committee: three of five members appointed 18 months ago via unused "cooperative partnership" — external affiliation to northern consortium', `glasswake-committee-${G.dayCount}`);
      } else {
        G.lastResult = `The committee roster is posted in the research hall, current and public. Five names, their areas of expertise, their committee roles. No appointment history on the posting. Tracing how each member arrived requires the archive appointment records, which are accessible during regular archive hours and require a researcher endorsement to pull. You know who's on the committee. How three of them got there is in a room you haven't opened yet.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 5. ARCHETYPE-GATED: READING GLASSWAKE
  {
    label: "Walk the commune's research quarter at evening — read what the researchers' behavior tells you.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading research quarter');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The researchers move their materials after hours. Not all of them — the ones with suppressed work. It's a distributed cache strategy: split sensitive documents across multiple personal locations so no single raid neutralizes everything. Someone advised them how to do this. Someone with experience in material security.`;
      } else if (arch === 'magic') {
        G.lastResult = `The shard samples in the open research lab have been systematically reduced — fewer shards on display, simpler specimens. The complex, high-resonance samples have been moved. The lab presents itself as studying something less interesting than it actually is. The real research has gone underground.`;
      } else if (arch === 'stealth') {
        G.lastResult = `A researcher you watched enter the main archive an hour ago exits from a side door on the opposite side of the building. The building doesn't have a connecting corridor on the ground floor — they went up, over, and down. There are paths through this building that aren't on any diagram. Glasswake's researchers know the building's unofficial architecture.`;
      } else {
        G.lastResult = `Two researchers are clearly not speaking. They pass within arm's reach without acknowledgment. But fifteen minutes later, a page appears on one's desk that wasn't there before. They've developed a non-verbal exchange system. Whatever divided them publicly, they're still communicating.`;
      }
      addJournal('investigation', 'Research quarter evening: distributed material caching, simplified public display, unofficial building paths, covert communication', `glasswake-quarter-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 6. SOCIAL: THE JUNIOR RESEARCHER
  {
    label: "Speak to the newest researcher in Toman's former study group — someone who hasn't yet learned what they're not supposed to discuss.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'speaking to junior researcher');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Fen is at a side bench near the estuary-facing window, sample log open in front of her. Six months at Glasswake, still close enough to her arrival that the suppression is a puzzle rather than a landscape. "I've read the reclassified abstract. Just the abstract." She sets down her pen. "The mechanism it describes is real — I've seen the measurement rig Toman built. There's no way that data is wrong." She looks at the dock boards through the window. "Why would you suppress correct research?" She genuinely doesn't know yet. The answer, when she figures it out, will land hard.`;
        if (!G.flags) G.flags = {};
        G.flags.met_fen_researcher = true;
        addJournal('contact', 'Junior researcher Fen: confirms amplification data is valid, doesn\'t yet understand why suppressed', `glasswake-fen-${G.dayCount}`);
      } else {
        G.lastResult = `Fen is willing to talk but keeps glancing toward the corridor. She says the older researchers told her to be careful about discussing the research situation with visitors she doesn't know. She's trying to be helpful and careful at the same time. "I can show you the public catalogue." That's the limit of what she'll offer. The caution was passed down explicitly; you can hear its exact phrasing in how she phrases hers.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 7. FACTION SEED: OVERSIGHT COLLEGIUM
  {
    label: "Contact the Oversight Collegium's science and research liaison present at the commune's administrative hall.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Liaison Orsel has been monitoring the reclassification situation for three months. "The Collegium received a research freedom complaint from Glasswake fourteen months ago. We acknowledged it. The response is delayed." She's matter-of-fact about what the delay means: institutional suppression of the complaint. She's interested in the northern consortium connection — that's new information. "If the committee majority was externally installed through a previously unused procedural category, that changes the Collegium's standing to intervene."`;
        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_glasswake = true;
        G.factionHostility.oversight_collegium += 1;
        addJournal('faction', 'Oversight Collegium liaison Orsel: external committee appointment provides standing to intervene — wants consortium connection documented', `glasswake-collegium-${G.dayCount}`);
      } else {
        G.lastResult = `The Collegium liaison is present but inaccessible through informal channels. Formal petition required.`;
        if (!G.flags) G.flags = {};
        G.flags.located_oversight_collegium_glasswake = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 8. INVESTIGATION: EXTERNAL CORRESPONDENCE
  {
    label: "Find evidence of correspondence between the committee's new members and their northern consortium affiliation.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'tracing committee external correspondence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `A courier log at the commune's outgoing mail station shows three of the committee's new members receive weekly sealed correspondence from a northern address — marked "Northern Materials Consortium, Scientific Affairs." The timing of each correspondence batch correlates with subsequent committee decisions: reclassification orders, denial of research access, extension of review period. The consortium is directing the committee's decisions through weekly instruction cycles.`;
        if (!G.flags) G.flags = {};
        G.flags.found_committee_correspondence = true;
        addJournal('discovery', 'Committee correspondence: weekly instructions from Northern Materials Consortium precede each suppression decision', `glasswake-correspondence-${G.dayCount}`);
      } else if (result.total >= 11) {
        G.lastResult = `You find evidence of regular correspondence between two committee members and an external address. The correspondence is sealed and you can't read the content, but the frequency and timing is notable.`;
      } else {
        G.lastResult = `The correspondence record requires access to the administrative mail log, which is locked outside business hours and guarded during them.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 9. MORAL PRESSURE: THE EVIDENCE DECISION
  {
    label: "Toman Iceveil asks what you plan to do with his data — he needs to know before he risks giving you everything he has.",
    tags: ['Moral', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'making evidence decision');
      if (!G.flags) G.flags = {};

      G.lastResult = `Toman's question is direct. "If you take this data to Shelkopolis, it will enter the investigation there and I lose control of how it's used. If you keep it here, it stays safe but it doesn't move the investigation forward. I've protected this data for over a year. I need to know who I'm giving it to." The choice is real: trust him with your plan and get everything, or maintain investigative compartmentalization and get only what he's willing to give a stranger.`;
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = 'Toman Iceveil';
      addJournal('consequence', 'Toman Iceveil\'s evidence decision required — share your plan or maintain compartmentalization', `glasswake-evidence-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 10. INVESTIGATION: THE SUPPRESSED PUBLICATION
  {
    label: "Retrieve the suppressed journal submission Toman sent to the Regional Science Review fourteen months ago — trace what happened to it.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing suppressed publication fate');

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The Regional Science Review acknowledges receiving the submission but records it as "declined pending further review by the submitting institution." The institution that requested the delay: the Northern Materials Consortium, who are listed as a "reviewing partner" for geological and atmospheric research. The consortium blocked publication by inserting themselves as a mandatory review step — through a journal agreement that was signed one month before Toman submitted. The agreement was timed.`;
        if (!G.flags) G.flags = {};
        G.flags.traced_publication_suppression = true;
        addJournal('investigation', 'Publication suppressed via timed journal review agreement — Northern Materials Consortium inserted mandatory review one month before submission', `glasswake-publication-${G.dayCount}`);
      } else {
        G.lastResult = `The Science Review acknowledges the submission was received and deferred but cites institutional review requirements they're not able to detail without the reviewing institution's permission.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 11. ATMOSPHERE: THE SHARD GALLERY
  {
    label: "Visit the commune's public shard gallery — observe what the curated display tells visitors about glasswake.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'reading shard gallery curation');

      G.lastResult = `The gallery emphasizes glasswake shards as aesthetic objects — beautiful, decorative, spiritually significant. The resonance properties that make them scientifically important are described in one small panel using language that sounds like poetry and explains nothing. The gallery was recently updated: the older interpretation panels, which mentioned the amplification potential, have been replaced. The commune's own public educational material has been revised to make the shards less scientifically interesting. The gallery is curation as suppression.`;
      addJournal('discovery', 'Shard gallery: amplification properties removed from public interpretation panels, replaced with aesthetic/spiritual framing', `glasswake-gallery-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 12. PERSONAL ARC: SECURE THE DATA OFFSITE
  {
    label: "Help Toman arrange for a copy of the complete amplification data to leave Glasswake through a secure route.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'securing data offsite');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `A mineral trader who moves between Glasswake and Shelkopolis monthly agrees to carry a sealed document case. The case is inside a sample kit — unremarkable in her cargo. Toman's amplification data is now in transit to Shelkopolis without passing through the commune's administrative channels. Whatever happens to Toman or the archive, the data survives.`;
        G.flags.glasswake_data_secured = true;
        addJournal('consequence', 'Shard amplification data secured via mineral trader — offsite copy en route to Shelkopolis', `glasswake-data-secure-${G.dayCount}`);
      } else {
        G.lastResult = `Every trader who regularly leaves Glasswake has been informally vetted by the administrative committee. Finding a channel that isn't monitored requires either someone new to the route or someone who doesn't know they're being watched.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 13. INVESTIGATION: THE COMMITTEE VOTE RECORD
  {
    label: "Obtain the committee vote record for the original reclassification order — who voted how.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'obtaining committee vote record');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The two original commune researchers voted against reclassification. The three externally-appointed members voted for it. A three-to-two majority carried the motion. The original researchers formally registered their dissent in the minutes — their objection is part of the record, but the record is classified under the same order that classified the research. The dissent is buried with the evidence it objected to.`;
        if (!G.flags) G.flags = {};
        G.flags.obtained_vote_record = true;
        addJournal('investigation', 'Vote record: 3-2 split on external/internal lines, dissent registered but buried with classified research', `glasswake-vote-${G.dayCount}`);
      } else {
        G.lastResult = `Vote records are part of the classified administrative proceedings. Without a senior committee member sharing them informally, official access requires external authority.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 14. INVESTIGATION: THE CONSORTIUM BENEFIT
  {
    label: "Determine what the Northern Materials Consortium gains from keeping the shard amplification study suppressed.",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'mapping consortium benefit from suppression');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The Northern Materials Consortium holds licensing rights to the specific filtration additive class that the shard amplification data would implicate. If the data is published, their additives are identified as dangerous in shard-geology environments — which describes every dome settlement in the region. Their product category would require reformulation or withdrawal. The suppression isn't scientific conservatism — it's commercial liability protection. They're suppressing data that would destroy a revenue stream.`;
        addJournal('investigation', 'Consortium benefit: holds licensing rights to implicated additive class — suppression protects commercial liability', `glasswake-benefit-${G.dayCount}`);
      } else {
        G.lastResult = `The consortium's commercial interests in the relevant compound categories are publicly registered but understanding the full liability exposure requires a specific understanding of the research implications.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 15. SOCIAL: THE DISSENTING COMMITTEE MEMBER
  {
    label: "Speak privately to one of the two original commune researchers who voted against the reclassification.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'speaking to dissenting committee member');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Researcher Winn voted against but has stayed on the committee. "I stay because if I leave, they appoint a fourth external member. My presence prevents a four-to-one majority." She's accepted being outvoted as the price of maintaining any internal presence. "I can't stop them. But I can make the record show they were opposed. That matters eventually." She's been building a written record of every overreach, every suppression. She'll share it with someone who can use it.`;
        if (!G.flags) G.flags = {};
        G.flags.met_winn_dissenter = true;
        addJournal('contact', 'Committee dissenter Winn: staying to prevent fourth external appointment, has written record of every suppression decision', `glasswake-winn-${G.dayCount}`);
      } else {
        G.lastResult = `The researcher is carefully professional. She's aware the committee situation is being monitored and won't discuss internal votes with someone she doesn't know.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 16. RUMOR LAYER
  {
    label: "Listen to commune members' informal conversation about the research situation — what do people believe is happening?",
    tags: ['Investigation', 'Rumor', 'Stage1', 'Meaningful'],
    xpReward: 62,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(62, 'gathering community rumor');

      const rumors = [
        'Toman\'s research would have prevented three recent dome failures in other settlements',
        'the committee\'s new members have never actually visited the research sites they\'re administering',
        'the Northern Materials Consortium offered to fund a new research wing if the shard study stays classified',
        'a researcher who tried to republish the data independently was quietly told their position would be reviewed'
      ];
      const selected = rumors[Math.floor(Math.random() * rumors.length)];

      G.lastResult = `Community whisper: "${selected}." The commune is aware that something wrong is happening — they just don't have the full shape of it yet.`;
      addJournal('investigation', `Glasswake commune rumor: "${selected}"`, `glasswake-rumor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 17. ATMOSPHERE: TOMAN'S LAB AT NIGHT
  {
    label: "Visit Toman's research space after the administrative committee has left for the day.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 52,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(52, 'seeing active research space');

      G.lastResult = `After hours, Toman's lab is alive in a way it isn't during official time. Equipment running. Notes spread. He works the way someone works when they know they're right and can't stop. Three shard samples are positioned in a measuring frame he built himself — not standard equipment, a custom rig for precise resonance capture. "I've been refining the measurement protocol," he says without looking up. "When they finally release this research, it needs to be irrefutable." He's still building the evidence that's already been suppressed.`;
      addJournal('discovery', 'Toman\'s lab: still actively refining suppressed research, building irrefutable measurement protocol', `glasswake-lab-night-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 18. INVESTIGATION: THE PREDECESSOR STUDY
  {
    label: "Find the predecessor study that Toman's work built on — determine whether earlier researchers noticed the amplification effect.",
    tags: ['Investigation', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'researching predecessor study');

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `A study published thirty years ago by a Glasswake founder describes observing "unexpected atmospheric interaction with shard-adjacent processing compounds." The observation was listed as an anomaly requiring future study. No follow-up was funded for twenty years. When Toman finally followed up, the committee suppressed his findings. The anomaly has been known for three decades. It's been deliberately under-investigated, then suppressed when finally studied.`;
        addJournal('investigation', 'Predecessor study: anomaly known for 30 years, deliberately under-investigated, suppressed when finally studied', `glasswake-predecessor-${G.dayCount}`);
      } else {
        G.lastResult = `The predecessor studies exist but the relevant anomaly observation is in a supplementary appendix that was never referenced in subsequent research. Easy to miss unless you know what you're looking for.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 19. INVESTIGATION: THE CONSORTIUM'S GLASSWAKE PRESENCE
  {
    label: "Document the Northern Materials Consortium's physical presence in Glasswake — personnel, assets, any infrastructure.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'documenting consortium presence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The consortium has a "sample acquisition office" registered at a northern-quarter address in Glasswake. Listed as a commercial mineral buying operation. Two staff members. But the building has more communication equipment than a sample buyer would need — and receives courier deliveries addressed to the committee members through the sample office's address. The office is the instruction relay. Committee members receive their directives through what looks like a commercial address.`;
        if (!G.flags) G.flags = {};
        G.flags.found_consortium_relay = true;
        addJournal('investigation', 'Northern Materials Consortium relay office: commercial cover, instruction delivery channel for committee members', `glasswake-consortium-presence-${G.dayCount}`);
      } else {
        G.lastResult = `The consortium has a registered address but it presents as a routine commercial operation. Documenting its real function requires either surveillance or internal access.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 20. MORAL: PROTECT OR EXPOSE TOMAN
  {
    label: "Decide whether to identify Toman as a source in the investigation record or protect his name until he's out of Glasswake.",
    tags: ['Moral', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'protecting source decision');
      if (!G.flags) G.flags = {};

      G.lastResult = `Toman's data is the keystone of the Glasswake evidence chain. If his name enters the investigation record, the committee has grounds to challenge his employment status and potentially seize his equipment. If his name stays out, the evidence is weaker but he remains operational. The choice affects both the case and the person who built it. He's asked you to make the call.`;
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = 'Toman Iceveil';
      addJournal('consequence', 'Toman source protection decision pending — name in record strengthens case but endangers researcher', `glasswake-source-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 21. WORLD COLOR: GLASSWAKE DAWN
  {
    label: "Wake before sunrise and walk to the shard field at the commune's edge — observe glasswake shards in natural light.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 48,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(48, 'observing glasswake shards at dawn');

      G.lastResult = `The shards catch first light differently from anything you've seen — not reflected, refracted into spectrum bands that shift as the sun angle changes. They don't glow. They translate. Light comes in white and leaves changed. Watching it, you understand why a community built its identity around studying these things. You also understand what would be lost if that study is permanently closed off. The shards are still doing what they always did. The suppression hasn't stopped that. It's only stopped people understanding it.`;
      addJournal('discovery', 'Glasswake shards at dawn: light translation properties visible — the phenomena continues despite suppressed study', `glasswake-dawn-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 22. SHADOW RIVAL INTRO
  {
    label: "Toman Iceveil says someone came to see him two months ago claiming to want to help — he didn't trust them.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They asked about security," Toman says. "How the research was stored, whether I had guards, how quickly the administrative committee could be notified if someone accessed the archive after hours. Not research questions — site assessment questions." Someone was mapping the security environment for future access. The visit was reconnaissance.`;
      } else if (arch === 'magic') {
        G.lastResult = `"They understood the amplification mechanism immediately," Toman says. "Before I'd fully explained it. They completed my sentences. That's not someone who came to learn — that's someone who came to verify what they already know." Someone already has the data independently. They came to confirm Toman's version matches theirs — or differs from it.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They left nothing," Toman says. "No name, no affiliation, no contact information. I have nothing to trace them with. The visit happened and left no record I could give anyone." A deliberate clean exit. This person operates without leaving investigable presence.`;
      } else {
        G.lastResult = `"They offered institutional backing," Toman says. "A research fellowship, publication support, legal protection. Everything I've needed for fourteen months. I almost took it." He pauses. "The terms required transferring data ownership to an unnamed oversight body before the fellowship would be finalized. I read the fine print." Someone tried to acquire the suppressed data through a fabricated rescue operation.`;
      }

      G.lastResult += ` Toman doesn't know who they were. But they knew everything about his situation.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative visited Toman Iceveil 2 months ago — reconnaissance, expert knowledge, or acquisition attempt', `glasswake-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.GLASSWAKE_COMMUNE_STAGE1_ENRICHED_CHOICES = GLASSWAKE_COMMUNE_STAGE1_ENRICHED_CHOICES;
