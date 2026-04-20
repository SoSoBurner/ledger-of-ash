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
    label: "Question the dome maintenance chief about recent schedule changes — why have emergency rotations increased, and are fewer people than usual assigned to critical repairs?",
    tags: ['Investigation', 'NPC', 'Observation', 'Infrastructure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'uncovering maintenance pressures');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `The dome technician (Kess) sighs deeply. "We're running skeleton crews on every rotation. The maintenance chief says we're on 'conservation schedule,' but that's impossible. The dome doesn't conserve — it deteriorates. If we rotate people out, someone has to be doing that work, or the dome starts failing. But there's no one. It's like personnel are being pulled out and never reassigned. I've asked questions. I get told not to worry about things above my rotation level." They're exhausted and frightened.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Dome technician flagged personnel diversion from maintenance', `aurora-technician-rotations-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The technician becomes defensive. "Don't ask about rotation schedules. That's administrative. You want to get me reassigned to worse work?" They stop talking entirely. The maintenance division will now be guarded.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Maintenance division now hostile to inquiry', `aurora-technician-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The technician admits that scheduling has become unusual. They mention people are "being borrowed for other duties" but won't specify what work. The dome maintenance rotations are definitely understaffed.`;
        addJournal('investigation', 'Technician confirmed unusual personnel reallocations', `aurora-technician-understaffed-${G.dayCount}`);
      } else {
        G.lastResult = `The technician says maintenance schedules are always changing. "Just the nature of survival work," they deflect. The specific pressure remains hidden.`;
        addJournal('investigation', 'Dome maintenance schedule inquiry inconclusive', `aurora-technician-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. RESEARCH ARCHIVIST: CELESTIAL RECORDS REMOVAL
  {
    label: "Access the research archives and investigate recent removals — are celestial observation logs being deleted or relocated, and who authorized this?",
    tags: ['Investigation', 'NPC', 'Records', 'Knowledge', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering data suppression');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The research archivist (Meren) pulls you aside to a secure room. The celestial observation logs from the past month have been flagged for "archive consolidation" — which is jargon for removal. The records show aurora pattern anomalies that should be studied, but someone ordered them sealed. "The orders came through the contamination monitor, but they're not medical. They're not safety protocols. They're intentional suppression of what the skies are showing." The archivist is appalled: "Our job is to record truth. This is erasing it."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Archivist revealed authorized celestial record suppression', `aurora-archive-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The archive staff refuses access. "Archive records are restricted. Inquiries require administrative authorization." Your attempt to probe the records has been flagged as a potential security concern.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Archive staff alerted to record inquiry', `aurora-archive-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You access recent archive logs. Several celestial observation entries show signs of being relocated or marked for removal. The pattern suggests deliberate curation, though the authorization trail is obscured.`;
        addJournal('investigation', 'Archive records show signs of deliberate curation', `aurora-archive-curated-${G.dayCount}`);
      } else {
        G.lastResult = `The archives are deep and cataloged. Recent entries are accessible, but you can't determine whether they've been tampered with without specialist knowledge.`;
        addJournal('investigation', 'Archive records accessed but tampering unclear', `aurora-archive-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. RESOURCE ALLOCATOR: SUPPLY DIVERSION
  {
    label: "Interview the resource allocator about recent distribution patterns — are survival supplies being redirected to specific locations, and at what cost to general population needs?",
    tags: ['Investigation', 'NPC', 'Logistics', 'Survival', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading distribution pressure');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The resource allocator (Thass) is sick of the secrecy. Food preservation supplies — the critical ones that ensure colony survival through hard seasons — are being allocated to a sealed section of the dome. Not transparently. Not with public rationale. Just taken out of general circulation and assigned to what they call "containment research." When Thass questioned it, they were told: "Don't ask about it. You're not cleared." Survival is being weaponized against the population that depends on it.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Allocator revealed unauthorized supply redirection to sealed zone', `aurora-allocator-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The resource allocator becomes guarded immediately. "Supply allocation is administrative security. I don't discuss patterns with civilians." The allocation system will now resist inquiry.`;
        addJournal('complication', 'Resource allocator refusing future cooperation', `aurora-allocator-silent-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The allocator admits that recent distributions have been unusual. Some supplies are being directed to specific areas, though they won't elaborate on which areas or why. The pattern is real but explanation is denied.`;
        addJournal('investigation', 'Allocator confirmed unusual distribution patterns', `aurora-allocator-unusual-${G.dayCount}`);
      } else {
        G.lastResult = `The allocator gives standard answers about maintaining balance and conservation. No specific pattern emerges from the conversation.`;
        addJournal('investigation', 'Resource allocation patterns inconclusive', `aurora-allocator-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. REPAIR COORDINATOR: MAINTENANCE DELAYS SYSTEMATIC
  {
    label: "Track the repair work order queue with the repair coordinator — are critical repairs being delayed, deprioritized, or systematically blocked?",
    tags: ['Investigation', 'NPC', 'Maintenance', 'Integrity', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing maintenance sabotage');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The repair coordinator (Yani) hands you the work order queue. Several critical repairs have been flagged as "under review" for weeks — far longer than normal assessment periods. The orders show dome structural stress that needs immediate attention. But they're stuck. When Yani followed up, they were told to stop asking. "Someone is deliberately slowing dome maintenance. If we don't get those repairs through, we'll have cascade failures. The dome will start to fail, and when it does, they can blame it on 'structural age' instead of what it really is: intentional neglect."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Coordinator mapped systematic repair blocking pattern', `aurora-coordinator-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The coordinator refuses to hand over work orders. "Those are confidential. You can't have access to active maintenance logs." The repair coordination system is now closed to you.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Repair coordinator blocking access to work logs', `aurora-coordinator-blocked-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You gain access to partial work order data. Several repairs show extended review periods, which is unusual. The pattern suggests deliberate delay rather than normal bureaucratic slow-down.`;
        addJournal('investigation', 'Work orders show signs of unusual delay patterns', `aurora-coordinator-delayed-${G.dayCount}`);
      } else {
        G.lastResult = `Work orders are complex and heavily documented. You can see repairs are happening, but whether the delays are intentional or normal is unclear from this view.`;
        addJournal('investigation', 'Repair queue patterns inconclusive', `aurora-coordinator-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. CELESTIAL OBSERVER: AURORA PATTERNS CORRUPTED
  {
    label: "Speak with the celestial observer about recent sky changes — are the auroras showing unusual patterns, or is something about the contamination seepage behavior different?",
    tags: ['Investigation', 'NPC', 'Celestial', 'Phenomenon', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading celestial corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The celestial observer (Corvus) is disturbed. The aurora patterns have become chaotic. They used to follow a predictable cycle — the dome's interaction with the contamination field created stable, readable patterns. But recent nights have shown instability. The contamination field is destabilizing as if something is actively disrupting it. "Either the contamination itself is changing, or someone is manipulating the containment field to let it seep differently. Either way, what we're seeing is unnatural. Something is wrong with the barrier between inside and outside."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Observer revealed intentional contamination field destabilization', `aurora-observer-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The observer is protective of their research. "Celestial observation is technical work. Your questions are amateur." They refuse further conversation and file a note about the interruption.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Celestial observer reported inquiry to administration', `aurora-observer-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The observer mentions recent aurora readings have been unusual. They're not fully certain whether this is natural variation or something else, but the patterns are definitely different from historical records.`;
        addJournal('investigation', 'Observer confirmed unusual recent aurora patterns', `aurora-observer-patterns-${G.dayCount}`);
      } else {
        G.lastResult = `The observer discusses celestial phenomena in technical terms. The aurora patterns are complex, and you can't determine whether the changes are significant or normal variation.`;
        addJournal('investigation', 'Celestial observation data too complex to interpret', `aurora-observer-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. CONTAMINATION MONITOR: SEEPAGE ALLOWED DELIBERATELY
  {
    label: "Confront the contamination monitor about barrier integrity — have containment protocols been modified, or are seepage events being permitted?",
    tags: ['Investigation', 'NPC', 'Contamination', 'Safety', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading containment sabotage');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The contamination monitor (Kael) looks exhausted and defeated. The barrier protocols have been changed. Seepage that should trigger emergency lockdown is now being rerouted to specific containment cells — deliberately. When Kael reported this as a safety violation, they were told the new protocols were "authorized at higher levels." They suspect someone is collecting contamination samples, or testing exposure limits, or weaponizing the barrier itself. "If that containment fails, everything fails. But I'm being told to record the breaches and do nothing."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Monitor revealed authorized barrier protocol sabotage', `aurora-monitor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The contamination monitor refuses to discuss barrier protocols with outsiders. "Safety information is restricted. Stop asking questions about the dome's integrity." The monitor will report your questions.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Contamination monitor flagged your inquiry as security threat', `aurora-monitor-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You access partial contamination data. Recent seepage events show unusual patterns — some show rapid containment, others show extended exposure before response. The inconsistency suggests modified protocols.`;
        addJournal('investigation', 'Contamination records show inconsistent response protocols', `aurora-monitor-inconsistent-${G.dayCount}`);
      } else {
        G.lastResult = `Contamination records are detailed but heavily secured. You can see that events are being monitored, but you can't determine whether protocols have been changed.`;
        addJournal('investigation', 'Contamination protocols inaccessible for full analysis', `aurora-monitor-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. RELAY KEEPER: COMMUNICATION MONITORING
  {
    label: "Investigate the relay system with the relay keeper — are outbound messages being filtered, or are communications to external communes being monitored?",
    tags: ['Investigation', 'NPC', 'Communications', 'Information', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'uncovering communications control');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The relay keeper (Nox) is tired of the secrecy. They've been instructed to route certain message types through a separate relay system. Messages about dome maintenance, resource allocation, and contamination seepage are being intercepted before they reach external communes. "Someone's trying to keep the other communes from knowing what's happening here. We're supposed to be coordinated — we're supposed to help each other if one commune fails. But someone is cutting off that communication. Why? Unless they want Aurora Crown to fail without outside help."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Relay keeper revealed message filtering to external communes', `aurora-keeper-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The relay keeper becomes instantly defensive. "I can't discuss relay operations with civilians. That's communication security." They report the inquiry immediately.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Relay keeper reported your communication inquiry', `aurora-keeper-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The relay keeper admits that message routing has been reorganized, but won't explain the reason. "It's above my level," they deflect. Something about the system has definitely changed.`;
        addJournal('investigation', 'Relay keeper confirmed message system reorganization', `aurora-keeper-reorganized-${G.dayCount}`);
      } else {
        G.lastResult = `The relay keeper gives technical responses about message routing. No specific pattern of interference emerges.`;
        addJournal('investigation', 'Relay operations inquiry inconclusive', `aurora-keeper-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. SURVIVAL PLANNER: CONTINGENCY PROTOCOLS ABANDONED
  {
    label: "Meet with the survival planner to review emergency protocols — have evacuation procedures been changed, or are survival contingencies being removed?",
    tags: ['Investigation', 'NPC', 'Emergency', 'Protocol', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'mapping emergency system sabotage');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The survival planner (Seer) shows you the emergency protocol documentation. Recent revisions have removed contingency procedures. If the dome fails catastrophically, there's no evacuation plan anymore. If contamination breaches critically, there's no bunker access. The revised protocols seem to assume failure is not survivable — so why plan for survival? "I asked why the contingencies were removed. The answer was: 'They're no longer necessary.' That's not administrative logic. That's someone ensuring that if the dome fails, we fail with it. There's no escape prepared."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Survival planner revealed deliberate evacuation protocol removal', `aurora-planner-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The survival planner is hostile to scrutiny. "Evacuation protocols are confidential operational security. You're not authorized to review them." The emergency systems are now locked against inquiry.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Survival planner blocking protocol access', `aurora-planner-blocked-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You access emergency protocol documentation. Recent revisions show changes to evacuation procedures, though the specific modifications require deeper analysis to fully understand.`;
        addJournal('investigation', 'Emergency protocols show recent revision patterns', `aurora-planner-revised-${G.dayCount}`);
      } else {
        G.lastResult = `Emergency protocols are complex. You can see they exist, but determining whether contingencies have been removed requires detailed comparison to historical versions.`;
        addJournal('investigation', 'Emergency protocol analysis incomplete', `aurora-planner-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. LORE/INVESTIGATION TIER 1: DOME STRUCTURAL ANALYSIS
  {
    label: "Read the dome's structural history and engineering — have stress points been deliberately left unrepaired, or is the dome's integrity being compromised through design?",
    tags: ['Investigation', 'Lore', 'Structure', 'Engineering', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'structural vulnerability mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The dome's structural records reveal intentional engineering. Load-bearing sections show signs of deliberate stress allocation — weight distribution that could have been better designed is instead routed through specific points. These stress concentrations should have been caught in inspection. They were caught. The inspection reports exist. But no repairs were authorized. The dome is being held together by careful balance and overdue maintenance. If that balance shifts even slightly, cascade failure becomes inevitable.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Structural analysis revealed intentional stress point concentration', `aurora-structure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your attempt to analyze the dome's structural records triggers an alarm. Structural integrity data is protected. You're stopped and questioned about your interest in dome vulnerabilities.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Structural data access triggered security review', `aurora-structure-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The structural records show that some stress points have not been repaired despite appearing in maintenance logs repeatedly. The pattern suggests deliberate negligence rather than resource shortage.`;
        addJournal('investigation', 'Structural analysis confirmed unrepairable stress point pattern', `aurora-structure-neglect-${G.dayCount}`);
      } else {
        G.lastResult = `The dome's structural documentation is extensive and technical. You can see that repairs are ongoing, but whether specific stress points are being deliberately left unrepaired requires specialist expertise.`;
        addJournal('investigation', 'Structural engineering analysis inconclusive', `aurora-structure-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. CRAFT/INVESTIGATION TIER 2: CONTAMINATION BARRIER MODIFICATION
  {
    label: "Examine the contamination barrier's construction — have barrier components been altered or substituted with inferior materials?",
    tags: ['Investigation', 'Craft', 'Barrier', 'Materials', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing material sabotage');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The barrier materials tell a story of deliberate substitution. Components that should be protective-grade have been replaced with cheaper equivalents that look identical but degrade faster under contamination stress. The substitutions are subtle — they pass visual inspection — but under stress analysis, they fail catastrophically faster than spec. Someone with access to the barrier construction has been systematically replacing protective materials with degrading ones. The barrier will hold until it suddenly won't.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Material analysis revealed systematic barrier component degradation', `aurora-barrier-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you probe the barrier's construction, you trigger a contamination alarm. The barrier responds defensively. You're exposed to seepage pressure and forced to retreat. Your material investigation has been noticed.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Barrier alarm triggered by material inspection attempt', `aurora-barrier-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You examine barrier components and notice some materials show signs of unusual wear patterns. The degradation suggests the materials may not be meeting specification, though proof requires laboratory analysis.`;
        addJournal('investigation', 'Barrier materials show unusual degradation patterns', `aurora-barrier-degraded-${G.dayCount}`);
      } else {
        G.lastResult = `The barrier materials appear intact. Whether specific components have been compromised requires tools and access beyond what you currently have.`;
        addJournal('investigation', 'Barrier material examination incomplete', `aurora-barrier-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. SURVIVAL TIER 1: RESOURCE SUSTAINABILITY CALCULATIONS
  {
    label: "Calculate resource sustainability with available data — at current consumption rates, how long can Aurora Crown survive, and are supplies actually being depleted as reported?",
    tags: ['Investigation', 'Survival', 'Economics', 'Resources', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'resource sustainability analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Resource calculations reveal a problem. On current consumption rates and supply projections, Aurora Crown has sufficient resources for 18 months of normal operations. But supplies are being consumed at a rate that would only support 6 months. The difference is dramatic. Someone is consuming resources outside the normal population distribution. Either a massive hidden population exists, or resources are being diverted to non-survival purposes. Either way, the commune is being systematically starved.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Sustainability analysis revealed accelerated resource consumption', `aurora-survival-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your calculations are thorough but draw attention. Administrative review notices your resource analysis and questions why you're tracking population sustainability metrics.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Resource calculation drew administrative scrutiny', `aurora-survival-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Your resource calculations show that current supplies are being consumed slightly faster than official consumption estimates suggest. The discrepancy is noticeable but could be explained by normal variation or underestimation of population needs.`;
        addJournal('investigation', 'Sustainability analysis showed minor consumption variance', `aurora-survival-variance-${G.dayCount}`);
      } else {
        G.lastResult = `Resource calculations are complex and depend on population estimates that may themselves be unreliable. Your analysis is inconclusive.`;
        addJournal('investigation', 'Sustainability calculations inconclusive', `aurora-survival-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. PERSUASION TIER 2: COLLECTIVE CONSENT MANUFACTURED
  {
    label: "Investigate how silence is being maintained — who is being coerced into complicity, and what consequences are threatened against those who speak?",
    tags: ['Investigation', 'Persuasion', 'Coercion', 'Silence', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'mapping coercion network');
      G.stageProgress[1]++;

      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Through careful listening, a pattern emerges. People are afraid to speak about dome failures, resource shortages, or contamination seepage because they fear reassignment to worse work, loss of ration allocations, or separation from their families. Someone is weaponizing administrative power. The threats are subtle and indirect — no overt violence, but the consequences of speaking are immediate and devastating. Everyone knows someone who spoke and was reassigned. Everyone knows rations can be adjusted by administrative decision. The commune is being held in silence through collective fear.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Coercion analysis mapped fear-based compliance network', `aurora-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your questions about coercion and compliance make people extremely nervous. Word spreads that you're asking about administrative retaliation. Multiple people distance themselves from you, afraid that association with your inquiry could be dangerous.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Population distancing from you due to coercion inquiry', `aurora-coercion-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `People admit to being careful about speaking publicly. They acknowledge fear of administrative consequences, though most refuse to specify exactly what they're afraid of.`;
        addJournal('investigation', 'General fear-based compliance confirmed by population interviews', `aurora-coercion-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `People are guarded about discussing coercion. You sense fear exists but can't map its specific mechanisms.`;
        addJournal('investigation', 'Coercion patterns sensed but not fully documented', `aurora-coercion-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. INSIGHT TIER 1: PSYCHOLOGICAL PRESSURE DOCUMENTED
  {
    label: "Study the psychological state of the commune — are people showing signs of collective trauma, learned helplessness, or systematic demoralization?",
    tags: ['Investigation', 'Insight', 'Psychology', 'Pressure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'psychological pressure analysis');
      G.stageProgress[1]++;

      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The psychological deterioration of Aurora Crown is visible. People move quietly and carefully. They avoid eye contact. Long-term residents show signs of fatigue beyond normal survival work — this is psychological exhaustion. The commons spaces that used to host community gatherings are now empty. People isolate. When questioned about the future, responses are uniformly hopeless. "The dome will fail," they say with certainty. "There's no way out." This is not observation; this is manufactured hopelessness. Someone is psychologically breaking the commune's will to resist.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Psychological analysis revealed systematic demoralization campaign', `aurora-psychology-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your questions about psychological state make people deeply uncomfortable. They view your inquiry as invasive or diagnostic, implying they're unstable. Several people report your questions as concerning behavior.`;
        G.worldClocks.distance++;
        addJournal('complication', 'Population reports your psychological inquiry as suspicious', `aurora-psychology-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You observe that people seem unusually withdrawn and anxious. Their hope about the future seems diminished compared to what would be normal for a survival community.`;
        addJournal('investigation', 'Psychological pressure observed but causes unclear', `aurora-psychology-pressure-${G.dayCount}`);
      } else {
        G.lastResult = `People are stressed, but that's normal in a survival context. Whether the stress is disproportionate or deliberately engineered is unclear.`;
        addJournal('investigation', 'Psychological state assessment inconclusive', `aurora-psychology-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. PERCEPTION TIER 2: ADMINISTRATIVE COORDINATION DISCOVERED
  {
    label: "Map the administrative hierarchy — who is giving orders, and are they coordinating with external forces beyond Aurora Crown?",
    tags: ['Investigation', 'Perception', 'Administration', 'Hierarchy', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering administrative conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('perception', (G.skills.perception || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The administrative hierarchy reveals coordination beyond Aurora Crown's borders. The maintenance chief takes orders from the contamination monitor. The contamination monitor receives directives from the survival planner. The survival planner's decisions align perfectly with external pressure that appears to come through the relay system. Following the chain outward, orders are coming from someone outside Aurora Crown — someone with authority to override local administrators and issue commands that sabotage the dome's integrity. The conspiracy has external direction.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Administrative mapping revealed external coordination of local sabotage', `aurora-admin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your mapping of administrative hierarchy draws the attention of the administration itself. You're questioned about why you're tracking organizational structure and authority chains.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Administrative hierarchy mapping drew direct attention', `aurora-admin-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You trace the administrative chain and notice that certain decisions seem coordinated with external communications. Whether this represents normal inter-commune coordination or something more sinister is unclear.`;
        addJournal('investigation', 'Administrative hierarchy shows external coordination patterns', `aurora-admin-coordinated-${G.dayCount}`);
      } else {
        G.lastResult = `The administrative hierarchy is complex. You can see that decisions flow downward, but determining whether external coordination exists requires more detailed analysis.`;
        addJournal('investigation', 'Administrative hierarchy mapping incomplete', `aurora-admin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 15. STREET RUMOR: SURVIVAL ANXIETIES
  {
    label: "Gather whispered concerns in the maintenance commons — what are workers whispering about the dome's real condition?",
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

      G.lastResult = `The worker whisper is: "${selected}." It's repeated quietly in breakroom conversations, in maintenance rotation handoffs, in sealed compartments where private talk happens. The rumor itself is fragmented — no one knows the full story — but the collective anxiety is tangible. Aurora Crown's workers know something is deeply wrong, even if they can't articulate exactly what.`;
      addJournal('investigation', `Street rumor gathered: "${selected}"`, `aurora-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. INSTITUTIONAL CRACK: PROOF OF SYSTEMATIC SABOTAGE
  {
    label: "Compile the contradiction between stated dome policies and actual maintenance practices — find proof that Aurora Crown's safety systems are being actively undermined.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Systematic', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing systemic sabotage conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `You piece together documents: maintenance policies requiring critical repairs are contradicted by work order freezes. Contamination protocols specify barrier integrity requirements that are deliberately violated by redirected seepage. Emergency protocols guarantee evacuation procedures that have been officially removed. Resource allocations state survival-first priorities while resources are systematically diverted. Individual pieces could be explained. But together they form undeniable proof of coordination. Someone with authority over multiple systems has deliberately modified Aurora Crown's safety architecture to enable catastrophic failure. This is conspiracy, not accident.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Systemic sabotage documentation compiled', `aurora-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you compile evidence, you're intercepted. The conspiracy is aware your investigation is connecting pieces that weren't meant to be connected. You're warned off through channels that make your danger clear. The evidence remains incomplete, and now you're marked.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation directly noticed by conspiracy operators', `aurora-proof-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `You find enough contradictions between stated policies and documented practices to suggest intentional sabotage. It's compelling enough to shift understanding from "something's wrong" to "something is being done."`;
        addJournal('investigation', 'Compelling contradiction evidence found', `aurora-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `Individual pieces of evidence exist, but without connecting them all, you can't distinguish between poor administration and deliberate sabotage. The pattern remains incomplete.`;
        addJournal('investigation', 'Evidence fragments found but incomplete', `aurora-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. MORAL PRESSURE: COMPLICITY OR RESISTANCE CHOICE
  {
    label: "Confront a complicit administrator who is participating in sabotage — demand explanation and decide whether to protect them or expose them.",
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

      G.lastResult = `You confront ${npc.name}. They crumble under pressure. "${npc.fear}" They're afraid, complicit, and trapped. You must decide: Do you expose them to pressure the system into stopping the sabotage? Do you protect them and maintain your investigation quietly? Your choice determines whether this person becomes an enemy or an ally — and whether Aurora Crown's people begin to resist or sink deeper into complicity.`;

      G.moralChoice = {
        protect: `Offer to shield ${npc.name} if they provide information. Build an informant. Risk becoming complicit yourself.`,
        expose: `Report ${npc.name}'s complicity. Pressure the system. But you'll have made an enemy who might warn the conspiracy.`
      };

      addJournal('moral-choice', `Confronted ${npc.name} (${npc.role}) about complicity in sabotage`, `aurora-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. DISCOVERY MOMENT: WRONGNESS CONFIRMED AND ORIGIN REVEALED
  {
    label: "Find the central evidence that confirms the sabotage — discover the origin source directing Aurora Crown's destruction from outside the commune.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of dome sabotage');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + (G.skills.lore || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Behind the modified maintenance protocols, the redirected resources, the corrupted barrier protocols — you find the thread that leads out of Aurora Crown. A correspondence hidden in the relay system, in trade-marked canisters that come from Sunspire Haven. Orders sent from an external authority, directing the contamination monitor and the survival planner. Aurora Crown is being deliberately destroyed from outside. Someone beyond the commune — someone in a connected locality or regional authority — is orchestrating the dome's sabotage. They're not trying to save the commune; they're trying to collapse it strategically. And the conspiracy has only just begun its acceleration.`;
        G.stageProgress[1]++;
        addJournal('major-discovery', 'Origin source of Aurora Crown sabotage identified as external coordination', `aurora-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach the central evidence, you're intercepted. The conspiracy is aware of your investigation and moves to stop you. You're cornered, threatened, and forced to flee. You've discovered pieces, but the full origin remains hidden — and now you're marked as a direct threat to whoever's orchestrating this.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation interrupted by conspiracy operators', `aurora-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points beyond Aurora Crown. Messages reference "external interests" and "broader strategy." The conspiracy is larger than the commune itself. You don't know the exact source yet, but you know Aurora Crown is under siege by an external force coordinating its destruction.`;
        addJournal('major-discovery', 'External coordination of Aurora Crown sabotage confirmed', `aurora-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `You find pieces of evidence suggesting coordination, but the origin source remains obscured. Whoever's orchestrating this has hidden their hand carefully behind layers of intermediaries.`;
        addJournal('investigation', 'External coordination suspected but source not yet identified', `aurora-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. SECOND-ORDER EVIDENCE: PATTERN RECOGNITION ACROSS SYSTEMS
  {
    label: "Recognize the pattern connecting dome failures, resource loss, and contamination — understand that all systems are being attacked simultaneously by design.",
    tags: ['Investigation', 'Pattern', 'Analysis', 'Connection', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'recognizing systematic collapse pattern');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The pattern becomes undeniable. The dome is being weakened through structural neglect and modified maintenance. Resources are being diverted through supply redirection. Contamination seepage is being allowed and redirected. These aren't separate failures — they're coordinated attacks on the system's integrity. When combined, they create a cascade: contamination seeps through the weakened barrier, resources are insufficient for repairs, maintenance is prevented from fixing the dome, and the population becomes psychologically broken through manufactured hopelessness. It's a system designed to collapse. Every failure amplifies the others. Someone has engineered Aurora Crown's total breakdown.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Systems analysis revealed coordinated collapse engineering', `aurora-pattern-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you compile the pattern analysis, someone notices. Security questions why you're developing comprehensive system collapse models.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Your pattern analysis drew security scrutiny', `aurora-pattern-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You recognize connections between the separate system failures. They don't appear independent; they seem designed to amplify each other.`;
        addJournal('investigation', 'System failure connections mapped', `aurora-pattern-connected-${G.dayCount}`);
      } else {
        G.lastResult = `The failures appear to be separate issues, though they may be related in ways you can't yet see.`;
        addJournal('investigation', 'System pattern analysis inconclusive', `aurora-pattern-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. FINAL CONFRONTATION: UNDERSTANDING THE WRONGNESS
  {
    label: "Synthesize all evidence into complete understanding — Aurora Crown is being systematically destroyed by external forces for a purpose beyond simple domination.",
    tags: ['Investigation', 'Synthesis', 'Understanding', 'Purpose', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'achieving systemic wrongness understanding');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + (G.skills.lore || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Everything connects. The dome is being weakened deliberately. Resources are being diverted deliberately. Contamination is being weaponized deliberately. The population is being broken deliberately. Someone is not just attacking Aurora Crown — they're testing it. Seeing how much pressure a survival commune can withstand. How much psychological breaking is possible. How long it takes for a population to lose hope. The commune is an experiment in collapse. And the external force directing it is learning the answers. This knowledge will be used elsewhere. Aurora Crown isn't a target; it's a laboratory. The real attack is just beginning.`;
        G.stageProgress[1]++;
        addJournal('major-discovery', 'Aurora Crown understood as experimental laboratory for systematic collapse engineering', `aurora-understanding-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach full understanding, you're stopped. Someone doesn't want you to complete this synthesis. You're confronted and threatened. Your investigation has endangered something important to someone.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Final understanding synthesis blocked by direct threat', `aurora-understanding-stopped-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points toward a coordinated external assault being used to study how communities break under systematic pressure. You don't have complete certainty, but the pattern is compelling.`;
        addJournal('major-discovery', 'External experimental pressure testing of Aurora Crown suspected', `aurora-understanding-experimental-${G.dayCount}`);
      } else {
        G.lastResult = `You have pieces of understanding, but the full picture remains partially obscured. The purpose behind the attack eludes you still.`;
        addJournal('investigation', 'Systemic purpose not yet fully revealed', `aurora-understanding-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  }
];
window.AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES = AURORA_CROWN_COMMUNE_STAGE1_ENRICHED_CHOICES;
