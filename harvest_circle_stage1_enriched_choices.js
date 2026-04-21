/**
 * HARVEST CIRCLE STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to grain distribution, festival trade, and family-controlled commerce corruption
 * Generated for: Fair market exchange vs family duty, spoilage urgency vs quality care, festival unity vs economic pressure
 * Each choice: 65-80 XP, grounded in grain steward politics and patron-family hierarchy
 */

const HARVEST_CIRCLE_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. GRAIN MEASURER: QUOTA MANIPULATION
  {
    label: "Question Svala Coalward, the Grain Measurer — are harvest quotas being systematically altered, and have measurement standards shifted in ways that favor certain families?",
    tags: ['Investigation', 'NPC', 'Grain', 'Quotas', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading quota manipulation patterns');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Grain Measurer Svala speaks quietly in the threshing grounds. "Quota measurement used to follow consistent standards — we weighed grain the same way for every patron family. Now I'm receiving directives about how to measure certain harvests. Not suggestions — instructions. Harvests from connected families show lighter official weights, receiving credit for more grain than actually delivered. Independent farmer harvests are measured with extra scrutiny, sometimes resulting in lower official counts. I'm being asked to use measurement as a tool to redistribute quota advantage toward certain families. This is systematic quota theft hidden inside measurement procedure."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Grain Measurer revealed corrupted quota system', `harvest-quotas-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Svala becomes guarded. "Grain measurement is Harvest Circle business. I can't discuss quota procedures with outsiders." They distance themselves, and harvest authorities take note of your inquiry.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Grain Measurer now protective of quota procedures', `harvest-quotas-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Svala admits recent quota measurements have been complex and not all families are satisfied with results. "Grain weights can be difficult to assess consistently," they say, though the explanation lacks conviction.`;
        addJournal('investigation', 'Grain Measurer confirmed inconsistent quota measurements', `harvest-quotas-pressure-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. MARKET BROKER: PRICE MANIPULATION
  {
    label: "Consult with Varik Stonecarve, the Market Broker — has price setting been altered, and are certain families getting favorable pricing while others face price pressure?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Prices', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering price manipulation');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Market Broker Varik shows you price records that have been systematically altered. Festival pricing that should be equal for all families has been modified. Prices for connected family grain are artificially lowered, increasing their festival market advantage. Prices for independent farmer grain are inflated, reducing their market competitiveness. "This is market rigging," Varik says quietly. "Someone's using the broker system to redistribute economic advantage toward certain families. Independent traders are being priced out of festival competition. The market that should distribute grain fairly is being weaponized to consolidate family power."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Market Broker revealed price manipulation system', `harvest-prices-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Varik becomes suspicious. "Why do you care about our pricing? Are you documenting for competing families?" Word spreads through the market community about your price inquiry.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Market Broker spreading suspicion about price investigation', `harvest-prices-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Varik acknowledges pricing has been complex lately. "Market management can be challenging," they suggest. The pricing system feels deliberately opaque.`;
        addJournal('investigation', 'Market Broker confirmed non-standard pricing practices', `harvest-prices-evasive-${G.dayCount}`);
      } else {
        G.lastResult = `Varik is protective of pricing records. "Market rates are sensitive Harvest Circle business." Without broker authorization, you can't verify pricing details.`;
        addJournal('investigation', 'Pricing records blocked without broker authorization', `harvest-prices-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. PROTECTOR OF MAGICAL FORESTS: LAND CORRUPTION
  {
    label: "Interview Elyra Mossbane, Protector of magical forests and plains — are protective barriers being weakened, and has land stewardship been compromised?",
    tags: ['Investigation', 'NPC', 'Land', 'Protection', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading land protection corruption patterns');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Protector Elyra is deeply concerned. "Land protection barriers that shield Harvest Circle from agricultural blight and pest infestation are being deliberately weakened. Some protected areas are receiving minimal maintenance while lands connected to powerful families get full protection. I'm being ordered to prioritize protection based on family influence rather than agricultural need. Spoilage rates are rising in independent farmer fields while connected family crops remain protected. Someone's weaponizing land stewardship to create agricultural advantage for certain families. This threatens the foundation of regional stability."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Land Protector revealed corrupted land stewardship system', `harvest-land-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Elyra becomes protective. "Land stewardship is sacred work. You have no right to question our protection methods." They turn away, making it clear land management is off-limits to your inquiry.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Land Protector forbade further stewardship questions', `harvest-land-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Elyra admits land protection has been difficult to maintain. "Agricultural pressure varies by location," they note. Protection practice appears intentionally varied.`;
        addJournal('investigation', 'Land Protector confirmed uneven protection allocation', `harvest-land-biased-${G.dayCount}`);
      } else {
        G.lastResult = `Elyra is protective of stewardship practices. "Land protection requires environmental knowledge." Without agricultural expertise, you can't assess protection details.`;
        addJournal('investigation', 'Land stewardship blocked without agricultural access', `harvest-land-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. STORAGE KEEPER: GRAIN DIVERSION
  {
    label: "Speak with the Storage Keeper about recent grain storage management — are stored grain reserves being diverted, and has storage allocation been secretly manipulated?",
    tags: ['Investigation', 'NPC', 'Storage', 'Resources', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering grain storage diversion');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Storage Keeper pulls you into the grain stores. "Grain inventory records are being falsified. Stores allocated for festival distribution are being secretly diverted to private family warehouses. Storage space reserved for independent farmer reserves is being restricted. Someone is redirecting community grain supplies to benefit connected families. Festival provisions that should be equitably distributed are disappearing into private channels. Storage allocation, which should protect the entire community during shortage, is being weaponized to concentrate resources toward certain families. This is systematic theft of shared resources."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Storage Keeper revealed grain diversion conspiracy', `harvest-storage-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Storage Keeper clams up immediately. "Storage records are confidential and protected. I don't discuss grain management with investigators." Their protective wall is instant. Storage authorities are now aware of your inquiry.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Storage authorities warned about grain inventory investigation', `harvest-storage-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Storage Keeper admits grain inventory has been complex lately. "Storage management can be challenging," they suggest. The allocation system feels deliberately opaque.`;
        addJournal('investigation', 'Storage Keeper confirmed non-standard inventory practices', `harvest-storage-evasive-${G.dayCount}`);
      } else {
        G.lastResult = `Storage Keeper is protective of grain records. "Storage management is restricted to keeper authority." Without access credentials, you can't observe inventory details.`;
        addJournal('investigation', 'Grain records blocked without storage authorization', `harvest-storage-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. FESTIVAL COORDINATOR: CELEBRATION MANIPULATION
  {
    label: "Consult with the Festival Coordinator about recent festival planning — is festival distribution being manipulated, and has celebration unity been corrupted?",
    tags: ['Investigation', 'NPC', 'Festival', 'Distribution', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering festival manipulation');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Festival Coordinator speaks with frustration. "Festival celebration used to distribute harvest bounty equally — all families shared in the provisions, all were honored equally. Now I'm receiving directives about festival distribution. Connected families receive enhanced portions disguised as 'premium offerings.' Independent families receive minimal provisions disguised as 'standard shares.' Festival ceremonies are being rewritten to emphasize some family loyalty over collective unity. The celebration that should reinforce community bond is being weaponized to reinforce family hierarchy. This is systematically dividing Harvest Circle through corrupted festival."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Festival Coordinator revealed corrupted festival distribution system', `harvest-festival-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Coordinator becomes guarded. "Festival planning is community business. I can't discuss distribution procedures with outsiders." They distance themselves, and festival authorities take note of your inquiry.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Festival Coordinator now protective of festival procedures', `harvest-festival-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Coordinator admits festival planning has been complex lately. "Festival management can be challenging," they suggest. Distribution appears intentionally varied.`;
        addJournal('investigation', 'Festival Coordinator confirmed inconsistent festival allocations', `harvest-festival-biased-${G.dayCount}`);
      } else {
        G.lastResult = `Coordinator is protective of festival procedures. "Festival planning is community discretion." Without official festival role, you can't access distribution details.`;
        addJournal('investigation', 'Festival procedures blocked without community authorization', `harvest-festival-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. RECORD KEEPER: DOCUMENT FALSIFICATION
  {
    label: "Interview Farlan Inkshade, Academic and recordkeeping steward — are harvest records being falsified, and has documentation been manipulated to hide economic redistribution?",
    tags: ['Investigation', 'NPC', 'Records', 'Documents', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading record falsification patterns');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Record Keeper Farlan is deeply troubled. "Harvest documentation that should be objective record is being systematically falsified. Grain delivery records are being rewritten. Quota fulfillment documents are being altered. Price records show modifications after signing. Someone is literally rewriting economic history to hide redistribution. Transactions that actually occurred are being documented as different amounts. Evidence of quota manipulation is being hidden through false record keeping. The documentary foundation that prevents economic corruption is being weaponized as the tool of corruption itself."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Record Keeper revealed document falsification system', `harvest-records-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Farlan becomes protective. "Economic records are sensitive harvest business. You have no right to question our documentation." They turn away, making it clear records are off-limits.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Record Keeper forbade economic documentation inquiry', `harvest-records-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Farlan admits harvest records have been modified recently. "Documentation procedures have been updated," they note evasively. Record-keeping practice appears intentionally changed.`;
        addJournal('investigation', 'Record Keeper confirmed recent documentation procedure changes', `harvest-records-changed-${G.dayCount}`);
      } else {
        G.lastResult = `Farlan is protective of economic records. "Harvest documentation requires specialized knowledge." Without economic expertise, you can't assess record accuracy.`;
        addJournal('investigation', 'Economic records blocked without recordkeeping access', `harvest-records-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. INSPECTOR: QUALITY SUPPRESSION
  {
    label: "Speak with Garren Ashmason, Night-Lantern Inspector — are grain quality standards being lowered, and has inspection been compromised to hide spoilage?",
    tags: ['Investigation', 'NPC', 'Quality', 'Inspection', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering quality inspection corruption');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Inspector Garren speaks quietly in the darkness. "I inspect grain for spoilage and quality degradation. Then the marks disappear from records. Or I'm ordered to pass obviously spoiled grain. The inconsistency is intentional. Grain from connected families gets lenient inspection. Independent farmer grain gets scrutinized for any variation. I've been told directly: quality inspection is now about family loyalty, not actual grain condition. Spoiled grain from certain families is being distributed while quality grain from others is rejected. This puts entire communities at risk of illness and famine."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Inspector revealed corrupted quality system', `harvest-quality-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Inspector becomes guarded. "Quality inspection is confidential work. I can't discuss grain assessment with outsiders." They distance themselves, and inspection authorities take note.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Inspector now protective of grain quality procedures', `harvest-quality-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Inspector admits quality assessment has been difficult. "Grain condition can vary," they suggest. Inspection standards feel deliberately inconsistent.`;
        addJournal('investigation', 'Inspector confirmed inconsistent quality assessment', `harvest-quality-evasive-${G.dayCount}`);
      } else {
        G.lastResult = `Inspector is protective of quality standards. "Grain inspection requires specialized knowledge." Without inspection training, you can't assess grain quality.`;
        addJournal('investigation', 'Grain quality assessment blocked without inspection access', `harvest-quality-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. DISPUTE MEDIATOR: CONFLICT RESOLUTION FAILURES
  {
    label: "Consult with Velrik Durnshade, Guild dispute mediator — are family disputes being resolved fairly, and has mediation been weaponized to suppress dissent?",
    tags: ['Investigation', 'NPC', 'Mediation', 'Conflicts', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering mediation corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Mediator Velrik speaks with difficulty. "Family disputes used to be resolved by examining grievance and applying fairness. Now I receive directives about outcomes before mediation begins. Disputes involving connected families receive rulings favorable to power. Disputes brought by independent farmers are systematically disadvantaged. I'm being asked to use conflict mediation as a tool to consolidate family power. Those who complain about manipulation are isolated through biased mediation outcomes. The mechanism that should provide justice is being weaponized to enforce compliance."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Mediator revealed corrupted conflict resolution system', `harvest-mediation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Mediator becomes hostile. "Mediation decisions are confidential family matters. You have no right to question our rulings." They report your inquiry. Mediation is now closed to your investigation.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Mediator prohibited further conflict resolution questions', `harvest-mediation-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Mediator admits family disputes have been difficult to resolve. "Family interests are increasingly conflicted," they note. Mediation outcomes feel deliberately favored.`;
        addJournal('investigation', 'Mediator confirmed biased conflict resolution patterns', `harvest-mediation-biased-${G.dayCount}`);
      } else {
        G.lastResult = `Mediator is protective of mediation decisions. "Family confidentiality is essential." Without family authorization, you can't access mediation details.`;
        addJournal('investigation', 'Family mediation blocked without authorization', `harvest-mediation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. GRAIN SYSTEM HIERARCHY: AUTHORITY REORGANIZATION
  {
    label: "Analyze the grain steward hierarchy — has the formal structure been modified, and are decision powers being centralized within patron families?",
    tags: ['Investigation', 'Structure', 'Hierarchy', 'Authority', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'grain hierarchy analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The grain steward hierarchy has been systematically restructured. Positions that were meant to be independent have been consolidated under patron family authority. Councils that used to hold collective decision power have been made advisory-only. Officials who disagreed with recent changes have been replaced with family loyalists. The organization is being transformed from distributed collective governance into centralized family control. Power is concentrating rapidly around connected families.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Structure analysis revealed centralized power consolidation', `harvest-structure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of grain hierarchy draws attention from patron families. You're questioned about your interest in organizational structure. Your investigation is now flagged as unauthorized structural analysis.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Patron families alerted to hierarchy analysis inquiry', `harvest-structure-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The hierarchy shows recent changes. Some positions appear to have shifted, and authority lines have been modified. The governance structure has been reorganized.`;
        addJournal('investigation', 'Grain hierarchy modifications confirmed', `harvest-structure-modified-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. FARMING NETWORKS: FAMILY DISPLACEMENT
  {
    label: "Map active farming families in Harvest Circle — who's been removed from grain networks, and who's gaining unprecedented access to quota and resources?",
    tags: ['Investigation', 'Networks', 'Farming', 'Displacement', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'farming family network displacement mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The farming family network is being systematically recomposed. Independent farmers who were previously active are being excluded through denials of quota allocation, storage access, and festival participation. Meanwhile, farmers allied with patron families are gaining unprecedented access to resources and favorable quota treatment. The economic foundation of Harvest Circle is being remapped to concentrate agricultural power among connected families. This is economic restructuring disguised as normal harvest operations.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Network analysis revealed deliberate family displacement', `harvest-network-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your mapping of farming family networks draws attention from family authorities. You're questioned about your interest in farming patterns. The farming community is now aware you're analyzing their networks.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Family authorities alerted to network analysis', `harvest-network-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Recent family list changes show removals and additions. Some previously active farmers have disappeared from records. New farmers with family connections have gained rapid prominence. The farming composition has been intentionally restructured.`;
        addJournal('investigation', 'Farming family composition changes confirmed', `harvest-network-modified-${G.dayCount}`);
      } else {
        G.lastResult = `Farming family networks show activity changes but full understanding requires deeper family interviews and quota records.`;
        addJournal('investigation', 'Family displacement analysis incomplete', `harvest-network-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. SPOILAGE SYSTEM: DEGRADATION ACCELERATION
  {
    label: "Examine how spoilage rates are changing in Harvest Circle — what grain is being allowed to degrade, and where are losses being artificially created?",
    tags: ['Investigation', 'Spoilage', 'Degradation', 'Analysis', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'spoilage analysis');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Spoilage rates are being systematically manipulated. Grain from independent families is being stored in conditions that accelerate spoilage — inadequate protection, poor ventilation, minimal pest prevention. Same grain from connected families is stored in optimal conditions. "Loss reports" are being filed to hide spoilage for certain families while maximizing reported losses for others. Independent farmers are losing harvests to manufactured spoilage while patron family grain remains protected. Spoilage is being weaponized to concentrate available resources.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Spoilage analysis revealed artificial degradation system', `harvest-spoilage-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of spoilage patterns draws attention from storage authorities. You're questioned about your interest in grain degradation. Storage operations are now monitoring your investigation.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Storage authorities alerted to spoilage analysis', `harvest-spoilage-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Spoilage rates show unusual patterns. Some grain is degrading faster than others. Storage conditions appear deliberately varied.`;
        addJournal('investigation', 'Spoilage pattern modifications detected', `harvest-spoilage-modified-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. FAMILY POWER TRACKING: WHO'S RISING
  {
    label: "Document which families are gaining unprecedented power in Harvest Circle — who's being positioned for authority, and what methods are enabling their rapid ascension?",
    tags: ['Investigation', 'Power', 'Ambition', 'Tracking', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'family power pattern mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Certain families are being systematically elevated into positions of unusual power. Minor farming families with no prior governance experience are now controlling quota allocation. Merchant families with limited agricultural background are advising on festival policy. Families with limited community history are being positioned as quota arbiters. These families are being elevated through corrupted systems — they're not earning authority through tradition or merit. They're being installed. Their rapid power acquisition depends on systematic corruption of institutions that normally regulate family authority advancement.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Family power analysis revealed orchestrated authority installation', `harvest-power-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your documentation of family power rises draws attention from patron families. You're questioned about your interest in family advancement. Your analysis is now flagged as unauthorized power structure investigation.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Patron families alerted to power analysis', `harvest-power-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Certain families are clearly gaining rapid authority. Power advancement appears to follow unusual patterns disconnected from traditional merit progression. Family elevation is visibly accelerated.`;
        addJournal('investigation', 'Family authority advancement changes confirmed', `harvest-power-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Family power changes exist but full understanding requires deeper access to patron family internal politics.`;
        addJournal('investigation', 'Family power tracking incomplete', `harvest-power-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. QUOTA DEPENDENCY: CONTROL SYSTEM
  {
    label: "Document how quota systems are weaponizing farmer dependency — what groups are most vulnerable to quota pressure, and how is compliance being enforced?",
    tags: ['Investigation', 'Quotas', 'Dependency', 'Control', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'quota dependency system documentation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Quota dependency is being systematically weaponized. Independent farmers depend on quota allocation for economic survival — they're forced to cooperate through threat of quota denial. Farmers depend on storage access for harvest protection — they're pressured through storage restriction. Communities depend on festival distribution for seasonal food security — they're isolated through distribution exclusion. The quota system is being transformed into a control apparatus. Every farmer is trapped within dependencies that force compliance with corrupted quota authority.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Quota analysis revealed systematic dependency weaponization', `harvest-dependency-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your documentation of quota vulnerability makes authorities nervous. Patron family representatives warn you that analyzing quota dependency is dangerous. Your investigation is now marked as threat to quota system.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Authorities warned about quota vulnerability analysis', `harvest-dependency-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Farmers show clear signs of quota dependency and fear. Many are clearly exposed to pressure through quota decisions. System-wide vulnerability is visible but requires broader access for complete understanding.`;
        addJournal('investigation', 'Quota dependency and fear patterns confirmed', `harvest-dependency-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Quota vulnerability exists but full understanding requires deeper interviews and records access.`;
        addJournal('investigation', 'Quota dependency analysis incomplete', `harvest-dependency-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. FESTIVAL MANIPULATION: UNITY WEAPONIZATION
  {
    label: "Document how festival systems are being weaponized to divide community — what cultural unity is being destroyed, and how is celebration being turned into hierarchy enforcement?",
    tags: ['Investigation', 'Festival', 'Unity', 'Division', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'festival weaponization mapping');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Festival systems are being artificially modified to divide community. Celebration that should reinforce collective identity is being restructured to emphasize family hierarchy. Connected families receive prominent roles in ceremonies while independent farmers are marginalized. Distribution that should be equal is being made hierarchical. Festival language is being rewritten to emphasize loyalty to specific families over community unity. The shared cultural practice that bound Harvest Circle together is being weaponized to enforce family power structure.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Festival analysis revealed cultural division system', `harvest-unity-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your tracking of festival changes draws attention from festival authorities. You're questioned about your interest in celebration structure. Festival operations are now monitoring your analysis.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Festival authorities alerted to celebration analysis', `harvest-unity-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Festival practices show unusual modifications. Some ceremonies emphasize family loyalty aspects previously absent. Celebration structure appears intentionally changed.`;
        addJournal('investigation', 'Festival modification patterns confirmed', `harvest-unity-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Festival variations exist but complete understanding requires deeper community access and ceremony analysis.`;
        addJournal('investigation', 'Festival manipulation analysis incomplete', `harvest-unity-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP ESCALATION (4 CHOICES) ==========

  // 15. FIELD RUMOR: FARMER WHISPERS
  {
    label: "Gather gossip among farmers in the fields — what stories are farming families telling each other about quota changes and economic pressure?",
    tags: ['Investigation', 'Rumor', 'Farming', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing farming narrative');
      G.stageProgress[1]++;

      const rumor = ['the quota measurer is falsifying weights to help connected families', 'independent farmers are being systematically frozen out of grain distribution', 'spoilage is being artificially created to destroy independent farmer harvests', 'someone is stealing grain from storage and sending it to outside families', 'festival distribution is being rigged to favor certain families over community'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `The field whisper is: "${selected}." Farmers repeat it with varying certainty. Some claim direct experience, others passing secondhand accounts. But the collective narrative is consistent: Harvest Circle's grain system is being corrupted from within. Farmers are aware something's being deliberately done to harvest fairness, even if they can't articulate the full conspiracy yet.`;
      addJournal('investigation', `Farming rumor gathered: "${selected}"`, `harvest-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. MARKET RUMOR: MERCHANT WHISPERS
  {
    label: "Gather gossip in the market and festival squares — what stories are merchants and traders telling each other about price manipulation and family favoritism?",
    tags: ['Investigation', 'Rumor', 'Commerce', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing merchant narrative');
      G.stageProgress[1]++;

      const rumor = ['market prices are being set to favor certain families', 'broker rates are being manipulated to destroy independent merchant competitiveness', 'festival pricing is rigged so connected families always profit', 'quality inspection is being weaponized against merchants who refuse family allegiance', 'grain distribution is controlled by family influence rather than fair exchange'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `The market whisper is: "${selected}." Merchants repeat it with varying certainty. Some have experienced pricing manipulations themselves, others passing theories. But the collective narrative is clear: Harvest Circle's market is being deliberately corrupted. Traders are aware economic exchange is being weaponized through family control, even if they can't prove the full system yet.`;
      addJournal('investigation', `Market rumor gathered: "${selected}"`, `harvest-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. INSTITUTIONAL CRACK: CORRUPTION PROOF COMPILATION
  {
    label: "Compile documented evidence that proves grain and festival systems are being systematically corrupted — show the paper trail linking corruption to coordinated family strategy.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Conspiracy', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing harvest system conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `You piece together the evidence: grain records showing falsified quotas in a single hand, storage manifests with systematic diversions, market prices predetermined before official announcement, festival allocation lists showing family hierarchy applied throughout, quality inspection marks that disappear from official records. The paper trail is clear: Harvest Circle's grain and festival systems are being systematically corrupted as part of coordinated strategy. The quota system, storage, market, inspection, and festival are all being weaponized simultaneously to concentrate power among connected families. This is institutional capture through economic manipulation.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Harvest system corruption conspiracy documented with proof', `harvest-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you compile harvest system corruption proof, you're intercepted. A family representative makes it clear that exposing grain system procedures will result in your removal from Harvest Circle. You've discovered pieces, but full proof remains hidden — and now you're marked as a threat.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Harvest system corruption inquiry directly intercepted', `harvest-proof-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points to systematic harvest system corruption. Inconsistencies between quotas and deliveries, unexplained price changes, resource diversions — it's compelling but not conclusively proven. Coordination is suspected but not documented.`;
        addJournal('investigation', 'Harvest system corruption strongly suggested by evidence', `harvest-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `You find pieces suggesting corruption of grain and festival systems, but proving coordinated family conspiracy requires additional evidence and external communication not yet accessible.`;
        addJournal('investigation', 'Corruption proof incomplete without comprehensive records', `harvest-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. MORAL PRESSURE: FAMILY LOYALTY COMPROMISE CHOICE
  {
    label: "Confront a Harvest Circle official who's complicit in system corruption — demand explanation and decide whether to protect them or expose their role.",
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
        { name: 'Grain Measurer Svala Coalward', role: 'quota keeper', fear: 'They threatened to exclude my family from festival distribution if I spoke out. My children depend on that provision.' },
        { name: 'Market Broker Varik Stonecarve', role: 'price setter', fear: 'I wanted to resist but they said if I exposed price manipulation, they\'d destroy my family\'s market standing permanently.' },
        { name: 'Festival Coordinator Kess', role: 'celebration keeper', fear: 'They made it clear that exposing festival manipulation would result in my family\'s exclusion from all community participation.' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `You confront ${npc.name}. They crumble under pressure. "${npc.fear}" They're trapped, complicit, and frightened. You must decide: Do you protect them and maintain your investigation quietly? Do you expose them to stop the corruption system? Your choice determines whether this person becomes an informant or enemy — and whether Harvest Circle's corruption can be challenged from within or continues unchecked.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal('consequence', `Confronted ${npc.name} (${npc.role}) about system corruption participation`, `harvest-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. DISCOVERY MOMENT: EXTERNAL COORDINATION SOURCE
  {
    label: "Find the evidence that proves Harvest Circle's corruption is being coordinated from outside — discover the external hand orchestrating family power consolidation.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of harvest system corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Behind the corrupted quota records, diverted grain, manipulated prices, and weaponized festivals, you find the thread leading outside Harvest Circle. Courier manifests reference cities in northern territories with detailed instructions for "grain system restructuring." Merchant house letters from external allied contacts directing family elevation. Financial transfers originating from north-aligned entities. Harvest Circle's grain system is being systematically captured by external interests. Someone in the northern territories — or someone allied with them — is using Harvest Circle's own institutions and families to extract agricultural resources and consolidate control. The conspiracy is coordinated, resourced, and external.`;
        G.stageProgress[1]++;
        addJournal('discovery', 'Origin source of Harvest Circle corruption identified as external coordination', `harvest-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach evidence of external coordination, you're intercepted directly. Someone stops you and makes clear that pursuing this further will result in your removal from Harvest Circle or worse. You've discovered pieces, but full external coordination remains hidden — and now you're marked as direct threat.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation intercepted by external coordination operators', `harvest-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points beyond Harvest Circle. Courier routes reference "northern family authorities." Resource orders show external authorization. The conspiracy is larger than Harvest Circle itself. You don't know exact source yet, but you know corruption is being directed from outside Harvest Circle's borders.`;
        addJournal('discovery', 'External coordination of Harvest Circle confirmed', `harvest-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `You find pieces suggesting external involvement, but the origin source remains obscured. Whoever's orchestrating this has hidden their coordination carefully.`;
        addJournal('investigation', 'External coordination suspected but source not yet identified', `harvest-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. CONSPIRACY COMPLETE: EXTERNAL INFLUENCE CONFIRMATION
  {
    label: "Confirm the full scope of external influence over Harvest Circle — document how northern interests are systematically controlling grain resources through corrupted local systems.",
    tags: ['Investigation', 'Origin', 'Conspiracy', 'External', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'confirming full external harvest conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The full conspiracy is now clear: Northern merchant authorities are systematically extracting Harvest Circle's agricultural surplus through corrupted systems. Grain quotas are being artificially inflated to force overproduction. Storage systems are being diverted to send grain north. Festival manipulation is preventing community awareness of shortage. Selected families are being elevated specifically to cooperate with external extraction. The entire Harvest Circle grain system has been weaponized as a resource extraction apparatus. Harvest Circle remains unaware its economic foundation is being deliberately harvested by external interests.`;
        G.stageProgress[1]++;
        addJournal('discovery', 'Full external conspiracy confirmed: Harvest Circle systematically harvested by northern interests', `harvest-conspiracy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you prepare to confirm the complete conspiracy, you're stopped directly by coordinated authorities. They make it abundantly clear that knowledge of the full scope will result in permanent removal or elimination. You've understood the scale of the conspiracy, but speaking it aloud will make you expendable.`;
        G.worldClocks.pressure += 3;
        addJournal('complication', 'Direct threat issued: Full conspiracy knowledge has made you dangerous to external operators', `harvest-conspiracy-caught-${G.dayCount}`);
      } else if (result.total >= 15) {
        G.lastResult = `The conspiracy scope becomes clear: External interests are systematically extracting Harvest Circle resources through corrupted grain systems. The scale is larger than you initially understood. This is coordinated regional resource harvesting.`;
        addJournal('discovery', 'Harvest Circle resource extraction conspiracy partially confirmed', `harvest-conspiracy-partial-${G.dayCount}`);
      } else {
        G.lastResult = `You understand significant corruption exists, but the full scope of external coordination remains partially obscured. The conspiracy extends further than local Harvest Circle corruption.`;
        addJournal('investigation', 'External conspiracy scope not fully understood', `harvest-conspiracy-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: ROUTING NUMBER ANOMALY
  {
    label: "Examine the Northern Provision Compact's routing records — check for grain shipments that don't match Harvest Circle's logged output.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'analyzing routing number anomalies');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Routing records show Harvest Circle shipped 340 tonnes of grain north in the past quarter under Provision Compact routing numbers. Harvest Circle's own production logs show 310 tonnes harvested. Thirty tonnes that weren't produced were apparently shipped. Either the production records are understating output, or routing numbers are being assigned to grain that originated elsewhere and is being laundered through Harvest Circle's Compact allocation. The routing number is creating false provenance.`;
        if (!G.flags) G.flags = {};
        G.flags.found_routing_anomaly = true;
        addJournal('investigation', 'Routing anomaly: 30 tonnes shipped without production record — false provenance laundering via Compact allocation', `harvest-routing-${G.dayCount}`);
      } else {
        G.lastResult = `You find the routing records but matching them against production logs requires both datasets simultaneously — you have access to one at a time, not both.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. CLUE: CHARTER MARK CONTAINER
  {
    label: "Track down the charter-marked storage container that was reported in the routing anomaly — find where it went.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracking charter mark container');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `One container in the routing sequence bears a secondary charter mark — not a Provision Compact mark, a trade house mark from a northern merchant consortium that shouldn't have access to Compact routing numbers. The container was last logged entering Harvest Circle's outbound staging area and exited under a Compact number. The charter mark identifies the originating party as someone outside the Provision Compact's membership register. External commercial interests are piggybacking on Harvest Circle's Compact allocation.`;
      if (!G.flags) G.flags = {};
      G.flags.found_charter_mark_container = true;
      addJournal('investigation', 'Charter mark container: northern merchant consortium using Harvest Circle allocation — unauthorized piggybacking', `harvest-charter-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ARCHETYPE-GATED: READING HARVEST CIRCLE
  {
    label: "Walk the harvest fields at dawn — read what the labor patterns tell you about what Harvest Circle is actually producing.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'reading harvest field labor patterns');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The field organization has changed. Workers move in sections with specific handoff points — not efficient for harvest yield, but efficient for oversight. Someone reorganized the fieldwork so that no individual worker sees the full output. Each worker sees their section. Nobody has a complete count. The organization is designed to prevent workers from knowing how much they're actually producing.`;
      } else if (arch === 'magic') {
        G.lastResult = `Two fields are being harvested at different rates despite identical soil and planting density. The western field is being harvested carefully — maximum yield extraction. The eastern field is being harvested quickly — speed over yield. The differential suggests the eastern field's output is going somewhere different, under a different time pressure. Two destinations, one harvest.`;
      } else if (arch === 'stealth') {
        G.lastResult = `A separate cart leaves the staging area every morning before the main convoy. It doesn't go to the central weighing station — it goes to the northern storage facility that feeds directly into the suspect routing chain. Pre-staging the laundered volume before official weighing begins. The separation happens before anyone creates a count.`;
      } else {
        G.lastResult = `A field overseer argues with a worker about quota credit. The worker says their section met target; the overseer says the records show otherwise. The worker is right — you watched the section work. The overseer is reading from a document that doesn't match what happened. The production records are being edited at point-of-collection.`;
      }
      addJournal('investigation', 'Harvest field analysis: segmented oversight blocks worker counts, differential harvesting rates, pre-staging of laundered volume', `harvest-fields-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. FACTION SEED: IRON COMPACT PROVISION CONTACT
  {
    label: "Speak to the Iron Compact's Provision Compact liaison stationed at Harvest Circle's distribution center.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Iron Compact contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Liaison Veth Karst manages Iron Compact allocation tracking for the Provision Compact's northern routes. She's aware of the routing anomaly — it's showing up as inventory discrepancy in Iron Compact's own logistics chain. "We're receiving grain attributed to Harvest Circle that we haven't formally purchased through Compact channels." She wants to understand the routing number source. She'll share Iron Compact's incoming cargo data if you'll share the charter mark identification. Commercial alignment, not ideological.`;
        if (!G.flags) G.flags = {};
        G.flags.met_iron_compact_harvest = true;
        G.factionHostility.iron_compact += 1;
        addJournal('faction', 'Iron Compact liaison Veth Karst: routing anomaly visible in Iron Compact logistics, willing to exchange cargo data', `harvest-iron-${G.dayCount}`);
      } else {
        G.lastResult = `The Iron Compact liaison is occupied with official Provision Compact business. Informal inquiry requires either a formal introduction or documented evidence of a compliance issue affecting Iron Compact interests.`;
        if (!G.flags) G.flags = {};
        G.flags.located_iron_compact_harvest = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 25. ATMOSPHERE: THE GRANARY STEPS AT MIDDAY
  {
    label: "Sit at the Granary Steps during the distribution hour — observe how food reaches the community.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing granary distribution');

      G.lastResult = `The distribution line moves efficiently. Families receive their allocation with practiced acceptance — no negotiation, no question. This is a community that's learned to take what it's given without asking why the amount changed from last season. Two seasons ago there would have been comparison, dispute, memory of better yields. That institutional memory has been quietly managed away. Harvest Circle's population has been acclimatized to reduced allocation so gradually they don't name it as reduction.`;
      addJournal('discovery', 'Granary Steps: community accepts reduced allocation without naming reduction — gradual acclimatization to scarcity', `harvest-granary-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 26. PERSONAL ARC: THE INDEPENDENT COUNTER
  {
    label: "Commission an independent count of a full harvest section — compare it against the official production log entry.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'running independent harvest count');
      if (!G.flags) G.flags = {};

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Your count: 12.4 tonnes from the west mid-field section. Official log entry for the same section, filed the same day: 10.8 tonnes. A 1.6 tonne discrepancy — 13 percent — on a single section. Scale that across the full harvest area and you have the routing anomaly's source. The production logs are being systematically understated at collection, and the difference is being routed out under the Provision Compact allocation numbers. You have proof now. A single section count against a single log entry.`;
        G.flags.independent_count_completed = true;
        addJournal('consequence', 'Independent count: 13% discrepancy between actual yield and official log — production understatement at collection confirmed', `harvest-count-${G.dayCount}`);
      } else {
        G.lastResult = `Your count is complicated by the segmented field layout — you can't get a complete section view without being inside the official measurement area, which requires authorization you don't have.`;
      }
      G.recentOutcomeType = 'craft'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE QUOTA WORKER WITH A MEMORY
  {
    label: "Find a worker who has been at Harvest Circle long enough to remember the pre-quota-change era — speak to them about what changed.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'interviewing long-tenure worker');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Elder fieldworker Nann has worked at Harvest Circle for thirty-one years. "The measurement changed about eighteen months ago. Before: we counted the full load at the central scale. After: section leads count first, then totals are reported to the central scale. The full load still goes on the central scale — but the reported number is the section leads' count, not the central weighing." She understands exactly what happened. "The central scale's reading stopped being the official number. Someone replaced the scale with the section leads." She kept three seasons of her own personal field tallies. They match the central scale readings. They don't match the official reports.`;
        if (!G.flags) G.flags = {};
        G.flags.met_nann_fieldworker = true;
        addJournal('contact', 'Fieldworker Nann: measurement system changed 18 months ago, has personal tallies matching central scale vs official reports', `harvest-nann-${G.dayCount}`);
      } else {
        G.lastResult = `The long-tenure workers have learned that comparison to previous seasons leads to arguments with supervisors. They've stopped making comparisons — at least to strangers.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "A Provision Compact transport driver mentions a researcher traveled with his convoy last week asking questions about routing documentation.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"Carried no visible weapons but moved like someone who expected to need them," the driver says. "Asked about the security on the northern leg — not what we were carrying, but whether anyone was watching the route." Someone is assessing the transit corridor's vulnerability, not investigating the cargo discrepancy. They're planning for movement, not documentation.`;
      } else if (arch === 'magic') {
        G.lastResult = `"Had a small instrument they used at the staging area before we departed," the driver says. "Checked the containers without touching them. Put the instrument away and made a note." A trace reading at the staging area — characterizing what passed through before us. They're working from physical evidence, not records.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"Never asked the same question twice," the driver says. "I noticed because I've had investigators travel with us before — they always circle back. This one moved forward, never repeated." Professional non-redundant questioning. They extract the maximum from each exchange and don't telegraph their data gaps. A trained information gatherer.`;
      } else {
        G.lastResult = `"Bought food for the whole convoy," the driver says. "Generous. Said it was company policy — they always fed the people they worked with. And everyone talked more than they should have. Generous gestures are very effective on a long drive." Social infrastructure deployment. They funded cooperation before asking for it.`;
      }

      G.lastResult += ` They were on the Harvest Circle routing thread last week. They're ahead of you.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative traveled with Provision Compact convoy last week — working Harvest Circle routing thread ahead of you', `harvest-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.HARVEST_CIRCLE_STAGE1_ENRICHED_CHOICES = HARVEST_CIRCLE_STAGE1_ENRICHED_CHOICES;
