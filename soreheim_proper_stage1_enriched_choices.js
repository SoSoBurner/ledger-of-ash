/**
 * SOREHEIM PROPER STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to labor tensions and quota systems
 * Generated for: Community autonomy vs merchant control, craft integrity vs production quota, quota manipulation and worker displacement
 * Each choice: 65-80 XP, grounded in shift work and industrial pressure, layered wrongness reveal
 */

const SOREHEIM_PROPER_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. FOREMAN: QUOTA ESCALATION PATTERN
  {
    label: "Ask the shift foreman about recent quota changes — are targets increasing unnaturally, and has pressure from above intensified?",
    tags: ['Investigation', 'NPC', 'Labor', 'Pressure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading labor pressure patterns');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Foreman Thrace pulls you aside during shift change. "I've been running the quarries for fifteen years. Quotas used to flex with seasons and supply. Six weeks ago, they locked in. Doubled. No negotiation. Anyone who can't meet the new targets is replaced. Three workers gone already. This isn't management — this is systematic displacement. Someone's clearing out the workforce."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Foreman revealed coordinated quota escalation', `soreheim-foreman-quotas-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The foreman becomes defensive. "You asking about quotas? That's sensitive business. Maybe you should talk to the quota clerk instead of digging around here." He returns to work, and word spreads that you're asking pointed questions about labor conditions.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Foreman now wary of your inquiries', `soreheim-foreman-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The foreman admits quotas have increased recently and turnover is higher than usual. "Just trying to keep up with demands," he says, but his jaw is tight. Something about the pressure feels artificial.`;
        addJournal('investigation', 'Foreman confirmed quota increase and worker turnover', `soreheim-foreman-pressure-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. QUOTA CLERK: LEDGER MANIPULATION
  {
    label: "Access the quota records at the shift yard — examine whether quota targets are being artificially inflated or records are being altered after the fact.",
    tags: ['Investigation', 'NPC', 'Records', 'Bureaucracy', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering quota manipulation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The quota clerk (Serin) is terrified but provides the records. The entries show impossible targets — quotas increased beyond what the quarry workforce could produce even with perfect conditions. But here's the wrongness: when targets aren't met, the records are edited to show performance was worse than it actually was. "Justifying the replacement of workers," Serin whispers. "The numbers are being manipulated both ways. Setting targets high, then making the failure worse than reality. It's a purge disguised as economic management."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Clerk revealed two-level quota manipulation system', `soreheim-clerk-manipulation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The clerk refuses access to sensitive records and reports your inquiry to the labor coordinator. You're now flagged as attempting to breach labor administration. Management will be watching.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Labor coordinator now investigating your inquiry', `soreheim-clerk-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The records show quota increases and worker replacements. Some entries appear hastily written or corrected. The pattern suggests deliberate record manipulation, though you can't prove the exact mechanism yet.`;
        addJournal('investigation', 'Quota records show signs of alteration', `soreheim-clerk-altered-${G.dayCount}`);
      } else {
        G.lastResult = `The quota clerk is evasive about showing records. "Those are management documents." Without higher authority, you can't access them.`;
        addJournal('investigation', 'Quota records blocked without management authorization', `soreheim-clerk-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. MACHINERY SPECIALIST: EQUIPMENT SABOTAGE
  {
    label: "Consult with machinery repair workers — are tools breaking down more frequently, and is maintenance being deliberately delayed?",
    tags: ['Investigation', 'NPC', 'Craft', 'Equipment', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading equipment sabotage patterns');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Master mechanic Halden confides in you. "The tools shouldn't fail this often. I've been servicing the quarry equipment for a decade. Something's changed in how repairs are being handled — deliberately slowed down. A pulley that should take a day to repair now takes three days. Spare parts that used to be available are suddenly 'delayed from suppliers.' Workers are breaking down, meeting impossible quotas with broken equipment. This is calculated." He's certain: "Someone's engineering failure into the system."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Mechanic revealed deliberate equipment degradation', `soreheim-mechanic-sabotage-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The mechanic becomes curt. "Equipment maintenance is internal business. I don't discuss it with outsiders." He turns back to his tools. The workshop is now unwelcoming.`;
        addJournal('complication', 'Mechanic refuses future equipment inquiry', `soreheim-mechanic-silent-${G.dayCount}`);
      } else {
        G.lastResult = `The mechanic mentions equipment failures have increased lately. "Parts availability has been spotty," he notes. Something's disrupting the normal flow of repairs and maintenance.`;
        addJournal('investigation', 'Mechanic confirmed increased equipment failures', `soreheim-mechanic-failures-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. REPAIR WORKER: WORKPLACE ACCIDENTS
  {
    label: "Interview workers about recent accidents and injuries — are accidents increasing, and is safety protocol being ignored?",
    tags: ['Investigation', 'NPC', 'Safety', 'Labor', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering workplace endangerment');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Repair worker Eldis shows you scars from a recent injury. "Three accidents in the past month. Usually, we have one every season. Safety protocols aren't being followed anymore — workers are pushed to ignore caution because quotas demand speed. A woman lost two fingers last week. The shift coordinator said if she complained to the external labor committee, she'd be replaced before her hand healed." He's angry and frightened: "They're trading worker safety for numbers. And anyone who objects disappears into the replacement roster."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Worker revealed coordinated safety protocol neglect', `soreheim-repair-safety-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The worker clams up. "Talking about workplace accidents gets you watched. I need this job." He walks away, and you notice other workers becoming noticeably cautious around you.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Workers now see you as a potential threat to their employment', `soreheim-repair-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The worker admits accidents have been frequent lately and safety concerns aren't being addressed. "Just trying to survive," he says quietly. The workplace pressure is real.`;
        addJournal('investigation', 'Worker confirmed increased accidents and ignored safety', `soreheim-repair-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The worker is guarded about discussing workplace injuries. You sense tension but can't document specifics.`;
        addJournal('investigation', 'Workplace injury information inaccessible without worker trust', `soreheim-repair-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. SHRINE HELPER: FAITH UNDER PRESSURE
  {
    label: "Consult with shrine workers about community morale — are more people seeking blessings, and what are they praying for?",
    tags: ['Investigation', 'NPC', 'Faith', 'Community', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading spiritual pressure patterns');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Shrine helper Kestra speaks with genuine concern. "The prayers have changed. Used to be gratitude for harvests, requests for travel safety. Now? Fear. People come asking for protection from being laid off. Asking that their families survive. The desperation is new. And they're afraid — they whisper prayers like someone might be listening and judging them for doubt. Soreheim Proper is spiritually compressed. The workforce knows something's being done to them, but they don't know what."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Shrine worker revealed spiritual crisis in community', `soreheim-shrine-crisis-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The shrine worker becomes protective of sacred space. "Confessions and prayers are meant to be private with the divine. Your questions here aren't welcome." The shrine is now guarded against your inquiry.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine now hostile to external questioning', `soreheim-shrine-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The shrine worker admits more people have been seeking blessings lately, with more urgent prayers. The community is under strain.`;
        addJournal('investigation', 'Shrine worker confirmed increased prayer volume and desperation', `soreheim-shrine-strain-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. BROKER/MERCHANT: DISPLACEMENT PIPELINE
  {
    label: "Question labor brokers about recent personnel transfers — who's being hired into Soreheim from outside, and where are displaced workers going?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Movement', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'mapping labor displacement flows');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Labor broker Meth is initially guarded but eventually speaks. "There's a pattern. Workers get replaced, and they disappear into other localities — Sunspire Haven, outlying territories. But new workers arrive from nowhere with better survival skills but no attachment to Soreheim. It's like someone's deliberately rotating the workforce. The displaced ones? They're scattered so they can't organize. And the new ones? They're grateful to have work, so they don't question the conditions." He lowers his voice: "This is orchestrated. Someone's rebuilding Soreheim's workforce from scratch."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Broker mapped deliberate workforce displacement network', `soreheim-broker-displacement-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The broker becomes suspicious. "You're asking too many questions about labor flows. That's sensitive business. Back off." His warning is pointed. Word will spread through the brokerage network about your inquiry.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Labor brokers now aware of your investigation', `soreheim-broker-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The broker admits personnel transfers happen regularly but claims it's normal seasonal variation. His tone lacks conviction.`;
        addJournal('investigation', 'Broker confirmed workforce transfers but minimized their scale', `soreheim-broker-evasive-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. RECORD KEEPER: DOCUMENTATION FALSIFICATION
  {
    label: "Access worker records and employment histories — are documents being altered, or are workers being erased from official records?",
    tags: ['Investigation', 'NPC', 'Records', 'Documentation', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering documentation erasure');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The record keeper (Parol) is conflicted but gives you access. Worker records show employment histories that end abruptly. Not marked as terminated — just ending. Some workers appear twice in the records under different names. Dates have been altered. "Someone's cleaning the records," Parol admits. "Erasing the ones who left or were forced out. Making it look like they never worked here. I was ordered to not question the erasures. It's like entire people are being removed from Soreheim's official history."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Record keeper revealed systematic worker documentation erasure', `soreheim-records-erasure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The record keeper refuses access entirely and reports your inquiry to labor administration. You're now flagged as attempting to breach employment records. The authorities will be investigating your motives.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Labor authorities now investigating your records inquiry', `soreheim-records-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You find inconsistencies in worker records — some entries appear altered, some workers seem to have disappeared from official documentation. The pattern suggests deliberate modification, though the full scope is unclear.`;
        addJournal('investigation', 'Worker records show signs of deliberate alteration', `soreheim-records-altered-${G.dayCount}`);
      } else {
        G.lastResult = `The record keeper is protective of employment documentation. Access is restricted without management authorization.`;
        addJournal('investigation', 'Employment records blocked without labor administration approval', `soreheim-records-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. ARTISAN/CRAFTSPERSON: SKILL DEGRADATION
  {
    label: "Speak with skilled craftspeople about changes to their work standards — are they being asked to lower quality, or are expertise requirements being ignored?",
    tags: ['Investigation', 'NPC', 'Craft', 'Integrity', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'reading craft standard erosion');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Master craftsperson Aldren is visibly troubled. "I've worked stone for forty years. You learn to do it right — safe, precise, lasting. But now? Speed over safety. Volume over quality. They're putting untrained workers in master positions because they work fast and don't ask questions. I tried to protest the quality degradation. I was demoted. Three younger crafters tried to maintain standards — they're gone now. Replaced by workers who don't know enough to care that what they're making will fail." He's angry and grieving: "Soreheim's craft heritage is being deliberately destroyed from above."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Craftsperson revealed deliberate quality and expertise destruction', `soreheim-craft-degradation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The craftsperson becomes defensive. "My work speaks for itself. I don't need to discuss it with strangers." They turn away, and you notice fellow craftspeople becoming notably guarded around you.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Craftspeople now wary of external scrutiny', `soreheim-craft-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The craftsperson admits quality standards have been compromised lately. "Quotas prioritize speed," they note with clear frustration. The tension between quality and output is real.`;
        addJournal('investigation', 'Craftsperson confirmed craft standard compromise', `soreheim-craft-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The craftsperson is guarded about work standards. You sense dissatisfaction but can't extract specifics.`;
        addJournal('investigation', 'Craft standard information inaccessible without deeper rapport', `soreheim-craft-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. LABOR ANALYSIS TIER 1: WORKFORCE RESTRUCTURING
  {
    label: "Analyze the demographic and skill composition of Soreheim's workforce — who's arriving, who's disappearing, and what skills are being eliminated?",
    tags: ['Investigation', 'Labor', 'Analysis', 'Pattern', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'workforce composition analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The workforce has been systematically transformed. Experienced workers are being replaced with younger, less-skilled labor. Decision-makers are being replaced with workers who follow orders without questioning. The diversified skills that made Soreheim resilient are being concentrated into fewer hands. This restructuring would normally take years through natural attrition — but it's happening in weeks. Someone's accelerating the process deliberately. The new workforce is more compliant, less capable of resistance, and dependent on management for direction.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Labor analysis revealed deliberate workforce composition restructuring', `soreheim-workforce-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your detailed analysis of workforce composition draws attention from labor administration. You're questioned about your interest in employment demographics. Your investigation is now flagged as unauthorized labor scrutiny.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Labor administration alerted to workforce analysis inquiry', `soreheim-workforce-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The workforce shows signs of recent turnover. The demographic composition has shifted, though the full pattern of change is difficult to map without official access.`;
        addJournal('investigation', 'Workforce composition changes detected but incomplete data', `soreheim-workforce-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. PRODUCTION ANALYSIS TIER 2: QUOTA SYSTEM MECHANICS
  {
    label: "Study the underlying mechanics of the quota system — who's setting targets, by what methodology, and how are success/failure measured?",
    tags: ['Investigation', 'Systems', 'Economics', 'Control', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing quota system architecture');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The quota system is mathematically rigged. Targets are calculated to be just barely achievable by a workforce operating at full capacity with perfect conditions — then they're incrementally increased. Measurement methods were recently changed to favor numerical output over safety or quality compliance. Success is measured only by meeting numerical targets; failure includes everything else — safety, sustainability, worker welfare. The system is engineered to make workers disposable and failure inevitable for anyone who prioritizes survival over output.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Systems analysis revealed quota architecture designed for failure', `soreheim-quota-system-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of quota system mechanics is flagged as sensitive inquiry. Management restricts your access to further system documentation. Your investigation has raised red flags.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Management restricted access to quota system information', `soreheim-quota-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The quota system shows signs of recent restructuring. Targets have changed and measurement methods appear different from earlier documentation. The system has been deliberately modified.`;
        addJournal('investigation', 'Quota system modifications confirmed', `soreheim-quota-modified-${G.dayCount}`);
      } else {
        G.lastResult = `The quota system is complex and access to detailed mechanics is restricted. You can observe the results but not the underlying structure.`;
        addJournal('investigation', 'Quota system mechanics inaccessible without management access', `soreheim-quota-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. INDUSTRIAL ANALYSIS TIER 1: SUPPLY CHAIN DISRUPTION
  {
    label: "Trace resource flows into and out of Soreheim — are materials being withheld, or are finished goods being redirected to unusual destinations?",
    tags: ['Investigation', 'Industrial', 'Supply', 'Flow', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'supply chain flow analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The supply chain has been deliberately restructured. Raw materials that used to flow from multiple sources now come through a single bottleneck controlled by external interests. Finished goods are being redirected to destinations outside normal trade channels. Soreheim is being treated as a resource extraction point rather than an integrated production center. The city's own needs for material are being deprioritized. This is economic isolation disguised as logistics optimization.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Industrial analysis revealed deliberate supply chain isolation', `soreheim-supply-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your tracking of supply flows draws attention from logistics coordinators. You're questioned about your interest in material movement. The supply chain is now aware you're mapping it.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Logistics coordinators alerted to supply chain inquiry', `soreheim-supply-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Material flows show unusual patterns. Supply sources and destination markets have shifted recently. The changes seem deliberate but the full scope is unclear.`;
        addJournal('investigation', 'Supply chain anomalies detected but incompletely mapped', `soreheim-supply-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. AUTHORITY STRUCTURE TIER 2: DECISION ISOLATION
  {
    label: "Map the decision-making hierarchy in Soreheim — who has actual authority, who's been sidelined, and where are new orders really coming from?",
    tags: ['Investigation', 'Authority', 'Structure', 'Power', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing authority restructuring');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The authority structure has been silently reorganized. Traditional decision-makers have been moved to advisory positions — kept in place to maintain legitimacy but stripped of actual power. Real decisions come through a parallel structure that bypasses normal channels. Orders arrive from external sources and are implemented without local discussion. Local leaders are aware of this but afraid to acknowledge it. Soreheim's governance has been captured by external interests while maintaining the appearance of local control.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Authority analysis revealed external control capture structure', `soreheim-authority-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your mapping of authority structure is seen as sensitive inquiry. Local leaders distance themselves from you. You've been flagged as attempting to expose power dynamics.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Local leadership now viewing you as potential threat', `soreheim-authority-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The authority structure shows recent changes. Decision-making appears to involve external input that wasn't present before. The hierarchy has been reorganized.`;
        addJournal('investigation', 'Authority structure reorganization confirmed', `soreheim-authority-modified-${G.dayCount}`);
      } else {
        G.lastResult = `The formal authority structure is visible but understanding actual decision flows requires deeper internal access.`;
        addJournal('investigation', 'Authority structure analysis incomplete without insider perspective', `soreheim-authority-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. COMMUNICATION NETWORK TIER 1: MESSAGE MONITORING
  {
    label: "Monitor communication flows between Soreheim and other localities — are messages being intercepted, delayed, or altered?",
    tags: ['Investigation', 'Communication', 'Networks', 'Control', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'communication network analysis');
      G.stageProgress[1]++;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Messages sent from Soreheim are being monitored and filtered. Couriers report that sensitive communications are delayed or altered in transit. Requests for external assistance or coordination with other localities are being intercepted. News from outside Soreheim arrives in controlled, fragmentary pieces. Soreheim is being information-isolated — cut off from external perspective on what's happening, prevented from calling for help.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Communication analysis revealed systematic message interception', `soreheim-communication-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your monitoring of communication networks is noticed. Couriers and message handlers become extremely cautious. Your attempt to track information flows has made you visible to whoever's managing the networks.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Communication network handlers now aware of monitoring attempt', `soreheim-communication-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Communication flows show signs of recent changes. Some messages appear to be routed through new channels. The communication network has been reorganized.`;
        addJournal('investigation', 'Communication network reorganization detected', `soreheim-communication-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. RESISTANCE TIER 2: SUPPRESSION MECHANISMS
  {
    label: "Document evidence of worker resistance being actively suppressed — who's threatening displaced workers, and what methods are being used?",
    tags: ['Investigation', 'Resistance', 'Suppression', 'Fear', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing suppression apparatus');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Worker resistance is being systematically crushed. Those who question quota increases are demoted or replaced. Those who advocate for safety are isolated from employment networks. Anyone who attempts to organize collective action faces threats — to their family, their housing, their ability to work. Informants report any dissent. The suppression is surgical and consistent. It's designed to break worker solidarity before it can form. Fear is being weaponized as the primary tool of control.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Suppression analysis revealed systematic worker intimidation apparatus', `soreheim-suppression-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your investigation of suppression mechanisms makes you a target. Workers who speak to you are immediately marked for retaliation. Your inquiry is accelerating the very suppression you're trying to document.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation causing worker retaliation acceleration', `soreheim-suppression-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Evidence of worker intimidation and suppression exists. People are clearly afraid to resist. The mechanisms aren't fully visible but the effects are undeniable.`;
        addJournal('investigation', 'Worker suppression confirmed through behavioral patterns', `soreheim-suppression-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Worker fear exists but the specific suppression mechanisms are concealed. People won't openly discuss threats against them.`;
        addJournal('investigation', 'Worker suppression suspected but mechanisms not yet documented', `soreheim-suppression-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 15. SURVIVAL ANALYSIS TIER 1: WORKER VULNERABILITY
  {
    label: "Document the physical and economic vulnerability of individual workers — who's at risk of replacement, and what survival pressures are being weaponized?",
    tags: ['Investigation', 'Survival', 'Vulnerability', 'Pressure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'worker vulnerability mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Worker vulnerability is being systematically weaponized. Older workers are targeted for replacement because they're more expensive. Workers with family obligations are pressured through threats to dependents. Workers with skills specific to Soreheim can't leave or they lose housing and community standing. Younger workers are kept desperate and disposable. The system creates survival pressure that forces compliance through fear of destitution. Individual workers have been isolated and made vulnerable to replacement.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Survival analysis revealed systematic worker vulnerability weaponization', `soreheim-survival-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of worker vulnerability is seen as threatening to management. You're warned that documenting worker precarity is prohibited. The investigation is now flagged.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Management prohibited further worker vulnerability analysis', `soreheim-survival-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Workers show clear signs of vulnerability and economic desperation. Many are clearly afraid of displacement. The vulnerability is visible but the full system isn't clear.`;
        addJournal('investigation', 'Worker vulnerability and fear patterns confirmed', `soreheim-survival-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Worker precarity exists but understanding the full vulnerability system requires deeper worker interviews.`;
        addJournal('investigation', 'Worker vulnerability analysis incomplete without deeper interviews', `soreheim-survival-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. NARRATIVE CONTROL TIER 2: OFFICIAL JUSTIFICATION STRUCTURE
  {
    label: "Analyze the official narrative being used to justify quota increases and worker displacement — what reasoning is being publicly offered?",
    tags: ['Investigation', 'Narrative', 'Control', 'Justification', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'official narrative deconstruction');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The official narrative is carefully constructed. "Market demands require increased production." "Quality improvements require new standards." "Workforce optimization requires strategic personnel changes." Each justification sounds reasonable in isolation but together they form a coherent system for normalizing displacement. The narrative obscures the intentional harm beneath reasonable-sounding explanations. Management has created a cover story that makes systematic destruction appear as inevitable market responses.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Narrative analysis revealed constructed justification system', `soreheim-narrative-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your deconstruction of official narrative draws scrutiny from management communication. You're advised to avoid "mischaracterizing" company statements. The narrative control is now aware you're analyzing it.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Management aware of narrative structure analysis', `soreheim-narrative-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The official narrative shows signs of careful construction. Each explanation seems reasonable individually. The pattern of explanations appears deliberately structured.`;
        addJournal('investigation', 'Official narrative structured justification confirmed', `soreheim-narrative-structured-${G.dayCount}`);
      } else {
        G.lastResult = `Official narrative is complex. Understanding its full structure requires access to management communications and policy documentation.`;
        addJournal('investigation', 'Narrative structure analysis incomplete without management documents', `soreheim-narrative-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 17. STREET RUMOR: LABOR WHISPERS
  {
    label: "Gather gossip at the shift yards and communal meal halls — what stories are workers telling each other about recent changes?",
    tags: ['Investigation', 'Rumor', 'Labor', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing worker narrative');
      G.stageProgress[1]++;

      const rumor = ['displaced workers are being sent to mines further north', 'the quota increases came from outside Soreheim', 'safety violations are being covered up systematically', 'workers who protest disappear for weeks then come back broken', 'someone is deliberately replacing skilled workers with inexperienced ones'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `The shift yard whisper is: "${selected}." Workers repeat it with varying levels of certainty. Some claim direct knowledge, others are passing on fragments they've heard. But the collective narrative is consistent: something deliberate is happening to Soreheim's workforce. The community is aware of wrongness, even if it can't articulate the full conspiracy yet.`;
      addJournal('investigation', `Worker rumor gathered: "${selected}"`, `soreheim-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. INSTITUTIONAL CRACK: QUOTA SYSTEM FAILURE PROOF
  {
    label: "Compile mathematical proof that the current quota system is designed to guarantee worker failure — expose the deliberate rigging.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Systems', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing quota system conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `You piece together the quota documentation: baseline capacity calculations that are deliberately inflated, measurement methodologies that exclude factors workers can't control, failure definitions that include normal maintenance and safety. The mathematics prove the quota system cannot be satisfied by the current workforce under normal conditions. This is not management, this is engineered failure. Someone designed this system specifically to replace workers systematically. The wrongness has architectural documentation.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Quota system failure architecture documented with proof', `soreheim-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your compilation of quota system proof is noticed. Someone intercepts your documentation and warns you that analyzing production systems without authorization will result in removal from Soreheim. You're marked as a threat to operational security.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Management directly warned about quota system analysis', `soreheim-proof-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You find enough mathematical evidence to suggest the quota system has been deliberately modified to be unachievable. The rigging isn't conclusively proven, but it's strongly implied by the data.`;
        addJournal('investigation', 'Quota system rigging strongly suggested by data analysis', `soreheim-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The quota system documentation exists but making mathematical sense of it requires deeper access to underlying capacity data.`;
        addJournal('investigation', 'Quota system proof incomplete without capacity documentation', `soreheim-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. MORAL PRESSURE: COMPLICITY AND PARTICIPATION CHOICE
  {
    label: "Confront a worker or official who profits from the displacement system — demand to know their involvement and decide whether to protect them or expose them.",
    tags: ['Investigation', 'Moral', 'Choice', 'Pressure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
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

      G.lastResult = `You confront ${npc.name}. They crumble under pressure. "${npc.fear}." They're trapped, complicit, and afraid. You must decide: Do you expose them to stop the system? Do you protect them and maintain your investigation quietly? Your choice determines whether this person becomes an informant or an enemy — and whether Soreheim's workforce fragmentation continues or resistance begins to organize.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal('consequence', `Confronted ${npc.name} (${npc.role}) about displacement system participation`, `soreheim-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. DISCOVERY MOMENT: EXTERNAL COORDINATION SOURCE
  {
    label: "Find the evidence that proves the quota system and workforce displacement is being coordinated from outside Soreheim — discover the external hand orchestrating collapse.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of displacement');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Behind the quota ledgers and displaced worker records, you find the thread that leads outside Soreheim. Courier receipts from northern territories with instructions to implement "workforce restructuring." Orders from external interests directing the foreman, the quota clerk, the labor brokers. Soreheim's economic collapse is being orchestrated from beyond its borders. Someone in the northern territories — or someone allied with them — is systematically dismantling Soreheim's independent workforce as preparation for something larger. The conspiracy is coordinated, resourced, and external.`;
        G.stageProgress[1]++;
        addJournal('discovery', 'Origin source of Soreheim workforce displacement identified as external coordination', `soreheim-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach the evidence of external coordination, you're intercepted. Someone stops you directly and makes it clear that pursuing this further will result in your removal from Soreheim or worse. You've discovered pieces, but the full external coordination remains hidden — and now you're marked as a direct threat.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation interrupted by external coordination operators', `soreheim-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points beyond Soreheim. Courier routes reference "northern authorities." The quota system documentation shows external signature. The conspiracy is larger than the city itself. You don't know the exact source yet, but you know the displacement is being directed from outside Soreheim's borders.`;
        addJournal('discovery', 'External coordination of Soreheim displacement confirmed', `soreheim-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `You find pieces suggesting external involvement, but the origin source remains obscured. Whoever's orchestrating this has hidden their hand carefully.`;
        addJournal('investigation', 'External coordination suspected but source not yet identified', `soreheim-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: IRON COMPACT ROUTING MARKS
  {
    label: "Examine freight documentation at the quarry dispatch yard — trace the routing marks on outbound shipments.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'reading shipment routing evidence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 14) {
        G.lastResult = `Shipment marks indicate the Iron Compact's northern freight relay. Three crates bear a secondary stamp — not a trade mark, a priority indicator. Someone is routing selected quarry output outside Soreheim's own allocation ledger. The numbers on the crates don't match the official cargo manifest.`;
        if (!G.flags) G.flags = {};
        G.flags.found_iron_compact_routing = true;
        addJournal('investigation', 'Shipment routing anomalies linked to Iron Compact relay marks', `soreheim-routing-${G.dayCount}`);
      } else {
        G.lastResult = `The freight marks are dense and coded. You recognize some Soreheim Alliance standard marks, but others don't match any ledger format you know. The anomaly is there — you just can't read it yet.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. CLUE: WORKER DISPLACEMENT LOG
  {
    label: "Recover a discarded shift log from the waste pile outside the administration block.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'recovering discarded documentation');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `The log covers the past six weeks. Names are crossed out and replaced in ink that doesn't match the original hand. Thirty-one workers removed, eighteen new names added. The crossed-out workers have no forwarding assignment listed. Official logs show them as "transferred." There's no destination. They've been written out of Soreheim's labor record entirely.`;
      if (!G.flags) G.flags = {};
      G.flags.found_displacement_log = true;
      addJournal('investigation', 'Displacement log recovered: 31 workers erased without forwarding record', `soreheim-displog-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ARCHETYPE-GATED: READING THE PRESSURE
  {
    label: "Read the situation in the shift yard — trust your instincts about what the assembled workers are actually afraid of.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reading crowd pressure');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `You've seen this posture in soldiers before a rout. These workers are not tired — they're waiting. Waiting to be given a reason to stop complying. Someone with authority has been methodically removing every internal figure who might organize them. Whoever orchestrated this cleared the field first.`;
      } else if (arch === 'magic') {
        G.lastResult = `The patterns of behavior here carry a residue — not magical, but structural. Information is being filtered out of the community in a precisely practiced way. Rumors travel; analysis doesn't. Someone designed the suppression to be invisible from within.`;
      } else if (arch === 'stealth') {
        G.lastResult = `You clock the watchers: three men loitering near the shift gate who don't have work gloves. They're not workers. They're maintaining the pressure passively — presence without action, surveillance made ambient. Someone is paying for continuous coverage.`;
      } else {
        G.lastResult = `You catch the moment when a foreman's eye meets a worker's and both look away. It's not hostility — it's performed ignorance. Both parties know something, and both have been told to pretend they don't. The silence is coordinated.`;
      }
      addJournal('investigation', 'Shift yard pressure patterns read — coordinated suppression confirmed', `soreheim-pressure-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. SOCIAL: APPROACH THE JUNIOR CLERK
  {
    label: "Buy a meal for the youngest records clerk and let them talk.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'building low-pressure rapport');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Davel is nineteen and frightened. He doesn't know the full shape of what's happening, but he knows he's been told to stop dating records by locality and start dating them by a code he doesn't recognize. "My supervisor said the old system is 'being unified.' But the new dates don't match anything." He's been filing documents into a system he can't read. Someone upstream can.`;
        if (!G.flags) G.flags = {};
        G.flags.met_davel_clerk = true;
        addJournal('contact', 'Junior clerk Davel revealed new undecipherable dating system in records', `soreheim-davel-${G.dayCount}`);
      } else {
        G.lastResult = `Davel accepts the food but stays quiet. He's been warned about strangers asking questions. The warmth helps — he doesn't bolt — but he's not ready to speak yet.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 25. FACTION SEED: IRON COMPACT CONTACT
  {
    label: "Follow up with the Iron Compact's regional labor arbiter who has an office at the shift administration building.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'making Iron Compact contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Arbiter Keln Vare is smooth and unhurried. He acknowledges the workforce disruption as "a regional efficiency correction" and offers to place your name in a priority labor registry. The offer is generous enough to feel like a test. You decline. He nods as though he expected that. "Then we're simply two parties watching the same situation." He believes you'll come back.`;
        if (!G.flags) G.flags = {};
        G.flags.met_iron_compact_arbiter = true;
        G.factionHostility.iron_compact += 1;
        addJournal('faction', 'Iron Compact arbiter Keln Vare made first contact — offered registry placement', `soreheim-iron-contact-${G.dayCount}`);
      } else {
        G.lastResult = `Keln Vare's secretary says the arbiter is occupied with "quota review meetings." The Iron Compact office is active and staffed. You get a name and a schedule — Vare meets with shift administrators on even-numbered afternoons.`;
        if (!G.flags) G.flags = {};
        G.flags.located_iron_compact_arbiter = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 26. ATMOSPHERE: THE RELIC STRATEGY WING PLAQUE
  {
    label: "Study the memorial plaque outside the Relic Strategy Wing annex — read what Soreheim commemorates about its past.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 55,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'reading local history');

      G.lastResult = `The plaque lists seventeen crafters who maintained production during the last Resource War, when Soreheim was under supply blockade for eleven months. "They kept the forge burning so the alliance did not starve." The names are old. The plaque is clean — recently dusted. Someone in this city still honors that story. Whatever is being done to Soreheim now, it isn't visible to the people who wrote this.`;
      addJournal('discovery', 'Relic Strategy Wing plaque — Soreheim craft heritage tied to alliance survival', `soreheim-plaque-${G.dayCount}`);
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

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `You cache the quota records and displacement log in three separate locations across the city — a shrine alcove, a coopering workshop shelf behind a false-bottom crate, and a rolled bundle inside a wall-mounted tool bracket. No single raid will recover all of it. The evidence survives even if you're searched.`;
        G.flags.evidence_secured_soreheim = true;
        addJournal('consequence', 'Evidence distributed across three secure caches in Soreheim', `soreheim-cache-${G.dayCount}`);
      } else {
        G.lastResult = `You find one location that feels safe. It's not ideal — a single cache is vulnerable — but it buys time. The documentation is hidden, at least for now.`;
        G.flags.evidence_secured_soreheim = true;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 28. CLUE: RELIC STRATEGY WING CORRESPONDENCE
  {
    label: "Intercept a courier carrying sealed correspondence between the Relic Strategy Wing and an undisclosed northern contact.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'intercepting strategic correspondence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `The letter is in layered code but the outer frame is legible: "Stage two of the restructuring proceeds on schedule. Workforce resistance below threshold. Recommend advancing timeline for final extraction." It's signed with an unfamiliar crest — a coiled chain above a horizontal bar. Someone is running Soreheim's collapse as a staged operation with a defined endpoint. There's a "final extraction." You don't know what that means yet.`;
        if (!G.flags) G.flags = {};
        G.flags.found_strategic_correspondence = true;
        addJournal('discovery', 'Intercepted correspondence confirms staged restructuring with final extraction target', `soreheim-intercept-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You see the courier's route and the seal — Relic Strategy Wing standard, but the secondary seal is unfamiliar. The courier moves as though the delivery is time-sensitive. You follow long enough to see the destination: a merchant house front on the north side of Soreheim. Not official premises.`;
        if (!G.flags) G.flags = {};
        G.flags.tracked_courier_destination = true;
      } else {
        G.lastResult = `The courier spots you and alters route. You lose the trail two blocks from the administration building. The correspondence doesn't reach you, but you know it was sent.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 29. SHADOW RIVAL INTRO (final expansion choice)
  {
    label: "A veteran labor organizer warns you — someone matching an unusual description has been following your line of inquiry by one day.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'receiving rival warning');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `The organizer describes a figure in Warden-adjacent gear asking the same questions you've been asking, but framing them differently — collecting answers to use against the workers, not to help them. A senior operative mapping the same terrain from the opposite side.`;
      } else if (arch === 'magic') {
        G.lastResult = `"A scholar type," the organizer says. "Older. Carries a sealed archive case, never opens it in public. Asks about records, specifically which ones have been altered. More interested in the documentation than the workers." Someone is tracking the paper trail — not the human cost.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"Careful one," the organizer says quietly. "Asks nothing. Just watches. But workers who talk to you have a stranger approach them the next day with better questions." Someone is harvesting your network. They're behind you by exactly one day.`;
      } else {
        G.lastResult = `"Well-dressed," the organizer says. "Speaks to the administrators and shift managers, not the workers. Claims to be auditing on behalf of a neutral party. But the audits only happen right after you've made contact with someone." Someone is using your investigation to identify soft targets.`;
      }

      G.lastResult += ` You're being shadowed by someone operating the same investigation from a different angle — and their angle isn't yours.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent figure confirmed following investigation trail in Soreheim', `soreheim-rival-shadow-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.SOREHEIM_PROPER_STAGE1_ENRICHED_CHOICES = SOREHEIM_PROPER_STAGE1_ENRICHED_CHOICES;
