/**
 * GUILDHEART HUB STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to guild arbitration and trade disputes
 * Generated for: Guild loyalty vs individual innovation, tradition vs progress, records corruption and arbitration poisoning
 * Each choice: 65-80 XP, grounded in guild politics and merchant coordination, layered wrongness reveal
 */

const GUILDHEART_HUB_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. GUILD ARBITRATOR: DISPUTE RESOLUTION FAILURES
  {
    label: "Question the guild arbitrator about recent dispute resolutions — are decisions favoring certain merchants unfairly, and has the arbitration process become unpredictable?",
    tags: ['Investigation', 'NPC', 'Guild', 'Justice', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading guild dispute patterns');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Guild Arbitrator Kesh is conflicted but speaks quietly. "Arbitration used to follow established precedent. Now I'm receiving orders from above about how specific disputes should be decided. Not suggestions — directives. Merchants who should win are told to accept losing judgments. Independent traders are systematically ruled against. I'm being asked to use arbitration as a tool to consolidate power, not settle disputes fairly. This corrupts the entire foundation of guild trust."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Arbitrator revealed corrupted dispute resolution system', `guildheart-arbitrator-disputes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The arbitrator becomes guarded. "Guild arbitration is confidential. I can't discuss specific cases with outsiders." They distance themselves professionally. Your inquiry into guild decisions is now noted.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Arbitrator now protective of guild confidentiality', `guildheart-arbitrator-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `The arbitrator admits recent disputes have been complex and not all merchants are satisfied with outcomes. "We do our best with available information," they say, though their certainty lacks conviction.`;
        addJournal('investigation', 'Arbitrator confirmed disputed resolution outcomes', `guildheart-arbitrator-pressure-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. MERCHANT REPRESENTATIVE: TRADE AGREEMENT CHANGES
  {
    label: "Consult with merchant representatives about recent changes to trade agreements — have terms been altered unilaterally, or are certain merchants being frozen out?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Agreements', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering trade agreement manipulation');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Merchant representative Ilya shows you trade agreements that have been modified after signing. Favorable terms for independent merchants have been quietly rewritten. Merchants with connections to the guild leadership receive amended agreements that are more generous than originals. "This is systematic manipulation," Ilya says quietly. "Someone's using the arbitration system to retroactively rewrite contracts in favor of their allies. Independent traders are being bound by terms they didn't agree to."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Merchant revealed trade agreement post-signing manipulation', `guildheart-merchant-agreements-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The merchant representative becomes suspicious of your questions about trade terms. "Why do you care about our agreements? Are you working for a competing faction?" They shut down the conversation. Word spreads through the merchant community about your inquiry.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Merchant representative spreading suspicion about your motives', `guildheart-merchant-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The merchant acknowledges trade agreements have been difficult to track lately. Some terms seem to change without clear notification. The process feels deliberately opaque.`;
        addJournal('investigation', 'Merchant confirmed trade agreement ambiguity', `guildheart-merchant-unclear-${G.dayCount}`);
      } else {
        G.lastResult = `The merchant representative is protective of trade details. "Guild business requires confidentiality." Without direct access to agreements, you can't verify modifications.`;
        addJournal('investigation', 'Trade agreements blocked without formal guild authorization', `guildheart-merchant-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. QUALITY INSPECTOR: STANDARDS DETERIORATION
  {
    label: "Interview the guild quality inspector — are quality standards being lowered for certain merchants, or are inspections being inconsistently applied?",
    tags: ['Investigation', 'NPC', 'Quality', 'Standards', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading quality control patterns');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Quality Inspector Noren is frustrated. "I mark goods as substandard. Then the marks disappear from the ledger. Or I'm ordered to pass obviously defective merchandise. The inconsistency is intentional. Merchants connected to guild leadership get lenient inspections. Independent traders get scrutinized for minor variations. I've been told directly: quality enforcement is now about political alignment, not actual product standards. The guild's credibility is being destroyed from inside."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Inspector revealed weaponized quality enforcement', `guildheart-inspector-standards-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The inspector becomes defensive. "Quality control is complex. I don't answer to random questioners." They turn away from you coldly. The quality control department is now guarded against your inquiry.`;
        addJournal('complication', 'Quality inspector refuses future investigation', `guildheart-inspector-silent-${G.dayCount}`);
      } else {
        G.lastResult = `The inspector mentions quality standards have been harder to apply consistently lately. "Different situations require different approaches," they note vaguely. Something about the standards feels deliberately flexible.`;
        addJournal('investigation', 'Inspector confirmed inconsistent quality enforcement', `guildheart-inspector-inconsistent-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. HALL KEEPER: EXCLUSION PATTERNS
  {
    label: "Question the guild hall keeper about recent membership changes — are certain merchants being denied access, and is hall usage being restricted?",
    tags: ['Investigation', 'NPC', 'Access', 'Membership', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering access control manipulation');
      G.stageProgress[1]++;

      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Hall Keeper Emry speaks carefully. "Membership denials have increased sharply. Reasons given are vague — 'insufficient trade history,' 'reputation concerns,' 'administrative review pending.' But the pattern is clear: merchants who question guild leadership or operate independently are being excluded. Meanwhile, merchants allied with the arbitrator's faction are fast-tracked to membership. The hall is being transformed into a private space for aligned merchants only."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Hall keeper revealed membership exclusion as political tool', `guildheart-hall-exclusion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The hall keeper becomes suspicious of your questions. "Why do you care about membership policies? Are you looking to apply?" The interaction turns awkward. The hall staff is now cautious around you.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Hall keeper now wary of your presence', `guildheart-hall-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The hall keeper admits membership applications have been handled differently lately. "More scrutiny," they note. Something about the policy feels deliberately restrictive.`;
        addJournal('investigation', 'Hall keeper confirmed recent membership policy changes', `guildheart-hall-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `The hall keeper is professional but reveals little about membership decisions. "Those are confidential administrative matters."`;
        addJournal('investigation', 'Membership policy information blocked without formal request', `guildheart-hall-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. LEDGER MASTER: RECORD FALSIFICATION
  {
    label: "Access the guild's financial and trading ledgers — are records being altered to hide merchant activities, or are entries being deliberately obscured?",
    tags: ['Investigation', 'NPC', 'Records', 'Finance', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading ledger manipulation patterns');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Ledger Master Toren is terrified but provides access. Guild financial records show two parallel sets of entries. Official records that show balanced, legitimate trade. Hidden entries that show transactions to external entities, payments for services unrelated to legitimate guild business, and mysterious accounts that don't correlate to any known merchants. "Someone's been using the guild's ledgers to hide external payments," Toren whispers. "Converting guild resources to fund something outside the guild's actual trading mission."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Ledger master revealed dual-entry financial concealment', `guildheart-ledger-fraud-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The ledger master refuses access entirely and reports your inquiry to the guild arbitrator. You're flagged as attempting to breach financial confidentiality. The guild's financial records are now locked against your investigation.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Guild arbitrator alerted to financial records inquiry', `guildheart-ledger-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The records show complexity and some inconsistencies. Certain entries appear hastily made or corrected. Without comparing to archival versions, you can't prove deliberate falsification, but the pattern is suspicious.`;
        addJournal('investigation', 'Guild records show signs of alteration', `guildheart-ledger-altered-${G.dayCount}`);
      } else {
        G.lastResult = `The ledger master is protective of financial documentation. "Those records are restricted to guild leadership." Without authorization, you can't access them.`;
        addJournal('investigation', 'Guild financial records blocked without leadership authorization', `guildheart-ledger-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. WAREHOUSE BROKER: GOODS DIVERSION
  {
    label: "Question warehouse brokers about merchandise movements — are goods being diverted to unlisted destinations, or are shipments being held longer than usual?",
    tags: ['Investigation', 'NPC', 'Commerce', 'Movement', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'tracing merchandise diversion');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + (G.skills.insight || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Warehouse Broker Selain pulls you aside. "Goods are being held in the warehouse longer than trade routes justify. Standard holding time is three days. Some shipments sit for weeks. They're then diverted to destinations that don't match original trade agreements. The diversion is coordinated — orders come through channels that bypass normal warehouse management. Someone's using the warehouse infrastructure to redirect guild merchandise to external parties without merchant knowledge."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Broker revealed warehouse diversion coordination', `guildheart-broker-diversion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The broker clams up immediately. "I don't discuss warehouse operations with investigators. That's sensitive guild business." Their protective wall is instant. Word spreads through the warehouse community about your inquiry.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Warehouse brokers warned about your investigation', `guildheart-broker-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The broker admits merchandise movements sometimes take unexpected routes. "Logistics can be complex," they suggest. The warehouse operations feel deliberately opaque.`;
        addJournal('investigation', 'Broker confirmed non-standard merchandise movements', `guildheart-broker-evasive-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. INITIATION OVERSEER: MEMBERSHIP COERCION
  {
    label: "Speak with the initiation overseer about membership requirements — are initiates being asked for loyalty oaths beyond normal guild practice?",
    tags: ['Investigation', 'NPC', 'Membership', 'Coercion', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering coercive membership practices');
      G.stageProgress[1]++;

      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Initiation Overseer Drell is deeply uncomfortable. "New members are required to take oaths that go far beyond traditional guild commitments. They're asked to place guild loyalty above family, above personal judgment, to report internal dissent, to accept orders without question. These aren't craft traditions — these are control mechanisms. I've been ordered to enforce increasingly stringent oaths. Members who refuse the new requirements are denied membership or stripped of standing. The guild is being transformed into something coercive."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Initiation overseer revealed coercive membership oath system', `guildheart-initiation-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The overseer becomes hostile. "Initiation ceremonies are sacred guild matters. You have no right to question them." They report your inquiry to the arbitrator. The initiation process is now closed to your investigation.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Initiation overseer banned you from membership questions', `guildheart-initiation-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The overseer admits initiation requirements have been updated recently. "Modern membership standards are more comprehensive," they note evasively. The new requirements feel deliberately expanded.`;
        addJournal('investigation', 'Initiation overseer confirmed recent membership requirement changes', `guildheart-initiation-expanded-${G.dayCount}`);
      } else {
        G.lastResult = `The overseer is protective of initiation practices. "Those are confidential guild traditions." Without being part of the inner circle, you can't access membership requirement details.`;
        addJournal('investigation', 'Initiation practices blocked without membership access', `guildheart-initiation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. APPRENTICE MASTER: SKILL SUPPRESSION
  {
    label: "Consult with the apprentice master about craft training — are certain skills being deliberately withheld from apprentices, or are knowledge-sharing practices changing?",
    tags: ['Investigation', 'NPC', 'Craft', 'Knowledge', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering craft knowledge suppression');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + (G.skills.insight || 0) / 2 + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Apprentice Master Keon speaks quietly. "I've been forbidden from teaching certain negotiation techniques, quality assessment skills, and independent assessment methods to apprentices. The rationale given is 'apprentices need to master basic skills first,' but it's clearly restriction. Apprentices are being trained to follow procedures without understanding the underlying principles. They're being deliberately kept dependent on guild authority for judgment. This is systematic de-skilling of the next generation."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Apprentice master revealed deliberate craft knowledge suppression', `guildheart-apprentice-suppression-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The master becomes protective of craft training. "Guild knowledge belongs to apprentices we've selected. You don't get to question our educational methods." They turn away, making it clear the craft training is off-limits to your inquiry.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Apprentice master forbade further training questions', `guildheart-apprentice-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The master admits apprentice training has been restructured recently. "New pedagogy emphasizes procedure consistency," they note. The training approach has clearly changed.`;
        addJournal('investigation', 'Apprentice master confirmed recent training methodology changes', `guildheart-apprentice-changed-${G.dayCount}`);
      } else {
        G.lastResult = `The master is protective of craft training methods. "Apprentice education is restricted to the guild's discretion." Without being an approved mentor, you can't observe training details.`;
        addJournal('investigation', 'Apprentice training methods blocked without guild authorization', `guildheart-apprentice-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. GUILD STRUCTURE TIER 1: HIERARCHY REORGANIZATION
  {
    label: "Analyze the guild's organizational hierarchy — has the formal structure been modified, or are decision powers being centralized?",
    tags: ['Investigation', 'Structure', 'Organization', 'Power', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'guild hierarchy analysis');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The guild hierarchy has been systematically restructured. Positions that were meant to be independent have been consolidated under the arbitrator's authority. Merchant councils that used to hold decision power have been made advisory-only. Department heads who disagreed with recent changes have been replaced with compliant allies. The organization is being transformed from a distributed guild structure into a centralized control apparatus. Power is concentrating rapidly.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Structure analysis revealed centralized power consolidation', `guildheart-structure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of guild hierarchy draws attention from guild leadership. You're questioned about your interest in organizational structure. Your investigation is now flagged as unauthorized structural analysis.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Guild leadership alerted to hierarchy analysis inquiry', `guildheart-structure-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The hierarchy shows recent changes. Some positions appear to have shifted, and reporting lines have been modified. The organizational structure has been reorganized.`;
        addJournal('investigation', 'Guild hierarchy modifications confirmed', `guildheart-structure-modified-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. TRADE NETWORK TIER 2: MERCHANT DISPLACEMENT
  {
    label: "Map the active merchants in Guildheart Hub — who's been removed from trading networks, and who's gaining unprecedented access?",
    tags: ['Investigation', 'Networks', 'Commerce', 'Displacement', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'merchant network displacement mapping');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The merchant network is being systematically recomposed. Independent merchants who were previously active are being excluded through denials of warehouse access, merchandise handling, or arbitration support. Meanwhile, merchants allied with the arbitrator are gaining unprecedented access to resources and favorable trade terms. The economic foundation of Guildheart is being remapped to concentrate trading power among approved merchants. This is economic restructuring disguised as normal business operations.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Network analysis revealed deliberate merchant displacement', `guildheart-network-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your mapping of merchant networks draws attention from guild commercial operations. You're questioned about your interest in trade patterns. The merchant community is now aware you're analyzing their networks.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Guild commercial operations alerted to network analysis', `guildheart-network-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Recent merchant list changes show removals and additions. Some previously active traders have disappeared from records. New merchants have gained rapid prominence. The composition has been intentionally restructured.`;
        addJournal('investigation', 'Merchant network composition changes confirmed', `guildheart-network-modified-${G.dayCount}`);
      } else {
        G.lastResult = `Merchant trading patterns are complex. Understanding the full displacement requires deeper access to membership records and trading authorization data.`;
        addJournal('investigation', 'Merchant network analysis incomplete without records access', `guildheart-network-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. INFORMATION CONTROL TIER 1: RUMOR SUPPRESSION
  {
    label: "Track how information flows through Guildheart Hub — are certain stories being deliberately suppressed, and is communication being filtered?",
    tags: ['Investigation', 'Information', 'Communication', 'Control', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'information flow analysis');
      G.stageProgress[1]++;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Information that reaches merchants is being deliberately filtered. Stories about merchant exclusions are suppressed before spreading. Rumors about arbitration corruption are actively countered with official denials. Merchants who might share complaints are isolated before they can speak. The flow of information through Guildheart is being managed and controlled. Merchants are being kept from knowing how systematically they're being displaced.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Information analysis revealed systematic communication suppression', `guildheart-information-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your tracking of information flows is noticed. Guild communication monitors question your interest in how stories spread. Your information analysis is now being monitored by the guild.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Guild monitoring alerted to information flow tracking', `guildheart-information-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Information flows show signs of recent changes. Some stories appear to be circulating less freely. Communication patterns have been reorganized.`;
        addJournal('investigation', 'Information control modifications detected', `guildheart-information-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. COERCION MECHANISMS TIER 2: THREAT MAPPING
  {
    label: "Document the specific threats and consequences being used against merchants — who's being threatened, by what means, and for what refusals?",
    tags: ['Investigation', 'Coercion', 'Fear', 'Threats', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'coercion apparatus documentation');
      G.stageProgress[1]++;

      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `A pattern of threats emerges. Merchants who resist unfavorable arbitration decisions face warehouse access denial. Merchants who question membership policies face sudden trade agreement cancellations. Merchants who speak publicly about corruption face exclusion from guild gatherings. Merchants who try to organize collective resistance face financial ruin through coordinated price-fixing against them. The threats are systematic and calibrated — severe enough to force compliance, but deniable as formal policy. Coercion has become the invisible infrastructure of guild control.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Coercion analysis mapped systematic threat apparatus', `guildheart-coercion-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your documentation of threats makes you a target. Someone warns you directly that continuing this investigation will result in your exclusion from the guild. Your analysis of coercion has accelerated the very mechanisms you're studying.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation drawing direct coercion consequences', `guildheart-coercion-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Evidence of merchant intimidation exists. Merchants are clearly afraid to resist. The threat mechanisms aren't fully visible but their effects are undeniable.`;
        addJournal('investigation', 'Merchant intimidation confirmed through behavioral patterns', `guildheart-coercion-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Merchant fear exists but the specific coercion mechanisms are concealed. People won't openly discuss threats against them.`;
        addJournal('investigation', 'Coercion suspected but specific mechanisms not yet documented', `guildheart-coercion-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. EXTERNAL MOVEMENT TIER 1: RESOURCE REDIRECTION
  {
    label: "Trace resource flows from Guildheart Hub outward — are guild resources being channeled to external destinations?",
    tags: ['Investigation', 'Resources', 'Flow', 'Redirection', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'resource flow tracking');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Guild resources are being systematically redirected outside Guildheart. Merchant fees that should support guild infrastructure are being diverted to external accounts. Warehouse goods that should be available to all members are being moved to external storage. The guild's economic foundation is being extracted and moved elsewhere. Guildheart is being treated as a collection point for resources destined for external use.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Resource flow analysis revealed external resource extraction', `guildheart-resources-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your tracking of resource flows draws attention from guild financial operations. You're questioned about your interest in resource movements. The guild's resource handling is now being monitored against your investigation.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Guild financial operations alerted to resource flow tracking', `guildheart-resources-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Resource movements show unusual patterns. Some materials are being moved through non-standard channels. The resource distribution has been reorganized.`;
        addJournal('investigation', 'Resource redistribution modifications detected', `guildheart-resources-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. TRUST EROSION TIER 2: INSTITUTIONAL FAITH COLLAPSE
  {
    label: "Document the breakdown of merchant confidence in guild institutions — what bonds of trust have fractured, and what's replacing mutual faith?",
    tags: ['Investigation', 'Trust', 'Institutions', 'Faith', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'institutional trust erosion documentation');
      G.stageProgress[1]++;

      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The merchant community has lost faith in guild arbitration. Merchants no longer believe disputes will be settled fairly — they see the system as politically manipulated. Trust in the guild's financial management is gone — merchants suspect resources are being stolen. Cooperation between independent merchants is breaking down because they're afraid of being reported to guild leadership. What's replacing trust is fear, suspicion, and individual self-protection. The social bonds that made the guild functional are being deliberately destroyed.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Trust analysis revealed systematic institutional faith destruction', `guildheart-trust-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your documentation of trust breakdown makes merchants nervous. Some avoid you because they fear your inquiry will attract attention to their doubts. Your analysis is accelerating the very institutional collapse you're studying.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Merchants avoiding you due to fear of scrutiny', `guildheart-trust-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Merchant confidence in guild institutions has clearly declined. People express doubts about arbitration fairness and leadership trustworthiness. Institutional faith is visibly eroding.`;
        addJournal('investigation', 'Institutional trust erosion confirmed through merchant interviews', `guildheart-trust-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Merchant concerns about the guild exist but the full scope of trust breakdown is difficult to measure without deeper community access.`;
        addJournal('investigation', 'Institutional trust concerns detected but incompletely documented', `guildheart-trust-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 15. MERCHANT VULNERABILITY TIER 1: ECONOMIC EXPOSURE
  {
    label: "Document individual merchant economic vulnerability — who's most at risk of losing their standing, and what pressures can force compliance?",
    tags: ['Investigation', 'Vulnerability', 'Economics', 'Exposure', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'merchant vulnerability mapping');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Merchant vulnerability is being systematically weaponized. Independent merchants without family connections are most exposed — they can be denied warehouse access or favorable arbitration rulings. Merchants with debt obligations are pressured through financial threats. Merchants dependent on specific trade routes can be isolated by controlling their access. Newer merchants are excluded from established networks. The system creates economic pressure that forces merchants to either accept syndicate terms or face ruin. Individual merchants have been isolated and made dependent on syndicate favor for survival.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Merchant analysis revealed systematic economic vulnerability weaponization', `guildheart-vulnerability-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of merchant vulnerability draws attention from the arbitrator. You're warned that documenting merchant precarity is prohibited. The investigation is now flagged.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Arbitrator prohibited further merchant vulnerability analysis', `guildheart-vulnerability-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Merchants show clear signs of economic vulnerability and fear. Many are clearly exposed to pressure from syndicate decisions. The vulnerability is visible but the full system isn't clear.`;
        addJournal('investigation', 'Merchant vulnerability and fear patterns confirmed', `guildheart-vulnerability-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Merchant precarity exists but understanding the full vulnerability system requires deeper merchant interviews and financial access.`;
        addJournal('investigation', 'Merchant vulnerability analysis incomplete without financial data', `guildheart-vulnerability-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. DECISION OPACITY TIER 2: UNEXPLAINED AUTHORITY SHIFTS
  {
    label: "Analyze who's making key guild decisions — who's appearing in leadership while actual power is held elsewhere, creating confusion about authority?",
    tags: ['Investigation', 'Authority', 'Opacity', 'Decision', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'authority structure opacity analysis');
      G.stageProgress[1]++;

      const result = rollD20('insight', (G.skills.insight || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The decision structure is deliberately opaque. Formal decisions appear to come from traditional guild structures, but those structures are being overridden by external directives that arrive through private channels. The formal leaders maintain appearance of authority while actual power is exercised from outside their official structures. Merchants don't know who's really making decisions or by what process. This opacity prevents organized resistance and leaves everyone guessing about who truly holds power. The confusion is intentional.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Authority analysis revealed deliberate decision opacity structure', `guildheart-opacity-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of decision structures draws scrutiny from guild leadership. You're advised to stop questioning the decision-making process. The authority structure analysis is now being monitored.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Guild leadership aware of decision structure analysis', `guildheart-opacity-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The decision structure shows signs of complexity and external influence. Formal decisions don't always match actual outcomes. The authority hierarchy appears modified.`;
        addJournal('investigation', 'Decision structure opacity confirmed', `guildheart-opacity-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Decision structures are complex. Understanding who really makes decisions requires access to internal guild communications and leadership discussions.`;
        addJournal('investigation', 'Decision opacity analysis incomplete without internal access', `guildheart-opacity-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 17. STREET RUMOR: MERCHANT WHISPERS
  {
    label: "Gather gossip in merchant quarters and warehouse districts — what stories are traders telling each other about guild changes?",
    tags: ['Investigation', 'Rumor', 'Commerce', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing merchant narrative');
      G.stageProgress[1]++;

      const rumor = ['the arbitrator is taking bribes to fix disputes', 'independent merchants are being systematically frozen out of the guild', 'arbitration decisions are made before the hearing even starts', 'someone is stealing guild resources and sending them north', 'the guild membership oaths are being used to coerce merchants into illegal activities'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `The merchant quarter whisper is: "${selected}." Traders repeat it with varying certainty. Some claim direct experience, others are passing on secondhand accounts. But the collective narrative is consistent: the guild is being corrupted from within. Merchants are aware something's being deliberately done to the guild's integrity, even if they can't articulate the full conspiracy yet.`;
      addJournal('investigation', `Merchant rumor gathered: "${selected}"`, `guildheart-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. STREET RUMOR: MERCHANT WHISPERS
  {
    label: "Gather gossip in merchant quarters and warehouse districts — what stories are traders telling each other about guild changes?",
    tags: ['Investigation', 'Rumor', 'Commerce', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing merchant narrative');
      G.stageProgress[1]++;

      const rumor = ['the arbitrator is taking bribes to fix disputes', 'independent merchants are being systematically frozen out of the guild', 'arbitration decisions are made before the hearing even starts', 'someone is stealing guild resources and sending them north', 'the guild membership oaths are being used to coerce merchants into illegal activities'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `The merchant quarter whisper is: "${selected}." Traders repeat it with varying certainty. Some claim direct experience, others are passing on secondhand accounts. But the collective narrative is consistent: the guild is being corrupted from within. Merchants are aware something's being deliberately done to the guild's integrity, even if they can't articulate the full conspiracy yet.`;
      addJournal('investigation', `Merchant rumor gathered: "${selected}"`, `guildheart-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. INSTITUTIONAL CRACK: ARBITRATION CORRUPTION PROOF
  {
    label: "Compile documented evidence that proves arbitration decisions are being made externally — show the paper trail of corruption.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Corruption', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing arbitration conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `You piece together the evidence: official arbitration records with handwritten notes in a single hand — the arbitrator's. Those notes contradict the written decisions. You find copies of letters from external parties directing specific outcomes. You find evidence that arbitration hearings are being scheduled around predetermined conclusions. The paper trail is clear: arbitration is being coordinated from outside, with the arbitrator serving as a mechanism for external will rather than independent judgment. The guild's dispute resolution system is a façade.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Arbitration corruption conspiracy documented with proof', `guildheart-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your compilation of arbitration corruption proof is noticed. Someone intercepts your documentation and warns you that exposing guild arbitration procedures will result in your removal from Guildheart. You're marked as a threat to the guild's administrative integrity.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Guild directly warned about arbitration corruption inquiry', `guildheart-proof-caught-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `You find enough evidence to suggest external coordination of arbitration. Inconsistencies between notes and decisions, unexplained timing of hearings — it's compelling but not conclusively proven.`;
        addJournal('investigation', 'Arbitration corruption strongly suggested by evidence', `guildheart-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `The arbitration records exist but proving external coordination requires comparing official records to external correspondence that you don't yet have access to.`;
        addJournal('investigation', 'Arbitration proof incomplete without external communication records', `guildheart-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. MORAL PRESSURE: GUILD ROLE COMPROMISE CHOICE
  {
    label: "Confront a guild official who's complicit in arbitration corruption — demand explanation and decide whether to protect them or expose them.",
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
        { name: 'Guild Arbitrator Kesh', role: 'chief arbitrator', fear: 'They threatened my family. I had to cooperate or my children would lose access to guild apprenticeships' },
        { name: 'Ledger Master Toren', role: 'financial keeper', fear: 'I was ordered to maintain false records or face financial ruin and blacklisting' },
        { name: 'Merchant Representative Ilya', role: 'trade advocate', fear: 'I wanted to resist but they said if I spoke out, I\'d be excluded and all my trade agreements canceled' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `You confront ${npc.name}. They crumble under pressure. "${npc.fear}." They're trapped, complicit, and frightened. You must decide: Do you expose them to stop the arbitration system? Do you protect them and maintain your investigation quietly? Your choice determines whether this person becomes an informant or an enemy — and whether the guild's arbitrary corruption can be challenged from within or continues unchecked.`;

      G.moralChoice = {
        protect: `Offer to shield ${npc.name} if they provide insider information. Gain a guild informant but risk becoming complicit yourself.`,
        expose: `Report ${npc.name}'s role in arbitration corruption. Disrupt the apparatus but lose access to internal guild workings.`
      };

      addJournal('moral-choice', `Confronted ${npc.name} (${npc.role}) about arbitration corruption participation`, `guildheart-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. DISCOVERY MOMENT: EXTERNAL COORDINATION SOURCE
  {
    label: "Find the evidence that proves the guild arbitration corruption is being coordinated from outside Guildheart — discover the external hand orchestrating guild capture.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of arbitration corruption');
      G.stageProgress[1]++;
      G.stageProgress[1]++;

      const result = rollD20('investigation', (G.skills.investigation || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Behind the corrupted arbitration records and diverted resources, you find the thread that leads outside Guildheart. Courier receipts from northern territories with detailed instructions for "merchant network restructuring." Orders for "arbitration procedure modifications." Financial transfers to the arbitrator with source cities that match northern merchant cities. Guildheart's guild structure is being systematically captured by external interests. Someone in the northern territories — or someone allied with them — is using the guild's own institutions to extract value and consolidate control. The conspiracy is coordinated, resourced, and external.`;
        G.stageProgress[1]++;
        addJournal('major-discovery', 'Origin source of Guildheart arbitration corruption identified as external coordination', `guildheart-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach the evidence of external coordination, you're intercepted. Someone stops you directly and makes it clear that pursuing this further will result in your removal from the guild or worse. You've discovered pieces, but the full external coordination remains hidden — and now you're marked as a direct threat.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation interrupted by external coordination operators', `guildheart-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points beyond Guildheart. Courier routes reference "northern merchant authorities." Arbitration orders show external signature. The conspiracy is larger than the guild itself. You don't know the exact source yet, but you know the arbitration corruption is being directed from outside Guildheart's borders.`;
        addJournal('major-discovery', 'External coordination of Guildheart arbitration confirmed', `guildheart-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `You find pieces suggesting external involvement, but the origin source remains obscured. Whoever's orchestrating this has hidden their hand carefully.`;
        addJournal('investigation', 'External coordination suspected but source not yet identified', `guildheart-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  }
];
