/**
 * GLASSWAKE COMMUNE STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 22 investigation paths grounded in shard research suppression and communal science
 * Glasswake: a commune that built its identity around glasswake shard studies — now those studies are being locked away
 * Named NPC: Toman Iceveil (the researcher whose work is being suppressed)
 */

var GLASSWAKE_COMMUNE_STAGE1_ENRICHED_CHOICES = [

  // 1. FIRST ENCOUNTER: TOMAN ICEVEIL
  {
    plot: 'main',
    questId: 'q_s1_pattern',
    label: "A researcher cited in suppressed documents is still here. Waiting for someone to ask.",
    tags: ['Investigation', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    failResult: function() {
      addNarration('', "The research annex is quiet this time of day, reed-thatch smell drifting in from the waterline. Toman Iceveil's colleagues deflect without meeting your eyes — formal hours, prepared statements, nothing beyond that. One of them straightens sample jars that were already straight. His name keeps surfacing, then getting pulled back. He works after the committee leaves. The estuary at evening is where the administrative visibility ends; that's where a real conversation becomes possible.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'locating key researcher');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 12) {
        G.lastResult = `The research annex is small and smells of ground mineral compound and old paper. Toman Iceveil is already at his worktable when you arrive, turning a shard sample in his fingers — slowly, without looking at it, the way a person handles something they've already memorized. He sets it down when you explain why you're here and studies you for a moment. "I've been waiting for someone to ask questions that weren't from the administrative committee." He won't hand over current research — too many requests have come in that direction and he's learned to read them. But he'll confirm what you already have evidence for, and he'll point you toward what the committee has suppressed.`;
        G.flags.met_toman_iceveil = true;
        addJournal('Toman Iceveil met: suppressed researcher, cautious, will confirm evidence you bring', 'contact_made');
      } else {
        G.lastResult = `Toman's colleagues answer the question without quite answering it. He's in during formal hours. During formal hours he gives official statements. One of them glances at the dock planks outside before adding: "He works late. After the committee leaves." Nobody says where he goes. The estuary at evening, salt-bleached wood and water carrying strange light — that's where the administrative visibility ends. You'll need to find him there.`;
        G.flags.located_toman_iceveil = true;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 2. CLUE: SUPPRESSED SHARD STUDY
  {
    plot: 'main',
    questId: 'q_s1_converging',
    label: "Sections marked 'pending administrative review.' Filed fourteen months ago. No review entry exists.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 74,
    failResult: function() {
      addNarration('', "The catalogue lists sections 7 through 12 in plain sight — not hidden, just walled. Physical access to the restricted shelves requires a senior researcher's endorsement signature. The archivist on duty names Toman Iceveil first when you ask who could provide one, then corrects herself too quickly. Water light moves across the archive table from the estuary window. Toman works late, after the committee leaves. He's the name. He's always been the name.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'identifying reclassified shard research');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0));
      if (result.total >= 13) {
        G.lastResult = `Sections 7 through 12 of the shard amplification study sit in the catalogue marked "preliminary — pending administrative review." The reclassification is dated fourteen months ago. No review entry exists anywhere in the subsequent record. You find this at a reading table near the archive window, water light broken across the surface of the estuary outside. Those sections describe the amplification mechanism — specifically how certain atmospheric processing compounds interact with shard-dense geology. Reclassifying them as preliminary prevents publication of the interaction model. The part that was suppressed is the part that explains what's happening to Aurora Crown's shell.`;
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
    label: "The reclassified sections describe a mechanism. Toman has the numbers in a locked drawer.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    condition: function() { return (G.investigationProgress||0) < 3; },
    xpReward: 76,
    failResult: function() {
      addNarration('', 'A scanning gate cycles open at the end of the quarantine corridor and a containment warden in white-rimmed silvers steps through, clipboard ready. You drift back toward the observation gallery before the breach-protocol bell can name you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'obtaining shard amplification data');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      if (!G.flags) G.flags = {};
      if (G.flags.met_toman_iceveil) {
        G.lastResult = `Toman produces the handwritten summary from a locked drawer in his private workspace, not the research annex. The data is dense but the conclusion is in plain language at the bottom of the third page: glasswake shards act as resonance multipliers for atmospheric compounds within a specific molecular weight range. Cold-shell filtration additives fall exactly within that range. Any shell built over shard-dense geology is vulnerable to exponential compound amplification — introduce the wrong additive and the shards will intensify it beyond what the barrier can hold. He watches you read it. "This was suppressed before it could reach anyone operating a shelter shell."`;

        G.flags.obtained_amplification_data = true;
        addJournal('Shard amplification data obtained: shell filtration additives in resonance range — compound substitution creates exponential feedback loop', 'discovery', `glasswake-amplification-${G.dayCount}`);
      } else {
        G.lastResult = `The pathway to unpublished research data runs through the author's cooperation or an administrative override that the committee controls. Without Toman's trust, neither route opens. His name appears on the research annex door during formal hours, and during those hours he gives statements that match the committee's position. The conversation that holds the actual data happens elsewhere — after the committee leaves for the day, the estuary path behind the annex is where his real working hours are.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 4. INVESTIGATION: THE COMMITTEE'S AUTHORITY
  {
    label: "Three of five committee members appointed eighteen months ago. Reclassification filed that month.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    condition: function() { return (G.investigationProgress||0) >= 3 && (G.investigationProgress||0) < 6; },
    xpReward: 70,
    failResult: function() {
      addNarration('', "The committee roster is posted in the research hall — five names, areas of expertise, current roles. No appointment history on the posting. Tracing how the three external members arrived requires the archive appointment records, pulled during regular hours with a researcher endorsement. The sluice channels outside carry the morning smell of reed and standing water. Researcher Fen has a working access credential and hasn't yet learned what questions to avoid.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'mapping committee authority');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0));
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
    failResult: function() {
      addNarration('', "The research quarter at evening is quieter than it should be. Doors closed, walkway lamps reflected in the channel water below, the smell of net-rope and old mineral compound mixing in the mist off the estuary. Researchers move with their heads down and their cases close. Something is being communicated in the collective posture of this place, but the specific pattern isn't readable from outside. Toman knows the quarter's rhythms well enough to translate what the behavior means.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading research quarter');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The researchers move their materials after hours. Not all of them — the ones with suppressed work. It's a distributed cache strategy: split sensitive documents across multiple personal locations so no single raid neutralizes everything. Someone advised them how to do this — the pattern is too deliberate, too coordinated for spontaneous caution. Someone with experience in material security passed this method on. The question is who taught it to them and when.`;
      } else if (arch === 'magic') {
        G.lastResult = `The shard samples in the open research lab have been systematically reduced — fewer shards on display, simpler specimens. The complex, high-resonance samples have been moved. The lab presents itself as studying something less interesting than it actually is, the way a practitioner presents a diminished version of their work when observed. The real research has gone underground, somewhere the committee's daily visibility doesn't reach. Low-resonance specimens are cover, not curriculum.`;
      } else if (arch === 'stealth') {
        G.lastResult = `A researcher you watched enter the main archive an hour ago exits from a side door on the opposite side of the building. The building doesn't have a connecting corridor on the ground floor — they went up, over, and down through some path not reflected in the posted floor plan. There are routes through this building that exist only in practice. Glasswake's researchers know the unofficial architecture. The building has two versions: the one visitors see and the one the researchers move through.`;
      } else {
        G.lastResult = `Two researchers are clearly not speaking to each other. They pass within arm's reach without acknowledgment, the mist off the estuary canal still clinging to the walkway planks between them. But fifteen minutes later, a page appears on one's desk that wasn't there before — no hand delivering it, no exchange visible. They've developed a non-verbal exchange system that runs below the threshold of observation. Whatever divided them publicly, they're still communicating. The suppression hasn't separated them. It's only changed their methods.`;
      }
      addJournal('Research quarter evening: distributed material caching, simplified public display, unofficial building paths, covert communication', 'evidence', `glasswake-quarter-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 6. SOCIAL: THE JUNIOR RESEARCHER
  {
    label: "She hasn't learned yet what she's not supposed to say.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    failResult: function() {
      addNarration('', "Fen keeps glancing toward the corridor. The older researchers told her to be careful with visitors she doesn't know — the caution was passed down in exact language and she's repeating its shape. 'I can show you the public catalogue.' Through the estuary-facing window behind her, morning mist sits low on the water, net floats half-visible. She wants to help. She was told not to. Toman's name is the one that came up before hers, and his hours are known.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'speaking to junior researcher');

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 10) {
        G.lastResult = `Fen is at a side bench near the estuary-facing window, sample log open in front of her. Six months at Glasswake, still close enough to her arrival that the suppression is a puzzle rather than a landscape. "I've read the reclassified abstract. Just the abstract." She sets down her pen. "The mechanism it describes is real — I've seen the measurement rig Toman built. There's no way that data is wrong." She looks at the dock boards through the window. "Why would you suppress correct research?" She genuinely doesn't know yet. The answer, when she figures it out, will land hard.`;
        if (!G.flags) G.flags = {};
        G.flags.met_fen_researcher = true;
        addJournal('Junior researcher Fen: confirms amplification data is valid, doesn\'t yet understand why suppressed', 'contact_made', `glasswake-fen-${G.dayCount}`);
      } else {
        G.lastResult = `Fen is willing to talk but keeps glancing toward the corridor. She says the older researchers told her to be careful about discussing the research situation with visitors she doesn't know. She's trying to be helpful and careful at the same time. "I can show you the public catalogue." That's the limit of what she'll offer. The caution was passed down explicitly; you can hear its exact phrasing in how she phrases hers.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 7. FACTION SEED: OVERSIGHT COLLEGIUM
  {
    label: "The Collegium has a liaison here. Toman's complaint was acknowledged fourteen months ago.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    failResult: function() {
      addNarration('', "The Collegium liaison table stands unmanned near the administrative hall entrance. A posted schedule lists formal petition hours twice weekly. A clerk at the side desk slides a blank form across the counter without looking up — written request, registered party affiliation, supporting documentation attached. The room smells of floor wax and old paper. The consortium connection, three committee members appointed through an unprecedented procedural category, is the kind of documentation that changes what a formal petition can compel.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 12) {
        G.lastResult = `Liaison Orsel has been monitoring the reclassification situation for three months. "The Collegium received a research freedom complaint from Glasswake fourteen months ago. We acknowledged it. The response is delayed." She's matter-of-fact about what the delay means: institutional suppression of the complaint. She's interested in the northern consortium connection — that's new information. "If the committee majority was externally installed through a previously unused procedural category, that changes the Collegium's standing to intervene."`;
        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_glasswake = true;
        G.factionHostility.oversight_collegium += 1;
        addJournal('Oversight Collegium liaison Orsel: external committee appointment provides standing to intervene — wants consortium connection documented', 'intelligence', `glasswake-collegium-${G.dayCount}`);
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
    label: "Three committee members receive sealed letters from the north before each suppression decision.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 75,
    failResult: function() {
      addNarration('', 'A scanning gate cycles open at the end of the quarantine corridor and a containment warden in white-rimmed silvers steps through, clipboard ready. You drift back toward the observation gallery before the breach-protocol bell can name you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'tracing committee external correspondence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('finesse', (G.skills.finesse || 0));
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
    label: "Toman needs to know what I plan to do before he risks giving me everything.",
    tags: ['Moral', 'Evidence', 'Confrontation', 'Stage1', 'Meaningful'],
    xpReward: 68,
    effects: [
      { type: 'heat', polity: 'sheresh', amount: 1 },
      { type: 'rival', amount: 1 }
    ],
    failResult: function() {
      addNarration('', 'A scanning gate cycles open at the end of the quarantine corridor and a containment warden in white-rimmed silvers steps through, clipboard ready. You drift back toward the observation gallery before the breach-protocol bell can name you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'making evidence decision');
      if (!G.flags) G.flags = {};

      G.lastResult = `Toman's question is direct. "If you take this data to Shelkopolis, it will enter the inquiry there and I lose control of how it's used. If you keep it here, it stays safe but it doesn't move the inquiry forward. I've protected this data for over a year. I need to know who I'm giving it to." The choice is real: trust him with your plan and get everything, or keep your sources compartmented and get only what he's willing to give a stranger.`;
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = 'Toman Iceveil';
      addJournal('Toman Iceveil\'s evidence decision required — share your plan or maintain compartmentalization', 'complication', `glasswake-evidence-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 10. INVESTIGATION: THE SUPPRESSED PUBLICATION
  {
    label: "Toman's submission was deferred fourteen months ago. The deferral was requested by someone else.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    failResult: function() {
      addNarration('', "The Regional Science Review's public response log shows a single entry: 'received — deferred pending institutional review, per current review protocol.' The entry is dated two days after submission. Invoking that protocol requires a registered reviewing institution to formally request it. The Review's partnership agreements are public charter filings. One of them was signed shortly before Toman's submission date — the register is accessible at the commune archive during regular hours.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing suppressed publication fate');

      const result = rollD20('wits', (G.skills.wits || 0));
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
    label: "The public shard gallery shows visitors a curated version of glasswake.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    failResult: function() {
      addNarration('', "The gallery is open and unmanned. Shard samples behind glass, interpretation panels on the walls, the low sound of water moving through the sluice channel beneath the floor. The display is polished and complete — too complete. Aesthetic framing, spiritual significance, nothing about resonance or amplification. The panels were recently updated; the older text is still faintly legible under the new layer near the mounting hardware. Toman can tell you what the original interpretation said before it was revised.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
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
    label: "The amplification data needs to leave Glasswake through a secure route.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    failResult: function() {
      addNarration('', 'A scanning gate cycles open at the end of the quarantine corridor and a containment warden in white-rimmed silvers steps through, clipboard ready. You drift back toward the observation gallery before the breach-protocol bell can name you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'securing data offsite');
      if (!G.flags) G.flags = {};

      const result = rollD20('finesse', (G.skills.finesse || 0));
      if (result.total >= 11) {
        G.lastResult = `A mineral trader who moves between Glasswake and Shelkopolis monthly agrees to carry a sealed document case. The case is tucked inside a sample kit among the bulk of her regular cargo — the kind of thing a canal-gate clerk flips past without reading. Toman's amplification data is now in transit to Shelkopolis without passing through the commune's administrative channels or the sluice authority's cargo log. Whatever happens to Toman or the archive after this, the data survives the route.`;
        G.flags.glasswake_data_secured = true;
        addJournal('Shard amplification data secured via mineral trader — offsite copy en route to Shelkopolis', 'evidence', `glasswake-data-secure-${G.dayCount}`);
      } else {
        G.lastResult = `Every trader who moves goods out of Glasswake has been informally assessed by the administrative committee — most of them don't know it happened. The canal gate logs, the sluice authority's cargo records, the timing notes kept by the water allocation clerk: together they form a complete picture of who leaves and when. Finding a channel that isn't covered requires someone new to the route entirely, or someone who carries things without knowing what they carry.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 13. INVESTIGATION: THE COMMITTEE VOTE RECORD
  {
    label: "Two voted against reclassification. Three voted for it. The vote record is buried.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    failResult: function() {
      addNarration('', "The committee proceedings file is classified under the same order that covers the reclassified research — the archivist locates the file number without difficulty, then stops. Committee authorization is required to open it. One committee member could share the record informally. Researcher Winn voted against the reclassification and stayed on the committee specifically to keep the dissent inside the record. She keeps notes on every session and keeps them somewhere the classification order can't reach.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'obtaining committee vote record');

      const result = rollD20('charm', (G.skills.charm || 0));
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
    label: "The Consortium holds licensing rights to what Toman's study would implicate. Not coincidence.",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 74,
    failResult: function() {
      addNarration('', 'A scanning gate cycles open at the end of the quarantine corridor and a containment warden in white-rimmed silvers steps through, clipboard ready. You drift back toward the observation gallery before the breach-protocol bell can name you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'mapping consortium benefit from suppression');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0));
      if (result.total >= 13) {
        G.lastResult = `The Northern Materials Consortium holds licensing rights to the specific filtration additive class that the shard amplification data would implicate. If the data is published, their additives are identified as dangerous in shard-geology environments — which describes every shell settlement in the region. Their product category would require reformulation or withdrawal. The suppression isn't scientific conservatism — it's commercial liability protection. They're suppressing data that would destroy a revenue stream.`;
        addJournal('Consortium benefit: holds licensing rights to implicated additive class — suppression protects commercial liability', 'evidence', `glasswake-benefit-${G.dayCount}`);
      } else {
        G.lastResult = `The Northern Materials Consortium's trade charter lists its registered product categories — atmospheric processing compounds, shell-grade filtration additives, specialty mineral derivatives. The listing is public, accurate as far as it goes. Whether any of those categories carry liability exposure under the research Toman's study describes requires cross-referencing the compound classifications against his interaction model. Toman knows the compound class codes. He can run that comparison himself if you bring him the consortium's product registration.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 15. SOCIAL: THE DISSENTING COMMITTEE MEMBER
  {
    label: "One researcher who voted against reclassification stayed. She's been building a written record.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    failResult: function() {
      addNarration('', "Researcher Winn listens to the first sentence, then sets her pen down and straightens papers that were already straight. 'I'm not in a position to speak informally about committee proceedings.' Each word placed. The estuary light cuts across the desk between you. She doesn't ask who sent you. The dissenting vote in the committee record carries her name — that record is in the same classified file as Toman's research, but Winn keeps her own parallel notes outside the committee's filing system.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'speaking to dissenting committee member');

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 11) {
        G.lastResult = `Researcher Winn voted against but has stayed on the committee. "I stay because if I leave, they appoint a fourth external member. My presence prevents a four-to-one majority." She's accepted being outvoted as the price of maintaining any internal presence. "I can't stop them. But I can make the record show they were opposed. That matters eventually." She's been building a written record of every overreach, every suppression. She'll share it with someone who can use it.`;
        if (!G.flags) G.flags = {};
        G.flags.met_winn_dissenter = true;
        addJournal('Committee dissenter Winn: staying to prevent fourth external appointment, has written record of every suppression decision', 'contact_made', `glasswake-winn-${G.dayCount}`);
      } else {
        G.lastResult = `Researcher Winn is at her desk when you introduce yourself. She listens to the first sentence, then sets her pen down and straightens the papers in front of her into an already-straight stack. "I'm not in a position to speak informally about committee proceedings." Her register is careful, each word placed. The estuary light cuts across the desk between you. She doesn't ask who sent you. The dissenting vote in the committee record carries her name. That record is in the same classified file as Toman's research.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 16. RUMOR LAYER
  {
    label: "The commune knows something is wrong. They don't have the full shape of it yet.",
    tags: ['Investigation', 'Rumor', 'Stage1', 'Meaningful'],
    xpReward: 62,
    failResult: function() {
      addNarration('', "The commune is aware something is wrong — you can hear it in the careful pauses, the way conversations shift when certain names come up near the committee hall. Nobody has the full shape of it. The notice board near the water-clock tower carries community postings; the morning crier covers what the board doesn't. Between the two, a partial picture assembles. The missing part is the part that requires someone who was in the room when the vote happened.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(62, 'gathering community rumor');

      const rumors = [
        'Toman\'s research would have prevented three recent shell failures in other settlements',
        'the committee\'s new members have never actually visited the research sites they\'re administering',
        'the Northern Materials Consortium offered to fund a new research wing if the shard study stays classified',
        'a researcher who tried to republish the data independently was quietly told their position would be reviewed'
      ];
      const selected = rumors[Math.floor(Math.random() * rumors.length)];

      G.lastResult = `Community whisper, overheard near the water-clock tower at the sluice channel junction: "${selected}." The commune is aware that something wrong is happening in the research annex — the committee's silences carry weight, the careful pauses before certain names come up in the communal hall, the way the fishing nets get repaired in groups now instead of alone. The full shape of it hasn't surfaced yet. But the shape of what isn't being said has its own contour.`;
      addJournal(`Glasswake commune rumor: "${selected}"`, 'evidence', `glasswake-rumor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 17. ATMOSPHERE: TOMAN'S LAB AT NIGHT
  {
    label: "Toman's lab is different after the administrative committee leaves for the day.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 52,
    failResult: function() {
      addNarration('', "The research annex is locked at this hour. Through the window: a lamp still burning over Toman's worktable, a measuring rig he built himself positioned in the middle of the room, shard samples in their brackets. He's inside. The door is closed to people he doesn't yet trust. The estuary path runs behind the annex building — the side entrance is where he comes and goes after hours, away from the main corridor.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
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
    plot: 'main',
    questId: 'q_s1_close',
    label: "Toman's work built on an earlier study. Someone noticed the amplification first.",
    tags: ['Investigation', 'Lore', 'Stage1'],
    xpReward: 68,
    failResult: function() {
      addNarration('', "The founder's study is in the archive under standard classification — not restricted. A reading table near the estuary window, pages smelling of old binding and mineral dust. The anomaly observation is in a supplementary appendix, footnoted in a smaller hand than the rest of the document, never referenced in the main body. Thirty years of research passed over it. The observation was always there; the question is why no one was looking for it. Toman's work made it relevant, and he can tell you how he found it.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'researching predecessor study');

      const result = rollD20('wits', (G.skills.wits || 0));
      if (result.total >= 12) {
        G.lastResult = `A study published thirty years ago by a Glasswake founder describes observing "unexpected atmospheric interaction with shard-adjacent processing compounds." The observation was listed as an anomaly requiring future study. No follow-up was funded for twenty years. When Toman finally followed up, the committee suppressed his findings. The anomaly has been known for three decades. It was deliberately left unexamined, then suppressed when someone finally looked.`;
        addJournal('Predecessor study: anomaly known for 30 years, left unexamined, suppressed when finally studied', 'evidence', `glasswake-predecessor-${G.dayCount}`);
      } else {
        G.lastResult = `The founder's study is in the archive under standard classification — not restricted, not reclassified. You find the volume at a reading table near the estuary window, pages smelling of old binding and mineral dust. The anomaly observation is in a supplementary appendix, footnoted in a smaller hand than the rest of the document, never referenced in the main body. Thirty years of subsequent research passed over it. The observation was always there. No one was looking for it until Toman's work made it relevant.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 19. INVESTIGATION: THE CONSORTIUM'S GLASSWAKE PRESENCE
  {
    label: "The Consortium has a registered address here. It looks like a mineral trading office.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    failResult: function() {
      addNarration('', 'A scanning gate cycles open at the end of the quarantine corridor and a containment warden in white-rimmed silvers steps through, clipboard ready. You drift back toward the observation gallery before the breach-protocol bell can name you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'documenting consortium presence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('vigor', (G.skills.vigor || 0));
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
    label: "Naming Toman strengthens the case. It also gives the committee grounds to move against him.",
    tags: ['Moral', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 65,
    failResult: function() {
      addNarration('', 'A scanning gate cycles open at the end of the quarantine corridor and a containment warden in white-rimmed silvers steps through, clipboard ready. You drift back toward the observation gallery before the breach-protocol bell can name you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'protecting source decision');
      if (!G.flags) G.flags = {};

      G.lastResult = `Toman's data is the keystone of the Glasswake evidence chain. If his name enters the formal record, the committee has grounds to challenge his employment status and potentially seize his equipment. If his name stays out, the evidence is weaker but he remains operational. The choice affects both the case and the person who built it. He's asked you to make the call.`;
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = 'Toman Iceveil';
      addJournal('Toman source protection decision pending — name in record strengthens case but endangers researcher', 'complication', `glasswake-source-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 21. WORLD COLOR: GLASSWAKE DAWN
  {
    label: "The shard field at first light, before anyone else is there to watch.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 48,
    failResult: function() {
      addNarration('', "The shard field path is gated before sunrise — a rope-and-plank barrier across the access walkway, mist off the estuary sitting thick over the planks. A notice on the barrier post lists field access hours: sunrise to midday, midday rest break excluded. The shards are visible past the gate, dark against the pale water behind them. The morning water-clock chime is still an hour off. The access window opens with the light.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
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
    label: "Two months ago someone came claiming to help. Toman didn't trust them.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They asked about security," Toman says. "How the research was stored, whether I had guards, how quickly the administrative committee could be notified if someone accessed the archive after hours. Not research questions — site assessment questions." He picks up a shard sample, sets it down. "I answered some of them before I understood what I was answering." Someone was mapping the security environment for future access. The visit was reconnaissance. The data they collected is still in use.`;
      } else if (arch === 'magic') {
        G.lastResult = `"They understood the amplification mechanism immediately," Toman says. "Before I'd fully explained it. They completed my sentences." He stares at the reed-paper on his desk. "That's not someone who came to learn — that's someone who came to verify what they already know. To see if my numbers matched a different set of numbers." Someone already has the data independently, sourced from somewhere else. They came to confirm Toman's version matches theirs — or to find out exactly where and why it differs.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They left nothing," Toman says. "No name, no institutional mark, no record of arrival I could point to. I couldn't tell you what they looked like well enough to describe them to someone else." He turns a stylus in his fingers, staring at the desk. "They came in, they listened, they left. The algae-smell from the sluice tanks was stronger that morning — I remember that more clearly than I remember them." Whoever visited understood how to move through a place without accumulating a presence. The absence of trace is itself the trace.`;
      } else {
        G.lastResult = `"They offered institutional backing," Toman says. "A research fellowship, publication support, legal protection. Everything I've needed for fourteen months." He looks at the lamp on the worktable, not at you. "I almost took it. I had the agreement in front of me." He pauses. "The terms required transferring data ownership to an unnamed oversight body before the fellowship would be finalized. I read the fine print twice to be sure I was reading it correctly." Someone tried to acquire the suppressed data through a fabricated rescue operation. The terms were the tell.`;
      }

      G.lastResult += ` Toman doesn't know who they were. But they knew everything about his situation.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('Rival-adjacent operative visited Toman Iceveil 2 months ago — reconnaissance, expert knowledge, or acquisition attempt', 'complication', `glasswake-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // TYPE: INFORMATION — WORLD COLOR VIGNETTE
  {
    label: "The sluice channels were built to move water and light simultaneously.",
    tags: ['WorldColor', 'Atmosphere', 'Stage1'],
    xpReward: 38,
    failResult: function() {
      addNarration('', 'A scanning gate cycles open at the end of the quarantine corridor and a containment warden in white-rimmed silvers steps through, clipboard ready. You drift back toward the observation gallery before the breach-protocol bell can name you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
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
    label: "Toman's shard samples show a reaction profile that shouldn't be possible under known material science.",
    tags: ['Information', 'ArchetypeGate', 'Stage1'],
    xpReward: 72,
    failResult: function() {
      addNarration('', 'A scanning gate cycles open at the end of the quarantine corridor and a containment warden in white-rimmed silvers steps through, clipboard ready. You drift back toward the observation gallery before the breach-protocol bell can name you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const family = typeof getArchetypeFamily === 'function' ? getArchetypeFamily(G.archetype) : '';
      if (family !== 'Craft-heavy') {
        G.lastResult = `Toman's shard samples react to reagent exposure in ways he can't fully explain — the results fall outside his reference framework, and he knows it. He points at the measurement column in his notebook: the output values don't follow the curve that material science would predict. Something is happening in the reaction that the standard model doesn't account for. The specific mechanism is beyond what you can characterize from here, but the anomaly itself is unmistakable. These samples are doing something they shouldn't be able to do.`;
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
    label: "The committee's composition changed three years ago. A majority arrived in the same cycle.",
    tags: ['Information', 'Background', 'Stage1'],
    xpReward: 55,
    failResult: function() {
      addNarration('', 'A scanning gate cycles open at the end of the quarantine corridor and a containment warden in white-rimmed silvers steps through, clipboard ready. You drift back toward the observation gallery before the breach-protocol bell can name you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
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
    label: "The archive holds founding-generation shard records. They contradict the suppression rationale.",
    tags: ['Information', 'Risky', 'Records', 'Stage1'],
    xpReward: 68,
    failResult: function() {
      addNarration('', 'A scanning gate cycles open at the end of the quarantine corridor and a containment warden in white-rimmed silvers steps through, clipboard ready. You drift back toward the observation gallery before the breach-protocol bell can name you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading founding generation shard records');
      const result = rollD20('wits', (G.skills.wits || 0));
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
    label: "The committee's correspondence names a specific study outcome they needed prevented.",
    tags: ['Information', 'Bold', 'Records', 'Stage1'],
    xpReward: 78,
    failResult: function() {
      addNarration('', 'A scanning gate cycles open at the end of the quarantine corridor and a containment warden in white-rimmed silvers steps through, clipboard ready. You drift back toward the observation gallery before the breach-protocol bell can name you.', (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'reading committee-authority correspondence');
      const result = rollD20('finesse', (G.skills.finesse || 0));
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
    label: "The shard field is larger now than when the settlement was founded. The shards grow.",
    tags: ['Information', 'Safe', 'Lore', 'Stage1'],
    xpReward: 52,
    failResult: function() {
      addNarration('', "The survey maps Toman references are in the research annex during formal hours — publicly accessible, not restricted. The annex is closed this afternoon for scheduled maintenance. The water-clock chime marks the hour from somewhere further along the sluice channel. The comparative maps showing the original field boundaries and the current ones are posted in the shard gallery's back room, available during gallery hours, no endorsement required.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
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
    label: "Two members who voted against the suppression still attend. They take notes on everything.",
    tags: ['Information', 'Risky', 'NPC', 'Stage1'],
    xpReward: 65,
    failResult: function() {
      addNarration('', "Arven and Missa are visible in the committee chamber from the public gallery — two figures at the far end of the long table, notebooks open, pens moving. The session ends in forty minutes. The corridor outside the chamber is where people linger after adjournment, away from the formal record. They carry their own notebooks, not the committee's standard forms. Whatever they document, it lives outside the committee minutes. The corridor at session end is the window.", (G && G.lastResultType) || 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'meeting the dissenting committee members');
      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 11) {
        G.lastResult = `Arven and Missa have attended every committee session since the suppression vote and objected in the record to every decision made by the majority bloc. Their notes are comprehensive — every procedural motion, every stated rationale, every dissent. "We document because we know the official minutes are edited before filing," Arven says. He doesn't say it with particular emotion. "The edited minutes are what the record shows. Our notes show what happened in the room." Two years of parallel documentation, the committee's version and the accurate version sitting in different places.`;
        if (!G.flags) G.flags = {};
        G.flags.met_dissenting_committee = true;
        addJournal('Dissenting committee members Arven and Missa: 2 years of parallel documentation — their notes vs. edited official minutes', 'evidence', `glasswake-dissent-${G.dayCount}`);
      } else {
        G.lastResult = `The two dissenting members are in the chamber for the current committee session — both visible from the public gallery, at the far end of the long table, notebooks open. They write in their own notebooks, not the committee's standard forms; whatever they document stays in their possession rather than entering the official record. The session ends in forty minutes. The corridor outside the chamber smells of floor wax and old reed matting. That's where people linger after adjournment, away from the formal record.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

{
  label: 'The notice board has recent postings.',
  tags: ['social'],
  xpReward: 5,
  failResult: function() {
    addNarration('', "The notice board near the water-clock tower is crowded with overlapping postings, several layers deep at the center. The newest sheet is pinned at the corner where the reed-thatch overhang keeps the mist off — dry paper, recent ink. Nothing useful surfaces today. The morning crier covers the settlement at the second water-clock chime; her route ends near the canal gate where the sluice authority keeps its tally board.", (G && G.lastResultType) || 'failure');
    loadStageChoices(G.location);
  },
  fn: function() {
    var key = 'rumor_drawn_' + G.location + '_' + G.dayCount;
    if (G.flags[key]) {
      G.lastResult = 'The board has nothing new since this morning. A sluice maintenance schedule and a committee session date from last week still occupy the center column, their ink dry and their corners lifting at the edges where the estuary mist has reached them. The reed-thatch overhang keeps the newer postings dry, but there are none today. The morning crier covers the commune at the second water-clock chime if the board is light.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
}
];

// ── ARCHETYPE-EXCLUSIVE CHOICES ──────────────────────────────
GLASSWAKE_COMMUNE_STAGE1_ENRICHED_CHOICES.push(

  // COMBAT ×2 — Harvest Circle guard deployment
  {
    id: 'glasswake_arch_combat_1',
    label: 'The Harvest Circle committee moved its guards to the archive, away from the estuary path.',
    skill: 'might',
    archetypeGroup: 'combat',
    tags: ['Security', 'Archive', 'Observation'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The Harvest Circle administrative committee has repositioned its security personnel from the estuary research path — where they have been posted for years — to the document archive at the commune center. The redeployment happened without announcement. The archive holds the shard study records; the estuary path leads to where Toman Iceveil works in the evenings. Someone decided protecting the documents mattered more than managing the researcher.');
      addJournal('Harvest Circle security redeployed from estuary path to document archive — protecting research records, not the researcher.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The committee security guard steps into the path before you reach the archive entrance and holds position. He is doing his job correctly. The estuary research path is now unguarded, which means Toman Iceveil\'s evening workspace is accessible without the security presence that used to monitor it.' }
  },

  {
    id: 'glasswake_arch_combat_2',
    label: 'Two researchers were escorted from the commune last month. No formal expulsion record exists.',
    skill: 'might',
    archetypeGroup: 'combat',
    tags: ['Security', 'Expulsion', 'Records'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'Two senior researchers departed Glasswake last month with committee security personnel present at their departure — witnessed by three commune members and the waystation log keeper. No formal expulsion proceeding appears in the commune record. No appeal was filed because no formal action was recorded. The escorts were present, the departure was coerced, and the mechanism that would allow a challenge was bypassed by ensuring no institutional record of the action existed. Someone was removed without being removed on paper.');
      addJournal('Two researchers escorted out by committee security — no formal expulsion record, departure coerced outside institutional process.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The committee secretary declines to discuss personnel departures without a formal inquiry filing. The waystation log keeper witnessed both departures and is not affiliated with the committee; her account is available as a personal observation, not an institutional record.' }
  },

  // MAGIC ×2 — soil ward disruption patterns
  {
    id: 'glasswake_arch_magic_1',
    label: 'The shard research wards were tuned down. The suppression level is administrative, not safety.',
    skill: 'spirit',
    archetypeGroup: 'magic',
    tags: ['Magic', 'Wards', 'Research'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The research containment wards on the shard study annex have been tuned to a lower attenuation level than the commune safety standard requires — the ward is operating at 40% of the rated threshold, not the 80% minimum for active shard work. The tuning is not a safety failure; it is an administrative decision. At 40% attenuation, arcane observation of ward activity from outside the annex is possible. Someone adjusted the wards to allow external monitoring of the research space without the researchers knowing.');
      addJournal('Shard research wards tuned to 40% of safety minimum — deliberately allows external arcane monitoring of the research space.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The research annex ward inspection requires a committee authorization that takes two days to process. The public ward registration board outside the annex door lists the current attenuation rating alongside the required standard — the gap between them is visible without authorization.' }
  },

  {
    id: 'glasswake_arch_magic_2',
    label: 'The amplification data Toman found — someone added a dampening ward to the estuary site.',
    skill: 'spirit',
    archetypeGroup: 'magic',
    tags: ['Magic', 'Site', 'Evidence'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The estuary shard sampling site has a new dampening ward installed over the primary measurement point — the location where Toman first observed the amplification effect. The ward reduces arcane signal output from the site to near baseline, making it appear quiescent in any standard survey. The installation is recent: the ward inscription lacks the weathering of the surrounding stone. Someone installed a ward specifically designed to conceal the phenomenon that Toman\'s research was documenting.');
      addJournal('Estuary sampling site: new dampening ward over primary measurement point — installed to conceal the amplification effect from survey.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The ward installation is at the water\'s edge and the tide is in — the inscription is partially submerged. The secondary sampling point thirty meters upstream carries no ward and shows the unmasked baseline reading that would confirm the contrast with the suppressed primary site.' }
  },

  // STEALTH ×2 — crop allocation route changes
  {
    id: 'glasswake_arch_stealth_1',
    label: 'The committee uses a messenger who does not appear on any commune staff record.',
    skill: 'finesse',
    archetypeGroup: 'stealth',
    tags: ['Messenger', 'Records', 'Surveillance'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The Harvest Circle administrative committee uses a regular messenger for its inter-commune communications — a young man who travels the estuary path at dawn on the second and fifth day of each week. He carries sealed packets, does not stop at the waystation, and is not listed in any commune staff or service registry. An unregistered messenger running a regular schedule for institutional communications means the committee is routing correspondence outside the standard record system. The packets go somewhere specific that the committee does not want to appear in public logs.');
      addJournal('Committee uses unregistered messenger on fixed schedule — institutional correspondence routed outside public record system.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The messenger clocks your attention on the path and varies his route — takes the long way around the estuary inlet instead of the direct path. He is trained for observation avoidance. The second-day schedule still holds; the alternative route passes the north waystation where the keeper has noted his unusual regularity.' }
  },

  {
    id: 'glasswake_arch_stealth_2',
    label: 'The restricted archive has a second entrance. The committee uses it alone.',
    skill: 'finesse',
    archetypeGroup: 'stealth',
    tags: ['Archive', 'Access', 'Gap'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The restricted research archive has a secondary entrance on its north face — a maintenance access point, fitted with the same committee key series as the administrative offices, invisible from the main research hall approach. The wear pattern on the lock indicates regular recent use; the maintenance log for the archive does not record any maintenance work in the past three months. Committee members can enter the restricted archive without appearing in the public access log. The research suppression operation has an unsupervised door.');
      addJournal('Restricted archive: second entrance with committee key access, not in maintenance log, regularly used outside public record.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The north maintenance entrance is visible from the lane but currently has a fresh wax seal on the lock — someone sealed it in the past day or two, which itself is worth noting. The main archive access log in the reading room will show when the secondary entrance was last recorded unsealed.' }
  },

  // SUPPORT ×2 — harvester family allocation stress
  {
    id: 'glasswake_arch_support_1',
    label: 'The harvester families are petitioning the committee less. They stopped expecting it to help.',
    skill: 'charm',
    archetypeGroup: 'support',
    tags: ['Social', 'Trust', 'Erosion'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'Glasswake\'s harvester families have always brought allocation disputes to the commune committee — it was the structural mechanism for fairness. In the past two months, petition filings from harvester families have dropped by two-thirds. The families are not resolving their disputes privately; they are not filing them at all. The withdrawal indicates that the community has concluded the committee is no longer a resource for their interests. That conclusion means the institutional trust structure has collapsed at the household level.');
      addJournal('Harvester family petitions down two-thirds in 2 months — families stopped filing, not resolving: institutional trust collapsed.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The harvester families are not hostile to the question but they are tired of outside interest that does not produce results. The commune clerk who handles petition filings keeps a monthly count for administrative purposes — that count for the past six months is public record.' }
  },

  {
    id: 'glasswake_arch_support_2',
    label: 'A senior researcher backed the committee\'s suppression publicly. His colleagues stopped trusting him.',
    skill: 'charm',
    archetypeGroup: 'support',
    tags: ['Social', 'Defection', 'Network'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'Senior Researcher Davin Marsh issued a public statement supporting the committee\'s administrative review classification of the shard amplification studies. The statement was voluntary and used committee framing. His colleagues in the research annex have not spoken to him since. The research network — which depended on peer trust for data sharing — has fragmented along that line. Davin Marsh still works in the annex. He works alone now, in a room that used to be collaborative. Someone got a public endorsement and destroyed a research community\'s functioning in exchange for it.');
      addJournal('Researcher Marsh endorsed committee suppression — colleagues withdrew trust, research network fractured along the endorsement line.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'Davin Marsh is in the annex and knows what a direct question about his statement means — he will give you the committee line clearly and briefly. Toman Iceveil saw what happened from the outside and has a more complete picture of what Marsh was offered.' }
  }

);

window.GLASSWAKE_COMMUNE_STAGE1_ENRICHED_CHOICES = GLASSWAKE_COMMUNE_STAGE1_ENRICHED_CHOICES;
