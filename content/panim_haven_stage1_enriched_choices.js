/**
 * PANIM HAVEN STAGE 1 ENRICHED MEANINGFUL CHOICES
 * 20 deeply grounded investigation paths tied to shrine work and mediation service
 * Generated for: Divine balance vs mortal need, ritual correctness vs human compassion, mediation vs grief
 * Each choice: 65-80 XP, grounded in specific NPC perspective, layered wrongness reveal
 */

var PANIM_HAVEN_STAGE1_ENRICHED_CHOICES = [
  // ========== NPC-GROUNDED CHAINS (8 CHOICES) ==========

  // 1. SHRINE ATTENDANT: OFFERING PATTERNS CORRUPTED
  {
    plot: 'main',
    questId: 'q_s1_pattern',
    label: "Copper mixed with iron is being accepted now. That was always sent back before.",
    tags: ['Investigation', 'NPC', 'Ritual', 'Offerings', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: "Velune Sepulcher is already occupied with a delegation from the northern quarter, and the offering preparation window has closed for the morning — the custodian marks the rack sealed and turns the key before you reach the threshold. The shrine attendants move through the hall with the focused purpose of people who have no time for side conversations until the mid-afternoon interval. The main shrine entry stays open; the preparation hall sign reads appointments only until the third bell.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading offering corruption patterns');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      const target = 11 + Math.max(0, G.worldClocks.pressure);

      if (result.isCrit) {
        G.lastResult = `Velune Sepulcher sorts candles at the side table while she talks, not looking up. "Copper mixed with iron. Cloth that's been bleached wrong — it photographs white but it isn't. Those used to be sent back. Now they're accepted." She sets a candle down crooked. "I asked the ritual authority why the standards changed. They told me standards adapt with faith. That's not an answer." She finally looks at you. "If the offering is wrong, what does that do to the blessing it's supposed to carry?"`;

        G.stageProgress[1]++;
        addJournal('Shrine attendant flagged offering acceptance corruption', 'evidence', `panim_haven-offerings-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Velune Sepulcher straightens when you ask about the offering standards. Her hands go still on the candles. "That's shrine business." She doesn't say anything else. She doesn't go back to sorting either. You've been categorized as someone who asks the kind of questions that get reported. The pressure of that category follows you — the shrine network here is small, and what you asked will arrive before you do at the next candle station.`;
        G.worldClocks.pressure++;
        addJournal('Shrine attendant now distrustful of inquiry', 'complication', `panim_haven-shrine-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Velune Sepulcher admits the offering standards have loosened. "The ritual authority said we need to be more practical about what people can bring." She says it in a flat register that doesn't match the words. Her eyes stay on the table. A beeswax candle gutters at the end of the rack — she doesn't straighten it. The reasoning she's repeating is not her own, and the space where her own reasoning would go has gone quiet.`;
        addJournal('Shrine attendant noted offering standard relaxation', 'evidence', `panim_haven-offerings-relaxed-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 2. SCRIBE: MEDIATION RECORDS TAMPERED
  {
    plot: 'main',
    questId: 'q_s1_converging',
    label: "The mediation ledger entries from six weeks ago use newer ink than the dates claim.",
    tags: ['Investigation', 'NPC', 'Records', 'Mediation', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "The archive anteroom is locked — Caldor Sepulcher has taken the key to the ritual authority's morning review and won't return until well after midday. A handwritten notice on the door gives the authorization procedure: written request, two-day processing window, signature from the shrine master. The mediation court's public case summary board in the main corridor is open now without authorization and carries date stamps going back eighteen months.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering ledger manipulation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Caldor Sepulcher holds the ledger for a moment before handing it across. The entries from six weeks ago have been rewritten — the ink is newer than the dates claim, and the letterforms shift between older and recent hands partway through a page. More specific: the outcome language has changed. Old entries read "balance achieved." New ones use "appropriate resolution" or "necessary outcome." The substitution reframes mediation from finding a truth to executing a decision. Someone has been revising how the record says grief gets handled in Panim Haven.`;
        G.stageProgress[1]++;
        addJournal('Scribe revealed backdated ledger tampering', 'evidence', `panim_haven-ledger-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Caldor Sepulcher closes the ledger cabinet before you finish the request. "These records are protected. You need permission from the ritual authority — in writing." He doesn't wait for a response before walking to the shrine master's office. The door closes. Your presence at the ledger cabinet is now a matter on record. The pressure of that record will precede every future ledger request — the shrine master already knows what you were looking for.`;
        G.worldClocks.pressure++;
        addJournal('Shrine master alerted to ledger access attempt', 'complication', `panim_haven-ledger-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Partial access: Caldor Sepulcher supervises and selects which volumes you can handle. Pages have been removed and replaced — the binding thread is new at the spine on several sections, the fiber texture different from surrounding pages. Recent entries carry a handwriting pattern that diverges from the historical hand in the same volume. Someone with regular archive access has been editing the record from inside. The craft analysis of fiber composition would confirm whether the replacement pages were made from the same stock — there is still the matter of matching the thread gauge.`;
        addJournal('Ledger records show evidence of careful alteration', 'evidence', `panim_haven-ledger-altered-${G.dayCount}`);
      } else {
        G.lastResult = `Caldor Sepulcher recites the authorization requirement without inflection — written permission, ritual authority signature, forty-eight hour processing window. The salt-air coming through the high louvers shifts the candle flame on his desk; he doesn't glance at it. He's given this answer so many times that nothing about it costs him anything. The cabinet stays locked. The rope-and-peg latch hasn't moved since you sat down, and it won't. Nothing about his posture suggests the conversation is still open.`;
        addJournal('Ledger records blocked without formal authorization', 'evidence', `panim_haven-ledger-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 3. MEMORIAL COUNSELOR: GRIEF PROCESSING CHANGING
  {
    label: "Families used to take weeks. Now they're rushed through in days and sent away empty.",
    tags: ['Investigation', 'NPC', 'Grief', 'Ritual', 'Meaningful'],
    condition: function() { return (G.investigationProgress||0) < 3; },
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: "Kaelas is not at his counseling room — a posted card says he's accompanying a family through the processional circuit until the late afternoon. The memorial hall anteroom holds a waiting bench and a ledger of appointments. The families who have passed through Panim Haven's grief services are visible in that ledger by first name and case date, a record that doesn't require Kaelas at all.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading grief manipulation');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Kaelas lowers his voice before he starts. "Families used to take weeks. Sometimes months. Now they're done in days, and they're not finished — they're empty. Anger becomes numbness. Loss becomes compliance." He pauses. "I brought it to the ritual authority. They said prolonged grieving was becoming spiritually inefficient. As if grief has a productivity measure." He looks toward the door. "Someone is teaching Panim Haven to mourn wrong, and calling it progress."`;
        G.stageProgress[1]++;
        addJournal('Memorial counselor revealed accelerated grief processing', 'evidence', `panim_haven-grief-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Kaelas goes still. "You're asking me to discuss how people grieve." His tone carries the specific weight of someone who has just decided something about you. "That's not a question for outsiders. It's not a question for anyone who doesn't carry loss themselves." He doesn't raise his voice. He ends the conversation by turning toward his next appointment. Word that you asked will move through the shrine community on its own. The scrutiny of having asked draws a circle around you in this community — it will be harder to approach any grief-related inquiry without this question preceding it.`;
        G.worldClocks.reverence++;
        addJournal('Memorial counselor reports your inquiry as culturally insensitive', 'complication', `panim_haven-grief-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Kaelas admits the timeline has compressed. "The ritual authority wants families moving forward faster. They say it's pastoral care." He says it like a man repeating a phrase he finds inadequate. He doesn't elaborate further. The cedar smoke from the processional candles thickens in the hallway. His hands stay in his lap, and the discomfort is visible in how long he waits before saying anything else — the silence is the part he can't fill with borrowed language.`;
        addJournal('Memorial counselor confirmed accelerated grieving timeline', 'evidence', `panim_haven-grief-rushed-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 4. PROCESSIONAL COORDINATOR: ROUTE DIVERSIONS
  {
    label: "The processional routes changed three weeks ago. Every path ends at the mediation courts now.",
    tags: ['Investigation', 'NPC', 'Process', 'Routes', 'Meaningful'],
    condition: function() { return (G.investigationProgress||0) >= 3 && (G.investigationProgress||0) < 6; },
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: "Elder Fareth left before dawn with the early processional and won't return until evening. The route coordination office is unstaffed; the door is unlocked but the duty roster on the wall is last week's. The route diagram board outside the main shrine entry is publicly posted and updated each morning — the current map shows which paths are active today and which waystations are staffed.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading ritual route manipulation');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Elder Fareth glances at the route board before speaking. "Three weeks ago the primary routes changed. The paths through the memorial waystation and the offering halls — gone. Now every procession runs through the inner shrine and straight to the mediation courts." He touches the edge of the new map with one finger. "The old routes took longer. They passed through more places. These routes are shorter and they feel thin." He pulls his hand back. "I asked why. I was told that's not my concern anymore. The coordinator role used to mean I set the routes."`;
        G.stageProgress[1]++;
        addJournal('Coordinator revealed route diversion and authority stripping', 'evidence', `panim_haven-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Elder Fareth looks at you for a moment before answering. "Route decisions belong to the ritual authority. That's the current structure." He doesn't add anything. He doesn't look comfortable having said even that much. The inquiry will likely find its way to whoever asked him to use that phrase. The pressure of that report is quiet but specific — someone upstream will know what you asked, and through whom.`;
        G.worldClocks.pressure++;
        addJournal('Coordinator will report route inquiry to ritual authority', 'complication', `panim_haven-routes-alert-${G.dayCount}`);
      } else {
        G.lastResult = `Fareth confirms the routes were changed and produces the word "efficiency" like it was assigned to him. He doesn't appear to believe it. He looks at the new route diagram on the board and then away from it. There's more there, but he won't go further. Something about where the new routes don't go is the part he's not saying.`;
        addJournal('Coordinator confirmed route changes implemented quietly', 'evidence', `panim_haven-routes-changed-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 5. CHAPEL KEEPER: BLESSING FAILURE
  {
    label: "People return saying their blessings didn't hold. The ritual authority says they're working as designed.",
    tags: ['Investigation', 'NPC', 'Divine', 'Protection', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: "The chapel is closed for the morning blessing preparation — Meryl's work schedule runs against the visiting window today. The outer hall has a returns ledger where parishioners note when a blessing renewal is needed; it's open on the lectern and several recent entries describe the same concern: renewed sooner than the blessing cycle was supposed to require. Stone floors, beeswax residue, the low sound of preparation behind a closed door. The ledger is unsigned and publicly placed.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'reading divine protection corruption');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Meryl keeps her voice low and her back to the door. "People are returning. A merchant blessed for protection — robbed north of here within the week. A widow blessed for guidance through loss — she came back to say it made her numb, not steadier." She straightens a candle that doesn't need straightening. "I reported it. The ritual authority said the blessings were working as designed and people's expectations were the problem." She pauses. "I've administered blessings for eleven years. I know what a failing one looks like."`;
        G.stageProgress[1]++;
        addJournal('Chapel keeper revealed systematic blessing failure', 'evidence', `panim_haven-blessing-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Meryl turns from the candle rack. "You're asking me whether the blessings work." Her voice doesn't rise. "That's a question about whether this place is what it says it is." She waits for you to say something. When you don't, she tells you to leave. She stays watching the door after you're through it. The scrutiny of that question will live in this chapel — the next approach here will be received as a continuation of this one.`;
        G.worldClocks.reverence++;
        addJournal('Chapel keeper now hostile to blessing inquiry', 'complication', `panim_haven-blessing-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Meryl acknowledges that people have returned with complaints. "Some say the protection didn't hold. Maybe their faith wasn't strong going in." She uses the phrase like a door she's holding half-closed, one hand resting on the candle rack. The explanation is the one she was given, not the one she arrived at herself. The chapel smells of beeswax and cedar smoke. The failures are real. The rationalization is layered over them.`;
        addJournal('Chapel keeper acknowledged blessing effectiveness concerns', 'evidence', `panim_haven-blessing-concern-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 6. RITUAL AUTHORITY: DOCTRINE CHANGES
  {
    label: "The ritual authority received sealed guidance from outside. They know the structure too precisely.",
    tags: ['Investigation', 'NPC', 'Authority', 'Doctrine', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "Master Thiren's office is closed for a hierarchy review session that runs through the midday interval — the door carries a sealed notice, the kind that means no interruptions regardless of stated urgency. The shrine secretary confirms the next open visitor window is tomorrow morning. The public doctrine bulletin board outside the assembly hall is updated weekly; the most recent posting is dated three weeks ago and lists which ritual changes have been ratified.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'confronting institutional authority');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Master Thiren takes a breath before answering. "There have been changes. Doctrine adapts." He stops, then continues more carefully: "Panim Haven has received guidance from outside. Sealed documents through shrine messengers. I don't know the origin. But whoever sends them knows our ritual structure precisely — not approximately, precisely. They know exactly which elements to adjust to produce different outcomes without breaking the visible form." His hands are flat on the desk. "I'm no longer certain we are adapting. I think we may be being rewritten."`;
        G.stageProgress[1]++;
        addJournal('Ritual authority revealed external guidance manipulation', 'evidence', `panim_haven-authority-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Master Thiren's tone flattens. "Shrine doctrine is not open to external inquiry. This conversation is now a matter of record." He produces a notation sheet without looking away from you. "Do not approach the shrine hierarchy again without written authorization from the regional shrine council." He writes while you're still in the room. The warning is formal. You have been formally warned. The pressure of that notation runs ahead of you — every member of the hierarchy will know of it before you finish leaving this building.`;
        G.worldClocks.pressure++;
        addJournal('Ritual authority formally prohibits further shrine inquiry', 'complication', `panim_haven-authority-warning-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Thiren acknowledges that doctrine has shifted under "spiritual necessity." He offers that phrase and holds it there, not adding to it. He confirms the changes are deliberate, not a drift — chosen, implemented, monitored. The sealed guidance documents from outside are real; he doesn't dispute it. The source of the necessity is not something he names. He knows you noticed that he didn't, and he lets that knowledge sit between you without filling it.`;
        addJournal('Ritual authority confirmed deliberate doctrine modification', 'evidence', `panim_haven-authority-deliberate-${G.dayCount}`);
      } else {
        G.lastResult = `Thiren looks at you the way you'd look at a door that opened from the wrong direction. "Doctrine belongs to the hierarchy. Changes are appropriate." He returns to his papers without waiting for a response. The incense on the corner shelf burns to nothing while you stand there. The door to his office is open, which means the conversation is over. Nothing came back from this except the shape of a wall where a door should be.`;
        addJournal('Ritual authority blocked further questioning', 'evidence', `panim_haven-authority-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 7. INNKEEPER: GUEST PATTERNS AND SEALED LETTERS
  {
    label: "Northern couriers arrive every seven days, always sealed. Different courier, same timing.",
    tags: ['Investigation', 'NPC', 'Commerce', 'Intelligence', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: "The inn common room is empty at this hour — Merev Sepulcher runs the morning shift alone and the breakfast service has the full attention of everyone on staff. The guest register sits open on the counter, facing outward the way it always does at transit inns; names, departure dates, and stated origin by region are standard entries. The northern arrivals from the past two weeks are there in plain ink.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'tracing external communication');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Merev Sepulcher leans over the bar. "Every seven days, northern courier. Always meets with the ritual authority. Always leaves sealed documents with shrine staff. Different courier each time — same route, same timing, same unmarked coin payment." She glances at the door. "One of them mentioned, offhand, that they come from a place interested in how Panim Haven serves faith. That was all. Then the shrine told me not to speak with couriers directly." She straightens. "Someone from outside is running something through this village, and the shrine is the entry point."`;
        G.stageProgress[1]++;
        addJournal('Innkeeper mapped external courier network to shrine', 'evidence', `panim_haven-couriers-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Merev Sepulcher sets down the cup she was drying. "I don't discuss guests. That's not a principle I bend." She's not hostile — she's done with the conversation. The next time you come through that door she'll remember what you asked and measure everything else against it. She will be watchful for exactly this line of questions — anything that sounds like guest traffic will close faster than this one did.`;
        G.worldClocks.watchfulness++;
        addJournal('Innkeeper now distrustful of your questions', 'complication', `panim_haven-innkeeper-hostile-${G.dayCount}`);
      } else {
        G.lastResult = `Merev Sepulcher says northern visitors have been regular lately, and says it with slightly more certainty than the question required. "Business traffic." She doesn't elaborate. She refills a cup at the far end of the bar without being asked, putting distance between herself and the answer. The word "regular" carries weight she isn't explaining. The pattern is there. She's not ready to describe its edges to a stranger, not today.`;
        addJournal('Innkeeper acknowledged increased external visitor traffic', 'evidence', `panim_haven-innkeeper-traffic-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 8. MEDIATOR CLERIC: CASE OUTCOMES RIGGED
  {
    label: "Northern traders win every merchant dispute. The pattern is forty cases deep.",
    tags: ['Investigation', 'NPC', 'Justice', 'Corruption', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "The mediation office is formally closed — a scheduled training period that runs until tomorrow, the notice says, signed by the ritual authority. Elior Sepulcher is not in. The public outcome summary board in the main corridor posts case type and outcome category without party names; it's updated each week and the last six months of entries are still pinned. Pattern analysis across those entries doesn't require Elior's cooperation.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering mediation bias');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Elior Sepulcher pulls the case register and puts his finger on a column without speaking first. "Merchant disputes: northern trader wins, every time, past two months. Inheritance cases: property transfers to outside buyers. Family mediations where reconciliation was the likely outcome — they end in separation." He closes the register. "I can't prove a directive exists. But the pattern across forty cases doesn't happen by accident. The mediation system is producing someone else's preferred outcomes."`;
        G.stageProgress[1]++;
        addJournal('Mediator cleric revealed systematic outcome-bias pattern across 40 cases', 'evidence', `panim_haven-mediation-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Elior Sepulcher's posture changes before you finish the question. "Mediation records are sealed. You have no standing to review them." He writes the date at the top of a notation form. "This matter will be reported to the ritual authority." He doesn't look up while he writes. The formal note is already being drafted while you're still in the room. The pressure of that report is structural — it ties your name to this matter in a record that will be read by everyone above Elior in the chain.`;
        G.worldClocks.pressure++;
        addJournal('Mediation hall reported access attempt to authority', 'complication', `panim_haven-mediation-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `You review a selection Elior Sepulcher permits and track outcome by party type. The decisions carry valid mediation reasoning in each case — the written rationale is clean, the precedent citations correct. But across the set, the same party types win at a rate that the individual case records don't explain. Someone with access to the scheduling system is touching something upstream of the decisions themselves, before the mediators even enter the room.`;
        addJournal('Case review revealed possible systematic outcome bias', 'evidence', `panim_haven-mediation-bias-${G.dayCount}`);
      } else {
        G.lastResult = `The case folders stay on the shelf — close enough to read the spine labels, not close enough to open without standing Elior Sepulcher doesn't appear ready to grant. "Formal authorization, in writing, from the ritual authority." He's already back at his desk by the time the sentence ends. Cedar smoke drifts in from the processional corridor. The authorization requirement isn't a hurdle he's inviting you to clear. It's a door he's closed from the inside, and the silence of this office is the sound of it staying closed.`;
        addJournal('Mediation case records blocked without authorization', 'evidence', `panim_haven-mediation-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== ARCHETYPE DEEP DIVES (8 CHOICES) ==========

  // 9. LORE TIER 1: RITUAL FORMULA ANALYSIS
  {
    label: "The original asks for balance. The current version asks for appropriate divine resolution.",
    tags: ['Investigation', 'Lore', 'Magic', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: "The archive reading room is locked for the afternoon — a scheduled cataloging session that requires the stacks to be off-limits to outside visitors. The public doctrine reference shelf in the main shrine entry hall holds printed copies of the current ritual formulas, stamped with this year's ratification date. Comparing those to the pre-reform volumes Tazren mentioned would require finding those volumes first.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'ritual formula analysis');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The oldest texts and the current copies sit side by side. Invocations have been shortened — not translated, compressed. Protective components swapped for adjacent ones that read similarly in spoken form but carry different weight in the written registry. The original calls for "balance of divine and mortal will." The current version asks for "appropriate divine resolution." Three words changed. The entire orientation of the blessing shifted from mutual to prescribed. Someone has been editing the formulas to produce different outcomes from the same ritual form.`;
        G.stageProgress[1]++;
        addJournal('Lore analysis revealed formula tampering', 'evidence', `panim_haven-lore-formula-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The archive guardian appears before you reach the relevant shelf. "Those texts are restricted." The tone is not a warning — it's a final statement. You're out of the archive room before you can press further. The door closes with the sound of a latch dropping. You didn't get close enough to see whether the copy and the original matched. The scrutiny of having approached this shelf will follow the inquiry — any return visit will find the guardian already positioned before you arrive.`;
        G.worldClocks.reverence++;
        addJournal('Shrine archives now restricting your access', 'complication', `panim_haven-lore-blocked-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The recent copies differ from the oldest texts in ways that don't track with natural scribal drift — the changes cluster in the invocation and protective components, not in the opening or closing forms. Deliberate edits that weren't flagged as edits. The revised elements affect what the blessing is structurally asking for. Someone made changes and kept the record clean.`;
        addJournal('Lore research noted formula revision patterns', 'evidence', `panim_haven-lore-revision-${G.dayCount}`);
      } else {
        G.lastResult = `The formula language is dense and the archaic constructions make direct comparison slow. Something in the protective invocation section reads differently between the old hand and the current copy, but pinning down whether the difference is scribal variation or deliberate revision requires more time than the reading session allows. Tazren kept a copy of the pre-reform doctrine text — his version would serve as a clean reference baseline.`;
        addJournal('Formula analysis inconclusive', 'evidence', `panim_haven-lore-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 10. LORE TIER 2: DIVINE BALANCE DOCTRINE
  {
    label: "Old doctrine: find the just outcome. New doctrine: find the efficient one.",
    tags: ['Investigation', 'Lore', 'Philosophy', 'Doctrine', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "The theological reading collection is checked out in full to a shrine study group that has it until tomorrow evening. The librarian confirms no available copies today. The doctrine commentary section does have a publicly accessible pamphlet series — brief summaries of each revision issued over the past three years, distributed to parishioners at each change announcement. The language in those summaries may carry its own evidence.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'tracing doctrine corruption');
      G.stageProgress[1]++;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The original doctrine of divine balance treated every person's need as equal weight in the mediation scale — the text is explicit about this. Recent theological commentary reframes balance as "appropriate hierarchy": certain needs carry more weight, and wisdom lies in knowing which to serve first. The system itself hasn't changed form. Its stated purpose has. Old doctrine: find the just outcome. New doctrine: find the efficient one. The rewrite is in the interpretation layer, where it's harder to point to as forgery.`;
        G.stageProgress[1]++;
        addJournal('Lore research revealed philosophical doctrine inversion', 'evidence', `panim_haven-lore-doctrine-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A shrine messenger appears at the reading room door before you're done. "The hierarchy has noted your research focus." The message delivered, the messenger leaves. The wording is careful: not a prohibition, not a warning — a notification that you've been seen and categorized. The doctrine inquiry is now on someone's list. The scrutiny attached to that list is not passive — being categorized this way means the hierarchy will read the next research visit differently from how they read this one.`;
        G.worldClocks.reverence++;
        addJournal('Shrine hierarchy alerted to doctrine research', 'complication', `panim_haven-lore-alert-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Tracing the doctrine from primary texts to recent commentary shows a gradual shift in the interpretation layer. The primary texts haven't changed. The weight placed on specific passages has, quietly, across several revisions. Recent commentary emphasizes the hierarchy of needs in a way the original texts don't support. The doctrinal foundation is being used to justify outcomes the doctrine itself doesn't mandate — the justification is built into the reading, not the text.`;
        addJournal('Lore research confirmed doctrine interpretation shift', 'evidence', `panim_haven-lore-shift-${G.dayCount}`);
      } else {
        G.lastResult = `The theological texts are dense and the interpretive tradition is layered enough that distinguishing deliberate corruption from philosophical evolution requires a reference point you don't yet have. The reading room smells of old paper and cedar oil. The shift is visible. Whether it was imposed or emerged is still open. That distinction matters for what it means to act on it. The doctrine commentary and the sealed courier guidance arrive through the same shrine messenger channel — someone with access to both could tell which came first.`;
        addJournal('Doctrine interpretation analysis inconclusive', 'evidence', `panim_haven-lore-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 11. CRAFT TIER 1: OFFERING PREPARATION INSPECTION
  {
    label: "Each substitution passes on its own. Together they corrupt the entire offering.",
    tags: ['Investigation', 'Craft', 'Materials', 'Ritual', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: "The offering preparation hall is locked — a scheduled purification interval that closes it to all outside access until the next morning service. The supply manifest posted outside the door lists current stock categories and their approved sources by vendor name. Those vendor names, cross-referenced against the transit records at the harbor office, would show whether the sources match what Panim Haven's shrine charter approves.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'offering preparation analysis');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The preparation area shows substitution at every level. Incense components cut with lower-quality fill — identifiable by combustion rate and residue color. White grief-cloth bleached with caustic compounds that photograph correctly but break down faster than undamaged fiber. Copper vessels coated with a base metal film that reads as copper on surface inspection. Each substitution passes a casual check. Together they corrupt the material basis of every offering processed through this room. The substitution is systematic and old enough to have been done on a schedule.`;
        G.stageProgress[1]++;
        addJournal('Craft analysis revealed offering material corruption', 'evidence', `panim_haven-craft-offering-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The offering custodian appears at the door while you're still at the incense table. "This space is not for outside examination." She says it like a door closing, not a door opening. You're out before you can establish what the normal quality of the materials is supposed to look like. The preparation area is now off-limits and your presence in it has been noticed in the specific way that creates a record: the custodian's report will specify what you were examining when she arrived.`;
        G.worldClocks.reverence++;
        addJournal('Offering custodian expelled you from preparation area', 'complication', `panim_haven-craft-expelled-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The preparation area shows recent substitution — the incense mix has been adjusted, the cloth supply replaced with a batch that reads close but not identical to the previous standard. The changes were made to maintain appearance while altering underlying composition. Beeswax residue on the preparation stones is a different color than it should be at this stage of the season. The spiritual properties of the offering materials are affected in ways the visible form doesn't reveal.`;
        addJournal('Craft analysis noted material quality degradation', 'evidence', `panim_haven-craft-quality-${G.dayCount}`);
      } else {
        G.lastResult = `The offering materials read as standard on surface examination. The incense burns within normal parameters. The cloth is the right color. But the preparation sequence shows minor variations from the documented protocol — small enough to explain away, consistent enough to be a pattern. The preparation hall smells of cedar smoke and something slightly off beneath it. Precise analysis would need reference samples from before the doctrine revision period.`;
        addJournal('Offering material analysis inconclusive', 'evidence', `panim_haven-craft-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 12. CRAFT TIER 2: MEDIATION LEDGER DOCUMENT ANALYSIS
  {
    label: "The binding threads on replaced sections are newer than the surrounding pages.",
    tags: ['Investigation', 'Craft', 'Forgery', 'Evidence', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "The mediation archive is staffed today by a duty clerk who won't allow the ledger volumes off the reference shelf without written authorization — the same two-day processing window as always. The court's public summary board in the corridor holds case outcome records without the underlying documents. But the summary board is dated and sortable by case type, and the date clusters around the ghost closure period are visible without needing the ledger at all.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'exposing document forgery');
      G.stageProgress[1]++;

      const result = rollD20('spirit', (G.skills.craft || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Professional forgery. The recent entries use ink that has been chemically aged — the oxidation is correct on the surface but the underlying fiber absorption is wrong. Paper fiber composition differs from the original volume stock; the mismatch is subtle enough to miss without a cross-section comparison. Binding threads on the replaced sections are newer than the surrounding pages by visible thread diameter. Someone with document restoration skills removed sections and replaced them with forged copies built to survive casual examination. This is deliberate, skilled, and not the first time they've done it.`;
        G.stageProgress[1]++;
        addJournal('Craft analysis revealed professional document forgery', 'evidence', `panim_haven-craft-forgery-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Your handling of the ledger draws Thenim's attention before you've completed the second comparison. "That person is tampering with the records." He calls across the room while still moving toward you. The ritual authority arrives within minutes. You're standing in a room where the word "desecration" is being used with your name in the same sentence. Getting out cleanly requires more than you currently have available. The scrutiny of that accusation will precede you in every sacred space in Panim Haven.`;
        G.worldClocks.reverence++;
        addJournal('You are accused of sacred record tampering', 'complication', `panim_haven-craft-accused-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `Pages have been removed and replaced with skill — the binding repair is clean, the page edges trimmed to match surrounding stock. The work is above the level of a forger working under time pressure. Someone with sustained access and document craft removed sections and substituted new ones, then returned the volume to the shelf where it would age alongside the authentic pages. The result survives a visual inspection. It doesn't survive this one.`;
        addJournal('Craft analysis confirmed expert document manipulation', 'evidence', `panim_haven-craft-manipulation-${G.dayCount}`);
      } else {
        G.lastResult = `The ledger construction requires reference materials you don't have on hand — comparative paper stock from the same period, ink aging charts, original binding thread samples. The inconsistencies are present: fiber texture variation, thread gauge differences at the spine, a faint smell of iron-gall where the original would have used oak. Enough to suspect substitution. Not enough to document it as forgery without the reference baseline.`;
        addJournal('Document authenticity analysis inconclusive', 'evidence', `panim_haven-craft-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 13. SURVIVAL TIER 1: ROUTE NETWORK ANALYSIS
  {
    label: "Messenger routes don't match any shrine business destination. Same paths, different messengers.",
    tags: ['Investigation', 'Survival', 'Routes', 'Movement', 'Meaningful'],
    xpReward: 70,
    stageProgress: 1,
    failResult: {
      text: "The messenger traffic has moved to a different schedule today — the route workers at the waystation junction say the northern courier ran at dawn, hours before the usual window. The secondary paths to the waystations are publicly accessible on foot without authorization; the physical route itself doesn't close even when the messenger timing shifts. Walking the path at a traveler's pace would show what the route passes through and what structures it uses.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(70, 'messenger route analysis');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.vigor || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The messenger patterns map to a network. Documents exit Panim Haven northward — not by the main road but through secondary routes connecting the memorial waystations and offering halls, places where foot traffic reads as shrine business and attracts no additional scrutiny. Route workers name three locations that messengers visit on a regular schedule that doesn't appear in any sanctioned shrine documentation. Someone built a communication network using Panim Haven's sacred infrastructure as the cover layer.`;
        G.stageProgress[1]++;
        addJournal('Survival analysis mapped hidden messenger network', 'evidence', `panim_haven-survival-routes-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `A route worker intercepts you at the waystation junction. "The shrine notices when people follow the messengers." He doesn't ask your name. He doesn't need to — the report that goes in will describe what you were doing, not who you are. The surveillance attempt is logged. You've been tracked while tracking. The watchful coverage of the route network means the same approach will not work twice — they know the trail you were following.`;
        G.worldClocks.watchfulness++;
        addJournal('Messenger surveillance reported to shrine hierarchy', 'complication', `panim_haven-survival-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The messenger routes don't align with formal shrine business destinations. Main roads are consistently avoided in favor of secondary paths between the waystations — paths where foot traffic reads as mourners and pilgrims, not couriers. The avoidance is practiced, not incidental: same paths, same timings, across different messengers. Whatever is being moved through these routes is being moved carefully and has been for some time.`;
        addJournal('Survival analysis noted unusual messenger route patterns', 'evidence', `panim_haven-survival-pattern-${G.dayCount}`);
      } else {
        G.lastResult = `The messengers move without pattern observable from a single position — route variation, timing variation, delivery window spread across the full day. The dust on the secondary paths shows heavy foot traffic and fresh boot impressions going north, but no single messenger holds to the same path twice. Tracking them would require more positions than you can hold simultaneously, or a longer sustained observation period than today's window allows. The waystation network the messengers use is a fixed structure — the back rooms are accessible through the maintenance path the route workers use.`;
        addJournal('Messenger route surveillance inconclusive', 'evidence', `panim_haven-survival-unclear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 14. SURVIVAL TIER 2: WAYSTATION INSPECTION
  {
    label: "The waystation back rooms hold document supplies and currency. Not water, food, or candles.",
    tags: ['Investigation', 'Survival', 'Supplies', 'Evidence', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "The second waystation is staffed today and the maintenance path is watched — a route worker is doing repairs on the outer wall and has a clear view of the access point. The waystation's supply requisition notices are pinned to the exterior board as a standard transparency measure; they list what was ordered, from whom, and in what quantity. Requisitions for document materials at a rest facility would show up against the expected supply categories.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'uncovering waystation stockpiles');
      G.stageProgress[1]++;

      const result = rollD20('vigor', (G.skills.vigor || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The locked room in the second waystation holds nothing related to processional rest. Sealed document stacks, ink and writing materials, multiple sets of clothing in different regional styles, currency in at least three denominations. The storage is organized and regularly accessed — the documents are sorted, not piled. Someone has been running a logistics operation through Panim Haven's sacred waystation network for long enough to have developed an internal filing system. The sacred infrastructure is the cover. The cover is very good.`;
        G.stageProgress[1]++;
        addJournal('Survival analysis revealed waystation stockpile network', 'evidence', `panim_haven-survival-stockpile-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `Ritual enforcers are waiting at the waystation exit. Someone inside reported the inspection before you finished it. "Sacred spaces aren't open for inspection without authorization." They don't touch you. They don't need to — the confrontation itself is the consequence, formal and visible, already logged by the time you reach the main road. The pressure of that log runs forward: every waystation on this route will now have your description posted before you arrive.`;
        G.worldClocks.pressure++;
        addJournal('Ritual enforcers intercepted waystation inspection', 'complication', `panim_haven-survival-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The waystations carry more than processional rest supplies. Additional storage space has been created in the back rooms — built in, not improvised, the shelving fixed into the stone with mortared brackets. The extra stores don't match a rest facility's needs: too many document supplies, currency in wrapped bundles, not enough food and water. The function these rooms are serving is not the function they're labeled with.`;
        addJournal('Survival analysis found unauthorized waystation storage', 'evidence', `panim_haven-survival-storage-${G.dayCount}`);
      } else {
        G.lastResult = `The waystation supplies read as standard: water, basic food, candles, spare sandals, the smell of beeswax and old cedar beams. Nothing surfaces that contradicts the stated function on a first pass. If there's a secondary purpose here, the concealment is better than a visual sweep will penetrate. The back-room door is latched from inside. This requires a different approach or a longer window than today allows.`;
        addJournal('Waystation inspection found no anomalies', 'evidence', `panim_haven-survival-clear-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== GOSSIP & TENSION LAYERS (4 CHOICES) ==========

  // 15. STREET RUMOR: FAMILIES BEING DIVIDED
  {
    label: "The offering hall crowd is circling something. Three people, different tones, same direction.",
    tags: ['Investigation', 'Rumor', 'Social', 'Gossip', 'Meaningful'],
    xpReward: 65,
    stageProgress: 1,
    failResult: {
      text: "The offering hall empties quickly this morning — a scheduled blessing distribution draws most of the foot traffic to the chapel and leaves the hall nearly silent. The notice board near the exit still has postings: a service complaint, an unsigned note about a delayed case, a prayer request that describes a property dispute in enough detail to suggest who filed it. The hall may be empty, but the board hasn't been cleared since last week.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(65, 'parsing community grievance narratives');
      G.stageProgress[1]++;

      const rumor = [
        'the shrine is separating families that should stay together',
        'mediation is being rigged to benefit outsiders',
        'the blessed offerings aren\'t protecting anymore',
        'shrine workers are frightened by what they\'re being asked to do',
        'someone from outside is controlling what happens here'
      ];
      const selected = rumor[Math.floor(Math.random() * rumor.length)];

      G.lastResult = `At the offering hall: "${selected}." Three different people, different tones — one certain, one hedging, one who said it and then walked away quickly into the cedar-smoke haze of the colonnade. The specific claim varies. The direction of it doesn't. Panim Haven is circling something that's changed in the shrine, and the circling has a shape even when the words don't land cleanly.`;
      addJournal(`Street rumor gathered: "${selected}"`, 'evidence', `panim_haven-rumor-${G.dayCount}`);

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 16. INSTITUTIONAL CRACK: SHRINE WORKER DEFECTION
  {
    label: "A shrine worker knows the blessings changed. The fear in their voice is specific.",
    tags: ['Investigation', 'Evidence', 'Witness', 'Defection', 'Betrayal', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "Every shrine worker you can reach today gives the same practiced non-answer before you finish the question — the hierarchy session this morning apparently covered what to say to outside visitors. One worker, waiting near the side entrance for the session to end, glances at you without speaking and then looks at the memorial waystation down the street. Not hostile. Just the shape of a direction, given without words.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'turning institutional witness');
      G.stageProgress[1]++;
      addHeat('panim', 1);

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Thenim finds you near the dock at the third hour. He's carrying a wrapped package and talks without preamble. "I'm done here. The blessings I'm giving aren't the blessings I was trained to give. The mediation outcomes are set before the cases open. The directives come from outside and nobody questions where." He holds out the package. "I've kept records. Formula changes, ledger alterations, external correspondence that directed shrine decisions. I can't name who's at the top. I can document that the shrine has been taken apart from the inside." He looks at the water. "I'm leaving tonight. This goes to someone who acts on it, or it disappears with me."`;
        G.stageProgress[1]++;
        addJournal('Shrine worker defected with institutional documentation', 'evidence', `panim_haven-defection-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The worker listens, nods once, and goes to find the ritual authority. Within the hour a complaint has been filed: you approached a shrine worker with the intent to undermine institutional loyalty. The phrasing in the report is precise and practiced — this worker has reported this type of approach before. You're now characterized as an active threat to shrine integrity rather than an outside observer. The pressure of that characterization will meet you at every shrine door in Panim Haven from this point forward.`;
        G.worldClocks.pressure++;
        addJournal('You are reported as threat to shrine integrity', 'complication', `panim_haven-defection-caught-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `One worker stops before leaving. Doesn't name the doubts directly but describes them in circumference — questions about formula changes, timing of the ledger revisions, who authorized the route adjustments. Hints at documentation without producing it. Looks at the door twice during the conversation. The fear is specific, not general. They're close to the edge of something. They're not there yet.`;
        addJournal('Shrine worker shows defection potential but hesitates', 'evidence', `panim_haven-defection-close-${G.dayCount}`);
      } else {
        G.lastResult = `Every worker you approach gives the same answer in slightly different words: the shrine is functioning correctly, changes are pastoral responses to community need, external inquiry is not welcome. The consistency is trained, not spontaneous — each person pauses in the same place before the phrase "pastoral care," a beat long enough to notice. No one will break from the institutional position today, even alone, even away from the hearing of the hierarchy.`;
        addJournal('Shrine workers remain publicly loyal to institution', 'evidence', `panim_haven-defection-blocked-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 17. MEDIATION FAILURE: WRONGED FAMILY SPEAKS
  {
    label: "Every precedent favored her. The adjudicator ruled against her. Her home sold within the month.",
    tags: ['Investigation', 'Evidence', 'Victim', 'Personal', 'Meaningful'],
    xpReward: 75,
    stageProgress: 1,
    failResult: {
      text: "The families most likely to talk are already gone — transit through Panim Haven means people leave when their business closes, and those who lost property cases mostly left within days of the ruling. The guesthouse register from the past three months names several who noted their home locality; writing ahead of them to a waystation along their route back would reach them before memory fades and without the risk of being overheard in the haven itself.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(75, 'gathering victim testimony');
      G.stageProgress[1]++;

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `The widow sits at her sister's table, which is not her own table anymore. "My husband's brother contested the will. Northern trader, came here for the case specifically. Every precedent was in my favor." She folds her hands. "The mediator ruled against me. My home sold to a northern consortium within the month, for half its appraised value." She looks at the window. "I filed complaints. They were dismissed without review. I have the dismissal letters." She stands and retrieves them from a shelf. "The signature on each is the same name. One person closed all three."`;
        G.stageProgress[1]++;
        addJournal('Victim testimony detailed predetermied mediation manipulation', 'evidence', `panim_haven-victim-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `The family you approach goes quiet when you explain why you're asking. One member stands up. "You're here to find out what we know before we can use it." They've been approached before — by people who gathered their account and used it to anticipate their next move. Word moves through the docks and the notice board area that you've been asking. The characterization attached to your name is not favorable. The watchful community around these families will now treat the same inquiry as hostile before it finishes the first sentence.`;
        G.worldClocks.watchfulness++;
        addJournal('Victim now views you as complicit in mediation corruption', 'complication', `panim_haven-victim-hostile-${G.dayCount}`);
      } else if (result.total >= 12) {
        G.lastResult = `The family describes the case in detail: the evidence presented, the mediator's response, the outcome, and the timing of what happened to their property afterward. They speak quietly, across a table in a borrowed room. The account is coherent and specific. What it can't show is the mechanism — they can trace what happened to them but not the instruction that produced it. Compelling testimony. Incomplete proof, but the kind that doesn't need much more to hold.`;
        addJournal('Victim testimony gathered but proof remains circumstantial', 'evidence', `panim_haven-victim-testimony-${G.dayCount}`);
      } else {
        G.lastResult = `The families you approach aren't hostile — they're careful. The shrine's authority over dispute resolution means disputing its outcomes publicly carries its own risks. The stone steps of the guesthouse are warm in the afternoon, and everyone watches from open windows. Each person gives you the shape of the conversation without the substance: "Things didn't go as expected." None of them will go further today, in daylight, in the village.`;
        addJournal('Victims remain silent about mediation failures', 'evidence', `panim_haven-victim-silent-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // 18. LAYERED REVELATION: MEDIATION AS INSTRUMENT
  {
    plot: 'main',
    questId: 'q_s1_close',
    label: "The system isn't broken. It's been reoriented toward the same beneficiaries every time.",
    tags: ['Investigation', 'Proof', 'Systematic', 'Conspiracy', 'Exposure', 'Meaningful'],
    xpReward: 80,
    stageProgress: 1,
    failResult: {
      text: "The assembled evidence still has gaps in the mechanism layer — individual pieces are documented, but the connective thread between them remains circumstantial. A single strong source willing to describe the coordination would convert pattern into proof. Tazren holds the pre-reform doctrine text and has been watching this unfold from the outside for two years. His framing of where each piece fits may be the missing structure.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1);
      G.telemetry.turns++;
      G.telemetry.actions++;
      gainXp(80, 'exposing mediation conspiracy');
      G.stageProgress[1]++;
      addHeat('panim', 1);
      G.rivals = G.rivals || {}; G.rivals.heat = (G.rivals.heat || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));

      if (result.isCrit) {
        G.lastResult = `Laid out together: forged ledger entries, doctrine philosophical shift, victim testimony, defected worker documentation, courier patterns, waystation stockpiles. The pattern resolves. Panim Haven's mediation system has been redesigned to transfer property and authority from local families to external stakeholders. The blessings have been weakened to create dependency on shrine intervention rather than independent protection. The processional reroutes created surveillance gaps for the logistics operation. Someone with precise knowledge of how each system functions built this — not by destroying what was there, but by reorienting it. The outcome isn't degradation. It's replacement with a structure that looks identical from the outside.`;
        G.stageProgress[1]++;
        addJournal('Conspiracy evidence compiled and systematized', 'evidence', `panim_haven-conspiracy-${G.dayCount}`);
      } else if (result.isFumble) {
        G.lastResult = `By the time you're halfway through compiling the evidence, someone has noticed the pattern of your requests across the shrine, the waystations, and the mediation offices. A message arrives at the inn — unsigned, left with the innkeeper. "You've been asking questions in too many places at once. Stop, or you'll find out what the mediation system does to cases involving people who create problems." The warning is not general. It references specific questions you asked today. The pressure is explicit: you are being tracked across every institution in this town simultaneously.`;
        G.worldClocks.pressure++;
        addJournal('Conspiracy orchestrators directly warn you off', 'complication', `panim_haven-conspiracy-warning-${G.dayCount}`);
      } else if (result.total >= 13) {
        G.lastResult = `The pieces align into a picture that's compelling without being conclusive. The mediation bias, the doctrine shift, the material substitutions, the waystation irregularities — they point in the same direction, all of them, like roads built to serve the same destination. What's still missing is the mechanism that connects them deliberately. Enough to know the system is compromised. Not enough to name who gave the order to compromise it, or when that order first arrived.`;
        addJournal('Substantial corruption evidence compiled', 'evidence', `panim_haven-conspiracy-substantial-${G.dayCount}`);
      } else {
        G.lastResult = `The individual pieces are present but the connections between them are circumstantial at this stage. The pattern is visible — same direction, consistent pressure, same beneficiaries — but the thread that ties them to a single coordinating source isn't in hand yet. The incense in this part of the city is cheap and burns fast. More ground needs covering before the picture can be assembled into something that withstands challenge, or that anyone would be willing to act on.`;
        addJournal('Evidence pattern visible but incomplete', 'evidence', `panim_haven-conspiracy-partial-${G.dayCount}`);
      }

      G.recentOutcomeType = 'investigate';
      maybeStageAdvance();
    }
  },

  // ========== EXPANSION CHOICES ==========

  // 19. CLUE: BUREAU CASE FRAGMENTS
  {
    label: "Forty-three cases closed in seventy-two hours with no transcripts, no outcomes, no parties named.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 73,
    failResult: 'This path is closed here, but the cluster of fast closures is documentable by timing pattern alone — the harbor logs showing Bureau-escorted vessel departures during those same windows are publicly filed.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(73, 'reading Bureau case register');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      const result = rollD20('wits', (G.skills.wits || 0) + Math.floor(G.level / 3));
      if (result.total >= 13) {
        G.lastResult = `Forty-three cases in the past year: opened, assigned to senior mediators, closed within seventy-two hours. Status in each: "resolved per supplementary doctrine." No transcripts. No outcome records. No parties named. The supplementary doctrine citation traces to a doctrine revision that cites another doctrine revision — a circular reference that terminates at itself. These cases didn't reach resolution. They were removed from visibility using the appearance of resolution.`;
        if (!G.flags) G.flags = {};
        G.flags.found_bureau_ghost_cases = true;
        addJournal('Bureau register: 43 cases closed via circular doctrine citation — no records, no parties', 'evidence', `panim-bureau-${G.dayCount}`);
      } else {
        G.lastResult = `The register shows a cluster of cases with resolution codes you can't fully interpret without doctrine reference access. The closures are fast — significantly faster than the surrounding case set — and they cluster by time period rather than by case type. The archive room smells of old leather and cedar oil, familiar and indifferent. The pattern of fast closures is documentable even without knowing what the codes mean; the shape of it is visible in the dates alone.`;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 20. CLUE: COASTAL ROUTE PASSAGE RECORDS
  {
    label: "Three vessels left under Bureau escort during the ghost case windows. The cargo is gone.",
    tags: ['Investigation', 'Evidence', 'Stage1', 'Meaningful'],
    xpReward: 70,
    failResult: {
      text: "The harbor master's office is locked — the morning vessel departures happened before dawn and the office won't reopen until after midday. The public docking manifest is posted on the harbor notice board by regulation; it lists vessel names, escort classifications, and cargo categories by departure date. Bureau-classified escort designations appear as a distinct stamp in the manifest column, and the dates are searchable against the ghost case windows without needing the harbor master at all.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'tracing coastal passage records');
      if (!G.investigationProgress) G.investigationProgress = 0;
      if (!G.worldClocks) G.worldClocks = {};
      G.investigationProgress++;
      if (G.investigationProgress === 3) G.worldClocks.watchfulness = (G.worldClocks.watchfulness || 0) + 1;

      G.lastResult = `Three vessels in six months departed under Bureau escort classification — the designation reserved for transporting material evidence under active mediation. The case numbers assigned to those vessels are among the forty-three ghost cases: no records, no resolution, no parties named. The vessels left Panim Haven carrying something under formal Bureau protection. Whatever it was has moved beyond this jurisdiction and outside any recoverable evidence chain.`;
      if (!G.flags) G.flags = {};
      G.flags.found_coastal_passage_records = true;
      addJournal('Harbor logs: three Bureau-escorted vessels departed during ghost case windows — cargo unknown, jurisdiction transferred', 'evidence', `panim-harbor-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 21. ARCHETYPE-GATED: READING THE RECKONING QUARTER
  {
    label: "The queue outside the Bureau hasn't moved in three hours. The wait is a mechanism.",
    tags: ['Investigation', 'Archetype', 'Stage1', 'Meaningful'],
    xpReward: 68,
    failResult: {
      text: "The Reckoning Quarter is closed off this morning — a scheduled maintenance closure of the main corridor has redirected foot traffic around the Bureau block entirely. The alternate approach runs past the rear entrance and the waystation annex, both of which see the same Bureau-adjacent traffic. The people waiting on the south steps are still visible from the annex corner, and the wait length from that angle tells the same story the main entrance would.",
      next: [{ cid: '__arrive__', label: 'Continue', tag: 'safe', skill: 'vigor' }]
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(68, 'reading Reckoning Quarter');
      const arch = G.archetype && G.archetype.group;

      if (arch === 'combat') {
        G.lastResult = `The Bureau wardens position themselves for coverage, not for assistance — near the entrances, angled toward the approaches. They're not hostile. They're watching. Their eyes track complainants entering the building the way you'd track someone whose intentions you haven't established. Their boots are worn in on the outside edge: long hours on stone floors, not patrol routes. Whatever role they were originally assigned, they've been redirected to a different one.`;
      } else if (arch === 'magic') {
        G.lastResult = `The quarter's architecture channels sound toward the Bureau's upper windows — designed for public transparency, so proceedings could carry to the street. The windows are shuttered today, thick cedar panels drawn flush against the stone. The acoustic geometry still works; there's simply nothing coming through it. The building was built to be heard. Someone decided it shouldn't be anymore and closed it from within, one shutter at a time.`;
      } else if (arch === 'stealth') {
        G.lastResult = `Two men walk the same irregular route through the quarter, twelve minutes apart, never crossing paths. No marks on their clothing — not Bureau wardens. The pattern is a patrol. Civilian watchers running surveillance coverage outside the sanctioned perimeter, on a rotation that someone scheduled. They both wear the same style of worn-heel sandal, the kind sold at a specific stall in the eastern market. The informal layer and the formal layer are being run separately.`;
      } else {
        G.lastResult = `The queue outside the Bureau hasn't moved in three hours. People sit on the steps or stand against the wall with the posture of people who have stopped expecting to be called. No one exits. No clerk appears. The wait is the answer — not a delay, a mechanism. People who come here enough times without result eventually stop coming. The Bureau's accessibility is managed through attrition.`;
      }
      addJournal('Reckoning Quarter: Bureau functioning as deterrent rather than service, unsanctioned surveillance active', 'evidence', `panim-quarter-read-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 22. FACTION SEED: OVERSIGHT COLLEGIUM OBSERVER
  {
    label: "The Collegium received a formal complaint fourteen weeks ago. The review panel hasn't convened.",
    tags: ['Faction', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 70,
    failResult: 'This path is closed here, but Callow made plain that a formal written complaint — specific, signed — would be received and filed without the standing requirement.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(70, 'making Oversight Collegium contact');
      if (!G.factionHostility) G.factionHostility = { warden_order: 0, iron_compact: 0, oversight_collegium: 0 };

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      if (result.total >= 12) {
        G.lastResult = `Callow has been at the Panim Haven posting for four months. He speaks without preamble. "The Collegium received a formal complaint about Bureau case handling fourteen weeks ago. Received, logged, acknowledged, assigned to a review panel." He pauses. "That panel hasn't convened." He doesn't editorialize further — the arithmetic does it for him. He asks whether you've accessed the case register. When you describe the ghost closure pattern, he writes it down. "That will support the existing complaint file." His pen keeps moving.`;        if (!G.flags) G.flags = {};
        G.flags.met_oversight_collegium_panim = true;
        G.factionHostility.oversight_collegium += 1;
        addJournal('Oversight Collegium observer Tren Callow: Bureau complaint review deliberately delayed, collecting supporting evidence', 'intelligence', `panim-collegium-${G.dayCount}`);
      } else {
        G.lastResult = `Callow is professionally correct in every sentence. He can receive written complaints and issue receipt confirmations. He cannot discuss the status of ongoing review processes. He produces the complaint form without being asked, sliding it across the table with the practiced motion of someone who does this several times a day. The Collegium process exists and is accessible. It is not currently producing anything, and the gap between those two facts is wider than it should be.`;
        if (!G.flags) G.flags = {};
        G.flags.located_oversight_collegium_panim = true;
      }
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // 23. ATMOSPHERE: TAZREN'S SHADOW
  {
    label: "Tazren's name is in every pre-reform archive. He's absent from every current Bureau document.",
    tags: ['WorldColor', 'Lore', 'Stage1', 'Meaningful'],
    xpReward: 52,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(52, 'asking about Tazren');

      G.lastResult = `The clerk stops filing. "Tazren ran the Bureau for twenty-two years. When the doctrine revision came through, he retired. No argument, no public statement — just left." She taps the edge of the folder against the cabinet. "He used to say: Panim Haven doesn't need justice. It needs to believe justice is possible." She goes back to filing. His name is absent from every current Bureau document on these shelves. That absence required effort.`;
      addJournal('Tazren: former Bureau head, left at doctrine revision, name removed from current materials', 'discovery', `panim-tazren-${G.dayCount}`);
      G.recentOutcomeType = 'explore'; maybeStageAdvance();
    }
  },

  // 24. PERSONAL ARC: FIND TAZREN
  {
    label: "The retired Bureau head lives two streets away. Removed from every current record.",
    tags: ['PersonalArc', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 72,
    failResult: 'This path is closed here, but someone from the Bureau era who can introduce you as trustworthy is the specific key Tazren\'s neighbors named — the archive clerk who still dusts the plaque knows which names survived the revision.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(72, 'finding Tazren');
      if (!G.flags) G.flags = {};

      const result = rollD20('vigor', (G.skills.vigor || 0) + Math.floor(G.level / 3));
      if (result.total >= 11) {
        G.lastResult = `Tazren answers the door before you knock twice. He lives two streets from the Bureau and doesn't ask who you are or how you found him. He steps back to let you in. "The doctrine revision wasn't a reform. It was a transfer of ownership. I don't know to whom." He sets a cup down in front of you. "I left when I stopped recognizing the system I'd built." He keeps a copy of the pre-reform doctrine text on the shelf behind him — he touches the spine when he mentions it. He'll help. On his own terms. With his own limits, which he'll name when he reaches them.`;
        G.flags.met_tazren = true;
        addJournal('Tazren found: former Bureau head, has pre-reform doctrine, willing to assist conditionally', 'contact_made', `panim-tazren-found-${G.dayCount}`);
      } else {
        G.lastResult = `Tazren's neighbors confirm he's in the quarter but say he doesn't receive strangers. One of them says it the way people say things they've been asked to say — the phrasing smooth from repetition, the eye contact steady in the way of someone holding a line. He's there. He's not accessible without an introduction — someone from the Bureau era who can place you as trustworthy. That introduction needs to be found first.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 25. SOCIAL: THE CASE THAT WAS CLOSED YESTERDAY
  {
    label: "A case closed under the ghost code yesterday. The complainant hasn't left yet.",
    tags: ['Social', 'NPC', 'Stage1', 'Meaningful'],
    xpReward: 67,
    failResult: 'This path is closed here, but the Bureau closure process moved faster than expected — the forged release-of-claim signature is still something the harbor master may have a copy of if the property transfer required a maritime stamp.',
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(67, 'interviewing recent ghost case complainant');

      const result = rollD20('charm', (G.skills.charm || 0) + Math.floor(G.level / 3));
      if (result.total >= 10) {
        G.lastResult = `Sera is still at the guesthouse — she hasn't processed what happened yet. She describes it in short sentences: land dispute, six weeks in the Bureau queue, yesterday she received a sealed letter and a small payment. "Resolved per supplementary doctrine. The case is closed." She holds the letter without opening it. When you ask, she hands it across. Release of claim form, signed in her name. She watches you read it. "I didn't sign that." Her handwriting is close but not hers — the loop on the final letter of her surname goes the wrong direction.`;
        if (!G.flags) G.flags = {};
        G.flags.met_sera_complainant = true;
        addJournal('Complainant Sera: Bureau forged her signature on a release of claim form, case closed without her consent', 'contact_made', `panim-sera-${G.dayCount}`);
      } else {
        G.lastResult = `The address takes time to locate, and the time matters. By the time you reach it, Sera is gone — she left Panim Haven the same morning the letter was delivered, her few things cleared from the guesthouse room before the midday bell. The Bureau's closure process was fast enough to close the window before you or anyone else could reach her. She's outside the jurisdiction now. So is her testimony.`;
      }
      G.recentOutcomeType = 'social'; maybeStageAdvance();
    }
  },

  // 26. SHADOW RIVAL INTRO
  {
    label: "Tazren mentions a visitor last month claiming to research Bureau reform history.",
    tags: ['Rival', 'Warning', 'Stage1', 'Meaningful'],
    xpReward: 57,
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(57, 'receiving rival warning');
      if (!G.flags) G.flags = {};

      const arch = G.archetype && G.archetype.group;
      if (arch === 'combat') {
        G.lastResult = `"They asked which senior mediators left voluntarily versus were pushed out," Tazren says. "Specifically who kept their retirement packages and who walked away with nothing. They were building a list of people with legitimate grievances." He looks at the Bureau building through the window. "A recruitment map. They were mapping the people who might be willing to work against the current structure."`;
      } else if (arch === 'magic') {
        G.lastResult = `"They asked about the pre-reform doctrine text," Tazren says. "How many copies. Whether any were held outside institutional archives." He taps the volume on the shelf — his hand rests there a moment before he pulls it back. "They weren't studying the doctrine. They were counting how many copies of the evidence exist and where they're held. A document inventory. Not a research visit. Someone sent them to map what could be used against them."`;
      } else if (arch === 'stealth') {
        G.lastResult = `"They asked almost nothing," Tazren says. "Mostly listened. Let silences sit until I filled them. By the end I'd told them everything I know without being asked directly." He doesn't look embarrassed — he looks like a man who has had time to analyze what happened. "That's a practiced technique. Not improvised. Someone trained them to harvest information without leaving a record of what they were after."`;
      } else {
        G.lastResult = `"They offered to help," Tazren says. "Restoration of my name in Bureau records. Formal recognition of my service." He turns his cup on the table, one full rotation. "Two years ago that would have been enough to close the conversation." He pauses. The pre-reform doctrine text sits on the shelf behind him. "I said no. It felt like the kind of gift that becomes a debt the moment you take it." Someone identified exactly what he wanted most and offered it. He recognized the shape of the offer for what it was.`;
      }

      G.lastResult += ` They were here before you. They got what you came for.`;
      if (!G.rivalId) {
        if (arch === 'combat') G.rivalId = 'warden_captain';
        else if (arch === 'magic') G.rivalId = 'archivist_veld';
        else if (arch === 'stealth') G.rivalId = 'shadow_broker';
        else G.rivalId = 'provost_lenn';
      }
      G.flags.stage1_rival_seeded = true;
      addJournal('Rival-adjacent operative interviewed Tazren before you — expert social engineering, preceded your inquiry', 'complication', `panim-rival-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },
  // TYPE: INFORMATION — WORLD COLOR VIGNETTE
  {
    label: "The memorial hall offering smoke drifts the same direction every morning regardless of the wind.",
    tags: ['WorldColor', 'Atmosphere', 'Stage1'],
    xpReward: 38,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(38, 'observing memorial hall offering smoke');
      G.lastResult = `The memorial halls at Panim Haven burn slow-smoke offerings at dawn — a combination of dried herbs and waxed cord that the attendants set before the first processional. The smoke rises and then drifts consistently north regardless of the morning air, which the attendants attribute to the hall architecture directing air currents. The effect is deliberate: the smoke visible from the northern approach road marks the haven as active from a distance, assuring travelers the halls are staffed before they arrive. The smoke is also the signal to the waystation network that the daily route is open. Two functions, one flame, visible to everyone and read differently by those who know.`;
      G.recentOutcomeType = 'observe'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — ARCHETYPE GATE (Saint — Support family)
  {
    label: "The blessings here have been weakened. The doctrine used to explain it is recent.",
    tags: ['Information', 'ArchetypeGate', 'Stage1'],
    xpReward: 72,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      const family = typeof getArchetypeFamily === 'function' ? getArchetypeFamily(G.archetype) : '';
      if (family !== 'Support') {
        G.lastResult = `The blessing materials distributed at Panim Haven's processionals have changed in composition — the practitioners mention it as a doctrinal refinement, something handed down from the ritual authority in a sealed notice. The incense is different: thinner smoke, faster burning, a sharper undertone where the old cedar blend used to sit. Without specific knowledge of how blessing materials function, the change reads as administrative. The families queuing for the morning processional don't appear to notice.`;
        gainXp(30, 'noting blessing material change');
        G.recentOutcomeType = 'observe'; maybeStageAdvance(); return;
      }
      gainXp(72, 'analyzing blessing material composition change');
      G.stageProgress[1]++;
      G.lastResult = `The current blessing materials are substituted at the third component — the binding element that determines duration and penetration. The original formula held for a full seasonal cycle per application. The current formula holds for six weeks. The doctrine explanation for the change frames shorter-cycle blessings as requiring more frequent renewal, which increases shrine contact and dependency. But the practical effect is that property protections — the most common blessing application in a haven of this type — now lapse before the agricultural season completes. Three months into a planting cycle, the protection expires.`;
      if (!G.flags) G.flags = {};
      G.flags.panim_blessing_weakened = true;
      addJournal('Panim Haven blessing formula: third component substituted, duration halved — property protections now expire mid-season, increasing shrine dependency', 'evidence', `panim-blessing-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

  // TYPE: INFORMATION — BACKGROUND FLAVOR
  {
    label: "The shrine's donation ledger has entries that describe transactions the shrine's charter doesn't permit.",
    tags: ['Information', 'Background', 'Stage1'],
    xpReward: 55,
    failResult: function() {
      addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
      loadStageChoices(G.location);
    },
    fn: function() {
      advanceTime(1); G.telemetry.turns++; G.telemetry.actions++;
      gainXp(55, 'reviewing shrine donation ledger');
      const bg = G.background || '';
      let result = `The shrine donation ledger — publicly accessible as part of the transparency requirement under the Union's charitable institution guidelines — includes entries categorized as "property transfer in lieu of donation." Fourteen such entries in the past year. Shrine charters at institutions of this type are permitted to accept cash and material donations; property transfers require a separate legal instrument under regional law. The ledger entries don't reference any corresponding legal instruments.`;
      if (bg === 'scholar' || bg === 'administrator' || bg === 'lawyer') {
        result = `Property-in-lieu-of-donation entries without corresponding transfer instruments are a known mechanism for obscuring forced transfers — if the property appears in the donation ledger, it reads as voluntary. The fourteen entries span twelve different families. Cross-referencing against the mediation case records you've seen: three of those families had active mediation cases that were closed during the same period their property appeared in the donation ledger. Correlation across records that weren't designed to be read together.`;
      }
      G.lastResult = result;
      addJournal('Shrine donation ledger: 14 property transfers without required legal instruments — 3 match families with closed mediation cases same period', 'evidence', `panim-donation-${G.dayCount}`);
      G.recentOutcomeType = 'investigate'; maybeStageAdvance();
    }
  },

{
  label: 'The notice board has recent postings.',
  tags: ['social'],
  xpReward: 5,
  failResult: function() {
    addNarration('', 'The approach yields nothing useful. You step back before drawing attention.', 'failure');
    loadStageChoices(G.location);
  },
  fn: function() {
    var key = 'rumor_drawn_' + G.location + '_' + G.dayCount;
    if (G.flags[key]) {
      G.lastResult = 'The board has nothing new since this morning. A routing number change for the eastern memorial circuit and a manifest update for the next transit convoy are still pinned from the morning posting — nothing that wasn\'t common knowledge by the first bell. The cedar-framed board is damp along the lower edge from the night air. Two pins have worked loose and dangle without holding anything.';
      return;
    }
    G.flags[key] = true;
    drawLocalityRumor(G.location);
  }
}
,

  // ========== UNGATED ARRIVAL CHOICES (sp1=0 safe) ==========

  {
    id: 'panim_observe_route_board',
    label: "The route-board at the inn has more pins than routes. Someone marked closed roads.",
    tag: 'safe · observation · DC 7',
    effects: [],
    fn: function() {
      G.lastResult = 'The board runs floor to ceiling on the main wall of the common room, cork surface worn through to the backing in three places from decades of pinning and repinning. Colored pins mark active routes in blue, closed routes in red, and something between the two — orange pins, no key on the legend strip — cluster along the eastern corridor approaches. The innkeeper refreshes the board each morning from the carters who overnight here. The orange markings went in four weeks ago. The legend strip hasn\'t been updated to explain them.';
      gainXp(10, 'route board observation');
      G.recentOutcomeType = 'observe';
    },
    failResult: 'The board is being updated right now — the innkeeper has it half cleared and is talking to a drover at the same time. Coming back after the morning exchange ends will leave it freshly pinned and readable.'
  },

  {
    id: 'panim_observe_drovers',
    label: "The drovers eat fast and leave before the common room fills.",
    tag: 'safe · observation · DC 7',
    effects: [],
    fn: function() {
      G.lastResult = 'Four drovers at the end table work through their plates in silence, eyes on the door whenever it opens. The table holds five chairs; the fifth is pushed back and angled away, occupied by packs rather than a person. They pay before the food arrives, the coins already counted and flat on the table when the bowls come out. A carter at the adjacent table clocks them the same way — not suspiciously, just with the practiced attention of someone who reads the room for information about what the roads ahead are carrying. The drovers leave together. The table is clear inside a minute.';
      gainXp(10, 'drover observation');
      G.recentOutcomeType = 'observe';
    },
    failResult: 'The common room has emptied for the mid-morning lull — the drovers have moved on and the next wave won\'t arrive until the afternoon stage comes through. The route-board near the door carries more information than the empty tables right now.'
  },

  {
    id: 'panim_observe_waystation',
    label: "The waystation log at the crossroads post is open to anyone who can read it.",
    tag: 'safe · observation · DC 7',
    effects: [],
    fn: function() {
      G.lastResult = 'The log is a wide-ruled ledger mounted under a hinged weather cover at the crossroads post, open by custom for traveler reference. Entries run in three columns: arrival, departure, cargo category. The categories are shorthand — grain, dry goods, medicinal, personal — and most entries fill in all three columns cleanly. Three entries from the past week carry the cargo column blank, the departure time entered before the arrival time can have been accurate, and initials in the registrar column that don\'t appear anywhere else in the book. Someone is using the public log to hide movement inside it.';
      gainXp(10, 'waystation log observation');
      G.recentOutcomeType = 'observe';
    },
    failResult: 'The waystation log cover is latched — a registrar is making entries and the book is on their side of the counter. The crossroads post opens the log to public reading again once the registrar finishes the morning batch.'
  }
];

// ── ARCHETYPE-EXCLUSIVE CHOICES ──────────────────────────────
PANIM_HAVEN_STAGE1_ENRICHED_CHOICES.push(

  // COMBAT ×2 — harbor watch deployment
  {
    id: 'panim_arch_combat_1',
    label: 'Harbor watch positions doubled since last season. No public notice of the change.',
    skill: 'might',
    archetypeGroup: 'combat',
    tags: ['Military', 'Harbor', 'Observation'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The harbor watch has doubled its posting count on the eastern pier — two guards where one stood for years, new assignment covering the approach from the shallow-water route. No public notice was posted, no change logged in the harbor master\'s board. The change in force presence happened quietly and quickly, which means someone with authority to move the watch made the decision without going through the standard procedure.');
      addJournal('Harbor watch doubled at eastern pier — no public notice, non-standard deployment, authority outside normal chain.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The watch captain moves to intercept the moment your gaze lingers on the pier positioning. He is professional and final: the watch deployment is internal safety business. The harbor master\'s duty board on the main quay lists all posted watch changes going back six weeks — the absence of this one in the log will be visible.' }
  },

  {
    id: 'panim_arch_combat_2',
    label: 'The private pier security answers to someone outside the harbor master\'s chain.',
    skill: 'might',
    archetypeGroup: 'combat',
    tags: ['Security', 'Authority', 'Chain'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The security personnel at the private pier on the north side carry no harbor master credentials. Their authorization papers bear a different stamp — a commercial charter mark from a trading entity not listed in Panim Haven\'s registered harbor roster. They operate parallel to the harbor watch, with physical access to the pier network, under authority from an external commercial body. The harbor master cannot order them. Someone arranged this deliberately.');
      addJournal('Private pier security: chartered under external commercial body, outside harbor master authority entirely.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The private security personnel decline questions without hostility — they are authorized to be there and their authorization is complete. The commercial charter registry in the harbor master\'s office lists all registered entities with pier access; an entity not in that registry would appear as a gap.' }
  },

  // MAGIC ×2 — tidal ward changes
  {
    id: 'panim_arch_magic_1',
    label: 'The tidal ward at the shrine entry was adjusted. The adjustment removed a transparency clause.',
    skill: 'spirit',
    archetypeGroup: 'magic',
    tags: ['Magic', 'Wards', 'Shrine'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The ward inscription at the shrine entrance carries a layered rewrite — the original registration glyph remains partially legible beneath the current version. The removed element is a transparency clause, a provision that required ward activity to be logged in the shrine registry. The current ward operates without any logging requirement. Transactions, petitions, and offerings processed under this ward now leave no arcane record. The removal was deliberate and specific.');
      addJournal('Shrine entry ward rewritten: transparency clause removed, ward activity now unlogged by design.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The shrine attendant steps across the inscription when your examination becomes apparent. The outer harbor wayshrine carries the same ward type with an older, unmodified inscription — the comparison between the two versions would be visible there without restriction.' }
  },

  {
    id: 'panim_arch_magic_2',
    label: 'A mediation rite was conducted without the standard witnessing glyph. No arcane record exists.',
    skill: 'spirit',
    archetypeGroup: 'magic',
    tags: ['Magic', 'Ritual', 'Records'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'A mediation proceeding from six weeks ago shows no witnessing glyph in the ritual record — the arcane signature that confirms a rite was conducted under proper observance is absent. The physical record exists; the mediation happened. But without the witnessing glyph, the ritual outcome is not binding under shrine law and cannot be appealed. Someone conducted a formal mediation with full institutional appearance but no arcane accountability, producing an outcome with no recourse mechanism for the party who lost.');
      addJournal('Mediation six weeks ago: no witnessing glyph. Outcome not binding under shrine law, no appeal mechanism.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The ritual archive is sealed for the current blessing cycle. The ritual master\'s public register in the main hall carries summaries of all conducted rites — the summary entry for the relevant week will show whether a witnessing glyph was recorded.' }
  },

  // STEALTH ×2 — dock movement gaps
  {
    id: 'panim_arch_stealth_1',
    label: 'There is a window in harbor watch coverage every morning just before the bell.',
    skill: 'finesse',
    archetypeGroup: 'stealth',
    tags: ['Surveillance', 'Gap', 'Pattern'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'The harbor watch coverage has a consistent gap between the pre-bell departure of the night watch and the arrival of the morning shift — four to six minutes, varying by day, at the eastern pier access point. The gap is not large but it is reliable, and reliable gaps in secure locations are not accidents. Something or someone exploits this window regularly; the approach path from the shallow-water channel points directly at the gap timing.');
      addJournal('Harbor watch gap: 4-6 minutes pre-bell at eastern pier access, consistent, likely exploited regularly.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The morning changeover today runs early — both shifts overlap by eight minutes instead of gapping. The timing shift was unscheduled; someone adjusted the rotation. The gap pattern is still in the previous week\'s watch log, which is posted for harbor master review at the quay office.' }
  },

  {
    id: 'panim_arch_stealth_2',
    label: 'The cargo inspection schedule has blind spots. The same manifest categories always pass at dusk.',
    skill: 'finesse',
    archetypeGroup: 'stealth',
    tags: ['Cargo', 'Schedule', 'Pattern'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'Three cargo manifest categories — sealed religious goods, personal effects under shrine seal, and medicinal consignments — are never inspected during the dusk shift. The pattern is consistent across fourteen entries over six weeks. Dusk inspection is lowest-staff; the categories that pass uninspected are exactly the categories that would conceal displaced supply without triggering a report. The scheduling produces a predictable channel for uninspected cargo movement.');
      addJournal('Dusk shift: three manifest categories systematically pass uninspected, consistent 6-week pattern, deliberate channel.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The manifest board is turned inward during the dusk changeover — the inspection records go to the harbor master at shift close and are not public during that window. The public manifest summary on the exterior quay board carries category-level data going back three weeks.' }
  },

  // SUPPORT ×2 — fisher community displacement stress
  {
    id: 'panim_arch_support_1',
    label: 'The fisher families stopped sharing tide information with each other two months ago.',
    skill: 'charm',
    archetypeGroup: 'support',
    tags: ['Social', 'Community', 'Fragmentation'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'Fisher communities in harbor towns survive on shared tidal knowledge — route timing, shoal position, seasonal channel shifts. The Panim Haven fishers have stopped sharing this information. The habit broke two months ago and did not return. Each family now holds their tidal knowledge privately. The fragmentation costs them catches and safety, and they know it. Something applied enough pressure to override a survival-level cooperative behavior.');
      addJournal('Fisher community: tidal knowledge sharing stopped 2 months ago — pressure severe enough to override cooperative survival behavior.', 'intelligence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The fisher families are closed to outside questions — a stranger asking about their internal patterns after two months of institutional pressure reads as another form of surveillance. The shrine helper who works the morning offering preparation grew up in the fisher community and still has one foot in it.' }
  },

  {
    id: 'panim_arch_support_2',
    label: 'The mediation petitioners no longer come as families. They come alone.',
    skill: 'charm',
    archetypeGroup: 'support',
    tags: ['Social', 'Isolation', 'Pattern'],
    fn: function() {
      G.investigationProgress = (G.investigationProgress||0) + 1;
      addNarration('', 'Mediation in Panim Haven has always been a communal act — families petition together, witnesses attend, the ritual includes the community in the resolution. Over the past two months, petitioners have begun arriving alone. No support witnesses, no family presence, no communal acknowledgment of the proceeding. The isolation of petitioners from their support networks is not incidental — it makes petitioners more vulnerable in proceedings and removes the community check on outcomes. Someone benefits from isolated petitioners.');
      addJournal('Mediation petitioners now arrive alone — community witnesses absent, deliberate or pressured isolation from support network.', 'evidence');
      if (typeof updateHUD === 'function') updateHUD();
      if (typeof saveGame === 'function') saveGame();
    },
    failResult: { text: 'The petitioner in the hall today is alone but aware and on guard — they have been through the system enough to know that outside interest in their case is not necessarily helpful. The memorial counselor at the shrine has observed the same pattern from the outside and has formed conclusions she is willing to share.' }
  }

);

window.PANIM_STAGE1_ENRICHED_CHOICES = PANIM_HAVEN_STAGE1_ENRICHED_CHOICES;
