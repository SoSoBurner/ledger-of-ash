/**
 * DISTRICTS STAGE 1 ENRICHED CHOICES
 * 7 canon districts + 3 synthetic type pools
 * Stage 1 theme: mystery, early discovery, character establishment
 * Global vars: AURORA_HEIGHTS_STAGE1_ENRICHED_CHOICES, IRONSPOOL_WARD_STAGE1_ENRICHED_CHOICES, etc.
 */

// ——— CANON DISTRICT: AURORA HEIGHTS (elite courts, formal archives) ———
const AURORA_HEIGHTS_STAGE1_ENRICHED_CHOICES = [

  {
    label: "Read the notice board outside the Aurora Heights civic hall — formal announcements for the district's residents.",
    tags: ['District', 'Lore', 'Atmosphere'],
    xpReward: 55,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(55, 'reading Aurora Heights civic notices');
      G.lastResult = `Three administrative reviews, two property hearings, one environmental compliance report — standard board rotation on its face. The compliance report is three months old. The filing cycle runs annually; a mid-cycle report means something triggered an unscheduled review outside the normal calendar. The report number sits in the Warden Order's jurisdictional series, not the district's own numbering. Someone above the district level authorized this one.`;
      G.recentOutcomeType = 'neutral';
      addJournal('Aurora Heights: mid-cycle environmental compliance report — Warden Order series, unscheduled', 'discovery', `aurora-heights-s1-notices-${G.dayCount}`);
    }
  },

  {
    label: "Observe the morning formal session at the Aurora Heights courts — access hearings, appeals, property disputes.",
    tags: ['District', 'Persuasion', 'Social'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'observing Aurora Heights formal session');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `A property dispute between a northern trading consortium and a residential cooperative — the contested asset is maintenance access to an atmospheric vent shaft. The consortium's advocate argues their pre-Union charter supersedes the cooperative's registered claim. The magistrate defers for written ruling without comment. You recognize the charter language: it matches the Guildheart pre-Union charter almost word for word. The phrasing wasn't borrowed. It was copied.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Aurora Heights court: pre-Union charter invoked for atmospheric vent shaft access — same language as Guildheart charter', 'discovery', `aurora-heights-s1-court-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The session covers property boundary disputes, a maintenance contract renewal, and two access right filings. The magistrate works through each in the flat register of someone who has handled this docket for twenty years — no pauses, no elaboration. The documents are signed, the filings stamped, the next case called before the previous one fully settles. Nothing flags. Nothing warrants a second look today.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Access the Aurora Heights district archive reading room — open to residents and credentialed researchers.",
    tags: ['District', 'Lore', 'Investigation'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'researching in Aurora Heights archive');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Eleven months back in the district maintenance records: a workorder for "filtration system adjustment — dome sector 4." The filing contractor doesn't appear anywhere in the current contractor registry — not suspended, not transferred, simply absent. Dome sector 4 maps directly to the residential blocks adjacent to the atmospheric vent shafts currently being disputed in the Aurora Heights court. The same shafts. The same timeframe. An unregistered contractor adjusted the filtration before the legal dispute over access began.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Aurora Heights archive: unregistered contractor filtration workorder 11 months ago — dome sector 4 matches contested vent shafts', 'discovery', `aurora-heights-s1-archive-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The archive reading room is organized by district quarter and then by year — not by subject matter. Wooden index drawers line two full walls, labeled in a hand that changed every decade. Without a specific filing reference or date range, navigating it requires working through the drawers in sequence — a half-day task at minimum, possibly a full day. You record the access protocol and the room's organizational logic for when you have a more precise entry point.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "A high-ranking official leaves the civic hall with a sealed letter — their posture suggests urgency they're trying not to show.",
    tags: ['District', 'Stealth', 'Investigation'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'following the urgent official from Aurora Heights civic hall');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `She takes three extra turns — each one adding time to any direct route, each one giving her a sightline back along the path. At the third corner she pauses and checks before moving. The delivery point is a private address with no business registry entry. The maintenance contractor's sign on the door carries the same company name as the dome sector 4 workorder filed eleven months ago. The same unregistered contractor. She knows where the work came from. The entry is there. The entry after it is gone.`;
        G.recentOutcomeType = 'success';
        addJournal('Aurora Heights official: unregistered contractor link confirmed — the entry is there, the entry after it is gone', 'discovery', `aurora-heights-s1-follow-${G.dayCount}`);
      } else {
        G.lastResult = `Aurora Heights pedestrian corridors are wide, well-lit, and designed with a civic planner's eye for open sightlines. She walks at a pace that closes distances quickly, and by the third turn the gap between you has grown past recovery. The district's architecture offers no alcoves, no loading bays, nowhere to pause without standing in plain sight. Whatever this district was built to enable, it was also built to expose anyone trying to move through it unseen.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Study the dome infrastructure schematics displayed in the Aurora Heights civic hall lobby — these are public documents.",
    tags: ['District', 'Lore', 'Atmosphere'],
    xpReward: 60,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(60, 'studying dome schematics in Aurora Heights civic lobby');
      G.lastResult = `The lobby display is a simplified schematic — general layout, no technical specifications. What it shows clearly: dome sector 4 connects to sectors 2, 5, and 7 through shared pressure equalization vents. The equalization cycle runs continuously. Anything introduced into sector 4 propagates into three additional sectors within one full cycle. The vent shaft access being contested in court isn't limited to sector 4. It's a control point for the entire connected cluster.`;
      G.recentOutcomeType = 'neutral';
    }
  }

];

// ——— CANON DISTRICT: IRONSPOOL WARD (industrial, labor, contraband) ———
const IRONSPOOL_WARD_STAGE1_ENRICHED_CHOICES = [

  {
    label: "Walk through the Ironspool Ward at the shift change — workers moving between stations, informal conversations.",
    tags: ['District', 'Persuasion', 'Social'],
    xpReward: 60,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(60, 'mingling at Ironspool Ward shift change');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `A maintenance worker stops when you ask about the dome vents. She's been in this sector seven years and something changed three months ago — the pressure cycle timing is off by a consistent interval. "Not broken," she says, without looking up. "Just different. Someone adjusted it." She filed a query through the standard channel. Nobody came and nobody replied. She kept working because the vents still function. She's telling you because you asked, and because she's the kind of person who doesn't like unexplained adjustments to things she's responsible for.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Ironspool maintenance worker: dome vent pressure cycle changed 3 months ago, unanswered query', 'discovery', `ironspool-s1-shift-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Shift change in the Ironspool Ward is a physical process — bodies moving in opposite directions through narrow corridors, everyone with somewhere specific to be. You're standing in it wrong. Nobody has time to stop and talk, and trying to redirect someone mid-stride earns you a look and nothing else.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Check the Ironspool Ward's public cargo registry — incoming material declarations for the industrial district.",
    tags: ['District', 'Lore', 'Investigation'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'reviewing Ironspool Ward cargo registry');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Four entries over the past two months, all filed as "maintenance supply — dome sector." Standard manifest entries include part numbers and contractor references. These four have neither — just the category label and a weight declaration. They should have been flagged at intake. They weren't. All four were cleared by the same duty officer on separate days across a two-month window. The pattern isn't accidental. One lazy entry might be. Four from the same hand is a decision.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Ironspool cargo registry: 4 vague dome maintenance entries, same duty officer accepted all four', 'discovery', `ironspool-s1-cargo-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The Ironspool Ward cargo registry runs to several hundred entries per week, organized by intake date with no subject index. The rows are dense — weight, category, clearing officer, manifest code — and they continue for three full ledger volumes. Without a specific date range, company name, or manifest code, a useful pass through the material takes days rather than hours. You record the access method, the ledger structure, and the search parameters you'd need to narrow it down.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Find the contraband exchange point in the Ironspool Ward — everyone in the district knows roughly where it is.",
    tags: ['District', 'Stealth', 'Combat'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'locating the Ironspool contraband exchange point');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The exchange point is a maintenance equipment storage building that shares a wall with the dome access terminal. The handler is selling paperwork, not product — altered manifests for industrial materials that need to pass checkpoint without inspection. His clients range from standard contraband traders to one party whose description and billing code match the Aurora Heights unregistered maintenance contractor profile closely enough to be the same entity. He doesn't know what his clients are shipping. He doesn't ask.`;
        addJournal('Ironspool contraband exchange sells altered manifests — same contractor profile as Aurora Heights dome workorder', 'discovery', `ironspool-s1-exchange-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The ward narrows into back passages around the dome terminal, and none of them are welcoming to strangers standing still. You find the approximate area and two likely buildings, but can't narrow it down without a longer presence. The exchange will have moved to a different location by then anyway — these operations don't hold still for more than a week in the same spot.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Talk to the longtime Ironspool Ward resident who lives near the dome access terminal — she's seen everything that moves through.",
    tags: ['District', 'Persuasion', 'NPC'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'speaking with longtime Ironspool resident near dome terminal');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Her name is Hess. Forty years in the Ironspool Ward, the last twelve in the same building. She talks to you because you stood at the right angle to her window and knocked the right way — she explains this without irony. "Three months back, the terminal changed," she says. "Twice a week now, late. People carrying things by hand, not contractor crews. I asked the duty officer. He said maintenance. I told him maintenance workers use trolleys and come in the morning. He stopped answering after that." She lets the silence do the rest.`;
        G.flags.met_hess_ironspool_resident = true;
        addJournal('Hess: dome terminal night deliveries twice weekly, unknown carriers — duty officer stopped answering questions', 'discovery', `ironspool-s1-hess-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `She opens the door and reads you in a few seconds — eyes moving once, top to bottom, then back to your face. She says she hopes you find what you're looking for and closes it. Not hostile — measured. Forty years in the Ironspool Ward gives a person a specific kind of patience: she knows the difference between strangers who can be trusted and strangers who haven't established that yet. You're still in the second category. The door is closed but not latched.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  }

];

// ——— CANON DISTRICT: VERDANT ROW (botanical, healing, social fabric) ———
const VERDANT_ROW_STAGE1_ENRICHED_CHOICES = [

  {
    label: "Visit the Verdant Row botanical station — public research space for atmospheric and plant science.",
    tags: ['District', 'Lore', 'Atmosphere'],
    xpReward: 60,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(60, 'visiting Verdant Row botanical station');

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `A botanist is bent over a row of test plants with a magnifying lens, marking something in a ledger. She shows you without being asked: upper leaf bleaching, consistent across eight weeks of sampling, concentrated in the atmospheric exposure bed. "Not pollution," she says, and the specificity in her voice is the specificity of someone who's tested the alternative explanations. "The compound profile is too narrow. It has a synthesis signature. Something built this." She hasn't reported it formally. She isn't sure where formal reports go when they involve atmospheric compounds.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Verdant Row botanist: plant bleaching from specific synthesis-signature compound — 8 weeks of exposure', 'discovery', `verdant-row-s1-botanical-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The botanical station is mid-season and fully occupied — every bench has a researcher and every researcher has a ledger open. The work underway is standard comparative growth monitoring across four specimen rows, the kind of routine documentation that fills most of the station's calendar. The researchers acknowledge you briefly and return to their counts. Nothing in the open exposure beds today shows the discoloration you'd be looking for.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Ask at the Verdant Row healer's collective about unusual symptoms they've been treating in the past three months.",
    tags: ['District', 'Persuasion', 'Investigation'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'asking Verdant Row healers about unusual symptom patterns');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `The senior healer pulls out her symptom log before you've finished the question. "Two months of this," she says, with the tone of someone who's been waiting for someone to ask. Fatigue, mild respiratory irritation, pressure sensitivity — sub-acute across the board, which is why she kept treating it as seasonal. The pattern doesn't break between seasons. It's continuous. And it's dense in the residential blocks directly adjacent to the dome access terminals. She names the blocks. She hasn't yet mapped the terminals onto them. She's a healer, not a cartographer. But the geography is there.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Verdant Row healer: continuous symptom cluster in blocks adjacent to dome terminals — not seasonal', 'discovery', `verdant-row-s1-healer-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The healer has a patient in the back room and three people waiting on the bench outside her door. "Seasonal," she says, already turning. "Standard presentation for this time of year — fatigue, some respiratory irritation. The log is there if you want to look." She gestures toward a shelf without pointing at anything specific and disappears through the back curtain. The log is there, closed, spine unmarked, indistinguishable from four others next to it.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Sit in the Verdant Row community garden and observe who passes through — the informal social center of the district.",
    tags: ['District', 'Survival', 'Atmosphere'],
    xpReward: 55,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(55, 'observing from Verdant Row community garden');
      G.lastResult = `Three hours in the Verdant Row community garden. Foot traffic: residents cutting through, a pair of older women who stop at the bench to argue about a recipe, two children who want to know if you know any good jokes. A maintenance crew passes without pausing to speak to anyone — four people, hand tools, moving at the efficient pace of a team that has done this route before. Their tool configuration matches the carry method described for the Ironspool Ward dome terminal night deliveries. A Collegium observer sits at the far end of the path, makes two notebook entries, and leaves without approaching the healer's collective forty meters away.`;
      G.recentOutcomeType = 'neutral';
    }
  }

];

