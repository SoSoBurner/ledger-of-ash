/**
 * AURORA CROWN COMMUNE STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to dome maintenance, survival, and contamination
 * Generated for: Individual need vs collective survival, hope vs fatalism, containment vs contamination
 * Each choice: 65-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

var AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. DOME TECHNICIAN: MAINTENANCE ROTATIONS DISRUPTED
  {
    plot: 'main',
    questId: 'q_s1_pattern',
    label: "The rotations increased. The repairs that matter most have fewer hands.",
    tags: ['Investigation', 'NPC', 'Observation', 'Infrastructure'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: 'Kess finishes her gauge check without looking up. The maintenance corridor smells of sealant and old pressure lines. She replaces the cap and moves down the hall before you finish — not hostile, just done. The rotation schedule is posted on the board outside the coordinator\'s office. That\'s the open route.',
      xp: 0,
      effects: [],
      next: [{text: 'Check the repair coordinator\'s work order queue instead.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'uncovering maintenance pressures');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Kess leans against the corridor wall and keeps her voice low. "Skeleton crews on every rotation, and the maintenance chief calls it 'conservation schedule.' The dome doesn't conserve — it degrades. If people are being pulled, the work isn't getting done." She looks at the record board behind her. "I filed a note two weeks ago. It came back stamped reviewed. Nothing changed." Her hands don't stop moving — checking seals, checking pressure gauges — even while she talks. The name on that stamp is in the registry hall.`;
        G.stageProgress[1]++;
        addJournal('Dome technician flagged personnel diversion from maintenance', 'evidence', `aurora-technician-rotations-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kess's posture changes before you finish the question. She steps back, looks at the floor. "Rotation schedules are administrative. I don't discuss administrative." She picks up her toolkit and walks away down the corridor without another word. The hatch behind her clicks shut. The maintenance division is closed now — everyone in earshot watched the exchange and drew their conclusions.`;
        G.worldClocks.pressure++;
        addJournal('Maintenance division now hostile to inquiry', 'complication', `aurora-technician-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Kess answers carefully, eyes on the record board. "Scheduling has been unusual. People get borrowed for other duties." She doesn't say what duties. When you press, she taps the board — there's a posted decision from three weeks ago, commune-signed, about labor reallocation to unspecified infrastructure projects. She lets you read it, then folds her arms. That's all she'll give. The decision is signed. The counter-signature should be in the registry hall.`;
        addJournal('Technician confirmed unusual personnel reallocations', 'evidence', `aurora-technician-understaffed-${G.dayCount}`);
      } else {
        G.lastResult = `Kess doesn't look up from the gauge she's reading. "Schedules change. That's survival work." She marks something on her log, replaces the gauge cap, and moves to the next station. The conversation is over and she never raised her voice. The work order queue in the repair coordinator's office carries the same schedule — if the rotations are being deliberately thinned, the queue will show which repair slots are staying empty longest.`;
        addJournal('Dome maintenance schedule inquiry inconclusive', 'evidence', `aurora-technician-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. RESEARCH ARCHIVIST: CELESTIAL RECORDS REMOVAL
  {
    plot: 'main',
    questId: 'q_s1_converging',
    label: "The observation logs have been moved. The authorization isn't on the board.",
    tags: ['Investigation', 'NPC', 'Records', 'Knowledge'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: 'The archive room is locked for the morning consolidation cycle. A handwritten notice on the door lists the open hours — two windows each day, neither of which is now. The celestial observation logs are referenced in the registry hall\'s public index. That index is always open.',
      xp: 0,
      effects: [],
      next: [{text: 'Check the registry hall public index for the observation records.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering data suppression');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Meren closes the archive room door before speaking. The celestial observation logs from the past month have been flagged for "archive consolidation" — her word for removal, spoken with precise distaste. The orders came through the contamination monitor's office. "Not medical orders. Not safety protocols." She sets a flagged folder on the table between you. "Our record board shows every decision ever made in this commune. This one isn't on it." She taps the folder. "Someone is erasing what the skies are showing."`;
        G.stageProgress[1]++;
        addJournal('Archivist revealed authorized celestial record suppression', 'evidence', `aurora-archive-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The archivist on duty stands from her chair before you finish the question. "Archive records are restricted. Administrative authorization, in writing, from the commune registry hall." She's already writing something in a log. The pen scratches across the page. Your name goes in it — you watch it happen. By the time you leave the archive room, the note is already being walked somewhere. The question drew scrutiny. You'll move more carefully here.`;
        G.worldClocks.watchfulness++;
        addJournal('Archive staff alerted to record inquiry', 'complication', `aurora-archive-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You work through recent archive logs at one of the communal reading tables. Several celestial observation entries carry small margin stamps — "consolidation pending" — in a hand different from the archivist's regular notation. The entries span the last six weeks. The authorization trail runs to a co-sign from the contamination monitor's office, which is not a department with any archival jurisdiction. Someone borrowed authority they don't have. The contamination monitor's office signature appears in at least two other record sets — the pattern is not limited to the archive.`;
        addJournal('Archive records show signs of deliberate curation', 'evidence', `aurora-archive-curated-${G.dayCount}`);
      } else {
        G.lastResult = `The archive room smells of pressed paper and chalk-dust. You work through three recent volumes before the light from the skyport starts to fade. The entries are intact and catalogued, but nothing in the cross-reference index flags an anomaly you'd recognize without knowing what to compare them against. The evidence isn't visible from where you're standing. You'd need someone who knows what the logs looked like before.`;
        addJournal('Archive records accessed but tampering unclear', 'evidence', `aurora-archive-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. RESOURCE ALLOCATOR: SUPPLY DIVERSION
  {
    plot: 'main',
    label: "Survival supplies are being redirected. The destination codes don't appear in any public record.",
    tags: ['Investigation', 'NPC', 'Logistics', 'Survival'],
    condition: function() { return (G.investigationProgress||0) < 3; },
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: 'Thass is in a handoff meeting — two colleagues, ledgers open, voices low. The allocation room door stands half-open but the desk is occupied. Supply distribution summaries are posted weekly on the commons board outside the grain stores. That board is public.',
      xp: 0,
      effects: [],
      next: [{text: 'Read the weekly supply summary posted in the commons.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading distribution pressure');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0));

      if (result.isCrit) {
        G.lastResult = `Thass spreads the distribution ledger on the table between you and keeps a finger on two lines. Food preservation supplies — the cold-season critical ones — are marked for "containment research allocation." No commune decision on the board. No posted rationale. Taken from general circulation and moved somewhere sealed. "I asked once," Thass says. "They told me I wasn't cleared." He smooths the corner of the ledger page. "These are survival stores. There's a process for touching survival stores. They skipped it."`;

        G.stageProgress[1]++;
        addJournal('Allocator revealed unauthorized supply redirection to sealed zone', 'evidence', `aurora-allocator-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Thass closes the ledger before you can see the open page. "Supply allocation is administrative security. I don't discuss distribution patterns." He stacks the ledger with two others and walks them to the locked shelf without hurrying. He doesn't say you made him nervous. But the ledger goes behind a lock that wasn't locked when you arrived, and he doesn't come back to the table.`;
        addJournal('Resource allocator refusing future cooperation', 'complication', `aurora-allocator-silent-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Thass runs a finger down the column you're pointing at and nods, just once. "Distributions have been unusual lately. Some supplies go to specific areas." He doesn't say which areas. He doesn't say why. He turns the ledger so the destination codes face him instead of you. The pattern is there in the numbers — you can see enough to know something is being redirected. He won't tell you where it goes.`;
        addJournal('Allocator confirmed unusual distribution patterns', 'evidence', `aurora-allocator-unusual-${G.dayCount}`);
      } else {
        G.lastResult = `Thass gives you the standard answer — balance, conservation, fluctuation by season. He says it the way someone says something they've said enough times to stop hearing it. Nothing he tells you is wrong. Nothing is specific enough to follow. The grain stores are clearly labeled outside in the commons. The destination codes in the sealed-section ledger columns — visible for a moment before he turned it face-down — are the specific language the contamination monitor's office uses in its internal routing logs.`;
        addJournal('Resource allocation patterns inconclusive', 'evidence', `aurora-allocator-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. REPAIR COORDINATOR: MAINTENANCE DELAYS SYSTEMATIC
  {
    plot: 'main',
    label: "Critical repairs are sitting in the queue. They have been sitting there for weeks.",
    tags: ['Investigation', 'NPC', 'Maintenance', 'Integrity'],
    condition: function() { return (G.investigationProgress||0) >= 3 && (G.investigationProgress||0) < 6; },
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: 'Yani\'s office door is closed, a "review in progress" card slotted into the frame. The work order queue summary — not the full log, just open items — is tacked to the corridor board outside her door. It\'s been there long enough for the corner to curl.',
      xp: 0,
      effects: [],
      next: [{text: 'Read the open work order summary in the corridor.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing maintenance sabotage');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Yani drops the work order queue on the table between you and doesn't sit down. Several critical repairs marked "under review" — weeks past any normal review window. She's circled them herself, in red, with dates. "Dome structural stress needs immediate attention. I followed up twice. I was told to stop asking." She points at the top item on the stack. "When the dome starts failing, it'll be logged as structural age. It's not age. Every one of these could have been repaired. Someone is keeping them stuck."`;

        G.stageProgress[1]++;
        addJournal('Coordinator mapped systematic repair blocking pattern', 'evidence', `aurora-coordinator-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Yani pulls the work order queue off the table before you can look at it. "Active maintenance logs are confidential. That's a commune security matter." She says it without anger — this is procedure, not hostility. But she takes the folder, goes to the back room, and the door stays closed. You hear a filing drawer open and shut. When she returns, the folder doesn't come with her. The route to the repair records is gone for now.`;
        G.worldClocks.pressure++;
        addJournal('Repair coordinator blocking access to work logs', 'complication', `aurora-coordinator-blocked-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Yani lets you look at three completed files before closing the stack. Two of the three show extended review periods — six and nine weeks respectively, against a four-day standard. She marks that in her own log while you read. "I don't know what's holding them," she says. "I just log what I see." She writes the word "irregular" next to each entry. The word is careful. She's been careful about this for a while.`;
        addJournal('Work orders show signs of unusual delay patterns', 'evidence', `aurora-coordinator-delayed-${G.dayCount}`);
      } else {
        G.lastResult = `The work order room is dense with binders, cross-indexed by section code and date. Repairs are being logged. Work is listed as happening. But reading whether any specific delay is deliberate requires knowing what normal looks like in this commune — and you don't, not yet. The celestial observer's four-week pattern charts include a column tracking dome intervention dates — laid against this queue, the gaps would be legible.`;
        addJournal('Repair queue patterns inconclusive', 'evidence', `aurora-coordinator-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. CELESTIAL OBSERVER: AURORA PATTERNS CORRUPTED
  {
    plot: 'main',
    label: "The observer's charts ran irregular for three weeks. No notice filed.",
    tags: ['Investigation', 'NPC', 'Celestial', 'Phenomenon'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: 'The observation room is dark — morning cycle complete, afternoon cycle not yet begun. The high windows carry amber light from the dome panels. A single readings sheet from last week is pinned to the corkboard outside: baseline figures, unsigned. The archive carries four weeks of comparison data.',
      xp: 0,
      effects: [],
      next: [{text: 'Review the publicly posted celestial readings in the archive index.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading celestial corruption');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Corvus has his observation charts spread across a long worktable and doesn't offer you a seat. He points instead — bands of pattern data running across four weeks of nights. "Used to follow a cycle. The dome's interaction with the contamination field made stable, readable patterns." His finger traces where the pattern breaks. Three weeks ago. "That's not natural drift. Either the contamination itself changed, or someone is manipulating the containment field deliberately." He rolls the chart back up. "What we're seeing out there now — that's not what the barrier is supposed to look like."`;

        G.stageProgress[1]++;
        addJournal('Observer revealed intentional contamination field destabilization', 'evidence', `aurora-observer-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Corvus doesn't stop working while you talk. He finishes a notation, caps his pen, and turns to face you with the precise economy of someone who has decided something. "Celestial observation is technical work. You don't have the background for the questions you're asking." He opens a logbook and writes a brief entry — time, visitor, subject of inquiry. He doesn't look up again. The observation room door is behind you. The entry is dated; whatever he noticed about your interest is now in the logged record.`;
        G.worldClocks.watchfulness++;
        addJournal('Celestial observer reported inquiry to administration', 'complication', `aurora-observer-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Corvus pulls a recent readings sheet and sets it beside a historical baseline from eight months ago. He points at both without comment. The patterns are visibly different — the recent one more fragmented, the cycles shorter and less regular. "Could be natural variation," he says. He doesn't say it like he believes it. He takes the recent sheet back and files it without letting you write anything down.`;
        addJournal('Observer confirmed unusual recent aurora patterns', 'evidence', `aurora-observer-patterns-${G.dayCount}`);
      } else {
        G.lastResult = `Corvus answers your questions in full technical detail — cycle duration, spectral band distribution, comparison methodology. It takes fifteen minutes and you come away with more terminology than you arrived with and no clearer picture of what's wrong. The information is real. It's just pitched at a level that keeps its meaning out of reach. You'd need the baseline records and someone willing to walk you through them.`;
        addJournal('Celestial observation data too complex to interpret', 'evidence', `aurora-observer-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. CONTAMINATION MONITOR: SEEPAGE ALLOWED DELIBERATELY
  {
    plot: 'main',
    label: "The seepage logs show response times doubling. The monitor knows.",
    tags: ['Investigation', 'NPC', 'Contamination', 'Safety'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: 'Kael is in the sealed monitoring section — the amber light above the door means no entry. The outer reading area holds event logs: dates, cell codes, response flags. Not the full picture, but a place to start. The dates cluster.',
      xp: 0,
      effects: [],
      next: [{text: 'Review the contamination event logs in the outer reading area.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading containment sabotage');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Kael pulls up a stool across from you and sits like someone who stopped sleeping correctly weeks ago. The barrier protocols were changed. Seepage that should trigger emergency lockdown is now rerouted to specific containment cells. "I filed a safety violation report," he says. "They told me the new protocols were authorized at higher levels." He has a theory — someone collecting contamination samples, someone testing exposure thresholds. He sets a handwritten log on the table. "I'm supposed to record the breaches and do nothing. So I'm recording them."`;

        G.stageProgress[1]++;
        addJournal('Monitor revealed authorized barrier protocol sabotage', 'evidence', `aurora-monitor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kael's expression doesn't change. "Safety information is restricted to certified personnel. Questions about dome integrity from outside the certification structure get logged." He's already writing. The log is a proper commune record — numbered, dated, formally headed. He finishes the entry and caps his pen. "If you have a safety concern, submit it in writing through the registry hall." He means it as a dismissal. It works. The pressure of being logged is specific: everything you ask from this point will be read in the context of this entry.`;
        G.worldClocks.pressure++;
        addJournal('Contamination monitor flagged your inquiry as security threat', 'complication', `aurora-monitor-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The contamination logs show two distinct response patterns across the last two months: some seepage events trigger containment within minutes; others show hours of recorded exposure before any response flag appears. The same type of event, two different handling approaches. You copy the dates and close the file. Someone changed what "respond" means depending on which cell the seepage enters. The cell codes in the slow-response column are the same destination codes visible on the resource allocator's sealed-section routing lines.`;
        addJournal('Contamination records show inconsistent response protocols', 'evidence', `aurora-monitor-inconsistent-${G.dayCount}`);
      } else {
        G.lastResult = `The contamination record room is locked and the duty monitor lets you into the outer reading area only. Event logs are visible — dates, cell codes, response flags — but the protocol reference sheets that would tell you what response is supposed to look like are in the secured interior section. Without the baseline, the event data tells you seepage happened. Not whether anyone handled it correctly.`;
        addJournal('Contamination protocols inaccessible for full analysis', 'evidence', `aurora-monitor-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. RELAY KEEPER: COMMUNICATION MONITORING
  {
    plot: 'main',
    label: "A second relay channel opened six weeks ago. The keeper hasn't asked what it's for.",
    tags: ['Investigation', 'NPC', 'Communications', 'Information'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: 'Both relay operators are running an active transmission — the board shows a live channel open, amber indicator lit. The routing log summary from last month is posted in the corridor outside the relay room, part of the commune\'s transparency protocol. The secondary channel appears there as a line item.',
      xp: 0,
      effects: [],
      next: [{text: 'Read the relay routing summary posted in the corridor.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'uncovering communications control');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0));

      if (result.isCrit) {
        G.lastResult = `Nox waits until the other relay operator steps out, then speaks at normal volume, which turns out to be the most unnerving choice. "Messages about dome maintenance, resource allocation, contamination seepage — those get routed through a secondary relay before they go out. I was told it was protocol consolidation." She points at the routing board behind her. "Coordination between communes means if one fails, the others respond. Someone is cutting that off. You only do that if you want one commune to fail quietly."`;

        G.stageProgress[1]++;
        addJournal('Relay keeper revealed message filtering to external communes', 'evidence', `aurora-keeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Nox raises a hand before you finish the question. "Relay operations aren't discussable with non-authorized personnel. Communication security." She's already at the message desk, writing something brief. It gets handed to the other relay operator, who goes out the door. You don't know where. You know it isn't good. The relay room stays closed to you after that, and the duty roster near the door has your description added to the visitor log in handwriting that isn't Nox's. You are now tracked as someone who asked about the secondary channel.`;
        G.worldClocks.watchfulness++;
        addJournal('Relay keeper reported your communication inquiry', 'complication', `aurora-keeper-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Nox acknowledges the routing change when you describe it — not with surprise, with the flatness of someone who's been sitting with something uncomfortable. "Reorganization happened about six weeks ago. I don't have the reason. That's above my level." She adjusts a relay switch that doesn't need adjusting. The routing board behind her shows the secondary channel running. She's been watching it since it appeared. The six-week window is the same window the administrative coordination decisions began clustering against incoming relay traffic.`;
        addJournal('Relay keeper confirmed message system reorganization', 'evidence', `aurora-keeper-reorganized-${G.dayCount}`);
      } else {
        G.lastResult = `Nox answers your questions about message routing the way someone answers questions about a system they trust. Routing logic, relay priority, channel allocation. All of it technically correct and none of it opening the door you came to open. Either she doesn't see the secondary channel as significant, or she does and has decided not to share it. The routing board shows a second channel active since six weeks ago — the same window the administrative coordination decisions began clustering against incoming relay traffic.`;
        addJournal('Relay operations inquiry inconclusive', 'evidence', `aurora-keeper-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. SURVIVAL PLANNER: CONTINGENCY PROTOCOLS ABANDONED
  {
    plot: 'main',
    label: "The evacuation procedures aren't in the current binder. They were there last year.",
    tags: ['Investigation', 'NPC', 'Emergency', 'Protocol'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: 'The survival planner\'s office is locked and dark — she works early shifts and is long gone. The public version of the emergency protocol is posted on the registry hall board, as required by commune charter. The recent revision stamp is visible from three paces.',
      xp: 0,
      effects: [],
      next: [{text: 'Read the publicly posted emergency protocol revision on the registry board.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'mapping emergency system sabotage');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Seer lays the emergency protocol binder open to a section marked "Revision — Current." Then lays an older version beside it. The difference takes you ten seconds to read. The old version has evacuation procedures, bunker access protocols, mass contamination response trees. The new version has none of them. "I asked why these were removed," she says. "The answer was: no longer necessary." She taps the older binder. "These procedures exist because failure is possible. Removing them doesn't prevent failure. It prevents surviving it."`;

        G.stageProgress[1]++;
        addJournal('Survival planner revealed deliberate evacuation protocol removal', 'evidence', `aurora-planner-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Seer picks up the emergency protocol binder before you can look at the spine. "Evacuation protocols are confidential operational security. You're not certified to review active emergency documentation." She sets it on the shelf behind her desk, spine facing the wall. "Submit a written request to the commune registry hall with your certification documentation." The registry hall is where every formal request goes to wait. She's not wrong that it's the process. She's also not going to make an exception. The pressure of the refusal is harder here — she'll remember the question was asked.`;
        G.worldClocks.pressure++;
        addJournal('Survival planner blocking protocol access', 'complication', `aurora-planner-blocked-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The public version of the emergency protocol — posted on the registry hall board, as required — shows revisions dated three months ago. The language in the revised section is vaguer than what preceded it. "Occupant response" replaced "evacuation route." "Facility assessment" replaced "bunker access." The words do less work than the ones they replaced. Whether that's deliberate simplification or something being removed requires the full version to confirm.`;
        addJournal('Emergency protocols show recent revision patterns', 'evidence', `aurora-planner-revised-${G.dayCount}`);
      } else {
        G.lastResult = `The emergency protocol folder on the registry hall board is thick and cross-indexed. Procedures clearly exist. Whether any of them have been stripped out requires a side-by-side comparison with the historical version — which lives in the closed archive. The survival planner's revision log entry from three months ago carries a co-authorization stamp from the same office that has been routing supply destination codes to sealed sections.`;
        addJournal('Emergency protocol analysis incomplete', 'evidence', `aurora-planner-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. LORE/INVESTIGATION TIER 1: DOME STRUCTURAL ANALYSIS
  {
    plot: 'main',
    label: "Three stress points appear fourteen times in the log. None have repair authorizations.",
    tags: ['Investigation', 'Lore', 'Structure', 'Engineering'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: 'The structural records section is locked for a quarterly inventory. A sign gives the reopen window: tomorrow, first light. The maintenance log summary — open items only — is in the registry hall technical room, no authorization required. The northeast quadrant appears there by section code.',
      xp: 0,
      effects: [],
      next: [{text: 'Review the open maintenance log summary in the registry hall.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'structural vulnerability mapping');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `The structural records go back to the dome's original construction. You read them at a communal table, cold water glass sweating beside you. Load-bearing sections show weight routed through specific concentration points where better distribution was possible — the inspection reports for three of them are in the same binder, dated and signed. No repair was ever authorized against those reports. The dome stays up because the balance holds. It is precisely the kind of balance that doesn't announce when it ends.`;
        G.stageProgress[1]++;
        addJournal('Structural analysis revealed intentional stress point concentration', 'evidence', `aurora-structure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Halfway through the third structural volume, a duty engineer appears at your shoulder. You didn't hear anyone come in. "Structural integrity records require authorization. These aren't in the open section." He takes the volume off the table before you can mark your page. Then asks, with his pen already out, why you wanted them. You're questioned for twenty minutes in a side room, your answers logged, and released. The structural archive is closed to you now and someone knows you tried. The watchful eyes on this section will be harder to avoid the next time.`;
        G.worldClocks.watchfulness++;
        addJournal('Structural data access triggered security review', 'complication', `aurora-structure-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Three stress points appear in the maintenance log seven times between them, across fourteen months. Each entry flagged. Each entry without a follow-up repair authorization. The commune's resource records for those same periods show no shortage of relevant materials or personnel. The repairs weren't blocked by scarcity. They were just never approved. You sit with that distinction for a moment before closing the binder.`;
        addJournal('Structural analysis confirmed unrepairable stress point pattern', 'evidence', `aurora-structure-neglect-${G.dayCount}`);
      } else {
        G.lastResult = `The structural documentation fills two shelf sections in the registry hall's technical room. Repairs are logged as ongoing. Inspection reports are dated and signed. Without knowing the engineering baseline — what tolerance is normal, what threshold triggers mandatory action — you can read that something is being done without knowing whether it's enough. The inspection reports for the northeast quadrant are signed by a name that doesn't appear anywhere in the current maintenance staff roster.`;
        addJournal('Structural engineering analysis inconclusive', 'evidence', `aurora-structure-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. CRAFT/INVESTIGATION TIER 2: CONTAMINATION BARRIER MODIFICATION
  {
    plot: 'main',
    label: "The barrier components look correct. They aren't the same material.",
    tags: ['Investigation', 'Craft', 'Barrier', 'Materials'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: 'The barrier access panel requires a maintenance certification card — the slot is right there, waiting for a card you don\'t carry. The filtration installation records from eighteen months ago are in the open archive. That\'s where the specification baseline lives.',
      xp: 0,
      effects: [],
      next: [{text: 'Find the filtration installation records in the open archive.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing material sabotage');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.spirit || 0));

      if (result.isCrit) {
        G.lastResult = `The substitutions don't announce themselves. The replacement components look identical to spec at arm's length — same shape, same color, same weight. Under stress analysis they're different materials entirely, cheaper variants that degrade faster under contamination pressure. The swap was done in place, component by component, across twelve barrier sections. Whoever did it had access, time, and knew that visual inspection would pass them. The barrier holds for now. Materials like these don't fail gradually.`;
        G.stageProgress[1]++;
        addJournal('Material analysis revealed systematic barrier component degradation', 'evidence', `aurora-barrier-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The alarm is a physical sound — deep and percussive, coming from the wall. A seepage alert triggered by your contact with the barrier housing. You back away from the access panel as emergency lights shift the corridor red. Two monitors arrive within ninety seconds and find you exactly where you shouldn't be. The explanation takes longer than the questioning. By the time you're cleared, your name is in three different logs and the barrier section is sealed behind a secondary lock you won't be getting near again.`;
        G.worldClocks.pressure++;
        addJournal('Barrier alarm triggered by material inspection attempt', 'complication', `aurora-barrier-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Two of the components you can access show wear patterns inconsistent with their installation age. The surface texture is wrong — too smooth in places where contamination pressure should have roughened it, too pitted where the stress distribution should be even. It could be material variance within acceptable range. It could be a different material entirely. A laboratory comparison with specification samples would answer it. You don't have that access here.`;
        addJournal('Barrier materials show unusual degradation patterns', 'evidence', `aurora-barrier-degraded-${G.dayCount}`);
      } else {
        G.lastResult = `The accessible barrier sections look intact to the eye. Nothing you can reach by hand and examine without instruments gives you a definitive reading. Contamination barrier materials are engineered to look sound under normal observation — that's part of the spec. The filtration installation records from eighteen months ago note a "material substitution" co-signed by someone in the contamination monitor's chain — a baseline for comparison against the current components.`;
        addJournal('Barrier material examination incomplete', 'evidence', `aurora-barrier-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. SURVIVAL TIER 1: RESOURCE SUSTAINABILITY CALCULATIONS
  {
    plot: 'main',
    label: "The consumption figures don't match the population. Twelve months of supply is moving somewhere else.",
    tags: ['Investigation', 'Survival', 'Economics', 'Resources'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: 'The communal records room is in use — a training session running long, tables covered. The posted supply summary outside the grain stores carries consumption figures by week. The numbers have been running in the same direction for two months.',
      xp: 0,
      effects: [],
      next: [{text: 'Read the posted supply figures at the grain stores.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'resource sustainability analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `The numbers work out to eighteen months of normal operations at reported population size. The actual consumption rate — drawn from supply receipts and the distribution ledger — supports six months. A twelve-month gap between what should be consumed and what is. The commune doesn't have a hidden population large enough to account for it. The supplies are going somewhere that isn't the population. The grain stores outside are clearly labeled. The thing they're labeled as holding doesn't match what the ledger says is being pulled from them.`;
        G.stageProgress[1]++;
        addJournal('Sustainability analysis revealed accelerated resource consumption', 'evidence', `aurora-survival-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The calculation takes you most of the morning at a table in the communal records room, stacks of ledger volumes around you. Someone from the administrative office comes over before you finish. "What are you working on?" The question is mild. The look at your calculation sheet is not. You explain it as general interest. They write something after you leave. Resource sustainability analysis draws attention here — the commune tracks what the commune is being tracked for.`;
        G.worldClocks.watchfulness++;
        addJournal('Resource calculation drew administrative scrutiny', 'complication', `aurora-survival-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Consumption is running ahead of the stated estimate by eleven percent. Noticeable when you lay the two figures beside each other in the same column. It could be population undercounting. It could be seasonal drift in estimate methodology. The discrepancy is real but not yet large enough to be indefensible as error. You note it, close the ledger, and go back for the month before.`;
        addJournal('Sustainability analysis showed minor consumption variance', 'evidence', `aurora-survival-variance-${G.dayCount}`);
      } else {
        G.lastResult = `The calculation requires reliable population data and the commune's population estimate has three versions in three different documents from the same fiscal year, none of which match. Without a baseline you trust, the sustainability figure you produce could be anywhere in a wide range. The resource allocator's sealed-section distribution lines carry specific volume figures — if those numbers are accurate, they resolve which population count to trust.`;
        addJournal('Sustainability calculations inconclusive', 'evidence', `aurora-survival-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. PERSUASION TIER 2: COLLECTIVE CONSENT MANUFACTURED
  {
    plot: 'main',
    label: "Every conversation stops at the same topic. The line is too consistent to be coincidence.",
    tags: ['Investigation', 'Persuasion', 'Coercion', 'Silence'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: 'The morning commons is empty — the early shift ate an hour ago and the midday shift hasn\'t arrived. The communal tables stand clean and bare. The posted decision board near the entrance carries three recent directives, none of them contested. The silence is visible in the absence of any counter-signatures.',
      xp: 0,
      effects: [],
      next: [{text: 'Read the recent directives posted on the commons decision board.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'mapping coercion network');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `You spend the morning at the communal tables near the grain stores, listening. Three separate conversations stop when they notice you. Not because of who you are — because of what you're near. People talk around the dome's condition, the resource distribution, the contamination reports. They reference "the record" and "the commune decision" the way people reference things they've stopped expecting to change. Everyone present knows someone who was reassigned after raising a question publicly. The ration boards are clearly visible. Nobody needs to say the rest.`;
        G.stageProgress[1]++;
        addJournal('Coercion analysis mapped fear-based compliance network', 'evidence', `aurora-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `By midday, three people have changed seats when you sat near them. A fourth finishes her meal in under two minutes and leaves without taking the second portion she'd already queued for. Word moved before you did. Asking about administrative retaliation in a commune where administrative retaliation is real has a social cost that redistributes immediately. Nobody says anything to you. They don't need to.`;
        G.worldClocks.isolation++;
        addJournal('Population distancing from you due to coercion inquiry', 'complication', `aurora-coercion-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `People will say they're careful. A maintenance worker at the communal meal table puts it plainly: "You learn what questions go in writing and what questions stay in the room." He won't say what the consequences are for the wrong kind. Three others nearby eat without looking up. When you ask what they're careful about, specifically, the maintenance worker checks the posted decision board behind you and goes back to his food.`;
        addJournal('General fear-based compliance confirmed by population interviews', 'evidence', `aurora-coercion-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Nobody uses the word fear. Nobody uses the word pressure. The conversations you join go quiet at specific topics and resume at others, and the dividing line between what's discussable and what isn't follows a consistent logic you can't quite articulate yet. Three distinct conversations went silent at the moment the maintenance schedule was mentioned — a specificity that points to a single incident, not general unease.`;
        addJournal('Coercion patterns sensed but not fully documented', 'evidence', `aurora-coercion-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. INSIGHT TIER 1: PSYCHOLOGICAL PRESSURE DOCUMENTED
  {
    plot: 'main',
    label: "The tables empty at hours they should be full. Nobody reads the boards.",
    tags: ['Investigation', 'Insight', 'Psychology', 'Pressure'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: 'The commons is too active right now — a scheduled assembly in progress, every seat taken, voices overlapping. The amber light through the dome panels gives the room a warmth the faces don\'t match. The founding stone at the dome\'s anchor point is quieter. What was built here is written on it.',
      xp: 0,
      effects: [],
      next: [{text: 'Find a quieter vantage point to observe the commune\'s social fabric.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'psychological pressure analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `The communal spaces built for assembly stand empty at the hours they used to fill. A long-term resident — she's been here since the dome's second decade, she mentions it without pride — sits at a table in the commons and doesn't look up when two people walk past. That's the thing you keep noticing: nobody looks up. Aurora Crown was built on collective decision-making; the record boards are everywhere, the decision logs are public. The boards are current. Nobody reads them. When you ask a group near the cooking area about the future, the answers arrive in the same register: the dome will fail. There's no way through.`;
        G.stageProgress[1]++;
        addJournal('Psychological analysis revealed systematic demoralization campaign', 'evidence', `aurora-psychology-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The first person you ask about the commune's collective mood stares at you for a long moment. "Are you from the medical board?" The second person cuts the conversation short and leaves. By the third, word has preceded you: someone is asking questions that imply the population isn't coping. In a commune where stability is survival infrastructure, that reads as either diagnostic or threatening. Two reports go to the administrative office before the afternoon ends. The attention you've drawn is wider than the conversation.`;
        G.worldClocks.isolation++;
        addJournal('Population reports your psychological inquiry as suspicious', 'complication', `aurora-psychology-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The afternoon commons is quieter than the posted schedule suggests it should be. An assembly slot sits empty — the board shows it as active. People eat separately, near their work stations, not at the communal tables. A few residents you watch across an hour make no eye contact with each other, let alone with you. It's not what you'd expect from a community built on collective governance. Whether that's recent or has been building for months would require someone who knew it before.`;
        addJournal('Psychological pressure observed but causes unclear', 'evidence', `aurora-psychology-pressure-${G.dayCount}`);
      } else {
        G.lastResult = `Survival communes are stressed. That's structural, not diagnostic. The people here work hard and sleep in shifts and deal with contamination protocols that interrupt daily life. What you're seeing could be exactly that — a community doing difficult work in difficult conditions. Whether it's something more requires a reference point you don't have yet: what Aurora Crown looked like before the maintenance failures began.`;
        addJournal('Psychological state assessment inconclusive', 'evidence', `aurora-psychology-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. PERCEPTION TIER 2: ADMINISTRATIVE COORDINATION DISCOVERED
  {
    plot: 'main',
    label: "Three directives, three timing windows, all matching the relay traffic. Outside coordination.",
    tags: ['Investigation', 'Perception', 'Administration', 'Hierarchy'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: 'The org chart posted in the registry hall entrance is current — names, departments, reporting lines. The three administrators whose decisions you want to cross-reference are all listed. Their signature blocks appear on the public decision log. That log is always open.',
      xp: 0,
      effects: [],
      next: [{text: 'Review the administrative decision log in the registry hall.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering administrative conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.vigor || 0));

      if (result.isCrit) {
        G.lastResult = `Mapped on paper, the decision chain doesn't follow the org chart. The maintenance chief's freeze orders trace back to the contamination monitor's office. The contamination monitor's protocol changes align with timing from the survival planner's directives. The survival planner's decisions correlate exactly with incoming relay traffic on a secondary channel. Someone outside Aurora Crown is issuing instructions that travel through three local administrators before they reach the dome's physical systems. The commune's own structure is being used as a transmission mechanism.`;
        G.stageProgress[1]++;
        addJournal('Administrative mapping revealed external coordination of local sabotage', 'evidence', `aurora-admin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You're still at the communal records table with your authority-chain notes spread out when someone from the administrative office sits across from you and doesn't introduce themselves. "You've been pulling org documentation." Not a question. They look at your notes. "What's this for?" The session that follows is fifteen minutes of careful explanation on your part and careful listening on theirs. Your notes are photographed before you leave. You don't see it happen. The pressure of their attention will make the next inquiry harder to pursue quietly.`;
        G.worldClocks.pressure++;
        addJournal('Administrative hierarchy mapping drew direct attention', 'complication', `aurora-admin-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Three decisions — one from maintenance, one from contamination monitoring, one from emergency protocol — all issued within two days of incoming relay traffic on the secondary channel. Could be coincidence. Could be routine inter-commune coordination, which does happen. The decisions themselves are legal and procedurally correct. The timing alone isn't evidence. But the timing alone is what you have, and it's difficult to ignore.`;
        addJournal('Administrative hierarchy shows external coordination patterns', 'evidence', `aurora-admin-coordinated-${G.dayCount}`);
      } else {
        G.lastResult = `The decision boards show a clear hierarchy — every posted directive is signed, dated, and attributed. Decisions flow from the senior administrators downward and then outward to the working teams. Normal commune governance, visible and documented. The three directives that align to secondary relay traffic windows are all signed by the same two administrators — a pattern narrow enough to follow if the relay correspondence batch dates can be confirmed.`;
        addJournal('Administrative hierarchy mapping incomplete', 'evidence', `aurora-admin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 15. STREET RUMOR: SURVIVAL ANXIETIES
  {
    plot: 'main',
    label: "The maintenance workers don't talk about the dome readings. Not where anyone can hear.",
    tags: ['Investigation', 'Rumor', 'Gossip', 'Fear'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The maintenance corridor is empty — shift change just ended and nobody lingers. The amber smell of dome sealant hangs without anyone to breathe it. The commons will fill again at midday. Fragments travel at mealtimes, between people who don\'t know they\'re passing the same one.',
      xp: 0,
      effects: [],
      next: [{text: 'Wait for the midday commons gathering to listen for what moves.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing worker anxiety narratives');
      G.stageProgress[1]++;

      const rumor = ['the dome stress readings are worse than anyone admits', 'people disappear during reassignment and nobody asks where they go', 'the barrier is leaking and they\'re not repairing it', 'someone is collecting contamination samples on purpose', 'if we protest, we get reassigned to the contamination detail'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `A maintenance worker, two minutes into a rotation handoff, drops his voice: "${selected}." The person receiving the handoff nods without looking up. It's not a revelation — it's confirmation of something already circulating. The same fragment surfaces twice more through the morning, in different corridors, from people who don't know each other. Nobody attaches a source. Nobody has the full shape of it. But the detail itself travels because it lands on something people already half-know is true.`;
      addJournal(`Street rumor gathered: "${selected}"`, 'evidence', `aurora-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. INSTITUTIONAL CRACK: PROOF OF SYSTEMATIC SABOTAGE
  {
    plot: 'main',
    label: "Four documents, four contradictions, all pointing the same direction. Someone built that.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Systematic'],
    xpReward: 80,
    stageProgress: 1,
    failResult: {
      text: 'The communal records room closes for the afternoon inventory. A clerk carries the day\'s active files to the locked section without meeting your eyes. The registry hall\'s public index stays open. Each of the documents you need appears there by title. The route is slower but it\'s open.',
      xp: 0,
      effects: [],
      next: [{text: 'Access the documents through the registry hall public index.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing systemic sabotage conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Spread across the communal table: maintenance policy requires the critical repairs that work order freezes prevent. Contamination protocol specifies barrier integrity that redirected seepage deliberately violates. Emergency protocol guarantees evacuation procedures that have been cut from the current binder. Resource allocation states survival-first priorities while the ledger shows systematic diversion. Each document on its own could be explained as administrative error. The four of them together have one common feature: every gap serves the same direction of failure. That doesn't happen by accident.`;
        G.stageProgress[1]++;
        addJournal('Systemic sabotage documentation compiled', 'evidence', `aurora-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You're in the middle of cross-referencing the third document when someone sits across from you that you've never seen before. No introduction. They look at what's on the table. "You should stop this." Not a threat — or rather, a threat delivered the way Aurora Crown does everything: through process. "A formal review of your access privileges has been opened." They leave before you can respond. The documents on the table are still yours. For now. The evidence isn't complete, and now someone knows how close you were getting.`;
        G.worldClocks.pressure += 2;
        addJournal('Inquiry directly noticed by conspiracy operators', 'complication', `aurora-proof-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `Three contradictions, documented and side-by-side: what the maintenance policy says must happen, and what the work order record shows didn't. What the contamination protocol requires, and what the event log shows was done instead. What the resource allocation states, and what the ledger shows was moved. Each one could be error. Three in the same direction, affecting the same systems, starts to look like a shape rather than noise.`;
        addJournal('Compelling contradiction evidence found', 'evidence', `aurora-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `You have two contradictions and a gap where the third should be. Two is suggestive. Two is also consistent with a commune under resource pressure making bad administrative decisions in overlapping departments. The pattern needs one more anchor point before it stops being a possibility and starts being a case. The third piece is somewhere in the records. You haven't found it yet.`;
        addJournal('Evidence fragments found but incomplete', 'evidence', `aurora-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. MORAL PRESSURE: COMPLICITY OR RESISTANCE CHOICE
  {
    plot: 'main',
    label: "They didn't design the trap. They're just standing in it with everyone else.",
    tags: ['Investigation', 'Moral', 'Choice', 'Pressure', 'Confrontation'],
    xpReward: 70,
    stageProgress: 1,
    effects: [
      { type: 'heat', polity: 'sheresh', amount: 1 },
      { type: 'rival', amount: 1 }
    ],
    failResult: {
      text: 'The person you\'re looking for isn\'t in the commons or the work corridor — their shift ended early and the roster shows them signed out. The maintenance division\'s door is open. Someone who works alongside them will know the same thing they know. It moves between people who work together.',
      xp: 0,
      effects: [],
      next: [{text: 'Find someone in the maintenance division who works alongside the source.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'making moral commitment to resistance');
      G.stageProgress[1]++;

      const npcOptions = [
        { name: 'Kess', role: 'dome technician', fear: 'They said if I didn\'t cooperate, I\'d be reassigned to contamination detail. I have a child.' },
        { name: 'Kael', role: 'contamination monitor', fear: 'I tried to report it. They told me if I kept talking, my access would be revoked and I\'d be marked unreliable.' },
        { name: 'Thass', role: 'resource allocator', fear: 'I was ordered to divert supplies. The order came from above. I have no choice.' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `${npc.name} doesn't wait for the second question. The first one breaks the silence they've been keeping. "${npc.fear}" They're not asking for absolution. They're telling you what happened. Their hands stay flat on the table, not moving. Trapped and complicit are the same thing from where they're standing. The choice is yours now: put their name into the record and use the pressure it creates, or keep them protected and keep working quietly. One of those paths makes them an ally. The other makes them someone with nothing left to lose.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal(`Confronted ${npc.name} (${npc.role}) about complicity in sabotage`, 'complication', `aurora-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. DISCOVERY MOMENT: WRONGNESS CONFIRMED AND ORIGIN REVEALED
  {
    plot: 'main',
    questId: 'q_s1_close',
    label: "The instruction chain passes through the relay and ends somewhere unnamed.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax'],
    xpReward: 80,
    stageProgress: 1,
    failResult: {
      text: 'The relay room is staffed and the door is closed. Through the narrow window you can see both operators at their stations. The external correspondence log — outgoing traffic summaries, no content — is posted in the registry hall as required. The secondary channel appears there as a routing entry. The log is public.',
      xp: 0,
      effects: [],
      next: [{text: 'Find the external correspondence log in the registry hall.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of dome sabotage');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `The thread runs through the relay secondary channel, into a coded correspondence batch, into transit-marked canisters that originate from Sunspire Haven. Outgoing instructions: specific protocol change orders to the contamination monitor, specific freeze directives to the survival planner, timestamped and coordinated. Someone beyond Aurora Crown's borders is running the sequence from outside. The commune's administrators aren't the architects of this — they're the mechanism. Whoever is directing it has authority to route through the relay and reason to collapse Aurora Crown without appearing to touch it.`;
        G.stageProgress[1]++;
        addJournal('Origin source of Aurora Crown sabotage identified as external coordination', 'discovery', `aurora-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The relay room is empty except for one person you haven't seen before, sitting at the secondary channel station. When you step inside, they stand. Not hostile — blocking. "This room is restricted." You back out before anything escalates, but they follow you far enough into the corridor to make the point. You didn't see what was on the station screen. They saw what you were trying to reach. Whatever the correspondence batch contains, someone is here specifically to prevent it from being read. You've been noticed at the one door that matters most.`;
        G.worldClocks.pressure += 2;
        addJournal('Inquiry interrupted by conspiracy operators', 'complication', `aurora-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The secondary relay logs reference "external interests" and "strategic timeline" in two messages you can read before the access is cut. No origin address. No names. The language is administrative — dry, procedural — but the context it sits in makes it legible: Aurora Crown is not the primary concern of whoever wrote this. It's a scheduled outcome. Someone beyond the commune's borders has timetabled what's happening here, and the local administrators are executing against that schedule without knowing — or without acknowledging — its real authorship.`;
        addJournal('External coordination of Aurora Crown sabotage confirmed', 'discovery', `aurora-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `The relay correspondence fragments point outward but don't terminate anywhere you can trace. The instruction chain passes through at least two intermediary addresses before you lose the thread. Whoever is directing this used layers deliberately — each link in the chain only knows the link before it. You've established that orders are coming from outside the commune. Who originates them, and from where, is still behind the intermediaries.`;
        addJournal('External coordination suspected but source not yet identified', 'evidence', `aurora-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. SECOND-ORDER EVIDENCE: PATTERN RECOGNITION ACROSS SYSTEMS
  {
    plot: 'main',
    label: "Barrier, maintenance, resources, protocol. All degrading. All timed to the same relay windows.",
    tags: ['Investigation', 'Pattern', 'Analysis', 'Connection'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: 'The records room table you need is occupied — a commune auditor running her own tally, files spread in both directions. She\'ll be there until evening. The registry hall keeps a timeline board showing system status updates: barrier, maintenance, resources, protocol. The dates are public. The pattern is in the spacing.',
      xp: 0,
      effects: [],
      next: [{text: 'Review the system status timeline on the registry hall board.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'recognizing systematic collapse pattern');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `Laid out on the communal table in sequence: the structural stress points left unrepaired, the barrier materials substituted for cheaper equivalents, the seepage rerouted instead of contained, the resource diverted from survival stores, the evacuation procedures removed from protocol. None of these failing systems is touching the others at the surface level. Structurally they're all touching: a weakened barrier lets contamination enter; diverted resources prevent repair; blocked maintenance can't fix the dome; a population with no evacuation option and no hope of outside help stops looking for a way through. Every failure is designed to amplify the next one.`;
        G.stageProgress[1]++;
        addJournal('Systems analysis revealed coordinated collapse engineering', 'evidence', `aurora-pattern-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You've been at the table long enough that the light through the high windows has moved twice. An administrative office worker stops on their way past, sees the diagram you've been building — maintenance failure, barrier degradation, resource gap, protocol removal, psychological pressure, all linked with arrows — and doesn't keep walking. "What is this?" You explain. They take a note. By the time you fold the diagram, it's been described to someone whose job it is to know what people in this commune are working on.`;
        G.worldClocks.watchfulness++;
        addJournal('Your pattern analysis drew security scrutiny', 'complication', `aurora-pattern-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Three of the failures share a timing signature: each one worsened within two weeks of a secondary relay message batch. The barrier degradation, the resource redirection, the evacuation protocol removal — all three correspond to that same window. It's not proof of intent. But the failures aren't behaving independently. Something connects them below the surface level you can access from the records room.`;
        addJournal('System failure connections mapped', 'evidence', `aurora-pattern-connected-${G.dayCount}`);
      } else {
        G.lastResult = `Maintenance failures, resource gaps, barrier issues — they all exist. In a commune operating under survival conditions for this long, you'd expect system stress in multiple areas simultaneously. Whether that stress is natural accumulation or something coordinated requires more data than you have today. The three secondary relay traffic windows and the three worsening events — maintenance freeze, resource redirection, protocol revision — share a date range narrow enough to test.`;
        addJournal('System pattern analysis inconclusive', 'evidence', `aurora-pattern-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. FINAL CONFRONTATION: UNDERSTANDING THE WRONGNESS
  {
    plot: 'main',
    label: "The degradation is calibrated. Too slow to trigger response. Too precise to be natural.",
    tags: ['Investigation', 'Synthesis', 'Understanding', 'Purpose'],
    xpReward: 80,
    stageProgress: 1,
    failResult: {
      text: 'The synthesis requires a table and uninterrupted time — neither is available right now. The dome anchor is quiet in the early afternoon. The founding stone sits at its base. Sometimes the shape of a thing becomes visible when you stop reading documents and look at what was built.',
      xp: 0,
      effects: [],
      next: [{text: 'Walk the dome perimeter and let the pattern settle before returning to the records.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'achieving systemic wrongness understanding');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0));

      if (result.isCrit) {
        G.lastResult = `The pattern holds at every level you check it: dome, barrier, resources, protocol, population. Each pressure applied in sequence, each withdrawal timed. But what you're reading isn't destruction for its own sake. The schedule is too measured. The changes are calibrated — enough to degrade, not enough to cause immediate collapse. Someone is not trying to destroy Aurora Crown quickly. They're observing how long a survival commune can hold under systematic pressure before it stops functioning as a community. The commune is the data. Whatever is being learned here will be applied somewhere else.`;
        G.stageProgress[1]++;
        addJournal('Aurora Crown understood as experimental laboratory for systematic collapse engineering', 'discovery', `aurora-understanding-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You're halfway through the synthesis — documents spread, connections mapped — when the administrative block comes through formally: access suspended pending review, all records retrieval halted, notification of a compliance audit initiated against your activity log. Not a person in a corridor. A written document, delivered by the registry hall duty clerk, who hands it over without meeting your eyes and leaves immediately. Someone in the administrative structure has enough authority to stop this with paperwork. The shape of the attack is visible. Finishing the picture is now a different problem.`;
        G.worldClocks.pressure += 2;
        addJournal('Final understanding synthesis blocked by direct threat', 'complication', `aurora-understanding-stopped-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The pressure on Aurora Crown isn't random degradation. The scheduling, the calibration, the fact that no single failure has been severe enough to trigger outside intervention — it reads as managed. Someone knows the threshold at which a survival commune calls for external help, and they're staying just under it. The purpose of that — the reason to want a commune failing slowly rather than failing loudly — points toward observation. You don't have the final link yet. The shape of it is clear enough to be unsettling.`;
        addJournal('External experimental pressure testing of Aurora Crown suspected', 'discovery', `aurora-understanding-experimental-${G.dayCount}`);
      } else {
        G.lastResult = `The evidence establishes what is happening. The why stays out of reach. Deliberate dome degradation, deliberate resource diversion, deliberate population pressure — these are documented and real. What someone gains from Aurora Crown's slow failure specifically, rather than a faster or more direct approach, isn't something the records you've accessed can answer. The purpose behind the method is still missing.`;
        addJournal('Systemic purpose not yet fully revealed', 'evidence', `aurora-understanding-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: FILTRATION SYSTEM DOCUMENTATION
  {
    label: "Eighteen months ago, the service log has a two-word margin note. That's the answer.",
    tags: ['Investigation', 'Evidence', 'Stage1'],
    xpReward: 73,
    failResult: {
      text: 'The archive section holding the bound service logs is in its morning consolidation window — thirty minutes, the sign says. The amber light from the dome panels reaches this corridor but doesn\'t warm it. The filtration specification sheet is posted in the open reference section. The specification alone won\'t show the substitution, but it names what should be there.',
      xp: 0,
      effects: [],
      next: [{text: 'Review the filtration specification in the open reference section while waiting.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'reading filtration system documentation');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0));
      if (result.total >= 13) {
        G.lastResult = `The specification calls for quarterly maintenance cycles and specific mineral additives. The most recent service log — eighteen months ago — carries a two-word margin note: "material substitution." The substitute compound isn't named. The log was signed by someone in the contamination monitor's chain, not the maintenance chief's. The dome's degradation since that date follows the pattern you'd see if the stabilizing additive had been replaced with an inert filler. The contamination isn't a failure of maintenance. The maintenance record shows it was introduced.`;
        if (!G.flags) G.flags = {};
        G.flags.found_filtration_documentation = true;
        addJournal('Filtration records: additive substitution eighteen months ago matches dome degradation pattern', 'evidence', `aurora-filtration-${G.dayCount}`);
      } else {
        G.lastResult = `The bound volume is intact except for three pages in the relevant service log section. They've been excised cleanly — not torn, cut at the binding with something narrow. The archive log shows the volume was last accessed four months ago by someone whose name appears only by initial. The information was here and it was removed deliberately, recently enough that the binding still shows faint resistance where the cut was made. Someone came for these pages specifically. The contamination monitor's chain signed the most recent service entry — the one directly before the gap.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. CLUE: DOME PRESSURE GRADIENT DATA
  {
    label: "The northeast quadrant reading should have tripped an alarm. The alarm wire has been bypassed.",
    tags: ['Investigation', 'Evidence', 'Craft', 'Stage1'],
    xpReward: 70,
    failResult: {
      text: 'The northeast quadrant access corridor is behind a maintenance lock — requires a rotation card, not available to visitors. The dome\'s outer walkway circles the perimeter at ground level. From there you can see the quadrant\'s exterior face. The stress isn\'t always visible, but the repair markers tell you where to look.',
      xp: 0,
      effects: [],
      next: [{text: 'Walk the outer perimeter to observe the northeast quadrant face.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'measuring dome pressure gradient');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('spirit', (G.skills.spirit || 0));
      if (result.isCrit) {
        G.lastResult = `Northeast quadrant: seventeen percent above tolerance. That reading alone should trigger automatic maintenance protocol — the dome's own safety architecture requires it. It hasn't triggered. You follow the sensor wire to its junction box and find a bypass loop — a short piece of wire that reroutes the signal before it reaches the reporting system. The loop is clean work. Not improvised. The dome is failing in that quadrant and the alarm has been manually removed from the circuit. The failure is meant to proceed without announcing itself.`;
        if (!G.flags) G.flags = {};
        G.flags.found_dome_sensor_bypass = true;
        addJournal('Dome sensor bypass: NE quadrant failure alarm manually disconnected', 'discovery', `aurora-dome-sensor-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Three quadrants read within acceptable range. The northeast reads significantly above them — not off the charts, but distinct enough to flag in any honest comparison. The distribution suggests stress concentrated in that sector specifically, not general structural aging. Whether that's an underlying structural problem or something applied from outside requires access to the maintenance history for that section. The dome isn't degrading evenly.`;
      } else {
        G.lastResult = `Four readings, four points around the perimeter. The variance is real — you can see it in the numbers — but without calibrated equipment to compare against the dome's design tolerances, you can't say whether the spread is within expected range for a structure this age or a sign of concentrated stress. The dome carries pressure. You can confirm that. The engineer who filed the original complaint — the one who was reassigned — had the baseline tolerances in the documentation he submitted. He still has it.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ARCHETYPE-GATED: READING THE COMMUNE
  {
    label: "The commons at midday shows what the commune can't say out loud.",
    tags: ['Investigation', 'Archetype', 'Stage1'],
    xpReward: 68,
    failResult: {
      text: 'The central commons is packed — a scheduled assembly running over, people standing in the doorways. There\'s no vantage point in the crowd. The outer corridor runs the commons\' full length with a row of small windows. The same behavior is visible from outside the glass, without the noise.',
      xp: 0,
      effects: [],
      next: [{text: 'Observe the commons from the outer corridor windows instead.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading commune social fabric');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The commune runs emergency rotations — watchers on the dome perimeter in eight-hour shifts. Not structural engineers: commune members in work gear taking turns. Woodsmoke from the communal heating drifts through the corridor as the shift changes. They've organized their own defense response without leadership direction, passing watch duties hand to hand through a chain the administration didn't build. The formal structure has failed and the community is running security laterally. This is a population that's stopped trusting its institutions.`;
      } else if (arch === 'magic') {
        G.lastResult = `The atmospheric contamination is creating cognitive pressure — conversations lose their thread, people forget what they were doing mid-sentence. The cold coming through the dome's high-latitude panels doesn't help; the mind works slower in it. The pressure sits below thresholds that would trigger formal medical protocol. Whoever designed this wanted degradation, not crisis. They're not trying to kill Aurora Crown. They're trying to make it impossible to think clearly.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Three commune members circle the commons in irregular patterns. Not guards — their body language is too casual. Information couriers, using movement as cover for message passing. The woodsmoke from the far heating bank gives them cover: stop near the fire, exchange a word, move on. The commune has a parallel communication network operating below its visible structure. They're organizing in the spaces outside the commune's visible oversight.`;
      } else {
        G.lastResult = `The communal meal distribution is off. Portions are slightly smaller in the outer residential blocks than in the central sector. The northern light coming through the dome panels is the same for everyone — but what goes on the plates is not. Not a conscious decision — a symptom of a logistics breakdown that's been ongoing long enough to become normalized. The resource pressure is being absorbed unequally and no one has named it yet.`;
      }
      addJournal('Aurora Crown commons: parallel security structure, cognitive contamination, unequal resource distribution', 'evidence', `aurora-commons-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. FACTION SEED: OVERSIGHT COLLEGIUM
  {
    label: "The Collegium's name is in the correspondence log. Someone tried this route already.",
    tags: ['Faction', 'NPC', 'Stage1'],
    xpReward: 70,
    failResult: {
      text: 'The external correspondence room is locked — Merav Solind receives visitors by appointment only, and none are scheduled today. Her name appears in the registry hall\'s external liaison log alongside the complaint reference number. The log is public. The complaint was formally filed. That\'s enough to begin.',
      xp: 0,
      effects: [],
      next: [{text: 'Find the complaint reference in the registry hall external liaison log.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 12) {
        G.lastResult = `Merav Solind receives you in the commune's external correspondence room — not her office, a neutral space. "Seven weeks ago Aurora Crown submitted a formal complaint under Communal Integrity Protocol." She folds her hands. "The Collegium opened a preliminary review. That review has been delayed." She doesn't say by whom. She asks if you have documentation. She's precise in what she offers back: nothing formal yet, nothing that commits the Collegium to anything. But she writes down the filtration records reference before you leave, and she writes it in ink.`;
        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_aurora = true;
        G.factionHostility.oversight_collegium += 1;
        addJournal('Oversight Collegium rep Merav Solind: complaint review delayed, actively seeking documentation', 'intelligence', `aurora-collegium-${G.dayCount}`);
      } else {
        G.lastResult = `Merav Solind confirms the complaint is logged — that much she'll say. The review process is not discussable with someone who isn't formally part of the case. She says it without apology and without hostility. You need documentation, a formal introduction, or both before this door opens further. She does not tell you to stop trying. The filtration records the complaint referenced are still in the maintenance archive — the original service log, not the copy the commune filed with the Collegium.`;
        if (!G.flags) G.flags = {};
        G.flags.located_oversight_collegium_aurora = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 25. ATMOSPHERE: THE COMMUNE MEMORIAL STONE
  {
    label: "The founding stone says what the commune was built for. Worth reading now.",
    tags: ['WorldColor', 'Lore', 'Stage1'],
    xpReward: 50,
    failResult: {
      text: 'The dome anchor corridor is blocked — a maintenance crew running pressure checks, the space too narrow to pass safely. The founding stone will be accessible again in an hour. The commons carry the same history in smaller form: the marks where the first internal walls were set are still visible in the floor tile pattern.',
      xp: 0,
      effects: [],
      next: [{text: 'Find the founding marks in the commons tile while waiting for the anchor corridor to clear.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'reading founding memorial');

      G.lastResult = `The stone is earth-brick and older than anything else in the commune, set at the dome's original anchor point where the founding team drove the first stake. The inscription reads: "We built to breathe where others said nothing would grow. The dome is not shelter from the world. It is proof the world can be changed." Below it, in smaller text added later: "Maintained by the hands of those who live within it." The stone is clean. Someone still polishes it — recently, you can tell by the dust line. In the grey light of a dome running at diminished capacity, that second line reads differently than it was meant to.`;
      addJournal('Aurora Crown founding stone: dome as proof of communal will, memorial maintained', 'discovery', `aurora-founding-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 26. PERSONAL ARC: SECURE THE FILTRATION DATA
  {
    label: "The filtration data needs to leave this archive before it disappears too.",
    tags: ['PersonalArc', 'Evidence', 'Stage1'],
    xpReward: 65,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'securing filtration evidence offsite');
      if (!G.flags) G.flags = {};

      const result = rollD20('finesse', (G.skills.finesse || 0));
      if (result.total >= 11) {
        G.lastResult = `She travels between Aurora Crown and three outer settlements on a regular supply run — predictable enough that a sealed tube in her pack draws no particular attention. She doesn't ask what's in it. She'll drop it at the transit depot in the second settlement, marked for pickup. The filtration records leave the dome in a supply pack alongside preserves and replacement seals. Whatever happens to the archive copy, this one is outside anyone's reach here.`;
        G.flags.aurora_evidence_secured = true;
        addJournal('Filtration anomaly data secured via commune traveler — offsite copy created', 'evidence', `aurora-evidence-${G.dayCount}`);
      } else {
        G.lastResult = `Every outgoing package through the transit registry is logged and subject to inspection — the same administrative structure that controls the archive controls the outgoing manifest. A sealed document tube in a standard pack would get opened. The commune traveler who runs the regular supply run between Aurora Crown and the outer settlements doesn't route through the transit station. She has her own arrangement with the second waypoint.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE ENGINEER WHO FILED THE COMPLAINT
  {
    label: "The complaint was filed. The engineer who filed it was reassigned three days later.",
    tags: ['Social', 'NPC', 'Stage1'],
    xpReward: 67,
    failResult: {
      text: 'Orren\'s reassignment posting shows him in the residential maintenance block — but the block is locked for a scheduled inspection. The sealed document case he carries was stamped with an engineering certification mark. The NE quadrant inspection report in the public registry hall carries the same stamp. That report is accessible without him.',
      xp: 0,
      effects: [],
      next: [{text: 'Find the NE quadrant inspection report in the public registry hall.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'hearing engineer account');

      const result = rollD20('charm', (G.skills.charm || 0));
      if (result.total >= 10) {
        G.lastResult = `Orren keeps his voice level in the way of someone who's had nine weeks to get used to what happened. "I filed with supporting pressure data and photographs of the NE quadrant stress fractures. Three days later — reassigned to residential maintenance. They called it a rotation." He wasn't consulted. His replacement has no dome engineering background. He pauses on that. "Someone needed the complaint to go away without formally rejecting it. Moving me sideways accomplished that." He reaches into a storage locker and sets a sealed document case on the bench between you. "I still have everything I submitted."`;

        if (!G.flags) G.flags = {};
        G.flags.met_orren_engineer = true;
        addJournal('Engineer Orren: complaint filed, then reassigned — has original supporting documentation', 'contact_made', `aurora-orren-${G.dayCount}`);
      } else {
        G.lastResult = `Orren looks at the work order in front of him instead of at you. "I don't discuss the complaint. I was told it's being handled." That's the full sentence. He picks up his tools and goes back to the residential maintenance task in front of him. He doesn't tell you to leave. He doesn't ask you any questions. He's been warned or he's afraid — possibly both. The sealed document case on the shelf behind him has an engineering stamp on the corner tab — the same stamp as the NE quadrant inspection report.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "Someone else came asking about the dome. The credentials didn't add up.",
    tags: ['Rival', 'Warning', 'Stage1'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `A maintenance worker you've spoken with twice already stops you near the dome corridor. "Asked about the commune's security response to the dome degradation. Not the engineering — the community response. How organized. How coordinated. Whether the watch rotations were documented." The cold coming off the dome panels makes the corridor feel smaller than it is. Someone was assessing whether Aurora Crown could mount a coordinated defense of its own internal records. The question about documentation is the part that matters.`;
      } else if (arch === 'magic') {
        G.lastResult = `An archivist from the morning record shift pulls you aside near the open reference stacks. "Claimed to be from a material sciences faculty. But her questions were about the additive compound specifically — not the failure pattern, not the dome design. She knew what compound to ask about before she'd seen the records." The woodsmoke smell from the hall heating carries in under the archive door. Someone already has the technical answer. They were verifying it against Aurora Crown's own documentation.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Someone Orren trusts enough to mention it approaches you near the lower maintenance bay, voice low enough to be swallowed by the ambient pressure-check hum. "Didn't ask Orren anything directly. Just asked for a tour of the maintenance areas, took notes, and left. But Orren noticed the notes were in code — not a private shorthand, an actual cipher." The amber dome panels above give the corridor a deceptive warmth. Someone is documenting the dome failure in a format that can't be read if intercepted. Professional compartmentalization.`;
      } else {
        G.lastResult = `A commune member you don't recognize by name flags you down outside the registry hall, speaking quickly. "Said they were from an external support organization. Wanted to know which commune members had tried to organize a collective response to the dome issue. Names, positions, who was coordinating with whom." The pine-cold draft through the hall's upper vents carries the smell of the forest outside the dome perimeter. Someone is mapping the commune's leadership structure. Not to help it — to understand its vulnerabilities.`;
      }

      G.lastResult += ` Whoever this person is, they're a step ahead on the Aurora Crown thread.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('Rival-adjacent operative confirmed working the Aurora Crown dome failure ahead of you', 'complication', `aurora-rival-${G.dayCount}`);
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
      G.lastResult = 'The board has nothing new since this morning. The amber panels above it are on their midday cycle, and the cold draft from the dome wall gives the posted sheets a faint curl at the corners. Two collective work assignments and a water filtration maintenance notice from yesterday still hold the top slots. The woodsmoke from the communal heating drifts past without anyone stopping to read. Nothing worth copying down.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
}
];

// ── ARCHETYPE-EXCLUSIVE CHOICES ──────────────────────────────
AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES.push(

  // COMBAT x2
  {
    archetypeGroup: 'combat',
    plot: 'main',
    label: "The sealed corridor has one pressure latch. One good shoulder and it gives.",
    tags: ['Combat', 'Risk', 'Direct'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The latch holds — older construction, thicker than it looks. The impact rings through the maintenance passage and a patrol turns the far corner thirty seconds later. You are standing at a sealed door with a bruised shoulder and no explanation that fits the context. The patrol writes a notation in their route log. The corridor stays sealed.',
      xp: 0,
      effects: [],
      next: [{text: 'Clear the area before the patrol reaches your position.', skill: 'finesse', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'forced corridor access');
      G.stageProgress[1]++;

      var result = rollD20('combat', (G.skills.might || 0));
      var target = 14;

      if (result.isCrit) {
        G.lastResult = 'The latch snaps on the second strike — clean, no secondary noise. The corridor beyond smells of thermal gel and old sealant. A restricted maintenance log hangs on the inside wall: vent allocation schedules for the past three weeks, signed by the coordinator\'s office, show two dome sections receiving zero maintenance hours while a third gets double the standard crew time. The discrepancy is dated and stamped. You copy the reference numbers before the corridor\'s heat alarms register the open door.';
        G.stageProgress[1]++;
        addJournal('Forced sealed corridor — maintenance log inside shows skewed allocation; coordinator signature present', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The latch gives on the wrong axis — a pressure release rather than a break, venting a burst of hot air from the thermal duct on the other side. The alarm strip above the door activates. You have twenty seconds before the nearest dome monitor arrives, and the corridor is a dead end. Whatever was inside the sealed section is now behind a door that is also flagged in the incident log.';
        addJournal('Corridor forced — pressure alarm triggered, incident logged', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The latch gives on the third attempt and you are inside before the corridor noise settles. The sealed section holds a decommissioned gauge array — still live, still reading. The pressure readings are two weeks out of sync with the posted dome status board. Someone is receiving real data here and posting different numbers publicly. The array has a registry tag from the coordinator\'s office, filed as decommissioned fourteen days ago.';
        addJournal('Forced corridor — live gauge array inside reads differently from public dome status board', 'evidence');
      } else {
        G.lastResult = 'The latch holds. You get purchase on the frame but not enough force behind it — the dome construction here is heavier than the residential corridors. A work crew comes around the bend before your third attempt and you fall back. The sealed section stays sealed. The same coordinator stamp appears on the access restriction notice beside the latch.';
        addJournal('Sealed corridor access failed — coordinator-stamped restriction noted', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'combat',
    label: "Two workers blocking the thermal vent access. One of them is wearing management colors.",
    plot: 'main',
    tags: ['Combat', 'Confrontation', 'Direct'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The worker in management colors has backup one turn of the corridor away — a second crew who arrive before the confrontation resolves. You are outnumbered in a maintenance passage with no clear exit angle. The thermal vent access closes behind them. The blockade is now formal, logged, and has witnesses.',
      xp: 0,
      effects: [],
      next: [{text: 'Withdraw and find another route to the vent section.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'clearing management blockade');
      G.stageProgress[1]++;

      var result = rollD20('combat', (G.skills.might || 0));
      var target = 14;

      if (result.isCrit) {
        G.lastResult = 'The worker in management colors reads the situation accurately and steps back first. The second worker follows. The thermal vent access is clear. Inside: the vent calibration log for the past month. Every third entry is initialled by someone whose name does not appear on the commune\'s posted personnel board. A name that exists in paperwork and nowhere else. The vent has been routed away from the residential dome sections on days that align with the observation archive gaps.';
        G.stageProgress[1]++;
        addJournal('Cleared management blockade — vent calibration log shows phantom initialler; routing aligns with archive gaps', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The management-colors worker does not step back. He raises his voice instead — a practiced response, calibrated to volume. It draws a patrol in under a minute. You are the outside party here, and the patrol writes it that way. The thermal vent access stays blocked and your name is in the patrol log beside a note about unauthorized pressure on maintenance staff.';
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Confrontation at thermal vent — patrol logged; unauthorized pressure notation', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The management-colors worker moves. He does it without words — just steps to the side and looks at the wall. The other follows. The thermal vent access is open long enough for you to read the routing manifest taped inside the panel door: the vent serves three dome sections, but the flow allocation for the past twelve days shows one section receiving sixty percent of available heat output. That section is the coordinator\'s administrative block.';
        addJournal('Vent access forced — routing manifest shows coordinator block receiving 60% heat output for 12 days', 'evidence');
      } else {
        G.lastResult = 'The management-colors worker holds his position and does not look at you while he does it. He has done this before, in this corridor, probably for the same reason. After three minutes of not moving, you have a choice between escalating into something that ends in a patrol report or withdrawing. The thermal vent access stays blocked. The coordinator stamp on the blockade notice is the same stamp on the sealed corridor two junctions back.';
        addJournal('Vent blockade held — coordinator stamp repeated on restriction notice', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  // MAGIC x2
  {
    archetypeGroup: 'magic',
    label: "The ward mark is six weeks old. The panel underneath is brand new.",
    plot: 'main',
    tags: ['Magic', 'Lore', 'Observation'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The ward mark is on the upper edge of the panel, out of direct reading angle without a step platform. The nearest platform is locked to a maintenance crew that has already moved down the corridor. The mark stays unread. The panel installation date is visible on the lower stamp without any special access — that alone is worth noting.',
      xp: 0,
      effects: [],
      next: [{text: 'Note the panel installation date from the lower stamp instead.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'ward mark temporal analysis');
      G.stageProgress[1]++;

      var result = rollD20('lore', (G.skills.wits || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The ward mark is written in three layers: a standard dome-protection sigil, a secondary layer added within the past three weeks, and a third mark underneath that predates the panel by at least eight months — carried over from whatever was here before. That third mark is not commune standard. The symbol class belongs to a pre-commune authority whose seal appears in the registry hall archive as a dissolved predecessor institution. Something from before the current administration is still being warded. The panel is new. The thing it replaced is not.';
        G.stageProgress[1]++;
        addJournal('Ward mark on new dome panel shows pre-commune authority layer — predecessor institution seal identified', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The ward mark reads normally until the third sigil layer, where the decoding requires a reference index that is not standard commune curriculum. You lose time searching for the anchor glyph and attract the attention of the dome monitor doing her panel check. She does not ask what you are reading. She logs the panel number and your presence in the same notation, and moves to the next section. The ward itself is intact. What it means is still unclear.';
        addJournal('Ward mark analysis interrupted — dome monitor logged panel and presence together', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The ward mark is genuine dome-protection script — thermal containment class, correctly anchored — but the inscription date embedded in the sigil base is six weeks old. The panel beneath it was installed eleven days ago, according to the installation stamp on the lower frame. The ward was written before the panel existed. Either the panel replaced something else and the ward was carried over, or the ward was prepared in advance of a planned replacement. Both possibilities require a work order that should be in the coordinator\'s registry.';
        addJournal('Dome panel ward predates panel installation by 5 weeks — replacement or pre-planned swap indicated', 'evidence');
      } else {
        G.lastResult = 'The ward mark is correctly formed and reads as standard thermal containment. The inscription date is embedded in the base sigil — six weeks back, as you estimated. Nothing in the symbol grammar indicates corruption or tampering. But the panel is demonstrably new, and a valid ward on a new panel means either the ward was transferred or the panel swap was planned well in advance. The coordinator\'s office manages planned maintenance. That is where the work order would live.';
        addJournal('Ward mark reads standard — temporal mismatch with panel age; work order likely in coordinator records', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'magic',
    label: "Ley-line interference in the observation archive. The pattern isn't natural.",
    plot: 'main',
    tags: ['Magic', 'Lore', 'Records'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The observation archive\'s interference field is strongest near the sealed section, which is behind a locked access panel requiring coordinator clearance. The open section of the archive still shows normal ley readings — the interference is specifically localized to the restricted area. That localization is itself a finding worth recording.',
      xp: 0,
      effects: [],
      next: [{text: 'Record the interference boundary before the archive closes.', skill: 'wits', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'ley-line interference pattern analysis');
      G.stageProgress[1]++;

      var result = rollD20('lore', (G.skills.wits || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The interference pattern is not random noise. It is a suppression field — a deliberate arcane construction layered over the natural ley signature of the dome\'s observation platform. Someone inscribed it into the foundation stones of the archive annex, probably during a maintenance window, probably at night. The suppression is targeted: it specifically attenuates the frequency band used by the dome\'s celestial anomaly monitors. The monitors still function. They simply cannot report what they are reading. The inscription anchor point is in the sealed section, under the coordinator\'s clearance lock.';
        G.stageProgress[1]++;
        addJournal('Observation archive interference confirmed as deliberate suppression field — attenuation targets celestial anomaly monitor frequency; anchor in sealed coordinator section', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The interference is stronger than expected and the reading process pulls on your concentration for longer than it should. By the time you have a usable baseline, the archive morning session has ended and the archivist is running the close-cycle, which involves resetting the floor panels you were using as reference points. Whatever the interference field is doing, the reading is incomplete. The archivist notes your extended presence in the session log.';
        addJournal('Ley interference analysis incomplete — extended session logged by archivist', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The ley-line signature in the observation archive shows two distinct interference bands — one consistent with the dome\'s standard thermal regulation field, one with no matching source in the public maintenance registry. The second band is recent, narrow, and specifically positioned over the celestial observation instrumentation. It is not disrupting the instruments. It is filtering their output before the readings reach the public log. Someone is editing what the dome sees before the record is written.';
        addJournal('Second interference band identified in archive — filters celestial instrument output before public log entry', 'evidence');
      } else {
        G.lastResult = 'The ley-line baseline for this section of the dome should be stable — thermal infrastructure generates a consistent field signature. The archive reading shows a second signal layered underneath, periodic rather than continuous, cycling on a schedule that does not match any standard maintenance window you can identify. The cycle period is close to the celestial observation rotation logged on the public board, but offset by eleven minutes. The offset is precise enough to be intentional.';
        addJournal('Ley archive shows periodic secondary signal — offset 11 minutes from celestial observation rotation, too precise for coincidence', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // STEALTH x2
  {
    archetypeGroup: 'stealth',
    label: "Maintenance patrol pattern has a four-minute gap at the junction. That's the window.",
    plot: 'main',
    tags: ['Stealth', 'Risk', 'Covert'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The patrol gap is three minutes, not four — the second officer runs the eastern branch faster than the first. You are in the service passage when the light from her headlamp sweeps the junction. She does not see you, but she stops and checks the side passage by habit. You hold still for ninety seconds before she moves on. The window has closed and the patrol is now one rotation out of sync with the gap you mapped.',
      xp: 0,
      effects: [],
      next: [{text: 'Remap the patrol rotation before the next attempt.', skill: 'finesse', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'navigating maintenance patrol gap');
      G.stageProgress[1]++;

      var result = rollD20('stealth', (G.skills.finesse || 0));
      var target = 15;

      if (result.isCrit) {
        G.lastResult = 'The junction clears on schedule and you are through before the echo of the patrol\'s boots has fully faded. The service passage beyond the gap leads to the dome\'s secondary monitoring station — unmanned, still recording. The station log shows the last eighteen days of dome pressure readings in real time, and they do not match the public board. The divergence began sixteen days ago. The log timestamps show the public board was last synchronized on that same day, then decoupled. Someone stopped the sync and left the station running separately.';
        G.stageProgress[1]++;
        addJournal('Accessed secondary monitoring station — real-time pressure readings diverge from public board; sync decoupled 16 days ago', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The gap exists but the thermal draft from the vent above the junction carries your movement sound further than the service passage acoustics usually allow. The second patrol officer pauses at the junction and does a visual sweep — standard habit, nothing specific. She marks the timestamp on her route log. The patrol frequency increases on this section for the rest of the day: one extra pass per hour. The gap is now half its previous width.';
        addJournal('Patrol detected movement sound — frequency increased on this section, gap halved', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'Through the gap and into the service tunnel before the first patrol officer completes her turn. The tunnel runs parallel to the coordinator\'s administrative corridor — close enough to hear voices through the insulation panels, muffled but identifiable. Two voices: one is reading numbers from what sounds like a routing sheet. The second is giving corrections. The corrections are not going back to the original sheet. They are going somewhere else. You cannot stay long enough to catch the specific figures, but the coordinator\'s office is sourcing corrections that bypass the standard record.';
        addJournal('Service tunnel intercept — coordinator office voices; corrections routed away from original routing sheet', 'evidence');
      } else {
        G.lastResult = 'Through the gap without incident. The service passage beyond is short — it ends at a locked equipment room, and the lock is current-spec, not salvage. The room was locked within the last two weeks: the latch mechanism still has installation marks. Whatever the equipment room holds was secured in a hurry, during the same period the maintenance rotation changes began. You make it back to the main corridor before the next patrol comes around.';
        addJournal('Accessed service passage — equipment room locked recently, installation marks fresh; timing matches rotation changes', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'stealth',
    label: "The overseer takes the same route every third shift. She\'s one junction ahead.",
    plot: 'main',
    tags: ['Stealth', 'Covert', 'Observation'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The overseer takes an unscheduled stop at the secondary gauge station — a deviation that cuts the following distance to nothing. You have to peel off into the side passage before she turns around to log the gauge reading. She does not see you but she does see the side passage door, which you left two inches open. She notes it in her route log. The overseer\'s route is compromised for this shift.',
      xp: 0,
      effects: [],
      next: [{text: 'Wait for the next shift rotation before trying again.', skill: 'finesse', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'shadowing overseer through service tunnels');
      G.stageProgress[1]++;

      var result = rollD20('stealth', (G.skills.finesse || 0));
      var target = 15;

      if (result.isCrit) {
        G.lastResult = 'Three junctions, two stairwells, and a pressure-door cycle. The overseer\'s route ends at a meeting room that is not on the public facility map — a room that exists in the dome\'s construction record but was listed as decommissioned four years ago. She knocks twice and enters without waiting. Through the insulation gap above the door frame: two voices, the smell of a cooler air supply, and a very specific phrase — "the allocation runs through the registry on day seven." You catch the signature name before the door seals. It is the same name that stamps the sealed maintenance corridors.';
        G.stageProgress[1]++;
        addJournal('Shadowed overseer to unmapped decommissioned room — heard allocation reference and caught signature name matching sealed corridors', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The overseer stops without warning at the pressure-door junction — not to check gauges, just to listen. She has done this before. She stands for forty seconds without moving, then takes the left branch instead of the right. Her route has changed. You have been following the wrong pattern. By the time you reset, she is three junctions ahead and the service tunnel lighting has dimmed to maintenance cycle. You return the way you came.';
        addJournal('Overseer altered route — following pattern was wrong; surveillance attempt failed', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'Two junctions in, the overseer stops at a marked access panel that the public facility map shows as a standard utility closet. She uses a key that is not on the standard maintenance ring — it is separate, on a plain loop. She is inside for four minutes. When she comes out, she is carrying a sealed document envelope that she was not carrying before. The document envelope goes into her inner jacket pocket, not her work satchel. The access panel is marked with the coordinator\'s restriction stamp.';
        addJournal('Overseer accessed restricted panel with non-standard key — left with sealed document envelope', 'evidence');
      } else {
        G.lastResult = 'One junction of clean following distance. Then the acoustic profile of the corridor changes — the thermal insulation thins out near the dome wall and sound carries differently. Your footfall timing is off by just enough. The overseer doesn\'t stop, doesn\'t look back, but her pace changes — slightly faster, slightly more deliberate. She knows the tunnel acoustics better than you do. You back off. You learned one thing: she went left at the third junction. That branch leads toward the coordinator\'s restricted section.';
        addJournal('Partial shadow — overseer pace shifted; route toward coordinator restricted section confirmed', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  // SUPPORT x2
  {
    archetypeGroup: 'support',
    label: "The dome worker hasn\'t reported to medical. She has a reason for that.",
    plot: 'main',
    tags: ['Support', 'NPC', 'Care'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The dome worker waves you off before you finish the offer — not hostile, just practiced. She has been managing this injury through her shift and the muscle memory of doing so has closed the conversation. She ties off the pressure wrap on her own and goes back to the gauge station. You don\'t learn why she hasn\'t reported. The next shift handoff in two hours will take her through the medical station corridor; the reason might surface there.',
      xp: 0,
      effects: [],
      next: [{text: 'Wait for the shift handoff to create a natural opening.', skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'tending to injured dome worker');
      G.stageProgress[1]++;

      var result = rollD20('persuasion', (G.skills.charm || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'Ressa lets you wrap the wrist properly and doesn\'t speak until you\'re tying the knot. "Medical reports go to the coordinator\'s office now. Not to the medical station — to the coordinator." Her other hand finds the edge of her work chit and folds it once, the way she apparently does with every piece of paper she\'s thinking about. "First time I reported a workplace injury under the new system, I lost my maintenance rotation access for six days. The report said it was for recovery observation. I was working full capacity by the second day." She looks at the wrist. "This is fine. I\'ll manage." The coordinator\'s office routing started eight weeks ago.';
        G.stageProgress[1]++;
        addJournal('Dome worker: medical reports now route to coordinator, not medical station — worker lost rotation access after reporting; 8 weeks ago same time as rotation changes', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'Ressa accepts the help and says nothing during it — arms, hands, all the conversation she intends to have. When the wrap is done she stands up and goes back to the gauge station. The silence is not unfriendly. She simply has nothing to give you: whatever reason she has for not reporting, it lives somewhere that is not going to open for a stranger in a maintenance corridor. The wrap is better than it was. That is the extent of the transaction.';
        addJournal('Tended dome worker — no information gained; barrier too established', 'discovery');
      } else if (result.total >= target) {
        G.lastResult = 'Ressa lets you work on the wrist and keeps her voice low. "Medical station is logged to the coordinator\'s office now. Everything goes through." She glances toward the gauge station. "I\'m not trying to get a notation in my file right now." She says it flatly, without self-pity — the way someone states a fact about weather or equipment. Her thumbnail finds the edge of her work chit without her looking at it. The routing change is real. The fear of a notation is real. The coordinator\'s office is at the center of both.';
        addJournal('Dome worker: medical station reporting routes to coordinator — fears notation in file; confirmed routing change is discouraging reporting', 'evidence');
      } else {
        G.lastResult = 'Ressa lets you help and relaxes slightly while the wrap goes on — a small drop in the tension she has been carrying through her shift. She doesn\'t offer the reason she hasn\'t reported. But she does say: "I\'ll go when this rotation\'s done." Her thumbnail finds the fold of her work chit while she says it. Whatever the actual barrier is, she has decided it is manageable. The medical station is two corridors east. If she goes, the reason she delayed will show up in the intake record.';
        addJournal('Dome worker agreed to report after rotation — delay reason unclear but may appear in medical intake record', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'support',
    label: "Two dome crews competing for the same repair slot. The dispute is the distraction.",
    plot: 'main',
    tags: ['Support', 'NPC', 'Negotiation'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'Both foremen have been arguing this slot long enough that they have developed fixed positions and a working dislike of each other. A third party wading in reads as another layer of the same problem. The taller foreman tells you, politely, to file a scheduling grievance through the coordinator\'s office. The shorter one just stops talking. The dispute continues without you and the corridor stays blocked.',
      xp: 0,
      effects: [],
      next: [{text: 'File a scheduling inquiry through the coordinator\'s office instead.', skill: 'charm', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'brokering dome crew slot dispute');
      G.stageProgress[1]++;

      var result = rollD20('persuasion', (G.skills.charm || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The dispute is about a thermal vent maintenance slot that appeared on both crews\' schedules simultaneously — something that should be impossible under commune allocation. You get both foremen talking to you instead of each other and the real shape of it emerges: neither crew scheduled the slot. It was placed on their schedules from the coordinator\'s office three days ago with no work order attached. "Someone needed both crews in this corridor at the same time," the shorter foreman says. Her thumbnail finds the edge of her work chit and scores a small line across it. "And neither of us was supposed to notice we\'d been put here together." They share their scheduling logs with you.';
        G.stageProgress[1]++;
        addJournal('Crew conflict was engineered — coordinator placed both on same slot with no work order', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'You choose the wrong entry point and the taller foreman redirects his frustration at you for the next four minutes — a complete accounting of every scheduling irregularity this crew has endured, none of which is relevant to the repair slot, all of which is delivered at a volume that draws a patrol around the junction. The patrol doesn\'t intervene, but they log the time and location of the disturbance. The slot dispute is still unresolved and you are now associated with it.';
        addJournal('Crew mediation backfired — patrol logged disturbance, dispute unresolved', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'You split the slot: one crew handles the thermal inspection, one handles the seal check. Both foremen agree because the alternative is losing the slot entirely when a patrol writes up the obstruction. In the process of working out the division you learn that both crews were assigned the same repair slot from different management channels — one through the usual coordinator routing, one through a secondary office that neither foreman can name on their work chit. That secondary routing is new. It started six weeks ago.';
        addJournal('Dual-channel slot assignment confirmed — secondary unnamed office routing started 6 weeks ago', 'evidence');
      } else {
        G.lastResult = 'The foremen agree to a split timeline and stop blocking each other\'s crews. The corridor clears. One of the workers, waiting at the back of the group while the foremen talked, catches your eye as they move past. She taps the edge of her work chit twice — a gesture you\'ve seen commune workers use when the written record doesn\'t match the real instruction. You don\'t have context for what it means here. But the slot assignment is worth examining.';
        addJournal('Crew dispute resolved — worker signaled discrepancy between chit and real instruction', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  }

);

// ── ADDITIONAL ARCHETYPE CHOICES ──────────────────────────────
AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES.push(

  // COMBAT ×2 — commune defense posture changes
  {
    id: 'aurora_arch_combat_3',
    label: 'The commune defense rotation added an inner perimeter. The dome is being watched from inside.',
    skill: 'might',
    archetypeGroup: 'combat',
    tags: ['Security', 'Perimeter', 'Observation'],
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'A second, inner patrol ring has been added to the commune\'s defense rotation — a perimeter that runs between the residential quarters and the dome maintenance access points. Inner perimeters are not designed against external threats. This one watches the maintenance corridors, the research annexes, and the relay room approaches. The commune is now defended against its own residents moving toward the dome\'s operational infrastructure. The inner ring was added quietly, without announcement, after the new appointments.');
      addJournal('Commune defense: inner perimeter added around dome access points — watches residents, not external threat.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
  },

  {
    id: 'aurora_arch_combat_4',
    label: 'The new appointments brought their own security. The commune did not authorize them.',
    skill: 'might',
    archetypeGroup: 'combat',
    tags: ['Security', 'Authority', 'Intrusion'],
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'Two of the recently appointed dome administration officers arrived with personal security personnel — guards not affiliated with the commune defense rotation and not authorized through the commune council. The commune security captain knows they are present and has no authority to remove them. Their presence normalizes a parallel security structure inside the commune that is not accountable to commune governance. The dome\'s internal security is now partially outside the commune\'s control.');
      addJournal('New appointees brought unauthorized security personnel — parallel security structure inside commune, outside council control.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
  },

  // MAGIC ×2 — ceremonial energy shifts
  {
    id: 'aurora_arch_magic_3',
    label: 'The dome calibration has shifted. The new settings favor transmission, not filtration.',
    skill: 'spirit',
    archetypeGroup: 'magic',
    tags: ['Magic', 'Dome', 'Calibration'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The dome\'s arcane calibration has been adjusted from a filtration-priority configuration — which protects residents from atmospheric compound buildup — toward a transmission-priority configuration, which maximizes signal output from the dome\'s relay function. The change sacrifices the filtration margin that the maintenance technicians consider the safety threshold. The new calibration is within operational parameters but below the safety standard the commune established for residential protection. The relay function now outranks resident safety in the dome\'s priority order.');
      addJournal('Dome calibration: shifted from filtration-priority to transmission-priority, relay function now outranks residential safety margin.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
  },

  {
    id: 'aurora_arch_magic_4',
    label: 'The observation logging wards were disconnected from the external registry feed.',
    skill: 'spirit',
    archetypeGroup: 'magic',
    tags: ['Magic', 'Logging', 'Registry'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The dome\'s observation logging wards used to feed their output to the regional celestial registry — a standard transparency requirement for research facilities. That feed has been disconnected. The observation logs still run locally, but the data no longer flows to any external body. Cutting the registry feed means dome activity is now fully opaque to external audit. Whatever is being transmitted through the relay channel, whatever is being observed from the dome\'s position, is now known only to the people inside the facility who changed the configuration.');
      addJournal('Dome observation wards disconnected from regional registry feed — dome activity now fully opaque to external audit.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
  },

  // STEALTH ×2 — observer blind spots
  {
    id: 'aurora_arch_stealth_3',
    label: 'The relay room has a blind spot. The overnight operator uses it.',
    skill: 'finesse',
    archetypeGroup: 'stealth',
    tags: ['Surveillance', 'Relay', 'Gap'],
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The relay room\'s observation architecture has a dead zone in the northeast corner — a range not covered by any of the standard monitoring positions. The overnight operator has a habitual working position that places her in that corner during the third watch. Her break schedule is regular. Three times in the past week, the relay log shows a transmission window opening during her break — a window not initiated from the relay operator panel. Something is being transmitted through the blind spot on the overnight operator\'s schedule.');
      addJournal('Relay room: northeast dead zone used during operator breaks, 3 unauthorized transmission windows in past week.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
  },

  {
    id: 'aurora_arch_stealth_4',
    label: 'The maintenance crew skips one panel every cycle. The same panel, every time.',
    skill: 'finesse',
    archetypeGroup: 'stealth',
    tags: ['Maintenance', 'Pattern', 'Bypass'],
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The dome maintenance rotation skips Panel 7 in the northeastern maintenance corridor on every cycle — the inspection log shows the panel number present in adjacent entries but absent from the checklist record for seven consecutive cycles. Panel 7 covers the secondary channel junction. The skip is not random and it is not clerical; it is a systematic omission of the one panel that monitors the secondary transmission channel. Something at Panel 7 is not being checked because someone does not want it checked.');
      addJournal('Maintenance rotation: Panel 7 skipped 7 consecutive cycles — covers secondary channel junction, systematic deliberate omission.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
  },

  // SUPPORT ×2 — elder trust erosion
  {
    id: 'aurora_arch_support_3',
    label: 'The elder council stopped being consulted. The new appointments do not need them.',
    skill: 'charm',
    archetypeGroup: 'support',
    tags: ['Social', 'Authority', 'Displacement'],
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The elder council at Aurora Crown Commune has a formal consultative role in dome operational decisions — any change to calibration, relay function, or maintenance protocol requires a council advisory. In the past three months, the new administrative appointments have made four operational changes without advisory consultation. The council has filed objections; the objections are logged and unanswered. The consultative structure still exists on paper. It has been made inert in practice.');
      addJournal('Elder council bypassed on 4 operational changes in 3 months — consultative role made inert while structure remains on paper.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
  },

  {
    id: 'aurora_arch_support_4',
    label: 'Technicians who raised safety concerns have been reassigned away from the dome.',
    skill: 'charm',
    archetypeGroup: 'support',
    tags: ['Social', 'Retaliation', 'Pattern'],
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'Three dome technicians filed internal safety concerns about the calibration changes in the past two months. All three have been reassigned to external maintenance work — the perimeter grounds, the water management systems, any posting that removes them from dome access. The reassignments were framed as routine rotation. They were not. The pattern — concern filed, access removed — has been consistent enough that the remaining technicians inside the dome have stopped filing. Institutional silence was purchased with reassignment.');
      addJournal('Three technicians who filed safety concerns reassigned away from dome access — pattern silenced remaining staff.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
  }

);

window.AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES = AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES;

// ── ARCHETYPE-EXCLUSIVE CHOICES ──────────────────────────────
AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES.push(

  // COMBAT ×2 — Physical access in maintenance/industrial areas
  {
    archetypeGroup: 'combat',
    label: 'The corridor seal is rusted half-open. No one is looking this way.',
    plot: 'main',
    tags: ['Combat', 'Direct', 'Risk', 'Infrastructure'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The seal gives a quarter-turn before the pressure differential shoves it back — the dome\'s thermal system is still live on this branch. The bang echoes down the maintenance corridor and draws a patrol head-around from the junction. You\'re moving before they call out, but the route is burned. The technician who logs this seal will find the scuff marks.',
      xp: 0,
      effects: [],
      next: [{text: 'Find another approach before the patrol logs the seal.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'forcing a sealed maintenance corridor');
      G.stageProgress[1]++;

      var result = rollD20('combat', (G.skills.might || 0));
      var target = 14;

      if (result.isCrit) {
        G.lastResult = 'The seal turns on the second lean — you read the pressure direction from the frost line on the outer plate and angled into it. The corridor beyond smells of warm metal and old sealant. A work order board inside the alcove lists three restricted thermal vent assignments — names, rotation numbers, counter-signatures. The third name appears on every restricted slot for the past twelve days. You copy the pattern and reseal behind you. The frost line settles back to its original shape.';
        G.stageProgress[1]++;
        addJournal('Forced restricted corridor — rotation assignment pattern logged', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The seal pops free all at once, louder than intended, and the pressure wave knocks a gauge housing off its bracket with a clang that carries. Two technicians appear at the far end of the corridor. You get the seal back in place before they reach you, but your hands are covered in sealant residue and the bracket on the floor is not where it was. They write something down. You will not be able to use this corridor again.';
        addJournal('Corridor breach attempt logged by maintenance pair', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The seal yields with steady pressure and a controlled hiss. Inside: a narrow access alcove with a pressure gauge array and a rotation log clipped to the wall. The log covers the past three weeks. Two thermal vent assignments marked as suspended carry a different counter-signature than the rest — one you haven\'t seen on any open board. You note it and ease the seal back into place. The gauge readings don\'t change. No one comes.';
        addJournal('Accessed restricted alcove — unfamiliar counter-signature on suspended vent assignments', 'evidence');
      } else {
        G.lastResult = 'The seal moves, but the locking pin beneath it doesn\'t. The dome maintenance system uses a two-step engagement you can feel but can\'t see. You apply pressure until your forearms ache and get nothing. The patrol rotation down this branch runs every twenty minutes; you\'ve used seven of them. You step back before the window closes. The seal is undamaged. The corridor is still locked.';
        addJournal('Sealed corridor: two-step lock resisted forced entry', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'combat',
    label: 'Two workers blocking the vent junction. Their argument is slowing a patrol.',
    plot: 'main',
    tags: ['Combat', 'Direct', 'Confrontation'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The two workers clock you before you close the gap — commune settlements read body language the way port towns read tides. One steps sideways to block the junction gap on pure instinct. The argument stops. You\'re the new problem in the corridor, and the patrol at the far end has already slowed to look. The junction stays closed.',
      xp: 0,
      effects: [],
      next: [{text: 'Back off before the patrol makes it a formal stop.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'clearing a contested vent junction');
      G.stageProgress[1]++;

      var result = rollD20('combat', (G.skills.might || 0));
      var target = 14;

      if (result.isCrit) {
        G.lastResult = 'You step into the argument, not around it — take one side, speak with enough authority about the gauge differential that the taller of the two turns to address you directly. The argument shifts, reconfigures, and ends with both workers moving off toward the monitoring station together, you watching them go. The junction is clear. Beyond it: a secondary pressure board with restricted vent assignments posted in red marker. You read it in thirty seconds. One assignment has been redirected three times in a week.';
        G.stageProgress[1]++;
        addJournal('Cleared junction blockade — found repeatedly redirected vent assignment on secondary board', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The workers don\'t move and don\'t argue — they stop and look at you, which is worse. The taller one asks, very quietly, who sent you to this corridor. It isn\'t a hostile question. It\'s a commune question: everyone belongs to a rotation, and you don\'t fit any rotation they know. The patrol at the junction end stops and looks. You have about eight seconds to produce a reason or walk away.';
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Junction confrontation raised attention — commune suspicion logged', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The workers separate when you step between them — not because you said anything aggressive, but because you moved with the particular deliberateness of someone who has decided the question is settled. The junction opens. You note what\'s posted on the vent board inside before the workers regroup behind you. Three names, one recurring assignment, no dates. Someone is keeping a rotation slot off the posted schedule.';
        addJournal('Junction cleared — undated recurring assignment noted on vent board', 'evidence');
      } else {
        G.lastResult = 'The workers look at you, then at each other, then continue the argument at a lower volume with their bodies angled to block the junction gap. You have not made this worse, but you haven\'t made it better. The patrol passes at the far end and doesn\'t stop. The junction remains effectively closed — two people and an ongoing dispute fill it as completely as a locked door.';
        addJournal('Junction blockade: standoff unresolved, passage denied', 'discovery');
      }

      G.recentOutcomeType = 'action';
      maybeStageAdvance();
    }
  },

  // MAGIC ×2 — Reading arcane residue or celestial data
  {
    archetypeGroup: 'magic',
    label: 'The ward marks on these dome panels are wrong. They have been for a while.',
    plot: 'main',
    tags: ['Knowledge', 'Lore', 'Observation', 'Arcane'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The dome panel script is maintenance shorthand layered over older ward notation — two systems written in the same space, neither fully legible through the other. Reading it properly would take a reference text you don\'t have access to. The archive reading room carries the notation manual for dome inscription systems. That route is still open.',
      xp: 0,
      effects: [],
      next: [{text: 'The archive reading room has the notation reference.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'reading dome ward mark anomalies');
      G.stageProgress[1]++;

      var result = rollD20('lore', (G.skills.wits || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The original ward marks are thermal containment seals — standard commune inscription, correctly applied. The newer marks layered over them are not maintenance notation. They\'re suppression marks: designed to damp the resonance field that the containment seals generate when dome integrity degrades. Someone has been marking the panels to hide what the seals would otherwise signal. The suppression work is recent — the chalk base hasn\'t fully cured. Whoever applied it was here within the last two days.';
        G.stageProgress[1]++;
        addJournal('Dome panels carry suppression marks over containment seals — applied within 48 hours', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'The notation resolves partway and then doesn\'t — you\'ve been reading maintenance shorthand as ward script and the meanings have compounded into something incoherent. You\'ve spent twenty minutes in a maintenance corridor running your hand along panels, and a technician passing at the junction has stopped to watch. She doesn\'t say anything. She notes something in her rotation log and moves on. Whatever you misread, someone now knows you were here reading it.';
        addJournal('Dome panel reading misread — observation logged by passing technician', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The ward marks are standard thermal containment inscription — correctly applied in the original layer. The second layer is something else: notation you recognize from structural suppression work, the kind used when a dome section is being quietly decommissioned without formal announcement. The marks cover three consecutive panels. The formal decommission register is posted outside the coordinator\'s office. These panels are not on it.';
        addJournal('Panels carry suppression notation absent from formal decommission register', 'evidence');
      } else {
        G.lastResult = 'The marks are layered — original inscription under a second pass of a different hand and tool. You can read the original well enough: thermal containment, standard commune issue. The second layer uses a notation style you\'ve seen but can\'t place precisely without a reference text. It isn\'t decorative. It isn\'t maintenance. The commune archive carries the notation index — the reading room is open during both daily windows.';
        addJournal('Dome panels: dual-layer inscription, second layer unidentified — archive notation index needed', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'magic',
    label: 'The ley-line readings in the observation archive stop at a specific date.',
    plot: 'main',
    tags: ['Knowledge', 'Lore', 'Records', 'Arcane'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The observation archive is locked for the morning consolidation cycle. The posted hours show two daily windows; neither is now. The public index in the registry hall cross-references the ley-line observation logs by date. That index is always accessible and carries the same date range.',
      xp: 0,
      effects: [],
      next: [{text: 'The registry hall public index carries the same date range.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'tracing ley-line observation record gap');
      G.stageProgress[1]++;

      var result = rollD20('lore', (G.skills.wits || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The final entry before the gap reads normally: azimuthal reading, interference coefficient, observer initial. The next entry — fourteen days later — uses different notation for the interference coefficient. The old notation measured ambient field strength. The new notation measures suppressed field strength. Someone changed the measurement standard without a conversion note, which means the gap in the record isn\'t a gap in observation. It\'s a gap in the measurement system itself — the readings before it and after it describe different things. The change order would have come through the contamination monitor\'s office.';
        G.stageProgress[1]++;
        addJournal('Ley-line log gap reflects measurement standard change — old vs suppressed field notation, no conversion note', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'You lose the thread in the notation — the observation logs use a shorthand that builds on itself, and the entry where it changes breaks the chain you\'ve been reading. By the time you find the gap you came to examine, the archive window has closed and the archivist is already at the door. She holds it open without expression. The gap is real. You didn\'t read it.';
        addJournal('Observation archive: notation chain broken, archive window closed before gap examined', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The gap is fourteen days. Before it: daily entries, consistent notation, three different observer initials. After it: daily entries, similar notation, one observer initial — always the same one. The solo observer began on the same day the gap ends. The commune record board would show who was assigned the observation post during the gap period, and why the rotation collapsed to a single person.';
        addJournal('Ley-line log: 14-day gap, post-gap single-observer rotation — board assignment record needed', 'evidence');
      } else {
        G.lastResult = 'The gap is there — fourteen days with no entries, not even a notation of equipment failure or weather interruption that would explain a pause in celestial observation. The entries before and after are routine. The date of the gap corresponds to something in commune administrative history, but the connection requires a second source. The registry hall public index cross-references observation log dates to administrative decisions.';
        addJournal('Ley-line observation log: 14-day gap with no notation of cause', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // STEALTH ×2 — Moving undetected through dome infrastructure
  {
    archetypeGroup: 'stealth',
    label: 'The maintenance patrol uses the same junction rotation every cycle.',
    plot: 'main',
    tags: ['Stealth', 'Infiltration', 'Risk'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'The patrol varies its return window this cycle — a response to something, or a test, or chance. You\'re in the junction gap when their lamp rounds the corner twelve seconds early. You fold into the equipment alcove and they pass close enough that the lamp heat reaches you. They slow but don\'t stop. You can\'t use this junction again today.',
      xp: 0,
      effects: [],
      next: [{text: 'Find a different approach before the patrol logs the anomaly.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'slipping past a maintenance patrol');
      G.stageProgress[1]++;

      var result = rollD20('stealth', (G.skills.finesse || 0));
      var target = 15;

      if (result.isCrit) {
        G.lastResult = 'You move on the patrol\'s heels — close enough to use their lamp shadow, far enough to drop into a pressure alcove if they stop. They don\'t stop. The restricted section beyond the junction has an open work board: three thermal vent assignments listed under "suspended pending review," each counter-signed by an office designation that doesn\'t appear anywhere on the public board. You have the assignment numbers and the office code before the patrol\'s return pass begins. You\'re back at the junction before their lamp rounds the corner.';
        G.stageProgress[1]++;
        addJournal('Bypassed patrol — suspended vent assignments with unlisted office counter-signature logged', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'You time the patrol correctly but misjudge the acoustic properties of the corridor — the dome\'s curved wall returns footstep sound from an angle, and you hear yourself a half-second after the patrol does. They stop. They don\'t call out; they just stop and listen. You press flat against the junction wall and don\'t breathe. After thirty seconds, they continue. But one of them turns and looks back at the junction before they round the corner. They know something was there.';
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('Patrol alerted to corridor presence — acoustic slip, not confirmed', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'The junction opens on the patrol\'s exit beat and closes behind you on their next turn. Inside: a secondary maintenance board with this week\'s vent assignments. Two slots are marked with a notation you haven\'t seen on the public schedule — a category marker, not a name. Whatever the category covers, it isn\'t listed on any open board in the commune. The patrol\'s lamp passes the junction gap. You\'re already past the second turn.';
        addJournal('Accessed secondary maintenance board — unlisted category marker on two vent slots', 'evidence');
      } else {
        G.lastResult = 'The patrol window holds, but the junction seal is noisier than expected — the hiss when it opens is short, but short isn\'t nothing in a dome corridor. You clear the junction and reach the secondary section without incident. But you hear the patrol slow behind you. They don\'t stop. You keep moving and find a pressure alcove to wait in until the corridor sound settles back to baseline.';
        addJournal('Junction traversal: patrol noticed seal noise, did not follow up', 'discovery');
      }

      G.recentOutcomeType = 'stealth';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'stealth',
    label: 'The overseer takes the same service tunnel every morning. She never looks behind her.',
    plot: 'main',
    tags: ['Stealth', 'Observation', 'Risk'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'She looks behind her this morning — a habit broken, a lamp checked, whatever the reason. The tunnel is narrow and there is no shadow deep enough. She sees you before you can create a distance. She doesn\'t call out. She just stops and waits. The conversation you have is controlled, professional, and gives you nothing.',
      xp: 0,
      effects: [],
      next: [{text: 'Withdraw before she decides the encounter needs to be logged.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'shadowing the overseer through service tunnels');
      G.stageProgress[1]++;

      var result = rollD20('stealth', (G.skills.finesse || 0));
      var target = 15;

      if (result.isCrit) {
        G.lastResult = 'She moves quickly through the tunnel and you match her rhythm — close enough to read the papers under her arm, far enough to drop back at any deviation. At the third junction she stops and slides a key into a wall-mounted panel you\'d have missed without following this exact route. Inside: a secondary communication board with names and schedule codes. She photographs it with a hand mirror and moves on. You see seven names on that board, none of which appear in any public commune roster. The panel locks behind her and you note its location.';
        G.stageProgress[1]++;
        addJournal('Followed overseer to hidden communication board — 7 names absent from public roster, panel location noted', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'A pipe junction drips at the worst moment — the sound hits the tunnel wall and returns doubled, and she is already turning before the second echo settles. She holds her lamp toward the tunnel behind her for a long three seconds. You are flat against the curved section of the pipe housing. The lamp light reaches your boots. She carries on. But her pace is different after that — quicker, with pauses at each junction. She knows the tunnel is not empty.';
        addJournal('Overseer spooked in service tunnel — pace changed, she is now alert', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'She enters a side alcove you\'d have passed without noticing — no markings, no handle, just a slightly different wear pattern on the floor in front of it. Inside she speaks briefly with someone you can\'t see. You catch three words in the correct register: a schedule code, a name you recognize from the maintenance board, and the word "delayed." She emerges and continues. You wait a full minute before passing the alcove entrance. It\'s empty. Whatever the delay covers, the name matches a suspended vent assignment.';
        addJournal('Overseer alcove meeting: schedule code, suspended vent assignment name, delay referenced', 'evidence');
      } else {
        G.lastResult = 'She takes the tunnel at a pace that makes distance management difficult in the curved sections — every turn accelerates slightly, and you fall back twice to avoid closing gap. You don\'t lose her, but you arrive at her destination junction two seconds after she\'s through it and the panel is already locked. You note the junction location. The route itself is useful. You know exactly where she goes and roughly when.';
        addJournal('Overseer route mapped — destination junction identified, entry not achieved', 'discovery');
      }

      G.recentOutcomeType = 'stealth';
      maybeStageAdvance();
    }
  },

  // SUPPORT ×2 — Social/care-based extraction
  {
    archetypeGroup: 'support',
    label: 'The dome worker\'s hands are wrapped wrong. She has been doing this herself.',
    plot: 'main',
    tags: ['Care', 'NPC', 'Social'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'She pulls her hands back before you reach her — not hostile, just practiced. "Medical station handles injuries." She says it the way someone says something they\'ve been told to say. The medical station is two corridors east and staffed during two posted windows. Whatever she needed tending, she has decided to tend it herself, or wait.',
      xp: 0,
      effects: [],
      next: [{text: 'Try the medical station — the route through there may yield more.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'tending to injured worker, drawing out information');
      G.stageProgress[1]++;

      var result = rollD20('persuasion', (G.skills.charm || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'She lets you retape the thermal wrap on her left palm — a pressure burn, not deep, but the kind that comes from working a valve without gloves on a restricted vent line. She talks while you work. "The restricted lines have been run hot for three weeks. We\'re not supposed to touch them without authorization, but the authorized crews never come. So you either let the readings climb or you manage it yourself and don\'t report the contact." She keeps her voice below the ventilation hum. "Three of us have burns. None of them are in the medical log." Her right thumb finds the seam of the wrap and presses it flat without her seeming to notice.';
        G.stageProgress[1]++;
        addJournal('Dome worker revealed unauthorized manual management of restricted vent lines — 3 unreported burns', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'She accepts the offer, sits down on the equipment crate, and then doesn\'t talk. She watches the corridor while you work. When the wrap is done she flexes her hand twice, thanks you with the particular brevity of someone who has learned not to owe anything to strangers, and returns to the gauge station. You offered something real and she took it and gave nothing back. This is not hostility. It\'s caution that has been tested enough to become reflex.';
        addJournal('Injured worker accepted care, offered nothing — caution without hostility', 'discovery');
      } else if (result.total >= target) {
        G.lastResult = 'She talks while you work the wrap — not about the burn, about the rotation schedule. "They pulled the experienced crew from this section six weeks ago. Borrowed, they said. The work didn\'t stop — someone still has to manage these lines. So it\'s whoever\'s left, on whatever they can figure out." She flexes the rewrapped hand. "Management doesn\'t come through here anymore. Hasn\'t since the reallocation." The rotation records would show who was borrowed and when they were supposed to return.';
        addJournal('Worker confirmed experienced crew reallocation — medical situation undocumented', 'evidence');
      } else {
        G.lastResult = 'She lets you help with the wrap. She doesn\'t talk, but she doesn\'t have to — the burn pattern on her palm is from a valve housing that runs above rated temperature. The medical station would log that as a restricted-line contact. She hasn\'t reported it. Either the restricted lines are being run outside safe parameters and she knows it, or she can\'t afford to document the contact. Both possibilities lead to the same place: the vent authorization records.';
        addJournal('Worker burn pattern suggests unreported restricted-line contact — medical log gap implied', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  {
    archetypeGroup: 'support',
    label: 'The two crews are fighting over a repair slot that neither of them scheduled.',
    plot: 'main',
    tags: ['Social', 'NPC', 'Diplomacy', 'Infrastructure'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: 'Both crews look at you, then at each other, then back at the disputed repair slot — and decide the problem is easier to manage without a third party involved. The argument stops. Both crews occupy opposite ends of the corridor and neither moves. The slot stays empty. Whatever was worth fighting over is no longer worth explaining to an outsider.',
      xp: 0,
      effects: [],
      next: [{text: 'Leave the crews to it and find another approach.', skill: 'vigor', tag: 'safe', align: 'neutral', cid: '__arrive__'}]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'brokering between competing dome crews');
      G.stageProgress[1]++;

      var result = rollD20('persuasion', (G.skills.charm || 0));
      var target = 13;

      if (result.isCrit) {
        G.lastResult = 'The dispute is about a thermal vent maintenance slot that appeared on both crews\' schedules simultaneously — something that should be impossible under commune allocation. You get both foremen talking to you instead of each other and the real shape of it emerges: neither crew scheduled the slot. It was placed on their schedules from the coordinator\'s office three days ago with no work order attached. "Someone needed both crews in this corridor at the same time," the shorter foreman says. Her thumbnail finds the edge of her work chit and scores a small line across it. "And neither of us was supposed to notice we\'d been put here together." They share their scheduling logs with you.';
        G.stageProgress[1]++;
        addJournal('Crew conflict was engineered — coordinator placed both on same slot with no work order', 'evidence');
      } else if (result.isFumble) {
        G.lastResult = 'You choose the wrong entry point and the taller foreman redirects his frustration at you for the next four minutes — a complete accounting of every scheduling irregularity this crew has endured, none of which is relevant to the repair slot, all of which is delivered at a volume that draws a patrol around the junction. The patrol doesn\'t intervene, but they log the time and location of the disturbance. The slot dispute is still unresolved and you are now associated with it.';
        addJournal('Crew mediation backfired — patrol logged disturbance, dispute unresolved', 'complication');
      } else if (result.total >= target) {
        G.lastResult = 'You split the slot: one crew handles the thermal inspection, one handles the seal check. Both foremen agree because the alternative is losing the slot entirely when a patrol writes up the obstruction. In the process of working out the division you learn that both crews were assigned the same repair slot from different management channels — one through the usual coordinator routing, one through a secondary office that neither foreman can name on their work chit. That secondary routing is new. It started six weeks ago.';
        addJournal('Dual-channel slot assignment confirmed — secondary unnamed office routing started 6 weeks ago', 'evidence');
      } else {
        G.lastResult = 'The foremen agree to a split timeline and stop blocking each other\'s crews. The corridor clears. One of the workers, waiting at the back of the group while the foremen talked, catches your eye as they move past. She taps the edge of her work chit twice — a gesture you\'ve seen commune workers use when the written record doesn\'t match the real instruction. You don\'t have context for what it means here. But the slot assignment is worth examining.';
        addJournal('Crew dispute resolved — worker signaled discrepancy between chit and real instruction', 'discovery');
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  }

);
