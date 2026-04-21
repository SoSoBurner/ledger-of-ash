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
      G.lastResult = `The notice board lists three upcoming administrative reviews, two property hearings, and one environmental compliance report — all routine on their face. The environmental compliance report is dated three months ago, which is unusual. Compliance reports are filed annually. A mid-cycle report suggests something triggered an unscheduled review. The report number is in the Warden Order's jurisdictional series.`;
      G.recentOutcomeType = 'neutral';
      addJournal('discovery', 'Aurora Heights: mid-cycle environmental compliance report — Warden Order series, unscheduled', `aurora-heights-s1-notices-${G.dayCount}`);
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
        G.lastResult = `A property dispute between a northern trading consortium and a residential cooperative over maintenance access rights to an atmospheric vent shaft. The consortium's representative argues that their pre-Union charter supersedes the cooperative's registered access claim. The magistrate defers for a written ruling. The consortium used the same language as the Guildheart pre-Union charter.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Aurora Heights court: pre-Union charter invoked for atmospheric vent shaft access — same language as Guildheart charter', `aurora-heights-s1-court-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The formal session is administrative routine — property lines, maintenance agreements, access rights. Nothing unusual today.`;
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
        G.lastResult = `In the district maintenance records from eleven months ago: a workorder for "filtration system adjustment — dome sector 4." The workorder was filed by a contractor company that doesn't appear in the current contractor registry. The dome sector 4 corresponds to the residential blocks adjacent to the atmospheric vent shafts that the consortium is currently disputing access to in court.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Aurora Heights archive: unregistered contractor filtration workorder 11 months ago — dome sector 4 matches contested vent shafts', `aurora-heights-s1-archive-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The archive reading room has the documents you want but the filing organization makes them difficult to navigate without a guide. You find general district history but not the specifics you need.`;
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
        G.lastResult = `She takes three turns that add ten minutes to any direct route, checking behind her each time. She delivers the letter to a private address that doesn't appear in the district business registry. The building has a maintenance contractor's sign on the door — same contractor company as the dome sector 4 workorder.`;
        G.recentOutcomeType = 'success';
        addJournal('discovery', 'Aurora Heights official: letter to unregistered building — same contractor as dome workorder', `aurora-heights-s1-follow-${G.dayCount}`);
      } else {
        G.lastResult = `She moves too quickly through the district's formal pedestrian corridors — designed exactly to make surveillance obvious. You lose her at the third corner.`;
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
      G.lastResult = `The public schematics are a simplified version of the full technical document — enough to show the general layout but not the detailed specifications. They confirm that dome sector 4 connects to sectors 2, 5, and 7 through shared pressure equalization vents. Whatever enters sector 4 propagates to three other sectors within the equalization cycle. The contested vent shaft access is not just access to sector 4 — it's access to the entire connected cluster.`;
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
        G.lastResult = `A maintenance worker mentions that the dome sector vents in this district have been running "different" for three months — a subtle change in the pressure cycle timing that she notices because she's been working this sector for seven years. "It's not wrong," she says. "Just different. I filed a query. Nobody came."`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Ironspool maintenance worker: dome vent pressure cycle changed 3 months ago, unanswered query', `ironspool-s1-shift-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Shift change is too busy for conversation — everyone's focused on getting from one place to another. The ward is loud and fast and doesn't welcome lingering.`;
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
        G.lastResult = `The cargo registry shows four entries over the past two months under "maintenance supply — dome sector" that are vague enough to be useless as manifest declarations. Normally maintenance supply entries include part numbers and contractor references. These four have neither. They were accepted anyway, by the same duty officer on each occasion.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Ironspool cargo registry: 4 vague dome maintenance entries, same duty officer accepted all four', `ironspool-s1-cargo-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The cargo registry is dense with standard industrial entries. Nothing immediately anomalous.`;
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
        G.lastResult = `The exchange operates out of a maintenance equipment storage building adjacent to the dome access terminal. The handler there isn't moving the usual contraband — he's moving documentation. Manifests, specifically. He sells altered manifests for industrial materials that need to move through checkpoint without inspection. His customers include at least one contractor who matches the Aurora Heights unregistered maintenance company profile.`;
        addJournal('discovery', 'Ironspool contraband exchange sells altered manifests — same contractor profile as Aurora Heights dome workorder', `ironspool-s1-exchange-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `You find the general area but not the specific location. The exchange point moves if it feels watched.`;
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
        G.lastResult = `Her name is Hess. She's been in the ward forty years. "Three months ago, something changed," she says. "Before that, the dome access terminal was quieter. Now it gets a delivery at night, twice a week, carried in by people who don't work for any contractor I recognize. I asked the terminal duty officer. He told me it was maintenance. I told him maintenance workers don't carry things by hand in the middle of the night. He stopped answering my questions."`;
        G.flags.met_hess_ironspool_resident = true;
        addJournal('discovery', 'Hess: dome terminal night deliveries twice weekly, unknown carriers — duty officer stopped answering questions', `ironspool-s1-hess-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `She's pleasant but doesn't volunteer information to strangers. You'll need to establish more trust before she opens up.`;
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
        G.lastResult = `A botanist is documenting an unusual pattern in the botanical station's atmospheric test plants — slow bleaching of upper leaf surfaces consistent with airborne compound exposure at sub-acute concentrations. She's been seeing it for eight weeks. "It's not pollution," she says. "The compound profile is too specific. It has a synthesis signature."`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Verdant Row botanist: plant bleaching from specific synthesis-signature compound — 8 weeks of exposure', `verdant-row-s1-botanical-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The botanical station is conducting routine seasonal studies. Nothing that requires your attention.`;
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
        G.lastResult = `The senior healer shows you her symptom log with visible frustration. "Fatigue, mild respiratory irritation, pressure sensitivity — all at sub-acute levels. I've been treating it as seasonal for two months but the pattern doesn't break between seasons. It's continuous and it's concentrated in the residential blocks adjacent to the dome access terminals." She hasn't connected the geography to the terminals yet.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Verdant Row healer: continuous symptom cluster in blocks adjacent to dome terminals — not seasonal', `verdant-row-s1-healer-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The healer is busy and can only spare a moment. "Seasonal complaints," she says. "Same as always this time of year." The log she doesn't show you might say more.`;
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
      G.lastResult = `Three hours in the garden. What passes through: residents, a maintenance contractor's crew that doesn't stop to speak with anyone, a Collegium observer who marks something in a notebook but doesn't approach the healer's collective, and two children who tell you a joke. The maintenance crew had the same hand tool configuration as the Ironspool Ward's dome terminal night deliveries.`;
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
        G.lastResult = `The distribution floor handles hundreds of tonnes of grain per day through a mechanized sorting system. The system connects directly to the dome atmospheric distribution network for humidity regulation. The humidity regulation intake is a secondary channel — theoretically for maintaining optimal grain storage conditions, but structurally identical to an atmospheric compound distribution point. Anything introduced through the humidity intake propagates through the same dome system as the primary atmospheric supply.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Granary Steps humidity intake connects to dome atmospheric system — secondary channel for compound distribution', `granary-s1-floor-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The distribution floor is busy and loud — not a place for careful observation. You note the general layout and leave.`;
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
        G.lastResult = `The clerk notices discrepancies. "Four containers declared as grain treatment supplement — the stuff we add to the humidity system for pest prevention — but the quantities were three times our standard monthly allocation. I flagged it. My supervisor told me the allocation had been increased for a new treatment protocol. There's no documentation for the new protocol."`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Granary Steps: triple-quantity grain treatment supplement deliveries, no protocol documentation', `granary-s1-clerk-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The clerk is busy and doesn't have time for informal inquiries. Try the formal records room.`;
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
        G.lastResult = `The storage bay currently holds six containers of grain treatment supplement. All six bear the same charter mark — the capital C with horizontal strike that you've traced from Ironhold through Whitebridge to Harvest Circle. The supply chain didn't just end at Shelkopolis's port. It was routed directly to the Granary Steps humidity intake system. The dome atmospheric distribution has been receiving these containers for months.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Granary Steps supplement containers: charter mark confirmed — supply chain routed directly to dome humidity intake', `granary-s1-charter-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The mark is there but you can't get close enough to the containers to study it without a credentialed storage authorization.`;
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
        G.lastResult = `In the past fourteen months, a series of transactions flow through three shell entities — all below the individual review threshold, all using the same fractional fragmentation technique as the Ithtananalor ghost accounts. The aggregate is significant: enough capital to fund the acquisition of six administrative positions across different localities, all at the same time.`;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Iron Ledger Ward: same ghost account technique aggregates to enough for 6 simultaneous administrative appointments', `iron-ledger-s1-registry-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `The registry is available but navigating fourteen months of entries without a specific transaction reference number is a multi-day task. You note the access method and come back with a better search strategy.`;
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
        G.lastResult = `The debt specialist has seen leverage instruments structured in ways that technically comply with Principalities commercial law while creating binding obligations that are nearly impossible to exit without significant personal financial loss. "Whoever's using these instruments knows they're designed to trap," she says. "I've seen them come through from three different creditor entities in the past year — all with the same structural template."`;
        G.recentOutcomeType = 'success';
        addJournal('discovery', 'Iron Ledger debt specialist: leverage instruments with identical template from 3 creditor entities — designed to create permanent obligation', `iron-ledger-s1-leverage-${G.dayCount}`);
      } else {
        G.lastResult = `The debt specialist is between clients and can't discuss specific instruments without a formal engagement. She points you to the public registry.`;
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
        G.lastResult = `Maret receives you cautiously. She's been working the ghost account anomaly for three months and has hit a wall: she can trace the transactions but she can't identify the originating entity without a cross-jurisdiction registry search that requires Compact authorization — which she doesn't have. "What I can tell you," she says, "is that the methodology is identical to accounts I've seen in two other Principalities cities. This is a template, not a one-off."`;
        G.flags.met_maret_voss = true;
        if (!G.investigationProgress) G.investigationProgress = 0;
        G.investigationProgress++;
        addJournal('discovery', 'Maret Voss: ghost account methodology identical across 3 Principalities cities — centralized template operation', `iron-ledger-s1-maret-${G.dayCount}`);
        G.recentOutcomeType = 'success';
      } else {
        G.lastResult = `Maret is in a review session and can't be interrupted. She'll be available tomorrow.`;
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
        addJournal('discovery', 'Reckoning Quarter docket: 3 cases against northern bloc aliases frozen in administrative review', `reckoning-s1-docket-${G.dayCount}`);
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
        addJournal('discovery', 'Former adjudicator: cases frozen without notification, contract not renewed after complaint — has case notes', `reckoning-s1-adjudicator-${G.dayCount}`);
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
        addJournal('discovery', 'Administrative review office: Collegium has authorized regular access — not just monitoring, actively controlling frozen cases', `reckoning-s1-surveillance-${G.dayCount}`);
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
        addJournal('discovery', 'Scriptorium Steps: margin annotation links published text to suppressed Iceveil study — academic community knows the gap', `scriptorium-s1-stacks-${G.dayCount}`);
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
        addJournal('discovery', 'Scriptorium researcher: Warden Order liaison added to review board 18 months ago — 11 studies classified since, vs. decade norm', `scriptorium-s1-researcher-${G.dayCount}`);
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
        addJournal('discovery', 'Doss at Scriptorium: Mimolot formula + Glasswake shard amplification crosses toxicological threshold — both suppressed together', `scriptorium-s1-doss-${G.dayCount}`);
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
        addJournal('discovery', 'High Quarter hearing: northern bloc alias bidding for atmospheric system maintenance contracts in this district', `high-quarter-s1-hearing-${G.dayCount}`);
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
        addJournal('discovery', 'High Quarter library: pre-Union charter renewed through here as sub-registry to avoid formal monitoring', `high-quarter-s1-library-${G.dayCount}`);
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
        addJournal('discovery', 'High Quarter liaison: two prior \'coordinating association\' inquiries about vent shaft access — charter entity type matches', `high-quarter-s1-liaison-${G.dayCount}`);
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
        addJournal('discovery', 'Common Quarter vendor: customer fatigue pattern in blocks near dome terminal — consistent with sub-acute exposure', `common-quarter-s1-market-${G.dayCount}`);
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
        addJournal('discovery', 'Common Quarter broker: operational survey of dome terminals 3 weeks ago — adversary mapped low-observation access points', `common-quarter-s1-broker-${G.dayCount}`);
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
      addJournal('discovery', 'Common Quarter board: residents self-censoring on terminal observations after retaliatory housing reviews', `common-quarter-s1-board-${G.dayCount}`);
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
        addJournal('discovery', 'Low Ward dock worker: containers had even weight distribution — liquid or loose fill, industrial standard', `low-ward-s1-docks-${G.dayCount}`);
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
        addJournal('discovery', 'Low Ward patrol gap: 20 minutes midnight to 1am, schedule adjusted 6 months ago — matches dome terminal delivery window', `low-ward-s1-patrol-${G.dayCount}`);
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
