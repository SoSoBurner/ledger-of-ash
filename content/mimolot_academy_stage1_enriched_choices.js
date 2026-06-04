/**
 * MIMOLOT ACADEMY STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to knowledge, scholarship, and restricted truth
 * Generated for: Knowledge hoarding vs public truth, preservation vs dangerous revelation, authority vs questioning
 * Each choice: 65-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

var MIMOLOT_ACADEMY_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. SENIOR LIBRARIAN: RESEARCH RESTRICTIONS TIGHTENING
  {
    plot: 'main',
    questId: 'q_s1_pattern',
    label: "The librarian knows which topics disappeared. He also knows he didn't change them.",
    tags: ['Investigation', 'NPC', 'Observation', 'Knowledge'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'gathering research restriction intelligence');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        var _theronFam = (typeof getArchetypeFamily === 'function') ? getArchetypeFamily(G.archetype) : '';
        var _theronDetail = _theronFam === 'combat' ? ' He looks at you steadily when he finishes — the look of someone measuring whether the person across from him will go through a door or knock it down.' : _theronFam === 'stealth' ? ' He taps the desk once, then looks at the gap beneath the archive door. He wants to know if you came alone. He does not ask.' : _theronFam === 'support' ? ' After a pause, he adds: "The scholars who got reassigned — they\'re still here. Still watching. They\'d speak to someone who came in the right way." He is telling you who to find next.' : '';
        G.lastResult = `Theron sets his pen down. "The restriction decree didn't come from the scholarly council. It came through administrative channels — someone claiming knowledge security." He says the words like they taste bad. "What's being secured is not knowledge. Scholars who approach certain topics get redirected. Those who push are reassigned to cataloging." He taps the desk once. "We can't explain the boundaries to each other because explaining them would cross them."` + _theronDetail;
        G.stageProgress[1]++;
        addJournal('Librarian flagged unauthorized research restriction authority', 'evidence', `mimolot-librarian-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Theron straightens and his voice drops into formal register. "These restrictions exist to protect the integrity of scholarship. This is not a subject I discuss with visitors." He closes the ledger on his desk and rises. By the time you reach the corridor, he's already at the archive guardian's desk. Your name goes into a log. The pressure of that entry compounds — every subsequent archive request will arrive with this one attached as context.`;
        G.worldClocks.pressure++;
        addJournal('Archive staff now aware of your inquiry', 'complication', `mimolot-librarian-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Theron acknowledges the access changes with a measured nod. Administrative efficiency, he says — some reorganization of how priority materials are catalogued. The archive hush settles around the words as he speaks them. He describes the mechanism in detail and the purpose not at all. Two of his answers sit at different distances from the same fact, and the gap between them is where the real answer lives. He notices the pause that follows, and picks up his pen — then sets it back down without writing anything, the way a person reaches for something and decides against needing it.`;
        addJournal('Librarian confirmed research access changes but details incomplete', 'evidence', `mimolot-librarian-modified-${G.dayCount}`);
      } else {
        G.lastResult = `Theron gives back the standard account: research priorities are managed centrally, access is tiered by standing, everything is as it should be. He answers every question asked and none of the answers contain anything. The chalk dust on his sleeve catches the lamp light as he adjusts the ledger. He's given this account before, to other visitors, and he'll give it again. He's practiced every word of it. Dalmir in the upper reading room has been working in the suppressed subjects for three years. He knows which lines can't be crossed from the inside.`;
        addJournal('Research restriction inquiry inconclusive', 'evidence', `mimolot-librarian-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `The senior librarian straightens at your approach, pen still in hand. "Research inquiries require a formal access request submitted to the registry desk before the morning bell." He doesn't raise his voice. The archive hush does the work for him. His ledger closes. A desk clerk near the entrance has already noted your direction. The reading rooms on the upper floor are open to credentialed scholars — that endorsement is available through the faculty registry, one corridor over and one authorization form away.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 2. RESEARCH SCHOLAR: RESEARCH SUPPRESSION
  {
    plot: 'main',
    questId: 'q_s1_converging',
    label: "Scholars working on institutional critique have been reassigned to cataloging. Their projects still exist.",
    tags: ['Investigation', 'NPC', 'Records', 'Research'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering research suppression');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Dalmir pulls the study door half-closed before he speaks. He keeps one hand on the edge of the door — not closing it, not releasing it, holding it at the angle where the latch won't catch and the room won't look sealed. Scholars working on regional corruption analysis have been reassigned — their projects reclassified as outside institutional scope. Those tracing economic power structures were told their work "does not align with current priorities." One colleague studying historical reform precedent now handles only provenance cataloging. "Nobody loses their post," Dalmir says. "They just stop being able to work. There's a difference between the two that the administration is careful to maintain."`;
        G.stageProgress[1]++;
        addJournal('Scholar revealed systematic research topic suppression', 'evidence', `mimolot-scholar-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Dalmir goes still the moment you name the topic. "Research access is an internal institutional matter." He says it the way someone says a sentence they've rehearsed in case they needed it. He doesn't look at you again. The conversation ends. Later, a junior clerk delivers a notice to your temporary quarters — your presence on the research floors has been logged. The watchful precision of that notice means it was prepared before the conversation ended: this line was anticipated.`;
        G.worldClocks.watchfulness++;
        addJournal('Scholar filed notice of your suppression inquiry', 'complication', `mimolot-scholar-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Three scholars confirm that certain directions are being discouraged — one calls it "a narrowing of institutional focus," speaking toward the brass-fitted shelving rather than at you. None will name which topics. The conversation stays in that register: general enough to be defensible, specific enough to confirm there's a shape to what's missing. The ink-and-dust smell of the reading room stacks is close in this alcove. You leave with the outline of a suppression pattern but not its dimensions or the name of whoever drew the boundaries.`;
        addJournal('Scholars confirmed research discouragement patterns', 'evidence', `mimolot-scholar-discouraged-${G.dayCount}`);
      } else {
        G.lastResult = `The scholars in the upper reading room are polite and brief. Each conversation ends before it arrives anywhere. They're not hostile — they're careful, and there's a real difference between the two. One keeps a finger in his place in a bound volume the whole time you're speaking, as if the conversation is an interruption he intends to outlast. An hour spent here yields nothing but the particular quality of their silence — present, specific, practiced. The clerestory light falls across the brass-fitted shelving in long afternoon lines. The scholars who have already been reassigned are less careful. They have nothing left to protect.`;
        addJournal('Research suppression inquiry inconclusive', 'evidence', `mimolot-scholar-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `The upper reading room requires a current research permit, and yours doesn't cover the materials relevant to institutional history. A clerk behind the desk says this without apology — the permit tiers are clearly posted, she adds, gesturing to a board beside the door. The scholars visible through the glass door keep working, unbothered. The research permit for restricted subject areas is issued by the scholarly council on the first and third day of each week. That queue starts before the morning bell.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 3. ARCHIVE GUARDIAN: SEALED SECTIONS EXPANDED
  {
    label: "The sealed sections keep expanding. Behind them is what senior scholars once read freely.",
    tags: ['Investigation', 'NPC', 'Archives', 'Secrets'],
    condition: function() { return (G.investigationProgress||0) < 3; },
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'mapping knowledge restriction');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Sevik walks you to the boundary of the eastern stack and keeps his voice down. The sealed sections have expanded twice in the past year. Documents senior scholars accessed for decades moved into restricted storage without faculty review. "The classification is always 'institutional security' or 'sensitive material,'" he says, tracing a line on the shelf where materials used to be. "But read what's gone. Past administrative failures. Records of overreach. Every document that would tell you this institution made mistakes is now behind a door that only four people can open."`;
        G.stageProgress[1]++;
        addJournal('Guardian revealed systematic knowledge lockdown expansion', 'evidence', `mimolot-guardian-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sevik's expression closes like a door. "Restricted materials exist under institutional mandate. Your presence in this section without authorization is a procedural matter." He does not raise his voice — the archive hush of the eastern stacks does the work for him. He doesn't need to. By the next morning, the reading room desk clerk informs you that your temporary archive privileges have been suspended pending review. The note is written in the Academy's precise administrative hand. It was prepared before you left the building.`;
        addJournal('Archive guardian blocking archive access', 'complication', `mimolot-guardian-silent-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Sevik confirms the expansion. Document preservation, he says — humidity control, fragile materials requiring restricted handling conditions in the eastern stack. It's a reasonable explanation stated without hesitation, which is the problem. He had the answer ready before the question finished. You note which sections expanded most recently, marked by fresh brass fixtures on the new shelf-end caps. He watches you note it. He doesn't look at the lamp on his desk, which illuminates a gap where materials used to sit.`;
        addJournal('Guardian confirmed archive expansion but explanation questionable', 'evidence', `mimolot-guardian-expanding-${G.dayCount}`);
      } else {
        G.lastResult = `Sevik describes archival security protocols at length — access tiers, material handling procedures, the physical constraints of the building, humidity requirements for the eastern stack. He's thorough and technically accurate on every point he raises. None of it touches the question you asked. The lamp on his desk illuminates a shelf gap where materials used to be; the ink-and-dust smell of the archive stacks sits heavier here than in the open reading rooms. He doesn't glance at it once. You leave understanding every procedure and nothing about who changed them or when. Kensa in the document room has been logging those changes in her own notes. She's comparing the current versions against manuscript originals.`;
        addJournal('Archive expansion inquiry inconclusive', 'evidence', `mimolot-guardian-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `Sevik stops you at the eastern stack boundary. The sealed section begins here, and visitor access to the sealed section requires a written petition to the chief archivist, reviewed on a five-day cycle. He points to a notice fixed to the end-cap of the last open shelf. The petition form is at the registry desk — two floors up, left off the main stair. The petition requires a faculty sponsor. Dalmir in the upper reading room has been here long enough to know which faculty would consider signing one.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 4. KNOWLEDGE ARCHIVIST: DOCUMENTATION BEING ALTERED
  {
    label: "The archivist has both editions and has been logging the differences for months.",
    tags: ['Investigation', 'NPC', 'History', 'Records'],
    condition: function() { return (G.investigationProgress||0) >= 3 && (G.investigationProgress||0) < 6; },
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing historical record corruption');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        var _kensaFam = (typeof getArchetypeFamily === 'function') ? getArchetypeFamily(G.archetype) : '';
        var _kensaDetail = _kensaFam === 'combat' ? ' She watches your hands while you read the documents — not guarded, just noting. She\'s decided you\'re here to do something with what she gives you, not only to file it away.' : _kensaFam === 'stealth' ? ' She keeps the manuscript original face-down until you ask for it. Then she turns it over and stays quiet while you read, her back to the door.' : _kensaFam === 'support' ? ' "The scholars who were reassigned knew this too," she says, before you leave. "Four of them. If you need witnesses, they\'re still on the grounds." She does not press it further.' : '';
        G.lastResult = `Kensa lays two versions of the same document side by side — current and manuscript original — and points at the differences without speaking first. In the current version, an administrative overreach from forty years ago is described as a "procedural adjustment." The original calls it a sanction, names the administrators, describes the harm. "The changes preserve surface consistency," she says. "A casual reader won't catch it. But the substance is gone." She's been documenting the alterations for four months. She has a list.` + _kensaDetail;
        G.stageProgress[1]++;
        addJournal('Archivist revealed systematic historical record falsification', 'evidence', `mimolot-archivist-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kensa crosses her arms and steps back from the document she was examining. "Archive methodology is not a subject I discuss with external parties." Her tone is neutral, deliberate. She gathers the documents from the table and returns them to their case. You have misread the approach — she needed longer to trust you, and now the door is closed. The pressure will make the archive harder to enter with any purpose that looks like this one; someone else is watching the room now, for exactly this approach.`;
        G.worldClocks.pressure++;
        addJournal('Knowledge archivist blocking historical record access', 'complication', `mimolot-archivist-blocked-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Kensa grants access to the current-edition records, setting them on the table under the clerestory light. Working through the administrative history, you find three passages that read awkwardly — phrasing that doesn't match the period's conventions, transitions that skip steps that should be documented. The vellum is old; the ink in those passages is marginally less faded than the surrounding text. Something has been adjusted, but confirming it requires a manuscript copy for direct comparison. Those are in the restricted section, behind a lock that needs separate authorization.`;
        addJournal('Historical records show signs of revision patterns', 'evidence', `mimolot-archivist-revised-${G.dayCount}`);
      } else {
        G.lastResult = `The historical records are well-organized and extensive. Kensa points you to the relevant administrative period and leaves you to work. Two hours in, the documents appear complete — clean entries, consistent dates, proper notation. Whether they are complete is a different question entirely. Completeness requires something to compare them against, and the manuscript originals are three floors up behind a lock that requires separate authorization. The records look right. That's all you can determine from here. Kensa has already done that comparison. She has a list of the changes. She's been waiting for the right moment to decide what to do with it.`;
        addJournal('Historical record verification inconclusive', 'evidence', `mimolot-archivist-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `Kensa returns the documents to their case before you finish. "Manuscript access is restricted to scholars with active collection review credentials." She doesn't look up from the latch. The current-edition records are available to any registered visitor in the open reading room — those are two floors below. The manuscript originals require a separate authorization form and a faculty endorsement. Maris in the student administration office handles the endorsement registry. She processes requests on alternating mornings.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 5. STUDENT ADMINISTRATOR: ENROLLMENT RESTRICTIONS
  {
    label: "The strongest critical methodology students aren't getting advanced research placements. The gap has direction.",
    tags: ['Investigation', 'NPC', 'Students', 'Access'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading enrollment manipulation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Maris pulls the enrollment ledger and speaks with it open between you. Students from lower institutional standing are being routed toward service and cataloging tracks — the recommendation forms cite "aptitude alignment." Those who showed strong critical methodology in their early assessments are not receiving advanced placement in research programs. "They leave here thinking it was their choice," she says, running her finger along a column of notations. "The steering is in the guidance sessions. By the time a student knows their options, the options have already been shaped for them."`;
        G.stageProgress[1]++;
        addJournal('Administrator revealed systematic student enrollment restriction', 'evidence', `mimolot-admin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Maris closes the ledger before you finish the question. "Student records are protected under the Academy's confidentiality charter. I have no standing to discuss enrollment patterns with a visitor." She says it evenly, without particular hostility — it's simply the correct procedure and she's following it. Your approach was too direct. The ledger goes into a drawer. A clerk near the window has been listening. The watchful attention is now on this inquiry — the next enrollment question will be received as a continuation of this one.`;
        G.worldClocks.watchfulness++;
        addJournal('Student administrator alerted to enrollment inquiry', 'complication', `mimolot-admin-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Maris allows access to aggregate enrollment figures, laying the ledger open across the administration desk. The patterns are there — concentration of certain student profiles in service tracks, gaps in advanced research placement by background. Whether this represents steering or student preference can't be established from summary data. The guidance session notes that would show what each student was told are held in a locked alcove off the main registry, behind a separate authorization tier you don't have and that Maris shows no inclination to waive.`;
        addJournal('Enrollment patterns show potential steering', 'evidence', `mimolot-admin-steered-${G.dayCount}`);
      } else {
        G.lastResult = `The enrollment figures are available in the public-facing summary registers — clean columns, discipline totals by year, track distribution broken out by entry cohort. Students choose different tracks for many reasons: aptitude, preference, circumstance, recommendation. The summary data shows distribution across disciplines but nothing about the guidance sessions that produced it. A pattern exists in the numbers. What generated the pattern is not in the registers. That answer is in a separate record tier.`;
        addJournal('Student enrollment inquiry inconclusive', 'evidence', `mimolot-admin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `Maris closes the ledger and folds her hands on top of it. "Student guidance records are not available to external visitors under the Academy's confidentiality charter." The summary registers — distribution by track and year — are publicly posted in the main hallway. Individual placement data is not. Enrollment guidance appointments are logged separately and require a formal data access request, which the faculty council reviews quarterly. The aggregate board is a start. The individual records come through a different door.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 6. RESTRICTION KEEPER: FORBIDDEN KNOWLEDGE CATALOGED
  {
    label: "Everything classified in eighteen months has one thing in common. The restriction keeper has noticed.",
    tags: ['Investigation', 'NPC', 'Classification', 'Forbidden'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'uncovering danger justifications');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Vorin speaks toward the shelf rather than at you. He catalogs classifications for a living, and lately the categories have been expanding in one direction. Documentation of administrative failures: "dangerous to institutional stability." Records of overreach: "dangerous to public confidence." Precedent for reform: "dangerous to social order." He names each category like a man reciting a list that disturbs him. "Everything classified in the last eighteen months has one thing in common," he says. "It would be useful to someone challenging the current arrangement."`;
        G.stageProgress[1]++;
        addJournal('Keeper revealed weaponized knowledge classification system', 'evidence', `mimolot-keeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Vorin stops writing. "The classification status of restricted materials is itself a restricted matter." He doesn't look up from his desk. "Your questions go beyond what your standing permits." He makes a notation in the log at his elbow. You don't see what it says. By the time you're back in the corridor, a junior administrator is crossing the hall toward the senior offices with a sealed note. It will be harder to approach any further classification inquiry without that note having preceded you.`;
        G.worldClocks.isolation++;
        addJournal('Restriction keeper reported your classification inquiry', 'complication', `mimolot-keeper-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Vorin confirms the classifications exist and acknowledges the category labels, reading each one from the sealed acquisitions ledger at his desk without looking up. The criteria used to assign them, he says, are determined at the senior administrative level and not within his purview to explain. He can tell you what something has been labeled. He won't tell you who did the labeling or by what standard. The lamp on the corner shelf throws his shadow across the classification log as he closes it — a careful, practiced motion.`;
        addJournal('Keeper confirmed materials classified as dangerous knowledge', 'evidence', `mimolot-keeper-classified-${G.dayCount}`);
      } else {
        G.lastResult = `Vorin explains the classification system as it's written: materials deemed potentially harmful to public order or institutional function are reviewed by senior staff and assigned restricted status. He recites it the way a man reads from a notice he's posted so many times he no longer looks at the paper. The account is accurate and contains nothing. What the system has actually been used to accomplish in the past eighteen months stays behind the same closed door his explanation was designed to keep you from reaching. The categories he's been assigning all point the same direction. He's noticed. He hasn't named it to anyone yet.`;
        addJournal('Knowledge classification inquiry inconclusive', 'evidence', `mimolot-keeper-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `Vorin puts his pen down without capping it — a deliberate pause. "Classification records are administrative documents. Visitor access requires standing authorization from a senior faculty member." The public-facing catalogue is available at the reference desk in the main reading room; it lists current material availability but not classification rationale. The classification criteria and assignment logs are held in the administrative registry. That registry is one floor up and requires a faculty endorsement to enter. The senior librarian Theron processes endorsement requests in the morning hours.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 7. CURATION MASTER: COLLECTION BIAS SYSTEMATIC
  {
    label: "Eighteen months of silence in whole subject areas. He knows exactly when it started.",
    tags: ['Investigation', 'NPC', 'Curation', 'Bias'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading collection bias');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Aldis spreads the acquisition ledgers across the table and shows you the line where things changed. For twenty years, the collection policy was comprehensive — anything relevant to the fields, regardless of its conclusions. Eighteen months ago, the acquisition pace dropped and the range narrowed. Works questioning power structures: no new purchases. Historical texts documenting institutional failure: "out of print, unavailable." Critical methodology texts: under review, acquisition pending indefinitely. "The collection looks the same to someone who hasn't used it long," Aldis says. "But the new arrivals only point one direction."`;
        G.stageProgress[1]++;
        addJournal('Curator revealed systematic ideological bias in collection development', 'evidence', `mimolot-curator-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Aldis plants both hands on the acquisition ledger and does not move them. "Acquisition policy is an internal matter determined by the faculty council. Your interest in our collection decisions is not appropriate for this conversation." You've pushed at the wrong angle. He's not hostile — he's institutional, which is more durable. The ledgers go back into their cabinet and the key goes into his coat. Being watchful now means he will recognize the same approach if it comes through a different door.`;
        G.worldClocks.watchfulness++;
        addJournal('Curation master offended by collection bias inquiry', 'complication', `mimolot-curator-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Aldis allows access to the public-facing acquisition summaries, setting the ledger on the reference table under the tall clerestory windows. Working through the recent entries, the gaps are visible: whole subject areas where the ledger goes quiet in the past eighteen months. He watches you read without commenting — standing slightly to one side, hands behind his back, the posture of someone who knows exactly what you're about to notice and has decided not to help you name it. Whether the gaps reflect budget constraints or deliberate curation, the summary data won't say.`;
        addJournal('Collection development shows pattern gaps in critical perspectives', 'evidence', `mimolot-curator-gaps-${G.dayCount}`);
      } else {
        G.lastResult = `The acquisition registers are available at the reference desk — decades of entries, subject areas organized by faculty designation, each purchase annotated with donor or budget line. Gaps exist in every collection: publication delays, budget cycles, specialist focus. The recent gaps might be any of those things. Without the acquisition criteria documents that explain the current selection policy, the pattern stays ambiguous. Those criteria documents are held by the faculty council, which is itself the body that would need to authorize your access to them.`;
        addJournal('Collection bias analysis inconclusive', 'evidence', `mimolot-curator-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `Aldis retrieves the acquisition ledgers from the table in a single movement and returns them to the cabinet. "Acquisition policy is reviewed internally on a faculty council cycle. The public-facing summary registers are posted in the main reference hall." The summary registers show totals and track distribution — not the criteria that shaped them. The acquisition criteria documents, which would show who ordered what stopped, are held by the faculty council and aren't available without a formal research credential. The reference hall is two corridors back and open until the evening bell.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 8. VERIFICATION SCRIBE: TRUTH VERIFICATION COMPROMISED
  {
    label: "Three scribes reassigned. All three had refused to certify documents they flagged as inaccurate.",
    tags: ['Investigation', 'NPC', 'Verification', 'Truth'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing truth verification corruption');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The scribe who talks to you — Theron, not the senior one — keeps his voice below the ambient noise of the scriptorium floor. Three scribes have been reassigned in the past year. All three refused to approve documentation with discrepancies they had flagged. "We're told 'institutional needs sometimes require flexibility with detail,'" he says, and the phrase has the flatness of something repeated at him until he memorized it against his will. "We certify documents as accurate. We're now being asked to certify documents we know are not." His pen is still in his hand. He hasn't written anything in ten minutes.`;
        G.stageProgress[1]++;
        addJournal('Scribe revealed truth verification system weaponization', 'evidence', `mimolot-scribe-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The senior scribe sets her quill down with precision. "The verification process of this Academy represents its foundational scholarly guarantee. Your implication is an insult to this institution and to everyone working in this hall." She does not shout. She reaches for a complaint form — a preprinted document, the kind kept ready for exactly this. Your name goes into it. A copy will reach the faculty council before evening. The scrutiny attached to that complaint will arrive ahead of you in every hall of this Academy.`;
        G.worldClocks.reverence++;
        addJournal('Verification scribe filed complaint about integrity inquiry', 'complication', `mimolot-scribe-hostile-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Two scribes acknowledge that standards have shifted — one describes it as "increased administrative input into documentation decisions." Neither will name a specific document or a specific approval they had concerns about. They're describing the general shape of a problem without locating it anywhere particular, which is the safest way to describe it. The chalk-dust smell of the tally boards drifts over from the wall. Both scribes keep their pens moving while they speak, never quite stopping work, as though the conversation will be easier to deny if nothing is set down.`;
        addJournal('Scribes confirmed pressure on verification standards', 'evidence', `mimolot-scribe-pressure-${G.dayCount}`);
      } else {
        G.lastResult = `The scribes on the floor keep working as you move through the hall. Quills against parchment, the smell of fresh ink and chalk dust from the tally boards along the wall. The ones you approach answer briefly and return to their work. Their caution is practiced — not rude, just closed in a specific, consistent way. Whatever happens in this room stays in this room. Nobody holds eye contact when the word "verification" comes up. That response is too uniform to be coincidence.`;
        addJournal('Verification integrity inquiry inconclusive', 'evidence', `mimolot-scribe-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `The senior scribe sets her quill down and turns from the desk. "The verification process and the documents produced under it are internal records. External parties do not have access to certified document histories." Her voice carries the particular flatness of someone stating a policy they've stated many times. The scriptorium floor continues without pause behind her. The scribes who have been reassigned out of the verification hall are no longer bound by the same confidentiality structure — and they're not hard to find.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. LORE TIER 1: ACADEMIC PRECEDENT ANALYSIS
  {
    label: "The framework was revised. The burden of proof was inverted. Someone knew where to push.",
    tags: ['Investigation', 'Lore', 'Precedent', 'Framework'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'academic framework analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The change is in the footnotes. Interpretive criteria that governed evidence evaluation for sixty years have been quietly reclassified — the methodology that permitted critical analysis of institutional decisions is now listed as "insufficiently rigorous" in the current standards appendix. The burden of proof has been inverted: where authority once had to justify its decisions, the framework now requires challengers to disprove the decision at a standard that no available evidence can satisfy. The revision is dated fourteen months ago. It has a single signatory from the administrative council.`;
        G.stageProgress[1]++;
        addJournal('Precedent analysis revealed framework manipulation', 'evidence', `mimolot-precedent-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Two senior scholars approach you in the reading room. They've noticed what you've been working from. Your interpretive framework, they explain, references criteria superseded by the current standards appendix. The conversation is collegial and correct. They suggest alternate sources. By the end of it, your research thread has been politely but thoroughly redirected, and the scholars have seen exactly what you were looking at. The watchful intervention was too smooth to be accidental — the same scholars will notice the same approach again.`;
        G.worldClocks.watchfulness++;
        addJournal('Senior scholars questioned your analytical framework', 'complication', `mimolot-precedent-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Working through the precedent documents in the methodology section — the old vellum bindings faintly warm from the lantern light — the framework revisions are documented clearly enough. Whether the changes represent scholarly evolution or deliberate manipulation requires something to compare them against: the evidence they're now being used to evaluate, and what results they produce. The revision is dated, signed by a single name from the administrative council. The framework is a tool; its application is in a different room. What it's been used to accomplish there hasn't been established yet.`;
        addJournal('Precedent shows interpretive framework shifts', 'evidence', `mimolot-precedent-shifted-${G.dayCount}`);
      } else {
        G.lastResult = `The interpretive framework documents are available in the methodology section — dense, technically specific, the kind of reading that requires time and a fluency in academic legal convention to evaluate properly. The pages smell faintly of the binding glue used when the revised edition was reissued. Revisions exist: that much is confirmed. What the revisions changed, and who authorized them, requires cross-referencing across three prior period editions. That's a different day's work, and it will need to be a careful one.`;
        addJournal('Academic precedent analysis inconclusive', 'evidence', `mimolot-precedent-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `The methodology section is available to registered visitors, but the standards appendix and revision history documents require a current scholarly research credential. The desk clerk explains this without looking up. Foundational charter documents and annual faculty council minutes are in the open reading room — available to anyone, organized by year. The revision history that would show what changed and when is one authorization tier up. A faculty endorsement from a sitting council member clears that threshold.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 10. ARCANA TIER 2: MAGICAL KNOWLEDGE SUPPRESSION
  {
    label: "The restricted arcane texts are the ones describing how to work without Academy-authorized equipment.",
    tags: ['Investigation', 'Arcana', 'Magical', 'Power'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing arcane knowledge suppression');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `In the restricted classification log, the pattern holds across magical research: the texts reclassified as dangerous in the past year are specifically those covering independent arcane operation — spells requiring no institutional channeling, theories that expand what a practitioner can do without Academy-authorized equipment or oversight. An arcanist you find in the corner of the lower study speaks without looking up from her work. "The restricted texts are the ones that would let you work without us. Someone noticed that."`;
        G.stageProgress[1]++;
        addJournal('Arcane analysis revealed magical knowledge weaponization', 'evidence', `mimolot-arcana-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You're two hours into the arcane classification records when a council representative arrives at the reading room. Your access to the magical research archives has been elevated to "supervised" status — meaning every document request goes through a review desk before approval. The representative is pleasant about it. Your access to the broader arcane holdings is effectively halved before you leave the room. The pressure here is structural — supervised access means every further request draws attention before it's answered.`;
        G.worldClocks.pressure++;
        addJournal('Arcane council restricted your research access', 'complication', `mimolot-arcana-blocked-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The arcane research catalogue is accessible through the general reading room, its brass-fitted shelving organized by discipline tier. Scanning the recent classification changes, a cluster of restricted entries appears in the autonomy-practice section — texts covering independent arcane operation, unsupervised channeling techniques, practitioner-only methodology that requires no Academy-authorized equipment or oversight. The restrictions are recent, all dated within the past fourteen months. What the restricted texts actually contain is behind the classification wall. The shape of what's missing is readable even if the texts are not.`;
        addJournal('Arcane knowledge shows autonomy-related restrictions', 'evidence', `mimolot-arcana-restricted-${G.dayCount}`);
      } else {
        G.lastResult = `The arcane research section is organized by classification tier, and the current-tier materials are available without special clearance. Working through what's there, the gaps are readable by shape — subjects where the catalogue entries end abruptly, where the listed texts are all from more than two years ago. Arcane fluency would let you read more from those gaps. You can see them but can't interpret what's missing.`;
        addJournal('Arcane suppression analysis inconclusive', 'evidence', `mimolot-arcana-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `The arcane research section requires a current practitioner credential or a sponsored visitor permit for the materials classified beyond the general tier. The reading room clerk indicates the permit window — second floor, administrative hall, open on alternate mornings. The general catalogue is available without credentials and lists current holdings by subject area. The catalogue gaps are readable from there even if the restricted contents are not. That is a place to start.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 11. INVESTIGATION TIER 1: INQUIRY PATTERNS MONITORED
  {
    label: "Request documents on institutional history and get a review entry within twenty-four hours.",
    tags: ['Investigation', 'Investigation', 'Monitoring', 'Control'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'researcher surveillance mapping');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The administrative access logs aren't locked — they're just stored in a section visitors rarely use. Working through three months of entries: scholars accessing materials on institutional history are flagged with a secondary notation. Those who request documents related to administrative decisions receive a follow-up review entry within twenty-four hours. One name appears in reassignment records six weeks after a cluster of flagged document requests. The monitoring doesn't announce itself. It just produces consequences, quietly, weeks later.`;
        G.stageProgress[1]++;
        addJournal('Inquiry analysis revealed systematic scholar surveillance', 'evidence', `mimolot-inquiry-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `An administrator arrives at your reading desk before you've finished pulling the second set of access logs. They know exactly which documents you've been requesting. "Your research pattern has triggered a review," they say — not hostile, procedural. Further access to administrative logs is suspended pending a clarification interview. You've confirmed the monitoring exists by becoming its subject. The pressure now runs both ways: you're being watched by the same system you were trying to trace.`;
        G.worldClocks.pressure++;
        addJournal('Administration directly warned you against monitoring inquiry', 'complication', `mimolot-inquiry-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Working through the access records available at the general desk, correlations appear: document requests in certain subject areas are followed by additional log entries that standard library access doesn't explain. The pattern is visible. What it links to at the administrative end — who receives those secondary notations, what they do with them — that part isn't in the public-facing records.`;
        addJournal('Monitoring patterns show topic-based scrutiny correlation', 'evidence', `mimolot-inquiry-monitored-${G.dayCount}`);
      } else {
        G.lastResult = `Administrative access records are maintained by the registrar's office, not the library — a detail the desk clerk explains with the practiced patience of someone who redirects this question regularly. Access log data requires a faculty standing request to review. Without that standing, the records showing which scholars are flagged and for what subject areas are simply unavailable. The right door has been located. The key requires a faculty endorsement, which requires a faculty relationship, which requires time not yet available.`;
        addJournal('Scholar monitoring analysis inconclusive', 'evidence', `mimolot-inquiry-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `The administrative access logs are held by the registrar's office and are not available to external visitors without a faculty standing request on file. The desk clerk in the registrar's anteroom explains the procedure: the request form takes three days to process, and it requires a faculty sponsor. The public-facing reading room logs — which show document request totals by subject area but not individual names — are available without restriction in the main library hall. That aggregate view doesn't name anyone. It maps the pattern.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 12. INSIGHT TIER 2: INTELLECTUAL AUTONOMY ERODED
  {
    label: "Twenty years ago scholars argued across the refectory. The silence now is not contentment.",
    tags: ['Investigation', 'Insight', 'Autonomy', 'Freedom'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'mapping intellectual autonomy erosion');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `An older scholar in the upper study speaks while keeping his eyes on his manuscript. "Twenty years ago, someone would defend a contested interpretation in the refectory and three colleagues would shout back at them before the soup went cold." He turns a page. "Now we publish peer-reviewed consensus and nobody disputes it in public." He's not describing a golden age — he's describing what went away. The scholars moving through the reading hall below don't look up when you pass. They've learned the shape of safe research and they work inside it.`;
        G.stageProgress[1]++;
        addJournal('Intellectual autonomy analysis revealed systematic thought suppression', 'evidence', `mimolot-autonomy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You raise the question of intellectual freedom with a scholar in the second-floor hall. They listen to the end, then look at you for a moment with an expression that has something sharp in it. "That's not a question I can discuss with someone I've just met." They gather their materials and leave. Two others who were nearby do the same, separately, in the next few minutes. Your question has made you the wrong kind of person to be near. It will be harder to open conversations on these floors until that impression fades — if it does.`;
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
    },
    failResult: {
      text: `An afternoon in the reading halls doesn't open anything that was shut. The scholars are working, the lamp oil is being used, the chalk boards are marked. None of it is legible from outside the relationships that give it meaning. What's present and what's been removed look identical to an unacquainted observer. The older scholars who've been here through curriculum changes have the comparative baseline — they know what used to be discussed that isn't now. One of them takes lunch alone at the far end of the refectory, most days, near the east window.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 13. PERCEPTION TIER 1: ADMINISTRATIVE HIERARCHY MAPPED
  {
    label: "The charter says the scholarly council governs. The reassignment orders carry signatures from outside faculty.",
    tags: ['Investigation', 'Perception', 'Administration', 'Hierarchy'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'administrative hierarchy mapping');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.vigor || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The formal charter lists the scholarly council as the governing body. Working through administrative decision records, a parallel structure emerges: research restriction decisions documented without scholarly council minutes, access changes implemented under administrative decree, personnel reassignments carrying signatures that don't belong to any faculty position in the register. There's an administrative layer that acts without faculty authorization and isn't accountable to the scholarly hierarchy. It appears to report somewhere else entirely.`;
        G.stageProgress[1]++;
        addJournal('Administrative hierarchy revealed scholarly authority replacement', 'evidence', `mimolot-hierarchy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `An administrative representative finds you in the charter room while you're cross-referencing decision records. "Academic visitors don't typically spend time in the administrative registry." The tone is neutral. The question underneath it is not. You're asked to explain your purpose. Your answer doesn't satisfy. The records you were working from are returned to a locked cabinet. The representative stays until you leave. You've been noticed at the exact junction the administration keeps watched for exactly this kind of inquiry.`;
        G.worldClocks.watchfulness++;
        addJournal('Administration noticed your hierarchy mapping', 'complication', `mimolot-hierarchy-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The administrative decision records are partially accessible through the general registry, bound volumes organized by quarter and stacked on the brass-fitted reference shelf. Several recent decisions — access restrictions, personnel changes, classification updates — carry procedural signatures that don't match any scholarly council position listed in the founding charter. Someone is using the administrative machinery without coming through the faculty. The quiet deliberateness of the staff at the registry desk suggests this discrepancy has been visible to them for some time. How the unauthorized signatories acquired authority isn't in the documents available here.`;
        addJournal('Administrative hierarchy shows parallel power structure patterns', 'evidence', `mimolot-hierarchy-parallel-${G.dayCount}`);
      } else {
        G.lastResult = `The founding charter and annual faculty council minutes are available at the reference desk — bound volumes, organized by year, the most recent sitting beside a card listing the current council's membership. The documents describe a clear scholarly hierarchy: council at the top, faculty below, administration in a supporting role. Whether the current administration is operating within that hierarchy or outside it requires comparing the charter against actual recent decisions. Those recent decision records are held in the administrative registry, not the library, and require separate authorization to access.`;
        addJournal('Administrative hierarchy analysis inconclusive', 'evidence', `mimolot-hierarchy-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `The administrative decision registry is not accessible through the general reading room. A clerk in the main hall confirms that administrative records — including any personnel decisions and access change orders — are held in the registry office and require a faculty endorsement to review. The founding charter and annual council minutes are in the public collection. Charter documents name the formal governance structure. What the structure has actually been doing requires the registry. The charter is a start, and it's available without credentials.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 14. PERCEPTION TIER 2: EXTERNAL CONTROL COORDINATION
  {
    label: "Restriction directives arrive through a sealed external channel. Nobody has asked who sends them.",
    tags: ['Investigation', 'Perception', 'Control', 'External'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering external institutional control');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.vigor || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The sealed communications register is accessible to someone who knows what they're looking for. Research restriction directives cross-referenced against the administrative chain: the orders don't originate inside Mimolot. They arrive through a sealed external correspondence channel and are implemented by internal administrators who treat them as binding. The senders carry no title that appears in the Academy's charter or in any regional authority directory. Someone outside this institution is directing its internal policies, and the administrators receiving those directives are not questioning the authority behind them.`;
        G.stageProgress[1]++;
        addJournal('External control analysis revealed institutional coordination with outside authority', 'evidence', `mimolot-external-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You are intercepted before you reach the correspondence register. Two administrators, not the usual clerk. One asks what you've been doing in the administrative wing. The other already has a document. Your access to the wing has been revoked. If you return, it will be treated as a security matter. They let you leave. On the way out, you pass the correspondence room — its door is now locked where it was open this morning. They knew exactly what you were looking for. The pressure of this access revocation runs ahead of you now in every administrative channel in this building.`;
        G.worldClocks.pressure += 2;
        addJournal('Administration directly warned you away from external control inquiry', 'complication', `mimolot-external-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The public-facing correspondence records show standard institutional exchanges: faculty appointments, library acquisitions, academic conference invitations — the measured cadence of an institution managing its academic relationships. In the register margins, several entries reference a sealed correspondence channel not described in the standard communications protocol. The notation appears on a regular cycle, always initiating within days of a new restriction directive being implemented. What moves through that channel isn't in the public register. That it exists, arrives on schedule, and produces consequences has now been established.`;
        addJournal('Administrative coordination with external sources observed', 'evidence', `mimolot-external-coordinated-${G.dayCount}`);
      } else {
        G.lastResult = `External communication with outside institutions is standard academic practice — collaborative research, publication exchanges, visiting scholar arrangements. The logs available at the general desk show active correspondence with several external parties. Whether any of those channels carry directives rather than academic exchange requires access to the correspondence content, which is sealed. The channels exist. What's in them is a different question.`;
        addJournal('External control analysis inconclusive', 'evidence', `mimolot-external-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `The sealed correspondence wing is locked, and the register visible through the window is not one available to external visitors. The administrative duty clerk explains that sealed correspondence records require a senior faculty authorization to access and are reviewed only through formal petition. The public-facing external correspondence log — showing institutional exchanges but not their content — is available in the main reading room. That log names the channels and their categories. What's in the sealed channel is a different question, and it has a different door.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 15. STREET RUMOR: SCHOLARLY ANXIETIES
  {
    label: "The study halls go quiet in a specific way when the wrong people walk through.",
    tags: ['Investigation', 'Rumor', 'Gossip', 'Fear'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing scholarly anxiety narratives');
      G.stageProgress[1]++;

      const rumor = ['certain research topics have become forbidden and nobody formally said why', 'scholars who ask wrong questions get quietly reassigned to archival work', 'the sealed archives are growing and nobody knows what\'s being locked away', 'someone is rewriting history and calling it documentation correction', 'the verification system has been corrupted and false information is being certified as true'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `In the lower reading room, between shifts, it goes: "${selected}." It moves in fragments — a phrase between two colleagues over a shared lamp, a sentence left half-finished when a third person enters. No one who repeats it claims to know the source. The Academy's carved lintel lists founding principles in old script above the main entrance. Someone's pasted a student broadsheet over the bottom half. Nobody has taken it down.`;
      addJournal(`Street rumor gathered: "${selected}"`, 'evidence', `mimolot-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `The lower reading room is nearly empty and nobody is inclined to speak. The scholars who remain after hours have chosen the specific privacy of late work, and an unfamiliar presence circling their tables doesn't invite conversation. Fragments travel through the Academy in the spaces between formal hours — the queue outside the registry desk in the morning, the corridor between the refectory and the side stairs at midday. Different time, different approach. The talk moves when the right people are moving with it.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 16. INSTITUTIONAL CRACK: PROOF OF KNOWLEDGE CONSPIRACY
  {
    label: "Each piece has an innocent explanation. Together they don't.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Conspiracy', 'Exposure'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing knowledge suppression conspiracy');
      G.stageProgress[1]++;
      addHeat('mimolot', 1);
      G.rivals = G.rivals || {}; G.rivals.heat = (G.rivals.heat || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The documents laid out together: restriction decrees, historical record alterations, verification compromises, enrollment guidance patterns, framework revisions. Each one can be argued as poor administration in isolation. Together they require a different explanation. The same type of document — institutional overreach — appears across every system at the same point in time, implemented through channels that bypass the faculty council. This isn't a series of failures. It's a series of deliberate acts that used the appearance of procedure to accomplish something procedure would not allow.`;
        G.stageProgress[1]++;
        addJournal('Knowledge suppression conspiracy documentation compiled', 'evidence', `mimolot-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Midway through laying out the documents, someone comes through the door who wasn't invited. Not an administrator — someone with no institutional designation visible. They take in the documents on the table without looking at you directly, then speak one sentence: stop. They don't explain or threaten further. They don't need to. The evidence goes back into its scattered sources. The work you've done can't be undone, but whatever you've been building toward is going to be harder now. The pressure from this point is not institutional — you are tracked by the system you are documenting.`;
        G.worldClocks.pressure += 2;
        addJournal('Inquiry directly noticed by conspiracy operators', 'complication', `mimolot-proof-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The contradictions between the Academy's stated charter commitments and the documented administrative actions are clear enough to establish that the two are not operating in the same direction. Restriction decrees. Historical revisions. Verification pressure. Enrollment guidance patterns that concentrate certain minds in service roles. Each documented, each arriving through administrative channels that bypass the scholarly council. This is no longer a question of mismanagement or institutional drift. The actions are too deliberate and too concentrated. Someone has been running a different institution inside the sanctioned one, using its procedures as cover.`;
        addJournal('Compelling institutional conspiracy evidence found', 'evidence', `mimolot-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The evidence pieces are each individually ambiguous. A restriction decree could be administrative caution. A historical revision could be scholarly correction. A verification pressure complaint could be a personnel dispute. To establish that these are connected, you need more of them and a clearer line between them. What you have says something is wrong. It doesn't yet say it's deliberate. The administrative vault in the correspondence wing holds sealed directives. The connective tissue is in there, not here.`;
        addJournal('Evidence fragments found but incomplete', 'evidence', `mimolot-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `The documents spread across the table are each individually sourced from public-accessible records, and each individually inconclusive. Without the connective documents — implementation dates, authorization signatures, cross-system correspondence — the pattern stays ambiguous enough to be dismissed. The evidence exists. The structure needed to make it indisputable is in the administrative vault and the sealed correspondence wing. Those are open problems, not closed ones. The pieces already gathered will hold.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 17. MORAL PRESSURE: COMPLICITY OR RESISTANCE CHOICE
  {
    label: "One of them is complicit and knows it. Can they be turned.",
    tags: ['Investigation', 'Moral', 'Choice', 'Pressure', 'Confrontation'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'making moral commitment to truth');
      G.stageProgress[1]++;
      addHeat('mimolot', 1);

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

      addJournal(`Confronted ${npc.name} (${npc.role}) about complicity in knowledge suppression`, 'complication', `mimolot-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `The confrontation lands wrong — the NPC withdraws before anything is established. Institutional complicity doesn't open under direct pressure; it requires time and the specific kind of trust built through smaller exchanges first. The name is noted. The willingness to talk is not gone, only deferred. A different approach — starting with what they know rather than what they've done — leaves the door open. They're still here, and the administration hasn't moved them yet.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 18. DISCOVERY MOMENT: WRONGNESS CONFIRMED AND ORIGIN REVEALED
  {
    plot: 'main',
    questId: 'q_s1_close',
    label: "Somewhere a document names who is directing this. The administrative vault is one door further.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of knowledge suppression');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The administrative vault holds sealed orders. House Shelk's mark is on the wax. The directives inside are specific: which subject areas to restrict, which historical materials to reclassify, which scholars' work to redirect. This is not general pressure applied from outside — these are operational instructions, delivered to specific administrators, specifying actions to take and timelines to follow. Mimolot Academy is being run by someone in Shelkopolis who has no title here and no public accountability here. The institution hasn't been dismantled. It's been repurposed from the inside.`;
        G.stageProgress[1]++;
        addJournal('Origin source of Mimolot knowledge suppression identified as external Shelkopolis House Shelk coordination', 'discovery', `mimolot-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Two people are waiting outside the administrative vault room before you reach it. They don't produce credentials. They ask you to leave the wing and not return. One of them is watching the door behind you while the other speaks. You are not going to reach what's in that room today. What you've already gathered remains yours, but you've announced yourself to whoever is watching this end of the operation. They know what you're building toward. The pressure from this point is direct: you are tracked at the level where the origin is kept.`;
        G.worldClocks.pressure += 2;
        addJournal('Inquiry interrupted by conspiracy operators', 'complication', `mimolot-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `Several of the administrative directives reference authorization from outside the Academy's governance structure — a source designation that doesn't match any institutional title in the regional directory. The restriction orders are being issued by someone external to Mimolot, implemented by internal administrators treating those orders as binding without question. The sealed acquisitions ledger on the correspondence desk carries the same source notation, stamped and re-stamped across multiple months. The specific identity of the external party isn't in the documents available here. The external hand exists. Its name is in a sealed file you haven't yet reached.`;
        addJournal('External coordination of Mimolot knowledge suppression confirmed', 'discovery', `mimolot-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `The external authorization references in the administrative documents use a designation that doesn't resolve to a specific person or office — a category title that could mean several things or nothing particular. The trail leads to a sealed correspondence archive that requires senior faculty authorization to open. The external hand is visible in the documents. Its identity has been deliberately kept one layer further back than the records you can access. Archivist Doss has copies of the suppressed papers. She left the Academy eight months ago with her research materials still under administrative hold. She's still nearby.`;
        addJournal('External coordination suspected but source not yet identified', 'evidence', `mimolot-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `The administrative vault is not accessible today. The corridor leading to it has two people in it who were not there this morning and who watch the approach without moving. The evidence already gathered remains intact. The vault is one location, not the only one. The Memory Hall's off-catalogue section holds formal council requests to reclassify research — implementation dates and authorization names, organized by year. That section requires a senior faculty endorsement, not a confrontation. That is still an open path.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 19. SECOND-ORDER EVIDENCE: PATTERN RECOGNITION ACROSS SYSTEMS
  {
    label: "Research suppression, historical revision, verification corruption, enrollment steering — all pointing the same direction.",
    tags: ['Investigation', 'Pattern', 'Analysis', 'Knowledge'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'recognizing systematic knowledge capture pattern');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The pattern is specific: research suppression prevents new challenge. Historical revision eliminates precedent. Verification corruption makes false documents indistinguishable from genuine ones. Enrollment steering determines which minds are allowed to develop the capacity to notice any of this. These four systems together don't leave gaps. A scholar trained in the current curriculum, working from the current collection, verifying against the current records, using the current interpretive framework — that scholar cannot reach conclusions that challenge the current arrangement. The institution hasn't failed. It's been rebuilt to prevent failure of a different kind.`;
        G.stageProgress[1]++;
        addJournal('Knowledge systems analysis revealed coordinated truth conquest engineering', 'evidence', `mimolot-pattern-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `An administrator appears at your study desk, friendly, asking what you're working on. The documents spread out in front of you answer that question more clearly than your words do. They note the combination of materials you've gathered — verification records alongside enrollment data alongside classification logs — and the friendliness recedes slightly. Your presence on the research floors is now, they say, something they'll need to document. Your pattern is visible — and watchful eyes will be on this desk combination before you sit down at it again.`;
        G.worldClocks.watchfulness++;
        addJournal('Your knowledge pattern analysis drew institutional scrutiny', 'complication', `mimolot-pattern-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Working through the evidence threads, laid out across the reading table under the lantern light, connections appear between systems that should be independent: the restriction categories align with the historical materials being revised, which align with the verification approvals being pressured, which align with the enrollment tracks being steered. The overlap is too consistent to be coincidental. The ink-and-dust smell of the archive stacks is thick here, the sealed acquisitions ledger sitting unopened at the table's edge. These systems are operating toward the same end. Whether they're being directed from a single source is the remaining question.`;
        addJournal('Knowledge system failure connections mapped', 'evidence', `mimolot-pattern-connected-${G.dayCount}`);
      } else {
        G.lastResult = `The different failure types — restriction, revision, verification pressure, enrollment steering — are each documented but remain separate threads, spread across the reading table under lantern light. Without more evidence connecting their implementation dates and authorization sources, they're individually concerning rather than collectively damning. The sealed acquisitions ledger on the far shelf holds the connective tissue. The pattern might be there. You haven't gathered enough from each thread yet to make the argument hold, or to name who drew the lines between these systems.`;
        addJournal('Knowledge system pattern analysis inconclusive', 'evidence', `mimolot-pattern-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `The threads are present but the connections between them aren't closing. Each system failure is documented but independent — the pattern is visible in shape, not in cause. What's missing is the implementation record: when the external authorization began arriving, which administrator received it first, what the initial directive said. The Memory Hall's off-catalogue section holds formal reclassification requests with dates and signatories. That is the connective tissue, and it has a door that can still be opened.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 20. FINAL CONFRONTATION: UNDERSTANDING THE WRONGNESS
  {
    label: "This isn't institutional drift. The systems were rebuilt to prevent a specific conclusion.",
    tags: ['Investigation', 'Synthesis', 'Understanding', 'Purpose'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'achieving knowledge weaponization understanding');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Each thread connects to the others and all of them connect to the same external directing hand. Research restrictions that prevent new scholarship from challenging the arrangement. Historical revisions that remove evidence the arrangement ever failed before. Verification corruption that makes false documentation appear certified. Enrollment steering that limits which minds can develop the capacity to see any of this. Mimolot Academy is not being run as an institution of knowledge anymore. It's being run as a proof that the method works. Whoever is doing this plans to do it elsewhere.`;
        G.stageProgress[1]++;
        addJournal('Mimolot Academy understood as proof of concept for systematic knowledge weaponization', 'discovery', `mimolot-understanding-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You're working through the final connections when the room shifts. Someone has come in through a door you didn't know was there. They're not from the Academy — the wrong posture, the wrong register, no institutional marks anywhere. They have read enough of what's on the table to know what it adds up to. "This is where you stop," they say. They don't explain who sent them. They don't need to. The synthesis remains incomplete in the documents, but complete enough in your head to be dangerous. The pressure from outside the Academy's walls has arrived before you finished building the case against it.`;
        G.worldClocks.pressure += 2;
        addJournal('Final understanding synthesis blocked by direct threat', 'complication', `mimolot-understanding-stopped-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence leads to a conclusion that the scope of what's happening here extends beyond Mimolot. The methods being applied — external authorization, administrative implementation, faculty bypassed at every step — are too systematic to be purpose-built for a single institution. This looks like a template being field-tested. The certainty isn't complete, but the pattern points clearly past this building.`;
        addJournal('Mimolot as experimental knowledge weaponization model suspected', 'discovery', `mimolot-understanding-experimental-${G.dayCount}`);
      } else {
        G.lastResult = `The threads you've gathered don't yet form a complete picture. The individual findings are solid — restriction, revision, verification pressure, external authorization. What's missing is the connective tissue: the full list of what's being restricted and why, the timeline of when the external hand first arrived, the scope of what comes next. The shape of the operation is partially visible. Its full purpose hasn't come into view yet. The Memory Hall's off-catalogue section holds formal council requests to reclassify research. That's where implementation dates live.`;
        addJournal('Knowledge warfare purpose not yet fully revealed', 'evidence', `mimolot-understanding-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    },
    failResult: {
      text: `The evidence threads don't yet converge into a single coherent account. Restriction, revision, verification pressure, enrollment steering — each documented, none yet linked to a common authorization source. The shape of the operation is visible. Its full architecture requires one more layer: the implementation dates and authorization signatures that place all four systems under the same directing hand. The administrative vault and the Memory Hall off-catalogue section both hold that layer. Neither is closed permanently.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: CLASSIFIED FORMULA FRAGMENTS
  {
    label: "The Restricted Holdings alcove in the lower scriptorium. Formula fragments pulled from the main catalogue.",
    tags: ['Investigation', 'Evidence', 'Stage1'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'reading restricted formula fragments');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));
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
    },
    failResult: {
      text: `The Restricted Holdings alcove requires a current research credential for materials under classification review. The desk clerk confirms this while pointing to the posted access tiers near the entrance. The movement log for the alcove is visible from the desk: recent transfers are documented by call number and receiving office. That log is public-facing. The documents themselves are gone, but the paper trail of where they went is still open to any visitor. A call number cross-referenced against the administrative transfer registry shows which office is holding them.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 22. CLUE: MEMORY HALL SUPPRESSED DOCUMENTS
  {
    label: "The off-catalogue section requires faculty endorsement nobody hands out freely.",
    tags: ['Investigation', 'Evidence', 'Stage1'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'searching Memory Hall off-catalogue');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('finesse', (G.skills.finesse || 0) + Math.floor(G.level / 3));
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
    },
    failResult: {
      text: `The Memory Hall corridor requires a senior faculty endorsement before the door opens, and the endorsement isn't in place. A faculty member intercepts the approach before the reading room comes into view and escorts the way back toward the main library floor with practiced courtesy. The off-catalogue section's location is confirmed: two left turns from the main hall. The endorsement is the obstacle. Warden Order liaison Brevard Ashe has been present at the Academy long enough to know which faculty members would consider signing one.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 23. ARCHETYPE-GATED: READING THE ACADEMY
  {
    label: "Attend an open lecture at Mimolot Academy and read what the room is actually about.",
    tags: ['Investigation', 'Archetype', 'Stage1'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading academy lecture dynamics');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The front rows ask questions; the back rows don't. Not from disinterest — from something more practiced. The ones who've been here through the curriculum changes have learned which interventions draw attention and which don't. The silence in the back is positional, not passive. They're staying quiet on purpose and they know why. The tall clerestory windows throw afternoon light across the hall in long lines. Nobody in the back rows sits in them.`;
      } else if (arch === 'magic') {
        G.lastResult = `The lecture text has been recently rebound — new cover, fresh ink smell, but the chapter numbering skips. Seven, twelve, fifteen: present in the index, absent from the pages. The students have a syllabus with gaps in it that nobody has named. They're being taught a shaped version of the subject and don't have the prior edition to compare it against.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Two people in the hall are not students or faculty. Their note-taking is observational — they're logging who asks which questions, not the content of the lecture. One makes a specific notation when a student asks about the previous edition of the assigned text. The room is being watched from inside itself, and most of the people in it don't know it yet.`;
      } else {
        G.lastResult = `The instructor pauses three times mid-lecture. Each pause comes exactly one clause before a sentence that would, in a different room, lead somewhere larger. The tall clerestory windows fill the hall with grey afternoon light; chalk dust drifts from the tally board at the front. The hesitations are too consistent to be unrehearsed. This instructor has walked to these limits enough times to know precisely where they are. They stop, redirect, and continue — each time landing back inside the permitted curriculum with the ease of long practice. Knowledge is being trimmed in real time by someone who has internalized exactly where it must stop.`;
      }
      addJournal('Academy lecture: knowledge suppression active — auditors present, curriculum has structural gaps, instructors self-censoring', 'evidence', `mimolot-lecture-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    },
    failResult: {
      text: `The open lecture fills its scheduled hour without yielding anything not already in the posted syllabus. The room is present, attentive, unrevealing. Lectures are performances of the permitted curriculum — the gaps aren't visible until there's a prior version to compare against. Student Tavin has a pre-revision edition from a used book stall outside the Academy walls. That comparison is available outside the institution's walls, without its walls listening. He goes to the stall regularly.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 24. FACTION SEED: WARDEN ORDER ACADEMIC LIASON
  {
    label: "The Warden liaison watched the suppression unfold from the Archive annexe. No report filed.",
    tags: ['Faction', 'NPC', 'Stage1'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Warden Order contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Brevard Ashe is at a corner desk with a volume of administrative law, and his posture when you approach is the posture of someone who anticipated a visitor. His presence here is "ongoing materials coordination." He's careful with each phrase, but he's clearly been watching the suppression unfold. "The Warden Order takes an institutional interest in conditions that affect scholarly access," he says — a sentence that points carefully away from its subject. Before you leave he writes a name on a scrap of paper: a scholar who departed the Academy last year, described only as "willing to discuss the prior academic climate." Not a recommendation. A door.`;
        if (!G.flags) G.flags = {};
        G.flags.met_warden_order_mimolot = true;
        G.factionHostility.warden_order += 1;
        addJournal('Warden Order liaison Brevard Ashe: institutional interest in suppression, provided secondary scholar source', 'intelligence', `mimolot-warden-${G.dayCount}`);
      } else {
        G.lastResult = `Brevard Ashe closes his volume when you approach and explains, with complete courtesy, that substantive engagement with the Warden Order's liaison function requires a formal appointment submitted through the Academy's administrative registry. He keeps one finger between the pages while he speaks, intending to return. He's not unfriendly — he's procedural, which is more durable. Nothing will be said without paperwork in place first. His presence here is established. Getting past the procedure requires a different approach and probably a known name as introduction. A named introduction from Archivist Doss would clear that threshold.`;
        if (!G.flags) G.flags = {};
        G.flags.located_warden_order_mimolot = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    },
    failResult: {
      text: `Brevard Ashe closes his volume and directs the conversation toward the formal appointment procedure before anything substantive is reached. He keeps one finger between the pages the entire time — a man intending to return. The Warden Order's liaison function is not available without paperwork on file. His presence at the annexe is established. The administrative registry desk handles appointment submissions between the first and second bells of the morning. A known name attached to the request — Archivist Doss's, for instance — would shorten the procedural distance considerably.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 25. ATMOSPHERE: THE SCRIPTORIUM STEPS AT NIGHT
  {
    label: "The Scriptorium Steps at dusk. Worth watching who comes and goes when the Academy closes.",
    tags: ['WorldColor', 'Lore', 'Stage1'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing Academy after hours');

      G.lastResult = `After the evening bell, three faculty leave through the side gate and don't come back. A fourth stays — a light moves between second-floor windows for two hours. The Memory Hall stays lit until midnight. At the tenth bell, a courier arrives at the administrative wing's rear entrance and departs carrying a sealed case, moving at the pace of someone with a specific destination. The Academy's formal close is a change in what's visible, not a change in what's happening.`;
      addJournal('Scriptorium Steps: real Academy activity runs after closing hours — Memory Hall, courier exchange', 'discovery', `mimolot-steps-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 26. PERSONAL ARC: THE SCHOLAR ON LEAVE
  {
    label: "Three faculty members are on academic leave. None of them left willingly.",
    tags: ['PersonalArc', 'NPC', 'Stage1'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'meeting suppressed faculty member');
      if (!G.flags) G.flags = {};

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Doss left "voluntarily" eight months ago and is still here — her research materials are locked in storage under administrative hold, so she can't go anywhere useful. She opens the door without surprise, like she's been expecting someone eventually. "They didn't remove me. They made working impossible: no access to my own notes, no publication approvals, no assigned students." She has copies of the suppressed papers. She tells you this before you ask. She's been waiting for someone to come around who isn't from the administrative council, and she needs a few more minutes to determine if that's you.`;
        G.flags.met_doss_suppressed_scholar = true;
        addJournal('Archivist Doss: suppressed scholar on leave, has copies of restricted papers, ready to share conditionally', 'contact_made', `mimolot-doss-${G.dayCount}`);
      } else {
        G.lastResult = `A neighbor at the old address says Doss moved without leaving a forwarding. But the bookshelves are visible through the window — packed tight, no gaps, untouched. The kettle on the shelf beside them has a faint ring of sediment on the base, recently used. Her materials are here. She is not, or chooses not to be. Someone who can't travel far has made herself harder to reach than her circumstances require. She's nearby and cautious. A different introduction — a name she trusts — would open the door.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE STUDENT WHO ASKS THE WRONG QUESTIONS
  {
    label: "A student asked about the previous edition. An auditor wrote his name down.",
    tags: ['Social', 'NPC', 'Stage1'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'speaking to surveilled student');

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Tavin is a third-year materials student and he doesn't know he's been flagged. He's genuinely pleased to discuss it — he found an old edition at a used book stall outside the Academy walls and has been working through the differences. "Chapter twelve in the original describes a stabilization failure mode in detail. The current edition has two paragraphs where that chapter used to be." He's not alarmed by this. He thinks it's a fascinating editorial puzzle. He has no idea the auditors in this morning's lecture wrote his name down for asking about it.`;
        if (!G.flags) G.flags = {};
        G.flags.met_tavin_student = true;
        addJournal('Student Tavin: has pre-revision edition with original chapter 12, unaware he is under surveillance', 'contact_made', `mimolot-tavin-${G.dayCount}`);
      } else {
        G.lastResult = `Tavin watches you approach and shortens his stride before you reach him. His lecture notes are tucked under one arm, chalk dust still on his left sleeve. A stranger, after a lecture, wanting to talk — this is precisely the kind of interaction the current academic climate has taught students to close down quickly. He answers in single sentences and keeps walking. The culture here has done the work of maintaining distance without anyone needing to issue instructions. He never stopped moving from the moment he saw you. He found his pre-revision edition at a used book stall outside the Academy walls. He still goes there. That's a less guarded conversation than this one.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    },
    failResult: {
      text: `Tavin doesn't stop walking. The current academic climate has trained students to close down unfamiliar conversations quickly, and he's had enough practice that the closing happens before a sentence is finished. He still goes to the used book stall outside the Academy walls — the one where he found his pre-revision edition. That's a different setting, without the Academy's corridors and its particular quality of being watched. The stall is open in the morning hours, before the first lecture bell.`,
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "Someone else asked Archivist Doss about the suppressed papers. They claimed northern scholarly affiliation.",
    tags: ['Rival', 'Warning', 'Stage1'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They asked which papers had weapons applications," Doss says, her voice staying low in the narrow room. "Not which papers were suppressed — specifically which ones described materials with tactical or military use. I didn't tell them. But they asked the question like they already had a list and were checking it against mine." She adjusts a stack of sealed notes on the table. Someone is mapping the suppressed research for its operational value, cross-referencing what exists against what they already know. Their interest has nothing to do with scholarship.`;
      } else if (arch === 'magic') {
        G.lastResult = `"The questions were about process chemistry specifics," Doss says. "Which sections described scalable applications versus theoretical ones. They knew the difference before I could explain it — they were using terminology that doesn't appear in any published edition of those texts." The lamp on her desk throws a line of light across a row of sealed acquisitions ledgers she brought when she left the Academy. Expert-level knowledge underneath a researcher's credentials: whoever they are, they came to this conversation already understanding the subject at depth. Their interest in the suppressed papers is not scholarly.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They came twice," Doss says. "First visit was general — establishing that I existed and knew the material, asking questions about the Academy's archive structure. Second visit they asked who else had been asking, and how recently." She pulls her chair slightly back from the window. Counter-network mapping: identifying everyone connected to the suppression before deciding what to do about any of them. They're building a picture of the full field — who has what, who talks to whom — before they move in it. That work was underway before you arrived.`;
      } else {
        G.lastResult = `"They offered funding," Doss says. "Research grants, publication arrangements, relocation support. Everything a scholar in my position would want." She pauses, smoothing the edge of a sealed document case on the table beside her. "The generosity was the part that was wrong. Nobody offers that kind of support without wanting the work more than the scholar." Someone is attempting to acquire the suppressed research and its custodians through financial leverage, dressed as academic patronage. The Academy's sealed acquisitions ledger is apparently worth more than she was offered.`;
      }

      G.lastResult += ` They have been on this thread before you, and they have resources behind them that you don't.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('Rival-adjacent operative contacted Archivist Doss before you — expert-level knowledge, well-resourced', 'complication', `mimolot-rival-${G.dayCount}`);
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
      G.lastResult = 'The board has nothing new since this morning. The refectory schedule and a quarterly notice about restricted wing access hours are still pinned from the morning cycle — administrative postings in the Academy\'s precise clerical hand, nothing from the research towers. The brass pin at the upper corner holds a student broadsheet that hasn\'t been taken down yet. Somebody pasted it over the lower half of the carved founding principles above the main entrance earlier this week and nobody from the administration has acknowledged it.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  },
  failResult: {
    text: `The notice board outside the main registry has been cleared since the morning posting — the pins are still in place but the papers are gone, which happens when the administration pulls notices it has reconsidered. A fresh posting cycle begins at the morning bell tomorrow. The bulletin board at the refectory entrance runs on a separate posting schedule and is maintained by student organizations rather than the administration. That one is usually still current in the afternoon.`,
    next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
  }
}
];

// ── ARCHETYPE-EXCLUSIVE CHOICES ──────────────────────────────
MIMOLOT_ACADEMY_STAGE1_ENRICHED_CHOICES.push(

  // COMBAT ×2 — archive security deployment
  {
    id: 'mimolot_arch_combat_1',
    label: 'The sealed section has a guard now. The reading room never had one before.',
    skill: 'might',
    archetypeGroup: 'combat',
    tags: ['Security', 'Archive', 'Change'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'A guard has been posted at the sealed section entrance in the main archive — a position that did not exist six months ago. The reading room and archive have always been self-regulating through access authorization; introducing a guard changes the enforcement model from administrative to physical. The guard\'s presence means the academy administration is not confident that the access authorization system alone will prevent someone from reading what is inside the sealed section. What is in the sealed section is worth physically protecting.');
      addJournal('Archive sealed section: new guard post, no historical precedent — administration not confident in access controls alone.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The guard reads your approach and positions himself in front of the sealed section entrance before you reach it. He is polite and absolute. The access authorization request procedure is posted beside the entrance; the backlog of pending requests visible in the window will show how many others have been trying.' }
  },

  {
    id: 'mimolot_arch_combat_2',
    label: 'The reassigned scholars are escorted to their new stations. They do not go alone.',
    skill: 'might',
    archetypeGroup: 'combat',
    tags: ['Security', 'Escort', 'Pressure'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'Three scholars recently reassigned from research positions to cataloging duties are transported to their new work stations with an academy security escort each morning. The escort is framed as a courtesy — "showing them to their new assignment." It is not a courtesy. It is a demonstration. The scholars being escorted know it, their former colleagues watching know it, and the administration knows that everyone knows. The escort communicates what happens when research on institutional critique continues: physical relocation with supervision.');
      addJournal('Reassigned scholars escorted to cataloging stations daily — public demonstration of consequence for institutional research.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The escort is currently in progress — mid-morning is when the reassignment walk happens. The scholars being escorted will be at their cataloging stations in twenty minutes and will be accessible for conversation once the escort has left.' }
  },

  // MAGIC ×2 — sealed section arcane locks
  {
    id: 'mimolot_arch_magic_1',
    label: 'The sealed section ward was upgraded after the reassignments. The new lock is external-keyed.',
    skill: 'spirit',
    archetypeGroup: 'magic',
    tags: ['Magic', 'Ward', 'Sealed'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The sealed section\'s binding ward has been replaced with a higher-tier version — the new ward requires an external key authorization, meaning the access decision cannot be made by anyone within the academy. The old ward could be opened by the senior librarian under specific conditions; the new ward requires a key held by a Mimolot administrative authority outside the library building. The upgrade removes the possibility of any internal academic decision to open the sealed section. The contents are now protected by an authority that is not accountable to the academy.');
      addJournal('Sealed section ward upgraded: external-key authorization required, no internal academic authority can open it independently.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The ward inscription is visible from the doorway but the new lock glyph is on the interior face, requiring access you do not have. The public ward registration board in the academy\'s administrative lobby lists all authorized ward changes; the upgrade date and external key assignment will appear in the current versus previous version comparison.' }
  },

  {
    id: 'mimolot_arch_magic_2',
    label: 'The reading room observation ward was activated two months ago. Nobody announced it.',
    skill: 'spirit',
    archetypeGroup: 'magic',
    tags: ['Magic', 'Surveillance', 'Ward'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'An observation ward is active in the main reading room — a monitoring ward that records which texts are accessed, by whom, and for how long. The ward was activated two months ago without announcement to the scholars or students using the room. Reading in a monitored space without knowing it is monitored changes what people read — and is intended to. The ward\'s arcane signature is faint, designed to be unnoticed by anyone not specifically looking for it. Someone decided the reading patterns of academy scholars needed to be tracked.');
      addJournal('Reading room observation ward active: records text access, unannounced 2 months ago — scholar reading monitored without consent or knowledge.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The reading room is occupied and the ward\'s signature is faint enough that detecting it requires sustained attention that would be noticed by the scholars present. The late evening session, after most scholars have left, will have fewer observers and more time for the kind of focused arcane examination that would confirm the ward\'s presence.' }
  },

  // STEALTH ×2 — reading room surveillance gaps
  {
    id: 'mimolot_arch_stealth_1',
    label: 'The sealed section key is in the senior librarian\'s desk during the lunch interval.',
    skill: 'finesse',
    archetypeGroup: 'stealth',
    tags: ['Key', 'Access', 'Window'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The senior librarian keeps the sealed section access key in his desk during the midday lunch interval — the same desk that sits in the public registry anteroom during the hour when he is at the refectory. The anteroom is not locked during the lunch interval; it is simply unoccupied. The key is not the external override key added in the recent ward upgrade; it is the internal master key that predates the upgrade and may still open sections of the sealed archive that the new ward does not cover. The old lock structure and the new one are not fully reconciled.');
      addJournal('Senior librarian\'s desk key accessible during lunch interval — predates ward upgrade, may still open sections the new ward has not reclosed.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The librarian is still in the anteroom — the lunch interval starts at the mid-bell, which is twelve minutes away. The refectory schedule is posted in the main hall; the interval will be precisely as long as the schedule indicates.' }
  },

  {
    id: 'mimolot_arch_stealth_2',
    label: 'A reassigned scholar still has her access card. She uses it after hours.',
    skill: 'finesse',
    archetypeGroup: 'stealth',
    tags: ['Access', 'Card', 'Opportunity'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'One of the reassigned scholars still has her original reading room access authorization — the reassignment process failed to revoke her card, an administrative oversight that has persisted for three weeks. She uses the card to enter the reading room after formal hours, when the observation ward is in low-activity mode and the guard rotation covers the sealed section entrance rather than the reading room approach. The oversight creates a window she has been careful not to use visibly. She has been building toward something in those after-hours sessions.');
      addJournal('Reassigned scholar retains unreoked reading room access — uses it after hours during low-mode observation ward period.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The scholar is at her cataloging station now and cannot discuss her after-hours access without risking the administrative oversight being corrected. The after-hours reading room log — maintained separately from the standard access log — records entry by card number without name; her card number will appear in the after-hours entries.' }
  },

  // SUPPORT ×2 — scholar reassignment social pressure
  {
    id: 'mimolot_arch_support_1',
    label: 'The research scholars stopped citing each other\'s work. The citation network collapsed.',
    skill: 'charm',
    archetypeGroup: 'support',
    tags: ['Social', 'Academic', 'Fragmentation'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'Academic citation is the visible structure of scholarly community — it shows who builds on whose work, who trusts whose methods. At Mimolot Academy, citations in current research papers have dropped dramatically in the past two months, with scholars explicitly declining to cite colleagues whose work addresses institutional subjects. Being cited in a suppressed scholar\'s footnotes has become a professional risk. The citation network\'s collapse means the academic community can no longer build on itself; each scholar now works in deliberate isolation from the institutional critique research that preceded them.');
      addJournal('Mimolot citation network collapsed: scholars declining to cite colleagues on institutional topics — citation as professional risk.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The scholars currently in the reading room are managing their visibility carefully and a direct question about citation practices reads as an administrative probe. The research publication board in the main hall posts all current submitted papers with their citation counts; the comparison between recent and earlier papers will show the collapse numerically.' }
  },

  {
    id: 'mimolot_arch_support_2',
    label: 'A junior scholar publicly defended the administration\'s research restrictions. His colleagues stopped talking to him.',
    skill: 'charm',
    archetypeGroup: 'support',
    tags: ['Social', 'Endorsement', 'Fracture'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'Third-year scholar Daves Oril issued a formal statement supporting the administration\'s reclassification of institutional critique research as "pending review." The statement used administration framing and appeared in the academy\'s published bulletin. His cohort has not engaged with him since. He is still present in the reading room, still submitting papers, but he works alone at a table that used to have four regular occupants. Someone gave the administration a public endorsement from within the research community, and the research community responded by excising him from the informal network that makes scholarly work possible.');
      addJournal('Scholar Oril endorsed administration restrictions — cohort withdrew, informal scholarly network fractured along endorsement line.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'Daves Oril is at his usual solo table and will give the administration line clearly if asked directly about his statement. His former cohort members are accessible elsewhere in the reading room and have more complex accounts of what his endorsement meant for the research network.' }
  }

);

window.MIMOLOT_STAGE1_ENRICHED_CHOICES = MIMOLOT_ACADEMY_STAGE1_ENRICHED_CHOICES;