// ——— CANON DISTRICT: GRANARY STEPS (grain trade, Zootia polity flavor) ———
const GRANARY_STEPS_STAGE1_ENRICHED_CHOICES = [

  {
    label: "Walk the Granary Steps distribution floor during the morning intake — where Harvest Circle's supply chain terminates.",
    tags: ['District', 'Survival', 'Investigation'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'surveying Granary Steps distribution floor');
      if (!G.flags) G.flags = {};

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `The mechanized sorting system runs the full length of the floor — several hundred tonnes of grain per day moving through it at harvest peak. At the far end, a secondary intake channel handles humidity regulation for the storage bays. The channel connects directly to the dome atmospheric distribution network. The connection is structural: whatever enters the humidity intake propagates into the same dome system as the primary atmospheric supply. The channel is labeled for grain storage maintenance. But its pathway is identical to an atmospheric distribution point. The intake is currently unlocked.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Granary Steps humidity intake connects to dome atmospheric system — secondary channel for compound distribution', 'discovery', `granary-s1-floor-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The Granary Steps distribution floor is operational and loud — machinery noise, shouted count-calls, the rattle and thump of carts against the conveyor guides. Workers move with the practiced efficiency of a floor that runs the same sequence every morning. Standing still in it means standing in someone's path. You walk the length of the floor without pausing, take in the general layout and the secondary intake channel at the far end, and step out through the loading bay exit.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Talk to the Granary Steps receiving clerk about manifest irregularities in the past six months.",
    tags: ['District', 'Persuasion', 'Investigation'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'questioning Granary Steps receiving clerk');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The clerk pulls up the flagged entries without hesitation — she's been wanting to show them to someone. Four incoming containers, all declared as grain treatment supplement for the humidity system's pest prevention cycle. The quantities were three times the standard monthly allocation. She flagged it at intake. Her supervisor told her the allocation had been increased under a new treatment protocol. She asked for the protocol documentation. It hasn't arrived. That was six weeks ago. "I stopped asking," she says. "But I kept the flags."`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Granary Steps: triple-quantity grain treatment supplement deliveries, no protocol documentation', 'discovery', `granary-s1-clerk-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The receiving clerk is mid-count when you arrive — stylus moving, lips tracking numbers, one hand raised without looking up. She waves you toward the records room at the end of the corridor. The records room is staffed by a different clerk who handles documentation during intake hours only with formal requests. He sets a printed form on the desk and slides it forward without explanation. Seven sections. None of them are brief.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Study the charter mark on the supplement containers in the Granary Steps storage bay.",
    tags: ['District', 'Lore', 'Craft'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'examining charter mark on supplement containers');
      if (!G.flags) G.flags = {};

      const result = rollD20('craft', (G.skills.craft || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Six containers in the storage bay, all labeled grain treatment supplement. All six carry the same mark on their base plate: the capital C with horizontal strike. You've seen it at Ironhold, at Whitebridge, at the Harvest Circle intake. The supply chain terminated here — not at the port, but routed directly into the Granary Steps humidity intake system. These containers have been entering the dome atmospheric distribution network for months. The mark confirms the same originating entity across every point in the chain.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Granary Steps supplement containers: charter mark confirmed — supply chain routed directly to dome humidity intake', 'discovery', `granary-s1-charter-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Six containers sit stacked near the bay's inner wall, visible from the entrance. The base plates face inward against the wall — the position where a charter mark would appear. Getting close enough to read them requires a credentialed storage authorization that you don't currently hold; the bay supervisor is standing at the access point and checks passes before letting anyone past the threshold. The mark may be there. Today the distance between you and it stays fixed.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  }

];

