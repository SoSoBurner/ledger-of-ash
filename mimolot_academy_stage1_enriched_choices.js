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
        G.lastResult = `The senior librarian (Theron) relaxes after initial caution. "Research access is being restricted by decree, but the decree didn't come from the scholarly council. It came from administrative authority — someone claiming it's for 'knowledge security.' But it's not securing knowledge; it's hiding it. Scholars who try to research certain topics are being redirected to other projects. Those who push back are quietly reassigned to cataloging work. We're being prevented from asking certain questions, and we can't explain why to ourselves or each other."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Librarian flagged unauthorized research restriction authority', `mimolot-librarian-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The librarian becomes protective of research access policies. "These restrictions protect the integrity of scholarship. I can't discuss them with outsiders." They report your inquiry to the archive guardian.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Archive staff now aware of your inquiry', `mimolot-librarian-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The librarian admits that research access has been modified, but claims it's for administrative efficiency. The explanation feels incomplete, suggesting hidden restrictions are occurring.`;
        addJournal('investigation', 'Librarian confirmed research access changes but details incomplete', `mimolot-librarian-modified-${G.dayCount}`);
      } else {
        G.lastResult = `The librarian gives standard answers about managing research priorities. No specific restriction emerges from the conversation.`;
        addJournal('investigation', 'Research restriction inquiry inconclusive', `mimolot-librarian-blocked-${G.dayCount}`);
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
        G.lastResult = `A research scholar (Dalmir) speaks carefully in a private study. Certain research lines have been quietly shut down. Scholars investigating regional political corruption have been reassigned. Those studying economic systems that challenge current authority have been told their work is "not aligned with institutional priorities." Those researching historical precedent for challenging authority are being watched. "It's not open suppression. It's subtle redirection. But the intent is clear: Don't ask questions about whether authority is legitimate. Don't research whether corruption exists. Don't find historical precedent for resistance." The Academy is being used to prevent truth-seeking.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Scholar revealed systematic research topic suppression', `mimolot-scholar-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The scholar becomes instantly cautious. "I don't discuss research restrictions with outsiders. That's internal Academy business." They stop talking and file a notice about the conversation.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Scholar filed notice of your suppression inquiry', `mimolot-scholar-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You speak with scholars who acknowledge that some research directions are being discouraged, though most won't specify which topics are affected.`;
        addJournal('investigation', 'Scholars confirmed research discouragement patterns', `mimolot-scholar-discouraged-${G.dayCount}`);
      } else {
        G.lastResult = `Scholars are guarded about discussing their research. You sense restrictions exist but can't map their specific targets.`;
        addJournal('investigation', 'Research suppression inquiry inconclusive', `mimolot-scholar-blocked-${G.dayCount}`);
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
        G.lastResult = `The archive guardian (Sevik) is deeply conflicted and speaks quietly. Sealed archive sections are expanding. Documents that used to be available to senior scholars are being moved into sealed storage. The justification is always "dangerous knowledge" or "institutional security," but the pattern is consistent: information that challenges authority is being locked away. "Someone is systematically removing inconvenient truths from where scholars can access them. The sealed sections contain documentation of past institutional failures, records of authority overreach, historical precedent for reform. All of it is disappearing into restricted storage that only a few administrators can access."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Guardian revealed systematic knowledge lockdown expansion', `mimolot-guardian-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The archive guardian is protective of sealed sections. "Those archives are restricted by institutional mandate. Your curiosity is inappropriate." The archive system is now closed against inquiry.`;
        addJournal('complication', 'Archive guardian blocking archive access', `mimolot-guardian-silent-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The guardian admits that sealed archives are expanding but claims it's for document preservation purposes. The explanation feels like justification rather than reason.`;
        addJournal('investigation', 'Guardian confirmed archive expansion but explanation questionable', `mimolot-guardian-expanding-${G.dayCount}`);
      } else {
        G.lastResult = `The guardian gives standard answers about managing archival security. No specific expansion pattern emerges.`;
        addJournal('investigation', 'Archive expansion inquiry inconclusive', `mimolot-guardian-blocked-${G.dayCount}`);
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
        G.lastResult = `The knowledge archivist (Kensa) shows you documentation with careful detail. Historical records are being professionally altered. Scholarly analysis of past institutional failures is being revised to show those failures didn't actually happen or were less significant than originally documented. Records of authority overreach are being edited to remove the most damaging details. "It's sophisticated work," Kensa explains. "The alterations maintain surface consistency with the original documents while changing the actual content. Scholars comparing current records to historical manuscripts will find discrepancies. And when they do, they'll be told the manuscripts were transcribed incorrectly." The historical record itself is being corrupted.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Archivist revealed systematic historical record falsification', `mimolot-archivist-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The knowledge archivist refuses to discuss documentation practices. "Archive methodology is sensitive institutional matter. I can't show historical records to outsiders." The archival system is sealed.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Knowledge archivist blocking historical record access', `mimolot-archivist-blocked-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You access historical documentation. Some records show signs of revision or editing, though the specific alterations require comparison to earlier versions to fully identify.`;
        addJournal('investigation', 'Historical records show signs of revision patterns', `mimolot-archivist-revised-${G.dayCount}`);
      } else {
        G.lastResult = `Historical records are extensive and carefully maintained. Determining whether alterations have been made requires access to multiple versions and expert comparison.`;
        addJournal('investigation', 'Historical record verification inconclusive', `mimolot-archivist-unclear-${G.dayCount}`);
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
        G.lastResult = `The student administrator (Maris) is troubled and speaks carefully. Enrollment patterns are being deliberately shaped. Certain students are being discouraged from researching critical analysis or institutional history. Those from non-privileged backgrounds are being steered toward service roles rather than scholarship. Those showing aptitude for questioning authority are being quietly blocked from advanced research programs. "We used to have open enrollment. Talented students could pursue whatever research called to them. Now there's subtle steering. Students don't realize their paths are being constrained. They think they're making free choices. They're not. The Academy is selecting which minds are allowed to develop critically."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Administrator revealed systematic student enrollment restriction', `mimolot-admin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The administrator becomes protective of enrollment data. "Student records are confidential. I can't discuss enrollment patterns with outsiders." The enrollment system is sealed.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Student administrator alerted to enrollment inquiry', `mimolot-admin-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You review enrollment data. Some patterns show potential steering toward specific disciplines, though whether the patterns are intentional or natural preferences is unclear.`;
        addJournal('investigation', 'Enrollment patterns show potential steering', `mimolot-admin-steered-${G.dayCount}`);
      } else {
        G.lastResult = `Enrollment data is complex. Students choose different paths, but determining whether choices are being manipulated requires deeper analysis.`;
        addJournal('investigation', 'Student enrollment inquiry inconclusive', `mimolot-admin-unclear-${G.dayCount}`);
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
        G.lastResult = `The restriction keeper (Vorin) speaks with quiet despair. Materials are classified as "dangerous knowledge" through a process that's become systematized and weaponized. Documentation of corruption is classified as "dangerous to institutional stability." Records of authority failure are "dangerous to public confidence." Historical precedent for reform is "dangerous to social order." "It's all justified as protection," Vorin says. "But it's protection of authority, not protection of the people. Every suppressed document is something that could challenge power. The classification system has become a mechanism for hiding inconvenient truth."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Keeper revealed weaponized knowledge classification system', `mimolot-keeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The restriction keeper refuses to discuss classified materials. "That information is restricted for reasons beyond your clearance. Your questions are inappropriate." The keeper reports your inquiry.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Restriction keeper reported your classification inquiry', `mimolot-keeper-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The keeper admits that materials are classified as dangerous, though they're guarded about the specific criteria used for classification.`;
        addJournal('investigation', 'Keeper confirmed materials classified as dangerous knowledge', `mimolot-keeper-classified-${G.dayCount}`);
      } else {
        G.lastResult = `The keeper gives standard answers about dangerous materials being restricted. No specific pattern emerges.`;
        addJournal('investigation', 'Knowledge classification inquiry inconclusive', `mimolot-keeper-blocked-${G.dayCount}`);
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
        G.lastResult = `The curation master (Aldis) shows you collection data with careful analysis. The Academy's knowledge collection has been deliberately shaped. Works challenging authority are underrepresented. Historical texts showing institutional failure are "out of print" and not replaced. Contemporary scholarship questioning power structures has stopped being acquired. "The collection used to be comprehensive," Aldis explains. "We would acquire everything relevant to our fields. Now there's a filter. Anything that challenges authority is quietly excluded. The result is a collection that appears balanced but actually only presents approved perspectives. Scholars using these materials will reach conclusions that authority supports."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Curator revealed systematic ideological bias in collection development', `mimolot-curator-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The curation master is protective of collection decisions. "Acquisition policy is internal Academy business. Your questions about collection development are inappropriate." The curation system is sealed.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Curation master offended by collection bias inquiry', `mimolot-curator-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You review acquisition data. Some gaps in coverage are noticeable, particularly in areas that might challenge institutional perspectives.`;
        addJournal('investigation', 'Collection development shows pattern gaps in critical perspectives', `mimolot-curator-gaps-${G.dayCount}`);
      } else {
        G.lastResult = `Collection acquisition is complex. Determining whether gaps represent bias or natural preference requires detailed analysis of acquisition criteria.`;
        addJournal('investigation', 'Collection bias analysis inconclusive', `mimolot-curator-unclear-${G.dayCount}`);
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
        G.lastResult = `A verification scribe (Theron) confides in you carefully. The verification process has been compromised. Scribes are being pressured to approve documentation that contradicts evidence. When they flag discrepancies, they're told "institutional needs sometimes require flexibility with detail." Some scribes have been reassigned when they refused to approve false verification. Others have been threatened with loss of scholarly standing. "The verification system was supposed to ensure truth. Now it's being used to legitimize lies. We're being forced to validate false narratives with official institutional authority. Truth verification has become a tool of deception."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Scribe revealed truth verification system weaponization', `mimolot-scribe-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The verification scribe is offended by questions about verification integrity. "The verification process is beyond question. Your doubts are insulting." They file a complaint about your inquiry.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Verification scribe filed complaint about integrity inquiry', `mimolot-scribe-hostile-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You speak with scribes who admit to pressure regarding verification standards, though most won't specify which verifications have been compromised.`;
        addJournal('investigation', 'Scribes confirmed pressure on verification standards', `mimolot-scribe-pressure-${G.dayCount}`);
      } else {
        G.lastResult = `Scribes are guarded about verification processes. You sense pressure exists but can't map its extent.`;
        addJournal('investigation', 'Verification integrity inquiry inconclusive', `mimolot-scribe-unclear-${G.dayCount}`);
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
        G.lastResult = `Academic precedent reveals framework manipulation. The interpretive methods used to evaluate evidence have been quietly revised. Criteria that used to allow challenging authority are now classified as "non-rigorous." Standards for criticism of institutional decisions have been raised to impossible heights. Burden of proof for challenging power has been shifted from "authority must justify decisions" to "critics must disprove authority." The result is that challenging authority becomes academically impossible because the framework has been designed to exclude that analysis. Scholars using these frameworks will reach only approved conclusions.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Precedent analysis revealed framework manipulation', `mimolot-precedent-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of academic precedent draws attention from senior scholars who question your interpretations and suggest your framework is outdated.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Senior scholars questioned your analytical framework', `mimolot-precedent-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You analyze academic precedent and notice some shifts in interpretive frameworks, though whether the changes represent evolution or manipulation is unclear.`;
        addJournal('investigation', 'Precedent shows interpretive framework shifts', `mimolot-precedent-shifted-${G.dayCount}`);
      } else {
        G.lastResult = `Academic precedent is complex and evolves over time. Determining whether changes represent intentional manipulation requires deeper historical analysis.`;
        addJournal('investigation', 'Academic precedent analysis inconclusive', `mimolot-precedent-unclear-${G.dayCount}`);
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
        G.lastResult = `Magical research documentation shows systematic suppression. Spells that allow independent magical power have been reclassified as "dangerous." Theories that expand personal magical autonomy have been marked as restricted research. "The restriction is always framed as safety," explains an arcanist you speak with quietly. "But it's control. Someone is making sure that magical knowledge can't be used to challenge authority. The restricted spells are the ones that empower individual will. The suppressed theories are the ones that would make people less dependent on institutional magical guidance." Arcane knowledge is being controlled as a tool of power.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Arcane analysis revealed magical knowledge weaponization', `mimolot-arcana-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your research into magical knowledge suppression draws the attention of the arcane council. They question your investigation and restrict your access to magical archives.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Arcane council restricted your research access', `mimolot-arcana-blocked-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You access arcane research documentation. Some magical theories show restricted classification, particularly those related to personal magical autonomy.`;
        addJournal('investigation', 'Arcane knowledge shows autonomy-related restrictions', `mimolot-arcana-restricted-${G.dayCount}`);
      } else {
        G.lastResult = `Magical research is protected and complex. Determining whether restrictions represent safety protocols or knowledge suppression requires arcane expertise.`;
        addJournal('investigation', 'Arcane suppression analysis inconclusive', `mimolot-arcana-unclear-${G.dayCount}`);
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
        G.lastResult = `Investigation records reveal systematic monitoring of scholars. Those researching institutional corruption are watched. Those asking questions about authority legitimacy are monitored. Those accessing restricted historical materials are tracked. The monitoring is systematic and coordinated. Some scholars have been quietly reassigned after their monitored research was deemed "inappropriate." Others have been warned that their inquiry topics "concern institutional leadership." The result is that scholars self-censor. They pursue only research they know won't trigger monitoring. Scholarly curiosity is being controlled through surveillance.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Investigation analysis revealed systematic scholar surveillance', `mimolot-investigation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your investigation into scholar monitoring triggers alarms. Administration questions why you're tracking inquiry patterns and warns you against further investigation.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Administration directly warned you against monitoring inquiry', `mimolot-investigation-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You trace inquiry monitoring patterns. Certain research topics do appear to correlate with increased administrative attention.`;
        addJournal('investigation', 'Monitoring patterns show topic-based scrutiny correlation', `mimolot-investigation-monitored-${G.dayCount}`);
      } else {
        G.lastResult = `Inquiry monitoring records are protected. Determining whether monitoring is systematic requires deeper access to administrative data.`;
        addJournal('investigation', 'Scholar monitoring analysis inconclusive', `mimolot-investigation-unclear-${G.dayCount}`);
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
        G.lastResult = `The intellectual climate of the Academy has deteriorated. Scholars move through their research mechanically, pursuing only topics that won't trigger attention. They avoid discussing controversial interpretations. They self-censor their findings. When they do publish, the work reflects institutional perspectives rather than genuine inquiry. "The Academy used to be a place where brilliant minds challenged each other," an older scholar tells you quietly. "Now it's a place where careful minds follow approved paths. We used to think independently. Now we think in approved patterns. Intellectual autonomy has been replaced with intellectual compliance."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Intellectual autonomy analysis revealed systematic thought suppression', `mimolot-autonomy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your questions about intellectual freedom make scholars deeply uncomfortable. They interpret your inquiry as diagnostic of their compliance and distance themselves.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Scholars avoided you due to intellectual freedom inquiry', `mimolot-autonomy-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You observe that scholars seem cautious about independent thinking. Their research appears constrained compared to what genuine intellectual freedom would produce.`;
        addJournal('investigation', 'Intellectual autonomy observed as constrained', `mimolot-autonomy-constrained-${G.dayCount}`);
      } else {
        G.lastResult = `Academic work is complex. Whether scholars are genuinely independent or constrained by hidden pressure is difficult to assess from external observation.`;
        addJournal('investigation', 'Intellectual autonomy assessment inconclusive', `mimolot-autonomy-unclear-${G.dayCount}`);
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
        G.lastResult = `The administrative hierarchy reveals hidden coordination. Research restrictions come from a council that exists outside the traditional scholarly hierarchy. Knowledge access decisions are made by administrators who don't answer to the scholarly community. The Academy's official structure shows scholars in authority, but actual power flows through administrative channels that bypass scholarly input. Following the chain upward, administrative authority appears to take direction from someone beyond the Academy itself. The control structure has been inverted: administration has replaced scholarship as the source of institutional direction.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Administrative hierarchy revealed scholarly authority replacement', `mimolot-hierarchy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your mapping of administrative structure draws attention from institutional authorities. You're questioned about why you're tracking organizational power flows.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Administration noticed your hierarchy mapping', `mimolot-hierarchy-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You trace administrative authority flows. Some decisions appear to bypass traditional scholarly channels, suggesting parallel administrative power exists.`;
        addJournal('investigation', 'Administrative hierarchy shows parallel power structure patterns', `mimolot-hierarchy-parallel-${G.dayCount}`);
      } else {
        G.lastResult = `Administrative structure is complex. Determining whether administrative authority has replaced scholarly authority requires deeper access.`;
        addJournal('investigation', 'Administrative hierarchy analysis inconclusive', `mimolot-hierarchy-unclear-${G.dayCount}`);
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
        G.lastResult = `The external control structure becomes clear. Administrative directives about research restrictions are not coming from the Academy's leadership. They're coming through sealed communications from outside sources. The Academy administration is coordinating with external authority. Following the communication chains, orders originate from somewhere beyond Mimolot Academy — someone with authority to direct the institution's policies without being accountable to the scholarly community. The Academy has been captured. It's being controlled from outside. The knowledge suppression is systematic, coordinated, and directed from an external source.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'External control analysis revealed institutional coordination with outside authority', `mimolot-external-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your investigation of external coordination draws the wrong kind of attention. Administration confronts you and warns that this line of inquiry is threatening to institutional security.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Administration directly warned you away from external control inquiry', `mimolot-external-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You trace communication patterns between Academy administration and outside sources. Some coordination appears to exist, though its extent remains unclear.`;
        addJournal('investigation', 'Administrative coordination with external sources observed', `mimolot-external-coordinated-${G.dayCount}`);
      } else {
        G.lastResult = `External communication patterns exist, but determining whether they represent external control requires deeper access to sealed administrative channels.`;
        addJournal('investigation', 'External control analysis inconclusive', `mimolot-external-unclear-${G.dayCount}`);
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

      G.lastResult = `The scholarly whisper is: "${selected}." It's repeated in private study sessions, in sealed library reading rooms, in conversations between trusted scholars. The rumor itself is fragmented — no one knows the full story — but the collective anxiety is tangible. Mimolot's scholars know something is deeply wrong with the institution's integrity, even if they can't articulate exactly what.`;
      addJournal('investigation', `Street rumor gathered: "${selected}"`, `mimolot-rumor-${G.dayCount}`);

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
        G.lastResult = `You piece together documents: research restriction decrees. Historical record alterations. Truth verification compromises. Student enrollment manipulations. Academic framework revisions designed to exclude challenge. Individual pieces suggest incompetence or poor administration. Together they form undeniable proof of coordination. Someone has systematically corrupted Mimolot Academy's truth function. The institution that was supposed to preserve and disseminate truth is instead suppressing it. This is not institutional failure; this is institutional capture. Knowledge is being weaponized against truth.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Knowledge suppression conspiracy documentation compiled', `mimolot-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you compile evidence, you're intercepted. The conspiracy is aware you're connecting pieces that weren't meant to connect. You're threatened and forced to abandon your investigation. The evidence remains scattered, and now you're marked.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation directly noticed by conspiracy operators', `mimolot-proof-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `You find enough contradictions between stated commitment to truth and documented practices to suggest systematic suppression. It's compelling enough to shift understanding from "something's wrong" to "the Academy has been corrupted."`;
        addJournal('investigation', 'Compelling institutional conspiracy evidence found', `mimolot-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `Individual pieces of evidence exist, but without connecting them all, you can't distinguish between poor administration and deliberate suppression.`;
        addJournal('investigation', 'Evidence fragments found but incomplete', `mimolot-proof-incomplete-${G.dayCount}`);
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

      G.lastResult = `You confront ${npc.name}. They crumble under pressure. "${npc.fear}" They're afraid, complicit, and trapped. You must decide: Do you expose them to pressure the Academy into stopping the suppression? Do you protect them and maintain your investigation quietly? Your choice determines whether this person becomes an enemy or an ally — and whether Mimolot's scholars begin to resist or sink deeper into intellectual compromise.`;

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
        G.lastResult = `Behind the research restrictions, the falsified records, the corrupted verification system — you find the thread that leads out of Mimolot Academy. Sealed orders in an administrative vault, bearing the seal of House Shelk. Directives about which truths can be taught, which knowledge must be suppressed, which perspectives must be eliminated. Mimolot Academy has been captured by external authority. Someone in Shelkopolis is orchestrating the Academy's corruption. They're not trying to destroy the institution; they're trying to own it. They want to use it to shape truth itself. And the capture has only just begun its systematic reshaping of what knowledge survives and what knowledge is erased.`;
        G.stageProgress[1]++;
        addJournal('discovery', 'Origin source of Mimolot knowledge suppression identified as external Shelkopolis House Shelk coordination', `mimolot-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach the central evidence, you're intercepted. The conspiracy is aware of your investigation. You're seized and threatened. You've discovered pieces, but the full origin remains hidden — and now you're marked for silence.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation interrupted by conspiracy operators', `mimolot-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points beyond Mimolot Academy. Administrative orders reference external authority. The conspiracy is coordinated from outside the institution. You don't know the exact source yet, but you know Mimolot is under siege by an external force controlling its knowledge function.`;
        addJournal('discovery', 'External coordination of Mimolot knowledge suppression confirmed', `mimolot-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `You find evidence suggesting external coordination, but the origin source remains obscured. Whoever's orchestrating this has hidden their hand carefully through administrative intermediaries and deniable channels.`;
        addJournal('investigation', 'External coordination suspected but source not yet identified', `mimolot-origin-unclear-${G.dayCount}`);
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
        G.lastResult = `The pattern becomes undeniable. Research is being suppressed to prevent challenge to authority. Historical records are being rewritten to eliminate inconvenient truth. Verification systems are being corrupted to legitimize false narratives. External coordination is directing these attacks on knowledge. These aren't separate institutional failures — they're coordinated knowledge conquest tactics. When combined, they create total narrative control: people can't research truth, can't access historical precedent, and can't distinguish false information from verified knowledge. It's a conquest of truth itself. Someone has engineered Mimolot Academy's complete transformation into a propaganda institution.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Knowledge systems analysis revealed coordinated truth conquest engineering', `mimolot-pattern-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you compile the pattern analysis, institutional authorities notice. You're questioned about why you're developing comprehensive knowledge system compromise models.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Your knowledge pattern analysis drew institutional scrutiny', `mimolot-pattern-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You recognize connections between research suppression, historical rewriting, and verification corruption. They don't appear independent; they seem designed to achieve total narrative control.`;
        addJournal('investigation', 'Knowledge system failure connections mapped', `mimolot-pattern-connected-${G.dayCount}`);
      } else {
        G.lastResult = `The knowledge system compromises appear to be separate issues, though they may be related in ways you can't yet see.`;
        addJournal('investigation', 'Knowledge system pattern analysis inconclusive', `mimolot-pattern-unclear-${G.dayCount}`);
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
        G.lastResult = `Everything connects. Research is being suppressed deliberately. Records are being rewritten deliberately. Verification is being corrupted deliberately. Scholars are being broken into compliance deliberately. Someone is not just attacking Mimolot Academy — they're transforming it. The institution that was supposed to preserve and share truth is being weaponized to suppress and manipulate truth. Knowledge that could empower people to resist is being locked away. Historical precedent that could inspire resistance is being erased. Scholarship itself is being converted into propaganda. And this process is likely being replicated in other academies. Mimolot isn't a loss; it's a proof of concept for systematic knowledge weaponization. The real campaign of intellectual conquest is just beginning.`;
        G.stageProgress[1]++;
        addJournal('discovery', 'Mimolot Academy understood as proof of concept for systematic knowledge weaponization', `mimolot-understanding-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach full understanding, you're stopped. The conspiracy doesn't want you to complete this synthesis. You're confronted and threatened. Your investigation has endangered something critical to their knowledge conquest.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Final understanding synthesis blocked by direct threat', `mimolot-understanding-stopped-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points toward Mimolot being used as a proof of concept for external knowledge weaponization. Once perfected here, the methods will be replicated across the scholarly world. You don't have complete certainty, but the pattern is compelling.`;
        addJournal('discovery', 'Mimolot as experimental knowledge weaponization model suspected', `mimolot-understanding-experimental-${G.dayCount}`);
      } else {
        G.lastResult = `You have pieces of understanding, but the full picture remains partially obscured. The ultimate purpose behind the knowledge conquest eludes you still.`;
        addJournal('investigation', 'Knowledge warfare purpose not yet fully revealed', `mimolot-understanding-incomplete-${G.dayCount}`);
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
        G.lastResult = `The fragments are from a process chemistry text — a study of atmospheric stabilization compounds. The sections redacted in the public catalogue are exactly the sections that would explain the Aurora Crown dome degradation mechanism. Someone didn't just suppress this research — they identified which specific pages needed to be removed to prevent anyone from connecting the compounds to the contamination pattern. The suppression was targeted. Whoever ordered it knew what Aurora Crown was experiencing and knew this text would explain why.`;
        if (!G.flags) G.flags = {};
        G.flags.found_classified_formula_fragments = true;
        addJournal('investigation', 'Restricted formula fragments: targeted redaction matches Aurora Crown contamination mechanism', `mimolot-formula-${G.dayCount}`);
      } else {
        G.lastResult = `The holdings alcove is catalogued but the relevant text boxes are empty — the documents were recently moved to a location marked "administrative review." The movement was logged last week. Someone removed them recently.`;
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
        G.lastResult = `The off-catalogue section holds a two-decade archive of suppressed correspondence between Mimolot Academy and the Principality's administrative council. The most recent bundle — six months old — contains a detailed request from the council to reclassify twenty-three research papers as restricted. The reason given: "content requires administrative context before public dissemination." The papers are all by the same three faculty members. All three are currently on indefinite academic leave.`;
        if (!G.flags) G.flags = {};
        G.flags.found_memory_hall_documents = true;
        addJournal('discovery', 'Memory Hall: council-ordered suppression of 23 papers by three faculty now on leave', `mimolot-memoryhall-${G.dayCount}`);
      } else if (result.total >= 11) {
        G.lastResult = `You get into the off-catalogue reading room but the most relevant bundles are locked behind a second tier of access. You can see the filing structure — enough to know what's there — but you can't read it without the senior endorsement you don't have.`;
      } else {
        G.lastResult = `A faculty member catches you in the Memory Hall's restricted corridor and politely but firmly redirects you. Access denied without showing cause.`;
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
        G.lastResult = `The students in the front rows ask questions; the ones in the back stay silent. Not from disinterest — from calibration. The ones who know when to speak and when to defer have survived the academic climate shifts. The back rows are the ones who've been here through the changes. They've learned which thoughts are currently safe to voice.`;
      } else if (arch === 'magic') {
        G.lastResult = `The lecture text has been recently revised — the binding is new, the pages smell of fresh ink, but the chapter numbering has gaps. Chapters seven, twelve, and fifteen are missing from the public syllabus copy. The students are being taught a curriculum with structural absences they haven't been told about.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Two people in the lecture hall aren't students or faculty — they're auditors. Their note-taking patterns are observational, not educational. They're logging who asks certain questions. One flagged a student for asking about the pre-revision edition of the text. The surveillance of academic inquiry is active and present in this room.`;
      } else {
        G.lastResult = `The instructor pauses three times mid-lecture. Each pause follows a sentence that would, in a less constrained context, lead to a larger point. The pauses are practiced — this instructor knows exactly where the boundaries are and has learned to stop just before them. Knowledge is being trimmed in real time.`;
      }
      addJournal('investigation', 'Academy lecture: knowledge suppression active — auditors present, curriculum has structural gaps, instructors self-censoring', `mimolot-lecture-read-${G.dayCount}`);
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
        G.lastResult = `Liaison Brevard Ashe is reading a volume of administrative law when you find him. His presence at Mimolot is "ongoing materials coordination." He's careful about what he acknowledges but clearly knows about the suppression. "The Warden Order has institutional interests in academic freedom," he says, which means the opposite of what it sounds like. He gives you a secondary contact name — a scholar who left the Academy last year and is "willing to discuss the previous academic environment." Not an endorsement, but a lead.`;
        if (!G.flags) G.flags = {};
        G.flags.met_warden_order_mimolot = true;
        G.factionHostility.warden_order += 1;
        addJournal('faction', 'Warden Order liaison Brevard Ashe: institutional interest in suppression, provided secondary scholar contact', `mimolot-warden-${G.dayCount}`);
      } else {
        G.lastResult = `The liaison is procedurally correct and unhelpful. Formal appointment required for any substantive conversation. The Warden Order's presence at Mimolot is established but gatekept.`;
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

      G.lastResult = `After closing, three faculty members leave through the side gate and don't return. A fourth stays. The lights in the Memory Hall burn until midnight. At tenth bell, a courier arrives at the administrative wing's rear entrance and leaves carrying a sealed case. Mimolot doesn't close — it changes its activity. The official Academy and the real one operate on different schedules.`;
      addJournal('discovery', 'Scriptorium Steps: real Academy activity runs after closing hours — Memory Hall, courier exchange', `mimolot-steps-${G.dayCount}`);
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
        G.lastResult = `Archivist Doss left "voluntarily" eight months ago. She still lives near the Academy — she can't leave; her research materials are locked in storage under administrative hold. "They didn't fire me. They made it impossible to work. No access to my own notes, no publication approvals, no student assignments." She has copies of the suppressed papers. She's been waiting for someone to ask. She'll share them — but not until she's sure you're not carrying the request back to the administrative council.`;
        G.flags.met_doss_suppressed_scholar = true;
        addJournal('contact', 'Archivist Doss: suppressed scholar on leave, has copies of restricted papers, ready to share conditionally', `mimolot-doss-${G.dayCount}`);
      } else {
        G.lastResult = `The scholar has made themselves intentionally hard to find. A neighbor says they moved without forwarding address — though their belongings are still at the old address. They're nearby but not accessible yet.`;
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
        G.lastResult = `Tavin is a third-year materials student who hasn't noticed he's been flagged. He's genuinely excited about the pre-revision text differences — he found an old edition in a used book stall outside the Academy walls. "The original chapter twelve is completely different from what we're taught. It describes a stabilization failure mode that's not in any current curriculum." He doesn't know why. He just knows it's interesting. He has no idea how interesting the auditors find his interest.`;
        if (!G.flags) G.flags = {};
        G.flags.met_tavin_student = true;
        addJournal('contact', 'Student Tavin: has pre-revision edition with original chapter 12, unaware he is under surveillance', `mimolot-tavin-${G.dayCount}`);
      } else {
        G.lastResult = `The student is wary of being approached by a stranger after a lecture. Academic culture here has trained caution into everyone. They move on before you establish enough trust.`;
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
        G.lastResult = `"They asked which papers described weapons applications," Doss says. "Not which papers were suppressed — which ones had tactical or military relevance. I didn't tell them. But they already seemed to know." Someone is cataloguing the suppressed research for its operational value, not its academic value.`;
      } else if (arch === 'magic') {
        G.lastResult = `"Their questions were about process chemistry specifically," Doss says. "They understood the subject well enough to know which sections described scalable applications versus theoretical ones. Expert-level knowledge, using research credentials as cover." Someone with genuine expertise is working this thread. Their interest is professional.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They came twice," Doss says. "First visit: general inquiry, established that I existed and knew the material. Second visit: specific questions about who else had asked. They were building a list of contacts before making a move." Counter-network mapping. They're identifying everyone who knows about the suppression before they take any action.`;
      } else {
        G.lastResult = `"They offered funding," Doss says. "Research grants, publication support, relocation assistance. Everything a scholar in my position would want. It felt generous. It felt too generous." A recruitment attempt masked as academic patronage. Someone is trying to acquire the suppressed research and its custodians through financial leverage.`;
      }

      G.lastResult += ` This person is pursuing the same thread you are — and they have institutional resources you don't.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative contacted Archivist Doss before you — expert-level knowledge, well-resourced', `mimolot-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.MIMOLOT_ACADEMY_STAGE1_ENRICHED_CHOICES = MIMOLOT_ACADEMY_STAGE1_ENRICHED_CHOICES;
