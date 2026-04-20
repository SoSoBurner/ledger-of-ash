/**
 * ITHTANANALOR STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to martial structure, oath-binding, and honor
 * Generated for: Martial honor vs personal conscience, duty vs individual bond, order vs corruption
 * Each choice: 65-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

const ITHTANANALOR_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. MARTIAL COMMANDER: COMMAND STRUCTURE FRACTURING
  {
    label: "Question the martial commander about recent command decisions — have orders been unusual, or is the hierarchy losing coherence?",
    tags: ['Investigation', 'NPC', 'Observation', 'Military', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'gathering military intelligence');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `The martial commander (Torvin) relaxes after a drink. "The orders are coming from above, but they're not consistent. We're told to maintain garrison positions, but simultaneously told to assign people to tasks that pull them from the line. We're told to prepare for external threat, but the defensive posture is being modified in ways that leave us vulnerable to specific attack angles. It's like someone is deliberately making us weak in exactly the right places. And when I question these orders, I'm told to obey without understanding. Honor demands I follow command, but my honor also demands I protect my soldiers. Something is compromising both."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Commander flagged contradictory and weakening orders', `ithtananalor-commander-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The commander becomes rigid. "I don't discuss military command decisions with civilians. That's operational security." They report your inquiry to the garrison administrative office.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Military command now aware of your inquiry', `ithtananalor-commander-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The commander admits command structure has been under pressure lately, but won't elaborate. "Orders flow from above. We execute them. That's how military honor works." The command hierarchy is keeping something hidden.`;
        addJournal('investigation', 'Commander confirmed command pressure but details refused', `ithtananalor-commander-pressure-${G.dayCount}`);
      } else {
        G.lastResult = `The commander gives standard military responses about chain of command and discipline. No specific pressure emerges.`;
        addJournal('investigation', 'Military command inquiry inconclusive', `ithtananalor-commander-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. HONOR GUARD: OATH-BINDING COMPROMISED
  {
    label: "Interview the honor guard about oath enforcement — have oaths been binding people to unjust commands, or is oath-binding itself being weaponized?",
    tags: ['Investigation', 'NPC', 'Oaths', 'Binding', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering oath corruption');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The honor guard (Elira) is conflicted and speaks quietly. Oaths that have bound soldiers to the garrison for generations are now binding them to specific commanders — not to principle, but to obedience. Traditional oaths that swore soldiers to protect the people have been reworded subtly so they swear obedience to command instead. "The new oath language is clever. It sounds the same. It honors the old traditions. But the binding intent has shifted. People are swearing themselves to serve authority, not justice. And because they're oath-bound, they can't refuse unjust orders. The oath itself has become a weapon."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Honor guard revealed oath language corruption', `ithtananalor-guard-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The honor guard refuses to discuss oath modifications. "That's sacred duty. Your questions are violations of sacred trust." The honor guard considers your inquiry a spiritual insult.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Honor guard considers oath inquiry a sacred violation', `ithtananalor-guard-hostile-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You access oath documentation. Recent variations in oath language show subtle changes that could reframe binding intent, though the modifications are written in archaic legal language that obscures their meaning.`;
        addJournal('investigation', 'Oath documents show language modification patterns', `ithtananalor-guard-modified-${G.dayCount}`);
      } else {
        G.lastResult = `Oath documents are protected and complex. You can see oaths are being administered, but whether language has been deliberately corrupted requires legal expertise.`;
        addJournal('investigation', 'Oath administration inquiry inconclusive', `ithtananalor-guard-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. OATH KEEPER: OATH RECORDS FALSIFIED
  {
    label: "Review oath records with the oath keeper — are binding records being altered, or are new oaths replacing old commitments?",
    tags: ['Investigation', 'NPC', 'Records', 'Binding', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading binding record corruption');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The oath keeper (Mordain) is troubled and speaks carefully. Oath records are being professionally altered. Soldiers who swore traditional oaths to protect justice are having their records modified to show they swore oaths to follow command instead. "I've questioned this. I was told these are administrative corrections to align records with current understanding. But they're not corrections — they're fabrications. Soldiers don't know their oaths have been rewritten. They think they're bound to one thing. They're actually bound to another. The entire oath system is being corrupted from within the records."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Oath keeper revealed systematic oath record falsification', `ithtananalor-keeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The oath keeper is protective of records. "Oath documentation is sacred and secured. You're not authorized to access them." The record system is locked against inquiry.`;
        addJournal('complication', 'Oath keeper refusing record access', `ithtananalor-keeper-silent-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The oath keeper grants limited access to records. You notice some entries show recent modifications, though the specific changes require comparison to archived versions to fully understand.`;
        addJournal('investigation', 'Oath records show recent modification patterns', `ithtananalor-keeper-modified-${G.dayCount}`);
      } else {
        G.lastResult = `Oath records are extensive and protected. You can see they exist and are being maintained, but determining whether falsification has occurred requires more detailed access.`;
        addJournal('investigation', 'Oath record verification inconclusive', `ithtananalor-keeper-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. TRAINING MASTER: DISCIPLINE BECOMING BRUTALITY
  {
    label: "Observe training practices with the training master — has physical discipline escalated beyond martial standards, or is training becoming weaponized?",
    tags: ['Investigation', 'NPC', 'Training', 'Discipline', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing training abuse');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The training master (Kross) shows you the training regimen in detail. Traditional martial discipline is being exceeded. Soldiers are being pushed to breaking points regularly. Recovery periods have been shortened. Pain tolerance training has become systematic infliction. "This isn't martial conditioning anymore," Kross says grimly. "This is breaking people down. Making them compliant through physical exhaustion and systematic suffering. I've trained soldiers for decades. I know the difference between discipline and cruelty. This is cruelty disguised as training. Someone wants the soldiers weakened, traumatized, and obedient."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Training master revealed systematic abuse disguised as discipline', `ithtananalor-trainer-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The training master is defensive about training practices. "That's military business. Your presence is disturbing soldier focus." You're ordered to leave the training grounds immediately.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Training master banned you from training grounds', `ithtananalor-trainer-hostile-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You observe training practices. The intensity is significant, though whether it exceeds normal martial standards is difficult for an outsider to assess. Soldiers seem stressed beyond normal conditioning levels.`;
        addJournal('investigation', 'Training intensity observed as higher than typical', `ithtananalor-trainer-intense-${G.dayCount}`);
      } else {
        G.lastResult = `You observe training regimens. They appear rigorous but within reasonable martial standards, though the training master seems unusually strict about observation protocols.`;
        addJournal('investigation', 'Training observation inconclusive', `ithtananalor-trainer-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. GARRISON CLERK: ROSTER DISCREPANCIES
  {
    label: "Review garrison rosters with the clerk — are soldiers disappearing from records, or are assignments being hidden from standard documentation?",
    tags: ['Investigation', 'NPC', 'Records', 'Personnel', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading personnel disappearance');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The garrison clerk (Helix) is nervous but provides access. Rosters show soldiers assigned to positions that don't officially exist. These soldiers are completely removed from standard garrison documentation — they don't appear on duty rotations, supply manifests, or casualty reports. "I was told to maintain two rosters. The official one for administration, and the hidden one for the actual deployments. These soldiers are being used for something outside the normal command structure. No one's supposed to know they exist. When I asked why, I was told to stop asking and keep the records separate."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Clerk revealed hidden roster of disappeared soldiers', `ithtananalor-clerk-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The clerk refuses access to rosters entirely. "Garrison records are restricted. You need command authorization." The record system is sealed against inquiry.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Garrison clerk refusing record access', `ithtananalor-clerk-blocked-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You access roster data. Some soldiers appear in assignment records but then disappear from active duty rosters without explanation or transfer orders. The discrepancies suggest hidden reassignments.`;
        addJournal('investigation', 'Roster analysis shows unexplained personnel disappearance', `ithtananalor-clerk-disappear-${G.dayCount}`);
      } else {
        G.lastResult = `Rosters are extensive and complex. You can see soldiers are being assigned and reassigned regularly, but determining whether disappearances are intentional requires deeper analysis.`;
        addJournal('investigation', 'Personnel roster analysis inconclusive', `ithtananalor-clerk-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. SUPPLY QUARTERMASTER: WEAPONRY REDISTRIBUTION
  {
    label: "Interview the quartermaster about recent supply movements — are weapons being stored in hidden locations, or is military capability being redistributed?",
    tags: ['Investigation', 'NPC', 'Supply', 'Weaponry', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading supply redistribution');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The quartermaster (Sarn) is deeply conflicted. Weapons are being moved to locations outside the garrison. Official records show them in secured storage, but they're being transported to undocumented locations. "I've been ordered to mark them as 'training surplus' and move them to what I'm told are 'maintenance facilities.' These are not maintenance locations. They're hidden caches. Someone is building an off-books arsenal. The soldiers don't know their equipment is being removed. The garrison is being deliberately disarmed while the hidden force is being armed."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Quartermaster revealed hidden arsenal redistribution', `ithtananalor-quartermaster-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The quartermaster refuses to discuss supply movements. "That's confidential military logistics. I don't discuss it with civilians." The supply system is locked against inquiry.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Quartermaster refusing supply discussion', `ithtananalor-quartermaster-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The quartermaster admits recent supply movements but claims they're normal rotations. The explanation feels incomplete, suggesting hidden movements are occurring.`;
        addJournal('investigation', 'Quartermaster confirmed supply movements but explanation incomplete', `ithtananalor-quartermaster-unusual-${G.dayCount}`);
      } else {
        G.lastResult = `The quartermaster gives technical answers about supply management. No specific redistribution pattern emerges from the conversation.`;
        addJournal('investigation', 'Supply movement inquiry inconclusive', `ithtananalor-quartermaster-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. RITUAL KEEPER: RITUAL CORRUPTED
  {
    label: "Investigate sacred rituals that bind the military structure — have ritual formulas been changed, or is sacred practice being rewritten?",
    tags: ['Investigation', 'NPC', 'Ritual', 'Sacred', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'uncovering ritual corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The ritual keeper (Marin) reveals ritual corruption with deep disturbance. Sacred formulas that bind soldiers to justice are being rewritten. Traditional invocations of honor are being replaced with invocations of obedience. "The old rituals swore soldiers to principle. The new rituals swear them to authority. The difference is hidden in archaic language that sounds traditional but redirects sacred binding toward command instead of conscience. Someone is weaponizing religion. They're using the sacred structure to spiritually bind people to compliance."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Ritual keeper revealed sacred formula rewriting', `ithtananalor-ritual-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The ritual keeper is insulted by the inquiry. "Sacred practice is not subject to interrogation. Your questions violate sanctity itself." The ritual system is now hostile to inquiry.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Ritual keeper offended by sacred practice inquiry', `ithtananalor-ritual-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You access ritual documentation. Some sacred formulas show archaic variations that could represent recent reinterpretation, though the changes are subtle and embedded in traditional language.`;
        addJournal('investigation', 'Ritual documentation shows subtle archaic variation', `ithtananalor-ritual-varied-${G.dayCount}`);
      } else {
        G.lastResult = `Ritual practices are sacred and protected. Whether formulas have been deliberately corrupted requires theological expertise you don't possess.`;
        addJournal('investigation', 'Ritual corruption analysis inconclusive', `ithtananalor-ritual-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. RITUAL AUTHORITY: COMMAND LEGITIMACY COMPROMISED
  {
    label: "Question the ritual authority about command legitimacy — is the chain of authority being spiritually validated, or has legitimate authority been replaced?",
    tags: ['Investigation', 'NPC', 'Authority', 'Legitimacy', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'mapping authority corruption');
      G.stageProgress[1]++;

      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The ritual authority (Daven) is deeply troubled and speaks in confidence. The traditional chain of command has been spiritually replaced. Military hierarchy used to be validated through sacred rituals that confirmed legitimate authority. But the validation process has been corrupted. Current commanders are being spiritually certified as legitimate even though they haven't earned legitimacy through traditional standards. "I'm blessing authority that has no moral foundation. I'm spiritually validating corruption. And when I've tried to refuse, I'm told that questioning the command is questioning faith itself. I'm being used as a tool to make illegitimate authority seem sacred."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Authority revealed spiritual validation of illegitimate command', `ithtananalor-authority-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The ritual authority becomes defensive. "Spiritual validation of authority is sacred. Your questions are questioning faith." They will report your inquiry as a crisis of faith.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Ritual authority reported faith crisis inquiry', `ithtananalor-authority-hostile-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You observe authority validation rituals. Current commanders seem to receive spiritual certification through processes that appear expedited compared to traditional standards.`;
        addJournal('investigation', 'Authority validation ceremonies show expedited patterns', `ithtananalor-authority-expedited-${G.dayCount}`);
      } else {
        G.lastResult = `Ritual validation of authority is sacred and protected. You can see ceremonies are happening, but whether legitimacy is being compromised requires spiritual understanding beyond your expertise.`;
        addJournal('investigation', 'Authority validation analysis inconclusive', `ithtananalor-authority-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. COMBAT TIER 1: DEFENSIVE POSITION ANALYSIS
  {
    label: "Analyze Ithtananalor's defensive positions — are fortifications being modified in ways that weaken protection, or is the garrison architecture being sabotaged?",
    tags: ['Investigation', 'Combat', 'Fortification', 'Defense', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'military structural analysis');
      G.stageProgress[1]++;

      const result = rollD20('perception', (G.skills.perception || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The garrison's defensive architecture reveals intentional degradation. Fortifications that protected key choke points have been structurally weakened. Sightlines that covered approach routes have been deliberately obscured. Weapon placements that would create overlapping defensive fields have been repositioned to create gaps. This isn't natural decay or poor maintenance — this is surgical sabotage. The garrison is being deliberately made vulnerable in specific tactical areas while maintaining appearance of strength in others.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Combat analysis revealed surgical fortification sabotage', `ithtananalor-fortification-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Guards notice your detailed interest in defensive positions. They question your purpose. "We don't allow tactical reconnaissance. Leave the garrison immediately." Military security is now alert to your investigation.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Military security alerted to fortification analysis', `ithtananalor-fortification-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You observe garrison defenses. Some fortifications show recent modification that could represent either maintenance or degradation, and determining which requires more detailed analysis.`;
        addJournal('investigation', 'Fortification modifications observed but purpose unclear', `ithtananalor-fortification-unclear-${G.dayCount}`);
      } else {
        G.lastResult = `The garrison's defensive structure is visible, but the details are beyond your current perception. Whether weakening is intentional or natural remains unclear.`;
        addJournal('investigation', 'Fortification analysis inconclusive', `ithtananalor-fortification-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. COMBAT TIER 2: HIDDEN MILITARY FORCE MAPPED
  {
    label: "Track the hidden military force — where are the disappeared soldiers being deployed, and what command structure are they under?",
    tags: ['Investigation', 'Combat', 'Hidden-Force', 'Command', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'mapping shadow military structure');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `By tracking supply movements, hidden rosters, and off-books weapon caches, you map the hidden force. Disappeared soldiers are being deployed to locations outside the official garrison structure. They're operating under command that doesn't flow through traditional hierarchy. They wear unmarked insignia. They report through communication channels that avoid the main garrison network. This is a shadow military force operating in parallel to the official garrison. They're organized, equipped, and answering to someone other than the traditional command structure. Someone is building a separate army within Ithtananalor.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Military tracking revealed shadow force structure and deployment', `ithtananalor-shadow-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your tracking of the hidden force draws the wrong attention. You're intercepted by unmarked soldiers who warn you against further investigation. They're from the shadow force, and they want you to stop looking.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Shadow force directly warned you away from investigation', `ithtananalor-shadow-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You trace disappeared soldiers through supply chains and hidden assignments. They appear to be deployed to a unified location outside the garrison, though their exact purpose remains hidden.`;
        addJournal('investigation', 'Shadow military deployment zone identified but purpose unclear', `ithtananalor-shadow-deployed-${G.dayCount}`);
      } else {
        G.lastResult = `You find evidence that soldiers are being reassigned, but tracing where they go requires access to information you don't currently have.`;
        addJournal('investigation', 'Hidden force tracking inconclusive', `ithtananalor-shadow-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. LORE TIER 1: OATH BINDING LEGAL ANALYSIS
  {
    label: "Study historical oath law — how have legitimate oaths been reinterpreted, and what legal precedent allows oath corruption?",
    tags: ['Investigation', 'Lore', 'Law', 'Precedent', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'oath legal archaeology');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Oath law reveals layers of manipulation. Traditional oath language swore soldiers to "principle and justice." Recent legal reinterpretation argues that "principle" can be defined by command, making soldiers bound to whatever leadership declares as principle. Precedent is being weaponized. Legal scholars who opposed this reinterpretation have been removed from the precedent councils. The law itself has been corrupted through selective enforcement and strategic removal of opposition scholars. The legal framework that protects oath integrity has been undermined from inside the legal system.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Oath law analysis revealed legal system corruption', `ithtananalor-law-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of oath law draws attention from legal authorities. They question your understanding of proprietary legal precedent and warn you against further legal inquiry.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Legal authorities alerted to oath law analysis', `ithtananalor-law-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You research oath law and find that recent legal reinterpretations have expanded the definition of "principle" in ways that could justify broader command authority.`;
        addJournal('investigation', 'Oath law shows recent broadened interpretation', `ithtananalor-law-expanded-${G.dayCount}`);
      } else {
        G.lastResult = `Oath law is complex and varies by precedent. Whether the legal system has been deliberately corrupted requires expertise in historical precedent you don't currently possess.`;
        addJournal('investigation', 'Oath law analysis inconclusive', `ithtananalor-law-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. PERSUASION TIER 2: COERCION THROUGH OATH
  {
    label: "Investigate how oath-binding is being weaponized to coerce compliance — who is being forced to swear what oaths, and what consequences fall on oath-breakers?",
    tags: ['Investigation', 'Persuasion', 'Coercion', 'Oath-Breaking', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'mapping oath-based coercion');
      G.stageProgress[1]++;

      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Through careful listening, a pattern emerges. Soldiers are being pressured to swear additional oaths beyond traditional binding. These new oaths tie them to specific commanders rather than principle. Those who refuse face public shaming and reassignment to dangerous positions. Those who later attempt to break these oaths face spiritual consequences — they're declared oath-breakers, stripped of rank, and exiled. The oath system has been weaponized to ensure compliance through spiritual coercion. Breaking an oath means losing identity and community. Everyone knows this. Everyone is trapped.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Coercion analysis mapped oath-weaponization for compliance', `ithtananalor-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your questions about oath-based coercion make soldiers extremely anxious. Word spreads that you're asking about oath-breaking. Multiple people distance themselves, fearing association with your inquiry could mark them as potential oath-breakers.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Population distancing from you due to oath-breaking inquiry', `ithtananalor-coercion-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Soldiers admit to being under oath pressure, though most refuse to specify the content of the oaths they've sworn beyond their traditional binding.`;
        addJournal('investigation', 'Oath-based pressure confirmed by soldier interviews', `ithtananalor-coercion-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Soldiers are guarded about oath details. You sense pressure exists but can't map its mechanisms.`;
        addJournal('investigation', 'Oath coercion patterns sensed but not documented', `ithtananalor-coercion-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. INSIGHT TIER 1: MILITARY MORALE COLLAPSE
  {
    label: "Assess military morale and unit cohesion — are soldiers losing faith in command, or is trust in the military structure eroding?",
    tags: ['Investigation', 'Insight', 'Morale', 'Trust', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'military morale analysis');
      G.stageProgress[1]++;

      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The military's psychological state is deteriorating. Soldiers move through their duties mechanically. They avoid making eye contact with officers. Camaraderie that used to bond units is being replaced by isolated compliance. When asked about the future, responses are uniformly hopeless. "We're being broken down," they say quietly. "We swear oaths we don't understand. We see soldiers disappear. We follow orders we know are wrong. And we can't do anything about it because we're oath-bound." This is systematic demoralization. The military structure is being psychologically dismantled from inside while maintaining external appearance of order.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Morale analysis revealed systematic military demoralization', `ithtananalor-morale-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your questions about morale make soldiers deeply uncomfortable. They view your inquiry as diagnostic and report you to the training master.`;
        G.worldClocks.distance++;
        addJournal('complication', 'Soldiers reported your morale assessment as suspicious', `ithtananalor-morale-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You observe that soldiers seem unusually withdrawn. Their confidence in command appears diminished, though the extent is difficult to quantify.`;
        addJournal('investigation', 'Military morale observed as lower than expected', `ithtananalor-morale-low-${G.dayCount}`);
      } else {
        G.lastResult = `Military personnel are stressed, which is normal for a garrison. Whether stress is disproportionate or deliberately engineered is unclear.`;
        addJournal('investigation', 'Military morale assessment inconclusive', `ithtananalor-morale-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. PERCEPTION TIER 2: COMMAND CONSPIRACY REVEALED
  {
    label: "Map the upper command hierarchy — who is directing the oath corruption and shadow military force, and are they answering to authority outside Ithtananalor?",
    tags: ['Investigation', 'Perception', 'Conspiracy', 'Hierarchy', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering command conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('perception', (G.skills.perception || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The command hierarchy reveals coordination beyond Ithtananalor's traditional authority. The garrison commander takes orders from someone outside the military structure. The oath keeper receives directives that override traditional protocols. The shadow military force answers to a hidden authority that communicates through encrypted messages arriving from outside Ithtananalor. Following the chain outward, orders are being issued from an external source — someone with authority to override Ithtananalor's own military establishment. The conspiracy has external direction. This is not internal military corruption; this is external military occupation disguised as internal command.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Command conspiracy revealed external direction of internal sabotage', `ithtananalor-command-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your investigation of the command hierarchy draws direct attention from the shadow force. Officers you're not supposed to know exist confront you. The conspiracy is aware you're piecing things together.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Shadow command directly confronted you about hierarchy mapping', `ithtananalor-command-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You trace command communication patterns and notice directives appear to come from outside traditional Ithtananalor authority channels.`;
        addJournal('investigation', 'Command hierarchy shows external coordination patterns', `ithtananalor-command-external-${G.dayCount}`);
      } else {
        G.lastResult = `The command hierarchy is complex. You can see decisions flow downward, but determining whether external direction exists requires more detailed access.`;
        addJournal('investigation', 'Command hierarchy mapping incomplete', `ithtananalor-command-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 15. STREET RUMOR: MILITARY ANXIETIES
  {
    label: "Gather whispered concerns in the garrison commons — what are soldiers whispering about command decisions and oath-binding?",
    tags: ['Investigation', 'Rumor', 'Gossip', 'Fear', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing soldier anxiety narratives');
      G.stageProgress[1]++;

      const rumor = ['the oath formulas are different from what the old soldiers remember', 'soldiers are disappearing into a hidden unit that answers to someone outside the garrison', 'the commander is taking orders from someone we\'re not supposed to see', 'they\'re breaking people in training and calling it discipline', 'if you speak against the new orders, you\'re declared oath-breaker and exiled'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `The soldier whisper is: "${selected}." It's repeated in barracks conversations, in quiet corners of the commons, in sealed conversations between trusted unit members. The rumor itself is fragmented — soldiers only know pieces — but the collective anxiety is palpable. Ithtananalor's military community knows something is deeply wrong, even if they can't articulate exactly what.`;
      addJournal('investigation', `Street rumor gathered: "${selected}"`, `ithtananalor-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. INSTITUTIONAL CRACK: PROOF OF MILITARY OVERTHROW
  {
    label: "Compile evidence that Ithtananalor's military is being externally controlled — find proof that the command structure has been compromised.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Conspiracy', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing military conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `You piece together documents: orders contradicting traditional command authority. Encrypted messages arriving from external sources. Oath records being falsified to bind soldiers to external authority rather than Ithtananalor's principles. Shadow military rosters maintained separately from official records. Individual pieces could be dismissed, but together they form undeniable proof. Someone with external authority has systematically compromised Ithtananalor's military hierarchy. The garrison is being occupied by an external force disguised as internal command. This is military overthrow, not corruption.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Military coup documentation compiled', `ithtananalor-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you compile evidence, you're intercepted. The conspiracy is aware you're connecting pieces. You're seized and threatened. The evidence remains incomplete, and now you're marked as a critical threat.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation directly noticed by conspiracy operators', `ithtananalor-proof-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `You find enough contradictions to suggest military overthrow. It's compelling enough to shift understanding from "something's wrong" to "the military has been taken."`;
        addJournal('investigation', 'Compelling military conspiracy evidence found', `ithtananalor-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `Individual pieces exist, but without connecting them all, you can't distinguish between normal military restructuring and deliberate overthrow.`;
        addJournal('investigation', 'Evidence fragments found but incomplete', `ithtananalor-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. MORAL PRESSURE: COMPLICITY OR RESISTANCE CHOICE
  {
    label: "Confront a soldier who is participating in the conspiracy — demand explanation and decide whether to protect them or report them.",
    tags: ['Investigation', 'Moral', 'Choice', 'Pressure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'making moral commitment to resistance');
      G.stageProgress[1]++;

      const npcOptions = [
        { name: 'Elira', role: 'honor guard', fear: 'I swore an oath I didn\'t understand. Now I\'m bound to enforce corruption.' },
        { name: 'Sarn', role: 'supply quartermaster', fear: 'I was threatened with reassignment. I moved the weapons. My family is still here.' },
        { name: 'Helix', role: 'garrison clerk', fear: 'I maintain records they told me to keep secret. I don\'t know what I\'m helping do.' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `You confront ${npc.name}. They crumble under pressure. "${npc.fear}" They're afraid, complicit, and trapped. You must decide: Do you expose them to pressure the military into stopping the conspiracy? Do you protect them and maintain your investigation quietly? Your choice determines whether this person becomes an enemy or an ally — and whether Ithtananalor's military begins to resist or sinks deeper into external control.`;

      G.moralChoice = {
        protect: `Offer to shield ${npc.name} if they provide information. Build an informant. Risk becoming complicit yourself.`,
        expose: `Report ${npc.name}'s complicity. Pressure the system. But you'll have made an enemy who might warn the conspiracy.`
      };

      addJournal('moral-choice', `Confronted ${npc.name} (${npc.role}) about complicity in military conspiracy`, `ithtananalor-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. DISCOVERY MOMENT: WRONGNESS CONFIRMED AND ORIGIN REVEALED
  {
    label: "Find the central evidence that confirms external military control — discover who is directing Ithtananalor's military from outside.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of military conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + (G.skills.lore || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Behind the corrupted oaths, the hidden military force, the falsified records — you find the thread that leads out of Ithtananalor. Encrypted messages in a sealed military courier pouch. Directives signed by an authority that doesn't belong to Ithtananalor. Orders bearing insignia from Shelkopolis. Ithtananalor's military has been systematically placed under external command. Someone in Shelkopolis — or someone allied with Shelkopolis — is orchestrating military control of Ithtananalor. They're not trying to destroy the garrison; they're trying to possess it. And the military takeover has only just begun its consolidation.`;
        G.stageProgress[1]++;
        addJournal('major-discovery', 'Origin source of Ithtananalor military conspiracy identified as external Shelkopolis coordination', `ithtananalor-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach the central evidence, you're intercepted. The conspiracy is aware of your investigation and moves to stop you. You're seized and threatened. You've discovered pieces, but the full origin remains hidden — and now you're marked for elimination.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation interrupted by conspiracy operators', `ithtananalor-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points beyond Ithtananalor. Encrypted messages reference external authorities. The conspiracy is coordinated from outside. You don't know the exact source yet, but you know Ithtananalor is under siege by an external military force.`;
        addJournal('major-discovery', 'External coordination of Ithtananalor military conspiracy confirmed', `ithtananalor-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `You find evidence suggesting external coordination, but the origin source remains obscured. Whoever's orchestrating this has hidden their hand carefully through encrypted channels and deniable intermediaries.`;
        addJournal('investigation', 'External coordination suspected but source not yet identified', `ithtananalor-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. SECOND-ORDER EVIDENCE: PATTERN RECOGNITION ACROSS SYSTEMS
  {
    label: "Recognize the pattern connecting oath corruption, military restructuring, and external coordination — understand that all command layers are being compromised simultaneously.",
    tags: ['Investigation', 'Pattern', 'Analysis', 'Command', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'recognizing systematic military capture pattern');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The pattern becomes undeniable. Oaths are being corrupted to bind soldiers to external authority. The military hierarchy is being restructured to replace legitimate command. A shadow force is being built outside accountability. These aren't separate military failures — they're coordinated occupation tactics. When combined, they create total compromise: soldiers are oath-bound to obey external authority, the legitimate command structure is replaced, and a shadow force enforces occupation while claiming to be garrison. It's a military takeover disguised as internal restructuring. Someone has engineered Ithtananalor's complete military capture.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Military systems analysis revealed coordinated occupation engineering', `ithtananalor-pattern-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you compile the pattern analysis, military intelligence notices. You're questioned about why you're developing comprehensive military compromise models.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Your military pattern analysis drew intelligence scrutiny', `ithtananalor-pattern-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You recognize connections between oath corruption, command restructuring, and shadow force development. They don't appear independent; they seem designed to achieve total military control.`;
        addJournal('investigation', 'Military failure connections mapped', `ithtananalor-pattern-connected-${G.dayCount}`);
      } else {
        G.lastResult = `The military compromises appear to be separate issues, though they may be related in ways you can't yet see.`;
        addJournal('investigation', 'Military system pattern analysis inconclusive', `ithtananalor-pattern-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. FINAL CONFRONTATION: UNDERSTANDING THE WRONGNESS
  {
    label: "Synthesize all evidence into complete understanding — Ithtananalor's military is being systematically occupied by external forces for a purpose beyond simple conquest.",
    tags: ['Investigation', 'Synthesis', 'Understanding', 'Occupation', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'achieving military occupation understanding');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + (G.skills.lore || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Everything connects. Oaths are being corrupted deliberately. The command hierarchy is being replaced deliberately. A shadow military force is being built deliberately. The traditional garrison is being made complicit through oath-binding. Someone is not just attacking Ithtananalor's military — they're absorbing it. The soldiers are being systematically transformed from defenders of Ithtananalor into tools of an external force. The military isn't being conquered; it's being converted. And this same process is likely being replicated in other garrisons. Ithtananalor isn't a victory; it's a proof of concept for systematic military occupation. The real expansion is just beginning.`;
        G.stageProgress[1]++;
        addJournal('major-discovery', 'Ithtananalor military understood as proof of concept for systematic military conversion', `ithtananalor-understanding-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach full understanding, you're stopped. The shadow military force doesn't want you to complete this synthesis. You're confronted and threatened. Your investigation has endangered something critical to their occupation.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Final understanding synthesis blocked by shadow force threat', `ithtananalor-understanding-stopped-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points toward Ithtananalor being used as an experimental model for external military occupation. Once perfected here, the methods will be replicated elsewhere. You don't have complete certainty, but the pattern is compelling.`;
        addJournal('major-discovery', 'Ithtananalor as experimental military occupation model suspected', `ithtananalor-understanding-experimental-${G.dayCount}`);
      } else {
        G.lastResult = `You have pieces of understanding, but the full picture remains partially obscured. The ultimate purpose behind the military occupation eludes you still.`;
        addJournal('investigation', 'Occupation purpose not yet fully revealed', `ithtananalor-understanding-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  }
];
window.ITHTANANALOR_STAGE1_ENRICHED_CHOICES = ITHTANANALOR_STAGE1_ENRICHED_CHOICES;