// ——— CANON DISTRICT: IRON LEDGER WARD (financial records, debt leverage) ———
const IRON_LEDGER_WARD_STAGE1_ENRICHED_CHOICES = [

  {
    label: "Request access to the Iron Ledger Ward's public transaction registry — available to credentialed financial researchers.",
    tags: ['District', 'Lore', 'Investigation'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'accessing Iron Ledger Ward public transaction registry');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Fourteen months of entries. Three shell entities, all transacting below the individual review threshold — small enough that each one passes without audit, large enough in aggregate to matter. The fragmentation technique matches the ghost account pattern from the Ithtananalor records: amounts split to avoid thresholds, routed through intermediary holding structures with no listed principals. The total across all three entities over the fourteen months is sufficient to fund the simultaneous acquisition of six administrative positions in six different localities. That's not embezzlement. That's a placement operation.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Iron Ledger Ward: same ghost account technique aggregates to enough for 6 simultaneous administrative appointments', 'discovery', `iron-ledger-s1-registry-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The Iron Ledger Ward's public transaction registry covers fourteen months of entries with no topical index — rows organized by date and account number, columns tracking transaction type, amount, and clearing institution. The room is quiet, the access policy permissive, but the volume is prohibitive. Without a specific transaction reference, account name, or credentialed search assistant to run the registry's internal cross-reference system, a useful pass through this material takes a week minimum. You record the access structure and leave with a more precise search strategy for your next visit.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Talk to a factor at the Iron Ledger Ward who specializes in debt instrument verification.",
    tags: ['District', 'Persuasion', 'Social'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'consulting Iron Ledger Ward debt specialist');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `The debt specialist has been in the Iron Ledger Ward long enough to recognize instrument design by intent. "These comply with Principalities commercial law on their face," she says, spreading copies across the table. "But the exit clauses are written to make departure financially ruinous regardless of performance. You can meet every obligation and still end up bound." Three creditor entities, one structural template — the same default threshold, the same compounding schedule, the same personal liability clause. "Whoever drafted these knew exactly what they were building," she says. "This isn't standard leverage. It's a trap with a Compact seal on it."`;
        G.recentOutcomeType = 'success';
        addJournal('Iron Ledger debt specialist: leverage instruments with identical template from 3 creditor entities — designed to create permanent obligation', 'discovery', `iron-ledger-s1-leverage-${G.dayCount}`);
      } else {
        G.lastResult = `The debt specialist has a client meeting starting in ten minutes and runs walk-in inquiries only with a formal engagement on file. She hands you a printed form without looking up from her current document, gestures toward the public registry across the corridor, and describes the credentialing process in two sentences. Her attention is back on her papers before you've stepped away from the desk. The form has four sections and requires a registered institutional affiliation.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Find Maret Voss at the Iron Ledger Ward — she's the analyst who first flagged the ghost account methodology.",
    tags: ['District', 'Social', 'NPC'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'finding Maret Voss at the Iron Ledger Ward');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Maret keeps you standing for the first two minutes, reading you while she finishes something. Then she waves you to the chair. She's been on this for three months and she's hit the boundary of what her jurisdiction allows: she can trace the transactions but the originating entity sits behind a cross-jurisdiction registry search that requires Compact authorization she doesn't hold. "What I can give you," she says, leaning forward, "is pattern confirmation. The methodology is identical to ghost account structures I've documented in two other Principalities cities. Same threshold fragmentation, same holding structure, same timing. This is a template being deployed in multiple locations by the same originating operation."`;
        G.flags.met_maret_voss = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Maret Voss: ghost account methodology identical across 3 Principalities cities — centralized template operation', 'discovery', `iron-ledger-s1-maret-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Maret is in a formal review session that runs another ninety minutes — the colleague at the front desk checks the door schedule before answering. She's available most mornings but review days are blocked. You leave your name and a brief description of the transaction methodology you've been tracing. The colleague sets the note in a tray with three others. Whether Maret picks it up before end of day or files it for later isn't something she can tell you.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  }

];

