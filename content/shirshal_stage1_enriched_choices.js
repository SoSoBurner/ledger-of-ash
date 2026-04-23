/**
 * SHIRSHAL STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to investigative work and magical law
 * Generated for: Truth versus convenience, safety versus secrecy, jurisdiction versus private power
 * Each choice: 65-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

const SHIRSHAL_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. CASE CLERK: WITNESS STATEMENTS DISAPPEARING
  {
    label: "Ask the case clerk about recent witness testimony — are statements being filed inconsistently, or are certain testimonies going missing from the record?",
    tags: ['Investigation', 'NPC', 'Evidence', 'Records', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading witness record manipulation');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Sorren sets down his pen and keeps his voice low. "Eight years I've been filing statements. I know when one goes missing. Lately the magistrates tell me a witness recanted privately, or the case resolved off formal record. But I took the statement myself. The witness didn't recant. The cases are being pulled from the docket into some other system, and when I ask where, I'm told to leave it." He picks the pen back up. "Parts of this hall are going dark. I don't know who's reading the dark parts."`;
        G.stageProgress[1]++;
        addJournal('Case clerk flagged systematic witness statement removal', 'evidence', `shirshal-witness-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sorren's expression closes like a shutter. "Case procedures aren't for outside discussion. That's sensitive to active proceedings." He turns back to his ledger and does not look up again. He writes something in the margin before you've reached the door. Word travels fast in a hall built for record-keeping.`;
        G.worldClocks.pressure++;
        addJournal('Case clerk reported your inquiry to magistrates', 'complication', `shirshal-clerk-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Sorren pauses before answering. "Procedures have been variable lately. Certain cases the magistrates handle differently." He doesn't name which magistrates or which cases. His pen keeps moving. He's answered you and is already trying to forget he did.`;
        addJournal('Case clerk acknowledged procedure variability', 'evidence', `shirshal-clerk-procedure-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. EVIDENCE HANDLER: MAGICAL ANOMALY RECORDS FALSIFIED
  {
    label: "Access the evidence handler's logs for magical anomaly cases — are records being altered, or are certain anomalies not being documented?",
    tags: ['Investigation', 'NPC', 'Magic', 'Evidence', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering anomaly documentation corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Master Thyn spreads two ledgers side by side without speaking. The difference is visible from a step away. Four weeks back, entries read "arcane signature suggesting external origin." The same incidents now read "minor fluctuation within acceptable parameters." Three anomalies are stamped resolved before a single follow-up visit was logged. Thyn taps one entry with a finger and pulls his hand back. "I filed what I observed. What's here now is not what I filed."`;
        G.stageProgress[1]++;
        addJournal('Evidence handler revealed anomaly record falsification', 'evidence', `shirshal-evidence-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Thyn steps in front of the ledger shelf before you can reach it. "Anomaly records require magistrate authorization in writing. No exceptions." He keeps his hand on the shelf edge while he sends a runner. By the time you reach the hall's outer corridor, a magistrate's aide is already waiting with a short, unfriendly list of questions about your purpose in Shirshal.`;
        G.worldClocks.pressure++;
        addJournal('Magistrate alerted to evidence inquiry attempt', 'complication', `shirshal-evidence-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Thyn grants access to the current logs but not the archived originals. What's here has been edited — incident descriptions revised toward clinical neutrality, three entries stamped resolved with no supporting documentation. The edits are careful enough to survive a casual review. A systematic one would catch them.`;
        addJournal('Evidence logs show signs of careful alteration', 'evidence', `shirshal-evidence-altered-${G.dayCount}`);
      } else {
        G.lastResult = `Thyn shakes his head before you finish the request. "Anomaly records aren't open access. Bring magistrate authorization and I'll set aside time." He's not hostile — just practiced. This refusal has been rehearsed recently.`;
        addJournal('Evidence logs blocked without magistrate authorization', 'evidence', `shirshal-evidence-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. MAGISTRATE'S ASSISTANT: CASE ASSIGNMENTS MANIPULATED
  {
    label: "Question the magistrate's assistant about case assignment procedures — are certain cases being directed to specific magistrates, or are assignments being changed post-filing?",
    tags: ['Investigation', 'NPC', 'Process', 'Justice', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading case routing manipulation');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Kess checks the corridor before answering. "Four weeks ago the rotation stopped. Now assignments come from above me, and they aren't random — complex cases with political weight go to Magistrate Verek, cases touching Shelkopolis merchants go to Magistrate Illys. Every time." She smooths the edge of the assignment ledger with one thumb. "I used to understand why a case went where it went. Now I just copy the names down."`;
        G.stageProgress[1]++;
        addJournal('Assistant revealed case routing manipulation', 'evidence', `shirshal-routing-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kess goes still. "Case assignment is internal procedure. That's for the magistrates to manage." Her hands drop below the counter. She doesn't answer the follow-up. When you leave, she is writing something — not in the assignment ledger. Somewhere else.`;
        G.worldClocks.pressure++;
        addJournal('Assistant will report case assignment inquiry', 'complication', `shirshal-routing-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Kess gives you a half-answer. "Assignments are more centralized than they were." She doesn't say by whom. The rotation board behind her is blank where the magistrate names used to be chalked in.`;
        addJournal('Assistant confirmed case assignment changes', 'evidence', `shirshal-routing-changed-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. RECORD KEEPER: INVESTIGATION CLOSURE PATTERNS
  {
    label: "Examine investigation closure records — are cases being marked as resolved without proper documentation, or are investigations being arbitrarily ended?",
    tags: ['Investigation', 'NPC', 'Records', 'Procedure', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'tracing investigation termination patterns');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Brother Tam pulls a file from the resolved stack and opens it on the counter. "Witness follow-up: blank. Final evidence summary: blank. Notified families: no entries." The magistrate's closure signature is dated three days after the case was filed. "I track the docket by hand. I watch these cases. This one wasn't resolved — it was ended." He closes the file and slides it back. "They're stopping proceedings, not completing them. Families haven't been told."  `;
        G.stageProgress[1]++;
        addJournal('Record keeper revealed investigation termination pattern', 'evidence', `shirshal-closure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Brother Tam straightens and sets down his pen. "Outside inquiry into closure proceedings isn't appropriate. I need to speak to a magistrate before this goes further." He walks toward the inner passage before you've finished your sentence. A door closes. The hall stays empty for longer than it should.`;
        G.worldClocks.pressure++;
        addJournal('Record keeper immediately alerts magistrate to inquiry', 'complication', `shirshal-closure-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The resolved stack runs twice the usual depth for this quarter. Cases that should carry months of documentation close in a week, two weeks. The verification steps — witness confirmation, final evidence log, family notification — appear on the form template but the boxes beneath them are empty. The signature at the bottom is always there. Everything above it is missing.`;
        addJournal('Record review confirmed investigation closure acceleration', 'evidence', `shirshal-closure-accelerated-${G.dayCount}`);
      } else {
        G.lastResult = `The closure records are dense with cross-references you'd need the procedural code index to parse. Patterns are in there — you can see the acceleration in the dates — but matching them to violations requires a reference guide Brother Tam keeps locked in the inner office.`;
        addJournal('Closure pattern analysis inconclusive', 'evidence', `shirshal-closure-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. INVESTIGATOR: CASE BRIEFINGS WITHHELD OR ALTERED
  {
    label: "Speak with an investigator about recent cases — are they receiving incomplete briefings, or are details of incidents being hidden from those assigned to investigate?",
    tags: ['Investigation', 'NPC', 'Information', 'Obstruction', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading information obstruction');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Investigator Kess speaks with a flat, controlled anger. "Briefings arrive with sections missing — 'under review,' 'reserved for magistrate eyes.' We proceed with whatever we're given, request the missing sections, get told the case is already resolved at a higher level." She sets a file on the table. "Three weeks of work. Marked closed yesterday. I found out from the docket board, not from anyone above me. Whatever we're doing out there, it's procedural cover. Someone else is making the actual determinations."`;
        G.stageProgress[1]++;
        addJournal('Investigator revealed information compartmentalization', 'evidence', `shirshal-investigator-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kess stops mid-sentence and recalibrates. "Case detail discussions with outsiders can compromise proceedings. You understand that." She's not hostile — she's been trained recently. Whatever prompted that training is more recent than the paint on the hall's east corridor, which still smells of fresh lime.`;
        G.worldClocks.pressure++;
        addJournal('Investigator now distrustful of your questions', 'complication', `shirshal-investigator-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `"Need-to-know is the operating standard now," Kess says. She doesn't look happy about it. Across the room, another investigator is reading what's clearly an abbreviated brief — one sheet where there should be six. Neither of them mentions it.`;
        addJournal('Investigator confirmed information restriction', 'evidence', `shirshal-investigator-restricted-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. WITNESS COORDINATOR: TESTIMONY CONTROL AND INTIMIDATION
  {
    label: "Question the witness coordinator about recent testimony handling — are witnesses being coached, discouraged from testifying, or being made unavailable?",
    tags: ['Investigation', 'NPC', 'Witness', 'Intimidation', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering witness manipulation');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Elder Marsh keeps his back to the window when he speaks. "Someone is reaching witnesses before their scheduled appearances. Not threatening — advising. 'Friendly advisors' who explain that testimony could become complicated, that absence might be safer.' Three witnesses left Shirshal entirely last month. Two more claim travel. The magistrates accept every absence without a single follow-up query." He folds his hands. "Without witnesses the proceedings are hollow. We're producing the form of justice without any of its weight."`;
        G.stageProgress[1]++;
        addJournal('Coordinator revealed systematic witness removal', 'evidence', `shirshal-witness-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Marsh's posture changes the moment you frame the question. "Witness management is sensitive to active proceedings. Questions like that from outside the process could compromise testimony chains." He closes the register on his desk. He won't say another word. By evening, the inquiry will have been noted somewhere.`;
        G.worldClocks.pressure++;
        addJournal('Coordinator reported witness inquiry to magistrates', 'complication', `shirshal-witness-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Marsh grants you that much. "Availability has been difficult. Some witnesses are reluctant." He doesn't say why. The absence column in the open register behind him has more entries this quarter than the previous three combined.`;
        addJournal('Coordinator confirmed witness availability issues', 'evidence', `shirshal-witness-issues-${G.dayCount}`);
      } else {
        G.lastResult = `"Witness management requires confidentiality," Marsh says, with the patience of someone who's said it dozens of times. He doesn't discuss specifics. The door to the attendance records room is locked, and the key isn't on his belt.`;
        addJournal('Witness coordinator blocked further inquiry', 'evidence', `shirshal-witness-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. INNKEEPER: MESSAGE TRAFFIC AND SEALED COURIERS
  {
    label: "Question the innkeeper about recent message traffic — are sealed documents being moved through Shirshal, and who's coordinating their delivery?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Intelligence', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'mapping external communication');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Keeper Noss refills your cup before answering. "Couriers come in regularly. Sealed packets, different faces each time, but they all know to ask for the back room near the east passage." She wipes the counter. "They meet with magistrates or their visitors, leave more sealed packets, gone within the hour. One told me they traveled from 'places that take interest in how Shirshal serves law.' Before I could ask what that meant, a man at the corner table told the courier that was enough." She glances at the corner. "That table books by the week now."`;
        G.stageProgress[1]++;
        addJournal('Innkeeper mapped external courier network', 'evidence', `shirshal-couriers-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Noss sets the cloth down. "I don't discuss guests or their business. Twenty years running this place, that's how it stays open." She's polite about it but the warmth has gone out of the room. Next time you come in, she'll be busy with something at the other end of the counter.`;
        G.worldClocks.watchfulness++;
        addJournal('Innkeeper now distrustful of your questions', 'complication', `shirshal-innkeeper-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `"Sealed messages come through. Normal enough for a hall town," Noss says, but she says it toward the counter rather than at you. The east passage door swings shut on its own while she speaks. She doesn't look at it.`;
        addJournal('Innkeeper acknowledged message traffic', 'evidence', `shirshal-innkeeper-traffic-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. MAGISTRATE (RELUCTANT): AUTHORITY PRESSURE FROM ABOVE
  {
    label: "Approach a magistrate who seems uncomfortable with recent changes — try to get them to admit they're receiving pressure from higher authority.",
    tags: ['Investigation', 'NPC', 'Authority', 'Pressure', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'revealing authority pressure');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Verek waits until the antechamber door is latched before he speaks. "There is pressure. Not from within Shirshal — from outside. Instructions arrive through channels I'm told not to trace. They specify how to handle certain cases, which witnesses to accommodate and which to find unavailable, which proceedings to accelerate." He sits with his hands flat on the table. "We're told it's system optimization. Investigative efficiency." A pause. "My rulings used to be mine. Now I check them against what arrived in the morning packet. I don't know whose law I'm enforcing."`;
        G.stageProgress[1]++;
        addJournal('Magistrate revealed external authority control', 'evidence', `shirshal-magistrate-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The magistrate stands. "These questions are inappropriate directed at the magistracy without formal petition." He moves to the writing desk and begins a record of the conversation while you watch. "This inquiry is now documented. Any further approach to magistrate personnel requires a written request through the clerk's registry." The session is over. The document exists.`;
        G.worldClocks.pressure++;
        addJournal('Magistrate formally prohibits further inquiry', 'complication', `shirshal-magistrate-warning-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The magistrate chooses words with visible care. "Shirshal serves within a broader system. Decisions at that level involve considerations I'm not positioned to detail." He offers nothing further. But his posture — shoulders drawn in, eyes tracking toward the passage door — says something he didn't.`;
        addJournal('Magistrate hinted at external authority influence', 'evidence', `shirshal-magistrate-hint-${G.dayCount}`);
      } else {
        G.lastResult = `"Magistrate operations are internal to this hierarchy." He's civil, professionally so. The conversation ends without ceremony. On the way out, you pass three other magistrates in the corridor. None of them meet your eyes, which tells you someone already told them you'd be coming.`;
        addJournal('Magistrate blocked further inquiry', 'evidence', `shirshal-magistrate-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. STEALTH TIER 1: HIDDEN MEETING SURVEILLANCE
  {
    label: "Observe hidden meetings between magistrates and outside visitors — track their movements and identify the external parties directing them.",
    tags: ['Investigation', 'Stealth', 'Surveillance', 'Hidden', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'surveillance and observation');
      G.stageProgress[1]++;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Magistrate Illys and three travelers meet in the storeroom adjacent to the east archive. The door gaps at the hinge. Fragments: "...cases handled per the specified sequence..." "...witness unavailable as arranged..." "...documents prepared to the stated format." The visitors hand Illys a sealed packet before leaving. One pauses at the door. "Coordinator will receive the report. Shirshal is performing as required." Illys nods once, the way a subordinate nods to a superior. None of them work for Shirshal.`;
        G.stageProgress[1]++;
        addJournal('Surveillance revealed magistrate-visitor coordination meetings', 'evidence', `shirshal-stealth-meeting-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A hand lands on your shoulder from behind. Two of the hall's duty wardens — not magistrates, not investigators, people you've never seen working this space before. "You're in a restricted administrative corridor without authorization." The taller one gestures toward the main exit. By the time you clear the outer gate, the east storeroom door is already closed and the meeting you missed is already over.`;
        G.worldClocks.pressure++;
        addJournal('You are caught conducting surveillance in restricted area', 'complication', `shirshal-stealth-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The meeting lasts less than twenty minutes. Documents change hands twice — once arriving, once departing. The visitors initiate and close the exchange; the magistrate waits between their movements. You can't hear the words from this distance, but the posture of the room is legible: one side gives instructions, the other receives them.`;
        addJournal('Surveillance confirmed magistrate-external coordination', 'evidence', `shirshal-stealth-coordination-${G.dayCount}`);
      } else {
        G.lastResult = `The magistrates and their visitors are deliberate about location and timing — never the same corridor twice, never the same hour. You get glimpses: a sealed packet pressed into a hand, a nod across the archive threshold. Enough to know the meetings are happening. Not enough to document what passes in them.`;
        addJournal('Surveillance inconclusive', 'evidence', `shirshal-stealth-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. STEALTH TIER 2: SEALED DOCUMENT CONTENT DISCOVERY
  {
    label: "Access and read sealed documents being exchanged between magistrates and external parties — what are the actual directives?",
    tags: ['Investigation', 'Stealth', 'Documents', 'Secrets', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'accessing sealed communications');
      G.stageProgress[1]++;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The packet contains directive sheets, handwritten in two different hands. One column lists case numbers; beside each, instructions: close, defer, witness unavailable, outcome to be established per regional determination. A header reads "coordination with regional interests." A footer initialed "Coord." and countersigned with a mark you don't recognize — labeled "The House." These aren't procedural notes. They're a schedule of outcomes. Someone outside this hall decided what Shirshal's cases would find before the cases were opened.`;
        G.stageProgress[1]++;
        addJournal('Document access revealed directive instruction network', 'evidence', `shirshal-stealth-directives-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The wax is barely broken when the door opens. Two wardens enter without knocking. One takes the packet from your hands without touching you otherwise. "Breach of sealed documentation is a recorded offense in this jurisdiction." It's delivered without heat. The coldness of the statement is the warning. You're escorted to the outer hall, and someone somewhere is writing your description down.`;
        G.worldClocks.pressure++;
        addJournal('You are caught attempting to access sealed documents', 'complication', `shirshal-stealth-arrest-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Two sheets before you have to pull back: case numbers with notations beside them — "defer," "witness to be managed" — and a reference code at the top of the page that doesn't match any administrative category you've encountered in Shirshal's public registers. Whoever authored these documents didn't intend them for this hall's filing system.`;
        addJournal('Partial document access revealed case direction patterns', 'evidence', `shirshal-stealth-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The packets are never left unattended. Whoever handles them in this hall does so in view of at least one other person at all times. This is not standard practice — it's a protocol someone specifically designed. Getting to the documents would require a distraction you don't currently have a way to arrange.`;
        addJournal('Document access impossible', 'evidence', `shirshal-stealth-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. LORE TIER 1: INVESTIGATIVE LAW AND PROCEDURE CORRUPTION
  {
    label: "Study Shirshal's foundational investigative procedures — have the standards for evidence, witness handling, and case closure been deliberately altered?",
    tags: ['Investigation', 'Lore', 'Law', 'Procedure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'procedure law analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The revisions are spread across three procedural volumes, small enough that each one reads as administrative tidying. But set side by side: witness corroboration used to require multiple independent sources; it now requires one if a magistrate deems it "contextually sufficient." Physical evidence used to require direct verification; documentary substitution is now permitted under "contextual assessment." Case closure used to require completed witness follow-up; it now requires only that the "investigative trajectory is established." Each change is defensible. Together, they convert Shirshal's standard from evidence-required to discretion-sufficient — and someone authored all three within the same six-week period.`;
        G.stageProgress[1]++;
        addJournal('Lore analysis revealed procedural law inversion', 'evidence', `shirshal-lore-procedure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The archive assistant flags your request before processing it. Someone senior is summoned. "Comparative analysis of procedural standards isn't appropriate for external review." Your access level is recorded. The procedural volumes are moved to the restricted section before you leave the building.`;
        G.worldClocks.pressure++;
        addJournal('Your legal procedure research marked as concerning', 'complication', `shirshal-lore-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The procedures have been updated in the last six weeks — evidence standards relaxed, witness thresholds lowered. Each change has a justification note attached: "modernization of process," "efficiency of review." The justification notes are all in the same handwriting.`;
        addJournal('Lore research confirmed procedure revisions', 'evidence', `shirshal-lore-revision-${G.dayCount}`);
      } else {
        G.lastResult = `The procedural texts are dense with cross-reference codes and citation chains. Changes are present — the margin dates confirm recent amendments — but tracing which changes matter and why would take someone with a practitioner's fluency in Shirshal's legal taxonomy. You don't have that yet.`;
        addJournal('Procedure analysis inconclusive', 'evidence', `shirshal-lore-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. LORE TIER 2: TRUTH AND JUSTICE DOCTRINE REFRAMED
  {
    label: "Research Shirshal's foundational doctrine about truth and justice — has the philosophical basis for investigation been corrupted?",
    tags: ['Investigation', 'Lore', 'Philosophy', 'Justice', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'tracing doctrine inversion');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The founding doctrine is carved into the entrance stone: "Truth is the foundation, justice is the purpose." The current teaching document, distributed to magistrates last quarter, reads differently: "Order is the foundation; truth serves order where it can." The revision is not a refinement — it's an inversion. Under the old doctrine, suppressing evidence violated the system's purpose. Under the new one, suppressing evidence that disrupts order becomes the system's purpose. The teaching document is signed by no one.`;
        G.stageProgress[1]++;
        addJournal('Lore analysis revealed philosophical doctrine inversion', 'evidence', `shirshal-lore-doctrine-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A senior clerk intercepts your request to compare the founding doctrine texts. "Doctrinal interpretation is the magistracy's domain. External philosophical debate isn't appropriate here." Your name goes into a log. The foundational text volumes are removed from the open shelf before the morning is out. Someone monitors what questions get asked about Shirshal's principles.`;
        G.worldClocks.pressure++;
        addJournal('Authority discourages your doctrine research', 'complication', `shirshal-lore-discouraged-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The older teaching volumes center on truth as the precondition of justice. The current quarter's materials center on order as the precondition of truth. The shift is framed as maturation of understanding. The older volumes are shelved in the back section. The current materials are displayed at the reading tables.`;
        addJournal('Lore research confirmed doctrine philosophical shift', 'evidence', `shirshal-lore-shift-${G.dayCount}`);
      } else {
        G.lastResult = `The doctrine texts are layered with generations of annotation. The shift in emphasis is there — later hands write about order more than earlier ones do — but without knowing which annotations are authoritative and which are marginal, pinning the change to a specific revision is beyond what you can do from the reading room alone.`;
        addJournal('Doctrine interpretation analysis inconclusive', 'evidence', `shirshal-lore-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. CRAFT TIER 1: EVIDENCE DOCUMENT FORGERY DETECTION
  {
    label: "Examine evidence documents used in recent cases — are official seals and signatures being forged to support predetermined outcomes?",
    tags: ['Investigation', 'Craft', 'Forgery', 'Evidence', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'evidence document analysis');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The closure signatures are reproductions — the ink depth and pressure are uniform where a hand-signed document would show variation in grip and angle. The evidence seals have been duplicated using chemically treated paper; the impression is clean where a wax pull on authentic parchment would show grain resistance. Witness authentication marks carry identical pen spacing across three separate documents supposedly signed on different days. Someone has built a forgery apparatus calibrated specifically to Shirshal's formal document standards — close enough to pass a clerk's review, not close enough to pass this one.`;
        G.stageProgress[1]++;
        addJournal('Craft analysis revealed evidence forgery operation', 'evidence', `shirshal-craft-forgery-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You've held the closure notice for less than a minute when a guard steps into the evidence room. "Formal evidence isn't available for external examination." The document is lifted from your hands, replaced in its sleeve, and re-filed. You're walked to the outer corridor without ceremony. The guard doesn't explain who sent them, but the timing wasn't coincidence.`;
        G.worldClocks.pressure++;
        addJournal('You are removed from evidence area for unauthorized examination', 'complication', `shirshal-craft-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Three documents, compared side by side, show inconsistencies: seal impressions that are too even, signature baseline that doesn't waver the way a hand writing under time pressure would. The forgery is good — it passed the clerks who processed these. It didn't need to be better than that.`;
        addJournal('Craft analysis found evidence of document forgery', 'evidence', `shirshal-craft-alteration-${G.dayCount}`);
      } else {
        G.lastResult = `The documents hold up under everything you can check with your eyes and hands. Either they're genuine, or the forgery was executed by someone who knows exactly what verification looks like in Shirshal's system. You can't rule either out without tools you don't have here.`;
        addJournal('Document authenticity assessment inconclusive', 'evidence', `shirshal-craft-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. CRAFT TIER 2: SEALED CORRESPONDENCE FORGERY
  {
    label: "Examine the sealed correspondence used to direct magistrates — are the official seals authentic, or have they been forged to make directives appear legitimate?",
    tags: ['Investigation', 'Craft', 'Forgery', 'Authority', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'detecting authority credential forgery');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The regional magistrate seals are precise — too precise. Wax impressions from the same die show natural variation from heat and hand pressure; these are identical across four separate letters. The authority signatures are handwriting reproductions: technically convincing, but the pen angle is consistent across all three documents where a single person's signature shifts slightly based on surface and grip. The paper stock is the tell — slightly too white, too even in texture. Contemporary manufacture aged to match regional archive materials. The magistrates of Shirshal are executing directives from an authority that doesn't exist in the form it claims.`;
        G.stageProgress[1]++;
        addJournal('Craft analysis revealed authority credential forgery', 'evidence', `shirshal-craft-seals-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The door opens before you've broken the seal all the way. "Protected magistrate communications." Two people this time — one takes the correspondence, one watches you. A third enters with a form already prepared. The charge is sealed correspondence breach, which carries a recorded status in Shirshal's jurisdiction. They file it efficiently. This was not the first time they've handled this.`;
        G.worldClocks.pressure++;
        addJournal('You are formally charged with sealed correspondence violation', 'complication', `shirshal-craft-charged-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The seals are close — very close — but two of the four show identical impression depth on details that should vary with application angle. The signatures hold up individually but don't match across the three letters the way the same hand would across different writing conditions. The correspondence is designed to pass a first and second check. It doesn't pass a third.`;
        addJournal('Craft analysis found evidence of credential forgery', 'evidence', `shirshal-craft-credentials-${G.dayCount}`);
      } else {
        G.lastResult = `The seals hold. The signatures hold. Whatever tools or knowledge would expose these as forgeries, you don't currently have access to them. The correspondence reads as genuine regional authority — and that's the only conclusion available to you from what's in front of you now.`;
        addJournal('Credential authenticity assessment inconclusive', 'evidence', `shirshal-craft-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 15. STREET RUMOR: CASES DISAPPEARING AND JUSTICE FAILING
  {
    label: "Gather street rumors in Shirshal — what are people saying about cases, investigations, and justice that isn't happening?",
    tags: ['Investigation', 'Rumor', 'Social', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing street-level justice grievance');
      G.stageProgress[1]++;

      const rumor = [
        'cases disappear before they\'re resolved',
        'witnesses are being paid to leave town',
        'magistrates are working for someone outside Shirshal',
        'justice is being sold to the highest bidder',
        'the investigation system is being dismantled from inside'
      ];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `At the market stalls and near the water channel: "${selected}." Some say it like a suspicion; others say it like a fact they've stopped repeating because no one acted on it the first time. The pattern is the same in every mouth — cases disappearing, nothing resolving, Shirshal's hall producing documents but no outcomes. The population is reading the same gaps you are. They just don't have the vocabulary for what's filling them.`;
      addJournal(`Street rumor gathered: "${selected}"`, 'evidence', `shirshal-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. VICTIM TESTIMONY: CASE ABANDONED WITHOUT RESOLUTION
  {
    label: "Find someone whose case was abandoned mid-investigation — someone angry enough to detail exactly what happened to their investigation.",
    tags: ['Investigation', 'Evidence', 'Victim', 'Personal', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'gathering victim testimony');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The merchant speaks at the edge of the dock, away from the stalls. "Theft case. Investigator had suspects, had the documentation. Three weeks in. Then the magistrate marked it resolved." He stops. "Resolved means it's over. Mine isn't over. The suspects weren't charged. My stock wasn't returned. When I went to the hall to ask why, I was told the case was beyond my standing to question." His hands are steady but his jaw isn't. "An investigator worked my case for three weeks and I'm not permitted to know what they found."`;
        G.stageProgress[1]++;
        addJournal('Victim testimony detailed arbitrary case abandonment', 'evidence', `shirshal-victim-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Someone at the hall sees you speaking to the merchant near the dock and relays it up the chain. By the time you return to the main corridor, a clerk is waiting with a short message: soliciting grievances against magistrate determinations "undermines procedural trust." The phrase is specific and pre-written. They've handled this before.`;
        G.worldClocks.watchfulness++;
        addJournal('You are viewed as destabilizing justice by soliciting victim complaints', 'complication', `shirshal-victim-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Three people, separately, at different points in the market. A landlord, a craftsman, a family waiting on a disputed inheritance. Different cases, different magistrates, same pattern: active proceedings closed without resolution, no explanation offered, no right of query. The accounts are uncoordinated but they rhyme precisely.`;
        addJournal('Multiple victim testimonies gathered', 'evidence', `shirshal-victim-testimony-${G.dayCount}`);
      } else {
        G.lastResult = `The people with abandoned cases don't speak readily. The landlord near the grain exchange spots the context of your question and shakes his head without explanation. A woman whose inheritance proceeding was closed gestures you away from her stall. They've been warned — directly or by example — that revisiting their cases invites additional attention from the hall.`;
        addJournal('Victims remain silent about case abandonment', 'evidence', `shirshal-victim-silent-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. INSTITUTIONAL BREAKDOWN: INVESTIGATOR DEFECTION
  {
    label: "Find an investigator who is beginning to question the system — someone willing to provide documentation of how investigations are being suppressed.",
    tags: ['Investigation', 'Evidence', 'Witness', 'Defection', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'turning investigative witness');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Past the tenth bell, the eastern walkway near the archive is empty. Kess has a leather satchel under her arm. "I've been compiling this for two months." She opens it briefly — case files, witness logs, a comparison of pre- and post-closure record entries. "Cases I worked that were closed without my knowledge. Statements I filed that aren't in the current record. Magistrate rulings that contradict the evidence I submitted." She closes the satchel. "I'm leaving Shirshal at dawn. I need someone outside this system to hold what I've documented. Someone they can't reach through the hall's procedures." She waits.`;
        G.stageProgress[1]++;
        addJournal('Investigator defected with system documentation', 'evidence', `shirshal-defection-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The investigator listens, nods once, and reports the conversation before you've left the building. The message reaches the magistracy as a formal notation: "outside party encouraging investigators to breach institutional loyalty." The language is precise and pre-existing — someone wrote that category in advance. The investigator won't meet your eyes in the corridor the next morning.`;
        G.worldClocks.pressure++;
        addJournal('You are reported as attempting to recruit investigator defection', 'complication', `shirshal-defection-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The investigator admits, quietly and without preamble, that they've been keeping notes. "Not formal records. Personal notes." They don't show you. They hold the edge of a pocket where paper crinkles when they move. "I'd need to think about who else sees them." Fear is the word they don't say, but it's present in how long they pause before each sentence.`;
        addJournal('Investigator shows defection potential but hesitates', 'evidence', `shirshal-defection-close-${G.dayCount}`);
      } else {
        G.lastResult = `Every investigator you approach today gives you a version of the same answer: Shirshal's system is sound, procedures are working, they have no concerns to share. The consistency is itself a tell — people with genuine confidence in a system don't use the same phrasing to describe it. Someone has briefed them recently.`;
        addJournal('Investigators remain publicly loyal', 'evidence', `shirshal-defection-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. CONSPIRACY EXPOSURE: SYSTEMATIC JUSTICE WEAPONIZATION
  {
    label: "Compile complete evidence showing Shirshal's justice system has been weaponized — prove that investigations are being systematically suppressed to serve external interests.",
    tags: ['Investigation', 'Proof', 'Systematic', 'Conspiracy', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing justice system conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Laid out on the table in sequence: Sorren's account of missing statements. Thyn's altered anomaly logs. The accelerated closure records. The procedural revisions. The doctrine inversion document. Three sets of forged seals. The directive packet with the Coordinator and The House initials. Elder Marsh's witness suppression account. Kess's collected case files. The thread runs clean from external directive to forged authorization to magistrate execution to falsified outcome. Shirshal's justice system hasn't been corrupted — it's been replaced with a mechanism wearing the same name, built to ensure specific cases never resolve.`;
        G.stageProgress[1]++;
        addJournal('Justice weaponization conspiracy documented', 'evidence', `shirshal-conspiracy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Before you've assembled the final piece, a sealed note arrives at your lodging. No signature. No wax mark. "Leave Shirshal. Do not return. Do not approach magistrates or their staff again. This is the single notification you will receive." Below it, in smaller script: "Shirshal's justice system responds to interference." Someone has been watching the compilation process and chose this moment to confirm it. The warning is timed and precise, which means they know exactly what you have and when you acquired it.`;
        G.worldClocks.pressure++;
        addJournal('Conspiracy orchestrators directly warn you to leave Shirshal', 'complication', `shirshal-conspiracy-threat-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The pattern is legible: forged authorizations, accelerated closures, altered records, witnesses managed out of proceedings. The mechanism is visible across eight separate documentation threads. What's missing is the origin — who issued the directive, where The House operates from, what purpose the suppressed cases serve. The architecture of the corruption is clear. The builders remain outside your current reach.`;
        addJournal('Substantial corruption evidence compiled', 'evidence', `shirshal-conspiracy-substantial-${G.dayCount}`);
      } else {
        G.lastResult = `The individual threads are real — missing statements, altered logs, accelerated closures. But to demonstrate they're connected rather than coincidental, you need the link between the directive packets and the specific case outcomes they produced. That chain is currently missing two nodes.`;
        addJournal('Conspiracy pattern visible but evidence incomplete', 'evidence', `shirshal-conspiracy-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 19. CLUE: SUPPRESSED TAZREN CASE EVIDENCE
  {
    label: "Search the public case archive for the cases that reference Tazren's original ruling — before the doctrine revision that superseded it.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'searching Tazren case precedents');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Fourteen cases in the archive cite the Tazren precedent as their ruling basis. In the past eight months, six of those cases have been re-opened and "re-adjudicated under current doctrine." The re-adjudications consistently reverse the original rulings, transferring property and rights to institutional parties over individual claimants. The precedent isn't being updated — it's being systematically erased case by case, each erasure disguised as a separate legal proceeding.`;
        if (!G.flags) G.flags = {};
        G.flags.found_tazren_case_erasure = true;
        addJournal('Tazren precedent: six re-adjudications reversing original rulings — systematic case-by-case erasure', 'evidence', `shirshal-tazren-cases-${G.dayCount}`);
      } else {
        G.lastResult = `The Tazren citations are there — fourteen of them, clearly marked. But the re-adjudication records sit behind a classification level that requires magistrate sponsorship to access. The shelf label is visible. The cases are listed by number. What happened inside each of them is behind a door you can't currently open.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 20. CLUE: BUREAU GHOST VISITOR RECORDS
  {
    label: "Review the justice hall's visitor log for the past six months — identify visitors who have no corresponding case file.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'identifying Bureau ghost visitors');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `Eight visitors signed the log with institutional affiliations but have no corresponding case filings, hearing appearances, or witness registrations. They visited and were received, but left no official trace of why. Three of the eight signed in on the same days as the re-adjudications that erased Tazren precedent cases. Someone authorized by the institution is directing the re-adjudications without appearing in any case record. They visit, direct, and leave. The visits are the instruction chain.`;
      if (!G.flags) G.flags = {};
      G.flags.found_bureau_ghost_visitors = true;
      addJournal('Bureau ghost visitors: eight untraced institutional visits, three coincide with Tazren erasure re-adjudications', 'evidence', `shirshal-ghost-visitors-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 21. ARCHETYPE-GATED: READING THE JUSTICE HALL
  {
    label: "Sit in the public gallery during an open hearing — read what the proceeding is actually doing.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading justice hall hearing');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The hearing follows procedure precisely. Too precisely — every objection is overruled with the same citation, every ruling uses identical phrasing. This isn't a magistrate making judgments; this is a magistrate executing predetermined outputs. The hearing form is being used as a delivery mechanism for decisions that were made elsewhere.`;
      } else if (arch === 'magic') {
        G.lastResult = `The language of the ruling contains a phrase that doesn't appear in any public doctrine document: "per the administrative continuity resolution." An internal category with no public referent. The ruling cites law that isn't publicly accessible. The magistrate issued it without citation anxiety — they know it exists. It exists somewhere that isn't the public archive.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The losing party's reaction is notable for its absence. No protest, no shock. They expected this outcome. Either they'd been informed privately, or they've seen enough hearings to know the result before they enter. The hall's theater of justice isn't for the parties involved — it's for the record.`;
      } else {
        G.lastResult = `The winning party has a representative seated three rows behind them who takes notes throughout. Not a lawyer — they make no procedural motions. But when the ruling is issued, the representative leaves first. The party follows. Someone off-record is managing this hearing from the public gallery.`;
      }
      addJournal('Justice hall hearing: predetermined outcomes, hidden doctrine citations, off-record management from gallery', 'evidence', `shirshal-hearing-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. FACTION SEED: OVERSIGHT COLLEGIUM LIAISON
  {
    label: "Contact the Oversight Collegium's judicial liaison stationed in Shirshal.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Liaison Parro has been stationed in Shirshal for six months, ostensibly reviewing procedural compliance. "The Collegium has concerns about the rate of re-adjudications," she tells you. "We've flagged it as a compliance monitoring category. We have not yet escalated." She asks detailed questions about the ghost visitor pattern. When you describe the visit-timing correlation with the re-adjudications, she pauses. "That would change the Collegium's escalation timeline." She's careful with her words but the direction is clear: give her the correlation data.`;
        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_shirshal = true;
        G.factionHostility.oversight_collegium += 1;
        addJournal('faction', 'Oversight Collegium liaison Parro: ready to escalate if given ghost visitor correlation evidence', `shirshal-collegium-${G.dayCount}`);
      } else {
        G.lastResult = `The Collegium's reception clerk is pleasant and immovable. Parro's schedule requires a written introduction from a registered party in an active case — no exceptions, no informal arrangements. The procedure isn't hostile; it's just closed. The Collegium doesn't open informally for anyone, which is either integrity or a useful barrier depending on who's trying to get through it.`;
        if (!G.flags) G.flags = {};
        G.flags.located_oversight_collegium_shirshal = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ATMOSPHERE: THE HARBOR AT NIGHT
  {
    label: "Walk Shirshal's harbor at low tide — observe what the port does after the justice hall closes.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing harbor night activity');

      G.lastResult = `Three vessels are moored under low lanterns. Two were impounded in re-adjudicated cases — property transfers currently under "administrative review." Their former owners stand at the pier's edge and watch them. They don't speak to each other. They're watching something they no longer have legal claim to but haven't emotionally released. The harbor holds what the justice hall took.`;
      addJournal('Harbor at night: impounded vessels from re-adjudicated cases — former owners still watching', 'discovery', `shirshal-harbor-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 24. PERSONAL ARC: THE MAGISTRATE WHO REFUSED
  {
    label: "Find the magistrate who refused to issue a re-adjudication and was subsequently 'transferred' out of Shirshal.",
    tags: ['PersonalArc', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'finding transferred magistrate');
      if (!G.flags) G.flags = {};

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Magistrate Corin lives in a coastal village three hours from Shirshal. She was transferred eight months ago. "I refused one re-adjudication," she says. "I told them the doctrine revision didn't grant authority to override settled property rights retroactively. They thanked me for my service and assigned me to here." She has the case files from the refused re-adjudication — she kept copies, which was technically improper. "I thought I might need them someday." Today is that day.`;
        G.flags.met_corin_magistrate = true;
        addJournal('contact', 'Magistrate Corin: refused re-adjudication, transferred, has original case files with her unauthorized copies', `shirshal-corin-${G.dayCount}`);
      } else {
        G.lastResult = `The village knows who she is. Two people point toward the same cottage at the coastal edge without needing to ask for clarification. But neither will walk you to the door. "She doesn't receive strangers," one says. "Not since the reassignment." She'll need to be approached by someone she already trusts, which you are not yet.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 25. SOCIAL: THE DISPOSSESSED SHIPOWNER
  {
    label: "Approach one of the former vessel owners watching their impounded ship from the harbor pier.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'speaking to dispossessed shipowner');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Wend hasn't moved far from the harbor since the re-adjudication six weeks ago. "The verdict said the vessel was 'improperly registered under the terms of the administrative continuity resolution.' I've been operating that vessel for eleven years. Under the same registration. The administration never objected." He pulls out the original registration — valid, unstamped, entirely legal under the laws that were in effect when it was issued. The law changed after he registered it and was applied retroactively.`;
        if (!G.flags) G.flags = {};
        G.flags.met_wend_shipowner = true;
        addJournal('contact', 'Dispossessed shipowner Wend: retroactive law application used to seize property registered under prior law', `shirshal-wend-${G.dayCount}`);
      } else {
        G.lastResult = `Wend watches you approach from the pier's edge and shakes his head before you've said anything. "My advocate told me not to discuss it with anyone outside the formal process." He turns back to the water. The vessel sits thirty feet from where he stands. He isn't going anywhere.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 26. SHADOW RIVAL INTRO
  {
    label: "Magistrate Corin mentions someone visited her two weeks ago — also asking about the refused re-adjudication case.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They introduced themselves as a judicial compliance officer," Corin says. "But they asked about the enforcement chain — who issued the re-adjudication directive, not whether it was legal. They were building a command structure map, not a legal case." Someone is mapping the chain of authority behind the re-adjudications. Not to challenge it — to understand it.`;
      } else if (arch === 'magic') {
        G.lastResult = `"They asked about the 'administrative continuity resolution' — whether I'd ever seen a written version of it," Corin says. "I told them no. They seemed unsurprised. They said: 'That's the interesting part, isn't it?'" Someone already knows the hidden doctrine reference is the key. They're further along the legal analysis than you are.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They knew about the case files before I mentioned them," Corin says. "Asked if I still had them before I'd said I'd kept anything. They already knew I'd kept copies." Someone mapped what Corin would have retained based on her professional profile. They didn't guess — they predicted. Professional research methodology.`;
      } else {
        G.lastResult = `"They were kind," Corin says. "Brought food. Listened for an hour before asking a single question. And the question, when it came, was very precise: 'What would it take for you to testify?' Not to whom. Not where. Just what it would take." Someone is already thinking about using Corin as a witness. They're at the prosecution-building stage already.`;
      }

      G.lastResult += ` This person is ahead of you on the Shirshal thread.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative interviewed Magistrate Corin two weeks before you — further along Shirshal investigation', `shirshal-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.SHIRSHAL_STAGE1_ENRICHED_CHOICES = SHIRSHAL_STAGE1_ENRICHED_CHOICES;
