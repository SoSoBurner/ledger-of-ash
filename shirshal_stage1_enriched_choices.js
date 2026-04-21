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
        G.lastResult = `The case clerk (Sorren) is exhausted and conflicted. "I've been filing witness statements for eight years. I know the procedures. Lately, certain statements aren't being filed at all. Magistrates tell me 'the witness recanted privately' or 'the case was resolved out of formal record.' But I took the statement. The witness didn't recant. The cases are being moved off the official record into some other system. And when I ask questions, I'm told not to. Someone is extracting certain cases and witnesses from the formal investigative system. It's like parts of Shirshal's justice are going dark."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Case clerk flagged systematic witness statement removal', `shirshal-witness-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The case clerk becomes guarded. "I don't discuss case procedures with outsiders. That's sensitive investigative information." He stops speaking. Word will likely reach the magistrates that you're asking about case filing.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Case clerk reported your inquiry to magistrates', `shirshal-clerk-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The case clerk admits that case filing procedures have become variable lately. "The magistrates are handling some cases differently," he notes, though he's reluctant to elaborate. Something about the procedures troubles him.`;
        addJournal('investigation', 'Case clerk acknowledged procedure variability', `shirshal-clerk-procedure-${G.dayCount}`);
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
        G.lastResult = `The evidence handler (Master Thyn) is conflicted but complies. The anomaly logs show a pattern: entries from four weeks ago have been rewritten. The descriptions of certain magical incidents are changed. Where old entries documented "arcane signature suggesting external origin," new entries use clinical language: "minor fluctuation within acceptable parameters." More disturbing, certain anomalies are documented as "resolved" before investigation. Someone has been systematically reframing how Shirshal's magical incidents are recorded. The anomalies aren't being investigated — they're being documented away.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Evidence handler revealed anomaly record falsification', `shirshal-evidence-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The evidence handler refuses access entirely. "These records are protected. You need magistrate authorization to examine anomaly documentation." They alert a magistrate. Your attempt to access evidence records is now official concern.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Magistrate alerted to evidence inquiry attempt', `shirshal-evidence-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You gain partial access to the anomaly logs. The documentation has been carefully altered. Certain incidents' descriptions have been changed, and some anomalies are marked as "resolved" without thorough investigation. The record-keeping appears systematically biased.`;
        addJournal('investigation', 'Evidence logs show signs of careful alteration', `shirshal-evidence-altered-${G.dayCount}`);
      } else {
        G.lastResult = `The evidence handler is protective. "These records require formal magistrate authorization. Without it, I cannot show you." Access is blocked.`;
        addJournal('investigation', 'Evidence logs blocked without magistrate authorization', `shirshal-evidence-blocked-${G.dayCount}`);
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
        G.lastResult = `The assistant (Young Kess) speaks carefully. "Case assignments used to follow a rotation. Every magistrate would receive similar case loads. Four weeks ago, the rotation was abandoned. Now specific cases are assigned to specific magistrates by someone higher than me. And it's not random. Complex cases with political implications go to Magistrate Verek. Cases involving merchants from Shelkopolis go to Magistrate Illys. It's like someone is engineering which magistrates handle which cases. The system used to be fair. Now it's choreographed."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Assistant revealed case routing manipulation', `shirshal-routing-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The assistant becomes nervous. "You're asking questions about case assignment? That's internal procedure. The magistrates handle case distribution." She's now anxious about your interest and will likely report this conversation.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Assistant will report case assignment inquiry', `shirshal-routing-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The assistant admits that case assignment procedures have changed. "More centralized now," she says vaguely. The changes seem designed to bypass formal rotation procedures.`;
        addJournal('investigation', 'Assistant confirmed case assignment changes', `shirshal-routing-changed-${G.dayCount}`);
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
        G.lastResult = `The record keeper (Brother Tam) is concerned. "Investigations that should take weeks are being closed in days. Cases marked 'resolved' that I know aren't resolved. The closure documentation is incomplete — missing witness follow-ups, lacking final evidence analysis. But the magistrate's signature is there, authorizing closure. It's like someone is going through investigations and terminating them regardless of status. The families involved aren't notified. The cases just vanish from the active docket. Shirshal's investigations aren't progressing to resolution — they're being stopped."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Record keeper revealed investigation termination pattern', `shirshal-closure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The record keeper becomes alarmed. "You're asking about investigation closures? That's not appropriate for outside inquiry. I need to speak to a magistrate about your questions." They immediately alert official authority.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Record keeper immediately alerts magistrate to inquiry', `shirshal-closure-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The closure records show a striking pattern. Cases are being marked as resolved far faster than should be possible given their complexity. Closure documentation often lacks expected verification steps. The pattern suggests systematic acceleration of case termination.`;
        addJournal('investigation', 'Record review confirmed investigation closure acceleration', `shirshal-closure-accelerated-${G.dayCount}`);
      } else {
        G.lastResult = `The closure records are complex and their interpretation requires deep procedural knowledge. Any pattern is too subtle to identify without extensive reference.`;
        addJournal('investigation', 'Closure pattern analysis inconclusive', `shirshal-closure-unclear-${G.dayCount}`);
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
        G.lastResult = `Investigator Kess is frustrated. "We're being assigned cases with incomplete briefings. Details that should be provided are 'under review' or 'reserved for magistrate eyes.' We investigate without full information, and when we request clarification, we're told the cases are already resolved by higher authority. It's like someone is deliberately preventing investigations from developing. We're given just enough to go through procedural motions, but not enough to actually investigate. I have a case I've been working on for three weeks, and I just learned it was marked 'closed' yesterday without my knowledge."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Investigator revealed information compartmentalization', `shirshal-investigator-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The investigator becomes cautious. "I shouldn't be discussing case details with anyone outside the magistracy. You're asking questions that could compromise investigations." They stop speaking and watch you suspiciously.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Investigator now distrustful of your questions', `shirshal-investigator-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The investigator admits that case briefings have become more restricted lately. "Need-to-know basis now," they say. Some investigators are working on cases with incomplete information.`;
        addJournal('investigation', 'Investigator confirmed information restriction', `shirshal-investigator-restricted-${G.dayCount}`);
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
        G.lastResult = `The witness coordinator (Elder Marsh) speaks with genuine fear. "Witnesses are being contacted before formal testimony and discouraged from participating. People report 'friendly advisors' telling them that testifying could be dangerous or complicated. Some witnesses have simply vanished — they leave Shirshal or claim travel prevents their appearance. And the magistrates accept these absences without investigation. It's systematic. Someone is isolating witnesses and removing them from the investigation process. Without witnesses, there are no cases. Shirshal's investigative system is being dismantled from within."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Coordinator revealed systematic witness removal', `shirshal-witness-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The witness coordinator becomes defensive. "Witness management is sensitive work. Your questions about procedures could compromise investigations." They refuse further discussion and likely report your inquiry.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Coordinator reported witness inquiry to magistrates', `shirshal-witness-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The coordinator admits that witness availability has been problematic lately. "Some witnesses are reluctant to participate," they note vaguely. Witness gaps in recent cases do seem unusually frequent.`;
        addJournal('investigation', 'Coordinator confirmed witness availability issues', `shirshal-witness-issues-${G.dayCount}`);
      } else {
        G.lastResult = `The coordinator is protective of witness procedures. "Witness management requires confidentiality. I can't discuss specific situations."`;
        addJournal('investigation', 'Witness coordinator blocked further inquiry', `shirshal-witness-blocked-${G.dayCount}`);
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
        G.lastResult = `The innkeeper (Keeper Noss) leans close. "Couriers arrive regularly with sealed documents. They meet with magistrates or high-authority visitors and leave additional sealed packages. Different couriers each time, but they're coordinated. Someone is managing communication that bypasses normal channels. The sealed documents are often stored in rooms for only a few hours before being taken by specific individuals. One courier mentioned they come 'from places interested in how Shirshal serves law.' That was all before an official told them not to speak casually. Someone from outside is orchestrating information flow through Shirshal's investigative system."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Innkeeper mapped external courier network', `shirshal-couriers-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The innkeeper becomes cautious. "I don't gossip about guests or their business. That's not how you run an inn." They're now skeptical of you. Future inquiries about message traffic will be met with resistance.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Innkeeper now distrustful of your questions', `shirshal-innkeeper-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The innkeeper mentions sealed messages pass through regularly. "Normal commercial traffic," she says, though she seems uncertain. There is message movement, though its significance isn't clear.`;
        addJournal('investigation', 'Innkeeper acknowledged message traffic', `shirshal-innkeeper-traffic-${G.dayCount}`);
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
        G.lastResult = `Magistrate Verek speaks quietly in a private space. "Yes, there is pressure. Not from Shirshal's leadership, but from something external. Instructions arrive through channels I'm told not to question. We're being directed how to handle specific cases, which investigations to prioritize, which witnesses to accommodate and which to isolate. We're told this is 'system optimization' and 'investigative efficiency.' But it's not. It's systematic interference with justice. Someone with authority — perhaps regional, perhaps higher — is using Shirshal's investigative system to serve purposes I'm not supposed to understand. I'm a magistrate. My authority used to be mine. Now I execute instructions. I'm not sure who I'm serving anymore."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Magistrate revealed external authority control', `shirshal-magistrate-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The magistrate becomes formally hostile. "You are asking inappropriate questions about magistrate operations. This inquiry is now documented. Do not approach the magistracy again without formal request." You are formally warned off.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Magistrate formally prohibits further inquiry', `shirshal-magistrate-warning-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The magistrate is guarded but hints that decisions about cases come from higher authority. "Shirshal serves the broader investigative system," they say, implying pressure from above.`;
        addJournal('investigation', 'Magistrate hinted at external authority influence', `shirshal-magistrate-hint-${G.dayCount}`);
      } else {
        G.lastResult = `The magistrate is professional but closed. "Magistrate operations are internal to Shirshal's hierarchy. I cannot discuss them with outsiders."`;
        addJournal('investigation', 'Magistrate blocked further inquiry', `shirshal-magistrate-blocked-${G.dayCount}`);
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
        G.lastResult = `You observe a private meeting between Magistrate Illys and three visitors from outside. The conversation is quiet, but fragments are audible: "...cases handled according to..." "...witnesses not available..." "...documents prepared as specified." The visitors carry sealed documents they hand to the magistrate. Before leaving, one visitor says: "Report will be forwarded to the coordinator. Shirshal is performing as needed." The magistrate nods submissively. Magistrates are receiving directives and reporting compliance to external overseers.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Surveillance revealed magistrate-visitor coordination meetings', `shirshal-stealth-meeting-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your surveillance is noticed. Someone alerts the magistrates that you're being observed in restricted areas. You're intercepted: "You don't have authority to be here. Leave Shirshal's administrative spaces immediately."`;
        G.worldClocks.pressure++;
        addJournal('complication', 'You are caught conducting surveillance in restricted area', `shirshal-stealth-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You observe what appears to be a coordinated meeting between magistrates and outside visitors. Documents are exchanged, but the specific content isn't audible. Clear coordination exists between internal and external parties.`;
        addJournal('investigation', 'Surveillance confirmed magistrate-external coordination', `shirshal-stealth-coordination-${G.dayCount}`);
      } else {
        G.lastResult = `Your surveillance attempts are difficult. Magistrates and visitors are careful about meeting locations and timing. Specific coordination is hard to verify.`;
        addJournal('investigation', 'Surveillance inconclusive', `shirshal-stealth-unclear-${G.dayCount}`);
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
        G.lastResult = `You access a sealed document package. The contents are directive instructions detailing which cases should be closed, which witnesses should be made unavailable, which investigations should be terminated, and which outcomes should be engineered. The documents reference "coordination with regional interests" and "removal of inconvenient investigations." Names of external parties are used: "Coordinator" and "The House." Shirshal's investigation system is being completely redirected by external authority to suppress specific cases while appearing to operate normally. The magistrates are executing a coordinated plan to control what Shirshal investigates and what remains hidden.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Document access revealed directive instruction network', `shirshal-stealth-directives-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your attempt to access sealed documents is discovered. Guards are alerted immediately. "You are attempting to breach protected documents. This is a serious crime in Shirshal."`;
        G.worldClocks.pressure++;
        addJournal('complication', 'You are caught attempting to access sealed documents', `shirshal-stealth-arrest-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You manage to see portions of sealed document content before having to retreat. The fragments suggest specific case directions and witness handling instructions. Someone is systematically directing Shirshal's investigations through these documents.`;
        addJournal('investigation', 'Partial document access revealed case direction patterns', `shirshal-stealth-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The sealed documents are guarded too carefully to access safely. Any attempt would risk discovery.`;
        addJournal('investigation', 'Document access impossible', `shirshal-stealth-blocked-${G.dayCount}`);
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
        G.lastResult = `The procedural laws show deliberate revision. Historical standards for witness testimony required multiple independent corroboration. New procedures allow "magistrate discretion" to accept single witnesses if "contextually sufficient." Evidence standards used to require physical verification. New procedures permit "documentary substitution" and "contextual assessment." Case closure used to require full investigation completion and witness verification. New procedures allow closure if "investigative trajectory is established." Each change individually seems reasonable. Collectively, they transform Shirshal's justice system from evidence-based to discretion-based. Someone has rewritten investigative law to enable systematic case suppression while maintaining procedural appearance.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Lore analysis revealed procedural law inversion', `shirshal-lore-procedure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your study of investigative procedures is noted as concerning inquiry. "Questioning the legal foundation of Shirshal's justice system is inappropriate for outsiders." Your access to law records is restricted.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Your legal procedure research marked as concerning', `shirshal-lore-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The investigative procedures show signs of revision. Recent updates have loosened standards for evidence and witness handling. The changes appear deliberate but can be justified as "modernization."`;
        addJournal('investigation', 'Lore research confirmed procedure revisions', `shirshal-lore-revision-${G.dayCount}`);
      } else {
        G.lastResult = `The procedural laws are complex. Any intentional revision is too subtle to identify without extensive legal expertise.`;
        addJournal('investigation', 'Procedure analysis inconclusive', `shirshal-lore-unclear-${G.dayCount}`);
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
        G.lastResult = `Shirshal's foundational doctrine stated: "Truth is the foundation, justice is the purpose." Recent doctrine reframes this as: "Order is the foundation, truth is secondary if it preserves order." The inversion is complete. The original doctrine meant justice required truth-seeking. The new doctrine means order can be maintained even if truth is suppressed. Someone has rewritten Shirshal's fundamental philosophy to justify case suppression, witness removal, and investigation termination as serving "necessary order." The entire investigative system has been philosophically inverted from truth-serving to order-serving.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Lore analysis revealed philosophical doctrine inversion', `shirshal-lore-doctrine-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your questioning of Shirshal's justice doctrine draws concern from authority. "The foundation of justice is not appropriate for external philosophical debate. The magistracy provides judicial direction." Further doctrine research is discouraged.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Authority discourages your doctrine research', `shirshal-lore-discouraged-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The justice doctrine has been subtly reframed. Older teachings emphasize truth-seeking. Recent teachings emphasize order maintenance. The philosophical foundation seems to have shifted away from truth-priority.`;
        addJournal('investigation', 'Lore research confirmed doctrine philosophical shift', `shirshal-lore-shift-${G.dayCount}`);
      } else {
        G.lastResult = `The justice doctrine is complex and philosophical interpretation varies. Clear evidence of inversion is elusive.`;
        addJournal('investigation', 'Doctrine interpretation analysis inconclusive', `shirshal-lore-unclear-${G.dayCount}`);
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
        G.lastResult = `The evidence documents show sophisticated forgery. Magistrate signatures on closure notices are reproductions rather than originals. Evidence seals have been duplicated with remarkable accuracy using chemically-treated paper and ink. Witness statement authentications show duplicate-quality writing. Someone has created a complete evidence forgery operation to support predetermined investigation closures. The forged documents appear authentic enough to stand in formal record, enabling the suppression and rewriting of investigative outcomes without obvious detection.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Craft analysis revealed evidence forgery operation', `shirshal-craft-forgery-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your examination of evidence documents is interrupted. A magistrate's guard confronts you: "You don't have authority to examine formal evidence. Stop immediately." You're removed from the evidence area.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'You are removed from evidence area for unauthorized examination', `shirshal-craft-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The evidence documents show signs of sophisticated alteration. Official seals and signatures have subtle inconsistencies. Documents may have been forged to support case outcomes.`;
        addJournal('investigation', 'Craft analysis found evidence of document forgery', `shirshal-craft-alteration-${G.dayCount}`);
      } else {
        G.lastResult = `The evidence documents appear authentic. Any forgeries are too sophisticated to detect without specialized analysis.`;
        addJournal('investigation', 'Document authenticity assessment inconclusive', `shirshal-craft-unclear-${G.dayCount}`);
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
        G.lastResult = `The sealed correspondence shows professional credential forgery. Regional magistrate seals are reproduced with remarkable precision. Authority signatures are imitated using handwriting analysis and careful replication. But under close examination, the paper stock differs subtly from genuine regional correspondence. The inks are contemporary forgeries of historical materials. Someone has created forged "authority directives" to make it appear legitimate guidance comes from higher magistracy. The magistrates are following instructions that appear to originate from official authority but are actually forgeries designed to mimic legitimate directives.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Craft analysis revealed authority credential forgery', `shirshal-craft-seals-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your examination of sealed correspondence is discovered. "You are examining protected magistrate communications. This is a serious violation." You're immediately removed and formally charged with breach.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'You are formally charged with sealed correspondence violation', `shirshal-craft-charged-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The sealed correspondence shows signs of sophisticated forgery. Authority seals have subtle inconsistencies. The documents appear designed to mimic official directives while containing subtle imperfections.`;
        addJournal('investigation', 'Craft analysis found evidence of credential forgery', `shirshal-craft-credentials-${G.dayCount}`);
      } else {
        G.lastResult = `The sealed correspondence appears authentic. Any forgeries are beyond detection without highly specialized analysis.`;
        addJournal('investigation', 'Credential authenticity assessment inconclusive', `shirshal-craft-unclear-${G.dayCount}`);
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

      G.lastResult = `The street whisper is: "${selected}." Different people speak it with different levels of certainty, but the pattern is clear. Shirshal's population is noticing that investigations are stalling, cases are closing without resolution, and justice isn't happening. People feel the system is being corrupted but can't articulate exactly how.`;
      addJournal('investigation', `Street rumor gathered: "${selected}"`, `shirshal-rumor-${G.dayCount}`);

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
        G.lastResult = `A merchant speaks with careful rage. "My business was targeted by theft. The investigator was working the case — they had suspects and evidence. Then the magistrate closed the investigation. Called it 'resolved.' But nothing was resolved. The suspects were never charged. My goods were never recovered. When I demanded explanation, I was told the case was beyond my authority to question. The magistrate wouldn't explain the closure. The investigator wouldn't meet with me. My case just vanished. This wasn't justice — this was the investigation system being used to suppress my complaint."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Victim testimony detailed arbitrary case abandonment', `shirshal-victim-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your attempt to gather victim testimony is seen as improper. "You're encouraging complaints against magistrate decisions? That's destabilizing." Word spreads that you're undermining Shirshal's justice system.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'You are viewed as destabilizing justice by soliciting victim complaints', `shirshal-victim-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You find victims willing to describe their abandoned cases. Their testimonies are compelling but individual. Collectively, they show a pattern of arbitrary case closure without resolution.`;
        addJournal('investigation', 'Multiple victim testimonies gathered', `shirshal-victim-testimony-${G.dayCount}`);
      } else {
        G.lastResult = `Victims of abandoned cases are reluctant to speak about their investigations. They're wary of further interaction with the magistracy.`;
        addJournal('investigation', 'Victims remain silent about case abandonment', `shirshal-victim-silent-${G.dayCount}`);
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
        G.lastResult = `Investigator Kess pulls you aside late at night. "I can't work in this system anymore. I have documentation. Cases I investigated that were closed without investigation. Witness statements that disappeared from records. Magistrate decisions that didn't match the evidence. Someone is systematically engineering specific outcomes regardless of actual findings. I've documented the pattern. I can prove cases are being predetermined and investigations are being terminated to achieve those predetermined outcomes. But I need to give this to someone outside the magistracy. Someone they can't intimidate or control. I'm leaving Shirshal. Will you take what I've documented?"`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Investigator defected with system documentation', `shirshal-defection-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your attempt to convince an investigator to leave the system is noticed. They report your approach to the magistrates: "This person is trying to turn investigators against the system. They're actively recruiting defection."`;
        G.worldClocks.pressure++;
        addJournal('complication', 'You are reported as attempting to recruit investigator defection', `shirshal-defection-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `An investigator admits to private doubts about system integrity. They hint at documentation but won't commit to defection. Fear is holding them back, but they're close to breaking.`;
        addJournal('investigation', 'Investigator shows defection potential but hesitates', `shirshal-defection-close-${G.dayCount}`);
      } else {
        G.lastResult = `Investigators are publicly loyal to the system. No one admits to private doubts, even confidentially.`;
        addJournal('investigation', 'Investigators remain publicly loyal', `shirshal-defection-blocked-${G.dayCount}`);
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
        G.lastResult = `You compile comprehensive evidence: witness testimony removal documentation, investigation closure patterns, procedure law reversions, doctrine philosophical inversions, evidence forgery proof, authority credential forgeries, victim testimonies, investigator documentation. Together, they prove complete weaponization. Shirshal's justice system has been infiltrated by external authority. Magistrates are executing predetermined case outcomes. Procedures have been inverted to enable suppression. Doctrine has been rewritten to justify injustice as order-serving. Evidence is being forged. Witnesses are being removed. Investigations are being terminated. The entire system has been systematically repurposed from serving justice to serving an external agenda that requires cases to remain unsolved and investigations to fail.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Justice weaponization conspiracy documented', `shirshal-conspiracy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your compilation of evidence is detected. Someone realizes you're building proof of system corruption and moves to stop you. You're warned with finality: "Leave Shirshal. Do not return. Do not contact investigators or magistrates. If you persist, Shirshal's justice system will respond."`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Conspiracy orchestrators directly warn you to leave Shirshal', `shirshal-conspiracy-threat-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You compile substantial evidence of systematic corruption. The pieces align to show deliberate justice system weaponization. The conspiracy is visible but details remain incomplete.`;
        addJournal('investigation', 'Substantial corruption evidence compiled', `shirshal-conspiracy-substantial-${G.dayCount}`);
      } else {
        G.lastResult = `Individual evidence exists but assembling it into complete conspiracy proof requires evidence you don't yet have.`;
        addJournal('investigation', 'Conspiracy pattern visible but evidence incomplete', `shirshal-conspiracy-partial-${G.dayCount}`);
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
        addJournal('investigation', 'Tazren precedent: six re-adjudications reversing original rulings — systematic case-by-case erasure', `shirshal-tazren-cases-${G.dayCount}`);
      } else {
        G.lastResult = `You find the Tazren citations but the re-adjudication records aren't in the public archive — they're filed under a classification level you don't have access to without a magistrate's sponsorship.`;
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
      addJournal('investigation', 'Bureau ghost visitors: eight untraced institutional visits, three coincide with Tazren erasure re-adjudications', `shirshal-ghost-visitors-${G.dayCount}`);
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
      addJournal('investigation', 'Justice hall hearing: predetermined outcomes, hidden doctrine citations, off-record management from gallery', `shirshal-hearing-read-${G.dayCount}`);
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
        G.lastResult = `The liaison is formally inaccessible without a written introduction from a registered party in an active case. The Collegium process requires proper procedural entry.`;
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
      addJournal('discovery', 'Harbor at night: impounded vessels from re-adjudicated cases — former owners still watching', `shirshal-harbor-${G.dayCount}`);
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
        G.lastResult = `The village residents know of a former magistrate but she's been careful about contact with strangers since the transfer. She won't receive you without a warm introduction.`;
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
        G.lastResult = `The former owner has been warned about speaking to strangers regarding their case. Legal advice they've received tells them talking to outsiders could jeopardize any appeal. They stay silent.`;
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