// ——— CANON DISTRICT: RECKONING QUARTER (justice, dangerous intel) ———
const RECKONING_QUARTER_STAGE1_ENRICHED_CHOICES = [

  {
    label: "Review the public docket at the Reckoning Quarter justice hall — cases filed in the past six months.",
    tags: ['District', 'Lore', 'Investigation'],
    xpReward: 60,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(60, 'reviewing Reckoning Quarter public docket');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `The docket includes three cases that were formally filed, assigned to a magistrate, and then transferred to "administrative review" — a category that removes them from the public docket without formal dismissal. Cases in administrative review are effectively frozen. All three were filed against commercial entities whose names match the alias variations of the northern bloc.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Reckoning Quarter docket: 3 cases against northern bloc aliases frozen in administrative review', 'discovery', `reckoning-s1-docket-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The public docket runs six months deep and is organized by filing date, not by subject matter or party name. The justice hall provides no index — a research clerk is available by appointment for credentialed institutional inquiries only. Working through the docket manually means reading every entry in sequence. The filing volume for six months is several hundred cases. Finding relevant entries without a specific reference number requires more time than a single visit allows.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "A former Bureau adjudicator sits at the café outside the justice hall — she's been outside official positions for two months.",
    tags: ['District', 'Persuasion', 'Social'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'speaking with the former Bureau adjudicator');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `She was the adjudicator for two of the three frozen cases. "I assigned them both to the same magistrate," she says. "The magistrate transferred them to administrative review without notifying me. I filed a complaint about the procedure. Two weeks later, I was informed that my adjudicator contract was not being renewed. No further explanation." She kept her case notes. She gives you the relevant pages.`;
        G.flags.met_former_adjudicator = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Former adjudicator: cases frozen without notification, contract not renewed after complaint — has case notes', 'discovery', `reckoning-s1-adjudicator-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `She's at the table outside with a coffee and a paper she isn't reading. When you approach she watches you cross the last few meters with the flat patience of someone who has fielded many unwanted conversations. She answers your opening question with two words, finishes her cup without hurrying, folds the paper in half, and leaves. Not hostile — just very specifically done. Whatever made her willing to talk to the right person, today's approach wasn't it.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Observe who enters and exits the administrative review office — the unit that absorbs frozen cases.",
    tags: ['District', 'Stealth', 'Investigation'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'surveilling the administrative review office');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Three exits over two hours. Two standard administrative staff. One — in the third exit — is Oversight Collegium, identified by the standard Collegium notation on their satchel clasp. The Collegium has regular access to the administrative review office. They're not just monitoring the frozen cases — they have authorized access to the unit that holds them.`;
        addJournal('Administrative review office: Collegium has authorized regular access — not just monitoring, actively controlling frozen cases', 'discovery', `reckoning-s1-surveillance-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The watching position is across the corridor behind a support column — adequate cover, sightline to the door. The administrative review office runs quiet: three exits over two hours, all of them clerical staff with nothing distinguishing about their carry or their pace. Light traffic could mean the unit is inactive, or it could mean the significant movement happens earlier in the day. One afternoon isn't enough to establish the pattern. The access and the sightline are worth returning to.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  }

];

// ——— CANON DISTRICT: SCRIPTORIUM STEPS (scholarly, forbidden texts) ———
const SCRIPTORIUM_STEPS_STAGE1_ENRICHED_CHOICES = [

  {
    label: "Browse the public stacks at the Scriptorium Steps research library — atmospheric science section.",
    tags: ['District', 'Lore', 'Atmosphere'],
    xpReward: 60,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(60, 'browsing Scriptorium Steps atmospheric science stacks');

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `A text on atmospheric compound behavior under pressure regulation systems — published seven years ago, now marked "supplementary reference only." The margin annotation in pencil by a previous reader: "See Iceveil et al. for updated findings." Iceveil is Toman Iceveil from Glasswake. His findings updated this text's core claims. His findings were then suppressed. The public stack still has the original text; the update exists only in a suppressed study.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Scriptorium Steps: margin annotation links published text to suppressed Iceveil study — academic community knows the gap', 'discovery', `scriptorium-s1-stacks-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The atmospheric science section fills two full rows — standard texts on pressure regulation, dome architecture, compound behavior under variable conditions. All of it publicly accessible, all of it in the general catalog. Nothing is marked for restricted access or flagged for supplementary reference. The section is complete on its face. The absence of restrictions is itself a data point — if any of these texts had been reclassified, their shelf spots would be empty or replaced with a placeholder card. No gaps visible today.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Talk to a senior researcher at the Scriptorium Steps about classification practices for atmospheric chemistry studies.",
    tags: ['District', 'Persuasion', 'Investigation'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'speaking with Scriptorium Steps senior researcher');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Classification of atmospheric chemistry research requires a review board determination — it's not automatic. The researcher explains that the classification process was recently changed: the review board now includes a mandatory Warden Order liaison position. "Before that change," he says, "almost nothing was classified. In the past eighteen months, eleven studies have been classified. That's more than in the previous decade combined."`;
        addJournal('Scriptorium researcher: Warden Order liaison added to review board 18 months ago — 11 studies classified since, vs. decade norm', 'discovery', `scriptorium-s1-researcher-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The researcher is between projects and willing to talk. He covers the general classification framework clearly — review board composition, submission process, appeal channels. But he's been at the Scriptorium Steps for three years and hasn't served on the review board himself; the specific decisions made in the past eighteen months are above his involvement level. He names two colleagues who sit on the board. Neither of them is in the building today.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Find Doss at the Scriptorium Steps — the suppressed scholar from Mimolot Academy who relocated to Shelkopolis.",
    tags: ['District', 'Social', 'NPC'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'finding Doss at Scriptorium Steps');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Doss uses the Scriptorium Steps as his working space — he doesn't have an institutional affiliation here, but the library's open access policy lets him use the reference section indefinitely. He's cautious but once he knows you're connected to the investigation network, he opens his notes. "The formula fragments describe a compound that becomes something different under shard amplification," he says. "It crosses a toxicological threshold. The study that explains that threshold is the Iceveil study. Both were suppressed for the same reason."`;
        G.flags.met_doss_scriptorium = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Doss at Scriptorium: Mimolot formula + Glasswake shard amplification crosses toxicological threshold — both suppressed together', 'discovery', `scriptorium-s1-doss-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Doss isn't at his usual table in the reference section. A librarian at the circulation desk says he comes in most mornings, typically before the ninth bell, and stays through midday. He has no formal affiliation with the library and no reserved space — the open access policy means his table is available to anyone on days he doesn't come in. She can't leave a message for him. He'll either be here tomorrow or he won't.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  }

];

// ——— SYNTHETIC POOL: HIGH QUARTER (formal power, high-skill choices) ———
const HIGH_QUARTER_STAGE1_ENRICHED_CHOICES = [

  {
    label: "Attend the formal administrative hearing in the High Quarter — a dispute over district authority and resource allocation.",
    tags: ['District', 'Persuasion', 'Social'],
    xpReward: 60,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(60, 'attending High Quarter administrative hearing');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The hearing concerns resource allocation for district maintenance — specifically, who controls access to the atmospheric system access points within the High Quarter. An external consulting firm is bidding to take over maintenance contracts currently held by a district cooperative. The consulting firm's name rotates through the same alias variants as the northern bloc. The bid is being considered seriously by the district authority.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('High Quarter hearing: northern bloc alias bidding for atmospheric system maintenance contracts in this district', 'discovery', `high-quarter-s1-hearing-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The hearing covers routine administrative matters — budget allocations for the coming quarter, two maintenance contract renewals, a dispute over right-of-access to a shared utility corridor. The presiding officer works through each item without deviation. The gallery holds a handful of credentialed observers and three factor representatives waiting for the next item. None of the agenda entries touch atmospheric systems or the vent shaft access currently being litigated elsewhere in the district.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Access the High Quarter formal library — restricted to district residents and credentialed researchers, but accessible with the right documentation.",
    tags: ['District', 'Lore', 'Investigation'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'accessing High Quarter formal library');
      if (!G.flags) G.flags = {};

      const result = rollD20('lore', (G.skills.lore || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The formal library's restricted section contains administrative records going back thirty years. The pre-Union charter fragment from Guildheart appears in a cross-reference index here — it was renewed through this library's administrative arm, not the central registry. The library served as a filing location specifically because it's considered a sub-registry, below the threshold of formal registry monitoring.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('High Quarter library: pre-Union charter renewed through here as sub-registry to avoid formal monitoring', 'discovery', `high-quarter-s1-library-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The library's restricted section requires a two-part credential — a district residency registration or a formal institutional research affiliation, plus a specific access request filed twenty-four hours in advance with the library's administrative clerk. The desk attendant explains the process without apology; the documentation requirement is standard. You record the credentialing steps and the filing deadline. The restricted section's catalog is available in the public area, which tells you what's in there without letting you read any of it.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Meet the High Quarter district liaison — the official connection between district administration and citywide governance.",
    tags: ['District', 'Persuasion', 'NPC'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'meeting the High Quarter district liaison');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `The liaison is careful — her position requires it. But when you reference the atmospheric vent shaft dispute as a research interest, she says something specific: "That's the third inquiry about vent shaft access this quarter. The other two came from people who identified themselves as 'coordinating association representatives.' I've never heard that term before." The pre-Union charter's entity type is a "coordinating commercial association." They've been here before you.`;
        G.flags.met_high_quarter_liaison = true;
        addJournal('High Quarter liaison: two prior \'coordinating association\' inquiries about vent shaft access — charter entity type matches', 'discovery', `high-quarter-s1-liaison-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The liaison is cordial and precise — she answers each question with the specific procedural answer it warrants and nothing additional. Her desk holds two stacks of pending correspondence and a scheduling ledger she glances at twice during the conversation. When you mention the vent shaft dispute in general terms, she describes the formal dispute resolution process without acknowledging whether this district has an active case. Standard procedural answers, no deviation. The meeting ends when you run out of questions she'll answer that way.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  }

];

// ——— SYNTHETIC POOL: COMMON QUARTER (trade, social, survival-tagged) ———
const COMMON_QUARTER_STAGE1_ENRICHED_CHOICES = [

  {
    label: "Walk the Common Quarter market — open stalls, loud, the genuine economic center of the district.",
    tags: ['District', 'Persuasion', 'Social'],
    xpReward: 55,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(55, 'working the Common Quarter market');

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `A food vendor has noticed changes in her regular customers' health over the past three months — nothing dramatic, but a steady increase in the "something's not right" quality of complaint. "They come in looking tired," she says. "Not sick-tired. Heavy-tired. Like breathing is work." The description matches sub-acute atmospheric compound exposure. Her stall is two blocks from a dome access terminal.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Common Quarter vendor: customer fatigue pattern in blocks near dome terminal — consistent with sub-acute exposure', 'discovery', `common-quarter-s1-market-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Market day in the Common Quarter fills the main corridor from wall to wall — vendors calling prices, a pair of children cutting between stalls, the smell of roasting grain from the far end. The conversations you manage to enter are about produce, about a neighbor's new cart, about someone's cousin who owed money and hasn't paid. The economic center of the district runs on close-range trust and daily complaint. Nothing here connects to dome terminals or supply chains.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Find the informal information broker who operates from the corner table at the Common Quarter's main tavern.",
    tags: ['District', 'Stealth', 'Lore'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'consulting the Common Quarter information broker');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The broker knows you're asking about something before you ask it. "Someone else was asking about the dome terminals three weeks ago," he says. "Not investigator — operational. They were asking which terminals are least observed, not what's going into them. I told them nothing. I'm telling you: they know this district as well as I do."`;
        addJournal('Common Quarter broker: operational survey of dome terminals 3 weeks ago — adversary mapped low-observation access points', 'discovery', `common-quarter-s1-broker-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The broker is at his usual corner table with a cup he keeps refilling from a small pot at his elbow. He listens to the shape of your inquiry, names a price, and watches you. The price assumes he has specific knowledge — but without knowing what he knows, it's an amount for a risk rather than a product. He doesn't negotiate and he doesn't offer a summary to raise confidence. He shrugs and turns to the person at the next table. The offer stands when you're ready.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Check the Common Quarter community board — the informal announcements and warnings posted by residents.",
    tags: ['District', 'Survival', 'Atmosphere'],
    xpReward: 55,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(55, 'reading Common Quarter community board');
      G.lastResult = `Three handwritten warnings about nighttime noise near the dome access terminals — residents asking others not to report the noise to the authorities because "last time someone reported it, the person who filed the report got a housing review visit three days later." The community has learned that reporting observations is dangerous. That's not accidental — that's a pattern of suppression operating at the neighborhood level.`;
      G.recentOutcomeType = 'neutral';
      addJournal('Common Quarter board: residents self-censoring on terminal observations after retaliatory housing reviews', 'discovery', `common-quarter-s1-board-${G.dayCount}`);
    }
  }

];

// ——— SYNTHETIC POOL: LOW WARD (labor, contraband, combat-adjacent) ———
const LOW_WARD_STAGE1_ENRICHED_CHOICES = [

  {
    label: "The Low Ward's dock workers move the heavy freight that official manifests don't fully describe. Find the ones who remember specific loads.",
    tags: ['District', 'Combat', 'Persuasion'],
    xpReward: 65,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(65, 'talking to Low Ward dock workers about unusual loads');
      if (!G.flags) G.flags = {};

      const result = rollD20('persuasion', (G.skills.persuasion || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `An older dock worker remembers the containers. "Heavy for their size and wrong balance," he says. "Normal sealed containers have their weight low and center. These ones were distributed evenly — like liquid or loose fill. Industrial standard. Not grain, not equipment parts. Something that moves."`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('Low Ward dock worker: containers had even weight distribution — liquid or loose fill, industrial standard', 'discovery', `low-ward-s1-docks-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The Low Ward docks run a tight schedule — workers loading and stacking in the practiced sequences of people who've done this together for years. Three different approaches, three different dock workers, each one the same: a pause, a look, and a return to work. No explanation offered. One of them, younger, glances at a supervisor on the far end of the dock before looking away from you. The dock workers have learned not to discuss specific loads with strangers. Whatever shaped that habit, it's settled in.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "The Low Ward's enforcement contractor patrols the freight areas. Their patrol schedule has a gap — find it.",
    tags: ['District', 'Stealth', 'Survival'],
    xpReward: 70,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(70, 'mapping the Low Ward enforcement patrol gap');
      if (!G.flags) G.flags = {};

      const result = rollD20('survival', (G.skills.survival || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `The gap is twenty minutes, from the second-to-last patrol post to the return sweep — a window that falls between midnight and one hour past midnight. The dome terminal night deliveries that Hess described in the Ironspool Ward fall within this exact window. The patrol gap wasn't accidental. The enforcement contractor's schedule was adjusted to create it six months ago.`;
        G.flags.low_ward_patrol_gap_mapped = true;
        addJournal('Low Ward patrol gap: 20 minutes midnight to 1am, schedule adjusted 6 months ago — matches dome terminal delivery window', 'discovery', `low-ward-s1-patrol-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The Low Ward enforcement patrol runs less predictably than standard contracted schedules allow — two officers, variable interval, sometimes together and sometimes thirty meters apart. A gap exists, but its edges shift by fifteen minutes depending on the night and the officer pair. One night's observation isn't enough to map a reliable window. Another full night of tracking, with specific timing notes at each checkpoint, would establish the pattern. The patrol is irregular by design or by poor discipline — either way, the gap is real but not yet usable.`;
        G.recentOutcomeType = 'neutral';
      }
    }
  },

  {
    label: "Someone in the Low Ward is selling information about the investigation to whoever wants it. Find them before they sell anything about you.",
    tags: ['District', 'Combat', 'Stealth'],
    xpReward: 75,
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      gainXp(75, 'finding the Low Ward information seller');
      if (!G.flags) G.flags = {};

      const result = rollD20('stealth', (G.skills.stealth || 0) + Math.floor(G.level / 3));
      if (result.total >= 14) {
        G.lastResult = `You find him before he finds information about you. He's a young man who's been approached three times by people he describes as "professional — not like the usual buyers." Each time, they asked about anyone asking about the dome terminals. He hasn't reported you yet because you're the first investigator he's met who found him first. He tells you the three buyers' physical descriptions. One matches Delt Karnn.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addJournal('consequence', 'Low Ward informant: Karnn is one of three buyers monitoring for dome terminal investigations', `low-ward-s1-informant-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The corner table is empty. His cup is still there, still warm. Someone moved faster than you did — word that an inquiry was running reached him before you arrived, and he stepped out. He'll resurface when the situation settles, but not before he's passed your description to whoever is paying him. The buyers monitoring for dome terminal inquiries now have a new entry. The watchfulness clock just moved.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
        G.recentOutcomeType = 'complication';
      }
      if (!G.rivalId) {
        addNarration('A name surfaces in passing — someone who moves through the same paperwork, asks the same questions. You do not have a face yet.');
        if (!G.flags) G.flags = {};
        G.rivalId = 'delt_karnn';
        G.flags.stage1_rival_seeded = true;
      }
    }
  }
,
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
window.AURORA_HEIGHTS_STAGE1_ENRICHED_CHOICES = AURORA_HEIGHTS_STAGE1_ENRICHED_CHOICES;
window.IRONSPOOL_WARD_STAGE1_ENRICHED_CHOICES = IRONSPOOL_WARD_STAGE1_ENRICHED_CHOICES;
window.VERDANT_ROW_STAGE1_ENRICHED_CHOICES = VERDANT_ROW_STAGE1_ENRICHED_CHOICES;
window.GRANARY_STEPS_STAGE1_ENRICHED_CHOICES = GRANARY_STEPS_STAGE1_ENRICHED_CHOICES;
window.IRON_LEDGER_WARD_STAGE1_ENRICHED_CHOICES = IRON_LEDGER_WARD_STAGE1_ENRICHED_CHOICES;
window.RECKONING_QUARTER_STAGE1_ENRICHED_CHOICES = RECKONING_QUARTER_STAGE1_ENRICHED_CHOICES;
window.SCRIPTORIUM_STEPS_STAGE1_ENRICHED_CHOICES = SCRIPTORIUM_STEPS_STAGE1_ENRICHED_CHOICES;
window.HIGH_QUARTER_STAGE1_ENRICHED_CHOICES = HIGH_QUARTER_STAGE1_ENRICHED_CHOICES;
window.COMMON_QUARTER_STAGE1_ENRICHED_CHOICES = COMMON_QUARTER_STAGE1_ENRICHED_CHOICES;
window.LOW_WARD_STAGE1_ENRICHED_CHOICES = LOW_WARD_STAGE1_ENRICHED_CHOICES;
