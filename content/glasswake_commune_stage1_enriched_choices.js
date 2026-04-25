/**
 * GLASSWAKE COMMUNE STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 22 investigation paths grounded in shard research suppression and communal science
 * Glasswake: a commune that built its identity around glasswake shard studies — now those studies are being locked away
 * Named NPC: Toman Iceveil (the researcher whose work is being suppressed)
 */

const GLASSWAKE_COMMUNE_STAGE1_ENRICHED_CHOICES = [

  // 1. FIRST ENCOUNTER: TOMAN ICEVEIL
  {
    label: "A researcher's work is cited in suppressed documents. He's still here. He's been waiting for someone to ask.",
    tags: ['Investigation', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'locating key researcher');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
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
    label: "Sections of the shard study are marked 'pending administrative review.' The review was filed fourteen months ago. No review entry exists.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'identifying reclassified shard research');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Sections 7 through 12 of the shard amplification study sit in the catalogue marked "preliminary — pending administrative review." The reclassification is dated fourteen months ago. No review entry exists anywhere in the subsequent record. You find this at a reading table near the archive window, water light broken across the surface of the estuary outside. Those sections describe the amplification mechanism — specifically how certain atmospheric processing compounds interact with shard-dense geology. Reclassifying them as preliminary prevents publication of the interaction model. The part that was suppressed is the part that explains what's happening to Aurora Crown's dome.`;
        G.flags.found_shard_reclassification = true;
        addJournal('Shard study reclassification: sections 7-12 blocked — describe atmospheric interaction with shard-dense geology matching Aurora Crown', 'evidence', `glasswake-reclassification-${G.dayCount}`);
      } else {
        G.lastResult = `The catalogue lists sections 7 through 12 clearly — they're not hidden, just walled off. Physical access to the restricted shelves requires a senior researcher's endorsement signature. The archivist on duty names Toman Iceveil first when you ask who could provide one, then stops herself. "Or any senior researcher," she adds. The correction is too quick. Toman is the name. He works late in the research annex — after the committee leaves for the day, he's there.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 3. CLUE: SHARD AMPLIFICATION DATA
  {
    label: "The reclassified sections describe a mechanism. Toman has the numbers behind it. He has them in a locked drawer.",
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
        addJournal('Shard amplification data obtained: dome filtration additives in resonance range — compound substitution creates exponential feedback loop', 'discovery', `glasswake-amplification-${G.dayCount}`);
      } else {
        G.lastResult = `The official channels for accessing unpublished research data require the author's cooperation or an administrative override that the committee controls. Without Toman's trust, neither route opens. He's visible in the research annex during formal hours, giving official statements. You need to earn the version of this conversation that happens after the committee leaves for the day.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 4. INVESTIGATION: THE COMMITTEE'S AUTHORITY
  {
    label: "Three of the five committee members were appointed eighteen months ago. The reclassification was filed that same month.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'mapping committee authority');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Five members on the committee. Two have served for years — their names appear in the commune's institutional documents going back a decade. The three appointed eighteen months ago — the same month the reclassification was filed — don't appear in any Glasswake institutional record before their appointment. Their shared professional affiliation is a northern materials research consortium. The appointment category used for them — "cooperative research partnership" — had never been invoked before. The committee's working majority was installed from outside, through a procedural category opened specifically to install them.`;
        addJournal('Committee: three of five members appointed 18 months ago via unused "cooperative partnership" — external affiliation to northern consortium', 'evidence', `glasswake-committee-${G.dayCount}`);
      } else {
        G.lastResult = `The committee roster is posted in the research hall, current and public. Five names, their areas of expertise, their committee roles. No appointment history on the posting. Tracing how each member arrived requires the archive appointment records, which are accessible during regular archive hours and require a researcher endorsement to pull. You know who's on the committee. How three of them got there is in the archive — the researcher Fen has a working access credential.`;
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
      addJournal('Research quarter evening: distributed material caching, simplified public display, unofficial building paths, covert communication', 'evidence', `glasswake-quarter-read-${G.dayCount}`);
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

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
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
    label: "The Oversight Collegium has a liaison at the administrative hall. Toman's complaint to them was acknowledged fourteen months ago.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Liaison Orsel has been monitoring the reclassification situation for three months. "The Collegium received a research freedom complaint from Glasswake fourteen months ago. We acknowledged it. The response is delayed." She's matter-of-fact about what the delay means: institutional suppression of the complaint. She's interested in the northern consortium connection — that's new information. "If the committee majority was externally installed through a previously unused procedural category, that changes the Collegium's standing to intervene."`;
        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_glasswake = true;
        G.factionHostility.oversight_collegium += 1;
        addJournal('faction', 'Oversight Collegium liaison Orsel: external committee appointment provides standing to intervene — wants consortium connection documented', `glasswake-collegium-${G.dayCount}`);
      } else {
        G.lastResult = `The Collegium's liaison table stands near the administrative hall entrance, unmanned. A posted schedule lists formal petition hours twice weekly. A clerk at the side desk explains the procedure without looking up: written request, registered party affiliation, supporting documentation attached. She slides a blank form across the counter and goes back to her ledger. The room smells of old paper and floor wax. The consortium connection — three committee members appointed through an unprecedented procedural category — is the kind of documentation that changes what a formal petition can compel.`;
        if (!G.flags) G.flags = {};
        G.flags.located_oversight_collegium_glasswake = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 8. INVESTIGATION: EXTERNAL CORRESPONDENCE
  {
    label: "Three committee members receive weekly sealed letters from a northern address. The letters arrive before each major suppression decision.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'tracing committee external correspondence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `A courier log at the commune's outgoing mail station shows three of the committee's new members receive weekly sealed correspondence from a northern address — marked "Northern Materials Consortium, Scientific Affairs." The timing of each correspondence batch correlates with subsequent committee decisions: reclassification orders, denial of research access, extension of review period. The consortium is directing the committee's decisions through weekly instruction cycles.`;
        if (!G.flags) G.flags = {};
        G.flags.found_committee_correspondence = true;
        addJournal('Committee correspondence: weekly instructions from Northern Materials Consortium precede each suppression decision', 'discovery', `glasswake-correspondence-${G.dayCount}`);
      } else if (result.total >= 11) {
        G.lastResult = `The outer section of the mail log shows two committee members receiving sealed correspondence from an external northern address — weekly intervals, consistent sender formatting. The letters are sealed and the content stays inside them. What's legible is the frequency: every seven days without interruption for eight months. Whatever those letters contain, the schedule never slipped. The correspondence predates every major committee decision in the same period. The timing is its own kind of evidence.`;
      } else {
        G.lastResult = `The administrative mail station sits at the far end of the research hall, behind a counter with a locked hinged panel. During business hours a mail clerk is at the station; after hours the panel closes and the lock engages. The external correspondence log hangs on a nail inside the panel — visible through the gap at the hinge, unavailable to hands that can't reach it. The commune's shard gallery has an unofficial building path that the researchers use to cross between wings without going through the main corridor.`;
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
    label: "Toman submitted to the Regional Science Review fourteen months ago. The submission was deferred. The deferral was requested by someone else.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing suppressed publication fate');

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The Regional Science Review acknowledges receiving the submission but records it as "declined pending further review by the submitting institution." The institution that requested the delay: the Northern Materials Consortium, who are listed as a "reviewing partner" for geological and atmospheric research. The consortium blocked publication by inserting themselves as a mandatory review step — through a journal agreement that was signed one month before Toman submitted. The agreement was timed.`;
        if (!G.flags) G.flags = {};
        G.flags.traced_publication_suppression = true;
        addJournal('Publication suppressed via timed journal review agreement — Northern Materials Consortium inserted mandatory review one month before submission', 'evidence', `glasswake-publication-${G.dayCount}`);
      } else {
        G.lastResult = `The Regional Science Review's public response log shows a single entry for Toman's submission: "received — deferred pending institutional review, per current review protocol." The entry is dated two days after submission. The review protocol it references is real — the Review publishes it. But invoking that protocol requires a registered reviewing institution to formally request it. The Review's partnership agreements are public charter filings. One of them was signed one month before Toman's submission date.`;
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
      addJournal('Shard gallery: amplification properties removed from public interpretation panels, replaced with aesthetic/spiritual framing', 'discovery', `glasswake-gallery-${G.dayCount}`);
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

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `A mineral trader who moves between Glasswake and Shelkopolis monthly agrees to carry a sealed document case. The case is inside a sample kit — unremarkable in her cargo. Toman's amplification data is now in transit to Shelkopolis without passing through the commune's administrative channels. Whatever happens to Toman or the archive, the data survives.`;
        G.flags.glasswake_data_secured = true;
        addJournal('consequence', 'Shard amplification data secured via mineral trader — offsite copy en route to Shelkopolis', `glasswake-data-secure-${G.dayCount}`);
      } else {
        G.lastResult = `Every trader who moves goods out of Glasswake has been informally assessed by the administrative committee — most of them don't know it happened. The canal gate logs, the sluice authority's cargo records, the timing notes kept by the water allocation clerk: together they form a complete picture of who leaves and when. Finding a channel that isn't covered requires someone new to the route entirely, or someone who carries things without knowing what they carry.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 13. INVESTIGATION: THE COMMITTEE VOTE RECORD
  {
    label: "Two researchers voted against the reclassification. Three voted for it. The vote record is buried with the classified research.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'obtaining committee vote record');

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The two original commune researchers voted against reclassification. The three externally-appointed members voted for it. A three-to-two majority carried the motion. The original researchers formally registered their dissent in the minutes — their objection is part of the record, but the record is classified under the same order that classified the research. The dissent is buried with the evidence it objected to.`;
        if (!G.flags) G.flags = {};
        G.flags.obtained_vote_record = true;
        addJournal('Vote record: 3-2 split on external/internal lines, dissent registered but buried with classified research', 'evidence', `glasswake-vote-${G.dayCount}`);
      } else {
        G.lastResult = `The committee's vote record sits inside a classified proceedings file — the same classification order that covers the reclassified research. The archivist on duty locates the file number without difficulty; the file itself requires committee authorization to open. One committee member could share the record informally. Researcher Winn voted against and stayed on the committee specifically to ensure dissent remains in the record. She keeps notes on every session.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 14. INVESTIGATION: THE CONSORTIUM BENEFIT
  {
    label: "The Northern Materials Consortium holds licensing rights to the additive class Toman's study would implicate. That's not coincidence.",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'mapping consortium benefit from suppression');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The Northern Materials Consortium holds licensing rights to the specific filtration additive class that the shard amplification data would implicate. If the data is published, their additives are identified as dangerous in shard-geology environments — which describes every dome settlement in the region. Their product category would require reformulation or withdrawal. The suppression isn't scientific conservatism — it's commercial liability protection. They're suppressing data that would destroy a revenue stream.`;
        addJournal('Consortium benefit: holds licensing rights to implicated additive class — suppression protects commercial liability', 'evidence', `glasswake-benefit-${G.dayCount}`);
      } else {
        G.lastResult = `The Northern Materials Consortium's trade charter lists its registered product categories — atmospheric processing compounds, dome-grade filtration additives, specialty mineral derivatives. The listing is public, accurate as far as it goes. Whether any of those categories carry liability exposure under the research Toman's study describes requires cross-referencing the compound classifications against his interaction model. Toman knows the compound class codes. He can run that comparison himself if you bring him the consortium's product registration.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 15. SOCIAL: THE DISSENTING COMMITTEE MEMBER
  {
    label: "One of the two researchers who voted against reclassification stayed on the committee. She's been building a written record ever since.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'speaking to dissenting committee member');

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Researcher Winn voted against but has stayed on the committee. "I stay because if I leave, they appoint a fourth external member. My presence prevents a four-to-one majority." She's accepted being outvoted as the price of maintaining any internal presence. "I can't stop them. But I can make the record show they were opposed. That matters eventually." She's been building a written record of every overreach, every suppression. She'll share it with someone who can use it.`;
        if (!G.flags) G.flags = {};
        G.flags.met_winn_dissenter = true;
        addJournal('contact', 'Committee dissenter Winn: staying to prevent fourth external appointment, has written record of every suppression decision', `glasswake-winn-${G.dayCount}`);
      } else {
        G.lastResult = `Researcher Winn is at her desk when you introduce yourself. She listens to the first sentence, then sets her pen down and straightens the papers in front of her into an already-straight stack. "I'm not in a position to speak informally about committee proceedings." Her register is careful, each word placed. The estuary light cuts across the desk between you. She doesn't ask who sent you. The dissenting vote in the committee record carries her name. That record is in the same classified file as Toman's research.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 16. RUMOR LAYER
  {
    label: "The commune knows something is wrong with the research situation. They just don't have the full shape of it yet.",
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
      addJournal(`Glasswake commune rumor: "${selected}"`, 'evidence', `glasswake-rumor-${G.dayCount}`);
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
      addJournal('Toman\'s lab: still actively refining suppressed research, building irrefutable measurement protocol', 'discovery', `glasswake-lab-night-${G.dayCount}`);
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

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `A study published thirty years ago by a Glasswake founder describes observing "unexpected atmospheric interaction with shard-adjacent processing compounds." The observation was listed as an anomaly requiring future study. No follow-up was funded for twenty years. When Toman finally followed up, the committee suppressed his findings. The anomaly has been known for three decades. It's been deliberately under-investigated, then suppressed when finally studied.`;
        addJournal('Predecessor study: anomaly known for 30 years, deliberately under-investigated, suppressed when finally studied', 'evidence', `glasswake-predecessor-${G.dayCount}`);
      } else {
        G.lastResult = `The founder's study is in the archive under standard classification — not restricted, not reclassified. You find the volume at a reading table near the estuary window, pages smelling of old binding and mineral dust. The anomaly observation is in a supplementary appendix, footnoted in a smaller hand than the rest of the document, never referenced in the main body. Thirty years of subsequent research passed over it. The observation was always there. No one was looking for it until Toman's work made it relevant.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 19. INVESTIGATION: THE CONSORTIUM'S GLASSWAKE PRESENCE
  {
    label: "The Northern Materials Consortium has a registered address in Glasswake's northern quarter. It looks like a mineral trading office.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'documenting consortium presence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The consortium has a "sample acquisition office" registered at a northern-quarter address in Glasswake. Listed as a commercial mineral buying operation. Two staff members. But the building has more communication equipment than a sample buyer would need — and receives courier deliveries addressed to the committee members through the sample office's address. The office is the instruction relay. Committee members receive their directives through what looks like a commercial address.`;
        if (!G.flags) G.flags = {};
        G.flags.found_consortium_relay = true;
        addJournal('Northern Materials Consortium relay office: commercial cover, instruction delivery channel for committee members', 'evidence', `glasswake-consortium-presence-${G.dayCount}`);
      } else {
        G.lastResult = `The address on the consortium's registry entry is in Glasswake's northern quarter — a two-room commercial office with a sample buyer's placard in the window. Through the glass: a desk, a cabinet, a single staff member writing. Standard commercial premises for a mineral trading operation. Whatever the office does beyond buying samples isn't visible from the street, and the door stays closed to walk-in visitors. Documenting whether it serves as an instruction relay requires seeing the correspondence it handles, which means getting inside.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 20. MORAL: PROTECT OR EXPOSE TOMAN
  {
    label: "Toman's data is the keystone. Naming him strengthens the case. It also gives the committee grounds to move against him.",
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
      addJournal('Glasswake shards at dawn: light translation properties visible — the phenomena continues despite suppressed study', 'discovery', `glasswake-dawn-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 22. SHADOW RIVAL INTRO
  {
    label: "Two months ago someone came to Toman claiming to want to help. He didn't trust them. He still doesn't know who they were.",
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
        G.lastResult = `"They left nothing," Toman says. "No name, no institutional mark, no record of arrival I could point to. I couldn't tell you what they looked like well enough to describe them to someone else." He turns a stylus in his fingers, staring at the desk. "They came in, they listened, they left. The algae-smell from the sluice tanks was stronger that morning — I remember that more clearly than I remember them." Whoever visited understood how to move through a place without accumulating a presence. The absence of trace is itself the trace.`;
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
      G.flags.stage1_rival_seeded = true;
      addJournal('warning', 'Rival-adjacent operative visited Toman Iceveil 2 months ago — reconnaissance, expert knowledge, or acquisition attempt', `glasswake-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // TYPE: INFORMATION — WORLD COLOR VIGNETTE
  {
    label: "The sluice channels at Glasswake were built to move water and light at the same time.",
    tags: ['WorldColor', 'Atmosphere', 'Stage1'],
    xpReward: 38,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'observing Glasswake sluice design');
      G.lastResult = `The sluice channels running through Glasswake Commune were engineered with a secondary purpose visible only when the water is moving slowly: the channel floors are surfaced with polished pale stone that acts as a reflector, and the shard samples stored in the adjacent study alcoves were positioned to catch the reflected light from below rather than direct light from above. The founders understood the shards' light-translation properties required indirect, diffuse illumination for accurate observation. The infrastructure is a study instrument. Walking through it, you're inside the apparatus.`;
      addJournal('Glasswake sluice infrastructure: engineered for indirect light distribution to study alcoves — settlement built as integrated research apparatus', 'discovery', `glasswake-sluice-${G.dayCount}`);
      G.recentOutcomeType = 'observe'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — ARCHETYPE GATE (Alchemist — Craft-heavy)
  {
    label: "The shard samples Toman stores show a chemical reaction profile that shouldn't be possible under known material science.",
    tags: ['Information', 'ArchetypeGate', 'Stage1'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const family = typeof getArchetypeFamily === 'function' ? getArchetypeFamily(G.archetype) : '';
      if (family !== 'Craft-heavy') {
        G.lastResult = `Toman's shard samples react to reagent exposure in ways he can't fully explain — the results are outside his reference framework. You understand that this is unusual without being able to characterize what's unusual about it.`;
        gainXp(30, 'noting shard anomalous reaction profile');
        G.recentOutcomeType = 'observe'; maybeStageAdvance(); return;
      }
      gainXp(72, 'analyzing shard chemical reaction profile');
      G.stageProgress[1]++;
      G.lastResult = `The reaction profile Toman documents is a class that doesn't appear in the standard material reference — the shards respond to reagent introduction with an energy output that exceeds the input by a consistent factor. Not random, not variable: a reliable multiplier that holds across forty-seven tested samples. That isn't degradation, contamination, or observer error. That's a material with an energy-amplification property that the current material science framework doesn't account for. Suppressing study of this isn't administrative tidiness. Something significant depends on this property remaining unstudied.`;
      if (!G.flags) G.flags = {};
      G.flags.glasswake_amplification_property = true;
      addJournal('Shard reaction profile: consistent energy amplification factor across 47 samples — undocumented property, suppression not administrative', 'evidence', `glasswake-reaction-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — BACKGROUND FLAVOR
  {
    label: "The administrative committee's composition changed three years ago — a majority arrived in the same appointment cycle.",
    tags: ['Information', 'Background', 'Stage1'],
    xpReward: 55,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'reviewing committee appointment history');
      const bg = G.background || '';
      let result = `The Glasswake administrative committee has nine members. Five of the current nine were appointed in the same cycle three years ago — all five nominated by the same regional authority body. Under the commune's own charter, this level of concentrated appointment requires a supermajority ratification vote. The ratification happened on a date when two of the committee's longest-serving members were documented as absent for illness. The vote passed with the minimum margin.`;
      if (bg === 'scholar' || bg === 'administrator') {
        result = `Committees structured with a coordinated majority block are recognizable from the appointment record — same origin cycle, same nominating authority, insufficient ratification margin. The resulting body has a reliable five-four split on any contested question, which means the minority bloc can never block a decision, only object to it. The split was engineered. Toman's research suppression came eleven months after the majority bloc was seated. The timing isn't coincidental.`;
      }
      G.lastResult = result;
      addJournal('Glasswake committee: 5 of 9 members appointed same cycle by same regional authority — coordinated majority enables consistent 5-4 suppression votes', 'evidence', `glasswake-committee-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — RISKY
  {
    label: "The commune's archive holds the original shard observation records from its founding generation — they contradict the current suppression rationale.",
    tags: ['Information', 'Risky', 'Records', 'Stage1'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading founding generation shard records');
      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The founding generation records describe direct shard observation over forty years of study — results logged, methods documented, researchers named. The current committee's stated reason for suppressing ongoing research is "unresolved safety concerns." The founding records don't show safety incidents. They show the opposite: a community that worked with shards continuously for forty years without harm. The suppression rationale contradicts the documented historical record. Someone on the committee knows what the archive contains and cited safety concerns anyway.`;
        if (!G.flags) G.flags = {};
        G.flags.glasswake_archive_contradiction = true;
        addJournal('Glasswake founding archive: 40 years of shard research with no safety incidents — committee safety rationale directly contradicted by historical record', 'evidence', `glasswake-archive-${G.dayCount}`);
      } else {
        G.lastResult = `The commune archive is organized by era, and the founding generation records occupy the oldest section — original vellum documents in cases with humidity seals, accessible by request with a thirty-minute notice period. The archivist is on rotation today and hasn't returned from the midday break. The archive request is straightforward. Toman has a researcher endorsement that allows him to pull founding-era documents without a wait period.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — BOLD
  {
    label: "The committee's correspondence with the regional authority contains a reference to a specific study outcome they needed prevented.",
    tags: ['Information', 'Bold', 'Records', 'Stage1'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'reading committee-authority correspondence');
      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 14) {
        G.lastResult = `The correspondence file between the committee and the regional authority runs thirty-one letters. Most are administrative. Letter nineteen is different: a response from the regional authority acknowledging the committee's request for "acceleration of the amplification study closure" and noting that "the energy multiplier finding must not enter the public record before the parallel project reaches completion." The parallel project isn't named. The energy multiplier is Toman's forty-seven-sample finding. Someone outside Glasswake knew about that finding and acted to suppress it before it was published.`;
        if (!G.flags) G.flags = {};
        G.flags.glasswake_correspondence_found = true;
        addJournal('Committee correspondence: regional authority letter confirms "energy multiplier finding must not enter public record before parallel project completion" — external coordination of suppression', 'evidence', `glasswake-correspondence-${G.dayCount}`);
      } else {
        G.lastResult = `The committee's official correspondence is an administrative record — classified as internal by default, accessible through a formal records request that routes to the committee chair for approval. The chair is the head of the five-member majority bloc. That route is closed. The archivist handles physical filing; the correspondence file is in a cabinet in the administrative office, not the commune archive. The dissenting members Arven and Missa keep parallel notes — their version of every meeting includes correspondence that was read aloud but never formally entered into the official minutes.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — SAFE LORE
  {
    label: "The shard field at the commune's edge is larger now than when the settlement was founded — the shards grow.",
    tags: ['Information', 'Safe', 'Lore', 'Stage1'],
    xpReward: 52,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(52, 'learning about shard growth rate');
      G.lastResult = `Toman has the original survey maps alongside the current field boundaries — the shard formation has expanded by roughly twelve percent in the settlement's recorded history, growing outward from the original cluster at a consistent rate. Not fast enough to alarm, not slow enough to be negligible. The growth raises a question the founding research was beginning to address before the suppression: what drives the expansion, and does the energy-amplification property scale with the total formation size. The current shard field is twelve percent more capable — of whatever it's capable of — than the one the founders studied.`;
      addJournal('Glasswake shard formation: 12% growth in settlement history, consistent rate — amplification properties may scale with formation size', 'discovery', `glasswake-growth-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — SOCIAL RISKY
  {
    label: "The two committee members who voted against the suppression still attend meetings — and they take notes on everything.",
    tags: ['Information', 'Risky', 'NPC', 'Stage1'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'meeting the dissenting committee members');
      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Arven and Missa have attended every committee session since the suppression vote and objected in the record to every decision made by the majority bloc. Their notes are comprehensive — every procedural motion, every stated rationale, every dissent. "We document because we know the official minutes are edited before filing," Arven says. He doesn't say it with particular emotion. "The edited minutes are what the record shows. Our notes show what happened in the room." Two years of parallel documentation, the committee's version and the accurate version sitting in different places.`;
        if (!G.flags) G.flags = {};
        G.flags.met_dissenting_committee = true;
        addJournal('Dissenting committee members Arven and Missa: 2 years of parallel documentation — their notes vs. edited official minutes', 'evidence', `glasswake-dissent-${G.dayCount}`);
      } else {
        G.lastResult = `The two dissenting members are in the chamber for the current committee session — observable from the public gallery. They take notes in notebooks they carry personally, not on the committee's standard documentation forms. The session ends in forty minutes. The corridor outside the chamber is where people linger afterward.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

{
  label: 'The notice board has recent postings.',
  tags: ['social'],
  xpReward: 5,
  fn: function() {
    var key = 'rumor_drawn_' + G.location + '_' + G.dayCount;
    if (G.flags[key]) {
      G.lastResult = 'The board has nothing new since this morning.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
}
];
window.GLASSWAKE_COMMUNE_STAGE1_ENRICHED_CHOICES = GLASSWAKE_COMMUNE_STAGE1_ENRICHED_CHOICES;
