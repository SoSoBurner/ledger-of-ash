/**
 * SUNSPIRE HAVEN STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to family syndicate control and resource isolation
 * Generated for: Fair exchange vs family obligation, communal good vs personal profit, syndicate weaponization and coercion
 * Each choice: 65-80 XP, grounded in family politics and resource networks, layered wrongness reveal
 */

const SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. SYNDICATE YARD MASTER: CONVOY ROUTE CHANGES
  {
    label: "Question the syndicate yard master about recent convoy route changes — are supplies being diverted, and is transport being restricted?",
    tags: ['Investigation', 'NPC', 'Syndicate', 'Logistics', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading convoy diversion patterns');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Yard Master Corbek pulls you aside. "Routes have changed. We used to optimize for speed and community access. Now routes are micromanaged from above. Certain supply lines that feed the market are being lengthened or delayed. Supplies meant for Sunspire Haven are being routed through external storage first. It's like someone's inserting control points into the supply chain. Convoys that leave our yard aren't just moving goods anymore — they're moving resources through a sieve that lets certain things through and filters out others."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Yard master revealed route manipulation and supply filtering', `sunspire-yard-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The yard master becomes protective. "Convoy logistics are sensitive family business. I don't discuss routing with outsiders." They return to work, and word spreads that you're asking pointed questions about supply movements.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Yard master now wary of your inquiries', `sunspire-yard-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The yard master admits routes have been updated recently. "Supply demands change," they say, though their tone lacks conviction. Something about the route modifications feels deliberately planned.`;
        addJournal('investigation', 'Yard master confirmed convoy route modifications', `sunspire-yard-pressure-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. FAMILY BROKER: OBLIGATION ENFORCEMENT
  {
    label: "Speak with a family broker about recent changes in family obligation enforcement — are obligations being weaponized against certain families?",
    tags: ['Investigation', 'NPC', 'Family', 'Coercion', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering obligation weaponization');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Family Broker Lysander speaks carefully. "Family obligations have always been part of Sunspire culture. But lately, obligations are being used as leverage. Families that resist syndicate preferences are told their obligations to community service will be increased or revoked entirely — destroying their standing. Families that comply are given obligation waivers or reductions. The system is being weaponized to reward compliance and punish resistance. Mutual family duty is becoming a tool of control."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Broker revealed obligation system weaponization', `sunspire-broker-obligations-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The broker clams up. "Family obligation systems are private matters. I don't discuss them with outsiders." Their protective wall is instant. Word spreads through the family networks about your inquiry into obligation enforcement.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Family brokers warned about your investigation', `sunspire-broker-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The broker acknowledges family obligations have been handled differently lately. "Emphasis on standardization," they note. The obligation system feels deliberately controlled.`;
        addJournal('investigation', 'Broker confirmed recent obligation system changes', `sunspire-broker-unclear-${G.dayCount}`);
      } else {
        G.lastResult = `The broker is protective of family obligation details. "Those are internal family matters." Without family standing, you can't access obligation policy information.`;
        addJournal('investigation', 'Family obligations blocked without family access', `sunspire-broker-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. HARVEST COORDINATOR: FOOD DISTRIBUTION CHANGES
  {
    label: "Consult with the harvest coordinator — is food allocation being unequally distributed, or are certain families receiving preferential rations?",
    tags: ['Investigation', 'NPC', 'Resources', 'Food', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading food distribution patterns');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Harvest Coordinator Mirrin is visibly conflicted. "Food allocation has become political. Families aligned with the syndicate leadership receive earlier access to harvests, first choice of quality grain, preferential portions. Families that question decisions receive minimal allocations, lowest-quality stores, and shorter storage guarantees. It's creating literal hunger as a control mechanism. And the worst part? The system is being justified through complex accounting that makes inequality look inevitable rather than deliberate."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Coordinator revealed politicized food distribution system', `sunspire-harvest-distribution-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The coordinator becomes defensive. "Food distribution is complex. I don't discuss allocation decisions with strangers." They turn away. The harvest coordination is now guarded against your inquiry.`;
        addJournal('complication', 'Harvest coordinator refuses further distribution inquiry', `sunspire-harvest-silent-${G.dayCount}`);
      } else {
        G.lastResult = `The coordinator mentions food allocation has been adjusted lately. "Supply variations require different distribution," they note. Something about the allocation feels deliberately inconsistent.`;
        addJournal('investigation', 'Coordinator confirmed recent food distribution changes', `sunspire-harvest-confirmed-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. TEXTILE MERCHANT: TRADE PREFERENCE BIAS
  {
    label: "Question textile merchants about recent changes to trade opportunities — are certain families receiving favorable contracts while others are excluded?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Bias', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering trade preference bias');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Textile Merchant Keldan speaks quietly. "Trade preferences have shifted. Families with syndicate connections get favorable contracts, longer payment terms, and preferential access to premium materials. Families without those connections struggle to get any contracts at all. This used to be a system where quality and need determined access. Now it's purely about family alignment. The market is being restructured to concentrate economic advantage."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Merchant revealed systematic trade preference corruption', `sunspire-textile-bias-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The merchant becomes suspicious of your questions. "Why are you interested in our trade practices? Are you an investigator?" They shut down the conversation. Word spreads through merchant circles about your inquiry.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Merchants now viewing you as potential investigator', `sunspire-textile-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The merchant admits trade opportunities have been distributed unevenly lately. "Competitive advantages vary," they note. Something about the trade system feels deliberately structured.`;
        addJournal('investigation', 'Merchant confirmed trade opportunity inequality', `sunspire-textile-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The merchant is protective of trade details. "Commercial arrangements are private matters." Without merchant standing, you can't access trade preference information.`;
        addJournal('investigation', 'Trade preferences blocked without commercial access', `sunspire-textile-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. QUOTA KEEPER: PRODUCTION PRESSURE
  {
    label: "Interview the quota keeper about recent production targets — are quotas becoming impossible to meet, or are families failing to achieve them deliberately?",
    tags: ['Investigation', 'NPC', 'Production', 'Quotas', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading quota pressure patterns');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Quota Keeper Neria is conflicted but speaks. "Quotas are being set impossibly high for certain families. They're designed to fail. When failure happens, families lose syndicate standing, access to resources, and community respect. Meanwhile, families with syndicate connections get flexible quotas that they can easily meet. The system is being used to concentrate production power and control. It's systematic family displacement through quota engineering."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Quota keeper revealed quota system weaponization', `sunspire-quota-pressure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The quota keeper refuses access to detailed target information and reports your inquiry to the syndicate. You're now flagged as attempting to breach production administration. The syndicate will be investigating your motives.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Syndicate investigating your quota system inquiry', `sunspire-quota-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The quota records show recent changes. Targets have been adjusted and some families are consistently failing while others exceed targets easily. The pattern suggests deliberate inequality.`;
        addJournal('investigation', 'Quota records show signs of deliberate inequality', `sunspire-quota-altered-${G.dayCount}`);
      } else {
        G.lastResult = `The quota keeper is protective of production information. "Those are internal family records." Without family standing, you can't access detailed quota information.`;
        addJournal('investigation', 'Quota information blocked without family access', `sunspire-quota-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. CONVOY ORGANIZER: EXTERNAL COORDINATION
  {
    label: "Question the convoy organizer about communication with external interests — are shipments being coordinated with outside forces, and are messages being encrypted?",
    tags: ['Investigation', 'NPC', 'Communication', 'External', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'tracing external communication');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + (G.skills.insight || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Convoy Organizer Tholen pulls you aside nervously. "Certain convoys receive special routing instructions that don't come from local management. The messages are encrypted and delivered through private couriers. Destinations are sometimes changed last-minute without explanation. I've been told not to ask questions about these special convoys. Something is being coordinated between Sunspire Haven's syndicate and external interests. The convoys are more than just trade — they're channels for something else."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Convoy organizer revealed external coordination channels', `sunspire-convoy-external-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The convoy organizer becomes frightened at your questions. "I don't know what you're asking about. Leave me alone." Their fear is palpable. Asking about external coordination has made you a threat in their mind.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Convoy organizer frightened by external coordination inquiry', `sunspire-convoy-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The convoy organizer admits some convoys receive special handling but won't specify details. "Just how things work sometimes," they say evasively.`;
        addJournal('investigation', 'Convoy organizer confirmed non-standard convoy operations', `sunspire-convoy-evasive-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. FAMILY ELDER: DECISION AUTHORITY EROSION
  {
    label: "Speak confidentially with a family elder about decision-making authority — has their power been undermined, or are syndicate directives overriding family autonomy?",
    tags: ['Investigation', 'NPC', 'Family', 'Authority', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering authority erosion');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Family Elder Daven speaks with genuine grief. "I've been an elder for thirty years. My family looked to me for decisions. Now? Syndicate directives arrive with the authority of tradition but without actual family consultation. I'm told to implement policies that harm my own family's interests. When I resist, I'm reminded that family autonomy depends on syndicate goodwill. The elders have been transformed into administrators of policies we didn't choose. Family governance has been captured."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Elder revealed systemic family authority erosion', `sunspire-elder-authority-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The elder becomes guarded at your questions about family authority. "Those are private family matters. You're not family." The conversation ends abruptly. The family leadership is now closed to your inquiry.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Family leadership banned you from authority questions', `sunspire-elder-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The elder admits family decision-making has become more constrained lately. "Coordination with the broader syndicate," they explain. Family autonomy has clearly been restricted.`;
        addJournal('investigation', 'Elder confirmed family authority constraints', `sunspire-elder-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The elder is protective of family governance details. "Those are internal family structures." Without family standing, you can't access decision-making information.`;
        addJournal('investigation', 'Family governance blocked without family membership', `sunspire-elder-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. MARKET INSPECTOR: QUALITY ENFORCEMENT BIAS
  {
    label: "Question the market inspector about quality enforcement — are standards being applied inconsistently, or are certain families receiving special treatment?",
    tags: ['Investigation', 'NPC', 'Quality', 'Market', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering enforcement bias');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + (G.skills.insight || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Market Inspector Varen speaks carefully. "Quality standards exist on paper. In practice, enforcement is political. Families aligned with syndicate leadership can sell substandard goods without consequences. Independent or resistant families get scrutinized intensively — minor deviations result in removal of goods or stall closures. I've been ordered to enforce standards selectively. The market is being restructured through biased quality control."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Inspector revealed selective quality enforcement system', `sunspire-inspector-bias-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The inspector becomes defensive. "Market enforcement is complex. I don't discuss individual enforcement decisions with outsiders." They turn away coldly. The market inspection department is now guarded against your inquiry.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Market inspector refused further investigation', `sunspire-inspector-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The inspector admits enforcement standards have been applied differently lately. "Contextual situations require flexible approaches," they note. The enforcement bias is visible.`;
        addJournal('investigation', 'Inspector confirmed inconsistent enforcement practices', `sunspire-inspector-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The inspector is protective of enforcement decisions. "Those are administrative matters." Without market authority, you can't access enforcement records.`;
        addJournal('investigation', 'Enforcement practices blocked without administrative access', `sunspire-inspector-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. FAMILY STRUCTURE TIER 1: SYNDICATE INTEGRATION ANALYSIS
  {
    label: "Analyze how Sunspire Haven's family structures have been reorganized — are families being consolidated, broken apart, or restructured to depend on the syndicate?",
    tags: ['Investigation', 'Family', 'Structure', 'Organization', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'family structure analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Family structures have been systematically altered. Independent families are being fragmented — children of resistant families are directed to different work assignments, economic opportunities, or housing separate from their families. Meanwhile, families aligned with the syndicate are being consolidated and given preferential resource access. Multi-generational family units that were sources of independence are being broken into smaller dependent units. The syndicate is restructuring family as a unit of control rather than a unit of identity.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Family analysis revealed systematic family restructuring', `sunspire-family-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of family structures draws attention from syndicate leadership. You're questioned about your interest in family organization. Your investigation is now flagged as unauthorized structural analysis.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Syndicate leadership alerted to family structure analysis', `sunspire-family-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Family structures show recent changes. Some families have shifted, memberships have changed, and organizational patterns appear different. The family structure has been modified.`;
        addJournal('investigation', 'Family structure modifications detected', `sunspire-family-modified-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. RESOURCE CONTROL TIER 2: SCARCITY ENGINEERING
  {
    label: "Document evidence that resource scarcity is being engineered — show how syndicate control is creating artificial shortages to maintain dependence.",
    tags: ['Investigation', 'Resources', 'Scarcity', 'Control', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'scarcity engineering documentation');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The resource system reveals deliberate engineering of scarcity. Harvests are diverted before reaching community storage. Food that could be distributed for subsistence is instead warehoused to create artificial shortages. Families dependent on market access for grain are increasingly forced to rely on syndicate-controlled rationing. Tools and materials are allocated through syndicate channels rather than through traditional family networks. Artificial scarcity is being weaponized — communities face enough shortage to require dependence while avoiding starvation that would provoke resistance.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Resource analysis revealed engineered scarcity system', `sunspire-resources-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your documentation of resource scarcity engineering draws direct attention from syndicate leadership. Someone warns you that exposing resource management will result in your removal from Sunspire Haven. Your investigation is marked as a direct threat.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Syndicate directly warned about resource scarcity inquiry', `sunspire-resources-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Resource distribution shows suspicious patterns. Supply levels don't match harvest records. Something's diverting resources systematically. The scarcity appears deliberately engineered.`;
        addJournal('investigation', 'Resource diversion pattern confirmed', `sunspire-resources-partial-${G.dayCount}`);
      } else {
        G.lastResult = `Resource management is complex. Understanding full scarcity engineering requires comparing harvest data, storage records, and distribution reports that you don't have complete access to.`;
        addJournal('investigation', 'Resource scarcity proof incomplete without full data access', `sunspire-resources-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. INFORMATION ISOLATION TIER 1: EXTERNAL NEWS FILTERING
  {
    label: "Track what information reaches Sunspire Haven from external sources — is news being filtered, and is the community being information-isolated?",
    tags: ['Investigation', 'Information', 'Isolation', 'Communication', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'information isolation analysis');
      G.stageProgress[1]++;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Information reaching Sunspire Haven from outside is being deliberately filtered. Stories about other localities' labor unrest, trade disruptions, or similar patterns are suppressed. Messages that might inspire collective resistance are intercepted before distribution. Travelers are questioned about what they've discussed with community members. The community is being information-isolated — cut off from perspective that they're part of a larger pattern, prevented from learning that other localities face similar manipulation.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Information analysis revealed systematic news filtering', `sunspire-information-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your tracking of information flows is noticed. Syndicate monitors question your interest in communication patterns. Your information analysis is now being monitored by the syndicate.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Syndicate monitoring alerted to information flow tracking', `sunspire-information-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Information flows show signs of recent changes. Some stories appear to be circulating less freely. External news reaching the community seems filtered.`;
        addJournal('investigation', 'Information filtering modifications detected', `sunspire-information-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. COERCION SYSTEM TIER 2: THREAT MAPPING
  {
    label: "Document the specific threats and consequences used against families — who's being threatened, what are they threatened with, and for what resistance?",
    tags: ['Investigation', 'Coercion', 'Threats', 'Fear', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'coercion apparatus documentation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `A pattern of threats emerges. Families who question syndicate decisions face resource allocation reductions. Families who speak publicly about manipulation face social isolation and removal from communal events. Families who attempt to organize resistance face threats to family members' employment and housing. Children of resistant families are directed to dangerous work assignments. The threats are calibrated — severe enough to enforce compliance, but maintained at levels that prevent open resistance. Coercion has become the hidden infrastructure of syndicate control.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Coercion analysis mapped systematic threat apparatus', `sunspire-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your documentation of threats makes you a target. Someone warns you directly that continued investigation will result in your removal from Sunspire Haven. Your analysis of coercion has accelerated the very mechanisms you're studying.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation drawing direct coercion consequences', `sunspire-coercion-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Evidence of family intimidation exists. Families are clearly afraid to resist. The threat mechanisms aren't fully visible but their effects are undeniable.`;
        addJournal('investigation', 'Family intimidation confirmed through behavioral patterns', `sunspire-coercion-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Family fear exists but the specific coercion mechanisms are concealed. People won't openly discuss threats against them.`;
        addJournal('investigation', 'Coercion suspected but specific mechanisms not documented', `sunspire-coercion-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. EXTERNAL FLOWS TIER 1: RESOURCE EXTRACTION
  {
    label: "Trace resource flows moving away from Sunspire Haven outward — what's being extracted, where is it going, and who's authorizing these shipments?",
    tags: ['Investigation', 'Resources', 'Flow', 'Extraction', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'resource extraction tracking');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Resources that should sustain Sunspire Haven are being systematically extracted. Food beyond basic rations is being moved to external storage and destinations. Tools and materials are being diverted to external interests. Family craftwork is being accumulated in external warehouses. Sunspire Haven is being treated as a production facility rather than a community — resources are extracted after basic subsistence allowances are provided. The community is being economically hollowed out.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Resource flow analysis revealed systematic extraction', `sunspire-extraction-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your tracking of outbound resource flows draws attention from syndicate coordination. You're questioned about your interest in resource movements. The extraction networks are now aware you're mapping them.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Syndicate extraction operations alerted to tracking', `sunspire-extraction-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Outbound resource movements show unusual patterns. Materials are being moved through non-standard channels. The extraction flows appear deliberately organized.`;
        addJournal('investigation', 'Resource extraction modifications detected', `sunspire-extraction-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. COMMUNITY COHESION TIER 2: SOCIAL FRAGMENTATION
  {
    label: "Document the breakdown of community bonds — what traditional relationships have fractured, and what mutual aid networks are being disrupted?",
    tags: ['Investigation', 'Community', 'Bonds', 'Fragmentation', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'community fragmentation documentation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Community bonds that once held Sunspire Haven together are being deliberately fractured. Families that traditionally cooperated are now in competition for syndicate-controlled resources. Mutual aid networks are being disrupted through resource control. Shared celebrations and gathering events are being limited or canceled. Young people are isolated from elders through separate work assignments. The social infrastructure that enabled collective action is being systematically destroyed. What's replacing it is individual family desperation and dependence on syndicate favor.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Community analysis revealed systematic social fragmentation', `sunspire-community-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your documentation of community breakdown makes people nervous. Some avoid you because they fear your inquiry will attract surveillance to their concerns. Your analysis is accelerating the fragmentation you're studying.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Community members avoiding you due to fear of scrutiny', `sunspire-community-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Community bonds have clearly weakened. Families interact more cautiously. Shared events are less frequent. The community cohesion has declined visibly.`;
        addJournal('investigation', 'Community fragmentation confirmed through behavioral observation', `sunspire-community-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Community concerns exist but the full scope of social breakdown is difficult to measure without deeper family access.`;
        addJournal('investigation', 'Community fragmentation suspected but incompletely documented', `sunspire-community-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 15. FAMILY FRAGMENTATION TIER 1: KINSHIP BREAKDOWN
  {
    label: "Document the breakdown of family bonds — which families are being separated, and what social pressures are preventing families from uniting?",
    tags: ['Investigation', 'Family', 'Bonds', 'Fragmentation', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'family fragmentation mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Family bonds are being systematically severed. Children are separated from parents through work assignments to distant locations. Extended families that traditionally lived and worked together are being parceled into separate housing. Couples are assigned to different production cycles. Multi-generational families are losing their cohesion. Attempts to maintain family connections are viewed as suspicious loyalty questions. The primary tool of control — the family unit — is being deliberately fractured to prevent collective resistance. Families as economic and social units have been weaponized against themselves.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Family analysis revealed systematic kinship destruction', `sunspire-fragmentation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of family breakdown draws direct attention from syndicate leadership. You're warned that documenting family separation is prohibited. The investigation is now flagged.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Syndicate prohibited further family fragmentation analysis', `sunspire-fragmentation-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Family structures show clear signs of disruption and separation. Many families are visibly fragmented. The breakdown is observable but the full system isn't clear.`;
        addJournal('investigation', 'Family fragmentation and separation patterns confirmed', `sunspire-fragmentation-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Family separation exists but understanding the full system requires deeper family interviews and access to work assignment records.`;
        addJournal('investigation', 'Family fragmentation analysis incomplete without assignment data', `sunspire-fragmentation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. CONSENT FICTION TIER 2: MANUFACTURED ACCEPTANCE
  {
    label: "Document how community resistance is being suppressed while maintaining the fiction of voluntary participation — analyze the mechanisms of coerced consent.",
    tags: ['Investigation', 'Coercion', 'Consent', 'Fiction', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'manufactured consent structure analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The system maintains a fiction of voluntary participation. Communities are told they've "agreed" to resource distributions and family obligations. Families are told they've "accepted" their roles in production quotas. The syndicate maintains the appearance that the community is consenting to the system. In reality, families that resist face threats, exclusion, and starvation. The consent is manufactured through coercion disguised as voluntary choice. The system is designed to break resistance while maintaining the appearance that the community has accepted its own subjugation.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Consent analysis revealed manufactured acceptance apparatus', `sunspire-consent-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of coerced consent draws scrutiny from syndicate communication. You're warned that questioning "community participation" undermines social stability. The analysis is now being monitored.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Syndicate aware of consent apparatus analysis', `sunspire-consent-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The community participation structure shows signs of manufactured nature. People claim to have agreed to systems while showing clear signs of duress. The consent is visible but coercive.`;
        addJournal('investigation', 'Coerced consent structure confirmed', `sunspire-consent-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Community acceptance appears genuine but understanding the coercion mechanisms requires deeper analysis of threat systems and family vulnerabilities.`;
        addJournal('investigation', 'Manufactured consent analysis incomplete without threat documentation', `sunspire-consent-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 17. STREET RUMOR: FAMILY WHISPERS
  {
    label: "Gather gossip at market gatherings and communal meal areas — what stories are families telling each other about syndicate changes?",
    tags: ['Investigation', 'Rumor', 'Family', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing family narrative');
      G.stageProgress[1]++;

      const rumor = ['the syndicate is deliberately making resources scarce to control families', 'families that resist are being broken up and scattered', 'food is being stored somewhere outside Sunspire instead of distributed', 'certain families are getting special treatment from the syndicate while others starve', 'someone is taking resources north and nobody knows why'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `The community whisper is: "${selected}." Families repeat it with varying certainty. Some claim direct experience, others are passing on fragments they've heard. But the collective narrative is consistent: the syndicate is deliberately harming the community to maintain control. Sunspire Haven's families are aware wrongness is happening, even if they can't articulate the full conspiracy yet.`;
      addJournal('investigation', `Family rumor gathered: "${selected}"`, `sunspire-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. INSTITUTIONAL CRACK: SYNDICATE CONTROL PROOF
  {
    label: "Compile documented evidence that proves the syndicate is deliberately harming the community for external benefit — show the coordination and extraction system.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Coordination', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing syndicate conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `You piece together the evidence: resource accounting showing more harvested food diverted than distributed. Records showing families allocated less than subsistence levels while syndicate leadership stores surplus. Communications showing syndicate coordination with external parties about resource extraction. Work records showing families directed to production far beyond their own needs. Family obligation records showing systematic targeting of resistant families. The documentation is clear: the syndicate is deliberately extracting resources from Sunspire Haven and sending them externally while maintaining community dependence through artificial scarcity. The wrongness has architectural documentation.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Syndicate extraction conspiracy documented with proof', `sunspire-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your compilation of syndicate control proof is noticed. Someone intercepts your documentation and warns you that exposing syndicate resource management will result in your removal from Sunspire Haven. You're marked as a threat to the syndicate's operational security.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Syndicate directly warned about control system exposure', `sunspire-proof-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You find enough evidence to suggest deliberate syndicate resource extraction. Discrepancies between harvests and distributions, unusual external shipments — it's compelling but not conclusively proven without comparing to external destination records.`;
        addJournal('investigation', 'Syndicate extraction strongly suggested by evidence', `sunspire-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The resource records exist but proving deliberate extraction requires comparing local accounting to external destination records that you don't yet have access to.`;
        addJournal('investigation', 'Syndicate proof incomplete without external coordination records', `sunspire-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. MORAL PRESSURE: FAMILY COMPLICITY CHOICE
  {
    label: "Confront a family leader who's complicit in syndicate resource extraction — demand explanation and decide whether to protect them or expose them.",
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
        { name: 'Yard Master Corbek', role: 'logistics coordinator', fear: 'They threatened to move my family to external labor camps if I didn\'t cooperate with resource diversion' },
        { name: 'Family Broker Lysander', role: 'family negotiator', fear: 'My own family would starve if I resisted. I had to accept syndicate terms to feed them' },
        { name: 'Syndicate Coordinator Varen', role: 'resource allocator', fear: 'They have my children. I cooperate or I never see them again' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `You confront ${npc.name}. They crumble under pressure. "${npc.fear}." They're trapped, complicit, and terrified. You must decide: Do you expose them to stop the extraction system? Do you protect them and maintain your investigation quietly? Your choice determines whether this person becomes an informant or an enemy — and whether Sunspire Haven's resource hemorrhage can be challenged or continues unchecked.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal('consequence', `Confronted ${npc.name} (${npc.role}) about syndicate extraction participation`, `sunspire-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. DISCOVERY MOMENT: EXTERNAL COORDINATION SOURCE
  {
    label: "Find the evidence that proves Sunspire Haven's syndicate resource extraction is coordinated from outside — discover the external interest controlling the system.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of extraction');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Behind the diverted resources and artificial scarcity, you find the thread that leads outside Sunspire Haven. Courier receipts from northern territories with instructions to maximize resource extraction and minimize community distribution. Financial transfers paying the syndicate leadership for cooperation. Orders for "family atomization protocols" designed to prevent collective resistance. Sunspire Haven's community is being systematically harvested by external interests using the syndicate as a management apparatus. Someone in the northern territories — or someone allied with them — is coordinating the resource extraction and social destruction. The conspiracy is coordinated, resourced, and external.`;
        G.stageProgress[1]++;
        addJournal('discovery', 'Origin source of Sunspire Haven extraction identified as external coordination', `sunspire-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach the evidence of external coordination, you're intercepted. Someone stops you directly and makes it clear that pursuing this further will result in your removal from Sunspire Haven or worse. You've discovered pieces, but the full external coordination remains hidden — and now you're marked as a direct threat.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation interrupted by external coordination operators', `sunspire-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points beyond Sunspire Haven. Courier routes reference "northern resource authorities." Extraction orders show external signature. The conspiracy is larger than the community itself. You don't know the exact source yet, but you know the resource extraction is being directed from outside Sunspire Haven's borders.`;
        addJournal('discovery', 'External coordination of Sunspire Haven extraction confirmed', `sunspire-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `You find pieces suggesting external involvement, but the origin source remains obscured. Whoever's orchestrating this has hidden their hand carefully.`;
        addJournal('investigation', 'External coordination suspected but source not yet identified', `sunspire-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: SIGNAL-DAMPING CONTAINER
  {
    label: "Examine the sealed container recovered from the disrupted convoy — study its construction and the markings on the interior lining.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'analyzing signal-damping container');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The interior lining is composite — ash-resin layered over a fine copper mesh. Signal damping, but not commercial. The precision exceeds anything in trade-grade shielding. A craftmark on the base reads a three-digit code followed by what looks like a municipal stamp from Shelkopolis's outer fabrication district. This container was manufactured specifically and recently. Someone ordered it custom for a payload they didn't want detected in transit.`;
        if (!G.flags) G.flags = {};
        G.flags.analyzed_signal_container = true;
        addJournal('investigation', 'Signal-damping container: custom-fabricated, Shelkopolis craftmark, military-grade shielding', `sunspire-container-${G.dayCount}`);
      } else {
        G.lastResult = `The container construction is unusual — heavier than it looks, with a layered interior. You recognize the material isn't standard trade shielding but can't place the specification without a reference guide.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. CLUE: CONVOY ROUTE DEVIATION
  {
    label: "Pull the convoy route logs and compare the filed route to the route the convoy actually traveled.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'mapping convoy route deviation');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `Filed route: eastern trade road, standard checkpoint stops. Actual route: a two-hour deviation northwest, avoiding the Warden Order post at Milegate. The convoy wasn't disrupted on its filed path — it was disrupted on a detour that was never officially logged. Whoever organized this knew the route, arranged the deviation, and arranged the interception at a point where no Warden checkpoint would have record of the convoy passing.`;
      if (!G.flags) G.flags = {};
      G.flags.found_convoy_route_deviation = true;
      addJournal('investigation', 'Convoy route deviation: off-record detour avoided Warden checkpoint at Milegate', `sunspire-route-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ARCHETYPE-GATED: READING THE AFTERMATH
  {
    label: "Study the site where the convoy disruption occurred — read what the scene tells you that the official report didn't.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reading disruption site');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The positions of the guards when they fell tell you this wasn't a surprise attack — they were already moving into defensive formation when contact happened. They knew something was wrong before the interception began. The convoy security was compromised from inside. Someone on the convoy itself signaled the moment.`;
      } else if (arch === 'magic') {
        G.lastResult = `Residue on the ground near the container position suggests the damping material had been activated before the convoy stopped. The container was already shielded before the disruption happened. This wasn't an ambush on a moving target — it was a scheduled handoff staged to look like a hijacking.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The site has been cleaned. Not badly — it looks natural — but too natural. Wheel ruts that should be there aren't. The ground is even where a heavy container would have been dragged. Someone came back after the disruption and removed traces. Professional scene-clearing, done in daylight.`;
      } else {
        G.lastResult = `Two supply crates are still at the site, undisturbed. The disruption was selective — the sealed container was taken; everything else was left. This wasn't a raid on the convoy. It was retrieval of one specific item. The rest of the cargo was never the point.`;
      }
      addJournal('investigation', 'Convoy disruption site: selective retrieval confirmed, scene-cleared, inside contact suspected', `sunspire-site-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. FACTION SEED: WARDEN ORDER CONTACT
  {
    label: "Report the convoy route deviation to the Warden Order post at Sunspire's north gate.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'making Warden Order contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Captain-Adjutant Sera receives your report with calibrated attention. She asks three clarifying questions — all about the container, none about the disruption itself. "We're aware of the deviation category," she says finally. "What you've added is the Milegate confirmation." She gives you a reference number and tells you an inquiry is open. She doesn't tell you what the inquiry is about. The Warden Order knows more than they're sharing.`;
        if (!G.flags) G.flags = {};
        G.flags.met_warden_order_sunspire = true;
        G.factionHostility.warden_order += 1;
        addJournal('faction', 'Warden Order Captain-Adjutant Sera: confirmed awareness of container category, open inquiry exists', `sunspire-warden-${G.dayCount}`);
      } else {
        G.lastResult = `The duty officer takes your report by rote. It goes into a form stack. No one follows up. Either the Warden Order isn't concerned with this convoy or they've been told not to be.`;
        if (!G.flags) G.flags = {};
        G.flags.attempted_warden_order_sunspire = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 25. ATMOSPHERE: THE SIGNAL TOWER
  {
    label: "Climb to Sunspire's signal tower at dusk — observe the pattern of lights and what they're actually communicating.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 53,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(53, 'reading signal tower light pattern');

      G.lastResult = `The tower keeper lights three sequences: north, east, south. Standard all-clear. But between the second and third, there's a half-beat pause that isn't in the protocol guide. You've seen that pause three times today. It means something — not to you, not yet. But whoever reads these lights from the road already knows. Sunspire is communicating in a layer you don't have the key to.`;
      addJournal('discovery', 'Signal tower: undocumented pause pattern — secondary communication channel suspected', `sunspire-tower-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 26. PERSONAL ARC: DOCUMENT THE CONTAINER
  {
    label: "Make a complete technical sketch of the container and its craftmark before it's catalogued and locked away.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 62,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(62, 'documenting container specifications');
      if (!G.flags) G.flags = {};

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Your sketch captures dimensions, material layering, and the craftmark precisely — enough that a fabricator could identify the manufacture source from the drawing alone. You copy it twice and cache the second in your personal kit. Whatever happens to the physical container, you have its record.`;
        G.flags.container_documentation = true;
        addJournal('consequence', 'Container documentation completed and secured — craftmark recorded for later identification', `sunspire-document-${G.dayCount}`);
      } else {
        G.lastResult = `You get most of it — dimensions, general construction — but the craftmark is already partially obscured by handling. What you have is better than nothing.`;
        G.flags.container_documentation = true;
      }
      G.recentOutcomeType = 'craft'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE CONVOY GUARD SURVIVOR
  {
    label: "Find the convoy guard who survived the disruption and is still recovering at the waystation infirmary.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'interviewing convoy survivor');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Tennen is still concussed but lucid. "The second driver — I didn't know him. New hire, came on three days before the run. He knew the deviation before the convoy coordinator announced it. I remember thinking: how does he know?" He pauses. "The interception didn't come from the road. It came from inside. That driver was the contact." He's told the Warden Order this. They thanked him and told him to rest. The driver can't be found.`;
        if (!G.flags) G.flags = {};
        G.flags.met_tennen_guard = true;
        addJournal('contact', 'Convoy guard Tennen: inside contact was the second driver, Warden Order informed but took no visible action', `sunspire-tennen-${G.dayCount}`);
      } else {
        G.lastResult = `Tennen is drifting in and out. He gives you fragments — a wrong turn, a man he didn't recognize — but can't hold the thread. Come back tomorrow when the concussion clears.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "The waystation innkeeper mentions a traveler asking about the convoy disruption — their description of events was more detailed than any official report.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 58,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(58, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"Military bearing," the innkeeper says. "Asked whether the guards fired before or after the container was moved. Not whether they fired at all — specifically in what order. Someone with tactical training, working out a timeline." They knew what questions to ask. That means they already know what happened.`;
      } else if (arch === 'magic') {
        G.lastResult = `"Carried a measuring instrument — brass, cylindrical," the innkeeper says. "Held it near the container storage area before asking questions. I thought it was for surveying." A resonance reader or material sensor. This person was characterizing the container's damping field, not investigating the disruption. They came for the container specifically.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"Didn't ask about the disruption at all," the innkeeper says. "Just asked who'd been asking about it. Named three people by description before they'd been introduced." A counter-investigator. They were mapping inquirers, not events. Your name isn't on their list yet — but it will be.`;
      } else {
        G.lastResult = `"Spoke to every staff member separately," the innkeeper says. "Different questions each time. I only put it together afterward — they were building a complete picture of everyone involved." Methodical social mapping. They have a profile of this investigation's participants already assembled.`;
      }

      G.lastResult += ` This person was here before you. They know what you're looking for.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative confirmed investigating Sunspire convoy disruption ahead of you', `sunspire-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES = SUNSPIRE_HAVEN_STAGE1_ENRICHED_CHOICES;
