/**
 * PANIM HAVEN STAGE 2 ENRICHED CHOICES
 * Investigation arc: afterlife-ledger falsification, sealed mediation records, processional disruption
 * NPCs: Elior Sepulcher (Mediator Cleric), Merev Sepulcher (Innkeeper),
 *       Saryna Sepulcher (Market Clerk), Velune Sepulcher (Shrine Attendant), Ithren Sepulcher (Porter)
 */

const PANIM_HAVEN_STAGE2_ENRICHED_CHOICES = [

  {
    label: "Examine the afterlife ledger discrepancies Elior Sepulcher mentioned — irregular entries appearing in the mediation records.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'investigating afterlife ledger');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      const arch = G.archetype && G.archetype.group;
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = arch === 'magic'
          ? `Three afterlife-ledger entries carry ritual invocations that have no place in a secular mediation record — they belong to a specific shrine communication protocol. Someone with theological training inserted them deliberately, using doctrine language as an encoding layer. The decoded content is a delivery schedule with four dates still pending.`
          : `The ledger irregularities trace to a specific cluster of memorial services that were never performed. Coin received, rites logged, names of the deceased recorded. No bodies arrived, no families attended, no officiants were deployed. These are phantom memorial contracts — the form of a transaction used to move coin without a traceable destination.`;
        addJournal('Panim ledger falsification confirmed — phantom memorial contracts', 'evidence', `panim-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `A shrine keeper notices you cross-referencing entries and leaves the room without speaking. Twenty minutes later the ledger access is revoked by written notice from mediation hall oversight. A formal review has been opened. You are excluded from it. The records are sealed while the review runs its course, which may take as long as whoever runs the review decides it should.`;
        addJournal('Ledger access revoked — oversight alerted', 'complication', `panim-ledger-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Three entries stand out clearly. You document them and note what they share: all three involve memorial service dates that cluster within a four-day window, twice in six months. Single irregular entries can be administrative error. The clustering is not. Whatever produced these entries ran on a schedule.`;
        addJournal('Ledger clustering pattern identified', 'evidence', `panim-ledger-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Elior Sepulcher, Mediator Cleric at the Mediation Hall, is the only person with access to the sealed mediation backlog — approach them.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'approaching Elior Sepulcher');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_elior_sepulcher = true;
        G.flags.stage2_faction_contact_made = true;
        G.investigationProgress = (G.investigationProgress||0) + 1;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `Elior closes the office door before speaking. The sealed backlog contains thirty-one cases — all involving the same offering market stall, all flagged by Saryna over six months for unusual transactional patterns, all suppressed before reaching formal review. Elior sets the summary on the table and doesn't pick it up again. "I've been waiting for someone with outside standing to ask about this." He means: someone who can act on it where he cannot.`;
        addJournal('Elior Sepulcher — sealed backlog confirmed with stall pattern', 'evidence', `panim-elior-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Elior listens to your opening and produces a procedural objection form before you finish the second sentence. The request is irregular by mediation hall standards — your standing isn't established in the right channels. The form goes into the hall's record within the hour. Your name, your inquiry, your presence in Panim Haven are all now formally noted at the Mediation Hall level.`;
        addJournal('Mediation Hall formally aware — access restricted', 'complication', `panim-elior-fail-${G.dayCount}`);
      } else {
        G.flags.met_elior_sepulcher = true;
        G.lastResult = `Elior confirms the backlog exists and is sealed. They will not open it without formal authorization but acknowledge the suppression pattern is real and long-standing.`;
        addJournal('Elior confirms suppressed backlog — access refused without authorization', 'evidence', `panim-elior-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Follow the processional route disruption pattern — someone has been rerouting official processions away from specific streets for three months.",
    tags: ['Investigation', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'tracking processional route changes');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('survival', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The rerouted streets form a pattern: they all pass a single building in the memorial district that has no registered purpose in the civic records. The building receives foot traffic at predictable hours that do not correspond to any scheduled service. Someone is using the procession reroutes to create a predictable gap in civic visibility.`;
        addJournal('Processional reroute — cover building identified', 'evidence', `panim-process-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `You follow a wrong processional branch into a memorial crush. You exit the district having seen nothing useful and confirmed as present in three separate porter logs.`;
        addJournal('Processional crush — logged without intelligence gain', 'complication', `panim-process-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The reroutes are real and recent. Three specific streets have been systematically deprioritized in official processional scheduling. The reason given in each case is "ritual traffic management" — a designation that requires no further documentation.`;
        addJournal('Processional reroutes confirmed — ritual traffic cover', 'evidence', `panim-process-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Saryna Sepulcher at the Offering Market Stall has been flagging the same coin flow irregularities for six months — get the full report.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'accessing Saryna Sepulcher market report');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_saryna_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Saryna has kept a personal copy of every suppressed flag. The flags describe coin entering the market in memorial offering form and leaving through a purchasing pattern that corresponds to no registered buyer. The exits are clean on paper. The entries show a single repeating source — a northern account attached to a subsidiary charter.`;
        addJournal('Saryna personal flags — northern account identified', 'evidence', `panim-saryna-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Saryna hesitates when you name the specific transactions. She has been warned not to discuss them. The warning came from above her role. She cannot say more without risk.`;
        addJournal('Saryna warned off — source above her role', 'complication', `panim-saryna-fail-${G.dayCount}`);
      } else {
        G.flags.met_saryna_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Saryna confirms the irregularities and shows you three flagged entries. The suppression chain stops at the mediation oversight level — one rank above Elior. That rank is not accountable to civic review without a formal inquest.`;
        addJournal('Saryna flags confirmed — oversight suppression chain', 'evidence', `panim-saryna-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Shrine of Divine Balance has witnessed unusual activity after hours — Velune Sepulcher will only confirm this to someone they trust.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'gaining Velune Sepulcher trust');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_velune_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Velune speaks after long silence: three times in the past month, a figure arrived at the shrine at the third hour with what Velune describes as "not an offering — a confirmation." The figure used ritual language correctly but in the wrong order — liturgically inverted. It's a recognized counter-ritual used in certain forbidden summoning traditions. Someone is using the shrine for a specific type of arcane registration.`;
        addJournal('Velune confirms shrine misuse — inverted ritual identified', 'evidence', `panim-velune-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `Your approach comes across as accusatory. Velune refuses and formally records your questions in the shrine attendance log. The divine balance is not to be questioned by strangers.`;
        addJournal('Shrine attendance logged — reverence damaged', 'complication', `panim-velune-fail-${G.dayCount}`);
      } else {
        G.flags.met_velune_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Velune confirms unusual evening visits but describes them vaguely. "Someone who knows how to use the shrine without being known here." That is specific enough to tell you the person is trained.`;
        addJournal('Velune confirms unusual shrine visits — trained visitor', 'evidence', `panim-velune-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Ithren Sepulcher, the Porter at the Processional Gate, moves everything that enters and leaves the district — ask about unusual cargo.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'questioning Ithren Sepulcher porter');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_ithren_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Ithren has a porter's memory: he names three sealed containers that arrived under memorial service manifests but did not match standard offering weight profiles. Two were light. One was significantly heavy — heavy enough that he noted it in the unofficial cargo log he keeps for his own records.`;
        addJournal('Ithren cargo log — weight anomalies confirmed', 'evidence', `panim-ithren-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Ithren is officially bound by processional gate protocols. He cannot discuss cargo details and makes this clear with the practiced firmness of someone who has been warned about exactly this type of question.`;
        addJournal('Porter protocols invoked — Ithren warned off', 'complication', `panim-ithren-fail-${G.dayCount}`);
      } else {
        G.flags.met_ithren_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Ithren confirms unusual cargo movement without details. "Some things arrive as one type and leave as another. I don't ask. That's not my role." He holds eye contact long enough for you to understand this is an answer.`;
        addJournal('Ithren confirms cargo irregularity — no details given', 'evidence', `panim-ithren-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The Oversight Collegium has an observer posted in Panim Haven — they are the faction antagonist to your investigation. First contact.",
    tags: ['Faction', 'Antagonist', 'Stage2', 'Meaningful'],
    xpReward: 86,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(86, 'Oversight Collegium first contact');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.factionHostility) G.factionHostility = {};
      if (!G.flags) G.flags = {};
      if (!G.rivalId) G.rivalId = 'archivist_veld';
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.flags.stage2_faction_contact_made = true;
        G.lastResult = `The Collegium observer presents as a theological scholar. Your training reads the cover correctly. You match their doctrinal citations with precision that establishes mutual recognition. The conversation shifts: they confirm the Collegium is aware of the Panim operations and is conducting a parallel inquiry. They offer to share specific findings in exchange for what you have gathered.`;
        addJournal('faction', 'Oversight Collegium contact — parallel inquiry confirmed', `panim-collegium-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 2;
        G.factionHostility.oversight_collegium = (G.factionHostility.oversight_collegium||0) + 2;
        G.lastResult = `The observer identifies you as an unaffiliated operative and reports this to the Collegium. The Collegium now treats your investigation as a competing operation that must be contained.`;
        addJournal('Collegium treating investigation as competing operation', 'complication', `panim-collegium-fail-${G.dayCount}`);
      } else {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.lastResult = `Neutral first contact. The observer acknowledges your presence in the investigation space without declaring intent. The Collegium has noted you. The note is neither positive nor hostile — yet.`;
        addJournal('faction', 'Oversight Collegium — neutral first assessment', `panim-collegium-neutral-${G.dayCount}`);
      }
      G.recentOutcomeType = 'faction'; maybeStageAdvance();
    }
  },

  {
    label: "Access the Reckoning Quarter records at night — the suppressed inquest files are stored in the district registry.",
    tags: ['Stealth', 'Investigation', 'Stage2', 'Meaningful'],
    xpReward: 84,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'night access to district registry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('stealth', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The registry at night is unguarded but sealed. Your method bypasses the seals without triggering the alert mechanism. Inside: 31 suppressed inquest files, each connecting a phantom memorial contract to a specific coin destination in the northern districts. The investigation has a full transaction chain now.`;
        addJournal('Registry accessed — 31 suppressed files obtained', 'evidence', `panim-registry-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The seal alert triggers silently. You are gone before the guard arrives but the entry is logged. By morning, a formal security inquiry has been opened.`;
        addJournal('Registry alert triggered — security inquiry opened', 'complication', `panim-registry-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `You access the registry and photograph six files before the approach window closes. Enough to confirm the chain exists and to identify two transaction endpoints.`;
        addJournal('Registry partial access — transaction endpoints identified', 'evidence', `panim-registry-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Innkeeper Merev Sepulcher at the Memorial Inn hears every conversation in the building — ask what they have noted in the past month.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'questioning Merev Sepulcher innkeeper');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_merev_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Merev has been keeping notes. Three guests in the past month used the inn as a meeting point and paid in memorial coin — an unusual denominator for secular transactions. Their conversations centered on "completion schedules" and "verification windows." Memorial language used for non-memorial logistics.`;
        addJournal('Memorial coin transaction pattern — Merev log', 'evidence', `panim-merev-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Merev is professionally closed about guest matters. In Panim Haven, innkeepers at memorial facilities are bound by the same confidentiality as shrines. They decline on principle.`;
        addJournal('Memorial confidentiality invoked — no access', 'complication', `panim-merev-fail-${G.dayCount}`);
      } else {
        G.flags.met_merev_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Merev mentions three unusual guests without names. The guests spoke quietly and paid precisely. "Everything about them was deliberate. That's what I remember most."`;
        addJournal('Memorial Inn — deliberate guests noted without detail', 'evidence', `panim-merev-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The divine balance obligations pressure creates systemic overload in the mediation hall — map the pressure to find who benefits from the backlog.",
    tags: ['Lore', 'Investigation', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'mapping mediation backlog beneficiaries');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('lore', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The backlog is not accidental — it is managed. Specific cases have been routinely deferred to keep the mediation hall's formal review capacity saturated. A saturated hall cannot investigate new anomalies. The backlog is the cover for the phantom memorial contracts to operate undetected.`;
        addJournal('Mediation backlog is deliberate operational cover', 'evidence', `panim-backlog-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your analysis of the backlog reaches a wrong conclusion that several mediation clerks pointedly correct. The embarrassment reduces your standing as an investigator in the district.`;
        addJournal('Backlog analysis error — credibility reduced', 'complication', `panim-backlog-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The backlog pattern shows deliberate management without proving intent. Enough to know that someone with access to the scheduling system has been influencing case priority.`;
        addJournal('Backlog management pattern — scheduling access implicated', 'evidence', `panim-backlog-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Stage 2 Panim finale — present the phantom memorial evidence and decide whether to proceed through official or informal channels.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 110,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(110, 'Panim Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The investigation in Panim Haven is not complete. More evidence needed before the final step.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('persuasion', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `You present to the civic oversight authority with the suppressed files, the coin chain, and the cargo anomalies as evidence. A formal inquest opens. Your name is on the filing. Stage III opens with institutional backing and maximum visibility.`;
        addJournal('Panim S2 finale: formal inquest opened', 'evidence', `panim-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `You route the evidence through the Collegium contact and Merev's informal network simultaneously. The institutional response will come, but the underground circuit creates immediate pressure on the operation before the formal channels can be stalled again.`;
        addJournal('Panim S2 finale: informal circuit activated', 'evidence', `panim-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.PANIM_HAVEN_STAGE2_ENRICHED_CHOICES = PANIM_HAVEN_STAGE2_ENRICHED_CHOICES;
