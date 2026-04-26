/**
 * AURORA CROWN COMMUNE STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to dome maintenance, survival, and contamination
 * Generated for: Individual need vs collective survival, hope vs fatalism, containment vs contamination
 * Each choice: 65-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

const AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. DOME TECHNICIAN: MAINTENANCE ROTATIONS DISRUPTED
  {
    label: "The emergency rotations have increased. Fewer people are being assigned to the repairs that need them most.",
    tags: ['Investigation', 'NPC', 'Observation', 'Infrastructure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'uncovering maintenance pressures');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
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
    label: "The celestial observation logs have been moved. Someone authorized it. The authorization isn't on the board.",
    tags: ['Investigation', 'NPC', 'Records', 'Knowledge', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering data suppression');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Meren closes the archive room door before speaking. The celestial observation logs from the past month have been flagged for "archive consolidation" — her word for removal, spoken with precise distaste. The orders came through the contamination monitor's office. "Not medical orders. Not safety protocols." She sets a flagged folder on the table between you. "Our record board shows every decision ever made in this commune. This one isn't on it." She taps the folder. "Someone is erasing what the skies are showing."`;
        G.stageProgress[1]++;
        addJournal('Archivist revealed authorized celestial record suppression', 'evidence', `aurora-archive-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The archivist on duty stands from her chair before you finish the question. "Archive records are restricted. Administrative authorization, in writing, from the commune registry hall." She's already writing something in a log. The pen scratches across the page. Your name goes in it — you watch it happen. By the time you leave the archive room, the note is already being walked somewhere.`;
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
    label: "Survival supplies are being redirected. The destination codes don't appear in any public record.",
    tags: ['Investigation', 'NPC', 'Logistics', 'Survival', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading distribution pressure');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

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
    label: "Critical repairs are sitting in the queue. They have been sitting there for weeks.",
    tags: ['Investigation', 'NPC', 'Maintenance', 'Integrity', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing maintenance sabotage');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

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
    label: "The celestial observer's charts have been running irregular for three weeks. He hasn't filed a notice.",
    tags: ['Investigation', 'NPC', 'Celestial', 'Phenomenon', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading celestial corruption');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Corvus has his observation charts spread across a long worktable and doesn't offer you a seat. He points instead — bands of pattern data running across four weeks of nights. "Used to follow a cycle. The dome's interaction with the contamination field made stable, readable patterns." His finger traces where the pattern breaks. Three weeks ago. "That's not natural drift. Either the contamination itself changed, or someone is manipulating the containment field deliberately." He rolls the chart back up. "What we're seeing out there now — that's not what the barrier is supposed to look like."`;

        G.stageProgress[1]++;
        addJournal('Observer revealed intentional contamination field destabilization', 'evidence', `aurora-observer-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Corvus doesn't stop working while you talk. He finishes a notation, caps his pen, and turns to face you with the precise economy of someone who has decided something. "Celestial observation is technical work. You don't have the background for the questions you're asking." He opens a logbook and writes a brief entry — time, visitor, subject of inquiry. He doesn't look up again. The observation room door is behind you.`;
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
    label: "The seepage logs show response times doubling. The monitor knows.",
    tags: ['Investigation', 'NPC', 'Contamination', 'Safety', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading containment sabotage');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Kael pulls up a stool across from you and sits like someone who stopped sleeping correctly weeks ago. The barrier protocols were changed. Seepage that should trigger emergency lockdown is now rerouted to specific containment cells. "I filed a safety violation report," he says. "They told me the new protocols were authorized at higher levels." He has a theory — someone collecting contamination samples, someone testing exposure thresholds. He sets a handwritten log on the table. "I'm supposed to record the breaches and do nothing. So I'm recording them."`;

        G.stageProgress[1]++;
        addJournal('Monitor revealed authorized barrier protocol sabotage', 'evidence', `aurora-monitor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kael's expression doesn't change. "Safety information is restricted to certified personnel. Questions about dome integrity from outside the certification structure get logged." He's already writing. The log is a proper commune record — numbered, dated, formally headed. He finishes the entry and caps his pen. "If you have a safety concern, submit it in writing through the registry hall." He means it as a dismissal. It works.`;
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
    label: "A second relay channel opened six weeks ago. The keeper hasn't asked what it's for.",
    tags: ['Investigation', 'NPC', 'Communications', 'Information', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'uncovering communications control');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Nox waits until the other relay operator steps out, then speaks at normal volume, which turns out to be the most unnerving choice. "Messages about dome maintenance, resource allocation, contamination seepage — those get routed through a secondary relay before they go out. I was told it was protocol consolidation." She points at the routing board behind her. "Coordination between communes means if one fails, the others respond. Someone is cutting that off. You only do that if you want one commune to fail quietly."`;

        G.stageProgress[1]++;
        addJournal('Relay keeper revealed message filtering to external communes', 'evidence', `aurora-keeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Nox raises a hand before you finish the question. "Relay operations aren't discussable with non-authorized personnel. Communication security." She's already at the message desk, writing something brief. It gets handed to the other relay operator, who goes out the door. You don't know where. You know it isn't good. The relay room stays closed to you after that, and the duty roster near the door has your description added to the visitor log in handwriting that isn't Nox's.`;
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
    label: "The evacuation procedures aren't in the current binder. They were there last year.",
    tags: ['Investigation', 'NPC', 'Emergency', 'Protocol', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'mapping emergency system sabotage');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Seer lays the emergency protocol binder open to a section marked "Revision — Current." Then lays an older version beside it. The difference takes you ten seconds to read. The old version has evacuation procedures, bunker access protocols, mass contamination response trees. The new version has none of them. "I asked why these were removed," she says. "The answer was: no longer necessary." She taps the older binder. "These procedures exist because failure is possible. Removing them doesn't prevent failure. It prevents surviving it."`;

        G.stageProgress[1]++;
        addJournal('Survival planner revealed deliberate evacuation protocol removal', 'evidence', `aurora-planner-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Seer picks up the emergency protocol binder before you can look at the spine. "Evacuation protocols are confidential operational security. You're not certified to review active emergency documentation." She sets it on the shelf behind her desk, spine facing the wall. "Submit a written request to the commune registry hall with your certification documentation." The registry hall is where every formal request goes to wait. She's not wrong that it's the process. She's also not going to make an exception.`;
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
    label: "Three stress points appear in the maintenance log fourteen times. None of them have repair authorizations.",
    tags: ['Investigation', 'Lore', 'Structure', 'Engineering', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'structural vulnerability mapping');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The structural records go back to the dome's original construction. You read them at a communal table, cold water glass sweating beside you. Load-bearing sections show weight routed through specific concentration points where better distribution was possible — the inspection reports for three of them are in the same binder, dated and signed. No repair was ever authorized against those reports. The dome stays up because the balance holds. It is precisely the kind of balance that doesn't announce when it ends.`;
        G.stageProgress[1]++;
        addJournal('Structural analysis revealed intentional stress point concentration', 'evidence', `aurora-structure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Halfway through the third structural volume, a duty engineer appears at your shoulder. You didn't hear anyone come in. "Structural integrity records require authorization. These aren't in the open section." He takes the volume off the table before you can mark your page. Then asks, with his pen already out, why you wanted them. You're questioned for twenty minutes in a side room, your answers logged, and released. The structural archive is closed to you now and someone knows you tried.`;
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
    label: "The barrier components look correct. They aren't the same material.",
    tags: ['Investigation', 'Craft', 'Barrier', 'Materials', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing material sabotage');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));

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
    label: "The consumption figures don't match the population. Twelve months of supply is moving somewhere else.",
    tags: ['Investigation', 'Survival', 'Economics', 'Resources', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'resource sustainability analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The numbers work out to eighteen months of normal operations at reported population size. The actual consumption rate — drawn from supply receipts and the distribution ledger — supports six months. A twelve-month gap between what should be consumed and what is. The commune doesn't have a hidden population large enough to account for it. The supplies are going somewhere that isn't the population. The grain stores outside are clearly labeled. The thing they're labeled as holding doesn't match what the ledger says is being pulled from them.`;
        G.stageProgress[1]++;
        addJournal('Sustainability analysis revealed accelerated resource consumption', 'evidence', `aurora-survival-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The calculation takes you most of the morning at a table in the communal records room, stacks of ledger volumes around you. Someone from the administrative office comes over before you finish. "What are you working on?" The question is mild. The look at your calculation sheet is not. You explain it as general interest. They write something after you leave. Resource sustainability analysis draws attention here — the commune tracks what the commune is being tracked for.`;
        G.worldClocks.watchfulness++;
        addJournal('Resource calculation drew administrative scrutiny', 'complication', `aurora-survival-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Consumption is running ahead of the official estimate by eleven percent. Noticeable when you lay the two figures beside each other in the same column. It could be population undercounting. It could be seasonal drift in estimate methodology. The discrepancy is real but not yet large enough to be indefensible as error. You note it, close the ledger, and go back for the month before.`;
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
    label: "Every conversation stops at the same topic. The line is too consistent to be coincidence.",
    tags: ['Investigation', 'Persuasion', 'Coercion', 'Silence', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'mapping coercion network');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `You spend the morning at the communal tables near the grain stores, listening. Three separate conversations stop when they notice you. Not because of who you are — because of what you're near. People talk around the dome's condition, the resource distribution, the contamination reports. They reference "the record" and "the commune decision" the way people reference things they've stopped expecting to change. Everyone present knows someone who was reassigned after raising a question publicly. The ration boards are clearly visible. Nobody needs to say the rest.`;
        G.stageProgress[1]++;
        addJournal('Coercion analysis mapped fear-based compliance network', 'evidence', `aurora-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `By midday, three people have changed seats when you sat near them. A fourth finishes her meal in under two minutes and leaves without taking the second portion she'd already queued for. Word moved before you did. Asking about administrative retaliation in a commune where administrative retaliation is real has a social cost that redistributes immediately. Nobody says anything to you. They don't need to.`;
        G.worldClocks.isolation++;
        addJournal('Population distancing from you due to coercion inquiry', 'complication', `aurora-coercion-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `People will say they're careful. A maintenance worker at the communal meal table puts it plainly: "You learn what questions go in writing and what questions stay in the room." He won't say what the consequences are for the wrong kind. Three others nearby eat without contributing to the conversation. When you ask what they're careful about, specifically, the maintenance worker checks the posted decision board behind you and goes back to his food.`;
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
    label: "The communal tables are empty at the hours they should be full. Nobody reads the decision boards.",
    tags: ['Investigation', 'Insight', 'Psychology', 'Pressure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'psychological pressure analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The communal spaces built for assembly stand empty at the hours they used to fill. A long-term resident — she's been here since the dome's second decade, she mentions it without pride — sits at a table in the commons and doesn't look up when two people walk past. That's the thing you keep noticing: nobody looks up. Aurora Crown was built on collective decision-making; the record boards are everywhere, the decision logs are public. The boards are current. Nobody reads them. When you ask a group near the cooking area about the future, the answers arrive in the same register: the dome will fail. There's no way through. Not said with grief — said with the flatness of something already decided.`;
        G.stageProgress[1]++;
        addJournal('Psychological analysis revealed systematic demoralization campaign', 'evidence', `aurora-psychology-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The first person you ask about the commune's collective mood stares at you for a long moment. "Are you from the medical board?" The second person cuts the conversation short and leaves. By the third, word has preceded you: someone is asking questions that imply the population isn't coping. In a commune where stability is survival infrastructure, that reads as either diagnostic or threatening. Two reports go to the administrative office before the afternoon ends.`;
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
    label: "Three directives, three administrators, three timing windows that match the secondary relay traffic. Someone outside is running this.",
    tags: ['Investigation', 'Perception', 'Administration', 'Hierarchy', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering administrative conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Mapped on paper, the decision chain doesn't follow the org chart. The maintenance chief's freeze orders trace back to the contamination monitor's office. The contamination monitor's protocol changes align with timing from the survival planner's directives. The survival planner's decisions correlate exactly with incoming relay traffic on a secondary channel. Someone outside Aurora Crown is issuing instructions that travel through three local administrators before they reach the dome's physical systems. The commune's own structure is being used as a transmission mechanism.`;
        G.stageProgress[1]++;
        addJournal('Administrative mapping revealed external coordination of local sabotage', 'evidence', `aurora-admin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `You're still at the communal records table with your authority-chain notes spread out when someone from the administrative office sits across from you and doesn't introduce themselves. "You've been pulling org documentation." Not a question. They look at your notes. "What's this for?" The session that follows is fifteen minutes of careful explanation on your part and careful listening on theirs. Your notes are photographed before you leave. You don't see it happen.`;
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
    label: "The maintenance workers don't talk about the dome readings. Not where anyone can hear.",
    tags: ['Investigation', 'Rumor', 'Gossip', 'Fear', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
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
    label: "Four documents, four contradictions, all pointing the same direction. Someone built that.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Systematic', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing systemic sabotage conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Spread across the communal table: maintenance policy requires the critical repairs that work order freezes prevent. Contamination protocol specifies barrier integrity that redirected seepage deliberately violates. Emergency protocol guarantees evacuation procedures that have been officially removed from the current binder. Resource allocation states survival-first priorities while the ledger shows systematic diversion. Each document on its own could be explained as administrative error. The four of them together have one common feature: every gap serves the same direction of failure. That doesn't happen by accident.`;
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
    label: "They didn't design the trap. They're just standing in it with everyone else.",
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
        { name: 'Kess', role: 'dome technician', fear: 'They said if I didn\'t cooperate, I\'d be reassigned to contamination detail. I have a child.' },
        { name: 'Kael', role: 'contamination monitor', fear: 'I tried to report it. They told me if I kept talking, my access would be revoked and I\'d be marked unreliable.' },
        { name: 'Thass', role: 'resource allocator', fear: 'I was ordered to divert supplies. The order came from above. I have no choice.' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `${npc.name} doesn't wait for the second question. The first one breaks the silence they've been keeping. "${npc.fear}" They're not asking for absolution. They're telling you what happened. Their hands stay flat on the table, not moving. Trapped and complicit are the same thing from where they're standing. The choice is yours now: put their name into the record and use the pressure it creates, or keep them protected and keep working quietly. One of those paths makes them an ally. The other makes them someone with nothing left to lose.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal('consequence', `Confronted ${npc.name} (${npc.role}) about complicity in sabotage`, `aurora-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. DISCOVERY MOMENT: WRONGNESS CONFIRMED AND ORIGIN REVEALED
  {
    label: "The instruction chain passes through the relay and terminates somewhere the commune doesn't have a name for.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of dome sabotage');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The thread runs through the relay secondary channel, into a coded correspondence batch, into transit-marked canisters that originate from Sunspire Haven. Outgoing instructions: specific protocol change orders to the contamination monitor, specific freeze directives to the survival planner, timestamped and coordinated. Someone beyond Aurora Crown's borders is running the sequence from outside. The commune's administrators aren't the architects of this — they're the mechanism. Whoever is directing it has authority to route through the relay and reason to collapse Aurora Crown without appearing to touch it.`;
        G.stageProgress[1]++;
        addJournal('Origin source of Aurora Crown sabotage identified as external coordination', 'discovery', `aurora-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The relay room is empty except for one person you haven't seen before, sitting at the secondary channel station. When you step inside, they stand. Not hostile — blocking. "This room is restricted." You back out before anything escalates, but they follow you far enough into the corridor to make the point. You didn't see what was on the station screen. They saw what you were trying to reach. Whatever the correspondence batch contains, someone is here specifically to prevent it from being read.`;
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
    label: "Barrier, maintenance, resources, protocol. All degrading. All timed to the same relay windows.",
    tags: ['Investigation', 'Pattern', 'Analysis', 'Connection', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'recognizing systematic collapse pattern');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

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
    label: "The degradation is calibrated. Not fast enough to trigger outside response. Not slow enough to be natural.",
    tags: ['Investigation', 'Synthesis', 'Understanding', 'Purpose', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'achieving systemic wrongness understanding');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));

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
    label: "The filtration log from eighteen months ago has a two-word margin note. Those two words are the answer.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'reading filtration system documentation');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.lore || 0) + Math.floor(G.level / 3));
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
    tags: ['Investigation', 'Evidence', 'Craft', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'measuring dome pressure gradient');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));
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
    label: "Walk Aurora Crown's central commons at midday — read what the assembled commune members are actually communicating through their behavior.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading commune social fabric');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The commune runs emergency rotations — watchers on the dome perimeter in eight-hour shifts. Not structural engineers: commune members in work gear taking turns. They've organized their own defense response without leadership direction. The formal structure has failed and the community is running security laterally. This is a population that's stopped trusting its institutions.`;
      } else if (arch === 'magic') {
        G.lastResult = `The atmospheric contamination is creating cognitive pressure — you can feel it in the way conversations lose their thread, the way people forget what they were doing mid-sentence. It's below thresholds that would trigger formal medical protocol. Whoever designed this wanted degradation, not crisis. They're not trying to kill Aurora Crown. They're trying to make it impossible to think clearly.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Three commune members circle the commons in irregular patterns. Not guards — their body language is too casual. Information couriers, using movement as cover for message passing. The commune has a parallel communication network operating below its visible structure. They're organizing in the spaces between official sight.`;
      } else {
        G.lastResult = `The communal meal distribution is off. Portions are slightly smaller in the outer residential blocks than in the central sector. Not a conscious decision — a symptom of a logistics breakdown that's been ongoing long enough to become normalized. The resource pressure is being absorbed unequally and no one has named it yet.`;
      }
      addJournal('Aurora Crown commons: parallel security structure, cognitive contamination, unequal resource distribution', 'evidence', `aurora-commons-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. FACTION SEED: OVERSIGHT COLLEGIUM
  {
    label: "The Oversight Collegium's name is in the external correspondence log. Someone in the commune already tried this route.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Merav Solind receives you in the commune's external correspondence room — not her office, a neutral space. "Seven weeks ago Aurora Crown submitted a formal complaint under Communal Integrity Protocol." She folds her hands. "The Collegium opened a preliminary review. That review has been delayed." She doesn't say by whom. She asks if you have documentation. She's precise in what she offers back: nothing formal yet, nothing that commits the Collegium to anything. But she writes down the filtration records reference before you leave, and she writes it in ink.`;
        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_aurora = true;
        G.factionHostility.oversight_collegium += 1;
        addJournal('faction', 'Oversight Collegium rep Merav Solind: complaint review delayed, actively seeking documentation', `aurora-collegium-${G.dayCount}`);
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
    label: "Study the founding stone at the dome's original anchor point — read what Aurora Crown was built for.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
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
    label: "Make copies of the filtration anomaly data and get them to someone outside Aurora Crown's compromised archive.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'securing filtration evidence offsite');
      if (!G.flags) G.flags = {};

      const result = rollD20('finesse', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `She travels between Aurora Crown and three outer settlements on a regular supply run — predictable enough that a sealed tube in her pack draws no particular attention. She doesn't ask what's in it. She'll drop it at the transit depot in the second settlement, marked for pickup. The filtration records leave the dome in a supply pack alongside preserves and replacement seals. Whatever happens to the archive copy, this one is outside anyone's reach here.`;
        G.flags.aurora_evidence_secured = true;
        addJournal('consequence', 'Filtration anomaly data secured via commune traveler — offsite copy created', `aurora-evidence-${G.dayCount}`);
      } else {
        G.lastResult = `Every outgoing package through official transit channels is logged and subject to inspection — the same administrative structure that controls the archive controls the outgoing manifest. A sealed document tube in a standard pack would get opened. The commune traveler who runs the regular supply run between Aurora Crown and the outer settlements doesn't route through the official station. She has her own arrangement with the second waypoint.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE ENGINEER WHO FILED THE COMPLAINT
  {
    label: "The complaint was filed. The engineer who filed it was reassigned three days later.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'hearing engineer account');

      const result = rollD20('charm', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Orren keeps his voice level in the way of someone who's had nine weeks to get used to what happened. "I filed with supporting pressure data and photographs of the NE quadrant stress fractures. Three days later — reassigned to residential maintenance. They called it a rotation." He wasn't consulted. His replacement has no dome engineering background. He pauses on that. "Someone needed the complaint to go away without formally rejecting it. Moving me sideways accomplished that." He reaches into a storage locker and sets a sealed document case on the bench between you. "I still have everything I submitted."`;

        if (!G.flags) G.flags = {};
        G.flags.met_orren_engineer = true;
        addJournal('contact', 'Engineer Orren: complaint filed, then reassigned — has original supporting documentation', `aurora-orren-${G.dayCount}`);
      } else {
        G.lastResult = `Orren looks at the work order in front of him instead of at you. "I don't discuss the complaint. I was told it's being handled." That's the full sentence. He picks up his tools and goes back to the residential maintenance task in front of him. He doesn't tell you to leave. He doesn't ask you any questions. He's been warned or he's afraid — possibly both. The sealed document case on the shelf behind him has an engineering stamp on the corner tab — the same stamp as the NE quadrant inspection report.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "Orren mentions that someone else came asking about the dome a week ago — a researcher with credentials that didn't quite add up.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"Asked about the commune's security response to the dome degradation. Not the engineering — the community response. How organized. How coordinated." Someone was assessing whether Aurora Crown could mount a coordinated defense of its own internal records.`;
      } else if (arch === 'magic') {
        G.lastResult = `"Claimed to be from a material sciences faculty. But her questions were about the additive compound specifically — not the failure pattern, not the dome design. She knew what compound to ask about before she'd seen the records." Someone already has the technical answer. They were verifying it.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"Didn't ask Orren anything directly. Just asked for a tour of the maintenance areas, took notes, and left. But Orren noticed the notes were in code — not a private shorthand, an actual cipher." Someone is documenting the dome failure in a format that can't be read if intercepted. Professional compartmentalization.`;
      } else {
        G.lastResult = `"Said they were from an external support organization. Wanted to know which commune members had tried to organize a collective response to the dome issue. Names, positions, who was coordinating with whom." Someone is mapping the commune's leadership structure. Not to help it — to understand its vulnerabilities.`;
      }

      G.lastResult += ` Whoever this person is, they're a step ahead on the Aurora Crown thread.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('warning', 'Rival-adjacent operative confirmed investigating Aurora Crown dome failure ahead of you', `aurora-rival-${G.dayCount}`);
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
window.AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES = AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES;
