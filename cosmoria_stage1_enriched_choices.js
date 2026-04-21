/**
 * COSMORIA STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to maritime archives, shipwright trade, and personal ambition corruption
 * Generated for: Personal ambition vs collective trust, individual power weaponized, archives/records as control
 * Each choice: 65-80 XP, grounded in floating intellectual metropolis politics and maritime hierarchy
 */

const COSMORIA_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. STABLE FACTOR: TRADE ROUTES MANIPULATION
  {
    label: "Question Aurek Tidereach, the Stable Factor — are certain merchant routes being systematically blocked, and has trade priority shifted in ways that benefit specific interests?",
    tags: ['Investigation', 'NPC', 'Maritime', 'Commerce', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading maritime trade pattern shifts');
      G.stageProgress[1]++;

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Stable Factor Aurek is conflicted but speaks quietly over harbor noise. "Trade route allocation used to follow established schedules and weather windows. Now I'm receiving directives about who gets priority docking, who gets favorable tide timing, who gets weather protection. Not suggestions — demands. Independent merchants are systematically delayed. Merchants connected to House Cosmouth loyalists get premium berth assignments. I'm being asked to weaponize maritime logistics to consolidate power. This undermines everything Cosmoria's floating stability depends on."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Stable Factor revealed corrupted maritime trade route system', `cosmoria-trade-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Aurek becomes guarded. "Maritime trade logistics are Cosmouth administrative matters. I can't discuss route allocation with outsiders." They turn away, and harbor officials take note of your inquiry.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Stable Factor now protective of maritime trade allocation', `cosmoria-trade-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Aurek admits recent trade routes have been complex and not all merchants are satisfied with dock timing. "Weather and tides make priority difficult," they say, though the explanation lacks conviction.`;
        addJournal('investigation', 'Stable Factor confirmed inconsistent route allocations', `cosmoria-trade-pressure-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. QUARTERMASTER: SUPPLY CHAIN DIVERSION
  {
    label: "Consult with Quartermaster Coralyn Foamglass about recent supply distribution — has maritime resource allocation been altered, and are certain crews getting preferential access?",
    tags: ['Investigation', 'NPC', 'Resources', 'Supply', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering supply chain manipulation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Quartermaster Coralyn shows you inventory records that have been falsified. Naval supply allocations marked as "standard crew provisions" have been secretly diverted to private vessels. Rope, sailcloth, repair materials destined for independent shipwrights have disappeared from ledgers. Crews connected to House Cosmouth loyalists receive augmented provisions disguised as routine maintenance. "This is systematic diversion," Coralyn says quietly. "Someone's using the quartermaster system to redirect maritime resources to preferred parties. Independent crews are being starved of supplies while loyalist operations flourish."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Quartermaster revealed supply chain diversion conspiracy', `cosmoria-supplies-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Coralyn becomes suspicious. "Why do you care about our supply records? Are you documenting for rival houses?" Word spreads through maritime crews about your inventory inquiry.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Quartermaster spreading suspicion about supply chain investigation', `cosmoria-supplies-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Coralyn acknowledges supply allocations have been difficult to track. Some provisions seem to vanish without clear documentation. The system feels deliberately opaque.`;
        addJournal('investigation', 'Quartermaster confirmed supply allocation ambiguity', `cosmoria-supplies-unclear-${G.dayCount}`);
      } else {
        G.lastResult = `Coralyn is protective of supply records. "Maritime provisions are Cosmouth matters requiring secure access." Without formal authorization, you can't verify supply diversion.`;
        addJournal('investigation', 'Supply records blocked without archive authorization', `cosmoria-supplies-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. SHRINE CARETAKER: RITUAL CORRUPTION
  {
    label: "Interview Maris Coralwake, the Shrine Caretaker — are maritime rituals and protections being altered, and has the sacredness of sea communion been compromised?",
    tags: ['Investigation', 'NPC', 'Faith', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading corrupted maritime ritual patterns');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Shrine Caretaker Maris is distressed. "Maritime rituals that protect all vessels equally have been reinterpreted. Some crews now receive 'enhanced blessings' for loyalty oaths. Sea communion ceremonies are being used to reinforce political allegiance instead of spiritual connection. I'm being ordered to perform selective rituals that favor certain merchant houses and exclude others. The sacred foundation of maritime safety has become a tool for consolidating power. This violates the fundamental covenant between the city and the sea."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Shrine Caretaker revealed corrupted maritime ritual system', `cosmoria-rituals-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Maris becomes protective. "Shrine matters are sacred. You have no right to question our rituals." They distance themselves and report your inquiry to archive authorities. Maritime faith is now closed to your investigation.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine Caretaker banned from faith investigation access', `cosmoria-rituals-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Maris admits sea communion rituals have been updated recently. "Modern maritime spirituality requires new ceremonies," they note evasively. The ritual practice has clearly changed.`;
        addJournal('investigation', 'Shrine Caretaker confirmed recent ritual modifications', `cosmoria-rituals-changed-${G.dayCount}`);
      } else {
        G.lastResult = `Maris is protective of shrine practices. "Ritual integrity is sacred guild knowledge." Without spiritual training, you can't access deep ritual details.`;
        addJournal('investigation', 'Shrine rituals blocked without ceremonial access', `cosmoria-rituals-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. CLERK OF ARRIVALS: RECORD TAMPERING
  {
    label: "Speak with Tideon Anchorlight, the Clerk of Arrivals — are arrival records being falsified, and has documentation been modified to hide arrivals or departures?",
    tags: ['Investigation', 'NPC', 'Archives', 'Records', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering archive record tampering');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Clerk of Arrivals Tideon pulls you into the archive shadows. "Arrival records are being systematically falsified. Vessels are being documented as arriving on dates they didn't. Departures are being erased from logs. Someone is creating false documentation history to hide movements of people and cargo. Archive records, which should be immutable truth, are being weaponized to conceal unauthorized vessel traffic. Private shipments are being hidden within legitimate trade records. The documentation system that Cosmoria depends on for taxation and safety has been corrupted as a tool for smuggling and unauthorized operations."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Clerk of Arrivals revealed archive record falsification system', `cosmoria-records-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Tideon clams up immediately. "Archive records are confidential and protected. I don't discuss documentation with investigators." Their protective wall is instant. Archive authorities are now aware of your record inquiry.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Archive clerks warned about record investigation access', `cosmoria-records-alert-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `Tideon admits arrival documentation has been complex lately. "Record management can be challenging," they suggest. The archive system feels deliberately opaque.`;
        addJournal('investigation', 'Clerk of Arrivals confirmed non-standard record practices', `cosmoria-records-evasive-${G.dayCount}`);
      } else {
        G.lastResult = `Tideon is protective of arrival records. "Archive documentation is restricted to official archivists." Without access credentials, you can't observe record details.`;
        addJournal('investigation', 'Archive records blocked without official authorization', `cosmoria-records-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. WARD MEDIATOR: CONFLICT RESOLUTION FAILURES
  {
    label: "Consult with Nerissa Bluefin, the Ward Mediator — are disputes between floating districts being resolved fairly, or is mediation being weaponized?",
    tags: ['Investigation', 'NPC', 'Mediation', 'Districts', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering mediation system corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Ward Mediator Nerissa speaks with difficulty. "District disputes used to be resolved by examining evidence and applying principle. Now I receive directives about outcomes before mediation begins. Districts aligned with power factions receive favorable rulings. Independent district representatives are systematically disadvantaged. I'm being asked to use conflict resolution as a tool to consolidate floating city loyalty. The independence of each district ward is being undermined through corrupted mediation. This threatens the entire delicate balance of Cosmoria's floating governance."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Ward Mediator revealed corrupted district mediation system', `cosmoria-mediation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Nerissa becomes hostile. "Mediation decisions are confidential ward matters. You have no right to question our rulings." They report your inquiry to district authorities. The mediation process is now closed to your investigation.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Ward Mediator prohibited further mediation questions', `cosmoria-mediation-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Nerissa admits ward disputes have been difficult to mediate. "District interests are increasingly conflicted," they note. Mediation outcomes feel deliberately favored.`;
        addJournal('investigation', 'Ward Mediator confirmed recent mediation bias patterns', `cosmoria-mediation-biased-${G.dayCount}`);
      } else {
        G.lastResult = `Nerissa is protective of mediation decisions. "Ward confidentiality is essential." Without district authorization, you can't access mediation details.`;
        addJournal('investigation', 'District mediation blocked without ward authorization', `cosmoria-mediation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. STREET PHYSICIAN: HEALTH RECORDS FALSIFICATION
  {
    label: "Interview Sevrin Shellmark, the Street Physician — are health records being falsified, and has disease reporting been manipulated to hide population strain?",
    tags: ['Investigation', 'NPC', 'Health', 'Records', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading population health corruption patterns');
      G.stageProgress[1]++;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Street Physician Sevrin is deeply concerned. "I document illnesses and injuries. Then the records disappear or are rewritten. Disease patterns that would indicate systematic poisoning or deliberate health harm are being erased from health rolls. Storm-related injuries affecting poor districts are listed as routine accidents. Illness affecting certain populations is recorded as minor when severity would indicate crisis. Health records are being falsified to hide population suffering. Someone's weaponizing health documentation to conceal where power is causing actual harm."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Street Physician revealed falsified health records system', `cosmoria-health-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Sevrin becomes protective. "Health records are private and sensitive. You don't get to access medical documentation." They turn away, making it clear patient records are off-limits.`;
        G.worldClocks.isolation++;
        addJournal('complication', 'Street Physician forbade further health records inquiry', `cosmoria-health-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Sevrin admits health documentation has been restricted recently. "Privacy and security protocols have been tightened," they note. The health record system has clearly changed.`;
        addJournal('investigation', 'Street Physician confirmed recent health record access restrictions', `cosmoria-health-restricted-${G.dayCount}`);
      } else {
        G.lastResult = `Sevrin is protective of patient records. "Medical documentation is confidential healer's knowledge." Without medical training, you can't observe health details.`;
        addJournal('investigation', 'Health records blocked without medical authorization', `cosmoria-health-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. ARCHIVIST: DOCUMENT DESTRUCTION
  {
    label: "Speak with the Archive Keeper about recent document removal procedures — are historical records being systematically destroyed, and has collection integrity been compromised?",
    tags: ['Investigation', 'NPC', 'Archives', 'History', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering archive destruction conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Archive Keeper speaks with fury barely controlled. "Documents are being removed from the collection. Historical records that show precedent for independent merchant autonomy, that demonstrate equitable resource sharing, that prove archive independence — these are being classified as 'restricted' and removed to sealed storage. Someone is literally rewriting Cosmoria's historical record to eliminate evidence of how things used to work before centralization. This is the highest form of corruption: destroying collective memory to make present tyranny seem inevitable."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Archive Keeper revealed systematic document destruction conspiracy', `cosmoria-archives-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The archivist becomes guarded. "Archive acquisition and deaccessioning are sensitive matters. You have no right to question our collection decisions." They restrict your archive access immediately.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Archive Keeper banned you from collection inquiry', `cosmoria-archives-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The archivist admits document management has been reorganized recently. "Collection security standards have evolved," they note evasively. Some historical materials appear to have shifted locations.`;
        addJournal('investigation', 'Archive Keeper confirmed document management reorganization', `cosmoria-archives-reorganized-${G.dayCount}`);
      } else {
        G.lastResult = `The archivist is protective of collection decisions. "Archive stewardship is restricted to official archivists." Without permanent access, you can't verify document status.`;
        addJournal('investigation', 'Archive records blocked without collection access', `cosmoria-archives-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. SHIPWRIGHT FOREMAN: QUALITY STANDARDS CORRUPTION
  {
    label: "Consult with a senior Shipwright about recent construction standards — are vessel safety requirements being lowered, and has quality inspection been compromised?",
    tags: ['Investigation', 'NPC', 'Craft', 'Quality', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering shipwright safety corruption');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Senior Shipwright Haskon speaks quietly in the docks. "Construction standards that protected vessel seaworthiness are being relaxed for certain builders. Inspection is being applied inconsistently. Vessels built by politically connected shipwrights are passed with minimal scrutiny. Independent builders' work is scrutinized for minor variations, then vessels are delayed for 'corrections' that take weeks. I mark structural weaknesses. Then the marks disappear and vessels are approved anyway. Someone's weaponizing quality standards to favor certain shipwrights while starving independent builders of work. This puts lives at risk when vessels fail at sea."`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Shipwright revealed corrupted vessel quality system', `cosmoria-shipwright-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The shipwright becomes suspicious. "Why do you care about our construction standards? Are you documenting for competitors?" Word spreads through the shipwright community about your inquiry.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Shipwright community warned about quality investigation', `cosmoria-shipwright-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The shipwright acknowledges construction standards have been difficult to maintain. "New vessels sometimes require different approaches," they suggest. Quality inspection feels deliberately inconsistent.`;
        addJournal('investigation', 'Shipwright confirmed inconsistent quality standard application', `cosmoria-shipwright-evasive-${G.dayCount}`);
      } else {
        G.lastResult = `The shipwright is protective of construction standards. "Shipwright knowledge belongs to the guild." Without craft training, you can't assess vessel quality details.`;
        addJournal('investigation', 'Shipwright standards blocked without craft access', `cosmoria-shipwright-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. MARITIME HIERARCHY: FLOATING DISTRICT REORGANIZATION
  {
    label: "Analyze Cosmoria's floating district organization — has the formal governance structure been modified, and are decision powers being centralized within House Cosmouth?",
    tags: ['Investigation', 'Structure', 'Organization', 'Maritime', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'maritime hierarchy analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The floating district hierarchy has been systematically restructured. Positions that were meant to be independent ward representatives have been consolidated under House Cosmouth authority. District councils that used to hold decision power have been made advisory-only. Ward leaders who disagreed with recent changes have been replaced with compliant loyalists. The organization is being transformed from distributed floating governance into centralized control by the nobility. Power is concentrating rapidly.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Structure analysis revealed centralized power consolidation', `cosmoria-structure-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of district hierarchy draws attention from House Cosmouth officials. You're questioned about your interest in governance structure. Your investigation is now flagged as unauthorized structural analysis.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'House Cosmouth alerted to governance structure inquiry', `cosmoria-structure-alert-${G.dayCount}`);
      } else {
        G.lastResult = `The district hierarchy shows recent changes. Some positions appear to have shifted, and authority lines have been modified. The governance structure has been reorganized.`;
        addJournal('investigation', 'District hierarchy modifications confirmed', `cosmoria-structure-modified-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. MARITIME NETWORKS: MERCHANT DISPLACEMENT
  {
    label: "Map the active maritime merchants in Cosmoria — who's been removed from trading networks, and who's gaining unprecedented access to shipping infrastructure?",
    tags: ['Investigation', 'Networks', 'Maritime', 'Displacement', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'merchant network displacement mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The maritime merchant network is being systematically recomposed. Independent traders who were previously active are being excluded through denials of dock access, cargo handling, or favorable tide allocations. Meanwhile, merchants allied with House Cosmouth are gaining unprecedented access to maritime resources and preferred berth positioning. The economic foundation of Cosmoria's floating trade is being remapped to concentrate maritime power among approved houses. This is economic restructuring disguised as normal navigation operations.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Network analysis revealed deliberate merchant displacement', `cosmoria-network-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your mapping of maritime merchant networks draws attention from Cosmouth trade authorities. You're questioned about your interest in shipping patterns. The merchant community is now aware you're analyzing their networks.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'House Cosmouth alerted to network analysis', `cosmoria-network-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Recent merchant roster changes show removals and additions. Some previously active traders have disappeared from trading records. New merchants allied with House Cosmouth have gained rapid prominence. The composition has been intentionally restructured.`;
        addJournal('investigation', 'Merchant network composition changes confirmed', `cosmoria-network-modified-${G.dayCount}`);
      } else {
        G.lastResult = `Maritime merchant networks show activity changes, but understanding full displacement requires deeper trader interviews and shipping records.`;
        addJournal('investigation', 'Merchant displacement analysis incomplete', `cosmoria-network-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. ARCHIVE INTEGRITY: DOCUMENTATION SYSTEM ANALYSIS
  {
    label: "Examine how Cosmoria's archive documentation system has evolved — what categories of records are being restricted, and what information is being protected from public access?",
    tags: ['Investigation', 'Archives', 'System', 'Information', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'archive system integrity analysis');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Archive access restrictions have been systematically expanded. Records that were once public now require authorization. Historical tax records that would show equitable resource distribution are now restricted. Documents proving merchant autonomy precedent are sealed. Records about past medical crises are restricted from researchers. The archive is being transformed from a public knowledge commons into a controlled information system. Citizens who would understand historical context are being denied that context through systematic documentation restriction.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Archive analysis revealed information control system', `cosmoria-info-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of archive access policies draws attention from senior archivists. You're warned that investigating information restrictions is prohibited. Archive authorities are now monitoring your research access.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Archive authorities monitoring information restriction inquiry', `cosmoria-info-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Archive access has clearly been modified. Some categories that were previously open are now requiring authorization. Information availability has been restricted.`;
        addJournal('investigation', 'Archive access restriction changes confirmed', `cosmoria-info-restricted-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. PERSONAL AMBITION TRACKING: WHO'S RISING
  {
    label: "Document which individuals are gaining unprecedented power within Cosmoria — who's being positioned for authority, and what methods are enabling their rapid ascension?",
    tags: ['Investigation', 'Ambition', 'Power', 'Tracking', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'personal ambition pattern mapping');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Certain individuals within House Cosmouth are being systematically elevated into positions of unusual power. A minor treasury official is now controlling resource allocation. A merchant with no prior governance experience is advising on archive policy. A shipwright with family connections is setting industry standards. These individuals are being positioned through corrupted systems — they're not earning authority through merit or traditional advancement. They're being installed by an external force. Their rapid power acquisition is dependent on systematic corruption of the institutions that normally regulate authority advancement.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Ambition analysis revealed orchestrated power installation system', `cosmoria-ambition-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your documentation of individual power rises draws attention from House Cosmouth security. You're questioned about your interest in personal advancement patterns. Your analysis is now flagged as unauthorized power structure investigation.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'House Cosmouth security alerted to ambition analysis', `cosmoria-ambition-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Certain individuals are clearly gaining rapid authority. Power advancement appears to be following unusual patterns, disconnected from traditional merit-based progression. Individual elevation is visibly accelerated.`;
        addJournal('investigation', 'Power advancement pattern changes confirmed', `cosmoria-ambition-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Individual power changes exist but the full scope of orchestrated advancement requires deeper access to House Cosmouth internal politics.`;
        addJournal('investigation', 'Individual power tracking incomplete', `cosmoria-ambition-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. INSTITUTIONAL LEVERAGE: DEPENDENCY SYSTEM
  {
    label: "Document how Cosmoria's institutions are being weaponized to create dependency — what groups are most vulnerable to institutional pressure, and how is compliance being enforced?",
    tags: ['Investigation', 'Institutions', 'Dependency', 'Power', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'institutional dependency system documentation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Institution dependency is being systematically weaponized. Independent merchants depend on archive documentation for taxation credibility — they're forced to cooperate through threat of audit. Crews depend on shipwright certification for employment — they're pressured through certification denial. Patients depend on shrine blessing for maritime safety — they're coerced through ritual exclusion. People depend on district mediation for dispute resolution — they're isolated through biased outcomes. The institutional network is being transformed into a control system. Every citizen is trapped within dependencies that force compliance with corrupted authority.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Institution analysis revealed systematic dependency weaponization', `cosmoria-dependency-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your documentation of institutional vulnerability makes authorities nervous. House Cosmouth representatives warn you that analyzing institutional dependency is dangerous inquiry. Your investigation is now marked as institutional system threat.`;
        G.worldClocks.pressure++;
        addJournal('complication', 'Authorities warned about institutional vulnerability analysis', `cosmoria-dependency-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Citizens show clear signs of institutional dependency and fear. Many are clearly exposed to pressure through institutional decisions. System-wide vulnerability is visible but incomplete understanding requires broader access.`;
        addJournal('investigation', 'Institutional dependency and fear patterns confirmed', `cosmoria-dependency-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Institutional vulnerability exists but full understanding requires deeper interviews and documentation access.`;
        addJournal('investigation', 'Institutional dependency analysis incomplete', `cosmoria-dependency-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. SUPPLY MANIPULATION: RESOURCE SCARCITY CREATION
  {
    label: "Document how maritime resource scarcity is being artificially created — what materials are being withheld, and how is shortage being used to enforce compliance?",
    tags: ['Investigation', 'Resources', 'Scarcity', 'Control', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'resource scarcity manipulation mapping');
      G.stageProgress[1]++;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Maritime resource scarcity is being artificially created. Rope and sailcloth that should be available are being deliberately withheld from independent builders. Repair materials are being diverted to loyalist crews. Shipwright supplies are being rationed to force dependence on approved suppliers. Storm season approaches and repair capacity is being systematically reduced for independent merchants. The shortage is artificial — resources exist but are being controlled. Shortage is being weaponized to force cooperation and eliminate independent merchant viability.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Resource analysis revealed artificial scarcity creation', `cosmoria-scarcity-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your tracking of maritime supplies draws attention from quartermaster operations. You're questioned about your interest in resource availability. Supply chain operations are now being monitored against your inquiry.`;
        G.worldClocks.watchfulness++;
        addJournal('complication', 'Quartermaster alerted to supply tracking', `cosmoria-scarcity-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Resource availability shows unusual patterns. Some materials are being distributed through non-standard channels. Supply distribution has been reorganized.`;
        addJournal('investigation', 'Resource distribution modifications detected', `cosmoria-scarcity-modified-${G.dayCount}`);
      } else {
        G.lastResult = `Supply availability variations exist but full understanding of scarcity engineering requires deeper quartermaster and supplier interviews.`;
        addJournal('investigation', 'Resource scarcity analysis incomplete', `cosmoria-scarcity-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 15. FAITH WEAPONIZATION: RITUAL AS CONTROL
  {
    label: "Document how maritime spiritual practices are being corrupted — what rituals are being weaponized for political allegiance, and how is faith being transformed into compliance?",
    tags: ['Investigation', 'Faith', 'Ritual', 'Control', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'ritual weaponization documentation');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Maritime spiritual practices are being systematically weaponized. Sea communion blessings now require oaths of loyalty to House Cosmouth. Shrine access is being denied to crews with independent merchant connections. Ritual interpretation is being controlled to support political authority. People depend on spiritual protection for maritime safety — they're being coerced through threat of ritual exclusion. The foundational faith that provided spiritual equality is being transformed into a tool for political control. Spirituality has been corrupted into compliance mechanism.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Faith analysis revealed systematic ritual weaponization', `cosmoria-faith-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your documentation of ritual corruption makes shrine authorities nervous. Shrine representatives warn you that analyzing spiritual practices is dangerous inquiry. Your investigation is now marked as faith system threat.`;
        G.worldClocks.reverence++;
        addJournal('complication', 'Shrine authorities warned about faith system analysis', `cosmoria-faith-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Ritual practices have clearly been modified. Some ceremonies now emphasize loyalty aspects previously absent. Faith structure appears intentionally changed.`;
        addJournal('investigation', 'Ritual modification patterns confirmed', `cosmoria-faith-confirmed-${G.dayCount}`);
      } else {
        G.lastResult = `Spiritual practice variations exist but complete understanding requires deeper shrine access and faith community interviews.`;
        addJournal('investigation', 'Ritual corruption analysis incomplete', `cosmoria-faith-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP ESCALATION (4 CHOICES) ==========

  // 16. HARBOR RUMOR: DOCKWORKER WHISPERS
  {
    label: "Gather gossip among harbor dockworkers and maritime crews — what stories are sailors telling each other about changes in Cosmoria's shipping system?",
    tags: ['Investigation', 'Rumor', 'Maritime', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing maritime crew narrative');
      G.stageProgress[1]++;

      const rumor = ['the stable factor is taking bribes to assign dock berths', 'independent merchants are being systematically frozen out of maritime trade', 'arrival records are being falsified to hide secret cargo movements', 'someone is stealing maritime supplies and sending them northward', 'ship captains are being forced to swear loyalty oaths to House Cosmouth'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `The dockside whisper is: "${selected}." Crew members repeat it with varying certainty. Some claim direct experience, others passing secondhand accounts. But the collective narrative is consistent: Cosmoria's maritime system is being corrupted from within. Sailors are aware something's being deliberately done to the city's floating integrity, even if they can't articulate the full conspiracy yet.`;
      addJournal('investigation', `Maritime rumor gathered: "${selected}"`, `cosmoria-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. ARCHIVE RUMOR: SCHOLAR WHISPERS
  {
    label: "Gather gossip among archive scholars and researchers — what stories are archivists telling each other about restricted documents and historical record changes?",
    tags: ['Investigation', 'Rumor', 'Archives', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing archival research narrative');
      G.stageProgress[1]++;

      const rumor = ['historical records are being destroyed to hide precedent for merchant independence', 'archive access is being restricted to control what citizens can learn', 'documents proving House Cosmouth overreach are being sealed permanently', 'the archive keeper is being forced to cooperate with document destruction', 'Cosmoria\'s entire historical foundation is being deliberately rewritten'];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `The archive whisper is: "${selected}." Researchers repeat it with varying certainty. Some have noticed restricted documents themselves, others are passing theories. But the collective narrative is clear: Cosmoria's historical records are being deliberately corrupted. Scholars are aware institutional knowledge is being suppressed, even if they can't prove the full system yet.`;
      addJournal('investigation', `Archive rumor gathered: "${selected}"`, `cosmoria-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. INSTITUTIONAL CRACK: CORRUPTION PROOF COMPILATION
  {
    label: "Compile documented evidence that proves maritime institutions are being systematically corrupted — show the paper trail linking institutional corruption to coordinated strategy.",
    tags: ['Investigation', 'Evidence', 'Proof', 'Conspiracy', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing institutional corruption conspiracy');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `You piece together the evidence: archive records showing falsified arrival documentation, supply records with handwritten diversions in a single hand, ritual instructions contradicting traditional practices, mediation rulings predetermined and annotated before public hearing, resource allocation lists showing systematic exclusion patterns. The paper trail is clear: Cosmoria's maritime institutions are being systematically corrupted as part of coordinated strategy. The archive, supply system, shrine, mediation, and governance are all being weaponized simultaneously. This is institutional capture.`;
        G.stageProgress[1]++;
        addJournal('investigation', 'Institutional corruption conspiracy documented with proof', `cosmoria-proof-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you compile institutional corruption proof, you're intercepted. A House Cosmouth representative makes it clear that exposing maritime institution procedures will result in your removal from Cosmoria or worse. You've discovered pieces, but full proof remains hidden — and now you're marked as a threat.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Institutional corruption inquiry directly intercepted', `cosmoria-proof-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points to systematic institutional corruption. Inconsistencies between records and practices, unexplained policy changes, resource diversions — it's compelling but not conclusively proven. Coordination is suspected but not documented.`;
        addJournal('investigation', 'Institutional corruption strongly suggested by evidence', `cosmoria-proof-partial-${G.dayCount}`);
      } else {
        G.lastResult = `You find pieces suggesting institutional corruption, but proving coordinated conspiracy requires additional evidence and external communication records not yet accessible.`;
        addJournal('investigation', 'Corruption proof incomplete without comprehensive records', `cosmoria-proof-incomplete-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 19. MORAL PRESSURE: INSTITUTION LOYALTY COMPROMISE
  {
    label: "Confront a Cosmoria official who's complicit in institutional corruption — demand explanation and decide whether to protect them or expose their role.",
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
        { name: 'Quartermaster Coralyn Foamglass', role: 'resource keeper', fear: 'They threatened to have me reassigned to merchant crew service if I spoke out. My family depends on my position.' },
        { name: 'Archive Keeper Marvin', role: 'historical guardian', fear: 'They made it clear that exposing document destruction would result in my dismissal and blacklisting from all scholarly work in Cosmouth.' },
        { name: 'Clerk Tideon Anchorlight', role: 'record keeper', fear: 'I wanted to resist but they said if I exposed falsified records, they\'d accuse me of the falsification itself.' }
      ];

      const npc = npcOptions[Math.floor(Math.random() * npcOptions.length)];

      G.lastResult = `You confront ${npc.name}. They crumble under pressure. "${npc.fear}" They're trapped, complicit, and frightened. You must decide: Do you protect them and maintain your investigation quietly? Do you expose them to stop the institutional system? Your choice determines whether this person becomes an informant or an enemy — and whether Cosmoria's institutional corruption can be challenged from within or continues unchecked.`;

      if (!G.flags) G.flags = {};
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = npc.name;

      addJournal('consequence', `Confronted ${npc.name} (${npc.role}) about institutional corruption participation`, `cosmoria-moral-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 20. DISCOVERY MOMENT: EXTERNAL COORDINATION SOURCE
  {
    label: "Find the evidence that proves Cosmoria's institutional corruption is being coordinated from outside — discover the external hand orchestrating maritime system capture.",
    tags: ['Investigation', 'Origin', 'Discovery', 'Climax', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'discovering origin source of institutional corruption');
      G.stageProgress[1]++;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Behind the corrupted arrival records, diverted supplies, weaponized rituals, and compromised mediation, you find the thread leading outside Cosmoria. Courier manifests reference cities in northern territories with detailed instructions for "maritime institution restructuring." Merchant house letters from affiliated northern contacts directing resource diversion. Financial transfers originating from north-aligned entities. Cosmoria's maritime system is being systematically captured by external interests. Someone in the northern territories — or someone allied with them — is using Cosmoria's own institutions to extract resources and consolidate control. The conspiracy is coordinated, resourced, and external.`;
        G.stageProgress[1]++;
        addJournal('discovery', 'Origin source of Cosmoria institutional corruption identified as external coordination', `cosmoria-origin-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `As you approach evidence of external coordination, you're intercepted directly. Someone stops you and makes clear that pursuing this further will result in your removal from Cosmoria or elimination. You've discovered pieces, but the full external coordination remains hidden — and now you're marked as direct threat.`;
        G.worldClocks.pressure += 2;
        addJournal('complication', 'Investigation intercepted by external coordination operators', `cosmoria-origin-caught-${G.dayCount}`);
      } else if (result.total >= 14) {
        G.lastResult = `The evidence points beyond Cosmoria. Courier routes reference "northern merchant authorities." Resource orders show external authorization signatures. The conspiracy is larger than Cosmoria itself. You don't know exact source yet, but you know institutional corruption is being directed from outside Cosmoria's borders.`;
        addJournal('discovery', 'External coordination of Cosmoria confirmed', `cosmoria-origin-external-${G.dayCount}`);
      } else {
        G.lastResult = `You find pieces suggesting external involvement, but the origin source remains obscured. Whoever's orchestrating this has hidden their coordination carefully.`;
        addJournal('investigation', 'External coordination suspected but source not yet identified', `cosmoria-origin-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 21. CLUE: GHOST VESSEL EVIDENCE
  {
    label: "Examine the maritime registry for vessels that departed Cosmoria without filing a return manifest — ghost vessels.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'identifying ghost vessel registry entries');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Seven vessels departed Cosmoria under standard cargo manifests in the past four months without filing return entries. Under maritime law, vessels without return manifests should trigger an automatic follow-up from the harbor authority. None of these seven triggered any follow-up. The harbor authority's notification log shows the flags were received and manually cleared — by the same harbor administrator, on days that don't follow a standard schedule. The ghost vessels are being actively cleared from the record.`;
        if (!G.flags) G.flags = {};
        G.flags.found_ghost_vessel_evidence = true;
        addJournal('investigation', 'Ghost vessels: seven without return manifests, flags manually cleared by single administrator on irregular schedule', `cosmoria-ghost-vessels-${G.dayCount}`);
      } else {
        G.lastResult = `You find vessels with missing return manifests but the clearance records are in a harbor administration category you'd need a maritime inspector's credential to access.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. CLUE: MARITIME TRANSIT LAUNDERING
  {
    label: "Trace the cargo manifests of the ghost vessels — follow the paper chain from departure documentation to origin ownership.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing maritime cargo laundering chain');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `The departure manifests list cargo as "mineral aggregate — industrial grade." All seven vessels. The same description, the same category code, the same weight class. The probability of seven independent cargo shipments being identical across four months is negligible. These are template manifests — the same document, filed seven times with different vessel names and dates. Whoever is operating this transit chain isn't hiding the cargo; they're making it look too boring to investigate.`;
      if (!G.flags) G.flags = {};
      G.flags.found_template_manifests = true;
      addJournal('investigation', 'Transit chain: identical template manifests filed seven times — systematic laundering via bureaucratic camouflage', `cosmoria-manifest-chain-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ARCHETYPE-GATED: READING THE HARBOR
  {
    label: "Walk Cosmoria's working harbor at peak tide — read what the port's activity pattern is actually communicating.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading harbor activity pattern');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The loading pattern for two specific berths doesn't match standard cargo work. The handlers work in a trained sequence — not dock training, something more systematic. Loading order optimized for rapid departure under a specific weight distribution. These handlers were trained for a different kind of vessel movement. Someone put military logistics expertise on a civilian dock.`;
      } else if (arch === 'magic') {
        G.lastResult = `One berth consistently loads in the late morning, when harbor traffic peaks and attention is distributed. Not the optimal time for efficient loading — the optimal time for loading that disappears into the general volume. The timing is deliberate. Someone scheduled those departures for maximum ambient cover.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The harbor administrator's office window faces the two suspicious berths directly. The administrator watches every loading from the office. Not curiosity — supervision. They know what's on those vessels and they're confirming each departure personally. The ghost vessel clearances weren't careless. They were supervised.`;
      } else {
        G.lastResult = `Three dock workers at the suspicious berths have new equipment — better ropes, new tool belts, work gear that's recent enough to still be clean. Someone paid for upgraded equipment at these specific berths and not others. The workers who handle the ghost vessels are being compensated above standard rate. The cooperation is purchased.`;
      }
      addJournal('investigation', 'Harbor analysis: suspicious berths use military loading sequence, peak-hour cover timing, administrator supervision, compensated workers', `cosmoria-harbor-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 24. FACTION SEED: IRON COMPACT MARITIME CONTACT
  {
    label: "Approach the Iron Compact's Cosmoria trade agent — they maintain an office in the maritime quarter.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Iron Compact contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Trade agent Sull Crenn manages Iron Compact cargo through Cosmoria's port. He knows about the ghost vessels. "Seven departures without returns disrupts the Iron Compact's routing calculations — we lose visibility on what's moving through Cosmoria." He's not helpful out of principle; he's helpful because the ghost vessels are interfering with Iron Compact logistics tracking. He'll share cargo pattern data in exchange for the template manifest evidence. A transactional relationship, but a useful one.`;
        if (!G.flags) G.flags = {};
        G.flags.met_iron_compact_cosmoria = true;
        G.factionHostility.iron_compact += 1;
        addJournal('faction', 'Iron Compact agent Sull Crenn: ghost vessels disrupt routing data, willing to exchange cargo pattern information', `cosmoria-iron-${G.dayCount}`);
      } else {
        G.lastResult = `The Iron Compact's Cosmoria office is busy with legitimate trade business. The agent is available by scheduled appointment only and not interested in unofficial inquiries without prior introduction.`;
        if (!G.flags) G.flags = {};
        G.flags.located_iron_compact_cosmoria = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 25. ATMOSPHERE: THE TIDE MARKER
  {
    label: "Study the tide markers at the harbor mouth — observe what they show about how Cosmoria reads time.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'reading Cosmoria tide markers');

      G.lastResult = `The tide markers at Cosmoria's harbor mouth have been used for three hundred years. They're carved with departure records — generations of sailors marking their first passages. The newest additions stop two years ago. The most recent carved names are still there, unchanged. The tradition has simply ended. No explanation. The Harbor Authority hasn't forbidden it — it just isn't happening. Something changed in the harbor's community culture two years ago and nobody is saying what.`;
      addJournal('discovery', 'Harbor tide markers: departure tradition stopped two years ago without explanation — harbor culture shifted', `cosmoria-tides-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 26. PERSONAL ARC: THE HARBOR ADMINISTRATOR'S RECORD
  {
    label: "Obtain a copy of the harbor administrator's personal appointment log — document when they personally cleared the ghost vessel flags.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'obtaining administrator appointment log');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The administrator's appointment log shows seven entries on the days the ghost vessel flags were cleared, each logged as "internal compliance review — duration 15 minutes." No parties listed. No case numbers. Fifteen minutes to clear a flag that should require harbor authority confirmation and registry update. The log was being kept carefully — the administrator recorded the activity because the record itself provides institutional cover. They created the paper trail of their own suppression.`;
        G.flags.obtained_administrator_log = true;
        addJournal('consequence', 'Administrator appointment log secured: seven ghost vessel clearances documented as unauthorized 15-minute compliance reviews', `cosmoria-admin-log-${G.dayCount}`);
      } else {
        G.lastResult = `The appointment log is kept in the administrator's private office. Without either social access or a distraction, you can't reach it without the administrator present.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 27. SOCIAL: THE RETURNING SAILOR
  {
    label: "Speak to a sailor who was crew on one of the vessels that departed with a template manifest — find out where it actually went.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'interviewing returning crew member');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Kavan is back from the second template manifest departure. "We went to the Shelf Islands. Private mooring, no harbor authority present." He describes the cargo — not mineral aggregate. Sealed uniform cases, handled by men who weren't Cosmoria dockworkers. "They offloaded fast. Knew exactly what they were doing. We turned around inside six hours." He was paid triple rate and told not to file a return manifest. He assumed it was tax avoidance. Now he's not sure.`;
        if (!G.flags) G.flags = {};
        G.flags.met_kavan_sailor = true;
        addJournal('contact', 'Sailor Kavan: Shelf Islands delivery, sealed uniform cases, private mooring, no official presence — triple rate', `cosmoria-kavan-${G.dayCount}`);
      } else {
        G.lastResult = `The sailors who ran the template manifest routes are avoiding the harbor this week. Word traveled that someone is asking questions. They know what they transported and they know it wasn't mineral aggregate.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 28. SHADOW RIVAL INTRO
  {
    label: "A maritime insurance broker mentions someone visited them last week asking about the same ghost vessels — claiming to be a cargo verification specialist.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They asked about the cargo destination's security capabilities," the broker says. "Not whether the cargo was properly registered — whether the receiving location was a defended site. Military logistics question in a commercial insurance conversation." Someone is mapping the supply chain's endpoint security, not investigating the fraud.`;
      } else if (arch === 'magic') {
        G.lastResult = `"They produced a sampling instrument when I mentioned the cargo category," the broker says. "Checked the air near where the cases had been staged before loading. Some kind of detector. I don't know what they were measuring." Material analysis at the staging site. Someone is characterizing the cargo through trace evidence — they don't know what it was, but they're working to find out.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They came twice," the broker says. "First visit was general questions. Second visit, they'd already confirmed the cargo route from somewhere else. They were triangulating — using multiple sources to build a complete picture before committing to any single line of inquiry." Counter-investigation methodology. They're building a case from multiple angles simultaneously.`;
      } else {
        G.lastResult = `"Very thorough," the broker says. "Bought me lunch and asked about every client who'd handled those berths in the past year. Not just the ghost vessels — everyone. They were building a complete contact map of everyone with information about those berths." Total environmental scan. They want every person who knows anything, not just the directly involved parties.`;
      }

      G.lastResult += ` This person was working the Cosmoria harbor thread before you arrived.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative investigated Cosmoria ghost vessels before you — multi-source triangulation approach', `cosmoria-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.COSMORIA_STAGE1_ENRICHED_CHOICES = COSMORIA_STAGE1_ENRICHED_CHOICES;
