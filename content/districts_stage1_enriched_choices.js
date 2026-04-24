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
        G.lastResult = `The session covers property boundary disputes, a maintenance contract renewal, and two access right filings. The magistrate handles all of it in the flat register of someone who has done this for twenty years. Nothing here demands a second look.`;
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
        G.lastResult = `The archive reading room is organized by district quarter and then by year — not by subject matter. Without a specific filing reference, navigating it is a half-day task at minimum. You note the structure and the access protocol for when you have a more precise entry point.`;
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
        G.lastResult = `She takes three extra turns — each one adding time to any direct route, each one giving her a sightline back along the path. At the third corner she pauses and checks before moving. The delivery point is a private address with no business registry entry. The maintenance contractor's sign on the door carries the same company name as the dome sector 4 workorder filed eleven months ago. The same unregistered contractor. She knows where the work came from.`;
        G.recentOutcomeType = 'success';
        addJournal('Aurora Heights official: letter to unregistered building — same contractor as dome workorder', 'discovery', `aurora-heights-s1-follow-${G.dayCount}`);
      } else {
        G.lastResult = `Aurora Heights pedestrian corridors are wide, well-lit, and offer no cover. She walks at a pace that closes distances fast, and by the third turn you've fallen behind enough to lose the trail. The district was designed for visibility, which works against anyone following and for anyone being followed.`;
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
        G.lastResult = `The Ironspool Ward cargo registry runs to several hundred entries per week. Without a specific date range, company name, or manifest code to search against, the volume is too large for a single afternoon's pass. You log the access method and the search parameters you'd need.`;
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
        G.lastResult = `She opens the door and reads you in about four seconds. She says she hopes you find what you're looking for and closes it again. Not hostile — measured. She's been in this ward long enough to know the difference between strangers who can be trusted and strangers who haven't established it yet. You're still in the second category.`;
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
        G.lastResult = `The botanical station is mid-season and occupied. The work being done is standard comparative growth monitoring — nothing atmospheric. The researchers are polite, busy, and not looking up from their ledgers for long.`;
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
        G.lastResult = `The healer has a patient in the back room and three more waiting outside. "Seasonal," she says, already moving. "Standard presentation for this time of year. The log is there if you want to look, but nothing stands out." The log is there, closed, on a shelf she doesn't point to specifically.`;
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
        G.lastResult = `The Granary Steps distribution floor is operational and loud — machinery noise, shouted count-calls, the constant movement of carts and conveyor belts. You can walk through it but you can't stop and study anything without obstructing the work. You note the general floor plan and leave.`;
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
        G.lastResult = `The receiving clerk is mid-count when you arrive and waves you to the records room at the end of the corridor. The records room is staffed by a different person who doesn't handle informal inquiries during active intake hours. There's a formal request form.`;
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
        G.lastResult = `The containers are visible from the bay entrance but examining them closely requires a credentialed storage authorization that you don't currently hold. The mark you're looking for may be there. You can't get near enough to confirm it today.`;
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
        G.lastResult = `The Iron Ledger Ward's public transaction registry covers fourteen months of entries with no topical index — entries are organized by date and account number, not subject. Without a specific transaction reference, account name, or credentialed search assistant, a manual review is a week of work minimum. You note the access structure and leave with a clearer search strategy for next time.`;
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
        G.lastResult = `The debt specialist has a client meeting starting in ten minutes and can't take a walk-in without a formal engagement on file. She hands you a form and points to the public registry across the corridor. Her attention is already elsewhere before you've left her desk.`;
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
        G.lastResult = `Maret is in a formal review session that runs another ninety minutes. The colleague at the front desk says she's available most mornings but not to try walk-ins on review days. You leave your name with a note. No certainty she'll follow up.`;
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
        G.lastResult = `The public docket is extensive and organized by filing date rather than subject matter. Finding relevant entries requires more time than available today.`;
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
        G.lastResult = `She's guarded and doesn't speak to strangers about her work situation. She finished her coffee and left.`;
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
        G.lastResult = `You find a watching position but the office traffic is too light to draw conclusions from a single afternoon's observation.`;
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
        G.lastResult = `The atmospheric science section is well-stocked with standard texts. Nothing marked for restricted access.`;
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
        G.lastResult = `The researcher is between projects and happy to talk in general terms, but doesn't have specific institutional knowledge of recent classification decisions.`;
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
        G.lastResult = `Doss isn't at the Scriptorium Steps today. A librarian says he comes in most mornings. Try again tomorrow.`;
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
        G.lastResult = `The hearing covers routine administrative matters — budget allocations, maintenance schedules. Nothing visible connects to your investigation today.`;
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
        G.lastResult = `Access requires additional documentation. You make note of the credentialing process and come back when you have the right papers.`;
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
        G.lastResult = `The liaison is professional but not forthcoming with strangers. Standard procedural answers only.`;
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
        G.lastResult = `Market day in the Common Quarter is busy and cheerful. People buy, sell, argue, joke. Nothing connects obviously to your investigation.`;
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
        G.lastResult = `The broker is busy and prices his information at a rate that you're not willing to pay without more confidence in what he knows. He shrugs and talks to someone else.`;
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
        G.lastResult = `The dock workers aren't talking to strangers about specific loads. They've learned not to.`;
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
        G.lastResult = `The patrol is more irregular than you expected. You can't establish a reliable gap without another full night of observation.`;
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
        G.lastResult = `You find his location but he's not there. Someone tipped him off that an investigator was looking. He'll resurface — but not before he's told his buyers you were asking.`;
        if (!G.worldClocks) G.worldClocks = {};
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 2;
        G.recentOutcomeType = 'complication';
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
