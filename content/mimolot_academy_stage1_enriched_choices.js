/**
 * MIMOLOT ACADEMY STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to knowledge, scholarship, and restricted truth
 * Generated for: Knowledge hoarding vs public truth, preservation vs dangerous revelation, authority vs questioning
 * Each choice: 65-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

const MIMOLOT_ACADEMY_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. SENIOR LIBRARIAN: RESEARCH RESTRICTIONS TIGHTENING
  {
    label: "Interview the senior librarian about recent research access changes — why are certain research topics being restricted, and what authority is imposing these restrictions?",
    tags: ['Investigation', 'NPC', 'Observation', 'Knowledge', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'gathering research restriction intelligence');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Theron sets his pen down. "The restriction decree didn't come from the scholarly council. It came through administrative channels — someone claiming knowledge security." He says the words like they taste bad. "What's being secured is not knowledge. Scholars who approach certain topics get redirected. Those who push are reassigned to cataloging." He taps the desk once. "We can't explain the boundaries to each other because explaining them would cross them."`;
        G.stageProgress[1]++;
        addJournal('Librarian flagged unauthorized research restriction authority', 'evidence', `mimolot-librarian-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Theron straightens and his voice drops into formal register. "These restrictions exist to protect the integrity of scholarship. This is not a subject I discuss with visitors." He closes the ledger on his desk and rises. By the time you reach the corridor, he's already at the archive guardian's desk. Your name goes into a log.`;
        G.worldClocks.pressure++;
        addJournal('Archive staff now aware of your inquiry', 'complication', `mimolot-librarian-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Theron acknowledges the access changes. Administrative efficiency, he says — some reorganization of priority materials. He describes the mechanism without describing its purpose. Two of his answers don't align with each other. He notices you noticing, and moves to close the conversation.`;
        addJournal('Librarian confirmed research access changes but details incomplete', 'evidence', `mimolot-librarian-modified-${G.dayCount}`);
      } else {
        G.lastResult = `Theron gives back the standard account: research priorities are managed centrally, access is tiered by standing, everything is as it should be. He answers every question asked and none of the answers contain anything. The chalk dust on his sleeve catches the lamp light as he adjusts the ledger. He's given this account before, to other visitors, and he'll give it again. He's practiced every word of it.`;
        addJournal('Research restriction inquiry inconclusive', 'evidence', `mimolot-librarian-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. RESEARCH SCHOLAR: RESEARCH SUPPRESSION
  {
    label: "Meet with active researchers to find out what research is being suppressed — what questions have become forbidden, and who decided they're forbidden?",
    tags: ['Investigation', 'NPC', 'Records', 'Research', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering research suppression');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Dalmir pulls the study door half-closed before he speaks. Scholars working on regional corruption analysis have been reassigned — their projects reclassified as outside institutional scope. Those tracing economic power structures were told their work "does not align with current priorities." One colleague studying historical reform precedent now handles only provenance cataloging. "Nobody loses their post," Dalmir says. "They just stop being able to work. There's a difference between the two that the administration is careful to maintain."`;
        G.stageProgress[1]++;
        addJournal('Scholar revealed systematic research topic suppression', 'evidence', `mimolot-scholar-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Dalmir goes still the moment you name the topic. "Research access is an internal institutional matter." He says it the way someone says a sentence they've rehearsed in case they needed it. He doesn't look at you again. The conversation ends. Later, a junior clerk delivers a notice to your temporary quarters — your presence on the research floors has been logged.`;
        G.worldClocks.watchfulness++;
        addJournal('Scholar filed notice of your suppression inquiry', 'complication', `mimolot-scholar-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Three scholars confirm that certain directions are being discouraged — one calls it "a narrowing of institutional focus." None will name which topics. The conversation stays in that register: general enough to be defensible, specific enough to confirm there's a shape to what's missing. You leave with the outline of something but not its dimensions.`;
        addJournal('Scholars confirmed research discouragement patterns', 'evidence', `mimolot-scholar-discouraged-${G.dayCount}`);
      } else {
        G.lastResult = `The scholars in the upper reading room are polite and brief. Each conversation ends before it arrives anywhere. They're not hostile — they're careful, and there's a real difference between the two. One keeps a finger in his place in a bound volume the whole time you're speaking, as if the conversation is an interruption he intends to outlast. An hour spent here yields nothing but the particular quality of their silence — present, specific, practiced.`;
        addJournal('Research suppression inquiry inconclusive', 'evidence', `mimolot-scholar-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. ARCHIVE GUARDIAN: SEALED SECTIONS EXPANDED
  {
    label: "Investigate the sealed archive sections — what knowledge is being locked away, and why are restricted areas expanding?",
    tags: ['Investigation', 'NPC', 'Archives', 'Secrets', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'mapping knowledge restriction');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Sevik walks you to the boundary of the eastern stack and keeps his voice down. The sealed sections have expanded twice in the past year. Documents senior scholars accessed for decades moved into restricted storage without faculty review. "The classification is always 'institutional security' or 'sensitive material,'" he says, tracing a line on the shelf where materials used to be. "But read what's gone. Past administrative failures. Records of overreach. Every document that would tell you this institution made mistakes is now behind a door that only four people can open."`;
        G.stageProgress[1]++;
        addJournal('Guardian revealed systematic knowledge lockdown expansion', 'evidence', `mimolot-guardian-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sevik's expression closes like a door. "Restricted materials exist under institutional mandate. Your presence in this section without authorization is a procedural matter." He does not raise his voice. He doesn't need to. By the next morning, the reading room desk clerk informs you that your temporary archive privileges have been suspended pending review.`;
        addJournal('Archive guardian blocking archive access', 'complication', `mimolot-guardian-silent-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Sevik confirms the expansion. Document preservation, he says — humidity control, fragile materials requiring restricted handling conditions. It's a reasonable explanation stated without hesitation, which is the problem. He had the answer ready before the question finished. You note which sections expanded most recently. He watches you note it.`;
        addJournal('Guardian confirmed archive expansion but explanation questionable', 'evidence', `mimolot-guardian-expanding-${G.dayCount}`);
      } else {
        G.lastResult = `Sevik describes archival security protocols at length — access tiers, material handling procedures, the physical constraints of the building, humidity requirements for the eastern stack. He's thorough and technically accurate on every point he raises. None of it touches the question you asked. The lamp on his desk illuminates a shelf gap where materials used to be. He doesn't glance at it once. You leave understanding every procedure and nothing about who changed them or when.`;
        addJournal('Archive expansion inquiry inconclusive', 'evidence', `mimolot-guardian-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. KNOWLEDGE ARCHIVIST: DOCUMENTATION BEING ALTERED
  {
    label: "Track historical documentation with the knowledge archivist — are scholarly records being changed, or is the historical record being rewritten?",
    tags: ['Investigation', 'NPC', 'History', 'Records', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing historical record corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Kensa lays two versions of the same document side by side — current and manuscript original — and points at the differences without speaking first. In the current version, an administrative overreach from forty years ago is described as a "procedural adjustment." The original calls it a sanction, names the officials, describes the harm. "The changes preserve surface consistency," she says. "A casual reader won't catch it. But the substance is gone." She's been documenting the alterations for four months. She has a list.`;
        G.stageProgress[1]++;
        addJournal('Archivist revealed systematic historical record falsification', 'evidence', `mimolot-archivist-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kensa crosses her arms and steps back from the document she was examining. "Archive methodology is not a subject I discuss with external parties." Her tone is neutral, deliberate. She gathers the documents from the table and returns them to their case. You have misread the approach — she needed longer to trust you, and now the door is closed. The pressure counter increments. Someone else will be watching the archive now.`;
        G.worldClocks.pressure++;
        addJournal('Knowledge archivist blocking historical record access', 'complication', `mimolot-archivist-blocked-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Kensa grants access to the current-edition records. Working through the administrative history, you find three passages that read awkwardly — phrasing that doesn't match the period's conventions, transitions that skip steps that should be documented. Something has been adjusted, but confirming it requires a manuscript copy for direct comparison. Those are in the restricted section.`;
        addJournal('Historical records show signs of revision patterns', 'evidence', `mimolot-archivist-revised-${G.dayCount}`);
      } else {
        G.lastResult = `The historical records are well-organized and extensive. Kensa points you to the relevant administrative period and leaves you to work. Two hours in, the documents appear complete — clean entries, consistent dates, proper notation. Whether they are complete is a different question entirely. Completeness requires something to compare them against, and the manuscript originals are three floors up behind a lock that requires separate authorization. The records look right. That's all you can determine from here.`;
        addJournal('Historical record verification inconclusive', 'evidence', `mimolot-archivist-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. STUDENT ADMINISTRATOR: ENROLLMENT RESTRICTIONS
  {
    label: "Review student enrollment patterns with the administrator — are certain students being prevented from studying specific subjects, or is scholarship access being restricted by background?",
    tags: ['Investigation', 'NPC', 'Students', 'Access', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading enrollment manipulation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Maris pulls the enrollment ledger and speaks with it open between you. Students from lower institutional standing are being routed toward service and cataloging tracks — the recommendation forms cite "aptitude alignment." Those who showed strong critical methodology in their early assessments are not receiving advanced placement in research programs. "They leave here thinking it was their choice," she says, running her finger along a column of notations. "The steering is in the guidance sessions. By the time a student knows their options, the options have already been shaped for them."`;
        G.stageProgress[1]++;
        addJournal('Administrator revealed systematic student enrollment restriction', 'evidence', `mimolot-admin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Maris closes the ledger before you finish the question. "Student records are protected under the Academy's confidentiality charter. I have no standing to discuss enrollment patterns with a visitor." She says it evenly, without particular hostility — it's simply the correct procedure and she's following it. Your approach was too direct. The ledger goes into a drawer. A clerk near the window has been listening.`;
        G.worldClocks.watchfulness++;
        addJournal('Student administrator alerted to enrollment inquiry', 'complication', `mimolot-admin-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Maris allows access to aggregate enrollment figures. The patterns are there — concentration of certain student profiles in service tracks, gaps in advanced research placement by background. Whether this represents steering or student preference can't be established from summary data. The individual guidance records that would answer it are behind a separate authorization tier you don't have.`;
        addJournal('Enrollment patterns show potential steering', 'evidence', `mimolot-admin-steered-${G.dayCount}`);
      } else {
        G.lastResult = `The enrollment figures are available in the public-facing summary registers — clean columns, discipline totals by year, track distribution broken out by entry cohort. Students choose different tracks for many reasons: aptitude, preference, circumstance, recommendation. The summary data shows distribution across disciplines but nothing about the guidance sessions that produced it. A pattern exists in the numbers. What generated the pattern is not in the registers. That answer is in a separate record tier.`;
        addJournal('Student enrollment inquiry inconclusive', 'evidence', `mimolot-admin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. RESTRICTION KEEPER: FORBIDDEN KNOWLEDGE CATALOGED
  {
    label: "Interview the restriction keeper about classified materials — what knowledge has been declared too dangerous to share, and who made those declarations?",
    tags: ['Investigation', 'NPC', 'Classification', 'Forbidden', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'uncovering danger justifications');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Vorin speaks toward the shelf rather than at you. He catalogs classifications for a living, and lately the categories have been expanding in one direction. Documentation of administrative failures: "dangerous to institutional stability." Records of overreach: "dangerous to public confidence." Precedent for reform: "dangerous to social order." He names each category like a man reciting a list that disturbs him. "Everything classified in the last eighteen months has one thing in common," he says. "It would be useful to someone challenging the current arrangement."`;
        G.stageProgress[1]++;
        addJournal('Keeper revealed weaponized knowledge classification system', 'evidence', `mimolot-keeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Vorin stops writing. "The classification status of restricted materials is itself a restricted matter." He doesn't look up from his desk. "Your questions go beyond what your standing permits." He makes a notation in the log at his elbow. You don't see what it says. By the time you're back in the corridor, a junior administrator is crossing the hall toward the senior offices with a sealed note.`;
        G.worldClocks.isolation++;
        addJournal('Restriction keeper reported your classification inquiry', 'complication', `mimolot-keeper-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Vorin confirms the classifications exist and acknowledges the category labels. The criteria used to assign them, he says, are determined at the senior administrative level and not within his purview to explain. He can tell you what something has been labeled. He won't tell you who did the labeling or by what standard.`;
        addJournal('Keeper confirmed materials classified as dangerous knowledge', 'evidence', `mimolot-keeper-classified-${G.dayCount}`);
      } else {
        G.lastResult = `Vorin explains the classification system as it's written: materials deemed potentially harmful to public order or institutional function are reviewed by senior staff and assigned restricted status. He recites it the way a man reads from a notice he's posted so many times he no longer looks at the paper. The account is accurate and contains nothing. What the system has actually been used to accomplish in the past eighteen months stays behind the same closed door his explanation was designed to keep you from reaching.`;
        addJournal('Knowledge classification inquiry inconclusive', 'evidence', `mimolot-keeper-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. CURATION MASTER: COLLECTION BIAS SYSTEMATIC
  {
    label: "Study how the Academy's collection has been curated — are certain perspectives being excluded, or is knowledge collection being shaped by ideological bias?",
    tags: ['Investigation', 'NPC', 'Curation', 'Bias', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading collection bias');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Aldis spreads the acquisition ledgers across the table and shows you the line where things changed. For twenty years, the collection policy was comprehensive — anything relevant to the fields, regardless of its conclusions. Eighteen months ago, the acquisition pace dropped and the range narrowed. Works questioning power structures: no new purchases. Historical texts documenting institutional failure: "out of print, unavailable." Critical methodology texts: under review, acquisition pending indefinitely. "The collection looks the same to someone who hasn't used it long," Aldis says. "But the new arrivals only point one direction."`;
        G.stageProgress[1]++;
        addJournal('Curator revealed systematic ideological bias in collection development', 'evidence', `mimolot-curator-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Aldis plants both hands on the acquisition ledger and does not move them. "Acquisition policy is an internal matter determined by the faculty council. Your interest in our collection decisions is not appropriate for this conversation." You've pushed at the wrong angle. He's not hostile — he's institutional, which is more durable. The ledgers go back into their cabinet and the key goes into his coat.`;
        G.worldClocks.watchfulness++;
        addJournal('Curation master offended by collection bias inquiry', 'complication', `mimolot-curator-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Aldis allows access to the public-facing acquisition summaries. Working through the recent entries, the gaps are visible: whole subject areas where the ledger goes quiet in the past eighteen months. He watches you read without commenting. Whether the gaps reflect budget constraints or curation decisions, the summary data doesn't distinguish between them.`;
        addJournal('Collection development shows pattern gaps in critical perspectives', 'evidence', `mimolot-curator-gaps-${G.dayCount}`);
      } else {
        G.lastResult = `The acquisition registers are available at the reference desk — decades of entries, subject areas organized by faculty designation, each purchase annotated with donor or budget line. Gaps exist in every collection: publication delays, budget cycles, specialist focus. The recent gaps might be any of those things. Without the acquisition criteria documents that explain the current selection policy, the pattern stays ambiguous. Those criteria documents are held by the faculty council, which is itself the body that would need to authorize your access to them.`;
        addJournal('Collection bias analysis inconclusive', 'evidence', `mimolot-curator-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. VERIFICATION SCRIBE: TRUTH VERIFICATION COMPROMISED
  {
    label: "Meet with verification scribes about their process — has truth verification become corrupted, or are scribes being pressured to approve false documentation?",
    tags: ['Investigation', 'NPC', 'Verification', 'Truth', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing truth verification corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The scribe who talks to you — Theron, not the senior one — keeps his voice below the ambient noise of the scriptorium floor. Three scribes have been reassigned in the past year. All three refused to approve documentation with discrepancies they had flagged. "We're told 'institutional needs sometimes require flexibility with detail,'" he says, and the phrase has the flatness of something repeated at him until he memorized it against his will. "We certify documents as accurate. We're now being asked to certify documents we know are not." His pen is still in his hand. He hasn't written anything in ten minutes.`;
        G.stageProgress[1]++;
        addJournal('Scribe revealed truth verification system weaponization', 'evidence', `mimolot-scribe-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The senior scribe sets her quill down with precision. "The verification process of this Academy represents its foundational scholarly guarantee. Your implication is an insult to this institution and to everyone working in this hall." She does not shout. She reaches for a complaint form — a preprinted document, the kind kept ready for exactly this. Your name goes into it. A copy will reach the faculty council before evening.`;
        G.worldClocks.reverence++;
        addJournal('Verification scribe filed complaint about integrity inquiry', 'complication', `mimolot-scribe-hostile-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Two scribes acknowledge that standards have shifted — one describes it as "increased administrative input into documentation decisions." Neither will name a specific document or a specific approval they had concerns about. They're describing the general shape of a problem without locating it anywhere particular, which is the safest way to describe it.`;
        addJournal('Scribes confirmed pressure on verification standards', 'evidence', `mimolot-scribe-pressure-${G.dayCount}`);
      } else {
        G.lastResult = `The scribes on the floor keep working as you move through the hall. Quills against parchment, the smell of fresh ink and chalk dust from the tally boards along the wall. The ones you approach answer briefly and return to their work. Their caution is practiced — not rude, just closed in a specific, consistent way. Whatever happens in this room stays in this room. Nobody holds eye contact when the word "verification" comes up. That response is too uniform to be coincidence.`;
        addJournal('Verification integrity inquiry inconclusive', 'evidence', `mimolot-scribe-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. LORE TIER 1: ACADEMIC PRECEDENT ANALYSIS
  {
    label: "Study academic precedent — has the interpretive framework for analyzing truth been deliberately changed to make certain conclusions invalid?",
    tags: ['Investigation', 'Lore', 'Precedent', 'Framework', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'academic framework analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The change is in the footnotes. Interpretive criteria that governed evidence evaluation for sixty years have been quietly reclassified — the methodology that permitted critical analysis of institutional decisions is now listed as "insufficiently rigorous" in the current standards appendix. The burden of proof has been inverted: where authority once had to justify its decisions, the framework now requires challengers to disprove the decision at a standard that no available evidence can satisfy. The revision is dated fourteen months ago. It has a single signatory from the administrative council.`;
        G.stageProgress[1]++;
        addJournal('Precedent analysis revealed framework manipulation', 'evidence', `mimolot-precedent-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Two senior scholars approach you in the reading room. They've noticed what you've been working from. Your interpretive framework, they explain, references criteria superseded by the current standards appendix. The conversation is collegial and correct. They suggest alternate sources. By the end of it, your research thread has been politely but thoroughly redirected, and the scholars have seen exactly what you were looking at.`;
        G.worldClocks.watchfulness++;
        addJournal('Senior scholars questioned your analytical framework', 'complication', `mimolot-precedent-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Working through the precedent documents, you find the framework revisions — they're documented clearly enough. Whether the changes represent scholarly evolution or deliberate manipulation requires something to compare them against: the evidence they're now being used to evaluate, and what results they produce. The framework is a tool. You haven't yet seen what it's been used to do.`;
        addJournal('Precedent shows interpretive framework shifts', 'evidence', `mimolot-precedent-shifted-${G.dayCount}`);
      } else {
        G.lastResult = `The interpretive framework documents are available in the methodology section — dense, technically specific, the kind of reading that requires time and a fluency in academic legal convention to evaluate properly. The pages smell faintly of the binding glue used when the revised edition was reissued. Revisions exist: that much is confirmed. What the revisions changed, and who authorized them, requires cross-referencing across three prior period editions. That's a different day's work, and it will need to be a careful one.`;
        addJournal('Academic precedent analysis inconclusive', 'evidence', `mimolot-precedent-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. ARCANA TIER 2: MAGICAL KNOWLEDGE SUPPRESSION
  {
    label: "Investigate magical research suppression — what arcane knowledge is being locked away, and why are certain spells or magical theories restricted?",
    tags: ['Investigation', 'Arcana', 'Magical', 'Power', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing arcane knowledge suppression');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `In the restricted classification log, the pattern holds across magical research: the texts reclassified as dangerous in the past year are specifically those covering independent arcane operation — spells requiring no institutional channeling, theories that expand what a practitioner can do without Academy-authorized equipment or oversight. An arcanist you find in the corner of the lower study speaks without looking up from her work. "The restricted texts are the ones that would let you work without us. Someone noticed that."`;
        G.stageProgress[1]++;
        addJournal('Arcane analysis revealed magical knowledge weaponization', 'evidence', `mimolot-arcana-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You're two hours into the arcane classification records when a council representative arrives at the reading room. Your access to the magical research archives has been elevated to "supervised" status — meaning every document request goes through a review desk before approval. The representative is pleasant about it. Your access to the broader arcane holdings is effectively halved before you leave the room.`;
        G.worldClocks.pressure++;
        addJournal('Arcane council restricted your research access', 'complication', `mimolot-arcana-blocked-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The arcane research catalogue is accessible through the general reading room. Scanning recent classification changes, a cluster of restricted entries appears in the autonomy-practice section — texts covering independent arcane operation, unsupervised channeling techniques, practitioner-only methodology. The restrictions are recent. What the restricted texts actually contain is behind the classification wall.`;
        addJournal('Arcane knowledge shows autonomy-related restrictions', 'evidence', `mimolot-arcana-restricted-${G.dayCount}`);
      } else {
        G.lastResult = `The arcane research section is organized by classification tier, and the current-tier materials are available without special clearance. Working through what's there, the gaps are readable by shape — subjects where the catalogue entries end abruptly, where the listed texts are all from more than two years ago. Arcane fluency would let you read more from those gaps. You can see them but can't interpret what's missing.`;
        addJournal('Arcane suppression analysis inconclusive', 'evidence', `mimolot-arcana-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. INVESTIGATION TIER 1: INQUIRY PATTERNS MONITORED
  {
    label: "Track which scholars are being monitored — are researchers being watched based on their inquiry topics, or is scholarly curiosity itself being controlled?",
    tags: ['Investigation', 'Investigation', 'Monitoring', 'Control', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'researcher surveillance mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The administrative access logs aren't locked — they're just stored in a section visitors rarely use. Working through three months of entries: scholars accessing materials on institutional history are flagged with a secondary notation. Those who request documents related to administrative decisions receive a follow-up review entry within twenty-four hours. One name appears in reassignment records six weeks after a cluster of flagged document requests. The monitoring doesn't announce itself. It just produces consequences, quietly, weeks later.`;
        G.stageProgress[1]++;
        addJournal('Investigation analysis revealed systematic scholar surveillance', 'evidence', `mimolot-investigation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `An administrator arrives at your reading desk before you've finished pulling the second set of access logs. They know exactly which documents you've been requesting. "Your research pattern has triggered a review," they say — not hostile, procedural. Further access to administrative logs is suspended pending a clarification interview. You've confirmed the monitoring exists by becoming its subject.`;
        G.worldClocks.pressure++;
        addJournal('Administration directly warned you against monitoring inquiry', 'complication', `mimolot-investigation-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Working through the access records available at the general desk, correlations appear: document requests in certain subject areas are followed by additional log entries that standard library access doesn't explain. The pattern is visible. What it links to at the administrative end — who receives those secondary notations, what they do with them — that part isn't in the public-facing records.`;
        addJournal('Monitoring patterns show topic-based scrutiny correlation', 'evidence', `mimolot-investigation-monitored-${G.dayCount}`);
      } else {
        G.lastResult = `Administrative access records are maintained by the registrar's office, not the library — a detail the desk clerk explains with the practiced patience of someone who redirects this question regularly. Access log data requires a faculty standing request to review. Without that standing, the records showing which scholars are flagged and for what subject areas are simply unavailable. The right door has been located. The key requires a faculty endorsement, which requires a faculty relationship, which requires time that the investigation hasn't yet produced.`;
        addJournal('Scholar monitoring analysis inconclusive', 'evidence', `mimolot-investigation-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. INSIGHT TIER 2: INTELLECTUAL AUTONOMY ERODED
  {
    label: "Map the intellectual climate — are scholars losing confidence in their ability to think independently, or is intellectual autonomy being systematically suppressed?",
    tags: ['Investigation', 'Insight', 'Autonomy', 'Freedom', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'mapping intellectual autonomy erosion');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `An older scholar in the upper study speaks while keeping his eyes on his manuscript. "Twenty years ago, someone would defend a contested interpretation in the refectory and three colleagues would shout back at them before the soup went cold." He turns a page. "Now we publish peer-reviewed consensus and nobody disputes it in public." He's not describing a golden age — he's describing what went away. The scholars moving through the reading hall below don't look up when you pass. They've learned the shape of safe research and they work inside it.`;
        G.stageProgress[1]++;
        addJournal('Intellectual autonomy analysis revealed systematic thought suppression', 'evidence', `mimolot-autonomy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You raise the question of intellectual freedom with a scholar in the second-floor hall. They listen to the end, then look at you for a moment with an expression that has something sharp in it. "That's not a question I can discuss with someone I've just met." They gather their materials and leave. Two others who were nearby do the same, separately, in the next few minutes. Your question has made you the wrong kind of person to be near.`;
        G.worldClocks.isolation++;
        addJournal('Scholars avoided you due to intellectual freedom inquiry', 'complication', `mimolot-autonomy-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Moving through the reading halls and attending a public methodology session, the constraint is visible in behavior: papers cited only from approved commentators, questions that stay within the lecture's own terms, a particular kind of lateral movement through ideas that never quite pushes past the established boundary. It's not absence of intelligence. It's intelligence that has learned where to stop.`;
        addJournal('Intellectual autonomy observed as constrained', 'evidence', `mimolot-autonomy-constrained-${G.dayCount}`);
      } else {
        G.lastResult = `A day among the scholars without a particular thread to follow. They're working — papers spread, lamps lit against the afternoon grey, the scrape of chalk on slates in the adjoining seminar room. Their work looks like scholarship: citation, annotation, cross-reference. Whether it's constrained or freely chosen can't be determined by watching someone read and write. The constraint, if it exists, lives in what they're choosing not to pursue. Absence is invisible from outside.`;
        addJournal('Intellectual autonomy assessment inconclusive', 'evidence', `mimolot-autonomy-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. PERCEPTION TIER 1: ADMINISTRATIVE HIERARCHY MAPPED
  {
    label: "Map the administrative hierarchy of the Academy — who makes final decisions about research restrictions and knowledge access?",
    tags: ['Investigation', 'Perception', 'Administration', 'Hierarchy', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'administrative hierarchy mapping');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The formal charter lists the scholarly council as the governing body. Working through administrative decision records, a parallel structure emerges: research restriction decisions documented without scholarly council minutes, access changes implemented under administrative decree, personnel reassignments carrying signatures that don't belong to any faculty position in the register. There's an administrative layer that acts without faculty authorization and isn't accountable to the scholarly hierarchy. It appears to report somewhere else entirely.`;
        G.stageProgress[1]++;
        addJournal('Administrative hierarchy revealed scholarly authority replacement', 'evidence', `mimolot-hierarchy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `An administrative representative finds you in the charter room while you're cross-referencing decision records. "Academic visitors don't typically spend time in the administrative registry." The tone is neutral. The question underneath it is not. You're asked to explain your purpose. Your answer doesn't satisfy. The records you were working from are returned to a locked cabinet. The representative stays until you leave.`;
        G.worldClocks.watchfulness++;
        addJournal('Administration noticed your hierarchy mapping', 'complication', `mimolot-hierarchy-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The administrative decision records are partially accessible through the general registry. Several recent decisions — access restrictions, personnel changes, classification updates — carry procedural signatures that don't match the scholarly council positions listed in the charter. Someone is using the administrative machinery without coming through the faculty. How they got that authority isn't in the documents available here.`;
        addJournal('Administrative hierarchy shows parallel power structure patterns', 'evidence', `mimolot-hierarchy-parallel-${G.dayCount}`);
      } else {
        G.lastResult = `The founding charter and annual faculty council minutes are available at the reference desk — bound volumes, organized by year, the most recent sitting beside a card listing the current council's membership. The documents describe a clear scholarly hierarchy: council at the top, faculty below, administration in a supporting role. Whether the current administration is operating within that hierarchy or outside it requires comparing the charter against actual recent decisions. Those recent decision records are held in the administrative registry, not the library, and require separate authorization to access.`;
        addJournal('Administrative hierarchy analysis inconclusive', 'evidence', `mimolot-hierarchy-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. PERCEPTION TIER 2: EXTERNAL CONTROL COORDINATION
  {
    label: "Investigate whether Mimolot's administration answers to external authority — are orders about knowledge suppression coming from outside the Academy?",
    tags: ['Investigation', 'Perception', 'Control', 'External', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering external institutional control');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The sealed communications register is accessible to someone who knows what they're looking for. Research restriction directives cross-referenced against the administrative chain: the orders don't originate inside Mimolot. They arrive through a sealed external correspondence channel and are implemented by internal administrators who treat them as binding. The senders carry no title that appears in the Academy's charter or in any regional authority directory. Someone outside this institution is directing its internal policies, and the administrators receiving those directives are not questioning the authority behind them.`;
        G.stageProgress[1]++;
        addJournal('External control analysis revealed institutional coordination with outside authority', 'evidence', `mimolot-external-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You are intercepted before you reach the correspondence register. Two administrators, not the usual clerk. One asks what you've been doing in the administrative wing. The other already has a document. Your access to the wing has been revoked. If you return, it will be treated as a security matter. They let you leave. On the way out, you pass the correspondence room — its door is now locked where it was open this morning. They knew exactly what you were looking for.`;
        G.worldClocks.pressure += 2;
        addJournal('Administration directly warned you away from external control inquiry', 'complication', `mimolot-external-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The public-facing correspondence records show standard institutional exchanges: faculty appointments, library acquisitions, academic conference invitations. In the register margins, several entries reference a sealed correspondence channel not described in the standard communications protocol. What moves through that channel isn't in the public register. That it exists, and that it's sealed, is now established.`;
        addJournal('Administrative coordination with external sources observed', 'evidence', `mimolot-external-coordinated-${G.dayCount}`);
      } else {
        G.lastResult = `External communication with outside institutions is standard academic practice — collaborative research, publication exchanges, visiting scholar arrangements. The logs available at the general desk show active correspondence with several external parties. Whether any of those channels carry directives rather than academic exchange requires access to the correspondence content, which is sealed. The channels exist. What's in them is a different question.`;
        addJournal('External control analysis inconclusive', 'evidence', `mimolot-external-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 15. STREET RUMOR: SCHOLARLY ANXIETIES
  {
    label: "Gather whispered concerns in the study halls — what are scholars whispering about knowledge suppression and research restrictions?",
    tags: ['Investigation', 'Rumor', 'Gossip', 'Fear', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing scholarly anxiety narratives');
      G.stageProgress[1]++;

      const rumor = ['certain research topics have become forbidden and nobody officially said why', 'scholars who ask wrong questions get quietly reassigned to archival work', 'the sealed archives are growing and nobody knows what\'s being locked away', 'someone is rewriting history and calling it documentation correction', 'the verification system has been corrupted and false information is being certified as true'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `In the lower reading room, between shifts, it goes: "${selected}." It moves in fragments — a phrase between two colleagues over a shared lamp, a sentence left half-finished when a third person enters. No one who repeats it claims to know the source. The Academy's carved lintel lists founding principles in old script above the main entrance. Someone's pasted a student broadsheet over the bottom half. Nobody has taken it down.`;
      addJournal(`Street rumor gathered: "${selected}"`, 'evidence', `mimolot-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. INSTITUTIONAL CRACK: PROOF OF KNOWLEDGE CONSPIRACY
  {
    label: "Compile evidence that Mimolot's knowledge function has been corrupted — find proof that truth suppression is systematic and coordinated.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Conspiracy', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing knowledge suppression conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The documents laid out together: restriction decrees, historical record alterations, verification compromises, enrollment guidance patterns, framework revisions. Each one can be argued as poor administration in isolation. Together they require a different explanation. The same type of document — institutional overreach — appears across every system at the same point in time, implemented through channels that bypass the faculty council. This isn't a series of failures. It's a series of deliberate acts that used the appearance of procedure to accomplish something procedure would not allow.`;
        G.stageProgress[1]++;
        addJournal('Knowledge suppression conspiracy documentation compiled', 'evidence', `mimolot-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Midway through laying out the documents, someone comes through the door who wasn't invited. Not an administrator — someone with no institutional designation visible. They take in the documents on the table without looking at you directly, then speak one sentence: stop. They don't explain or threaten further. They don't need to. The evidence goes back into its scattered sources. The work you've done can't be undone, but whatever you've been building toward is going to be harder now.`;
        G.worldClocks.pressure += 2;
        addJournal('Investigation directly noticed by conspiracy operators', 'complication', `mimolot-proof-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The contradictions between the Academy's stated charter commitments and the documented administrative actions are clear enough to establish that the two are not operating in the same direction. This is no longer a question of mismanagement or institutional drift. The actions are too deliberate and too concentrated. Someone has been running a different institution inside the official one.`;
        addJournal('Compelling institutional conspiracy evidence found', 'evidence', `mimolot-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The evidence pieces are each individually ambiguous. A restriction decree could be administrative caution. A historical revision could be scholarly correction. A verification pressure complaint could be a personnel dispute. To establish that these are connected, you need more of them and a clearer line between them. What you have says something is wrong. It doesn't yet say it's deliberate.`;
        addJournal('Evidence fragments found but incomplete', 'evidence', `mimolot-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. MORAL PRESSURE: COMPLICITY OR RESISTANCE CHOICE
  {
    label: "Confront a scholar who is participating in suppression — demand explanation and decide whether to protect them or report them.",
    tags: ['Investigation', 'Moral', 'Choice', 'Pressure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'making moral commitment to truth');
      G.stageProgress[1]++;

      const npcOptions = [
        { name: 'Kensa', role: 'knowledge archivist', fear: 'I was told to alter historical records or lose my position. I altered them.' },
        { name: 'Maris', role: 'student administrator', fear: 'I was instructed to guide certain students away from critical thinking. I follow the instructions.' },
        { name: 'Dalmir', role: 'research scholar', fear: 'I approved restricted classification of dangerous research. I was ordered to, but I still approved it.' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `${npc.name} doesn't deny it when you put it plainly. "${npc.fear}" They look at their hands afterward. They're not asking for forgiveness — they're asking what happens next. You have a choice: expose what they did, which gives you leverage with the administration but ends them professionally; or keep it between you, which keeps a source intact but leaves a complicit actor in place. Neither option is clean. They're waiting.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal('consequence', `Confronted ${npc.name} (${npc.role}) about complicity in knowledge suppression`, `mimolot-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. DISCOVERY MOMENT: WRONGNESS CONFIRMED AND ORIGIN REVEALED
  {
    label: "Find the central evidence that confirms knowledge suppression — discover who is directing Mimolot Academy's corruption from outside.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of knowledge suppression');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The administrative vault holds sealed orders. House Shelk's mark is on the wax. The directives inside are specific: which subject areas to restrict, which historical materials to reclassify, which scholars' work to redirect. This is not general pressure applied from outside — these are operational instructions, delivered to specific administrators, specifying actions to take and timelines to follow. Mimolot Academy is being run by someone in Shelkopolis who has no title here and no public accountability here. The institution hasn't been dismantled. It's been repurposed from the inside.`;
        G.stageProgress[1]++;
        addJournal('Origin source of Mimolot knowledge suppression identified as external Shelkopolis House Shelk coordination', 'discovery', `mimolot-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Two people are waiting outside the administrative vault room before you reach it. They don't produce credentials. They ask you to leave the wing and not return. One of them is watching the door behind you while the other speaks. You are not going to reach what's in that room today. What you've already gathered remains yours, but you've announced yourself to whoever is watching this end of the operation. They know what you're building toward.`;
        G.worldClocks.pressure += 2;
        addJournal('Investigation interrupted by conspiracy operators', 'complication', `mimolot-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `Several of the administrative directives reference authorization from outside the Academy's governance structure — a source designation that doesn't match any institutional title in the regional directory. The restriction orders are being issued by someone external to Mimolot, implemented by internal administrators treating those orders as binding. The specific identity of the external party isn't in the documents available here. The external hand exists. Its name is in a sealed file you haven't reached.`;
        addJournal('External coordination of Mimolot knowledge suppression confirmed', 'discovery', `mimolot-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `The external authorization references in the administrative documents use a designation that doesn't resolve to a specific person or office — a category title that could mean several things or nothing particular. The trail leads to a sealed correspondence archive that requires senior faculty authorization to open. The external hand is visible in the documents. Its identity has been deliberately kept one layer further back than the records you can access.`;
        addJournal('External coordination suspected but source not yet identified', 'evidence', `mimolot-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. SECOND-ORDER EVIDENCE: PATTERN RECOGNITION ACROSS SYSTEMS
  {
    label: "Recognize the pattern connecting research suppression, historical rewriting, and external coordination — understand that all knowledge systems are being corrupted simultaneously.",
    tags: ['Investigation', 'Pattern', 'Analysis', 'Knowledge', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'recognizing systematic knowledge capture pattern');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The pattern is specific: research suppression prevents new challenge. Historical revision eliminates precedent. Verification corruption makes false documents indistinguishable from genuine ones. Enrollment steering determines which minds are allowed to develop the capacity to notice any of this. These four systems together don't leave gaps. A scholar trained in the current curriculum, working from the current collection, verifying against the current records, using the current interpretive framework — that scholar cannot reach conclusions that challenge the current arrangement. The institution hasn't failed. It's been rebuilt to prevent failure of a different kind.`;
        G.stageProgress[1]++;
        addJournal('Knowledge systems analysis revealed coordinated truth conquest engineering', 'evidence', `mimolot-pattern-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `An administrator appears at your study desk, friendly, asking what you're working on. The documents spread out in front of you answer that question more clearly than your words do. They note the combination of materials you've gathered — verification records alongside enrollment data alongside classification logs — and the friendliness recedes slightly. Your presence on the research floors is now, they say, something they'll need to document. Your pattern is visible.`;
        G.worldClocks.watchfulness++;
        addJournal('Your knowledge pattern analysis drew institutional scrutiny', 'complication', `mimolot-pattern-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Working through the evidence threads, connections appear between systems that should be independent: the restriction categories align with the historical materials being revised, which align with the verification approvals being pressured, which align with the enrollment tracks being steered. The overlap is too consistent to be coincidental. These systems are operating toward the same end. Whether they're being directed toward it from a single source is the remaining question.`;
        addJournal('Knowledge system failure connections mapped', 'evidence', `mimolot-pattern-connected-${G.dayCount}`);
      } else {
        G.lastResult = `The different failure types — restriction, revision, verification pressure, enrollment steering — are each documented but remain separate threads. Without more evidence connecting their implementation dates and authorization sources, they're individually concerning rather than collectively damning. The pattern might be there. You haven't yet gathered enough from each thread to see it clearly.`;
        addJournal('Knowledge system pattern analysis inconclusive', 'evidence', `mimolot-pattern-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. FINAL CONFRONTATION: UNDERSTANDING THE WRONGNESS
  {
    label: "Synthesize all evidence into complete understanding — Mimolot Academy is being systematically corrupted by external forces to weaponize knowledge itself.",
    tags: ['Investigation', 'Synthesis', 'Understanding', 'Purpose', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'achieving knowledge weaponization understanding');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Each thread connects to the others and all of them connect to the same external directing hand. Research restrictions that prevent new scholarship from challenging the arrangement. Historical revisions that remove evidence the arrangement ever failed before. Verification corruption that makes false documentation appear certified. Enrollment steering that limits which minds can develop the capacity to see any of this. Mimolot Academy is not being run as an institution of knowledge anymore. It's being run as a proof that the method works. Whoever is doing this plans to do it elsewhere.`;
        G.stageProgress[1]++;
        addJournal('Mimolot Academy understood as proof of concept for systematic knowledge weaponization', 'discovery', `mimolot-understanding-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You're working through the final connections when the room shifts. Someone has come in through a door you didn't know was there. They're not from the Academy — the wrong posture, the wrong register, no institutional marks anywhere. They have read enough of what's on the table to know what it adds up to. "This is where you stop," they say. They don't explain who sent them. They don't need to. The synthesis remains incomplete in the documents, but complete enough in your head to be dangerous.`;
        G.worldClocks.pressure += 2;
        addJournal('Final understanding synthesis blocked by direct threat', 'complication', `mimolot-understanding-stopped-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence leads to a conclusion that the scope of what's happening here extends beyond Mimolot. The methods being applied — external authorization, administrative implementation, faculty bypassed at every step — are too systematic to be purpose-built for a single institution. This looks like a template being field-tested. The certainty isn't complete, but the pattern points clearly past this building.`;
        addJournal('Mimolot as experimental knowledge weaponization model suspected', 'discovery', `mimolot-understanding-experimental-${G.dayCount}`);
      } else {
        G.lastResult = `The threads you've gathered don't yet form a complete picture. The individual findings are solid — restriction, revision, verification pressure, external authorization. What's missing is the connective tissue: the full list of what's being restricted and why, the timeline of when the external hand first arrived, the scope of what comes next. The shape of the operation is partially visible. Its full purpose hasn't come into view yet.`;
        addJournal('Knowledge warfare purpose not yet fully revealed', 'evidence', `mimolot-understanding-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: CLASSIFIED FORMULA FRAGMENTS
  {
    label: "Access the Restricted Holdings alcove in the lower scriptorium — study the formula fragments that were pulled from the main catalogue.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'reading restricted formula fragments');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The fragments are from a process chemistry text on atmospheric stabilization compounds. The redacted sections in the public catalogue correspond precisely to the passages that describe how the compound class interacts with dome filtration media — exactly the mechanism that would explain Aurora Crown's degradation pattern. The redaction wasn't broad. Someone pulled specific pages. They knew what Aurora Crown was experiencing and knew which pages would connect the compounds to it.`;
        if (!G.flags) G.flags = {};
        G.flags.found_classified_formula_fragments = true;
        addJournal('Restricted formula fragments: targeted redaction matches Aurora Crown contamination mechanism', 'evidence', `mimolot-formula-${G.dayCount}`);
      } else {
        G.lastResult = `The alcove is where it should be, the catalogue entry intact. The text boxes holding the formula fragments are empty. A movement log entry from six days ago: "transferred to administrative review pending classification assessment." The shelf label still shows the call number. The documents are gone, recently, and whoever moved them left a paper trail that confirms they knew exactly what they were taking.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. CLUE: MEMORY HALL SUPPRESSED DOCUMENTS
  {
    label: "Search the Memory Hall's off-catalogue section — the reading room that requires senior faculty endorsement.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'searching Memory Hall off-catalogue');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `The off-catalogue section runs two decades deep. The most recent bundle, six months old, is a formal request from the Principality's administrative council to reclassify twenty-three research papers as restricted — reason given: "content requires administrative context before public dissemination." All twenty-three papers share three authors. All three of those faculty members are currently on indefinite academic leave. The papers, the leave, and the request share a date range of four weeks.`;
        if (!G.flags) G.flags = {};
        G.flags.found_memory_hall_documents = true;
        addJournal('Memory Hall: council-ordered suppression of 23 papers by three faculty now on leave', 'discovery', `mimolot-memoryhall-${G.dayCount}`);
      } else if (result.total >= 11) {
        G.lastResult = `The reading room opens, but the relevant bundles sit behind a second tier — a locked alcove with a different key mechanism than the main room. Through the glass, correspondence bundles are organized by date and sender category, labels facing out in the Academy's standard archival hand. The most recent section is thick, noticeably thicker than earlier years. The category labels are readable. The contents are not. Getting past the alcove requires the senior faculty endorsement that hasn't been secured yet.`;
      } else {
        G.lastResult = `A faculty member steps out of an alcove before you reach the reading room. They don't ask what you're looking for — they explain that this corridor requires senior endorsement and offer to escort you back to the main library floor. The offer carries the tone of a door being held open from one side. The corridor is noted: the off-catalogue section is two left turns from the main hall. Getting into it requires a different approach and the right name attached to the request.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ARCHETYPE-GATED: READING THE ACADEMY
  {
    label: "Attend an open lecture at Mimolot Academy and read what the room is actually about.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading academy lecture dynamics');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The front rows ask questions; the back rows don't. Not from disinterest — from something more practiced. The ones who've been here through the curriculum changes have learned which interventions draw attention and which don't. The silence in the back is positional, not passive. They're staying quiet on purpose and they know why.`;
      } else if (arch === 'magic') {
        G.lastResult = `The lecture text has been recently rebound — new cover, fresh ink smell, but the chapter numbering skips. Seven, twelve, fifteen: present in the index, absent from the pages. The students have a syllabus with gaps in it that nobody has named. They're being taught a shaped version of the subject and don't have the prior edition to compare it against.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Two people in the hall are not students or faculty. Their note-taking is observational — they're logging who asks which questions, not the content of the lecture. One makes a specific notation when a student asks about the previous edition of the assigned text. The room is being watched from inside itself, and most of the people in it don't know it yet.`;
      } else {
        G.lastResult = `The instructor pauses three times mid-lecture. Each pause comes exactly one clause before a sentence that would, in a different room, lead somewhere larger. The hesitations are too consistent to be unrehearsed. This instructor has walked to these boundaries enough times to know precisely where they are. They stop, redirect, and continue. Knowledge is being trimmed in real time by someone who has internalized the limits.`;
      }
      addJournal('Academy lecture: knowledge suppression active — auditors present, curriculum has structural gaps, instructors self-censoring', 'evidence', `mimolot-lecture-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. FACTION SEED: WARDEN ORDER ACADEMIC LIASON
  {
    label: "Locate the Warden Order's academic liaison stationed at the Mimolot Archive annexe.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Warden Order contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Brevard Ashe is at a corner desk with a volume of administrative law, and his posture when you approach is the posture of someone who anticipated a visitor. His presence here is "ongoing materials coordination." He's careful with each phrase, but he's clearly been watching the suppression unfold. "The Warden Order takes an institutional interest in conditions that affect scholarly access," he says — a sentence that points carefully away from its subject. Before you leave he writes a name on a scrap of paper: a scholar who departed the Academy last year, described only as "willing to discuss the prior academic climate." Not a recommendation. A door.`;
        if (!G.flags) G.flags = {};
        G.flags.met_warden_order_mimolot = true;
        G.factionHostility.warden_order += 1;
        addJournal('faction', 'Warden Order liaison Brevard Ashe: institutional interest in suppression, provided secondary scholar contact', `mimolot-warden-${G.dayCount}`);
      } else {
        G.lastResult = `Brevard Ashe closes his volume when you approach and explains, with complete courtesy, that substantive engagement with the Warden Order's liaison function requires a formal appointment submitted through the Academy's administrative registry. He keeps one finger between the pages while he speaks, intending to return. He's not unfriendly — he's procedural, which is more durable. Nothing will be said without paperwork in place first. His presence here is established. Getting past the procedure requires a different approach and probably a known name as introduction.`;
        if (!G.flags) G.flags = {};
        G.flags.located_warden_order_mimolot = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 25. ATMOSPHERE: THE SCRIPTORIUM STEPS AT NIGHT
  {
    label: "Sit on the Scriptorium Steps at dusk and observe who comes and goes when the Academy officially closes.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing Academy after hours');

      G.lastResult = `After the evening bell, three faculty leave through the side gate and don't come back. A fourth stays — a light moves between second-floor windows for two hours. The Memory Hall stays lit until midnight. At the tenth bell, a courier arrives at the administrative wing's rear entrance and departs carrying a sealed case, moving at the pace of someone with a specific destination. The Academy's official close is a change in what's visible, not a change in what's happening.`;
      addJournal('Scriptorium Steps: real Academy activity runs after closing hours — Memory Hall, courier exchange', 'discovery', `mimolot-steps-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 26. PERSONAL ARC: THE SCHOLAR ON LEAVE
  {
    label: "Find one of the three suppressed faculty members currently on 'academic leave' and hear what happened to them.",
    tags: ['PersonalArc', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'meeting suppressed faculty member');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Doss left "voluntarily" eight months ago and is still here — her research materials are locked in storage under administrative hold, so she can't go anywhere useful. She opens the door without surprise, like she's been expecting someone eventually. "They didn't remove me. They made working impossible: no access to my own notes, no publication approvals, no assigned students." She has copies of the suppressed papers. She tells you this before you ask. She's been waiting for someone to come around who isn't from the administrative council, and she needs a few more minutes to determine if that's you.`;
        G.flags.met_doss_suppressed_scholar = true;
        addJournal('contact', 'Archivist Doss: suppressed scholar on leave, has copies of restricted papers, ready to share conditionally', `mimolot-doss-${G.dayCount}`);
      } else {
        G.lastResult = `A neighbor at the old address says Doss moved without leaving a forwarding. But the bookshelves are visible through the window — packed tight, no gaps, untouched. The kettle on the shelf beside them has a faint ring of sediment on the base, recently used. Her materials are here. She is not, or chooses not to be. Someone who can't travel far has made herself harder to reach than her circumstances require. She's nearby and cautious. A different introduction — a name she trusts — would open the door.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE STUDENT WHO ASKS THE WRONG QUESTIONS
  {
    label: "Speak to the student who was flagged by the auditor in the lecture hall.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'speaking to surveilled student');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Tavin is a third-year materials student and he doesn't know he's been flagged. He's genuinely pleased to discuss it — he found an old edition at a used book stall outside the Academy walls and has been working through the differences. "Chapter twelve in the original describes a stabilization failure mode in detail. The current edition has two paragraphs where that chapter used to be." He's not alarmed by this. He thinks it's a fascinating editorial puzzle. He has no idea the auditors in this morning's lecture wrote his name down for asking about it.`;
        if (!G.flags) G.flags = {};
        G.flags.met_tavin_student = true;
        addJournal('contact', 'Student Tavin: has pre-revision edition with original chapter 12, unaware he is under surveillance', `mimolot-tavin-${G.dayCount}`);
      } else {
        G.lastResult = `Tavin watches you approach and shortens his stride before you reach him. His lecture notes are tucked under one arm, chalk dust still on his left sleeve. A stranger, after a lecture, wanting to talk — this is precisely the kind of interaction the current academic climate has taught students to close down quickly. He answers in single sentences and keeps walking. The culture here has done the work of maintaining distance without anyone needing to issue instructions. He never stopped moving from the moment he saw you.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "Archivist Doss mentions someone else came asking about the suppressed papers — they claimed to be from a northern scholarly institution.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They asked which papers had weapons applications," Doss says. "Not which papers were suppressed — specifically which ones described materials with tactical or military use. I didn't tell them. But they asked the question like they already had a list and were checking it." Someone is mapping the suppressed research for its operational value. Their interest is not academic.`;
      } else if (arch === 'magic') {
        G.lastResult = `"The questions were about process chemistry specifics," Doss says. "Which sections described scalable applications versus theoretical ones. They knew the difference before I could explain it." Expert-level knowledge underneath a researcher's credentials. Whoever they are, they came to this conversation already understanding the subject. Their interest in the suppressed papers is professional.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They came twice," Doss says. "First visit was general — establishing that I existed and knew the material. Second visit they asked who else had been asking." Counter-network mapping: identifying everyone connected to the suppression before deciding what to do about any of them. They're building a picture of the field before they move in it.`;
      } else {
        G.lastResult = `"They offered funding," Doss says. "Research grants, publication arrangements, relocation support. Everything a scholar in my position would want." She pauses. "The generosity was the part that was wrong." Someone is attempting to acquire the suppressed research and its custodians through financial leverage, dressed as academic patronage.`;
      }

      G.lastResult += ` They have been on this thread before you, and they have resources behind them that you don't.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative contacted Archivist Doss before you — expert-level knowledge, well-resourced', `mimolot-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
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
window.MIMOLOT_ACADEMY_STAGE1_ENRICHED_CHOICES = MIMOLOT_ACADEMY_STAGE1_ENRICHED_CHOICES;
