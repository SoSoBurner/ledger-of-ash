/**
 * PANIM HAVEN STAGE 2 ENRICHED CHOICES
 * Investigation arc: afterlife-ledger falsification, sealed mediation records, processional disruption
 * NPCs: Elior Sepulcher (Mediator Cleric), Merev Sepulcher (Innkeeper),
 *       Saryna Sepulcher (Market Clerk), Velune Sepulcher (Shrine Attendant), Ithren Sepulcher (Porter)
 */

const PANIM_HAVEN_STAGE2_ENRICHED_CHOICES = [

  {
    label: "The afterlife ledger has irregular entries. The clustering is not administrative error.",
    tags: ['Investigation', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'investigating afterlife ledger');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
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
        G.lastResult = `A shrine keeper notices you cross-referencing entries and leaves the room without speaking. Twenty minutes later the ledger access is revoked by written notice from mediation hall oversight. A formal review has been opened. You are excluded from it. The records are sealed while the review runs its course. The suppressed inquest files themselves were logged through the district registry — a different system, with a different keeper.`;
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
    label: "Elior Sepulcher holds the sealed backlog. He's been waiting for someone with outside standing.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'approaching Elior Sepulcher');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
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
        G.lastResult = `The office door stays open when Elior speaks, which keeps the exchange on the record. The backlog exists and is sealed — he confirms this without hesitation. Formal authorization is required before it opens. The suppression pattern is real, long-standing, and documented. He is telling you as much as he can within the boundaries of what his position permits him to say.`;
        addJournal('Elior confirms suppressed backlog — access refused without authorization', 'evidence', `panim-elior-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Processions keep missing the same streets. Three months of the same gap.",
    tags: ['Investigation', 'Survival', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'tracking processional route changes');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The rerouted streets form a pattern: they all pass a single building in the memorial district that has no registered purpose in the civic records. The building receives foot traffic at predictable hours that do not correspond to any scheduled service. Someone is using the procession reroutes to create a predictable gap in civic visibility.`;
        addJournal('Processional reroute — cover building identified', 'evidence', `panim-process-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The wrong branch takes you into a memorial crush — a procession moving at the slowest ritual pace, hemmed on both sides by family parties holding candle-covered biers. An hour passes before the crowd thins. Nothing useful surfaces. By the time you reach an open lane, three separate porter logs have recorded a presence matching your description moving against the processional flow in a restricted memorial corridor.`;
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
    label: "Saryna's flags have been suppressed six months. She kept her own copies.",
    tags: ['NPC', 'Lore', 'Stage2', 'Meaningful'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'accessing Saryna Sepulcher market report');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_saryna_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Saryna has kept a personal copy of every suppressed flag. The flags describe coin entering the market in memorial offering form and leaving through a purchasing pattern that corresponds to no registered buyer. The exits are clean on paper. The entries show a single repeating source — a northern account attached to a subsidiary charter.`;
        addJournal('Saryna personal flags — northern account identified', 'evidence', `panim-saryna-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The specific transaction names land and something behind Saryna's expression closes. She sets down the ledger she was holding, not quickly but with care, the way someone sets down something they no longer want to be seen holding. A warning came from above her role. She cannot name the source and will not try. The stall resumes around her as if the question had never arrived.`;
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
    label: "Something arrives at the third hour. Velune won't name it to a stranger.",
    tags: ['NPC', 'Stealth', 'Stage2', 'Meaningful'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'gaining Velune Sepulcher trust');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_velune_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Velune speaks after long silence: three times in the past month, a figure arrived at the shrine at the third hour with what Velune describes as "not an offering — a confirmation." The figure used ritual language correctly but in the wrong order — liturgically inverted. It's a recognized counter-ritual used in certain forbidden summoning traditions. Someone is using the shrine for a specific type of arcane registration.`;
        addJournal('Velune confirms shrine misuse — inverted ritual identified', 'evidence', `panim-velune-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.reverence = (G.worldClocks.reverence||0) - 1;
        G.lastResult = `The phrasing is wrong before the second question is finished. Velune draws herself upright, not in anger but in the specific way a shrine attendant distances from a transgression, and reaches for the attendance log. Each question is entered verbatim. Her handwriting is clear and unhurried. "The shrine records all who come with doubt shaped as accusation." She does not ask you to leave. She does not need to.`;
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
    label: "Ithren Sepulcher has a porter's memory. He noticed which cargo didn't weigh right.",
    tags: ['NPC', 'Craft', 'Stage2', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'questioning Ithren Sepulcher porter');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_ithren_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Ithren has a porter's memory: he names three sealed containers that arrived under memorial service manifests but did not match standard offering weight profiles. Two were light. One was significantly heavy — heavy enough that he noted it in the unofficial cargo log he keeps for his own records.`;
        addJournal('Ithren cargo log — weight anomalies confirmed', 'evidence', `panim-ithren-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The answer arrives without hesitation, which means it was prepared. Processional gate protocols cover cargo details — he cannot discuss them. The practiced firmness in his voice is the kind that comes from a specific prior warning, not from general policy. He holds eye contact for a beat longer than the refusal required, then looks back at the gate register. What he knows is behind a door he has been told to keep closed. The weight anomalies he logged still exist in the general cargo ledger, which runs on a different protocol.`;
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
    label: "The Collegium observer is running a parallel inquiry. They don't know I've noticed yet.",
    tags: ['Faction', 'Antagonist', 'Stage2', 'Meaningful'],
    xpReward: 86,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(86, 'Oversight Collegium first contact');
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.factionHostility) G.factionHostility = {};
      if (!G.flags) G.flags = {};
      if (!G.rivalId) G.rivalId = 'archivist_veld';
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.flags.stage2_faction_contact_made = true;
        G.lastResult = `The Collegium observer presents as a theological scholar. Your training reads the cover correctly. You match their doctrinal citations with precision that establishes mutual recognition. The conversation shifts: they confirm the Collegium is aware of the Panim operations and is conducting a parallel inquiry. They offer to share specific findings in exchange for what you have gathered.`;
        addJournal('faction', 'Oversight Collegium contact — parallel inquiry confirmed', `panim-collegium-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 2;
        G.factionHostility.oversight_collegium = (G.factionHostility.oversight_collegium||0) + 2;
        G.lastResult = `The doctrinal response is confident and wrong, and the observer catches it. Their posture shifts — the studied ease of a scholar drops and something more deliberate replaces it. The conversation ends on a courtesy that means nothing. Before the evening bell the Collegium has a report: unaffiliated operative, unknown allegiance, active in Panim mediation inquiry. The framing has changed from parallel to competing.`;
        addJournal('Collegium treating investigation as competing operation', 'complication', `panim-collegium-fail-${G.dayCount}`);
      } else {
        G.worldClocks.rival = (G.worldClocks.rival||0) + 1;
        G.lastResult = `The observer's doctrinal citations are precise and the conversation stays on that surface — two scholars discussing archival practice in a memorial hall. No names exchanged. No intent declared. When it ends, there is a beat of shared understanding that the exchange was not about archives. The Collegium has taken a note. The note carries no category yet. That window is still open.`;
        addJournal('faction', 'Oversight Collegium — neutral first assessment', `panim-collegium-neutral-${G.dayCount}`);
      }
      G.recentOutcomeType = 'faction'; maybeStageAdvance();
    }
  },

  {
    label: "The suppressed inquest files are in the district registry. Night is the only window.",
    tags: ['Stealth', 'Investigation', 'Stage2', 'Meaningful'],
    xpReward: 84,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(84, 'night access to district registry');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The registry at night is unguarded but sealed. Your method bypasses the seals without triggering the alert mechanism. Inside: 31 suppressed inquest files, each connecting a phantom memorial contract to a specific coin destination in the northern districts. The transaction chain is complete.`;
        addJournal('Registry accessed — 31 suppressed files obtained', 'evidence', `panim-registry-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The seal alert is silent — no bell, no visible mechanism. The guard arrives four minutes later at a walk, not a run, which means the response protocol is routine. Out through the lane corridor before the lamp swings through the registry door. The entry is logged regardless. By morning the Mediation Hall has a formal security inquiry open with a description already circulating to the district watch posts.`;
        addJournal('Registry alert triggered — security inquiry opened', 'complication', `panim-registry-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `Six files before the watch rotation closes the window. The candlelight is dim enough to work by and no more. Each page confirms what the daylight work suggested: the transaction chain is real, structured, and older than the past six months. Two endpoints emerge with enough clarity to act on. The full thirty-one remain sealed. What's in hand is a foothold, not a complete picture.`;
        addJournal('Registry partial access — transaction endpoints identified', 'evidence', `panim-registry-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Merev Sepulcher hears every conversation in the Memorial Inn. The past month has been unusual.",
    tags: ['NPC', 'Persuasion', 'Stage2', 'Meaningful'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'questioning Merev Sepulcher innkeeper');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_merev_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Merev has been keeping notes. Three guests in the past month used the inn as a meeting point and paid in memorial coin — an unusual denominator for secular transactions. Their conversations centered on "completion schedules" and "verification windows." Memorial language used for non-memorial logistics.`;
        addJournal('Memorial coin transaction pattern — Merev log', 'evidence', `panim-merev-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The question about guests lands and a particular stillness settles over the counter. Memorial facility innkeepers in Panim Haven carry the same confidentiality obligation as shrine attendants — it's a civic compact, not a personal choice. The decline is without apology and without softening. There is a cup of cold tea on the counter. It gets refilled without the conversation resuming. The arrival and departure times are still visible in the public facing transit log posted outside the gate.`;
        addJournal('Memorial confidentiality invoked — no access', 'complication', `panim-merev-fail-${G.dayCount}`);
      } else {
        G.flags.met_merev_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Three guests, no names offered — Merev makes this boundary clear before beginning the description. They spoke quietly and occupied the same corner table each visit. Payment came in exact amounts, no exchange of change. "Everything about them was deliberate. That's what I remember most." A cloth is folded and set down. The description ends there, but the observation itself is sharp enough to be useful.`;
        addJournal('Memorial Inn — deliberate guests noted without detail', 'evidence', `panim-merev-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The backlog is managed, not accidental. Someone benefits from a saturated mediation hall.",
    tags: ['Lore', 'Investigation', 'Stage2', 'Meaningful'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'mapping mediation backlog beneficiaries');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The backlog is not accidental — it is managed. Specific cases have been routinely deferred to keep the mediation hall's formal review capacity saturated. A saturated hall cannot pursue new anomalies. The backlog is the cover for the phantom memorial contracts to operate undetected.`;
        addJournal('Mediation backlog is deliberate operational cover', 'evidence', `panim-backlog-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The analysis builds on a misread of the scheduling notation system — a local convention that differs from the standard mediation calendar. The error surfaces when two clerks compare what you've concluded against their own records. The correction is polite and public. Standing in the district as a credible outside presence has taken a quiet but measurable hit; the clerks' exchange carries further than the voices that made it.`;
        addJournal('Backlog analysis error — credibility reduced', 'complication', `panim-backlog-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The pattern is there but stops short of proof of intent. Specific cases routed to defer at predictable intervals, the scheduling notation consistent enough to suggest a practiced hand rather than administrative drift. Someone with access to the mediation hall's priority queue has been making quiet adjustments. The scheduling system requires a clerk-level appointment to modify. That narrows the field without closing it.`;
        addJournal('Backlog management pattern — scheduling access implicated', 'evidence', `panim-backlog-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Elior knows the name on the suppression order. Two years of protecting it.",
    tags: ['stage2', 'panim_haven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var roll = rollD20('charm', G.skills.persuasion);
      if (roll.total >= 13 || roll.isCrit) {
        G.flags.elior_source_revealed = true;
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('The Weight of a Name', 'Elior does not sit down. He stands at the narrow window with his back to you long enough that the candle on the table has burned a noticeable fraction when he finally speaks. The name is Caldor — his own cousin, holding a scribe appointment at the oversight tier above him. Two years of signed suppression orders, all in the same hand. Elior sets a folded paper on the table. He does not look at it again. "I cannot be the one to file this."');
        addJournal('Caldor Sepulcher identified as suppression signatory — scribe, oversight tier', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('Closed Door', 'Elior listens to your question with his eyes on the floor between you. When he raises them his expression has changed — not hostile, but sealed. "There are things I confirmed for you because I believed it would help. This is a different question." He straightens the papers on his desk with precise, deliberate movements. The audience is over. The name stays where he keeps it.');
      }
    }
  },

  {
    label: "The threshold marks on that building don't belong to any current rite.",
    tags: ['stage2', 'panim_haven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13 || roll.isCrit) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Threshold Marks', 'The building faces the street with blank shuttered windows and a door painted the standard memorial grey. The threshold is the tell. Three ward-marks are incised into the stone at foot level — old cuts, not recent. Two are standard Panim purification glyphs. The third is an accounting notation from a pre-reform ledger system discontinued eleven years ago: it denotes a storage site for valuables under active claim dispute. Someone retrofitted an administrative classification into a ritual inscription.');
        addJournal('Unregistered building — pre-reform accounting mark confirms active storage use', 'discovery');
        maybeStageAdvance();
      } else {
        addNarration('Stone and Silence', 'The threshold marks are worn and you cannot place them without better light or a reference text you do not have to hand. The building gives nothing else — no sound from inside, no visible entry wear, no posted notice. You have confirmed it exists and is used. You have not confirmed what it holds.');
      }
    }
  },

  {
    label: "The offering queue has protocol. The wrong step gets noted by everyone within earshot.",
    tags: ['stage2', 'panim_haven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      if (!G.flags) G.flags = {};
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.investigationProgress) G.investigationProgress = 0;
      var roll = rollD20('finesse', G.skills.stealth);
      if (roll.total >= 13 || roll.isCrit) {
        G.investigationProgress = (G.investigationProgress || 0) + 1;
        addNarration('Quiet Hands', 'You move through the offering queue without disrupting its rhythm — presenting correctly at each transition, keeping the submission posture that marks a petition rather than a purchase. The clerk two positions ahead does not register you as out of place. That invisibility is enough. From this angle the stall\'s secondary ledger is visible between transactions: its binding is a different color than the primary, and the hand entering figures into it is not Saryna\'s.');
        addJournal('Offering stall secondary ledger confirmed — different hand from primary clerk', 'evidence');
        maybeStageAdvance();
      } else {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;
        addNarration('Wrong Step', 'You move ahead of a petitioner who had already established queue position through a ritual gesture you did not recognize. The correction comes from three directions at once — quiet, firm, and thoroughly documented in the faces of everyone watching. Saryna glances up from her stall. Whatever angle you had on the secondary ledger is gone now. The queue reforms around you with the careful distance reserved for those who have already made one error.');
      }
    }
  },

  {
    label: "Sanctuary-claim rolls list names no family has visited.",
    tags: ['stage2', 'panim_haven'],
    xpReward: 30,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      var roll = rollD20('wits', G.skills.lore);
      if (roll.total >= 13 || roll.isCrit) {
        G.investigationProgress++;
        addNarration('Sanctuary Without Mourners', 'The rolls are posted on the outer wall of the mediation hall — a courtesy so families can find their registered dead. You read them from the bottom row, where the oldest untouched entries gather. Twenty-seven names across the last half year show no visitation mark, no amendment, no claim. A sanctuary entry protects a body from civil seizure while a family arranges rites. Twenty-seven active protections on bodies no one has come to mourn. The names themselves read wrong — too many from trade rosters, too few from the congregant rolls. Someone is using the sanctuary frame as a holding pattern.');
        addJournal('Sanctuary protections holding 27 unclaimed entries — frame repurposed as custody', 'evidence');
        maybeStageAdvance();
      } else {
        addNarration('A Wall of Names', 'You read the rolls twice before the shrine attendant near the entrance begins to watch you openly. The names remain only names. Without the mediation-hall cross-index you cannot tell protected sanctuary entries from ordinary delayed-claim cases. You step away before the attention becomes a correction.');
      }
    }
  },

  {
    label: "Nemeia Sepulcher works the coffin benches — the unsealed shipments passed her.",
    tags: ['NPC', 'Persuasion', 'Stage2'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'Nemeia crew records');
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_nemeia_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Nemeia wipes pitch from her thumb on a square of sackcloth before she answers — the same square she uses for the crew tally, the marks layered on top of each other. Four shipments in three months left the benches without her foreman's seal. Standard protocol requires it. She filed the omission each time. Each filing came back marked resolved at the oversight tier without a reply to her. "When my paper keeps coming home clean, the dirt is above me. I know where it ends up. I don't know whose hand puts it there."`;
        addJournal('Nemeia — four unsealed shipments cleared above foreman tier', 'evidence', `panim-nemeia-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Nemeia hears you out standing, arms crossed, and does not sit. "If I talk to every outsider who noticed something, I stop being a foreman and start being a witness. I already filed what I saw. The rest is not mine to give away." She turns back to the benches. The crew's rhythm does not break. What she filed is in the foreman intake log — a public record that doesn't require her cooperation to read.`;
        addJournal('Nemeia declined — filings already on record, access closed', 'complication', `panim-nemeia-fail-${G.dayCount}`);
      } else {
        G.flags.met_nemeia_sepulcher = true;
        G.investigationProgress++;
        G.lastResult = `Nemeia confirms the unsealed shipments without naming count. "More than one. Less than ten. All in the last season. All cleared above my head." She taps the bench with two knuckles and returns to her crew. The confirmation is all she will give today.`;
        addJournal('Nemeia confirms unsealed shipment pattern — count withheld', 'evidence', `panim-nemeia-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The third-hour visitor leaves by the porter's gate, not the pilgrim arch.",
    tags: ['Stealth', 'Stage2'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'tailing shrine visitor egress');
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.investigationProgress++;
        if (G.investigationProgress === 5) G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `You hold at the cistern arch with the hood of your travel cloak drawn in the memorial style and wait out the third hour. The figure emerges exactly when Velune described and crosses the courtyard on a line that avoids the pilgrim arch entirely. The porter's gate opens from the inside — no hail, no exchange, no tally mark. The figure passes through to the freight lane and steps into a covered cart already waiting, driver's face turned away. The cart carries a House Panim seal on the axle plate. It is the wrong seal — oversight-tier, not funerary service.`;
        addJournal('Third-hour visitor egress via porter gate — oversight-tier seal on cart', 'evidence', `panim-egress-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `You misread the courtyard sight lines. A shrine-keeper on the upper walk notices your position and the duration of your wait. The figure crosses and leaves without once turning toward you, which means the figure was warned the moment you were spotted. By dawn the porter's gate has a new watch posted.`;
        addJournal('Egress watch reinforced — observation position compromised', 'complication', `panim-egress-fail-${G.dayCount}`);
      } else {
        G.investigationProgress++;
        G.lastResult = `The figure emerges, crosses, and exits through the porter's gate as Velune said. You catch the shape of a covered cart beyond the arch but cannot reach a position to read the axle plate before it rolls. The route is confirmed. The seal is not.`;
        addJournal('Egress route confirmed — cart seal unread', 'evidence', `panim-egress-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The northern charter subsidiary has a registration address. It belongs to something that doesn't exist.",
    tags: ['Stage2', 'Lore'],
    xpReward: 80,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(80, 'tracing northern charter subsidiary registration');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.northern_charter_traced = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The subsidiary charter resolves to a civic registration address in the northern quarter — a building that burned in a district fire nine years ago and was never rebuilt. The charter has been renewed four times since the fire, each renewal signed by a different notary, none of them current. The entity holds real accounts, moves real coin, and has no physical location that could be entered, examined, or shut. It is a permanent administrative ghost with active status.`;
        addJournal('Northern charter entity — active ghost registration, burned-site address', 'evidence', `panim-charter-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The charter registration search requires a civil records clerk to pull the founding documents from the district archive. The clerk is professionally helpful and the request is entirely routine. An hour later, the inquiry has been flagged by the archive duty officer as part of a broader records review already underway — the same review Elior mentioned. Any further access to the charter's founding documentation will now route through that review and the clerk who handles it. That clerk reports to the oversight tier.`;
        addJournal('Charter search flagged — routed to oversight review', 'complication', `panim-charter-fail-${G.dayCount}`);
      } else {
        G.flags.northern_charter_traced = true;
        G.investigationProgress++;
        G.lastResult = `The registration address is real on paper and wrong on the ground. A note in the margin of the third renewal says "address under civic review" — a designation that has sat unchanged for seven years. The entity's account activity is current; the address is not. Whatever administrative mechanism should have caught this gap, it did not run.`;
        addJournal('Northern charter — valid accounts, unresolvable civic address', 'intelligence', `panim-charter-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "That building's floor has been cut. The rite marks are cover for something structural.",
    tags: ['Stage2', 'Craft'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'examining unregistered building interior');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.building_interior_accessed = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The door opens on a single-room space that reads, at first, as an abandoned preparation chamber — stone bench, empty wall brackets, cold ash in the fire grate. The floor is the tell. Three flagstones in the southwest corner have been reset within the last season: the mortar color is wrong and the edge-cuts are cleaner than the surrounding work. Below the stones, a cavity large enough to hold a standard memorial container. The cavity is empty and recently cleared. Whoever used it knew to move before this moment.`;
        addJournal('Unregistered building — sub-floor cavity confirmed, recently cleared', 'evidence', `panim-building-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The entry point holds for ninety seconds before a sound from the lane side of the building stops you — not footsteps, but the specific silence that replaces them. Out through the rear shutter before the lane-side door opens. You do not see who enters. They see the disturbed threshold and the open shutter, and they do not come after you, which is the more concerning response. The building will be emptied before you can return.`;
        addJournal('Building entry detected — contents likely moved', 'complication', `panim-building-fail-${G.dayCount}`);
      } else {
        G.flags.building_interior_accessed = true;
        G.investigationProgress++;
        G.lastResult = `The interior confirms use without revealing what it holds. The stone bench carries weight marks from regular loading — rectangular, consistent with standard memorial containers. The floor near the southwest corner shows fine grit swept into the mortar lines but not out of them. Something rested here often enough to leave the pattern. Whatever was stored here was moved with care, not in haste.`;
        addJournal('Unregistered building — load marks confirm storage use', 'evidence', `panim-building-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Caldor Sepulcher takes the same route to the oversight hall. Not today — today he changes it.",
    tags: ['Stage2', 'Stealth'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'tailing Caldor Sepulcher through memorial district');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.caldor_route_documented = true;
        G.investigationProgress++;
        G.lastResult = `Caldor breaks his route at the junction where the memorial district meets the freight lane — the same junction where the porter's gate empties. He enters a chandler's shop that has no customers visible through the window. Seven minutes later he exits carrying nothing and takes the direct route to the oversight hall without deviation. The chandler's shop is registered to a trade address in the northern quarter. The northern account's subsidiary charter lists the same address.`;
        addJournal('Caldor route deviation — chandler stop links to northern charter address', 'evidence', `panim-caldor-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `Caldor stops at the junction and turns. The look he gives the lane behind him is not a glance — it is a professional check, unhurried, covering both sides. His eyes move past you once and return. He does not change his pace. By the time he reaches the oversight hall the lane behind you has a porter crossing it in the wrong direction for that hour, arms empty, walking too slowly. You are being walked home.`;
        addJournal('Tailing attempt burned — counter-surveillance active', 'complication', `panim-caldor-fail-${G.dayCount}`);
      } else {
        G.flags.caldor_route_documented = true;
        G.investigationProgress++;
        G.lastResult = `Caldor deviates once — a brief stop at a chandler's shop that reads as routine. Duration too short for an actual purchase. The shop closes its shutters from the inside while he is there. He emerges and continues without looking back. The deviation is documented. The chandler's shop location and the northern charter's registered trade address are worth cross-referencing before taking the next step.`;
        addJournal('Caldor route deviation — chandler stop duration noted', 'intelligence', `panim-caldor-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The freight lane runs before the bell. The wrong seal on a cart is readable at that hour.",
    tags: ['Stage2', 'Survival'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'dawn freight lane observation');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.freight_seal_documented = true;
        G.investigationProgress++;
        G.lastResult = `Three carts move through the freight lane in the hour before the dawn bell, all carrying memorial service manifests. Two bear the standard funerary service seal — correct denomination, correct color. The third carries an oversight-tier administrative seal on the axle plate, the same discrepancy noted on the third-hour visitor's cart. The driver's tally book is open across his knee: the route destination is listed as the district archive annex. The archive annex has no scheduled deliveries logged for this morning.`;
        addJournal('Freight lane — oversight-tier cart, unscheduled archive annex destination', 'evidence', `panim-freight-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The lane position holds through the cold but the light does not cooperate — the carts move before the lanterns along that section are lit, and the axle plates stay in shadow. One driver pauses to reset a harness strap and looks directly at your position in the alcove. He does not call out. He reaches his destination without taking the route the manifest lists. You have been noted without being confronted, which means the information goes somewhere before any authority hears it from you.`;
        addJournal('Freight lane observation failed — driver noted presence', 'complication', `panim-freight-fail-${G.dayCount}`);
      } else {
        G.flags.freight_seal_documented = true;
        G.investigationProgress++;
        G.lastResult = `One cart in three carries a seal that does not match its manifest type. The axle plate is readable for a half-second as the cart rounds the lane corner — oversight-tier denomination, not funerary service. The driver's route takes the cart past the archive annex and continues without stopping. Where it stops is beyond the visible section of the lane from this position.`;
        addJournal('Freight lane — mismatched seal cart confirmed, destination unclear', 'intelligence', `panim-freight-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The district watch captain filed three reports that went nowhere. He stopped filing after that.",
    tags: ['Stage2', 'NPC'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'approaching district watch captain');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.met_watch_captain = true;
        G.investigationProgress++;
        G.lastResult = `The captain's name is Orvath Sepulcher. He opens the third report without being asked — it has been kept separate from the bound filing stack, in a plain folio without a cover mark. The report documents a freight irregularity in the porter's gate lane on a specific date six months ago. The response from the oversight tier was a single line: jurisdictional review pending. The same line appears on reports two and one. "When I stopped, no one came to ask why." He pushes the folio across the desk. He does not ask for it back.`;
        addJournal('Orvath Sepulcher — three suppressed watch reports, folio surrendered', 'evidence', `panim-captain-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Orvath Sepulcher hears the approach and gives it three seconds before his expression settles into the particular flatness of a senior watch officer who has fielded this category of conversation before. "I file reports. I don't discuss them." He is not hostile. He is a man who has learned the precise boundary of what his position permits and has placed himself squarely behind it. Any further approach before his formal filing access is established will add a name to the watch log.`;
        addJournal('Watch captain declined — approach noted in watch log', 'complication', `panim-captain-fail-${G.dayCount}`);
      } else {
        G.flags.met_watch_captain = true;
        G.investigationProgress++;
        G.lastResult = `Orvath confirms the reports without producing them. Three filings, three identical responses, all from the same oversight tier signatory. He does not name the signatory — the name is in the reports and the reports are filed. He confirms they are accessible through the district archive intake log. That log is public record. The path to the reports does not require his cooperation; he is telling you this without saying it directly.`;
        addJournal('Orvath — three oversight-suppressed reports accessible via archive intake log', 'intelligence', `panim-captain-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Transit permits for memorial cargo require a signatory. The same name appears on every unsealed shipment.",
    tags: ['Stage2', 'Lore'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'cross-referencing transit permit signatories');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.transit_signatory_identified = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The transit permit archive sits in the district annex open stack — public record, rarely consulted. Every unsealed memorial cargo shipment in the past eight months carries the same authorization signature: a scribe appointment at the oversight tier that issued each permit within hours of the cargo's arrival, never more than a day behind. The signature is Caldor Sepulcher's. The permits granted passage through the freight lane at the third hour — the same hour Velune documented the shrine visitor's departure. The authorization chain is a single person operating at the top of it.`;
        addJournal('Transit permits signed by Caldor Sepulcher — oversight tier authorization chain closed', 'evidence', `panim-transit-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `The permit archive requires a secondary authorization code for records predating the current quarter. The code should be routine — a counter clerk walks you through the request form. The form routes the authorization request to the oversight tier before the clerk finishes explaining it. The request sits. By the time the session ends, the annex clerk has received a verbal instruction to defer further permit access until the ongoing district review concludes.`;
        addJournal('Transit permit access deferred — oversight review block invoked', 'complication', `panim-transit-fail-${G.dayCount}`);
      } else {
        G.flags.transit_signatory_identified = true;
        G.investigationProgress++;
        G.lastResult = `The current quarter's permits are open stack. Four of the twelve sealed cargo shipments bear the same signatory in the oversight-tier authorization field — a name that does not appear on any other cargo permit category in the same period. The name itself is not yet readable from this position in the file; the signature's style is consistent and trained, the work of someone who authorizes documents as a regular function of their role.`;
        addJournal('Memorial cargo permits share signatory — identity not yet confirmed', 'intelligence', `panim-transit-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The wrapping cloth on returned memorial containers has a residue. It is not incense.",
    tags: ['Stage2', 'Craft'],
    xpReward: 74,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(74, 'examining memorial wrapping residue');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('spirit', (G.skills.craft||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.wrapping_residue_identified = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `The returned wrapping cloth carries a mineral salt deposit along the fold lines — a preservation compound, not ritual. The specific combination is used in long-transit storage for materials that cannot be exposed to humidity. It requires a preparation step that takes twenty minutes and equipment not present in any of the memorial hall's registered service spaces. Whatever was stored in these containers was packed for a journey measured in days, not hours. The memorial service was transport cover, not ceremony.`;
        addJournal('Memorial wrapping residue — long-transit preservation compound confirms transport use', 'evidence', `panim-residue-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The sample comes from a discarded wrapping in the coffin bench refuse — legitimate salvage. The bench foreman's deputy spots the retrieval and the inquiry that follows covers three minutes of documented conversation. The deputy's report to Nemeia is factual and brief: an outsider examining refuse materials for chemical residue. Nemeia files a bench incident log. The log reaches the oversight tier within the day under standing policy for unauthorized material sampling.`;
        addJournal('Residue sampling logged — bench incident report filed to oversight', 'complication', `panim-residue-fail-${G.dayCount}`);
      } else {
        G.flags.wrapping_residue_identified = true;
        G.investigationProgress++;
        G.lastResult = `The fold lines carry a deposit that does not match incense residue in color or texture — it is dry, pale, and crystalline where incense ash is dark and oily. The compound is familiar in broad category: mineral salts used in storage. The specific formulation would require a reference text to narrow further. What is already clear is that ritual wrapping cloth should not carry this residue at all.`;
        addJournal('Wrapping residue — mineral salt, non-ritual, storage category confirmed', 'intelligence', `panim-residue-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "A family came to collect remains and was told the files showed no record of the service.",
    tags: ['Stage2', 'NPC'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'speaking with family at intake counter');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.family_witness_testimony = true;
        G.investigationProgress++;
        G.lastResult = `The family is from the northern district and paid in advance — memorial coin, the exact denomination Merev noted in her inn records. Their receipt carries a reference number that traces to the phantom contract cluster in the afterlife ledger. They came to collect their father's remains and were told by a clerk that the service had not been completed. The clerk offered a refund form. The family refused and kept the receipt. It is in the eldest daughter's travel pouch right now. She hands it over without hesitation when the purpose is explained.`;
        addJournal('Family receipt matches phantom contract cluster — direct link to ledger falsification', 'evidence', `panim-family-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The family's grief is real and the conversation is wrong from the first word — the framing lands as official interrogation rather than witness exchange. The eldest son asks for credentials and the intake clerk nearby turns to watch. The request cannot be met in a way that satisfies either party. The family withdraws with their receipt and their distrust. The clerk makes a note in the intake log. Whatever the family saw, it will not be available through this avenue again.`;
        addJournal('Family approach failed — intake clerk logged interaction', 'complication', `panim-family-fail-${G.dayCount}`);
      } else {
        G.flags.family_witness_testimony = true;
        G.investigationProgress++;
        G.lastResult = `The family describes the transaction clearly: paid in advance, received a reference number, arrived to find no record. The clerk told them the file had been archived under a different classification and offered a refund. They are still deciding whether to accept. The reference number on their receipt is the kind that should trace back through the ledger system — it is worth cross-referencing against the phantom contract cluster.`;
        addJournal('Family testimony — advance payment, record gap, reference number to trace', 'intelligence', `panim-family-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The chandler's shop is empty during business hours. The back room is not.",
    tags: ['Stage2', 'Stealth'],
    xpReward: 82,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(82, 'entering chandler shop back room');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('finesse', (G.skills.stealth||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.chandler_back_room_searched = true;
        G.investigationProgress++;
        G.lastResult = `The back room holds a writing desk, a locked correspondence box, and a wall rack holding six sealed message tubes of the type used by oversight-tier administrators for internal distribution. The tubes are not opened — but two bear the House Panim oversight seal and a recipient code that matches the district archive annex. A third tube carries a date stamp from four days ago. None of these communications should be traveling through a chandler's shop.`;
        addJournal('Chandler back room — oversight seal message tubes confirm administrative relay point', 'evidence', `panim-chandler-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 2;
        G.lastResult = `The shuttered front gives way to an interior that is neither empty nor unwatched — a figure is seated at the back desk, face angled down toward paper, and the sound of the latch is enough. The figure stands without hurrying and the route to the street closes faster than expected. Out through the side passage, but the face at the desk had time to register the profile. The chandler's shop will not be accessible again in daylight hours.`;
        addJournal('Chandler entry compromised — figure inside, profile registered', 'complication', `panim-chandler-fail-${G.dayCount}`);
      } else {
        G.flags.chandler_back_room_searched = true;
        G.investigationProgress++;
        G.lastResult = `The back room is in use as a correspondence staging point — writing supplies, a correspondence box, wall hooks for message tubes. Nothing currently present that names a party or purpose. The desk surface carries ink patterns from recent drafting: two documents, one shorter than the other, both produced with the same pen. The setup is administrative, not commercial. A chandler's back room furnished as a relay station.`;
        addJournal('Chandler back room — correspondence relay point confirmed, no current contents', 'intelligence', `panim-chandler-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "Caldor's notary chain has four names. Three of them signed the same month they were appointed.",
    tags: ['Stage2', 'Lore'],
    xpReward: 78,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(78, 'tracing Caldor notary appointment chain');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.notary_chain_documented = true;
        G.investigationProgress++;
        G.stageProgress[2] = (G.stageProgress[2]||0) + 1;
        G.lastResult = `Caldor's appointment as oversight scribe was authorized through a notary chain of four signatures. Three of the four notaries signed the authorization within four weeks of receiving their own appointments — a statistical impossibility under normal civic procedure, which requires six months of registered practice before a notary can authorize oversight-tier appointments. All three appointments were signed by the same pre-existing notary who has since retired to an address in the northern quarter. The entire authorization chain was constructed for this purpose.`;
        addJournal('Caldor appointment chain fabricated — notaries appointed and deployed within same month', 'evidence', `panim-notary-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 1;
        G.lastResult = `Notary appointment records require a civic certification number to access beyond the public summary. The certification number is issued by the district registry, which is the same body currently running the oversight review. The counter clerk is apologetic and specific: access to notary appointment chains is restricted for the review's duration. The restriction applies to the same records and the same time window needed to trace Caldor's chain.`;
        addJournal('Notary appointment records blocked — district registry restriction active', 'complication', `panim-notary-fail-${G.dayCount}`);
      } else {
        G.flags.notary_chain_documented = true;
        G.investigationProgress++;
        G.lastResult = `The public summary of Caldor's appointment lists four notary signatures and standard authorization dates. The dates themselves do not flag anything from the summary alone. The full appointment record — which would show each notary's own registration date — requires the restricted access level the current overview review controls. The summary contains enough to know the question is worth asking with proper authorization.`;
        addJournal('Caldor appointment chain — four notaries, full records blocked pending review', 'intelligence', `panim-notary-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The archive annex delivery log is posted at the loading bay. No appointment required to read it.",
    tags: ['Stage2', 'Survival'],
    xpReward: 70,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'reading archive annex delivery log');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.annex_log_cross_referenced = true;
        G.investigationProgress++;
        G.lastResult = `The loading bay log runs in two columns: scheduled deliveries on the left, actual arrivals on the right. For the past four months, three to five unscheduled arrivals per week appear in the right column without a corresponding left-column entry. Each unscheduled arrival carries a notation: "oversight authorization — no further logging required." The notation is handwritten, not printed, and the handwriting matches the transit permit signatures already on file. Caldor personally authorized deliveries to the archive annex and ensured they were not logged in the public system.`;
        addJournal('Archive annex unscheduled deliveries — Caldor authorization notation, handwriting match', 'evidence', `panim-annex-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The loading bay log is posted, but the most recent two months have been replaced with a printed notice: log temporarily unavailable pending routine archive maintenance. The notice is dated yesterday. Someone moved faster than expected. The delivery pattern for the prior months is gone from the bay entirely — the physical log board has been cleared and the replacement notice is fresh enough that the paste at the corners is still tacky.`;
        addJournal('Archive annex log cleared — notice posted day before access attempt', 'complication', `panim-annex-fail-${G.dayCount}`);
      } else {
        G.flags.annex_log_cross_referenced = true;
        G.investigationProgress++;
        G.lastResult = `The log shows unscheduled arrivals in the right column for the past quarter — more than the scheduled deliveries in some weeks. The notation field for these arrivals reads "OT auth" — an abbreviation that could mean oversight-tier authorization, but the full form is not defined on the log header. The volume of unscheduled arrivals at an archive annex is unusual enough to document. What went in has not been cross-referenced yet against what the annex officially holds.`;
        addJournal('Archive annex — unscheduled arrivals exceed scheduled, OT auth notation', 'intelligence', `panim-annex-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The sanctuary list names trace to trade rosters. Not a single one appears in congregant records.",
    tags: ['Stage2', 'Lore'],
    xpReward: 76,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(76, 'cross-referencing sanctuary names against trade rosters');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('wits', (G.skills.lore||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.sanctuary_roster_linked = true;
        G.investigationProgress++;
        G.lastResult = `All twenty-seven unclaimed sanctuary names appear in the northern district trade charter records as registered laborers under the same subsidiary entity Saryna flagged — the one connected to the ghost charter address. Every name carries a registration date within the past year. None appear in Panim Haven congregant rolls, family petition records, or transit intake logs at any point prior to the sanctuary filing. These are not real deceased. They are constructed identities used to hold sanctuary protections as a legal mechanism — each one a sustained claim on a custody status that prevents civic seizure.`;
        addJournal('Sanctuary names are constructed identities from ghost charter roster — civic custody mechanism', 'evidence', `panim-roster-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The cross-reference requires pulling three separate archive sets simultaneously — congregant rolls, sanctuary filings, and trade charter records — which triggers a multi-access request that routes to the district registry for coordination. The registry logs the request under the ongoing review. Access to two of the three sets is suspended pending review completion. The attempt itself has now defined the specific record combination that someone would need to connect these threads. That combination is now being monitored.`;
        addJournal('Sanctuary cross-reference attempt — multi-access request logged, two sets suspended', 'complication', `panim-roster-fail-${G.dayCount}`);
      } else {
        G.flags.sanctuary_roster_linked = true;
        G.investigationProgress++;
        G.lastResult = `The trade charter records are public. Of the twenty-seven sanctuary names, twelve appear in a northern district trade charter as registered laborers. The charter entity is not one you have seen before — a different name from the ghost subsidiary but with the same northern quarter address structure. The remaining fifteen names do not appear in any accessible record. Trade charter registration without congregant or transit history is unusual. The combination warrants further access.`;
        addJournal('Twelve sanctuary names on northern charter roster — entity differs from known subsidiary', 'intelligence', `panim-roster-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The shrine water source runs under two buildings. One of them is the unregistered storage site.",
    tags: ['Stage2', 'Survival'],
    xpReward: 72,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'tracing shrine water course to unregistered building');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('vigor', (G.skills.survival||0) + Math.floor(G.level/3));
      if (result.isCrit) {
        G.flags.water_course_documented = true;
        G.investigationProgress++;
        G.lastResult = `The shrine's ritual water source is a channeled spring that runs beneath the memorial district through a civic conduit system. The conduit's maintenance access points are mapped in the district waterworks record — a dry technical document available at the civic works office. The conduit runs directly beneath the unregistered building. One of the access hatches opens inside that building's foundation, which explains the sub-floor cavity: it is positioned directly above the conduit access point. Whatever was stored there was passed in and out through the waterworks channel, not the freight lane.`;
        addJournal('Water conduit access point inside unregistered building — sub-floor cavity above hatch', 'evidence', `panim-water-${G.dayCount}`);
      } else if (result.isFumble) {
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 1;
        G.lastResult = `The waterworks office requires a district maintenance authorization to access the conduit map — standard policy for infrastructure records. The authorization is routed to the district registry, which is the same office managing the ongoing review. The request is received, logged, and deferred. On the walk back, the lane near the unregistered building has a new chalk mark on the wall that was not there this morning: a watch notation, the kind posted when a location is under observation. The approach has been anticipated.`;
        addJournal('Conduit map access deferred — watch notation appeared near unregistered building', 'complication', `panim-water-fail-${G.dayCount}`);
      } else {
        G.flags.water_course_documented = true;
        G.investigationProgress++;
        G.lastResult = `The waterworks record is available at the civic works office and shows the conduit path through the memorial district. The route passes beneath a section of the district that includes the unregistered building's block. Whether the conduit has an access point directly under that building requires the maintenance map, which the counter clerk says is filed separately under infrastructure reference. That map is available but requires a half-day processing request through the district registry.`;
        addJournal('Shrine conduit traced to unregistered building block — maintenance map pending', 'intelligence', `panim-water-partial-${G.dayCount}`);
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  {
    label: "The phantom memorial evidence is complete. Official channels or informal — this choice doesn't reverse.",
    tags: ['Investigation', 'Finale', 'Stage2', 'Consequence', 'Meaningful'],
    xpReward: 110,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(110, 'Panim Stage 2 resolution');
      if (!G.investigationProgress || G.investigationProgress < 8) {
        G.lastResult = `The evidence chain in Panim Haven is not yet complete. What exists points in the right direction but carries gaps that a prepared counter-argument could exploit. Presenting now hands the operation a half-built case it can absorb. More ground needs to be covered before this can move.`;
        G.recentOutcomeType = 'investigate'; return;
      }
      if (!G.worldClocks) G.worldClocks = {};
      if (!G.flags) G.flags = {};
      const result = rollD20('charm', (G.skills.persuasion||0) + Math.floor(G.level/2));
      if (result.total >= 14 || result.isCrit) {
        G.flags.stage2_finale_institutional = true;
        G.worldClocks.watchfulness = (G.worldClocks.watchfulness||0) + 3;
        G.lastResult = `The suppressed files, the coin chain, and the cargo anomalies go to the civic oversight authority in a single presentation. The clerk receiving them reads the cover sheet twice before calling a supervisor. A formal inquest opens before the hour ends. The filing carries a name — yours. Every party the evidence names now knows who submitted it. The next stage opens with institutional standing and the visibility that comes with it.`;
        addJournal('Panim S2 finale: formal inquest opened', 'evidence', `panim-finale-inst-${G.dayCount}`);
      } else {
        G.flags.stage2_finale_underworld = true;
        G.worldClocks.pressure = (G.worldClocks.pressure||0) + 3;
        G.lastResult = `The evidence splits into two streams at the same hour: the Collegium contact receives the coin chain by sealed courier, Merev's informal network gets the cargo anomalies by word of mouth through three separate conversations. The institutional response will arrive, but the underground circuit moves first and leaves no formal record with a name attached. Pressure lands on the operation before the channels that stalled before can close again.`;
        addJournal('Panim S2 finale: informal circuit activated', 'evidence', `panim-finale-uw-${G.dayCount}`);
      }
      G.flags.stage2_faction_contact_made = true;
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

];

window.PANIM_HAVEN_STAGE2_ENRICHED_CHOICES = PANIM_HAVEN_STAGE2_ENRICHED_CHOICES;
