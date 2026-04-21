/**
 * WHITEBRIDGE COMMUNE STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 investigation paths grounded in bridge crossing irregularities and midnight cargo runs
 * Whitebridge: a crossing commune that controls the river passage — now the passage is being used for something hidden
 * Named NPC: Cadrin (the bridge keeper whose records have started showing anomalies)
 */

const WHITEBRIDGE_COMMUNE_STAGE1_ENRICHED_CHOICES = [

  // 1. FIRST ENCOUNTER: CADRIN
  {
    label: "Introduce yourself to Cadrin — the bridge keeper whose crossing logs have shown anomalies for six months.",
    tags: ['Investigation', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'meeting Cadrin the bridge keeper');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Cadrin is a careful man who knows every passage that crosses his bridge. "I log everything. Always have." He's noticed that some crossings don't appear in his log despite being logged by the duty walker who does the supplementary count. "My count and the walker's count disagree on three nights per month. Same three nights. Predictably." He knows something is wrong. He doesn't know why it's happening.`;
        G.flags.met_cadrin = true;
        addJournal('contact', 'Bridge keeper Cadrin met: systematic log discrepancies on predictable nights, willing to show records', `whitebridge-cadrin-${G.dayCount}`);
      } else {
        G.lastResult = `Cadrin is at the crossing station but isn't available for informal conversation. He takes his job seriously. You'll need to approach through official channels or return when his shift partner is absent.`;
        G.flags.located_cadrin = true;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 2. CLUE: BRIDGE CARGO TRACKING BREAK
  {
    label: "Compare Cadrin's personal crossing log against the commune's official bridge registry — document the specific discrepancies.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'cross-referencing bridge crossing records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      if (!G.flags) G.flags = {};
      if (G.flags.met_cadrin) {
        G.lastResult = `Cadrin's log and the official registry diverge on exactly three nights per lunar cycle — the nights of the new moon, when bridge lighting is minimal. On those nights, Cadrin logs two to four additional crossings that don't appear in the official registry. The registry has been altered after the fact: entries added and removed to obscure the new-moon crossings. The alteration is professional — you'd miss it without a side-by-side comparison.`;
        G.flags.found_bridge_discrepancy = true;
        addJournal('investigation', 'Bridge records: new-moon crossings systematically removed from official registry after filing — alteration professional', `whitebridge-discrepancy-${G.dayCount}`);
      } else {
        G.lastResult = `Without Cadrin's personal log for comparison, the official registry looks clean. You need his records to see the discrepancy.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 3. CLUE: CHARTER MARK CONTAINER
  {
    label: "Cadrin describes the cargo that crossed on the last anomalous night — help him identify the charter mark on the containers.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'identifying charter mark on night cargo');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Cadrin describes a horizontal bar with two points upward — like a crown with only the outer peaks. You find that mark in a trade register: it belongs to a northern transport consortium that doesn't normally operate river crossings. Their registered freight category is "sensitive materials — administrative classification." They're licensed for land transport only. River crossing without a registered waterway license would require special authorization — the kind that doesn't appear in public permit records.`;
        if (!G.flags) G.flags = {};
        G.flags.identified_charter_mark = true;
        addJournal('investigation', 'Charter mark identified: northern transport consortium, land-only license, unauthorized river crossing implied', `whitebridge-charter-mark-${G.dayCount}`);
      } else {
        G.lastResult = `Cadrin's description is accurate but the mark isn't in any standard trade register you have access to. You'd need a specialized transport registry to identify it.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 4. INVESTIGATION: MIDNIGHT CARGO TIMING
  {
    label: "Analyze the pattern of midnight cargo runs — determine where they originate and where they're going.",
    tags: ['Investigation', 'Systems', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'mapping midnight cargo route');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `Tracking backwards from Cadrin's log timings: crossings happen between eleventh and twelfth bell — well after the last scheduled ferry. The approach road from the west shows fresh wheel ruts that branch off the main road three hundred meters before the bridge, using an unmapped track. The track leads to a loading area that doesn't appear on any commune map. Someone built a private staging area for bridge access at night. This infrastructure required investment and planning.`;
        if (!G.flags) G.flags = {};
        G.flags.found_staging_area = true;
        addJournal('discovery', 'Midnight cargo staging area found: unmapped private access track with constructed loading area — significant prior investment', `whitebridge-staging-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The approach timing and road conditions suggest origination from the western settlements, taking an off-road path to avoid commune watch points. The route is careful about avoiding standard patrol coverage.`;
      } else {
        G.lastResult = `The route mapping is inconclusive. Too much of the approach happens on shared roads where individual crossings can't be distinguished from legitimate traffic.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 5. ARCHETYPE-GATED: READING THE BRIDGE
  {
    label: "Stand at the bridge at the hour when the anomalous crossings happen — read what the space tells you.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'reading the bridge at night');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The bridge has informal cover points — loading alcoves that weren't part of the original construction. They were added within the last two years. Not for loading: for concealment. Someone modified the bridge structure to enable unobserved passage. This modification required commune permission or someone inside the commune administration who didn't ask for it.`;
      } else if (arch === 'magic') {
        G.lastResult = `The bridge stone shows stress patterns inconsistent with normal crossing traffic. The weight distribution has changed — heavier loads than registered crossings would account for. The stone remembers loadings the records don't. The mass that crossed here was significantly heavier than cargo manifests suggest.`;
      } else if (arch === 'stealth') {
        G.lastResult = `The bridge has three natural blind spots where the duty walker's vision is broken by lamp positioning. On new-moon nights, those spots extend further. Someone surveyed this bridge and identified exactly where unobserved crossings are possible. The new-moon timing isn't arbitrary — it maximizes blind spot coverage.`;
      } else {
        G.lastResult = `Two bridge workers arrive early for the morning shift and immediately check something at the east abutment before starting their official duties. They check it separately, one after the other, and both leave their shift notes unchanged. Whatever they're checking isn't in the official record. It's a personal monitoring practice — they know something passes through the bridge that isn't being reported.`;
      }
      addJournal('investigation', 'Bridge at night: modified cover points, anomalous stone stress, mapped blind spots, unofficial worker monitoring', `whitebridge-bridge-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 6. INVESTIGATION: WHO ALTERED THE REGISTRY
  {
    label: "Trace who had access to the bridge registry on the days when entries were altered.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing registry access on alteration days');

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Registry access is logged at the commune archive. On the three nights per month when discrepancies occur, the registry shows access by a "district coordination deputy" — a position that doesn't appear in the commune's official organizational chart. The access codes are valid but the position title is fabricated. Someone has a legitimate access credential under a role that doesn't formally exist. An institutional ghost account, used to authorize alterations.`;
        if (!G.flags) G.flags = {};
        G.flags.found_ghost_registry_account = true;
        addJournal('investigation', 'Registry alteration: ghost account "district coordination deputy" — valid credentials, nonexistent role title', `whitebridge-ghost-account-${G.dayCount}`);
      } else {
        G.lastResult = `Access logs exist but are in a format that requires the commune's administrative key to decode the account identifiers. You can see that access happened — not who performed it.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 7. FACTION SEED: IRON COMPACT CROSSING AUTHORITY
  {
    label: "Contact the Iron Compact's regional crossing authority representative at Whitebridge's trade office.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'making Iron Compact contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Representative Delt Karnn manages Iron Compact river transit compliance for this region. Unauthorized river crossings by a land-licensed transport consortium are his problem. "If your charter mark identification is accurate, that consortium is violating transit law." He's interested — but carefully. "The transit law violation would be their problem. What they're transporting is a separate question." He wants the transport evidence. He's not yet asking about the cargo.`;
        if (!G.flags) G.flags = {};
        G.flags.met_iron_compact_whitebridge = true;
        G.factionHostility.iron_compact += 1;
        addJournal('faction', 'Iron Compact rep Delt Karnn: unauthorized river transit violation actionable, wants transport evidence before pursuing cargo', `whitebridge-iron-${G.dayCount}`);
      } else {
        G.lastResult = `The Iron Compact trade office is processing a backlog. Informal transit compliance inquiries require a written summary with supporting documentation before they'll open a conversation.`;
        if (!G.flags) G.flags = {};
        G.flags.located_iron_compact_whitebridge = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 8. SOCIAL: THE DUTY WALKER
  {
    label: "Speak to the duty walker who does the supplementary crossing count — ask if they've noticed the discrepancy.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'interviewing duty walker');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Terris has been duty walker for four years. "My count and Cadrin's usually match. On new-moon nights, mine is higher. I reported it twice to the commune administration. Both times they told me I must have miscounted." He shrugs. "Maybe I did. But I count the same way every time." He hasn't connected this to anything larger. He just knows he's been told he's wrong and doesn't believe it.`;
        if (!G.flags) G.flags = {};
        G.flags.met_terris_walker = true;
        addJournal('contact', 'Duty walker Terris: confirmed count discrepancy, twice told he miscounted — discrepancy normalized through administrative dismissal', `whitebridge-terris-${G.dayCount}`);
      } else {
        G.lastResult = `Terris is mid-shift and can't stop for extended conversation. He'll be accessible after the evening handover.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 9. MORAL PRESSURE: CADRIN'S POSITION
  {
    label: "Cadrin asks if you're going to make this official — he needs to know before he shares everything he has.",
    tags: ['Moral', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 65,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(65, 'Cadrin evidence decision');
      if (!G.flags) G.flags = {};

      G.lastResult = `Cadrin's been keeping this log for six months and hasn't told his supervisors because he's been waiting to understand what he's documenting first. "If I report officially and it's someone with authority behind them, I lose my position. If I don't report and this is serious, I've been complicit for six months." He wants to know your approach. The choice will determine whether he gives you everything or just the minimum.`;
      G.flags.stage1_evidence_decision = 'pending';
      G.flags.stage1_moral_npc = 'Cadrin';
      addJournal('consequence', 'Cadrin bridge keeper evidence decision — share approach or maintain deniability', `whitebridge-cadrin-decision-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 10. INVESTIGATION: CARGO WEIGHT ANALYSIS
  {
    label: "Analyze the load bearing marks on the bridge stone — estimate the weight of the midnight cargo based on stone stress.",
    tags: ['Investigation', 'Craft', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'analyzing bridge stone load bearing evidence');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Stone stress patterns in the bridge deck show load concentrations consistent with cart weights between three and five tonnes — heavier than normal commercial cargo, within the range of large industrial or material shipments. Each new-moon crossing shows similar weight distribution. Whatever is crossing is consistent in mass and container format. This isn't random cargo — it's the same type of shipment, regularly repeated. Industrial-scale material movement.`;
        addJournal('investigation', 'Bridge stone stress: 3-5 tonne load per crossing, consistent weight distribution — regular industrial-scale shipment', `whitebridge-load-${G.dayCount}`);
      } else {
        G.lastResult = `Stone stress analysis requires a structural engineer's precision. You can identify that heavy loads have crossed, but the weight estimates are too rough to be evidentiary.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 11. ATMOSPHERE: THE COMMUNE AT DAWN
  {
    label: "Watch Whitebridge Commune wake up — observe how the bridge crossing is integrated into daily life.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'observing commune morning activity');

      G.lastResult = `The bridge is Whitebridge's heartbeat. Every transaction, every arrival, every departure passes over it. Families greet incoming travelers by name. Commerce happens in the middle of the crossing. The commune built itself around the idea of being a meeting point. That same openness that makes it a crossroads also makes it easy to pass something through it that nobody will remember specifically — there's always something crossing, always noise, always movement. The bridge's public nature is its best cover.`;
      addJournal('discovery', 'Whitebridge: public crossing culture provides natural cover for unauthorized transits — openness weaponized', `whitebridge-dawn-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 12. INVESTIGATION: THE COMMUNE ADMINISTRATION'S KNOWLEDGE
  {
    label: "Determine whether Whitebridge Commune administration knows about the midnight crossings.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'assessing administration awareness');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The administration knows. Three months ago, the commune bridge director filed an internal inquiry about new-moon crossing irregularities. The inquiry was marked "resolved — within operational parameters" by the district coordination deputy — the ghost account. The administration's own inquiry was closed by the entity that's operating the unauthorized crossings. The administration has been captured through its own bureaucratic response mechanism.`;
        addJournal('investigation', 'Administration captured: internal inquiry closed by ghost account "district coordination deputy" — administrative response weaponized', `whitebridge-admin-${G.dayCount}`);
      } else {
        G.lastResult = `The administration's public stance is that crossing operations are normal. Whether this reflects genuine ignorance or deliberate cover requires internal document access.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 13. PERSONAL ARC: SECURE CADRIN'S LOG
  {
    label: "Help Cadrin make a secure copy of his personal crossing log and get it outside Whitebridge Commune's reach.",
    tags: ['PersonalArc', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 68,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'securing Cadrin\'s log offsite');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Cadrin makes a second copy of six months of crossing logs — date, time, cargo type, apparent weight. You carry it out of the commune in a sealed pouch inside normal correspondence heading to Shelkopolis through a traveling advocate. The advocate doesn't know what they're carrying. The original log stays with Cadrin; the copy is now on its way to the investigation's central archive.`;
        G.flags.cadrin_log_secured = true;
        addJournal('consequence', 'Cadrin\'s crossing log secured offsite via traveling advocate — six months of discrepancy evidence preserved', `whitebridge-log-secure-${G.dayCount}`);
      } else {
        G.lastResult = `Every regular courier through Whitebridge uses the commune's central mail station, which passes through the bridge director's administrative oversight. Getting the log out requires a carrier who's traveling privately, not through official channels.`;
      }
      G.recentOutcomeType = 'stealth'; maybeStageAdvance();
    }
  },

  // 14. RUMOR LAYER
  {
    label: "Listen to gossip at the bridge-side inn — what stories are travelers carrying through Whitebridge?",
    tags: ['Investigation', 'Rumor', 'Stage1', 'Meaningful'],
    xpReward: 60,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(60, 'collecting crossing rumors');

      const rumors = [
        'a northern merchant convoy traveled through Whitebridge without filing standard crossing paperwork last month',
        'the bridge keeper was offered early retirement and turned it down — unusual offer, no explanation given',
        'someone found a piece of machinery in the river north of the bridge that doesn\'t match any registered cargo',
        'bridge access hours were quietly extended for "approved commercial partners" six months ago — nobody knows who qualifies'
      ];
      const selected = rumors[Math.floor(Math.random() * rumors.length)];

      G.lastResult = `Traveler whisper at the inn: "${selected}." The crossing carries more story than it shows.`;
      addJournal('investigation', `Whitebridge traveler rumor: "${selected}"`, `whitebridge-rumor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 15. SOCIAL: THE FORMER BRIDGE DIRECTOR
  {
    label: "Find the commune's former bridge director — the one who filed the original inquiry before it was closed.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'interviewing former bridge director');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Former director Ashe stepped down two months after the inquiry was closed. "I was told the inquiry finding was correct and the crossings were authorized under a program I didn't have clearance to know about." She accepted this explanation for four weeks. "Then I realized: I'm the bridge director. There is no program I don't have clearance for. Either the program is real and I was deliberately excluded from my own jurisdiction, or the program doesn't exist." She resigned rather than continue operating within a jurisdiction that had been taken from her.`;
        if (!G.flags) G.flags = {};
        G.flags.met_ashe_director = true;
        addJournal('contact', 'Former bridge director Ashe: excluded from own jurisdiction by mystery authorization, resigned in protest', `whitebridge-ashe-${G.dayCount}`);
      } else {
        G.lastResult = `The former director isn't in Whitebridge. She moved to a settlement across the crossing after resignation. You'll need to travel to reach her.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 16. INVESTIGATION: WHAT'S BEING TRANSPORTED
  {
    label: "Stake out the staging area on a new-moon night — observe what crosses the bridge.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'observing midnight cargo crossing');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.isCrit) {
        G.lastResult = `From concealment near the staging area, you watch two carts cross. The containers are sealed and uniform — the same charter mark Cadrin described. But you notice something: the handlers move them with extreme care, not the casual efficiency of bulk goods. They're not moving material. They're moving something fragile or reactive. Two handlers wear heavy gloves despite the summer heat. Whatever is in those containers requires physical protection even from the outside.`;
        if (!G.flags) G.flags = {};
        G.flags.witnessed_midnight_crossing = true;
        addJournal('discovery', 'Midnight crossing witnessed: two carts, sealed uniform containers, handled with care — reactive or fragile content, handlers in protective gloves', `whitebridge-witnessed-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You see the carts and containers but from too far away to observe handling details. The crossing is quick and organized. Definitely not casual commerce.`;
      } else {
        G.lastResult = `The approach track has a watcher you didn't account for. You're seen and the crossing is aborted for the night. Your surveillance was detected.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 17. WORLD COLOR: THE BRIDGE AT DAWN
  {
    label: "Watch the bridge through the transition from night to morning — observe how Whitebridge Commune marks the passage of time.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 48,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(48, 'observing bridge dawn transition');

      G.lastResult = `At first light, Cadrin rings a small bell at the crossing station. Not a formal signal — a habit. He's been doing it every morning for twenty-two years. "Every crossing starts fresh," he explains when you ask. "The night's log closes and the morning's opens." He closes the night log carefully. Whatever crossed in darkness becomes a matter of permanent record at dawn. Cadrin has been preserving the night's truth every morning for six months, not knowing if anyone would ever read it.`;
      addJournal('discovery', 'Cadrin\'s morning bell: night log closed at dawn, six months of preserved midnight crossing records', `whitebridge-dawn-bridge-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 18. INVESTIGATION: EXTERNAL AUTHORIZATION SOURCE
  {
    label: "Trace the authorization chain for the ghost account credentials — find who issued the district coordination deputy access.",
    tags: ['Investigation', 'Authority', 'Stage1', 'Meaningful'],
    xpReward: 73,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'tracing ghost account authorization');

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 14) {
        G.lastResult = `The access credentials for the district coordination deputy account were issued by a regional transit oversight body that has no public presence in Whitebridge or its administrative district. The oversight body's registered address is in a northern commercial district. The credentials were valid and properly formatted — but issued by an authority that nobody in Whitebridge's administration had previously interacted with or verified. Someone created a parallel authorization structure and used it to insert a ghost account into Whitebridge's administrative system.`;
        if (!G.flags) G.flags = {};
        G.flags.found_authorization_source = true;
        addJournal('discovery', 'Ghost account origin: credentials issued by unverified "regional transit oversight body" with northern commercial address', `whitebridge-auth-source-${G.dayCount}`);
      } else {
        G.lastResult = `The credential issuance trail goes to a regional body you can't identify with available resources. The authorization exists but its origin requires deeper institutional access to trace.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 19. WORLD COLOR: CADRIN'S RECORD KEEPING
  {
    label: "Ask Cadrin why he started keeping a personal log that duplicates the official record.",
    tags: ['WorldColor', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 50,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(50, 'understanding Cadrin\'s motivation');

      G.lastResult = `"My father kept a bridge log at the Soreheim crossing for thirty years," Cadrin says. "He told me official records get corrected. Personal records don't — they're yours. When official records start looking different from your memory, that's when the personal one matters." He says it simply. He doesn't think of himself as an investigator. He thinks of himself as someone following advice his father gave him.`;
      addJournal('discovery', 'Cadrin motivation: personal log practice inherited from father — institutional records can be corrected, personal ones remain', `whitebridge-cadrin-why-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 20. SHADOW RIVAL INTRO
  {
    label: "Terris the duty walker mentions someone else was asking about the crossing discrepancies last week — and unlike you, they were asking very specific questions.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They asked whether the crossings happened before or after the bridge guard rotation," Terris says. "Not about the cargo — about the guard schedule. They were figuring out whether the crossing was coordinated with official personnel or independent of them." Military security assessment. They're determining whether the unauthorized crossing has inside cooperation.`;
      } else if (arch === 'magic') {
        G.lastResult = `"Described the cargo containers precisely before I'd said a word about them," Terris says. "Same mark, same dimensions, same handling care. They described it perfectly." This person has direct knowledge of the cargo from another source. They came to Terris to verify their existing intelligence, not to discover it.`;
      } else if (arch === 'stealth') {
        G.lastResult = `"Talked to me for thirty minutes and I didn't notice what they were asking until after they'd gone," Terris says. "I went back through the conversation and realized every question was specific and directed. But in the moment it just felt like conversation." An expert social extraction — information gathered through apparent small talk.`;
      } else {
        G.lastResult = `"They offered to help Cadrin," Terris says. "Said they represented a crossing rights organization that could protect bridge keepers who documented violations. Left a card. Cadrin didn't take it." Someone tried to position themselves as Cadrin's protector in order to get access to his records through trust rather than investigation.`;
      }

      G.lastResult += ` They asked questions you haven't reached yet.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      addJournal('warning', 'Rival-adjacent operative asked Terris specific crossing questions last week — ahead on Whitebridge thread', `whitebridge-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  }
];
window.WHITEBRIDGE_COMMUNE_STAGE1_ENRICHED_CHOICES = WHITEBRIDGE_COMMUNE_STAGE1_ENRICHED_CHOICES;
