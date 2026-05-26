/**
 * SOREHEIM PROPER STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to labor tensions and quota systems
 * Generated for: Community autonomy vs merchant control, craft integrity vs production quota, quota manipulation and worker displacement
 * Each choice: 65-80 XP, grounded in shift work and industrial pressure, layered wrongness reveal
 */

var SOREHEIM_PROPER_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. FOREMAN: QUOTA ESCALATION PATTERN
  {
    plot: 'main',
    label: "The quota numbers shifted. The foreman watched it happen.",
    tags: ['NPC', 'Labor', 'Pressure'],
    xpReward: 70,
    stageProgress: 1,
    failResult: 'This path is closed here, but Foreman Thrace holds the morning briefing every day at the yard gate — arriving before the shift bell, before the coordinators, when the stone-cut cold still carries sound cleanly, may be a better window.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading labor pressure patterns');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Foreman Thrace pulls you to the far end of the shift yard, back to the gate, voice low. "Fifteen years on these quarries. Quotas used to flex — seasons, supply shortfalls, maintenance windows. Six weeks ago they locked in. Doubled. No negotiation, no calendar. Three workers gone since then, no forwarding assignments listed. That's not management pressure. That's a targeted clear-out. Someone decided who leaves first."`;
        G.stageProgress[1]++;
        addJournal('Foreman revealed coordinated quota escalation', 'evidence', `soreheim-foreman-quotas-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Thrace stops mid-stride and turns around. "Who told you to ask me about quotas?" He doesn't wait for an answer — walks back to his crew, says something short to the nearest worker. By the end of the shift change, three people have clocked that you were asking. The yard is quieter than it was when you arrived. The pressure of that passing word is the kind that moves through a shift yard before the next bell.`;
        G.worldClocks.pressure++;
        addJournal('Foreman now wary of your inquiries', 'complication', `soreheim-foreman-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The shift yard smells of cut stone and the mineral tang of overheated pulley grease. Thrace glances back at the gate before answering. "Targets went up. Turnover's higher than usual." He restacks a crate that doesn't need restacking, aligning the corner to a grease mark on the board. "Management calls it a correction cycle." He doesn't call it that. He doesn't say what he calls it, either. Two workers wait for the next lift without speaking. The shift bell is still twenty minutes away and the yard is already on its feet.`;
        addJournal('Foreman confirmed quota increase and worker turnover', 'evidence', `soreheim-foreman-pressure-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. QUOTA CLERK: LEDGER MANIPULATION
  {
    plot: 'main',
    label: "The ceiling is set high. The floor rises on failure. Both ends move.",
    tags: ['Investigation', 'NPC', 'Records', 'Bureaucracy', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: 'This path is closed here, but Clerk Serin rotates to the secondary archive desk on odd-numbered afternoons when the labor coordinator is off-floor — that desk sits outside the range of the main stamp counter. She brings her own lamp oil on those shifts, which means she stays past the standard close. The side corridor to that desk passes the correction log cabinet, which is a separate filing system from the one behind the authorization window.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering quota manipulation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Serin slides the ledger across the desk with two fingers, like she's handling something she doesn't want to hold. The targets listed are beyond what the quarry workforce could meet at full capacity under clean conditions. That's not the wrongness. The wrongness is in the correction column: when targets aren't met, the recorded shortfall is worse than the actual numbers. "They set the ceiling high," she whispers. "Then they raise the floor on failure. Both ends. The replacement paperwork practically writes itself."`;
        G.stageProgress[1]++;
        addJournal('Clerk revealed two-level quota manipulation system', 'evidence', `soreheim-clerk-manipulation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Serin closes the ledger before you finish asking. "Those are labor administration documents. You'll need a management authorization stamp." She is already writing something down — not the authorization. Her hand moves quickly and she doesn't look up again. By the time you reach the yard, a labor coordinator is crossing toward the records building. The watchful crossing means the ledger room will be harder to approach again.`;
        G.worldClocks.watchfulness++;
        addJournal('Labor coordinator now investigating your inquiry', 'complication', `soreheim-clerk-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Serin lets you hold the ledger but keeps her hand on the edge of it. Quota increases are recorded in clean ink. Worker replacements follow within a week of each shortfall. Some entries have been crossed out and rewritten in a different hand — dates adjusted, performance figures altered. She watches you notice. She doesn't say anything about it. The smell of the room is dry paper and cold lamp oil. She has been sitting with this ledger for a long time.`;
        addJournal('Quota records show signs of alteration', 'evidence', `soreheim-clerk-altered-${G.dayCount}`);
      } else {
        G.lastResult = `Serin's eyes go flat. "Those are management documents." She straightens the stack of papers on her desk until the edges are perfectly aligned, then waits for you to leave. The window to the shift yard shows the same quota board it always has. The numbers are large. Behind her, the correction column runs to the bottom of the open page — she turned the ledger face-down before you finished the first sentence, but not before the column was visible. All corrections in black ink. All recent.`;
        addJournal('Quota records blocked without management authorization', 'evidence', `soreheim-clerk-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. MACHINERY SPECIALIST: EQUIPMENT SABOTAGE
  {
    label: "The parts are on the shelf. The approval to use them isn't.",
    tags: ['Investigation', 'NPC', 'Craft', 'Equipment', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: 'This path is closed here, but Halden posts his workshop schedule on the side door — the late-shift cleaning window runs without oversight and he works long past the bell when a repair is behind. The door stays propped open during those hours to clear the solvent fumes. The parts shelf he mentioned is against the back wall, visible from the doorway without entering. A count of what is stocked against what the repair log shows pending would be readable from there.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading equipment sabotage patterns');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Halden wipes his hands on his apron and doesn't lower his voice. "Ten years I've run this workshop. That pulley should take one day — parts are on the shelf. Now it takes three. Parts are on the shelf. I put in the repair order and it sits for two days before anyone approves it." He taps a clipboard hung on a nail. "A decade of records. Failure rate tripled in six weeks. Parts aren't missing. Authorization is slow. Someone upstream is sitting on the approvals."`;
        G.stageProgress[1]++;
        addJournal('Mechanic revealed deliberate equipment degradation', 'evidence', `soreheim-mechanic-sabotage-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Halden sets down his wrench and squares up to face you. "Maintenance records are internal. I don't give tours of the workshop to people I don't know." He picks the wrench back up and turns to the bench. Someone else in the workshop is watching. They go back to their work when you make eye contact. The door out is behind you.`;
        addJournal('Mechanic refuses future equipment inquiry', 'complication', `soreheim-mechanic-silent-${G.dayCount}`);
      } else {
        G.lastResult = `Halden glances at the parts shelf before answering. "Failures have been up lately. Availability's been spotty from the supplier end." He says it the way someone says a thing they've already decided not to think about too hard. He goes back to the coupling on the bench. The shelf behind him carries parts that match three open repair orders pinned to the board above it. The parts are there. The orders are pending. The approval column on each order is blank.`;
        addJournal('Mechanic confirmed increased equipment failures', 'evidence', `soreheim-mechanic-failures-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. REPAIR WORKER: WORKPLACE ACCIDENTS
  {
    label: "Three accidents this month. Nobody is filing complaints. That's the point.",
    tags: ['Investigation', 'NPC', 'Safety', 'Labor', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: 'This path is closed here, but the repair crew takes its water break at the stone trough behind the grinding shed — away from the yard supervisors, away from the quota board, twelve minutes no one documents. The trough is set into the back wall of the shed, below the sound of the equipment; anything said there stays there. Eldis fills his cup slowly when he has something to say and quickly when he does not. Arriving before the bell gives a read of which it will be.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering workplace endangerment');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Eldis pulls back his sleeve without being asked. The burn scar on his forearm is two weeks old, still pink at the edges. "Three accidents this month. One a season used to be the pattern. Maret lost two fingers on the press last week — quota speed, skipped the guard protocol. Shift coordinator told her: file a complaint with the external committee and she's replaced before the bandaging comes off." He looks at the scar. "Nobody's filing anything. That's the point."`;
        G.stageProgress[1]++;
        addJournal('Worker revealed coordinated safety protocol neglect', 'evidence', `soreheim-repair-safety-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Eldis shakes his head and walks. "Accident talk gets you watched. I have three mouths at home." He doesn't look back. Two workers near the tool rack clock you as you stand there. They turn away and go back to work with the particular care of people who have decided not to know your name. The attention that comes with being clocked by two workers is harder to shed in a yard where everyone watches who talks to outsiders.`;
        G.worldClocks.isolation++;
        addJournal('Workers now see you as a potential threat to their employment', 'complication', `soreheim-repair-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Eldis keeps his hands moving while he talks. "Accidents are up. Safety complaints go into the coordinator's box and come back stamped 'reviewed.'" He loads a crate. "There's nothing wrong with the box. Nobody knows what 'reviewed' means." He moves on before you can ask the next question. The complaint box itself is mounted to the wall above the quota board, which means every worker who drops something in it does it in full view of the shift count. That placement is not accidental.`;
        addJournal('Worker confirmed increased accidents and ignored safety', 'evidence', `soreheim-repair-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Eldis watches you for a moment, then picks up the nearest thing — a length of chain — and starts coiling it. "Nothing to report on injuries. Shift hazards are posted on the board." He points at the board. The hazard notices are three months old. He keeps coiling. The chain is already coiled. He knows it. He needs something in his hands that isn't conversation. The tool rack behind him carries nothing with blood on it, which means the last incident didn't happen in this section of the yard.`;
        addJournal('Workplace injury information inaccessible without worker trust', 'evidence', `soreheim-repair-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. SHRINE HELPER: FAITH UNDER PRESSURE
  {
    label: "They used to pray for harvest and travel. Now they pray to keep their position.",
    tags: ['Investigation', 'NPC', 'Faith', 'Community', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: 'This path is closed here, but the shrine takes an oil delivery at midmorning when the inner room is empty — Kestra carries the canisters herself and the outer door stays propped open for the full half-hour. She sets them in sequence along the base of the offering shelf before filling the reserve lamp, which means both hands are occupied and the conversation can run without her needing to end it. The side alcove by the candle supply is out of sight from the road.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading spiritual pressure patterns');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Kestra refills the oil lamp before answering. "Used to be harvest thanks. Travel blessings. New baby prayers." She replaces the lamp glass. "Now they come in after the shift bell and they kneel for a long time without saying anything. When they do speak it's — keep my position, keep my family housed. Two people last week prayed not to be replaced." She straightens the cloth on the offering ledge. "They whisper. Like a tally-marker might be listening."`;
        G.stageProgress[1]++;
        addJournal('Shrine worker revealed spiritual crisis in community', 'evidence', `soreheim-shrine-crisis-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kestra steps between you and the inner room. "Prayers spoken here stay here. That's not custom — that's the compact with everyone who comes through that door." She holds her ground and waits. The lamp behind her keeps burning. The shrine is small and she takes up most of the doorframe. The scrutiny of a breach here spreads through the community quietly — the shrine door will not open to this line of questions again.`;
        G.worldClocks.reverence++;
        addJournal('Shrine now hostile to external questioning', 'complication', `soreheim-shrine-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Kestra nods without stopping what she's doing — trimming candle wicks, one after the next. "Traffic's up. Morning queue before the shift bell now." She drops the trimmed wicks into a clay dish. "People are in a hurry when they come. In a hurry when they leave. Used to linger more." A half-burned taper near the offering shelf has been left to gutter on its own — someone came and left before it went out. The wax has pooled on the stone and hardened in a shape that says they were here for less than five minutes.`;
        addJournal('Shrine worker confirmed increased prayer volume and desperation', 'evidence', `soreheim-shrine-strain-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. BROKER/MERCHANT: DISPLACEMENT PIPELINE
  {
    label: "Displaced workers are scattered — Sunspire, northern routes, agricultural circuits. Scattered workers don't organize.",
    tags: ['Investigation', 'NPC', 'Commerce', 'Movement', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: 'This path is closed here, but Broker Meth files his outbound placement ledgers at the guild registry on the last day of each quarter — the filing clerk there handles the submission and has no standing order to restrict discussion of public placement counts.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'mapping labor displacement flows');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Meth checks the doorway before pulling his chair closer. "Placed forty workers into Soreheim in the last six weeks. All from outside — Sunspire Haven, the outlying camps. No prior Soreheim ties, no history here." He taps the ledger. "The outbound flow is the tell. Displaced workers go in three directions and none of them cluster. They're scattered — Sunspire, the northern routes, the agricultural circuits. Scattered workers don't organize. The new ones are grateful enough not to ask questions. Someone chose those ratios deliberately."`;
        G.stageProgress[1]++;
        addJournal('Broker mapped deliberate workforce displacement network', 'evidence', `soreheim-broker-displacement-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Meth sets his pen down. "Labor flows are placement business. Not public business." He stands up from behind the desk, which puts him between you and the ledgers on the wall shelf. "I'd recommend taking your questions somewhere else." He doesn't sit back down. He stays standing until you leave, and the door to the street closes firmly behind you. The watchful stillness of his posture means every broker in that block will know your name and your question before tomorrow's placement session.`;
        G.worldClocks.watchfulness++;
        addJournal('Labor brokers now aware of your inquiry', 'complication', `soreheim-broker-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The placement office is narrow, lit by a single oil sconce that leaves the far shelf of ledgers in shadow. Meth shrugs one shoulder. "Personnel moves are normal. Seasonal variation, quota adjustments." He says it to the middle distance, not to you. The ledger on his desk is open to a page dense with crossed-out names, four deep in the last column. He doesn't offer to show it. His pen rests across the binding, nib still wet. The name he was writing when you walked in stays half-finished under his forearm.`;
        addJournal('Broker confirmed workforce transfers but minimized their scale', 'evidence', `soreheim-broker-evasive-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. RECORD KEEPER: DOCUMENTATION FALSIFICATION
  {
    label: "Workers are being removed from the record. Not from the city — from the record.",
    tags: ['Investigation', 'NPC', 'Records', 'Documentation', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: 'This path is closed here, but Record Keeper Parol submits his weekly corrections log to the external audit board every fifth day — that submission is a matter of guild charter and cannot be withheld, and the audit board holds a copy. The audit board office is in the trade registration annex, two buildings north of the records room, staffed by a different clerk under a different chain of authority. A corrections log that cannot be suppressed at the source may still be readable at the receiving end.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering documentation erasure');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Parol opens the cabinet without speaking and steps aside. Employment histories end mid-season, no termination notation. Three workers appear twice under different name spellings — same body measurements in the intake column, different names. Dates in at least six entries have been overwritten. "I got a directive three weeks ago," Parol says. "Don't flag erasure entries. Don't question alterations." He closes the cabinet. "These people are being removed from the record. Not from the city. From the record."`;
        G.stageProgress[1]++;
        addJournal('Record keeper revealed systematic worker documentation erasure', 'evidence', `soreheim-records-erasure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Parol shuts the ledger cabinet and locks it. "Employment documentation requires a labor administration request stamp. That's procedure." He picks up a form from the outbox and walks it to another desk — not in a hurry, just done with the conversation. The form he's filing has your name on it, written before you finished asking. The pressure of that pre-written form means someone anticipated this inquiry and prepared for it — you were tracked before you arrived.`;
        G.worldClocks.pressure++;
        addJournal('Labor authorities now investigating your records inquiry', 'complication', `soreheim-records-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The intake ledger has two different inks in the correction column — original entries in brown, alterations in black. Four workers listed as "transferred" have no destination recorded. One entry for a worker named Grett has a line drawn through it and nothing written underneath. Parol watches you notice. He doesn't explain. The alteration ink is consistent across six weeks of corrections — the same pen, the same hand, always after the fact. This is not clerical error. This is a second author working the ledger systematically.`;
        addJournal('Worker records show signs of deliberate alteration', 'evidence', `soreheim-records-altered-${G.dayCount}`);
      } else {
        G.lastResult = `The records room smells of dry ink and the dust of old intake forms. Parol straightens the stack on his counter until the edges are perfectly aligned, corrects a form that was already flush. "Employment documentation is restricted to authorized labor administration access." He sets a small stamped card on the counter — the request form for authorization. Two weeks to process, the card says, in print already worn soft from handling. Behind him, the cabinet is locked. The key is on a pull cord around his neck, and he does not look at the cabinet while he speaks.`;
        addJournal('Employment records blocked without labor administration approval', 'evidence', `soreheim-records-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. ARTISAN/CRAFTSPERSON: SKILL DEGRADATION
  {
    label: "Work that failed three months ago now ships. The workers who caught it are gone.",
    tags: ['Investigation', 'NPC', 'Craft', 'Integrity', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: 'This path is closed here, but Craftsperson Aldren enters his standards complaints in the guild grievance log, which is a charter-protected public document — the log desk is in the guild hall annex, not the administration building. The annex clerk has no standing order to restrict access to grievance entries. A log that records the specific pieces Aldren flagged, dated, would show which tolerances were failing and when the complaints stopped being filed. That gap would be its own record.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'reading craft standard erosion');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        var _aldrenFam = (typeof getArchetypeFamily === 'function') ? getArchetypeFamily(G.archetype) : '';
        var _aldrenDetail = _aldrenFam === 'combat' ? ' He hands you the joint before he sets it back down — the grip weight of it, the visible gap at the mortise. He wants you to feel the failure, not just hear about it.' : _aldrenFam === 'stealth' ? ' When he finishes, he glances toward the workshop door, then back to the piece on the bench. He has been careful about who he tells this to. He\'s decided you pass whatever test he was running.' : _aldrenFam === 'support' ? ' He looks up once, at the end. "Kosta and Prell had families here. Replacement workers came in from outside the district." He lets that sit a moment before going back to the file.' : '';
        G.lastResult = `Aldren holds up a finished joint for you to look at. The fit is sloppy — visible gap, wrong angle. "That would have come back to me three months ago. Now it ships." He sets it down. "Forty years working stone. I filed a standards complaint in the fourth week of the new quota cycle. They moved me off master assignments. Kosta and Prell both tried to hold the tolerance line — gone the following shift. Replaced by workers who cut fast and don't know what they're cutting." He doesn't look at the joint again.` + _aldrenDetail;
        G.stageProgress[1]++;
        addJournal('Craftsperson revealed deliberate quality and expertise destruction', 'evidence', `soreheim-craft-degradation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Aldren turns back to the bench. "My work is my answer." The two people working nearby both find something to look at that isn't you. The workshop carries on. You're standing slightly too far inside the door for comfort and the space makes that clear. The attention of a workshop that has all turned away is harder to walk back through than an empty doorway — your name moves between benches before the door closes behind you.`;
        G.worldClocks.isolation++;
        addJournal('Craftspeople now wary of external scrutiny', 'complication', `soreheim-craft-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Aldren runs his thumb along a finished edge and shows you the result — a burr that shouldn't be there. "Quota demands speed. Speed produces this." He drops the piece back onto the bench. "I don't set the targets." He picks up a file and starts correcting the burr himself, off the clock. The filing sound is slow and even — he's correcting at the pace the work deserves, not the pace the quota requires. Nobody tells him not to. The workshop is too loud to hear the difference.`;
        addJournal('Craftsperson confirmed craft standard compromise', 'evidence', `soreheim-craft-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The workshop smells of limestone dust and oil-blackened chisel steel. Aldren keeps both hands on the piece he's working — a corbel block, three-quarters rough, the finished face turned away from the door. "Standards are set by the quota office." He doesn't look up. Near the window, two other workers have gone quiet; their hammers strike in the same slow cadence Aldren sets, slower than quota pace. The workshop is loud with tools and none of it is conversation. A newer apprentice looks up once and remembers not to.`;
        addJournal('Craft standard information inaccessible without deeper rapport', 'evidence', `soreheim-craft-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. LABOR ANALYSIS TIER 1: WORKFORCE RESTRUCTURING
  {
    label: "The skills that made Soreheim independent have been cut out post by post.",
    tags: ['Investigation', 'Labor', 'Analysis', 'Pattern', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: 'This path is closed here, but the common housing block posts a new-arrival board by the entrance — intake dates, trade designations, origin marks — a public document no one has thought to restrict yet.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'workforce composition analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The intake logs span six weeks. Week one: twelve experienced quarry hands replaced by eight newer workers. Week three: the senior stonecutters' foremen bloc — four people — gone in three days. The new arrivals are younger, quieter in the common areas, and without existing ties to each other. The skill mix that let Soreheim run independently without outside direction has been excised position by position. Whatever comes next, this workforce won't organize to stop it — they don't know each other well enough.`;
        G.stageProgress[1]++;
        addJournal('Labor analysis revealed deliberate workforce composition restructuring', 'evidence', `soreheim-workforce-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A labor administrator intercepts you at the intake archive. "What is your authorization for demographic review?" There isn't one. She takes your name and writes it on a form without asking you to spell it. The file she puts it in is labeled in a shorthand you don't recognize. On your way out, a second administrator is waiting at the bottom of the stairs. You are now tracked by a filing system that already had a category prepared for this kind of inquiry.`;
        G.worldClocks.watchfulness++;
        addJournal('Labor administration alerted to workforce analysis inquiry', 'complication', `soreheim-workforce-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The common areas of the housing block tell a partial story: newer faces at the morning meal, older workers clustered at the far end of the benches, keeping to themselves. The shift composition has changed. The specific shape of the change — who was pulled, who was placed — stays inside the administration building. There is still the matter of the displacement log — the handed notation and missing destinations may be readable through the record keeper Parol.`;
        addJournal('Workforce composition changes detected but incomplete data', 'evidence', `soreheim-workforce-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. PRODUCTION ANALYSIS TIER 2: QUOTA SYSTEM MECHANICS
  {
    label: "Safety stops count against output. Preventing an accident means failing quota.",
    tags: ['Investigation', 'Systems', 'Economics', 'Control', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: 'This path is closed here, but the quota methodology document was submitted as part of the seasonal charter renewal, which is a matter of public record at the outer guild registry window — the renewal clerk operates independently of the labor administration stamp system.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing quota system architecture');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The baseline capacity figures are sourced from peak-condition records — best weeks, optimal weather, full crew, no equipment downtime. Those figures are what the targets are built on. Then the targets are raised five percent above that. The measurement methodology changed six weeks ago: safety stops now count against output. Equipment maintenance time counts against output. Quota compliance is the only path to 'passing.' Everything else is failure. A worker who stops to prevent an accident fails their quota. The architecture makes the compliant and the surviving mutually exclusive.`;
        G.stageProgress[1]++;
        addJournal('Systems analysis revealed quota architecture designed for failure', 'evidence', `soreheim-quota-system-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A management coordinator appears at the quota archive before you finish cross-referencing. "System documentation is restricted." She pulls the ledger from the table. Your name is already on a slip she leaves behind — an access restriction notice, pre-written, waiting to be filed. The archive door closes with a latch. The pressure of a pre-written restriction notice means this archive is now harder to approach by any route.`;
        G.worldClocks.pressure++;
        addJournal('Management restricted access to quota system information', 'complication', `soreheim-quota-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Two sets of documentation exist in the archive: one from fourteen weeks ago and one from six weeks ago. The calculation methodology in the newer version doesn't reference the older one — it starts from different source figures. The targets went up. The basis for setting them changed. No notation explains why. In the older set, entries run day by day through the full production season — then stop. They resume eleven days later with no annotation, no closing entry for the gap, no note of suspension. The ink on the resumption day is slightly different in weight, as though the pen was taken up again after a long pause. The eleven days are simply absent.`;
        addJournal('Quota system modifications confirmed', 'evidence', `soreheim-quota-modified-${G.dayCount}`);
      } else {
        G.lastResult = `The quota board outside the administration building shows this week's targets in fresh paint. The numbers are large. The methodology behind them lives inside the building, behind a desk with a stamp on it. The stamp belongs to someone who isn't available to speak with you today. The junior clerk Davel works the evening shift alone — he files documents into a system whose dating key he doesn't hold, which means someone above him does.`;
        addJournal('Quota system mechanics inaccessible without management access', 'evidence', `soreheim-quota-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. INDUSTRIAL ANALYSIS TIER 1: SUPPLY CHAIN DISRUPTION
  {
    label: "Outbound carts outnumber inbound three to one. The stamps on those manifests face inward.",
    tags: ['Investigation', 'Industrial', 'Supply', 'Flow', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: 'This path is closed here, but the dispatch yard gate log is posted at the entry pillar each morning — a tally of cart counts in and out, no manifest detail, but the ratio is there in plain figures for anyone who stops to read the board.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'supply chain flow analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Six weeks ago the inbound stone and timber materials switched from three rotating suppliers to one: a northern logistics house with no prior Soreheim record. Outbound finished goods have changed routing — no longer moving to the regional market circuit. The dispatch stamps show a single northern destination. Soreheim's quarry output is being funneled out through a single controlled point. The city's own repair and maintenance requisitions are backlogged — city needs deprioritized behind extraction quota. The production infrastructure is being pointed outward and emptied.`;
        G.stageProgress[1]++;
        addJournal('Industrial analysis revealed deliberate supply chain isolation', 'evidence', `soreheim-supply-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A logistics coordinator stops you at the dispatch yard gate. "Material flow records are internal operations documents." He writes your name on the gate log — not the visitor log, the other one. Two manifests on the cart behind him are quickly covered by a tarp. He waits at the gate until you are off the yard. The watchful waiting means your name is on the gate log that the next shift supervisor reads at handover.`;
        G.worldClocks.watchfulness++;
        addJournal('Logistics coordinators alerted to supply chain inquiry', 'complication', `soreheim-supply-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Cart wheels cut ruts into the yard's packed stone at a pace that would match a festival week, except the yard is quiet. No hailing between drivers, no teamsters calling loads. The dispatch yard is busier than a city of this quota cycle should be. Outbound carts outnumber inbound by three to one. The routing stamps on the outbound manifests face inward — turned so that the destinations don't read from where someone passing would see them. The cart drivers don't stop to talk. They don't look at each other either. The Iron Compact routing marks on the secondary stamps in the outbound crates — three crates not on any manifest — point toward the same northern relay.`;
        addJournal('Supply chain anomalies detected but incompletely mapped', 'evidence', `soreheim-supply-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. AUTHORITY STRUCTURE TIER 2: DECISION ISOLATION
  {
    label: "The administrator runs the briefing. Every directive carries a northern stamp.",
    tags: ['Investigation', 'Authority', 'Structure', 'Power', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: 'This path is closed here, but the morning briefing is open to floor supervisors, and supervisors are permitted to bring a registered trade observer — the guild hall issues observer tokens at the front desk, no authorization stamp required. A token holder seated in the back row of the briefing room would hear every directive read aloud, including which ones carry the northern header stamp and which are still originating from Bresn. The directives are numbered. The gaps in that numbering would show which ones never get read out in full.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing authority restructuring');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The shift administrator Bresn still holds the title on the door plaque. He also still holds the morning briefing — stands at the head of the table, takes questions, distributes the day's targets. But every numbered directive on those targets carries a secondary header stamp from the northern coordination office. Bresn didn't write any of them. He reads them out. The people in that room know it. None of them say so in front of each other. The structure looks intact from outside. Inside, it runs on a different track.`;
        G.stageProgress[1]++;
        addJournal('Authority analysis revealed external control capture structure', 'evidence', `soreheim-authority-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Bresn's door is closed when you arrive and still closed when his assistant looks up and asks your name. It goes on a slip. "The administrator isn't receiving general visitors." On your way through the building, two people who were previously willing to speak with you find somewhere else to be. The pressure of your name on that slip reaches further than the administrator's corridor — it was already passed to the people you needed to see next.`;
        G.worldClocks.pressure++;
        addJournal('Local leadership now viewing you as potential threat', 'complication', `soreheim-authority-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The directive board outside the administration hall has two stamp marks on every notice — Soreheim Alliance standard, and a second mark in the upper right corner. That second mark wasn't on the board two months ago. The workers passing it don't look at it. They looked at it the first week. Now they walk past without breaking stride, the way people walk past a thing they have decided to accept. The second mark has become part of the wallpaper. That transition took less than four weeks.`;
        addJournal('Authority structure reorganization confirmed', 'evidence', `soreheim-authority-modified-${G.dayCount}`);
      } else {
        G.lastResult = `The administration building runs its posted schedule down to the quarter-hour. Meetings at the posted times, staff at the posted desks, the corridor lamps trimmed to an even burn. A clerk carries a stamped folio across the hall, another passes the opposite direction; neither looks at the other. Who sets the agenda behind the posted schedule is a question that requires someone on the inside of those meetings to answer. The door to the administrator's office is closed. A clerk at a desk outside it notes the time of every knock and the name of everyone who waits.`;
        addJournal('Authority structure analysis incomplete without insider perspective', 'evidence', `soreheim-authority-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. COMMUNICATION NETWORK TIER 1: MESSAGE MONITORING
  {
    label: "Labor petitions come back stamped but never forwarded. The city is talking to itself.",
    tags: ['Investigation', 'Communication', 'Networks', 'Control', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: 'This path is closed here, but courier Fess runs the pre-dawn route before the relay station opens — he loads from the side window, not the counter, and that window has a different supervisor on the early half-shift.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'communication network analysis');
      G.stageProgress[1]++;

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `A courier named Fess explains it without being asked twice. "Outbound labor petitions — delayed at the relay station. I've had three in the past month held for 'verification.' They come back stamped but not forwarded." He shows a receipt log. Incoming news from outside arrives in bundled summaries now, three days late, already edited — the originals don't make it to the posting board. Requests to the regional labor board are being intercepted before they leave Soreheim. The city is being kept talking to itself.`;
        G.stageProgress[1]++;
        addJournal('Communication analysis revealed systematic message interception', 'evidence', `soreheim-communication-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The relay station handler closes the window when you approach. A second one appears from the back and tells you the station isn't open to public inquiries. Walking away, you notice a third person watching from the side alley — not in courier colors. They don't follow, but they don't look away either. The watchful set of that figure in the alley means the station knows you tried — and the next relay point on this route will know before you reach it.`;
        G.worldClocks.watchfulness++;
        addJournal('Communication network handlers now aware of monitoring attempt', 'complication', `soreheim-communication-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The courier circuit has new routing marks chalked onto the dispatch board this season — an extra stop added between Soreheim and the regional relay, not listed in the public schedule posted in wax-sealed print beside it. The chalk is fresh, handwritten, in a cadence that doesn't match the clerk's. One courier shrugs when asked. "New logistics arrangement." He doesn't say whose. He checks his strap, adjusts the weight of his satchel, and leaves through the side gate instead of the main one. The main gate is the shorter route.`;
        addJournal('Communication network reorganization detected', 'evidence', `soreheim-communication-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. RESISTANCE TIER 2: SUPPRESSION MECHANISMS
  {
    label: "No formal warnings — just reassignments, always timed precisely.",
    tags: ['Investigation', 'Resistance', 'Suppression', 'Fear', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: 'This path is closed here, but the reassignment notices themselves are filed in the personnel board record, which is posted by guild charter at the annex entrance — the pattern is readable in the dates without requiring anyone to speak. A reassignment dated within three days of a quota objection is not random correlation when it happens four times running. The board shows names and dates. The grievance log shows names and dates. The overlap is arithmetic, not inference.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing suppression apparatus');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `A pattern across four separate conversations: each person who raised a quota objection was reassigned within a week. Two who pushed on safety were moved to isolated single shifts with no coworkers. One who tried to circulate a petition had her housing reassignment request denied the next day — the only denial on record in two months. No one received a formal warning. The pressure came through ordinary administrative processes, timed precisely. The machinery of suppression wears the face of routine management.`;
        G.stageProgress[1]++;
        addJournal('Suppression analysis revealed systematic worker intimidation apparatus', 'evidence', `soreheim-suppression-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The same afternoon, the two workers who spoke with you are both pulled for "performance review." One sends a message asking you to stop asking questions near her. The other doesn't send anything. Your presence in this part of the city now carries a cost for anyone who stands close enough to talk. The pressure of those two pulled workers is a signal anyone nearby will have noticed — proximity to your questions now carries consequences.`;
        G.worldClocks.pressure += 2;
        addJournal('Inquiry causing worker retaliation acceleration', 'complication', `soreheim-suppression-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `In the common housing block, no one eats near the door. Groups of three or more don't stay together after the meal. Anyone who meets your eyes looks away and doesn't look back. The space between people is practiced — wide enough to not be part of whatever conversation you're about to have. The benches are long enough to seat eight. Nobody sits beside someone they don't already know. The hall has enough room and not enough safety, and the workers have done the arithmetic on both.`;
        addJournal('Worker suppression confirmed through behavioral patterns', 'evidence', `soreheim-suppression-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The meal hall smells of boiled barley and damp wool. Every conversation ends when it reaches a certain threshold. Workers talk freely about weather, quotas, sore backs — a thumbnail split under a chisel edge, a leaking bootseam — the ordinary griefs that make a day's labor sayable. Then you ask about objections or organizing and the words stop coming. Not hostility — stoppage. As though that part of the conversation simply doesn't exist. A man across the table reaches for the salt crock instead of answering, and holds it a little too long.`;
        addJournal('Worker suppression suspected but mechanisms not yet documented', 'evidence', `soreheim-suppression-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 15. SURVIVAL ANALYSIS TIER 1: WORKER VULNERABILITY
  {
    label: "This isn't an economy under pressure. Someone drew the pressure map first.",
    tags: ['Investigation', 'Survival', 'Vulnerability', 'Pressure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: 'This path is closed here, but the housing allocation ledger is posted at the residential block entrance by district ordinance — names, dependency counts, and tenure status in a single column, no authorization required to read the board. Cross-referencing those names against the displacement log shows which workers with children or elderly dependents were cut first. The tenure column shows how long each person had worked here before removal. That sequence is a map of who was most exposed and who got targeted first.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'worker vulnerability mapping');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Older workers: replaced first — they cost more per unit output. Workers with children in the city schools: their housing allocation is tied to their employment status, which means the children move if the parent is cut. Skilled workers whose training is Soreheim-specific: they can't leave without losing everything that makes them hireable. Young workers brought in from outside: no housing ties yet, nothing to protect, compliant from scarcity. Each category has been identified and its weakness applied with precision. This is not an economy under pressure. This is a pressure map that someone drew first.`;
        G.stageProgress[1]++;
        addJournal('Survival analysis revealed systematic worker vulnerability weaponization', 'evidence', `soreheim-survival-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A labor administrator catches up to you at the end of the housing block — a woman with ink-blackened knuckles and a leather document case worn smooth at the corners. "Documenting workforce precarity without authorization violates operational security policy." She hands you a printed notice. The paper smells faintly of pressroom lampblack. The notice was already printed. It has today's date on it. She waits while you read, weight on one heel, then collects the copy back and files it without writing anything. Your name wasn't needed. The notice wasn't issued to you. It was shown. The administration's attention was on you before you reached the housing block.`;
        G.worldClocks.pressure++;
        addJournal('Management prohibited further worker vulnerability analysis', 'complication', `soreheim-survival-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The ration queue at the central market runs past forty people and nobody in it is talking. They stand with the particular stillness of people who have been standing in queues like this long enough to stop expecting them to move faster. Three of the people near the back have work gloves still on — came straight from the shift yard, afraid to lose their place.`;
        addJournal('Worker vulnerability and fear patterns confirmed', 'evidence', `soreheim-survival-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Workers at the meal hall eat quickly and don't linger. A table of four breaks up as soon as the plates are cleared. The windows are on the north side — facing the quota board on the administration building across the yard. The board is visible from where they sit. Nobody has closed the shutters. Nobody talks about the board. They eat with their backs to the window, which is the most information that window has to give without words.`;
        addJournal('Worker vulnerability analysis incomplete without deeper interviews', 'evidence', `soreheim-survival-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. NARRATIVE CONTROL TIER 2: OFFICIAL JUSTIFICATION STRUCTURE
  {
    label: "The posted notices recycle three phrases. Those exact phrases appeared in a northern Compact bulletin.",
    tags: ['Investigation', 'Narrative', 'Control', 'Justification', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: 'This path is closed here, but the Iron Compact maintains a public bulletin archive at the trade registry — bound quarterly by the filing clerk, available without stamp, the northern bulletins shelved in order by date.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'official narrative deconstruction');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The posted notices in the administration hall use three phrases, cycling: "regional efficiency correction," "strategic workforce alignment," "productivity enhancement program." Each sounds like a different thing. Laid in sequence, they describe the same process from three angles — enough variation to seem organic, consistent enough to hold the same shape. The phrases didn't originate here; the same language appears in a northern Iron Compact bulletin from eight weeks ago, word for word. The cover story was supplied along with the directives.`;
        G.stageProgress[1]++;
        addJournal('Narrative analysis revealed constructed justification system', 'evidence', `soreheim-narrative-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A management communications officer approaches you at the notice board. "These statements represent Alliance operational updates. Characterizing them otherwise is misinformation." He has a printed form. "Please direct any further questions about operational communications to the administration office." The form is a complaint log. Your name goes in the top box. The watchful speed of that approach — before you finished reading — means someone is monitoring who stands at this board and how long.`;
        G.worldClocks.watchfulness++;
        addJournal('Management aware of narrative structure analysis', 'complication', `soreheim-narrative-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The three different posted notices about quota changes hang side by side on the administration hall's pinboard, each stamped and dated within the last two weeks. They all end the same way: "per Alliance operational standards." The handwriting varies — one hand is slanted, one upright, one pressed hard enough to cut the paper — but the closing phrase is identical in all three, down to the dash and the spacing before "standards." Someone gave them that phrase to use. The pinboard's older notices, underneath, close with different language. The change came together.`;
        addJournal('Quota notices share identical scripted closing phrase across three hands', 'evidence', `soreheim-narrative-structured-${G.dayCount}`);
      } else {
        G.lastResult = `The administration office has a printed language guide on the front counter — a laminated card, finger-smudged at the edges from daily handling. Approved terminology for shift supervisors when discussing quota targets with workers. Three phrases on one side, three on the other; each with an annotation indicating what the older phrasing used to be. "Layoff" has been replaced with "transition allocation." "Deadline" with "compliance window." It's a small thing, a card. It is not a small thing. The supervisor on duty sees you reading it and turns the card face-down.`;
        addJournal('Narrative structure analysis incomplete without management documents', 'evidence', `soreheim-narrative-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 17. STREET RUMOR: LABOR WHISPERS
  {
    label: "The story moves down the meal hall bench in pieces. Too consistent for coincidence.",
    tags: ['Investigation', 'Rumor', 'Labor', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    failResult: 'This path is closed here, but the meal hall empties slowly on the north side after second bell — the workers who stay longest are the ones who have already decided they have nothing left to lose by talking.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing worker narrative');
      G.stageProgress[1]++;

      const rumor = ['displaced workers are being sent to mines further north', 'the quota increases came from outside Soreheim', 'safety violations are being covered up systematically', 'workers who protest disappear for weeks then come back broken', 'someone is deliberately replacing skilled workers with inexperienced ones'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `At the meal hall bench nearest the side wall, someone says: "${selected}." It passes down the table in pieces. One worker treats it as fact, speaks flatly. The next hedges. The one at the end shrugs and eats. The story is moving through the community without a source anyone can name — spreading the way true things spread, too consistently for coincidence, never quite confirmed enough for action.`;
      addJournal(`Worker rumor gathered: "${selected}"`, 'evidence', `soreheim-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. INSTITUTIONAL CRACK: QUOTA SYSTEM FAILURE PROOF
  {
    label: "They hit ninety-two percent of sustainable output every day. They fail quota every day.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Systems', 'Exposure', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    failResult: 'This path is closed here, but the two-year-old capacity survey was submitted to the guild council as part of a public works assessment — that report is bound and filed at the council clerk office, available on request without labor administration authorization. The survey recorded sustainable daily output under normal conditions: crew size, equipment state, seasonal adjustment. Placed next to the current quota baseline and this month\'s actual output, those three numbers produce a comparison that requires no interpretation. The arithmetic does the work.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing quota system conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Three documents, laid side by side: the capacity survey from two years ago, the baseline figure used to set current quotas, and the actual shift output records from the past month. The capacity survey shows a sustainable maximum. The baseline used for quotas is thirty percent above it. The output records show the workforce hitting ninety-two percent of sustainable maximum every day — and failing quota every day. The math is not ambiguous. The target was designed to produce documented failure. Every dismissed worker has a clean paper justification that was written before they arrived.`;
        G.stageProgress[1]++;
        addJournal('Quota system failure architecture documented with proof', 'evidence', `soreheim-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Someone is waiting outside the archive when you leave. He takes the papers from under your arm without speaking — holds out his hand and waits until you give them over. "Operational documentation is Alliance property." He has a badge. He leaves with the documents. A second person appears at the corner of the building and watches you walk away. You are tracked now by people who knew which archive and which documents — the scrutiny was already in place before the door opened.`;
        G.worldClocks.pressure++;
        addJournal('Management directly warned about quota system analysis', 'complication', `soreheim-proof-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The baseline figures don't cite a source document — they appear as given, handed down from somewhere upstream. The current workforce's monthly output, when plotted against those baselines, fails every week without exception. Either the workforce is collectively failing by the same margin simultaneously, or the baselines were chosen to produce that result. Both can't be true at once. The entries for the third week of last season stop mid-page and resume four days later; the gap carries no closing notation, no suspension mark, nothing.`;
        addJournal('Quota system rigging strongly suggested by data analysis', 'evidence', `soreheim-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The quota documentation references a capacity survey as its source material. The capacity survey is in a separate archive. That archive is authorized access only. The person who holds that authorization is currently in a review meeting that began this morning and has no posted end time. On the public-access shelf, one volume down from where the capacity survey should be, there is a gap. Something was there and was removed. The gap is three fingers wide and the shelf dust shows the outline of what it held.`;
        addJournal('Quota system proof incomplete without capacity documentation', 'evidence', `soreheim-proof-incomplete-${G.dayCount}`);
      }

      addHeat('soreheim', 1);
      G.rivals = G.rivals || {}; G.rivals.heat = (G.rivals.heat || 0) + 1;
      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. MORAL PRESSURE: COMPLICITY AND PARTICIPATION CHOICE
  {
    label: "They're waiting to learn what this conversation costs them.",
    tags: ['Investigation', 'Moral', 'Choice', 'Pressure', 'Confrontation', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: 'This path is closed here, but the NPC\'s name is already in the displacement log — approaching them through the documented record rather than direct confrontation removes the personal threat and gives them a different kind of opening.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'making moral commitment');
      G.stageProgress[1]++;

      const npcOptions = [
        { name: 'Foreman Thrace', role: 'shift supervisor', fear: 'If I don\'t enforce quotas, I lose my position and my family loses housing' },
        { name: 'Labor Broker Meth', role: 'workforce coordinator', fear: 'I\'m paid to move workers. If I refuse, they\'ll replace me with someone less scrupulous' },
        { name: 'Quota Clerk Serin', role: 'record keeper', fear: 'They told me to alter records or face dismissal and blacklisting from all labor networks' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `${npc.name} goes still when you name what you know. The silence lasts long enough to be its own answer. Then: "${npc.fear}." Their hands don't move. They're waiting to learn what this conversation costs them. Expose them and the system loses a cog — but they lose everything. Protect them and they owe you, which means they can be called on. Either way, they will remember this moment. So will you.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal(`Confronted ${npc.name} (${npc.role}) about displacement system participation`, 'complication', `soreheim-moral-${G.dayCount}`);
      addHeat('soreheim', 1);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. DISCOVERY MOMENT: EXTERNAL COORDINATION SOURCE
  {
    plot: 'main',
    label: "The orders predate the quota increase by three weeks. Soreheim was the plan.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    failResult: 'This path is closed here, but the administration archive has a secondary entrance through the north corridor that is unstaffed after second bell — the courier receipts are filed in the outer cabinet, not the locked interior stacks. The outer cabinet is a two-drawer lateral chest beside the window. The receipts inside are sorted by week, not by origin, which means finding the northern correspondence requires reading headers by lamplight rather than pulling a specific index. The corridor lamp stays lit through the night shift.',
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of displacement');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The courier receipts are bundled behind the quota adjustment notices in the administration archive — tucked, not filed. Northern territories letterhead. The instructions name specific positions: the foreman, the quota clerk, the labor brokers. Names, not titles. Whoever wrote these knew the organizational chart before the restructuring started. The orders predate the first quota increase by three weeks. Soreheim wasn't reacting to a problem. Soreheim was the plan.`;
        G.stageProgress[1]++;
        addJournal('Origin source of Soreheim workforce displacement identified as external coordination', 'discovery', `soreheim-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Two steps from the archive cabinet, someone takes your arm. "This area is not open to you." He doesn't raise his voice. There are two more people in the hall. You leave. On the way out, a notice has been pinned to the gate: a general restriction on archive access, dated today, with a timeframe of indefinite. It was already printed when you arrived. The pressure of a gate notice printed before you reached the cabinet means the people you were about to find evidence of were already tracking your progress through this archive.`;
        G.worldClocks.pressure += 2;
        addJournal('Inquiry interrupted by external coordination operators', 'complication', `soreheim-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The courier routing stamps in the dispatch log reference an intermediary station that doesn't appear in Soreheim's standard trade network — a northern relay point. Three separate documents carry a header mark that doesn't match any Soreheim Alliance bureau. Something is signing orders here that didn't originate here. The station code is a three-letter abbreviation: NKV. It appears on documents dated across six weeks — consistent enough to be structural, not occasional. Whatever NKV is, it has been part of this from the start.`;
        addJournal('External coordination of Soreheim displacement confirmed', 'discovery', `soreheim-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `One notice on the administration wall has a stamp in the upper corner that doesn't match the others — different proportions, different border, the ink slightly darker than the Soreheim Alliance standard. You copy it down before the hall empties for shift change. You don't know what it means yet. You know it doesn't belong. The notices around it are routine: quota cycles, maintenance schedules. This one concerns personnel transfers. Of course it does.`;
        addJournal('External coordination suspected but source not yet identified', 'evidence', `soreheim-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: IRON COMPACT ROUTING MARKS
  {
    label: "Three outbound crates carry a stamp not in the Soreheim registry. No manifest entry.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    failResult: 'This path is closed here, but the Iron Compact arbiter Keln Vare holds office inside the shift administration building — the anomalous freight marks fall inside his stated area of oversight. A neutral trade arbiter has standing to request manifest clarification from the dispatch yard without triggering the same authorization chain a private party would face. Whether Vare would use that standing on your behalf is a different question. He already knows the marks are there. He has been choosing not to act on them.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'reading shipment routing evidence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 14) {
        G.lastResult = `Three crates in the outbound row carry a secondary stamp below the standard routing mark — smaller, different ink, not in the Soreheim mark registry. Iron Compact northern freight relay. The crate numbers don't appear in the dispatch manifest on the wall. They exist in the yard. They don't exist on paper. Someone is moving selected quarry output outside Soreheim's own allocation record.`;
        if (!G.flags) G.flags = {};
        G.flags.found_iron_compact_routing = true;
        addJournal('Shipment routing anomalies linked to Iron Compact relay marks', 'evidence', `soreheim-routing-${G.dayCount}`);
      } else {
        G.lastResult = `The freight marks run six lines deep on each crate — origin, classification, handler, route, priority, destination. Most match the Soreheim Alliance format you know. Two marks on the third row don't. Different border geometry, different abbreviation set. The anomaly is present. Reading it is a different problem. The crate itself is sealed with the standard cord-and-wax closure. The secondary mark is pressed into the wax below the main seal, small enough to miss unless the light is right. Someone put it there deliberately, below eye level.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. CLUE: WORKER DISPLACEMENT LOG
  {
    label: "Thirty-one workers crossed out in a different hand. Notation says transferred. No destination.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    failResult: 'This path is closed here, but the displacement log was drafted before it was filed — Record Keeper Parol works the outer desk alone on the morning half-shift, before the labor administrator arrives with the stamp.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'recovering discarded documentation');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `Six weeks of shift records, damp at one corner, ink smeared on two pages. Names crossed out in a hand that doesn't match the original entries — heavier stroke, different pen angle. Thirty-one removals. Eighteen replacements. The crossed-out workers carry the notation "transferred" with no destination following it. No forwarding assignment. No receiving station. They left Soreheim's labor record and arrived nowhere on paper.`;
      if (!G.flags) G.flags = {};
      G.flags.found_displacement_log = true;
      addJournal('Displacement log recovered: 31 workers erased without forwarding record', 'evidence', `soreheim-displog-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ARCHETYPE-GATED: READING THE PRESSURE
  {
    label: "Shoulders loose, weight back, eyes on the gate. This yard is paused, not tired.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 70,
    failResult: 'This path is closed here, but the shift yard is most readable at the bell change when supervisors are occupied with the handover count — the workers move freely for four minutes before the new shift coordinator reaches the gate. In those four minutes, the posture of the yard changes. Groups form that don\'t form at any other time. Words get exchanged that don\'t get exchanged under supervision. The yard\'s real social structure is visible in those four minutes more clearly than in any other window of the shift.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reading crowd pressure');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The posture is wrong for exhaustion — shoulders loose, weight back, eyes tracking the gate. This is a yard full of people waiting for someone to give them a signal. Not tired. Paused. Every figure who might have called the pause is already gone from the roster. Someone pulled the leaders first, before the pressure went up. The field was cleared before the pressure began.`;
      } else if (arch === 'magic') {
        G.lastResult = `The information flows here have been shaped. Specific — not suppressed broadly but filtered at a particular threshold. Rumors about who got cut, which quotas rose: those travel freely. Anything connecting those facts into a larger pattern stops moving. Workers hear the pieces. Nobody assembles them. The filter runs above the floor of what people are willing to say, below the ceiling of what they've noticed.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Three figures near the shift gate without work gloves. One adjusts position every twenty minutes, tracking the yard without appearing to track it. The second watches the meal hall door. The third is mobile — moves when someone lingers. They don't speak to each other. The coverage is continuous and the workers know it. They don't look at the three men directly either.`;
      } else {
        G.lastResult = `A foreman's eye meets a worker's across the yard and both look down at the same speed. Not quick — practiced. The timing of the look-away is identical, which means it's happened before. They both know something and have both decided, separately or together, to perform not knowing it. The performed ignorance is synchronized. That takes time to develop. The yard has been rehearsing this. Six weeks, based on when the quota cycle changed. The behavior and the timeline match.`;
      }
      addJournal('Shift yard pressure patterns read — coordinated suppression confirmed', 'evidence', `soreheim-pressure-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. SOCIAL: APPROACH THE JUNIOR CLERK
  {
    label: "The youngest clerk asked why they changed the dating system. Nobody told him.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    failResult: 'This path is closed here, but Davel is still at the evening shift tomorrow — bringing something that shows what the dating code maps to may give him a reason to talk. He filed documents for three weeks without knowing what the new system was indexing. He would recognize a translation key if he saw one. He\'s nineteen and working alone in a building that smells of wax and old paper, and he has been waiting for someone to offer him a reason to ask the question he has been not asking.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'building low-pressure rapport');

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Davel talks to his food at first, not to you. He's nineteen and working the evening shift alone. Three weeks ago his supervisor told him to stop dating records by locality — use a new numerical code instead. "I asked what the code maps to. He said it's being unified across the network." He picks up a blank form and sets it down again without looking at it — a habit, something to do with his hands when the answer he has is smaller than the question it belongs to. Davel hasn't been told what network. The documents he's filed since then go into a system he has no key to read. Someone above his supervisor does.`;
        if (!G.flags) G.flags = {};
        G.flags.met_davel_clerk = true;
        addJournal('Junior clerk Davel revealed new undecipherable dating system in records', 'intelligence');
      } else {
        G.lastResult = `Davel takes the food and keeps his hands around the bowl. He was warned — his posture says so. The meal helps. He doesn't leave. He doesn't speak either, not yet. He chews slowly and watches the door. The lamp above the desk behind him is turned low, which means someone told him not to draw attention tonight. A second visit, when whoever warned him is not on shift, might open a different conversation.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 25. FACTION SEED: IRON COMPACT CONTACT
  {
    label: "The Compact arbiter's office is inside the shift administration building. Unusual for a neutral party.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 72,
    failResult: 'This path is closed here, but Vare said even-numbered afternoons during shift administrator reviews — the office runs a posted schedule and the secretary records every name that waits. The waiting area is a bench in the corridor outside the Iron Compact door. Anyone sitting there is visible from the administration hall end of the building. Being seen waiting to speak with the arbiter carries its own signal. Whether that signal is a cost or a useful one depends on what comes out of the meeting.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'making Iron Compact contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Keln Vare doesn't stand when you enter. He finishes writing a line in his ledger, then sets down the pen. "Regional efficiency correction," he says, before you've asked anything. He offers priority placement in a labor registry — generous enough that accepting it would mean something. You decline. He closes the ledger. "Then we're two parties observing the same process." The way he says it: he'll be here when you change your mind.`;
        if (!G.flags) G.flags = {};
        G.flags.met_iron_compact_arbiter = true;
        G.factionHostility.iron_compact += 1;
        addJournal('Iron Compact arbiter Keln Vare made first contact — offered registry placement', 'contact_made');
      } else {
        G.lastResult = `The Iron Compact office door is closed. The secretary looks up, writes down your name without being asked for it, and tells you the arbiter is in quota review meetings. Even-numbered afternoons, shift administrators. The office runs a full schedule. Vare is accessible. He's just not available today. The secretary's ledger is already open to a page with other names on it — names written today, all in the same time window. The arbiter has been in demand this week.`;
        if (!G.flags) G.flags = {};
        G.flags.located_iron_compact_arbiter = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 26. ATMOSPHERE: THE RELIC STRATEGY WING PLAQUE
  {
    label: "The plaque has been recently cleaned. Someone still believes the story is worth dusting.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 55,
    failResult: 'This path is closed here, but the guild annex holds a bound history of the Relic Strategy Wing — the founding registry is a public charter document, available at the clerk desk without authorization.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'reading local history');

      G.lastResult = `Seventeen names in pressed metal, small lettering. Crafters who held production through eleven months of supply blockade during the last Resource War. The footer reads: "They kept the forge burning so the alliance did not starve." The plaque has been recently cleaned — no grime in the letter grooves. Whoever dusts it still believes that story is worth dusting. The quota board is visible from here, two buildings down, with this week's targets in fresh paint.`;
      addJournal('Relic Strategy Wing plaque — Soreheim craft heritage tied to alliance survival', 'discovery', `soreheim-plaque-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 27. PERSONAL ARC SETUP: PROTECTING EVIDENCE
  {
    label: "Decide how to secure the documentation you've gathered before it can be confiscated.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'securing evidence cache');
      if (!G.flags) G.flags = {};

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Three locations, none adjacent. The quota records go into a shrine alcove behind the candle supply shelf — low traffic after midday. The displacement log rolls tight and slides inside a wall-mounted tool bracket in the coopering workshop, behind two mallets nobody has moved in weeks. The courier receipt copies go into a false-bottom crate on the bottom shelf of the same workshop. A search that finds one location stops there.`;
        G.flags.evidence_secured_soreheim = true;
        addJournal('Evidence distributed across three secure caches in Soreheim', 'evidence', `soreheim-cache-${G.dayCount}`);
      } else {
        G.lastResult = `One location: a loose stone behind the meal hall hearth, dry and recessed enough to hold a folded bundle. Not ideal — a single cache is one search away from gone. But it's tonight's answer and tonight is what matters. The documentation is out of your hands and off your person. The hearth smells of wood ash and scorched barley. The stone is loose because the mortar cracked two winters back and no repair order was ever filed. Nobody looks at that corner. That's the best that can be said for it.`;
        G.flags.evidence_secured_soreheim = true;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 28. CLUE: RELIC STRATEGY WING CORRESPONDENCE
  {
    label: "The courier's route doubles back before heading north. Two seals — one I don't recognize.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 78,
    failResult: 'This path is closed here, but the courier Fess loads his pre-dawn batch from the side window before the relay station supervisor arrives — that window has no standing order to check observer credentials. Fess is already running by the time the supervisor clocks in; the load manifest gets signed in absentia on a hook by the door. A figure standing near that hook while the batch loads would be close enough to read the seal colors on the outbound packets without needing to touch them.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'intercepting strategic correspondence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `The outer frame of the letter isn't coded. It doesn't need to be — nobody was supposed to read it. "Stage two of the restructuring proceeds on schedule. Workforce resistance below threshold. Recommend advancing timeline for final extraction." The body is coded. The seal at the bottom is a crest you don't recognize: a coiled chain above a horizontal bar, no text underneath. This operation has stages. It has a final stage. Someone north of Soreheim is tracking its progress.`;
        if (!G.flags) G.flags = {};
        G.flags.found_strategic_correspondence = true;
        addJournal('Intercepted correspondence confirms staged restructuring with final extraction target', 'discovery', `soreheim-intercept-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The courier's route doubles back twice before heading north. Relic Strategy Wing seal on the main closure, a secondary seal you don't know on the inner wrap. You follow far enough to see the destination: a merchant house front on the north side of Soreheim, no trade signage. The courier goes inside. He doesn't come back out in the time you have.`;
        if (!G.flags) G.flags = {};
        G.flags.tracked_courier_destination = true;
      } else {
        G.lastResult = `The courier glances back once, two streets from the administration building, and changes direction cleanly. The trail ends there. You didn't get the letter. You know the seal color — Relic Strategy Wing red — and that someone thought it was important enough to run a checking route. That's something. The doubled-back route adds time to a delivery that didn't need time added. The only reason to run it is to check for followers. They know someone is watching. They have known for a while.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 29. SHADOW RIVAL INTRO (final expansion choice)
  {
    label: "A veteran organizer warns me — someone has been following this inquiry by one day.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'receiving rival warning');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `The organizer describes the gear — Warden-adjacent, worn correctly, not costumed. Asking the same questions in the same order you have, but reframing each one: not 'who's being displaced' but 'who organized the displacement.' The organizer says he answered before he understood the difference. "He's making a list of the workers who are already moving." A senior operative working the terrain from the opposite direction.`;
      } else if (arch === 'magic') {
        G.lastResult = `"Older. Carries a sealed archive case, never sets it down." The organizer mimes the grip — two-handed, close to the body. "Asks which records have been altered, specifically. Doesn't ask about the workers. Asks about the documents." Someone moving through the same evidence trail, interested in the paper, not the people. One day ahead or one day behind — the organizer can't tell.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"Doesn't ask questions," the organizer says. "Watches. But the day after you talk to someone, that person gets a visit from a stranger with sharper questions than yours." The pattern is clean: you open the door, someone else walks through it. They're harvesting your network from one step behind. Every name you surface becomes a target the next morning. The organizer describes the watcher's position: always near the meal hall side, never the yard. Someone who knows where the candid conversations happen.`;
      } else {
        G.lastResult = `"Well-dressed, speaks to administrators only. Never the workers." The organizer folds her arms. "Claims to be a neutral party auditing for compliance. But the administrators he visits are always the ones you spoke to first." Someone is using your trail to map the soft points in the administration — the people already willing to talk. The organizer has seen him twice: once at the records building, once outside the quota archive. Both times, the day after you were there.`;
      }

      G.lastResult += ` Operating the same route. Not the same purpose.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('warning', 'Rival-adjacent figure confirmed following the inquiry trail in Soreheim', `soreheim-rival-shadow-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // SUPPRESSION: PAST-SEASON LEDGER REFUSED WITHOUT EXPLANATION
  {
    label: "A past-season ledger is a routine request. The refusal was not routine.",
    tags: ['Suppression', 'Bureaucracy', 'Stage1', 'Records'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'reading institutional refusal pattern');

      G.lastResult = `The registry window looks out onto the shift yard. Morning light comes in hard from the east, catching the dust on the sill. The clerk finds the relevant section without needing to search. "That filing is not available at this registry level." No pause. No hesitation. She sets her pen back against the column she was working and does not look up again. No hostility — just completion. The transaction is finished. There is no next step she is offering, and no question she has left room for. The refusal has been given before. The phrasing was chosen in advance for exactly this request.`;
      addJournal('Soreheim Proper registry — past-season ledger request refused at counter level without explanation. Refusal language was prepared.', 'intelligence');
      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 30. SUPPRESSION: PROCEDURAL REFUSAL AT THE FACTOR AUTHORIZATION REGISTRY
  {
    label: "The clerk's answer came too fast — that refusal has been given before.",
    tags: ['Suppression', 'Bureaucracy', 'Stage1', 'Records'],
    xpReward: 55,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'reading institutional refusal pattern');

      G.lastResult = `The registry anteroom smells of pressed fiber and warm wax. Stamp sounds move through the partition wall at a steady rhythm — someone working through a backlog. The clerk behind the counter finds the entry without being asked to search for it. "That filing is not available at this registry level." No pause. No look-up. She sets her pen back to the column she was working and resumes writing. The transaction is complete. There is nothing left to stand there for.`;
      addJournal('Factor authorization log request refused at registry level — clerk showed no hesitation', 'intelligence', `soreheim-refusal-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
{
  label: 'A past-season ledger should be easy to pull',
  tags: ['Records', 'Intelligence'],
  xpReward: 15,
  fn: function() {
    advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
    gainXp(15, 'reading institutional refusal pattern');
    G.lastResult = 'The clerk sets down his stamp. "That filing is not available at this registry level." He does not look up. He has returned to stamping before the sentence is complete. Behind him, through the half-open door, the correct shelf is visible. Blue spine, last season\'s date on the edge tab. He does not explain. He does not look at the shelf.';
    addJournal('A routine records request at the Soreheim Proper guild registry was refused without explanation. The ledger was visible on the shelf behind the clerk. Source: Soreheim Proper guild registry, records desk.', 'intelligence');
    G.recentOutcomeType = 'investigate';
    maybeStageAdvance();
  }
},
{
  label: 'The notice board has recent postings.',
  tags: ['social'],
  xpReward: 5,
  failResult: 'This path is closed here, but the board is refreshed at the morning bell — the posting clerk pins the new notices before the yard fills and the crowd has not yet gathered to read them. That window, before the shift bell and before the crowd, is also when the board is closest to the administration window — the clerk walks the notices from the window directly. A second pair of eyes on what gets pinned, and what gets removed, before either the crowd or the supervisors arrive.',
  fn: function() {
    var key = 'rumor_drawn_' + G.location + '_' + G.dayCount;
    if (G.flags[key]) {
      G.lastResult = 'The board has nothing new since this morning. A quota cycle update from the labor administration is still pinned at the top. The safety stop schedule below it has been there since the last bell change. Nothing that changes the picture. What has changed is the corner of the board where private notices used to go — handwritten, worker to worker, shift availability swaps, tool loans. That corner is empty. It has been empty for six weeks. Someone took those notices down and did not put up a policy explaining why.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
},

  // ========== SUPPRESSION THREADING (Phase 6D) ==========

  // 6D-A: Official cites procedure to avoid answering
  {
    label: "The district coordinator quoted the procedure before I asked a question.",
    tags: ['NPC', 'Records', 'Inquiry'],
    xpReward: 55,
    stageProgress: 1,
    failResult: "The district coordination office handles intake requests during morning hours only. The door is staffed but the coordinator has stepped out for an inter-office review. The wall chart lists the rotation schedule — the next available window opens at the second bell.",
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(55, 'procedural deflection from district coordinator');
      G.stageProgress[1]++;
      G.lastResult = "The district coordinator listens for approximately four seconds before citing Section 14 of the inter-office allocation framework, which governs supplemental record requests from non-registered parties. He does not pause to see if you know what Section 14 says. He does not ask what you intended to request. The citation is fast and even, the way a door closes. Behind him, on the slanted writing shelf, a stack of bound ledger copies sits open to a tabbed section. He turns back to it before you speak again. The allocation framework has apparently just become very urgent.";
      addJournal('Soreheim district coordinator: cited procedure before hearing the request — no question asked, no alternative offered. Source: district coordination office, morning shift.', 'complication');
      G.recentOutcomeType = 'blocked';
      maybeStageAdvance();
    }
  },

  // 6D-B: Missing ledger entries 441-463
  {
    label: "The allocation ledger skips from 440 to 464. Nothing marks the gap.",
    tags: ['Records', 'Archive', 'Observation'],
    xpReward: 60,
    stageProgress: 1,
    failResult: "The allocation ledger is signed out to an internal review party. The desk clerk has a note but not a name. The ledger returns when the review closes — no projected date given. The prior volume may be accessible through the standard stack request.",
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(60, 'found missing entries in allocation ledger');
      G.stageProgress[1]++;
      G.lastResult = "The allocation ledger runs in sequence: entries 438, 439, 440 — then 464. Twenty-three entries absent. The surrounding pages are intact; the binding shows no sign of removal. Entry 440 ends mid-column, and 464 opens with the same ink, the same hand, as if the sequence is unbroken. No notation marks the gap. No cross-reference directs to a secondary volume. Entries 441 through 463 are simply not there. The ledger is otherwise current, signed off through this week, stamped by the same coordinator who cited Section 14 at the intake window twenty minutes ago.";
      addJournal('Soreheim allocation ledger: entries 441–463 absent with no notation, surrounding pages intact, sequence otherwise unbroken. Source: records reading room, stack access.', 'evidence');
      G.recentOutcomeType = 'observe';
      maybeStageAdvance();
    }
  },

  // ========== UNGATED ARRIVAL CHOICES (sp1=0 safe) ==========

  {
    id: 'sore_observe_quarry_face',
    label: "The quarry face runs in three cuts. The middle one stopped two weeks ago.",
    tag: 'safe · observation · DC 7',
    effects: [],
    fn: function() {
      G.lastResult = 'The eastern and western cuts show fresh stone at the upper edge — pale gray where the surface is new, dark below where the cut has been exposed long enough to weather. The middle cut is different: the face is the same uniform gray from top to bottom, no fresh break visible, the hoist cables slack on their overhead rail. A work crew moves through the stopped cut without tools, doing something administrative — counting, marking, not cutting. Two supervisors stand at the base watching the crew without participating. The middle cut has been producing nothing and receiving attention in equal measure.';
      gainXp(10, 'quarry face observation');
      G.recentOutcomeType = 'observe';
    },
    failResult: 'The supervisor viewing area is blocked by a supply movement — a line of carts crossing the access lane needs to clear before the cut face is readable from outside the perimeter. The dock-side route runs past the processing shed where the cut output gets sorted, which may show the same pattern from a different angle.'
  },

  {
    id: 'sore_observe_titan_towers',
    label: "The Titan Tower infrastructure marks where the old operation ended and the new one began.",
    tag: 'safe · observation · DC 7',
    effects: [],
    fn: function() {
      G.lastResult = 'Four stone towers anchor the corners of the original quarry perimeter, each one twice the height of anything built adjacent to them, the construction style different enough from the current processing sheds that the generations of work are easy to read. The towers carry lifting gear at the top — block and tackle frames, still functional, used for the heaviest quarry loads. Between the towers, the newer infrastructure clusters: processing sheds, sorting stations, a covered weighing yard. The new operation grew inside the old frame and uses the towers as load-bearing anchors. Whoever built this second phase understood the first phase well enough to build around it rather than through it.';
      gainXp(10, 'Titan Tower observation');
      G.recentOutcomeType = 'observe';
    },
    failResult: 'The tower base access is restricted during shift change — the hoist operators need clear sight lines to the upper frames and workers are moving through the zone. The lane around the eastern perimeter stays open and gives a read of the tower profiles without entering the restricted corridor.'
  },

  {
    id: 'sore_observe_dock_output',
    label: "The processing dock loads faster than the quarry cuts can account for.",
    tag: 'safe · observation · DC 7',
    effects: [],
    fn: function() {
      G.lastResult = 'At the processing dock, palletized stone moves from the sorting shed to the waiting freight platform at a pace that doesn\'t match what the active cuts are producing today. The active eastern cut runs one crew at a moderate pace; the dock is loading as if three cuts are running full shifts. Either there is stockpiled material being drawn down from somewhere not visible from here, or the dock is processing quarry output from a source that isn\'t this yard. The freight platform stamps are Soreheim registration. The volume on the platform is not Soreheim\'s current output.';
      gainXp(10, 'dock output observation');
      G.recentOutcomeType = 'observe';
    },
    failResult: 'The dock gate is closed for an inspection check — the freight coordinator is running numbers against the platform stack before the next barge loads. The processing shed side entrance stays open and the sorted output waiting for the dock is visible from there without needing dock authorization.'
  }
];
window.SOREHEIM_STAGE1_ENRICHED_CHOICES = SOREHEIM_PROPER_STAGE1_ENRICHED_CHOICES;
