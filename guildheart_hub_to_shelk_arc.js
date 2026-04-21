/**
 * GUILDHEART HUB → SHELKOPOLIS TRAVEL ARC
 * Journey from the guild coordination center to Stage 2 hub
 * Narrative: Pre-Union charter, off-channel arbiter contact, Oversight Collegium entanglement
 * Trigger (soft): G.investigationProgress >= 5 | Trigger (hard): G.level >= 6
 */

const GUILDHEART_HUB_TO_SHELK_ARC = [

  // ——— DEPARTURE (choices 1-3) ———

  {
    label: "The pre-Union charter fragment from Guildheart's archive gives the northern operation a legal structure to hide behind. Get it to Shelkopolis where it can be properly analyzed.",
    tags: ['ArcDeparture', 'Investigation', 'Decision'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'departing Guildheart with pre-Union charter fragment');
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The pre-Union charter predates the current guild registration system by forty years. It grants a "coordinating commercial association" status that sits outside modern oversight categories — technically legitimate, practically unregulated. The northern bloc has been operating under this charter's protections without registering under current law. In Shelkopolis, the central guild registry will have the record of whether this charter is still legally valid. If it isn't, the entire legal shield collapses.`;
      G.recentOutcomeType = 'neutral';
      addJournal('decision', 'Left Guildheart with pre-Union charter fragment — validity check needed in central registry', `guildheart-arc-departure-${G.dayCount}`);
    }
  },

  {
    label: "Displaced factor Paerun Delst has been trying to file a complaint about the off-channel arbiter contact for three months. He hasn't found a venue that will accept it.",
    tags: ['ArcRoad', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'talking with Paerun Delst about complaint filing failures');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Every arbitration venue Paerun approached directed him to another venue. The Collegium told him it was a guild matter. The guild told him it was a commercial arbitration matter. The commercial arbitration council told him it was a Collegium matter. "It's a loop," he says. "Whoever set it up knew that the jurisdictional gap between those three bodies would swallow a complaint forever." He's been documenting each deflection. He gives you the record.`;
        G.flags.met_paerun_delst = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Paerun: jurisdictional loop between Collegium/guild/arbitration designed to swallow complaints', `guildheart-arc-paerun-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Paerun is exhausted and doesn't trust new contacts. He keeps his own counsel. You travel south separately.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Oversight Collegium observer Calla Trent filed a transfer request to Shelkopolis two weeks ago — approved immediately. Calla knows what you found in Guildheart.",
    tags: ['ArcRoad', 'Stealth', 'Risk'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'assessing Calla Trent\'s immediate transfer approval');
      if (!G.flags) G.flags = {};

      G.lastResult = `Calla Trent's transfer was approved in forty-eight hours. Standard Collegium transfers take two to three weeks. Fast-tracked transfers happen when the Collegium wants someone repositioned quickly. She filed the transfer request three days after your investigation became visible in Guildheart. The pattern is established: someone in the operation monitors investigative activity and repositions assets in response. Calla Trent is one of those assets.`;
      G.flags.calla_trent_in_shelkopolis = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
      addJournal('discovery', 'Calla fast-tracked to Shelkopolis after your inquiry became visible — operation monitors and repositions', `guildheart-arc-calla-${G.dayCount}`);
      G.recentOutcomeType = 'complication';
    }
  },

  // ——— SOFT TRIGGER deepening ———

  {
    label: "The off-channel arbiter contact in Guildheart was brokering agreements between guild factions and the northern bloc. Those agreements are enforceable under pre-Union charter law.",
    tags: ['ArcDeepening', 'Investigation', 'Lore'],
    xpReward: 80,
    condition: function() { return (G.investigationProgress || 0) >= 5; },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'understanding charter-backed guild agreements');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `The pre-Union charter's "coordinating commercial association" status allows binding agreements between member entities that bypass current guild registration requirements. The northern bloc used the off-channel arbiter to create binding agreements with Guildheart guild factions — agreements that are technically legal under a forty-year-old charter. Those factions are now legally committed to the operation's commercial interests. The charter is the mechanism for co-opting legitimate guild infrastructure.`;
      G.flags.guildheart_arc_charter_mechanism = true;
      addJournal('discovery', 'Charter allows binding agreements bypassing guild registration — northern bloc co-opted Guildheart guild factions legally', `guildheart-arc-charter-${G.dayCount}`);
      G.recentOutcomeType = 'success';
    }
  },

  {
    label: "The guild memorial bell rings once for each full-member charter holder who dies. It has rung four times in the past six months — more than the previous four years combined.",
    tags: ['ArcDeepening', 'Survival', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'noticing elevated guild memorial bell frequency');
      if (!G.flags) G.flags = {};

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Four full-member charter holders in six months. The guild registry lists the causes: two accidents, one illness, one "circumstances under review." Checking the registry dates against your investigation timeline: each death occurred within three weeks of that holder raising a formal objection to a northern bloc charter agreement. The charter mechanism removes dissent through co-option or through something more permanent.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Four charter holder deaths correlated with objections to northern bloc agreements — pattern is lethal', `guildheart-arc-deaths-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Four deaths is elevated but you can't establish the connection without access to the registry and the agreement dates. Note it and continue south.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "The pre-Union charter's registration record: when was it last renewed, and who renewed it?",
    tags: ['ArcDeepening', 'Lore', 'Investigation'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'tracing charter renewal history');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Pre-Union charters require renewal every twenty years. This charter's last renewal was nineteen months ago — an off-cycle renewal, which is unusual. The renewing authority was a Collegium archive officer in Shelkopolis. The renewal application listed the charter's "coordinating member entities" as a set of company names that don't exist in current commercial registers. The charter was renewed for an operation that wasn't legally registered anywhere when it was renewed.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Charter renewed 19 months ago off-cycle by Shelkopolis Collegium officer for non-existent entities', `guildheart-arc-renewal-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The renewal records are in the central Shelkopolis archive. You won't find them here.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— ARRIVAL ———

  {
    label: "Shelkopolis guild district. The central registry is here — forty years of charter records, and somewhere in it, the pre-Union charter's renewal record.",
    tags: ['ArcArrival', 'Lore', 'Atmosphere'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'arriving at Shelkopolis guild district');
      if (!G.flags) G.flags = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;

      G.lastResult = `The guild district's central registry building spans a full block. Its records date to the city's founding charter. Somewhere in this archive is the renewal record that connected a Collegium officer to the northern bloc's legal shell nineteen months ago. That's the connection between institutional oversight and the operation — a provable link between the Collegium and whatever is moving south.`;
      G.flags.guildheart_arc_registry_located = true;
      addJournal('discovery', 'Central registry: charter renewal record links Collegium officer to northern bloc 19 months ago', `guildheart-arc-registry-${G.dayCount}`);
      G.recentOutcomeType = 'neutral';
    }
  },

  {
    label: "The off-channel arbiter contact from Guildheart has a counterpart in Shelkopolis. Find them through the investigation network.",
    tags: ['ArcArrival', 'Social', 'NPC'],
    xpReward: 80,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'finding the Shelkopolis off-channel arbitration counterpart');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The counterpart is a retired registrar named Fen Torr who keeps unofficial records of charter activities that the official registry doesn't log. "The pre-Union charter you're asking about," she says when you show her the fragment, "has had twelve amendment filings in the past two years. None of them are in the official record." She pulls a private ledger. Twelve amendments, twelve new entities added to the charter's membership. The entire operation built its legal structure through amendment filings that were deliberately not recorded.`;
        G.flags.met_fen_torr_registrar = true;
        G.flags.stage2_faction_contact_made = true;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
        addJournal('discovery', 'Fen Torr: 12 unrecorded charter amendments — operation\'s full legal structure exists off-register', `guildheart-arc-torr-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The investigation network contact doesn't have a direct line to charter arbitration. You'll need to find another approach to the registry records.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  // ——— HARD GATE ———

  {
    label: "The pre-Union charter is the legal infrastructure of the northern operation. Shelkopolis is where that infrastructure was built and where it can be dismantled.",
    tags: ['ArcGate', 'Decision'],
    xpReward: 80,
    condition: function() { return G.level >= 6 && !(G.flags && G.flags.guildheart_arc_departing); },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(80, 'committing to trace charter infrastructure to Shelkopolis');
      if (!G.flags) G.flags = {};
      G.flags.guildheart_arc_departing = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;
      G.lastResult = `The operation isn't improvised. It has a legal structure, a financial structure, and a supply chain structure. The legal structure runs through a forty-year-old charter that was renewed nineteen months ago for this purpose specifically. Shelkopolis holds the renewal record and the registrar who knows about the unrecorded amendments. That's where the legal case against the operation gets built or dies.`;
      G.recentOutcomeType = 'neutral';
    }
  },

  // ——— FINALE ———

  {
    label: "Arrive in Shelkopolis. The pre-Union charter from Guildheart reveals that the northern operation built its legal shelter in this city's own registry office.",
    tags: ['ArcFinale', 'Decision'],
    xpReward: 100,
    condition: function() { return (G.investigationProgress || 0) >= 5 || G.level >= 6; },
    fn: function() {
      advanceTime(2);
      G.telemetry.turns++;
      gainXp(100, 'arriving in Shelkopolis from Guildheart Hub');
      if (!G.flags) G.flags = {};
      G.flags.arrived_from_guildheart_hub = true;
      if (!G.worldClocks) G.worldClocks = {};
      G.worldClocks.pressure = (G.worldClocks.pressure || 0) + 1;

      const arch = G.archetype && G.archetype.group;
      const finalText = arch === 'combat' ? ` An operation this legally sophisticated chose its legal shelter carefully. The pre-Union charter is old enough to predate the oversight structures that would otherwise catch it. That's not coincidence — it's research.`
        : arch === 'magic' ? ` The charter's legal construction is elegant. It uses jurisdictional gaps between three separate oversight bodies to make itself immune to formal challenge. Someone with deep institutional knowledge designed this.`
        : arch === 'stealth' ? ` Twelve unrecorded amendments. A renewal filed under non-existent company names. A registrar who keeps a private ledger because she knows the official one is missing entries. The operation runs on institutional blind spots.`
        : ` The operation built its legal shelter inside the institution most responsible for regulating it. The Collegium renewal officer is the connection between oversight and complicity. That connection is in the Shelkopolis archive.`;

      G.lastResult = `Shelkopolis.${finalText} Stage 2 begins here.`;
      G.location = 'shelkopolis';
      G.stage = 2;
      if (!G.investigationProgress) G.investigationProgress = 0;
      G.investigationProgress++;
      addJournal('consequence', 'Arrived in Shelkopolis from Guildheart Hub — Stage 2 begins', `guildheart-arc-finale-${G.dayCount}`);
      G.recentOutcomeType = 'success';
      maybeStageAdvance();
    }
  }

];

window.GUILDHEART_HUB_TO_SHELK_ARC = GUILDHEART_HUB_TO_SHELK_ARC;
