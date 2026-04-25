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
        G.lastResult = `Torvin waits until the cup is half empty before speaking. His voice drops to the register of someone watching the door. "Orders contradict each other. Hold the line, then pull three soldiers off the line for unspecified duties. Prepare for external threat, then reposition the northern gate coverage in a way that leaves a specific approach angle open." He sets the cup down. "When I flag the discrepancy up the chain, I'm told compliance is sufficient. I've commanded this garrison for nine years. I know the difference between orders under pressure and orders with a purpose I'm not meant to understand."`;
        G.stageProgress[1]++;
        addJournal('Commander flagged contradictory and weakening orders', 'evidence', `ithtananalor-commander-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The commander's posture shifts before the second question is finished. "Command decisions aren't civilian business. That is operational security." He stands and opens the office door. The inquiry is reported to garrison administration within the hour. Whatever record exists of your visit now has an official annotation attached to it.`;
        G.worldClocks.pressure++;
        addJournal('Military command now aware of your inquiry', 'complication', `ithtananalor-commander-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The commander acknowledges pressure in the command structure without naming a source. "Orders come down. We execute them. That's the structure." He doesn't move toward the door, but he doesn't continue either. The answer has been chosen in advance — specific enough to acknowledge the question, empty enough to say nothing.`;
        addJournal('Commander confirmed command pressure but details refused', 'evidence', `ithtananalor-commander-pressure-${G.dayCount}`);
      } else {
        G.lastResult = `The commander gives back exactly what the garrison manual provides on chain of command and discipline — correct, sequential, complete. Nothing outside the prepared answer, nothing that admits any space for a follow-up question to enter. The stone walls of the command office hold the cold well into the afternoon. Either the pressure hasn't reached this level of the command structure or he's practiced at not showing it. The conversation ends without a crack in either direction, his expression unchanged throughout.`;
        addJournal('Military command inquiry inconclusive', 'evidence', `ithtananalor-commander-blocked-${G.dayCount}`);
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

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Elira speaks without looking up from the armor she's checking. Her voice is flat and careful. "The old oath ran: I bind myself to the protection of those I serve. The new version runs: I bind myself to the commands of those above me in the line of duty." She sets the arm plate down. "The wording sounds like tradition. Most soldiers don't hear the change. But the binding target is different. Principle to authority. Justice to obedience." She picks the plate back up. "An oath-bound soldier who receives an unjust order has no recourse. The oath removes the recourse."`;
        G.stageProgress[1]++;
        addJournal('Honor guard revealed oath language corruption', 'evidence', `ithtananalor-guard-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Elira stops mid-check. "Oaths are sacred binding. Questions about their content from someone outside the sworn line are a breach of that sanctity." She doesn't raise her voice — the stillness carries more than volume would. The conversation is over. The dishonor of the question will circulate within the guard rotation before the day is out.`;
        G.worldClocks.reverence++;
        addJournal('Honor guard considers oath inquiry a sacred violation', 'complication', `ithtananalor-guard-hostile-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The oath documentation is accessible in the garrison's civic records section. Recent administrations show text variants from the standard form — subtle, embedded in archaic binding-law phrasing that requires specialist reading to parse. The language has changed. Whether the change is administrative revision or deliberate reinterpretation takes a closer reading than the access window permits.`;
        addJournal('Oath documents show language modification patterns', 'evidence', `ithtananalor-guard-modified-${G.dayCount}`);
      } else {
        G.lastResult = `Oath documents are administered under the garrison's sacred records protocols — accessible for ceremonial review but not for comparative textual analysis without a named legal proceeding. The clerk who manages the ceremonial record speaks through a half-open window in the records annex, the bound oath volumes visible on the shelf behind her. The oaths are being given. What they contain is behind a classification that requires a practitioner of binding law to access formally. The clerk closes the window before you've finished writing down the procedure.`;
        addJournal('Oath administration inquiry inconclusive', 'evidence', `ithtananalor-guard-blocked-${G.dayCount}`);
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
        G.lastResult = `Mordain pulls a record from three years ago against a current record for the same soldier. Sets them side by side on the table. "The sworn text in the original reads: protection of those in my charge. The current record reads: compliance with lawful command." He speaks slowly, like someone who's been rehearsing this disclosure and isn't sure it's safe. "When I flagged it, I was told these are administrative alignments — bringing older records into current terminology. They aren't. The soldiers swore one thing. Their records now say another. They don't know."`;
        G.stageProgress[1]++;
        addJournal('Oath keeper revealed systematic oath record falsification', 'evidence', `ithtananalor-keeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Mordain's desk is positioned between the visitor and the record shelves — not incidentally, precisely. "Oath documentation is sacred and access is restricted to named parties with ceremonial standing." He doesn't gesture toward the door or produce a procedure form. He simply doesn't move from the desk, his hands flat on its surface. The old stone walls of the records annex hold the morning chill. The record system has a gatekeeper and the gatekeeper has decided today isn't the day. No authorization, no movement, no entry.`;
        addJournal('Oath keeper refusing record access', 'complication', `ithtananalor-keeper-silent-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Mordain grants access to current records only — the archive copies are held separately and require a separate authorization. Current entries show modification timestamps on several files. What was modified and how it differs from the sworn original requires pulling the archived versions, which means a return visit with the right credentials.`;
        addJournal('Oath records show recent modification patterns', 'evidence', `ithtananalor-keeper-modified-${G.dayCount}`);
      } else {
        G.lastResult = `The records room is maintained and current — ledgers shelved in proper order, entries dated and up to date, the ink on the most recent entries still with some faint sheen. What's visible confirms the system is active and regularly used. What's not visible is whether the content matches what soldiers originally swore. Confirming that requires archive access and a direct comparison between current entries and original sworn text. This visit hasn't produced either. Mordain watches from the doorway as you leave.`;
        addJournal('Oath record verification inconclusive', 'evidence', `ithtananalor-keeper-blocked-${G.dayCount}`);
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

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Kross walks you through the week's schedule on the board outside the training yard. The numbers are visible: rest periods cut from eight hours to four, endurance thresholds set above the garrison's own baseline standards, pain tolerance cycles running every third day instead of every seventh. "I've run training programs for thirty years," he says, without inflection. "The line between discipline and damage is not ambiguous to someone who's stood on both sides of it. This crosses it. Deliberately. Someone designed this schedule to produce compliant exhaustion, not capable soldiers."`;
        G.stageProgress[1]++;
        addJournal('Training master revealed systematic abuse disguised as discipline', 'evidence', `ithtananalor-trainer-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kross signals a halt the moment you step onto the observation line. "Training ground is restricted to assigned personnel." He doesn't wait for a response. Two soldiers appear at your shoulders and walk you back through the gate without acknowledgment. The session continues behind you. The training master's territorial response is its own kind of data.`;
        G.worldClocks.pressure++;
        addJournal('Training master banned you from training grounds', 'complication', `ithtananalor-trainer-hostile-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `From the observation line, the training session runs at a pace that leaves soldiers unable to speak between repetitions. The duration goes past what a conditioning session requires. At the end, the rest period is four minutes before the next block begins. Whether this is beyond garrison standard requires knowledge of the baseline — but the soldiers' faces at the rest bell aren't the faces of people being conditioned. They're the faces of people being worn down.`;
        addJournal('Training intensity observed as higher than typical', 'evidence', `ithtananalor-trainer-intense-${G.dayCount}`);
      } else {
        G.lastResult = `The training runs hard but within what a martial regimen might justify. Nothing overtly wrong from the outside. The training master's response to your presence — the speed with which he marks you and the two soldiers who appear at your shoulder — is harder to explain within a normal operation. The practice may be defensible. The supervision of the practice is not.`;
        addJournal('Training observation inconclusive', 'evidence', `ithtananalor-trainer-unclear-${G.dayCount}`);
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

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Helix checks the door before pulling the second ledger from the back of the lower drawer. His hands are steady but his breath isn't. The official roster and the assignment roster don't match — soldiers listed in the second ledger don't appear anywhere in the first. No duty rotation, no supply allocation, no casualty protocol. "I maintain both," he says. "When I asked what the second one was for I was told to keep accurate records and stop asking what they were for." His voice has the flatness of someone who stopped asking months ago.`;        G.stageProgress[1]++;
        addJournal('Clerk revealed hidden roster of disappeared soldiers', 'evidence', `ithtananalor-clerk-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Helix doesn't pull anything from the desk. His hands stay still. "Garrison records require command authorization for access. In writing, signed by an officer of senior rank." He gives the answer quickly — practiced to the point of reflex. A notched quill rests in the inkwell to his left, half-used. The records exist behind the door at the back of the room. The authorization process exists on paper in the command block. Neither is going to happen today, and the speed of his answer suggests he's already decided that.`;
        G.worldClocks.pressure++;
        addJournal('Garrison clerk refusing record access', 'complication', `ithtananalor-clerk-blocked-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Helix grants access to the main roster under general garrison audit rights. Seventeen soldiers appear in assignment entries from the past four months that have no corresponding active duty position, no transfer record, and no discharge notation. They were assigned somewhere. There's no documentation of where. The gap in the record is consistent and deliberate.`;
        addJournal('Roster analysis shows unexplained personnel disappearance', 'evidence', `ithtananalor-clerk-disappear-${G.dayCount}`);
      } else {
        G.lastResult = `The roster covers four hundred soldiers across fourteen rotations. Movement between assignments is frequent and the pattern is complex enough that identifying anomalous gaps requires comparison between the assignment log and active deployment records — a task that needs more time and a clearer authorization level than this access provides.`;
        addJournal('Personnel roster analysis inconclusive', 'evidence', `ithtananalor-clerk-unclear-${G.dayCount}`);
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
        G.lastResult = `Sarn takes you to the inventory board before speaking. Points at the storage totals for the eastern weapons depot, then at the physical count he ran last week. The numbers don't match. "I've been marking equipment as training surplus and routing it to three addresses listed as maintenance facilities. I visited one of those addresses." He stops. "It's a warehouse. Empty shelving except for what arrived from here." He closes the inventory log. "The garrison's service weapons are being moved out. Whoever holds those addresses is being armed while the garrison is quietly reduced."`;
        G.stageProgress[1]++;
        addJournal('Quartermaster revealed hidden arsenal redistribution', 'evidence', `ithtananalor-quartermaster-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sarn answers from behind the inventory board without looking up. His chalk is moving down a column of figures as he speaks. "Military logistics is confidential to the command chain. I can't discuss movements with parties outside that chain." He's not hostile — he's procedural, and the procedure is doing its job. The supply record is behind a wall that requires command authorization to pass, and authorization requires going through the same command structure that controls the movements being questioned. The board stays between you.`;
        G.worldClocks.pressure++;
        addJournal('Quartermaster refusing supply discussion', 'complication', `ithtananalor-quartermaster-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Sarn confirms supply movements have been happening and describes them as equipment rotation to maintenance facilities. He gives this in a practiced sequence — type, volume, destination category, classification. The description is complete in structure and empty of the one detail that would make it verifiable: the facility addresses. When asked for them directly, he pauses before citing restricted logistics protocols.`;
        addJournal('Quartermaster confirmed supply movements but explanation incomplete', 'evidence', `ithtananalor-quartermaster-unusual-${G.dayCount}`);
      } else {
        G.lastResult = `Sarn gives technically accurate answers about the supply management process: categories, rotation schedules, classification tiers. Nothing outside standard procedure emerges as a discrepancy from this conversation. Either the redistribution hasn't reached Sarn's level or he's describing the surface of it in terms that reveal nothing.`;
        addJournal('Supply movement inquiry inconclusive', 'evidence', `ithtananalor-quartermaster-blocked-${G.dayCount}`);
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
        G.lastResult = `Marin brings out a ceremonial scroll and places it beside an older one from the archive shelf. Reads them in parallel, pointing to specific passages. The old invocation calls the soldier to serve the people they protect. The revised version calls the soldier to serve the command above them. The words surrounding each phrase are the same — the traditional cadence preserved, the central binding redirected. "If you hear it without a reference point, it sounds correct. That's the design." Her hand rests on the archive scroll. "The form is intact. The meaning was replaced."`;
        G.stageProgress[1]++;
        addJournal('Ritual keeper revealed sacred formula rewriting', 'evidence', `ithtananalor-ritual-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Marin's response comes before the second sentence is finished. "Sacred practice does not submit to interrogation from outside the sanctioned line." She doesn't move toward the archive — she moves toward the door and opens it. The ritual system closes behind the question. Any return approach requires a different framing or a different door.`;
        G.worldClocks.reverence++;
        addJournal('Ritual keeper offended by sacred practice inquiry', 'complication', `ithtananalor-ritual-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Marin permits access to the current ceremony texts. Several formulas show variant language from the traditional forms — small substitutions embedded in the archaic binding-law phrasing where substitutions are hardest to detect without a direct comparison. Whether the variants are scholarly reinterpretation or deliberate corruption requires side-by-side analysis with the original archived scrolls, which Marin hasn't offered access to.`;
        addJournal('Ritual documentation shows subtle archaic variation', 'evidence', `ithtananalor-ritual-varied-${G.dayCount}`);
      } else {
        G.lastResult = `The ritual documentation is accessible through the standard ceremonial record process — bound scrolls in vellum sleeves, the older ones showing the amber tinge of age along their edges. Reading modification into binding-law phrasing requires training in the specific archaic legal tradition used in oath and ritual texts. Without that background the texts are opaque in exactly the right places: the archaic formulas where substitution would be hardest to detect without a reference point. The words are present. What they're doing inside the binding structure requires a different kind of reading.`;
        addJournal('Ritual corruption analysis inconclusive', 'evidence', `ithtananalor-ritual-unclear-${G.dayCount}`);
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

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Daven speaks at the side entrance of the authority chamber, not inside it. He keeps his voice low and his back to the inner door. "The validation ritual confirms that a commander carries legitimate authority within the chain of sacred duty. I have performed that ritual for commanders who haven't passed the three trials that legitimacy requires." He pauses, watching the inner door. "When I noted the discrepancy I was told the trials were conducted under expedited wartime protocol. There is no active wartime protocol. I am certifying authority I cannot verify — and when I have raised this, I am told that questioning command is questioning the order itself."`;
        G.stageProgress[1]++;
        addJournal('Authority revealed spiritual validation of illegitimate command', 'evidence', `ithtananalor-authority-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Daven straightens and his tone shifts register. "The validation of authority through sacred rite is a matter of faith. Questioning that process from outside the sanctioned line constitutes a crisis of faith in the command structure." He will file an inquiry record before the hour ends. The question has been categorized and the category has consequences.`;
        G.worldClocks.reverence++;
        addJournal('Ritual authority reported faith crisis inquiry', 'complication', `ithtananalor-authority-hostile-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The validation ceremony for a newly appointed section commander runs in under twelve minutes. From the record of prior ceremonies visible in the public documentation, the standard duration is between forty-five minutes and an hour. The ritual structure is present — the words, the positions, the marks. The time required to do them with the full traditional weight is absent.`;
        addJournal('Authority validation ceremonies show expedited patterns', 'evidence', `ithtananalor-authority-expedited-${G.dayCount}`);
      } else {
        G.lastResult = `Validation ceremonies are public by design — the garrison community is meant to witness them. What the ceremonies mean, and whether shortened or modified forms carry the same binding weight as traditional forms, is a question of sacred law that the ritual authority interprets. From outside that interpretive tradition, the ceremonies look complete. Whether they are is a different question.`;
        addJournal('Authority validation analysis inconclusive', 'evidence', `ithtananalor-authority-unclear-${G.dayCount}`);
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

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The northern gate's sightline has been broken by a storage structure added three months ago — positioned to cover exactly the angle the gate watch needs to hold. The southern choke point has load-bearing repairs pending, with temporary barriers that are passable by a coordinated group. Two weapon emplacements on the eastern wall were repositioned in the last quarter; the new positions create a gap in overlapping coverage that the old positions didn't allow. None of these are maintenance failures. Each creates a specific vulnerability at a specific tactical point.`;
        G.stageProgress[1]++;
        addJournal('Combat analysis revealed surgical fortification sabotage', 'evidence', `ithtananalor-fortification-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A guard at the eastern wall notes the angle of your attention — not the wall, but the gap between the repositioned emplacements. He steps toward you and asks your purpose at the fortification. The question is polite. The two soldiers who appear at the corner behind him are not a coincidence. "Tactical observation of defensive positions is restricted." You're walked to the garrison gate. The report of a civilian studying the wall's coverage gap will reach the watch supervisor before you're off the street.`;
        G.worldClocks.watchfulness++;
        addJournal('Military security alerted to fortification analysis', 'complication', `ithtananalor-fortification-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Several fortification points carry signs of recent modification — new masonry, repositioned fittings, fresh timber at two gate brackets. Whether the modifications improve or degrade the defensive position requires a more detailed survey than a pass from the public walkway provides. The work has been done. Its purpose is what's unclear.`;
        addJournal('Fortification modifications observed but purpose unclear', 'evidence', `ithtananalor-fortification-unclear-${G.dayCount}`);
      } else {
        G.lastResult = `The garrison's outer structure is intact and maintained. What's visible from the public approach — walls, gates, patrol positions — reads as operational. Reading the tactical implications of specific modifications requires ground-level access to the fortification positions, which the public walkway doesn't provide. The garrison looks defended. Whether it is requires a closer look.`;
        addJournal('Fortification analysis inconclusive', 'evidence', `ithtananalor-fortification-blocked-${G.dayCount}`);
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

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Cross-referencing the hidden roster against the supply movement records and the weapon cache addresses produces a coherent picture: the disappeared soldiers are deployed to three external locations outside the garrison's administrative boundary. No traditional command insignia. Communication through courier routing that bypasses the garrison's standard messenger network. They're organized, equipped from the redistributed garrison weapons, and answering to a command authority that doesn't appear in any official record. A second military structure is operating inside Ithtananalor's geographic footprint with none of Ithtananalor's institutional accountability.`;
        G.stageProgress[1]++;
        addJournal('Military tracking revealed shadow force structure and deployment', 'evidence', `ithtananalor-shadow-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The tracking draws attention before the destination is reached. Two soldiers in unmarked coats intercept at the edge of the third supply route — no garrison insignia, no identification offered. The taller one speaks once: "This route doesn't concern you." They stay between you and the route until you move. They don't follow. The shadow force knows it's being tracked and chose to show itself rather than let the tracking continue. They want the message delivered, not a confrontation logged.`;
        G.worldClocks.pressure += 2;
        addJournal('Shadow force directly warned you away from investigation', 'complication', `ithtananalor-shadow-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The supply trace points the disappeared soldiers toward a single delivery cluster — three addresses, close enough to be one operational zone, outside the garrison's administrative boundary. What the zone is used for isn't visible from the supply record alone. The soldiers are there. The command structure above them isn't documented anywhere this search has reached.`;
        addJournal('Shadow military deployment zone identified but purpose unclear', 'evidence', `ithtananalor-shadow-deployed-${G.dayCount}`);
      } else {
        G.lastResult = `The assignment record shows the soldiers leaving their documented positions — dates noted, departure logged, no subsequent entry. Where those assignments lead requires a routing record that sits above the clerk level: a command transfer log or an external deployment manifest. The clerk's access tier doesn't include either. The gap in the record is clean and consistent — not an oversight but the edge of a deliberate boundary. What's on the other side requires a higher authorization than today's approach has produced.`;
        addJournal('Hidden force tracking inconclusive', 'evidence', `ithtananalor-shadow-blocked-${G.dayCount}`);
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
        G.lastResult = `Oath law runs back four centuries. The core language: soldiers bind to principle and justice. A legal reinterpretation entered the precedent record eight months ago — a ruling that "principle" is defined by the commanding authority's declaration rather than by independent ethical standard. The implication: soldiers are bound to whatever the command declares as principle, not to any external definition of the word. Three scholars who filed objections to that ruling were removed from the precedent council within ninety days of their submission. The ruling stands. The objections are not in the official record.`;
        G.stageProgress[1]++;
        addJournal('Oath law analysis revealed legal system corruption', 'evidence', `ithtananalor-law-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The pattern of records access — specifically the combination of oath language archives and the precedent council's personnel records — draws a notice from the registry oversight office. A legal authority representative meets you at the door on the way out. "Legal precedent is proprietary to the council's jurisdiction. External analysis without standing is not permitted." The notice is filed. The analysis has been logged as unauthorized.`;
        G.worldClocks.watchfulness++;
        addJournal('Legal authorities alerted to oath law analysis', 'complication', `ithtananalor-law-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Recent legal precedent in oath law has expanded the interpretive scope of "principle" — where the term previously referred to an ethical standard external to the command structure, the current ruling allows the command structure to define it. Soldiers swearing to principle may now be swearing to whatever the command declares. Whether this was intended as a tool for control or as an administrative simplification isn't determinable from the ruling text alone.`;
        addJournal('Oath law shows recent broadened interpretation', 'evidence', `ithtananalor-law-expanded-${G.dayCount}`);
      } else {
        G.lastResult = `Oath law is built on layered precedent running several centuries deep, with variation by locality, military branch, and ceremonial tradition. The texts are dense and their authority depends on reading each passage against what came before it. Reading deliberate corruption into the current state versus long accumulation of administrative drift requires a specialist in the historical baseline — without that grounding, the law looks like complicated law rather than law that has been worked on with intent. The changes may be there. Finding them requires a different kind of preparation.`;
        addJournal('Oath law analysis inconclusive', 'evidence', `ithtananalor-law-unclear-${G.dayCount}`);
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

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The pattern assembles over three conversations in separate corners of the garrison commons. Soldiers are being asked to swear supplementary oaths — not at the standard binding ceremony, but in private, to specific commanders by name. Refusing results in reassignment to exposed positions and public notation as "uncommitted." Those who have attempted to walk back a supplementary oath are declared oath-breakers: stripped of rank, barred from the garrison community, exiled. Swearing binds the soldier to the commander. Breaking destroys the soldier's place in the only institution they belong to. The mechanism doesn't require force. It only requires the oath.`;
        G.stageProgress[1]++;
        addJournal('Coercion analysis mapped oath-weaponization for compliance', 'evidence', `ithtananalor-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The first question about supplementary oaths produces a polite end to the conversation. By the second attempt, word has moved ahead. A third soldier doesn't let the question finish before stepping back. Being associated with an inquiry about oath-breaking carries its own risk — if the supplementary oath system is real, proximity to someone questioning it could mark a soldier as a potential oath-breaker themselves. The garrison has grown too careful to speak to someone with this particular set of questions.`;
        G.worldClocks.isolation++;
        addJournal('Population distancing from you due to oath-breaking inquiry', 'complication', `ithtananalor-coercion-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Three soldiers confirm pressure to swear beyond the standard binding. None will describe the specific content or the commander they were asked to swear to. Two cite the oath itself as the reason they can't speak — once sworn, discussing the oath with an outsider may constitute breach. The pressure is confirmed. The specific mechanism stays behind the oath that enforces the silence.`;
        addJournal('Oath-based pressure confirmed by soldier interviews', 'evidence', `ithtananalor-coercion-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Soldiers in the garrison commons don't finish sentences about oaths before redirecting. The meal smell hangs in the low-ceilinged room — salt ration and boiled grain — and the tables nearest the wall are the most occupied, backs to the stone. The guardedness is consistent across multiple conversations but none of it yields specifics. Something is being protected by the collective silence. What it is and how the protection operates requires a source willing to speak past the point where everyone else stops. That source hasn't appeared yet.`;
        addJournal('Oath coercion patterns sensed but not documented', 'evidence', `ithtananalor-coercion-unclear-${G.dayCount}`);
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

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Soldiers at the end of rotation walk past each other without acknowledgment. In the commons, unit groups that would normally share a table eat in separated clusters. Officers receive compliance — no eye contact, no voluntary communication beyond the required response. A sergeant who's been at the garrison fifteen years doesn't look up when a superior passes. When asked directly about the unit's condition, the answer is brief and identical across four different conversations: "We do what's required." The garrison is mechanically functional and socially emptied. The form of military order without any of its substance.`;
        G.stageProgress[1]++;
        addJournal('Morale analysis revealed systematic military demoralization', 'evidence', `ithtananalor-morale-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Questions about unit cohesion and command confidence land wrong in the garrison commons. A soldier who's been sitting quietly at the end of the table stands and walks toward the training block. Within twenty minutes Kross appears at the commons entrance and sweeps the room. The morale questions have been classified as a diagnostic attempt — the kind that precedes formal review. Soldiers in a coercion system protect the system even when they hate it.`;
        G.worldClocks.isolation++;
        addJournal('Soldiers reported your morale assessment as suspicious', 'complication', `ithtananalor-morale-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The garrison commons is quieter than a functioning unit this size should be. Soldiers eat without conversation. At shift change, the handover is correct in form and empty of any informal exchange between incoming and outgoing watch. Whether this represents a garrison under exceptional operational pressure or a garrison whose internal bonds have been deliberately broken isn't readable from a single observation session.`;
        addJournal('Military morale observed as lower than expected', 'evidence', `ithtananalor-morale-low-${G.dayCount}`);
      } else {
        G.lastResult = `The garrison shows the baseline signs of operational stress — short responses, fatigue visible at end of shift, officers working past standard hours. Whether the stress is proportionate to the actual operational load or has been engineered beyond it requires baseline data from prior periods or comparative garrison data that isn't available from this vantage point.`;
        addJournal('Military morale assessment inconclusive', 'evidence', `ithtananalor-morale-unclear-${G.dayCount}`);
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

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The command communication pattern tells the story. Torvin receives written orders that don't originate from any Ithtananalor command office — the formatting and authentication marks are external. Mordain receives directives about record modifications through a sealed courier pouch with no garrison return address. The shadow force deployment orders, when one surfaces through the supply trace, bear authentication from a source outside Ithtananalor's military structure entirely. The orders arriving at every corrupted node come from the same external direction. Someone outside this garrison has the authority to direct it — and the people inside are executing those directions as if they were their own.`;
        G.stageProgress[1]++;
        addJournal('Command conspiracy revealed external direction of internal sabotage', 'evidence', `ithtananalor-command-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The command communication mapping draws a response before it's finished. Three officers in unmarked dress appear in the records corridor — not garrison officers, shadow force. The one in front doesn't identify himself. "You're assembling a picture that doesn't belong to you." They don't touch you. They stand between you and the next set of records until you leave. The shadow command structure has read the shape of your inquiry and chosen a direct response. They now know how close the picture is to complete.`;
        G.worldClocks.pressure += 2;
        addJournal('Shadow command directly confronted you about hierarchy mapping', 'complication', `ithtananalor-command-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The command communication trail shows a consistent pattern: directives arriving at the garrison's senior nodes carry authentication marks from outside the standard Ithtananalor military hierarchy. The specific external authority isn't named in the documents that are accessible, but the routing is clear — commands are entering from somewhere that isn't the garrison's own chain.`;
        addJournal('Command hierarchy shows external coordination patterns', 'evidence', `ithtananalor-command-external-${G.dayCount}`);
      } else {
        G.lastResult = `Orders flow down through the garrison's command structure in the standard pattern. At the top of the observable chain, the directives originate from senior garrison command. Whether those senior commanders are themselves receiving direction from an external source requires access to their incoming communication records — which sit above the access level this approach has produced.`;
        addJournal('Command hierarchy mapping incomplete', 'evidence', `ithtananalor-command-unclear-${G.dayCount}`);
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

        G.lastResult = `In the garrison commons, over the sound of the evening meal: "${selected}." The same fragment passes through three separate conversations in different corners of the room, each speaker careful about who's within earshot. Soldiers at Ithtananalor carry pieces of the picture without a frame for it. The anxiety is specific — not the generalized unease of a garrison under pressure, but the particular tension of people who know something they've been told not to know.`;
      addJournal(`Street rumor gathered: "${selected}"`, 'evidence', `ithtananalor-rumor-${G.dayCount}`);

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

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The documents assembled together: external-authenticated orders contradicting garrison command authority. Oath records modified to bind soldiers to command rather than principle. Helix's hidden roster. Sarn's weapon redistribution log. The shadow force deployment addresses. Each piece has an alternative explanation in isolation — administrative error, policy change, record-keeping variance. Together they don't. The pattern is coordinated, executed across multiple systems simultaneously, and structured to replace Ithtananalor's own military authority with an external command structure disguised as internal administration. This is not corruption from within. This is occupation from outside.`;
        G.stageProgress[1]++;
        addJournal('Military coup documentation compiled', 'evidence', `ithtananalor-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The evidence assembly draws attention before it's complete. Three shadow force operatives appear at the records station — not to detain, to interrupt. The documents in hand are taken. Not all of them, only the ones that connect multiple systems together. The pieces that remain are individually dismissible. What's been removed was the connective tissue. The conspiracy has read the assembly in progress and made a surgical cut. The picture has gaps now that weren't there an hour ago, and the people who created those gaps know you were close.`;
        G.worldClocks.pressure += 2;
        addJournal('Investigation directly noticed by conspiracy operators', 'complication', `ithtananalor-proof-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The contradictions between external command authentication, oath record modifications, and shadow roster maintenance are significant enough in combination to move past "something is wrong" toward "the garrison command structure has been systematically replaced." Not all the links are fully documented, but the pattern is compelling. The pieces that remain missing are the specific external authority and the final deployment purpose.`;        addJournal('Compelling military conspiracy evidence found', 'evidence', `ithtananalor-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The fragments exist: modified oath records, supply movements, roster discrepancies, command communication anomalies. Each is documentable. What isn't documentable yet is the connection between them — the shared intent or authority that ties them into a single operation rather than a collection of administrative failures. The fragments need assembly and the assembly needs more access than today's sources have provided.`;
        addJournal('Evidence fragments found but incomplete', 'evidence', `ithtananalor-proof-incomplete-${G.dayCount}`);
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

        G.lastResult = `${npc.name} doesn't try to deny it when pushed. The answer comes out in pieces, not a confession: "${npc.fear}" They're not asking for forgiveness. They're telling you what trap they're in. The decision now is yours: expose them and use the pressure to force the garrison's hand, or protect them and keep a source inside the system. One path creates a public crisis. The other maintains a quiet thread. Both have costs that won't be visible until after the choice is made.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal('consequence', `Confronted ${npc.name} (${npc.role}) about complicity in military conspiracy`, `ithtananalor-moral-${G.dayCount}`);

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

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `A sealed courier pouch in the command records room — not in the filing system, kept flat under the directory ledger. Inside: four directives, each signed with insignia that doesn't belong to any Ithtananalor command office. The authentication marks are Shelkopolis. Orders directing the oath record modifications, the shadow force deployment, the garrison disarmament — all of it traced back to a single external authority operating out of Shelkopolis. Not destroying the garrison. Absorbing it. The garrison's identity stays intact as a shell. The command inside it has been replaced. And the consolidation is still in progress.`;
        G.stageProgress[1]++;
        addJournal('Origin source of Ithtananalor military conspiracy identified as external Shelkopolis coordination', 'discovery', `ithtananalor-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The command records room has a guard that wasn't present yesterday. He doesn't let you reach the directory ledger. Two more appear before the question is asked. The sealed pouch — wherever it is — stays sealed. You're walked out of the command block without a formal charge and without a formal record. The origin source hasn't been reached. But the shadow command knows you came looking for it, and they've closed the room.`;
        G.worldClocks.pressure += 2;
        addJournal('Investigation interrupted by conspiracy operators', 'complication', `ithtananalor-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `Three directives from the partial access carry authentication marks from outside Ithtananalor's command hierarchy. The external authority isn't named in what's accessible — the signatures use a classification code rather than a named office. But the routing is unmistakable: orders for the garrison's internal restructuring are originating from somewhere that isn't the garrison. Ithtananalor isn't being corrupted from within. It's being directed from outside.`;
        addJournal('External coordination of Ithtananalor military conspiracy confirmed', 'discovery', `ithtananalor-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `The authentication marks on the directives point outside Ithtananalor's command structure, but the external source stays one layer further back than the available documents reach. The routing passes through an intermediary designation that doesn't resolve to a named office or registered authority. Whoever is directing this has structured the paper trail to confirm external coordination while keeping their identity inside a sealed correspondence tier. The hand is visible. The name attached to it is not.`;
        addJournal('External coordination suspected but source not yet identified', 'evidence', `ithtananalor-origin-unclear-${G.dayCount}`);
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
        addJournal('Military systems analysis revealed coordinated occupation engineering', 'evidence', `ithtananalor-pattern-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The documents spread across the reading table make the pattern visible to anyone who enters the room. A garrison intelligence officer appears at the door before the analysis is complete — not hostile, but specific about why he's here. The combination of materials pulled together has drawn a notice from military oversight. Your purposes are requested in writing. The documents are noted. The pattern you've assembled is now on someone else's desk before it finished forming on yours.`;
        G.worldClocks.watchfulness++;
        addJournal('Your military pattern analysis drew intelligence scrutiny', 'complication', `ithtananalor-pattern-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The threads connect across the table: oath corruption that binds soldiers to command over principle, command restructuring that removes accountability, a shadow force being built outside garrison oversight. None of these reads as independent failure. The shared timing, the consistent direction of each change, the way each one supports what the others require — they appear designed together to achieve total command control. The coordination is visible in the pattern. The coordinating hand is still one step further back.`;
        addJournal('Military failure connections mapped', 'evidence', `ithtananalor-pattern-connected-${G.dayCount}`);
      } else {
        G.lastResult = `The military compromises sit separately in the documentation: oath record modifications, command authentication anomalies, roster gaps, supply diversions. Each is documentable on its own terms, each with its own possible explanation. Whether they connect — whether a single purpose runs underneath them — requires more access and a clearer line between their authorization sources than today's evidence provides. The shape of something larger is implied. Its outline isn't yet clear enough to name.`;
        addJournal('Military system pattern analysis inconclusive', 'evidence', `ithtananalor-pattern-unclear-${G.dayCount}`);
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

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Everything connects. Oaths are being corrupted deliberately. The command hierarchy is being replaced deliberately. A shadow military force is being built deliberately. The traditional garrison is being made complicit through oath-binding. Someone is not just attacking Ithtananalor's military — they're absorbing it. The soldiers are being systematically transformed from defenders of Ithtananalor into tools of an external force. The military isn't being conquered; it's being converted. And this same process is likely being replicated in other garrisons. Ithtananalor isn't a victory; it's a proof of concept for systematic military occupation. The real expansion is just beginning.`;
        G.stageProgress[1]++;
        addJournal('Ithtananalor military understood as proof of concept for systematic military conversion', 'discovery', `ithtananalor-understanding-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Three shadow force operatives appear at the entrance to the reading room as the final thread connects. They don't draw weapons. The one in front speaks flatly: this line of work stops here. No explanation given for why or by whose authority. They're not wearing garrison marks. The synthesis is in your head, complete enough to matter, and they're here because something in the inquiry's path told them it was almost finished. Whatever was being assembled has been interrupted at the last step.`;
        G.worldClocks.pressure += 2;
        addJournal('Final understanding synthesis blocked by shadow force threat', 'complication', `ithtananalor-understanding-stopped-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points toward Ithtananalor as an experimental model rather than a final target. The methods applied here — oath redirection, shadow force construction, command structure replacement — are too systematically developed to have been purpose-built for a single garrison. They read as a methodology being tested before wider application. The certainty isn't complete: a single clear link to a broader operational plan hasn't surfaced. But the pattern points past this garrison's walls toward something still in motion.`;
        addJournal('Ithtananalor as experimental military occupation model suspected', 'discovery', `ithtananalor-understanding-experimental-${G.dayCount}`);
      } else {
        G.lastResult = `The evidence in hand accounts for the mechanism but not the purpose. Oath redirection, command replacement, shadow force construction — the how is documented well enough. Why Ithtananalor specifically, what the occupied garrison is being positioned to do, what comes next once the conversion is complete: those answers aren't in the documents gathered so far. The full picture has a center that hasn't been reached. The outer structure is visible. The purpose it serves is still one step further in.`;
        addJournal('Occupation purpose not yet fully revealed', 'evidence', `ithtananalor-understanding-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: IRON LEDGER ANOMALY
  {
    label: "Request a read-only audit pass for the Iron Ledger Ward's public records terminal — scan the last six months of transaction summaries.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 75,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(75, 'scanning Iron Ledger anomalies');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Three accounts appear in transaction summaries under non-standard registration codes — the ledger system accepts them, but the codes don't correspond to any registered entity in the public directory. These accounts are moving significant sums. They're not hidden: they're in plain sight, formatted to look like administrative clearing accounts. Whoever created them knows the ledger's formatting conventions well enough to make invisible money look like overhead.`;
        if (!G.flags) G.flags = {};
        G.flags.found_ledger_ghost_accounts = true;
        addJournal('Iron Ledger: three ghost accounts using valid formatting codes without registered entities', 'evidence', `ithtananalor-ledger-${G.dayCount}`);
      } else {
        G.lastResult = `The terminal returns summary data cleanly enough — column totals, category breakdowns, date ranges. The anomalous accounts surface in the list but carry a restricted flag on their transaction histories. Totals are visible; the individual entries behind them require elevated access credentials. The amounts are significant. Where the money moved, in what increments, and when requires a different authorization level than the public audit pass provides. The accounts are confirmed. Their activity stays behind the flag.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. CLUE: DEBT LEVERAGE TRAIL
  {
    label: "Follow the debt leverage trail — find who holds the outstanding obligations of three recently displaced garrison officers.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'mapping debt leverage trail');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `All three displaced officers' outstanding debts were purchased from their original creditors within the same two-week window — four months ago. The purchaser is listed as a "consolidated obligations arbitrage firm" registered in a northern market jurisdiction. Their debts are now held by a single entity that has the legal authority to call them without notice. Three officers with leverage held over them simultaneously. This isn't coincidence — it's a coordinated acquisition of control instruments.`;
      if (!G.flags) G.flags = {};
      G.flags.found_debt_leverage_trail = true;
      addJournal('Debt leverage: three officers\' obligations purchased simultaneously by single external entity', 'evidence', `ithtananalor-debt-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ARCHETYPE-GATED: READING THE GARRISON
  {
    label: "Walk the garrison courtyard at change of watch — read what the soldier transitions tell you about the command structure.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reading garrison command structure');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The watch change procedure is technically correct but the acknowledgment is off. Outgoing soldiers look at the incoming commander, then look away — not deference, avoidance. The incoming officers have authority but not legitimacy. The garrison is complying with its occupiers through learned silence. These soldiers haven't been converted. They're waiting.`;
      } else if (arch === 'magic') {
        G.lastResult = `There's a structural residue in how orders are phrased here. The new command cadre uses slightly different idiom than garrison standard — subtle, but consistent. The phrasing was borrowed from a different military tradition. These officers were trained elsewhere. They're using Ithtananalor's forms but their foundations are foreign.`;
      } else if (arch === 'stealth') {
        G.lastResult = `At the watch change, a single courier passes a folded slip to the incoming officer — not a formal message, an informal note. The officer reads it, folds it back, pockets it. This happens at every watch change. There's a parallel reporting structure running below the garrison's official chain of command. Someone outside the garrison is reading every watch.`;
      } else {
        G.lastResult = `A junior soldier breaks formation briefly to speak to a departing officer. The senior officer on duty doesn't reprimand the break — pretends not to see it. The garrison's formal discipline has been selectively suspended. The new command structure has created informal permission zones. They're managing compliance through inconsistent enforcement.`;
      }
      addJournal('Garrison: occupying officers foreign-trained, parallel reporting structure, selective discipline enforcement', 'evidence', `ithtananalor-garrison-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. FACTION SEED: WARDEN ORDER FINANCIAL ATTACHE
  {
    label: "Speak to the Warden Order's financial attaché stationed at the Iron Ledger Ward.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Warden Order contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Attaché Denn Calver is measuring you carefully. He's aware of the ghost accounts and declines to confirm what he knows about them. "The Warden Order's interest in Ithtananalor's financial architecture is ongoing and appropriately scoped." He offers a reference number for a formal inquiry channel. The offer feels like a test of whether you'll go official or stay unofficial. The Warden Order wants to know which you are.`;
        if (!G.flags) G.flags = {};
        G.flags.met_warden_order_ithtananalor = true;
        G.factionHostility.warden_order += 1;
        addJournal('faction', 'Warden Order attaché Denn Calver: confirmed awareness of financial anomalies, gauging investigator alignment', `ithtananalor-warden-${G.dayCount}`);
      } else {
        G.lastResult = `The attaché is busy and professional, his desk covered with ledger extracts and a sealed correspondence bundle still uncut. Formal appointment required — submitted through the standard administrative channel, two working days for confirmation. The Warden Order's financial presence here is real but guarded in the way institutional presences guard themselves when operating in sensitive territory. Access requires proper introduction and a stated purpose that will withstand scrutiny. Today's approach produced neither.`;
        if (!G.flags) G.flags = {};
        G.flags.located_warden_order_ithtananalor = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 25. ATMOSPHERE: THE IRON LEDGER WARD AT NIGHT
  {
    label: "Walk the Iron Ledger Ward after the market closes — observe what it does when it thinks no one is watching.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 52,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(52, 'observing ward after hours');

      G.lastResult = `After dark the ward doesn't empty. Clerks move between buildings carrying sealed cases. Lights burn in third-floor windows of the registration offices. A courier arrives at the rear entrance of the main ledger building and leaves without the package they arrived with. Ithtananalor's financial machinery doesn't stop when the market closes — it just stops being visible. The city's real economic activity runs at night.`;
      addJournal('Iron Ledger Ward: night financial operations ongoing — real transactions happen after official hours', 'discovery', `ithtananalor-night-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 26. PERSONAL ARC: MARET VOSS INTRODUCTION
  {
    label: "Introduce yourself to Maret Voss at the Iron Ledger Ward — the specialist in disputed account resolution.",
    tags: ['PersonalArc', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'meeting Maret Voss');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Maret Voss is precise and unhurried. She's been handling disputed accounts for seven years. You don't mention the ghost accounts directly — you ask a technical question about formatting codes in the public registry. She answers without hesitation, then pauses. "That's an interesting question to come in with." She's smart enough to know you're not here about a formatting question. She gives you her direct schedule and says the door is open for follow-up.`;
        G.flags.met_maret_voss = true;
        addJournal('contact', 'Maret Voss introduced: Iron Ledger specialist, aware you have a real purpose, door open for return', `ithtananalor-maret-${G.dayCount}`);
      } else {
        G.lastResult = `Maret Voss is professional and busy — two open case files on the desk, a stack of ledger extracts flagged with paper markers, the scratch of her pen continuing while she listens. She answers the initial question correctly and moves on without lingering. Not unfriendly: she operates on appointment time, and an unscheduled visitor with a general question doesn't clear that threshold. A return visit with something specific and a clearer purpose would land differently than this one did.`;
        G.flags.located_maret_voss = true;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE DISPLACED GARRISON OFFICER
  {
    label: "Find one of the three displaced garrison officers and understand what leverage was used against them.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'interviewing displaced officer');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Captain Lysel retired "voluntarily" four months ago. She won't say what was used against her. But she will say this: "The debt wasn't even current. I'd been managing it. Then a letter arrived saying it had been called in — full amount, thirty days. I couldn't produce that in thirty days. Nobody could." She took the retirement offer instead. "I don't know who holds it now. I was told it would be canceled if I left quietly." She sounds like she believes it won't be.`;
        if (!G.flags) G.flags = {};
        G.flags.met_lysel_displaced_officer = true;
        addJournal('contact', 'Displaced Captain Lysel: debt called suddenly then offered retirement — leverage still potentially active', `ithtananalor-lysel-${G.dayCount}`);
      } else {
        G.lastResult = `The officer is living quietly in a rented room outside the garrison quarter, away from the streets she used to walk in uniform. The door opens a hand's width before closing again. She doesn't want contact with anyone connected to military or financial proceedings — the distinction between the two has stopped mattering to her. Part of the agreement that ended her service may have included silence as a condition. The door stays closed. Whatever she knows, it's not coming through today's approach.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "Maret Voss mentions a researcher visited the day before you asking about the same formatting codes — their credentials were from a prestigious northern archive.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"Military posture," Maret says. "Sat like someone who'd spent time in formal dress uniform. Asked about the accounts, then asked if any garrison officers had accessed the ledger recently. Not financial questions — threat-mapping questions. They were cross-referencing financial anomalies with military access patterns."`;
      } else if (arch === 'magic') {
        G.lastResult = `"The credentials were from the Northern Archive Research Consortium," Maret says. "Real institution, real format. But the questions weren't archival — they were audit-level. Whoever sent them knows the difference between research and investigation and deliberately used research as cover." Professional institutional camouflage.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They never asked about the ghost accounts directly," Maret says. "They asked whether anyone else had asked about them. Specifically, whether any inquiry had been logged. They were checking if there was a paper trail of other investigators before proceeding." A counter-surveillance check. They're clean of records and they want to stay that way.`;
      } else {
        G.lastResult = `"Charming," Maret says, with a slight tone. "Brought a gift — a small reference book, completely appropriate, completely unnecessary. Asked about any parties who'd recently inquired about account resolution processes." Social mapping with gifts as social lubricant. This person builds rapport as an operational tool.`;
      }

      G.lastResult += ` They were here yesterday. They knew the same thread you're pulling.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('warning', 'Rival-adjacent operative visited Maret Voss one day before you — investigating same financial anomalies', `ithtananalor-rival-${G.dayCount}`);
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
window.ITHTANANALOR_STAGE1_ENRICHED_CHOICES = ITHTANANALOR_STAGE1_ENRICHED_CHOICES;
